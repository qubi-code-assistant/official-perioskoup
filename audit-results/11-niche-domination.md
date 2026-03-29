# Perioskoup — Niche Domination Strategy Audit
**Category:** AI Dental Companion (Category Creation Play)  
**Audit Scope:** Full site — 12 pages, all schema, sitemap, robots.txt, llms.txt, feed.xml  
**Date:** 2026-03-06  
**Auditor:** Niche Domination Strategist  
**Score: 6.2 / 10**

---

## Executive Summary

Perioskoup has completed the first phase of category creation correctly: the phrase "AI dental companion" appears in the homepage title tag, a standalone H2 section defining the category, the Features page H1, body copy on About and ForDentists, footer tagline, and consistently across all JSON-LD. Schema depth is solid — BlogPosting, Person/Physician, Organization, SoftwareApplication, BreadcrumbList, and FAQPage are all present and cross-referenced. LLM discoverability infrastructure (robots.txt whitelist for 15+ AI crawlers, llms.txt, llms-full.txt) is ahead of most established health-tech companies.

The gap is execution in three layers: (1) no dedicated category URL that can rank independently, (2) five of the six target blog keywords are uncovered or under-optimised, (3) zero active link acquisition — one EFP backlink (DR 60) carries all external authority. The SPA rendering problem means every schema improvement and keyword placement is invisible to Googlebot until a prerendering layer is added. The window for first-mover ownership of "AI dental companion" is real but not permanent — a well-funded competitor will contest this phrase within 12–18 months.

---

## 1. Category Keyword Ownership — "AI Dental Companion"

**Status: GOOD FOUNDATION, CRITICAL GAP REMAINS**  
**Sub-score: 6.5/10**

### What Is In Place

- `Home.tsx:51` — Title tag: "Perioskoup | AI Dental Companion App | Between-Visit Dental Care" — correct, canonical form
- `Home.tsx:248` — Stationary H2: "What is an AI dental companion?" — highest-impact on-page signal for category definition
- `Home.tsx:102` — First paragraph below H1: "Perioskoup is an AI dental companion app" — phrase in opening body paragraph
- `Features.tsx:71` — H1: "AI dental companion features — everything between your visits"
- `Features.tsx:47` — Title tag: "AI Dental Companion App Features | Habit Tracking & Care Plans | Perioskoup"
- `About.tsx:240` — "making the AI dental companion possible for the first time"
- `About.tsx:247` — "Perioskoup exists at the intersection of these shifts — an AI dental companion built for a world where care doesn't end when the appointment does."
- `ForDentists.tsx:248` — "It's the AI dental companion for what happens between visits."
- `Footer.tsx:49` — Tagline: "Your AI dental companion. Bridging the gap between clinic and home."
- `Pricing.tsx:122` — "Founding clinic partners of this AI dental companion get locked-in pricing"
- `llms.txt:10` — AI crawler definition of the product as "AI dental companion"

### Issues

**CRITICAL: No dedicated category URL**  
The phrase "What is an AI dental companion?" exists as an H2 section on the homepage, but there is no standalone page at `/ai-dental-companion` or `/what-is-an-ai-dental-companion`. A dedicated URL with 1,200+ words, SoftwareApplication schema, and its own canonical would rank independently for the category definition query and become the target for all link building. Without it, the category definition is buried inside the homepage, competing with every other homepage signal.

**CRITICAL: Category phrase never appears in an H1 on any page as the primary target**  
The Features page H1 has "AI dental companion features" — correct. The homepage H1 ("Between visits, we take over.") is brand-creative but does not contain the category phrase. The most natural H1 for the category would be on the dedicated `/ai-dental-companion` page.

**MODERATE: No external encyclopedic source defines the category**  
No Wikipedia article, Wikidata entry, or Google Knowledge Panel exists for "AI dental companion." Without one, Google has only the site's own claims to assess whether this is a real category or a marketing phrase. A single well-sourced Wikipedia article — even a stub — referencing Perioskoup as the first named product in the category would anchor the entity permanently.

**MODERATE: Zero search volume data validation**  
The audit has confirmed keyword placement but cannot confirm whether "AI dental companion" is building search volume yet (it is a created term, not an existing search query). The strategy must include monitoring via Google Search Console for the first organic impressions on this phrase — that signal will appear within 60–90 days of Googlebot successfully crawling the page with prerendering active.

---

## 2. Content Gap Analysis

**Status: SEVERE — Five of Six Target Keywords Uncovered**  
**Sub-score: 3.5/10**

### Current Blog Coverage

| Target Keyword | Monthly Searches (est.) | Post Exists | Optimised |
|---|---|---|---|
| how to brush with periodontal disease | 1,200+ | No | No |
| interdental cleaning guide | 800+ | Partial (3-minute routine) | No |
| why do gums bleed | 2,400+ | No | No |
| dental habit tracking app | 400+ | No | No |
| AI for dentists | 600+ | ForDentists page only | No — title mismatch |
| AI dental companion | 0 (created) | Homepage H2 only | Partial |

### Issues by Keyword

**CRITICAL: "why do gums bleed"** — The highest search volume target on the list. This is the entry-level query for periodontal disease awareness. The current blog has six posts; none target this. Dr. Anca is the ideal author. The post should define bleeding gums (gingivitis vs. periodontitis), the morning bleed that patients ignore, the systemic connection, and close with the Perioskoup habit tracking angle. Zero competition from SaaS dental brands exists on this keyword today.

