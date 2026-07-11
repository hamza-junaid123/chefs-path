/* ==========================================================================
   Chef's Path — service worker
   Sole job: let the kitchen timer show notifications reliably while the tab is
   backgrounded, and focus the app when a notification is clicked. No offline
   caching — the site is tiny and always fetched fresh, so there's nothing to
   stale. (Service workers need a secure context; this is a no-op on file://.)
   ========================================================================== */

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

// Tapping a timer notification focuses an open tab, or opens the timer page.
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (list) {
      for (const client of list) {
        if ("focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("./#/timer");
    })
  );
});
