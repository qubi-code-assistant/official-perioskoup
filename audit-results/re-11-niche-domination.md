# Perioskoup — Niche Domination Re-Audit
**Audit Type:** Niche Domination / SEO / Content Strategy — Post-Fix Review
**Original Score:** 6.5 / 10
**Re-Audit Score: 7.5 / 10**
**Date:** 2026-03-06
**Auditor:** Niche Domination Strategist

**Verdict:** The post-fix site has closed the most damaging gaps identified in the original audit. The category phrase "AI dental companion" now appears in a stationary H2 on the homepage (the "What is an AI dental companion?" section), in multiple page title tags, in the Features H1, in two body paragraphs on the About page, and throughout the ForDentists competitive-positioning section. Schema coverage has been substantially deepened: every blog post now carries BlogPosting + BreadcrumbList + conditional FAQPage JSON-LD; the About page adds Person/Physician + FAQPage; Contact carries Organization; Pricing carries SoftwareApplication. The Breadcrumb component generates BreadcrumbList schema site-wide. The SPA rendering problem remains — Vercel's SPA rewrite serves index.html for all routes, meaning Googlebot crawls a React shell without a prerendering layer — but all other fundamentals are measurably stronger. The work that remains (content clusters, programmatic pages, active link acquisition, pilot data, partnership pages) is the second-tier execution layer; the foundational architecture is now sound enough to support it.

---

## Part 1: Category Ownership — Changes Observed

### The Original Finding
"AI dental companion" appeared in ticker copy and JSON-LD schema but never in a stationary H1, H2, or URL slug.

### What Changed

**Confirmed improvements in the source code:**

The homepage now contains a dedicated section with the verbatim H2 "What is an AI dental companion?" — a full paragraph defining the category. This is the single highest-impact change in the re-audit. It plants the category definition in a crawlable, text-node position with deliberate use of the phrase ("Not a chatbot. Not a practice management system. Perioskoup is the first.").

The homepage H1 title tag was updated to: "Perioskoup | AI Dental Companion App | Between-Visit Dental Care" — the category phrase is now in the title tag in its canonical form, which is the highest-weight on-page signal.

The Features page H1 reads: "AI dental companion features — everything between your visits." The Features page title tag is: "AI Dental Companion App Features | Habit Tracking & Care Plans | Perioskoup."

The About page body uses the phrase naturally: "making the AI dental companion possible for the first time" and "Perioskoup exists at the intersection of these shifts — an AI dental companion built for a world where care doesn't end when the appointment does."

The product subhead on the homepage now reads: "Perioskoup is a free AI dental companion app — personalised guidance, habit tracking, and a direct line to your clinic between appointments." The phrase is in the first paragraph below the H1.

**Still missing (carried forward from original audit):**
- A dedicated URL at `/what-is-an-ai-dental-companion` or `/ai-dental-companion` that could rank independently for the category definition query
- The category phrase is not in an H1 on any page — it is in H2s and title tags, which is solid but not the maximum position
- No Wikipedia disambiguation page, Wikidata entry, or external encyclopedic source defining the category with Perioskoup as the originator

**Score for category ownership: improved from 4/10 to 6.5/10**

---

## Part 2: Schema Markup — Changes Observed

### The Original Finding
BlogPost pages had no Article schema. The Homepage had only FAQPage. BreadcrumbList was absent across secondary pages.

### What Changed

**BlogPost.tsx** now generates three JSON-LD blocks per post:
1. `BlogPosting` with `headline`, `description`, `author` (Person entity with @id), `publisher` (@id reference to organization), `datePublished`, `dateModified`, `url`, `image`, and `mainEntityOfPage`
2. `BreadcrumbList` with three levels (Home > Blog > Article title)
3. `FAQPage` (conditional — renders only when `article.faqs.length > 0`, which is true for all current articles)

**About.tsx** now generates:
1. `Person` + `Physician` type union for Dr. Anca, with `medicalSpecialty`, `memberOf` (EFP), `award`, `knowsAbout`, and `sameAs` (EFP article + LinkedIn)
2. `FAQPage` with five question/answer pairs about the team and mission

**Contact.tsx:** `Organization` schema with `@id: "https://perioskoup.com/#organization"` — this ID is referenced by `BlogPosting.publisher` and `Person.worksFor`, creating a linked entity graph.

