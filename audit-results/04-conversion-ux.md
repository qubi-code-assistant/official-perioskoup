# Conversion UX Audit — Perioskoup Landing Page

**Auditor:** Conversion Rate Optimization Specialist  
**Date:** 2026-03-06  
**Site:** https://official-perioskoup.vercel.app  
**Codebase reviewed:** client/src/pages/ + client/src/components/ (full source)  
**Primary goal:** Waitlist signups from dentists  
**Secondary goal:** Waitlist signups from patients

---

## Overall Score: 6.0 / 10

The site has strong visual craft, real credibility (EFP Award, Dr. Anca), and a coherent brand voice. The conversion architecture has five structural defects that are actively suppressing signups. The most severe: every form on the site silently discards submitted data — there is no backend call anywhere. Everything else flows from that finding plus four further gaps in CTA coverage, friction, trust signal placement, and IA logic.

---

## Section 1: Waitlist Form Friction

**Score: 4.5 / 10**

### Architecture of the forms

There are exactly three form surfaces on the site:

| Surface | Location | Fields (patient) | Fields (dentist) |
|---------|----------|-----------------|-----------------|
| Main waitlist form | /waitlist | First name, Last name, Email = 3 | First name, Last name, Email, Clinic name, City/Country = 5 |
| Contact form | /contact | First name, Last name, Email, Role (select), Message = 5 | Same |
| Newsletter input | /blog (bottom) | Email only | Email only |

The Home page has NO inline form. It has two navigation CTAs — "Join the Waitlist" (link to /waitlist) and "For Clinicians" (link to /for-dentists). This is an important finding: a visitor who clicks "Join the Waitlist" from the hero must navigate to a new page before they can submit anything. This navigation step is the single largest friction point in the funnel.

### Critical defect: Forms do not submit data

All three form surfaces call `e.preventDefault()` and flip a local `submitted` / `sent` state variable. No `fetch()`, no third-party SDK, no form `action` attribute exists anywhere in the codebase. The server (`server/index.ts`) is a static file server with no API routes. `vercel.json` contains no serverless function configuration.

**Every person who has signed up since launch has received a success UI state but their data has gone nowhere.**

```tsx
// Waitlist.tsx — handleSubmit (exact code)
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const errs = validate(e.currentTarget);
  setErrors(errs);
  if (Object.keys(errs).length === 0) {
    setSubmitted(true);   // no fetch, no API call
  }
}

// Contact.tsx — handleSubmit (exact code)
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const errs = validate(e.currentTarget);
  setErrors(errs);
  if (Object.keys(errs).length === 0) {
    setSent(true);        // no fetch, no API call
  }
}
```

The blog newsletter input (`id="newsletter-email"`) has a Subscribe button with `aria-label="Subscribe to newsletter"` and no `onClick`, no `onSubmit` on a parent form, no handler at all. It is a purely decorative input.

### Field count assessment

**Patient path (3 fields):** First name + Last name + Email. Acceptable. The split first/last name grid is marginally worse than a single "Full name" field — it adds visual complexity but the field count is correct.

**Dentist path (5 fields):** The addition of Clinic name (required) and City/Country (optional) is where friction increases. The City/Country field has placeholder copy "City, Country (helps us plan our EU rollout)" — this is a good micro-copy fix that explains the ask, but the field is still optional and visible, which makes the form feel heavier. For a waitlist (not an application), 4 fields is the maximum before conversion drops materially.

**Recommendation:** Collapse City/Country out of the visible form and make it an optional post-signup survey question. Reduce dentist path to 4 required fields.

### Label patterns

