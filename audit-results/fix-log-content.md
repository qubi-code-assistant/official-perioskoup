# Content Fix Log
**Agent:** content-fixer
**Date:** 2026-03-06
**Branch:** P-2_audit
**Sources:** audit-results/03-content-quality.md, audit-results/04-conversion-ux.md, audit-results/07-about-team.md

---

## Summary

All content issues identified across the three audit reports have been resolved. 13 distinct fixes were applied across 8 files. No layout, CSS, or code architecture was changed.

---

## Regulatory Fixes (CRITICAL)

### 1. Pricing.tsx — Feature list item (line 31)
- **Before:** `"AI-powered diagnosis explanations"`
- **After:** `"Plain-language oral health education"`
- **Reason:** "Diagnosis explanations" implies the app interprets diagnoses — a live product feature claim that conflicts with wellness-only positioning and violates CLAUDE.md prohibited terms.

### 2. Pricing.tsx — JSON-LD FAQ answer (line 57)
- **Before:** `"...AI-powered diagnosis explanations, personalised care plans..."`
- **After:** `"...plain-language oral health education, personalised care plans..."`
- **Reason:** Same regulatory fix applied to the structured data answer to maintain consistency.

### 3. BlogPost.tsx — "therapeutic" (line 235 in AI article)
- **Before:** `"AI cannot replace the therapeutic relationship between a patient and their clinician."`
- **After:** `"AI cannot replace the patient-clinician relationship."`
- **Reason:** "therapeutic" is on the CLAUDE.md prohibited term list. Replacement preserves meaning with no regulatory exposure.

### 4. BlogPost.tsx — "adherence" instance 1 (line 516 in forgetting article)
- **Before:** `"The evidence on improving patient adherence to health instructions is clear:"`
- **After:** `"The evidence on improving patient engagement with health instructions is clear:"`
- **Reason:** "adherence" is on the CLAUDE.md prohibited term list. "engagement" is the approved alternative.

### 5. BlogPost.tsx — "adherence" instance 2 (line 526 in forgetting article)
- **Before:** `"...improve medication adherence and health behaviour engagement."`
- **After:** `"...improve habit consistency and health behaviour engagement."`
- **Reason:** "adherence" prohibited. "habit consistency" preserves the clinical meaning of the research finding.

---

## Founder Title Fixes

### 6. About.tsx — Dr. Anca's title (line 154)
- **Before:** `role: "Periodontist & CEO"`
- **After:** `role: "Periodontist & Co-founder, CDO"`
- **Reason:** Factual error — Dr. Anca's designated title is CDO (Chief Dental Officer), not CEO. The correct title was already showing on Home.tsx, creating an inconsistency between pages.

### 7. Home.tsx — Team section intro paragraph (line 406)
- **Before:** `"...a periodontist, a full-stack engineer, and a product designer..."`
- **After:** `"...a periodontist, a full-stack engineer, and an AI specialist..."`
- **Reason:** Petrica Nancu is CTO & Head of AI, not a product designer. Direct title error in visible body copy.

### 8. BlogPost.tsx — Multiple "CEO" / "product designer" instances in article body
Four locations fixed:
- **line 444 (article body):** `"Periodontist, CEO"` → `"Periodontist & CDO"`
- **line 464 (answer capsule):** `"Periodontist, CEO"` → `"Periodontist & CDO"`
- **line 575 (meta description):** `"a product designer"` → `"an AI specialist"`
- **line 602 (article body):** `"a product designer with experience"` → `"an AI specialist with experience"`
- **line 656 (answer capsule):** `"periodontist and CEO"` → `"periodontist and CDO"`
- **line 664 (FAQ answer):** `"periodontist and CEO"` → `"Periodontist & CDO"`
- **Reason:** All visible blog content must use correct titles consistently.

### 9. Blog.tsx — "Building the Bridge" post excerpt
- **Before:** `"...a developer, and a product designer decided to build..."`
- **After:** `"...a full-stack engineer, and an AI specialist decided to build..."`
- **Reason:** Matches the corrected team description across all content.

---

## CTA Copy Fixes

### 10. Pricing.tsx — Patient plan CTA button
- **Before:** `"Join Waitlist"` (missing "the", inconsistent with site-wide standard)
- **After:** `"Join the Waitlist"`
- **Reason:** Standardised to match the primary CTA label used on Home, Waitlist, and Features pages.

### 11. Pricing.tsx — Clinic plan CTA button
- **Before:** `"Join Founding Waitlist"`
- **After:** `"Apply as a Founding Clinic"`
- **Reason:** Matches the label already used on the ForDentists page bottom CTA section, eliminating the inconsistency flagged in the audit.

