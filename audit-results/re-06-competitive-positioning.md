# Re-Audit: Competitive Positioning — Perioskoup
**Auditor:** Competitive Strategy Agent (Claude Sonnet 4.6)
**Date:** 2026-03-06
**Previous audit score:** 5.8 / 10 (second pass; 5.5 initially)
**Re-audit score:** 6.1 / 10
**Delta:** +0.3
**Codebase state:** Branch `fix/final-launch-audit` — post content-fixer, seo-fixer, mobile-fixer, a11y-fixer, animation-fixer, performance-fixer, tests-fixer
**Pages audited:** Home.tsx, ForDentists.tsx, Features.tsx, Pricing.tsx, About.tsx, Blog.tsx, BlogPost.tsx (first 120 lines), App.tsx (router), fix-log-content.md, RE-AUDIT.md

---

## What Changed Since the Previous Audit

The seven fixer agents collectively produced 21 points of improvement across the twelve audit dimensions. From a competitive positioning lens, the changes that matter are:

- Content fixer removed the unsourced outcome stats (40% fewer no-shows, 85% treatment acceptance, 3x engagement). This was flagged in the prior audit as a credibility problem. The removal is confirmed in current source.
- Content fixer added the WHO "EUR 1 saves EUR 8-50" ROI stat to the ForDentists CTA section. This is the closest the site has come to a dentist-facing economic argument.
- Content fixer added the 30% post-treatment instruction follow-through stat (J Clin Periodontol) and the EUR 90B European oral disease burden (Platform for Better Oral Health in Europe) to the ForDentists problem section. Both are now cited with live links.
- The hero blockquote on the homepage was updated from a generic origin story to the more specific practice challenge quote ("a shortage of time and the lack of patient engagement, which leads to poor outcomes"). The EFP jury quote now appears on both the homepage EFP card and the About page.
- The "AI dental companion" definition section on the homepage ("Not a chatbot. Not a practice management system. Not a fitness tracker for teeth. Perioskoup is the first.") is present and confirmed in current source.
- About.tsx FAQ JSON-LD correctly identifies Dr. Anca as CDO (the previously flagged "CEO" error is fixed in the FAQ text).
- The blog post "Building the Bridge" excerpt in Blog.tsx still reads "a periodontist, a developer, and a product designer" — the content fixer claimed to fix this to "AI specialist" but the Blog.tsx source at line 79 still contains "product designer". This is a confirmed miss (CM-03-variant carried forward from RE-AUDIT.md).

No competitive positioning-specific pages were created. No competitor was named anywhere in a marketing URL, page title, or H1. No `/compare` route exists in App.tsx. No `/ai-dental-companion` route exists.

---

## 1. Differentiation Clarity vs Each Competitor

### Score: 4.5 / 10 — unchanged

The score does not move because the structural gap is identical to the previous audit: no competitor is named on any marketing page except inside BlogPost.tsx article body copy.

**PerioPredict** — Still not mentioned anywhere in marketing pages. The complementarity argument (PerioPredict for chair-side risk stratification + Perioskoup for between-visit engagement = complete perio workflow) remains unarticulated. This is the easiest competitive narrative available and costs nothing to write.

**CareStack** — The ForDentists "Not another PMS plugin" section is present and confirmed: "Practice management systems track appointments. Patient portals send reminders. But neither helps a patient build the daily habits that prevent disease recurrence." This remains the best competitive differentiation sentence on the site. The section has no H2 heading anchoring it — it is introduced only by the H2 "Not another PMS plugin." which does the structural work, but the competitive substance is in unlabelled body paragraphs beneath it. The section is findable but not skimmable.

The "Seamless Integration" label tag in the Home.tsx How It Works section (line 287) still exists in current source. The label directly above the "From Chair to Chat" H2 reads "Seamless Integration" and implies the product integrates with other systems — which it does not. This contradicts the "no software migration" claim on ForDentists and creates confusion for any dentist who reads both pages. This label was flagged in the previous audit as the highest-ease fix available. It was not changed.

