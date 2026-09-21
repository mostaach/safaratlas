import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Taghazout Surf Camp Alternative | 3-Day Surf & Wellness Escape",
  description:
    "Private 3-day Taghazout surf and wellness escape with ocean-view stay, Agadir transfer, surf coaching or yoga, and direct WhatsApp booking.",
  alternates: {
    canonical: "https://safaratlas.com/taghazout",
  },
  openGraph: {
    title: "Taghazout Surf & Wellness Escape — SafarAtlas",
    description:
      "A boutique alternative to a Taghazout surf camp: private ocean-view stay, Agadir transfer, surf coaching or restorative yoga, and zero logistics.",
    url: "https://safaratlas.com/taghazout",
    siteName: "SafarAtlas",
    images: [
      {
        url: "https://safaratlas.com/escapes/taghazout-surf.jpg",
        width: 1200,
        height: 630,
        alt: "Taghazout Escapes Ocean View & Surf SafarAtlas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taghazout Surf & Wellness Escape | SafarAtlas",
    description:
      "Private 3-day Taghazout escape with ocean-view stay, surf or yoga rhythm, Agadir transfer, and WhatsApp booking.",
    images: ["https://safaratlas.com/escapes/taghazout-surf.jpg"],
  },
};

export default function TaghazoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="schema-taghazout-escape"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": "Taghazout Escapes by SafarAtlas",
            "url": "https://safaratlas.com/taghazout",
            "image": "https://safaratlas.com/escapes/taghazout-surf.jpg",
            "description":
              "Premium 3-day surf and wellness escape in Taghazout, Morocco with boutique ocean-view accommodation, Agadir airport transfer, surf coaching or yoga, and direct WhatsApp concierge.",
            "touristType": [
              "Surf Travelers",
              "Wellness Travelers",
              "Couples",
              "Short Break Travelers"
            ],
            "itinerary": {
              "@type": "ItemList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Agadir arrival, private transfer, ocean-view check-in" },
                { "@type": "ListItem", "position": 2, "name": "Slow yoga and hammam rhythm or active surf coaching rhythm" },
                { "@type": "ListItem", "position": 3, "name": "Sunrise swim, local harbor time, and onward transfer" }
              ]
            },
            "provider": {
              "@type": "TravelAgency",
              "name": "SafarAtlas",
              "url": "https://safaratlas.com",
              "telephone": "+212695959074"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://safaratlas.com/taghazout",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock"
            },
            "sameAs": [
              "https://taghazout-escapes.vercel.app",
              "https://instagram.com/taghazout.escapes"
            ]
          }),
        }}
      />
      {children}
    </>
  );
}
