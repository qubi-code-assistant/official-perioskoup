# Perioskoup Technical Audit — 2026-03-20

## Executive Summary

The site is **well-built overall** — code-split routing, lazy PostHog, self-hosted fonts with preloads, comprehensive JSON-LD, and solid accessibility foundations. The issues below are refinements, not rewrites.

**Critical (3)** · **High (6)** · **Medium (9)** · **Low (7)**

---

## 1. Performance

### 1.1 Bundle Analysis (pnpm build output)

| Chunk | Raw | Gzip | Notes |
|-------|-----|------|-------|
| index.js (main) | 283 KB | 87 KB | React + ReactDOM + wouter + helmet + app shell |
| radix-ui.js | 46 KB | 17 KB | Auto-split Radix vendor chunk |
| sonner.js | 34 KB | 10 KB | **Lazy but never used** |
| BlogPost.js | 66 KB | 21 KB | Largest page — inline article content |
| CSS (single) | 106 KB | 19 KB | All Tailwind + custom — single chunk |
| **Total JS** | **~550 KB** | **~170 KB** | Acceptable for SPA |

**Verdict:** Bundle is healthy. Main concern is dead weight from sonner + unused Radix/shadcn.

### 1.2 Unused Dependencies — CRITICAL

**Sonner (34 KB gzip 10 KB):** Loaded lazily in `App.tsx:5-6` but `toast()` is **never called anywhere** in the codebase. Pure dead weight.

- `client/src/App.tsx:5-6` — lazy import of Toaster
- `client/src/App.tsx:119` — renders `<Toaster />`
- `client/src/components/ui/sonner.tsx` — wrapper file
- **Action:** Remove sonner from dependencies, delete `components/ui/sonner.tsx`, remove from App.tsx

**Unused shadcn/ui components (44 files in components/ui/, most never imported):**
Only 2 are imported outside `components/ui/`: `sonner` and `tooltip` (both in App.tsx).

Unused UI components that ship Radix deps in package.json:
`accordion`, `alert-dialog`, `aspect-ratio`, `avatar`, `checkbox`, `collapsible`, `context-menu`, `dialog`, `dropdown-menu`, `hover-card`, `label`, `menubar`, `navigation-menu`, `popover`, `progress`, `radio-group`, `scroll-area`, `select`, `separator`, `slider`, `switch`, `tabs`, `toggle`, `toggle-group`

These are tree-shaken from JS but their **Radix packages bloat node_modules and slow installs**.

- **Action:** Remove unused `@radix-ui/*` packages from `package.json`. Keep only `@radix-ui/react-tooltip` and `@radix-ui/react-slot`.

### 1.3 Images — HIGH

**Headshot JPGs not converted to WebP:**
- `client/public/images/anca-headshot.jpg` (19 KB) — used on Home:385, ForDentists:214, About:252, BlogPost:877
- `client/public/images/eduard-headshot.jpg` (44 KB) — used on Home
- `client/public/images/eduard-formal.jpg` (31 KB) — used on About
- `client/public/images/og-image.jpg` (120 KB) — OG image, fine as JPG for social crawlers

**Background images are WebP** ✅ (hero-bg 16KB, efp-award 32KB, features-bg 96KB, cta-bg 32KB)

**All non-hero images use `loading="lazy" decoding="async"`** ✅
**Hero image uses `fetchPriority="high" decoding="sync"`** ✅ with preload in index.html ✅

- **Action:** Convert headshots to WebP with `<picture>` fallback or just replace (all modern browsers support WebP). Save ~30-40% file size.

### 1.4 Font Loading — EXCELLENT ✅

- Self-hosted woff2 in `/fonts/`
- Latin subset preloaded: `client/index.html:82-83`
- Latin-ext loads on demand via `@font-face` with `font-display: swap`: `client/src/index.css:25-66`
- Only 2 preloads (dongle-700-latin, gabarito-latin) — no excess

### 1.5 CSS — GOOD

