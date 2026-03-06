# Conversion UX Audit — Perioskoup Landing Page
**Auditor:** Conversion Rate Optimization Specialist  
**Date:** 2026-03-06  
**Site:** https://official-perioskoup.vercel.app  
**Primary goal:** Waitlist signups from dentists  
**Secondary goal:** Waitlist signups from patients

---

## Overall Score: 6.1 / 10

The site has strong visual craft, legitimate credibility signals, and a coherent brand. The conversion architecture, however, has five structural gaps that are suppressing signup rates. The most severe is that neither waitlist form submits data anywhere — both are purely client-side state flips with no backend call, no email capture, and no confirmation sent to the user. Everything below flows from that finding plus four others.

---

## Audit Summary by Section

### 1. Waitlist Form Friction

**Score: 4 / 10**

**What exists:**
- `/waitlist` page has a dual-role selector (Dentist / Patient) followed by conditional fields.
- Patient path: First name + Last name + Email = 3 fields.
- Dentist path: First name + Last name + Email + Clinic name + City/Country = 5 fields.
- Home page inline form (compact mode): Email only.
- Home page bottom CTA form (full mode): Name + Email + Role select = 3 fields.

**Critical bugs found:**

1. **No data is ever sent.** Both `handleSubmit` functions call `e.preventDefault()` and set `setSubmitted(true)`. There is no `fetch`, no `axios`, no form `action`, no third-party SDK call (Mailchimp, ConvertKit, Resend, Loops, etc.). Every signup is silently lost. This is a P0 bug.

2. **Blog newsletter form has no handler at all.** The Subscribe button on `/blog` fires nothing — no `onSubmit`, no `onClick`. The input is an uncontrolled element with no state binding.

3. **Contact form also discards data.** `handleSubmit` sets `setSent(true)` only. Same silent failure.

4. **No client-side validation feedback.** Fields use the native `required` attribute but there are no custom error messages, no inline validation on blur, no red border on invalid submission. HTML5 validation bubbles are unstyled and inconsistent across browsers.

5. **No loading state.** The submit button shows no spinner or disabled state between click and "success". On a real backend with latency this creates double-submit risk and user uncertainty.

6. **Success state lacks follow-through.** The post-submission state says "We'll reach out when your spot opens up" but gives no timeline, no email confirmation promise, no next step. For dentists making a business decision, this is insufficient closure.

**Field count assessment:**

| Form | Patient fields | Dentist fields | Verdict |
|------|---------------|----------------|---------|
| Home hero (compact) | 1 | 1 | Good — minimal friction |
| Home CTA (full) | 3 | 3 | Acceptable |
| /waitlist | 3 | 5 | Borderline — city/country field adds no immediate value |

The city/country field on the dentist path has no stated purpose visible to the user. If it is for geographic prioritization during rollout, say so inline: "Helps us plan our EU rollout." Otherwise remove it.

**Labels:** The waitlist page uses placeholder text only — no persistent labels. Once a user starts typing, the placeholder disappears and the field loses context. The contact form correctly uses visible labels above each field. The waitlist form should match.

---

### 2. CTA Visibility at Every Scroll Depth

**Score: 6 / 10**

**Home page CTA audit by scroll depth:**

| Depth | CTA present | Type | Quality |
|-------|-------------|------|---------|
| 0% (hero, above fold) | Yes | "Join the Waitlist" (btn-primary) + "For Clinicians" (btn-ghost) | Good — high contrast lime button |
| ~15% (ticker) | No | — | Dead zone — ticker is a missed opportunity |
| ~25% (EFP Award section) | No | External link to EFP only | Trust content ends with no conversion action |
| ~40% (Features bento) | Partial | "See all features" ghost link | Ghost link leads to Features page, not waitlist |
| ~55% (How It Works) | No | — | Longest content gap — no CTA for 2+ screens |
| ~70% (Team section) | No | — | High-trust moment with no conversion prompt |
| ~85% (CTA section) | Yes | Full inline WaitlistForm | Best placement — correctly positioned after trust content |
| ~92% (Social proof quote) | No | — | Last thing most users see before footer is a quote with no button |
| ~100% (Footer) | Yes | "Join Waitlist" footer link | Correct but footer links are low-visibility |

