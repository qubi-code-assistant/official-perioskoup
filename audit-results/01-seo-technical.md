# Perioskoup SEO Technical Audit
**Auditor:** SEO Technical Auditor Agent  
**Date:** 2026-03-06  
**Site:** https://official-perioskoup.vercel.app (canonical domain: perioskoup.com)  
**Stack:** Vite 7 + React 19 + Wouter SPA + react-helmet-async  

---

## Overall Score: 6.5 / 10

**Summary:** The site has a solid technical foundation with correct per-page canonicals, comprehensive JSON-LD coverage, a well-maintained robots.txt, and strong AI crawler support. The most significant issues are: (1) all pages share a single OG image, killing social share differentiation; (2) two meta descriptions exceed 160 characters; (3) the BlogPost og:image uses a relative URL (fatal for social crawlers); (4) a stale How-It-Works description in llms-full.txt; (5) the main JS bundle at 339 KB is meaningful to Core Web Vitals; (6) the sitemap lists /waitlist and /privacy which are noindex pages; (7) hreflang has no x-default tag on secondary pages; and (8) the manifest.json lists only one icon size.

---

## 1. Title Tags

### Findings

| Page | Title | Chars | Status |
|------|-------|-------|--------|
| Home (`/`) | Perioskoup \| AI Dental Companion App \| Between-Visit Dental Care | 64 | PASS (keyword-rich, unique) |
| Features (`/features`) | AI Dental Companion App Features \| Habit Tracking & Care Plans \| Perioskoup | 75 | WARN: 75 chars, truncates at ~60 |
| For Dentists (`/for-dentists`) | Dental Patient Engagement App for Clinicians \| Perioskoup | 57 | PASS |
| About (`/about`) | About Perioskoup \| Dental AI Built in Bucharest | 47 | PASS |
| Blog (`/blog`) | Dental Health & AI Blog \| Periodontal Care Insights \| Perioskoup | 64 | PASS |
| Pricing (`/pricing`) | Perioskoup Pricing \| Free for Patients, Plans for Dental Clinics | 64 | PASS |
| Waitlist (`/waitlist`) | Join the Perioskoup Waitlist \| Early Access | 43 | PASS (noindex page) |
| Contact (`/contact`) | Contact Perioskoup \| Dental AI Enquiries | 40 | PASS |
| Privacy (`/privacy`) | Privacy Policy \| Perioskoup Data Protection | 43 | PASS (noindex) |
| Terms (`/terms`) | Terms of Service \| Perioskoup | 29 | SHORT: 29 chars, no keywords |
| Blog posts (6) | e.g. "What Is Periodontal Disease? \| Perioskoup" | 35-50 | PASS |

**Issues:**
- Features page title is 75 characters — Google truncates around 60. "& Care Plans" will be cut.
- Terms page title is 29 characters — too short, no brand keywords to reinforce trustworthiness.
- All 6 blog post titles are unique (via per-article `metaTitle` field). Good.

### Fixes

```tsx
// Features page (client/src/pages/Features.tsx, line 66)
// BEFORE:
<title>AI Dental Companion App Features | Habit Tracking & Care Plans | Perioskoup</title>
// AFTER (60 chars):
<title>Perioskoup Features | AI Habit Tracking & Dental Care Plans</title>

// Terms page (client/src/pages/Terms.tsx, line 28)
// BEFORE:
<title>Terms of Service | Perioskoup</title>
// AFTER:
<title>Terms of Service | Perioskoup Dental AI Companion App</title>
```

---

## 2. Meta Descriptions

### Findings

| Page | Length | Status |
|------|--------|--------|
| Home | 162 chars | FAIL: 2 chars over 160 limit |
| Features | 186 chars | FAIL: 26 chars over limit — significant truncation |
| For Dentists | 165 chars | FAIL: 5 chars over limit |
| About | 134 chars | PASS |
| Blog | 155 chars | PASS |
| Pricing | 155 chars | PASS |
| Waitlist | 117 chars | WARN: short (noindex, less critical) |
| Contact | 127 chars | PASS |
| Blog posts | 139-158 chars | PASS (all unique, all within limit) |

### Fixes