- Tailwind v4 with `@tailwindcss/vite` plugin — purging is automatic ✅
- Single CSS chunk (106 KB raw, 19 KB gzip) — acceptable
- **Note:** `tailwindcss-animate` and `tw-animate-css` are both in dependencies — possible duplicate. Check if both are needed.

### 1.6 PostHog — EXCELLENT ✅

- Dynamic `import("posthog-js")` only when env key exists: `client/src/lib/analytics.ts:22`
- Deferred to `requestIdleCallback`: `client/src/lib/analytics.ts:46`
- DNS-prefetch in index.html: `client/index.html:77-78`
- Never blocks TTI/TBT

### 1.7 Pre-render Shell — EXCELLENT ✅

- `client/index.html` has a full pre-render shell with hero image, h1, CTAs
- Gives Lighthouse an LCP element before JS loads

---

## 2. SEO

### 2.1 Per-Page Meta Tags — EXCELLENT ✅

Every page has via `react-helmet-async`:
- ✅ `<title>` — unique per page
- ✅ `<meta name="description">` — unique per page
- ✅ `<link rel="canonical">` — correct absolute URL
- ✅ `og:title`, `og:description`, `og:url`, `og:type`, `og:image`
- ✅ `twitter:card`, `twitter:image` (in index.html defaults)

**Missing on Privacy/Terms:** `og:image` not set — will fall back to index.html default which is fine.

### 2.2 Heading Hierarchy — GOOD

Every page has a single `<h1>`. Sub-sections use `<h2>` and `<h3>` appropriately.
- `Home.tsx:126` — h1 "Between visits, we take over"
- `Features.tsx:112` — h1
- `ForDentists.tsx:137` — h1
- All pages follow h1 → h2 → h3 without skipping levels ✅

### 2.3 Structured Data (JSON-LD) — EXCELLENT ✅

**Global (index.html):** `@graph` with WebSite, Organization, Person (Dr. Anca), SoftwareApplication
**Per-page:**
- Home: Organization + FAQ
- Features: FAQ + SoftwareApplication
- ForDentists: Service + FAQ  
- Pricing: FAQ + Product
- About: Person + Organization + FAQ
- Blog: CollectionPage + BreadcrumbList
- BlogPost: Article + BreadcrumbList
- Contact: Organization + FAQ
- Waitlist: FAQ

### 2.4 Sitemap — MEDIUM ISSUE

**Missing pages from sitemap.xml:**
- `/waitlist` — high-priority conversion page, MUST be in sitemap
- `/privacy` — legal page, should be indexed
- `/terms` — legal page, should be indexed

`client/public/sitemap.xml` — add these 3 URLs.

**All `lastmod` dates are 2026-03-06** for core pages — consider automating via build step.

### 2.5 robots.txt — EXCELLENT ✅

- All crawlers allowed, AI bots explicitly allowed
- Sitemap referenced
- llms.txt and llms-full.txt referenced
- `/api/*` correctly disallowed

### 2.6 llms.txt — EXCELLENT ✅

Comprehensive, well-structured, follows llmstxt.org spec. Includes product info, team, features, blog links, permissions for AI citation.

### 2.7 Internal Linking — GOOD

- Navbar links to all main pages
- Footer has comprehensive link grid
- Blog posts link to related articles
- CTAs consistently link to `/waitlist`

### 2.8 Core Web Vitals Prediction

- **LCP:** Excellent — hero-bg.webp preloaded (16KB), pre-render shell provides instant LCP
- **FID/INP:** Good — no heavy JS on interaction, PostHog deferred
- **CLS:** Good — images have explicit width/height, fonts use swap
- **TBT:** Good — route-level code splitting, lazy Suspense boundaries

### 2.9 Missing: hreflang on SPA pages — LOW

The `index.html` has hreflang for homepage, and sitemap has hreflang for all pages. But `react-helmet-async` Helmet blocks don't include `<link rel="alternate" hreflang>`. Since this is a single-language site, this is low priority.

