# Perioskoup — Niche Domination Cycle 2 Audit
**Audit Type:** Niche Domination / SEO / Content Strategy — Third Pass  
**Previous Scores:** 6.5 (original) → 7.5 (re-audit)  
**Cycle 2 Score: 7.5 / 10**  
**Date:** 2026-03-06  
**Auditor:** Niche Domination Strategist  

**Verdict:** The site has held its re-audit score but not advanced. The foundational on-page signals for "AI dental companion" are solid: the category phrase appears in the title tag, H2, product subhead, Features H1, About body, and ForDentists competitive positioning. Schema depth is strong — BlogPosting, Person/Physician, SoftwareApplication, FAQPage, BreadcrumbList, Organization, and ItemList schemas are all present. The ceiling is the same as it was in the re-audit: no new blog posts have been published, no programmatic pages exist, no link acquisition has started, no pilot data is available, and the SPA rendering gap remains. The score does not move until execution begins on content and links. The window for first-mover category ownership is open but finite.

---

## Status vs Previous Audits

| Dimension | Original | Re-Audit | Cycle 2 | Net Change |
|---|---|---|---|---|
| Category ownership ("AI dental companion") | 4.0 | 6.5 | 6.5 | 0 from re-audit |
| Schema markup depth | 4.5 | 7.0 | 7.0 | 0 |
| Content architecture and clusters | 4.0 | 4.0 | 4.0 | 0 |
| Technical SEO foundation | 5.0 | 6.0 | 6.0 | 0 |
| Off-page authority and link building | 3.0 | 3.0 | 3.0 | 0 |
| Social proof and E-E-A-T signals | 4.0 | 5.5 | 5.5 | 0 |
| AI/LLM discoverability | 5.0 | 7.5 | 7.5 | 0 |
| Programmatic SEO | 0.0 | 0.0 | 0.0 | 0 |
| **Weighted composite** | **6.5** | **7.5** | **7.5** | **0** |

No dimension has moved since the re-audit. What the re-audit called "the second-tier execution layer" has not been entered. The strategy is correct; the execution is at zero.

---

## Part 1: Category Ownership — "AI Dental Companion"

### Current State (Confirmed from Source)

The category phrase "AI dental companion" appears in the following positions:

**Homepage (Home.tsx):**
- Title tag: "Perioskoup | AI Dental Companion App | Between-Visit Dental Care"
- Product subhead paragraph (line 102): "Perioskoup is a free AI dental companion app"
- Section H2 (line 267): "What is an AI dental companion?"
- Category definition paragraph (line 277): "Perioskoup is the first."
- Blog page waitlist CTA body (line 246): "The AI dental companion launching March 2026."

**Features page (Features.tsx):**
- Title tag: "AI Dental Companion App Features | Habit Tracking & Care Plans | Perioskoup"
- H1 (line 72): "AI dental companion features — everything between your visits."
- Feature grid description (line 96): "single AI dental companion app"

**ForDentists page (ForDentists.tsx):**
- Competitive positioning section (line 248): "the AI dental companion for what happens between visits"
- Problem section (line 122): "Perioskoup is the AI dental companion that extends your care"

**About page (About.tsx):**
- Why Now section (line 240): "making the AI dental companion possible for the first time"
- Why Now paragraph (line 247): "an AI dental companion built for a world where care doesn't end"

### What Is Still Missing

**No dedicated URL.** The most consequential gap. There is no page at `/ai-dental-companion` or `/what-is-an-ai-dental-companion`. The "What is an AI dental companion?" section on the homepage cannot rank independently because it shares the homepage URL with all other homepage content. A standalone page at this URL would:
- Carry a dedicated title tag and H1 for the category-definition query
- Attract internal links from every other page
- Become the canonical target for all external link building
- Function as a pillar page for the entire content cluster

