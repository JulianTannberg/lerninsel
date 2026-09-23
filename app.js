
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const CFG = window.LERNINSEL_CONFIG || {};
const API_OK = !!(CFG.supabaseUrl && CFG.supabasePublishableKey);
const MAIN = $("#appMain");

const KEYS = {
  role: "lerninsel_v8_role",
  teacherAuth: "lerninsel_v8_teacher_auth",
  teacherRoom: "lerninsel_v8_teacher_room",
  teacherCodes: "lerninsel_v9_teacher_codes",
  studentSession: "lerninsel_v8_student_session",
  parentSession: "lerninsel_v8_parent_session",
  localProgress: "lerninsel_v8_local_progress",
  localProfile: "lerninsel_v8_local_profile"
};

const SUBJECTS = [
  {id:"mathe", name:"Mathe", icon:"➗"},
  {id:"englisch", name:"Englisch", icon:"🇬🇧"},
  {id:"deutsch", name:"Deutsch", icon:"📖"},
  {id:"gsel1", name:"GSEL 1", icon:"🗺️"},
  {id:"gsel2", name:"GSEL 2", icon:"🏴‍☠️"},
  {id:"natur", name:"Natur", icon:"🌿"}
];

const AVATARS = ["🦊","🐼","🐧","🦉","🐢","🐬","🦖","🐝","🐙","🦜","🐯","🐸"];

