# Mobile Responsiveness Audit — Perioskoup Landing Page
**Auditor:** Mobile-Responsive Subagent (Claude Sonnet 4.6)
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Scope:** Full codebase audit — every page, every component
**Previous fix log:** `audit-results/fix-log-mobile.md`

---

## Overall Score: 7.5 / 10

**Summary:** The codebase has benefited from a prior mobile-responsive pass (documented in fix-log-mobile.md) that resolved the most critical layout-breaking issues: fixed-column grids have been replaced with responsive Tailwind classes, `100vh` has been replaced with `100svh` on most page roots, and the hamburger nav exists with correct 44px touch targets. However, a meaningful set of persistent issues remain — primarily inline `style={{}}` section paddings that do not scale, a `gridTemplateColumns` in two locations that can squeeze on small viewports, `display-lg` text at `44px` minimum still being oversized on 320px screens for multi-line headings, and the `useIsMobile()` hook being effectively unused in the page-level code. The phone mockup side-button overflow risk also persists on very narrow viewports.

---

## 1. Navigation — Hamburger Menu

### Status: PASS (with minor observation)

**Navbar.tsx — Implementation review:**

The mobile hamburger button is present and correctly sized at `width: 44px, height: 44px` (exactly at the WCAG/Apple 44pt minimum). Keyboard handling is implemented (Escape key closes drawer, `aria-expanded`, `aria-controls`). Body scroll lock is applied when the drawer is open (`document.body.style.overflow = 'hidden'`). Route change closes the drawer automatically.

**Issues found:**

**Issue NAV-01 (Low):** The CSS media query breakpoint for hiding/showing nav elements uses a raw `<style>` tag with `@media (max-width: 768px)` / `@media (min-width: 769px)` — a 1px gap between these two rules (`769px` vs `768px`). This is correct but fragile. The `hide-mobile`/`show-mobile-flex` utility classes bypass Tailwind entirely.

Fix — replace the inline `<style>` block with Tailwind classes:
```tsx
// Desktop nav div: currently className="hide-mobile"
// Replace with:
className="hidden md:flex items-center gap-0.5"

// Mobile toggle button: currently className="show-mobile-flex"
// Replace with:
className="md:hidden flex items-center justify-center"
// (already has width/height 44px via inline style)

// Desktop CTA button: currently className="btn-primary hide-mobile"
// Replace with:
className="btn-primary hidden md:inline-flex"
```

**Issue NAV-02 (Low):** The mobile drawer uses `display: none` set via inline style `style={{ display: 'none' }}` — but the actual show/hide is controlled by conditional rendering `{menuOpen && (...)}`. This is correct React pattern. No issue, noted for clarity.

**Issue NAV-03 (Medium):** The mobile drawer nav links use `fontSize: '48px'` (Dongle). At 320px viewport with container padding of 1.5rem (24px each side), the available width is 272px. The longest link "For Dentists" at 48px Dongle renders at approximately 220px width — it fits, but barely. At 280px viewport (some Android devices), it may truncate.

Fix:
```tsx
// Replace fixed fontSize: '48px' on mobile-drawer-link style with:
fontSize: 'clamp(36px, 10vw, 48px)',
```

---

## 2. Hero Section — Home Page

### Status: PASS with remaining P2 issues

The hero section uses `minHeight: "100svh"` (correct for mobile browsers), `paddingTop: "clamp(80px, 12vw, 120px)"` (fluid), and the two-column grid is `grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]` (stacks correctly on mobile).

**Issue HERO-01 (Medium):** The hero `<h1>` uses a hardcoded inline `fontSize: "clamp(64px, 7vw, 96px)"`. At 320px viewport: `7vw = 22.4px`, so `clamp(64px, 22.4px, 96px)` resolves to the minimum of **64px**. A 64px Dongle heading for "Between visits, we take over." spans approximately 2 lines at 320px and 3 lines at 360px due to the tight line-height of 0.95. This is readable but visually heavy — the line-height of 0.95 means lines overlap slightly at this size on mobile.

Fix — lower the floor to 52px and increase line-height on mobile:
```tsx
// Current:
style={{ fontSize: "clamp(64px, 7vw, 96px)", lineHeight: 0.95 }}

// Recommended:
style={{ fontSize: "clamp(52px, 7vw, 96px)", lineHeight: 1.0 }}
```

Or using the `display-lg` CSS class (already uses `clamp(44px, 8vw, 110px)`):
```tsx
<h1 className="display-lg reveal visible" style={{ marginBottom: 32, transitionDelay: "0.1s" }}>
```
This would replace the inline fontSize with the design system class and be consistent.

**Issue HERO-02 (Low):** The EFP badge has `whiteSpace: "nowrap"` on three child elements. The outer wrapper has no `flexWrap`. At 320px, the badge is approximately 280px wide, which fits within the 272px content area by a very slim margin. This may clip on the narrowest viewports.

Fix:
```tsx
// Remove whiteSpace: "nowrap" from the innermost spans, allow the badge to wrap:
style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 6px", background: "rgba(192,229,122,0.08)", border: "1px solid rgba(192,229,122,0.3)", borderRadius: 100, textDecoration: "none", flexWrap: "wrap" }}
```