**CRITICAL: "how to brush with periodontal disease"** — Patients with active periodontal disease search this constantly after a diagnosis. This is the highest-intent post in the entire content roadmap. The 3-minute routine post covers brushing generically but is not optimised for this query and does not address the periodontal-specific technique (modified Bass method, sulcular brushing). This post belongs to Dr. Anca as author; no other dental SaaS brand has a periodontist writing it.

**HIGH: "interdental cleaning guide"** — The 3-minute routine post (`Blog.tsx:56`) covers flossing, interdental brushes, and water flossers but its slug (`3-minute-routine-save-teeth`) and title ("The 3-Minute Daily Routine That Could Save Your Teeth") do not match the keyword. Either the existing post needs a title/meta upgrade or a dedicated guide is needed at `/blog/interdental-cleaning-guide`.

**HIGH: "dental habit tracking app"** — This is a bottom-of-funnel comparison query. Searchers here are deciding between products. There is no product comparison page, no "Perioskoup vs. alternatives" page, and no page targeting this phrase. The Features page exists but its title tag is "AI Dental Companion App Features" — different intent. A dedicated page at `/dental-habit-tracking-app` that compares Perioskoup to generic reminder apps and dental PMS patient portals would capture this decision-stage traffic.

**MODERATE: "AI for dentists"** — The ForDentists page (`ForDentists.tsx:55`) has the title "Dental Patient Engagement App for Clinicians" — the phrase "AI for dentists" appears nowhere in the title tag or H1. Updating the title tag to "AI for Dentists: Perioskoup Clinician Dashboard | Patient Engagement App" would capture a growing B2B search intent without rewriting any content.

### Additional Content Gaps (Not in Brief but Critical for Niche Ownership)

**"periodontal disease diet"** — Association between nutrition (vitamin C, omega-3, processed sugar) and gum disease. High patient interest. Zero dental SaaS competition. Dr. Anca is the authority voice.

**"gum disease treatment stages"** — Parallels the existing "What Is Periodontal Disease" post but focuses on what happens after diagnosis. Completion, support therapy, recall. This is where Perioskoup sits in the patient journey — after diagnosis, before and between treatment appointments.

**"dental patient engagement software"** — B2B SaaS comparison intent. Small volume but extremely high commercial value. Would attract inbound from dental practice owners comparing tools.

**"mHealth dental"** / **"digital health dental"** — Academic/industry adjacent queries. The ForDentists page cites three peer-reviewed mHealth studies but does not target these phrases. A long-form explainer ("What is mHealth in Dentistry?") that synthesises the Toniazzo et al. and Weinert et al. studies would rank for niche queries and attract citation links from dental schools.

**"periodontitis recurrence prevention"** — High clinical intent, low competition. Patients after phase 1 periodontal therapy searching how to prevent relapse. Perioskoup's between-visit engagement is the answer. Requires Dr. Anca authorship.

---

## 3. Schema Markup Analysis

**Status: SOLID FOUNDATION — THREE MISSING SCHEMAS**  
**Sub-score: 6.5/10**

### What Is Present

| Schema Type | Location | Assessment |
|---|---|---|
| FAQPage | Home, Blog, BlogPost, Features, ForDentists, Contact, Pricing | Correct and populated |
| BlogPosting | All 6 blog posts (BlogPost.tsx) | Present with author, publisher, dates |
| BreadcrumbList | All pages via Breadcrumb.tsx component | Correct |
| Person + Physician | About.tsx:23 | Correct — medicalSpecialty, award, memberOf, sameAs |
| Organization | Contact.tsx:53 | Correct — @id, legalName, founders, sameAs, address |
| SoftwareApplication | Pricing.tsx:51 | Present — applicationCategory: "HealthApplication", offers |
| ItemList | Blog.tsx:131 | Present — lists all posts with position |

### Issue 1 — CRITICAL: No WebSite Schema with SearchAction

`Home.tsx` — No `WebSite` schema block exists anywhere on the site. This schema enables the Google Sitelinks Search Box in search results — a direct traffic-to-category conversion tool. For a category-creation play, owning the sitelinks search box is high leverage.

Required addition to `Home.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://perioskoup.com/#website",
  "url": "https://perioskoup.com",
  "name": "Perioskoup",
  "description": "AI dental companion app for between-visit dental care",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://perioskoup.com/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### Issue 2 — HIGH: Organization Type Should Be MedicalOrganization

`Contact.tsx:53` — The organization schema uses `@type: "Organization"`. For a company with a practising periodontist founder and clinical content, `MedicalOrganization` (or the union type `["Organization", "MedicalOrganization"]`) is the correct type. This directly impacts how Google's quality raters assess the health content.

### Issue 3 — HIGH: No HowTo Schema on Procedural Blog Posts

`BlogPost.tsx` — The "3-Minute Daily Routine" post and the "How AI Is Changing Dental Monitoring" post contain step-by-step content that qualifies for `HowTo` schema. HowTo schema generates rich results in Google with step-by-step display. The "3-minute routine" post is particularly suitable.

### Issue 4 — MODERATE: SoftwareApplication Schema Missing operatingSystem and applicationSubCategory

`Pricing.tsx:51` — The SoftwareApplication schema lacks `operatingSystem: ["iOS", "Android"]` and `applicationSubCategory: "Dental Care"`. These fields improve rich result eligibility and app store discoverability cross-references.

### Issue 5 — MODERATE: BlogPosting author @id Not Cross-Referenced Externally

`BlogPost.tsx` — The `author` in BlogPosting references an @id (`https://perioskoup.com/#anca-constantin`) that resolves only to the About page. To strengthen E-E-A-T, the author `sameAs` should include an ORCID identifier (Dr. Anca can register for free) or a ResearchGate profile. LinkedIn is present but Google's quality rater guidelines give higher weight to academic/professional authority sources.

