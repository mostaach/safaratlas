# SafarAtlas SEO Playbook

> A working knowledge base distilled from Edward Sturm and peer operators, translated into
> tactics that fit a new Morocco travel brand. Read this with `SAFARATLAS-90-DAY-PLAN.md`
> (execution) and `KEYWORD-MAP.csv` (page/keyword assignments).
>
> Last updated: 2026-11-24

---

## 0. The model in one paragraph

Ranking is the output of three inputs:

1. **Coverage** — you have a page (and often a video) for the exact query, not a vague
   category page.
2. **Authority** — other pages that already rank and get clicks link to you, and your own
   pages pass authority to each other through internal links.
3. **Intent fit** — the page gives the searcher what they want immediately (price, drive
   time, itinerary, booking), before they scroll.

A new domain cannot win on authority alone. It wins by being **unmistakably relevant** to a
large number of specific, lower-competition queries, then reinvesting that traction into
the competitive money pages.

---

## 1. Edward Sturm — the tactics that matter

### 1.1 Maximize coverage: one keyword → one page + many videos

**What:** For every keyword you target with a page, publish several short videos on the same
keyword across YouTube (including Shorts), Facebook Reels, Instagram Reels and TikTok. Put the
keyword at the **start** of the video title/description, and use the video transcript as the
rest of the description. Repost the same idea to every platform.

**Why:** Google increasingly ranks UGC/video for commercial queries, and video descriptions on
YouTube and Facebook contain **clickable links** back to your page. Those links plus the video
impressions compound.

**How for SafarAtlas:** one escape page = 3–5 short videos:
- "Agafay desert dinner from Marrakech: what €119 actually includes"
- "Agafay vs Sahara: which desert should you pick?"
- "What to wear to an Agafay desert dinner"

**Risk:** Low. Time cost only.

**Source:** https://edwardsturm.com/articles/2026-seo-playbook-maximize-coverage/

---

### 1.2 Bottom-of-funnel / "compact" keywords

**What:** Build a `/services/` or `/uses/` hub that lists high-intent keywords, each linking to
a dedicated 300–500 word landing page with a CTA at the top and bottom, real images, and a
clean on-page score.

**Why:** People searching these already know what they want; they just don't know your brand.
Fewer words than top-of-funnel, higher conversion, and generative engines recommend brands for
exactly these "how do I get X" prompts.

**How to tell if a keyword is bottom-of-funnel:** search it. If products/tours/booking pages
appear, it is. If the whole page is blog articles, it is top-of-funnel.

**SafarAtlas examples:**
- private sahara desert tour from marrakech
- agafay desert dinner booking
- morocco honeymoon package 7 days
- private driver marrakech to merzouga
- taghazout surf and yoga package

**Risk:** Low.

**Sources:**
- https://edwardsturm.com/articles/bottom-of-funnel-seo-love-letter/
- https://edwardsturm.com/compact-keywords/

---

### 1.3 Rank competitive keywords without backlinks (internal-link authority)

**What:**
1. Get a small set of foundational backlinks first (see 1.6).
2. Find 10 People Also Ask questions around your competitive keyword (use AlsoAsked).
3. Create a subfolder (e.g. `/morocco-faq/`) with **one page per question**, 120–200 words,
   keyword in title, slug, meta description, H1 and first sentence.
4. Link every easy page to the competitive money page with varied anchor text.
5. When a page starts ranking, expand it and strengthen the CTA to the money page.

**Why:** Easy pages rank because nobody targets them; they accumulate clicks and authority,
then pass it internally to the page you actually want to rank.

**SafarAtlas application:** `/morocco-faq/` around "agafay desert", "sahara tour from
marrakech", "taghazout surf", "morocco in winter", each linking to the matching escape page.

**Risk:** Low, provided the pages are genuinely useful and not thin doorway copies.

**Source:** https://edwardsturm.com/articles/rank-competitive-keywords-without-backlinks/

---

### 1.4 AI SEO / GEO / AEO: target the query the LLM actually searches

**What:**
1. In ChatGPT, inspect the network tab to see the 1–3 web queries it runs for a prompt
   ("query fan-out"). Perplexity shows its searches openly.
2. Create dedicated pages for those exact queries (title, meta, slug, H1, first sentence).
3. Use the phrasing as H2s and FAQ entries in related pages.
4. In Google Search Console → Performance → Query → Custom regex `(\b\w+\b\s){7,}` to surface
   the long, natural-language queries that correlate with AI-assisted search.
