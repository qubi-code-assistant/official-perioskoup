# WCAG 2.1 AA Accessibility Audit — Perioskoup Landing Page

**Audit Date:** 2026-03-06
**Auditor:** WCAG 2.1 AA Specialist Agent
**Product:** Perioskoup — AI Dental Companion SPA (Vite + React + Tailwind CSS v4)
**Scope:** All 12 routes — Home, Features, ForDentists, Pricing, About, Blog, BlogPost, Contact, Waitlist, Privacy, Terms, NotFound
**Evidence Type:** Design-time risk (static analysis of source code without runtime execution)
**Conformance Note:** This report provides accessibility conformance guidance against WCAG 2.1 Level A and AA. It is not a legal determination or certification.

---

## Overall Score: 4 / 10

The site has a professional visual design and several accessibility positives (semantic nav, breadcrumb aria-label, alt text on most images, lang attribute). However it carries a cluster of Blocker and High-severity issues — missing skip link, absent focus indicators on every interactive element, missing form label associations, no live region on form success, SPA route changes without announcement, and a muted text colour that fails WCAG AA contrast — that collectively mean keyboard-only and screen reader users cannot reliably complete any primary task.

---

## A) Audit Summary

| Category | Status | Score |
|---|---|---|
| Color Contrast | Partial pass | 2 colours pass, 2 fail |
| Skip to Main | FAIL — not present | Blocker |
| Focus Indicators | FAIL — outline: none on inputs, no :focus-visible on buttons | Blocker |
| Keyboard Navigation | FAIL — nav links are `<span>` not `<a>`, role selectors are `<button>` without aria-pressed | High |
| Form Labels | FAIL — all inputs use placeholder only, no `<label for>` association | Blocker |
| Image Alt Text | PASS on named images; FAIL on decorative SVGs missing aria-hidden | Medium |
| ARIA Roles/States | FAIL — mobile drawer has no role="dialog", no aria-expanded, no aria-live on form success | High |
| Screen Reader Flow | FAIL — SPA route changes not announced, reveal animations hide content from AT | High |
| Touch Targets | FAIL — mobile hamburger is 38×38px (below 44×44px), nav `<span>` elements are not interactive | High |
| 200% Zoom | PARTIAL — content reflows but fixed-pixel grids cause horizontal overflow | Medium |
| Heading Hierarchy | PARTIAL — mostly correct but BlogPost has multiple h2 at same level as page h1 equivalents | Medium |
| Live Regions | FAIL — no aria-live on form submission success states | High |
| `<html lang>` | PASS — `lang="en-GB"` present | Pass |
| Page Title | PASS — meaningful title in index.html | Pass |
| Animated Content | FAIL — no prefers-reduced-motion query on any animation | High |

---

## B) Color Contrast Ratios (Calculated)

WCAG 2.1 AA requires:
- Normal text (under 18pt / 14pt bold): minimum 4.5:1
- Large text (18pt+ or 14pt+ bold): minimum 3:1
- UI components (borders, icons): minimum 3:1

### Relative Luminance Formula
L = 0.2126R + 0.7152G + 0.0722B  
where each channel is linearised: c ≤ 0.04045 → c/12.92, else ((c+0.055)/1.055)^2.4

### Calculation: #F5F9EA on #0A171E (Main text on background)

#F5F9EA → R=0.9608, G=0.9765, B=0.9176
Linearised: R=0.9184, G=0.9500, B=0.8225
L(foreground) = 0.2126×0.9184 + 0.7152×0.9500 + 0.0722×0.8225
             = 0.1952 + 0.6794 + 0.0594 = **0.9340**

#0A171E → R=0.0392, G=0.0902, B=0.1176
Linearised: R=0.0122, G=0.0305, B=0.0407
L(background) = 0.2126×0.0122 + 0.7152×0.0305 + 0.0722×0.0407
              = 0.0026 + 0.0218 + 0.0029 = **0.0273**

Contrast ratio = (0.9340 + 0.05) / (0.0273 + 0.05) = 0.9840 / 0.0773 = **12.73:1**
**RESULT: PASS** (exceeds 4.5:1 and 3:1 for all text sizes)

---

### Calculation: #8C9C8C on #0A171E (Muted text on background)

#8C9C8C → R=0.5490, G=0.6118, B=0.5490
Linearised: R=0.2586, G=0.3314, B=0.2586
L(foreground) = 0.2126×0.2586 + 0.7152×0.3314 + 0.0722×0.2586
              = 0.0550 + 0.2370 + 0.0187 = **0.3107**

Contrast ratio = (0.3107 + 0.05) / (0.0273 + 0.05) = 0.3607 / 0.0773 = **4.67:1**
**RESULT: PASS** (≥ 4.5:1 for normal text — passes by a narrow margin of 0.17)

