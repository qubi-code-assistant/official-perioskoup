# SEO Technical Audit — Perioskoup Landing Page
**Date:** 2026-03-06
**Auditor:** SEO Technical Agent
**Site:** https://official-perioskoup.vercel.app (canonical: perioskoup.com)
**Score: 4.5 / 10**

---

## Executive Summary

The site has a solid SEO foundation in the static HTML shell (index.html): well-formed Organization/WebSite/SoftwareApplication JSON-LD, RSS feed, hreflang, and AI crawler entries in robots.txt. However it has one **critical architectural flaw** that invalidates most of the per-page SEO work: the site is a client-side SPA with a single static `index.html`, meaning every URL served to search engine crawlers returns **the same title, meta description, canonical URL, and OG tags** — the homepage values. This means 11 URLs are presenting duplicate meta to Googlebot. Pages do have unique JSON-LD injected at runtime via React, but that does nothing for crawlers who read the static HTML shell.

The BlogPost page does dynamically update `document.title` and meta tags using `document.querySelector`, which works for users navigating in-browser after hydration but does nothing for the initial HTML returned by the server to crawlers.

---

## Critical Issues (P0)

### C1 — All pages share the same title tag, meta description, and canonical URL in static HTML

**Impact: Severe — prevents any secondary page from ranking independently.**

Every URL on the site — `/features`, `/for-dentists`, `/about`, `/blog`, `/blog/what-is-periodontal-disease`, etc. — returns the following identical static HTML to search engine crawlers:

```
<title>Perioskoup — Your Personal Dental Companion</title>
<meta name="description" content="Perioskoup bridges the gap between dental visits with AI-powered guidance, habit tracking, and real-time support. Winner of the EFP Digital Innovation Award 2025." />
<link rel="canonical" href="https://perioskoup.com/" />
```

The canonical tag on `/features` points to the homepage, telling Google that `/features` is a duplicate of `/`. This is confirmed by fetching the live pages:

```bash
# All three return identical meta:
curl https://official-perioskoup.vercel.app/features | grep '<title>'
# → <title>Perioskoup — Your Personal Dental Companion</title>
curl https://official-perioskoup.vercel.app/for-dentists | grep 'canonical'
# → <link rel="canonical" href="https://perioskoup.com/" />
```

**Root cause:** This is a SPA with no SSR and no pre-rendering. The single `index.html` is served for every route and React renders client-side, but Googlebot reads the raw HTML first.

**Fix:** Implement per-page meta using one of these approaches (in priority order):

**Option A — `react-helmet-async` (minimal change, works with current stack):**

Install:
```bash
pnpm add react-helmet-async
```

Wrap the app in `HelmetProvider` in `client/src/main.tsx`:
```tsx
import { HelmetProvider } from 'react-helmet-async';
// ...
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
```

Add a `<Helmet>` to each page. Example for Features:
```tsx
import { Helmet } from 'react-helmet-async';

export default function Features() {
  return (
    <>
      <Helmet>
        <title>AI Dental App Features — Habit Tracking, Reminders & Clinician Dashboard | Perioskoup</title>
        <meta name="description" content="Explore Perioskoup's AI dental companion features: personalised habit tracking, smart reminders, progress dashboards, secure patient-clinician messaging, and GDPR-compliant data storage." />
        <link rel="canonical" href="https://perioskoup.com/features" />
        <meta property="og:title" content="AI Dental App Features | Perioskoup" />
        <meta property="og:description" content="AI-powered habit tracking, smart reminders, clinician dashboard, and secure messaging for dental patients and practices." />
        <meta property="og:url" content="https://perioskoup.com/features" />
      </Helmet>
      {/* rest of component */}
    </>
  );
}
```

NOTE: `react-helmet-async` only solves the problem for human visitors and for crawlers that execute JavaScript (Googlebot does). It does NOT fix the static HTML served before hydration. For full pre-rendering, use Option B.

**Option B — Vite-plugin prerender (fully solves the problem):**

Install:
```bash
pnpm add -D vite-plugin-prerender
```