**No Wikipedia or Wikidata entry.** The category "AI dental companion" does not exist as a Wikipedia article or Wikidata entity. This means there is no external encyclopedic source defining the category, and Google cannot reference a knowledge-graph anchor when answering the query "what is an AI dental companion?" Perioskoup should either create a Wikidata entity (Q-item) with properties linking to the EFP article as a reference, or pitch a stub to Wikipedia's "dental technology" talk page.

**Category phrase not in H1 on any page.** All occurrences are in H2s, paragraphs, and title tags. The highest-authority on-page position — H1 — does not carry the phrase. The Features page H1 reads "AI dental companion features" which is close but the Features page is not the right home for the category definition. The dedicated category URL would fix this.

**ForDentists title tag mismatch.** The ForDentists page title is "Dental Patient Engagement App for Clinicians | Perioskoup" — not "AI for Dentists | Perioskoup". The page content qualifies to rank for "AI for dentists" but the title tag does not signal it. A title tag update to "AI for Dentists | Patient Engagement Platform | Perioskoup" costs nothing.

---

## Part 2: Content Architecture and Gap Analysis

### Blog Posts That Exist (6 posts, unchanged)

| Slug | Target Keyword Coverage | Cluster Position |
|---|---|---|
| what-is-periodontal-disease | Periodontal disease definition | Potential pillar |
| efp-digital-innovation-award-2025 | Brand news | Standalone |
| how-ai-is-changing-dental-monitoring | AI dental monitoring | Cluster article |
| 3-minute-routine-save-teeth | Interdental cleaning, daily routine | Cluster article |
| why-patients-forget-instructions | Clinical insight | Cluster article |
| building-the-bridge-perioskoup-story | Founder story | Standalone |

### Target Keywords That Have No Coverage

The five keywords from the original brief remain completely uncovered after two audit cycles:

**"how to brush with periodontal disease"** — Estimated 1,200–2,400 searches/month, low competition. Dr. Anca is the ideal author. The "what-is-periodontal-disease" post references brushing but does not answer the specific technique question for periodontitis patients. This is a high-intent, high-conversion query: someone searching this is a confirmed periodontal patient actively seeking home-care guidance — the exact Perioskoup patient persona.

**"why do gums bleed"** — Estimated 3,600–9,000 searches/month depending on locale, very low competition. Short informational query with high clickthrough potential. An authoritative 800-word post by Dr. Anca would rank within 60–90 days for a zero-competition site in a zero-competition category. The "what-is-periodontal-disease" post mentions bleeding gums but does not target the query as its primary keyword.

**"interdental cleaning guide"** — The "3-minute-routine" post discusses interdental brushes but is not optimised for this keyword. The slug is "3-minute-routine-save-teeth" — it will not rank for "interdental cleaning guide" because the URL, title tag, H1, and meta description all signal a different topic. A standalone post targeting this query is needed.

**"dental habit tracking app"** — Zero coverage. This should not be a blog post — it should be a product comparison landing page at `/dental-habit-tracking-app` that: defines the category, compares Perioskoup to alternatives (habit-tracking apps, patient portals, reminder apps), demonstrates that Perioskoup is the only one built specifically for dental/periodontal care, and includes a CTA for the waitlist. This page could become the second-highest-traffic landing page after the homepage.

**"AI for dentists"** — The ForDentists page partially covers this but is not optimised for it. The title tag targets "Dental Patient Engagement App for Clinicians" — a lower-volume, more competitive phrase. Updating the title tag and H1 to target "AI for dentists" with a subtitle explaining the specific use case would cost one line of code and could materially improve ranking position.

### Competitors and Their Content Gaps

Potential competitor content that Perioskoup should preemptively own before they enter the category:

| Competitor Content Gap | Perioskoup Counter-Content |
|---|---|
| "AI dental companion app" comparison pages | Dedicated category page at /ai-dental-companion |
| Dental AI for patient engagement | ForDentists page title tag fix |
| Gum disease home care guides | "How to brush with periodontal disease" post |
| Bleeding gums causes | "Why do gums bleed" post |
| Oral hygiene habit apps | "/dental-habit-tracking-app" product page |
| EFP award winners list | Blog post optimised for "EFP Digital Innovation Award" queries |

