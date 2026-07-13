/* ==========================================================================
   Chef's Path — application logic
   Hash-based SPA router + progress tracking in localStorage.
   Content lives in js/content.js; UI strings in js/i18n.js; illustrations
   in js/pics.js; timer/game/voice/assistant in their own modules.
   ========================================================================== */

(function () {
  "use strict";

  const PROGRESS_KEY = "chefs-path-progress-v1";
  const THEME_KEY = "chefs-path-theme";

  const app = document.getElementById("app");

  /* ------------------------------------------------------------------
     Progress storage
     progress.lessons[id] = { quizPassed, cooked, steps: {idx:true} }
     ------------------------------------------------------------------ */

  let progress = loadProgress();

  function loadProgress() {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      const data = raw ? JSON.parse(raw) : null;
      if (data && typeof data === "object" && data.lessons) return data;
    } catch (e) { /* corrupted data — start fresh */ }
    return { lessons: {} };
  }

  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) { /* storage unavailable — session-only */ }
  }

  function lessonState(id) {
    return progress.lessons[id] || { quizPassed: false, cooked: false, steps: {} };
  }

  function setLessonState(id, patch) {
    progress.lessons[id] = Object.assign({ steps: {} }, lessonState(id), patch);
    saveProgress();
  }

  function isLessonComplete(id) {
    const s = lessonState(id);
    return !!(s.quizPassed && s.cooked);
  }

  /* ------------------------------------------------------------------
     Course helpers
     ------------------------------------------------------------------ */

  function getLevel(levelId) {
    return CONTENT.levels.find(function (l) { return l.id === levelId; });
  }

  function findLesson(lessonId) {
    for (const level of CONTENT.levels) {
      const lesson = level.lessons.find(function (l) { return l.id === lessonId; });
      if (lesson) return { level: level, lesson: lesson };
    }
    return null;
  }

  /* ---- content translation overlay ------------------------------------
     CONTENT_I18N[lang][lessonId] holds translated fields (see
     js/content-translations.js). Any missing field falls back to English,
     so partial translations render cleanly. */

  function levelOverlay(levelId) {
    const lang = I18N.getLang();
    return (window.CONTENT_I18N && CONTENT_I18N[lang] && CONTENT_I18N[lang].levels &&
            CONTENT_I18N[lang].levels[levelId]) || null;
  }

  function locLevelTitle(level) {
    const ov = levelOverlay(level.id);
    return (ov && ov.title) || level.title;
  }
  function locLevelSubtitle(level) {
    const ov = levelOverlay(level.id);
    return (ov && ov.subtitle) || level.subtitle;
  }

  function lessonOverlay(lessonId) {
    const lang = I18N.getLang();
    return (window.CONTENT_I18N && CONTENT_I18N[lang] && CONTENT_I18N[lang][lessonId]) || null;
  }

  /* Merge a lesson with its translation overlay for the active language. */
  function localizedLesson(lesson) {
    const ov = lessonOverlay(lesson.id);
    if (!ov || lesson.stub) return lesson;
    const ovt = ov.technique || {};
    const ovr = ov.recipe || {};
    return {
      id: lesson.id,
      stub: lesson.stub,
      minutes: lesson.minutes,
      title: ov.title || lesson.title,
      intro: ov.intro || lesson.intro,
      technique: {
        heading: ovt.heading || lesson.technique.heading,
        steps: lesson.technique.steps.map(function (st, i) {
          return {
            text: (ovt.steps && ovt.steps[i]) || st.text,
            tip: (ovt.tips && ovt.tips[i] != null) ? ovt.tips[i] : st.tip
          };
        })
      },
      recipe: {
        name: ovr.name || lesson.recipe.name,
        description: ovr.description || lesson.recipe.description,
        servings: lesson.recipe.servings,
        time: ovr.time || lesson.recipe.time,
        ingredients: lesson.recipe.ingredients.map(function (ing, i) {
          return {
            qty: ing.qty,
            unit: (ovr.units && ovr.units[i] != null) ? ovr.units[i] : ing.unit,
            item: (ovr.ingredients && ovr.ingredients[i]) || ing.item
          };
        }),
        steps: lesson.recipe.steps.map(function (s, i) {
          return (ovr.steps && ovr.steps[i]) || s;
        })
      },
      quiz: lesson.quiz.map(function (q, i) {
        const oq = ov.quiz && ov.quiz[i];
        return {
          q: (oq && oq.q) || q.q,
          options: q.options.map(function (o, j) {
            return (oq && oq.options && oq.options[j]) || o;
          }),
          answer: q.answer
        };
      })
    };
  }

  function levelCompletion(level) {
    const total = level.lessons.length;
    if (!total) return 0;
    const done = level.lessons.filter(function (l) { return isLessonComplete(l.id); }).length;
    return done / total;
  }

  function isLevelUnlocked(level) {
    if (level.id === 1) return true;
    const prev = getLevel(level.id - 1);
    if (!prev) return false;
    return levelCompletion(prev) >= CONTENT.unlockRatio;
  }

  function levelHasContent(level) {
    return level.lessons.some(function (l) { return !l.stub; });
  }

  function completedLessonCount() {
    let n = 0;
    for (const level of CONTENT.levels) {
      for (const lesson of level.lessons) {
        if (isLessonComplete(lesson.id)) n++;
      }
    }
    return n;
  }

  function countWhere(fn) {
    let n = 0;
    for (const id in progress.lessons) {
      if (fn(progress.lessons[id])) n++;
    }
    return n;
  }

  function todaysPractice() {
    for (const level of CONTENT.levels) {
      if (!isLevelUnlocked(level) || !levelHasContent(level)) continue;
      for (const lesson of level.lessons) {
        if (lesson.stub || isLessonComplete(lesson.id)) continue;
        const s = lessonState(lesson.id);
        const ll = localizedLesson(lesson);
        return {
          lesson: ll,
          level: level,
          action: s.quizPassed && !s.cooked
            ? t("quiz_passed_cook") + " — " + ll.recipe.name
            : (s.cooked && !s.quizPassed
              ? t("cooked_take_quiz")
              : "~" + lesson.minutes + " " + t("min_short"))
        };
      }
    }
    const cookable = [];
    for (const level of CONTENT.levels) {
      for (const lesson of level.lessons) {
        if (!lesson.stub && isLessonComplete(lesson.id)) cookable.push({ lesson: lesson, level: level });
      }
    }
    if (!cookable.length) return null;
    const dayIndex = Math.floor(Date.now() / 86400000) % cookable.length;
    const pick = cookable[dayIndex];
    const pl = localizedLesson(pick.lesson);
    return { lesson: pl, level: pick.level, action: pl.recipe.name, revisit: true };
  }

  /* ------------------------------------------------------------------
     Badges
     ------------------------------------------------------------------ */

  const BADGES = [
    { id: "first-lesson", icon: "🥄", name: "First Steps", desc: "Complete your first lesson", earned: function () { return completedLessonCount() >= 1; } },
    { id: "first-cook", icon: "🍽️", name: "It's Alive!", desc: "Mark your first recipe as cooked", earned: function () { return countWhere(function (s) { return s.cooked; }) >= 1; } },
    { id: "quiz-3", icon: "🧠", name: "Quiz Whiz", desc: "Pass 5 quizzes", earned: function () { return countWhere(function (s) { return s.quizPassed; }) >= 5; } },
    { id: "cook-5", icon: "👩‍🍳", name: "Regular at the Stove", desc: "Cook 5 practice recipes", earned: function () { return countWhere(function (s) { return s.cooked; }) >= 5; } },
    { id: "level-1", icon: "🔪", name: "Knife Confident", desc: "Complete every Level 1 lesson", earned: function () { return levelCompletion(getLevel(1)) >= 1; } },
    { id: "unlock-2", icon: "🔓", name: "Leveled Up", desc: "Unlock Level 2", earned: function () { return isLevelUnlocked(getLevel(2)); } },
    { id: "ten-lessons", icon: "🔥", name: "On a Roll", desc: "Complete 10 lessons", earned: function () { return completedLessonCount() >= 10; } },
    { id: "level-2", icon: "🍳", name: "Foundation Built", desc: "Complete every Level 2 lesson", earned: function () { return levelCompletion(getLevel(2)) >= 1; } }
  ];

  /* ------------------------------------------------------------------
     Utilities
     ------------------------------------------------------------------ */

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function formatQty(q) {
    if (q == null) return "";
    if (q <= 0) return "0";
    const whole = Math.floor(q);
    const frac = q - whole;
    const nice = [
      [0, ""], [0.125, "⅛"], [0.25, "¼"], [1 / 3, "⅓"], [0.5, "½"],
      [2 / 3, "⅔"], [0.75, "¾"], [1, ""]
    ];
    let best = null, bestDiff = Infinity;
    for (const cand of nice) {
      const d = Math.abs(frac - cand[0]);
      if (d < bestDiff) { bestDiff = d; best = cand; }
    }
    if (bestDiff > 0.04) return String(Math.round(q * 100) / 100);
    let w = whole, f = best[1];
    if (best[0] === 1) { w += 1; f = ""; }
    if (w === 0) return f || "0";
    return f ? w + " " + f : String(w);
  }

  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 3500);
  }
  window.appToast = toast; // used by the timer module

  /* ------------------------------------------------------------------
     Theme
     ------------------------------------------------------------------ */

  function currentTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  document.getElementById("theme-toggle").addEventListener("click", function () {
    const next = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  applyTheme(currentTheme());

  /* Color palette (independent of light/dark): "classic" | "neon" */
  const PALETTE_KEY = "chefs-path-palette";
  const PALETTES = ["classic", "neon", "sunset"];

  function currentPalette() {
    const p = localStorage.getItem(PALETTE_KEY);
    return PALETTES.indexOf(p) !== -1 ? p : "classic";
  }
  function applyPalette(p) {
    if (p && p !== "classic") document.documentElement.setAttribute("data-palette", p);
    else document.documentElement.removeAttribute("data-palette");
  }
  applyPalette(currentPalette());

  /* ------------------------------------------------------------------
     Language / chrome
     ------------------------------------------------------------------ */

  function applyChrome() {
    I18N.applyDir();
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.getElementById("footer-text").textContent = t("footer");
    if (typeof Assistant !== "undefined") Assistant.refreshChrome();
  }

  /* ------------------------------------------------------------------
     Shared renderers
     ------------------------------------------------------------------ */

  function progressBar(ratio) {
    const pct = Math.round(ratio * 100);
    return '<div class="bar"><div class="bar-fill' + (pct >= 100 ? " complete" : "") +
      '" style="width:' + pct + '%"></div></div>';
  }

  function speakBtn(text) {
    if (typeof Voice === "undefined" || !Voice.supported()) return "";
    return '<div class="section-tools"><button type="button" class="speak-btn" data-speak="' +
      esc(text) + '">' + t("read_aloud") + "</button></div>";
  }

  function recipeHtml(recipe, key, opts) {
    opts = opts || {};
    const servings = opts.servings || recipe.servings;
    const factor = servings / recipe.servings;

    const ingRows = recipe.ingredients.map(function (ing) {
      if (ing.qty == null) {
        return '<li><span class="ing-qty"></span><span>' + esc(ing.item) + "</span></li>";
      }
      const qty = formatQty(ing.qty * factor);
      const unit = ing.unit ? " " + esc(ing.unit) : "";
      return '<li><span class="ing-qty">' + qty + unit + '</span><span>' + esc(ing.item) + "</span></li>";
    }).join("");

    const steps = recipe.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");

    const speakText = recipe.name + ". Ingredients: " +
      recipe.ingredients.map(function (i) {
        return (i.qty != null ? formatQty(i.qty * factor) + " " + i.unit + " " : "") + i.item;
      }).join(", ") + ". Method: " + recipe.steps.join(" ");

    return '' +
      '<div class="recipe-title-row">' +
        '<h3 style="font-size:1.15rem">' + esc(recipe.name) + '</h3>' +
        '<span class="chip">⏱ ' + esc(recipe.time) + '</span>' +
      '</div>' +
      '<p class="recipe-desc">' + esc(recipe.description) + '</p>' +
      speakBtn(speakText) +
      '<div class="servings-ctl" data-recipe-key="' + esc(key) + '">' +
        '<button type="button" data-serv="-1" aria-label="Fewer servings">−</button>' +
        '<span class="servings-num">' + servings + " " + (servings === 1 ? t("serving") : t("servings")) + '</span>' +
        '<button type="button" data-serv="1" aria-label="More servings">+</button>' +
      '</div>' +
      '<ul class="ingredients">' + ingRows + '</ul>' +
      '<h4 style="margin-bottom:0.5rem">' + t("method") + '</h4>' +
      '<ol class="recipe-steps">' + steps + '</ol>';
  }

  function bindServingsControls(container, servingsMap, baseLookup, rerender) {
    container.querySelectorAll(".servings-ctl button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const key = btn.closest(".servings-ctl").getAttribute("data-recipe-key");
        const base = baseLookup(key);
        const current = servingsMap[key] || base.servings;
        const next = Math.min(24, Math.max(1, current + parseInt(btn.getAttribute("data-serv"), 10)));
        servingsMap[key] = next;
        rerender(key, next);
      });
    });
  }

  /* ------------------------------------------------------------------
     View: Learn (home)
     ------------------------------------------------------------------ */

  function viewLearn() {
    let html = "";

    const today = todaysPractice();
    if (today) {
      html +=
        '<section class="hero">' +
          '<div class="eyebrow">🍅 ' + t("todays_practice") + '</div>' +
          '<h2>' + esc(today.revisit ? today.lesson.recipe.name : today.lesson.title) + '</h2>' +
          '<p>' + esc(today.action) + '</p>' +
          '<a class="btn btn-primary" href="#/lesson/' + today.lesson.id + '">' +
            (today.revisit ? t("open_recipe") : t("continue_learning")) + '</a>' +
        '</section>';
    }

    html += '<h1 class="page-title">' + t("your_path") + '</h1>' +
      '<p class="page-sub">' + t("path_sub", { pct: Math.round(CONTENT.unlockRatio * 100) }) + '</p>';

    for (const level of CONTENT.levels) {
      const unlocked = isLevelUnlocked(level);
      const ratio = levelCompletion(level);
      const doneCount = level.lessons.filter(function (l) { return isLessonComplete(l.id); }).length;

      html += '<section class="card level-card' + (unlocked ? "" : " locked") + '">' +
        '<div class="level-header">' +
          '<div class="level-icon">' + (unlocked ? level.icon : "🔒") + '</div>' +
          '<div class="level-title-wrap">' +
            '<div class="level-num">' + t("level") + " " + level.id + '</div>' +
            '<div class="level-title">' + esc(locLevelTitle(level)) + '</div>' +
            '<div class="level-sub">' + esc(locLevelSubtitle(level)) + '</div>' +
            (unlocked && levelHasContent(level) ? progressBar(ratio) : "") +
          '</div>' +
          '<div class="level-meta">' +
            (unlocked
              ? (levelHasContent(level)
                  ? t("lessons_count", { done: doneCount, total: level.lessons.length })
                  : '<span class="lock-tag">' + t("coming_soon") + '</span>')
              : '<span class="lock-tag">' + t("locked_finish", { n: level.id - 1 }) + '</span>') +
          '</div>' +
        '</div>';

      if (unlocked) {
        html += '<div class="lesson-list">';
        for (const lesson of level.lessons) {
          if (lesson.stub) {
            html += '<div class="lesson-row stub">' +
              '<span class="lesson-status">•</span>' +
              '<span class="lesson-row-title">' + esc(lesson.title) + '</span>' +
              '<span class="lesson-row-meta">' + t("coming_soon") + '</span>' +
            '</div>';
            continue;
          }
          const s = lessonState(lesson.id);
          const complete = isLessonComplete(lesson.id);
          const partial = !complete && (s.quizPassed || s.cooked);
          const statusCls = complete ? "done" : (partial ? "partial" : "");
          const statusIcon = complete ? "✓" : (partial ? "…" : "");
          const meta = complete ? t("completed") : (partial
            ? (s.quizPassed ? t("quiz_passed_cook") : t("cooked_take_quiz"))
            : "~" + lesson.minutes + " " + t("min_short"));
          html += '<a class="lesson-row" href="#/lesson/' + lesson.id + '">' +
            '<span class="lesson-status ' + statusCls + '">' + statusIcon + '</span>' +
            '<span class="lesson-row-title">' + esc(localizedLesson(lesson).title) + '</span>' +
            '<span class="lesson-row-meta">' + esc(meta) + '</span>' +
          '</a>';
        }
        html += '</div>';
      }
      html += '</section>';
    }

    app.innerHTML = html;
  }

  /* ------------------------------------------------------------------
     View: Lesson
     ------------------------------------------------------------------ */

  function viewLesson(lessonId) {
    const found = findLesson(lessonId);
    if (!found || found.lesson.stub) { return viewNotFound(); }
    const level = found.level, lesson = localizedLesson(found.lesson);

    if (!isLevelUnlocked(level)) {
      app.innerHTML =
        '<div class="breadcrumb"><a href="#/learn">' + t("back_to_learn") + '</a></div>' +
        '<div class="card empty-state"><div class="big">🔒</div>' +
        '<h2>' + t("lesson_locked") + '</h2>' +
        '<p>' + t("lesson_locked_body", { pct: Math.round(CONTENT.unlockRatio * 100), a: level.id - 1, b: level.id }) + '</p></div>';
      return;
    }

    const local = { servings: {} };

    function render() {
      const s = lessonState(lesson.id);
      const complete = isLessonComplete(lesson.id);

      const introHtml = lesson.intro.split("\n\n").map(function (p) {
        return "<p>" + esc(p) + "</p>";
      }).join("");

      const stepsState = s.steps || {};
      const techSteps = lesson.technique.steps.map(function (st, i) {
        const done = !!stepsState[i];
        return '<li class="step-item' + (done ? " done-step" : "") + '">' +
          '<button type="button" class="step-check' + (done ? " done" : "") + '" data-step="' + i +
            '" aria-label="Mark step done">' + (done ? "✓" : (i + 1)) + "</button>" +
          '<span class="step-text">' + esc(st.text) + "</span>" +
          (st.tip ? '<div class="tip"><strong>Tip:</strong> ' + esc(st.tip) + "</div>" : "") +
          "</li>";
      }).join("");

      const allStepsDone = lesson.technique.steps.every(function (_, i) { return !!stepsState[i]; });

      const quizHtml = lesson.quiz.map(function (q, qi) {
        const opts = q.options.map(function (opt, oi) {
          return '<label class="quiz-opt" data-q="' + qi + '" data-o="' + oi + '">' +
            '<input type="radio" name="q' + qi + '" value="' + oi + '">' +
            '<span>' + esc(opt) + '</span></label>';
        }).join("");
        return '<div class="quiz-q"><h3>' + (qi + 1) + ". " + esc(q.q) + "</h3>" + opts + "</div>";
      }).join("");

      const introSpeak = lesson.title + ". " + lesson.intro;
      const techSpeak = lesson.technique.heading + ". " +
        lesson.technique.steps.map(function (st, i) {
          return "Step " + (i + 1) + ": " + st.text + (st.tip ? " Tip: " + st.tip : "");
        }).join(" ");

      app.innerHTML =
        '<div class="breadcrumb"><a href="#/learn">' + t("back_to_learn") + '</a></div>' +
        '<div class="lesson-head">' +
          '<span class="chip">' + t("level") + " " + level.id + ' · ' + esc(locLevelTitle(level)) + '</span>' +
          '<span class="chip green">~' + lesson.minutes + ' ' + t("min_short") + '</span>' +
          '<h1>' + esc(lesson.title) + '</h1>' +
        '</div>' +
        PICS.pic(lesson.id, "wide", lesson.recipe.name) +

        (complete ? '<div class="completion-banner">' + t("lesson_complete_banner") + '</div>' : "") +

        '<section class="card section-card intro-text"><h2>📖 ' + t("the_idea") + '</h2>' +
          speakBtn(introSpeak) + introHtml + '</section>' +

        '<section class="card section-card"><h2>🛠️ ' + esc(lesson.technique.heading) + '</h2>' +
          speakBtn(techSpeak) +
          '<p style="color:var(--text-soft);font-size:0.85rem;margin-bottom:0.9rem">' + t("steps_done_hint") + '</p>' +
          '<ol class="tech-steps">' + techSteps + '</ol>' +
          '<div class="steps-footer">' +
            '<button type="button" class="btn btn-outline" id="all-steps-btn"' + (allStepsDone ? " hidden" : "") + '>' + t("mark_all_done") + '</button>' +
            '<span class="steps-done-msg" id="steps-done-msg"' + (allStepsDone ? "" : " hidden") + '>' + t("all_steps_done") + '</span>' +
          '</div>' +
        '</section>' +

        '<section class="card section-card recipe-card"><h2>🍽️ ' + t("practice_recipe") + '</h2>' +
          '<div id="recipe-slot">' +
            recipeHtml(lesson.recipe, lesson.id, { servings: local.servings[lesson.id] }) +
          '</div>' +
          '<div class="cooked-row">' +
            (s.cooked
              ? '<button class="btn btn-success" id="cooked-btn">' + t("cooked_undo") + '</button>'
              : '<button class="btn btn-outline" id="cooked-btn">' + t("mark_cooked") + '</button>') +
            '<span style="color:var(--text-soft);font-size:0.88rem">' + t("cooked_half") + '</span>' +
          '</div>' +
        '</section>' +

        '<section class="card section-card"><h2>❓ ' + t("quick_quiz") + '</h2>' +
          (s.quizPassed
            ? '<div class="quiz-result pass">' + t("quiz_already_passed") + '</div><br>'
            : '<p style="color:var(--text-soft);margin-bottom:1rem">' +
              t("quiz_need", { n: CONTENT.passThreshold, m: lesson.quiz.length }) + '</p>') +
          '<form id="quiz-form">' + quizHtml +
            '<button type="submit" class="btn btn-primary">' + t("check_answers") + '</button>' +
            '<div id="quiz-result-slot"></div>' +
          '</form>' +
        '</section>' +

        '<div class="lesson-nav-row">' +
          '<a class="btn btn-ghost" href="#/learn">' + t("all_lessons") + '</a>' +
          (nextLessonLink(level, lesson) || "") +
        '</div>';

      bindLessonEvents();
    }

    function nextLessonLink(level, lesson) {
      const idx = level.lessons.findIndex(function (l) { return l.id === lesson.id; });
      const next = level.lessons[idx + 1];
      if (next && !next.stub) {
        return '<a class="btn btn-ghost" href="#/lesson/' + next.id + '">' + t("next_lesson") + '</a>';
      }
      return "";
    }

    function bindLessonEvents() {
      if (typeof Voice !== "undefined") Voice.bind(app);

      // step done buttons (update in place — no full re-render)
      app.querySelectorAll(".step-check").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const i = parseInt(btn.getAttribute("data-step"), 10);
          const s = lessonState(lesson.id);
          const steps = Object.assign({}, s.steps || {});
          steps[i] = !steps[i];
          setLessonState(lesson.id, { steps: steps });

          const li = btn.closest(".step-item");
          btn.classList.toggle("done", !!steps[i]);
          btn.textContent = steps[i] ? "✓" : String(i + 1);
          li.classList.toggle("done-step", !!steps[i]);

          const allDone = lesson.technique.steps.every(function (_, k) { return !!steps[k]; });
          document.getElementById("all-steps-btn").hidden = allDone;
          document.getElementById("steps-done-msg").hidden = !allDone;
          if (allDone) toast(t("all_steps_done"));
        });
      });

      document.getElementById("all-steps-btn").addEventListener("click", function () {
        const steps = {};
        lesson.technique.steps.forEach(function (_, i) { steps[i] = true; });
        setLessonState(lesson.id, { steps: steps });
        render();
        toast(t("all_steps_done"));
      });

      // servings scaling — rebind after each in-place re-render of the slot
      function wireRecipeSlot() {
        const slot = document.getElementById("recipe-slot");
        if (typeof Voice !== "undefined") Voice.bind(slot);
        bindServingsControls(slot, local.servings,
          function () { return lesson.recipe; },
          function (key, servings) {
            slot.innerHTML = recipeHtml(lesson.recipe, key, { servings: servings });
            wireRecipeSlot();
          });
      }
      wireRecipeSlot();

      // cooked toggle
      document.getElementById("cooked-btn").onclick = function () {
        const s = lessonState(lesson.id);
        const wasComplete = isLessonComplete(lesson.id);
        setLessonState(lesson.id, { cooked: !s.cooked });
        afterProgressChange(wasComplete);
        render();
      };

      // quiz selection highlighting
      app.querySelectorAll(".quiz-opt input").forEach(function (input) {
        input.addEventListener("change", function () {
          const q = input.closest(".quiz-q");
          q.querySelectorAll(".quiz-opt").forEach(function (o) { o.classList.remove("selected"); });
          input.closest(".quiz-opt").classList.add("selected");
        });
      });

      // quiz grading
      document.getElementById("quiz-form").onsubmit = function (e) {
        e.preventDefault();
        const form = e.target;
        let answered = 0, correct = 0;

        lesson.quiz.forEach(function (q, qi) {
          if (form.querySelector('input[name="q' + qi + '"]:checked')) answered++;
        });
        if (answered < lesson.quiz.length) {
          document.getElementById("quiz-result-slot").innerHTML =
            '<div class="quiz-result fail">' + t("quiz_answer_all", { n: lesson.quiz.length }) + '</div>';
          return;
        }

        lesson.quiz.forEach(function (q, qi) {
          const picked = form.querySelector('input[name="q' + qi + '"]:checked');
          const pickedIdx = parseInt(picked.value, 10);
          form.querySelectorAll('.quiz-opt[data-q="' + qi + '"]').forEach(function (optEl) {
            const oi = parseInt(optEl.getAttribute("data-o"), 10);
            optEl.classList.remove("selected");
            if (oi === q.answer) optEl.classList.add("correct");
            else if (oi === pickedIdx) optEl.classList.add("incorrect");
          });
          if (pickedIdx === q.answer) correct++;
        });

        const passed = correct >= CONTENT.passThreshold;
        const slot = document.getElementById("quiz-result-slot");
        if (passed) {
          slot.innerHTML = '<div class="quiz-result pass">' +
            t("quiz_passed_result", { c: correct, m: lesson.quiz.length }) + '</div>';
          const wasComplete = isLessonComplete(lesson.id);
          const alreadyPassed = lessonState(lesson.id).quizPassed;
          setLessonState(lesson.id, { quizPassed: true });
          if (!alreadyPassed) afterProgressChange(wasComplete);
          setTimeout(function () {
            // only refresh if the user is still on this lesson
            if (location.hash === "#/lesson/" + lesson.id) render();
          }, 1600);
        } else {
          slot.innerHTML = '<div class="quiz-result fail">' +
            t("quiz_failed_result", { c: correct, m: lesson.quiz.length, n: CONTENT.passThreshold }) + '</div>';
        }
      };
    }

    function afterProgressChange(wasComplete) {
      const nowComplete = isLessonComplete(lesson.id);
      if (!wasComplete && nowComplete) {
        const nextLevel = getLevel(level.id + 1);
        if (nextLevel && isLevelUnlocked(nextLevel) && !wasLevelUnlockToastShown(nextLevel.id)) {
          toast("🔓 " + t("level") + " " + nextLevel.id + ": " + nextLevel.title + "!");
          markLevelUnlockToastShown(nextLevel.id);
        } else {
          toast("🎉 " + lesson.title);
        }
      }
    }

    render();
  }

  function wasLevelUnlockToastShown(levelId) {
    return !!(progress.unlockToasts && progress.unlockToasts[levelId]);
  }
  function markLevelUnlockToastShown(levelId) {
    progress.unlockToasts = progress.unlockToasts || {};
    progress.unlockToasts[levelId] = true;
    saveProgress();
  }

  /* ------------------------------------------------------------------
     View: Progress
     ------------------------------------------------------------------ */

  function viewProgress() {
    const realLevels = CONTENT.levels.filter(levelHasContent);
    const totalLessons = realLevels.reduce(function (n, l) { return n + l.lessons.length; }, 0);
    const done = completedLessonCount();
    const overallPct = totalLessons ? Math.round((done / totalLessons) * 100) : 0;

    let html = '<h1 class="page-title">' + t("your_progress") + '</h1>' +
      '<p class="page-sub">' + t("progress_sub") + '</p>';

    html += '<div class="card overall-card">' +
      '<div class="overall-num">' + overallPct + '%</div>' +
      '<div>' + t("of_lessons", { done: done, total: totalLessons }) + '</div>' +
      progressBar(totalLessons ? done / totalLessons : 0) +
      '</div>';

    html += '<div class="progress-grid">';
    for (const level of CONTENT.levels) {
      const unlocked = isLevelUnlocked(level);
      const hasContent = levelHasContent(level);
      const ratio = levelCompletion(level);
      const pct = Math.round(ratio * 100);
      html += '<div class="card progress-row' + (unlocked ? "" : " locked") + '">' +
        '<div class="level-icon">' + (unlocked ? level.icon : "🔒") + '</div>' +
        '<div class="progress-row-body">' +
          '<div class="progress-row-title">' + t("level") + " " + level.id + ": " + esc(locLevelTitle(level)) + '</div>' +
          (unlocked
            ? (hasContent ? progressBar(ratio)
               : '<span class="level-sub">' + t("coming_soon") + '</span>')
            : '<span class="level-sub">' + t("locked_word", { n: level.id - 1 }) + '</span>') +
        '</div>' +
        '<div class="progress-row-pct">' + (unlocked && hasContent ? pct + "%" : "—") + '</div>' +
      '</div>';
    }
    html += '</div>';

    html += '<h2 style="font-size:1.4rem;margin-bottom:0.9rem">' + t("badges") + '</h2><div class="badges-grid">';
    for (const b of BADGES) {
      const earned = b.earned();
      html += '<div class="card badge-card ' + (earned ? "earned" : "locked") + '">' +
        '<span class="badge-icon">' + b.icon + '</span>' +
        '<div class="badge-name">' + esc(b.name) + '</div>' +
        '<div class="badge-desc">' + esc(b.desc) + '</div>' +
      '</div>';
    }
    html += '</div>';

    app.innerHTML = html;
  }

  /* ------------------------------------------------------------------
     View: Recipes
     ------------------------------------------------------------------ */

  function viewRecipes() {
    const learned = [];
    for (const level of CONTENT.levels) {
      for (const lesson of level.lessons) {
        if (lesson.stub) continue;
        const s = lessonState(lesson.id);
        if (s.quizPassed || s.cooked) learned.push({ level: level, lesson: lesson });
      }
    }

    let html = '<h1 class="page-title">' + t("recipe_box") + '</h1>' +
      '<p class="page-sub">' + t("recipes_sub") + '</p>';

    if (!learned.length) {
      html += '<div class="card empty-state">' +
        '<div class="big">🍲</div>' +
        '<h2>' + t("no_recipes_title") + '</h2>' +
        '<p>' + t("no_recipes_body") + '</p>' +
        '<br><a class="btn btn-primary" href="#/learn">' + t("go_first_lesson") + '</a>' +
      '</div>';
      app.innerHTML = html;
      return;
    }

    const servingsMap = {};
    const openSet = {};

    html += '<div class="recipes-grid">';
    for (const item of learned) {
      const ll = localizedLesson(item.lesson);
      const r = ll.recipe;
      html += '<div class="card recipe-tile" data-lesson="' + item.lesson.id + '">' +
        '<button type="button" class="recipe-tile-head">' +
          PICS.pic(item.lesson.id, "thumb", r.name) +
          '<div style="flex:1;min-width:0">' +
            '<div class="recipe-tile-title">' + esc(r.name) + '</div>' +
            '<div class="recipe-tile-sub">' + t("level") + " " + item.level.id + " · " + esc(ll.title) +
              " · ⏱ " + esc(r.time) + '</div>' +
          '</div>' +
          '<span class="recipe-tile-chevron">▾</span>' +
        '</button>' +
        '<div class="recipe-tile-body" hidden></div>' +
      '</div>';
    }
    html += '</div>';
    app.innerHTML = html;

    function renderTileBody(tile, lessonId) {
      const found = findLesson(lessonId);
      const recipe = localizedLesson(found.lesson).recipe;
      const body = tile.querySelector(".recipe-tile-body");
      body.innerHTML = recipeHtml(recipe, lessonId, { servings: servingsMap[lessonId] }) +
        '<br><a class="btn btn-ghost" href="#/lesson/' + lessonId + '">' + t("open_full_lesson") + '</a>';
      if (typeof Voice !== "undefined") Voice.bind(body);
      bindServingsControls(body, servingsMap,
        function (key) { return localizedLesson(findLesson(key).lesson).recipe; },
        function (key) { renderTileBody(tile, key); });
    }

    app.querySelectorAll(".recipe-tile").forEach(function (tile) {
      const lessonId = tile.getAttribute("data-lesson");
      tile.querySelector(".recipe-tile-head").addEventListener("click", function () {
        const body = tile.querySelector(".recipe-tile-body");
        openSet[lessonId] = !openSet[lessonId];
        if (openSet[lessonId]) {
          renderTileBody(tile, lessonId);
          body.hidden = false;
        } else {
          body.hidden = true;
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     View: Timer (+ game)
     ------------------------------------------------------------------ */

  const PRESETS = [5, 10, 15, 20, 25, 30, 45, 60];

  function viewTimer() {
    let html = '<h1 class="page-title">⏱ ' + t("timer_title") + '</h1>' +
      '<p class="page-sub">' + t("timer_sub") + '</p>';

    html += '<div class="card section-card" id="timer-card">' + timerCardHtml() + '</div>';

    html += '<div class="card section-card">' +
      '<h2>🎮 ' + t("play_while_wait") + '</h2>' +
      '<p style="color:var(--text-soft);font-size:0.88rem;margin-bottom:0.8rem">' + t("game_help") + '</p>' +
      '<div class="game-hud">' +
        '<span>' + t("game_score") + ': <span id="game-score">0</span></span>' +
        '<span class="lives" id="game-lives">❤️❤️❤️</span>' +
        '<span>' + t("game_best") + ': <span id="game-best">' + Game.best() + '</span></span>' +
        '<button class="game-mute" id="game-mute" aria-label="' + t("game_sound") + '" title="' + t("game_sound") + '">' +
          (Game.isMuted() ? "🔇" : "🔊") + '</button>' +
      '</div>' +
      '<canvas id="game-canvas" class="game-canvas"></canvas>' +
      '<div class="game-overlay" id="game-overlay">' +
        '<button class="btn btn-primary" id="game-start-btn">' + t("game_start") + '</button>' +
      '</div>' +
    '</div>';

    app.innerHTML = html;
    bindTimerCard();

    // mount the game
    const canvas = document.getElementById("game-canvas");
    Game.mount(canvas, function (st) {
      const scoreEl = document.getElementById("game-score");
      if (!scoreEl) return;
      scoreEl.textContent = st.score;
      document.getElementById("game-best").textContent = st.best;
      document.getElementById("game-lives").textContent = "❤️".repeat(Math.max(0, st.lives));
      const overlay = document.getElementById("game-overlay");
      if (st.over) {
        overlay.innerHTML = '<p style="font-weight:700;margin-bottom:0.5rem">' +
          t("game_score") + ": " + st.score + " · " + t("game_best") + ": " + st.best + '</p>' +
          '<button class="btn btn-primary" id="game-start-btn">' + t("game_again") + '</button>';
        bindGameStart();
      }
    });
    bindGameStart();

    const muteBtn = document.getElementById("game-mute");
    if (muteBtn) muteBtn.addEventListener("click", function () {
      Game.setMuted(!Game.isMuted());
      muteBtn.textContent = Game.isMuted() ? "🔇" : "🔊";
    });
  }

  function bindGameStart() {
    const btn = document.getElementById("game-start-btn");
    if (btn) btn.addEventListener("click", function () {
      document.getElementById("game-overlay").innerHTML = "";
      Game.start();
    });
  }

  function timerCardHtml() {
    if (Timer.active() || Timer.finished()) {
      const fin = Timer.finished();
      const pills = Timer.MILESTONES.filter(function (m) { return Timer.duration() > m; })
        .map(function (m) {
          const fired = Timer.remainingMs() <= m * 60000;
          return '<span class="milestone-pill' + (fired ? " fired" : "") + '">' + m + "'</span>";
        }).join("");
      return '<div style="text-align:center;color:var(--text-soft)">' +
          (fin ? "" : t("timer_running_for") + " · " + Timer.duration() + " " + t("minutes")) + '</div>' +
        '<div class="timer-display' + (fin ? " finished" : "") + '" id="timer-display">' +
          (fin ? t("time_up") : Timer.remainingText()) + '</div>' +
        (fin ? "" : '<div class="timer-milestones">' + pills + "</div>") +
        '<div style="text-align:center;margin-top:1.2rem">' +
          '<button class="btn btn-danger" id="timer-cancel-btn">' + t("cancel_timer") + '</button></div>';
    }
    return '<div class="timer-presets">' +
        PRESETS.map(function (m) {
          return '<button class="preset-btn" data-mins="' + m + '">' + m + "'</button>";
        }).join("") + '</div>' +
      '<div class="timer-custom-row">' +
        '<input type="number" id="timer-custom" min="1" max="240" placeholder="' + t("timer_custom") + '"> ' +
        '<span style="color:var(--text-soft)">' + t("minutes") + '</span>' +
        '<button class="btn btn-primary" id="timer-start-btn">' + t("start_timer") + '</button>' +
      '</div>' +
      ('Notification' in window && Notification.permission !== "granted"
        ? '<p class="notif-hint">🔔 ' + t("notif_hint") + '</p>' : "");
  }

  function bindTimerCard() {
    const card = document.getElementById("timer-card");
    if (!card) return;
    card.querySelectorAll(".preset-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        Timer.start(parseInt(btn.getAttribute("data-mins"), 10));
        card.innerHTML = timerCardHtml();
        bindTimerCard();
      });
    });
    const startBtn = document.getElementById("timer-start-btn");
    if (startBtn) startBtn.addEventListener("click", function () {
      const v = parseInt(document.getElementById("timer-custom").value, 10);
      if (v > 0) {
        Timer.start(v);
        card.innerHTML = timerCardHtml();
        bindTimerCard();
      }
    });
    const cancelBtn = document.getElementById("timer-cancel-btn");
    if (cancelBtn) cancelBtn.addEventListener("click", function () {
      Timer.cancel();
      card.innerHTML = timerCardHtml();
      bindTimerCard();
    });
  }

  /* live updates: header chip everywhere + tab title + display on timer page */
  const BASE_TITLE = document.title;
  Timer.onChange(function () {
    const chip = document.getElementById("timer-chip");
    if (Timer.active() || Timer.finished()) {
      chip.hidden = false;
      chip.classList.toggle("finished", Timer.finished());
      document.getElementById("timer-chip-time").textContent =
        Timer.finished() ? "0:00" : Timer.remainingText();
    } else {
      chip.hidden = true;
    }

    // Live countdown in the browser tab title, so a backgrounded tab shows it.
    if (Timer.finished()) document.title = "⏰ Time's up! · Chef's Path";
    else if (Timer.active()) document.title = "⏱ " + Timer.remainingText() + " · Chef's Path";
    else if (document.title !== BASE_TITLE) document.title = BASE_TITLE;

    const disp = document.getElementById("timer-display");
    if (disp && Timer.active() && !Timer.finished()) {
      disp.textContent = Timer.remainingText();
      // refresh milestone pills
      const card = document.getElementById("timer-card");
      const pills = card.querySelectorAll(".milestone-pill");
      const shown = Timer.MILESTONES.filter(function (m) { return Timer.duration() > m; });
      pills.forEach(function (p, i) {
        if (shown[i] != null) p.classList.toggle("fired", Timer.remainingMs() <= shown[i] * 60000);
      });
    } else if (disp && Timer.finished() && !disp.classList.contains("finished")) {
      const card = document.getElementById("timer-card");
      card.innerHTML = timerCardHtml();
      bindTimerCard();
    } else if (disp && !Timer.active() && !Timer.finished()) {
      const card = document.getElementById("timer-card");
      if (card.querySelector(".timer-display")) {
        card.innerHTML = timerCardHtml();
        bindTimerCard();
      }
    }
  });

  /* ------------------------------------------------------------------
     View: Settings
     ------------------------------------------------------------------ */

  const VOICE_SAMPLES = {
    en: "This is the English voice.",
    ur: "یہ اردو کی آواز ہے۔",
    ar: "هذا هو الصوت العربي.",
    es: "Esta es la voz en español.",
    fr: "Ceci est la voix française."
  };

  function voiceDiagRows() {
    if (typeof Voice === "undefined" || !Voice.supported()) return "";
    return I18N.LANGS.map(function (l) {
      const v = Voice.matchLang(l.code);
      const ok = !!v;
      return '<div class="voice-diag-row" data-code="' + l.code + '">' +
        '<span class="voice-diag-name">' + esc(l.name) + '</span>' +
        '<span class="voice-diag-status ' + (ok ? "ok" : "no") + '">' +
          (ok ? t("voice_ready") : t("voice_none")) + '</span>' +
        '<button class="btn btn-ghost voice-diag-test" data-code="' + l.code + '"' +
          (ok ? "" : " disabled") + '>' + t("voice_test") + '</button>' +
      '</div>';
    }).join("");
  }

  function refreshVoiceDiag() {
    const box = document.getElementById("voice-diag");
    if (!box) return;
    box.innerHTML = voiceDiagRows();
    bindVoiceDiag();
  }

  function bindVoiceDiag() {
    document.querySelectorAll(".voice-diag-test").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const code = btn.getAttribute("data-code");
        Voice.speak(VOICE_SAMPLES[code] || "Hello", btn, Voice.localeOf(code));
      });
    });
  }

  /* ------------------------------------------------------------------
     View: Cook — "what can I cook with what I have?"
     ------------------------------------------------------------------ */

  const PANTRY_KEY = "chefs-path-pantry";

  function loadPantry() {
    try {
      const raw = JSON.parse(localStorage.getItem(PANTRY_KEY) || "[]");
      if (Array.isArray(raw)) return new Set(raw.filter(function (k) { return !!PANTRY.get(k); }));
    } catch (e) { /* ignore */ }
    return new Set();
  }
  function savePantry(set) {
    try { localStorage.setItem(PANTRY_KEY, JSON.stringify(Array.from(set))); } catch (e) {}
  }

  function ingChip(ing, selected, withRemove) {
    return '<button type="button" class="ing-chip' + (selected ? " on" : "") +
      '" data-ing="' + ing.key + '">' +
      '<span class="ing-emoji">' + ing.emoji + '</span>' + esc(ing.label) +
      (withRemove ? ' <span class="ing-x">✕</span>' : "") + '</button>';
  }

  function viewCook() {
    const selected = loadPantry();

    let palette = "";
    PANTRY.CATS.forEach(function (cat) {
      const chips = PANTRY.byCat(cat.id).map(function (ing) {
        return ingChip(ing, selected.has(ing.key), false);
      }).join("");
      palette += '<div class="ing-cat"><h3>' + t(cat.labelKey) + '</h3>' +
        '<div class="ing-grid">' + chips + '</div></div>';
    });

    app.innerHTML =
      '<h1 class="page-title">🧑‍🍳 ' + t("cook_title") + '</h1>' +
      '<p class="page-sub">' + t("cook_sub") + '</p>' +
      '<div class="card section-card">' +
        '<input type="text" id="ing-search" class="settings-input" style="width:100%" placeholder="' + esc(t("cook_search")) + '">' +
        '<div id="ing-selected-bar" class="ing-selected-bar"></div>' +
        '<div id="ing-palette">' + palette + '</div>' +
      '</div>' +
      '<div id="cook-results"></div>';

    function updateSelectedBar() {
      const bar = document.getElementById("ing-selected-bar");
      if (!selected.size) { bar.innerHTML = ""; return; }
      const chips = Array.from(selected).map(function (k) {
        const ing = PANTRY.get(k);
        return ing ? ingChip(ing, true, true) : "";
      }).join("");
      bar.innerHTML = '<span class="ing-selected-label">' + t("cook_your") + ':</span> ' + chips +
        ' <button type="button" id="ing-clear" class="ing-clear">' + t("cook_clear") + '</button>';
      document.getElementById("ing-clear").addEventListener("click", function () {
        selected.clear(); savePantry(selected);
        syncPaletteStates(); updateSelectedBar(); updateResults();
      });
      bar.querySelectorAll(".ing-chip").forEach(function (chip) {
        chip.addEventListener("click", function () { toggle(chip.getAttribute("data-ing")); });
      });
    }

    function syncPaletteStates() {
      document.querySelectorAll("#ing-palette .ing-chip").forEach(function (btn) {
        btn.classList.toggle("on", selected.has(btn.getAttribute("data-ing")));
      });
    }

    function recipeCardHtml(s) {
      const haveChips = s.have.map(function (k) {
        const ing = PANTRY.get(k);
        return '<span class="mini-chip have">' + ing.emoji + " " + esc(ing.label) + "</span>";
      }).join("");
      const missChips = s.missing.map(function (k) {
        const ing = PANTRY.get(k);
        return '<span class="mini-chip miss">' + ing.emoji + " " + esc(ing.label) + "</span>";
      }).join("");
      return '<div class="card cook-recipe">' +
        '<a class="cook-recipe-head" href="#/lesson/' + s.lessonId + '">' +
          PICS.pic(s.lessonId, "thumb", s.recipe.name) +
          '<div style="flex:1;min-width:0">' +
            '<div class="recipe-tile-title">' + esc(s.recipe.name) + '</div>' +
            '<div class="recipe-tile-sub">' + t("level") + " " + s.level.id + " · ⏱ " + esc(s.recipe.time) + '</div>' +
          '</div>' +
        '</a>' +
        '<div class="cook-chips">' + haveChips +
          (missChips ? ' <span class="miss-label">' + t("cook_missing") + ':</span> ' + missChips : "") +
        '</div>' +
        '<a class="btn btn-ghost cook-open" href="#/lesson/' + s.lessonId + '">' + t("cook_open") + '</a>' +
      '</div>';
    }

    function updateResults() {
      const box = document.getElementById("cook-results");
      if (!selected.size) {
        box.innerHTML = '<div class="card empty-state"><div class="big">🥕</div><p>' +
          t("cook_pick_hint") + '</p></div>';
        return;
      }
      const results = PANTRY.suggest(selected);
      if (!results.length) {
        box.innerHTML = '<div class="card empty-state"><div class="big">🤔</div><p>' +
          t("cook_none") + '</p></div>';
        return;
      }
      const ready = results.filter(function (r) { return r.ready; });
      const almost = results.filter(function (r) { return !r.ready; }).slice(0, 6);
      let html = "";
      if (ready.length) {
        html += '<h2 class="cook-section">' + t("cook_ready") + '</h2>' +
          ready.map(recipeCardHtml).join("");
      }
      if (almost.length) {
        html += '<h2 class="cook-section">' + t("cook_almost") + '</h2>' +
          almost.map(recipeCardHtml).join("");
      }
      box.innerHTML = html;
    }

    function toggle(key) {
      if (selected.has(key)) selected.delete(key); else selected.add(key);
      savePantry(selected);
      syncPaletteStates(); updateSelectedBar(); updateResults();
    }

    document.querySelectorAll("#ing-palette .ing-chip").forEach(function (btn) {
      btn.addEventListener("click", function () { toggle(btn.getAttribute("data-ing")); });
    });

    document.getElementById("ing-search").addEventListener("input", function (e) {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll("#ing-palette .ing-chip").forEach(function (btn) {
        const ing = PANTRY.get(btn.getAttribute("data-ing"));
        const match = !q || ing.label.toLowerCase().indexOf(q) !== -1 ||
          ing.kws.some(function (k) { return k.indexOf(q) !== -1; });
        btn.style.display = match ? "" : "none";
      });
      document.querySelectorAll("#ing-palette .ing-cat").forEach(function (cat) {
        const anyVisible = Array.prototype.some.call(cat.querySelectorAll(".ing-chip"),
          function (b) { return b.style.display !== "none"; });
        cat.style.display = anyVisible ? "" : "none";
      });
    });

    updateSelectedBar();
    updateResults();
  }

  /* ------------------------------------------------------------------
     View: Settings
     ------------------------------------------------------------------ */

  /* AI provider config form (inside Settings). */
  function aiConfigHtml() {
    const cfg = Assistant.aiConfig();
    const provider = (cfg && cfg.provider) || "openai";
    const meta = Assistant.PROVIDERS[provider];
    const model = (cfg && cfg.model) || meta.model;
    const options = Object.keys(Assistant.PROVIDERS).map(function (p) {
      return '<option value="' + p + '"' + (p === provider ? " selected" : "") + '>' +
        esc(Assistant.PROVIDERS[p].name) + "</option>";
    }).join("");
    return (cfg ? '<p class="ai-connected">✅ ' +
        esc(t("ai_connected", { p: Assistant.PROVIDERS[cfg.provider].name })) + "</p>" : "") +
      '<div class="ai-field"><label>' + t("ai_provider") + '</label>' +
        '<select class="settings-select" id="ai-provider">' + options + "</select></div>" +
      '<div class="ai-field"><label>API key</label>' +
        '<input type="password" class="settings-input" id="ai-key" placeholder="sk-… / key" value="' +
          (cfg ? esc(cfg.key) : "") + '"></div>' +
      '<div class="ai-field"><label>' + t("ai_model") + '</label>' +
        '<input type="text" class="settings-input" id="ai-model" placeholder="' +
          esc(meta.model || "model") + '" value="' + esc(model) + '"></div>' +
      '<div class="ai-field" id="ai-base-field"' + (meta.base ? "" : " hidden") + '><label>' +
        t("ai_base_url") + '</label>' +
        '<input type="text" class="settings-input" id="ai-base" placeholder="https://…/v1" value="' +
          (cfg && cfg.baseUrl ? esc(cfg.baseUrl) : "") + '"></div>' +
      '<div class="settings-inline" style="margin-top:0.6rem">' +
        '<button class="btn btn-primary" id="ai-save">' + t("save") + '</button>' +
        (cfg ? '<button class="btn btn-ghost" id="ai-disconnect">' + t("ai_disconnect") + '</button>' : "") +
      '</div>' +
      '<p class="ai-privacy">' + t("ai_privacy") + '</p>';
  }

  function bindAiConfig() {
    const providerSel = document.getElementById("ai-provider");
    if (!providerSel) return;

    providerSel.addEventListener("change", function () {
      const meta = Assistant.PROVIDERS[providerSel.value];
      const modelInput = document.getElementById("ai-model");
      modelInput.value = meta.model || "";
      modelInput.placeholder = meta.model || "model";
      document.getElementById("ai-base-field").hidden = !meta.base;
    });

    document.getElementById("ai-save").addEventListener("click", function () {
      const key = document.getElementById("ai-key").value.trim();
      if (!key) { document.getElementById("ai-key").focus(); return; }
      const baseEl = document.getElementById("ai-base");
      Assistant.setAiConfig({
        provider: providerSel.value,
        key: key,
        model: document.getElementById("ai-model").value.trim(),
        baseUrl: baseEl ? baseEl.value.trim() : ""
      });
      toast(t("saved"));
      Assistant.refreshChrome();
      document.getElementById("ai-config").innerHTML = aiConfigHtml();
      bindAiConfig();
    });

    const disc = document.getElementById("ai-disconnect");
    if (disc) disc.addEventListener("click", function () {
      Assistant.setAiConfig(null);
      toast(t("key_removed"));
      document.getElementById("ai-config").innerHTML = aiConfigHtml();
      bindAiConfig();
    });
  }

  function viewSettings() {
    const langOptions = I18N.LANGS.map(function (l) {
      return '<option value="' + l.code + '"' + (I18N.getLang() === l.code ? " selected" : "") + '>' +
        l.name + "</option>";
    }).join("");

    app.innerHTML =
      '<h1 class="page-title">' + t("settings") + '</h1>' +
      '<p class="page-sub">' + t("settings_sub") + '</p>' +

      '<div class="card settings-row">' +
        '<div class="settings-row-body">' +
          '<h3>' + t("theme") + '</h3><p>' + t("theme_desc") + '</p>' +
        '</div>' +
        '<button class="btn btn-ghost" id="settings-theme-btn"></button>' +
      '</div>' +

      '<div class="card settings-row">' +
        '<div class="settings-row-body">' +
          '<h3>🎨 ' + t("palette_title") + '</h3><p>' + t("palette_desc") + '</p>' +
        '</div>' +
        '<select class="settings-select" id="palette-select">' +
          '<option value="classic"' + (currentPalette() === "classic" ? " selected" : "") + '>' + t("palette_classic") + '</option>' +
          '<option value="neon"' + (currentPalette() === "neon" ? " selected" : "") + '>' + t("palette_neon") + '</option>' +
          '<option value="sunset"' + (currentPalette() === "sunset" ? " selected" : "") + '>' + t("palette_sunset") + '</option>' +
        '</select>' +
      '</div>' +

      '<div class="card settings-row">' +
        '<div class="settings-row-body">' +
          '<h3>🌍 ' + t("language") + '</h3><p>' + t("language_desc") + '</p>' +
        '</div>' +
        '<select class="settings-select" id="lang-select">' + langOptions + '</select>' +
      '</div>' +

      '<div class="card settings-row" style="display:block">' +
        '<div class="settings-row-body" style="min-width:0">' +
          '<h3>🤖 ' + t("ai_title") + '</h3><p>' + t("ai_desc") + '</p>' +
          '<div id="ai-config" style="margin-top:0.8rem">' + aiConfigHtml() + '</div>' +
        '</div>' +
      '</div>' +

      '<div class="card settings-row" style="display:block">' +
        '<div class="settings-row-body" style="min-width:0">' +
          '<h3>' + t("voice_section") + '</h3><p>' + t("voice_section_desc") + '</p>' +
          '<div id="voice-diag" style="margin-top:0.8rem">' + voiceDiagRows() + '</div>' +
        '</div>' +
      '</div>' +

      '<div class="card settings-row">' +
        '<div class="settings-row-body">' +
          '<h3>' + t("reset_title") + '</h3><p>' + t("reset_desc") + '</p>' +
        '</div>' +
        '<button class="btn btn-danger" id="reset-btn">' + t("reset_btn") + '</button>' +
      '</div>';

    const themeBtn = document.getElementById("settings-theme-btn");
    function refreshThemeBtn() {
      themeBtn.textContent = currentTheme() === "dark" ? t("switch_light") : t("switch_dark");
    }
    refreshThemeBtn();
    themeBtn.addEventListener("click", function () {
      const next = currentTheme() === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
      refreshThemeBtn();
    });

    document.getElementById("lang-select").addEventListener("change", function (e) {
      I18N.setLang(e.target.value);
      applyChrome();
      viewSettings();
    });

    document.getElementById("palette-select").addEventListener("change", function (e) {
      const p = e.target.value;
      localStorage.setItem(PALETTE_KEY, p);
      applyPalette(p);
    });

    bindAiConfig();

    document.getElementById("reset-btn").addEventListener("click", function () {
      if (confirm(t("reset_confirm"))) {
        progress = { lessons: {} };
        saveProgress();
        toast(t("reset_done"));
        viewSettings();
      }
    });

    bindVoiceDiag();
  }

  // Update the Settings voice diagnostic if voices arrive after the page loads.
  if (typeof Voice !== "undefined") Voice.onVoices(refreshVoiceDiag);

  /* ------------------------------------------------------------------
     View: not found
     ------------------------------------------------------------------ */

  function viewNotFound() {
    app.innerHTML = '<div class="card empty-state">' +
      '<div class="big">🍳</div><h2>' + t("page_not_found") + '</h2>' +
      '<p>' + t("page_not_found_body") + '</p>' +
      '<br><a class="btn btn-primary" href="#/learn">' + t("back_to_learn") + '</a></div>';
  }

  /* ------------------------------------------------------------------
     Router
     ------------------------------------------------------------------ */

  function setActiveNav(section) {
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === section);
    });
  }

  function route() {
    const hash = location.hash || "#/learn";
    const parts = hash.replace(/^#\//, "").split("/");
    const page = parts[0] || "learn";

    // leaving a page: stop any reading voice and the game loop
    if (typeof Voice !== "undefined") Voice.stop();
    if (page !== "timer") Game.stop();

    window.scrollTo(0, 0);

    switch (page) {
      case "learn": setActiveNav("learn"); viewLearn(); break;
      case "lesson": setActiveNav("learn"); viewLesson(parts[1]); break;
      case "progress": setActiveNav("progress"); viewProgress(); break;
      case "recipes": setActiveNav("recipes"); viewRecipes(); break;
      case "cook": setActiveNav("cook"); viewCook(); break;
      case "timer": setActiveNav("timer"); viewTimer(); break;
      case "settings": setActiveNav("settings"); viewSettings(); break;
      default: setActiveNav(""); viewNotFound();
    }
  }

  window.addEventListener("hashchange", route);

  // Service worker: powers reliable background timer notifications. Needs a
  // secure context, so it silently no-ops on file:// — the timer still works.
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }

  Assistant.inject();
  applyChrome();
  route();
})();
