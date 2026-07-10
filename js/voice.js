/* ==========================================================================
   Chef's Path — voice (read-aloud) via the browser's Speech Synthesis API.
   No network, no dependencies. Voice.bind(container) wires any element with
   [data-speak] (text to read) into a play/stop toggle.
   ========================================================================== */

const Voice = (function () {
  let activeBtn = null;

  function supported() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  function stop() {
    if (!supported()) return;
    window.speechSynthesis.cancel();
    if (activeBtn) {
      activeBtn.textContent = t("read_aloud");
      activeBtn = null;
    }
  }

  function speak(text, btn) {
    if (!supported()) return;
    stop();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; // course content is English
    u.rate = 0.95;
    u.onend = function () {
      if (activeBtn === btn) {
        btn.textContent = t("read_aloud");
        activeBtn = null;
      }
    };
    activeBtn = btn || null;
    if (btn) btn.textContent = t("stop_reading");
    window.speechSynthesis.speak(u);
  }

  /* Announce something short (timer alerts) without touching buttons. */
  function announce(text) {
    if (!supported()) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 1.0;
    window.speechSynthesis.speak(u);
  }

  function bind(container) {
    if (!supported()) {
      container.querySelectorAll("[data-speak]").forEach(function (b) { b.style.display = "none"; });
      return;
    }
    container.querySelectorAll("[data-speak]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (activeBtn === btn) { stop(); return; }
        speak(btn.getAttribute("data-speak"), btn);
      });
    });
  }

  return { supported: supported, speak: speak, announce: announce, stop: stop, bind: bind };
})();
