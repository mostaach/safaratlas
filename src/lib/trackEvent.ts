// A simple client-side event tracker
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  // Let's get or set a simple session ID
  let sessionId = sessionStorage.getItem("safar_session_id");
  if (!sessionId) {
    sessionId = `sess_${crypto.randomUUID()}`;
    sessionStorage.setItem("safar_session_id", sessionId);
  }

  // Fire and forget
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      properties,
      sessionId,
      url: window.location.href,
    }),
  }).catch((err) => {
    console.error("[SafarAtlas Analytics] Failed to track event:", err);
  });
};
