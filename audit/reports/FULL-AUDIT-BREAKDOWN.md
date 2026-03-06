# Perioskoup.com — Full Audit Breakdown

**Date:** 2026-03-06
**Audited by:** 6 specialist agents + synthesis
**Site:** https://perioskoup.com
**Stack:** Vite 7 + React 19 + Tailwind CSS v4 (SPA on Vercel)
**Strategy reference:** audit/strategy-reference.md

---

# Part I: Overall Assessment

## Scores by Dimension

| # | Dimension | Grade | Score | Verdict |
|---|-----------|-------|-------|---------|
| 1 | Content & Messaging | C+ | 5.5/10 | Home page strong; For Dentists page is a conversion dead zone; answer capsules missing from static pages |
| 2 | Technical SEO | C | 5.8/10 | No SSR/pre-rendering; social meta incomplete; IndexNow absent |
| 3 | User Journey & UX | C- | 5.0/10 | Forms don't submit; mobile grids broken; nav gaps |
| 4 | GEO Readiness | B+ | 7.5/10 | Blog best-in-class; static pages need capsules; HTTP headers incomplete |
| 5 | Schema & Structured Data | B | 7.0/10 | Strong @graph foundation; Dr. Anca schema incomplete; relative URLs |
| 6 | Competitive Positioning | B- | 6.0/10 | Zero differentiation; category asserted but never defined; founding story buried |
| **Overall** | | **C+** | **6.1/10** | |

## What is Working Well

1. **Blog answer capsules** — 100% H2 coverage across all 6 articles (37 capsules). Best-in-class GEO implementation.
2. **EFP Award integration** — Deployed in 8+ locations (hero badge, dedicated card, footer, ticker, blog post, schema, llms.txt, social proof bars). Near-perfect execution.
3. **llms.txt ecosystem** — Both llms.txt and llms-full.txt follow the llmstxt.org standard. Comprehensive content. Significantly ahead of market.
4. **robots.txt** — 11 AI crawlers explicitly allowed with `Allow: /`. Sitemap and llms.txt references included.
5. **Entity @graph in index.html** — WebSite, Organization, Person, SoftwareApplication with proper @id cross-references. Clean entity graph.
6. **FAQPage schema** — Present on 7/7 indexable content pages with 26+ unique questions.
7. **react-helmet-async** — Used on all 11 pages with title, description, canonical, OG, and Twitter meta.
8. **Image alt tags** — Complete and descriptive across all components.
9. **Heading hierarchy** — Proper H1 > H2 > H3 on all pages. One H1 per page.
10. **noscript fallback** — Comprehensive homepage content for non-JS crawlers (hero, features, how it works, team, FAQ as `<dl>`).
11. **Home page hero** — Clear value prop, EFP badge above fold, dual CTA (patient + dentist), Dr. Anca quote, social proof micro-bar.
12. **Accessibility foundations** — Skip links, ARIA labels, reduced-motion support, RouteAnnouncer.

## What is Broken

1. **Forms don't submit** — All three forms discard data
2. **Mobile grids** — 4 sections on Home page are unreadable on mobile
3. **No pre-rendering** — SPA serves same index.html for all routes
4. **For Dentists page** — Empty of trust, ROI, positioning, authority
5. **No competitive differentiation** — Anywhere on the site

---

# Part II: Every Finding, by Source Report

---

## Report 01: Content & Messaging

### CRITICAL (3)

**CM-CRIT-01: For Dentists page has ZERO trust signals**
The primary B2B conversion page has no EFP award mention, no "30+ clinics on the waitlist," no Dr. Anca quote or credentials. A dentist evaluating the product sees only generic stats with no Perioskoup-specific social proof.
- File: `client/src/pages/ForDentists.tsx` (entire file)
- Fix: Add EFP badge in hero, "30+ founding clinics" social proof line, Dr. Anca quote, her credentials for clinical authority.

**CM-CRIT-02: For Dentists page has no ROI messaging**
Dentists evaluating a SaaS tool have no business case. No mention of revenue impact, cost savings, time savings per appointment, or patient lifetime value.
- File: `client/src/pages/ForDentists.tsx` (entire file)
- Fix: Add "ROI for Your Practice" section. Frame 40% no-show reduction as recovered revenue. Example: "A practice with 500 patients could save X hours/month and recover Y in no-show revenue."

**CM-CRIT-03: Answer capsules absent from ALL non-blog pages**
Blog posts have perfect GEO-ready answer capsules after every H2. Home, Features, For Dentists, Pricing, and About have zero capsules, severely limiting AI engine extraction from conversion pages.
- Files: `Home.tsx` (H2s at lines 366, 403, 473, 535), `Features.tsx` (H2 at line 140), `ForDentists.tsx` (H2s at lines 139, 175), `Pricing.tsx` (H2 at line 167), `About.tsx` (H2s at lines 177, 212, 243)
- Fix: Add 2-3 sentence summary paragraph after every H2. Style with lime-green left border matching blog pattern.

### HIGH (10)

**CM-HIGH-01: Features page hero value prop is vague**
"Built for the full dental journey" doesn't communicate what Perioskoup does. A visitor landing from search has no immediate product understanding.
- File: `Features.tsx:86-89`
- Fix: Change to "AI dental companion features — everything between your visits, in one app."

**CM-HIGH-02: Features page has no trust signals**
No EFP mention, no waitlist numbers, no Dr. Anca anywhere on the page.
- File: `Features.tsx` (entire file)
- Fix: Add EFP badge + "Trusted by 30+ founding clinics. EFP Innovation Award Winner 2025."

