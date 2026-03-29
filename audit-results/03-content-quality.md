# Content Quality Audit — Perioskoup Landing Page
**Auditor:** Claude Sonnet 4.6 (Content Quality Agent)
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Scope:** All pages in `client/src/pages/`, `client/public/llms.txt`, cross-referenced against `FEATURE_TRUTH_TABLE.md` and `MEDICAL_STUDIES.md`

---

## OVERALL SCORE: 7.2 / 10

Strong foundations: evidence is cited, regulatory language is clean, the EFP award is deployed effectively, and the blog content is genuinely substantive. The score is held back by feature accuracy gaps, three statistical mismatches with the truth table, one AI capability overstatement on the homepage, a duplicate content block in `llms.txt`, and several missing content opportunities that would materially improve conversion and SEO.

---

## SECTION 1: FEATURE ACCURACY

### Critical Issues

**ISSUE FA-01 — `Home.tsx` line 223: AI capability overstatement**
The "AI-Powered Guidance" bento card reads:
> "Perioskoup's AI analyses your dental history and daily habits to deliver personalised recommendations - not generic advice. **It learns what works for you and adapts over time.**"

The truth table shows the Periobot AI Chatbot is "In Progress" and patient habit tracking is "In Progress." The phrase "analyses your dental history" and especially "learns what works for you and adapts over time" implies a live, working adaptive AI system. This is a material overstatement for a feature that is not yet complete. The claim needs to be scoped to what is actually built or marked as forthcoming.

Suggested replacement:
> "Perioskoup's AI translates your dentist's recommendations into a personalised daily programme — not generic advice. As you build consistency, the plan adapts to your routine. Launching with the app."

**ISSUE FA-02 — `ForDentists.tsx` lines 25–26: Illustrated instructions and medication reminders claimed as working**
The "Personalised Care Plans" feature card includes these bullets as working:
- "Illustrated home care guides"
- "Medication reminders"
- "Post-procedure instructions"

The truth table shows Treatment plans are "Done" on the dentist side but only the core record/edit/version flow is confirmed done. Illustrated guides and medication reminders are not listed as done features and are not confirmed in the truth table. These should be flagged with "In Development" badges or removed until confirmed.

**ISSUE FA-03 — `ForDentists.tsx` lines 19–20: Practice Dashboard described with "upcoming appointments" and "AI-generated summaries"**
The Practice Dashboard feature card includes:
> "Everything you need before you walk into the room"
> Bullets: "Appointment preparation briefs", "Exportable clinical summaries"

The truth table shows "Appointments" on the dentist side as "In Progress" and the Chatbot as "In Progress." AI-generated summaries and appointment preparation briefs are not in the "Done" category. These should be labelled "In Development" rather than presented as working capabilities.

**ISSUE FA-04 — `Features.tsx` line 18: "Progress Tracking" presented with check marks but no "In Progress" badge**
The "Progress Tracking" feature card for patients has no beta or "in development" badge, yet the truth table shows "Track habits page / Mark as done / 90s timer" as In Progress and "Health Trends page / View Analytics page" as Not Started. The description mentions "Visual timelines and habit streaks" — streaks are In Progress, visual timelines/dashboards map to Health Trends which is Not Started. The bullet "Visual progress dashboards" is the most problematic item.

Suggested fix: Add an "In Development" badge to this card consistent with how other cards handle it.

**ISSUE FA-05 — `Pricing.tsx` line 31: "Analytics & engagement reports" listed as a Clinic feature with "(coming soon)"**
This is correctly scoped. No action needed — "(coming soon)" is appropriate.

**ISSUE FA-06 — `Pricing.tsx` line 31: "Multi-dentist support" listed as a Clinic feature**
Multi-dentist support is not in the truth table at all — neither Done, In Progress, nor Not Started. If it is not confirmed for launch, this is a speculative feature claim. Needs validation or a "coming soon" qualifier.

### Acceptable Feature Handling

- `ForDentists.tsx` line 31–32: "Engagement Insights" correctly notes "coming in Q2 2026" — this is accurate.
- `Features.tsx`: "Education Library" correctly marked "Coming Soon", "Appointment Prep" correctly marked "In Development", "AI Clinical Companion" and "Smart Reminders" correctly marked "Beta."
- `Pricing.tsx` patient plan: "Progress tracking (coming soon)" and "Educational content library (coming soon)" — correctly scoped.

