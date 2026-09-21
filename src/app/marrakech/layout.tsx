import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Things to Do in Marrakech | Plan Your Morocco Journey | SafarAtlas",
  description:
    "Build your perfect Marrakech trip day-by-day. Choose from curated escapes — Agafay Desert, Sahara Expedition, Atlas Mountains, Ouzoud Waterfalls — and let SafarAtlas coordinate private transport, local guides, and concierge support.",
  alternates: {
    canonical: "https://safaratlas.com/marrakech",
  },
  openGraph: {
    title: "Marrakech Journey Builder — Curated Private Escapes | SafarAtlas",
    description:
      "Plan your stay in Marrakech and assemble curated day trips to Agafay Desert, Sahara, Atlas Mountains, and more. SafarAtlas handles every private transfer and local guide.",
    url: "https://safaratlas.com/marrakech",
    siteName: "SafarAtlas",
    images: [
      {
        url: "https://safaratlas.com/destinations/marrakech.jpg",
        width: 1200,
        height: 630,
        alt: "Marrakech Private Journey SafarAtlas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrakech Journey Builder | SafarAtlas",
    description:
      "Build your Marrakech trip day-by-day. Add curated escapes — Agafay, Sahara, Atlas — and SafarAtlas coordinates everything.",
    images: ["https://safaratlas.com/destinations/marrakech.jpg"],
  },
};

export default function MarrakechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="schema-marrakech-destination"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "TouristDestination",
                "@id": "https://safaratlas.com/marrakech#destination",
                "name": "Marrakech",
                "description":
                  "Marrakech is Morocco's most vibrant imperial city and the gateway to curated private escapes: Agafay Desert, High Atlas Mountains, Ouzoud Waterfalls, and the Sahara Expedition.",
                "url": "https://safaratlas.com/marrakech",
                "touristType": [
                  "Cultural Travelers",
                  "Adventure Seekers",
                  "Couples",
                  "Families",
                ],
                "hasMap": "https://maps.google.com/?q=Marrakech,Morocco",
                "containedInPlace": {
                  "@type": "Country",
                  "name": "Morocco",
                },
                "provider": {
                  "@type": "TravelAgency",
                  "@id": "https://safaratlas.com/#organization",
                  "name": "SafarAtlas",
                  "url": "https://safaratlas.com",
                  "telephone": "+212698017323",
                },
              },
              {
                "@type": "FAQPage",
                "@id": "https://safaratlas.com/marrakech#faq",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What are the best day trips from Marrakech?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text":
                        "The best day trips from Marrakech include the Agafay Desert (45 min drive), Ouzoud Waterfalls (2.5 hrs), Ourika Valley (1 hr), Imlil and the Atlas Mountains (1.5 hrs), and the 3-day Sahara Expedition to Merzouga. SafarAtlas coordinates all private transfers and local guides.",
                    },
                  },
                  {
                    "@type": "Question",
                    "name": "How do I book a private tour from Marrakech?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text":
                        "With SafarAtlas, you choose your escapes from the journey builder, then message our WhatsApp concierge with your dates and group size. We confirm availability and coordinate your private transport, guides, and logistics within minutes.",
                    },
                  },
                  {
                    "@type": "Question",
                    "name": "How many days should I spend in Marrakech?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text":
                        "Most travelers spend 3 to 5 days in Marrakech to experience the medina, visit the souks, and add one or two day escapes. For a well-rounded experience including a desert escape, plan 5 to 7 days.",
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