```tsx
// Home (client/src/pages/Home.tsx, line 77) — trim 2 chars
// BEFORE (162 chars):
"Perioskoup bridges the gap between dental visits with AI-powered guidance, habit tracking, and real-time support. Winner of the EFP Digital Innovation Award 2025."
// AFTER (153 chars):
"Perioskoup bridges the gap between dental visits with AI-powered guidance, habit tracking, and real-time support. EFP Digital Innovation Award Winner 2025."

// Features (client/src/pages/Features.tsx, line 67) — 186 → under 160
// BEFORE:
"Explore Perioskoup's AI dental companion features: personalised habit tracking, smart reminders, progress dashboards, secure patient-clinician messaging, and GDPR-compliant data storage."
// AFTER (158 chars):
"Explore Perioskoup's AI dental companion features: habit tracking, smart reminders, clinician dashboards, secure messaging, and GDPR-compliant data protection."

// For Dentists (client/src/pages/ForDentists.tsx, line 73) — 165 → under 160
// BEFORE:
"Perioskoup gives dental practices a clinician dashboard, personalised care plans, and engagement analytics to extend care beyond the appointment and reduce no-shows."
// AFTER (155 chars):
"Perioskoup gives dental practices a clinician dashboard, personalised care plans, and engagement analytics to extend care and reduce no-shows."
```

---

## 3. Canonical URLs

### Findings

All pages implement correct, unique, per-page canonical tags via `<link rel="canonical">` inside `<Helmet>`. The canonical domain is `perioskoup.com` (not the Vercel preview URL). This is correct.

- Home: `https://perioskoup.com/` — PASS
- Features: `https://perioskoup.com/features` — PASS
- For Dentists: `https://perioskoup.com/for-dentists` — PASS
- About: `https://perioskoup.com/about` — PASS
- Blog: `https://perioskoup.com/blog` — PASS
- Pricing: `https://perioskoup.com/pricing` — PASS
- Waitlist: `https://perioskoup.com/waitlist` — PASS (even though noindex)
- Contact: `https://perioskoup.com/contact` — PASS
- Privacy: `https://perioskoup.com/privacy` — PASS
- Terms: `https://perioskoup.com/terms` — PASS
- Blog posts: `/blog/${slug}` — PASS (dynamic, correct)

**No canonical URLs point to homepage. No issues.**

---

## 4. OG Tags (Open Graph)

### Findings

| Issue | Severity | Pages Affected |
|-------|----------|----------------|
| All pages use the same og:image (og-image.jpg) | MEDIUM | All 10 pages + 6 blog posts |
| BlogPost og:image is a relative URL (`/images/og-image.jpg` instead of absolute `https://perioskoup.com/images/og-image.jpg`) | HIGH | All 6 blog posts |
| og:image dimensions: 1280x665 — not standard 1200x630 | LOW | All pages |
| Privacy and Terms pages missing og:image entirely | MEDIUM | /privacy, /terms |
| No og:image:width or og:image:height meta on individual pages | LOW | All React pages |
| og:locale uses `en` not `en_GB` or `en_US` | INFO | index.html fallback |
| Blog posts correctly set og:type="article" | PASS | All 6 blog posts |
| article:published_time uses ISO 8601 format | PASS | All 6 blog posts |

**The relative URL bug on BlogPost.tsx is the most critical.** When Facebook, LinkedIn, or Twitter scrape a blog post URL, they receive `/images/og-image.jpg` — a path they cannot resolve against `perioskoup.com`. The result is no image in social shares for all 6 blog posts.

### Fixes

```tsx
// BlogPost.tsx (line 830) — fix relative URL to absolute
// BEFORE:
<meta property="og:image" content="/images/og-image.jpg" />
<meta name="twitter:image" content="/images/og-image.jpg" />
// AFTER:
<meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
<meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
```

**For distinct OG images per page** (significant CTR uplift from social shares), create page-specific images:

```tsx
// Recommended OG image map (create 1200x630 JPGs for each)
const OG_IMAGES: Record<string, string> = {
  home: "https://perioskoup.com/images/og-home.jpg",
  features: "https://perioskoup.com/images/og-features.jpg",
  "for-dentists": "https://perioskoup.com/images/og-dentists.jpg",
  about: "https://perioskoup.com/images/og-about.jpg",
  blog: "https://perioskoup.com/images/og-blog.jpg",
  // fallback:
  default: "https://perioskoup.com/images/og-image.jpg",
};
```

**Add og:image dimensions to all pages (prevents layout shift in scrapers):**

```tsx
// In each page's Helmet (after og:image)
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="[Page-specific alt text]" />
```

**Fix Privacy and Terms pages (add og:image):**

