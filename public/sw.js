define(["./workbox-e43f5367"], function (workbox) {
  "use strict";

  // Precache and skip waiting
  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();

  // Cache the whole page (HTML) for 30 days
  workbox.registerRoute(
    "/",
    new workbox.CacheFirst({
      cacheName: "whole-page",
      plugins: [
        new workbox.ExpirationPlugin({
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        }),
      ],
    }),
    "GET"
  );

  // Cache JavaScript and CSS with StaleWhileRevalidate strategy
  workbox.registerRoute(
    /\.(?:js|css)$/, // Regex to match JS and CSS files
    new workbox.StaleWhileRevalidate({
      cacheName: "static-resources",
      plugins: [
        new workbox.ExpirationPlugin({
          maxEntries: 50, // Limit the number of items in the cache
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        }),
      ],
    })
  );

  // Cache images
  workbox.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/, // Regex for images
    new workbox.CacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
        }),
      ],
    })
  );

  // Fallback to network-only for other requests
  workbox.registerRoute(
    /.*/i,
    new workbox.NetworkOnly({
      cacheName: "dev",
      plugins: [],
    }),
    "GET"
  );
});
