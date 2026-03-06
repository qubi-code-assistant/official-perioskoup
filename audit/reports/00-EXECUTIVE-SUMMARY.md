# Perioskoup Website Audit — Executive Summary

**Date:** 2026-03-06
**Audited by:** 6 specialist Claude Opus 4.6 agents
**Scope:** perioskoup.com — full codebase audit against strategy-reference.md
**Reports:** 01-content-messaging, 02-technical-seo, 03-user-journey-ux, 04-geo-readiness, 05-schema-structured-data, 06-positioning-story

---

## 1. Overall Scores

| Dimension | Grade | Score | Key Gap |
|-----------|-------|-------|---------|
| Content & Messaging | C+ | 5.5/10 | For Dentists page is a conversion dead zone |
| Technical SEO | C | 5.8/10 | No SSR/pre-rendering; non-JS crawlers see homepage meta everywhere |
| User Journey & UX | C- | 5/10 | Forms don't submit; Home page grids break on mobile |
| GEO Readiness | B+ | 7.5/10 | Blog is best-in-class; static pages lack answer capsules |
| Schema & Structured Data | B | 7/10 | Strong foundation; Dr. Anca schema incomplete |
| Competitive Positioning | B- | 6/10 | Zero differentiation; category asserted but never defined |
| **Overall** | **C+** | **6.1/10** | |

---

## 2. Top 10 Critical Fixes (Priority Order)

### 1. FORMS DON'T SUBMIT — All leads are lost
**Severity:** P0 BLOCKING | **Report:** UX #8.1
All three forms (Home waitlist, Waitlist page, Contact page) call `setSubmitted(true)` without sending data anywhere. Every "signup" is discarded.
- `client/src/pages/Home.tsx:102-114` (WaitlistForm)
- `client/src/pages/Waitlist.tsx:52-58`
- `client/src/pages/Contact.tsx:50-56`
- `client/src/pages/Blog.tsx:306-317` (newsletter — no handler at all)

**Fix:** Integrate Formspree, Vercel serverless function, or Mailchimp. This is the single highest-priority fix.

### 2. HOME PAGE GRIDS BREAK ON MOBILE
**Severity:** P0 BLOCKING | **Report:** UX #4.1–4.4
Four sections use hard-coded `gridTemplateColumns: "repeat(3, 1fr)"` or `"1fr 1fr"` with zero responsive fallback:
- `Home.tsx:318` — EFP Award card (1fr 1fr)
- `Home.tsx:375` — Bento feature grid (repeat(3, 1fr))
- `Home.tsx:417` — How It Works (repeat(3, 1fr))
- `Home.tsx:481` — Team section (repeat(3, 1fr))

**Fix:** Replace inline grid styles with Tailwind responsive classes (`grid-cols-1 md:grid-cols-3`).

### 3. NO SSR / PRE-RENDERING — SPA kills meta for non-JS crawlers
**Severity:** CRITICAL | **Report:** SEO #CRIT-01, #CRIT-04
Every route serves the same `index.html`. Bing, social bots, and most AI scrapers see homepage meta tags for all pages. Canonical URLs all point to `/` for non-JS crawlers.
- `vite.config.ts` — no prerender plugin
- `vercel.json:14` — all routes rewrite to index.html

**Fix:** Install `vite-plugin-prerender` to generate static HTML at build time for all routes.

### 4. FOR DENTISTS PAGE OVERHAUL — Primary B2B page is the weakest on the site
**Severity:** CRITICAL | **Reports:** Content #3.1, #7.1–7.4; Competitive #1, #3, #7; UX #2.2
The page that dentists (paying customers) land on has:
- Zero trust signals (no EFP award, no clinic count, no Dr. Anca)
- Zero ROI messaging (no revenue impact, no time savings)
- Zero competitive positioning (no differentiation from PMS portals)
- No problem articulation before solution
- No founding story or clinical authority
- `client/src/pages/ForDentists.tsx` — entire file needs restructuring

**Fix:** Add trust signals section, ROI calculator/framing, Dr. Anca quote, problem-first narrative, competitive positioning block.

### 5. ANSWER CAPSULES MISSING FROM STATIC PAGES
**Severity:** CRITICAL | **Reports:** Content #8.1; GEO #5
Blog posts have perfect answer capsules (100% coverage, 37 total). Static pages have zero. This severely limits AI engine extraction from the main conversion pages.
- `Home.tsx` — 4 H2s with no capsules
- `Features.tsx` — H2s with no capsules
- `ForDentists.tsx` — 2 H2s with no capsules
- `About.tsx` — 3 H2s with no capsules
- `Pricing.tsx` — H2 with no capsule

**Fix:** Add 1-2 sentence summary paragraphs after every H2, styled consistently with blog capsule pattern (lime-green left border).