const DEFAULT_CONTENT = [
  {
    id:"g2-piraten-lernen-grundlagen",subject:"gsel2",topic:"Piraten",kind:"lesson",type:"lesson",
    title:"Piraten, Kaperfahrer und Kaperbrief",summary:"Die wichtigsten Unterschiede einfach erklärt.",
    sections:[
      {heading:"Was sind Piraten?",text:"Piraten überfallen Schiffe oder Orte an der Küste. Sie nehmen Waren oder Geld als Beute. Sie handeln ohne staatliche Erlaubnis."},
      {heading:"Was ist ein Kaperfahrer?",text:"Ein Kaperfahrer greift ebenfalls Schiffe an. Er hat dafür aber eine Erlaubnis von einem Herrscher oder Staat. Meist gilt sie nur im Krieg und gegen bestimmte Feinde."},
      {heading:"Was ist ein Kaperbrief?",text:"Ein Kaperbrief ist die schriftliche Erlaubnis für einen Kaperfahrer. Darin steht, welche feindlichen Schiffe er angreifen darf."},
      {heading:"Warum wurden Kaperbriefe vergeben?",text:"Ein Herrscher konnte damit dem Gegner schaden, ohne alle Schiffe und Soldaten selbst stellen zu müssen. Kaperfahrer erhielten dafür einen Teil der Beute."}
    ],
    memory:"Pirat = ohne staatliche Erlaubnis. Kaperfahrer = mit Kaperbrief."
  },
  {
    id:"g2-piraten-lernen-vitalien",subject:"gsel2",topic:"Piraten",kind:"lesson",type:"lesson",
    title:"Die Vitalienbrüder",summary:"Störtebeker, Kaperfahrt und die Hanse.",
    sections:[
      {heading:"Am Anfang",text:"Die Vitalienbrüder waren zunächst Kaperfahrer. Sie kämpften im Ostseeraum im Zusammenhang mit den Konflikten zwischen Dänemark und Schweden."},
      {heading:"Später",text:"Später wurden sie für die Hanse zum Problem. Sie griffen Handelsschiffe an und waren auch in Nordseegebieten aktiv."},
      {heading:"Störtebeker",text:"Klaus Störtebeker ist der bekannteste Name, der mit den Vitalienbrüdern verbunden wird. Viele Geschichten über ihn sind später entstanden und historisch nicht sicher belegt."}
    ],
    memory:"Die Vitalienbrüder waren zuerst Kaperfahrer und wurden später zu Gegnern der Hanse."
  },
  {
    id:"g2-piraten-lernen-portroyal",subject:"gsel2",topic:"Piraten",kind:"lesson",type:"lesson",
    title:"Port Royal, Anne Bonny und Mary Read",summary:"Karibik und berühmte Piratinnen.",
    sections:[
      {heading:"Port Royal",text:"Port Royal lag auf Jamaika und war im 17. Jahrhundert ein wichtiger Hafen. Dort trafen sich Händler, Seeleute, Freibeuter und Piraten."},
      {heading:"Anne Bonny und Mary Read",text:"Anne Bonny und Mary Read wurden als Piratinnen bekannt. Beide trugen auf See Männerkleidung. Dadurch wurden Frauen an Bord oft nicht sofort erkannt."},
      {heading:"Piratenjäger",text:"Begnadigte Piraten konnten später selbst gegen Piraten vorgehen. Dafür gab es legalen Verdienst und teilweise hohe Belohnungen."}
    ],
    memory:"Port Royal war ein wichtiger Hafen in der Karibik. Anne Bonny und Mary Read wurden als Piratinnen berühmt."
  },

  // Sandokan: nach den Buchseiten 14–15 vereinfacht, ohne die Buchfotos.
  {
    id:"g2-sandokan-lesson",subject:"gsel2",topic:"Piraten",kind:"lesson",type:"lesson",
    title:"Sandokan",summary:"Der Tiger von Malaysia – Buchseiten 14–15 einfach erklärt.",
    videoUrl:"https://www.ardmediathek.de/serie/Y3JpZDovL21kci5kZS9zZW5kZXJlaWhlbi9jOGUyMjc5MS01MDJlLTQxZDAtYWJkNS1hOGVkNmQ3ZTIzNDE",
    videoLabel:"Sandokan – Der Tiger von Malaysia (ARD Mediathek, Fernsehmehrteiler von 1976). Die Verfügbarkeit einzelner Teile kann sich ändern.",
    sections:[
      {heading:"Wer ist Sandokan?",text:"Sandokan ist die Hauptfigur in den Abenteuerromanen von Emilio Salgari. Er trägt den Beinamen „Tiger von Malaysia“. In der Geschichte ist er ein Pirat, der mit seinen Gefährten gegen europäische Kolonialherren kämpft. Sein Gegenspieler ist James Brooke."},
      {heading:"Was bedeutet Kolonialherrschaft?",text:"Kolonialherrschaft bedeutet: Ein fremder Staat oder dessen Vertreter bestimmen über ein Gebiet und seine Menschen. Sie kontrollieren zum Beispiel Handel, Land und politische Entscheidungen. Manche Einheimische wehrten sich dagegen."},
      {heading:"Die Fernsehserie von 1976",text:"In der italienischen Fernsehserie spielt Kabir Bedi die Hauptfigur. Sandokan kämpft im 19. Jahrhundert von der Insel Mompracem aus gegen die britischen Eroberer. Sein Freund Yanez unterstützt ihn. Auch die Engländerin Marianna spielt eine wichtige Rolle. Das ist eine Abenteuergeschichte, kein Dokumentarfilm."},
      {heading:"Gab es Sandokan wirklich?",text:"Der Buchtext berichtet von einem Mann namens Sandokan, der im 19. Jahrhundert am Fluss Kinabatangan im Norden Borneos gelebt haben soll. Bewohner der Region erzählten von ihm, und der Text verweist auf eine Familie mit diesem Namen. Ob dieser Mann genau der Romanfigur entspricht, ist nicht gesichert."},
      {heading:"Sandokan und Syarif Osman",text:"Laut Buchtext kämpfte Sandokan an der Seite von Syarif Osman gegen die britische Herrschaft. Osman soll eine rote Fahne mit einem Tigerkopf benutzt haben. Sandokan soll 1845 geholfen haben, eine Festung gegen die Briten zu verteidigen. Diese Angaben sind überlieferte Berichte, keine gesicherten Einzelheiten über die Romanfigur."},
      {heading:"Warum nennen manche Menschen ihn einen Freiheitskämpfer?",text:"Wer die britische Kolonialherrschaft ablehnte, konnte Sandokan als Verteidiger seiner Heimat ansehen. Andere sahen in ihm einen Piraten. Beides zeigt, dass Menschen dieselbe Person unterschiedlich beurteilen können. Für eine Bewertung muss man ihre Handlungen und die Sicht der Betroffenen betrachten."},
      {heading:"Wo liegt Mompracem?",text:"Mompracem ist in den Romanen Sandokans Insel und sein Zufluchtsort. Alte Karten zeigen tatsächlich eine Insel mit diesem Namen vor der Küste Borneos. Später verschwand der Name von den Karten. Journalisten vermuteten, dass sie der heutigen Insel Keraman (auch Kuraman geschrieben) entspricht. Das ist eine Vermutung, kein sicherer Beweis."},
      {heading:"Die Karten M2 bis M4 verstehen",text:"M2 zeigt Südostasien: Malaysia liegt auf der Malaiischen Halbinsel und teilweise auf Borneo, Indonesien umfasst unter anderem Sumatra und Java. Sandakan liegt an der Nordostküste Borneos im heutigen malaysischen Bundesstaat Sabah. M3 zeigt die vermutete Lage Mompracems vor Nordwestborneo. M4 zeigt Kolonialgebiete um 1914 – also deutlich später als die für Sandokan genannten Ereignisse um 1845."},
      {heading:"Kolonialmächte um 1914 (M4)",text:"Britischer Einfluss: heutiges Malaysia und Singapur, außerdem das britische Schutzgebiet Brunei. Niederländische Herrschaft: das heutige Indonesien. Französische Herrschaft: die heutigen Staaten Vietnam, Laos und Kambodscha. Portugiesische Herrschaft: der östliche Teil Timors, heute Timor-Leste. Das sind die heutigen Ländernamen; die damaligen Staaten und Grenzen waren anders."}
    ],
    memory:"Merke: Romanfigur, überlieferte Geschichte und historische Belege sind nicht dasselbe. Die Karte M4 zeigt die Lage 1914, nicht genau die Zeit um 1845."
  },
  {
    id:"g2-sandokan-q1",subject:"gsel2",topic:"Piraten",kind:"homework",type:"writing",
    title:"Sandokan – Aufgabe 1: Karte M2",summary:"Sandakan auf der Übersichtskarte finden.",
    question:"Setze den Ortspunkt und den Namen der Stadt Sandakan in die Karte M2 in deinem Buch ein. Beschreibe kurz, wo du die Stadt einzeichnest.",
    helps:[
      "Suche auf M2 zuerst die große Insel Borneo. Der nördliche Teil gehört zu Malaysia.",
      "Sandakan liegt im Nordosten von Borneo, im Bundesstaat Sabah, an der Küste zur Sulusee. Zeichne den Punkt dort ein."
    ],
    finalText:"Ich zeichne Sandakan an der Nordostküste der Insel Borneo in den malaysischen Bundesstaat Sabah ein. Die Stadt liegt an der Sulusee."
  },
  {
    id:"g2-sandokan-q2",subject:"gsel2",topic:"Piraten",kind:"homework",type:"writing",
    title:"Sandokan – Aufgabe 2: Film",summary:"Kurze Inhaltsangabe zum Fernsehmehrteiler.",
    question:"Informiere dich über den Film bzw. Fernsehmehrteiler Sandokan von 1976. Schreibe mit eigenen Worten eine kurze Inhaltsangabe weiter. Die Buchseite gibt den Anfang vor: Sandokan kämpft im 19. Jahrhundert von Mompracem aus gegen die Engländer; sein Gegner ist James Brooke.",
    helps:[
      "Denke an drei Fragen: Wer ist die Hauptfigur? Gegen wen kämpft sie? Welche Menschen sind an ihrer Seite?",
      "Wichtige Namen: Sandokan, sein Freund Yanez, sein Gegner James Brooke und Marianna. Schreibe sachlich im Präsens; erfinde keine Filmszenen."
    ],
    finalText:"In dem Fernsehmehrteiler kämpft der Pirat Sandokan im 19. Jahrhundert gegen die britischen Eroberer in Südostasien. Sein Gegner ist James Brooke, der in Sarawak Macht ausübt. Von Mompracem aus versucht Sandokan, sich gegen ihn zu wehren. Sein Freund Yanez unterstützt ihn. Außerdem lernt Sandokan die Engländerin Marianna kennen."
  },
  {
    id:"g2-sandokan-q3",subject:"gsel2",topic:"Piraten",kind:"homework",type:"writing",
    title:"Sandokan – Aufgabe 3: Kolonialmächte",summary:"Heutige Länder mit Karte M4 zuordnen.",
    question:"Bestimme mit M4, welche heutigen Gebiete und Staaten in dieser Region unter britischer, niederländischer, portugiesischer oder französischer Herrschaft standen. Beachte: M4 zeigt 1914, nicht genau das Jahr 1845.",
    helps:[
      "Lies die Legende unter M4. Suche zuerst die alten Namen Britisch-Malaya, Niederländisch-Ostindien, Französisch-Indochina und Osttimor.",
      "Übersetze die damaligen Bezeichnungen in heutige Ländernamen. Hinweis: Ein Schutzgebiet ist nicht genau dasselbe wie eine direkt verwaltete Kolonie."
    ],
    finalText:"Um 1914: Großbritannien – Teile des heutigen Malaysia und Singapur; Brunei stand unter britischem Schutz. Niederlande – das heutige Indonesien. Frankreich – das heutige Vietnam, Laos und Kambodscha. Portugal – Osttimor, heute Timor-Leste. Die Grenzen und Herrschaftsformen waren nicht überall so wie heute."
  },
  {
    id:"g2-sandokan-q4",subject:"gsel2",topic:"Piraten",kind:"homework",type:"writing",
    title:"Sandokan – Aufgabe 4: Mompracem",summary:"Die vermutete Lage der Insel beschreiben.",
    question:"Beschreibe mit M3 und dem Text „Wo liegt Mompracem?“ die genaue Lage der Insel Mompracem. Unterscheide zwischen der Karte und der Vermutung der Journalisten.",
    helps:[
      "Sieh auf M3: Welche große Insel liegt südöstlich davon? Welche Stadt ist in der Nähe?",
      "Nutze Ortsbegriffe: vor der Nordwestküste Borneos, im Südchinesischen Meer, vor dem heutigen Malaysia. Der Buchtext vermutet, dass Mompracem die heutige Insel Keraman/Kuraman ist."
    ],
    finalText:"Mompracem soll vor der Nordwestküste Borneos im Südchinesischen Meer gelegen haben, vor dem heutigen malaysischen Bundesstaat Sabah. Auf M3 liegt sie im Bereich nahe Kota Kinabalu. Der Buchtext berichtet, dass Journalisten Mompracem mit der heutigen Insel Keraman/Kuraman in Verbindung bringen. Das ist jedoch nicht sicher bewiesen."
  },
  {
    id:"g2-sandokan-q5",subject:"gsel2",topic:"Piraten",kind:"homework",type:"writing",
    title:"Sandokan – Aufgabe 5: Freiheitskämpfer?",summary:"Die Aussage eines Bewohners aus Sarawak begründet bewerten.",
    question:"„Sandokan war kein Krimineller, sondern ein Freiheitskämpfer.“ Bewerte diese Aussage eines Bewohners aus Sarawak. Begründe deine Meinung mit dem Text und erkläre, warum jemand anderer Meinung sein könnte.",
    helps:[
      "Sammle zuerst zwei Informationen aus dem Text: Gegen wen soll Sandokan gekämpft haben? Mit wem war er verbündet?",
      "Schreibe mindestens einen Satz, der die Aussage unterstützt, und einen Gegenpunkt. Unterscheide zwischen der Romanfigur, überlieferten Berichten und sicheren historischen Belegen.",
      "Ein möglicher Aufbau: „Ich kann die Aussage verstehen, weil ... Allerdings ... Deshalb denke ich ...“"
    ],
    finalText:"Ich kann die Aussage verstehen, weil Sandokan laut dem Text zusammen mit Syarif Osman gegen die britische Kolonialherrschaft kämpfte. Menschen aus der Region konnten ihn deshalb als Verteidiger ihrer Heimat ansehen. Gleichzeitig wird Sandokan als Pirat beschrieben. Ohne genauere Belege zu seinen Handlungen lässt sich nicht sicher sagen, ob er ausschließlich ein Freiheitskämpfer war. Wichtig ist, aus wessen Sicht man ihn beurteilt."
  },
  {id:"g2-sandokan-practice-1",subject:"gsel2",topic:"Piraten",kind:"practice",type:"mcq",
   title:"Wo liegt Sandakan?",question:"Wo liegt die Stadt Sandakan heute?",options:["An der Nordostküste Borneos in Malaysia","Auf Java in Indonesien","Auf der Malaiischen Halbinsel bei Kuala Lumpur","Im Osten von Thailand"],correct:0},
  {id:"g2-sandokan-practice-2",subject:"gsel2",topic:"Piraten",kind:"practice",type:"mcq",
   title:"Wer war James Brooke?",question:"Welche Rolle spielt James Brooke in der Sandokan-Geschichte?",options:["Sandokans britischer Gegenspieler","Sandokans Freund Yanez","Der Schriftsteller des Romans","Der Kapitän der Vitalienbrüder"],correct:0},
  {id:"g2-sandokan-practice-3",subject:"gsel2",topic:"Piraten",kind:"practice",type:"mcq",
   title:"Was ist über Mompracem sicher?",question:"Was lässt sich aus dem Text über Mompracem ableiten?",options:["Alte Karten zeigen eine Insel mit diesem Namen, die heutige Zuordnung bleibt unsicher","Mompracem war sicher Java","Es gab die Insel nachweislich nie","Mompracem liegt heute mitten in Bangkok"],correct:0},
  {id:"g2-sandokan-practice-4",subject:"gsel2",topic:"Piraten",kind:"practice",type:"mcq",
   title:"Was zeigt M4?",question:"Warum kann M4 nicht alle Machtverhältnisse zur Zeit des historischen Sandokan genau zeigen?",options:["Weil M4 die Verhältnisse von 1914 zeigt, Sandokans Geschichte aber um 1845 spielt","Weil M4 nur die Karibik zeigt","Weil M4 gar keine Grenzen enthält","Weil Malaysia in Europa liegt"],correct:0},

  {id:"g2-piraten-practice-fc1",subject:"gsel2",topic:"Piraten",kind:"practice",type:"flashcard",
   title:"Flashkarte: Pirat",question:"Was ist ein Pirat?",answer:"Ein Pirat überfällt Schiffe oder Küstenorte und handelt dabei ohne staatliche Erlaubnis."},
  {id:"g2-piraten-practice-fc2",subject:"gsel2",topic:"Piraten",kind:"practice",type:"flashcard",
   title:"Flashkarte: Kaperfahrer",question:"Was unterscheidet einen Kaperfahrer von einem Piraten?",answer:"Ein Kaperfahrer hat eine staatliche Erlaubnis, meist einen Kaperbrief."},
  {id:"g2-piraten-practice-fc3",subject:"gsel2",topic:"Piraten",kind:"practice",type:"flashcard",
   title:"Flashkarte: Kaperbrief",question:"Was ist ein Kaperbrief?",answer:"Eine schriftliche Erlaubnis, bestimmte feindliche Schiffe anzugreifen."},
  {id:"g2-piraten-practice-mcq1",subject:"gsel2",topic:"Piraten",kind:"practice",type:"mcq",
   title:"Piraten oder Kaperfahrer?",question:"Wer handelt mit staatlicher Erlaubnis?",options:["Pirat","Kaperfahrer","Händler","Hafenmeister"],correct:1},
  {id:"g2-piraten-practice-mcq2",subject:"gsel2",topic:"Piraten",kind:"practice",type:"mcq",
   title:"Warum Kaperbriefe?",question:"Warum vergaben Herrscher Kaperbriefe?",options:["Um Gegner zu schwächen","Damit Schiffe schneller wurden","Damit Häfen größer wurden","Um neue Karten zu zeichnen"],correct:0},
  {id:"g2-piraten-practice-mcq3",subject:"gsel2",topic:"Piraten",kind:"practice",type:"mcq",
   title:"Vitalienbrüder",question:"Für wen wurden die Vitalienbrüder später zum Problem?",options:["Für die Hanse","Für die Römer","Für die Wikinger","Für die Maya"],correct:0},
  {id:"g2-piraten-practice-cloze",subject:"gsel2",topic:"Piraten",kind:"practice",type:"cloze",
   title:"Lückentext",question:"Setze die passenden Wörter ein.",
   template:"Ein {0} handelt ohne staatliche Erlaubnis. Ein {1} besitzt einen Kaperbrief.",
   gaps:[
     {options:["Pirat","Händler","Soldat"],correct:0},
     {options:["Kaperfahrer","Fischer","Koch"],correct:0}
   ]},

  {
    id:"g2-piraten-homework-1",subject:"gsel2",topic:"Piraten",kind:"homework",type:"guided",
    title:"Anne Bonny: Wie wurde sie Piratin?",summary:"Geführte Hilfe zur Hausaufgabe.",
    question:"Erkläre kurz, wie Anne Bonny Piratin wurde.",
    steps:[
      {prompt:"Wo hielt sich Anne Bonny häufig auf?",options:["In Piratentavernen","In einem Kloster","In einer Burg"],correct:0},
      {prompt:"Mit wem floh sie schließlich?",options:["Mit Calico Jack","Mit einem Händler","Mit einem Richter"],correct:0},
      {prompt:"Was machten sie danach?",options:["Sie stahlen ein Schiff und überfielen andere Schiffe","Sie eröffneten eine Schule","Sie wurden Fischer"],correct:0}
    ],
    finalText:"Anne Bonny hielt sich häufig in Piratentavernen auf und verliebte sich in Calico Jack. Weil eine Trennung von ihrem Ehemann schwierig war, floh sie mit Jack. Gemeinsam stahlen sie ein Schiff und überfielen andere Schiffe."
  },
  {
    id:"g2-piraten-homework-2",subject:"gsel2",topic:"Piraten",kind:"homework",type:"guided",
    title:"Warum wurden Frauen an Bord oft nicht erkannt?",summary:"Geführte Hilfe zur Hausaufgabe.",
    question:"Erkläre, warum Frauen auf Piratenschiffen oft nicht erkannt wurden.",
    steps:[
      {prompt:"Welche Kleidung trugen Anne Bonny und Mary Read auf See?",options:["Männerkleidung","Festkleider","Uniformen der Hanse"],correct:0},
      {prompt:"Was schlossen viele Menschen damals aus der Kleidung?",options:["Sie hielten die Personen für Männer","Sie hielten sie für Händler","Sie hielten sie für Kinder"],correct:0}
    ],
    finalText:"Anne Bonny und Mary Read trugen auf See Männerkleidung. Kleidung zeigte damals stark, welcher Gruppe jemand zugerechnet wurde. Deshalb wurden sie häufig für Männer gehalten."
  },

  {id:"g2-piraten-quiz-1",subject:"gsel2",topic:"Piraten",kind:"quiz",type:"mcq",title:"Quizfrage 1",
   question:"Was ist der wichtigste Unterschied zwischen Pirat und Kaperfahrer?",options:["Kaperfahrer hat staatliche Erlaubnis","Piraten fahren nur nachts","Kaperfahrer haben größere Schiffe","Piraten leben nur in der Karibik"],correct:0},
  {id:"g2-piraten-quiz-2",subject:"gsel2",topic:"Piraten",kind:"quiz",type:"mcq",title:"Quizfrage 2",
   question:"Was ist ein Kaperbrief?",options:["Eine Landkarte","Eine schriftliche Erlaubnis für Angriffe auf bestimmte Feinde","Ein Vertrag für einen Hafen","Eine Liste der Beute"],correct:1},
  {id:"g2-piraten-quiz-3",subject:"gsel2",topic:"Piraten",kind:"quiz",type:"mcq",title:"Quizfrage 3",
   question:"Warum vergaben Herrscher Kaperbriefe?",options:["Um Gegner zu schwächen","Um Piratenkleidung zu bestimmen","Um neue Häfen zu bauen","Um Schiffe zu verkaufen"],correct:0},
  {id:"g2-piraten-quiz-4",subject:"gsel2",topic:"Piraten",kind:"quiz",type:"mcq",title:"Quizfrage 4",
   question:"Mit wem werden die Vitalienbrüder besonders verbunden?",options:["Klaus Störtebeker","Marco Polo","Kolumbus","Napoleon"],correct:0},
  {id:"g2-piraten-quiz-5",subject:"gsel2",topic:"Piraten",kind:"quiz",type:"mcq",title:"Quizfrage 5",
   question:"Wo lag Port Royal?",options:["Jamaika","Island","Norwegen","Indien"],correct:0},
  {id:"g2-piraten-quiz-6",subject:"gsel2",topic:"Piraten",kind:"quiz",type:"mcq",title:"Quizfrage 6",
   question:"Warum wurden Anne Bonny und Mary Read an Bord oft nicht als Frauen erkannt?",options:["Sie trugen Männerkleidung","Sie waren nie an Deck","Sie sprachen nicht","Sie hatten Masken"],correct:0},
  {id:"g2-piraten-quiz-7",subject:"gsel2",topic:"Piraten",kind:"quiz",type:"mcq",title:"Quizfrage 7",
   question:"Für wen wurden die Vitalienbrüder später zum Problem?",options:["Für die Hanse","Für die Römer","Für die Wikinger","Für die Ägypter"],correct:0},
  {id:"g2-piraten-quiz-8",subject:"gsel2",topic:"Piraten",kind:"quiz",type:"mcq",title:"Quizfrage 8",
   question:"Was konnten begnadigte Piraten später tun?",options:["Als Piratenjäger arbeiten","König werden","Nur noch an Land leben","Keine Schiffe mehr sehen"],correct:0},
  {
    id:"m-winkel-lernen-1",subject:"mathe",topic:"Winkelmessen",kind:"lesson",type:"lesson",
    title:"Winkel mit dem Geodreieck messen",summary:"So legst du das Geodreieck richtig an.",
    videoUrl:"https://www.youtube.com/watch?v=-GrYGqMHwxg",
    videoLabel:"Lernvideo: Winkel messen und zeichnen",
    sections:[
      {heading:"1. Mittelpunkt auf den Scheitelpunkt",text:"Lege den Mittelpunkt des Geodreiecks genau auf den Scheitelpunkt des Winkels."},
      {heading:"2. Grundlinie auf einen Schenkel",text:"Drehe das Geodreieck so, dass die Grundlinie genau auf einem Schenkel des Winkels liegt."},
      {heading:"3. Richtige Skala ablesen",text:"Beginne bei der 0 auf dem angelegten Schenkel. Lies dort ab, wo der zweite Schenkel die Gradskala trifft."}
    ],
    memory:"Mittelpunkt auf den Scheitelpunkt · Grundlinie auf einen Schenkel · bei 0 beginnen."
  },
  {
    id:"m-winkel-practice-35",subject:"mathe",topic:"Winkelmessen",kind:"practice",type:"anglemeasure",
    title:"Winkel messen: 35°",question:"Lege das Geodreieck richtig an und miss den Winkel.",targetAngle:35,baseDeg:0
  },
  {
    id:"m-winkel-practice-70",subject:"mathe",topic:"Winkelmessen",kind:"practice",type:"anglemeasure",
    title:"Winkel messen: 70°",question:"Lege das Geodreieck richtig an und miss den Winkel.",targetAngle:70,baseDeg:18
  },
  {
    id:"m-winkel-practice-115",subject:"mathe",topic:"Winkelmessen",kind:"practice",type:"anglemeasure",
    title:"Winkel messen: 115°",question:"Lege das Geodreieck richtig an und miss den Winkel.",targetAngle:115,baseDeg:-14
  },
  {
    id:"m-winkel-practice-145",subject:"mathe",topic:"Winkelmessen",kind:"practice",type:"anglemeasure",
    title:"Winkel messen: 145°",question:"Lege das Geodreieck richtig an und miss den Winkel.",targetAngle:145,baseDeg:8
  },
  {
    id:"m-winkel-quiz-1",subject:"mathe",topic:"Winkelmessen",kind:"quiz",type:"mcq",title:"Quizfrage 1",
    question:"Wo muss der Mittelpunkt des Geodreiecks liegen?",options:["Auf dem Scheitelpunkt des Winkels","Auf dem zweiten Schenkel","Irgendwo auf der Grundlinie","Am Rand des Blattes"],correct:0
  },
  {
    id:"m-winkel-quiz-2",subject:"mathe",topic:"Winkelmessen",kind:"quiz",type:"mcq",title:"Quizfrage 2",
    question:"Was muss beim Messen auf einem Schenkel des Winkels liegen?",options:["Die Grundlinie des Geodreiecks","Die lange Außenkante oben","Nur eine Ecke des Geodreiecks","Die Beschriftung 90°"],correct:0
  },
  {
    id:"m-winkel-quiz-3",subject:"mathe",topic:"Winkelmessen",kind:"quiz",type:"mcq",title:"Quizfrage 3",
    question:"An welcher Zahl musst du auf dem angelegten Schenkel mit dem Ablesen beginnen?",options:["0","45","90","180"],correct:0
  },
  {
    id:"m-winkel-quiz-4",subject:"mathe",topic:"Winkelmessen",kind:"quiz",type:"mcq",title:"Quizfrage 4",
    question:"Ein Winkel misst 70°. Welche Aussage stimmt?",options:["Er ist kleiner als ein rechter Winkel","Er ist genau ein rechter Winkel","Er ist größer als 90°","Er ist ein gestreckter Winkel"],correct:0
  },
  {
    id:"g1-staende-lernen-1",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"lesson",type:"lesson",
    title:"Die drei Stände einfach erklärt",summary:"Wer gehörte zu welchem Stand und welche Aufgaben hatte er?",
    sections:[
      {heading:"Was ist ein Stand?",text:"Im Mittelalter war die Gesellschaft in große Gruppen eingeteilt. Diese Gruppen nannte man Stände. Meist entschied die Geburt darüber, zu welchem Stand ein Mensch gehörte. Ein Wechsel in einen anderen Stand war nur selten möglich."},
      {heading:"1. Stand: die Geistlichen",text:"Zum ersten Stand gehörten zum Beispiel Bischöfe, Äbtissinnen, Priester, Mönche und Nonnen. Ihre wichtigste Aufgabe war die Religion: beten, Gottesdienste feiern und sich um das kirchliche Leben kümmern."},
      {heading:"2. Stand: der Adel",text:"Zum zweiten Stand gehörten der König, Herzöge, Grafen und Ritter. Sie herrschten über Land, entschieden über vieles und sollten das Land und die Menschen schützen. Viele Adlige besaßen Land und hatten mehr Rechte als andere Menschen."},
      {heading:"3. Stand: Bauern und arbeitende Menschen",text:"Zum dritten Stand gehörte der größte Teil der Bevölkerung. Viele waren Bauern. Sie arbeiteten auf den Feldern, stellten Lebensmittel her und mussten häufig Abgaben leisten. Sie hatten im Vergleich zum Adel nur wenige Rechte."},
      {heading:"Konnte man den Stand wechseln?",text:"Meist blieb ein Mensch in dem Stand, in den er hineingeboren wurde. Es gab aber Ausnahmen. Zum Beispiel konnte eine Tochter aus einer adligen Familie in ein Kloster gehen und Nonne werden."}
    ],
    memory:"1. Stand = Geistliche · 2. Stand = Adel · 3. Stand = Bauern und andere arbeitende Menschen."
  },
  {
    id:"g1-staende-lernen-verteilung",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"lesson",type:"lesson",
    title:"Unterrichtsbild: Die mittelalterliche Ständegesellschaft",summary:"Das neue Tafelbild mit Gruppen, Aufgaben und Größenverhältnissen.",
    diagram:"estate-pyramid",
    sections:[
      {heading:"Die Ordnung galt als gottgewollt",text:"Das Schaubild zeigt die Gesellschaft als feste, von Gott gewollte Ordnung. Der Stand wurde meist durch die Geburt bestimmt und blieb gewöhnlich bis zum Tod bestehen. Die Ordnung war streng hierarchisch."},
      {heading:"König, Geistliche und Adel",text:"An der Spitze steht der König. Zum ersten Stand gehören Geistliche wie Bischöfe, Äbte, Pfarrer, Mönche und Nonnen. Zum zweiten Stand gehören Adlige wie Herzöge, Grafen und Ritter. Zusammen bilden diese oberen Gruppen im Schaubild nur ungefähr 1 Prozent der Bevölkerung."},
      {heading:"Bauern",text:"Die Bauern bilden mit ungefähr 90 Prozent den mit Abstand größten Teil der Bevölkerung. Viele von ihnen sind unfrei oder von einem Feudalherrn abhängig. Auch Knechte und Mägde gehören zu diesem Bereich."},
      {heading:"Stadtbewohner und Randgruppen",text:"Ungefähr 9 Prozent leben im städtischen Bereich. Genannt werden Kaufleute und Patrizier, Handwerksmeister, Händler, Gesellen und Lohnarbeiter. Außerdem zeigt das Bild Randgruppen und Bettler."},
      {heading:"Die drei Aufgaben",text:"Der erste Stand betet, der zweite Stand schützt und der dritte Stand arbeitet. Diese einfache Einteilung sollte erklären und rechtfertigen, warum die Gruppen unterschiedliche Rechte, Aufgaben und Lebensbedingungen hatten."}
    ],
    memory:"Obere Stände ca. 1 % · Bauern ca. 90 % · Stadtbevölkerung und weitere Gruppen ca. 9 %."
  },
  {
    id:"g1-staende-lernen-m2",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"lesson",type:"lesson",
    title:"M2 verstehen: Was zeigt das Bild?",summary:"Das Bild Schritt für Schritt erklärt.",
    diagram:"three-estates",
    sections:[
      {heading:"Oben: Christus",text:"Ganz oben steht Christus. Damit zeigt der Zeichner: Die Ordnung der Gesellschaft soll von Gott kommen und von ihm gewollt sein."},
      {heading:"Links: die Geistlichen",text:"Die Geistlichen sollen beten. Auf dem Bild stehen sie für den ersten Stand und für die Kirche."},
      {heading:"Rechts: Adel und Ritter",text:"Der Adel soll beschützen. Ritter und Herrscher stehen für den zweiten Stand. Sie sollen für Sicherheit sorgen und das Land verteidigen."},
      {heading:"Unten: die Arbeitenden",text:"Bauern und andere arbeitende Menschen sollen arbeiten. Sie stehen für den dritten Stand und versorgen die Gesellschaft mit Lebensmitteln und Arbeit."},
      {heading:"Was will der Zeichner damit sagen?",text:"Der Zeichner stellt die drei Stände nicht als zufällige Einteilung dar. Er zeigt sie als feste Ordnung: Jeder Stand hat seine Aufgabe, und diese Ordnung soll von Gott bestimmt sein. So wurde erklärt, warum Menschen sehr unterschiedliche Rechte und Aufgaben hatten."}
    ],
    memory:"Die Bildaussage: Jeder Stand hat eine Aufgabe – beten, beschützen oder arbeiten – und diese Ordnung wird als von Gott gewollt dargestellt."
  },
  {
    id:"g1-staende-lernen-kritik",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"lesson",type:"lesson",
    title:"War diese Ordnung wirklich für alle gerecht?",summary:"Warum die Ständeordnung später kritisiert wurde.",
    sections:[
      {heading:"Lange Zeit",text:"Viele Menschen glaubten, die Ständeordnung sei von Gott gewollt. Deshalb wurde sie lange kaum infrage gestellt."},
      {heading:"Später gab es Kritik",text:"Ab dem 13. Jahrhundert wurde häufiger darüber nachgedacht, ob diese Ordnung gerecht war. Manche meinten, Bauern seien besonders wichtig, weil alle Menschen von ihrer Arbeit und ihren Lebensmitteln abhängig waren."},
      {heading:"Gleichheit vor Gott",text:"Auch innerhalb der Kirche gab es Gruppen, die stärker betonten, dass alle Menschen vor Gott gleich sind. Einige Orden lebten bewusst in Armut und Demut."}
    ],
    memory:"Die Ständeordnung wurde lange als gottgewollt angesehen, später aber zunehmend kritisiert."
  },
  {
    id:"g1-staende-lernen-kloster",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"lesson",type:"lesson",
    title:"Klöster im Mittelalter",summary:"Wie Mönche und Nonnen lebten und welche Aufgaben Klöster hatten.",
    sections:[
      {heading:"Leben im Kloster",text:"Mönche und Nonnen lebten gemeinsam in einem abgeschlossenen Kloster. Geleitet wurde es von einem Abt oder einer Äbtissin."},
      {heading:"Wichtige Regeln",text:"Zum Klosterleben gehörten Armut, Gehorsam und der Verzicht auf Ehe und Familie. Beten und Arbeiten gehörten zum Alltag."},
      {heading:"Aufgaben der Klöster",text:"Klöster übernahmen viele Aufgaben, für die heute zum Beispiel Schulen, Universitäten, Krankenhäuser oder soziale Einrichtungen zuständig sind. Sie halfen Armen und Kranken und vermittelten Wissen über Landwirtschaft und Handwerk."}
    ],
    memory:"Klöster waren nicht nur Orte des Gebets, sondern auch wichtige Orte für Bildung, Hilfe, Landwirtschaft und Handwerk."
  },

  {id:"g1-staende-practice-fc1",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"flashcard",
   title:"Flashkarte: Stand",question:"Was bedeutet „Stand“ im Mittelalter?",answer:"Ein Stand war eine gesellschaftliche Gruppe mit bestimmten Aufgaben, Rechten und Ansehen. Meist wurde man in seinen Stand hineingeboren."},
  {id:"g1-staende-practice-fc2",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"flashcard",
   title:"Flashkarte: erster Stand",question:"Wer gehörte zum ersten Stand?",answer:"Die Geistlichen, zum Beispiel Bischöfe, Priester, Mönche und Nonnen."},
  {id:"g1-staende-practice-fc3",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"flashcard",
   title:"Flashkarte: zweiter Stand",question:"Wer gehörte zum zweiten Stand?",answer:"Der Adel, zum Beispiel König, Herzöge, Grafen und Ritter."},
  {id:"g1-staende-practice-fc4",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"flashcard",
   title:"Flashkarte: dritter Stand",question:"Wer gehörte zum dritten Stand?",answer:"Vor allem Bauern und andere arbeitende Menschen. Sie bildeten den größten Teil der Bevölkerung."},

  {id:"g1-staende-practice-mcq1",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"mcq",
   title:"Aufgabe: drei Stände",question:"Welche Reihenfolge stimmt?",options:["Geistliche – Adel – Bauern und Arbeitende","Adel – Bauern – Geistliche","Bauern – Geistliche – Adel","Ritter – Händler – Könige"],correct:0},
  {id:"g1-staende-practice-mcq2",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"mcq",
   title:"Aufgabe: M2",question:"Welche Aussage passt am besten zu M2?",options:["Jeder Stand hat eine bestimmte Aufgabe, und die Ordnung wird als von Gott gewollt dargestellt.","Alle Menschen hatten dieselben Rechte.","Jeder konnte seinen Stand frei wählen.","Nur Bauern gehörten zur Gesellschaft."],correct:0},
  {id:"g1-staende-practice-mcq3",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"mcq",
   title:"Aufgabe: Kloster",question:"Welche Aufgabe hatten Klöster zusätzlich zum Gebet?",options:["Sie halfen bei Bildung, Kranken- und Armenfürsorge.","Sie waren nur Burgen für Ritter.","Sie dienten nur als Märkte.","Sie waren ausschließlich Gefängnisse."],correct:0},
  {id:"g1-staende-practice-verteilung-1",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"mcq",
   title:"Größte Gruppe",question:"Welche Gruppe stellt im neuen Schaubild ungefähr 90 Prozent der Bevölkerung?",options:["Bauern","Geistliche","Adlige","Kaufleute und Patrizier"],correct:0},
  {id:"g1-staende-practice-verteilung-2",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"mcq",
   title:"Gottgewollte Ordnung",question:"Was bedeutet im Schaubild „gottgewollte Ordnung“?",options:["Die Einteilung der Gesellschaft wurde als von Gott bestimmt dargestellt.","Jeder durfte seinen Stand täglich wechseln.","Nur der König durfte beten.","Alle Menschen hatten dieselben Rechte."],correct:0},

  {
    id:"g1-staende-homework-m2",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"homework",type:"guided",
    title:"M2 erklären: Wie wird die Ständeordnung begründet?",summary:"Geführte Hilfe zur Bildauswertung.",
    question:"Erkläre mit dem Bild M2, wie der Zeichner die Aufteilung der Gesellschaft in drei Stände begründet.",
    steps:[
      {prompt:"Wer steht ganz oben im Bild?",options:["Christus","Ein Bauer","Ein Ritter"],correct:0},
      {prompt:"Welche drei Aufgaben werden den Ständen zugeordnet?",options:["beten – beschützen – arbeiten","reisen – handeln – feiern","lernen – bauen – kämpfen"],correct:0},
      {prompt:"Welche Vorstellung steckt dahinter?",options:["Die Ordnung wird als von Gott gewollt dargestellt.","Jeder darf seinen Stand selbst wählen.","Die Stände sollen jedes Jahr wechseln."],correct:0}
    ],
    finalText:"Der Zeichner stellt die Ständeordnung als von Gott gewollt dar. Christus steht über den drei Ständen. Die Geistlichen sollen beten, der Adel soll beschützen und die Bauern beziehungsweise Arbeitenden sollen arbeiten. Dadurch wirkt die Aufteilung der Gesellschaft wie eine feste, von Gott bestimmte Ordnung."
  },
  {
    id:"g1-staende-homework-aufgabe5-s13",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"homework",type:"choicewriting",
    title:"Hausaufgabe – Aufgabe 5, Seite 13",summary:"Buchseite 13 · wähle den Buchweg A oder B",assignedDate:"2026-09-22",
    question:"Aufgabe 5 hat im Buch zwei Varianten. Wähle den Buchweg A oder B, der dir zugeteilt wurde, und verfasse deine Antwort.",
    variants:[
      {
        id:"A",title:"Buchweg A – Lebenswege früher und heute",
        question:"Wie steht es heute mit der Zugehörigkeit durch Geburt? Frage deine Eltern, ob sie anders leben als deine Großeltern.",
        guide:["Frage nach Beruf, Ausbildung, Wohnort oder Alltag deiner Großeltern.","Vergleiche damit das Leben deiner Eltern.","Erkläre, ob die Geburt heute noch genauso stark über den eigenen Lebensweg entscheidet wie im Mittelalter."],
        starter:"Meine Eltern leben anders als meine Großeltern, weil …",
        example:"Meine Eltern leben in einigen Bereichen anders als meine Großeltern. Sie konnten ihren Beruf und ihren Wohnort freier wählen. Heute entscheidet die Geburt nicht mehr wie im Mittelalter über einen festen Stand, trotzdem können Herkunft und Geld weiterhin Einfluss auf die Möglichkeiten eines Menschen haben."
      },
      {
        id:"B",title:"Buchweg B – bewusst einfach leben",
        question:"Auch heute leben Menschen bewusst einfach, zum Beispiel in einem Orden. Recherchiere Beispiele.",
        guide:["Suche ein oder zwei konkrete Gemeinschaften oder Orden aus.","Beschreibe kurz, worauf die Menschen verzichten und warum.","Mögliche Beispiele sind Franziskaner, Klarissen oder andere klösterliche Gemeinschaften."],
        starter:"Ein Beispiel für bewusst einfaches Leben ist …",
        example:"Ein Beispiel sind die Franziskaner. Sie orientieren sich am Vorbild von Franz von Assisi und legen Wert auf ein einfaches Leben, Gemeinschaft und Hilfe für andere. Auch Klarissen leben in einer klösterlichen Gemeinschaft und verzichten auf persönlichen Luxus."
      }
    ]
  },
  {
    id:"g1-staende-roleplay-1",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"practice",type:"roleplay",
    title:"Rollenspiel: Ein Tag im Mittelalter",question:"Wähle eine Rolle und entscheide in zwei Alltagssituationen.",
    roles:[
      {
        id:"bauer",icon:"🌾",name:"Bauer oder Bäuerin",profile:"Du gehörst zum dritten Stand. Du arbeitest auf dem Land, erzeugst Lebensmittel und musst häufig Abgaben oder Dienste leisten.",
        scenes:[
          {title:"Die Ernte",text:"Die Erntezeit beginnt. Der Grundherr fordert außerdem einen Teil deiner Ernte.",options:[
            {text:"Ich arbeite auf dem Feld und leiste die verlangten Abgaben.",feedback:"Das entspricht dem Alltag vieler abhängiger Bauern. Sie arbeiteten hart und mussten Abgaben oder Dienste leisten."},
            {text:"Ich bestimme ab heute selbst über das ganze Land.",feedback:"Das wäre für die meisten Bauern nicht möglich gewesen. Über Land und Rechte bestimmten meist Grundherren und Adlige."}
          ]},
          {title:"Gefahr für das Dorf",text:"Räuber bedrohen die Umgebung. Von welchem Stand wird Schutz erwartet?",options:[
            {text:"Vom Adel und von den Rittern.",feedback:"Genau. Nach der Vorstellung der Ständeordnung sollte der zweite Stand die Menschen und das Land beschützen."},
            {text:"Nur von den Bauernkindern.",feedback:"Nein. Schutz und Verteidigung wurden dem Adel und den Rittern als Aufgabe zugeschrieben."}
          ]}
        ],summary:"Du hast erlebt, wie viel Arbeit der dritte Stand leistete und wie wenig frei viele Bauern über ihr Leben bestimmen konnten."
      },
      {
        id:"ritter",icon:"🛡️",name:"Ritter oder Adlige",profile:"Du gehörst zum zweiten Stand. Du besitzt mehr Rechte und sollst herrschen, Land verwalten und Schutz bieten.",
        scenes:[
          {title:"Unruhe im Gebiet",text:"Ein Dorf bittet um Schutz. Welche Aufgabe passt zu deinem Stand?",options:[
            {text:"Ich organisiere den Schutz des Gebiets.",feedback:"Das passt zur mittelalterlichen Vorstellung: Der Adel sollte beschützen und verteidigen."},
            {text:"Ich ziehe ins Kloster und leite den Gottesdienst.",feedback:"Gebet und kirchliche Aufgaben gehörten vor allem zum ersten Stand, den Geistlichen."}
          ]},
          {title:"Leben mit Vorrechten",text:"Wer hatte in der Ständeordnung meist mehr Land und politische Rechte?",options:[
            {text:"Adlige und hohe Geistliche.",feedback:"Richtig. Die oberen Stände besaßen meist mehr Land, Ansehen und Rechte als Bauern."},
            {text:"Alle Menschen genau gleich.",feedback:"Nein. Rechte und Lebensbedingungen waren je nach Stand sehr ungleich verteilt."}
          ]}
        ],summary:"Du hast erlebt, dass der Adel Schutz bieten sollte, zugleich aber deutlich mehr Rechte und Besitz hatte."
      },
      {
        id:"kloster",icon:"🙏",name:"Mönch oder Nonne",profile:"Du gehörst zum ersten Stand. Dein Alltag besteht aus Gebet, Arbeit und dem Leben in einer klösterlichen Gemeinschaft.",
        scenes:[
          {title:"Ein kranker Reisender",text:"Ein kranker Mensch bittet am Kloster um Hilfe.",options:[
            {text:"Das Kloster versorgt ihn nach seinen Möglichkeiten.",feedback:"Das passt. Klöster übernahmen im Mittelalter unter anderem Kranken- und Armenfürsorge."},
            {text:"Das Kloster ist ausschließlich für Ritterturniere da.",feedback:"Nein. Klöster waren Orte des Gebets, der Arbeit, Bildung und Fürsorge."}
          ]},
          {title:"Der Tagesablauf",text:"Was gehört besonders zum Leben in einem Kloster?",options:[
            {text:"Beten und arbeiten.",feedback:"Richtig. Gebet, Arbeit, Gehorsam und das gemeinschaftliche Leben prägten den Alltag."},
            {text:"Nur Handel und Feste feiern.",feedback:"Nein. Klosterleben war von Regeln, Gebet, Arbeit und Verzicht geprägt."}
          ]}
        ],summary:"Du hast erlebt, dass Klöster religiöse Orte waren, aber auch Bildung, Arbeit und Hilfe für andere ermöglichten."
      },
      {
        id:"handwerk",icon:"🔨",name:"Handwerker oder Handwerkerin",profile:"Du gehörst zum dritten Stand und lebst in einer Stadt. Du lernst und arbeitest in einem Handwerk.",
        scenes:[
          {title:"In der Werkstatt",text:"Was prägt deinen Alltag am stärksten?",options:[
            {text:"Ich stelle Waren her und lerne mein Handwerk.",feedback:"Das passt. Lehrlinge, Gesellen und Meister arbeiteten in städtischen Werkstätten."},
            {text:"Ich entscheide als König über das ganze Reich.",feedback:"Nein. Ein Handwerker gehörte zum arbeitenden dritten Stand, nicht zum Königtum."}
          ]},
          {title:"Stand durch Geburt",text:"Kannst du deinen gesellschaftlichen Stand völlig frei auswählen?",options:[
            {text:"Meist nicht; Herkunft und Geburt bestimmen sehr viel.",feedback:"Richtig. Ein Wechsel war möglich, aber für die meisten Menschen selten und schwierig."},
            {text:"Ja, jeder wechselt seinen Stand jedes Jahr.",feedback:"Nein. Die Ständeordnung war fest und wurde meist durch Geburt bestimmt."}
          ]}
        ],summary:"Du hast erlebt, dass auch Stadtbewohner arbeiteten und zur Gesellschaft gehörten, ihre Möglichkeiten aber von Herkunft und Ordnung begrenzt waren."
      }
    ]
  },

  {id:"g1-staende-quiz-1",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"quiz",type:"mcq",title:"Quizfrage 1",
   question:"Wer gehörte zum ersten Stand?",options:["Geistliche","Bauern","Ritter","Händler"],correct:0},
  {id:"g1-staende-quiz-2",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"quiz",type:"mcq",title:"Quizfrage 2",
   question:"Wer gehörte zum zweiten Stand?",options:["Adlige und Ritter","Mönche und Nonnen","Bauern","Handwerker allein"],correct:0},
  {id:"g1-staende-quiz-3",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"quiz",type:"mcq",title:"Quizfrage 3",
   question:"Welcher Stand umfasste den größten Teil der Bevölkerung?",options:["Der dritte Stand","Der erste Stand","Der zweite Stand","Keiner der Stände"],correct:0},
  {id:"g1-staende-quiz-4",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"quiz",type:"mcq",title:"Quizfrage 4",
   question:"Was zeigt M2 über die Ständeordnung?",options:["Sie wird als von Gott gewollt dargestellt.","Sie soll jeden Monat wechseln.","Alle Menschen sind Ritter.","Nur Geistliche dürfen arbeiten."],correct:0},
  {id:"g1-staende-quiz-5",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"quiz",type:"mcq",title:"Quizfrage 5",
   question:"Was gehörte zu den Aufgaben mittelalterlicher Klöster?",options:["Bildung sowie Armen- und Krankenfürsorge","Nur der Bau von Burgen","Nur Handel mit Schiffen","Nur das Einsammeln von Steuern"],correct:0},
  {id:"g1-staende-quiz-6",subject:"gsel1",topic:"Die drei Stände im Mittelalter",kind:"quiz",type:"mcq",title:"Quizfrage 6",
   question:"Warum wurde die Ständeordnung später kritisiert?",options:["Weil manche die Bedeutung der Bauern und die Gleichheit der Menschen stärker betonten.","Weil es keine Bauern mehr gab.","Weil Ritter keine Rüstungen mehr trugen.","Weil Klöster verboten wurden."],correct:0}
,
  {id:"d-balladen-lesson-1",subject:"deutsch",topic:"Balladen",kind:"lesson",type:"lesson",title:"Balladen erkennen",summary:"Geschichte, Spannung, Gefühle und Gedichtform.",sections:[
    {heading:"Was ist eine Ballade?",text:"Eine Ballade erzählt eine Geschichte in Gedichtform. In den Unterrichtsnotizen werden besonders Geschichte/Handlung, Spannung, Gefühle und die Gedichtform als Merkmale genannt."},
    {heading:"John Maynard",text:"In der Ballade fährt ein Schiff über den Eriesee. Auf dem Schiff bricht Feuer aus. John Maynard bleibt am Steuer, bringt das Schiff zum Ufer und rettet die Fahrgäste. Er selbst stirbt und wird anschließend geehrt."},
    {heading:"Inhaltsangabe",text:"Eine Inhaltsangabe ist kurz und sachlich. Sie wird im Präsens, in eigenen Worten, in der dritten Person und in zeitlicher Reihenfolge geschrieben. Eigene Meinung und künstliche Spannung gehören nicht hinein."}
  ],memory:"Inhaltsangabe = Präsens + sachlich + eigene Worte + richtige Reihenfolge."},
  {id:"d-balladen-practice-1",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",title:"Regel der Inhaltsangabe",question:"Welche Formulierung passt zu einer Inhaltsangabe?",options:["Das Schiff fährt über den Eriesee.","Ich finde John Maynard unglaublich mutig!","Plötzlich passiert etwas unfassbar Schreckliches!","Du musst dir vorstellen, wie schlimm das ist."],correct:0},
  {id:"d-balladen-practice-2",subject:"deutsch",topic:"Balladen",kind:"practice",type:"mcq",title:"Welche Zeitform?",question:"In welcher Zeitform wird die Inhaltsangabe geschrieben?",options:["Präsens","Präteritum","Futur","Perfekt"],correct:0},
  {
    id:"d-balladen-homework-main",subject:"deutsch",topic:"Balladen",kind:"homework",type:"writing",
    title:"John Maynard: Inhaltsangabe Schritt für Schritt",
    summary:"Aus Einleitung und vier kleinen Abschnitten entsteht deine vollständige Inhaltsangabe.",
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

  {id:"n-optik-lesson-symbols",subject:"natur",topic:"Licht und Optik",kind:"lesson",type:"lesson",title:"Schattenwurf: G, g, B und b",summary:"Die vier Zeichen sicher unterscheiden.",diagram:"shadow-symbols",sections:[
    {heading:"G – Gegenstandsgröße",text:"G ist die Größe bzw. Höhe des Gegenstands. Sie wird senkrecht am Gegenstand gemessen."},
    {heading:"g – Gegenstandsweite",text:"g ist der Abstand von der Lichtquelle bis zum Gegenstand. Sie wird waagerecht entlang der optischen Achse gemessen."},
    {heading:"B – Bildgröße",text:"B ist die Größe bzw. Höhe des Schattenbildes auf dem Schirm. Sie wird senkrecht am Schirm gemessen."},
    {heading:"b – Bildweite",text:"b ist der Abstand von der Lichtquelle bis zum Schirm bzw. Bild. Sie wird waagerecht entlang der optischen Achse gemessen."}
  ],memory:"Großbuchstaben G und B = Größen/Höhen. Kleinbuchstaben g und b = Weiten/Abstände von der Lichtquelle."},
  {id:"n-optik-practice-symbol-g",subject:"natur",topic:"Licht und Optik",kind:"practice",type:"flashcard",title:"G",question:"Wofür steht G?",answer:"G = Gegenstandsgröße: die Höhe des Gegenstands."},
  {id:"n-optik-practice-symbol-gsmall",subject:"natur",topic:"Licht und Optik",kind:"practice",type:"flashcard",title:"g",question:"Wofür steht g?",answer:"g = Gegenstandsweite: Abstand von der Lichtquelle zum Gegenstand."},
  {id:"n-optik-practice-symbol-B",subject:"natur",topic:"Licht und Optik",kind:"practice",type:"flashcard",title:"B",question:"Wofür steht B?",answer:"B = Bildgröße: Höhe des Schattenbildes auf dem Schirm."},
  {id:"n-optik-practice-symbol-bsmall",subject:"natur",topic:"Licht und Optik",kind:"practice",type:"flashcard",title:"b",question:"Wofür steht b?",answer:"b = Bildweite: Abstand von der Lichtquelle bis zum Schirm/Bild."},
  {id:"n-optik-practice-where",subject:"natur",topic:"Licht und Optik",kind:"practice",type:"mcq",title:"Was wird waagerecht eingetragen?",question:"Welche beiden Größen sind Abstände von der Lichtquelle und werden entlang der Achse eingetragen?",options:["g und b","G und B","G und g","B und b"],correct:0},
  {id:"n-optik-lesson-shadow",subject:"natur",topic:"Licht und Optik",kind:"lesson",type:"lesson",title:"Schattenwurf konstruieren",summary:"Randstrahlen Schritt für Schritt zeichnen.",diagram:"shadow-construction",sections:[
    {heading:"1. Lichtquelle markieren",text:"Die punktförmige Lichtquelle ist der gemeinsame Startpunkt der Randstrahlen."},
    {heading:"2. Randstrahlen zeichnen",text:"Ziehe mit dem Lineal einen Strahl von der Lichtquelle über die obere Kante des Gegenstands bis zum Schirm. Wiederhole das über die untere Kante."},
    {heading:"3. Schatten ablesen",text:"Zwischen den beiden Treffpunkten auf dem Schirm liegt das Schattenbild. Dort wird B gemessen."},
    {heading:"4. Größen eintragen",text:"G am Gegenstand, B am Schirm, g von Lichtquelle bis Gegenstand und b von Lichtquelle bis Schirm."}
  ],memory:"Randstrahlen gehen immer von der Lichtquelle über die Kanten des Gegenstands bis zum Schirm."},
  {id:"n-optik-lesson-reflection",subject:"natur",topic:"Licht und Optik",kind:"lesson",type:"lesson",title:"Spiegelung mit dem Geodreieck",summary:"Lot, Winkel und reflektierten Strahl richtig einzeichnen.",diagram:"reflection",sections:[
    {heading:"1. Auftreffpunkt finden",text:"Markiere den Punkt, an dem der einfallende Lichtstrahl den Spiegel trifft."},
    {heading:"2. Lot zeichnen",text:"Lege das Geodreieck so an, dass du durch den Auftreffpunkt eine Linie im rechten Winkel (90°) zum Spiegel zeichnen kannst. Diese Hilfslinie heißt Lot."},
    {heading:"3. Einfallswinkel messen",text:"Miss den Winkel zwischen einfallendem Strahl und Lot – nicht zwischen Strahl und Spiegel."},
    {heading:"4. Gleichen Winkel abtragen",text:"Trage auf der anderen Seite des Lots genau denselben Winkel ab und zeichne dort den reflektierten Strahl."}
  ],memory:"Reflexionsgesetz: Einfallswinkel = Reflexionswinkel. Beide Winkel werden zum Lot gemessen."},
  {id:"n-optik-practice-reflection",subject:"natur",topic:"Licht und Optik",kind:"practice",type:"mcq",title:"Wo wird der Winkel gemessen?",question:"Zwischen welchen Linien misst man Einfalls- und Reflexionswinkel?",options:["Zwischen Lichtstrahl und Lot","Zwischen Lichtstrahl und Spiegel","Zwischen Spiegel und Tischkante","Zwischen zwei beliebigen Strahlen"],correct:0},
  {id:"n-optik-lesson-corner",subject:"natur",topic:"Licht und Optik",kind:"lesson",type:"lesson",title:"Winkelspiegel",summary:"Zwei Spiegelungen nacheinander verstehen.",sections:[
    {heading:"Zweimal spiegeln",text:"Bei einem rechtwinkligen Winkelspiegel wird der Lichtstrahl zuerst an einem Spiegel und danach am zweiten Spiegel reflektiert. An jedem Spiegel gilt erneut: Einfallswinkel = Reflexionswinkel."},
    {heading:"Beim Zeichnen",text:"Arbeite immer nur an einem Auftreffpunkt: Lot einzeichnen, gleichen Winkel auf die andere Seite übertragen, Strahl bis zum nächsten Spiegel verlängern und dort wiederholen."}
  ],memory:"Beim Winkelspiegel dieselben vier Schritte zweimal nacheinander anwenden."},
  {id:"n-optik-quiz-1",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 1",question:"Welche der folgenden Lichtquellen ist eine beleuchtete Lichtquelle?",options:["Sonne","Glühwürmchen","Mond","Taschenlampe"],correct:2,
   explanations:["Die Sonne erzeugt ihr Licht selbst und ist daher eine selbstleuchtende Lichtquelle.","Das Glühwürmchen erzeugt eigenes Licht und zählt zu den selbstleuchtenden Lichtquellen.","Der Mond leuchtet nicht von selbst, sondern wird von der Sonne beleuchtet.","Eine Taschenlampe erzeugt selbst Licht und ist somit eine selbstleuchtende Lichtquelle."]},
  {id:"n-optik-quiz-2",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 2",question:"Wie breitet sich Licht laut den Versuchen auf den Arbeitsblättern aus?",options:["In Wellenlinien","Geradlinig","In Bogenform um Hindernisse herum","Von einer Lichtquelle aus nur in eine Richtung"],correct:1,
   explanations:["Laut Arbeitsblatt breitet sich Licht nicht in Wellenlinien aus.","Die Versuche mit Blenden zeigen, dass sich Licht geradlinig ausbreitet.","Licht breitet sich geradlinig aus und macht keine Bögen um Hindernisse.","Eine Lichtquelle kann Licht in verschiedene Richtungen aussenden; die einzelnen Lichtwege verlaufen geradlinig."]},
  {id:"n-optik-quiz-3",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 3",question:"Wie wird ein sehr schmales Lichtbündel bezeichnet?",options:["Lichtstrahl","Optische Achse","Einfallslot","Lichtquelle"],correct:0,
   explanations:["Ein sehr schmales Lichtbündel nennt man Lichtstrahl.","Die optische Achse ist die gestrichelte Hilfslinie bei Schattenkonstruktionen.","Das Einfallslot ist eine Senkrechte auf einer Spiegelfläche.","Eine Lichtquelle sendet Licht aus, ist aber kein Lichtbündel."]},
  {id:"n-optik-quiz-4",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 4",question:"Wie gelangt Licht beim Lesen eines Buches in das Auge?",options:["Das Auge sendet Strahlen aus, die auf das Buch treffen.","Das Buch erzeugt eigenes Licht, das ins Auge fällt.","Licht einer Quelle trifft auf das Buch und fällt von dort ins Auge.","Licht wandert vom Auge zur Lampe und wird auf das Buch geworfen."],correct:2,
   explanations:["Das Auge sendet keine Strahlen aus; das Licht kommt von einer Lichtquelle.","Das Buch leuchtet nicht von selbst, sondern muss beleuchtet werden.","Man kann ein Buch nur lesen, wenn Licht einer Quelle darauf trifft und vom Buch ins Auge gelangt.","Der Lichtweg verläuft von der Lichtquelle über das Objekt zum Auge."]},
  {id:"n-optik-quiz-5",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 5",question:"Wie lautet das Reflexionsgesetz an einem ebenen Spiegel?",options:["Der Einfallswinkel ist doppelt so groß wie der Reflexionswinkel.","Der Einfallswinkel ist genauso groß wie der Reflexionswinkel.","Der Reflexionswinkel ist stets kleiner als der Einfallswinkel.","Der Einfallswinkel ist unabhängig vom Reflexionswinkel."],correct:1,
   explanations:["Einfallswinkel und Reflexionswinkel sind gleich groß.","Das Reflexionsgesetz besagt: Einfallswinkel = Reflexionswinkel.","Der Reflexionswinkel ist nicht kleiner, sondern gleich groß wie der Einfallswinkel.","Beide Winkel sind miteinander gekoppelt und stets gleich groß."]},
  {id:"n-optik-quiz-6",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 6",question:"Was versteht man unter dem Lot (Einfallslot) bei der Reflexion am Spiegel?",options:["Eine Waagerechte parallel zur Spiegelfläche","Den reflektierten Lichtstrahl","Eine Linie, die senkrecht auf der Spiegeloberfläche steht","Den Winkel zwischen Einfall und Reflexion"],correct:2,
   explanations:["Das Lot steht senkrecht auf dem Spiegel, nicht parallel dazu.","Der reflektierte Lichtstrahl ist nicht das Lot.","Das Lot wird im 90-Grad-Winkel senkrecht zur Spiegeloberfläche gezeichnet.","Das Lot ist eine Hilfslinie zur Messung von Einfalls- und Reflexionswinkel."]},
  {id:"n-optik-quiz-7",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 7",question:"Was bewirkt ein rechtwinkliger Winkelspiegel mit einem einfallenden Lichtstrahl?",options:["Er absorbiert das Licht vollständig.","Er wirft das Licht in die Richtung zurück, aus der es kam.","Er lenkt das Licht immer senkrecht nach oben ab.","Er lässt das Licht ohne Richtungsänderung durch."],correct:1,
   explanations:["Der Winkelspiegel reflektiert das Licht und absorbiert es nicht vollständig.","Durch die zweimalige Reflexion am rechtwinkligen Spiegel wird das Licht in die Herkunftsrichtung zurückgeworfen.","Die Richtung hängt vom einfallenden Strahl ab; sie ist nicht immer senkrecht nach oben.","Ein Spiegel reflektiert Licht und lässt es nicht ohne Richtungsänderung hindurch."]},
  {id:"n-optik-quiz-8",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 8",question:"Wofür steht der Kleinbuchstabe g bei der Schattenkonstruktion?",options:["Gegenstandsgröße","Gegenstandsweite","Bildgröße","Bildweite"],correct:1,
   explanations:["Für die Gegenstandsgröße steht der Großbuchstabe G.","Der Kleinbuchstabe g bezeichnet den Abstand zwischen Lichtquelle und Gegenstand.","Für die Bildgröße oder Schattengröße steht der Großbuchstabe B.","Für die Bildweite steht der Kleinbuchstabe b."]},
  {id:"n-optik-quiz-9",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 9",question:"Wie heißt die gestrichelte Mittellinie bei der Schattenkonstruktion?",options:["Einfallslot","Lichtstrahl","Optische Achse","Schattenlinie"],correct:2,
   explanations:["Das Einfallslot wird bei Spiegelreflexionen verwendet.","Lichtstrahlen werden als durchgezogene Linien von der Lichtquelle gezeichnet.","Die gestrichelte Orientierungslinie in der Mitte heißt optische Achse.","Der Begriff Schattenlinie wird nicht für diese Achse verwendet."]},
  {id:"n-optik-quiz-10",subject:"natur",topic:"Licht und Optik",kind:"quiz",type:"mcq",title:"Quizfrage 10",question:"Was passiert mit dem Bild auf dem Schirm, wenn die Öffnung einer Lochblende vergrößert wird?",options:["Das Bild wird schärfer und kleiner.","Die Lichtflecken werden größer und überschneiden sich.","Das Bild verschwindet vollständig.","Die Anordnung der Lichtpunkte kehrt sich um."],correct:1,
   explanations:["Durch eine größere Öffnung wird das Bild unschärfer, nicht schärfer.","Bei einer größeren Öffnung wachsen die Lichtflecken und überschneiden sich; das Bild wird heller, aber unschärfer.","Es fällt weiterhin Licht hindurch; das Bild wird lediglich unschärfer.","Die Reihenfolge der Lichtflecken bleibt auch bei größerer Öffnung unverändert."]},

  {id:"n-arbeit-lesson-1",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"lesson",type:"lesson",title:"Das muss für die Arbeit sitzen",summary:"Schattenwurf, Lochblende und Spiegelung in kleinen Schritten wiederholen.",resourceUrl:"Natur_Optik_Probe-Arbeit_Lerninsel.pdf",resourceLabel:"Vierseitige Probe-Arbeit als PDF",sections:[
    {heading:"1. Schattenwurf",text:"Merke zuerst die vier Zeichen: G = Gegenstandsgröße, g = Gegenstandsweite, B = Bildgröße, b = Bildweite. G und B sind Höhen. g und b sind Abstände von der Lichtquelle."},
    {heading:"2. Schatten konstruieren",text:"Zeichne Randstrahlen von der punktförmigen Lichtquelle über die obere und untere Kante des Gegenstands bis zum Schirm. Die beiden Treffpunkte begrenzen den Schatten."},
    {heading:"3. Lochblende",text:"Von jedem betrachteten Punkt gelangt nur ein schmaler Lichtstrahl durch das Loch. Die Strahlen kreuzen sich an der Öffnung. Deshalb erscheint das Bild auf dem Schirm auf dem Kopf und seitenverkehrt."},
    {heading:"4. Ebene Spiegel",text:"Am Auftreffpunkt zuerst das Lot im rechten Winkel zum Spiegel zeichnen. Einfallswinkel und Reflexionswinkel werden immer zum Lot gemessen und sind gleich groß."},
    {heading:"5. Winkelspiegel",text:"Bei zwei senkrecht zueinander stehenden Spiegeln wird zweimal reflektiert. An jedem Auftreffpunkt gilt wieder: erst Lot, dann gleichen Winkel auf der anderen Seite einzeichnen."}
  ],memory:"Reihenfolge beim Spiegel: Auftreffpunkt → Lot → Winkel zum Lot → gleichen Winkel abtragen → reflektierten Strahl zeichnen."},
  {id:"n-arbeit-practice-1",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"G oder g?",question:"Gesucht ist der Abstand von der Lichtquelle bis zum Gegenstand. Welches Zeichen gehört dazu?",options:["g","G","b","B"],correct:0},
  {id:"n-arbeit-practice-2",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"B oder b?",question:"Gesucht ist die Höhe des Schattenbildes auf dem Schirm. Welches Zeichen gehört dazu?",options:["B","b","G","g"],correct:0},
  {id:"n-arbeit-practice-3",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Randstrahl",question:"Wie wird beim Schattenwurf ein Randstrahl gezeichnet?",options:["Von der Lichtquelle über eine Kante des Gegenstands bis zum Schirm","Vom Gegenstand parallel zum Schirm","Nur vom Gegenstand bis zur Lichtquelle","Waagerecht durch die Bildmitte"],correct:0},
  {id:"n-arbeit-practice-4",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Lochblende",question:"Warum steht das Bild einer Kerzenflamme bei einer Lochblende auf dem Kopf?",options:["Die Lichtstrahlen kreuzen sich an der kleinen Öffnung","Der Schirm dreht das Bild um","Die Flamme spiegelt sich am Loch","Das Licht läuft immer nach unten"],correct:0},
  {id:"n-arbeit-practice-5",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Größere Lochblende",question:"Was passiert laut dem Unterrichtsmaterial, wenn die Öffnung der Lochblende größer wird?",options:["Das Bild wird heller, aber unschärfer","Das Bild wird kleiner und dunkler","Das Bild dreht sich um","Die Bildmitte verschwindet"],correct:0},
  {id:"n-arbeit-practice-6",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Lot richtig zeichnen",question:"Wie liegt das Lot zum Spiegel?",options:["Senkrecht, also im 90°-Winkel","Parallel zum Spiegel","Immer waagerecht","Immer im 45°-Winkel"],correct:0},
  {id:"n-arbeit-practice-7",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Winkel richtig messen",question:"Ein Lichtstrahl trifft einen Spiegel. Zwischen welchen Linien wird der Einfallswinkel gemessen?",options:["Zwischen einfallendem Strahl und Lot","Zwischen einfallendem Strahl und Spiegel","Zwischen Lot und Spiegel","Zwischen Spiegel und Blattrand"],correct:0},
  {id:"n-arbeit-practice-8",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Reflexionsgesetz anwenden",question:"Der Einfallswinkel zum Lot beträgt 32°. Wie groß ist der Reflexionswinkel?",options:["32°","58°","64°","90°"],correct:0},
  {id:"n-arbeit-practice-9",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"flashcard",title:"Zeichen-Blitzcheck",question:"Nenne G, g, B und b in dieser Reihenfolge.",answer:"G = Gegenstandsgröße · g = Gegenstandsweite · B = Bildgröße · b = Bildweite"},
  {id:"n-arbeit-practice-shadow-terms",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Begriffe am Schattenbild",question:"Welche vier Begriffe sollen auf der ersten Zeichnung des Arbeitsblatts zugeordnet werden?",options:["Gegenstand, Beobachtungsschirm, punktförmige Lichtquelle und Schattenbild","Spiegel, Lot, Einfallswinkel und Reflexionswinkel","Linse, Brennpunkt, Prisma und Spektrum","Lampe, Auge, Buch und Mond"],correct:0},
  {id:"n-arbeit-practice-shadow-axis",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Optische Achse",question:"Was ist die optische Achse oA in der Schattenkonstruktion?",options:["Eine gedachte Mittellinie, auf der Lichtquelle, Gegenstand und Schirm mittig und senkrecht angeordnet werden","Der obere Randstrahl","Die Höhe des Schattens","Die Oberfläche des Schirms"],correct:0},
  {id:"n-arbeit-practice-shadow-point",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Punktförmige Lichtquelle",question:"Warum eignet sich für die genaue Konstruktion eine punktförmige Lichtquelle?",options:["Weil genau festgelegt ist, von welchem Punkt die Randstrahlen beginnen und wo der Schatten begrenzt ist","Weil sie keinen Schatten erzeugt","Weil ihre Strahlen gekrümmt verlaufen","Weil der Schirm dadurch überflüssig wird"],correct:0},
  {id:"n-arbeit-practice-shadow-position",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Mittig und senkrecht",question:"Warum stehen Gegenstand und Schirm mittig und senkrecht auf der optischen Achse?",options:["Damit Größe und Lage des Schattenbildes eindeutig bestimmt werden können","Damit das Licht um den Gegenstand herumläuft","Damit G und g gleich groß sind","Damit kein Randstrahl gezeichnet werden muss"],correct:0},
  {id:"n-arbeit-practice-shadow-calc",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Konstruktionsaufgabe mit Zahlen",question:"Auf dem Arbeitsblatt gilt G = 2 cm, g = 6 cm und b = 9 cm. Wie groß wird das Schattenbild B?",options:["3 cm","2 cm","6 cm","9 cm"],correct:0},
  {id:"n-arbeit-practice-shadow-nearer",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"practice",type:"mcq",title:"Gegenstand näher an der Lichtquelle",question:"Was geschieht mit dem Schattenbild, wenn derselbe Gegenstand näher an die punktförmige Lichtquelle rückt und der Schirm stehen bleibt?",options:["Das Schattenbild wird größer","Das Schattenbild wird kleiner","Das Schattenbild bleibt immer gleich groß","Es entsteht grundsätzlich kein Schatten mehr"],correct:0},
  {id:"n-arbeit-quiz-1",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"quiz",type:"mcq",title:"Probe 1",question:"Welche beiden Größen sind Höhen?",options:["G und B","g und b","G und g","B und b"],correct:0},
  {id:"n-arbeit-quiz-2",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"quiz",type:"mcq",title:"Probe 2",question:"Welche beiden Größen werden von der Lichtquelle aus als Abstand gemessen?",options:["g und b","G und B","G und b","g und B"],correct:0},
  {id:"n-arbeit-quiz-3",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"quiz",type:"mcq",title:"Probe 3",question:"Was zeichnest du beim ebenen Spiegel als Erstes am Auftreffpunkt?",options:["Das Lot","Den Reflexionswinkel","Den Schirm","Die Bildweite"],correct:0},
  {id:"n-arbeit-quiz-4",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"quiz",type:"mcq",title:"Probe 4",question:"Ein Einfallswinkel beträgt 47°. Welcher Reflexionswinkel gehört dazu?",options:["47°","43°","94°","90°"],correct:0},
  {id:"n-arbeit-quiz-5",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"quiz",type:"mcq",title:"Probe 5",question:"Was bleibt bei einer größeren Lochblendenöffnung nach dem Arbeitsblatt grundsätzlich erhalten?",options:["Die Bildanordnung bzw. Bildmitte","Die gleiche Schärfe","Die gleiche Helligkeit","Die gleiche Lochgröße"],correct:0},
  {id:"n-arbeit-quiz-6",subject:"natur",topic:"Vorbereitung auf die Arbeit",kind:"quiz",type:"mcq",title:"Probe 6",question:"Was machst du am zweiten Spiegel eines Winkelspiegels?",options:["Das Reflexionsverfahren mit neuem Lot wiederholen","Den Strahl gerade durch den Spiegel zeichnen","Nur den ersten Winkel kopieren, ohne Lot","Den Strahl stoppen"],correct:0}

,
  {id:"n-light-basics-lesson-1",subject:"natur",topic:"Licht und Sehen",kind:"lesson",type:"lesson",title:"Lichtquellen und Sehen",summary:"Die Grundlagen aus den Arbeitsblättern.",sections:[
    {heading:"Warum brauchen wir Licht?",text:"Ohne Licht können wir nicht sehen. Unsere wichtigste natürliche Lichtquelle ist die Sonne."},
    {heading:"Natürliche und künstliche Lichtquellen",text:"Auf dem Arbeitsblatt stehen als Beispiele Sonne, Mond, Glühwürmchen, Taschenlampe und Fahrradlicht. Sonne und Glühwürmchen sind natürliche Lichtquellen; Taschenlampe und Fahrradlicht sind künstlich."},
    {heading:"Selbstleuchtend oder beleuchtet?",text:"Nicht alles, was hell erscheint, leuchtet selbst. Der Mond wird von der Sonne beleuchtet. Sonne, Taschenlampe, Fahrradlicht und Glühwürmchen senden selbst Licht aus."},
    {heading:"Wie sehen wir ein Buch?",text:"Licht von einer Lichtquelle fällt auf das Buch. Vom Buch gelangt Licht weiter in unser Auge. Erst dann können wir das Buch sehen."}
  ],memory:"Sehen: Lichtquelle → Gegenstand → Auge. Der Mond wird beleuchtet und leuchtet nicht selbst."},
  {id:"n-light-basics-practice-1",subject:"natur",topic:"Licht und Sehen",kind:"practice",type:"mcq",title:"Der Mond",question:"Welche Aussage passt zum Arbeitsblatt?",options:["Der Mond wird von der Sonne beleuchtet.","Der Mond erzeugt sein Licht selbst.","Der Mond ist eine künstliche Lichtquelle.","Der Mond reflektiert nur bei Vollmond Licht."],correct:0},
  {id:"n-light-basics-practice-2",subject:"natur",topic:"Licht und Sehen",kind:"practice",type:"mcq",title:"So können wir lesen",question:"Welcher Lichtweg ist richtig, wenn du ein beleuchtetes Buch liest?",options:["Lichtquelle → Buch → Auge","Auge → Buch → Lichtquelle","Buch → Lichtquelle → Auge","Auge → Lichtquelle → Buch"],correct:0},
  {id:"n-light-spread-lesson",subject:"natur",topic:"Ausbreitung des Lichts",kind:"lesson",type:"lesson",title:"Licht breitet sich geradlinig aus",summary:"Lichtstrahl, Lichtbündel und Blenden verstehen.",sections:[
    {heading:"Geradlinig",text:"Die Aufgaben mit den Blenden zeigen: Licht breitet sich geradlinig aus. Damit Licht durch mehrere Öffnungen gelangt, müssen die Öffnungen auf dem geraden Lichtweg liegen."},
    {heading:"Lichtstrahl",text:"Einen sehr schmal gedachten Lichtweg nennt man Lichtstrahl."},
    {heading:"Lichtbündel",text:"Viele Lichtstrahlen zusammen bilden ein Lichtbündel."}
  ],memory:"Licht breitet sich geradlinig aus. Viele Lichtstrahlen zusammen = Lichtbündel."},
  {id:"n-light-spread-practice",subject:"natur",topic:"Ausbreitung des Lichts",kind:"practice",type:"mcq",title:"Blenden",question:"Warum kann Licht durch mehrere Blenden bis zum Auge gelangen?",options:["Weil die passenden Öffnungen auf einem geraden Lichtweg liegen.","Weil Licht um jede Ecke läuft.","Weil jede Blende neues Licht erzeugt.","Weil das Auge Licht aussendet."],correct:0},

  {id:"e-vocab-lesson-1",subject:"englisch",topic:"Vokabeln & Sätze",kind:"lesson",type:"lesson",title:"Sich vorstellen",summary:"Fragen und Antworten aus dem Englischheft.",sections:[
    {heading:"Name",text:"What's your name? – My name is Omar. / I'm Omar."},
    {heading:"Wohnort",text:"Where do you live? – I live in Manchester. That's in England."},
    {heading:"Sport",text:"What sports do you like? – I like running and football."},
    {heading:"Weitere Wörter",text:"I was = ich war · nice to meet you = schön, dich kennenzulernen · to buy = kaufen"}
  ],memory:"What's your name? · Where do you live? · What sports do you like?"},
  {id:"e-vocab-city",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"flashcard",title:"city",question:"city",answer:"die Stadt / die Großstadt"},
  {id:"e-vocab-town",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"flashcard",title:"town",question:"town",answer:"die Stadt"},
  {id:"e-vocab-street",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"flashcard",title:"street",question:"street",answer:"die Straße"},
  {id:"e-vocab-walk",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"flashcard",title:"walk",question:"walk",answer:"(zu Fuß) gehen / wandern"},
  {id:"e-vocab-bus",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"flashcard",title:"bus",question:"bus",answer:"der Bus"},
  {id:"e-vocab-underground",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"flashcard",title:"underground",question:"underground",answer:"die U-Bahn"},
  {id:"e-vocab-train",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"flashcard",title:"train",question:"train",answer:"der Zug"},
  {id:"e-vocab-car",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"flashcard",title:"car",question:"car",answer:"das Auto"},
  {id:"e-vocab-ticket",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"flashcard",title:"ticket",question:"ticket",answer:"die Eintrittskarte"},
  {id:"e-sentence-name",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"mcq",title:"What's your name?",question:"Welche Antwort passt zu „What's your name?“",options:["My name is Omar.","I live in Manchester.","I like football.","That's in England."],correct:0},
  {id:"e-sentence-live",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"mcq",title:"Where do you live?",question:"Welche Antwort passt zu „Where do you live?“",options:["I live in Manchester.","My name is Omar.","I was.","Nice to meet you."],correct:0},
  {id:"e-sentence-sports",subject:"englisch",topic:"Vokabeln & Sätze",kind:"practice",type:"mcq",title:"Sports",question:"Welche Antwort passt zu „What sports do you like?“",options:["I like running and football.","I live in Manchester.","My name is Omar.","To buy."],correct:0}

];

const NATUR_LIGHT_TOPICS = new Set(["Licht und Optik","Licht und Sehen","Ausbreitung des Lichts"]);
function normalizeBuiltInTopic(item){
  if(item?.subject==="natur"&&NATUR_LIGHT_TOPICS.has(item.topic))item.topic="Licht";
  if(item?.subject==="natur"&&item.topic==="Vorbereitung auf die Arbeit")item.topic="Üben für die Arbeit";
  return item
}
DEFAULT_CONTENT.forEach(normalizeBuiltInTopic);

const CUSTOM_VOCAB_KEY="lerninsel_v8_custom_vocab";
function getCustomVocab(){try{return JSON.parse(localStorage.getItem(CUSTOM_VOCAB_KEY)||"[]")||[]}catch{return[]}}
function vocabItem(v){return {id:v.id,subject:"englisch",topic:v.topic||"Vokabeln & Sätze",kind:"practice",type:"vocab",title:v.en,question:v.en,answer:v.de,en:v.en,de:v.de,customVocab:true}}
function mergeCustomVocab(){getCustomVocab().forEach(v=>{if(!DEFAULT_CONTENT.some(i=>i.id===v.id))DEFAULT_CONTENT.push(vocabItem(v))})}
mergeCustomVocab();

function isVocabItem(i){
  return i?.subject==="englisch"&&i?.kind==="practice"&&["vocab","flashcard"].includes(i?.type)&&!!i?.question&&!!i?.answer
}
function vocabParts(i){return {en:String(i.en||i.question||"").trim(),de:String(i.de||i.answer||"").trim()}}
function vocabRecord(i,direction){
  const p=progressFor(i.id);p.vocab??={};p.vocab[direction]??={streak:0,nextDue:0,lastSeen:0};
  return p.vocab[direction]
}
function vocabIntervalDays(streak){return [0,1,3,7,14,30,60][Math.min(Math.max(0,streak),6)]}
function vocabDueEntries(items,direction="de-en"){
  const now=Date.now(),due=[];
  items.filter(isVocabItem).forEach(i=>{
    const rec=vocabRecord(i,direction);
    if(!rec.nextDue||rec.nextDue<=now)due.push({...i,_vocabDirection:direction,_practiceKey:i.id+"::"+direction,_dueAt:rec.nextDue||0})
  });
  for(let n=due.length-1;n>0;n--){const j=Math.floor(Math.random()*(n+1));[due[n],due[j]]=[due[j],due[n]]}
  return due.sort((a,b)=>(a._dueAt||0)-(b._dueAt||0))
}
function preparePracticeItems(items){
  return items.filter(i=>!isVocabItem(i))
}
function shuffledItems(items){
  const out=[...items];
  for(let n=out.length-1;n>0;n--){const j=Math.floor(Math.random()*(n+1));[out[n],out[j]]=[out[j],out[n]]}
  return out
}
function normalizeVocabAnswer(value){
  return String(value||"").toLocaleLowerCase("de-DE").replace(/[’‘]/g,"'").replace(/[.,!?;:"]/g,"").replace(/\s+/g," ").trim()
}
function vocabAnswerVariants(raw,direction){
  const out=new Set();
  String(raw||"").split(/\s*[\/;]\s*/).filter(Boolean).forEach(part=>{
    const withParentheses=part.replace(/[()]/g," ");
    const withoutParentheses=part.replace(/\([^)]*\)/g," ");
    [withParentheses,withoutParentheses].forEach(v=>{
      const n=normalizeVocabAnswer(v);if(!n)return;out.add(n);
      if(direction==="en-de")out.add(n.replace(/^(der|die|das|ein|eine)\s+/,""))
    })
  });
  return [...out]
}
function recordVocabResult(i,direction,ok){
  const rec=vocabRecord(i,direction),p=progressFor(i.id),now=Date.now();
  rec.lastSeen=now;
  if(ok){rec.streak=(rec.streak||0)+1;rec.nextDue=now+vocabIntervalDays(rec.streak)*86400000}
  else{rec.streak=0;rec.nextDue=now}
  p.attempts=(p.attempts||0)+1;p.updatedAt=now;saveLocal();
  syncStudentProgress(i.id);studentEvent(i.id,"vocab_checked",{direction,ok,streak:rec.streak,nextDue:rec.nextDue})
}

let role = localStorage.getItem(KEYS.role);
let authSession = JSON.parse(localStorage.getItem(KEYS.teacherAuth) || "null");
let teacherRoom = JSON.parse(localStorage.getItem(KEYS.teacherRoom) || "null");
let studentSession = JSON.parse(localStorage.getItem(KEYS.studentSession) || "null");
let parentSession = JSON.parse(localStorage.getItem(KEYS.parentSession) || "null");
let teacherTestMode = false;
let teacherTestReturnSession = null;
let teacherActiveTab = "content";
let teacherContentFilter = "all";
let teacherContentSearch = "";

let state = {
  student:null,
  items:[],
  progress:{},
  profile:null,
  teacher:{rooms:[],students:[],items:[],progress:{},events:[],profiles:[],parents:[],library:[],roomSubjects:{},studentSubjects:{}},
  currentSubject:null,
  currentTopic:null,
  practice:null,
  quiz:null,
  live:null
};

function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function isoToday(){return new Date().toISOString().slice(0,10)}
function formatDate(v){if(!v)return "";const d=new Date(v+"T12:00:00");return Number.isNaN(d.getTime())?v:d.toLocaleDateString("de-DE")}
function homeworkDateText(i){const a=i.assignedDate?`aufgegeben ${formatDate(i.assignedDate)}`:"";const d=i.dueDate?`Abgabe ${formatDate(i.dueDate)}`:"";return [a,d].filter(Boolean).join(" · ")}
function itemCategory(i){if(i.category)return i.category;if(i.kind==="homework")return "homework";if(i.customVocab)return "vocab";return "learning"}
function originalPagesHtml(i){
  const pages=i.originalPages||[];if(!pages.length)return "";
  return `<details class="lessonSection"><summary style="cursor:pointer;font-weight:850">📷 Originalseiten bei Bedarf anzeigen${i.sourcePages?` · ${esc(i.sourcePages)}`:""}</summary><div class="pageGallery">${pages.map((p,n)=>p.type==="application/pdf"?`<a class="pagePdf" href="${p.dataUrl}" target="_blank" rel="noopener">📄 ${esc(p.name||`Seite ${n+1}`)}</a>`:`<a href="${p.dataUrl}" target="_blank" rel="noopener"><img src="${p.dataUrl}" alt="Originalseite ${n+1}"></a>`).join("")}</div><div class="small">Zum Vergrößern auf eine Seite tippen.</div></details>`
}
function uid(){return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)+Date.now()}
function randomToken(len=8){const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";const a=new Uint8Array(len);crypto.getRandomValues(a);return [...a].map(n=>chars[n%chars.length]).join("")}
function roomCode(){return randomToken(8).match(/.{1,4}/g).join("-")}
function parentCode(){return randomToken(10).match(/.{1,5}/g).join("-")}
function quizCode(){return String(Math.floor(100000+Math.random()*900000))}
function teacherCodeVault(){
  try{
    const v=JSON.parse(localStorage.getItem(KEYS.teacherCodes)||"{}");
    return {students:v?.students||{},parents:v?.parents||{}}
  }catch{return {students:{},parents:{}}}
}
function saveTeacherAccessCode(kind,id,data){
  const v=teacherCodeVault();v[kind]??={};v[kind][id]={...data,roomId:teacherRoom?.roomId,updatedAt:Date.now()};
  localStorage.setItem(KEYS.teacherCodes,JSON.stringify(v))
}
function deleteTeacherAccessCode(kind,id){
  const v=teacherCodeVault();if(v[kind])delete v[kind][id];localStorage.setItem(KEYS.teacherCodes,JSON.stringify(v))
}
function savedTeacherAccessCode(kind,id){
  const x=teacherCodeVault()?.[kind]?.[id];return x&&x.roomId===teacherRoom?.roomId?x:null
}
function teacherAccessText(kind,id){
  const x=savedTeacherAccessCode(kind,id);if(!x)return "";
  const isStudent=kind==="students";
  const person=isStudent?(state.teacher.students||[]).find(s=>s.id===id):(state.teacher.parents||[]).find(p=>p.id===id);
  const student=isStudent?person:(state.teacher.students||[]).find(s=>s.id===person?.studentId);
  return ["Lerninsel – "+(isStudent?"Schülerzugang":"Elternzugang"),"https://lerninsel.memyo.de","Klasse: "+(teacherRoom?.name||""),"Lernraum-Code: "+(teacherRoom?.publicCode||""),student?"Schüler: "+student.label:"",!isStudent&&person?"Elternzugang: "+person.label:"",(isStudent?"Schülercode: ":"Elterncode: ")+x.code].filter(Boolean).join("\n")
}
async function copyTeacherAccess(kind,id){
  const text=teacherAccessText(kind,id);if(!text){toast("Der bisherige Code kann nicht ausgelesen werden. Bitte einen neuen vergeben.");return}
  try{await navigator.clipboard.writeText(text);toast("✓ Zugangsdaten kopiert.")}catch{prompt("Zugangsdaten kopieren:",text)}
}
function shuffledOptions(options){
  const arr=(options||[]).map((text,originalIndex)=>({text,originalIndex}));
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}
function abortWorkDialog(){
  if(state.quiz){
    if(!confirm("Quiz wirklich verlassen? Der aktuelle Durchlauf wird beendet."))return false;
    clearInterval(state.quiz.timer);
    state.quiz=null;
  }
  if(state.practice){
    if(!confirm("Übungsrunde wirklich verlassen? Du kannst sie später neu starten."))return false;
    state.practice=null;
  }
  closeDialog("#workDialog");
  if(state.currentSubject&&state.currentTopic)renderTopic(state.currentSubject,state.currentTopic);
  return true;
}
function leaveLiveDialog(){
  clearInterval(studentLiveTimer);
  if(state.live&&!state.live.teacher)state.live=null;
  closeDialog("#liveDialog");
}
function addDialogClose(dialogId,onClose){
  const dlg=$(dialogId),inside=dlg?.querySelector(".inside");
  if(!dlg||!inside)return;
  inside.style.position="relative";
  let b=inside.querySelector(".dialogClose");
  if(!b){
    b=document.createElement("button");
    b.type="button";b.className="dialogClose";b.setAttribute("aria-label","Schließen");b.textContent="×";
    Object.assign(b.style,{position:"absolute",right:"12px",top:"10px",width:"38px",height:"38px",border:"0",borderRadius:"50%",background:"#eef2f7",color:"#293347",fontSize:"26px",lineHeight:"34px",fontWeight:"700",zIndex:"3"});
    inside.prepend(b);
  }
  b.onclick=()=>{if(onClose)onClose();else closeDialog(dialogId)};
}
function toast(msg){const d=document.createElement("div");d.className="toast";d.textContent=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),1900)}
function closeDialog(id){const d=$(id); if(d?.open)d.close()}
function subjectMeta(id){return SUBJECTS.find(s=>s.id===id)||{id,name:id,icon:"📚"}}
function roomSubjectEnabled(subjectId){return state.teacher.roomSubjects?.[subjectId]!==false}
function studentSubjectEnabled(studentId,subjectId){return state.teacher.studentSubjects?.[studentId]?.[subjectId]!==false}
function subjectEnabledForStudent(studentId,subjectId){return roomSubjectEnabled(subjectId)&&studentSubjectEnabled(studentId,subjectId)}
function teacherSubjectChecks(studentId=null){
  return `<div class="roomChecks">${SUBJECTS.map(s=>{
    const roomOn=roomSubjectEnabled(s.id),checked=studentId?studentSubjectEnabled(studentId,s.id):roomOn;
    return `<label class="roomCheck"><input type="checkbox" class="${studentId?"studentSubjectToggle":"roomSubjectToggle"}" data-subject-id="${s.id}" ${studentId?`data-student-id="${studentId}"`:""} ${checked?"checked":""} ${studentId&&!roomOn?"disabled":""}>${s.icon} ${esc(s.name)}${studentId&&!roomOn?" · Raum pausiert":""}</label>`
  }).join("")}</div>`
}
function kindName(k){return ({lesson:"Lernen",practice:"Üben",homework:"Hausaufgaben",quiz:"Quiz"})[k]||k}
function progressFor(id){
  state.progress[id] ??= {status:"not_started",attempts:0,helps:[],rewarded:false,answer:null,updatedAt:null};
  return state.progress[id];
}
function pointsTotal(){return Object.values(state.progress||{}).filter(p=>p?.rewarded===true).length}
function gameTokensAvailable(){
  if(teacherTestMode)return 1;
  const spent = Number(state.profile?.games_spent||0);
  return Math.max(0, Math.floor(pointsTotal()/4)-spent);
}
function saveLocal(){
  if(teacherTestMode)return;
  localStorage.setItem(KEYS.localProgress,JSON.stringify(state.progress));
  if(state.profile)localStorage.setItem(KEYS.localProfile,JSON.stringify(state.profile));
}
function setRole(r){
  role=r; localStorage.setItem(KEYS.role,r);
}
function resetDevice(){
  if(!confirm("Zugang auf diesem Gerät wirklich zurücksetzen?"))return;
  Object.values(KEYS).forEach(k=>localStorage.removeItem(k));
  location.reload();
}

function base64urlDecode(s){try{s=s.replace(/-/g,"+").replace(/_/g,"/");while(s.length%4)s+="=";return decodeURIComponent(escape(atob(s)))}catch{return""}}
function tokenExpired(token){try{const p=JSON.parse(base64urlDecode(token.split(".")[1]));return !p.exp||Date.now()/1000>p.exp-30}catch{return true}}
async function authFetch(path,opt={}){
  const headers={"Content-Type":"application/json","apikey":CFG.supabasePublishableKey,...(opt.headers||{})};
  const r=await fetch(CFG.supabaseUrl.replace(/\/$/,"")+path,{...opt,headers});
  const t=await r.text(); if(!r.ok){let e=t;try{const j=JSON.parse(t);e=j.message||j.error_description||t}catch{}throw new Error(e)}
  return t?JSON.parse(t):null
}
async function refreshAuth(){
  if(!authSession?.refresh_token)return false;
  try{
    authSession=await authFetch("/auth/v1/token?grant_type=refresh_token",{method:"POST",body:JSON.stringify({refresh_token:authSession.refresh_token})});
    localStorage.setItem(KEYS.teacherAuth,JSON.stringify(authSession));return true
  }catch{return false}
}
async function ensureAuth(){
  if(!authSession?.access_token)return false;
  if(tokenExpired(authSession.access_token))return await refreshAuth();
  return true
}
async function signIn(email,password){
  authSession=await authFetch("/auth/v1/token?grant_type=password",{method:"POST",body:JSON.stringify({email,password})});
  localStorage.setItem(KEYS.teacherAuth,JSON.stringify(authSession));return authSession
}
function teacherLogout(){
  authSession=null;teacherRoom=null;
  localStorage.removeItem(KEYS.teacherAuth);localStorage.removeItem(KEYS.teacherRoom);
  $("#teacherLogoutBtn").classList.add("hidden");
  renderTeacherLogin();
}
async function rpc(name,payload={},needsAuth=false){
  if(!API_OK)throw new Error("Supabase ist nicht eingerichtet.");
  const headers={"Content-Type":"application/json","apikey":CFG.supabasePublishableKey};
  if(needsAuth){
    if(!await ensureAuth())throw new Error("Bitte erneut anmelden.");
    headers.Authorization="Bearer "+authSession.access_token;
  }
  const r=await fetch(CFG.supabaseUrl.replace(/\/$/,"")+"/rest/v1/rpc/"+name,{method:"POST",headers,body:JSON.stringify(payload||{})});
  const t=await r.text();
  if(!r.ok){let e=t;try{const j=JSON.parse(t);e=j.message||j.hint||t}catch{}throw new Error(e)}
  if(!t)return null;try{return JSON.parse(t)}catch{return t}
}

async function syncStudentProgress(itemId){
  if(!studentSession||studentSession.demo||!API_OK)return;
  try{
    await rpc("lerninsel_student_save_progress",{
      p_public_code:studentSession.roomCode,
      p_student_code:studentSession.studentCode,
      p_item_id:itemId,
      p_progress:progressFor(itemId)
    });
  }catch(e){console.warn("sync progress",e)}
}
async function studentEvent(itemId,type,detail={}){
  if(!studentSession||studentSession.demo||!API_OK)return;
  rpc("lerninsel_student_event",{
    p_public_code:studentSession.roomCode,p_student_code:studentSession.studentCode,
    p_item_id:itemId,p_event_type:type,p_detail:detail
  }).catch(()=>{})
}
async function completeItem(item,answer=null){
  const p=progressFor(item.id);
  p.status="completed";p.updatedAt=Date.now();if(answer!==null)p.answer=answer;
  if(!p.rewarded && item.kind!=="quiz"){p.rewarded=true;toast("⭐ 1 Inselpunkt verdient!")}
  saveLocal();await syncStudentProgress(item.id);await studentEvent(item.id,"completed",{});
  updateGameButton();
}
function markWorking(item){
  const p=progressFor(item.id);if(p.status==="not_started")p.status="working";p.updatedAt=Date.now();saveLocal();syncStudentProgress(item.id);studentEvent(item.id,"opened",{})
}

function renderSetup(){
  $("#teacherLogoutBtn").classList.add("hidden");$("#gameTopBtn").classList.add("hidden");
  MAIN.innerHTML=`
    <div class="card authCard">
      <span class="sectionTitle">Einmalige Einrichtung</span>
      <h2>Für wen ist dieses Gerät?</h2>
      <p class="small">Nach der Auswahl bleibt dieses Gerät in diesem Zugang. Die anderen Bereiche werden danach nicht mehr angezeigt.</p>
      <div class="grid setupGrid" style="margin-top:12px">
        <button class="card" data-role="student"><strong>🎒 Schüler</strong><div class="small">Lernraum + persönlicher Code</div></button>
        <button class="card" data-role="parent"><strong>👪 Eltern</strong><div class="small">Lernraum + Elterncode</div></button>
        <button class="card" data-role="teacher"><strong>👩‍🏫 Lehrer</strong><div class="small">E-Mail + Passwort</div></button>
      </div>
    </div>`;
  $$("[data-role]").forEach(b=>b.onclick=()=>{setRole(b.dataset.role);boot()})
}

async function boot(){
  const qp=new URLSearchParams(location.search);
  const forced=qp.get("rolle");
  if(forced&&["schueler","eltern","lehrer"].includes(forced)){
    const m={schueler:"student",eltern:"parent",lehrer:"teacher"};setRole(m[forced]);
  }
  if(!role){renderSetup();return}
  if(role==="student"){await bootStudent();return}
  if(role==="parent"){await bootParent();return}
  if(role==="teacher"){await bootTeacher();return}
  renderSetup()
}

/* ---------------- STUDENT ---------------- */
async function bootStudent(){
  $("#teacherLogoutBtn").classList.add("hidden");
  if(studentSession){
    if(studentSession.demo){
      loadDemoStudent();
      await openStudentHome();return
    }
    try{
      const r=await rpc("lerninsel_student_login",{p_public_code:studentSession.roomCode,p_student_code:studentSession.studentCode});
      if(r?.student){
        state.student=r.student;state.items=(r.items||[]).map(normalizeBuiltInTopic);state.progress=r.progress||{};
        await loadStudentProfile();
        await openStudentHome();return
      }
    }catch{}
  }
  renderStudentLogin()
}
function renderStudentLogin(){
  $("#gameTopBtn").classList.add("hidden");
  MAIN.innerHTML=`
    <div class="card authCard">
      <span class="sectionTitle">Schüler</span><h2>Deine Lerninsel öffnen</h2>
      <label>Lernraum-Code<input id="studentRoom" autocapitalize="characters" placeholder="ABCD-EFGH"></label>
      <label>Persönlicher Code<input id="studentCode" inputmode="numeric" placeholder="z. B. 4821"></label>
      <button id="studentLoginBtn" class="primary big" style="margin-top:12px">Lerninsel öffnen</button>
      <p id="studentLoginMsg" class="small"></p>
      <button id="demoBtn" class="ghost big">Nur Demo auf diesem Gerät</button>
    </div>`;
  $("#studentLoginBtn").onclick=async()=>{
    const m=$("#studentLoginMsg");m.textContent="Verbinde …";
    const room=$("#studentRoom").value.trim().toUpperCase(),code=$("#studentCode").value.trim();
    try{
      const r=await rpc("lerninsel_student_login",{p_public_code:room,p_student_code:code});
      if(!r?.student)throw new Error("Code nicht gefunden.");
      studentSession={roomCode:room,studentCode:code};localStorage.setItem(KEYS.studentSession,JSON.stringify(studentSession));
      state.student=r.student;state.items=(r.items||[]).map(normalizeBuiltInTopic);state.progress=r.progress||{};
      await loadStudentProfile();await openStudentHome()
    }catch(e){m.textContent="Anmeldung nicht möglich. Bitte Codes prüfen."}
  };
  $("#demoBtn").onclick=()=>{studentSession={demo:true,roomCode:"DEMO",studentCode:"4821"};localStorage.setItem(KEYS.studentSession,JSON.stringify(studentSession));loadDemoStudent();openStudentHome()}
}
function loadDemoStudent(){
  state.student={id:"demo",label:"Demo-Schüler"};
  state.items=DEFAULT_CONTENT.map(x=>structuredClone(x));
  state.progress=JSON.parse(localStorage.getItem(KEYS.localProgress)||"{}");
  state.profile=JSON.parse(localStorage.getItem(KEYS.localProfile)||"null")||{nickname:"Fiete",avatar:"🦊",games_spent:0,game_best:0}
}
async function loadStudentProfile(){
  if(studentSession?.demo){loadDemoStudent();return}
  try{
    const p=await rpc("lerninsel_student_get_profile",{p_public_code:studentSession.roomCode,p_student_code:studentSession.studentCode});
    state.profile=p||{nickname:"",avatar:"🦊",games_spent:0,game_best:0}
  }catch{
    state.profile={nickname:"",avatar:"🦊",games_spent:0,game_best:0}
  }
}
async function openStudentHome(){
  if(!state.profile?.nickname){renderProfileSetup(true);return}
  state.currentSubject=null;state.currentTopic=null;
  renderStudentDashboard()
}
function updateGameButton(){
  const b=$("#gameTopBtn");
  if(role!=="student"||!state.student){b.classList.add("hidden");return}
  b.classList.remove("hidden");
  const n=gameTokensAvailable();b.textContent=teacherTestMode?"🎮 Spiel testen":n>0?`🎮 Spiel (${n})`:`🎮 Spiel 🔒`;
  b.onclick=openGame
}
function renderProfileBar(){
  return `<div class="card profileBar">
    <div class="profileLeft"><div class="avatar">${esc(state.profile?.avatar||"🦊")}</div>
      <div><strong>${esc(state.profile?.nickname||state.student?.label||"Schüler")}</strong>
      <div class="small">${teacherTestMode?"Testmodus · keine Speicherung":`${pointsTotal()} Inselpunkte · ${gameTokensAvailable()} Spielrunde(n)`}</div></div></div>
    <button id="editProfileBtn" class="ghost">Profil</button>
  </div>`
}
function renderStudentDashboard(){
  updateGameButton();
  const items=state.items||[];
  const pending=items.filter(i=>i.kind==="homework"&&i.assignedDate&&progressFor(i.id).status!=="completed").sort((a,b)=>(a.dueDate||"9999").localeCompare(b.dueDate||"9999"));
  const today=isoToday();
  MAIN.innerHTML=renderProfileBar()+`${pending.length?`<div class="card homeOverview"><span class="sectionTitle">Unerledigte Hausaufgaben</span><h3 style="margin:.35rem 0 .7rem">Noch zu erledigen</h3>
    ${pending.map(i=>`<button class="homeLink ${i.dueDate&&i.dueDate<today?"overdue":""}" data-home-id="${esc(i.id)}"><span><strong>${esc(subjectMeta(i.subject).name)} · ${esc(i.title)}</strong><span class="small" style="display:block">${esc(i.topic)}${homeworkDateText(i)?` · ${esc(homeworkDateText(i))}`:""}</span></span><span>Öffnen →</span></button>`).join("")}</div>`:""}
    <div class="subjectHead"><div><span class="sectionTitle">Fächer</span><h2 style="margin:.3rem 0">Was möchtest du machen?</h2></div>
    <button id="liveJoinBtn" class="ghost">⚡ Live-Quiz</button></div>
    <div class="grid" id="subjectGrid"></div>`;
  const grid=$("#subjectGrid");
  grid.innerHTML=SUBJECTS.map(s=>{
    const topicCount=new Set(items.filter(i=>i.subject===s.id).map(i=>i.topic)).size;
    const active=topicCount>0;
    return `<button class="card subjectCard" data-subject="${s.id}" ${active?"":"disabled"} style="text-align:left;opacity:${active?1:.55}">
      <div class="subjectIcon">${s.icon}</div><h3>${esc(s.name)}</h3><p>${active?`${topicCount} Thema${topicCount===1?"":"en"}`:"Noch keine Inhalte"}</p>
    </button>`
  }).join("");
  $$("[data-subject]").forEach(b=>b.onclick=()=>renderSubject(b.dataset.subject));
  $$("[data-home-id]").forEach(b=>b.onclick=()=>openItem(b.dataset.homeId));
  $("#editProfileBtn").onclick=()=>renderProfileSetup(false);
  $("#liveJoinBtn").onclick=renderLiveJoin;
}
function renderSubject(subjectId){
  state.currentSubject=subjectId;const s=subjectMeta(subjectId);
  const topics=[...new Set(state.items.filter(i=>i.subject===subjectId).map(i=>i.topic))];
  if(subjectId==="natur")topics.sort((a,b)=>Number(a==="Üben für die Arbeit")-Number(b==="Üben für die Arbeit"));
  MAIN.innerHTML=renderProfileBar()+`
    <button id="backSubjects" class="ghost back">← Fächer</button>
    <div class="subjectHead"><div><span class="sectionTitle">${s.icon} ${esc(s.name)}</span><h2 style="margin:.3rem 0">Themen</h2></div></div>
    <div class="grid">${topics.map(t=>{
      const arr=state.items.filter(i=>i.subject===subjectId&&i.topic===t&&i.kind!=="quiz");
      const done=arr.filter(i=>progressFor(i.id).status==="completed").length;
      return `<button class="card topicCard" data-topic="${esc(t)}" style="text-align:left">
        <h3>${esc(t)}</h3><p>${done} von ${arr.length} Lernaufgaben erledigt</p>
        <span class="badge ${arr.length&&done===arr.length?"good":""}">${arr.length?Math.round(done/arr.length*100):0}%</span>
      </button>`}).join("")}</div>`;
  $("#backSubjects").onclick=renderStudentDashboard;
  $("#editProfileBtn").onclick=()=>renderProfileSetup(false);
  $$("[data-topic]").forEach(b=>b.onclick=()=>renderTopic(subjectId,b.dataset.topic))
}
function renderTopic(subjectId,topic){
  state.currentSubject=subjectId;state.currentTopic=topic;
  const s=subjectMeta(subjectId), all=state.items.filter(i=>i.subject===subjectId&&i.topic===topic);
  const lessons=all.filter(i=>i.kind==="lesson"),practice=all.filter(i=>i.kind==="practice"),home=all.filter(i=>i.kind==="homework"),quiz=all.filter(i=>i.kind==="quiz");
  const vocab=practice.filter(isVocabItem),otherPractice=practice.filter(i=>!isVocabItem(i));
  const vocabDue=vocab.length?vocabDueEntries(vocab,"de-en").length:0;
  const practiceDone=practice.filter(i=>progressFor(i.id).status==="completed").length;
  MAIN.innerHTML=renderProfileBar()+`
    <button id="backTopics" class="ghost back">← ${esc(s.name)}</button>
    <div class="card" style="margin-bottom:14px"><span class="sectionTitle">${s.icon} ${esc(s.name)}</span><h2 style="margin:.3rem 0">${esc(topic)}</h2></div>
    <div class="topicSections">
      <section class="card topicSection"><h3>📖 Lernen</h3><p class="hint">Erst lesen und verstehen. Beim Tippen auf „Gelesen“ wird gespeichert und die Seite schließt automatisch.</p>
        <div class="lessonList">${lessons.map(itemRow).join("")||'<div class="small">Noch nichts hinterlegt.</div>'}</div>
      </section>
      <section class="card topicSection"><h3>🧠 Üben</h3>
        ${vocab.length?`<div class="lessonSection"><h4 style="margin-top:0">🃏 Flashkarten</h4><p class="hint">Vorderseite ansehen, überlegen und die Karte zum Prüfen umdrehen.</p>
          <label class="writeLabel">Richtung<select id="vocabCardDirection"><option value="de-en" selected>Deutsch → Englisch</option><option value="en-de">Englisch → Deutsch</option></select></label>
          <button id="startVocabCards" class="primary big">Flashkarten starten · ${vocab.length} Wörter</button></div>
          <div class="lessonSection"><h4 style="margin-top:0">⌨️ Schreiben</h4><p class="hint">Das deutsche Wort wird gezeigt, die englische Übersetzung muss selbst geschrieben werden. Richtige Wörter kommen mit größerem Abstand wieder.</p>
          <button id="startVocabWriting" class="primary big">Schreibtraining starten · ${vocabDue?vocabDue+" fällig":"heute alles wiederholen"}</button></div>`:""}
        ${otherPractice.length?`<p class="hint">Weitere Aufgaben kommen bei Fehlern am Ende noch einmal.</p><button id="startPractice" class="${vocab.length?"ghost":"primary"} big">${vocab.length?"Weitere Englisch-Übungen":"Übungsrunde starten"} · ${practiceDone}/${practice.length} erledigt</button>`:(!vocab.length?'<div class="small">Noch keine Übungen.</div>':"")}
      </section>
      <section class="card topicSection"><h3>✏️ Hausaufgaben</h3><p class="hint">Die echte Aufgabe zuerst. Hilfen führen Schritt für Schritt weiter.</p>
        <div class="homeworkList">${home.map(itemRow).join("")||'<div class="small">Noch keine Hausaufgaben.</div>'}</div>
      </section>
      <section class="card topicSection"><h3>🏆 Quiz</h3><p class="hint">Themengebundenes Zeitquiz. Richtige und schnelle Antworten bringen mehr Quizpunkte.</p>
        ${quiz.length?`<button id="startSoloQuiz" class="primary big">Solo-Quiz starten · ${quiz.length} Fragen</button>`:'<div class="small">Noch kein Quiz.</div>'}
      </section>
    </div>`;
  $("#backTopics").onclick=()=>renderSubject(subjectId);
  $("#editProfileBtn").onclick=()=>renderProfileSetup(false);
  $$(".openItem").forEach(b=>b.onclick=()=>openItem(b.dataset.id));
  if($("#startVocabCards"))$("#startVocabCards").onclick=()=>startVocabFlashcards(vocab,$("#vocabCardDirection").value);
  if($("#startVocabWriting"))$("#startVocabWriting").onclick=()=>startVocabWriting(vocab);
  if($("#startPractice"))$("#startPractice").onclick=()=>startPractice(otherPractice);
  if($("#startSoloQuiz"))$("#startSoloQuiz").onclick=()=>startSoloQuiz(quiz);
}
function itemRow(i){
  const p=progressFor(i.id);
  return `<div class="itemRow"><div><h4>${esc(i.title)}</h4><p>${esc(i.summary||"")}</p>
    ${i.kind==="homework"&&homeworkDateText(i)?`<div class="small">📅 ${esc(homeworkDateText(i))}</div>`:""}
    ${p.status==="completed"?'<span class="badge good">✓ erledigt</span>':p.status==="working"?'<span class="badge warn">in Arbeit</span>':""}
    </div><button class="primary openItem" data-id="${i.id}">${p.status==="completed"?"Nochmal":"Öffnen"}</button></div>`
}
function openItem(id){
  const i=state.items.find(x=>x.id===id);if(!i)return;state.currentSubject=i.subject;state.currentTopic=i.topic;markWorking(i);
  if(i.kind==="lesson")renderLesson(i);
  else if(i.kind==="homework")renderHomework(i)
}

function lessonExtra(i){
  if(i.diagram==="shadow-symbols")return `<div class="lessonSection softDiagram"><h3>So liegen die vier Größen</h3><svg viewBox="0 0 760 300" class="learnSvg" aria-label="Schattenwurf mit G g B b"><line x1="40" y1="150" x2="720" y2="150" stroke="#a9b8ca" stroke-dasharray="8 8"/><circle cx="90" cy="150" r="13" fill="#f2b84b"/><text x="55" y="125">Lichtquelle</text><line x1="330" y1="105" x2="330" y2="195" stroke="#536b88" stroke-width="10"/><line x1="690" y1="60" x2="690" y2="240" stroke="#536b88" stroke-width="10"/><line x1="90" y1="150" x2="690" y2="60" stroke="#e7a84a" stroke-width="3"/><line x1="90" y1="150" x2="690" y2="240" stroke="#e7a84a" stroke-width="3"/><text x="345" y="105" font-size="30" font-weight="800">G</text><text x="705" y="70" font-size="30" font-weight="800">B</text><path d="M90 225 H330" stroke="#7d6bc5" stroke-width="5"/><text x="195" y="260" font-size="28" font-weight="800">g</text><path d="M90 280 H690" stroke="#7d6bc5" stroke-width="5"/><text x="380" y="295" font-size="28" font-weight="800">b</text></svg><div class="memoryGrid"><b>G = Gegenstandsgröße</b><b>g = Gegenstandsweite</b><b>B = Bildgröße</b><b>b = Bildweite</b></div></div>`;
  if(i.diagram==="shadow-construction")return `<div class="lessonSection softDiagram"><h3>Die zwei Randstrahlen</h3><svg viewBox="0 0 760 260" class="learnSvg"><line x1="50" y1="135" x2="710" y2="135" stroke="#b5c1cf" stroke-dasharray="8 8"/><circle cx="90" cy="135" r="12" fill="#f2b84b"/><line x1="330" y1="95" x2="330" y2="175" stroke="#526b87" stroke-width="9"/><line x1="690" y1="45" x2="690" y2="225" stroke="#526b87" stroke-width="9"/><line x1="90" y1="135" x2="690" y2="45" stroke="#d87c69" stroke-width="4"/><line x1="90" y1="135" x2="690" y2="225" stroke="#d87c69" stroke-width="4"/><text x="160" y="70" font-size="22">Randstrahl</text><text x="350" y="90" font-size="22">Gegenstand</text><text x="610" y="30" font-size="22">Schirm</text></svg></div>`;
  if(i.diagram==="reflection")return `<div class="lessonSection softDiagram"><h3>Spiegelung: immer zuerst das Lot</h3><svg viewBox="0 0 760 330" class="learnSvg"><line x1="100" y1="250" x2="660" y2="250" stroke="#526b87" stroke-width="10"/><circle cx="380" cy="250" r="8" fill="#263a54"/><line x1="380" y1="250" x2="380" y2="45" stroke="#91a3b7" stroke-width="3" stroke-dasharray="8 7"/><line x1="150" y1="70" x2="380" y2="250" stroke="#d87c69" stroke-width="5"/><line x1="380" y1="250" x2="610" y2="70" stroke="#6b8fd4" stroke-width="5"/><path d="M380 170 A80 80 0 0 0 317 201" fill="none" stroke="#7d6bc5" stroke-width="4"/><path d="M380 170 A80 80 0 0 1 443 201" fill="none" stroke="#7d6bc5" stroke-width="4"/><text x="390" y="65" font-size="24" font-weight="800">Lot (90° zum Spiegel)</text><text x="270" y="175" font-size="24">α</text><text x="470" y="175" font-size="24">β</text><text x="275" y="300" font-size="24">Spiegel</text></svg><div class="merksatz">α = β · Die Winkel werden zum Lot gemessen.</div></div>`;
  if(i.diagram==="estate-pyramid")return `
    <div class="lessonSection softDiagram">
      <h3>Die mittelalterliche Ständegesellschaft</h3>
      <div class="merksatz" style="margin-top:0">☀️ Die Ordnung wurde als <strong>gottgewollt</strong> dargestellt. Der Stand wurde meistens durch die Geburt bestimmt.</div>
      <svg viewBox="0 0 680 650" class="learnSvg" role="img" aria-label="Pyramide der mittelalterlichen Ständegesellschaft mit Geistlichen, Adel, Bauern und Stadtbewohnern">
        <g aria-label="König">
          <path d="M300 62 L320 34 L340 62 L365 34 L360 82 L280 82 L275 34 Z" fill="#d7ae45" stroke="#6b5a35" stroke-width="4" stroke-linejoin="round"/>
          <text x="390" y="70" font-size="28" font-weight="800" fill="#31445f">König</text>
        </g>
        <polygon points="320,100 250,230 390,230" fill="#b87370" stroke="#405269" stroke-width="4" stroke-linejoin="round"/>
        <polygon points="250,230 390,230 455,350 185,350" fill="#71829b" stroke="#405269" stroke-width="4" stroke-linejoin="round"/>
        <polygon points="185,350 395,350 505,610 45,610" fill="#738b69" stroke="#405269" stroke-width="4" stroke-linejoin="round"/>
        <polygon points="395,350 455,350 595,610 505,610" fill="#a7ba76" stroke="#405269" stroke-width="4" stroke-linejoin="round"/>

        <g fill="#fff" text-anchor="middle">
          <text x="320" y="174" font-size="27" font-weight="900">Geistliche</text>
          <text x="320" y="204" font-size="20">1. Stand · betet</text>
          <text x="320" y="284" font-size="31" font-weight="900">Adlige</text>
          <text x="320" y="320" font-size="21">2. Stand · schützt</text>
          <text x="275" y="430" font-size="34" font-weight="900">„Volk“</text>
          <text x="275" y="472" font-size="29" font-weight="800">Bauern · ca. 90 %</text>
          <text x="275" y="510" font-size="22">3. Stand · arbeitet</text>
          <text x="275" y="548" font-size="20">oft unfrei und abhängig</text>
          <text x="275" y="580" font-size="20">Knechte und Mägde</text>
        </g>
        <g fill="#263a42" text-anchor="middle">
          <text x="492" y="445" font-size="23" font-weight="900" transform="rotate(68 492 445)">Stadtbewohner</text>
          <text x="520" y="532" font-size="22" font-weight="900" transform="rotate(68 520 532)">ca. 9 %</text>
        </g>
        <path d="M474 150 C560 150 560 330 474 330" fill="none" stroke="#7f8c9d" stroke-width="4"/>
        <text x="570" y="225" font-size="28" font-weight="900" fill="#31445f" text-anchor="middle">ca. 1 %</text>
        <text x="570" y="258" font-size="18" fill="#52657c" text-anchor="middle">Geistliche</text>
        <text x="570" y="282" font-size="18" fill="#52657c" text-anchor="middle">und Adel</text>
      </svg>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:9px">
        <div class="softPanel"><strong>🙏 Geistliche · beten</strong><div class="small">Bischöfe, Äbte, Pfarrer, Mönche und Nonnen</div></div>
        <div class="softPanel"><strong>🛡️ Adlige · schützen</strong><div class="small">Herzöge, Grafen und Ritter</div></div>
        <div class="softPanel"><strong>🌾 Bauern · arbeiten</strong><div class="small">Mit etwa 90 % die größte Gruppe; häufig unfrei oder feudalabhängig</div></div>
        <div class="softPanel"><strong>🏘️ Stadtbevölkerung · ca. 9 %</strong><div class="small">Kaufleute, Patrizier, Handwerksmeister, Händler, Gesellen, Lohnarbeiter, Randgruppen und Bettler</div></div>
      </div>
      <div class="small" style="margin-top:12px"><strong>Wichtig:</strong> Die Pyramide zeigt eine streng hierarchische Gesellschaft. Die Kleidung war ebenfalls durch feste Regeln bestimmt.</div>
    </div>`;
  if(i.diagram!=="three-estates")return "";
  return `
    <div class="lessonSection" style="background:#f4f7fb">
      <h3>M2 als einfaches Schaubild</h3>
      <div style="text-align:center;margin:8px 0 14px">
        <div style="display:inline-block;background:#fff;border:2px solid #8091a5;border-radius:14px;padding:10px 18px;font-weight:800">✝️ Christus<br><span class="small">steht über der Ordnung</span></div>
        <div style="font-size:1.6rem;line-height:1">↓</div>
        <div class="grid" style="grid-template-columns:repeat(3,1fr);gap:8px">
          <div style="background:#fff;border:1px solid #d8e0e8;border-radius:14px;padding:12px"><div style="font-size:1.5rem">🙏</div><strong>Geistliche</strong><div class="small">„beten“</div></div>
          <div style="background:#fff;border:1px solid #d8e0e8;border-radius:14px;padding:12px"><div style="font-size:1.5rem">🛡️</div><strong>Adel</strong><div class="small">„beschützen“</div></div>
          <div style="background:#fff;border:1px solid #d8e0e8;border-radius:14px;padding:12px"><div style="font-size:1.5rem">🌾</div><strong>Arbeitende</strong><div class="small">„arbeiten“</div></div>
        </div>
      </div>
      <div class="small"><strong>Wichtig:</strong> Dieses Schaubild erklärt die Aussage des Buchbildes vereinfacht. Es ist keine Kopie des historischen Bildes.</div>
    </div>`;
}

function renderLesson(i){
  const p=progressFor(i.id);
  $("#workInside").innerHTML=`
    <span class="badge">${esc(subjectMeta(i.subject).name)} · Lernen</span><h2>${esc(i.title)}</h2>
    ${lessonExtra(i)}
    ${originalPagesHtml(i)}
    ${(i.sections||[]).map(s=>`<div class="lessonSection"><h3>${esc(s.heading)}</h3><div>${esc(s.text)}</div></div>`).join("")}
    ${i.memory?`<div class="merksatz">💡 ${esc(i.memory)}</div>`:""}
    ${i.videoUrl?`<div class="videoCard"><h3 style="margin-top:0">▶ Lernvideo</h3><p class="small">${esc(i.videoLabel||"Video öffnen")}</p><a class="primary big" style="display:block;text-align:center;text-decoration:none" href="${esc(i.videoUrl)}" target="_blank" rel="noopener">Video öffnen</a></div>`:""}
    ${i.resourceUrl?`<div class="videoCard"><h3 style="margin-top:0">📄 Arbeitsblatt</h3><p class="small">${esc(i.resourceLabel||"PDF öffnen")}</p><a class="primary big" style="display:block;text-align:center;text-decoration:none" href="${esc(i.resourceUrl)}" target="_blank" rel="noopener">PDF öffnen</a></div>`:""}
    <button id="readDone" class="primary big">${p.status==="completed"?"✓ Gelesen":"Gelesen"}</button>`;
  addDialogClose("#workDialog",()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)});
  $("#workDialog").showModal();
  $("#readDone").onclick=async()=>{
    const b=$("#readDone");b.textContent="✓ Gelesen – gespeichert";b.disabled=true;
    await completeItem(i);setTimeout(()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)},450)
  }
}

/* Practice session */
function startPractice(items){
  const prepared=preparePracticeItems(items);
  state.practice={queue:prepared.length?prepared:[...items.filter(i=>!isVocabItem(i))],retry:[],index:0,round:1,current:null,locked:false};
  if(!state.practice.queue.length){state.practice=null;toast("Noch keine weiteren Übungen vorhanden.");return}
  nextPractice()
}
function startVocabWriting(items){
  let queue=vocabDueEntries(items,"de-en").slice(0,12);
  if(!queue.length)queue=shuffledItems(items.filter(isVocabItem)).slice(0,12).map(i=>({...i,_vocabDirection:"de-en",_practiceKey:i.id+"::de-en"}));
  state.practice={queue,retry:[],index:0,round:1,current:null,locked:false};
  if(!queue.length){state.practice=null;toast("Noch keine Vokabeln vorhanden.");return}
  nextPractice()
}
function startVocabFlashcards(items,direction="de-en"){
  const queue=shuffledItems(items.filter(isVocabItem)).map(i=>({...i,_vocabMode:"flashcard",_vocabDirection:direction,_practiceKey:i.id+"::card::"+direction}));
  state.practice={queue,retry:[],index:0,round:1,current:null,locked:false};
  if(!queue.length){state.practice=null;toast("Noch keine Vokabeln vorhanden.");return}
  nextPractice()
}
function nextPractice(){
  const s=state.practice;if(!s)return;
  if(s.index>=s.queue.length){
    if(s.retry.length){s.queue=[...s.retry];s.retry=[];s.index=0;s.round++}
    else{
      closeDialog("#workDialog");state.practice=null;toast("✓ Übungsrunde geschafft!");
      renderTopic(state.currentSubject,state.currentTopic);return
    }
  }
  const i=s.queue[s.index++];s.current=i;s.locked=false;markWorking(i);renderPracticeItem(i)
}
function practiceHead(){
  const s=state.practice;
  return `<div class="sessionHead"><span>${s.round===1?`Aufgabe ${s.index} von ${s.queue.length}`:`Wiederholung · ${s.index} von ${s.queue.length}`}</span><span>${s.round===1?"Üben":"Nochmal dran"}</span></div>`
}
function retryPractice(i,msg,delay=850){
  const s=state.practice;if(!s||s.locked)return;s.locked=true;
  const key=i._practiceKey||i.id;
  if(!s.retry.some(x=>(x._practiceKey||x.id)===key))s.retry.push(i);
  const f=$("#practiceFeedback");if(f)f.innerHTML=`<div class="feedback no">${esc(msg)}</div>`;
  setTimeout(nextPractice,delay)
}
async function correctPractice(i,msg="✓ Richtig!"){
  const s=state.practice;if(!s||s.locked)return;s.locked=true;
  await completeItem(i);
  const f=$("#practiceFeedback");if(f)f.innerHTML=`<div class="feedback ok">${esc(msg)}</div>`;
  setTimeout(nextPractice,520)
}
function renderPracticeItem(i){
  if(i._vocabMode==="flashcard")renderVocabFlashcard(i);
  else if(i.type==="mcq")renderPracticeMCQ(i);
  else if(i.type==="roleplay")renderRoleplay(i);
  else if(isVocabItem(i))renderVocabWriting(i);
  else if(i.type==="flashcard")renderFlashcard(i);
  else if(i.type==="cloze")renderPracticeCloze(i);
  else if(i.type==="builder")renderPracticeBuilder(i);
  else if(i.type==="anglemeasure")renderAngleMeasure(i);
  addDialogClose("#workDialog",abortWorkDialog);
  $("#workDialog").showModal()
}

function renderRoleplay(i){
  let roleChoice=null,sceneIndex=0,answered=false;
  const renderRoleChoice=()=>{
    $("#workInside").innerHTML=practiceHead()+`<span class="badge">${esc(subjectMeta(i.subject).name)} · Rollenspiel</span>
      <h2>${esc(i.title)}</h2><p>${esc(i.question)}</p>
      <div class="grid">${(i.roles||[]).map(r=>`<button class="card rolePick" data-role="${esc(r.id)}" style="text-align:left"><div style="font-size:2rem">${esc(r.icon)}</div><strong>${esc(r.name)}</strong><div class="small">${esc(r.profile)}</div></button>`).join("")}</div>
      <div id="practiceFeedback"></div>`;
    $$(".rolePick").forEach(b=>b.onclick=()=>{roleChoice=(i.roles||[]).find(r=>r.id===b.dataset.role);sceneIndex=0;renderScene()})
  };
  const renderScene=()=>{
    const scene=roleChoice.scenes[sceneIndex];answered=false;
    $("#workInside").innerHTML=practiceHead()+`<span class="badge">${esc(roleChoice.icon)} ${esc(roleChoice.name)}</span>
      <div class="lessonSection"><strong>Deine Rolle</strong><p>${esc(roleChoice.profile)}</p></div>
      <div class="small">Situation ${sceneIndex+1} von ${roleChoice.scenes.length}</div><h2>${esc(scene.title)}</h2><div class="question">${esc(scene.text)}</div>
      <div>${scene.options.map((o,n)=>`<button class="choice roleOption" data-opt="${n}">${esc(o.text)}</button>`).join("")}</div>
      <div id="practiceFeedback"></div><button id="roleNext" class="primary big hidden">${sceneIndex+1<roleChoice.scenes.length?"Nächste Situation":"Rollenspiel abschließen"}</button>`;
    $$(".roleOption").forEach(b=>b.onclick=()=>{
      if(answered)return;answered=true;const option=scene.options[+b.dataset.opt];
      $$(".roleOption").forEach(x=>x.disabled=true);b.classList.add("selected");
      $("#practiceFeedback").innerHTML=`<div class="feedback ok">${esc(option.feedback)}</div>`;$("#roleNext").classList.remove("hidden")
    });
    $("#roleNext").onclick=async()=>{
      if(!answered)return;
      if(sceneIndex+1<roleChoice.scenes.length){sceneIndex++;renderScene();return}
      await completeItem(i,roleChoice.name);
      $("#workInside").innerHTML=practiceHead()+`<span class="badge good">✓ Rollenspiel beendet</span><h2>${esc(roleChoice.icon)} ${esc(roleChoice.name)}</h2>
        <div class="finalBox">${esc(roleChoice.summary)}</div><button id="finishRoleplay" class="primary big">Weiter</button>`;
      $("#finishRoleplay").onclick=nextPractice
    }
  };
  renderRoleChoice()
}

function ensureAngleStyles(){
  if($("#angleMeasureStyles"))return;
  const s=document.createElement("style");
  s.id="angleMeasureStyles";
  s.textContent=`
    .angleStage{background:#fbfcfd;border:1px solid #d9e0e8;border-radius:16px;padding:8px;margin:10px 0;touch-action:none}
    .angleStage svg{display:block;width:100%;height:auto;max-height:56vh;touch-action:none;user-select:none}
    .geoTool .geoOutline{fill:rgba(220,232,245,.52);stroke:#61758d;stroke-width:3;transition:.15s}
    .geoTool .geoArc{fill:none;stroke:#708398;stroke-width:2}
    .geoTool .geoTick{stroke:#63758a;stroke-width:1}
    .geoTool .geoMajor{stroke-width:2}
    .geoTool .geoCenter{fill:#31445f}
    .geoTool.correct .geoOutline{stroke:#2f9d57;stroke-width:5;filter:drop-shadow(0 0 3px rgba(47,157,87,.35))}
    .geoTool.correct .geoCenter{fill:#2f9d57}
    .geoTool.almost .geoOutline{stroke:#d79a2b;stroke-width:4}
    .geoRotateHandle{fill:#fff;stroke:#31445f;stroke-width:3;cursor:grab}
    .geoDragArea{fill:transparent;cursor:grab}
    .angleStatus{padding:11px 12px;border-radius:12px;margin:10px 0;font-weight:750}
    .angleStatus.ok{background:#e5f5e9;color:#246f3d}
    .angleStatus.hint{background:#fff3d8;color:#7c5b12}
    .angleAnswerRow{display:flex;gap:8px;align-items:end;flex-wrap:wrap}
    .angleAnswerRow label{flex:1;min-width:160px;margin:0}
    .angleAnswerRow button{flex:0 0 auto}
    .degreeLabel{font-size:12px;fill:#405268;font-weight:700;pointer-events:none}
    .angleRay{stroke:#263748;stroke-width:5;stroke-linecap:round}
    .angleVertex{fill:#263748}
  `;
  document.head.appendChild(s)
}
function angleNorm180(d){
  let x=((d%180)+180)%180;
  return x>90?180-x:x
}
function protractorTicks(){
  let out="";
  for(let d=0;d<=180;d+=5){
    const a=d*Math.PI/180,major=d%10===0;
    const r1=major?116:122,r2=132;
    const x1=r1*Math.cos(a),y1=-r1*Math.sin(a);
    const x2=r2*Math.cos(a),y2=-r2*Math.sin(a);
    out+=`<line class="geoTick ${major?"geoMajor":""}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }
  for(let d=0;d<=180;d+=30){
    const a=d*Math.PI/180,r=96;
    const x=r*Math.cos(a),y=-r*Math.sin(a)+4;
    out+=`<text class="degreeLabel" x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle">${d}</text>`;
  }
  return out
}
function renderAngleMeasure(i){
  ensureAngleStyles();
  const W=640,H=390,vx=320,vy=245;
  const target=Number(i.targetAngle||60),base=Number(i.baseDeg||0);
  const L=245;
  const rad=d=>d*Math.PI/180;
  const bx=vx+L*Math.cos(rad(base)),by=vy+L*Math.sin(rad(base));
  const second=base-target;
  const sx=vx+L*Math.cos(rad(second)),sy=vy+L*Math.sin(rad(second));

  let toolX=165,toolY=322,toolRot=base+28;
  let dragMode=null,dragDx=0,dragDy=0;

  $("#workInside").innerHTML=practiceHead()+`
    <span class="badge">${esc(subjectMeta(i.subject).name)} · ${esc(i.topic)}</span>
    <div class="question">${esc(i.question)}</div>
    <div class="small">Ziehe das Geodreieck am Körper. Am runden Griff kannst du es drehen.</div>
    <div class="angleStage">
      <svg id="angleSvg" viewBox="0 0 ${W} ${H}" aria-label="Interaktive Winkelmessung">
        <line class="angleRay" x1="${vx}" y1="${vy}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}"/>
        <line class="angleRay" x1="${vx}" y1="${vy}" x2="${sx.toFixed(1)}" y2="${sy.toFixed(1)}"/>
        <circle class="angleVertex" cx="${vx}" cy="${vy}" r="7"/>
        <g id="geoTool" class="geoTool" transform="translate(${toolX} ${toolY}) rotate(${toolRot})">
          <polygon class="geoOutline" points="-160,0 160,0 0,-165"/>
          <path class="geoArc" d="M -132 0 A 132 132 0 0 1 132 0"/>
          ${protractorTicks()}
          <line x1="-150" y1="0" x2="150" y2="0" stroke="#31445f" stroke-width="3"/>
          <circle class="geoCenter" cx="0" cy="0" r="6"/>
          <circle cx="0" cy="0" r="17" fill="none" stroke="#31445f" stroke-width="2"/>
          <rect id="geoDragArea" class="geoDragArea" x="-155" y="-148" width="310" height="148"/>
          <line x1="0" y1="-165" x2="0" y2="-188" stroke="#31445f" stroke-width="3"/>
          <circle id="geoRotateHandle" class="geoRotateHandle" cx="0" cy="-196" r="14"/>
        </g>
      </svg>
    </div>
    <div id="angleStatus" class="angleStatus hint">Mittelpunkt auf den Scheitelpunkt legen und die Grundlinie auf einen Schenkel drehen.</div>
    <div class="angleAnswerRow">
      <label>Gemessener Winkel in Grad
        <input id="angleAnswer" type="number" min="0" max="180" inputmode="numeric" disabled placeholder="z. B. 70">
      </label>
      <button id="checkAngle" class="primary" disabled>Prüfen</button>
    </div>
    <div id="practiceFeedback"></div>`;

  const svg=$("#angleSvg"),tool=$("#geoTool"),status=$("#angleStatus"),answer=$("#angleAnswer"),check=$("#checkAngle");

  function svgPoint(ev){
    const r=svg.getBoundingClientRect();
    return {x:(ev.clientX-r.left)/r.width*W,y:(ev.clientY-r.top)/r.height*H}
  }
  function updateTransform(){tool.setAttribute("transform",`translate(${toolX.toFixed(1)} ${toolY.toFixed(1)}) rotate(${toolRot.toFixed(1)})`)}
  function checkPlacement(){
    const dist=Math.hypot(toolX-vx,toolY-vy);
    const rotErr=angleNorm180(toolRot-base);
    const centerOK=dist<=15,rotationOK=rotErr<=4.5;
    tool.classList.toggle("correct",centerOK&&rotationOK);
    tool.classList.toggle("almost",!(centerOK&&rotationOK)&&(centerOK||rotationOK));
    if(centerOK&&rotationOK){
      status.className="angleStatus ok";
      status.textContent="✓ Richtig angelegt! Jetzt den Winkel an der Skala ablesen.";
      answer.disabled=false;check.disabled=false
    }else{
      status.className="angleStatus hint";
      answer.disabled=true;check.disabled=true;
      if(!centerOK&&rotationOK)status.textContent="Die Grundlinie stimmt schon. Schiebe jetzt den Mittelpunkt genau auf den Scheitelpunkt.";
      else if(centerOK&&!rotationOK)status.textContent="Der Mittelpunkt sitzt richtig. Drehe jetzt die Grundlinie genau auf einen Schenkel.";
      else status.textContent="Mittelpunkt auf den Scheitelpunkt legen und die Grundlinie auf einen Schenkel drehen."
    }
    return centerOK&&rotationOK
  }

  $("#geoDragArea").addEventListener("pointerdown",ev=>{
    ev.preventDefault();const p=svgPoint(ev);dragMode="move";dragDx=p.x-toolX;dragDy=p.y-toolY;svg.setPointerCapture?.(ev.pointerId)
  });
  $("#geoRotateHandle").addEventListener("pointerdown",ev=>{
    ev.preventDefault();dragMode="rotate";svg.setPointerCapture?.(ev.pointerId)
  });
  svg.addEventListener("pointermove",ev=>{
    if(!dragMode)return;ev.preventDefault();const p=svgPoint(ev);
    if(dragMode==="move"){
      toolX=Math.max(35,Math.min(W-35,p.x-dragDx));
      toolY=Math.max(180,Math.min(H-20,p.y-dragDy))
    }else{
      toolRot=Math.atan2(p.y-toolY,p.x-toolX)*180/Math.PI+90
    }
    updateTransform();checkPlacement()
  });
  const endDrag=()=>{dragMode=null};
  svg.addEventListener("pointerup",endDrag);svg.addEventListener("pointercancel",endDrag);

  check.onclick=()=>{
    if(!checkPlacement())return;
    const val=Number(answer.value);
    if(!Number.isFinite(val)||answer.value===""){
      $("#practiceFeedback").innerHTML='<div class="feedback no">Trage zuerst den gemessenen Winkel ein.</div>';return
    }
    const p=progressFor(i.id);p.attempts++;saveLocal();
    if(Math.abs(val-target)<=1){
      correctPractice(i,"✓ Richtig gemessen!")
    }else{
      retryPractice(i,"Noch nicht richtig abgelesen. Diese Winkelaufgabe kommt am Ende noch einmal.")
    }
  };
  checkPlacement()
}

function renderPracticeMCQ(i){
  const shown=shuffledOptions(i.options);
  $("#workInside").innerHTML=practiceHead()+`<span class="badge">${esc(subjectMeta(i.subject).name)} · ${esc(i.topic)}</span>
    <div class="question">${esc(i.question)}</div>
    <div>${shown.map(o=>`<button class="choice quizOption" data-opt="${o.originalIndex}">${esc(o.text)}</button>`).join("")}</div>
    <button id="checkPractice" class="primary big" style="margin-top:10px">Antwort prüfen</button><div id="practiceFeedback"></div>`;
  let selected=null;
  $$("[data-opt]").forEach(b=>b.onclick=()=>{$$("[data-opt]").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");selected=+b.dataset.opt});
  $("#checkPractice").onclick=()=>{
    if(selected===null){$("#practiceFeedback").innerHTML='<div class="feedback no">Wähle zuerst eine Antwort.</div>';return}
    const p=progressFor(i.id);p.attempts++;saveLocal();studentEvent(i.id,"checked",{ok:selected===i.correct});
    if(selected===i.correct)correctPractice(i);else retryPractice(i,"Noch nicht richtig. Diese Frage kommt am Ende noch einmal.")
  }
}
function renderVocabWriting(i){
  const direction="de-en",parts=vocabParts(i);
  const prompt=parts.de,expected=parts.en;
  $("#workInside").innerHTML=practiceHead()+`<span class="badge">🇬🇧 Schreiben · Deutsch → Englisch</span>
    <div class="small">Schreibe das englische Wort.</div><div class="question">${esc(prompt)}</div>
    <label class="writeLabel">Deine Antwort<input id="vocabWriteAnswer" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Antwort eintippen …"></label>
    <button id="checkVocabWrite" class="primary big">Prüfen</button><div id="practiceFeedback"></div>`;
  const input=$("#vocabWriteAnswer"),check=$("#checkVocabWrite");
  input.focus();
  const submit=()=>{
    if(state.practice?.locked)return;
    const answer=input.value.trim();
    if(!answer){$("#practiceFeedback").innerHTML='<div class="feedback no">Schreibe zuerst eine Antwort.</div>';return}
    const ok=vocabAnswerVariants(expected,direction).includes(normalizeVocabAnswer(answer));
    recordVocabResult(i,direction,ok);
    if(ok)correctPractice(i,"✓ Richtig geschrieben!");
    else retryPractice(i,`Noch nicht richtig. Richtig wäre: ${expected}`,1700)
  };
  check.onclick=submit;
  input.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submit()}})
}
function renderVocabFlashcard(i){
  const direction=i._vocabDirection||"de-en",parts=vocabParts(i);
  const prompt=direction==="de-en"?parts.de:parts.en;
  const answer=direction==="de-en"?parts.en:parts.de;
  $("#workInside").innerHTML=practiceHead()+`<span class="badge">🇬🇧 Flashkarten · ${direction==="de-en"?"Deutsch → Englisch":"Englisch → Deutsch"}</span>
    <div id="vocabFlipCard" class="flashcard" role="button" tabindex="0" aria-label="Karte umdrehen">
      <div id="vocabCardFront"><div class="small">Vorderseite · tippe zum Umdrehen</div><div class="front">${esc(prompt)}</div></div>
      <div id="vocabCardBack" class="hidden"><div class="small">Rückseite · tippe zum Zurückdrehen</div><div class="backText">${esc(answer)}</div></div>
    </div>
    <button id="flipVocabCard" class="primary big">Karte umdrehen</button>
    <div id="vocabCardRate" class="actions hidden" style="margin-top:10px">
      <button class="ghost" data-vocab-rate="no">Nicht gewusst</button><button class="ghost" data-vocab-rate="maybe">Unsicher</button><button class="primary" data-vocab-rate="yes">Gewusst</button>
    </div><div id="practiceFeedback"></div>`;
  let back=false;
  const flip=()=>{
    back=!back;
    $("#vocabCardFront").classList.toggle("hidden",back);
    $("#vocabCardBack").classList.toggle("hidden",!back);
    $("#flipVocabCard").textContent=back?"Zur Vorderseite":"Karte umdrehen";
    if(back)$("#vocabCardRate").classList.remove("hidden")
  };
  $("#vocabFlipCard").onclick=flip;
  $("#vocabFlipCard").onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip()}};
  $("#flipVocabCard").onclick=flip;
  $$("[data-vocab-rate]").forEach(b=>b.onclick=()=>{if(b.dataset.vocabRate==="yes")correctPractice(i,"✓ Gewusst.");else retryPractice(i,b.dataset.vocabRate==="maybe"?"Unsicher – die Karte kommt später noch einmal.":"Nicht gewusst – die Karte kommt später noch einmal.")})
}
function renderFlashcard(i){
  $("#workInside").innerHTML=practiceHead()+`<span class="badge">${esc(subjectMeta(i.subject).name)} · Flashkarte</span>
    <div class="flashcard"><div id="flashFront"><div class="small">Überlege zuerst selbst.</div><div class="front">${esc(i.question)}</div></div>
    <div id="flashBack" class="hidden"><div class="small">Antwort</div><div class="backText">${esc(i.answer)}</div></div></div>
    <button id="showFlash" class="primary big">Antwort zeigen</button>
    <div id="flashRate" class="actions hidden" style="margin-top:10px">
      <button class="ghost" data-rate="no">Nicht gewusst</button><button class="ghost" data-rate="maybe">Unsicher</button><button class="primary" data-rate="yes">Gewusst</button>
    </div><div id="practiceFeedback"></div>`;
  $("#showFlash").onclick=()=>{$("#flashFront").classList.add("hidden");$("#flashBack").classList.remove("hidden");$("#showFlash").classList.add("hidden");$("#flashRate").classList.remove("hidden")};
  $$("[data-rate]").forEach(b=>b.onclick=()=>{if(b.dataset.rate==="yes")correctPractice(i,"✓ Gewusst.");else retryPractice(i,b.dataset.rate==="maybe"?"Unsicher – die Karte kommt später noch einmal.":"Nicht gewusst – die Karte kommt später noch einmal.")})
}
function renderPracticeCloze(i){
  let line=esc(i.template);
  i.gaps.forEach((g,n)=>{
    const shown=shuffledOptions(g.options);
    const opts=['<option value="">Bitte wählen</option>',...shown.map(o=>`<option value="${o.originalIndex}">${esc(o.text)}</option>`)].join("");
    line=line.replace(`{${n}}`,`<select class="inlineSelect gap" data-gap="${n}">${opts}</select>`)
  });
  $("#workInside").innerHTML=practiceHead()+`<div class="question">${esc(i.question)}</div><div class="lessonSection">${line}</div>
    <button id="checkPractice" class="primary big">Prüfen</button><div id="practiceFeedback"></div>`;
  $("#checkPractice").onclick=()=>{
    const vals=$$(".gap").map(x=>x.value);if(vals.some(v=>v==="")){$("#practiceFeedback").innerHTML='<div class="feedback no">Fülle zuerst alle Lücken aus.</div>';return}
    const ok=vals.every((v,n)=>+v===i.gaps[n].correct);const p=progressFor(i.id);p.attempts++;saveLocal();
    if(ok)correctPractice(i);else retryPractice(i,"Noch nicht richtig. Diese Aufgabe kommt am Ende noch einmal.")
  }
}
function renderPracticeBuilder(i){
  let selected=[];
  $("#workInside").innerHTML=practiceHead()+`<div class="question">${esc(i.question)}</div>
    <div id="builderOut" class="builderOut">Tippe die Satzteile in der richtigen Reihenfolge an.</div>
    <div class="chips">${i.parts.map((x,n)=>`<button class="chip" data-part="${n}">${esc(x)}</button>`).join("")}</div>
    <div class="actions"><button id="resetBuilder" class="ghost">Neu</button><button id="checkPractice" class="primary">Prüfen</button></div><div id="practiceFeedback"></div>`;
  const redraw=()=>{$("#builderOut").textContent=selected.length?selected.map(n=>i.parts[n]).join(" "):"Tippe die Satzteile in der richtigen Reihenfolge an.";$$("[data-part]").forEach(b=>b.classList.toggle("used",selected.includes(+b.dataset.part)))};
  $$("[data-part]").forEach(b=>b.onclick=()=>{const n=+b.dataset.part;if(!selected.includes(n)){selected.push(n);redraw()}});
  $("#resetBuilder").onclick=()=>{selected=[];redraw()};
  $("#checkPractice").onclick=()=>{const ok=JSON.stringify(selected)===JSON.stringify(i.correctOrder);if(ok)correctPractice(i);else retryPractice(i,"Die Reihenfolge stimmt noch nicht. Diese Aufgabe kommt am Ende noch einmal.")}
}

/* Homework */
function renderHomework(i){
  if(i.type==="choicewriting")return renderChoiceWritingHomework(i);
  if(i.type==="writing")return renderWritingHomework(i);
  const p=progressFor(i.id);let answers=Array(i.steps.length).fill(null);
  const shownSteps=i.steps.map(s=>({...s,shownOptions:shuffledOptions(s.options)}));
  $("#workInside").innerHTML=`<span class="badge">${esc(subjectMeta(i.subject).name)} · Hausaufgabe</span><h2>${esc(i.title)}</h2>
    ${homeworkDateText(i)?`<div class="badge warn">📅 ${esc(homeworkDateText(i))}</div>`:""}${originalPagesHtml(i)}
    <div class="homeworkIntro"><strong>Deine Aufgabe:</strong><p>${esc(i.question)}</p></div>
    ${shownSteps.map((s,n)=>`<div class="stepBox"><h3>${n+1}. ${esc(s.prompt)}</h3>${s.shownOptions.map(o=>`<button class="choice guidedChoice" data-step="${n}" data-opt="${o.originalIndex}">${esc(o.text)}</button>`).join("")}</div>`).join("")}
    <button id="checkHomework" class="primary big">Meine Auswahl prüfen</button><div id="homeFeedback"></div><div id="finalArea">${p.answer?`<div class="finalBox"><strong>Endfassung:</strong><br>${esc(p.answer)}</div>`:""}</div>
    <button id="closeHomework" class="ghost big" style="margin-top:10px">Schließen</button>`;
  addDialogClose("#workDialog",()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)});
  $("#workDialog").showModal();
  $$(".guidedChoice").forEach(b=>b.onclick=()=>{const s=+b.dataset.step;answers[s]=+b.dataset.opt;$$(`.guidedChoice[data-step="${s}"]`).forEach(x=>x.classList.remove("selected"));b.classList.add("selected")});
  $("#checkHomework").onclick=async()=>{
    if(answers.some(x=>x===null)){$("#homeFeedback").innerHTML='<div class="feedback no">Beantworte zuerst alle kleinen Schritte.</div>';return}
    const ok=answers.every((v,n)=>v===i.steps[n].correct);p.attempts++;saveLocal();
    if(!ok){$("#homeFeedback").innerHTML='<div class="feedback no">Mindestens eine Auswahl passt noch nicht. Prüfe die Schritte noch einmal.</div>';return}
    await completeItem(i,i.finalText);$("#homeFeedback").innerHTML='<div class="feedback ok">✓ Richtig ausgewählt.</div>';$("#finalArea").innerHTML=`<div class="finalBox"><strong>Endfassung zum Abschreiben:</strong><br>${esc(i.finalText)}</div>`
  };
  $("#closeHomework").onclick=()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)}
}

function renderChoiceWritingHomework(i){
  const p=progressFor(i.id),variants=i.variants||[];
  p.variantAnswers??={};let selected=p.choiceVariant||"";
  const shell=()=>{
    $("#workInside").innerHTML=`<span class="badge">${esc(subjectMeta(i.subject).name)} · Hausaufgabe</span><h2>${esc(i.title)}</h2>
      ${homeworkDateText(i)?`<div class="badge warn">📅 ${esc(homeworkDateText(i))}</div>`:""}${originalPagesHtml(i)}
      <div class="homeworkIntro"><strong>Deine Aufgabe:</strong><p>${esc(i.question)}</p></div>
      <div class="grid">${variants.map(v=>`<button class="choice variantPick ${selected===v.id?"selected":""}" data-variant="${esc(v.id)}"><strong>${esc(v.title)}</strong></button>`).join("")}</div>
      <div id="variantWork"></div><button id="closeHomework" class="ghost big" style="margin-top:10px">Schließen</button>`;
    $$(".variantPick").forEach(b=>b.onclick=()=>{selected=b.dataset.variant;p.choiceVariant=selected;p.updatedAt=Date.now();saveLocal();shell();renderVariant()});
    $("#closeHomework").onclick=()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)}
  };
  const renderVariant=()=>{
    if(!selected)return;const v=variants.find(x=>x.id===selected),target=$("#variantWork");if(!v||!target)return;
    target.innerHTML=`<div class="stepBox"><h3>${esc(v.title)}</h3><p>${esc(v.question)}</p>
      <div class="softPanel"><strong>So kannst du vorgehen:</strong><ol>${(v.guide||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>
      <label class="writeLabel">Deine Antwort<textarea id="choiceWritingAnswer" rows="8" placeholder="Schreibe hier deine eigene Antwort …">${esc(p.variantAnswers[selected]||"")}</textarea></label>
      <div class="actions"><button id="choiceWritingHelp" class="ghost">💡 Satzanfang</button><button id="choiceWritingSave" class="primary">✓ Für heute fertig</button></div>
      <div id="choiceWritingHelpArea"></div><div id="choiceWritingFeedback"></div></div>`;
    $("#choiceWritingAnswer").oninput=()=>{p.variantAnswers[selected]=$("#choiceWritingAnswer").value;p.answer=p.variantAnswers[selected];p.status="working";p.updatedAt=Date.now();saveLocal()};
    let helpLevel=0;
    $("#choiceWritingHelp").onclick=()=>{helpLevel++;$("#choiceWritingHelpArea").innerHTML=`<div class="helpBox"><strong>${helpLevel===1?"Satzanfang":"Beispiel zum Vergleichen"}</strong><p>${esc(helpLevel===1?v.starter:v.example)}</p></div>`;if(helpLevel>=2)$("#choiceWritingHelp").disabled=true};
    $("#choiceWritingSave").onclick=async()=>{const answer=$("#choiceWritingAnswer").value.trim();if(!answer){$("#choiceWritingFeedback").innerHTML='<div class="feedback no">Schreibe zuerst deine Antwort.</div>';return}p.variantAnswers[selected]=answer;await completeItem(i,`Variante ${selected}: ${answer}`);$("#choiceWritingFeedback").innerHTML='<div class="feedback ok">✓ Gespeichert. Deine eigene Antwort bleibt erhalten.</div>'}
  };
  shell();renderVariant();addDialogClose("#workDialog",()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)});$("#workDialog").showModal()
}


