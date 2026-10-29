# SafarAtlas Brand Guidelines v2.0

> Source of Truth: Verified from Next.js 15 production web codebase, `safar_atlas_website_assets`, and `PROCESS_AND_DESIGN_SYSTEM.md`.  
> Status: Production Standard  
> Last updated: 2026-09-24  

---

## Quick Reference

| Element | Value |
|---|---|
| Primary Color | #C4A258 |
| Secondary Color | #07192d |
| Accent Color | #d8bb78 |
| Primary Font | Outfit, Playfair Display |
| Voice | Authentic, Cinematic, Refined, Direct |

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|---|---|---|---|
| SafarAtlas Gold | #C4A258 | rgb(196,162,88) | Primary brand color, 'Atlas' wordmark, main CTA buttons, badges |
| Gold Dark | #b38f45 | rgb(179,143,69) | Pressed button state, luxury borders, deep gold accents |

### Secondary Colors

| Name | Hex | RGB | Usage |
|---|---|---|---|
| Midnight Navy | #07192d | rgb(7,25,45) | Primary background canvas (`--background`), dark section headers |
| Surface Navy | #051324 | rgb(5,19,36) | Deep modal cards, elevated containers, footer background |
| Accent Gold Light | #d8bb78 | rgb(216,187,120) | Interactive hover state, link sweep underline animation, subtle glow |
| Vector Navy | #16375A | rgb(22,55,90) | Traced master vector logo stroke (light backgrounds, `brand-colors.txt`) |

### Neutral Palette

| Name | Hex | RGB | Usage |
|---|---|---|---|
| Bone Soft Cream | #f6f2ec | rgb(246,242,236) | Main readable body typography (`--foreground`), editorial text |
| Pure White | #FFFFFF | rgb(255,255,255) | High-contrast footer logo, badge highlights |
| Dark Slate | #0d2239 | rgb(13,34,57) | Secondary card borders and subtle dividers |

### Semantic Colors

| State | Hex | Usage |
|---|---|---|
| WhatsApp Oasis Teal | #25D366 | Direct concierge booking indicator & WhatsApp status |
| Safar Verified Emerald | #059669 | Verified local partner badge icon & text |
| Verified Emerald Tint | #ecfdf5 | Background for verified partner guarantee pill |
| Warning Ochre | #f59e0b | Weather disruption & advisory notifications |
| Error Crimson | #ef4444 | Validation errors, payment failures |

---

## 2. Typography & Hierarchy

### Font Stack

```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Type Scale

| Element | Font | Weight | Size (Desktop/Mobile) | Tracking | Line Height |
|---|---|---|---|---|---|
| **Display H1** | Playfair Display | 700 / 600 | 56px / 36px | `-0.02em` | 1.15 |
| **Section H2** | Playfair Display | 600 | 40px / 28px | `-0.01em` | 1.25 |
| **Subsection H3** | Playfair Display | 500 | 28px / 22px | `normal` | 1.30 |
| **Card H4 / UI** | Outfit | 600 / 700 | 20px / 18px | `0.02em` | 1.35 |
| **Body Large** | Outfit | 400 | 18px / 16px | `normal` | 1.60 |
| **Body Regular** | Outfit | 400 | 16px / 15px | `normal` | 1.60 |
| **Caption / Meta** | Outfit | 400 | 14px / 13px | `0.04em` | 1.40 |
| **Primary CTA Button** | Outfit | 400 (`font-normal`) | 14px / 13px | `0.24em` (uppercase) | 1.00 |

### Official Wordmark Lockup

- **`Safar`**: Playfair Display, font-weight 900 (Black), color `#f6f2ec` (or `#07192d` on light mode)
- **`Atlas`**: Outfit, font-weight 800 (Extrabold), color `#C4A258` (SafarAtlas Gold)
- **Sub-label**: `Morocco Travel` in Outfit, uppercase, letter-spacing `tracking-[0.25em]`, text opacity 80%

---

## 3. Strict UI Component Standards

### Primary CTA Button (Architectural Editorial Standard)

From `docs/PROCESS_AND_DESIGN_SYSTEM.md`:

```css
.btn-primary {
  background-color: #C4A258;
  color: #07192d;
  border-radius: 0px; /* STRICT rounded-none — zero rounded corners */
  font-weight: 400;   /* STRICT font-normal */
  letter-spacing: 0.24em; /* tracking-[0.24em] */
  text-transform: uppercase;
  padding: 1rem 2.25rem;
  box-shadow:
    0 10px 30px -5px rgba(196, 162, 88, 0.45),
    0 4px 16px rgba(0, 0, 0, 0.6);
  transition: all 0.3s cubic-bezier(0.2, 0.7, 0.1, 1);
}

.btn-primary:hover {
  background-color: #d8bb78;
  box-shadow: 0 0 30px rgba(196, 162, 88, 0.55);
  transform: translateY(-1px);
}
```

> ⚠️ **Strict Rule:** Rounded pill buttons (`rounded-full` or `rounded-xl`) are strictly forbidden on main action CTAs to preserve architectural editorial elegance.

### Link Sweep Interactive Underline

From `Header.tsx` & `globals.css`:

