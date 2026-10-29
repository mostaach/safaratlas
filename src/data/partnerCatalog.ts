/**
 * SafarAtlas Partner Catalog v1 (Supply Engine)
 * 
 * CORE ARCHITECTURE:
 * Partner -> Offerings -> Cost -> SafarAtlas Price -> Availability -> Location -> Requirements -> Seasonality -> Booking Method
 * 
 * Enables dynamic pricing:
 * Changing partner offering cost (e.g. 200 MAD -> 230 MAD) recalculates Escape / Journey unit economics automatically.
 */

export type SupplyCategory = 
  | "accommodation"
  | "transport"
  | "activities"
  | "food"
  | "guides"
  | "journey_support";

export type CostUnit = 
  | "per_person" 
  | "per_vehicle" 
  | "per_room_night" 
  | "per_tent_night" 
  | "per_group" 
  | "per_session" 
  | "per_day" 
  | "per_journey";

export interface PartnerOffering {
  offeringId: string;
  partnerId: string;
  partnerName: string;
  category: SupplyCategory;
  subCategory: string;
  title: string;
  deliverables: string[];
  partnerCostMad: number;
  partnerCostEur: number;
  costUnit: CostUnit;
  safarAtlasRetailEur: number;
  targetMarginPct: number;
  availability: string;
  location: string;
  requirements: string[];
  seasonality: string;
  bookingMethod: string;
  bookingSla: string;
  cancellationPolicy: string;
}

export interface PartnerProfile {
  partnerId: string;
  name: string;
  category: SupplyCategory;
  subCategory: string;
  region: "Marrakech" | "Agafay" | "High Atlas" | "Essaouira" | "Sahara";
  contactWhatsapp: string;
  rating: number;
  verificationStatus: "Verified" | "Contracted" | "Target";
  offeringsCount: number;
}

export interface EscapeSkuRecipe {
  escapeSku: string;
  title: string;
  publicAnchorEur: number;
  vipRetailEur: number;
  duration: string;
  location: string;
  offeringIds: string[];
  defaultPartySize: number;
}