function renderGuidedWritingHomework(i){
  const p=progressFor(i.id),parts=i.guidedParts||[];
  let answers=Array.isArray(p.guidedAnswers)?p.guidedAnswers.slice(0,parts.length):[];
  while(answers.length<parts.length)answers.push("");
  const checks={...(p.guidedChecks||{})},helpLevels=Array(parts.length).fill(0);
  const combinedText=()=>answers.map(x=>(x||"").trim()).filter(Boolean).join("\n\n");
  const checked=k=>checks[k]?"checked":"";
  $("#workInside").innerHTML=`<span class="badge">${esc(subjectMeta(i.subject).name)} · Hausaufgabe</span><h2>${esc(i.title)}</h2>
    ${homeworkDateText(i)?`<div class="badge warn">📅 ${esc(homeworkDateText(i))}</div>`:""}${originalPagesHtml(i)}
    <div class="homeworkIntro"><strong>Deine Aufgabe:</strong><p>${esc(i.question)}</p></div>
    ${parts.map((part,n)=>`<div class="stepBox guidedWritingStep">
      <h3>${esc(part.heading)}</h3><p>${esc(part.prompt)}</p>
      <div class="softPanel"><strong>Diese Stichpunkte gehören hierhin:</strong><ul>${part.bullets.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
      <label class="writeLabel">Deine Sätze<textarea class="guidedTextPart" data-part="${n}" rows="4" placeholder="Schreibe hier mit deinen eigenen Worten …">${esc(answers[n]||"")}</textarea></label>
      <button class="ghost guidedPartHelp" data-help-part="${n}">💡 Satzanfang</button>
      <div class="guidedPartHelpArea" id="guidedHelp${n}"></div>
    </div>`).join("")}
    <div class="finalBox"><strong>Deine Inhaltsangabe bisher:</strong><div id="guidedCombined" style="white-space:pre-wrap;margin-top:8px">${esc(combinedText()||"Deine Abschnitte werden hier zusammengesetzt.")}</div></div>
    <div class="lessonSection"><strong>Zum Schluss selbst prüfen:</strong>
      <label><input class="writingCheck" data-check="intro" type="checkbox" ${checked("intro")}> Titel, Autor, Textsorte und Thema stehen in der Einleitung.</label>
      <label><input class="writingCheck" data-check="present" type="checkbox" ${checked("present")}> Ich habe im Präsens geschrieben.</label>
      <label><input class="writingCheck" data-check="factual" type="checkbox" ${checked("factual")}> Mein Text ist sachlich.</label>
      <label><input class="writingCheck" data-check="own" type="checkbox" ${checked("own")}> Ich habe eigene Worte benutzt.</label>
      <label><input class="writingCheck" data-check="order" type="checkbox" ${checked("order")}> Die Reihenfolge stimmt.</label>
    </div>
    <button id="guidedWritingSave" class="primary big">✓ Für heute fertig</button>
    <div id="writingFeedback"></div><button id="closeHomework" class="ghost big" style="margin-top:10px">Schließen</button>`;
  addDialogClose("#workDialog",()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)});$("#workDialog").showModal();
  const refreshCombined=()=>{const out=$("#guidedCombined");if(out)out.textContent=combinedText()||"Deine Abschnitte werden hier zusammengesetzt."};
  $$(".guidedTextPart").forEach(el=>el.oninput=()=>{
    const n=+el.dataset.part;answers[n]=el.value;p.guidedAnswers=answers;p.answer=combinedText();p.status="working";p.updatedAt=Date.now();saveLocal();refreshCombined()
  });
  $$(".guidedPartHelp").forEach(button=>button.onclick=()=>{
    const n=+button.dataset.helpPart,part=parts[n];helpLevels[n]=Math.min(2,helpLevels[n]+1);
    $("#guidedHelp"+n).innerHTML=`<div class="helpBox"><strong>${helpLevels[n]===1?"Satzanfang":"Beispiel zum Vergleichen"}</strong>
      <p>${esc(helpLevels[n]===1?part.starter:part.example)}</p></div>`;
    button.textContent=helpLevels[n]===1?"💡 Noch mehr Hilfe":"✓ Alle Hilfen angezeigt";
    if(helpLevels[n]>=2)button.disabled=true
  });
  $$(".writingCheck").forEach(c=>c.onchange=()=>{checks[c.dataset.check]=c.checked;p.guidedChecks=checks;saveLocal()});
  $("#guidedWritingSave").onclick=async()=>{
    const missing=answers.findIndex(x=>!(x||"").trim());
    if(missing>=0){$("#writingFeedback").innerHTML=`<div class="feedback no">Bearbeite zuerst Abschnitt ${missing+1}.</div>`;return}
    if(["intro","present","factual","own","order"].some(k=>!checks[k])){$("#writingFeedback").innerHTML='<div class="feedback no">Prüfe deinen Text und setze danach alle fünf Haken.</div>';return}
    const answer=combinedText();p.guidedAnswers=answers;p.guidedChecks=checks;await completeItem(i,answer);
    $("#writingFeedback").innerHTML='<div class="feedback ok">✓ Gespeichert. Deine eigene Inhaltsangabe wurde übernommen.</div>'
  };
  $("#closeHomework").onclick=()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)}
}

