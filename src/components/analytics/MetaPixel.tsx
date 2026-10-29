"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "safaratlas_cookie_consent";

/**
 * Loads the Meta Pixel only after the visitor has given explicit consent.
 *
 * Loading the pixel before consent and merely calling `fbq('consent', 'revoke')`
 * still ships the tracking script to the browser, which regulators treat as
 * non-compliant. Nothing is injected here until consent is "all".
 */
export function MetaPixel({ pixelId }: { pixelId?: string }) {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!pixelId) return;

    const readConsent = () => {
      try {
        setGranted(localStorage.getItem(STORAGE_KEY) === "all");
      } catch {
        setGranted(false);
      }
    };

    readConsent();
    window.addEventListener("safaratlas:consent", readConsent);
    return () => window.removeEventListener("safaratlas:consent", readConsent);
  }, [pixelId]);

  if (!pixelId || !granted) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}