// -------------------------------------------------------------
// 1. MASTER PARTNER PROFILES (REAL MOROCCAN OPERATORS)
// -------------------------------------------------------------
export const PARTNER_PROFILES: PartnerProfile[] = [
  // 1. ACCOMMODATION
  {
    partnerId: "SUP-ACC-01",
    name: "Riad Dar Ten Marrakech",
    category: "accommodation",
    subCategory: "Heritage Boutique Riad",
    region: "Marrakech",
    contactWhatsapp: "+212 665 678 901",
    rating: 4.85,
    verificationStatus: "Verified",
    offeringsCount: 3,
  },
  {
    partnerId: "SUP-ACC-02",
    name: "Agafay Desert Luxury Camp",
    category: "accommodation",
    subCategory: "Desert Luxury Glamping",
    region: "Agafay",
    contactWhatsapp: "+212 661 234 567",
    rating: 4.8,
    verificationStatus: "Verified",
    offeringsCount: 4,
  },
  {
    partnerId: "SUP-ACC-03",
    name: "Sahara Stars Luxury Desert Camp",
    category: "accommodation",
    subCategory: "Deep Dunes Glamping",
    region: "Sahara",
    contactWhatsapp: "+212 663 456 789",
    rating: 4.9,
    verificationStatus: "Verified",
    offeringsCount: 3,
  },
  {
    partnerId: "SUP-ACC-04",
    name: "Hotel Xaluca Dades",
    category: "accommodation",
    subCategory: "Panoramic Kasbah Hotel",
    region: "Sahara",
    contactWhatsapp: "+212 524 883 232",
    rating: 4.75,
    verificationStatus: "Contracted",
    offeringsCount: 2,
  },
  {
    partnerId: "SUP-ACC-05",
    name: "Dar Imlil Mountain Lodge",
    category: "accommodation",
    subCategory: "Traditional Mountain Guesthouse",
    region: "High Atlas",
    contactWhatsapp: "+212 661 889 012",
    rating: 4.85,
    verificationStatus: "Verified",
    offeringsCount: 2,
  },
  {
    partnerId: "SUP-ACC-06",
    name: "Villa Maroc Essaouira",
    category: "accommodation",
    subCategory: "Historic Rampart Riad",
    region: "Essaouira",
    contactWhatsapp: "+212 524 476 147",
    rating: 4.8,
    verificationStatus: "Contracted",
    offeringsCount: 2,
  },

  // 2. TRANSPORT
  {
    partnerId: "SUP-TRN-01",
    name: "Atlas VIP Transport",
    category: "transport",
    subCategory: "Licensed Chauffeur Fleet (Mercedes Vito/V-Class)",
    region: "Marrakech",
    contactWhatsapp: "+212 662 345 678",
    rating: 4.95,
    verificationStatus: "Verified",
    offeringsCount: 6,
  },
  {
    partnerId: "SUP-TRN-02",
    name: "Sahara Expedition 4x4 Fleet",
    category: "transport",
    subCategory: "Toyota Land Cruiser Prado 4x4 Fleet",
    region: "Sahara",
    contactWhatsapp: "+212 661 992 345",
    rating: 4.9,
    verificationStatus: "Verified",
    offeringsCount: 2,
  },
  {
    partnerId: "SUP-TRN-03",
    name: "Morocco Drive Direct",
    category: "transport",
    subCategory: "Self-Drive SUV & 4x4 Rental",
    region: "Marrakech",
    contactWhatsapp: "+212 660 123 456",
    rating: 4.7,
    verificationStatus: "Contracted",
    offeringsCount: 1,
  },

  // 3. ACTIVITIES
  {
    partnerId: "SUP-ACT-01",
    name: "Agafay Desert Trails",
    category: "activities",
    subCategory: "Quad, Buggy & Sunset Camels",
    region: "Agafay",
    contactWhatsapp: "+212 661 234 567",
    rating: 4.85,
    verificationStatus: "Verified",
    offeringsCount: 4,
  },
  {
    partnerId: "SUP-ACT-02",
    name: "La Maison Arabe Cooking Academy",
    category: "activities",
    subCategory: "Moroccan Culinary Masterclasses",
    region: "Marrakech",
    contactWhatsapp: "+212 524 387 010",
    rating: 4.9,
    verificationStatus: "Contracted",
    offeringsCount: 1,
  },
  {
    partnerId: "SUP-ACT-03",
    name: "Les Bains de Marrakech",
    category: "activities",
    subCategory: "Luxury Traditional Hammam & Spa",
    region: "Marrakech",
    contactWhatsapp: "+212 524 381 428",
    rating: 4.9,
    verificationStatus: "Verified",
    offeringsCount: 2,
  },
  {
    partnerId: "SUP-ACT-04",
    name: "Ciel d'Afrique Hot-Air Balloons",
    category: "activities",
    subCategory: "Sunrise Hot-Air Balloon Flights",
    region: "Marrakech",
    contactWhatsapp: "+212 524 432 843",
    rating: 4.95,
    verificationStatus: "Contracted",
    offeringsCount: 1,
  },
  {
    partnerId: "SUP-ACT-05",
    name: "Ranch de Diabat Essaouira",
    category: "activities",
    subCategory: "Coastal Barb-Arabian Horse Treks",
    region: "Essaouira",
    contactWhatsapp: "+212 662 789 012",
    rating: 4.8,
    verificationStatus: "Verified",
    offeringsCount: 1,
  },

  // 4. FOOD & HOSPITALITY
  {
    partnerId: "SUP-FOD-01",
    name: "Agafay Campfire Gastronomy",
    category: "food",
    subCategory: "Desert Bonfire & Gnawa Dining",
    region: "Agafay",
    contactWhatsapp: "+212 661 234 567",
    rating: 4.85,
    verificationStatus: "Verified",
    offeringsCount: 2,
  },
  {
    partnerId: "SUP-FOD-02",
    name: "Imlil Village Family Hosts (Armed)",
    category: "food",
    subCategory: "Authentic Home Berber Lunches",
    region: "High Atlas",
    contactWhatsapp: "+212 664 567 890",
    rating: 4.95,
    verificationStatus: "Verified",
    offeringsCount: 1,
  },
  {
    partnerId: "SUP-FOD-03",
    name: "Nomad Rooftop Marrakech",
    category: "food",
    subCategory: "Modern Moroccan Medina Dining",
    region: "Marrakech",
    contactWhatsapp: "+212 524 381 609",
    rating: 4.8,
    verificationStatus: "Contracted",
    offeringsCount: 1,
  },
  {
    partnerId: "SUP-FOD-04",
    name: "Essaouira Port Stall #5",
    category: "food",
    subCategory: "Fresh Atlantic Seafood Platter",
    region: "Essaouira",
    contactWhatsapp: "+212 661 334 455",
    rating: 4.7,
    verificationStatus: "Verified",
    offeringsCount: 1,
  },

  // 5. GUIDES & SPECIALISTS
  {
    partnerId: "SUP-GDE-01",
    name: "Association des Guides Marrakech",
    category: "guides",
    subCategory: "Official Licensed Medina Heritage Guides",
    region: "Marrakech",
    contactWhatsapp: "+212 661 445 566",
    rating: 4.9,
    verificationStatus: "Verified",
    offeringsCount: 2,
  },
  {
    partnerId: "SUP-GDE-02",
    name: "Bureau des Guides d'Imlil",
    category: "guides",
    subCategory: "Certified High Atlas Mountain Guides",
    region: "High Atlas",
    contactWhatsapp: "+212 664 567 890",
    rating: 4.95,
    verificationStatus: "Verified",
    offeringsCount: 2,
  },
  {
    partnerId: "SUP-GDE-03",
    name: "Atlas Portrait Artists",
    category: "guides",
    subCategory: "Cinematic Travel Photographers",
    region: "Marrakech",
    contactWhatsapp: "+212 667 890 123",
    rating: 4.85,
    verificationStatus: "Contracted",
    offeringsCount: 1,
  },

  // 6. JOURNEY SUPPORT
  {
    partnerId: "SUP-SPT-01",
    name: "Medina Porters Guild & Station",
    category: "journey_support",
    subCategory: "Arrival Handcart & Luggage Logistics",
    region: "Marrakech",
    contactWhatsapp: "+212 662 112 233",
    rating: 4.8,
    verificationStatus: "Verified",
    offeringsCount: 1,
  },
  {
    partnerId: "SUP-SPT-02",
    name: "Morocco eSIM Direct",
    category: "journey_support",
    subCategory: "Pre-Activated 4G/5G Connectivity",
    region: "Marrakech",
    contactWhatsapp: "+212 698 017 323",
    rating: 4.9,
    verificationStatus: "Verified",
    offeringsCount: 1,
  },
  {
    partnerId: "SUP-SPT-03",
    name: "SafarAtlas Journey Concierge HQ",
    category: "journey_support",
    subCategory: "24/7 Human WhatsApp Concierge Desk",
    region: "Marrakech",
    contactWhatsapp: "+212 698 017 323",
    rating: 5.0,
    verificationStatus: "Verified",
    offeringsCount: 2,
  },
  {
    partnerId: "SUP-SPT-04",
    name: "SOS Médecins Maroc / Clinique Internationale",
    category: "journey_support",
    subCategory: "On-Call English Doctor & Priority Clinic",
    region: "Marrakech",
    contactWhatsapp: "+212 522 989 898",
    rating: 4.9,
    verificationStatus: "Verified",
    offeringsCount: 1,
  },
];

