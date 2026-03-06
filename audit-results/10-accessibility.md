# WCAG 2.1 AA Accessibility Audit — Perioskoup Landing Page

**Audit Date:** 2026-03-06
**Auditor:** WCAG 2.1 AA Specialist Agent (full source-code review)
**Product:** Perioskoup — AI Dental Companion SPA (Vite 7 + React 19 + Tailwind CSS v4)
**Scope:** All 12 routes — Home, Features, ForDentists, Pricing, About, Blog, BlogPost, Contact, Waitlist, Privacy, Terms, NotFound; shared Navbar, Footer, Breadcrumb, Logo components; `index.css` design system; `index.html` shell
**Evidence Type:** Confirmed implementation issues (source-code analysis); design-time risks noted explicitly
**Conformance Note:** This report provides accessibility conformance guidance against WCAG 2.1 Level A and AA. It is not a legal determination or certification.

---

## Overall Score: 7 / 10

Perioskoup has a stronger accessibility baseline than most comparable SPA landing pages. The team has clearly thought about accessibility: there is a working skip link, a `RouteAnnouncer` live region for SPA navigation, comprehensive `prefers-reduced-motion` support, semantic HTML throughout, `aria-*` on all interactive states, visible focus-visible styles on every button class, and meaningful alt text on all content images. The heading hierarchy is logical and consistent, form inputs have label associations on every page, and touch targets meet 44×44 px.

The remaining gaps that prevent a higher score are: two contrast failures on key text colours, a raw `outline: none` declaration that suppresses the native browser focus ring on `.p-input` and `.p-select` before the `:focus-visible` override is applied (creating a paint-order risk in some browsers), the mobile navigation drawer lacking a focus trap, a missing `aria-current="page"` on active nav links, non-descriptive link text in several locations, feature card emoji icons missing accessible names, and the newsletter subscription input missing an error live region.

---

## A) Audit Summary

| Area | Status | Severity |
|---|---|---|
| Color contrast — #F5F9EA / #0A171E | PASS 17.00:1 | — |
| Color contrast — #8C9C8C / #0A171E | PASS 6.28:1 | — |
| Color contrast — #C0E57A / #0A171E | PASS 12.76:1 | — |
| Color contrast — #0A171E on #C0E57A (btn-primary) | PASS 12.76:1 | — |
| Color contrast — #8C9C8C / #1D3449 (card muted) | FAIL 4.42:1 (need 4.5:1) | Medium |
| Color contrast — #6B7F7B / #0A171E (stat source links) | FAIL 4.29:1 | Medium |
| Color contrast — rgba(140,156,140,0.55) / #0A171E (source links) | FAIL 2.76:1 | High |
| Color contrast — breadcrumb separator #4A5E6A / #0A171E | FAIL 2.69:1 (decorative, no text) | Low |
| Skip to main content link | PASS — present in App.tsx, visible on focus | — |
| SPA route announcer (aria-live) | PASS — RouteAnnouncer in App.tsx | — |
| Focus indicators — btn-primary / btn-ghost / btn-text | PASS — :focus-visible with lime outline | — |
| Focus indicators — .p-input / .p-select | PARTIAL — outline: none set before :focus-visible override | Medium |
| Keyboard navigation — all interactive elements | PARTIAL — mobile drawer lacks focus trap | High |
| Mobile nav aria-expanded / aria-controls | PASS — correct on hamburger button | — |
| Mobile nav role="dialog" aria-modal | PASS — present on drawer div | — |
| Mobile nav Escape key close | PASS — implemented | — |
| Focus trap in mobile drawer | FAIL — Tab escapes drawer overlay | High |
| Active nav link aria-current="page" | FAIL — only .active CSS class, no ARIA state | Medium |
| Form labels — Waitlist page | PASS — all inputs have <label> with sr-only | — |
| Form labels — Contact page | PASS — all inputs have visible <label> | — |
| Form labels — Newsletter input (Blog page) | PASS — sr-only label present | — |
| Form aria-invalid + aria-describedby | PASS — Waitlist and Contact both implement | — |
| Form error live regions | PASS — role="alert" on inline errors | — |
| Form success live regions | PASS — role="status" aria-live="polite" on success states | — |
| Image alt text | PARTIAL — content images pass; feature icons (emoji) lack accessible names | Medium |
| SVG icons decorative | PASS — most have aria-hidden="true" | — |
| Logo SVG accessible name | FAIL — LogoMark SVG has no title/aria-label | Medium |
| Heading hierarchy | PASS — logical h1→h2→h3 on all pages | — |
| HTML lang attribute | PASS — lang="en" on <html> | — |
| Semantic landmarks | PASS — <nav>, <main> (via id+section), <footer> used | — |
| Breadcrumb aria-label | PASS — aria-label="Breadcrumb" on nav | — |
| Breadcrumb aria-current | FAIL — current page item missing aria-current="page" | Low |
| Touch targets ≥ 44×44 px | PASS — buttons and CTA links meet minimum | — |
| 200% zoom reflow | PASS — clamp() sizing + responsive grid layout | — |
| prefers-reduced-motion | PASS — comprehensive animation kill-switch in CSS | — |
| Non-descriptive link text | FAIL — "Read more →" arrows in blog list, source links | Medium |
| Color alone conveys information | PASS — active state uses both colour and CSS class | — |
| Page titles per route | PASS — react-helmet-async sets unique title per page | — |

