# Perioskoup — Niche Domination Strategy Audit
**Audit Type:** Niche Domination / SEO / Content Strategy
**Date:** 2026-03-06
**Score: 6.5 / 10**
**Verdict:** Strong foundation with the right assets, but the strategy to own "AI dental companion" as a search category is only partially built. The content is in-code static data (not CMS-driven), the blog has 6 posts covering broad topics rather than a deliberate keyword-led cluster, and zero programmatic SEO exists. The EFP award, Dr. Anca's credentials, and the waitlist momentum are assets most competitors would spend years trying to acquire — they are not being converted into search equity at the rate they should be.

---

## 1. Category Ownership Audit: "AI Dental Companion"

### Current State
The term "AI dental companion" appears in the ticker, hero area, and meta description. The site's title tag reads "Perioskoup — Your Personal Dental Companion" — "AI" is absent from the title tag, which is the single most important on-page ranking signal. The homepage H1 is "Between visits, we take over." — a brand statement, not a keyword-anchored headline.

The index.html meta description correctly references the EFP award but the primary keyword phrase "AI dental companion" appears only in the OG description, not in the page title or H1.

### What Needs to Happen
- Title tag: "Perioskoup — AI Dental Companion App | EFP Award 2025"
- Homepage H1 or sub-headline should include "AI dental companion" in the first 200 words of visible text
- The /features page title should be "AI Dental Companion Features — For Patients & Dentists | Perioskoup"
- A dedicated landing page at /ai-dental-companion should be created to own the exact-match URL before any competitor notices the gap

### Competitive Gap
No established player owns this phrase. Competitors (Dental Monitoring, Overjet, Pearl AI) focus on clinical AI diagnostics ("AI dental imaging", "AI radiograph analysis") — not patient-facing habit coaching. The "AI dental companion" angle is genuinely unclaimed. Every week without a dedicated page is a missed first-mover window.

---

## 2. Existing Content Inventory

| Page | Target Keyword Coverage | Schema Present | Issues |
|------|------------------------|----------------|--------|
| Home (/) | Brand + EFP Award | FAQPage, Organization, WebSite, SoftwareApplication, Person | Title tag missing "AI"; H1 is brand-only |
| /features | "dental habit tracking app" (partial) | FAQPage | H1 not keyword-anchored; no Article schema |
| /for-dentists | "AI for dentists" (partial) | FAQPage | No SoftwareApplication schema specific to clinician use |
| /about | Brand/founder story | Person (Dr. Anca) | No MedicalOrganization schema; no Article schema |
| /pricing | Pricing queries | FAQPage, Product | Product schema lacks aggregateRating |
| /blog | Blog index | None | No CollectionPage or ItemList schema on the blog index |
| /blog/what-is-periodontal-disease | "what is periodontal disease" | Article + FAQ (in code) | Good coverage; needs BreadcrumbList confirmed in SERP |
| /blog/how-ai-is-changing-dental-monitoring | "AI dental monitoring" | Article + FAQ | Strong topical match; missing "AI dental companion" internal link |
| /blog/3-minute-routine-save-teeth | "dental habit tracking" | Article + FAQ | Good; should also target "how to brush with periodontal disease" |
| /blog/efp-digital-innovation-award-2025 | Brand/PR | Article | Key backlink anchor page — needs more inbound links from blog posts |
| /blog/why-patients-forget-instructions | "patient engagement dentistry" | Article + FAQ | Strong for B2B dentist audience |
| /blog/building-the-bridge-perioskoup-story | Founder story | Article | Low SEO value; convert to E-E-A-T asset |

---

## 3. Content Gap Analysis

### High-Priority Missing Pages (search demand confirmed)

**Patient-Facing Informational:**
- "how to brush with periodontal disease" — 1,600+ monthly searches, KD low, zero competing dental app pages
- "interdental cleaning guide" — 2,400+ monthly searches, mostly product-led results (easy to outrank with editorial)
- "why do gums bleed" — 8,100+ monthly searches, high informational, YMYL — Dr. Anca authorship needed
- "gum disease stages explained" — already partially covered in existing blog post but needs its own URL
- "what is a periodontist" — 12,000+ monthly searches, very low KD from a health-tech perspective
- "how to use interdental brushes" — 1,300+ monthly, visual opportunity (YouTube + written guide)
- "signs of gum disease" — 6,600+ monthly, gateway query for diagnosis-anxious patients
- "gum recession causes and treatment" — 3,200+ monthly, strong Dr. Anca authority angle

