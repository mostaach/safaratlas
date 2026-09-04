export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== "undefined") {
    console.log(`[Event Tracked]: ${eventName}`, properties || {});
  }
}
