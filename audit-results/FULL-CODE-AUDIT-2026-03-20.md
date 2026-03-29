# FULL CODE AUDIT — Perioskoup Landing Page
**Date:** 2026-03-20
**Auditor:** Mozi Subagent (landing-full-audit)
**Build:** ✅ Clean (0 warnings, 941ms)
**TypeScript:** ✅ Clean (`pnpm check` — 0 errors)

---

## EXECUTIVE SUMMARY

The landing page is well-built with strong SEO, good accessibility foundations, and consistent design. However, there are **critical bugs** around forms not submitting data, role/title inconsistencies across pages, duplicate meta tags from Helmet conflicts, and several Feature Truth Table violations.

### Severity Legend
- 🔴 **CRITICAL** — Must fix before launch
- 🟡 **HIGH** — Should fix before launch
- 🟢 **LOW** — Nice to have / minor

---

## 🔴 CRITICAL ISSUES (Cross-cutting)

### C1. FORMS DO NOT SUBMIT DATA — Waitlist & Contact
**Files:** `Waitlist.tsx`, `Contact.tsx`, `Blog.tsx` (newsletter)
**Impact:** All three forms validate client-side then show a success message, but **no data is actually sent anywhere**. No API call, no fetch, no form action. Users think they signed up but are not captured.

- **Waitlist.tsx L28-33:** `handleSubmit` validates → sets `submitted = true`. No network request.
- **Contact.tsx L24-29:** `handleSubmit` validates → sets `sent = true`. No network request.
- **Blog.tsx newsletter L20-27:** `handleNewsletterSubmit` validates → sets `newsletterStatus = 'success'`. No network request.

**Fix:** Integrate with backend API, Brevo, or at minimum a serverless function to capture submissions.

### C2. FOUNDER ROLE INCONSISTENCIES
Eduard Ciugulea's title is inconsistent across the site:

| File | Title Used |
|------|-----------|
| CLAUDE.md | CGO |
| Home.tsx JSON-LD L50 | **CTO** 🔴 |
| About.tsx team section | CGO & Co-Founder ✅ |
| About.tsx JSON-LD L32 | Co-founder & CGO ✅ |
| ForDentists.tsx JSON-LD | CTO 🔴 |
| BlogPost.tsx (articles) | Co-founder & CGO ✅ |
| Contact.tsx JSON-LD | Co-founder & CGO ✅ |
| usePageMeta.tsx GEO capsules | CTO 🔴 (home, about capsules) |
| geo-capsules.ts mock data | CTO 🔴 |

**Per CLAUDE.md:** Eduard is **CGO** (Chief Growth Officer). The CTO is Petrica Nancu.

Dr. Anca's title also varies:
- Home.tsx JSON-LD: "CEO"
- About.tsx: "Periodontist & Co-founder, CEO"
- ForDentists.tsx JSON-LD: "CEO"
- About.tsx page body calls her "CDO" nowhere — correct per CLAUDE.md she is "CDO/Periodontist" but the site uses CEO everywhere.

**Per CLAUDE.md:** Dr. Anca is **CDO** (Chief Dental Officer). Website says CEO everywhere. **Clarify which is canonical and make consistent.**

### C3. DUPLICATE HELMET META TAGS
**Files:** Every page that uses both `usePageMeta()` AND inline `<Helmet>` tags.

Most pages render meta tags TWICE:
1. Via `usePageMeta("/route")` which returns `HelmetMeta` (though it's not used — the hook returns it but pages don't render it)
2. Via inline `<Helmet>` blocks in each page

This is actually OK — pages use inline Helmet and only use `GEOCapsule` from the hook. The `HelmetMeta` component is generated but never rendered. **Not a bug per se**, but the usePageMeta hook generates unused Helmet output for every page. Minor code waste.

---

## 🔴 FEATURE TRUTH TABLE VIOLATIONS

### FT1. Progress Tracking shown without caveat
**File:** `Features.tsx` L10 (FEATURES array, item 3)
- Title: "Progress Tracking"
- No badge (unlike "AI Clinical Companion" which has "Beta" badge)
- **Truth Table:** Streak tracking = In Progress, Health Trends = NOT STARTED, View Analytics = NOT STARTED
- "Visual timelines and habit streaks" — streaks are In Progress, visual timelines/dashboards imply analytics which is NOT STARTED
- Bullets include "Visual progress dashboards" — **this is NOT STARTED**

