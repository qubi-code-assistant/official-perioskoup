# Perioskoup WCAG 2.1 AA Accessibility Audit

**Date:** 2026-03-06
**Auditor:** WCAG 2.1 AA Specialist Subagent
**Scope:** Full SPA — all pages, components, CSS, HTML shell
**Evidence type:** Design-time risk (static source analysis + contrast calculation). Runtime screen-reader and keyboard testing not performed; all issues are reproducible from source code inspection.
**Conformance note:** This report provides accessibility conformance guidance against WCAG 2.1 Level A and AA. It does not constitute a legal conformance certification.

---

## Score: 6.5 / 10

The site has a solid accessibility foundation: skip link, route announcer, focus-visible CSS, reduced-motion support, drawer focus trap, ARIA roles on the mobile nav, form labels, and live regions for form feedback. However, several confirmed conformance gaps remain — including a structural landmark issue that affects every page, two failing contrast values, missing `autocomplete` tokens on all forms, and a handful of ARIA/semantic issues.

---

## A) Audit Summary

| Category | Status | Critical Gaps |
|---|---|---|
| Color contrast | Mostly pass | 2 failures |
| Keyboard navigation | Good | Link-wrapping `<span>` pattern needs review |
| Focus indicators | Good | Present everywhere via CSS |
| Skip link | Pass | Present and functional |
| Landmark regions | Fail | No `<main>` landmark anywhere |
| Form labels | Good | Missing `autocomplete` on all inputs |
| ARIA | Good | Minor issues |
| Screen reader flow | Partial | No `<main>`; `id="main-content"` on `<section>` |
| Images / alt text | Good | Hero bg alt on decorative `<img>` is non-empty |
| Reduced motion | Pass | Comprehensive |
| Zoom / reflow | Good | Responsive design in place |
| Touch targets | Pass | Buttons ≥ 44×44px |
| Live regions | Good | Route announcer + form feedback |
| Heading hierarchy | Mostly good | Minor issues on a few pages |

---

## B) Findings Table

