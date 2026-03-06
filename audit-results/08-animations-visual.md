# Animation & Visual Polish Audit — Perioskoup Landing Page
**Audit Date:** 2026-03-06 (Re-audit — post all P0/P1/P2 fixes applied)
**Auditor:** Animation & Visual Polish Specialist (Claude Sonnet 4.6)
**Skills Applied:** animations/SKILL.md, awwwards-design/SKILL.md
**Score: 7.2 / 10**

---

## Executive Summary

This is a complete re-audit of the current production code, reflecting all fixes applied since the initial 5.5/10 assessment. The P0 and P1 issues identified in the first audit (missing `prefers-reduced-motion`, broken phone float/reveal-scale transform conflict, no page transitions, instant mobile drawer cut, JS hover mutations bypassing CSS transitions) have been fully resolved. The codebase now carries one of the more thorough animation systems for a health-tech SPA in this tier.

What remains holding the score below 8: no skeleton loading states for lazy images, one lingering JS hover mutation in Breadcrumb.tsx, `will-change: transform` permanently applied to all five CTA orbs (a GPU memory cost with no compensating off), a dot-grid breathe animation that fires for `prefers-reduced-motion` users (the JS guard only covers the scroll parallax, not the CSS animation), and no typography split/stagger for hero text at the display size that would push this toward genuine Awwwards quality. The site now reads as polished and competent — it would be competitive on Behance-level dental health showcases. It is not yet at SOTD level.

---

## 1. Animation Quality

### Strengths

**Ken Burns Hero Background**
The 24-second ease-in-out loop with a 10% scale range and two-axis translate path is correctly restrained. The hero uses a real `<img>` element with `fetchPriority="high"` for LCP candidacy and the Ken Burns is applied via `.hero-lcp-img.ken-burns` rather than `background-image`, which is the correct architecture for LCP scoring. Duration is atmospheric without being imperceptible.

**CTA Animated Canvas**
Five layered gradient orbs (15s/18s/20s/22s/25s stagger), a grid pulse, rising particles, a scan line, and a vignette — all pure CSS, zero JS, no image dependency. Orb durations are staggered to prevent synchronization artifacts. The `filter: blur(80px)` on orbs is the correct approach for large soft gradients (compositor-accelerated). This section is the highest-quality animated element on the site.

**Page Transitions**
`App.tsx` now wraps all routes in `<PageWrapper key={location}>` which applies `.page-enter` on every route change. The keyframe is `opacity 0→1, translateY 6px→0` at `0.35s cubic-bezier(0.16, 1, 0.3, 1)` (iOS spring). This is fast enough to feel crisp and adds genuine continuity. The Suspense fallback `<div className="min-h-screen bg-[#0A171E]" />` provides color continuity during lazy route loading.

**Mobile Drawer Animation**
`drawer-slide-in` at `0.32s cubic-bezier(0.16, 1, 0.3, 1)` — correct spring easing on entry. Staggered link reveals via `.mobile-drawer-link` with `animationDelay: 0.05 + i * 0.06s` — the stagger is visible and purposeful. Active route highlighted in lime. This is now a satisfying interaction.

**Custom Cursor**
Correct lerp implementation (0.12 factor), `requestAnimationFrame` loop with `MutationObserver` re-attachment for dynamic content. Dot follows instantly, ring lags with visible trailing. Expands 32→52px on hover of interactive elements. Disabled at ≤768px (correct — touch devices have no cursor). This is technically sound.

**Scroll Reveal System**
`.reveal` uses `cubic-bezier(0.16, 1, 0.3, 1)` at `0.6s` with `translateY(28px)` initial offset. `.reveal-scale` starts at `scale(0.94)`. Both are GPU-composited (only `opacity` and `transform` animated). `io.unobserve(e.target)` correctly fires after reveal — no repeated observation. `prefers-reduced-motion` guard is present in every single page's `useReveal()` function and in `index.css`. This is the most consistently implemented pattern in the codebase.

