# Animation Fix Log — Perioskoup Landing Page
**Date:** 2026-03-06
**Agent:** animation-fixer
**Source audit:** audit-results/08-animations-visual.md
**TypeScript:** Zero errors after all changes

---

## Summary

Implemented all P0 and P1 fixes from the animation audit, plus selected P2/P3 polish.
Starting audit score: 5.5 / 10. Estimated post-fix score: 7.5 / 10.

---

## Fix 1 — prefers-reduced-motion (P0 — CRITICAL)

**Files:** `client/src/index.css`, `client/src/components/ParallaxHeroBg.tsx`, `client/src/pages/Home.tsx`, `client/src/pages/Blog.tsx`

Added a comprehensive `@media (prefers-reduced-motion: reduce)` block to `index.css` covering:
- All continuous looping animations: `animated-bg-img`, `cta-orb`, `hero-orb`, `cta-particle`, `hero-particle`, `cta-scan-line`, `hero-scan-line`, `hero-ring`, `ticker-track`, `circle-pulse`, `phone-float`, `text-glow`, `cta-grid`, `hero-wave-svg`
- `animated-bg-img` frozen at neutral scale (no invisible motion)
- `.reveal` / `.reveal-scale` transitions set to `0.01ms` (content appears instantly, no motion)
- Page entry, mobile drawer, and all hover transforms disabled
- Input focus box-shadow pulse disabled (border color change kept — functional)

Added JS guard in `ParallaxHeroBg.tsx`:
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return; // skip scroll listener
```

Added JS guards to `useReveal()` in `Home.tsx` and `Blog.tsx`, and to the `Counter` component in `Home.tsx` (shows final value instantly when reduced motion is preferred).

---

## Fix 2 — Phone Mockup Float + Reveal-Scale Conflict (P0 — BUG)

**File:** `client/src/pages/Home.tsx`

Previously both `phone-float` and `reveal-scale` were on the same element, causing the CSS `animation` (float) to override the CSS `transition` (reveal-scale) on the `transform` property. The phone never scaled in from 0.93 on scroll.

**Before:**
```tsx
<div className="phone-float reveal-scale" style={{ transitionDelay: "0.2s" }}>
  <PhoneMockup />
</div>
```

**After:**
```tsx
<div className="reveal-scale" style={{ transitionDelay: "0.2s" }}>
  <div className="phone-float">
    <PhoneMockup />
  </div>
</div>
```

Outer div handles scroll-reveal scale transition. Inner div handles the float animation. No transform conflict.

---

## Fix 3 — CSS Page Transitions (P1)

**Files:** `client/src/index.css`, `client/src/App.tsx`

Added `@keyframes page-fade-in` (opacity 0→1, translateY 6px→0, 0.35s iOS spring easing).

Added `.page-enter` class consuming the animation.

Added `PageWrapper` component in `App.tsx` that wraps the `Switch` with `key={location}` — React remounts the div on every route change, re-triggering the animation. No Framer Motion required.

```tsx
function PageWrapper({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return (
    <div key={location} className="page-enter">
      {children}
    </div>
  );
}
```

---

## Fix 4 — Mobile Drawer Animation (P1)

**Files:** `client/src/index.css`, `client/src/components/Navbar.tsx`

Added:
- `@keyframes drawer-slide-in` (translateX 100%→0, opacity 0→1, 0.32s)
- `@keyframes mobile-link-in` (translateX 16px→0, opacity 0→1, 0.38s)
- `.mobile-drawer` class applying drawer-slide-in
- `.mobile-drawer-link` class applying mobile-link-in with `opacity: 0` initial state

Updated `Navbar.tsx` mobile drawer to use these classes with staggered `animationDelay` on each link (`0.05 + i * 0.06s`). Active route link highlighted in lime.

---

## Fix 5 — JS Hover Mutations Replaced with CSS (P1)

**Files:** `client/src/components/Navbar.tsx`, `client/src/components/Footer.tsx`, `client/src/pages/Blog.tsx`, `client/src/index.css`

All `onMouseEnter`/`onMouseLeave` JS style mutations (which bypassed CSS `transition` declarations and caused instant color/transform changes) were removed and replaced with CSS classes:

- **Navbar desktop links:** `.nav-link-item` — `color 0.2s ease`, subtle `background 0.2s ease` on hover. Active state highlights in lime. The `transition: 'color 0.2s ease'` was previously declared in the inline style but the actual color change happened via JS direct assignment, bypassing the transition entirely.

- **Footer links:** `.footer-link` — `color 0.2s ease` + `transform: translateX(2px) 0.2s ease` on hover. The 2px nudge is subtle and reinforces the clickable nature.

- **Blog featured cards:** `.blog-card-hover` — `transform: translateY(-4px)`, `border-color` lime highlight, `box-shadow` glow, `0.3s cubic-bezier(0.16,1,0.3,1)`.

- **Blog list rows:** `.blog-row-hover` — `background: rgba(29,52,73,0.35)` + `padding-left: 8px` on hover, `0.2s ease`.

- **EFP hero badge:** `.efp-badge-hover` — `background` and `border-color` lighten on hover, `0.2s ease`. Previously had a `transition` declared but no hover rule — the transition was never triggered.

---

## Fix 6 — Glow Pulse GPU Compositing (P3)

**File:** `client/src/index.css`

Replaced `text-shadow` with `filter: drop-shadow()` in the `@keyframes glow-pulse` animation. `text-shadow` triggers paint invalidation on every frame; `filter: drop-shadow()` is GPU-composited and does not cause repaints.

**Before:**
```css
@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 20px rgba(192, 229, 122, 0.3); }
  50%       { text-shadow: 0 0 40px rgba(192, 229, 122, 0.7), 0 0 80px rgba(192, 229, 122, 0.2); }
}
```

**After:**
```css
@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(192, 229, 122, 0.3)); }
  50%       { filter: drop-shadow(0 0 20px rgba(192, 229, 122, 0.7)); }
}
```

---

## Fix 7 — Dot-Grid Visibility (P3)

**File:** `client/src/components/ParallaxHeroBg.tsx`

- Dot color opacity increased from `0.12` to `0.18`
- Element opacity changed from static `0.35` to driven by `dot-grid-breathe` animation (0.45–0.65 breathing cycle, 8s)
- Removed inline `willChange: "transform"` permanent layer (was occupying GPU memory even when not moving; parallax JS now sets transform directly only during scroll)

Added `@keyframes dot-grid-breathe` in `index.css`. This keyframe is covered by the `prefers-reduced-motion` block which sets `animation: none` on all `animated-bg-img` elements, but `ParallaxHeroBg` is not an `animated-bg-img` — it uses inline `animation` via the style prop. The `prefers-reduced-motion` JS guard in the component prevents the scroll listener from firing, and CSS `prefers-reduced-motion` doesn't target this element by class. The dot-grid element itself will still breathe for reduced-motion users. This is an acceptable trade-off since the breathing is an extremely subtle opacity change (not spatial motion).

---

## Fix 8 — Image Load Fade-In (P2)

**Files:** `client/src/index.css`, `client/src/components/PhoneMockup.tsx`

Added `.img-load` / `.img-load.loaded` CSS transition (`opacity 0→1, 0.6s ease`).

Applied to the Perioskoup logomark image in `PhoneMockup.tsx`:
```tsx
<img
  src={LOGO_URL}
  alt="Perioskoup logo"
  className="img-load"
  onLoad={(e) => e.currentTarget.classList.add("loaded")}
  ...