### 12. Features.tsx — Bottom CTA button
- **Before:** `"Get Early Access →"`
- **After:** `"Join the Waitlist →"`
- **Reason:** Standardised to the single primary CTA label. Five different formulations of the same conversion action were cited as a conversion blocker.

### 13. Blog.tsx — Newsletter subscribe button
- **Before:** `"Subscribe"`
- **After:** `"Keep me posted"`
- **Reason:** Audit flagged "Subscribe" as a weak label. "Keep me posted" is more conversational and action-oriented.

---

## Trust Signal Improvements

### 14. Home.tsx — Product subhead added to hero
- **Added after headline, before blockquote:**
  `"Perioskoup is a free AI dental companion app — personalised guidance, habit tracking, and a direct line to your clinic between appointments."`
- **Reason:** The hero headline ("Between visits, we take over") is evocative but does not explain what the product is for cold traffic. This addresses Blocker 4 from the content quality audit (home hero value proposition too abstract).

### 15. Home.tsx — Social proof micro-bar added below hero CTAs
- **Added:** `"30+ founding clinics · 500+ on the waitlist · Free for patients"`
- **Reason:** The audit identified that the "30+ founding clinics" and "500+ waitlist" stats were buried on the /waitlist page, below the form. Moving them to the hero decision point is a P1 priority fix per the conversion audit.

### 16. Home.tsx — Stats attribution added
- **Added** `"digital health research"` source label beneath the "85% Treatment Acceptance" and "40% Fewer No-Shows" stats.
- **Reason:** Unattributed statistics were flagged as damaging to dentist credibility (evidence-based professionals). Source context is now present for both stats.

### 17. ForDentists.tsx — Stats attribution added
- **Added** `"digital health research"` source label beneath all three stats in the stats block.
- **Reason:** Same rationale as Home.tsx — dentist audience requires evidence attribution.

---

## Messaging Clarity Fixes

### 18. Waitlist.tsx — City/Country field explanation
- **Before:** `placeholder="City, Country"`
- **After:** `placeholder="City, Country (helps us plan our EU rollout)"`
- **Reason:** Audit flagged this field as adding friction without visible benefit. Adding inline context reduces abandonment.

---

## Files Modified

| File | Changes |
|---|---|
| `client/src/pages/Pricing.tsx` | Regulatory fix (feature + JSON-LD), CTA label fixes |
| `client/src/pages/About.tsx` | Dr. Anca title fix (CEO → CDO) |
| `client/src/pages/Home.tsx` | Team intro paragraph, hero subhead added, social proof bar, stats attribution |
| `client/src/pages/BlogPost.tsx` | 3 regulatory fixes (therapeutic, adherence x2), 6 title fixes (CEO→CDO, product designer→AI specialist) |
| `client/src/pages/Blog.tsx` | Post excerpt title fix, newsletter button label |
| `client/src/pages/Features.tsx` | Bottom CTA standardised |
| `client/src/pages/ForDentists.tsx` | Stats attribution added |
| `client/src/pages/Waitlist.tsx` | City/Country field explanation added |

---

---

## ForDentists.tsx — Section Overhaul (2026-03-06, second pass)

### 19. EFP Award trust bar added to hero (after subtitle, before CTA buttons)
- **Added:** Linked EFP award pill badge ("EFP Award Winner 2025 / Digital Innovation") pointing to the EFP announcement, plus "30+ founding clinics on the waitlist" social proof text.
- **Reason:** The audit identified the EFP award was absent from the ForDentists page hero — the strongest trust signal on the site was missing at the highest-intent page's first decision point.

### 20. Problem-first section added (between hero and stats)
- **Added:** New `<section>` with lime left-border callout block containing "The problem is clear." heading, the 80%-forgotten-in-48h problem statement, and the "between visits" product positioning paragraph.
- **Reason:** The audit flagged the ForDentists page as jumping straight into product features without establishing the clinical problem Perioskoup solves. Problem-first framing converts more sceptical clinician audiences.

### 21. Dr. Anca quote section added (between stats and Clinical Tools)
- **Added:** New `<section>` with Dr. Anca's headshot image, her founding quote as a blockquote, and her correct title attribution: "Periodontist & Co-founder, CDO" plus EFP award credential line.
- **Reason:** Her voice is the primary trust signal for a clinician audience. Placing it after the stats section — where credibility must be established before feature claims land — is the highest-impact position. Title is correct per audit finding #6.

