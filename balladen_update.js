/* Lerninsel – Deutsch/Balladen Update 2026-09-24
   Lädt zusätzlich zu app.js und ersetzt nur das Thema Deutsch > Balladen. */
(function(){
  if (typeof DEFAULT_CONTENT === "undefined") return;

  const BALLADEN_CONTENT = [
    {
      id:"d-balladen-lesson-1",subject:"deutsch",topic:"Balladen",kind:"lesson",type:"lesson",balladGroup:"general",
      title:"Balladen – das Wichtigste",summary:"Merkmale einer Ballade und Regeln für die Inhaltsangabe.",
      sections:[
        {heading:"Was ist eine Ballade?",text:"Eine Ballade ist ein erzählendes Gedicht. Sie verbindet Merkmale von Gedicht, Erzählung und Drama: Sie hat Verse und oft Strophen, erzählt eine Handlung mit Figuren und enthält häufig direkte Rede oder besonders spannende Szenen."},
        {heading:"Typische Merkmale",text:"Balladen erzählen meistens ein ungewöhnliches oder spannendes Ereignis. Oft gibt es einen Konflikt, eine Steigerung und einen Höhe- oder Wendepunkt. Wiederholungen, Reime, Rhythmus und direkte Rede können die Wirkung verstärken. Nicht jede Ballade besitzt jedes Merkmal gleich stark."},
        {heading:"Drei Bereiche merken",text:"Lyrisch: Sprache, Klang, Rhythmus und Gefühle. Episch: Figuren, Handlung, Ort und zeitliche Reihenfolge. Dramatisch: Konflikt, direkte Rede und szenische Zuspitzung."},
        {heading:"Inhaltsangabe schreiben",text:"Eine Inhaltsangabe ist kurz und sachlich. Sie steht im Präsens, benutzt eigene Worte und erzählt die wichtigsten Ereignisse in der richtigen Reihenfolge. Eigene Meinung und künstliche Spannung gehören nicht hinein."}
      ],
      memory:"Ballade = Gedicht + erzählte Handlung + oft dramatische Szenen. Inhaltsangabe = Präsens, sachlich, eigene Worte, richtige Reihenfolge."
    },
    {
      id:"d-balladen-john-lesson",subject:"deutsch",topic:"Balladen",kind:"lesson",type:"lesson",balladGroup:"john",
      title:"John Maynard",summary:"Handlung und wichtige Punkte der Ballade von Theodor Fontane.",
      sections:[
        {heading:"Worum geht es?",text:"Ein Schiff fährt über den Eriesee. Während der Fahrt bricht ein Feuer aus. Der Steuermann John Maynard bleibt an seinem Platz und steuert weiter auf das rettende Ufer zu."},
        {heading:"Wie endet die Handlung?",text:"Die Fahrgäste erreichen das Ufer und werden gerettet. John Maynard überlebt die Rettung nicht. Danach wird er von den Menschen geehrt und betrauert."},
        {heading:"Warum passt der Text zur Ballade?",text:"Es gibt eine erzählte Handlung, einen gefährlichen Konflikt, eine starke Zuspitzung und direkte Rede. Gleichzeitig ist der Text in Gedichtform gestaltet."}
      ],
      memory:"John Maynard bleibt trotz der Gefahr am Steuer und rettet die Menschen auf dem Schiff."
    },
    {id:"d-balladen-practice-1",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",balladGroup:"john",title:"Regel der Inhaltsangabe",question:"Welche Formulierung passt zu einer sachlichen Inhaltsangabe?",options:["Das Schiff fährt über den Eriesee.","Ich finde John Maynard unglaublich mutig!","Plötzlich passiert etwas unfassbar Schreckliches!","Du musst dir vorstellen, wie schlimm das ist."],correct:0},
    {id:"d-balladen-practice-2",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",balladGroup:"john",title:"Welche Zeitform?",question:"In welcher Zeitform wird eine Inhaltsangabe normalerweise geschrieben?",options:["Präsens","Präteritum","Futur","Perfekt"],correct:0},
    {
      id:"d-balladen-homework-main",subject:"deutsch",topic:"Balladen",kind:"homework",type:"writing",balladGroup:"john",
      title:"John Maynard: Inhaltsangabe Schritt für Schritt",summary:"Aus Einleitung und vier kleinen Abschnitten entsteht deine vollständige Inhaltsangabe.",
      question:"Beginne mit dem Einleitungssatz und bearbeite danach die Handlung in vier Abschnitten. Nutze die Satzhilfe nur, wenn du nicht weiterkommst.",
      bullets:["Der Steuermann fährt das Schiff über den Eriesee.","Es bricht ein Feuer auf dem Schiff aus.","Die Menschen auf dem Boot bekommen Angst.","John Maynard hält trotz des Feuers durch.","Der Strand ist die Rettung für das Boot und John Maynard hält darauf zu.","Alle werden gerettet. John Maynard gibt sein Leben für die Fahrgäste.","Die Menschen ehren John Maynard mit Blumen und beerdigen ihn.","Die Menschen trauern um John Maynard und danken ihm."],
      guidedParts:[
        {heading:"1. Einleitungssatz",prompt:"Nenne Titel, Autor, Textsorte und das Thema der Ballade in einem Satz.",bullets:["Titel: John Maynard","Autor: Theodor Fontane","Textsorte: Ballade","Thema: Ein Steuermann rettet die Fahrgäste eines brennenden Schiffes und stirbt dabei."],starter:"Die Ballade „…“ von … handelt von …",example:"Die Ballade „John Maynard“ von Theodor Fontane handelt von einem Steuermann, der die Fahrgäste eines brennenden Schiffes rettet und dabei stirbt."},
        {heading:"2. Fahrt und Feuer",prompt:"Schreibe ein oder zwei Sätze: Wo fährt das Schiff und was geschieht während der Fahrt?",bullets:["Der Steuermann fährt das Schiff über den Eriesee.","Auf dem Schiff bricht ein Feuer aus."],starter:"Das Schiff fährt … Während der Fahrt …",example:"Das Schiff fährt über den Eriesee. Während der Fahrt bricht auf dem Schiff ein Feuer aus."},
        {heading:"3. Angst und Durchhalten",prompt:"Wie reagieren die Menschen? Was tut John Maynard trotzdem?",bullets:["Die Fahrgäste bekommen Angst.","John Maynard bleibt trotz des Feuers am Steuer.","Er hält auf das rettende Ufer zu."],starter:"Die Fahrgäste … Trotzdem bleibt John Maynard …",example:"Die Fahrgäste bekommen Angst. Trotzdem bleibt John Maynard am Steuer und hält auf das rettende Ufer zu."},
        {heading:"4. Rettung und Tod",prompt:"Was geschieht am Ufer? Was passiert mit John Maynard?",bullets:["Alle Fahrgäste werden gerettet.","John Maynard gibt sein Leben für die Menschen."],starter:"Am Ufer werden … John Maynard jedoch …",example:"Am Ufer werden alle Fahrgäste gerettet. John Maynard jedoch stirbt, weil er sein Leben für die Menschen gibt."},
        {heading:"5. Ehrung und Trauer",prompt:"Wie reagieren die Menschen nach seinem Tod?",bullets:["Die Menschen ehren und beerdigen John Maynard.","Sie trauern um ihn und danken ihm."],starter:"Anschließend … Die Menschen …",example:"Anschließend ehren und beerdigen die Menschen John Maynard. Sie trauern um ihn und danken ihm für die Rettung."}
      ],
      finalText:"Die Ballade „John Maynard“ von Theodor Fontane handelt von einem Steuermann, der die Fahrgäste eines brennenden Schiffes rettet und dabei stirbt. Das Schiff fährt über den Eriesee. Während der Fahrt bricht auf dem Schiff ein Feuer aus. Die Fahrgäste bekommen Angst. Trotzdem bleibt John Maynard am Steuer und hält auf das rettende Ufer zu. Am Ufer werden alle Fahrgäste gerettet. John Maynard jedoch stirbt, weil er sein Leben für die Menschen gibt. Anschließend ehren und beerdigen die Menschen John Maynard. Sie trauern um ihn und danken ihm für die Rettung."
    },

    {
      id:"d-maulwurf-lesson",subject:"deutsch",topic:"Balladen",kind:"lesson",type:"lesson",balladGroup:"maulwurf",
      title:"Der Maulwurf muss weg",summary:"Handlung, Figuren und Balladenmerkmale verständlich erklärt.",
      sections:[
        {heading:"Die Ausgangslage",text:"Herr Kremer ist sehr stolz auf seinen gepflegten Garten. Als ein Maulwurf dort Hügel aufwirft, empfindet er das als Störung seiner Ordnung."},
        {heading:"Der Konflikt wird immer größer",text:"Herr Kremer versucht mehrmals, den Maulwurf loszuwerden. Der Maulwurf taucht jedoch immer wieder auf. Dadurch wird Herr Kremer zunehmend wütend und greift zu immer extremeren und gefährlicheren Mitteln."},
        {heading:"Das Ende",text:"Schließlich richtet Herr Kremer selbst großen Schaden an Haus und Garten an. Trotzdem freut er sich darüber, dass der Maulwurf verschwunden ist. Genau darin liegt die Ironie des Endes: Er erreicht sein Ziel, verliert dabei aber viel mehr."},
        {heading:"Die Figuren",text:"Der Maulwurf wirkt hartnäckig und fleißig, weil er immer wieder neue Hügel baut. Für Herr Kremer ist er störend. Herr Kremer selbst wirkt zunehmend verbissen und unvernünftig, weil er sein eigentlich kleines Problem immer weiter eskalieren lässt."},
        {heading:"Warum ist das eine Ballade?",text:"Der Text erzählt eine abgeschlossene Geschichte in Gedichtform. Es gibt einen klaren Konflikt, direkte Rede, Wiederholungen, Spannung und eine starke Steigerung bis zum überraschenden Ende. Die übertriebene Handlung wirkt zugleich komisch und kritisch."}
      ],
      memory:"Die Ballade zeigt, wie ein kleines Problem durch übertriebene Reaktionen immer größer wird."
    },
    {id:"d-maulwurf-practice-main",subject:"deutsch",topic:"Balladen",kind:"practice",type:"flashcard",balladGroup:"maulwurf",title:"Hauptfigur",question:"Wer steht im Mittelpunkt der Handlung?",answer:"Herr Kremer. Der Maulwurf löst den Konflikt aus und spielt ebenfalls eine zentrale Rolle."},
    {id:"d-maulwurf-practice-problem",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",balladGroup:"maulwurf",title:"Das Problem",question:"Welches Problem treibt die Handlung an?",options:["Ein Maulwurf zerstört Herr Kremers Vorstellung von einem ordentlichen Rasen.","Herr Kremer möchte seinen Garten verkaufen.","Der Maulwurf sucht Futter im Haus.","Ein Nachbar baut einen neuen Zaun."],correct:0},
    {id:"d-maulwurf-practice-why",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",balladGroup:"maulwurf",title:"Warum soll er weg?",question:"Warum will Herr Kremer den Maulwurf loswerden?",options:["Weil die Hügel seinen gepflegten Garten stören.","Weil der Maulwurf sein Haustier angreift.","Weil der Maulwurf seine Werkzeuge stiehlt.","Weil der Garten zu klein für zwei Tiere ist."],correct:0},
    {id:"d-maulwurf-practice-order",subject:"deutsch",topic:"Balladen",kind:"practice",type:"builder",balladGroup:"maulwurf",title:"Reihenfolge",question:"Bringe die Handlung in die richtige Reihenfolge.",parts:["Der Maulwurf wird zum Problem.","Herr Kremer versucht, ihn loszuwerden.","Der Maulwurf taucht trotzdem wieder auf.","Herr Kremers Ärger und seine Maßnahmen werden immer extremer.","Am Ende ist der Maulwurf weg, aber Herr Kremer hat selbst großen Schaden angerichtet."],correctOrder:[0,1,2,3,4]},
    {id:"d-maulwurf-practice-rf1",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",balladGroup:"maulwurf",title:"Richtig oder falsch?",question:"Welche Aussage stimmt?",options:["Der Maulwurf spielt für die Handlung eine wichtige Rolle.","Der Maulwurf hat mit dem Konflikt nichts zu tun.","Herr Kremer bleibt die ganze Zeit gelassen.","Die Geschichte besitzt keinen Konflikt."],correct:0},
    {id:"d-maulwurf-practice-rf2",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",balladGroup:"maulwurf",title:"Falsche Aussage verbessern",question:"Wie lässt sich die falsche Aussage „Der Maulwurf macht nichts Besonderes“ sinnvoll verbessern?",options:["Der Maulwurf baut immer wieder neue Hügel und löst damit den Konflikt aus.","Der Maulwurf schläft während der gesamten Handlung.","Der Maulwurf verlässt den Garten sofort.","Der Maulwurf hilft Herr Kremer beim Rasenmähen."],correct:0},
    {id:"d-maulwurf-practice-traits",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",balladGroup:"maulwurf",title:"Eigenschaften des Maulwurfs",question:"Welche drei Eigenschaften passen nach der Handlung am besten zum Maulwurf?",options:["hartnäckig, fleißig, störend","ängstlich, faul, still","vergesslich, langsam, höflich","neidisch, traurig, unentschlossen"],correct:0},
    {id:"d-maulwurf-practice-features",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",balladGroup:"maulwurf",title:"Balladenmerkmale",question:"Welche Kombination spricht besonders dafür, dass der Text eine Ballade ist?",options:["Gedichtform, erzählte Handlung, Konflikt und direkte Rede","nur eine Überschrift und kurze Sätze","eine sachliche Anleitung ohne Figuren","eine Liste mit Fakten und Jahreszahlen"],correct:0},
    {id:"d-maulwurf-practice-four",subject:"deutsch",topic:"Balladen",kind:"practice",type:"cloze",balladGroup:"maulwurf",title:"Handlung in vier Schritten",question:"Ordne den vier Satzanfängen die passenden Ereignisse zu.",template:"Zuerst {0} Dann {1} Danach {2} Am Ende {3}",gaps:[
      {options:["ist Herr Kremer stolz auf seinen ordentlichen Garten und entdeckt dann den ersten Maulwurfshügel.","freut sich Herr Kremer über neue Hügel.","ist der Maulwurf schon verschwunden."],correct:0},
      {options:["versucht Herr Kremer, den Maulwurf loszuwerden.","baut Herr Kremer ein neues Haus.","verlässt Herr Kremer den Garten."],correct:0},
      {options:["taucht der Maulwurf wieder auf und Herr Kremer steigert seine Maßnahmen.","wird der Garten sofort wieder ruhig.","werden Herr Kremer und der Maulwurf Freunde."],correct:0},
      {options:["ist der Maulwurf weg, aber Herr Kremer hat dabei selbst großen Schaden angerichtet.","ist alles wieder genauso wie vorher.","zieht der Maulwurf in Herr Kremers Haus."],correct:0}
    ]},
    {
      id:"d-maulwurf-homework-features",subject:"deutsch",topic:"Balladen",kind:"homework",type:"writing",balladGroup:"maulwurf",
      title:"Arbeitsblatt 7: Woran erkennt man die Ballade?",summary:"Balladenmerkmale nennen und mit der Handlung belegen.",
      question:"Erkläre, woran du erkennst, dass „Der Maulwurf muss weg“ eine Ballade ist. Nenne mehrere Merkmale und passende Beispiele aus der Handlung – möglichst in eigenen Worten.",
      helps:["Denke an die drei Bereiche: Gedichtform, erzählte Handlung und dramatische Elemente.","Mögliche Merkmale sind: Verse/Strophen, Wiederholungen, direkte Rede, Konflikt, Spannung und eine deutliche Steigerung.","Als Beispiele kannst du beschreiben, dass Herr Kremer mit dem Maulwurf kämpft, immer wütender wird und sich der Konflikt bis zum überraschenden Ende zuspitzt."],
      finalText:"Man erkennt die Ballade daran, dass sie eine Geschichte in Gedichtform erzählt. Es gibt Figuren, einen Konflikt, direkte Rede und Wiederholungen. Die Handlung wird immer spannender, weil Herr Kremer den Maulwurf unbedingt loswerden will und dabei immer extremer reagiert. Das überraschende Ende bildet den Höhepunkt."
    },
    {
      id:"d-maulwurf-homework-four",subject:"deutsch",topic:"Balladen",kind:"homework",type:"writing",balladGroup:"maulwurf",
      title:"Arbeitsblatt 8: Handlung in vier Sätzen",summary:"Zuerst – Dann – Danach – Am Ende.",
      question:"Schreibe die Handlung in vier kurzen Sätzen auf. Beginne mit: Zuerst … Dann … Danach … Am Ende …",
      helps:["Zuerst: Herr Kremer ist stolz auf seinen Garten und entdeckt einen Maulwurfshügel.","Dann: Er versucht, den Maulwurf loszuwerden.","Danach: Der Maulwurf kommt wieder und Herr Kremer steigert seine Maßnahmen.","Am Ende: Der Maulwurf ist weg, aber Herr Kremer hat selbst großen Schaden angerichtet."],
      finalText:"Zuerst ist Herr Kremer stolz auf seinen gepflegten Garten, bis ein Maulwurfshügel auftaucht. Dann versucht er, den Maulwurf loszuwerden. Danach kommt der Maulwurf immer wieder und Herr Kremer reagiert immer extremer. Am Ende ist der Maulwurf weg, aber Herr Kremer hat dabei selbst großen Schaden angerichtet."
    },
    {id:"d-maulwurf-quiz-1",subject:"deutsch",topic:"Balladen",kind:"quiz",type:"mcq",balladGroup:"maulwurf",title:"Quizfrage 1",question:"Wer steht im Mittelpunkt der Handlung?",options:["Herr Kremer","Ein Gärtner aus der Nachbarschaft","Ein Förster","Ein Postbote"],correct:0,explanations:["Herr Kremer treibt die Handlung mit seinen Reaktionen auf den Maulwurf voran.","Diese Figur ist nicht die Hauptfigur.","Diese Figur ist nicht die Hauptfigur.","Diese Figur ist nicht die Hauptfigur."]},
    {id:"d-maulwurf-quiz-2",subject:"deutsch",topic:"Balladen",kind:"quiz",type:"mcq",balladGroup:"maulwurf",title:"Quizfrage 2",question:"Was löst den Konflikt aus?",options:["Maulwurfshügel im gepflegten Garten","Ein kaputter Rasenmäher","Ein Streit mit dem Nachbarn","Ein Unwetter"],correct:0,explanations:["Die Hügel stören Herr Kremers Vorstellung von Ordnung und setzen den Konflikt in Gang.","Der Rasenmäher ist nicht der Auslöser.","Ein Nachbarschaftsstreit ist nicht der Auslöser.","Ein Unwetter ist nicht der Auslöser."]},
    {id:"d-maulwurf-quiz-3",subject:"deutsch",topic:"Balladen",kind:"quiz",type:"mcq",balladGroup:"maulwurf",title:"Quizfrage 3",question:"Wie entwickelt sich Herr Kremers Verhalten?",options:["Er wird immer verbissener und reagiert zunehmend übertrieben.","Er verliert sofort das Interesse.","Er bleibt ruhig und beobachtet nur.","Er bittet den Maulwurf freundlich zu bleiben."],correct:0,explanations:["Sein Ärger steigert sich und seine Reaktionen werden immer extremer.","Er verfolgt sein Ziel weiter.","Die Handlung lebt davon, dass er nicht gelassen bleibt.","Das entspricht nicht der Handlung."]},
    {id:"d-maulwurf-quiz-4",subject:"deutsch",topic:"Balladen",kind:"quiz",type:"mcq",balladGroup:"maulwurf",title:"Quizfrage 4",question:"Welche Aussage über den Maulwurf passt am besten?",options:["Er ist hartnäckig und taucht trotz Herr Kremers Versuchen immer wieder auf.","Er verschwindet nach dem ersten Hügel sofort.","Er hilft Herr Kremer bei der Gartenarbeit.","Er spricht die ganze Zeit mit Herr Kremer."],correct:0,explanations:["Sein wiederholtes Auftauchen macht ihn in der Handlung hartnäckig.","Gerade das Gegenteil treibt die Geschichte voran.","Diese Handlung kommt nicht vor.","Die direkte Rede stammt vor allem von Herr Kremer."]},
    {id:"d-maulwurf-quiz-5",subject:"deutsch",topic:"Balladen",kind:"quiz",type:"mcq",balladGroup:"maulwurf",title:"Quizfrage 5",question:"Warum ist das Ende ironisch?",options:["Herr Kremer erreicht zwar sein Ziel, richtet dabei aber selbst viel größeren Schaden an.","Der Maulwurf gewinnt einen Gartenpreis.","Herr Kremer bekommt einen neuen Rasen geschenkt.","Der Maulwurf zieht freiwillig zum Nachbarn."],correct:0,explanations:["Der Erfolg steht in einem absurden Verhältnis zu dem Schaden, den Herr Kremer selbst verursacht.","Ein Gartenpreis gehört nicht zur Handlung.","Ein Geschenk löst die Handlung nicht auf.","Das ist nicht der Grund für die Ironie."]},
    {id:"d-maulwurf-quiz-6",subject:"deutsch",topic:"Balladen",kind:"quiz",type:"mcq",balladGroup:"maulwurf",title:"Quizfrage 6",question:"Welches Merkmal ist typisch für eine Ballade und hier deutlich vorhanden?",options:["Eine erzählte Handlung mit Konflikt und Zuspitzung","Eine Tabelle mit Messwerten","Nur sachliche Definitionen","Eine Anleitung in einzelnen Arbeitsschritten"],correct:0,explanations:["Die Ballade erzählt einen Konflikt, der sich bis zum Ende steigert.","Eine Messtabelle ist kein Balladenmerkmal.","Der Text ist keine reine Definition.","Eine Gebrauchsanweisung ist etwas anderes."]},
    {id:"d-maulwurf-quiz-7",subject:"deutsch",topic:"Balladen",kind:"quiz",type:"mcq",balladGroup:"maulwurf",title:"Quizfrage 7",question:"Welche Zeitform passt für eine Inhaltsangabe der Ballade?",options:["Präsens","Präteritum","Plusquamperfekt","Futur II"],correct:0,explanations:["Inhaltsangaben werden normalerweise im Präsens geschrieben.","Das Präteritum ist nicht die übliche Grundzeit.","Das Plusquamperfekt ist nicht die Grundzeit.","Das Futur II ist nicht die Grundzeit."]},
    {id:"d-maulwurf-quiz-8",subject:"deutsch",topic:"Balladen",kind:"quiz",type:"mcq",balladGroup:"maulwurf",title:"Quizfrage 8",question:"Welche Reihenfolge fasst die Handlung am besten zusammen?",options:["Ordentlicher Garten → Maulwurfshügel → immer stärkere Gegenmaßnahmen → großer selbst verursachter Schaden","Großer Schaden → ordentlicher Garten → Maulwurfshügel → Ruhe","Maulwurfshügel → Freundschaft → Gartenfest → Ruhe","Ordentlicher Garten → Umzug → neuer Nachbar → Maulwurf"],correct:0,explanations:["Diese Reihenfolge entspricht dem Aufbau und der Steigerung der Handlung.","Die Ereignisse stehen in falscher Reihenfolge.","Diese Entwicklung kommt nicht vor.","Diese Entwicklung kommt nicht vor."]}
  ];

  function cloneItem(x){ return typeof structuredClone === "function" ? structuredClone(x) : JSON.parse(JSON.stringify(x)); }
  function mergeBalladenInto(items){
    if(!Array.isArray(items)) return items;
    if(!items.some(i=>i.subject==="deutsch")) return items;
    const ids=new Set(BALLADEN_CONTENT.map(i=>i.id));
    const kept=items.filter(i=>!(i.subject==="deutsch"&&i.topic==="Balladen")&&!ids.has(i.id));
    return [...kept,...BALLADEN_CONTENT.map(cloneItem)];
  }

  for(let i=DEFAULT_CONTENT.length-1;i>=0;i--){
    if(DEFAULT_CONTENT[i]?.subject==="deutsch"&&DEFAULT_CONTENT[i]?.topic==="Balladen") DEFAULT_CONTENT.splice(i,1);
  }
  DEFAULT_CONTENT.push(...BALLADEN_CONTENT.map(cloneItem));

  if(typeof withCurrentSandokan === "function"){
    const oldMerge=withCurrentSandokan;
    withCurrentSandokan=function(items){ return mergeBalladenInto(oldMerge(items)); };
  }
  if(typeof state !== "undefined" && Array.isArray(state.items)) state.items=mergeBalladenInto(state.items);

  function renderBalladenTopic(){
    state.currentSubject="deutsch";state.currentTopic="Balladen";
    const s=subjectMeta("deutsch"),all=mergeBalladenInto(state.items||[]).filter(i=>i.subject==="deutsch"&&i.topic==="Balladen");
    const general=all.filter(i=>i.balladGroup==="general");
    const active=state.balladTab==="maulwurf"?"maulwurf":"john";
    state.balladTab=active;
    const groupItems=all.filter(i=>(i.balladGroup||"john")===active);
    const lessons=groupItems.filter(i=>i.kind==="lesson"),practice=groupItems.filter(i=>i.kind==="practice"),home=groupItems.filter(i=>i.kind==="homework"),quiz=groupItems.filter(i=>i.kind==="quiz");
    const practiceDone=practice.filter(i=>progressFor(i.id).status==="completed").length;
    const generalLesson=general.find(i=>i.kind==="lesson");
    const generalPreview=generalLesson?`<section class="card topicSection" style="margin-bottom:14px"><h3>📚 Allgemein: Was ist eine Ballade?</h3><p>Eine Ballade ist ein <strong>erzählendes Gedicht</strong>. Sie verbindet Gedicht, Erzählung und dramatische Szenen.</p><div class="small" style="line-height:1.65">Typisch sind eine Handlung mit Figuren, ein Konflikt oder spannendes Ereignis, Verse und oft Strophen, direkte Rede sowie eine Steigerung bis zu einem Höhe- oder Wendepunkt.</div><button class="ghost openItem" data-id="${generalLesson.id}" style="margin-top:10px">Allgemeines öffnen</button></section>`:"";

    MAIN.innerHTML=renderProfileBar()+`
      <button id="backTopics" class="ghost back">← ${esc(s.name)}</button>
      <div class="card" style="margin-bottom:14px"><span class="sectionTitle">${s.icon} ${esc(s.name)}</span><h2 style="margin:.3rem 0">Balladen</h2></div>
      ${generalPreview}
      <div class="card" style="margin-bottom:14px"><div class="small" style="margin-bottom:8px"><strong>Ballade auswählen</strong></div><div class="actions" style="margin:0;gap:8px;flex-wrap:wrap"><button class="${active==="john"?"primary":"ghost"} balladTab" data-ballad-tab="john">John Maynard</button><button class="${active==="maulwurf"?"primary":"ghost"} balladTab" data-ballad-tab="maulwurf">Der Maulwurf muss weg</button></div></div>
      <div class="card" style="margin-bottom:14px"><span class="sectionTitle">${active==="john"?"John Maynard":"Der Maulwurf muss weg"}</span><h2 style="margin:.3rem 0">${active==="john"?"John Maynard":"Der Maulwurf muss weg"}</h2><p class="small">${active==="john"?"Theodor Fontane · Handlung, Inhaltsangabe und Übungen":"Neue Ballade · Arbeitsblattfragen, Handlung und Balladenmerkmale"}</p></div>
      <div class="topicSections">
        <section class="card topicSection"><h3>📖 Lernen</h3><p class="hint">Erst die Handlung und die wichtigsten Merkmale verstehen.</p><div class="lessonList">${lessons.map(itemRow).join("")||'<div class="small">Noch nichts hinterlegt.</div>'}</div></section>
        <section class="card topicSection"><h3>🧠 Üben</h3><p class="hint">Die Fragen orientieren sich am Arbeitsblatt. Fehler kommen am Ende noch einmal.</p>${practice.length?`<button id="startPractice" class="primary big">Übungsrunde starten · ${practiceDone}/${practice.length} erledigt</button>`:'<div class="small">Noch keine Übungen.</div>'}</section>
        <section class="card topicSection"><h3>✏️ Hausaufgaben / Schreibaufgaben</h3><p class="hint">Hier gibt es Hilfe für längere Antworten, ohne den Balladentext abzuschreiben.</p><div class="homeworkList">${home.map(itemRow).join("")||'<div class="small">Noch keine Schreibaufgaben.</div>'}</div></section>
        <section class="card topicSection"><h3>🏆 Quiz</h3><p class="hint">Fragen zu Handlung, Figuren, Reihenfolge und Balladenmerkmalen.</p>${quiz.length?`<button id="startSoloQuiz" class="primary big">Quiz starten · ${quiz.length} Fragen</button>`:'<div class="small">Noch kein Quiz.</div>'}</section>
      </div>`;
    $("#backTopics").onclick=()=>renderSubject("deutsch");
    $("#editProfileBtn").onclick=()=>renderProfileSetup(false);
    $$(".balladTab").forEach(b=>b.onclick=()=>{state.balladTab=b.dataset.balladTab;renderBalladenTopic()});
    $$(".openItem").forEach(b=>b.onclick=()=>openItem(b.dataset.id));
    if($("#startPractice")) $("#startPractice").onclick=()=>startPractice(practice);
    if($("#startSoloQuiz")) $("#startSoloQuiz").onclick=()=>startSoloQuiz(quiz);
  }

  if(typeof renderTopic === "function"){
    const oldRenderTopic=renderTopic;
    renderTopic=function(subjectId,topic){
      if(subjectId==="deutsch"&&topic==="Balladen") return renderBalladenTopic();
      return oldRenderTopic(subjectId,topic);
    };
  }
  setTimeout(()=>{
    try{
      if(typeof role!=="undefined" && role==="student" && typeof state!=="undefined" && state.student){
        if(state.currentSubject==="deutsch" && typeof renderSubject==="function") renderSubject("deutsch");
        else if(!state.currentSubject && typeof renderStudentDashboard==="function") renderStudentDashboard();
      }
    }catch{}
  },500);
})();
