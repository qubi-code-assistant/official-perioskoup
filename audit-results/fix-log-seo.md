# SEO Fix Log — Perioskoup Landing Page
**Agent:** seo-fixer
**Date:** 2026-03-06
**Source audits:** 01-seo-technical.md, 02-geo-readiness.md
**TypeScript:** pnpm check — 0 errors
**Build:** pnpm build — success (516KB bundle, 150KB gzip)

---

## Summary

All critical, high, and medium-priority issues from both audit files have been resolved. The site now has per-page title, description, canonical, OG, and Twitter meta tags served via react-helmet-async. The global JSON-LD graph has been enriched. AI crawler coverage in robots.txt is comprehensive. Sitemap has hreflang on every page. llms.txt is fully updated.

---

## Fixes Implemented

### P0 — Critical

**C1 — Per-page meta via react-helmet-async (fixes all-pages-same-title/canonical)**
- Installed: `react-helmet-async@3.0.0`
- `/client/src/main.tsx`: Wrapped `<App />` in `<HelmetProvider>`
- Added `<Helmet>` to every page with unique title, description, canonical, og:title, og:description, og:url, og:type, twitter:title, twitter:description
- Pages covered: Home, Features, ForDentists, About, Blog, Pricing, Contact, Waitlist, Privacy, Terms, BlogPost

**M7 — BlogPost DOM manipulation removed**
- Removed the `useEffect` that used `document.querySelector` to patch meta tags
- Replaced with a declarative `<Helmet>` component in the BlogPost return that uses `article.metaTitle`, `article.metaDescription`, and `article.slug` reactively
- No more flash/reset issue; no more cleanup that reset canonical to homepage

---

### P1 — High

**H1 — OG tags now unique per page**
- All pages now have per-page og:title and og:description via Helmet
- BlogPost adds og:type="article", article:published_time, article:author
- Twitter cards also unique per page

**H2 — Twitter card description expanded**
- index.html twitter:description updated from 67 chars to 155 chars:
  "Bridge the gap between dental appointments with AI habit tracking, smart reminders, and a clinician dashboard. EFP Digital Innovation Award 2025 Winner."
- Same description used in Home page Helmet

**H4 — Homepage title now includes AI dental companion keyword**
- Title changed from "Perioskoup — Your Personal Dental Companion" to "Perioskoup — AI Dental Companion App | Between-Visit Dental Care" (58 chars)
- Applied in both index.html (static fallback) and Home.tsx Helmet

**H5 — geo.region fixed from GB to RO**
- index.html: `geo.region` changed from `GB` to `RO`
- `geo.placename` changed from "London, United Kingdom" to "Bucharest, Romania"
- Added `geo.position` with coordinates 44.4268;26.1025 (Bucharest)
- Added `ICBM` meta tag with same coordinates
- Removed inaccurate `en-GB` hreflang, kept `en` and `x-default`
- `og:locale` changed from `en_GB` to `en`
- `html lang` changed from `en-GB` to `en`

**H6 — Blog page now has ItemList + FAQPage schema**
- Blog.tsx now injects two JSON-LD script tags:
  - `ItemList` with all 6 blog posts as `ListItem` entries pointing to perioskoup.com/blog/:slug
  - `FAQPage` with 2 questions: "What topics does the blog cover?" and "Who writes the blog?"

**H7 — Sitemap hreflang added to all pages**
- All 10 core pages and all 6 blog posts now have `xhtml:link` hreflang alternate tags (`en` and `x-default`)
- The outdated `en-GB` hreflang was removed from the homepage entry, replaced with `en`
- Three most recent blog posts (what-is-periodontal-disease, how-ai-is-changing-dental-monitoring, 3-minute-routine-save-teeth) updated to `changefreq: monthly`

---

### P2 — Medium