| ID | Severity | WCAG SC | Component / File | Issue |
|---|---|---|---|---|
| A01 | **Blocker** | 1.3.1, 4.1.2 | All pages | No `<main>` landmark — `id="main-content"` is on a `<section>` |
| A02 | **High** | 1.4.3 | All cards (.card) | `#8C9C8C` on `#1D3449` = 4.42:1 — fails AA for normal-size body text |
| A03 | **High** | 1.4.3 | Breadcrumb.tsx | Separator `#4A5E6A` on `#0A171E` = 2.69:1 — fails for any size |
| A04 | **High** | 1.3.5 | Waitlist.tsx, Contact.tsx, Blog.tsx | All `<input>` and `<select>` fields are missing `autocomplete` attributes |
| A05 | **High** | 4.1.2 | Navbar.tsx | Logo `<Link>` wraps `<div>` with `aria-label`; link label "Perioskoup home" is on the `<Link>`, but Wouter renders the anchor wrapping a `<div>` — interactive content is a `<div>` not a phrasing element |
| A06 | **Medium** | 1.3.1 | Home.tsx, Features.tsx | Feature card icons in bento grid have no `aria-label` on the SVG icon container — SVGs are `aria-hidden` but the icon `<div>` wrapper is not labelled, meaning the feature title alone must carry all meaning (it does — minor) |
| A07 | **Medium** | 4.1.3 | Contact.tsx | Form success state uses `role="status"` / `aria-live="polite"` but is inside the card that gets replaced — the live region must be present in the DOM before content changes to fire |
| A08 | **Medium** | 4.1.3 | Waitlist.tsx | Same issue as A07 — success state replaces the form entirely; the `role="status"` div is newly mounted, not pre-existing |
| A09 | **Medium** | 1.3.1 | Home.tsx:194 | Hero `<img>` for the background has alt `"Perioskoup dental companion app hero"` — it is a **decorative** photographic background and should have `alt=""` plus `aria-hidden="true"` |
| A10 | **Medium** | 2.4.6 | Blog.tsx | Newsletter `<input>` has no visible label — only a `.sr-only` `<label>`. WCAG 2.4.6 recommends visible labels for inputs that are not part of a self-explanatory icon-only context |
| A11 | **Medium** | 1.3.1 | Home.tsx:193 | `<p-select>` default text color `#8C9C8C` on `#1D3449` = 4.42:1; fails AA for 14px normal-weight text |
| A12 | **Medium** | 3.3.2 | Waitlist.tsx:137 | `waitlist-last-name` input has no `aria-invalid` or `aria-describedby` on error — validation for last name is not surfaced (`required` on HTML but `validate()` doesn't set an error for it) |
| A13 | **Low** | 2.4.2 | App.tsx | `RouteAnnouncer` reads `document.title` after 0ms timeout, but on the Home page the SPA doesn't update `<title>` on first render fast enough for the announcer to catch it on the initial load — only affects repeat visits |
| A14 | **Low** | 1.3.1 | Pricing.tsx:145 | Plan feature list text `rgba(245,249,234,0.65)` on `#1D3449` = 6.01:1 — passes AA but falls noticeably below the brand standard |
| A15 | **Low** | 2.4.1 | App.tsx | Skip link targets `#main-content` which is a `<section>` element without `role="main"` or `tabindex="-1"` set statically — focus only moves there after `RouteAnnouncer` fires dynamically via JS |
| A16 | **Low** | 1.3.1 | Features.tsx, Pricing.tsx | Emoji icons (`💡`, `🔔`, `📊`, etc.) used inside feature cards are wrapped in `aria-hidden="true"` divs — correct — but some older AT versions read emoji aloud regardless |
| A17 | **Low** | 2.4.4 | Multiple pages | Several `<Link>` / `<a>` elements contain only an SVG arrow with `aria-hidden="true"` inside a `btn-text` context — the visible text in the same element provides the accessible name, which is correct, but the arrow SVG in About.tsx:131 has no `aria-hidden` |
| A18 | **Low** | 4.1.2 | Home.tsx | `<div className="flex ... w-full" aria-hidden="true">` wrapping the PhoneMockup hides the entire phone mockup from AT — correct, but the PhoneMockup renders a decorative clock with live state (`setTime`) that is now aria-hidden — fine, but confirm intent |
| A19 | **Low** | 1.3.1 | Footer.tsx | Footer category headings (`<h3>`) use `fontSize: "11px"` which is below 14px and visually acts as a label tag — may confuse heading hierarchy expectations |
| A20 | **Low** | 2.5.3 | Navbar.tsx:127 | `<span className="nav-link-item">` inside `<Link>` — the accessible name comes from the span text, but if CSS fails to load the span renders as inline text, which is correct. No issue. Note: the `aria-current` is correctly on the `<Link>` (anchor), not the span. |

---

## C) Per-Flow Notes

### Navigation flow (Navbar)
- Skip link is present, styled correctly, appears on `:focus` — confirmed in `index.css:136-153` and `App.tsx:113`.
- Mobile drawer has correct `role="dialog"`, `aria-modal="true"`, `aria-label`, focus trap, Escape key support, and focus restoration to hamburger — well implemented (`Navbar.tsx:50-84`).
- `aria-expanded` and `aria-controls` are correct on the hamburger button.
- `aria-current="page"` is correctly applied on active links.
- **Issue (A05):** The Wouter `<Link>` component renders an `<a>` tag containing a `<div>` — `<a>` may not contain block-level `<div>` children per HTML spec (invalid nesting), though browsers handle it. More critically, the `aria-label="Perioskoup home"` is on the `<Link>` (correct), but the logo renders inside a `<div>` with `cursor: pointer` inline style that adds a redundant click target layer.

### Form flows (Waitlist, Contact)
- All visible form inputs have `<label>` elements with matching `for`/`id` pairs.
- Waitlist uses `.sr-only` labels (visible only to AT) — valid for this design approach.
- Contact form has visible labels with `font-size: 12px; color: #8C9C8C` — these labels (12px, `#8C9C8C` on `#050C10`) pass contrast at 6.80:1.
- `aria-invalid`, `aria-describedby`, and `role="alert"` on error spans are implemented — correct pattern.
- **Issue (A04):** No `autocomplete` attributes anywhere. WCAG 1.3.5 (AA) requires `autocomplete` on inputs collecting personal information. `email`, `given-name`, `family-name`, `organization` values are appropriate.
- **Issue (A07, A08):** Success messages mounted inside newly-created elements. AT may miss a newly-inserted live region. The live region element must exist in the DOM (even empty) before dynamic content is injected.
- The newsletter form in Blog.tsx does pre-create the `role="status"` region above the form — this is the correct pattern. The Waitlist and Contact success states should follow the same approach.

### Blog post reading flow
- Article body is rendered as raw HTML via `dangerouslySetInnerHTML` — the markdown content in ARTICLES uses `##` headings that compile to `h2`/`h3` tags, maintaining hierarchy under the page `<h1>`.
- Author images have descriptive alt text on blog cards.

### Screen reader SPA navigation
- `RouteAnnouncer` in `App.tsx:49-76` correctly uses `role="status"`, `aria-live="polite"`, `aria-atomic="true"`, reads the updated `document.title`, and moves keyboard focus to `#main-content` — this is a strong pattern.
- **Issue (A01):** The target `#main-content` is always a `<section>` element, never a `<main>`. Screen readers navigate via landmarks (H, main, nav, footer). There is no `<main>` landmark anywhere in the SPA. Every page should have exactly one `<main>` element wrapping the page-specific content (between `<Navbar>` and `<Footer>`).

---

## D) Remediation Backlog

### FIX-A01 — Add `<main>` landmark (Blocker — all pages)

**WCAG:** 1.3.1 Info and Relationships, 4.1.2 Name Role Value
**Affected users:** Screen reader users relying on landmark navigation
**Effort:** Small — wrapper element change on 12 pages

Replace the outer `<div style={{ background: "#0A171E", minHeight: "100svh" }}>` wrapping each page with a fragment, and make the page-level container a proper `<main>` element:

```tsx
// In every page (Home.tsx, Features.tsx, etc.)
// BEFORE:
<div style={{ background: "#0A171E", minHeight: "100svh" }}>
  <Navbar />
  <section id="main-content" ...>

// AFTER:
<>
  <Navbar />
  <main id="main-content" style={{ background: "#0A171E", minHeight: "100svh" }}>
    <section ...>   {/* remove id="main-content" from section */}
```

The `id="main-content"` should move to the `<main>` element. The `<main>` also needs `tabindex="-1"` statically (the RouteAnnouncer sets it dynamically, but a static value ensures it is focusable on first page load too):

```tsx
<main id="main-content" tabIndex={-1} style={{ background: "#0A171E", minHeight: "100svh", outline: "none" }}>
```

Add `outline: none` to suppress the focus ring when JS moves focus programmatically (`preventScroll: true` already used).

**Verification:** Open NVDA/VoiceOver, press `Main` landmark shortcut — should navigate to the page content area.

---

### FIX-A02 — Muted text contrast on card surface (High)

**WCAG:** 1.4.3 Contrast (Minimum)
**Affected users:** Low-vision users
**Ratio:** `#8C9C8C` on `#1D3449` = **4.42:1** — fails for 14-15px normal-weight text (requires 4.5:1)

The CSS comment in `index.css:795` already acknowledges this and provides a fix for `.card .body-lg/md/sm`:

```css
/* index.css:795-803 — EXISTING partial fix */
.card .body-lg,
.card .body-md,
.card .body-sm,
.card .text-muted-brand {
  color: #93A793;  /* 4.99:1 on #1D3449 — passes */
}
```

This fix exists in CSS but does **not** cover inline `style={{ color: "#8C9C8C" }}` overrides used extensively in card children across `Features.tsx`, `ForDentists.tsx`, `Pricing.tsx`, and `About.tsx`. The inline style takes precedence over the class rule.

**Fix:** Replace `color: "#8C9C8C"` with `color: "#93A793"` inside all `.card` children that use inline styles, or add a stronger CSS rule:

```css
/* Add specificity override */
.card [style*="color: #8C9C8C"],
.card [style*="color:#8C9C8C"] {
  /* Cannot override inline via CSS */
}
```

The only reliable fix is to replace the inline color values in the JSX. Key locations:
- `Features.tsx:119` — `color: "#8C9C8C"` (feature desc)
- `Features.tsx:124` — `color: "#8C9C8C"` (bullet text)
- `ForDentists.tsx:193,199` — feature card desc and bullets
- `Pricing.tsx:140,147` — plan description and feature list
- `About.tsx:281` — team card bio text
- `Home.tsx:233` — feature bento card body text

**Verification:** Run axe DevTools on `/features` — no "color-contrast" violations in card sections.

---

### FIX-A03 — Breadcrumb separator contrast (High)

**WCAG:** 1.4.3 Contrast (Minimum)
**Affected users:** Low-vision users
**Ratio:** Separator `#4A5E6A` on `#0A171E` = **2.69:1** — fails for all text sizes

**File:** `Breadcrumb.tsx:65`

```tsx
// BEFORE:
<span style={{ color: "#4A5E6A", fontSize: 11 }}>
  /
</span>

// AFTER (Option A — use muted text at passing ratio):
<span style={{ color: "#8C9C8C", fontSize: 11 }} aria-hidden="true">
  /
</span>

// AFTER (Option B — hide from AT entirely, it's decorative):
<span aria-hidden="true" style={{ color: "#6B7F8C", fontSize: 11 }}>
  /
</span>
```

`#6B7F8C` on `#0A171E` = approximately 4.5:1. Alternatively, marking it `aria-hidden="true"` removes the WCAG 1.4.3 requirement for decorative separators.

**Verification:** Colour contrast checker on the breadcrumb separator character.

---

### FIX-A04 — Missing `autocomplete` on form inputs (High)

**WCAG:** 1.3.5 Identify Input Purpose
**Affected users:** Users with cognitive disabilities, motor impairments (autofill dependency)

**Waitlist.tsx:**
```tsx
<input id="waitlist-first-name" type="text" autoComplete="given-name" ... />
<input id="waitlist-last-name" type="text" autoComplete="family-name" ... />
<input id="waitlist-email" type="email" autoComplete="email" ... />
<input id="waitlist-clinic" type="text" autoComplete="organization" ... />
<input id="waitlist-location" type="text" autoComplete="address-level2" ... />
```

**Contact.tsx:**
```tsx
<input id="contact-first-name" type="text" autoComplete="given-name" ... />
<input id="contact-last-name" type="text" autoComplete="family-name" ... />
<input id="contact-email" type="email" autoComplete="email" ... />
{/* contact-role select: no standard autocomplete token — omit */}
{/* contact-message textarea: no standard token — omit */}
```

**Blog.tsx newsletter:**
```tsx
<input id="newsletter-email" type="email" autoComplete="email" ... />
```

**Verification:** Browser DevTools → Autofill should correctly populate fields.

---

### FIX-A05 — Navbar logo link div nesting (High)

**WCAG:** 4.1.1 Parsing, 4.1.2 Name Role Value
**File:** `Navbar.tsx:112-116`

The Wouter `<Link>` renders an `<a>` tag. Wrapping a `<div>` inside an `<a>` is invalid HTML per spec (interactive elements must not contain block-level descendants in phrasing context).

```tsx
// BEFORE:
<Link href="/" aria-label="Perioskoup home">
  <div style={{ textDecoration: 'none', cursor: 'pointer' }}>
    <LogoFull height={28} color="#C0E57A" />
  </div>
</Link>

// AFTER (remove the redundant div — LogoFull is already a flex div):
<Link href="/" aria-label="Perioskoup home" style={{ display: 'inline-flex', alignItems: 'center' }}>
  <LogoFull height={28} color="#C0E57A" />
</Link>
```

Same issue exists in the mobile drawer header at `Navbar.tsx:201` where `<LogoFull>` is rendered without a link wrapper (non-interactive — acceptable).

**Verification:** HTML validator should report zero nesting errors for the nav element.

---

### FIX-A07 + FIX-A08 — Pre-mount live regions for form success (Medium)

**WCAG:** 4.1.3 Status Messages
**Files:** `Contact.tsx:146`, `Waitlist.tsx:80`

When the form is submitted, the component conditionally renders either the form or a success message. Because `role="status"` is inside the success div that gets newly mounted, the AT may not announce the content change.

**Fix — Contact.tsx:**
```tsx
// Move the live region OUTSIDE the conditional, and update its content reactively:
<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  {sent ? "Message sent! We'll get back to you within 24 hours." : ''}
</div>

{sent ? (
  <div style={{ textAlign: "center", padding: "40px 0" }}>
    {/* Visual success content — no role/aria-live needed here */}
    ...
  </div>
) : (
  <form ...>...</form>
)}
```

Apply the same pattern to `Waitlist.tsx`.

**Verification:** VoiceOver/NVDA — submit valid form data, confirm the success message is announced without manual navigation.

---

### FIX-A09 — Hero background image alt text (Medium)

**WCAG:** 1.1.1 Non-text Content
**File:** `Home.tsx:72`

The hero `<img>` is a purely decorative background photograph. It should have `alt=""` and `aria-hidden="true"`.

```tsx
// BEFORE:
<img src={ASSETS.heroBg} alt="Perioskoup dental companion app hero" ... />

// AFTER:
<img src={ASSETS.heroBg} alt="" aria-hidden="true" fetchPriority="high" ... />
```

Note: The pre-render shell in `client/index.html:190` already has `alt=""` for this same image — the React component should match.

**Verification:** axe DevTools — image should not appear in the accessibility tree.

---

### FIX-A10 — Newsletter visible label (Medium)

**WCAG:** 2.4.6 Headings and Labels, 3.3.2 Labels or Instructions
**File:** `Blog.tsx:322-331`

The newsletter email input has a `.sr-only` label. WCAG 2.4.6 (AA) recommends visible labels for all inputs. The button text "Subscribe" partially identifies the purpose but does not label the input field itself.

**Recommended fix:**
```tsx
<label htmlFor="newsletter-email" style={{ 
  fontFamily: "Gabarito, sans-serif", 
  fontSize: 13, 
  color: "#8C9C8C",
  display: "block",
  marginBottom: 8,
  textAlign: "center"
}}>
  Your email address
</label>
<input
  id="newsletter-email"
  type="email"
  placeholder="you@clinic.com"
  className="p-input"
  style={{ flex: "1", minWidth: "220px" }}
  autoComplete="email"
  aria-required="true"
  aria-invalid={newsletterStatus === 'error' || undefined}
/>
```

**Verification:** Click the label — focus should move to the email input.

---

### FIX-A11 — `<p-select>` default color fails on `#1D3449` (Medium)

**WCAG:** 1.4.3 Contrast (Minimum)
**File:** `index.css:874`

```css
/* BEFORE: */
.p-select {
  color: #8C9C8C;  /* 4.42:1 on #1D3449 — fails for normal text */
}

/* AFTER: */
.p-select {
  color: #93A793;  /* 4.99:1 on #1D3449 — passes */
}
/* Placeholder / default option: */
.p-select option[value=""] {
  color: #93A793;
}
```

**Verification:** Contrast checker on the select box before an option is chosen.

---

### FIX-A12 — Last-name field missing error association (Medium)

**WCAG:** 3.3.1 Error Identification
**File:** `Waitlist.tsx:137`

The `waitlist-last-name` input has `required` and `aria-required` but:
1. The `validate()` function does not validate it (no error set for it).
2. No `aria-invalid` or `aria-describedby` is set if the field were to be invalid.

**Fix:** Either remove `required` (since no validation runs on it) or add validation + error display consistent with other fields:

```tsx
// If last name is genuinely required, add to validate():
const lastName = (form.elements.namedItem("waitlist-last-name") as HTMLInputElement)?.value.trim();
if (!lastName) errs["waitlist-last-name"] = "Last name is required.";

// And add error display in JSX:
<input
  id="waitlist-last-name"
  type="text"
  placeholder="Last name"
  className="p-input"
  required
  aria-required="true"
  aria-invalid={!!errors["waitlist-last-name"]}
  aria-describedby={errors["waitlist-last-name"] ? "waitlist-last-name-error" : undefined}
/>
{errors["waitlist-last-name"] && (
  <span id="waitlist-last-name-error" role="alert" style={{ fontSize: 12, color: "#C0E57A", display: "block" }}>
    {errors["waitlist-last-name"]}
  </span>
)}
```

---

### FIX-A15 — Static `tabindex="-1"` on main-content target (Low)

**WCAG:** 2.4.3 Focus Order
**File:** All pages (`Home.tsx:70`, `Features.tsx:65`, etc.)

The `RouteAnnouncer` in `App.tsx:62-64` sets `tabindex="-1"` dynamically via JS before calling `.focus()`. However, on initial page load (before any route change), the element lacks `tabindex`, meaning the `focus()` call in the initial render effect may silently fail on some browsers.

Once FIX-A01 is applied (using `<main tabIndex={-1}>`), this is resolved by default.

---

### FIX-A17 — About page CTA arrow SVG missing aria-hidden (Low)

**WCAG:** 1.1.1 Non-text Content
**File:** `About.tsx:131`

```tsx
// BEFORE:
<svg width="15" height="15" viewBox="0 0 24 24" fill="none">
  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" .../>
</svg>

// AFTER:
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" .../>
</svg>
```

Same pattern applies to `ForDentists.tsx:102`, `About.tsx:309`. Most arrow SVGs in the codebase already have `aria-hidden="true" focusable="false"` — these are isolated omissions.

---

## E) Definition of Done

### Engineering
- [ ] Every page has exactly one `<main id="main-content" tabIndex={-1}>` landmark wrapping page-specific content between Navbar and Footer
- [ ] All `<section id="main-content">` occurrences removed (12 page files)
- [ ] `#8C9C8C` replaced with `#93A793` in all inline styles inside `.card` children across Features, ForDentists, Pricing, About, Home
- [ ] Breadcrumb separator is `aria-hidden="true"` OR color changed to meet 4.5:1
- [ ] `autocomplete` attribute added to all personal-information inputs: `given-name`, `family-name`, `email`, `organization`
- [ ] Navbar logo link `<div>` wrapper removed; `<Link>` receives inline-flex style directly
- [ ] Contact and Waitlist pre-mount `role="status"` live region outside the conditional form/success render
- [ ] Hero background `<img>` in `Home.tsx` changed to `alt=""` and `aria-hidden="true"`
- [ ] Newsletter input gets a visible `<label>` in Blog.tsx
- [ ] `p-select` default color changed to `#93A793` in index.css
- [ ] Last-name field validation added to Waitlist or `required` removed
- [ ] Remaining SVG arrow icons in About.tsx, ForDentists.tsx CTA sections get `aria-hidden="true" focusable="false"`

### QA Verification
- [ ] axe DevTools full scan on `/`, `/features`, `/waitlist`, `/contact`, `/blog`, `/about`, `/pricing` — zero critical violations
- [ ] Lighthouse Accessibility score ≥ 92 on all pages
- [ ] VoiceOver (macOS): Tab through `/waitlist` form — every field reads its label, errors are announced on submit
- [ ] VoiceOver (macOS): Navigate by landmarks (VO+U → Landmarks) — `main` landmark appears on every page
- [ ] VoiceOver (macOS): SPA route change (click Features) — "Navigated to ..." is announced, focus moves to main landmark
- [ ] Keyboard only (no mouse): Tab through entire homepage — focus ring visible on every interactive element including skip link
- [ ] Keyboard only: Open/close mobile drawer on narrow viewport — Escape closes, focus returns to hamburger

---

## Contrast Ratio Reference (Calculated)

| Combination | Ratio | Pass/Fail AA |
|---|---|---|
| `#F5F9EA` on `#0A171E` (main text) | 17.00:1 | PASS |
| `#C0E57A` on `#0A171E` (accent/lime) | 12.76:1 | PASS |
| `#0A171E` on `#C0E57A` (btn-primary text) | 12.76:1 | PASS |
| `#8C9C8C` on `#0A171E` (muted on bg) | 6.28:1 | PASS |
| `#F5F9EA` on `#1D3449` (text on surface) | 11.97:1 | PASS |
| `#93A793` on `#1D3449` (corrected muted on surface) | 4.99:1 | PASS |
| **`#8C9C8C` on `#1D3449` (muted on surface)** | **4.42:1** | **FAIL (normal text)** |
| `#C0E57A` on `#1D3449` (error text on card) | 8.98:1 | PASS |
| `#C0E57A` on `#050C10` (lime on deep bg) | 13.81:1 | PASS |
| `#8C9C8C` on `#050C10` (muted on deep bg) | 6.80:1 | PASS |
| `#F5F9EA` on `#050C10` (text on deep bg) | 18.40:1 | PASS |
| `#8FB84A` on `#0A171E` (gradient end) | 7.90:1 | PASS |
| `rgba(245,249,234,0.65)` on `#0A171E` (inactive nav) | 7.66:1 | PASS |
| `rgba(245,249,234,0.8)` on `#0A171E` (hero subhead) | 11.10:1 | PASS |
| `rgba(245,249,234,0.65)` on `#1D3449` (plan features) | 6.01:1 | PASS |
| **`#4A5E6A` on `#0A171E` (breadcrumb sep)** | **2.69:1** | **FAIL** |
| Focus ring `#C0E57A` vs `#0A171E` | 12.76:1 | PASS |
| Focus ring `#0A171E` vs `#C0E57A` (btn-primary) | 12.76:1 | PASS |

---

## What Is Already Done Well

These items are specifically called out because they represent deliberate, correct accessibility implementation:

1. **Skip link** (`App.tsx:113`, `index.css:136`): Present, visually hidden off-screen, slides into view on `:focus`, targets the correct landmark.
2. **Route announcer** (`App.tsx:49-76`): Polite live region reads `document.title` after a tick delay, then moves keyboard focus to `#main-content`. Strong SPA accessibility pattern.
3. **Reduced-motion** (`index.css:1105-1177`): Comprehensive — all continuous animations, page transitions, hover lifts, mobile drawer, and reveals are disabled. The parallax JS also checks `prefers-reduced-motion` before subscribing to scroll events.
4. **Mobile drawer focus trap** (`Navbar.tsx:50-84`): Correct implementation with initial focus, Tab cycling, Escape key, and focus restoration to hamburger.
5. **ARIA on mobile drawer** (`Navbar.tsx:172-175`): `role="dialog"`, `aria-modal="true"`, `aria-label`, `aria-expanded`, `aria-controls` all correct.
6. **Form ARIA** (Waitlist, Contact): `aria-invalid`, `aria-describedby`, `role="alert"` pattern is correctly implemented on validated fields.
7. **Live regions for form errors** (`Waitlist.tsx`, `Contact.tsx`): `role="alert"` on inline error messages ensures immediate announcement.
8. **Newsletter live region** (`Blog.tsx:312`): Pre-mounted `role="status"` region correctly exists before content changes — this is the right pattern.
9. **Decorative elements** hidden correctly: ticker `aria-hidden="true"`, phone mockup container `aria-hidden="true"`, most SVG icons `aria-hidden="true"`, ParallaxHeroBg `aria-hidden="true"`.
10. **Logo ARIA** (`Logo.tsx`): `LogoMark` correctly uses `<title>Perioskoup</title>` when standalone and `ariaHidden={true}` when inside a labelled link.
11. **Focus-visible CSS** (`index.css:181-184`): Global `*:focus-visible` ring at 2px `#C0E57A` — 12.76:1 contrast — is present and correct.
12. **Breadcrumb `aria-current="page"`** (`Breadcrumb.tsx:78`): Correct per WCAG 1.3.1.
13. **Heading hierarchy**: Each page has a single `<h1>` in the hero, `<h2>` for sections, `<h3>` for subsections — logical structure.
14. **`lang="en"`** on `<html>` in `index.html:2` — correct.
15. **Touch targets**: All buttons and links have `min-height`/`height` ≥ 44px in their CSS classes or inline styles.
16. **`prefers-reduced-motion` in JS**: `ParallaxHeroBg.tsx:11` checks `matchMedia` before running the scroll RAF loop.
