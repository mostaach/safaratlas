# 🇲🇦 SafarAtlas 2.0 — Managed Morocco Travel Operating System

> **Architecture & Operations Documentation**  
> **Repository:** `safaratlas/web`  
> **Vault Alignment:** `SafarAtlas-OS`  
> **Production Branch:** `master`

---

## 1. Executive Summary & Product Model

SafarAtlas has transitioned from a directory marketplace into a **Managed Morocco Travel Platform** operating as a Destination Management Company (DMC).

### Core Brand Value Proposition
> *"SafarAtlas manages Morocco journeys for travelers by combining curated destinations, packaged Escapes, experiences, accommodation, transportation, and trusted local partners into one coordinated trip."*

### Key Operating Principles
1. **End-to-End Ownership**: One point of contact, one transparent quote, managed ground transport and verified local hosts.
2. **Escapes Curation**: Modular 1-to-3 day packaged travel experiences (Desert glamping, surf camps, Atlas treks) designed to plug into multi-destination itineraries.
3. **Conversational Velocity**: Immediate post-inquiry redirection to WhatsApp concierge (`+212 698 017 323`) to minimize friction and convert leads fast.
4. **Transparent Costing & Margin Engine**: Dual financial model separating public selling prices (€) from internal supplier net costs (€) and SafarAtlas net margin.

---

## 2. Technical Architecture & File Structure

```
safaratlas/web/src/
├── app/
│   ├── page.tsx                      # Homepage (Hero, Escapes, Dest. Slice Carousel, Interactive Map, Timeline, How it Works, Testimonials)
│   ├── journey/
│   │   └── page.tsx                  # Dedicated Interactive Journey Builder & Proposal Request Page
│   ├── escapes/
│   │   └── [slug]/
│   │       └── page.tsx              # SEO-optimized Escape Detail Page with direct "Add to Journey" action
│   ├── admin/
│   │   └── page.tsx                  # HQ Command Center aligned with SafarAtlas-OS vault
│   └── layout.tsx                    # Global Root Layout with global WhatsApp Concierge Widget & SEO schemas
├── components/
│   ├── brand/
│   │   ├── Header.tsx                # Desktop & Mobile Header with live Journey Counter & WhatsApp CTA
│   │   └── Footer.tsx                # Brand Footer with Trust Guarantee and WhatsApp contact line
│   ├── travel/
│   │   ├── HeroSection.tsx           # Split Immersive Showcase & Primary CTAs
│   │   ├── EscapesSection.tsx        # 1-3 Day Modular Escapes Grid with Add to Journey buttons
│   │   ├── AddEscapeToJourneyButton.tsx # Client CTA Component for Escape Detail page
│   │   ├── InquiryModal.tsx          # Direct Inquiry Modal with WhatsApp instant post-submission CTA
│   │   ├── DestinationSliceCarousel.tsx # Focus Slice Carousel for Curated Regions
│   │   ├── InteractiveMap.tsx        # Client-safe Leaflet Morocco Region Map
│   │   └── ItineraryTimeline.tsx     # Step-by-Step Itinerary Viewer
│   └── ui/
│       ├── WhatsAppButton.tsx        # Floating Global WhatsApp Widget with pulse indicator
│       └── floating-nav.tsx          # Mobile Floating Navigation Dock with direct WhatsApp action
└── lib/
    ├── journeyStore.ts               # Persistent localStorage client-side state engine
    ├── journeyTypes.ts               # Managed Journey TypeScript Interfaces & Costing models
    ├── leadTypes.ts                  # Lead Inquiry Data Contracts
    └── partnerStore.ts               # Vetted Supplier Data Management
```

---

## 3. Journey Builder Engine (`/journey`)

### State Management (`journeyStore.ts`)
- **Persistent Storage**: Utilizes `localStorage` (`safaratlas_journey_v1`) to allow travelers to add/remove Escapes as they browse the platform.
- **Event Dispatching**: Broadcasts `safaratlas_journey_update` custom DOM events to update header numeric counters in real-time.

### Traveler Workflow:
1. Traveler browses homepage or `/escapes/[slug]`.
2. Clicks **"+ Add to My Journey"**, which stores the Escape object and redirects/links to `/journey`.
3. Selects travel dates, group size, special preferences, and clicks **"REQUEST MY MOROCCO JOURNEY →"**.
4. Lead is recorded in the database, and traveler receives an instant success screen with a direct **"💬 Chat with Journey Concierge on WhatsApp Now"** link pre-loaded with their booking reference ID.

---

## 4. Global WhatsApp Concierge Integration

- **Phone Line**: `+212 698 017 323`
- **Global Widget (`WhatsAppButton.tsx`)**: Fixed at bottom-right corner with live pulse effect and tooltip reading *"Morocco Concierge Online"*.
- **Header & Navigation**: Integrated `💬 WhatsApp` quick action in desktop header and mobile dock (`floating-nav.tsx`).
- **Admin Dashboard**: 1-click **Chat on WhatsApp** button generated for every incoming lead card.

---

## 5. SafarAtlas-OS Vault Alignment

The Web Admin Dashboard (`/admin`) is mirrored directly after the `SafarAtlas-OS` vault directory structure:

| Vault Directory | Admin Dashboard Tab | Functionality |
| :--- | :--- | :--- |
| `00 Dashboard` | `⊞ HQ Command Center` | High-level KPIs (Total Revenue, Active Requests, Conversion rate) |
| `03 Bookings` | `📬 Bookings Pipeline` | Lead inquiries management, status updates, 1-click WhatsApp & Email |
| `01 Escapes` | `🐪 Escapes Catalog` | Active packaged Escapes overview (prices, durations, public pages) |
| `02 Suppliers` | `🤝 Vetted Suppliers` | Supplier Applications & Vetted Partner Database |
| `06 Finance` | `📊 Finance & Net Costs` | Net Costing, Gross Revenue, and SafarAtlas Net Margin engine |

---

## 6. Git & Deployment Log

- **Repository**: `https://github.com/mostaach/safaratlas.git`
- **Main Branch**: `master`
- **Latest Commit**: `84eb534` (*feat: Add floating WhatsApp concierge widget & header/nav direct WhatsApp integration*)
- **Deployment Platform**: Vercel (Auto-deploys on push to `master`)

---

*Documentation saved directly in repository root.*
