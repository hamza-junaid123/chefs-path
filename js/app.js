/* ==========================================================================
   Chef's Path — application logic
   Hash-based SPA router + progress tracking in localStorage.
   Content lives in js/content.js (global CONTENT).
   ========================================================================== */

(function () {
  "use strict";

  const PROGRESS_KEY = "chefs-path-progress-v1";
  const THEME_KEY = "chefs-path-theme";

  const app = document.getElementById("app");

  /* ------------------------------------------------------------------
     Progress storage
     progress.lessons[id] = { quizPassed: bool, cooked: bool }
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
    } catch (e) { /* storage unavailable (private mode etc.) — session-only */ }
  }

  function lessonState(id) {
    return progress.lessons[id] || { quizPassed: false, cooked: false };
  }

  function setLessonState(id, patch) {
    progress.lessons[id] = Object.assign({}, lessonState(id), patch);
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

  /* "Today's practice" — the next actionable step, stable within a day. */
  function todaysPractice() {
    for (const level of CONTENT.levels) {
      if (!isLevelUnlocked(level) || !levelHasContent(level)) continue;
      for (const lesson of level.lessons) {
        if (lesson.stub || isLessonComplete(lesson.id)) continue;
        const s = lessonState(lesson.id);
        return {
          lesson: lesson,
          level: level,
          action: s.quizPassed && !s.cooked
            ? "You passed the quiz — now cook " + lesson.recipe.name + " to finish this lesson."
            : (s.cooked && !s.quizPassed
              ? "You've cooked the recipe — pass the quiz to finish this lesson."
              : "Up next on your path. About " + lesson.minutes + " minutes.")
        };
      }
    }
    // Everything seeded is complete — suggest re-cooking a recipe, rotating daily.
    const cookable = [];
    for (const level of CONTENT.levels) {
      for (const lesson of level.lessons) {
        if (!lesson.stub && isLessonComplete(lesson.id)) cookable.push({ lesson: lesson, level: level });
      }
    }
    if (!cookable.length) return null;
    const dayIndex = Math.floor(Date.now() / 86400000) % cookable.length;
    const pick = cookable[dayIndex];
    return {
      lesson: pick.lesson,
      level: pick.level,
      action: "You've completed all available lessons — keep your skills sharp by cooking " + pick.lesson.recipe.name + " again today.",
      revisit: true
    };
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

  /* Format a scaled quantity as a friendly number/fraction (1.5 -> "1 ½"). */
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
    // If no clean fraction is close, fall back to a decimal.
    if (bestDiff > 0.04) {
      return String(Math.round(q * 100) / 100);
    }
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
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 3200);
  }

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

  /* ------------------------------------------------------------------
     Shared renderers
     ------------------------------------------------------------------ */

  function progressBar(ratio) {
    const pct = Math.round(ratio * 100);
    return '<div class="bar"><div class="bar-fill' + (pct >= 100 ? " complete" : "") +
      '" style="width:' + pct + '%"></div></div>';
  }

  /* Recipe block with servings scaling. `key` namespaces the DOM ids so
     multiple recipes can live on one page (Recipes tab). */
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

    return '' +
      '<div class="recipe-title-row">' +
        '<h3 style="font-size:1.15rem">' + esc(recipe.name) + '</h3>' +
        '<span class="chip">⏱ ' + esc(recipe.time) + '</span>' +
      '</div>' +
      '<p class="recipe-desc">' + esc(recipe.description) + '</p>' +
      '<div class="servings-ctl" data-recipe-key="' + esc(key) + '">' +
        '<button type="button" data-serv="-1" aria-label="Fewer servings">−</button>' +
        '<span class="servings-num">' + servings + ' serving' + (servings === 1 ? "" : "s") + '</span>' +
        '<button type="button" data-serv="1" aria-label="More servings">+</button>' +
      '</div>' +
      '<ul class="ingredients">' + ingRows + '</ul>' +
      '<h4 style="margin-bottom:0.5rem">Method</h4>' +
      '<ol class="recipe-steps">' + steps + '</ol>';
  }

  /* Wire up +/- servings buttons inside `container`. `rerender(key, newServings)`
     is called to refresh just that recipe's HTML. */
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

    // Today's practice hero
    const today = todaysPractice();
    if (today) {
      html +=
        '<section class="hero">' +
          '<div class="eyebrow">🍅 Today\'s practice</div>' +
          '<h2>' + esc(today.revisit ? today.lesson.recipe.name : today.lesson.title) + '</h2>' +
          '<p>' + esc(today.action) + '</p>' +
          '<a class="btn btn-primary" href="#/lesson/' + today.lesson.id + '">' +
            (today.revisit ? "Open the recipe" : "Continue learning") + '</a>' +
        '</section>';
    }

    html += '<h1 class="page-title">Your path</h1>' +
      '<p class="page-sub">Complete each lesson\'s quiz and cook its practice recipe. ' +
      'Finish ' + Math.round(CONTENT.unlockRatio * 100) + '% of a level to unlock the next.</p>';

    for (const level of CONTENT.levels) {
      const unlocked = isLevelUnlocked(level);
      const ratio = levelCompletion(level);
      const doneCount = level.lessons.filter(function (l) { return isLessonComplete(l.id); }).length;

      html += '<section class="card level-card' + (unlocked ? "" : " locked") + '">' +
        '<div class="level-header">' +
          '<div class="level-icon">' + (unlocked ? level.icon : "🔒") + '</div>' +
          '<div class="level-title-wrap">' +
            '<div class="level-num">Level ' + level.id + '</div>' +
            '<div class="level-title">' + esc(level.title) + '</div>' +
            '<div class="level-sub">' + esc(level.subtitle) + '</div>' +
            (unlocked && levelHasContent(level) ? progressBar(ratio) : "") +
          '</div>' +
          '<div class="level-meta">' +
            (unlocked
              ? (levelHasContent(level)
                  ? doneCount + " / " + level.lessons.length + " lessons"
                  : '<span class="lock-tag">Content coming soon</span>')
              : '<span class="lock-tag">🔒 Finish Level ' + (level.id - 1) + ' to unlock</span>') +
          '</div>' +
        '</div>';

      if (unlocked) {
        html += '<div class="lesson-list">';
        for (const lesson of level.lessons) {
          if (lesson.stub) {
            html += '<div class="lesson-row stub">' +
              '<span class="lesson-status">•</span>' +
              '<span class="lesson-row-title">' + esc(lesson.title) + '</span>' +
              '<span class="lesson-row-meta">Coming soon</span>' +
            '</div>';
            continue;
          }
          const s = lessonState(lesson.id);
          const complete = isLessonComplete(lesson.id);
          const partial = !complete && (s.quizPassed || s.cooked);
          const statusCls = complete ? "done" : (partial ? "partial" : "");
          const statusIcon = complete ? "✓" : (partial ? "…" : "");
          const meta = complete ? "Completed" : (partial
            ? (s.quizPassed ? "Quiz passed — cook the recipe" : "Cooked — take the quiz")
            : "~" + lesson.minutes + " min");
          html += '<a class="lesson-row" href="#/lesson/' + lesson.id + '">' +
            '<span class="lesson-status ' + statusCls + '">' + statusIcon + '</span>' +
            '<span class="lesson-row-title">' + esc(lesson.title) + '</span>' +
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
    const level = found.level, lesson = found.lesson;

    if (!isLevelUnlocked(level)) {
      app.innerHTML =
        '<div class="breadcrumb"><a href="#/learn">← Back to Learn</a></div>' +
        '<div class="card empty-state"><div class="big">🔒</div>' +
        '<h2>This lesson is locked</h2>' +
        '<p>Finish ' + Math.round(CONTENT.unlockRatio * 100) + '% of Level ' + (level.id - 1) +
        ' to unlock Level ' + level.id + '.</p></div>';
      return;
    }

    const state = { servings: {} }; // per-render servings for the recipe

    function render() {
      const s = lessonState(lesson.id);
      const complete = isLessonComplete(lesson.id);

      const introHtml = lesson.intro.split("\n\n").map(function (p) {
        return "<p>" + esc(p) + "</p>";
      }).join("");

      const techSteps = lesson.technique.steps.map(function (st) {
        return "<li>" + esc(st.text) +
          (st.tip ? '<div class="tip"><strong>Tip:</strong> ' + esc(st.tip) + "</div>" : "") +
          "</li>";
      }).join("");

      const quizHtml = lesson.quiz.map(function (q, qi) {
        const opts = q.options.map(function (opt, oi) {
          return '<label class="quiz-opt" data-q="' + qi + '" data-o="' + oi + '">' +
            '<input type="radio" name="q' + qi + '" value="' + oi + '">' +
            '<span>' + esc(opt) + '</span></label>';
        }).join("");
        return '<div class="quiz-q"><h3>' + (qi + 1) + ". " + esc(q.q) + "</h3>" + opts + "</div>";
      }).join("");

      app.innerHTML =
        '<div class="breadcrumb"><a href="#/learn">← Back to Learn</a></div>' +
        '<div class="lesson-head">' +
          '<span class="chip">Level ' + level.id + ' · ' + esc(level.title) + '</span>' +
          '<span class="chip green">~' + lesson.minutes + ' min</span>' +
          '<h1>' + esc(lesson.title) + '</h1>' +
        '</div>' +

        (complete
          ? '<div class="completion-banner">🎉 Lesson complete — quiz passed and recipe cooked. Nicely done!</div>'
          : "") +

        '<section class="card section-card intro-text"><h2>📖 The idea</h2>' + introHtml + '</section>' +

        '<section class="card section-card"><h2>🛠️ ' + esc(lesson.technique.heading) + '</h2>' +
          '<ol class="tech-steps">' + techSteps + '</ol></section>' +

        '<section class="card section-card recipe-card"><h2>🍽️ Practice recipe</h2>' +
          '<div id="recipe-slot">' +
            recipeHtml(lesson.recipe, lesson.id, { servings: state.servings[lesson.id] }) +
          '</div>' +
          '<div class="cooked-row">' +
            (s.cooked
              ? '<button class="btn btn-success" id="cooked-btn">✓ Cooked it! (tap to undo)</button>'
              : '<button class="btn btn-outline" id="cooked-btn">I cooked this recipe</button>') +
            '<span style="color:var(--text-soft);font-size:0.88rem">Cooking the recipe is half of completing the lesson.</span>' +
          '</div>' +
        '</section>' +

        '<section class="card section-card"><h2>❓ Quick quiz</h2>' +
          (s.quizPassed
            ? '<div class="quiz-result pass">✓ Quiz passed! You can retake it below just for practice.</div><br>'
            : '<p style="color:var(--text-soft);margin-bottom:1rem">Answer at least ' +
              CONTENT.passThreshold + ' of ' + lesson.quiz.length + ' correctly to pass.</p>') +
          '<form id="quiz-form">' + quizHtml +
            '<button type="submit" class="btn btn-primary">Check answers</button>' +
            '<div id="quiz-result-slot"></div>' +
          '</form>' +
        '</section>' +

        '<div class="lesson-nav-row">' +
          '<a class="btn btn-ghost" href="#/learn">← All lessons</a>' +
          (nextLessonLink(level, lesson) || "") +
        '</div>';

      bindLessonEvents();
    }

    function nextLessonLink(level, lesson) {
      const idx = level.lessons.indexOf(lesson);
      const next = level.lessons[idx + 1];
      if (next && !next.stub) {
        return '<a class="btn btn-ghost" href="#/lesson/' + next.id + '">Next lesson →</a>';
      }
      return "";
    }

    function bindLessonEvents() {
      // Servings scaling
      bindServingsControls(app, state.servings,
        function () { return lesson.recipe; },
        function (key, servings) {
          document.getElementById("recipe-slot").innerHTML =
            recipeHtml(lesson.recipe, key, { servings: servings });
          bindLessonEvents(); // recipe slot buttons were replaced
        });

      // Cooked toggle
      document.getElementById("cooked-btn").onclick = function () {
        const s = lessonState(lesson.id);
        const wasComplete = isLessonComplete(lesson.id);
        setLessonState(lesson.id, { cooked: !s.cooked });
        afterProgressChange(wasComplete);
        render();
      };

      // Quiz selection highlighting
      app.querySelectorAll(".quiz-opt input").forEach(function (input) {
        input.addEventListener("change", function () {
          const q = input.closest(".quiz-q");
          q.querySelectorAll(".quiz-opt").forEach(function (o) {
            o.classList.remove("selected");
          });
          input.closest(".quiz-opt").classList.add("selected");
        });
      });

      // Quiz grading
      document.getElementById("quiz-form").onsubmit = function (e) {
        e.preventDefault();
        const form = e.target;
        let answered = 0, correct = 0;

        lesson.quiz.forEach(function (q, qi) {
          const picked = form.querySelector('input[name="q' + qi + '"]:checked');
          if (picked) answered++;
        });
        if (answered < lesson.quiz.length) {
          document.getElementById("quiz-result-slot").innerHTML =
            '<div class="quiz-result fail">Answer all ' + lesson.quiz.length + ' questions first.</div>';
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
          slot.innerHTML = '<div class="quiz-result pass">✓ ' + correct + " / " +
            lesson.quiz.length + " correct — quiz passed!</div>";
          const wasComplete = isLessonComplete(lesson.id);
          const alreadyPassed = lessonState(lesson.id).quizPassed;
          setLessonState(lesson.id, { quizPassed: true });
          if (!alreadyPassed) afterProgressChange(wasComplete);
          // Re-render shortly so banners/status update, keeping the result visible first.
          setTimeout(render, 1600);
        } else {
          slot.innerHTML = '<div class="quiz-result fail">' + correct + " / " +
            lesson.quiz.length + " correct — you need " + CONTENT.passThreshold +
            ". Review the answers above and try again.</div>";
        }
      };
    }

    /* Toast on completion / level unlock. Called BEFORE render() so it can
       compare old vs new state. `wasComplete` is the pre-change value. */
    function afterProgressChange(wasComplete) {
      const nowComplete = isLessonComplete(lesson.id);
      if (!wasComplete && nowComplete) {
        const nextLevel = getLevel(level.id + 1);
        if (nextLevel && isLevelUnlocked(nextLevel) && !wasLevelUnlockToastShown(nextLevel.id)) {
          toast("🔓 Level " + nextLevel.id + " unlocked: " + nextLevel.title + "!");
          markLevelUnlockToastShown(nextLevel.id);
        } else {
          toast("🎉 Lesson complete: " + lesson.title);
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

    let html = '<h1 class="page-title">Your progress</h1>' +
      '<p class="page-sub">Every quiz passed and recipe cooked moves you down the path.</p>';

    html += '<div class="card overall-card">' +
      '<div class="overall-num">' + overallPct + '%</div>' +
      '<div>of available lessons complete — ' + done + " of " + totalLessons + '</div>' +
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
          '<div class="progress-row-title">Level ' + level.id + ": " + esc(level.title) + '</div>' +
          (unlocked
            ? (hasContent ? progressBar(ratio)
               : '<span class="level-sub">Content coming soon</span>')
            : '<span class="level-sub">Locked — finish Level ' + (level.id - 1) + ' first</span>') +
        '</div>' +
        '<div class="progress-row-pct">' + (unlocked && hasContent ? pct + "%" : "—") + '</div>' +
      '</div>';
    }
    html += '</div>';

    html += '<h2 style="font-size:1.4rem;margin-bottom:0.9rem">Badges</h2><div class="badges-grid">';
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
    // A recipe is "learned" once its lesson has any progress (quiz or cooked).
    const learned = [];
    for (const level of CONTENT.levels) {
      for (const lesson of level.lessons) {
        if (lesson.stub) continue;
        const s = lessonState(lesson.id);
        if (s.quizPassed || s.cooked) learned.push({ level: level, lesson: lesson });
      }
    }

    let html = '<h1 class="page-title">Your recipe box</h1>' +
      '<p class="page-sub">Every practice recipe you\'ve learned, ready to cook again. ' +
      'Tap a recipe to open it and scale the servings.</p>';

    if (!learned.length) {
      html += '<div class="card empty-state">' +
        '<div class="big">🍲</div>' +
        '<h2>No recipes yet</h2>' +
        '<p>Start a lesson and cook its practice recipe (or pass its quiz) and it will appear here.</p>' +
        '<br><a class="btn btn-primary" href="#/learn">Go to your first lesson</a>' +
      '</div>';
      app.innerHTML = html;
      return;
    }

    const servingsMap = {};
    const openSet = {};

    html += '<div class="recipes-grid">';
    for (const item of learned) {
      const r = item.lesson.recipe;
      html += '<div class="card recipe-tile" data-lesson="' + item.lesson.id + '">' +
        '<button type="button" class="recipe-tile-head">' +
          '<div class="level-icon">' + item.level.icon + '</div>' +
          '<div style="flex:1;min-width:0">' +
            '<div class="recipe-tile-title">' + esc(r.name) + '</div>' +
            '<div class="recipe-tile-sub">Level ' + item.level.id + " · " + esc(item.lesson.title) +
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
      const body = tile.querySelector(".recipe-tile-body");
      body.innerHTML = recipeHtml(found.lesson.recipe, lessonId, { servings: servingsMap[lessonId] }) +
        '<br><a class="btn btn-ghost" href="#/lesson/' + lessonId + '">Open full lesson →</a>';
      bindServingsControls(body, servingsMap,
        function (key) { return findLesson(key).lesson.recipe; },
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
     View: Settings
     ------------------------------------------------------------------ */

  function viewSettings() {
    app.innerHTML =
      '<h1 class="page-title">Settings</h1>' +
      '<p class="page-sub">Everything is stored locally in your browser — nothing leaves this device.</p>' +

      '<div class="card settings-row">' +
        '<div class="settings-row-body">' +
          '<h3>Theme</h3>' +
          '<p>Switch between the warm light theme and the cozy dark theme.</p>' +
        '</div>' +
        '<button class="btn btn-ghost" id="settings-theme-btn"></button>' +
      '</div>' +

      '<div class="card settings-row">' +
        '<div class="settings-row-body">' +
          '<h3>Reset progress</h3>' +
          '<p>Erases all lesson completion, quiz results, and badges. This cannot be undone.</p>' +
        '</div>' +
        '<button class="btn btn-danger" id="reset-btn">Reset all progress</button>' +
      '</div>';

    const themeBtn = document.getElementById("settings-theme-btn");
    function refreshThemeBtn() {
      themeBtn.textContent = currentTheme() === "dark" ? "☀️ Switch to light" : "🌙 Switch to dark";
    }
    refreshThemeBtn();
    themeBtn.addEventListener("click", function () {
      const next = currentTheme() === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
      refreshThemeBtn();
    });

    document.getElementById("reset-btn").addEventListener("click", function () {
      if (confirm("Reset ALL progress? Every completed lesson, quiz, and badge will be erased.")) {
        progress = { lessons: {} };
        saveProgress();
        toast("Progress reset. Fresh apron, fresh start!");
        viewSettings();
      }
    });
  }

  /* ------------------------------------------------------------------
     View: not found
     ------------------------------------------------------------------ */

  function viewNotFound() {
    app.innerHTML = '<div class="card empty-state">' +
      '<div class="big">🍳</div><h2>Page not found</h2>' +
      '<p>That page seems to have burned. Head back to the course.</p>' +
      '<br><a class="btn btn-primary" href="#/learn">Back to Learn</a></div>';
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

    window.scrollTo(0, 0);

    switch (page) {
      case "learn":
        setActiveNav("learn");
        viewLearn();
        break;
      case "lesson":
        setActiveNav("learn");
        viewLesson(parts[1]);
        break;
      case "progress":
        setActiveNav("progress");
        viewProgress();
        break;
      case "recipes":
        setActiveNav("recipes");
        viewRecipes();
        break;
      case "settings":
        setActiveNav("settings");
        viewSettings();
        break;
      default:
        setActiveNav("");
        viewNotFound();
    }
  }

  window.addEventListener("hashchange", route);
  route();
})();
