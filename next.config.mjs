const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/, // External APIs
      handler: 'NetworkFirst',
      options: {
        cacheName: 'external-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
    {
      urlPattern: /\/_next\/image/, // Images caching
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
        },
      },
    },
  ],
  disable: process.env.NODE_ENV === 'development' || isExport,
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  output: 'export', // ensures next export is compatible
  trailingSlash: true, // GitHub Pages sometimes requires this for proper routing
});
