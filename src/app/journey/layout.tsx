import type { Metadata } from "next";

const url = "https://safaratlas.com/journey";

export const metadata: Metadata = {
  title: "Plan a Custom Morocco Journey | SafarAtlas",
  description:
    "Build a private Morocco itinerary in minutes: choose your escapes, dates and group size, then receive a transparent quote from a local team.",
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "Plan a Custom Morocco Journey | SafarAtlas",
    description:
      "Design your own Morocco itinerary and get a transparent, all-inclusive quote from a local team.",
    url,
    siteName: "SafarAtlas",
    type: "website",
    images: [
      {
        url: "https://safaratlas.com/destinations/atlas.jpg",
        width: 1200,
        height: 630,
        alt: "Morocco journey planning with SafarAtlas",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan a Custom Morocco Journey | SafarAtlas",
    description:
      "Design your own Morocco itinerary and get a transparent, all-inclusive quote from a local team.",
    images: ["https://safaratlas.com/destinations/atlas.jpg"],
  },
};

export default function JourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
