/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.f79b05423cdf99c25c32edfc09e21924.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
});
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
    console.log('Claiming control(service worker activated)');
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