**Dental Monitoring** — Still entirely unaddressed on marketing pages. The Features page lists "Progress Tracking" and "Dentist Dashboard" without any distinction from Dental Monitoring's remote scan monitoring features. The Features.tsx hero says "From the moment a patient leaves the chair to their next appointment, Perioskoup keeps them engaged, informed, and consistent." This could describe Dental Monitoring's value proposition to anyone unfamiliar with the category boundary. No language distinguishes the no-hardware, habit-coaching, perio-focused model from the hardware-dependent, scan-analysis, ortho-focused model.

**Overjet / Pearl** — Named and differentiated correctly in the BlogPost.tsx article body for "How AI Is Changing Dental Monitoring." The article frames them as image-analysis tools, not patient engagement tools. This is the only named competitor differentiation on the site. It remains buried in article body copy on a secondary page and is not surfaced on any conversion page.

**Dentistry.AI** — Not mentioned anywhere.

The competitive differentiation picture is structurally unchanged: one competitor category (PMS) is partially addressed on one page, one set of competitors (Overjet/Pearl) is addressed in a blog article body, and the most dangerous overlap (Dental Monitoring) is completely unaddressed.

---

## 2. Category Creation: "AI Dental Companion" Ownership

### Score: 6.5 / 10 — up from 6.0

The score moves fractionally upward because the category label is now more systematically distributed across the site in stationary copy, the EFP jury quote now appears on the homepage (not just About), and the homepage EFP card gives third-party institutional validation at hero proximity.

**What is confirmed in current source:**

- Homepage H1: "Between visits, we take over." — still the strongest anchor copy on the site. Not the category label, but it frames the category space more memorably than the label alone.
- Homepage hero subhead (p tag): "Perioskoup is a free AI dental companion app — personalised guidance, habit tracking, and a direct line to your clinic between appointments." — present and confirmed.
- Homepage H2: "What is an AI dental companion?" with body: "Not a chatbot. Not a practice management system. Not a fitness tracker for teeth." and "Perioskoup is the first." — present and confirmed. This is the most important category-creation asset on the site.
- Features page H1: "AI dental companion features — everything between your visits." — confirmed.
- Ticker: "AI-Powered Dental Companion" — confirmed.
- Footer tagline (inferred from prior audit, consistent with current brand): present.
- ForDentists competitive paragraph: "It's the AI dental companion for what happens between visits." — confirmed.
- Blog CTA block: "The AI dental companion launching March 2026." — confirmed.
- About page Why Now section: "making the AI dental companion possible for the first time." — confirmed.
- Pricing page beta notice: "Founding clinic partners of this AI dental companion get locked-in pricing..." — confirmed in Pricing.tsx line 122.

**What is still missing:**

The category label has not entered an H1 on the homepage. The homepage H1 remains "Between visits, we take over." — correct brand positioning, but not the search-association anchor. The Features page H1 ("AI dental companion features...") is the only page where the exact phrase appears in an H1 heading element.

"Perioskoup is the first" remains in muted grey body copy. It has not been elevated to a stat card, pullquote, or bold visual element. In current source it appears as a grey paragraph sentence inside the definition section, with no visual weight that would cause a scanning reader to stop.

No `/ai-dental-companion` URL exists in the router. The exact-match keyword URL is the single highest-value missing SEO asset for category ownership.

---

## 3. "Between Visits" Gap as the No. 1 Problem

### Score: 7.0 / 10 — up from 6.5

This is the dimension that improved most clearly from the content fixer pass.

**What the site now does:**

- Homepage H1: "Between visits, we take over." — unchanged, still the strongest framing.
- ForDentists problem section: now includes three cited statistics anchored to the between-visits gap:
  - 80% of instructions forgotten within 48h (Kessels 2003, BMJ) — with DOI link.
  - 30% of patients follow post-treatment instructions (J Clin Periodontol) — with live link.
  - EUR 90B annual oral disease burden in Europe (Platform for Better Oral Health in Europe) — with live link.
- ForDentists CTA section: "Every EUR 1 invested in prevention saves EUR 8-50 in future treatment costs." (WHO Oral Health) — this is the first ROI-denominated statement on the site. It is not practice-specific (one no-show = X months of Perioskoup) but it is a step toward the economic frame.
- Features page hero: "From the moment a patient leaves the chair to their next appointment, Perioskoup keeps them engaged, informed, and consistent."
- About page: "Close the gap between visits" H2, supported by the three cited stats in the mission card.

