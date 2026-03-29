# Conversion UX Audit — Perioskoup Landing Page
**Date:** 2026-03-06
**Auditor role:** Conversion Rate Optimization Specialist
**Site:** https://official-perioskoup.vercel.app
**Primary goal:** Waitlist signups from dentists
**Secondary goal:** Waitlist signups from patients

---

## Overall Score: 6.4 / 10

Strong visual identity, clear persona segmentation, and solid accessibility groundwork are real assets. The blocking issue is that **both forms are purely cosmetic** — they perform no real data capture. Every other conversion problem below is secondary to that.

---

## Critical Bug — Forms Do Not Submit Data

**Severity: P0 — Launch Blocker**

**Files:** `client/src/pages/Waitlist.tsx:36-43`, `client/src/pages/Contact.tsx:34-41`

Both forms call `setSubmitted(true)` / `setSent(true)` on valid input and do nothing else. There is no `fetch`, `axios`, or third-party form provider call (Formspree, Formspark, Resend, etc.). The user sees a success state but their data goes nowhere.

```
// Waitlist.tsx line 40-42
if (Object.keys(errs).length === 0) {
  setSubmitted(true);  // <-- no API call, no data captured
}
```

**Impact:** Every dentist and patient who submits the waitlist form is silently lost. This makes the entire waitlist a fiction.

**Fix wireframe:**
```
handleSubmit
  -> validate
  -> setLoading(true)
  -> fetch('/api/waitlist', { method: 'POST', body: JSON.stringify(formData) })
     OR Formspree endpoint
  -> on success: setSubmitted(true)
  -> on error: setErrors({ _form: 'Something went wrong. Please try again.' })
  -> setLoading(false)
```

The submit button must also show a loading state while the network request is in flight and must be disabled to prevent double-submission.

---

## Section 1 — Primary CTA Visibility

**Score: 7 / 10**

### What works
- "Join Waitlist" pill is persistent in the desktop navbar (Navbar.tsx:136-139).
- Hero CTA pair is above the fold on all screen sizes: `Join the Waitlist` (primary) + `For Clinicians` (secondary), Home.tsx:116-124.
- Every page ends with a dedicated CTA section pointing to `/waitlist`.
- ForDentists.tsx has a closing bottom CTA section (line 258-282) with correct primary/ghost button pairing.

### Issues

**Issue 1.1 — Mobile navbar has no CTA button** (Navbar.tsx:141-160)
The `btn-primary` pill in the navbar is `hidden md:inline-flex`. On mobile, the only path to the form is through the hamburger menu, which adds 2 taps. The hamburger menu does contain the CTA (Navbar.tsx:263-265), but it is the last item in a long link list.

**Fix:** Add a small lime-green "Join" button to the mobile header bar beside the hamburger, or move the CTA link to the top of the mobile drawer list.

**Issue 1.2 — Home page has no mid-page CTA (above the fold-two)**
After the hero, the page flows: ticker → EFP award card → Features → What is an AI dental companion → How It Works → Dr. Anca quote → Footer. There is no CTA between the hero and the footer. A user who scrolls past the hero on Home has no invitation to sign up until they leave.

**Fix — wireframe:**
```
[Hero]
[Ticker]
[EFP Award Card]
[Features]
  → Insert: "Ready to join?" mini-CTA bar
      "30+ founding clinics on the list. Spots are limited."
      [Join the Waitlist →] [See Pricing]
[What is an AI Companion?]
[How It Works]
[Dr. Anca Quote]
  → Insert: footer CTA section (already on other pages, missing here)
[Footer]
```

**Issue 1.3 — Features page CTA section has duplicate `p` blocks** (Features.tsx:139-145)
```tsx
<p style={{ ... }}>Join 30+ founding clinics...</p>
<p className="body-lg reveal" style={{ marginBottom: "36px", ... }}>
  Join the founding waitlist and be among the first...
</p>
```
Two consecutive paragraphs both introduce the same CTA. They dilute each other. Pick one and remove the other.

**Issue 1.4 — Pricing page has no page-bottom CTA**
After the FAQ accordion (Pricing.tsx:160-183) the page goes directly to `<Footer>`. There is no invitation to act after overcoming objections. This is the page where dentists make their decision.

**Fix wireframe:**
```
[FAQ section ends]
[Bottom CTA section]
  Headline: "Founding spots are limited."
  Sub: "Public launch March 2026. Founding clinics get locked-in pricing."
  [Apply as a Founding Clinic →] [Talk to the Team]
[Footer]
```