---

## SECTION 2: REGULATORY LANGUAGE SCAN

**No forbidden terms found in page content.**

A systematic search for: "compliance", "diagnose", "treat", "cure", "adherence", "therapeutic", "clinical guidance", "monitor inflammation", "track bleeding" returned zero matches across all pages.

**Observations:**

The word "treat" appears only in blog article bodies (`BlogPost.tsx`) in the medically correct sense: "Treatment involves scaling and root planing" — this is educational content describing clinical procedures that dentists perform, not a claim that the app treats disease. This is acceptable.

The phrase "diagnose" appears in `BlogPost.tsx` and `ForDentists.tsx` FAQ only to explicitly deny: "It does not provide diagnoses." This is correct regulatory positioning.

The FAQ in `Home.tsx` line 42 and `ForDentists.tsx` line 44 both include: "The app is built with EU MDR and FDA SaMD guidance in mind." This phrase is well-intentioned but creates a subtle risk: it implies a regulated product category (SaMD) which Perioskoup explicitly wants to avoid. The Terms page (line 16) already contains a SaMD disclaimer. Referencing SaMD in patient-facing FAQs without adequate context could confuse patients about the app's nature. Consider replacing with: "Built with GDPR and data privacy principles as our foundation."

**ISSUE REG-01 — `ForDentists.tsx` line 85: "reducing no-shows"**
The claim "reducing no-shows" appears in the hero subhead and meta description. No-show reduction implies the app can measurably affect appointment attendance rates. This is not a validated outcome claim for Perioskoup (no study cited, no internal data cited). The MEDICAL_STUDIES.md does not list this as a supported claim. This should be removed or replaced with something the product can actually support.

**ISSUE REG-02 — `Home.tsx` line 225: "monitor patient engagement"**
The bento card "For Clinicians" reads: "Dentists and periodontists get a dashboard to **monitor** patient engagement." In wellness-app context "monitor" is borderline — it implies ongoing clinical surveillance. Preferred phrasing: "track" or "view" patient engagement. Cross-reference: the truth table shows "Engagement Insights" / patient monitoring features are In Progress, not Done, which makes this doubly important to soften.

---

## SECTION 3: MEDICAL EVIDENCE ACCURACY

### Statistics Cross-Referenced Against MEDICAL_STUDIES.md

**STAT-01 — "80% of instructions forgotten within 48h" (`ForDentists.tsx` line 136, `About.tsx` line 196)**
Cited as "Kessels 2003, BMJ" with DOI `10.1136/bmj.326.7395.920`. The MEDICAL_STUDIES.md cites Kessels (2003) as: "Patients forget 40–80% of medical information provided by healthcare practitioners immediately." The website simplifies this to "80%" without the 40% lower bound. This is a selective use of the upper bound from a range. More accurate would be "40–80%." The DOI is also incorrect — the Kessels 2003 paper is in the *Journal of the Royal Society of Medicine* (`PMC539473`), not BMJ. The BMJ DOI shown (`10.1136/bmj.326.7395.920`) resolves to a different paper. This is a citation error that must be corrected.

Correct citation: Kessels, R.P.C. (2003). "Patients' memory for medical information." *Journal of the Royal Society of Medicine*, 96(5), 219–222. https://pubmed.ncbi.nlm.nih.gov/12739284/

**STAT-02 — "62% of adults have periodontitis worldwide" (`ForDentists.tsx` line 138, `About.tsx` line 195)**
Cited as "Bernabe et al. 2020, JCP" with DOI `10.1111/jcpe.13217`. The MEDICAL_STUDIES.md does not list a 62% figure; it lists 50% of European adults (PMC7275199) and 11.2% with severe periodontitis globally. The 62% figure is inconsistent with the MEDICAL_STUDIES.md source list. The Bernabe 2020 paper (Global Burden of Disease) found that 45% of the global population had some form of periodontal disease, with 11.2% having severe periodontitis. A "62% of adults" figure for all periodontitis may come from a specific study but is not in the approved evidence base. This needs to be verified against the actual paper before publication.

