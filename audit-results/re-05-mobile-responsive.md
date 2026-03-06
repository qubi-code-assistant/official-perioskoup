# Mobile Responsiveness Re-Audit — Perioskoup Landing Page
**Auditor:** Mobile-Responsive Subagent (Claude Sonnet 4.6)
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Original audit score:** 7.5 / 10
**Fix-log projected score:** 9.0 / 10
**Re-audit actual score:** 8.6 / 10

---

## Executive Summary

The fix-log applied 22 targeted fixes across all pages and components. The vast majority were correctly implemented. The re-audit confirms that all P0/P1 issues from the original audit are resolved — no layout-breaking issues remain at any standard mobile viewport. The score lands at 8.6/10 rather than the projected 9.0/10 due to three categories of residual issues: (1) a new class of hardcoded `paddingTop: 140` hero section paddings on every secondary page that was not in the original audit scope and was not touched by the fixer, (2) two hardcoded `padding: "80px 0"` and one `padding: "120px 0"` in Pricing and Blog that were missed by the fix pass, and (3) the `useIsMobile()` hook remains unused — deferred as intended but still an open item.

---

## Issue-by-Issue Verification Against Original Audit

### NAV-01 — Inline `<style>` block replaced with Tailwind classes
**Status: FIXED**

`Navbar.tsx` line 113: `className="hidden md:flex items-center gap-0.5"` — correct Tailwind pattern.
`Navbar.tsx` line 130: `className="btn-primary hidden md:inline-flex"` — correct.
`Navbar.tsx` line 145: `className="flex md:hidden items-center justify-center"` — correct.

The entire inline `<style>` block with raw media queries (`hide-mobile`, `show-mobile-flex`) has been removed. The 1px breakpoint gap (768px vs 769px) is gone. Both mobile/desktop nav states now use standard Tailwind `md:` breakpoints, which fire at 768px (`min-width: 768px`). PASS.

### NAV-03 — Mobile drawer font size fluid
**Status: FIXED**

`Navbar.tsx` line 189: `fontSize: 'clamp(36px, 10vw, 48px)'` — correct implementation. At 280px viewport: `10vw = 28px`, clamp resolves to 36px (floor). At 320px: `10vw = 32px`, resolves to 36px. At 375px: `10vw = 37.5px`, resolves to 37.5px. All "For Dentists" text fits within content area. PASS.

### HERO-01 — Hero H1 clamp floor reduced
**Status: FIXED**

`Home.tsx` line 95: `fontSize: "clamp(52px, 7vw, 96px)"` with `lineHeight: 1.0`. Floor reduced from 64px to 52px as specified. At 320px the heading "Between visits, we take over." spans approximately 2 lines cleanly. PASS.

### HERO-02 — EFP badge `whiteSpace: "nowrap"` removed
**Status: FIXED**

`Home.tsx` line 87: `flexWrap: "wrap" as const` added to the outer badge element. The child `<span>` elements no longer have `whiteSpace: "nowrap"`. The badge wraps gracefully on 320px. PASS.

### VH-01 — All page root `minHeight: "100vh"` changed to `"100svh"`
**Status: FULLY FIXED**

Verified in all six files:
- `Home.tsx` line 49: `minHeight: "100svh"` — PASS
- `Features.tsx` line 45: `minHeight: "100svh"` — PASS
- `NotFound.tsx` line 14: `minHeight: "100svh"` — PASS
- `Privacy.tsx` line 25: `minHeight: "100svh"` — PASS
- `Terms.tsx` line 26: `minHeight: "100svh"` — PASS
- `BlogPost.tsx` line 821: `minHeight: "100svh"` — PASS
- `ForDentists.tsx` line 53: `minHeight: "100svh"` — PASS (was not in original audit list but also correct)
- `About.tsx` line 93: `minHeight: "100svh"` — PASS
- `Blog.tsx` line 109: `minHeight: "100svh"` — PASS
- `Waitlist.tsx` line 56: `minHeight: "100svh"` — PASS
- `Pricing.tsx` line 65: `minHeight: "100svh"` — PASS
- `Contact.tsx`: `minHeight: "100svh"` — PASS (verified via grep — zero instances of `100vh` remain)

