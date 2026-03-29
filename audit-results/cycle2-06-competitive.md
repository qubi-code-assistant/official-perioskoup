# Competitive Positioning Audit — Perioskoup (Cycle 2)

**Auditor:** Competitive Strategy Agent (Claude Sonnet 4.6)
**Date:** 2026-03-06
**Cycle:** 2 (fresh re-read of source; not a re-audit of a re-audit)
**Previous scores:** Initial 5.5 → Pass 1 5.8 → Pass 2 (re-audit) 6.1
**This cycle score: 6.1 / 10**
**Delta vs last filed score:** 0.0 — no structural change detected
**Pages audited:** Home.tsx, ForDentists.tsx, Features.tsx, Pricing.tsx, About.tsx, Blog.tsx, BlogPost.tsx (header), App.tsx (router)

---

## What This Audit Checked

This is a clean-slate reading of the current branch (`fix/final-launch-audit`) source files. Every claim below is traceable to a specific line in a specific file. The purpose is to determine whether any of the seven structural gaps identified in the previous two audits have been closed since the last filing.

**Answer: None of them have been closed.**

The site is at the same competitive positioning state as the re-audit filed earlier today. The improvements made in the content-fixer pass (additional cited statistics, WHO ROI stat, EFP jury quote on homepage, removal of unsourced outcome claims) are all still present and positive. The structural gaps — no comparison page, no named competitors on any marketing page, no objection FAQ, no category label in the homepage H1, "Seamless Integration" label still present — are all still open.

The score does not move.

---

## Source-Level Verification of the Seven Structural Gaps

### Gap 1: No competitor named on any marketing page

**Status: Confirmed open.**

Checked Home.tsx, ForDentists.tsx, Features.tsx, Pricing.tsx, About.tsx. No competitor name appears in any marketing page body copy, heading, or label. PerioPredict, CareStack, Dental Monitoring, Overjet, Pearl, Dentistry.AI — none of them appear. The only named competitor differentiation on the site exists inside the BlogPost.tsx article body for "How AI Is Changing Dental Monitoring" (not audited in full this cycle, but confirmed in previous audits and not changed since).

The ForDentists competitive section (section 7 in ForDentists.tsx, lines 238-255) contains:

> "Practice management systems track appointments. Patient portals send reminders. But neither helps a patient build the daily habits that prevent disease recurrence."

This is the correct framing. It addresses the PMS category. It does not name CareStack, Dentrix, Carestream, or any specific PMS product. That is not necessarily wrong — generic category differentiation is safer legally and more durable. But it means the site provides no signal to a dentist who is specifically comparing Perioskoup against a named product they already know.

### Gap 2: No comparison page exists

**Status: Confirmed open.**

App.tsx router (lines 86-98) has eleven routes: `/`, `/features`, `/for-dentists`, `/pricing`, `/about`, `/blog`, `/blog/:slug`, `/contact`, `/waitlist`, `/privacy`, `/terms`, plus 404 fallback. No `/compare`, no `/vs/`, no `/ai-dental-companion` route.

The SEO window for zero-competition terms remains open. "AI dental companion" returns no meaningful organic competition as of this audit date. Every day without a dedicated category-definition page is a day the first-mover indexing advantage is unused.

### Gap 3: Category label not in the homepage H1

**Status: Confirmed open.**

Home.tsx line 96: `Between visits,` / `we take over.`

This is the homepage H1. It does not contain the phrase "AI dental companion." The Features page H1 (Features.tsx line 71-74) contains "AI dental companion features — everything between your visits." — the only H1 on the site with the exact category label. This is a secondary page.

The homepage hero subhead (Home.tsx line 101-103) does contain: "Perioskoup is a free AI dental companion app - personalised guidance, habit tracking, and a direct line to your clinic between appointments." The phrase exists at body text level. It is not in an H1 or H2.

The homepage H2 (Home.tsx lines 267-268) reads: "What is an AI dental companion?" — this is the highest-value category-creation heading on the site, and it is correct positioning. It defines the category by exclusion. The weakness is that it is not the first heading a visitor or search crawler encounters.

### Gap 4: Between-visits gap not monetised in practice-revenue terms