Add to `vite.config.ts`:
```ts
import prerender from 'vite-plugin-prerender';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      staticDir: path.resolve(import.meta.dirname, 'dist/public'),
      routes: [
        '/',
        '/features',
        '/for-dentists',
        '/about',
        '/blog',
        '/blog/what-is-periodontal-disease',
        '/blog/efp-digital-innovation-award-2025',
        '/blog/how-ai-is-changing-dental-monitoring',
        '/blog/3-minute-routine-save-teeth',
        '/blog/why-patients-forget-instructions',
        '/blog/building-the-bridge-perioskoup-story',
        '/pricing',
        '/waitlist',
        '/contact',
        '/privacy',
        '/terms',
      ],
    }),
  ],
```

This generates static HTML files for each route at build time, with the correct meta tags already rendered. This is the recommended long-term solution.

---

## High Priority Issues (P1)

### H1 — OG tags are also identical across all pages in static HTML

Same root cause as C1. Every page serves the homepage OG image, OG title, and OG type. When `/blog/what-is-periodontal-disease` is shared on LinkedIn or Twitter, it shows the homepage branding rather than the article. The BlogPost component does use `document.querySelector` to patch OG tags after hydration, but this only works if the user is already on the page — share scrapers hit the raw HTML.

**Fix:** Addressed by the same prerender solution in C1, combined with per-page Helmet tags for OG.

Required per-page OG tags to add (example for the periodontal disease blog post):
```html
<meta property="og:type" content="article" />
<meta property="og:title" content="What Is Periodontal Disease? A Patient's Complete Guide | Perioskoup" />
<meta property="og:description" content="Periodontal disease affects 1 in 2 adults. Learn what it is, how it progresses, and what you can do about it — from a practising periodontist." />
<meta property="og:url" content="https://perioskoup.com/blog/what-is-periodontal-disease" />
<meta property="article:published_time" content="2025-11-12T00:00:00Z" />
<meta property="article:author" content="Dr. Anca Laura Constantin" />
```

### H2 — Twitter card description is too short (66 chars)

Current twitter:description: `"AI-powered dental companion app. EFP Innovation Award Winner 2025."` — 67 characters. Twitter recommends 125-200 characters for summary_large_image cards. The description is not compelling for CTR.

**Fix:**
```html
<meta name="twitter:description" content="Bridge the gap between dental appointments with AI habit tracking, smart reminders, and a clinician dashboard. EFP Digital Innovation Award 2025 Winner." />
```
Character count: 155 — optimal.

### H3 — No per-page Twitter card metadata

Same root cause as C1 and H1. All pages show the same Twitter card.

### H4 — Missing target keywords in title tag

The homepage title `"Perioskoup — Your Personal Dental Companion"` does not include any of the target keywords:
- "AI dental companion" — absent
- "dental patient engagement app" — absent
- "periodontal habit tracking" — absent
- "dental AI app" — absent
- "between visit dental care" — absent

The title is brand-forward but keyword-empty. Suggested fix:

```html
<title>Perioskoup — AI Dental Companion App | Between-Visit Dental Care</title>
```
Character count: 58 — optimal.

For secondary pages, use the target keyword at the front:
- Features: `AI Dental Companion App Features — Habit Tracking & Care Plans | Perioskoup`
- For Dentists: `Dental Patient Engagement App for Clinicians | Perioskoup`
- Blog index: `Dental Health & AI Blog — Periodontal Care Insights | Perioskoup`

### H5 — geo.region points to GB but the company is Romanian

`index.html` line 13-14:
```html
<meta name="geo.region" content="GB" />
<meta name="geo.placename" content="London, United Kingdom" />
```

The Organization schema and llms.txt both correctly state Bucharest, Romania. The geo meta tags contradict this and may confuse local search signals.

**Fix:**
```html
<meta name="geo.region" content="RO" />
<meta name="geo.placename" content="Bucharest, Romania" />
<meta name="geo.position" content="44.4268;26.1025" />
<meta name="ICBM" content="44.4268, 26.1025" />
```

