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
          emitState();
          if (lives <= 0) { gameOver(); return; }
        } else {
          score += 10;
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
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    emitState(true);
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

  return { mount: mount, start: start, stop: stop, best: best };
})();