**Critical gap:** The stretch from Features (40%) through How It Works (55%) through Team (70%) is approximately 900-1200px of scroll with no primary CTA. Users who are building conviction through this content have no conversion opportunity at the moment of peak interest.

**Navbar CTA:** "Join Waitlist" is in the fixed navbar on desktop — good. On mobile the navbar CTA is hidden (`hide-mobile`) and only the hamburger appears. Mobile users only see a waitlist CTA if they open the drawer. This needs fixing.

**ForDentists page:** Better structure. Hero CTA leads to waitlist immediately. Stats section has no CTA, then Clinical Tools section has no CTA, then the bottom section has dual CTAs. The gap between the stats section and the bottom CTA is significant.

---

### 3. Social Proof Placement and Credibility

**Score: 7 / 10**

**What works:**
- EFP Award badge in the hero is the right instinct — it validates the product before the user reads a word.
- The EFP Award card section (full image + jury names + EFP quote) is credible and specific. Naming the professors (Deschner, Herrera, Stavropoulos) adds authority.
- Dr. Anca's founder quote as a blockquote in the hero section is well placed and specific — it explains the "why" in clinical language that dentists will recognize.
- Team section with real photos and credentials is strong.
- Footer repeats the EFP badge — good exit-point reinforcement.

**What is missing or misplaced:**

1. **"30+ founding clinics" and "500+ on the waitlist"** appear only on the `/waitlist` page, below the form. These are your most persuasive social proof numbers and they are hidden behind the conversion action. Move at least the "30+ clinics" stat to the home hero section, immediately below the CTA buttons.

2. **The home page bottom social proof section** ("The app I always wished I could prescribe") uses Dr. Anca's photo — but she is a co-founder quoting her own product. Visitors who have already read the team section will notice this. If third-party testimonials from other periodontists in the 30-clinic cohort are available, even one replaces this with genuine external validation.

3. **No patient testimonials exist anywhere.** The patient persona has no social proof directed at them. Even a single sentence from a beta user is worth more than all the feature descriptions.

4. **Stats have no sources.** "85% Treatment Acceptance", "40% Fewer No-Shows", "3x Higher Engagement" appear on both Home and ForDentists pages with no attribution. Dentists specifically will want to know if these numbers are Perioskoup's own beta data or published literature. Add "(Perioskoup beta data, 2025)" or the actual source.

5. **"Trusted by Periodontists"** in the ticker has no support on the page for a visitor's first visit. Either back it with a number ("Trusted by 30+ periodontists across Europe") or replace it with something provable.

---

### 4. Trust Signals at Decision Points

**Score: 6.5 / 10**

**Decision points mapped:**

| Decision point | Trust signals present | Gap |
|---|---|---|
| Above fold (home hero) | EFP badge, Dr. Anca quote | No data source or clinic count |
| Waitlist form (home CTA section) | "No spam. Unsubscribe anytime. GDPR compliant." | No EU data storage mention at the point of email entry |
| /waitlist form | "No credit card" + "GDPR compliant" micro-copy | No mention of who else has joined |
| /pricing page | Beta notice, founding partner badge | Clinic price is "Coming soon" — no anchor or range given |
| /for-dentists hero | EFP implicit in brand, stats section | No mention of GDPR/data security until FAQ |
| Contact form | No trust signals visible | User sending sensitive clinic info with no security note |

