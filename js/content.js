/* ==========================================================================
   Chef's Path — course content
   All lesson, recipe, and quiz data lives here so new content can be added
   without touching app logic. To add a lesson, append an object to the
   appropriate level's `lessons` array following the shapes below.

   Full lesson shape:
   {
     id: "l1-1",              // unique, stable — progress is keyed on this
     title: "...",
     minutes: 15,             // rough time to work through the lesson
     intro: "...",            // short explanation (plain text, paragraphs split by \n\n)
     technique: {
       heading: "...",
       steps: [ { text: "...", tip: "optional tip" }, ... ]
     },
     recipe: {
       name: "...",
       description: "...",
       servings: 2,           // base servings; UI scales quantities from this
       time: "15 min",
       ingredients: [ { qty: 2, unit: "tbsp", item: "olive oil" }, ... ]
                              // qty: null means "to taste" (not scaled)
       steps: [ "...", ... ]
     },
     quiz: [ { q: "...", options: ["...","...","..."], answer: 0 }, ... ]
   }

   Stub lesson shape (Levels 3-6, content coming later):
   { id: "l3-1", title: "...", stub: true }
   ========================================================================== */

const CONTENT = {
  passThreshold: 2, // quiz answers correct (of 3) needed to pass
  unlockRatio: 0.8, // fraction of a level's lessons needed to unlock the next

  levels: [
    /* ====================================================================
       LEVEL 1 — KITCHEN BASICS
       ==================================================================== */
    {
      id: 1,
      title: "Kitchen Basics",
      icon: "🔪",
      subtitle: "Knife skills, safety, reading recipes, measuring, essential tools",
      description:
        "Everything you need before you ever turn on a burner. By the end of this level you'll hold a knife with confidence, read any recipe without confusion, and keep yourself (and your food) safe.",
      lessons: [
        {
          id: "l1-1",
          title: "Meet Your Kitchen: Essential Tools",
          minutes: 15,
          intro:
            "You don't need a drawer full of gadgets to cook well — you need about ten tools that do their job every single day. Professional kitchens run on a surprisingly short list, and yours can too.\n\nThe big three are a chef's knife (8-inch is the sweet spot), a large cutting board, and a heavy skillet. Add a saucepan, a sheet pan, measuring cups and spoons, a couple of mixing bowls, tongs, a flexible spatula, and an instant-read thermometer, and you can cook 95% of home recipes.",
          technique: {
            heading: "Set up your station",
            steps: [
              {
                text: "Gather your core tools: chef's knife, cutting board, 10–12 inch skillet, 2–3 quart saucepan, sheet pan, measuring cups/spoons, two mixing bowls, tongs, and a spatula.",
                tip: "One good 8-inch chef's knife beats a 12-piece knife block. Spend your money there first."
              },
              {
                text: "Place your cutting board on a damp paper towel or thin kitchen towel so it can't slide while you cut.",
                tip: "A sliding board is the #1 cause of beginner knife accidents."
              },
              {
                text: "Keep a 'trash bowl' on the counter for scraps so you're not walking to the bin mid-prep.",
              },
              {
                text: "Check your knife is sharp: it should slice a sheet of paper cleanly. A dull knife slips and is more dangerous than a sharp one.",
                tip: "Most supermarkets and hardware stores sharpen knives cheaply if you don't own a sharpener."
              },
              {
                text: "Arrange tools so your dominant hand can reach the knife and your other hand can reach the ingredients — this becomes muscle memory fast."
              }
            ]
          },
          recipe: {
            name: "Cinnamon-Sugar Toast",
            description:
              "The classic first recipe: it uses measuring spoons, a knife, and your attention — the three tools you'll use forever.",
            servings: 2,
            time: "10 min",
            ingredients: [
              { qty: 4, unit: "slices", item: "sandwich bread" },
              { qty: 3, unit: "tbsp", item: "butter, softened" },
              { qty: 2, unit: "tbsp", item: "granulated sugar" },
              { qty: 1, unit: "tsp", item: "ground cinnamon" },
              { qty: null, unit: "", item: "tiny pinch of salt" }
            ],
            steps: [
              "Mix the sugar, cinnamon, and a tiny pinch of salt in a small bowl.",
              "Toast the bread until golden.",
              "While it's hot, spread each slice edge-to-edge with softened butter using a butter knife.",
              "Sprinkle the cinnamon sugar evenly over the buttered side — the heat melts it into a glaze.",
              "Cut diagonally with your chef's knife (practice that grip!) and eat warm."
            ]
          },
          quiz: [
            {
              q: "Which knife should a beginner buy first?",
              options: [
                "A 12-piece knife block set",
                "One good 8-inch chef's knife",
                "A paring knife and a cleaver"
              ],
              answer: 1
            },
            {
              q: "Why put a damp towel under your cutting board?",
              options: [
                "To keep the board clean",
                "To stop the board sliding while you cut",
                "To season the wood"
              ],
              answer: 1
            },
            {
              q: "Which is more dangerous in the kitchen?",
              options: [
                "A sharp knife",
                "A dull knife",
                "They're equally dangerous"
              ],
              answer: 1
            }
          ]
        },

        {
          id: "l1-2",
          title: "Kitchen Safety & Hygiene",
          minutes: 20,
          intro:
            "Almost every kitchen accident and case of food poisoning is preventable with a handful of habits. Learn them once, do them automatically forever.\n\nThe two big ideas: keep raw and ready-to-eat foods apart (cross-contamination), and keep food out of the 'danger zone' — between 40°F and 140°F (4–60°C) — where bacteria multiply fastest.",
          technique: {
            heading: "The safety habits that matter",
            steps: [
              {
                text: "Wash hands with soap for 20 seconds before cooking, and again any time you touch raw meat, fish, or eggs."
              },
              {
                text: "Use separate cutting boards (or wash thoroughly with hot soapy water between uses) for raw meat and everything else.",
                tip: "Many cooks keep one board just for raw proteins — a different color makes it foolproof."
              },
              {
                text: "Never leave perishable food at room temperature more than 2 hours. Refrigerate leftovers promptly.",
                tip: "The danger zone is 40–140°F (4–60°C). Cold food cold, hot food hot."
              },
              {
                text: "If an oil fire starts in a pan: turn off the heat and cover the pan with a lid. NEVER pour water on it — water makes oil fires explode outward."
              },
              {
                text: "Carry knives point-down at your side, never wash them 'blind' in a sink of soapy water, and say 'behind you' if someone's sharing the kitchen."
              },
              {
                text: "Turn pan handles inward over the stove so they can't be knocked (or grabbed by kids)."
              }
            ]
          },
          recipe: {
            name: "Crunchy Rainbow Salad with Lemon Dressing",
            description:
              "A no-heat recipe that drills the most repeated safety habit: washing and handling fresh produce properly.",
            servings: 2,
            time: "15 min",
            ingredients: [
              { qty: 4, unit: "cups", item: "chopped romaine or mixed greens" },
              { qty: 1, unit: "", item: "carrot, coarsely grated" },
              { qty: 1, unit: "cup", item: "cherry tomatoes, halved" },
              { qty: 0.5, unit: "", item: "cucumber, sliced" },
              { qty: 0.25, unit: "cup", item: "sweetcorn (canned, drained)" },
              { qty: 2, unit: "tbsp", item: "olive oil" },
              { qty: 1, unit: "tbsp", item: "fresh lemon juice" },
              { qty: 0.25, unit: "tsp", item: "salt" },
              { qty: null, unit: "", item: "black pepper, to taste" }
            ],
            steps: [
              "Wash your hands, then wash all produce under cold running water — including things you peel.",
              "Dry the greens well (a salad spinner or clean towel). Dressing slides off wet leaves.",
              "Chop the vegetables on a clean board with a clean knife.",
              "Whisk olive oil, lemon juice, salt, and pepper in the bottom of your salad bowl.",
              "Add vegetables, toss to coat, taste, and adjust salt or lemon.",
              "Refrigerate any leftovers within 2 hours — you know why now."
            ]
          },
          quiz: [
            {
              q: "What is the temperature 'danger zone' where bacteria multiply fastest?",
              options: [
                "0–32°F (below freezing)",
                "40–140°F (4–60°C)",
                "160–212°F (71–100°C)"
              ],
              answer: 1
            },
            {
              q: "A pan of oil catches fire. What should you do?",
              options: [
                "Pour water on it quickly",
                "Carry the pan outside",
                "Turn off the heat and cover the pan with a lid"
              ],
              answer: 2
            },
            {
              q: "You just cut raw chicken on your board. Next you need to slice tomatoes. What do you do?",
              options: [
                "Wipe the board with a dry paper towel and continue",
                "Wash the board and knife with hot soapy water first (or use a different board)",
                "Slice the tomatoes on the other side of the same board"
              ],
              answer: 1
            }
          ]
        },

        {
          id: "l1-3",
          title: "Knife Skills I: Grip, Claw & the Rock Chop",
          minutes: 25,
          intro:
            "Good knife work isn't about speed — it's about a stable grip, a protected guiding hand, and letting the knife's edge do the work. Speed shows up on its own after a few weeks of correct practice.\n\nTwo positions to learn: the pinch grip (thumb and forefinger pinching the blade just ahead of the handle) and the claw (fingertips of your other hand curled under, knuckles guiding the flat of the blade).",
          technique: {
            heading: "The fundamentals",
            steps: [
              {
                text: "Pinch grip: hold the blade itself between thumb and the side of your index finger, just in front of the handle. Wrap remaining fingers around the handle.",
                tip: "It feels odd for a day and then feels like control. Don't put your index finger on top of the spine."
              },
              {
                text: "The claw: curl the fingertips of your guiding hand under, so your knuckles face the blade. The flat of the knife rides gently against your knuckles.",
                tip: "If your fingertips are tucked, the blade physically cannot reach them."
              },
              {
                text: "Rock chop: keep the knife tip on (or near) the board and rock the blade down and slightly forward through the food. Don't lift the whole knife and 'hack'."
              },
              {
                text: "Cut flat sides first: halve round things (onions, tomatoes) so they sit flat on the board before further cuts. A stable ingredient is a safe ingredient."
              },
              {
                text: "Go slowly. Aim for even pieces, not fast pieces — even pieces cook evenly, and that's the whole point of knife skills."
              }
            ]
          },
          recipe: {
            name: "Pico de Gallo",
            description:
              "Fresh tomato salsa — a knife-skills workout: dicing tomato, mincing onion and cilantro, and juicing lime. No cooking, maximum chopping.",
            servings: 4,
            time: "20 min",
            ingredients: [
              { qty: 4, unit: "", item: "ripe tomatoes, diced small" },
              { qty: 0.5, unit: "", item: "white onion, finely diced" },
              { qty: 1, unit: "", item: "jalapeño, seeded and minced (optional)" },
              { qty: 0.5, unit: "cup", item: "fresh cilantro, chopped" },
              { qty: 1, unit: "", item: "lime, juiced" },
              { qty: 0.5, unit: "tsp", item: "salt" }
            ],
            steps: [
              "Halve the tomatoes so they sit flat. Using the claw grip, cut into slices, then strips, then small dice.",
              "Halve the onion through the root, peel, and dice finely — keep those fingertips curled.",
              "If using the jalapeño, halve it, scrape out seeds with a spoon, and mince.",
              "Bunch the cilantro tightly and rock-chop through it a few times.",
              "Combine everything in a bowl with lime juice and salt. Stir, taste, and adjust.",
              "Let it sit 10 minutes before serving — the salt pulls the juices together."
            ]
          },
          quiz: [
            {
              q: "In the pinch grip, where do your thumb and index finger go?",
              options: [
                "Both wrapped fully around the handle",
                "Pinching the blade just in front of the handle",
                "Index finger on top of the blade's spine"
              ],
              answer: 1
            },
            {
              q: "What protects your guiding hand while chopping?",
              options: [
                "Curling fingertips under so knuckles guide the blade (the claw)",
                "Keeping fingers flat and stretched away from the knife",
                "Wearing an oven mitt"
              ],
              answer: 0
            },
            {
              q: "Why do we aim for evenly sized pieces?",
              options: [
                "They look more professional on social media",
                "Even pieces cook at the same rate",
                "Uneven pieces weigh less"
              ],
              answer: 1
            }
          ]
        },

        {
          id: "l1-4",
          title: "Knife Skills II: Dice, Mince & Slice",
          minutes: 25,
          intro:
            "Recipes speak a size language: slice, dice, mince. 'Dice' usually means roughly ½-inch cubes, 'small dice' about ¼-inch, and 'mince' means as fine as you can get it — mostly used for garlic, ginger, chiles, and herbs.\n\nThe onion is the gateway ingredient: master dicing an onion and you've mastered the logic of almost every cut.",
          technique: {
            heading: "Dicing an onion (the classic method)",
            steps: [
              {
                text: "Cut the onion in half through the root. Peel each half, leaving the root end intact — it holds the layers together."
              },
              {
                text: "Place a half flat-side down. Make horizontal cuts toward (but not through) the root, then vertical cuts the same way.",
                tip: "For everyday cooking you can skip the horizontal cuts — the onion's own layers do most of that work."
              },
              {
                text: "Now slice across your cuts and perfect dice falls off the knife. Discard the root nub."
              },
              {
                text: "Mincing garlic: crush the clove with the flat of your knife (peel pops off), slice, then rock the blade over the pile repeatedly, using your free hand flat on the spine to steady it."
              },
              {
                text: "If onions make you cry: use a sharp knife (less cell damage = less spray), and chill the onion for 15 minutes first."
              }
            ]
          },
          recipe: {
            name: "Chunky Guacamole",
            description:
              "Dice onion and tomato, mince garlic and chile, slice and cube avocado — every cut from this lesson in one bowl.",
            servings: 4,
            time: "15 min",
            ingredients: [
              { qty: 3, unit: "", item: "ripe avocados" },
              { qty: 0.25, unit: "", item: "white onion, finely diced" },
              { qty: 1, unit: "", item: "small tomato, seeded and diced" },
              { qty: 1, unit: "clove", item: "garlic, minced" },
              { qty: 0.5, unit: "", item: "jalapeño, minced (optional)" },
              { qty: 1, unit: "", item: "lime, juiced" },
              { qty: 0.5, unit: "tsp", item: "salt" },
              { qty: 2, unit: "tbsp", item: "cilantro, chopped" }
            ],
            steps: [
              "Practice your onion dice on the quarter onion; mince the garlic and jalapeño.",
              "Halve the avocados around the pit, twist apart, and scoop the flesh with a spoon. Cube it gently on the board.",
              "Mash half the avocado in a bowl with the lime juice and salt; fold in the rest in chunks.",
              "Fold in onion, tomato, garlic, jalapeño, and cilantro.",
              "Taste. It almost always needs a little more lime or salt — adjust until it pops."
            ]
          },
          quiz: [
            {
              q: "Why leave the root end intact when dicing an onion?",
              options: [
                "It adds flavor",
                "It holds the layers together while you cut",
                "It's the sweetest part"
              ],
              answer: 1
            },
            {
              q: "Which cut is the finest?",
              options: ["Dice", "Slice", "Mince"],
              answer: 2
            },
            {
              q: "What's an easy way to peel a garlic clove?",
              options: [
                "Soak it in hot water for 10 minutes",
                "Crush it gently with the flat of your knife",
                "Microwave it for 30 seconds"
              ],
              answer: 1
            }
          ]
        },

        {
          id: "l1-5",
          title: "How to Read a Recipe",
          minutes: 15,
          intro:
            "A recipe is a set of instructions written in a compact code. Once you know the code, you'll never be ambushed halfway through by 'the marinated chicken' you were supposed to start yesterday.\n\nRule one, always: read the entire recipe before you touch a single ingredient.",
          technique: {
            heading: "Decoding the recipe",
            steps: [
              {
                text: "Read the whole recipe first — twice. Note total time, oven temperatures, and any 'rest', 'chill', or 'marinate' steps that need lead time."
              },
              {
                text: "Ingredient lists hide instructions: '1 onion, diced' means dice it before you start cooking. The comma is a to-do item.",
                tip: "'1 cup walnuts, chopped' and '1 cup chopped walnuts' are different amounts! Measure at the point the description sits."
              },
              {
                text: "Watch for the word 'divided' — it means that ingredient is used in more than one place. Don't dump it all in at the first mention."
              },
              {
                text: "Ingredients are listed in order of use. If you lose your place, the list is your map."
              },
              {
                text: "Treat times as guidance and descriptions as truth: 'cook until golden, about 5 minutes' means golden is the goal, 5 minutes is a hint."
              }
            ]
          },
          recipe: {
            name: "Overnight Oats",
            description:
              "A recipe with a hidden time trap — it needs to chill overnight. Reading ahead is the whole lesson.",
            servings: 1,
            time: "5 min + overnight",
            ingredients: [
              { qty: 0.5, unit: "cup", item: "rolled oats (not instant)" },
              { qty: 0.5, unit: "cup", item: "milk (any kind)" },
              { qty: 0.25, unit: "cup", item: "plain yogurt" },
              { qty: 1, unit: "tsp", item: "honey or maple syrup" },
              { qty: 0.25, unit: "tsp", item: "cinnamon" },
              { qty: 0.5, unit: "", item: "banana, sliced, divided" },
              { qty: 1, unit: "tbsp", item: "peanut butter (optional)" }
            ],
            steps: [
              "Did you catch it? 'Divided' banana and an overnight chill. Plan accordingly.",
              "In a jar or container, stir together oats, milk, yogurt, honey, and cinnamon.",
              "Fold in half the banana slices.",
              "Cover and refrigerate overnight (at least 6 hours).",
              "In the morning, top with the remaining banana and the peanut butter. Eat cold, straight from the jar."
            ]
          },
          quiz: [
            {
              q: "What should you always do before starting to cook from a recipe?",
              options: [
                "Preheat the oven, whatever the recipe",
                "Read the entire recipe through first",
                "Double all the seasoning"
              ],
              answer: 1
            },
            {
              q: "In an ingredient list, '1 onion, diced' means…",
              options: [
                "Buy pre-diced onion",
                "Dice the onion during cooking when it's mentioned",
                "Dice the onion before you start cooking"
              ],
              answer: 2
            },
            {
              q: "An ingredient marked 'divided' means…",
              options: [
                "It's used in more than one step — don't add it all at once",
                "Cut it in half",
                "It's optional"
              ],
              answer: 0
            }
          ]
        },

        {
          id: "l1-6",
          title: "Measuring Matters",
          minutes: 20,
          intro:
            "In everyday cooking you can eyeball a lot. In baking and in dressings, sauces, and rice, ratios rule — and measuring properly is the difference between fluffy pancakes and sad discs.\n\nThe crucial distinction: dry measuring cups (fill and level off) vs liquid measuring jugs (read at eye level). They are not interchangeable for accuracy.",
          technique: {
            heading: "Measuring correctly",
            steps: [
              {
                text: "Flour: fluff it in the bag, spoon it into the dry cup, and level with a straight edge. Never scoop the cup directly into the bag.",
                tip: "Scooping compacts flour — you can end up with 25% more than the recipe wants. That's why 'my pancakes are dense'."
              },
              {
                text: "Liquids: use a clear measuring jug on the counter and read the line at eye level, not from above."
              },
              {
                text: "Brown sugar is the exception: pack it firmly into the cup unless told otherwise."
              },
              {
                text: "Teaspoons and tablespoons: 3 tsp = 1 tbsp. Level them off for baking; heaping is fine for seasoning a pot of chili."
              },
              {
                text: "A kitchen scale beats all cups. If a recipe gives grams, use them — 120 g of flour is 120 g every time.",
                tip: "Put the bowl on the scale, press 'tare' to zero it, add ingredient, tare again, repeat. One bowl, no cups to wash."
              }
            ]
          },
          recipe: {
            name: "Classic Fluffy Pancakes",
            description:
              "Pancakes are a measuring test with syrup on top. Spoon-and-level that flour and they'll be light every time.",
            servings: 2,
            time: "25 min",
            ingredients: [
              { qty: 1, unit: "cup", item: "all-purpose flour (spooned & leveled)" },
              { qty: 2, unit: "tbsp", item: "sugar" },
              { qty: 2, unit: "tsp", item: "baking powder" },
              { qty: 0.5, unit: "tsp", item: "salt" },
              { qty: 1, unit: "cup", item: "milk" },
              { qty: 1, unit: "", item: "egg" },
              { qty: 2, unit: "tbsp", item: "butter, melted (plus more for the pan)" },
              { qty: null, unit: "", item: "maple syrup, to serve" }
            ],
            steps: [
              "Whisk flour, sugar, baking powder, and salt in a large bowl.",
              "In a jug, whisk milk, egg, and melted butter.",
              "Pour wet into dry and stir until JUST combined — small lumps are good. Overmixing makes tough pancakes.",
              "Heat a skillet over medium heat, add a little butter, and pour ¼-cup puddles of batter.",
              "Flip when bubbles form and pop on the surface and edges look set (2–3 min). Cook 1–2 min more.",
              "Serve warm with syrup. If the first one is a dud, that's tradition — the pan wasn't ready. Adjust and continue."
            ]
          },
          quiz: [
            {
              q: "What's the right way to measure flour with a cup?",
              options: [
                "Scoop the cup directly into the flour bag",
                "Spoon flour into the cup and level it off",
                "Pack it down firmly like brown sugar"
              ],
              answer: 1
            },
            {
              q: "How many teaspoons in a tablespoon?",
              options: ["2", "3", "4"],
              answer: 1
            },
            {
              q: "What's the most accurate way to measure ingredients?",
              options: [
                "A kitchen scale, in grams",
                "Dry measuring cups",
                "Experienced eyeballing"
              ],
              answer: 0
            }
          ]
        },

        {
          id: "l1-7",
          title: "Mise en Place: Prep Before Heat",
          minutes: 15,
          intro:
            "Mise en place ('meez ahn plahss') is French for 'everything in its place' — and it's the single habit that separates calm cooks from panicked ones. Once a pan is hot, things move fast; garlic burns in the time it takes to find the paprika.\n\nThe rule: before any heat, everything is chopped, measured, and within arm's reach.",
          technique: {
            heading: "Working like a line cook",
            steps: [
              {
                text: "Read the recipe (Lesson 5!) and pull out every ingredient and tool first."
              },
              {
                text: "Do all the knife work up front. Group ingredients that go into the pan at the same time in the same bowl.",
                tip: "You don't need fancy prep bowls — mugs, cereal bowls, and the corners of a plate all work."
              },
              {
                text: "Measure spices and liquids before the heat goes on. A 'pinch bowl' of pre-mixed spices dumps in cleanly at the right moment."
              },
              {
                text: "Set up your landing zones: a plate for cooked food, a rest spot for the spoon, the trash bowl for scraps."
              },
              {
                text: "Only now turn on the stove. Cooking becomes assembly — you watch the pan instead of scrambling behind it."
              }
            ]
          },
          recipe: {
            name: "Caprese Salad",
            description:
              "An assembly recipe where prep IS the dish. Set up your ingredients like a pro, then build it plate by plate.",
            servings: 2,
            time: "15 min",
            ingredients: [
              { qty: 2, unit: "", item: "large ripe tomatoes" },
              { qty: 8, unit: "oz", item: "fresh mozzarella" },
              { qty: 1, unit: "cup", item: "fresh basil leaves" },
              { qty: 2, unit: "tbsp", item: "extra-virgin olive oil" },
              { qty: 1, unit: "tbsp", item: "balsamic vinegar (or glaze)" },
              { qty: null, unit: "", item: "flaky salt & black pepper, to taste" }
            ],
            steps: [
              "Mise en place: slice tomatoes and mozzarella into ¼-inch rounds, pick basil leaves, set out oil, vinegar, salt, pepper, and serving plates. Everything ready before assembly.",
              "Shingle alternating slices of tomato and mozzarella across the plates, tucking basil leaves between.",
              "Drizzle with olive oil, then balsamic.",
              "Finish with flaky salt and a few grinds of pepper.",
              "Serve immediately — notice how smooth assembly feels when everything was ready first."
            ]
          },
          quiz: [
            {
              q: "What does 'mise en place' mean in practice?",
              options: [
                "Cleaning the kitchen after cooking",
                "Prepping and measuring everything before you start cooking",
                "Plating food attractively"
              ],
              answer: 1
            },
            {
              q: "When should you do your knife work?",
              options: [
                "While the pan heats up",
                "Before any heat goes on",
                "Whenever the recipe first mentions the ingredient"
              ],
              answer: 1
            },
            {
              q: "Why group ingredients that are added at the same time in one bowl?",
              options: [
                "It saves washing up",
                "So they can be added to the pan together in one quick motion",
                "The flavors need to blend beforehand"
              ],
              answer: 1
            }
          ]
        },

        {
          id: "l1-8",
          title: "Storing Food & Cleaning As You Go",
          minutes: 15,
          intro:
            "Cooking doesn't end at the plate. Knowing how to store food keeps it safe and cuts waste dramatically — and cleaning as you go means you finish dinner with a clean kitchen instead of a disaster.\n\nMeanwhile, your fridge has zones: the door is the warmest spot (condiments, not milk!), and the bottom shelf is coldest (raw meat lives there, so drips can't contaminate food below).",
          technique: {
            heading: "Storage and cleanup habits",
            steps: [
              {
                text: "Fridge zones: raw meat on the bottom shelf, dairy and eggs on middle shelves (not the door), condiments in the door, most vegetables in the crisper drawer."
              },
              {
                text: "Cool leftovers within 2 hours, store in shallow airtight containers, and eat within 3–4 days.",
                tip: "Label containers with the date using masking tape. Future-you will stop playing 'is this still good?' roulette."
              },
              {
                text: "Not everything goes in the fridge: tomatoes, onions, potatoes, garlic, and bananas prefer the counter or a dark cupboard. (Keep onions and potatoes apart — they spoil each other faster.)"
              },
              {
                text: "Clean as you go: wipe the board between tasks, drop used tools in hot soapy water, and use pockets of waiting time (water coming to a boil, onions softening) to wash up."
              },
              {
                text: "Wipe counters with hot soapy water after raw meat contact — every time, no exceptions."
              }
            ]
          },
          recipe: {
            name: "Marinated Chickpea Salad (Meal-Prep Style)",
            description:
              "A salad that gets BETTER in the fridge — perfect for practicing safe storage, labeling, and planning ahead.",
            servings: 4,
            time: "15 min + 1 hr chill",
            ingredients: [
              { qty: 2, unit: "cans (15 oz)", item: "chickpeas, drained and rinsed" },
              { qty: 1, unit: "", item: "cucumber, diced" },
              { qty: 1, unit: "cup", item: "cherry tomatoes, quartered" },
              { qty: 0.25, unit: "", item: "red onion, finely diced" },
              { qty: 0.25, unit: "cup", item: "olive oil" },
              { qty: 3, unit: "tbsp", item: "red wine vinegar or lemon juice" },
              { qty: 1, unit: "tsp", item: "dried oregano" },
              { qty: 0.75, unit: "tsp", item: "salt" },
              { qty: 0.5, unit: "cup", item: "crumbled feta (optional)" }
            ],
            steps: [
              "Whisk oil, vinegar, oregano, and salt in a large bowl.",
              "Add chickpeas, cucumber, tomatoes, and onion; toss well.",
              "Transfer to an airtight container, label it with today's date, and refrigerate at least 1 hour.",
              "Add feta just before serving so it stays creamy.",
              "Keeps 3–4 days — taste how the flavors deepen by day two. Clean your station: you know the drill now."
            ]
          },
          quiz: [
            {
              q: "Where should raw meat go in the fridge?",
              options: [
                "The door, for easy access",
                "The top shelf",
                "The bottom shelf, so drips can't contaminate other food"
              ],
              answer: 2
            },
            {
              q: "How long do most leftovers safely keep in the fridge?",
              options: ["1 day", "3–4 days", "2 weeks"],
              answer: 1
            },
            {
              q: "Which of these should NOT be stored in the fridge?",
              options: [
                "Cooked rice",
                "Whole tomatoes, potatoes, and onions",
                "Opened yogurt"
              ],
              answer: 1
            }
          ]
        }
      ]
    },

    /* ====================================================================
       LEVEL 2 — FOUNDATIONS
       ==================================================================== */
    {
      id: 2,
      title: "Foundations",
      icon: "🍳",
      subtitle: "Boiling, frying, roasting, seasoning, eggs, rice, pasta",
      description:
        "The core cooking methods. Learn to control heat and salt and you can already feed yourself well for life — everything after this level is refinement.",
      lessons: [
        {
          id: "l2-1",
          title: "Boiling & Simmering",
          minutes: 20,
          intro:
            "Boiling seems too obvious to be a skill — until you know the difference between a rolling boil (big violent bubbles, for pasta), a simmer (small bubbles lazily breaking the surface, for sauces and beans), and a bare simmer (occasional bubble, for delicate things).\n\nMost 'boiled' food is actually simmered. Aggressive boiling tears food apart and toughens proteins.",
          technique: {
            heading: "Controlling water",
            steps: [
              {
                text: "Rolling boil: maximum bubbles, used for pasta and blanching green vegetables. Salt the water generously — it should taste like the sea.",
                tip: "Salted water is your only chance to season pasta and potatoes from the inside."
              },
              {
                text: "Simmer: reduce heat until small bubbles rise gently. This is where soups, sauces, beans, and potatoes want to live."
              },
              {
                text: "Start root vegetables (potatoes, carrots) in COLD water, then bring up to a simmer — they cook evenly from the center out. Green vegetables go into already-boiling water."
              },
              {
                text: "Use a lid to reach a boil faster; crack or remove it to hold a simmer without boiling over."
              },
              {
                text: "Test doneness with a knife tip or fork: it should slide into a potato with no resistance."
              }
            ]
          },
          recipe: {
            name: "Buttery Herbed Potatoes",
            description:
              "Perfectly cooked potatoes are a quiet flex. Cold-water start, proper simmer, knife test — the whole lesson on a plate.",
            servings: 4,
            time: "30 min",
            ingredients: [
              { qty: 2, unit: "lb", item: "baby potatoes (or larger, halved)" },
              { qty: 1, unit: "tbsp", item: "salt (for the cooking water)" },
              { qty: 3, unit: "tbsp", item: "butter" },
              { qty: 2, unit: "tbsp", item: "fresh parsley or chives, chopped" },
              { qty: null, unit: "", item: "flaky salt & black pepper, to taste" }
            ],
            steps: [
              "Put potatoes in a pot and cover with COLD water by an inch. Add the salt.",
              "Bring to a boil over high heat, then reduce to a steady simmer.",
              "Simmer 15–20 minutes, until a knife slides into the largest potato with zero resistance.",
              "Drain well and let them steam-dry in the colander for 2 minutes (wet potatoes shrug off butter).",
              "Return to the warm pot with butter and herbs; toss until glossy.",
              "Season with flaky salt and pepper. Taste one. That's a properly cooked potato."
            ]
          },
          quiz: [
            {
              q: "How salty should pasta/potato cooking water be?",
              options: [
                "Just a pinch",
                "Noticeably salty, like the sea",
                "Unsalted — you season later"
              ],
              answer: 1
            },
            {
              q: "Potatoes should start cooking in…",
              options: [
                "Cold water, brought up to a simmer",
                "Rapidly boiling water",
                "Warm tap water"
              ],
              answer: 0
            },
            {
              q: "What does a simmer look like?",
              options: [
                "Large violent bubbles across the whole surface",
                "Small bubbles gently and steadily breaking the surface",
                "Completely still water with steam"
              ],
              answer: 1
            }
          ]
        },

        {
          id: "l2-2",
          title: "Eggs I: Boiled & Scrambled",
          minutes: 20,
          intro:
            "Eggs are the classic test of a cook because they punish inattention: thirty seconds too long and creamy becomes rubbery. Master gentle heat here and you've learned a principle that applies to fish, custards, and sauces.\n\nThe secret to great scrambled eggs is embarrassingly simple: lower heat than you think, and take them off before they look fully done.",
          technique: {
            heading: "Gentle heat, big payoff",
            steps: [
              {
                text: "Boiled eggs: lower eggs into already-boiling water with a spoon, then time precisely — 7 minutes for jammy yolks, 10–11 for fully hard.",
                tip: "Straight into ice water afterward: stops the cooking and makes peeling far easier."
              },
              {
                text: "Peel boiled eggs starting at the fat end (there's an air pocket) under a trickle of running water."
              },
              {
                text: "Scrambled: whisk eggs thoroughly with a pinch of salt until uniform — no streaks of white."
              },
              {
                text: "Use a nonstick pan over LOW heat with butter. Pour in eggs and stir slowly and constantly with a spatula, scraping the bottom."
              },
              {
                text: "Pull the pan off the heat while eggs still look slightly wet and glossy — carryover heat finishes them on the way to the plate.",
                tip: "Rubbery eggs were cooked 'until done' ON the heat. Creamy eggs finish off it."
              }
            ]
          },
          recipe: {
            name: "Soft Scrambled Eggs on Toast",
            description:
              "The technique dish every brunch place charges $14 for. Low, slow, and off the heat early.",
            servings: 1,
            time: "10 min",
            ingredients: [
              { qty: 3, unit: "", item: "eggs" },
              { qty: 1, unit: "tbsp", item: "butter" },
              { qty: 1, unit: "pinch", item: "salt, plus more to finish" },
              { qty: 1, unit: "slice", item: "good bread, toasted" },
              { qty: null, unit: "", item: "black pepper & chives, to finish" }
            ],
            steps: [
              "Whisk eggs with a pinch of salt until completely uniform.",
              "Start your toast — the eggs will be faster than you think.",
              "Melt butter in a nonstick pan over LOW heat until it foams gently.",
              "Add eggs. Stir slowly and constantly, scraping the bottom, for 2–4 minutes as soft curds form.",
              "When they're mostly set but still glossy and slightly wet, immediately spoon onto the toast.",
              "Finish with salt, pepper, and chives. Notice: no brown bits, no rubber."
            ]
          },
          quiz: [
            {
              q: "How long for a jammy (soft-set) boiled egg yolk?",
              options: ["3 minutes", "7 minutes", "12 minutes"],
              answer: 1
            },
            {
              q: "When should scrambled eggs leave the heat?",
              options: [
                "When fully firm and dry",
                "While still slightly wet and glossy — carryover heat finishes them",
                "When they start to brown"
              ],
              answer: 1
            },
            {
              q: "What heat level makes the creamiest scrambled eggs?",
              options: ["High", "Medium-high", "Low"],
              answer: 2
            }
          ]
        },

        {
          id: "l2-3",
          title: "Eggs II: The Perfect Fried Egg",
          minutes: 15,
          intro:
            "A fried egg is a two-minute lesson in heat control: hot enough to set the white quickly, gentle enough to keep the yolk liquid. Learn the styles — sunny-side up, over easy, and crispy-edged — and you have an instant meal-upgrader for rice, toast, noodles, and burgers.",
          technique: {
            heading: "Three fried egg styles",
            steps: [
              {
                text: "Sunny-side up: butter in a nonstick pan over medium-low. Crack the egg in, cook gently until the white is fully set but the yolk is untouched, 2–3 minutes.",
                tip: "Cover the pan for the last 30 seconds to steam the film of white on top of the yolk without flipping."
              },
              {
                text: "Over easy: cook as above, then slide a thin spatula fully under and flip confidently. 20–30 seconds on the second side, then out."
              },
              {
                text: "Crispy-edged: medium-high heat with a generous swirl of olive oil. The white bubbles, ruffles, and browns at the edges while the yolk stays runny — 2 minutes, no flip."
              },
              {
                text: "Crack eggs on a flat surface, not the pan edge — fewer shell shards, cleaner break."
              },
              {
                text: "Salt the egg in the pan, not after plating — it seasons more evenly."
              }
            ]
          },
          recipe: {
            name: "Fried Egg & Avocado Toast",
            description:
              "Pick your fried-egg style and put it to work on the internet's favorite breakfast.",
            servings: 1,
            time: "10 min",
            ingredients: [
              { qty: 1, unit: "slice", item: "sturdy bread (sourdough is great)" },
              { qty: 0.5, unit: "", item: "ripe avocado" },
              { qty: 1, unit: "", item: "egg" },
              { qty: 1, unit: "tsp", item: "butter or olive oil" },
              { qty: null, unit: "", item: "salt, pepper & chili flakes, to taste" },
              { qty: 0.25, unit: "", item: "lemon (a small squeeze)" }
            ],
            steps: [
              "Toast the bread well — it needs structure under the toppings.",
              "Mash the avocado with a fork, a squeeze of lemon, and a pinch of salt. Spread on the toast.",
              "Fry the egg in your chosen style: sunny, over easy, or crispy-edged.",
              "Slide the egg onto the avocado. Season with salt, pepper, and chili flakes.",
              "Eat immediately, ideally where everyone can see your yolk break in slow motion."
            ]
          },
          quiz: [
            {
              q: "For crispy-edged fried eggs, you want…",
              options: [
                "Low heat and butter",
                "Medium-high heat and a generous amount of olive oil",
                "A dry, oil-free pan"
              ],
              answer: 1
            },
            {
              q: "Why crack eggs on a flat surface instead of the pan's edge?",
              options: [
                "It's more polite",
                "The shell breaks cleaner with fewer shards in your food",
                "It keeps the pan warm"
              ],
              answer: 1
            },
            {
              q: "How can you set the white on top of a sunny-side-up egg without flipping?",
              options: [
                "Cover the pan briefly so it steams",
                "Turn the heat to maximum",
                "Splash it with cold water and stir"
              ],
              answer: 0
            }
          ]
        },

        {
          id: "l2-4",
          title: "Rice Every Time",
          minutes: 25,
          intro:
            "Rice has ruined more dinners than any other side dish, and it's all fixable with three habits: rinse the rice, respect the ratio, and rest it at the end.\n\nRinsing washes off loose surface starch (the culprit behind gluey rice). The ratio for long-grain white rice is 1 cup rice to 1½ cups water — less than the bag says. And the 10-minute covered rest at the end isn't optional; that's when the moisture evens out.",
          technique: {
            heading: "The absorption method",
            steps: [
              {
                text: "Rinse rice in a sieve under cold water, agitating with your fingers, until the water runs mostly clear (30–60 seconds)."
              },
              {
                text: "Combine 1 cup rice, 1½ cups water, and ½ tsp salt in a saucepan with a tight lid.",
                tip: "This ratio is for long-grain white rice like jasmine or basmati. Brown rice wants about 2 cups water and much longer cooking."
              },
              {
                text: "Bring to a boil uncovered, then immediately cover, drop the heat to the lowest setting, and set a timer for 15 minutes. Do not peek — steam is doing the cooking."
              },
              {
                text: "Off the heat, leave it covered for 10 more minutes. This rest is mandatory."
              },
              {
                text: "Fluff gently with a fork, lifting and separating rather than stirring (stirring mashes it)."
              }
            ]
          },
          recipe: {
            name: "Fluffy Stovetop Rice",
            description:
              "Just rice — done properly. Cook it alongside anything, or eat a bowl with butter and soy sauce and zero regrets.",
            servings: 4,
            time: "30 min",
            ingredients: [
              { qty: 1.5, unit: "cups", item: "long-grain white rice (jasmine or basmati)" },
              { qty: 2.25, unit: "cups", item: "water" },
              { qty: 0.75, unit: "tsp", item: "salt" },
              { qty: 1, unit: "tbsp", item: "butter (optional)" }
            ],
            steps: [
              "Rinse the rice in a sieve until the water runs mostly clear.",
              "Combine rice, water, and salt in a saucepan. Bring to a boil.",
              "The moment it boils, cover with a tight lid and reduce heat to the lowest setting. 15 minutes — no peeking.",
              "Remove from heat and rest, still covered, 10 minutes.",
              "Fluff with a fork, stir in butter if using, and serve. Count the grains sticking together: it should be nearly zero."
            ]
          },
          quiz: [
            {
              q: "Why rinse rice before cooking?",
              options: [
                "To remove loose surface starch that makes rice gluey",
                "To add moisture so it cooks faster",
                "To wash away the salt"
              ],
              answer: 0
            },
            {
              q: "What's the water ratio for long-grain white rice?",
              options: [
                "1 cup rice : 1½ cups water",
                "1 cup rice : 3 cups water",
                "Equal parts rice and water"
              ],
              answer: 0
            },
            {
              q: "After the cooking time, you should…",
              options: [
                "Serve immediately while hot",
                "Stir vigorously to release steam",
                "Rest it covered, off the heat, for 10 minutes"
              ],
              answer: 2
            }
          ]
        },

        {
          id: "l2-5",
          title: "Pasta Fundamentals",
          minutes: 25,
          intro:
            "Italian home cooks make weeknight magic with three rules: salt the water like the sea, cook to al dente (tender with a slight bite), and never — never — dump that starchy pasta water down the drain until the dish is finished.\n\nPasta water is liquid gold: the dissolved starch lets sauce cling to noodles and turns oil and water into a silky, unified coating.",
          technique: {
            heading: "Cooking pasta like it matters",
            steps: [
              {
                text: "Use a big pot with lots of water at a rolling boil. Salt it generously — 1 to 2 tablespoons. This is the pasta's only seasoning."
              },
              {
                text: "Stir in the first minute to prevent sticking. No oil in the water — it just coats the noodles and repels sauce later."
              },
              {
                text: "Cook 1–2 minutes LESS than the package says, tasting near the end. Al dente = tender with a slight bite at the center.",
                tip: "The pasta finishes cooking in the sauce, where it drinks up flavor instead of water."
              },
              {
                text: "Before draining, scoop out a cup of the cloudy cooking water."
              },
              {
                text: "Finish the pasta IN the sauce over heat, adding splashes of pasta water and tossing until it turns glossy and clings. This step is what restaurants do and most home cooks skip."
              }
            ]
          },
          recipe: {
            name: "Spaghetti Aglio e Olio",
            description:
              "Garlic, oil, chili, pasta water — the minimalist Roman classic that's entirely technique. Five ingredients, no hiding.",
            servings: 2,
            time: "20 min",
            ingredients: [
              { qty: 8, unit: "oz", item: "spaghetti" },
              { qty: 5, unit: "cloves", item: "garlic, thinly sliced" },
              { qty: 0.33, unit: "cup", item: "olive oil" },
              { qty: 0.5, unit: "tsp", item: "red chili flakes" },
              { qty: 0.25, unit: "cup", item: "fresh parsley, chopped" },
              { qty: 1.5, unit: "tbsp", item: "salt (for the pasta water)" },
              { qty: null, unit: "", item: "grated parmesan, to serve (optional)" }
            ],
            steps: [
              "Boil a big pot of water; salt it like the sea. Cook spaghetti 1–2 min less than the package says.",
              "Meanwhile, warm olive oil and sliced garlic in a large cold skillet over medium-low, letting it slowly turn pale gold — not brown. Add chili flakes at the end.",
              "Scoop out a cup of pasta water, then drain the pasta.",
              "Add pasta to the skillet with a good splash of pasta water. Toss vigorously over medium heat until the sauce turns glossy and coats every strand.",
              "Off the heat, toss in parsley. Taste — it may want a pinch more salt.",
              "Serve immediately, with parmesan if you like. All technique, no shortcuts — and you'll taste it."
            ]
          },
          quiz: [
            {
              q: "What does 'al dente' mean?",
              options: [
                "Completely soft all the way through",
                "Tender but with a slight bite at the center",
                "Slightly crunchy and undercooked"
              ],
              answer: 1
            },
            {
              q: "Why save a cup of pasta cooking water?",
              options: [
                "Its starch helps sauce emulsify and cling to the pasta",
                "To rinse the noodles before serving",
                "To cool the sauce down"
              ],
              answer: 0
            },
            {
              q: "Where should pasta finish cooking?",
              options: [
                "In the boiling water, fully done",
                "In the sauce, over heat",
                "On the plate, resting"
              ],
              answer: 1
            }
          ]
        },

        {
          id: "l2-6",
          title: "Sautéing & Pan-Frying",
          minutes: 25,
          intro:
            "The pan skills. Sautéing (quick cooking in a little fat over lively heat) and pan-frying (a bit more fat, a bit more patience) are how you get golden-brown, deeply flavored food instead of pale, steamed sadness.\n\nBrowning IS flavor — it's a chemical reaction (the Maillard reaction) that creates hundreds of new savory compounds. Your job is to create the conditions for it: a hot pan, dry food, and room to breathe.",
          technique: {
            heading: "Getting the golden-brown",
            steps: [
              {
                text: "Heat the empty pan first, then add oil. It's ready when the oil shimmers and flows like water.",
                tip: "Food added to a cold pan sits and sticks. Food added to a properly hot pan sizzles instantly — that sound is your confirmation."
              },
              {
                text: "Dry your food with paper towels before it hits the pan. Surface moisture must boil off before browning can start."
              },
              {
                text: "Don't crowd the pan — leave space between pieces. Crowding traps steam and you get grey, not golden. Cook in batches if needed."
              },
              {
                text: "Then: leave it alone. Food releases naturally from the pan when it's browned. If it's sticking, it's not ready to flip."
              },
              {
                text: "The brown bits stuck to the pan afterward ('fond') are concentrated flavor — a splash of water, stock, or wine dissolves them into an instant sauce (deglazing)."
              }
            ]
          },
          recipe: {
            name: "Golden Garlic-Butter Mushrooms",
            description:
              "Mushrooms are the ultimate browning tutorial — they're full of water and show you instantly whether your pan was hot enough and uncrowded.",
            servings: 2,
            time: "20 min",
            ingredients: [
              { qty: 1, unit: "lb", item: "cremini or button mushrooms, quartered" },
              { qty: 2, unit: "tbsp", item: "olive oil" },
              { qty: 2, unit: "tbsp", item: "butter" },
              { qty: 3, unit: "cloves", item: "garlic, minced" },
              { qty: 2, unit: "tsp", item: "fresh thyme leaves (or ½ tsp dried)" },
              { qty: 0.5, unit: "tsp", item: "salt" },
              { qty: null, unit: "", item: "black pepper & a squeeze of lemon" }
            ],
            steps: [
              "Heat a large skillet over medium-high until properly hot; add the oil and let it shimmer.",
              "Add mushrooms in a single layer with space between them (two batches if needed). Do NOT salt yet — salt pulls out water and blocks browning.",
              "Leave them alone for 3–4 minutes until deeply golden underneath, then toss and brown the other sides.",
              "Lower heat to medium. Add butter, garlic, and thyme; toss for 1 minute until fragrant.",
              "NOW season with salt and pepper, finish with a squeeze of lemon, and serve — on toast, over rice, or straight from the pan."
            ]
          },
          quiz: [
            {
              q: "How do you know the oil is hot enough to start cooking?",
              options: [
                "It's smoking heavily",
                "It shimmers and flows thinly like water",
                "It's been on the heat for exactly one minute"
              ],
              answer: 1
            },
            {
              q: "What happens when you overcrowd the pan?",
              options: [
                "Food steams in its own moisture instead of browning",
                "Food cooks faster",
                "Nothing — more food is more efficient"
              ],
              answer: 0
            },
            {
              q: "The browned bits stuck to the pan (fond) are…",
              options: [
                "Burnt residue that will make food bitter",
                "Concentrated flavor you can dissolve into a sauce",
                "A sign the heat was too high"
              ],
              answer: 1
            }
          ]
        },

        {
          id: "l2-7",
          title: "Roasting Basics",
          minutes: 25,
          intro:
            "Roasting is the lazy genius method: high dry oven heat does the browning for you while you do something else. It transforms vegetables — caramelized edges, sweet insides — with about four minutes of actual effort.\n\nThe formula for vegetables: 425°F (220°C), enough oil to coat, salt, space on the pan, and patience.",
          technique: {
            heading: "The roasting formula",
            steps: [
              {
                text: "Preheat properly — 425°F (220°C) for most vegetables. A cold oven start means soggy results."
              },
              {
                text: "Cut everything to the same size (your Level 1 knife skills cash in here) so it all finishes together."
              },
              {
                text: "Toss with enough oil to lightly coat every surface, plus salt. Underoiled vegetables dry out instead of crisping."
              },
              {
                text: "Spread in a single layer with space between pieces — the same no-crowding rule as the skillet. Use two pans rather than piling up.",
                tip: "Put cut-sides down against the hot pan: that contact face becomes the deep golden one."
              },
              {
                text: "Don't fuss. Flip once around the two-thirds mark. They're done when edges are browned and a knife slides in easily."
              }
            ]
          },
          recipe: {
            name: "Crispy Roasted Potatoes",
            description:
              "The best-of-both method: a short parboil, a rough shake, then a hot oven. Shattering crust, fluffy middle.",
            servings: 4,
            time: "55 min",
            ingredients: [
              { qty: 2, unit: "lb", item: "Yukon Gold or russet potatoes, cut in 1½-inch chunks" },
              { qty: 1, unit: "tbsp", item: "salt (for the water)" },
              { qty: 3, unit: "tbsp", item: "olive oil" },
              { qty: 0.5, unit: "tsp", item: "garlic powder (optional)" },
              { qty: null, unit: "", item: "flaky salt, pepper & chopped rosemary, to finish" }
            ],
            steps: [
              "Preheat oven to 425°F (220°C). Simmer potato chunks in well-salted water for 8 minutes — just till the edges soften.",
              "Drain, then shake the colander roughly a few times to scuff the surfaces. Those rough edges become the crunch.",
              "Toss with olive oil and garlic powder on a sheet pan; spread in a single layer, cut-sides down, with space between pieces.",
              "Roast 25 minutes without touching, flip, then roast 15–20 more until deeply golden.",
              "Finish with flaky salt, pepper, and rosemary. Serve hot — listen for the crunch."
            ]
          },
          quiz: [
            {
              q: "What's a good all-purpose oven temperature for roasting vegetables?",
              options: ["300°F (150°C)", "425°F (220°C)", "500°F (260°C)"],
              answer: 1
            },
            {
              q: "Why cut vegetables to a uniform size before roasting?",
              options: [
                "So they all finish cooking at the same time",
                "So they fit more neatly on the pan",
                "Smaller pieces taste better"
              ],
              answer: 0
            },
            {
              q: "Why shake the parboiled potatoes in the colander?",
              options: [
                "To drain them faster",
                "To roughen their surfaces, which crisp up in the oven",
                "To remove the salt"
              ],
              answer: 1
            }
          ]
        },

        {
          id: "l2-8",
          title: "Seasoning & Tasting",
          minutes: 20,
          intro:
            "The biggest difference between okay food and 'wow, you made this?' food usually isn't technique — it's seasoning. Two habits do most of the work: season in layers as you cook (not one desperate shake at the end), and taste constantly.\n\nAnd when a dish tastes flat but salty enough? It probably needs ACID — a squeeze of lemon or splash of vinegar wakes up flavors like turning on a light.",
          technique: {
            heading: "Building flavor deliberately",
            steps: [
              {
                text: "Season in layers: a little salt when onions go in, when tomatoes go in, when liquid goes in — not one big correction at the end. Each layer seasons that ingredient from within."
              },
              {
                text: "Taste at every stage. Your spoon is your most important instrument. Ask: does it need salt? Acid? Sweetness? Heat?",
                tip: "Keep a stack of teaspoons by the stove. Tasting five times per dish is normal, not fussy."
              },
              {
                text: "Salt intensifies flavor; acid (lemon, vinegar) brightens it; a pinch of sugar rounds out bitterness or harsh tomatoes; fat carries flavor and smooths edges."
              },
              {
                text: "If it tastes flat: add acid before more salt. Flat-but-salty is the classic missing-acid signature."
              },
              {
                text: "Undersalt to start, adjust up — you can always add. Oversalted? Dilute with unsalted liquid, add a starch, or balance with acid and fat."
              }
            ]
          },
          recipe: {
            name: "Simple Tomato Sauce",
            description:
              "A five-ingredient sauce you'll taste and adjust at least four times. This recipe makes you season on purpose.",
            servings: 4,
            time: "35 min",
            ingredients: [
              { qty: 2, unit: "tbsp", item: "olive oil" },
              { qty: 3, unit: "cloves", item: "garlic, thinly sliced" },
              { qty: 1, unit: "can (28 oz)", item: "crushed tomatoes" },
              { qty: 0.75, unit: "tsp", item: "salt, in layers" },
              { qty: 0.5, unit: "tsp", item: "sugar (if needed)" },
              { qty: 4, unit: "leaves", item: "fresh basil, torn (or ½ tsp dried oregano)" },
              { qty: 1, unit: "tsp", item: "red wine vinegar or lemon juice (if needed)" }
            ],
            steps: [
              "Warm oil and garlic together over medium-low until pale gold and fragrant. TASTE checkpoint #1: smell it — that's your flavor base.",
              "Add tomatoes and a first layer of salt. Simmer gently, partly covered, 20 minutes.",
              "TASTE #2: too sharp or bitter? Add the sugar. Stir, wait a minute.",
              "TASTE #3: flavors present but flat? Add the vinegar or lemon. Notice how it brightens.",
              "TASTE #4: now — and only now — adjust the final salt. Stir in basil off the heat.",
              "Serve over pasta (finish it in the sauce, Lesson 5 style!). You just seasoned like a professional."
            ]
          },
          quiz: [
            {
              q: "When should you season a dish?",
              options: [
                "Once, right at the end",
                "In layers throughout cooking, tasting as you go",
                "Only at the table"
              ],
              answer: 1
            },
            {
              q: "The dish is salty enough but tastes flat and dull. What does it most likely need?",
              options: ["More salt", "Acid, like lemon juice or vinegar", "More cooking time"],
              answer: 1
            },
            {
              q: "What does a small pinch of sugar do in a tomato sauce?",
              options: [
                "Makes it taste like dessert",
                "Thickens the sauce",
                "Rounds out harshness and bitterness"
              ],
              answer: 2
            }
          ]
        },

        {
          id: "l2-9",
          title: "Foundations Capstone: Fried Rice",
          minutes: 30,
          intro:
            "Time to stack your skills. Fried rice uses nearly everything from this level at once: properly cooked rice (day-old is best), scrambled eggs, hot-pan sautéing, seasoning in layers, and tasting to finish.\n\nIt's also the ultimate fridge-clearing improv dish — which is a preview of where this whole course is heading.",
          technique: {
            heading: "Why this dish is the test",
            steps: [
              {
                text: "Rice (Lesson 4): fried rice demands cold, day-old rice. Fresh rice is too moist and clumps; overnight refrigeration dries and firms the grains.",
                tip: "No day-old rice? Cook a fresh batch and spread it on a sheet pan in the fridge for 30 minutes."
              },
              {
                text: "Eggs (Lesson 2): soft-scramble them first and set aside — they'd overcook if left in the pan the whole time."
              },
              {
                text: "Pan heat (Lesson 6): the pan must be genuinely hot, and don't overload it. Crowded fried rice steams into mush."
              },
              {
                text: "Seasoning (Lesson 8): soy sauce goes around the edge of the pan so it sizzles and toasts before mixing in. Taste before serving; adjust."
              },
              {
                text: "Mise en place (Level 1): once the pan is hot, this dish takes 6 minutes. EVERYTHING must be prepped and within reach before you start."
              }
            ]
          },
          recipe: {
            name: "Everything Fried Rice",
            description:
              "Your Level 2 graduation dish. Every skill from this level in one sizzling pan.",
            servings: 2,
            time: "20 min (with cooked rice)",
            ingredients: [
              { qty: 3, unit: "cups", item: "cold cooked rice (ideally day-old)" },
              { qty: 2, unit: "", item: "eggs, beaten" },
              { qty: 2, unit: "tbsp", item: "neutral oil, divided" },
              { qty: 2, unit: "cloves", item: "garlic, minced" },
              { qty: 2, unit: "", item: "scallions, sliced (whites and greens separated)" },
              { qty: 0.75, unit: "cup", item: "frozen peas and carrots" },
              { qty: 2, unit: "tbsp", item: "soy sauce" },
              { qty: 1, unit: "tsp", item: "toasted sesame oil" },
              { qty: null, unit: "", item: "white pepper or black pepper, to taste" }
            ],
            steps: [
              "Mise en place everything — once you start, there's no stopping.",
              "Heat 1 tbsp oil in a large skillet or wok over medium-high. Soft-scramble the eggs and set them aside.",
              "Add remaining oil. Sauté garlic and scallion whites 30 seconds, then peas and carrots for 1 minute.",
              "Add rice, breaking up clumps with your spatula. Spread it out and let it sit 60 seconds untouched to toast, then toss. Repeat twice.",
              "Drizzle soy sauce around the hot edge of the pan, then toss through. Return the eggs, add sesame oil and pepper.",
              "TASTE. More soy? Pepper? Adjust, top with scallion greens, and serve yourself a plate of everything you've learned."
            ]
          },
          quiz: [
            {
              q: "Why is day-old rice better for fried rice?",
              options: [
                "It's drier and firmer, so it fries instead of clumping",
                "It has more flavor after resting",
                "It absorbs more oil"
              ],
              answer: 0
            },
            {
              q: "Why scramble the eggs first and set them aside?",
              options: [
                "They'd overcook if left in the pan the whole time",
                "Eggs must always be cooked in a separate pan",
                "So the rice doesn't turn yellow"
              ],
              answer: 0
            },
            {
              q: "Why is soy sauce added around the hot edge of the pan?",
              options: [
                "To clean the pan edge as it cooks",
                "It sizzles and toasts, adding deeper flavor before mixing in",
                "To cool the pan down slightly"
              ],
              answer: 1
            }
          ]
        }
      ]
    },

    /* ====================================================================
       LEVEL 3 — EVERYDAY COOK (stub — content coming soon)
       ==================================================================== */
    {
      id: 3,
      title: "Everyday Cook",
      icon: "🥘",
      subtitle: "Full simple meals, one-pot dishes, salads, basic sauces",
      description:
        "Turn techniques into complete meals: one-pot dinners, hearty soups, real salads, and the sauces that tie a plate together.",
      lessons: [
        { id: "l3-1", title: "One-Pot Chicken & Rice", stub: true },
        { id: "l3-2", title: "The Weeknight Stir-Fry Formula", stub: true },
        { id: "l3-3", title: "Hearty Soups from Scratch", stub: true },
        { id: "l3-4", title: "Grain Bowls & Meal Salads", stub: true },
        { id: "l3-5", title: "Basic Pan Sauces", stub: true },
        { id: "l3-6", title: "Sheet-Pan Dinners", stub: true },
        { id: "l3-7", title: "Beans & Lentils Done Right", stub: true },
        { id: "l3-8", title: "Simple Weeknight Curries", stub: true },
        { id: "l3-9", title: "Dressings Beyond Vinaigrette", stub: true },
        { id: "l3-10", title: "Build a Weekly Meal Plan", stub: true }
      ]
    },

    /* ====================================================================
       LEVEL 4 — CONFIDENT COOK (stub — content coming soon)
       ==================================================================== */
    {
      id: 4,
      title: "Confident Cook",
      icon: "🥩",
      subtitle: "Meat & fish doneness, stocks, bread basics, flavor balancing",
      description:
        "Handle proteins with certainty, build stocks from scratch, bake your first bread, and balance flavors by instinct.",
      lessons: [
        { id: "l4-1", title: "Meat Doneness & Resting", stub: true },
        { id: "l4-2", title: "Fish Without Fear", stub: true },
        { id: "l4-3", title: "Homemade Chicken Stock", stub: true },
        { id: "l4-4", title: "Pan-Seared Steak & Chops", stub: true },
        { id: "l4-5", title: "Bread Basics: The No-Knead Loaf", stub: true },
        { id: "l4-6", title: "Flavor Balancing: Salt, Fat, Acid, Heat", stub: true },
        { id: "l4-7", title: "Brines & Marinades", stub: true },
        { id: "l4-8", title: "Gravies & Thickened Sauces", stub: true },
        { id: "l4-9", title: "The Whole Roast Chicken", stub: true }
      ]
    },

    /* ====================================================================
       LEVEL 5 — ADVANCED (stub — content coming soon)
       ==================================================================== */
    {
      id: 5,
      title: "Advanced",
      icon: "👨‍🍳",
      subtitle: "Emulsions, braising, baking precision, plating",
      description:
        "Restaurant-level technique at home: sauces that hold, braises that melt, baking by the gram, and plates that look the part.",
      lessons: [
        { id: "l5-1", title: "Emulsions: Mayonnaise & Hollandaise", stub: true },
        { id: "l5-2", title: "Braising Low & Slow", stub: true },
        { id: "l5-3", title: "Baking with Precision", stub: true },
        { id: "l5-4", title: "Pastry Fundamentals", stub: true },
        { id: "l5-5", title: "Risotto & Stirred Grains", stub: true },
        { id: "l5-6", title: "Reductions & Glazes", stub: true },
        { id: "l5-7", title: "Fresh Pasta from Scratch", stub: true },
        { id: "l5-8", title: "Plating & Presentation", stub: true }
      ]
    },

    /* ====================================================================
       LEVEL 6 — MASTER (stub — content coming soon)
       ==================================================================== */
    {
      id: 6,
      title: "Master",
      icon: "⭐",
      subtitle: "Multi-course planning, timing a full menu, improvising",
      description:
        "The final level: design menus, orchestrate timing across courses, and cook confidently with no recipe at all.",
      lessons: [
        { id: "l6-1", title: "Designing a Multi-Course Menu", stub: true },
        { id: "l6-2", title: "Timing a Dinner Party", stub: true },
        { id: "l6-3", title: "Improvising Without Recipes", stub: true },
        { id: "l6-4", title: "Pantry Challenge: Cook from What You Have", stub: true },
        { id: "l6-5", title: "Flavor Pairing Theory", stub: true },
        { id: "l6-6", title: "Scaling Recipes for a Crowd", stub: true },
        { id: "l6-7", title: "Seasonal Menu Planning", stub: true },
        { id: "l6-8", title: "Your Signature Dish", stub: true }
      ]
    }
  ]
};