**Phone Mockup**
The transform conflict bug is fixed: `.reveal-scale` is on the outer div, `.phone-float` is on the inner div. The 5.5s float animation at 16px vertical travel and constant 3° rotation is atmospheric. The logo image inside uses `.img-load`/`.loaded` for a 0.6s opacity fade-in on load — a small but polished touch. Time updates every 30 seconds via `setInterval`, making the status bar feel alive.

**Ticker / Marquee**
36s linear infinite with `animation-play-state: paused` on hover — correct implementation. Lime background strip with uppercase Gabarito creates a distinctive breaking element between hero and content.

**Button Micro-interactions**
`.btn-primary`: `translateY(-2px)` + `box-shadow: 0 12px 32px rgba(192,229,122,0.4)` + lighter background, at `0.15-0.2s`. `.btn-ghost`: border and color change, `0.2s`. `.btn-text` arrow: `translateX(4px)` on hover via `.btn-text-arrow`, `0.2s cubic-bezier(0.16,1,0.3,1)` — GPU-composited, no layout thrash. All three button variants are consistent and feel purposeful.

**glow-pulse uses filter: drop-shadow**
The previous `text-shadow` approach that triggered paint on every frame has been replaced with `filter: drop-shadow()` which can run on the compositor thread.

### Remaining Weaknesses

**Stagger revealing is structurally weak for large sections.**
The `useReveal()` hook fires a single `IntersectionObserver` on ALL `.reveal` elements simultaneously. Cards within a bento grid section enter `visible` state within milliseconds of each other when the section threshold (0.1 = 10%) triggers. The `transitionDelay` values set inline (`0.1s`, `0.2s`, etc.) create visual stagger only when scroll is slow enough for elements to enter the viewport one-by-one. In practice, on a typical laptop scroll speed, an entire row of cards snaps in together. True per-element stagger requires observing each child individually, not the section container.

**No exit animations.**
Once `.visible` is applied and the observer unsubscribes, there is no reverse animation on scroll-up. On Awwwards-level sites, elements animate out as they leave the viewport and back in as they return. This is a P4 enhancement, but it removes the "discovery" quality that makes scroll feel rewarding.

**Hero LCP block rule overrides reveals above the fold.**
`#main-content .reveal, #main-content .reveal-scale { opacity: 1; transform: none; transition: none; }` forces all elements inside `#main-content` to appear instantly at full opacity. This is correct for LCP scoring, but means the hero text, EFP badge, headline, and subhead have no entrance animation at all — they pop into existence on page load rather than flowing in. Below-fold elements animate correctly. The hero, which is the most important canvas for first impressions, has no entrance choreography.

---

## 2. Jank and Layout Shift Risks

**ParallaxHeroBg.tsx scroll handler — resolved partially.**
The previous `getBoundingClientRect()` issue is fixed. The current implementation reads only `window.scrollY` and applies `translate3d(0, offset, 0)` directly. RAF ticking with a `ticking` boolean prevents double-firing. `{ passive: true }` prevents scroll blocking. The inline `willChange: "transform"` persists on the element permanently (it is set in the style object, not toggled). This creates a compositing layer that exists for the entire page lifetime, not just during scroll. However, since this is the only element with this pattern and it is the largest visible background element, the GPU cost is acceptable.

**`will-change: transform` permanently on all five CTA orbs.**
`index.css` line 400: `.cta-orb { will-change: transform; }` applies to all five orb elements for the entire page session. Each creates a separate compositor layer. On mid-range mobile devices (the primary audience for a health app), five permanent compositing layers for blurred gradient circles that move very slowly is an unnecessary cost. The animation skill file is explicit: apply `will-change` only when there is a specific performance problem, and remove it after the animation. A better pattern would be `will-change: auto` by default and `will-change: transform` only when the animation is actively running — which for CSS infinite animations means using the `:hover` pseudo-class or toggling a class via JS when the section is in the viewport.

