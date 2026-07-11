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
    const locale = speechLocale();
    const voice = synthSupported() ? findVoice(locale) : null;

    if (voice) {
      // Native engine — free & offline, with the RIGHT voice selected.
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = 0.95;
      u.onend = function () {
        if (activeBtn === btn) { setBtn(btn, "read_aloud"); activeBtn = null; }
      };
      u.onerror = function () {
        if (activeBtn === btn) { setBtn(btn, "read_aloud"); activeBtn = null; }
      };
      activeBtn = btn || null;
      setBtn(btn, "stop_reading");
      window.speechSynthesis.speak(u);
      return;
    }

    // No installed voice for this language — explain instead of failing silently.
    if (window.appToast) window.appToast(t("voice_unavailable"));
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
