import type { Metadata } from "next";

const url = "https://safaratlas.com/partners";

export const metadata: Metadata = {
  title: "Partner With SafarAtlas | Morocco Supplier Network",
  description:
    "Riads, drivers, guides and desert camps: join the SafarAtlas partner network and receive qualified travellers with clear commission terms.",
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "Partner With SafarAtlas | Morocco Supplier Network",
    description:
      "Join the SafarAtlas partner network and receive qualified travellers with clear commission terms.",
    url,
    siteName: "SafarAtlas",
    type: "website",
    images: [
      {
        url: "https://safaratlas.com/destinations/marrakech.jpg",
        width: 1200,
        height: 630,
        alt: "Morocco travel partners",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner With SafarAtlas | Morocco Supplier Network",
    description:
      "Join the SafarAtlas partner network and receive qualified travellers with clear commission terms.",
    images: ["https://safaratlas.com/destinations/marrakech.jpg"],
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
