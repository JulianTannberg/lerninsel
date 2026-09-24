window.LERNINSEL_CONFIG = {
  supabaseUrl: "https://bjjqeftutovmxjsnlstt.supabase.co",
  supabasePublishableKey: "sb_publishable_WTQmmnw0GiUmmZSBGnBqNg_Titl3Qab"
};

/* Zusatzinhalte nach app.js laden. */
window.addEventListener("DOMContentLoaded",()=>{
  const load=(src)=>new Promise(resolve=>{
    const s=document.createElement("script");
    s.src=src;
    s.async=false;
    s.onload=resolve;
    s.onerror=resolve;
    document.body.appendChild(s);
  });
  (async()=>{
    await load("gsel1_update.js?v=9021");
    await load("balladen_update.js?v=9021");
    await load("english_update.js?v=9021");
  })();
},{once:true});