**CM-HIGH-03: Dr. Anca's canonical EFP quote is modified**
Strategy requires: "...the lack of patient **adherence to treatment**..."
Site has: "...the lack of patient **engagement**..."
"Adherence" was replaced to comply with regulatory rules. Creates citation mismatch for AI engines comparing site text to external EFP sources.
- File: `Home.tsx:244-245`
- Fix: Founder decision needed. Options: (1) Use exact quote since it's a direct clinician quote, not a product claim. (2) Keep "engagement" but accept GEO citation divergence.

**CM-HIGH-04: EFP quote appears on only 1 page**
For GEO citation probability, the quote should appear on 2-3 pages.
- Files: `About.tsx`, `ForDentists.tsx` (quote absent from both)
- Fix: Add Dr. Anca's canonical quote to About and For Dentists pages.

**CM-HIGH-05: No workflow integration explanation on For Dentists**
The "Clinical Tools" section lists features but never explains how they fit into a dentist's existing appointment flow.
- File: `ForDentists.tsx:134-167`
- Fix: Add "How It Fits Your Workflow" section showing before/during/after appointment flow.

**CM-HIGH-06: Stats sourced to generic "digital health research"**
40% no-show reduction, 3x engagement, 85% treatment acceptance — all attributed to vague "digital health research." Weak for skeptical B2B audience.
- File: `ForDentists.tsx:116-128`
- Fix: Cite specific journals or add disclaimer: "Based on published digital health research; Perioskoup-specific outcomes tracked during beta."

**CM-HIGH-07: No problem-solution framing on For Dentists**
The page doesn't mention the "48h forgetting curve" (which IS on the About page) or position Perioskoup as the solution to this specific pain.
- File: `ForDentists.tsx` (entire file)
- Fix: Add "Patients forget 80% of care instructions within 48 hours. Perioskoup translates your clinical recommendations into daily habits they actually follow."

**CM-HIGH-08: No urgency/scarcity messaging anywhere**
No "limited spots," "founding pricing ends at launch," or visible timeline. March 2026 launch date appears only in meta descriptions.
- Fix: Add "Founding clinic spots are limited. Public launch: March 2026." on For Dentists and Waitlist pages.

**CM-HIGH-09: No patient testimonials or use cases**
All quotes are from founders or EFP. No patient scenarios, beta tester quotes, or use cases.
- Fix: Collect 2-3 beta tester testimonials, or add hypothetical patient scenarios.

**CM-HIGH-10: "AI dental companion" appears on only 3/10 pages**
The category-creation keyword is missing from For Dentists, About, Pricing, Blog, Contact, and the Footer.
- Fix: Add to visible body copy and meta on every content page. Target: at least once in visible text + once in meta per page.

### MEDIUM (8)

**CM-MED-01: H1 doesn't contain "dental"**
"Between visits, we take over." is emotionally compelling but has no dental keyword in the H1 tag. Visitors scanning only the headline get ambiguous meaning.
- File: `Home.tsx:232-235`
- Fix: Consider "Between dental visits, we take over" or "Your AI dental companion between visits."

**CM-MED-02: Contact page has no value reinforcement**
"Let's talk dental health" doesn't reinforce what Perioskoup is.
- File: `Contact.tsx:109-114`
- Fix: Add subline: "Perioskoup is the AI dental companion bridging clinic and home."

**CM-MED-03: Pricing page has no trust signals**
Decision-point page with no EFP badge, no clinic count — credibility gap at the moment of evaluation.
- File: `Pricing.tsx` (entire file)
- Fix: Add EFP badge + "30+ founding clinics" near pricing cards.

**CM-MED-04: No visual patient/dentist path separator in hero**
Dual CTA exists but no visual cue helps visitors self-select audience.
- File: `Home.tsx:253-261`
- Fix: Add two-column micro-value-prop: "For Patients: free companion. For Dentists: engagement dashboard."

**CM-MED-05: Blog has no waitlist CTA**
Only a newsletter subscribe. Blog visitors learning about periodontal health are high-intent prospects with no conversion path.
- File: `Blog.tsx:296-319`
- Fix: Add "Join the Waitlist" CTA between featured posts and article list.

**CM-MED-06: "How It Works" uses product-centric language**
"Scan, Analyze, Engage" are product terms. Patients don't think in terms of "scanning intraoral data."
- File: `Home.tsx:418-431`
- Fix: Reframe as "Visit your dentist > Get your plan > Build daily habits with AI support."

**CM-MED-07: "Winner" vs "3rd Prize" inconsistency**
Schema says "3rd Prize" (About.tsx:52), badges say "Winner." Could erode trust if someone checks EFP source.
- File: `About.tsx:52` vs visible badges
- Fix: Standardize across schema and visible copy.

**CM-MED-08: Footer omits "AI" from tagline**
"Your personal dental companion" instead of "Your AI dental companion." Missed sitewide category reinforcement.
- File: `Footer.tsx:49-51`
- Fix: Change to "Your AI dental companion. Bridging the gap between clinic and home."

### LOW (4)

**CM-LOW-01:** Features page has no filter for patient/dentist audience (`Features.tsx`)
**CM-LOW-02:** About CTA "Want to be part of the story?" is emotionally vague (`About.tsx:241-258`)
**CM-LOW-03:** ORCID and Google Scholar links missing for Dr. Anca (`About.tsx:40-57`)
**CM-LOW-04:** Navbar has no tagline for category reinforcement on mobile (`Navbar.tsx`)

---

## Report 02: Technical SEO

### CRITICAL (4)

**SEO-CRIT-01: No SSR or pre-rendering — SPA serves single index.html for all routes**
Every route serves identical HTML. Non-JS crawlers (Bing, social bots, most AI scrapers) see homepage meta for all pages. All canonical URLs point to `/` for these crawlers.
- Files: `vite.config.ts` (no prerender plugin), `server/index.ts:22` (catch-all serves index.html), `vercel.json:14` (all routes rewrite to index.html)
- Fix: Install `vite-plugin-prerender` to generate static HTML at build time for all routes.

