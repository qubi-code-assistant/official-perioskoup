# Competitive Positioning Audit — Perioskoup
**Auditor:** Competitive Strategy Agent (Claude Sonnet 4.6)
**Date:** 2026-03-06
**Audit generation:** Final (supersedes re-06, cycle2-06, prior 06)
**Score:** 6.1 / 10
**Branch:** fix/final-launch-audit
**Pages audited:** Home.tsx, Features.tsx, ForDentists.tsx, Pricing.tsx, About.tsx, Blog.tsx, BlogPost.tsx, Waitlist.tsx, App.tsx (router), Navbar.tsx, Footer.tsx

---

## Score Card

| Dimension | Score | Notes |
|-----------|-------|-------|
| 1. Category creation clarity — "AI dental companion" | 6.5/10 | Label is distributed but not in the homepage H1; no dedicated URL |
| 2. Differentiation vs each named competitor | 4.0/10 | Generic PMS category addressed; 5 of 6 named competitors unaddressed on any marketing page |
| 3. "Between visits" gap — prominence | 7.0/10 | Strong H1 + three cited stats; still not monetised in practice-revenue terms |
| 4. Claims strength | 5.5/10 | Six cited academic sources; one uncited health stat; no Perioskoup-specific outcome data |
| 5. Unaddressed objections | 4.0/10 | Cost ROI partial; five major objection categories unanswered |
| 6. "Why now?" urgency | 5.0/10 | Lives only on About page; absent from both primary conversion pages |
| 7. Comparison page opportunity | 1.0/10 | Does not exist; no `/compare`, no `/vs/`, no `/ai-dental-companion` route |
| 8. Founder authority (Dr. Anca) | 6.0/10 | Used well as a quote and trust signal; clinical depth understated on ForDentists |
| 9. Use case clarity — dual audience | 6.5/10 | Dentist/patient paths are clear; dentist workflow specifics missing |
| 10. Brand voice distinctiveness | 7.5/10 | Strong; "Between visits, we take over" is a genuine category anchor |
| **Overall** | **6.1/10** | Seven structural gaps unchanged since initial audit; evidence quality is good |

---

## 1. Category Creation Clarity — "AI Dental Companion"

**Score: 6.5/10**

### What works

The category label is used consistently and in the right places:

- `Home.tsx:102` — hero subhead: "Perioskoup is an AI dental companion app — personalised guidance, habit tracking, and a direct line to your clinic between appointments."
- `Home.tsx:249` — section H2: "What is an AI dental companion?" — the single most important category-creation asset on the site. The accompanying body copy, "Not a chatbot. Not a practice management system. Not a fitness tracker for teeth. Perioskoup is the first," does the definitional work by exclusion.
- `Features.tsx:72-74` — H1: "AI dental companion features — everything between your visits." This is the only H1 on the site containing the exact category phrase.
- `ForDentists.tsx:248` — body: "It's the AI dental companion for what happens between visits."
- `Pricing.tsx:122` — beta notice: "Founding clinic partners of this AI dental companion get locked-in pricing..."
- `About.tsx:244` — Why Now: "making the AI dental companion possible for the first time."
- `Blog.tsx:246` — CTA: "The AI dental companion launching March 2026."
- `Footer.tsx:50` — tagline: "Your AI dental companion. Bridging the gap between clinic and home."
- Ticker (`Home.tsx:152`): "AI-Powered Dental Companion"

The "What is an AI dental companion?" section at `Home.tsx:244-262` is the site's strongest competitive asset. No other dental-adjacent product has a definition section that marks the category boundary this clearly. It should be treated as an untouchable founding document.

### What is missing

**The homepage H1 does not contain the category label.** `Home.tsx:95-98` reads: "Between visits, / we take over." This is the right emotional positioning. It is not the search association anchor. The Features page H1 is the only H1 with the exact phrase — and Features is a secondary page. For category ownership, the homepage H1 needs to carry the term or the category needs its own dedicated URL.

**No `/ai-dental-companion` route exists.** `App.tsx:86-98` lists eleven routes. An exact-match keyword URL is the single highest-value missing SEO asset for category ownership. This page could be as simple as an expanded version of the "What is an AI dental companion?" section from Home.tsx, with the category comparison table and a CTA. It would rank for a zero-competition search term and serve as the canonical definition page for the entire category.

