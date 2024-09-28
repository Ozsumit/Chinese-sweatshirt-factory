const withPWA = require("next-pwa");

const pwaConfig = {
  dest: "public",
  runtimeCaching: [
    {
      urlPattern: /^https?.*/, // External APIs
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
      urlPattern: /\/_next\/image/, // Images caching
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
        },
      },
    },
  ],
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
};

const nextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
};

// Combine PWA and Next.js configs
module.exports = withPWA(pwaConfig)(nextConfig);
