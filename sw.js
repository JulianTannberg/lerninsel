const CACHE="lerninsel-v9.0.9-20260922";
const ASSETS=["./","./index.html","./config.js","./app.js","./manifest.webmanifest","./Natur_Optik_Probe-Arbeit_Lerninsel.pdf","./media/natur_schattenbilder_seite_1.jpg","./media/natur_schattenbilder_seite_2.jpg","./media/gsel1_mittelalterliche_staendegesellschaft.jpg","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))))
});