### IMG-02 — EFP Award photo `minHeight: 420` made responsive
**Status: FIXED**

`Home.tsx` line 185: `className="relative min-h-[240px] md:min-h-[420px] overflow-hidden"` — correct. At 320px the photo is 240px tall, giving the text panel room to breathe in the stacked layout. PASS.

### IMG-03 — EFP Award right panel `padding: 48` made responsive
**Status: FIXED**

`Home.tsx` line 190: `className="bg-[#1D3449] p-6 md:p-12 flex flex-col gap-0"` — correct. On mobile: 24px padding (6 × 4px Tailwind unit). On md+: 48px. PASS.

### SECTION-PAD — Hardcoded inline section paddings (Home.tsx)
**Status: FIXED for Home.tsx**

All five section paddings in `Home.tsx` have been converted to `clamp()` values. Verified:
- Line 181: `padding: "clamp(48px, 6vw, 80px) 0"` — PASS
- Line 222: `padding: "clamp(64px, 8vw, 120px) 0"` — PASS
- Line 264: `padding: "clamp(56px, 7vw, 100px) 0"` — PASS
- Line 284: `padding: "clamp(64px, 8vw, 120px) 0"` — PASS
- Line 357: `padding: "clamp(48px, 6vw, 80px) 0"` — PASS

### SECTION-PAD — About.tsx
**Status: FIXED**

All section paddings in `About.tsx` verified as `clamp()` values. PASS.

### SECTION-PAD — ForDentists.tsx
**Status: FIXED for interior sections; hero section has a new residual issue — see NEW-01**

Interior sections: all use `clamp()`. PASS.
Hero section: `paddingTop: 140, paddingBottom: 80` — not addressed (see NEW-01 below).

### SECTION-PAD — BlogPost.tsx
**Status: FIXED**

`BlogPost.tsx` line 849: `paddingTop: "clamp(80px, 10vw, 120px)", paddingBottom: "clamp(40px, 5vw, 64px)"` — PASS.
`BlogPost.tsx` line 891: `paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(64px, 8vw, 120px)"` — PASS.

### TYPO-01 — `display-md` floor reduced
**Status: FIXED**

`index.css` line 637: `font-size: clamp(36px, 5.5vw, 80px)` with `line-height: 1.05` — correct. Floor reduced from 44px to 36px. BlogPost `<h1 className="display-md">` now resolves to 36px at 320px viewport. PASS.

### TYPO-02 — Features.tsx `<br />` removed from `display-lg` heading
**Status: FIXED**

`Features.tsx` line 71-73: The `<br />` is gone. Content is now inline with `{" "}` natural wrapping. `lineHeight: 1.05` applied. PASS.

### TYPO-04 — `body-lg` and `body-md` made fluid
**Status: FIXED**

`index.css` lines 649-650:
```
.body-lg { font-size: clamp(16px, 4vw, 18px); line-height: 1.65; color: #8C9C8C; }
.body-md { font-size: clamp(14px, 3.5vw, 16px); line-height: 1.6; color: #8C9C8C; }
```
Both now use fluid `clamp()` values. PASS.

### GRID-01 — Features.tsx feature grid made responsive
**Status: FIXED**

`Features.tsx` line 98: `className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"` — correct. The `auto-fill, minmax(320px, 1fr)` inline style is gone. Single column on mobile, two on sm (640px), three on xl (1280px). PASS.

### GRID-02 — Blog.tsx featured posts grid made responsive
**Status: FIXED**

`Blog.tsx` line 196: `className="reveal grid grid-cols-1 md:grid-cols-2 gap-6"` — correct. The `auto-fit, minmax(340px, 1fr)` inline style is gone. Clean collapse at the standard 768px md breakpoint. PASS.

### GRID-03 — Waitlist.tsx role selector grid made responsive
**Status: FIXED**

`Waitlist.tsx` line 104: `className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3"` — correct. The `gridTemplateColumns: "1fr 1fr"` with no breakpoint is gone. On mobile the two role buttons stack vertically (full-width, large touch targets). PASS.

### FORDENTISTS-01 — Clinical tool cards made responsive
**Status: FIXED**