If UK/EU market is intentionally primary, consider adding a separate `en-GB` hreflang pointing to a GB-focused URL, but keep geo data accurate to the business registration.

### H6 — Blog page (Blog.tsx) has no Helmet / no JSON-LD for blog listing

The `Blog.tsx` page renders no structured data and has no per-page meta (it relies on the homepage fallback). A blog listing page should have at minimum:
- A unique title and description targeting keywords like "dental health AI blog" and "periodontal care insights"
- An `ItemList` schema linking to each article

**Fix — add to Blog.tsx:**
```tsx
const blogListingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://perioskoup.com/blog",
  "name": "Perioskoup Blog",
  "description": "Evidence-based articles on periodontal health, dental AI, and patient care from the Perioskoup team.",
  "url": "https://perioskoup.com/blog",
  "publisher": { "@id": "https://perioskoup.com/#organization" },
  "blogPost": POSTS.map(p => ({
    "@type": "BlogPosting",
    "headline": p.title,
    "url": `https://perioskoup.com/blog/${p.slug}`,
    "datePublished": p.date,
    "author": { "@type": "Person", "name": p.author }
  }))
};
```

### H7 — Pricing page has no hreflang in sitemap

The sitemap includes hreflang only for the homepage. Non-home pages have no `xhtml:link` hreflang alternate tags, meaning Google cannot correctly attribute language/region signals for those pages.

**Fix — add to sitemap.xml for each page:**
```xml
<url>
  <loc>https://perioskoup.com/features</loc>
  <lastmod>2026-03-06</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
  <xhtml:link rel="alternate" hreflang="en-GB" href="https://perioskoup.com/features"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://perioskoup.com/features"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://perioskoup.com/features"/>