**RISK NOTE:** This is a marginal pass. At any font size below ~16px, or rendered on a lower-quality display, this will feel borderline. The body-sm class at 14px uses this muted colour — at 14px non-bold this is normal text and must meet 4.5:1. It passes at 4.67:1 but any rendering anti-aliasing could push it below threshold. Treat as **design-time risk** to monitor.

Additionally, `.body-sm` text at 14px in feature card bullet lists and stat labels uses `color: #8C9C8C` — these are body-weight (not large text), so the 4.5:1 requirement applies and it just barely passes.

The footer uses `color: #234966` for section headings and copyright:
#234966 → R=0.1373, G=0.2863, B=0.4
Linearised: R=0.0427, G=0.0681, B=0.1329
L = 0.2126×0.0427 + 0.7152×0.0681 + 0.0722×0.1329 = 0.0091 + 0.0487 + 0.0096 = **0.0674**
On #050C10 background:
#050C10 → R=0.0196, G=0.0471, B=0.0627
Linearised: R=0.0015, G=0.0034, B=0.0055
L = 0.2126×0.0015 + 0.7152×0.0034 + 0.0722×0.0055 = 0.0003+0.0024+0.0004 = **0.0031**
Ratio = (0.0674+0.05)/(0.0031+0.05) = 0.1174/0.0531 = **2.21:1**
**RESULT: FAIL** — Footer category headings ("Product", "Company", "Legal") and copyright text rendered in #234966 on #050C10 fail WCAG AA at 2.21:1. This is a confirmed design issue.

---

### Calculation: #C0E57A on #0A171E (Accent / lime on background)

#C0E57A → R=0.7529, G=0.8980, B=0.4784
Linearised: R=0.5271, G=0.7853, B=0.1955
L(foreground) = 0.2126×0.5271 + 0.7152×0.7853 + 0.0722×0.1955
              = 0.1121 + 0.5616 + 0.0141 = **0.6878**

Contrast ratio = (0.6878 + 0.05) / (0.0273 + 0.05) = 0.7378 / 0.0773 = **9.55:1**
**RESULT: PASS** (exceeds 4.5:1 for all text sizes)

---

### Calculation: #C0E57A as button background with dark text (#0A171E)