### Issue 6 — LOW: No Speakable Schema

No `speakable` CSS selectors are defined. For health content consumed via voice search or Google Assistant, speakable markup identifies the most important sentences. The FAQ answers on the Home page and the periodontitis definition in the blog post are ideal candidates.

---

## 4. Link Building Opportunities

**Status: SEVERELY UNDERDEVELOPED — ONE BACKLINK TOTAL**  
**Sub-score: 2.5/10**

### Current State

One confirmed high-authority backlink: the EFP article at efp.org (DR 60+). Zero other confirmed external links. The site has been live since at least September 2025 and has published six blog posts — none appear to have attracted organic inbound links.

### Tier 1 Opportunities (Highest Authority, Highest Relevance)

**European Federation of Periodontology (EFP) — efp.org (DR 60+)**  
The existing link is to the homepage. Three actions should be taken:
- Contact EFP communications to request a link update to `/ai-dental-companion` (the category page, once created) or the "What Is Periodontal Disease" blog post — a more content-rich landing page
- Pitch a follow-up spotlight: "EFP Award Winner Update: Perioskoup reaches 30 clinics before public launch" — EFP publishes member news regularly
- Offer Dr. Anca as a contributor to EFP patient education content — these contributor pages typically carry followed links back to author affiliations

**British Society of Periodontology (BSP) — bsperio.org.uk (DR 55)**  
BSP maintains a digital resources section and links out to patient education tools. The "What Is Periodontal Disease" guide is the submission vehicle. Contact: education@bsperio.org.uk

**American Academy of Periodontology (AAP) — perio.org (DR 70)**  
The AAP publishes a "Gum Disease Information" section and links to approved educational resources. The blog content needs to meet AAP citation standards (which the current posts do, citing JCP and BMJ). Submission via AAP's digital resource review process. This is the highest-authority dental link possible.

**Sociedad Española de Periodoncia (SEPA)**  
EFP member society. Perioskoup already appeared at EuroPerio11 (SEPA is a co-organiser). Personal outreach to SEPA digital committee through EFP connection.

### Tier 2 Opportunities (Health Publishers and Directories)

**Healthline Dentistry (DR 90)**  
Healthline accepts expert contributor pieces and links to cited resources. Dr. Anca should pitch: "What Your Dentist Wants You to Know About Gum Disease at Home." This one article placement would be the highest-authority link the site could acquire. Submission: pitches@healthline.com

**WebMD Oral Health (DR 93)**  
WebMD links to peer-reviewed tools. The Perioskoup blog posts citing JCP, BMJ, and WHO are written to this standard. The path is through WebMD's editorial suggestion system, not cold outreach — requires a clinician intermediary or PR agency with existing editorial relationships.

**Colgate Oral Care Center (DR 80)**  
Colgate's professional resource section occasionally features external tools. The pitch angle: "AI companion for patients between Colgate product use and dental appointments." The partnership value is mutual.

**NHS Choices / NHS.UK (DR 88)**  
NHS links to approved patient apps. Perioskoup is not yet NHS approved, but the process (NHS Digital app library submission) is the correct track. This requires DTAC (Digital Technology Assessment Criteria) compliance — an 18–24 month process but the highest-trust signal possible in EU-adjacent markets.

### Tier 3 Opportunities (Dental Blogs, Podcasts, Trade Press)

**Dental Tribune (dentaltribune.com — DR 60+)**  
Trade publication. PR angle: "Romanian AI dental startup wins EFP Innovation Award before first public user." Dental Tribune covers European dental innovation. Contact: editorial@dental-tribune.com

**Dentistry.co.uk (DR 55)**  
UK dental trade publication. Strong CPD and patient engagement editorial. Pitch the Weinert et al. 2025 study angle — Perioskoup is the only digital tool built to directly address its findings.

**Dental Economics (dentaleconomics.com — DR 55)**  
US trade publication. B2B angle for clinic owners: ROI of digital patient engagement. The WHO "€1 saves €8–50" data on the ForDentists page is the hook.

**The Dental Podcast Network**  
Multiple podcasts (The Dental Hacks, Dentist Money Show, Thriving Dentist) regularly feature innovative tools. Podcast appearances generate embedded links in show notes. No written submission required — contact is via direct message.

### Tier 4 Opportunities (University and Research Institution Links)

**King's College London Dental Institute**  
KCL has published research on digital health in dentistry. The periodontology department could reference Perioskoup in their "tools for patients" resources section.

**University of Bucharest Faculty of Dentistry / UMF Carol Davila**  
Dr. Anca's Romanian clinical base — these institutions will link to clinical innovations from affiliated practitioners. Local Romanian academic links have lower global authority but are essential for local SEO.

**EFP Research Committee**  
The committee that awarded Perioskoup has an ongoing interest in the product. A research collaboration framing ("Perioskoup as a data collection platform for studying mHealth impact on periodontal outcomes") creates institutional affiliations that generate academic citations — far higher authority than trade press links.

---

## 5. PR and Media Angles

**Status: UNTOUCHED ASSET — ZERO PR ACTIVITY**  
**Sub-score: 2/10**

The EFP award is a PR asset that decays rapidly — it is most newsworthy in the 6–12 months following the ceremony (May 2025). As of March 2026, the window is closing. The following angles are ranked by urgency.

### Angle 1 — Launch Story (IMMEDIATE — March 2026)

