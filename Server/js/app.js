if('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('serviceworker.js')
        .then((regis) => console.log('service worker registered', regis))
        .catch((error) => console.log("service worker not registered", error));
}