**SEO-CRIT-02: Dr. Anca uses Person schema instead of Physician**
Strategy requires Physician schema. Current implementation uses `"@type": "Person"`. Missing `medicalSpecialty`, ORCID, Google Scholar.
- Files: `index.html:120`, `About.tsx:42`
- Fix: Change to `["Person", "Physician"]`, add `medicalSpecialty: "Periodontology"`, add ORCID/Scholar to sameAs.

**SEO-CRIT-03: IndexNow not implemented**
Zero references anywhere in the codebase. No API key, no submission script.
- Fix: Generate key at indexnow.org, place at `public/[key].txt`, create GitHub Action for post-deploy URL submission.

**SEO-CRIT-04: SPA architecture undermines canonical tags for non-JS crawlers**
index.html has static canonical pointing to `https://perioskoup.com/`. Every page has canonical to homepage for non-JS crawlers.
- Same root cause as CRIT-01. Pre-rendering fixes both.

### HIGH (7)

**SEO-HIGH-01: og:image missing on 9/10 pages**
Only BlogPost includes og:image. All others rely on index.html fallback with relative URL.
- Files: All page components in `pages/`
- Fix: Add `<meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />` to every Helmet.

**SEO-HIGH-02: twitter:card missing from all page Helmet blocks**
Only defined in index.html static fallback. No per-page override.
- Fix: Add `<meta name="twitter:card" content="summary_large_image" />` to every Helmet.

**SEO-HIGH-03: twitter:image missing from 9/10 pages**
Only BlogPost has it.
- Fix: Add `<meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />` to every Helmet.

**SEO-HIGH-04: og:image uses relative path instead of absolute URL**
`/images/og-image.jpg` instead of `https://perioskoup.com/images/og-image.jpg`. Social platforms require absolute URLs.
- Files: `index.html:26`, `BlogPost.tsx:849`
- Fix: Prefix all image meta with `https://perioskoup.com`.

**SEO-HIGH-05: Hreflang tags only in index.html and sitemap — not in per-page Helmets**
index.html hreflang always points to `/` regardless of current page.
- Fix: Add per-page hreflang in each Helmet block with matching canonical URL.

**SEO-HIGH-06: Organization logo URL uses relative path in JSON-LD**
`"url": "/images/logo.svg"` — Google requires absolute URLs in structured data.
- Files: `index.html:92` (logo), `index.html:127` (person image), `About.tsx:50` (person image), `BlogPost.tsx:812` (article image)
- Fix: Prefix all JSON-LD image URLs with `https://perioskoup.com`.

**SEO-HIGH-07: Dr. Anca's quote text differs from strategy reference**
"adherence" changed to "engagement" — regulatory/strategy conflict.
- File: `Home.tsx:245`
- Fix: Stakeholder decision required.

### MEDIUM (8)

**SEO-MED-01:** Product schema uses "Product" instead of SoftwareApplication on Pricing (`Pricing.tsx:68-78`)
**SEO-MED-02:** GoogleOther, CCBot, Applebot-Extended not in robots.txt (`public/robots.txt`)
**SEO-MED-03:** Sitemap is static, no dynamic generation (`public/sitemap.xml`)
**SEO-MED-04:** Home page heading hierarchy is proper (PASS with notes) (`Home.tsx`)
**SEO-MED-05:** Features page H3s appear before any H2 in document order (`Features.tsx`)
**SEO-MED-06:** ForDentists heading hierarchy is proper (PASS) (`ForDentists.tsx`)
**SEO-MED-07:** NotFound page missing Helmet and noindex meta (`NotFound.tsx:11-38`)
**SEO-MED-08:** No BreadcrumbList on Home page (optional, low priority) (`Home.tsx`)

### LOW (3)

**SEO-LOW-01:** Verify all sitemap blog slugs match ARTICLES keys in BlogPost.tsx
**SEO-LOW-02:** Pre-render shell image in index.html uses empty alt (correct for decorative, no action)
**SEO-LOW-03:** Blog author images missing `loading="lazy"` on featured cards (`Blog.tsx:240,280`)

### Technical SEO Sub-Scores

| Category | Score |
|----------|-------|
| SSR/Pre-rendering | 0/10 |
| react-helmet-async usage | 8/10 |
| og:image / twitter completeness | 3/10 |
| Structured data (Software/Org/FAQ) | 9/10 |
| Physician schema for Dr. Anca | 2/10 |
| robots.txt AI crawler access | 8/10 |
| Sitemap | 7/10 |
| Hreflang tags | 4/10 |
| IndexNow | 0/10 |
| Canonical URLs | 9/10 |
| Heading hierarchy | 9/10 |
| Image alt tags | 10/10 |

---

## Report 03: User Journey & UX

### P0 — Blocking (5)

**UX-P0-01: Forms do not submit to any backend**
All waitlist and contact form submissions are lost. Handlers call `setSubmitted(true)` without any API call.
- Files: `Home.tsx:102-114` (WaitlistForm), `Waitlist.tsx:52-58`, `Contact.tsx:50-56`
- Fix: Integrate Formspree, Vercel serverless function, or Mailchimp.

**UX-P0-02: Home page EFP Award card grid breaks on mobile**
Hard-coded `gridTemplateColumns: "1fr 1fr"` — two columns crush on mobile.
- File: `Home.tsx:318`
- Fix: `grid grid-cols-1 md:grid-cols-2`

**UX-P0-03: Home page bento feature grid breaks on mobile**
`gridTemplateColumns: "repeat(3, 1fr)"` with `span 2` cards — unreadable on mobile.
- File: `Home.tsx:375` and `Home.tsx:382`
- Fix: `grid grid-cols-1 md:grid-cols-3`, adjust span values responsively.

