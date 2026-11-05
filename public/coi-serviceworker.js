/* PDFTara - kill switch
   Purana COOP/COEP worker hata deta hai. Page ko reload NAHI karta,
   isliye reload loop nahi banega aur Google ads tikenge. */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Purane saare caches saaf
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch (e) {}

      // Worker khud ko hata le
      await self.registration.unregister();
    })()
  );
});

// Koi bhi request intercept mat kar, seedha network pe jaane de
self.addEventListener('fetch', () => {});