5. Interlink and earn links to those pages.

**Why:** LLMs retrieve from search indexes; being the best retrievable answer for the exact
query is how you get cited in AI Overviews, ChatGPT and Perplexity.

**SafarAtlas prompts to test:** "best 3 day sahara tour from marrakech", "is agafay desert
worth it", "taghazout vs essaouira for surfing", "morocco itinerary 7 days without driving too
much".

**Risk:** Low.

**Source:** https://edwardsturm.com/articles/ai-seo-geo-aeo-get-shown-llms-2026/

---

### 1.5 Nofollow links and links from pages that rank

**What:**
- Nofollow links can still pass authority **if the linking page ranks and gets clicks**.
- Prioritize links from pages already in the top 10–20 for a relevant keyword, especially
  bottom-of-funnel pages.
- Keep outreach emails short and specific.
- Steal the strategy: Ahrefs → competitor → Backlinks → Best links → one per domain → sort by
  page traffic. Those are the topics/pages that already attract links; pitch inclusion there.

**Why:** A link from a dead page is decoration. A link from a page Google already trusts and
sends traffic to is an authority transfer.

**Risk:** Medium. Paid links must be genuinely editorial; avoid link farms and obvious
patterns.

**Source:** https://edwardsturm.com/articles/6-seo-tactics-you-should-be-using/

---

### 1.6 Foundational backlinks + clear images

**What:**
- Claim the "boring" links a real company has: social profiles, directories, chambers,
  marketplaces, Medium/Substack, relevant listings. They establish that a real entity exists.
- On commercial pages, use one **clear, meaningful image** near the top. Not a collage.
- Add a TL;DR / answer box at the top of informational pages.

**Why:** Entity signals reduce the "is this a real business?" doubt, and clarity improves both
rankings and conversion.

**Risk:** Low. Avoid mass-submitting to spam directories; prefer named, moderated platforms.

**Source:** https://edwardsturm.com/articles/seo-tactics-images-backlinks-chatgpt-plugins/

---

### 1.7 Search Experience Optimization (SXO) and the use-case corpus