function renderWritingHomework(i){
  if((i.guidedParts||[]).length)return renderGuidedWritingHomework(i);
  const p=progressFor(i.id);let helpCount=0;
  $("#workInside").innerHTML=`<span class="badge">${esc(subjectMeta(i.subject).name)} · Hausaufgabe</span><h2>${esc(i.title)}</h2>
    ${homeworkDateText(i)?`<div class="badge warn">📅 ${esc(homeworkDateText(i))}</div>`:""}${originalPagesHtml(i)}
    <div class="homeworkIntro"><strong>Deine Aufgabe:</strong><p>${esc(i.question)}</p></div>
    ${(i.bullets||[]).length?`<div class="softPanel"><strong>Stichpunkte von der Tafel</strong><ol>${i.bullets.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div><div class="checkStrip"><span>✓ Präsens</span><span>✓ sachlich</span><span>✓ eigene Worte</span><span>✓ richtige Reihenfolge</span></div>`:""}
    <label class="writeLabel">Deine Antwort<textarea id="writingAnswer" rows="9" placeholder="Schreibe hier deine Antwort …">${esc(p.answer||"")}</textarea></label>
    <div class="actions"><button id="writingHelp" class="ghost">💡 Hilfe</button><button id="writingSave" class="primary">✓ Für heute fertig</button></div>
    <div id="writingHelpArea"></div><div id="writingFeedback"></div><button id="closeHomework" class="ghost big" style="margin-top:10px">Schließen</button>`;
  addDialogClose("#workDialog",()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)});$("#workDialog").showModal();
  $("#writingAnswer").oninput=()=>{p.answer=$("#writingAnswer").value;p.status="working";p.updatedAt=Date.now();saveLocal()};
  $("#writingHelp").onclick=()=>{if(!$("#writingAnswer").value.trim()){$("#writingFeedback").innerHTML='<div class="feedback no">Schreibe zuerst selbst einen Anfang. Danach bekommst du die erste Hilfe.</div>';return}if(helpCount<(i.helps||[]).length){helpCount++;$("#writingHelpArea").innerHTML=(i.helps||[]).slice(0,helpCount).map((h,n)=>`<div class="helpBox"><strong>Hilfe ${n+1}</strong>${esc(h)}</div>`).join("")}else if(i.finalText){$("#writingHelpArea").innerHTML+=`<div class="helpBox"><strong>Beispiel – erst mit deiner Fassung vergleichen</strong>${esc(i.finalText)}</div>`}else{$("#writingFeedback").innerHTML='<div class="feedback ok">Mehr Hilfen sind nicht hinterlegt. Deine eigene Antwort bleibt maßgeblich.</div>'}};
  $("#writingSave").onclick=async()=>{const a=$("#writingAnswer").value.trim();if(!a){$("#writingFeedback").innerHTML='<div class="feedback no">Schreibe zuerst deinen Hauptteil.</div>';return}await completeItem(i,a);$("#writingFeedback").innerHTML='<div class="feedback ok">✓ Gespeichert. Deine eigene Fassung bleibt erhalten.</div>'};
  $("#closeHomework").onclick=()=>{closeDialog("#workDialog");renderTopic(i.subject,i.topic)}
}

