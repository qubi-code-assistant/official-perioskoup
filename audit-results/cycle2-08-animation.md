# Animation & Visual Polish — Cycle 2 Fresh Audit
**Audit Date:** 2026-03-06
**Auditor:** Animation & Visual Polish Specialist (Claude Sonnet 4.6)
**Cycle:** Third independent read of the source — fresh eyes, no assumption that prior claimed fixes were applied
**Previous scores:** 5.5 / 10 (initial) → 7.2 / 10 (re-audit) → 7.4 / 10 (pass 2 re-audit)
**Score: 7.4 / 10**

---

## Audit Method

Every finding below is derived from reading the current source files directly:

- `/client/src/index.css` (1198 lines, read in full)
- `/client/src/components/ParallaxHeroBg.tsx`
- `/client/src/components/CustomCursor.tsx`
- `/client/src/components/PhoneMockup.tsx`
- `/client/src/components/HeroGlow.tsx`
- `/client/src/components/Navbar.tsx`
- `/client/src/components/Breadcrumb.tsx`
- `/client/src/hooks/useReveal.ts`
- `/client/src/App.tsx`
- `/client/src/pages/Home.tsx`
- `/client/src/pages/Waitlist.tsx`
- `/client/src/pages/Contact.tsx`
- `/client/src/pages/About.tsx`
- `/client/src/pages/Features.tsx`

---

## 1. Animation Quality

### Confirmed Working — No Regression

**Ken Burns hero background (`hero-lcp-img.ken-burns`).**
`@keyframes ken-burns` runs at 24s ease-in-out infinite, progressing through four waypoints of scale(1.0)→scale(1.1)→scale(1.0) with a two-axis translate path (-2%, -1% mid-point). Architecture is correct: the image is a real `<img>` element with `fetchPriority="high"`, outside any overflow clip, so the LCP candidate is not obscured. The Ken Burns overlay gradient layers (`linear-gradient(105deg, rgba(10,23,30,0.88)...)`) are correctly z-indexed above the image but below the content. Duration and displacement are restrained enough to feel atmospheric rather than distracting.

**CTA animated canvas (five orbs + grid + particles + scan line).**
Orb durations: 18s, 22s, 15s, 25s, 20s (staggered to prevent synchronisation). All use `filter: blur(80px)` — compositor-accelerated. `will-change` is intentionally omitted from `.cta-orb` with an explanatory comment documenting the deliberate choice. The grid pulsing at `grid-pulse 8s ease-in-out infinite` cycles opacity 0.03→0.08 — barely perceptible, correctly calibrated. The scan line (`.cta-scan-line`) uses `translateY` via keyframes, not `top`, which is GPU-composited. The `will-change: transform, opacity` on `.cta-scan-line` (line 470) is justified for a 1px element making full-width sweeps. Overall this is the strongest animated section on the site.

**Page transitions (`PageWrapper` / `.page-enter`).**
`App.tsx` wraps all routes in `<PageWrapper key={location}>`. The `key` prop causes React to remount on every route change, re-triggering the `page-fade-in` keyframe. The animation is `0.35s cubic-bezier(0.16, 1, 0.3, 1)` (iOS spring easing) — fast enough to feel crisp. Suspense fallback is `<div className="min-h-screen bg-[#0A171E]" />` — a flat navy screen with no structure. This provides colour continuity but no shape continuity.

**Mobile drawer animation.**
`drawer-slide-in` at `0.32s cubic-bezier(0.16, 1, 0.3, 1)`. Staggered link reveals via `.mobile-drawer-link` with `animationDelay: 0.05 + i * 0.06s` applied correctly in the loop. The drawer is conditionally rendered (`{menuOpen && ...}`), meaning it has no exit animation — the drawer disappears instantly when closed via a route change or the close button. On route change the drawer disappears before the `page-enter` animation, causing a compound flash: drawer vanishes, then old page vanishes, then new page fades in.

**Custom cursor (desktop only).**
Correct lerp at 0.12 factor. RAF loop with `MutationObserver` re-attachment for dynamically added interactive elements. Correctly disabled at `pointer: coarse` (touch devices). Expands 32→52px on hover with `0.3s cubic-bezier(0.16, 1, 0.3, 1)` CSS transition on the ring element. The dot follows instantly via direct style assignment each RAF tick. This is technically sound. One observation: the `#cursor-dot` and `#cursor-ring` CSS uses `left`/`top` (set via JS style assignment) which triggers paint positioning — the alternative is `translate3d` which would promote to a separate layer. Since these are written every RAF frame, using `transform: translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)` would be more compositor-friendly than `left`/`top`. Current implementation is industry-standard for custom cursors and unlikely to cause jank on modern hardware, but this is a marginal improvement opportunity.

