# Perioskoup — SEO Technical Audit
**Date:** 2026-03-06  
**Auditor:** Claude Sonnet 4.6 (SEO Technical Agent)  
**Site:** https://perioskoup.com (official-perioskoup.vercel.app)  
**Stack:** Vite 7 + React 19 + Wouter SPA, deployed on Vercel

---

## OVERALL SCORE: 6.5 / 10

The site has a solid technical foundation — correct per-page canonicals, working JSON-LD hierarchy, proper LCP handling, and an excellent robots.txt with AI crawler allowlist. The issues are concentrated in three areas: (1) missing og:image:width/height and og:image:alt on 10 of 12 pages; (2) the SPA renders client-side only with no prerender, so Googlebot must execute JS to read every per-page meta tag; (3) several schema fields contain data quality problems that will fail Rich Result validation.

---

## SECTION 1 — TITLE TAGS

**Score: 8 / 10**

All pages have unique, keyword-rich titles. All are within acceptable length (under 60 chars for most; under 70 for all).

| Page | Title | Length | Notes |
|------|-------|--------|-------|
| Home | `Perioskoup \| AI Dental Companion App \| Between-Visit Dental Care` | 65 | OK |
| Features | `AI Dental Companion App Features \| Habit Tracking & Care Plans \| Perioskoup` | 77 | OVER 70 chars |
| For Dentists | `Dental Patient Engagement App for Clinicians \| Perioskoup` | 58 | OK |
| About | `About Perioskoup \| Dental AI Built in Bucharest` | 48 | OK |
| Blog | `Dental Health & AI Blog \| Periodontal Care Insights \| Perioskoup` | 65 | OK |
| Pricing | `Perioskoup Pricing \| Free for Patients, Plans for Dental Clinics` | 65 | OK |
| Contact | `Contact Perioskoup \| Dental AI Enquiries` | 41 | Short; no keyword |
| Waitlist | `Join the Perioskoup Waitlist \| Early Access` | 44 | OK |
| Blog: periodontal-disease | `What Is Periodontal Disease? \| Perioskoup` | 43 | OK |
| Blog: efp-award | `EFP Digital Innovation Award 2025 \| Perioskoup` | 48 | OK |
| Blog: AI monitoring | `How AI Is Changing Dental Monitoring \| Perioskoup` | 50 | OK |
| Blog: 3-minute routine | `3-Minute Daily Dental Routine \| Perioskoup` | 44 | OK |
| Blog: why-forget | `Why Patients Forget Dental Instructions \| Perioskoup` | 53 | OK |
| Blog: story | `The Perioskoup Story \| Building the Bridge` | 44 | Missing brand |

### Issues

**SEO-001 [HIGH] Features page title is 77 chars — will be truncated in SERPs.**
`client/src/pages/Features.tsx` line 47  
Current: `AI Dental Companion App Features | Habit Tracking & Care Plans | Perioskoup`  
Fix: `AI Dental Companion App Features | Periodontal Habit Tracking | Perioskoup` (74) or `Perioskoup Features | AI Habit Tracking & Clinician Dashboard` (62)

**SEO-002 [MEDIUM] Title tag mismatch between index.html static fallback and Home.tsx Helmet.**  
`client/index.html` line 8: `Perioskoup — AI Dental Companion App | Between-Visit Dental Care`  
`client/src/pages/Home.tsx` line 51: `Perioskoup | AI Dental Companion App | Between-Visit Dental Care`  
The em-dash in the static title vs pipe in the Helmet title means crawlers that read initial HTML see a different title than JS-rendered crawlers. Align them to the Helmet version (pipe separator is more standard).

**SEO-003 [LOW] Blog story title missing brand signal.**  
`The Perioskoup Story | Building the Bridge` — "Perioskoup" appears only once, "Building the Bridge" adds no keyword value.  
Fix: `Building the Bridge: The Perioskoup Founding Story | AI Dental Companion`

**SEO-004 [LOW] Contact page title has no keyword.**  
`Contact Perioskoup | Dental AI Enquiries` — "Dental AI Enquiries" is not a search term.  
Fix: `Contact Perioskoup | Get in Touch | AI Dental Companion App`

---

## SECTION 2 — META DESCRIPTIONS

**Score: 8 / 10**

All descriptions are unique and within 155 chars. Several are at the limit.

| Page | Length | Status |
|------|--------|--------|
| Home | 155 | At limit — OK |
| Features | 141 | Good |
| For Dentists | 151 | At limit — OK |
| About | 134 | Good |
| Blog | 155 | At limit — OK |
| Pricing | 155 | At limit — OK |
| Contact | 127 | Good |
| Waitlist | 117 | Good |
| Blog: story | 158 | OVER 155 chars — will be truncated |

