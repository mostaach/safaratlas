"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Tracks client-side page views in Next.js App Router for Google Analytics 4.
 *
 * Next.js client-side navigation (soft transitions) does not cause full page reloads,
 * so the initial gtag('config') in layout.tsx only records the initial landing page.
 * This component listens for route and query parameter changes and pushes 'page_view'
 * events to Google Analytics.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    // The initial landing is recorded on page load by gtag('config', ...).
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