The most dangerous gap is the absence of any content ranking for transactional patient queries ("how to brush with periodontal disease", "why gums bleed"). These are the queries where Perioskoup's target patient finds the product organically. Without ranking for them, customer acquisition depends entirely on direct/branded traffic and clinic referrals.

### Content Cluster Architecture (Not Yet Built)

The correct content architecture for niche domination has three tiers. None of it is built.

**Pillar 1: AI Dental Companion (Category)**
- Pillar page: `/ai-dental-companion` (1,500+ words, defines the category, links to all supporting articles)
- Supporting: `/dental-habit-tracking-app` (product comparison)
- Supporting: `/features` (already exists, needs linking)
- Supporting: blog/how-ai-is-changing-dental-monitoring (already exists, needs internal link)

**Pillar 2: Periodontal Health for Patients**
- Pillar page: `/blog/what-is-periodontal-disease` (already exists, needs expansion to 2,000+ words)
- Supporting: blog post "why do gums bleed" (not written)
- Supporting: blog post "how to brush with periodontal disease" (not written)
- Supporting: blog post "interdental cleaning guide" (not written — "3-minute-routine" is adjacent but not it)
- Supporting: blog post "periodontal maintenance between visits" (not written)

**Pillar 3: AI in Dental Practice (B2B)**
- Pillar page: `/for-dentists` (already exists, needs title tag and H1 fix for "AI for dentists")
- Supporting: blog post "AI for dentists: what's real in 2026" (not written)
- Supporting: blog post "how to improve patient engagement between dental appointments" (not written)
- Supporting: case study page with pilot clinic data (not written — data not yet available)

**Internal Linking: Currently at Zero**

Blog posts do not link to each other. No post links to a pillar page. The "What is an AI dental companion?" section on the homepage does not link to a category URL (none exists). The Features page does not link to related blog posts. The ForDentists page does not link to supporting articles.

Internal links cost nothing to add, signal topical authority to Google, and increase crawl depth. This is the highest-ROI immediate action available.

---

## Part 3: Schema Markup — Current Coverage

### Confirmed Present

| Page | Schema Types |
|---|---|
| Home | FAQPage |
| Features | FAQPage |
| ForDentists | FAQPage |
| About | Person/Physician, FAQPage |
| Contact | Organization |
| Pricing | SoftwareApplication, FAQPage |
| Blog | ItemList, FAQPage |
| BlogPost | BlogPosting, BreadcrumbList, FAQPage (conditional) |

### What Is Missing

**WebSite schema with SearchAction on homepage.** This enables the Google Sitelinks search box — a SERP feature that appears when someone searches branded queries like "perioskoup". The schema is a four-line addition to Home.tsx. Without it, the sitelinks search box cannot trigger.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://perioskoup.com/#website",
  "name": "Perioskoup",
  "url": "https://perioskoup.com/",
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

**MedicalOrganization type.** The Contact page carries `Organization` schema. For a health technology company with a periodontist co-founder, `MedicalOrganization` is the more specific and more E-E-A-T-relevant type. Google's Medical Knowledge Graph uses MedicalOrganization to establish health-sector credibility. This is a one-word change in Contact.tsx.

**HowTo schema on the "3-minute-routine" post.** The post describes a step-by-step process. HowTo schema enables rich results in the form of a numbered instruction card in Google Search — dramatically higher CTR than a standard blue link. The post structure (three numbered steps with descriptions) maps directly to HowTo schema.

**MedicalWebPage on patient education posts.** The "what-is-periodontal-disease" post qualifies for `MedicalWebPage` schema with `medicalAudience: Patient` and `lastReviewed` by Dr. Anca. This signals health content quality to Google and may influence health content filters.

**VideoObject schema.** If any video content exists or is planned, VideoObject schema enables video-rich results. Not currently applicable but should be planned for future product demo videos.