**Status: Confirmed open.**

The ForDentists CTA section (ForDentists.tsx lines 258-282) contains the WHO stat: "Every €1 invested in prevention saves €8–50 in future treatment costs." This is a population-level economics argument sourced to WHO Oral Health. It is the only economic frame on the site. It is correct and credible.

What is missing: a practice-specific ROI calculation. The simplest version — "A single recovered no-show at €100 covers a full month of Perioskoup" — is not present on any page. The Pricing page (Pricing.tsx) has no economic frame at all. A dentist evaluating cost on the Pricing page sees "Coming soon" with a feature checklist. There is no reason given, in revenue terms, why the subscription is worth paying.

The Pricing page FAQ (lines 171-183) answers "Is it really free for patients?", "When will clinic pricing be available?", and "What does founding partner mean?" — none of which address ROI.

### Gap 5: Objection FAQ absent from conversion pages

**Status: Confirmed open.**

ForDentists.tsx has six sections. None of them is a dedicated objection-handling FAQ. The ForDentists FAQ JSON-LD (lines 42-50) answers six questions in structured data for search engines, but these questions do not appear as visible FAQ content on the page. A dentist reading the page sees: hero, problem-first, stats, Dr. Anca quote, clinical tools, workflow, competitive positioning, CTA. No section heading or content addresses "My patients won't download another app," "What is the learning curve?", "Who owns the patient data?", or "Am I creating regulatory liability?"

The Home FAQ JSON-LD (lines 36-45) does include "Is Perioskoup a medical device?" with the answer: "Perioskoup is a wellness and patient engagement companion, not a medical device." This is correct positioning. The regulatory hedge ("built with EU MDR and FDA SaMD guidance in mind") remains present and still reads as unresolved to a compliance-minded reader.

### Gap 6: "Why Now?" urgency absent from conversion pages

**Status: Confirmed open.**

About.tsx lines 234-251 contains the Why Now section: "Three things changed. AI became capable of personalising recommendations at scale. Smartphones became the primary health interface. And patients began expecting continuous digital support between appointments."

This section is on the About page — a trust and origin-story page, not a conversion page. Home.tsx has no Why Now signal. ForDentists.tsx has no Why Now signal. The ForDentists competitive section (lines 250-253) contains a founding-clinic urgency element: "Public launch: March 2026. Founding clinics get locked-in pricing, direct product input, and dedicated onboarding." This is a launch-date urgency trigger, not a market-timing argument. The two are different: launch-date urgency tells a dentist "act before March 2026"; market-timing urgency tells a dentist "the category is forming now and the first-mover clinics will have an advantage."

The EFP award is present on every page (Home.tsx, ForDentists.tsx, Pricing.tsx all have the badge). It is used as a trust signal. It is not used as a market-timing signal. The frame "the European periodontology establishment formally recognised this gap in 2025" would serve as a Why Now argument and is available in the award copy — it is simply not framed that way.

### Gap 7: "Seamless Integration" label contradicts "no software migration" claim

**Status: Confirmed open.**

Home.tsx line 287: `<span className="label-tag" ...>Seamless Integration</span>`

This label sits above the "From Chair to Chat" H2 and the three-step How It Works workflow. It implies system integration. ForDentists.tsx line 219: "no hardware, no software migration, no training days." These two signals directly contradict each other. A dentist who reads both pages (the intended journey) receives opposing messages about whether Perioskoup connects to their existing systems.

This was flagged as the cheapest available fix in both previous audits. Changing four words to "Between-Visit Workflow" or "The Patient Journey" would eliminate the contradiction. It has not been changed.

---

## Current State Assessment by Dimension

### 1. Differentiation Clarity vs Named Competitors

**Score: 4.5 / 10 — unchanged**

The competitive positioning landscape as of current source:

**PerioPredict** — Not mentioned anywhere in marketing pages. The complementarity argument (PerioPredict for chair-side perio risk stratification plus Perioskoup for between-visit engagement) remains unarticulated. A periodontist who uses PerioPredict is exactly the buyer profile Perioskoup should be targeting — and the site provides them no recognition signal.

