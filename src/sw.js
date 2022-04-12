const ASSETS = [
  "index.html",
  "404.html",
  "bugs/index.html",
  "system/cursors/text.cur",
  "system/cursors/default.cur",
  "system/cursors/pointer.cur",
  "system/scripts/boot.js",
  "system/scripts/config.js",
  "system/scripts/3party/howler.js",
  "system/scripts/3party/jquery.js",
  "system/scripts/3party/jszip.js",
  "system/scripts/3party/localforage.js",
  "system/scripts/3party/screenshot.js",
  "system/styles/sys41.css",
  "system/styles/bs.css",
  "system/styles/themes/7.css",
  "system/styles/themes/98.css",
  "system/styles/themes/xp.css"
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('main').then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
});