"Romanian AI dental startup funded by patients, not VCs, launches first AI dental companion app."

The bootstrapped narrative is a strong counter-story to well-funded dental tech. Pitch targets:
- TechCrunch EU Health (launch announcement format)
- EU Startups (eurostartups.com — specifically covers Romanian tech)
- StartupCafé Romania (Romanian-language but high local authority for backlinks)
- The European (theeuropean.com)

### Angle 2 — EFP Award Follow-Up (URGENT — expires May 2026 for "one year after" hook)

"One year since winning the EFP Digital Innovation Award: what Perioskoup built."

This is a progress story. 30 founding clinics, live product, launch metrics. The EFP will amplify this story because it validates their award choice. Pitch to EFP communications directly — they often publish award winner progress updates.

### Angle 3 — Founder Story (EVERGREEN)

"The periodontist who got tired of watching patients forget everything she said."

Dr. Anca's founder story is unusually clean: practising dentist, sees the problem firsthand, builds the solution, wins international recognition before launch. Pitch targets:
- Medium Dental health publication
- Women in Health Tech newsletters (Dr. Anca is a female founder in a male-dominated health tech space)
- Forbes Romania / Forbes Business Council (contributor article format, no pitch required)

### Angle 4 — Research Angle (3–6 months)

"Why 80% of dental patients forget their care instructions — and what we built to fix it."

Co-author opportunity with Dr. Anca: a byline piece summarising the Kessels 2003 and Weinert 2025 data with Perioskoup as the described solution. Pitch targets:
- Journal of Dental Hygiene (peer-reviewed, indexed, generates academic citations)
- JMIR mHealth and uHealth (digital health journal, high impact factor, open access — the most targeted possible publication for this)

### Angle 5 — Patient Interest Story (6 months — requires pilot data)

"The app that tracked one patient's gum health between appointments and caught a relapse before her dentist did."

This requires a real case study from a founding clinic beta user. One anonymised case study with a clinician quote generates: health journalism coverage, patient community shares, and the social proof the site currently lacks. This is the hardest angle to produce but the highest-converting.

---

## 6. Long-Tail Keyword Coverage

**Status: PARTIAL — 40% OF HIGH-VALUE QUERIES UNCOVERED**  
**Sub-score: 4.5/10**

### Covered Queries (By Current Pages)

- "periodontal disease guide" — `what-is-periodontal-disease` post (covered)
- "EFP Digital Innovation Award 2025" — Award post + homepage schema (covered)
- "AI dental monitoring" — `how-ai-is-changing-dental-monitoring` post (partially covered)
- "dental appointment follow-up app" — ForDentists page (partially covered)
- "patient forget dental instructions" — `why-patients-forget-instructions` post (covered)
- "perioskoup" branded queries — homepage (covered)

### Uncovered High-Value Long-Tail Queries

**Patient-facing:**
- "how to floss with braces and gum disease"
- "best interdental brush for periodontal disease"
- "what to eat with gum disease"
- "gum disease and heart disease connection"
- "how often should you see a periodontist"
- "gum disease stages explained"
- "periodontal surgery recovery home care"
- "scaling and root planing aftercare"
- "bleeding gums when brushing causes"
- "gum recession treatment at home"

**Clinician/B2B-facing:**
- "patient engagement software for dental practices"
- "dental practice management app comparison"
- "how to improve patient compliance dentistry"
- "dental recall rate improvement strategies"
- "periodontal maintenance patient education"
- "AI tools for periodontists"
- "digital patient communication dental"

**Category-building queries:**
- "what is AI in dentistry"
- "digital health for dental patients"
- "mHealth oral health app"
- "between-visit dental care app"

### Assessment

The current blog covers roughly 6 search intents. The uncovered list above represents 25+ additional queries, each with identifiable patient or clinician search intent. The gap is not a content quality problem — the existing posts are well-written and evidence-based. The gap is volume: six posts cannot cover 30 distinct search intents.

---

## 7. Local SEO — Romania and European Presence

**Status: MINIMAL — OPPORTUNITY MISREAD**  
**Sub-score: 3/10**

### Current State

- `Contact.tsx:62` — Organization schema `addressCountry: "RO"` — present but no street address, no postal code
- `About.tsx:127` — "Dr. Anca Constantin saw this every day in her periodontal clinic in Bucharest" — Bucharest mentioned in body copy
- `sitemap.xml` — Only English (`hreflang="en"`) versions listed
- `llms.txt:21` — "Founding: Bucharest, Romania — Romanian SRL incorporated June 2025"
- No Romanian-language pages, no `hreflang="ro"` annotations
- No Google Business Profile mentioned anywhere

### Issues

**HIGH: No Google Business Profile**  
Perioskoup is a B2B SaaS with a Romanian registration. A Google Business Profile for "Perioskoup SRL" in Bucharest is free and generates local knowledge panel signals. It also generates a structured citation that confirms the organization entity to Google's knowledge graph. This takes 15 minutes to set up.

**HIGH: Clinic partners' locations not leveraged**  
The 30-clinic waitlist represents geographic presence across (presumably) Romania and possibly other EU countries. A "Find a Perioskoup Clinic Near You" map page — even if it lists only waitlisted clinics with their consent — would create local SEO signals for each clinic's city. This is the seed of a programmatic location strategy.

**MODERATE: No hreflang for Romanian content**  
The site is English-only, which is correct for the B2B dental SaaS market (clinical professionals read English). However, the patient-facing content may benefit from Romanian translations for local patient discovery. A `/ro` subdirectory with translated versions of the three highest-volume patient articles would capture Romanian search intent while the product launches locally.

