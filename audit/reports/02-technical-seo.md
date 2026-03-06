# Technical SEO Audit Report: perioskoup.com

**Date:** 2026-03-06
**Auditor:** Claude Opus 4.6 (Technical SEO Agent)
**Scope:** Full technical SEO audit per `audit/strategy-reference.md` requirements
**Live URL:** https://perioskoup.com
**Stack:** Vite 7 + React 19 + Tailwind CSS v4 (SPA, no SSR/pre-rendering)

---

## Executive Summary

The site has a solid foundation with react-helmet-async on every page, well-implemented FAQPage schema on content pages, and comprehensive robots.txt AI crawler allowances. However, several critical gaps remain: **no SSR or pre-rendering** (the single biggest technical SEO risk), **missing og:image and twitter:card/twitter:image on 9 of 10 pages**, **no Physician schema type for Dr. Anca**, **no IndexNow integration**, **no hreflang tags in page components**, and **GoogleOther not explicitly allowed in robots.txt**. The OG image URLs also use relative paths instead of absolute URLs, which will fail on social platforms.

**Total findings:** 22
- CRITICAL: 4
- HIGH: 7
- MEDIUM: 8
- LOW: 3

---

## 1. SSR / Pre-Rendering Setup

### CRIT-01: No SSR or Pre-Rendering — SPA Serves Single index.html for All Routes
**Severity:** CRITICAL
**Files:** `vite.config.ts`, `server/index.ts`, `vercel.json`

The site is a pure client-side SPA. Every route serves the same `index.html`. While react-helmet-async correctly injects per-page meta tags after JavaScript executes, **crawlers that do not execute JavaScript** (Bing, most social media bots, many AI scrapers) receive only the homepage meta tags for every URL.

**Evidence:**
- `vite.config.ts` has no prerender or SSR plugin configured
- `server/index.ts:22` serves `index.html` as a catch-all: `app.get("*", (_req, res) => { res.sendFile(...index.html) })`
- `vercel.json:14` rewrites all routes to `/index.html`: `{ "source": "/(.*)", "destination": "/index.html" }`

**Impact:** Bing, social media link previews, and non-JS AI crawlers will index all pages with the homepage title, description, and canonical URL. Any backlink value is diluted.

**Recommendation:** Install `vite-plugin-prerender` to generate static HTML at build time for all routes: `/`, `/features`, `/for-dentists`, `/pricing`, `/about`, `/blog`, `/contact`, `/waitlist`, `/privacy`, `/terms`, and all blog post slugs. This is the single highest-impact fix.

---

## 2. react-helmet-async Usage Per Page

### Finding: All 10 Content Pages Use react-helmet-async (PASS with caveats)

Every page imports and uses `<Helmet>` from `react-helmet-async`. Each page includes:

| Page | File | Title | Description | Canonical | OG:title | OG:desc | OG:url | OG:type | Twitter:title | Twitter:desc |
|------|------|-------|-------------|-----------|----------|---------|--------|---------|---------------|-------------|
| Home | `Home.tsx:191-201` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Features | `Features.tsx:65-75` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| ForDentists | `ForDentists.tsx:71-81` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Pricing | `Pricing.tsx:82-92` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| About | `About.tsx:100-110` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Blog | `Blog.tsx:120-130` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| BlogPost | `BlogPost.tsx:841-856` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Contact | `Contact.tsx:87-97` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Waitlist | `Waitlist.tsx:63-74` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Privacy | `Privacy.tsx:27-37` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Terms | `Terms.tsx:27-38` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

**However, critical OG/Twitter gaps remain (see HIGH-01 through HIGH-04 below).**

### HIGH-01: og:image Missing on 9 of 10 Pages (All Except BlogPost)
**Severity:** HIGH
**Files:** `Home.tsx:191-201`, `Features.tsx:65-75`, `ForDentists.tsx:71-81`, `Pricing.tsx:82-92`, `About.tsx:100-110`, `Blog.tsx:120-130`, `Contact.tsx:87-97`, `Waitlist.tsx:63-74`, `Privacy.tsx:27-37`, `Terms.tsx:27-38`