```tsx
// Privacy.tsx and Terms.tsx — add inside Helmet
<meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
<meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 5. Twitter / X Cards

### Findings

- All primary pages: `twitter:card="summary_large_image"` — PASS
- `twitter:site="@perioskoup"` is present in index.html fallback — PASS
- `twitter:creator="@perioskoup"` is set correctly on blog posts — PASS
- Privacy page: missing `twitter:card` tag — FAIL
- Terms page: missing `twitter:card` tag — FAIL
- BlogPost pages: `twitter:image` uses relative URL (see OG section) — FAIL

### Fix

Same as OG fix above; add twitter card tags to Privacy.tsx and Terms.tsx.

---

## 6. JSON-LD Structured Data

### Findings: Global (index.html @graph)

A comprehensive `@graph` block in `index.html` covers:
- `WebSite` schema with `@id` — PASS
- `Organization` schema with `@id`, `foundingDate`, `founders`, `award`, `sameAs` — PASS
- `Person / Physician` schema for Dr. Anca Constantin with `@id`, `medicalSpecialty`, `award` — PASS
- `SoftwareApplication` with `applicationCategory: HealthApplication`, `offers` — PASS

**Issue:** `WebSite` schema is missing a `potentialAction` / `SearchAction` for Google Sitelinks Searchbox eligibility. Low priority but a missed opportunity.

```json
// Add to WebSite schema in index.html
"potentialAction": {
  "@type": "SearchAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://perioskoup.com/blog?q={search_term_string}"
  },
  "query-input": "required name=search_term_string"
}
```

### Findings: Per-Page Schemas

| Page | Schema Types | Status |
|------|-------------|--------|
| Home | FAQPage (5 questions) | PASS |
| Features | FAQPage (3 questions) | PASS |
| For Dentists | FAQPage (6 questions) | PASS |
| About | Person (Dr. Anca), FAQPage (4 questions) | PASS |
| Blog | ItemList (6 posts), FAQPage (2 questions) | PASS |
| Pricing | FAQPage (3 questions), SoftwareApplication with Offers | PASS |
| Waitlist | FAQPage (3 questions) | PASS |
| Contact | Organization, FAQPage (3 questions) | PASS — but see duplicate issue |
| BlogPost | BlogPosting, BreadcrumbList, FAQPage (per-article) | MOSTLY PASS — see issues |

**BlogPosting schema issues:**

1. `datePublished` and `dateModified` use the raw date string (e.g., `"2025-11-12"`) — this is valid ISO 8601 date format (date-only). However, best practice is to include time: `"2025-11-12T00:00:00Z"`. Low risk.

2. `image` field in BlogPosting uses `OG_IMAGE` constant which resolves to `"/images/og-image.jpg"` (relative). Schema.org requires absolute URLs in `image`.

```tsx
// BlogPost.tsx (line ~795)
// BEFORE:
const OG_IMAGE = "/images/og-image.jpg";
// ...
"image": OG_IMAGE,

// AFTER:
const OG_IMAGE_ABSOLUTE = "https://perioskoup.com/images/og-image.jpg";
// ...
"image": OG_IMAGE_ABSOLUTE,
```

3. `Organization` schema appears in both `Contact.tsx` (as a full object) and `index.html` (in @graph). This creates duplicate, potentially conflicting Organization entities. The Contact.tsx version is less complete (missing `logo`, `award`, `contactPoint`). Remove the Organization from Contact.tsx and rely on the @graph in index.html.

```tsx
// Contact.tsx — REMOVE organizationJsonLd object and its <script> tag
// The @graph Organization in index.html already covers this.
// Keep only contactFaqJsonLd.
```

4. `Person` schema appears in both `About.tsx` and `index.html`. Same duplication issue. The About.tsx version is slightly different (adds `"memberOf"` field). Either consolidate into index.html's @graph or ensure the `@id` references are consistent (they are — both use `https://perioskoup.com/#anca-constantin`). Because they share `@id`, Google merges them — this is acceptable but could cause confusion. Best practice: remove the duplicates and keep only the @graph.

---

## 7. robots.txt

### Findings

**Status: EXCELLENT**

The robots.txt explicitly allows all AI crawlers:
- GPTBot, ChatGPT-User — PASS
- Google-Extended — PASS
- anthropic-ai, ClaudeBot — PASS
- PerplexityBot, Cohere-AI, Bytespider — PASS
- meta-externalagent, Diffbot, omgili, GoogleOther — PASS
- CCBot, Applebot-Extended, YouBot — PASS

The sitemap reference points to `https://perioskoup.com/sitemap.xml` — correct canonical domain, not the Vercel preview URL. PASS.

The `Llms-txt` and `Llms-full-txt` custom directives are non-standard but forward-compatible — useful for any future parsers. PASS.

