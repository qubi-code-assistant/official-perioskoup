# Perioskoup Full Site Audit — Road to 10/10

**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Audited by:** 12 specialist agents

---

## Score Summary

| # | Area | Score | Key Blocker |
|---|------|-------|-------------|
| 1 | SEO Technical | 6.5 | SPA not prerendered — social/search bots see only shell HTML |
| 2 | GEO (AI Readiness) | 7.8 | llms-full.txt missing blog body text |
| 3 | Content Quality | 7.2 | Kessels citation has wrong journal; unbuilt features claimed as live |
| 4 | Conversion UX | 6.4 | Both forms (Waitlist + Contact) submit to nowhere |
| 5 | Mobile Responsive | 7.2 | Fixed paddingTop on all secondary page heroes |
| 6 | Competitive Position | 6.1 | No competitor comparison page; no objection handling |
| 7 | Team & Trust | 5.5 | Zero external testimonials; no advisory board |
| 8 | Animation & Polish | 7.0 | Blank Suspense fallback; no page exit animation |
| 9 | Performance | 6.0 | 44 unused shadcn/ui components; font cache headers missing |
| 10 | Accessibility | 6.5 | No `<main>` landmark; contrast failures on muted text |
| 11 | Niche Strategy | 6.2 | No `/ai-dental-companion` category page; zero backlinks |
| 12 | Testing | 8.2 | No CI/CD pipeline; stale test assertions |

**Overall Average: 6.7 / 10**

---

## P0 — LAUNCH BLOCKERS (fix before any marketing spend)

### 1. Forms submit to nowhere
**Impact:** Every waitlist signup and contact inquiry is silently lost.
- `Waitlist.tsx:40-42` — `setSubmitted(true)` with no fetch/webhook
- `Contact.tsx:38-40` — `setSent(true)` with no backend call
- **Fix:** Wire to a backend (Vercel serverless function, Formspree, or Supabase)

### 2. SPA not prerendered — invisible to bots and social previews
**Impact:** Sharing any page on LinkedIn/Twitter/Slack shows the homepage title and generic OG image. Google sees only the shell HTML for inner pages. All JSON-LD, meta tags, and page content are invisible to non-JS crawlers.
- **Fix:** Add `vite-plugin-prerender` or Vercel ISR/Edge Middleware for static HTML per route

### 3. Kessels 2003 citation has wrong journal
**Impact:** The "80% forgotten in 48h" stat cites BMJ but the paper is in the *Journal of the Royal Society of Medicine*. The DOI `10.1136/bmj.326.7395.920` resolves to a different paper entirely. A dental professional will verify this.
- `ForDentists.tsx:136`, `About.tsx:196`
- **Fix:** Correct the journal name and DOI, change "80%" to "40-80%" (Kessels reported a range)

### 4. Unbuilt features claimed as live
- `Home.tsx:223` — "It learns what works for you and adapts over time" (AI adaptive learning = In Progress)
- `ForDentists.tsx:25-26` — "Illustrated home care guides," "Medication reminders," "Post-procedure instructions" (not confirmed Done)
- **Fix:** Add "Coming Soon" badges or soften to future-tense language

### 5. EFP Award: "Winner" without "3rd Prize"
**Impact:** Dental professionals will check efp.org. Omitting "3rd Prize" damages trust when discovered.
- Every badge, schema, and marketing copy says "Winner" or "Award Winner"
- **Fix:** Change to "EFP Digital Innovation Award 2025 — 3rd Prize" consistently

---

## P1 — HIGH PRIORITY (fix before public launch)

### SEO & Technical

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 6 | Missing OG metadata on all pages | Every page's `<Helmet>` | Add `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:image:alt`, `twitter:site`, `og:locale` |
| 7 | BlogPosting schema: date-only format | `BlogPost.tsx` | Change `datePublished: "2025-11-12"` to full ISO 8601 (`2025-11-12T00:00:00+02:00`) |
| 8 | BlogPosting schema: image as bare string | `BlogPost.tsx` | Wrap in `ImageObject` with `width`, `height`, `url` |
| 9 | Features page title too long (77 chars) | `Features.tsx:47` | Trim to under 70 characters |
| 10 | Duplicate GDPR line in llms.txt | `llms.txt:37,39` | Remove duplicate |
| 11 | No `hreflang="x-default"` on any page | All page `<Helmet>` blocks | Add `<link rel="alternate" hreflang="x-default">` |
| 12 | BlogPost 404 branch not noindexed | `BlogPost.tsx` | Add `<meta name="robots" content="noindex">` to fallback |
| 13 | Hero img should be `decoding="sync"` | `Home.tsx:72` | Change to `decoding="sync"` for LCP |

