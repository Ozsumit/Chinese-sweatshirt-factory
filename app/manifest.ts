import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Chinese Sweatshirt Factory",
    short_name: "Donate",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/images/icons/icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "/images/icons/icon512_rounded.png",
        type: "image/png",
      },
    ],
    // iconss: [
    //   {
    //     src: "/public/images/icons/icon-72.png",
    //     sizes: "72x72",
    //     type: "image/png",
    //     // purpose: "maskable",
    //   },
    //   {
    //     src: "/images/icons/icon9-6.png",
    //     sizes: "96x96",
    //     type: "image/png",
    //     // purpose: "any maskable",
    //   },
    //   {
    //     src: "/images/icons/icon-128.png",
    //     sizes: "128x128",
    //     type: "image/png",
    //     // purpose: "any maskable",
    //   },
    //   {
    //     src: "/images/icons/icon-144.png",
    //     sizes: "144x144",
    //     type: "image/png",
    //     // purpose: "any maskable",
    //   },
    //   {
    //     src: "/public/images/icons/icon-152.png",
    //     sizes: "152x152",
    //     type: "image/png",
    //     // purpose: "any maskable",
    //   },
    //   {
    //     src: "/images/icons/icon-192.png",
    //     sizes: "192x192",
    //     type: "image/png",
    //     // purpose: "any maskable",
    //   },
    //   {
    //     src: "/images/icons/icon-384.png",
    //     sizes: "384x384",
    //     type: "image/png",
    //     // purpose: "any maskable",
    //   },
    //   {
    //     src: "/images/icons/icon-512.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //     // purpose: "any maskable",
    //   },
    // ],
  };
}