**STAT-03 — "87% of mHealth studies show improved outcomes" (`ForDentists.tsx` line 137, `About.tsx` line 197)**
Cited as "Toniazzo et al. 2019, JCP" with DOI `10.1111/jcpe.13064`. This stat is not in `MEDICAL_STUDIES.md` at all. The stat is plausible (Toniazzo 2019 is a real systematic review of mHealth in periodontal care) but it is not in the approved evidence base. The team needs to read the actual paper to confirm the 87% figure reflects what the paper concludes and that the framing "improved outcomes" is an accurate summary of the study's finding.

**STAT-04 — `ForDentists.tsx` lines 119–120: "Patients forget 80% of care instructions within 48 hours"**
This statement appears in body copy without a citation link. This is the same Kessels stat but presented inline as prose without sourcing. Since the paragraph does contain a linked citation further down, this is a lesser issue, but the 80% number should be "40–80%" here too.

**STAT-05 — `BlogPost.tsx` (article: "what-is-periodontal-disease") line 54: "approximately 50% of adults have some form of gum disease"**
Attributed to the European Federation of Periodontology. This matches the MEDICAL_STUDIES.md source (PMC7275199). Acceptable. The citation inline is by attribution name only, not DOI. For blog content this is fine stylistically, but a linked reference would be better practice.

**STAT-06 — `BlogPost.tsx` (article: "why-patients-forget-instructions") lines 492–493**
States patients recall "only 20–40% of information during a dental consultation" citing "Journal of the American Dental Association" and a study in the "British Dental Journal." No DOIs or specific citations are given for either journal reference. These are specific study citations presented without enough detail to verify. They need DOIs or at minimum author/year.

**STAT-07 — `About.tsx` line 186 and `About.tsx` FAQ line 86: "1 in 2 adults worldwide"**
"Periodontal disease affects 1 in 2 adults worldwide" — this is a simplified restatement of the 50% European figure. The MEDICAL_STUDIES.md source is European-focused (PMC7275199). The Global Burden of Disease 2019 gives 45% globally, not 50%. "1 in 2 worldwide" is a slight overstatement. Either change "worldwide" to "in Europe" or use "nearly 1 in 2" for the global claim.

### Evidence Usage Gaps (Recommended Additions per MEDICAL_STUDIES.md)

The MEDICAL_STUDIES.md identifies key stats that are not yet deployed on the website but should be:

- "Every €1 invested in prevention saves €8–50 in treatment" — `ForDentists.tsx` line 270 correctly uses this with WHO source. Good.
- "Oral diseases cost €90 billion annually in Europe" — `ForDentists.tsx` line 125 uses this with the Platform for Better Oral Health citation. Good.
- "50% of Europeans have gum disease" — used in blog article text. Should also appear on Homepage hero/problem section with a citation link. Currently the homepage has no cited statistics at all.
- "Consistent daily oral hygiene routines reduce periodontal disease progression by 60–70%" — this appears in `Features.tsx` line 18 but with no citation. The MEDICAL_STUDIES.md source is "Long-term maintenance studies in periodontal patients" which is vague. Add a specific DOI or remove the percentage claim.

---

## SECTION 4: MESSAGING CLARITY (3-SECOND TEST)

### Homepage (`Home.tsx`)

**PASS.** The headline "Between visits, we take over." with the subhead "Perioskoup is an AI dental companion app — personalised guidance, habit tracking, and a direct line to your clinic between appointments" clears the 3-second test cleanly. The value proposition is explicit. The dual-audience split (patient/clinician CTA row) is visible above the fold.

**Minor issue:** The Dr. Anca quote appears before the primary CTAs render on mobile at narrow viewport widths, burying the CTA. The quote has conversion value but its position (between headline and CTAs) creates friction. Consider moving it below the CTA row.

**Minor issue:** The "What is an AI dental companion?" section (`Home.tsx` lines 244–262) repeats the same definition twice: once in the `<p>` at line 251 and again almost identically in the `<p>` at line 257. This is a duplicate paragraph within a single section.