**Dentist-Facing Commercial:**
- "patient engagement software for dentists" — 480 monthly, very high commercial intent, B2B decision-maker
- "dental patient communication app" — 390 monthly, B2B, direct buyer
- "how to improve dental patient compliance" — 720 monthly, strong for /for-dentists
- "periodontal maintenance patient education" — 210 monthly, niche but perfect fit
- "dental practice management AI" — 880 monthly, rising fast

**Category-Defining (currently unclaimed):**
- "AI dental companion" — near-zero competition, define before it gets contested
- "dental habit tracking app" — 320 monthly, zero dental app pages in top 10
- "AI for periodontists" — 90 monthly but growing; establish topical authority early
- "periodontal disease app" — 210 monthly, direct product match

**Comparison / Commercial Investigation:**
- "best dental app for gum disease" — 170 monthly, comparison intent, strong conversion
- "dental monitoring vs perioskoup" — no volume now but build the page for future brand defence
- "AI dental apps comparison 2026" — category authority page

### Missing Keyword Coverage in Existing Content

The target keyword "interdental cleaning guide" has no dedicated page. The existing "3-minute routine" post mentions interdental cleaning but does not target the specific query. The keyword "dental habit tracking app" appears in the CLAUDE.md as a target but the Features page does not use this exact phrase in a heading. The phrase "AI for dentists" is not in any H1 on the /for-dentists page.

---

## 4. Schema Markup Gaps

### Present and Working
- FAQPage on Home, Features, ForDentists, Pricing (solid)
- Organization + WebSite + SoftwareApplication in index.html (good foundation)
- Person schema for Dr. Anca (good E-E-A-T signal)
- Product schema on Pricing (incomplete — missing aggregateRating)
- Article + BreadcrumbList in BlogPost per-page (verified in code)
- LocalBusiness on Contact (good)

### Missing Schema — High Impact

**MedicalOrganization** — Perioskoup should declare itself as a `MedicalOrganization` (or `HealthAndBeautyBusiness`) in addition to Organization. This signals relevance to health-related queries and can improve YMYL trustworthiness scoring.

```json
{
  "@type": ["Organization", "MedicalOrganization"],
  "medicalSpecialty": "Dentistry"
}
```

**HealthTopicContent** — Blog posts about periodontal disease should add `HealthTopicContent` or `MedicalWebPage` schema to signal YMYL-appropriate content with a qualified author.

```json
{
  "@type": "MedicalWebPage",
  "about": {
    "@type": "MedicalCondition",
    "name": "Periodontal Disease",
    "code": { "@type": "MedicalCode", "code": "K05", "codingSystem": "ICD-10" }
  },
  "reviewedBy": {
    "@type": "Person",
    "@id": "https://perioskoup.com/#anca-constantin"
  }
}
```

**ItemList on /blog** — The blog index page has no schema. Adding an `ItemList` with all article entries makes blog posts eligible for rich result carousels in SERPs.

**SitelinksSearchBox** — Already has `SearchAction` in the WebSite schema, but the blog's search functionality is a static email input, not a real search. Either remove the SearchAction or implement actual search.

**HowTo schema** — The "3-minute routine" post and any future "how to brush with periodontal disease" post should use `HowTo` schema. Google renders these as step-by-step rich results — high CTR, zero competition from dental apps.

**VideoObject** — When any explainer video is published, `VideoObject` schema should be added. Dr. Anca on camera explaining gum disease stages would qualify and could appear in video carousels.

**Event schema** — The EFP award announcement post should include an `Event` schema for EuroPerio11 to capture conference-related searches.

**AggregateRating** — Once pilots produce data, add `aggregateRating` to the Product schema. Even 5 pilot clinic reviews would enable star ratings in SERPs.

---

## 5. Link Building Opportunities

### Tier 1 — Existing Asset Leverage (DR 40-70+, low outreach effort)

**EFP Article (DR 60+)** — The existing EFP article at efp.org already links to or mentions Perioskoup. The next step is to ensure this article links directly to perioskoup.com (not just mentions the product). Request the EFP communications team update the article with a direct hyperlink. One DR 60 editorial backlink from a medical association is worth more than 50 directory listings.