**Scroll reveal system.**
`useReveal.ts` uses a single IntersectionObserver at `threshold: 0.1` (overridable; Home passes `0.12`). `io.unobserve(e.target)` fires correctly after reveal — no repeated observation. `prefers-reduced-motion` guard immediately applies `visible` to all elements before the observer is created. The structural weakness previously identified remains: the observer is applied to all `.reveal` and `.reveal-scale` elements simultaneously, meaning all elements within a section that exceed the viewport height will transition using only their `transitionDelay` inline values rather than true per-element viewport entry. The visual result on a typical scroll speed is that all cards in the bento grid reveal simultaneously with no perceptible stagger.

**Phone mockup float.**
The transform conflict fix is confirmed present: `reveal-scale` is on the outer wrapper div (`Home.tsx` line 154), `phone-float` is on the inner wrapper div (line 155). The `float` keyframe runs at 5.5s ease-in-out infinite with 16px vertical travel and constant `rotate(3deg)`. The PhoneMockup component applies `drop-shadow(0 40px 80px rgba(0,0,0,0.55)) drop-shadow(0 0 60px rgba(192,229,122,0.1))` — the second shadow creates a subtle lime ambient beneath the device, tying it to the brand.

**Ticker / marquee.**
`ticker 36s linear infinite` on `.ticker-track`. `animation-play-state: paused` on `:hover`. Lime background strip with uppercase Gabarito — creates a strong visual break between hero and content.

**Button micro-interactions.**
- `.btn-primary:hover`: `translateY(-2px)` + `box-shadow: 0 12px 32px rgba(192,229,122,0.4)` + lighter background. Transition is `background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease` — explicit properties, no `transition: all`.
- `.btn-ghost:hover`: `border-color` + `color` + `background`. Transition: `border-color 0.2s ease, color 0.2s ease, background 0.2s ease`.
- `.btn-text .btn-text-arrow`: `translateX(4px)` on hover at `0.2s cubic-bezier(0.16, 1, 0.3, 1)`.
- All three variants consistent, GPU-composited, no layout thrash.

**`.btn-primary:active`** resets `transform: translateY(0)` — good press feedback.

### Structural Weaknesses (Unchanged from Previous Cycles)

**Hero headline has no entrance animation.**
The `#main-content .reveal, #main-content .reveal-scale { opacity: 1; transform: none; transition: none; }` override at lines 1193-1198 of index.css forces all elements inside the hero section to appear at full opacity instantly. This is architecturally correct for LCP (the hero `<h1>` with `className="reveal visible"` is an LCP candidate on many viewport sizes). However, using CSS `animation` instead of CSS `transition` on the headline would bypass this override entirely: the LCP override targets `transition` via the `.reveal` class mechanics, but inline `@keyframes animation` is independent of the transition pipeline. The fix has been documented in both previous audits but has not been implemented.

**No exit animations.**
Once `.visible` is applied and the observer disconnects, there is no reverse reveal on scroll-up. Scroll-up shows already-revealed content correctly, but the discovery experience is one-directional.

**No stagger per individual element within a section.**
The IntersectionObserver threshold fires on the section container, not on each child. For the features bento grid and the how-it-works steps, all cards enter the `.visible` state at approximately the same time, with stagger existing only in their `transitionDelay` values. At fast scroll speeds this means simultaneous reveals.

---

## 2. Jank and Layout Shift Risks

**No CLS identified.**
Fonts use `font-display: swap` with correct `unicode-range` partitioning for Latin and Latin-extended subsets. All images have explicit `width`/`height` attributes. The hero image is `fetchPriority="high"` with explicit `width={1280} height={714}`. No elements shift on load.

**Scroll handler performance.**
`ParallaxHeroBg.tsx`: reads `window.scrollY` (no forced reflow), applies `translate3d(0, offset, 0)` via `bgRef.current.style.transform`. RAF ticking with `ticking` boolean prevents double-firing. `{ passive: true }` prevents scroll blocking. Correct implementation.

**Permanent `willChange: "transform"` in `ParallaxHeroBg.tsx` (line 45).**
This is a live discrepancy: the Pass 1 fix log claimed removal, but `willChange: "transform"` is still present at line 45 of the current source. The element is the dot-grid parallax background. The `will-change` is partially justified — the scroll handler actively writes `transform` to this element during scroll, so the compositor layer is not entirely wasted. However, the layer persists for the full page session even when the user is not scrolling. The total GPU cost is one layer for one element — minor on desktop, ~5MB on mid-range Android. The correct pattern is to apply `will-change` only during active scroll via a class toggle (add on first `scroll` event, remove via `setTimeout` after scroll stops), but this is a low-priority optimisation that does not affect the user-visible experience.

