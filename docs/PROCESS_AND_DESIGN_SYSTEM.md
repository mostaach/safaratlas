# SafarAtlas Process & Design System Documentation

## 1. Core Design System & Tokens
* **Primary Gold**: `#C4A258` | Hover: `#d8bb78` | Text: `#07192d`
* **Midnight Navy**: `#07192d` | Surface: `#051324`
* **Typography**: Playfair Display (`font-serif`) for headers, clean sans for UI
* **CTA Standards**:
  * Shape: Strict `rounded-none`
  * Weight: Strict `font-normal` (400)
  * Tracking: `tracking-[0.18em]` to `tracking-[0.24em]`
  * Elevation: Multi-layer gold glow `0 10px 30px -5px rgba(196, 162, 88, 0.45), 0 4px 16px rgba(0, 0, 0, 0.6)`

## 2. Image Upscaling & Processing Standard
Whenever a new card/hero image is provided:
```python
from PIL import Image, ImageFilter

img = Image.open(src_path)
target_w = 1600
target_h = int(img.height * (target_w / img.width))

upscaled = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=1.2, percent=105, threshold=3))

for path in dest_paths:
    sharpened.save(path, 'WEBP', quality=92, method=6)
```

## 3. Navigation & Footer Architecture
* **Navbar (`Header.tsx`)**: Completely transparent, non-sticky (`absolute top-0`), no borders/lines. Logo on left, text links on right.
* **Sticky CTA**: Persistent floating button (`fixed bottom-8 right-8 z-40`) for `"Check Availability →"`.
* **Footer (`Footer.tsx`)**: 4 open columns without heavy boxed containers:
  1. Brand & Direct WhatsApp/Email (`md:col-span-4`)
  2. Destinations (`md:col-span-3`)
  3. Plan & Journal (`md:col-span-3`)
  4. Trust & Verified channels: TripAdvisor, Instagram, WhatsApp (`md:col-span-2`)

## 4. Deployment SOP
1. `npm run build` (Must complete with 0 TypeScript/Next.js errors).
2. `git add . ; git commit -m "..." ; git push origin master`
3. `npx vercel --prod --yes`
4. Verify HTTP 200 on `https://safaratlas.com/` and all new assets.