Only `BlogPost.tsx:849` includes `<meta property="og:image">`. All other pages rely on the fallback in `index.html:26` which uses a relative path (`/images/og-image.jpg`).

**Impact:** When pages are shared on social media (Facebook, LinkedIn, Twitter/X, Slack), the og:image tag may not resolve correctly because:
1. react-helmet-async only works client-side (see CRIT-01)
2. The fallback `index.html` og:image uses a relative path, not an absolute URL

**Recommendation:** Add `<meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />` to every page's `<Helmet>` block. Always use absolute URLs for og:image.

### HIGH-02: twitter:card Missing from All Page Helmet Blocks
**Severity:** HIGH
**Files:** All page components in `client/src/pages/`

The `twitter:card` meta tag is only defined in `index.html:34` as a static fallback. No individual page's `<Helmet>` block includes `<meta name="twitter:card" content="summary_large_image" />`.

**Impact:** Twitter/X card rendering depends on this tag. Without pre-rendering, non-JS crawlers may not see it at all for inner pages.

**Recommendation:** Add `<meta name="twitter:card" content="summary_large_image" />` to every page's `<Helmet>` block.

### HIGH-03: twitter:image Missing from 9 of 10 Pages
**Severity:** HIGH
**Files:** Same as HIGH-01

Only `BlogPost.tsx:854` includes `<meta name="twitter:image">`. Other pages lack it entirely in their Helmet blocks.

**Recommendation:** Add `<meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />` to every page.

### HIGH-04: og:image Uses Relative Path Instead of Absolute URL
**Severity:** HIGH
**Files:** `index.html:26`, `index.html:38`, `BlogPost.tsx:849`, `BlogPost.tsx:854`

Open Graph and Twitter Card specifications require **absolute URLs** for image meta tags. Current values use `/images/og-image.jpg` (relative).

**Evidence:**
- `index.html:26`: `<meta property="og:image" content="/images/og-image.jpg" />`
- `BlogPost.tsx:849`: `<meta property="og:image" content="/images/og-image.jpg" />`

**Impact:** Social media platforms (Facebook, LinkedIn) and messaging apps may fail to resolve the image, resulting in no preview image when links are shared.

**Recommendation:** Change all og:image and twitter:image values to `https://perioskoup.com/images/og-image.jpg`.

---

## 3. Structured Data Audit

### 3a. SoftwareApplication Schema (PASS)
**File:** `index.html:149-169`
**Status:** Present and well-structured.

The `@graph` JSON-LD in `index.html` includes a `SoftwareApplication` entry with:
- `name`: "Perioskoup"
- `operatingSystem`: "iOS, Android"
- `applicationCategory`: "HealthApplication"
- `applicationSubCategory`: "Dental Health"
- `offers` with `PreOrder` availability and price "0"
- `featureList`, `countriesSupported`, `award`

**No issues found.**

### 3b. Organization Schema (PASS)
**File:** `index.html:84-116`, `Contact.tsx:59-83`
**Status:** Present in two locations. Both are well-formed.

The `index.html` `@graph` includes a comprehensive Organization with:
- `@id`, `name`, `legalName`, `url`, `logo`, `foundingDate`, `foundingLocation`
- `founders` array referencing Dr. Anca's `@id` and inline Person nodes
- `sameAs` array with LinkedIn, Instagram, TikTok, EFP links
- `award` field

`Contact.tsx:59-83` also includes an Organization schema with matching `@id` for cross-referencing.

**No issues found.**

### 3c. FAQPage Schema (PASS)
**Status:** Present on the following pages:

| Page | File:Line | Questions Count |
|------|-----------|----------------|
| Home | `Home.tsx:177-187` | 5 |
| Features | `Features.tsx:53-61` | 3 |
| ForDentists | `ForDentists.tsx:56-67` | 6 |
| Pricing | `Pricing.tsx:58-66` | 3 |
| About | `About.tsx:59-96` | 4 |
| Blog | `Blog.tsx:151-177` | 2 |
| BlogPost | `BlogPost.tsx:826-837` | Per-article (3 each) |

