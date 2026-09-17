/**
 * SafarAtlas Product & Pricing System Data Models
 * 
 * CORE ARCHITECTURE:
 * 1. ESCAPES = Standalone modular experiences / day trips. Accommodation EXCLUDED.
 * 2. JOURNEYS = Coordinated multi-day trips. Accommodation + Transfers + Escapes + Extras.
 */

// ==========================================
// 1. PARTNER & COST CATALOG MODELS
// ==========================================

export type PartnerCategory = 
  | "Riad & Hotel"
  | "Transport & Chauffeur"
  | "Desert Camp"
  | "Mountain Guide"
  | "Local Experience"
  | "Restaurant & Catering";

export interface PartnerSupplier {
  id: string; // e.g. "SUP-01", "SUP-02"
  name: string;
  category: PartnerCategory;
  location: string;
  contactWhatsapp: string;
  rating: number;
  status: "Active" | "Probation" | "Inactive";
}

export type CostNature = "Fixed" | "Variable"; // Fixed (per vehicle/group) vs Variable (per person)

export interface CostComponent {
  id: string;
  name: string;
  category: "Accommodation" | "Transportation" | "Guides" | "Activities" | "Food" | "GuestService" | "PaymentOps";
  supplierId: string;
  nature: CostNature;
  netCostEur: number;
  netCostMad: number;
  unit: "per_vehicle" | "per_person" | "per_room_night" | "per_group" | "per_booking";
  notes?: string;
}

// ==========================================
// 2. ESCAPE DATA MODEL (Activity / Day Tour)
// Accommodation is explicitly EXCLUDED
// ==========================================

export interface EscapeModel {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  durationLabel: string; // e.g. "5.5h Evening", "1 Day", "8h Journey"
  destination: string; // e.g. "Marrakech", "Agafay", "High Atlas"
  category: "Desert" | "Mountain" | "Coast" | "Cultural" | "Food";
  
  // Accommodation status - explicitly false for standalone Escapes
  hasAccommodation: false;
  
  // Public Retail Pricing
  anchorPriceEur: number; // e.g. 95 (based on standard benchmark)
  
  // Visuals & Marketing
  image: string;
  badge?: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[]; // e.g. ["Hotel Accommodation", "Personal Expenses"]
  
  // Underlying Cost IDs (references Master Expense Catalog in OS)
  costComponentIds: string[];
}

// ==========================================
// 3. JOURNEY DATA MODEL (Coordinated Morocco Trip)
// Accommodation + Transport + Escapes + Extras
// ==========================================

export interface JourneyAccommodationSelection {
  destination: string;
  tier: "Boutique Riad" | "Luxury Riad" | "Desert Glamping" | "Mountain Lodge";
  nightsCount: number;
  roomCount: number;
  estimatedPricePerNightEur: number;
}

export interface JourneyTransportSelection {
  hasAirportTransfers: boolean;
  arrivalAirport?: string; // "RAK" | "CMN" | "AGA"
  hasIntercityPrivateVan: boolean;
}

export interface JourneyExtraExperience {
  id: string;
  title: string;
  priceEur: number;
  assignedDay?: number;
}

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
  assignedDay?: number | null;
  destinationContext?: string;
  addedAt: number;
}

export interface JourneyModel {
  id: string;
  title: string;
  destinations: string[]; // e.g. ["Marrakech", "High Atlas"]
  totalDays: number;
  travelDates?: string;
  groupSize: number; // 1, 2, 3, 4, 6...
  
  // Layer 1: Accommodation (Managed by SafarAtlas)
  accommodations: JourneyAccommodationSelection[];
  
  // Layer 2: Transport (Airport + Intercity Fleet)
  transport: JourneyTransportSelection;
  
  // Layer 3: Selected Escapes (Modular components)
  escapes: JourneyEscapeItem[];
  
  // Layer 4: Extras & Local Experiences
  extras: JourneyExtraExperience[];
  
  // Layer 5: Guest Support (Always included for SafarAtlas guests)
  guestCareIncluded: true; // 24/7 WhatsApp concierge + Medina meet & greet
  
  // Clean Calculated Customer Pricing
  totalEstimatedPriceEur: number;
  pricePerPersonEur: number;
  status: "Draft" | "Requested" | "Confirmed";
}

// ==========================================
// 4. BROWSER STORE & UI STATE
// Backward-compatible with existing journey components
// ==========================================

export interface JourneyState {
  items: JourneyEscapeItem[];
  destinations: string[];
  travelDates: string;
  groupSize: string;
  notes: string;
  // Enhanced Journey Layer Fields
  accommodations?: JourneyAccommodationSelection[];
  hasAirportTransfer?: boolean;
  extras?: JourneyExtraExperience[];
  destinationStays?: { destination: string; daysCount: number }[];
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