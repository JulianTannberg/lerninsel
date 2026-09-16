
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const CFG = window.LERNINSEL_CONFIG || {};
const API_OK = !!(CFG.supabaseUrl && CFG.supabasePublishableKey);
const MAIN = $("#appMain");

const KEYS = {
  role: "lerninsel_v8_role",
  teacherAuth: "lerninsel_v8_teacher_auth",
  teacherRoom: "lerninsel_v8_teacher_room",
  studentSession: "lerninsel_v8_student_session",
  parentSession: "lerninsel_v8_parent_session",
  localProgress: "lerninsel_v8_local_progress",
  localProfile: "lerninsel_v8_local_profile"
};

const SUBJECTS = [
  {id:"mathe", name:"Mathe", icon:"➗"},
  {id:"englisch", name:"Englisch", icon:"🇬🇧"},
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
   question:"Was konnten begnadigte Piraten später tun?",options:["Als Piratenjäger arbeiten","König werden","Nur noch an Land leben","Keine Schiffe mehr sehen"],correct:0}
];

let role = localStorage.getItem(KEYS.role);
let authSession = JSON.parse(localStorage.getItem(KEYS.teacherAuth) || "null");
let teacherRoom = JSON.parse(localStorage.getItem(KEYS.teacherRoom) || "null");
let studentSession = JSON.parse(localStorage.getItem(KEYS.studentSession) || "null");
let parentSession = JSON.parse(localStorage.getItem(KEYS.parentSession) || "null");

let state = {
  student:null,
  items:[],
  progress:{},
  profile:null,
  teacher:{students:[],items:[],progress:{},events:[],profiles:[]},
  currentSubject:null,
  currentTopic:null,
  practice:null,
  quiz:null,
  live:null
};