**"Perioskoup is the first" is visually buried.** `Home.tsx:259` renders this sentence in muted grey (`#8C9C8C`) body copy at 17px. A first-mover claim in a new category requires visual weight proportional to its strategic importance. It is currently indistinguishable from surrounding explanatory copy.

---

## 2. Differentiation vs Each Named Competitor

**Score: 4.0/10**

This is the most consequential gap on the site and has been unchanged across all audit iterations.

### PerioPredict (perio-specific AI)

**Not mentioned anywhere on any marketing page.** The complementarity argument is entirely unarticulated: PerioPredict operates at chair-side, identifying risk at the point of examination. Perioskoup operates between visits, translating that risk assessment into patient action. These are not competing products — they are sequential in the care workflow. A single paragraph on ForDentists.tsx making this explicit would eliminate this competitor as a sales objection before it is raised.

### CareStack (practice management)

**Partially addressed at `ForDentists.tsx:238-255`.** The section "Not another PMS plugin." contains the right differentiation sentence: "Practice management systems track appointments. Patient portals send reminders. But neither helps a patient build the daily habits that prevent disease recurrence." This is correct and well-written. However, it is generic category differentiation that does not name any specific product. A dentist who uses CareStack and searches "CareStack patient engagement" would not find this page. The section also has no scannable structure — it is three unlabelled paragraphs under a heading, not a comparison table or bullet matrix.

### Dental Monitoring (remote monitoring)

**Completely unaddressed on any marketing page.** This is the most dangerous positioning gap because Dental Monitoring and Perioskoup both operate "between visits" and both have clinician dashboards. A dentist who already knows Dental Monitoring will map Perioskoup into the same mental category unless explicitly told otherwise. The distinction that matters: Dental Monitoring is hardware-dependent (scan boxes), ortho-focused, and captures scan data for clinical review. Perioskoup is hardware-free, perio/general-focused, and provides habit coaching and patient engagement. Neither `ForDentists.tsx` nor `Features.tsx` articulates any of these boundaries.

### Overjet / Pearl (diagnostic AI)

**Named in `BlogPost.tsx:209`** — "Companies like Overjet, Denti.AI, and Pearl have developed FDA-cleared diagnostic AI tools." This is the only named competitor differentiation on the site. It correctly frames them as image-analysis tools. The problem: this appears in article body copy on a non-conversion page. No dentist evaluating Perioskoup for their practice will read a blog article before making a decision. The differentiation needs to be on ForDentists.tsx or a comparison page.

### Dentistry.AI

**Not mentioned anywhere.** Not a priority given the competitor's footprint, but its absence reflects the overall pattern.

### The Missing Competitor Table

The single most actionable fix is a five-row comparison table on ForDentists.tsx showing the competitive landscape by category and operating window:

| Tool | Category | When it operates |
|------|----------|-----------------|
| Overjet / Pearl | Diagnostic AI | During the appointment |
| Dental Monitoring | Remote scan monitoring | Between ortho check-ins |
| CareStack | Practice management | Before and during appointments |
| PerioPredict | Perio risk stratification | During the appointment |
| **Perioskoup** | **AI Dental Companion** | **Between every appointment** |

This table requires approximately 30 minutes to implement, requires zero new research, answers the most common sales objection before it is raised, and defines the category by showing what Perioskoup is not. It should be added beneath the "Not another PMS plugin" section on ForDentists.tsx.

---

## 3. "Between Visits" Gap — Prominence

**Score: 7.0/10**

This is the strongest dimension on the site and the one where the evidence base is most solid.

### What works

- `Home.tsx:96-98` — H1: "Between visits, we take over." The strongest single piece of copy on the site. Category-defining without being clinical.
- `ForDentists.tsx:118-128` — The problem statement section contains three cited statistics:
  - 80% of care instructions forgotten within 48h (Kessels 2003, BMJ, DOI link present)
  - 30% of patients follow post-treatment oral hygiene instructions (J Clin Periodontol, link present)
  - EUR 90B annual oral disease burden in Europe (Platform for Better Oral Health in Europe, link present)
