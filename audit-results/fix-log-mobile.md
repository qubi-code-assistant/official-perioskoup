# Mobile Responsive Fix Log — Perioskoup Landing Page
**Date:** 2026-03-06
**Agent:** mobile-fixer (Claude Sonnet 4.6)
**Branch:** fix/final-launch-audit
**Source audit:** `audit-results/05-mobile-responsive.md`

---

## Summary

Implemented all high-ROI responsive fixes identified in the mobile audit. The codebase moves from 7.5/10 to an estimated 9.0/10 on the mobile responsive score. No content, JSON-LD schemas, or ARIA attributes were modified. Desktop layout is unchanged.

---

## Fixes Applied

### Fix 1 — `index.css`: `display-md` floor reduced (TYPO-01)
**File:** `client/src/index.css`
**Issue:** `.display-md` had `clamp(44px, 5.5vw, 80px)` — at 320px viewport resolves to 44px floor which is too large for multi-line headings on BlogPost and Features pages.
**Fix:** Changed floor to `clamp(36px, 5.5vw, 80px)` and loosened `line-height` from `1.0` to `1.05` for better readability on narrow screens.

### Fix 2 — `index.css`: `body-lg` and `body-md` made fluid (TYPO-04)
**File:** `client/src/index.css`
**Issue:** `.body-lg` used a fixed `18px` and `.body-md` used fixed `16px`. Non-responsive at narrow viewports.
**Fix:**
- `.body-lg`: `font-size: clamp(16px, 4vw, 18px)`
- `.body-md`: `font-size: clamp(14px, 3.5vw, 16px)`

### Fix 3 — `Home.tsx`: Page root `100vh` to `100svh` (VH-01)
**File:** `client/src/pages/Home.tsx`
**Issue:** Page root `div` used `minHeight: "100vh"` which is taller than the visible area on iOS Safari when the URL bar is shown.
**Fix:** Changed to `minHeight: "100svh"` (small viewport height unit).

### Fix 4 — `Home.tsx`: Hero H1 clamp floor reduced (HERO-01)
**File:** `client/src/pages/Home.tsx`
**Issue:** H1 used `clamp(64px, 7vw, 96px)` — at 320px this resolves to 64px, which is quite heavy. Combined with `lineHeight: 0.95`, lines overlap slightly on mobile.
**Fix:** Changed to `clamp(52px, 7vw, 96px)` and `lineHeight: 1.0`.

### Fix 5 — `Home.tsx`: EFP badge `whiteSpace: "nowrap"` removed (HERO-02)
**File:** `client/src/pages/Home.tsx`
**Issue:** The EFP badge wrapper had `whiteSpace: "nowrap"` and both child `<span>` elements also had `whiteSpace: "nowrap"`. At 320px viewport, the badge is extremely tight (272px available, badge ~280px wide).
**Fix:** Replaced outer `whiteSpace: "nowrap"` with `flexWrap: "wrap"`. Removed `whiteSpace: "nowrap"` from both child spans.

### Fix 6 — `Home.tsx`: EFP Award card photo `minHeight: 420` made responsive (IMG-02)
**File:** `client/src/pages/Home.tsx`
**Issue:** The photo container had `style={{ position: "relative", minHeight: 420, overflow: "hidden" }}`. On 320px mobile stacked layout, a 420px minimum-height photo pushes the content text far below the fold.
**Fix:** Replaced with `className="relative min-h-[240px] md:min-h-[420px] overflow-hidden"` — 240px on mobile, 420px on md and above.

### Fix 7 — `Home.tsx`: EFP Award right panel `padding: 48` made responsive (IMG-03)
**File:** `client/src/pages/Home.tsx`
**Issue:** The right content panel had `style={{ background: "#1D3449", padding: 48 }}`. At 320px, 48px horizontal padding on each side leaves only 176px for text.
**Fix:** Replaced with `className="bg-[#1D3449] p-6 md:p-12 flex flex-col gap-0"` — 24px padding on mobile, 48px on md and above.

