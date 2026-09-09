import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Agafay Desert Sunset, Quad & Dinner Tour from Marrakech | SafarAtlas",
  description:
    "Curated evening in Agafay Desert: 1h guided quad biking safari, golden-hour camel trek, 3-course Berber campfire dinner, and live Gnawa fire show. WhatsApp booking.",
  alternates: {
    canonical: "https://safaratlas.com/agafay",
  },
  openGraph: {
    title: "Agafay Desert Experience — Sunset Quad, Camel & Campfire Dinner | SafarAtlas",
    description:
      "All-inclusive evening 40 minutes from Marrakech: Hotel pickup, quad biking, camel ride at sunset, candlelit tagine feast, and live Gnawa music.",
    url: "https://safaratlas.com/agafay",
    siteName: "SafarAtlas",
    images: [
      {
        url: "https://safaratlas.com/agafay-hero-quads.jpg",
        width: 1200,
        height: 630,
        alt: "Agafay Desert Quad Biking and Sunset Camel Trek SafarAtlas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agafay Desert Sunset & Campfire Dinner | SafarAtlas",
    description:
      "Full desert evening 40m from Marrakech: Roundtrip transfer, 1h quad biking, sunset camel ride, 3-course feast & fire show. Pay on arrival.",
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
        id="schema-agafay-tourist-trip"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "TouristTrip",
                "@id": "https://safaratlas.com/agafay#trip",
                "name": "Agafay Desert Sunset, Quad & Campfire Dinner",
                "description": "5-hour luxury desert escape from Marrakech with quad biking, camel trek, 3-course dinner, and Gnawa fire show.",
                "touristType": ["Couples", "Solo Travelers", "Families", "Adventure Seekers"],
                "provider": {
                  "@type": "TravelAgency",
                  "name": "SafarAtlas",
                  "url": "https://safaratlas.com",
                  "telephone": "+212698017323"
                },
                "offers": {
                  "@type": "Offer",
                  "price": "34",
                  "priceCurrency": "EUR",
                  "availability": "https://schema.org/InStock",
                  "url": "https://safaratlas.com/agafay",
                  "validFrom": "2026-01-01"
                }
              },
              {
                "@type": "FAQPage",
                "@id": "https://safaratlas.com/agafay#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How far is the Agafay Desert from Marrakech?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The Agafay Desert is located approximately 35 km south of Marrakech, about a 40 to 45-minute scenic air-conditioned drive from your riad or hotel doorstep."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is included in the Agafay Desert tour?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The experience includes roundtrip Marrakech hotel transfers, 1 hour of guided quad biking with helmet and goggles, a 20-minute sunset camel trek in traditional Berber attire, Moroccan mint tea, a 3-course campfire tagine dinner, and live Gnawa music with a fire show."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What should I wear to the Agafay Desert evening?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Wear comfortable casual clothing, closed-toe sneakers for quad biking, sunglasses for dust protection, and bring a light jacket as desert temperatures drop noticeably after sunset."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do I have to pay in advance for the Agafay tour?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No advance payment is required. You can pay securely upon arrival at the camp using cash (Euros or Moroccan Dirhams) or credit card, with free cancellation up to 24 hours prior."
                    }
                  }
                ]
              }
            ]
          }),
        }}
      />
      {children}
    </>
  );
}
