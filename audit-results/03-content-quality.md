# Content Quality & Messaging Audit — Perioskoup
**Auditor:** Content Quality & Messaging Agent
**Date:** 2026-03-06
**Scope:** All pages in `client/src/pages/` + blog articles in `BlogPost.tsx`
**Reference documents:** `FEATURE_TRUTH_TABLE.md`, `MEDICAL_STUDIES.md`, `CLAUDE.md`
**Overall Score: 7.1 / 10**

---

## CRITICAL SECTION 1: FEATURE ACCURACY CROSS-REFERENCE

### Summary
The FEATURE_TRUTH_TABLE.md classifies features into Done, In Progress, and Not Started. Every feature claim on the website has been cross-referenced. The findings below are ordered by severity.

---

### CRITICAL FLAG — Feature Presented as Working When It Is NOT STARTED

**File:** `client/src/pages/Features.tsx`, line 36
**Claim:** "Streak rewards" (listed as a bullet under Progress Tracking feature card)
**Truth Table status:** Points/Rewards — NOT STARTED
**Impact:** This bullet is presented on the public-facing Features page as a real, working feature. It is Not Started.
**Required fix:** Remove "Streak rewards" from the bullet list OR replace with "Streaks coming soon" and add a "Coming Soon" badge to that bullet.

---

**File:** `client/src/pages/Pricing.tsx`, line 38
**Claim:** "Progress tracking" listed as a feature in the Patient plan
**Truth Table status:** Track habits page / Mark as done / 90s timer — IN PROGRESS
**Context:** Progress tracking is In Progress for the patient side. Listing it as a current plan feature is borderline acceptable only if re-framed as "coming soon during beta."

---

**File:** `client/src/pages/Pricing.tsx`, line 48
**Claim:** "Analytics & engagement reports" listed as a Clinic plan feature
**Truth Table status:** "View Analytics page" — NOT STARTED (patient), "Change events (treatment plan + anamnesis)" — IN PROGRESS (dentist side analytics)
**Impact:** Engagement analytics for the Dentist Dashboard is described in ForDentists.tsx as a full clinical tool with "individual engagement scores," "practice-wide trend analysis," and "at-risk patient flagging." This is either In Progress (basic) or Not Started (advanced views).
**Required fix:** Mark "Analytics & engagement reports" as "Coming Soon" in the Clinic plan feature list OR reframe as "Patient engagement visibility (in development)."

---

### HIGH FLAG — Feature Implied as Working When It Is IN PROGRESS

**File:** `client/src/pages/Features.tsx`, line 34
**Claim:** "AI Clinical Companion" feature card — described with bullets: "Personalised oral health guidance," "Evidence-based answers," "Understands clinical reports," "Available 24/7"
**Truth Table status:** Periobot AI Chatbot — IN PROGRESS
**Impact:** The feature card presents the Periobot as fully operational, not as a beta or preview feature. The bullets do not qualify its availability.
**Required fix:** Add a label tag "Beta" or "Coming Soon" to this card. Change "Available 24/7" to "Available 24/7 — launching with the app." This is permissible under FEATURE_TRUTH_TABLE rules only as preview/beta.

---

**File:** `client/src/pages/Features.tsx`, line 35
**Claim:** "Smart Reminders" — "Adaptive reminder timing," "Appointment reminders," "Opt-in communication"
**Truth Table status:** Reminders setup — IN PROGRESS (patient onboarding); Notifications — IN PROGRESS
**Required fix:** Add a "Beta" badge or "In development" qualifier. Currently presented as if fully available.

---

**File:** `client/src/pages/Features.tsx`, line 37
**Claim:** "Secure Messaging" — "File and photo sharing," "Read receipts," "Archived conversation history"
**Truth Table status:** No messaging feature appears in DONE or IN PROGRESS for either patient or dentist side.
**Impact:** This is the most serious feature accuracy violation. Secure messaging does not appear anywhere in the truth table as Done or In Progress. It is being presented as a fully-functioning feature with specific sub-capabilities.
**Required fix:** Either remove this feature card entirely, or add a clearly visible "Coming Soon" badge and soften all bullets to future tense ("Will support file and photo sharing").

---

**File:** `client/src/pages/Features.tsx`, line 39
**Claim:** "Education Library" — "Clinician-approved content," "Condition explainers," "Treatment guides"
**Truth Table status:** Not present in Done or In Progress lists for either patient or dentist.
**Required fix:** Add "Coming Soon" badge or remove from active features grid. Move to a "Roadmap" section.

