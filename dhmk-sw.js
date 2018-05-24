
var appShellCache = "dhmk-app-cache"
var dataCache = "dhmk-data-cache";

var filesToCache = [
    "/khalid1990",
    "/khalid1990/index.html",
    "/khalid1990/css/theme1-site.css",
    "/khalid1990/fontawesome-free-5.0.8/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,ico}",
    "/khalid1990/js/app.js"
];

self.addEventListener("install", function (installEvent) {
    console.log("[Service Worker:dhmk-sw] Installing");

    installEvent.waitUntil(
        caches.open(appShellCache).then(function(cache) {
            cache.addAll(filesToCache)
        })
    );
});

self.addEventListener("activate", function (activateEvent) {
   console.log("[Service Worker:dhmk-sw] Activating");

    activateEvent.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key != appShellCache && key != dataCache) {
                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener("fetch", function (fetchEvent) {
    console.log("[Service Worker:dhmk-sw] Fetch", fetchEvent.request.url);

    var dataUrl = 'https://my-json-server.typicode.com/khalid1990/ofrs/offers';

    if (fetchEvent.request.url.indexOf(dataUrl) > -1) {
        fetchEvent.respondWith(
            caches.open(dataCache).then(function(cache) {
                return fetch(fetchEvent.request).then(function (response) {
                    cache.put(fetchEvent.request.url, response.clone());

                    return response;
                })
            })
        );
    } else {
        fetchEvent.respondWith(
            caches.match(fetchEvent.request).then(function(response) {
                return response || fetch(fetchEvent.request);
            })
        );
    }
});
