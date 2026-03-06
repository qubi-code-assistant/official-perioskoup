# Content Fix Log — Perioskoup
**Agent:** content-fixer
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**TypeScript:** Passes `pnpm check` with exit code 0

---

## P0 Fixes: Feature Accuracy

### 1. Features.tsx — Secure Messaging card removed
**File:** `client/src/pages/Features.tsx`
**Issue:** "Secure Messaging" feature card (with file sharing, read receipts, archived conversation history) was presented as a working feature. It does not appear anywhere in FEATURE_TRUTH_TABLE.md as Done or In Progress.
**Fix:** Removed the entire Secure Messaging feature card from the FEATURES array. The grid now has 7 cards instead of 8.

### 2. Features.tsx — "Streak rewards" bullet removed
**File:** `client/src/pages/Features.tsx`
**Issue:** "Streak rewards" appeared as a bullet under the Progress Tracking card. Points/Rewards = NOT STARTED per truth table.
**Fix:** Removed "Streak rewards" bullet. Replaced "Weekly engagement reports" (also Not Started: View Analytics) with "Routine consistency tools". Updated Progress Tracking card description to include the 60-70% disease progression reduction stat.

### 3. Features.tsx — AI Chatbot card marked as Beta
**File:** `client/src/pages/Features.tsx`
**Issue:** AI Clinical Companion (Periobot) presented as fully working. Periobot = IN PROGRESS per truth table.
**Fix:** Added "Beta" badge to the card using the new optional `badge` field on the feature object. Changed "Available 24/7" bullet to "Launching with the app".

### 4. Features.tsx — Education Library and Appointment Prep badged
**File:** `client/src/pages/Features.tsx`
**Issue:** Education Library and Appointment Prep features not in Done status in truth table.
**Fix:** Added "Coming Soon" badge to Education Library card and "In Development" badge to Appointment Prep card.

### 5. Features.tsx — Badge rendering added to card component
**File:** `client/src/pages/Features.tsx`
**Fix:** Updated feature card render loop to display optional `badge` field as a lime pill badge next to the feature icon. Added `aria-hidden="true"` to emoji icons.

### 6. Home.tsx — "diagnoses" removed from How It Works
**File:** `client/src/pages/Home.tsx`, Step 01 description
**Issue:** "Your dentist examines, diagnoses, and sets a personalised care plan using Perioskoup" implied Perioskoup is involved in clinical diagnosis.
**Fix:** Changed to "Your dentist examines and creates a personalised care plan — then uploads it to Perioskoup." Cleanly separates the clinical act from the app's role.

### 7. Pricing.tsx — "Progress tracking" marked as coming soon
**File:** `client/src/pages/Pricing.tsx`, Patient plan
**Issue:** "Progress tracking" listed as a current Patient plan feature. Track habits = IN PROGRESS per truth table.
**Fix:** Changed to "Progress tracking (coming soon)". Removed "Secure messaging with your dentist" from Patient plan (not in truth table). Changed "Educational content library" to "Educational content library (coming soon)".

### 8. Pricing.tsx — "Analytics & engagement reports" marked as coming soon
**File:** `client/src/pages/Pricing.tsx`, Clinic plan
**Issue:** "Analytics & engagement reports" listed as current Clinic plan feature. View Analytics = NOT STARTED per truth table.
**Fix:** Changed to "Analytics & engagement reports (coming soon)". Changed "Patient monitoring & alerts" to "Patient engagement visibility" (removes regulatory "monitoring" language).

### 9. ForDentists.tsx — "Engagement Analytics" demoted to roadmap
**File:** `client/src/pages/ForDentists.tsx`, FEATURES array
**Issue:** "Engagement Analytics" feature card included "At-risk patient flagging" and "Practice-wide trend analysis" as bullets — both NOT STARTED per truth table.
**Fix:** Renamed card to "Engagement Insights". Rewrote description to say "coming in Q2 2026". Replaced bullets with "Patient programme overview", "Appointment preparation briefs", "Engagement visibility (in development)", "Practice-wide insights (coming Q2 2026)". "At-risk patient flagging" entirely removed.

