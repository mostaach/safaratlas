export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Desert Guides' | 'Trip Architecture' | 'Coastal Travel' | 'Insider Tips';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  summary: string;
  contentMarkdown: string;
  recommendedEscapeSlug?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-agafay-vs-sahara",
    slug: "agafay-vs-sahara-desert-guide",
    title: "Agafay vs. Merzouga Sahara: Which Morocco Desert Experience Should You Choose?",
    subtitle: "A practical breakdown of travel time, scenery, camping luxury, and budget for first-time Morocco travelers.",
    category: "Desert Guides",
    author: {
      name: "Mehdi El Ksir",
      role: "SafarAtlas Founder & Local Scout",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "August 15, 2026",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    summary: "Deciding between the rocky desert hills of Agafay (30 mins from Marrakech) and the towering golden dunes of Erg Chebbi Merzouga (9-hour drive). Here is how to choose the right one for your itinerary.",
    recommendedEscapeSlug: "agafay-escape-1d",
    contentMarkdown: `
# Choosing the Right Morocco Desert Experience

One of the most frequent questions travelers ask when planning a trip to Morocco is: **"Should I go to the Agafay Desert or the Sahara Desert at Merzouga?"**

Both offer unforgettable experiences, but they are vastly different in distance, landscape, and time investment. Here is our honest local breakdown to help you decide.

---

## 1. Distance & Travel Time

### Agafay Desert
- **Distance from Marrakech:** 35 km (approx. 40 minutes).
- **Ideal for:** Short trips (3–5 days in Morocco), families with young kids, or travelers who want a desert dinner without spending 18 hours in a car.

### Merzouga (Erg Chebbi Sahara)
- **Distance from Marrakech:** 560 km (approx. 9 to 10 hours driving each way).
- **Ideal for:** 7 to 10-day Morocco journeys, travelers dedicated to seeing massive golden sand dunes, and starlit Bedouin glamping.

---

## 2. Landscape & Vibe

### Agafay: The Stone Desert Oasis
Agafay is a **rocky moonscape desert** with rolling hills framed by the snow-capped High Atlas Mountains. There are no sand dunes here, but the sunset lighting, luxury glamping tents, infinity pools, and quad biking over rolling terrain create an otherworldly luxury vibe.

### Merzouga: The Classic Sahara Dunes
Merzouga features **Erg Chebbi**, a massive sea of golden sand dunes rising up to 150 meters high. This is the postcard Sahara: endless sand horizons, camel caravans at sunrise, and silent desert nights.

---

## 3. The SafarAtlas Verdict

- **Choose Agafay if:** You have less than 6 days in Morocco and want a seamless afternoon & sunset escape without long highway driving.
- **Choose Merzouga Sahara if:** You have 7+ days, want the iconic 3-day road trip through the High Atlas, Aït Benhaddou kasbahs, and Dades Valley.

*With SafarAtlas, both options can be seamlessly inserted into your managed trip as modular Escapes with private transfers and pre-verified desert camps.*
`
  },
  {
    id: "post-7day-morocco-architecture",
    slug: "7-day-managed-morocco-itinerary-guide",
    title: "How to Build a 7-Day Managed Morocco Trip (Medina + Sahara + Coast)",
    subtitle: "The exact modular formula to combine Marrakech, a 3-Day Sahara Escape, and Taghazout without burnout.",
    category: "Trip Architecture",
    author: {
      name: "SafarAtlas Editorial",
      role: "Moroccan Journey Architects",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "August 12, 2026",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=1200&q=80",
    summary: "Stop over-planning every single taxi and hotel. Here is how to structure a seamless 7-day Morocco journey using modular Escapes and managed local transfers.",
    recommendedEscapeSlug: "sahara-escape-3d",
    contentMarkdown: `
# The Blueprint for a 7-Day Morocco Journey

Morocco is rich, vibrant, and geographically diverse. Trying to fit Marrakech, Fes, Chefchaouen, Merzouga, and Taghazout into one week is the most common mistake first-time visitors make.

Instead of rushing through endless driving, the smartest approach is **Modular Journey Building**.

---

## The 7-Day Master Itinerary

### Days 1–2: Marrakech Medina & Rooftop Living
- Arrive in Marrakech. Stay in a verified historic medina riad.
- Spend Day 1 discovering Jemaa el-Fnaa, Bahia Palace, and rooftop mint tea.
- Spend Day 2 exploring Majorelle Gardens and local artisan souks.

### Days 3–5: 3-Day Sahara Desert Escape
- **Day 3:** Depart Marrakech over Tizi n'Tichka pass in the High Atlas. Tour Aït Benhaddou UNESCO Kasbah and sleep in Dades Valley.
- **Day 4:** Drive through Todra Gorge to Merzouga. Sunset camel trek into Erg Chebbi dunes and night in a private luxury camp under the stars.
- **Day 5:** Sunrise over the dunes, return drive through Ouarzazate back to Marrakech or onward to the coast.

### Days 6–7: Coastal Unwind (Essaouira or Taghazout)
- Transfer to the Atlantic coast for ocean breeze, fresh seafood grills, and sunset ramparts before departure.

---

## Why Managed Travel Works Better
Instead of booking 8 different hosts and worrying about whether the driver will arrive, SafarAtlas manages your entire itinerary under **one point of contact and one price**.
`
  },
  {
    id: "post-taghazout-surf-guide",
    slug: "taghazout-surf-yoga-coastal-guide",
    title: "Taghazout Travel Guide: Surf Breaks, Rooftop Yoga & Ocean Vibe",
    subtitle: "From Anchor Point waves to Paradise Valley palm pools, discover northern Africa's premier ocean haven.",
    category: "Coastal Travel",
    author: {
      name: "SafarAtlas Editorial",
      role: "Coast & Ocean Scout",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "August 8, 2026",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    summary: "Taghazout has transformed from a sleepy Berber fishing village into Morocco's vibrant capital of surf, rooftop shalas, and ocean sunset dinners.",
    recommendedEscapeSlug: "taghazout-surf-escape",
    contentMarkdown: `
# Discovering Taghazout & Tamraght

Located 20 kilometers north of Agadir along the Atlantic coast, **Taghazout** is famous worldwide for its world-class point breaks, year-round sun, and relaxed coastal culture.

---

## Top Experiences in Taghazout

1. **Surf Anchor Point & Panorama:** Famous right-hand point breaks suitable for experienced surfers, while nearby beaches offer gentle waves for beginners.
2. **Sunset Rooftop Yoga:** Many oceanfront villas feature rooftop shalas with 180-degree panoramic ocean views.
3. **Paradise Valley Excursion:** A 45-minute drive inland leads to natural rock pools, palm groves, and natural cliff-jumping spots.
4. **Fresh Fish at Agadir Port:** Taste grilled sardine and sea bass straight from local fishermen.

---

## Adding Taghazout to Your Journey
With our **3-Day Taghazout Surf Escape**, you get private transfers, ISA-certified surf coaching, oceanfront villa stay, and daily yoga included in one managed package.
`
  }
];
