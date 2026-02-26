const CACHE_NAME = 'olive-calc-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-1024.png' // تأكد من وجود صورة بهذا الاسم أو غير الاسم في الكود
];

// تثبيت الخدمة وتخزين الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// استرجاع الملفات من التخزين عند عدم وجود إنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