**`animated-bg-img` permanent layers.**
`.animated-bg-img { will-change: auto; }` — correctly set to auto. Good.

**IntersectionObserver threshold 0.1 for the features bento grid.**
The bento grid section is approximately 800px tall on desktop. At 0.1 threshold, the reveal fires when 80px of the section is visible. The bottom cards (below 700px from the section top) are not yet visible when the observer fires. All cards transition in simultaneously with `transitionDelay` values, but the actual visual stagger depends on the browser respecting delayed transforms while elements are still off-screen. In practice, the bottom row of cards appears to fade in without the user having scrolled to see them — a mildly anti-climactic experience.

**No CLS issues identified.**
Fonts use `font-display: swap` with correct `unicode-range` partitioning. Images have explicit `width`/`height` attributes for aspect ratio reservation. No elements shift on load. The noise overlay is `position: fixed; pointer-events: none` — correctly inert.

---

## 3. Hover State Consistency

**Resolved issues (all confirmed fixed in current code):**
- Desktop nav links: `.nav-link-item` CSS class with `transition: color 0.2s ease, background 0.2s ease`. Active state in lime. Hover background subtle.
- Footer links: `.footer-link` with `color 0.2s ease + translateX(2px) 0.2s ease`. The 2px nudge is tasteful.
- Blog featured cards: `.blog-card-hover` with `translateY(-4px)`, lime border, box-shadow glow.
- Blog list rows: `.blog-row-hover` with background + `padding-left: 8px` shift.
- EFP badge: `.efp-badge-hover` with background and border-color lighten.
- Card component: `.card:hover` — `translateY(-3px)` + lime border + shadow.
- `card-dark:hover` — border-color lime faint + shadow. (Previously had zero hover feedback.)

**Remaining inconsistency:**

**Breadcrumb.tsx — one lingering JS hover mutation.**
Lines 77-78 use `onMouseEnter={(e) => (e.currentTarget.style.color = "#C0E57A")}` and `onMouseLeave={(e) => (e.currentTarget.style.color = "#8C9C8C")}`. The `transition: "color 0.2s ease"` is declared in the element's style object, but because the color change is applied via direct JS `style.color` assignment, the transition declaration is on the same style object — this actually does work in most browsers (inline transition + inline style change), but it is the anti-pattern documented in the fix-log and inconsistent with every other interactive element on the site. Low visual impact (breadcrumb links are small and rarely interacted with), but architecturally inconsistent.

**Waitlist role selector buttons.**
Lines 126-131 in Waitlist.tsx: `transition: "all 0.2s ease"`. The `transition: all` anti-pattern catches every CSS property including layout-triggering ones. Should be `transition: "border 0.2s ease, background 0.2s ease, color 0.2s ease"`. Impact is low since only border, background, and color change — but if any other property changes unexpectedly (e.g., a browser UA style), it would animate.

**LinkedIn icons on About page team cards.**
The social link has `color: "#8C9C8C"` but no hover transition. It is an `<a>` element so it benefits from the global `*:focus-visible` ring, but has no color hover feedback. Minor omission.

---

## 4. Dot-Grid Hero Background Effectiveness

**Current state (post-fix):**
- Dot opacity now breathes at 0.45–0.65 via `dot-grid-breathe` animation (8s ease-in-out infinite)
- Dot color increased from `rgba(192,229,122,0.12)` to `rgba(192,229,122,0.18)`
- Parallax at 0.15× scroll rate (correct — subtle, not distracting)
- `willChange: "transform"` is now inline in the style object (permanent but acceptable for this element)

**Assessment:**
The dot grid is now visible on most displays, and the breathing animation adds gentle life. The effect contributes to the "dark tech" premium feel without competing with the Ken Burns hero image or HeroGlow gradients.