**CTA scan line and pulse-ring `will-change` is justified and documented.**
`.cta-scan-line { will-change: transform, opacity; }` and `.circle-pulse::after { will-change: transform, opacity; }` — both are 1px or small elements making large, rapid spatial changes where the compositor hint genuinely reduces per-frame CPU compositing work. Unlike the CTA orbs (now correctly without `will-change`), these elements move visibly at meaningful speeds where the hint matters.

**Navbar scroll state transition.**
The navbar uses `transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease'` on the inline style object. `backdrop-filter` transitions can be expensive on older hardware because the backdrop must be recaptured for each frame during the animation. On modern hardware this is imperceptible. The 0.4s duration is slightly long for a utility transition — 0.25s would feel snappier and reduce the duration of the expensive backdrop recapture. Minor.

---

## 3. Hover State Consistency

**Verified CSS-driven across all major interactive elements:**
- Desktop nav links: `.nav-link-item` with `transition: color 0.2s ease, background 0.2s ease`
- Footer links: `.footer-link` with `color 0.2s ease, transform 0.2s ease` (2px X nudge)
- Blog cards: `.blog-card-hover` with `transform 0.3s`, `border-color 0.3s`, `box-shadow 0.3s`
- Blog rows: `.blog-row-hover` with `background 0.2s ease, padding-left 0.2s ease`
- EFP badge: `.efp-badge-hover` with `background 0.2s ease, border-color 0.2s ease`
- Breadcrumb links: `.breadcrumb-link` with `color 0.2s ease` — JS mutation now gone, CSS-driven
- Cards: `.card:hover` — `translateY(-3px)` + lime border + shadow, all via CSS
- Card-dark: `.card-dark:hover` — `border-color`, `box-shadow` transitions
- Waitlist role selector: `transition: "border-color 0.2s ease, background 0.2s ease, color 0.2s ease"` (pass 2 fix confirmed applied)

**Remaining gap — LinkedIn links on About team cards (unchanged from previous audit).**
`About.tsx` line 282: the LinkedIn anchor has `style={{ color: "#8C9C8C", textDecoration: "none" }}` with no hover transition and no CSS class. The link is visually identical in hover and default states. No `.linkedin-link` class exists in `index.css`. This is the only interactive element on the site without a hover transition. The gap is small — the link is small, below-the-fold, and rarely primary click target — but it violates the site-wide pattern. Three lines of CSS would close it.

**No other JS hover mutations found in the codebase.**
The codebase is now fully CSS-driven for hover states except for this one remaining anchor element.

---

## 4. Dot-Grid Hero Background

**Current state:**
- Opacity breathes at 0.45→0.65 via `dot-grid-breathe 8s ease-in-out infinite`
- Dot colour: `rgba(192,229,122,0.18)` — visible on most displays
- Parallax rate: 0.15× scroll — subtle, not distracting
- `dot-grid-bg` class is present on the element (line 37 of `ParallaxHeroBg.tsx`): `className="pointer-events-none dot-grid-bg"`
- `prefers-reduced-motion` CSS block targets `.dot-grid-bg` (index.css line 1129) — WCAG coverage confirmed

**Assessment.**
The dot grid is now correctly integrated into the reduced-motion system. The breathing animation is an opacity-only effect — it does not move spatially — so it does not cause vestibular distress even if the reduced-motion guard were missing. The parallax (spatial motion) is correctly guarded by the JS check.

**Remaining quality gap vs Awwwards.**
Award-winning sites at SOTD level typically use dot or particle grids that respond to cursor position (5-15% parallax from mouse coordinates). The current implementation only responds to scroll. On desktop, where the primary interaction mode is mouse movement, the dot grid is passive — it changes only when the user scrolls, not when they move the mouse across the hero. Mouse-position parallax would make the hero feel interactive and three-dimensional without any additional visual assets. This has been flagged in both previous audits and remains unimplemented.

---

## 5. Page Transitions

**Status: Functional, clean, correct.**

`PageWrapper` remounts with `key={location}`, re-triggering `page-fade-in` at `0.35s cubic-bezier(0.16, 1, 0.3, 1)`. `ScrollToTop` uses `behavior: "instant"` to prevent scroll position bleeding across routes before the fade begins. `RouteAnnouncer` announces route changes to screen readers.

**What this achieves:** New page content fades in from opacity 0 and translateY(6px). The transition is fast, crisp, and uses a spring easing that feels native.

