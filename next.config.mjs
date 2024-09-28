import withPWA from "next-pwa";

// const runtimeCaching = [
//   /* your caching strategies */
// ];

// Use "export default" as you're working with modules
export default withPWA({
  dest: "public",
  runtimeCaching,
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development", // Enable PWA only in production
});
