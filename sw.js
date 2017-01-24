this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1')
      .then(function(cache) {
        return cache.addAll([
          '/styles/common.css',
          '/assets/fonts/IcoMoon-Free.ttf',
          '/error/503.html'
        ]);
      }));
});

this.addEventListener('fetch', function(event) {
  var response;

  event.respondWith(
    caches.match(event.request)
      .catch(function() {
        return fetch(event.request);
      })
      .then(function(r) {
        response = r;
        caches.open('v1')
          .then(function(cache) {
            cache.put(event.request, response);
          });
    
          return response.clone();
      }).catch(function() {
        // Fallback, giving up
        return caches.match('/error/503.html');
      }));
});