**What is still missing:**
The old page disappears instantly before the new page fades in. The transition is an enter-only effect. At the cut-boundary (between old content disappearing and new content beginning its fade) there is a single frame where the background colour (`#0A171E`) is visible with no content. At 60fps this is one frame at ~17ms — unlikely to register as a flash on modern hardware, but it does create a subtle "pop" that would not exist with a true crossfade. A crossfade requires holding the old content in the DOM while the new content fades in, which requires Framer Motion's `AnimatePresence` or a more complex approach.

**Verdict:** The current implementation is correct and clean for a zero-dependency CSS approach. The quality gap to SOTD-level page transitions is real but not blocking.

---

## 6. `prefers-reduced-motion` Coverage

**CSS coverage (index.css lines 1106-1178) — confirmed complete:**
All continuous looping animations are halted:
- `.animated-bg-img`, `.cta-orb`, `.hero-orb` (1/2/3), `.cta-particle`, `.hero-particle`, `.cta-scan-line`, `.hero-scan-line`, `.hero-ring` (1/2), `.ticker-track`, `.circle-pulse::after`, `.phone-float`, `.text-glow`, `.cta-grid`, `.hero-wave-svg` (1/2), `.dot-grid-bg`, `.hero-lcp-img` — all set to `animation: none !important`
- `.reveal`, `.reveal-scale`: `opacity: 1 !important; transform: none !important; transition: none !important;`
- `.page-enter`, `.mobile-drawer`, `.mobile-drawer-link`: animations removed
- All hover transforms disabled for the major interactive element categories

**JS coverage — confirmed in `useReveal.ts`:**
All page-level `useReveal()` calls check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and immediately mark all elements visible, bypassing the IntersectionObserver entirely. `ParallaxHeroBg.tsx` skips the scroll listener for reduced-motion users.

**Coverage assessment: 9.5/10.**
No uncovered animations found. The previous gap (dot-grid-breathe not in the reduced-motion CSS block) has been closed with the `.dot-grid-bg` class addition. The only theoretical gap is the permanent `willChange: "transform"` on `ParallaxHeroBg` — this is not an animation, so it is not affected by the reduced-motion media query. It is a compositor hint, not an animation trigger.

---

## 7. Micro-Interactions

**Forms — correct, not premium.**
`.p-input:focus`: `border-color: rgba(192,229,122,0.55)` + `box-shadow: 0 0 0 3px rgba(192,229,122,0.1)` at `0.25s ease`. Correct lime glow ring. `.p-select:focus`: identical. No floating label animation — the label pattern used here is `sr-only` labels with visible placeholders, which is accessible and fast but lacks the choreography of a premium product form.

**Waitlist success state — dead animation.**
`Waitlist.tsx` line 81: `<div className="reveal-scale"`. This is inside `<section id="main-content">`, so the CSS rule at lines 1193-1197 (`#main-content .reveal-scale { opacity: 1; transform: none; transition: none }`) permanently suppresses the `reveal-scale` transition. The success confirmation appears instantly with no entry animation. This was identified in the re-audit (`re-08-animations-visual.md` Issue 2) and remains unfixed. The fix is to replace `className="reveal-scale"` with a dedicated `className="success-reveal"` backed by a CSS `@keyframes` animation (not a transition) that is immune to the LCP override.

**Contact success state — no animation class at all.**
`Contact.tsx` line 147: `<div role="status" aria-live="polite" aria-atomic="true" style={{ textAlign: "center", padding: "40px 0" }}>` — no entry animation class. When the contact form submits, the success content appears instantly. Same root cause as Waitlist: the success div is conditionally rendered, appears after form submission, and is not an LCP candidate — so there is no reason not to animate it.

**Cards.**
`.card:hover`: `translateY(-3px)` + lime border tint + shadow. Well-calibrated lift that communicates interactivity without being excessive. `.card-dark:hover`: `border-color` + shadow (no translateY — appropriate for darker, heavier cards).

**Team card image scale on hover — not implemented.**
`About.tsx` line 273: `<div className="h-48 sm:h-56 lg:h-[280px] overflow-hidden relative">` contains the headshot `<img>`. The card lifts on hover via `.card:hover { transform: translateY(-3px) }`, but the image inside does not scale within the `overflow-hidden` clip. Award-winning team sections (Tend, Parsley Health) apply `transform: scale(1.04)` to the inner image on card hover for a parallax-within-card effect. This has been documented in both previous audits as P3 unimplemented.

**`.label-tag::before` dot — static.**
The 6×6px lime dot (`::before` pseudo-element) never pulses or breathes. Adding a `2s ease-in-out infinite` scale pulse on the dot would elevate these section markers. Low effort, medium visual impact.