### Issues

**SEO-005 [LOW] Blog "Building the Bridge" meta description is 158 chars — 3 chars over safe limit.**  
`client/src/pages/BlogPost.tsx` line 575  
Current: `"How a periodontist, a full-stack engineer, and an AI specialist decided to build the dental companion they always wished existed. The Perioskoup origin story."`  
Fix: Remove "The Perioskoup origin story." or shorten to 155: `"How a periodontist, a full-stack engineer, and an AI specialist decided to build the dental companion they always wished existed — the Perioskoup story."`

---

## SECTION 3 — CANONICAL URLS

**Score: 9 / 10**

Per-page canonicals are correctly implemented via react-helmet-async. Each page points to its own URL. No pages wrongly point to the homepage.

### Issues

**SEO-006 [MEDIUM] BlogPost 404-fallback branch has no Helmet/canonical.**  
`client/src/pages/BlogPost.tsx` line 755 — the "Article not found" early-return renders a full page with H1 but no `<Helmet>`. If a bad slug is crawled, there is no canonical and no `noindex`, meaning the 404 UI could be indexed with no meta.  
Fix: Add `<Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>` to the not-found branch.

**SEO-007 [LOW] Trailing slash inconsistency: homepage canonical ends with `/`, all other pages do not.**  
This is correct for the root URL but confirm Vercel does not serve both `perioskoup.com/features` and `perioskoup.com/features/` as separate pages. Current vercel.json rewrites all routes to index.html so both will 200, but only the non-slash version has a canonical. Low risk but worth a permanent redirect rule.

---

## SECTION 4 — OPEN GRAPH TAGS

**Score: 5 / 10**

### Critical Issues

**SEO-008 [CRITICAL] og:image:width and og:image:height missing on 11 of 12 pages.**  
Only `BlogPost.tsx` specifies these. All other pages serve `og:image` without dimensions. Without dimensions, Facebook/LinkedIn must fetch the image before confirming it meets share requirements, adding latency and risking fallback.  

Affected files (all pages except BlogPost):  
`About.tsx`, `Blog.tsx`, `Contact.tsx`, `Features.tsx`, `ForDentists.tsx`, `Home.tsx`, `Pricing.tsx`, `Waitlist.tsx`

Fix for each — add inside `<Helmet>`:
```tsx
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Perioskoup — AI dental companion app" />
```

**SEO-009 [CRITICAL] og:image:alt and twitter:image:alt missing on ALL pages including BlogPost.**  
`client/src/pages/*.tsx` — zero pages set `og:image:alt`. The static `client/index.html` sets it correctly (line 29), but react-helmet-async overrides head on SPA navigation without carrying it over.  

Fix: Add to every page's Helmet:
```tsx
<meta property="og:image:alt" content="Perioskoup — AI dental companion app bridging dental visits" />
<meta name="twitter:image:alt" content="Perioskoup — AI dental companion app bridging dental visits" />
```

**SEO-010 [HIGH] og:locale missing on all pages.**  
`client/index.html` line 31 sets `og:locale` to `en` — but react-helmet-async overrides replace head content, and no page component sets `og:locale`.  

Fix: Add to every page Helmet:
```tsx
<meta property="og:locale" content="en_GB" />
```
Note: Use `en_GB` not `en` — `en` is not a valid BCP 47 locale code for OG. Facebook accepts `en_US` or `en_GB`.

**SEO-011 [HIGH] twitter:site (@perioskoup) missing on ALL inner pages.**  
`client/index.html` line 35 sets it. No page component Helmet sets `twitter:site`. Twitter Card validator will not associate shares with the @perioskoup account.  

Fix: Add to every page Helmet:
```tsx
<meta name="twitter:site" content="@perioskoup" />
```

**SEO-012 [MEDIUM] All pages (including blog posts) share the same generic og:image.**  
Every page uses `https://perioskoup.com/images/og-image.jpg`. Blog posts, the About page (team photo opportunity), and the For Dentists page would all benefit from unique OG images. At minimum, the About page should use the team/award photo.

**SEO-013 [LOW] og:type is "website" on BlogPost pages instead of "article".**  
`client/src/pages/BlogPost.tsx` line 829 correctly sets `og:type` to `"article"`. This is correct. No issue.  
However, `article:section` and `article:tag` are missing.  
Fix: Add:
```tsx
<meta property="article:section" content={article.category} />
<meta property="article:tag" content="periodontal health, dental AI, oral health" />
```

---

## SECTION 5 — TWITTER CARDS

**Score: 7 / 10**

All pages set `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`. The main gaps are `twitter:site` (SEO-011 above) and `twitter:image:alt` (SEO-009 above).