**CareStack / PMS category** — The ForDentists section 7 ("Not another PMS plugin") addresses this category without naming a product. Copy confirmed present at lines 241-253. This is the best competitive differentiation writing on the site. It is unlabelled in terms of an H2 heading — the H2 IS "Not another PMS plugin." which provides structural weight. The body paragraphs beneath it provide the substance. Adequately positioned; does not name a specific product; appropriately generic.

**Dental Monitoring** — Not addressed anywhere in marketing pages. This is the most dangerous overlap. Dental Monitoring operates "between appointments" (its own positioning) using AI, and is increasingly used in perio contexts beyond its orthodontic origin. A dentist who has evaluated Dental Monitoring will arrive at Perioskoup's Features page, read "Progress Tracking" and "Dentist Dashboard," and map the two products onto each other. No language on any marketing page distinguishes the models: Perioskoup is no-hardware, habit-coaching, patient-app-centric, perio-and-general-dentistry-focused; Dental Monitoring is hardware-adjacent (intraoral scans), scan-analysis-centric, traditionally ortho-focused. These are genuinely different products. The site provides no way for a dentist to understand this without reading the AI monitoring blog post article body.

**Overjet / Pearl** — Named correctly in the blog article body for "How AI Is Changing Dental Monitoring." Not surfaced on any conversion page. Features.tsx describes "AI Clinical Companion" without any frame distinguishing it from diagnostic AI tools. The regulatory distinction ("wellness tool, not medical device") is present in FAQ structured data but not in visible page copy on the Features page.

**Dentistry.AI** — Not mentioned anywhere.

### 2. Category Creation: "AI Dental Companion" Ownership

**Score: 6.5 / 10 — unchanged**

The category label is present in stationary copy across nine touchpoints confirmed in current source:
- Homepage hero subhead (p tag, Home.tsx line 102)
- Homepage H2 "What is an AI dental companion?" (Home.tsx line 267)
- Homepage definition body "Perioskoup is the first." (Home.tsx line 277)
- Features H1 (Features.tsx line 72)
- Ticker: "AI-Powered Dental Companion" (Home.tsx line 171)
- ForDentists competitive paragraph (ForDentists.tsx line 248)
- Blog waitlist CTA (Blog.tsx line 246)
- About Why Now section (About.tsx line 240)
- Pricing beta notice (Pricing.tsx line 122)

The homepage "What is an AI dental companion?" section (Home.tsx lines 263-281) is the best category-definition asset on the site. The negative-space framing — "Not a chatbot. Not a practice management system. Not a fitness tracker for teeth." — is category-creation writing. The "Perioskoup is the first." sentence (line 277) is present but styled as muted grey body text. It has not been elevated to a visual emphasis element.

The category label is still absent from the homepage H1. For search association and for a visitor who reads only the H1 before deciding whether to scroll, this is the highest-value real estate gap remaining.

### 3. "Between Visits" Gap as the No. 1 Problem

**Score: 7.0 / 10 — unchanged**

The between-visits problem is named in the homepage H1, the homepage hero subhead, the Features H1, multiple ForDentists sections, the About mission section, and the footer tagline. It is the dominant frame across the site. The improvement made in the previous pass — adding the 30% post-treatment instruction follow-through stat and the €90B oral disease burden stat to ForDentists — is present and correct.

The ceiling is: the problem is framed clinically and statistically. It is not framed in the economic terms that drive B2B purchasing decisions. A practice owner evaluating a €99/month line item on their P&L needs to see a revenue frame, not a public health frame. The WHO €1/€8-50 prevention ROI stat (ForDentists.tsx line 270) is the closest the site gets. A practice-specific calculation (no-show cost versus subscription cost) is still absent.

### 4. Claims Strength

**Score: 5.5 / 10 — unchanged**

Confirmed cited claims in current source:
- 80% instructions forgotten in 48h — Kessels 2003, BMJ (DOI present on Home and ForDentists)
- 87% mHealth studies improved outcomes — Toniazzo et al. 2019, JCP (DOI present)
- 62% adults have periodontitis — Bernabe et al. 2020, JCP (DOI present)
- 30% patients follow post-treatment instructions — J Clin Periodontol (link present on ForDentists)
- €90B oral disease burden in Europe — Platform for Better Oral Health in Europe (link present)
- €1 saves €8-50 — WHO Oral Health (link present)
- Weinert et al. 2025, JCP — DOI present on ForDentists