**PhoneMockup screen buttons — purely decorative.**
The Patient and Dentist role buttons inside the phone screen have no hover state or press feedback. They are `<div>` elements. On a product demo mockup, a visual press effect (even just opacity change) would reinforce the illusion of a live app.

**How It Works circle pulse rings.**
`.circle-pulse::after` runs `pulse-ring 3.5s ease-in-out infinite` with three steps having delays 0s, 0.8s, 1.6s. Scale 0→1, opacity 0.5→0. GPU-composited. Correctly staggered. Well implemented.

---

## 8. Loading States

**Current state — still inadequate for images (no change from previous audits).**

What exists:
- `img-load` / `img-load.loaded` pattern: `opacity 0 → 1` at `0.6s ease` on load. Applied only to the PhoneMockup logo image (`PhoneMockup.tsx` line 147-148).
- `Skeleton` component exists at `/client/src/components/ui/skeleton.tsx` — still completely unused.
- Suspense fallback: `<div className="min-h-screen bg-[#0A171E]" />` — a blank navy rectangle.

What is missing:
- Hero background image (`hero-bg.webp`): no fade-in. On slow connections, the Ken Burns animation plays on the raw `#0A171E` background. An `onLoad` callback on the `.hero-lcp-img` element could apply a class that triggers the fade-in. This is safe for LCP because LCP measures element paint, not opacity.
- Team headshots on About page: all use `loading="lazy"` correctly but have no opacity-fade-in on load.
- Award photo, features background: no load states.
- Lazy-loaded route chunks (Features, ForDentists, etc.): Suspense fallback is a blank navy div. A structured skeleton matching the page layout would prevent layout jank during chunk loading.

This remains the weakest category in the animation system. Loading states are the most visible gap between this site and Awwwards-tier health sites.

---

## 9. Phone Mockup Animation

**Float quality: correct.**
The transform conflict fix is confirmed applied (outer `reveal-scale`, inner `phone-float`). The float is 5.5s ease-in-out infinite, 16px vertical travel, constant `rotate(3deg)`. The constant rotation is a deliberate choice that gives the phone personality against the orthogonal grid.

**Drop shadow:**
`drop-shadow(0 40px 80px rgba(0,0,0,0.55)) drop-shadow(0 0 60px rgba(192,229,122,0.1))` — the second shadow creates a lime ambient glow that ties the phone to the brand accent. Well-judged.

**What is missing (unchanged):**
- No mouse-position parallax. The phone does not respond to cursor position. This was flagged as P3 in both previous audits and remains the single highest-impact animation improvement available. See code specification in Fix C below.
- Screen content is entirely static. The role-selection UI inside the phone has no animations. The Dynamic Island is a static black pill. Adding one animated element to the screen (a typing indicator, a subtle notification appearing, or the logo fading in after a 1s delay) would significantly increase the sense of a live product.
- The time updates every 30 seconds via `setInterval` — a small live detail that is already present.

---

## 10. Awwwards Dental/Health Site Comparison

Reference sites: Tend.com, Carbon Health, Parsley Health, Hims/Hers, Calm, Headspace.

| Criterion | Perioskoup (current) | Awwwards SOTD Tier |
|-----------|----------------------|--------------------|
| Scroll reveal quality | Fade-up at 0.6s iOS spring, clean | SOTD: character-level SplitType reveals, scrubbed parallax |
| Hero animation | Ken Burns + dot grid + HeroGlow | Comparable — some SOTD use static hero with exceptional type |
| Page transitions | 0.35s fade-up CSS, no exit | SOTD: bidirectional crossfade or overlay wipe |
| Custom cursor | Lerp ring, hover expansion — competent | SOTD: context-aware cursor with section label on card hover |
| Typography animation | None — hero text pops in instantly | SOTD: word/char stagger on hero headlines |
| Loading sequence | Blank navy fallback + logo fade-in on phone only | SOTD: branded skeleton or staggered initial reveal |
| Mobile menu | Slide-in + staggered links | On par with premium health sites |
| Reduced motion | Comprehensive CSS + JS — 9.5/10 | Required for SOTD consideration |
| Texture/depth | Noise overlay at 0.02 opacity | SOTD sites typically 0.04-0.06 |
| Micro-interaction density | Moderate — buttons/cards good, forms thin | SOTD: nearly every interactive element responds |
| 3D / WebGL | None | Not required; Linear/Vercel win without it |
| Success state animation | Broken by LCP override | SOTD: animated confirmation moments |
| Team card image scale | Not implemented | Standard on Awwwards health sites |

Awwwards Design estimate: **7.0**
Awwwards Creativity estimate: **6.0** (no signature moment — nothing that makes a user pause and notice)
Awwwards Usability estimate: **8.0** (accessibility, reduced motion, mobile drawer — all solid)