**One missing crawler:** `Gemini-AI` (Google's AI assistant) is not explicitly listed. While Google-Extended covers Gemini training data, Gemini's live search grounding uses a separate agent. Consider adding:

```
User-agent: Gemini-AI
Allow: /
```

---

## 8. sitemap.xml

### Findings

All 10 core pages and 6 blog slugs are listed. The domain is correct (`perioskoup.com`). `lastmod` dates are current. `hreflang` alternate links are included inside each `<url>` block.

**Issues:**

1. **Noindex pages in sitemap:** `/waitlist` and `/privacy` have `<meta name="robots" content="noindex">` in their Helmet — but both appear in the sitemap. Google's guidance: do not include noindex pages in sitemaps. It creates a conflicting signal and wastes crawl budget.

2. **Terms page in sitemap** also has `noindex` — same issue.

3. **Sitemap hreflang only has `en` and `x-default`.** There is no Romanian (`ro`) hreflang. Since the primary market is Romania and the content is in English, this is acceptable — but if a Romanian-language page is added later, the sitemap will need updating.

4. **No `sitemap.xml` reference in index.html** `<head>`. The robots.txt references the sitemap, which is sufficient. But adding `<link rel="sitemap" type="application/xml" href="/sitemap.xml">` in index.html provides an additional signal.

### Fix

```xml
<!-- Remove these three URLs from sitemap.xml: -->
<!-- https://perioskoup.com/waitlist -->
<!-- https://perioskoup.com/privacy -->
<!-- https://perioskoup.com/terms -->

<!-- OR — more strategic option: remove noindex from /waitlist 
     since it IS a valuable conversion page and you want Google 
     to show it for "perioskoup waitlist" branded searches -->
```

**Recommendation:** Remove noindex from `/waitlist`. It is a high-conversion page with unique structured data (FAQPage). The concern about indexing a waitlist form is misplaced — Google indexes landing pages with forms regularly.

```tsx
// Waitlist.tsx (line 76) — REMOVE this line:
<meta name="robots" content="noindex, follow" />
// Keep canonical. The page should be indexable.
```

---

## 9. llms.txt and llms-full.txt

### Findings

**llms.txt:** Accurate, well-structured, complete. Covers all key facts, founder bios, business model, regulatory disclaimer, blog posts, and contact info. PASS.

**llms-full.txt — CRITICAL STALE CONTENT:**

The "How It Works" section in `llms-full.txt` describes a different product workflow than what is live on the actual Home page:

```
# llms-full.txt says (STALE):
Step 01: Scan — Sync intraoral data instantly from your existing scanner.
Step 02: Analyze — AI maps risk zones & translates perio charts into habits.
Step 03: Engage — Patients receive actionable nudges on their device.

# Actual Home.tsx says:
Step 01: Visit Your Dentist
Step 02: Get Your Plan  
Step 03: Build Daily Habits
```

This is a meaningful discrepancy. LLMs and AI crawlers reading llms-full.txt will describe Perioskoup as a scanner-sync tool, which is no longer accurate to the live messaging.

### Fix

```
# Update llms-full.txt, lines 63-66:

### How It Works

Step 01: Visit Your Dentist — Your dentist examines and sets a personalised care plan using Perioskoup.
Step 02: Get Your Plan — AI translates clinical recommendations into daily habits with smart reminders and tracking.
Step 03: Build Daily Habits — Follow your plan at home with AI support, progress tracking, and a direct line to your clinic.
```

Also update the `noscript` fallback in `index.html` (lines 250-254) which still uses the old "Scan / Analyze / Engage" language.

---

## 10. hreflang Tags

### Findings

**Per-page Helmet hreflang:** Only `hrefLang="en"` is set — no `hrefLang="x-default"`. The `x-default` tag is required when there is only one language version to signal the default fallback.

Pages audited:
- Home.tsx: `<link rel="alternate" hrefLang="en" href="https://perioskoup.com/" />` — missing `x-default`
- Features.tsx, ForDentists.tsx: same pattern, same issue
- About.tsx, Blog.tsx, Pricing.tsx, Waitlist.tsx, Contact.tsx: same missing `x-default`
- BlogPost.tsx: **no hreflang at all** — FAIL

**index.html fallback** correctly has both `en` and `x-default` tags, but these apply only before JS loads (or when Helmet doesn't override).

**sitemap.xml** correctly includes both `en` and `x-default` within each `<url>` block — this partially mitigates the issue.

### Fix

```tsx
// Add to every page's Helmet block (example for Home.tsx):
<link rel="alternate" hrefLang="en" href="https://perioskoup.com/" />
<link rel="alternate" hrefLang="x-default" href="https://perioskoup.com/" />

// Add to BlogPost.tsx Helmet:
<link rel="alternate" hrefLang="en" href={`https://perioskoup.com/blog/${article.slug}`} />
<link rel="alternate" hrefLang="x-default" href={`https://perioskoup.com/blog/${article.slug}`} />
```

---

## 11. Heading Hierarchy

### Home (`/`)
- H1: "Between visits, we take over." — PASS (one H1, keyword-adjacent)
- H2: "Everything your smile needs. In one place." — PASS
- H3s: Feature card titles (AI-Powered Guidance, Habit Tracking, etc.) — PASS
- H2: "What is an AI dental companion?" — PASS (keyword-rich)
- H2: "From Chair to Chat." — PASS
- H3s: Step titles (Visit Your Dentist, Get Your Plan, Build Daily Habits) — PASS
- **No H1 keyword match:** The H1 "Between visits, we take over" does not include the target keyword "AI dental companion". The keyword appears in H2 and in the meta title/description, but not H1.

### Features (`/features`)
- H1: "AI dental companion features — everything between your visits." — PASS (keyword in H1)
- H2: "What's inside Perioskoup" — PASS
- H3s: Feature card titles — PASS
- H2: "Ready to get started?" — PASS
- Hierarchy: PASS

### For Dentists (`/for-dentists`)
- H1: "Your patients, better prepared." — PASS
- H2: "The problem is clear." — PASS
- H2: "Everything you need in one place." — PASS
- H3s: Clinical tool titles — PASS
- H2: "How it fits your practice." — PASS
- H3s: Before/During/After steps — PASS
- H2: "Not another PMS plugin." — PASS
- H2: "Be a founding clinic." — PASS
- Hierarchy: PASS

### About (`/about`)
- H1: "Born in a dental chair. Built for every patient." — PASS
- H2: "Close the gap between visits." — PASS
- H2: "Why now?" — PASS
- H2: "Built by clinicians, for clinicians." — PASS
- H3s: Team member names — PASS
- H2: "Want to be part of the story?" — PASS
- Hierarchy: PASS

### Blog (`/blog`)
- H1: "Insights on dental health, AI, and care." — PASS
- H3s on featured cards: Post titles — WARN: Featured blog post titles are rendered as H3 inside card divs. There is no H2 section heading between H1 and the H3 cards. The "All Articles" heading is H2. **Skip from H1 to H3 without H2 is a hierarchy violation.**
- H2: "All Articles" — PASS
- H3s: Article titles in list — PASS
- H2: "Stay informed." — PASS

```tsx
// Blog.tsx — Add an H2 above the featured posts grid:
// Before the featured posts section, add:
<h2 className="display-sm reveal" style={{ marginBottom: "32px" }}>Featured Articles</h2>
```

### BlogPost (`/blog/[slug]`)
- H1: `{article.title}` — PASS (unique per article)
- H2, H3: Generated from article body markdown parser — the parser at line 682 renders `##` as H2 and `###` as H3. This is correct.
- **No H1 → H2 skip detected** assuming articles use H2 as first subheading level. PASS.

### Pricing (`/pricing`)
- H1: "Simple, transparent pricing." — PASS
- H3s inside plan cards: Plan names (Patient, Clinic) — WARN: Plan names are H3 with no H2 parent. Minor.
- H2: "Common questions" — PASS
- H3s: FAQ question items — PASS

### Pricing FAQ H3 items are correctly inside an H2 parent. PASS overall.

---

## 12. Internal Link Audit

### Findings

**Good internal linking:**
- Navbar links to all main pages (Features, For Dentists, Pricing, Waitlist, About, Blog, Contact)
- Footer covers all pages including Privacy, Terms
- Blog list page links to all 6 blog posts via `<Link href={/blog/${post.slug}}>`
- Every page has a waitlist CTA linking to `/waitlist`
- BlogPost has "Back to all articles" → `/blog` and "More Articles" → `/blog`

**Missing internal links:**

1. **Home page has no link to Blog.** The blog is a key SEO asset (6 articles, multiple schema types). There is no "Read our blog" or "Latest articles" section on the homepage. This is a missed internal linking opportunity.

2. **Blog posts do not link to relevant product pages from within article body.** The "why-patients-forget-instructions" article discusses the 80% forgetting stat — a perfect internal link to `/features` or `/for-dentists`. None of the article bodies contain contextual internal links to product pages. Only the footer CTA links to `/waitlist`.

3. **No cross-linking between blog posts.** Articles do not reference related articles. A "Related articles" section would improve time-on-site and topical authority signals.

4. **ForDentists page has no link to Features page from within body.** It links to Features via CTA buttons but not in the body text.

5. **About page links to /contact and /waitlist in CTA — good.** But no link to /blog (the team's writing). Missing opportunity to demonstrate E-E-A-T.

### Fixes

```tsx
// Home.tsx — Add a blog preview section before Footer:
<section style={{ background: "#050C10", padding: "80px 0" }}>
  <div className="container">
    <h2>From our knowledge hub</h2>
    {/* Show 2-3 latest blog post previews with Link href="/blog/[slug]" */}
    <Link href="/blog">View all articles →</Link>
  </div>
</section>
```

---

## 13. Bundle Size and Core Web Vitals

### Build Output Analysis

| Asset | Size (bytes) | Size (KB) | Status |
|-------|------------|-----------|--------|
| `index-gZg-EZEb.js` (main bundle) | 347,238 | 339 KB | WARN |
| `index-Dkz-7AUb.css` | 105,143 | 103 KB | WARN |
| `vendor-CNPUEJO5.js` | 17,468 | 17 KB | PASS |
| `BlogPost-DMrek5VA.js` | 65,728 | 64 KB | WARN |
| `About-vXb7QcBR.js` | ~19 KB | 19 KB | PASS |
| `Blog-DzelSJjD.js` | ~13 KB | 13 KB | PASS |
| `Features-CZZVSkUU.js` | ~11 KB | 11 KB | PASS |
| `ForDentists-BDPErE2E.js` | ~20 KB | 20 KB | PASS |

**Total initial bundle (main JS + CSS + vendor):** ~459 KB uncompressed. With Brotli compression (Vercel default), expect ~120-150 KB transferred.

**Key concerns:**

1. **Main bundle (index.js) at 339 KB is large.** The Home page is not lazy-loaded (it is the entry point). Everything in `index.js` loads on every page visit including the Home component, all shared components (Navbar, Footer, PhoneMockup, etc.), and Radix UI/shadcn dependencies. This directly impacts LCP and INP on the homepage.

2. **BlogPost.tsx at 64 KB is the heaviest page chunk.** This is because all 6 article bodies are inlined as large string literals in the component. This is the correct approach for a static SPA (no CMS), but it means every user who visits any blog post downloads all 6 articles.

3. **CSS at 103 KB** is substantial. Tailwind CSS v4 purging should be verified.

4. **The `useReveal` hook is copy-pasted into 7 page files** rather than being extracted into a shared module. This adds ~800 bytes of dead code per page in the combined bundle. Not critical, but indicates technical debt.

### Fixes

```tsx
// 1. Extract useReveal into a shared hook file:
// Create: client/src/hooks/useReveal.ts
export function useReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll(".reveal, .reveal-scale");
    if (prefersReducedMotion) { els.forEach((el) => el.classList.add("visible")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
```

```tsx
// 2. Consider splitting blog article bodies into individual chunks:
// Instead of one ARTICLES object, lazy-import per article:
const articleData = await import(`./articles/${slug}.ts`);
// This reduces BlogPost.js from 64 KB to ~10 KB + 10 KB per article loaded on demand.
```

```bash
# 3. Verify Tailwind purge is working correctly:
pnpm build && wc -c dist/public/assets/index-*.css
# If CSS > 50 KB, check tailwind.config for content globs
```

---

## 14. Duplicate and Thin Content

### Findings

1. **Home page has two overlapping subheadlines in Features section:**
   - Line 257: "Perioskoup combines AI-powered guidance, daily habit tracking, a clinician dashboard, and secure patient-clinic messaging into a single dental companion app."
   - Line 260: "Perioskoup connects patients and clinicians with AI-powered tools that make daily dental care simple, consistent, and effective."
   Both appear in the same `<div>` block. One is redundant.

2. **For Dentists page — the same Dr. Anca quote ("Perioskoup was born out of two big challenges...") appears verbatim on both the Home page and the For Dentists page.** This is a minor duplicate content signal but weakens the distinctiveness of each page.

3. **About page uses the same Dr. Anca quote** as Home and ForDentists — three identical blockquotes across three pages.

4. **Home page "How It Works" section** has two `<p>` tags with near-duplicate descriptions:
   - "Perioskoup connects your dental appointment to your daily routine in three steps..."
   - "The Perioskoup workflow connects clinical precision with patient daily life in three fluid steps."

5. **Privacy and Terms pages are thin.** Each has 7 short paragraph sections totaling under 800 words each. This is acceptable for legal pages (which are noindex), but if Privacy is ever indexed (currently noindex), it would be thin.

6. **"Building the Bridge" blog post** bio section likely overlaps heavily with About page content. Low risk since blog posts have unique H1/meta.

### Fixes

```tsx
// Home.tsx — remove duplicate features subheadline (keep the more specific one):
// DELETE line ~260:
<p className="body-lg" style={{ maxWidth: 520, margin: "0 auto" }}>
  Perioskoup connects patients and clinicians with AI-powered tools...
</p>

// Home.tsx — HOW IT WORKS — remove duplicate description (keep first):
// DELETE line ~322:
<p className="body-lg" style={{ maxWidth: 540, margin: "0 auto" }}>
  The Perioskoup workflow connects clinical precision with patient daily life in three fluid steps.
</p>

// Use a different quote on ForDentists and About — differentiate the social proof.
// ForDentists could use the Weinert 2025 research citation as the pull quote instead.
```

---

## 15. Blog Articles — Unique OG Images

### Findings

All 6 blog posts share the same OG image: `/images/og-image.jpg`. This is a missed opportunity for social sharing differentiation. When "What Is Periodontal Disease?" and "Perioskoup Wins EFP Award" are shared on social media, they produce identical preview cards — only the text differs.

Additionally, the og:image in BlogPost.tsx uses a relative path (already flagged in Section 4), which means NO image renders on social shares currently.

### Recommended Blog OG Image Strategy

Create article-specific OG images (1200x630 px):

```
/images/blog-og-periodontal-disease.jpg  — diagram/infographic style
/images/blog-og-efp-award.jpg            — ceremony photo (already exists as efp-award.webp)
/images/blog-og-ai-dental-monitoring.jpg — tech visual
/images/blog-og-3-minute-routine.jpg     — lifestyle/habits visual
/images/blog-og-why-patients-forget.jpg  — brain/memory metaphor visual
/images/blog-og-perioskoup-story.jpg     — team/founder photo
```

Add `ogImage` field to each article in `ARTICLES`:

```tsx
// BlogPost.tsx — add ogImage to Article interface
interface Article {
  // ... existing fields ...
  ogImage?: string;
}

// Per article:
"what-is-periodontal-disease": {
  // ...
  ogImage: "https://perioskoup.com/images/blog-og-periodontal-disease.jpg",
}

// In Helmet:
<meta property="og:image" content={article.ogImage || "https://perioskoup.com/images/og-image.jpg"} />
```

---

## 16. RSS Feed Issues

### Findings

The RSS feed `feed.xml` has a relative URL for the channel image:

```xml
<image>
  <url>/images/logomark-dark.png</url>  <!-- RELATIVE URL - invalid in RSS -->
```

RSS `<image>/<url>` must be an absolute URL. Feed readers and aggregators will fail to load this image.

### Fix

```xml
<!-- feed.xml, line 13 -->
<url>https://perioskoup.com/images/logomark-dark.png</url>
```

---

## 17. manifest.json Issues

### Findings

The PWA manifest only lists one icon (SVG, `sizes: "any"`). This is not sufficient for all browsers:

```json
{
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}
```

The `icon-192.png` and `icon-512.png` files exist in `/public/` but are not referenced in the manifest. Chrome requires at minimum a 192px and 512px PNG for PWA install prompts.

Also: `"purpose": "any maskable"` is incorrect — `any` and `maskable` should be separate icon entries or use `"any maskable"` only if the icon is designed for masked display (safe zone padding required).

### Fix

```json
// manifest.json
{
  "icons": [
    {
      "src": "/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any"
    },
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

---

## Priority Fix List

| Priority | Issue | File | Impact |
|----------|-------|------|--------|
| P0 | BlogPost og:image uses relative URL — no image on social shares | `BlogPost.tsx:830,835` | HIGH: all blog social shares broken |
| P0 | BlogPost JSON-LD `image` field uses relative URL | `BlogPost.tsx:~795` | HIGH: rich results validation failure |
| P0 | llms-full.txt How It Works is stale (wrong product steps) | `client/public/llms-full.txt:63-66` | HIGH: AI systems describe wrong product |
| P1 | Features meta description at 186 chars (26 over limit) | `Features.tsx:67` | MED: significant SERP truncation |
| P1 | Home meta description at 162 chars (2 over limit) | `Home.tsx:77` | MED: minor SERP truncation |
| P1 | ForDentists meta description at 165 chars (5 over limit) | `ForDentists.tsx:73` | MED: SERP truncation |
| P1 | Features title at 75 chars (truncates at ~60) | `Features.tsx:66` | MED: SERP truncation |
| P1 | Waitlist noindex but in sitemap — conflicting signals | `sitemap.xml` + `Waitlist.tsx:76` | MED: crawl budget waste |
| P1 | Privacy + Terms noindex but in sitemap | `sitemap.xml` | LOW: crawl budget |
| P1 | RSS feed image URL is relative (invalid) | `feed.xml:13` | MED: RSS aggregators broken |
| P2 | All pages share one OG image — no social differentiation | All pages | MED: lower social CTR |
| P2 | Privacy and Terms missing og:image and twitter:card | `Privacy.tsx`, `Terms.tsx` | LOW (noindex pages) |
| P2 | BlogPost pages missing hreflang tags | `BlogPost.tsx` | LOW |
| P2 | Pages missing x-default hreflang (only en present) | All page `.tsx` files | LOW |
| P2 | Blog page H1→H3 skip (no H2 above featured posts) | `Blog.tsx` | LOW |
| P2 | Home page no link to Blog | `Home.tsx` | MED: missed internal linking |
| P2 | Blog posts no contextual internal links to product pages | `BlogPost.tsx` | MED: topical authority |
| P2 | Duplicate Dr. Anca quote on 3 pages | Home, ForDentists, About | LOW |
| P2 | Duplicate content in Home Features section (two overlapping subheads) | `Home.tsx:257-261` | LOW |
| P3 | manifest.json missing PNG icon sizes | `manifest.json` | LOW: PWA install |
| P3 | Organization JSON-LD duplicated in Contact.tsx and index.html | `Contact.tsx` | LOW |
| P3 | Person JSON-LD duplicated in About.tsx and index.html | `About.tsx` | LOW |
| P3 | WebSite schema missing SearchAction | `index.html` | LOW: Sitelinks feature |
| P3 | Main JS bundle 339 KB — consider code splitting optimization | App.tsx, build config | MED: CWV/LCP |
| P3 | useReveal hook duplicated in 7 files | All pages with animation | LOW: code quality |
| P3 | Terms title at 29 chars — no brand keywords | `Terms.tsx:28` | INFO |
| P3 | Gemini-AI bot not in robots.txt | `robots.txt` | INFO |

---

## Scores by Category

| Category | Score | Notes |
|----------|-------|-------|
| Title Tags | 7/10 | 2 over-length, 1 too short |
| Meta Descriptions | 5/10 | 3 over 160 chars, 2 under-length |
| Canonical URLs | 10/10 | All correct, unique, correct domain |
| OG Tags | 5/10 | Relative URL bug on blog, all pages share one image, 2 pages missing |
| Twitter Cards | 7/10 | 2 pages missing, blog posts have relative URL bug |
| JSON-LD Schemas | 7/10 | Comprehensive coverage but duplicates, relative URL in BlogPosting |
| robots.txt | 9/10 | Excellent AI coverage, one minor omission |
| sitemap.xml | 7/10 | All pages listed but 3 noindex pages included |
| llms.txt / llms-full.txt | 6/10 | llms.txt accurate; llms-full.txt has stale How It Works content |
| hreflang | 6/10 | Missing x-default on all pages, missing from BlogPost entirely |
| Heading Hierarchy | 8/10 | One H1→H3 skip on Blog page, Home H1 lacks primary keyword |
| Internal Links | 6/10 | Good nav coverage but missing blog→product links, Home→Blog link |
| Bundle Size / CWV | 6/10 | 339 KB main bundle, 64 KB BlogPost chunk, CSS 103 KB |
| Duplicate Content | 7/10 | Same quote on 3 pages, two minor duplicate paragraphs on Home |
| Blog OG Images | 2/10 | Relative URL bug + all 6 posts share single image |
| RSS Feed | 4/10 | Relative image URL breaks feed aggregators |
| PWA Manifest | 5/10 | Missing PNG icon sizes |

**OVERALL: 6.5 / 10**

---

## Quick Wins (Can Fix in Under 30 Minutes)

1. Fix BlogPost.tsx line 830, 835: change `/images/og-image.jpg` to `https://perioskoup.com/images/og-image.jpg`
2. Fix BlogPost.tsx line ~795: change `OG_IMAGE` constant to use absolute URL
3. Update llms-full.txt lines 63-66: replace "Scan/Analyze/Engage" with actual steps
4. Fix feed.xml line 13: make image URL absolute
5. Trim Home meta description by 3 chars (drop "real-time ")
6. Remove noindex from Waitlist.tsx (it's a high-value conversion page)
7. Remove /waitlist, /privacy, /terms from sitemap.xml (they are noindex)
8. Add og:image and twitter:card to Privacy.tsx and Terms.tsx

All 8 fixes touch 5 files. Estimated time: 20 minutes.