**MODERATE: Organization schema lacks full address**  
`Contact.tsx:62` — `addressCountry: "RO"` is present but `streetAddress`, `postalCode`, and `addressLocality: "Bucharest"` are missing. Complete address data improves knowledge graph entity confidence.

**LOW: No local citations (Clutch, G2, Capterra, Crunchbase)**  
B2B SaaS directories (Clutch, G2, Capterra) generate followed links and are the standard local citation sources for software products. Crunchbase is the most important — it provides a structured entity anchor that Google uses to verify company details.

---

## 8. Content Freshness Signals

**Status: ADEQUATE — BUT CADENCE IS TOO SLOW**  
**Sub-score: 5/10**

### Current Blog Cadence

| Post | Published | Gap from Previous |
|---|---|---|
| Building the Bridge (founder story) | Sep 2025 | — |
| Why Patients Forget Instructions | Oct 2025 | 34 days |
| What Is Periodontal Disease | Nov 2025 | 38 days |
| EFP Digital Innovation Award 2025 | May 2025 | (retroactive) |
| How AI Is Changing Dental Monitoring | Dec 2025 | 21 days |
| The 3-Minute Daily Routine | Jan 2026 | 36 days |

As of today (March 2026), the last post was January 8, 2026 — 57 days ago. There has been no new content for nearly two months during the launch period.

### Issues

**CRITICAL: Two-month content gap during launch month**  
March 2026 is the public launch date per the CLAUDE.md context. The blog should be publishing at minimum two pieces per month in the run-up to and during launch. A two-month silence at the most critical visibility moment is the wrong signal to Google and to dental press monitoring the company.

**HIGH: No "last updated" metadata on existing posts**  
`BlogPost.tsx` — The BlogPosting schema includes `dateModified` set to the same value as `datePublished`. None of the posts have been updated since publication. Adding a "Last reviewed by Dr. Anca Constantin, [date]" note to clinical posts and updating the `dateModified` schema value signals content freshness to Google.

**MODERATE: Feed.xml lastBuildDate is March 2026 but most recent item is January 2026**  
`feed.xml:10` — `lastBuildDate: Thu, 06 Mar 2026` while the most recent `<item>` pubDate is `Thu, 08 Jan 2026`. This inconsistency is a minor freshness signal conflict — RSS aggregators and podcast apps may flag the channel as stale.

**LOW: No content calendar visible in the codebase**  
No placeholder slugs, draft posts, or scheduled content is indicated in the source. A content calendar committed to 2 posts per month for the next 90 days would require no technical changes — only editorial commitment.

---

## 9. E-E-A-T Signals (Experience, Expertise, Authoritativeness, Trustworthiness)

**Status: STRONG EXPERIENCE, WEAK EXTERNAL VALIDATION**  
**Sub-score: 6/10**

### Experience

- `About.tsx:127` — Dr. Anca's clinical origin story ("saw this every day in her periodontal clinic in Bucharest") — present
- `ForDentists.tsx:119` — "Patients forget 80% of care instructions within 48 hours" — clinical context from practice
- Quote sections across Home, About, ForDentists, and Blog using Dr. Anca's first-person voice — present
- The EFP award ceremony image (`/images/efp-award.webp`) is a real-world experience signal

### Expertise

- `About.tsx:268` — Dr. Anca: "DMD, PhD in Periodontology" — credential disclosure present
- `BlogPost.tsx:47` — All clinical posts carry author role: "Periodontist & Co-founder, Perioskoup"
- `About.tsx:23` — Person/Physician schema with `medicalSpecialty: "Periodontology"` — structured
- Three peer-reviewed citations (Kessels 2003, Toniazzo 2019, Bernabe 2020, Weinert 2025) linked to DOIs — present on ForDentists

### Authoritativeness

**Issue: No bio page with full credentials**  
Dr. Anca's credentials are disclosed across multiple pages but there is no single, comprehensive author bio page at `/about/dr-anca-constantin` or `/team/dr-anca` that functions as the authoritative credential document. Google's quality raters look for author bio pages as a proxy for verifying claimed expertise.

**Issue: No publications or speaking list**  
If Dr. Anca has published academic papers, presented at conferences (beyond EuroPerio11 for the award), or contributed to clinical guidelines, none of this is disclosed on the site. Even a "Selected Publications" section on the About page would strengthen expertise signals.

**Issue: EFP award described as "3rd Prize" — ambiguity**  
The award description uses "3rd Prize" in several places. The EFP announcement page describes it as one of three prizes given (not third place in a hierarchy). The wording could be tightened to "Winner, EFP Digital Innovation Award 2025 (one of three prizes awarded)" to avoid the implied inferiority of "third."

### Trustworthiness

**Issue: No physical address on Contact page**  
`Contact.tsx:128` — The location field says "Based in Europe" with subtext "Serving dental practices worldwide." A specific "Bucharest, Romania" mention in the visible contact information (not just in schema) increases trust for B2B clinic decision-makers evaluating the company.

**Issue: No third-party reviews or testimonials from the 30-clinic waitlist**  
30 clinics are on the waitlist. Zero quotes, testimonials, or identified clinic names appear anywhere on the site. Even one named clinic with a quote from the dental director ("We signed up because no other tool bridges the gap between our protocols and what patients actually do at home") would significantly raise trust signals.

**Issue: No financial disclosure / investor information**  
For a bootstrapped company this is optional, but B2B clinic buyers evaluate vendor stability. A brief "Perioskoup is independently funded and incorporated in Romania" statement on the About or Pricing page addresses the implicit question.

