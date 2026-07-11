/* ==========================================================================
   Chef's Path — voice (read-aloud) via the browser's Speech Synthesis API.
   Free, offline, no key. Used when the device has a voice installed for the
   selected language. We select the matching voice EXPLICITLY: setting only
   utterance.lang leaves Chromium/Edge on the English voice for languages like
   Urdu/Arabic/Hindi (the bug this addresses). If the device has no voice for
   the language, the user gets a clear, translated message instead of silence.
   ========================================================================== */

const Voice = (function () {
  let activeBtn = null;
  let voices = [];

  function synthSupported() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }
  function supported() { return synthSupported(); }

  function loadVoices() {
    if (synthSupported()) voices = window.speechSynthesis.getVoices() || [];
  }
  if (synthSupported()) {
    loadVoices();
    // getVoices() is often empty until this fires (especially Edge online voices)
    window.speechSynthesis.onvoiceschanged = loadVoices;
    // Edge's online "natural" voices can appear a beat late — poll briefly at
    // startup so they're ready by the time the user taps Read aloud.
    let tries = 0;
    const warm = setInterval(function () {
      loadVoices();
      if (voices.length > 1 || ++tries > 10) clearInterval(warm);
    }, 400);
  }

  /* Resolve the best voice for `locale`, calling cb(voice|null). If the voice
     isn't present yet, wait up to ~2.5s for a voiceschanged event before
     giving up — Edge loads its local (English) voices first and its online
     natural voices (Urdu/Hindi/Arabic) a beat later, so a voice we "don't
     have" may simply not have loaded yet. */
  function resolveVoice(locale, cb) {
    loadVoices();
    let v = findVoice(locale);
    if (v) { cb(v); return; }
    let settled = false;
    function retry() {
      if (settled) return;
      settled = true;
      loadVoices();
      cb(findVoice(locale));
    }
    const prev = window.speechSynthesis.onvoiceschanged;
    window.speechSynthesis.onvoiceschanged = function () {
      loadVoices();
      if (typeof prev === "function") try { prev(); } catch (e) {}
      if (findVoice(locale)) retry();
    };
    setTimeout(retry, 2500);
  }

  const SPEECH_LOCALE = {
    en: "en-US", ur: "ur-PK", ar: "ar-SA", hi: "hi-IN", es: "es-ES", fr: "fr-FR"
  };
  function langCode() {
    return (typeof I18N !== "undefined") ? I18N.getLang() : "en";
  }
  function speechLocale() { return SPEECH_LOCALE[langCode()] || "en-US"; }

  /* Best installed voice for a locale: exact match, then language-subtag match. */
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

  function setBtn(btn, key) { if (btn) btn.textContent = t(key); }

  function stop() {
    if (synthSupported()) window.speechSynthesis.cancel();
    if (activeBtn) { setBtn(activeBtn, "read_aloud"); activeBtn = null; }
  }

  function speak(text, btn) {
    stop();
    if (!text) return;
    if (!synthSupported()) {
      if (window.appToast) window.appToast(t("voice_unavailable"));
      return;
    }
    const locale = speechLocale();
    activeBtn = btn || null;
    setBtn(btn, "voice_loading"); // shows "Loading voice…" while we wait

    resolveVoice(locale, function (voice) {
      if (activeBtn !== btn) return; // user pressed stop meanwhile
      if (!voice) {
        // Genuinely no installed voice for this language — explain, don't fail silently.
        setBtn(btn, "read_aloud");
        activeBtn = null;
        if (window.appToast) window.appToast(t("voice_unavailable"));
        return;
      }
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice;      // explicit voice — the key to non-English speech
      u.lang = voice.lang;
      u.rate = 0.95;
      u.onend = function () {
        if (activeBtn === btn) { setBtn(btn, "read_aloud"); activeBtn = null; }
      };
      u.onerror = function () {
        if (activeBtn === btn) { setBtn(btn, "read_aloud"); activeBtn = null; }
      };
      setBtn(btn, "stop_reading");
      window.speechSynthesis.speak(u);
    });
  }

  /* Short spoken alert for the kitchen timer (English, uses native engine). */
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
      // If truly nothing can speak, hide the control.
      if (!supported()) { btn.style.display = "none"; return; }
      btn.addEventListener("click", function () {
        if (activeBtn === btn) { stop(); return; }
        speak(btn.getAttribute("data-speak"), btn);
      });
    });
  }

  return { supported: supported, speak: speak, announce: announce, stop: stop, bind: bind };
})();