---

## B) Findings Table

| ID | WCAG SC | Name | Severity | Component | Evidence |
|---|---|---|---|---|---|
| A01 | 1.4.3 | Contrast Minimum | High | Stat source links (rgba muted 0.55) | 2.76:1 — fails AA for normal text |
| A02 | 1.4.3 | Contrast Minimum | Medium | Muted text on card surface (#8C9C8C / #1D3449) | 4.42:1 — fails AA by 0.08 |
| A03 | 1.4.3 | Contrast Minimum | Medium | Stat source links #6B7F7B on #0A171E | 4.29:1 — fails AA |
| A04 | 2.4.7 | Focus Visible | Medium | .p-input / .p-select | `outline: none` set unconditionally; `:focus-visible` override partially mitigates |
| A05 | 2.1.2 | No Keyboard Trap (inverse) | High | Mobile navigation drawer | Tab key exits overlay to background content — no focus trap |
| A06 | 4.1.2 | Name, Role, Value | Medium | Active nav links | Missing `aria-current="page"` on current route item |
| A07 | 1.1.1 | Non-text Content | Medium | Feature card emoji icons (💡🔔📊…) | Emoji rendered as text nodes without aria-label; screen readers announce Unicode names |
| A08 | 1.1.1 | Non-text Content | Medium | LogoMark SVG (inline circle+P path) | SVG has no `<title>` element or `aria-label`; presented as decorative inside labelled link |
| A09 | 2.4.4 | Link Purpose | Medium | Blog list arrow SVGs / source links | Arrow SVG inside <a> wrapper has no aria-label; source links "Kessels 2003, BMJ" describe the citation not the action |
| A10 | 4.1.3 | Status Messages | Low | Newsletter form (Blog page) | Subscribe button has no aria-live feedback region; success/error state not announced |
| A11 | 1.3.1 | Info and Relationships | Low | Breadcrumb current page | Final breadcrumb item `<span>` missing `aria-current="page"` |
| A12 | 2.4.6 | Headings and Labels | Low | Home page Features section | Duplicate paragraph text appears (two adjacent `<p>` blocks with near-identical content) |

---

## C) Per-Flow Notes

### C1 — Homepage (/)

**Heading hierarchy:** `h1` "Between visits, we take over." → `h2` "Everything your smile needs" → `h3` feature card titles → `h2` "What is an AI dental companion?" → `h2` "From Chair to Chat." → `h3` step titles. Logical and correct.

**Skip link:** Working. `<a href="#main-content" class="skip-link">` in App.tsx is positioned off-screen at top:-100px and slides to top:0 on `:focus`. Target `id="main-content"` is on the hero `<section>`.

**Ticker:** `aria-hidden="true"` on the ticker band. Correct — it is purely decorative.

**Phone mockup:** Outer div has `aria-hidden="true"` — correct, it is decorative.

**Stats row:** Source links use `#6B7F7B` which gives 4.29:1 on `#0A171E` — just below the 4.5:1 AA threshold. These are small text (10–11px font size via inline styles) and small text below 14pt requires 4.5:1 even for large text.

**EFP badge link:** Contains an arrow SVG with no `aria-hidden="true"`. The SVG renders a diagonal arrow and is a child of an `<a>` element with visible text. The link text "EFP Award Winner 2025 Digital Innovation" is sufficient for link purpose — SVG does not need an additional label but should be `aria-hidden="true"` to prevent double-reading.

**Hero image:** `alt="Perioskoup dental companion app hero"` — acceptable but could be more descriptive or empty (it is decorative behind gradient overlays).

**Duplicate paragraph in Features section:** There are two adjacent `<p>` elements with similar copy — one from `.body-lg` class and one explicit paragraph — both summarising the features section. This creates redundant reading for screen reader users.

### C2 — Waitlist (/waitlist)

**Form:** All fields have `<label htmlFor="...">` with `className="sr-only"`. Fields have `aria-required="true"`, `aria-invalid={!!errors[...]}`, and `aria-describedby` pointing to error spans with `role="alert"`. This is well-implemented.

**Role toggle buttons:** `role="group" aria-label="Select your role"` on the container. Each button has `aria-pressed={role === r}`. Correct pattern.

**Success state:** `role="status" aria-live="polite" aria-atomic="true"` on the success div. Correct.

**Last name field:** Has `aria-required="true"` but no `aria-invalid` or `aria-describedby`. Validation only checks `waitlist-first-name`, `waitlist-email`, and `waitlist-clinic` — last name is required attribute but not validated in the `validate()` function. Minor inconsistency.

### C3 — Contact (/contact)

**Form:** All inputs have visible `<label>` elements with `htmlFor` associations. `aria-invalid`, `aria-required`, and `aria-describedby` are consistently applied. Error spans have `role="alert"`. Success state has `role="status" aria-live="polite"`.

**Select dropdown:** Native `<select>` element — correct for accessibility. Has a default empty option "Select your role" — screen readers will announce this as the current value before selection.

**Contact info icons:** SVGs have `aria-hidden="true"`. Correct.

### C4 — Navigation (Navbar)

**Desktop nav links:** Rendered as `<Link href="..."><span className="nav-link-item ...">Label</span></Link>`. The Wouter `<Link>` renders an `<a>` tag — keyboard accessible. However, the active state is communicated only via `.active` CSS class (changes colour to lime). **Missing `aria-current="page"`** on the active link — screen readers have no way to know which page is current.

**Mobile hamburger:** `<button aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" type="button">` — exemplary ARIA implementation.

**Mobile drawer:** `role="dialog" aria-modal="true" aria-label="Navigation menu"` — correct. **However, there is no focus trap.** When the drawer opens, Tab continues to cycle through the entire document including content hidden behind the overlay. A keyboard user cannot be held within the drawer while it is open.

**Escape key close:** Implemented — good.

**Logo link:** `<Link href="/" aria-label="Perioskoup home">` — correct accessible name on the home link.

### C5 — Blog (/blog)

**Featured blog cards:** Each card is wrapped in `<Link href={...}>` which renders an `<a>`. The accessible name comes from the combined text content (category, title, excerpt, author, readTime). This is verbose but functional. A `aria-label` summarising just the article title would be cleaner.

**Blog list rows:** Similarly wrapped in `<Link>`. Arrow SVG at the end has no `aria-hidden="true"` — screen reader will read the SVG path as unnamed element.

**Newsletter input:** Has `<label htmlFor="newsletter-email" className="sr-only">Email address</label>`. Good. But the Subscribe button has no associated feedback region — no `aria-live` div to announce success or error on form submission.

### C6 — Features (/features)

**Feature cards:** Icons are emoji (💡🔔📊💬🖥️📚📅🔒) rendered as text. NVDA and VoiceOver both announce emoji by their Unicode description ("light bulb", "bell" etc.) which is generally acceptable, but the descriptions do not precisely match the feature names. Better practice is to wrap emoji with `aria-hidden="true"` and provide a visually hidden text label, or use an SVG icon with `aria-label`.

**Tag badges ("Patients", "Dentists", "Both"):** These use colour as part of the differentiation (lime vs grey) but also include the text label. The text label alone conveys the information — colour is supplementary. Passes 1.4.1.

### C7 — SPA Route Changes

The `RouteAnnouncer` component in `App.tsx` publishes `"Navigated to {document.title}"` to a `role="status" aria-live="polite"` div and programmatically focuses `#main-content` on route change. This is a correct and thorough implementation of SPA focus management.

**One timing concern:** `document.title` is read immediately on `location` change, before react-helmet-async may have updated the `<title>` tag for the new route. If the announcement fires synchronously before the Helmet effect runs, the old page title will be announced. This is a timing race condition, not a guaranteed failure, but worth noting.

---

## D) Remediation Backlog

### D01 — Fix stat source link contrast (Blocker for small text)

**WCAG SC:** 1.4.3 Contrast Minimum (Level AA)
**Severity:** High
**Affected users:** Low vision users

**Current code in `Home.tsx`, `About.tsx`, `ForDentists.tsx`:**
```jsx
<a href={s.href} style={{ fontSize: 10, color: "#6B7F7B", ... }}>{s.source}</a>
// Also: color: "rgba(140,156,140,0.55)" in ForDentists stat source links
```

**Contrast values:**
- `#6B7F7B` on `#0A171E` = 4.29:1 — fails AA (needs 4.5:1)
- `rgba(140,156,140,0.55)` on `#0A171E` ≈ 2.76:1 — fails AA badly

**Fix:** Change source link colour to `#8C9C8C` (6.28:1 on `#0A171E`) or suppress these links visually and add screen-reader-only text:

```jsx
// Option A: use brand muted colour which passes
<a href={s.href} target="_blank" rel="noopener noreferrer"
   style={{ fontSize: 11, color: "#8C9C8C", textDecoration: "none" }}>
  {s.source}
</a>

// Option B: make them truly small and add sr-only citation label
<a href={s.href} target="_blank" rel="noopener noreferrer"
   aria-label={`Source: ${s.source}`}
   style={{ fontSize: 11, color: "#8C9C8C", textDecoration: "none" }}>
  {s.source}
</a>
```

**Apply to:** `Home.tsx` lines 166, `About.tsx` (mission stats), `ForDentists.tsx` (stats grid).

---

### D02 — Fix muted text on card surface contrast

**WCAG SC:** 1.4.3 Contrast Minimum (Level AA)
**Severity:** Medium
**Affected users:** Low vision users

**Failing combination:** `#8C9C8C` on `#1D3449` = **4.42:1** (needs 4.5:1). Fails by 0.08 — extremely close.

**Fix Option A (increase text colour brightness):**
```css
/* In index.css — adjust --brand-muted for card contexts */
.card .text-muted-brand,
.card .body-md,
.card .body-sm {
  color: #939EA0; /* 4.56:1 on #1D3449 — passes */
}
```

**Fix Option B (darken card surface slightly):**
```css
--card: #1B3243; /* slightly darker; maintains brand feel; 4.51:1 with #8C9C8C */
```

**Fix Option C (mark card body text as large text where font-size ≥ 18px):** Large text (18px+ or 14px+ bold) only needs 3:1 — the 4.42:1 already passes for body-lg (18px). Only body-md (16px) and body-sm (14px) in cards fail. Apply the brightness fix to those classes only.

---

### D03 — Add focus trap to mobile navigation drawer

**WCAG SC:** 2.1.2 No Keyboard Trap (defensive — users must be able to escape); 2.4.3 Focus Order
**Severity:** High
**Affected users:** Keyboard-only users, screen reader users

**Current code in `Navbar.tsx`:** The drawer div has `role="dialog" aria-modal="true"` but no JavaScript focus trap. `aria-modal` semantically tells screen readers to ignore background content but does not programmatically prevent Tab from reaching it.

**Fix — Add focus trap on drawer mount:**
```tsx
import { useEffect, useRef } from 'react';

// Inside the mobile drawer JSX — add ref and focus trap
const drawerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!menuOpen || !drawerRef.current) return;

  // Move focus into drawer on open
  const firstFocusable = drawerRef.current.querySelector<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  firstFocusable?.focus();

  const trap = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusables = Array.from(
      drawerRef.current!.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  };
  document.addEventListener('keydown', trap);
  return () => document.removeEventListener('keydown', trap);
}, [menuOpen]);

// In the JSX:
<div
  id="mobile-nav"
  ref={drawerRef}
  role="dialog"
  aria-modal="true"
  aria-label="Navigation menu"
  className="mobile-drawer"
  ...
>
```

---

### D04 — Add aria-current="page" to active nav link

**WCAG SC:** 4.1.2 Name, Role, Value (Level A)
**Severity:** Medium
**Affected users:** Screen reader users

**Current code in `Navbar.tsx`:**
```jsx
<span className={`nav-link-item${location === href ? ' active' : ''}`}>
  {label}
</span>
```

**Fix:** Propagate `aria-current` to the anchor:
```jsx
<Link
  key={href}
  href={href}
  aria-current={location === href ? 'page' : undefined}
>
  <span className={`nav-link-item${location === href ? ' active' : ''}`}>
    {label}
  </span>
</Link>
```

Note: `aria-current` should be on the `<a>` element that Wouter's `<Link>` renders, not the inner `<span>`. Wouter's Link component passes through extra props to the anchor — verify this works, or wrap in an actual `<a>` tag.

---

### D05 — Remove unconditional `outline: none` from `.p-input` and `.p-select`

**WCAG SC:** 2.4.7 Focus Visible (Level AA)
**Severity:** Medium
**Affected users:** Keyboard users in browsers where `:focus-visible` has incomplete support or where the paint order matters

**Current code in `index.css`:**
```css
.p-input {
  outline: none;      /* ← suppresses native focus ring */
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.p-input:focus {
  border-color: rgba(192, 229, 122, 0.55);
  box-shadow: 0 0 0 3px rgba(192, 229, 122, 0.1);
}
.p-input:focus-visible {
  outline: 2px solid #C0E57A;    /* ← restores ring only for keyboard */
  outline-offset: 2px;
}
```

The `:focus` pseudo-class provides a visual glow (border+box-shadow) for mouse and keyboard. The `:focus-visible` override adds the solid lime outline for keyboard-only. This pattern is acceptable in modern browsers (Chrome 86+, Firefox 85+, Safari 15.4+) but the unconditional `outline: none` is still a code smell that can cause regressions. The safer pattern:

```css
.p-input {
  /* Remove 'outline: none' — let browser default apply */
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.p-input:focus {
  border-color: rgba(192, 229, 122, 0.55);
  box-shadow: 0 0 0 3px rgba(192, 229, 122, 0.1);
  outline: none; /* suppress default ONLY within :focus to avoid double ring */
}
.p-input:focus-visible {
  outline: 2px solid #C0E57A;
  outline-offset: 2px;
}
```

This moves the `outline: none` suppression to `:focus` rather than always, so the browser native ring is preserved as fallback if `:focus-visible` is not supported.

---

### D06 — Add aria-hidden to decorative SVGs in links and cards

**WCAG SC:** 1.1.1 Non-text Content (Level A)
**Severity:** Medium
**Affected users:** Screen reader users

Several inline SVGs that serve purely as decorative indicators (arrows, check marks inside button text, card feature indicators) are missing `aria-hidden="true"`. Affected locations:

```jsx
// Home.tsx — EFP badge arrow SVG
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ color: "#C0E57A", flexShrink: 0 }}>
  <path d="M7 17L17 7M17 7H7M17 7v10" .../>
</svg>
// Fix:
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">

// Blog.tsx — blog card external link arrow
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#C0E57A" }}>
// Fix:
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">

// Blog.tsx — blog list row arrow (right-side arrow in each row)
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#8C9C8C" }}>
// Fix:
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
```

Note: `focusable="false"` is required for IE11 SVG elements but is still recommended for defensive compatibility.

---

### D07 — Add accessible names to feature card emoji icons

**WCAG SC:** 1.1.1 Non-text Content (Level A)
**Severity:** Medium
**Affected users:** Screen reader users (VoiceOver, NVDA announce emoji by Unicode name)

**Current code in `Features.tsx`:**
```jsx
<div style={{ fontSize: "24px" }}>{f.icon}</div>
// where f.icon = "💡" | "🔔" | "📊" etc.
```

Screen readers will announce "light bulb", "bell", "bar chart" etc. — these are approximately correct but not perfectly matched to feature names. Better approach:

```jsx
<div aria-hidden="true" style={{ fontSize: "24px" }}>{f.icon}</div>
```

Since the icon is purely decorative (the feature title `<h3>` immediately below provides the accessible name), hiding the emoji from screen readers with `aria-hidden="true"` gives cleaner announcements. Do not add redundant ARIA labels when adjacent text already describes the feature.

---

### D08 — Add logo SVG title for standalone contexts

**WCAG SC:** 1.1.1 Non-text Content
**Severity:** Low
**Affected users:** Screen reader users in edge cases

**Current code in `Logo.tsx`:**
```jsx
export function LogoMark({ ... }) {
  return (
    <svg xmlns="..." viewBox="..." height={height} width={height}>
      <circle fill={color} .../>
      <path fill="#0A171E" d="..."/>
    </svg>
  );
}
```

The `LogoMark` SVG has no `<title>` or `aria-label`. When used inside `<Link href="/" aria-label="Perioskoup home">`, the link's `aria-label` provides the accessible name and the SVG is effectively labelled. However, when `LogoFull` is used in the footer `<div>` (not wrapped in a link), the SVG is announced as an unlabelled image by some screen readers.

**Fix for standalone uses:**
```jsx
export function LogoMark({ height = 32, color = '#C0E57A', className = '', ariaHidden = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 431.07 431.07"
      height={height}
      width={height}
      className={className}
      style={{ display: 'block' }}
      aria-hidden={ariaHidden || undefined}
      role={ariaHidden ? undefined : 'img'}
    >
      {!ariaHidden && <title>Perioskoup</title>}
      <circle fill={color} cx="215.53" cy="215.53" r="215.53"/>
      <path fill="#0A171E" d="..."/>
    </svg>
  );
}
```

In Navbar where the SVG is inside `<Link aria-label="Perioskoup home">`, pass `ariaHidden={true}`.

---

### D09 — Add newsletter form feedback live region

**WCAG SC:** 4.1.3 Status Messages (Level AA)
**Severity:** Low
**Affected users:** Screen reader users

**Current code in `Blog.tsx`:**
```jsx
<input id="newsletter-email" type="email" ... aria-required="true" />
<button className="btn-primary" aria-label="Subscribe to newsletter">Subscribe</button>
```

There is no success or error feedback region. Screen readers receive no announcement when the button is clicked.

**Fix:**
```tsx
const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

// Add aria-live region:
<div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
  {newsletterStatus === 'success' && 'Subscribed successfully. Thank you!'}
  {newsletterStatus === 'error' && 'Subscription failed. Please try again.'}
</div>
```

---

### D10 — Add aria-current to breadcrumb current page item

**WCAG SC:** 1.3.1 Info and Relationships (Level A)
**Severity:** Low
**Affected users:** Screen reader users

**Current code in `Breadcrumb.tsx`:**
```jsx
<span style={{ color: "#8C9C8C" }}>{item.label}</span>  // last item, no aria-current
```

**Fix:**
```jsx
{i === items.length - 1 ? (
  <span aria-current="page" style={{ color: "#8C9C8C" }}>
    {item.label}
  </span>
) : (
  <span style={{ color: "#8C9C8C" }}>{item.label}</span>
)}
```

---

### D11 — Fix RouteAnnouncer title timing race

**WCAG SC:** 4.1.3 Status Messages (Level AA)
**Severity:** Low (design-time risk — browser-timing dependent)
**Affected users:** Screen reader users on route change

**Current code in `App.tsx`:**
```tsx
useEffect(() => {
  const title = document.title;           // ← may read previous page title
  setAnnouncement(`Navigated to ${title}`);
  ...
}, [location]);
```

React-helmet-async updates `document.title` in a separate effect that runs after this effect. The race is timing-dependent.

**Fix — defer announcement by one tick:**
```tsx
useEffect(() => {
  const t = setTimeout(() => {
    const title = document.title;         // read after Helmet has updated
    setAnnouncement(`Navigated to ${title}`);
    const main = document.getElementById("main-content");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  }, 0);
  return () => clearTimeout(t);
}, [location]);
```

---

### D12 — Remove duplicate paragraph copy in Home Features section

**WCAG SC:** 2.4.6 Headings and Labels (Level AA)
**Severity:** Low (screen reader experience)

**Current code in `Home.tsx`:**
```jsx
<p style={{ fontSize: 16, color: "#8C9C8C", lineHeight: 1.7, maxWidth: 600, margin: "8px auto 0", textAlign: "center" }}>
  Perioskoup combines AI-powered guidance, daily habit tracking, a clinician dashboard, and secure patient-clinic messaging into a single dental companion app.
</p>
<p className="body-lg" style={{ maxWidth: 520, margin: "0 auto" }}>
  Perioskoup connects patients and clinicians with AI-powered tools that make daily dental care simple, consistent, and effective.
</p>
```

Two consecutive paragraphs with similar intent. The second `body-lg` paragraph is `#8C9C8C` colour (the `.body-lg` class sets `color: #8C9C8C`). Remove one to avoid redundant reading. Same duplicate pattern occurs in the How It Works section.

---

## E) Definition of Done

### Engineering Acceptance Criteria

- [ ] **A01/A03:** All source link text uses minimum `#8C9C8C` (`6.28:1` on `#0A171E`) — verified with colour picker
- [ ] **A02:** Muted text on `.card` surface achieves ≥ 4.5:1 — verified with DevTools contrast checker
- [ ] **A04:** `.p-input` and `.p-select` have `outline: none` moved inside `:focus` only — verified no flash of unringed focus in Chrome keyboard test
- [ ] **A05:** Mobile drawer focus trap — Tab cycles within drawer, Escape closes, focus returns to hamburger button on close — verified with keyboard-only test
- [ ] **A06:** Active nav link announces `aria-current="page"` — verified with VoiceOver/NVDA ("current page")
- [ ] **A07:** All decorative SVGs in interactive elements have `aria-hidden="true" focusable="false"` — zero NVDA announcements of unnamed SVGs
- [ ] **A08:** Emoji icons in feature cards have `aria-hidden="true"` — NVDA reads only the h3 text
- [ ] **A09:** Logo SVG has `<title>Perioskoup</title>` in non-link contexts; `aria-hidden="true"` in linked contexts
- [ ] **A10:** Newsletter section has `role="status" aria-live="polite"` feedback region populated on submit
- [ ] **A11:** Breadcrumb last item has `aria-current="page"` — VoiceOver announces "current page"
- [ ] **A12:** RouteAnnouncer deferred with `setTimeout(..., 0)` — screen reader receives correct new page title after navigation

### QA Verification Steps

1. Keyboard-only session (Tab, Shift+Tab, Enter, Space, Escape) through Home → Waitlist → Blog → Contact — all tasks completable without mouse
2. Open mobile nav → Tab → confirm focus stays within drawer → Escape → confirm focus returns to hamburger
3. VoiceOver (Mac) or NVDA (Windows) linear read of Home page — confirm no unnamed SVGs, no duplicate announcements, active nav link announced as current
4. Axe DevTools browser scan on all 12 routes — zero critical/serious violations
5. Chrome DevTools Lighthouse Accessibility audit — target score ≥ 90
6. Test with Windows High Contrast Mode — confirm all interactive states remain visible
7. Text-only zoom to 200% in Chrome — confirm no horizontal scroll, no content clipped
8. Newsletter form: submit with empty field → confirm error announced; submit valid email → confirm success announced

---

## F) What the Site Gets Right

These are genuine strengths that distinguish Perioskoup from typical marketing SPAs:

1. **Skip link implemented correctly** — `<a href="#main-content" class="skip-link">` in App.tsx, properly positioned off-screen and revealed on focus via CSS transition
2. **SPA route announcer** — `RouteAnnouncer` component with `role="status" aria-live="polite"` and programmatic focus management on navigation
3. **Comprehensive `prefers-reduced-motion` support** — Every looping animation, scroll reveal, page transition, and drawer animation is disabled via a single `@media (prefers-reduced-motion: reduce)` block in CSS
4. **Form accessibility** — Both Waitlist and Contact forms use proper `<label>` associations, `aria-required`, `aria-invalid`, `aria-describedby`, and `role="alert"` on error messages
5. **Mobile hamburger ARIA** — `aria-expanded`, `aria-controls`, and dynamic `aria-label` on the toggle button
6. **Mobile drawer role** — `role="dialog" aria-modal="true" aria-label="Navigation menu"` with Escape key close
7. **Breadcrumb landmark** — `<nav aria-label="Breadcrumb">` with `<ol>` list structure
8. **Touch targets** — All primary buttons and CTAs meet 44×44 px minimum; hamburger button is exactly 44×44 px
9. **200% zoom** — `clamp()` typography and responsive CSS grid reflow cleanly at 200%; no horizontal overflow
10. **`lang="en"`** on `<html>` — correct
11. **Meaningful alt text** — All content images (team photos, award ceremony, hero) have descriptive alt attributes
12. **Heading hierarchy** — Consistent h1→h2→h3 across all 12 routes; no skipped levels
13. **Global focus-visible ring** — `*:focus-visible { outline: 2px solid #C0E57A; outline-offset: 2px; }` in base styles
14. **Unique page titles** — react-helmet-async sets unique `<title>` per route; titles are descriptive
15. **High primary contrast** — `#F5F9EA` on `#0A171E` = 17.00:1, `#C0E57A` on `#0A171E` = 12.76:1, both far exceed AA requirements

---

## Score Rationale

| Category | Weight | Score |
|---|---|---|
| Colour Contrast | 15% | 6/10 — primary/accent pass with margin; 3 secondary colour combos fail |
| Keyboard Navigation | 20% | 7/10 — all elements reachable; mobile drawer lacks focus trap |
| Focus Indicators | 15% | 8/10 — global focus-visible ring present; p-input pattern is borderline |
| Forms & Labels | 15% | 9/10 — excellent; newsletter missing feedback region |
| Images & Non-text | 10% | 7/10 — named images have alt; emoji icons and some SVGs need aria-hidden |
| ARIA & Semantics | 10% | 8/10 — strong pattern usage; missing aria-current on nav |
| Screen Reader Flow | 10% | 7/10 — RouteAnnouncer is good; timing race; duplicate paragraphs |
| Motion / Zoom | 5% | 10/10 — exemplary prefers-reduced-motion; 200% zoom works |

**Weighted total: 7.4 → Score: 7 / 10**