---

**File:** `client/src/pages/Features.tsx`, line 40
**Claim:** "Appointment Prep" — "Pre-visit summaries," "Question prompts," "Reduced chair time"
**Truth Table status:** Appointments (calendar, duration, type, notes) — IN PROGRESS for dentist. Pre-visit summary for patients not mentioned in any Done category.
**Required fix:** Add "In Development" badge. Change "Reduced chair time" claim (which asserts an outcome of a not-yet-built feature).

---

**File:** `client/src/pages/ForDentists.tsx`, lines 46–50
**Claim:** "Engagement Analytics" feature with bullets: "Individual engagement scores," "Practice-wide trend analysis," "At-risk patient flagging," "Monthly engagement reports"
**Truth Table status:** NOT STARTED (patient analytics), IN PROGRESS (basic dentist notifications/events)
**Impact:** "At-risk patient flagging" and "Practice-wide trend analysis" are presented as deliverable features — they are Not Started.
**Required fix:** Either demote this card to "Roadmap" section OR prefix with "Coming in Q2 2026" and remove "At-risk patient flagging" specifically.

---

**File:** `client/src/pages/Home.tsx`, line 65 (FAQ JSON-LD)
**Claim:** "giving clinicians real-time engagement data"
**Truth Table status:** Real-time engagement data for clinicians requires the Analytics page and Change events tracking — both IN PROGRESS or NOT STARTED.
**Required fix:** Change to "engagement visibility" or "patient progress data" — "real-time" implies live dashboard capabilities not yet built.

---

**File:** `client/src/pages/Features.tsx`, line 36
**Claim (bullet):** "Weekly engagement reports" under Progress Tracking card
**Truth Table status:** View Analytics page — NOT STARTED
**Required fix:** Remove or mark as "Coming Soon."

---

### PASS — Features Correctly Represented

The following feature claims are consistent with the truth table and do NOT require changes:

- Treatment plans (dentist side: Done) — correctly referenced in ForDentists
- Patient login/signup — Done, correctly implied
- EFP Award claims — all accurate
- "30+ founding clinics" — accurate per business context
- Habit tracking framed as "coming" or in-development on Home page — acceptable
- AI Chatbot described as part of the coming product, not currently live — mostly acceptable (see flag above re: Features page)
- Appointment management for dentists — Done, correctly referenced

---

## CRITICAL SECTION 2: REGULATORY SCAN

### Forbidden Terms — Full Site Sweep Results

The following terms were searched across all files in `client/src/pages/` and `client/src/components/`:

| Term | Result |
|---|---|
| "compliance" | No matches |
| "diagnose" (as Perioskoup doing it) | FLAGGED — see below |
| "treat" / "treatment" | Contextually acceptable — used in blog articles as descriptions of professional dentistry, not Perioskoup capabilities |
| "cure" | No matches |
| "adherence" | No matches |
| "therapeutic" | 1 match — Terms.tsx line 16 (safe context: "not for therapeutic purposes") |
| "clinical guidance" | No matches |
| "monitor inflammation" | No matches |
| "track bleeding" | No matches |

---

### REGULATORY FLAG 1 — "diagnoses" in How It Works workflow

**File:** `client/src/pages/Home.tsx`, line 334
**Exact text:** `"Your dentist examines, diagnoses, and sets a personalised care plan using Perioskoup."`
**Issue:** The sentence structure implies Perioskoup is involved in the diagnosis step ("examines, diagnoses... using Perioskoup"). A regulator reading this could interpret it as Perioskoup supporting clinical diagnosis.
**Required fix:** Rewrite to: "Your dentist examines and sets a personalised care plan — then uploads it to Perioskoup." This cleanly separates the clinical act from the app's role.

---

### REGULATORY FLAG 2 — FAQ JSON-LD on Home Page and ForDentists Page

**File:** `client/src/pages/Home.tsx`, line 67
**File:** `client/src/pages/ForDentists.tsx`, line 61
**Exact text (both pages):** "Perioskoup is designed as a clinical support tool, not a diagnostic device."
**Issue:** "Clinical support tool" is ambiguous language that could imply involvement in clinical decision-making. The Terms of Service correctly says "wellness and engagement companion." The FAQ schema uses different language than the legal document.
**Required fix:** Align FAQ language with Terms.tsx: "Perioskoup is a wellness and patient engagement companion, not a medical device. It does not provide diagnoses or medical advice."