- `ForDentists.tsx:269-271` — WHO prevention ROI stat: "Every EUR 1 invested in prevention saves EUR 8-50 in future treatment costs." This is the first economically-framed claim on the site. It is correctly placed in the CTA section.
- `About.tsx:181-183` — H2: "Close the gap between visits" supported by three-stat mission card.
- `Features.tsx:75-77` — "From the moment a patient leaves the chair to their next appointment, Perioskoup keeps them engaged, informed, and consistent."

### What is missing

**The between-visits problem is not monetised in practice-revenue terms on any conversion page.** The WHO prevention ROI stat is a population-level economics argument. A solo practitioner evaluating a EUR 99/month subscription needs a concrete calculation: "If I recover one no-show per month, have I paid for Perioskoup?" This calculation is nowhere on the site. A single illustrative paragraph on Pricing.tsx or the ForDentists CTA would transform this dimension from academic to actionable.

**Pricing.tsx contains zero reference to the between-visits problem.** `Pricing.tsx` is a standalone conversion page where a dentist goes to make a financial decision. It lists features and says "Coming soon." No problem statement, no ROI frame, no connection between the product cost and the practice pain the product solves. This is the page where competitive differentiation has the highest conversion leverage — and it is currently inert from a positioning standpoint.

---

## 4. Claims Strength

**Score: 5.5/10**

### Cited claims (correct and defensible)

All six of the following appear with DOI or live links in current source:

1. 80% of care instructions forgotten within 48h — Kessels 2003, BMJ (DOI present at `ForDentists.tsx:136`)
2. 87% of mHealth studies show improved oral health outcomes — Toniazzo et al. 2019, JCP (DOI present at `ForDentists.tsx:137`)
3. 62% of adults have periodontitis worldwide — Bernabe et al. 2020, JCP (DOI present at `ForDentists.tsx:138`)
4. 30% of patients follow post-treatment instructions — J Clin Periodontol (link at `ForDentists.tsx:125`)
5. EUR 90B annual oral disease burden — Platform for Better Oral Health in Europe (link at `ForDentists.tsx:125`)
6. EUR 1 invested in prevention saves EUR 8-50 — WHO Oral Health (link at `ForDentists.tsx:270`)

The citation hygiene is the strongest it has been across all audit passes. The previous problematic unsourced outcome claims (40% fewer no-shows, 85% treatment acceptance, 3x engagement) have been correctly removed.

### The uncited stat — active credibility liability

`Features.tsx:18` — Progress Tracking card description reads: "Long-term maintenance studies show consistent daily routines reduce periodontal disease progression by 60-70%."

There is no source link, no author, no journal. This sits on a page where all other health claims are either cited or soft-framed. For a clinically-trained reader — who is the primary B2B buyer — this stat will read as anomalous and invite suspicion of the other claims nearby. Action required: either find the source (likely somewhere in the periodontal maintenance literature — Axelsson, Lindhe, or Ramfjord cohort studies are the probable candidates) and add a citation link, or soften to "research suggests" without a specific percentage.

### What is still absent

**No Perioskoup-specific outcome data exists anywhere on the site.** Every cited claim describes the problem space or the category potential — not what Perioskoup itself delivers to real patients or practices. "Our beta patients show X% improvement in habit consistency over 30 days" would be more persuasive than any population-level reference stat. This gap cannot be filled without actual beta data, but collecting and displaying even two or three beta patient testimonials with specific outcome data would transform the claims picture.

**The EFP Award is positioned as a trust badge, not a performance claim.** The EFP jury quote — "Perioskoup is an innovative digital tool that uses artificial intelligence to support both patients and clinicians" — is the only external institutional voice on the site. It validates the concept. It does not describe outcomes. It is correctly placed and well-presented at `Home.tsx:175-199`.

---

## 5. Unaddressed Objections

**Score: 4.0/10**

Six major objection categories exist for any B2B dental SaaS in a new category. The site addresses one partially.

### Partially addressed

**"How do I justify this cost?"** The WHO prevention ROI stat at `ForDentists.tsx:270` is the closest the site comes to an economic argument. It establishes the category logic (prevention is cost-effective) without connecting it to Perioskoup's specific price point. Improvement: add a specific calculation to the Pricing page.

### Not addressed