### Fix 8 — `Home.tsx`: All hardcoded section paddings converted to `clamp()` (SECTION-PAD)
**File:** `client/src/pages/Home.tsx`
**Issue:** Multiple sections used fixed `padding: "120px 0"`, `"100px 0"`, `"80px 0"` which are excessive on small mobile screens (e.g., 120px x 2 = 240px of vertical whitespace on a 568px iPhone SE screen).
**Fix:** Global replacement with fluid `clamp()` values:
- `"120px 0"` changed to `"clamp(64px, 8vw, 120px) 0"`
- `"100px 0"` changed to `"clamp(56px, 7vw, 100px) 0"`
- `"80px 0"` changed to `"clamp(48px, 6vw, 80px) 0"`

### Fix 9 — `Home.tsx`: Phone mockup container gets `px-2` breathing room (PHONE-01)
**File:** `client/src/pages/Home.tsx`
**Issue:** Side-button decorators on the PhoneMockup protrude 5px outside the component frame. No overflow protection existed on the wrapping container.
**Fix:** Replaced the phone wrapper with a `max-w-[300px] sm:max-w-[340px] mx-auto px-2` constrained div. The `px-2` (8px each side) provides breathing room for the 5px side buttons.

### Fix 10 — `Waitlist.tsx`: Role selector grid made responsive (GRID-03)
**File:** `client/src/pages/Waitlist.tsx`
**Issue:** `style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}` forced a two-column layout with no mobile breakpoint. At 320px, each button was ~128px wide — too tight for the button content.
**Fix:** Replaced with Tailwind `className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3"`. Now stacks vertically on mobile below 640px, side-by-side on sm and above.

### Fix 11 — `ForDentists.tsx`: Clinical tool cards made responsive (FORDENTISTS-01)
**File:** `client/src/pages/ForDentists.tsx`
**Issue:** Cards used `style={{ padding: 36, display: "flex", gap: 28 }}`. At 320px: 72px horizontal padding + 52px icon + 28px gap = 152px consumed before text has any space, leaving only 120px for text content.
**Fix:** Replaced with `className="card reveal flex flex-col sm:flex-row gap-4 sm:gap-7 p-5 sm:p-9"`. On mobile the icon stacks above text (column direction, 20px padding). On sm+ the icon sits beside text (row direction, 36px padding).

### Fix 12 — `ForDentists.tsx`: All hardcoded section paddings converted to `clamp()` (SECTION-PAD)
**File:** `client/src/pages/ForDentists.tsx`
**Fix:** Same mapping as Home.tsx applied — all 7 section padding declarations replaced with fluid clamp() values.

### Fix 13 — `About.tsx`: All hardcoded section paddings converted to `clamp()` (SECTION-PAD)
**File:** `client/src/pages/About.tsx`
**Fix:** Same mapping applied — 7 section padding replacements across all page sections.

### Fix 14 — `BlogPost.tsx`: Hero and body section paddings converted to `clamp()` (SECTION-PAD)
**File:** `client/src/pages/BlogPost.tsx`
**Fix:**
- Hero section: `paddingTop: "120px"` changed to `"clamp(80px, 10vw, 120px)"`, `paddingBottom: "64px"` changed to `"clamp(40px, 5vw, 64px)"`
- Body section: `paddingTop: "64px"` changed to `"clamp(40px, 5vw, 64px)"`, `paddingBottom: "120px"` changed to `"clamp(64px, 8vw, 120px)"`

### Fix 15 — `Features.tsx`: Feature grid made responsive with Tailwind (GRID-01)
**File:** `client/src/pages/Features.tsx`
**Issue:** `style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}` — `minmax(320px, 1fr)` is wider than the 272px content area at 320px viewport, producing single-column by accident rather than design intent.
**Fix:** Replaced with `className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"`. Explicitly single-column on mobile, two-column on sm (640px), three-column on xl (1280px).

### Fix 16 — `Features.tsx`: Page root `100vh` to `100svh` (VH-01)
**File:** `client/src/pages/Features.tsx`
**Fix:** `minHeight: "100vh"` changed to `minHeight: "100svh"`.

### Fix 17 — `Features.tsx`: H1 `<br />` removed, `lineHeight` adjusted (TYPO-02)
**File:** `client/src/pages/Features.tsx`
**Issue:** At 320px with `display-lg` resolving to 44px, the first line "AI dental companion features -" is approximately 340px wide — wider than the 272px content area. It wraps before the `<br />` fires, creating a 3-line heading.
**Fix:** Removed the `<br />` and used `{" "}` inline space so natural text wrapping handles the break. Added `lineHeight: 1.05` to the heading style.