### Content & Trust

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 14 | Zero external testimonials | All pages | Get at least 1 named dentist quote from the 30+ waitlist clinics |
| 15 | No advisory board or clinical validators | About page | Add at least 2-3 named external advisors |
| 16 | Credential inconsistency: "PhD" vs "Specialist" | `About.tsx:268` vs `llms.txt:25` | Verify Dr. Anca's actual credentials and unify |
| 17 | "62% periodontitis" stat unverified | `ForDentists.tsx:138`, `About.tsx:195` | Verify against Bernabe 2020 paper (may be 50% or 11.2% severe) |
| 18 | "reducing no-shows" — unsourced claim | `ForDentists.tsx:85` | Add citation or remove |
| 19 | FAQ mentions "EU MDR and FDA SaMD guidance" | `Home.tsx:42` | Remove — contradicts "wellness tool, not a medical device" positioning |

### Conversion UX

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 20 | No mid-page or bottom CTA on Home | `Home.tsx` | Add a CTA section before Footer (like every other page has) |
| 21 | Mobile navbar has no visible CTA | `Navbar.tsx:137` | Show a compact "Join Waitlist" button in mobile nav (not just in drawer) |
| 22 | Waitlist form: visible labels missing | `Waitlist.tsx:131-148` | Change `sr-only` labels to visible labels (match Contact form pattern) |
| 23 | Waitlist form: last name not validated | `Waitlist.tsx:22-33` | Add lastName check to `validate()` |
| 24 | Error messages use lime green (brand accent) | `Waitlist.tsx:133,142,147` | Change error color to red/warm (#E57A7A or similar) |
| 25 | Contact emails not clickable | `Contact.tsx:127-129` | Wrap in `<a href="mailto:...">` |
| 26 | Social proof below form on Waitlist | `Waitlist.tsx:170-182` | Move trust signals above the form |
| 27 | Pricing page: no bottom CTA | `Pricing.tsx` | Add CTA section after FAQ |

### Accessibility

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 28 | No `<main>` landmark | All 12 page files | Replace `<section id="main-content">` with `<main id="main-content">` |
| 29 | Muted text contrast failure | Inline styles across Features, ForDentists, Pricing, About, Home | Change `#8C9C8C` on `#1D3449` cards to `#93A793` (passes 4.5:1) |
| 30 | Breadcrumb separator contrast failure | `Breadcrumb.tsx:65` | Change `#4A5E6A` to at least `#6B7F8A` |
| 31 | Missing `autocomplete` on all form inputs | Waitlist, Contact, Blog newsletter | Add `autocomplete="given-name"`, `email`, etc. per WCAG 1.3.5 |
| 32 | Success messages not announced by AT | `Contact.tsx`, `Waitlist.tsx` | Use pre-mounted `role="status"` div (like Blog newsletter already does) |
| 33 | Hero background img has non-empty alt | `Home.tsx:72` | Change to `alt=""` + `aria-hidden="true"` (decorative image) |

### Mobile Responsiveness

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 34 | Fixed `paddingTop: 140` on all secondary heroes | ForDentists, About, Contact, Pricing, Waitlist, Blog, Features, Terms, Privacy, NotFound | Change to `paddingTop: "clamp(96px, 14vw, 140px)"` |
| 35 | Contact form card: fixed `padding: 40` | `Contact.tsx:145` | Change to `padding: "clamp(20px, 5vw, 40px)"` |
| 36 | PhoneMockup: fixed `width: 340` | `PhoneMockup.tsx:29` | Change to `width: "clamp(280px, 85vw, 340px)"` |
| 37 | How It Works circles: fixed 280/160px | `Home.tsx:306-311` | Use `clamp()` for both outer glow and circle-pulse |
| 38 | `.card` base: `padding: 32px` not responsive | `index.css:775` | Change to `padding: clamp(20px, 5vw, 32px)` |
| 39 | Pricing FAQ: fixed `padding: "120px 0"` | `Pricing.tsx:160` | Change to `padding: "clamp(64px, 8vw, 120px) 0"` |

### Performance

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 40 | Fonts not cached — no Cache-Control header | `vercel.json` | Add `{ "source": "/fonts/(.*)", "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}] }` |
| 41 | Dead public assets | `client/public/images/` | Delete `logomark-dark.png` (36KB) and `eduard-formal.jpg` (30KB) |
| 42 | Dead code: CustomCursor, useScrollReveal, useMobile, ThemeContext | Various | Delete unused components and hooks |
| 43 | 44 shadcn/ui component files unused | `client/src/components/ui/` | Remove all unused UI primitives and their Radix deps |
| 44 | Headshot images should be WebP | `client/public/images/` | Convert `anca-headshot.jpg` and `eduard-headshot.jpg` to WebP |
| 45 | Blog author avatars missing lazy loading | `Blog.tsx:227,285` | Add `loading="lazy"` |
| 46 | Font-face duplication | `index.css` | Merge 4 Gabarito `@font-face` blocks into 2 using `font-weight: 400 700` range |

### Animation & Polish

| # | Issue | File(s) | Fix |
|---|-------|---------|-----|
| 47 | Blank Suspense fallback (black screen flash) | `App.tsx:83` | Create a skeleton/shimmer component using the existing `shimmer` keyframe |
| 48 | No page exit animation | `App.tsx` PageWrapper | Add opacity crossfade before Suspense resolves |
| 49 | `blog-row-hover` animates padding-left (layout thrash) | `index.css:549-555` | Use `transform: translateX(8px)` instead |
| 50 | No form submission loading state | `Contact.tsx:191`, `Waitlist.tsx:152` | Add spinner + "Sending..." label during async |
| 51 | CustomCursor MutationObserver perf issue | `CustomCursor.tsx:56-57` | Switch to event delegation (or delete — it's unused) |

---

## P2 — NICE TO HAVE (improves score but not blocking)

### Competitive & Niche

| # | Issue | Fix |
|---|-------|-----|
| 52 | No `/ai-dental-companion` category page | Create a 1,200+ word standalone page defining the category |
| 53 | No `/compare` or `/vs/` competitor page | Create comparison page vs Dental Monitoring, CareStack, etc. |
| 54 | "Seamless Integration" label contradicts "no migration" claim | `Home.tsx:268` — change to "The Between-Visit Workflow" |
| 55 | Blog missing high-volume keywords | Publish: "Why Do My Gums Bleed?", "How to Brush with Periodontal Disease" |
| 56 | No social media links on site | Add LinkedIn/Instagram/Twitter to `Footer.tsx` |
| 57 | No press page | Create `/press` route with press kit, media mentions |
| 58 | No individual founder pages | Create `/team/dr-anca-constantin` with rich schema |
| 59 | ForDentists title tag misses "AI for dentists" | `ForDentists.tsx:55` — update title |
| 60 | No ROI paragraph on Pricing page | Connect prevented no-shows to subscription cost |
| 61 | Five major objections unanswered | "Patients won't download an app", integration, learning curve, GDPR for practices, medical device status |

### GEO

| # | Issue | Fix |
|---|-------|-----|
| 62 | llms-full.txt missing blog body text | Add full article text for all 6 posts |
| 63 | No answer capsules on non-blog pages | Add extractable Q&A blocks to Home, Features, ForDentists, About, Pricing |
| 64 | RSS feed missing `content:encoded` | Add full article body to feed items |
| 65 | RSS feed: "product designer" should be "AI specialist" | Fix Petrica's title in building-the-bridge description |
| 66 | No `speakable` schema on citation-ready content | Add to DOI-cited paragraphs |
| 67 | Person schema missing `url`, `nationality`, `alumniOf` | Enrich Dr. Anca's schema |

### Testing & CI

| # | Issue | Fix |
|---|-------|-----|
| 68 | No CI/CD pipeline | Add `.github/workflows/ci.yml` with build + test |
| 69 | Stale test: Blog newsletter test asserts broken state | `tests/e2e/blog.spec.ts:199-222` — update assertions |
| 70 | Navbar unit test asserts wrong scroll lock target | `tests/unit/Navbar.test.tsx:142` — change to `document.documentElement` |
| 71 | No axe-core automated a11y scanning | Add to E2E test suite |
| 72 | No visual regression tests | Add Playwright screenshot comparison |
| 73 | No E2E test for Contact form | Write spec |
| 74 | External link scan misses 4 pages | Add `/contact`, `/waitlist`, `/terms`, `/privacy` to scan |
| 75 | No `maxLength` on any input field | Add reasonable limits |

### Schema & Structured Data

| # | Issue | Fix |
|---|-------|-----|
| 76 | Eduard and Petrica: minimal Person schema | Add `@id`, `sameAs`, LinkedIn URLs to `index.html` |
| 77 | Organization could be MedicalOrganization | `Contact.tsx:55` |
| 78 | SoftwareApplication missing `operatingSystem`, `applicationSubCategory` | `Pricing.tsx:51` |
| 79 | No WebSite schema with SearchAction | Add to `Home.tsx` |

---

## Quick Wins (< 30 minutes each, high impact)

1. `Home.tsx:268` — Change "Seamless Integration" to "The Between-Visit Workflow"
2. `Blog.tsx` RSS desc — Fix "a product designer" to "an AI specialist"
3. `vercel.json` — Add font Cache-Control headers
4. Delete dead files: `logomark-dark.png`, `eduard-formal.jpg`, `CustomCursor.tsx`, `useScrollReveal.ts`, `useMobile.tsx`
5. `Contact.tsx:127-129` — Wrap emails in `mailto:` links
6. `Home.tsx:72` — Change hero img to `alt="" aria-hidden="true"`
7. All secondary heroes — Replace `paddingTop: 140` with `clamp()`
8. `Breadcrumb.tsx:65` — Fix separator contrast color
9. `llms.txt:37,39` — Remove duplicate GDPR line
10. `index.css:549` — Change `padding-left` to `translateX` on blog-row-hover

---

*Individual audit reports with full file:line references are in `/audit-results/`*