Lines 251–252:
> "An AI dental companion translates clinical recommendations into personalised daily habits. It bridges the gap between what your dentist recommends and what you actually do at home."

Lines 257–258:
> "An AI dental companion translates clinical recommendations into personalised daily habits - with smart reminders, progress tracking, and a direct line to your dental team."

These are functionally the same sentence appearing twice in six lines. Delete one.

### Features Page (`Features.tsx`)

**PASS.** The page hero is clear. Feature cards are well-labelled with audience tags (Patients / Dentists / Both) and status badges (Beta / Coming Soon / In Development). This is the correct pattern.

**Minor issue:** The CTA section at the bottom (`Features.tsx` lines 139–144) has a content duplication: "Join 30+ founding clinics on the Perioskoup waitlist. Free for patients, founding pricing for clinics." is followed immediately by "Join the founding waitlist and be among the first to experience Perioskoup." These two sentences say the same thing. Remove the second.

### For Dentists Page (`ForDentists.tsx`)

**PASS on clarity.** The H1 "Your patients, better prepared." is sharp and dentist-specific. The problem-first section with the Weinert 2025 citation is strong.

**Issue:** "reducing no-shows" claim in hero subhead and meta description (see REG-01 above) is an unsubstantiated outcome claim.

**Issue:** The "Engagement Insights" feature card (`ForDentists.tsx` lines 31–32) is correctly qualified, but the parent "Clinical Tools" section heading implies all three cards are clinical tools that work today. The visual presentation does not visually distinguish "done" from "in development" features in this list. A status indicator (even a small badge) would help set expectations.

### Pricing Page (`Pricing.tsx`)

**PASS.** "Coming soon" on the Clinic price and the beta notice banner are appropriately honest. The blur-overlay approach described in CLAUDE.md appears to not be implemented — the page shows prices as "Free" and "Coming soon" text, which is actually cleaner than a blur overlay. The pricing page functions correctly as a pre-launch signal page.

**Issue:** The Patient plan feature list (`Pricing.tsx` line 21) includes "Personalized care plan" with no "(coming soon)" qualifier, yet the care plan on the patient side is "In Progress" per the truth table. The care plan is Done for the dentist side but only In Progress for the patient view. This bullet needs a "(coming soon)" qualifier.

**Issue:** The pricing FAQ (`Pricing.tsx` line 47) states the Patient plan includes "personalised care plans, daily habit reminders, progress tracking, and access to the educational content library" — but progress tracking and the educational library are both "In Progress" or "Not Started" on the patient side. The FAQ answer overstates what is currently available.

### About Page (`About.tsx`)

**PASS.** The team section is well-executed. The founder bios are specific and human. The EFP award section with the ceremony photo is strong social proof.

**Issue:** Dr. Anca's credential is listed as "DMD, PhD in Periodontology" (`About.tsx` line 268). The `llms.txt` says "DMD, Specialist in Periodontology." These are inconsistent. A PhD and a Specialist designation are different credentials. Verify which is accurate and standardise across all pages.

**Issue:** `About.tsx` line 268 describes Eduard as "Full-stack engineer & growth strategist" in his credentials line. This is a weaker credential statement than on the llms.txt which says "Full-stack engineer and growth strategist." Minor wording inconsistency but fine.

### Waitlist Page (`Waitlist.tsx`)

**PASS on form UX.** The role selector (Patient / Dentist clinic) is a smart UX pattern. The social proof block (30+ founding clinics, EFP Award 2025) is appropriately placed.

**Issue:** The form is a frontend-only mock — `handleSubmit` sets `submitted = true` with no actual data submission (`Waitlist.tsx` lines 40–42). The "success" state is shown without any data being captured. If this is intentional for the beta launch and data is being captured elsewhere (e.g., a CRM email), this needs documentation. If not, this is a data capture failure for every person who joins the waitlist.

### Contact Page (`Contact.tsx`)

**PASS.** Clean and professional. Contact form has proper validation. Email addresses are present. 24-hour response promise is a trust signal.

**Issue:** The contact form has the same frontend-only mock pattern as the waitlist — `setSent(true)` is called without any backend call (`Contact.tsx` line 39). If messages are not actually being received, this is a critical business process failure.

