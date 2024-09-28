import withPWA from "next-pwa";

const runtimeCaching = [
  {
    urlPattern: /^https?.*/, // Cache all requests to external APIs
    handler: "NetworkFirst",
    options: {
      cacheName: "external-cache",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // 1 day
      },
    },
  },
  {
    urlPattern: "/",
    handler: "NetworkFirst", // Serve from network first, fallback to cache
    options: {
      cacheName: "homepage-cache",
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 24 * 60 * 60, // 1 day
      },
    },
  },
  {
    urlPattern: /\/_next\/image/,
    handler: "CacheFirst", // Cache optimized images
    options: {
      cacheName: "image-cache",
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
      },
    },
  },
  {
    urlPattern: /\/page.tsx/,
    handler: "CacheFirst", // Offline fallback page
    options: {
      cacheName: "offline-cache",
      expiration: {
        maxEntries: 1,
      },
    },
  },
];

export default withPWA({
  dest: "public",
  runtimeCaching,
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Enable PWA only in production
});