**"My patients won't download another app."** This is the single highest-frequency objection a dentist will raise and the entire revenue model depends on patient adoption. Zero counter-argument exists on any marketing page. The objection's obvious answer — that patient adoption is Perioskoup's responsibility, not the dentist's, and that the app's first 60 seconds are designed to convert skeptical patients — is never stated. `Features.tsx` lists smart reminders without explaining the onboarding mechanic.

**"How does this integrate with my PMS?"** `ForDentists.tsx:219` says "no hardware, no software migration, no training days" in a paragraph body sentence. This addresses the concern tangentially, not directly. No page walks through the dentist's actual workflow: log in via browser, create patient record, send invite link, set care plan. The absence of this workflow narrative means a dentist's imagination fills it with friction. Additionally, the label "Seamless Integration" at `Home.tsx:268` directly above the How It Works section implies PMS connectivity that does not exist. This label is the cheapest and most impactful fix available: four words changed to "The Between-Visit Workflow" would eliminate a contradiction that has persisted across all audit passes.

**"What is the learning curve?"** The ForDentists workflow card at `ForDentists.tsx:225` says "set a personalised care plan in under 2 minutes" — this is present but embedded in card body copy. It has never been elevated to a hero-level scannable claim. "Up and running in 10 minutes. First patient plan sent in 2." would function as an objection-killer in a hero-level proof point that the site currently lacks.

**"Data privacy — who owns the patient data?"** FAQ schemas on Home and ForDentists address GDPR and EU hosting at a consumer level. What is missing for a practice compliance decision is: (a) the data processor vs data controller distinction under GDPR Article 28, (b) data retention policy after a patient stops using the app, and (c) what happens to patient data if the company winds down. These are not marketing gaps — they are sales-process gaps that will block conversions at any dental group, NHS-adjacent practice, or multi-site operator with a compliance officer.

**"Is this a medical device — am I creating regulatory liability?"** The Home FAQ at `Home.tsx:42-43` states: "Perioskoup is a wellness and patient engagement companion, not a medical device." Correct. But the follow-on sentence — "The app is built with EU MDR and FDA SaMD guidance in mind" — signals unresolved regulatory positioning to a legal reader. "Built with guidance in mind" is not the same as "confirmed as a wellness tool under EU MDR Article 2." A dentist who asks their practice solicitor will get an uncertain answer. A dedicated regulatory FAQ page, or a clear one-pager, would remove this objection from the sales process.

---

## 6. "Why Now?" Urgency

**Score: 5.0/10**

The "Why Now?" argument exists only on the About page.

`About.tsx:233-250` — "Three things changed. AI became capable of personalising recommendations at scale. Smartphones became the primary health interface. And patients began expecting continuous digital support between appointments." This is the correct argument. It identifies three macro-level shifts that make 2026 the right moment for this category.

### The conversion problem

Neither the homepage nor ForDentists — the two primary conversion pages for a dentist evaluating Perioskoup — carries this argument. A dentist who lands on ForDentists and doesn't click through to About will never encounter a reason why "now" rather than "wait and see." At this stage, inertia is the dominant competitor. Every dentist who chooses to wait for more evidence is a lost conversion. The Why Now argument should appear on ForDentists.tsx, preferably above or near the primary CTA.

### The EFP Award as a market timing signal

The EFP Award is currently used as a trust badge (correctly). It could also be framed as a market timing signal: "In 2025, the European Federation of Periodontology formally recognised between-visit patient engagement as the critical frontier in periodontal care. Perioskoup is the first product built specifically for that frontier." This reframing is available in the existing content — it just requires a single paragraph on ForDentists.tsx connecting the award to the competitive window.

### The founding clinic programme creates urgency

The "limited spots" and "founding pricing locked in forever" language appears on ForDentists.tsx and Pricing.tsx. This is urgency for the deal terms, not for the market timing. Both types of urgency should be present. Currently only the deal-terms urgency exists on conversion pages.

---

## 7. Comparison Page Opportunity

**Score: 1.0/10**

The site has no comparison infrastructure. Confirmed via `App.tsx:86-98`: the router contains eleven routes. None of them are `/compare`, `/vs/`, `/ai-dental-companion`, or any variant of a competitive positioning page.

### The SEO opportunity that is open right now

As of March 2026, the following search terms have zero or near-zero meaningful organic competition:
- "AI dental companion" — the category is uncontested in search
- "Dental Monitoring alternative" — no comparison pages exist from any competitor
- "patient engagement app for dentists" — underserved
- "periodontal disease app for patients" — underserved

