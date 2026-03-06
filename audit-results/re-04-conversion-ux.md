# Re-Audit: Conversion UX — Perioskoup Landing Page

**Auditor:** Conversion Rate Optimization Specialist (Re-Audit Pass)
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Prior audit:** audit-results/04-conversion-ux.md (Score: 6.0 / 10)
**Fix logs reviewed:** fix-log-content.md, fix-log-mobile.md
**Source reviewed:** client/src/pages/ (all 10 pages), client/src/components/Navbar.tsx, vercel.json

---

## Overall Score: 5.5 / 10

The mobile and content fix rounds improved the structural quality of the site significantly. However, the five highest-impact conversion defects from the original audit are all still present in the source code unchanged. The score drops by 0.5 from the original 6.0 because the P0 form defect was explicitly identified, rated 1/10, given a clear fix path, and not acted on. A known critical defect that survives a dedicated audit-and-fix cycle is more concerning than an undiscovered one.

---

## Verification Matrix: Original Findings

This table confirms which original issues were resolved by the content and mobile fix passes.

| Issue | Original Score | Status | Evidence |
|-------|---------------|--------|----------|
| Forms discard submitted data | P0 | **NOT FIXED** | `handleSubmit` in Waitlist.tsx and Contact.tsx still call `setSubmitted(true)` / `setSent(true)` with no `fetch()`, no third-party SDK, no API route in vercel.json, no `/api/` directory anywhere in the project |
| Error color uses brand lime (#C0E57A) | P1 | **NOT FIXED** | All 7 error span styles in Waitlist.tsx (3 instances) and Contact.tsx (4 instances) still render `color: "#C0E57A"` |
| Waitlist form uses sr-only labels | P1 | **NOT FIXED** | All 5 labels in Waitlist.tsx are `className="sr-only"`. Contact.tsx correctly has visible labels but they were not ported to the waitlist form |
| No mobile sticky CTA bar | P1 | **NOT FIXED** | No `position: fixed; bottom: 0` element exists in any page or component. Grep for "sticky bottom" and "position.*fixed.*bottom" returns zero matches |
| No mid-page CTA on Home (~60% depth) | P2 | **NOT FIXED** | Home.tsx structure between `HOW IT WORKS` section and `SOCIAL PROOF / QUOTE` section contains no CTA element |
| URL param pre-selection for waitlist role | P2 | **NOT FIXED** | Waitlist.tsx still initialises `useState<"patient" \| "dentist">("dentist")` with no URLSearchParams read. ForDentists CTA still links to `/waitlist` with no `?role=dentist` |
| Pricing page shows no clinic price | P1 | **NOT FIXED** | `PLANS[1].price` is still the string `"Coming soon"` in Pricing.tsx |
| 404 page has no waitlist CTA | P2 | **NOT FIXED** | NotFound.tsx has one `<Link href="/">Back to Home</Link>` and no waitlist mention |
| Blog newsletter does not send data | P1 | **PARTIALLY FIXED** | Blog.tsx now has a `handleNewsletterSubmit` with a proper form `onSubmit` handler and basic email validation. However, the comment on line 104 reads `// No backend yet — optimistically show success` — meaning the Subscribe action still silently discards the email address. This is a regression improvement in UX (button now responds, validation fires) but not a data capture fix |
| Mobile navbar CTA hidden | P1 | **FIXED** | Navbar.tsx now uses `className="btn-primary hidden md:inline-flex"` replacing the old `hide-mobile` inline style block. Desktop CTA is now properly Tailwind-managed. Mobile drawer includes a full-width "Join the Waitlist" button |
| Home hero social proof micro-bar low contrast | P2 | **NOT FIXED** | `fontSize: 13, color: "#8C9C8C"` is unchanged at line 127 of Home.tsx. No bold treatment on "30+" |
| Dr. Anca attribution CDO title missing | P3 | **FIXED** | Hero blockquote now reads "Dr. Anca Constantin, Periodontist & CDO, Perioskoup". Social proof quote reads "Periodontist & Chief Dental Officer, Perioskoup" |
| Duplicate Features paragraph | P3 | **FIXED** | Removed per fix-log-content.md item 23 |
| How It Works "diagnoses" regulatory language | P2 | **FIXED** | Step 01 now reads "Your dentist examines and creates a personalised care plan — then uploads it to Perioskoup" |
| Pricing meta description price leak | P2 | **FIXED** | og:description and twitter:description no longer contain "from EUR 39/mo" |

---

## Section 1: Waitlist Form Friction

**Score: 4.0 / 10** (down from 4.5 — was expected to improve, regressed due to zero action on P0)

### P0: Form submission still discards all data

This is unchanged since the original audit. The exact code pattern confirmed in source:

```tsx
// Waitlist.tsx — handleSubmit (current code, unchanged)
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const errs = validate(e.currentTarget);
  setErrors(errs);
  if (Object.keys(errs).length === 0) {
    setSubmitted(true);   // no fetch, no API call — data is lost
  }
}
```

No `fetch()` call exists anywhere in the pages or components directories. `vercel.json` has no `functions` key. There is no `/api/` directory. There are no SDK imports (`loops`, `resend`, `formspree`, `mailchimp`, `convertkit`) anywhere in the codebase.

The blog newsletter situation is slightly better — `Blog.tsx` line 104 now contains a form with a proper `onSubmit` handler and email validation, but the comment `// No backend yet — optimistically show success` confirms the submission still goes nowhere. This is a UX improvement (the button was previously completely inert) but not a data capture fix.

The site is actively marketed ("30+ founding clinics"), receives organic traffic from the EFP award coverage, and has a live social proof claim that depends on data being collected. Every waitlist and contact submission since the current codebase was deployed has been silently lost.

### P1: Error colors still use brand lime

All 7 error span instances across Waitlist.tsx (3) and Contact.tsx (4) still render `color: "#C0E57A"`. This was explicitly called out in the original audit with a 15-minute fix estimate. It is unchanged. Users see lime text (the brand's positive/CTA/success color) when they make validation errors, creating semantic ambiguity.

### P1: Waitlist form still uses screen-reader-only labels

The waitlist form still uses `className="sr-only"` for all five labels. The contact form has correctly implemented visible labels above each field since the original codebase. The pattern exists, was identified, but was not ported. A user who clicks into a field and starts typing loses all context for what the field is asking.

### P1: Default role on /waitlist is still "dentist"

`const [role, setRole] = useState<"patient" | "dentist">("dentist")` — unchanged. The majority of traffic arriving at the home page hero CTA is general/patient traffic. They click "Join the Waitlist," arrive at /waitlist, and immediately see the Dentist/Clinic tab selected with "Founding partner pricing" displayed. This creates a disorienting experience for the primary non-dentist visitor.

### What improved in this section

Nothing substantive changed in the form architecture. The mobile grid fix (Fix 10 in fix-log-mobile.md) correctly changed the role selector from a hardcoded `gridTemplateColumns: "1fr 1fr"` to a Tailwind responsive `grid-cols-1 sm:grid-cols-2` — this is a mobile UX improvement but not a conversion improvement.

---

## Section 2: CTA Visibility at Every Scroll Depth

**Score: 5.5 / 10** (up from 5.5 — Navbar mobile fix is real improvement, but mid-page gap unchanged)

### What improved

The Navbar mobile CTA fix (Fix 19 in fix-log-mobile.md) is the most impactful conversion improvement in either fix round. The old `hide-mobile` inline style that applied `display: none !important` to the primary CTA has been replaced with Tailwind `hidden md:inline-flex`. This means:

- Desktop navbar CTA is now correctly managed via Tailwind responsive utilities
- Mobile drawer includes a full-width "Join the Waitlist" button that is visible from the first nav link tap
- The 1px breakpoint gap between 768px and 769px is eliminated

This is a genuine conversion improvement for mobile visitors who open the drawer.

### What did not improve: the mid-page CTA dead zone

The Home page CTA audit is unchanged:

| Depth (approx) | CTA present | Status |
|----------------|-------------|--------|
| 0-10% (hero) | Yes — btn-primary + btn-ghost | Good |
| 10-15% (ticker) | No | Same as before |
| 15-30% (EFP Award card) | No — external EFP link only | Same |
| 30-45% (Features bento) | Weak — "See all features" ghost to /features | Same |
| 45-60% (AI companion definition) | No | Same |
| 60-75% (How It Works) | No | Same — dead zone unchanged |
| 75-85% (Social proof quote) | No | Same — Dr. Anca quote still has no button below it |
| 85-100% (Footer) | Footer link only | Same |

The ~1200px dead zone between 30% and 85% scroll depth on the home page remains entirely without a primary CTA. No mid-page interrupt was added.

### ForDentists CTA coverage

The ForDentists page is substantively unchanged in its CTA architecture. Bottom CTA section (section 8) is strong: "Apply as a Founding Clinic" + "Talk to the Team". The positioning callout at section 7 correctly says "Founding clinic spots are limited." The gap between the stats section (30%) and the bottom CTA (90%) is still 60% of page depth without a conversion prompt.

---

## Section 3: Social Proof Placement and Credibility

**Score: 7.5 / 10** (up from 7.0 — content fixes improved credibility throughout)

### What improved

The content fix round made meaningful credibility improvements:

- Dr. Anca's title is now correctly "Chief Dental Officer" in the social proof quote — important because "Co-founder" is self-referential; CDO is a clinical credential
- About.tsx elevates Dr. Anca's credentials to 13px, `#F5F9EA`, fontWeight 600 — from near-invisible 12px muted
- ForDentists.tsx problem section now includes the 30% patient adherence stat and EUR 90B cost figure with real citations
- ForDentists.tsx CTA section includes the WHO EUR 1/EUR 8-50 prevention ROI stat
- Features.tsx progress tracking card now references the 60-70% disease progression reduction stat

### What remains unchanged

The home hero social proof micro-bar is still 13px, `#8C9C8C`, with no bold treatment on the numbers. The `30+` figure in the bar carries no visual emphasis. The bottom social proof quote ("The app I always wished I could prescribe to my patients") is still self-referential — Dr. Anca is the CDO quoting her own product. No third-party testimonial from a founding clinic has been added.

No patient testimonials appear anywhere on the site. The secondary acquisition persona (patients — the "Free" plan target) has zero social proof directed at their experience.

---

## Section 4: Trust Signals at Decision Points

**Score: 6.0 / 10** (up from 6.5 — Pricing transparency issue unchanged, GDPR copy unchanged)

Wait — re-scoring: the pricing meta description fix removed the inconsistency, but the visible page still shows "Coming soon" for clinic pricing. The trust score actually stagnates rather than improves.

| Decision point | Trust signals present | Change since original audit |
|---|---|---|
| Home hero (above fold) | EFP badge, Dr. Anca quote, micro-bar | CDO title added to attribution — minor improvement |
| /waitlist form — before submit | "No credit card" + "GDPR compliant" micro-copy (12px, #8C9C8C) | Unchanged. Still below WCAG contrast for 12px text |
| /pricing Clinic plan | "Founding Partner" badge, beta notice | Unchanged. "Coming soon" still prevents price anchoring |
| /contact form | Email addresses in left column | No trust signals added to form card |
| 404 page | None | Unchanged |

### Pricing transparency — still broken

The Pricing page headline still reads "Simple, transparent pricing." The Clinic plan still shows "Coming soon" with no number. The og:description fix (removing `from €39/mo`) actually makes this worse: the team clearly knows the price range is `€39–199/mo` (it was in the original meta), but has chosen not to show it on the page. Dentists making a business decision to join a waitlist need a price anchor.

The Pricing FAQ first question is "When will clinic pricing be available?" — this implicitly confirms there is no price to show, which contradicts the page headline's transparency claim. The call-out box under Plans correctly says "Founding clinics receive locked-in pricing" but locks in nothing, because the baseline is unknown.

---

## Section 5: Navigation / IA Logic

**Score: 5.5 / 10** (unchanged from 5.0 — no IA changes were made)

The nav structure is identical:
```
Features | For Dentists | Pricing | About | Blog | Contact | [Join Waitlist]
```

There is still no "For Patients" nav entry. The mobile drawer now correctly includes "Join the Waitlist" as a full-width button — that is the only change.

The ForDentists hero CTA still links to `/waitlist` with no `?role=dentist` query parameter. The Waitlist.tsx page still initialises with `"dentist"` as the default role with no URLSearchParams read. A dentist arriving from ForDentists at `/waitlist` does land on the correct role — but that's accidental alignment with the hardcoded default, not intentional routing. A patient arriving from the Home hero lands on the dentist tab first.

---

## Section 6: Scroll Depth Drop-off Predictions

**Score: unchanged** — the structural content and section order is identical to the original audit. The mobile padding improvements (fix-log-mobile.md) will reduce the excessive vertical whitespace on narrow screens, which may slightly reduce scroll depth drop-off on mobile. No new CTAs were placed to anchor users between sections.

---

## Section 7: Exit Intent

**Score: 4.5 / 10** (unchanged)

No changes were made to exit intent architecture:

- No exit intent modal added
- No mobile sticky CTA bar added
- Home page still ends with Dr. Anca blockquote (no button below it)
- Blog still ends with newsletter section (not a waitlist CTA)
- Pricing still ends with FAQ (no CTA below it)
- 404 still has only "Back to Home" with no waitlist mention

The mobile navbar fix is the closest thing to an exit intent improvement — the drawer now shows a CTA — but that requires intentional user action (opening the drawer) rather than catching passive abandonment.

---

## Section 8: 404 Page Quality

**Score: 5.5 / 10** (unchanged)

NotFound.tsx is identical to the original audit. It still has:
- No waitlist CTA
- No suggested pages (Features, For Dentists, Blog)
- No HeroGlow component (unlike every other secondary page)

The `minHeight: "100svh"` fix was applied (Fix 22 in fix-log-mobile.md), which is a mobile viewport improvement, but the conversion and UX quality issues are unchanged.

---

## Section 9: Form Submission Functionality

**Score: 1 / 10** (unchanged from original — no backend integration has been added)

This is still the only P0 finding in the codebase. The exact same dead-end code path from the original audit is present:

```tsx
// Waitlist.tsx line 36-43 — current production code
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const errs = validate(e.currentTarget);
  setErrors(errs);
  if (Object.keys(errs).length === 0) {
    setSubmitted(true);   // data is discarded here
  }
}
```

```tsx
// Contact.tsx line 34-41 — current production code
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const errs = validate(e.currentTarget);
  setErrors(errs);
  if (Object.keys(errs).length === 0) {
    setSent(true);        // data is discarded here
  }
}
```

Verification:
- No `fetch()` call in any page file
- No `import` of `loops`, `resend`, `formspree`, `mailchimp`, `convertkit`, or any email/CRM SDK
- `vercel.json` has no `functions` key — no serverless functions configured
- No `/api/` directory exists outside of node_modules
- Blog newsletter form has a handler now but explicitly comments `// No backend yet`

---

## New Issues Found in This Pass

### New Issue 1: Pricing FAQ JSON-LD inconsistency with visible page content

The `pricingFaqJsonLd` in Pricing.tsx contains this answer for "What is included in the Patient plan?":

```
"text": "The Patient plan includes ... secure messaging with your dentist, and access to the educational content library."
```

However, the visible `PLANS` array in the same file removed "Secure messaging with your dentist" from the Patient plan features list (fix-log-content.md item 7). The JSON-LD and the visible plan are now inconsistent — the structured data promises a feature the page does not show. This is a factual inaccuracy in machine-readable content that search engines will index.

### New Issue 2: Pricing FAQ JSON-LD mentions "progress tracking" as current feature in schema

The same FAQ JSON-LD answer mentions "progress tracking" as a current inclusion in the Patient plan. The visible plan now shows "Progress tracking (coming soon)" — again, the structured data is out of sync with the visible content after the content fixes. Two structured data fields describe the product as more complete than the page itself presents it.

### New Issue 3: Home page has two consecutive orphaned paragraphs in How It Works

```tsx
// Home.tsx lines 293-295
<p style={{ ... color: "#8C9C8C", ... }}>
  Perioskoup connects your dental appointment to your daily routine in three steps...
</p>
<p className="body-lg" style={{ maxWidth: 540, margin: "0 auto" }}>
  The Perioskoup workflow connects clinical precision with patient daily life in three fluid steps.
</p>
```

These two paragraphs in the How It Works section header are semantically redundant — both describe the same three-step workflow. The second one was meant to be removed as part of the duplicate paragraph fix (fix-log-content.md item 23), but that fix targeted the Features section header, not the How It Works header. This orphaned paragraph survived.

### New Issue 4: Waitlist FAQ JSON-LD promises a confirmation email that is never sent

```tsx
// Waitlist.tsx lines 49-51
{ "@type": "Answer", "text": "After joining, you'll receive a confirmation email. We onboard in batches..." }
```

Since the form submits no data and no email integration exists, no confirmation email is ever sent. The structured data makes a promise the site cannot keep. This is compounded if this FAQ text appears in search results (rich snippets), where users may read "you'll receive a confirmation email" before signing up and then not receive one.

### New Issue 5: Features.tsx description of "Dentist Dashboard" contains unbuilt claim

```tsx
// Features.tsx FEATURES array, "Dentist Dashboard" card
desc: "A dedicated portal for clinicians to view care plans, send patient programmes, and review upcoming appointment summaries across their practice."
```

The feature card does not have a "Coming Soon" or "In Development" badge, despite the Engagement Insights card and others being correctly badged. The "Dentist Dashboard" itself may not be a fully built feature given that the Engagement Insights card within it is marked "in development." The unqualified present-tense description of an unbuilt product feature without a status badge is inconsistent with the accuracy improvements applied elsewhere.

---

## Summary of Outstanding Defects by Priority

### P0 — Blocking all growth (still unaddressed)

1. **Form submission discards data.** Every waitlist and contact submission is silently lost. The business goal of the site is data capture. This has been the highest-priority finding since the original audit and remains entirely unfixed. The minimum viable fix is a Formspree endpoint change in the form action attribute — a 10-minute implementation requiring no code. The optimal fix is a Loops.so integration with a Vercel serverless function — approximately 2–4 hours.

2. **Blog newsletter discards data.** The Subscribe button now correctly functions as a button (improvement over original), but `// No backend yet — optimistically show success` confirms the email address is still lost.

### P1 — Conversion suppressors (unaddressed)

3. **Error color is lime green (#C0E57A).** All 7 error span styles in Waitlist.tsx and Contact.tsx use the brand's positive/CTA color for error messages. Estimated fix time: 5 minutes.

4. **Waitlist form uses sr-only labels.** No visible field labels above inputs. Users lose field context during entry. The Contact form pattern is correct and can be copied directly. Estimated fix time: 10 minutes.

5. **Default role on /waitlist is "dentist."** Most traffic from the home hero is non-dentist. Estimated fix time: 5 minutes (change default to patient) or 15 minutes (read URLSearchParams).

6. **No mobile sticky CTA bar.** Mobile users scrolling past the hero have no persistent conversion prompt except the drawer (which requires intent to open). Estimated fix time: 30 minutes.

7. **Clinic pricing shows no number.** "Simple, transparent pricing" headline with "Coming soon" for the primary dentist decision point. Estimated fix time: 5 minutes (add "from €39/mo" to PLANS array).

### P2 — Structural improvements (unaddressed)

8. **No mid-page CTA on Home between How It Works and Social Proof.** ~1200px dead zone with no conversion prompt. Estimated fix time: 20 minutes.

9. **ForDentists CTA links to /waitlist with no ?role=dentist.** Double re-identification step. Estimated fix time: 5 minutes.

10. **404 page has no waitlist CTA and no suggested pages.** Estimated fix time: 20 minutes.

### New P2 — Data accuracy issues (new findings in this pass)

11. **Pricing FAQ JSON-LD out of sync with visible content.** The FAQ structured data describes "secure messaging" as a current Patient plan feature, but the visible plan removed it. Also describes "progress tracking" as current when the visible plan marks it "coming soon." Estimated fix time: 10 minutes.

12. **Waitlist FAQ JSON-LD promises a confirmation email** that cannot be sent. Estimated fix time: remove the sentence or fix the backend integration.

13. **How It Works section has two redundant paragraphs.** Fix-log-content.md item 23 targeted the wrong section. Estimated fix time: 5 minutes (delete one paragraph).

---

## Score Summary by Section

| Section | Original | Re-audit | Change | Reason |
|---------|----------|----------|--------|--------|
| Form Friction | 4.5 | 4.0 | -0.5 | P0 unfixed; no visible labels; error color unchanged |
| CTA Visibility | 5.5 | 5.5 | 0 | Mobile navbar CTA fixed; mid-page gap unchanged |
| Social Proof | 7.0 | 7.5 | +0.5 | CDO title, stats citations, About.tsx credentials improved |
| Trust Signals | 6.5 | 6.0 | -0.5 | Pricing still broken; GDPR copy unchanged; new JSON-LD inconsistency |
| Nav / IA | 5.0 | 5.0 | 0 | No IA changes; mobile drawer improved but not enough to raise score |
| Exit Intent | 4.5 | 4.5 | 0 | No exit intent mechanisms added |
| 404 Quality | 5.5 | 5.5 | 0 | minHeight fix only; no CTA, no suggested pages |
| Form Submission | 1.0 | 1.0 | 0 | No backend integration added — P0 remains |

**Overall: 5.5 / 10**

---

## Minimum Viable Fixes — In Order of Impact

These are the fixes that should happen before any marketing spend, press outreach, or further audit cycles. Estimated total time: under 4 hours.

### Fix 1 — Connect Waitlist.tsx to Formspree (10 minutes)
Replace `handleSubmit` with a fetch POST to a Formspree endpoint. This is the shortest path to data capture:

```tsx
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const errs = validate(e.currentTarget);
  setErrors(errs);
  if (Object.keys(errs).length === 0) {
    setIsLoading(true);
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: new FormData(e.currentTarget),
      headers: { Accept: 'application/json' }
    });
    if (response.ok) {
      setSubmitted(true);
    } else {
      setSubmitError("Something went wrong. Please email hello@perioskoup.com.");
    }
    setIsLoading(false);
  }
}
```

Add loading state (disable submit button while fetching). Add error state (show message if fetch fails). This stops the data loss immediately.

### Fix 2 — Change error color to red (5 minutes)
Replace all `color: "#C0E57A"` in error span styles (7 occurrences across Waitlist.tsx and Contact.tsx) with `color: "#F87171"`. This is a search-and-replace operation.

### Fix 3 — Add "from €39/mo" to Pricing page (5 minutes)
In Pricing.tsx, change `PLANS[1].price` from `"Coming soon"` to `"From €39/mo"` and set `PLANS[1].period` to `"founding pricing"`. One line of data.

### Fix 4 — Change Waitlist.tsx default role to "patient" (5 minutes)
Change `useState<"patient" | "dentist">("dentist")` to `useState<"patient" | "dentist">("patient")`. Also add URLSearchParams read so ForDentists CTA can pre-select the dentist tab.

### Fix 5 — Add visible labels to Waitlist form fields (10 minutes)
Copy the label pattern from Contact.tsx (visible 12px, #8C9C8C, fontWeight 600, display: block, marginBottom: 6) and replace the `sr-only` labels in Waitlist.tsx with the same visible pattern.

### Fix 6 — Fix Pricing FAQ JSON-LD (10 minutes)
Remove "secure messaging with your dentist" from the Patient plan answer in `pricingFaqJsonLd`. Change "progress tracking" to "progress tracking (coming soon)".

### Fix 7 — Remove orphan paragraph from How It Works (5 minutes)
Delete the second paragraph starting "The Perioskoup workflow connects clinical precision..." from the How It Works section header in Home.tsx.

### Fix 8 — Connect Blog newsletter to Formspree or remove (10 minutes)
Either add a Formspree fetch to `handleNewsletterSubmit` or replace the newsletter section with a waitlist CTA block identical to the mid-blog waitlist CTA already on the page.

---

## Wireframe: Waitlist Form — Current vs Recommended

```
CURRENT (what exists):
┌──────────────────────────────────────────┐
│  [Early Access label]                    │
│  "Join the founding waitlist."           │
│  "Be among the first..."                 │
│                                          │
│  [Dentist / Clinic]  [Patient]    ← wrong default for most visitors
│                                          │
│  [placeholder: First name]  [placeholder: Last name]   ← no visible labels
│  [placeholder: Email address]
│  [placeholder: Clinic / Practice name]   ← dentist only
│  [placeholder: City, Country]            ← dentist only
│                                          │
│  [Join the Waitlist →]   (lime btn)
│                                          │
│  🔒 No credit card  🛡 GDPR compliant    ← 12px, #8C9C8C, below contrast
│                                          │
│  [30+ founding clinics]  [EFP Winner]    ← below form, after decision
└──────────────────────────────────────────┘

RECOMMENDED:
┌──────────────────────────────────────────┐
│  [Early Access label]                    │
│  "Join the founding waitlist."           │
│  "Be among the first..."                 │
│                                          │
│  ┌────────────────┐  ┌─────────────────┐ │
│  │ 30+ founding   │  │  EFP Award      │ │  ← MOVED UP, before form
│  │ clinics        │  │  Winner 2025    │ │
│  └────────────────┘  └─────────────────┘ │
│                                          │
│  [Patient]  [Dentist / Clinic]    ← Patient default for general traffic
│                                          │
│  First name          Last name     ← visible labels (12px, #8C9C8C)
│  [First name]        [Last name]
│                                          │
│  Email address
│  [Email address]
│                                          │
│  Clinic name  (dentist tab only)
│  [Clinic / Practice name]
│                                          │
│  [Join the Waitlist →]   (lime btn, disabled while loading)
│                                          │
│  🔒 No credit card · 🛡 GDPR · 🌍 EU servers  ← 14px, higher contrast
└──────────────────────────────────────────┘

Error states (all fields):
  Field label (visible, persistent)
  [input — red border on error]
  Error message in #F87171 (red, not lime)
```

---

## What Changed Since the Original Audit (Summary)

**Genuine improvements that affect conversion:**
- Mobile navbar CTA is now properly shown/hidden via Tailwind `hidden md:inline-flex` — eliminates the worst mobile conversion gap
- Mobile drawer includes a full-width "Join the Waitlist" button
- Dr. Anca's CDO title is now correct throughout — improves clinical credibility
- Features page correctly badges Beta / Coming Soon / In Development features — reduces unmet-expectation bounce
- Content accuracy improvements throughout reduce the risk of credibility damage from overpromising

**Items identified in original audit that were not addressed:**
- P0 form submission defect: 5 fixes identified, all unfixed
- P1 error color: identified, not fixed
- P1 visible labels on waitlist form: identified, not fixed
- P1 mobile sticky CTA: identified, not fixed
- P1 clinic pricing: identified, not fixed
- P2 mid-page CTA: identified, not fixed
- P2 URL param pre-selection: identified, not fixed
- P2 404 improvements: identified, not fixed
- P2 home micro-bar contrast: identified, not fixed

**New defects found in this pass (not in original audit):**
- Pricing FAQ JSON-LD out of sync with visible plan features after content fixes
- Waitlist FAQ JSON-LD promises a confirmation email that can never be sent
- How It Works section has two redundant paragraphs (fix-log-content.md item 23 targeted the wrong section)

---

*Source code reviewed: client/src/pages/ (10 files), client/src/components/Navbar.tsx, vercel.json. No live session data. Form submission defect confirmed by code inspection — no fetch/axios/SDK calls exist in any form handler. All defects verified against current branch (fix/final-launch-audit).*