**UX-P0-04: Home page "How It Works" grid breaks on mobile**
`repeat(3, 1fr)` with `paddingTop: item.offsetY` — three columns + offset creates unusable layout.
- File: `Home.tsx:417` and `Home.tsx:432`
- Fix: `grid grid-cols-1 md:grid-cols-3`, remove offsetY on mobile.

**UX-P0-05: Home page team grid breaks on mobile**
`repeat(3, 1fr)` — three team cards side by side are unreadable.
- File: `Home.tsx:481`
- Fix: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (matching About page pattern at About.tsx:217).

### P1 — High Impact (5)

**UX-P1-01: For Dentists page lacks Dr. Anca / EFP authority signal**
Strategy requires clinical authority on every clinical page. For Dentists has neither.
- File: `ForDentists.tsx`
- Fix: Add "Clinical Leadership" section with photo, credentials, EFP quote, award badge.

**UX-P1-02: No "Contact" link in primary navigation**
Dentists looking to talk to the team can only find Contact via footer.
- File: `Navbar.tsx:12-17` (NAV_LINKS array)
- Fix: Add `{ label: "Contact", href: "/contact" }` to NAV_LINKS.

**UX-P1-03: About, Blog, and Pricing pages lack CTA above the fold**
These pages have hero sections with no conversion action visible in the first viewport.
- Files: `About.tsx:128-129`, `Blog.tsx:193-195`, `Pricing.tsx:110-111`
- Fix: Add compact "Join the Waitlist" pill button to each hero section.

**UX-P1-04: Inner pages lack trust signals above the fold**
Features, For Dentists, Pricing, About pages have no EFP award, clinic count, or Dr. Anca in their hero sections.
- Files: `Features.tsx` hero (~line 91), `ForDentists.tsx` hero (~line 97), `Pricing.tsx` hero (~line 109)
- Fix: Add compact trust bar below each hero headline.

**UX-P1-05: Blog newsletter form is non-functional**
Subscribe button has no onSubmit handler, no form tag, no state management. Clicking does nothing.
- File: `Blog.tsx:306-317`
- Fix: Wrap in `<form>` with onSubmit handler.

### P2 — Moderate Friction (9)

**UX-P2-01:** Features page lacks social proof for direct-landing visitors (`Features.tsx`, insert after CTA ~line 100)
**UX-P2-02:** No inline waitlist form on Features page — extra click friction (`Features.tsx:137-150`)
**UX-P2-03:** No visual segmentation of patient/dentist navigation paths (`Navbar.tsx`)
**UX-P2-04:** Pricing not in primary nav — both audiences have pricing as top question (`Navbar.tsx:12-17`)
**UX-P2-05:** Mobile drawer missing Contact and Pricing links (`Navbar.tsx:149` — inherits NAV_LINKS)
**UX-P2-06:** Mobile CTA hidden — "Join Waitlist" button has `hide-mobile` class (`Navbar.tsx:93`)
**UX-P2-07:** Waitlist page defaults to "dentist" role — confuses patients (`Waitlist.tsx:34`, change to "patient")
**UX-P2-08:** No loading state on form submissions — needed when backend is integrated (`Home.tsx`, `Waitlist.tsx`, `Contact.tsx`)
**UX-P2-09:** Footer lacks CTA or email capture (`Footer.tsx:43-77`)

### P3 — Polish (5)

**UX-P3-01:** SVG wave in "How It Works" invisible on mobile (`Home.tsx:413` — add `hidden md:block`)
**UX-P3-02:** Blog has no category filtering or search (`Blog.tsx` ~line 200)
**UX-P3-03:** Home waitlist "Other" role option provides no segmentation value
**UX-P3-04:** No social media links in footer (`Footer.tsx` below line 77)
**UX-P3-05:** 404 page lacks meta, suggestions, and secondary links (`NotFound.tsx`)

---

## Report 04: GEO Readiness

### Overall GEO Score: 7.5/10

### PASS — No Action Needed (6)

**GEO-PASS-01: llms.txt** — Comprehensive, follows llmstxt.org standard. Product description, award credentials, team, features, regulatory disclaimer, business model, content permissions, page URLs, RSS feed. 9/10.

**GEO-PASS-02: llms-full.txt** — Complete page content for all major routes. FAQ section. Regulatory notice. 8.5/10. (Minor: blog article body text not included — only titles/URLs.)

**GEO-PASS-03: robots.txt AI crawlers** — 11 crawlers explicitly allowed. Sitemap and llms.txt references. 9.5/10.

**GEO-PASS-04: FAQPage schema** — Present on all 7 indexable content pages. 26+ questions total. 8.5/10.

**GEO-PASS-05: Dr. Anca authority signals** — Quote in hero, team sections, noscript fallback, llms.txt. Credentials in schema, About, blog author roles. 9/10.

**GEO-PASS-06: SoftwareApplication entity** — Complete @graph with @id cross-references. WebSite, Organization, Person, SoftwareApplication properly linked. 9/10.

### MEDIUM (3)

**GEO-MED-01: Static pages lack answer capsules after H2s**
Blog posts: 100% coverage (37 capsules). Static pages: 0%. The main conversion pages are invisible to AI extraction after H2 headings.
- Files: `Home.tsx`, `Features.tsx`, `ForDentists.tsx`, `About.tsx`, `Pricing.tsx`
- Fix: Add 1-2 sentence factual summary after every H2. Example for Home features H2: "Perioskoup combines AI-powered guidance, daily habit tracking, a clinician dashboard, and secure patient-clinic messaging into a single dental companion app."

**GEO-MED-02: Statistics cite "digital health research" — too vague for AI citation**
85%, 40%, 3x claims on Home and For Dentists use vague attribution. AI engines discount unsourced statistics.
- Files: `Home.tsx`, `ForDentists.tsx`, `About.tsx`
- Fix: Replace with specific journal references or more precise attribution. Add `<cite>` HTML elements around source references.

