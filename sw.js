// رقم النسخة - قم بتغييره (مثلاً من v3 إلى v4) عند إجراء أي تعديل مستقبلي
const CACHE_NAME = 'olive-calc-v5'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// مرحلة التثبيت: تخزين الملفات فوراً
self.addEventListener('install', (event) => {
  self.skipWaiting(); // إجبار النسخة الجديدة على التنشيط
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('جاري تخزين الملفات في الكاش...');
      return cache.addAll(ASSETS);
    })
  );
});

// مرحلة التنشيط: مسح أي كاش قديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('حذف نسخة قديمة:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim(); // السيطرة على المتصفح فوراً
});

// التعامل مع الطلبات (Fetch) لضمان العمل بدون إنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // إرجاع الملف من الكاش إذا وجد، وإلا جلبه من الإنترنت
      return response || fetch(event.request);
    })
  );
});