</url>
```

Apply this pattern to all 9 non-home pages.

---

## Medium Priority Issues (P2)

### M1 — Duplicate FAQPage JSON-LD across multiple pages

FAQ schema is injected by these pages: `Home.tsx`, `Features.tsx`, `ForDentists.tsx`, `Pricing.tsx`. While the questions differ, Google's FAQ rich result is reserved for actual dedicated FAQ pages. Having FAQPage schema on commercial/feature pages may not generate rich results and dilutes schema clarity.

**Recommendation:** Keep FAQPage schema only on pages that are primarily Q&A in nature. Move FAQ schema off the homepage and features page, or convert the homepage FAQ section into a dedicated `/faq` page that can rank for FAQ-style queries.

### M2 — Home.tsx H1 does not contain any target keyword

Current H1: `"Between visits, we take over."`

This is a brand tagline, not a keyword-bearing heading. Googlebot uses the H1 as a primary relevance signal. The phrase "between visits" is close to the keyword "between visit dental care" but lacks "dental" and "AI".

**Fix — adjust copy to include keyword naturally:**
```
Between dental visits,
your AI companion takes over.
```
This preserves the emotional punch while containing "dental visits" and "AI companion".

Alternatively, add a subtitle `<h2>` immediately below that contains the exact keyword:
```html
<h2>The AI dental companion for between-visit care</h2>
```

### M3 — About, Waitlist, Contact, Privacy, Terms pages have no unique meta at all

These pages each contain unique, crawlable content but all serve the homepage title and description. At minimum each needs:

| Page | Suggested Title (≤60 chars) | Suggested Description |
|------|------|------|
| About | `About Perioskoup — Dental AI Built in Bucharest` | `Meet the team behind Perioskoup: a periodontist, engineer, and AI specialist on a mission to close the gap between dental visits and home care.` |
| Waitlist | `Join the Perioskoup Waitlist — Early Access` | `Get priority access to the AI dental companion app launching in 2026. 500+ patients and 30+ clinics already on the list.` |
| Contact | `Contact Perioskoup — Dental AI Enquiries` | `Reach the Perioskoup team for press, clinic partnerships, investor enquiries, or product questions. We respond within 24 hours.` |
| Privacy | `Privacy Policy — Perioskoup GDPR Compliance` | `How Perioskoup collects, stores, and protects your health data in line with GDPR and EU data protection law.` |
| Terms | `Terms of Service — Perioskoup` | `Terms governing the use of the Perioskoup dental companion application, including SaMD disclaimer and data responsibilities.` |

### M4 — SoftwareApplication schema missing `offers`, `screenshot`, and `featureList`

The `SoftwareApplication` schema in `index.html` is minimal. Google's Rich Results Test expects additional fields for app-related rich results.

**Fix — expand the SoftwareApplication node:**
```json
{
  "@type": "SoftwareApplication",
  "name": "Perioskoup",
  "operatingSystem": "iOS, Android",
  "applicationCategory": "HealthApplication",
  "description": "AI-powered dental companion app that bridges the gap between dental visits with personalised daily habits for patients.",
  "url": "https://perioskoup.com/",
  "author": { "@id": "https://perioskoup.com/#organization" },
  "award": "EFP Digital Innovation Award 2025",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/PreOrder"
  },
  "featureList": "AI habit coaching, periodontal habit tracking, dental patient engagement, clinician dashboard, GDPR-compliant messaging",
  "applicationSubCategory": "Dental Health",
  "countriesSupported": "RO, GB, EU"
}
```

### M5 — BlogPost per-article OG image is the same branded image for all articles

All blog posts use the same OG image (`og-image-XvtYEDVZMACucdvxk9BYR8.png`). While this is acceptable for brand consistency, per-article OG images dramatically improve CTR when shared on social media. Consider generating article-specific images using an OG image generation service (e.g., Vercel OG, Cloudinary auto-gen) that includes the article headline.

### M6 — No `twitter:creator` tags on blog posts

Blog posts have `twitter:site` but no `twitter:creator`. Since authors are named individuals with professional profiles, adding creator attribution improves author E-E-A-T signals in social sharing contexts.

**Fix — add to BlogPost article meta:**
```html
<meta name="twitter:creator" content="@ancaconstantinDMD" />
```
(Create author Twitter handles if they do not exist, or use `@perioskoup`.)

### M7 — BlogPost page uses `document.querySelector` for meta manipulation — fragile and order-dependent

`BlogPost.tsx` lines 762-810 use DOM manipulation to patch meta tags after React renders. This approach:
1. Has a flash where the homepage title briefly appears before being updated
2. Fails entirely for crawlers that do not execute JavaScript
3. Depends on the meta tags existing in index.html in the exact expected form
4. Does not update on navigation between two different blog posts (React does not remount the component, so the useEffect may not re-run correctly)

The `return` cleanup function resets canonical back to `https://perioskoup.com/` on unmount — meaning if a user navigates from a blog post to another blog post via client-side navigation, the canonical briefly reverts to the homepage before the new article's useEffect fires.

**Fix:** Replace with `react-helmet-async` Helmet component as described in C1.

### M8 — Missing `dateModified` in BlogPosting JSON-LD

The BlogPost component injects a `BlogPosting` schema but the `dateModified` field is absent. Google uses `dateModified` for freshness signals.

