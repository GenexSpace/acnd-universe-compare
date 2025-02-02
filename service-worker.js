const CACHE_NAME = "acnd-universe-cache-v2";

// List of files to cache
const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "main.js",
  "data.js",
  "milky-way.jpg",
  "milky-way-hd.jpg",
  "og-image.png",
  "screenshot-earth-mars.png",
  "screenshot-jupiter-sun.png",
  "logo.png",
  "low/ariel.jpg",
  "low/callisto.jpg",
  "low/ceres.jpg",
  "low/dione.jpg",
  "low/earth.jpg",
  "low/enceladus.jpg",
  "low/europa.jpg",
  "low/ganymede.jpg",
  "low/iapetus.jpg",
  "low/io.jpg",
  "low/jupiter.jpg",
  "low/mars.jpg",
  "low/mercury.jpg",
  "low/mimas.jpg",
  "low/miranda.jpg",
  "low/moon.jpg",
  "low/neptune.jpg",
  "low/oberon.jpg",
  "low/pluto.jpg",
  "low/rhea.jpg",
  "low/saturn.jpg",
  "low/sun.jpg",
  "low/tethys.jpg",
  "low/titan.jpg",
  "low/titania.jpg",
  "low/triton.jpg",
  "low/umbriel.jpg",
  "low/venus.jpg"
];

// Install Service Worker & Cache Files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching app files...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Serve files from Cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Update Service Worker & Remove Old Cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