**GEO-MED-03: HTTP headers incomplete**
X-Llms-Txt header only on `/` — should be all routes. No X-Robots-Tag header.
- Files: `vercel.json`, `server/index.ts`
- Fix: Expand X-Llms-Txt source to `"/(.*)"`. Add `X-Robots-Tag: all` header for all routes.

### LOW (3)

**GEO-LOW-01:** Add FAQPage schema to Contact page (2-3 FAQs) (`Contact.tsx`)
**GEO-LOW-02:** Add missing AI crawler entries (CCBot, YouBot, Applebot-Extended) to robots.txt
**GEO-LOW-03:** Add `screenshot` property to SoftwareApplication schema (`index.html`)

### GEO Sub-Scores

| Signal | Score |
|--------|-------|
| llms.txt + llms-full.txt | 9/10 |
| robots.txt AI crawlers | 9.5/10 |
| FAQPage schema coverage | 8.5/10 |
| Blog answer capsules | 10/10 |
| Static page answer capsules | 0/10 |
| Dr. Anca authority signals | 9/10 |
| Stat source attribution | 5/10 |
| HTTP headers | 5.5/10 |
| Entity markup | 9/10 |
| Featured snippet structure | 6.5/10 |
| noscript fallback | 8/10 |

---

## Report 05: Schema & Structured Data

### CRITICAL (2)

**SCHEMA-CRIT-01: Dr. Anca's ORCID iD missing from sameAs**
Strategy explicitly requires ORCID. Current sameAs only has EFP announcement URL.
- Files: `index.html:139-141`, `About.tsx:54-56`, `BlogPost.tsx:789-791`
- Fix: Obtain actual ORCID URL from Dr. Anca, add to all Person schema sameAs arrays.
- **Requires team input.**

**SCHEMA-CRIT-02: Dr. Anca's Google Scholar profile missing from sameAs**
Strategy explicitly requires Google Scholar. Not present anywhere.
- Same files as CRIT-01.
- Fix: Obtain actual Scholar URL from Dr. Anca, add to all Person schema sameAs arrays.
- **Requires team input.**

### HIGH (5)

**SCHEMA-HIGH-01: All image/logo URLs in JSON-LD are relative**
`"/images/logo.svg"`, `"/images/anca-headshot.jpg"`, `"/images/og-image.jpg"` — crawlers may fail to resolve.
- Files: `index.html:92` (logo), `index.html:127` (person image), `About.tsx:50`, `BlogPost.tsx:812`
- Fix: Prefix all with `https://perioskoup.com`.

**SCHEMA-HIGH-02: Organization schema missing contactPoint**
Strategy requires it. Helps Google show contact info in Knowledge Panels.
- File: `index.html` (Organization node, after email field)
- Fix: Add ContactPoint array with customer support + sales entries.

**SCHEMA-HIGH-03: Person schema missing medicalSpecialty**
No specialty field on Dr. Anca's Person node.
- File: `index.html` (Person node, after jobTitle)
- Fix: Add `"medicalSpecialty": "Dentistry"`.

**SCHEMA-HIGH-04: Person schema missing memberOf for EFP**
EFP is only in sameAs, not as formal affiliation.
- File: `index.html` (Person node)
- Fix: Add `"memberOf": { "@type": "Organization", "name": "European Federation of Periodontology", "url": "https://www.efp.org" }`.

**SCHEMA-HIGH-05: WebSite SearchAction points to non-functional endpoint**
`/blog?q={search_term_string}` — blog page doesn't handle query params. Non-functional SearchAction is worse than none.
- File: `index.html:73-80`
- Fix: Either implement blog search or remove SearchAction until search exists.

### MEDIUM (4)

**SCHEMA-MED-01:** FAQPage missing on Contact page (`Contact.tsx`)
**SCHEMA-MED-02:** FAQPage missing on Waitlist page (`Waitlist.tsx`)
**SCHEMA-MED-03:** BreadcrumbList last items omit `item` URL property (`Breadcrumb.tsx:28` — add href to last item in all usages)
**SCHEMA-MED-04:** Pricing page uses `Product` schema conflicting with global `SoftwareApplication` (`Pricing.tsx:68-78`)

### LOW (4)

**SCHEMA-LOW-01:** Missing `screenshot` in SoftwareApplication (`index.html`)
**SCHEMA-LOW-02:** `operatingSystem` as single string vs array (`index.html`)
**SCHEMA-LOW-03:** About.tsx Person schema less complete than global (missing hasOccupation, honorificPrefix)
**SCHEMA-LOW-04:** JSON-LD script tags in body vs head (valid but inconsistent)

### Schema Coverage Matrix

| Schema Type | Required | Present | Location | Gaps |
|-------------|----------|---------|----------|------|
| SoftwareApplication | Yes | Yes | index.html @graph | Missing screenshot, aggregateRating (defer) |
| Organization | Yes | Yes | index.html @graph + Contact.tsx | Missing contactPoint |
| Person/Physician | Yes | Person only | index.html @graph + About.tsx | Missing Physician type, medicalSpecialty, ORCID, Scholar, EFP memberOf |
| FAQPage | Yes | 7/11 pages | Per-page TSX | Missing on Contact, Waitlist |
| BreadcrumbList | Yes | All inner pages | Breadcrumb.tsx + BlogPost.tsx | Last item missing `item` URL |
| WebSite + SearchAction | Yes | Yes | index.html @graph | SearchAction may be non-functional |
| BlogPosting | Yes | Yes | BlogPost.tsx | Complete |
| ItemList | Recommended | Yes | Blog.tsx | Complete |
| HowTo | Recommended | No | — | "How It Works" is a natural candidate |

---

## Report 06: Competitive Positioning & Story

### CRITICAL (2)