**Issue HERO-03 (Medium):** The stats row uses `className="reveal flex flex-wrap gap-6 lg:gap-10"` — `flex-wrap` is present, so stats wrap on mobile. However, on 320px, each stat block occupies its natural width. The stat values use `fontSize: 44` (Dongle) with `lineHeight: 1`. Three stats side-by-side at 44px font will wrap, but the resulting wrapped layout creates an uneven grid. Consider making the stats a proper responsive grid.

Fix:
```tsx
// Replace the flex-wrap row with a proper grid:
<div className="reveal grid grid-cols-3 gap-4 lg:gap-10" style={{ transitionDelay: "0.4s" }}>
  {/* stats */}
</div>
// On very small screens, consider grid-cols-1 sm:grid-cols-3 if text becomes too small
```

---

## 3. PhoneMockup Component

### Status: PARTIAL PASS — P2 risk remains

**PhoneMockup.tsx — line 29:**
```tsx
width: 340,
maxWidth: "100%",
```
The `maxWidth: "100%"` ensures the phone never exceeds its container. However the component's outer container in `Home.tsx` was updated in the previous fix to:
```tsx
<div className="flex justify-center items-center w-full">
  <div className="w-full max-w-[300px] sm:max-w-[340px] mx-auto">
    <PhoneMockup />
  </div>
</div>
```
This caps the phone container at 300px on mobile. However the PhoneMockup itself still internally declares `width: 340` — relying entirely on the outer `maxWidth: "100%"` constraint.

**Issue PHONE-01 (Medium):** The side-button decorators use `left: -5` / `right: -5` — these protrude 5px outside the component's bounds. When the phone is at 300px width in its container with the outer container providing only `max-w-[300px]`, the side buttons extend to -5px relative to the phone frame itself. Since the outer container has `w-full max-w-[300px]`, the 5px overflow of the buttons is clipped by the container if it has `overflow: hidden`, but no `overflow: hidden` exists on the container.

Fix:
```tsx
// In Home.tsx, add overflow-hidden to the constraining container:
<div className="w-full max-w-[300px] sm:max-w-[340px] mx-auto overflow-visible px-2">
  <PhoneMockup />
</div>
// Note: overflow-visible + px-2 gives 8px breathing room for the 5px side buttons
// Or alternatively, set overflow: hidden on the component root in PhoneMockup.tsx
// and restructure side buttons to use box-shadow instead of absolute position overflow
```