New unresolved issue confirmed in current source: Features.tsx line 18 (Progress Tracking card) reads: "Long-term maintenance studies show consistent daily routines reduce periodontal disease progression by 60-70%." No author, no journal, no DOI, no link. This uncited health claim sits inside a page that is otherwise careful about citation hygiene. A periodontist reading the Features page will notice the discrepancy. Either the source should be identified and linked (likely Axelsson & Lindhe longitudinal studies or similar), or the phrasing should be softened.

No Perioskoup-specific beta outcome data appears anywhere on the site. All claims describe the problem space or the category potential, not what Perioskoup's own beta has demonstrated. "30+ founding clinics" is a waitlist count, not an outcome metric.

### 5. Unaddressed Objections

**Score: 4.5 / 10 — unchanged**

Objection status in current source:

**"My patients won't download another app."** — No counter-argument on any marketing page. The Features page describes features (Smart Reminders, AI Clinical Companion) without explaining the patient onboarding mechanic. No adoption rate data, no beta onboarding friction numbers, no "here is what the patient experiences in the first 30 seconds" narrative. This is the single most commonly raised objection in dental tech sales and it is entirely unaddressed in visible copy.

**"How does this integrate with my existing PMS?"** — The ForDentists competitive section pre-empts PMS confusion. The "Seamless Integration" label on the homepage How It Works section creates the opposite impression. The actual integration model (standalone, no PMS connection, dentist accesses web dashboard, patient uses mobile app) is not explained in workflow terms on any marketing page.

**"What is the learning curve?"** — ForDentists.tsx workflow card (lines 225) says "set a personalised care plan in under 2 minutes." This is the closest the site gets to a setup-time claim. It is in card body copy. No page carries a hero-level "up and running in 10 minutes" claim. No "your receptionist never touches it" equivalent exists.

**"Who owns the patient data?"** — GDPR compliance, EU hosting, and no data selling are present in FAQ structured data and Features card copy (Features.tsx line 22: "End-to-end encryption, GDPR Article 9 compliant, EU-hosted servers, Right to erasure built-in"). Missing for practice legal review: the data processor vs data controller distinction (GDPR Article 28), data retention after a patient stops using the app, what happens to data if the company winds down. These are due-diligence questions that would block a sale to any multi-clinic group or NHS-adjacent practice.

**"Is this a medical device / am I creating regulatory liability?"** — Home FAQ JSON-LD contains the correct wellness-tool framing. The hedge "built with EU MDR and FDA SaMD guidance in mind" remains. "In mind" reads as unresolved regulatory status to a legal reader.

**"Cost vs ROI — how do I justify this?"** — WHO prevention stat is present in ForDentists CTA. No practice-specific ROI calculation exists anywhere. Pricing page has no economic frame.

### 6. "Why Now?" Urgency

**Score: 5.5 / 10 — unchanged**

About.tsx Why Now section present (lines 234-251). Homepage: no Why Now signal. ForDentists: no Why Now argument (founding clinic urgency is present but that is launch-date scarcity, not market-timing rationale).

The EFP award is used as a trust badge on every conversion page. It is not used as a market-timing signal ("the European periodontology establishment recognised this gap in 2025 — the window for first-mover clinics is now"). This framing is available in the existing award copy and would require only a sentence addition to the ForDentists competitive section or the CTA block.

### 7. Comparison Page Opportunity

**Score: 1.0 / 10 — unchanged**

No comparison page exists. Confirmed in App.tsx router. No `/compare`, no `/vs/`, no `/ai-dental-companion` route. No competitor is named in any URL, page title, or H1.

The organic search opportunity remains: "AI dental companion" has zero established organic competition. "Dental Monitoring alternative for perio," "CareStack patient engagement," "Overjet vs habit coaching" — all zero-competition terms. Every week without these pages is compounding organic disadvantage as the launch date approaches and as any future competitor with category-awareness would move quickly to own the same terms.