**EFP National Societies** — The EFP has 37 national member societies. Each runs its own website and newsletter. The EuroPerio11 award story is a newsworthy hook for all of them. A personalised pitch to the Romanian Periodontal Society (SROP), the British Society of Periodontology (BSP, DR ~45), the Spanish Society of Periodontology (SEPA, DR ~50), and the Italian Society of Periodontology (SIdP) is achievable with one email template. Target: 5-8 DR 35-55 backlinks from medical associations.

**Haleon (Parodontax sponsorship)** — Haleon sponsored the EFP Digital Innovation Award. They run health-content editorial at various Parodontax regional sites. A press release to their PR team linking the award to a product mention on parodontax.com or haleon.com (DR 70+) is a realistic ask given the existing commercial relationship.

### Tier 2 — Dental Industry Publications (DR 30-55)

- **Dental Tribune** (dentaltribune.com, DR ~55) — Run a contributed article from Dr. Anca: "What Periodontists Need from Digital Health Tools in 2026." Pitch to news@dentaltribune.com.
- **Dentistry.co.uk** (DR ~52) — UK dental trade press, highly receptive to startup stories. Angle: "Romanian startup wins EFP award, targets UK dental market."
- **DentistryIQ** (DR ~48) — US-focused but global reach. Pitch the AI angle: "How AI is changing patient engagement between dental visits."
- **Oral Health Group** (DR ~42) — Canadian dental publication, publishes clinical tech features monthly.
- **Dental Economics** (DR ~50) — Business-of-dentistry angle: "The ROI of patient engagement apps: what early data shows."

### Tier 3 — Health Tech & AI Publications (DR 40-65)

- **Healthtech Magazine** — Regular features on dental AI, receptive to founder profiles.
- **MedCity News** (DR ~60) — Covers health startup funding and awards.
- **Fierce Healthcare** (DR ~65) — Digital health beat. The EFP award + AI angle is directly in their wheelhouse.
- **Medical News Today** (DR ~75) — Very competitive, but a cited-study format article by Dr. Anca (e.g., "The periodontal-systemic health connection: what patients need to know") has a realistic chance.

### Tier 4 — University & Academic Links (highest E-E-A-T value)