/* Solo quiz */
function startSoloQuiz(items){
  state.quiz={items:[...items],index:0,score:0,correct:0,timer:null,answered:false};
  renderSoloQuizQuestion()
}
function renderSoloQuizQuestion(){
  const q=state.quiz;if(!q)return;
  if(q.index>=q.items.length){finishSoloQuiz();return}
  const i=q.items[q.index];q.answered=false;
  const shown=shuffledOptions(i.options);
  $("#workInside").innerHTML=`<div class="sessionHead"><span>Quiz · Frage ${q.index+1} von ${q.items.length}</span></div>
    <span class="badge">${esc(subjectMeta(i.subject).name)} · ${esc(i.topic)}</span>
    <div class="question">${esc(i.question)}</div>
    <div>${shown.map(o=>`<button class="choice quizOption" data-qopt="${o.originalIndex}" style="text-align:left"><span style="display:block;font-weight:700">${esc(o.text)}</span><span class="quizAnswerExplanation hidden" style="display:block;margin-top:8px;font-weight:400;line-height:1.45"></span></button>`).join("")}</div>
    <div id="quizFeedback"></div><button id="quizNext" class="primary big hidden">Weiter</button>`;
  addDialogClose("#workDialog",abortWorkDialog);
  $("#workDialog").showModal();
  $$("[data-qopt]").forEach(b=>b.onclick=()=>answerSoloQuiz(i,+b.dataset.qopt));
}
function answerSoloQuiz(i,opt){
  const q=state.quiz;if(!q||q.answered)return;q.answered=true;clearInterval(q.timer);
  const ok=opt===i.correct;let gained=0;
  if(ok){gained=1;q.score+=1;q.correct++}
  $$("[data-qopt]").forEach(b=>{
    const index=+b.dataset.qopt;b.disabled=true;b.style.opacity="1";
    if(index===i.correct)b.classList.add("correct");else if(index===opt)b.classList.add("wrong");
    const explanation=b.querySelector(".quizAnswerExplanation");
    explanation.textContent=(i.explanations||[])[index]||(index===i.correct?"Diese Antwort ist richtig.":"Diese Antwort ist nicht richtig.");
    explanation.classList.remove("hidden")
  });
  $("#quizFeedback").innerHTML=`<div class="feedback ${ok?"ok":"no"}">${ok?`✓ Richtig · +${gained} Punkt`:"Noch nicht richtig. Lies dir die Erklärungen in Ruhe durch."}</div>`;
  studentEvent(i.id,"checked",{ok,quiz:true,score:gained});
  $("#quizNext").classList.remove("hidden");
  $("#quizNext").onclick=()=>{q.index++;renderSoloQuizQuestion()}
}
function finishSoloQuiz(){
  const q=state.quiz;clearInterval(q.timer);
  const percent=Math.round(q.correct/q.items.length*100);
  $("#workInside").innerHTML=`<div style="text-align:center"><span class="sectionTitle">Quiz geschafft</span><div class="scoreBig">${q.score.toLocaleString("de-DE")} Punkte</div>
    <p><strong>${q.correct} von ${q.items.length}</strong> richtig · ${percent}%</p>
    <button id="quizDone" class="primary big">Zurück zum Thema</button></div>`;
  addDialogClose("#workDialog",()=>{clearInterval(q.timer);state.quiz=null;closeDialog("#workDialog");renderTopic(state.currentSubject,state.currentTopic)});
  $("#quizDone").onclick=()=>{closeDialog("#workDialog");state.quiz=null;renderTopic(state.currentSubject,state.currentTopic)}
}