// -------------------------------------------------------------
// 2. MASTER OFFERINGS CATALOG (WHAT EACH PARTNER CAN SUPPLY)
// -------------------------------------------------------------
export const PARTNER_OFFERINGS: PartnerOffering[] = [
  // 1. ACCOMMODATION
  {
    offeringId: "OFF-ACC-RAK-01",
    partnerId: "SUP-ACC-01",
    partnerName: "Riad Dar Ten Marrakech",
    category: "accommodation",
    subCategory: "Boutique Riad",
    title: "Deluxe Courtyard Double Room + Organic Moroccan Breakfast",
    deliverables: ["Courtyard double en-suite room", "Daily organic Moroccan breakfast", "Welcome mint tea & pastries", "Tourist taxes included"],
    partnerCostMad: 700,
    partnerCostEur: 65,
    costUnit: "per_room_night",
    safarAtlasRetailEur: 110,
    targetMarginPct: 40.9,
    availability: "Daily; check-in 14:00, check-out 11:30; 6 rooms total",
    location: "Marrakech Medina (Bab Doukkala)",
    requirements: ["Double occupancy max (2 adults + 1 infant)"],
    seasonality: "Year-round (High: Oct–May; Low: Jul–Aug -15%; Peak NYE: +25%)",
    bookingMethod: "Direct WhatsApp with Riad Manager",
    bookingSla: "2-hour response SLA",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
  },
  {
    offeringId: "OFF-ACC-AGF-01",
    partnerId: "SUP-ACC-02",
    partnerName: "Agafay Desert Luxury Camp",
    category: "accommodation",
    subCategory: "Desert Camp",
    title: "Deluxe Berber Tented Suite + Ensuite Bath + Half-Board",
    deliverables: ["King canvas tent with ensuite flush toilet & hot shower", "3-course candlelit dinner", "Berber sunrise breakfast", "Campfire access"],
    partnerCostMad: 1200,
    partnerCostEur: 111,
    costUnit: "per_tent_night",
    safarAtlasRetailEur: 195,
    targetMarginPct: 43.1,
    availability: "Daily; 18 tents capacity; check-in by 18:00 for sunset",
    location: "Agafay Desert (Southern Dune Zone, 42km from Marrakech)",
    requirements: ["Advance dinner preference (meat/chicken/veg)"],
    seasonality: "Year-round (solar winter heating, mist fans in summer)",
    bookingMethod: "Direct WhatsApp dispatch to Camp Coordinator",
    bookingSla: "2-hour SLA",
    cancellationPolicy: "Free cancellation up to 48 hours prior",
  },
  {
    offeringId: "OFF-ACC-MER-01",
    partnerId: "SUP-ACC-03",
    partnerName: "Sahara Stars Luxury Desert Camp",
    category: "accommodation",
    subCategory: "Sahara Glamping",
    title: "Royal Nomad Glamping Tent + Ensuite Hot Shower + Half-Board",
    deliverables: ["Luxury insulated canvas suite", "Ensuite hot shower & private flush toilet", "Gourmet 3-course dinner", "Berber breakfast", "Campfire drumming"],
    partnerCostMad: 1400,
    partnerCostEur: 130,
    costUnit: "per_tent_night",
    safarAtlasRetailEur: 220,
    targetMarginPct: 40.9,
    availability: "Daily during season; 12 luxury tents in deep dunes",
    location: "Erg Chebbi Dunes, Merzouga",
    requirements: ["Arrival before sunset; 4x4 or camel shuttle access"],
    seasonality: "September 15 – May 31 (Closed July–August for extreme heat)",
    bookingMethod: "WhatsApp to Camp Director",
    bookingSla: "4-hour SLA",
    cancellationPolicy: "Free cancellation up to 72 hours prior",
  },
  {
    offeringId: "OFF-ACC-DAD-01",
    partnerId: "SUP-ACC-04",
    partnerName: "Hotel Xaluca Dades",
    category: "accommodation",
    subCategory: "Kasbah Hotel",
    title: "Panoramic Canyon Room + Half-Board (Dinner & Breakfast Buffet)",
    deliverables: ["Superior room with canyon view", "Dinner buffet", "Breakfast buffet", "Pool and rooftop stargazing deck"],
    partnerCostMad: 650,
    partnerCostEur: 60,
    costUnit: "per_room_night",
    safarAtlasRetailEur: 105,
    targetMarginPct: 42.9,
    availability: "Daily; 40 rooms; group-friendly",
    location: "Boumalne Dades (Gorges du Dadès)",
    requirements: ["Staging stop on Night 1 of 3-Day Sahara Tour"],
    seasonality: "Year-round",
    bookingMethod: "WhatsApp / Email to Reservations",
    bookingSla: "12-hour SLA",
    cancellationPolicy: "Free cancellation up to 7 days prior",
  },
  {
    offeringId: "OFF-ACC-IML-01",
    partnerId: "SUP-ACC-05",
    partnerName: "Dar Imlil Mountain Lodge",
    category: "accommodation",
    subCategory: "Mountain Lodge",
    title: "Traditional Walnut Valley Room + Fireplace + Mountain Half-Board",
    deliverables: ["En-suite room overlooking Mount Toubkal valley", "Wood stove heating", "Home-cooked dinner tagine", "Hearty mountain breakfast"],
    partnerCostMad: 600,
    partnerCostEur: 55,
    costUnit: "per_room_night",
    safarAtlasRetailEur: 95,
    targetMarginPct: 42.1,
    availability: "Daily; 8 rooms total",
    location: "Imlil Village (High Atlas Foothills, 1,740m)",
    requirements: ["Mule luggage transfer from road required"],
    seasonality: "Year-round (Warm wood fire in winter)",
    bookingMethod: "WhatsApp to local owner",
    bookingSla: "2-hour SLA",
    cancellationPolicy: "Free cancellation up to 24 hours prior",
  },
  {
    offeringId: "OFF-ACC-ESS-01",
    partnerId: "SUP-ACC-06",
    partnerName: "Villa Maroc Essaouira",
    category: "accommodation",
    subCategory: "Heritage Riad",
    title: "Historic Sea-Breeze Room + Rooftop Atlantic Breakfast",
    deliverables: ["Historic riad bedroom with cedarwood decor", "Rooftop terrace breakfast", "Proximity to Skala ramparts"],
    partnerCostMad: 750,
    partnerCostEur: 70,
    costUnit: "per_room_night",
    safarAtlasRetailEur: 125,
    targetMarginPct: 44.0,
    availability: "Daily; 14 rooms",
    location: "Essaouira Medina (near Bab El Minzah)",
    requirements: ["Car-free medina; porter coordinates luggage"],
    seasonality: "Year-round",
    bookingMethod: "WhatsApp / Email to front desk",
    bookingSla: "4-hour SLA",
    cancellationPolicy: "Free cancellation up to 48 hours prior",
  },

  // 2. TRANSPORT
  {
    offeringId: "OFF-TRN-RAK-APT",
    partnerId: "SUP-TRN-01",
    partnerName: "Atlas VIP Transport",
    category: "transport",
    subCategory: "Private Airport Transfer",
    title: "Marrakech Airport (RAK) ↔ Medina / Palmeraie Private Transfer",
    deliverables: ["Private Mercedes Vito (up to 6 pax)", "Bilingual chauffeur", "Curbside Meet & Greet with tablet nameboard", "60-min flight delay buffer"],
    partnerCostMad: 220,
    partnerCostEur: 20,
    costUnit: "per_vehicle",
    safarAtlasRetailEur: 35,
    targetMarginPct: 42.9,
    availability: "24/7 synchronized with live flight radar",
    location: "Marrakech Menara Airport (RAK)",
    requirements: ["Flight number and estimated arrival time"],
    seasonality: "Year-round (+MAD 100 night surcharge 22:00-06:00)",
    bookingMethod: "Direct WhatsApp with dispatch manager",
    bookingSla: "1-hour SLA; instant driver assign",
    cancellationPolicy: "Free cancellation up to 3 hours prior",
  },
  {
    offeringId: "OFF-TRN-AGF-RT",
    partnerId: "SUP-TRN-01",
    partnerName: "Atlas VIP Transport",
    category: "transport",
    subCategory: "Excursion Roundtrip",
    title: "Marrakech ↔ Agafay Desert Roundtrip + 5h On-Site Driver Wait",
    deliverables: ["Private AC Mercedes Vito (up to 6 pax)", "Door-to-door hotel/riad pickup", "Driver remains on-site during dinner/activities", "Safe return transit"],
    partnerCostMad: 700,
    partnerCostEur: 65,
    costUnit: "per_vehicle",
    safarAtlasRetailEur: 110,
    targetMarginPct: 40.9,
    availability: "Daily departures 16:30; return 22:30",
    location: "Marrakech ↔ Agafay Desert (45 min each way)",
    requirements: ["Confirmed pickup point (hotel lobby or Medina gate)"],
    seasonality: "Year-round",
    bookingMethod: "WhatsApp dispatch",
    bookingSla: "Same-day accepted before 13:00",
    cancellationPolicy: "Free cancellation up to 6 hours prior",
  },
  {
    offeringId: "OFF-TRN-ESS-RT",
    partnerId: "SUP-TRN-01",
    partnerName: "Atlas VIP Transport",
    category: "transport",
    subCategory: "Excursion Roundtrip",
    title: "Marrakech ↔ Essaouira Coastal Day Excursion (10h Dedicated Chauffeur)",
    deliverables: ["Dedicated Mercedes Vito for 10 hours", "Scenic stop at Argan tree viewpoint", "Cooperative visit", "Flexible city drop-off"],
    partnerCostMad: 1400,
    partnerCostEur: 130,
    costUnit: "per_vehicle",
    safarAtlasRetailEur: 210,
    targetMarginPct: 38.1,
    availability: "Daily 08:30 departure, return 19:00",
    location: "Marrakech ↔ Essaouira (175km highway)",
    requirements: ["Max 6 passengers per van"],
    seasonality: "Year-round",
    bookingMethod: "WhatsApp dispatch",
    bookingSla: "12-hour SLA",
    cancellationPolicy: "Free cancellation up to 12 hours prior",
  },
  {
    offeringId: "OFF-TRN-IML-RT",
    partnerId: "SUP-TRN-01",
    partnerName: "Atlas VIP Transport",
    category: "transport",
    subCategory: "Excursion Roundtrip",
    title: "Marrakech ↔ Imlil High Atlas Roundtrip (8h Mountain Driver)",
    deliverables: ["Dedicated Mercedes Vito for 8 hours", "Mountain-certified driver", "Stops at Asni and Moulay Brahim gorges", "Imlil trailhead drop-off"],
    partnerCostMad: 800,
    partnerCostEur: 74,
    costUnit: "per_vehicle",
    safarAtlasRetailEur: 130,
    targetMarginPct: 43.1,
    availability: "Daily 09:00 departure, return 17:30",
    location: "Marrakech ↔ Imlil High Atlas (65km)",
    requirements: ["Snow chains equipped during winter"],
    seasonality: "Year-round",
    bookingMethod: "WhatsApp dispatch",
    bookingSla: "6-hour SLA",
    cancellationPolicy: "Free cancellation up to 12 hours prior",
  },
  {
    offeringId: "OFF-TRN-SAH-3D",
    partnerId: "SUP-TRN-02",
    partnerName: "Sahara Expedition 4x4 Fleet",
    category: "transport",
    subCategory: "Multi-Day 4x4 Circuit",
    title: "3-Day Sahara Circuit (Marrakech-Dades-Merzouga-Marrakech)",
    deliverables: ["Toyota Land Cruiser Prado 4x4 for 3 full days", "Desert-specialist bilingual driver", "All fuel, road tolls, and parking", "Driver lodging and meals included"],
    partnerCostMad: 3800,
    partnerCostEur: 352,
    costUnit: "per_vehicle",
    safarAtlasRetailEur: 580,
    targetMarginPct: 39.3,
    availability: "Departures every Monday, Wednesday, Friday or private on demand",
    location: "Marrakech → Tizi n'Tichka → Dades → Merzouga → Draa Valley → Marrakech",
    requirements: ["Max 4-5 guests per vehicle for comfort"],
    seasonality: "September – May recommended",
    bookingMethod: "WhatsApp to Fleet Coordinator",
    bookingSla: "24-hour advance",
    cancellationPolicy: "Free cancellation up to 7 days prior",
  },

  // 3. ACTIVITIES & EXPERIENCES
  {
    offeringId: "OFF-ACT-QUAD-1H",
    partnerId: "SUP-ACT-01",
    partnerName: "Agafay Desert Trails",
    category: "activities",
    subCategory: "Desert Quad Bike",
    title: "1-Hour Guided Quad Bike Trail across Stone Dunes",
    deliverables: ["Yamaha 450cc quad bike (2 pax per quad)", "Professional lead guide and mechanical backup", "Sanitized helmet, goggles, and dust bandana", "Mint tea rest break"],
    partnerCostMad: 200,
    partnerCostEur: 18.5,
    costUnit: "per_person",
    safarAtlasRetailEur: 40,
    targetMarginPct: 53.8,
    availability: "Daily slots: 10:00, 15:00, 17:30 (sunset)",
    location: "Agafay Desert plateau trails",
    requirements: ["Min age 16 to drive; closed shoes required"],
    seasonality: "Year-round (Sunset slot shifts to 18:30 in summer)",
    bookingMethod: "WhatsApp dispatch",
    bookingSla: "Same-day confirmed before 13:00",
    cancellationPolicy: "Free cancellation up to 24 hours prior",
  },
  {
    offeringId: "OFF-ACT-CAMEL-AGF",
    partnerId: "SUP-ACT-01",
    partnerName: "Agafay Desert Trails",
    category: "activities",
    subCategory: "Camel Trek",
    title: "20-Minute Sunset Camel Trek in Nomad Attire",
    deliverables: ["Well-cared-for camel with traditional saddle", "Local Amazigh camelier escort", "Traditional blue nomad cheche headscarf", "Sunset photo stops"],
    partnerCostMad: 80,
    partnerCostEur: 7.5,
    costUnit: "per_person",
    safarAtlasRetailEur: 20,
    targetMarginPct: 62.5,
    availability: "Daily 17:30 - 19:30 (Golden hour)",
    location: "Agafay Desert Sunset Ridge",
    requirements: ["Max weight 110kg; comfortable trousers recommended"],
    seasonality: "Year-round",
    bookingMethod: "WhatsApp dispatch",
    bookingSla: "2-hour SLA",
    cancellationPolicy: "Free cancellation up to 4 hours prior",
  },
  {
    offeringId: "OFF-ACT-CAMEL-MER",
    partnerId: "SUP-ACC-03",
    partnerName: "Sahara Stars Luxury Desert Camp",
    category: "activities",
    subCategory: "Camel Caravan",
    title: "Erg Chebbi 1-Hour Sunset Camel Caravan to High Dunes",
    deliverables: ["Camel caravan trek into 150m high dunes", "Nomad camelier guide", "Sandboarding board included", "Sunset viewing on dune summit"],
    partnerCostMad: 150,
    partnerCostEur: 14,
    costUnit: "per_person",
    safarAtlasRetailEur: 35,
    targetMarginPct: 60.0,
    availability: "Daily at 17:00 (winter) / 18:30 (spring/autumn)",
    location: "Erg Chebbi Dunes, Merzouga",
    requirements: ["Included in Sahara 3-Day Expedition"],
    seasonality: "Sept 15 – May 31",
    bookingMethod: "Bundled with Camp stay",
    bookingSla: "Part of expedition itinerary",
    cancellationPolicy: "Covered by tour policy",
  },
  {
    offeringId: "OFF-ACT-COOK-MED",
    partnerId: "SUP-ACT-02",
    partnerName: "La Maison Arabe Cooking Academy",
    category: "activities",
    subCategory: "Culinary Workshop",
    title: "3.5-Hour Moroccan Gastronomy Masterclass with Chef",
    deliverables: ["Guided spice market tour", "Hands-on preparation of tagine and pastilla", "Traditional bread baking", "Communal lunch with Moroccan wine and tea", "Recipe booklet"],
    partnerCostMad: 400,
    partnerCostEur: 37,
    costUnit: "per_person",
    safarAtlasRetailEur: 75,
    targetMarginPct: 50.7,
    availability: "Daily 10:00 - 13:30; Max 10 pax per workshop",
    location: "Marrakech Medina atelier",
    requirements: ["Food allergies communicated 24h prior"],
    seasonality: "Year-round (Air-conditioned indoor kitchen)",
    bookingMethod: "WhatsApp / Email to Academy desk",
    bookingSla: "24-hour advance booking required",
    cancellationPolicy: "Free cancellation up to 48 hours prior",
  },
  {
    offeringId: "OFF-ACT-HAM-ROY",
    partnerId: "SUP-ACT-03",
    partnerName: "Les Bains de Marrakech",
    category: "activities",
    subCategory: "Hammam & Spa",
    title: "90-Min Royal Ritual: Black Soap Scrub + Clay Mask + Argan Massage",
    deliverables: ["Private marble steam room", "Eucalyptus black soap body scrub with kessa glove", "Ghassoul mineral clay body wrap", "45-min pure organic argan oil massage"],
    partnerCostMad: 450,
    partnerCostEur: 42,
    costUnit: "per_person",
    safarAtlasRetailEur: 85,
    targetMarginPct: 50.6,
    availability: "Daily 10:00 - 20:00; private cabins",
    location: "Marrakech Medina (Bab Agnaou)",
    requirements: ["Bath linens, slippers, and disposable apparel provided"],
    seasonality: "Year-round",
    bookingMethod: "WhatsApp reservation desk",
    bookingSla: "24-hour advance",
    cancellationPolicy: "Free cancellation up to 24 hours prior",
  },
  {
    offeringId: "OFF-ACT-BALLOON",
    partnerId: "SUP-ACT-04",
    partnerName: "Ciel d'Afrique Hot-Air Balloons",
    category: "activities",
    subCategory: "Hot-Air Balloon",
    title: "VIP Sunrise Hot-Air Balloon Flight + Caidal Tent Breakfast",
    deliverables: ["4x4 hotel pickup at 05:30", "1-hour flight over High Atlas foothills and desert canyons", "Fresh Berber breakfast in luxury Caidal tent", "Personalized flight certificate"],
    partnerCostMad: 1400,
    partnerCostEur: 130,
    costUnit: "per_person",
    safarAtlasRetailEur: 210,
    targetMarginPct: 38.1,
    availability: "Daily at sunrise (weather permitting)",
    location: "North Marrakech desert plateau",
    requirements: ["Min age 5; warm morning layer recommended"],
    seasonality: "Year-round (Subject to wind conditions; instant reschedule)",
    bookingMethod: "Direct API / WhatsApp",
    bookingSla: "48-hour advance",
    cancellationPolicy: "Free reschedule or full refund if cancelled by pilot for weather",
  },

  // 4. FOOD & HOSPITALITY
  {
    offeringId: "OFF-FOD-AGF-DIN",
    partnerId: "SUP-FOD-01",
    partnerName: "Agafay Campfire Gastronomy",
    category: "food",
    subCategory: "Camp Dining",
    title: "3-Course Gourmet Tagine Dinner + Fire Show & Live Gnawa Music",
    deliverables: ["Selection of 5 fresh Moroccan cooked salads", "Slow-cooked lemon chicken tagine or lamb prune tagine", "Seasonal fruit and almond pastilla", "Live Gnawa acoustic performance", "Fire show spectacle around central bonfire"],
    partnerCostMad: 270,
    partnerCostEur: 25,
    costUnit: "per_person",
    safarAtlasRetailEur: 55,
    targetMarginPct: 54.5,
    availability: "Daily 20:00 - 22:30",
    location: "Agafay Desert main firepit",
    requirements: ["Vegetarian, vegan, and gluten-free accommodated"],
    seasonality: "Year-round (Heated tent dining in winter)",
    bookingMethod: "WhatsApp to F&B Manager",
    bookingSla: "Same-day confirmed before 15:00",
    cancellationPolicy: "Free cancellation up to 6 hours prior",
  },
  {
    offeringId: "OFF-FOD-AGF-TEA",
    partnerId: "SUP-FOD-01",
    partnerName: "Agafay Campfire Gastronomy",
    category: "food",
    subCategory: "Hospitality Protocol",
    title: "Sunset Mint Tea Ceremony with Almond Cornes de Gazelle",
    deliverables: ["Traditional Moroccan mint tea poured from high silver pot", "Handcrafted almond pastries (Cornes de gazelle, briouats)", "Orange blossom water hand rinse ritual"],
    partnerCostMad: 50,
    partnerCostEur: 4.6,
    costUnit: "per_person",
    safarAtlasRetailEur: 15,
    targetMarginPct: 69.3,
    availability: "Daily 17:30 - 18:30 on camp arrival",
    location: "Agafay Desert sunset terrace",
    requirements: ["Included in all SafarAtlas VIP Desert Escapes"],
    seasonality: "Year-round",
    bookingMethod: "Included in Escape package",
    bookingSla: "Auto-coordinated with transport",
    cancellationPolicy: "Covered by tour policy",
  },
  {
    offeringId: "OFF-FOD-IML-HOM",
    partnerId: "SUP-FOD-02",
    partnerName: "Imlil Village Family Hosts (Armed)",
    category: "food",
    subCategory: "Home Cooking",
    title: "Home-Cooked Berber Family Lunch in Armed Village",
    deliverables: ["Fresh bread baked in clay wood stove", "Mountain walnut and apple salad", "Slow-simmered organic beef or vegetable tagine", "Continuous mint tea with mountain thyme"],
    partnerCostMad: 130,
    partnerCostEur: 12,
    costUnit: "per_person",
    safarAtlasRetailEur: 28,
    targetMarginPct: 57.1,
    availability: "Daily 12:30 - 14:30",
    location: "Armed Village (1,900m elevation, Imlil Valley)",
    requirements: ["Shoes removed upon entering traditional home"],
    seasonality: "Year-round",
    bookingMethod: "WhatsApp to Guide Bureau Coordinator",
    bookingSla: "6-hour advance",
    cancellationPolicy: "Free cancellation up to 12 hours prior",
  },
  {
    offeringId: "OFF-FOD-ESS-SEA",
    partnerId: "SUP-FOD-04",
    partnerName: "Essaouira Port Stall #5",
    category: "food",
    subCategory: "Portside Restaurant",
    title: "Fresh Atlantic Seafood Platter: Sea Bass, Calamari & Moroccan Salads",
    deliverables: ["Catch of the day grilled to order over charcoal", "Grilled calamari and sardines", "Fresh tomato-cumin salads and fries", "Mineral water and mint tea"],
    partnerCostMad: 150,
    partnerCostEur: 14,
    costUnit: "per_person",
    safarAtlasRetailEur: 32,
    targetMarginPct: 56.3,
    availability: "Daily 12:00 - 16:00",
    location: "Essaouira Fishing Port, Stall #5",
    requirements: ["Fresh daily catch depending on ocean weather"],
    seasonality: "Year-round",
    bookingMethod: "Driver reserves table on highway approach",
    bookingSla: "1-hour notice",
    cancellationPolicy: "No fee",
  },

  // 5. GUIDES & SPECIALISTS
  {
    offeringId: "OFF-GDE-MED-HALF",
    partnerId: "SUP-GDE-01",
    partnerName: "Association des Guides Marrakech",
    category: "guides",
    subCategory: "Licensed Medina Guide",
    title: "3.5-Hour Private Medina Heritage Tour (English/French/Spanish)",
    deliverables: ["Official Ministry of Tourism badge holder", "Exploration of Bahia Palace, Jewish Mellah, and Secret Souks", "Cultural and architectural commentary", "No forced shopping guarantee"],
    partnerCostMad: 380,
    partnerCostEur: 35,
    costUnit: "per_group",
    safarAtlasRetailEur: 70,
    targetMarginPct: 50.0,
    availability: "Daily 09:30 & 14:30; up to 8 guests per guide",
    location: "Marrakech Medina (Riad door pickup)",
    requirements: ["Monument entry tickets paid locally (MAD 70/site)"],
    seasonality: "Year-round (Morning preferred in summer)",
    bookingMethod: "WhatsApp dispatch",
    bookingSla: "12-hour advance",
    cancellationPolicy: "Free cancellation up to 24 hours prior",
  },
  {
    offeringId: "OFF-GDE-ATL-DAY",
    partnerId: "SUP-GDE-02",
    partnerName: "Bureau des Guides d'Imlil",
    category: "guides",
    subCategory: "Certified Mountain Guide",
    title: "Full-Day High Atlas Valley Trekking Guide (6–7 Hours)",
    deliverables: ["UIAGM / Ministry certified mountain guide", "Trek through Armed, Tamatert walnut groves, and passes", "First-aid trained; carrying emergency kit", "Bilingual Amazigh/French/English"],
    partnerCostMad: 320,
    partnerCostEur: 30,
    costUnit: "per_group",
    safarAtlasRetailEur: 65,
    targetMarginPct: 53.8,
    availability: "Daily 09:00 - 16:30; up to 10 guests per guide",
    location: "Imlil Valley & High Atlas trails",
    requirements: ["Sturdy walking shoes or hiking boots"],
    seasonality: "Year-round (Adjusted route during winter snowfall)",
    bookingMethod: "WhatsApp to Guide Bureau Coordinator",
    bookingSla: "12-hour advance",
    cancellationPolicy: "Free cancellation up to 12 hours prior",
  },
  {
    offeringId: "OFF-GDE-PHOTO-2H",
    partnerId: "SUP-GDE-03",
    partnerName: "Atlas Portrait Artists",
    category: "guides",
    subCategory: "Photographer",
    title: "2-Hour Cinematic Travel Photo & Video Session (50 Edited Photos + 3 Reels)",
    deliverables: ["Professional editorial photographer with Sony Alpha gear", "50 high-res color-graded digital photographs", "3 short vertical video reels for social sharing", "Delivery via cloud gallery in 48 hours"],
    partnerCostMad: 900,
    partnerCostEur: 83,
    costUnit: "per_session",
    safarAtlasRetailEur: 160,
    targetMarginPct: 48.1,
    availability: "Golden hour slots: 07:30 or 17:30",
    location: "Marrakech Medina or Agafay Desert sunset ridge",
    requirements: ["Max 4 people in party"],
    seasonality: "Year-round",
    bookingMethod: "WhatsApp with Photographer",
    bookingSla: "48-hour advance",
    cancellationPolicy: "Free cancellation up to 48 hours prior",
  },

  // 6. JOURNEY SUPPORT
  {
    offeringId: "OFF-SPT-MEET-MED",
    partnerId: "SUP-SPT-01",
    partnerName: "Medina Porters Guild & Station",
    category: "journey_support",
    subCategory: "Luggage & Meet Protocol",
    title: "Medina Arrival VIP Protocol: Chauffeur to Porter Handcart Transfer",
    deliverables: ["Seamless handoff from private Mercedes van to dedicated Medina porter", "Luggage transported via traditional two-wheel handcart to riad door", "Personal escort navigating car-free alleys"],
    partnerCostMad: 80,
    partnerCostEur: 7.5,
    costUnit: "per_journey",
    safarAtlasRetailEur: 18,
    targetMarginPct: 58.3,
    availability: "24/7 synchronized with vehicle arrival",
    location: "Bab Doukkala, Bab Aylen, or Place des Ferblantiers",
    requirements: ["Included in all SafarAtlas Managed Journeys"],
    seasonality: "Year-round",
    bookingMethod: "Driver WhatsApp notification 15m prior to gate",
    bookingSla: "Immediate on gate arrival",
    cancellationPolicy: "Covered by Journey policy",
  },
  {
    offeringId: "OFF-SPT-ESIM-10G",
    partnerId: "SUP-SPT-02",
    partnerName: "Morocco eSIM Direct",
    category: "journey_support",
    subCategory: "High-Speed Connectivity",
    title: "Instant 10GB High-Speed 4G/5G Morocco eSIM Profile (30 Days)",
    deliverables: ["10GB data on Orange / Inwi premier network", "Instant digital QR activation sent via WhatsApp & email", "Valid nationwide (Medina, Atlas, Desert towns)", "Hotspot tethering enabled"],
    partnerCostMad: 80,
    partnerCostEur: 7.5,
    costUnit: "per_person",
    safarAtlasRetailEur: 19,
    targetMarginPct: 60.5,
    availability: "Instant digital delivery",
    location: "Nationwide Morocco",
    requirements: ["eSIM-compatible smartphone"],
    seasonality: "Year-round",
    bookingMethod: "Automated issuance 24h prior to flight",
    bookingSla: "Instant automated delivery",
    cancellationPolicy: "Full refund if unactivated prior to travel",
  },
  {
    offeringId: "OFF-SPT-CONCIERGE",
    partnerId: "SUP-SPT-03",
    partnerName: "SafarAtlas Journey Concierge HQ",
    category: "journey_support",
    subCategory: "Concierge Operations",
    title: "24/7 Dedicated Human WhatsApp Concierge Desk (Per Day of Stay)",
    deliverables: ["Dedicated bilingual operations concierge on WhatsApp", "VIP table bookings at top medina venues", "Real-time route adjustments and weather advice", "Immediate coordination with drivers and riad hosts"],
    partnerCostMad: 100,
    partnerCostEur: 9.25,
    costUnit: "per_day",
    safarAtlasRetailEur: 20,
    targetMarginPct: 53.8,
    availability: "08:00 - 23:00 proactive concierge + 24/7 emergency line",
    location: "All Morocco travel corridors",
    requirements: ["Standard inclusion for all SafarAtlas Journey guests"],
    seasonality: "Year-round",
    bookingMethod: "Auto-activated on booking confirmation",
    bookingSla: "Average WhatsApp response < 8 minutes",
    cancellationPolicy: "Covered by Journey policy",
  },
  {
    offeringId: "OFF-SPT-MED-CALL",
    partnerId: "SUP-SPT-04",
    partnerName: "SOS Médecins Maroc / Clinique Internationale",
    category: "journey_support",
    subCategory: "Emergency Medical",
    title: "On-Call English Doctor Hotel Visit & Assessment",
    deliverables: ["Licensed English/French emergency physician riad visit", "In-room medical consultation and diagnosis", "Emergency prescription delivery", "Direct coordination with private clinic if needed"],
    partnerCostMad: 500,
    partnerCostEur: 46.3,
    costUnit: "per_session",
    safarAtlasRetailEur: 85,
    targetMarginPct: 45.5,
    availability: "24/7 emergency dispatch within 45 minutes",
    location: "Marrakech, Essaouira, Agadir, Casablanca",
    requirements: ["Emergency assistance on demand"],
    seasonality: "Year-round",
    bookingMethod: "Direct concierge emergency hotline",
    bookingSla: "Physician dispatched within 20m",
    cancellationPolicy: "N/A - Emergency service",
  },
];

