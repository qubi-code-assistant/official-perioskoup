# Perioskoup SEO Technical Re-Audit
**Auditor:** SEO Technical Auditor Agent (Re-Audit Pass)
**Date:** 2026-03-06
**Original audit score:** 6.5 / 10
**Post-fix score:** 8.2 / 10
**Source audited:** Current source code on branch `fix/final-launch-audit`

---

## Before / After Score Summary

| Category | Before | After | Delta |
|----------|--------|-------|-------|
| Title Tags | 7/10 | 8/10 | +1 |
| Meta Descriptions | 5/10 | 9/10 | +4 |
| Canonical URLs | 10/10 | 10/10 | = |
| OG Tags | 5/10 | 7/10 | +2 |
| Twitter Cards | 7/10 | 8/10 | +1 |
| JSON-LD Schemas | 7/10 | 8/10 | +1 |
| robots.txt | 9/10 | 9/10 | = |
| sitemap.xml | 7/10 | 9/10 | +2 |
| llms.txt / llms-full.txt | 6/10 | 10/10 | +4 |
| hreflang | 6/10 | 7/10 | +1 |
| Heading Hierarchy | 8/10 | 8/10 | = |
| Internal Links | 6/10 | 6/10 | = |
| Bundle Size / CWV | 6/10 | 7/10 | +1 |
| Duplicate Content | 7/10 | 8/10 | +1 |
| Blog OG Images | 2/10 | 7/10 | +5 |
| RSS Feed | 4/10 | 8/10 | +4 |
| PWA Manifest | 5/10 | 5/10 | = |
| **OVERALL** | **6.5/10** | **8.2/10** | **+1.7** |

---

## Issue-by-Issue Verification

### P0 Issues (Critical)

**P0-A: BlogPost og:image relative URL**
Status: FIXED
`const OG_IMAGE = "https://perioskoup.com/images/og-image.jpg"` is confirmed at line 17 of BlogPost.tsx. Both `og:image` (line 830) and `twitter:image` (line 837) now use the absolute URL constant. BlogPosting JSON-LD `image` field also uses this constant (line 793). Social scrapers will now resolve the image correctly on all 6 blog post URLs.

**P0-B: BlogPost JSON-LD image field relative URL**
Status: FIXED
The `OG_IMAGE` constant feeds directly into `"image": OG_IMAGE` in the BlogPosting schema. Confirmed absolute.

**P0-C: llms-full.txt stale How It Works content**
Status: FIXED
File confirmed to contain "Visit Your Dentist", "Get Your Plan", "Build Daily Habits". The old "Scan / Analyze / Engage" language is absent. Verified with grep.

**P0-D: index.html noscript stale workflow**
Status: FIXED (from Round 2 fix log)
The noscript `<ol>` at lines 252-254 of index.html now lists the correct three steps. Confirmed by reading the current index.html.

---

### P1 Issues (High)

**P1-A: Features meta description at 186 chars**
Status: FIXED
Current: "Explore Perioskoup's AI dental companion features: habit tracking, smart reminders, clinician dashboards, and GDPR-compliant data protection." — 141 characters. Well within limit.

**P1-B: Home meta description at 162 chars**
Status: FIXED
Current: "Perioskoup bridges the gap between dental visits with AI-powered guidance, habit tracking, and real-time support. EFP Digital Innovation Award Winner 2025." — 155 characters. Within limit.

**P1-C: ForDentists meta description at 165 chars**
Status: FIXED
Current: "Perioskoup gives dental practices a clinician dashboard, personalised care plans, and engagement analytics to extend care and reduce no-shows." — 142 characters. Within limit.

**P1-D: Features title at 75 chars**
Status: STILL OPEN
The Features page title remains "AI Dental Companion App Features | Habit Tracking & Care Plans | Perioskoup" at 75 characters. The original audit flagged this; the fix log did not address the title (only the description). Google will truncate after approximately 60 characters, cutting "| Perioskoup" from the SERP display.

**P1-E: Waitlist noindex vs sitemap conflict**
Status: FIXED
Sitemap confirmed to have 13 URLs with /waitlist, /privacy, and /terms removed. Waitlist.tsx still carries `noindex, follow` — the sitemap is now consistent with that. The original recommendation to remove noindex from /waitlist was not implemented (the page remains noindex), but the conflicting sitemap entry is gone, which resolves the conflicting-signals problem.

