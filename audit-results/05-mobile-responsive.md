# Mobile Responsiveness Audit — Perioskoup Landing Page

**Date:** 2026-03-06  
**Auditor:** Claude Sonnet 4.6 (Mobile Responsive Specialist)  
**Score: 4.5 / 10**

---

## Executive Summary

The codebase is a Vite + React + Tailwind v4 SPA written almost entirely with inline `style={}` props rather than Tailwind utility classes. While several CSS custom classes exist in `index.css`, almost no responsive behaviour has been wired up — there are **zero** Tailwind responsive breakpoint prefixes (`sm:`, `md:`, `lg:`) used on any page or layout component. Every multi-column grid layout uses a fixed `gridTemplateColumns` string with no media-query fallback, causing severe horizontal overflow on phones. The `useIsMobile` hook exists but is **not used anywhere** in the actual page/component tree (only inside the unused `sidebar.tsx` primitive). The hero section uses `100vh` without a dynamic viewport fallback. Below is the complete itemised audit.

---

## 1. `useMobile.tsx` Hook — Not Used

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/hooks/useMobile.tsx`

The hook `useIsMobile()` is defined and functional (768 px breakpoint, MediaQueryList listener), but is imported only by `components/ui/sidebar.tsx`, which is a generic shadcn primitive that no page actually renders. None of the 8 pages or primary components (Navbar, Footer, PhoneMockup, etc.) consume it.

**Impact:** High. Any JS-driven layout switching (stacked vs grid, phone mockup sizing, hero layout) must rely on pure CSS. Since the code uses inline styles exclusively, it cannot easily use media queries — the hook was the escape hatch and it is unused.

**Fix:**
```tsx
// Use it wherever a layout decision cannot be expressed with pure CSS
// Example in Home.tsx hero:
import { useIsMobile } from "@/hooks/useMobile";

const isMobile = useIsMobile();
// ...
<div style={{
  display: "grid",
  gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
  gap: isMobile ? 40 : 64,
}}>
```

Or — preferred — migrate the layout divs to Tailwind classes: `className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16"`

---

## 2. Hero Section — Home Page (Critical)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx` — line 152

```jsx
<div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }}>
```

**Issues:**
- Two-column grid with **no mobile stack**. At 320 px the phone mockup (340 px minimum width) overflows the viewport.
- `gap: 64` (fixed px) is too large even for 375 px.
- Left column's stats row (`display: "flex", gap: 40`) causes horizontal scroll on narrow screens.
- `minHeight: "100vh"` does not account for mobile browser chrome (iOS Safari bottom bar shrinks the viewport).
- `paddingTop: 100, paddingBottom: 80` are fixed px values with no responsive reduction.

**Fixes:**

```css
/* index.css — add inside @layer components */
.hero-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 1024px) {
  .hero-layout {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 4rem;
  }
}
```

Or as Tailwind className (preferred):
```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 items-center">
```

For the stats row:
```tsx
<div className="flex flex-wrap gap-6 lg:gap-10">
```

For `minHeight`:
```tsx
style={{ minHeight: "100svh" }}  /* or 100dvh — accounts for mobile chrome */
```

For hero padding:
```tsx
style={{ paddingTop: "clamp(80px, 12vw, 120px)", paddingBottom: "clamp(48px, 8vw, 80px)" }}
```

---

## 3. EFP Award Card — Home Page (Critical)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx` — line 239

```jsx
style={{ borderRadius: 24, overflow: "hidden", border: "1px solid #234966",
  display: "grid", gridTemplateColumns: "1fr 1fr" }}
```

**Issues:**
- Side-by-side two-column layout has no mobile stack.
- Right panel `padding: 48` is fixed px — causes content squeeze at <480 px.
- Left photo panel has `minHeight: 420` (fixed px).

**Fix:**
```tsx
// Replace the grid div:
<div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-[#234966]">
  {/* Left photo */}
  <div className="relative min-h-[240px] md:min-h-[420px] overflow-hidden">
    ...
  </div>
  {/* Right content */}
  <div className="bg-[#1D3449] p-6 md:p-12">
    ...
  </div>
</div>
```