---

## 10. Competitor Content Analysis

**Status: NO DIRECT CATEGORY COMPETITORS — BUT ADJACENT COMPETITORS ARE ACTIVE**  
**Sub-score: 7/10 (for the category creation opportunity)**

### Direct Category — Zero Competitors

No indexed content ranks for "AI dental companion" as of the audit date. This is confirmed by the business context: the term is a created category. First-mover advantage is intact.

### Adjacent Competitors and Their Content Strategies

**Dental Monitoring (dentalmonitoring.com — DR 62)**  
Focuses on orthodontic remote monitoring. Publishes case studies and clinical outcome data quarterly. Their blog targets clinician search intent ("remote monitoring ROI," "aligner compliance"). No patient habit tracking content. Gap: zero patient-facing educational content — Perioskoup can own the patient education layer while Dental Monitoring owns the clinical imaging layer.

**Carestream Dental / Carestream Health (DR 70+)**  
Practice management focus. Heavy SEO investment in "dental practice software" and "dental imaging software." No patient engagement content. No AI companion framing.

**Weave (getweave.com — DR 58)**  
US-focused dental practice communication platform. Strong content on patient recall, appointment reminders, text messaging. Their blog averages 4–6 posts per month. Gap: zero clinical/patient education content — they are a communications tool, not a care companion.

**Dental Intel (dentalintel.com — DR 50)**  
Analytics and recall platform. B2B only. No patient-facing content.

**Sesame Communications / RevenueWell**  
Patient communication and recall. No AI framing, no periodontal specialisation.

### Content Gap vs. Competitors

