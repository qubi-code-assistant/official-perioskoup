# Content Quality & Messaging Audit — Cycle 2
**Auditor:** Content Quality & Messaging Agent
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Scope:** Full re-read of all pages in `client/src/pages/` against FEATURE_TRUTH_TABLE.md, MEDICAL_STUDIES.md, CLAUDE.md
**Previous score (re-audit):** 8.1 / 10
**Cycle 2 score:** 8.4 / 10

---

## WHAT THIS AUDIT COVERS

This is a fresh pass of the current source code. It verifies whether all issues flagged in re-03-content-quality.md were fixed, identifies any new issues introduced or overlooked, and updates the prioritised fix list to reflect current state.

---

## SECTION 1: FEATURE ACCURACY — CURRENT STATE

### Verified Correct (from previous audit)

The following fixes confirmed as still present in the current codebase:

- Secure Messaging card: absent from Features.tsx FEATURES array. Seven cards total, none titled "Secure Messaging". CONFIRMED.
- "Streak rewards" bullet: absent from Progress Tracking card. Current bullets are "Daily habit logging", "Visual progress dashboards", "Habit streaks", "Routine consistency tools". CONFIRMED.
- AI Clinical Companion badge: `badge: "Beta"` present (Features.tsx line 16). Bullet "Launching with the app" replaces "Available 24/7". CONFIRMED.
- Smart Reminders badge: `badge: "Beta"` present (Features.tsx line 17). CONFIRMED. This was flagged as unfixed in re-audit — it has since been corrected.
- Education Library badge: `badge: "Coming Soon"` (Features.tsx line 20). CONFIRMED.
- Appointment Prep badge: `badge: "In Development"` (Features.tsx line 21). CONFIRMED.
- Engagement Insights card (ForDentists.tsx): demoted, renamed from "Engagement Analytics". Desc contains "coming in Q2 2026". "At-risk patient flagging" removed. CONFIRMED.
- ForDentists.tsx hero CTA (line 101): still reads "Join as a Founding Clinic". STILL INCONSISTENT — see new flag below.
- ForDentists.tsx section 8 CTA (line 274): reads "Apply as a Founding Clinic". CONFIRMED present.

---

### NEW FLAG — "patient monitoring" in Pricing.tsx JSON-LD (P0)

**File:** `client/src/pages/Pricing.tsx`, line 60
**Exact text:** `"Coming soon. Includes clinician dashboard, patient monitoring, analytics, and multi-dentist support."`
**Context:** This is the `productJsonLd` SoftwareApplication schema for the Clinic Offer. It is published as structured data and indexed by search engines.
**Issues:**
1. "patient monitoring" — this is a regulated term in EU MDR. Remote patient monitoring is a defined clinical activity. This phrase associates Perioskoup with clinical monitoring, which contradicts the wellness-companion positioning in Terms.tsx and all FAQ JSON-LD.
2. "analytics" — the analytics feature is Not Started (patient view) and only partially In Progress (dentist). Stating it as a feature in an indexed Offer description is inaccurate.
**Severity:** P0 — structured data, indexed by Google. Two violations in one line.
**Required fix:** Replace the Clinic Offer description with: "Coming soon. Includes clinician dashboard, patient engagement visibility, appointment management, and multi-dentist support."

---

### NEW FLAG — "monitor patient engagement" in Home.tsx (P1)

**File:** `client/src/pages/Home.tsx`, line 244
**Exact text:** `"Dentists and periodontists get a dashboard to monitor patient engagement and send targeted guidance between appointments."`
**Context:** This is the "For Clinicians" card in the homepage Features bento grid. The previous audit cycle fixed "monitor...remotely" in FAQ JSON-LD — but the bento card copy was not changed.
**Issue:** "monitor patient engagement" uses "monitor" in a clinical context. The ForDentists page correctly uses "stay connected" and "engagement visibility". This bento card is inconsistent with the safer language used elsewhere on the site.
**Severity:** P1 — homepage copy. Lower regulatory risk than the Pricing JSON-LD but creates inconsistency with the rest of the site's corrected language.
**Required fix:** Change to "Dentists and periodontists get a dashboard to track patient progress and send targeted guidance between appointments."