**Issue:** `Contact.tsx` line 128 — Location listed as "Based in Europe" with "Serving dental practices worldwide." This is vague. The About page and llms.txt correctly state "Bucharest, Romania." The Contact page should reflect the actual base location for trust purposes.

---

## SECTION 5: CTA QUALITY AND CONSISTENCY

**Observations:**

1. Primary CTA across all pages is consistently "Join the Waitlist" → `/waitlist`. This is correct.
2. Secondary CTA for patients varies: "For Clinicians" (Home), "For Dentists" (Features). The label should be standardised — use "For Dentists" or "For Clinicians" but not both.
3. `ForDentists.tsx` uses "Apply as a Founding Clinic" as the primary CTA — this is well-differentiated and appropriate.
4. `About.tsx` bottom CTA (`line 308`) reads "Join the Waitlist" with a secondary "Contact Us." Strong and appropriate.
5. `Features.tsx` secondary CTA near bottom reads "For Dentists" (`line 83`) — consistent with that page's context.

**Issue:** The ticker (`Home.tsx` line 151) includes "Trusted by Periodontists" as a scrolling claim. There is no social proof on the homepage backing this claim (no clinic names, no testimonials, no count). This is either an unsubstantiated claim or it refers to the 30+ clinics on the waitlist, which has not yet used the product. Remove "Trusted by Periodontists" or replace with "30+ Founding Clinics" which is both accurate and more specific.

**Issue:** `Features.tsx` CTA section has a duplicate `<p>` block rendering both "Join 30+ founding clinics..." and "Join the founding waitlist..." directly adjacent. One should be removed.

---

## SECTION 6: EFP AWARD USAGE

**Verdict: Well-executed with one accuracy issue.**

The award is used on:
- Homepage badge + full EFP award card section with ceremony photo
- For Dentists page badge
- Pricing page badge
- Waitlist page social proof block
- About page recognition section
- Blog post article (dedicated article)
- llms.txt
- All meta descriptions reference "EFP Award Winner 2025"

The EFP quote is correctly attributed to the European Federation of Periodontology. The jury names (Deschner, Herrera, Stavropoulos) are included in supporting copy. The link to the EFP announcement is consistent across pages.

**Issue:** The award is described as "EFP Innovation Award Winner 2025" in multiple badge labels, but the correct award name is "EFP Digital Innovation Award 2025 — 3rd Prize." The badges omit "Digital" and omit "3rd Prize." This is materially incomplete. A "3rd Prize" at a real international competition from 20 submissions is impressive and honest. Omitting "3rd Prize" and simplifying to "Winner" is technically true but creates a misimpression. Recommend updating to: "EFP Digital Innovation Award 2025 — 3rd Prize" in badge text, or at minimum "EFP Award 2025 — 3rd Prize."

The detailed supporting copy on the Homepage, About, and ForDentists pages correctly says "3rd Prize" and "20 submissions across 17 national societies" — the badge labels are the only place this is shortened without qualification.

---

## SECTION 7: BLOG CONTENT QUALITY

### Depth and Accuracy

**"What Is Periodontal Disease?" (`BlogPost.tsx` lines 39–180)**
Verdict: Strong. Clinically accurate staging description (4-stage system aligned with current EFP classification), correct risk factors, appropriate systemic connection section. The closing section on Perioskoup's role is a natural soft sell. Length is appropriate for the keyword target. 

Citation gap: The claim "approximately 50% of adults have some form of gum disease" is attributed to "the European Federation of Periodontology" without a direct URL or DOI in the article body. Add a footnote link.

**"How AI Is Changing Dental Monitoring" (`BlogPost.tsx` lines 182–281)**
Verdict: Strong for authority building. The section "What AI Cannot Do" is a genuine trust signal — it proactively limits claims. The Perioskoup positioning as "clinician-controlled" is correctly framed. The blog post does not overstate AI capabilities in the product.

No statistical citations in this article — the piece is more editorial/opinion than evidence-based. That is appropriate for a Technology category article but a mention of the Toniazzo 2019 mHealth systematic review would strengthen it given the claim that "AI coaching can provide all of them."