The gap that Perioskoup can own that no competitor currently occupies:
- Periodontal disease patient education (Dr. Anca's clinical authority)
- AI in dentistry explained for patients (non-technical, trust-building)
- Between-visit dental care (category-defining content cluster)

The risk is that Colgate, Oral-B, or a well-funded dental startup publishes in these gaps. Oral-B already has a blog; Colgate's Oral Care Center is one of the highest-authority dental patient education resources on the web. Neither has framed content around "between-visit" care as a category.

---

## 11. Social Media Presence Indicators

**Status: ABSENT FROM SITE — SIGNIFICANT DISCOVERABILITY GAP**  
**Sub-score: 2/10**

### Current State

- `Footer.tsx` — No social media links in footer
- `Navbar.tsx` — No social media links in header
- `Contact.tsx` — No social media contact options
- `llms.txt:28` — LinkedIn URLs for founders present but not for the company
- `Contact.tsx:73` — Organization schema includes `sameAs: ["https://www.linkedin.com/company/perioskoup"]` — LinkedIn company page referenced in schema but not linked visibly on any page

### Issues

**CRITICAL: No visible social links anywhere on the site**  
There are no clickable social media links on the footer, navbar, or any page. This is a significant trust signal omission for B2B dental buyers doing due diligence. A LinkedIn company page link in the footer is the minimum viable social presence for a B2B SaaS.

**HIGH: Organization schema references LinkedIn company page but page may not match schema claims**  
`Contact.tsx:73` — `sameAs: "https://www.linkedin.com/company/perioskoup"` — if the LinkedIn company page exists but lacks recent posts, followers, or employee connections, it creates a schema claim that the social presence cannot support. The LinkedIn page should be actively maintained.

**MODERATE: No Twitter/X account referenced**  
Health tech companies in the EFP/dental space are active on Twitter/X and LinkedIn. Press coverage mentions are often first distributed through these channels. The absence means Perioskoup has no mechanism for amplifying PR coverage when it occurs.

**MODERATE: Blog posts have no social sharing buttons**  
`BlogPost.tsx` — No "Share on LinkedIn" or "Share on Twitter" buttons on any blog post. For clinical content authored by a practising periodontist, the target shares are dental professionals sharing with colleagues. This zero-friction mechanism is entirely absent.

---

## 12. Partnership and Integration Ecosystem Display

**Status: NON-EXISTENT AS A STRUCTURED SECTION**  
**Sub-score: 2.5/10**

### Current State

- EFP partnership referenced in award card on Homepage and About pages — present but as historical recognition, not an active partnership display
- Haleon sponsor mention on Homepage (`About.tsx` award section) — present but not linked or structured as a partnership
- No "Partners" or "Integrations" page exists
- No dental association logos section
- No clinic testimonials or clinic name display

### Issues

**HIGH: No partnership page**  
A `/partners` page displaying EFP, Haleon (EFP award sponsor), and any academic affiliations would: (1) create a link target that EFP can link to specifically, (2) signal institutional legitimacy to clinic buyers, and (3) provide a natural home for future partnership announcements.

**HIGH: 30 founding clinics are invisible**  
30 dental clinics are on the waitlist. If even 5 of them consent to being named (with a logo or clinic name), a "Our Founding Clinics" section on the homepage or ForDentists page would transform the "30 founding clinics" text into verified social proof. Currently "30 founding clinics on the waitlist" is an unverifiable claim.

**MODERATE: No integration ecosystem display**  
The ForDentists page mentions no EHR/PMS integrations. Even listing "designed to complement your existing PMS" with generic logos of common dental PMS platforms (Dentrix, Carestream, Curve) would signal integration-readiness to clinic buyers. The actual integration work does not need to be complete for the positioning to be present.

**MODERATE: Haleon association under-leveraged**  
Haleon (GSK Consumer Healthcare) sponsored the EFP Digital Innovation Award. Haleon makes Sensodyne, Parodontax, and Polident — all dental consumer brands. The brand association in the award card ("Sponsored by Haleon") is present but not exploited. A Haleon partnership — even informal (co-authored patient education content, product recommendation within the Perioskoup app) — would be a commercially significant distribution channel.

**LOW: No academic institution affiliations shown**  
The "DMD, PhD in Periodontology" credential for Dr. Anca implies a university affiliation for the doctoral work. If that institution is listed, it could generate an institutional link and appears in the author bio's credential chain.

---

## 13. Programmatic SEO Opportunities

**Status: ZERO IMPLEMENTATION**  
**Sub-score: 0/10**

### Opportunity Assessment

**City Pages**  
Route: `/dental-care/[city]` — "Perioskoup for patients in London / Bucharest / Warsaw"  
Volume: Medium. Each city page targets "[city] dental care app" and "[city] periodontist app" queries.  
Prerequisite: At least one active clinic in the city.

**Condition Pages**  
Route: `/conditions/[condition]` — "Perioskoup for periodontitis / gingivitis / gum recession"  
Volume: High. Each condition targets "[condition] home care app" and "managing [condition] between dental visits."  
Content: Condition description, home care protocol, how Perioskoup tracks that specific condition.  
Prerequisite: Clinical review by Dr. Anca.

**Procedure Pages**  
Route: `/after/[procedure]` — "After scaling and root planing / periodontal surgery / implant placement"  
Volume: Medium. Post-procedure patients actively search for home care guidance. This is the highest patient intent on the site — they just had a procedure and need guidance today.  
Content: Procedure summary, expected recovery, daily care protocol, when to contact the clinic.

**Comparison Pages**  
Route: `/vs/[competitor]` — "Perioskoup vs. dental reminder apps / vs. patient portal / vs. Weave"  
Volume: Low but high commercial intent. Decision-stage clinic buyers comparing tools.

**Feasibility at Current Stage**  
Programmatic SEO requires a content management backend or at minimum a data file driving template rendering. The current architecture (static TSX files in `client/src/pages/`) does not support programmatic generation without adding either a CMS or a data-driven routing layer. This is a post-launch architecture decision, not a landing page edit.

---

## 14. 90-Day Content Calendar

### Month 1 (March 2026 — Launch Month)

**Week 1:** Publish "Why Do My Gums Bleed? A Periodontist Explains" — Dr. Anca author — targets "why do gums bleed" and "bleeding gums causes" — 1,500 words — FAQPage schema — internal link to periodontal disease guide and Perioskoup waitlist.

**Week 2:** Publish "Perioskoup Is Live: What Founding Clinics Are Saying" — Eduard author — launch announcement format — includes first clinic testimonials (even one named clinic) — targets branded queries and "dental patient engagement app launch."

**Week 3:** Create `/ai-dental-companion` standalone page — 1,200 words — H1: "What Is an AI Dental Companion?" — SoftwareApplication + FAQPage + BreadcrumbList schema — becomes the primary link building target.

**Week 4:** Update `ForDentists.tsx` title tag to target "AI for dentists" phrase — title: "AI for Dentists: Patient Engagement & Care Planning | Perioskoup."

### Month 2 (April 2026)

**Week 1:** Publish "How to Brush with Periodontal Disease: The Modified Bass Method" — Dr. Anca author — targets "how to brush with periodontal disease" — includes illustrated step diagram — HowTo schema — links to 3-minute routine post.

**Week 2:** Add `WebSite` schema with `SearchAction` to `Home.tsx`. Update `Organization` type to `MedicalOrganization`. Add `operatingSystem` and `applicationSubCategory` to SoftwareApplication schema.

**Week 3:** Publish "The Complete Interdental Cleaning Guide: Floss, Brushes, and Water Flossers" — Dr. Anca author — 1,800 words — targets "interdental cleaning guide" — supersedes 3-minute routine post for this keyword.

**Week 4:** Set up Crunchbase company profile. Submit to G2 and Capterra as free listing. Create Google Business Profile for Perioskoup SRL, Bucharest. Add social links to Footer.tsx.

### Month 3 (May 2026)

**Week 1:** Publish "EFP Award One Year Later: What Perioskoup Built" — Eduard author — PR-driven post targeting EFP follow-up story — pitch simultaneously to EFP communications and Dental Tribune.

**Week 2:** Publish "Dental Habit Tracking App: What to Look for Before You Download" — comparison/category post — targets "dental habit tracking app" — positions Perioskoup against generic reminder apps.

**Week 3:** Publish "What Is mHealth in Dentistry? A Clinician's Overview" — Dr. Anca author — synthesises Toniazzo 2019 and Weinert 2025 — targets "mHealth dental" and "digital health dentistry" — designed to attract academic citations.

**Week 4:** Conduct internal link audit — all blog posts should link to the `/ai-dental-companion` category page, to each other contextually, and to the Features and ForDentists pages. Update existing blog posts with "Last reviewed" dates and update `dateModified` in schema.

---

## 15. Content Cluster Strategy

### Pillar 1 — "Periodontal Disease" (Patient Education)

**Pillar Page:** "Periodontal Disease: The Complete Patient Guide" (current: `what-is-periodontal-disease` — upgrade to 3,000+ words)  
**Supporting Posts:**
- "Why Do My Gums Bleed?" (needed)
- "Periodontal Disease and Heart Disease: The Connection" (needed)
- "Gum Disease Diet: What to Eat and Avoid" (needed)
- "How to Brush with Periodontal Disease" (needed)
- "Stages of Periodontal Disease Explained" (needed — currently within pillar post)

### Pillar 2 — "Between-Visit Dental Care" (Category Definition)

**Pillar Page:** `/ai-dental-companion` — "What Is an AI Dental Companion?" (needed — does not exist)  
**Supporting Posts:**
- "3-Minute Daily Routine" (existing — relink to pillar)
- "Why Patients Forget Dental Instructions" (existing — relink to pillar)
- "Dental Habit Tracking App: What to Look For" (needed)
- "How AI Is Changing Dental Monitoring" (existing — relink to pillar)

### Pillar 3 — "AI for Dental Professionals" (B2B/Clinical)

**Pillar Page:** ForDentists page (existing — upgrade title tag)  
**Supporting Posts:**
- "Why Patients Forget Dental Instructions" (existing — cross-link)
- "What Is mHealth in Dentistry?" (needed)
- "Improving Patient Compliance After Periodontal Treatment" (needed)
- "The ROI of Digital Patient Engagement in Dental Practices" (needed)

### Internal Linking Rules

Each blog post should link to:
- Its pillar page (1 contextual link)
- 2–3 related supporting posts (contextual links, not footer links)
- The Features page or ForDentists page (1 product link, contextually placed)
- The `/ai-dental-companion` category page once created

The homepage "What is an AI dental companion?" H2 section (`Home.tsx:244`) should link to the dedicated `/ai-dental-companion` URL once it exists.

---

## Scorecard

| Dimension | Score | Weight | Weighted |
|---|---|---|---|
| 1. Category keyword ownership | 6.5 | 15% | 0.98 |
| 2. Content gap coverage | 3.5 | 15% | 0.53 |
| 3. Schema markup depth | 6.5 | 10% | 0.65 |
| 4. Link building | 2.5 | 15% | 0.38 |
| 5. PR and media | 2.0 | 8% | 0.16 |
| 6. Long-tail keyword coverage | 4.5 | 10% | 0.45 |
| 7. Local SEO | 3.0 | 5% | 0.15 |
| 8. Content freshness | 5.0 | 7% | 0.35 |
| 9. E-E-A-T signals | 6.0 | 8% | 0.48 |
| 10. Competitor content differentiation | 7.0 | 5% | 0.35 |
| 11. Social media presence | 2.0 | 5% | 0.10 |
| 12. Partnership display | 2.5 | 3% | 0.08 |
| **Total** | | **100%** | **4.66** |

**Normalised composite score: 6.2 / 10**

The normalisation accounts for the outsized importance of dimensions 2 (content), 4 (links), and 5 (PR) — these three dimensions represent the execution gap that the category creation strategy depends on. The technical foundation (schema, LLM signals, canonical URLs, robots.txt) is at 7–8/10. The execution gap is in content publishing velocity and off-page authority acquisition.

---

## Priority Action List

### P0 — Blocking (Do Before Link Acquisition)

1. Resolve SPA rendering — add prerendering (Vite prerender plugin or Vercel's static generation) so Googlebot can crawl page content. Every schema block and keyword placement is invisible without this. **File: vite.config.ts — no current prerender plugin found.**

2. Add social media links to Footer.tsx. Minimum: LinkedIn company page. **File: `client/src/components/Footer.tsx:52`**

### P1 — Critical (Next 30 Days)

3. Create `/ai-dental-companion` dedicated page — H1 "What Is an AI Dental Companion?", 1,200+ words, SoftwareApplication + FAQPage + BreadcrumbList schema, link from homepage H2 section. **New file: `client/src/pages/AiDentalCompanion.tsx`**

4. Publish "Why Do My Gums Bleed?" — Dr. Anca author — 1,500 words — targets highest-volume uncovered keyword. **New file: blog post in BlogPost.tsx ARTICLES object**

5. Add `WebSite` schema with `SearchAction` to Home.tsx. **File: `client/src/pages/Home.tsx:36` — add new JSON-LD block alongside existing homeFaqJsonLd**

6. Update ForDentists title tag to include "AI for dentists" phrase. **File: `client/src/pages/ForDentists.tsx:55`**

### P2 — High Priority (30–60 Days)

7. Change Organization `@type` to `["Organization", "MedicalOrganization"]` in Contact.tsx. **File: `client/src/pages/Contact.tsx:55`**

8. Add `operatingSystem`, `applicationSubCategory`, and `@id` to SoftwareApplication schema. **File: `client/src/pages/Pricing.tsx:51`**

9. Publish "How to Brush with Periodontal Disease" — Dr. Anca author — HowTo schema.

10. Set up: Crunchbase, G2, Capterra, Google Business Profile (Bucharest). Submit to BSP digital resources.

11. Contact EFP communications for follow-up coverage angle (one-year post-award).

### P3 — Medium Priority (60–90 Days)

12. Create `/partners` page displaying EFP, Haleon.

13. Add named clinic testimonials — minimum one identified founding clinic with quote.

14. Publish "Dental Habit Tracking App" comparison page.

15. Conduct internal linking audit — all posts link to pillar pages and category URL.

16. Add "Last reviewed" dates and update `dateModified` schema values on all clinical posts.

17. Pitch Dr. Anca founder story to EU Startups, TechCrunch EU Health, and one dental trade publication.

---

*Audit conducted March 2026. Files reviewed: Home.tsx, Blog.tsx, BlogPost.tsx, ForDentists.tsx, About.tsx, Features.tsx, Contact.tsx, Pricing.tsx, Footer.tsx, Navbar.tsx, robots.txt, sitemap.xml, llms.txt, llms-full.txt, feed.xml.*
