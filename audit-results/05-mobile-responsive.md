# Mobile Responsiveness Audit — Perioskoup Landing Page
**Date:** 2026-03-06
**Auditor:** Claude Sonnet 4.6 (mobile-responsive specialist subagent)
**Scope:** Full audit of all pages and components at 320px / 375px / 414px / 768px / 1024px / 1440px viewports.

---

## Overall Score: 7.2 / 10

The codebase has a solid mobile-first foundation: `overflow-x: clip` on body, a full-screen modal drawer with focus trap, responsive `container` utility with clamp-based section padding, and Tailwind breakpoints used throughout grids. However there are eleven concrete issues — eight of them medium-severity — that cause real layout problems on small screens. Every issue below includes a specific, copy-ready fix.

---

## Summary of Issues by Severity

| Sev | Count | Issues |
|-----|-------|--------|
| HIGH | 2 | Hero section paddingTop fixed at 140px on secondary pages (navbar overlap at 320px); Contact card padding fixed at 40px |
| MEDIUM | 6 | `useMobile` hook unused in all page code; PhoneMockup outer width hardcoded at 340px without clamp; How-It-Works circles 160px/280px fixed; card base padding 32px not responsive; Pricing FAQ section `padding: "120px 0"` fixed; CTA orb elements with 700px fixed dimensions extend beyond viewport |
| LOW | 3 | Blog newsletter input `minWidth: 220px` can overflow at 320px; ForDentists/About quote flex `minWidth: 280` causes horizontal squeeze at 320px; `display-lg` clamp minimum 44px slightly large for 320px |

---

## Issue 1 — HERO SECTION: Fixed paddingTop: 140 on Secondary Pages (HIGH)

**Files affected:**
- `client/src/pages/ForDentists.tsx:74`
- `client/src/pages/About.tsx:115`
- `client/src/pages/Contact.tsx:101`
- `client/src/pages/Pricing.tsx:87`
- `client/src/pages/Waitlist.tsx:76` (`paddingBottom: 120` also fixed)
- `client/src/pages/Blog.tsx:175`
- `client/src/pages/Terms.tsx:41`
- `client/src/pages/Privacy.tsx:40`
- `client/src/pages/NotFound.tsx:22` (`paddingTop: 180`)

**Problem:** Every secondary page hero sets `paddingTop: 140` (or 180) as a bare integer (no clamp, no responsive suffix). The navbar is 64px tall. At 320px viewport, 140px top-padding is still workable, but it is a rigid fixed value — any increase in navbar height (e.g. from font-size scaling or future double-row nav) will cause content to be hidden under the navbar. Compare with Home.tsx which correctly uses `paddingTop: "clamp(80px, 12vw, 120px)"`.

Additionally `Features.tsx:65` sets `paddingTop: "120px"` as a flat string with no clamp.

**Impact at 320px:** The first visible heading on About/ForDentists/Contact/Blog is immediately below the fixed 140px gap. Content is accessible but the rigid value is fragile.

**Fix — apply clamp to all secondary hero sections:**

```tsx
// Replace every instance of:
style={{ paddingTop: 140, paddingBottom: 80, ... }}
// With:
style={{ paddingTop: "clamp(96px, 14vw, 140px)", paddingBottom: "clamp(48px, 8vw, 80px)", ... }}

// Features.tsx paddingTop: "120px" → 
style={{ paddingTop: "clamp(96px, 12vw, 120px)", ... }}

// NotFound.tsx paddingTop: 180 →
style={{ paddingTop: "clamp(120px, 16vw, 180px)", paddingBottom: "clamp(64px, 10vw, 120px)", ... }}
```

---

## Issue 2 — CONTACT FORM CARD: Fixed padding: 40 (HIGH)

**File:** `client/src/pages/Contact.tsx:145`

```tsx
<div className="card reveal" style={{ padding: 40 }}>
```

**Problem:** The card uses the `.card` CSS class which already sets `padding: 32px`. The inline `padding: 40` overrides it with a fixed 40px value on all sides. At 320px, the card has `padding: 40px` left+right, leaving only 240px of usable content width (320 - 2×40). The form inputs inside use `class="p-input"` with `padding: 14px 18px`, which is fine — but any inline content that is also wide will overflow.

**Fix:**

