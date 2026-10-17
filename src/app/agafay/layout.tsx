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
        url: "https://safaratlas.com/escapes/agafay-sunset-dinner.webp",
        width: 1200,
        height: 630,
        alt: "Agafay Desert Sunset & Candlelit Dining SafarAtlas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agafay Desert Sunset & Candlelit Dining | SafarAtlas",
    description:
      "Full desert evening 40m from Marrakech: Roundtrip transfer, 1h quad biking, sunset camel ride, 3-course feast & fire show. Pay on arrival.",
    images: ["https://safaratlas.com/escapes/agafay-sunset-dinner.webp"],
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
                  "priceCurrency": "EUR",
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "119",
                    "priceCurrency": "EUR"
                  },
                  "availability": "https://schema.org/InStock",
                  "url": "https://safaratlas.com/agafay",
                  "validFrom": "2026-01-01",
                  "description": "Custom quote based on group size and season. Contact via WhatsApp for transparent pricing."
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
                      "text": "The Agafay Desert sits roughly 35 km south of Marrakech — a scenic 40 to 45-minute drive by private, air-conditioned vehicle from your riad or hotel doorstep."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is included in the Agafay Desert experience?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Roundtrip private hotel transfer, a 1-hour guided quad biking safari with helmet and goggles, a 20-minute sunset camel trek in traditional Berber attire, Moroccan mint tea on a panoramic terrace, a full 3-course candlelit tagine dinner, and a live Gnawa music and fire show."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much does the Agafay Desert escape cost?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The private signature escape starts from €119 per person. The final quote depends on party size and travel season, and you receive one clear written figure on WhatsApp before you commit — no hidden extras and no on-site surcharges."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is this a private experience or a shared group tour?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It is 100% private. You travel in your own vehicle with your own driver and keep your own pace. Separate bookings are never mixed, and you are never added to a coach with strangers."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do I have to pay in advance?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No advance payment is required. You can pay on arrival at the camp in cash (Euros or Moroccan Dirhams) or by card, with free cancellation up to 24 hours before pickup."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What should I wear?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Comfortable trousers and closed shoes for the quad biking, sunglasses for dust, and a light jacket — desert temperatures drop noticeably after sunset, even in summer."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What time do we get back to Marrakech?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The escape runs from approximately 16:30 to 21:30, arriving back at your Marrakech riad or hotel around 22:00 to 22:15."
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
