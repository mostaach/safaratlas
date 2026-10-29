export const META_DESCRIPTION_LIMIT = 155;

export const BLOG_SEO: Record<string, { title: string; description: string }> = {
  "agafay-vs-sahara-desert-guide": {
    title: "Agafay vs. Merzouga: Which Desert Escape?",
    description:
      "Agafay is 40 minutes from Marrakech; Merzouga is a 9-hour drive. Compare scenery, cost, timing and which desert fits your trip.",
  },
  "7-day-managed-morocco-itinerary-guide": {
    title: "7-Day Morocco Itinerary: Marrakech to Sahara",
    description:
      "A realistic 7-day Morocco route from Marrakech to the Sahara and the coast, with honest drive times and where to slow down.",
  },
  "taghazout-surf-yoga-coastal-guide": {
    title: "Taghazout Travel Guide: Surf, Yoga & Ocean",
    description:
      "Surf breaks, rooftop yoga and a laid-back fishing village: how to plan a Taghazout stay, when to go and where to sleep.",
  },
  "best-riads-marrakech-medina-guide": {
    title: "Best Riads in Marrakech Medina (2026 Guide)",
    description:
      "How to choose a riad in the Marrakech medina: location trade-offs, what photos hide, and the questions to ask before booking.",
  },
  "best-time-to-visit-morocco-month-by-month": {
    title: "Best Time to Visit Morocco: Month by Month",
    description:
      "Month-by-month Morocco weather, crowds and prices, from Sahara heat in July to the sweet spots in spring and autumn.",
  },
  "morocco-honeymoon-couples-itinerary-guide": {
    title: "Morocco Honeymoon & Couples Itinerary Guide",
    description:
      "A romantic Morocco itinerary for couples: desert nights, riad courtyards and coast, with honest notes on pacing and privacy.",
  },
  "things-to-do-in-marrakech-guide": {
    title: "Top 7 Things to Do in Marrakech",
    description:
      "Seven Marrakech experiences actually worth your time, plus the overrated ones to skip and how to book them without overpaying.",
  },
  "agafay-desert-night-stargazing-glamping": {
    title: "Agafay at Night: Stargazing & Glamping Guide",
    description:
      "What an Agafay overnight really feels like: stargazing, desert camp comfort, temperatures and whether glamping is worth it.",
  },
  "morocco-packing-list-what-to-wear-and-bring": {
    title: "Morocco Packing List: What to Wear by Season",
    description:
      "What to pack for Morocco in every season: layers for desert nights, respectful clothing for medinas and the things travellers forget.",
  },
  "essaouira-vs-taghazout-atlantic-coast-guide": {
    title: "Essaouira vs. Taghazout: Which Coast Town?",
    description:
      "Essaouira or Taghazout? Compare wind, surf, medina charm, crowds and travel time to pick the right Atlantic base for your trip.",
  },
};

/**
 * Trims a description to the meta-description budget without cutting a word in
 * half, so search results never show a mid-word ellipsis.
 */
export function clampDescription(value: string, limit = META_DESCRIPTION_LIMIT): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;

  const cut = text.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const boundary = lastSpace > limit * 0.6 ? lastSpace : cut.length;
  return `${cut.slice(0, boundary).replace(/[,;:.\-–—]$/, "")}…`;
}