**Issue PHONE-02 (Low):** The phone mockup is hidden on mobile (it's in the right column of the hero grid). The left column takes full width on `grid-cols-1`. On mobile the phone is pushed below the hero text. This is correct mobile behaviour — no layout issue, but consider whether the phone appearing below the fold on 320px is intentional (the hero CTA buttons are above it, which is good conversion-wise).

---

## 4. Typography — Dongle Display Fonts

### Status: PARTIAL PASS

The `.display-xl` and `.display-lg` floor values were reduced in the previous fix:
- `.display-xl`: min `52px` (was 80px) — GOOD
- `.display-lg`: min `44px` (was 60px) — IMPROVED, but still has issues (see below)
- `.display-md`: min `44px` — ISSUE (see TYPO-01)
- `.display-sm`: min `32px` — ACCEPTABLE

**Issue TYPO-01 (Medium):** `.display-md` has `font-size: clamp(44px, 5.5vw, 80px)`. At 320px viewport: `5.5vw = 17.6px` → clamp resolves to minimum **44px**. The `.display-md` class is used for `<h1>` on the Features page ("AI dental companion features — everything between your visits.") and for `<h1>` on BlogPost pages. At 44px Dongle with line-height 1.0, this headline wraps to approximately 3-4 lines on 320px. The line-height of 1.0 means lines are very tight. Not illegible, but cramped.

Fix in `index.css`:
```css
.display-md {
  font-size: clamp(36px, 5.5vw, 80px);  /* was clamp(44px, ...) */
  line-height: 1.05;  /* loosen slightly for mobile */
}
```

**Issue TYPO-02 (Medium):** The Features page `<h1>` uses `className="display-lg"` with a `<br />` line break:
```tsx
<h1 className="display-lg reveal" ...>
  AI dental companion features -<br />
  <span className="text-gradient">everything between your visits.</span>
</h1>
```
At 320px with `display-lg` resolving to 44px, the first line "AI dental companion features -" is approximately 340px wide at 44px Dongle — wider than the 272px available content area. It will wrap mid-sentence before the `<br />` even fires, creating a 3-line heading.

Fix:
```tsx
// Option A: remove the <br /> and let natural wrap handle it
// Option B: apply responsive line-height class
<h1 className="display-lg reveal" style={{ lineHeight: 1.05 }}>
  AI dental companion features —
  <span className="text-gradient block">everything between your visits.</span>
</h1>
```

**Issue TYPO-03 (Low):** Multiple pages use inline `fontSize` values for section headings rather than the design system classes. Examples:
- Home.tsx line 120: `fontSize: "clamp(64px, 7vw, 96px)"` — should use `.display-lg`
- Home.tsx line 254: `fontSize: "clamp(48px, 5vw, 72px)"` — should use `.display-md`
- Home.tsx line 314: `fontSize: "clamp(52px, 6vw, 80px)"` — should use `.display-md`
- ForDentists.tsx line 97: `fontSize: "clamp(56px, 7vw, 88px)"` — should use `.display-lg`

These use `clamp()` so they are technically fluid, but they bypass the design system CSS classes, creating inconsistency. No immediate breakage, but they drift from the design tokens.

Fix — replace with Tailwind CSS class equivalents:
```tsx
// Instead of: style={{ fontFamily: "Dongle...", fontSize: "clamp(56px, 7vw, 88px)" }}
// Use: className="display-lg"
```

**Issue TYPO-04 (Low):** `.body-lg { font-size: 18px }` and `.body-md { font-size: 16px }` use fixed pixel values. On very small screens (320px), 18px body text is fine, but these are not fluid. Consider making them responsive.

Fix in `index.css`:
```css
.body-lg { font-size: clamp(16px, 4vw, 18px); line-height: 1.65; color: #8C9C8C; }
.body-md { font-size: clamp(14px, 3.5vw, 16px); line-height: 1.6; color: #8C9C8C; }
```

---

## 5. Inline Section Paddings — Non-Responsive

### Status: FAIL — Widespread P2 issue

The `.section` and `.section-sm` CSS classes now use `clamp()` (fixed in previous pass). However, **nearly every individual page section uses hardcoded inline `padding` values** that override or exist independently of these classes.

Examples found across codebase:

| File | Line | Value |
|------|------|-------|
| Home.tsx | 204 | `padding: "80px 0"` |
| Home.tsx | 245 | `padding: "120px 0"` |
| Home.tsx | 290 | `padding: "100px 0"` |
| Home.tsx | 310 | `padding: "120px 0"` |
| Home.tsx | 383 | `padding: "80px 0"` |
| About.tsx | 146 | `padding: "80px 0"` |
| About.tsx | 184 | `padding: "120px 0"` |
| About.tsx | 222 | `padding: "80px 0"` |
| About.tsx | 242 | `padding: "80px 0"` |
| About.tsx | 262 | `padding: "120px 0"` |
| About.tsx | 302 | `padding: "80px 0"` |
| ForDentists.tsx | 129 | `padding: "80px 0"` |
| ForDentists.tsx | 146 | `padding: "64px 0"` |
| ForDentists.tsx | 168 | `padding: "80px 0"` |
| ForDentists.tsx | 189 | `padding: "120px 0"` |
| ForDentists.tsx | 224 | `padding: "100px 0"` |
| ForDentists.tsx | 253 | `padding: "100px 0"` |
| ForDentists.tsx | 272 | `padding: "120px 0"` |
| BlogPost.tsx | 846 | `paddingTop: "120px"` |
| BlogPost.tsx | 888 | `paddingTop: "64px", paddingBottom: "120px"` |

At 320px mobile, `120px 0` top+bottom padding is excessive — it accounts for 240px of vertical space consumed by padding alone. On a 568px tall mobile screen (iPhone SE), this is 42% of the viewport used purely for whitespace.

Fix — the recommended pattern is to add a `section` or `section-sm` className and remove the inline padding, OR replace inline paddings with clamp values:

```tsx
// Option A: use existing design system classes
<section className="section" style={{ background: "#050C10", position: "relative" }}>

// Option B: replace inline padding with fluid value
<section style={{ background: "#050C10", padding: "clamp(64px, 8vw, 120px) 0" }}>

// Option C: Tailwind responsive padding
<section className="py-16 md:py-24 lg:py-[120px]" style={{ background: "#050C10" }}>
```

The safest approach preserving existing desktop layout is Option B applied globally:
```
"80px 0"  → "clamp(48px, 6vw, 80px) 0"
"120px 0" → "clamp(64px, 8vw, 120px) 0"
"100px 0" → "clamp(56px, 7vw, 100px) 0"
"64px 0"  → "clamp(40px, 5vw, 64px) 0"
```

---

## 6. Grid Layouts

### Status: PASS for most; two remaining P2 issues

The previous fix pass successfully migrated the major multi-column grids to responsive Tailwind. Current state:

| Grid | Tailwind Classes | Mobile Behaviour |
|------|-----------------|-----------------|
| Home hero layout | `grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]` | Stacks on mobile — PASS |
| Home EFP Award card | `grid grid-cols-1 md:grid-cols-2` | Stacks on mobile — PASS |
| Home features bento | `grid grid-cols-1 md:grid-cols-3` | Stacks on mobile — PASS |
| Home How It Works | `grid grid-cols-1 md:grid-cols-3` | Stacks on mobile — PASS |
| About team | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | Stacks on mobile — PASS |
| Contact layout | `grid grid-cols-1 lg:grid-cols-2` | Stacks on mobile — PASS |
| ForDentists stats | `grid grid-cols-1 sm:grid-cols-3` | Stacks on mobile — PASS |
| Pricing plans | `grid grid-cols-1 sm:grid-cols-2` | Stacks on mobile — PASS |
| Waitlist name fields | `grid grid-cols-1 sm:grid-cols-2` | Stacks on mobile — PASS |

**Issue GRID-01 (Medium):** Features page `gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))"` is in an inline style. At 320px viewport with 1.5rem padding on each side (48px total), the available width is 272px. `minmax(320px, 1fr)` means the minimum column width is 320px — wider than the entire content area. CSS Grid will not overflow here (auto-fill creates a single column when the container is narrower than the min), but the intent is ambiguous and could produce unexpected results if the container's padding changes.

Fix:
```tsx
// Replace in Features.tsx line 117:
style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}
// With Tailwind:
className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
```

**Issue GRID-02 (Medium):** Blog page featured posts grid: `gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))"`. Same pattern as above — `minmax(340px, 1fr)` at 320px viewport produces a single column (correct behaviour), but this is accidental rather than intentional. At exactly 680px viewport, two 340px columns fit; at 679px they collapse to one. This causes a jarring reflow at the 680px breakpoint rather than at a standard Tailwind breakpoint.

Fix:
```tsx
// Replace in Blog.tsx line 209-212:
style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}
// With:
className="grid grid-cols-1 md:grid-cols-2 gap-6"
```

**Issue GRID-03 (Medium — Waitlist):** The role selector in Waitlist.tsx uses:
```tsx
style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
```
This is a two-column grid with NO responsive breakpoint. At 320px, each button column is 128px wide (272px total - 12px gap ÷ 2). The button content "Dentist / Clinic" with subtitle text at `fontSize: 13` fits in 128px but is extremely tight. The button text wraps awkwardly.

Fix:
```tsx
// Replace inline style grid with Tailwind:
className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3"
style={{ marginBottom: 32, transitionDelay: "0.24s" }}
```

---

## 7. Form Inputs and Touch Targets

### Status: PASS

**`.p-input` class analysis:**
```css
.p-input {
  width: 100%;
  padding: 14px 18px;
  /* ... */
}
```
- `width: 100%` — full width on mobile. PASS.
- `padding: 14px 18px` — vertical padding of 14px × 2 = 28px. Combined with font-size 15px at line-height 1.6 = 24px, total height ≈ 52px. Exceeds the 44px minimum touch target. PASS.

**Submit buttons:**
- Waitlist submit: `className="btn-primary"` with `style={{ justifyContent: "center", marginTop: 8 }}` — `.btn-primary` has `padding: 14px 28px`, min-height ≈ 48px. PASS.
- Contact submit: Same pattern. PASS.

**`.btn-primary` class:**
```css
.btn-primary {
  padding: 14px 28px;
  /* height ≈ 44px+ depending on font */
}
```
At 15px Gabarito with line-height default: approx 22px + 28px padding = 50px. PASS.

**Issue FORM-01 (Low):** Blog newsletter subscription: The `<button>` has no explicit height/padding override and uses `className="btn-primary"` — height is fine. However, the `<input>` and `<button>` in the newsletter section are in a flex row with `flexWrap: "wrap"`. On 320px, if both don't fit on one line, the button wraps below — which is fine. No issue.

**Issue FORM-02 (Low):** The `<select>` element in Contact form uses `.p-select` class:
```css
.p-select {
  padding: 14px 18px;
}
```
Native `<select>` elements on iOS are typically tall enough, but the visual appearance (custom styled) may not show the dropdown arrow correctly. Not a responsive issue per se, but worth noting the `appearance: none` removes the native dropdown indicator. The arrow is CSS-background-image-based — this is a known pattern but may confuse mobile users who are not familiar with custom selects.

---

## 8. Images — Responsive Behaviour

### Status: PASS with minor observation

All significant images use `style={{ width: "100%", height: "100%", objectFit: "cover" }}` — they are fully fluid.

Avatar/headshot images use fixed `width={44}` `height={44}` HTML attributes with matching inline styles — these are decorative-sized avatars that should not be fluid. PASS.

**Issue IMG-01 (Low):** The hero LCP image in Home.tsx:
```tsx
<img
  src={ASSETS.heroBg}
  width={1280}
  height={714}
  className="hero-lcp-img ken-burns"
  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
/>
```
There is no `srcset` or `sizes` attribute. On mobile, the browser downloads the full 1280px image. This is a performance concern but not a layout/responsive concern.

**Issue IMG-02 (Low):** The award photo in Home.tsx:
```tsx
<div style={{ position: "relative", minHeight: 420, overflow: "hidden" }}>
  <img src={ASSETS.award} width={800} height={446} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
```
The `minHeight: 420` is still an inline hardcoded value (not updated in the previous fix, which only fixed the `About.tsx` version). At 320px mobile, a 420px minimum height photo in a stacked grid pushes content far below the fold.

Fix:
```tsx
// In Home.tsx, replace the EFP Award photo container:
<div style={{ position: "relative", minHeight: 420, overflow: "hidden" }}>
// With:
<div className="relative min-h-[240px] md:min-h-[420px] overflow-hidden">
```

**Issue IMG-03 (Low):** The EFP Award right panel in Home.tsx also has `padding: 48` (inline, fixed):
```tsx
<div style={{ background: "#1D3449", padding: 48 }}>
```
The About.tsx version was fixed to `p-6 md:p-12` in the previous pass, but the Home.tsx version was left with `padding: 48`. At 320px, 48px padding on each side consumes 96px of the 272px content area, leaving 176px for text — workable but tight.

Fix:
```tsx
// In Home.tsx EFP Award right panel, replace:
style={{ background: "#1D3449", padding: 48 }}
// With:
className="bg-[#1D3449] p-6 md:p-12 flex flex-col gap-4"
```

---

## 9. Horizontal Scroll / Overflow

### Status: PASS — with one residual concern

The `overflow-x: hidden` was correctly removed from `body` (replaced with a comment explaining the fix). All major grid overflow sources were fixed. The container class has `padding-left: 1.5rem; padding-right: 1.5rem` on mobile — correct.

**Issue OVERFLOW-01 (Low):** The `.animated-bg-img` class:
```css
.animated-bg-img {
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
}
```
The `width: 120%` with `inset: -10%` creates an element that is 20% wider than its parent on each side. The parent `.animated-bg-wrapper` has `overflow: hidden`, which clips this correctly. PASS — no overflow.

**Issue OVERFLOW-02 (Low):** The ticker track:
```css
.ticker-track {
  animation: ticker 36s linear infinite;
  display: flex;
  width: max-content;
}
```
The ticker wrapper has `overflow: hidden`. Width is `max-content`. This is correct — the ticker intentionally overflows its container but is clipped. PASS.

**Issue OVERFLOW-03 (Medium):** The CTA orbs in `index.css`:
```css
.cta-orb--1 { width: 700px; height: 700px; }
.cta-orb--2 { width: 600px; height: 600px; }
```
These orbs are absolutely positioned with blur filters and exist inside `.cta-bg-canvas` which has `overflow: hidden`. Without the `overflow-x: hidden` on body, if `.cta-bg-canvas` ever loses its `overflow: hidden` (e.g. a style mutation bug), these 700px elements would cause massive horizontal overflow on mobile. The architectural dependency on `.cta-bg-canvas { overflow: hidden }` is load-bearing and should be considered fragile. No fix required but document as a risk.

---

## 10. `useMobile.tsx` Hook — Usage Consistency

### Status: CONCERN — Hook is effectively unused in pages

**Finding:**
```
client/src/hooks/useMobile.tsx: defines useIsMobile()
client/src/components/ui/sidebar.tsx: imports and uses useIsMobile()
```

The `useIsMobile()` hook is only used inside `sidebar.tsx` — a shadcn/ui component that is not actually used anywhere in the Perioskoup pages. It is **not imported or used in any page** (`Home.tsx`, `Features.tsx`, `ForDentists.tsx`, `About.tsx`, `Pricing.tsx`, `Waitlist.tsx`, `Contact.tsx`, `Blog.tsx`, `BlogPost.tsx`).

The Navbar uses raw CSS classes (`hide-mobile`, `show-mobile-flex`) with an inline `<style>` block rather than consuming `useIsMobile()`. The mobile drawer is controlled by `useState` and CSS keyframe animations, not the hook.

**This is acceptable** — the previous fix log correctly notes that "Tailwind breakpoints are now sufficient — no JS-driven layout switching needed." The hook's 768px breakpoint matches the Navbar's CSS media query breakpoint, so there is no inconsistency in the breakpoint values.

**Recommendation:** The `useIsMobile()` hook should either be:
1. Used in the Navbar to replace the inline `<style>` block approach (more idiomatic React), OR
2. Removed from the codebase if no page-level JS layout switching is needed

Since the Navbar works correctly with the current approach, this is P3/cosmetic.

---

## 11. CSS Media Queries vs. Tailwind Breakpoints

### Status: MIXED — three raw CSS media queries exist alongside Tailwind

**Raw media queries found in `index.css`:**
1. `@media (max-width: 768px) { .step-offset { padding-top: 0 !important; } }` — correctly added for How It Works offset
2. `@media (max-width: 768px) { #cursor-dot, #cursor-ring { display: none; } }` — hides custom cursor on mobile
3. `@media (min-width: 1024px) { .container { padding-left: 2.5rem; padding-right: 2.5rem; } }` — container padding breakpoint

**Raw media queries in `Navbar.tsx` inline `<style>` block:**
4. `@media (max-width: 768px) { .hide-mobile { display: none !important; } }` — hides desktop nav on mobile
5. `@media (min-width: 769px) { .show-mobile-flex { display: none !important; } }` — hides hamburger on desktop

**Assessment:** Items 1, 2, 3 in `index.css` are acceptable since they modify global utility classes and CSS component styles where Tailwind purging could be unreliable. Items 4 and 5 in the Navbar's inline style block are better replaced with Tailwind (see NAV-01).

**Issue MEDIA-01 (Low):** The Navbar breakpoint uses `max-width: 768px` which corresponds to `< md` in Tailwind (768px is the Tailwind `md` breakpoint — `@media (min-width: 768px)`). Using `max-width: 768px` means the breakpoint fires at `≤768px`, which includes the `md` breakpoint itself. This means at exactly 768px, both the mobile and desktop nav CSS rules could interact. The `show-mobile-flex` has `display: none` at `min-width: 769px`, so at exactly 768px the hamburger is visible and the desktop nav is hidden. The Tailwind `md:hidden`/`md:flex` pattern fires at `≥768px` for desktop, meaning at 768px it shows desktop nav. There is a 1px discrepancy in how these breakpoints are handled between the CSS approach and what pure Tailwind would produce.

---

## 12. Viewport Height (`100vh` / `100svh`)

### Status: MOSTLY PASS — one remaining instance

**Issue VH-01 (Low):** The following page root divs still use `minHeight: "100vh"` rather than `100svh`:
- `Home.tsx` line 74: `style={{ background: "#0A171E", minHeight: "100vh" }}`
- `Features.tsx` line 64: `style={{ background: "#0A171E", minHeight: "100vh" }}`
- `NotFound.tsx` line 14: `style={{ background: "#0A171E", minHeight: "100vh" }}`
- `Privacy.tsx` line 25: `style={{ background: "#0A171E", minHeight: "100vh" }}`
- `Terms.tsx` line 26: `style={{ background: "#0A171E", minHeight: "100vh" }}`
- `BlogPost.tsx` line 821: `style={{ background: "#0A171E", minHeight: "100vh" }}`

The `100vh` on page root divs is not critical (the page scrolls, the root div's `min-height` just sets the background colour to fill the screen) — but on iOS Safari, `100vh` includes the URL bar height. When the URL bar collapses, `100vh` is taller than the visible area, potentially causing a white/background-colour gap at the bottom. `100svh` avoids this.

Fix:
```tsx
// In all six page root divs, change:
style={{ background: "#0A171E", minHeight: "100vh" }}
// To:
style={{ background: "#0A171E", minHeight: "100svh" }}
```

---

## 13. Touch Interactions — Hover State Equivalents

### Status: PASS

All hover-state CSS classes (`.card:hover`, `.btn-primary:hover`, `.blog-card-hover:hover`, `.footer-link:hover`) use `transition` and `transform` — these do not trigger on touch. The actual interactive elements are wrapped in `<Link>` or `<a>` elements, which do trigger on touch.

The card hover lift (`transform: translateY(-3px)`) fires on the `active` pseudo-state on iOS Safari (touch-and-hold). This is acceptable behaviour for decorative hover effects.

**Issue TOUCH-01 (Low):** The custom cursor (`CustomCursor.tsx`) registers `mousemove` event listeners and creates DOM elements `#cursor-dot` and `#cursor-ring`. The CSS hides these on mobile:
```css
@media (max-width: 768px) {
  #cursor-dot, #cursor-ring { display: none; }
}
```
However the `requestAnimationFrame` loop and `mousemove` listener continue to run on mobile even though the elements are visually hidden. This wastes a small amount of CPU.

Fix in `CustomCursor.tsx`:
```tsx
// Add a pointer device check before starting the animation loop:
useEffect(() => {
  // Don't run custom cursor on touch-only devices
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;
  
  // ... existing effect code
}, []);
```

---

## 14. Container Padding — Mobile Adequacy

### Status: PASS

The `.container` class:
```css
.container {
  padding-left: 1.5rem;   /* 24px on mobile */
  padding-right: 1.5rem;  /* 24px on mobile */
}
@media (min-width: 1024px) {
  .container { padding-left: 2.5rem; padding-right: 2.5rem; }
}
```

At 320px: `320 - 48 = 272px` content width. Comfortable for text and single-column layouts.
At 375px: `375 - 48 = 327px` content width. Comfortable.
At 414px: `414 - 48 = 366px` content width. Good.
At 768px: `768 - 48 = 720px` content width. Good (lg breakpoint not yet triggered).

---

## 15. Hero Sections — Viewport Simulation

### Simulated behaviour at key breakpoints:

#### 320px (iPhone SE 1st gen, older Android)
- Navigation: hamburger visible. Desktop nav hidden. CTA "Join Waitlist" button hidden. PASS.
- Hero h1: "Between visits, we take over." at `clamp(64px, 7vw, 96px)` → 64px. Line-height 0.95. 2-3 lines. Tight but readable. MARGINAL.
- Hero CTA row: `display: flex, gap: 16, flexWrap: "wrap"` — buttons wrap correctly. PASS.
- PhoneMockup: hidden below hero text in grid. PASS.
- Stats row: `flex-wrap` present. Stats wrap. PASS.
- EFP award card: stacks (photo on top, text below). Photo min-height still 420px — pushes content below fold. ISSUE (see IMG-02).

#### 375px (iPhone 6-13 default)
- Everything readable. Hero h1 at 64px fills width nicely. PASS.
- Stats row: all three stats fit on one row at 375px. PASS.
- Feature cards: single column. PASS.

#### 414px (iPhone Plus / iPhone XR)
- Clean layout at all sections. PASS.

#### 768px (iPad portrait)
- Grid breakpoints: hero goes to 1-col (lg breakpoint not yet triggered). Features bento activates `md:col-span-2`. How It Works activates 3-col. Stats grid activates 3-col. All correct.
- Navbar: hamburger still showing (768px is still mobile). At exactly 768px, the CSS `@media (max-width: 768px)` fires, showing hamburger. Desktop nav is hidden. This is correct behaviour for tablet-portrait.

---

## 16. ForDentists — Clinical Tools Section

### Status: P2 issue found

**Issue FORDENTISTS-01 (Medium):** The clinical feature cards use:
```tsx
<div style={{ padding: 36, display: "flex", gap: 28 }}>
  <div style={{ width: 52, height: 52, flexShrink: 0 }}>  {/* icon */}
  <div style={{ flex: 1 }}>  {/* content */}
```
At 320px, `padding: 36` = 72px horizontal padding consumed, plus the 52px icon, plus 28px gap = 152px consumed before the text content has any space. The `flex: 1` content column would have only `272 - 72 - 52 - 28 = 120px`. At 120px wide, the `h3` at fontSize 28 (Dongle) wraps immediately.

Fix:
```tsx
// Replace in ForDentists.tsx line 201:
<div className="card reveal" style={{ padding: 36, display: "flex", gap: 28, transitionDelay: `${i * 0.08}s` }}>
// With:
<div className="card reveal flex flex-col sm:flex-row gap-4 sm:gap-7 p-5 sm:p-9" style={{ transitionDelay: `${i * 0.08}s` }}>
// This stacks icon above text on mobile, reverts to side-by-side on sm+
```

---

## 17. Blog Page — Featured Posts

### Status: PASS with GRID-02 note

The featured posts grid (`auto-fit, minmax(340px, 1fr)`) collapses to a single column on mobile (see GRID-02 for fix recommendation). Blog article rows use `flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6` — stacks correctly on mobile. PASS.

Blog newsletter section: email input has `minWidth: "220px"` with `flex: "1"`. Actually checking the current code:
```tsx
<input className="p-input" style={{ flex: "1", minWidth: "220px" }} />
```
At 320px with the flex container, the button `className="btn-primary"` has `white-space: nowrap` (from the `.btn-primary` class). With `flexWrap: "wrap"` on the container, if the combined width exceeds the container, the button wraps below. The input with `flex: 1` and `minWidth: 220px` will attempt to be at least 220px — at 320px with 48px container padding and some button width (~110px), the input gets ~166px, which is less than 220px. The `minWidth: 220px` with `flexWrap: wrap` means the input occupies a full row (272px), and the button wraps to the next line. This is acceptable layout.

---

## 18. Pricing Page — Beta Notice

### Status: P2 issue

**Issue PRICING-01 (Medium):** The beta notice banner:
```tsx
style={{ padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}
```
`padding: "20px 28px"` is fixed. At 320px, 28px × 2 = 56px horizontal padding inside the card, leaving 216px for content. The icon (36px) plus gap (16px) leaves 164px for text. The title "We're currently in private beta" at `fontSize: 15` fits in 164px but wraps to 2 lines. The subtitle wraps to 3-4 lines. Readable but cramped.

Fix:
```tsx
style={{ padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}
// Or use Tailwind: className="... p-4 sm:p-[28px]"
```

---

## Summary of All Issues by Priority

### P0 — Critical (layout breaks)
None remaining from previous fix pass.

### P1 — High (degraded but functional)

| ID | Location | Issue | Fix |
|----|----------|-------|-----|
| GRID-03 | Waitlist.tsx:120 | `gridTemplateColumns: "1fr 1fr"` — no responsive breakpoint | Replace with `className="grid grid-cols-1 sm:grid-cols-2 gap-3"` |
| FORDENTISTS-01 | ForDentists.tsx:201 | Icon + text layout at 36px padding causes 120px text column on mobile | Replace with `flex flex-col sm:flex-row p-5 sm:p-9` |
| IMG-02 | Home.tsx:208 | EFP Award photo `minHeight: 420` not updated to responsive class | `className="relative min-h-[240px] md:min-h-[420px] overflow-hidden"` |

### P2 — Medium (suboptimal but not broken)

| ID | Location | Issue | Fix |
|----|----------|-------|-----|
| TYPO-01 | index.css `.display-md` | Floor 44px too large for 320px screens | Change to `clamp(36px, 5.5vw, 80px)` |
| TYPO-02 | Features.tsx:90-93 | `display-lg` h1 wraps to 3+ lines at 320px | Remove `<br />`, use `display-md`, or adjust floor |
| HERO-01 | Home.tsx:120 | H1 fontSize floor 64px — tight at 320px | Reduce to `clamp(52px, 7vw, 96px)` |
| SECTION-PAD | All pages | 40+ hardcoded inline `padding: "Xpx 0"` section paddings | Replace all with `clamp()` values |
| GRID-01 | Features.tsx:117 | `auto-fill, minmax(320px, 1fr)` inline style | Replace with `className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"` |
| GRID-02 | Blog.tsx:210 | `auto-fit, minmax(340px, 1fr)` inline style | Replace with `className="grid grid-cols-1 md:grid-cols-2 gap-6"` |
| IMG-03 | Home.tsx:213 | EFP Award right panel `padding: 48` fixed | `className="bg-[#1D3449] p-6 md:p-12"` |
| PRICING-01 | Pricing.tsx:133 | Beta notice `padding: "20px 28px"` fixed | Reduce to `padding: "16px 20px"` or use responsive Tailwind |
| PHONE-01 | Home.tsx / PhoneMockup.tsx | Side buttons protrude 5px, no overflow management on container | Add `px-2` to phone wrapper container |
| VH-01 | Multiple pages | `minHeight: "100vh"` still present | Replace with `"100svh"` |
| NAV-03 | Navbar.tsx:159 | Mobile drawer links at 48px font — tight at 320px | `clamp(36px, 10vw, 48px)` |

### P3 — Low / Polish

| ID | Location | Issue | Fix |
|----|----------|-------|-----|
| NAV-01 | Navbar.tsx | Inline `<style>` block with raw media queries | Replace with Tailwind `hidden md:flex` / `md:hidden` |
| HERO-02 | Home.tsx:112 | EFP badge `whiteSpace: nowrap` — may clip at 320px | Add `flexWrap: "wrap"` |
| HERO-03 | Home.tsx:157 | Stats row could use `grid-cols-3` for alignment | `className="grid grid-cols-3 gap-4 lg:gap-10"` |
| TYPO-03 | Multiple pages | Inline `clamp()` fontSizes bypass design system classes | Use `.display-lg`, `.display-md` CSS classes |
| TYPO-04 | index.css | `.body-lg`, `.body-md` fixed pixel font sizes | Add `clamp()` for fluid text |
| MEDIA-01 | Navbar.tsx | 1px gap between `max-width: 768px` / `min-width: 769px` breakpoints | Use Tailwind breakpoint which fires at 768px |
| TOUCH-01 | CustomCursor.tsx | RAF loop runs on mobile even though cursor is hidden | Add `pointer: coarse` media query guard |
| HOOK-01 | Multiple pages | `useIsMobile()` hook unused in page-level code | Either use in Navbar or remove from codebase |

---

## Positive Findings (What Works Well)

1. **Hamburger navigation** — Fully functional. 44px touch target. Keyboard accessible (Escape key). Body scroll lock. Route-change close. ARIA labels correct.
2. **Container system** — 1.5rem padding on mobile, auto max-width. Clean and consistent.
3. **`.section` class padding** — Uses `clamp(64px, 8vw, 120px)` — fluid and correct. (When actually used.)
4. **Responsive grid migrations** — The previous fix pass correctly identified and migrated all the major grid layouts. ~16 grids now use proper Tailwind responsive classes.
5. **Touch target sizing** — `.p-input` at 52px height, `.btn-primary` at ~50px height, hamburger at 44px. All pass the 44px minimum.
6. **prefers-reduced-motion** — Comprehensive implementation across all animations. Mobile users with vestibular conditions are protected.
7. **Viewport height** — Hero section correctly uses `100svh`. Most page roots updated.
8. **PhoneMockup** — Capped at 300px on mobile via outer container, `maxWidth: "100%"` prevents overflow.
9. **Ticker** — Correctly uses `overflow: hidden` on wrapper. No horizontal overflow.
10. **Custom cursor** — Correctly hidden via CSS on mobile. No layout impact.

---

## Score Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| Mobile hamburger nav | 8.5/10 | Works well; inline style block is minor issue |
| Hero sections (320-768px) | 7/10 | H1 floor too large; EFP card photo not fully fixed |
| Grids — responsive stacking | 8/10 | Major grids fixed; 3 remaining inline grid issues |
| Font sizes — Dongle display | 7/10 | `display-md` floor still 44px; inline clamp() inconsistencies |
| Padding / spacing | 5/10 | 40+ inline fixed section paddings across all pages |
| Container / touch targets | 9/10 | p-input and buttons all meet 44px minimum |
| Viewport height (`svh`) | 7/10 | 6 page roots still use `100vh` |
| PhoneMockup scaling | 7.5/10 | Capped correctly; side-button overflow risk persists |
| Horizontal scroll | 9/10 | All major sources fixed; CTA orb dependency noted |
| useMobile hook | 5/10 | Unused in all pages; sidebar.tsx only |
| Images | 8/10 | All fluid; EFP card photo min-height not fully fixed |
| Touch interactions | 9/10 | All hover states work correctly on touch |
| CSS media queries vs Tailwind | 7/10 | Mix is acceptable but Navbar inline style block is P3 tech debt |

**Overall Score: 7.5 / 10**

The codebase is in a significantly improved state from the previous audit pass. The critical grid-overflow issues are resolved. The remaining issues are in the P2/P3 range — suboptimal but not layout-breaking at standard mobile viewports (375px and above). At 320px, several font sizes and section paddings remain uncomfortably large, and 3 inline grid declarations still bypass Tailwind breakpoints.

---

## Quick Wins List (Highest ROI Fixes)

1. **Section paddings** — Global search-replace `"120px 0"` → `"clamp(64px, 8vw, 120px) 0"` across all pages. One afternoon of work, fixes every interior section on every page simultaneously.
2. **`minHeight: "100vh"`** → `"100svh"` in 6 page root divs. Six find-and-replace operations, 10 minutes total.
3. **Waitlist role selector grid** — One-line change from `gridTemplateColumns: "1fr 1fr"` to `className="grid grid-cols-1 sm:grid-cols-2 gap-3"`.
4. **`display-md` floor** — One CSS change in `index.css` from `44px` to `36px`. Immediately improves all BlogPost h1 and Features h1 on 320px screens.
5. **Home.tsx EFP card photo** — Already fixed in About.tsx, replicate to Home.tsx. One line.