**Remaining issue — `dot-grid-breathe` fires for `prefers-reduced-motion: reduce` users.**
The JS guard in `ParallaxHeroBg.tsx` only prevents the scroll parallax listener from attaching. It does not prevent the `animation: "dot-grid-breathe 8s ease-in-out infinite"` from applying via the inline style. The `prefers-reduced-motion` CSS block in `index.css` targets `.animated-bg-img`, `.cta-orb`, `.hero-orb`, etc. — but `ParallaxHeroBg` uses none of these classes. The dot-grid element's `dot-grid-breathe` animation is uncovered by the reduced-motion CSS rule because the element has no class name that the rule matches.

The breathing is an opacity change (not spatial motion), so it is unlikely to cause vestibular distress. However, per WCAG 2.1 SC 2.3.3 (Animation from Interactions), all decorative animations should respect the user preference. The fix is one line: add the element to the `prefers-reduced-motion` CSS block, or add a class name to the element so the existing rule can target it.

**Awwwards comparison:**
Award-winning sites at the SOTD level typically use dot grids that respond to mouse position (5-10% parallax from cursor). The current implementation only responds to scroll, making it feel passive on desktop where the user moves the mouse frequently. This is a quality gap.

---

## 5. Page Transitions

**Status: Resolved — functional and clean.**

`PageWrapper` remounts on every route change, re-triggering `.page-enter` which applies `page-fade-in` at `0.35s cubic-bezier(0.16, 1, 0.3, 1)`. `ScrollToTop` calls `behavior: "instant"` ensuring no scroll position bleeds across routes before the transition. `RouteAnnouncer` announces route changes to screen readers for accessibility.

**Remaining gap:**
There is no exit animation — old content disappears instantly and new content fades in. This creates a slight flash at the transition boundary. A crossfade (old page fading out while new page fades in simultaneously) would feel more cinematic, but requires Framer Motion's `AnimatePresence` or a more complex CSS approach. The current solution is correct and clean for a zero-dependency implementation.

---

## 6. `prefers-reduced-motion` — Now Properly Implemented

**CSS coverage (`index.css` lines 1079–1149):**
The `@media (prefers-reduced-motion: reduce)` block covers:
- All continuous looping animations: `animated-bg-img`, `cta-orb`, `hero-orb` (1/2/3), `cta-particle`, `hero-particle`, `cta-scan-line`, `hero-scan-line`, `hero-ring` (1/2), `ticker-track`, `circle-pulse::after`, `phone-float`, `text-glow`, `cta-grid`, `hero-wave-svg` (1/2) — all set to `animation: none !important`.
- `animated-bg-img` frozen at `scale(1.08) translate(0,0)`.
- `.reveal`/`.reveal-scale`: `opacity: 1 !important; transform: none !important; transition: none !important;` — content appears instantly, no motion.
- `.page-enter`, `.mobile-drawer`, `.mobile-drawer-link` — animations removed.
- All hover transforms disabled: `btn-primary:hover`, `card:hover`, `card-dark:hover`, `blog-card-hover:hover`, `blog-row-hover:hover`, `footer-link:hover`, `btn-text:hover .btn-text-arrow`.

**JS coverage:**
All page-level `useReveal()` functions (Home, Features, ForDentists, Pricing, About, Blog, Contact, Waitlist) include `window.matchMedia('(prefers-reduced-motion: reduce)').matches` check that immediately applies `visible` to all reveal elements without IntersectionObserver. `ParallaxHeroBg.tsx` skips the scroll listener entirely.

**One uncovered element:**
The `dot-grid-breathe` animation on `ParallaxHeroBg` — described in section 4. Severity: low (opacity-only, not spatial). Should be fixed.

---

## 7. Micro-Interactions