**Author @id cross-reference inconsistency.** BlogPosting schema references Dr. Anca with an `@id` pointing to her entity definition on the About page. However, Eduard Ciugulea's blog posts (EFP award article, AI monitoring article) reference him without an `@id` — he has no structured Person entity defined anywhere on the site. This creates an incomplete author graph. A Person schema block for Eduard should be added to the About page schema alongside Dr. Anca's block.

---

## Part 4: Link Building Opportunities

### What Exists

One inbound link: the EFP article at efp.org (DR 60+), linking to the homepage. This link is the most valuable asset the site has and is currently underutilised — it points to the homepage rather than to the category page or a specific piece of content that would benefit from the authority transfer.

### High-Priority Link Targets (Not Started)

**EFP follow-up pitch.** EFP publishes: Digital Innovation Award retrospectives, member spotlight articles, and "digital tools for periodontists" roundup content. A pitch based on the March 2026 public launch — framed as "award winner ships product" — is a credible news angle. The goal is a second EFP article linking to `/ai-dental-companion` or `/for-dentists`. EFP articles are DR 60+; one additional link from this domain would approximately double Perioskoup's current link equity.

**Dental school outreach.** Dental schools with active digital health research programs publish student and faculty blogs. A guest post by Dr. Anca on the topic of "patient engagement in periodontal maintenance" — citing her EFP award and Perioskoup as the applied example — is a viable angle for schools in Romania, the UK, Germany, and the Netherlands. Target: 3–5 EDU domain links within 90 days.

**Haleon partnership page.** The EFP award was sponsored by Haleon (Sensodyne, parodontax). Haleon's oral health content team publishes dental professional resources. Perioskoup's award win, sponsored by Haleon, is a direct hook for a co-authored article or a mention in their dental professional resources. One Haleon link would be DR 70+.

**J Clinical Periodontology.** Perioskoup cites Weinert et al. 2025 (JCP) on the ForDentists page. A brief letter to the editor of JCP — noting that the paper's findings about patient barriers align with Perioskoup's approach, and referencing the EFP award — is a viable tactic. Academic publications sometimes link to applied implementations of research they've published.

**Healthline / WebMD / Verywell Health.** These publications maintain "dental apps" and "oral health tools" listicle content. Perioskoup's EFP award provides the credibility hook to request inclusion in their "best dental apps" or "dental AI tools" articles. These are DR 80+ domains. One inclusion per publication would represent a step-change in domain authority.

**ProductHunt launch.** A ProductHunt launch on public launch day (March 2026) generates: a DR 90 backlink from producthunt.com, social amplification, and a structured product listing that ranks for brand queries. Perioskoup has not launched on ProductHunt.

**G2 / Capterra / GetApp profile.** SaaS review platforms have DR 80–90. A free Perioskoup listing on G2 or Capterra creates: a high-authority backlink, social proof infrastructure for future reviews, and a ranking page for "Perioskoup review" branded queries. Not started.

**Romanian health tech media.** As a Romanian SRL with an EFP award, Perioskoup is a strong story for Romanian tech and health publications (StartupCafe.ro, TechCafe.ro, wall-street.ro). These provide mid-tier DR links (DR 30–50) and local brand signals.

**European dental association directories.** Multiple European national periodontal societies (British Society of Periodontology, Deutsche Gesellschaft für Parodontologie, Société Française de Parodontologie) maintain "digital tools" or "member resources" sections. As an EFP award winner, Perioskoup qualifies for inclusion. Each inclusion provides a DR 40–60 link plus visibility to the exact clinical audience the product serves.

### Link Building Priority Matrix

| Target | DR | Effort | Timeline | Value |
|---|---|---|---|---|
| EFP follow-up article | 60+ | Medium | 30 days | Very High |
| ProductHunt launch | 90 | Low | Launch day | High |
| Haleon oral health content | 70+ | High | 60 days | Very High |
| G2 / Capterra listing | 80–90 | Low | 7 days | High |
| European dental associations | 40–60 | Medium | 45 days | Medium-High |
| Dental school guest posts | 50–70 | High | 60–90 days | High |
| Romanian tech media | 30–50 | Low | 14 days | Medium |
| Health publications (Healthline etc.) | 80–90 | High | 90 days | Very High |

