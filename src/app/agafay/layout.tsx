import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agafay Desert Sunset, Quad & Dinner Tour from Marrakech | SafarAtlas",
  description:
    "Curated Agafay Desert evening from €119: private transfer, mint tea, a 3-course Berber campfire dinner and live Gnawa fire show. Signature all-inclusive from €179 adds the quad safari and camel trek. WhatsApp booking.",
  alternates: {
    canonical: "https://safaratlas.com/agafay",
  },
  openGraph: {
    title: "Agafay Desert Experience — Sunset Quad, Camel & Campfire Dinner | SafarAtlas",
    description:
      "Private evening 40 minutes from Marrakech from €119: hotel pickup, candlelit tagine feast, and live Gnawa music. Signature from €179 adds 1h quad biking and a sunset camel ride.",
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
      "Private desert evening 40m from Marrakech from €119: roundtrip transfer, 3-course feast & fire show. Signature from €179 adds quad biking & camel ride. Pay on arrival.",
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
      <script
        type="application/ld+json"
        // A plain <script> is required: next/script defers to the client and the
        // JSON-LD never reaches the server-rendered HTML.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "TouristTrip",
                "@id": "https://safaratlas.com/agafay#trip",
                "name": "Agafay Desert Sunset, Quad & Campfire Dinner",
                "description": "5-hour private desert escape from Marrakech. Core evening from €119 (transfer, mint tea, 3-course dinner, Gnawa fire show); Signature all-inclusive from €179 adds a guided quad safari and sunset camel trek.",
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
                      "text": "Every tier includes private roundtrip transfer, Moroccan mint tea on a panoramic terrace, a full 3-course candlelit tagine dinner, and a live Gnawa music and fire show. The Signature all-inclusive tier (from €179) also adds the 1-hour guided quad biking safari and the 20-minute sunset camel trek; on the €119 core evening both are available as add-ons (quad +€40, camel +€20)."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much does the Agafay Desert escape cost?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "There are two tiers. The core evening is from €119 per person — private transfer, mint tea, a 3-course tagine dinner and the Gnawa fire show. The Signature all-inclusive evening, which adds the guided quad safari and the sunset camel trek, is from €179 per person. The final quote depends on party size and season, and you receive one clear written figure on WhatsApp before you commit — no hidden extras and no on-site surcharges."
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
      ></script>
      {children}
    </>
  );
}