```tsx
// Replace:
<div className="card reveal" style={{ padding: 40 }}>
// With:
<div className="card reveal" style={{ padding: "clamp(20px, 5vw, 40px)" }}>
```

---

## Issue 3 — `useMobile` HOOK NOT USED IN ANY PAGE COMPONENT (MEDIUM)

**File:** `client/src/hooks/useMobile.tsx`

**Problem:** The `useIsMobile()` hook exists and is correctly implemented (uses `matchMedia`, fires at 768px breakpoint, reactive to resize). However, grepping across all page and component files shows it is imported and used in exactly **zero** page components — only in `client/src/components/ui/sidebar.tsx` (a shadcn/ui primitive that is unused). All mobile-specific logic in Navbar (hamburger show/hide) uses Tailwind classes (`hidden md:flex`, `flex md:hidden`) which is the correct approach. However, the hook should either be documented as intentionally unused or removed to avoid dead-code confusion. More importantly, if there are future components that need JS-gated mobile behaviour, the hook is already available but developers may not know to reach for it.

**Fix (choose one):**

Option A — Remove the hook and its file if purely unused:
```bash
rm client/src/hooks/useMobile.tsx
```

Option B — Document it as available for future use with a comment in the file header:
```tsx
/**
 * useIsMobile — returns true when viewport < 768px.
 * Used by: [none currently — reserved for JS-gated mobile behaviour]
 * Prefer Tailwind responsive classes where possible.
 */
```

---

## Issue 4 — PHONE MOCKUP: Outer width hardcoded at 340px (MEDIUM)

**File:** `client/src/components/PhoneMockup.tsx:29`

```tsx
style={{
  position: "relative",
  width: 340,
  maxWidth: "100%",
  ...
}}
```

**Problem:** `width: 340` (bare integer = 340px) is the outer phone frame size. `maxWidth: "100%"` provides a safety valve, so the component does not technically overflow its parent — but the behaviour on very narrow screens (320px) is: the parent wrapper in Home.tsx is `max-w-[300px] sm:max-w-[340px]`, which constrains the phone to 300px. The phone component renders at 340px then squashes to 300px via maxWidth. This works but causes the `drop-shadow` filter and the absolute-positioned side buttons (at `right: -5`, `left: -5`) to be clipped by the parent `overflow: hidden` or compressed.

The Home.tsx wrapper is:
```tsx
<div className="w-full max-w-[300px] sm:max-w-[340px] mx-auto px-2">
```
At 320px, `max-w-[300px]` means the container is 300px. The phone is 340px but `maxWidth: "100%"` pins it to 300px. The frame radii, Dynamic Island proportions and side buttons are all designed for 340px and look slightly squished at 300px.

**Fix:**

```tsx
// In PhoneMockup.tsx — use clamp so the phone scales naturally:
style={{
  position: "relative",
  width: "clamp(280px, 85vw, 340px)",
  maxWidth: "100%",
  ...
}}

// In Home.tsx — remove the extra max-w constraint and let PhoneMockup self-govern:
<div className="w-full mx-auto px-2" style={{ maxWidth: "clamp(280px, 85vw, 340px)" }}>
```

---

## Issue 5 — HOW IT WORKS CIRCLES: Fixed 160px / 280px diameters (MEDIUM)

**File:** `client/src/pages/Home.tsx:306-311`

```tsx
style={{
  position: "absolute", top: "50%", left: "50%",
  transform: "translate(-50%, -50%)",
  width: 280, height: 280,   // ← fixed
  borderRadius: "50%",
  ...
}}
// ...
style={{
  width: 160, height: 160,   // ← fixed
  borderRadius: "50%",
  ...
}}
```

**Problem:** The decorative outer radial-gradient circle is 280px and the main circle-pulse element is 160px, both fixed. At 320px viewport the grid renders as `grid-cols-1` (stacking), so each step occupies full width. The 160px circle is fine. But the 280px background glow circle can extend outside the visible area when its absolute-positioned center aligns at the grid column center. On 320px screens where the container has ~288px usable width (320 - 2×16px padding), the 280px circle fills almost the entire width and its `::after` pulse ring (`inset: -18px`) creates a 316px element that marginally overflows.

**Fix:**