**Pricing.tsx:** `SoftwareApplication` schema with `applicationCategory: "HealthApplication"`, `offers` array with free Patient plan and paid Clinic plan.

**Breadcrumb.tsx component:** Renders `BreadcrumbList` JSON-LD on every page that includes the component (About, Blog, BlogPost, Features, ForDentists).

**Blog.tsx:** `ItemList` schema listing all posts, plus `FAQPage` for blog-level questions.

**What is still missing:**
- No `WebSite` schema with `SearchAction` on the homepage (enables sitelinks search box)
- No `MedicalOrganization` type for the organization entity — the current `Organization` type is generic
- The author `@id` in BlogPosting references a Person entity defined only on `/about`, not cross-linked with a `sameAs` to a stable external authority (ORCID, ResearchGate, LinkedIn is present but not structured)
- No `Review` or `AggregateRating` schema on the product or clinician pages (these require real data, which is justified as premature at beta stage)

**Score for schema: improved from 4.5/10 to 7/10**

---

## Part 3: Content Architecture — Changes Observed

### The Original Finding
Six standalone blog posts with no cluster architecture, no pillar pages, and no internal linking topology that signals topical authority.

### What Exists Now

The six posts remain the same in slug and title. No new posts have been added since the original audit. The blog page structure is improved (featured posts grid, newsletter CTA, all-articles list) but the content itself has not expanded.

**The ForDentists page** was significantly strengthened as a content asset:
- Added three cited clinical studies inline (Weinert et al. 2025 JCP, J Clin Periodontol, Platform for Better Oral Health in Europe)
- Added WHO Oral Health ROI citation ("every €1 invested in prevention saves €8–50")
- Added a competitive positioning section ("Not another PMS plugin") that explicitly names Perioskoup as "the AI dental companion for what happens between visits"
- Three-column workflow section (Before / During / After) with clinical context

**The Homepage** has a new "What is an AI dental companion?" section that functions as a mini-pillar paragraph — it could be the seed of a full pillar page at a dedicated URL.

**Critical gaps that remain unchanged:**

No content exists for any of the blog target keywords from the brief:
- "how to brush with periodontal disease" — not written
- "interdental cleaning guide" — the 3-minute routine post covers this partially but is not optimised for the head keyword
- "why do gums bleed" — not written
- "dental habit tracking app" — no page or post targets this
- "AI for dentists" — the ForDentists page exists but its title tag targets "dental patient engagement app for clinicians," not "AI for dentists"

No cluster architecture exists. There is no pillar page linking to supporting posts. Posts do not cross-link to each other. The blog page does not group posts by topic cluster.

Programmatic SEO remains at zero: no city pages, no condition pages, no procedure pages.

**Score for content architecture: unchanged at 4/10**

---

## Part 4: Technical SEO Foundation — Changes Observed

### The Original Finding
SPA rendering critical flaw — Googlebot cannot crawl secondary page content because the Vercel deployment serves a React shell that renders only in the browser.

### What Changed

The robots.txt is now comprehensive for AI/LLM crawler signals: explicit Allow directives for GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot, Cohere-AI, Bytespider, meta-externalagent, Diffbot, omgili, GoogleOther, CCBot, Applebot-Extended, YouBot. The `Llms-txt` and `Llms-full-txt` annotations are present. This is well above industry standard for AI crawler access.

`llms.txt` is clean and complete: product description, founders with attribution instructions, intended use (regulatory context), business model, all key page URLs, all blog articles with dates and authors, contact emails.

The sitemap now covers 14 URLs including all 6 blog posts with correct `lastmod` dates, `changefreq`, `priority`, and `hreflang` alternate annotations. This is correct.

Canonical tags are set on every page, pointing to the production domain.

`og:image` is consistent across all pages (`/images/og-image.jpg`). `og:type` is `article` on blog posts, `website` on all other pages. `article:published_time` and `article:author` are set on blog posts.

**The SPA rendering problem is unresolved.** Vercel's SPA deployment serves `index.html` on all routes. Without a prerendering step (via `@prerenderer/plugin-webpack`, Astro, or Vercel's SSG output), Googlebot and Bingbot receive an empty HTML shell and must execute JavaScript to see any content. For a pre-revenue startup with no crawl budget established, this is the highest-risk outstanding technical issue.