**P1-F: Privacy and Terms noindex vs sitemap conflict**
Status: FIXED
Both pages absent from sitemap. Confirmed.

**P1-G: RSS feed image relative URL**
Status: FIXED
feed.xml line 13 confirmed: `<url>https://perioskoup.com/images/logomark-dark.png</url>`. Absolute URL.

**P1-H: About CEO -> CDO in FAQ schema**
Status: FIXED
About.tsx FAQ "Who founded Perioskoup?" answer uses "CDO" for Dr. Anca. Confirmed.

**P1-I: Contact addressCountry "EU" -> "RO"**
Status: FIXED
Contact.tsx line 64: `"addressCountry": "RO"`. Confirmed.

---

### P2 Issues (Medium)

**P2-A: All pages share single OG image**
Status: PARTIALLY FIXED
The critical bug (relative URL preventing any image from rendering) is fixed. All pages now have an absolute OG image URL. However, all 10 pages and all 6 blog posts still share the same `og-image.jpg`. No per-page distinct images were created. Social share differentiation remains zero. This is a real missed opportunity for CTR but not a technical error.

**P2-B: Privacy and Terms missing og:image and twitter:card**
Status: STILL OPEN
Privacy.tsx has `og:title`, `og:description`, `og:url`, and `og:type` — but NO `og:image` and NO `twitter:card`. Terms.tsx is the same. Both are noindex pages, so social sharing is unlikely, but the absence creates an incomplete OG object which some validators flag as an error.