// -------------------------------------------------------------
// 3. ESCAPE SKU RECIPES (ASSEMBLING OFFERINGS INTO ESCAPES)
// -------------------------------------------------------------
export const ESCAPE_RECIPES: EscapeSkuRecipe[] = [
  {
    escapeSku: "ESC-AGAFAY-VIP",
    title: "Agafay Sunset & Dinner Escape",
    publicAnchorEur: 95,
    vipRetailEur: 120,
    duration: "5 Hours (Evening)",
    location: "Agafay Desert",
    offeringIds: [
      "OFF-TRN-AGF-RT",    // Dedicated Mercedes Van (MAD 700 / party)
      "OFF-ACT-QUAD-1H",    // 1-Hour Quad Bike (MAD 200 / pax)
      "OFF-ACT-CAMEL-AGF",  // Sunset Camel Trek (MAD 80 / pax)
      "OFF-FOD-AGF-TEA",    // Mint Tea Ceremony (MAD 50 / pax)
      "OFF-FOD-AGF-DIN",    // 3-Course Tagine Dinner & Show (MAD 270 / pax)
    ],
    defaultPartySize: 2,
  },
  {
    escapeSku: "ESC-ATLAS-DAY",
    title: "Atlas Mountains Berber Escape",
    publicAnchorEur: 85,
    vipRetailEur: 115,
    duration: "1 Day (8.5 Hours)",
    location: "High Atlas & Imlil Valley",
    offeringIds: [
      "OFF-TRN-IML-RT",    // Mountain Mercedes Van (MAD 800 / party)
      "OFF-GDE-ATL-DAY",    // Certified Mountain Guide (MAD 320 / party)
      "OFF-FOD-IML-HOM",    // Home Berber Lunch (MAD 130 / pax)
    ],
    defaultPartySize: 2,
  },
  {
    escapeSku: "ESC-ESSA-DAY",
    title: "Essaouira Coastal Ramparts Escape",
    publicAnchorEur: 90,
    vipRetailEur: 125,
    duration: "1 Day (10 Hours)",
    location: "Essaouira Coast",
    offeringIds: [
      "OFF-TRN-ESS-RT",    // Highway Mercedes Van (MAD 1,400 / party)
      "OFF-FOD-ESS-SEA",    // Portside Seafood Lunch (MAD 150 / pax)
    ],
    defaultPartySize: 2,
  },
  {
    escapeSku: "ESC-SAHARA-3D",
    title: "Merzouga 3-Day Desert Expedition",
    publicAnchorEur: 390,
    vipRetailEur: 490,
    duration: "3 Days / 2 Nights",
    location: "Marrakech → Dades → Merzouga",
    offeringIds: [
      "OFF-TRN-SAH-3D",    // 3-Day Dedicated 4x4 & Driver (MAD 3,800 / party)
      "OFF-ACC-DAD-01",    // Night 1 Dades Kasbah (MAD 650 / room)
      "OFF-ACC-MER-01",    // Night 2 Royal Merzouga Camp (MAD 1,400 / tent)
      "OFF-ACT-CAMEL-MER",  // Erg Chebbi Camel Caravan (MAD 150 / pax)
    ],
    defaultPartySize: 2,
  },
  {
    escapeSku: "ESC-MEDINA-WALK",
    title: "Marrakech Medina Heritage Walk & Secrets",
    publicAnchorEur: 45,
    vipRetailEur: 65,
    duration: "Half-Day (3.5 Hours)",
    location: "Marrakech Medina",
    offeringIds: [
      "OFF-GDE-MED-HALF",  // Licensed Medina Guide (MAD 380 / party)
      "OFF-FOD-AGF-TEA",    // Welcome Mint Tea (MAD 50 / pax)
    ],
    defaultPartySize: 2,
  },
];

