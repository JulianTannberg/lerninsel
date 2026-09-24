const CACHE="lerninsel-v9.0.23-20260924";
const ASSETS=[
  "./",
  "./index.html",
  "./config.js?v=9023",
  "./app.js?v=9023",
  "./gsel1_update.js?v=9023",
  "./balladen_update.js?v=9023",
  "./english_update.js?v=9023",
  "./manifest.webmanifest"
];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(ASSETS.map(a=>c.add(a)))));
  self.skipWaiting();
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin)return;
  e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{
    const c=r.clone();
    caches.open(CACHE).then(x=>x.put(e.request,c));
    return r;
  }).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));
});