`ForDentists.tsx` line 187: `className="card reveal flex flex-col sm:flex-row gap-4 sm:gap-7 p-5 sm:p-9"` — correct. On mobile: 20px padding, icon stacks above text. On sm+: 36px padding, icon beside text. The problematic 120px text column at 320px is eliminated. PASS.

### PHONE-01 — Phone mockup side-button breathing room
**Status: FIXED**

`Home.tsx` line 153: `className="w-full max-w-[300px] sm:max-w-[340px] mx-auto px-2"` — 8px horizontal padding (px-2) provides breathing room for the 5px side-button protrusion. PASS.

### TOUCH-01 — Custom cursor RAF loop guard on touch devices
**Status: FIXED**

`CustomCursor.tsx` lines 15-17:
```tsx
const isTouch = window.matchMedia('(pointer: coarse)').matches;
if (isTouch) return;
```
The RAF loop and `mousemove` listener are never started on touch-only devices. PASS.

### PRICING-01 — Beta notice padding
**Status: PARTIALLY UNADDRESSED**

`Pricing.tsx` line 116: `padding: "20px 28px"` is unchanged. The fix-log does not mention this fix. At 320px, 56px horizontal padding leaves 216px for content with a 36px icon + 16px gap = only 164px for text. This is tight but not broken. The fix-log explicitly lists no deferred items from Pricing.tsx, suggesting this was overlooked. It remains as a P2 item.

### NAV-02 — Mobile drawer CSS pattern
**Status: NOTE CONFIRMED — NOT AN ISSUE**

Confirmed as correct React conditional rendering pattern. No change needed. PASS.

### HERO-03 — Stats row alignment
**Status: DEFERRED by design**

The `flex flex-wrap gap-6 lg:gap-10` pattern is retained as-is. The fix-log explicitly deferred this as "cosmetic-only." Acceptable.

### OVERFLOW-03 — CTA orbs architectural dependency
**Status: NOTED — no fix needed**

`cta-bg-canvas { overflow: hidden }` remains load-bearing. Documented in original audit. Not a regression. PASS.

### HOOK-01 — `useIsMobile()` hook unused
**Status: DEFERRED by design**

The hook remains unused in page-level code. The fix-log deferred this as a cleanup task. The Navbar now uses Tailwind breakpoints exclusively (post NAV-01 fix), so the hook is truly unnecessary. The deferral is correct.

---

## NEW Issues Introduced or Discovered Post-Fix

### NEW-01 — Hero section `paddingTop: 140` on all secondary page heroes (P2)

**Affected files:**
- `ForDentists.tsx` line 74: `style={{ paddingTop: 140, paddingBottom: 80 }}`
- `About.tsx` line 115: `style={{ paddingTop: 140, paddingBottom: 80 }}`
- `Blog.tsx` line 175: `style={{ paddingTop: "140px", paddingBottom: "80px" }}`
- `Waitlist.tsx` line 76: `style={{ paddingTop: 140, paddingBottom: 120 }}`
- `Contact.tsx` line 101: `style={{ paddingTop: 140, paddingBottom: 80 }}`
- `Pricing.tsx` line 87: `style={{ paddingTop: 140, paddingBottom: 80 }}`
- `NotFound.tsx` line 22: `style={{ paddingTop: 180, paddingBottom: 120 }}`
- `Privacy.tsx` line 40: `style={{ paddingTop: 140, paddingBottom: 100 }}`
- `Terms.tsx` line 41: `style={{ paddingTop: 140, paddingBottom: 100 }}`

These are the hero sections of all secondary pages. The `paddingTop: 140` is necessary to clear the fixed Navbar (64px height) plus provide visual breathing room. However, at 320px mobile this is a fixed 140px top padding — appropriate for the navbar clearance, but the bottom paddings (`80px`, `100px`, `120px`) are not fluid.

The `paddingTop: 140` is actually acceptable because the navbar is 64px tall and the hero needs at minimum 76px of additional clearance to avoid the breadcrumb being hidden under the navbar. However, the bottom paddings on these heroes are unnecessary excess at mobile scale.