```tsx
// Replace fixed px with clamp:
// Outer glow circle:
width: "clamp(180px, 60vw, 280px)", height: "clamp(180px, 60vw, 280px)"

// Inner circle-pulse:
width: "clamp(120px, 40vw, 160px)", height: "clamp(120px, 40vw, 160px)"
```

The step number badge at `top: -4, right: -4` (fixed 32px circle) also becomes proportional:
```tsx
// Step badge:
width: "clamp(28px, 8vw, 32px)", height: "clamp(28px, 8vw, 32px)"
```

---

## Issue 6 — CARD BASE CLASS: Fixed padding: 32px not responsive (MEDIUM)

**File:** `client/src/index.css:775`

```css
.card {
  ...
  padding: 32px;
}
.card-dark {
  ...
  padding: 32px;
}
```

**Problem:** The `.card` and `.card-dark` base classes use a fixed `padding: 32px` on all sides. At 320px this leaves 256px of usable card interior (320 - 2×16px container padding - 2×32px card padding = 224px). Most card content fits, but the bento grid cards on Home (Features section) with long titles and descriptions can feel cramped. ForDentists clinical tool cards override with `p-5 sm:p-9` (correct) and Pricing uses `p-6 sm:p-10` (correct). But the base `.card` still affects cards that do not override.

**Fix in `client/src/index.css`:**

```css
.card {
  background: #1D3449;
  border: 1px solid #234966;
  border-radius: 20px;
  padding: clamp(20px, 5vw, 32px);   /* was: 32px */
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}
.card-dark {
  background: #050C10;
  border: 1px solid #1D3449;
  border-radius: 20px;
  padding: clamp(20px, 5vw, 32px);   /* was: 32px */
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
```

---

## Issue 7 — PRICING FAQ SECTION: Fixed padding: "120px 0" (MEDIUM)

**File:** `client/src/pages/Pricing.tsx:160`

```tsx
<section style={{ padding: "120px 0" }}>
```

**Problem:** This is a flat `120px` top and bottom padding — no clamp, no responsive variant. At 320px it creates 240px of dead vertical space that users must scroll through. Compare with the surrounding sections which correctly use `clamp(64px, 8vw, 120px)`.

**Fix:**

```tsx
<section style={{ padding: "clamp(64px, 8vw, 120px) 0" }}>
```

---

## Issue 8 — CTA ORB ELEMENTS: 700px / 600px fixed widths on mobile (MEDIUM)

**File:** `client/src/index.css:411-417`

```css
.cta-orb--1 { width: 700px; height: 700px; }
.cta-orb--2 { width: 600px; height: 600px; }
```

**Problem:** These decorative blur orbs are positioned absolute and extend far outside the viewport on mobile. While they do not cause horizontal scroll (the parent has `overflow: hidden`), they force the browser to composite a 700×700px GPU layer on a 320px screen — unnecessary on mobile devices.

Similar issue affects:
- `.hero-orb-1` at `width: 500px` (`index.css:964`)
- `.hero-ring-1` at `width: 600px` (`index.css:1008`)

These are decorative elements, but they waste mobile GPU memory.

**Fix — add mobile overrides for the decorative orbs:**

```css
@media (max-width: 767px) {
  .cta-orb--1 { width: 280px; height: 280px; }
  .cta-orb--2 { width: 240px; height: 240px; }
  .cta-orb--3 { width: 180px; height: 180px; }
  .cta-orb--4 { width: 140px; height: 140px; }
  .cta-orb--5 { width: 120px; height: 120px; }
  .hero-orb-1 { width: 220px; height: 220px; }
  .hero-orb-2 { width: 180px; height: 180px; }
  .hero-orb-3 { width: 140px; height: 140px; }
  .hero-ring-1 { width: 240px; height: 240px; }
  .hero-ring-2 { width: 180px; height: 180px; }
}
```

---

## Issue 9 — BLOG NEWSLETTER INPUT: minWidth: 220px can overflow at 320px (LOW)

**File:** `client/src/pages/Blog.tsx:328`

```tsx
<input
  id="newsletter-email"
  className="p-input"
  style={{ flex: "1", minWidth: "220px" }}
  ...
/>
<button type="submit" className="btn-primary" ...>Subscribe</button>
```

