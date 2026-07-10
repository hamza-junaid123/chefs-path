/* ==========================================================================
   Chef's Path — lesson & recipe illustrations
   Self-contained SVG "picture cards" (no external images, work offline,
   adapt to light/dark theme via CSS variables). Each lesson maps to a
   composed food scene. picSvg(lessonId, variant) → svg markup string.
   variant: "wide" (lesson hero / recipe tile) or "thumb" (small square).
   ========================================================================== */

const PICS = (function () {

  /* main: the hero emoji; sides: two supporting emoji; steam: draw steam lines */
  const SCENES = {
    "l1-1": { main: "🍞", sides: ["🧈", "🥄"], steam: true },
    "l1-2": { main: "🥗", sides: ["🍅", "🥕"], steam: false },
    "l1-3": { main: "🔪", sides: ["🍅", "🧅"], steam: false },
    "l1-4": { main: "🥑", sides: ["🧅", "🍋"], steam: false },
    "l1-5": { main: "🥣", sides: ["🍌", "🍯"], steam: false },
    "l1-6": { main: "🥞", sides: ["🥛", "🧈"], steam: true },
    "l1-7": { main: "🍅", sides: ["🧀", "🌿"], steam: false },
    "l1-8": { main: "🫘", sides: ["🥒", "🍋"], steam: false },
    "l2-1": { main: "🥔", sides: ["🧈", "🌿"], steam: true },
    "l2-2": { main: "🍳", sides: ["🥚", "🍞"], steam: true },
    "l2-3": { main: "🥑", sides: ["🍳", "🍞"], steam: false },
    "l2-4": { main: "🍚", sides: ["💧", "🧂"], steam: true },
    "l2-5": { main: "🍝", sides: ["🧄", "🌶️"], steam: true },
    "l2-6": { main: "🍄", sides: ["🧄", "🧈"], steam: true },
    "l2-7": { main: "🥔", sides: ["🔥", "🌿"], steam: true },
    "l2-8": { main: "🍅", sides: ["🥄", "🌿"], steam: true },
    "l2-9": { main: "🍚", sides: ["🥚", "🥕"], steam: true }
  };

  const FALLBACK = { main: "🍽️", sides: ["✨", "✨"], steam: false };

  let uid = 0;

  function steamPath(x, y) {
    return '<path d="M' + x + ' ' + y + ' q -6 -10 0 -20 q 6 -10 0 -20" fill="none" ' +
      'stroke="var(--text-soft)" stroke-width="3" stroke-linecap="round" opacity="0.45"/>';
  }

  function picSvg(lessonId, variant) {
    const s = SCENES[lessonId] || FALLBACK;
    const id = "pg" + (++uid);

    if (variant === "thumb") {
      return '<svg class="pic-thumb" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<rect x="0" y="0" width="80" height="80" rx="14" fill="var(--accent-soft)"/>' +
        '<circle cx="40" cy="44" r="26" fill="var(--card)" opacity="0.85"/>' +
        '<text x="40" y="54" font-size="32" text-anchor="middle">' + s.main + "</text>" +
        "</svg>";
    }

    // wide hero card
    return '<svg class="pic-hero" viewBox="0 0 400 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration">' +
      "<defs>" +
      '<linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="var(--accent-soft)"/>' +
      '<stop offset="1" stop-color="var(--bg-accent)"/>' +
      "</linearGradient>" +
      "</defs>" +
      '<rect x="0" y="0" width="400" height="170" rx="16" fill="url(#' + id + ')"/>' +
      // decorative dots
      '<circle cx="40" cy="30" r="5" fill="var(--accent)" opacity="0.18"/>' +
      '<circle cx="360" cy="130" r="7" fill="var(--accent)" opacity="0.15"/>' +
      '<circle cx="330" cy="35" r="4" fill="var(--gold)" opacity="0.3"/>' +
      '<circle cx="66" cy="140" r="4" fill="var(--gold)" opacity="0.3"/>' +
      // plate
      '<ellipse cx="200" cy="118" rx="88" ry="26" fill="var(--card)" opacity="0.9"/>' +
      '<ellipse cx="200" cy="112" rx="70" ry="20" fill="var(--card-soft)"/>' +
      (s.steam ? steamPath(180, 62) + steamPath(200, 56) + steamPath(220, 62) : "") +
      // food
      '<text x="200" y="115" font-size="64" text-anchor="middle">' + s.main + "</text>" +
      '<text x="105" y="135" font-size="30" text-anchor="middle" opacity="0.95">' + s.sides[0] + "</text>" +
      '<text x="298" y="135" font-size="30" text-anchor="middle" opacity="0.95">' + s.sides[1] + "</text>" +
      "</svg>";
  }

  return { picSvg: picSvg, SCENES: SCENES };
})();
