# Content Quality & Messaging Re-Audit — Perioskoup
**Auditor:** Content Quality & Messaging Agent (Re-Audit Pass)
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Scope:** All pages cross-checked against FEATURE_TRUTH_TABLE.md, MEDICAL_STUDIES.md, CLAUDE.md
**Previous score:** 7.1 / 10
**Re-audit score:** 8.1 / 10

---

## SUMMARY OF CHANGE

The content fixer applied 23 documented changes across 5 files. The majority of P0 and P1 issues from the original audit were resolved correctly. However, this re-audit identifies 6 new or residual issues that were not fully addressed. Three of these are content accuracy violations that must be fixed before launch.

---

## SECTION 1: FEATURE ACCURACY — VERIFICATION STATUS

### P0 Fixes: VERIFIED CORRECT

**Fix 1 — Secure Messaging card removed from Features.tsx**
Status: CONFIRMED. The FEATURES array in Features.tsx now has 7 items. "Secure Messaging" is absent. Verified by reading the full FEATURES array (lines 15–23). No card with that title exists.

**Fix 2 — "Streak rewards" bullet removed from Progress Tracking card**
Status: CONFIRMED. The Progress Tracking bullets are now: "Daily habit logging", "Visual progress dashboards", "Habit streaks", "Routine consistency tools". Neither "Streak rewards" nor "Weekly engagement reports" appears. The card description now correctly includes the 60-70% stat.

**Fix 3 — AI Clinical Companion card marked Beta**
Status: CONFIRMED. Badge "Beta" is present (Features.tsx line 16). "Available 24/7" was changed to "Launching with the app". Both changes correctly implemented.

**Fix 4 — Education Library and Appointment Prep badged**
Status: CONFIRMED. Education Library carries "Coming Soon" badge, Appointment Prep carries "In Development" badge (Features.tsx lines 20–21).

**Fix 6 — "diagnoses" removed from How It Works Step 01**
Status: CONFIRMED. Home.tsx Step 01 description now reads: "Your dentist examines and creates a personalised care plan — then uploads it to Perioskoup." The clinical act is cleanly separated from the app's role.

**Fix 9 — Duplicate Features section paragraph removed from Home.tsx**
Status: CONFIRMED. The second paragraph ("Perioskoup connects patients and clinicians with AI-powered tools...") no longer appears. Only the first, more specific paragraph survives.

---

### P1 Fixes: VERIFIED CORRECT

**Fix 7 — Pricing.tsx Patient plan features updated**
Status: CONFIRMED. Patient plan features now correctly read:
- "Progress tracking (coming soon)" — IN PROGRESS status acknowledged
- "Educational content library (coming soon)" — No-status acknowledged
- "Secure messaging with your dentist" — REMOVED from the visible feature list

**Fix 8 — Pricing.tsx Clinic plan "Analytics & engagement reports" and "Patient monitoring & alerts" fixed**
Status: CONFIRMED. Clinic plan now shows "Analytics & engagement reports (coming soon)" and "Patient engagement visibility" (regulatory language corrected).

**Fix 9 — ForDentists.tsx Engagement Analytics demoted**
Status: CONFIRMED. Card renamed to "Engagement Insights" with description "coming in Q2 2026". "At-risk patient flagging" removed. Bullets replaced with appropriate roadmap language.

**Fix 10 — ForDentists.tsx 30% stat and EUR 90B added**
Status: CONFIRMED. Problem section now includes: "Only 30% of patients follow post-treatment oral hygiene instructions after leaving the chair (J Clin Periodontol)" and "Oral diseases cost €90 billion annually in Europe (Platform for Better Oral Health in Europe)". Both carry correct citation links.

**Fix 11 — ForDentists.tsx EUR 1/EUR 8-50 ROI stat in CTA section**
Status: CONFIRMED. CTA section now includes: "Every €1 invested in prevention saves €8–50 in future treatment costs." with WHO Oral Health citation link.

**Fix 12 — Features.tsx 60-70% progression reduction stat**
Status: CONFIRMED. Progress Tracking card description now includes: "Research shows consistent daily routines reduce periodontal disease progression by 60-70%."

---

### REGULATORY FIXES: ALL VERIFIED CORRECT

All five regulatory fixes documented in the fix log were confirmed:

