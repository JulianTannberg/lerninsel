/* Lerninsel – Englisch Update 2026-09-24
   Ergänzt Englisch um genau eine Vokabel-Seite (London/Unterwegs)
   und Übungen zu den weiteren fotografierten Seiten. */
(function(){
  if (typeof DEFAULT_CONTENT === "undefined") return;

  const TOPIC = "London";
  const ENGLISH_CONTENT = [
    {
      id:"e-london-vocab-lesson",subject:"englisch",topic:TOPIC,kind:"lesson",type:"lesson",
      title:"Vokabeln: Unterwegs in London",summary:"Eine Vokabel-Seite mit car, train, bus und den passenden London-Wörtern.",
      sections:[
        {heading:"Verkehr",text:"car = Auto · train = Zug · underground = U-Bahn · bus = Bus · walk = zu Fuß gehen / laufen"},
        {heading:"Orte",text:"street = Straße · town = Stadt / Ort · city = Großstadt / Stadt"},
        {heading:"In London machen",text:"buy a souvenir = ein Souvenir kaufen · visit a museum = ein Museum besuchen · walk across a bridge = über eine Brücke gehen · see sights = Sehenswürdigkeiten anschauen"}
      ],
      memory:"Merke: by bus / by train / by car, aber on foot = zu Fuß."
    },

    {id:"e-london-vocab-car",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"car",question:"car",answer:"Auto",en:"car",de:"Auto"},
    {id:"e-london-vocab-train",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"train",question:"train",answer:"Zug",en:"train",de:"Zug"},
    {id:"e-london-vocab-underground",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"underground",question:"underground",answer:"U-Bahn",en:"underground",de:"U-Bahn"},
    {id:"e-london-vocab-bus",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"bus",question:"bus",answer:"Bus",en:"bus",de:"Bus"},
    {id:"e-london-vocab-walk",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"walk",question:"walk",answer:"zu Fuß gehen / laufen",en:"walk",de:"zu Fuß gehen / laufen"},
    {id:"e-london-vocab-street",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"street",question:"street",answer:"Straße",en:"street",de:"Straße"},
    {id:"e-london-vocab-town",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"town",question:"town",answer:"Stadt / Ort",en:"town",de:"Stadt / Ort"},
    {id:"e-london-vocab-city",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"city",question:"city",answer:"Großstadt / Stadt",en:"city",de:"Großstadt / Stadt"},
    {id:"e-london-vocab-souvenir",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"buy a souvenir",question:"buy a souvenir",answer:"ein Souvenir kaufen",en:"buy a souvenir",de:"ein Souvenir kaufen"},
    {id:"e-london-vocab-museum",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"visit a museum",question:"visit a museum",answer:"ein Museum besuchen",en:"visit a museum",de:"ein Museum besuchen"},
    {id:"e-london-vocab-bridge",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"walk across a bridge",question:"walk across a bridge",answer:"über eine Brücke gehen",en:"walk across a bridge",de:"über eine Brücke gehen"},
    {id:"e-london-vocab-sights",subject:"englisch",topic:TOPIC,kind:"practice",type:"vocab",title:"see sights",question:"see sights",answer:"Sehenswürdigkeiten anschauen",en:"see sights",de:"Sehenswürdigkeiten anschauen"},

    /* Where do you live? */
    {id:"e-london-live-1",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Where do you live?",question:"Welche Antwort passt zu: Where do you live?",options:["I live in Edinburgh.","My name is John.","I'm fourteen.","Thank you."],correct:0},
    {id:"e-london-live-2",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Name",question:"Welche Antwort passt zu: What's your name?",options:["My name is Lisa.","I live in Cardiff.","It's rainy.","I get there by bus."],correct:0},
    {id:"e-london-live-3",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Stadt und Land",question:"Edinburgh liegt in …",options:["Scotland","Wales","England","France"],correct:0},
    {id:"e-london-live-4",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Stadt und Land",question:"Cardiff liegt in …",options:["Wales","Scotland","England","Ireland"],correct:0},
    {id:"e-london-live-5",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Stadt und Land",question:"Liverpool liegt in …",options:["England","Scotland","Wales","Canada"],correct:0},

    /* Jobs */
    {id:"e-london-jobs-1",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Strong points",question:"Welche drei Wörter beschreiben Stärken bei einer Bewerbung?",options:["communicative, reliable, creative","rainy, snowy, windy","bus, train, car","street, town, city"],correct:0},
    {id:"e-london-jobs-2",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Good at …",question:"Welche Ergänzung passt: I'm good at …",options:["maths","hospital","friendly","Scotland"],correct:0},
    {id:"e-london-jobs-3",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Workplace",question:"Welche Antwort passt zu: Where would you like to work?",options:["I'd like to work at a hospital.","I'm fourteen years old.","It's fifteen degrees.","I live in London."],correct:0},
    {id:"e-london-jobs-4",subject:"englisch",topic:TOPIC,kind:"practice",type:"builder",title:"Jobs – Satz bauen",question:"Baue einen passenden Satz.",parts:["I'm","very","communicative","and","reliable."],correctOrder:[0,1,2,3,4]},

    /* Friends */
    {id:"e-london-friends-1",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Friends",question:"Welche Aussage beschreibt eine gute Freundin am besten?",options:["She understands me.","She ignores every message.","She never talks to me.","She is a train."],correct:0},
    {id:"e-london-friends-2",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Friends",question:"Welche Form ist richtig?",options:["She talks about problems.","She talk about problems.","She talking about problems.","She talks problems about."],correct:0},
    {id:"e-london-friends-3",subject:"englisch",topic:TOPIC,kind:"practice",type:"cloze",title:"Friends – Lücken",question:"Setze passende Wörter ein.",template:"My friend is {0}. She {1} my messages and {2} me.",gaps:[
      {options:["reliable","rainy","underground"],correct:0},
      {options:["answers","answer","answering"],correct:0},
      {options:["understands","understand","understanding"],correct:0}
    ]},

    /* London – einfache Sätze */
    {id:"e-london-sentence-1",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"London – Satz",question:"Welche Übersetzung passt zu: Ich wohne in einer großen Stadt?",options:["I live in a big city.","I walk in a big train.","I live on a bus.","I am a big city."],correct:0},
    {id:"e-london-sentence-2",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"London – Satz",question:"Welche Form ist richtig?",options:["It's a red train.","It's red a train.","It a red train is.","A train red it's."],correct:0},
    {id:"e-london-sentence-3",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"London – Satz",question:"Welche Form ist richtig?",options:["The underground is clean.","The underground are clean.","Underground the clean is.","The clean underground are."],correct:0},

    /* Prices */
    {id:"e-london-price-1",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"How much?",question:"Welche Frage passt zu EINEM Gegenstand?",options:["How much is the cap?","How much are the cap?","How many is the cap?","How old is the cap?"],correct:0},
    {id:"e-london-price-2",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"How much?",question:"Welche Frage passt zu MEHREREN Socken?",options:["How much are the socks?","How much is the socks?","How old are the socks?","How many is the socks?"],correct:0},
    {id:"e-london-price-3",subject:"englisch",topic:TOPIC,kind:"practice",type:"cloze",title:"Preise",question:"Setze is/are und It's/They're richtig ein.",template:"How much {0} the tomatoes? {1} one pound.",gaps:[
      {options:["are","is","am"],correct:0},
      {options:["They're","It's","I'm"],correct:0}
    ]},
    {id:"e-london-price-4",subject:"englisch",topic:TOPIC,kind:"practice",type:"cloze",title:"Preise",question:"Setze is/are und It's/They're richtig ein.",template:"How much {0} the sweatshirt? {1} fifteen pounds.",gaps:[
      {options:["is","are","am"],correct:0},
      {options:["It's","They're","We're"],correct:0}
    ]},

    /* Getting around */
    {id:"e-london-get-1",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Getting around",question:"Welche Antwort passt zu: How do you get to the skatepark?",options:["I get there by bus.","I live in a bus.","It's a bus.","My name is bus."],correct:0},
    {id:"e-london-get-2",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Getting around",question:"Welche Form bedeutet „zu Fuß“?",options:["on foot","by foot","with foot","at foot"],correct:0},
    {id:"e-london-get-3",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"He / she + s",question:"Welche Form ist richtig?",options:["Tom gets to the shop by bike.","Tom get to the shop by bike.","Tom getting to the shop by bike.","Tom to get the shop by bike."],correct:0},
    {id:"e-london-get-4",subject:"englisch",topic:TOPIC,kind:"practice",type:"builder",title:"Getting around – Satz bauen",question:"Baue die Frage richtig zusammen.",parts:["How","do","you","get","to","the","cinema?"],correctOrder:[0,1,2,3,4,5,6]},

    /* Weather */
    {id:"e-london-weather-1",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Weather",question:"Wie heißt „Es ist windig“?",options:["It's windy.","It's rainy.","It's snowy.","It's warm."],correct:0},
    {id:"e-london-weather-2",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Weather",question:"Wie heißt „Es ist bewölkt“?",options:["It's cloudy.","It's sunny.","It's hot.","It's cold."],correct:0},
    {id:"e-london-weather-3",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Weather",question:"Welche Aussage beschreibt 15 °C?",options:["It's 15 degrees.","It's 15 weather.","They're 15 degrees.","It has 15 degrees."],correct:0},
    {id:"e-london-weather-4",subject:"englisch",topic:TOPIC,kind:"practice",type:"cloze",title:"Weather – Lücken",question:"Wähle passende Wetterwörter.",template:"When the sun shines, it's {0}. When snow falls, it's {1}.",gaps:[
      {options:["sunny","rainy","windy"],correct:0},
      {options:["snowy","warm","cloudy"],correct:0}
    ]},

    /* Free time / friends */
    {id:"e-london-free-1",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Free time",question:"Welche Aktivität passt zu Freizeit?",options:["go hiking","underground","street","fifteen degrees"],correct:0},
    {id:"e-london-free-2",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Free time",question:"Welche Aussage bedeutet „mit meiner Familie zu Abend essen“?",options:["have dinner with my family","call you every day","wear cool clothes","walk across a bridge"],correct:0},
    {id:"e-london-free-3",subject:"englisch",topic:TOPIC,kind:"practice",type:"mcq",title:"Friends",question:"Welche Aussage passt zu einer hilfsbereiten Person?",options:["She lends you things.","She is an underground.","She is fifteen degrees.","She gets to the train."],correct:0},

    /* Quiz */
    {id:"e-london-quiz-1",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 1",question:"Was bedeutet car?",options:["Auto","Bus","Zug","Straße"],correct:0},
    {id:"e-london-quiz-2",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 2",question:"Was bedeutet underground?",options:["U-Bahn","Brücke","Museum","Großstadt"],correct:0},
    {id:"e-london-quiz-3",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 3",question:"Welche Antwort passt zu Where do you live?",options:["I live in Liverpool.","I'm reliable.","It's windy.","Thank you."],correct:0},
    {id:"e-london-quiz-4",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 4",question:"Welche Form ist richtig?",options:["She answers my messages.","She answer my messages.","She answering my messages.","She messages answer my."],correct:0},
    {id:"e-london-quiz-5",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 5",question:"Welche Frage passt zu einem einzelnen T-Shirt?",options:["How much is the T-shirt?","How much are the T-shirt?","How many is the T-shirt?","How old is the T-shirt?"],correct:0},
    {id:"e-london-quiz-6",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 6",question:"Was heißt „zu Fuß“?",options:["on foot","by foot","at foot","with foot"],correct:0},
    {id:"e-london-quiz-7",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 7",question:"Welche Form ist richtig?",options:["Tom gets to school by bus.","Tom get to school by bus.","Tom getting to school by bus.","Tom is get to school by bus."],correct:0},
    {id:"e-london-quiz-8",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 8",question:"Wie heißt „Es ist regnerisch“?",options:["It's rainy.","It's sunny.","It's warm.","It's snowy."],correct:0},
    {id:"e-london-quiz-9",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 9",question:"Welche Eigenschaft ist eine Stärke bei einem Job?",options:["reliable","rainy","underground","snowy"],correct:0},
    {id:"e-london-quiz-10",subject:"englisch",topic:TOPIC,kind:"quiz",type:"mcq",title:"Quiz 10",question:"Was bedeutet visit a museum?",options:["ein Museum besuchen","ein Souvenir kaufen","über eine Brücke gehen","mit dem Bus fahren"],correct:0}
  ];

  function cloneItem(x){ return typeof structuredClone === "function" ? structuredClone(x) : JSON.parse(JSON.stringify(x)); }
  function mergeEnglishInto(items){
    if(!Array.isArray(items)) return items;
    if(!items.some(i=>i.subject==="englisch")) return items;
    const ids=new Set(ENGLISH_CONTENT.map(i=>i.id));
    const kept=items.filter(i=>!ids.has(i.id));
    return [...kept,...ENGLISH_CONTENT.map(cloneItem)];
  }

  const ids=new Set(ENGLISH_CONTENT.map(i=>i.id));
  for(let i=DEFAULT_CONTENT.length-1;i>=0;i--) if(ids.has(DEFAULT_CONTENT[i]?.id)) DEFAULT_CONTENT.splice(i,1);
  DEFAULT_CONTENT.push(...ENGLISH_CONTENT.map(cloneItem));

  if(typeof withCurrentSandokan === "function"){
    const oldMerge=withCurrentSandokan;
    withCurrentSandokan=function(items){ return mergeEnglishInto(oldMerge(items)); };
  }
  if(typeof state !== "undefined" && Array.isArray(state.items)) state.items=mergeEnglishInto(state.items);

  // Falls die Startseite schon sichtbar ist, einmal aktualisieren, damit das neue Thema sofort erscheint.
  setTimeout(()=>{
    try{
      if(typeof role!=="undefined" && role==="student" && typeof state!=="undefined" && state.student){
        if(state.currentSubject==="englisch" && typeof renderSubject==="function") renderSubject("englisch");
        else if(!state.currentSubject && typeof renderStudentDashboard==="function") renderStudentDashboard();
      }
    }catch{}
  },500);
})();