---

## Remaining Issues — Priority Matrix

| Issue | Severity | Effort | Priority | Status |
|-------|----------|--------|----------|--------|
| Waitlist/Contact success states broken by LCP override | Medium | Low | P2 | Unimplemented — 2nd cycle |
| Hero headline has no entrance animation | Medium | Low | P2 | Unimplemented — 2nd cycle |
| No image load states (hero bg, team photos, award) | Medium | Low | P2 | Unimplemented — 3rd cycle |
| Suspense fallback is blank navy | Medium | Low | P2 | Unimplemented — 3rd cycle |
| LinkedIn links on About team cards — no hover transition | Low | Trivial | P3 | Unimplemented — 2nd cycle |
| ParallaxHeroBg `willChange: "transform"` still present (fix log discrepancy) | Low | Trivial | P3 | Unimplemented discrepancy |
| Team card image scale on hover | Low | Low | P3 | Unimplemented — 2nd cycle |
| Mouse parallax on phone mockup | Medium | Medium | P3 | Unimplemented — 2nd cycle |
| `.label-tag::before` dot — static, no pulse | Low | Trivial | P3 | New observation |
| Mobile drawer — no exit animation (instant disappear on close) | Low | Low | P3 | New observation |
| Stagger reveal per-element (not per-section) | Low | Medium | P3 | Unimplemented — 3rd cycle |
| Custom cursor: `left`/`top` vs `transform: translate3d` | Low | Low | P4 | New observation |
| Noise overlay at 0.02 opacity (barely perceptible) | Low | Trivial | P4 | Unimplemented — 3rd cycle |
| No exit/reverse animations on scroll-up | Low | High | P4 | Unimplemented — 3rd cycle |
| Phone screen content entirely static | Low | High | P4 | Unimplemented — 3rd cycle |

---

## Specific Code Fixes for All Remaining Issues

### Fix 1 — Success State Animation (P2, highest return per line of code)

The root problem: the CSS rule `#main-content .reveal-scale { opacity: 1; transform: none; transition: none }` (index.css lines 1193-1197) permanently suppresses `reveal-scale` inside `#main-content`. The success state divs are inside `#main-content` on both Waitlist and Contact pages. Because these divs are conditionally rendered (they only appear after form submission), they are never LCP candidates and do not need the override. The override is a broad catch-all that should be narrowed.

**`client/src/index.css` — add after the existing `#main-content` override block:**

```css
/* success-reveal: CSS animation (not transition), so it bypasses the LCP
   override above which targets .reveal/.reveal-scale transition mechanics.
   Use only on elements that are conditionally rendered after user interaction. */
@keyframes success-scale-in {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
.success-reveal {
  animation: success-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@media (prefers-reduced-motion: reduce) {
  .success-reveal {
    animation: none !important;
    opacity: 1 !important;
  }
}
```

**`client/src/pages/Waitlist.tsx` line 81 — replace `className`:**

```tsx
// Before:
<div role="status" aria-live="polite" aria-atomic="true" className="reveal-scale" style={{ textAlign: "center", padding: "60px 0" }}>

// After:
<div role="status" aria-live="polite" aria-atomic="true" className="success-reveal" style={{ textAlign: "center", padding: "60px 0" }}>
```

**`client/src/pages/Contact.tsx` line 147 — add `className`:**

```tsx
// Before:
<div role="status" aria-live="polite" aria-atomic="true" style={{ textAlign: "center", padding: "40px 0" }}>

// After:
<div role="status" aria-live="polite" aria-atomic="true" className="success-reveal" style={{ textAlign: "center", padding: "40px 0" }}>
```

---

### Fix 2 — Hero Headline Entrance Animation (P2, first-impression quality)

The LCP override (`#main-content .reveal, .reveal-scale { transition: none }`) blocks CSS transitions but not CSS `animation` keyframes. Adding dedicated `animation` classes to the hero headline, subhead, and CTA bypasses the override.

**`client/src/index.css` — add before the closing `}`  of the `@layer components` block:**

```css
/* Hero entrance animation — uses @keyframes animation (not transition)
   so it is immune to the #main-content LCP override which only blocks
   CSS transitions on .reveal and .reveal-scale. */
@keyframes hero-headline-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-headline-animate {
  animation: hero-headline-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
.hero-subhead-animate {
  animation: hero-headline-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
}
.hero-cta-animate {
  animation: hero-headline-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.44s both;
}
.hero-badge-animate {
  animation: hero-headline-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0s both;
}
@media (prefers-reduced-motion: reduce) {
  .hero-headline-animate,
  .hero-subhead-animate,
  .hero-cta-animate,
  .hero-badge-animate {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

**`client/src/pages/Home.tsx` — update hero text elements:**

```tsx
// EFP badge wrapper div (line 84):
// Before: className="reveal"
// After:  className="hero-badge-animate"