// -------------------------------------------------------------
// 4. DYNAMIC RECALCULATION ENGINE (THE PRICING HOOK)
// -------------------------------------------------------------
export interface EscapeCostBreakdown {
  escapeSku: string;
  title: string;
  partySize: number;
  retailPriceTotalEur: number;
  retailPricePerPersonEur: number;
  netCostTotalMad: number;
  netCostTotalEur: number;
  netCostPerPersonEur: number;
  grossMarginEur: number;
  marginPct: number;
  isMarginHealthy: boolean; // Flag if margin < 35% safeguard
  items: {
    offeringId: string;
    title: string;
    partnerName: string;
    unit: CostUnit;
    costMad: number;
    costEur: number;
    isOverridden: boolean;
  }[];
}

/**
 * Calculates real-time unit economics for an Escape SKU based on offering net costs.
 * Supports passing custom offering cost overrides to simulate partner price updates.
 */
export function calculateEscapeCostAndMargin(
  escapeSku: string,
  partySize: number = 2,
  costOverridesMad?: Record<string, number>
): EscapeCostBreakdown | null {
  const recipe = ESCAPE_RECIPES.find(r => r.escapeSku === escapeSku);
  if (!recipe) return null;

  const MAD_TO_EUR = 10.8;
  const safeParty = Math.max(1, partySize);

  let totalFixedMad = 0;
  let totalVariableMadPerPerson = 0;

  const itemsBreakdown = recipe.offeringIds.map(offId => {
    const offering = PARTNER_OFFERINGS.find(o => o.offeringId === offId);
    if (!offering) {
      return {
        offeringId: offId,
        title: "Unknown Offering",
        partnerName: "Unknown",
        unit: "per_person" as CostUnit,
        costMad: 0,
        costEur: 0,
        isOverridden: false,
      };
    }

    const isOverridden = costOverridesMad?.[offId] !== undefined;
    const effectiveCostMad = isOverridden ? (costOverridesMad?.[offId] ?? offering.partnerCostMad) : offering.partnerCostMad;
    const effectiveCostEur = Math.round((effectiveCostMad / MAD_TO_EUR) * 10) / 10;

    // Fixed vs Variable allocation
    if (
      offering.costUnit === "per_vehicle" ||
      offering.costUnit === "per_group" ||
      offering.costUnit === "per_session" ||
      offering.costUnit === "per_day" ||
      offering.costUnit === "per_journey"
    ) {
      totalFixedMad += effectiveCostMad;
    } else if (
      offering.costUnit === "per_room_night" ||
      offering.costUnit === "per_tent_night"
    ) {
      // Room/tent fits 2 guests typically
      const roomsNeeded = Math.ceil(safeParty / 2);
      totalFixedMad += effectiveCostMad * roomsNeeded;
    } else {
      totalVariableMadPerPerson += effectiveCostMad;
    }

    return {
      offeringId: offId,
      title: offering.title,
      partnerName: offering.partnerName,
      unit: offering.costUnit,
      costMad: effectiveCostMad,
      costEur: effectiveCostEur,
      isOverridden,
    };
  });

  const netCostTotalMad = totalFixedMad + (totalVariableMadPerPerson * safeParty);
  const netCostTotalEur = Math.round((netCostTotalMad / MAD_TO_EUR) * 10) / 10;
  const netCostPerPersonEur = Math.round((netCostTotalEur / safeParty) * 10) / 10;

  const retailPricePerPersonEur = recipe.vipRetailEur;
  const retailPriceTotalEur = retailPricePerPersonEur * safeParty;

  const grossMarginEur = Math.round((retailPriceTotalEur - netCostTotalEur) * 10) / 10;
  const marginPct = Math.round((grossMarginEur / Math.max(1, retailPriceTotalEur)) * 1000) / 10;
  const isMarginHealthy = marginPct >= 35.0;

  return {
    escapeSku,
    title: recipe.title,
    partySize: safeParty,
    retailPriceTotalEur,
    retailPricePerPersonEur,
    netCostTotalMad,
    netCostTotalEur,
    netCostPerPersonEur,
    grossMarginEur,
    marginPct,
    isMarginHealthy,
    items: itemsBreakdown,
  };
}
