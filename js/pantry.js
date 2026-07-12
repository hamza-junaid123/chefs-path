/* ==========================================================================
   Chef's Path — "What can I cook?" engine
   Maps each course recipe to a set of canonical ingredient keys, and ranks
   recipes against the ingredients the user says they have. Fully offline —
   no photo recognition, no network. Ingredient labels are English + emoji;
   page chrome is translated via i18n.
   ========================================================================== */

const PANTRY = (function () {
  // Assumed always on-hand — never counts as "missing".
  const STAPLES = new Set(["oil", "salt", "pepper"]);

  /* key: canonical id · label/emoji: chip display · cat: group ·
     kws: substrings that identify this ingredient in a recipe line ·
     not: substrings that DISQUALIFY a match (e.g. "peanut butter" ≠ butter) */
  const INGREDIENTS = [
    // Vegetables & fruit
    { key: "onion", label: "Onion", emoji: "🧅", cat: "veg", kws: ["onion"], not: ["spring onion", "green onion"] },
    { key: "garlic", label: "Garlic", emoji: "🧄", cat: "veg", kws: ["garlic"] },
    { key: "tomato", label: "Tomato", emoji: "🍅", cat: "veg", kws: ["tomato"] },
    { key: "potato", label: "Potato", emoji: "🥔", cat: "veg", kws: ["potato"] },
    { key: "carrot", label: "Carrot", emoji: "🥕", cat: "veg", kws: ["carrot"] },
    { key: "cucumber", label: "Cucumber", emoji: "🥒", cat: "veg", kws: ["cucumber"] },
    { key: "greens", label: "Salad greens", emoji: "🥬", cat: "veg", kws: ["lettuce", "romaine", "mixed greens", "salad green"] },
    { key: "mushroom", label: "Mushrooms", emoji: "🍄", cat: "veg", kws: ["mushroom"] },
    { key: "avocado", label: "Avocado", emoji: "🥑", cat: "veg", kws: ["avocado"] },
    { key: "corn", label: "Corn", emoji: "🌽", cat: "veg", kws: ["corn"] },
    { key: "chili", label: "Chili/pepper", emoji: "🌶️", cat: "veg", kws: ["jalape", "chili", "chilli", "chile"] },
    { key: "peas", label: "Peas", emoji: "🫛", cat: "veg", kws: ["peas"], not: ["chickpea"] },
    { key: "scallion", label: "Scallion", emoji: "🧅", cat: "veg", kws: ["scallion", "spring onion", "green onion"] },
    { key: "lemon", label: "Lemon", emoji: "🍋", cat: "veg", kws: ["lemon"] },
    { key: "lime", label: "Lime", emoji: "🟢", cat: "veg", kws: ["lime"] },
    { key: "banana", label: "Banana", emoji: "🍌", cat: "veg", kws: ["banana"] },
    // Proteins
    { key: "egg", label: "Eggs", emoji: "🥚", cat: "protein", kws: ["egg"] },
    { key: "chicken", label: "Chicken", emoji: "🍗", cat: "protein", kws: ["chicken"] },
    { key: "fish", label: "Fish", emoji: "🐟", cat: "protein", kws: ["fish", "salmon", "tuna"] },
    { key: "beef", label: "Beef", emoji: "🥩", cat: "protein", kws: ["beef", "steak", "ground beef"] },
    { key: "chickpeas", label: "Chickpeas", emoji: "🫘", cat: "protein", kws: ["chickpea"] },
    { key: "beans", label: "Beans", emoji: "🫘", cat: "protein", kws: ["beans"], not: ["green beans"] },
    // Dairy
    { key: "butter", label: "Butter", emoji: "🧈", cat: "dairy", kws: ["butter"], not: ["peanut butter"] },
    { key: "milk", label: "Milk", emoji: "🥛", cat: "dairy", kws: ["milk"] },
    { key: "cheese", label: "Cheese", emoji: "🧀", cat: "dairy", kws: ["cheese", "mozzarella", "feta", "parmesan", "cheddar"] },
    { key: "yogurt", label: "Yogurt", emoji: "🥣", cat: "dairy", kws: ["yogurt", "yoghurt"] },
    { key: "peanut_butter", label: "Peanut butter", emoji: "🥜", cat: "dairy", kws: ["peanut butter"] },
    // Pantry & grains
    { key: "rice", label: "Rice", emoji: "🍚", cat: "pantry", kws: ["rice"] },
    { key: "pasta", label: "Pasta", emoji: "🍝", cat: "pantry", kws: ["pasta", "spaghetti", "noodle"] },
    { key: "bread", label: "Bread", emoji: "🍞", cat: "pantry", kws: ["bread"] },
    { key: "flour", label: "Flour", emoji: "🌾", cat: "pantry", kws: ["flour"] },
    { key: "oats", label: "Oats", emoji: "🥣", cat: "pantry", kws: ["oats", "oatmeal"] },
    { key: "sugar", label: "Sugar", emoji: "🍬", cat: "pantry", kws: ["sugar"] },
    { key: "honey", label: "Honey/syrup", emoji: "🍯", cat: "pantry", kws: ["honey", "maple"] },
    { key: "soy", label: "Soy sauce", emoji: "🍶", cat: "pantry", kws: ["soy"] },
    { key: "vinegar", label: "Vinegar", emoji: "🧴", cat: "pantry", kws: ["vinegar", "balsamic"] },
    { key: "oil", label: "Oil", emoji: "🫗", cat: "pantry", kws: ["oil"], staple: true },
    { key: "salt", label: "Salt", emoji: "🧂", cat: "pantry", kws: ["salt"], staple: true },
    { key: "pepper", label: "Pepper", emoji: "•", cat: "pantry", kws: ["pepper"], not: ["bell pepper"], staple: true },
    // Herbs & spices
    { key: "basil", label: "Basil", emoji: "🌿", cat: "herb", kws: ["basil"] },
    { key: "cilantro", label: "Cilantro", emoji: "🌿", cat: "herb", kws: ["cilantro", "coriander"] },
    { key: "parsley", label: "Parsley", emoji: "🌿", cat: "herb", kws: ["parsley", "chives"] },
    { key: "thyme", label: "Thyme", emoji: "🌿", cat: "herb", kws: ["thyme"] },
    { key: "oregano", label: "Oregano", emoji: "🌿", cat: "herb", kws: ["oregano"] },
    { key: "cinnamon", label: "Cinnamon", emoji: "🟤", cat: "herb", kws: ["cinnamon"] }
  ];

  const CATS = [
    { id: "veg", labelKey: "cat_veg" },
    { id: "protein", labelKey: "cat_protein" },
    { id: "dairy", labelKey: "cat_dairy" },
    { id: "pantry", labelKey: "cat_pantry" },
    { id: "herb", labelKey: "cat_herb" }
  ];

  const BY_KEY = {};
  INGREDIENTS.forEach(function (i) { BY_KEY[i.key] = i; });

  /* Which ingredient keys appear in one recipe-line string. */
  function keysInLine(itemStr) {
    const s = itemStr.toLowerCase();
    const keys = [];
    INGREDIENTS.forEach(function (ing) {
      let hit = ing.kws.some(function (k) { return s.indexOf(k) !== -1; });
      if (hit && ing.not) hit = !ing.not.some(function (n) { return s.indexOf(n) !== -1; });
      if (hit) keys.push(ing.key);
    });
    return keys;
  }

  // Pre-index every non-stub course recipe → its ingredient key set.
  const RECIPES = [];
  CONTENT.levels.forEach(function (level) {
    level.lessons.forEach(function (lesson) {
      if (lesson.stub || !lesson.recipe) return;
      const keys = new Set();
      lesson.recipe.ingredients.forEach(function (ing) {
        keysInLine(ing.item).forEach(function (k) { keys.add(k); });
      });
      RECIPES.push({ lessonId: lesson.id, level: level, lesson: lesson, recipe: lesson.recipe, keys: keys });
    });
  });

  /* Rank recipes against a Set of owned ingredient keys.
     Returns [{ lessonId, level, lesson, recipe, have[], missing[], ready }]. */
  function suggest(selected) {
    const out = [];
    RECIPES.forEach(function (r) {
      const recipeKeys = Array.from(r.keys);
      const have = recipeKeys.filter(function (k) { return selected.has(k); });
      if (!have.length) return; // no overlap at all — skip
      const missing = recipeKeys.filter(function (k) {
        return !selected.has(k) && !STAPLES.has(k);
      });
      out.push({
        lessonId: r.lessonId, level: r.level, lesson: r.lesson, recipe: r.recipe,
        have: have, missing: missing, ready: missing.length === 0
      });
    });
    out.sort(function (a, b) {
      if (a.ready !== b.ready) return a.ready ? -1 : 1;      // ready first
      if (b.have.length !== a.have.length) return b.have.length - a.have.length;
      return a.missing.length - b.missing.length;
    });
    return out;
  }

  function byCat(id) { return INGREDIENTS.filter(function (i) { return i.cat === id; }); }
  function get(key) { return BY_KEY[key]; }

  return { INGREDIENTS: INGREDIENTS, CATS: CATS, byCat: byCat, get: get, suggest: suggest };
})();
