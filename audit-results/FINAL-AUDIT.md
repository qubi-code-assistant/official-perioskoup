# PERIOSKOUP DEEP AUDIT — FINAL SYNTHESIS
**Date:** 2026-03-06
**Auditors:** 12 specialist subagents (Claude Sonnet 4.6)
**Site:** https://official-perioskoup.vercel.app (canonical: perioskoup.com)
**Codebase:** Vite 7 + React 19 + Tailwind CSS v4 SPA

---

## OVERALL SCORE: 54 / 100

| # | Audit | Score | Weight | Weighted |
|---|-------|-------|--------|----------|
| 01 | SEO Technical | 4.5/10 | 12% | 5.4 |
| 02 | GEO Readiness | 6.5/10 | 8% | 5.2 |
| 03 | Content Quality | 6.8/10 | 10% | 6.8 |
| 04 | Conversion UX | 6.1/10 | 12% | 7.3 |
| 05 | Mobile Responsive | 4.5/10 | 10% | 4.5 |
| 06 | Competitive Positioning | 5.5/10 | 8% | 4.4 |
| 07 | About / Team Trust | 5.0/10 | 6% | 3.0 |
| 08 | Animations & Visual | 5.5/10 | 6% | 3.3 |
| 09 | Code Performance | 5.0/10 | 10% | 5.0 |
| 10 | Accessibility (WCAG) | 4.0/10 | 10% | 4.0 |
| 11 | Niche Domination | 6.5/10 | 4% | 2.6 |
| 12 | Testing & Reliability | 5.0/10 | 4% | 2.0 |
| | **TOTAL** | | 100% | **53.5 -> 54** |

---

## THE 3 THINGS DESTROYING THIS SITE

These three issues, if left unfixed, make everything else irrelevant:

### 1. EVERY FORM SILENTLY DISCARDS USER DATA
Every `handleSubmit` calls `setSubmitted(true)` with zero API call. The blog Subscribe button has no handler at all. Every signup since launch has been lost. The "500+ waitlist" and "30+ founding clinics" stats cannot be real if the form never transmitted data.

**Files:** `Home.tsx:76-79`, `Waitlist.tsx:30-33`, `Contact.tsx:28-31`, `Blog.tsx:259`

### 2. EVERY PAGE SERVES THE HOMEPAGE TITLE, META, AND CANONICAL TO CRAWLERS
The SPA has one `index.html`. Every URL returns `<title>Perioskoup - Your Personal Dental Companion</title>` and `<link rel="canonical" href="https://perioskoup.com/" />`. Google sees `/features`, `/for-dentists`, and all 6 blog posts as duplicates of the homepage. No secondary page can rank independently.

**File:** `client/index.html` (single static shell)

### 3. EVERY GRID LAYOUT BREAKS ON MOBILE
Zero Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) used anywhere. All 11 multi-column grids use inline `style={{ gridTemplateColumns: "..." }}` with no mobile stack. `body { overflow-x: hidden }` masks the overflow instead of fixing it. The site is unusable below 768px.

**Files:** `Home.tsx:152,239,296,341,410`, `About.tsx:72,109,152`, `Contact.tsx:78`, `ForDentists.tsx:96`, `Pricing.tsx:111`

---

## TOP 15 HIGHEST-IMPACT IMPROVEMENTS
*Ranked by (impact / effort)*

