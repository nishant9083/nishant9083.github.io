// Service Worker for Nishant Verma Portfolio
const CACHE_NAME = 'nishant-portfolio-v2'; // Increment version number
const urlsToCache = [
    '/',
    '/index_new.html',
    '/styles.css',
    '/script.js',
    '/assets/img/hero_bg.jpeg',
    '/assets/img/profile.png',
    '/assets/img/portfolio/codepilot.png',
    '/assets/img/portfolio/colorsar.png',
    '/assets/img/portfolio/editor.png',
    '/assets/img/portfolio/quiz.png',
    '/assets/img/portfolio/rag.png',
    '/assets/img/portfolio/telegram.png',
    '/assets/Nishant_Verma.pdf',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
    'https://unpkg.com/lucide@latest'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return Promise.allSettled(
                    urlsToCache.map(url => 
                        cache.add(url).catch(err => console.warn('Failed to cache:', url, err))
                    )
                );
            })
    );
    self.skipWaiting(); // Force activate new service worker
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName); // Delete old caches
                    }
                })
            );
        })
    );
    self.clients.claim(); // Take control of all pages
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