**P2-C: BlogPost pages missing hreflang**
Status: STILL OPEN
BlogPost.tsx has zero `hrefLang` attributes in its Helmet block. All 6 blog post URLs have hreflang in the sitemap (which partially mitigates this for Google's sitemap parser), but the in-page `<link rel="alternate">` signal is absent for blog posts. This was in the original audit's P2 list and was not fixed.

**P2-D: Pages missing x-default hreflang**
Status: STILL OPEN
Every page (Home, Features, ForDentists, About, Blog, Pricing, Contact, Waitlist) has `<link rel="alternate" hrefLang="en">` but none have `<link rel="alternate" hrefLang="x-default">` in their Helmet. The index.html static fallback has both, and the sitemap has both — but the per-page in-HTML signal is incomplete. For a single-language site this is low risk but technically incorrect.

**P2-E: Blog page H1 to H3 skip (no H2 above featured posts)**
Status: STILL OPEN
Blog.tsx confirmed: H1 at line 183, then the featured posts section goes directly to H3 (line 220 in the featured card titles) with no intervening H2. The "All Articles" H2 appears later at line 259. The hierarchy is: H1 -> [no H2] -> H3 (featured post titles) -> H2 (All Articles) -> H3 (article list). This is still a heading skip violation.

**P2-F: Home page has no link to Blog**
Status: STILL OPEN
Confirmed: Home.tsx contains no `href` pointing to `/blog`. Navbar links do include Blog (via shared Navbar component), so there IS a path to Blog from Home, but no contextual body link or "latest articles" section. This was listed in the original audit as a missed internal linking opportunity and has not been addressed.

**P2-G: Blog posts no contextual internal links to product pages**
Status: NOT VERIFIED IN RE-AUDIT SCOPE
The fix log does not mention addressing this. Given the blog post bodies are static strings in BlogPost.tsx, adding internal links would require editing those strings manually. Likely still open.

**P2-H: Duplicate Dr. Anca quote on 3 pages**
Status: STILL OPEN
The quote "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes." appears verbatim on Home.tsx, ForDentists.tsx, and About.tsx. Three pages with identical blockquote content.

**P2-I: Organization JSON-LD duplicate (Contact.tsx and index.html)**
Status: NOT FIXED AS RECOMMENDED
Contact.tsx still contains its own `organizationJsonLd` object (confirmed at line 53-76) with `@id: "https://perioskoup.com/#organization"`. The global @graph in index.html also defines this entity. Because both use the same `@id`, Google merges them — no factual conflict. The Contact.tsx version is now enriched with `legalName`, `RO` country, and correct `foundingDate`, so the duplication is less harmful than before. However it remains an unnecessary redundancy.

**P2-J: Person JSON-LD duplicate (About.tsx and index.html)**
Status: CONSISTENT BUT STILL DUPLICATE
Both About.tsx and index.html define `@id: "https://perioskoup.com/#anca-constantin"`. They share the same @id so Google merges them. The About.tsx version adds `memberOf` which the global @graph does not have. Both are consistent in content now. Low risk but still redundant.

---

### P3 Issues (Low)

**P3-A: manifest.json missing PNG icon sizes**
Status: STILL OPEN
manifest.json is unchanged. Still only one icon entry (SVG, "any maskable"). The `icon-192.png` and `icon-512.png` files exist in /public/ but are not referenced. Also: `"lang": "en-GB"` in manifest.json is inconsistent with the `lang="en"` in index.html (which was correctly changed from `en-GB` to `en` per fix H5).

**P3-B: WebSite schema missing SearchAction**
Status: STILL OPEN
`SearchAction` / `potentialAction` not present in the global @graph WebSite node.

**P3-C: Terms title too short (29 chars)**
Status: PARTIALLY FIXED
Terms title is "Terms of Service | Perioskoup" — 29 characters. The fix log does not mention addressing this. It remains short but the page is noindex, so SERP appearance is moot.

**P3-D: Gemini-AI not in robots.txt**
Status: STILL OPEN
robots.txt confirmed: no Gemini-AI entry.

**P3-E: useReveal hook extracted to shared file**
Status: FIXED
`client/src/hooks/useReveal.ts` confirmed to exist and be a proper shared hook. All pages import from `@/hooks/useReveal`. Code duplication resolved.

**P3-F: Main JS bundle size**
Status: MARGINALLY IMPROVED
Build output: index.js is 347.63 KB raw (108 KB gzip). Previously 347 KB. Essentially unchanged. No code-splitting or tree-shaking improvements were made to the main bundle. BlogPost chunk is 66 KB (21 KB gzip). CSS is 105 KB (18.5 KB gzip). With Brotli on Vercel the transfer should be lower (~85-90 KB for main JS). Not a regression, not an improvement.

---

## New Issues Introduced by Fixes

**NEW-1: manifest.json lang mismatch**
Severity: LOW
The fix log correctly changed `index.html lang` from `en-GB` to `en` and `og:locale` from `en_GB` to `en`. However `manifest.json` still has `"lang": "en-GB"`. This creates an inconsistency in browser PWA handling. While low-impact, it should match the HTML `lang="en"`.

Fix:
```json
// manifest.json line 19
"lang": "en"
```

**NEW-2: feed.xml language tag still en-GB**
Severity: LOW
The RSS feed's `<language>` tag is `en-GB`. The site was updated to `en` everywhere else. This is a minor inconsistency. RSS `<language>` uses IETF BCP 47 so `en-GB` is valid (it is more specific than `en`), but it is misaligned with the stated geo target (Romania, not UK). If the target market is Romania/EU broadly, `en` is more appropriate.

**NEW-3: og:image:width/height missing from primary pages**
Severity: LOW
BlogPost.tsx correctly adds `og:image:width` (1200) and `og:image:height` (630) meta tags — this was in the original fix for BlogPost. However, none of the other 8 pages (Home, Features, ForDentists, About, Blog, Pricing, Contact, Waitlist) have these dimension tags. The original audit recommended adding them universally. Only BlogPost received them. Scrapers on other page shares will not know the image dimensions.

**NEW-4: Waitlist page remains noindex — strategic concern**
Severity: MEDIUM (strategic, not technical)
The fix log correctly removed /waitlist from the sitemap, which was the right call given the page carries noindex. However the original audit noted this was a strategically questionable choice: the /waitlist page has structured FAQPage data, conversion intent, and branded search value ("perioskoup waitlist"). Keeping it noindex means Google cannot surface it for branded queries. The fix resolved the conflict but maintained the underlying strategic decision. This is worth reconsidering before launch.

---

## Remaining Recommendations (Priority Order)

### Must Fix Before Launch

**R1: Features page title (75 chars -> under 60)**
File: `client/src/pages/Features.tsx` line 47
```tsx
// BEFORE (75 chars):
<title>AI Dental Companion App Features | Habit Tracking & Care Plans | Perioskoup</title>
// AFTER (60 chars):
<title>Perioskoup Features | AI Habit Tracking & Dental Care Plans</title>
```

**R2: Add og:image and twitter:card to Privacy and Terms**
Files: `client/src/pages/Privacy.tsx` and `client/src/pages/Terms.tsx`
```tsx
// Add inside Helmet on both pages:
<meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />
```

**R3: Add hreflang to BlogPost pages**
File: `client/src/pages/BlogPost.tsx` inside the Helmet block (after line 839)
```tsx
<link rel="alternate" hrefLang="en" href={`https://perioskoup.com/blog/${article.slug}`} />
<link rel="alternate" hrefLang="x-default" href={`https://perioskoup.com/blog/${article.slug}`} />
```

**R4: Add x-default hreflang to all primary pages**
Apply to: Home, Features, ForDentists, About, Blog, Pricing, Contact, Waitlist
```tsx
// Example for Home.tsx (line 63) — add after the existing hrefLang line:
<link rel="alternate" hrefLang="x-default" href="https://perioskoup.com/" />
// Repeat pattern for each page with its own canonical URL
```

**R5: Fix manifest.json lang and add PNG icons**
File: `client/public/manifest.json`
```json
{
  "lang": "en",
  "icons": [
    { "src": "/favicon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any" },
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png", "purpose": "any" }
  ]
}
```
Note: Separate "any" and "maskable" into distinct icon entries. Do not combine them in a single entry unless the icon is specifically designed with safe-zone padding for maskable display.

**R6: Fix Blog page heading hierarchy**
File: `client/src/pages/Blog.tsx`
Add an H2 before the featured posts grid (between line 191 and 193):
```tsx
// Between the hero section close and the featured posts section open:
<section style={{ paddingBottom: "80px" }}>
  <div className="container">
    <h2 className="display-sm reveal" style={{ marginBottom: "32px" }}>Featured Articles</h2>
    <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
```

**R7: Remove duplicate paragraph in Home How It Works**
File: `client/src/pages/Home.tsx` line 294-296
Delete the second paragraph that duplicates the concept already expressed on line 292:
```tsx
// DELETE these 3 lines (line 294-296):
<p className="body-lg" style={{ maxWidth: 540, margin: "0 auto" }}>
  The Perioskoup workflow connects clinical precision with patient daily life in three fluid steps.
</p>
```

### Should Fix Before Launch

**R8: Add og:image dimensions to primary pages**
Add to all 8 primary page Helmet blocks (after their `og:image` meta):
```tsx
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

**R9: Add Gemini-AI to robots.txt**
File: `client/public/robots.txt`
Add after the YouBot block:
```
User-agent: Gemini-AI
Allow: /
```

**R10: Add a Blog preview section to Home page**
File: `client/src/pages/Home.tsx`
Add a "From our knowledge hub" section with 2-3 latest article cards and a "View all articles" link to `/blog`. This addresses the internal linking gap identified in the original audit and improves topical authority signals for the blog content.

**R11: Fix feed.xml language to en (or keep en-GB consistently)**
File: `client/public/feed.xml` line 7
```xml
<language>en</language>
```

### Can Defer Post-Launch

**R12: Remove noindex from /waitlist (strategic decision)**
The waitlist page has FAQPage structured data, conversion value, and branded search potential. Removing `<meta name="robots" content="noindex, follow" />` from Waitlist.tsx and adding `/waitlist` back to the sitemap would allow Google to index this conversion page.

**R13: WebSite schema SearchAction**
Add to the WebSite node in `client/index.html`:
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

**R14: Per-article OG images**
Create 1200x630 JPGs for each of the 6 blog articles and add an `ogImage` field to the ARTICLES data in BlogPost.tsx. Eliminates identical social cards for all blog shares.

**R15: Differentiate Dr. Anca quote across pages**
Home, ForDentists, and About all use the identical blockquote verbatim. Each page should have a distinct quote to improve content uniqueness signals.

---

## Verified Fix Accuracy

The fix agent's claim of "0 TypeScript errors" and "pnpm build — success" is confirmed. Build ran successfully in this re-audit with 0 errors. Bundle sizes are consistent with the fix log's report.

The fix agent's claim that "all 16 pages have unique canonical URLs, title tags, and meta descriptions" is confirmed for canonical URLs. Title tags are unique across all pages. Meta descriptions are unique. However the claim that "All 16 pages have hreflang in sitemap" is correct for the sitemap, but incomplete as an in-HTML signal — per-page Helmet hreflang is still missing x-default on all pages and missing entirely on BlogPost pages.

---

## Score Breakdown (Post-Fix)

| Category | Score | Notes |
|----------|-------|-------|
| Title Tags | 8/10 | Features title still 75 chars; Terms title short (noindex) |
| Meta Descriptions | 9/10 | All within 160 chars; all unique; keyword-rich |
| Canonical URLs | 10/10 | All correct, unique, canonical domain |
| OG Tags | 7/10 | Absolute URLs fixed; still no per-page images; Privacy/Terms missing og:image |
| Twitter Cards | 8/10 | Privacy/Terms still missing twitter:card |
| JSON-LD Schemas | 8/10 | Comprehensive, linked @graph, minor duplicates remain |
| robots.txt | 9/10 | Excellent AI coverage; Gemini-AI still missing |
| sitemap.xml | 9/10 | Noindex pages removed; hreflang on all URLs |
| llms.txt / llms-full.txt | 10/10 | Fully accurate, well-structured, cited sources |
| hreflang | 7/10 | Sitemap complete; missing x-default in-page; BlogPost has no hreflang |
| Heading Hierarchy | 8/10 | Blog H1->H3 skip remains; all other pages pass |
| Internal Links | 6/10 | No Home->Blog link; no contextual blog->product links |
| Bundle Size / CWV | 7/10 | useReveal extracted; main bundle unchanged at ~108 KB gzip |
| Duplicate Content | 8/10 | Duplicate features subhead removed; Anca quote still on 3 pages; HoW dual-paragraph remains |
| Blog OG Images | 7/10 | Critical relative URL fixed; all 6 still share one image |
| RSS Feed | 8/10 | Image URL fixed; language tag inconsistency remains |
| PWA Manifest | 5/10 | PNG icons not added; lang still en-GB |

**OVERALL: 8.2 / 10**

---

## Summary of What Was Fixed vs What Remains

**Fixed (14 issues):**
- BlogPost og:image and twitter:image relative URL (P0)
- BlogPost JSON-LD image relative URL (P0)
- llms-full.txt stale How It Works workflow (P0)
- index.html noscript stale workflow (P0)
- All meta descriptions trimmed below 160 chars (P1: Home, Features, ForDentists)
- RSS feed image URL made absolute (P1)
- About FAQ CEO -> CDO correction (P1)
- Contact addressCountry EU -> RO (P1)
- Noindex pages removed from sitemap (P1)
- useReveal extracted to shared hook (P3)
- geo.region updated to RO (from Round 1)
- Comprehensive per-page Helmet blocks with unique meta (Round 1)
- llms.txt enriched with all blog posts, Dr. Anca credentials, cited stats (Round 2)
- Sitemap hreflang added to all 16 URLs (Round 1)

**Still Open (10 issues):**
- Features page title 75 chars (P1)
- BlogPost pages missing hreflang tags (P2)
- All pages missing x-default hreflang in Helmet (P2)
- Privacy and Terms missing og:image and twitter:card (P2)
- Blog page H1->H3 heading skip (no H2 before featured posts) (P2)
- Home page no link to Blog in page body (P2)
- Duplicate Dr. Anca quote on 3 pages (P2)
- Duplicate paragraph in Home How It Works section (P2)
- manifest.json missing PNG icon sizes and lang mismatch (P3)
- Gemini-AI not in robots.txt (P3)

**New issues introduced:**
- manifest.json `lang` still "en-GB" while index.html is "en"
- feed.xml `<language>` tag inconsistent with rest of site (en-GB vs en)
- og:image dimensions only on BlogPost — missing from all primary pages