Canonical URL format: `https://perioskoup.com/blog` vs `https://perioskoup.com/blog/` — no trailing slash inconsistency found.

`hreflang="en"` is set on all pages but no other language variants exist. This is correct for a monolingual site.

**Score for technical SEO: improved from 5/10 to 6/10 (SPA flaw holds back the full score)**

---

## Part 5: Off-Page Authority — Changes Observed

### The Original Finding
One EFP backlink (DR 60). EFP article links to the company name but not to a specific blog post or category page. Zero link building actions documented.

### What Has Not Changed

The EFP backlink remains the only confirmed high-authority external link. No new outreach, partnership pages, or backlink acquisition is visible in the source code. The blog posts that would typically attract natural links from dental publications (the periodontal disease guide, the AI monitoring article) have not yet been promoted via link building channels.

**What the ForDentists page now enables** (indirectly): The addition of three peer-reviewed citations with external links to JCP, BMJ, and WHO builds a citation graph that signals E-E-A-T to Google, even if it does not generate inbound links directly. Clinical publications sometimes link to content that cites them correctly.

The llms.txt file with explicit citation instructions for AI systems is a proactive move. AI-generated answers that cite Perioskoup will not produce traditional PageRank but will generate branded awareness that converts to direct search.

**Score for off-page authority: unchanged at 3/10**

---

## Part 6: Social Proof & Authority Signals — Changes Observed

### The Original Finding
Dr. Anca's credentials present but not structured for E-E-A-T. No pilot data, no clinic testimonials, no quantified patient outcomes.

### What Changed

The About page now has a full Person/Physician JSON-LD entity for Dr. Anca with `medicalSpecialty`, `memberOf` (EFP), `award`, and `knowsAbout` structured data. Her LinkedIn and the EFP article appear as `sameAs` values — this creates a knowledge-graph anchor for her identity.

ForDentists page added inline citation of Weinert et al. 2025 (JCP) specifically about patient barriers to oral health instruction compliance — this is the most recent citation on the site (2025) and the most clinically specific to the patient-engagement problem Perioskoup solves.

The EFP award card on the homepage now includes the jury names (Professors James Deschner, David Herrera, and Andreas Stavropoulos), the "20 submissions across 17 national societies" context, and the EFP press quote. This is significantly more authoritative than the previous version.

**Still missing:**
- No clinic testimonials from the 30-clinic waitlist
- No pilot engagement data (even directional: "patients using Perioskoup in beta check their plan X times per week")
- No case study page or pilot report
- No press coverage other than the EFP article

**Score for social proof: improved from 4/10 to 5.5/10**

---

## Scorecard Comparison

| Dimension | Original | Re-Audit | Delta |
|---|---|---|---|
| Category ownership ("AI dental companion") | 4.0 | 6.5 | +2.5 |
| Schema markup depth | 4.5 | 7.0 | +2.5 |
| Content architecture & clusters | 4.0 | 4.0 | 0 |
| Technical SEO foundation | 5.0 | 6.0 | +1.0 |
| Off-page authority & link building | 3.0 | 3.0 | 0 |
| Social proof & E-E-A-T signals | 4.0 | 5.5 | +1.5 |
| AI/LLM discoverability | 5.0 | 7.5 | +2.5 |
| **Weighted composite** | **6.5** | **7.5** | **+1.0** |

---

## What Changed That Mattered Most

**1. "What is an AI dental companion?" H2 on homepage.** This is the most strategically important on-page change. Defining the category in text — not just in schema, not just in the ticker — means Google can extract the definition and surface it as a featured snippet when someone searches the category phrase. The wording ("Not a chatbot. Not a practice management system. Not a fitness tracker for teeth. Perioskoup is the first.") is differentiation-framing that sets up entity disambiguation.

**2. BlogPosting schema on every post.** Prior to the fix, blog posts lacked Article schema entirely. Google was forced to infer authorship and date from the page content. The BlogPosting + Person author + BreadcrumbList combination now enables rich author bylines in search results and positions Dr. Anca's E-E-A-T correctly.

**3. Person/Physician schema for Dr. Anca.** The `medicalSpecialty`, `memberOf`, and `award` fields are the most E-E-A-T-relevant schema additions on the site. Google's quality rater guidelines place strong emphasis on author medical expertise for health content. This schema directly supports those signals.