---

## Section 2 — Waitlist Form UX

**Score: 5 / 10**

**File:** `client/src/pages/Waitlist.tsx`

### Field inventory (dentist mode): 5 fields
1. First name (required)
2. Last name (required, but NOT validated — see Issue 2.1)
3. Email (required, validated)
4. Clinic / Practice name (required)
5. City, Country (optional)

### Field inventory (patient mode): 3 fields
1. First name
2. Last name
3. Email

### What works
- Role selector with `aria-pressed` is a clean UX pattern. Dentist/patient switching without a page reload is conversion-friendly.
- Validation fires on submit, not on blur, which avoids premature error anxiety.
- `aria-invalid`, `aria-describedby`, and `role="alert"` on error messages are correct WCAG 4.1.2 implementations.
- Success state has `role="status"` and `aria-live="polite"` (Waitlist.tsx:81).
- "No credit card" and "GDPR compliant" micro-trust icons below the submit button (Waitlist.tsx:157-166) are well-placed.

### Issues

**Issue 2.1 — Last name is never validated**
`waitlist-last-name` is marked `required` in HTML and has `aria-required="true"` (Waitlist.tsx:137) but the `validate()` function (lines 22-33) never checks it. A user can leave it blank and the form submits.

**Fix:** Add to `validate()`:
```ts
const lastName = (form.elements.namedItem("waitlist-last-name") as HTMLInputElement)?.value.trim();
if (!lastName) errs["waitlist-last-name"] = "Last name is required.";
```
Also add `aria-describedby` and the error span for `waitlist-last-name`.

**Issue 2.2 — Labels are screen-reader-only, placeholders carry all visible context**
All labels use `className="sr-only"` (Waitlist.tsx:131, 136, 140, 145, 148). Sighted users rely entirely on placeholder text, which disappears on focus. This is standard placeholder-as-label anti-pattern. When a user tabs through the form, focused fields show a blank input with no visible label.

**Fix:** Display visible labels above each field. The Contact form (Contact.tsx:159-164) correctly shows visible labels — apply the same pattern to Waitlist.