**Fix:**
```tsx
// Replace on all secondary page hero sections:
style={{ paddingTop: 140, paddingBottom: 80 }}
// With:
style={{ paddingTop: "clamp(120px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}

// And for larger bottom paddings:
paddingBottom: 120  →  "clamp(64px, 8vw, 120px)"
paddingBottom: 100  →  "clamp(56px, 7vw, 100px)"
```

Note: `paddingTop: 140` does not need the same `clamp()` treatment as purely decorative section padding because it has a functional minimum (navbar clearance). However the `clamp()` approach with a floor of 120px still clears the navbar and gives a slightly smaller value on ultra-narrow viewports.

### NEW-02 — Pricing.tsx FAQ section `padding: "120px 0"` (P2)

`Pricing.tsx` line 160: `style={{ padding: "120px 0" }}` — this is a hardcoded fixed padding on the FAQ section. It was not in the original audit's table (the original missed it) and the fix pass did not touch it. At 320px, 240px of vertical whitespace from padding alone on a FAQ section is very heavy.

**Fix:**
```tsx
style={{ padding: "clamp(64px, 8vw, 120px) 0" }}
```

### NEW-03 — Blog.tsx remaining fixed section paddings (P2)

Three sections in `Blog.tsx` were not updated during the fix pass:
- Line 194: `style={{ paddingBottom: "80px" }}` — featured posts section
- Line 257: `style={{ paddingBottom: "120px", borderTop: "1px solid #234966", paddingTop: "80px" }}` — all articles section
- Line 302: `style={{ background: "#050C10", padding: "80px 0", borderTop: "1px solid #234966" }}` — newsletter section

The fix-log mentions fixing Blog.tsx for GRID-02 but does not mention updating section paddings in Blog.tsx. These paddings were listed in the original audit's SECTION-PAD table as lines 209 and other lines, but the fix log only explicitly mentions Home.tsx, ForDentists.tsx, About.tsx, and BlogPost.tsx for section padding fixes.

**Fix:**
```tsx
// Line 194:
style={{ paddingBottom: "clamp(48px, 6vw, 80px)" }}

// Line 257:
style={{ paddingBottom: "clamp(64px, 8vw, 120px)", borderTop: "1px solid #234966", paddingTop: "clamp(48px, 6vw, 80px)" }}

// Line 302:
style={{ background: "#050C10", padding: "clamp(48px, 6vw, 80px) 0", borderTop: "1px solid #234966" }}
```

### NEW-04 — Pricing.tsx and Contact.tsx `padding: "80px 0"` (P2)

- `Pricing.tsx` line 113: `style={{ background: "#050C10", padding: "80px 0" }}` — beta notice + plans section
- `Contact.tsx` line 121: `style={{ background: "#050C10", padding: "80px 0" }}` — form section