### 6. OG:IMAGE + TWITTER CARD TAGS MISSING ON 9/10 PAGES
**Severity:** HIGH | **Report:** SEO #HIGH-01, #HIGH-02, #HIGH-03, #HIGH-04
Only BlogPost has og:image and twitter:image. All other pages rely on index.html fallback which (a) uses a relative URL and (b) doesn't work without JS execution.

**Fix:** Add `og:image`, `twitter:card`, `twitter:image` with absolute URLs (`https://perioskoup.com/images/og-image.jpg`) to every page's `<Helmet>` block.

### 7. "AI DENTAL COMPANION" CATEGORY NOT OWNED
**Severity:** HIGH | **Reports:** Content #10.1; Competitive #2
The category-creation phrase appears on only 3/10 pages. It is asserted but never defined — no section explains what an "AI dental companion" is or why it's a new category.
- Footer says "personal dental companion" (omits "AI") — `Footer.tsx:49-51`
- For Dentists, About, Pricing, Blog, Contact pages: zero mentions

**Fix:** (a) Add category definition section to Home page, (b) add phrase to all page copy + meta, (c) update Footer tagline, (d) write definitional blog post.

### 8. ZERO COMPETITIVE DIFFERENTIATION
**Severity:** CRITICAL | **Report:** Competitive #1
No mention of competitors, alternative categories, or what makes Perioskoup different from PMS portals, Dental Monitoring, or CareStack. A dentist evaluating the product has no "why this over what I already have" answer.

**Fix:** Add a "Why Perioskoup?" section to For Dentists page positioning against categories (not naming competitors). Add a distancing line to the Home page.

### 9. DR. ANCA SCHEMA INCOMPLETE
**Severity:** CRITICAL/HIGH | **Reports:** SEO #CRIT-02; Schema #4.1–4.6
Person schema is missing: Physician type, medicalSpecialty, ORCID, Google Scholar, EFP memberOf. Image URLs are relative.
- `index.html:119-148`
- `About.tsx:40-57`

**Fix:** Add `["Person", "Physician"]` type, `medicalSpecialty`, `memberOf` EFP, absolute image URL. Obtain ORCID/Scholar URLs from Dr. Anca.

### 10. NO INDEXNOW INTEGRATION
**Severity:** CRITICAL | **Report:** SEO #CRIT-03
Zero IndexNow references in the codebase. New content and deployments are not pinged to Bing/Yandex for instant indexing.

**Fix:** Generate IndexNow API key, place key file in public/, create GitHub Action to submit URLs after deployment.

---

## 3. Quick Wins (Under 1 Hour Each)

| # | Fix | File(s) | Time |
|---|-----|---------|------|
| 1 | Add `og:image`, `twitter:card`, `twitter:image` to all Helmet blocks | All pages in `pages/` | 30 min |
| 2 | Make all JSON-LD image URLs absolute | `index.html`, `About.tsx`, `BlogPost.tsx` | 15 min |
| 3 | Add `contactPoint` to Organization schema | `index.html` | 10 min |
| 4 | Add `medicalSpecialty` + `memberOf` EFP to Person schema | `index.html` | 10 min |
| 5 | Update Footer tagline: "Your AI dental companion" | `Footer.tsx:49-51` | 2 min |
| 6 | Add "Contact" and "Pricing" to NAV_LINKS | `Navbar.tsx:12-17` | 5 min |
| 7 | Fix Home page grids with Tailwind responsive classes | `Home.tsx:318,375,417,481` | 30 min |
| 8 | Default waitlist role to "patient" instead of "dentist" | `Waitlist.tsx:34` | 1 min |
| 9 | Add `noindex` Helmet to 404 page | `NotFound.tsx` | 5 min |
| 10 | Add GoogleOther, CCBot, Applebot-Extended to robots.txt | `public/robots.txt` | 5 min |
| 11 | Expand X-Llms-Txt header to all routes | `vercel.json` | 5 min |
| 12 | Align Contact.tsx Organization sameAs with global | `Contact.tsx:79-82` | 5 min |
| 13 | Hide SVG wave on mobile | `Home.tsx:413` | 2 min |

---

## 4. Content Gaps — Strategy vs. Reality

