/* ==========================================================================
   Chef's Path — "Pan Catch" mini-game for while your food is in the oven.
   Canvas 2D, vanilla JS. Move the pan (arrow keys / mouse / touch) to catch
   good ingredients (+10) and dodge flames (lose a life). 3 lives, speed
   ramps up with score. High score persists in localStorage.
   ========================================================================== */

const Game = (function () {
  const BEST_KEY = "chefs-path-game-best";
  const GOOD = ["🍅", "🥕", "🧀", "🥚", "🍄", "🧅", "🥦", "🌽"];
  const BAD = "🔥";

  let canvas = null, ctx = null, raf = null, running = false;
  let onState = null; // callback({score, lives, best, over})

  let panX = 0.5;        // 0..1 across the canvas
  let items = [];        // {x(0..1), y(px), emoji, bad, speed}
  let score = 0, lives = 3, spawnTimer = 0, lastTime = 0;

  /* ---- sound effects (synthesized via Web Audio, no files) ---- */

  const MUTE_KEY = "chefs-path-game-muted";
  let audioCtx = null;
  let muted = localStorage.getItem(MUTE_KEY) === "1";

  function isMuted() { return muted; }
  function setMuted(m) {
    muted = !!m;
    localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  }

  /* Unlock/resume the audio context — must be called from a user gesture
     (the Start button) or browsers keep it suspended and silent. */
  function ensureAudio() {
    if (muted) return null;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
    } catch (e) { audioCtx = null; }
    return audioCtx;
  }

  /* One oscillator "blip" scheduled at `start` (seconds, audioCtx time). */
  function tone(freq, start, dur, type, peak) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.connect(g); g.connect(audioCtx.destination);
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(peak || 0.2, start + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  function sfxStart() {
    const ac = ensureAudio(); if (!ac) return;
    const t0 = ac.currentTime;
    [523, 659, 784].forEach(function (f, i) { tone(f, t0 + i * 0.08, 0.11, "triangle", 0.2); });
  }

  function sfxCatch() {
    const ac = ensureAudio(); if (!ac) return;
    const t0 = ac.currentTime;
    // bright rising "pop"
    tone(660, t0, 0.08, "triangle", 0.26);
    tone(990, t0 + 0.06, 0.10, "triangle", 0.22);
  }

  function sfxBad() {
    const ac = ensureAudio(); if (!ac) return;
    const t0 = ac.currentTime;
    // low buzzing thud that drops in pitch
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g); g.connect(ac.destination);
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(240, t0);
    osc.frequency.exponentialRampToValueAtTime(85, t0 + 0.28);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.32, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.3);
    osc.start(t0); osc.stop(t0 + 0.32);
  }

  function sfxGameOver() {
    const ac = ensureAudio(); if (!ac) return;
    const t0 = ac.currentTime;
    // descending "wah-wah-wah"
    [523, 415, 349, 262].forEach(function (f, i) { tone(f, t0 + i * 0.16, 0.18, "square", 0.22); });
  }

  function best() { return parseInt(localStorage.getItem(BEST_KEY) || "0", 10); }

  function saveBest() {
    if (score > best()) localStorage.setItem(BEST_KEY, String(score));
  }

  function emitState(over) {
    if (onState) onState({ score: score, lives: lives, best: best(), over: !!over });
  }

  function spawn() {
    const bad = Math.random() < 0.22;
    items.push({
      x: 0.08 + Math.random() * 0.84,
      y: -30,
      emoji: bad ? BAD : GOOD[Math.floor(Math.random() * GOOD.length)],
      bad: bad,
      speed: 90 + Math.random() * 60 + Math.min(160, score * 1.2) // px/sec
    });
  }

  function loop(ts) {
    if (!running) return;
    if (!lastTime) lastTime = ts;
    const dt = Math.min(0.05, (ts - lastTime) / 1000);
    lastTime = ts;

    const W = canvas.width, H = canvas.height;

    // spawn faster as score grows
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawn();
      spawnTimer = Math.max(0.35, 1.1 - score / 300);
    }

    const panPx = panX * W;
    const panY = H - 34;
    const catchHalf = 44;

    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.speed * dt;

      // caught?
      if (it.y >= panY - 26 && it.y <= panY + 12 && Math.abs(it.x * W - panPx) < catchHalf) {
        if (it.bad) {
          lives--;
          sfxBad();
          emitState();
          if (lives <= 0) { gameOver(); return; }
        } else {
          score += 10;
          sfxCatch();
          emitState();
        }
        items.splice(i, 1);
        continue;
      }
      if (it.y > H + 30) items.splice(i, 1);
    }

    // draw
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // counter top
    ctx.font = "28px serif";
    for (const it of items) {
      ctx.font = (it.bad ? 30 : 28) + "px serif";
      ctx.fillText(it.emoji, it.x * W, it.y);
    }

    // pan
    ctx.font = "44px serif";
    ctx.fillText("🍳", panPx, panY);

    raf = requestAnimationFrame(loop);
  }

  function gameOver() {
    running = false;
    saveBest();
    sfxGameOver();
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    drawGameOver();
    emitState(true);
  }

  /* Big crying face + "Game Over" painted onto the game board. */
  function drawGameOver() {
    if (!ctx || !canvas) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "78px serif";
    ctx.fillText("😭", W / 2, H / 2 - 34);

    const accent = (getComputedStyle(document.documentElement)
      .getPropertyValue("--accent") || "#c25e35").trim();
    const label = (typeof t === "function" ? t("game_over") : "Game Over!");
    ctx.fillStyle = accent;
    ctx.font = "bold 34px Georgia, 'Times New Roman', serif";
    ctx.fillText(label.toUpperCase(), W / 2, H / 2 + 48);
  }

  /* ---- input ---- */

  function onKey(e) {
    if (!running) return;
    if (e.key === "ArrowLeft") { panX = Math.max(0.05, panX - 0.06); e.preventDefault(); }
    if (e.key === "ArrowRight") { panX = Math.min(0.95, panX + 0.06); e.preventDefault(); }
  }

  function pointTo(clientX) {
    const rect = canvas.getBoundingClientRect();
    panX = Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width));
  }

  function onMove(e) { if (running) pointTo(e.clientX); }
  function onTouch(e) {
    if (running && e.touches.length) { pointTo(e.touches[0].clientX); e.preventDefault(); }
  }

  /* ---- public ---- */

  function mount(canvasEl, stateCb) {
    stop(); // clean previous mount
    canvas = canvasEl;
    ctx = canvas.getContext("2d");
    onState = stateCb;

    // crisp canvas at element size
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(300, Math.floor(rect.width));
    canvas.height = 340;

    document.addEventListener("keydown", onKey);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    canvas.addEventListener("touchstart", onTouch, { passive: false });
    emitState();
  }

  function start() {
    if (!canvas) return;
    items = [];
    score = 0; lives = 3; panX = 0.5; spawnTimer = 0; lastTime = 0;
    running = true;
    sfxStart(); // also unlocks the audio context (called from the Start click)
    emitState();
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    if (canvas) {
      document.removeEventListener("keydown", onKey);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchstart", onTouch);
    }
    canvas = null; ctx = null; onState = null;
  }

  return {
    mount: mount, start: start, stop: stop, best: best,
    isMuted: isMuted, setMuted: setMuted
  };
})();