Current schema (from BlogPost.tsx):
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "datePublished": "2025-11-12"
  // dateModified missing
}
```

**Fix:** Add `"dateModified"` equal to `datePublished` initially, then update when content is revised.

### M9 — `noindex` should be added to /waitlist and /privacy and /terms

These pages provide conversion or legal content but should not dilute crawl budget or compete for keyword rankings. Standard practice:

```html
<!-- In Privacy.tsx, Terms.tsx Helmet -->
<meta name="robots" content="noindex, follow" />
```

For Waitlist, consider `noindex` during beta since it will change significantly at launch. For Privacy and Terms, `noindex` is strongly recommended — these pages should not appear in SERPs.

---

## Low Priority Issues (P3)

### L1 — Internal link audit

**Navigation coverage (Navbar):** Features, For Dentists, About, Blog, Waitlist — good. Missing: Pricing, Contact.

**Footer coverage:** Features, For Dentists, Pricing, Waitlist, About, Blog, Contact, Privacy, Terms — comprehensive.

**Homepage internal links:** Waitlist (x2), For Dentists (x1), Features (x1) — adequate but could add a link to Blog.

**Missing cross-links:**
- Features page does not link to individual blog posts about features
- About page does not link to Blog or For Dentists
- Blog post pages link back to /waitlist in the CTA but do not cross-link to related articles
- For Dentists page does not link to Pricing

**Recommendation:** Add 2-3 contextual internal links per page, especially from blog posts to features and from features to relevant blog content. This builds topical authority clusters.

### L2 — Blog listing page uses H2 for post titles inside a semantic section that already has H1

In `Blog.tsx`, the featured posts render post titles with `<h2>` elements but the "All Articles" section below renders post titles with `<h3>` elements. This is inconsistent. The "All Articles" section `<h2 className="display-sm">All Articles</h2>` is correct, but every article title below it should consistently be `<h3>` (currently the featured posts use `<h2>` for the article titles while the regular posts use `<h3>`).

The H1 "Insights on dental health, AI, and care." is correctly placed at the top.

**Fix:** Change all featured post card headings from `<h2>` to `<h3>` in Blog.tsx.

### L3 — Privacy and Terms H2 headings use Dongle font at 24px — too small for accessibility/crawlability

The Privacy and Terms pages render section headings as `<h2>` with `fontSize: 24` — which is correct hierarchy but visually small. More importantly, the sections are numbered (`1. Introduction`, `2. Data We Collect`) which is fine, but the heading numbering format is not standard for schema purposes.

### L4 — robots.txt missing `Cohere-AI`, `Bytespider`, and `meta-externalagent`

Current robots.txt covers: GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot. Missing explicit entries for several other major AI crawlers:

```
User-agent: Cohere-AI
Allow: /

User-agent: Bytespider
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: Diffbot
Allow: /