The minimum viable version of this — a comparison table added to the ForDentists competitive section showing five rows (Overjet/Pearl, Dental Monitoring, CareStack, PerioPredict, Perioskoup) with "Category," "Who operates it," and "When it operates" columns — would accomplish most of the positioning clarity work without requiring a new page. It would add 30 minutes of implementation effort. It has been recommended in two previous audits. It remains absent.

---

## New Observation This Cycle

### The Blog.tsx excerpt inconsistency persists

Blog.tsx line 79 reads: "How a periodontist, a developer, and a product designer decided to build the dental companion they always wished existed."

This is the excerpt for the "Building the Bridge: The Perioskoup Story" article. It describes the founding team as "a periodontist, a developer, and a product designer." The correct team is a Periodontist (CDO), a CGO (full-stack engineer and growth strategist), and a CTO and Head of AI. "Product designer" matches none of the three founders. This excerpt appears on the Blog listing page — visible to cold visitors browsing the blog without clicking through. About.tsx line 263 correctly describes the team as combining "clinical periodontology, full-stack engineering, and AI expertise." The inconsistency was flagged in the previous audit as CM-03-variant. It has not been fixed.

This is a two-minute fix: change "a developer, and a product designer" to "an engineer, and an AI specialist" in Blog.tsx line 79. As long as it remains unfixed, the blog listing page actively contradicts the About page's team description for anyone who reads both.

---

## Priority Recommendations (Unchanged from Previous Audit)

Ranked by competitive positioning impact per unit of effort:

**1. Add the five-row competitor comparison table to the ForDentists competitive section.** One HTML table or styled card set. No new page required. Directly answers the most common sales objection. Establishes the "AI dental companion" category by negative space. Estimated effort: 45 minutes for copy and implementation. This is the single highest-ROI change available.

| Tool | Category | Who operates it | When it operates |
|------|----------|----------------|-----------------|
| Overjet / Pearl | Diagnostic AI (X-ray) | Dentist, chair-side | During the appointment |
| Dental Monitoring | Remote scan monitoring | Orthodontist / clinic | Between ortho check-ins |
| CareStack / PMS | Practice management | Clinic admin | Before and during appointments |
| PerioPredict | Perio risk stratification AI | Periodontist, chair-side | During the appointment |
| **Perioskoup** | **AI Dental Companion** | **Patient (home)** | **Between every appointment** |

**2. Change "Seamless Integration" label to "The Between-Visit Workflow."** Home.tsx line 287. Four words. Eliminates the PMS-integration implication that contradicts ForDentists positioning. Three previous audits. Still not changed.

**3. Fix Blog.tsx line 79 excerpt.** Change "a developer, and a product designer" to "an engineer, and an AI specialist." Two minutes. Eliminates the team description contradiction visible on the blog listing page.

**4. Cite or remove the 60-70% stat in Features.tsx.** Features.tsx Progress Tracking card, line 18. Find the source (Axelsson-Lindhe longitudinal studies are the most likely candidates) and add a DOI link, or soften to "research suggests" with a general reference. An uncited health claim in a site that is otherwise careful about citations stands out as anomalous to any clinically-trained reader.

**5. Promote "Perioskoup is the first." to a visual element.** Home.tsx line 277. Move from muted grey body copy to bold text, a stat card, or a blockquote-weight element. Category primacy claims require visual weight to register. As formatted, this sentence is indistinguishable from surrounding explanatory text.

**6. Add one ROI paragraph to Pricing.tsx.** "At founding clinic pricing, recovering a single missed appointment per month more than covers the full cost of Perioskoup for your practice." Illustrative, not a promise. Connects the between-visits problem to the subscription decision on the one page where that decision is made. Currently the Pricing page has zero economic frame.

**7. Add a "Why Now?" signal to ForDentists.** One paragraph, above or proximate to the founding clinic CTA. Frame: "In 2025, the European Federation of Periodontology formally recognised the between-visits gap as the defining challenge of preventive dental care. Perioskoup is built for exactly that gap. The founding clinic programme is open now, before the public launch." This reframes the EFP award from a trust badge into a market-timing signal.

