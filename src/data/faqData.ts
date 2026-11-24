export interface FaqSection {
  heading: string;
  paragraphs: string[];
}

export interface FaqEntry {
  slug: string;
  question: string;
  /** Direct answer shown first, before the reader scrolls. */
  answer: string;
  metaTitle: string;
  metaDescription: string;
  sections: FaqSection[];
  cta: { href: string; label: string; note: string };
  related: string[];
}

/**
 * High-intent answer pages (the "People Also Ask" tactic).
 *
 * Each entry gets its own indexable URL, answers the question in the first
 * paragraph, and links to the money page that converts. Facts come from the
 * escape data in src/data/mockData.ts and the existing on-site FAQ sections.
 */
export const MOROCCO_FAQ: FaqEntry[] = [
  {
    slug: "how-far-is-agafay-desert-from-marrakech",
    question: "How far is the Agafay Desert from Marrakech?",
    answer:
      "The Agafay Desert is about 35 km south of Marrakech, a 40 to 45 minute private drive from your riad or hotel. You are picked up at your door and returned the same evening.",
    metaTitle: "How Far Is the Agafay Desert from Marrakech?",
    metaDescription:
      "The Agafay Desert is about 35 km from Marrakech, a 40 to 45 minute private drive. Here is what the trip looks like, including pickup and return times.",
    sections: [
      {
        heading: "The drive from Marrakech",
        paragraphs: [
          "The route leaves Marrakech to the south and climbs gently into the rocky hills behind the city. Traffic is usually light outside the medina, and the last stretch is a paved desert road.",
          "SafarAtlas uses a private, air-conditioned vehicle with door-to-door pickup. You are not transferred to a coach or asked to meet at a central point.",
        ],
      },
      {
        heading: "How long you actually spend there",
        paragraphs: [
          "The full Agafay evening escape runs about five hours including transport. A typical pickup is around 16:30, with return to Marrakech after dinner and the fire show.",
          "If you only have one free evening in Marrakech, Agafay is the shortest way to see real desert scenery without losing a full day to driving.",
        ],
      },
    ],
    cta: {
      href: "/agafay",
      label: "See the Agafay Desert escape",
      note: "From €119 per person, with private transfer and a 3-course dinner included.",
    },
    related: [
      "how-much-does-agafay-desert-dinner-cost",
      "is-agafay-desert-worth-it",
      "agafay-vs-sahara-desert",
    ],
  },
  {
    slug: "how-much-does-agafay-desert-dinner-cost",
    question: "How much does an Agafay Desert dinner cost?",
    answer:
      "The core Agafay evening is from €119 per person. The all-inclusive Signature evening, which adds quad biking and a camel trek, is from €179 per person.",
    metaTitle: "Agafay Desert Dinner Cost (2026 Prices)",
    metaDescription:
      "Agafay desert dinner prices: €119 per person for the core evening, €179 for the Signature with quad biking and camel trek. See exactly what is included.",
    sections: [
      {
        heading: "What the €119 core evening includes",
        paragraphs: [
          "The core tier covers private roundtrip transfer from your Marrakech hotel, a Berber mint tea ceremony, a full 3-course tagine dinner, live Gnawa music and the fire show, plus a WhatsApp concierge for the evening.",
          "Quad biking and the camel trek are optional add-ons on this tier: quad is +€40 per person and the camel walk is +€20 per person.",
        ],
      },
      {
        heading: "What the €179 Signature adds",
        paragraphs: [
          "The Signature tier includes everything in the core evening plus the 1-hour guided quad biking safari and the 20-minute sunset camel trek. For most guests it is the simpler choice because there are no decisions or extra payments at the camp.",
        ],
      },
      {
        heading: "Payment, quotes and cancellation",
        paragraphs: [
          "No advance payment is required. You can pay on arrival at the camp in cash in Euros or Moroccan Dirhams, or by card. Free cancellation is available up to 24 hours before pickup.",
          "The final quote depends on group size and season. You receive one written figure on WhatsApp before you commit, with no on-site surcharges.",
        ],
      },
    ],
    cta: {
      href: "/agafay",
      label: "Check the Agafay experience",
      note: "Private transfer, dinner and show from €119 per person.",
    },
    related: [
      "how-far-is-agafay-desert-from-marrakech",
      "is-agafay-desert-worth-it",
      "agafay-vs-sahara-desert",
    ],
  },
  {
    slug: "is-agafay-desert-worth-it",
    question: "Is the Agafay Desert worth it?",
    answer:
      "Yes, if you want a real desert sunset and dinner close to Marrakech. Agafay is rocky, lunar desert about 45 minutes from the city, not the giant golden dunes of the Sahara.",
    metaTitle: "Is the Agafay Desert Worth It? An Honest Answer",
    metaDescription:
      "Agafay is worth it for a sunset, dinner and desert evening close to Marrakech. It is not the Sahara dunes. Here is who it suits and who should go to Merzouga.",
    sections: [
      {
        heading: "Who Agafay suits",
        paragraphs: [
          "Agafay is the right choice if you have limited time, want to be back in Marrakech the same night, or want a memorable dinner rather than a multi-day road trip. It works well for couples, families and first-time visitors.",
          "The landscape is stony and dramatic rather than sandy. Sunset over the hills, the candlelit dinner and the live music are the reasons to go.",
        ],
      },
      {
        heading: "When to choose the Sahara instead",
        paragraphs: [
          "Choose Merzouga if towering Erg Chebbi dunes and a night in a desert camp are the main point of your trip. That is a 3-day escape because the drive is about nine hours each way.",
          "A common plan is to do both: Agafay for an easy evening at the start of the trip, and the Sahara for the big desert experience later.",
        ],
      },
    ],
    cta: {
      href: "/agafay",
      label: "See the Agafay escape",
      note: "A five-hour private evening from Marrakech, from €119 per person.",
    },
    related: [
      "agafay-vs-sahara-desert",
      "how-far-is-agafay-desert-from-marrakech",
      "how-much-does-agafay-desert-dinner-cost",
    ],
  },
  {
    slug: "best-day-trips-from-marrakech",
    question: "What are the best day trips from Marrakech?",
    answer:
      "The best day trips from Marrakech are the Agafay Desert (45 minutes), Ourika Valley (about 1 hour), Imlil and the High Atlas (about 1.5 hours), Ouzoud Waterfalls (about 2.5 hours) and Essaouira (about 2.5 to 3 hours).",
    metaTitle: "Best Day Trips from Marrakech (2026 Guide)",
    metaDescription:
      "The best day trips from Marrakech by drive time: Agafay, Ourika Valley, Imlil, Ouzoud Waterfalls and Essaouira. Private transport and honest timings.",
    sections: [
      {
        heading: "Short trips under 90 minutes",
        paragraphs: [
          "Agafay is the closest desert experience and works as an afternoon and evening rather than a full day. Ourika Valley is a green mountain valley with Berber villages and riverside lunch spots. Imlil is the gateway to Mount Toubkal and the High Atlas.",
          "These three are the easiest to fit around a Marrakech stay because you are not spending most of the day in the car.",
        ],
      },
      {
        heading: "Full-day trips",
        paragraphs: [
          "Ouzoud Waterfalls is a 110-metre cascade in a red-rock gorge, roughly 2.5 hours each way. Essaouira is a UNESCO coastal town with ramparts, fishing boats and a relaxed medina, around 2.5 to 3 hours each way.",
          "Both are long days. A private driver makes them comfortable because you set the departure time and stops.",
        ],
      },
    ],
    cta: {
      href: "/marrakech",
      label: "Explore Marrakech and day escapes",
      note: "Private day trips and multi-day routes, coordinated door to door.",
    },
    related: [
      "how-many-days-in-marrakech",
      "is-agafay-desert-worth-it",
      "how-far-is-agafay-desert-from-marrakech",
    ],
  },
  {
    slug: "how-many-days-in-marrakech",
    question: "How many days should you spend in Marrakech?",
    answer:
      "Most travelers need 3 to 5 days in Marrakech. Add 2 to 3 days for a Sahara or Agafay desert escape, which brings a comfortable trip to 5 to 7 days.",
    metaTitle: "How Many Days in Marrakech? A Realistic Plan",
    metaDescription:
      "Three to five days is right for most Marrakech trips. Add two to three days for the desert. Here is how to structure 3, 5 and 7 day plans.",
    sections: [
      {
        heading: "A realistic 3-day base",
        paragraphs: [
          "Three days covers the medina, the souks, Jemaa el-Fnaa, the Majorelle Garden and one half-day escape such as Agafay or the Ourika Valley. It is enough for a first visit, but it is tight if you also want the desert.",
        ],
      },
      {
        heading: "Adding the desert and the coast",
        paragraphs: [
          "A 3-day Sahara escape needs two nights away from Marrakech, so plan 5 to 7 days in total. If you want Taghazout or Essaouira as well, seven days is the realistic minimum.",
          "Building the trip around modules avoids the common mistake of booking a packed itinerary that leaves no time to actually enjoy Marrakech.",
        ],
      },
    ],
    cta: {
      href: "/journey",
      label: "Build your Morocco journey",
      note: "Choose your days, escapes and pace, then get one written quote.",
    },
    related: [
      "best-day-trips-from-marrakech",
      "how-long-is-the-sahara-tour-from-marrakech",
      "best-time-to-visit-morocco",
    ],
  },
  {
    slug: "how-long-is-the-sahara-tour-from-marrakech",
    question: "How long is a Sahara tour from Marrakech?",
    answer:
      "The shortest comfortable Sahara tour from Marrakech is 3 days and 2 nights. Merzouga is about a nine-hour drive each way, so a 2-day round trip means almost two full days in the vehicle.",
    metaTitle: "Sahara Tour from Marrakech: How Many Days?",
    metaDescription:
      "A Sahara tour from Marrakech needs at least 3 days and 2 nights because Merzouga is about 9 hours away. See the route and why 3 days is the minimum.",
    sections: [
      {
        heading: "Why 3 days is the minimum",
        paragraphs: [
          "The distance is the constraint, not the activities. Driving to Merzouga and back in two days leaves little time for the dunes, the kasbahs or the gorges, and it is tiring for everyone in the car.",
          "Three days gives you one night in the Dades Valley, one night in the desert camp and a full sunset and sunrise on the dunes.",
        ],
      },
      {
        heading: "The classic route",
        paragraphs: [
          "Day one crosses the High Atlas via Tizi n'Tichka, visits Ait Benhaddou and continues to Dades. Day two goes through Todra Gorge to Merzouga for the camel trek and camp. Day three returns through the Draa Valley to Marrakech.",
        ],
      },
      {
        heading: "If you only have two days",
        paragraphs: [
          "Do Agafay instead. It gives you a desert sunset and dinner without the long drive, and it can fit into a single evening of a shorter Marrakech trip.",
        ],
      },
    ],
    cta: {
      href: "/escapes/sahara-escape-3d",
      label: "See the 3-day Sahara escape",
      note: "Private 4x4 or minivan, Dades kasbah and a luxury desert camp, from €490 per person.",
    },
    related: [
      "what-is-included-in-the-sahara-escape",
      "agafay-vs-sahara-desert",
      "how-many-days-in-marrakech",
    ],
  },
  {
    slug: "what-is-included-in-the-sahara-escape",
    question: "What is included in the 3-day Sahara escape?",
    answer:
      "The 3-day Sahara escape from €490 per person includes a private air-conditioned 4x4 or minivan with an English or French speaking driver, one night in a Dades kasbah, one night in a luxury desert camp with an ensuite bathroom, daily breakfast and dinners, and sunset and sunrise camel treks.",
    metaTitle: "What Is Included in the 3-Day Sahara Escape?",
    metaDescription:
      "The 3-day Sahara escape includes private transport, a Dades kasbah, a luxury desert camp, breakfasts, dinners and camel treks. See what is not included.",
    sections: [
      {
        heading: "What is included",
        paragraphs: [
          "Transport is private for your group, with pickup and drop-off in Marrakech. The route covers the High Atlas, Ait Benhaddou, Dades, Todra Gorge and the Erg Chebbi dunes.",
          "Accommodation is one night in a boutique kasbah in Dades and one night in a private desert tent with an ensuite bathroom. Breakfasts and traditional dinners are included, along with the sunset and sunrise camel caravans.",
        ],
      },
      {
        heading: "What is not included",
        paragraphs: [
          "Lunches along the road, personal drinks and gratuities are not included. Budget for these separately, and tell us in advance about any dietary requirements.",
        ],
      },
      {
        heading: "Who it works for",
        paragraphs: [
          "The escape is suitable for couples, families and small groups who want a private driver rather than a shared coach. The camp is comfortable but remote, so pack layers for the cold desert night.",
        ],
      },
    ],
    cta: {
      href: "/escapes/sahara-escape-3d",
      label: "View the full Sahara itinerary",
      note: "Three days and two nights, from €490 per person.",
    },
    related: [
      "how-long-is-the-sahara-tour-from-marrakech",
      "agafay-vs-sahara-desert",
      "best-time-to-visit-morocco",
    ],
  },
  {
    slug: "best-time-to-visit-morocco",
    question: "What is the best time to visit Morocco?",
    answer:
      "The best months for most Morocco trips are March to May and September to November. The Sahara is extremely hot in July and August, while the Atlantic coast stays milder year-round.",
    metaTitle: "Best Time to Visit Morocco: Month by Month",
    metaDescription:
      "Spring and autumn are best for most Morocco trips. The Sahara is extreme in midsummer and the coast is milder. See the month-by-month breakdown.",
    sections: [
      {
        heading: "Spring and autumn",
        paragraphs: [
          "March to May brings mild temperatures, green valleys and comfortable desert nights. September to November is similar, with warm days and cooler evenings, and it is usually the best window for the Sahara.",
        ],
      },
      {
        heading: "Summer and winter",
        paragraphs: [
          "July and August are very hot inland and in the desert. The coast around Taghazout and Essaouira is more comfortable because of the Atlantic breeze. Winter is cold in the mountains and at night in the desert, but Marrakech and the coast remain pleasant in the daytime.",
        ],
      },
      {
        heading: "Region matters more than the month",
        paragraphs: [
          "A single national answer is misleading. The High Atlas, the Sahara and the Atlantic coast behave very differently in the same week, so build the route around the regions you actually want to visit.",
        ],
      },
    ],
    cta: {
      href: "/blog/best-time-to-visit-morocco-month-by-month",
      label: "Read the month-by-month guide",
      note: "Weather, crowds and route advice for every season.",
    },
    related: [
      "how-many-days-in-marrakech",
      "is-taghazout-good-for-beginner-surfers",
      "agafay-vs-sahara-desert",
    ],
  },
  {
    slug: "is-taghazout-good-for-beginner-surfers",
    question: "Is Taghazout good for beginner surfers?",
    answer:
      "Yes. Taghazout has beginner-friendly beach breaks and surf schools, while Anchor Point is for experienced surfers. The 3-day Taghazout reset includes guided coaching at beginner or intermediate breaks, or a restorative hammam and yoga track.",
    metaTitle: "Is Taghazout Good for Beginner Surfers?",
    metaDescription:
      "Yes, Taghazout has beginner beach breaks and surf schools. Anchor Point is for advanced surfers. See the breaks, the 3-day reset and what is included.",
    sections: [
      {
        heading: "The beginner breaks",
        paragraphs: [
          "The sheltered beach breaks around Taghazout and Tamraght are where most lessons happen. They are more forgiving than the famous point breaks and work well for first-time and improving surfers.",
          "Anchor Point is a world-class right-hand point break and is not a beginner wave. Watching it is worthwhile even if you do not surf it.",
        ],
      },
      {
        heading: "What the 3-day reset includes",
        paragraphs: [
          "The Taghazout escape is from €349 per person for 3 days and 2 nights. It includes an ocean-view boutique room, two breakfasts, a one-way Agadir airport transfer and one core activity: guided surf coaching with gear, or a hammam and yoga programme.",
          "You can choose the active ocean rhythm or the slower restorative one. There is no forced group schedule or camp pressure.",
        ],
      },
    ],
    cta: {
      href: "/taghazout",
      label: "See the Taghazout escape",
      note: "Three days and two nights, surf or hammam and yoga, from €349 per person.",
    },
    related: [
      "best-time-to-visit-morocco",
      "best-day-trips-from-marrakech",
      "how-many-days-in-marrakech",
    ],
  },
  {
    slug: "agafay-vs-sahara-desert",
    question: "Agafay or the Sahara: which desert should you choose?",
    answer:
      "Choose Agafay if you want a desert sunset and dinner in one evening, 45 minutes from Marrakech. Choose the Sahara at Merzouga if you want towering golden dunes and can commit to a 3-day trip.",
    metaTitle: "Agafay vs Sahara: Which Morocco Desert?",
    metaDescription:
      "Agafay is a 45-minute desert evening from Marrakech. The Sahara at Merzouga is a 3-day trip with towering dunes. Compare drive time, scenery and cost.",
    sections: [
      {
        heading: "Agafay in one evening",
        paragraphs: [
          "Agafay is close, private and easy to fit into a Marrakech stay. You get rocky desert hills, a sunset, a candlelit dinner and live music, then return to your hotel the same night.",
          "It is not a dune experience. The ground is stony and the camp is a dinner venue rather than a remote expedition.",
        ],
      },
      {
        heading: "The Sahara in three days",
        paragraphs: [
          "Merzouga is about nine hours from Marrakech. The reward is Erg Chebbi, the tall golden dunes, a camel trek and a night in a desert camp. The drive is the price of the scenery.",
          "Three days and two nights is the shortest version that still feels like a desert trip rather than a long car journey.",
        ],
      },
      {
        heading: "The honest comparison",
        paragraphs: [
          "If time is short, choose Agafay. If the dunes are the reason for your trip, choose the Sahara. Many guests do Agafay at the start and the Sahara later in the same trip, because they are different experiences rather than substitutes.",
        ],
      },
    ],
    cta: {
      href: "/blog/agafay-vs-sahara-desert-guide",
      label: "Read the full comparison",
      note: "Drive times, scenery, camping comfort and budget side by side.",
    },
    related: [
      "is-agafay-desert-worth-it",
      "how-long-is-the-sahara-tour-from-marrakech",
      "how-far-is-agafay-desert-from-marrakech",
    ],
  },
];

export const getFaqEntry = (slug: string): FaqEntry | undefined =>
  MOROCCO_FAQ.find((entry) => entry.slug === slug);
