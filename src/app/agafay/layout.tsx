import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Agafay Desert Full Experience (€34/pax) | SafarAtlas Marrakech",
  description:
    "Complete Agafay desert experience from Marrakech for €34/person: roundtrip transfer, quad biking, camel ride, mint tea, sunset view, tagine dinner & Gnaoua fire show.",
  alternates: {
    canonical: "https://safaratlas.com/agafay",
  },
  openGraph: {
    title: "Agafay Desert Full Experience — €34/person | SafarAtlas",
    description:
      "All-inclusive Agafay Desert experience: Transfer + Quad + Camel Trek + Tea + Sunset + Candlelit Tagine Dinner & Live Fire Show for €34/person.",
    url: "https://safaratlas.com/agafay",
    siteName: "SafarAtlas",
    images: [
      {
        url: "https://safaratlas.com/agafay-hero-quads.jpg",
        width: 1200,
        height: 630,
        alt: "Agafay Desert Quad Biking & Sunset Dinner SafarAtlas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agafay Desert Full Experience — €34/person | SafarAtlas",
    description:
      "All-inclusive Agafay Desert experience: Transfer + Quad + Camel Trek + Tea + Sunset + Candlelit Tagine Dinner & Live Fire Show for €34/person.",
    images: ["https://safaratlas.com/agafay-hero-quads.jpg"],
  },
};

export default function AgafayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="schema-agafay-tour"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": "Agafay Desert Full Experience: Quad, Camel & Sunset Dinner",
            "description":
              "Complete Agafay desert evening trip from Marrakech including roundtrip transfers, quad safari, sunset camel trek, Moroccan mint tea, traditional tagine feast and live Gnaoua fire show.",
            "touristType": ["Adventure", "Couples", "Families", "Culture"],
            "offers": {
              "@type": "Offer",
              "price": "34.00",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "validFrom": "2025-01-01",
              "url": "https://safaratlas.com/agafay"
            },
            "provider": {
              "@type": "TravelAgency",
              "name": "SafarAtlas",
              "url": "https://safaratlas.com",
              "telephone": "+212698017323"
            }
          }),
        }}
      />
      {children}
    </>
  );
}