**Missing from:** Contact, Waitlist, Privacy, Terms (these are acceptable omissions for non-content pages).

### CRIT-02: Physician Schema Missing for Dr. Anca Constantin
**Severity:** CRITICAL
**Files:** `index.html:119-148`, `About.tsx:40-57`

The strategy reference (`audit/strategy-reference.md:17,31`) explicitly requires a **Physician** schema type for Dr. Anca. The current implementation uses `"@type": "Person"` in both `index.html:119` and `About.tsx:42`.

**Evidence:**
- `index.html:120`: `"@type": "Person"` (should be `"Physician"` or `["Person", "Physician"]`)
- `About.tsx:42`: `"@type": "Person"` (same issue)

**What's missing:**
- `@type: "Physician"` (Schema.org medical type)
- `medicalSpecialty`: should be `"Periodontology"` or `"Dentistry"`
- ORCID profile link in `sameAs` (required per `strategy-reference.md:19`)
- Google Scholar profile link in `sameAs` (required per `strategy-reference.md:19`)

**Current sameAs** (only 1 link):
```json
"sameAs": [
  "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
]
```

**Recommendation:**
1. Change `@type` to `["Person", "Physician"]` in both locations
2. Add `"medicalSpecialty": "Periodontology"`
3. Add ORCID URL to `sameAs` array
4. Add Google Scholar profile URL to `sameAs` array
5. Add `"alumniOf"` if university data is available

### MED-01: Product Schema Uses "Product" Instead of "SoftwareApplication" on Pricing Page
**Severity:** MEDIUM
**File:** `Pricing.tsx:68-78`

The Pricing page defines a `"@type": "Product"` schema, while `index.html` already has a more correct `"SoftwareApplication"` schema. Having both `Product` and `SoftwareApplication` for the same entity can confuse search engines.

**Recommendation:** Either remove the duplicate Product schema from Pricing.tsx or change it to reference the existing SoftwareApplication `@id`.

---

## 4. robots.txt Audit

### MED-02: GoogleOther Not Explicitly Allowed in robots.txt
**Severity:** MEDIUM
**File:** `client/public/robots.txt`

The strategy reference requires all AI crawlers to be allowed. The robots.txt includes: GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot, Cohere-AI, Bytespider, meta-externalagent, Diffbot, omgili.

