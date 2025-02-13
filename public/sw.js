self.addEventListener("install", (event) => {
    console.log("Service Worker zainstalowany");
    event.waitUntil(
      caches.open("app-cache").then((cache) => {
        return cache.addAll([
          "/",
          "/index.html",
          "/manifest.json",
          "/icon-192.png",
          "/icon-512.png",
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  