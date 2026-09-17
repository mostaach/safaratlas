/**
 * Marrakech Destination Data & Journey Scaffold
 * 
 * CORE PRINCIPLE:
 * Uses existing ESCAPES_PACKAGES from mockData.ts as modular Escape building blocks.
 * Provides the day scaffolds, local neighbourhood intelligence, and modular extra activities.
 */

export interface DayScaffold {
  dayNumber: number;
  title: string;
  suggestedFocus: string;
  icon: string;
}

export interface MarrakechExperienceExtra {
  id: string;
  title: string;
  category: "Culture" | "Food" | "Wellness" | "Art";
  duration: string;
  priceEur: number;
  icon: string;
  shortDesc: string;
}

export const MARRAKECH_DESTINATION_DATA = {
  destination: "Marrakech",
  arabicName: "مراكش",
  tagline: "The Red City · Secret Courtyards & Desert at Your Doorstep",
  heroSubtitle: "How do you want to experience Marrakech? Choose your duration, then build your time with curated Escapes and local experiences.",
  heroImage: "/destinations/marrakech.jpg",

  // Suggested default scaffolding when user picks stay length
  scaffoldingByDuration: {
    1: [
      { dayNumber: 1, title: "Day 1 — Medina & Historic Quarters", suggestedFocus: "Jemaa el-Fnaa, Secret Courtyards & Rooftop Sunset", icon: "🕌" },
    ],
    2: [
      { dayNumber: 1, title: "Day 1 — Ancient Medina & Souks", suggestedFocus: "Artisan Quarters, Palaces & Rooftop Dining", icon: "🕌" },
      { dayNumber: 2, title: "Day 2 — Agafay Desert Evening", suggestedFocus: "Rocky Dunes, 1h Quad Trail, Sunset Camels & Bonfire Tagine", icon: "🏜️" },
    ],
    3: [
      { dayNumber: 1, title: "Day 1 — Arrival & Medina Heritage", suggestedFocus: "Private Riad Check-in, Historic Mellah & Spice Souks", icon: "🕌" },
      { dayNumber: 2, title: "Day 2 — Agafay Desert Sunset", suggestedFocus: "Quad Trail, Sunset Camel Walk & 3-Course Camp Dinner", icon: "🏜️" },
      { dayNumber: 3, title: "Day 3 — High Atlas Mountain Escape", suggestedFocus: "Imlil Valley, Berber Village Mint Tea & Toubkal Foothills", icon: "🏔️" },
    ],
    4: [
      { dayNumber: 1, title: "Day 1 — Medina & Palaces", suggestedFocus: "Bahia Palace, Saadian Tombs & Sunset Tea", icon: "🕌" },
      { dayNumber: 2, title: "Day 2 — Agafay Desert Evening", suggestedFocus: "Sunset Camel Caravan, Quad Adventure & Fire Show", icon: "🏜️" },
      { dayNumber: 3, title: "Day 3 — Ouzoud Waterfalls or Atlas", suggestedFocus: "110m Cascades, Wild Barbary Macaques & Boat Ride", icon: "💧" },
      { dayNumber: 4, title: "Day 4 — Slow Recovery & Majorelle", suggestedFocus: "YSL Museum, Traditional Hammam & Farewell Dinner", icon: "🌿" },
    ],
    5: [
      { dayNumber: 1, title: "Day 1 — Arrival & Secret Gardens", suggestedFocus: "Riad Welcome, Le Jardin Secret & Rooftop Twilight", icon: "🕌" },
      { dayNumber: 2, title: "Day 2 — Agafay Desert Sunset Escape", suggestedFocus: "Quad Biking, Desert Dunes & Starlit Tagine Banquet", icon: "🏜️" },
      { dayNumber: 3, title: "Day 3 — High Atlas Mountain Day 1", suggestedFocus: "Ascent to Imlil, Mountain Kasbah Check-in & Valley Trek", icon: "🏔️" },
      { dayNumber: 4, title: "Day 4 — High Atlas Mountain Day 2", suggestedFocus: "Berber Family Lunch, Alpine Waterfalls & Return to Marrakech", icon: "🏔️" },
      { dayNumber: 5, title: "Day 5 — Craftsmen Souks & Departure", suggestedFocus: "Artisan Leather, Rug & Brass Souks, Airport Transfer", icon: "✨" },
    ],
  } as Record<number, DayScaffold[]>,

  // Modular extra local experiences (available to add into any day)
  extras: [
    {
      id: "exp-medina-walk",
      title: "Guided Medina Secret Alleyways Walk",
      category: "Culture",
      duration: "3.5 Hours",
      priceEur: 35,
      icon: "🕌",
      shortDesc: "Skip tourist traps with an official historian guide into private courtyards and hidden artisan guilds.",
    },
    {
      id: "exp-riad-cooking",
      title: "Private Riad Cooking Masterclass",
      category: "Food",
      duration: "3 Hours",
      priceEur: 55,
      icon: "🍲",
      shortDesc: "Shop seasonal spices in the souk, then prepare authentic chicken tagine with candied lemons under a private chef.",
    },
    {
      id: "exp-hammam-ritual",
      title: "Traditional Hammam & Argan Oil Scrub",
      category: "Wellness",
      duration: "90 Minutes",
      priceEur: 45,
      icon: "🧖",
      shortDesc: "Black eucalyptus soap wash, kessa glove exfoliation, and pure organic argan oil massage in a candlelit luxury bathhouse.",
    },
    {
      id: "exp-majorelle-ysl",
      title: "Majorelle Botanical Garden & YSL Museum Pass",
      category: "Art",
      duration: "2.5 Hours",
      priceEur: 25,
      icon: "💙",
      shortDesc: "VIP timed entry to Jacques Majorelle's cobalt blue botanical sanctuary and Yves Saint Laurent's haute couture museum.",
    },
  ] as MarrakechExperienceExtra[],

  // Key neighbourhoods & places
  places: [
    {
      name: "The Historic Medina",
      subtitle: "Heart of Marrakech · UNESCO Heritage",
      desc: "A labyrinth of 9,000 alleys with artisan souks, historic madrasas, and tranquil courtyard riads.",
      tag: "Culture & Stays",
    },
    {
      name: "Agafay Desert",
      subtitle: "45 Minutes South · Stone Dunes",
      desc: "Surreal lunar hills offering dramatic High Atlas sunset views, quad trails, and luxury camp bonfires.",
      tag: "Desert Evening",
    },
    {
      name: "Imlil & High Atlas",
      subtitle: "90 Minutes South · Mountain Gateway",
      desc: "Cool alpine valley at the base of Mount Toubkal, with terraced walnut groves and stone Berber villages.",
      tag: "Alpine Nature",
    },
    {
      name: "Ourika Valley",
      subtitle: "45 Minutes South · River Canyons",
      desc: "Lush riverbanks, traditional mountain tagines served with feet in the water, and seven rocky cascades.",
      tag: "Riverside Day Trip",
    },
  ],

  // Travel intelligence & logistics
  faq: [
    {
      q: "Does an Escape include my Marrakech hotel?",
      a: "No. Escapes are standalone activities and day excursions with roundtrip private transport. If you would like SafarAtlas to coordinate your boutique Riad stay, airport transfers, and multiple Escapes together, you can build a complete Journey.",
    },
    {
      q: "How does hotel pick-up work in the Medina?",
      a: "Since the historic Medina is pedestrian-only, your private driver will meet you at the nearest vehicle access point (usually 2 to 4 minutes on foot from your Riad door), coordinated directly via your 24/7 WhatsApp concierge.",
    },
    {
      q: "What is the best time of year to visit Marrakech?",
      a: "October through May offers glorious sunny days (20°C to 26°C) and crisp starry desert evenings with snow atop the High Atlas peaks.",
    },
  ],
};