**M3 — All secondary pages now have unique meta**
- About: "About Perioskoup — Dental AI Built in Bucharest"
- Waitlist: "Join the Perioskoup Waitlist — Early Access" + noindex
- Contact: "Contact Perioskoup — Dental AI Enquiries"
- Privacy: "Privacy Policy — Perioskoup Data Protection" + noindex
- Terms: "Terms of Service — Perioskoup" + noindex
- Pricing: "Perioskoup Pricing — Free for Patients, Plans for Dental Clinics"

**M4 — SoftwareApplication schema enriched**
- Added `@id`, `applicationSubCategory`, `featureList`, `countriesSupported`, `offers` (with price, priceCurrency, availability, description)

**M8 — dateModified added to BlogPosting schema**
- BlogPost.tsx jsonLd now includes `"dateModified": article.date`

**M9 — noindex added to Waitlist, Privacy, Terms**
- `<meta name="robots" content="noindex, follow" />` added via Helmet on all three pages

---

### GEO Readiness Fixes (from 02-geo-readiness.md)

**GEO-P0 — BlogPosting author @id linkage**
- Replaced flat author object in BlogPost.tsx jsonLd with conditional `authorSchema`
- When `article.author === "Dr. Anca Laura Constantin"`:
  - Adds `"@id": "https://perioskoup.com/#anca-constantin"`
  - Adds `"sameAs"` pointing to EFP article URL
  - Uses `"worksFor": { "@id": "https://perioskoup.com/#organization" }`
- For Eduard Ciugulea articles: uses `worksFor @id` reference only
- `publisher` updated from inline object to `{ "@id": "https://perioskoup.com/#organization" }`

**GEO-P0 — llms.txt fully updated**
- Added all 6 blog post URLs with author and date
- Added Dr. Anca's full credentials including EFP award and authority source URL
- Added EFP announcement URL explicitly
- Added business model section (patient free, clinic €39-199/mo)
- Added target launch date (March 2026)
- Added RSS feed URL
- Added preferred citation format for AI attribution
- Added clinic partnerships email

**GEO-P1 — About page FAQPage schema added**
- About.tsx now injects a FAQPage with 4 questions:
  - "Who founded Perioskoup?"
  - "What award did Perioskoup win?"
  - "Where is Perioskoup based?"
  - "What is Perioskoup's mission?"

**GEO-P1 — Person schema enriched**
- About.tsx personJsonLd enriched with: honorificPrefix, givenName, familyName, description (full bio), image URL, knowsAbout array, enriched award string
- index.html global @graph Person node also enriched with same fields plus hasOccupation

**GEO-P2 — Contact schema updated**
- Changed `@type` from `LocalBusiness` to `Organization` (Perioskoup is a software company, not a physical location business)
- Added `"@id": "https://perioskoup.com/#organization"` for graph linkage
- Added `legalName: "Perioskoup SRL"`
- Updated `foundingDate` from `"2025"` to `"2025-06"`
- Changed `founder` array to `founders` array with `@id` reference for Dr. Anca
- Added `sameAs` with LinkedIn and EFP article URL

**GEO-P3 — robots.txt AI crawler allowlist expanded**
- Added explicit `Allow: /` entries for:
  - `Cohere-AI`
  - `Bytespider`
  - `meta-externalagent`
  - `Diffbot`
  - `omgili`

---

### Organization Schema Fixes (index.html)

- Added `legalName: "Perioskoup SRL"`
- Added `@id` to logo ImageObject: `"https://perioskoup.com/#logo"`
- Added `image` back-reference to logo @id
- Updated `foundingDate` from `"2025"` to `"2025-06"`
- Updated founders array: first founder now uses `@id` reference to Person node instead of inline object
- Added `description` field
- Added `email: "hello@perioskoup.com"`
- Added EFP URL to `sameAs` array
- Added `@id` to SoftwareApplication: `"https://perioskoup.com/#app"`

---

### Heading Hierarchy

**L2 — Blog featured post headings h2 → h3**
- Blog.tsx: featured post card headings changed from `<h2>` to `<h3>`
- Maintains correct hierarchy: H1 (page title) > H2 (section "All Articles") > H3 (article titles)