**POS-CRIT-01: Zero competitive differentiation**
No mention of any competitor, competitive alternative, or what makes Perioskoup different from PMS portals, Dental Monitoring, or CareStack. Zero results for "PerioPredict", "CareStack", "competitor", "differentiat" in entire codebase.
- Fix: Add "Why Perioskoup?" section to For Dentists page. Position against categories, not named competitors:
  - "Not another PMS plugin. Practice management systems track appointments. Patient portals send reminders. But neither helps a patient build the daily habits that prevent disease recurrence."
  - "Not a remote monitoring device. Perioskoup is for the behavioural side: translating recommendations into a personalised daily programme."

**POS-CRIT-02: "AI dental companion" category is asserted but never defined**
The phrase appears in meta and ticker but the site never explains what the category IS, why it should exist, or why Perioskoup is first.
- Fix: Add "What is an AI dental companion?" section to Home page:
  - "Not a chatbot. Not a PMS. Not a fitness tracker for teeth. An AI dental companion translates clinical recommendations into personalised daily habits. Perioskoup is the first."

### HIGH (5)

**POS-HIGH-01: Founding story is buried**
The "Building the Bridge" blog post contains an exceptional clinical anecdote (the Tuesday afternoon patient whose disease recurred). It is a non-featured blog post most visitors will never reach.
- File: Blog posts array — `featured: false` for this article
- Fix: Promote to featured. Add condensed version to Home page and For Dentists page.

**POS-HIGH-02: No "why now" narrative**
The timing argument (AI capability + smartphone ubiquity + post-COVID digital health) is completely absent.
- Fix: Add "Why Now?" paragraph to About page mission section and For Dentists page:
  - "Three things changed. AI became capable of personalising recommendations at scale. Smartphones became the primary health interface. Patients began expecting continuous digital support."

**POS-HIGH-03: Problem stated after solution on Home page**
Hero leads with solution ("Between visits, we take over"). The care gap problem isn't established until Dr. Anca quote further down. Visitors need to feel pain before appreciating the remedy.
- File: `Home.tsx` hero section
- Fix: Add problem pre-headline above H1: "Your dentist gives you 45 minutes. The disease has the other 525,555."
  Or add problem-statement section after hero: "The care gap is real. Periodontal disease affects 1 in 2 adults. Most forget instructions within 48 hours."

**POS-HIGH-04: Dr. Anca quote missing from For Dentists page**
The founding quote is the most credible copy for a dentist audience — a fellow clinician articulating shared frustration. It appears on Home but not on the primary dentist conversion page.
- Fix: Add between hero and stats section on ForDentists.tsx.

**POS-HIGH-05: For Dentists page lacks ROI language**
Strategy requires "ROI-focused" messaging. Stats exist but need financial framing.
- Fix: "A 40% reduction in no-shows means 2+ recovered appointments per week. At EUR 150 per appointment, that is over EUR 1,200/month in recovered revenue."

### MEDIUM (4)

**POS-MED-01:** "30+ clinics" figure is underutilised — no geography, names, or qualitative context
- Fix: "30+ founding clinics across Romania, UK, and the EU" (if accurate). Add founding clinic benefits description.

**POS-MED-02:** Patient journey on site is weaker than dentist journey — no patient persona or patient voice on main pages
- Fix: Add hypothetical patient scenario (e.g., "Maria was diagnosed with Stage II periodontitis...").

**POS-MED-03:** Dentist pain point not named in their language
- Fix: Pain-first headline options: "Your treatment works. Their habits don't." or "You can't follow them home. We can."

**POS-MED-04:** "500+ on waitlist" should be more prominent — move above CTA rather than below it

### LOW (4)

**POS-LOW-01:** Features page uses emoji icons while rest of site uses SVG line icons — visual inconsistency
**POS-LOW-02:** Footer tagline says "personal dental companion" — omits "AI"
**POS-LOW-03:** "From Chair to Chat" heading feels casual vs rest of site register
**POS-LOW-04:** Marketing pages could absorb more of blog's authentic, first-person clinical voice

### Strongest vs Weakest

| | Element | Why |
|---|---------|-----|
| **Strongest** | EFP Award integration | 8+ placements, proper context, structured data, external links, ceremony photo. Near-perfect social proof execution. |
| **Runner-up** | Founding story blog post | Vivid clinical anecdote, five-gap framework, authentic voice. Exceptional content — just buried. |
| **Weakest** | For Dentists page | Primary B2B conversion path. No trust signals, no ROI, no authority, no positioning, no story. Reads like a feature list. |
| **Runner-up** | Absence of "why now" | The timing argument that converts skeptics to believers is completely absent. |

---

# Part III: Consolidated Priority Matrix

## All CRITICAL / P0 Findings (16)

| ID | Finding | Report | File(s) |
|----|---------|--------|---------|
| UX-P0-01 | Forms don't submit — all leads lost | UX | Home.tsx, Waitlist.tsx, Contact.tsx |
| UX-P0-02 | EFP Award grid breaks on mobile | UX | Home.tsx:318 |
| UX-P0-03 | Bento feature grid breaks on mobile | UX | Home.tsx:375 |
| UX-P0-04 | How It Works grid breaks on mobile | UX | Home.tsx:417 |
| UX-P0-05 | Team grid breaks on mobile | UX | Home.tsx:481 |
| SEO-CRIT-01 | No SSR/pre-rendering | SEO | vite.config.ts, vercel.json |
| SEO-CRIT-02 | Dr. Anca uses Person not Physician | SEO | index.html:120, About.tsx:42 |
| SEO-CRIT-03 | IndexNow not implemented | SEO | (none — absent) |
| SEO-CRIT-04 | Canonicals broken for non-JS crawlers | SEO | index.html (same cause as CRIT-01) |
| CM-CRIT-01 | For Dentists has zero trust signals | Content | ForDentists.tsx |
| CM-CRIT-02 | For Dentists has no ROI messaging | Content | ForDentists.tsx |
| CM-CRIT-03 | Answer capsules absent from static pages | Content/GEO | Home, Features, ForDentists, About, Pricing |
| SCHEMA-CRIT-01 | ORCID missing from sameAs | Schema | index.html, About.tsx, BlogPost.tsx |
| SCHEMA-CRIT-02 | Google Scholar missing from sameAs | Schema | index.html, About.tsx, BlogPost.tsx |
| POS-CRIT-01 | Zero competitive differentiation | Positioning | ForDentists.tsx |
| POS-CRIT-02 | Category asserted but never defined | Positioning | Home.tsx |

