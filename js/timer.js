/* ==========================================================================
   Chef's Path — kitchen timer
   Survives page reloads (end time stored in localStorage) and keeps running
   across all pages. Fires alerts when 20, 15, 10 and 5 minutes remain and
   when time is up: browser notification + beeps + spoken announcement +
   on-screen toast. The header shows a live countdown chip on every page.
   ========================================================================== */

const Timer = (function () {
  const KEY = "chefs-path-timer";
  const MILESTONES = [20, 15, 10, 5]; // minutes remaining

  let state = load(); // { endTime, duration(min), fired: {20:true,...}, finished }
  let interval = null;
  let listeners = [];
  let audioCtx = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      const s = raw ? JSON.parse(raw) : null;
      if (s && s.endTime) return s;
    } catch (e) { /* ignore */ }
    return null;
  }

  function save() {
    if (state) localStorage.setItem(KEY, JSON.stringify(state));
    else localStorage.removeItem(KEY);
  }

  function onChange(cb) { listeners.push(cb); }
  function emit() { listeners.forEach(function (cb) { try { cb(); } catch (e) {} }); }

  function active() { return !!state && !state.finished; }
  function duration() { return state ? state.duration : 0; }

  function remainingMs() {
    return state ? state.endTime - Date.now() : 0;
  }

  function remainingText() {
    const ms = Math.max(0, remainingMs());
    const total = Math.round(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  /* ---- alerts ---- */

  function ensureAudio() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
    } catch (e) { audioCtx = null; }
  }

  function beep(times) {
    if (!audioCtx) return;
    for (let i = 0; i < times; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.frequency.value = 880;
      const start = audioCtx.currentTime + i * 0.35;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);
      osc.start(start); osc.stop(start + 0.3);
    }
  }

  function notify(body) {
    try {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Chef's Path ⏱", { body: body });
      }
    } catch (e) { /* notifications unavailable (e.g. file://) */ }
  }

  function requestPermission() {
    try {
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    } catch (e) { /* ignore */ }
  }

  function alertMilestone(mins) {
    const msg = t("minutes_left", { n: mins });
    beep(2);
    notify(msg);
    if (typeof Voice !== "undefined") Voice.announce(mins + " minutes left on your kitchen timer.");
    if (window.appToast) window.appToast("⏱ " + msg);
  }

  function alertDone() {
    const msg = t("time_up");
    beep(6);
    notify(msg);
    if (typeof Voice !== "undefined") Voice.announce("Time's up! Check your food!");
    if (window.appToast) window.appToast(msg);
  }

  /* ---- engine ---- */

  function tick() {
    if (!state) { stopTick(); return; }
    const rem = remainingMs();

    MILESTONES.forEach(function (m) {
      // only announce milestones that fit inside the original duration
      if (state.duration > m && rem <= m * 60000 && rem > 0 && !state.fired[m]) {
        state.fired[m] = true;
        save();
        alertMilestone(m);
      }
    });

    if (rem <= 0 && !state.finished) {
      state.finished = true;
      save();
      alertDone();
    }

    // clear a finished timer from storage a minute after it rang
    if (state.finished && rem <= -60000) {
      state = null;
      save();
      stopTick();
    }
    emit();
  }

  function startTick() {
    if (!interval) interval = setInterval(tick, 1000);
  }
  function stopTick() {
    if (interval) { clearInterval(interval); interval = null; }
  }

  function start(minutes) {
    minutes = Math.max(1, Math.min(240, Math.round(minutes)));
    state = { endTime: Date.now() + minutes * 60000, duration: minutes, fired: {}, finished: false };
    save();
    ensureAudio();          // user gesture — unlock sound now
    requestPermission();    // ask for notification permission now
    startTick();
    emit();
  }

  function cancel() {
    state = null;
    save();
    stopTick();
    if (typeof Voice !== "undefined") Voice.stop();
    emit();
  }

  function finished() { return !!state && state.finished; }

  // resume a timer that survived a reload
  if (state) startTick();

  return {
    start: start, cancel: cancel, active: active, finished: finished,
    remainingMs: remainingMs, remainingText: remainingText,
    duration: duration, onChange: onChange, MILESTONES: MILESTONES
  };
})();