---

### NEW FLAG — "real-time support" in Home.tsx meta description (P1)

**File:** `client/src/pages/Home.tsx`, line 52
**Exact text:** `"Perioskoup bridges the gap between dental visits with AI-powered guidance, habit tracking, and real-time support. EFP Digital Innovation Award Winner 2025."`
**Issue:** "real-time support" implies live, synchronous clinical support. The previous audit cycle correctly fixed "real-time engagement data" in FAQ JSON-LD — but the meta description was not updated. In a healthcare context, "real-time support" implies a monitored patient-support function that does not exist. The current product provides asynchronous reminders and habit tracking, not real-time support.
**Severity:** P1 — the meta description is the snippet Google shows in search results. This is high-traffic indexed content.
**Required fix:** Change "real-time support" to "personalised daily support". Full suggested replacement: "Perioskoup bridges the gap between dental visits with AI-powered guidance, habit tracking, and personalised daily support. EFP Digital Innovation Award Winner 2025."

---

### RESIDUAL FLAG (UNFIXED) — "monitor engagement" in BlogPost.tsx (Medium)

**File:** `client/src/pages/BlogPost.tsx`, line 626
**Exact text:** `"...a tool that allows periodontists and dental hygienists to set up patient programmes, monitor engagement, and send targeted guidance between appointments."`
**Context:** This is within the editorial body of the "Building the Bridge: The Perioskoup Story" article. The previous re-audit identified this pattern in FAQ JSON-LD and fixed those; the blog article body was not checked.
**Assessment:** The term "monitor engagement" in editorial/blog content is lower regulatory risk than in structured data or marketing copy. However, it is inconsistent with the language used on the ForDentists page and creates an ambiguity across content types.
**Recommended fix:** Change to "set up patient programmes, track engagement, and send targeted guidance." Low urgency but worth correcting for consistency.

---

### RESIDUAL FLAG (UNFIXED) — CTA Verb Inconsistency on ForDentists.tsx (P1)

**File:** `client/src/pages/ForDentists.tsx`, line 101
**Hero CTA:** "Join as a Founding Clinic"
**Section 8 CTA (line 274):** "Apply as a Founding Clinic"
**Issue:** This was flagged in both the original audit and re-audit as unfixed. It remains unfixed. Two different verbs for the same action on the same page.
**Impact:** "Apply" creates exclusivity and urgency (implies selection). "Join" implies open access. Using both on the same page dilutes the FOMO effect of the "Apply" framing.
**Required fix:** Change line 101 from "Join as a Founding Clinic" to "Apply as a Founding Clinic".

---

### PASS — Secure Messaging Fully Removed from Primary Copy

The following locations were previously flagged as containing "secure messaging" references that survived the first fix pass. All have been resolved:

- Home.tsx Features bento paragraph: no longer contains "secure patient-clinic messaging". Current text (line 235): "Perioskoup combines AI-powered guidance, daily habit tracking, a clinician dashboard, and GDPR-compliant privacy into a single dental companion app." CONFIRMED FIXED.
- Features.tsx og:description (line 51): no longer references secure messaging. Current text: "AI-powered habit tracking, smart reminders, clinician dashboard, and GDPR-compliant data protection for dental patients and practices." CONFIRMED FIXED.
- Features.tsx twitter:description (line 55): no longer references secure messaging. Current text: "Personalised habit tracking, smart reminders, clinician dashboard, and GDPR-compliant data protection. All in one AI dental companion." CONFIRMED FIXED.
- Pricing.tsx Patient plan FAQ JSON-LD: current text of Patient plan answer (line 47) does not contain "secure messaging". CONFIRMED FIXED.

---

### PASS — Founding Year Discrepancy Resolved