**Forms — improved but not premium:**
- `.p-input:focus`: `border-color: rgba(192,229,122,0.55)` + `box-shadow: 0 0 0 3px rgba(192,229,122,0.1)` — a subtly lime glow ring. Transition: `border-color 0.25s ease, box-shadow 0.25s ease`. This is correct and feels good.
- `.p-select:focus`: identical treatment.
- No floating label animation — inputs go from placeholder to typed text with zero visual choreography. This is acceptable for a medical-adjacent product but leaves a gap vs. premium SaaS forms (e.g., Linear, Vercel dashboard).
- Success states on Waitlist and Contact: static checkmark circles appear without an entry animation. A `reveal-scale` on the success container would add a satisfying confirmation moment.

**Cards:**
- `.card:hover`: `translateY(-3px)` + lime border tint + shadow. Well-calibrated.
- `.card-dark:hover`: now has border-color and shadow transition (was absent). Fixed.
- Team cards on About page: hover lift inherited from `.card`. No image scale or overlay on hover — Awwwards-quality team sections often include an image scale (`transform: scale(1.04)`) inside the overflow-hidden container on hover.

**Label tags (`.label-tag`):**
The animated dot (`::before` pseudo-element) is static. No pulse, no breath. The dot is 6px×6px, lime, always on. Adding a subtle scale pulse on the dot (`animation: dot-pulse 2s ease-in-out infinite`) would elevate these section markers significantly.

**Phone buttons inside PhoneMockup:**
The "Patient" and "Dentist" role buttons inside the phone screen are static `div` elements with no hover state. They are purely decorative, but a very subtle press effect (`transform: scale(0.97)` on `:active` via a wrapper `button[tabindex="-1"]`) would reinforce the illusion of a live product.

**Circle pulse rings (How It Works):**
`.circle-pulse::after` uses `pulse-ring` animation — scale 0→1 with opacity 0.5→0, `3.5s ease-in-out infinite`. Each step has a different `animationDelay` (0s, 0.8s, 1.6s). This is the correct implementation for staggered wave effects. GPU-composited via transform and opacity. Good.

---

## 8. Loading States

**Status: Partially addressed — still inadequate for images.**

**What exists:**
- `img-load` / `img-load.loaded`: opacity 0→1 at 0.6s on load. Applied to the PhoneMockup logo image. This is the only image with a load animation.
- `Suspense fallback`: bare `<div className="min-h-screen bg-[#0A171E]" />`. This is a blank navy rectangle — not a skeleton, not a branded preloader. Routes loaded for the first time (Features, ForDentists, etc.) will show this blank div for 100-300ms on a typical connection before the lazy chunk arrives.
- `Skeleton` component exists at `/client/src/components/ui/skeleton.tsx` — still completely unused.

**What is missing:**
- Hero background image (`hero-bg.webp`): no fade-in. Appears behind the Ken Burns animation. On slow connections, the Ken Burns animation plays on the `#0A171E` background until the image loads. Using `.img-load`/`.loaded` on the `hero-lcp-img` element would add a graceful load-in, but conflicts with LCP measurement (opacity:0 at paint time would disqualify the LCP candidate). The correct solution is an `onLoad` callback that adds the class — which does not affect LCP scoring since LCP measures when the element renders, not when it becomes visible.
- Team headshots (About page), award photo, features background: no load states.
- The Suspense fallback should be a branded skeleton — at minimum a `#1D3449` card skeleton layout matching the page structure.

---

## 9. Phone Mockup Animation

**Current state (post-fix):**
The transform conflict is resolved. `reveal-scale` on outer div, `phone-float` on inner div. Both animate correctly and independently.

**Float quality:**
- `translateY(0 → -16px → 0)` at 5.5s ease-in-out infinite.
- Constant `rotate(3deg)` adds personality — breaks the orthogonal grid.
- `drop-shadow(0 40px 80px rgba(0,0,0,0.55)) drop-shadow(0 0 60px rgba(192,229,122,0.1))` — the second shadow creates a subtle lime ambient glow beneath the phone that ties it to the brand palette.