---

## Part 5: PR and Media Angles

### Angles Not Yet Activated

**"Romanian dental startup wins European award and ships in 12 months."** The arc from EFP award (May 2025) to product launch (March 2026) is a 10-month build. This is a compelling startup story with a specific European dental institution as the third-party credibility source. Relevant outlets: TechCrunch (health tech vertical), MedCity News, Healthcare IT News, Digital Health Insider, Mobihealthnews.

**"The 80% problem: why patients forget dental instructions."** A research-backed editorial pitch based on the Kessels 2003 stat (cited on the site) could be placed in dental trade publications as a guest article by Dr. Anca. Dentist-facing trades: Dental Tribune, Dentistry Today, BDJ In Practice, Dental Economics. These typically accept guest articles and provide DR 40–60 links.

**"AI companion apps: the next frontier in preventive dentistry."** A technology trend piece positioning the "AI dental companion" category — with Perioskoup as the leading example — placed in a dental industry publication. This generates a link and primes the phrase for search indexing in trade publication archives.

**EFP Award announcement as a press release.** A press release distributed through a wire service (PRNewswire, EIN Presswire) creates indexed content on high-DR news aggregators, even if the links are nofollow. The EFP award is a legitimate news event that has not been distributed as a press release. The news is now 10 months old — the public launch is the new news hook that justifies a press release.

**Dr. Anca as a source for dental health journalists.** Registering Dr. Anca on HARO (Help a Reporter Out) / Connectively and Qwoted positions her as a quotable expert for journalists covering dental health, AI in healthcare, and patient engagement. A single journalist placement in a major health publication generates a DR 70+ backlink.

---

## Part 6: Social Proof and E-E-A-T Signals

### Currently Present

- Dr. Anca's Person/Physician schema with EFP award and medicalSpecialty
- EFP quote on homepage and About page ("Perioskoup is an innovative digital tool...")
- Jury names (Deschner, Herrera, Stavropoulos) in EFP award card
- "20 submissions across 17 national societies" competitive context
- Three peer-reviewed citations with DOI links on ForDentists
- Three peer-reviewed citations with DOI links on About and ForDentists stats sections
- WHO citation on ForDentists CTA section

### Gaps (Unchanged Since Re-Audit)

**No clinic testimonials.** The 30-clinic waitlist represents 30 potential testimonials. Even a pre-launch quote — "I've seen the demo and this is what my patients need" from one clinic director — would be more valuable than the current zero. Testimonials from named clinicians with their practice name and location are E-E-A-T signals.

**No patient testimonials.** Any beta patient who has used a prototype or pilot version could provide a testimonial. Even one real patient quote with a first name and city would demonstrate product reality.

**No pilot data.** The re-audit identified this as Priority 5. The March 2026 launch month has arrived. Any beta engagement data — even directional ("beta participants check their plan an average of 4.2 times per week") — is publishable as a blog post and quotable on the homepage. This data would be the single most impactful social proof addition.

**No press page.** A `/press` page collecting: the EFP article, any media coverage, press kit assets (logo files, founder headshots, company description), and contact for press inquiries would signal media credibility to journalists and provide a canonical page for press coverage to link to.

**Eduard Ciugulea's credentials are not structured.** His bio describes him as "full-stack engineer and growth strategist" — accurate but not distinguished. His GitHub profile, LinkedIn, or any published technical work should be surfaced as sameAs URLs in a Person schema block to give him an entity anchor.

---

## Part 7: Programmatic SEO

### Current State: Zero

No programmatic pages exist. The sitemap has 14 URLs. For comparison, a mature SEO-optimised health tech product would have 200–2,000 indexed pages by launch.