| Fix | Term/Phrase | File | Status |
|---|---|---|---|
| Fix 13 | "real-time engagement data" | Home.tsx FAQ JSON-LD | FIXED — now "patient engagement visibility between visits" |
| Fix 14 | "monitor and support...remotely" | Home.tsx FAQ JSON-LD | FIXED — now "stay connected with their patients between appointments" |
| Fix 15 | "clinical support tool" (ambiguous) | Home.tsx FAQ JSON-LD | FIXED — now "wellness and patient engagement companion, not a medical device" |
| Fix 16 | "clinical support tool" | ForDentists.tsx FAQ JSON-LD | FIXED — aligned with Terms.tsx language |
| Fix 17 | "monitor engagement between appointments" | ForDentists.tsx FAQ JSON-LD | FIXED |
| Fix 18 | "You monitor engagement and intervene early" | ForDentists.tsx Workflow card | FIXED — now "You stay connected and can reach out if someone needs an extra nudge" |
| Fix 19 | "from EUR 39/mo" in meta descriptions | Pricing.tsx | FIXED — now "priority access and locked-in pricing" |

---

## SECTION 2: NEW AND RESIDUAL ISSUES

### CRITICAL — Feature Claim in Stale JSON-LD (NEW ISSUE, unfixed)

**File:** `client/src/pages/Pricing.tsx`, line 47
**Exact text:** `"The Patient plan includes plain-language oral health education, personalised care plans, daily habit reminders, progress tracking, secure messaging with your dentist, and access to the educational content library."`
**Issue:** The visible Pricing.tsx feature list correctly had "Secure messaging" removed. However, the Pricing FAQ JSON-LD (pricingFaqJsonLd, "What is included in the Patient plan?") still lists "secure messaging with your dentist" as a plan feature. This structured data is indexed by search engines. It contradicts the visible page content and asserts a Not-Started feature as a current deliverable.
**Severity:** P0 — the JSON-LD is publicly indexed. A user clicking through from a search result with this snippet will see a feature that does not exist.
**Required fix:** Remove "secure messaging with your dentist" from the Patient plan FAQ JSON-LD answer text. Replace with "progress tracking and educational content (launching with the app)."

---

### CRITICAL — "Secure Messaging" Persists in Features.tsx Meta Descriptions (NEW ISSUE, unfixed)

**File:** `client/src/pages/Features.tsx`, line 51 and line 55
**Exact text (og:description):** `"AI-powered habit tracking, smart reminders, clinician dashboard, and secure messaging for dental patients and practices."`
**Exact text (twitter:description):** `"Personalised habit tracking, smart reminders, clinician dashboard, and GDPR-compliant secure messaging. All in one AI dental companion."`
**Issue:** The Secure Messaging card was correctly removed from the features grid but both social/OG meta descriptions still reference it. These strings are rendered in link previews on LinkedIn, Twitter, and WhatsApp. A dental practice owner sharing the Features page link will see "secure messaging" in the preview — which does not exist as a working feature.
**Severity:** P0 — contradicts the grid content on the same page and asserts a Not-Started feature as current.
**Required fix:** Remove "secure messaging" from both meta descriptions. Replace with a truthful description of the 7 actual cards shown on the page. Suggested replacement:
- og:description: "AI habit tracking, smart reminders, clinician dashboard, progress tracking, and GDPR-compliant data protection — all in one AI dental companion app."
- twitter:description: "Personalised habit tracking, smart reminders, a clinician dashboard, and GDPR-first design. The AI dental companion for what happens between visits."

---

### CRITICAL — "Secure Patient-Clinic Messaging" in Home.tsx Features Section (NEW ISSUE, unfixed)

**File:** `client/src/pages/Home.tsx`, line 235
**Exact text:** `"Perioskoup combines AI-powered guidance, daily habit tracking, a clinician dashboard, and secure patient-clinic messaging into a single dental companion app."`
**Issue:** This paragraph-level description in the Home page Features bento section describes the product as including "secure patient-clinic messaging". Secure Messaging is NOT STARTED per the truth table. This is the homepage — the highest-traffic page on the site. Every patient and clinician visiting the site reads this sentence.
**Severity:** P0 — Homepage feature claim for a Not-Started feature.
**Required fix:** Remove "secure patient-clinic messaging" from the sentence. Suggested replacement: "Perioskoup combines AI-powered guidance, daily habit tracking, and a clinician dashboard into a single dental companion app."

---

### HIGH — "Patient Engagement Heatmaps" in ForDentists.tsx Practice Dashboard Card (RESIDUAL, unfixed)

