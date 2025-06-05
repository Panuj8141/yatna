// Service Worker Installation
self.addEventListener('install', (event) => {
  console.log('Service Worker Installed');
  // Skip waiting to activate the service worker immediately
  self.skipWaiting();
});

// Service Worker Activation
self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
  // No need for cache deletion as no caching is involved
});

// Fetch Event - Always Fetch from Network (No Caching)
self.addEventListener('fetch', (event) => {
  // Always fetch from the network (no caching)
  event.respondWith(
    fetch(event.request).catch(() => {
      console.log('Network request failed, no cache is available');
      return new Response('You are offline and no cache is available.', {
        status: 404,
        statusText: 'Offline and No Cache Available',
      });
    })
  );
});