---

### REGULATORY FLAG 3 — "monitor patient engagement" language

**File:** `client/src/pages/Features.tsx`, line 58 (FAQ JSON-LD)
**Exact text:** "real-time engagement monitoring between appointments"
**Context:** The word "monitoring" combined with "between appointments" in a clinical context can trigger EU MDR scrutiny. Patient monitoring is a regulated activity.
**Required fix:** Change to "patient progress visibility between appointments" or "engagement tracking between appointments."

---

### REGULATORY FLAG 4 — "therapeutic" in Terms.tsx

**File:** `client/src/pages/Terms.tsx`, line 16
**Exact text:** "It does not analyze, interpret, or act upon clinical data for diagnostic or therapeutic purposes."
**Context:** This is a CORRECT defensive usage — explicitly disavowing therapeutic purpose. This is compliant and should be retained as-is. No fix needed.

---

### CLEAN — No Violations Found

The blog articles correctly and repeatedly disclaim diagnostic capability:
- BlogPost.tsx line 233: "AI cannot diagnose."
- BlogPost.tsx line 243: "The AI in Perioskoup does not diagnose."
- BlogPost.tsx line 630: "Perioskoup does not diagnose."

These are strong, clear regulatory disclosures within editorial content. Well done.

---

## CRITICAL SECTION 3: MEDICAL EVIDENCE USAGE

### What the MEDICAL_STUDIES.md provides vs. what the site uses

#### Statistics correctly used WITH citations

| Stat | Used on site | Citation present | Location |
|---|---|---|---|
| 80% instructions forgotten | Yes | Yes — Kessels 2003, BMJ | Home.tsx line 160, ForDentists.tsx line 150 |
| 87% mHealth studies show improvement | Yes | Yes — Toniazzo et al. 2019, JCP | Home.tsx line 159, ForDentists.tsx line 151 |
| 62% adults have periodontitis | Yes | Yes — Bernabe et al. 2020, JCP | ForDentists.tsx line 152, About.tsx line 203 |
| Weinert et al. 2025 (patient barriers) | Yes | Yes — DOI link | ForDentists.tsx line 139 |

**Assessment:** Citation practice is strong for the three main statistics. The inline citation format (source name + DOI link) is clean and defensible.

---

#### Evidence available in MEDICAL_STUDIES.md but NOT used on the site

The following stats from MEDICAL_STUDIES.md are backed by real studies but absent from all pages. Each represents a missed opportunity:

**1. 50% of European adults have periodontal disease**
Source: Worldwide prevalence, J Clin Periodontol 2020 (PMC7275199)
Recommended placement: Home hero section or ForDentists problem section. This is more resonant for a European audience than "62% worldwide." The BlogPost does reference "approximately 50% of adults" but without a citation link.
**Action:** Add to Home page problem section + ForDentists stats row. Add DOI citation to BlogPost.

**2. €90 billion annual cost of oral disease in Europe**
Source: Platform for Better Oral Health in Europe
Recommended placement: ForDentists page — economics of prevention argument. Currently the ForDentists problem section does not quantify the cost at all.
**Action:** Add one stat to the "The problem is clear" section in ForDentists.tsx with citation.

**3. Every €1 invested in prevention saves €8–50 in treatment**
Source: WHO Oral Health fact sheet
Recommended placement: ForDentists CTA section — this is the strongest ROI argument for a clinic purchasing decision.
**Action:** Add to ForDentists final CTA block as a trust amplifier.

**4. Only 30% of patients follow post-treatment oral hygiene instructions**
Source: Patient compliance study, J Clin Periodontol
Recommended placement: ForDentists problem section. Currently the site uses "80% forget instructions" — this is complementary, not redundant.
**Action:** Add to ForDentists problem section as a second data point alongside the 80% stat.

**5. Regular interdental cleaning reduces gingivitis by up to 40%**
Source: Cochrane Library systematic review
Recommended placement: The 3-minute routine blog article, habit tracking feature description.
**Action:** Add citation to the 3-minute routine article in BlogPost.tsx.

**6. Consistent daily routines reduce periodontal disease progression by 60–70%**
Source: Long-term maintenance studies
Recommended placement: Features page, Home page "How It Works" section.
**Action:** Add as a proof point in the Features page Progress Tracking card description.

---