**File:** `client/src/pages/ForDentists.tsx`, line 20
**Exact text:** `"Patient engagement heatmaps"` (bullet under Practice Dashboard card)
**Issue:** The original audit's fix correctly demoted "Engagement Analytics" to a roadmap item in the Engagement Insights card. However, the Practice Dashboard card — a separate card — still contains "Patient engagement heatmaps" as a live bullet. A heatmap visualization requires a functional analytics layer. Per the truth table: "View Analytics page" is NOT STARTED for patients; "Change events" is only IN PROGRESS for dentists. No heatmap visualization is in Done or In Progress anywhere in the truth table.
**Severity:** P1 — materially false claim about a dentist-facing feature. Presenting an analytics visualization as current capability when neither analytics collection nor visualization is done.
**Required fix:** Replace "Patient engagement heatmaps" with "Patient programme overview" or "Patient engagement summary (coming Q2 2026)."

---

### HIGH — Meta Descriptions on ForDentists.tsx Still Reference "Engagement Analytics" (NEW ISSUE)

**File:** `client/src/pages/ForDentists.tsx`, lines 56, 59, 63
**Exact text:**
- meta description: "Perioskoup gives dental practices a clinician dashboard, personalised care plans, and engagement analytics to extend care and reduce no-shows."
- og:description: "Clinician dashboard, personalised care plans, and patient engagement analytics for dental practices."
- twitter:description: "Give your dental practice a clinician dashboard, personalised care plans, and engagement analytics."

**Issue:** The internal card copy was correctly updated to say "coming Q2 2026" — but the meta descriptions still claim "engagement analytics" as a current product offering. These descriptions are indexed and appear in Google/Bing SERPs. A dentist clicking from a search result expecting engagement analytics will not find them on the page, creating an expectation mismatch.
**Severity:** P1 — SERP promise does not match page reality for a feature that is Not Started.
**Required fix:** Update all three to remove the analytics claim. Suggested replacement for meta description: "Perioskoup gives dental practices a clinician dashboard, personalised care plans, and tools to extend patient care between appointments."

---

### MEDIUM — Smart Reminders Card Has No Beta Badge (RESIDUAL, unfixed)

**File:** `client/src/pages/Features.tsx`, line 17
**Claim:** "Smart Reminders" card presented without any beta or development qualifier.
**Truth Table status:** Reminders setup — IN PROGRESS (patient onboarding); Notifications — IN PROGRESS (both patient and dentist)
**Issue:** The original audit P1 fix noted: "Add a 'Beta' badge or 'In development' qualifier" to Smart Reminders. The fix log documented badging for AI Clinical Companion, Education Library, and Appointment Prep but Smart Reminders was not addressed. All four bullets ("Adaptive reminder timing", "Habit-based nudge frequency", "Appointment reminders", "Opt-in communication") imply a fully working system.
**Severity:** Medium — IN PROGRESS features should be qualified, not presented as complete.
**Required fix:** Add `badge: "Beta"` to the Smart Reminders card object in the FEATURES array.

---

### MEDIUM — "Founded in 2024" in EFP Award Blog Post (RESIDUAL, unfixed from original audit)

**File:** `client/src/pages/BlogPost.tsx`, lines 444 and 464
**Exact text (line 444):** `"Perioskoup was founded in 2024 by three people..."`
**Exact text (line 464 — answer capsule):** `"Perioskoup was founded in 2024 by..."`
**Issue:** CLAUDE.md states "Romanian SRL, incorporated June 2025." The About.tsx FAQ JSON-LD also correctly says "founded in 2025." The EFP award article says 2024. This is a factual inconsistency. The fix log documented this as a known issue but made no change.
**Context:** There is a legitimate distinction between "when the idea was conceived" (2024) and "when the company was incorporated" (June 2025). If 2024 refers to when development began, this should be clarified, not left as an uncaveated founding date.
**Required fix:** Either (a) change "founded in 2024" to "conceived in 2024 and incorporated in June 2025 as a Romanian SRL" — which is accurate and adds credibility, or (b) if 2024 simply refers to the idea stage, clarify with "Perioskoup's idea was born in 2024 in Dr. Anca's Bucharest clinic."

---

### MEDIUM — CTA Verb Inconsistency on ForDentists.tsx (RESIDUAL, unfixed from original audit)