// h1 headline (line 95):
// Before: className="reveal visible"
// After:  className="hero-headline-animate"
// Remove the transitionDelay style (no longer needed)

// Product subhead <p> (line 101):
// Before: className="reveal body-lg"
// After:  className="hero-subhead-animate body-lg"
// Remove transitionDelay style

// Dr. Anca blockquote (line 106):
// Before: className="reveal"
// After:  className="hero-subhead-animate"

// CTA row div (line 116):
// Before: className="reveal"
// After:  className="hero-cta-animate"
// Remove transitionDelay style
```

The stats row (line 132) and social proof text (line 127) can remain as `.reveal` since they are below-the-fold on most devices and the IntersectionObserver will handle them correctly.

---

### Fix 3 — LinkedIn Hover Transition (P3, hover consistency)

**`client/src/index.css` — add to the HOVER STATE CSS CLASSES section:**

```css
/* LinkedIn links on About team cards — closes the last hover consistency gap */
.linkedin-link {
  color: #8C9C8C;
  text-decoration: none;
  transition: color 0.2s ease;
}
.linkedin-link:hover {
  color: #C0E57A;
}
```

**`client/src/pages/About.tsx` line 282 — add `className`, remove inline `color`:**

```tsx
// Before:
<a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${f.name} on LinkedIn`}
   style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Gabarito, sans-serif", fontSize: 12, color: "#8C9C8C", textDecoration: "none" }}>

// After:
<a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${f.name} on LinkedIn`}
   className="linkedin-link"
   style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Gabarito, sans-serif", fontSize: 12 }}>
```

---

### Fix 4 — Team Card Image Scale on Hover (P3, Awwwards standard)

**`client/src/index.css` — add to the HOVER STATE CSS CLASSES section:**

```css
/* Team card image scale within overflow-hidden clip on hover
   — creates a parallax-within-card effect, standard on health sites */