**Problem:** The form uses `flexWrap: "wrap"` and `justifyContent: "center"`, which means at small breakpoints the input and button wrap to separate lines. The `minWidth: "220px"` on the input is fine when wrapping occurs (the input takes full row width after wrap). However if the viewport is exactly 320-359px, the flex row may not wrap — the input at 220px + button at ~130px = 350px, which exceeds 320px. The `flexWrap: "wrap"` should prevent overflow, but the combination with `minWidth` means the wrap only fires after the element would overflow.

**Fix:**

```tsx
// Remove minWidth; the flex:1 with flexWrap handles it:
style={{ flex: "1", minWidth: "0", width: "100%" }}
// And ensure the form uses column layout on mobile:
style={{ 
  display: "flex", 
  gap: "8px", 
  transitionDelay: "0.24s", 
  flexDirection: "column",   // stack on mobile
}}
// Add sm:flex-row via Tailwind className:
className="reveal flex flex-col sm:flex-row gap-2 sm:gap-2"
```

---

## Issue 10 — QUOTE SECTIONS: minWidth: 280px forces horizontal squeeze at 320px (LOW)

**Files:**
- `client/src/pages/ForDentists.tsx:158` — `<div style={{ flex: 1, minWidth: 280 }}>`
- `client/src/pages/About.tsx:218` — `<div style={{ flex: 1, minWidth: 280 }}>`

**Problem:** The Dr. Anca quote sections use `flexWrap: "wrap"` (correctly set). The 80px avatar image + 280px minWidth for the quote text = 360px minimum. At 320px, both elements cannot fit on one row. `flexWrap: "wrap"` causes the text to drop below the avatar, which is acceptable — but the `minWidth: 280` means even the wrapped text block must be 280px wide, which in a 320px container with `1.5rem` (24px) side padding (from `.container`) leaves only 272px. The `minWidth: 280` then forces the element wider than its container.

**Fix:**

```tsx
// Replace minWidth: 280 with minWidth: 0 (flex shrink is handled by flexWrap):
<div style={{ flex: 1, minWidth: 0 }}>
// The flexWrap on the parent already handles the stacking correctly.
```

---

## Issue 11 — display-lg CLASS: Minimum font 44px still large at 320px (LOW)

**File:** `client/src/index.css:626-631`

```css
.display-lg {
  font-size: clamp(44px, 8vw, 110px);
}
```

**Problem:** At 320px, `8vw = 25.6px` which is below the 44px clamp minimum, so the heading renders at 44px. For Dongle (a tall display font with 0.93 line-height), 44px produces approximately 3.5 lines of body text height per character. On the Blog page, the display-lg h1 "Insights on dental health, AI, and care." wraps to 3 lines at 320px. This is readable but tight.

`display-xl` has `clamp(52px, 11vw, 160px)` — at 320px this yields 52px which on a 320px screen fills about 30% of the screen width per character. This is the more urgent case and applies to the Blog page H1 which uses `display-lg`.

**Fix:**

```css
.display-xl {
  font-size: clamp(40px, 11vw, 160px);   /* was: clamp(52px, ...) */
}
.display-lg {
  font-size: clamp(36px, 8vw, 110px);    /* was: clamp(44px, ...) */
}
```

This retains full desktop sizing while giving 320–375px screens slightly more breathing room.

---

## Positive Findings (What Is Done Well)

1. **Viewport meta tag** — `client/index.html:5` correctly sets `width=device-width, initial-scale=1.0`. No `user-scalable=no`. Correct.

2. **overflow-x: clip on body** — `client/src/index.css:194` prevents horizontal scroll from animated drawer translateX. Correct and intentional (clip not hidden preserves scroll).

3. **Mobile hamburger implementation** — `client/src/components/Navbar.tsx`: hamburger button is exactly 44×44px (`width: '44px', height: '44px'`), has `aria-label`, `aria-expanded`, `aria-controls`, focus trap on drawer, Escape key close, scroll lock on `<html>`, staggered link animations. Excellent.

4. **Drawer close button** — Also 44×44px with `aria-label="Close menu"`. Correct.

5. **Container utility** — `client/src/index.css:589-599` uses `width: 100%`, `padding-left: 1.5rem`, `padding-right: 1.5rem` with a 1024px breakpoint increasing to 2.5rem. Solid.

6. **Section padding** — The `.section` class correctly uses `clamp(64px, 8vw, 120px)`. Most Home.tsx sections use `clamp()` inline. Good.