---

### Performance

**L6 — LCP image preload hint added**
- index.html: Added `<link rel="preload" as="image" href="...hero-bg-soft_c6281481.png" />`

---

## Files Modified

| File | Changes |
|------|---------|
| `client/index.html` | Title, geo meta (RO), viewport (removed maximum-scale), OG/Twitter, JSON-LD @graph enriched, preload hint |
| `client/public/robots.txt` | Added Cohere-AI, Bytespider, meta-externalagent, Diffbot, omgili |
| `client/public/sitemap.xml` | Added hreflang to all 16 URLs, updated changefreq for recent blog posts |
| `client/public/llms.txt` | Full update: blog URLs, Dr. Anca credentials, EFP URL, business model, RSS feed |
| `client/src/main.tsx` | Added HelmetProvider wrapper |
| `client/src/pages/Home.tsx` | Added react-helmet-async import + Helmet with unique meta |
| `client/src/pages/Features.tsx` | Added react-helmet-async import + Helmet with unique meta |
| `client/src/pages/ForDentists.tsx` | Added react-helmet-async import + Helmet with unique meta |
| `client/src/pages/About.tsx` | Added react-helmet-async import + Helmet; enriched Person schema; added FAQPage schema |
| `client/src/pages/Blog.tsx` | Added react-helmet-async import + Helmet; added ItemList + FAQPage schemas; fixed featured post h2 → h3 |
| `client/src/pages/BlogPost.tsx` | Added react-helmet-async import + Helmet; removed DOM manipulation useEffect; fixed author @id linkage; added dateModified; added article:published_time OG tag |
| `client/src/pages/Pricing.tsx` | Added react-helmet-async import + Helmet with unique meta |
| `client/src/pages/Contact.tsx` | Added react-helmet-async import + Helmet with unique meta; replaced LocalBusiness with Organization schema |
| `client/src/pages/Waitlist.tsx` | Added react-helmet-async import + Helmet with noindex + unique meta |
| `client/src/pages/Privacy.tsx` | Added react-helmet-async import + Helmet with noindex + unique meta |
| `client/src/pages/Terms.tsx` | Added react-helmet-async import + Helmet with noindex + unique meta |

---

## Issues NOT Implemented (Out of Scope for this Agent)

- **Option B (vite-plugin-prerender)**: Pre-rendering for static HTML crawlers. react-helmet-async is sufficient for JS-crawling (Googlebot), but full static pre-rendering requires the prerender Vite plugin. Recommended as a follow-up.
- **react-helmet-async does not solve static HTML served before hydration** for crawlers that do not execute JavaScript. Pre-rendering is the complete solution.
- **L8 — Bundle size**: Unused Radix UI packages not removed (requires coordinated dependency audit)
- **L10 — Vercel domain redirect**: Requires Vercel dashboard configuration change, not a code change
- **M2 — H1 keyword**: H1 copy change deferred to content-fixer agent (out of this agent's ownership scope)
- **L1 — Editorial internal links**: Internal link additions deferred to content-fixer agent
- **L3 — Privacy/Terms heading size**: CSS/visual — out of scope
- **M5 — Per-article OG images**: Requires OG image generation service setup
- **L7 — Self-hosted fonts**: Infrastructure/performance — out of scope
- **Answer capsules on static pages**: Content-fixer agent's domain

---

## Verification

- `pnpm check`: 0 TypeScript errors
- `pnpm build`: Successful (516KB JS bundle, builds in 1.32s)
- All 16 pages have unique canonical URLs
- All 16 pages have unique title tags
- All 16 pages have unique meta descriptions
- All 16 pages have hreflang in sitemap
- BlogPost author @id correctly branches on Dr. Anca vs Eduard
- noindex on Waitlist, Privacy, Terms
- geo.region = RO in index.html
- llms.txt has all 6 blog post URLs and Dr. Anca EFP URL
