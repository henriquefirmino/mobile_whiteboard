//if(!self.define){let e,s={};const t=(t,i)=>(t=new URL(t+".js",i).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(i,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let o={};const d=e=>t(e,n),l={module:{uri:n},exports:o,require:d};s[n]=Promise.all(i.map((e=>l[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-475b3d61"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"index.html",revision:"7818e54315367904ba461bad6532f94a"},{url:"script.js",revision:"9a680de7d98c9453eb95666ef0132dd5"},{url:"styles.css",revision:"0d4148b8504b52935ea8a34224531476"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map

const cacheName = 'projetoWeb';

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			cache.addAll([
                './', 
                './index.html', 
                './manifest.webmanifest',
                './script.js',
                './styles.css',
                '../assets/images_readme',
                '../assets/icons',
            ]);
		}),
	);

    return self.skipWaiting()
});

self.addEventListener('activate', () => self.clients.claim())

self.addEventListener('fetch', async e => {
    const req = e.request
    const url = new URL(req.url)

    if(url.login === 'location.origin'){
        e.respondWith(cacheFirst(req))
    }
    else{
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req){
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)
    return cached | fetch(req)
}

async function networkAndCache(req){
    const cache = caches.open(cacheName)

    try{
        const refresh = await fetch(req)
        await cache.put(req, refresh.clone())
        return refresh
    }
    catch(e){
        const cached =  await cache.match(req)
        return cached
    }
}