/* ==========================================================================
   Chef's Path — voice (read-aloud)
   Two engines, chosen automatically:
   1. Browser Speech Synthesis — free, offline. Used when the device has a
      voice installed for the selected language. We select the matching voice
      EXPLICITLY: setting only utterance.lang leaves Chromium/Edge on the
      English voice for languages like Urdu/Arabic/Hindi (the bug this fixes).
   2. OpenAI text-to-speech — used as a fallback when no local voice exists
      for the language (e.g. Urdu on most Windows installs). Requires the
      OpenAI key saved in Settings; speaks essentially any language.
   If neither is available, the user gets a clear, translated message.
   ========================================================================== */

const Voice = (function () {
  let activeBtn = null;
  let voices = [];
  let currentAudio = null; // OpenAI TTS playback

  function synthSupported() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }
  // Buttons are always useful: even without a local voice we may have OpenAI TTS.
  function supported() { return synthSupported() || hasKey(); }

  function hasKey() {
    return typeof Assistant !== "undefined" && !!Assistant.apiKey();
  }

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
    if (currentAudio) { try { currentAudio.pause(); } catch (e) {} currentAudio = null; }
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

    // No local voice for this language — use OpenAI TTS if a key is set.
    if (hasKey()) {
      activeBtn = btn || null;
      setBtn(btn, "voice_loading");
      speakOpenAI(text, btn);
      return;
    }

    // Nothing available — explain (translated) instead of failing silently.
    if (window.appToast) window.appToast(t("voice_unavailable"));
  }

  async function speakOpenAI(text, btn) {
    try {
      const res = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + Assistant.apiKey()
        },
        body: JSON.stringify({
          model: "gpt-4o-mini-tts",
          voice: "alloy",
          input: text.slice(0, 4000) // API input cap
        })
      });
      if (!res.ok) throw new Error("TTS HTTP " + res.status);
      const blob = await res.blob();
      if (activeBtn !== btn) return; // user pressed stop while it loaded
      const audio = new Audio(URL.createObjectURL(blob));
      currentAudio = audio;
      setBtn(btn, "stop_reading");
      audio.onended = function () {
        if (activeBtn === btn) { setBtn(btn, "read_aloud"); activeBtn = null; }
        currentAudio = null;
      };
      audio.play();
    } catch (e) {
      currentAudio = null;
      if (activeBtn === btn) { setBtn(btn, "read_aloud"); activeBtn = null; }
      if (window.appToast) window.appToast(t("voice_error"));
    }
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