/* Profile */
function renderProfileSetup(first){
  let selected=state.profile?.avatar||"🦊";
  $("#profileInside").innerHTML=`<span class="sectionTitle">Schülerprofil</span><h2>${first?"Dein Profil einrichten":"Profil ändern"}</h2>
    <p class="small">Andere Schüler sehen nur deinen Spitznamen und Avatar.</p>
    <label>Spitzname<input id="nicknameInput" maxlength="24" value="${esc(state.profile?.nickname||"")}"></label>
    <label>Avatar</label><div class="avatarGrid">${AVATARS.map(a=>`<button class="avatarChoice ${a===selected?"selected":""}" data-avatar="${a}">${a}</button>`).join("")}</div>
    <button id="saveProfile" class="primary big" style="margin-top:12px">Speichern</button>`;
  if(!first)addDialogClose("#profileDialog");
  else { const oldClose=$("#profileInside .dialogClose"); if(oldClose)oldClose.remove(); }
  $("#profileDialog").showModal();
  $$("[data-avatar]").forEach(b=>b.onclick=()=>{selected=b.dataset.avatar;$$("[data-avatar]").forEach(x=>x.classList.toggle("selected",x.dataset.avatar===selected))});
  $("#saveProfile").onclick=async()=>{
    const nickname=$("#nicknameInput").value.trim();if(!nickname){toast("Bitte einen Spitznamen eingeben.");return}
    if(studentSession?.demo){
      state.profile={...(state.profile||{}),nickname,avatar:selected};saveLocal()
    }else{
      try{
        state.profile=await rpc("lerninsel_student_set_profile",{p_public_code:studentSession.roomCode,p_student_code:studentSession.studentCode,p_nickname:nickname,p_avatar:selected})
      }catch(e){toast("Profil konnte noch nicht online gespeichert werden.");state.profile={...(state.profile||{}),nickname,avatar:selected}}
    }
    closeDialog("#profileDialog");renderStudentDashboard()
  }
}