**Fix:** Add "Beta" or "Coming Soon" badge. Remove "Visual progress dashboards" bullet or mark as coming soon.

### FT2. Features page claims presented as working
**File:** `Features.tsx` L10-17
- "Progress Tracking" has bullets: "Daily habit logging", "Visual progress dashboards", "Habit streaks", "Routine consistency tools"
  - "Visual progress dashboards" → Health Trends = NOT STARTED ❌
  - "Routine consistency tools" → vague, but nothing matching in truth table

### FT3. Home.tsx "AI-Powered Guidance" description
**File:** `Home.tsx` ~L167 (features bento grid)
- "It learns what works for you and adapts over time" — implies working ML feedback loop. AI Chatbot is In Progress.
- Not necessarily wrong but aggressive for an In Progress feature.

### FT4. ForDentists.tsx "Care Plan Visibility" section
**File:** `ForDentists.tsx` FEATURES array item 3
- "See which patients are following their care plans" — correctly notes "coming in Q2 2026" ✅
- Bullets: "Care plan follow-through (in development)" ✅, "Practice-wide summaries (coming Q2 2026)" ✅
- **This one is handled correctly.** No violation.

### FT5. Home.tsx "Trusted by Periodontists" ticker
**File:** `Home.tsx` ~L136 (ticker section)
- "Trusted by Periodontists" — the app is in beta with 30 clinics on waitlist, not in active clinical use. This is a stretch claim.
- **Fix:** Change to "Designed with Periodontists" or "Built by a Periodontist"

### FT6. Pricing page "Analytics & engagement reports (coming soon)"
**File:** `Pricing.tsx` L26
- This is correctly marked "(coming soon)" ✅

---

## FILE-BY-FILE AUDIT

### 1. Home.tsx (274 lines)

**Bugs:**
- L50: Eduard's jobTitle is "CTO" — should be "CGO"
- L49: JSON-LD has only 2 founders, missing Petrica Nancu
- L98-99: `<script>` tags for JSON-LD are rendered OUTSIDE `<Helmet>` as direct children of the root div. This works but JSON-LD scripts should ideally be in `<head>`. React Helmet can handle this with `<Helmet><script>` but the current approach puts them in `<body>`.

**Content/Truth Table:**
- L136: Ticker "Trusted by Periodontists" — overstatement (see FT5)
- L167: "AI-Powered Guidance" — "learns what works for you and adapts over time" — aggressive for In Progress feature

**Accessibility:**
- ✅ Phone mockup has `aria-hidden="true"`
- ✅ Ticker has `aria-hidden="true"`
- ✅ Hero image has alt text
- ✅ SVGs have `aria-hidden="true"` and `focusable="false"`
- 🟡 L127: `h1` has `className="reveal visible"` with initial `visible` class — the reveal animation may flash for non-JS users but this is minor

**Responsive:**
- ✅ Uses clamp() for fonts, grid with responsive columns
- ✅ Phone mockup uses max-w constraints

**Performance:**
- ✅ Hero image uses `fetchPriority="high"` and `decoding="sync"` for LCP
- ✅ Other images use `loading="lazy"`
- 🟡 Large inline styles throughout — not a perf issue but code maintenance concern

**Regulatory:**
- ✅ No banned terms (compliance, diagnose, treat, cure, etc.)
- ✅ FAQ JSON-LD explicitly states "not a medical device"

**Missing:**
- No `<meta name="robots">` — defaults to index,follow which is correct for homepage

---

### 2. Features.tsx (139 lines)

**Bugs:**
- L10: `dangerouslySetInnerHTML={{ __html: f.desc }}` on feature descriptions — the "Progress Tracking" desc contains an `<a>` tag with inline HTML. This is intentional but risky if content ever comes from a CMS. Currently safe since data is hardcoded.

