var cacheStorageKey = 'version-token-v-1';

var cacheList = [
    'add every full url you will be pulling in'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheStorageKey).then(cache => {
            return cache.addAll(cacheList);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        Promise.resolve(
            caches.keys().then((cacheNames) => {
                return cacheNames.map((name) => {
                    if (name !== cacheStorageKey) {
                        return caches.delete(name);
                    }
                });
            })
        ).then(() => {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request.url).then((response) => {
            if (response != null) {
                return response;
            }

            return fetch(e.request.url);
        })
    );
});