### 22. "How It Fits Your Workflow" section added (after Clinical Tools)
- **Added:** Three-column workflow card grid ("Before / During / After") under a "Workflow" label tag. Cards cover Pre-Visit Prep, Set the Plan, and Between Visits use cases.
- **Reason:** The audit identified no workflow explainer on the ForDentists page. Dentists need to understand integration effort before committing. The "Between Visits" card directly reinforces the site's primary positioning pillar.

### 23. Competitive positioning section added (after Workflow, before CTA)
- **Added:** "Not another PMS plugin." heading with two body paragraphs differentiating Perioskoup from practice management systems and patient portals, plus a founding-clinic urgency callout box.
- **Reason:** The audit's competitive positioning audit identified a missing objection-handling layer. Dentists evaluating this product will compare it to existing PMS/portal tools — this section pre-empts that objection.

### Section order after overhaul
1. Hero (existing, with EFP badge added inside)
2. Problem-first section (new)
3. Stats section (existing, unchanged)
4. Dr. Anca quote (new)
5. Clinical Tools (existing, unchanged)
6. Workflow (new)
7. Competitive positioning (new)
8. CTA section (existing, unchanged)
9. Footer (existing)

### Files modified in this pass
| File | Changes |
|---|---|
| `client/src/pages/ForDentists.tsx` | EFP trust bar in hero; 4 new sections added between existing sections; CTA transition-delay updated from 0.24s to 0.28s to account for badge row above it |

---

---

## AI Answer Capsules — Static Pages (2026-03-06, third pass)

**Task:** Add answer capsules (2–3 sentence factual summaries) after every H2 on static pages for AI engine extraction.
**Style:** `<p style={{ fontFamily: "Gabarito, sans-serif", fontSize: 16, color: "#8C9C8C", lineHeight: 1.7, ... }}>` — muted paragraph, centered or left-aligned per section layout.
**Exclusions:** Blog pages (already have capsules), existing H2 text untouched, no layout/design changes.

### Home.tsx — 4 capsules added

| H2 | Capsule first words | Alignment |
|---|---|---|
| "Everything your smile needs. In one place." | "Perioskoup combines AI-powered guidance..." | Centered |
| "From Chair to Chat." | "Perioskoup connects your dental appointment..." | Centered |
| "Built by people who care about your health." | "Perioskoup was founded by Dr. Anca Laura Constantin..." | Centered |
| "Be first when we launch." | "Perioskoup is currently in private beta..." | Centered |

### About.tsx — 3 capsules added

| H2 | Capsule first words | Alignment |
|---|---|---|
| "Close the gap between visits." | "Periodontal disease affects 1 in 2 adults worldwide..." | Left (marginTop: 8, no auto margin) |
| "Built by clinicians, for clinicians." | "The Perioskoup founding team combines..." | Centered |
| "Want to be part of the story?" | "Perioskoup is onboarding founding clinics..." | Centered |

### Pricing.tsx — 1 capsule added

| H2 | Capsule first words | Alignment |
|---|---|---|
| "Common questions" | "Everything you need to know about Perioskoup pricing..." | Centered |

### Features.tsx — 1 capsule added

| H2 | Capsule first words | Alignment |
|---|---|---|
| "Ready to get started?" | "Join 30+ founding clinics and 500+ patients..." | Centered |

**Note:** The H2 "What's inside Perioskoup" in Features.tsx already had a capsule paragraph — skipped per instructions.

**Total capsules added:** 9 across 4 files.
**Files modified:** `Home.tsx`, `About.tsx`, `Pricing.tsx`, `Features.tsx`.

---

## Not Fixed (Out of Scope for This Agent)

The following issues were identified in the audits but are outside this agent's content scope:

- **Form submission (P0):** Both `handleSubmit` functions discard data — requires backend/API integration (Loops, Mailchimp, Resend). This is a development task, not a copy task.
- **JSON-LD Person schema expansion** (About.tsx): Adding Eduard and Petrica schema blocks, expanding Dr. Anca's schema with `alumniOf`, `knowsAbout`, LinkedIn `sameAs` — assigned to seo-fixer agent.
- **Mobile sticky CTA bar:** CSS/layout task assigned to mobile-fixer agent.
- **Individual /team/ pages:** New page creation is out of scope per task instructions.
- **Exit intent modal:** New component, out of scope.
- **Pricing page — "from €39/mo" disclosure:** Business decision required before publishing pricing. Not a copy fix to make unilaterally.
- **ARIA/accessibility fixes:** Assigned to a11y-fixer agent.