**Content/Truth Table:**
- 🔴 FT1/FT2: "Progress Tracking" missing badge, "Visual progress dashboards" is NOT STARTED
- ✅ "AI Clinical Companion" has "Beta" badge
- ✅ "Smart Reminders" has "Beta" badge
- ✅ "Education Library" has "Coming Soon" badge
- ✅ "Appointment Prep" has "In Development" badge

**Accessibility:**
- ✅ Feature icons have `aria-hidden="true"`
- ✅ Check SVGs have `aria-hidden="true"` and `focusable="false"`

**Responsive:**
- ✅ Grid: 1 col → 2 col (sm) → 3 col (xl)

**Performance:**
- ✅ Page is code-split (separate chunk: 12.42 kB gzip 4.15 kB)

---

### 3. ForDentists.tsx (228 lines)

**Bugs:**
- L81: JSON-LD `dentistsServiceJsonLd` has Eduard as "CTO" in `provider.founder` — should be "CGO"
- L74: `<script type="application/ld+json">{JSON.stringify(dentistsServiceJsonLd)}</script>` is inside `<Helmet>`, while `dentistsFaqJsonLd` is rendered via `dangerouslySetInnerHTML` outside Helmet. Inconsistent approach — both work but mixing patterns.

**Content/Truth Table:**
- ✅ "Care Plan Visibility" correctly notes "coming in Q2 2026"
- ✅ Bullets correctly mark features as "(in development)" and "(coming Q2 2026)"
- 🟡 "reducing no-shows" (hero) — no evidence this is a current feature; it's an aspirational benefit

**Accessibility:**
- ✅ `AppScreenshot` component used for dashboard image with descriptive alt text

**Regulatory:**
- ✅ No banned terms
- 🟡 "Patients forget 80% of care instructions within 48 hours" — cited (Kessels 2003) ✅
- 🟡 Stats section: all 3 stats have proper academic citations ✅

---

### 4. Pricing.tsx (148 lines)

**Bugs:**
- None found.

**Content/Truth Table:**
- ✅ Patient plan: "Progress tracking (coming soon)", "Educational content library (coming soon)"
- ✅ Clinic plan: "Analytics & engagement reports (coming soon)"
- ✅ Pricing is NOT blurred with beta overlay as CLAUDE.md says it should be — **WAIT**: CLAUDE.md says "Pricing section stays blurred with beta overlay" but the actual page shows clear pricing cards with a beta notice box above them.
- 🔴 **CLAUDE.md VIOLATION:** "Pricing section stays blurred with beta overlay" — pricing cards are fully visible, not blurred. Either the rule is outdated or the implementation is wrong.

**Accessibility:**
- ✅ Check SVGs have `aria-hidden`

---

### 5. About.tsx (202 lines)

**Bugs:**
- L155: Team member creds — Petrica listed as "AI & machine learning specialist" but CLAUDE.md says "CTO & Head of AI". The card shows role correctly as "CTO & Head of AI" but creds could be more specific.

**Content/Truth Table:**
- ✅ No feature claims on About page

**Accessibility:**
- ✅ LinkedIn links have `aria-label` with person's name
- ✅ Team images have alt text with names

---

### 6. Waitlist.tsx (131 lines)

**Bugs:**
- 🔴 C1: Form does not submit data (see Critical Issues)
- L28: `handleSubmit` only validates and sets `submitted = true`

**Accessibility:**
- ✅ Role selector uses `aria-pressed` for toggle state
- ✅ Form inputs have `aria-required`, `aria-invalid`, `aria-describedby`
- ✅ Error messages have `role="alert"`
- ✅ Success state has `role="status"` and `aria-live="polite"`
- ✅ Labels via `sr-only` class

**Content:**
- ✅ `noindex, follow` robots meta — correct for waitlist page

---

### 7. Blog.tsx (178 lines)

**Bugs:**
- 🔴 Newsletter form doesn't submit data (see C1)
- 🟡 `newsletterStatus` error message shown via `aria-live` sr-only div but no visible error shown to sighted users when email is invalid

**Content:**
- Blog posts are hardcoded — no CMS integration
- Post dates span Sept 2025 to Jan 2026 — all in the past, which is fine

**Accessibility:**
- ✅ Newsletter has `aria-live` status region
- ✅ Input has `aria-required` and `aria-invalid`