**File:** `client/src/pages/ForDentists.tsx`
**Hero CTA (line 101):** `"Join as a Founding Clinic"`
**Section 8 CTA (line 274):** `"Apply as a Founding Clinic"`
**Issue:** Two different verbs for the same action on the same page. "Join" is used in the hero; "Apply" is used in the final CTA. The original audit recommended standardising on "Apply" (implies selectivity). This inconsistency creates subtle cognitive friction. The fix log did not address this.
**Required fix:** Change the hero button text from "Join as a Founding Clinic" to "Apply as a Founding Clinic" to match the section 8 CTA.

---

### MEDIUM — Newsletter Form Has No Backend (RESIDUAL, acknowledged not fixed)

**File:** `client/src/pages/Blog.tsx`, lines 96–106
**Status:** The original audit flagged this as P1. The fix log added a `handleNewsletterSubmit` function that shows a success state without actually sending data anywhere.
**Current behavior:** Validation passes, the button shows "Subscribed!" but the email is discarded. No confirmation email is sent. No CRM record is created.
**Assessment:** This is now in a worse state than "silently fails" — it actively confirms subscription success to a user who has not actually been subscribed. This is a trust-destroying experience if real users interact with it before a backend is wired up.
**Required fix:** Either (a) integrate with a real email collection service (Mailchimp, Resend, Supabase) before launch, or (b) change the button to link directly to the waitlist page instead of simulating a subscription. The simulated success state should not go live.

---

## SECTION 3: MEDICAL EVIDENCE — VERIFICATION

### Stats Added Correctly

**ForDentists.tsx — 30% instruction follow-through stat**
Status: CONFIRMED CORRECT. The problem section now contains: "Only 30% of patients follow post-treatment oral hygiene instructions after leaving the chair" with the J Clin Periodontol DOI link. Citation is inline and clickable.

**ForDentists.tsx — €90B European oral health cost**
Status: CONFIRMED CORRECT. Same paragraph. "Oral diseases cost €90 billion annually in Europe" with Platform for Better Oral Health in Europe citation link.

**ForDentists.tsx — €1/€8-50 prevention ROI**
Status: CONFIRMED CORRECT. CTA section now includes the WHO stat with citation link.

**Features.tsx — 60-70% progression reduction**
Status: CONFIRMED CORRECT. Incorporated into Progress Tracking card description. Note: the MEDICAL_STUDIES.md source for this stat is "Long-term maintenance studies in periodontal patients" without a specific DOI. The site does not cite a specific paper for this figure — just states it as fact. This is acceptable for card copy but the MEDICAL_STUDIES.md itself does not provide a Cochrane or primary study DOI. For a clinical audience, this is a gap that reduces credibility slightly.

### Stats Still Missing (unchanged from original audit)

The following evidence-backed stats from MEDICAL_STUDIES.md remain unused on primary pages:

1. "50% of European adults have periodontal disease" — used in blog articles but still absent from the Home hero stats row. The hero stats row uses 87%, 80%, and "EFP Award Winner" — none of which speak to prevalence. For a European patient audience, "1 in 2 adults" is the most resonant hook.
2. The Cochrane Library citation for the "40% reduction in gingivitis with interdental cleaning" stat — still absent from the 3-minute routine blog article.
3. The "62% vs 50%" reconciliation note — the About.tsx and ForDentists.tsx use "62%" citing Bernabe et al. 2020 while MEDICAL_STUDIES.md uses "50% of European adults" from the same underlying paper. The 62% figure is defensible (it is in the Bernabe data) but the discrepancy between "50% European" and "62% worldwide" should be resolved with explicit geographic scope labeling. The ForDentists.tsx stats row (line 138) says "62% of adults have periodontitis worldwide" which is the clearest and most accurate framing — this is acceptable.

---

## SECTION 4: REGULATORY SWEEP — POST-FIX CONFIRMATION

A full pattern sweep was run against all files in `client/src/pages/` for the following terms:

| Term | Result | Notes |
|---|---|---|
| "compliance" | 0 violations | GDPR compliance mentioned in non-regulatory context — acceptable |
| "diagnose" (Perioskoup doing it) | 0 violations | All uses are disclaimers ("does not diagnose") |
| "at-risk patient flagging" | 0 matches | Correctly removed |
| "monitor and support remotely" | 0 matches | Correctly fixed |
| "real-time engagement data" | 0 matches | Correctly fixed |
| "clinical support tool" (ambiguous) | 0 matches | Correctly fixed |
| "adherence" | 0 matches | Clean |
| "therapeutic" | 1 match (Terms.tsx — correct defensive use) | No change needed |
| "track bleeding" | 0 matches | Clean |
| "monitor inflammation" | 0 matches | Clean |
| "engagement analytics" | Persists in ForDentists.tsx meta descriptions | NEW FLAG — see Section 2 |
| "patient monitoring" | 0 matches | Correctly removed from Pricing.tsx |

