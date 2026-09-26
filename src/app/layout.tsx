import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { CookieConsent } from "../components/ui/CookieConsent";
import { JourneyDrawer } from "../components/travel/JourneyDrawer";

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
  description: "Private managed escapes across Morocco — from Agafay desert dinners and Sahara 3-day expeditions to High Atlas treks and Taghazout surf resets. One message. Everything handled.",
  alternates: {
    canonical: "https://safaratlas.com",
    languages: {
      "en-US": "https://safaratlas.com",
      "en-GB": "https://safaratlas.com",
      "x-default": "https://safaratlas.com",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon-32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png?v=2", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: [
      { url: "/favicon-180.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "SafarAtlas | Managed Morocco Journeys & Escapes",
    description: "Private managed escapes across Morocco — from Agafay desert dinners and Sahara 3-day expeditions to High Atlas treks and Taghazout surf resets. One message. Everything handled.",
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
    description: "Private managed escapes across Morocco — from Agafay desert dinners and Sahara 3-day expeditions to High Atlas treks and Taghazout surf resets. One message. Everything handled.",
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
        {/* LCP Image Preload */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/agafay_rocky_desert_hero.webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
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

              var consentState = 'denied';
              try {
                if (localStorage.getItem('safaratlas_cookie_consent') === 'all') {
                  consentState = 'granted';
                }
              } catch (e) {}

              gtag('consent', 'default', {
                'analytics_storage': consentState,
                'ad_storage': consentState,
                'ad_user_data': consentState,
                'ad_personalization': consentState
              });

              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        {/* Schema.org Organization, TravelAgency, and WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["TravelAgency", "LocalBusiness"],
                  "@id": "https://safaratlas.com/#organization",
                  "name": "SafarAtlas",
                  "alternateName": "SafarAtlas Morocco Travel",
                  "url": "https://safaratlas.com",
                  "logo": "https://safaratlas.com/logo/safar-atlas-logo.svg",
                  "image": "https://safaratlas.com/safaratlas_hero_typography.jpg",
                  "description": "Curated private journeys, desert escapes, High Atlas treks, and boutique riad stays across Morocco.",
                  "telephone": "+212698017323",
                  "priceRange": "$$ - $$$",
                  "currenciesAccepted": "USD, EUR, GBP, MAD",
                  "paymentAccepted": "Credit Card, Debit Card, Bank Transfer, Cash",
                  "areaServed": [
                    {
                      "@type": "Country",
                      "name": "Morocco"
                    },
                    {
                      "@type": "Country",
                      "name": "United States"
                    },
                    {
                      "@type": "Country",
                      "name": "United Kingdom"
                    }
                  ],
                  "availableLanguage": [
                    {
                      "@type": "Language",
                      "name": "English",
                      "alternateName": "en"
                    },
                    {
                      "@type": "Language",
                      "name": "French",
                      "alternateName": "fr"
                    },
                    {
                      "@type": "Language",
                      "name": "Arabic",
                      "alternateName": "ar"
                    }
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Marrakech",
                    "postalCode": "40000",
                    "addressCountry": "MA"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "reservations & concierge support",
                    "email": "contactsafaratlas@gmail.com",
                    "telephone": "+212698017323",
                    "availableLanguage": ["English", "French", "Arabic"]
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://safaratlas.com/#website",
                  "url": "https://safaratlas.com",
                  "name": "SafarAtlas",
                  "inLanguage": "en-US",
                  "publisher": {
                    "@id": "https://safaratlas.com/#organization"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#07192d] text-[#f6f2ec]" suppressHydrationWarning>
        <CookieConsent />
        {children}
        <JourneyDrawer />
      </body>
    </html>
  );
}