---

### 8. BlogPost.tsx (508 lines)

**Bugs:**
- 🟡 `renderBody` function wraps all output in `<ul>` with `<li>` elements but also generates `<p>`, `<h2>`, `<h3>`, `<blockquote>` elements as list items. Semantically incorrect — these should not be inside a `<ul>`.
- 🟡 Markdown-like parser doesn't handle numbered lists (1. 2. 3.) — they render as plain paragraphs
- 🟡 Inline links in markdown body (e.g., `[EFP website](url)`) are not parsed — they render as literal markdown text. The "efp-digital-innovation-award-2025" article body contains `[EFP website](https://www.efp.org/...)` which renders as raw markdown.
- 🟡 Bold text detection: line 456 — the regex `trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.indexOf("**", 2) === trimmed.length - 2` only matches lines that are entirely bold. Lines with mixed bold/plain are handled by the inline parser, which is fine.

**Content/Truth Table:**
- Blog articles are educational — no feature claims that violate the truth table
- ✅ Articles correctly describe Perioskoup as a companion, not a medical device

**Accessibility:**
- 🟡 Blog post body content inside `<ul>` is semantically wrong (see above)
- ✅ Breadcrumb navigation present
- ✅ Author images have alt text

**Performance:**
- 🔴 BlogPost.tsx chunk is 66.10 kB (gzip 21.11 kB) — the **largest page chunk** because all 6 full article bodies are bundled inline. These should be lazy-loaded or moved to a CMS/API.
- All article content (tens of thousands of words) is in a single JS object in one file

---

### 9. Privacy.tsx (56 lines)

**Bugs:** None.

**Content:**
- ✅ "Last updated: March 2026" — current
- ✅ `noindex, follow` robots meta
- 🟡 Privacy policy is brief/placeholder-level. For a health app handling Article 9 data, this needs legal review before launch.

**Missing:**
- No cookie consent banner implementation referenced anywhere in the codebase
- Privacy policy mentions cookies but no consent mechanism exists

---

### 10. Terms.tsx (54 lines)

**Bugs:** None.

**Content:**
- ✅ "Last updated: March 2026" — current
- ✅ `noindex, follow` robots meta
- ✅ SaMD disclaimer present (Section 3) — correctly states wellness companion, not medical device
- 🟡 Terms are also brief/placeholder-level. Need legal review.

---

### 11. Contact.tsx (142 lines)

**Bugs:**
- 🔴 C1: Form does not submit data (see Critical Issues)
- L24: `handleSubmit` validates → sets `sent = true`. No network request.

**Accessibility:**
- ✅ All inputs have visible labels (not sr-only — better than Waitlist approach)
- ✅ Error messages with `role="alert"` and `aria-describedby`
- ✅ Success state has `role="status"` and `aria-live="polite"`
- ✅ Select element has proper label

---

### 12. NotFound.tsx (30 lines)

**Bugs:** None.

**Content:**
- ✅ `noindex, nofollow` robots meta
- ✅ Simple, clear messaging
- ✅ CTA back to home

**Accessibility:**
- ✅ Has `id="main-content"` for skip-link target

---

### 13. Navbar.tsx (165 lines)

**Bugs:** None found.

**Accessibility:**
- ✅ Mobile drawer: `role="dialog"`, `aria-modal="true"`, `aria-label`
- ✅ Focus trap implemented for mobile drawer (A05)
- ✅ Escape key closes drawer
- ✅ `aria-expanded` on hamburger button
- ✅ `aria-current="page"` on active links (A06)
- ✅ `aria-controls="mobile-nav"` links button to drawer

**Responsive:**
- ✅ Desktop nav hidden on mobile (`hidden md:flex`)
- ✅ Hamburger shown on mobile only (`flex md:hidden`)

---

### 14. Footer.tsx (71 lines)

**Bugs:** None found.

**Content:**
- ✅ Dynamic copyright year: `{new Date().getFullYear()}`
- ✅ All internal links present

**Accessibility:**
- 🟡 Footer links use `<span className="footer-link">` inside `<Link>` — works but the span is the interactive target. Semantically fine since Wouter renders `<a>`.