### Fix 18 — `Blog.tsx`: Featured posts grid made responsive with Tailwind (GRID-02)
**File:** `client/src/pages/Blog.tsx`
**Issue:** `style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}` collapses to single column at the non-standard 680px breakpoint rather than a Tailwind breakpoint.
**Fix:** Replaced with `className="reveal grid grid-cols-1 md:grid-cols-2 gap-6"`. Clean collapse at the standard 768px md breakpoint.

### Fix 19 — `Navbar.tsx`: Inline `<style>` block replaced with Tailwind classes (NAV-01)
**File:** `client/src/components/Navbar.tsx`
**Issue:** The Navbar used an inline `<style>` block with raw CSS media queries and utility classes `hide-mobile` / `show-mobile-flex`. This bypassed Tailwind, created a 1px breakpoint gap at 768px vs 769px, and was fragile tech debt.
**Fix:** Three element replacements:
- Desktop nav div: `className="hide-mobile"` changed to `className="hidden md:flex items-center gap-0.5"`
- Desktop CTA span: `className="btn-primary hide-mobile"` changed to `className="btn-primary hidden md:inline-flex"`
- Hamburger button: `style={{ display: 'none' }} className="show-mobile-flex"` changed to `className="flex md:hidden items-center justify-center"` (removed `display: 'none'` from inline style)
- Removed the entire inline `<style>` block.

### Fix 20 — `Navbar.tsx`: Mobile drawer font size made fluid (NAV-03)
**File:** `client/src/components/Navbar.tsx`
**Issue:** Mobile drawer links used `fontSize: '48px'` (Dongle). At 280px viewport, "For Dentists" at 48px may truncate.
**Fix:** Changed to `fontSize: 'clamp(36px, 10vw, 48px)'` — scales down on very narrow screens, maximum 48px on standard mobile sizes.

### Fix 21 — `CustomCursor.tsx`: Touch device guard added (TOUCH-01)
**File:** `client/src/components/CustomCursor.tsx`
**Issue:** The `requestAnimationFrame` loop and `mousemove` event listener continued running on touch devices even though the cursor elements are hidden via CSS. This wasted CPU on every mobile page load.
**Fix:** Added `pointer: coarse` media query check at the top of the useEffect — returns early on touch-only devices, preventing the RAF loop and mousemove listener from ever starting.

### Fix 22 — Multiple pages: `minHeight: "100vh"` changed to `"100svh"` (VH-01)
**Files:** `NotFound.tsx`, `Privacy.tsx`, `Terms.tsx`, `BlogPost.tsx` (2 instances)
**Fix:** All page root `div` elements updated to use `minHeight: "100svh"`.

---

## Fixes Deferred (P3 / Out of Scope)

| ID | Location | Reason deferred |
|----|----------|----------------|
| HERO-03 | Home.tsx stats row | `flex-wrap` already present; grid-cols-3 is cosmetic-only |
| TYPO-03 | Multiple pages | Inline `clamp()` values are functional; refactoring to CSS classes is a code-quality task not a mobile-breaking issue |
| OVERFLOW-03 | CTA orbs | `cta-bg-canvas` has `overflow: hidden` already — documented as architectural dependency |
| HOOK-01 | useMobile.tsx | Hook is unused in pages; removing it is a cleanup task for performance-fixer agent |

---

## Score Projection

| Category | Before | After |
|----------|--------|-------|
| Mobile hamburger nav | 8.5/10 | 9.5/10 |
| Hero sections (320-768px) | 7/10 | 9/10 |
| Grids — responsive stacking | 8/10 | 9.5/10 |
| Font sizes — Dongle display | 7/10 | 8.5/10 |
| Padding / spacing | 5/10 | 9/10 |
| Container / touch targets | 9/10 | 9/10 |
| Viewport height (svh) | 7/10 | 9.5/10 |
| PhoneMockup scaling | 7.5/10 | 8.5/10 |
| Horizontal scroll | 9/10 | 9/10 |
| Touch interactions | 9/10 | 9.5/10 |
| CSS media queries vs Tailwind | 7/10 | 9.5/10 |

**Projected overall mobile score: 9.0 / 10** (was 7.5 / 10)

---

## TypeScript Check

`pnpm check` passes with zero errors after all fixes.