**What:** Build a large, genuinely useful corpus of **use cases** ("how, when and why to use
SafarAtlas for X"), not just destination descriptions. Place consistent brand descriptions on
platforms AI assistants scrape (Reddit, Quora, YouTube, LinkedIn, TripAdvisor). Keep the
technical basics: sitemap, Search Console, server-rendered content, no orphan pages.

**Risk:** Low.

**Sources:**
- https://edwardsturm.com/articles/search-experience-optimization/

---

### 1.8 Programmatic SEO — only with proprietary data, scaled slowly

**What:** Legitimate programmatic SEO scales a **unique dataset** (real prices, drive times,
vetted partners, seasonal availability). It is not "generate 5,000 AI pages". Publish in batches
over months, not all at once. Keep an 80/20 human/AI editing ratio.

**Why:** Google's **scaled content abuse** policy targets mass-produced, low-value pages. Rapid
page-count spikes plus poor engagement are detectable.

**SafarAtlas application:** a route/drive-time matrix, a real price index per escape and season,
or a "what €X buys you in Morocco" dataset — each page must contain information that does not
exist elsewhere.

**Risk:** High if ignored.

**Sources:**
- https://gaganghotra.com/videos/podcast-appearance/ai-seo-boom-and-bust-trap/
- https://edwardsturm.com/articles/22x-seo-traffic-in-under-2-months/

---

## 2. Peer operators worth copying

### 2.1 Hub-and-spoke architecture (travel-specific)
Destination hub → country/region → city → intent page (itinerary, cost, best time). Every
spoke links up to its hub and across to sibling pages. Avoid flat structures where every page
sits at the same level.

**SafarAtlas mapping:**
- Hub: `/marrakech` (Marrakech & Atlas)
- Spokes: `/escapes/*`, `/agafay`, Atlas day trips
- Hub: `/taghazout`
- Spokes: Taghazout escape, Essaouira comparison, surf/yoga guides
- Hub: `/journey` (custom itineraries)
- Spokes: 7-day, 10-day, honeymoon, private-driver pages

**Source:** https://rydesk.com/seo-for-travel-website/

### 2.2 The 90-day new-property reality check
A new domain will not rank for head terms in 90 days. What is realistic:
- Brand-name rankings: yes.
- Long-tail pages indexed and ranking pages 3–8: yes.
- Map-pack / local visibility: emerging.
- Competitive head terms: months 4–12.

Do not buy "guaranteed page 1 in 3 months".

**Source:** https://hotelseolab.com/blog/rank-new-hotel-from-zero-90-day-plan

### 2.3 Parasite / community SEO tiers (2026)
Use rented authority to get faster reach while the owned site compounds:
- **S-tier:** YouTube, Reddit
- **A-tier:** LinkedIn posts, Facebook posts, Google Sites
- **B-tier:** Medium, Substack, Ghost, Spotify
- **C-tier:** low-quality blog hosts (avoid)

For travel specifically: Reddit (`r/Morocco`, `r/Marrakech`, `r/solotravel`, `r/travel`),
TripAdvisor forums, Quora, Pinterest, YouTube. Contribute genuinely; do not drop links in
drive-by posts.

**Source:** https://www.jigsawkraft.com/post/parasite-seo-complete-guide-to-how-it-works-in-2026

### 2.4 Travel-specific technical rules
- One keyword → one canonical page. Do not compete with yourself.
- Avoid doorway pages ("X tours from [20 cities]") that funnel to one page.
- Keep faceted/filter/booking-result URLs out of the index (robots + canonical + noindex).
- Only canonical pages in the sitemap.
- Descriptive, unique titles; real alt text; breadcrumbs; Organization schema.

**Sources:**
- https://backlinko.com/travel-seo
- https://www.travelwhitelabel.com/blog/travel-website-seo
- https://searchengineland.com/guide/seo-for-new-website

---

## 3. What NOT to do (and why)

| Tactic | Why it fails |
|---|---|
| Mass AI pages with no unique data | Scaled content abuse; traffic spikes then collapses |
| PBNs / bought link networks | Ignored or penalized; wasted money |
| Cloaking / doorway pages | Explicit spam policy |
| Keyword-stuffed exact-match domains | Reduced value; brand trust matters more |
| Publishing 9,000 pages in a month | Obvious unnatural scaling signal |
| Fake reviews / undisclosed paid placements | Trust + policy risk |

Google's own guidance: content must be created to benefit people, not to manipulate rankings.

---

## 4. Prioritization matrix

| Tactic | Impact | Effort | Time to signal | Risk |
|---|---|---|---|---|
| GSC sitemap + request indexing | High | Low | Days | None |
| Bottom-of-funnel landing pages | High | Medium | 2–8 weeks | Low |
| PAA/FAQ subfolder → money pages | High | Medium | 2–8 weeks | Low |
| Internal linking between pages | High | Low | Weeks | None |
| Video coverage per keyword | High | Medium | 1–3 months | Low |
| Foundational backlinks | Medium | Low | 2–6 weeks | Low |
| Links from ranking pages | High | High | 1–3 months | Medium |
| Reddit/Quora/TripAdvisor presence | Medium | Medium | 2–8 weeks | Low |
| AI-query pages | Medium | Low | 1–3 months | Low |
| Programmatic dataset pages | High | High | 3–6 months | High if rushed |

---

## 5. Weekly operating cadence

- **Mon:** publish 1 page (money or FAQ) + 1 video batch (3 clips).
- **Tue:** community answers (Reddit/Quora/TripAdvisor) — 3 substantive replies.
- **Wed:** 10 backlink outreach emails, short and specific.
- **Thu:** publish 1 blog article; interlink to 2 money pages.
- **Fri:** review GSC queries/impressions; improve the page with the best impressions and
  weakest CTR (title/meta/first paragraph).

---

## Sources

- Edward Sturm — https://edwardsturm.com/articles/search-engine-optimization/
- Backlinko travel SEO — https://backlinko.com/travel-seo
- Travel hub-and-spoke — https://rydesk.com/seo-for-travel-website/
- New hotel 90-day plan — https://hotelseolab.com/blog/rank-new-hotel-from-zero-90-day-plan
- Travel technical SEO — https://www.travelwhitelabel.com/blog/travel-website-seo
- New site SEO guide — https://searchengineland.com/guide/seo-for-new-website
- Parasite SEO guide — https://www.jigsawkraft.com/post/parasite-seo-complete-guide-to-how-it-works-in-2026
- Programmatic vs scaled abuse — https://gaganghotra.com/videos/podcast-appearance/ai-seo-boom-and-bust-trap/