**Regulatory assessment: MOSTLY CLEAN with one new flag.** The meta descriptions on ForDentists.tsx claiming "engagement analytics" as a current feature are a minor regulatory concern (implying monitoring capability not yet built) but more immediately an accuracy concern.

---

## SECTION 5: VALUE PROPOSITION — UNCHANGED STRENGTHS CONFIRMED

The following were verified unchanged and remain correct:

- Home H1: "Between visits, we take over." — unchanged and still excellent
- ForDentists H1: "Your patients, better prepared." — unchanged, strong
- EFP Award deployment across Home, ForDentists, Pricing, About, Blog, Footer — consistent and credible
- "Between visits" positioning language appears in: Home H1, Home ticker ("Bridging the Gap Between Visits"), ForDentists workflow step, Home FAQ JSON-LD ("bridges the gap between dental appointments"), Blog Article 6 title, About mission section
- "30+ founding clinics" social proof — appears correctly on ForDentists hero, Blog CTA, Pricing badge, Home social proof micro-bar

---

## SECTION 6: CTA AUDIT — POST-FIX STATUS

| Page | Primary CTA | Secondary CTA | Status |
|---|---|---|---|
| Home | "Join the Waitlist" (SVG arrow) | "For Clinicians" | Unchanged — strong |
| Features | "Join the Waitlist →" | "For Dentists" | Unchanged — acceptable |
| ForDentists | "Apply as a Founding Clinic" / "Join as a Founding Clinic" | "See All Features" | INCONSISTENT — see Section 2 |
| Pricing | "Join the Waitlist" / "Apply as a Founding Clinic" | — | Correct |
| Blog | "Join the Waitlist" + newsletter | — | Newsletter still has no backend |
| About | "Join the Waitlist" | "Contact Us" | Unchanged — adequate |
| Waitlist | Submit | — | Unchanged — strong |

---

## SECTION 7: EFP AWARD — UNCHANGED, STILL EXCELLENT

No issues found. The award card on Home, About page, hero badges on ForDentists and Pricing, and the blog article all remain consistent and accurate. The About.tsx FAQ JSON-LD correctly specifies "3rd Prize" (line 54). Other award references use "Winner" framing which remains an acceptable conversion copywriting choice.

---

## SECTION 8: BLOG QUALITY — POST-FIX STATUS

No structural changes were made to blog articles in this fix pass. Original audit findings still apply:

**What remains unfixed from original audit:**
- No internal links between blog articles (original P2 item 11)
- No CTA within blog article body text — only the "closing statement" section mentions the product (original P2 item 12)
- "50% of adults" stat in periodontal disease article body still lacks a DOI citation link (original P2 item 13)
- "Founded in 2024" discrepancy in EFP award article body (see Section 2 above)
- No "related articles" section on any blog post

**What does not need fixing:**
- Regulatory disclaimers in blog articles remain strong ("AI cannot diagnose" — BlogPost.tsx line 233; "The AI in Perioskoup does not diagnose" — BlogPost.tsx line 243; "Perioskoup does not diagnose" — BlogPost.tsx line 630). These are all confirmed present and correct.

---

## SECTION 9: PRIORITISED FIX LIST (POST-RE-AUDIT)

**P0 — Must fix before launch (accuracy violations in indexed content):**

1. `client/src/pages/Pricing.tsx` line 47 — Remove "secure messaging with your dentist" from Patient plan FAQ JSON-LD answer text. This is indexed by search engines.
2. `client/src/pages/Features.tsx` line 51 — Remove "secure messaging" from og:description meta tag.
3. `client/src/pages/Features.tsx` line 55 — Remove "secure messaging" from twitter:description meta tag.
4. `client/src/pages/Home.tsx` line 235 — Remove "secure patient-clinic messaging" from Features section paragraph.

**P1 — Fix before launch (conversion or credibility impact):**

