import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "SafarAtlas | Managed Morocco Journeys & Escapes",
  description: "Discover Morocco, select modular Escapes (Sahara, Agafay, Taghazout), and let SafarAtlas orchestrate your complete journey with trusted local partners.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
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

import Script from "next/script";

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
      <body className="min-h-full flex flex-col font-sans bg-[#faf6f0] text-[#16221e]" suppressHydrationWarning>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "YOUR_CLARITY_ID_HERE");
          `}
        </Script>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://safaratlas.com/#organization",
                  "name": "SafarAtlas",
                  "url": "https://safaratlas.com",
                  "logo": "https://safaratlas.com/icon.png",
                  "description": "Managed Morocco Journeys & Travel Escapes",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer support",
                    "email": "hello@safaratlas.com"
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