Every week without a page targeting these terms is a week the first-mover indexing advantage is unused. This opportunity is not permanent. As soon as another well-funded competitor enters the category, they will create this content and it will take Perioskoup months to recover the ranking position.

### Minimum viable comparison page

A `/compare` page with the following would cost approximately 4-5 hours of effort and generate compounding organic traffic:

1. The five-row category comparison table (shown in Section 2 above)
2. Three paragraphs of differentiation copy (one each for Dental Monitoring, PMS/CareStack, and Diagnostic AI/Overjet/Pearl)
3. The "What is an AI dental companion?" definition section, linked back from the main homepage section
4. A waitlist CTA

This page does not require naming competitors aggressively or making comparative claims that carry legal risk. It simply defines the category landscape and shows where Perioskoup fits.

---

## 8. Founder Authority — Dr. Anca Constantin

**Score: 6.0/10**

Dr. Anca's credibility is used as a trust signal in three places:
- `Home.tsx:106-113` — hero blockquote: "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes." This is the most prominently placed founder quote.
- `Home.tsx:342-354` — social proof quote: "The app I always wished I could prescribe to my patients." Attributed to Dr. Anca with photo and role.
- `ForDentists.tsx:153-172` — standalone quote section with photo, role, and EFP award mention.
- `About.tsx` — full team section with bio, LinkedIn, and credentials.
- `BlogPost.tsx` — two articles authored under her name with author byline and bio.

### What works

The clinical founder narrative is authentic and correctly presented. The EFP Award acts as third-party institutional validation of her credibility, not just the product's quality. The author bios on blog articles ("Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania...") are the right depth for clinical audiences.

### What is underused

Dr. Anca's clinical depth as a periodontist — specifically her experience treating hundreds of patients with the exact problem Perioskoup addresses — is never quantified or made specific anywhere on the site. "Treated hundreds of patients with periodontal disease" (from the blog bio) is good. "After seeing 400+ patients forget their care instructions, I built the app I wish I could prescribe" would be more conversion-optimised. A clinical founder who built the product out of direct patient need is a category-defining narrative. The site has it. It doesn't use it with the specificity that would make it stick.

**On ForDentists.tsx specifically**, Dr. Anca's periodontist credentials are not used to validate the clinical workflow cards (Practice Dashboard, Personalised Care Plans, Engagement Insights). A dentist reading those sections has no signal that the features were designed by someone who runs a clinic. A single line — "Designed by Dr. Anca Constantin, practising periodontist" — under each card header would be a small change with a meaningful trust effect.

---

## 9. Use Case Clarity — Dual Audience

**Score: 6.5/10**

The dual-audience architecture is structurally present and reasonably executed:

- Navbar `ForDentists.tsx` link is the primary dentist entry point.
- Waitlist.tsx allows role selection (dentist/patient) on a single form with branched fields.
- Features.tsx uses tag labels (Patients, Dentists, Both) to segment feature relevance.
- Pricing.tsx shows two plans (Patient: free; Clinic: coming soon) side by side.

### What works

The dentist's journey is: ForDentists landing page → problem statement + stats → clinical tools overview → workflow section → CTA. This journey is reasonably coherent and evidence-backed.

The patient's journey is: Home hero → ticker → EFP card → features bento → "What is an AI dental companion?" definition → How It Works three-step → waitlist.

### What is missing

**The dentist's workflow specifics are abstracted.** `ForDentists.tsx:222-235` describes "Before / During / After" cards, but never shows the dentist what they actually do in the dashboard. No screenshot, no UI mockup, no "here's what you'll see when you log in" narrative. This is a significant conversion gap: a dentist who cannot visualize the daily workflow will not commit to a waitlist. The patient side has a phone mockup (`Home.tsx:133-141` via `PhoneMockup`). The dentist side has text cards.

**No patient perspective on the dentist pages.** ForDentists.tsx describes what the dentist can do. It does not describe what the patient experiences — which is what determines whether a dentist's recommendation will be followed. A dentist who recommends Perioskoup to a patient needs confidence that the patient will actually use it. A short "what your patients see" section on ForDentists.tsx, with the patient's first three screens or the onboarding flow, would address this directly.