Same pattern repeated in `About.tsx` line 72.

---

## 4. Features Bento Grid — Home Page (Critical)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx` — line 296

```jsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
  {/* cards with gridColumn: "span 2" and "span 1" */}
```

**Issues:**
- Fixed 3-column grid with `span 2` cards. On mobile, `span 2` in a 1-column grid becomes meaningless — currently the 3-column grid forces horizontal scroll at any viewport below ~640 px.
- No responsive column reduction.

**Fix:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
  {features.map((f) => (
    <div
      key={f.title}
      className={`card reveal ${f.span === 2 ? "sm:col-span-2 lg:col-span-2" : ""}`}
    >
```

---

## 5. Team / Founders Grid — Home Page and About Page (Critical)

**Home.tsx line 410:**
```jsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
```

**About.tsx line 152:**
```jsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 900, margin: "0 auto" }}>
```

**Issues:**
- 3-column grid with no breakpoint stacking. At 375 px each card is ~120 px wide — photos unreadable, text truncated.
- `height: 280` on photo container (fixed px).

**Fix:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
  {/* Remove the maxWidth inline style or replace with Tailwind max-w-4xl mx-auto */}
  {founders.map((f) => (
    <div key={f.name} className="card reveal overflow-hidden p-0">
      <div className="relative h-48 sm:h-56 lg:h-70 overflow-hidden">
        ...
      </div>
    </div>
  ))}
</div>
```

---

## 6. How It Works — 3-Column Wave Grid (Critical)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx` — line 341

```jsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, position: "relative", zIndex: 2 }}>
  {/* items have paddingTop: item.offsetY (0 or 80) — decorative offset */}
```

**Issues:**
- Fixed 3-column. On mobile the SVG wave spans `width: "100%"` but the content grid does not stack — step circles (160 px diameter) in 3 columns at 320 px = ~107 px each, clipping icons.
- `paddingTop: item.offsetY` (80 px vertical offset for middle item) is purely decorative on desktop — on mobile it wastes space and breaks the vertical rhythm.
- `maxWidth: 900` on the parent `position: relative` container may cause the SVG wave to mismatch the grid on mobile.

**Fix:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 relative z-[2]">
  {steps.map((item, i) => (
    <div
      key={item.step}
      className="reveal text-center"
      style={{ paddingTop: typeof window !== "undefined" && window.innerWidth >= 768 ? item.offsetY : 0 }}
    >
```

Better: use `useIsMobile()` or a CSS class:
```css
@media (max-width: 767px) {
  .step-offset { padding-top: 0 !important; }
}
```

The connecting SVG wave line should be hidden on mobile:
```tsx
<svg className="hidden md:block absolute top-10 left-0 w-full" ...>
```

---

## 7. Stats Row — ForDentists Page (Critical)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/ForDentists.tsx` — line 96

```jsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
  background: "#234966", borderRadius: 20, overflow: "hidden" }}>
```

**Issues:**
- 3-column grid with `gap: 1` (border effect via background). On 320 px, three stat boxes at ~107 px each leave no room for the 48 px Dongle stat value.
- No mobile stacking.

**Fix:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#234966] rounded-2xl overflow-hidden">
```

---

## 8. Contact Page — Two-Column Layout (Critical)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Contact.tsx` — line 78

```jsx
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
```

**Issues:**
- Fixed two-column split with `gap: 60`. At 375 px the form column is ~140 px — completely unusable.
- Inner form name fields also use a two-column grid (line 112):
  ```jsx
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
  ```
  This is acceptable on desktop but should stack on mobile (below ~480 px).

**Fix:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[60px] items-start">
```

Inner name fields:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
```

---

## 9. About Page — Mission Section Two-Column (Critical)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/About.tsx` — line 109

```jsx
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
```

**Issues:**
- `gap: 80` fixed px, two columns with no stack.
- The stats card on the right has `padding: 40` fixed — tight on small screens.

**Fix:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
```

Stats card:
```tsx
<div className="bg-[#1D3449] border border-[#234966] rounded-2xl p-6 lg:p-10">
```

---

## 10. Pricing — Two-Column Plans Grid (High)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Pricing.tsx` — line 111

```jsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 800, margin: "0 auto" }}>
```

**Issues:**
- Fixed 2-column grid, no mobile stack.
- Each card has `padding: 40` — tight on 375 px.

**Fix:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[800px] mx-auto">
  {/* Card padding: */}
  <div className="card reveal p-6 sm:p-10">
```

---

## 11. Waitlist Page — Role Selector and Form Grid (High)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Waitlist.tsx` — lines 67, 86

```jsx
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
```

Role selector buttons are fine at 1fr/1fr even on 320 px (they contain short text), but the form name grid:
```jsx
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
```
...stacks first/last name fields horizontally — on 320 px each input is ~140 px, which is below the minimum comfortable width for typing.

**Fix:**
```tsx
<div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
  {/* or simply keep 1fr on all phones */}
```
Add to `index.css` under `@layer base`: `/* no xs breakpoint in Tailwind v4 — use sm */`
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
```

---

## 12. Waitlist Social Proof Row (Medium)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Waitlist.tsx` — line 116

```jsx
<div style={{ display: "flex", gap: 32, justifyContent: "center" }}>
  {stats.map(s => ...)}
```

Three items with `gap: 32` on 320 px means ~280 px total, possible overflow if stat labels wrap. The parent container has no `flexWrap`.

**Fix:**
```tsx
<div className="flex flex-wrap gap-6 justify-center">
```

---

## 13. PhoneMockup — Scaling on 320 px (High)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/components/PhoneMockup.tsx` — line 28

```jsx
<div style={{ position: "relative", width: 340, maxWidth: "100%", ... }}>
```

`width: 340` with `maxWidth: "100%"` means the phone clips to 100% of its parent container. The parent in `Home.tsx` is the right column of a 2-column grid. On mobile when the grid stacks, the phone container becomes full width — the phone itself sizes to 100% of that. This is actually handled reasonably, but:

1. The phone's internal layout uses absolute pixel values (`height: 52` status bar, `padding: "0 28px"`, image `width: 108`, text `fontSize: 38`). At 320 px container width, these hardcoded values are too large relative to the phone frame — the content inside the screen will overflow vertically.
2. The side buttons (`left: -5`, `right: -5`) overflow the wrapper div, causing potential horizontal scroll if the phone is close to the viewport edge.

**Fix:**
Wrap the phone in a size-capped container on mobile:
```tsx
// Home.tsx — right column:
<div className="flex justify-center items-center w-full">
  <div className="w-full max-w-[300px] sm:max-w-[340px] mx-auto">
    <PhoneMockup />
  </div>
</div>
```

Inside PhoneMockup, scale internal values proportionally using `clamp()` or container query units — or use `em`-relative sizing against the root font size. Minimum fix:
```jsx
// PhoneMockup.tsx — outer wrapper
<div style={{ position: "relative", width: "min(340px, 100%)", ... }}>
```

The side buttons can be clipped with `overflow: visible` on the outer div (already the case via `position: relative`), but a wrapping div with `overflow: hidden` in the parent would cut them off. Ensure the parent `div.phone-float` has enough lateral padding.

---

## 14. Blog — All-Articles Row Layout (High)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Blog.tsx` — line 192

```jsx
<div style={{ display: "flex", alignItems: "center", gap: "24px", padding: "28px 0", ... }}>
  <div style={{ flex: 1, minWidth: 0 }}>...</div>
  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
    <img width="36px" height="36px" />
    ...author meta...
    <svg />
  </div>
```

The author meta block on the right (`flexShrink: 0`) takes ~120 px. At 320 px the text content area (`flex: 1`) gets only ~180 px — the 32px Dongle headline title at `clamp(24px, 2.5vw, 32px)` will still be readable, but the author block causes crowding. On very narrow screens the right block overlaps.

**Fix:**
```tsx
<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-7 border-b border-[#234966]">
  <div className="flex-1 min-w-0">...</div>
  <div className="flex items-center gap-3 flex-shrink-0 sm:ml-auto">
    ...
  </div>
</div>
```

---

## 15. Navbar — Mobile Hamburger (Medium)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/components/Navbar.tsx`

The hamburger exists and functions correctly (menu open/close, body overflow lock, route-change close). However:

1. **Touch target size:** The hamburger button is `width: 38px, height: 38px` — 6 px below the 44×44 px minimum recommended by Apple HIG and WCAG 2.5.5.
2. **Mobile drawer font size:** `fontSize: "48px"` Dongle in the mobile nav is correct for the brand's dramatic style, but at 320 px, "For Dentists" (11 characters) at 48 px may truncate — test needed. The `padding: "16px 0"` touch targets are ≥44 px tall (correct).
3. **CSS class approach:** `hide-mobile` / `show-mobile-flex` classes are defined via an inline `<style>` block inside the JSX, not in `index.css`. This creates a separate style sheet on every render — should be moved to `index.css`.
4. **Breakpoint inconsistency:** The custom CSS uses `max-width: 768px` while Tailwind's `md:` breakpoint is `min-width: 768px`. The 768 px viewport itself shows the mobile menu (custom CSS) but is above Tailwind `md` breakpoint. No issue currently, but mixing systems risks future drift.

**Fix:**
```tsx
// Change button size to meet 44×44px minimum:
<button
  style={{ width: "44px", height: "44px" }}
  className="show-mobile-flex"
  ...
>

// Move hide-mobile / show-mobile-flex to index.css:
/* In index.css @layer components: */
.hide-mobile { display: none !important; }
@media (min-width: 769px) {
  .hide-mobile { display: flex !important; }
  .show-mobile-flex { display: none !important; }
}
```

Or replace entirely with Tailwind:
```tsx
// Desktop nav:
<div className="hidden md:flex items-center gap-0.5">

// Hamburger:
<button className="flex md:hidden items-center justify-center w-11 h-11">
```

---

## 16. `display-lg` and `display-md` Font Sizes on Mobile (Medium)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/index.css` — lines 419–434

```css
.display-xl {
  font-size: clamp(80px, 11vw, 160px);  /* 80px minimum — very large */
}
.display-lg {
  font-size: clamp(60px, 8vw, 110px);  /* 60px minimum at 320px */
}
.display-md {
  font-size: clamp(44px, 5.5vw, 80px); /* 44px minimum */
}
```

Dongle is a condensed typeface, so large sizes compress vertically. At 320 px:
- `display-xl`: 80 px → too large for "Knowledge Hub" style labels
- `display-lg`: 60 px → "Insights on dental health, AI, and care." at 60 px minimum wraps across 4 lines
- `display-md`: 44 px → acceptable

The `body-lg` and `body-md` classes use **fixed px** (18 px, 16 px) — correct for body text, but they override any fluid scaling.

**Recommendation** — tighten the `display-lg` and `display-xl` floor values:
```css
.display-xl {
  font-size: clamp(52px, 11vw, 160px);
}
.display-lg {
  font-size: clamp(44px, 8vw, 110px);
}
```

Additionally, many pages bypass these classes and use inline `fontSize: "clamp(56px, 7vw, 88px)"` — which is consistent and fluid. The 56 px floor is appropriate for Dongle.

---

## 17. Hero Section `100vh` — No Dynamic Viewport (Medium)

**File:** `Home.tsx` line 143 — `minHeight: "100vh"`  
**All pages** — `minHeight: "100vh"` on the root wrapper.

On iOS Safari, `100vh` is calculated against the full viewport height including the collapsed address bar. When the address bar expands on scroll, content below the fold gets cut. The recommended fix is `100svh` (small viewport height) or `100dvh` (dynamic).

**Fix — Home hero:**
```tsx
style={{ minHeight: "100svh" }}
```

**Fix — Page root wrappers (all pages):**
```tsx
style={{ background: "#0A171E", minHeight: "100svh" }}
```

Or add once to `body` in index.css:
```css
body { min-height: 100svh; }
```

---

## 18. Form Inputs — Touch Target Check (Medium)

**File:** `index.css` — `.p-input` class

```css
.p-input {
  width: 100%;
  padding: 14px 18px;
  font-size: 15px;
}
```

At `padding: 14px 18px` with `font-size: 15px`, the computed height is approximately `14 + 15*1.2 + 14 = 46 px` — just above the 44 px minimum. This is acceptable. The `font-size: 15px` avoids iOS Safari's automatic zoom on inputs below 16 px.

One concern: In the Blog newsletter section (`Blog.tsx` line 244), the email input uses inline styles instead of `.p-input`:
```jsx
style={{
  flex: "1", minWidth: "220px",
  padding: "12px 16px", fontSize: "15px"
}}
```
Height here: `12 + 15*1.2 + 12 = 42 px` — 2 px below the 44 px minimum. Also, `minWidth: "220px"` can cause the input to overflow on 320 px screens when wrapped alongside the "Subscribe" button.

**Fix — Blog newsletter:**
```tsx
<input
  type="email"
  placeholder="Your email address"
  className="p-input flex-1"  /* uses the global class with correct 14px padding */
/>
```

And remove `minWidth: "220px"` — let `flex: 1` handle width.

---

## 19. ForDentists — Feature Card Bullet Grid (Medium)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/ForDentists.tsx` — line 134

```jsx
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
  {f.bullets.map(b => <div>...</div>)}
```

Four bullet points in a 2-column grid inside a card that is `max-width: 800px` and centered. At 375 px the card takes full width and each column is ~170 px. This is usable but tight for 13 px text with checkmark icons.

**Fix:**
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
```

---

## 20. Horizontal Scroll / Overflow Analysis (Critical)

**Root cause:** `body { overflow-x: hidden }` is set in `index.css` line 96 — this masks horizontal overflow rather than fixing it. Remove this band-aid fix once the grid issues above are resolved. Leaving it in place hides real layout bugs.

**Sections that overflow WITHOUT the body clip:**

| Section | Cause |
|---------|-------|
| Home hero | 2-col grid, phone mockup side buttons |
| Home EFP Award | 2-col grid at all widths |
| Home Features bento | 3-col grid with span-2 cards |
| Home How It Works | 3-col grid + SVG wave `width: 100%` |
| Home Team | 3-col grid |
| About EFP Award | 2-col grid |
| About Mission | 2-col grid with gap:80 |
| About Team | 3-col grid |
| Contact | 2-col grid |
| ForDentists Stats | 3-col grid |
| Pricing Plans | 2-col grid |
| CTA orbs | `.cta-orb--1` is 700×700 px, `top: -20%, left: -10%` — overflows but is `position:absolute` inside `overflow:hidden` parent |
| HeroBackground ring | `.hero-ring-1` is `600×600px` — `position:absolute` inside `overflow:hidden` — contained |

**Fix for `body` overflow:**
Once all grids are responsive, remove or change:
```css
/* index.css */
body {
  /* Remove: overflow-x: hidden; */
}
```

Instead clip only sections that intentionally bleed:
```css
.animated-bg-wrapper,
.cta-bg-canvas {
  overflow: hidden; /* already set */
}
```

---

## 21. Image Overflow (Low)

All images use `width: "100%"` inside fixed-height containers (`height: "100%"`, `objectFit: "cover"`). This is correct and images will not overflow. Avatar images use fixed `width: 32px / 36px / 44px / 48px` — these are decorative fixed sizes and do not cause layout issues.

The CDN images at CloudFront do not use `srcset` or `sizes` attributes — this is a performance concern (loading desktop images on mobile) but not a layout issue.

---

## 22. Tailwind Breakpoints vs. CSS Media Queries

**Current state:**
- All layout decisions are made via inline `style={}` props — zero Tailwind responsive prefixes used in pages.
- `index.css` has two responsive media queries:
  1. `@media (max-width: 768px)` for `.section` and `.section-sm` padding (correct)
  2. `@media (max-width: 768px)` for `#cursor-dot, #cursor-ring` hide (correct)
- Custom CSS classes `hide-mobile` / `show-mobile-flex` in Navbar's inline `<style>` tag

**Problem:** The entire responsive layer is missing. The project uses Tailwind v4 (via `@tailwindcss/vite`) but gets none of its responsive grid utilities.

**Recommended migration strategy:**

1. Replace all `display: "grid", gridTemplateColumns: "..."` inline styles with Tailwind grid classes.
2. Replace `padding: XXX` inline styles on sections with responsive Tailwind spacing.
3. Keep inline styles only for brand colors and non-responsive decorative values.

**Example migration — Home Features grid:**
```tsx
// Before:
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>

// After:
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
```

---

## 23. Custom Cursor — Mobile Correctness (Low)

**File:** `index.css` — lines 802–830

The custom cursor (`#cursor-dot`, `#cursor-ring`) is correctly hidden via:
```css
@media (max-width: 768px) {
  #cursor-dot, #cursor-ring { display: none; }
}
```

This is correct. No touch device will see the cursor. The `CustomCursor.tsx` component should also gate its event listeners:

```tsx
// CustomCursor.tsx — check if device has pointer support:
useEffect(() => {
  if (window.matchMedia("(pointer: coarse)").matches) return; // no cursor on touch
  // ... add listeners
}, []);
```

---

## 24. Section Padding — Fixed vs Responsive

**`index.css` lines 397–408:**
```css
.section {
  padding-top: 120px;
  padding-bottom: 120px;
}
@media (max-width: 768px) {
  .section { padding-top: 80px; padding-bottom: 80px; }
}
```

This responsive padding reduction is correct and covers pages that use `.section` class. However, many pages bypass `.section` and inline their own padding:

- `Home.tsx`: `padding: "120px 0"` (no mobile reduction)
- `ForDentists.tsx`: `padding: "64px 0"`, `"120px 0"`, `"120px 0"` (no mobile reduction)
- `About.tsx`: `padding: "120px 0"`, `"80px 0"` (no mobile reduction)
- `Contact.tsx`: `padding: "80px 0"` (no mobile reduction)
- `Pricing.tsx`: `padding: "80px 0"`, `"120px 0"` (no mobile reduction)

At 120 px top + 120 px bottom on a 667 px-tall iPhone screen, the section padding alone consumes 36% of the viewport height before any content.

**Fix — apply the `.section` class or use `clamp()`:**
```tsx
// Replace all inline section padding:
style={{ padding: "clamp(48px, 8vw, 120px) 0" }}
// or className="section"
```

---

## 25. `display-lg` Usage in BlogPost (Medium)

**File:** `BlogPost.tsx` (not fully reviewed due to size — 77 KB)

The blog post detail page likely uses `display-lg` for article titles. At `clamp(60px, 8vw, 110px)`, a long Romanian article title at 60 px on a 320 px screen may wrap to 5–6 lines, pushing the author meta below the fold. Recommend reducing the blog post `h1` to `display-md`.

---

## 26. Container Max-Width on Mobile

**`index.css` lines 383–393:**
```css
.container {
  width: 100%;
  max-width: 1200px;
  padding-left: 1.5rem;   /* 24px — correct for mobile */
  padding-right: 1.5rem;
}
@media (min-width: 1024px) {
  .container { padding-left: 2.5rem; padding-right: 2.5rem; }
}
```

This is correct. The container behaves well at all widths: 24 px side padding on mobile, 40 px on desktop. No issues.

---

## 27. Footer Grid (Low)

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/components/Footer.tsx` — lines 33–38

```jsx
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "40px",
}}>
```

`auto-fit, minmax(160px, 1fr)` — this is the one grid in the codebase that handles mobile correctly. At 320 px with 24 px padding each side, the available width is 272 px. With `minmax(160px, 1fr)`, each column needs at least 160 px, so only 1 column fits (272 px). Two columns would need 320 px + gap — they will not fit. The auto-fit wraps to a single column automatically.

However, `gap: "40px"` between rows is large on mobile. The footer sections will stack with 40 px gaps, which is acceptable but could be tightened.

**Fix (optional):**
```tsx
<div className="grid gap-8 md:gap-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
```

---

## Priority Fix Summary

| Priority | Issue | File(s) | Fix |
|----------|-------|---------|-----|
| P0 | Home hero 2-col grid | Home.tsx:152 | `grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]` |
| P0 | Home EFP Award 2-col | Home.tsx:239 | `grid grid-cols-1 md:grid-cols-2` |
| P0 | Home Features 3-col bento | Home.tsx:296 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| P0 | Home Team 3-col | Home.tsx:410 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| P0 | Home How It Works 3-col | Home.tsx:341 | `grid grid-cols-1 md:grid-cols-3` |
| P0 | About EFP Award 2-col | About.tsx:72 | `grid grid-cols-1 md:grid-cols-2` |
| P0 | About Mission 2-col | About.tsx:109 | `grid grid-cols-1 lg:grid-cols-2` |
| P0 | About Team 3-col | About.tsx:152 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| P0 | Contact 2-col | Contact.tsx:78 | `grid grid-cols-1 lg:grid-cols-2` |
| P0 | ForDentists Stats 3-col | ForDentists.tsx:96 | `grid grid-cols-1 sm:grid-cols-3` |
| P0 | Pricing Plans 2-col | Pricing.tsx:111 | `grid grid-cols-1 sm:grid-cols-2` |
| P1 | `body overflow-x: hidden` masking bugs | index.css:96 | Remove after fixing grids |
| P1 | Section padding not responsive | All pages | `padding: clamp(48px, 8vw, 120px) 0` |
| P1 | `100vh` no dynamic viewport | All pages | Replace with `100svh` |
| P1 | Hamburger touch target 38px | Navbar.tsx:101 | Increase to 44×44px |
| P1 | `useIsMobile` hook unused in pages | All pages | Use for JS-driven layouts |
| P2 | Blog articles row flex no wrap | Blog.tsx:192 | `flex-col sm:flex-row` |
| P2 | Waitlist name inputs 2-col | Waitlist.tsx:86 | `grid grid-cols-1 sm:grid-cols-2` |
| P2 | Blog newsletter input `minWidth` | Blog.tsx:244 | Remove, use `p-input flex-1` |
| P2 | ForDentists bullet grid 2-col | ForDentists.tsx:134 | `grid grid-cols-1 sm:grid-cols-2` |
| P3 | `display-lg` 60px floor | index.css:419 | Reduce to `clamp(44px, 8vw, 110px)` |
| P3 | Custom cursor no pointer check | CustomCursor.tsx | Add `pointer: coarse` guard |
| P3 | Footer gap 40px on mobile | Footer.tsx:36 | `gap-8 md:gap-10` |

---

## Score: 4.5 / 10

**Breakdown:**

| Category | Score | Notes |
|----------|-------|-------|
| Grid layouts — mobile stacking | 1/10 | Every multi-column grid breaks on mobile |
| Font sizing | 7/10 | `clamp()` used consistently, Dongle works well |
| Hero sections (320–768px) | 3/10 | Hero overflows, 100vh issue, padding too large |
| Hamburger / mobile nav | 7/10 | Exists and functional, minor touch target issue |
| Form inputs / touch targets | 7/10 | `p-input` is correct, one exception in Blog |
| `useMobile` hook usage | 1/10 | Defined but unused in pages |
| Horizontal scroll | 2/10 | Masked by `overflow-x: hidden`, not fixed |
| Tailwind breakpoints usage | 1/10 | Zero `sm:/md:/lg:` prefixes in page JSX |
| Container / spacing | 7/10 | Container correct; section padding needs `clamp()` |
| PhoneMockup scaling | 6/10 | `maxWidth: 100%` helps; internal sizing not fluid |

The project has strong brand design and a clean CSS component system. The fundamental problem is that every layout decision uses an inline `style={}` object with no responsive variant — a systematic migration of all grid and flexbox containers to Tailwind responsive classes would bring this from 4.5 to 8.5+ in a single sprint.