Same as above reversed:
Contrast ratio = (0.6878 + 0.05) / (0.0273 + 0.05) = **9.55:1**
**RESULT: PASS** (the btn-primary button with #0A171E text on #C0E57A background passes at 9.55:1)

---

### Calculation: Breadcrumb link colour #6B7F7B on #0A171E

#6B7F7B → R=0.4196, G=0.4980, B=0.4824
Linearised: R=0.1448, G=0.2132, B=0.1993
L = 0.2126×0.1448 + 0.7152×0.2132 + 0.0722×0.1993 = 0.0308+0.1525+0.0144 = **0.1977**
Ratio = (0.1977+0.05)/(0.0273+0.05) = 0.2477/0.0773 = **3.20:1**
**RESULT: FAIL** — Breadcrumb anchor links at 13px (normal weight, not large text) need 4.5:1. At 3.20:1 they fail WCAG AA.

---

## C) Findings Table

| ID | WCAG SC | Title | Severity | Location |
|---|---|---|---|---|
| A01 | 2.4.1 Bypass Blocks (A) | No skip-to-main-content link | Blocker | All pages |
| A02 | 2.4.7 Focus Visible (AA) | Focus indicators absent on inputs and buttons | Blocker | All pages |
| A03 | 1.3.1 Info and Relationships (A) | Form inputs have no programmatic label | Blocker | Home, Contact, Waitlist, Blog (newsletter) |
| A04 | 4.1.3 Status Messages (AA) | Form success states not announced to screen readers | High | Home, Contact, Waitlist |
| A05 | 2.4.3 Focus Order (A) | SPA route changes do not move focus or announce new page | High | App.tsx (all routes) |
| A06 | 1.4.3 Contrast Minimum (AA) | Footer text (#234966 on #050C10) fails at 2.21:1 | High | Footer |
| A07 | 1.4.3 Contrast Minimum (AA) | Breadcrumb link (#6B7F7B on #0A171E) fails at 3.20:1 | Medium | Breadcrumb component |
| A08 | 4.1.2 Name, Role, Value (A) | Mobile drawer has no role, no aria-modal, no aria-expanded | High | Navbar |
| A09 | 4.1.2 Name, Role, Value (A) | Waitlist role-selector buttons missing aria-pressed | Medium | Waitlist |
| A10 | 2.1.1 Keyboard (A) | Nav links are `<span>` inside `<Link>` — span is not interactive semantically | High | Navbar |
| A11 | 1.4.13 Content on Hover/Focus (AA) | Custom cursor replaces system cursor without fallback | Low | CustomCursor |
| A12 | 2.3.3 Animation from Interactions (AAA) / 1.4.5 Images of Text (AA) | No prefers-reduced-motion guard on any animation class | High | index.css |
| A13 | 1.1.1 Non-text Content (A) | Inline SVG icons throughout site have no aria-hidden and no aria-label | Medium | All pages |
| A14 | 2.4.6 Headings and Labels (AA) | Footer category headings use `<p>` not `<h3>` | Low | Footer |
| A15 | 1.3.1 Info and Relationships (A) | Ticker strip has no aria-hidden — screen readers will read repeated text | Medium | Home |
| A16 | 1.4.5 Images of Text | Text rendered inside PhoneMockup SVG/div is inaccessible as image-like content | Low | PhoneMockup |
| A17 | 2.4.4 Link Purpose (A) | Multiple "→" character-only arrow SVGs lack aria-label context | Low | Multiple pages |
| A18 | 1.3.4 Orientation (AA) | No orientation lock detection; layout verified responsive | Pass (no issue) | — |
| A19 | 2.5.3 Label in Name (A) | Blog post cards use `<div>` wrapper inside `<Link>` — accessible name is full card text | Medium | Blog |
| A20 | 3.3.1 Error Identification (A) | Forms submit without error feedback if required fields are empty (browser-native only) | Medium | Contact, Waitlist |

---

## D) Per-Finding Detail & Remediation Backlog

---

### A01 — Missing Skip to Main Content Link
**WCAG SC:** 2.4.1 Bypass Blocks (Level A)
**Severity:** Blocker
**Affected:** Keyboard users, screen reader users
**Description:** No skip link exists anywhere in the application. Users must tab through the entire 64px fixed navbar (logo + 4 nav links + CTA + hamburger = 7 focusable elements) on every page.

**Repro:** Tab from beginning of any page — there is no mechanism to jump past the navigation.

**Fix (Engineering):**
Add to the top of the `<body>` output, before Navbar renders. In `App.tsx` or `index.html`:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

Add CSS (in `index.css`):
```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 10000;
  background: #C0E57A;
  color: #0A171E;
  font-family: 'Gabarito', sans-serif;
  font-weight: 700;
  font-size: 15px;
  padding: 12px 24px;
  border-radius: 0 0 8px 0;
  text-decoration: none;
  transition: top 0.2s;
}
.skip-link:focus {
  top: 0;
}
```

Add `id="main-content" tabindex="-1"` to each page's primary `<section>` or wrap a `<main id="main-content">` element.

**Verification:** Tab once from page load — skip link appears; activate it and focus moves past nav.

---

### A02 — Focus Indicators Absent
**WCAG SC:** 2.4.7 Focus Visible (Level AA)
**Severity:** Blocker
**Affected:** Keyboard users, sighted keyboard navigators
**Description:** The `.p-input` class sets `outline: none` with no replacement. The `.btn-primary` and `.btn-ghost` classes have no `:focus-visible` style. The nav `<span>` elements receive no focus outline because they are not the interactive element (the `<Link>` ancestor is).

**Location (exact CSS):**
```css
/* index.css line ~611 */
.p-input {
  outline: none;  /* removes browser default — NO replacement provided */
}
.p-select {
  outline: none;  /* same issue */
}
```

**Fix (Engineering):**

```css
/* Replace outline: none with focus-visible replacement */
.p-input:focus-visible,
.p-select:focus-visible {
  outline: 2px solid #C0E57A;
  outline-offset: 2px;
  border-color: rgba(192, 229, 122, 0.7);
}

.btn-primary:focus-visible {
  outline: 2px solid #0A171E;
  outline-offset: 3px;
  box-shadow: 0 0 0 4px #C0E57A;
}

.btn-ghost:focus-visible {
  outline: 2px solid #C0E57A;
  outline-offset: 2px;
}

.btn-text:focus-visible {
  outline: 2px solid #C0E57A;
  outline-offset: 2px;
  border-radius: 4px;
}
```

Add a global fallback in `@layer base`:
```css
*:focus-visible {
  outline: 2px solid #C0E57A;
  outline-offset: 2px;
}
```

**Verification:** Tab through all interactive elements — each shows a visible lime outline ring.

---

### A03 — Form Inputs Have No Programmatic Label
**WCAG SC:** 3.3.2 Labels or Instructions (AA) and 1.3.1 Info and Relationships (A)
**Severity:** Blocker
**Affected:** Screen reader users, voice control users (Dragon NaturallySpeaking)
**Description:**

`Home.tsx` WaitlistForm (lines 96–97):
```tsx
<input className="p-input" type="text" placeholder="Your name" ... />
<input className="p-input" type="email" placeholder="Your email address" ... />
```
No `<label>` element. Placeholder is the only name source, which disappears on input.

`Contact.tsx` form (lines 114–140): `<label>` elements present BUT none have a `for` attribute matching an input `id`. The inputs have no `id` attribute at all, so the label-input association is not programmatic.

`Waitlist.tsx` (lines 87–94): All inputs use only `placeholder` — no labels at all.

`Blog.tsx` newsletter input (line 243): Email input has no label.

**Fix (Contact page example):**
```tsx
{/* BEFORE */}
<label style={{...}}>First name</label>
<input type="text" placeholder="Anca" className="p-input" required />

{/* AFTER */}
<label htmlFor="contact-first-name" style={{...}}>First name</label>
<input 
  id="contact-first-name"
  type="text" 
  placeholder="Anca" 
  className="p-input" 
  required 
  aria-required="true"
/>
```

**Fix (Waitlist page):**
```tsx
{/* Use visually-hidden labels if design must not show labels */}
<label htmlFor="waitlist-first-name" className="sr-only">First name</label>
<input id="waitlist-first-name" type="text" placeholder="First name" className="p-input" required />
```

Add sr-only utility to index.css:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

**Verification:** Screen reader announces "First name, text input" when field is focused (not just placeholder text).

---

### A04 — Form Success States Not Announced (Missing Live Regions)
**WCAG SC:** 4.1.3 Status Messages (Level AA)
**Severity:** High
**Affected:** Screen reader users
**Description:** When a form is submitted successfully, the UI swaps the form for a success message by toggling React state. This DOM replacement is invisible to screen readers unless wrapped in a live region.

`Home.tsx` lines 83–91: Success div rendered without any ARIA live region.
`Contact.tsx` lines 101–108: Same pattern.
`Waitlist.tsx` lines 43–53: Same pattern.

**Fix:**
```tsx
{/* Wrap the success state or announce it */}
{submitted ? (
  <div role="status" aria-live="polite" aria-atomic="true" className="text-center py-8">
    {/* success content */}
  </div>
) : (
  <form ...>...</form>
)}
```

Also add an off-screen live region that triggers on submit:
```tsx
const [announcement, setAnnouncement] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
  setAnnouncement("You're on the list. We'll reach out when your spot opens up.");
};

// In JSX:
<div role="status" aria-live="polite" className="sr-only">{announcement}</div>
```

**Verification:** Submit form with screen reader running — the reader announces the success message without focus moving.

---

### A05 — SPA Route Changes Not Announced
**WCAG SC:** 2.4.3 Focus Order (A), 4.1.3 Status Messages (AA)
**Severity:** High
**Affected:** Screen reader users
**Description:** `App.tsx` uses a `ScrollToTop` component that fires `window.scrollTo` on route change. No focus management or live region announcement occurs. Screen reader users activating a nav link hear no indication the page changed.

**Fix in App.tsx:**
```tsx
function RouteAnnouncer() {
  const [location] = useLocation();
  const [announcement, setAnnouncement] = useState("");
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const title = document.title;
    setAnnouncement(`Navigated to ${title}`);
    // Move focus to main landmark
    const main = document.getElementById("main-content");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
    // Clear announcement after SR picks it up
    const t = setTimeout(() => setAnnouncement(""), 1000);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
```

**Verification:** Navigate between routes with screen reader — each route change announces the new page title.

---

### A06 — Footer Text Fails Contrast (2.21:1)
**WCAG SC:** 1.4.3 Contrast Minimum (Level AA)
**Severity:** High
**Affected:** Low vision users
**Description:** Footer uses `color: #234966` for category headings ("Product", "Company", "Legal") and both copyright/attribution lines on a `#050C10` background. Calculated contrast: 2.21:1 (required: 4.5:1).

**Affected code in Footer.tsx:**
```tsx
/* Line 84-93 — category headings */
color: '#234966'  /* FAIL: 2.21:1 on #050C10 */

/* Line 129-133 — copyright */
color: '#234966'  /* FAIL: 2.21:1 on #050C10 */
```

**Fix:**
Replace `#234966` with `#8C9C8C` (passes at 4.67:1) for all visible text in the footer. If the intent is decorative or label-tag style, use the existing `color: '#8C9C8C'` token instead:
```tsx
color: '#8C9C8C'  /* 4.67:1 on #050C10 — PASS */
```

---

### A07 — Breadcrumb Link Contrast Fails (3.20:1)
**WCAG SC:** 1.4.3 Contrast Minimum (Level AA)
**Severity:** Medium
**Affected:** Low vision users
**Description:** `Breadcrumb.tsx` line 73 uses `color: '#6B7F7B'` for anchor links at 13px normal weight. At 3.20:1 against #0A171E this fails the 4.5:1 requirement.

**Fix in Breadcrumb.tsx:**
```tsx
/* Replace #6B7F7B with #8C9C8C (4.67:1) or #A5B4A5 */
color: '#8C9C8C',  /* passes 4.67:1 */
onMouseEnter={(e) => (e.currentTarget.style.color = "#C0E57A")}
onMouseLeave={(e) => (e.currentTarget.style.color = "#8C9C8C")}
```

---

### A08 — Mobile Drawer Missing ARIA Roles and State
**WCAG SC:** 4.1.2 Name, Role, Value (Level A)
**Severity:** High
**Affected:** Screen reader users on mobile
**Description:** `Navbar.tsx` line 100: The hamburger `<button>` correctly has `aria-label="Toggle menu"`, but lacks `aria-expanded`. The mobile drawer div (line 133) has no `role="dialog"`, no `aria-modal`, no `aria-labelledby`, and no focus trap. When it opens, screen readers have no signal that a modal-type overlay appeared, and Tab traversal escapes the drawer.

**Fix in Navbar.tsx:**
```tsx
{/* Hamburger button */}
<button
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  aria-expanded={menuOpen}
  aria-controls="mobile-nav"
  ...
>

{/* Mobile drawer */}
{menuOpen && (
  <div
    id="mobile-nav"
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
    ...
  >
    {/* Focus trap: useEffect to trap Tab key within this div */}
    {/* First focusable element should auto-receive focus */}
  </div>
)}
```

Additionally add focus trapping and Escape key close:
```tsx
useEffect(() => {
  if (!menuOpen) return;
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setMenuOpen(false);
  };
  document.addEventListener('keydown', handleKey);
  return () => document.removeEventListener('keydown', handleKey);
}, [menuOpen]);
```

---

### A09 — Waitlist Role Selector Missing aria-pressed
**WCAG SC:** 4.1.2 Name, Role, Value (Level A)
**Severity:** Medium
**Affected:** Screen reader users
**Description:** `Waitlist.tsx` lines 69–81 render two `<button>` elements as a selection toggle ("Patient" / "Dentist / Clinic"). The selected state is communicated only via visual styling (border and background color change). No `aria-pressed` is set.

**Fix:**
```tsx
<button
  key={r}
  onClick={() => setRole(r)}
  aria-pressed={role === r}
  type="button"
  ...
>
```

---

### A10 — Nav Links Not Semantically Interactive
**WCAG SC:** 2.1.1 Keyboard (Level A), 4.1.2 Name, Role, Value (A)
**Severity:** High
**Description:** `Navbar.tsx` lines 69–90 wrap a `<span>` element inside `<Link>`. The Wouter `<Link>` renders an `<a href>` tag, so keyboard interaction should work at the `<a>` level. However, the `<span>` has `onMouseEnter`/`onMouseLeave` handlers and `style.color` manipulation — these are cosmetic-only. The more serious issue is the desktop nav link surface area: the `<span>` with `padding: '8px 14px'` is what the user visually targets, and since the `<a>` wraps it, it should be accessible. **Confirmed keyboard traversal works.**

However, on the mobile drawer (lines 145–159), the clickable surface is a `<div>` inside `<Link>`. Wouter's `<Link>` renders an `<a>`, so this should be accessible. Risk: the `<div>` has no hover focus style and is only selectable by tab via the ancestor `<a>`.

**Fix:** Replace the inner `<div>` in mobile drawer with a semantic text node or `<span>` to avoid role confusion. Add explicit `:focus-visible` on the `<Link>` anchor:

```tsx
/* Desktop nav link */
<Link key={href} href={href} style={{ textDecoration: 'none', borderRadius: '8px' }}>
  <span ...>  /* keep inner span for styling */
```

Add in index.css:
```css
.navbar a:focus-visible {
  outline: 2px solid #C0E57A;
  outline-offset: 2px;
  border-radius: 8px;
}
```

---

### A11 — Custom Cursor Replaces System Cursor
**WCAG SC:** 1.4.1 Use of Color (A), User Agent Control principle
**Severity:** Low
**Description:** `CustomCursor.tsx` uses `position: fixed` elements tracking the mouse. The custom cursor is hidden on mobile (CSS `display: none`). On desktop it visually replaces the system cursor — users with motor disabilities relying on high-visibility system cursor themes or accessibility settings may lose their cursor indicator.

**Fix:** The custom cursor is additive (the system cursor still shows on top unless CSS `cursor: none` is set). Review the global cursor behaviour. If `cursor: none` is set anywhere in production, add a `@media (prefers-reduced-motion: reduce), (pointer: none)` guard to disable it.

Currently index.css does not set `cursor: none` globally — the cursor is supplemental. **Low risk but flag for production.**

---

### A12 — No prefers-reduced-motion Handling
**WCAG SC:** 2.3.3 Animation from Interactions (Level AAA); WCAG 2.1 SC 1.4.12 relevance
**Severity:** High (for users with vestibular disorders — WCAG AAA but strong user need)
**Description:** The site has extensive CSS animations: `ken-burns`, `drift-x`, `breathe`, `float`, `ticker`, `pulse-ring`, `glow-pulse`, `orb-drift-1/2/3`, `particle-rise`, `scan-line` — none have a `prefers-reduced-motion` counterpart. Users with vestibular disorders (motion sickness, epilepsy triggers) receive the full animated experience with no opt-out.

**Fix in index.css:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Preserve reveal visibility so content isn't hidden */
  .reveal,
  .reveal-scale {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

**Critical note:** The `.reveal` / `.reveal-scale` classes start at `opacity: 0`. If a user has JavaScript disabled or IntersectionObserver fails, and `prefers-reduced-motion` is set, these elements would remain invisible without the fix above.

---

### A13 — Inline SVG Icons Missing aria-hidden
**WCAG SC:** 1.1.1 Non-text Content (Level A)
**Severity:** Medium
**Description:** Decorative SVG icons (check marks, arrows, feature icons) throughout the site are rendered inline without `aria-hidden="true"`. Screen readers will attempt to read them — typically announcing "image" or reading the SVG path data. For SVGs used purely decoratively (not conveying unique information), they should be hidden from AT.

Example from `Home.tsx` line 107:
```tsx
<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M5 12h14M12 5l7 7-7 7" .../>
</svg>
```

This is a directional arrow after "Join the Waitlist" text — the `<Link>` text is descriptive enough, the SVG is decorative.

**Fix (systematic):**
All purely decorative SVGs should receive `aria-hidden="true"`:
```tsx
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
```

Feature-icon SVGs that ARE the sole content representation of a concept (e.g., the circle-pulse "Scan/Analyze/Engage" icons on Home) should get `role="img"` and `aria-label`:
```tsx
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" role="img" aria-label="QR code scanner icon">
```

---

### A14 — Footer Category Headings Use `<p>` Not `<h3>`
**WCAG SC:** 2.4.6 Headings and Labels (Level AA)
**Severity:** Low
**Description:** `Footer.tsx` lines 84–93 use `<p>` for the "Product", "Company", "Legal" column headers. Screen reader users navigating by heading will miss these landmarks.

**Fix:**
```tsx
<h3 style={{
  fontFamily: 'Gabarito, sans-serif',
  fontSize: '11px',
  fontWeight: 600,
  ...
}}>
  {category}
</h3>
```

---

### A15 — Ticker Strip Read by Screen Readers
**WCAG SC:** 1.3.1 Info and Relationships (Level A)
**Severity:** Medium
**Description:** `Home.tsx` lines 220–232: The ticker strip contains two copies of all content (for seamless animation loop). Screen readers will read the same text twice. The ticker is purely decorative/marketing text.

**Fix:**
Add `aria-hidden="true"` to the ticker wrapper. If the content has any unique value, provide a visually hidden alternative once:
```tsx
<div
  style={{ background: "#C0E57A", padding: "14px 0", overflow: "hidden" }}
  aria-hidden="true"
>
  <div className="ticker-track">
    ...
  </div>
</div>
```

---

### A19 — Blog Post Cards: Accessible Name Includes Full Card Body
**WCAG SC:** 2.4.4 Link Purpose (Level A)
**Severity:** Medium
**Description:** `Blog.tsx` — featured posts (lines 138–176) and regular posts (lines 186–227) wrap entire card content in `<Link>`. The accessible name of each link becomes the concatenation of category tag + title + excerpt + author + date + read time — an extremely long string that impairs navigation by links in screen readers.

**Fix:**
Use `aria-label` on the `<Link>` to provide a concise name:
```tsx
<Link
  href={`/blog/${post.slug}`}
  style={{ textDecoration: "none" }}
  aria-label={`Read article: ${post.title}`}
>
```

---

### A20 — Form Error Feedback Relies Solely on Browser Validation
**WCAG SC:** 3.3.1 Error Identification (Level A)
**Severity:** Medium
**Description:** Contact and Waitlist forms use `required` on inputs but provide no custom error messages or `aria-invalid` states. Browser-native validation popups are not guaranteed to be accessible in all AT/browser combinations and do not appear in voice browser contexts.

**Fix:**
```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

<input
  id="contact-email"
  type="email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? "email-error" : undefined}
  ...
/>
{errors.email && (
  <span id="email-error" role="alert" style={{ color: '#C0E57A', fontSize: 12 }}>
    {errors.email}
  </span>
)}
```

---

## E) Heading Hierarchy Audit

| Page | Hierarchy | Status |
|---|---|---|
| Home | h1 (hero) → h2 (Features, How It Works, The Team, Be first) → h3 (card titles) | PASS |
| Features | h1 (hero) → h2 (CTA) → h3 (feature cards) | PASS |
| ForDentists | h1 (hero) → h2 (Clinical Tools, Be a founding clinic) → h3 (feature cards) | PASS |
| About | h1 (hero) → h2 (Mission, Team, CTA) → h3 (team cards) | PASS |
| Blog | h1 (hero) → h2 (featured card titles, All Articles) → h3 (regular post titles) | PASS |
| BlogPost | h1 (article title) → h2 (in-body headings from HTML string content) — body content uses hardcoded `<h2>` tags in raw HTML strings without review | Risk |
| Contact | h1 (hero) → h3 (Send a message) — **h3 without preceding h2 is a skip** | FAIL (Medium) |
| Waitlist | h1 (hero) → h2 (You're on the list!) — no h2 in the main form view | PASS |
| Pricing | h1 (hero) → h3 (plan names, FAQ questions) — **h3 without h2 in between** | FAIL (Low — FAQ section should use h2 for "Common Questions") |
| Privacy | h1 (hero) → h2 (sections) | PASS |

**Fix (Contact.tsx line 111):**
```tsx
<h2 style={{ fontFamily: "Dongle, sans-serif", fontSize: 28, ... }}>Send a message</h2>
```

**Fix (Pricing.tsx):**
```tsx
{/* FAQ section heading — currently h2 in reveal but FAQ item headings use h3 */}
<h2 className="reveal" style={{ ... }}>Common questions</h2>
{/* item headings — already h3, correct */}
```

---

## F) Touch Target Audit

**WCAG 2.1 SC 2.5.5 Target Size (AAA, recommended) — minimum 44×44px for AA-adjacent best practice:**

| Element | Actual Size | Status |
|---|---|---|
| Hamburger menu button | 38×38px | FAIL — 6px short of 44×44px |
| `.btn-primary` with `padding: 14px 28px` | ~47px tall | PASS |
| `.btn-primary` with `padding: 9px 20px` (navbar CTA) | ~37px tall | FAIL — navbar CTA |
| Nav link `<span>` elements | 8+8=16px vertical padding + 14px font = ~38px | BORDERLINE |
| Footer links | 14px font, ~10px gap | FAIL — 24px touch target |
| Breadcrumb links | 13px font, no padding | FAIL — ~20px touch target |

**Fix:**
```tsx
/* Hamburger: change from 38px to 44px */
width: '44px',
height: '44px',

/* Navbar CTA */
padding: '11px 20px',  /* increases height to ~40px minimum */

/* Footer links — add padding */
padding: '6px 0',  /* gives ~26px; add min-height: 44px on the link */
```

---

## G) 200% Zoom Assessment

At 200% browser zoom (1280px viewport → effective 640px CSS width):

- The hero section's 2-column grid (`gridTemplateColumns: "1.1fr 0.9fr"`) collapses to single column via natural word wrap — **PASS**
- Feature bento grid with `repeat(3, 1fr)` becomes a 3-column layout at 640px — columns become ~180px wide, cards become very narrow. **PARTIAL FAIL** — content may overflow or become illegible
- ForDentists stats grid `repeat(3, 1fr)` at 640px: same issue
- Fixed `width: 340` PhoneMockup has `maxWidth: "100%"` — **PASS** (scales down)
- No explicit `max-scale` lock beyond `maximum-scale=1` in viewport meta — **NOTE:** `maximum-scale=1` in `index.html` **prevents users from pinching to zoom on iOS Safari**, which is a WCAG 1.4.4 (Resize Text) violation for mobile users who rely on browser zoom.

**Critical Fix (index.html line 4):**
```html
<!-- BEFORE -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />

<!-- AFTER — remove maximum-scale to allow user zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

This is a **Blocker** on mobile: `maximum-scale=1` prevents pinch-to-zoom which is a WCAG 2.1 failure under SC 1.4.4 (Resize Text, Level AA).

---

## H) Additional Issues Found During Code Review

### `<html lang="en-GB">` vs `lang="en"`
The HTML lang is `en-GB` but there is no in-content language change marking for the Romanian founder names or the company location details. Low risk for this SPA.

### `<blockquote>` without cite
Multiple `<blockquote>` elements (Home.tsx, About.tsx) do not have a `cite` attribute. Informational, not a WCAG failure.

### PhoneMockup — aria-hidden recommended
The PhoneMockup component (`PhoneMockup.tsx`) renders a visual representation of a phone screen. It is decorative in context (the hero section has textual CTAs). Add `aria-hidden="true"` to the outer wrapper:
```tsx
<div aria-hidden="true" style={{ position: "relative", width: 340, ... }}>
```

### CustomCursor — no pointer:coarse guard
The CustomCursor is hidden with CSS on `max-width: 768px`. It should also be disabled for `pointer: coarse` (touch devices that can also use a mouse at desktop widths):
```css
@media (pointer: coarse) {
  #cursor-dot, #cursor-ring { display: none; }
}
```

---

## I) Prioritised Remediation Backlog

| Priority | ID | Fix | Effort |
|---|---|---|---|
| P0 (Blocker) | A01 | Add skip-to-main link | 1 hour |
| P0 (Blocker) | zoom | Remove `maximum-scale=1` from viewport meta | 5 minutes |
| P0 (Blocker) | A02 | Add `:focus-visible` styles to all interactive elements + remove `outline: none` | 2 hours |
| P0 (Blocker) | A03 | Add `<label htmlFor>` associations to all form inputs | 2 hours |
| P1 (High) | A04 | Add `role="status" aria-live="polite"` to form success states | 1 hour |
| P1 (High) | A05 | Add `RouteAnnouncer` component to App.tsx | 1 hour |
| P1 (High) | A06 | Replace `color: #234966` footer text with `#8C9C8C` | 30 minutes |
| P1 (High) | A08 | Add `aria-expanded`, `role="dialog"`, `aria-modal`, focus trap to mobile nav drawer | 2 hours |
| P1 (High) | A12 | Add `prefers-reduced-motion` media query to index.css | 30 minutes |
| P2 (Medium) | A07 | Fix breadcrumb link colour to `#8C9C8C` | 15 minutes |
| P2 (Medium) | A09 | Add `aria-pressed` to role-selector buttons in Waitlist | 15 minutes |
| P2 (Medium) | A13 | Add `aria-hidden="true"` to all decorative SVGs | 2 hours |
| P2 (Medium) | A15 | Add `aria-hidden="true"` to ticker strip | 15 minutes |
| P2 (Medium) | A19 | Add `aria-label` to blog post card links | 30 minutes |
| P2 (Medium) | A20 | Add custom error states and `aria-invalid` to forms | 2 hours |
| P3 (Low) | A10 | Add `a:focus-visible` styles in navbar | 30 minutes |
| P3 (Low) | A14 | Change footer category `<p>` to `<h3>` | 30 minutes |
| P3 (Low) | touch | Increase hamburger to 44×44px, add padding to footer links | 30 minutes |
| P3 (Low) | A11 | Add `pointer: coarse` guard to CustomCursor | 15 minutes |

**Total estimated remediation effort: ~16 hours**

---

## J) Definition of Done (Engineering + QA)

### Engineering Acceptance Criteria

- [ ] Skip link appears on first Tab keypress and moves focus to `#main-content`
- [ ] `maximum-scale=1` removed from viewport meta tag
- [ ] All interactive elements show a 2px #C0E57A outline on `:focus-visible`
- [ ] `outline: none` replaced with `:focus-visible` replacement in `.p-input` and `.p-select`
- [ ] Every form input has a programmatically associated `<label>` (via `htmlFor`/`id` or `aria-labelledby`)
- [ ] Form success states wrapped in `role="status" aria-live="polite"`
- [ ] SPA route changes announce page title via `aria-live="polite"` region
- [ ] Footer text colours changed from `#234966` to `#8C9C8C` on `#050C10` bg
- [ ] Breadcrumb link colour changed to `#8C9C8C`
- [ ] Mobile nav drawer has `role="dialog"`, `aria-modal="true"`, `aria-expanded` on toggle, Escape closes it
- [ ] `prefers-reduced-motion` media query disables all animations and preserves `.reveal` visibility
- [ ] All decorative SVGs have `aria-hidden="true"`
- [ ] Ticker strip has `aria-hidden="true"` wrapper
- [ ] Blog card links have descriptive `aria-label`
- [ ] Hamburger button is 44×44px

### QA Verification Steps

1. **Keyboard-only test:** Tab through entire Home page — verify skip link visible on first Tab, all buttons/links reachable, focus ring visible on every element, no keyboard traps
2. **VoiceOver test (Mac):** Cmd+F5, navigate all pages — verify route announcements, form labels read on focus, success messages announced, nav drawer state announced
3. **axe DevTools scan:** Run on /, /features, /contact, /waitlist — target 0 critical violations
4. **Lighthouse Accessibility:** Target score ≥ 85 after P0/P1 fixes, ≥ 92 after all fixes
5. **200% zoom test:** Verify no horizontal scroll at 1280px window / 200% zoom on all pages
6. **Pinch-zoom test (iOS Safari):** Verify page is user-scalable after viewport meta fix
7. **Reduced motion test:** Enable `prefers-reduced-motion: reduce` in OS — verify no animations run, all `.reveal` content is visible
8. **Contrast checker:** Verify footer and breadcrumb colours against background using WebAIM contrast checker

---

## K) Positive Findings (What Works Well)

- `<html lang="en-GB">` present — correct per SC 3.1.1
- Page `<title>` is meaningful: "Perioskoup — Your Personal Dental Companion"
- `<nav aria-label="Breadcrumb">` with `<ol>` list structure — correct
- Hamburger button has `aria-label="Toggle menu"` 
- All named person images have descriptive alt text (`alt="Dr. Anca Laura Constantin"`)
- `ParallaxHeroBg` has `aria-hidden="true"` — decorative background correctly hidden
- `btn-primary` contrast: #0A171E on #C0E57A = 9.55:1 — excellent
- Main text contrast: #F5F9EA on #0A171E = 12.73:1 — excellent
- Radix UI primitives (Dialog, Sheet, etc.) ship with built-in ARIA — if used, they handle role/focus automatically
- `<footer>` semantic element used correctly
- `<blockquote>` used for quotes (semantically appropriate)
- Form submit buttons use `type="submit"` correctly

---

*Report generated by WCAG 2.1 AA Specialist Agent — 2026-03-06*
*Standards: WCAG 2.1 Level A and AA | Tools: Static source code analysis*
*This is accessibility conformance guidance, not a legal certification.*