**What still falls short:**

The between-visits problem is still not monetised in practice-revenue terms on any page. The WHO prevention ROI stat is a population-level economics argument. A solo practitioner evaluating a €99/month subscription wants to know: "If I recover one no-show, have I paid for Perioskoup?" That calculation is not present anywhere. It would take one paragraph on the Pricing page or the ForDentists CTA section to make this concrete.

The Pricing page still has zero reference to the between-visits problem or any ROI frame. A dentist who navigates to Pricing to evaluate cost-benefit finds features and "Coming soon" with no anchor to the problem that justifies the purchase.

---

## 4. Claims Strength

### Score: 5.5 / 10 — up from 5.0

**Confirmed claims in current source:**

- 80% of care instructions forgotten within 48h — Kessels 2003, BMJ (DOI link present on both Home and ForDentists)
- 87% of mHealth studies show improved oral health outcomes — Toniazzo et al. 2019, JCP (DOI link present)
- 62% of adults have periodontitis worldwide — Bernabe et al. 2020, JCP (DOI link present)
- 30% of patients follow post-treatment oral hygiene instructions — J Clin Periodontol (live link present on ForDentists)
- EUR 90B annual oral disease burden in Europe — Platform for Better Oral Health in Europe (live link present on ForDentists)
- EUR 1 invested in prevention saves EUR 8-50 — WHO Oral Health (live link present in ForDentists CTA)
- Weinert et al. 2025, JCP — cited in ForDentists problem section with DOI link
- 30+ founding clinics — social proof, uncited
- EFP Innovation Award 2025, 3rd Prize — verified, linked to EFP announcement

The removal of the previously uncited stats (40% fewer no-shows, 85% treatment acceptance, 3x engagement) is confirmed. The citation quality has genuinely improved.

**What remains absent:**

Perioskoup-specific outcome data is still completely absent. Every cited claim describes the problem space or the category potential — not what Perioskoup itself achieves. "Our beta patients show X% improvement in habit consistency over 30 days" would be orders of magnitude more persuasive than any population-level reference stat. This is the most impactful credibility gap remaining.

The sole Perioskoup-specific social proof is "30+ founding clinics" (a waitlist metric, not an outcome metric) and the EFP Award (institutional recognition, not customer results). No beta customer quote appears on any marketing page. The EFP jury quote, while excellent third-party validation, is about the category concept, not about outcomes delivered to patients or practices.

The Features.tsx "Progress Tracking" description says: "Research shows consistent daily routines reduce periodontal disease progression by 60-70%." This stat is uncited — no source link, no author, no journal. It is in a card description on a feature page, but uncited stats in a health-tech context undermine the credibility built by the cited stats nearby. This was not present in the previous audit and is new content introduced by the content fixer.

---

## 5. Unaddressed Objections

### Score: 4.5 / 10 — up marginally from 4.0

One objection has been more substantially addressed since the previous audit:

**"How do I justify this cost?" — partially improved.** The ForDentists CTA section now includes the WHO prevention ROI stat. This is not a direct answer to "what does Perioskoup ROI look like for my practice" but it establishes the economic logic of prevention investment. The founding clinic language ("locked-in pricing") creates urgency without giving the dentist a number to evaluate.

The remaining five objection categories are structurally unchanged:

**"My patients won't download another app."** Still zero counter-argument on any marketing page. This is the single highest-frequency objection any dentist will raise and the entire revenue model depends on patient adoption. The Features page lists "Smart Reminders" and "AI Clinical Companion" without explaining the onboarding mechanic. No adoption data, no beta onboarding friction numbers, no "here is what the patient sees in the first 30 seconds" narrative.

**"How does this integrate with my existing PMS?"** The ForDentists page addresses PMS confusion ("Not another PMS plugin") but does not answer the integration question. The How It Works section on the homepage is entirely patient-journey-framed. No page describes the dentist's actual workflow: access dashboard, create patient record, send invite, set care plan. The "Seamless Integration" label tag in How It Works continues to imply PMS integration that does not exist.

