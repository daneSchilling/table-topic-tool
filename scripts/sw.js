var cacheStorageKey = 'version-token-v-1';

var cacheList = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css'
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
                console.log(e.request.url);
                return response;
            }

            console.log(e.request.url);
            return fetch(e.request.url);
        })
    );
});