---

## P1 Fixes: Medical Evidence

### 10. ForDentists.tsx — 30% stat and EUR 90B cost added to problem section
**File:** `client/src/pages/ForDentists.tsx`, Problem section (section 2)
**Stats added:**
- "Only 30% of patients follow post-treatment oral hygiene instructions after leaving the chair" cited J Clin Periodontol (https://onlinelibrary.wiley.com/doi/full/10.1002/cre2.526)
- "Oral diseases cost EUR 90 billion annually in Europe" cited Platform for Better Oral Health in Europe (https://www.oralhealthplatform.eu/)

### 11. ForDentists.tsx — ROI stat added to CTA section
**File:** `client/src/pages/ForDentists.tsx`, CTA section (section 8)
**Stat added:** "Every EUR 1 invested in prevention saves EUR 8-50 in future treatment costs" cited WHO Oral Health (https://www.who.int/news-room/fact-sheets/detail/oral-health)

### 12. Features.tsx — 60-70% progression reduction stat added
**File:** `client/src/pages/Features.tsx`, Progress Tracking card description
**Stat added:** "Research shows consistent daily routines reduce periodontal disease progression by 60-70%" incorporated into card description text.

---

## P2 Fixes: Regulatory Language

### 13. Home.tsx — FAQ JSON-LD "real-time engagement data" fixed
**File:** `client/src/pages/Home.tsx`, FAQ JSON-LD, "What is Perioskoup?" answer
**Issue:** "giving clinicians real-time engagement data" implies live dashboard functionality not yet built.
**Fix:** Changed to "giving clinicians patient engagement visibility between visits".

### 14. Home.tsx — FAQ JSON-LD "monitor and support remotely" fixed
**File:** `client/src/pages/Home.tsx`, FAQ JSON-LD, "Who is Perioskoup for?" answer
**Issue:** "who want to monitor and support their patients remotely" — "remote patient monitoring" is a regulated EU MDR category.
**Fix:** Changed to "who want to stay connected with their patients between appointments".

### 15. Home.tsx — FAQ JSON-LD "clinical support tool" fixed
**File:** `client/src/pages/Home.tsx`, FAQ JSON-LD, "Is Perioskoup a medical device?" answer
**Issue:** "designed as a clinical support tool" ambiguous, could imply clinical decision support.
**Fix:** Changed to "Perioskoup is a wellness and patient engagement companion, not a medical device. It does not provide diagnoses or medical advice."

### 16. ForDentists.tsx — FAQ JSON-LD "clinical support tool" fixed
**File:** `client/src/pages/ForDentists.tsx`, FAQ JSON-LD, "Is Perioskoup a medical device?" answer
**Fix:** Same fix as #15 — aligned with Terms.tsx "wellness and engagement companion" language.

### 17. ForDentists.tsx — FAQ JSON-LD "monitor engagement" fixed
**File:** `client/src/pages/ForDentists.tsx`, FAQ JSON-LD, "How does Perioskoup help?" answer
**Fix:** Changed "monitor engagement between appointments" to "stay connected with patients between appointments".

### 18. ForDentists.tsx — Workflow card "monitor engagement" fixed
**File:** `client/src/pages/ForDentists.tsx`, Workflow section "Between Visits" card
**Issue:** "You monitor engagement and intervene early if someone falls off track."
**Fix:** Changed to "You stay connected and can reach out if someone needs an extra nudge."

### 19. Pricing.tsx — Meta description price leak fixed
**File:** `client/src/pages/Pricing.tsx`, og:description and twitter:description meta tags
**Issue:** Both tags contained "from EUR 39/mo" exposing unconfirmed pricing to competitors and creating inconsistency with the blurred clinic pricing visible on the page.
**Fix:** Replaced with "Join the founding waitlist for priority access and locked-in pricing."

---

## P3 Fixes: Copy, CTAs, and Team Info

### 20. Home.tsx — Dr. Anca hero quote attribution — CDO added
**File:** `client/src/pages/Home.tsx`, blockquote footer
**Issue:** Attribution read "Dr. Anca Constantin, Periodontist & Co-founder" omitting CDO title.
**Fix:** Changed to "Dr. Anca Constantin, Periodontist & CDO, Perioskoup".

### 21. Home.tsx — Dr. Anca social proof quote attribution — CDO added
**File:** `client/src/pages/Home.tsx`, social proof section
**Issue:** Attribution read "Periodontist & Co-founder, Perioskoup".
**Fix:** Changed to "Periodontist & Chief Dental Officer, Perioskoup".

### 22. About.tsx — Dr. Anca credentials visual prominence increased
**File:** `client/src/pages/About.tsx`, team card creds field
**Issue:** "DMD, PhD in Periodontology" rendered at 12px, #8C9C8C muted — effectively invisible at normal reading contrast.
**Fix:** Dr. Anca's creds now render at 13px, #F5F9EA (full text color), fontWeight 600 — visually elevated relative to other team members' creds which remain muted.

### 23. Home.tsx — Duplicate Features section paragraph removed
**File:** `client/src/pages/Home.tsx`, Features section header
**Issue:** Two consecutive description paragraphs in the Features section header were redundant (audit report Section 11).
**Fix:** Removed the second paragraph ("Perioskoup connects patients and clinicians with AI-powered tools..."). Kept the more specific first paragraph.

---

## Unchanged / Confirmed Clean

- About.tsx FAQ schema: Already correctly says "CDO" (not CEO) — no change needed.
- ForDentists.tsx Dr. Anca attribution: Already says "Periodontist & Co-founder, CDO" — no change needed.
- BlogPost.tsx: "diagnose" appearances are all correct defensive disclaimers — retained as-is per audit.
- Terms.tsx: "therapeutic" usage is a correct legal disclaimer ("not for therapeutic purposes") — retained as-is per audit.
- "treatment" in blog articles: Used to describe professional dentist activity, not Perioskoup capability — acceptable per audit.

---

## Regulatory Term Scan Result (post-fix)

| Term | Status |
|------|--------|
| "compliance" | 0 matches in pages |
| "diagnose" (Perioskoup doing it) | 0 violations (only in disclaimers saying Perioskoup does NOT diagnose) |
| "at-risk patient flagging" | 0 matches |
| "monitor and support...remotely" | 0 matches |
| "real-time engagement data" | 0 matches |
| "clinical support tool" (ambiguous primary pages) | 0 matches |
| "adherence" | 0 matches |
| "therapeutic" | 1 match (Terms.tsx correct defensive use, retained) |
| "track bleeding" | 0 matches |
| "monitor inflammation" | 0 matches |

---

## Files Modified

| File | Changes |
|------|---------|
| `client/src/pages/Features.tsx` | Removed Secure Messaging card; removed Streak rewards and Weekly engagement reports bullets; added Beta/Coming Soon/In Development badges; changed "Available 24/7" to "Launching with the app"; updated Progress Tracking desc with 60-70% stat; updated FAQ JSON-LD |
| `client/src/pages/Home.tsx` | Fixed "diagnoses" in How It Works; fixed 3 FAQ JSON-LD answers (regulatory); added CDO to both Dr. Anca attributions; removed duplicate Features paragraph |
| `client/src/pages/Pricing.tsx` | Marked "Progress tracking" and "Analytics & engagement reports" as coming soon; changed "Patient monitoring & alerts" to "Patient engagement visibility"; removed Secure messaging from Patient plan; fixed og/twitter meta descriptions |
| `client/src/pages/ForDentists.tsx` | Demoted Engagement Analytics to Engagement Insights (coming Q2 2026); removed "at-risk patient flagging"; added 30% stat plus EUR 90B cost to problem section; added EUR 1/EUR 8-50 ROI stat to CTA section; fixed FAQ JSON-LD regulatory language; fixed workflow "Between Visits" card |
| `client/src/pages/About.tsx` | Elevated Dr. Anca credentials font size and color |

---

## Build Verification

```
pnpm check  ->  Exit code 0  (TypeScript: no errors, no compilation issues)
```