---

### 15. usePageMeta.tsx (152 lines)

**Bugs:**
- 🔴 GEO capsules for home and about routes list Eduard as "CTO" — should be "CGO" (see C2)
- 🟡 The hook generates `HelmetMeta` JSX that is never used by any page (all pages use inline Helmet). Dead code.

---

### 16. analytics.ts (52 lines)

**Bugs:** None.

**Implementation:**
- ✅ PostHog loaded lazily via dynamic import
- ✅ Deferred via `requestIdleCallback` — won't block LCP/TTI
- ✅ No-op when `VITE_POSTHOG_KEY` is not set
- 🟡 No evidence that `VITE_POSTHOG_KEY` is set in production — analytics may not be capturing anything

---

### 17. geo-capsules.ts (347 lines)

**Bugs:**
- 🔴 Mock data lists Eduard as "CTO" (multiple locations) — should be "CGO"
- 🟡 `MOCK_ARTICLE_META` dates don't match `BlogPost.tsx` dates for some articles:
  - "3-minute-routine-save-teeth": mock says 2025-12-18, BlogPost says 2026-01-08
  - "efp-digital-innovation-award-2025": mock says 2025-06-15, BlogPost says 2025-05-17
  - "why-patients-forget-instructions": mock says 2026-01-08, BlogPost says 2025-10-05
  - "building-the-bridge-perioskoup-story": mock says 2026-02-05, BlogPost says 2025-09-01

---

## STATIC FILES

### robots.txt ✅
- Allows all bots including AI crawlers
- Sitemap reference correct
- llms.txt references present

### sitemap.xml
- Last modified: 2026-03-06 — **14 days old**, acceptable but should update on deploy
- All routes present including blog posts
- hreflang annotations present

### feed.xml
- Last build date: 2026-03-06 — same as sitemap, acceptable
- All 6 blog articles listed with correct URLs

---

## BUILD & TYPESCRIPT

- **Build:** ✅ Clean, 0 warnings, 941ms
- **TypeScript:** ✅ Clean, 0 errors
- **Bundle size:** Main chunk 283 kB (gzip 86.5 kB) — includes React, Wouter, Radix UI, Helmet. Reasonable.
- **Largest page chunk:** BlogPost 66.1 kB (gzip 21.1 kB) — all article content bundled inline

---

## PRIORITY FIX LIST

### 🔴 Must Fix Before Launch
1. **Forms don't submit data** — Waitlist, Contact, Newsletter (C1)
2. **Eduard's title: CTO → CGO** everywhere — Home JSON-LD, ForDentists JSON-LD, usePageMeta GEO capsules, geo-capsules.ts mock data (C2)
3. **Clarify Dr. Anca's title** — CLAUDE.md says CDO, website says CEO everywhere (C2)
4. **Progress Tracking missing badge** on Features page — add "Beta" badge, remove/caveat "Visual progress dashboards" (FT1/FT2)
5. **Pricing blur** — CLAUDE.md says pricing should be blurred with beta overlay; it's not (check if rule is still current)

### 🟡 Should Fix Before Launch
6. **BlogPost.tsx** — markdown links render as raw text (e.g., `[EFP website](url)`)
7. **BlogPost.tsx** — content wrapped in `<ul>` semantically incorrect
8. **BlogPost.tsx** — 66KB chunk; move article content to separate files or API
9. **Cookie consent** — Privacy policy mentions cookies but no consent mechanism exists
10. **Home ticker** — "Trusted by Periodontists" → "Built by a Periodontist" or similar
11. **Date mismatches** between geo-capsules.ts mock data and BlogPost.tsx
12. **Blog newsletter** — no visible error message for sighted users on invalid email
13. **Missing Petrica Nancu** from Home.tsx JSON-LD founders array

### 🟢 Nice to Have
14. Remove unused `HelmetMeta` generation from usePageMeta hook
15. Verify PostHog `VITE_POSTHOG_KEY` is set in production
16. Legal review of Privacy Policy and Terms of Service
17. Update sitemap/feed lastmod dates on each deploy
18. Add structured data for blog post individual pages (already done ✅)