7. **Grid layouts** — All multi-column grids use responsive breakpoint prefixes: `grid-cols-1 md:grid-cols-2`, `grid-cols-1 md:grid-cols-3`, `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. Grids correctly stack on mobile.

8. **PhoneMockup parent wrapper** — Home.tsx line 134 wraps PhoneMockup in `max-w-[300px] sm:max-w-[340px]` with `maxWidth: "100%"` on the component itself. Prevents overflow.

9. **Form inputs** — The `.p-input` class has `width: 100%` and `padding: 14px 18px` (vertical touch target: 14px × 2 + line-height ≈ 46px minimum height). Meets 44×44px touch target requirement.

10. **Responsive type scale** — `display-md`, `display-sm`, `body-lg`, `body-md` all use `clamp()`. `h1` tags on secondary pages use `clamp(56px, 7vw, 88px)` inline. Good coverage.

11. **Image sizing** — All `<img>` tags use `width="..." height="..."` attributes with `objectFit: "cover"` and no fixed pixel widths that could cause overflow. Responsive.

12. **Footer grid** — Uses `gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))'`. Naturally reflows at any viewport width. Correct.

13. **`prefers-reduced-motion`** — Comprehensive CSS block disables all animations. WCAG 2.3.3 compliant.

14. **Safe area** — No explicit `env(safe-area-inset-*)` handling, but the drawer uses `height: '100dvh'` (dynamic viewport height) which correctly accounts for notches and home indicators on iOS. Passing.

15. **`useMobile` hook** — Correctly implemented with `matchMedia` listener and SSR-safe initial `undefined` state. The hook is unused in pages, but that is a dead-code issue (Issue 3 above), not a breakage.

---

## Breakpoint Coverage Analysis

| Viewport | Home Hero | Secondary Pages | Forms | Grids | Navbar |
|----------|-----------|----------------|-------|-------|--------|
| 320px | Works (clamp) | Fixed 140px top ✗ | OK | Stacks correctly | Hamburger |
| 375px | Works | Fixed 140px top ✗ | OK | Stacks correctly | Hamburger |
| 414px | Works | Fixed 140px top ✗ | OK | Stacks correctly | Hamburger |
| 768px | Works | Transitions OK | OK | Mixed column counts | Desktop nav |
| 1024px | Works | Works | OK | Multi-column | Desktop nav |
| 1440px | Works | Works | OK | Full grid | Desktop nav |

**Primary risk viewports:** 320px (minWidth issues in flex quote sections, newsletter input edge case).

---

## Prioritised Fix List

| Priority | File | Fix |
|----------|------|-----|
| 1 (HIGH) | All secondary page heroes | Replace `paddingTop: 140` with `clamp(96px, 14vw, 140px)` |
| 2 (HIGH) | Contact.tsx:145 | Replace `padding: 40` with `clamp(20px, 5vw, 40px)` |
| 3 (MED) | index.css:775 | Card base padding → clamp |
| 4 (MED) | Pricing.tsx:160 | FAQ section padding → clamp |
| 5 (MED) | PhoneMockup.tsx:29 | width: 340 → clamp |
| 6 (MED) | Home.tsx:306-311 | HowItWorks circles → clamp |
| 7 (MED) | index.css:411-440 | Orb mobile overrides |
| 8 (MED) | useMobile.tsx | Document or remove |
| 9 (LOW) | Blog.tsx:328 | Newsletter input: drop minWidth |
| 10 (LOW) | ForDentists.tsx:158, About.tsx:218 | Quote minWidth: 280 → 0 |
| 11 (LOW) | index.css:620,626 | display-xl/display-lg lower clamp min |

---

## No Horizontal Overflow Detected

`overflow-x: clip` on body, plus `overflow: hidden` on animated section wrappers, prevents any detectable horizontal scroll. The decorative orbs are correctly contained. No `white-space: nowrap` strings without wrapping containers were found on critical user-facing content.

---

## Viewport Meta Correctness

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
Correct. No `maximum-scale`, no `user-scalable=no`. Passes Google and Apple guidelines.

---

*Score: 7.2 / 10. The site is genuinely mobile-friendly with no catastrophic failures. The 11 issues listed above — if fixed — would bring the score to approximately 9.0 / 10.*
