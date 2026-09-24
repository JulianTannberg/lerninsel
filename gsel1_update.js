/* Lerninsel – GSEL 1 Update 2026-09-24
   Sorgt dafür, dass die aktuelle Ständepyramide und die neuen GSEL-1-Inhalte
   auch in bereits bestehenden Klassen sichtbar werden. */
(function(){
  if (typeof DEFAULT_CONTENT === "undefined") return;

  function cloneItem(x){
    return typeof structuredClone === "function" ? structuredClone(x) : JSON.parse(JSON.stringify(x));
  }

  const GSEL1_CONTENT = DEFAULT_CONTENT
    .filter(i=>i && i.subject==="gsel1" && i.topic==="Die drei Stände im Mittelalter")
    .map(cloneItem);

  const pyramid = GSEL1_CONTENT.find(i=>i.id==="g1-staende-lernen-verteilung");
  if(pyramid){
    pyramid.title="Ständepyramide – mittelalterliche Gesellschaft";
    pyramid.summary="Die nachgezeichnete Pyramide mit Geistlichen, Adel, Bauern und Stadtbewohnern.";
  }

  function mergeGsel1Into(items){
    if(!Array.isArray(items)) return items;
    if(!items.some(i=>i.subject==="gsel1")) return items;

    const ids=new Set(GSEL1_CONTENT.map(i=>i.id));
    const kept=items.filter(i=>!ids.has(i.id));
    return [...kept,...GSEL1_CONTENT.map(cloneItem)];
  }

  if(typeof withCurrentSandokan==="function"){
    const oldMerge=withCurrentSandokan;
    withCurrentSandokan=function(items){
      return mergeGsel1Into(oldMerge(items));
    };
  }

  if(typeof state!=="undefined" && Array.isArray(state.items)){
    state.items=mergeGsel1Into(state.items);
  }

  setTimeout(()=>{
    try{
      if(typeof role!=="undefined" && role==="student" && typeof state!=="undefined" && state.student){
        if(state.currentSubject==="gsel1" && typeof renderSubject==="function") renderSubject("gsel1");
        else if(!state.currentSubject && typeof renderStudentDashboard==="function") renderStudentDashboard();
      }
    }catch{}
  },500);
})();