**Issue 2.3 — Error messages use lime (#C0E57A) on dark background**
Error states display in `color: "#C0E57A"` (Waitlist.tsx:133). Lime on near-black reads as success or accent, not as an error. Standard error color is red or amber. Accessibility aside, the color creates cognitive confusion — the same accent used for CTAs signals a problem.

**Fix:** Use `color: "#F87171"` (a desaturated red) for errors. Update the `role="alert"` spans across Waitlist and Contact.

**Issue 2.4 — No loading/submitting state on the submit button**
The button shows "Join the Waitlist" before and after click. Once the network call is added (Issue P0), the button must reflect in-flight state. Currently there is no `disabled` prop or label change in the button (Waitlist.tsx:152-155).

**Fix wireframe:**
```tsx
<button
  type="submit"
  className="btn-primary"
  disabled={isSubmitting}
  style={{ justifyContent: "center", marginTop: 8, opacity: isSubmitting ? 0.7 : 1 }}
>
  {isSubmitting ? "Joining..." : "Join the Waitlist"}
  {/* spinner or arrow icon */}
</button>
```

**Issue 2.5 — Success state has no next step**
The success screen (Waitlist.tsx:80-90) says "You're on the list!" and offers one action: "Back to Home." For dentists, this is a dead end. A dentist who just joined wants to share with colleagues, bookmark the site, or read more.

**Fix wireframe — Dentist success state:**
```
[Checkmark circle]
"You're on the list — founding clinic confirmed."
"We'll reach out within 48 hours with onboarding details."
[Share with a colleague]   (mailto: link)
[Read what founding clinics get →]  (links to /for-dentists#founding)
[Back to Home]
```

**Issue 2.6 — No scarcity or urgency on the form page itself**
The form page's hero says "Be among the first to experience Perioskoup." The social proof block below the form shows "30+ founding clinics" and "EFP Award 2025" (Waitlist.tsx:170-182). However there is no communication of a cap or closing date.

**Fix:** Add one line below the role selector: "Founding clinic spots: 30 of 50 filled. March 2026 launch." This is honest (30 clinics are confirmed) and creates genuine urgency.

**Issue 2.7 — Patient value proposition is thin**
The patient role card says "Free access to the app" (Waitlist.tsx:121). That is the only patient-specific value statement on the entire page. The page is written for dentists. A patient landing here via organic search has no reason to feel this is for them.

**Fix:** Add a short patient-specific section or at least expand the patient card:
```
Patient card subtitle:
"Free access to the app"
→ "Track your dental habits, follow your dentist's care plan, 
   and get AI-powered guidance — free, forever."
```

---

## Section 3 — Trust Signals and Social Proof

**Score: 7.5 / 10**

### What works
- EFP Award badge appears in: Home hero, Home EFP card section, ForDentists hero, Pricing hero, Footer. Good saturation.
- Dr. Anca's quote appears in: Home hero (blockquote), Home social proof section, ForDentists, About. Repeated correctly.
- Research citations with DOI links (ForDentists.tsx:136-138) are an unusual and credible choice for a dental professional audience. This is a genuine differentiator.
- "30+ founding clinics" appears in all the right places: navbar CTA context, waitlist page, Features CTA, ForDentists hero.
- GDPR / EU storage indicators appear at both the form level (Waitlist.tsx:157-165) and in FAQ answers.
- Team photos with real LinkedIn links (About.tsx:282-285) add genuine credibility.

### Issues

**Issue 3.1 — EFP Award is "3rd Prize" but this is never stated**
The EFP badge, the EFP card, and all copy say "EFP Digital Innovation Award Winner 2025" or "3rd Prize" only in structured data (About.tsx personJsonLd). The user-facing claim is "Winner" without the placement. The EFP announcement page shows it is 3rd Prize among three awards. A dental professional audience will verify this and may consider the omission misleading.

**Fix:** Update the badge text to "EFP Digital Innovation Award 2025 · 3rd Prize" or "EFP Award Finalist & 3rd Prize 2025." This is still strong social proof and is more defensible.

**Issue 3.2 — Dr. Anca quote is founder testimony, not third-party validation**
The most prominent quote on Home ("The app I always wished I could prescribe to my patients.") is from Dr. Anca, who is also CEO. In the context of social proof this carries less weight than it would from an independent clinician.

**Fix:** If any of the 30+ founding clinic dentists will provide a short testimonial quote, replace or supplement this with third-party voice. Even an anonymous attribution ("Periodontist, Bucharest") is more credible than founder self-citation.

**Issue 3.3 — "30+ founding clinics" is static and unsubstantiated**
The number appears repeatedly but there are no clinic names, logos, or any indicator of who they are. A skeptical dentist reading this cannot verify the claim.

**Fix options (pick one):**
- Show 3-4 anonymized clinic descriptions: "Private periodontal practice, Madrid" with a quote.
- Show 2 logos of clinics that have agreed to be named.
- Change the language to "Beta community of 30+ clinics" which is slightly softer but no less true.

**Issue 3.4 — GDPR / data security trust signals are buried in FAQ**
Dentists considering joining a platform that will hold patient engagement data need to see GDPR/EU storage above the fold on the ForDentists page, not just in a FAQ answer. Data sovereignty is an objection for clinical purchasers.

**Fix:** Add a trust bar on ForDentists.tsx between the stats section and the Dr. Anca quote:
```
[GDPR Badge]  EU data storage
[Lock icon]   End-to-end encryption  
[Shield]      No patient data sold, ever
[Check]       Right to erasure built in
```

---

## Section 4 — Navigation and IA Logic

**Score: 7 / 10**

### What works
- NAV_LINKS order (Features, For Dentists, Pricing, About, Blog, Contact) puts the dentist-specific path second, which is correct for the primary persona.
- `aria-current="page"` is implemented (Navbar.tsx:125-126).
- Mobile drawer has focus trap, Escape close, and scroll lock (Navbar.tsx:51-84).
- Breadcrumbs are present on all secondary pages.
- Footer organizes links into Product / Company / Legal columns — standard and correct.

### Issues

**Issue 4.1 — "For Dentists" is the primary conversion page but it is second in the nav**
Dentists are the revenue persona. "For Dentists" should be first or given visual prominence (e.g., a subtle lime underline). Currently "Features" leads the nav which is more patient-facing.

**Fix:** Reorder to: `For Dentists | Features | Pricing | Blog | About | Contact`. Or keep current order but style "For Dentists" with a lime dot indicator.

**Issue 4.2 — No "For Patients" nav item**
Patients are secondary persona. The nav has no patient-facing entry point except the generic "Features" page. A patient landing on the home page via a dentist referral sees a nav that doesn't speak to them.

**Fix:** Add a "For Patients" item, or combine into a "Who it's for" dropdown: `[For Dentists] [For Patients]`.

**Issue 4.3 — Contact page is in primary nav but adds no conversion value**
Contact is in the main navigation at position 6. For a pre-launch waitlist site, this dilutes the primary CTA. Contact is typically a footer-only or secondary item at this stage.

**Fix:** Remove Contact from primary nav. Keep it in the footer. Replace the slot with "For Patients" or use the space to make "Join Waitlist" more prominent.

**Issue 4.4 — No persistent/sticky secondary CTA on long pages**
ForDentists.tsx is the longest page (8 sections). After scrolling through stats, Dr. Anca quote, clinical tools, and competitive positioning, there is no in-page reminder to act until the final CTA section. A dentist reading at section 5 (Competitive Positioning) has no CTA visible.

**Fix:** Consider a floating "Apply as a Founding Clinic" pill that appears after 50% scroll depth on the ForDentists page, or anchor links in a sticky sub-nav.

---

## Section 5 — Objection Handling

**Score: 7.5 / 10**

### What works
- ForDentists.tsx "Problem-First" section (lines 111-129) pre-empts the "why do I need this?" objection with research-backed copy.
- "Not another PMS plugin" section (ForDentists.tsx:238-255) directly addresses the "I already have software" objection.
- FAQ sections on Pricing and ForDentists answer the medical device / GDPR / cost objections.
- "Every €1 invested in prevention saves €8-50" ROI framing in ForDentists CTA (line 270) is a strong economic objection handler.

### Issues

**Issue 5.1 — No objection handling for "this is pre-revenue, are you real?"**
A dentist considering a founding clinic commitment is being asked to trust a bootstrapped Romanian startup that launched in June 2025. The site has no company registration mention, no physical address, no "as seen in" press mentions. The EFP Award is the strongest credibility signal but it needs reinforcement.

**Fix:** Add to the ForDentists page or About page:
- "Perioskoup SRL — registered Romania, June 2025"
- Any press coverage or podcast mention
- LinkedIn company page link (the JSON-LD has it, but it's not surfaced in the UI)

**Issue 5.2 — Pricing objection is not fully resolved on the Pricing page**
The Clinic plan shows "Coming soon" as the price. Dentists who visit the Pricing page specifically want to understand cost. Sending them to the waitlist without any pricing signal (even a range like "€39-199/mo launching March 2026") reduces dentist conversion from this high-intent page.

**Fix:** Show the pricing range as a teaser with "Founding clinic pricing locked below this range" message. This sets expectation and creates urgency simultaneously.

**Issue 5.3 — Integration/onboarding objection not answered**
ForDentists workflow section (lines 209-236) says "no hardware, no software migration, no training days" but gives no detail. A clinic manager reading this thinks "but how does my receptionist use it?"

**Fix:** Add one concrete workflow step: "Takes 4 minutes to set up your first patient plan. Web-based — works on any browser, no app install for the dentist."

---

## Section 6 — Hero and Above-the-Fold Effectiveness

**Score: 7.5 / 10**

**File:** `client/src/pages/Home.tsx:69-143`

### What works
- Headline "Between visits, we take over." is clear, differentiated, and memorable. It communicates the between-visit angle immediately.
- EFP badge above the headline establishes credibility before the value proposition. Correct placement.
- Hero subhead (line 101-103) specifies the product: "AI dental companion app — personalised guidance, habit tracking, and a direct line to your clinic." This is concrete.
- Phone mockup in the right column gives product tangibility without requiring a full demo.
- Dr. Anca blockquote in the hero grounds the product in clinical reality.
- Two CTAs with clear hierarchy: primary (lime) + ghost (border).

### Issues

**Issue 6.1 — Hero does not specify the target persona**
"Between visits, we take over" is persona-agnostic. A patient and a dentist both read this and neither is certain it is for them. The subhead clarifies, but only if the user reads it.

**Fix:** Add a secondary line or badge: "Built for dental clinics and their patients." This 6-word addition eliminates ambiguity for both personas above the fold.

**Issue 6.2 — Hero CTA gap between button row and phone mockup on mobile**
On mobile, the layout is single-column: headline → subhead → quote → CTAs → phone mockup. The phone mockup renders below the fold on most phones (given the quote's height). The user's first scroll brings them to the ticker, not to the product visual.

**Fix:** On mobile, move the phone mockup above the Dr. Anca quote, or replace it with a static screenshot that loads lighter and sits immediately below the CTA row. The quote can move to a section below the fold.

**Issue 6.3 — Dr. Anca quote in the hero pushes the CTA down**
The blockquote (Home.tsx:106-113) is 5 lines tall and sits between the subhead and the CTA buttons. On a 375px screen, this moves the primary CTA below the fold.

**Fix:** Move the quote to an element below the hero fold. Keep the CTA row at the top of the hero content stack: `Headline → Subhead → [CTA row]`, and let the quote appear after first scroll.

**Issue 6.4 — Ken Burns animation on hero background runs at full intensity**
`ken-burns` runs a 24-second 10% scale and 2% pan (index.css:214-220). On a background image with busy content (hero-bg.webp), this can interfere with text legibility. It is correctly disabled for `prefers-reduced-motion`.

**Fix:** Reduce scale range from 1.0→1.1 to 1.0→1.04 and reduce pan from 2% to 0.8%. This preserves the cinematic feel without threatening contrast on the text.

---

## Section 7 — Mobile Conversion Path

**Score: 6 / 10**

### What works
- Mobile drawer is full-screen with large touch targets (Dongle font at 36-48px, Navbar.tsx:242).
- Focus trap and scroll lock on mobile drawer are correctly implemented.
- `btn-primary` inside the drawer is full-width and uses `padding: "16px 24px"` (Navbar.tsx:264), a good 44px minimum touch target height.
- All `p-input` fields use `padding: 14px 18px` which meets minimum touch target.

### Issues

**Issue 7.1 — No mobile CTA in the fixed navbar (already noted in 1.1)**

**Issue 7.2 — Role selector buttons on Waitlist are 20px padded, which is marginal on mobile**
The dentist/patient selector buttons use `padding: 20` (Waitlist.tsx:112) but the content inside is small (16px label + 13px sub). On a 375px screen these render as roughly 80px height, which is fine. However they sit in a 2-column grid on `sm:` breakpoint. On screens below 640px they stack, which is correct. No change needed.

**Issue 7.3 — Home hero phone mockup disrupts mobile scroll path**
The phone mockup (`max-w-[300px]`) renders below the hero text on mobile. It consumes significant vertical space before the user reaches the EFP Award section, which is real social proof. Users may scroll through phone chrome thinking it is a decorative element.

**Fix:** On mobile (`< lg`), hide the phone mockup completely. The hero copy + CTA is sufficient. The mockup is most valuable on desktop where it sits beside the text.

**Issue 7.4 — Waitlist page social proof block (30+ founding clinics) renders below the form on mobile**
The form is the conversion point. The social proof that reinforces the decision (Waitlist.tsx:170-182) is below it. On mobile this means the trust signals load after the user has already decided to leave or stay.

**Fix:** Move the social proof block above the form on mobile. At `< sm` breakpoint, render the stats row before the form section.

**Issue 7.5 — No sticky bottom CTA bar on mobile for long pages**
ForDentists.tsx is 8 sections with no CTA until the final section. A dentist on mobile scrolling through clinical tools has to scroll back to the top or to the end to act.

**Fix:** Add a sticky bottom bar on mobile that appears after 30% scroll: `[Apply as a Founding Clinic →]` fixed to the bottom of the viewport. This pattern is standard for mobile B2B SaaS and significantly reduces scroll-to-conversion distance.

---

## Section 8 — Secondary CTAs

**Score: 7 / 10**

### What works
- "For Clinicians" ghost button in Home hero (line 121-123) correctly routes dentists.
- "See All Features" ghost button in ForDentists hero (line 104-106) gives dentists a research path.
- "Talk to the Team" ghost button in ForDentists CTA (line 277-279) gives enterprise/hesitant dentists an off-ramp without losing them.
- Contact page is a proper form with role selector and clinic-specific email shown.

### Issues

**Issue 8.1 — Contact page form does not submit data either**
Contact.tsx:34-41 has the same pattern as Waitlist — `setSent(true)` with no network call. A dentist who prefers to talk rather than join a waitlist also has no path to reaching the team. This is a second data-loss point.

**Issue 8.2 — "Talk to the Team" button on ForDentists CTA (line 277) links to /contact but the contact form is non-functional**
This compiles the P0 bug: a dentist clicks "Talk to the Team" → fills contact form → submits → sees success state → but data never arrives.

**Issue 8.3 — No phone number or direct calendar link**
For a product selling to dental clinics at €39-199/mo, dentists expect a Calendly link or a direct email address. The contact page shows `hello@perioskoup.com` and `clinic@perioskoup.com` as text (Contact.tsx:127-129) but the email addresses are not `mailto:` links. A dentist on mobile cannot tap to email.

**Fix:** Wrap email addresses in `<a href="mailto:clinic@perioskoup.com">` and add a Calendly link for founding clinic discovery calls.

---

## Section 9 — Scroll Depth Drop-off Predictions

**Based on page structure analysis:**

**Home page predicted drop-off:**
- 0-20%: Hero (high retention — strong headline, visual interest)
- 20-35%: Ticker + EFP Award Card (moderate — compelling but long)
- 35-55%: Features bento grid (moderate retention, good visual density)
- 55-70%: "What is an AI dental companion?" section (HIGH DROP-OFF RISK — this is a text-heavy explanatory section with no visual relief and no CTA. Users who are not already curious will leave here.)
- 70-85%: How It Works circles (moderate — visual interest resumes)
- 85-100%: Dr. Anca quote → Footer (low retention — page ends cold with no CTA section)

**ForDentists page predicted drop-off:**
- 0-25%: Hero + Problem-First (high retention — dentists are in their problem space)
- 25-40%: Stats section (high — research citations resonate with clinicians)
- 40-55%: Dr. Anca quote (moderate)
- 55-70%: Clinical Tools (moderate — feature detail can feel long)
- 70-85%: Workflow section (high — dentists want operational clarity)
- 85-95%: Competitive positioning (moderate)
- 95-100%: CTA section (good — but reached by fewer users than optimal)

**Waitlist page predicted drop-off:**
- 0-50%: Hero + role selector + form (primary action zone — low drop-off if user intended to convert)
- 50-70%: Form submission attempt (likely drop-off point where bugs or form friction surfaces)
- 70-100%: Social proof block (low — most users have already decided by here)

---

## Section 10 — Exit Intent and Last Seen Content

**Score: 5 / 10**

**Issues:**

**Issue 10.1 — Home page exit intent is the footer, not a CTA**
The last visible element before the footer on Home is the Dr. Anca quote section (Home.tsx:337-354). There is no page-bottom CTA. A user who has scrolled the full home page and not converted sees the footer's link columns. This is a passive exit.

**Issue 10.2 — No exit intent mechanism**
There is no exit intent modal, no scroll-depth triggered overlay, and no email capture gate. For a waitlist-mode SaaS site, some form of "before you go" prompt is standard. This is not strictly required but represents a missed recovery opportunity.

**Issue 10.3 — Footer has no CTA**
The footer (Footer.tsx) has logo, description, link columns, and copyright. There is no CTA button or inline signup form. For a pre-launch waitlist site the footer should end with a mini CTA section above the legal links.

**Fix wireframe — Footer CTA section above the current grid:**
```
[SECTION — background: #0D1F2A]
  "Still thinking? Join 30+ founding clinics."
  [Email input] [Join Waitlist]
  "No credit card. GDPR compliant. Cancel any time."
```

**Issue 10.4 — 404 page only offers "Back to Home"** (NotFound.tsx:33-37)
A user landing on a 404 has lost their intended destination. The only recovery path is the home page. The page could offer: "Were you looking for: Features | For Dentists | Waitlist?"

**Fix wireframe:**
```
[404 large number — current]
[Headline: "Page not found" — current]
[Body text — current]
[Row: Back to Home | Join Waitlist | For Dentists]
```

---

## Section 11 — Form Accessibility

**Score: 7.5 / 10**

### What works
- `aria-invalid`, `aria-describedby`, `aria-required` are present on all validated fields.
- `role="alert"` on error message spans ensures screen readers announce errors on change.
- `role="status"` + `aria-live="polite"` + `aria-atomic="true"` on success state (Waitlist.tsx:81).
- `role="group"` + `aria-label="Select your role"` on the role selector (Waitlist.tsx:104).
- `aria-pressed` on role toggle buttons correctly communicates selection state.
- `focus-visible` ring is globally defined in CSS (index.css:181-184) using the brand lime (#C0E57A).
- `skip-link` is correctly implemented (App.tsx:113, index.css:136-153).
- Route announcer for SPA navigation (App.tsx:49-76) is a sophisticated and correct WCAG 4.1.3 implementation.

### Issues

**Issue 11.1 — Labels are sr-only on Waitlist form (already noted in Issue 2.2)**
This is an accessibility failure as well as a UX issue. WCAG 1.3.1 and 3.3.2 require that form inputs have visible labels. Placeholders alone do not satisfy this requirement because they disappear on focus.

**Issue 11.2 — Contact page last-name field has no error validation span**
Contact.tsx:164-166: `waitlist-last-name` equivalent has no `aria-invalid`, `aria-describedby`, or error span despite being `required`.

**Issue 11.3 — Select dropdown has no visible dropdown indicator**
`p-select` uses `appearance: none` (index.css:875) which removes the native chevron arrow. No custom chevron is added in CSS or the component. Sighted users cannot tell this element is a dropdown without clicking on it.

**Fix:** Add a background-image chevron or a CSS pseudo-element to the `.p-select` rule.

**Issue 11.4 — Error color is ambiguous (#C0E57A = lime = same as success/CTA)**
Already noted in Issue 2.3. From an accessibility standpoint, using the brand accent color for errors violates WCAG 1.4.1 (Use of Color) if error state is only communicated via color. The `role="alert"` text message partially remedies this, but the visual signal remains confusing.

---

## Section 12 — Page Load and Performance (Structural Only)

**Score: 8 / 10**

### What works
- Route-level code splitting via `React.lazy` (App.tsx:10-20). Home loads immediately, all other pages are lazy.
- LCP image has `fetchPriority="high"` and correct `width/height` attributes (Home.tsx:72).
- Self-hosted WOFF2 fonts with `font-display: swap` (index.css:28-72). No Google Fonts network round-trip.
- `loading="lazy"` on all non-LCP images.
- `prefers-reduced-motion` guard on all animations (index.css:1105-1177).
- `will-change: auto` used sparingly — only where compositing is known to help.

### Issues

**Issue 12.1 — Suspense fallback is a blank div**
`<Suspense fallback={<div className="min-h-screen bg-[#0A171E]" />}>` (App.tsx:83). A blank navy screen for 200-400ms on slower connections is jarring. A skeleton that approximates the navbar and hero would reduce perceived load time.

**Issue 12.2 — Five simultaneous CTA orbs with `filter: blur(80px)` on the CTA section**
`.cta-orb--1` through `.cta-orb--5` all use `filter: blur(80px)` (index.css:403). Blur filter requires a compositor layer even without `will-change`. Five blurred elements animating simultaneously is a significant GPU cost on mid-range mobile. The comment in the CSS acknowledges this tradeoff but for a conversion-critical CTA section, stutter directly reduces button click rate.

**Fix:** Reduce to 2-3 orbs, or replace them with a static radial-gradient background without filter:blur.

---

## Score Summary

| Dimension | Score | Primary Issues |
|---|---|---|
| Form functionality | 0 / 10 | P0: No data submission on either form |
| CTA visibility | 7 / 10 | No mid-page CTA on Home; no mobile navbar CTA |
| Form UX | 5 / 10 | sr-only labels; unvalidated last-name; error color |
| Trust signals | 7.5 / 10 | "3rd Prize" not disclosed; testimonials founder-only |
| Navigation/IA | 7 / 10 | No patient nav item; Contact in primary nav |
| Objection handling | 7.5 / 10 | No pricing signal on Pricing; no company credibility |
| Hero effectiveness | 7.5 / 10 | CTA pushed below fold on mobile by Dr. Anca quote |
| Mobile conversion | 6 / 10 | No sticky CTA; social proof below form |
| Secondary CTAs | 7 / 10 | Emails not mailto: links; no calendar link |
| Exit intent | 5 / 10 | No footer CTA; no mid-page re-engagement |
| Form accessibility | 7.5 / 10 | sr-only labels; ambiguous error color; no select chevron |
| Performance | 8 / 10 | Blank suspense fallback; excessive blur orbs |
| **OVERALL** | **6.4 / 10** | |

---

## Priority Fix Order

### P0 — Before any traffic is sent (data loss)
1. `Waitlist.tsx:36-43` — Connect form to backend or third-party form provider (Formspree, Formspark, Resend webhook). Add loading state and error handling.
2. `Contact.tsx:34-41` — Same as above.
3. `Contact.tsx:127-129` — Wrap email addresses in `<a href="mailto:...">`.

### P1 — This week (conversion blockers)
4. `Home.tsx` — Add mid-page CTA section and a page-bottom CTA section.
5. `Pricing.tsx` — Add page-bottom CTA section after FAQ.
6. `Navbar.tsx` — Add CTA to mobile navbar bar (beside hamburger).
7. `Waitlist.tsx:22-33` — Add last-name validation and error span.
8. `Waitlist.tsx:131-148` — Replace sr-only labels with visible labels.
9. `Waitlist.tsx:133,142,147` — Change error color from lime to red (#F87171).
10. `Waitlist.tsx:152-155` — Add submitting/loading state to submit button.
11. `Waitlist.tsx:80-90` — Expand success state with next steps and sharing option.

### P2 — This sprint (trust and conversion lift)
12. All EFP Award references — Add "3rd Prize" to the badge and copy.
13. `ForDentists.tsx` — Add GDPR/security trust bar between stats and Dr. Anca quote.
14. `ForDentists.tsx` — Add mobile sticky bottom CTA appearing at 50% scroll.
15. `Waitlist.tsx:99-101` — Add scarcity line: "30 of 50 founding clinic spots filled."
16. `Footer.tsx` — Add mini CTA section above the link columns.
17. `NotFound.tsx:33-37` — Add Waitlist and For Dentists quick links.
18. `index.css:875` — Add chevron indicator to `.p-select`.
19. `Waitlist.tsx:170-182` — Move social proof above the form on mobile breakpoints.
20. `Home.tsx:106-113` — Move Dr. Anca quote below hero fold; keep CTAs immediately below subhead.

### P3 — Next sprint (optimization)
21. `Navbar.tsx:14-21` — Reorder to: For Dentists first; remove Contact from primary nav.
22. Add "For Patients" page or section.
23. Add third-party testimonials from founding clinic dentists.
24. Add Calendly link for founding clinic discovery calls.
25. Add company details (SRL registration) to About or Contact page for credibility.
26. `App.tsx:83` — Replace blank Suspense fallback with a skeleton loader.
27. `index.css:410-440` — Reduce CTA orb count from 5 to 2 for mobile performance.

---

## Appendix — Wireframe Sketches (Text Format)

### A. Waitlist Page Revised Layout (Mobile)

```
┌─────────────────────────────────┐
│ [Navbar]                        │
├─────────────────────────────────┤
│ Early Access                    │
│ Join the founding waitlist.     │
│ Patients free. Clinics get      │
│ founding partner pricing.       │
│                                 │
│ ┌─────────┐ ┌───────────────┐  │
│ │ 30+     │ │ EFP Award     │  │
│ │ clinics │ │ Winner 2025   │  │  ← social proof ABOVE form
│ └─────────┘ └───────────────┘  │
│                                 │
│ 30 of 50 founding spots filled  │  ← scarcity
│                                 │
│ [I am a Dentist / Clinic] [tab] │
│ [I am a Patient]          [tab] │
│                                 │
│ [First name     ] [Last name  ] │
│ [Email address               ]  │
│ [Clinic name  (dentist only) ]  │
│ [City, Country (dentist only)]  │
│                                 │
│ [    Join the Waitlist  →     ] │  ← full width primary
│                                 │
│  🔒 No credit card  🛡 GDPR    │
│                                 │
│ [Footer]                        │
└─────────────────────────────────┘
```

### B. Home Page Mid-Page CTA Bar

```
┌─────────────────────────────────────────────────────────┐
│  background: rgba(192,229,122,0.04)                     │
│  border-top/bottom: 1px solid rgba(192,229,122,0.12)    │
│                                                         │
│  "30+ founding clinics are already on the list."        │
│  "Spots are limited before March 2026 launch."          │
│                                                         │
│  [Join the Waitlist →]   [See Pricing]                  │
└─────────────────────────────────────────────────────────┘
```

### C. Footer CTA Addition

```
[Above the current footer grid:]
┌─────────────────────────────────────────────────────────┐
│  background: #0D1F2A                                    │
│  border-top: 1px solid #1D3449                         │
│                                                         │
│  Still thinking?                                        │
│  "Join the founding waitlist. Free for patients.        │
│   Founding pricing for clinics."                        │
│                                                         │
│  [Email input field          ] [Join Waitlist]          │
│  🔒 No credit card · 🛡 GDPR · EU data storage        │
└─────────────────────────────────────────────────────────┘
[Then existing footer grid]
```

### D. Mobile Sticky Bottom CTA (ForDentists page)

```
┌─────────────────────────────────┐
│ (page content scrolls above)    │
│                                 │
├─────────────────────────────────┤  ← fixed bottom bar, appears at 50% scroll
│ background: rgba(10,23,30,0.96) │
│ border-top: 1px solid #C0E57A  │
│                                 │
│ [Apply as a Founding Clinic  →] │  ← full width btn-primary
└─────────────────────────────────┘
```