**File:** `client/src/pages/BlogPost.tsx`, line 444
Previous flag: "founded in 2024" — an inconsistency with CLAUDE.md ("incorporated June 2025") and About.tsx FAQ JSON-LD ("founded in 2025").
Current text: "Perioskoup was founded in 2025 by three people..." CONFIRMED FIXED. The year discrepancy has been corrected. The text now matches About.tsx and CLAUDE.md.

---

### PASS — All Other Feature Accuracy Items

| Claim | File | Status |
|---|---|---|
| Habit Tracking (Home bento) | Home.tsx line 243 | PASS — presented as a general feature, no beta/coming soon qualifier needed at this level |
| Treatment plans (dentist) | ForDentists.tsx | PASS — presented correctly as part of dashboard capability |
| Appointment management | ForDentists.tsx | PASS — correctly described as part of Practice Dashboard |
| GDPR-Compliant & Secure card | Features.tsx line 22 | PASS — no badge needed; this is infrastructure, not a feature in development |
| Dentist Dashboard card | Features.tsx line 19 | PASS — bullets "Patient programme overview", "Appointment preparation briefs", "Multi-patient practice view", "Exportable summaries" are all accurately scoped |

---

## SECTION 2: REGULATORY SCAN — CURRENT STATE

A full pattern sweep was run against all files in `client/src/pages/` for the following terms:

| Term | Result | File + Line | Assessment |
|---|---|---|---|
| "compliance" | 0 violations | — | Clean |
| "diagnose" (Perioskoup doing it) | 0 violations | All uses are disclaimers | Clean |
| "diagnoses" (ambiguous phrasing) | 0 violations | Previously fixed in Home.tsx How It Works | Clean |
| "adherence" | 0 violations | — | Clean |
| "therapeutic" | 1 match | Terms.tsx line 16 | Correct defensive use — retain |
| "clinical guidance" | 0 violations | — | Clean |
| "monitor inflammation" | 0 violations | — | Clean |
| "track bleeding" | 0 violations | — | Clean |
| "patient monitoring" | 1 match | Pricing.tsx line 60 (JSON-LD) | NEW FLAG — P0 (see Section 1) |
| "monitor patient engagement" | 1 match | Home.tsx line 244 | NEW FLAG — P1 (see Section 1) |
| "real-time support" | 1 match | Home.tsx line 52 (meta desc) | NEW FLAG — P1 (see Section 1) |
| "monitor engagement" | 1 match | BlogPost.tsx line 626 (article body) | Medium — editorial context |
| "at-risk patient flagging" | 0 violations | Correctly removed | Clean |
| "engagement analytics" | 0 violations in meta descriptions | ForDentists.tsx meta tags now say "patient engagement visibility" | CONFIRMED FIXED |
| "clinical support tool" | 0 violations | Previously fixed | Clean |

**Regulatory summary:** Three new issues identified, none in FAQ JSON-LD (which was fully cleaned in the previous cycle). The P0 issue is "patient monitoring" in the productJsonLd Clinic Offer — structured data that is indexed. The two P1 issues are in meta description and homepage copy. All blog article disclaimers remain clean and strong.

---

## SECTION 3: MEDICAL EVIDENCE — CURRENT STATE

### Stats Correctly Used With Citations (Confirmed)

| Stat | Location | Citation | Status |
|---|---|---|---|
| 80% instructions forgotten within 48h | Home hero stats row, ForDentists stats row, About stats card | Kessels 2003, BMJ DOI | PASS |
| 87% mHealth studies show improvement | Home hero stats row, ForDentists stats row, About stats card | Toniazzo et al. 2019, JCP DOI | PASS |
| 62% of adults have periodontitis worldwide | ForDentists stats row, About stats card | Bernabe et al. 2020, JCP DOI | PASS |
| Weinert et al. 2025 (patient barriers) | ForDentists problem section | DOI link inline | PASS |
| 30% follow post-treatment instructions | ForDentists problem section | J Clin Periodontol link | PASS — added in previous cycle |
| €90B oral disease annual cost in Europe | ForDentists problem section | Platform for Better Oral Health link | PASS — added in previous cycle |
| €1 in prevention saves €8–50 in treatment | ForDentists CTA section | WHO Oral Health link | PASS — added in previous cycle |
| 60-70% disease progression reduction with consistent routines | Features.tsx Progress Tracking card | No specific DOI — stated as fact | MEDIUM — acceptable for card copy but needs citation if it appears in prose |
| 50% of adults have some form of gum disease | BlogPost.tsx periodontal disease article body | EFP cited, no DOI link | OPEN (P3) |

