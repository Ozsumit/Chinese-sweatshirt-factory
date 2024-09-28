// next.config.mjs
import withPWA from "next-pwa";

const runtimeCaching = [
  {
    urlPattern: /^https?.*/,
    handler: "CacheFirst",
    options: {
      cacheName: "external-cache",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  {
    urlPattern: "/",
    handler: "CacheFirst",
    options: {
      cacheName: "homepage-cache",
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  {
    urlPattern: /\/_next\/image/,
    handler: "CacheFirst",
    options: {
      cacheName: "image-cache",
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  {
    urlPattern: /\/page\.tsx/,
    handler: "CacheFirst",
    options: {
      cacheName: "offline-cache",
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add other Next.js config options here
};

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

export default withPWAConfig(nextConfig);