```css
.link-sweep::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 1px;
  width: 100%;
  background: #C4A258;
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.1, 1);
}

.link-sweep:hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}
```

### Trust Component: Safar Verified Badge

From `web/src/components/brand/VerifiedBadge.tsx`:
- **Pill:** `rounded-full`, bg `#ecfdf5`, border `1px solid #a7f3d0`, text `#059669`
- **Icon:** Forest emerald check shield
- **Copy:** `✓ Safar Verified Business` — *\"Verified local Moroccan partner. Direct inquiry pricing guarantee without hidden third-party middleman booking commissions.\"*

---

## 4. Master Visual Asset Inventory

All master files are saved in `05 Marketing/Brand Assets/` and `web/public/`:

### Master Logos & Vectors
| Asset File | Format | Resolution | Purpose |
|---|---|---|---|
| `logo/safar-atlas-logo.svg` | Scalable Vector | Traced 1024px | Master brand logomark across web & print |
| `logo/safar-atlas-logo-transparent.png` | Raster PNG | 1024 × 1024 px (300 DPI) | Watermarks, overlays, presentations |
| `navbar/safar-atlas-navbar.svg` | Scalable Vector | Horizontal Profile | Desktop & mobile navigation header |
| `navbar/safar-atlas-navbar.png` | Raster PNG | 400 × 74 px | Fallback navbar header |
| `footer/safar-atlas-logo-white.svg` | Scalable Vector | Monochrome White | Footer on midnight navy `#07192d` |
| `footer/safar-atlas-footer-white.png` | Raster PNG | 400 × 80 px | Footer raster fallback |
| `social-media-logo.jpg` | High-Res JPG | 1080 × 1080 px | Instagram, WhatsApp & Facebook profile |
| `safaratlas-brand-logo.png` | Transparent PNG | Web Optimized | Web landing page hero lockup |
| `campaign/safaratlas_logo_brand_badge.png` | PNG Badge | 1080 × 1080 px | Ad creative stamp & circular seal |

### Complete 9-File Favicon Suite
- `favicon/favicon-16.png` (16×16) · Desktop browser tab
- `favicon/favicon-32.png` (32×32) · Retina display tab
- `favicon/favicon-48.png` (48×48) · Windows taskbar & Safari pinned tab
- `favicon/favicon-64.png` (64×64) · High-DPI browser bookmark
- `favicon/favicon-180.png` (180×180) · Apple iOS Touch Icon (iPhone/iPad)
- `favicon/favicon-192.png` (192×192) · Android Chrome PWA home screen icon
- `favicon/favicon-512.png` (512×512) · Android splash screen & WhatsApp avatar
- `favicon/favicon.ico` · Multi-resolution legacy browser fallback
- `favicon/favicon.svg` · Modern lossless SVG vector tab icon

### The 6 Production Agafay Feature Cards
- `agafay_card_pickup_1787668236070.png` · Private 4x4 Land Cruiser Riad Pickup
- `agafay_card_camel_1787668246438.png` · Golden Hour Camel Trek & Tagelmust Headwrap
- `agafay_card_dinner_1787668278573.png` · Candlelit 3-Course Berber Desert Feast
- `agafay_card_guide_1787668305830.png` · Certified Local Amazigh Driver & Host Concierge
- `agafay_card_viewpoint_1787668317830.png` · High Atlas Mountain Snowpeak Viewpoint
- `agafay_card_tea_1787668328661.png` · Traditional Mint Tea Ceremony & Almond Dates

---

## 5. Brand Voice, Messaging & Guest Ritual

### Voice Guidelines
- **Personality:** Refined, cinematic, hospitable, authoritative, authentic.
- **Approved Words:** *Curated, private escape, sunset ritual, authentic, door-to-door, bespoke, sacred stillness, verified host, desert feast.*
- **Forbidden Words:** *Cheap, budget excursion, tour bus, holiday package, tourist trap, middleman, agency.*

### Bilingual Service Standards
- 🇫🇷 **French (Primary for France, Belgium, Switzerland):** Poetic, evocative, respectful, warm.
- 🇬🇧 **English (UK, US, Canada, Nordics):** Cinematic, clear, adventure-driven, direct.

### The 4-Step Guest Arrival Ritual
1. **Private Door-to-Door Pickup:** Clean 4x4 / Mercedes van at guest Riad with dedicated driver placard.
2. **The Welcome Tagelmust Gift:** Authentic indigo/sand Berber headwrap gifted and wrapped for each guest.
3. **The Mint Tea Ceremony:** Fresh organic mint tea and almond dates served in silver teapots.
4. **Departure & Tip Envelope:** Branded card with driver tip envelope and direct NFC Google review tap.

---

## 6. Image Processing SOP (LANCZOS + WebP)

```python
from PIL import Image, ImageFilter

img = Image.open(src_path)
target_w = 1600
target_h = int(img.height * (target_w / img.width))
upscaled = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=1.2, percent=105, threshold=3))
sharpened.save(dest_path, 'WEBP', quality=92, method=6)
```
- Eliminates compression blur, maintains rich desert sand grain, loads in < 250ms on 4G mobile.