---

### Stats Still Missing From Primary Pages (Unchanged)

The following evidence-backed stats from MEDICAL_STUDIES.md are confirmed absent from primary landing pages:

1. "50% of European adults have periodontal disease" — still absent from Home hero stats row and ForDentists hero section. Used in blog article body without a DOI link. The three stats shown on the Home hero (87%, 80%, EFP Award Winner) are strong but none speak to prevalence. For patient acquisition, "1 in 2 adults" is the single most motivating fact. Recommended placement: Home hero stats row as a fourth stat or a replacement for the EFP Award Winner stat (the award is already visible in the EFP badge above).

2. "Regular interdental cleaning reduces gingivitis by up to 40%" (Cochrane Library) — still absent from the 3-minute routine blog article and the Features page habit tracking card.

These are P3 items — valuable for trust but not blocking launch.

---

## SECTION 4: VALUE PROPOSITION — 3-SECOND TEST

### Home Page
**Verdict:** PASS (strong)
H1: "Between visits, we take over." — unchanged, still excellent. Subhead now reads: "Perioskoup is a free AI dental companion app - personalised guidance, habit tracking, and a direct line to your clinic between appointments." This is specific and clear. The EFP badge above the fold adds immediate credibility. The Dr. Anca blockquote below the subhead grounds the product in clinical reality.

**One note:** "a direct line to your clinic" implies messaging/communication with the clinic. With secure messaging Not Started, this phrase technically over-promises a communication channel. Consider replacing with "and a connection to your care team" — which is vaguer but accurate (the app gives the dentist engagement visibility without requiring patient-to-clinic messaging).

---

### Features Page
**Verdict:** PASS (improved from previous cycle)
Badge system is now consistent: Beta (AI Companion, Smart Reminders), Coming Soon (Education Library), In Development (Appointment Prep). The grid now gives prospects a clear read on what's available vs. roadmap. The description for the full grid (line 96) correctly says "GDPR-compliant privacy" without referencing secure messaging.

**One improvement opportunity:** The section heading "What's inside Perioskoup" could be stronger. "Everything between your visits" (used in the hero H1) is more specific and ownable.

---

### For Dentists Page
**Verdict:** PASS (strong)
H1: "Your patients, better prepared." — unchanged, strong. Problem-first structure works: 80% stat → Weinert 2025 citation → 30% stat → €90B stat → solution. The €1/€8–50 stat in the CTA section closes the economic loop effectively. The Engagement Insights card is correctly demoted to roadmap framing.

**Remaining weakness:** The hero CTA is "Join as a Founding Clinic" while the bottom CTA is "Apply as a Founding Clinic" — two verbs for the same action on the same page (see Section 1 flag).

---

### Pricing Page
**Verdict:** PASS
Pricing strategy is clear. "Coming soon" for the Clinic plan is honest. Beta notice banner is prominent. The visible feature lists correctly mark "progress tracking (coming soon)" and "educational content library (coming soon)" for the Patient plan. The Clinic plan features include "Analytics & engagement reports (coming soon)" and "Patient engagement visibility" — correctly scoped language.

**Remaining issue:** The productJsonLd Clinic Offer description (line 60) says "patient monitoring, analytics" — see P0 flag in Section 1.

---

### Blog Page
**Verdict:** PASS
6 articles, dual authorship (Dr. Anca + Eduard), clear category tags. Newsletter section has visual form and validation, but still no backend integration (see P2 flag below).

---