| Strategy Requirement | Status | Where Missing |
|---------------------|--------|---------------|
| Answer capsules after every H2 | Blog: 100%. Static pages: 0% | Home, Features, ForDentists, About, Pricing |
| "AI dental companion" on every page | 3/10 pages | ForDentists, About, Pricing, Blog, Contact |
| Dr. Anca quote on every clinical page | Home only | ForDentists, About |
| ROI messaging for dentists | Absent | ForDentists |
| Competitive positioning | Absent | ForDentists, Home |
| "Why now" narrative | Absent | About, ForDentists |
| Problem-before-solution structure | Inverted on Home | Home, ForDentists |
| Patient testimonials/scenarios | Absent | All pages |
| Urgency/scarcity messaging | Absent | ForDentists, Waitlist |
| ORCID + Google Scholar links | Absent | Schema, About, llms.txt |
| Specific stat citations | Vague ("digital health research") | Home, ForDentists, About |
| Category definition content | Absent | Home (no "What is an AI dental companion?" section) |
| Founding story on main pages | Blog post only (buried) | Home, ForDentists, About |

---

## 5. Schema Checklist

| Schema | Required | Present | Valid | Gaps |
|--------|----------|---------|-------|------|
| SoftwareApplication | Yes | Yes | Yes | Missing `screenshot`, `aggregateRating` (defer to launch) |
| Organization | Yes | Yes | Yes | Missing `contactPoint` |
| Person/Physician (Dr. Anca) | Yes | Person only | Partial | Missing Physician type, medicalSpecialty, ORCID, Scholar, EFP memberOf |
| FAQPage | Yes (all content pages) | 7/11 pages | Yes | Missing on Contact, Waitlist |
| BreadcrumbList | Yes (inner pages) | All inner pages | Partial | Last item missing `item` URL |
| WebSite + SearchAction | Yes | Yes | Partial | SearchAction points to non-functional `/blog?q=` |
| BlogPosting | Yes | Yes | Yes | Complete with author enrichment |
| ItemList (Blog) | Recommended | Yes | Yes | — |
| HowTo | Recommended | No | — | "How It Works" section is a natural HowTo candidate |
| **Image URLs** | Absolute required | **Relative** | **FAIL** | All logo/person/og images use relative paths |

---

## 6. User Journey Gaps — Drop-off Risks

| Journey Stage | Risk | Severity | Finding |
|---------------|------|----------|---------|
| Any form submission | Data is discarded — conversion = 0% | P0 | All forms fake success |
| Home page on mobile | 4 grid sections unreadable | P0 | Hard-coded 3-col grids |
| Direct landing on Features | No trust signals, no social proof | P1 | Features.tsx has zero credibility signals |
| Direct landing on ForDentists | No clinical authority, no Dr. Anca | P1 | ForDentists.tsx has no trust signals |
| Finding Contact page | Not in navigation | P1 | Navbar.tsx:12-17 |
| Finding Pricing page | Not in navigation | P2 | Navbar.tsx:12-17 |
| Mobile CTA visibility | "Join Waitlist" button hidden on mobile | P2 | Navbar.tsx:93 has `hide-mobile` class |
| Waitlist page | Defaults to "dentist" — confuses patients | P2 | Waitlist.tsx:34 |
| Blog conversion | No waitlist CTA anywhere on blog | P2 | Blog.tsx (newsletter only) |
| Footer exit | No CTA or email capture in footer | P2 | Footer.tsx |

---

## 7. GEO Readiness Score: 7.5/10

| Signal | Score | Notes |
|--------|-------|-------|
| llms.txt + llms-full.txt | 9/10 | Comprehensive, follows llmstxt.org standard |
| robots.txt AI crawlers | 9.5/10 | 11 crawlers explicitly allowed |
| FAQPage schema coverage | 8.5/10 | 7/7 indexable content pages |
| Blog answer capsules | 10/10 | 100% H2 coverage, 37 capsules across 6 articles |
| Static page answer capsules | 0/10 | Zero capsules on Home, Features, ForDentists, About, Pricing |
| Dr. Anca authority signals | 9/10 | Quote, credentials, schema, llms.txt — well distributed |
| Stat source attribution | 5/10 | "Digital health research" is too vague for AI citation |
| HTTP headers | 5.5/10 | X-Llms-Txt on `/` only; no X-Robots-Tag |
| Entity markup (SoftwareApplication) | 9/10 | Complete @graph with cross-references |
| Featured snippet structure | 6.5/10 | Blog strong; static pages need tables/definition lists |
| noscript fallback | 8/10 | Homepage covered; inner pages not |

**Strongest GEO asset:** Blog answer capsule system — best-in-class implementation.
**Biggest GEO gap:** Static pages have no AI-extractable summary content after H2s.

---

## 8. Competitive Moat Status

| Moat Element | Status | Strength |
|-------------|--------|----------|
| Category creation ("AI dental companion") | Asserted in metadata, not defined on-page | WEAK |
| EFP Award 2025 | Deployed in 8+ locations with full context | STRONG |
| Dr. Anca's clinical authority | Present but incomplete (no ORCID/Scholar) | MODERATE |
| Founding story | Exceptional content — buried in non-featured blog post | WEAK (distribution) |
| 30+ founding clinics | Mentioned but no geography, names, or testimonials | MODERATE |
| Competitive differentiation | Zero. No positioning against alternatives | ABSENT |
| "Why now" timing argument | Not articulated anywhere | ABSENT |
| Problem articulation | Present on About page, absent/inverted on Home and ForDentists | WEAK |

