/* ==========================================================================
   Chef's Path — AI cooking assistant
   Floating chat available on every page.
   - With an OpenAI API key (saved in Settings → localStorage only, never in
     the repo): real AI answers via api.openai.com, tuned to this course.
   - Without a key: the built-in Chef Bot answers offline — unit conversions,
     ingredient substitutions, safe temperatures, dish fixes, course search.
   ========================================================================== */

const Assistant = (function () {
  const KEY_STORAGE = "chefs-path-openai-key";
  let panelOpen = false;
  let history = []; // {role:'user'|'assistant', content}
  let busy = false;

  function apiKey() { return localStorage.getItem(KEY_STORAGE) || ""; }
  function setApiKey(k) {
    if (k) localStorage.setItem(KEY_STORAGE, k.trim());
    else localStorage.removeItem(KEY_STORAGE);
  }

  function escHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* minimal formatting: keep line breaks, **bold**, and internal #/lesson links */
  function fmt(s) {
    let h = escHtml(s);
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    h = h.replace(/\[([^\]]+)\]\((#\/[a-z0-9\/-]+)\)/gi, '<a href="$2">$1</a>');
    return h.replace(/\n/g, "<br>");
  }

  /* ------------------------------------------------------------------
     Offline Chef Bot knowledge
     ------------------------------------------------------------------ */

  const VOL_ML = { cup: 240, cups: 240, tbsp: 15, tablespoon: 15, tablespoons: 15, tsp: 5, teaspoon: 5, teaspoons: 5, ml: 1, milliliter: 1, milliliters: 1, l: 1000, liter: 1000, liters: 1000, litre: 1000, litres: 1000, "fl oz": 30, floz: 30 };
  const WT_G = { g: 1, gram: 1, grams: 1, kg: 1000, kilogram: 1000, kilograms: 1000, oz: 28.35, ounce: 28.35, ounces: 28.35, lb: 453.6, lbs: 453.6, pound: 453.6, pounds: 453.6 };

  const SUBS = {
    buttermilk: "**Buttermilk substitute:** 1 cup milk + 1 tbsp lemon juice or vinegar. Stir and rest 5–10 minutes until slightly curdled.",
    egg: "**Egg substitute (in baking):** 1 egg ≈ ¼ cup mashed banana or applesauce, OR 1 tbsp ground flaxseed + 3 tbsp water (rest 5 min), OR 3 tbsp aquafaba (chickpea can liquid).",
    "baking powder": "**Baking powder substitute:** 1 tsp baking powder ≈ ¼ tsp baking soda + ½ tsp cream of tartar (or + 1 tsp lemon juice/vinegar added to the wet ingredients).",
    "baking soda": "**Baking soda substitute:** use 3–4× the amount of baking powder (flavor may change slightly). You can't go the other way without acid.",
    "brown sugar": "**Brown sugar substitute:** 1 cup white sugar + 1 tbsp molasses (or honey/maple in a pinch — reduce other liquids slightly).",
    "sour cream": "**Sour cream substitute:** plain Greek yogurt, 1:1. Works in dips, baking, and toppings.",
    "heavy cream": "**Heavy cream substitute:** ¾ cup milk + ¼ cup melted butter per cup (works for cooking, won't whip). For soups, evaporated milk also works.",
    wine: "**Cooking wine substitute:** equal parts stock + a splash of vinegar or lemon juice. White: use light vinegar; red: use a little balsamic.",
    butter: "**Butter substitute:** in cooking, olive or neutral oil (use ¾ the amount). In baking, equal coconut oil or margarine.",
    breadcrumbs: "**Breadcrumb substitute:** crushed crackers, oats, panko, or toasted stale bread whizzed/crushed fine.",
    "fresh herbs": "**Fresh ↔ dried herbs:** 1 tbsp fresh ≈ 1 tsp dried (dried are 3× stronger). Add dried early in cooking, fresh at the end.",
    garlic: "**Garlic substitute:** 1 clove ≈ ⅛ tsp garlic powder or ½ tsp pre-minced jarred garlic.",
    "lemon juice": "**Lemon juice substitute:** half the amount of vinegar (white or apple cider), or equal lime juice.",
    "tomato sauce": "**Tomato sauce substitute:** ½ cup tomato paste + ½ cup water per cup, plus a pinch of salt and sugar.",
    milk: "**Milk substitute (cooking/baking):** any unsweetened plant milk 1:1, or ½ cup evaporated milk + ½ cup water per cup."
  };

  const TEMPS = [
    ["chicken|poultry|turkey", "**Chicken & all poultry:** 165°F / 74°C in the thickest part. Juices should run clear."],
    ["ground|mince|burger|meatball", "**Ground meat (beef, pork, lamb):** 160°F / 71°C. Ground poultry: 165°F / 74°C."],
    ["fish|salmon|seafood|shrimp|prawn", "**Fish:** 145°F / 63°C — flesh opaque and flaking. Shrimp/prawns: opaque and pink throughout."],
    ["pork", "**Pork chops & roasts:** 145°F / 63°C plus a 3-minute rest (slightly pink is safe and juicy)."],
    ["steak|beef|lamb", "**Whole-muscle beef/lamb:** rare 125°F/52°C, medium-rare 135°F/57°C, medium 145°F/63°C, well 160°F/71°C. Always rest 5–10 min."],
    ["egg", "**Egg dishes** (casseroles, quiches): 160°F / 71°C, or until no liquid egg remains."],
    ["leftover|reheat", "**Reheating leftovers:** 165°F / 74°C, steaming hot all the way through. Reheat once, not repeatedly."],
    ["danger|room temperature|safe", "**Danger zone:** 40–140°F (4–60°C) — bacteria multiply fastest here. Max 2 hours at room temperature for perishable food."]
  ];

  const FIXES = [
    ["salty", "**Too salty?**\n1. Dilute — add unsalted liquid (water, stock, cream) or more unsalted ingredients.\n2. Add acid — lemon juice or vinegar rebalances perception.\n3. Add a little fat (butter, cream) or a pinch of sugar.\n4. Serve over plain rice, pasta, or bread to spread the salt across more food."],
    ["spicy|hot pepper|chili|burn", "**Too spicy?** Dairy is your friend — stir in yogurt, cream, or serve with milk. Fat, sugar, and acid also tame heat. Adding bulk (more of every other ingredient) dilutes it."],
    ["bland|flat|no flavor|tasteless", "**Tastes bland?** In this order: 1) add salt in small pinches, tasting each time; 2) if salty enough but still flat, add ACID — a squeeze of lemon or splash of vinegar (this is the most-missed fix); 3) finish with fat (butter/olive oil) and something fresh (herbs)."],
    ["sweet", "**Too sweet?** Balance with acid (lemon, vinegar) and a pinch of salt. Bitter elements (coffee, cocoa, greens) also offset sweetness."],
    ["burnt|burned|scorch", "**Burnt pot?** Stop stirring! Immediately transfer the unburnt top portion to a clean pot without scraping the bottom. Taste — a smoky note can sometimes be masked with acid, sweetness, or dairy."],
    ["mushy pasta|overcooked pasta", "**Mushy pasta can't be undone** — but next time cook 1–2 min less than the packet says and finish it in the sauce (see [Pasta Fundamentals](#/lesson/l2-5))."],
    ["sticky rice|gluey|mushy rice", "**Gluey rice?** It usually wasn't rinsed or had too much water. Rinse until water runs clear and use 1:1½ rice:water. Rescue mushy rice by spreading it on a tray to steam off, or repurpose as fried rice ([capstone lesson](#/lesson/l2-9))."],
    ["thick sauce", "**Sauce too thick?** Whisk in liquid (stock, pasta water, milk — whatever matches) a splash at a time."],
    ["thin sauce|watery", "**Sauce too thin?** Simmer uncovered to reduce, or thicken with a slurry: 1 tbsp cornstarch + 2 tbsp cold water, whisked in, then simmer 1 min."]
  ];

  function convertAnswer(q) {
    // temperature: "350 f to c" / "180c to f"
    let m = q.match(/(-?\d+(?:\.\d+)?)\s*°?\s*(f|fahrenheit|c|celsius)\b(?:\s*(?:to|in|en)\s*°?\s*(f|fahrenheit|c|celsius))?/i);
    if (m) {
      const val = parseFloat(m[1]);
      const from = m[2][0].toLowerCase();
      const to = m[3] ? m[3][0].toLowerCase() : (from === "f" ? "c" : "f");
      if (from !== to) {
        const out = from === "f" ? (val - 32) * 5 / 9 : val * 9 / 5 + 32;
        return "**" + val + "°" + from.toUpperCase() + " = " + Math.round(out) + "°" + to.toUpperCase() + "**" +
          (from === "f" && val >= 300 && val <= 500 ? "\n(For fan/convection ovens, drop about 20°C / 25°F.)" : "");
      }
    }
    // units: "2 cups to ml", "500 g in oz"
    const unitNames = Object.keys(VOL_ML).concat(Object.keys(WT_G)).sort(function (a, b) { return b.length - a.length; });
    const unitRe = unitNames.join("|").replace(/ /g, "\\s*");
    m = q.match(new RegExp("(\\d+(?:[\\.,]\\d+)?)\\s*(" + unitRe + ")\\b\\s*(?:to|in|into|=|en)\\s*(" + unitRe + ")\\b", "i"));
    if (m) {
      const val = parseFloat(m[1].replace(",", "."));
      const u1 = m[2].toLowerCase().replace(/\s+/g, " ");
      const u2 = m[3].toLowerCase().replace(/\s+/g, " ");
      const inVol = VOL_ML[u1] != null && VOL_ML[u2] != null;
      const inWt = WT_G[u1] != null && WT_G[u2] != null;
      if (inVol || inWt) {
        const table = inVol ? VOL_ML : WT_G;
        const out = val * table[u1] / table[u2];
        const rounded = out >= 10 ? Math.round(out) : Math.round(out * 100) / 100;
        return "**" + val + " " + u1 + " = " + rounded + " " + u2 + "**";
      }
      if ((VOL_ML[u1] != null) !== (VOL_ML[u2] != null)) {
        return "Those units measure different things (volume vs weight), so the answer depends on the ingredient. For water: 1 cup = 240 g. For flour: 1 cup ≈ 120 g. For sugar: 1 cup ≈ 200 g.";
      }
    }
    // quick reference asked generally
    if (/\b(convert|conversion|how many)\b/i.test(q) && /\b(cup|tbsp|tsp|ml|oz|gram)/i.test(q)) {
      return "**Quick conversions:**\n1 cup = 240 ml = 16 tbsp\n1 tbsp = 15 ml = 3 tsp\n1 tsp = 5 ml\n1 lb = 454 g · 1 oz = 28 g\nAsk me e.g. \"2 cups to ml\" or \"350 f to c\".";
    }
    return null;
  }

  function courseSearch(q) {
    const words = q.toLowerCase().split(/[^a-zà-ÿ]+/).filter(function (w) { return w.length > 3; });
    if (!words.length) return null;
    const hits = [];
    for (const level of CONTENT.levels) {
      for (const lesson of level.lessons) {
        if (lesson.stub) continue;
        const hay = (lesson.title + " " + (lesson.recipe ? lesson.recipe.name : "")).toLowerCase();
        let scoreHits = 0;
        for (const w of words) if (hay.indexOf(w) !== -1) scoreHits++;
        if (scoreHits > 0) hits.push({ n: scoreHits, lesson: lesson, level: level });
      }
    }
    if (!hits.length) return null;
    hits.sort(function (a, b) { return b.n - a.n; });
    const top = hits.slice(0, 3).map(function (h) {
      return "• [" + h.lesson.title + "](#/lesson/" + h.lesson.id + ") — recipe: " + h.lesson.recipe.name;
    });
    return "Here's what the course has on that:\n" + top.join("\n");
  }

  function offlineAnswer(q) {
    const conv = convertAnswer(q);
    if (conv) return conv;

    const lower = q.toLowerCase();

    for (const key in SUBS) {
      if (lower.indexOf(key) !== -1 && /\b(sub|replace|instead|substitut|don'?t have|no |ran out|alternative)/i.test(lower)) {
        return SUBS[key];
      }
    }
    // "substitute for X" without the trigger word list above
    const subM = lower.match(/substitut\w*\s*(?:for|of)?\s+([a-z ]+)/);
    if (subM) {
      for (const key in SUBS) if (subM[1].indexOf(key) !== -1) return SUBS[key];
    }

    if (/\b(temp|temperature|degrees|doneness|done|internal|safe)\b/i.test(lower)) {
      for (const pair of TEMPS) {
        if (new RegExp(pair[0], "i").test(lower)) return pair[1];
      }
      return "**Safe internal temperatures:**\n• Poultry: 165°F / 74°C\n• Ground meat: 160°F / 71°C\n• Pork, fish, whole cuts of beef/lamb: 145°F / 63°C (+ rest)\n• Reheated leftovers: 165°F / 74°C";
    }

    for (const pair of FIXES) {
      if (new RegExp(pair[0], "i").test(lower)) return pair[1];
    }

    const found = courseSearch(q);
    if (found) return found;

    return "I can help with:\n• **Conversions** — \"2 cups to ml\", \"350 F to C\"\n• **Substitutions** — \"substitute for buttermilk\"\n• **Safe temperatures** — \"chicken done temp\"\n• **Fixing dishes** — \"too salty\", \"too spicy\", \"gluey rice\"\n• **Finding lessons** — \"knife skills\", \"pasta\"\n\n" + t("assistant_offline_note");
  }

  /* ------------------------------------------------------------------
     OpenAI mode
     ------------------------------------------------------------------ */

  function courseOutline() {
    return CONTENT.levels.map(function (l) {
      return "Level " + l.id + " (" + l.title + "): " +
        l.lessons.map(function (x) { return x.title; }).join("; ");
    }).join("\n");
  }

  function systemPrompt() {
    let ctx = "";
    const m = location.hash.match(/^#\/lesson\/(.+)$/);
    if (m) {
      for (const level of CONTENT.levels) {
        const lesson = level.lessons.find(function (x) { return x.id === m[1]; });
        if (lesson && !lesson.stub) {
          ctx = "\nThe user is currently viewing the lesson \"" + lesson.title +
            "\" (recipe: " + lesson.recipe.name + ").";
        }
      }
    }
    return "You are the Chef Assistant on \"Chef's Path\", a beginner-to-advanced home-cooking course website. " +
      "Answer cooking questions clearly and encouragingly for home cooks. Be concise (under 150 words unless asked for detail). " +
      "Give both metric and US measurements. Prioritize food safety. " +
      "If relevant, point to a course lesson by name.\nCourse outline:\n" + courseOutline() + ctx +
      "\nRespond in the same language the user writes in.";
  }

  async function openaiAnswer(q) {
    const msgs = [{ role: "system", content: systemPrompt() }]
      .concat(history.slice(-8))
      .concat([{ role: "user", content: q }]);
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey()
      },
      body: JSON.stringify({ model: "gpt-4o-mini", messages: msgs, max_tokens: 500, temperature: 0.6 })
    });
    if (!res.ok) throw new Error("OpenAI HTTP " + res.status);
    const data = await res.json();
    return data.choices[0].message.content.trim();
  }

  /* ------------------------------------------------------------------
     UI
     ------------------------------------------------------------------ */

  function el(id) { return document.getElementById(id); }

  function inject() {
    const wrap = document.createElement("div");
    wrap.innerHTML =
      '<button id="chef-fab" class="chef-fab" aria-label="Chef assistant" title="Chef assistant">👨‍🍳</button>' +
      '<div id="chef-panel" class="chef-panel" hidden>' +
        '<div class="chef-head"><span>👨‍🍳 <strong id="chef-title"></strong></span>' +
          '<button id="chef-close" class="icon-btn" aria-label="Close">✕</button></div>' +
        '<div id="chef-msgs" class="chef-msgs"></div>' +
        '<div id="chef-chips" class="chef-chips"></div>' +
        '<form id="chef-form" class="chef-form">' +
          '<input id="chef-input" type="text" autocomplete="off">' +
          '<button type="submit" class="btn btn-primary">➤</button>' +
        '</form>' +
      '</div>';
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    el("chef-fab").addEventListener("click", toggle);
    el("chef-close").addEventListener("click", toggle);
    el("chef-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const q = el("chef-input").value.trim();
      if (q) { el("chef-input").value = ""; ask(q); }
    });
    refreshChrome();
  }

  function refreshChrome() {
    if (!el("chef-title")) return; // panel not injected yet
    el("chef-title").textContent = t("assistant_title");
    el("chef-input").placeholder = t("assistant_placeholder");
    const chips = [t("chip_convert"), t("chip_sub"), t("chip_temp"), t("chip_fix")];
    el("chef-chips").innerHTML = chips.map(function (c) {
      return '<button type="button" class="chef-chip">' + escHtml(c) + "</button>";
    }).join("");
    el("chef-chips").querySelectorAll(".chef-chip").forEach(function (b) {
      b.addEventListener("click", function () { ask(b.textContent); });
    });
  }

  function toggle() {
    panelOpen = !panelOpen;
    el("chef-panel").hidden = !panelOpen;
    el("chef-fab").classList.toggle("open", panelOpen);
    if (panelOpen && !el("chef-msgs").childElementCount) {
      addMsg("assistant", t("assistant_hi") + (apiKey() ? "" : "\n\n" + t("assistant_offline_note")));
    }
    if (panelOpen) el("chef-input").focus();
  }

  function addMsg(role, text) {
    const div = document.createElement("div");
    div.className = "chef-msg " + role;
    div.innerHTML = fmt(text);
    el("chef-msgs").appendChild(div);
    el("chef-msgs").scrollTop = el("chef-msgs").scrollHeight;
    return div;
  }

  async function ask(q) {
    if (busy) return;
    addMsg("user", q);
    history.push({ role: "user", content: q });

    let answer;
    if (apiKey()) {
      busy = true;
      const thinking = addMsg("assistant", t("assistant_thinking"));
      try {
        answer = await openaiAnswer(q);
      } catch (err) {
        answer = t("assistant_error") + "\n\n" + offlineAnswer(q);
      }
      thinking.remove();
      busy = false;
    } else {
      answer = offlineAnswer(q);
    }
    history.push({ role: "assistant", content: answer });
    if (history.length > 24) history = history.slice(-24);
    addMsg("assistant", answer);
  }

  return { inject: inject, refreshChrome: refreshChrome, apiKey: apiKey, setApiKey: setApiKey };
})();