---

## 3. Accessibility (WCAG 2.1 AA)

### 3.1 Color Contrast — ONE ISSUE

| Combination | Ratio | AA Normal (4.5:1) | AA Large (3:1) |
|-------------|-------|--------------------|-----------------|
| #F5F9EA on #0A171E | 17.00:1 | ✅ PASS | ✅ PASS |
| #8C9C8C on #0A171E | 6.28:1 | ✅ PASS | ✅ PASS |
| #C0E57A on #0A171E | 12.76:1 | ✅ PASS | ✅ PASS |
| #F5F9EA on #1D3449 | 11.97:1 | ✅ PASS | ✅ PASS |
| **#8C9C8C on #1D3449** | **4.42:1** | ❌ **FAIL** | ✅ PASS |

**MEDIUM:** Muted text (#8C9C8C) on surface cards (#1D3449) fails AA for normal text. Used in card descriptions, form labels.
- Appears in: label styles across Contact.tsx:162, Waitlist form labels
- **Action:** Lighten muted to ~#9DB09D (5.0:1) or darken surface when muted text is used at body size.

### 3.2 Skip Navigation — EXCELLENT ✅

- `App.tsx:117` — `<a href="#main-content" className="skip-link">Skip to main content</a>`
- `index.css:136-167` — visually hidden, appears on focus
- Every page has `id="main-content"` on first `<section>`

### 3.3 Focus Indicators — EXCELLENT ✅

- `index.css:181-183` — global `*:focus-visible { outline: 2px solid #C0E57A; outline-offset: 2px }`
- Custom focus styles for buttons: `index.css:710-766`
- Input focus styles: `index.css:860`

### 3.4 Landmarks — MEDIUM ISSUE

- `<nav>` present in Navbar.tsx:88 ✅
- `<footer>` present in Footer.tsx:29 ✅
- **Missing `<main>` element** — pages use `<section id="main-content">` instead of `<main id="main-content">`
- **Missing `<header>` element** — Navbar is a `<nav>` but not wrapped in `<header>`

Screen readers rely on `<main>` landmark for page content. The `<section>` with `id="main-content"` works for skip-link focus but doesn't register as a landmark.

- **Action:** Wrap page content in `<main id="main-content">` (could be in App.tsx Router). Wrap Navbar in `<header>`.
- Files: All pages in `client/src/pages/*.tsx` — the `<section id="main-content">` elements
- `client/src/components/Navbar.tsx:88` — `<nav>` should be inside `<header>`

### 3.5 Route Announcements — EXCELLENT ✅

- `App.tsx:58-76` — `RouteAnnouncer` component with `aria-live="polite"`
- Focus moves to `#main-content` on route change
- Deferred title read for react-helmet-async timing

### 3.6 Form Accessibility — EXCELLENT ✅

- All inputs have `<label htmlFor>` associations
- `aria-required`, `aria-invalid`, `aria-describedby` for error states
- Contact.tsx:162-191 and Waitlist.tsx:136-154 — comprehensive

### 3.7 prefers-reduced-motion — GOOD

- Global CSS media query: `index.css:1105` — `@media (prefers-reduced-motion: reduce)`
- ParallaxHeroBg checks: `ParallaxHeroBg.tsx:11`
- useReveal hook checks: `hooks/useReveal.ts:12`
- Home counter animation checks: `pages/Home.tsx:6`

**62 animation/keyframe declarations** exist in CSS — the `prefers-reduced-motion: reduce` block at line 1105 should disable all of them. Verify it covers `ken-burns`, `page-enter`, and all custom keyframes.

### 3.8 ARIA on Interactive Elements — GOOD

- Navbar hamburger: `aria-label={menuOpen ? 'Close menu' : 'Open menu'}` — `Navbar.tsx:153`
- Mobile nav panel: `aria-label="Navigation menu"` — `Navbar.tsx:174`
- Logo link: `aria-label="Perioskoup home"` — `Navbar.tsx:112`
- Waitlist role selector: `role="group" aria-label="Select your role"` — `Waitlist.tsx:109`

---

## 4. Responsive Design

### 4.1 Viewport & Fluid Typography — GOOD

- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` ✅
- Headings use `clamp()` throughout — e.g. `fontSize: "clamp(56px, 7vw, 88px)"`
- Body text at 16px+ (Gabarito at 16-18px) — no iOS zoom trigger ✅

### 4.2 Mobile Navigation — Present

- Navbar.tsx has hamburger menu for mobile
- Mobile menu overlay with `aria-label` ✅

### 4.3 Touch Targets — MEDIUM

- CTA buttons use `padding: 16px 32px` — adequate ✅
- Navbar hamburger at `Navbar.tsx:153` — verify it's ≥44×44px
- Blog post cards and FAQ accordions — check tap area is sufficient on mobile

### 4.4 Container & Layout — GOOD

- `max-width: 1200px` with `margin: 0 auto` throughout
- `padding: 0 1.5rem` (24px) side padding — adequate for mobile
- Grid layouts use `grid-cols-1 sm:grid-cols-2` responsive patterns

### 4.5 Images — GOOD

- Hero image: `width: 100%; height: 100%; objectFit: cover` ✅
- Headshots: explicit width/height dimensions ✅
- No horizontal scroll issues detected in layout code

---

## 5. Priority Action Items

### CRITICAL (fix before launch)

1. **Remove sonner** — 34 KB dead weight, never used
   - `package.json`, `App.tsx:5-6,119`, `components/ui/sonner.tsx`

2. **Add `<main>` landmark** — screen readers can't find page content
   - All pages: change `<section id="main-content">` to `<main id="main-content" role="main">`
   - Or add wrapper in Router (App.tsx)

3. **Add /waitlist to sitemap.xml** — primary conversion page missing from sitemap

### HIGH

4. **Remove unused Radix packages** from package.json (24 unused packages)
5. **Convert headshot JPGs to WebP** — anca-headshot.jpg, eduard-headshot.jpg, eduard-formal.jpg
6. **Fix #8C9C8C on #1D3449 contrast** — fails AA normal text (4.42:1 < 4.5:1)
7. **Add `<header>` wrapper** around Navbar
8. **Add /privacy and /terms to sitemap.xml**
9. **Verify prefers-reduced-motion covers ALL 62 animation declarations** in index.css

### MEDIUM

10. Check `tailwindcss-animate` vs `tw-animate-css` — possible duplicate dependency
11. Add `aria-current="page"` to active nav links in Navbar.tsx
12. Touch target audit on mobile — hamburger, FAQ toggles, blog cards
13. BlogPost.tsx at 66 KB — consider extracting article data to JSON/MDX files

### LOW

14. Add unique OG images per blog post (all share og-image.jpg)
15. Automate sitemap `lastmod` dates in build pipeline
16. Consider preloading critical above-fold images on sub-pages (features-bg, cta-bg)
17. Delete 42 unused shadcn/ui component files from `components/ui/`

---

## 6. What's Already Excellent

- ✅ Route-level code splitting with React.lazy
- ✅ Self-hosted fonts with strategic preloads
- ✅ PostHog deferred to requestIdleCallback
- ✅ Pre-render shell in index.html for instant LCP
- ✅ Comprehensive JSON-LD structured data on every page
- ✅ Complete OG + Twitter Card meta on every page
- ✅ Skip navigation link + route announcer for screen readers
- ✅ Form accessibility with proper labels + ARIA states
- ✅ Global focus-visible indicators
- ✅ prefers-reduced-motion handling in CSS + JS
- ✅ llms.txt + llms-full.txt + noscript content for AI crawlers
- ✅ All images have explicit dimensions (no CLS)
- ✅ Hero image preloaded with fetchpriority="high"
- ✅ robots.txt AI-bot friendly with llms.txt reference
- ✅ RSS feed linked in `<head>`