**"What is the learning curve?"** Not addressed on any page. The ForDentists workflow section says "no hardware, no software migration, no training days" in one clause of an intro paragraph. No claim like "up and running in under 10 minutes" or "set a patient's first care plan in under 2 minutes" appears as a standalone, scannable proof point. (The ForDentists workflow card says "set a personalised care plan in under 2 minutes" — this is present but embedded in a card body paragraph, not in a hero-level claim.)

**"Data privacy — who owns the patient data?"** The FAQ schemas on Home and ForDentists address GDPR and EU hosting. What is missing for a practice compliance decision: the data processor vs data controller distinction under GDPR Article 28, data retention policy after patient stops using the app, and what happens to data if the company winds down. These are not marketing gaps — they are sales-process gaps for any dental group or NHS-adjacent practice with a compliance officer.

**"Is this a medical device / am I creating regulatory liability?"** The Home FAQ JSON-LD states: "Perioskoup is a wellness and patient engagement companion, not a medical device. It does not provide diagnoses or medical advice." This is the clearest the site has been on this question. However, the answer continues: "The app is built with EU MDR and FDA SaMD guidance in mind." The phrase "in mind" still signals unresolved regulatory positioning to a legal reader rather than confirmed wellness-tool classification.

---

## 6. "Why Now?" Urgency

### Score: 5.5 / 10 — up from 5.0

The About page Why Now section is present and confirmed: "Three things changed. AI became capable of personalising recommendations at scale. Smartphones became the primary health interface. And patients began expecting continuous digital support between appointments."

The improvement in this cycle is subtle: the EFP jury quote now appears on the homepage EFP card section, giving it first-page prominence. The award can be framed as a market timing signal — the European periodontology establishment formally recognising the between-visits gap as the next frontier. The current site uses the award as a trust badge rather than as a "the window is now open" urgency signal. This framing is available and unused.

What has not changed: the "Why Now?" argument lives exclusively on the About page. The homepage and ForDentists page — the two primary conversion pages — carry no market timing argument. A dentist evaluating Perioskoup against inertia (the dominant competitor at this stage) needs to understand why March 2026 is the moment to act, not later. This argument is not present where conversion decisions are made.

The March 2026 public launch date creates urgency for the founding clinic programme ("spots are limited") but does not connect that urgency to the market opportunity that closes as competitors emerge.

---

## 7. Comparison Page Opportunity

### Score: 1 / 10 — unchanged

No change. Confirmed in App.tsx: the router has 11 routes plus NotFound. There is no `/compare`, no `/vs/`, no `/ai-dental-companion` route. No competitor is named in any URL, page title, or H1 on any marketing page.

The SEO window described in the previous audit is still open. "Dental Monitoring alternative," "Overjet vs patient engagement," "CareStack patient engagement," and "AI dental companion" have zero or near-zero organic competition. Every week without these pages is a week the window is open but unused.

The category definition table from the previous audit remains the single most actionable missing asset:

| Tool | Category | When it operates |
|------|----------|-----------------|
| Overjet / Pearl | Diagnostic AI | During the appointment |
| Dental Monitoring | Remote scan monitoring | Between ortho check-ins |
| CareStack | Practice management | Before and during appointments |
| PerioPredict | Risk stratification AI | During the appointment |
| Perioskoup | AI Dental Companion | Between every appointment |

This table does not require a dedicated page. It could be added to the ForDentists competitive section with 30 minutes of effort and would answer the most common sales objection before it is raised.

---

## 8. New Observations (Post-Fix Pass)

### 8a. Uncited 60-70% Stat Is a Credibility Liability

The Features.tsx Progress Tracking card reads: "Research shows consistent daily routines reduce periodontal disease progression by 60-70%." No source, no author, no journal, no DOI. This was introduced by the content fixer and was not present in the previous audit. In a site that has otherwise been careful about citation hygiene (Kessels, Toniazzo, Bernabe, Weinert all have DOI links), this uncited stat stands out as anomalous and would raise credibility questions with a clinically-trained evaluator. Either cite it or soften it to "research suggests" with a general reference.

