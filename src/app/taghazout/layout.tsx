import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Taghazout Escapes | 3-Day Surf & Wellness Reset | SafarAtlas",
  description:
    "A boutique 3-day Taghazout escape with oceanfront stay included. Choose Slow Escape for restorative reset or Active Escape for surf and movement. Human WhatsApp booking.",
  alternates: {
    canonical: "https://safaratlas.com/taghazout",
  },
  openGraph: {
    title: "Taghazout Escapes — The 72-Hour Reset | SafarAtlas",
    description:
      "Not everyone wants a surf camp. Two rhythms: Slow & restorative or Active & ocean-led. Ocean-view boutique stay, Agadir transfers, and zero logistics.",
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
    title: "Taghazout Escapes — The 72-Hour Reset | SafarAtlas",
    description:
      "Two premium 3-day rhythms in Taghazout: Slow Escape for reset or Active Escape for surf and movement. Book directly via WhatsApp.",
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
            "@type": "LodgingBusiness",
            "name": "Taghazout Escapes by SafarAtlas",
            "url": "https://safaratlas.com/taghazout",
            "image": "https://safaratlas.com/escapes/taghazout-surf.jpg",
            "telephone": "+212695959074",
            "description":
              "Premium 3-day surf and wellness escapes in Taghazout, Morocco. Boutique oceanfront accommodation, Agadir airport transfers, and curated coastal experiences.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Taghazout",
              "addressRegion": "Souss-Massa",
              "addressCountry": "MA"
            },
            "sameAs": [
              "https://taghazout-escapes.vercel.app",
              "https://instagram.com/taghazout.escapes"
            ],
            "starRating": {
              "@type": "Rating",
              "ratingValue": "5"
            }
          }),
        }}
      />
      {children}
    </>
  );
}