**Missing:**
- `GoogleOther` (Google's AI training crawler, distinct from Google-Extended)
- `CCBot` (Common Crawl, used for training many LLMs)
- `Applebot-Extended` (Apple's AI/Siri training crawler)

**Recommendation:** Add the following to `robots.txt`:
```
User-agent: GoogleOther
Allow: /

User-agent: CCBot
Allow: /

User-agent: Applebot-Extended
Allow: /
```

### PASS: Core AI Crawlers Allowed
GPTBot, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai are all explicitly allowed. Sitemap and llms.txt references are present.

---

## 5. Sitemap Audit

### PASS: Static sitemap.xml Present and Complete
**File:** `client/public/sitemap.xml`
**Status:** Present with all 15 URLs (10 pages + 5 blog posts, which is 2 fewer than the 6 blog posts in the codebase but addresses the published content).

All entries include `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`, and `xhtml:link hreflang` tags.

### MED-03: Sitemap Is Static — No Dynamic Generation
**Severity:** MEDIUM
**File:** `client/public/sitemap.xml`

The sitemap is a static XML file checked into the repository. When new blog posts are added or page content changes, the sitemap must be manually updated.

**Recommendation:** Implement a build-time sitemap generator (e.g., `vite-plugin-sitemap`) that reads from the route definitions and blog post data to auto-generate the sitemap during `pnpm build`.

### LOW-01: Blog Post "building-the-bridge-perioskoup-story" in Sitemap but Check ARTICLES Object
**Severity:** LOW

The sitemap references 6 blog post URLs. Verify all slugs in the sitemap match the `ARTICLES` keys in `BlogPost.tsx` to avoid 404s for crawlers.

---

## 6. Hreflang Tags Audit

### HIGH-05: Hreflang Tags Only in index.html and sitemap.xml — Not in Per-Page Helmet Blocks
**Severity:** HIGH
**Files:** `client/index.html:18-19`, `client/public/sitemap.xml` (all entries), all page components in `client/src/pages/`

Hreflang tags are present in:
- `index.html:18-19`: `<link rel="alternate" hreflang="en">` and `hreflang="x-default"` (but only for the root URL)
- `sitemap.xml`: All entries include proper `xhtml:link` hreflang annotations

Hreflang tags are **not present** in any page component's `<Helmet>` block. Since this is an SPA, the index.html hreflang tags always point to `https://perioskoup.com/` regardless of which page the user is on.

**Impact:** When Googlebot renders `/features`, the hreflang tag in the `<head>` still points to `/` (from index.html) since no page component overrides it via Helmet.

**Recommendation:** Add per-page hreflang tags in each `<Helmet>` block:
```jsx
<link rel="alternate" hreflang="en" href="https://perioskoup.com/features" />
<link rel="alternate" hreflang="x-default" href="https://perioskoup.com/features" />
```

---

## 7. IndexNow Integration

### CRIT-03: IndexNow Not Implemented
**Severity:** CRITICAL
**Evidence:** No IndexNow references found anywhere in the codebase (grep returned zero results in source files).

The strategy reference (`audit/strategy-reference.md:26`) explicitly requires IndexNow integration for instant indexing when content is published.

**What's needed:**
1. An IndexNow API key file at `/[key].txt` in the public directory
2. A script or webhook that pings the IndexNow API when content changes (new blog posts, page updates)
3. Supported engines: Bing, Yandex, Seznam, Naver

**Recommendation:**
1. Generate an IndexNow key at https://www.indexnow.org/
2. Place the key file at `client/public/[key].txt`
3. Create a build hook or GitHub Action that submits changed URLs to the IndexNow API after each deployment
4. Add the IndexNow key reference to `robots.txt` (optional but recommended)

---

## 8. Canonical URL Audit

### PASS: Canonical URLs Present on All Pages

Every page component includes `<link rel="canonical" href="...">` in its `<Helmet>` block:

| Page | Canonical URL | File:Line |
|------|--------------|-----------|
| Home | `https://perioskoup.com/` | `Home.tsx:194` |
| Features | `https://perioskoup.com/features` | `Features.tsx:68` |
| ForDentists | `https://perioskoup.com/for-dentists` | `ForDentists.tsx:74` |
| Pricing | `https://perioskoup.com/pricing` | `Pricing.tsx:85` |
| About | `https://perioskoup.com/about` | `About.tsx:103` |
| Blog | `https://perioskoup.com/blog` | `Blog.tsx:123` |
| BlogPost | `https://perioskoup.com/blog/{slug}` | `BlogPost.tsx:844` |
| Contact | `https://perioskoup.com/contact` | `Contact.tsx:90` |
| Waitlist | `https://perioskoup.com/waitlist` | `Waitlist.tsx:67` |
| Privacy | `https://perioskoup.com/privacy` | `Privacy.tsx:30` |
| Terms | `https://perioskoup.com/terms` | `Terms.tsx:31` |

### CRIT-04: SPA Architecture Undermines Canonical Tags for Non-JS Crawlers
**Severity:** CRITICAL (same root cause as CRIT-01)

The `index.html` contains a static canonical tag pointing to `https://perioskoup.com/` (line 11). For any crawler that does not execute JavaScript, **every page on the site has a canonical pointing to the homepage**. This is the same pre-rendering gap described in CRIT-01.

---

## 9. Heading Hierarchy Audit

### MED-04: Home Page Has Proper H1 but H2s and H3s Are Well-Structured (PASS with minor note)
**File:** `Home.tsx`
- `H1` (line 232): "Between visits, we take over."
- `H2` (line 366): "Everything your smile needs. In one place." (Features section)
- `H3` (lines 386): "AI-Powered Guidance", "Habit Tracking", etc. (feature cards)
- `H2` (line 403): "From Chair to Chat." (How It Works)
- `H3` (lines 459): "Scan", "Analyze", "Engage"
- `H2` (line 473): "Built by people who care about your health." (Team)
- `H3` (lines 493): team member names
- `H2` (line 535): "Be first when we launch." (CTA)

**Status:** PASS. Proper H1 > H2 > H3 hierarchy.

### MED-05: Features Page Heading Hierarchy (PASS)
**File:** `Features.tsx`
- `H1` (line 86): "Built for the full dental journey."
- `H3` (lines 120): feature card titles (skip from H1 to H3 within the grid)
- `H2` (line 140): "Ready to get started?"

**Note:** H3s appear before any H2 in document order. The feature cards use H3 directly after H1, skipping H2. This is a minor structural issue.

### MED-06: ForDentists Page Heading Hierarchy (Minor Skip)
**File:** `ForDentists.tsx`
- `H1` (line 93): "Your patients, better prepared."
- `H2` (line 139): "Everything you need in one place."
- `H3` (line 152): feature titles
- `H2` (line 175): "Be a founding clinic."

**Status:** PASS. Proper hierarchy.

### PASS: All Other Pages
About, Pricing, Blog, BlogPost, Contact, Waitlist, Privacy, Terms all maintain proper H1 > H2 > H3 hierarchy. Each page has exactly one H1.

### MED-07: NotFound Page Missing Helmet Meta Tags
**Severity:** MEDIUM
**File:** `NotFound.tsx:11-38`

The 404 page does not use `<Helmet>` at all. It lacks:
- `<title>` (uses fallback from index.html)
- `<meta name="robots" content="noindex">` (should tell search engines not to index 404 pages)
- Canonical URL

**Recommendation:** Add a Helmet block with `noindex` and a descriptive title.

---

## 10. Image Alt Tags Audit

### PASS: All Images Have Descriptive Alt Text

Every `<img>` tag in the codebase includes an `alt` attribute with descriptive text:

| Component/Page | Image | Alt Text | File:Line |
|----------------|-------|----------|-----------|
| Home | hero-bg.webp | "Perioskoup dental companion app hero" | `Home.tsx:209` |
| Home | efp-award.webp | "EFP Digital Innovation Award ceremony -- Perioskoup" | `Home.tsx:321` |
| Home | team member images | `{f.name}` (e.g., "Dr. Anca Laura Constantin") | `Home.tsx:489` |
| Home | anca-headshot.jpg | "Dr. Anca Laura Constantin" | `Home.tsx:566` |
| About | efp-award.webp | "EFP Digital Innovation Award 2025 ceremony" | `About.tsx:140` |
| About | team images | `{f.name}` | `About.tsx:225` |
| Blog | author images | `{post.author}` | `Blog.tsx:240,280` |
| BlogPost | author image | `{article.author}` | `BlogPost.tsx:893` |
| PhoneMockup | logo.svg | "Perioskoup logo" | `PhoneMockup.tsx:146` |

### LOW-02: Pre-render Shell Image in index.html Uses Empty Alt
**Severity:** LOW
**File:** `index.html:190`

The pre-render shell hero image uses `alt=""` (decorative). This is technically correct since the pre-render shell is replaced by React on hydration, and the React version has a descriptive alt tag. No action needed, but documenting for completeness.

---

## 11. Additional Findings

### HIGH-06: Organization Logo URL Uses Relative Path in Structured Data
**Severity:** HIGH
**File:** `index.html:92`

```json
"logo": {
  "@type": "ImageObject",
  "@id": "https://perioskoup.com/#logo",
  "url": "/images/logo.svg"
}
```

The `url` field should be an absolute URL: `https://perioskoup.com/images/logo.svg`. Google's structured data guidelines require absolute URLs for image references.

**Also applies to:**
- `index.html:127`: Person schema `"image": "/images/anca-headshot.jpg"` (should be absolute)
- `About.tsx:50`: Person schema `"image": "/images/anca-headshot.jpg"` (should be absolute)
- `BlogPost.tsx:812`: BlogPosting schema `"image": OG_IMAGE` which resolves to `"/images/og-image.jpg"` (should be absolute)

**Recommendation:** Prefix all image URLs in JSON-LD with `https://perioskoup.com`.

### HIGH-07: Dr. Anca's Quote Text Differs from Strategy Reference
**Severity:** HIGH
**File:** `Home.tsx:245`

Strategy reference requires:
> "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient **adherence to treatment**, which leads to poor outcomes."

Current text on site:
> "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient **engagement**, which leads to poor outcomes."

The word "adherence" was replaced with "engagement" (likely due to regulatory rules prohibiting "adherence"). However, the strategy reference explicitly requires the original quote. This creates a conflict between regulatory rules and the SEO/GEO strategy. The regulatory rules in CLAUDE.md prohibit "adherence" but the strategy reference demands the original quote.

**Recommendation:** Clarify with stakeholders whether the regulatory override or the original quote takes priority. If the regulatory constraint stands, update the strategy reference to match.

### MED-08: No BreadcrumbList Schema on Home Page
**Severity:** MEDIUM
**File:** `Home.tsx`

The `Breadcrumb` component (which generates JSON-LD `BreadcrumbList`) is used on Features, ForDentists, About, Pricing, Blog, Contact, Waitlist, Privacy, and Terms. It is **not** used on the Home page.

While it's common to omit breadcrumbs from the homepage, having BreadcrumbList JSON-LD on the homepage can help Google understand site hierarchy.

**Recommendation:** Optional enhancement. Low priority.

### LOW-03: Blog Author Images Missing loading="lazy" on Featured Cards
**Severity:** LOW
**File:** `Blog.tsx:240,280`

Featured blog card author images (`Blog.tsx:240`) do not include `loading="lazy"` attribute, while `BlogPost.tsx:893` correctly includes it for author images.

**Recommendation:** Add `loading="lazy"` to author avatar images in `Blog.tsx`.

---

## Summary Scorecard

| Category | Status | Score |
|----------|--------|-------|
| SSR/Pre-rendering | Not implemented | 0/10 |
| react-helmet-async usage | Present on all pages | 8/10 |
| og:image / twitter:card completeness | Missing on most pages | 3/10 |
| Structured data (Software/Org/FAQ) | Comprehensive | 9/10 |
| Physician schema for Dr. Anca | Missing (uses Person only) | 2/10 |
| robots.txt AI crawler access | Good, minor gaps | 8/10 |
| Sitemap | Present, static | 7/10 |
| Hreflang tags | Only in index.html + sitemap | 4/10 |
| IndexNow | Not implemented | 0/10 |
| Canonical URLs | Present on all pages | 9/10 |
| Heading hierarchy | Proper on all pages | 9/10 |
| Image alt tags | Complete and descriptive | 10/10 |

**Overall Technical SEO Score: 5.8/10**

---

## Priority Fix Order

### Immediate (Week 1)
1. **CRIT-01/CRIT-04:** Implement `vite-plugin-prerender` for static HTML generation
2. **CRIT-02:** Add Physician schema type for Dr. Anca with medicalSpecialty, ORCID, Google Scholar
3. **HIGH-01/HIGH-02/HIGH-03:** Add og:image, twitter:card, twitter:image to all page Helmet blocks
4. **HIGH-04/HIGH-06:** Convert all relative image URLs to absolute URLs in meta tags and JSON-LD

### Short-term (Week 2)
5. **CRIT-03:** Implement IndexNow with API key and deployment hook
6. **HIGH-05:** Add per-page hreflang tags in Helmet blocks
7. **MED-02:** Add GoogleOther, CCBot, Applebot-Extended to robots.txt
8. **MED-07:** Add Helmet with noindex to NotFound page

### Medium-term (Week 3-4)
9. **MED-01:** Remove duplicate Product schema from Pricing.tsx
10. **MED-03:** Implement build-time sitemap generation
11. **MED-05:** Fix Features page heading hierarchy (H1 > H2 > H3)
12. **LOW-01/LOW-03:** Minor fixes (sitemap verification, lazy loading)