#### Stat accuracy concern — "62% of adults worldwide" vs MEDICAL_STUDIES.md

The MEDICAL_STUDIES.md does not include a "62%" prevalence figure. The site uses 62% on ForDentists.tsx (line 152) and About.tsx (line 203), citing "Bernabe et al. 2020, JCP." The MEDICAL_STUDIES.md cites the J Clin Periodontol 2020 study but gives "50% of European adults" (not 62% worldwide). The 62% figure appears to come from a different reading of the Bernabe 2020 paper (which gives 62.2% of the sample in one stratification) and is cross-referenced correctly. This does not appear to be a fabricated stat, but the discrepancy between MEDICAL_STUDIES.md and the website's figure should be reconciled by citing the exact table/figure in Bernabe et al. 2020 that yields 62%.

---

## SECTION 4: VALUE PROPOSITION CLARITY (3-Second Test)

### Home Page
**3-second verdict:** PASS (strong)
H1: "Between visits, we take over." — Immediately clear positioning. The subhead ("free AI dental companion app - personalised guidance, habit tracking, and a direct line to your clinic") confirms the value in one sentence. EFP badge is above the fold.
**Improvement:** The "For Clinicians" ghost button is visually subordinate to "Join the Waitlist" — this is correct hierarchy for patient-first acquisition, but the clinician value prop is not visible above the fold on the homepage. A dentist landing on this page would need to scroll to understand what's in it for them.

### Features Page
**3-second verdict:** PASS (adequate)
H1: "AI dental companion features — everything between your visits." — Clear but slightly generic. "Everything between your visits" is good positioning.
**Weakness:** The features grid mixes features that are live, in-progress, and not-started without differentiation. A prospect cannot tell what they can use today vs. what's roadmap.

### For Dentists Page
**3-second verdict:** PASS (good)
H1: "Your patients, better prepared." — Specific outcome for dentists. The subhead clarifies the mechanism. EFP badge is present.
**Strength:** The "30+ founding clinics on the waitlist" social proof is immediately visible, which adds FOMO pressure.
**Weakness:** The problem section uses "80% forget" stat but doesn't immediately quantify the cost/revenue impact for the practice. Dentists respond to practice economics, not just patient outcomes.

### Pricing Page
**3-second verdict:** PASS (good)
The page correctly communicates "Free for patients, coming soon for clinics" without confusion. Beta notice banner is visible.
**Risk:** The meta description (line 88) says "Clinic plans launching March 2026 from €39/mo" but the actual pricing is still TBD (per CLAUDE.md: "pricing TBD, currently blurred"). This creates a discrepancy — the meta description exposes a price point that is not shown on the page itself.
**Required fix:** Remove "from €39/mo" from the Pricing page meta description. It contradicts the blur strategy and gives competitors pricing intelligence.

### Blog Page
**3-second verdict:** PASS
Clear topic positioning ("Insights on dental health, AI, and care"). Author authority (Dr. Anca) is visible in article cards.

### About Page
**3-second verdict:** PASS
H1: "Born in a dental chair. Built for every patient." — Strong origin narrative. The EFP award card is immediately below the hero.

### Waitlist Page
**3-second verdict:** PASS (strong)
The role selector (Dentist / Patient) is a smart segmentation device. The page correctly communicates the dual audience with separate value props for each. Social proof block at bottom is minimal but appropriate.

---

## SECTION 5: BOTH AUDIENCES ADDRESSED?

### Patients — Coverage Assessment: 8/10
- Home page: Patient-first messaging. Free app clear. Hero targets patients.
- Features page: Good split of "Patients" vs "Both" vs "Dentists" tags.
- Blog: Patient education articles are strong (periodontal disease guide, 3-minute routine, why they forget).
- Waitlist: Clearly addresses patients.
- Gap: No patient testimonials. The only quotes are from the founder (Dr. Anca). Real patient voices would dramatically increase trust for patient acquisition.

### Dentists — Coverage Assessment: 7/10
- ForDentists page: Dedicated, well-structured page. Problem-first approach is effective.
- Features page: Dentist features are present but minor — the "Dentist Dashboard" feature card is one of four prominent cards, all similar size.
- Pricing page: Founding partner framing is effective for clinics.
- Blog: No articles specifically for clinicians as an audience (e.g., "How AI reduces no-shows," "The ROI of between-visit engagement for your practice"). All articles are patient-facing or general.
- Gap: The economic argument is weak. There is no calculation or estimate of practice revenue impact. Dentists need to justify the cost to themselves.