### Near-Term Programmatic Opportunities (Achievable in 90 Days)

**Condition pages.** Periodontal disease has multiple named conditions with independent search volume:
- `/gum-disease` (redirect to or alias of periodontal disease content)
- `/gingivitis` ("what is gingivitis", "gingivitis vs periodontitis")
- `/periodontitis` (specific advanced stage)
- `/gum-recession` ("why are my gums receding")
- `/bleeding-gums` (highest consumer search volume in this cluster)

Each of these can be a standalone page or a blog post. As standalone pages with their own title tags and dedicated URLs, they accumulate authority independently. As blog posts, they remain inside the blog URL structure and are harder to promote as product pages.

**City/country pages.** Not yet applicable — Perioskoup does not have a geographically scoped service. However, once the app launches in specific markets, city pages for large European dental markets (London, Paris, Berlin, Bucharest, Amsterdam, Stockholm) become programmatic opportunities: "AI dental companion in [city]" or "find a periodontist using Perioskoup in [city]".

**Procedure pages.** Periodontal procedures that patients search:
- `/periodontal-maintenance` (maintenance programme between visits)
- `/scaling-and-root-planing` (most common periodontal procedure)
- `/gum-disease-treatment` (patient-facing)
- `/interdental-cleaning` (home care procedure)

These pages would define each procedure, explain what happens between appointments, and position Perioskoup as the tool that makes the between-appointment period more effective.

**"Best [category] app" pages.** Self-authored comparison pages:
- `/dental-habit-tracking-app` (vs. generic habit trackers)
- `/periodontal-care-app` (category page)
- `/patient-dental-app` (broader category)

These pages target bottom-of-funnel queries from patients actively evaluating options. They should be written as honest comparisons that demonstrate Perioskoup's unique positioning (built specifically for dental/periodontal care, clinician-connected, EFP awarded).

---

## Part 8: Partnership Pages (Not Implemented)

### Pages That Should Exist

**`/partners/efp`** — An EFP partnership page would:
- Display the award prominently
- Describe the relationship between Perioskoup and EFP
- Link to the EFP article (already done inline across the site, but not in a dedicated page)
- Include a reciprocal link request back to the EFP article
- Provide a landing page for EFP members discovering Perioskoup

**`/partners/dental-schools`** — An institutional partnership page for dental schools using Perioskoup in curricula or research would signal academic credibility. Even a "partner with us" page describing the dental school programme creates a URL to target in outreach.

**`/partners/insurance`** — As a preventive health tool, Perioskoup is aligned with dental insurance ROI (prevented disease = reduced claims). A partnership page for insurance company integrations creates a new B2B sales channel and a relevant landing page.

**`/press`** — See Part 6. A press page is a basic requirement for a company that wants media coverage.

---

## Part 9: 90-Day Content Calendar

The calendar below assumes the SPA rendering issue is resolved or content is published in a format that Googlebot can index. All timelines are from March 6, 2026.

### Week 1–2 (March 6–20)

**Action 1: Fix ForDentists title tag (1 line of code)**
Change: "Dental Patient Engagement App for Clinicians | Perioskoup"
To: "AI for Dentists | Patient Engagement Between Appointments | Perioskoup"
Impact: Enables the ForDentists page to rank for "AI for dentists" queries.

**Action 2: Add WebSite schema to Home.tsx (4 lines)**
Add the SearchAction WebSite schema block.
Impact: Enables sitelinks search box for branded queries.

**Action 3: Add MedicalOrganization type to Contact.tsx (1 word)**
Change: `"@type": "Organization"` to `"@type": "MedicalOrganization"`.
Impact: Stronger E-E-A-T signal for health content quality assessment.

**Action 4: G2 / Capterra listing (external action, 2 hours)**
Create a free product profile on G2 and Capterra.
Impact: DR 80–90 backlinks, social proof infrastructure.

**Action 5: ProductHunt launch scheduling (external action)**
Schedule a ProductHunt launch for March 2026 public launch date.
Impact: DR 90 backlink, social amplification.