**Bottom line:** The raw materials for a strong competitive moat exist (award, founder story, clinical authority, real waitlist). But they are not assembled into a coherent positioning narrative. A competitor with weaker credentials but better storytelling would win the positioning battle today.

---

## 9. Recommended Sprint Plan (1 Week)

### Day 1 — Blocking Bugs (P0)
- [ ] **Connect forms to backend** — Formspree or Vercel serverless for Waitlist + Contact + Blog newsletter
- [ ] **Fix mobile grids** — Replace 4 hard-coded `gridTemplateColumns` with Tailwind responsive classes
- [ ] **Fix waitlist default role** — Change to "patient"

### Day 2 — Technical SEO Foundation
- [ ] **Install vite-plugin-prerender** — Pre-render all routes to static HTML
- [ ] **Add og:image + twitter:card + twitter:image** to all page Helmet blocks (absolute URLs)
- [ ] **Make all JSON-LD image URLs absolute** (logo, person, og-image)
- [ ] **Add Contact + Pricing to nav** (NAV_LINKS in Navbar.tsx)
- [ ] **Add noindex Helmet to 404 page**

### Day 3 — Schema & AI Signals
- [ ] **Dr. Anca schema** — Add Physician type, medicalSpecialty, memberOf EFP
- [ ] **Organization schema** — Add contactPoint
- [ ] **Expand X-Llms-Txt header** to all routes in vercel.json
- [ ] **Add X-Robots-Tag: all** header in vercel.json
- [ ] **Update robots.txt** — Add GoogleOther, CCBot, Applebot-Extended
- [ ] **Fix BreadcrumbList** — Add `item` URL to last breadcrumb items
- [ ] **Remove or fix SearchAction** — Either implement blog search or remove it

### Day 4 — For Dentists Page Overhaul
- [ ] **Add trust signals** — EFP badge, "30+ founding clinics", Dr. Anca quote
- [ ] **Add ROI section** — Revenue recovery framing for no-show reduction
- [ ] **Add competitive positioning** — "Not another PMS plugin" section
- [ ] **Add problem-first structure** — Clinical pain before solution
- [ ] **Promote founding story blog post** to featured

### Day 5 — Content & GEO
- [ ] **Add answer capsules** to all static page H2s (Home, Features, ForDentists, About, Pricing)
- [ ] **Add "AI dental companion"** phrase to all page body copy + meta
- [ ] **Update Footer tagline** to include "AI"
- [ ] **Add Dr. Anca quote** to About and ForDentists pages
- [ ] **Replace vague stat citations** with specific sources or clearer attribution

### Requires Team Input (Async)
- [ ] Obtain Dr. Anca's ORCID iD
- [ ] Obtain Dr. Anca's Google Scholar profile URL
- [ ] Resolve "adherence" vs "engagement" quote discrepancy (regulatory vs strategy conflict)
- [ ] Collect 2-3 founding clinic testimonial quotes
- [ ] Decide on form backend (Formspree vs custom)
- [ ] Set up IndexNow API key + deployment hook

---

## Appendix: All Reports

| Report | File | Findings |
|--------|------|----------|
| Content & Messaging | `audit/reports/01-content-messaging.md` | 3 CRITICAL, 10 HIGH, 8 MEDIUM, 4 LOW |
| Technical SEO | `audit/reports/02-technical-seo.md` | 4 CRITICAL, 7 HIGH, 8 MEDIUM, 3 LOW |
| User Journey & UX | `audit/reports/03-user-journey-ux.md` | 5 P0, 5 P1, 9 P2, 5 P3 |
| GEO Readiness | `audit/reports/04-geo-readiness.md` | 0 CRITICAL, 3 MEDIUM, 3 LOW |
| Schema & Structured Data | `audit/reports/05-schema-structured-data.md` | 2 CRITICAL, 5 HIGH, 4 MEDIUM, 4 LOW |
| Competitive Positioning | `audit/reports/06-positioning-story.md` | 2 CRITICAL, 5 HIGH, 4 MEDIUM, 4 LOW |

**Total unique findings across all reports: ~80**
**Total CRITICAL/P0: 16** | **Total HIGH/P1: 27** | **Total MEDIUM/P2: 23** | **Total LOW/P3: 14**

---

*Generated by 7-agent audit system. All file paths relative to project root. All line numbers verified against source as of 2026-03-06.*