/* Global reward game */
async function openGame(){
  const tokens=gameTokensAvailable();
  if(teacherTestMode){
    $("#gameInside").innerHTML=`<span class="sectionTitle">Testmodus</span><h2>🐚 Muschel-Sammler</h2>
      <p>Das Spiel ist zum Testen auch mit 0 Punkten freigeschaltet. Das Ergebnis wird nicht gespeichert.</p>
      <button id="startShellGame" class="primary big">Spiel testen</button>`;
    addDialogClose("#gameDialog");$("#gameDialog").showModal();
    $("#startShellGame").onclick=consumeGameTokenAndStart;return
  }
  if(tokens<=0){
    $("#gameInside").innerHTML=`<span class="sectionTitle">Minispiel</span><h2>🔒 Noch gesperrt</h2>
      <p>Für jeweils <strong>4 Inselpunkte</strong> bekommst du eine Spielrunde.</p>
      <p class="small">Du hast gerade ${pointsTotal()} Inselpunkte.</p><button id="closeGameInfo" class="ghost big">Zurück</button>`;
    addDialogClose("#gameDialog");$("#gameDialog").showModal();$("#closeGameInfo").onclick=()=>closeDialog("#gameDialog");return
  }
  $("#gameInside").innerHTML=`<span class="sectionTitle">Minispiel</span><h2>🐚 Muschel-Sammler</h2>
    <p>Eine Spielrunde kostet 1 Spielmarke. Tippe in 30 Sekunden so viele Muscheln wie möglich an.</p>
    <button id="startShellGame" class="primary big">Spiel starten · ${tokens} Marke(n) verfügbar</button>`;
  addDialogClose("#gameDialog");$("#gameDialog").showModal();
  $("#startShellGame").onclick=consumeGameTokenAndStart
}
async function consumeGameTokenAndStart(){
  if(teacherTestMode){startShellGame();return}
  if(studentSession?.demo){
    state.profile.games_spent=Number(state.profile.games_spent||0)+1;saveLocal();startShellGame();return
  }
  try{
    const r=await rpc("lerninsel_student_use_game_token",{p_public_code:studentSession.roomCode,p_student_code:studentSession.studentCode});
    if(!r?.ok){toast("Noch keine Spielmarke verfügbar.");return}
    state.profile.games_spent=r.games_spent;startShellGame()
  }catch(e){toast("Spielmarke konnte nicht eingelöst werden.")}
}
function startShellGame(){
  let score=0,time=30,timer=null,spawn=null;
  $("#gameInside").innerHTML=`<div class="gameHud"><span>🐚 <span id="shellScore">0</span></span><span>⏱️ <span id="shellTime">30</span>s</span></div><div id="gameArea" class="gameArea"></div>`;
  const area=$("#gameArea");
  function makeShell(){
    const b=document.createElement("button");b.className="shell";b.textContent=["🐚","⭐","🪸"][Math.floor(Math.random()*3)];
    b.style.left=(5+Math.random()*84)+"%";b.style.top=(10+Math.random()*75)+"%";
    b.onclick=()=>{score++;$("#shellScore").textContent=score;b.remove()};area.appendChild(b);setTimeout(()=>b.remove(),1200)
  }
  spawn=setInterval(makeShell,450);timer=setInterval(()=>{
    time--;$("#shellTime").textContent=time;
    if(time<=0){clearInterval(timer);clearInterval(spawn);finishShellGame(score)}
  },1000)
}
async function finishShellGame(score){
  const old=Number(state.profile?.game_best||0);if(score>old){
    state.profile.game_best=score;
    if(teacherTestMode){}
    else if(studentSession?.demo)saveLocal();
    else rpc("lerninsel_student_save_game_best",{p_public_code:studentSession.roomCode,p_student_code:studentSession.studentCode,p_score:score}).catch(()=>{})
  }
  $("#gameInside").innerHTML=`<div style="text-align:center"><span class="sectionTitle">Spiel vorbei</span><div class="scoreBig">${score}</div><p>Muscheln gesammelt</p>
    <p class="small">Bestwert: ${Math.max(old,score)}</p><button id="gameDone" class="primary big">Fertig</button></div>`;
  $("#gameDone").onclick=()=>{closeDialog("#gameDialog");updateGameButton()}
}

/* ---------------- PARENT ---------------- */
async function bootParent(){
  $("#gameTopBtn").classList.add("hidden");$("#teacherLogoutBtn").classList.add("hidden");
  if(parentSession){
    try{
      const r=await rpc("lerninsel_parent_code_login",{p_public_code:parentSession.roomCode,p_parent_code:parentSession.parentCode});
      if(r?.student){renderParentState(r);return}
    }catch{}
  }
  renderParentLogin()
}
function renderParentLogin(){
  MAIN.innerHTML=`<div class="card authCard"><span class="sectionTitle">Eltern</span><h2>Lernstand öffnen</h2>
    <p class="small">Keine E-Mail und kein Passwort nötig.</p>
    <label>Lernraum-Code<input id="parentRoom" autocapitalize="characters" placeholder="ABCD-EFGH"></label>
    <label>Persönlicher Elterncode<input id="parentCode" autocapitalize="characters" placeholder="ABCDE-FGHIJ"></label>
    <button id="parentLoginBtn" class="primary big" style="margin-top:12px">Öffnen</button><p id="parentMsg" class="small"></p></div>`;
  $("#parentLoginBtn").onclick=async()=>{
    const room=$("#parentRoom").value.trim().toUpperCase(),code=$("#parentCode").value.trim().toUpperCase(),m=$("#parentMsg");m.textContent="Verbinde …";
    try{const r=await rpc("lerninsel_parent_code_login",{p_public_code:room,p_parent_code:code});if(!r?.student)throw new Error();
      parentSession={roomCode:room,parentCode:code};localStorage.setItem(KEYS.parentSession,JSON.stringify(parentSession));renderParentState(r)
    }catch{m.textContent="Zugang nicht gefunden. Bitte beide Codes prüfen."}
  }
}
function renderParentState(r){
  const items=(r.items||[]).map(normalizeBuiltInTopic),prog=r.progress||{},profile=r.profile||{};
  const nonQuiz=items.filter(i=>i.kind!=="quiz"),done=nonQuiz.filter(i=>prog[i.id]?.status==="completed").length;
  const byTopic={};nonQuiz.forEach(i=>{const k=`${i.subject}|${i.topic}`;(byTopic[k]??=[]).push(i)});
  MAIN.innerHTML=`<div class="card profileBar"><div class="profileLeft"><div class="avatar">${esc(profile.avatar||"🙂")}</div>
    <div><strong>${esc(profile.nickname||r.student.label||"Kind")}</strong><div class="small">${done} von ${nonQuiz.length} Lernaufgaben erledigt</div></div></div></div>
    <span class="sectionTitle">Lernstand</span><h2>Übersicht</h2>
    <div class="grid">${Object.entries(byTopic).map(([k,arr])=>{const [sid,topic]=k.split("|"),d=arr.filter(i=>prog[i.id]?.status==="completed").length;
      return `<div class="card"><strong>${esc(subjectMeta(sid).name)} · ${esc(topic)}</strong><p class="small">${d}/${arr.length} erledigt</p>
        ${arr.map(i=>`<div class="small" style="padding:5px 0">${prog[i.id]?.status==="completed"?"✓":"○"} ${esc(kindName(i.kind))}: ${esc(i.title)}</div>`).join("")}</div>`}).join("")}</div>`
}

/* ---------------- TEACHER ---------------- */
async function bootTeacher(){
  teacherTestMode=false;
  $("#gameTopBtn").classList.add("hidden");$("#teacherLogoutBtn").classList.remove("hidden");$("#teacherLogoutBtn").textContent="Abmelden";$("#teacherLogoutBtn").onclick=teacherLogout;
  if(await ensureAuth())await openTeacher();else renderTeacherLogin()
}
function renderTeacherLogin(){
  $("#teacherLogoutBtn").classList.add("hidden");
  $("#teacherLogoutBtn").textContent="Abmelden";
  MAIN.innerHTML=`<div class="card authCard"><span class="sectionTitle">Lehrer</span><h2>Lehrerbereich</h2>
    <label>E-Mail<input id="teacherEmail" type="email" autocomplete="username"></label>
    <label>Passwort<input id="teacherPassword" type="password" autocomplete="current-password"></label>
    <button id="teacherLogin" class="primary big" style="margin-top:12px">Anmelden</button><p id="teacherMsg" class="small"></p></div>`;
  $("#teacherLogin").onclick=async()=>{
    const m=$("#teacherMsg");m.textContent="Anmeldung …";
    try{await signIn($("#teacherEmail").value.trim(),$("#teacherPassword").value);await openTeacher()}
    catch(e){m.textContent="Anmeldung fehlgeschlagen."}
  }
}
async function openTeacher(){
  $("#teacherLogoutBtn").classList.remove("hidden");
  try{
    const rooms=await rpc("lerninsel_teacher_list_rooms",{},true);
    state.teacher.rooms=Array.isArray(rooms)?rooms:[];
    if(Array.isArray(rooms)&&rooms.length){
      const saved=teacherRoom&&rooms.find(r=>r.id===teacherRoom.roomId),r=saved||rooms[0];
      teacherRoom={roomId:r.id,publicCode:r.publicCode,name:r.name};localStorage.setItem(KEYS.teacherRoom,JSON.stringify(teacherRoom));
      await teacherPull()
    }else{teacherRoom=null;state.teacher.library=[];renderTeacher()}
  }catch(e){renderTeacher();toast("Lehrerbereich konnte nicht vollständig geladen werden.")}
}
async function teacherPull(){
  if(!teacherRoom){renderTeacher();return}
  try{
    const r=await rpc("lerninsel_teacher_get_state",{p_room_id:teacherRoom.roomId},true);
    state.teacher.students=r?.students||[];state.teacher.items=(r?.items||[]).map(normalizeBuiltInTopic);state.teacher.progress=r?.progress||{};state.teacher.events=r?.events||[];state.teacher.parents=r?.parents||[];
    state.teacher.roomSubjects=r?.roomSubjects||{};state.teacher.studentSubjects=r?.studentSubjects||{};
    try{state.teacher.profiles=await rpc("lerninsel_teacher_get_profiles",{p_room_id:teacherRoom.roomId},true)||[]}catch{state.teacher.profiles=[]}
    try{state.teacher.library=await rpc("lerninsel_teacher_library_get",{},true)||[]}catch{state.teacher.library=[]}
  }catch{}
  renderTeacher()
}
function renderTeacher(){
  const room=teacherRoom?`<span class="badge good">Lernraum ${esc(teacherRoom.publicCode)}</span>`:'<span class="badge warn">Noch kein Lernraum</span>';
  const rooms=state.teacher.rooms||[];
  MAIN.innerHTML=`<div class="card"><span class="sectionTitle">Lehrerbereich</span><h2 style="margin:.3rem 0">Lerninsel verwalten</h2>${room}
    <div class="classBar"><label>Aktuelle Klasse<select id="teacherRoomSelect" ${rooms.length?"":"disabled"}>${rooms.map(r=>`<option value="${r.id}" ${teacherRoom?.roomId===r.id?"selected":""}>${esc(r.name)} · ${esc(r.publicCode)}</option>`).join("")||'<option>Noch keine Klasse</option>'}</select></label><button id="newClassTop" class="ghost">+ Neue Klasse</button></div></div>
    <div class="tabs"><button class="tab ${teacherActiveTab==="content"?"active":""}" data-tab="content">Inhalte</button><button class="tab ${teacherActiveTab==="students"?"active":""}" data-tab="students">Schüler</button>
    <button class="tab ${teacherActiveTab==="progress"?"active":""}" data-tab="progress">Lernstand</button><button class="tab ${teacherActiveTab==="live"?"active":""}" data-tab="live">Live-Quiz</button><button class="tab ${teacherActiveTab==="test"?"active":""}" data-tab="test">Testen</button><button class="tab ${teacherActiveTab==="online"?"active":""}" data-tab="online">Online</button></div>
    <div id="teacherPane"></div>`;
  $$("[data-tab]").forEach(b=>b.onclick=()=>{teacherActiveTab=b.dataset.tab;$$("[data-tab]").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderTeacherPane(teacherActiveTab)});
  if($("#teacherRoomSelect"))$("#teacherRoomSelect").onchange=async e=>{const r=rooms.find(x=>x.id===e.target.value);if(!r)return;teacherRoom={roomId:r.id,publicCode:r.publicCode,name:r.name};localStorage.setItem(KEYS.teacherRoom,JSON.stringify(teacherRoom));await teacherPull()};
  $("#newClassTop").onclick=()=>{teacherActiveTab="online";renderTeacher()};
  renderTeacherPane(teacherActiveTab)
}
function teacherRoomChecks(selected=[],className="roomAssign"){
  const chosen=new Set(selected||[]),rooms=state.teacher.rooms||[];
  return `<div class="roomChecks">${rooms.map(r=>`<label class="roomCheck"><input type="checkbox" class="${className}" value="${r.id}" ${chosen.has(r.id)?"checked":""}>${esc(r.name)}</label>`).join("")||'<span class="small">Zuerst eine Klasse anlegen.</span>'}</div>`
}
function selectedRoomIds(selector){return $$(selector).filter(x=>x.checked).map(x=>x.value)}
function libraryKindLabel(i){return itemCategory(i)==="bookpages"?"Buchseiten":itemCategory(i)==="homework"?"Hausaufgabe":itemCategory(i)==="vocab"?"Vokabel":"Lerninhalt"}
function libraryEntryHtml(entry){
  const i=entry.item||{},active=new Set(entry.roomIds||[]),rooms=state.teacher.rooms||[];
  return `<div class="libraryItem"><div><span class="badge">${esc(libraryKindLabel(i))}</span><h4>${esc(i.title||"Ohne Titel")}</h4><div class="small">${esc(subjectMeta(i.subject).name)} · ${esc(i.topic||"")}${homeworkDateText(i)?` · ${esc(homeworkDateText(i))}`:""}</div></div>
    <div class="roomChecks">${rooms.map(r=>`<label class="roomCheck"><input type="checkbox" class="libraryRoomToggle" data-item-id="${esc(i.id)}" data-room-id="${r.id}" ${active.has(r.id)?"checked":""}>${esc(r.name)}</label>`).join("")}</div></div>`
}
function renderTeacherPane(tab){
  const p=$("#teacherPane");if(!p)return;
  if(tab==="content"){
    const all=state.teacher.library||[];
    const q=teacherContentSearch.toLowerCase();
    const filtered=all.filter(e=>{const i=e.item||{},cat=itemCategory(i);return (teacherContentFilter==="all"||cat===teacherContentFilter)&&(!q||`${i.title||""} ${i.topic||""} ${subjectMeta(i.subject).name}`.toLowerCase().includes(q))});
    const defaultRooms=teacherRoom?[teacherRoom.roomId]:[];
    p.innerHTML=`<div class="card"><span class="sectionTitle">Dauerhafte Inhaltsbibliothek</span><h3>Inhalte und Klassen</h3><p class="small">Ein Haken zeigt den Inhalt in einer Klasse. Entfernst du ihn, bleiben Inhalt und bisheriger Lernstand erhalten.</p>
      <div class="libraryTools"><input id="contentSearch" placeholder="Inhalte suchen …" value="${esc(teacherContentSearch)}"><select id="contentFilter"><option value="all">Alle Inhalte</option><option value="bookpages" ${teacherContentFilter==="bookpages"?"selected":""}>Buchseiten</option><option value="homework" ${teacherContentFilter==="homework"?"selected":""}>Hausaufgaben</option><option value="vocab" ${teacherContentFilter==="vocab"?"selected":""}>Englisch-Vokabeln</option><option value="learning" ${teacherContentFilter==="learning"?"selected":""}>Weitere Lerninhalte</option></select></div>
      ${all.length?filtered.map(libraryEntryHtml).join("")||'<p class="small">Keine passenden Inhalte gefunden.</p>':`<div class="teacherForm"><strong>Noch keine zentrale Bibliothek geladen.</strong><p class="small">Die bisherigen Lerninhalte können übernommen und der aktuellen Klasse zugewiesen werden.</p></div>`}
      <button id="seedLibrary" class="ghost big" ${teacherRoom?"":"disabled"}>${all.length?"Grundinhalte für diese Klasse ergänzen":"Vorhandene Lerninhalte übernehmen"}</button>
      <button id="seedNotebookOptics" class="ghost big" ${teacherRoom?"":"disabled"}>Neue Natur-, GSEL- und Hausaufgaben übernehmen</button>
      <button id="seedSandokan" class="ghost big" ${teacherRoom?"":"disabled"}>GSEL 2: Sandokan mit Fragen übernehmen</button>
      <p class="small">Enthält GSEL 1: „Aufgabe 5, Seite 13“ und das Rollenspiel sowie GSEL 2: Sandokan.</p>
    </div>
    <div class="card" style="margin-top:12px"><h3>Neue Inhalte anlegen</h3>
      <details class="teacherForm"><summary><strong>🧠 NotebookLM-Quiz importieren</strong></summary><p class="small">Den vollständigen JSON-Text aus NotebookLM hier einfügen. Jede Antwort sollte eine eigene Erklärung enthalten.</p><div class="formGrid"><label>Fach<select id="notebookSubject">${SUBJECTS.map(s=>`<option value="${s.id}" ${s.id==="natur"?"selected":""}>${s.icon} ${esc(s.name)}</option>`).join("")}</select></label><label>Thema<input id="notebookTopic" placeholder="z. B. Licht"></label></div><label>NotebookLM-JSON<textarea id="notebookJson" rows="10" placeholder='{"title":"…","questions":[…]}'></textarea></label>${teacherRoomChecks(defaultRooms,"notebookRoom")}<button id="importNotebookQuiz" class="primary big">Quiz importieren</button><p id="notebookMsg" class="small"></p></details>
      <details class="teacherForm"><summary><strong>🇬🇧 Englisch-Vokabel</strong></summary><div class="formGrid"><label>Englisch<input id="vocabEnglish" placeholder="z. B. school"></label><label>Deutsch<input id="vocabGerman" placeholder="z. B. die Schule"></label></div>${teacherRoomChecks(defaultRooms,"vocabRoom")}<button id="addVocabBtn" class="primary big" style="margin-top:10px">Vokabel speichern</button><p id="vocabMsg" class="small"></p></details>
      <details class="teacherForm"><summary><strong>📖 Buchseiten mit Zusammenfassung</strong></summary><div class="formGrid"><label>Fach<select id="bookSubject">${SUBJECTS.map(s=>`<option value="${s.id}">${s.icon} ${esc(s.name)}</option>`).join("")}</select></label><label>Worum geht es?<input id="bookTopic" placeholder="z. B. Ständeordnung"></label></div><label>Seitenangabe<input id="bookPages" placeholder="z. B. Seiten 42–43"></label><label>Originalseiten fotografieren oder auswählen<input id="bookFiles" type="file" accept="image/*,application/pdf" multiple></label><label>Zusammenfassung<textarea id="bookSummary" rows="6" placeholder="Einfache Zusammenfassung der Buchseiten …"></textarea></label>${teacherRoomChecks(defaultRooms,"bookRoom")}<button id="saveBookPages" class="primary big">Buchseiten speichern</button><p id="bookMsg" class="small"></p></details>
      <details class="teacherForm"><summary><strong>✏️ Hausaufgabe</strong></summary><div class="formGrid"><label>Fach<select id="homeSubject">${SUBJECTS.map(s=>`<option value="${s.id}">${s.icon} ${esc(s.name)}</option>`).join("")}</select></label><label>Thema<input id="homeTopic" placeholder="z. B. Balladen"></label><label>Aufgegeben am<input id="homeAssigned" type="date" value="${isoToday()}"></label><label>Abgabe bis<input id="homeDue" type="date"></label></div><label>Titel<input id="homeTitle" placeholder="z. B. John Maynard – Hauptteil"></label><label>Foto der Aufgabe<input id="homeFiles" type="file" accept="image/*,application/pdf" multiple></label><label>Aufgabe<textarea id="homeQuestion" rows="4" placeholder="Was soll erledigt werden?"></textarea></label><label>Hilfen – eine pro Zeile<textarea id="homeHelps" rows="4" placeholder="Erste Hilfe …&#10;Zweite Hilfe …"></textarea></label>${teacherRoomChecks(defaultRooms,"homeRoom")}<button id="saveHomework" class="primary big">Hausaufgabe speichern</button><p id="homeMsg" class="small"></p></details>
    </div>`;
    $("#contentSearch").onchange=e=>{teacherContentSearch=e.target.value;renderTeacherPane("content")};
    $("#contentFilter").onchange=e=>{teacherContentFilter=e.target.value;renderTeacherPane("content")};
    if($("#seedLibrary"))$("#seedLibrary").onclick=teacherSeedLibrary;
    $("#seedNotebookOptics").onclick=teacherSeedNotebookOptics;
    $("#seedSandokan").onclick=teacherSeedSandokan;
    $("#importNotebookQuiz").onclick=teacherImportNotebookQuiz;
    if($("#addVocabBtn"))$("#addVocabBtn").onclick=teacherAddVocab;
    $("#saveBookPages").onclick=teacherSaveBookPages;$("#saveHomework").onclick=teacherSaveHomework;
    $$(".libraryRoomToggle").forEach(x=>x.onchange=()=>teacherToggleLibraryRoom(x.dataset.itemId,x.dataset.roomId,x.checked))
  }
  if(tab==="students"){
    const suggestedCode=String(Math.floor(100000+Math.random()*900000));
    p.innerHTML=`<div class="card"><span class="sectionTitle">${esc(teacherRoom?.name||"Klasse")}</span><h3>Schüler und Eltern</h3><p class="small">Neue und neu vergebene Codes kannst du hier erneut kopieren. Ältere Codes wurden nur verschlüsselt gespeichert und müssen einmal neu vergeben werden.</p>
      ${teacherRoom?`<div class="teacherForm"><h4>Fächer für den ganzen Raum</h4><p class="small">Ohne Haken ist das Fach für alle Schüler pausiert. Inhalte und Lernstände bleiben erhalten.</p>${teacherSubjectChecks()}</div>`:""}
      ${teacherRoom?`<div class="teacherForm"><h4>Neuen Schüler anlegen</h4><label>Name oder Kürzel<input id="studentLabel" placeholder="z. B. Niklas"></label>
        <label>Persönlicher Schülercode<input id="studentCode" inputmode="numeric" maxlength="12" value="${suggestedCode}"></label>
        <button id="newStudent" class="primary big" style="margin-top:10px">Schüler anlegen</button><p id="studentCreateMsg" class="small"></p></div>`:
        `<p>Noch kein Lernraum vorhanden.</p><button id="newStudent" class="primary big">Lernraum erstellen</button>`}
      <div class="studentTable">${(state.teacher.students||[]).map(s=>{const pr=state.teacher.profiles.find(x=>x.studentId===s.id)||{},studentCode=savedTeacherAccessCode("students",s.id);
        const parents=(state.teacher.parents||[]).filter(x=>x.studentId===s.id&&x.active);
        return `<div class="libraryItem"><div class="studentRow" style="border:0;padding:0"><div><strong>${esc(s.label)}</strong><div class="small">${esc(pr.avatar||"")} ${esc(pr.nickname||"noch kein Profil")} · ${parents.length} ${parents.length===1?"Elternzugang":"Elternzugänge"}</div></div><div class="actions" style="flex:0 0 auto"><button class="ghost showParentForm" data-id="${s.id}">+ Eltern</button><button class="ghost deleteStudent" data-id="${s.id}">Löschen</button></div></div>
          <div class="teacherForm"><strong>Fächer für ${esc(s.label)}</strong><p class="small">Ohne Haken ist das Fach nur für diesen Schüler pausiert.</p>${teacherSubjectChecks(s.id)}</div>
          <div class="teacherForm"><strong>🎒 Schülercode: ${studentCode?`<code>${esc(studentCode.code)}</code>`:"nicht auslesbar"}</strong><div class="actions" style="margin-top:8px"><button class="ghost copyAccess" data-kind="students" data-id="${s.id}" ${studentCode?"":"disabled"}>Zugang kopieren</button><button class="ghost resetStudentCode" data-id="${s.id}">Code neu vergeben</button></div>${studentCode?"":'<div class="small">Der alte Code wurde nur verschlüsselt gespeichert.</div>'}</div>
          ${parents.map(x=>{const pc=savedTeacherAccessCode("parents",x.id);return `<div class="studentRow"><div><strong>👪 ${esc(x.label)}</strong><div class="small">Elterncode: ${pc?`<code>${esc(pc.code)}</code>`:"nicht auslesbar"}</div></div><div class="actions"><button class="ghost copyAccess" data-kind="parents" data-id="${x.id}" ${pc?"":"disabled"}>Kopieren</button><button class="ghost resetParentCode" data-id="${x.id}">Code neu</button></div></div>`}).join("")}
          <div class="parentForm hidden" data-parent-form="${s.id}"><label>Name/Bezeichnung<input class="parentLabel" placeholder="z. B. Mutter"></label><label>Elterncode<input class="parentAccessCode" value="${parentCode()}"></label><button class="primary big createParentAccess" data-id="${s.id}">Elternzugang erstellen</button><p class="small parentMsg"></p></div></div>`}).join("")||'<div class="small">Noch keine Schüler.</div>'}</div></div>`;
    $("#newStudent").onclick=teacherRoom?teacherCreateStudent:teacherCreateRoom;
    $$(".showParentForm").forEach(b=>b.onclick=()=>document.querySelector(`[data-parent-form="${b.dataset.id}"]`)?.classList.toggle("hidden"));
    $$(".createParentAccess").forEach(b=>b.onclick=()=>teacherCreateParentAccess(b.dataset.id));
    $$(".copyAccess").forEach(b=>b.onclick=()=>copyTeacherAccess(b.dataset.kind,b.dataset.id));
    $$(".resetStudentCode").forEach(b=>b.onclick=()=>teacherResetStudentCode(b.dataset.id));
    $$(".resetParentCode").forEach(b=>b.onclick=()=>teacherResetParentCode(b.dataset.id));
    $$(".deleteStudent").forEach(b=>b.onclick=()=>teacherDeleteStudent(b.dataset.id));
    $$(".roomSubjectToggle").forEach(x=>x.onchange=()=>teacherSetRoomSubject(x.dataset.subjectId,x.checked));
    $$(".studentSubjectToggle").forEach(x=>x.onchange=()=>teacherSetStudentSubject(x.dataset.studentId,x.dataset.subjectId,x.checked))
  }
  if(tab==="progress"){
    const prog=state.teacher.progress||{};
    p.innerHTML=(state.teacher.students||[]).map(s=>{
      const arr=(state.teacher.items||DEFAULT_CONTENT).filter(i=>subjectEnabledForStudent(s.id,i.subject)),d=arr.filter(i=>i.kind!=="quiz"&&prog?.[s.id]?.[i.id]?.status==="completed").length,total=arr.filter(i=>i.kind!=="quiz").length;
      return `<div class="card" style="margin-bottom:10px"><h3>${esc(s.label)}</h3><div class="kpiGrid"><div class="kpi"><strong>${d}/${total}</strong><span class="small">erledigt</span></div>
        <div class="kpi"><strong>${Object.values(prog?.[s.id]||{}).filter(x=>x?.rewarded).length}</strong><span class="small">Inselpunkte</span></div></div></div>`}).join("")||'<div class="card">Noch keine Schüler.</div>'
  }
  if(tab==="online"){
    p.innerHTML=`<div class="card"><h3>${teacherRoom?esc(teacherRoom.name):"Noch keine Klasse"}</h3>${teacherRoom?`<div class="liveCode">${esc(teacherRoom.publicCode)}</div><p class="small">Diesen Lernraum-Code bekommen Schüler und Eltern.</p><div class="teacherForm"><h4>Klasse benennen</h4><label>Klassenname<input id="renameRoomName" value="${esc(teacherRoom.name||"")}" placeholder="z. B. 7e"></label><button id="renameRoom" class="ghost big">Namen speichern</button><p id="renameRoomMsg" class="small"></p></div><button id="refreshTeacher" class="ghost big">Daten aktualisieren</button>`:""}
      <div class="teacherForm"><h4>Neue Klasse / neuen Lernraum erstellen</h4><label>Name der Klasse<input id="newRoomName" placeholder="z. B. 7e"></label><button id="createRoom" class="primary big">Klasse erstellen</button><p id="createRoomMsg" class="small"></p></div></div>`;
    $("#createRoom").onclick=teacherCreateRoom;if($("#refreshTeacher"))$("#refreshTeacher").onclick=teacherPull;if($("#renameRoom"))$("#renameRoom").onclick=teacherRenameRoom
  }
  if(tab==="live"){
    const items=(state.teacher.items?.length?state.teacher.items:DEFAULT_CONTENT).filter(i=>roomSubjectEnabled(i.subject));
    const topics=[...new Map(items.filter(i=>i.kind==="quiz").map(i=>[`${i.subject}|${i.topic}`,{subject:i.subject,topic:i.topic}])).values()];
    p.innerHTML=`<div class="card"><h3>⚡ Live-Quiz</h3><p class="small">Wie bei einem Klassenquiz: gleicher Fragensatz, Zeit läuft, richtige schnelle Antworten bringen mehr Punkte.</p>
      <label>Thema<select id="liveTopic">${topics.map(x=>`<option value="${x.subject}|${esc(x.topic)}">${esc(subjectMeta(x.subject).name)} · ${esc(x.topic)}</option>`).join("")}</select></label>
      <button id="startLiveTeacher" class="primary big" ${teacherRoom&&topics.length?"":"disabled"}>Live-Quiz erstellen</button><div id="teacherLiveArea"></div></div>`;
    $("#startLiveTeacher").onclick=teacherStartLiveQuiz
  }
  if(tab==="test"){
    p.innerHTML=`<div class="card"><h3>🧪 Schüleransicht testen</h3><p>Hier kannst du alle Fächer, Übungen, Quizze und das Spiel ausprobieren.</p>
      <p class="small">Der Test beginnt mit 0 Punkten. Nichts davon wird als echter Lernstand gespeichert.</p>
      <button id="startTeacherTest" class="primary big">Schüleransicht öffnen</button></div>`;
    $("#startTeacherTest").onclick=startTeacherTest
  }
}

