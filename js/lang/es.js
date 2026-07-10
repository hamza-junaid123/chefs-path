/* Chef's Path — Spanish lesson-content translations.
   Registers into window.CONTENT_I18N.es. Any missing field falls back to
   English automatically (see localizedLesson in app.js). */
window.CONTENT_I18N = window.CONTENT_I18N || {};
CONTENT_I18N.es = {
  levels: {
    1: { title: "Fundamentos de Cocina", subtitle: "Manejo del cuchillo, seguridad, leer recetas, medir, utensilios esenciales" },
    2: { title: "Bases", subtitle: "Hervir, freír, asar, sazonar, huevos, arroz, pasta" },
    3: { title: "Cocinero Cotidiano", subtitle: "Comidas simples completas, platos de una olla, ensaladas, salsas básicas" },
    4: { title: "Cocinero Seguro", subtitle: "Punto de carne y pescado, caldos, pan básico, equilibrio de sabores" },
    5: { title: "Avanzado", subtitle: "Emulsiones, estofados, repostería de precisión, emplatado" },
    6: { title: "Maestro", subtitle: "Planear varios platos, cronometrar un menú, improvisar" }
  },

  "l1-1": {
    title: "Conoce tu Cocina: Utensilios Esenciales",
    intro: "No necesitas un cajón lleno de aparatos para cocinar bien — necesitas unas diez herramientas que cumplen su trabajo cada día. Las cocinas profesionales funcionan con una lista sorprendentemente corta, y la tuya también puede.\n\nLos tres grandes son un cuchillo de chef (20 cm es el punto ideal), una tabla de cortar grande y una sartén pesada. Añade una cacerola, una bandeja de horno, tazas y cucharas medidoras, un par de boles, unas pinzas, una espátula flexible y un termómetro instantáneo, y podrás cocinar el 95% de las recetas caseras.",
    technique: {
      heading: "Prepara tu estación",
      steps: [
        "Reúne tus herramientas básicas: cuchillo de chef, tabla de cortar, sartén de 25–30 cm, cacerola de 2–3 litros, bandeja de horno, tazas/cucharas medidoras, dos boles, pinzas y una espátula.",
        "Coloca la tabla de cortar sobre un paño de papel húmedo o un trapo fino para que no resbale mientras cortas.",
        "Ten un 'bol de basura' en la encimera para los restos y así no caminar al cubo a mitad de la preparación.",
        "Comprueba que el cuchillo esté afilado: debe cortar limpiamente una hoja de papel. Un cuchillo desafilado resbala y es más peligroso que uno afilado.",
        "Organiza las herramientas para que tu mano dominante alcance el cuchillo y la otra alcance los ingredientes — esto se vuelve memoria muscular rápido."
      ],
      tips: [
        "Un buen cuchillo de chef de 20 cm supera a un juego de 12 cuchillos. Gasta tu dinero ahí primero.",
        "Una tabla que resbala es la causa número 1 de accidentes de principiantes.",
        null,
        "Muchas ferreterías y supermercados afilan cuchillos barato si no tienes afilador.",
        null
      ]
    },
    recipe: {
      name: "Tostada de Canela y Azúcar",
      description: "La primera receta clásica: usa cucharas medidoras, un cuchillo y tu atención — las tres herramientas que usarás para siempre.",
      time: "10 min",
      units: ["rebanadas", "cda", "cda", "cdta", ""],
      ingredients: ["pan de molde", "mantequilla, ablandada", "azúcar granulada", "canela molida", "una pizca de sal"],
      steps: [
        "Mezcla el azúcar, la canela y una pizca de sal en un bol pequeño.",
        "Tuesta el pan hasta que esté dorado.",
        "Mientras está caliente, unta cada rebanada de borde a borde con mantequilla ablandada usando un cuchillo de untar.",
        "Espolvorea el azúcar con canela de manera uniforme sobre el lado con mantequilla — el calor lo derrite en un glaseado.",
        "Corta en diagonal con tu cuchillo de chef (¡practica ese agarre!) y come caliente."
      ]
    },
    quiz: [
      { q: "¿Qué cuchillo debería comprar primero un principiante?", options: ["Un juego de 12 cuchillos", "Un buen cuchillo de chef de 20 cm", "Un cuchillo mondador y un cuchillo de carnicero"] },
      { q: "¿Por qué poner un paño húmedo bajo la tabla de cortar?", options: ["Para mantener limpia la tabla", "Para que la tabla no resbale mientras cortas", "Para curar la madera"] },
      { q: "¿Qué es más peligroso en la cocina?", options: ["Un cuchillo afilado", "Un cuchillo desafilado", "Son igual de peligrosos"] }
    ]
  },

  "l1-2": {
    title: "Seguridad e Higiene en la Cocina",
    intro: "Casi todo accidente de cocina y caso de intoxicación es evitable con un puñado de hábitos. Apréndelos una vez y hazlos automáticamente para siempre.\n\nLas dos grandes ideas: mantén separados los alimentos crudos y los listos para comer (contaminación cruzada), y mantén la comida fuera de la 'zona de peligro' — entre 4 y 60 °C — donde las bacterias se multiplican más rápido.",
    technique: {
      heading: "Los hábitos de seguridad que importan",
      steps: [
        "Lávate las manos con jabón durante 20 segundos antes de cocinar, y de nuevo cada vez que toques carne, pescado o huevos crudos.",
        "Usa tablas de cortar separadas (o lávalas bien con agua caliente y jabón) para la carne cruda y todo lo demás.",
        "Nunca dejes alimentos perecederos a temperatura ambiente más de 2 horas. Refrigera las sobras pronto.",
        "Si se prende fuego el aceite de una sartén: apaga el fuego y tapa la sartén con una tapa. NUNCA le eches agua — el agua hace que el aceite ardiendo explote hacia afuera.",
        "Lleva los cuchillos con la punta hacia abajo a tu lado, nunca los laves 'a ciegas' en un fregadero con espuma, y di 'detrás de ti' si compartes la cocina."
      ],
      tips: [
        null,
        "Muchos cocineros reservan una tabla solo para carnes crudas — un color distinto lo hace infalible.",
        "La zona de peligro es 4–60 °C. Lo frío, frío; lo caliente, caliente.",
        null,
        null
      ]
    },
    recipe: {
      name: "Ensalada Arcoíris Crujiente con Aliño de Limón",
      description: "Una receta sin fuego que refuerza el hábito de seguridad más repetido: lavar y manipular bien los productos frescos.",
      time: "15 min",
      units: ["tazas", "", "taza", "", "taza", "cda", "cda", "cdta", ""],
      ingredients: ["lechuga romana o mixta picada", "zanahoria, rallada gruesa", "tomates cherry, por la mitad", "pepino, en rodajas", "maíz dulce (de lata, escurrido)", "aceite de oliva", "zumo de limón fresco", "sal", "pimienta negra, al gusto"],
      steps: [
        "Lávate las manos, luego lava todos los productos bajo agua fría corriente — incluso los que pelas.",
        "Seca bien las hojas (centrifugadora o paño limpio). El aliño resbala en las hojas mojadas.",
        "Pica las verduras en una tabla limpia con un cuchillo limpio.",
        "Bate el aceite de oliva, el zumo de limón, la sal y la pimienta en el fondo del bol de ensalada.",
        "Añade las verduras, mezcla para cubrir, prueba y ajusta la sal o el limón.",
        "Refrigera cualquier sobra en 2 horas — ya sabes por qué."
      ]
    },
    quiz: [
      { q: "¿Cuál es la 'zona de peligro' de temperatura donde las bacterias se multiplican más rápido?", options: ["Bajo cero (congelación)", "4–60 °C", "71–100 °C"] },
      { q: "Una sartén con aceite se incendia. ¿Qué haces?", options: ["Echarle agua rápido", "Llevar la sartén afuera", "Apagar el fuego y tapar la sartén con una tapa"] },
      { q: "Acabas de cortar pollo crudo en tu tabla. Ahora necesitas cortar tomates. ¿Qué haces?", options: ["Limpiar la tabla con papel seco y continuar", "Lavar la tabla y el cuchillo con agua caliente y jabón primero (o usar otra tabla)", "Cortar los tomates en el otro lado de la misma tabla"] }
    ]
  },

  "l1-3": {
    title: "Manejo del Cuchillo I: Agarre, Garra y Corte Mecedora",
    intro: "El buen manejo del cuchillo no se trata de velocidad — se trata de un agarre estable, una mano guía protegida y dejar que el filo haga el trabajo. La velocidad aparece sola tras unas semanas de práctica correcta.\n\nDos posiciones que aprender: el agarre de pinza (pulgar e índice pellizcando la hoja justo delante del mango) y la garra (las yemas de la otra mano dobladas hacia adentro, los nudillos guiando el lado plano de la hoja).",
    technique: {
      heading: "Los fundamentos",
      steps: [
        "Agarre de pinza: sujeta la hoja entre el pulgar y el lateral del índice, justo delante del mango. Envuelve el resto de los dedos alrededor del mango.",
        "La garra: dobla las yemas de tu mano guía hacia adentro, de modo que los nudillos miren a la hoja. El lado plano del cuchillo se apoya suavemente contra tus nudillos.",
        "Corte mecedora: mantén la punta del cuchillo sobre (o cerca de) la tabla y mece la hoja hacia abajo y ligeramente hacia adelante a través del alimento. No levantes todo el cuchillo para 'picar'.",
        "Corta primero los lados planos: parte por la mitad las cosas redondas (cebollas, tomates) para que se asienten planas antes de más cortes. Un ingrediente estable es un ingrediente seguro.",
        "Ve despacio. Busca trozos parejos, no trozos rápidos — los trozos parejos se cocinan de forma uniforme, y de eso trata todo el manejo del cuchillo."
      ],
      tips: [
        "Se siente raro un día y luego se siente como control. No pongas el índice sobre el lomo.",
        "Si las yemas están escondidas, la hoja no puede alcanzarlas físicamente.",
        null, null, null
      ]
    },
    recipe: {
      name: "Pico de Gallo",
      description: "Salsa fresca de tomate — un ejercicio de cuchillo: picar tomate, cebolla y cilantro, y exprimir lima. Sin cocinar, máximo picado.",
      time: "20 min",
      units: ["", "", "", "taza", "", "cdta"],
      ingredients: ["tomates maduros, en dados pequeños", "cebolla blanca, en dados finos", "jalapeño, sin semillas y picado (opcional)", "cilantro fresco, picado", "lima, exprimida", "sal"],
      steps: [
        "Parte los tomates por la mitad para que se asienten planos. Con el agarre de garra, corta en rodajas, luego tiras, luego dados pequeños.",
        "Parte la cebolla por la mitad por la raíz, pélala y pícala fina — mantén esas yemas dobladas.",
        "Si usas el jalapeño, pártelo por la mitad, retira las semillas con una cuchara y pícalo.",
        "Junta el cilantro apretado y corta con la mecedora varias veces.",
        "Combina todo en un bol con el zumo de lima y la sal. Remueve, prueba y ajusta.",
        "Deja reposar 10 minutos antes de servir — la sal une los jugos."
      ]
    },
    quiz: [
      { q: "En el agarre de pinza, ¿dónde van el pulgar y el índice?", options: ["Ambos envueltos por completo alrededor del mango", "Pellizcando la hoja justo delante del mango", "El índice sobre el lomo de la hoja"] },
      { q: "¿Qué protege tu mano guía al picar?", options: ["Doblar las yemas hacia adentro para que los nudillos guíen la hoja (la garra)", "Mantener los dedos planos y estirados lejos del cuchillo", "Usar un guante de horno"] },
      { q: "¿Por qué buscamos trozos de tamaño parejo?", options: ["Se ven más profesionales en redes sociales", "Los trozos parejos se cocinan al mismo ritmo", "Los trozos disparejos pesan menos"] }
    ]
  },

  "l1-4": {
    title: "Manejo del Cuchillo II: Dados, Picado y Rodajas",
    intro: "Las recetas hablan un idioma de tamaños: rodaja, dado, picado. 'Dado' suele significar cubos de ~1 cm, 'dado pequeño' ~0,5 cm, y 'picado' lo más fino posible — sobre todo para ajo, jengibre, chiles y hierbas.\n\nLa cebolla es el ingrediente de entrada: domina cortar en dados una cebolla y habrás dominado la lógica de casi todos los cortes.",
    technique: {
      heading: "Cortar una cebolla en dados (el método clásico)",
      steps: [
        "Corta la cebolla por la mitad a través de la raíz. Pela cada mitad, dejando intacta la raíz — mantiene unidas las capas.",
        "Pon una mitad con el lado plano hacia abajo. Haz cortes horizontales hacia (pero no a través de) la raíz, luego cortes verticales igual.",
        "Ahora corta perpendicular a tus cortes y caen dados perfectos del cuchillo. Desecha el trocito de raíz.",
        "Picar ajo: aplasta el diente con el lado plano del cuchillo (la piel salta), corta en rodajas, luego mece la hoja sobre el montón repetidamente, usando la mano libre plana sobre el lomo para estabilizarla.",
        "Si la cebolla te hace llorar: usa un cuchillo afilado (menos daño celular = menos vapor) y enfría la cebolla 15 minutos antes."
      ],
      tips: [
        null,
        "Para el día a día puedes saltarte los cortes horizontales — las propias capas de la cebolla hacen la mayor parte de ese trabajo.",
        null, null, null
      ]
    },
    recipe: {
      name: "Guacamole con Trozos",
      description: "Corta cebolla y tomate en dados, pica ajo y chile, corta y trocea aguacate — cada corte de esta lección en un bol.",
      time: "15 min",
      units: ["", "", "", "diente", "", "", "cdta", "cda"],
      ingredients: ["aguacates maduros", "cebolla blanca, en dados finos", "tomate pequeño, sin semillas y en dados", "ajo, picado", "jalapeño, picado (opcional)", "lima, exprimida", "sal", "cilantro, picado"],
      steps: [
        "Practica el corte en dados con el cuarto de cebolla; pica el ajo y el jalapeño.",
        "Parte los aguacates alrededor del hueso, gíralos para separarlos y saca la pulpa con una cuchara. Trocéala con cuidado en la tabla.",
        "Machaca la mitad del aguacate en un bol con el zumo de lima y la sal; incorpora el resto en trozos.",
        "Incorpora la cebolla, el tomate, el ajo, el jalapeño y el cilantro.",
        "Prueba. Casi siempre necesita un poco más de lima o sal — ajusta hasta que resalte."
      ]
    },
    quiz: [
      { q: "¿Por qué dejar la raíz intacta al cortar una cebolla en dados?", options: ["Añade sabor", "Mantiene unidas las capas mientras cortas", "Es la parte más dulce"] },
      { q: "¿Cuál es el corte más fino?", options: ["Dado", "Rodaja", "Picado"] },
      { q: "¿Una forma fácil de pelar un diente de ajo?", options: ["Remojarlo en agua caliente 10 minutos", "Aplastarlo suavemente con el lado plano del cuchillo", "Meterlo al microondas 30 segundos"] }
    ]
  },

  "l1-5": {
    title: "Cómo Leer una Receta",
    intro: "Una receta es un conjunto de instrucciones escritas en un código compacto. Una vez que conoces el código, nunca te sorprenderá a mitad de camino 'el pollo marinado' que debías empezar ayer.\n\nRegla número uno, siempre: lee la receta entera antes de tocar un solo ingrediente.",
    technique: {
      heading: "Descifrar la receta",
      steps: [
        "Lee la receta completa primero — dos veces. Anota el tiempo total, las temperaturas del horno y cualquier paso de 'reposar', 'enfriar' o 'marinar' que necesite tiempo previo.",
        "Las listas de ingredientes esconden instrucciones: '1 cebolla, en dados' significa córtala antes de empezar a cocinar. La coma es una tarea.",
        "Fíjate en la palabra 'dividido' — significa que ese ingrediente se usa en más de un lugar. No lo eches todo en la primera mención.",
        "Los ingredientes se listan en orden de uso. Si pierdes tu lugar, la lista es tu mapa.",
        "Trata los tiempos como guía y las descripciones como verdad: 'cocina hasta dorar, unos 5 minutos' significa que dorar es la meta, 5 minutos es una pista."
      ],
      tips: [
        null,
        "'1 taza de nueces, picadas' y '1 taza de nueces picadas' ¡son cantidades diferentes! Mide en el punto donde está la descripción.",
        null, null, null
      ]
    },
    recipe: {
      name: "Avena Nocturna",
      description: "Una receta con una trampa de tiempo oculta — necesita enfriarse toda la noche. Leer con antelación es toda la lección.",
      time: "5 min + toda la noche",
      units: ["taza", "taza", "taza", "cdta", "cdta", "", "cda"],
      ingredients: ["copos de avena (no instantánea)", "leche (de cualquier tipo)", "yogur natural", "miel o sirope de arce", "canela", "plátano, en rodajas, dividido", "mantequilla de cacahuete (opcional)"],
      steps: [
        "¿Lo captaste? Plátano 'dividido' y un enfriado nocturno. Planifica en consecuencia.",
        "En un tarro o recipiente, mezcla la avena, la leche, el yogur, la miel y la canela.",
        "Incorpora la mitad de las rodajas de plátano.",
        "Tapa y refrigera toda la noche (al menos 6 horas).",
        "Por la mañana, cubre con el resto del plátano y la mantequilla de cacahuete. Come frío, directo del tarro."
      ]
    },
    quiz: [
      { q: "¿Qué deberías hacer siempre antes de empezar a cocinar con una receta?", options: ["Precalentar el horno, sea cual sea la receta", "Leer la receta entera primero", "Duplicar toda la sal"] },
      { q: "En una lista de ingredientes, '1 cebolla, en dados' significa…", options: ["Comprar cebolla ya cortada", "Cortar la cebolla durante la cocción cuando se mencione", "Cortar la cebolla en dados antes de empezar"] },
      { q: "Un ingrediente marcado 'dividido' significa…", options: ["Se usa en más de un paso — no lo añadas todo de una vez", "Córtalo por la mitad", "Es opcional"] }
    ]
  },

  "l1-6": {
    title: "Medir Importa",
    intro: "En la cocina diaria puedes calcular mucho a ojo. En repostería y en aliños, salsas y arroz, mandan las proporciones — y medir bien es la diferencia entre tortitas esponjosas y discos tristes.\n\nLa distinción crucial: tazas medidoras para secos (llenar y enrasar) frente a jarras medidoras para líquidos (leer a la altura de los ojos). No son intercambiables si buscas precisión.",
    technique: {
      heading: "Medir correctamente",
      steps: [
        "Harina: airéala en el paquete, échala con cuchara en la taza para secos y enrasa con un borde recto. Nunca hundas la taza directamente en el paquete.",
        "Líquidos: usa una jarra medidora transparente sobre la encimera y lee la línea a la altura de los ojos, no desde arriba.",
        "El azúcar moreno es la excepción: compáctalo firmemente en la taza salvo que se indique lo contrario.",
        "Cucharaditas y cucharadas: 3 cdta = 1 cda. Enrásalas para repostería; colmadas está bien para sazonar una olla de chili.",
        "Una báscula de cocina supera a todas las tazas. Si una receta da gramos, úsalos — 120 g de harina son 120 g siempre."
      ],
      tips: [
        "Hundir la taza compacta la harina — puedes acabar con un 25% más de lo que pide la receta. Por eso 'mis tortitas salen densas'.",
        null, null, null,
        "Pon el bol en la báscula, pulsa 'tara' para ponerla a cero, añade el ingrediente, tara de nuevo, repite. Un bol, sin tazas que lavar."
      ]
    },
    recipe: {
      name: "Tortitas Esponjosas Clásicas",
      description: "Las tortitas son una prueba de medición con sirope encima. Echa la harina con cuchara y enrasa y saldrán ligeras siempre.",
      time: "25 min",
      units: ["taza", "cda", "cdta", "cdta", "taza", "", "cda", ""],
      ingredients: ["harina común (con cuchara y enrasada)", "azúcar", "levadura química", "sal", "leche", "huevo", "mantequilla, derretida (más para la sartén)", "sirope de arce, para servir"],
      steps: [
        "Bate la harina, el azúcar, la levadura y la sal en un bol grande.",
        "En una jarra, bate la leche, el huevo y la mantequilla derretida.",
        "Vierte lo húmedo sobre lo seco y remueve SOLO hasta integrar — los grumitos son buenos. Mezclar de más hace tortitas duras.",
        "Calienta una sartén a fuego medio, añade un poco de mantequilla y vierte charcos de masa de ¼ de taza.",
        "Voltea cuando se formen y revienten burbujas en la superficie y los bordes se vean cuajados (2–3 min). Cocina 1–2 min más.",
        "Sirve caliente con sirope. Si la primera sale mal, es tradición — la sartén no estaba lista. Ajusta y continúa."
      ]
    },
    quiz: [
      { q: "¿Cuál es la forma correcta de medir harina con una taza?", options: ["Hundir la taza directamente en el paquete", "Echar la harina con cuchara en la taza y enrasar", "Compactarla firme como el azúcar moreno"] },
      { q: "¿Cuántas cucharaditas hay en una cucharada?", options: ["2", "3", "4"] },
      { q: "¿La forma más precisa de medir ingredientes?", options: ["Una báscula de cocina, en gramos", "Tazas medidoras para secos", "Calcular a ojo con experiencia"] }
    ]
  },

  "l1-7": {
    title: "Mise en Place: Preparar Antes del Fuego",
    intro: "Mise en place ('mis an plas') es francés para 'todo en su sitio' — y es el único hábito que separa a los cocineros tranquilos de los que entran en pánico. Una vez que la sartén está caliente, todo va rápido; el ajo se quema en lo que tardas en encontrar el pimentón.\n\nLa regla: antes de cualquier fuego, todo está cortado, medido y al alcance de la mano.",
    technique: {
      heading: "Trabajar como cocinero de línea",
      steps: [
        "Lee la receta (¡Lección 5!) y saca primero cada ingrediente y herramienta.",
        "Haz todo el corte con antelación. Agrupa en el mismo bol los ingredientes que entran a la sartén al mismo tiempo.",
        "Mide especias y líquidos antes de encender el fuego. Un 'bol de pizcas' con especias premezcladas se echa limpiamente en el momento justo.",
        "Prepara tus zonas de aterrizaje: un plato para la comida cocida, un sitio para la cuchara, el bol de basura para los restos.",
        "Solo ahora enciende el fuego. Cocinar se vuelve montaje — vigilas la sartén en vez de correr detrás de ella."
      ],
      tips: [
        null,
        "No necesitas boles elegantes — tazas, boles de cereal y las esquinas de un plato sirven.",
        null, null, null
      ]
    },
    recipe: {
      name: "Ensalada Caprese",
      description: "Una receta de montaje donde la preparación ES el plato. Organiza tus ingredientes como un profesional y luego móntalo plato a plato.",
      time: "15 min",
      units: ["", "g", "taza", "cda", "cda", ""],
      ingredients: ["tomates grandes maduros", "mozzarella fresca", "hojas de albahaca fresca", "aceite de oliva virgen extra", "vinagre balsámico (o crema)", "sal en escamas y pimienta negra, al gusto"],
      steps: [
        "Mise en place: corta tomates y mozzarella en rodajas de ½ cm, saca las hojas de albahaca, dispón aceite, vinagre, sal, pimienta y los platos. Todo listo antes de montar.",
        "Superpón rodajas alternas de tomate y mozzarella en los platos, metiendo hojas de albahaca entre ellas.",
        "Rocía con aceite de oliva, luego con balsámico.",
        "Termina con sal en escamas y unas vueltas de pimienta.",
        "Sirve enseguida — nota lo fluido que se siente el montaje cuando todo estaba listo antes."
      ]
    },
    quiz: [
      { q: "¿Qué significa 'mise en place' en la práctica?", options: ["Limpiar la cocina después de cocinar", "Preparar y medir todo antes de empezar a cocinar", "Emplatar la comida de forma atractiva"] },
      { q: "¿Cuándo deberías hacer el corte con cuchillo?", options: ["Mientras la sartén se calienta", "Antes de encender cualquier fuego", "Cuando la receta mencione el ingrediente por primera vez"] },
      { q: "¿Por qué agrupar en un bol los ingredientes que se añaden al mismo tiempo?", options: ["Ahorra fregado", "Para poder añadirlos a la sartén juntos en un movimiento rápido", "Los sabores necesitan mezclarse antes"] }
    ]
  },

  "l1-8": {
    title: "Guardar Alimentos y Limpiar Sobre la Marcha",
    intro: "Cocinar no termina en el plato. Saber guardar los alimentos los mantiene seguros y reduce mucho el desperdicio — y limpiar sobre la marcha significa terminar la cena con una cocina limpia en vez de un desastre.\n\nMientras tanto, tu nevera tiene zonas: la puerta es el punto más cálido (¡condimentos, no leche!) y el estante inferior es el más frío (la carne cruda va ahí, para que los goteos no contaminen lo de abajo).",
    technique: {
      heading: "Hábitos de conservación y limpieza",
      steps: [
        "Zonas de la nevera: carne cruda en el estante inferior, lácteos y huevos en los estantes centrales (no en la puerta), condimentos en la puerta, la mayoría de verduras en el cajón.",
        "Enfría las sobras en 2 horas, guárdalas en recipientes herméticos poco profundos y cómelas en 3–4 días.",
        "No todo va a la nevera: tomates, cebollas, patatas, ajo y plátanos prefieren la encimera o una alacena oscura. (Mantén cebollas y patatas separadas — se estropean mutuamente más rápido.)",
        "Limpia sobre la marcha: limpia la tabla entre tareas, deja las herramientas usadas en agua caliente con jabón y usa los ratos de espera (agua hirviendo, cebollas pochándose) para fregar.",
        "Limpia las encimeras con agua caliente y jabón tras el contacto con carne cruda — siempre, sin excepciones."
      ],
      tips: [
        null,
        "Etiqueta los recipientes con la fecha usando cinta de carrocero. Tu yo futuro dejará de jugar a '¿esto sigue bueno?'.",
        null, null, null
      ]
    },
    recipe: {
      name: "Ensalada de Garbanzos Marinada (Estilo Meal-Prep)",
      description: "Una ensalada que MEJORA en la nevera — perfecta para practicar conservación segura, etiquetado y planificación.",
      time: "15 min + 1 h de frío",
      units: ["latas (425 g)", "", "taza", "", "taza", "cda", "cdta", "cdta", "taza"],
      ingredients: ["garbanzos, escurridos y enjuagados", "pepino, en dados", "tomates cherry, en cuartos", "cebolla morada, en dados finos", "aceite de oliva", "vinagre de vino tinto o zumo de limón", "orégano seco", "sal", "queso feta desmenuzado (opcional)"],
      steps: [
        "Bate el aceite, el vinagre, el orégano y la sal en un bol grande.",
        "Añade los garbanzos, el pepino, los tomates y la cebolla; mezcla bien.",
        "Pasa a un recipiente hermético, etiquétalo con la fecha de hoy y refrigera al menos 1 hora.",
        "Añade el feta justo antes de servir para que quede cremoso.",
        "Se conserva 3–4 días — prueba cómo se profundizan los sabores al segundo día. Limpia tu estación: ya conoces la rutina."
      ]
    },
    quiz: [
      { q: "¿Dónde debería ir la carne cruda en la nevera?", options: ["La puerta, para acceso fácil", "El estante superior", "El estante inferior, para que los goteos no contaminen otros alimentos"] },
      { q: "¿Cuánto duran de forma segura la mayoría de las sobras en la nevera?", options: ["1 día", "3–4 días", "2 semanas"] },
      { q: "¿Cuál de estos NO debería guardarse en la nevera?", options: ["Arroz cocido", "Tomates, patatas y cebollas enteros", "Yogur abierto"] }
    ]
  },

  "l2-1": {
    title: "Hervir y Cocer a Fuego Lento",
    intro: "Hervir parece demasiado obvio para ser una habilidad — hasta que conoces la diferencia entre un hervor fuerte (burbujas grandes y violentas, para la pasta), un hervor suave (burbujas pequeñas rompiendo perezosamente la superficie, para salsas y legumbres) y un hervor apenas perceptible (una burbuja ocasional, para cosas delicadas).\n\nLa mayoría de la comida 'hervida' en realidad se cuece a fuego lento. Hervir con agresividad deshace la comida y endurece las proteínas.",
    technique: {
      heading: "Controlar el agua",
      steps: [
        "Hervor fuerte: máximo de burbujas, para pasta y escaldar verduras verdes. Sala el agua generosamente — debe saber a mar.",
        "Hervor suave: baja el fuego hasta que suban pequeñas burbujas con delicadeza. Aquí quieren estar sopas, salsas, legumbres y patatas.",
        "Empieza las verduras de raíz (patatas, zanahorias) en agua FRÍA y luego lleva a hervor suave — se cocinan de forma uniforme desde el centro. Las verduras verdes van al agua ya hirviendo.",
        "Usa una tapa para llegar antes al hervor; ábrela o quítala para mantener un hervor suave sin que rebose.",
        "Comprueba el punto con la punta de un cuchillo o un tenedor: debe entrar en una patata sin resistencia."
      ],
      tips: [
        "El agua salada es tu única oportunidad de sazonar la pasta y las patatas por dentro.",
        null, null, null, null
      ]
    },
    recipe: {
      name: "Patatas con Mantequilla y Hierbas",
      description: "Unas patatas bien cocidas son un alarde silencioso. Inicio en agua fría, hervor suave correcto, prueba con cuchillo — toda la lección en un plato.",
      time: "30 min",
      units: ["kg", "cda", "cda", "cda", ""],
      ingredients: ["patatas nuevas (o grandes, por la mitad)", "sal (para el agua de cocción)", "mantequilla", "perejil o cebollino fresco, picado", "sal en escamas y pimienta negra, al gusto"],
      steps: [
        "Pon las patatas en una olla y cúbrelas con agua FRÍA por un par de cm. Añade la sal.",
        "Lleva a ebullición a fuego alto, luego baja a un hervor suave constante.",
        "Cuece 15–20 minutos, hasta que un cuchillo entre en la patata más grande sin resistencia.",
        "Escurre bien y deja que se sequen al vapor en el colador 2 minutos (las patatas mojadas rechazan la mantequilla).",
        "Devuélvelas a la olla caliente con la mantequilla y las hierbas; mezcla hasta que brillen.",
        "Sazona con sal en escamas y pimienta. Prueba una. Eso es una patata bien cocida."
      ]
    },
    quiz: [
      { q: "¿Cómo de salada debe estar el agua de cocción de pasta/patatas?", options: ["Solo una pizca", "Claramente salada, como el mar", "Sin sal — sazonas después"] },
      { q: "Las patatas deberían empezar a cocinarse en…", options: ["Agua fría, llevada a hervor suave", "Agua hirviendo a borbotones", "Agua templada del grifo"] },
      { q: "¿Cómo se ve un hervor suave?", options: ["Burbujas grandes y violentas por toda la superficie", "Pequeñas burbujas rompiendo la superficie con suavidad y constancia", "Agua totalmente quieta con vapor"] }
    ]
  },

  "l2-2": {
    title: "Huevos I: Cocidos y Revueltos",
    intro: "Los huevos son la prueba clásica de un cocinero porque castigan el descuido: treinta segundos de más y lo cremoso se vuelve gomoso. Domina el fuego suave aquí y habrás aprendido un principio que se aplica a pescados, natillas y salsas.\n\nEl secreto de unos buenos huevos revueltos es vergonzosamente simple: fuego más bajo de lo que crees, y retíralos antes de que parezcan hechos del todo.",
    technique: {
      heading: "Fuego suave, gran recompensa",
      steps: [
        "Huevos cocidos: baja los huevos al agua ya hirviendo con una cuchara y cronometra con precisión — 7 minutos para yema jugosa, 10–11 para bien dura.",
        "Pela los huevos cocidos empezando por el extremo grueso (hay una bolsa de aire) bajo un hilo de agua corriente.",
        "Revueltos: bate bien los huevos con una pizca de sal hasta que queden uniformes — sin vetas de clara.",
        "Usa una sartén antiadherente a fuego BAJO con mantequilla. Echa los huevos y remueve despacio y sin parar con una espátula, raspando el fondo.",
        "Retira la sartén del fuego cuando los huevos aún se vean algo húmedos y brillantes — el calor residual los termina de camino al plato."
      ],
      tips: [
        "Directo a agua con hielo después: detiene la cocción y facilita mucho el pelado.",
        null, null, null,
        "Los huevos gomosos se cocinaron 'hasta hechos' SOBRE el fuego. Los cremosos se terminan fuera de él."
      ]
    },
    recipe: {
      name: "Huevos Revueltos Cremosos sobre Tostada",
      description: "El plato técnico por el que todo brunch cobra 14 euros. Bajo, lento y fuera del fuego pronto.",
      time: "10 min",
      units: ["", "cda", "pizca", "rebanada", ""],
      ingredients: ["huevos", "mantequilla", "sal, más para terminar", "pan bueno, tostado", "pimienta negra y cebollino, para terminar"],
      steps: [
        "Bate los huevos con una pizca de sal hasta que queden completamente uniformes.",
        "Empieza la tostada — los huevos serán más rápidos de lo que crees.",
        "Derrite la mantequilla en una sartén antiadherente a fuego BAJO hasta que espume suavemente.",
        "Añade los huevos. Remueve despacio y sin parar, raspando el fondo, 2–4 minutos mientras se forman cuajos suaves.",
        "Cuando estén casi cuajados pero brillantes y algo húmedos, pásalos enseguida a la tostada.",
        "Termina con sal, pimienta y cebollino. Fíjate: sin partes doradas, sin goma."
      ]
    },
    quiz: [
      { q: "¿Cuánto para una yema jugosa (poco cuajada) en huevo cocido?", options: ["3 minutos", "7 minutos", "12 minutos"] },
      { q: "¿Cuándo deberían salir del fuego los huevos revueltos?", options: ["Cuando estén firmes y secos del todo", "Cuando aún estén algo húmedos y brillantes — el calor residual los termina", "Cuando empiecen a dorarse"] },
      { q: "¿Qué nivel de fuego hace los huevos revueltos más cremosos?", options: ["Alto", "Medio-alto", "Bajo"] }
    ]
  },

  "l2-3": {
    title: "Huevos II: El Huevo Frito Perfecto",
    intro: "Un huevo frito es una lección de dos minutos sobre control del fuego: bastante caliente para cuajar rápido la clara, bastante suave para mantener la yema líquida. Aprende los estilos — con la yema arriba, vuelta y vuelta, y de bordes crujientes — y tendrás una mejora instantánea para arroz, tostadas, fideos y hamburguesas.",
    technique: {
      heading: "Tres estilos de huevo frito",
      steps: [
        "Yema arriba: mantequilla en sartén antiadherente a fuego medio-bajo. Casca el huevo dentro, cocina suave hasta que la clara cuaje del todo pero la yema quede intacta, 2–3 minutos.",
        "Vuelta y vuelta: cocina como arriba, luego desliza una espátula fina por completo debajo y voltea con seguridad. 20–30 segundos por el segundo lado y fuera.",
        "Bordes crujientes: fuego medio-alto con un buen chorro de aceite de oliva. La clara burbujea, se riza y se dora en los bordes mientras la yema queda líquida — 2 minutos, sin voltear.",
        "Casca los huevos sobre una superficie plana, no el borde de la sartén — menos trozos de cáscara, rotura más limpia.",
        "Sala el huevo en la sartén, no tras emplatar — se sazona de forma más uniforme."
      ],
      tips: [
        "Tapa la sartén los últimos 30 segundos para cocer al vapor la película de clara sobre la yema sin voltear.",
        null, null, null, null
      ]
    },
    recipe: {
      name: "Tostada de Huevo Frito y Aguacate",
      description: "Elige tu estilo de huevo frito y ponlo a trabajar en el desayuno favorito de internet.",
      time: "10 min",
      units: ["rebanada", "", "", "cdta", "", ""],
      ingredients: ["pan resistente (la masa madre va genial)", "aguacate maduro", "huevo", "mantequilla o aceite de oliva", "sal, pimienta y copos de chile, al gusto", "limón (un chorrito pequeño)"],
      steps: [
        "Tuesta bien el pan — necesita estructura bajo los ingredientes.",
        "Machaca el aguacate con un tenedor, un chorrito de limón y una pizca de sal. Úntalo en la tostada.",
        "Fríe el huevo en tu estilo elegido: yema arriba, vuelta y vuelta o de bordes crujientes.",
        "Desliza el huevo sobre el aguacate. Sazona con sal, pimienta y copos de chile.",
        "Come enseguida, idealmente donde todos puedan ver la yema romperse a cámara lenta."
      ]
    },
    quiz: [
      { q: "Para huevos fritos de bordes crujientes, quieres…", options: ["Fuego bajo y mantequilla", "Fuego medio-alto y una buena cantidad de aceite de oliva", "Una sartén seca sin aceite"] },
      { q: "¿Por qué cascar los huevos en una superficie plana en vez del borde de la sartén?", options: ["Es más educado", "La cáscara se rompe más limpia con menos trozos en la comida", "Mantiene la sartén caliente"] },
      { q: "¿Cómo cuajar la clara sobre un huevo de yema arriba sin voltear?", options: ["Tapar la sartén un momento para que se cocine al vapor", "Poner el fuego al máximo", "Salpicarlo con agua fría y remover"] }
    ]
  },

  "l2-4": {
    title: "Arroz Perfecto Siempre",
    intro: "El arroz ha arruinado más cenas que cualquier otra guarnición, y todo se arregla con tres hábitos: enjuagar el arroz, respetar la proporción y dejarlo reposar al final.\n\nEnjuagar retira el almidón suelto de la superficie (el culpable del arroz pegajoso). La proporción para arroz blanco de grano largo es 1 taza de arroz por 1½ de agua — menos de lo que dice el paquete. Y el reposo de 10 minutos tapado al final no es opcional; ahí es cuando la humedad se reparte.",
    technique: {
      heading: "El método de absorción",
      steps: [
        "Enjuaga el arroz en un colador bajo agua fría, moviéndolo con los dedos, hasta que el agua salga casi clara (30–60 segundos).",
        "Combina 1 taza de arroz, 1½ tazas de agua y ½ cdta de sal en una cacerola con tapa hermética.",
        "Lleva a ebullición destapado, luego tapa de inmediato, baja el fuego al mínimo y pon un temporizador de 15 minutos. No mires — el vapor está cocinando.",
        "Fuera del fuego, déjalo tapado 10 minutos más. Este reposo es obligatorio.",
        "Ahueca con suavidad con un tenedor, levantando y separando en vez de remover (remover lo aplasta)."
      ],
      tips: [
        null,
        "Esta proporción es para arroz blanco de grano largo como jazmín o basmati. El integral quiere unas 2 tazas de agua y mucha más cocción.",
        null, null, null
      ]
    },
    recipe: {
      name: "Arroz Esponjoso al Vapor",
      description: "Solo arroz — bien hecho. Cocínalo junto a cualquier cosa, o come un bol con mantequilla y salsa de soja sin ningún remordimiento.",
      time: "30 min",
      units: ["tazas", "tazas", "cdta", "cda"],
      ingredients: ["arroz blanco de grano largo (jazmín o basmati)", "agua", "sal", "mantequilla (opcional)"],
      steps: [
        "Enjuaga el arroz en un colador hasta que el agua salga casi clara.",
        "Combina el arroz, el agua y la sal en una cacerola. Lleva a ebullición.",
        "En cuanto hierva, tapa con una tapa hermética y baja el fuego al mínimo. 15 minutos — sin mirar.",
        "Retira del fuego y deja reposar, aún tapado, 10 minutos.",
        "Ahueca con un tenedor, incorpora la mantequilla si la usas y sirve. Cuenta los granos pegados: deben ser casi cero."
      ]
    },
    quiz: [
      { q: "¿Por qué enjuagar el arroz antes de cocinarlo?", options: ["Para retirar el almidón suelto de la superficie que lo vuelve pegajoso", "Para añadir humedad y que se cocine más rápido", "Para lavar la sal"] },
      { q: "¿Cuál es la proporción de agua para arroz blanco de grano largo?", options: ["1 taza de arroz : 1½ de agua", "1 taza de arroz : 3 de agua", "Partes iguales de arroz y agua"] },
      { q: "Tras el tiempo de cocción, deberías…", options: ["Servir enseguida mientras está caliente", "Remover con fuerza para liberar vapor", "Dejarlo reposar tapado, fuera del fuego, 10 minutos"] }
    ]
  },

  "l2-5": {
    title: "Fundamentos de la Pasta",
    intro: "Los cocineros caseros italianos hacen magia entre semana con tres reglas: sala el agua como el mar, cuece al dente (tierna con un ligero mordisco) y nunca — nunca — tires esa agua de cocción con almidón por el desagüe hasta que el plato esté terminado.\n\nEl agua de la pasta es oro líquido: el almidón disuelto hace que la salsa se adhiera a los fideos y convierte aceite y agua en un recubrimiento sedoso y unido.",
    technique: {
      heading: "Cocinar la pasta como si importara",
      steps: [
        "Usa una olla grande con mucha agua a hervor fuerte. Sálala generosamente — 1 o 2 cucharadas. Es la única sazón de la pasta.",
        "Remueve el primer minuto para evitar que se pegue. Nada de aceite en el agua — solo recubre los fideos y repele la salsa después.",
        "Cuece 1–2 minutos MENOS de lo que dice el paquete, probando cerca del final. Al dente = tierna con un ligero mordisco en el centro.",
        "Antes de escurrir, saca una taza del agua de cocción turbia.",
        "Termina la pasta EN la salsa al fuego, añadiendo chorritos de agua de cocción y mezclando hasta que brille y se adhiera. Este paso es lo que hacen los restaurantes y la mayoría en casa se salta."
      ],
      tips: [
        null, null,
        "La pasta termina de cocinarse en la salsa, donde absorbe sabor en vez de agua.",
        null, null
      ]
    },
    recipe: {
      name: "Spaghetti Aglio e Olio",
      description: "Ajo, aceite, chile, agua de pasta — el clásico romano minimalista que es pura técnica. Cinco ingredientes, sin dónde esconderse.",
      time: "20 min",
      units: ["g", "dientes", "taza", "cdta", "taza", "cda", ""],
      ingredients: ["spaghetti", "ajo, en láminas finas", "aceite de oliva", "copos de chile rojo", "perejil fresco, picado", "sal (para el agua de la pasta)", "parmesano rallado, para servir (opcional)"],
      steps: [
        "Hierve una olla grande de agua; sálala como el mar. Cuece los spaghetti 1–2 min menos de lo que dice el paquete.",
        "Mientras, calienta el aceite y el ajo en láminas en una sartén grande fría a fuego medio-bajo, dejando que se vuelva dorado pálido despacio — no marrón. Añade los copos de chile al final.",
        "Saca una taza del agua de la pasta y luego escúrrela.",
        "Añade la pasta a la sartén con un buen chorro de agua de la pasta. Mezcla con energía a fuego medio hasta que la salsa brille y cubra cada hebra.",
        "Fuera del fuego, incorpora el perejil. Prueba — puede querer una pizca más de sal.",
        "Sirve enseguida, con parmesano si quieres. Pura técnica, sin atajos — y se notará."
      ]
    },
    quiz: [
      { q: "¿Qué significa 'al dente'?", options: ["Completamente blanda hasta el centro", "Tierna pero con un ligero mordisco en el centro", "Algo crujiente y poco hecha"] },
      { q: "¿Por qué guardar una taza del agua de cocción de la pasta?", options: ["Su almidón ayuda a que la salsa emulsione y se adhiera a la pasta", "Para enjuagar los fideos antes de servir", "Para enfriar la salsa"] },
      { q: "¿Dónde debería terminar de cocinarse la pasta?", options: ["En el agua hirviendo, del todo hecha", "En la salsa, al fuego", "En el plato, reposando"] }
    ]
  },

  "l2-6": {
    title: "Saltear y Freír en Sartén",
    intro: "Las habilidades de sartén. Saltear (cocción rápida en poca grasa a fuego vivo) y freír en sartén (algo más de grasa, algo más de paciencia) son cómo consigues comida dorada y de sabor profundo en vez de pálida y como al vapor.\n\nDorar ES sabor — es una reacción química (la reacción de Maillard) que crea cientos de nuevos compuestos sabrosos. Tu trabajo es crear las condiciones: sartén caliente, comida seca y espacio para respirar.",
    technique: {
      heading: "Conseguir el dorado",
      steps: [
        "Calienta primero la sartén vacía, luego añade el aceite. Está listo cuando el aceite brilla y fluye como agua.",
        "Seca la comida con papel antes de que toque la sartén. La humedad de la superficie debe evaporarse antes de que empiece el dorado.",
        "No abarrotes la sartén — deja espacio entre las piezas. Abarrotar atrapa vapor y sale gris, no dorado. Cocina por tandas si hace falta.",
        "Luego: déjala en paz. La comida se suelta sola de la sartén cuando está dorada. Si se pega, no está lista para voltear.",
        "Los trocitos dorados pegados en la sartén después ('fond') son sabor concentrado — un chorrito de agua, caldo o vino los disuelve en una salsa instantánea (desglasar)."
      ],
      tips: [
        "La comida echada en sartén fría se queda y se pega. La echada en sartén bien caliente chisporrotea al instante — ese sonido es tu confirmación.",
        null, null, null, null
      ]
    },
    recipe: {
      name: "Champiñones Dorados al Ajo y Mantequilla",
      description: "Los champiñones son el tutorial definitivo del dorado — están llenos de agua y te muestran al instante si tu sartén estaba bastante caliente y sin abarrotar.",
      time: "20 min",
      units: ["g", "cda", "cda", "dientes", "cdta", "cdta", ""],
      ingredients: ["champiñones cremini o blancos, en cuartos", "aceite de oliva", "mantequilla", "ajo, picado", "hojas de tomillo fresco (o ½ cdta seco)", "sal", "pimienta negra y un chorrito de limón"],
      steps: [
        "Calienta una sartén grande a fuego medio-alto hasta que esté bien caliente; añade el aceite y deja que brille.",
        "Añade los champiñones en una sola capa con espacio entre ellos (dos tandas si hace falta). NO los sales aún — la sal saca agua y bloquea el dorado.",
        "Déjalos en paz 3–4 minutos hasta que estén bien dorados por debajo, luego mézclalos y dora los otros lados.",
        "Baja a fuego medio. Añade la mantequilla, el ajo y el tomillo; mezcla 1 minuto hasta que huela.",
        "AHORA sazona con sal y pimienta, termina con un chorrito de limón y sirve — sobre tostada, arroz o directo de la sartén."
      ]
    },
    quiz: [
      { q: "¿Cómo sabes que el aceite está bastante caliente para empezar a cocinar?", options: ["Echa mucho humo", "Brilla y fluye fino como el agua", "Lleva exactamente un minuto al fuego"] },
      { q: "¿Qué pasa cuando abarrotas la sartén?", options: ["La comida se cuece al vapor en su propia humedad en vez de dorarse", "La comida se cocina más rápido", "Nada — más comida es más eficiente"] },
      { q: "Los trocitos dorados pegados a la sartén (fond) son…", options: ["Residuo quemado que amargará la comida", "Sabor concentrado que puedes disolver en una salsa", "Señal de que el fuego estaba demasiado alto"] }
    ]
  },

  "l2-7": {
    title: "Fundamentos del Asado",
    intro: "Asar es el método del genio perezoso: el calor seco y alto del horno hace el dorado por ti mientras haces otra cosa. Transforma las verduras — bordes caramelizados, interior dulce — con unos cuatro minutos de esfuerzo real.\n\nLa fórmula para verduras: 220 °C, aceite suficiente para cubrir, sal, espacio en la bandeja y paciencia.",
    technique: {
      heading: "La fórmula del asado",
      steps: [
        "Precalienta bien — 220 °C para la mayoría de verduras. Empezar con el horno frío da resultados blandos.",
        "Corta todo al mismo tamaño (aquí rinden tus habilidades de cuchillo del Nivel 1) para que todo termine a la vez.",
        "Mezcla con aceite suficiente para cubrir ligeramente cada superficie, más sal. Las verduras con poco aceite se secan en vez de quedar crujientes.",
        "Extiende en una sola capa con espacio entre piezas — la misma regla de no abarrotar que la sartén. Usa dos bandejas en vez de amontonar.",
        "No molestes. Voltea una vez sobre los dos tercios. Están listas cuando los bordes se doran y un cuchillo entra fácil."
      ],
      tips: [
        null, null, null,
        "Pon los lados cortados hacia abajo contra la bandeja caliente: esa cara de contacto se vuelve la más dorada.",
        null
      ]
    },
    recipe: {
      name: "Patatas Asadas Crujientes",
      description: "El método de lo mejor de ambos: un breve hervor, una sacudida brusca y un horno caliente. Corteza que se rompe, interior esponjoso.",
      time: "55 min",
      units: ["kg", "cda", "cda", "cdta", ""],
      ingredients: ["patatas tipo Yukon Gold o similar, en trozos de 4 cm", "sal (para el agua)", "aceite de oliva", "ajo en polvo (opcional)", "sal en escamas, pimienta y romero picado, para terminar"],
      steps: [
        "Precalienta el horno a 220 °C. Cuece los trozos de patata en agua bien salada 8 minutos — solo hasta que los bordes se ablanden.",
        "Escurre y luego sacude el colador con fuerza varias veces para raspar las superficies. Esos bordes ásperos se vuelven el crujiente.",
        "Mezcla con aceite de oliva y ajo en polvo en una bandeja; extiende en una sola capa, lados cortados hacia abajo, con espacio entre piezas.",
        "Asa 25 minutos sin tocar, voltea, luego asa 15–20 más hasta que estén muy doradas.",
        "Termina con sal en escamas, pimienta y romero. Sirve caliente — escucha el crujido."
      ]
    },
    quiz: [
      { q: "¿Una buena temperatura de horno multiusos para asar verduras?", options: ["150 °C", "220 °C", "260 °C"] },
      { q: "¿Por qué cortar las verduras a un tamaño uniforme antes de asar?", options: ["Para que todas terminen de cocinarse a la vez", "Para que quepan más ordenadas en la bandeja", "Los trozos más pequeños saben mejor"] },
      { q: "¿Por qué sacudir las patatas hervidas en el colador?", options: ["Para escurrirlas más rápido", "Para asperar sus superficies, que se vuelven crujientes en el horno", "Para retirar la sal"] }
    ]
  },

  "l2-8": {
    title: "Sazonar y Probar",
    intro: "La mayor diferencia entre comida correcta y comida de '¿esto lo hiciste tú?' no suele ser la técnica — es la sazón. Dos hábitos hacen casi todo el trabajo: sazonar por capas mientras cocinas (no una sola sacudida desesperada al final) y probar constantemente.\n\n¿Y cuando un plato sabe soso pero salado suficiente? Probablemente necesita ÁCIDO — un chorrito de limón o de vinagre despierta los sabores como encender una luz.",
    technique: {
      heading: "Construir sabor a propósito",
      steps: [
        "Sazona por capas: un poco de sal cuando entra la cebolla, cuando entra el tomate, cuando entra el líquido — no una gran corrección al final. Cada capa sazona ese ingrediente por dentro.",
        "Prueba en cada etapa. Tu cuchara es tu instrumento más importante. Pregunta: ¿necesita sal? ¿ácido? ¿dulzor? ¿picante?",
        "La sal intensifica el sabor; el ácido (limón, vinagre) lo aviva; una pizca de azúcar redondea el amargor o los tomates ásperos; la grasa lleva el sabor y suaviza los bordes.",
        "Si sabe soso: añade ácido antes que más sal. Soso-pero-salado es la firma clásica de la falta de ácido.",
        "Sazona poco al principio y ajusta al alza — siempre puedes añadir. ¿Demasiado salado? Diluye con líquido sin sal, añade un almidón o equilibra con ácido y grasa."
      ],
      tips: [
        null,
        "Ten un montón de cucharaditas junto a los fogones. Probar cinco veces por plato es normal, no exagerado.",
        null, null, null
      ]
    },
    recipe: {
      name: "Salsa de Tomate Sencilla",
      description: "Una salsa de cinco ingredientes que probarás y ajustarás al menos cuatro veces. Esta receta te hace sazonar a propósito.",
      time: "35 min",
      units: ["cda", "dientes", "lata (800 g)", "cdta", "cdta", "hojas", "cdta"],
      ingredients: ["aceite de oliva", "ajo, en láminas finas", "tomate triturado", "sal, por capas", "azúcar (si hace falta)", "albahaca fresca, troceada (o ½ cdta de orégano seco)", "vinagre de vino tinto o zumo de limón (si hace falta)"],
      steps: [
        "Calienta el aceite y el ajo juntos a fuego medio-bajo hasta que estén dorados pálidos y aromáticos. PRUEBA nº1: huélelo — esa es tu base de sabor.",
        "Añade el tomate y una primera capa de sal. Cuece a fuego lento, medio tapado, 20 minutos.",
        "PRUEBA nº2: ¿demasiado ácido o amargo? Añade el azúcar. Remueve, espera un minuto.",
        "PRUEBA nº3: ¿sabores presentes pero sosos? Añade el vinagre o el limón. Nota cómo lo aviva.",
        "PRUEBA nº4: ahora — y solo ahora — ajusta la sal final. Incorpora la albahaca fuera del fuego.",
        "Sirve sobre pasta (¡termínala en la salsa, estilo Lección 5!). Acabas de sazonar como un profesional."
      ]
    },
    quiz: [
      { q: "¿Cuándo deberías sazonar un plato?", options: ["Una vez, justo al final", "Por capas durante toda la cocción, probando sobre la marcha", "Solo en la mesa"] },
      { q: "El plato tiene sal suficiente pero sabe soso y apagado. ¿Qué necesita más probablemente?", options: ["Más sal", "Ácido, como zumo de limón o vinagre", "Más tiempo de cocción"] },
      { q: "¿Qué hace una pizca de azúcar en una salsa de tomate?", options: ["La hace saber a postre", "Espesa la salsa", "Redondea la aspereza y el amargor"] }
    ]
  },

  "l2-9": {
    title: "Broche Final de las Bases: Arroz Frito",
    intro: "Hora de combinar tus habilidades. El arroz frito usa casi todo de este nivel a la vez: arroz bien cocido (mejor del día anterior), huevos revueltos, salteado en sartén caliente, sazón por capas y probar para terminar.\n\nTambién es el plato definitivo para vaciar la nevera improvisando — lo cual es un adelanto de hacia dónde va todo este curso.",
    technique: {
      heading: "Por qué este plato es la prueba",
      steps: [
        "Arroz (Lección 4): el arroz frito exige arroz frío, del día anterior. El arroz fresco está demasiado húmedo y se apelmaza; la refrigeración nocturna seca y endurece los granos.",
        "Huevos (Lección 2): revuélvelos suaves primero y resérvalos — se pasarían si se quedan en la sartén todo el rato.",
        "Fuego de sartén (Lección 6): la sartén debe estar realmente caliente, y no la sobrecargues. El arroz frito abarrotado se cuece al vapor y se vuelve puré.",
        "Sazón (Lección 8): la salsa de soja va por el borde de la sartén para que chisporrotee y se tueste antes de mezclarse. Prueba antes de servir; ajusta.",
        "Mise en place (Nivel 1): una vez caliente la sartén, este plato tarda 6 minutos. TODO debe estar preparado y al alcance antes de empezar."
      ],
      tips: [
        "¿Sin arroz del día anterior? Cuece una tanda fresca y extiéndela en una bandeja en la nevera 30 minutos.",
        null, null, null, null
      ]
    },
    recipe: {
      name: "Arroz Frito de Todo",
      description: "Tu plato de graduación del Nivel 2. Cada habilidad de este nivel en una sartén chisporroteante.",
      time: "20 min (con arroz cocido)",
      units: ["tazas", "", "cda", "dientes", "", "taza", "cda", "cdta", ""],
      ingredients: ["arroz cocido frío (idealmente del día anterior)", "huevos, batidos", "aceite neutro, dividido", "ajo, picado", "cebolletas, en rodajas (blancos y verdes separados)", "guisantes y zanahorias congelados", "salsa de soja", "aceite de sésamo tostado", "pimienta blanca o negra, al gusto"],
      steps: [
        "Mise en place de todo — una vez que empiezas, no hay parada.",
        "Calienta 1 cda de aceite en una sartén grande o wok a fuego medio-alto. Revuelve los huevos suaves y resérvalos.",
        "Añade el resto del aceite. Saltea el ajo y los blancos de cebolleta 30 segundos, luego los guisantes y zanahorias 1 minuto.",
        "Añade el arroz, deshaciendo los grumos con la espátula. Extiéndelo y déjalo 60 segundos sin tocar para que se tueste, luego mezcla. Repite dos veces.",
        "Rocía la salsa de soja por el borde caliente de la sartén y luego mezcla. Devuelve los huevos, añade el aceite de sésamo y la pimienta.",
        "PRUEBA. ¿Más soja? ¿Pimienta? Ajusta, corona con los verdes de cebolleta y sírvete un plato de todo lo que has aprendido."
      ]
    },
    quiz: [
      { q: "¿Por qué es mejor el arroz del día anterior para el arroz frito?", options: ["Está más seco y firme, así que se fríe en vez de apelmazarse", "Tiene más sabor tras reposar", "Absorbe más aceite"] },
      { q: "¿Por qué revolver los huevos primero y reservarlos?", options: ["Se pasarían si se quedan en la sartén todo el rato", "Los huevos siempre deben cocinarse en sartén aparte", "Para que el arroz no se ponga amarillo"] },
      { q: "¿Por qué se añade la salsa de soja por el borde caliente de la sartén?", options: ["Para limpiar el borde de la sartén mientras se cocina", "Chisporrotea y se tuesta, añadiendo sabor más profundo antes de mezclarse", "Para enfriar un poco la sartén"] }
    ]
  }
};