### 8b. The EFP Card Is the Right Move, Used Well

The homepage EFP Award card section — full-width, with ceremony photo, the jury quote, and the specific jury member names — is the strongest new addition in the current source that helps competitive positioning. It provides third-party institutional validation that a dentist will recognise as authoritative. The jury quote ("Perioskoup is an innovative digital tool that uses artificial intelligence to support both patients and clinicians in managing oral health") is the only external voice on the site that is not a founder. This section is well-executed. It should be preserved and, ideally, amplified in the nav as a dedicated badge link.

### 8c. "Seamless Integration" Label Still Contradicts ForDentists Copy

Home.tsx line 287 reads: `<span className="label-tag" ...>Seamless Integration</span>` above the "From Chair to Chat" How It Works section. ForDentists.tsx says "no hardware, no software migration, no training days." These two signals contradict each other on two pages a dentist is expected to visit in sequence. The "Seamless Integration" label implies connection to existing systems. The ForDentists positioning explicitly denies this. This is the cheapest available fix in the competitive positioning toolkit: change four words.

### 8d. About.tsx Team Section Header Inconsistency

About.tsx line 263 reads: "The Perioskoup founding team combines clinical periodontology, full-stack engineering, and AI expertise." This correctly names three disciplines. However Blog.tsx line 79 (the "Building the Bridge" post excerpt) still reads "a periodontist, a developer, and a product designer" — which uses the old, incorrect team description and does not match the CDO/CGO/CTO positioning. This inconsistency was flagged in RE-AUDIT.md as CM-03-variant. It is visible in the blog listing for cold visitors who read the excerpt without opening the article.

### 8e. Pricing Page Remains a Missed Conversion Asset

The Pricing.tsx page has no mention of the between-visits problem, no ROI frame, and no competitive positioning. A dentist who clicks from the ForDentists page to evaluate cost will land on a page that says "Coming soon" with feature lists. The WHO prevention ROI stat from the ForDentists CTA section should be repeated here. One paragraph — "At founding clinic pricing, a single prevented no-show covers multiple months of Perioskoup" — would transform this page from a placeholder into a conversion page. This is the same gap flagged in the previous audit and is still unaddressed.

---

## Priority Recommendations — Ranked by Impact vs Effort

**1. Add the competitor comparison table to ForDentists.** One HTML table or visual card set showing the five-row category map (Overjet/Pearl, Dental Monitoring, CareStack, PerioPredict, Perioskoup) with "Category," "Who operates it," and "When it operates" columns. This answers the most common sales objection, requires no separate page, and takes under an hour to write and implement. This is the highest competitive positioning ROI available.

**2. Change the "Seamless Integration" label to "The Between-Visit Workflow."** Home.tsx line 287. Four words. Eliminates the PMS integration implication that contradicts ForDentists positioning. Confirmed unfixed since initial audit.

**3. Cite or remove the 60-70% stat in Features.tsx.** Features.tsx Progress Tracking card. Find the source (likely somewhere in the periodontal literature) and add a citation link, or soften the claim to "research suggests." Uncited health claims undermine the credibility built by the cited stats.

**4. Promote "Perioskoup is the first" to a visible element.** Home.tsx definition section. Move this sentence from muted grey body copy to bold text, a stat card, or a blockquote-weight element. Category primacy claims need visual weight. Currently it is indistinguishable from surrounding explanatory text.

**5. Add one ROI paragraph to Pricing.tsx.** "At founding clinic pricing, recovering one no-show per month more than covers the cost of Perioskoup for your entire practice." This is illustrative math, not a promise. It connects the between-visits problem to the subscription decision on the one page where the subscription decision is made.

**6. Fix the Blog.tsx "product designer" excerpt.** Blog.tsx line 79. Change "a periodontist, a developer, and a product designer" to "a periodontist, an engineer, and an AI specialist." This is the team description cold visitors see in the blog listing without opening the article. Two minutes.

**7. Create `/compare` page.** Still the highest-ROI missing asset in the site. A single page with the category table, three paragraphs of differentiation copy, and a CTA. Estimated: 4-5 hours total. Generates SEO traffic, answers the most common sales objection, and defines the category by negative space. Every week without this page is a week the organic search window is open and unused.

