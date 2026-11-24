---
name: safaratlas-web-manager
description: Comprehensive management, deployment, analytics, and operational guide for the SafarAtlas website (safaratlas.com). Use whenever modifying, auditing, deploying, debugging, or adding features to SafarAtlas.
---

# SafarAtlas Website Management & Operations Skill

## 1. Project Overview & Infrastructure

SafarAtlas is a high-craft luxury travel discovery and managed booking platform for Morocco (Agafay desert camps, Sahara expeditions, High Atlas treks, Taghazout surf escapes).

- **Production Domain**: `https://safaratlas.com` (also `https://www.safaratlas.com`)
- **Hosting / Edge**: Vercel (Project: `safaratlas`, Team: `mostaachs-projects`)
- **GitHub Repository**: `mostaach/safaratlas` (`https://github.com/mostaach/safaratlas.git`)
- **Production Branch**: `master` (Vercel is wired to track `master`)
- **Stack**: Next.js 16 (App Router + Turbopack), React 19, Tailwind CSS v4, Lucide React, Framer Motion, Supabase, Resend.

---

## 2. Git & Deployment Protocol

### Standard Workflow
1. **Always verify current branch**:
   ```bash
   git branch
   # Ensure you are on 'master'
   ```
2. **Build and test locally before pushing**:
   ```bash
   npm run build
   ```
   Verify that all SSG pages (40+ routes) and TypeScript compile with zero errors.
3. **Commit with conventional commits**:
   ```bash
   git add <files>
   git commit -m "feat/fix/perf(<scope>): description"
   ```
4. **Push to GitHub**:
   ```bash
   git push origin master
   ```
5. **Vercel Deployment**:
   Pushing to `master` triggers automatic Vercel deployment. To deploy immediately or verify from CLI:
   ```bash
   vercel --prod
   vercel ls safaratlas
   ```

---

## 3. Analytics & Google Consent Mode v2 Architecture

### IDs & Credentials
- **GA4 Measurement ID**: `G-RLJL1P7M43`
- **GA4 Account ID**: `407364377`
- **GA4 Property ID**: `553356880`
- **Meta Pixel ID**: Configured via `NEXT_PUBLIC_META_PIXEL_ID` (gated by explicit opt-in)

### Google Consent Mode v2 Configuration
Located in [src/app/layout.tsx](file:///c:/Users/mehdi/OneDrive/Documents/Desktop/mehdi/01_SYSTEM/AgenticOS%20project%20manager/projects/safaratlas/src/app/layout.tsx):
- **`analytics_storage`**: Defaults to `'granted'` (with `'anonymize_ip': true`) to capture real-time traffic from day one, unless the user previously clicked "Essential Only".
- **`ad_storage`, `ad_user_data`, `ad_personalization`**: Defaults to `'denied'`. Only updated to `'granted'` if the user explicitly clicks "Accept All".
- **Cookie storage key**: `safaratlas_cookie_consent` in `localStorage` (`'all'` or `'essential'`).

### Client-Side Route Tracking (SPA)
Because Next.js App Router uses soft client-side transitions without full page reloads, route tracking is handled by:
- [src/components/analytics/AnalyticsTracker.tsx](file:///c:/Users/mehdi/OneDrive/Documents/Desktop/mehdi/01_SYSTEM/AgenticOS%20project%20manager/projects/safaratlas/src/components/analytics/AnalyticsTracker.tsx):
  Listens to `usePathname()` and `useSearchParams()`, dispatching `gtag('event', 'page_view')` on each page transition.

### Custom Conversion & Interaction Events
Located in [src/lib/trackEvent.ts](file:///c:/Users/mehdi/OneDrive/Documents/Desktop/mehdi/01_SYSTEM/AgenticOS%20project%20manager/projects/safaratlas/src/lib/trackEvent.ts):
```ts
trackEvent("lead_start", { source: "agafay_inquiry" });
trackEvent("lead_submit", { leadId, destination, totalGuests });
trackEvent("journey_request_submit", { leadId, count });
trackEvent("listing_view", { slug, title });
trackEvent("whatsapp_chat", { destination });
```
Dispatches directly to `window.gtag` and `window.fbq` (when consented).

### How to Monitor in Google Analytics
- **Live Traffic (< 30 minutes)**: Always view **Reports > Realtime** (`/reports/realtime`).
- **Standard Reports & Home**: Have a 24–48 hour batch aggregation latency and do not display same-day real-time visitors.

---

## 4. Key Directories & Architecture

- `src/app/`: App router pages (`/`, `/agafay`, `/marrakech`, `/taghazout`, `/escapes/[slug]`, `/blog/[slug]`, `/journey`, `/admin`).
- `src/app/api/`: API endpoints (`/api/leads`, `/api/partner-applications`, `/api/health`).
- `src/components/analytics/`: Tracking components (`AnalyticsTracker.tsx`, `MetaPixel.tsx`).
- `src/components/ui/`: UI components including [CookieConsent.tsx](file:///c:/Users/mehdi/OneDrive/Documents/Desktop/mehdi/01_SYSTEM/AgenticOS%20project%20manager/projects/safaratlas/src/components/ui/CookieConsent.tsx).
- `src/components/travel/`: Travel itinerary cards, inquiry modals, `JourneyDrawer.tsx`.
- `src/lib/`: Stores (`leadStore.ts`, `partnerStore.ts`, `trackEvent.ts`, `sendLeadEmail.ts`).
- `content/`: Markdown articles and structured itinerary data.

---

## 5. Routine Operations & Maintenance Checklist

1. **Check Website Health**:
   ```bash
   curl -I https://safaratlas.com/api/health
   curl -I https://safaratlas.com
   ```
2. **Audit SEO & Metadata**:
   - Verify `sitemap.xml` and `robots.txt` are served with 200 OK.
   - Inspect JSON-LD schema on homepage and itineraries.
3. **Inspect Lead Submissions**:
   - Check Supabase `leads` table or test endpoint with `/api/health`.
   - Ensure Resend email notifications are delivering to `bookings@safaratlas.com`.