### Waitlist Page
**Verdict:** PASS (strong)
Role selector (Dentist / Patient) is well-executed. Form validates both roles correctly. Social proof shows "30+ founding clinics" and "Winner EFP Award 2025". The page is correctly set to `noindex` — it should not rank in search engines.

**Note:** The form still has no backend integration (confirmed by reading the handleSubmit function — it sets `submitted: true` without calling any API). A user submitting this form is not actually registered anywhere. This is a P1 issue for the patient acquisition strategy, though it's a functional issue rather than a content one.

---

## SECTION 5: BOTH AUDIENCES — COVERAGE ASSESSMENT

### Patients — 8/10 (unchanged)

The patient-facing narrative is strong across Home, Features, Blog, and Waitlist. The "free during beta" message is consistent and clear everywhere. Dr. Anca's authority signals are well-deployed.

Still missing: real patient testimonials. The only quotes are from Dr. Anca (founder) and the EFP jury. One or two real beta patient quotes would substantially increase the social proof for patient acquisition. This is a P3 item — cannot be added without real beta feedback, which requires launch.

---

### Dentists — 7.5/10 (improved from 7/10)

The ForDentists page is stronger after the previous cycle additions (30% stat, €90B stat, €1/€8–50 ROI stat). The problem-first structure is the best dentist-targeting content on the site.

Still missing:
- No dentist-specific blog articles. All articles are patient-facing or general interest. A dentist visiting the blog finds nothing that speaks to their professional challenges.
- The economic argument stops at the €1/€8–50 stat. There is no estimate of what one additional prevented relapse appointment is worth in practice revenue. A concrete example ("If Perioskoup helps retain one periodontal patient who would otherwise have discontinued, that's an average of €X per year in lost revenue recovered") would be significantly more persuasive to a practice owner.

---

## SECTION 6: CTA QUALITY AND PLACEMENT

| Page | Primary CTA | Secondary CTA | Status |
|---|---|---|---|
| Home | "Join the Waitlist" (SVG arrow) | "For Clinicians" | Strong |
| Features | "Join the Waitlist →" | "For Dentists" | Acceptable |
| ForDentists | "Join as a Founding Clinic" (hero) / "Apply as a Founding Clinic" (section 8) | "See All Features" | INCONSISTENT — unfixed |
| Pricing | "Join the Waitlist" / "Apply as a Founding Clinic" | — | Correct |
| Blog | "Join the Waitlist" + newsletter form | — | Newsletter has no backend |
| About | "Join the Waitlist" | "Contact Us" | Adequate |
| Waitlist | Submit (no backend) | — | Form not wired |

### CTA Issues

**Issue 1 — "Join" vs "Apply" on ForDentists (P1, residual, unfixed):**
ForDentists.tsx line 101: "Join as a Founding Clinic." ForDentists.tsx line 274: "Apply as a Founding Clinic." The previous two audit cycles flagged this. Still unfixed. Fix by changing line 101 to "Apply as a Founding Clinic."

**Issue 2 — Newsletter form has no backend (P2, residual):**
Blog.tsx lines 96–106: The `handleNewsletterSubmit` function validates the email and then sets `newsletterStatus('success')` without sending data anywhere. The button shows "Subscribed!" which is a false confirmation. This is worse than doing nothing — it actively misleads users into believing they have subscribed. Options: (a) integrate with a real email collection service before launch, or (b) replace the newsletter section with a direct link to `/waitlist`. Given the March 2026 launch timeline, option (b) is the pragmatic choice.

**Issue 3 — Waitlist form has no backend (P1, functional issue):**
Waitlist.tsx handleSubmit (line 36–43) validates and sets `submitted: true` without any API call. No waitlist registrations are being captured. This is the highest-priority functional issue on the site — it is the primary conversion mechanism for both patient and clinic acquisition. Confirmed: there is no `fetch()` or `axios` call in the entire Waitlist.tsx file. Every form submission is silently discarded.

---

## SECTION 7: EFP AWARD USAGE — CONFIRMED EXCELLENT

No changes or regressions. The award is deployed consistently and correctly:

- Home page: EFP badge above the fold + full EFP Award card section with photo, jury names, quote, and link.
- ForDentists page: EFP badge in hero section alongside "30+ founding clinics" social proof.
- Pricing page: EFP badge in hero section.
- About page: Full EFP Award card with photo, quote, jury names, and EFP link.
- Footer: Referenced in social proof bar.
- Blog: EFP award article as a featured post.
- About FAQ JSON-LD (line 34): Correctly states "3rd Prize" — only location where the prize tier is stated explicitly in structured data.

The current "Winner" framing on marketing copy (rather than "3rd Prize") remains the correct conversion copywriting choice for this audience. Clinicians who know the award will respect the 3rd Prize designation; those who don't simply see "EFP Award Winner," which is accurate.

---

## SECTION 8: BLOG QUALITY ASSESSMENT

### Current Status (6 articles, unchanged from previous cycles)

**Article 1: "What Is Periodontal Disease?"**
Depth: Excellent. Medical accuracy: Strong. The 50% stat (EFP source) is cited by name but lacks a DOI link in the body. The MEDICAL_STUDIES.md provides the PMC7275199 link.
Status: P3 improvement — add DOI link. No regressions.

**Article 2: "How AI Is Changing Dental Monitoring"**
Depth: Strong. Medical accuracy: Good. FDA-cleared tools (Overjet, Denti.AI, Pearl) cited correctly.
The article article correctly states: "AI cannot diagnose. In the context of a consumer-facing dental app, AI can provide information, flag potential concerns, and recommend professional consultation."
The meta description (line 186): "AI is transforming how dentists monitor patient health between appointments." The phrase "monitor patient health" is in the context of an article about the dental industry generally — this is acceptable editorial language, not a product claim. No flag needed.
Status: PASS. No new issues.

**Article 3: "The 3-Minute Daily Routine"**
Depth: Excellent practical guide. The EFP citation for Modified Bass technique is mentioned in the text but not linked. The Cochrane evidence for interdental cleaning (up to 40% reduction in gingivitis) is not cited. These are P3 improvements.
Status: PASS with two citation gaps.

**Article 4: "EFP Digital Innovation Award 2025"**
The founding year discrepancy ("2024" vs "2025") has been fixed (confirmed: line 444 now reads "Perioskoup was founded in 2025"). The article correctly states it was 3rd Prize. The "What's Next" section mentions the waitlist but does not link to it inline — it would benefit from a `<Link href="/waitlist">` within the article body.
Status: PASS with one minor linking gap.