---

## SECTION 6: CTA QUALITY AND PLACEMENT

### CTA Audit by Page

| Page | Primary CTA | Secondary CTA | Verdict |
|---|---|---|---|
| Home | "Join the Waitlist" | "For Clinicians" | Strong. Hierarchy is correct. |
| Features | "Join the Waitlist" | "For Dentists" | Acceptable. CTA could be more specific ("Get Early Access"). |
| ForDentists | "Apply as a Founding Clinic" | "See All Features" | Strong. Specific and differentiated from patient CTA. |
| Pricing | "Join the Waitlist" / "Apply as a Founding Clinic" | — | Good. Plan-specific CTAs. |
| Blog | "Join the Waitlist" | Subscribe (newsletter) | Adequate. |
| About | "Join the Waitlist" | "Contact Us" | Adequate. |
| Waitlist | "Join the Waitlist" (submit) | — | Strong. Single focus. |
| Contact | "Send Message" | — | Appropriate. |

### CTA Issues Identified

**Issue 1 — CTA label mismatch on Features page:**
"Join the Waitlist" appears twice at the bottom of the Features page. The top hero CTA says "Join the Waitlist →" (with arrow text entity, not arrow component). The bottom CTA says "Join the Waitlist →" (also text entity). The ForDentists CTA says "For Dentists" in the hero. This is consistent but the arrow glyph inconsistency (→ vs SVG arrow) is a minor visual inconsistency.

**Issue 2 — Blog newsletter CTA is non-functional:**
`client/src/pages/Blog.tsx`, lines 329–338: The newsletter subscription input and button have no form submission handler, no `onSubmit`, and no backend integration. A user clicking "Subscribe" does nothing. This is a lead capture mechanism that silently fails.
**Required fix:** Either add a form handler (even the same mock-submit pattern used on the Waitlist and Contact pages), or remove the newsletter section entirely until it's functional.

**Issue 3 — "Apply as a Founding Clinic" vs "Join as a Founding Clinic":**
ForDentists hero uses "Join as a Founding Clinic" (line 117) while the ForDentists CTA section uses "Apply as a Founding Clinic" (line 285). Different verbs for the same action creates subtle cognitive friction. Pick one. "Apply" implies selectivity (good for exclusivity framing). "Join" implies welcome and ease. The ForDentists page should use "Apply" consistently.

---

## SECTION 7: EFP AWARD USAGE EFFECTIVENESS

### Assessment: 9/10 — Excellent

The EFP award is used across the site in a consistent and credible way:

**What's done well:**
- Full EFP Award card on Home page with photo, quote, jury names, and link to EFP announcement. This is the strongest trust signal on the site and it's prominent.
- EFP badge appears in hero of Home, ForDentists, Pricing pages, and Footer — appropriately pervasive without being repetitive.
- The About page has a second, separate EFP card that matches the home page treatment.
- The blog article "Perioskoup Wins EFP Digital Innovation Award 2025" provides full narrative context.
- JSON-LD structured data on About page includes the award in the Person schema.
- MEDICAL_STUDIES.md specified the exact EFP quote ("selected from 20 submissions across 17 national societies") — this is used correctly on multiple pages.

**One improvement:**
The award is described as "3rd Prize" in CLAUDE.md and MEDICAL_STUDIES.md but the site consistently says "EFP Award Winner 2025" and "EFP Innovation Award Winner 2025" without specifying "3rd Prize." This is a permissible framing choice (they did win), but for a clinician audience that is familiar with the award, omitting the prize tier could raise an eyebrow if they know the award from a peer. Consider whether "3rd Prize Winner" or "Award Winner" is the better long-term framing. Recommendation: the current "winner" framing is sufficient for conversion copy — but the EFP announcement blog article should be explicit that it was 3rd Prize, which it currently is (BlogPost.tsx line 418).

---

## SECTION 8: BLOG QUALITY ASSESSMENT

### Overall Blog Score: 7.5/10