## All HIGH / P1 Findings (27)

| ID | Finding | Report |
|----|---------|--------|
| SEO-HIGH-01 | og:image missing on 9/10 pages | SEO |
| SEO-HIGH-02 | twitter:card missing from all Helmets | SEO |
| SEO-HIGH-03 | twitter:image missing on 9/10 pages | SEO |
| SEO-HIGH-04 | og:image uses relative path | SEO |
| SEO-HIGH-05 | Hreflang only in index.html, not per-page | SEO |
| SEO-HIGH-06 | JSON-LD image URLs are relative | SEO |
| SEO-HIGH-07 | Dr. Anca quote text differs from strategy | SEO |
| SCHEMA-HIGH-01 | All JSON-LD image URLs relative | Schema |
| SCHEMA-HIGH-02 | Organization missing contactPoint | Schema |
| SCHEMA-HIGH-03 | Person missing medicalSpecialty | Schema |
| SCHEMA-HIGH-04 | Person missing EFP memberOf | Schema |
| SCHEMA-HIGH-05 | SearchAction points to non-functional endpoint | Schema |
| CM-HIGH-01 | Features hero value prop vague | Content |
| CM-HIGH-02 | Features page has no trust signals | Content |
| CM-HIGH-03 | Dr. Anca quote is modified (adherence/engagement) | Content |
| CM-HIGH-04 | EFP quote on only 1 page | Content |
| CM-HIGH-05 | No workflow explanation on ForDentists | Content |
| CM-HIGH-06 | Stats sourced to "digital health research" | Content |
| CM-HIGH-07 | No problem-solution framing on ForDentists | Content |
| CM-HIGH-08 | No urgency/scarcity messaging | Content |
| CM-HIGH-09 | No patient testimonials | Content |
| CM-HIGH-10 | "AI dental companion" on only 3/10 pages | Content |
| UX-P1-01 | ForDentists lacks Dr. Anca/EFP authority | UX |
| UX-P1-02 | No "Contact" in primary nav | UX |
| UX-P1-03 | About, Blog, Pricing lack above-fold CTA | UX |
| UX-P1-04 | Inner pages lack trust signals above fold | UX |
| UX-P1-05 | Blog newsletter form non-functional | UX |
| POS-HIGH-01 | Founding story buried in non-featured post | Positioning |
| POS-HIGH-02 | No "why now" narrative | Positioning |
| POS-HIGH-03 | Problem stated after solution | Positioning |
| POS-HIGH-04 | Dr. Anca quote missing from ForDentists | Positioning |
| POS-HIGH-05 | ForDentists lacks ROI language | Positioning |

## All MEDIUM / P2 Findings (23)

| ID | Finding | Report |
|----|---------|--------|
| CM-MED-01 | H1 doesn't contain "dental" | Content |
| CM-MED-02 | Contact page no value reinforcement | Content |
| CM-MED-03 | Pricing page no trust signals | Content |
| CM-MED-04 | No patient/dentist path separator in hero | Content |
| CM-MED-05 | Blog has no waitlist CTA | Content |
| CM-MED-06 | "How It Works" product-centric language | Content |
| CM-MED-07 | "Winner" vs "3rd Prize" inconsistency | Content |
| CM-MED-08 | Footer omits "AI" from tagline | Content |
| SEO-MED-01 | Product vs SoftwareApplication conflict | SEO |
| SEO-MED-02 | Missing AI crawlers in robots.txt | SEO |
| SEO-MED-03 | Sitemap is static | SEO |
| SEO-MED-05 | Features H3 before H2 | SEO |
| SEO-MED-07 | NotFound missing Helmet/noindex | SEO |
| SCHEMA-MED-01 | FAQPage missing on Contact | Schema |
| SCHEMA-MED-02 | FAQPage missing on Waitlist | Schema |
| SCHEMA-MED-03 | BreadcrumbList last item missing URL | Schema |
| SCHEMA-MED-04 | Product/SoftwareApplication conflict | Schema |
| GEO-MED-01 | Static pages lack answer capsules | GEO |
| GEO-MED-02 | Vague stat citations | GEO |
| GEO-MED-03 | HTTP headers incomplete | GEO |
| POS-MED-01 | "30+ clinics" underutilised | Positioning |
| POS-MED-02 | No patient persona/voice | Positioning |
| POS-MED-03 | Dentist pain not named in their language | Positioning |
| UX-P2-01 through UX-P2-09 | (9 moderate UX friction items) | UX |

---

# Part IV: Action Items Requiring Team Input

These cannot be done by engineering alone:

| # | Action | Owner | Why |
|---|--------|-------|-----|
| 1 | Provide Dr. Anca's ORCID iD URL | Dr. Anca | Required for Person schema sameAs |
| 2 | Provide Dr. Anca's Google Scholar URL | Dr. Anca | Required for Person schema sameAs |
| 3 | Decide "adherence" vs "engagement" in quote | Founders | Regulatory rules conflict with strategy |
| 4 | Collect 2-3 founding clinic testimonials | Business | Needed for ForDentists social proof |
| 5 | Choose form backend (Formspree/Vercel/Mailchimp) | Engineering + Business | Forms currently discard all data |
| 6 | Confirm "30+ clinics" geography claim | Business | "across Romania, UK, and EU" — is this accurate? |
| 7 | Provide specific stat sources | Dr. Anca / Research | "Digital health research" needs real citations |
| 8 | Decide if blog search should be implemented | Product | SearchAction schema points to non-functional endpoint |
| 9 | Generate IndexNow API key | Engineering | indexnow.org registration needed |

