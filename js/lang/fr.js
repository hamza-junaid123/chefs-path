/* Chef's Path — French lesson-content translations.
   Registers into window.CONTENT_I18N.fr. Missing fields fall back to English. */
window.CONTENT_I18N = window.CONTENT_I18N || {};
CONTENT_I18N.fr = {
  levels: {
    1: { title: "Bases de la Cuisine", subtitle: "Maniement du couteau, sécurité, lire une recette, mesurer, ustensiles essentiels" },
    2: { title: "Fondations", subtitle: "Bouillir, frire, rôtir, assaisonner, œufs, riz, pâtes" },
    3: { title: "Cuisinier du Quotidien", subtitle: "Repas simples complets, plats uniques, salades, sauces de base" },
    4: { title: "Cuisinier Confiant", subtitle: "Cuisson des viandes et poissons, bouillons, pain de base, équilibre des saveurs" },
    5: { title: "Avancé", subtitle: "Émulsions, braisage, pâtisserie de précision, dressage" },
    6: { title: "Maître", subtitle: "Planifier plusieurs plats, minuter un menu, improviser" }
  },

  "l1-1": {
    title: "Découvrez Votre Cuisine : Les Ustensiles Essentiels",
    intro: "Vous n'avez pas besoin d'un tiroir plein de gadgets pour bien cuisiner — il vous faut une dizaine d'outils qui font leur travail chaque jour. Les cuisines professionnelles fonctionnent avec une liste étonnamment courte, et la vôtre aussi.\n\nLes trois indispensables sont un couteau de chef (20 cm est idéal), une grande planche à découper et une poêle lourde. Ajoutez une casserole, une plaque de cuisson, des tasses et cuillères à mesurer, deux bols, une pince, une spatule souple et un thermomètre instantané, et vous pourrez cuisiner 95 % des recettes maison.",
    technique: {
      heading: "Préparez votre poste",
      steps: [
        "Rassemblez vos outils de base : couteau de chef, planche à découper, poêle de 25–30 cm, casserole de 2–3 litres, plaque, tasses/cuillères à mesurer, deux bols, une pince et une spatule.",
        "Posez la planche sur un essuie-tout humide ou un torchon fin pour qu'elle ne glisse pas pendant que vous coupez.",
        "Gardez un 'bol à déchets' sur le plan de travail pour les épluchures, afin de ne pas courir à la poubelle en pleine préparation.",
        "Vérifiez que le couteau est aiguisé : il doit trancher proprement une feuille de papier. Un couteau émoussé glisse et est plus dangereux qu'un couteau aiguisé.",
        "Disposez les outils pour que votre main dominante atteigne le couteau et l'autre les ingrédients — cela devient vite un réflexe."
      ],
      tips: [
        "Un bon couteau de chef de 20 cm vaut mieux qu'un bloc de 12 couteaux. Investissez-y d'abord.",
        "Une planche qui glisse est la cause n°1 d'accidents chez les débutants.",
        null,
        "Beaucoup de magasins aiguisent les couteaux à petit prix si vous n'avez pas d'aiguiseur.",
        null
      ]
    },
    recipe: {
      name: "Pain Perdu à la Cannelle et au Sucre",
      description: "La première recette classique : elle utilise des cuillères à mesurer, un couteau et votre attention — les trois outils que vous utiliserez toujours.",
      time: "10 min",
      units: ["tranches", "c. à s.", "c. à s.", "c. à c.", ""],
      ingredients: ["pain de mie", "beurre, ramolli", "sucre en poudre", "cannelle moulue", "une pincée de sel"],
      steps: [
        "Mélangez le sucre, la cannelle et une pincée de sel dans un petit bol.",
        "Grillez le pain jusqu'à ce qu'il soit doré.",
        "Pendant qu'il est chaud, tartinez chaque tranche de bord à bord avec le beurre ramolli à l'aide d'un couteau.",
        "Saupoudrez le sucre à la cannelle uniformément sur le côté beurré — la chaleur le fait fondre en glaçage.",
        "Coupez en diagonale avec votre couteau de chef (entraînez cette prise !) et mangez chaud."
      ]
    },
    quiz: [
      { q: "Quel couteau un débutant devrait-il acheter en premier ?", options: ["Un bloc de 12 couteaux", "Un bon couteau de chef de 20 cm", "Un couteau d'office et un couperet"] },
      { q: "Pourquoi mettre un torchon humide sous la planche à découper ?", options: ["Pour garder la planche propre", "Pour que la planche ne glisse pas pendant la coupe", "Pour traiter le bois"] },
      { q: "Qu'est-ce qui est le plus dangereux en cuisine ?", options: ["Un couteau aiguisé", "Un couteau émoussé", "Ils sont aussi dangereux l'un que l'autre"] }
    ]
  },

  "l1-2": {
    title: "Sécurité et Hygiène en Cuisine",
    intro: "Presque tous les accidents de cuisine et cas d'intoxication alimentaire sont évitables avec une poignée d'habitudes. Apprenez-les une fois et appliquez-les automatiquement pour toujours.\n\nLes deux grandes idées : gardez séparés les aliments crus et prêts à consommer (contamination croisée), et gardez les aliments hors de la 'zone de danger' — entre 4 et 60 °C — où les bactéries se multiplient le plus vite.",
    technique: {
      heading: "Les habitudes de sécurité qui comptent",
      steps: [
        "Lavez-vous les mains au savon pendant 20 secondes avant de cuisiner, et à nouveau chaque fois que vous touchez de la viande, du poisson ou des œufs crus.",
        "Utilisez des planches séparées (ou lavez-les bien à l'eau chaude savonneuse) pour la viande crue et tout le reste.",
        "Ne laissez jamais d'aliments périssables à température ambiante plus de 2 heures. Réfrigérez les restes rapidement.",
        "Si l'huile prend feu dans une poêle : coupez le feu et couvrez la poêle d'un couvercle. Ne versez JAMAIS d'eau — l'eau fait exploser l'huile en flammes vers l'extérieur.",
        "Portez les couteaux pointe vers le bas le long du corps, ne les lavez jamais 'à l'aveugle' dans un évier mousseux, et dites 'derrière toi' si vous partagez la cuisine."
      ],
      tips: [
        null,
        "Beaucoup de cuisiniers réservent une planche uniquement à la viande crue — une couleur différente rend cela infaillible.",
        "La zone de danger est 4–60 °C. Le froid au froid, le chaud au chaud.",
        null,
        null
      ]
    },
    recipe: {
      name: "Salade Arc-en-Ciel Croquante à la Vinaigrette Citron",
      description: "Une recette sans cuisson qui ancre l'habitude de sécurité la plus répétée : bien laver et manipuler les produits frais.",
      time: "15 min",
      units: ["tasses", "", "tasse", "", "tasse", "c. à s.", "c. à s.", "c. à c.", ""],
      ingredients: ["laitue romaine ou mélange, hachée", "carotte, râpée grossièrement", "tomates cerises, coupées en deux", "concombre, en rondelles", "maïs doux (en boîte, égoutté)", "huile d'olive", "jus de citron frais", "sel", "poivre noir, au goût"],
      steps: [
        "Lavez-vous les mains, puis lavez tous les produits à l'eau froide courante — même ceux que vous épluchez.",
        "Séchez bien les feuilles (essoreuse ou torchon propre). La vinaigrette glisse sur les feuilles mouillées.",
        "Coupez les légumes sur une planche propre avec un couteau propre.",
        "Fouettez l'huile d'olive, le jus de citron, le sel et le poivre au fond du saladier.",
        "Ajoutez les légumes, mélangez pour enrober, goûtez et ajustez le sel ou le citron.",
        "Réfrigérez tout reste dans les 2 heures — vous savez maintenant pourquoi."
      ]
    },
    quiz: [
      { q: "Quelle est la 'zone de danger' de température où les bactéries se multiplient le plus vite ?", options: ["Sous zéro (congélation)", "4–60 °C", "71–100 °C"] },
      { q: "Une poêle d'huile prend feu. Que faites-vous ?", options: ["Verser de l'eau vite", "Porter la poêle dehors", "Couper le feu et couvrir la poêle d'un couvercle"] },
      { q: "Vous venez de couper du poulet cru sur votre planche. Vous devez couper des tomates. Que faites-vous ?", options: ["Essuyer la planche avec un papier sec et continuer", "Laver d'abord la planche et le couteau à l'eau chaude savonneuse (ou prendre une autre planche)", "Couper les tomates de l'autre côté de la même planche"] }
    ]
  },

  "l1-3": {
    title: "Techniques de Couteau I : Prise, Griffe et Coupe Bascule",
    intro: "Un bon travail au couteau n'est pas une question de vitesse — c'est une prise stable, une main-guide protégée, et laisser le tranchant faire le travail. La vitesse vient d'elle-même après quelques semaines de pratique correcte.\n\nDeux positions à apprendre : la prise en pince (pouce et index pinçant la lame juste devant le manche) et la griffe (le bout des doigts de l'autre main replié, les jointures guidant le plat de la lame).",
    technique: {
      heading: "Les fondamentaux",
      steps: [
        "Prise en pince : tenez la lame entre le pouce et le côté de l'index, juste devant le manche. Enroulez les autres doigts autour du manche.",
        "La griffe : repliez le bout des doigts de la main-guide pour que les jointures fassent face à la lame. Le plat du couteau glisse doucement contre vos jointures.",
        "Coupe bascule : gardez la pointe du couteau sur (ou près de) la planche et faites basculer la lame vers le bas et légèrement vers l'avant à travers l'aliment. Ne soulevez pas tout le couteau pour 'hacher'.",
        "Coupez d'abord les faces plates : coupez en deux les choses rondes (oignons, tomates) pour qu'elles reposent à plat avant d'autres coupes. Un ingrédient stable est un ingrédient sûr.",
        "Allez lentement. Visez des morceaux réguliers, pas rapides — les morceaux réguliers cuisent uniformément, et c'est tout l'objet du travail au couteau."
      ],
      tips: [
        "C'est étrange un jour puis ça devient du contrôle. Ne posez pas l'index sur le dos de la lame.",
        "Si le bout des doigts est replié, la lame ne peut physiquement pas les atteindre.",
        null, null, null
      ]
    },
    recipe: {
      name: "Pico de Gallo",
      description: "Salsa de tomate fraîche — un exercice au couteau : tailler la tomate, hacher oignon et coriandre, presser le citron vert. Sans cuisson, un maximum de découpe.",
      time: "20 min",
      units: ["", "", "", "tasse", "", "c. à c."],
      ingredients: ["tomates mûres, en petits dés", "oignon blanc, finement haché", "piment jalapeño, épépiné et haché (facultatif)", "coriandre fraîche, hachée", "citron vert, pressé", "sel"],
      steps: [
        "Coupez les tomates en deux pour qu'elles reposent à plat. En prise griffe, coupez en tranches, puis en lamelles, puis en petits dés.",
        "Coupez l'oignon en deux par la racine, épluchez et hachez finement — gardez le bout des doigts replié.",
        "Si vous utilisez le jalapeño, coupez-le en deux, retirez les graines à la cuillère et hachez.",
        "Rassemblez la coriandre bien serrée et hachez en bascule plusieurs fois.",
        "Réunissez le tout dans un bol avec le jus de citron vert et le sel. Mélangez, goûtez et ajustez.",
        "Laissez reposer 10 minutes avant de servir — le sel réunit les jus."
      ]
    },
    quiz: [
      { q: "Dans la prise en pince, où vont le pouce et l'index ?", options: ["Tous deux entièrement autour du manche", "En pinçant la lame juste devant le manche", "L'index sur le dos de la lame"] },
      { q: "Qu'est-ce qui protège votre main-guide pendant la coupe ?", options: ["Replier le bout des doigts pour que les jointures guident la lame (la griffe)", "Garder les doigts à plat et tendus loin du couteau", "Porter un gant de four"] },
      { q: "Pourquoi vise-t-on des morceaux de taille régulière ?", options: ["Ils sont plus pro sur les réseaux sociaux", "Les morceaux réguliers cuisent au même rythme", "Les morceaux irréguliers pèsent moins"] }
    ]
  },

  "l1-4": {
    title: "Techniques de Couteau II : Dés, Hachis et Tranches",
    intro: "Les recettes parlent un langage de tailles : trancher, tailler en dés, hacher. 'Dés' signifie en général des cubes d'environ 1 cm, 'petits dés' environ 0,5 cm, et 'hacher' aussi fin que possible — surtout pour l'ail, le gingembre, les piments et les herbes.\n\nL'oignon est l'ingrédient d'entrée : maîtrisez la découpe d'un oignon et vous maîtrisez la logique de presque toutes les coupes.",
    technique: {
      heading: "Tailler un oignon en dés (la méthode classique)",
      steps: [
        "Coupez l'oignon en deux à travers la racine. Épluchez chaque moitié en laissant la racine intacte — elle maintient les couches ensemble.",
        "Posez une moitié face plate en bas. Faites des coupes horizontales vers (mais pas à travers) la racine, puis des coupes verticales de même.",
        "Coupez maintenant perpendiculairement à vos coupes et des dés parfaits tombent du couteau. Jetez le bout de racine.",
        "Hacher l'ail : écrasez la gousse avec le plat du couteau (la peau se détache), tranchez, puis basculez la lame sur le tas à répétition, la main libre à plat sur le dos pour stabiliser.",
        "Si l'oignon vous fait pleurer : utilisez un couteau aiguisé (moins de dégâts cellulaires = moins de vapeurs) et refroidissez l'oignon 15 minutes avant."
      ],
      tips: [
        null,
        "Au quotidien, vous pouvez sauter les coupes horizontales — les couches de l'oignon font l'essentiel de ce travail.",
        null, null, null
      ]
    },
    recipe: {
      name: "Guacamole en Morceaux",
      description: "Taillez oignon et tomate en dés, hachez ail et piment, tranchez et cubez l'avocat — chaque coupe de cette leçon dans un bol.",
      time: "15 min",
      units: ["", "", "", "gousse", "", "", "c. à c.", "c. à s."],
      ingredients: ["avocats mûrs", "oignon blanc, finement haché", "petite tomate, épépinée et en dés", "ail, haché", "jalapeño, haché (facultatif)", "citron vert, pressé", "sel", "coriandre, hachée"],
      steps: [
        "Entraînez-vous à la découpe sur le quart d'oignon ; hachez l'ail et le jalapeño.",
        "Coupez les avocats autour du noyau, tournez pour séparer et récupérez la chair à la cuillère. Cubez-la doucement sur la planche.",
        "Écrasez la moitié de l'avocat dans un bol avec le jus de citron vert et le sel ; incorporez le reste en morceaux.",
        "Incorporez l'oignon, la tomate, l'ail, le jalapeño et la coriandre.",
        "Goûtez. Il faut presque toujours un peu plus de citron vert ou de sel — ajustez jusqu'à ce que ça pétille."
      ]
    },
    quiz: [
      { q: "Pourquoi laisser la racine intacte en taillant un oignon ?", options: ["Elle ajoute du goût", "Elle maintient les couches ensemble pendant la coupe", "C'est la partie la plus sucrée"] },
      { q: "Quelle coupe est la plus fine ?", options: ["Dés", "Tranche", "Hachis"] },
      { q: "Une façon simple d'éplucher une gousse d'ail ?", options: ["La tremper 10 minutes dans l'eau chaude", "L'écraser doucement avec le plat du couteau", "La passer 30 secondes au micro-ondes"] }
    ]
  },

  "l1-5": {
    title: "Comment Lire une Recette",
    intro: "Une recette est un ensemble d'instructions écrites dans un code compact. Une fois le code connu, vous ne serez plus pris au dépourvu à mi-parcours par 'le poulet mariné' que vous deviez commencer hier.\n\nRègle numéro un, toujours : lisez toute la recette avant de toucher le moindre ingrédient.",
    technique: {
      heading: "Décoder la recette",
      steps: [
        "Lisez toute la recette d'abord — deux fois. Notez le temps total, les températures du four et toute étape de 'repos', 'réfrigération' ou 'marinade' qui demande de l'avance.",
        "Les listes d'ingrédients cachent des instructions : '1 oignon, en dés' signifie coupez-le avant de commencer. La virgule est une tâche.",
        "Attention au mot 'réparti' — il signifie que cet ingrédient sert à plus d'un endroit. Ne mettez pas tout à la première mention.",
        "Les ingrédients sont listés dans l'ordre d'utilisation. Si vous perdez le fil, la liste est votre carte.",
        "Traitez les temps comme un repère et les descriptions comme une vérité : 'cuire jusqu'à doré, environ 5 minutes' signifie que doré est le but, 5 minutes un indice."
      ],
      tips: [
        null,
        "'1 tasse de noix, hachées' et '1 tasse de noix hachées' sont des quantités différentes ! Mesurez à l'étape où est la description.",
        null, null, null
      ]
    },
    recipe: {
      name: "Overnight Oats (Flocons d'Avoine de Nuit)",
      description: "Une recette avec un piège de temps caché — elle doit reposer toute la nuit. Lire à l'avance, c'est toute la leçon.",
      time: "5 min + une nuit",
      units: ["tasse", "tasse", "tasse", "c. à c.", "c. à c.", "", "c. à s."],
      ingredients: ["flocons d'avoine (pas instantanés)", "lait (au choix)", "yaourt nature", "miel ou sirop d'érable", "cannelle", "banane, en rondelles, répartie", "beurre de cacahuète (facultatif)"],
      steps: [
        "Vous l'avez repéré ? Banane 'répartie' et repos d'une nuit. Planifiez en conséquence.",
        "Dans un bocal, mélangez les flocons, le lait, le yaourt, le miel et la cannelle.",
        "Incorporez la moitié des rondelles de banane.",
        "Couvrez et réfrigérez toute la nuit (au moins 6 heures).",
        "Le matin, garnissez du reste de banane et du beurre de cacahuète. Mangez froid, directement du bocal."
      ]
    },
    quiz: [
      { q: "Que devriez-vous toujours faire avant de commencer une recette ?", options: ["Préchauffer le four, quelle que soit la recette", "Lire toute la recette d'abord", "Doubler tout l'assaisonnement"] },
      { q: "Dans une liste d'ingrédients, '1 oignon, en dés' signifie…", options: ["Acheter de l'oignon déjà coupé", "Couper l'oignon pendant la cuisson quand il est mentionné", "Couper l'oignon en dés avant de commencer"] },
      { q: "Un ingrédient marqué 'réparti' signifie…", options: ["Il sert à plus d'une étape — ne l'ajoutez pas tout d'un coup", "Coupez-le en deux", "Il est facultatif"] }
    ]
  },

  "l1-6": {
    title: "Bien Mesurer",
    intro: "En cuisine de tous les jours, on peut estimer beaucoup à l'œil. En pâtisserie et pour les vinaigrettes, sauces et riz, les proportions règnent — et bien mesurer fait la différence entre des pancakes moelleux et de tristes galettes.\n\nLa distinction cruciale : tasses à mesurer pour le sec (remplir et araser) contre verres doseurs pour le liquide (lire à hauteur des yeux). Ils ne sont pas interchangeables pour la précision.",
    technique: {
      heading: "Mesurer correctement",
      steps: [
        "Farine : aérez-la dans le paquet, versez-la à la cuillère dans la tasse et arasez avec un bord droit. Ne plongez jamais la tasse directement dans le paquet.",
        "Liquides : utilisez un verre doseur transparent sur le plan de travail et lisez le trait à hauteur des yeux, pas d'en haut.",
        "La cassonade est l'exception : tassez-la fermement dans la tasse sauf indication contraire.",
        "Cuillères à café et à soupe : 3 c. à c. = 1 c. à s. Arasez pour la pâtisserie ; bombées, c'est bien pour assaisonner un chili.",
        "Une balance de cuisine surpasse toutes les tasses. Si une recette donne des grammes, utilisez-les — 120 g de farine, c'est toujours 120 g."
      ],
      tips: [
        "Plonger la tasse tasse la farine — vous pouvez finir avec 25 % de plus que prévu. D'où 'mes pancakes sont denses'.",
        null, null, null,
        "Posez le bol sur la balance, 'tarez' à zéro, ajoutez l'ingrédient, tarez à nouveau, répétez. Un bol, aucune tasse à laver."
      ]
    },
    recipe: {
      name: "Pancakes Moelleux Classiques",
      description: "Les pancakes sont un test de mesure avec du sirop. Versez la farine à la cuillère et arasez, ils seront légers à tous les coups.",
      time: "25 min",
      units: ["tasse", "c. à s.", "c. à c.", "c. à c.", "tasse", "", "c. à s.", ""],
      ingredients: ["farine tout usage (versée à la cuillère et arasée)", "sucre", "levure chimique", "sel", "lait", "œuf", "beurre, fondu (plus pour la poêle)", "sirop d'érable, pour servir"],
      steps: [
        "Fouettez la farine, le sucre, la levure et le sel dans un grand bol.",
        "Dans un verre doseur, fouettez le lait, l'œuf et le beurre fondu.",
        "Versez le liquide sur le sec et mélangez JUSTE assez pour réunir — de petits grumeaux, c'est bien. Trop mélanger rend les pancakes durs.",
        "Chauffez une poêle à feu moyen, ajoutez un peu de beurre et versez des ronds de pâte d'¼ de tasse.",
        "Retournez quand des bulles se forment et éclatent en surface et que les bords semblent pris (2–3 min). Cuisez 1–2 min de plus.",
        "Servez chaud avec du sirop. Si le premier rate, c'est la tradition — la poêle n'était pas prête. Ajustez et continuez."
      ]
    },
    quiz: [
      { q: "Quelle est la bonne façon de mesurer la farine avec une tasse ?", options: ["Plonger la tasse directement dans le paquet", "Verser la farine à la cuillère dans la tasse et araser", "La tasser fermement comme la cassonade"] },
      { q: "Combien de cuillères à café dans une cuillère à soupe ?", options: ["2", "3", "4"] },
      { q: "La façon la plus précise de mesurer les ingrédients ?", options: ["Une balance de cuisine, en grammes", "Les tasses à mesurer pour le sec", "L'estimation à l'œil avec de l'expérience"] }
    ]
  },

  "l1-7": {
    title: "Mise en Place : Préparer Avant le Feu",
    intro: "La mise en place, c'est 'chaque chose à sa place' — et c'est l'unique habitude qui sépare les cuisiniers calmes de ceux qui paniquent. Une fois la poêle chaude, tout va vite ; l'ail brûle le temps de trouver le paprika.\n\nLa règle : avant tout feu, tout est coupé, mesuré et à portée de main.",
    technique: {
      heading: "Travailler comme un cuisinier de ligne",
      steps: [
        "Lisez la recette (leçon 5 !) et sortez d'abord chaque ingrédient et outil.",
        "Faites toute la découpe à l'avance. Regroupez dans un même bol les ingrédients qui vont dans la poêle en même temps.",
        "Mesurez épices et liquides avant d'allumer le feu. Un 'bol à pincées' d'épices pré-mélangées se verse net au bon moment.",
        "Préparez vos zones d'atterrissage : une assiette pour les aliments cuits, un endroit pour la cuillère, le bol à déchets pour les épluchures.",
        "Allumez le feu seulement maintenant. Cuisiner devient de l'assemblage — vous surveillez la poêle au lieu de courir derrière."
      ],
      tips: [
        null,
        "Pas besoin de bols chics — des mugs, des bols et les coins d'une assiette font l'affaire.",
        null, null, null
      ]
    },
    recipe: {
      name: "Salade Caprese",
      description: "Une recette d'assemblage où la préparation EST le plat. Disposez vos ingrédients comme un pro, puis montez assiette par assiette.",
      time: "15 min",
      units: ["", "g", "tasse", "c. à s.", "c. à s.", ""],
      ingredients: ["grosses tomates mûres", "mozzarella fraîche", "feuilles de basilic frais", "huile d'olive vierge extra", "vinaigre balsamique (ou crème)", "sel en flocons et poivre noir, au goût"],
      steps: [
        "Mise en place : coupez tomates et mozzarella en rondelles de ½ cm, cueillez le basilic, disposez huile, vinaigre, sel, poivre et les assiettes. Tout prêt avant de monter.",
        "Superposez en éventail des rondelles alternées de tomate et de mozzarella, en glissant des feuilles de basilic entre elles.",
        "Arrosez d'huile d'olive, puis de balsamique.",
        "Terminez avec le sel en flocons et quelques tours de poivre.",
        "Servez aussitôt — remarquez comme l'assemblage est fluide quand tout était prêt d'abord."
      ]
    },
    quiz: [
      { q: "Que signifie 'mise en place' en pratique ?", options: ["Nettoyer la cuisine après avoir cuisiné", "Préparer et mesurer tout avant de commencer à cuisiner", "Dresser joliment le plat"] },
      { q: "Quand faire la découpe au couteau ?", options: ["Pendant que la poêle chauffe", "Avant tout feu", "Quand la recette mentionne l'ingrédient pour la première fois"] },
      { q: "Pourquoi regrouper dans un bol les ingrédients ajoutés en même temps ?", options: ["Ça économise la vaisselle", "Pour les ajouter à la poêle ensemble d'un geste rapide", "Les saveurs doivent se mélanger avant"] }
    ]
  },

  "l1-8": {
    title: "Conserver les Aliments et Nettoyer au Fur et à Mesure",
    intro: "Cuisiner ne s'arrête pas à l'assiette. Savoir conserver les aliments les garde sûrs et réduit beaucoup le gaspillage — et nettoyer au fur et à mesure permet de finir le dîner avec une cuisine propre plutôt qu'un désastre.\n\nEn attendant, votre frigo a des zones : la porte est l'endroit le plus chaud (condiments, pas le lait !), et l'étagère du bas la plus froide (la viande crue y va, pour que les gouttes ne contaminent pas ce qui est en dessous).",
    technique: {
      heading: "Habitudes de conservation et de nettoyage",
      steps: [
        "Zones du frigo : viande crue en bas, produits laitiers et œufs sur les étagères centrales (pas la porte), condiments dans la porte, la plupart des légumes dans le bac.",
        "Refroidissez les restes en 2 heures, conservez-les dans des contenants hermétiques peu profonds et consommez-les sous 3–4 jours.",
        "Tout ne va pas au frigo : tomates, oignons, pommes de terre, ail et bananes préfèrent le plan de travail ou un placard sombre. (Gardez oignons et pommes de terre séparés — ensemble, ils s'abîment plus vite.)",
        "Nettoyez au fur et à mesure : essuyez la planche entre les tâches, mettez les outils usagés dans l'eau chaude savonneuse et profitez des temps d'attente (eau qui bout, oignons qui fondent) pour laver.",
        "Essuyez les plans de travail à l'eau chaude savonneuse après contact avec de la viande crue — à chaque fois, sans exception."
      ],
      tips: [
        null,
        "Étiquetez les contenants avec la date au ruban de masquage. Votre futur vous arrêtera de jouer à 'c'est encore bon ?'.",
        null, null, null
      ]
    },
    recipe: {
      name: "Salade de Pois Chiches Marinés (Style Meal-Prep)",
      description: "Une salade qui S'AMÉLIORE au frigo — parfaite pour pratiquer la conservation sûre, l'étiquetage et l'anticipation.",
      time: "15 min + 1 h au frais",
      units: ["boîtes (425 g)", "", "tasse", "", "tasse", "c. à s.", "c. à c.", "c. à c.", "tasse"],
      ingredients: ["pois chiches, égouttés et rincés", "concombre, en dés", "tomates cerises, en quartiers", "oignon rouge, finement haché", "huile d'olive", "vinaigre de vin rouge ou jus de citron", "origan séché", "sel", "feta émiettée (facultatif)"],
      steps: [
        "Fouettez l'huile, le vinaigre, l'origan et le sel dans un grand bol.",
        "Ajoutez les pois chiches, le concombre, les tomates et l'oignon ; mélangez bien.",
        "Transférez dans un contenant hermétique, étiquetez avec la date du jour et réfrigérez au moins 1 heure.",
        "Ajoutez la feta juste avant de servir pour qu'elle reste crémeuse.",
        "Se garde 3–4 jours — goûtez comme les saveurs s'approfondissent au deuxième jour. Nettoyez votre poste : vous connaissez la routine."
      ]
    },
    quiz: [
      { q: "Où doit aller la viande crue dans le frigo ?", options: ["La porte, pour un accès facile", "L'étagère du haut", "L'étagère du bas, pour que les gouttes ne contaminent pas d'autres aliments"] },
      { q: "Combien de temps la plupart des restes se gardent-ils au frigo ?", options: ["1 jour", "3–4 jours", "2 semaines"] },
      { q: "Lequel NE doit PAS être conservé au frigo ?", options: ["Le riz cuit", "Tomates, pommes de terre et oignons entiers", "Le yaourt entamé"] }
    ]
  },

  "l2-1": {
    title: "Bouillir et Frémir",
    intro: "Bouillir semble trop évident pour être une compétence — jusqu'à ce qu'on connaisse la différence entre une grosse ébullition (grosses bulles violentes, pour les pâtes), un frémissement (petites bulles crevant paresseusement la surface, pour sauces et légumineuses) et un léger frémissement (une bulle occasionnelle, pour les choses délicates).\n\nLa plupart des aliments 'bouillis' sont en fait frémis. Une ébullition agressive déchire les aliments et durcit les protéines.",
    technique: {
      heading: "Maîtriser l'eau",
      steps: [
        "Grosse ébullition : un maximum de bulles, pour les pâtes et blanchir les légumes verts. Salez l'eau généreusement — elle doit avoir le goût de la mer.",
        "Frémissement : baissez le feu jusqu'à ce que de petites bulles montent doucement. C'est là que veulent vivre soupes, sauces, légumineuses et pommes de terre.",
        "Démarrez les légumes-racines (pommes de terre, carottes) à l'eau FROIDE, puis montez au frémissement — ils cuisent uniformément depuis le cœur. Les légumes verts vont dans l'eau déjà bouillante.",
        "Utilisez un couvercle pour atteindre l'ébullition plus vite ; entrouvrez-le pour maintenir un frémissement sans débordement.",
        "Testez la cuisson à la pointe d'un couteau ou d'une fourchette : elle doit entrer dans une pomme de terre sans résistance."
      ],
      tips: [
        "L'eau salée est votre seule chance d'assaisonner les pâtes et les pommes de terre de l'intérieur.",
        null, null, null, null
      ]
    },
    recipe: {
      name: "Pommes de Terre au Beurre et aux Herbes",
      description: "Des pommes de terre bien cuites sont une fierté discrète. Départ à l'eau froide, frémissement correct, test au couteau — toute la leçon dans une assiette.",
      time: "30 min",
      units: ["kg", "c. à s.", "c. à s.", "c. à s.", ""],
      ingredients: ["pommes de terre grenaille (ou grosses, coupées en deux)", "sel (pour l'eau de cuisson)", "beurre", "persil ou ciboulette frais, haché", "sel en flocons et poivre noir, au goût"],
      steps: [
        "Mettez les pommes de terre dans une casserole et couvrez d'eau FROIDE de quelques cm. Ajoutez le sel.",
        "Portez à ébullition à feu vif, puis baissez à un frémissement régulier.",
        "Faites frémir 15–20 minutes, jusqu'à ce qu'un couteau entre dans la plus grosse sans résistance.",
        "Égouttez bien et laissez sécher à la vapeur dans la passoire 2 minutes (les pommes de terre mouillées repoussent le beurre).",
        "Remettez dans la casserole chaude avec le beurre et les herbes ; mélangez jusqu'à ce qu'elles brillent.",
        "Assaisonnez de sel en flocons et de poivre. Goûtez-en une. Voilà une pomme de terre bien cuite."
      ]
    },
    quiz: [
      { q: "À quel point l'eau de cuisson des pâtes/pommes de terre doit-elle être salée ?", options: ["Juste une pincée", "Nettement salée, comme la mer", "Sans sel — on assaisonne après"] },
      { q: "Les pommes de terre doivent commencer à cuire dans…", options: ["De l'eau froide, portée au frémissement", "De l'eau qui bout à gros bouillons", "De l'eau tiède du robinet"] },
      { q: "À quoi ressemble un frémissement ?", options: ["De grosses bulles violentes sur toute la surface", "De petites bulles crevant la surface doucement et régulièrement", "De l'eau totalement immobile avec de la vapeur"] }
    ]
  },

  "l2-2": {
    title: "Œufs I : Durs et Brouillés",
    intro: "Les œufs sont l'épreuve classique du cuisinier car ils punissent l'inattention : trente secondes de trop et le crémeux devient caoutchouteux. Maîtrisez ici le feu doux et vous aurez appris un principe qui s'applique au poisson, aux crèmes et aux sauces.\n\nLe secret de bons œufs brouillés est d'une simplicité gênante : un feu plus doux que vous ne le pensez, et retirez-les avant qu'ils n'aient l'air complètement cuits.",
    technique: {
      heading: "Feu doux, grande récompense",
      steps: [
        "Œufs durs : descendez les œufs à la cuillère dans l'eau déjà bouillante, puis minutez précisément — 7 minutes pour un jaune coulant, 10–11 pour bien dur.",
        "Écalez les œufs durs en commençant par le gros bout (il y a une poche d'air) sous un filet d'eau.",
        "Brouillés : battez bien les œufs avec une pincée de sel jusqu'à homogénéité — sans traînées de blanc.",
        "Utilisez une poêle antiadhésive à feu DOUX avec du beurre. Versez les œufs et remuez lentement et sans cesse à la spatule, en raclant le fond.",
        "Retirez la poêle du feu tant que les œufs semblent encore un peu humides et brillants — la chaleur résiduelle les finit en route vers l'assiette."
      ],
      tips: [
        "Directement dans l'eau glacée après : la cuisson s'arrête et l'écalage devient bien plus facile.",
        null, null, null,
        "Les œufs caoutchouteux ont cuit 'jusqu'à être faits' SUR le feu. Les crémeux se finissent hors du feu."
      ]
    },
    recipe: {
      name: "Œufs Brouillés Crémeux sur Toast",
      description: "Le plat technique que tout brunch facture 14 €. Doux, lent, et retiré du feu tôt.",
      time: "10 min",
      units: ["", "c. à s.", "pincée", "tranche", ""],
      ingredients: ["œufs", "beurre", "sel, plus pour finir", "bon pain, grillé", "poivre noir et ciboulette, pour finir"],
      steps: [
        "Battez les œufs avec une pincée de sel jusqu'à parfaite homogénéité.",
        "Commencez le toast — les œufs seront plus rapides que vous ne le pensez.",
        "Faites fondre le beurre dans une poêle antiadhésive à feu DOUX jusqu'à ce qu'il mousse doucement.",
        "Ajoutez les œufs. Remuez lentement et sans cesse, en raclant le fond, 2–4 minutes tandis que de tendres caillés se forment.",
        "Quand ils sont presque pris mais brillants et un peu humides, versez aussitôt sur le toast.",
        "Finissez de sel, poivre et ciboulette. Remarquez : aucune coloration, aucun caoutchouc."
      ]
    },
    quiz: [
      { q: "Combien de temps pour un jaune coulant (peu pris) en œuf dur ?", options: ["3 minutes", "7 minutes", "12 minutes"] },
      { q: "Quand les œufs brouillés doivent-ils quitter le feu ?", options: ["Quand ils sont fermes et secs", "Tant qu'ils sont encore un peu humides et brillants — la chaleur résiduelle les finit", "Quand ils commencent à dorer"] },
      { q: "Quel niveau de feu donne les œufs brouillés les plus crémeux ?", options: ["Vif", "Moyen-vif", "Doux"] }
    ]
  },

  "l2-3": {
    title: "Œufs II : L'Œuf au Plat Parfait",
    intro: "Un œuf au plat est une leçon de deux minutes sur la maîtrise du feu : assez chaud pour figer vite le blanc, assez doux pour garder le jaune liquide. Apprenez les styles — sur le plat, retourné baveux, et à bords croustillants — et vous aurez un rehausseur instantané pour riz, toasts, nouilles et burgers.",
    technique: {
      heading: "Trois styles d'œuf au plat",
      steps: [
        "Sur le plat : beurre dans une poêle antiadhésive à feu moyen-doux. Cassez l'œuf dedans, cuisez doucement jusqu'à ce que le blanc soit pris mais le jaune intact, 2–3 minutes.",
        "Retourné baveux : cuisez comme ci-dessus, puis glissez une spatule fine entièrement dessous et retournez avec assurance. 20–30 secondes sur la seconde face, puis sortez.",
        "Bords croustillants : feu moyen-vif avec un bon filet d'huile d'olive. Le blanc bouillonne, ondule et dore aux bords tandis que le jaune reste coulant — 2 minutes, sans retourner.",
        "Cassez les œufs sur une surface plate, pas sur le bord de la poêle — moins d'éclats de coquille, cassure plus nette.",
        "Salez l'œuf dans la poêle, pas après dressage — l'assaisonnement est plus uniforme."
      ],
      tips: [
        "Couvrez la poêle les 30 dernières secondes pour cuire à la vapeur le film de blanc sur le jaune sans retourner.",
        null, null, null, null
      ]
    },
    recipe: {
      name: "Toast Œuf au Plat et Avocat",
      description: "Choisissez votre style d'œuf au plat et mettez-le au travail sur le petit-déj préféré d'internet.",
      time: "10 min",
      units: ["tranche", "", "", "c. à c.", "", ""],
      ingredients: ["pain robuste (le levain est parfait)", "avocat mûr", "œuf", "beurre ou huile d'olive", "sel, poivre et flocons de piment, au goût", "citron (un petit filet)"],
      steps: [
        "Grillez bien le pain — il lui faut de la tenue sous les garnitures.",
        "Écrasez l'avocat à la fourchette avec un filet de citron et une pincée de sel. Tartinez sur le toast.",
        "Faites frire l'œuf dans le style choisi : sur le plat, retourné baveux ou à bords croustillants.",
        "Glissez l'œuf sur l'avocat. Assaisonnez de sel, poivre et flocons de piment.",
        "Mangez aussitôt, idéalement là où tout le monde peut voir le jaune se rompre au ralenti."
      ]
    },
    quiz: [
      { q: "Pour des œufs au plat à bords croustillants, il vous faut…", options: ["Feu doux et beurre", "Feu moyen-vif et une bonne dose d'huile d'olive", "Une poêle sèche sans huile"] },
      { q: "Pourquoi casser les œufs sur une surface plate plutôt que sur le bord de la poêle ?", options: ["C'est plus poli", "La coquille se casse plus net avec moins d'éclats dans la nourriture", "Ça garde la poêle chaude"] },
      { q: "Comment figer le blanc au-dessus d'un œuf sur le plat sans le retourner ?", options: ["Couvrir la poêle un instant pour la vapeur", "Mettre le feu au maximum", "L'asperger d'eau froide et remuer"] }
    ]
  },

  "l2-4": {
    title: "Un Riz Parfait à Chaque Fois",
    intro: "Le riz a gâché plus de dîners que tout autre accompagnement, et tout se corrige avec trois habitudes : rincer le riz, respecter la proportion, et le laisser reposer à la fin.\n\nRincer élimine l'amidon de surface (le coupable du riz collant). La proportion pour un riz blanc à grain long est 1 tasse de riz pour 1½ d'eau — moins que ce que dit le paquet. Et le repos de 10 minutes à couvert à la fin n'est pas facultatif ; c'est là que l'humidité s'égalise.",
    technique: {
      heading: "La méthode par absorption",
      steps: [
        "Rincez le riz dans une passoire à l'eau froide, en remuant avec les doigts, jusqu'à ce que l'eau sorte presque claire (30–60 secondes).",
        "Réunissez 1 tasse de riz, 1½ tasse d'eau et ½ c. à c. de sel dans une casserole à couvercle hermétique.",
        "Portez à ébullition à découvert, puis couvrez aussitôt, baissez au minimum et minutez 15 minutes. Ne regardez pas — la vapeur cuit.",
        "Hors du feu, laissez à couvert 10 minutes de plus. Ce repos est obligatoire.",
        "Aérez délicatement à la fourchette, en soulevant et séparant plutôt qu'en remuant (remuer l'écrase)."
      ],
      tips: [
        null,
        "Cette proportion est pour un riz blanc à grain long comme le jasmin ou le basmati. Le riz complet veut environ 2 tasses d'eau et bien plus de cuisson.",
        null, null, null
      ]
    },
    recipe: {
      name: "Riz Vapeur Moelleux",
      description: "Juste du riz — bien fait. Cuisez-le avec n'importe quoi, ou mangez un bol avec beurre et sauce soja sans aucun regret.",
      time: "30 min",
      units: ["tasses", "tasses", "c. à c.", "c. à s."],
      ingredients: ["riz blanc à grain long (jasmin ou basmati)", "eau", "sel", "beurre (facultatif)"],
      steps: [
        "Rincez le riz dans une passoire jusqu'à ce que l'eau sorte presque claire.",
        "Réunissez le riz, l'eau et le sel dans une casserole. Portez à ébullition.",
        "Dès l'ébullition, couvrez d'un couvercle hermétique et baissez au minimum. 15 minutes — sans regarder.",
        "Retirez du feu et laissez reposer, toujours couvert, 10 minutes.",
        "Aérez à la fourchette, incorporez le beurre si utilisé et servez. Comptez les grains collés : ce doit être presque zéro."
      ]
    },
    quiz: [
      { q: "Pourquoi rincer le riz avant cuisson ?", options: ["Pour éliminer l'amidon de surface qui le rend collant", "Pour ajouter de l'humidité et cuire plus vite", "Pour laver le sel"] },
      { q: "Quelle est la proportion d'eau pour un riz blanc à grain long ?", options: ["1 tasse de riz : 1½ d'eau", "1 tasse de riz : 3 d'eau", "À parts égales riz et eau"] },
      { q: "Après le temps de cuisson, vous devriez…", options: ["Servir aussitôt bien chaud", "Remuer vigoureusement pour libérer la vapeur", "Le laisser reposer à couvert, hors du feu, 10 minutes"] }
    ]
  },

  "l2-5": {
    title: "Les Fondamentaux des Pâtes",
    intro: "Les cuisiniers italiens font de la magie en semaine avec trois règles : salez l'eau comme la mer, cuisez al dente (tendre avec une légère résistance) et ne jetez jamais — jamais — cette eau de cuisson amidonnée avant que le plat ne soit fini.\n\nL'eau des pâtes est de l'or liquide : l'amidon dissous fait adhérer la sauce aux nouilles et transforme huile et eau en un enrobage soyeux et uni.",
    technique: {
      heading: "Cuire les pâtes comme si ça comptait",
      steps: [
        "Utilisez une grande casserole avec beaucoup d'eau à grosse ébullition. Salez généreusement — 1 à 2 cuillères à soupe. C'est le seul assaisonnement des pâtes.",
        "Remuez la première minute pour éviter que ça colle. Pas d'huile dans l'eau — elle enrobe juste les nouilles et repousse la sauce ensuite.",
        "Cuisez 1–2 minutes de MOINS que le paquet, en goûtant vers la fin. Al dente = tendre avec une légère résistance au cœur.",
        "Avant d'égoutter, prélevez une tasse de l'eau de cuisson trouble.",
        "Finissez les pâtes DANS la sauce sur le feu, en ajoutant des filets d'eau de cuisson et en remuant jusqu'à ce que ça brille et adhère. C'est l'étape que font les restaurants et que la plupart sautent."
      ],
      tips: [
        null, null,
        "Les pâtes finissent de cuire dans la sauce, où elles boivent de la saveur plutôt que de l'eau.",
        null, null
      ]
    },
    recipe: {
      name: "Spaghetti Aglio e Olio",
      description: "Ail, huile, piment, eau de pâtes — le classique romain minimaliste, tout en technique. Cinq ingrédients, aucun endroit où se cacher.",
      time: "20 min",
      units: ["g", "gousses", "tasse", "c. à c.", "tasse", "c. à s.", ""],
      ingredients: ["spaghetti", "ail, finement tranché", "huile d'olive", "flocons de piment rouge", "persil frais, haché", "sel (pour l'eau des pâtes)", "parmesan râpé, pour servir (facultatif)"],
      steps: [
        "Faites bouillir une grande casserole d'eau ; salez comme la mer. Cuisez les spaghetti 1–2 min de moins que le paquet.",
        "Pendant ce temps, chauffez l'huile et l'ail tranché dans une grande poêle froide à feu moyen-doux, en le laissant devenir doré pâle lentement — pas brun. Ajoutez les flocons de piment à la fin.",
        "Prélevez une tasse d'eau de cuisson, puis égouttez les pâtes.",
        "Ajoutez les pâtes à la poêle avec un bon filet d'eau de cuisson. Remuez vigoureusement à feu moyen jusqu'à ce que la sauce brille et enrobe chaque brin.",
        "Hors du feu, incorporez le persil. Goûtez — il faudra peut-être une pincée de sel de plus.",
        "Servez aussitôt, avec du parmesan si vous voulez. Rien que de la technique, aucun raccourci — et ça se goûte."
      ]
    },
    quiz: [
      { q: "Que signifie 'al dente' ?", options: ["Complètement tendre jusqu'au cœur", "Tendre mais avec une légère résistance au cœur", "Un peu croquant et pas assez cuit"] },
      { q: "Pourquoi garder une tasse d'eau de cuisson des pâtes ?", options: ["Son amidon aide la sauce à émulsionner et à adhérer aux pâtes", "Pour rincer les nouilles avant de servir", "Pour refroidir la sauce"] },
      { q: "Où les pâtes doivent-elles finir de cuire ?", options: ["Dans l'eau bouillante, entièrement", "Dans la sauce, sur le feu", "Dans l'assiette, en reposant"] }
    ]
  },

  "l2-6": {
    title: "Faire Sauter et Poêler",
    intro: "Les compétences de poêle. Faire sauter (cuisson rapide dans un peu de gras à feu vif) et poêler (un peu plus de gras, un peu plus de patience) sont la façon d'obtenir des aliments dorés et profonds en goût plutôt que pâles et comme vapeur.\n\nDorer, C'EST la saveur — c'est une réaction chimique (la réaction de Maillard) qui crée des centaines de nouveaux composés savoureux. Votre travail : créer les conditions — poêle chaude, aliments secs, et de l'espace pour respirer.",
    technique: {
      heading: "Obtenir le doré",
      steps: [
        "Chauffez d'abord la poêle vide, puis ajoutez l'huile. Elle est prête quand l'huile brille et coule comme de l'eau.",
        "Séchez les aliments au papier avant qu'ils touchent la poêle. L'humidité de surface doit s'évaporer avant que le doré commence.",
        "Ne surchargez pas la poêle — laissez de l'espace entre les morceaux. Surcharger emprisonne la vapeur et donne du gris, pas du doré. Cuisez en plusieurs fois si besoin.",
        "Ensuite : laissez tranquille. L'aliment se détache seul de la poêle quand il est doré. S'il colle, il n'est pas prêt à être retourné.",
        "Les sucs bruns collés dans la poêle ensuite (le 'fond') sont une saveur concentrée — un filet d'eau, de bouillon ou de vin les dissout en sauce instantanée (déglacer)."
      ],
      tips: [
        "Un aliment mis dans une poêle froide s'installe et colle. Dans une poêle bien chaude, il grésille aussitôt — ce son est votre confirmation.",
        null, null, null, null
      ]
    },
    recipe: {
      name: "Champignons Dorés à l'Ail et au Beurre",
      description: "Les champignons sont le tuto ultime du doré — pleins d'eau, ils vous disent aussitôt si la poêle était assez chaude et pas surchargée.",
      time: "20 min",
      units: ["g", "c. à s.", "c. à s.", "gousses", "c. à c.", "c. à c.", ""],
      ingredients: ["champignons de Paris, en quartiers", "huile d'olive", "beurre", "ail, haché", "feuilles de thym frais (ou ½ c. à c. séché)", "sel", "poivre noir et un filet de citron"],
      steps: [
        "Chauffez une grande poêle à feu moyen-vif jusqu'à ce qu'elle soit bien chaude ; ajoutez l'huile et laissez-la briller.",
        "Ajoutez les champignons en une seule couche avec de l'espace (deux fois si besoin). Ne salez PAS encore — le sel tire l'eau et bloque le doré.",
        "Laissez tranquille 3–4 minutes jusqu'à ce qu'ils soient bien dorés dessous, puis remuez et dorez les autres faces.",
        "Baissez à feu moyen. Ajoutez beurre, ail et thym ; remuez 1 minute jusqu'à ce que ça embaume.",
        "MAINTENANT salez et poivrez, finissez d'un filet de citron et servez — sur toast, sur riz, ou directement de la poêle."
      ]
    },
    quiz: [
      { q: "Comment savoir que l'huile est assez chaude pour commencer ?", options: ["Elle fume beaucoup", "Elle brille et coule fine comme de l'eau", "Elle est sur le feu depuis exactement une minute"] },
      { q: "Que se passe-t-il si vous surchargez la poêle ?", options: ["Les aliments cuisent à la vapeur dans leur propre humidité au lieu de dorer", "Les aliments cuisent plus vite", "Rien — plus d'aliments, plus efficace"] },
      { q: "Les sucs bruns collés à la poêle (le fond) sont…", options: ["Un résidu brûlé qui rendra la nourriture amère", "Une saveur concentrée que vous pouvez dissoudre en sauce", "Le signe que le feu était trop fort"] }
    ]
  },

  "l2-7": {
    title: "Les Bases du Rôtissage",
    intro: "Rôtir est la méthode du génie paresseux : la chaleur sèche et forte du four dore à votre place pendant que vous faites autre chose. Elle transforme les légumes — bords caramélisés, intérieur sucré — avec environ quatre minutes d'effort réel.\n\nLa formule pour les légumes : 220 °C, assez d'huile pour enrober, du sel, de l'espace sur la plaque, et de la patience.",
    technique: {
      heading: "La formule du rôtissage",
      steps: [
        "Préchauffez bien — 220 °C pour la plupart des légumes. Un four froid au départ donne des résultats mous.",
        "Coupez tout à la même taille (vos techniques de couteau du niveau 1 servent ici) pour que tout finisse ensemble.",
        "Mélangez avec assez d'huile pour enrober légèrement chaque surface, plus du sel. Trop peu d'huile et les légumes sèchent au lieu de croustiller.",
        "Étalez en une seule couche avec de l'espace entre les morceaux — la même règle anti-surcharge que la poêle. Utilisez deux plaques plutôt que d'empiler.",
        "Ne tripotez pas. Retournez une fois aux deux tiers. C'est prêt quand les bords sont dorés et qu'un couteau entre facilement."
      ],
      tips: [
        null, null, null,
        "Placez les faces coupées contre la plaque chaude : cette face de contact devient la plus dorée.",
        null
      ]
    },
    recipe: {
      name: "Pommes de Terre Rôties Croustillantes",
      description: "La méthode du meilleur des deux mondes : une courte précuisson, une secousse énergique, puis un four chaud. Croûte qui craque, cœur moelleux.",
      time: "55 min",
      units: ["kg", "c. à s.", "c. à s.", "c. à c.", ""],
      ingredients: ["pommes de terre, en morceaux de 4 cm", "sel (pour l'eau)", "huile d'olive", "ail en poudre (facultatif)", "sel en flocons, poivre et romarin haché, pour finir"],
      steps: [
        "Préchauffez le four à 220 °C. Faites frémir les morceaux dans une eau bien salée 8 minutes — juste jusqu'à ce que les bords ramollissent.",
        "Égouttez, puis secouez énergiquement la passoire plusieurs fois pour râper les surfaces. Ces bords rugueux deviennent le croustillant.",
        "Mélangez avec l'huile d'olive et l'ail en poudre sur une plaque ; étalez en une seule couche, faces coupées en bas, avec de l'espace.",
        "Rôtissez 25 minutes sans toucher, retournez, puis rôtissez 15–20 min de plus jusqu'à un doré profond.",
        "Finissez de sel en flocons, poivre et romarin. Servez chaud — écoutez le croustillant."
      ]
    },
    quiz: [
      { q: "Une bonne température de four polyvalente pour rôtir les légumes ?", options: ["150 °C", "220 °C", "260 °C"] },
      { q: "Pourquoi couper les légumes à une taille uniforme avant de rôtir ?", options: ["Pour qu'ils finissent de cuire en même temps", "Pour qu'ils tiennent plus proprement sur la plaque", "Les petits morceaux ont meilleur goût"] },
      { q: "Pourquoi secouer les pommes de terre précuites dans la passoire ?", options: ["Pour les égoutter plus vite", "Pour râper leurs surfaces, qui croustillent au four", "Pour retirer le sel"] }
    ]
  },

  "l2-8": {
    title: "Assaisonner et Goûter",
    intro: "La plus grande différence entre un plat correct et un plat 'c'est toi qui as fait ça ?' n'est généralement pas la technique — c'est l'assaisonnement. Deux habitudes font l'essentiel : assaisonner par couches en cuisinant (pas un unique coup désespéré à la fin), et goûter sans cesse.\n\nEt quand un plat est fade mais assez salé ? Il lui faut sans doute de l'ACIDE — un filet de citron ou de vinaigre réveille les saveurs comme on allume une lumière.",
    technique: {
      heading: "Construire la saveur exprès",
      steps: [
        "Assaisonnez par couches : un peu de sel quand l'oignon entre, quand la tomate entre, quand le liquide entre — pas une grosse correction à la fin. Chaque couche assaisonne cet ingrédient de l'intérieur.",
        "Goûtez à chaque étape. Votre cuillère est votre instrument le plus important. Demandez : besoin de sel ? d'acide ? de sucré ? de piquant ?",
        "Le sel intensifie la saveur ; l'acide (citron, vinaigre) l'égaye ; une pincée de sucre arrondit l'amertume ou des tomates rêches ; le gras porte la saveur et adoucit les angles.",
        "Si c'est fade : ajoutez de l'acide avant plus de sel. Fade-mais-salé est la signature classique du manque d'acide.",
        "Sous-salez au début, ajustez à la hausse — on peut toujours ajouter. Trop salé ? Diluez avec un liquide non salé, ajoutez un féculent, ou équilibrez avec acide et gras."
      ],
      tips: [
        null,
        "Gardez une pile de cuillères près des fourneaux. Goûter cinq fois par plat est normal, pas maniaque.",
        null, null, null
      ]
    },
    recipe: {
      name: "Sauce Tomate Simple",
      description: "Une sauce à cinq ingrédients que vous goûterez et ajusterez au moins quatre fois. Cette recette vous fait assaisonner exprès.",
      time: "35 min",
      units: ["c. à s.", "gousses", "boîte (800 g)", "c. à c.", "c. à c.", "feuilles", "c. à c."],
      ingredients: ["huile d'olive", "ail, finement tranché", "tomates concassées", "sel, par couches", "sucre (si besoin)", "basilic frais, déchiré (ou ½ c. à c. d'origan séché)", "vinaigre de vin rouge ou jus de citron (si besoin)"],
      steps: [
        "Chauffez l'huile et l'ail ensemble à feu moyen-doux jusqu'à doré pâle et parfumé. GOÛT n°1 : sentez — c'est votre base de saveur.",
        "Ajoutez les tomates et une première couche de sel. Laissez frémir, à demi couvert, 20 minutes.",
        "GOÛT n°2 : trop acide ou amer ? Ajoutez le sucre. Remuez, attendez une minute.",
        "GOÛT n°3 : saveurs présentes mais fades ? Ajoutez le vinaigre ou le citron. Voyez comme ça égaye.",
        "GOÛT n°4 : maintenant — et seulement maintenant — ajustez le sel final. Incorporez le basilic hors du feu.",
        "Servez sur des pâtes (finissez-les dans la sauce, façon leçon 5 !). Vous venez d'assaisonner comme un pro."
      ]
    },
    quiz: [
      { q: "Quand faut-il assaisonner un plat ?", options: ["Une fois, tout à la fin", "Par couches pendant toute la cuisson, en goûtant", "Seulement à table"] },
      { q: "Le plat est assez salé mais fade et terne. Que lui faut-il le plus probablement ?", options: ["Plus de sel", "De l'acide, comme du jus de citron ou du vinaigre", "Plus de temps de cuisson"] },
      { q: "Que fait une pincée de sucre dans une sauce tomate ?", options: ["Elle lui donne un goût de dessert", "Elle épaissit la sauce", "Elle arrondit l'âpreté et l'amertume"] }
    ]
  },

  "l2-9": {
    title: "Épreuve Finale des Fondations : Riz Sauté",
    intro: "L'heure de cumuler vos compétences. Le riz sauté utilise presque tout ce niveau à la fois : du riz bien cuit (de la veille, c'est mieux), des œufs brouillés, une cuisson à la poêle chaude, l'assaisonnement par couches et goûter pour finir.\n\nC'est aussi le plat d'impro ultime pour vider le frigo — un avant-goût de là où tout ce cours se dirige.",
    technique: {
      heading: "Pourquoi ce plat est l'épreuve",
      steps: [
        "Riz (leçon 4) : le riz sauté exige du riz froid, de la veille. Le riz frais est trop humide et s'agglomère ; une nuit au frigo sèche et raffermit les grains.",
        "Œufs (leçon 2) : brouillez-les d'abord et réservez — ils surcuiraient s'ils restaient tout le temps dans la poêle.",
        "Feu de poêle (leçon 6) : la poêle doit être vraiment chaude, et ne la surchargez pas. Un riz sauté surchargé cuit à la vapeur et devient bouillie.",
        "Assaisonnement (leçon 8) : la sauce soja va sur le bord de la poêle pour grésiller et griller avant de se mélanger. Goûtez avant de servir ; ajustez.",
        "Mise en place (niveau 1) : une fois la poêle chaude, ce plat prend 6 minutes. TOUT doit être prêt et à portée avant de commencer."
      ],
      tips: [
        "Pas de riz de la veille ? Cuisez-en une portion et étalez-la sur une plaque au frigo 30 minutes.",
        null, null, null, null
      ]
    },
    recipe: {
      name: "Riz Sauté à Tout",
      description: "Votre plat de fin de niveau 2. Chaque compétence de ce niveau dans une poêle grésillante.",
      time: "20 min (avec riz cuit)",
      units: ["tasses", "", "c. à s.", "gousses", "", "tasse", "c. à s.", "c. à c.", ""],
      ingredients: ["riz cuit froid (idéalement de la veille)", "œufs, battus", "huile neutre, répartie", "ail, haché", "oignons verts, émincés (blancs et verts séparés)", "petits pois et carottes surgelés", "sauce soja", "huile de sésame grillé", "poivre blanc ou noir, au goût"],
      steps: [
        "Faites la mise en place de tout — une fois lancé, on ne s'arrête pas.",
        "Chauffez 1 c. à s. d'huile dans une grande poêle ou un wok à feu moyen-vif. Brouillez les œufs et réservez.",
        "Ajoutez le reste d'huile. Faites sauter l'ail et les blancs d'oignon vert 30 secondes, puis les petits pois et carottes 1 minute.",
        "Ajoutez le riz, en défaisant les mottes à la spatule. Étalez-le et laissez 60 secondes sans toucher pour qu'il grille, puis remuez. Répétez deux fois.",
        "Versez la sauce soja sur le bord chaud de la poêle, puis mélangez. Remettez les œufs, ajoutez l'huile de sésame et le poivre.",
        "GOÛTEZ. Plus de soja ? De poivre ? Ajustez, couronnez des verts d'oignon et servez-vous une assiette de tout ce que vous avez appris."
      ]
    },
    quiz: [
      { q: "Pourquoi le riz de la veille est-il meilleur pour le riz sauté ?", options: ["Il est plus sec et ferme, donc il saute au lieu de s'agglomérer", "Il a plus de goût après repos", "Il absorbe plus d'huile"] },
      { q: "Pourquoi brouiller les œufs d'abord et les réserver ?", options: ["Ils surcuiraient en restant tout le temps dans la poêle", "Les œufs doivent toujours cuire dans une poêle à part", "Pour que le riz ne jaunisse pas"] },
      { q: "Pourquoi ajoute-t-on la sauce soja sur le bord chaud de la poêle ?", options: ["Pour nettoyer le bord en cuisant", "Elle grésille et grille, ajoutant une saveur plus profonde avant de se mélanger", "Pour refroidir un peu la poêle"] }
    ]
  }
};