**"The 3-Minute Daily Routine" (`BlogPost.tsx` lines 283–401)**
Verdict: Excellent. This is the strongest patient-facing content. The modified Bass technique is correctly cited to EFP guidelines. The "interdental cleaning before brushing" recommendation is current EFP/BSP guidance. The habit formation section (habit stacking, two-day rule) is evidence-informed without overclaiming. Natural Perioskoup placement at the end.

Missing: No specific citation for "Research on habit formation consistently shows that tracking increases engagement." A single citation (e.g., Lally et al., 2010 habit formation study) would strengthen this.

**"Perioskoup Wins EFP Digital Innovation Award 2025" (`BlogPost.tsx` lines 403–471)**
Verdict: Good but thin. This is a 4-minute company news piece appropriately sized. The EFP quote is correct. The narrative is authentic. As it is dated May 2025 and we are now March 2026, this article would benefit from an update section noting what has happened since (30+ clinics, beta progress, March 2026 launch). A "What's happened since" section would add freshness signals.

**"Why Patients Forget Dental Instructions" (`BlogPost.tsx` lines 473–569)**
Verdict: Strong clinical insight piece. The Ebbinghaus forgetting curve framing is accurate. The section on why dental consultations are poor learning environments is original and differentiating.

Critical citation issue: Lines 492–493 cite "Journal of the American Dental Association" and "British Dental Journal" without specific authors, years, or DOIs. These are presented as specific studies with specific findings ("20–40% recall" and "fewer than half recalled"). Without verifiable citations, these claims cannot be audited and could be challenged. Add author/year/DOI for both.

**"Building the Bridge: The Perioskoup Story" (`BlogPost.tsx` lines 571–end)**
Verdict: Strong brand narrative. Authentic voice, clinical origin story is compelling. The Bucharest patient vignette is specific and believable. Length is appropriate for the Founder Story category.

No issues found. This is the best brand storytelling on the site.

### Keyword Targeting Assessment

- "What is periodontal disease" — correctly targeted keyword, competitive but appropriate for authority building
- "AI dental companion" — category-creation keyword, low competition, correctly used across homepage meta
- "Dental patient engagement app" — used in ForDentists page title, appropriate for B2B target
- "3-minute dental routine" — good longtail target, correctly in article title and meta
- "Why patients forget dental instructions" — niche but high-intent for dentist audience

**Missing content gaps:**
1. No article targeting "gum disease treatment" or "periodontitis symptoms" — these are high-volume patient search terms
2. No article on "periodontal maintenance" — direct target for the product's core use case
3. No "for periodontists" landing page — the current ForDentists page speaks to all dentists; periodontists are the primary early adopter segment and deserve a dedicated page or at minimum a dedicated section
4. No "AI vs. traditional patient education" comparison content
5. No "what to expect at a periodontal appointment" article — high patient intent, natural Perioskoup touchpoint

### Internal Linking

