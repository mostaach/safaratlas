import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sansFont = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safaratlas.com"),
  title: "SafarAtlas | Managed Morocco Journeys & Escapes",
  description: "Discover Morocco, select modular Escapes (Sahara, Agafay, Taghazout), and let SafarAtlas orchestrate your complete journey with trusted local partners.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "SafarAtlas | Managed Morocco Journeys & Escapes",
    description: "Discover Morocco, select modular Escapes (Sahara, Agafay, Taghazout), and let SafarAtlas orchestrate your complete journey with trusted local partners.",
    url: "https://safaratlas.com",
    siteName: "SafarAtlas",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "SafarAtlas Morocco Journeys",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafarAtlas | Managed Morocco Journeys & Escapes",
    description: "Discover Morocco, select modular Escapes (Sahara, Agafay, Taghazout), and let SafarAtlas orchestrate your complete journey with trusted local partners.",
    images: ["https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"],
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RLJL1P7M43";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#faf6f0] text-[#16221e]" suppressHydrationWarning>

        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "TravelAgency",
                  "@id": "https://safaratlas.com/#organization",
                  "name": "SafarAtlas",
                  "url": "https://safaratlas.com",
                  "logo": "https://safaratlas.com/safar-atlas-logo.svg",
                  "description": "Curated private tours, desert escapes, and coordinated journeys across Morocco.",
                  "telephone": "+212698017323",
                  "priceRange": "€€",
                  "areaServed": "Morocco",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Marrakech",
                    "postalCode": "40000",
                    "addressCountry": "MA"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer support",
                    "email": "contactsafaratlas@gmail.com",
                    "telephone": "+212698017323"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://safaratlas.com/#website",
                  "url": "https://safaratlas.com",
                  "name": "SafarAtlas",
                  "publisher": {
                    "@id": "https://safaratlas.com/#organization"
                  }
                }
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