5. `client/src/pages/ForDentists.tsx` line 20 — Replace "Patient engagement heatmaps" bullet with "Patient programme overview" or "Engagement summary (coming Q2 2026)."
6. `client/src/pages/ForDentists.tsx` lines 56, 59, 63 — Remove "engagement analytics" from all three meta description tags.
7. `client/src/pages/ForDentists.tsx` line 101 — Change "Join as a Founding Clinic" to "Apply as a Founding Clinic" to match section 8 CTA.
8. `client/src/pages/Features.tsx` line 17 — Add `badge: "Beta"` to Smart Reminders card (IN PROGRESS feature, currently unqualified).

**P2 — Fix before launch (trust and UX):**

9. `client/src/pages/Blog.tsx` newsletter form — Either connect to a real email backend or replace with a link to `/waitlist`. Simulated success without actual submission is misleading.
10. `client/src/pages/BlogPost.tsx` lines 444, 464 — Resolve "founded in 2024" vs "incorporated June 2025" discrepancy.

**P3 — Ongoing content development (post-launch):**

11. Add internal links between all blog articles (each article should link to at least 2 others)
12. Add inline CTA within each blog article body (not just closing section)
13. Add DOI citation to "50% of adults" stat in periodontal disease blog article
14. Write 2-3 dentist-audience blog articles for commercial intent SEO

---

## SCORING BREAKDOWN — BEFORE AND AFTER

| Dimension | Original Score | Re-Audit Score | Change | Notes |
|---|---|---|---|---|
| Feature accuracy | 5/10 | 7/10 | +2 | Secure Messaging removed from grid. Key badges added. Engagement Analytics demoted. However, 4 residual claims persist in meta tags, JSON-LD, and one copy block. |
| Medical evidence usage | 7/10 | 8/10 | +1 | 30% stat, €90B stat, €1/€8-50 stat all added with citations. 60-70% stat added to Features. Missing European prevalence stat on home page unchanged. |
| Regulatory compliance | 7/10 | 9/10 | +2 | All 6 regulatory phrase fixes confirmed. Only residual issue is "engagement analytics" in ForDentists meta descriptions (accuracy concern, not clinical risk). |
| Value proposition clarity | 8/10 | 8/10 | 0 | Unchanged. All strong elements preserved. No regressions. |
| CTA quality | 6/10 | 6.5/10 | +0.5 | Newsletter form now has validation and visual feedback. Backend still absent. Join/Apply inconsistency not fixed. |
| EFP award effectiveness | 9/10 | 9/10 | 0 | No regressions. Still best-in-class deployment. |
| Blog quality | 7/10 | 7/10 | 0 | No content changes made to blog articles. P2 items remain open. |
| Between-visits positioning | 8/10 | 8/10 | 0 | Unchanged and consistent. |
| Pricing page | 7/10 | 8/10 | +1 | Price leak in meta fixed. "Secure messaging" removed from visible features. One JSON-LD residue remains (P0). |

**OVERALL: 8.1 / 10 (up from 7.1)**

---

## KEY STRENGTHS — CONFIRMED PRESERVED

- "Between visits, we take over." H1 — unchanged, still exceptional
- EFP award deployment — comprehensive, credible, consistent across all pages
- ForDentists problem-first structure — strengthened with 30%, €90B, and €1/€8-50 stats, all properly cited
- Regulatory language — materially cleaned up; the FAQ JSON-LD language is now aligned with Terms.tsx throughout
- Dr. Anca authority signals — CDO title correctly appears in both home page attribution contexts; credentials elevated on About team card
- "Coming soon" qualifiers — correctly applied to Progress Tracking, Educational Library, Analytics on Pricing page

---

## FILES TO FIX (Absolute Paths)

| File | Issue | Priority |
|---|---|---|
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Pricing.tsx` | JSON-LD line 47: "secure messaging" in Patient plan FAQ answer | P0 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Features.tsx` | og:description line 51 and twitter:description line 55: "secure messaging" | P0 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx` | Line 235: "secure patient-clinic messaging" in Features bento description | P0 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/ForDentists.tsx` | Line 20: "Patient engagement heatmaps" bullet | P1 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/ForDentists.tsx` | Lines 56, 59, 63: "engagement analytics" in meta descriptions | P1 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/ForDentists.tsx` | Line 101: "Join as a Founding Clinic" (should be "Apply") | P1 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Features.tsx` | Line 17: Smart Reminders card needs `badge: "Beta"` | P1 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Blog.tsx` | Lines 96–106: Newsletter form shows success without backend | P2 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/BlogPost.tsx` | Lines 444, 464: "founded in 2024" factual inconsistency | P2 |