---

# Part V: Sprint Plan

## Day 1 — P0 Blockers

| Task | Files | Est. |
|------|-------|------|
| Connect forms to backend (Formspree/serverless) | Home.tsx, Waitlist.tsx, Contact.tsx, Blog.tsx | 2-3h |
| Fix 4 mobile grid breakages | Home.tsx:318,375,417,481 | 1h |
| Default waitlist role to "patient" | Waitlist.tsx:34 | 1 min |
| Hide SVG wave on mobile | Home.tsx:413 | 2 min |

## Day 2 — Technical SEO

| Task | Files | Est. |
|------|-------|------|
| Install vite-plugin-prerender for all routes | vite.config.ts, package.json | 2h |
| Add og:image + twitter:card + twitter:image (absolute URLs) to all Helmets | All pages in pages/ | 30 min |
| Make all JSON-LD image URLs absolute | index.html, About.tsx, BlogPost.tsx, Contact.tsx | 15 min |
| Add Contact + Pricing to NAV_LINKS | Navbar.tsx:12-17 | 5 min |
| Add noindex Helmet to 404 | NotFound.tsx | 5 min |
| Add hreflang per-page in Helmets | All pages in pages/ | 20 min |

## Day 3 — Schema & AI Signals

| Task | Files | Est. |
|------|-------|------|
| Dr. Anca: add Physician type + medicalSpecialty + memberOf EFP | index.html, About.tsx | 15 min |
| Organization: add contactPoint | index.html | 10 min |
| Expand X-Llms-Txt to all routes | vercel.json | 5 min |
| Add X-Robots-Tag: all | vercel.json | 5 min |
| Update robots.txt (GoogleOther, CCBot, Applebot-Extended) | public/robots.txt | 5 min |
| Fix BreadcrumbList last item URL | Breadcrumb.tsx + all usages | 15 min |
| Remove or fix SearchAction | index.html | 10 min |
| Align Contact.tsx sameAs with global | Contact.tsx:79-82 | 5 min |
| Resolve Product vs SoftwareApplication on Pricing | Pricing.tsx:68-78 | 10 min |
| Add FAQPage to Contact + Waitlist | Contact.tsx, Waitlist.tsx | 20 min |

## Day 4 — For Dentists Page Overhaul

| Task | Files | Est. |
|------|-------|------|
| Add EFP badge + "30+ clinics" trust bar | ForDentists.tsx hero | 30 min |
| Add Dr. Anca quote + credentials section | ForDentists.tsx | 30 min |
| Add problem-first narrative (48h forgetting curve) | ForDentists.tsx | 30 min |
| Add ROI section with revenue framing | ForDentists.tsx | 30 min |
| Add competitive positioning block | ForDentists.tsx | 30 min |
| Add "Why Now" section | ForDentists.tsx | 20 min |
| Promote "Building the Bridge" blog to featured | Blog data/BlogPost.tsx | 5 min |

## Day 5 — Content & GEO

| Task | Files | Est. |
|------|-------|------|
| Add answer capsules to all static page H2s | Home, Features, ForDentists, About, Pricing | 1.5h |
| Add "AI dental companion" to all page body + meta | All pages, Footer.tsx | 30 min |
| Add category definition section to Home page | Home.tsx | 30 min |
| Add Dr. Anca quote to About page | About.tsx | 15 min |
| Replace vague stat citations | Home.tsx, ForDentists.tsx, About.tsx | 30 min |
| Add CTA to About, Blog, Pricing heroes | About.tsx, Blog.tsx, Pricing.tsx | 20 min |
| Add urgency messaging (launch date, limited spots) | ForDentists.tsx, Waitlist.tsx | 15 min |

---

# Part VI: Files Most Frequently Referenced

| File | Times Referenced | Key Issues |
|------|-----------------|------------|
| `client/src/pages/ForDentists.tsx` | 22 | Trust, ROI, positioning, authority, capsules, quote |
| `client/src/pages/Home.tsx` | 18 | Mobile grids, capsules, hero structure, category, quote |
| `client/index.html` | 14 | Schema, image URLs, pre-rendering, hreflang |
| `client/src/components/Navbar.tsx` | 8 | Missing nav links, mobile CTA hidden |
| `client/src/pages/About.tsx` | 7 | Schema, quote, capsules, CTA |
| `client/src/pages/Features.tsx` | 7 | Hero, trust signals, capsules, heading hierarchy |
| `client/src/pages/Pricing.tsx` | 6 | Trust, CTA, Product/SoftwareApplication conflict |
| `client/src/pages/Waitlist.tsx` | 5 | Default role, form backend, FAQPage |
| `client/src/pages/Contact.tsx` | 5 | Form backend, sameAs, FAQPage, value prop |
| `client/src/pages/Blog.tsx` | 5 | Newsletter form, waitlist CTA, lazy loading |
| `client/src/pages/BlogPost.tsx` | 4 | Schema, image URLs (mostly passing) |
| `client/src/components/Footer.tsx` | 4 | Tagline, CTA, social links |
| `vercel.json` | 3 | Headers, rewrites, pre-rendering |
| `client/src/components/Breadcrumb.tsx` | 2 | Last item URL |
| `client/src/pages/NotFound.tsx` | 2 | Helmet, noindex |
| `client/public/robots.txt` | 2 | Missing crawlers |

---

*Full audit breakdown generated 2026-03-06. 80 findings across 6 dimensions. All file paths relative to project root `/Users/moziplaybook/Projects/official-perioskoup/`.*