#### Article 1: "What Is Periodontal Disease? A Patient's Complete Guide"
- **Depth:** Excellent. Covers gingivitis to advanced periodontitis, causes, staging, systemic connections, diagnosis, treatment, home care.
- **Medical accuracy:** Appears accurate. Cites EFP prevalence figure (50%). Includes Weinert et al. references in the problem section.
- **Citations:** The 50% statistic is stated but not linked to a citation in the article body. The MEDICAL_STUDIES.md provides the PMC7275199 DOI — it should be added.
- **Internal linking:** Mentions Perioskoup in the final section but no internal links to Features or ForDentists pages.
- **Missing:** No visual aids described (stages of gum disease would benefit from a table or visual). No link to the 3-minute routine article or AI article as related content.

#### Article 2: "How AI Is Changing Dental Monitoring - And Why It Matters"
- **Depth:** Strong. Covers AI categories (pattern recognition, predictive modelling, NLP, coaching), limitations, and the Perioskoup approach.
- **Medical accuracy:** Good. FDA-cleared diagnostic AI tools (Overjet, Denti.AI, Pearl) cited correctly.
- **Citations:** No formal citations for the AI/dentistry statistics or behaviour change claims. This is a weakness for a clinician audience.
- **Internal linking:** The Perioskoup approach section mentions the product but does not link to Features or ForDentists.
- **Missing:** Link to the "why patients forget" article. Link to EFP award article.

#### Article 3: "The 3-Minute Daily Routine That Could Save Your Teeth"
- **Depth:** Excellent practical guide. Modified Bass technique, interdental brush sizing, habit stacking framework, and the 2-day rule are all strong, evidence-based content.
- **Medical accuracy:** The EFP citation for modified Bass technique is mentioned but not linked. Cochrane evidence for interdental cleaning is not cited (available in MEDICAL_STUDIES.md).
- **Citations:** No formal citations. For a clinical credibility play, this article needs at least 2 citations (EFP guidelines, Cochrane interdental cleaning review).
- **Internal linking:** Mentions Perioskoup (habit tracking) but no link to the app features or waitlist within body text.
- **Missing:** A visual "3-minute routine at a glance" (even a simple text block formatted as a checklist) would improve shareability significantly.

#### Article 4: "Perioskoup Wins EFP Digital Innovation Award 2025"
- **Depth:** Adequate for a press/news piece. The "Road to Vienna" section and "What's Next" section provide good context.
- **One factual note:** BlogPost.tsx line 444 says Perioskoup was "Founded in 2024" — but CLAUDE.md states "incorporated June 2025." This is a discrepancy. The founding narrative here needs to reconcile idea/founding vs. incorporation dates clearly.
- **Internal linking:** "What's Next" section mentions the waitlist — should be a clickable link.

#### Article 5: "Why Patients Forget Dental Instructions (And What to Do About It)"
- **Depth:** The strongest article on the site from an evidence standpoint. Ebbinghaus forgetting curve, anxiety/memory research, information overload, lack of feedback loop.
- **Citations:** References JADA and BDJ studies but does not link to them. The MEDICAL_STUDIES.md Kessels 2003 citation (the 40–80% stat) should be linked.
- **Internal linking:** None. Should link to the AI article and the 3-minute routine.
- **Missing:** No "related articles" section on any blog post. Internal linking is the biggest SEO and engagement gap across all blog content.

#### Article 6: "Building the Bridge: The Perioskoup Story"
- **Depth:** Good founder narrative. Dr. Anca's patient scenario is emotionally compelling and clinically specific (pocket depths, bone levels, interdental brushes).
- **One issue:** BlogPost.tsx line 630 contains strong regulatory language ("The clinician stays in control. Perioskoup does not diagnose.") which is correct and should remain.
- **Internal linking:** The team section links to LinkedIn but not to the About page.
- **Missing:** No CTA within the article body to join the waitlist or learn about features.

---

### Missing Articles for Topical Authority

The following articles are absent from the blog and represent significant gaps for search and conversion:

**For patient SEO:**
1. "What Is a Periodontist and When Should You See One?" — high-search-volume question
2. "Gum Disease vs. Tooth Decay: What's the Difference?" — educational disambiguation
3. "The Systemic Connection: How Gum Disease Affects Your Heart, Diabetes, and Brain" — high engagement topic
4. "What Happens at a Periodontal Maintenance Appointment?" — anxiety-reduction content
5. "Best Electric Toothbrushes for Gum Disease: A Periodontist's View" — commercial intent + affiliate opportunity

**For dentist SEO and conversion:**
1. "How to Improve Patient Between-Visit Compliance at Your Dental Practice" — direct commercial intent for target buyer
2. "The Hidden Cost of Patient Drop-off Between Appointments" — practice economics
3. "How Perioskoup Fits Into a Periodontist's Workflow" — product integration explainer