function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function uid(){return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)+Date.now()}
function randomToken(len=8){const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";const a=new Uint8Array(len);crypto.getRandomValues(a);return [...a].map(n=>chars[n%chars.length]).join("")}
function roomCode(){return randomToken(8).match(/.{1,4}/g).join("-")}
function parentCode(){return randomToken(10).match(/.{1,5}/g).join("-")}
function quizCode(){return String(Math.floor(100000+Math.random()*900000))}
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
function kindName(k){return ({lesson:"Lernen",practice:"Üben",homework:"Hausaufgaben",quiz:"Quiz"})[k]||k}
function progressFor(id){
  state.progress[id] ??= {status:"not_started",attempts:0,helps:[],rewarded:false,answer:null,updatedAt:null};
  return state.progress[id];
}
function pointsTotal(){return Object.values(state.progress||{}).filter(p=>p?.rewarded===true).length}
function gameTokensAvailable(){
  const spent = Number(state.profile?.games_spent||0);
  return Math.max(0, Math.floor(pointsTotal()/4)-spent);
}
function saveLocal(){
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
        state.student=r.student;state.items=r.items||[];state.progress=r.progress||{};
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
      state.student=r.student;state.items=r.items||[];state.progress=r.progress||{};
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
  const n=gameTokensAvailable();b.textContent=n>0?`🎮 Spiel (${n})`:`🎮 Spiel 🔒`;
  b.onclick=openGame
}
function renderProfileBar(){
  return `<div class="card profileBar">
    <div class="profileLeft"><div class="avatar">${esc(state.profile?.avatar||"🦊")}</div>
      <div><strong>${esc(state.profile?.nickname||state.student?.label||"Schüler")}</strong>
      <div class="small">${pointsTotal()} Inselpunkte · ${gameTokensAvailable()} Spielrunde(n)</div></div></div>
    <button id="editProfileBtn" class="ghost">Profil</button>
  </div>`
}
function renderStudentDashboard(){
  updateGameButton();
  const items=state.items||[];
  MAIN.innerHTML=renderProfileBar()+`
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
  $("#editProfileBtn").onclick=()=>renderProfileSetup(false);
  $("#liveJoinBtn").onclick=renderLiveJoin;
}
function renderSubject(subjectId){
  state.currentSubject=subjectId;const s=subjectMeta(subjectId);
  const topics=[...new Set(state.items.filter(i=>i.subject===subjectId).map(i=>i.topic))];
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
  const practiceDone=practice.filter(i=>progressFor(i.id).status==="completed").length;
  MAIN.innerHTML=renderProfileBar()+`
    <button id="backTopics" class="ghost back">← ${esc(s.name)}</button>
    <div class="card" style="margin-bottom:14px"><span class="sectionTitle">${s.icon} ${esc(s.name)}</span><h2 style="margin:.3rem 0">${esc(topic)}</h2></div>
    <div class="topicSections">
      <section class="card topicSection"><h3>📖 Lernen</h3><p class="hint">Erst lesen und verstehen. Beim Tippen auf „Gelesen“ wird gespeichert und die Seite schließt automatisch.</p>
        <div class="lessonList">${lessons.map(itemRow).join("")||'<div class="small">Noch nichts hinterlegt.</div>'}</div>
      </section>
      <section class="card topicSection"><h3>🧠 Üben</h3><p class="hint">Eine Aufgabe nach der anderen. Falsche oder unsichere Aufgaben kommen am Ende noch einmal.</p>
        ${practice.length?`<button id="startPractice" class="primary big">Übungsrunde starten · ${practiceDone}/${practice.length} erledigt</button>`:'<div class="small">Noch keine Übungen.</div>'}
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
  if($("#startPractice"))$("#startPractice").onclick=()=>startPractice(practice);
  if($("#startSoloQuiz"))$("#startSoloQuiz").onclick=()=>startSoloQuiz(quiz);
}
function itemRow(i){
  const p=progressFor(i.id);
  return `<div class="itemRow"><div><h4>${esc(i.title)}</h4><p>${esc(i.summary||"")}</p>
    ${p.status==="completed"?'<span class="badge good">✓ erledigt</span>':p.status==="working"?'<span class="badge warn">in Arbeit</span>':""}
    </div><button class="primary openItem" data-id="${i.id}">${p.status==="completed"?"Nochmal":"Öffnen"}</button></div>`
}
function openItem(id){
  const i=state.items.find(x=>x.id===id);if(!i)return;markWorking(i);
  if(i.kind==="lesson")renderLesson(i);
  else if(i.kind==="homework")renderHomework(i)
}
function renderLesson(i){
  const p=progressFor(i.id);
  $("#workInside").innerHTML=`
    <span class="badge">${esc(subjectMeta(i.subject).name)} · Lernen</span><h2>${esc(i.title)}</h2>
    ${(i.sections||[]).map(s=>`<div class="lessonSection"><h3>${esc(s.heading)}</h3><div>${esc(s.text)}</div></div>`).join("")}
    ${i.memory?`<div class="merksatz">💡 ${esc(i.memory)}</div>`:""}
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
  state.practice={queue:[...items],retry:[],index:0,round:1,current:null,locked:false};
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
function retryPractice(i,msg){
  const s=state.practice;if(!s||s.locked)return;s.locked=true;
  if(!s.retry.some(x=>x.id===i.id))s.retry.push(i);
  const f=$("#practiceFeedback");if(f)f.innerHTML=`<div class="feedback no">${esc(msg)}</div>`;
  setTimeout(nextPractice,850)
}
async function correctPractice(i,msg="✓ Richtig!"){
  const s=state.practice;if(!s||s.locked)return;s.locked=true;
  await completeItem(i);
  const f=$("#practiceFeedback");if(f)f.innerHTML=`<div class="feedback ok">${esc(msg)}</div>`;
  setTimeout(nextPractice,520)
}
function renderPracticeItem(i){
  if(i.type==="mcq")renderPracticeMCQ(i);
  else if(i.type==="flashcard")renderFlashcard(i);
  else if(i.type==="cloze")renderPracticeCloze(i);
  else if(i.type==="builder")renderPracticeBuilder(i);
  addDialogClose("#workDialog",abortWorkDialog);
  $("#workDialog").showModal()
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
  i.gaps.forEach((g,n)=>{const opts=['<option value="">Bitte wählen</option>',...g.options.map((o,k)=>`<option value="${k}">${esc(o)}</option>`)].join("");line=line.replace(`{${n}}`,`<select class="inlineSelect gap" data-gap="${n}">${opts}</select>`)});
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
  const p=progressFor(i.id);let answers=Array(i.steps.length).fill(null);
  $("#workInside").innerHTML=`<span class="badge">${esc(subjectMeta(i.subject).name)} · Hausaufgabe</span><h2>${esc(i.title)}</h2>
    <div class="homeworkIntro"><strong>Deine Aufgabe:</strong><p>${esc(i.question)}</p></div>
    ${i.steps.map((s,n)=>`<div class="stepBox"><h3>${n+1}. ${esc(s.prompt)}</h3>${s.options.map((o,k)=>`<button class="choice guidedChoice" data-step="${n}" data-opt="${k}">${esc(o)}</button>`).join("")}</div>`).join("")}
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

/* Solo quiz */
function startSoloQuiz(items){
  state.quiz={items:[...items],index:0,score:0,correct:0,timer:null,deadline:0,answered:false};
  renderSoloQuizQuestion()
}
function renderSoloQuizQuestion(){
  const q=state.quiz;if(!q)return;
  if(q.index>=q.items.length){finishSoloQuiz();return}
  const i=q.items[q.index];q.answered=false;q.deadline=Date.now()+15000;
  const shown=shuffledOptions(i.options);
  $("#workInside").innerHTML=`<div class="sessionHead"><span>Quiz · Frage ${q.index+1} von ${q.items.length}</span><span class="quizTimer" id="quizTimer">15</span></div>
    <span class="badge">${esc(subjectMeta(i.subject).name)} · ${esc(i.topic)}</span>
    <div class="question">${esc(i.question)}</div>
    <div>${shown.map(o=>`<button class="choice quizOption" data-qopt="${o.originalIndex}">${esc(o.text)}</button>`).join("")}</div>
    <div id="quizFeedback"></div>`;
  addDialogClose("#workDialog",abortWorkDialog);
  $("#workDialog").showModal();
  $$("[data-qopt]").forEach(b=>b.onclick=()=>answerSoloQuiz(i,+b.dataset.qopt));
  clearInterval(q.timer);q.timer=setInterval(()=>{
    const left=Math.max(0,Math.ceil((q.deadline-Date.now())/1000));if($("#quizTimer"))$("#quizTimer").textContent=left;
    if(left<=0){clearInterval(q.timer);if(!q.answered)answerSoloQuiz(i,null)}
  },250)
}
function answerSoloQuiz(i,opt){
  const q=state.quiz;if(!q||q.answered)return;q.answered=true;clearInterval(q.timer);
  const ok=opt===i.correct;let gained=0;
  if(ok){gained=1;q.score+=1;q.correct++}
  $$("[data-qopt]").forEach(b=>{b.disabled=true;if(+b.dataset.qopt===i.correct)b.classList.add("correct");else if(opt!==null&&+b.dataset.qopt===opt)b.classList.add("wrong")});
  $("#quizFeedback").innerHTML=`<div class="feedback ${ok?"ok":"no"}">${ok?`✓ Richtig · +${gained} Punkt`:`${opt===null?"Zeit um.":"Nicht richtig."} Richtige Antwort ist markiert.`}</div>`;
  studentEvent(i.id,"checked",{ok,quiz:true,score:gained});
  setTimeout(()=>{q.index++;renderSoloQuizQuestion()},850)
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
    if(studentSession?.demo)saveLocal();
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
  const items=r.items||[],prog=r.progress||{},profile=r.profile||{};
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
  $("#gameTopBtn").classList.add("hidden");$("#teacherLogoutBtn").classList.remove("hidden");$("#teacherLogoutBtn").onclick=teacherLogout;
  if(await ensureAuth())await openTeacher();else renderTeacherLogin()
}
function renderTeacherLogin(){
  $("#teacherLogoutBtn").classList.add("hidden");
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
    if(Array.isArray(rooms)&&rooms.length){
      const saved=teacherRoom&&rooms.find(r=>r.id===teacherRoom.roomId),r=saved||rooms[0];
      teacherRoom={roomId:r.id,publicCode:r.publicCode,name:r.name};localStorage.setItem(KEYS.teacherRoom,JSON.stringify(teacherRoom));
      await teacherPull()
    }else{teacherRoom=null;renderTeacher()}
  }catch(e){renderTeacher();toast("Lehrerbereich konnte nicht vollständig geladen werden.")}
}
async function teacherPull(){
  if(!teacherRoom){renderTeacher();return}
  try{
    const r=await rpc("lerninsel_teacher_get_state",{p_room_id:teacherRoom.roomId},true);
    state.teacher.students=r?.students||[];state.teacher.items=r?.items||[];state.teacher.progress=r?.progress||{};state.teacher.events=r?.events||[];
    try{state.teacher.profiles=await rpc("lerninsel_teacher_get_profiles",{p_room_id:teacherRoom.roomId},true)||[]}catch{state.teacher.profiles=[]}
  }catch{}
  renderTeacher()
}
function renderTeacher(){
  const room=teacherRoom?`<span class="badge good">Lernraum ${esc(teacherRoom.publicCode)}</span>`:'<span class="badge warn">Noch kein Lernraum</span>';
  MAIN.innerHTML=`<div class="card"><span class="sectionTitle">Lehrerbereich</span><h2 style="margin:.3rem 0">Lerninsel verwalten</h2>${room}</div>
    <div class="tabs"><button class="tab active" data-tab="content">Inhalte</button><button class="tab" data-tab="students">Schüler</button>
    <button class="tab" data-tab="progress">Lernstand</button><button class="tab" data-tab="live">Live-Quiz</button><button class="tab" data-tab="online">Online</button></div>
    <div id="teacherPane"></div>`;
  $$("[data-tab]").forEach(b=>b.onclick=()=>{$$("[data-tab]").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderTeacherPane(b.dataset.tab)});
  renderTeacherPane("content")
}
function renderTeacherPane(tab){
  const p=$("#teacherPane");if(!p)return;
  if(tab==="content"){
    const items=state.teacher.items?.length?state.teacher.items:DEFAULT_CONTENT;
    const groups={};items.forEach(i=>{const k=`${i.subject}|${i.topic}`;(groups[k]??=[]).push(i)});
    p.innerHTML=`<div class="card"><h3>Fächer & Themen</h3><p class="small">Ein Fach kann beliebig viele Themen enthalten. Lernen, Üben, Hausaufgaben und Quiz gehören jeweils zum Thema.</p>
      ${Object.entries(groups).map(([k,arr])=>{const [s,t]=k.split("|");return `<div class="itemRow"><div><strong>${esc(subjectMeta(s).name)} · ${esc(t)}</strong>
        <div class="small">${arr.filter(x=>x.kind==="lesson").length} Lernen · ${arr.filter(x=>x.kind==="practice").length} Übungen · ${arr.filter(x=>x.kind==="homework").length} Hausaufgaben · ${arr.filter(x=>x.kind==="quiz").length} Quizfragen</div></div></div>`}).join("")}
      <button id="syncDefaultContent" class="primary big" style="margin-top:12px">${teacherRoom?"Piratenpaket / neue Struktur synchronisieren":"Zuerst Lernraum erstellen"}</button></div>`;
    $("#syncDefaultContent").disabled=!teacherRoom;$("#syncDefaultContent").onclick=teacherSyncDefault
  }
  if(tab==="students"){
    p.innerHTML=`<div class="card"><div class="subjectHead"><div><h3>Schüler</h3><p class="small">Andere Schüler sehen nur Spitzname und Avatar.</p></div>
      <button id="newStudent" class="primary" ${teacherRoom?"":"disabled"}>+ Schüler</button></div>
      <div class="studentTable">${(state.teacher.students||[]).map(s=>{const pr=state.teacher.profiles.find(x=>x.studentId===s.id)||{};
        return `<div class="studentRow"><div><strong>${esc(s.label)}</strong><div class="small">${esc(pr.avatar||"")} ${esc(pr.nickname||"noch kein Profil")}</div></div>
          <div class="actions" style="flex:0 0 auto"><button class="ghost parentCodeBtn" data-id="${s.id}">Elterncode</button><button class="ghost deleteStudent" data-id="${s.id}">Löschen</button></div></div>`}).join("")||'<div class="small">Noch keine Schüler.</div>'}</div></div>`;
    $("#newStudent").onclick=teacherCreateStudent;
    $$(".parentCodeBtn").forEach(b=>b.onclick=()=>teacherCreateParentCode(b.dataset.id));
    $$(".deleteStudent").forEach(b=>b.onclick=()=>teacherDeleteStudent(b.dataset.id))
  }
  if(tab==="progress"){
    const prog=state.teacher.progress||{};
    p.innerHTML=(state.teacher.students||[]).map(s=>{
      const arr=state.teacher.items||DEFAULT_CONTENT,d=arr.filter(i=>i.kind!=="quiz"&&prog?.[s.id]?.[i.id]?.status==="completed").length,total=arr.filter(i=>i.kind!=="quiz").length;
      return `<div class="card" style="margin-bottom:10px"><h3>${esc(s.label)}</h3><div class="kpiGrid"><div class="kpi"><strong>${d}/${total}</strong><span class="small">erledigt</span></div>
        <div class="kpi"><strong>${Object.values(prog?.[s.id]||{}).filter(x=>x?.rewarded).length}</strong><span class="small">Inselpunkte</span></div></div></div>`}).join("")||'<div class="card">Noch keine Schüler.</div>'
  }
  if(tab==="online"){
    p.innerHTML=`<div class="card"><h3>Online</h3>${teacherRoom?`<div class="liveCode">${esc(teacherRoom.publicCode)}</div><p class="small">Diesen Lernraum-Code bekommen Schüler und Eltern.</p>
      <button id="refreshTeacher" class="ghost big">Lernstand aktualisieren</button>`:`<p>Noch kein Lernraum.</p><button id="createRoom" class="primary big">Lernraum erstellen</button>`}</div>`;
    if($("#createRoom"))$("#createRoom").onclick=teacherCreateRoom;if($("#refreshTeacher"))$("#refreshTeacher").onclick=teacherPull
  }
  if(tab==="live"){
    const items=state.teacher.items?.length?state.teacher.items:DEFAULT_CONTENT;
    const topics=[...new Map(items.filter(i=>i.kind==="quiz").map(i=>[`${i.subject}|${i.topic}`,{subject:i.subject,topic:i.topic}])).values()];
    p.innerHTML=`<div class="card"><h3>⚡ Live-Quiz</h3><p class="small">Wie bei einem Klassenquiz: gleicher Fragensatz, Zeit läuft, richtige schnelle Antworten bringen mehr Punkte.</p>
      <label>Thema<select id="liveTopic">${topics.map(x=>`<option value="${x.subject}|${esc(x.topic)}">${esc(subjectMeta(x.subject).name)} · ${esc(x.topic)}</option>`).join("")}</select></label>
      <button id="startLiveTeacher" class="primary big" ${teacherRoom&&topics.length?"":"disabled"}>Live-Quiz erstellen</button><div id="teacherLiveArea"></div></div>`;
    $("#startLiveTeacher").onclick=teacherStartLiveQuiz
  }
}
async function teacherCreateRoom(){
  try{
    const code=roomCode(),id=await rpc("lerninsel_create_room",{p_name:"Lerninsel",p_public_code:code},true);
    teacherRoom={roomId:id,publicCode:code,name:"Lerninsel"};localStorage.setItem(KEYS.teacherRoom,JSON.stringify(teacherRoom));renderTeacher()
  }catch(e){toast("Lernraum konnte nicht erstellt werden.")}
}
async function teacherSyncDefault(){
  if(!teacherRoom)return;
  try{
    const assignments=[];(state.teacher.students||[]).forEach(s=>DEFAULT_CONTENT.forEach(i=>assignments.push({studentId:s.id,itemId:i.id})));
    await rpc("lerninsel_teacher_sync_content",{p_room_id:teacherRoom.roomId,p_payload:{items:DEFAULT_CONTENT,assignments}},true);
    toast("✓ Neue Struktur synchronisiert.");await teacherPull()
  }catch(e){toast("Synchronisierung fehlgeschlagen.")}
}
async function teacherCreateStudent(){
  const label=prompt("Name oder Kürzel für den Schüler:");if(!label)return;
  const code=prompt("Persönlicher Schülercode:",String(Math.floor(100000+Math.random()*900000)));if(!code)return;
  try{
    await rpc("lerninsel_teacher_upsert_student",{p_room_id:teacherRoom.roomId,p_student_id:null,p_label:label.trim(),p_student_code:code.trim()},true);
    toast("Schüler angelegt. Code: "+code);await teacherPull()
  }catch(e){toast("Schüler konnte nicht angelegt werden.")}
}
async function teacherDeleteStudent(id){
  if(!confirm("Schüler wirklich löschen?"))return;
  try{await rpc("lerninsel_teacher_delete_student",{p_room_id:teacherRoom.roomId,p_student_id:id},true);await teacherPull()}catch{toast("Löschen fehlgeschlagen.")}
}
async function teacherCreateParentCode(studentId){
  const code=parentCode();
  try{
    await rpc("lerninsel_teacher_create_parent_code",{p_room_id:teacherRoom.roomId,p_student_id:studentId,p_parent_code:code},true);
    alert(`Elternzugang\n\nLernraum: ${teacherRoom.publicCode}\nElterncode: ${code}\n\nDer alte Elterncode dieses Schülers wird dadurch ersetzt.`)
  }catch(e){toast("Elterncode-Funktion ist noch nicht in Supabase eingerichtet.")}
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
