/**
 * Global Analytics & Conversion Event Dispatcher for SafarAtlas.
 * Dispatches custom events to Google Analytics 4 (via gtag) and Meta Pixel (via fbq if loaded).
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === "undefined") return;

  const payload = properties || {};

  // Log in non-production for verification
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Event Tracked]: ${eventName}`, payload);
  }

  // 1. Google Analytics 4
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, payload);
    } catch (err) {
      console.warn("[Analytics] gtag event dispatch error:", err);
    }
  } else if (Array.isArray(window.dataLayer)) {
    // Fallback: push to dataLayer directly if gtag wrapper not yet attached
    try {
      window.dataLayer.push({
        event: eventName,
        ...payload,
      });
    } catch {}
  }

  // 2. Meta Pixel (if granted & initialized)
  if (typeof window.fbq === "function") {
    try {
      if (eventName === "lead_submit" || eventName === "journey_request_submit") {
        window.fbq("track", "Lead", payload);
      } else if (eventName === "lead_start") {
        window.fbq("trackCustom", "LeadStart", payload);
      } else if (eventName === "listing_view") {
        window.fbq("track", "ViewContent", payload);
      } else {
        window.fbq("trackCustom", eventName, payload);
      }
    } catch (err) {
      console.warn("[Analytics] fbq event dispatch error:", err);
    }
  }
}
