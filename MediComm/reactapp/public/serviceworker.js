const cacheName = 'MediComm';
const dynamicCacheName = 'MediComm_dynamic';
const urls = [
    './index.html',
    './stylesheets/indexstyle.css',
    './js/app.js'
];

//limiting cache size to minimize memory usage
const limitCacheSeize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size)
            {
                cache.delete(keys[0]).then(limitCacheSeize(name, size))
            }
        })
    })
};

//installing service worker
self.addEventListener('install', event => {
    console.log('service worker installed');

    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('caching urls');
            cache.addAll(urls);
        })
    )
});

//activating it
self.addEventListener('activate', function(event) {
    console.log('Claiming control(service worker activatedd)');
    return self.clients.claim();
});

//fetching events
self.addEventListener('fetch', function(event) {
    console.log('fetch: ', event);

    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request).then(fetchResponse => {
                return caches.open(dynamicCacheName).then(cache => {
                    //placing non-static resources in dynamic cache
                    cache.put(event.request.url, fetchResponse.clone());
                    //limiting dynamic cache size to 15 keys
                    limitCacheSeize(dynamicCacheName, 15);
                    return fetchResponse;
                })
            }).catch(() => {
                if(event.request.indexOf('.html') > -1)
                    return caches.match('./content/error.html');
            })
        })
    );
});