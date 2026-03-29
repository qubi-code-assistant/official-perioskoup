# Conversion UX Audit — Cycle 2
**Auditor:** Conversion Rate Optimization Specialist  
**Date:** 2026-03-06  
**Branch:** fix/final-launch-audit  
**Prior audits:** 04-conversion-ux.md (6.0/10), re-04-conversion-ux.md (5.5/10)  
**Source reviewed:** All 12 pages in client/src/pages/, Navbar.tsx, Footer.tsx  
**Scope exclusion:** Form backend (API/data persistence) is a known tracked issue — not scored here  
**Primary goal:** Waitlist signups from dentists  
**Secondary goal:** Waitlist signups from patients

---

## Overall Score: 5.8 / 10

The site carries genuine credibility assets — a verifiable EFP award, a practicing periodontist co-founder, real academic citations with DOI links, and 30+ founding clinics. The visual execution is strong. The conversion architecture is not keeping pace. Across two prior audit cycles, nine distinct conversion defects were identified with clear fix paths and low estimated effort. Eight of those nine remain in the source code unaddressed. This audit documents all current defects, confirms what has not changed, and provides tightened wireframe-level recommendations.

---

## Verification: Status of All Previously Identified Defects

The table below records the status of every finding raised across the prior two audit passes.

| Issue | First Raised | Current Status | Verification |
|-------|-------------|----------------|-------------|
| Error colors use lime (#C0E57A) on all form validation errors | Cycle 1 | NOT FIXED | 7 instances confirmed: Waitlist.tsx lines 133, 142, 147; Contact.tsx lines 161, 171, 184, 189 — all render `color: "#C0E57A"` |
| Waitlist form fields use sr-only labels, not visible | Cycle 1 | NOT FIXED | Waitlist.tsx lines 131, 136, 140, 145, 148 all carry `className="sr-only"` |
| Default role on /waitlist is "dentist" | Cycle 1 | NOT FIXED | Waitlist.tsx line 18: `useState<"patient" \| "dentist">("dentist")` — unchanged |
| No URLSearchParams role pre-selection | Cycle 1 | NOT FIXED | No `URLSearchParams` call exists anywhere in the codebase |
| ForDentists CTA links to /waitlist with no ?role=dentist | Cycle 1 | NOT FIXED | ForDentists.tsx line 100: `<Link href="/waitlist">` — no query param |
| No mobile sticky CTA bar | Cycle 1 | NOT FIXED | No `position: fixed; bottom: 0` element exists in any page or component |
| Clinic pricing shows no number on /pricing | Cycle 1 | NOT FIXED | Pricing.tsx line 29: `price: "Coming soon"` — unchanged |
| No mid-page CTA on Home between How It Works and Social Proof | Cycle 1 | NOT FIXED | Home.tsx: no CTA element between the How It Works section and Social Proof section |
| 404 page has no waitlist CTA, no suggested pages | Cycle 1 | NOT FIXED | NotFound.tsx: single `<Link href="/">Back to Home</Link>`, unchanged |
| Home hero social proof micro-bar: 13px, #8C9C8C, no bold | Cycle 1 | NOT FIXED | Home.tsx line 127: `fontSize: 13, color: "#8C9C8C"` — unchanged |
| Blog newsletter submits nothing | Cycle 1 | PARTIALLY FIXED | Blog.tsx now has a proper form `onSubmit` and validation. Comment on line 104: `// No backend yet — optimistically show success` — UX improved but data still discarded |
| Mobile navbar CTA hidden | Cycle 1 | FIXED | Navbar.tsx line 130: `className="btn-primary hidden md:inline-flex"` — correct |
| Dr. Anca attribution shows CDO title | Cycle 2 | FIXED | Home.tsx line 111, ForDentists.tsx line 167: "Chief Dental Officer" / "Periodontist & CDO" |
| Pricing FAQ JSON-LD describes "secure messaging" as current feature | Cycle 2 (new) | NOT FIXED | Pricing.tsx line 47: pricingFaqJsonLd answer for Patient plan still describes "secure messaging" — this feature was removed from the visible plan |
| Waitlist FAQ JSON-LD promises a confirmation email | Cycle 2 (new) | NOT FIXED | Waitlist.tsx line 49: `"text": "After joining, you'll receive a confirmation email."` — no email system exists |
| Home.tsx How It Works has two redundant paragraphs | Cycle 2 (new) | NOT FIXED | Home.tsx lines 292-296: two consecutive paragraphs describing the same three-step workflow |

---

## Section 1: Waitlist Form Friction

**Score: 4.0 / 10**

### Form architecture (unchanged)

Three form surfaces exist on the site:

| Surface | Route | Fields (patient) | Fields (dentist) |
|---------|-------|-----------------|-----------------|
| Waitlist | /waitlist | First name (sr-only label), Email (sr-only label) = 2 visible fields | + Clinic name (sr-only), City/Country (sr-only) = 4 visible fields |
| Contact | /contact | First name, Last name, Email, Role (select), Message = 5 | Same |
| Newsletter | /blog | Email only | Email only |

The Home page has no inline form. Every conversion from the hero requires navigating to /waitlist — an additional page load and re-orientation step before any field can be filled.

### Issue 1.1: All waitlist form labels are screen-reader-only

Every field in Waitlist.tsx uses `className="sr-only"`. The contact form, on the same site, uses correct visible labels (12px, #8C9C8C, `display: block, marginBottom: 6`). The pattern exists. It has not been applied to the higher-priority conversion surface.

When a user clicks into a field and begins typing, the placeholder disappears and the field loses all context. Returning users who pause mid-form — common on mobile — have no recovery path for understanding what each field is.

**Fix:** Replace all 5 `className="sr-only"` labels in Waitlist.tsx with the Contact.tsx label pattern. Copy the `style={{ fontFamily: "Gabarito, sans-serif", fontSize: 12, fontWeight: 600, color: "#8C9C8C", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}` pattern from Contact.tsx. Estimated time: 10 minutes.

### Issue 1.2: Error messages use the positive brand color

All 7 validation error spans in Waitlist.tsx (3) and Contact.tsx (4) render in `color: "#C0E57A"`. This is the exact color of primary CTA buttons, active role selector tabs, success states, checkmarks, accent lines, and the brand accent throughout every page. A user who submits an incomplete form sees lime text — which is trained throughout the site to mean "good, active, approved."

This creates a semantic signal collision at the precise moment the user needs clear feedback. Any hesitation about whether an error message means "this field needs attention" vs "this field is already complete" is a conversion loss.

**Fix:** Replace all 7 `color: "#C0E57A"` in error span styles with `color: "#F87171"` (a soft red that reads cleanly on #1D3449 at approximately 5.2:1 contrast on the surface background). This is a literal find-and-replace across two files. Estimated time: 5 minutes.

### Issue 1.3: Default role is "dentist" regardless of traffic source

`Waitlist.tsx line 18: const [role, setRole] = useState<"patient" | "dentist">("dentist")`

The Home page is the primary traffic entry point. Its audience is mixed — the hero copy reads "free AI dental companion app" which targets patients as the primary user. The hero CTAs are "Join the Waitlist" (general) and "For Clinicians" (dentist-specific). A general visitor who clicks "Join the Waitlist" arrives at /waitlist and is immediately shown the Dentist/Clinic role selected, with "Founding partner pricing" as the sub-label.

This is inverted from the likely traffic composition. The correct default for a visitor who arrived via the general home page CTA is "patient."

The correct fix is dual:
1. Change the `useState` default to `"patient"`
2. Add URLSearchParams reading so the ForDentists page CTA can pass `?role=dentist` to pre-select the correct tab

**Fix:** 
```tsx
// Waitlist.tsx — replace line 18 with:
const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
const initialRole = (params.get('role') === 'dentist' ? 'dentist' : 'patient') as 'patient' | 'dentist';
const [role, setRole] = useState<"patient" | "dentist">(initialRole);
```
Then update ForDentists.tsx line 100: `<Link href="/waitlist?role=dentist">`. Estimated time: 10 minutes.

### Issue 1.4: Success state is thin for the dentist conversion

After submitting the waitlist form, dentists see:

> "You're on the list!"
> "We'll reach out as soon as we're ready to onboard your clinic. Thank you for believing in what we're building."
> [Back to Home]

This response is adequate for a patient but insufficient for a practice owner who is making a business decision. It has four gaps:

1. No clinic name echo-back (doesn't confirm data was received)
2. No email confirmation promise with a specific address
3. No position number or queue indication
4. No next step — a single ghost link to the home page leaves dentists with no engagement path

**Recommended dentist success state:**

```
"You're in."
"[Clinic name] is on the founding waitlist."

"We'll email [email address] before public launch with your 
founding partner access and pricing. No spam, ever."

"Explore in the meantime:"
[See Clinical Features →]    [Read Our Blog →]
```

### Issue 1.5: Social proof positioned after the decision point

The 30+ founding clinics / EFP Award stats card in Waitlist.tsx renders at `marginTop: 48` — below the submit button. A dentist considering whether to fill in the form sees this social proof only after they have already committed (or decided not to). The trust assets that could close hesitation are sequenced after the action they are meant to support.

**Fix:** Move the social proof block to above the role selector, before the form fields. This requires moving 14 lines of JSX. Estimated time: 5 minutes.

---

## Section 2: CTA Visibility at Every Scroll Depth

**Score: 5.5 / 10**

### Home page — CTA audit by scroll depth

| Depth | CTA present | Type | Assessment |
|-------|-------------|------|-----------|
| 0–10% (hero, above fold) | Yes | "Join the Waitlist" btn-primary + "For Clinicians" btn-ghost | Good. Lime button is high contrast. Correct placement. |
| 10–15% (ticker) | No | — | aria-hidden ticker. Missed conversion prompt. |
| 15–30% (EFP Award card) | No | External EFP link only | Trust-building section ends with no conversion action |
| 30–45% (Features bento) | Weak | "See all features" ghost to /features | Routes to a sub-page, not /waitlist. Lower intent destination. |
| 45–60% (AI Companion definition) | No | — | Pure content block. No CTA. |
| 60–75% (How It Works) | No | — | Longest dead zone: ~1000px with no conversion prompt |
| 75–85% (Social proof quote) | No | — | Dr. Anca blockquote has no follow-up action |
| 85–100% (Footer) | Yes (low priority) | "Join Waitlist" footer text link | Correct but footer links carry minimal visual weight |

**The dead zone from ~30% to ~85% of the home page — approximately 1200px of content — contains no primary CTA.** Every piece of content in this range builds conviction (EFP card, feature descriptions, AI companion definition, how it works, testimonial), but none of it is followed by a conversion invitation.

The fixed navbar CTA ("Join Waitlist") provides a persistent backstop on desktop. On mobile, the mobile navbar CTA is now correctly visible via the `hidden md:inline-flex` class (this was the one fix that landed). However, the navbar CTA requires a user to notice it against the frosted-glass background — it is not spatially connected to the conviction-building content they are reading.

### ForDentists page — CTA audit

| Depth | CTA present | Type | Assessment |
|-------|-------------|------|-----------|
| 0–10% (hero) | Yes | "Join as a Founding Clinic" + "See All Features" | Good. Role-specific label is strong. |
| 10–25% (problem section) | No | — | Problem-framing section with no action |
| 25–40% (stats grid) | No | — | High-conviction stats (80%, 87%, 62%) with no conversion follow |
| 40–55% (Dr. Anca quote) | No | — | Trust signal with no follow-up |
| 55–75% (clinical tools) | No | — | Feature detail scan section |
| 75–85% (workflow) | No | — | |
| 85–90% (competitive positioning) | Partial | Callout box ("Founding clinic spots are limited") | Good callout but no button attached to the callout |
| 90–100% (bottom CTA section) | Yes | "Apply as a Founding Clinic" + "Talk to the Team" | Correct. Role-specific. Strong placement. |

The ForDentists bottom CTA is the best-executed CTA section on the site. The problem is it is seen by approximately 1 in 4 visitors (estimated from scroll depth benchmarks on specialized content pages with this content density).

### /waitlist page

The /waitlist page correctly treats the form as the CTA. The structure — label, headline, social proof, role selector, form, submit, trust micro-copy — is appropriate for a conversion page. The sequencing issues (social proof below form, wrong default role) are form friction issues covered in Section 1.

### Blog page

The mid-blog waitlist CTA block (between featured posts and all-articles list) is correctly placed and has a clear conversion message. The newsletter section at the bottom of the page is a goal-misaligned exit point — the site's primary goal is waitlist signups, and the last conversion surface on a high-intent content page is newsletter subscription (which discards the email anyway).

### Features, About, Contact pages

Features: Good hero CTAs + bottom "Join the Waitlist" button. Adequate.  
About: Hero CTA present. Strong bottom dual-CTA (Join Waitlist + Contact Us). The best-converting secondary page after ForDentists.  
Contact: No waitlist CTA — the contact form is the conversion surface, which is appropriate.

---

## Section 3: Social Proof Placement and Credibility

**Score: 7.5 / 10**

### What works

The social proof inventory on this site is genuinely strong and verifiable:

- EFP Award badge in the home hero links to the actual EFP press release — verifiable
- EFP Award card section includes jury names (Deschner, Herrera, Stavropoulos), institution names, and the official quote — specific and authoritative
- All three key statistics (80% forgetting rate, 87% mHealth outcomes, 62% periodontitis prevalence) link to real DOIs — this distinguishes the site from generic health-tech marketing
- Dr. Anca quote on the home hero uses clinical language that practicing periodontists will recognize
- ForDentists.tsx problem section now includes the Weinert 2025 JCP citation and the 30% post-treatment adherence figure
- About.tsx team section uses real photos, LinkedIn links, and specific credentials
- ForDentists.tsx CTA section includes the WHO EUR 1/EUR 8-50 prevention ROI figure — this is a strong business case for dentists

### What is weak or misplaced

**The home hero social proof micro-bar is low-visibility.** Home.tsx line 127: `fontSize: 13, color: "#8C9C8C"`. At 13px in the muted sage on the dark background, this text likely fails WCAG 4.5:1 for normal text. More critically, it has no visual emphasis — "30+" looks identical to "EFP Award Winner 2025" which looks identical to "Free for patients." None of the numbers are bold or lime-colored. A scan pattern reader processes this as a single gray footnote rather than three distinct trust signals.

**The bottom social proof quote is founder-attributed.** Home.tsx social proof section: "The app I always wished I could prescribe to my patients." — attributed to Dr. Anca Constantin, Chief Dental Officer, Perioskoup. A visitor who has read the hero blockquote (also Dr. Anca) and any team content knows she is the CDO quoting her own product. This is self-referential social proof — it carries less persuasive weight than a sentence from any one of the 30 founding clinic partners.

No testimonial from an external party (a founding clinic, a patient beta user) appears anywhere on the site. The entire social proof stack is either:
- Institutional (EFP Award — strong)
- Internal founder (Dr. Anca quotes — moderate)
- Statistical (research citations — strong but impersonal)

None of it is peer-level. A dentist reading the site cannot find evidence that another dentist — someone in their position — evaluated the product and found it worthwhile.

**Patient social proof is absent.** The secondary acquisition target (patients — free plan) has zero social proof directed at their experience. Not one sentence from a beta user appears anywhere.

---

## Section 4: Trust Signals at Decision Points

**Score: 5.5 / 10**

Decision points are moments where a visitor is deciding whether to proceed. Trust signals need to be present at these moments — not just elsewhere on the page.

| Decision point | Trust signals present | Gap |
|---|---|---|
| Home hero (above fold) | EFP badge, Dr. Anca quote | Social proof micro-bar is present but 13px, #8C9C8C — low contrast, no emphasis |
| /waitlist form — before submit | "No credit card" + "GDPR compliant" icons at 12px, #8C9C8C | Too small. EU storage not mentioned. No email confirmation promise. Social proof is below submit button (after the decision). |
| /waitlist role selector | Role-specific sub-labels ("Founding partner pricing") | Good. The sub-label on the dentist tab is correctly placed. |
| /for-dentists hero | EFP badge + "30+ founding clinics" text | No GDPR/data security signal in the hero |
| /pricing Clinic plan | "Founding Partner" corner badge | "Coming soon" price with no number. A dentist who clicks Pricing to evaluate cost cannot form a business case. |
| /contact form card | Email addresses visible in left column | No trust signals on the form card itself. No security note. |
| 404 page | None | No trust signals. The user is already stressed from navigating to a dead page. |

### Pricing transparency: unchanged and still broken

Pricing.tsx `PLANS[1].price` is still the string `"Coming soon"`. The page headline reads "Simple, transparent pricing." The two-word promise in the headline is false for the primary dentist decision-maker. The Pricing FAQ confirms the absurdity — the first FAQ question is "When will clinic pricing be available?" — meaning the page headline claims transparency while the FAQ admits there is nothing transparent to show.

The business context document (CLAUDE.md) states: "Revenue: Dentists pay (€39-199/mo)". This range is internally known. Showing "from €39/mo" on the Clinic plan card with "Founding partner pricing locked for life" as a sub-label is a one-line change with high conversion impact for dentists evaluating the product.

### GDPR micro-copy: correctly placed but insufficiently sized

The trust icons below the waitlist submit button (lock icon "No credit card", shield icon "GDPR compliant") are at 12px in #8C9C8C. These are below WCAG 4.5:1 contrast requirements for text at 12px. For a health data product targeting EU dental clinics, GDPR compliance is a selling point — it should be legible.

The signal is also incomplete. "GDPR compliant" is the right message but the EU data storage location is a stronger claim for a clinic owner who worries about where patient health data is housed. "EU servers" in the same trust bar would be a meaningful addition.

---

## Section 5: Navigation / IA Logic for Dentist vs Patient Personas

**Score: 5.0 / 10**

### Current nav structure

```
Features | For Dentists | Pricing | About | Blog | Contact | [Join Waitlist]
```

### Dentist path analysis

The dentist path is reasonably complete. "For Dentists" is the second nav item. The ForDentists page is persona-specific from hero to CTA. The bottom CTA correctly says "Apply as a Founding Clinic." The gap: ForDentists CTA routes to `/waitlist` with no `?role=dentist` parameter, so a dentist who clicks through must re-identify themselves on the conversion page.

### Patient path analysis

The patient path is invisible in the nav. A patient landing on the home page sees:
- "Features" (neutral)
- "For Dentists" (not me)
- "Pricing" (relevant — patient plan is free)
- "About" (neutral)
- "Blog" (neutral)
- "Contact" (neutral)
- "Join Waitlist" (relevant — but ambiguous)

There is no "For Patients" entry point in the nav, no persona-specific page, and no path that gives a patient the same quality of persona-specific content that dentists receive on /for-dentists. A patient who clicks "For Dentists" by mistake and bounces has no recovery path. A patient who clicks "Join Waitlist" lands on the dentist-defaulted /waitlist page.

This is a fundamental IA asymmetry. The product has two acquisition targets — dentists who pay, and patients who are free. The nav architecture treats only one of them as a named audience.

### Pricing nav label as broken promise

The nav item labeled "Pricing" leads to a page where one of two plans shows "Coming soon" with no number. A dentist who clicks "Pricing" to answer the question "how much does this cost" leaves with no answer. The nav item sets an expectation the page fails to fulfill.

Options:
1. Show a price range (`from €39/mo`) and keep the nav item as "Pricing"
2. Keep the plan hidden and rename the nav item to "Plans" or "Product Plans"

### Blog IA: no persona filtering

Blog articles are tagged by category (Patient Education, Clinical Insight, Technology, Founder Story, Company News, Patient Habits) but the blog index presents a flat list with no tabs, filters, or separations. A periodontist looking for clinical content must scroll through patient education articles. A patient looking for accessible content must scroll past clinical articles. No persona routing exists.

---

## Section 6: Scroll Depth Drop-off Predictions

These estimates are based on content density, section pixel heights, CTA presence/absence, and published industry benchmarks for health-tech SaaS landing pages.

### Home page (general traffic, mixed intent)

```
0%    → 100% (hero viewport — all visitors)
12%   →  72% (ticker — passive scroll continues)
25%   →  55% (EFP Award card — trust builders engaged, action-seekers bouncing)
40%   →  42% (Features bento — no CTA catches leavers)
55%   →  31% (AI companion definition — drop intensifies without CTA anchor)
65%   →  24% (How It Works — significant drop, no anchor)
75%   →  18% (Social proof quote — only motivated users)
85%   →  14% (Footer zone)
100%  →  11% (Footer)
```

Approximately 1 in 4 home page visitors sees the social proof quote. Approximately 1 in 9 reaches the footer. The hero CTA is carrying almost all of the conversion load on this page. Any content element placed below 40% will be seen by fewer than half of visitors.

### ForDentists page (higher intent, professional audience)

```
0%    → 100% (hero)
15%   →  78% (problem section — engaged dentists read this)
30%   →  63% (stats grid — convincing content, no CTA)
45%   →  50% (Dr. Anca quote section)
60%   →  40% (clinical tools — feature scanning)
75%   →  32% (workflow cards)
85%   →  27% (competitive positioning)
92%   →  22% (bottom CTA section)
```

The bottom CTA ("Apply as a Founding Clinic") is seen by approximately 1 in 5 ForDentists visitors. The hero CTA and navbar CTA carry the conversion load.

### /waitlist page (conversion page — high intent)

Visitors arrive with stated intent. Scroll depth on a single-form conversion page is less of a drop-off concern than friction within the form and trust signals at the point of action. Primary risks: wrong default role disorients patients, sr-only labels reduce confidence during entry, error colors create confusion on validation failure.

---

## Section 7: Exit Intent

**Score: 4.0 / 10**

### What users see last, by page

| Page | Last element before footer | Has conversion CTA? |
|------|---------------------------|---------------------|
| Home | Dr. Anca blockquote (no button below it) | No |
| /for-dentists | Dual CTA section ("Apply" + "Talk to Team") | Yes — strong |
| /features | Single "Join the Waitlist" link | Yes — adequate |
| /pricing | FAQ section (4 Q&As, no button at bottom) | No |
| /about | Dual CTA section ("Join Waitlist" + "Contact Us") | Yes — good |
| /blog | Newsletter section (no backend, not waitlist) | Misaligned goal |
| /contact | Contact form | Yes — but wrong CTA type for non-enquiry visitors |
| /waitlist | Social proof bar (no additional CTA) | N/A — form is the page |
| 404 | "Back to Home" button | No waitlist mention |
| /blog/[slug] | Footer only | No |

### Three exit-intent mechanisms are entirely absent

**No exit-intent modal.** A desktop mouse-leave trigger (Y position < 20px) showing a single email field with "Before you go — join 30+ founding clinics waiting for Perioskoup" would recover a fraction of abandoning desktop sessions. This is the single highest-ROI addition for a pre-launch product generating organic traffic.

**No mobile sticky CTA bar.** Mobile users who scroll past the hero have no persistent conversion prompt. The navbar CTA exists on desktop. On mobile, the drawer requires intentional user action (tapping the hamburger) to access the CTA. A `position: fixed; bottom: 0` bar — showing "Join Waitlist — Free" in lime, visible only after 200px of scroll and only on mobile — would add a persistent conversion prompt without disturbing the desktop layout.

**No scroll-triggered mid-page interrupt.** The 1200px dead zone on the home page has no recovery mechanism. A user who scrolls through the Features bento, the AI Companion definition, and the How It Works section without converting has seen three sections of conviction-building content with no prompt to act. A 3-line interrupt block between the How It Works section and the Social Proof quote — containing one social proof number and one button — would catch this group.

---

## Section 8: 404 Page Quality

**Score: 5.5 / 10**

NotFound.tsx is visually on-brand and functionally correct (full navbar, full footer, back-to-home button). It uses ParallaxHeroBg but not HeroGlow — a minor visual inconsistency with every other secondary page. It has three conversion gaps that are each simple to close:

**Missing waitlist CTA.** A visitor who hits a 404 has demonstrated intent — they were looking for something on this site. This is one of the highest-intent non-converting moments. A secondary callout below the "Back to Home" button: "While you're here — join 30+ founding clinics waiting for Perioskoup" with a `<Link href="/waitlist">` button would add a conversion surface to an otherwise dead page.

**Missing suggested navigation.** No links to Features, For Dentists, or Blog are offered. A visitor who mistyped a URL may still want to explore the site. Three linked page names (Features / For Dentists / Blog) beneath the error copy would serve this case in 15 lines.

**No trust signal on the error page.** There is no reason to include the EFP badge or the "30+ founding clinics" claim on a 404. However, the absence of the brand micro-bar means a disoriented visitor has no anchor. The Navbar handles this partially — but only if the user reads it.

---

## Section 9: Form UX (Labels, Validation, Error States) — Excluding Backend

**Score: 4.5 / 10**

(Backend/data persistence is excluded per scope. This section covers field presentation, label patterns, validation behavior, and success/error state design only.)

### Waitlist form

- Field labels: all `sr-only` — FAIL (contact form pattern exists on the same site)
- Error color: lime (#C0E57A) — FAIL (semantic collision with positive brand color)
- Error icons: none — FAIL (a small warning icon next to the field would aid scanability)
- Validation: client-side, fires on submit — adequate (real-time per-field would be better but submit-time is acceptable)
- Error messages: copy is clear and specific ("First name is required.", "Please enter a valid email address.") — PASS
- Field borders on error: no `border-color` change on invalid fields — FAIL (users rely on border color as a primary error indicator)
- Role selector: accessible (`aria-pressed`, `role="group"`, `aria-label`) — PASS
- Submit button: no `disabled` state during form processing — acceptable given no async operation, but should be added if backend is connected
- Trust icons below submit: present (lock, shield) — PASS in presence, FAIL in contrast (12px, #8C9C8C)
- Success state: shows for patient path; inadequate for dentist path (no clinic name echo, no email confirmation promise, single "Back to Home" link) — FAIL for dentist

### Contact form

- Field labels: visible, correct pattern (12px, #8C9C8C, `display: block`) — PASS
- Error color: lime (#C0E57A) — FAIL (same issue as waitlist)
- Error messages: clear copy — PASS
- Role select has correct validation behavior — PASS
- Success state: "Message sent! We'll get back to you within 24 hours." — PASS (appropriate for a contact form)
- No trust signals on the form card itself (the email addresses are in the adjacent column) — FAIL

### Blog newsletter

- Form now has proper `onSubmit` handler and email validation — improved from Cycle 1
- `// No backend yet — optimistically show success` comment: UX improvement in form behavior but email is still discarded
- Error state triggers correctly but has no visible error message in the UI (the `aria-live` region is `sr-only`) — users without screen readers see a broken-looking input with no feedback — FAIL

---

## New Issues Found in This Pass

### New Issue 1: BlogPost pages have no inline waitlist CTA

The six blog post pages (/blog/[slug]) are the highest-intent content pages on the site — a visitor who reads an 8-minute article about periodontal disease is a warmer lead than almost anyone else on the site. BlogPost.tsx ends with a "Related articles" section and then the footer. There is no waitlist CTA at the bottom of any article.

For a content-driven health-tech brand, the article-to-conversion path is a primary acquisition channel. Every article should end with a conversion block matched to the article's audience (patient articles → patient waitlist framing, clinical articles → founding clinic framing).

### New Issue 2: Features page has two "body-lg" paragraphs with overlapping content in the bottom CTA section

Features.tsx bottom CTA section (lines 139-143):

```tsx
<h2 className="display-md reveal" style={{ marginBottom: "20px" }}>Ready to get started?</h2>
<p style={{ fontFamily: "Gabarito", ... }}>
  Join 30+ founding clinics on the Perioskoup waitlist. Free for patients, founding pricing for clinics.
</p>
<p className="body-lg reveal" style={{ marginBottom: "36px", maxWidth: "480px", ... }}>
  Join the founding waitlist and be among the first to experience Perioskoup.
</p>
```

The two `<p>` elements repeat the same call-to-action sentiment. One of them should be removed.

### New Issue 3: Pricing page FAQ ends with no CTA

Pricing.tsx: the FAQ section at the bottom of the page (4 Q&As) ends with no button. The final FAQ item is "Is patient data secure?" — a trust-affirming answer that creates a positive emotional resolution, but is not followed by any conversion prompt. This is a missed conversion moment. Adding a `<Link href="/waitlist">Join the Founding Waitlist</Link>` button after the final FAQ item, or a secondary "Talk to the Team" link, would close the page with a conversion option.

### New Issue 4: Home.tsx How It Works section has two consecutive description paragraphs

Home.tsx lines 291-296:

```tsx
<p style={{ fontFamily: "Gabarito", fontSize: 16, color: "#8C9C8C", ... }}>
  Perioskoup connects your dental appointment to your daily routine in three steps...
</p>
<p className="body-lg" style={{ maxWidth: 540, margin: "0 auto" }}>
  The Perioskoup workflow connects clinical precision with patient daily life in three fluid steps.
</p>
```

Both paragraphs describe the same three-step workflow. The second was identified in the previous re-audit as an orphan from a fix that targeted a different section. It remains. One paragraph should be deleted.

---

## Score Summary by Section

| Section | Cycle 1 | Re-audit | Cycle 2 | Delta |
|---------|---------|----------|---------|-------|
| Form Friction (labels, validation, success state) | 4.5 | 4.0 | 4.0 | 0 |
| CTA Visibility at Scroll Depth | 5.5 | 5.5 | 5.5 | 0 |
| Social Proof Placement & Credibility | 7.0 | 7.5 | 7.5 | 0 |
| Trust Signals at Decision Points | 6.5 | 6.0 | 5.5 | -0.5 |
| Navigation / IA Logic | 5.0 | 5.0 | 5.0 | 0 |
| Exit Intent Mechanisms | 4.5 | 4.5 | 4.0 | -0.5 |
| 404 Page Quality | 5.5 | 5.5 | 5.5 | 0 |
| Form UX (excl. backend) | N/A | N/A | 4.5 | new |

Trust Signals score drops by 0.5: the Pricing transparency issue remains unresolved, and the Waitlist FAQ JSON-LD still promises a confirmation email that no system can deliver.

Exit Intent score drops by 0.5: three cycles have passed with no exit-intent mechanism added, despite a low estimated effort across two prior recommendations.

**Overall: 5.8 / 10**

The slight increase from 5.5 to 5.8 reflects: the mobile navbar CTA fix carrying through (genuine conversion improvement), Dr. Anca's CDO attribution now correct throughout (credibility improvement), the blog newsletter form now responding correctly (UX improvement).

---

## Complete Defect Register by Priority

### P1 — Conversion suppressors, all executable under 15 minutes each

**P1-A: Waitlist form labels are screen-reader-only.**  
File: `client/src/pages/Waitlist.tsx`, lines 131, 136, 140, 145, 148.  
Fix: Replace `className="sr-only"` on each `<label>` with an inline style block matching Contact.tsx. 10 minutes.

**P1-B: Error messages render in #C0E57A (lime green).**  
Files: `client/src/pages/Waitlist.tsx` (lines 133, 142, 147), `client/src/pages/Contact.tsx` (lines 161, 171, 184, 189).  
Fix: Search and replace `color: "#C0E57A"` within error span styles with `color: "#F87171"`. 5 minutes.

**P1-C: Default role on /waitlist is "dentist".**  
File: `client/src/pages/Waitlist.tsx`, line 18.  
Fix: Change `useState` default to `"patient"` and add URLSearchParams read for `?role=` param. 10 minutes.

**P1-D: Clinic pricing shows "Coming soon" — no number visible.**  
File: `client/src/pages/Pricing.tsx`, line 29 (`PLANS[1].price`).  
Fix: Change `"Coming soon"` to `"From €39/mo"` and set `period: "founding pricing"`. 5 minutes.

**P1-E: ForDentists CTA links to /waitlist with no role pre-selection.**  
File: `client/src/pages/ForDentists.tsx`, line 100.  
Fix: Change `href="/waitlist"` to `href="/waitlist?role=dentist"`. 1 minute. (Requires P1-C to be done first.)

### P2 — Structural improvements, 20–45 minutes each

**P2-A: No mid-page CTA on Home between How It Works and Social Proof.**  
Insert a 3-line interrupt section between the How It Works section and the Social Proof Quote section in Home.tsx.

**P2-B: 404 page has no waitlist CTA and no suggested pages.**  
File: `client/src/pages/NotFound.tsx`.  
Add a secondary conversion block and 3 nav links.

**P2-C: Home hero social proof micro-bar is low-contrast with no emphasis.**  
File: `client/src/pages/Home.tsx`, line 127.  
Increase to 14px, raise color to #A8B8A8, bold the "30+" figure in #C0E57A.

**P2-D: Blog newsletter exits as a goal-misaligned last conversion surface.**  
File: `client/src/pages/Blog.tsx`.  
Option A: Connect newsletter to Loops (alongside waitlist backend integration).  
Option B: Replace newsletter section with a second waitlist CTA block matching the mid-blog block.

**P2-E: Social proof block on /waitlist is below the submit button.**  
File: `client/src/pages/Waitlist.tsx`.  
Move the social proof `<div>` (lines 170-182) to above the role selector (before line 104). 5 minutes.

**P2-F: BlogPost pages have no inline waitlist CTA.**  
File: `client/src/pages/BlogPost.tsx`.  
Add a waitlist CTA block before the footer in every article. Persona-route based on article category.

**P2-G: Pricing FAQ ends with no conversion prompt.**  
File: `client/src/pages/Pricing.tsx`.  
Add a CTA block after the final FAQ item. One `<Link>` button, 5 minutes.

**P2-H: Dentist success state on /waitlist is generic.**  
File: `client/src/pages/Waitlist.tsx`, lines 85-89.  
Rewrite the dentist path to include: clinic name echo, email address confirmation, two next-step links.

### P3 — Data accuracy issues

**P3-A: Waitlist FAQ JSON-LD promises a confirmation email.**  
File: `client/src/pages/Waitlist.tsx`, line 49.  
Remove the sentence "After joining, you'll receive a confirmation email" from the JSON-LD answer. 2 minutes.

**P3-B: Pricing FAQ JSON-LD describes "secure messaging" as a current Patient plan feature.**  
File: `client/src/pages/Pricing.tsx`, line 47.  
Remove "secure messaging with your dentist" from the Patient plan JSON-LD answer. 2 minutes.

**P3-C: Home.tsx How It Works section has two redundant description paragraphs.**  
File: `client/src/pages/Home.tsx`, lines 294-296.  
Delete the second paragraph starting "The Perioskoup workflow connects clinical precision...". 1 minute.

**P3-D: Features.tsx bottom CTA section has two overlapping paragraphs.**  
File: `client/src/pages/Features.tsx`, lines 139-143.  
Delete the `<p>` that begins "Join 30+ founding clinics..." or the one that begins "Join the founding waitlist...". 1 minute.

### P4 — Strategic (require external dependencies or significant work)

**P4-A: No exit-intent modal on desktop.**  
Implement a mouse-leave triggered overlay (Y < 20px) with a single email + role capture. Dismiss on close or after conversion.

**P4-B: No mobile sticky bottom CTA bar.**  
`position: fixed; bottom: 0; width: 100%; z-index: 49; padding: 12px 16px` with a full-width lime "Join Waitlist — Free" button. Show only below the fold (after 200px scroll) and only on mobile (`md:hidden`). Dismiss when the user reaches the footer.

**P4-C: No peer-level testimonial from a founding clinic.**  
One quote from any of the 30 founding clinics — attributed by name and city — would replace the self-referential Dr. Anca quote as the home page social proof section. This is the highest-impact content addition not yet in the site.

**P4-D: No patient testimonial anywhere.**  
One beta patient quote added to the /waitlist page or Home page hero would address the complete absence of patient-directed social proof.

**P4-E: Blog has no persona filtering.**  
Add tab/filter UI to Blog.tsx separating "For Patients" and "For Clinicians" article categories.

**P4-F: No inline hero form (email + role select in the hero).**  
Replacing the navigate-to-page CTA with a 2-field inline form in the home hero eliminates the highest-friction step in the funnel.

---

## Wireframe Annotations

### Home page — Mid-page CTA Insert (recommended at ~60% depth)

```
Current transition at ~60% depth:
┌────────────────────────────────────────────────────────┐
│  HOW IT WORKS — Step 01 / 02 / 03 (circle layout)      │
│                                                        │
│  ─────────────────────────────────────────────────     │
│  (no CTA — 60% of page scrolled)                       │
│                                                        │
│  "The app I always wished I could prescribe..."        │
│     Dr. Anca Constantin                                │
└────────────────────────────────────────────────────────┘

Recommended — insert between How It Works and Social Proof:
┌────────────────────────────────────────────────────────┐
│  HOW IT WORKS — Step 01 / 02 / 03                      │
│                                                        │
│  ─── [1px lime accent bar, max-width 80px, centered] ──│
│                                                        │
│     "Join 30+ founding clinics building the            │
│      future of periodontal care."                      │
│      (Dongle 32px, #F5F9EA, text-center)               │
│                                                        │
│          [Join the Waitlist →]  (btn-primary)          │
│                                                        │
│  ─── [1px #234966 divider] ────────────────────────────│
│                                                        │
│  "The app I always wished I could prescribe..."        │
└────────────────────────────────────────────────────────┘
```

### /waitlist page — Recommended structure

```
CURRENT (what ships):
┌──────────────────────────────────────────┐
│  [Early Access label]                    │
│  "Join the founding waitlist."           │
│  "Be among the first..."                 │
│                                          │
│  [Dentist / Clinic]  [Patient]  ← wrong default
│                                          │
│  [placeholder: First name]  [Last name]  ← no visible labels
│  [placeholder: Email address]            ← no visible label
│  [placeholder: Clinic / Practice name]   ← dentist only, no label
│  [placeholder: City, Country]            ← dentist only, no label
│                                          │
│  [Join the Waitlist →]  (lime btn)       │
│                                          │
│  lock No credit card  shield GDPR        ← 12px, #8C9C8C
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 30+ founding clinics  EFP 2025     │  │ ← after decision
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

RECOMMENDED:
┌──────────────────────────────────────────┐
│  [Early Access label]                    │
│  "Join the founding waitlist."           │
│  "Be among the first..."                 │
│                                          │
│  ┌────────────────┐  ┌─────────────────┐ │
│  │ 30+ founding   │  │  EFP Award      │ │ ← MOVED ABOVE form
│  │ clinics        │  │  Winner 2025    │ │
│  └────────────────┘  └─────────────────┘ │
│                                          │
│  [Patient]  [Dentist / Clinic]  ← Patient default
│                                          │
│  First name ↓          Last name ↓       │ ← visible labels
│  [First name input]    [Last name input] │
│                                          │
│  Email address ↓                         │
│  [Email address input]                   │
│                                          │
│  Clinic name ↓  (dentist tab only)       │
│  [Clinic / Practice name input]          │
│                                          │
│  [Join the Waitlist →]                   │
│                                          │
│  lock No credit card · shield GDPR ·    │
│  globe EU servers                        │ ← 14px, higher contrast
│                                          │
│  Error states:                           │
│  ┌──────────────────────────────────┐    │
│  │  [input — red border on error]   │    │
│  │  [! Error message in #F87171]    │    │ ← NOT lime
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

### 404 page — Recommended additions

```
CURRENT:
┌──────────────────────────────────────────┐
│  [404 in lime at 20% opacity]            │
│  "Page not found."                       │
│  "Sorry, the page you're looking for..." │
│  [Back to Home →]                        │
└──────────────────────────────────────────┘

RECOMMENDED:
┌──────────────────────────────────────────┐
│  [404 in lime at 20% opacity]            │
│  "Page not found."                       │
│  "Sorry, the page you're looking for..." │
│  [Back to Home →]                        │
│                                          │
│  ──────────────────────────────────────  │
│                                          │
│  "While you're here:"                   │
│  [Join 30+ Founding Clinics →]  (btn-primary, smaller)
│                                          │
│  Or explore:  [Features] · [For Dentists] · [Blog]
└──────────────────────────────────────────┘
```

---

## A/B Test Priority Matrix

| Test | Hypothesis | Effort | Expected lift |
|------|------------|--------|--------------|
| Visible labels on waitlist form | Field context during entry reduces abandonment | Low | +5-10% completion rate |
| Error color lime → red | Semantic clarity reduces confusion on validation errors | Low | +3-7% submit rate |
| Patient default role on /waitlist | Correct persona pre-selection reduces disorientation | Low | +8-15% patient signups |
| Price range on Pricing page | Transparent pricing enables dentist business case | Low | +10-20% dentist signups from /pricing |
| Social proof above form on /waitlist | Trust signals before ask improve submit rate | Low | +10-15% |
| Mid-page CTA at 60% depth (Home) | Catching scroll-through users before exit | Low | +8-15% |
| Mobile sticky bottom bar | Persistent mobile CTA recovers scroll abandoners | Low | +12-20% mobile |
| Inline hero form vs navigate-to-page | Fewer steps = more conversions | Medium | +25-40% overall |
| Role-specific CTA copy ("Reserve My Founding Spot") | Specificity outperforms generic | Low | +15-25% |
| BlogPost article-end CTA | High-intent content readers convert | Low | New channel |

---

## Page-by-Page Conversion Score

| Page | Score | Primary remaining gap |
|------|-------|----------------------|
| Home | 5.5/10 | No mid-page CTA; social proof micro-bar below contrast threshold; home page ends with no button |
| /waitlist | 4.5/10 | sr-only labels; error color conflict; wrong default role; social proof below form |
| /for-dentists | 7.0/10 | Best-structured page; no ?role=dentist param on CTA; no mid-page CTA between stats and bottom |
| /features | 6.0/10 | Adequate CTAs; redundant paragraph in CTA section; no mid-page interrupt |
| /pricing | 4.5/10 | Clinic plan shows no price; "transparent pricing" headline is inaccurate; FAQ ends with no CTA |
| /about | 7.0/10 | Good structure; bottom dual-CTA correct; no peer testimonial |
| /blog | 6.0/10 | Mid-blog CTA good; newsletter exit misaligned; no persona filtering; article pages have no CTA |
| /contact | 6.0/10 | Contact form UX correct; error colors conflict; no trust signals on form card |
| 404 | 5.0/10 | On-brand; no waitlist CTA; no suggested pages; no HeroGlow |
| /blog/[slug] | 5.0/10 | Articles end with no conversion action; highest-intent pages with lowest CTA coverage |

---

## Implementation Order (Accounting for Effort)

### Execute immediately — P1 (under 35 minutes total, no design decisions required)

1. Change error color to `#F87171` — 5 minutes (Waitlist.tsx + Contact.tsx, 7 occurrences)
2. Add visible labels to waitlist form fields — 10 minutes (copy Contact.tsx pattern)
3. Change default role to "patient" + read URLSearchParams — 10 minutes
4. Update ForDentists CTA to `/waitlist?role=dentist` — 1 minute
5. Show "From €39/mo" on Pricing page Clinic plan — 5 minutes
6. Delete orphan paragraph in Home.tsx How It Works — 1 minute
7. Delete redundant CTA paragraph in Features.tsx — 1 minute
8. Remove confirmation email promise from Waitlist.tsx JSON-LD — 2 minutes
9. Fix Pricing.tsx JSON-LD "secure messaging" claim — 2 minutes

### Execute this sprint — P2 (under 3 hours total)

10. Move social proof block above role selector in Waitlist.tsx — 5 minutes
11. Add mid-page CTA between How It Works and Social Proof on Home — 20 minutes
12. Add waitlist CTA + suggested links to 404 page — 20 minutes
13. Add waitlist CTA block at end of each BlogPost article — 30 minutes
14. Add CTA after final Pricing FAQ item — 10 minutes
15. Rewrite dentist success state with clinic name echo and next-step links — 20 minutes
16. Raise home hero social proof bar to 14px, #A8B8A8, bold "30+" in lime — 10 minutes
17. Replace Blog newsletter with second waitlist CTA block (or connect to backend) — 15 minutes

### Execute next sprint — P3/P4 (require more consideration)

18. Mobile sticky CTA bar — 30-45 minutes
19. Add CTA to BlogPost end matching article persona — 30 minutes
20. Add peer testimonial from one founding clinic partner — external dependency
21. Exit-intent modal — 45-60 minutes
22. Blog persona filtering tabs — 60 minutes
23. Inline hero form (email + role) — 90 minutes

---

*Source reviewed: client/src/pages/ (12 files), client/src/components/Navbar.tsx, client/src/components/Footer.tsx. No live session recording data. Scroll depth figures are predictive estimates based on content density and published conversion benchmarks. All code references verified against current branch (fix/final-launch-audit). Backend/form data persistence excluded per scope — addressed separately.*