---

## 10. Brand Voice Distinctiveness

**Score: 7.5/10**

The brand voice is genuinely distinctive by dental-tech standards. The specific combination of:
- Clinical precision in the evidence base (DOI-cited academic sources)
- Human warmth in the copy ("The app I always wished I could prescribe")
- Confident category assertion ("Perioskoup is the first")
- Non-corporate brevity ("Between visits, we take over")

...creates a voice that does not sound like a dental PMS, a generic health app, or a Silicon Valley wellness startup. The dark-navy premium design reinforces the clinical authority signal without the coldness of typical medical software.

### What works

- `Home.tsx:96-98` — "Between visits, we take over." — the strongest category-defining headline in dental tech. Short, confident, direct.
- `Home.tsx:255-256` — "Not a chatbot. Not a practice management system. Not a fitness tracker for teeth." — negation positioning is a legitimate category-creation technique and is used correctly here.
- `ForDentists.tsx:241-243` — "Not another PMS plugin." — right tone, right level of directness for a dentist audience.
- The regulatory restraint throughout (no "diagnose," "treat," "cure," "adherence") is consistent and correctly maintained.

### What could be stronger

**The blog excerpt at `Blog.tsx:79` still reads "a periodontist, a developer, and a product designer."** This describes the wrong team composition (old founding team framing) and is visible to every cold visitor who scrolls the blog listing without opening the article. The correct description — "a periodontist, an engineer, and an AI specialist" — appears correctly on About.tsx. This inconsistency undermines the credibility of the "built by clinicians and technologists" narrative. It is a two-minute fix.

**The tone on Pricing.tsx is the weakest on the site.** The FAQ section at `Pricing.tsx:171-182` uses generic answers that do not reflect the specific positioning language used elsewhere. "We're in beta - so right now, Perioskoup is free for patients. Clinic pricing is coming soon." is the kind of placeholder copy that telegraphs pre-launch uncertainty rather than category confidence. Compare this to the voice on ForDentists.tsx. A visitor who reads both pages in sequence will notice the register change.

---

## Priority Fixes — Ranked by Impact vs Effort

### P1 — Immediate (under 2 hours each, zero new research)

**P1-A: Change "Seamless Integration" label to "The Between-Visit Workflow"**
- `Home.tsx:268` — label tag above "From Chair to Chat" H2
- Current text: `Seamless Integration`
- Required text: `The Between-Visit Workflow` or `How It Works`
- Rationale: The label implies PMS integration. ForDentists.tsx explicitly denies this. The contradiction is visible to any dentist who reads both pages. This has been flagged in every prior audit pass and remains unfixed.

**P1-B: Fix the Blog.tsx "product designer" excerpt**
- `Blog.tsx:79` — excerpt field
- Current: "a periodontist, a developer, and a product designer"
- Required: "a periodontist, an engineer, and an AI specialist"
- Rationale: This is visible to cold visitors without opening the article. It contradicts the team description on About.tsx.

**P1-C: Cite or soften the 60-70% stat**
- `Features.tsx:18` — Progress Tracking card description
- Current: "Long-term maintenance studies show consistent daily routines reduce periodontal disease progression by 60-70%."
- Required: Either add a citation link (likely Axelsson & Lindhe maintenance cohort studies) or soften to "research suggests significant reduction in disease progression"
- Rationale: Uncited health stat on a page where all other claims are cited; credibility liability with clinical audience.

**P1-D: Elevate "Perioskoup is the first" to a visually weighted element**
- `Home.tsx:259` — currently muted grey body copy
- Required: Bold text, a pullquote, or a stat-card-weight element
- Rationale: Category primacy claims require visual weight. Currently invisible to scanning readers.

### P2 — High Priority (2-4 hours each)

**P2-A: Add the competitor category table to ForDentists.tsx**
- Insert after the "Not another PMS plugin" section (`ForDentists.tsx:238-255`)
- Content: Five-row table showing the competitive landscape by category and operating window (shown in Section 2 above)
- Rationale: Highest competitive positioning ROI available. Answers the most common sales objection before it is raised. No new research required.