**For category creation:**
1. "What Is an AI Dental Companion? (And How It's Different From a Dental App)" — currently exists only as a short section on Home page, needs a full article
2. "The Science of Dental Habit Formation" — positions Perioskoup as the intellectual leader in behaviour-change dental tech

---

## SECTION 9: "BETWEEN VISITS" POSITIONING STRENGTH

**Assessment: 8.5/10**

The "between visits" positioning is the single strongest differentiated claim on the site and it is used consistently and correctly:

- Home hero H1: "Between visits, we take over." — the definitive statement
- Home ticker: "Bridging the Gap Between Visits"
- ForDentists section 6: "Between Visits" step in the workflow diagram
- Home FAQ JSON-LD: "bridges the gap between dental appointments"
- Blog article 6 title: "Building the Bridge"
- About mission: "Close the gap between visits"

The repetition is intentional and effective. The positioning is credible because it's grounded in clinical reality (80% forget stat, Weinert 2025 citation).

**One weakness:** The "between visits" messaging is strong for the conversion layer but the site has no content that explains WHY the gap between visits is so long or costly (no €90B stat, no "only 30% follow instructions" stat on any primary page). The problem is stated but the magnitude of the problem is understated. The MEDICAL_STUDIES.md provides the data; it just isn't deployed on the site.

---

## SECTION 10: PRICING PAGE ASSESSMENT

**Blur overlay:** The Clinic plan shows "Coming soon" as the price (line 44) with no actual numeric pricing visible. The blur overlay described in CLAUDE.md refers to the mobile app pricing strategy — the web pricing page correctly shows a pre-revenue state. The "Coming soon" approach is appropriate.

**SEO value of the pricing page:** The Pricing page has strong SEO meta tags and a clean URL (`/pricing`). It ranks for branded + pricing queries and serves as a conversion page for high-intent visitors. It should remain. The FAQ schema (pricingFaqJsonLd) is well-constructed.

**Meta description inconsistency (critical):**
`client/src/pages/Pricing.tsx`, line 88:
`"Clinic plans launching March 2026 from €39/mo."`
The page itself shows "Coming soon" for clinic pricing. The meta description reveals a price point that is: (a) not confirmed/TBD per CLAUDE.md, (b) not shown on the page, and (c) visible to competitors scraping meta descriptions. This is a direct contradiction of the blur strategy.
**Required fix:** Change meta description to: "Clinic plans launching March 2026. Join the founding waitlist for priority access and locked-in pricing."

---

## SECTION 11: ADDITIONAL ISSUES IDENTIFIED

### Duplicate paragraph in Home.tsx Features section

**File:** `client/src/pages/Home.tsx`, lines 256–263
There are two description paragraphs for the Features section header. The first (line 257) and the second (line 260) both describe what Perioskoup does in the same location, creating redundant text that dilutes both messages:

Line 257: "Perioskoup combines AI-powered guidance, daily habit tracking, a clinician dashboard, and secure patient-clinic messaging into a single dental companion app."
Line 260: "Perioskoup connects patients and clinicians with AI-powered tools that make daily dental care simple, consistent, and effective."

**Required fix:** Keep only one. Line 257 is more specific; line 260 is more emotional. Choose based on A/B test or remove line 260.

### "monitors and supports their patients remotely" in ForDentists FAQ JSON-LD

**File:** `client/src/pages/Home.tsx`, line 66 (FAQ JSON-LD)
"...dental professionals (periodontists, hygienists, clinic owners) who want to monitor and support their patients remotely."
**Issue:** "monitor...remotely" can be interpreted as remote patient monitoring, which is a regulated category in EU MDR. The phrasing should be "track and support patient engagement" to avoid this regulatory association.
**Required fix:** Change "monitor and support their patients remotely" to "stay connected with their patients between appointments."

### Contact forms have no real backend integration

**File:** `client/src/pages/Waitlist.tsx`, `client/src/pages/Contact.tsx`
Both forms have client-side validation and a mock success state but no actual form submission to a backend, email service, or CRM. A user filling out the waitlist form does not actually register anywhere.
**Note:** This is a functional issue, not purely a content issue, but it has direct conversion impact. If this is intentional (demo state), it should be clearly marked. If it's meant to collect real signups, it needs backend integration before March 2026 launch.

---