**8. Add a "Why Now?" paragraph to ForDentists.** One paragraph, above or proximate to the CTA. Frame the EFP award as the market timing signal: "In 2025, the European Federation of Periodontology formally recognised the between-visits gap as the next frontier in dental care. Perioskoup is the first product built for that gap." This reframes the award from a trust badge into a competitive window signal.

---

## Score Summary

| Dimension | Previous Score | Re-Audit Score | Delta | Notes |
|-----------|---------------|----------------|-------|-------|
| Differentiation vs named competitors | 4.5/10 | 4.5/10 | 0 | Structural gap unchanged; no competitor named anywhere in marketing pages |
| Category creation ("AI dental companion") | 6.0/10 | 6.5/10 | +0.5 | EFP card on homepage adds institutional voice; label now in 8+ places |
| "Between visits" gap prominence | 6.5/10 | 7.0/10 | +0.5 | 30% stat + EUR 90B + WHO ROI stat added to ForDentists; problem better substantiated |
| Claims strength | 5.0/10 | 5.5/10 | +0.5 | EFP jury quote on homepage; new cited stats; new uncited stat is a regression |
| Objections addressed | 4.0/10 | 4.5/10 | +0.5 | WHO ROI stat partially addresses cost objection; 5/6 objection categories still absent |
| "Why now?" urgency | 5.0/10 | 5.5/10 | +0.5 | EFP card at hero proximity on homepage; About page Why Now unchanged; still missing from ForDentists/Home above fold |
| Comparison page | 1.0/10 | 1.0/10 | 0 | Does not exist |
| **Overall** | **5.8/10** | **6.1/10** | **+0.3** | Incremental improvement in evidence quality; structural competitive gaps unchanged |

---

## What Has Not Changed and Must Be Addressed Next

The previous audit described seven structural gaps. All seven remain open in current source:

1. No competitor is named by name on any marketing page.
2. No comparison page exists.
3. The category label does not appear in an H1 on the homepage.
4. The between-visits gap is not quantified in practice-revenue terms on any conversion page.
5. Five of six objection categories are unanswered.
6. "Why Now?" urgency exists only on the About page.
7. The "Seamless Integration" label contradicts the "no software migration" claim.

The content fixer pass improved the evidence base (more citations, a partial economic frame) and removed credibility liabilities (unsourced outcome stats). These are genuine improvements. They make the existing positioning more defensible. They do not solve the positioning clarity problem — a dentist comparing Perioskoup against Dental Monitoring or PerioPredict would still leave without a clear, scannable answer to "how is this different from what I already know about?"

---

## What to Preserve

The following are correct and must not be changed:

- "Between visits, we take over." — The homepage H1 remains the best single piece of copy on the site. The problem frame is perfect.
- "What is an AI dental companion?" — The definition section with "Not a chatbot. Not a practice management system. Not a fitness tracker for teeth." is the highest-value category-creation asset on the site. Preserve and replicate on ForDentists.
- The three-citation stats block (Kessels, Toniazzo, Bernabe) with DOI links — defensible, current, appropriate for clinical audiences.
- The EFP jury quote on the homepage EFP card — the only external institutional voice on the site. It should stay prominently placed.
- "Not another PMS plugin." — The ForDentists H2 is the right idea. It needs a competitor table beneath it to do full positioning work.
- The regulatory restraint (no "diagnose," "treat," "cure," "adherence"). Consistent throughout current source. Correct decision.
- The WHO EUR 1/EUR 8-50 prevention ROI stat in the ForDentists CTA — the first economically-framed claim on the site. It should be repeated on Pricing.

---

*Filed 2026-03-06. Source code audited: Home.tsx, ForDentists.tsx, Features.tsx, Pricing.tsx, About.tsx, Blog.tsx, BlogPost.tsx (header section), App.tsx (router), fix-log-content.md, RE-AUDIT.md.*
*Cross-checked against RE-AUDIT.md confirmed misses (CM-01 through CM-06) and prior audit score reasoning.*