**P2-B: Add one ROI paragraph to Pricing.tsx**
- Insert above or near the beta notice (`Pricing.tsx:116-124`)
- Content: Illustrative calculation connecting a prevented no-show to months of Perioskoup coverage at founding clinic pricing
- Rationale: Pricing.tsx is where the subscription decision is made. It currently contains zero connection between product cost and the practice pain the product solves.

**P2-C: Add a "Why Now?" paragraph to ForDentists.tsx**
- Insert above or near the founding clinic CTA (`ForDentists.tsx:257-283`)
- Content: One paragraph framing the EFP Award as a market timing signal and the founding clinic opportunity as a competitive window
- Rationale: "Why now?" urgency exists only on the About page. Primary conversion page carries none of it.

### P3 — Structural (4-8 hours)

**P3-A: Create `/compare` page**
- New route in `App.tsx`; new `Compare.tsx` page
- Content: Category table, three differentiation paragraphs, "What is an AI dental companion?" definition, waitlist CTA
- Rationale: Zero-competition SEO terms, uncontested category definition space, answers the most common sales objection. Every week this page doesn't exist is a week of foregone indexing.

**P3-B: Add a "What your patients see" section to ForDentists.tsx**
- Insert after the clinical tools section
- Content: 3-screen narrative of the patient onboarding flow, or a phone mockup showing the patient app
- Rationale: A dentist who cannot visualize what their patient experiences will not recommend the app.

**P3-C: Add "Why Now?" paragraph to Home.tsx**
- Insert in the EFP Award card section or as a standalone section
- Content: The three macro-level shifts from About.tsx, compressed to 3-4 sentences
- Rationale: Homepage is the highest-traffic page. Category urgency should appear here, not only on About.

---

## What Must Not Change

The following copy and assets are correctly positioned and must be preserved in any future edits:

1. **"Between visits, we take over."** — `Home.tsx:96-98`. The H1. The best piece of copy on the site.
2. **"What is an AI dental companion?"** section — `Home.tsx:244-262`. The category definition by exclusion. "Not a chatbot. Not a practice management system. Not a fitness tracker for teeth." is the most important category-creation asset on the site.
3. **The three-citation stats block** — Kessels, Toniazzo, Bernabe with DOI links. Defensible, current, appropriate for clinical audiences.
4. **The EFP jury quote** — "Perioskoup is an innovative digital tool that uses artificial intelligence to support both patients and clinicians." The only external institutional voice on the site.
5. **"Not another PMS plugin."** — `ForDentists.tsx:241`. Right framing. Needs a competitor table beneath it to complete the work.
6. **The regulatory restraint** — No "diagnose," "treat," "cure," "adherence" anywhere in current source. Consistent and correct.
7. **The WHO EUR 1/EUR 8-50 prevention ROI stat** — `ForDentists.tsx:270`. First economically-framed claim on the site. Should be replicated on Pricing.tsx.

---

## Overall Assessment

The site has genuine competitive positioning assets — notably the category-defining headline, the "What is an AI dental companion?" definition section, the clinical founder narrative, and a solid evidence base. These are real, and they represent more category clarity than most dental-tech sites achieve at this stage.

The gap is structural: seven issues identified in the initial audit remain open after multiple revision passes. They are not expensive to fix. The comparison table (P2-A) is 30 minutes. The label change (P1-A) is 30 seconds. The blog excerpt (P1-B) is 2 minutes. The ROI paragraph (P2-B) is 1 hour.

The combined effect of these unfixed items is that a dentist comparing Perioskoup against Dental Monitoring, or asking "why now rather than wait," or wondering what their patients will see — leaves every page without an answer. Conversion depends on answering those questions. The site currently relies on the dentist to be patient enough to read between the lines.

**Overall Score: 6.1/10**

The score is held at 6.1 because the evidence quality and brand voice are genuinely good (preventing a lower score) and because the seven structural gaps are all still open (preventing a higher one). Addressing P1-A through P1-D, P2-A, and P2-B would move the score to approximately 7.5/10 with an estimated 6-8 hours of effort.

---

*Filed: 2026-03-06. Source audited: Home.tsx, Features.tsx, ForDentists.tsx, Pricing.tsx, About.tsx, Blog.tsx, BlogPost.tsx, Waitlist.tsx, App.tsx, Navbar.tsx, Footer.tsx. Cross-referenced against re-06-competitive-positioning.md and cycle2-06-competitive.md for change detection.*
