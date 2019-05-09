var cacheName = 'v2';
var cacheFiles = [
    './',
    './index.html',
    './main.css',
    './main.js',
    'https://fonts.googleapis.com/css?family=Karla',
    'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
]

self.addEventListener('install',function(e){
    console.log("[ServiceWorker] Installed");
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(cacheFiles);
    }))
}) 

self.addEventListener('activate',function(e){
    console.log("[ServiceWorker] Activated");

    e.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName){
                if(thisCacheName !== cacheName){
                    console.log("[ServiceWorker] Removing cache files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
}) 

self.addEventListener('fetch',function(e){
    console.log("[ServiceWorker] Fetching", e.request.url);

    e.respondWith(
        caches.match(e.request).then(function(response){
            if(response){
                console.log("[ServiceWorker Found in cache", e.request.url);
                return response;
            }

            var requestClone = e.request.clone
          fetch(requestClone).then(function(response){
              if(!response){
                  console.log("[ServiceWorker] no response from fetch");
                  return response;
              }

              var responseClone = response.clone();

              caches.open(cacheName).then(function(cache){
                  cache.put(e.request, responseClone);
                  return response;
              });
          }).catch(function(err){
              console.log("[ServiceWorker] Error fetching & caching");
          })
        })
    )
}) 