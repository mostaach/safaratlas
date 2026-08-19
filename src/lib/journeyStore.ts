import { JourneyEscapeItem, JourneyState } from "./journeyTypes";

const STORAGE_KEY = "safaratlas_current_journey_v2";

export const getStoredJourney = (): JourneyState => {
  if (typeof window === "undefined") {
    return { items: [], destinations: ["Marrakech"], travelDates: "", groupSize: "2 travelers", notes: "" };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], destinations: ["Marrakech"], travelDates: "", groupSize: "2 travelers", notes: "" };
    return JSON.parse(raw);
  } catch (e) {
    return { items: [], destinations: ["Marrakech"], travelDates: "", groupSize: "2 travelers", notes: "" };
  }
};

export const saveJourney = (state: JourneyState): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("safaratlas_journey_update", { detail: state }));
  } catch (e) {
    console.error("Failed to save journey state", e);
  }
};

export const addEscapeToJourney = (escape: {
  id: string;
  slug: string;
  title: string;
  duration: string;
  location: string;
  priceFromEur: number;
  image: string;
  badge?: string;
}): JourneyState => {
  const current = getStoredJourney();
  
  // Prevent duplicate additions
  const exists = current.items.some((item) => item.slug === escape.slug);
  if (exists) return current;

  // Extract days & nights from duration string like "3 Days / 2 Nights" or "1 Day"
  let days = 1;
  let nights = 0;
  const matchDays = escape.duration.match(/(\d+)\s*Day/i);
  const matchNights = escape.duration.match(/(\d+)\s*Night/i);
  if (matchDays) days = parseInt(matchDays[1], 10);
  if (matchNights) nights = parseInt(matchNights[1], 10);

  const newItem: JourneyEscapeItem = {
    id: escape.id,
    slug: escape.slug,
    title: escape.title,
    durationDays: days,
    durationNights: nights,
    location: escape.location,
    priceFromEur: escape.priceFromEur,
    image: escape.image,
    badge: escape.badge,
    addedAt: Date.now(),
  };

  const updated: JourneyState = {
    ...current,
    items: [...current.items, newItem],
  };

  saveJourney(updated);
  return updated;
};

export const removeEscapeFromJourney = (slug: string): JourneyState => {
  const current = getStoredJourney();
  const updated: JourneyState = {
    ...current,
    items: current.items.filter((item) => item.slug !== slug),
  };
  saveJourney(updated);
  return updated;
};

export const clearJourney = (): JourneyState => {
  const empty: JourneyState = { items: [], destinations: ["Marrakech"], travelDates: "", groupSize: "2 travelers", notes: "" };
  saveJourney(empty);
  return empty;
};