**What's missing:**
- No mouse parallax response — the phone does not react to cursor position.
- Screen content (role buttons, Dynamic Island) is entirely static.
- Compare: Tend.com, Calm.com, and Headspace's landing page mockups show gentle UI animations (screen transitions, notification pop-ins, button press responses) that suggest a live product. Perioskoup's phone screen is a wireframe illustration, not a product demo.
- The phone is not observable/scrubbed via scroll — it could tilt based on scroll position or mouse position for a significant wow-factor moment.

---

## 10. Awwwards Dental/Health Site Comparison

Reference sites: Tend, Carbon Health, Parsley Health, Hims/Hers, Miro health pages, Calm, Headspace.

| Criterion | Perioskoup (current) | Awwwards SOTD Tier |
|-----------|----------------------|--------------------|
| Scroll reveal quality | Fade-up at 0.6s iOS spring — clean | SOTD: char-level SplitType reveals, scrubbed parallax |
| Hero animation | Ken Burns + dot grid + HeroGlow | Comparable — some SOTD use static hero with exceptional type |
| Page transitions | 0.35s fade-up CSS crossfade — correct | SOTD minimum: bidirectional crossfade or overlay wipe |
| Custom cursor | Lerp ring, hover expansion — competent | SOTD: context-aware cursor (changes on section, shows label on card hover) |
| Typography animation | None — text appears instantly in hero | SOTD: word/char stagger reveals, especially on hero headlines |
| Loading sequence | Blank navy fallback + img-load on phone logo | SOTD: branded preloader or staggered initial reveal sequence |
| Mobile menu | Slide-in + staggered links — now correct | On par with premium health sites |
| Reduced motion | Comprehensive CSS + JS coverage | Required for SOTD (now present) |
| Texture/depth | Noise overlay at 0.02 opacity | Barely perceptible; SOTD sites at 0.04-0.06 |
| Micro-interaction density | Moderate — buttons/cards good, forms thin | SOTD: nearly every element has a micro-interaction |
| 3D / WebGL | None | Not required; Linear/Vercel win without it |
| Sound design | None | Not required for health context |

Awwwards Design score estimate: **7.0–7.5**
Awwwards Creativity score estimate: **6.0** (no signature moments — nothing the user will screenshot and share)
Awwwards Usability score estimate: **8.0** (accessibility, mobile menu, reduced motion — all solid now)

---

## Remaining Issues and Specific Code Fixes

### Fix A — Breadcrumb JS Hover Mutation (Low Effort, Consistency)

**File:** `client/src/components/Breadcrumb.tsx`

Replace lines 70-81:

```tsx
// Add to index.css:
.breadcrumb-link {
  color: #8C9C8C;
  text-decoration: none;
  transition: color 0.2s ease;
}
.breadcrumb-link:hover { color: #C0E57A; }

// In Breadcrumb.tsx — replace the Link block:
<Link
  href={item.href}
  className="breadcrumb-link"
>
  {item.label}
</Link>
```

Remove `onMouseEnter`, `onMouseLeave`, and the inline `transition: "color 0.2s ease"` style.

---

### Fix B — Cover dot-grid-breathe in prefers-reduced-motion (WCAG completeness)

**File:** `client/src/index.css`

Add one selector to the existing `@media (prefers-reduced-motion: reduce)` block:

```css
@media (prefers-reduced-motion: reduce) {
  /* existing rules... */

  /* Dot-grid breathe — ParallaxHeroBg uses inline animation style,
     not a CSS class. Target the aria-hidden parallax bg element. */
  [aria-hidden="true"].pointer-events-none {
    animation: none !important;
  }
}
```

Or, more targeted — add a class to `ParallaxHeroBg`:

```tsx
// ParallaxHeroBg.tsx — add className:
<div
  ref={bgRef}
  aria-hidden="true"
  className="pointer-events-none dot-grid-bg"
  style={{ animation: "dot-grid-breathe 8s ease-in-out infinite", ... }}
/>
```