**SEO-014 [MEDIUM] twitter:creator missing on blog post pages.**  
For posts by Dr. Anca, add `twitter:creator` if she has a personal Twitter handle. For Eduard's posts, if applicable. Currently only `twitter:site` is being missed — `twitter:creator` is an additional enhancement.

---

## SECTION 6 — JSON-LD STRUCTURED DATA

**Score: 7 / 10**

The site has comprehensive schema coverage: Organization, Person/Physician, WebSite, SoftwareApplication in the global `index.html` @graph, plus per-page FAQPage, BreadcrumbList (via Breadcrumb component), BlogPosting (BlogPost pages), and ItemList (Blog page). This is strong.

### Issues

**SEO-015 [HIGH] BlogPosting schema datePublished uses ISO date only (YYYY-MM-DD) — schema.org requires ISO 8601 datetime for full Google Rich Result eligibility.**  
`client/src/pages/BlogPost.tsx` line 790:
```js
"datePublished": article.date,  // "2025-11-12"
"dateModified": article.date,   // same as published — no modification tracking
```
Google's article rich results require a full ISO 8601 datetime string.  
Fix:
```js
"datePublished": `${article.date}T00:00:00+00:00`,
"dateModified": `${article.date}T00:00:00+00:00`,
```

**SEO-016 [HIGH] BlogPosting schema `image` field is a URL string — Google requires ImageObject with width and height for full rich result eligibility.**  
`client/src/pages/BlogPost.tsx` line 793:
```js
"image": OG_IMAGE,  // bare URL string
```
Fix:
```js
"image": {
  "@type": "ImageObject",
  "url": OG_IMAGE,
  "width": 1200,
  "height": 630
},
```

**SEO-017 [HIGH] BlogPosting schema `headline` length should be under 110 chars — "What Is Periodontal Disease? A Patient's Complete Guide" is 55 chars (OK), but validate all post titles stay under 110.**