The waitlist form uses `sr-only` labels with placeholder text as the visible label. Once a user starts typing, the field context disappears. The contact form correctly uses persistent visible labels above each field (12px, #8C9C8C). The waitlist form should follow the same pattern — this is a 10-minute fix and a significant UX improvement for returning visitors who pause mid-form.

### Error state quality

Inline validation exists and is architecturally sound: `aria-invalid`, `aria-describedby`, `role="alert"` on error spans. However, error messages render in `#C0E57A` (lime green) on a `#1D3449` (surface) background. Lime green is the brand's positive/CTA color. Using it for errors creates a semantic conflict — users associate lime with "good" throughout the site. Error states should use a distinct red or amber (#FF6B6B is accessible on the dark background at 5.8:1 contrast).

### Success state quality

The post-submission success state shows:
- A checkmark icon in a lime circle
- "You're on the list!" headline
- "We'll reach out as soon as we're ready to onboard [your clinic / you]. Thank you for believing in what we're building."
- A single "Back to Home" ghost link

For a patient this is adequate. For a dentist making a business decision to invest clinic time in an onboarding process, this is insufficient. There is no: clinic name echoed back, position number, email confirmation promise, or next step. The success state needs to feel like a confirmation, not a thank-you note.

---

## Section 2: CTA Visibility at Every Scroll Depth

**Score: 5.5 / 10**

### Home page — CTA audit by scroll depth

| Depth (approx) | CTA present | Type | Quality |
|----------------|-------------|------|---------|
| 0–10% (hero, above fold) | Yes | "Join the Waitlist" btn-primary + "For Clinicians" btn-ghost | Good. Lime button is high contrast. |
| 10–15% (ticker) | No | — | Missed: a non-interactive aria-hidden ticker |
| 15–30% (EFP Award card) | No | External EFP link only | Trust section ends with no conversion action |
| 30–45% (Features bento) | Weak | "See all features" ghost link | Routes to /features, not /waitlist. Lower intent. |
| 45–60% (AI Companion definition) | No | — | Pure content, no CTA |
| 60–75% (How It Works) | No | — | Longest dead zone: ~1000–1400px with zero CTAs |
| 75–85% (Social proof quote) | No | — | High-trust Dr. Anca quote with no button below it |
| 85–100% (Footer) | Yes (low priority) | Footer "Join Waitlist" link | Correct but footer link is low-visibility text |

**The critical dead zone spans from ~30% to ~85% scroll depth — roughly 1200px of content — with no primary CTA.** Users building conviction through the EFP card, feature bento, definition section, how-it-works, and social proof quote have no conversion prompt at any of these moments of peak interest.

The fixed navbar contains "Join Waitlist" on desktop — this is the effective rescue mechanism for the dead zone. But:

**Mobile navbar CTA is hidden.** The navbar `btn-primary` has class `hide-mobile` which applies `display: none !important` at ≤768px. Mobile visitors see only the hamburger. The waitlist CTA is only accessible after opening the drawer. On mobile, where scroll depth drop-offs are steeper, users have no persistent CTA visible at any scroll depth except the hero.

### ForDentists page — CTA audit

| Depth | CTA present | Type | Quality |
|-------|-------------|------|---------|
| 0–10% (hero) | Yes | "Join as a Founding Clinic" btn-primary + "See All Features" btn-ghost | Good — role-specific CTA label |
| 10–25% (problem section) | No | — | |
| 25–40% (stats) | No | — | High-conviction stats with no conversion follow |
| 40–65% (clinical tools) | No | — | Feature detail section, no mid-page CTA |
| 65–80% (workflow) | No | — | |
| 80–90% (positioning) | Partial | Inline callout "Founding clinic spots are limited" | Good callout but no button attached to it |
| 90–100% (bottom CTA) | Yes | "Apply as a Founding Clinic" + "Talk to the Team" | Correct. Role-specific. Well placed. |

The ForDentists page is better structured than the home page. But the gap between the stats section (25%) and the bottom CTA (90%) is still ~65% of page depth with no conversion action.

### Waitlist page — CTA audit

The /waitlist page is a conversion page — the form IS the CTA. The structure is correct: role selector first, then fields, then submit, then social proof below. This is the right information architecture for a conversion page.

### Features page

Good hero CTA ("Join the Waitlist" btn-primary + "For Dentists" btn-ghost). Feature grid has no CTAs between cards (correct — don't interrupt scanning). Bottom CTA section has a single "Join the Waitlist" link. Adequate.

### Blog page

The blog has a dedicated "Waitlist CTA" block between featured posts and the all-articles list — this is good placement. However, the page ends with a newsletter email capture (not a waitlist CTA). The last conversion surface on a high-intent content page is a newsletter, not the primary goal.

---

## Section 3: Social Proof Placement and Credibility

**Score: 7 / 10**

### What works

- **EFP Award badge in the hero** — the right instinct. The lime pill badge is visually strong and appears before the user reads the headline. Linking to the actual EFP press release adds verifiability.
- **EFP Award card section** — the full section with ceremony photo, jury names (Deschner, Herrera, Stavropoulos), and the official EFP quote is the strongest trust asset on the site. This is specific, verifiable, and authoritative.
- **Dr. Anca quote in the hero** — the blockquote is specific, in clinical language, and explains the problem-origin. Periodontists reading this will recognize the framing.
- **Stats have academic citations** — the 80% forgotten instructions (Kessels 2003, BMJ), 87% mHealth outcomes (Toniazzo 2019, JCP), and 62% periodontitis prevalence (Bernabe 2020, JCP) all link to real DOIs. This is excellent and differentiates the site from vague health-tech marketing.
- **Team photos and credentials** — real photos, real LinkedIn profiles, specific credentials (DMD, PhD).

### What is missing or misplaced

**"30+ founding clinics" social proof is buried.** This is your most persuasive live social proof number and it appears only in two places: the waitlist page (below the form, after the decision) and the ForDentists page hero. It does not appear on the Home page hero, which is where it would have maximum impact. Move it to the home hero social proof micro-bar (currently "30+ founding clinics · EFP Award Winner 2025 · Free for patients" — it is actually there in the source at line 152-154 of Home.tsx). Wait — checking again:

```tsx
// Home.tsx line 152-154
<p className="reveal" style={{ fontFamily: "Gabarito, sans-serif", fontSize: 13, color: "#8C9C8C", marginBottom: 32, ... }}>
  30+ founding clinics · EFP Award Winner 2025 · Free for patients
</p>
```

This text does exist. However it renders at 13px in #8C9C8C (muted sage) immediately after the CTA buttons. At this size and color on #0A171E it likely fails 4.5:1 WCAG contrast. More importantly, the visual hierarchy does not treat it as social proof — it reads as a footnote. It needs to be elevated: larger text, the "30+" in lime (#C0E57A), and grouped with a small clinic-count icon.

**The bottom social proof quote is founder self-referential.** "The app I always wished I could prescribe to my patients." — Dr. Anca Constantin, Co-founder. A visitor who has already read the team section (if they scrolled that far) knows she is quoting her own product. One testimonial from any of the 30 founding clinic partners would replace this with genuine external validation.

**No patient testimonials exist.** The entire site speaks to dental professionals or from the founder's clinical perspective. A patient (the free, secondary acquisition target) has no social proof directed at them on any page. Even one sentence from a beta user ("For the first time I understood what my dentist was telling me") converts patient skeptics.

**Pricing page has "30+ founding clinics" in the hero** — good. But the Clinic plan shows "Coming soon" with no price range visible to the user despite the og:description and Twitter meta containing "from €39/mo". The meta content and the visible page content are inconsistent.

---

## Section 4: Trust Signals at Decision Points

**Score: 6.5 / 10**

Decision points are moments where a user is deciding whether to give personal information or take an action. Trust signals need to be present at these specific moments, not elsewhere on the page.

| Decision point | Trust signals present | Gap |
|---|---|---|
| Home hero (above fold) | EFP badge, Dr. Anca quote | "30+ clinics" micro-bar is present but low-visibility |
| /waitlist form — before submit | "No credit card" + "GDPR compliant" micro-copy (12px, #8C9C8C) | Too small. No EU data storage mention. No email confirmation promise. |
| /waitlist role selector | None specific to role | Dentists selecting their role see no "founding pricing" reminder inline |
| /for-dentists hero | EFP badge, 30+ clinic count | No GDPR/data security signal visible until FAQ |
| /pricing Clinic plan | "Founding Partner" badge, beta notice | No price shown. Breaks the promise of the headline "Simple, transparent pricing." |
| /contact form | Email addresses shown in left column | No trust signals on the form card itself. Someone submitting clinic enquiry data sees no security note. |
| 404 page | None | No trust signals on error page |

### GDPR signal treatment

The GDPR micro-copy under the waitlist form CTA is correctly placed but rendered at 12px in #8C9C8C. On the card background (#1D3449 at ~0.06 opacity over #0A171E), this likely fails WCAG 4.5:1 minimum contrast for small text. For a health data product targeting EU dental clinics, GDPR compliance is a headline differentiator and should be treated as one — not as a fine-print footnote.

**Fix:** Upgrade the GDPR line to 13px with a small shield icon in #C0E57A and add "EU servers · end-to-end encrypted" as a second micro-trust line.

### Pricing transparency as trust killer

The Clinic plan shows "Coming soon" as the price. The og:description and Twitter card meta for the pricing page already contains "from €39/mo" — meaning the price range exists internally and was considered publishable enough for social sharing. But a dentist who navigates to the Pricing page and sees no number has no price anchor. They cannot make a business case internally, cannot compare with alternatives, and cannot trust the "Simple, transparent pricing" headline.

**Fix:** Show "from €39/mo" on the Clinic plan card, with "Founding partner pricing locked for life" as the sub-label. This is a single line of content with high conversion impact.

---

## Section 5: Navigation / IA Logic for Dentist vs Patient Personas

**Score: 5 / 10**

### Current nav structure

```
Features | For Dentists | Pricing | About | Blog | Contact | [Join Waitlist]
```

### Persona analysis

**Dentist path:** Clean. "For Dentists" is in the nav. Clicking it leads to /for-dentists which has a persona-specific hero, stats, clinical tools, workflow, and a bottom CTA that correctly names the role ("Apply as a Founding Clinic"). The ForDentists hero CTA links to /waitlist, which pre-selects nothing — the user arrives at the neutral dual-role selector and must re-identify themselves.

**Patient path:** Invisible. The nav has no "For Patients" entry. A patient landing on the home page sees "For Dentists" and may conclude this is a B2B product. The hero subhead mentions "free AI dental companion app" which helps, but there is no dedicated navigation entry for the patient persona.

**Waitlist page role selector:** The default role on page load is "dentist" (line 34 of Waitlist.tsx: `const [role, setRole] = useState<"patient" | "dentist">("dentist")`). A patient who arrives at /waitlist from the home hero CTA sees the Dentist/Clinic tab selected by default. This is inverted — the home page is more patient-facing, and the most common visitor from the hero will likely be a patient. The default should be patient on the home flow and dentist only if arriving from /for-dentists.

**URL parameter pre-selection missing.** The ForDentists page links to `/waitlist` with no query parameter. A simple `?role=dentist` parameter that pre-selects the dentist tab would eliminate the re-identification step entirely.

**Pricing page persona confusion.** The headline says "Simple, transparent pricing" but the Clinic plan shows no price. The page works for patients (Free plan is complete) but actively fails dentists (the plan most relevant to them is a placeholder). A dentist arriving from the nav item "Pricing" leaves with less trust than before they clicked.

**"Pricing" nav label is a broken promise.** The item labeled "Pricing" leads to a page where one of two plans shows "Coming soon" with no number. Either:
1. Show at least a price range ("from €39/mo") and the nav item is fine.
2. Keep the plan hidden and rename the nav item to "Plans" to set correct expectations.

**Blog has no persona filtering.** Articles are tagged with categories (Patient Education, Clinical Insight, Technology, Founder Story) but the blog index shows a flat list with no tabs or filters. A periodontist wants clinical content. A patient wants the education articles. Neither can quickly find what's relevant.

---

## Section 6: Scroll Depth Drop-off Predictions

Based on content density, section lengths, and CTA placement against published conversion research benchmarks:

### Home page

```
0%    → 100%  (hero viewport — all visitors)
12%   → ~72%  (ticker/EFP award — passive scroll continues)
25%   → ~55%  (EFP card — trust builders engaged, action-seekers bouncing)
40%   → ~42%  (Features bento — no CTA catches leavers)
55%   → ~31%  (AI companion definition — drop intensifies)
65%   → ~24%  (How It Works — significant drop, no anchor)
75%   → ~18%  (Social proof quote — only motivated users)
85%   → ~14%  (Footer zone)
100%  → ~11%  (Footer)
```

Implication: fewer than 1 in 5 home page visitors see the bottom social proof section. The hero CTA is doing almost all conversion work. Any form placed below 60% scroll depth will be seen by fewer than 25% of visitors.

### ForDentists page (higher intent audience)

```
0%    → 100%  (hero — dentist audience is more qualified)
15%   → ~78%  (problem section)
30%   → ~63%  (stats grid — very persuasive content, no CTA)
50%   → ~48%  (clinical tools — feature scanning)
65%   → ~38%  (workflow)
80%   → ~30%  (positioning)
92%   → ~24%  (bottom CTA section)
```

The bottom CTA on ForDentists is seen by approximately 1 in 4 visitors. The hero CTA and navbar CTA carry the conversion load.

### /waitlist page

This is a conversion page — expected drop-off is lower. Visitors arrive with intent. The main friction is the page navigation step itself (from home hero) and the role default mismatch.

---

## Section 7: Exit Intent

**Score: 4.5 / 10**

"Exit intent" means the last conversion-relevant experience before a user leaves.

### What users see last by page

| Page | Last element before footer | Has CTA? |
|------|---------------------------|----------|
| Home | Dr. Anca blockquote (no button below it) | No |
| /for-dentists | Dual CTA section (Apply + Talk to Team) | Yes — good |
| /features | Single "Join the Waitlist" link | Yes — adequate |
| /pricing | FAQ section | No — missed opportunity |
| /about | Dual CTA section (Join Waitlist + Contact Us) | Yes — good |
| /blog | Newsletter email input (not waitlist) | Misaligned goal |
| /contact | Form success state / form | Yes — but it's the contact form |
| /waitlist | Social proof bar (no additional CTA) | No — but form is the page |
| 404 | "Back to Home" button | No waitlist mention |
| Blog posts | Not audited in full but footer will be last | Footer only |

### No exit intent modal

No exit intent overlay exists. For a pre-launch product that has not yet paid for traffic but is generating organic visits (blog, EFP award coverage), an exit intent modal triggered on desktop mouse-leave — showing a single email field with "Before you go — join 30+ founding clinics" — would recover a portion of abandoning sessions without requiring any page redesign.

**Implementation note:** This should be triggered at mouse-leave (Y < 20px) on desktop only. On mobile, a sticky bottom bar achieves the same goal without the intrusiveness of a modal.

### No mobile sticky CTA

Mobile users who scroll past the hero without converting have no persistent CTA. A `position: fixed; bottom: 0; width: 100%; z-index: 49` bottom bar containing a lime "Join Waitlist — Free" button, visible below the fold only, would materially increase mobile conversion. It should dismiss automatically after clicking or when the user reaches the footer.

---

## Section 8: 404 Page Quality

**Score: 5.5 / 10**

### What exists

Clean, on-brand 404 with:
- Semi-opaque "404" in lime at 20% opacity (strong visual signal)
- "Page not found." headline in Dongle font, 40–64px
- Explanatory copy ("Sorry, the page you're looking for doesn't exist...")
- Single "Back to Home" btn-primary
- Full navbar and footer (correct — navigation recovery)
- ParallaxHeroBg for visual consistency

### What is missing

1. **No waitlist CTA.** A visitor hitting a 404 has demonstrated intent to visit your site. This is an opportunity, not just an error state. Add a secondary conversion block: "While you're here — join 30+ founding clinics waiting for Perioskoup."

2. **No suggested pages.** No links to Features, For Dentists, Blog. A visitor who typed a wrong URL may still want to explore the site.

3. **HeroGlow not applied.** The 404 imports `ParallaxHeroBg` but not `HeroGlow`, which every other secondary page uses. Minor visual inconsistency.

4. **No meaningful error message.** "It may have been moved or deleted" is fine for a generic 404, but no search functionality or help email is offered.

---

## Section 9: Form Submission Functionality

**Score: 1 / 10**

This is the only P0 finding in the entire audit. Everything else is optimization. This is a data loss defect.

### Confirmed: every form discards data

The server (`server/index.ts`) is a pure static file server. `vercel.json` has no `functions` key. There are no API routes. There is no `.env` file in the project root. There are no third-party SDK imports (`mailchimp`, `loops`, `resend`, `convertkit`, etc.) in any page or component file.

The three form surfaces and their submit handlers:

**Waitlist form (`/waitlist`):** `handleSubmit` validates fields, if valid sets `setSubmitted(true)`. No data is read from the form DOM and sent anywhere. The `validate()` function reads field values but only for error checking — they are never collected into a payload.

**Contact form (`/contact`):** Identical pattern. `handleSubmit` validates and sets `setSent(true)`. No data sent.

**Newsletter input (`/blog`):** An uncontrolled `<input type="email">` with a `<button>` that has no event handler. The button element does not live inside a `<form>` element. Pressing Subscribe does nothing.

### Impact assessment

The social proof claim "30+ founding clinics on the waitlist" is visible on multiple pages. If this claim was accumulated before the current codebase was deployed, that data is not in a CRM anywhere accessible to the team through these forms. If any visitors have submitted the waitlist form through the current UI, that data is gone.

### Recommended fix (minimum viable — ~45 minutes of work)

The lowest-friction integration for a Vercel-hosted static SPA:

```
Option A: Loops.so (best for SaaS waitlists)
- Create a Loops account, get API key
- Create a Vercel serverless function at /api/waitlist.ts:
  POST /api/waitlist { email, firstName, role, clinic?, city? }
  → loops.createContact({ email, firstName, userGroup: role })
- Update handleSubmit in Waitlist.tsx to fetch('/api/waitlist', { method: 'POST', body: JSON.stringify(formData) })
- Add loading state (disable button during fetch)
- On success: setSubmitted(true)
- On error: setError("Something went wrong — please try again or email hello@perioskoup.com")

Option B: Formspree / Tally (stopgap, no backend needed)
- Replace form action with Formspree endpoint
- No serverless function required
- Less control over confirmation email
- Takes 10 minutes

Option C: Resend + Vercel function
- POST /api/waitlist → send confirmation email via Resend API
- Also write to a Vercel KV or Supabase table
- Most control, ~2 hours of work
```

---

## Top 5 Blockers by Conversion Impact

### Blocker 1 — Forms don't submit data
**Impact: Critical / Effort: Medium (2–4 hours)**

Every waitlist and contact submission is silently lost. The entire business goal of the landing page is data capture. Fix before any marketing spend, any press coverage, or any social sharing. Use Loops.so + a Vercel serverless function as the minimum viable integration.

### Blocker 2 — No inline form in the hero (requires page navigation to convert)
**Impact: High / Effort: Medium**

The hero has two navigation CTAs but no inline form. A visitor who wants to sign up must: see the button → click → wait for /waitlist to load → re-read the value proposition → choose a role → fill fields → submit. Each step loses a percentage of users. A 2-field inline form (email + role dropdown, 1 row) in the hero with a submit button would capture the highest-intent visitors without page navigation. This is the pattern used by Superhuman, Loom, Linear, and every high-converting SaaS waitlist of the last five years.

### Blocker 3 — No mobile sticky CTA bar
**Impact: High / Effort: Low (30 minutes)**

Mobile users who scroll past the hero have no persistent conversion prompt. The navbar CTA is hidden on mobile. A fixed bottom bar containing "Join Waitlist — Free" in lime, visible only below the fold (e.g., after 200px scroll), would recover mobile conversion without disrupting desktop UX.

### Blocker 4 — Clinic pricing hidden on Pricing page
**Impact: High / Effort: Low (10 minutes)**

The Pricing page headline says "Simple, transparent pricing" but the Clinic plan shows "Coming soon." The og:description already contains "from €39/mo" — this range is known and considered publishable. Show it on the page. Dentists need a price anchor to complete the internal business case before joining a waitlist. "Lock in founding pricing" is a strong motivator only when users know what they're locking in.

### Blocker 5 — Error color uses positive brand color
**Impact: Medium / Effort: Low (15 minutes)**

Form validation errors render in #C0E57A (lime green) — the same color as CTAs, success states, active states, and brand accents. This creates semantic ambiguity. A user who sees lime text next to a field is trained to associate it with positive action. Change error colors to #FF6B6B or similar red that contrasts against #1D3449 at 4.5:1 or better.

---

## Quick Wins (Under 30 Minutes Each)

1. **Connect Waitlist.tsx to Loops or Formspree.** One API call in handleSubmit. P0 priority — do this before anything else.

2. **Add "from €39/mo" to the Pricing page Clinic plan.** Change the price string from "Coming soon" to "From €39/mo". One string. Unlocks the full value of the "founding pricing" pitch.

3. **Add mobile sticky CTA bar.** `position: fixed; bottom: 0; width: 100%; padding: 12px 16px; background: #0A171E; border-top: 1px solid #234966; z-index: 49;` with a full-width lime "Join Waitlist" button. Hide above the fold via scroll listener (already used in Navbar.tsx). Show on mobile only.

4. **Pre-select role from URL param.** In Waitlist.tsx, read `new URLSearchParams(window.location.search).get('role')` and initialize `useState` from it. Then update the ForDentists CTA to link to `/waitlist?role=dentist`.

5. **Change error color to red.** Replace all `color: "#C0E57A"` in error span styles with `color: "#FF6B6B"` (or `color: "#F87171"` for a softer option). 5 occurrences across Waitlist.tsx and Contact.tsx.

6. **Add visible labels above waitlist form fields.** The contact form uses them correctly. Copy the label pattern to the waitlist form. Labels should be 12px, #8C9C8C, fontWeight 600.

7. **Add waitlist CTA to the 404 page.** One `<Link href="/waitlist">` component below the "Back to Home" button.

8. **Add newsletter handler to blog.** Either connect the Subscribe button to the same Loops integration (tag as newsletter subscriber), or replace the newsletter section with a waitlist CTA matching the mid-blog CTA block.

9. **Fix the home hero social proof bar** ("30+ founding clinics · EFP Award Winner 2025 · Free for patients"). Currently 13px, #8C9C8C — below WCAG contrast. Increase to 14px, raise color to #A8B4A8 or similar. Make "30+" and "EFP Award Winner" bold for scan pattern.

10. **Add "Talk to the Team" button to the pricing page bottom.** Currently no CTA on the FAQ section. Add a ghost button linking to /contact.

---

## Structural Rewrites

### Hero CTA Block Rewrite

**Current layout:**
```
[EFP badge]
[Headline: "Between visits, we take over."]
[Dr. Anca blockquote]
[Join the Waitlist →]   [For Clinicians]
[30+ founding clinics · EFP Award Winner 2025 · Free for patients]
[Stats: 87% / 80% / Winner]
```

**Suggested wireframe (inline form variant):**
```
┌────────────────────────────────────────────────────┐
│  [EFP Award Winner 2025 — Digital Innovation ↗]    │
│                                                    │
│  "Between visits,                                  │
│   we take over."                                   │
│                                                    │
│  [Dr. Anca blockquote, 17px, max-width 480px]      │
│                                                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  [email input — flex-grow]  [I am a... v]   │   │
│  │  [Join Waitlist — Free  →       ] (lime btn) │   │
│  │  No credit card · GDPR compliant · EU data  │   │
│  └─────────────────────────────────────────────┘   │
│                                                    │
│  30+ founding clinics · EFP Award 2025             │
│                                                    │
│  [For Clinicians — see full dashboard features]    │
│                                                    │
│  [Stats row: 87% / 80% / EFP Winner]              │
└────────────────────────────────────────────────────┘
```

The inline form is 2 fields (email + role select) + 1 button. The role select also allows routing: on submit, if role=dentist, send to the dentist Loops list; if role=patient, send to the patient list. The trust micro-copy moves inside the form box. The "For Clinicians" secondary link drops below the form (lower hierarchy).

### Mid-Page CTA Insert (after How It Works section, ~60% depth)

Insert between the How It Works section and the Social Proof Quote section:

```
┌────────────────────────────────────────────────────┐
│  ─────────────── [1px lime accent bar] ──────────  │
│                                                    │
│  "Join 30+ founding clinics building the future    │
│   of periodontal care."                            │
│                         (Dongle 28px, #F5F9EA)     │
│                                                    │
│       [Join the Waitlist →]   (btn-primary)        │
│                                                    │
└────────────────────────────────────────────────────┘
```

This is a 3-line interrupt between two long sections. It catches the ~40% of users who scrolled past the hero CTA but haven't converted. One social proof number, one button.

### Waitlist Success State Rewrite

**Current:**
```
"You're on the list!"
"We'll reach out as soon as we're ready to onboard [your clinic / you]. 
 Thank you for believing in what we're building."
[Back to Home]
```

**Suggested for dentist path:**
```
"You're in."
"Spot reserved for [clinic name]."

"We'll email [email] before public launch in March 2026 with your 
 founding partner access. No spam, ever."

"In the meantime:"
[See Features →]   [Read Our Blog →]
```

The clinic name echo-back confirms the data was received (even if it currently was not). It personalizes the success state. The email address confirmation sets expectations. The next-step links keep dentists engaged rather than bouncing.

---

## 3 CTA Variants to A/B Test

**Variant A (current):** "Join the Waitlist" + arrow icon

**Variant B (role-specific, specificity):**
- Dentist path: "Reserve My Founding Clinic Spot"
- Patient path: "Get Free Early Access"

Role-specific language consistently outperforms generic waitlist language in B2B health SaaS. The word "founding" adds scarcity; "Reserve" implies limited availability.

**Variant C (urgency + social proof):**
- "Join 30+ Founding Clinics — Apply Now"
- Sub-copy beneath button: "Founding spots close at public launch (March 2026)"

Test B vs A first (copy change only, minimal development). Test C if B wins significantly.

---

## A/B Test Priority Matrix

| Test | Hypothesis | Effort | Expected lift |
|------|------------|--------|---------------|
| Inline hero form vs navigate-to-page | Fewer steps = more conversions | Medium | +25–40% |
| Variant B CTA copy ("Reserve My Spot") | Role-specific language outperforms generic | Low | +15–25% |
| Price range on Pricing page | Transparent pricing reduces dentist bounce | Low | +10–20% |
| Mid-page CTA insert at 60% depth | Catching scroll-through users before exit | Low | +8–15% |
| Mobile sticky bottom bar | Persistent mobile CTA recovers abandoners | Low | +12–20% mobile |
| Error colors (lime → red) | Semantic clarity reduces form abandonment | Low | +3–7% |

---

## Page-by-Page Verdict

| Page | Score | Primary conversion issue |
|------|-------|--------------------------|
| Home | 6/10 | No inline form; mid-page CTA gap ~1200px; social proof micro-bar below contrast threshold |
| /waitlist | 4.5/10 | Form submits nothing; default role is wrong for most traffic sources; no visible labels on fields; error color conflicts with brand |
| /for-dentists | 7/10 | Best-structured page; pricing hidden; no mid-page CTAs between stats and bottom section |
| /features | 6.5/10 | Good structure; adequate CTAs; no mid-page interrupts; no social proof inline |
| /pricing | 5/10 | Clinic plan shows no price despite being the primary dentist decision point; "transparent pricing" headline is false |
| /about | 7/10 | Good story and team section; bottom CTA is correct; About hero CTA is correctly placed |
| /blog | 6/10 | Good mid-blog waitlist CTA; newsletter exit misaligns with primary goal; no persona filtering |
| /contact | 5.5/10 | Contact form submits nothing; no trust signals on form card; no waitlist CTA for non-enquiry visitors |
| 404 | 5.5/10 | On-brand; clean; no waitlist CTA; no suggested pages; HeroGlow inconsistency |

---

## Implementation Priority

### This week — P0 (blocking all growth)

1. **Fix form submission.** Connect Waitlist.tsx handleSubmit to Loops.so (or Formspree as a stopgap). Add loading state + error state + real error message. 2–4 hours. This is the only fix that changes whether data is captured at all.

2. **Connect or remove blog newsletter.** Either wire it to the same Loops list (tag as newsletter), or replace the section with a waitlist CTA. 30 minutes.

3. **Connect contact form.** Either Formspree or a mailto: href as a zero-backend fallback. Contact form data is lower priority than waitlist data but still important for partnership enquiries.

### This week — P1 (conversion multipliers)

4. **Add mobile sticky bottom CTA bar.** 30 minutes. Highest ROI for mobile traffic.

5. **Change error colors from lime to red.** 15 minutes. Semantic clarity in all forms.

6. **Add visible labels above waitlist form fields.** 15 minutes. Match contact form pattern.

7. **Show "from €39/mo" on Pricing page Clinic plan.** 10 minutes. Removes the broken-promise effect for the dentist decision-maker.

### Next sprint — P2 (structural improvements)

8. Add inline 2-field hero form (email + role) replacing the navigate-to-page CTA.

9. Add mid-page CTA block between How It Works and Social Proof quote on Home.

10. Add URL param pre-selection (`?role=dentist`) to waitlist page; update ForDentists CTA link.

11. Add waitlist CTA to the 404 page.

12. Add "Talk to the Team" CTA to the Pricing FAQ section.

### Next month — P3 (polish and optimization)

13. Exit intent modal on desktop (triggered on mouse-leave from viewport).

14. Blog persona filtering tabs (Patients / Clinicians / All).

15. Third-party testimonial from one founding clinic partner (replaces self-referential Dr. Anca quote at bottom of home page).

16. A/B test Variant B CTA copy against current.

17. Fix home hero social proof bar contrast (14px, #A8B4A8, bold "30+").

---

## Wireframe Annotations

### /waitlist page — current vs recommended

```
CURRENT:
┌──────────────────────────────────────────┐
│  [Early Access label-tag]                │
│  "Join the founding waitlist."           │
│  "Be among the first..."                 │
│                                          │
│  [Dentist / Clinic]  [Patient]           │   ← role selector
│                                          │
│  [First name]  [Last name]               │
│  [Email address]                         │
│  [Clinic / Practice name] (dentist only) │
│  [City, Country]          (dentist only) │
│                                          │
│  [Join the Waitlist →]                   │
│  No credit card · GDPR compliant         │   ← 12px, #8C9C8C, below contrast
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 30+ founding clinics  EFP 2025     │  │   ← below form, after decision
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

RECOMMENDED:
┌──────────────────────────────────────────┐
│  [Early Access label-tag]                │
│  "Join the founding waitlist."           │
│  "Be among the first..."                 │
│                                          │
│  ┌──────────────┐  ┌───────────────────┐ │
│  │ 30+          │  │  EFP Award Winner │ │   ← MOVED UP, before form
│  │ founding     │  │  2025             │ │
│  │ clinics      │  │                   │ │
│  └──────────────┘  └───────────────────┘ │
│                                          │
│  [Dentist / Clinic]  [Patient]           │
│                                          │
│  First name ↓           Last name ↓      │   ← visible labels above fields
│  [First name]           [Last name]      │
│                                          │
│  Email address ↓                         │
│  [Email address]                         │
│                                          │
│  Clinic name ↓  (dentist only)           │
│  [Clinic / Practice name]                │
│                                          │
│  [Join the Waitlist →]                   │
│                                          │
│  🔒 No credit card · GDPR compliant      │   ← 14px, higher contrast, icon
│  🌍 EU servers · end-to-end encrypted    │   ← added trust line
└──────────────────────────────────────────┘
```

---

*Full source code review of client/src/pages/ (10 pages) and client/src/components/ (Navbar, Footer, PhoneMockup). No live traffic data or session recordings were available. Scroll depth percentages are predictive estimates based on content density, section pixel heights, and published conversion research benchmarks. Form submission defect confirmed by code inspection — no fetch/axios/SDK calls exist anywhere in the form handlers.*