**GDPR signal placement:** The GDPR compliant micro-copy under the waitlist form CTA is correct but rendered at 12px in muted sage (#8C9C8C). At this size and contrast it likely fails 4.5:1 WCAG AA on the card background. More importantly, for a health data product serving EU clinics, GDPR compliance should be a headline feature, not a 12px footnote.

**Pricing ambiguity as a trust killer:** The clinic plan shows "Coming soon" with no price range. Dentists looking at this page need to know if Perioskoup is budget territory or enterprise territory before they invest time in a waitlist. The CLAUDE.md confirms a €39-199/mo range exists. Even showing "from €39/mo" or "Starting under €200/mo" sets expectations and removes a "hidden cost" anxiety.

---

### 5. Navigation / IA Logic for Dentist vs Patient Personas

**Score: 5 / 10**

**Current navbar structure:**
Features | For Dentists | About | Blog | [Join Waitlist]

**Problems:**

1. **No "For Patients" nav link.** The nav addresses dentists explicitly ("For Dentists") but patients — a distinct and meaningful conversion goal — have no dedicated nav entry. A patient landing on the home page sees "For Dentists" and may conclude this is a B2B product.

2. **Persona divergence happens too late.** Home hero has a "Join the Waitlist" primary CTA and "For Clinicians" ghost CTA. These are the right personas. But after clicking "For Clinicians", the user goes to ForDentists, and the second CTA there sends them back to `/waitlist` where they must re-identify their role. The ForDentists page should link directly to `/waitlist?role=dentist` (or an anchor that pre-selects the dentist tab).

3. **Pricing page persona confusion.** The plans are "Patient" and "Clinic" but the hero says "Simple, transparent pricing" — which is untrue for Clinic (price is not shown). A dentist visiting this page looking for pricing evidence leaves with no useful information, only another CTA to join the waitlist.

4. **Blog has no persona filtering.** Articles are tagged with categories but there is no "For Dentists" / "For Patients" tab on the blog index. A periodontist wanting clinical insight sees the same list as a patient.

5. **"Pricing" in the navbar creates a broken promise.** Clicking Pricing leads to a page that does not show pricing. This erodes trust. Either rename the nav item ("Plans") or populate the page with at least indicative pricing.

---

### 6. Scroll Depth Drop-off Predictions

**Home page predicted drop-off:**

```
0%   → 100% (hero load)
15%  → ~72% (ticker adds no value — first passive scroll)
25%  → ~58% (EFP Award section — high trust, but no action to take)
40%  → ~44% (Features bento — technically interested users continue)
55%  → ~32% (How It Works — significant drop, no CTA anchors)
70%  → ~24% (Team section — only motivated users reach here)
85%  → ~19% (CTA / Waitlist form — only 1 in 5 see the actual form)
95%  → ~15% (Social proof quote at bottom)
100% → ~12% (Footer)
```

This means the primary inline waitlist form is seen by fewer than 20% of visitors. The hero "Join the Waitlist" button (which navigates to `/waitlist`) is the main conversion driver. The friction of a page navigation before reaching the form adds one extra step that depresses conversion.

**Implication:** The hero should contain a functional, minimal inline form (email + role, 2 fields) that submits directly — matching what high-converting SaaS waitlists do (e.g., Loom, Linear, Superhuman). The `/waitlist` page would become the extended form for users who want to provide more detail.

---

### 7. Exit Intent

**Score: 5 / 10**

**Last thing users see before leaving:**

- **Home page:** Dr. Anca's blockquote with no button below it, then footer navigation. A user who scrolled all the way but did not convert exits looking at a quote.
- **ForDentists page:** The bottom CTA section does end with two buttons — good. But it's bordered by a dark background with no visual urgency signal.
- **Features page:** Bottom CTA section has a single "Get Early Access" button. No social proof at exit.
- **Blog page:** Newsletter email capture — the weakest possible exit conversion for a dentist. Should be a waitlist CTA, not a newsletter.
- **Pricing page:** Footer. No sticky or exit CTA.
- **404 page:** "Back to Home" button only. No waitlist CTA on the 404.

**No exit intent overlay exists.** For a pre-launch product with no organic traffic flywheel yet, an exit intent modal (triggered on desktop mouse-leave) showing "Before you go — join 500+ people waiting for Perioskoup" with a single email field would recover a portion of abandoned sessions. This is a standard pattern for pre-launch signup pages.

**No sticky bottom bar on mobile.** Mobile users who scroll without converting have no persistent CTA visible. A fixed bottom bar ("Join the waitlist — free") visible below the fold on mobile would materially increase conversion rates.

---

### 8. 404 Page Quality

**Score: 6 / 10**

**What exists:** Clean branded 404 with large semi-opaque "404" in lime, clear headline, explanatory copy, and a single "Back to Home" button.

**What is missing:**

1. **No waitlist CTA.** A visitor hitting 404 is not lost — they found your brand. Give them a reason to stay: "While you're here, we're building something for dental care. Join the waitlist."

2. **No nav link suggestions.** No suggested pages (Features, For Dentists, Blog) to route users toward useful content.

3. **No search or help link.** For a content-rich site with a blog, a search suggestion or link to the blog index recovers value.

4. **HeroGlow is not applied.** The 404 page imports `ParallaxHeroBg` but not `HeroGlow` — minor visual inconsistency with all other secondary pages.

---

### 9. Form Submission Functionality

**Score: 1 / 10**

This is the most critical finding in the audit.

**Every form on the site discards data silently.**

```tsx
// Home.tsx — WaitlistForm handleSubmit (line 76-79)
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;
  setSubmitted(true);        // ← No fetch, no API call
};

// Waitlist.tsx — handleSubmit (line 30-33)
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSubmitted(true);        // ← No fetch, no API call, no data read from DOM
}

// Contact.tsx — handleSubmit (line 28-31)
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSent(true);             // ← No fetch, no API call
}
```

The blog newsletter input is entirely uncontrolled with no handler attached to the Subscribe button.

**Impact:** Every person who has submitted the waitlist form since launch has received a success confirmation but their data has not been stored. The "500+ on the waitlist" and "30+ founding clinics" stats visible on the /waitlist page cannot be accurate if the form has never sent data anywhere.

**Required fix (minimum viable):** Integrate one of the following before any traffic is sent to this site:
- Mailchimp embedded form / Mailchimp API
- Loops.so (recommended for SaaS waitlists)
- Resend + a simple Vercel serverless function
- Typeform/Tally redirect as a stopgap

---

## Top 5 Blockers by Conversion Impact

### Blocker 1 — Forms don't submit data (Impact: Critical / Effort: Medium)
Every signup is silently lost. Fix before any marketing spend. Minimum: connect to Loops or Mailchimp API via a Vercel serverless function. Pass email + role fields. Add loading state and a real confirmation email.

### Blocker 2 — Primary conversion form is below 80% scroll depth (Impact: High / Effort: Low)
The inline home hero should have a 2-field form (email + role dropdown) that submits without navigation. The current hero CTAs navigate to `/waitlist`, adding a page load and re-decision moment. Reduce steps to zero.

### Blocker 3 — No mobile sticky CTA (Impact: High / Effort: Low)
Mobile users have no persistent conversion prompt. Add a fixed bottom bar on mobile: `position: fixed; bottom: 0; width: 100%; z-index: 49;` containing a lime "Join Waitlist" button. Dismiss on tap outside or after signup.

### Blocker 4 — Clinic pricing completely hidden (Impact: High / Effort: Low)
Dentists need a price signal before committing to a waitlist. Show "from €39/mo" on the Pricing page and on the ForDentists page hero. The business case for founding pricing ("lock this in forever") only works if users know what they're locking in.

### Blocker 5 — Stats lack attribution (Impact: Medium / Effort: Low)
"85% Treatment Acceptance" and "40% Fewer No-Shows" will be challenged by skeptical periodontists. Add source attribution inline or via a tooltip. Even "(Perioskoup beta, 2025, n=12 clinics)" is better than no attribution.

---

## Quick Wins (Under 30 Minutes Each)

1. **Add a Loops.so or Mailchimp signup API call** to both handleSubmit functions. 15 lines of code. P0 priority.

2. **Move the "30+ founding clinics" stat** to the home hero section, below the CTA buttons. Copy-paste from `/waitlist` social proof bar.

3. **Add a waitlist CTA to the 404 page.** One paragraph + one Link component.

4. **Add source labels to stats.** Append `(beta data, 2025)` to each metric.

5. **Remove or explain the city/country field** on the dentist waitlist path. It adds friction without visible benefit.

6. **Add visible labels above inputs** on the waitlist form (matching the contact form). Placeholders disappear on focus.

7. **Add "from €39/mo" to the Pricing page Clinic plan.** One string change.

8. **Rename nav "Pricing" to "Plans"** if pricing will remain hidden to avoid the broken-promise effect.

---

## Structural Rewrites

### Hero CTA Block Rewrite

**Current:**
```
[Join the Waitlist →]   [For Clinicians]
```
followed by stats, then phone mockup.

**Suggested wireframe:**
```
┌─────────────────────────────────────────┐
│  EFP Award badge                        │
│                                         │
│  "Between visits,                       │
│   we take over."                        │
│                                         │
│  Dr. Anca quote (blockquote)            │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  [email input]  [I am a... v]   │    │
│  │  [Join Waitlist — Free        ] │    │
│  │  Lock in founding pricing       │    │
│  └─────────────────────────────────┘    │
│                                         │
│  30+ clinics · 500+ waitlist · EFP '25  │
│                                         │
│  [For Clinicians — see features]        │
└─────────────────────────────────────────┘
```

The inline form removes a navigation step. The trust bar below the form uses the social proof currently only visible on `/waitlist`. The "For Clinicians" secondary CTA drops in hierarchy below the form.

### Mid-Page CTA Block (Between How It Works and Team)

Insert a compact conversion moment between sections 3 and 4 of the home page:

```
┌─────────────────────────────────────────┐
│  [lime accent bar — 1px horizontal]     │
│                                         │
│  "Join 500+ people building the         │
│   future of periodontal care."          │
│                                         │
│  [Join the Waitlist →]                  │
└─────────────────────────────────────────┘
```

This is a brief interrupt — one line of social proof, one button — that catches the ~55% of users who have scrolled past the hero CTA but not yet reached the bottom form.

### Waitlist Page Success State Rewrite

**Current:**
```
"You're on the list!"
"We'll reach out when your spot opens up."
[Back to Home]
```

**Suggested:**
```
"You're in."
"Spot #[number] reserved for [clinic name]."                (for dentists)
"We'll email you at [email] as soon as we're ready."
"In the meantime, explore what Perioskoup does for your practice:"
[See Features →]  [Read the Blog →]
```

This gives dentists a confirmation of identity (their clinic name echoed back), sets an email expectation, and keeps them engaged rather than bouncing.

---

## 3 CTA Variants to A/B Test

**Variant A (current):** "Join the Waitlist" + arrow icon

**Variant B (specificity):** "Reserve My Founding Clinic Spot" (dentist path) / "Get Free Early Access" (patient path)

**Variant C (urgency):** "Join 30+ Founding Clinics — Limited Spots" with a count below: "17 spots remaining" (use a static number that reduces week over week)

Test B vs A first. Role-specific language consistently outperforms generic waitlist CTAs in B2B health SaaS.

---

## A/B Test Priority Matrix

| Test | Hypothesis | Effort | Expected lift |
|------|------------|--------|---------------|
| Inline hero form vs link-to-page | Reducing steps increases signups | Medium | +25-40% |
| Variant B CTA copy | Role-specific CTAs outperform generic | Low | +15-25% |
| Price range on Pricing page | Transparent pricing reduces dentist bounce | Low | +10-20% |
| Mid-page CTA insert | Catching scroll-through users | Low | +8-15% |
| Stats with source attribution | Credibility reduces objection | Low | +5-10% |

---

## Page-by-Page Verdict

| Page | Score | Primary issue |
|------|-------|---------------|
| Home | 6/10 | Form doesn't submit; mid-page CTA gap; social proof buried |
| /waitlist | 5/10 | Form doesn't submit; city/country field friction; no labels |
| /for-dentists | 7/10 | Best-structured page; stats lack attribution; no mobile sticky CTA |
| /features | 6/10 | Good feature coverage; exit CTA weak; no social proof |
| /pricing | 5/10 | "Coming soon" destroys trust for dentists; nav link is a broken promise |
| /about | 7/10 | Strong story; no conversion CTA in hero; team quotes are founder-only |
| /blog | 6/10 | Newsletter exit instead of waitlist; no persona filtering |
| /contact | 6/10 | Form silent failure; no trust signals on form |
| 404 | 5/10 | On-brand but missed conversion opportunity |

---

## Implementation Priority

**This week (P0):**
1. Fix form submission — connect to Loops or Mailchimp API
2. Add loading + error states to all forms
3. Add confirmation email trigger on signup

**This week (P1):**
4. Move "30+ founding clinics" social proof to home hero
5. Add mobile sticky bottom CTA bar
6. Add source labels to stats

**Next sprint (P2):**
7. Inline form in hero (replace navigation CTA)
8. Mid-page CTA between How It Works and Team
9. Add "from €39/mo" to Pricing page
10. Waitlist page pre-selects role from URL param (`?role=dentist`)
11. ForDentists CTA links to `/waitlist?role=dentist`
12. 404 page adds waitlist CTA

**Next month (P3):**
13. Exit intent modal on desktop
14. Blog persona filtering tabs
15. Third-party testimonial from a clinic in the 30-clinic cohort
16. A/B test CTA variants

---

*Audit generated from full source code review of client/src/pages/ and client/src/components/. No live traffic data was available. Scroll depth percentages are predictive estimates based on content density and conversion research benchmarks.*
