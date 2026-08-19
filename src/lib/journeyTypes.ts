export interface JourneyEscapeItem {
  id: string;
  slug: string;
  title: string;
  durationDays: number;
  durationNights: number;
  location: string;
  priceFromEur: number;
  image: string;
  badge?: string;
  addedAt: number;
}

export interface JourneyState {
  items: JourneyEscapeItem[];
  destinations: string[];
  travelDates: string;
  groupSize: string;
  notes: string;
}

export interface InternalCostItem {
  id: string;
  serviceCategory: "Transport" | "Driver" | "Accommodation" | "Desert Camp" | "Guide" | "Activity" | "Food";
  supplierName: string;
  netCostEur: number;
}

export interface ManagedJourneyQuote {
  journeyId: string;
  publicPriceEur: number;
  supplierNetCostsEur: number;
  safarAtlasMarginEur: number;
  marginPercentage: number;
  costItems: InternalCostItem[];
  status: "Draft" | "Quote Sent" | "Deposit Paid" | "Confirmed" | "Cancelled";
}