function startTeacherTest(){
  teacherTestMode=true;
  teacherTestReturnSession=studentSession;
  role="student";
  studentSession={demo:true,teacherTest:true};
  state.student={id:"teacher-test",label:"Test-Schüler"};
  state.items=(state.teacher.items?.length?state.teacher.items:DEFAULT_CONTENT).filter(i=>roomSubjectEnabled(i.subject)).map(x=>normalizeBuiltInTopic(structuredClone(x)));
  state.progress={};
  state.profile={nickname:"Test",avatar:"🦊",games_spent:0,game_best:0};
  state.currentSubject=null;state.currentTopic=null;state.practice=null;state.quiz=null;state.live=null;
  $("#teacherLogoutBtn").classList.remove("hidden");
  $("#teacherLogoutBtn").textContent="← Lehreransicht";
  $("#teacherLogoutBtn").onclick=exitTeacherTest;
  openStudentHome()
}

async function exitTeacherTest(){
  ["#workDialog","#profileDialog","#gameDialog","#liveDialog"].forEach(closeDialog);
  teacherTestMode=false;
  role="teacher";
  studentSession=teacherTestReturnSession;
  teacherTestReturnSession=null;
  state.student=null;state.items=[];state.progress={};state.profile=null;
  state.currentSubject=null;state.currentTopic=null;state.practice=null;state.quiz=null;state.live=null;
  $("#gameTopBtn").classList.add("hidden");
  $("#teacherLogoutBtn").textContent="Abmelden";
  $("#teacherLogoutBtn").onclick=teacherLogout;
  await openTeacher()
}
function stableTextId(text){
  let hash=2166136261;
  for(const char of String(text)){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619)}
  return (hash>>>0).toString(36)
}
function parseNotebookQuizJson(raw){
  const cleaned=String(raw||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
  const data=JSON.parse(cleaned);
  if(!data||typeof data!=="object"||!Array.isArray(data.questions)||!data.questions.length)throw new Error("Keine Fragen gefunden.");
  if(data.questions.length>50)throw new Error("Bitte höchstens 50 Fragen auf einmal importieren.");
  const questions=data.questions.map((question,index)=>{
    if(!question||typeof question.question!=="string"||!question.question.trim())throw new Error(`Frage ${index+1} enthält keinen Fragetext.`);
    if(!Array.isArray(question.answers)||question.answers.length<2||question.answers.length>6)throw new Error(`Frage ${index+1} benötigt zwei bis sechs Antworten.`);
    const answers=question.answers.map((answer,answerIndex)=>{
      if(!answer||typeof answer.text!=="string"||!answer.text.trim())throw new Error(`Antwort ${answerIndex+1} bei Frage ${index+1} ist leer.`);
      if(typeof answer.explanation!=="string"||!answer.explanation.trim())throw new Error(`Bei Frage ${index+1} fehlt eine Erklärung.`);
      return {text:answer.text.trim(),correct:answer.correct===true,explanation:answer.explanation.trim()}
    });
    if(answers.filter(answer=>answer.correct).length!==1)throw new Error(`Frage ${index+1} muss genau eine richtige Antwort haben.`);
    return {question:question.question.trim(),answers}
  });
  return {title:String(data.title||"NotebookLM-Quiz").trim()||"NotebookLM-Quiz",questions}
}
async function teacherImportNotebookQuiz(){
  const msg=$("#notebookMsg"),button=$("#importNotebookQuiz"),subject=$("#notebookSubject")?.value,raw=$("#notebookJson")?.value;
  try{
    const quiz=parseNotebookQuizJson(raw),topic=$("#notebookTopic")?.value.trim()||quiz.title,roomIds=selectedRoomIds(".notebookRoom");
    if(!roomIds.length)throw new Error("Bitte mindestens eine Klasse auswählen.");
    button.disabled=true;msg.textContent=`${quiz.questions.length} Fragen werden gespeichert …`;
    for(const [index,question] of quiz.questions.entries()){
      const correct=question.answers.findIndex(answer=>answer.correct);
      const item={id:`quiz-${subject}-${stableTextId(`${topic}|${question.question}`)}`,subject,topic,kind:"quiz",type:"mcq",category:"learning",title:`${quiz.title} · Frage ${index+1}`,question:question.question,options:question.answers.map(answer=>answer.text),correct,explanations:question.answers.map(answer=>answer.explanation),source:"NotebookLM"};
      await rpc("lerninsel_teacher_library_upsert",{p_item:item,p_room_ids:roomIds},true)
    }
    toast(`✓ ${quiz.questions.length} Quizfragen importiert.`);await teacherPull()
  }catch(error){msg.textContent=error?.message||"Das Quiz konnte nicht importiert werden.";if(button)button.disabled=false}
}
async function teacherAddVocab(){
  const en=$("#vocabEnglish")?.value.trim(),de=$("#vocabGerman")?.value.trim(),msg=$("#vocabMsg");
  if(!en||!de){if(msg)msg.textContent="Bitte Englisch und Deutsch ausfüllen.";return}
  const v={id:"e-custom-"+uid(),en,de,topic:"Vokabeln & Sätze"};
  if(msg)msg.textContent="Vokabel wird gespeichert …";
  try{await teacherLibraryUpsert(vocabItem(v),selectedRoomIds(".vocabRoom"));toast("✓ Vokabel gespeichert.")}catch(e){if(msg)msg.textContent="Speichern nicht möglich. Bitte zuerst die v9-SQL-Datei in Supabase ausführen."}
}
async function teacherCreateRoom(){
  const input=$("#newRoomName"),name=input?.value.trim();
  if(!input){teacherActiveTab="online";renderTeacher();return}
  if(!name){$("#createRoomMsg").textContent="Bitte einen Klassennamen eingeben.";return}
  try{
    const code=roomCode(),id=await rpc("lerninsel_create_room",{p_name:name,p_public_code:code},true);
    teacherRoom={roomId:id,publicCode:code,name};localStorage.setItem(KEYS.teacherRoom,JSON.stringify(teacherRoom));toast("✓ Klasse erstellt: "+name);await openTeacher()
  }catch(e){$("#createRoomMsg").textContent="Klasse konnte nicht erstellt werden."}
}
async function teacherRenameRoom(){
  const name=$("#renameRoomName")?.value.trim(),msg=$("#renameRoomMsg");if(!name){if(msg)msg.textContent="Bitte einen Klassennamen eingeben.";return}
  try{await rpc("lerninsel_teacher_rename_room",{p_room_id:teacherRoom.roomId,p_name:name},true);teacherRoom.name=name;localStorage.setItem(KEYS.teacherRoom,JSON.stringify(teacherRoom));toast("✓ Klassenname gespeichert.");await openTeacher()}
  catch(e){if(msg)msg.textContent="Name konnte nicht gespeichert werden. Bitte die v9-SQL-Datei prüfen."}
}
async function teacherLibraryUpsert(item,roomIds){
  await rpc("lerninsel_teacher_library_upsert",{p_item:item,p_room_ids:roomIds||[]},true);
  await teacherPull()
}
async function teacherSeedLibrary(){
  if(!teacherRoom)return;
  try{await rpc("lerninsel_teacher_library_seed",{p_items:DEFAULT_CONTENT,p_room_id:teacherRoom.roomId},true);toast("✓ Lerninhalte übernommen.");await teacherPull()}
  catch(e){toast("Bitte zuerst supabase_v9_klassen_inhalte.sql in Supabase ausführen.")}
}
async function teacherSeedNotebookOptics(){
  if(!teacherRoom)return;
  const items=DEFAULT_CONTENT.filter(item=>item.subject==="natur"||item.id.startsWith("g1-staende-")||item.id.startsWith("g2-sandokan-"));
  try{
    await rpc("lerninsel_teacher_library_seed",{p_items:items,p_room_id:teacherRoom.roomId},true);
    await teacherPull();
    const homeworkLoaded=(state.teacher.items||[]).some(item=>item.id==="g1-staende-homework-aufgabe5-s13");
    if(homeworkLoaded){toast("✓ Neue Natur- und GSEL-Inhalte übernommen (inkl. Sandokan).")}
    else{alert("Die GSEL-Hausaufgabe ist noch nicht in der aktuellen Klasse angekommen. Bitte die Seite einmal neu laden und danach erneut auf den Aktualisieren-Knopf tippen.")}
  }catch(error){alert("Die neuen Inhalte konnten nicht übernommen werden. Bitte prüfen, ob du im Lehrerbereich angemeldet bist, und versuche es erneut.")}
}
async function teacherSeedSandokan(){
  if(!teacherRoom)return;
  const items=DEFAULT_CONTENT.filter(item=>item.id.startsWith("g2-sandokan-"));
  try{
    await rpc("lerninsel_teacher_library_seed",{p_items:items,p_room_id:teacherRoom.roomId},true);
    await teacherPull();
    const got=(state.teacher.items||[]).some(item=>item.id==="g2-sandokan-lesson");
    if(got)toast("✓ Sandokan und Fragen sind jetzt in GSEL 2.");
    else alert("Sandokan konnte in der aktuellen Klasse noch nicht bestätigt werden. Bitte die Klasse prüfen und erneut versuchen.");
  }catch(error){alert("Sandokan konnte nicht übernommen werden. Bitte die Lehreranmeldung und Supabase-Verbindung prüfen.")}
}
async function teacherSyncDefault(){return teacherSeedLibrary()}
async function teacherToggleLibraryRoom(itemId,roomId,checked){
  const entry=(state.teacher.library||[]).find(e=>e.item?.id===itemId);if(!entry)return;
  const ids=new Set(entry.roomIds||[]);if(checked)ids.add(roomId);else ids.delete(roomId);
  try{await teacherLibraryUpsert(entry.item,[...ids]);toast(checked?"✓ Inhalt eingeblendet.":"✓ Inhalt ausgeblendet, aber nicht gelöscht.")}catch(e){toast("Zuweisung konnte nicht gespeichert werden.");await teacherPull()}
}
async function teacherSetRoomSubject(subjectId,active){
  if(!teacherRoom)return;
  try{
    await rpc("lerninsel_teacher_set_room_subject",{p_room_id:teacherRoom.roomId,p_subject_id:subjectId,p_active:active},true);
    toast(active?"✓ Fach für den Raum fortgesetzt.":"✓ Fach für den Raum pausiert.");await teacherPull()
  }catch(e){toast("Fach konnte nicht geändert werden. Bitte zuerst die neue SQL-Datei ausführen.");await teacherPull()}
}
async function teacherSetStudentSubject(studentId,subjectId,active){
  if(!teacherRoom)return;
  try{
    await rpc("lerninsel_teacher_set_student_subject",{p_room_id:teacherRoom.roomId,p_student_id:studentId,p_subject_id:subjectId,p_active:active},true);
    toast(active?"✓ Fach für den Schüler fortgesetzt.":"✓ Fach für den Schüler pausiert.");await teacherPull()
  }catch(e){toast("Fach konnte nicht geändert werden. Bitte zuerst die neue SQL-Datei ausführen.");await teacherPull()}
}
function fileAsDataUrl(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file)})}
async function fileToStoredPage(file){
  if(file.type==="application/pdf"){
    if(file.size>5*1024*1024)throw new Error("PDF ist größer als 5 MB.");
    return {name:file.name,type:file.type,dataUrl:await fileAsDataUrl(file)}
  }
  const raw=await fileAsDataUrl(file);
  const img=await new Promise((resolve,reject)=>{const x=new Image();x.onload=()=>resolve(x);x.onerror=reject;x.src=raw});
  const max=1600,scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight)),canvas=document.createElement("canvas");
  canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
  return {name:file.name.replace(/\.[^.]+$/,"")+".jpg",type:"image/jpeg",dataUrl:canvas.toDataURL("image/jpeg",.8)}
}
async function storedPagesFromInput(selector,msg){
  const files=[...($(selector)?.files||[])];if(!files.length)throw new Error("Bitte mindestens eine Originalseite auswählen.");
  if(files.length>6)throw new Error("Bitte höchstens sechs Seiten auf einmal auswählen.");
  if(msg)msg.textContent="Originalseiten werden vorbereitet …";
  const pages=[];for(const f of files)pages.push(await fileToStoredPage(f));return pages
}
async function teacherSaveBookPages(){
  const subject=$("#bookSubject").value,topic=$("#bookTopic").value.trim(),sourcePages=$("#bookPages").value.trim(),summary=$("#bookSummary").value.trim(),msg=$("#bookMsg");
  if(!topic||!summary){msg.textContent="Bitte Thema und Zusammenfassung ausfüllen.";return}
  try{
    const originalPages=await storedPagesFromInput("#bookFiles",msg);
    const item={id:"book-"+uid(),subject,topic,kind:"lesson",type:"lesson",category:"bookpages",title:`Buchseiten – ${topic}`,summary:`Originalseiten und Zusammenfassung${sourcePages?` · ${sourcePages}`:""}`,sourcePages,originalPages,sections:[{heading:"Zusammenfassung",text:summary}],memory:"Die Originalseiten bleiben zusammen mit dieser Zusammenfassung gespeichert."};
    await teacherLibraryUpsert(item,selectedRoomIds(".bookRoom"));toast("✓ Buchseiten gespeichert.")
  }catch(e){msg.textContent=e.message||"Buchseiten konnten nicht gespeichert werden."}
}
async function teacherSaveHomework(){
  const subject=$("#homeSubject").value,topic=$("#homeTopic").value.trim(),assignedDate=$("#homeAssigned").value,dueDate=$("#homeDue").value,title=$("#homeTitle").value.trim(),question=$("#homeQuestion").value.trim(),msg=$("#homeMsg");
  if(!topic||!assignedDate||!title||!question){msg.textContent="Bitte Fach, Thema, Aufgabedatum, Titel und Aufgabe ausfüllen.";return}
  try{
    const originalPages=await storedPagesFromInput("#homeFiles",msg),helps=$("#homeHelps").value.split(/\n+/).map(x=>x.trim()).filter(Boolean);
    const item={id:"home-"+uid(),subject,topic,kind:"homework",type:"writing",category:"homework",title:`Hausaufgabe – ${title}`,summary:homeworkDateText({assignedDate,dueDate}),assignedDate,dueDate,originalPages,question,helps,bullets:[],finalText:""};
    await teacherLibraryUpsert(item,selectedRoomIds(".homeRoom"));toast("✓ Hausaufgabe gespeichert.")
  }catch(e){msg.textContent=e.message||"Hausaufgabe konnte nicht gespeichert werden."}
}
async function teacherCreateStudent(){
  const label=$("#studentLabel")?.value.trim(),code=$("#studentCode")?.value.trim(),msg=$("#studentCreateMsg"),button=$("#newStudent");
  if(!label){if(msg)msg.textContent="Bitte einen Namen oder ein Kürzel eingeben.";return}
  if(!code||code.length<4){if(msg)msg.textContent="Bitte einen Schülercode mit mindestens vier Zeichen eingeben.";return}
  if(button)button.disabled=true;if(msg)msg.textContent="Schüler wird angelegt …";
  try{
    const studentId=await rpc("lerninsel_teacher_upsert_student",{p_room_id:teacherRoom.roomId,p_student_id:null,p_label:label,p_student_code:code},true);
    saveTeacherAccessCode("students",studentId,{code,label});
    alert(`Schülerzugang für ${label}\n\nKlasse: ${teacherRoom.name}\nLernraum: ${teacherRoom.publicCode}\nSchülercode: ${code}\n\nBitte die beiden Codes jetzt weitergeben.`);await teacherPull()
  }catch(e){const reason=e?.message?` (${e.message})`:"";if(msg)msg.textContent="Schüler konnte nicht angelegt werden"+reason;toast("Schüler konnte nicht angelegt werden.");if(button)button.disabled=false}
}
async function teacherDeleteStudent(id){
  if(!confirm("Schüler wirklich löschen?"))return;
  try{
    const parentIds=(state.teacher.parents||[]).filter(x=>x.studentId===id).map(x=>x.id);
    await rpc("lerninsel_teacher_delete_student",{p_room_id:teacherRoom.roomId,p_student_id:id},true);
    deleteTeacherAccessCode("students",id);parentIds.forEach(x=>deleteTeacherAccessCode("parents",x));await teacherPull()
  }catch{toast("Löschen fehlgeschlagen.")}
}
async function teacherCreateParentAccess(studentId){
  const form=document.querySelector(`[data-parent-form="${studentId}"]`),label=form?.querySelector(".parentLabel")?.value.trim(),code=form?.querySelector(".parentAccessCode")?.value.trim(),msg=form?.querySelector(".parentMsg");
  if(!label){if(msg)msg.textContent="Bitte eine Bezeichnung eingeben, zum Beispiel Mutter oder Vater.";return}
  if(!code||code.length<6){if(msg)msg.textContent="Der Elterncode ist zu kurz.";return}
  try{
    const parentId=await rpc("lerninsel_teacher_create_parent_access",{p_room_id:teacherRoom.roomId,p_student_id:studentId,p_label:label,p_parent_code:code},true);
    saveTeacherAccessCode("parents",parentId,{code,label,studentId});
    alert(`Elternzugang für ${label}\n\nKlasse: ${teacherRoom.name}\nLernraum: ${teacherRoom.publicCode}\nElterncode: ${code}\n\nBitte den Code jetzt weitergeben.`);await teacherPull()
  }catch(e){if(msg)msg.textContent="Elternzugang konnte nicht erstellt werden. Bitte die v9-SQL-Datei prüfen."}
}
async function teacherResetStudentCode(studentId){
  const student=(state.teacher.students||[]).find(x=>x.id===studentId);if(!student)return;
  if(!confirm("Für "+student.label+" einen neuen Schülercode vergeben? Der alte Code funktioniert danach nicht mehr."))return;
  const code=String(Math.floor(100000+Math.random()*900000));
  try{
    await rpc("lerninsel_teacher_upsert_student",{p_room_id:teacherRoom.roomId,p_student_id:studentId,p_label:student.label,p_student_code:code},true);
    saveTeacherAccessCode("students",studentId,{code,label:student.label});
    alert("Neuer Schülercode für "+student.label+": "+code);await teacherPull()
  }catch(e){toast("Schülercode konnte nicht neu vergeben werden.")}
}
async function teacherResetParentCode(parentId){
  const parent=(state.teacher.parents||[]).find(x=>x.id===parentId);if(!parent)return;
  if(!confirm("Für "+parent.label+" einen neuen Elterncode vergeben? Der alte Code funktioniert danach nicht mehr."))return;
  const code=parentCode();
  try{
    await rpc("lerninsel_teacher_reset_parent_access",{p_room_id:teacherRoom.roomId,p_parent_id:parentId,p_parent_code:code},true);
    saveTeacherAccessCode("parents",parentId,{code,label:parent.label,studentId:parent.studentId});
    alert("Neuer Elterncode für "+parent.label+": "+code);await teacherPull()
  }catch(e){toast("Bitte zuerst die beigefügte SQL-Datei für die Code-Verwaltung in Supabase ausführen.")}
}

/* Live quiz: polling, Supabase migration required */
async function teacherStartLiveQuiz(){
  const [subject,topic]=$("#liveTopic").value.split("|"),code=quizCode();
  try{
    const r=await rpc("lerninsel_teacher_live_start",{p_room_id:teacherRoom.roomId,p_subject:subject,p_topic:topic,p_game_code:code,p_seconds:15},true);
    state.live={sessionId:r.session_id||r.sessionId,gameCode:code,teacher:true};renderTeacherLiveControl();startTeacherLivePolling()
  }catch(e){toast("Live-Quiz benötigt noch die v8-Supabase-Erweiterung.")}
}
let teacherLiveTimer=null;
function startTeacherLivePolling(){clearInterval(teacherLiveTimer);teacherLiveTimer=setInterval(renderTeacherLiveControl,1000)}
async function renderTeacherLiveControl(){
  if(!state.live?.teacher)return;const el=$("#teacherLiveArea");if(!el)return;
  try{
    const r=await rpc("lerninsel_teacher_live_state",{p_session_id:state.live.sessionId},true);
    const players=r.players||[];
    el.innerHTML=`<div class="liveCode">${esc(state.live.gameCode)}</div><p class="small">Spielcode</p>
      <div class="rankList">${players.map((x,n)=>`<div class="rankRow"><span>${n+1}. ${esc(x.avatar||"")} ${esc(x.nickname||x.label||"Spieler")}</span><strong>${x.score||0}</strong></div>`).join("")||'<div class="small">Warte auf Spieler …</div>'}</div>
      <div class="actions" style="margin-top:10px">
       ${r.status==="lobby"?'<button id="liveNext" class="primary">Erste Frage</button>':r.status==="question"?'<button id="liveReveal" class="primary">Antwort zeigen</button>':r.status==="reveal"?'<button id="liveNext" class="primary">Nächste Frage</button>':""}
       ${r.status!=="finished"?'<button id="liveFinish" class="ghost">Beenden</button>':""}
      </div>
      ${r.question?`<div class="lessonSection"><strong>${esc(r.question.question||"")}</strong><div class="small">Status: ${esc(r.status)}</div></div>`:""}`;
    if($("#liveNext"))$("#liveNext").onclick=()=>rpc("lerninsel_teacher_live_next",{p_session_id:state.live.sessionId},true).then(renderTeacherLiveControl);
    if($("#liveReveal"))$("#liveReveal").onclick=()=>rpc("lerninsel_teacher_live_reveal",{p_session_id:state.live.sessionId},true).then(renderTeacherLiveControl);
    if($("#liveFinish"))$("#liveFinish").onclick=()=>rpc("lerninsel_teacher_live_finish",{p_session_id:state.live.sessionId},true).then(()=>{clearInterval(teacherLiveTimer);renderTeacherLiveControl()})
  }catch{}
}
function renderLiveJoin(){
  $("#liveInside").innerHTML=`<span class="sectionTitle">Live-Quiz</span><h2>Spielcode eingeben</h2>
    <label>6-stelliger Spielcode<input id="liveCodeInput" inputmode="numeric" maxlength="6"></label>
    <button id="joinLiveBtn" class="primary big">Beitreten</button><p id="liveJoinMsg" class="small"></p>`;
  addDialogClose("#liveDialog",leaveLiveDialog);
  $("#liveDialog").showModal();
  $("#joinLiveBtn").onclick=async()=>{
    const code=$("#liveCodeInput").value.trim();
    try{
      const r=await rpc("lerninsel_student_live_join",{p_public_code:studentSession.roomCode,p_student_code:studentSession.studentCode,p_game_code:code});
      state.live={gameCode:code,sessionId:r.session_id||r.sessionId,teacher:false,lastQuestion:-1};renderStudentLive();startStudentLivePolling()
    }catch{$("#liveJoinMsg").textContent="Spiel nicht gefunden oder Zugang nicht möglich."}
  }
}
let studentLiveTimer=null;
function startStudentLivePolling(){clearInterval(studentLiveTimer);studentLiveTimer=setInterval(renderStudentLive,700)}
async function renderStudentLive(){
  if(!state.live||state.live.teacher)return;
  try{
    const r=await rpc("lerninsel_student_live_state",{p_public_code:studentSession.roomCode,p_student_code:studentSession.studentCode,p_game_code:state.live.gameCode});
    if(r.status==="lobby"){
      $("#liveInside").innerHTML=`<div style="text-align:center"><span class="sectionTitle">Live-Quiz</span><h2>Du bist dabei!</h2><div class="liveCode">${esc(state.live.gameCode)}</div><p>Warte, bis das Quiz startet.</p></div>`;addDialogClose("#liveDialog",leaveLiveDialog);return
    }
    if(r.status==="question"){
      const q=r.question||{};const idx=r.current_index??0;
      if(state.live.lastQuestion!==idx){
        state.live.lastQuestion=idx;
        state.live.optionMaps??={};
        const shown=state.live.optionMaps[idx]||(state.live.optionMaps[idx]=shuffledOptions(q.options||[]));
        $("#liveInside").innerHTML=`<div class="sessionHead"><span>Frage ${idx+1}</span><span id="liveRemain">${Math.max(0,Math.ceil(r.remaining||0))}</span></div>
          <div class="question">${esc(q.question||"")}</div>${shown.map(o=>`<button class="choice quizOption liveAnswer" data-opt="${o.originalIndex}">${esc(o.text)}</button>`).join("")}
          <div id="liveAnswerMsg"></div>`;
        addDialogClose("#liveDialog",leaveLiveDialog);
        $$(".liveAnswer").forEach(b=>b.onclick=async()=>{if(state.live.answered===idx)return;state.live.answered=idx;$$(".liveAnswer").forEach(x=>x.disabled=true);
          try{const a=await rpc("lerninsel_student_live_answer",{p_public_code:studentSession.roomCode,p_student_code:studentSession.studentCode,p_game_code:state.live.gameCode,p_option_index:+b.dataset.opt});
            $("#liveAnswerMsg").innerHTML=`<div class="feedback ${a.correct?"ok":"no"}">${a.correct?`✓ Richtig · +${a.points} Punkte`:"Antwort gespeichert."}</div>`
          }catch{$("#liveAnswerMsg").innerHTML='<div class="feedback no">Antwort konnte nicht mehr gespeichert werden.</div>'}
        })
      }
      if($("#liveRemain"))$("#liveRemain").textContent=Math.max(0,Math.ceil(r.remaining||0));return
    }
    if(r.status==="reveal"){
      const rank=r.rank||null;
      $("#liveInside").innerHTML=`<div style="text-align:center"><span class="sectionTitle">Zwischenstand</span><h2>${r.was_correct?"✓ Richtig":"Nächste Runde"}</h2>
        <div class="scoreBig">${r.score||0} Punkte</div>${rank?`<p>Platz ${rank}</p>`:""}<p class="small">Warte auf die nächste Frage.</p></div>`;addDialogClose("#liveDialog",leaveLiveDialog);return
    }
    if(r.status==="finished"){
      clearInterval(studentLiveTimer);$("#liveInside").innerHTML=`<div style="text-align:center"><span class="sectionTitle">Live-Quiz beendet</span><div class="scoreBig">${r.score||0}</div><p>Punkte · Platz ${r.rank||"-"}</p>
        <button id="closeLiveDone" class="primary big">Fertig</button></div>`;addDialogClose("#liveDialog",leaveLiveDialog);$("#closeLiveDone").onclick=leaveLiveDialog
    }
  }catch{}
}

$("#resetDeviceBtn").onclick=resetDevice;
boot();


(function addSoftModernStyles(){
 const st=document.createElement("style");st.id="softModern20260917";st.textContent=`
 :root{--softLilac:#f2efff;--softBlue:#eef6ff;--softGold:#fff7df}
 .card,.topicSection,.lessonSection,.homeworkIntro,.stepBox,.finalBox{border-radius:22px!important;box-shadow:0 8px 28px rgba(46,66,95,.055)!important}
 .topicSections{gap:16px}.topicSection{border:1px solid #e7ebf2!important}.primary,.ghost,.choice{border-radius:14px!important}
 .softPanel{background:linear-gradient(135deg,#eef6ff,#f5f2ff);border:1px solid #dde7f5;border-radius:20px;padding:16px;margin:14px 0;line-height:1.55}.softPanel li{margin:6px 0}
 .checkStrip{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.checkStrip span{background:#eef8ef;border:1px solid #d8eddc;border-radius:999px;padding:6px 10px;font-size:.88rem}
 .writeLabel textarea{margin-top:8px;min-height:180px;border-radius:16px!important;border:1px solid #cfdbea!important;padding:14px!important;line-height:1.55}
 .softDiagram{background:linear-gradient(135deg,#f7fbff,#f6f3ff)!important}.learnSvg{display:block;width:100%;height:auto;max-height:360px}.memoryGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.memoryGrid b{background:white;border:1px solid #dfe7f1;border-radius:14px;padding:10px;text-align:center}
 @media(max-width:680px){.card,.topicSection,.lessonSection{border-radius:18px!important}.topicSections{display:block}.topicSection{margin-bottom:12px}.memoryGrid{grid-template-columns:1fr}.learnSvg{max-height:250px}.softPanel{padding:13px}.checkStrip span{font-size:.8rem}.actions{display:grid;grid-template-columns:1fr}.actions button{width:100%}.writeLabel textarea{min-height:220px}.lessonSection{overflow-x:auto}}
 `;document.head.appendChild(st)
})();