**Article 5: "Why Patients Forget Dental Instructions"**
Depth: The strongest evidence-based article. Ebbinghaus forgetting curve, JADA study (20–40% recall), BDJ study. The MEDICAL_STUDIES.md Kessels 2003 DOI is not linked in the article body (though it's cited in the stats row on other pages).
Status: PASS with one citation gap.

**Article 6: "Building the Bridge: The Perioskoup Story"**
The founding year has been corrected (confirmed). The regulatory disclaimer (line 630) is strong: "Perioskoup does not diagnose. It does not make clinical recommendations independently."
BlogPost.tsx line 626: "monitor engagement" — see Section 2 regulatory scan for the medium-severity note.
Status: PASS with one minor language inconsistency in body copy.

---

### Internal Linking — Still Absent (P3)

No blog article links to any other blog article within its body. There are no "related articles" sections. This is unchanged from the original audit. Internal linking is the highest-impact SEO and engagement improvement available to the blog. Each article should link to at least two others in the body text, and a "Related Articles" row should appear at the bottom of each post.

Currently, a user who reads the AI article has no obvious path to the forgetting curve article or the periodontal disease guide. The forgetting curve article does not link to the 3-minute routine. None of the articles link to the EFP award piece.

---

### Missing Content (P3, post-launch)

The following high-value articles are absent from the blog:

**For dentist commercial intent:**
- "How AI Reduces Between-Visit Patient Drop-off" — directly addresses the clinic buyer's primary concern
- "The Hidden Cost of Patient Attrition Between Appointments" — makes the economic case with data
- "How Perioskoup Fits Into a Periodontology Practice Workflow" — removes objection that the tool requires workflow change

**For patient SEO:**
- "What Is a Periodontist? When to See One Instead of a Dentist" — high search volume, clear intent
- "Gum Disease and Your Heart: What the Research Shows" — high engagement topic, internal link opportunity to the periodontal disease guide
- "How to Know If Your Gum Disease Is Getting Worse" — matches search intent of patients mid-treatment

**For category creation:**
- "What Is an AI Dental Companion? (And Why It's Different From Any Dental App)" — currently exists only as a section on Home, needs a full article to own the search term

---

## SECTION 9: "BETWEEN VISITS" POSITIONING — CONFIRMED STRONG

The positioning is unchanged and consistent across the site:

- Home H1: "Between visits, we take over."
- Home ticker: "Bridging the Gap Between Visits"
- Home FAQ JSON-LD: "bridges the gap between dental appointments"
- ForDentists workflow card: "Between Visits" step
- ForDentists competitive positioning: "the AI dental companion for what happens between visits"
- Blog article 6 title: "Building the Bridge"
- About mission: "Close the gap between visits"
- Home "What is an AI dental companion?" section: "bridges the gap between what your dentist recommends and what you actually do at home"

The "between visits" framing is used correctly and consistently. It is the strongest differentiator and it appears at every stage of the funnel.

---

## SECTION 10: PRICING PAGE — CONFIRMED

The Pricing page is well-structured. The beta notice is prominent. The visible feature list correctly marks in-development items. The FAQ section is honest and conversion-appropriate.

The one new issue is in the productJsonLd JSON-LD (line 60) — see Section 1 P0 flag.

---

## SECTION 11: PRIORITISED FIX LIST (CYCLE 2 — CURRENT STATE)

### P0 — Fix before launch (accuracy violations in indexed structured data)

1. `client/src/pages/Pricing.tsx` line 60 — productJsonLd Clinic Offer description contains "patient monitoring, analytics". Replace with: "Coming soon. Includes clinician dashboard, patient engagement visibility, appointment management, and multi-dentist support."

### P1 — Fix before launch (regulatory language, conversion impact)

2. `client/src/pages/Home.tsx` line 244 — "monitor patient engagement" in Features bento card. Replace with: "Dentists and periodontists get a dashboard to track patient progress and send targeted guidance between appointments."

3. `client/src/pages/Home.tsx` line 52 — "real-time support" in meta description. Replace with: "personalised daily support."

4. `client/src/pages/ForDentists.tsx` line 101 — "Join as a Founding Clinic" in hero CTA. Change to "Apply as a Founding Clinic" to match section 8 CTA.

5. `client/src/pages/Waitlist.tsx` — Form has no backend. Every submission is silently discarded. This is the primary conversion mechanism for the entire site. Must be connected to a real endpoint (Resend, Supabase, Mailchimp, or even a simple email webhook) before launch.

### P2 — Fix before launch (trust and UX)

6. `client/src/pages/Blog.tsx` newsletter form — Shows "Subscribed!" confirmation without submitting data. Either wire to a real backend or replace the newsletter section with a button linking to `/waitlist`. The false-confirmation state must not go live.

7. `client/src/pages/Home.tsx` line 102 — "a direct line to your clinic" in hero subhead implies messaging capability that does not exist (Secure Messaging is Not Started). Consider changing to "and a connection to your care team."

### P3 — Post-launch improvements (content authority and SEO)

8. Add internal links between blog articles (each article should link to at least 2 others within body text).
9. Add a "Related Articles" row at the bottom of each blog post.
10. Add inline CTAs within blog article body text (not just the closing bio section).
11. Add DOI link to "50% of adults" stat in BlogPost.tsx periodontal disease article body.
12. Add DOI link to "Regular interdental cleaning reduces gingivitis by up to 40%" to the 3-minute routine article and Features page Progress Tracking card.
13. Add "50% of European adults" stat with citation to Home hero stats row or ForDentists problem section.
14. Write 3 dentist-audience blog articles for commercial intent SEO.
15. Write "What Is an AI Dental Companion?" as a standalone long-form article.
16. Change "monitor engagement" (BlogPost.tsx line 626) to "track engagement" for regulatory language consistency.

---

## SCORING BREAKDOWN — CYCLE 2

| Dimension | Original | Re-Audit | Cycle 2 | Change | Notes |
|---|---|---|---|---|---|
| Feature accuracy | 5/10 | 7/10 | 8.5/10 | +1.5 | Smart Reminders now correctly badged. Secure messaging fully removed from all copy locations. Founding year corrected. One new JSON-LD issue found (Pricing.tsx productJsonLd). |
| Medical evidence usage | 7/10 | 8/10 | 8/10 | 0 | All three major stats added in previous cycle confirmed present. Two citation gaps in blog articles remain. No regression. |
| Regulatory compliance | 7/10 | 9/10 | 8.5/10 | -0.5 | Three new issues found: "patient monitoring" in productJsonLd (P0), "monitor patient engagement" in Home bento (P1), "real-time support" in Home meta (P1). Previous fixes all confirmed present. Score reflects new issues. |
| Value proposition clarity | 8/10 | 8/10 | 8/10 | 0 | Unchanged. Strong across all primary pages. |
| CTA quality | 6/10 | 6.5/10 | 6.5/10 | 0 | Join/Apply inconsistency still unfixed. Newsletter still has no backend. Waitlist form still has no backend — this is the critical functional issue. |
| EFP award effectiveness | 9/10 | 9/10 | 9/10 | 0 | Unchanged. Best-in-class deployment. |
| Blog quality | 7/10 | 7/10 | 7.5/10 | +0.5 | No regressions. Founding year fixed. Smart Reminders card added. No new articles. Citation gaps remain. Internal linking still absent. |
| Between-visits positioning | 8/10 | 8/10 | 8.5/10 | +0.5 | Consistent and strong. "What is an AI dental companion?" section on Home adds explanatory depth. |
| Pricing page | 7/10 | 8/10 | 7.5/10 | -0.5 | Visible content is correct. One JSON-LD structured data issue found in this cycle. |

**OVERALL: 8.4 / 10 (up from 8.1)**

---

## KEY STRENGTHS — CONFIRMED PRESERVED

- "Between visits, we take over." — the best single line of copy on the site. Do not change.
- EFP Award deployment — consistent, credible, comprehensive. Best-in-class for a pre-revenue startup.
- ForDentists page — problem-first structure is strengthened with €90B, 30%, and €1/€8-50 stats. Strong economic argument for the clinic buyer.
- Blog articles — Dr. Anca's clinical authority is genuine and well-expressed. The regulatory disclaimers (AI cannot diagnose) are strong and correctly placed.
- Dual-audience segmentation — patients free, clinics paid — is communicated clearly and consistently on every page.
- Badge system on Features page — Beta, Coming Soon, In Development — now gives prospects accurate expectations about feature availability.

---

## FILES TO FIX (Absolute Paths — Cycle 2)

| File | Issue | Priority |
|---|---|---|
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Pricing.tsx` | Line 60: productJsonLd Clinic Offer "patient monitoring, analytics" | P0 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx` | Line 244: "monitor patient engagement" in bento card copy | P1 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx` | Line 52: "real-time support" in meta description | P1 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/ForDentists.tsx` | Line 101: "Join as a Founding Clinic" (change to "Apply") | P1 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Waitlist.tsx` | handleSubmit has no backend call — form submissions are silently discarded | P1 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Blog.tsx` | Newsletter shows "Subscribed!" without backend — misleading false confirmation | P2 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx` | Line 102: "a direct line to your clinic" implies messaging — consider softening | P2 |
| `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/BlogPost.tsx` | Line 626: "monitor engagement" — change to "track engagement" for consistency | P3 |