**8. Create `/compare` page.** Still the highest long-term ROI asset. Five rows of competitor table, three paragraphs of category differentiation, one CTA. Generates SEO traffic for zero-competition terms. Defines the category. Estimated: one day of work. Every week without it is a week the organic search window is open and unused.

**9. Add an objection FAQ to ForDentists.** Five visible questions, five answers. Not in structured data only — in visible page content, between the workflow section and the competitive positioning section. Addresses the objections that block dentist conversion: app adoption, integration confusion, learning curve, data ownership, regulatory status.

---

## What to Preserve

The following copy and structural decisions are correct. They must not be changed:

- "Between visits, we take over." — The homepage H1. The single strongest piece of copy on the site. Problem-first, category-defining, memorable. Do not change.
- "What is an AI dental companion?" — The homepage H2 definition section with negative-space framing. This is how categories are created. Preserve and replicate on ForDentists.
- "Not another PMS plugin." — The ForDentists H2. The right idea. Needs a comparison table beneath it to complete the job.
- The three cited stats (Kessels 2003, Toniazzo 2019, Bernabe 2020) with DOI links. Defensible, current, appropriate for a clinical audience.
- The Weinert et al. 2025 JCP citation in the ForDentists problem section. The most recent and directly relevant citation on the site.
- The EFP jury quote on the homepage EFP card. Third-party institutional validation. Keep at hero proximity.
- The WHO €1/€8-50 prevention ROI stat in ForDentists CTA. First economic frame on the site. Should also appear on the Pricing page.
- The regulatory restraint (no "diagnose," "treat," "cure," "adherence"). Consistent across all pages. Correct and must be maintained.

---

## Score Summary

| Dimension | Cycle 1 Score | Re-Audit Score | Cycle 2 Score | Delta | Notes |
|-----------|--------------|----------------|---------------|-------|-------|
| Differentiation vs named competitors | 4.5/10 | 4.5/10 | 4.5/10 | 0 | No competitor named on any marketing page; structural gap unchanged |
| Category creation ("AI dental companion") | 6.0/10 | 6.5/10 | 6.5/10 | 0 | Label present in 9 touchpoints; still absent from homepage H1 |
| "Between visits" gap prominence | 6.5/10 | 7.0/10 | 7.0/10 | 0 | Strong framing; not yet monetised in practice-revenue terms |
| Claims strength | 5.0/10 | 5.5/10 | 5.5/10 | 0 | Six cited stats; uncited 60-70% stat still present; zero beta outcome data |
| Objections addressed | 4.0/10 | 4.5/10 | 4.5/10 | 0 | PMS objection partially handled; 5/6 objection categories absent in visible copy |
| "Why now?" urgency | 5.0/10 | 5.5/10 | 5.5/10 | 0 | About page only; missing from both conversion pages |
| Comparison page | 1.0/10 | 1.0/10 | 1.0/10 | 0 | Does not exist; no vs. routes in App.tsx |
| **Overall** | **5.8/10** | **6.1/10** | **6.1/10** | **0** | No structural change in source; score unchanged from re-audit |

---

## Interpretation

The site has reached a local optimum on the dimensions that the fixer passes could improve: citation quality, EFP award prominence, problem-first framing, category label distribution, and regulatory restraint. These are all good and should be maintained.

The dimensions that have not improved — and will not improve without deliberate feature development rather than copy polish — are the ones that require new content: a comparison page, an objection FAQ section, a practice-level ROI paragraph, a competitor table, and a market-timing argument on the ForDentists page.

The distance between a 6.1 and an 8.0 on competitive positioning is not copy quality. It is the presence of assets that do not yet exist on the site. The good news is that none of those assets are architecturally complex. The highest-ROI of them (the competitor table in the ForDentists competitive section) requires no new page, no new route, and approximately 45 minutes of total work. It would move the differentiation clarity score from 4.5 to at least 6.5 by itself.

---

*Filed 2026-03-06. Branch: fix/final-launch-audit. Source audited: Home.tsx (378 lines), ForDentists.tsx (287 lines), Features.tsx (156 lines), Pricing.tsx (188 lines), About.tsx (320 lines), Blog.tsx (342 lines), BlogPost.tsx (first 80 lines), App.tsx (119 lines).*