User-agent: omgili
Allow: /
```

### L5 — llms.txt is accurate and well-structured — minor additions recommended

The `/llms.txt` file is excellent: accurate business facts, clear wellness/non-medical positioning, content permissions, and key page links. Minor additions that would strengthen it:

- Add the EFP source URL directly: `Source: https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/`
- Add pricing model explicitly: `Business model: B2B2C — dental practices pay (€39-199/mo), patients free`
- Add launch date: `Target launch: March 2026`
- Add blog URLs for major articles

### L6 — No `preload` for Largest Contentful Paint images

The hero background image is loaded as a CSS `background-image` with no preload hint. On mobile, this delays the LCP significantly. The fonts load via Google Fonts without `preload` hints.

**Fix — add to index.html `<head>`:**
```html
<link rel="preload" as="image" href="https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/hero-bg-soft_c6281481.png" />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Dongle:wght@700&family=Gabarito:wght@400;500;600;700&display=swap" />
```

### L7 — Font loading strategy causes render blocking

Google Fonts is loaded synchronously with `<link rel="stylesheet">`. While preconnect is present, the font CSS is still render-blocking on slow connections.

**Fix:** Add `font-display: swap` via the `&display=swap` parameter (already present in the URL — good), but consider self-hosting the fonts in the Vite build to eliminate the third-party dependency and remove the render-blocking entirely.

### L8 — Oversized dependency bundle for a landing page

The `package.json` includes a large number of Radix UI primitives and libraries that are not used in the rendered pages: `@radix-ui/react-accordion`, `recharts`, `framer-motion`, `react-day-picker`, `embla-carousel-react`, `input-otp`, `vaul`, etc. Many of these appear to be scaffolding dependencies that were never removed.

**Impact on CWV:** A large JavaScript bundle delays Time to Interactive (TTI) and First Input Delay (FID/INP). The SPA nature means all of React, wouter, and every page component loads on first visit.

**Recommended actions:**
1. Run `npx vite-bundle-visualizer` to identify the largest contributors
2. Remove unused Radix UI packages (accordion, day-picker, embla-carousel etc. are not referenced in any page)
3. Consider lazy-loading page components with `React.lazy()` and `Suspense`

Example lazy loading in App.tsx:
```tsx
const Features = React.lazy(() => import('./pages/Features'));
const Blog = React.lazy(() => import('./pages/Blog'));
// etc.
```

### L9 — Missing `rel="noopener noreferrer"` on some external links

The footer EFP award link correctly has `rel="noopener noreferrer"`. The hero EFP badge and about page award links also correctly include this. Consistent — no action needed here beyond confirming all external links maintain this pattern.

### L10 — Vercel deployment domain mismatch

The site is live at `official-perioskoup.vercel.app` but all canonical URLs reference `perioskoup.com`. This means the Vercel subdomain is accessible and indexable at a separate origin with incorrect canonicals pointing to a domain that may not be fully resolving yet.

**Action required:** Confirm `perioskoup.com` is connected as a custom domain in Vercel settings. If it is connected, add a Vercel redirect rule to redirect `official-perioskoup.vercel.app` → `perioskoup.com` to prevent duplicate content indexing of the Vercel subdomain.

In `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "official-perioskoup.vercel.app" }],
      "destination": "https://perioskoup.com/$1",
      "permanent": true
    }
  ]
}
```

---

## Per-Page Audit Summary

| Page | H1 Present | H1 Keyword | Unique Title (HTML) | Unique Meta Desc (HTML) | Correct Canonical | OG Unique | JSON-LD |
|------|------|------|------|------|------|------|------|
| Home `/` | YES | Weak | YES | YES | YES | YES | FAQPage, WebSite, Org, SoftwareApp, Person |
| Features `/features` | YES | Weak | NO* | NO* | NO* | NO* | FAQPage (via React) |
| For Dentists `/for-dentists` | YES | Weak | NO* | NO* | NO* | NO* | FAQPage (via React) |
| About `/about` | YES | None | NO* | NO* | NO* | NO* | Person (via React) |
| Blog `/blog` | YES | None | NO* | NO* | NO* | NO* | None |
| Blog Post | YES | YES | via DOM patch | via DOM patch | via DOM patch | via DOM patch | BlogPosting, BreadcrumbList |
| Pricing `/pricing` | YES | None | NO* | NO* | NO* | NO* | FAQPage, Product (via React) |
| Waitlist `/waitlist` | YES | None | NO* | NO* | NO* | NO* | None |
| Contact `/contact` | YES | None | NO* | NO* | NO* | NO* | LocalBusiness (via React) |
| Privacy `/privacy` | YES | None | NO* | NO* | NO* | NO* | None |
| Terms `/terms` | YES | None | NO* | NO* | NO* | NO* | None |

*) "NO*" = these values are present in the rendered DOM after JavaScript executes but the static HTML served to crawlers contains the homepage values instead.

---

## Robots.txt Assessment

**Score: 8/10 — Good**

Strengths:
- `Allow: /` for all crawlers by default
- `/api/*` correctly disallowed
- Explicit allow entries for GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot — excellent AI crawler coverage
- Sitemap referenced correctly

Weaknesses:
- Missing Cohere-AI, Bytespider, meta-externalagent (see L4)
- No `Disallow` for 404 page or utility routes

---

## Sitemap Assessment

**Score: 7/10 — Good with gaps**

Strengths:
- All 10 core pages listed with realistic priorities
- All 6 blog posts listed with correct slugs and dates
- Blog posts have accurate `lastmod` dates that match content dates
- Sitemap domain matches canonical domain (perioskoup.com)
- Correct XML structure with xhtml namespace for hreflang

Weaknesses:
- hreflang `xhtml:link` tags only present on homepage entry, absent from all other 9 core pages and all 6 blog posts (see H7)
- `/404` is not listed (correct, this is by design)
- changefreq values are reasonable but `yearly` for all blog posts may reduce crawl frequency — consider `monthly` for the most recent 3 posts

---

## JSON-LD Structured Data Assessment

**Score: 6.5/10**

Present and correct:
- `@graph` pattern in index.html with `WebSite`, `Organization`, `Person`, and `SoftwareApplication` — excellent
- `SearchAction` on WebSite for sitelinks search box — good
- `BreadcrumbList` generated by the Breadcrumb component on all secondary pages
- `BlogPosting` with rich author, date, and FAQ data on individual blog posts
- `FAQPage` on Home, Features, ForDentists, Pricing — covers all likely FAQ queries
- `Product` with `Offer` on Pricing page
- `LocalBusiness` on Contact page

Issues:
- `SoftwareApplication` missing `offers`, `featureList`, `screenshot` (see M4)
- `BlogPosting` missing `dateModified` (see M8)
- No `Blog` schema on the blog listing page (see H6)
- `FAQPage` schema is runtime-injected via React and not present in static HTML crawlers receive
- `Person` schema on About page duplicates the `Person` already declared in index.html — should use `@id` reference only: `{ "@id": "https://perioskoup.com/#anca-constantin" }` rather than re-declaring the full object

---

## Heading Hierarchy Audit

| Page | H1 Count | H2 Count | H3 Count | Issues |
|------|------|------|------|------|
| Home | 1 ("Between visits, we take over.") | 5 | 4 | H1 missing target keyword |
| Features | 1 ("Built for the full dental journey.") | 1 | 9 | Correct |
| For Dentists | 1 ("Your patients, better prepared.") | 2 | 4 | Correct |
| About | 1 ("Born in a dental chair...") | 3 | 4 | Correct |
| Blog | 1 ("Insights on dental health, AI, and care.") | 3 | 5 | Featured post titles use H2, regular post titles use H3 — inconsistent (see L2) |
| Blog Post | 1 (article title) | Multiple | Multiple | Markdown-rendered, hierarchy depends on content |
| Pricing | 1 ("Simple, transparent pricing.") | 1 | 5 | Correct |
| Waitlist | 1 ("Join the founding waitlist.") | 0 | 0 | Missing H2/H3 substructure |
| Contact | 1 ("Let's talk dental health.") | 0 | 1 | Missing H2 |
| Privacy | 1 ("Privacy Policy") | 7 | 0 | Correct for legal page |
| Terms | 1 ("Terms of Service") | 8 | 0 | Correct for legal page |

All pages have exactly one H1. No heading level is skipped. Minor issue: Contact and Waitlist pages lack H2 headings, reducing semantic structure for those pages.

---

## Internal Link Audit

Total internal links across all pages (excluding Navbar and Footer which are consistent across all pages):

- Home → /waitlist (x2), /for-dentists (x1), /features (x1)
- Features → /waitlist (x2), /for-dentists (x1)
- For Dentists → /waitlist (x3), /features (x1), /contact (x1)
- About → /waitlist (x1), /contact (x1)
- Blog → /blog/:slug (x6 — all posts)
- Blog Post → /blog (x1 breadcrumb), /waitlist (x1 CTA)
- Pricing → /waitlist (x2)
- Waitlist → / (back link only)
- Contact → none (only form)

Missing cross-links:
1. Blog → Features (no link to the product from editorial content)
2. Blog → For Dentists (dentist-focused posts should link to the clinician page)
3. Features → Blog (no editorial support for feature claims)
4. Home → Blog (no editorial hub link from homepage)
5. About → Features (no product discovery from team story)

Recommendation: Add these 5 link paths as in-context links within body copy, not just navigation. Anchor text should use keyword-rich phrases ("dental habit tracking features", "AI dental companion for clinicians").

---

## Duplicate / Thin Content Assessment

**Blog content:** The six blog posts contain substantial, original long-form content (5-8 minute reads with unique angles). No duplicate content detected between posts.

**Thin content risk:** The Waitlist page contains minimal text content — primarily a form. If it is indexed (currently it is, with `robots: index, follow`), it could be flagged as thin. Recommend either adding more unique content to the Waitlist page or adding `noindex` (see M9).

**The Pricing page** mentions "Coming soon" for clinic pricing — this is thin on transactional information. Since the pricing section is intentionally blurred (beta overlay), this is acceptable short-term but should be replaced with real pricing copy at launch.

---

## CWV (Core Web Vitals) Risk Assessment

**Estimated risk: MEDIUM-HIGH**

The following factors present CWV risk without direct measurement:

1. **LCP:** Hero section loads a CDN background image as CSS `background-image` — this is not discoverable by the preload scanner, meaning it will load late. The LCP element on mobile is likely the hero text or image. No preload hint exists for the hero image (see L6).

2. **INP (Interaction to Next Paint):** Multiple pages use synchronous IntersectionObserver hooks that run on every scroll event. The `useReveal` function is duplicated in 7 page components instead of being a shared module — a minor code smell but not a performance issue.

3. **CLS:** CSS animations using `transform` and CSS custom properties (Ken Burns, orb animations) are generally CLS-safe. The ticker animation and parallax hero background should not cause layout shifts. Low risk.

4. **Bundle size concern:** The `package.json` includes 30+ Radix UI packages, framer-motion, recharts, react-day-picker, embla-carousel, and other libraries not seen in any page component. If these are being tree-shaken by Vite, the impact is minimal. If not, the initial JS bundle could be 500KB+ which would severely impact TTI and INP on mobile. Recommend running a bundle analysis.

5. **Google Fonts render blocking:** Despite `preconnect` hints, Google Fonts stylesheet is synchronously loaded. On slow connections this can delay First Contentful Paint by 100-300ms.

---

## Summary Scorecard

| Category | Score | Notes |
|------|------|------|
| Title Tags | 2/10 | All pages serve homepage title in static HTML |
| Meta Descriptions | 2/10 | All pages serve homepage description in static HTML |
| Canonical URLs | 1/10 | All secondary pages canonicalize to homepage |
| OG Tags | 3/10 | Only fixed via JS after hydration, not in static HTML |
| Twitter Cards | 4/10 | Same static values, description too short |
| JSON-LD (homepage) | 8/10 | Well-structured @graph with all key types |
| JSON-LD (per-page) | 5/10 | Present but runtime-only; some types missing fields |
| robots.txt | 8/10 | Excellent AI crawler coverage, minor omissions |
| sitemap.xml | 7/10 | Complete pages and blog posts, missing per-page hreflang |
| llms.txt | 8/10 | Accurate and comprehensive |
| hreflang | 5/10 | Present in HTML and sitemap but only for homepage |
| Heading hierarchy | 8/10 | Correct H1 on every page, minor Blog inconsistency |
| Internal links | 6/10 | Navigation complete, missing editorial cross-links |
| Bundle / CWV | 5/10 | LCP image not preloaded, large unused dependency set |
| Content quality | 7/10 | Blog content is substantive; some thin pages |
| **Overall** | **4.5/10** | Critical SPA meta tag architecture flaw dominates score |

---

## Prioritised Fix Roadmap

### Week 1 (P0 — Critical)
1. Install `react-helmet-async` and add per-page `<Helmet>` to all 11 pages — fixes title, description, canonical, OG, and Twitter in-browser
2. Add `prerender` plugin to Vite config for static HTML generation — fixes for crawlers
3. Update homepage title to include "AI dental companion" keyword

### Week 2 (P1 — High)
4. Add hreflang `xhtml:link` to all non-home sitemap entries
5. Fix geo.region from GB to RO
6. Add `noindex` to Privacy, Terms, and Waitlist
7. Expand Twitter card description to 140+ characters on all pages

### Week 3 (P2 — Medium)
8. Add `dateModified` to all BlogPosting schemas
9. Add Blog listing JSON-LD (Blog type with blogPost array)
10. Expand SoftwareApplication schema with offers and featureList
11. Add 5 missing editorial internal link paths
12. Add LCP image preload hint for hero background

### Week 4 (P3 — Low)
13. Remove unused Radix UI packages from package.json
14. Add React.lazy() code splitting for all page components
15. Add missing AI crawler entries to robots.txt
16. Add self-hosted font option to eliminate Google Fonts render blocking
17. Confirm perioskoup.com Vercel custom domain and add Vercel subdomain redirect
18. Fix Blog.tsx featured post headings from H2 to H3

---

*Audit performed on 2026-03-06 against source code at `/Users/moziplaybook/Projects/official-perioskoup` and live site at `https://official-perioskoup.vercel.app`.*
