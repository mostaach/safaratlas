import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SafarAtlas | Managed Morocco Journeys & Escapes",
    short_name: "SafarAtlas",
    description:
      "Private managed escapes across Morocco: Agafay desert dinners, Sahara expeditions, High Atlas treks and Taghazout surf escapes.",
    start_url: "/",
    display: "standalone",
    background_color: "#07192d",
    theme_color: "#07192d",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