.team-card-img-wrap {
  overflow: hidden;
}
.team-card-img-wrap img {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.card:hover .team-card-img-wrap img {
  transform: scale(1.04);
}
@media (prefers-reduced-motion: reduce) {
  .card:hover .team-card-img-wrap img {
    transform: none !important;
  }
}
```

**`client/src/pages/About.tsx` line 273 — add className:**

```tsx
// Before:
<div className="h-48 sm:h-56 lg:h-[280px] overflow-hidden relative">

// After:
<div className="team-card-img-wrap h-48 sm:h-56 lg:h-[280px] relative">
```

Note: remove `overflow-hidden` from the Tailwind class — it is now handled by `.team-card-img-wrap { overflow: hidden }`.

---

### Fix 5 — Mouse Parallax on Phone Mockup (P3, signature moment)

This is the single change with the highest perceived quality return. The phone is the hero's most prominent visual element. Responding to cursor position at 3-8 degrees would make the hero feel immediately premium.

**`client/src/pages/Home.tsx` — add a new component above the `Home` function:**

```tsx
import { useRef, useEffect } from "react";

/**
 * Applies a gentle 3D tilt to its children based on mouse position.
 * Uses RAF with lerp for smooth tracking. Respects prefers-reduced-motion.
 * Composites with the existing phone-float animation correctly because
 * perspective/rotateX/rotateY compose additively with the float keyframe's
 * translateY and rotate(3deg).
 */
function PhoneParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    let rafId: number;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      // Normalize cursor position to -1..1 relative to viewport centre
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 7;   // max 7deg rotateY
      targetY = ((e.clientY - cy) / cy) * -4;   // max 4deg rotateX
    };

    const animate = () => {
      // Exponential lerp — smooth trailing
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      el.style.transform =
        `perspective(1200px) rotateY(${currentX}deg) rotateX(${currentY}deg)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
```

**`client/src/pages/Home.tsx` — update the phone section (around line 152-159):**

```tsx
// Before:
<div className="reveal-scale" style={{ transitionDelay: "0.2s" }}>
  <div className="phone-float">
    <PhoneMockup />
  </div>
</div>

// After:
<div className="reveal-scale" style={{ transitionDelay: "0.2s" }}>
  <PhoneParallax>
    <div className="phone-float">
      <PhoneMockup />
    </div>
  </PhoneParallax>
</div>
```

The `reveal-scale` outer wrapper handles the scroll reveal. `PhoneParallax` handles the 3D tilt wrapper. `phone-float` handles the vertical float keyframe. Three transforms compose correctly: the browser applies `perspective + rotateX/Y` from `PhoneParallax`, then `translateY + rotate(3deg)` from `phone-float`, in nested element order.

---

### Fix 6 — Label Tag Dot Pulse (P3, micro-interaction density)

**`client/src/index.css` — update `.label-tag::before`:**

```css
/* Add pulse animation to the label tag dot indicator */
@keyframes dot-pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.4); }
}

.label-tag::before {
  content: '';
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #C0E57A;
  flex-shrink: 0;
  animation: dot-pulse 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .label-tag::before {
    animation: none !important;
  }
}
```

---

### Fix 7 — Mobile Drawer Exit Animation (P3, transition completeness)

Currently the drawer disappears instantly. A CSS exit animation requires either Framer Motion's `AnimatePresence` or a manual approach:

**`client/src/components/Navbar.tsx` — replace the conditional `{menuOpen && ...}` pattern:**

```tsx
// Instead of unmounting on close, keep the drawer mounted and control
// visibility via an animation class:

// 1. Add state for closing animation:
const [isClosing, setIsClosing] = useState(false);

// 2. Add keyframe to index.css:
// @keyframes drawer-slide-out {
//   from { transform: translateX(0); opacity: 1; }
//   to   { transform: translateX(100%); opacity: 0; }
// }
// .mobile-drawer.closing {
//   animation: drawer-slide-out 0.25s cubic-bezier(0.4, 0, 1, 1) both;
// }

// 3. Close handler:
const closeDrawer = () => {
  setIsClosing(true);
  setTimeout(() => {
    setMenuOpen(false);
    setIsClosing(false);
  }, 250); // match animation duration
};

// 4. Render drawer when open OR closing:
{(menuOpen || isClosing) && (
  <div className={`mobile-drawer${isClosing ? " closing" : ""}`} ...>
    ...
  </div>
)}
```

This is a moderate complexity change. The simpler alternative — accepting the instant disappear — is reasonable for a health app where the mobile nav is a utility, not a showcase element.

---

## Scoring Breakdown

| Category | Score | Change from re-audit | Notes |
|----------|-------|---------------------|-------|
| Animation Quality | 7/10 | 0 | Good CSS library, GPU-correct — hero entrance and stagger weakness unchanged |
| Jank / Layout Shifts | 8/10 | 0 | No CLS. `willChange` on ParallaxHeroBg is a discrepancy with fix log, not a regression |
| Hover Consistency | 8.5/10 | 0 | Breadcrumb fixed in Pass 2. LinkedIn gap remains the only miss |
| Dot-Grid Hero | 7.5/10 | 0 | Breathing, parallax, reduced-motion all correct. No mouse interaction |
| Page Transitions | 7/10 | 0 | Clean enter animation. No exit. No crossfade |
| prefers-reduced-motion | 9.5/10 | +0.5 | Comprehensive — dot-grid coverage confirmed applied |
| Micro-interactions | 6.5/10 | -0.5 | Success states still broken by LCP override. Contact has no animation at all |
| Loading States | 4/10 | 0 | Unchanged. Still the weakest category |
| Phone Mockup Animation | 7/10 | 0 | Float correct, no mouse parallax |
| Awwwards Comparison | 6/10 | 0 | No signature moments added |

**Overall: 7.4 / 10**

The score is unchanged from the re-audit because no new animations were added and the P2 issues (success states, hero entrance) remain unimplemented. The reduced-motion coverage improvement noted in the re-audit is confirmed by the source, which moves that subcategory from 9/10 to 9.5/10, but the average is anchored by the unchanged weaknesses in loading states and success state animation.

---

## What Would Move the Score to 8.5+

Implementing three items in order of ROI:

1. **Hero headline entrance animation (Fix 2):** Eight lines of CSS + four className changes. Immediate visible impact on the site's most important real estate. Every new visitor sees the hero; none of them see it animate currently.

2. **Success state animation (Fix 1):** Twelve lines of CSS + two JSX className changes. Closes a broken micro-interaction that the previous two audits have identified. The confirmation moment after form submission is emotionally important — it should feel satisfying.

3. **Mouse parallax on phone (Fix 5):** ~40 lines of JS + two JSX lines. Adds the site's first "signature moment" — something that makes a visitor pause and notice. On desktop this would immediately elevate the perceived quality above Behance-tier and toward SOTD candidacy.

Items 4-7 (LinkedIn hover, team card image scale, label dot pulse, drawer exit) can be batched — they are collectively thirty lines of CSS and four JSX edits.

Loading states (Fix 8, not specified above) would require skeleton components and `onLoad` handlers across multiple images — the most effort of any remaining item, but necessary to reach a genuine 8.5.