Internal linking between blog articles is absent. Each article mentions Perioskoup and links to the waitlist but articles do not cross-link to each other. For example:
- "Why Patients Forget" should link to "The 3-Minute Routine" (solution to the problem described)
- "What is Periodontal Disease" should link to "Why Patients Forget" (explains why treatment doesn't stick)
- The EFP Award article should link to "Building the Bridge" (company story context)

This is a structural SEO gap and a user experience gap.

---

## SECTION 8: DUPLICATE CONTENT

**DUP-01 — `llms.txt` lines 37–38: duplicate line**
```
- GDPR-compliant data storage in EU-based servers
- GDPR-compliant data storage in EU-based servers
```
The same bullet appears twice consecutively. Remove one.

**DUP-02 — `Home.tsx` lines 251–258: duplicate definition paragraph**
As noted in Section 4, the "What is an AI dental companion?" section repeats the same definition sentence twice. Remove the first instance (lines 251–252) and keep the fuller second version.

**DUP-03 — `Features.tsx` lines 140–143: duplicate CTA paragraph**
"Join 30+ founding clinics..." and "Join the founding waitlist and be among the first..." are adjacent, functionally identical sentences. Remove one.

**DUP-04 — Dr. Anca quote used identically on three pages**
The quote "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes" appears identically on `Home.tsx` (line 108), `ForDentists.tsx` (line 160), and `About.tsx` (line 221). While a signature quote can be repeated, having the same blockquote on three separate pages creates a thin-content signal when pages are crawled in isolation. Consider a second quote for ForDentists that is more clinician-specific, e.g., related to the problem of instruction retention.

---

## SECTION 9: TONE CONSISTENCY

**Verdict: Generally consistent. One notable drift.**

The brand voice — clinical precision with human warmth — is well-maintained across most content. The blog articles are particularly strong: Dr. Anca's voice is authentic, first-person, and clinically grounded without being cold.

**Issue:** The `Contact.tsx` hero subhead "Whether you're a patient, a dentist, an investor, or just curious - we'd love to hear from you" ("just curious") is the only moment of casual informality that sits slightly outside the clinical warmth tone. This is a minor observation, not a serious issue.

**Issue:** The Home page ticker (`Home.tsx` line 151) uses "Trusted by Periodontists" which is a marketing claim tone that contrasts with the evidence-first tone maintained elsewhere. As noted, it is also unsubstantiated. Remove or change to "30+ Founding Clinics."

**Issue:** `About.tsx` team description for Petrica Nancu (`line 270`): "transforming raw periodontal data into actionable nudges that keep patients engaged" — "raw periodontal data" is the most clinical-data-heavy phrase on the site and edges toward suggesting the app processes clinical data in a medically significant way. Softer alternative: "translating clinical recommendations into the personalised habit nudges patients actually follow."

---

## SECTION 10: PRICING PAGE ASSESSMENT

**Is the blur overlay working?**
No blur overlay exists in the current implementation. The CLAUDE.md notes "Pricing section stays blurred with beta overlay." The Pricing page instead shows "Coming soon" text as the Clinic plan price, which is cleaner and more honest than a blur. The beta notice banner is prominent. This approach is acceptable and arguably better than a blur for the March 2026 launch context.

**Does the page serve SEO?**
Yes. The pricing page has a canonical URL, FAQPage structured data, SoftwareApplication schema with PreOrder offers, and a meaningful meta description. It will rank for "Perioskoup pricing" and related queries. The page should be indexed (no `noindex` tag present, unlike the Waitlist page which is correctly noindexed).

**Pricing accuracy vs. business model:**
- Patient: "Free" — correct per business model
- Clinic: "Coming soon" — correct, the actual €39–199/month range is in `llms.txt` but not on the pricing page, which is appropriate for pre-launch
- The pricing FAQ FAQ answer (`Pricing.tsx` line 47) answers "What is included in the Patient plan?" by listing "personalised care plans, daily habit reminders, progress tracking, and access to the educational content library" — progress tracking and the educational library are In Progress or Coming Soon, making this answer technically inaccurate for the current beta state.

---

## SECTION 11: FOUNDER TITLE INCONSISTENCY

Dr. Anca Constantin's title varies across the site:
- `Home.tsx` line 111: "Periodontist & CEO"
- `ForDentists.tsx` line 166: "Periodontist & Co-founder, CEO"
- `About.tsx` line 268: "Periodontist & Co-founder, CEO"
- `BlogPost.tsx` lines 47, 190, etc: "Periodontist & Co-founder, Perioskoup"
- `CLAUDE.md` business context: "CDO" (Chief Dental Officer)
- `llms.txt`: "CEO of Perioskoup"

The CDO designation from CLAUDE.md does not appear anywhere on the website — the site consistently uses CEO, which is fine. The inconsistency between "CEO" vs "Co-founder, CEO" is minor but should be standardised to one form. Recommended: "Periodontist & Co-founder, CEO" everywhere for the full attribution, "Periodontist, Perioskoup" for shorter contexts.

---

## RANKED ISSUE LIST

### Blocker (Fix Before Launch)
1. **FA-01** — `Home.tsx:223`: "learns what works and adapts over time" — overstatement of In Progress AI feature
2. **STAT-01** — `ForDentists.tsx:136`, `About.tsx:196`: Kessels 2003 citation has wrong journal (BMJ vs JRSM) and wrong DOI. Must fix.
3. **Contact/Waitlist forms** — No backend integration. Data is not being captured. Business-critical failure.

### High Priority (Fix Within 1 Week)
4. **FA-02** — `ForDentists.tsx:25–26`: Illustrated guides and medication reminders presented as working
5. **FA-04** — `Features.tsx:18`: "Visual progress dashboards" bullet with no In Progress label
6. **STAT-02** — `ForDentists.tsx:138`, `About.tsx:195`: 62% figure inconsistent with MEDICAL_STUDIES.md evidence base
7. **STAT-03** — `ForDentists.tsx:137`, `About.tsx:197`: 87% mHealth stat not in approved evidence base
8. **EFP Award badges** — "Winner" should be "3rd Prize" to be accurate
9. **REG-01** — `ForDentists.tsx:85`: "reducing no-shows" — unsubstantiated outcome claim
10. **DUP-01** — `llms.txt:37–38`: duplicate GDPR bullet

### Medium Priority (Fix Within 2 Weeks)
11. **DUP-02** — `Home.tsx:251–258`: duplicate definition paragraph in "What is an AI dental companion?" section
12. **DUP-03** — `Features.tsx:140–143`: duplicate CTA paragraph
13. **DUP-04** — Dr. Anca quote on 3 pages — diversify ForDentists quote
14. **STAT-06** — `BlogPost.tsx:492–493`: JADA and BDJ citations without DOIs in "Why Patients Forget" article
15. **STAT-07** — `About.tsx:186`: "1 in 2 worldwide" should be "1 in 2 in Europe" or "nearly 1 in 2 globally"
16. **FA-03** — `ForDentists.tsx:19–20`: AI-generated summaries, appointment briefs presented as working
17. **FA-06** — `Pricing.tsx:31`: "Multi-dentist support" unconfirmed feature, needs "(coming soon)"
18. **Pricing FAQ** — `Pricing.tsx:47`: answer overstates available patient features
19. **Pricing Patient plan** — `Pricing.tsx:21`: "Personalized care plan" missing "(coming soon)" qualifier
20. **REG-02** — `Home.tsx:225`: "monitor patient engagement" — soften to "view" or "track"
21. **Ticker** — `Home.tsx:151`: Remove "Trusted by Periodontists", replace with "30+ Founding Clinics"

### Low Priority (Content Improvement)
22. **Internal linking** — Add cross-links between blog articles
23. **Blog updates** — EFP Award article needs "since then" update section (March 2026 context)
24. **Features.tsx:18** — "60–70% reduction" claim needs a specific DOI citation
25. **Home FAQ + ForDentists FAQ** — "EU MDR and FDA SaMD guidance in mind" should be rephrased
26. **About.tsx:268** — Verify "PhD" vs "Specialist" credential designation for Dr. Anca
27. **Contact.tsx:128** — "Based in Europe" should specify "Bucharest, Romania"
28. **About.tsx:270** — "raw periodontal data" — soften to avoid clinical data processing implication
29. **Missing content** — No article on "gum disease treatment", "periodontitis symptoms", "periodontal maintenance"
30. **No periodontist-specific landing page** — segment is underserved for highest-value buyer

---

## SCORE BREAKDOWN

| Category | Score | Notes |
|---|---|---|
| Feature accuracy | 6/10 | AI overstatement on homepage, unconfirmed features on ForDentists |
| Regulatory language | 8.5/10 | Clean overall; "no-shows" and SaMD FAQ phrasing are edge issues |
| Medical evidence | 6.5/10 | Wrong DOI for Kessels, 62% figure not in evidence base, missing DOIs in blog |
| Messaging clarity | 8/10 | Hero passes 3-second test; duplicate paragraphs on two pages |
| CTA quality | 7.5/10 | Consistent primary CTA; ticker has unsubstantiated claim |
| Trust signals | 7/10 | EFP usage is strong; "3rd Prize" omission in badges is a gap |
| Blog content depth | 8/10 | Substantive, clinically grounded; citation gaps in two articles |
| Duplicate content | 7/10 | Four instances found; highest-risk is llms.txt duplicate line |
| Tone consistency | 8.5/10 | Strong; minor drift in contact page and team bio language |
| Pricing accuracy | 7/10 | Coming soon approach is correct; patient feature list overstates beta state |

**Weighted overall: 7.2 / 10**
