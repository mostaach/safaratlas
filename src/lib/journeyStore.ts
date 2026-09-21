import { JourneyEscapeItem, JourneyState, JourneyExtraExperience } from "./journeyTypes";

const STORAGE_KEY = "safaratlas_current_journey_v2";

export const getStoredJourney = (): JourneyState => {
  if (typeof window === "undefined") {
    return {
      items: [],
      destinations: ["Marrakech"],
      travelDates: "",
      groupSize: "2 travelers",
      notes: "",
      accommodations: [],
      extras: [],
      hasAirportTransfer: false,
      destinationStays: [{ destination: "Marrakech", daysCount: 3 }],
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        items: [],
        destinations: ["Marrakech"],
        travelDates: "",
        groupSize: "2 travelers",
        notes: "",
        accommodations: [],
        extras: [],
        hasAirportTransfer: false,
        destinationStays: [{ destination: "Marrakech", daysCount: 3 }],
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      items: [],
      destinations: ["Marrakech"],
      travelDates: "",
      groupSize: "2 travelers",
      notes: "",
      accommodations: [],
      extras: [],
      hasAirportTransfer: false,
      destinationStays: [{ destination: "Marrakech", daysCount: 3 }],
    };
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
  assignedDay?: number;
  destinationContext?: string;
}): JourneyState => {
  const current = getStoredJourney();
  
  // Prevent duplicate additions
  const exists = current.items.some((item) => item.slug === escape.slug);
  if (exists) {
    // If it exists but we want to update the assigned day
    if (escape.assignedDay !== undefined) {
      const updatedItems = current.items.map((item) => 
        item.slug === escape.slug ? { ...item, assignedDay: escape.assignedDay } : item
      );
      const updated = { ...current, items: updatedItems };
      saveJourney(updated);
      return updated;
    }
    return current;
  }

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
    assignedDay: escape.assignedDay || null,
    destinationContext: escape.destinationContext || "Marrakech",
    addedAt: Date.now(),
  };

  const updated: JourneyState = {
    ...current,
    items: [...current.items, newItem],
  };

  saveJourney(updated);
  return updated;
};

export const assignEscapeToDay = (slug: string, dayNumber: number): JourneyState => {
  const current = getStoredJourney();
  const updatedItems = current.items.map((item) => {
    if (item.slug === slug) {
      return { ...item, assignedDay: dayNumber };
    }
    return item;
  });
  const updated = { ...current, items: updatedItems };
  saveJourney(updated);
  return updated;
};

export const setStayDurationDays = (destination: string, daysCount: number): JourneyState => {
  const current = getStoredJourney();
  const stays = current.destinationStays || [];
  const existingIndex = stays.findIndex((s) => s.destination.toLowerCase() === destination.toLowerCase());
  
  const updatedStays = [...stays];
  if (existingIndex >= 0) {
    updatedStays[existingIndex] = { destination, daysCount };
  } else {
    updatedStays.push({ destination, daysCount });
  }

  const updated = { ...current, destinationStays: updatedStays };
  saveJourney(updated);
  return updated;
};

export const toggleAirportTransfer = (enabled: boolean): JourneyState => {
  const current = getStoredJourney();
  const updated = { ...current, hasAirportTransfer: enabled };
  saveJourney(updated);
  return updated;
};

export const addExtraExperience = (extra: JourneyExtraExperience): JourneyState => {
  const current = getStoredJourney();
  const existing = current.extras || [];
  if (existing.some((e) => e.id === extra.id)) return current;
  
  const updated = {
    ...current,
    extras: [...existing, extra],
  };
  saveJourney(updated);
  return updated;
};

export const removeExtraExperience = (id: string): JourneyState => {
  const current = getStoredJourney();
  const updated = {
    ...current,
    extras: (current.extras || []).filter((e) => e.id !== id),
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
  const empty: JourneyState = {
    items: [],
    destinations: ["Marrakech"],
    travelDates: "",
    groupSize: "2 travelers",
    notes: "",
    accommodations: [],
    extras: [],
    hasAirportTransfer: false,
    destinationStays: [{ destination: "Marrakech", daysCount: 3 }],
  };
  saveJourney(empty);
  return empty;
};