| Rank | Fix | Impact | Effort | Audit |
|------|-----|--------|--------|-------|
| 1 | Wire forms to Loops/Mailchimp API | Critical | 2-3h | #04 |
| 2 | Install `react-helmet-async` + per-page `<Helmet>` | Critical | 3-4h | #01 |
| 3 | Replace all inline grid styles with Tailwind responsive classes | Critical | 4-6h | #05 |
| 4 | Remove `maximum-scale=1` from viewport meta | Blocker | 5 min | #10 |
| 5 | Add `prefers-reduced-motion` CSS media query | Blocker | 30 min | #08, #10 |
| 6 | Add skip-to-main-content link | Blocker | 1h | #10 |
| 7 | Add `:focus-visible` styles, remove `outline: none` | Blocker | 1h | #10 |
| 8 | Add `<label>` associations to all form inputs | Blocker | 1h | #10 |
| 9 | Fix "CEO" title to "CDO" in About.tsx, "product designer" to "AI specialist" in Home.tsx | High | 10 min | #07 |
| 10 | Replace regulatory terms: "adherence", "therapeutic", "AI-powered diagnosis explanations" | High | 15 min | #03 |
| 11 | Add `React.lazy()` + `Suspense` for route-level code splitting | High | 2h | #09 |
| 12 | Add `loading="lazy"` + `width`/`height` to all images | High | 30 min | #09 |
| 13 | Fix footer contrast (#234966 -> #8C9C8C) and breadcrumb contrast | High | 15 min | #10 |
| 14 | Create `/ai-dental-companion` exact-match landing page | High | 3h | #11 |
| 15 | Fix BlogPosting author `@id` linkage to global Person entity | High | 30 min | #02 |

---

## QUICK WINS (< 1 hour each)

### QW-1: Remove maximum-scale=1 (5 min)
```html
<!-- client/index.html line 4 -->
<!-- BEFORE -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
<!-- AFTER -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### QW-2: Fix founder title bugs (10 min)
```tsx
// About.tsx line 154 — WRONG: "Periodontist & CEO" -> CORRECT:
role: "Periodontist & CDO"

// Home.tsx line 406 — WRONG: "a product designer" -> CORRECT:
"...a periodontist, a full-stack engineer, and an AI specialist..."
```

### QW-3: Fix regulatory violations (15 min)
```tsx
// Pricing.tsx line 31 — HIGHEST RISK
// BEFORE: "AI-powered diagnosis explanations"
// AFTER:  "Plain-language oral health education"

// BlogPost.tsx line 516 — Replace "adherence" with "engagement"
// BlogPost.tsx line 526 — Replace "adherence" with "habit consistency"
// BlogPost.tsx line 235 — Replace "therapeutic" with "clinical relationship"
```

### QW-4: Fix footer contrast failure (15 min)
```tsx
// Footer.tsx — all instances of color: '#234966' on #050C10 bg
// BEFORE: color: '#234966'  (2.21:1 — FAIL)
// AFTER:  color: '#8C9C8C'  (4.67:1 — PASS)

// Breadcrumb.tsx line 73
// BEFORE: color: '#6B7F7B'  (3.20:1 — FAIL)
// AFTER:  color: '#8C9C8C'  (4.67:1 — PASS)
```

### QW-5: Add prefers-reduced-motion (30 min)
```css
/* index.css — add at the end */
@media (prefers-reduced-motion: reduce) {
  .animated-bg-img, .cta-orb, .hero-orb, .cta-particle,
  .hero-particle, .cta-scan-line, .hero-scan-line, .hero-ring,
  .ticker-track, .circle-pulse, .phone-float, .text-glow {
    animation: none !important;
  }
  .reveal, .reveal-scale {
    opacity: 1 !important;
    transform: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

### QW-6: Add skip link (30 min)
```css
/* index.css */
.skip-link {
  position: absolute; top: -100px; left: 0; z-index: 10000;
  background: #C0E57A; color: #0A171E;
  font-family: 'Gabarito', sans-serif; font-weight: 700; font-size: 15px;
  padding: 12px 24px; border-radius: 0 0 8px 0;
  text-decoration: none; transition: top 0.2s;
}
.skip-link:focus { top: 0; }
```
```html
<!-- index.html or App.tsx — before Navbar -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### QW-7: Add focus-visible styles (30 min)
```css
/* index.css — replace outline: none */
.p-input:focus-visible, .p-select:focus-visible {
  outline: 2px solid #C0E57A; outline-offset: 2px;
  border-color: rgba(192, 229, 122, 0.7);
}
.btn-primary:focus-visible {
  outline: 2px solid #0A171E; outline-offset: 3px;
  box-shadow: 0 0 0 4px #C0E57A;
}
.btn-ghost:focus-visible, .btn-text:focus-visible {
  outline: 2px solid #C0E57A; outline-offset: 2px;
}
```

### QW-8: Fix geo.region from GB to RO (5 min)
```html
<!-- index.html lines 13-14 -->
<meta name="geo.region" content="RO" />
<meta name="geo.placename" content="Bucharest, Romania" />
```

### QW-9: Add loading="lazy" + dimensions to images (30 min)
Add `loading="lazy"` and `width`/`height` attributes to all below-fold `<img>` tags in Home.tsx, About.tsx, Blog.tsx, ForDentists.tsx.

### QW-10: Fix phone mockup float/reveal CSS conflict (10 min)
```tsx
// Home.tsx — separate the two animation layers
<div className="reveal-scale" style={{ transitionDelay: "0.2s" }}>
  <div className="phone-float">
    <PhoneMockup />
  </div>
</div>
```

---

## MEDIUM EFFORT (1-5 hours each)

### ME-1: Wire all forms to a real API (2-3h)
Connect Waitlist, Contact, and Blog newsletter forms to Loops.so or Mailchimp API via a Vercel serverless function. Add loading spinner, error state, and confirmation email trigger.

### ME-2: Install react-helmet-async + per-page meta (3-4h)
```bash
pnpm add react-helmet-async
```
Wrap app in `<HelmetProvider>`. Add `<Helmet>` with unique title, description, canonical, OG tags, and Twitter cards to all 11 pages. Update homepage title to: `Perioskoup - AI Dental Companion App | Between-Visit Dental Care`

### ME-3: Migrate all grids to Tailwind responsive classes (4-6h)
Replace every `style={{ display: "grid", gridTemplateColumns: "..." }}` with Tailwind:
- Hero: `grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16`
- EFP Card: `grid grid-cols-1 md:grid-cols-2`
- Features Bento: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5`
- Team: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`
- How It Works: `grid grid-cols-1 md:grid-cols-3`
- Stats: `grid grid-cols-1 sm:grid-cols-3`
- Contact: `grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[60px]`
- About Mission: `grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20`
- Pricing: `grid grid-cols-1 sm:grid-cols-2 gap-5`

After fixing all grids, remove `body { overflow-x: hidden }` from index.css.

### ME-4: Route-level code splitting (2h)
```tsx
// App.tsx
const Features = React.lazy(() => import('./pages/Features'));
const Blog = React.lazy(() => import('./pages/Blog'));
// ... all 11 non-Home pages
// Wrap Router in <Suspense fallback={<div className="min-h-screen bg-[#0A171E]" />}>
```

### ME-5: Add form labels + aria-live regions (2h)
Add `<label htmlFor>` to all form inputs (or `sr-only` visually hidden labels). Add `role="status" aria-live="polite"` to all form success states. Add `RouteAnnouncer` component for SPA navigation.

### ME-6: Mobile nav drawer ARIA + animation (2h)
Add `role="dialog"`, `aria-modal="true"`, `aria-expanded` on hamburger, Escape key close, focus trap. Add CSS slide-in animation with staggered link reveals.

### ME-7: Create /ai-dental-companion landing page (3h)
Exact-match URL for the category keyword. 600 words, product-focused, link to features/waitlist. Target "AI dental companion", "dental AI app", "dental habit tracking app".

### ME-8: Fix hover state inconsistencies (1h)
Replace all inline `onMouseEnter`/`onMouseLeave` JS style mutations in Navbar, Footer, and Blog with CSS classes that use proper `transition` and `:hover` pseudo-selectors.

### ME-9: Add page transitions (1-2h)
CSS-only fade-in on route change using a `PageWrapper` component keyed on location. Or install Framer Motion with `AnimatePresence`.

### ME-10: Update llms.txt with blog URLs and Dr. Anca credentials (1h)
Full replacement provided in audit-results/02-geo-readiness.md section 10.

---

## STRATEGIC PLAYS (1-5 days each)

### SP-1: Implement prerendering for static HTML (1-2 days)
Install `vite-plugin-prerender` to generate static HTML per route at build time. This fully solves the SPA meta tag problem for all crawlers, including those that don't execute JS. Combined with react-helmet-async, this eliminates the entire class of SEO issues.

### SP-2: Build the comparison page at /compare (1 day)
Map Perioskoup against PerioPredict, CareStack, Dental Monitoring, Overjet, Pearl, Dentistry.AI. "Different category" table showing what each tool does and doesn't do. Targets competitor-adjacent SEO keywords and pre-empts the #1 sales objection.

### SP-3: Content cluster launch - 4 pillar pages + 8 articles (2-3 weeks)
- Pillar 1: /guides/periodontal-disease (consolidate existing + expand)
- Pillar 2: /guides/dental-habits (new)
- Pillar 3: /guides/ai-dentistry (new)
- Pillar 4: /guides/digital-dental-practice (B2B, new)
- First 8 spoke articles targeting: "why do gums bleed" (8.1k/mo), "interdental cleaning guide" (2.4k/mo), "how to brush with periodontal disease" (1.6k/mo), "what is a periodontist" (12k/mo), "signs of gum disease" (6.6k/mo), "AI for dentists" (2.4k/mo), "dental habit tracking app" (320/mo), "improve dental patient compliance" (720/mo)

### SP-4: EFP backlink activation (1 day outreach + follow-up)
Request EFP communications team update the award article with a direct hyperlink to perioskoup.com. Pitch BSP, SEPA, SIdP, SROP national societies with the award story for newsletter features. One DR 60 editorial backlink + 5-8 DR 35-55 association links.

### SP-5: Create /team/dr-anca-constantin standalone page (1 day)
Full credentials, publications, clinic affiliation, conference mentions, complete Person schema with LinkedIn sameAs. Serves as the canonical authority page for branded searches. Link from all blog posts authored by Dr. Anca.

### SP-6: Install and activate the test suite (2-3 days)
The testing agent wrote 1,492 lines of test code (6 Playwright E2E specs + 5 Vitest unit test files). Install `@playwright/test`, `@testing-library/react`, and `vitest`. Activate the pre-written tests. Set up GitHub Actions CI.

### SP-7: Programmatic SEO - city + condition pages (3-5 days)
- 6 city pages: /for-dentists/bucharest, /london, /madrid, /amsterdam, /berlin, /paris
- 6 condition pages: /conditions/gingivitis, /periodontitis, /gum-recession, /bleeding-gums, /dental-plaque, /bad-breath-gum-disease
- Template-driven, each 400-800 words, Dr. Anca byline on conditions, MedicalWebPage schema

---

## MOBILE-SPECIFIC FIXES

Every responsive issue found, with the exact Tailwind fix:

| Component | File:Line | Issue | Tailwind Fix |
|-----------|-----------|-------|-------------|
| Home Hero | Home.tsx:152 | 2-col grid, no stack | `grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16` |
| Home Hero Stats | Home.tsx:~180 | `flex gap-40`, no wrap | `flex flex-wrap gap-6 lg:gap-10` |
| Home EFP Card | Home.tsx:239 | 2-col, no stack | `grid grid-cols-1 md:grid-cols-2` |
| Home Features Bento | Home.tsx:296 | 3-col + span-2, overflows | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5` |
| Home How It Works | Home.tsx:341 | 3-col + decorative offset | `grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0` + hide SVG wave on mobile |
| Home Team | Home.tsx:410 | 3-col, cards unreadable | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5` |
| About EFP Card | About.tsx:72 | 2-col, no stack | `grid grid-cols-1 md:grid-cols-2` |
| About Mission | About.tsx:109 | 2-col + gap:80, overflows | `grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20` |
| About Team | About.tsx:152 | 3-col, cards unreadable | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5` |
| ForDentists Stats | ForDentists.tsx:96 | 3-col, text clips | `grid grid-cols-1 sm:grid-cols-3 gap-px` |
| ForDentists Bullets | ForDentists.tsx:134 | 2-col bullets, tight | `grid grid-cols-1 sm:grid-cols-2 gap-2` |
| Contact Layout | Contact.tsx:78 | 2-col + gap:60, form 140px | `grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[60px]` |
| Contact Name Fields | Contact.tsx:112 | 2-col name inputs | `grid grid-cols-1 sm:grid-cols-2 gap-3` |
| Pricing Plans | Pricing.tsx:111 | 2-col, no stack | `grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[800px] mx-auto` |
| Waitlist Name Fields | Waitlist.tsx:86 | 2-col, inputs 140px | `grid grid-cols-1 sm:grid-cols-2 gap-3` |
| Waitlist Social Proof | Waitlist.tsx:116 | flex gap-32, no wrap | `flex flex-wrap gap-6 justify-center` |
| Blog Article Row | Blog.tsx:192 | flex row, crowded | `flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6` |
| Blog Newsletter Input | Blog.tsx:244 | minWidth:220px, overflows | Remove minWidth, use `p-input flex-1` |
| Hamburger Button | Navbar.tsx:101 | 38x38px, below 44px min | `w-11 h-11` (44x44px) |
| Section Padding | All pages | 120px fixed, wastes 36% viewport | `padding: clamp(48px, 8vw, 120px) 0` |
| 100vh Hero | Home.tsx:143 | iOS Safari bottom bar | Replace `100vh` with `100svh` |
| body overflow-x | index.css:96 | Masks real overflow bugs | Remove after fixing all grids |

---

## COMPLETE SCHEMA FIXES

Corrected JSON-LD is provided per page in the individual audit files. Key fixes:

### index.html (Global @graph)
Full replacement in `audit-results/02-geo-readiness.md` Section A. Key changes:
- Organization: add `legalName: "Perioskoup SRL"`, `foundingDate: "2025-06"`, `foundingLocation`, correct `founders` array with `@id` references
- Person (Dr. Anca): add `honorificPrefix`, `description`, `image`, `knowsAbout`, `hasOccupation`
- SoftwareApplication: add `offers` (PreOrder, EUR 0), `featureList`

### BlogPost.tsx (Author @id linkage)
Conditionally link Dr. Anca articles to the global Person entity:
```typescript
const authorSchema = article.author === "Dr. Anca Laura Constantin"
  ? { "@type": "Person", "@id": "https://perioskoup.com/#anca-constantin", ... }
  : { "@type": "Person", "name": article.author, ... };
```

### About.tsx (Add FAQPage)
4-question FAQPage schema: "Who founded Perioskoup?", "What award did Perioskoup win?", "Where is Perioskoup based?", "What is Perioskoup's mission?"
Full JSON-LD in `audit-results/02-geo-readiness.md` Section B.

### Blog.tsx (Add ItemList + FAQPage)
ItemList with all 6 article entries + 2-question FAQPage.
Full JSON-LD in `audit-results/02-geo-readiness.md` Section C.

### Contact.tsx (Fix LocalBusiness -> Organization)
Replace `LocalBusiness` with `Organization` using `@id` reference. Link founders via `@id`.
Full JSON-LD in `audit-results/02-geo-readiness.md` Section E.

### All Blog Posts (Add dateModified)
Add `"dateModified"` field to all BlogPosting schemas.

### Future: Add MedicalWebPage to Dr. Anca posts
```json
{ "@type": "MedicalWebPage", "about": { "@type": "MedicalCondition", "name": "Periodontal Disease" }, "reviewedBy": { "@id": "https://perioskoup.com/#anca-constantin" } }
```

---

## 2-WEEK SPRINT PLAN

### Day 1 (Monday) - CRITICAL FIXES
- [ ] Remove `maximum-scale=1` from viewport meta (5 min)
- [ ] Fix "CEO" -> "CDO" in About.tsx (5 min)
- [ ] Fix "product designer" -> "AI specialist" in Home.tsx (5 min)
- [ ] Fix geo.region from GB to RO (5 min)
- [ ] Fix 3 regulatory term violations (15 min)
- [ ] Fix footer contrast (#234966 -> #8C9C8C) (15 min)
- [ ] Fix breadcrumb contrast (#6B7F7B -> #8C9C8C) (15 min)
- [ ] Add prefers-reduced-motion CSS (30 min)
- [ ] Add skip-to-main-content link (30 min)
- [ ] Add focus-visible styles, remove outline:none (1h)
- [ ] Fix phone mockup float/reveal conflict (10 min)

### Day 2 (Tuesday) - FORMS (THE P0)
- [ ] Set up Loops.so or Mailchimp API account
- [ ] Create Vercel serverless function for form submission
- [ ] Wire Waitlist form to API (email + name + role + clinic)
- [ ] Wire Contact form to API
- [ ] Wire Home WaitlistForm to API
- [ ] Wire Blog newsletter Subscribe to API
- [ ] Add loading spinner state to all forms
- [ ] Add error state UI to all forms
- [ ] Add success state with aria-live region

### Day 3 (Wednesday) - SEO META
- [ ] Install react-helmet-async
- [ ] Add HelmetProvider to main.tsx
- [ ] Add Helmet to Home (title: "Perioskoup - AI Dental Companion App | Between-Visit Dental Care")
- [ ] Add Helmet to Features, ForDentists, About, Blog, Pricing
- [ ] Add Helmet to Waitlist, Contact, Privacy, Terms
- [ ] Add Helmet to BlogPost (dynamic per article using metaTitle/metaDescription)
- [ ] Add noindex to Privacy, Terms
- [ ] Update Twitter card descriptions to 140+ chars

### Day 4 (Thursday) - MOBILE RESPONSIVE (Part 1)
- [ ] Migrate Home hero grid to Tailwind responsive
- [ ] Migrate Home EFP card grid
- [ ] Migrate Home features bento grid
- [ ] Migrate Home How It Works grid (hide SVG wave on mobile)
- [ ] Migrate Home team grid
- [ ] Migrate Home stats row to flex-wrap
- [ ] Replace 100vh with 100svh on hero sections
- [ ] Replace section padding with clamp()

### Day 5 (Friday) - MOBILE RESPONSIVE (Part 2)
- [ ] Migrate About EFP card, mission, team grids
- [ ] Migrate ForDentists stats, bullet grids
- [ ] Migrate Contact layout + name fields
- [ ] Migrate Pricing plans grid
- [ ] Migrate Waitlist name fields + social proof
- [ ] Migrate Blog article rows + newsletter input
- [ ] Increase hamburger to 44x44px
- [ ] Remove body overflow-x: hidden
- [ ] Test all pages at 320px, 375px, 414px, 768px

### Day 6 (Monday) - PERFORMANCE + A11Y
- [ ] Add React.lazy() + Suspense for all non-Home routes
- [ ] Add loading="lazy" + width/height to all below-fold images
- [ ] Add preconnect for CloudFront CDN
- [ ] Add preload for hero background image
- [ ] Convert hero-bg PNG to WebP
- [ ] Add form labels (htmlFor/id) to all inputs
- [ ] Add RouteAnnouncer for SPA navigation
- [ ] Add aria-hidden to ticker, decorative SVGs, PhoneMockup
- [ ] Add aria-expanded + role="dialog" to mobile nav

### Day 7 (Tuesday) - SCHEMA + GEO
- [ ] Update index.html @graph with enriched Organization, Person, SoftwareApplication
- [ ] Fix BlogPosting author @id linkage
- [ ] Add FAQPage schema to About page
- [ ] Add ItemList + FAQPage schema to Blog index
- [ ] Fix Contact schema (Organization, not LocalBusiness)
- [ ] Add dateModified to all BlogPosting schemas
- [ ] Update llms.txt with blog URLs, Dr. Anca credentials, EFP link
- [ ] Add missing AI crawlers to robots.txt (Cohere-AI, Bytespider)

### Day 8 (Wednesday) - CONTENT + COMPETITIVE
- [ ] Create /ai-dental-companion landing page
- [ ] Add hero subhead explaining product category on Home
- [ ] Add "from 39/mo" to Pricing clinic card
- [ ] Move "30+ founding clinics" stat to Home hero
- [ ] Add source labels to all stats ("beta data, 2025")
- [ ] Add waitlist CTA to 404 page
- [ ] Standardize CTA labels to "Join the Waitlist"

### Day 9 (Thursday) - ANIMATIONS + POLISH
- [ ] Fix JS hover states -> CSS classes (Navbar, Footer, Blog)
- [ ] Add page transition (CSS fade-in on route change)
- [ ] Add mobile menu slide-in animation with staggered links
- [ ] Replace text-shadow with filter: drop-shadow in glow-pulse
- [ ] Add image loading fade-in for hero bg + PhoneMockup
- [ ] Add Escape key close to mobile drawer
- [ ] Increase dot-grid opacity from 0.35 to 0.55

### Day 10 (Friday) - TESTING + CLEANUP
- [ ] Install @playwright/test and @testing-library/react
- [ ] Activate pre-written Playwright E2E tests (6 spec files)
- [ ] Activate pre-written Vitest unit tests (5 test files)
- [ ] Run full test suite, fix any failures
- [ ] Remove 15+ unused packages from package.json
- [ ] Extract useReveal to shared hook (replace 9 copies)
- [ ] Extract CDN image URLs to shared constants
- [ ] Add componentDidCatch to ErrorBoundary
- [ ] Hide stack trace in production ErrorBoundary
- [ ] Remove stale HeroGlow import from NotFound.tsx

---

## IF YOU ONLY DO 3 THINGS

### 1. WIRE THE FORMS (Day 2 above)
Nothing else matters if you can't capture a single email address. Connect all forms to Loops.so or Mailchimp API with a Vercel serverless function. Add error states. This is the difference between a landing page and a brochure.

**Impact:** Without this, every marketing dollar spent driving traffic to this site is wasted.
**Effort:** 2-3 hours.

### 2. FIX THE SPA META TAGS (Day 3 above)
Install react-helmet-async. Add per-page title, description, canonical, and OG tags. Update the homepage title to include "AI dental companion". Without this, Google sees every page as a duplicate of the homepage and no secondary page can rank.

**Impact:** Unlocks independent ranking for /features, /for-dentists, /about, /blog, and all 6 blog posts.
**Effort:** 3-4 hours.

### 3. MAKE IT WORK ON MOBILE (Days 4-5 above)
Replace all 11 hardcoded grid layouts with Tailwind responsive classes. This is a systematic find-and-replace of inline `gridTemplateColumns` with `className="grid grid-cols-1 ..."`. The site is currently unusable on phones, which are 60%+ of traffic.

**Impact:** Site goes from broken to functional for the majority of visitors.
**Effort:** 4-6 hours across 2 focused sessions.

**Total for all 3: ~10-13 hours. This takes the site from 54/100 to an estimated 72-78/100.**

---

## WHAT THE SITE DOES WELL (PRESERVE THESE)

1. **"Between visits, we take over."** - The strongest single piece of copy on the site. Ownable, specific, category-defining.
2. **EFP Award placement** - Prominent, linked, jury names cited. The best third-party validation a pre-launch startup could have.
3. **Blog content quality** - Dr. Anca's authored articles are genuinely credible. A real periodontist writing substantively about her specialty is rare.
4. **CTA animated canvas** - Pure CSS, 5 gradient orbs, grid pulse, rising particles. Technically impressive.
5. **Brand color system** - #0A171E / #C0E57A / #F5F9EA is distinctive, premium, and consistently applied.
6. **robots.txt AI crawler coverage** - All 6 major AI crawlers explicitly allowed. Best-in-class.
7. **Blog answer capsule pattern** - Keyed to H2 headings, correct for AI extraction.
8. **Ken Burns hero background** - 24s ease-in-out infinite loop, restrained and atmospheric.
9. **Container/spacing system** - 24px mobile, 40px desktop padding is correct.
10. **TypeScript strict mode** - Zero `any` types in custom code. Clean.

---

## INDIVIDUAL AUDIT FILES

| File | Score | Lines |
|------|-------|-------|
| `audit-results/01-seo-technical.md` | 4.5/10 | 692 |
| `audit-results/02-geo-readiness.md` | 6.5/10 | 666 |
| `audit-results/03-content-quality.md` | 6.8/10 | 378 |
| `audit-results/04-conversion-ux.md` | 6.1/10 | 431 |
| `audit-results/05-mobile-responsive.md` | 4.5/10 | 809 |
| `audit-results/06-competitive-positioning.md` | 5.5/10 | 235 |
| `audit-results/07-about-team.md` | 5.0/10 | 252 |
| `audit-results/08-animations-visual.md` | 5.5/10 | 591 |
| `audit-results/09-code-performance.md` | 5.0/10 | 285 |
| `audit-results/10-accessibility.md` | 4.0/10 | 868 |
| `audit-results/11-niche-domination.md` | 6.5/10 | 444 |
| `audit-results/12-testing-reliability.md` | 5.0/10 | 382 |
| **FINAL-AUDIT.md** | **54/100** | **this file** |

---

*Generated 2026-03-06 by 12 specialist audit subagents + orchestration synthesis.*
*Total audit tokens: ~1.1M across 12 parallel agents.*
