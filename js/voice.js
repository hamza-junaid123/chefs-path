/* ==========================================================================
   Chef's Path — voice (read-aloud) via the browser's Speech Synthesis API.
   Free, offline, no key. Speaks the selected language using a voice installed
   on the device.

   Robustness handled here:
   - Explicit voice selection (setting only utterance.lang leaves Chromium/Edge
     on the English voice for Urdu/Arabic/Hindi — nothing is heard).
   - Patience for late-loading voices (Edge's online natural voices arrive a
     beat after the local English ones).
   - Long-text chunking + a pause/resume keepalive to defeat the well-known
     Chromium bug where speech stops after ~15 seconds.
   - A clear, translated message when the device truly has no voice for the
     language, plus a per-language diagnostic surfaced in Settings.
   ========================================================================== */

const Voice = (function () {
  let activeBtn = null;
  let voices = [];
  let keepAlive = null;
  const voiceListeners = [];

  function synthSupported() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }
  function supported() { return synthSupported(); }

  function loadVoices() {
    if (synthSupported()) voices = window.speechSynthesis.getVoices() || [];
    return voices;
  }

  if (synthSupported()) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = function () {
      loadVoices();
      voiceListeners.forEach(function (cb) { try { cb(); } catch (e) {} });
    };
    // Edge online voices can appear a beat late — poll briefly at startup.
    let tries = 0;
    const warm = setInterval(function () {
      loadVoices();
      if (voices.length > 1 || ++tries > 12) clearInterval(warm);
    }, 400);
  }

  function onVoices(cb) { voiceListeners.push(cb); }

  const SPEECH_LOCALE = {
    en: "en-US", ur: "ur-PK", ar: "ar-SA", es: "es-ES", fr: "fr-FR"
  };
  function langCode() {
    return (typeof I18N !== "undefined") ? I18N.getLang() : "en";
  }
  function localeOf(code) { return SPEECH_LOCALE[code] || "en-US"; }
  function speechLocale() { return localeOf(langCode()); }

  /* How human a voice sounds — higher is better. The single biggest lever for
     "not robotic": prefer modern natural/neural/online voices (Microsoft
     "… Online (Natural)", Google, Apple Siri/Enhanced/Premium) over the old
     robotic desktop voices (David, Zira, eSpeak, "compact"). */
  function voiceScore(v, wantLocale) {
    const n = (v.name || "").toLowerCase();
    let s = 0;
    if (v.lang && v.lang.toLowerCase() === wantLocale) s += 25; // right dialect
    if (/natural|neural/.test(n)) s += 130;
    if (/enhanced|premium/.test(n)) s += 110;
    if (/online/.test(n)) s += 70;
    if (/google|siri/.test(n)) s += 60;
    if (v.localService === false) s += 15;                      // cloud voices ≈ nicer
    if (/compact|espeak|pico|robo/.test(n)) s -= 120;
    if (/david|zira|mark|hazel|hortense/.test(n)) s -= 30;      // legacy robotic MS voices
    return s;
  }

  /* User-chosen voice per language (Settings picker) — overrides auto-pick. */
  const PREF_KEY = "chefs-path-voices"; // { en: "Voice name", ur: "...", ... }
  function prefs() {
    try { return JSON.parse(localStorage.getItem(PREF_KEY) || "{}") || {}; }
    catch (e) { return {}; }
  }
  function getPreferred(code) { return prefs()[code] || ""; }
  function setPreferred(code, name) {
    const p = prefs();
    if (name) p[code] = name; else delete p[code];
    try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch (e) {}
  }

  /* All installed voices for an app language, best-sounding first (for the
     Settings dropdown). */
  function voicesForLang(code) {
    if (!voices.length) loadVoices();
    const want = localeOf(code).toLowerCase();
    const sub = want.split("-")[0];
    return voices.filter(function (v) {
      return v.lang && v.lang.toLowerCase().split("-")[0] === sub;
    }).sort(function (a, b) { return voiceScore(b, want) - voiceScore(a, want); });
  }

  /* Best voice for a locale: the user's pick (if set & available), else the
     highest-scoring natural voice. */
  function findVoice(locale) {
    if (!voices.length) loadVoices();
    if (!voices.length) return null;
    const want = locale.toLowerCase();
    const sub = want.split("-")[0];
    const cands = voices.filter(function (v) {
      return v.lang && v.lang.toLowerCase().split("-")[0] === sub;
    });
    if (!cands.length) return null;
    // Honor a user-chosen voice for any app language that maps to this subtag.
    for (const code in SPEECH_LOCALE) {
      if (localeOf(code).toLowerCase().split("-")[0] === sub) {
        const prefName = getPreferred(code);
        if (prefName) {
          const pv = cands.find(function (v) { return v.name === prefName; });
          if (pv) return pv;
        }
      }
    }
    cands.sort(function (a, b) { return voiceScore(b, want) - voiceScore(a, want); });
    return cands[0];
  }

  /* Public: which installed voice (if any) covers a given app language code. */
  function matchLang(code) { loadVoices(); return findVoice(localeOf(code)); }

  function setBtn(btn, key) { if (btn) btn.textContent = t(key); }

  function clearKeepAlive() {
    if (keepAlive) { clearInterval(keepAlive); keepAlive = null; }
  }

  function stop() {
    clearKeepAlive();
    if (synthSupported()) window.speechSynthesis.cancel();
    if (activeBtn) { setBtn(activeBtn, "read_aloud"); activeBtn = null; }
  }

  /* Wait (briefly) for the target voice if it isn't loaded yet, then cb(voice|null). */
  function resolveVoice(locale, cb) {
    loadVoices();
    const v = findVoice(locale);
    if (v) { cb(v); return; }
    let settled = false;
    function retry() {
      if (settled) return;
      settled = true;
      loadVoices();
      cb(findVoice(locale));
    }
    onVoices(function () { if (!settled && findVoice(locale)) retry(); });
    setTimeout(retry, 2500);
  }

  /* Split long text into <=200-char chunks on sentence boundaries. Includes
     the Devanagari danda । (U+0964, the normal Hindi sentence end) and ॥, the
     Urdu/Arabic full stop ۔ and ؟, and CJK 。 — otherwise Hindi text has no
     Latin ./!/? to split on, becomes one giant utterance, and triggers the
     Chromium mid-speech cutoff (the reason Hindi read-aloud failed). */
  function chunkText(text) {
    const parts = text.match(/[^.!?।॥。۔؟\n]+[.!?।॥。۔؟\n]*/g) || [text];
    const chunks = [];
    let cur = "";
    parts.forEach(function (p) {
      if ((cur + p).length > 200 && cur) { chunks.push(cur); cur = p; }
      else cur += p;
    });
    if (cur.trim()) chunks.push(cur);
    return chunks;
  }

  function speakChunks(chunks, voice, btn) {
    let i = 0;
    function next() {
      if (activeBtn !== btn) { clearKeepAlive(); return; }
      if (i >= chunks.length) {
        clearKeepAlive();
        if (activeBtn === btn) { setBtn(btn, "read_aloud"); activeBtn = null; }
        return;
      }
      const u = new SpeechSynthesisUtterance(chunks[i++]);
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = 1.0;   // natural cadence (0.95 dragged and sounded more robotic)
      u.pitch = 1.0;
      u.onend = next;
      u.onerror = function () {
        clearKeepAlive();
        if (activeBtn === btn) { setBtn(btn, "read_aloud"); activeBtn = null; }
      };
      window.speechSynthesis.speak(u);
    }
    clearKeepAlive();
    // Keepalive: Chromium pauses long queues; pause+resume every 9s keeps it going.
    keepAlive = setInterval(function () {
      if (synthSupported() && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 9000);
    next();
  }

  /* text: what to read; btn: optional toggle button; localeOverride: force a
     language (used by the Settings voice test). */
  function speak(text, btn, localeOverride) {
    stop();
    if (!text) return;
    if (!synthSupported()) {
      if (window.appToast) window.appToast(t("voice_unavailable"));
      return;
    }
    const locale = localeOverride || speechLocale();
    activeBtn = btn || null;
    setBtn(btn, "voice_loading");

    resolveVoice(locale, function (voice) {
      if (activeBtn !== btn) return; // user pressed stop meanwhile
      if (!voice) {
        setBtn(btn, "read_aloud");
        activeBtn = null;
        if (window.appToast) window.appToast(t("voice_unavailable"));
        return;
      }
      setBtn(btn, "stop_reading");
      speakChunks(chunkText(text), voice, btn);
    });
  }

  /* Short spoken alert for the kitchen timer (English). */
  function announce(text) {
    if (!synthSupported()) return;
    const v = findVoice("en-US");
    const u = new SpeechSynthesisUtterance(text);
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
    u.rate = 1.0;
    window.speechSynthesis.speak(u);
  }

  function bind(container) {
    container.querySelectorAll("[data-speak]").forEach(function (btn) {
      if (!supported()) { btn.style.display = "none"; return; }
      btn.addEventListener("click", function () {
        if (activeBtn === btn) { stop(); return; }
        speak(btn.getAttribute("data-speak"), btn);
      });
    });
  }

  return {
    supported: supported, speak: speak, announce: announce, stop: stop, bind: bind,
    matchLang: matchLang, localeOf: localeOf, onVoices: onVoices, loadVoices: loadVoices,
    voicesForLang: voicesForLang, getPreferred: getPreferred, setPreferred: setPreferred
  };
})();