Both missed by the fix pass (Contact.tsx was not in the original audit's SECTION-PAD table at all, and Pricing.tsx line 113 was not listed either).

**Fix:**
```tsx
style={{ background: "#050C10", padding: "clamp(48px, 6vw, 80px) 0" }}
```

### NEW-05 — BlogPost.tsx newsletter section `padding: "80px 0"` (P2)

`BlogPost.tsx` line 910: `style={{ background: "#050C10", padding: "80px 0", borderTop: "1px solid #234966" }}` — not in the original audit, not fixed.

**Fix:**
```tsx
style={{ background: "#050C10", padding: "clamp(48px, 6vw, 80px) 0", borderTop: "1px solid #234966" }}
```

### NEW-06 — Pricing.tsx plan cards use mixed `card` class + inline `p-6 sm:p-10` (P3)

`Pricing.tsx` line 129: `className="card reveal p-6 sm:p-10"` — the `.card` class sets `padding: 32px` in the CSS, and the Tailwind `p-6` (24px) / `p-10` (40px) override it via utility specificity. This is fragile — the intent is correct but the mechanism relies on utility classes overriding component classes. The Tailwind utilities will win here due to `@layer components` ordering, so the behavior is correct. Minor specificity concern only.

### NEW-07 — `display-lg` still has `line-height: 0.93` — tight for Features hero (P3)

`index.css` line 630: `.display-lg { line-height: 0.93; }`. The Features page `<h1>` uses `className="display-lg reveal"` with `style={{ lineHeight: 1.05 }}`. The inline style correctly overrides the 0.93 line-height. PASS for Features. However the Blog page's `<h1 className="display-lg reveal">` at line 183 does NOT have a lineHeight override, so it inherits the 0.93 line-height. At 320px with `display-lg` resolving to 44px and lineHeight 0.93, the heading "Insights on dental health, AI, and care." wraps to 3 lines with near-overlapping descent. Cosmetically tight but legible.

**Fix:**
```css
/* In index.css — loosen display-lg line-height slightly */
.display-lg { line-height: 1.0; }  /* was 0.93 */
```

Or apply `style={{ lineHeight: 1.0 }}` to the Blog page h1.

---

## Verification of Viewport Behaviour Post-Fix

### 320px (iPhone SE 1st gen)
- Navigation: Hamburger visible (`flex md:hidden`). Desktop nav hidden (`hidden md:flex`). 44px touch target. PASS.
- Hero h1: "Between visits, we take over." at clamp(52px, 7vw, 96px) → 52px. 2 lines, lineHeight 1.0. Comfortable. PASS.
- EFP badge: `flexWrap: "wrap"` present, no `whiteSpace: nowrap`. PASS.
- Hero CTAs: `flexWrap: "wrap"` — buttons wrap correctly. PASS.
- EFP Award photo: `min-h-[240px]` on mobile. PASS.
- EFP Award right panel: `p-6` on mobile = 24px padding. PASS.
- Features bento: `grid-cols-1` on mobile. PASS.
- How It Works: `grid-cols-1` on mobile, `.step-offset` suppressed by `@media (max-width: 767px)`. PASS.
- PhoneMockup: 300px max-width, 8px breathing room for side buttons. PASS.
- Stats row: `flex flex-wrap` — wraps at 320px. Acceptable.

### 375px (iPhone 6-13 standard)
- All sections scale correctly. Section paddings at `clamp()` values — noticeably less excessive than pre-fix 120px. PASS.
- ForDentists clinical cards: icon stacks above text on mobile. PASS.
- Waitlist role selector: full-width buttons stack vertically. PASS.

### 414px (iPhone XR/Plus)
- Features page grid: `grid-cols-1`. Single column. PASS.
- About team grid: `grid-cols-1`. PASS.

### 768px (iPad portrait)
- Navbar: Hamburger hidden (`md:hidden`). Desktop nav visible (`md:flex`). At exactly 768px, `md:` fires. PASS.
- Hero: `grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]` — still single column at 768px (lg is 1024px). PhoneMockup below text. Correct.
- EFP card: `md:grid-cols-2` fires at 768px — two-column layout. PASS.
- Features bento: `md:col-span-2` fires at 768px. PASS.

---

## Confirmed Passing Items (Unchanged Since Original Audit)

1. **Custom cursor touch guard** — FIXED (`pointer: coarse` check prevents RAF loop on touch devices).
2. **`display-md` floor** — FIXED (36px, was 44px).
3. **`body-lg` / `body-md` fluid** — FIXED (clamp values).
4. **`.section` / `.section-sm` classes** — Continue to use `clamp()` paddings. PASS.
5. **Container system** — 1.5rem mobile padding, max-width 1200px. PASS.
6. **Touch targets** — `.p-input` ≈52px height, `.btn-primary` ≈50px height, hamburger 44px. All pass 44px minimum.
7. **`prefers-reduced-motion`** — Comprehensive implementation unchanged. PASS.
8. **Ticker overflow** — `overflow: hidden` wrapper. PASS.
9. **CTA orbs** — `cta-bg-canvas { overflow: hidden }` load-bearing dependency maintained. PASS.
10. **Blog row hover** — `flex flex-col sm:flex-row sm:items-center` — stacks on mobile. PASS.

---

## Summary of All Remaining Issues

### P2 — Medium (suboptimal, not layout-breaking)

| ID | File | Issue | Fix |
|----|------|-------|-----|
| NEW-01 | All secondary pages | `paddingBottom: 80/100/120` on hero sections — fixed values not fluid | Replace with `clamp()` |
| NEW-02 | Pricing.tsx:160 | `padding: "120px 0"` on FAQ section — missed by fix pass | `clamp(64px, 8vw, 120px) 0` |
| NEW-03 | Blog.tsx:194,257,302 | Three fixed section paddings — missed by fix pass | `clamp()` replacements |
| NEW-04 | Pricing.tsx:113, Contact.tsx:121 | `padding: "80px 0"` — missed by fix pass | `clamp(48px, 6vw, 80px) 0` |
| NEW-05 | BlogPost.tsx:910 | `padding: "80px 0"` on newsletter section — missed by fix pass | `clamp(48px, 6vw, 80px) 0` |
| PRICING-01 | Pricing.tsx:116 | Beta notice `padding: "20px 28px"` — tight on 320px | Reduce to `padding: "16px 20px"` |

### P3 — Low / Polish

| ID | File | Issue | Fix |
|----|------|-------|-----|
| NEW-06 | Pricing.tsx:129 | `card` class + `p-6 sm:p-10` overrides — fragile specificity | Acceptable but fragile |
| NEW-07 | Blog.tsx:183, index.css | `display-lg` at `line-height: 0.93` on Blog h1 — tight at 320px | Set `line-height: 1.0` on `.display-lg` or inline on Blog h1 |
| TYPO-03 | Multiple pages | Inline `clamp()` fontSizes that bypass design system classes | Code quality only, not mobile-breaking |
| HOOK-01 | useMobile.tsx | `useIsMobile()` hook still unused — no page uses it | Remove or document |

---

## Score Breakdown

| Category | Original | After Fixes | Re-Audit Actual | Notes |
|----------|----------|-------------|-----------------|-------|
| Mobile hamburger nav | 8.5/10 | 9.5/10 | 9.5/10 | Tailwind breakpoints, 44px target, focus trap |
| Hero sections (320–768px) | 7/10 | 9/10 | 8.5/10 | H1 floor fixed; secondary page hero paddings not fluid |
| Grids — responsive stacking | 8/10 | 9.5/10 | 9.5/10 | All major grids fixed; no remaining fixed-column grids |
| Font sizes — Dongle display | 7/10 | 8.5/10 | 8.5/10 | display-md floor fixed; display-lg lineHeight slightly tight on Blog |
| Padding / spacing | 5/10 | 9/10 | 7.5/10 | Home, About, ForDentists fixed; Blog, Pricing, Contact partially missed |
| Container / touch targets | 9/10 | 9/10 | 9/10 | No regression |
| Viewport height (`svh`) | 7/10 | 9.5/10 | 9.5/10 | Zero `100vh` instances remain |
| PhoneMockup scaling | 7.5/10 | 8.5/10 | 8.5/10 | px-2 breathing room added |
| Horizontal scroll | 9/10 | 9/10 | 9/10 | No regressions introduced |
| Touch interactions | 9/10 | 9.5/10 | 9.5/10 | CustomCursor RAF guard working |
| CSS media queries vs Tailwind | 7/10 | 9.5/10 | 9.5/10 | Navbar now pure Tailwind |
| useMobile hook | 5/10 | 5/10 | 5/10 | Still unused, deferred appropriately |

**Re-audit overall score: 8.6 / 10** (original: 7.5, projected: 9.0)

---

## Quick Wins to Reach 9.0+

The six remaining P2 issues are all the same pattern — fixed pixel padding values in files not fully covered by the fix pass. A single global search-replace session of approximately 30 minutes would resolve all six and push the score to approximately 9.0–9.2:

1. `Blog.tsx` — Replace three fixed `padding` values with `clamp()` equivalents (lines 194, 257, 302).
2. `Pricing.tsx` — Replace `"80px 0"` on line 113 and `"120px 0"` on line 160; fix beta notice `"20px 28px"` on line 116.
3. `Contact.tsx` — Replace `"80px 0"` on line 121.
4. `BlogPost.tsx` — Replace `"80px 0"` on line 910.
5. All secondary page hero sections — Replace hardcoded `paddingBottom` values (not `paddingTop`, which must clear the navbar).
6. `index.css` `.display-lg` — Change `line-height: 0.93` to `line-height: 1.0` for Blog page hero legibility.

The fix-log's projection of 9.0/10 was accurate in intent but the Blog.tsx section padding fixes and Pricing.tsx/Contact.tsx fixes were not applied, causing the actual score to land slightly below projection.
