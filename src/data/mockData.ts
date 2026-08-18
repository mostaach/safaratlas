export interface Destination {
  id: string;
  name: string;
  arabicName: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  highlights: string[];
  bestTime: string;
  listingCount: number;
  featuredItineraryId: string;
}

export interface BusinessListing {
  id: string;
  name: string;
  category: 'Riad & Stay' | 'Desert Expeditions' | 'Surf & Ocean' | 'Cultural & Crafts' | 'Food & Culinary';
  location: string;
  region: string;
  verified: boolean;
  verifiedBadgeType: 'Gold Partner' | 'Local Certified' | 'Community Choice';
  rating: number;
  reviewCount: number;
  responseTime: string;
  directInquiryMargin: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  image: string;
  gallery: string[];
  shortDesc: string;
  fullDesc: string;
  amenities: string[];
  contactWhatsapp: string;
  leadCountThisMonth: number;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  summary: string;
  activities: string[];
  insiderTip: string;
  recommendedBusinessId?: string;
  durationHours: number;
  highlightImage: string;
}

export interface TravelItinerary {
  id: string;
  title: string;
  subtitle: string;
  durationDays: number;
  pace: 'Leisurely' | 'Moderate' | 'Adventurous';
  suitableFor: string[];
  coverImage: string;
  days: ItineraryDay[];
}

export interface MapHotspot {
  id: string;
  name: string;
  type: 'City' | 'Desert' | 'Coast' | 'Mountain';
  lat: number;
  lng: number; // visual grid percentage position (0-100%) for custom SVG interactive map
  xPercent: number;
  yPercent: number;
  shortTag: string;
  listingCount: number;
  topHighlight: string;
  thumbnail: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "marrakech",
    name: "Marrakech",
    arabicName: "مراكش",
    region: "High Atlas & Plains",
    tagline: "Red City, Secret Courtyards & Vibrant Souks",
    description: "Immerse yourself in historic medina riads, rooftop sunset teas, fragrant spice markets, and majestic palaces backed by snow-capped Atlas peaks.",
    image: "/marrakech_hero.png",
    accentColor: "from-amber-600 via-rose-600 to-orange-700",
    highlights: ["Jemaa el-Fnaa Rooftops", "Historic Medina Riads", "Majorelle & Secret Gardens", "Agafay Desert Sunsets"],
    bestTime: "Oct – May",
    listingCount: 28,
    featuredItineraryId: "itin-marrakech-desert"
  },
  {
    id: "merzouga",
    name: "Merzouga & Erg Chebbi",
    arabicName: "مرزوكة",
    region: "Sahara Desert",
    tagline: "Towering Golden Dunes & Starlit Nights",
    description: "Embark on camel treks over 150-meter golden sand dunes, sleep in luxury Amazigh desert camps, and experience starry night skies like nowhere else.",
    image: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-amber-400 via-orange-500 to-amber-700",
    highlights: ["Sunset Camel Caravans", "Luxury Bedouin Glamping", "Traditional Gnawa Music", "Sandboarding at Sunrise"],
    bestTime: "Oct – Apr",
    listingCount: 16,
    featuredItineraryId: "itin-marrakech-desert"
  },
  {
    id: "taghazout",
    name: "Taghazout & Tamraght",
    arabicName: "تغازوت",
    region: "Atlantic Coast",
    tagline: "World-Class Waves, Ocean Air & Chill Vibes",
    description: "Morocco's premier surf haven where pristine point breaks meet sun-drenched coastal cafes, yoga retreats, and fresh seafood markets.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-teal-500 via-cyan-600 to-emerald-700",
    highlights: ["Anchor Point Surfing", "Sunset Roof Yoga", "Paradise Valley Pools", "Fresh Fish Grills"],
    bestTime: "Year-Round",
    listingCount: 19,
    featuredItineraryId: "itin-surf-coast"
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    arabicName: "شفشاون",
    region: "Rif Mountains",
    tagline: "The Blue Pearl Nestled in the Rif Peaks",
    description: "Wander enchanted cobalt-blue alleyways, taste artisan goat cheese, and hike scenic waterfall trails in northern Morocco's most tranquil mountain refuge.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-blue-500 via-indigo-600 to-sky-700",
    highlights: ["Cobalt Blue Alleyways", "Spanish Mosque Viewpoint", "Akchour Waterfalls", "Handwoven Rif Textiles"],
    bestTime: "Sep – May",
    listingCount: 14,
    featuredItineraryId: "itin-northern-pearls"
  },
  {
    id: "fes",
    name: "Fes Medina",
    arabicName: "فاس",
    region: "Middle Atlas",
    tagline: "Living Ancient Capital of Craft & Heritage",
    description: "Step into the world's largest car-free urban area, home to 9,000 alleys, centuries-old leather tanneries, and spiritual UNESCO monuments.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-emerald-600 via-teal-700 to-emerald-900",
    highlights: ["Chouara Leather Tannery", "Bou Inania Medersa", "Artisan Copper Souks", "Traditional Zellige Tilework"],
    bestTime: "Oct – May",
    listingCount: 22,
    featuredItineraryId: "itin-northern-pearls"
  },
  {
    id: "essaouira",
    name: "Essaouira",
    arabicName: "الصويرة",
    region: "Atlantic Coast",
    tagline: "Windy Atlantic Ramparts & Bohemian Soul",
    description: "Historic Portuguese ramparts, Gnaoua music heritage, thuya woodcraft workshops, and fresh ocean breezes in Morocco's laid-back port city.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-sky-400 via-teal-600 to-slate-800",
    highlights: ["Historic Skala Fort", "Fresh Portside Grills", "Gnaoua World Music", "Kitesurfing & Wind"],
    bestTime: "Year-Round",
    listingCount: 15,
    featuredItineraryId: "itin-surf-coast"
  }
];

