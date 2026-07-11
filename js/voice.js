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
    en: "en-US", ur: "ur-PK", ar: "ar-SA", hi: "hi-IN", es: "es-ES", fr: "fr-FR"
  };
  function langCode() {
    return (typeof I18N !== "undefined") ? I18N.getLang() : "en";
  }
  function localeOf(code) { return SPEECH_LOCALE[code] || "en-US"; }
  function speechLocale() { return localeOf(langCode()); }

  /* Best installed voice for a locale: exact match, then language-subtag. */
  function findVoice(locale) {
    if (!voices.length) loadVoices();
    if (!voices.length) return null;
    const want = locale.toLowerCase();
    const sub = want.split("-")[0];
    let v = voices.find(function (x) { return x.lang && x.lang.toLowerCase() === want; });
    if (v) return v;
    v = voices.find(function (x) { return x.lang && x.lang.toLowerCase().split("-")[0] === sub; });
    return v || null;
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

  /* Split long text into <=200-char chunks on sentence boundaries (works for
     Latin, Devanagari ॥, Arabic ؟, CJK 。 punctuation). Long single utterances
     are what trigger the Chromium mid-speech cutoff. */
  function chunkText(text) {
    const parts = text.match(/[^.!?。॥۔؟\n]+[.!?。॥۔؟\n]*/g) || [text];
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
      u.rate = 0.95;
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
    matchLang: matchLang, localeOf: localeOf, onVoices: onVoices, loadVoices: loadVoices
  };
})();