```css
/* index.css — add to reduced-motion block: */
@media (prefers-reduced-motion: reduce) {
  .dot-grid-bg { animation: none !important; }
}
```

---

### Fix C — Waitlist Role Selector `transition: all` Anti-Pattern

**File:** `client/src/pages/Waitlist.tsx`

Replace line 128:

```tsx
// Before:
transition: "all 0.2s ease",

// After:
transition: "border-color 0.2s ease, background 0.2s ease, color 0.2s ease",
```

---

### Fix D — CTA Orb `will-change` — Remove Permanent Layer

**File:** `client/src/index.css`

```css
/* Remove permanent will-change from .cta-orb base rule */
.cta-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  /* will-change: transform; — REMOVED */
  pointer-events: none;
}

/* Apply only when the CTA section is in view via a JS class toggle,
   or accept the cost as acceptable for a section that's always visible
   when scrolled to. If keeping it, document the deliberate decision. */
```

If the GPU cost is acceptable (it probably is on desktop — these are blur filters that are already composited), then at minimum update the comment to document the intentional trade-off rather than leaving it as an unmarked anti-pattern.

---

### Fix E — Hero Headline Entrance Animation (Awwwards Quality Gap)

The hero headline has no entrance animation because `#main-content .reveal` overrides are set to `opacity: 1; transition: none` for LCP. To add a headline entrance without breaking LCP:

```css
/* Add to index.css */
@keyframes hero-headline-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-headline-animate {
  animation: hero-headline-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
.hero-subhead-animate {
  animation: hero-headline-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
}
.hero-cta-animate {
  animation: hero-headline-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
}

@media (prefers-reduced-motion: reduce) {
  .hero-headline-animate,
  .hero-subhead-animate,
  .hero-cta-animate {
    animation: none !important;
  }
}
```

```tsx
// In Home.tsx hero section — replace className="reveal visible" with:
<h1 className="hero-headline-animate" style={{ ... }}>
  Between visits,<br />
  <span style={{ color: "#C0E57A" }}>we take over.</span>
</h1>
<p className="hero-subhead-animate body-lg" style={{ ... }}>
  ...
</p>
<div className="hero-cta-animate" style={{ ... }}>
  {/* CTA buttons */}
</div>
```

These use CSS `animation` (not transition), so they play once on page load regardless of `#main-content` overrides and do not interfere with LCP measurement.

---

### Fix F — Success State Entry Animation (Form Confirmations)

When the waitlist or contact form submits successfully, the success UI appears instantly. Add a scale-in:

```tsx
// In Waitlist.tsx and Contact.tsx — wrap success div:
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="reveal-scale"
  style={{ textAlign: "center", padding: "60px 0" }}
>
  {/* ... */}
</div>
```

Then call `setTimeout(() => el.classList.add('visible'), 50)` on the success element after state change — or use a `useEffect` on the `submitted` state to trigger the class addition.

---

### Fix G — Team Card Image Scale on Hover

```css
/* Add to index.css */
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

```tsx
// In About.tsx team cards — add className to the image wrapper div:
<div className="team-card-img-wrap h-48 sm:h-56 lg:h-[280px] relative">
  <img ... />
  <div style={{ position: "absolute", bottom: 0, ... }} />
</div>
```

---

### Fix H — Mouse Parallax on Phone Mockup (Signature Moment)

This is the single change that would most dramatically lift the perceived quality:

```tsx
// In Home.tsx — add to the phone mockup wrapper:
import { useRef, useEffect } from "react";

function PhoneParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    let rafId: number;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = document.documentElement.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      // Normalize to -1..1
      targetX = ((e.clientX - cx) / cx) * 8;  // max 8deg tilt
      targetY = ((e.clientY - cy) / cy) * -5;  // max 5deg tilt
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      if (el) {
        el.style.transform = `perspective(1000px) rotateY(${currentX}deg) rotateX(${currentY}deg) rotate(3deg)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}

// Replace the inner phone-float div:
<div className="reveal-scale" style={{ transitionDelay: "0.2s" }}>
  <PhoneParallax>
    <div className="phone-float">
      <PhoneMockup />
    </div>
  </PhoneParallax>
</div>
```

Note: The `phone-float` CSS animation uses `rotate(3deg)` in its keyframes. With the `perspective` + `rotateY`/`rotateX` added from mouse, the transforms compose correctly in 3D space. The `rotate(3deg)` in the float keyframe applies in 2D on top of the 3D perspective from the parent.

---

## Issue Priority Matrix

| Issue | Severity | Effort | Priority |
|-------|----------|--------|----------|
| dot-grid-breathe not in prefers-reduced-motion CSS | Low | Trivial | P1 |
| Breadcrumb JS hover mutation | Low | Trivial | P1 |
| Waitlist `transition: all` | Low | Trivial | P1 |
| Hero has no entrance animation | Medium | Low | P2 |
| No image skeleton/load states for hero, teams | Medium | Low | P2 |
| Suspense fallback is blank navy — no skeleton | Medium | Low | P2 |
| `will-change: transform` permanent on CTA orbs | Low | Trivial | P2 |
| Success state entry animation | Low | Trivial | P2 |
| Team card image scale on hover | Low | Low | P3 |
| Mouse parallax on phone mockup | Medium | Medium | P3 |
| Stagger reveal per-element (not per-section) | Low | Medium | P3 |
| No exit/reverse animations on scroll-up | Low | High | P4 |
| Phone screen content not animated | Low | High | P4 |
| Noise overlay too faint (0.02) | Low | Trivial | P4 |

---

## Scoring Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| Animation Quality | 7/10 | Good CSS library, GPU-correct choices, weak hero entrance, stagger structural issue |
| Jank / Layout Shifts | 8/10 | No CLS, passive scroll, RAF ticking — orb will-change permanent |
| Hover Consistency | 8/10 | All major elements CSS-driven — Breadcrumb outlier, LinkedIn icons |
| Dot-Grid Hero | 7/10 | Visible, breathing, parallax — not interactive, breathe not in reduced-motion CSS |
| Page Transitions | 7/10 | Clean fade-up implemented, no exit animation, no bidirectional |
| prefers-reduced-motion | 9/10 | Comprehensive CSS + JS — dot-grid breathe gap is the only miss |
| Micro-interactions | 7/10 | Buttons/cards/forms good, label-tag dot static, success states instant |
| Loading States | 4/10 | Phone logo has load fade — everything else (hero bg, team photos) does not |
| Phone Mockup Animation | 7/10 | Float works, transform conflict fixed — no mouse parallax or screen content animation |
| Awwwards Comparison | 6/10 | Competitive at Behance level, not SOTD — missing text choreography, signature moments |

**Overall: 7.2 / 10**

---

## Summary of What Changed Since 5.5/10 Audit

All P0, P1, and most P2/P3 fixes from the first audit have been implemented:
- `prefers-reduced-motion` fully added to CSS and JS across all pages
- Phone float/reveal-scale transform conflict resolved
- Page transitions now exist (0.35s fade-up CSS)
- Mobile drawer now slides in with staggered link reveals
- All JS hover mutations replaced with CSS classes (except Breadcrumb)
- `glow-pulse` now uses `filter: drop-shadow()` (GPU-composited)
- Dot-grid opacity increased and breathe animation added
- `img-load`/`loaded` fade-in on PhoneMockup logo
- Form focus states now include lime glow ring
- `card-dark` hover state added
- `btn-text` arrow uses `translateX` (not `gap` layout thrash)
- Reveal duration tightened from 0.75s to 0.6s

The remaining gap to 8.5+ is: hero headline entrance animation, loading skeletons for lazy images, mouse parallax on the phone, and team card image scale on hover — all of which are medium-effort additions with high visual payoff.