**SEO-018 [MEDIUM] SoftwareApplication schema missing `aggregateRating` — without ratings, the app card in SERPs will not show star ratings.**  
Once the app has user reviews or beta feedback, add:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "30",
  "bestRating": "5"
}
```
This is blocked until launch; flag for post-launch.

**SEO-019 [MEDIUM] WebSite schema missing `potentialAction` (SearchAction) — prevents Google Sitelinks Search Box.**  
`client/index.html` line 70-76  
Fix: Add to WebSite @graph node:
```json
"potentialAction": {
  "@type": "SearchAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://perioskoup.com/blog?q={search_term_string}"
  },
  "query-input": "required name=search_term_string"
}
```
Note: Only add if a blog search feature exists or is planned.

**SEO-020 [MEDIUM] Person schema for Eduard Ciugulea and Petrica Nancu uses inline objects in Organization "founders" array instead of @id references — they have no independent @id, so they cannot be linked from BlogPosting author schema.**  
`client/index.html` lines 99-100  
BlogPost uses Eduard as author for 2 posts. The `worksFor @id` resolves but there is no `@id` for Eduard's Person node to create a stable entity link.  
Fix: Give Eduard and Petrica their own `@id` values in the global @graph:
```json
{
  "@type": "Person",
  "@id": "https://perioskoup.com/#eduard-ciugulea",
  "name": "Eduard Ciugulea",
  "jobTitle": "Co-founder & CGO",
  "worksFor": { "@id": "https://perioskoup.com/#organization" },
  "sameAs": ["https://www.linkedin.com/in/eduard-ciugulea/"]
}
```
Then BlogPost can reference: `"@id": "https://perioskoup.com/#eduard-ciugulea"`

**SEO-021 [MEDIUM] BreadcrumbList in Breadcrumb.tsx uses `window.location.pathname` for the last item's `item` URL when no `href` is provided.**  
`client/src/components/Breadcrumb.tsx` line 28:
```js
item: item.href ? `https://perioskoup.com${item.href}` : `https://perioskoup.com${typeof window !== 'undefined' ? window.location.pathname : '/'}`
```
This is fragile — if the component mounts before the route is fully resolved, `window.location.pathname` could be stale. Since the last breadcrumb item (current page) should always resolve to a known URL, the calling pages should always pass an explicit `href` for all items. Currently, the last item is passed without `href`, relying on `window.location`.  
Fix: Pass `href` for all items and mark the current page differently via `aria-current`, or ensure the last item's URL is passed explicitly from the page component.

**SEO-022 [LOW] FAQPage schema is rendered on multiple pages (Home, Features, ForDentists, About, Blog, Pricing, Contact, Waitlist) — Google may only surface one FAQPage rich result per domain at a time. The FAQ content should be unique per page and not duplicated.**  
"Is Perioskoup a medical device?" appears in both Home.tsx (line 42) and ForDentists.tsx (line 44) FAQPage schemas with nearly identical answer text.

**SEO-023 [LOW] Organization schema in Contact.tsx duplicates the global @graph Organization.**  
`client/src/pages/Contact.tsx` lines 53-76 emits a standalone Organization JSON-LD with `@id: "https://perioskoup.com/#organization"`. This is technically valid (same @id = same entity) but redundant. Remove the Contact-page Organization emission and rely on the global @graph in index.html.

---

## SECTION 7 — ROBOTS.TXT

**Score: 10 / 10**

`client/public/robots.txt` is exemplary:
- Explicitly allows all 14 major AI crawlers (GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, ChatGPT-User, Cohere-AI, Bytespider, meta-externalagent, Diffbot, omgili, GoogleOther, CCBot, Applebot-Extended, YouBot)
- Disallows `/api/*` to protect any API endpoints
- References sitemap
- Includes llms.txt and llms-full.txt links

No issues found. This is best-in-class for AI discoverability.

---

## SECTION 8 — SITEMAP.XML

**Score: 8 / 10**

`client/public/sitemap.xml` covers all 7 core pages and all 6 blog posts with correct `<lastmod>` dates, `<priority>`, and `<changefreq>`. hreflang xhtml:link annotations are present for every URL.

### Issues

**SEO-024 [HIGH] Sitemap is missing `/waitlist`, `/privacy`, and `/terms` — these are live routes.**  
`/waitlist` is intentionally `noindex` (correctly excluded). `/privacy` and `/terms` are also `noindex`. These three exclusions are correct — noindexed pages should not appear in sitemap. No fix needed. ✓

**SEO-025 [MEDIUM] `/contact` appears in sitemap with `priority="0.5"` and `changefreq="yearly"` — this is correct.**  

**SEO-026 [MEDIUM] Blog posts priority should be weighted by strategic keyword value.**  
`what-is-periodontal-disease` targets high-volume patient education. It currently has `priority="0.7"` — the same as all other posts. Consider raising it to `0.9` to signal its SEO priority to crawlers.

**SEO-027 [LOW] Sitemap does not use `<image:image>` extensions to list the OG image per page.**  
Google's image sitemap extension allows: `<image:image><image:loc>URL</image:loc></image:loc></image:image>`  
This helps image indexing but is optional. Add post-launch.

---

## SECTION 9 — LLMS.TXT

**Score: 8 / 10**

`client/public/llms.txt` is well-structured and accurate. One issue found:

### Issues

**SEO-028 [LOW] Duplicate line in llms.txt.**  
`client/public/llms.txt` lines 37 and 39:
```
- GDPR-compliant data storage in EU-based servers
- Educational content library on periodontal conditions and treatments
- GDPR-compliant data storage in EU-based servers   ← DUPLICATE
```
Fix: Remove the second occurrence.

---

## SECTION 10 — HREFLANG TAGS

**Score: 6 / 10**

The static `index.html` sets two hreflang tags correctly (lines 18-19):
```html
<link rel="alternate" hreflang="en" href="https://perioskoup.com/" />
<link rel="alternate" hreflang="x-default" href="https://perioskoup.com/" />
```

### Issues

**SEO-029 [HIGH] No page component sets `hreflang="x-default"` in their Helmet.**  
Every page (About, Blog, Features, etc.) only sets `hrefLang="en"` and omits `x-default`. Since react-helmet-async replaces the head, the `x-default` from index.html is lost on client-side navigation.  

Fix: Add to every page Helmet:
```tsx
<link rel="alternate" hrefLang="en" href="https://perioskoup.com/PAGE_PATH" />
<link rel="alternate" hrefLang="x-default" href="https://perioskoup.com/PAGE_PATH" />
```

**SEO-030 [MEDIUM] BlogPost pages have no hreflang in their Helmet at all.**  
`client/src/pages/BlogPost.tsx` lines 820-840 — no `hreflang` is set. If the site expands to Romanian content in future, this will be a problem. Add the standard en/x-default pair now.

---

## SECTION 11 — HEADING HIERARCHY

**Score: 8 / 10**

All pages have exactly one H1 (correct). The hierarchy is generally well-structured.

### Issues

**SEO-031 [HIGH] BlogPost "Article not found" branch renders H1 without a Helmet — Google may index this page with its H1 as content.**  
`client/src/pages/BlogPost.tsx` line 755: `<h1 style={{...}}>Article not found</h1>`  
No `<Helmet>` wraps this branch — no title, no canonical, no robots tag. Any unknown blog slug is a crawlable 200-status page with thin content.  
Fix: Wrap the not-found return with a Helmet:
```tsx
<Helmet>
  <title>Article Not Found | Perioskoup Blog</title>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>
```

**SEO-032 [MEDIUM] BlogPost H1 has no visible text at component definition level.**  
`client/src/pages/BlogPost.tsx` line 867: `<h1 className="display-md" style={{ marginBottom: "24px" }}>` — the content is `{article.title}` which is correct and dynamic. No actual issue, just flagging for clarity.

**SEO-033 [LOW] Home.tsx "Features" section uses H2 + H3 correctly; "How It Works" section step titles use H3 correctly. However, the "WHAT IS AN AI DENTAL COMPANION" section uses H2 at line 248 but it comes before the "HOW IT WORKS" H2 at line 269 — both are correct H2s under the H1. Hierarchy is valid.**

**SEO-034 [LOW] Footer.tsx uses H3 for column headers ("Product", "Company", "Legal").**  
`client/src/components/Footer.tsx` line 84 — footer nav category headings use `<h3>`. These are not logically H3s in the document hierarchy (no H2 precedes them in the footer). Cosmetically fine but semantically incorrect for document outline.  
Fix: Use `<p>` or `<div>` with appropriate styling, or wrap in a footer `<section>` with appropriate heading level.

---

## SECTION 12 — IMAGE ALT TEXT, DIMENSIONS, AND LAZY LOADING

**Score: 9 / 10**

All `<img>` elements across all pages have `alt` text, explicit `width` and `height` attributes, and appropriate `loading` attributes. The LCP hero image correctly uses `fetchPriority="high"` without `loading="lazy"`.

### Issues

**SEO-035 [HIGH] Hero LCP image in Home.tsx is missing `decoding="sync"` or `decoding="async"`.**  
`client/src/pages/Home.tsx` line 72 does NOT include `decoding` attribute on the LCP image. The pre-render shell in `index.html` line 190 correctly uses `decoding="sync"`, but the React-mounted version does not.  
Fix:
```tsx
<img ... fetchPriority="high" decoding="sync" />
```

**SEO-036 [MEDIUM] The Blog post listing shows author thumbnail images without `loading="lazy"` on the featured post cards.**  
`client/src/pages/Blog.tsx` line 227: `<img src={post.authorImg} alt={post.author} width={32} height={32} .../>` — no `loading` attribute. These are below-fold images.  
Fix: Add `loading="lazy"` and `decoding="async"`.

**SEO-037 [LOW] The hero-bg.webp is preloaded in index.html (line 58) but the React component also renders it as an img with fetchPriority="high". This double-signal is correct and intentional — no change needed.**

---

## SECTION 13 — INTERNAL LINK AUDIT

**Score: 6 / 10**

The navigation and footer provide good coverage. However, the main page body content has several missing link opportunities.

### Issues

**SEO-038 [HIGH] Home page body has zero links to `/about`, `/blog`, `/pricing`, or `/contact`.**  
`client/src/pages/Home.tsx` internal links in body: only `/waitlist` (CTA) and `/for-dentists` (ghost button) and `/features` (link). The About/Team section, FAQ section, and EFP Award section are prime opportunities for internal links to deeper pages.

**SEO-039 [HIGH] Blog page has no internal link to `/features` or `/for-dentists`.**  
`client/src/pages/Blog.tsx` — the CTA section links only to `/waitlist`. The newsletter section should include a link to the features or for-dentists page.

**SEO-040 [MEDIUM] Individual blog post pages link to `/blog` and `/waitlist` but not to topically relevant content pages.**  
`client/src/pages/BlogPost.tsx` — blog posts on periodontal disease don't link to `/features` (where habit tracking is described) or `/for-dentists`. The CTA section at the bottom of each post should include contextual internal links.

**SEO-041 [MEDIUM] Features.tsx has no link to `/about` or `/blog`.**  
After the feature grid, there is a CTA section linking only to `/waitlist`. Add "Read our clinical research" → `/blog` and "Meet the team" → `/about`.

**SEO-042 [LOW] About.tsx CTA links to `/waitlist` and `/contact` — no link to `/features` or `/for-dentists`.**  
The About page should cross-link to the product pages to help crawlers understand topic authority.

**SEO-043 [LOW] No page links to the RSS feed `/feed.xml` with visible anchor text.**  
The RSS feed exists in public and is declared in index.html, but no content links to it. Add a footer link: `<a href="/feed.xml">RSS Feed</a>`

---

## SECTION 14 — SPA RENDERING AND CRAWLABILITY

**Score: 5 / 10**

This is the most significant technical SEO risk on the site.

### Issues

**SEO-044 [CRITICAL] No prerendering — all per-page meta tags are client-side only.**  
The site is a pure client-side SPA. The static `index.html` contains homepage-level defaults, but per-page titles, descriptions, canonicals, and JSON-LD are injected by react-helmet-async after JavaScript execution.

Googlebot does execute JavaScript, but it does so in a two-wave process: the first crawl reads static HTML, and the second wave (which may be delayed by days to weeks) executes JS. This means:
- Social share previews (Twitter, WhatsApp, iMessage, Slack) will ALWAYS see only the index.html defaults because link-preview bots do NOT execute JS.
- First-wave Googlebot will index homepage meta for ALL pages.
- Blog post OG images will show the generic og-image.jpg with the homepage title in all social shares.

**Recommended fix: Add vite-plugin-prerender or implement Vercel's Edge Middleware for meta tag injection.**

Option A — vite-plugin-prerender (build-time static HTML per route):
```js
// vite.config.ts
import prerenderPlugin from 'vite-plugin-prerender'

plugins: [
  react(),
  tailwindcss(),
  prerenderPlugin({
    routes: ['/', '/features', '/for-dentists', '/about', '/pricing', '/blog', '/contact',
      '/blog/what-is-periodontal-disease',
      '/blog/efp-digital-innovation-award-2025',
      '/blog/how-ai-is-changing-dental-monitoring',
      '/blog/3-minute-routine-save-teeth',
      '/blog/why-patients-forget-instructions',
      '/blog/building-the-bridge-perioskoup-story',
    ]
  })
]
```

Option B — Vercel Edge Middleware (recommended for Vercel deployment): Create `middleware.ts` at project root that rewrites response headers and injects static meta for known routes before serving index.html. This adds 0ms to client load time and is invisible to users.

**SEO-045 [HIGH] The static noscript fallback in index.html (lines 210-302) contains homepage content only — all inner pages have no noscript content.**  
Bots that do not execute JS (including some AI crawlers) will see the homepage noscript content regardless of which URL they request. The robots.txt correctly points to `llms-full.txt` for non-JS AI crawlers, which is a good mitigation.

---

## SECTION 15 — CORE WEB VITALS AND PERFORMANCE

**Score: 8 / 10**

The build configuration is solid: code splitting via `manualChunks`, route-level lazy loading for all non-Home pages, immutable cache headers for assets and images, font preloads, and LCP image preload. Self-hosted fonts avoid Google Fonts latency.

### Issues

**SEO-046 [HIGH] Manifest.json is missing PNG icon entries for icon-192.png and icon-512.png.**  
`client/public/manifest.json` lists only one icon: the SVG favicon. The files `icon-192.png` and `icon-512.png` exist in `/public/` but are not referenced in the manifest. Chrome and Android use these PNG icons for PWA install prompts.  
Fix:
```json
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
    "purpose": "maskable"
  }
]
```

**SEO-047 [MEDIUM] The ticker/marquee strip (Home.tsx line 147-159) is `aria-hidden="true"` — correct for accessibility — but it uses CSS animation which keeps the browser painting continuously even when not visible.**  
Consider using `animation-play-state: paused` when the element is out of viewport via IntersectionObserver to reduce paint cost.

**SEO-048 [MEDIUM] Multiple Radix UI primitives are imported but may not all be used.**  
The dependency tree includes 20+ Radix UI components (accordion, alert-dialog, aspect-ratio, avatar, checkbox, etc.). Any unused imports inflate the initial vendor chunk. Run `pnpm build` and check the chunk report. Consider moving unused Radix components to devDependencies or removing them.

**SEO-049 [LOW] `modulePreload: { polyfill: false }` in vite.config.ts is correct for modern browsers but will prevent module preload on older browsers. Since the target audience is dental professionals (likely on modern devices), this is acceptable.**

---

## SECTION 16 — MOBILE-FIRST INDEXING

**Score: 9 / 10**

The site uses `min-height: 100svh` (small viewport height) throughout, which correctly handles mobile browser chrome. The viewport meta tag is correctly set. `clamp()` sizing is used for all typographic elements. The mobile drawer navigation has proper focus trap and aria labels.

### Issues

**SEO-050 [LOW] Manifest `orientation: "portrait-primary"` locks the PWA to portrait on mobile devices. On tablets, landscape may be preferred. Consider using `"orientation": "natural"` or removing the constraint.**

---

## SECTION 17 — DUPLICATE AND THIN CONTENT

**Score: 8 / 10**

Blog posts have substantial unique content. Page content is differentiated. 

### Issues

**SEO-051 [MEDIUM] The Dr. Anca quote `"Perioskoup was born out of two big challenges..."` appears verbatim on three separate pages: Home.tsx (line 108), ForDentists.tsx (line 161), and About.tsx (line 220).**  
Duplicate block quote across pages is a thin/duplicate content signal. Either remove from two pages or vary the quote per page context.

**SEO-052 [MEDIUM] The EFP award quote `"Perioskoup is an innovative digital tool..."` appears on both Home.tsx (line 176) and About.tsx (line 152).**  
Same issue — near-identical content blocks across pages. Remove from Home or differentiate the surrounding context substantially.

**SEO-053 [LOW] Three stat blocks (80% forgotten in 48h, 87% mHealth studies, 62% periodontitis) appear on both About.tsx and ForDentists.tsx with identical values, labels, and source citations.**  
Acceptable for trust signals, but the surrounding paragraph context should be more differentiated between the pages.

---

## COMPLETE ISSUE LIST SUMMARY

| # | Severity | Category | File | Description |
|---|----------|----------|------|-------------|
| SEO-001 | HIGH | Titles | Features.tsx:47 | Title 77 chars — truncates in SERPs |
| SEO-002 | MEDIUM | Titles | index.html:8 vs Home.tsx:51 | Static vs Helmet title mismatch (em-dash vs pipe) |
| SEO-003 | LOW | Titles | BlogPost.tsx:574 | Story post title missing keyword |
| SEO-004 | LOW | Titles | Contact.tsx:81 | Contact title has no target keyword |
| SEO-005 | LOW | Meta Desc | BlogPost.tsx:575 | Story post description 158 chars (3 over) |
| SEO-006 | MEDIUM | Canonical | BlogPost.tsx:755 | 404-fallback branch missing Helmet/noindex |
| SEO-007 | LOW | Canonical | vercel.json | Trailing slash inconsistency (low risk) |
| SEO-008 | CRITICAL | OG | All pages except BlogPost | og:image:width/height missing |
| SEO-009 | CRITICAL | OG | All pages | og:image:alt and twitter:image:alt missing |
| SEO-010 | HIGH | OG | All pages | og:locale missing from all page Helmets |
| SEO-011 | HIGH | Twitter | All pages | twitter:site missing from all page Helmets |
| SEO-012 | MEDIUM | OG | All pages | All pages share one generic OG image |
| SEO-013 | LOW | OG | BlogPost.tsx | Missing article:section and article:tag |
| SEO-014 | MEDIUM | Twitter | BlogPost.tsx | twitter:creator missing |
| SEO-015 | HIGH | Schema | BlogPost.tsx:790 | datePublished not full ISO 8601 datetime |
| SEO-016 | HIGH | Schema | BlogPost.tsx:793 | BlogPosting image should be ImageObject not bare URL |
| SEO-018 | MEDIUM | Schema | index.html | SoftwareApplication missing aggregateRating |
| SEO-019 | MEDIUM | Schema | index.html | WebSite missing SearchAction potentialAction |
| SEO-020 | MEDIUM | Schema | index.html:99-100 | Eduard/Petrica Person nodes missing @id |
| SEO-021 | MEDIUM | Schema | Breadcrumb.tsx:28 | BreadcrumbList last item uses window.location fragile fallback |
| SEO-022 | LOW | Schema | Multiple pages | FAQ "Is Perioskoup a medical device" duplicated across pages |
| SEO-023 | LOW | Schema | Contact.tsx:53-76 | Redundant Organization schema (duplicates global @graph) |
| SEO-024 | INFO | Sitemap | sitemap.xml | waitlist/privacy/terms excluded — CORRECT (noindex) |
| SEO-026 | MEDIUM | Sitemap | sitemap.xml | Blog posts lack priority differentiation |
| SEO-028 | LOW | llms.txt | llms.txt:39 | Duplicate "GDPR-compliant data storage" line |
| SEO-029 | HIGH | Hreflang | All pages | hreflang x-default missing from all page Helmets |
| SEO-030 | MEDIUM | Hreflang | BlogPost.tsx | No hreflang at all on blog post pages |
| SEO-031 | HIGH | Headings | BlogPost.tsx:755 | 404-fallback H1 page with no Helmet (crawlable thin content) |
| SEO-034 | LOW | Headings | Footer.tsx:84 | Footer nav labels use H3 (semantic mismatch) |
| SEO-035 | HIGH | Images | Home.tsx:72 | LCP hero img missing decoding="sync" |
| SEO-036 | MEDIUM | Images | Blog.tsx:227 | Author thumbs in featured cards missing loading="lazy" |
| SEO-038 | HIGH | Links | Home.tsx | Home body has no links to /about, /blog, /pricing, /contact |
| SEO-039 | HIGH | Links | Blog.tsx | Blog page missing links to /features, /for-dentists |
| SEO-040 | MEDIUM | Links | BlogPost.tsx | Blog posts missing contextual links to product pages |
| SEO-041 | MEDIUM | Links | Features.tsx | Features page missing links to /about, /blog |
| SEO-042 | LOW | Links | About.tsx | About page missing links to /features, /for-dentists |
| SEO-043 | LOW | Links | Footer.tsx | No visible link to RSS feed |
| SEO-044 | CRITICAL | Rendering | vercel.json/vite.config.ts | No prerendering — all per-page meta client-side only |
| SEO-045 | HIGH | Rendering | index.html | noscript fallback only covers homepage, not inner pages |
| SEO-046 | HIGH | CWV | manifest.json | PNG icons (192, 512) not referenced in manifest |
| SEO-047 | MEDIUM | CWV | Home.tsx:147 | Ticker animation paints continuously |
| SEO-048 | MEDIUM | CWV | package.json | Unused Radix UI components inflating vendor chunk |
| SEO-051 | MEDIUM | Content | Home/ForDentists/About | Dr. Anca quote duplicated on 3 pages |
| SEO-052 | MEDIUM | Content | Home/About | EFP award quote duplicated on 2 pages |
| SEO-053 | LOW | Content | About/ForDentists | Stat blocks duplicated verbatim |

---

## PRIORITY FIX ORDER

### Immediate (Before Any Marketing Push)

1. **SEO-044** — Add prerendering (vite-plugin-prerender) or Vercel Edge Middleware. All social shares currently use homepage meta for every URL.
2. **SEO-008** — Add `og:image:width`, `og:image:height` to every page Helmet.
3. **SEO-009** — Add `og:image:alt` and `twitter:image:alt` to every page Helmet.
4. **SEO-011** — Add `twitter:site="@perioskoup"` to every page Helmet.
5. **SEO-010** — Add `og:locale="en_GB"` to every page Helmet.
6. **SEO-029** — Add `hreflang="x-default"` to every page Helmet.

### High Priority (This Sprint)

7. **SEO-015** — Fix datePublished to full ISO 8601 in BlogPosting schema.
8. **SEO-016** — Wrap BlogPosting image in ImageObject schema.
9. **SEO-031 + SEO-006** — Add Helmet with noindex to BlogPost 404-fallback branch.
10. **SEO-001** — Shorten Features page title to under 70 chars.
11. **SEO-035** — Add `decoding="sync"` to LCP hero img in Home.tsx.
12. **SEO-038** — Add internal links from Home page body to /about, /blog, /pricing.
13. **SEO-046** — Add PNG icon entries to manifest.json.

### Medium Priority (Next Sprint)

14. **SEO-020** — Add @id to Eduard and Petrica Person nodes.
15. **SEO-030** — Add hreflang to BlogPost pages.
16. **SEO-002** — Align index.html static title to match Home.tsx Helmet.
17. **SEO-028** — Remove duplicate GDPR line from llms.txt.
18. **SEO-039 + SEO-040 + SEO-041** — Internal linking audit across Blog, BlogPost, Features.
19. **SEO-051 + SEO-052** — Deduplicate Dr. Anca quote and EFP quote across pages.

### Low Priority (Post-Launch)

20. **SEO-019** — Add SearchAction potentialAction if blog search is implemented.
21. **SEO-027** — Add image:image extensions to sitemap.
22. **SEO-013** — Add article:section and article:tag to BlogPost pages.
23. **SEO-034** — Fix Footer H3 semantic mismatch.
24. **SEO-043** — Add visible RSS feed link.

---

## WHAT IS ALREADY EXCELLENT (DO NOT BREAK)

- robots.txt AI crawler allowlist — best-in-class, covers all 14 major AI crawlers
- Per-page canonical URLs — correct, unique, no homepage fallbacks
- JSON-LD @graph structure — Organization, Person, WebSite, SoftwareApplication all correctly node-linked via @id
- LCP image preload in index.html + fetchPriority="high" on the React img
- Route-level code splitting via React.lazy
- BreadcrumbList via Breadcrumb component on all inner pages
- BlogPosting schema on blog post pages with correct og:type="article"
- FAQPage schema on 8 pages with unique questions
- WCAG-aware SPA: skip-link, RouteAnnouncer, focus trap on mobile nav, aria-live regions
- Self-hosted fonts with preload (no FOUT, no Google Fonts latency)
- llms.txt and llms-full.txt — strong AI discoverability infrastructure
- noscript fallback in index.html with full homepage content
- vercel.json X-Llms-Txt HTTP header on all responses