### Week 3–4 (March 20 – April 3)

**Blog post: "Why do gums bleed? A periodontist explains"**
Author: Dr. Anca Laura Constantin
Target keyword: "why do gums bleed" (and variants: "bleeding gums causes", "gums bleeding when brushing")
Length: 800–1,200 words
Schema: BlogPosting + FAQPage + MedicalWebPage
Internal links: Link to "what-is-periodontal-disease", link to "3-minute-routine", link to Features page

**Blog post: "How to brush your teeth with periodontal disease"**
Author: Dr. Anca Laura Constantin
Target keyword: "how to brush with periodontal disease"
Length: 1,000–1,500 words
Schema: BlogPosting + HowTo + FAQPage
Internal links: Link to "interdental cleaning guide" (once written), link to "what-is-periodontal-disease"

### Week 5–6 (April 3–17)

**Create `/ai-dental-companion` category page**
This is the most strategically important page not yet built.
H1: "What Is an AI Dental Companion?"
Length: 1,500–2,000 words
Content: Category definition, the gap it fills, what differentiates it from chatbots / habit apps / patient portals, why now, Perioskoup as the first in category
Schema: FAQPage + SoftwareApplication + BreadcrumbList
Internal links: Link to Features, ForDentists, Blog, all relevant posts
External links target: All link building activity should target this URL going forward

**EFP outreach pitch (external action)**
Draft a pitch for a second EFP article based on the March 2026 launch. Frame as: "EFP award winner ships product — here's what happened in the 10 months since Vienna."
Target: efp.org article linking to `/ai-dental-companion`

### Week 7–8 (April 17 – May 1)

**Blog post: "Interdental cleaning guide: which tool is right for you?"**
Author: Dr. Anca Laura Constantin
Target keyword: "interdental cleaning guide" (and "interdental brushes vs floss", "how to use interdental brushes")
Length: 1,200–1,800 words
Schema: BlogPosting + HowTo + FAQPage
Note: The "3-minute-routine" post should be updated to link here with anchor text "interdental cleaning guide."

**Create `/dental-habit-tracking-app` product comparison page**
This is the bottom-of-funnel product page for patients actively evaluating.
H1: "Dental Habit Tracking App — Why Perioskoup Is Built Different"
Length: 1,000–1,500 words
Content: What dental habit tracking apps exist, why generic habit apps fail for dental health, what Perioskoup adds (clinician connection, periodontal-specific content, EFP validation)
Schema: FAQPage + SoftwareApplication + BreadcrumbList

### Week 9–10 (May 1–15)

**Blog post: "AI for dentists: what's actually useful in 2026"**
Author: Eduard Ciugulea (technology perspective)
Target keyword: "AI for dentists"
Length: 1,200–1,800 words
Content: Categories of AI in dental practice (imaging AI, scheduling AI, patient engagement AI), what is real vs. hype, where Perioskoup fits
Internal links: Link to ForDentists page, link to "how-ai-is-changing-dental-monitoring"
Note: This post, combined with the ForDentists title tag fix, creates two signals for the "AI for dentists" query.

**European dental association outreach (external action)**
Identify 5–8 European national periodontal societies with "digital tools" or "member resources" sections. Submit Perioskoup for inclusion, citing EFP award. Target: 3 listings within 30 days.

### Week 11–13 (May 15 – June 6)

**Blog post: "How to improve patient engagement between dental appointments"**
Author: Dr. Anca Laura Constantin
Target keyword: "improve patient dental engagement", "patient engagement dental practice"
Length: 1,000–1,500 words
Audience: Dental professionals (B2B content)
Internal links: Link to ForDentists page as the product CTA
Note: This post targets a dentist query, meaning it will attract the exact buyer the product serves.

