import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SafarAtlas Journal | Morocco Travel Guides & Insider Escapes",
  description:
    "Expert Morocco travel guides from local scouts — choosing the right desert, planning a 7-day managed journey, surf and coastal escapes, packing tips, and more.",
  alternates: {
    canonical: "https://safaratlas.com/blog",
  },
  openGraph: {
    title: "SafarAtlas Journal | Morocco Travel Guides",
    description:
      "Insider Morocco travel knowledge from local scouts. Plan smarter, travel deeper.",
    url: "https://safaratlas.com/blog",
    siteName: "SafarAtlas",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "SafarAtlas Morocco Travel Journal",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafarAtlas Journal | Morocco Travel Guides",
    description: "Insider Morocco travel knowledge from local scouts.",
    images: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": "https://safaratlas.com/blog",
            name: "SafarAtlas Journal",
            description:
              "Expert Morocco travel guides — desert escapes, coastal towns, packing tips, and honeymoon itineraries from local scouts.",
            url: "https://safaratlas.com/blog",
            publisher: {
              "@type": "Organization",
              name: "SafarAtlas",
              url: "https://safaratlas.com",
              logo: {
                "@type": "ImageObject",
                url: "https://safaratlas.com/safar-atlas-logo.svg",
              },
            },
            inLanguage: "en-US",
          }),
        }}
      />
      {children}
    </>
  );
}