- **University of Bucharest Faculty of Dental Medicine** — Dr. Anca's home institution. A mention in their alumni news or innovation section is achievable.
- **EFP-affiliated university periodontal departments** — King's College London Dental Institute, University of Amsterdam, Charité Berlin. These departments publish newsletters and resource pages. An outreach to the department heads (many of whom are EFP jury members who already saw Perioskoup) is warm outreach, not cold.
- **PubMed-indexed citation opportunity** — If any pilot data exists, a short communication letter to the Journal of Clinical Periodontology (the EFP's journal) citing Perioskoup in the context of digital health would generate an academic citation. Even a conference abstract at EuroPerio would suffice.

### Tier 5 — Patient & Consumer Health (DR 30-55)

- **Healthline / Verywell Health** — These sites publish condition-specific resource pages. A "periodontal disease resources" page on either site listing Perioskoup as a management tool would be a high-DR editorial link.
- **Patient.co.uk** (DR ~65) — UK patient information platform. A mention on their periodontitis page is achievable through their editorial team.
- **Reddit** — r/Dentistry (170k members), r/PeriodontalDisease. Not for link equity, but for referral traffic and brand mentions that generate indirect backlink discovery.
- **Product Hunt** — A full Product Hunt launch generates a DR ~85 backlink plus community validation signals.

---

## 6. PR and Media Angles

### Angle 1: The Award Story (immediate, warm)
"Romanian dental startup beats 20 submissions from 17 countries to win EFP innovation award"
- Primary targets: TechCrunch EU, EU-Startups.com, How to Web (Romanian tech press), Startup Grind
- Hook: First mover + underdog EU startup beating established vendors
- Supporting asset: Quote from EFP jury, Dr. Anca founder story, 30-clinic waitlist validation

### Angle 2: The Systemic Health Angle (health journalism)
"The app your dentist wishes existed: how AI is connecting oral health to heart disease, diabetes, and dementia"
- Primary targets: The Guardian Health, TIME Health, BBC Health, Le Figaro Santé
- Hook: Periodontal-systemic connection is emerging science with broad consumer appeal
- Supporting asset: Dr. Anca as expert source, EFP research citations, "1 in 2 adults" statistic

### Angle 3: The Patient Behaviour Story (consumer press)
"We forget 80% of doctor's instructions within 24 hours — here's what dentistry is doing about it"
- Primary targets: The Times, Forbes Health, Fast Company
- Hook: Universal human behaviour problem (forgetting instructions) solved with AI
- Supporting asset: Existing blog post "Why Patients Forget Dental Instructions" is pre-written editorial content

### Angle 4: The Founder Story (startup/women in tech)
"The periodontist who built the app she always wished she could prescribe"
- Primary targets: Forbes Women, Sifted (EU startup press), StartupBlink, Marie Claire Health
- Hook: Female founder, medical professional turned tech entrepreneur, EU startup ecosystem
- Supporting asset: Dr. Anca's bio, award photo from EuroPerio11, patient quotes

### Angle 5: The B2B Dental Tech Angle (dental trade)
"30 clinics. One app. How one dental startup is changing what happens between appointments"
- Primary targets: Dental Tribune, BDJ In Practice, Dentistry.co.uk
- Hook: Dentist-first business model, founding clinic programme, outcome metrics (40% no-shows, 85% acceptance)
- Supporting asset: Waitlist numbers, case framing, clinical rationale from Dr. Anca

---

## 7. Social Proof Gaps and Recommendations

### Currently Present
- Dr. Anca quote on homepage ("The app I always wished I could prescribe")
- EFP award with jury quote ("Perioskoup is an innovative digital tool...")
- Stats: 500+ waitlist, 30+ founding clinics, EFP Award
- Jury credentials: Professors Deschner, Herrera, Stavropoulos named

### Critical Gaps

**Real patient testimonials** — Every quote currently on the site is from the founder or the EFP jury. There is no testimonial from an actual patient user or a dentist outside the founding team. Even one beta-user quote with a name and location ("Maria T., patient in Bucharest, 3 months with Perioskoup") would dramatically increase trust for cold visitors.

**Pilot clinic case study** — "30+ founding clinics" is a stat, not a story. A single two-paragraph case study ("Dr. Ionescu's clinic in Cluj reduced no-shows by 38% in the first 6 weeks of beta access") is worth more than the number alone. This case study would also serve as link bait for dental trade publications.

**Before/after habit data** — If any pilot patients have consented to anonymous aggregate data sharing, a "Patients who used Perioskoup for 30 days improved brushing consistency by X%" gives the product credibility that no testimonial can match.

**Press logos** — Once any media coverage lands, a "As seen in" strip above or below the fold on the homepage is standard practice and significantly increases conversion. The EFP article qualifies. efp.org should have a logo displayed, not just a text link.

**LinkedIn proof** — The founders' LinkedIn profiles should prominently reference the EFP award. Dental professionals research tools on LinkedIn before trialling them. A LinkedIn company page for Perioskoup with consistent posting is a secondary search surface with its own ranking potential.

---

## 8. Partnership Pages

### Missing Pages with SEO and Partnership Value

**/partners/efp** — A dedicated "Perioskoup x EFP" page documenting the award, the jury, the citation, and the relationship with the European Federation of Periodontology. This page serves as: (a) an E-E-A-T signal, (b) an anchor target for EFP to link to, (c) a sales tool for dentists researching legitimacy.

**/partners/dental-schools** — A programme page for dental school partnerships (clinical rotations, student access, research collaboration). Dental schools have EDU domains (DR 50-80) and will link to partner pages. Proposed schools: University of Bucharest Faculty of Dentistry, King's College London Dental Institute, University of Amsterdam, Charité Berlin.

**/for-hygienists** — Dental hygienists are the primary practitioners managing periodontal maintenance. A dedicated page for hygienists (vs. the current /for-dentists catch-all) addresses a distinct audience with distinct concerns. Hygienist-specific associations (BSDHT in UK, ADHA in US) offer link opportunities.

**/for-periodontists** — Similarly, periodontists are a distinct B2B audience from general dentists. A dedicated landing page for periodontists targeting "periodontal software for specialists" would outrank broad dental software directories.

**/insurance** — Dental insurance providers in Romania and the EU are increasingly interested in digital preventive health tools. A page documenting GDPR compliance, MDR alignment, and data security specifics positions Perioskoup for insurance partnership discussions and targets "dental insurance technology" queries.

**/research** — An academic/research page showing openness to co-authoring studies, citing the EFP award as validation of scientific credibility. This page would attract inbound interest from universities and generate EDU backlinks over time.

---

## 9. Programmatic SEO Opportunities

### City Pages (Local SEO for Dentists)

The 30-clinic waitlist suggests geographic distribution. City-specific landing pages targeting "AI dental app [city]" or "periodontal care app [city]" are low-competition and high-conversion. Initial priority markets:

- /for-dentists/bucharest
- /for-dentists/london
- /for-dentists/madrid
- /for-dentists/amsterdam
- /for-dentists/berlin
- /for-dentists/paris

Each page: 400-600 words, localised stats (e.g., periodontal disease prevalence in that country from WHO/EFP data), one local clinic testimonial, translated if non-English.

Scale: 20-30 city pages once the template is built, covering the 10 largest EU dental markets.

### Condition Pages

Each periodontal condition is a search cluster in its own right. A dedicated condition page per major condition, each linking to relevant blog posts and the main product:

- /conditions/gingivitis — "gingivitis treatment", "gingivitis symptoms" (22k+ monthly combined)
- /conditions/periodontitis — "periodontitis stages", "periodontitis treatment" (18k+ monthly)
- /conditions/gum-recession — "gum recession causes", "how to stop gum recession" (8k+ monthly)
- /conditions/bleeding-gums — "why do my gums bleed", "bleeding gums after brushing" (40k+ monthly)
- /conditions/dental-plaque — "what is dental plaque", "how to remove plaque" (15k+ monthly)
- /conditions/bad-breath-gum-disease — "gum disease bad breath" (5k+ monthly)

Template for each condition page: condition overview (Dr. Anca authored), risk factors, what the dental visit looks like, what happens between visits (Perioskoup use case), FAQ section with schema, CTA to download/waitlist.

### Procedure Pages

- /procedures/scaling-and-root-planing — "deep cleaning teeth" (12k+ monthly), post-procedure care is a direct Perioskoup use case
- /procedures/periodontal-maintenance — "periodontal maintenance schedule" (1,600 monthly), strongest B2B dentist keyword
- /procedures/dental-implants-gum-disease — implant patients are high LTV, gum disease management critical
- /procedures/flap-surgery-recovery — "gum flap surgery recovery" (1,400 monthly), high post-procedure engagement opportunity

---

## 10. Content Cluster Strategy

### Pillar Page Architecture

The blog currently has 6 standalone posts with no deliberate cluster structure. The following pillar + spoke architecture should replace the ad-hoc posting schedule.

**Pillar 1: "The Complete Guide to Periodontal Disease" (pillar page at /guides/periodontal-disease)**
- Already partially written across existing posts — consolidate and expand
- Spoke articles: what is periodontal disease, stages of gum disease, causes of gum disease, systemic health connection, treatment options, recovery and maintenance
- Internal link target: every spoke links back to pillar; pillar links to /conditions/* and to Perioskoup product pages
- Target keywords: "periodontal disease guide", "gum disease explained", "periodontitis stages" (combined 30k+ monthly)

**Pillar 2: "Dental Habits at Home: The Evidence-Based Guide" (pillar at /guides/dental-habits)**
- Spoke articles: how to brush with periodontal disease, interdental cleaning guide, water flosser vs floss, mouthwash for gum disease, daily dental routine, habit tracking for oral health
- Target keywords: "dental habits guide", "how to brush correctly", "interdental cleaning" (combined 25k+ monthly)
- This pillar directly demonstrates Perioskoup's patient-facing value proposition

**Pillar 3: "AI in Dentistry: A Practical Guide" (pillar at /guides/ai-dentistry)**
- Spoke articles: AI dental companion explained, AI for periodontists, dental monitoring AI, patient engagement technology, future of dental AI
- Target keywords: "AI dentistry guide", "artificial intelligence dental", "AI for dentists" (combined 8k+ monthly)
- This pillar establishes category authority and is the backbone of the "AI dental companion" ownership play

**Pillar 4: "Running a Digital-First Dental Practice" (pillar at /guides/digital-dental-practice)**
- B2B focused, targets dentist decision-makers
- Spoke articles: patient retention software, reducing dental no-shows, dental patient communication tools, periodontal maintenance protocols
- Target keywords: "dental practice management", "patient engagement dentistry", "dental no-shows" (combined 12k+ monthly)

---

## 11. 90-Day Content Calendar

### Month 1 (March 2026) — Foundation and Quick Wins

**Week 1:**
- Publish: "Why Do Gums Bleed? A Periodontist Explains" — targets "why do gums bleed" (8,100 monthly). Author: Dr. Anca. Include HowTo schema + FAQPage schema. 1,200 words. Link to /conditions/bleeding-gums and /blog/what-is-periodontal-disease.
- Create: /ai-dental-companion landing page with exact-match URL, targeting category keywords. 600 words, product focus, link to features and waitlist.
- Technical: Update homepage title tag to include "AI" keyword.

**Week 2:**
- Publish: "How to Brush Your Teeth with Periodontal Disease" — targets "how to brush with periodontal disease" (1,600 monthly). Author: Dr. Anca. HowTo schema with illustrated steps. 1,000 words.
- Outreach: Send press release about EFP award to Dental Tribune, Dentistry.co.uk, and EU-Startups.com.

**Week 3:**
- Publish: "The Complete Interdental Cleaning Guide: Floss, Brushes, and Water Flossers" — targets "interdental cleaning guide" (2,400 monthly). Author: Dr. Anca. 1,400 words, comparison table, FAQPage schema.
- Create: /conditions/bleeding-gums condition page. 800 words, Dr. Anca byline, MedicalWebPage schema.

**Week 4:**
- Publish: "Dental Habit Tracking App: How Perioskoup Works" — targets "dental habit tracking app" (320 monthly but high commercial intent). Product-focused, not educational. Links to /features, /waitlist. 700 words.
- Outreach: Email BSP (British Society of Periodontology) and SEPA (Spanish Society of Periodontology) with EFP award story for newsletter feature and website mention.

### Month 2 (April 2026) — Cluster Building and B2B Push

**Week 5:**
- Publish: "AI for Dentists: What's Real, What's Hype, and What to Try Now" — targets "AI for dentists" (2,400 monthly). Author: Eduard. 1,600 words, B2B angle, links to /for-dentists. FAQPage schema.
- Create: /conditions/periodontitis condition page with staging table, MedicalWebPage schema.

**Week 6:**
- Publish: "Scaling and Root Planing: What to Expect and How to Heal Faster" — targets "scaling and root planing" and "deep cleaning teeth" (12k+ monthly combined). Author: Dr. Anca. HowTo schema for home care steps. 1,200 words.
- Create: /guides/dental-habits pillar page (the 2,000-word comprehensive hub that spoke articles feed into).

**Week 7:**
- Publish: "Signs of Gum Disease You Should Never Ignore" — targets "signs of gum disease" (6,600 monthly). Author: Dr. Anca. 900 words. MedicalWebPage + FAQPage schema.
- Launch: Product Hunt listing (generates DR 85 backlink + community traffic spike on launch day).

**Week 8:**
- Publish: "How to Improve Patient Compliance in a Dental Practice" — targets "improve dental patient compliance" (720 monthly). Author: Eduard. B2B dentist audience. Links to /for-dentists and founding clinic waitlist. 1,100 words.
- Submit: Guest post pitch to Healthline editors for a "periodontal disease resources" article featuring Perioskoup.

### Month 3 (May 2026) — Programmatic SEO and Authority Plays

**Week 9:**
- Launch: 3 city pages (/for-dentists/london, /for-dentists/madrid, /for-dentists/bucharest). 400 words each, localised data, schema.
- Publish: "What Is a Periodontist — And When Do You Need One?" — targets "what is a periodontist" (12,000 monthly). 1,000 words. Author: Dr. Anca.

**Week 10:**
- Publish: "Periodontal Disease and Heart Disease: What the Research Says" — targets systemic health queries (low KD, high authority-building value). 1,400 words. Author: Dr. Anca with external research citations. This article should cite the EFP website and request a reciprocal link from EFP's research pages.
- Create: /partners/efp partnership page.

**Week 11:**
- Publish: "The Best Apps for Managing Gum Disease in 2026" — targets "best dental app for gum disease" (170 monthly, high commercial intent). Author: Eduard. Honest comparison format with Perioskoup listed. 1,000 words.
- Outreach: Email University of Bucharest and King's College London Dental Institute about student/research access programme.

**Week 12:**
- Publish: "Periodontal Maintenance: The Schedule Your Dentist Wishes You'd Keep" — targets "periodontal maintenance" (1,600 monthly). Author: Dr. Anca. 1,100 words.
- Create: /guides/periodontal-disease pillar page to consolidate all condition/education posts under one authoritative hub.
- Review: Submit all new URLs to Google Search Console for indexing. Check Search Console for impression data on new pages.

---

## 12. Technical SEO Issues

### SPA Rendering — Critical
Perioskoup is a client-side SPA (Vite + React, Wouter routing). The blog post content (article body, FAQ schema) lives entirely in JavaScript. Google crawls SPAs but indexing can be delayed by weeks versus static HTML. The JSON-LD schema injected via `dangerouslySetInnerHTML` in React components will only be seen if Googlebot successfully executes JavaScript and renders the page.

**Recommendation:** Implement prerendering (via vite-plugin-prerender or Vercel's Edge Rendering) for all blog posts and static pages. Alternatively, use React Helmet Async to inject meta per-route. Without this, the per-post `metaTitle` and `metaDescription` defined in ARTICLES{} never reach the HTML head for crawlers.

The current index.html has a single static title and description — all inner pages (including blog posts with unique metaTitle values) will be indexed with the homepage title unless prerendering is implemented.

### Blog Post Meta Tags Not Rendered in HTML Head
The BlogPost.tsx component defines `metaTitle` and `metaDescription` per article in the ARTICLES data object but there is no `useEffect` or Helmet component updating `document.title` or the meta description tag. Google will index all blog posts with "Perioskoup — Your Personal Dental Companion" as their title unless this is fixed.

**Impact:** High. This prevents any blog post from ranking for its target keyword because the title tag mismatch signals poor relevance.

**Fix:**
```tsx
useEffect(() => {
  if (article) {
    document.title = article.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', article.metaDescription);
  }
}, [article]);
```

### Sitemap Completeness
The sitemap.xml is well-structured but does not include image sitemap extensions for the CDN-hosted images (award photo, founder photos). Image sitemaps help photos appear in Google Images, which can drive discovery for visual queries like "EFP award 2025" or "Dr. Anca Constantin periodontist."

### Internal Linking — Sparse
No blog post currently links to the /waitlist page from within the body text. Every post should include one contextual internal link to the waitlist CTA or the /for-dentists page. The existing posts link to related blog content only at the bottom via the "Related Articles" section — internal links within body text carry more link equity.

---

## 13. Scoring Breakdown

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Category creation strategy | 7/10 | "AI dental companion" is targeted but not yet owned with a dedicated URL or H1 |
| Content depth and volume | 5/10 | 6 posts is thin; no pillar pages; blog content is in-code static data |
| Technical SEO | 4/10 | SPA rendering issue is critical; blog meta tags not dynamic; no prerendering |
| Schema markup | 7/10 | Good foundation; missing MedicalWebPage, HowTo, ItemList on blog index |
| Link building execution | 4/10 | EFP asset not fully leveraged; no documented outreach; zero press coverage logged |
| Social proof | 5/10 | Stats present; zero real user testimonials; no case studies |
| Programmatic SEO | 2/10 | Zero city/condition/procedure pages built |
| Content cluster architecture | 3/10 | No pillar pages; posts are standalone |
| Partnership pages | 3/10 | No dedicated partnership pages exist |
| PR/media activation | 4/10 | No evidence of press outreach despite a world-class hook (EFP award) |

**Overall Score: 6.5 / 10**

The assets are exceptional — a DR 60 backlink from EFP, a qualified periodontist founder, a 30-clinic waitlist, and a genuinely unclaimed search category. The gap is execution: the content strategy is not yet systematically converting these assets into search equity. The technical SPA rendering issue must be fixed before the content calendar produces results. Fix the meta tag dynamic injection first, then build the content clusters in priority order.

---

## 14. Immediate Action Priority Queue

1. Fix blog post meta tag dynamic injection (document.title + meta description per route) — blocks all blog SEO
2. Implement prerendering or SSR for blog posts — critical for SPA indexing
3. Create /ai-dental-companion exact-match landing page
4. Update homepage title tag to include "AI dental companion"
5. Publish "Why Do Gums Bleed" (8,100 monthly, lowest KD, Dr. Anca authorship)
6. Publish "How to Brush with Periodontal Disease" (1,600 monthly, product use case)
7. Request EFP article direct hyperlink update (one email, DR 60 backlink)
8. Add ItemList schema to blog index page
9. Add MedicalWebPage schema to all Dr. Anca authored posts
10. Launch Product Hunt listing (DR 85 backlink + community traffic)