**Pilot data blog post (if data available)**
Author: Eduard Ciugulea or Dr. Anca
Title: "What We Learned From Our First 30 Founding Clinics" (or equivalent)
Content: Engagement data from the beta, patient feedback themes, what worked, what is being iterated
Impact: This single post would be the most E-E-A-T-relevant content on the site — real outcomes from real users.

**Press page creation**
Create `/press` with EFP article embed, press kit download, founder headshots, and press contact.

**Internal linking audit**
Once the above posts exist, conduct a full internal linking pass: every new post links to two existing posts, every existing post links to at least one new post, and the category page links to everything in the cluster.

---

## Part 10: The SPA Rendering Issue — Unchanged Risk

Every content and link building action in this audit has reduced effectiveness until the SPA rendering gap is resolved. Googlebot receives an empty HTML shell for all routes except the homepage (which may also be affected depending on crawl timing). Rich results from schema cannot render. Blog post rankings cannot accrue.

The three options remain:

**Option A: Vite SSG prerendering.** The `vite-plugin-ssr` (now `vike`) or `vite-ssg` package prerenders all known routes to static HTML at build time. This is the closest-to-current-architecture solution. Build time increases but the output is fully indexable static HTML that Vercel serves directly.

**Option B: Migrate to Astro.** Astro generates static HTML for all content pages and hydrates client-side components selectively. The React components can be reused. This is a larger migration but produces the best possible technical SEO output.

**Option C: Vercel Edge Middleware prerendering.** Vercel's Edge Middleware can intercept bot user-agents and serve a prerendered version. This is more complex to implement correctly but requires no framework migration.

Option A is the minimum viable fix. Option B is the correct long-term architecture for a content-heavy health tech site that will eventually have 100+ indexed pages.

---

## What Would Move the Score to 9/10

The path from 7.5 to 9.0 requires:

1. Resolve the SPA rendering gap (technical prerequisite for everything else)
2. Create the `/ai-dental-companion` category page and make it the link-building target
3. Publish the four missing blog posts (bleeding gums, brushing technique, interdental guide, AI for dentists)
4. Fix the ForDentists title tag
5. Add WebSite + SearchAction schema to the homepage
6. Launch on ProductHunt and create G2/Capterra profiles (low-effort, high-DR links)
7. Execute one EFP follow-up pitch for a second editorial link
8. Add HowTo schema to the 3-minute-routine post
9. Build internal links between all existing and new posts
10. Publish pilot/beta data as a blog post

None of these actions require money. All require time. The category window is open — the question is whether execution velocity matches the opportunity before a well-funded competitor discovers the same gap.

---

## Scorecard

| Dimension | Score | Rationale |
|---|---|---|
| Category ownership | 6.5/10 | Category phrase planted in all key on-page positions; no dedicated URL, no H1, no external category definition |
| Schema markup depth | 7.0/10 | Strong coverage; missing WebSite/SearchAction, MedicalOrganization, HowTo on 3-minute post, Eduard Person entity |
| Content architecture | 4.0/10 | Six standalone posts, no cluster architecture, no pillar pages, no internal links, five target keywords uncovered |
| Technical SEO | 6.0/10 | SPA rendering gap unresolved; all other fundamentals solid |
| Off-page authority | 3.0/10 | One EFP backlink; no link acquisition activity in evidence |
| Social proof and E-E-A-T | 5.5/10 | Strong schema-level E-E-A-T; zero pilot data, zero clinic testimonials |
| AI/LLM discoverability | 7.5/10 | robots.txt whitelist, llms.txt, llms-full.txt all strong |
| Programmatic SEO | 0.0/10 | Zero programmatic pages |
| **Composite (weighted)** | **7.5/10** | |

**Net change from re-audit: 0.** The score is held, not improved. All re-audit priorities remain open.

---

*Cycle 2 audit conducted March 2026. Source files reviewed: Home.tsx, Blog.tsx, BlogPost.tsx, ForDentists.tsx, About.tsx, Features.tsx, Contact.tsx, Pricing.tsx, App.tsx, sitemap.xml, robots.txt, llms.txt, RE-AUDIT.md.*