export const BUSINESS_LISTINGS: BusinessListing[] = [
  {
    id: "agafay-placeholder",
    name: "Agafay Desert Experience — Marrakech",
    category: "Desert Expeditions",
    location: "Agafay Desert, 30km from Marrakech",
    region: "Marrakech",
    verified: false,
    verifiedBadgeType: "Local Certified",
    rating: 0,
    reviewCount: 0,
    responseTime: "< 24 hours",
    directInquiryMargin: "Direct Partner Rate",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    ],
    shortDesc: "Day trips, sunset dinners and overnight stays in the rocky Agafay desert — Morocco's closest desert escape from Marrakech.",
    fullDesc: "Experience the lunar landscape of the Agafay plateau: quad biking, camel rides, traditional Berber lunches and starlit overnight camps — all 30 minutes from Marrakech. Inquire directly to get current availability and pricing.",
    amenities: ["Quad Biking", "Camel Rides", "Sunset Dinner", "Overnight Camp Option", "Hotel Pickup"],
    contactWhatsapp: "",
    leadCountThisMonth: 0,
  },
];


export const ITINERARIES: TravelItinerary[] = [
  {
    id: "itin-marrakech-desert",
    title: "7-Day Imperial Marrakech & Sahara Dunes Explorer",
    subtitle: "From vibrant medina courtyards across the snow-capped High Atlas to the silence of Erg Chebbi",
    durationDays: 7,
    pace: "Moderate",
    suitableFor: ["Couples", "Culture Seekers", "First-time Visitors"],
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    days: [
      {
        dayNumber: 1,
        title: "Arrival in Marrakech & Medina Sunset",
        location: "Marrakech Medina",
        summary: "Settle into your boutique riad, enjoy a traditional mint tea welcome, and explore the evening buzz of Jemaa el-Fnaa square.",
        activities: ["Check-in at Riad Dar Zellige", "Stroll Medina Spice Markets", "Rooftop sunset drinks overlooking Koutoubia"],
        insiderTip: "Arrive at Jemaa el-Fnaa rooftops 45 minutes before sunset for the best lighting and photography spots.",
        recommendedBusinessId: "biz-1",
        durationHours: 6,
        highlightImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
      },
      {
        dayNumber: 2,
        title: "Palaces, Secret Gardens & Culinary Masters",
        location: "Marrakech Old Town",
        summary: "Discover Bahia Palace zellige, wander Jardin Majorelle, and cook your own slow-simmered lamb tagine.",
        activities: ["Bahia Palace Guided Tour", "Jardin Majorelle & YSL Museum", "Cooking class with Le Jardin Culinary"],
        insiderTip: "Book Jardin Majorelle online 48 hours ahead to skip the main entrance line.",
        recommendedBusinessId: "biz-5",
        durationHours: 8,
        highlightImage: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80"
      },
      {
        dayNumber: 3,
        title: "High Atlas Pass & Kasbah Ait Benhaddou",
        location: "Tizi n'Tichka & Ouarzazate",
        summary: "Cross the dramatic 2,260m Tizi n'Tichka mountain pass into the ancient mud-brick UNESCO fortress of Ait Benhaddou.",
        activities: ["Scenery drive across High Atlas", "Explore Ait Benhaddou Kasbah", "Dinner in Dades Gorge"],
        insiderTip: "Pack a warm layer; temperature drops significantly at mountain passes.",
        durationHours: 9,
        highlightImage: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80"
      },
      {
        dayNumber: 4,
        title: "Todra Gorge to Merzouga Golden Dunes",
        location: "Todra Gorge & Merzouga Dunes",
        summary: "Walk beneath 300m limestone canyon walls at Todra Gorge before arriving at the edge of the golden Sahara dunes.",
        activities: ["Todra Gorge River Walk", "Sunset Camel Trek into Erg Chebbi", "Welcome drum session at Nomad Camp"],
        insiderTip: "Mount your camel right before golden hour to capture shadow patterns across the sand ridges.",
        recommendedBusinessId: "biz-2",
        durationHours: 8,
        highlightImage: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=800&q=80"
      },
      {
        dayNumber: 5,
        title: "Sahara Sunrise, Sandboarding & Berber Culture",
        location: "Erg Chebbi Dunes",
        summary: "Watch the sun rise over endless sand dunes, try sandboarding down giant slopes, and visit local Khamlia musicians.",
        activities: ["Sunrise dune climb", "Sandboarding challenge", "Gnawa acoustic music performance"],
        insiderTip: "Bring a light scarf (Shesh) to protect your camera lens from fine desert dust.",
        recommendedBusinessId: "biz-2",
        durationHours: 7,
        highlightImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "itin-surf-coast",
    title: "5-Day Atlantic Surf, Coastal Calm & Seafood Trail",
    subtitle: "Catch ocean waves in Taghazout, practice rooftop yoga, and wander historic Essaouira sea ramparts",
    durationDays: 5,
    pace: "Leisurely",
    suitableFor: ["Active Travelers", "Ocean Lovers", "Solo Travelers"],
    coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    days: [
      {
        dayNumber: 1,
        title: "Arrival in Taghazout & Sunset Wave Check",
        location: "Taghazout Village",
        summary: "Check into your oceanfront surf villa, grab a fresh avocado smoothie, and catch your first sunset over Anchor Point.",
        activities: ["Check-in at Ocean Surf Villa", "Board fitting & spot orientation", "Sunset rooftop yoga shala session"],
        insiderTip: "Evening sea breezes make rooftop dinners spectacular; reserve a cliffside table.",
        recommendedBusinessId: "biz-3",
        durationHours: 5,
        highlightImage: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80"
      },
      {
        dayNumber: 2,
        title: "Morning Ocean Coaching & Paradise Valley Pools",
        location: "Taghazout & Paradise Valley",
        summary: "Catch morning swells with certified coaches, followed by a scenic hike to natural turquoise freshwater swimming holes.",
        activities: ["2-hour coached surf session", "Fresh fish beach lunch", "Trek & swim in Paradise Valley natural pools"],
        insiderTip: "Wear sturdy sandals for the Paradise Valley rock trail walk.",
        recommendedBusinessId: "biz-3",
        durationHours: 8,
        highlightImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export const MAP_HOTSPOTS: MapHotspot[] = [
  {
    id: "marrakech",
    name: "Marrakech",
    type: "City",
    lat: 31.6295,
    lng: -7.9811,
    xPercent: 38,
    yPercent: 62,
    shortTag: "Red City & Medina Riads",
    listingCount: 28,
    topHighlight: "Jemaa el-Fnaa & Palaces",
    thumbnail: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "merzouga",
    name: "Merzouga Dunes",
    type: "Desert",
    lat: 31.0984,
    lng: -4.0101,
    xPercent: 78,
    yPercent: 72,
    shortTag: "Erg Chebbi Glamping",
    listingCount: 16,
    topHighlight: "Luxury Camps & Stargazing",
    thumbnail: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "taghazout",
    name: "Taghazout",
    type: "Coast",
    lat: 30.5426,
    lng: -9.7093,
    xPercent: 22,
    yPercent: 78,
    shortTag: "Surf Breaks & Yoga",
    listingCount: 19,
    topHighlight: "Anchor Point Surfing",
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    type: "Mountain",
    lat: 35.1716,
    lng: -5.2697,
    xPercent: 52,
    yPercent: 22,
    shortTag: "Blue Medina & Rif Trails",
    listingCount: 14,
    topHighlight: "Blue Alleyways & Waterfalls",
    thumbnail: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "fes",
    name: "Fes Medina",
    type: "City",
    lat: 34.0333,
    lng: -5.0000,
    xPercent: 56,
    yPercent: 32,
    shortTag: "Ancient Craft & Tanneries",
    listingCount: 22,
    topHighlight: "UNESCO Medina & Zellige",
    thumbnail: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "essaouira",
    name: "Essaouira",
    type: "Coast",
    lat: 31.5085,
    lng: -9.7595,
    xPercent: 18,
    yPercent: 66,
    shortTag: "Atlantic Fortress & Wind",
    listingCount: 15,
    topHighlight: "Historic Ramparts & Seafood",
    thumbnail: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80"
  }
];