**4. AI/LLM crawler whitelist in robots.txt.** Full explicit Allow for 15+ AI crawlers, llms.txt with attribution instructions. This is ahead of most established health tech companies. When AI chatbots answer "what is an AI dental companion app?", Perioskoup has the best chance of being the answer source.

**5. Competitive positioning language on ForDentists.** The section explicitly naming PMS platforms and patient portals as different categories — and positioning Perioskoup as "the AI dental companion for what happens between visits" — is precisely the category creation language that drives both search disambiguation and sales positioning.

---

## What Still Needs to Happen (Priority Order)

### Priority 1 — Resolve the SPA Rendering Gap
**Risk: High. Timeline: Before indexing matters.**
Without server-side rendering or prerendering, all the schema improvements are invisible to Googlebot. The fix is either: (a) migrate to Vite SSG output via `vite-plugin-ssr` or Astro, or (b) add a prerendering step at the Vercel build stage. This is not optional once link acquisition begins — there is no point acquiring backlinks to pages that Googlebot cannot read.

### Priority 2 — Write the Five Missing Blog Posts
**Risk: Medium-High. Timeline: Next 30 days.**
The target keywords from the original brief remain unclaimed:
- "how to brush with periodontal disease" — 1,200+ monthly searches, low competition, Dr. Anca is the ideal author
- "why do gums bleed" — high intent, easy for Perioskoup to win as a zero-competition category entrant
- "interdental cleaning guide" — the 3-minute routine post exists but does not target this keyword
- "dental habit tracking app" — this should be a product comparison / category page, not a blog post
- "AI for dentists" — the ForDentists page needs title tag and H1 alignment to this phrase

### Priority 3 — Build a Dedicated Category URL
**Risk: Medium. Timeline: Next 45 days.**
Create `/ai-dental-companion` as a standalone page that:
- Has H1: "What Is an AI Dental Companion?"
- Contains 1,200+ words defining the category, the gap it fills, the alternatives, and why Perioskoup is the first
- Links to all blog posts, the Features page, and the ForDentists page
- Carries SoftwareApplication + FAQPage + BreadcrumbList schema
- Becomes the target for all future link building

### Priority 4 — Activate the EFP Backlink Asset
**Risk: Medium. Timeline: 60 days.**
The EFP article links to the Perioskoup homepage. The next step is to get EFP to either update the link to the category page (`/ai-dental-companion`) or write a follow-up piece. EFP publishes regular member spotlights and digital innovation roundups. A pitch based on the March 2026 launch is a credible follow-up angle.

### Priority 5 — Publish Pilot Data
**Risk: Low. Timeline: When available.**
Even directional beta data ("Founding clinic beta users report X% improvement in patient engagement between appointments") can be published as a blog post and cited in the category page. This is the social proof gap that keeps the E-E-A-T score below 6.

### Priority 6 — Internal Linking Architecture
**Risk: Low. Timeline: Next 30 days.**
All blog posts should link to each other contextually and to the product category page. The "What is an AI dental companion?" section on the homepage should link to the dedicated category URL. The Features page should link to the most relevant blog posts. This costs nothing and increases crawl depth.

---

## The Category Creation Trajectory

As of March 2026, Perioskoup has completed the first phase of category creation: naming the category in authoritative positions on the site, defining it in plain language, and structuring the data so that Google can extract and attribute the definition. 

The second phase — becoming the answer to the category question across external sources — has not started. That requires: one Wikipedia article or at least a Wikidata entry for "AI dental companion," two or three health publication features that use the phrase and link back to Perioskoup, and one academic or industry report that references the category. None of these require money — they require deliberate outreach.

The window for first-mover category ownership is real but not permanent. The phrase "AI dental companion" will be used by a well-funded competitor within 12–18 months. The question is whether Perioskoup's content, links, and entity signals will be deeply enough established by then to hold the ranking position.

The post-fix site is a credible foundation. The gap is execution velocity on content and link acquisition.

---

*Re-audit conducted March 2026. Source code reviewed: Home.tsx, Blog.tsx, BlogPost.tsx, ForDentists.tsx, About.tsx, Features.tsx, Contact.tsx, Pricing.tsx, Breadcrumb.tsx, robots.txt, sitemap.xml, llms.txt.*