## SECTION 12: PRIORITISED FIX LIST

**P0 — Fix before launch (regulatory or accuracy risk):**

1. `Features.tsx` line 37 — Remove "Secure Messaging" card OR add "Coming Soon" badge. Feature does not appear in truth table as Done or In Progress.
2. `Features.tsx` line 36 — Remove "Streak rewards" bullet OR mark as "Coming Soon." Feature is Not Started.
3. `Pricing.tsx` line 88 — Remove "from €39/mo" from meta description. Exposes unconfirmed price.
4. `Home.tsx` line 334 — Rewrite "Your dentist examines, diagnoses, and sets a personalised care plan using Perioskoup." to remove Perioskoup from the diagnoses step.
5. `Home.tsx` line 66 — Change "monitor and support their patients remotely" to "stay connected with their patients between appointments."

**P1 — Fix before launch (conversion impact):**

6. `Features.tsx` line 34 — Add "Beta" or "Coming Soon" label to AI Clinical Companion card.
7. `ForDentists.tsx` lines 46–50 — Demote "Engagement Analytics" features to roadmap framing. Remove "At-risk patient flagging" until built.
8. `Blog.tsx` lines 329–338 — Fix non-functional newsletter subscription form (add handler or remove).
9. `Home.tsx` lines 256–263 — Remove duplicate Features section description paragraph.
10. `ForDentists.tsx` — Add €90B European oral health cost stat with citation. Add "€1 in prevention = €8–50 saved" stat in CTA section.

**P2 — Improvements for authority and trust:**

11. Add internal links across all blog articles (each article should link to at least 2 others).
12. Add CTA within each blog article body — not just at the end.
13. Add DOI citation to "50% of adults" stat in `what-is-periodontal-disease` BlogPost.
14. Reconcile founding year discrepancy in EFP award article (2024 vs 2025 incorporation).
15. Create 2–3 dentist-specific blog articles for commercial intent SEO.
16. Add "only 30% of patients follow instructions" stat to ForDentists problem section.
17. Reconcile "clinical support tool" language in FAQ JSON-LD with "wellness companion" language in Terms.tsx.

**P3 — Long-term content strategy:**

18. Write "What Is an AI Dental Companion?" as a standalone long-form article.
19. Create patient testimonial section (even 1–2 quotes from beta testers would significantly increase trust).
20. Add "60–70% disease progression reduction" stat to Features Progress Tracking card with Cochrane citation.

---

## SCORING BREAKDOWN

| Dimension | Score | Notes |
|---|---|---|
| Feature accuracy | 5/10 | Secure Messaging presented as live — Not in truth table. Streak Rewards = Not Started. AI Chatbot presented without beta caveat. Engagement Analytics overstated. |
| Medical evidence usage | 7/10 | Key stats cited with DOIs. Several major stats from MEDICAL_STUDIES.md unused. 62% stat needs reconciliation. |
| Regulatory compliance | 7/10 | No overt violations. Two ambiguous phrases flagged (diagnoses in How It Works, monitor remotely in FAQ). "Clinical support tool" vs "wellness companion" inconsistency. |
| Value proposition clarity | 8/10 | Hero messaging is excellent. Both audiences addressed. "Between visits" positioning is strong and consistent. |
| CTA quality | 6/10 | Newsletter CTA non-functional. CTA label inconsistency (Apply vs Join). Otherwise well-structured. |
| EFP award effectiveness | 9/10 | Excellent deployment across the site. Credible, specific, linked. |
| Blog quality | 7/10 | Articles are substantive and well-written. No internal linking. Missing citations. No related articles. 6 articles is insufficient for topical authority. |
| Between-visits positioning | 8/10 | Consistent and strong. Magnitude of problem understated due to unused stats. |
| Pricing page | 7/10 | "Coming soon" framing correct. Meta description exposes price point that shouldn't be public. |

**Overall: 7.1 / 10**

---

## KEY STRENGTHS TO PRESERVE

- The "Between visits, we take over." H1 is exceptional and should not be changed.
- EFP Award deployment is best-in-class for a pre-revenue startup.
- The ForDentists page problem-first structure (problem → stats → quote → tools → workflow) is the most persuasive page on the site.
- The blog articles by Dr. Anca have genuine clinical authority and are well-written.
- The regulatory disclaimers in blog articles are strong and repeated correctly.
- The dual-audience segmentation (patients free / clinics paid) is communicated clearly on every page.

