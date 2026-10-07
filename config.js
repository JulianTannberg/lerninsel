window.LERNINSEL_CONFIG = {
  supabaseUrl: "https://bjjqeftutovmxjsnlstt.supabase.co",
  supabasePublishableKey: "sb_publishable_WTQmmnw0GiUmmZSBGnBqNg_Titl3Qab"
};

// v9.0.24 – GSEL 2: Ergänzung zum Arbeitsblatt „Piraten heute“.
window.addEventListener("load",()=>{
  try{
    const item={
      id:"g2-somalia-piracy-worksheet-supplement-20261007",
      subject:"gsel2",
      topic:"Arbeitsblatt – Ergänzung",
      kind:"lesson",
      type:"lesson",
      title:"Piraten heute – Arbeitsblatt",
      summary:"Die vier Aufgaben zum Film und zum Text einfach ausgefüllt.",
      sections:[
        {heading:"1. Warum gingen die Piratenüberfälle vor Somalia zurück?",text:"Internationale Kriegsschiffe überwachten die Seewege vor Somalia. Handelsschiffe schützten sich außerdem besser. Dadurch wurden Angriffe für Piraten schwieriger und die Zahl der Überfälle ging stark zurück."},
        {heading:"2. Wo nahmen die Überfälle stattdessen zu?",text:"Die Überfälle nahmen vor allem im Golf von Guinea in Westafrika zu."},
        {heading:"3. Wie gehen die Piraten dort vor?",text:"Die Piraten überfallen Handelsschiffe und entführen Besatzungsmitglieder. Sie halten die Menschen als Geiseln fest und verlangen Lösegeld für ihre Freilassung."},
        {heading:"4. ROT – Was macht die EU-Mission Atalanta?",text:"Unterstreiche im Text die Stellen, in denen steht: Atalanta versucht Menschen aus der Hand der Piraten zu befreien, damit sie zu ihren Familien zurückkehren können. Außerdem bekämpft die EU-Operation Atalanta seit 2008 die Piraterie am Horn von Afrika."},
        {heading:"4. BLAU – Warum nehmen die Piratenüberfälle vor Somalia wieder zu?",text:"Unterstreiche die Stellen über die Instabilität und Unsicherheit in der Region. Gemeint ist: Konflikte im Nahen Osten, Angriffe der Huthi-Rebellen auf Handelsschiffe und der Krieg der USA und Israels gegen den Iran schaffen Unsicherheit. Diese Lage nutzen somalische Piraten, um wieder aktiver zu werden."},
        {heading:"4. GRÜN – Welche Länder sind durch den letzten Überfall betroffen?",text:"Im Text werden Jemen, Somalia, Tansania, Indien und Pakistan genannt: Das Schiff wurde vor dem Jemen gekapert und Richtung Somalia gebracht, fährt unter tansanischer Flagge und viele Besatzungsmitglieder stammen aus Indien und Pakistan."}
      ],
      memory:"Merke: Die Überfälle vor Somalia gingen durch Schutzmaßnahmen zurück, nehmen wegen neuer Unsicherheit aber wieder zu."
    };
    const addUnique=arr=>{
      if(!Array.isArray(arr))return;
      const p=arr.findIndex(x=>x&&x.id===item.id);
      if(p>=0)arr[p]=structuredClone(item);else arr.push(structuredClone(item));
    };
    if(typeof DEFAULT_CONTENT!=="undefined")addUnique(DEFAULT_CONTENT);
    if(typeof SOMALIA_PIRACY_CONTENT!=="undefined")addUnique(SOMALIA_PIRACY_CONTENT);
    if(typeof state!=="undefined"&&Array.isArray(state.items)&&state.items.some(x=>x.subject==="gsel2"))addUnique(state.items);
  }catch(e){console.warn("GSEL-2-Arbeitsblatt konnte nicht ergänzt werden",e)}
});