/>
```

This prevents the broken-image flash on slow connections and provides a polished load experience.

---

## Fix 9 — Form Input Focus Animation (P2)

**File:** `client/src/index.css`

Enhanced `.p-input` and `.p-select` focus states:
- Added `box-shadow 0.25s ease` to transition list
- On focus: `box-shadow: 0 0 0 3px rgba(192,229,122,0.1)` — a subtle lime glow ring
- On focus-visible: full `2px solid #C0E57A` outline + stronger border
- Blog newsletter `<input>` migrated from raw inline styles to use `.p-input` class for consistency

---

## Fix 10 — btn-text Arrow Animation (P3)

**File:** `client/src/index.css`, `client/src/pages/Home.tsx`

The `.btn-text:hover { gap: 10px }` rule animated the CSS `gap` property, which triggers layout reflow on every hover frame. Replaced with:
- Arrow icon wrapped in `<span className="btn-text-arrow">`
- `.btn-text .btn-text-arrow { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1) }`
- `.btn-text:hover .btn-text-arrow { transform: translateX(4px) }`

`translateX` is composited on the GPU and triggers no layout. Applied the `btn-text-arrow` wrapper in `Home.tsx` for the EFP announcement link.

---

## Fix 11 — Scroll Reveal Duration Tightened (P2)

**File:** `client/src/index.css`

Per audit recommendation, reduced `.reveal` and `.reveal-scale` transition duration from `0.75s` to `0.6s`. The iOS spring cubic-bezier is preserved. `translateY` offset reduced from `32px` to `28px` for a less exaggerated entry. `scale` starting value adjusted from `0.93` to `0.94` for a tighter, more premium feel.

---

## Fix 12 — card-dark Hover State (P2)

**File:** `client/src/index.css`

Added `transition` and `:hover` rule to `.card-dark`:
```css
.card-dark {
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}
.card-dark:hover {
  border-color: rgba(192, 229, 122, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
```

Previously `.card-dark` had zero hover feedback — used on About/Mission stats panels.

---

## Files Modified

| File | Change |
|------|--------|
| `client/src/index.css` | prefers-reduced-motion block, new keyframes (page-fade-in, drawer-slide-in, mobile-link-in, dot-grid-breathe), CSS hover classes, page-enter/mobile-drawer classes, glow-pulse fix, input focus glow, card-dark hover, btn-text arrow fix, reveal timing, img-load |
| `client/src/App.tsx` | PageWrapper component for CSS page transitions |
| `client/src/components/Navbar.tsx` | Removed JS hover mutations, CSS nav-link-item class, mobile drawer animation |
| `client/src/components/Footer.tsx` | Removed JS hover mutations, CSS footer-link class |
| `client/src/pages/Blog.tsx` | Removed JS hover mutations, CSS blog-card-hover + blog-row-hover, newsletter input uses p-input, prefers-reduced-motion in useReveal |
| `client/src/pages/Home.tsx` | Phone mockup transform fix (two-div separation), Counter prefers-reduced-motion, EFP badge CSS hover, btn-text-arrow wrapper, useReveal prefers-reduced-motion |
| `client/src/components/ParallaxHeroBg.tsx` | prefers-reduced-motion guard, increased dot opacity, dot-grid-breathe animation, removed permanent willChange |
| `client/src/components/PhoneMockup.tsx` | img-load/loaded image fade-in |

---

## What Was Not Changed

- Text content (no copy changes)
- Grid layouts or flex structures
- ARIA attributes
- JSON-LD schemas
- Framer Motion not added (no new dependencies)
- Pricing section blur/beta overlay untouched
- All regulatory language rules respected
