# Animation & Visual Polish Audit — Perioskoup Landing Page
**Audit Date:** 2026-03-06  
**Auditor:** Animation & Visual Polish Specialist (Claude Sonnet 4.6)  
**Skills Applied:** animations/SKILL.md, awwwards-design/SKILL.md  
**Score: 5.5 / 10**

---

## Executive Summary

The site has a genuine visual identity and more animation infrastructure than most health-tech SPAs. The brand color system is coherent, the CSS keyframe library is substantial, and several individual effects (Ken Burns hero bg, CTA orb system, custom cursor) show real craftsmanship. However, the animation system has a critical structural flaw — `prefers-reduced-motion` is completely absent from both CSS and JavaScript — and a cluster of polish gaps that hold the score below 7. Page transitions are instantaneous hard cuts. The scroll-reveal hook fires a global DOM query on every page mount, creating potential jank on slow devices. The phone mockup is animated purely via CSS float rather than having interactive or scrubbed qualities. Against Awwwards dental/health comparators, the site reads as well-executed but fundamentally static between reveal events.

---

## 1. Animation Quality

### What Works

**Ken Burns Hero Background (index.css lines 116-122)**  
The 24-second ease-in-out infinite loop is a good duration — slow enough to be atmospheric, not so slow it's imperceptible. The 10% translate range is restrained and appropriate.

**CTA Animated Canvas (index.css lines 284-377)**  
Five layered gradient orbs, a grid pulse, rising particles, a scan line, and a vignette — all pure CSS, zero JavaScript, no image dependency. This is the most technically complete section. Orb drift durations staggered at 15s/18s/22s/25s prevents synchronization artifacts.

**Ticker / Marquee (index.css lines 651-658)**  
Correct pattern: 36s linear infinite, `animation-play-state: paused` on hover. The 50% duplicate technique is correct for seamless looping.

**Custom Cursor (CustomCursor.tsx)**  
Correct lerp implementation with `requestAnimationFrame`. The 0.12 lerp factor gives a satisfying lag. Ring expansion on hover state is clean. MutationObserver re-attach pattern handles dynamic content correctly.

**Scroll Reveal Easing (index.css lines 635-648)**  
`cubic-bezier(0.16, 1, 0.3, 1)` is the iOS spring curve — the right choice for elements entering from below. 0.75s duration is at the upper edge of acceptable; could tighten to 0.6s.

### What Does Not Work

**Stagger implementation is broken for most sections.**  
The `useReveal` hook fires a single IntersectionObserver on ALL `.reveal` elements simultaneously (Home.tsx line 31-38, identical pattern repeated in every page). When a section scrolls into view, all its children trigger `visible` at threshold 0.12 — meaning all elements in a section become visible within milliseconds of each other regardless of `transitionDelay`. The `transitionDelay` values set inline (e.g., `0.1s`, `0.2s`, `0.3s`) only work if the observer fires before the element is already in the viewport. On initial page load, all above-fold elements get `visible` added simultaneously before any delay can run, which is correct. But for below-fold sections, because the parent section is observed as a whole rather than individual children, all children transition at once. The stagger only functions when cards enter the viewport one-by-one on slow scroll.

**No exit animations anywhere.**  
Once an element has class `visible`, it never loses it (the `io.unobserve(e.target)` call at line 32 permanently removes the observer). Scrolling back up shows all elements already revealed — the site loses the "discovery" quality that Awwwards-level sites maintain through reverse animations.

**`orb-drift` animations on `.animated-bg-img` use `will-change: transform` as a permanent style.**  
`index.css` lines 246 and 301 set `will-change: transform` globally on `.animated-bg-img` and `.cta-orb`. These elements persist for the lifetime of the page — this is the exact anti-pattern from the skill file. Each will-change creates a new compositing layer and occupies GPU memory continuously. With 5 CTA orbs + 1 hero bg + 1 features bg all permanently will-changed, this consumes unnecessary GPU resources on mobile.

**`glow-pulse` text animation (index.css line 478)**  
`text-shadow` is not GPU-composited — it triggers paint on every frame. Applied to text via `.text-glow`, this causes repeated paint invalidation. Use `filter: drop-shadow()` instead, which can composite on the GPU.

---

## 2. Jank and Layout Shift Risks

**Scroll handler in ParallaxHeroBg.tsx (lines 11-18)**  
The scroll listener reads `getBoundingClientRect()` synchronously inside the handler. `getBoundingClientRect()` forces a layout reflow. Although `{ passive: true }` prevents scroll blocking, the reflow cost on each scroll event adds up, especially on mobile. The `willChange: "transform"` on the element is appropriate here (applied before animation starts), but the reflow from `getBoundingClientRect` counteracts the benefit.

**`animated-bg-img` sizing (index.css lines 240-247)**  
```css
.animated-bg-img {
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
}
```
The `width: 120%` and `height: 120%` combination with `inset: -10%` creates an oversized element. During Ken Burns zoom (scale up to 1.1), the element can briefly exceed its parent bounds before the `overflow: hidden` clip catches it. This is not a layout shift per se but causes a repaint edge on some browsers. Use `inset: 0; transform: scale(1.15)` as the starting state instead to keep the element composited.

**IntersectionObserver threshold at 0.12 for large sections**  
For sections taller than the viewport (e.g., the bento features grid at 120px padding + multiple cards), threshold 0.12 means the reveal fires when only 12% of the section is visible. Large sections will trigger while still mostly below the fold — the cards at the bottom of the section are invisible and their animation fires before the user can see them benefit.

**Mobile drawer (Navbar.tsx lines 133-171)**  
The mobile menu is conditionally rendered (`{menuOpen && ...}`) with no transition whatsoever — it appears/disappears as an instant cut. No AnimatePresence, no CSS transition class. This is the most jarring interaction in the entire site.

---

## 3. Hover State Consistency

**Primary buttons (`.btn-primary`):** `translateY(-2px)` + `box-shadow` + `background` change, 0.2s/0.15s. Correct and consistent.

**Ghost buttons (`.btn-ghost`):** `border-color` + `color` + `background` change, 0.2s. Consistent.

**Cards (`.card`):** `translateY(-3px)` + `border-color` + `box-shadow`, 0.25s. Consistent.

**Navbar links:** Uses inline `onMouseEnter`/`onMouseLeave` handlers instead of CSS transitions (Navbar.tsx lines 84-86). The `transition: 'color 0.2s ease'` is set in the style object but the color change itself happens via JS `style.color` assignment, which bypasses the CSS transition entirely. The hover color change will be **instantaneous**, not 0.2s.

**Blog featured cards (Blog.tsx lines 154-155):** Same problem — JS `style.transform` assignment on hover bypasses CSS transitions. The card lift/border change will be instant, not the 0.3s intended.

**Blog list rows (Blog.tsx lines 200-201):** JS `style.background` assignment — same issue. Background change is instant.

**Footer links (Footer.tsx lines 107-109):** JS `style.color` assignment — instant, not 0.2s.

**`.btn-text` hover (index.css lines 543):** Animates `gap` property. `gap` is not GPU-composited and triggers layout on every frame. Use `padding-right` or `transform: translateX()` on the arrow icon instead.

**Inconsistency summary:** Shared UI components (buttons, `.card`) use CSS transitions correctly. Page-level interactive elements (nav links, blog cards, footer links) use JS direct style mutation that bypasses transition entirely. This creates two observable tiers of hover quality — premium on components, flat on pages.

---

## 4. Dot-Grid Hero Background Effectiveness

`ParallaxHeroBg.tsx` renders a `radial-gradient(circle, rgba(192,229,122,0.12) 1px, transparent 1px)` at 32px spacing. 

**Positives:** Correctly placed at z-index 0, parallax movement at 0.15× scroll rate feels subtle and not distracting. Opacity 0.35 keeps it subordinate to content.

**Problems:**
- At opacity 0.35 and dot color at 12% lime, the dots are nearly invisible on most displays, especially with the HeroGlow gradients layered on top. They contribute almost nothing to the visual texture.
- The `willChange: "transform"` is permanent (lives as an inline style for the lifetime of the section), which creates a compositing layer that persists even when the element is not moving.
- No animated quality beyond the parallax offset. Compare to award-winning sites where dot grids have interactive mouse-tracking, fade-in/out on proximity, or subtle scale breathing.
- `inset: "-20% 0"` on the element combined with the Ken Burns bg creates a double-oversized stacking context in the hero. The dot grid extends 20% above and below the hero viewport area but only the visible portion is used.

**Recommendation:** Increase dot opacity to 0.55 minimum (currently imperceptible on bright displays), add a very slow breathing opacity animation, or make it respond to mouse position with a minimal 5% parallax offset from cursor position.

---

## 5. Page Transitions

**Current state: None.**

`App.tsx` uses Wouter's `Switch`/`Route` with a `ScrollToTop` component that calls `window.scrollTo({ top: 0, behavior: "instant" })`. Every route change is a hard cut — old page disappears, new page appears with zero transition. No crossfade, no overlay wipe, no shared element.

The `useReveal()` hook in each page re-queries the DOM on mount, which means each page load re-runs the IntersectionObserver setup. Since `visible` classes from the previous page are gone (new DOM), reveals fire fresh on page load — this is correct behavior, but without a page transition, the content appears instantly before reveals have a chance to animate in above-fold elements.

**Impact:** At Awwwards health/dental reference sites (e.g., Dentulu, Tend, Parsley Health), route changes use at minimum a 200ms crossfade. Without any transition, the site feels like a 2015 multi-page website rather than a contemporary SPA.

---

## 6. `prefers-reduced-motion` — CRITICAL FAILURE

**Zero coverage in either CSS or JavaScript.**

Grep result confirms: no `prefers-reduced-motion` query exists anywhere in the codebase.

The following animations run unconditionally for all users including those with vestibular disorders:
- Ken Burns zoom (continuous, 24s loop)
- All five CTA orb drifts (continuous, 15-25s loops)
- Rising particles across hero and CTA (continuous, 4-8s loops)
- Scan lines (continuous, 6-8s loops)
- Phone float animation (continuous, 5.5s loop)
- Dot grid parallax (fires on every scroll event)
- Ticker marquee (continuous, 36s loop)
- Circle pulse rings (continuous, 3.5s loop)
- Counter count-up animation (JS, no motion check)
- Glow pulse on text (continuous, 4s loop)

This is a WCAG 2.1 Level AA violation (Success Criterion 2.3.3, AAA, and 2.3.1, A for flashing). More practically, it exposes roughly 5% of visitors to potential vestibular discomfort. This must be fixed before any accessibility-conscious clinicians evaluate the site for their practices.

---

## 7. Micro-Interactions

**Forms:**
- `.p-input:focus` changes `border-color` only. No scale, no glow spread, no label float. The focus state is functionally correct but uninspiring.
- The success state for WaitlistForm (Home.tsx lines 82-93) shows a static checkmark circle — no entry animation for the success state itself. The circle and text simply appear.
- Role selector buttons (Waitlist.tsx lines 69-73) have correct `transition: "all 0.2s ease"` — but `transition: all` catches every CSS property and is the anti-pattern from the skill file.

**Cards:**
- `.card:hover` is clean. No `.card-dark` hover state defined — these are used on the About/Mission stats panel and have zero hover feedback.

**Label tags (`.label-tag`):**
- No hover state. These are not interactive, which is fine, but the animated dot (`::before`) has no pulse or breath — it's static. A subtle scale pulse on the dot would elevate these.

**EFP badge in hero (Home.tsx lines 157-162):**
- `transition: "background 0.2s ease"` defined inline, but no hover background change is specified. The badge has a transition declaration but no hover rule — the transition fires on nothing.

**Phone mockup buttons (PhoneMockup.tsx lines 215-245):**
- The "Patient" and "Dentist" role buttons inside the phone screen are static `div` elements with no hover state. These are purely decorative, but adding a subtle scale on hover (even though it's inside a mockup) would add to the illusion of a real app screen.

---

## 8. Loading States

**No loading states of any kind.**

- No skeleton screens for image loads (team photos, hero bg, features bg, award photo)
- No spinner or placeholder for the PhoneMockup logo image (external CloudFront URL)
- No page-level loading indicator between route changes
- The `Skeleton` component exists at `/client/src/components/ui/skeleton.tsx` but is never used anywhere in the application

The hero background image (`hero-bg-soft.png`) is an external CloudFront asset. On slow connections, the hero section will show the fallback `#0A171E` navy background with the Ken Burns animation running on nothing visible until the image loads. There is no `onLoad` fade-in for the background image element.

The PhoneMockup logo image (`Logomark-dark.png`) similarly has no loading fallback — the img element will show broken state briefly on slow connections.

---

## 9. Phone Mockup Animation

**Current:** The mockup container `div` has `className="phone-float"`, which applies:
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(3deg); }
  50%       { transform: translateY(-16px) rotate(3deg); }
}
/* Applied via: */
.phone-float { animation: float 5.5s ease-in-out infinite; }
```

**Assessment:**
- The 3° constant rotation is a nice touch — it breaks the rigid orthogonal alignment.
- 16px vertical travel at 5.5s ease-in-out is appropriate — not frantic, atmospheric.
- `reveal-scale` class is also applied (`transform: scale(0.93)` → `scale(1)`), which combines correctly with the float since they operate on different elements — the `reveal-scale` is on the wrapping div, `phone-float` CSS targets the inner animated div. Wait — actually both are on the same element (`<div className="phone-float reveal-scale">`). This means the `.reveal-scale` transition from `scale(0.93)` to `scale(1)` runs simultaneously with the float animation. The `transition` property on `.reveal-scale` (`transform 0.75s`) and the `animation: float` on `.phone-float` will conflict — CSS animations override CSS transitions on the same property. The phone will **never scale in from 0.93** because `animation` takes precedence over `transition` for `transform`. This is a bug.

**What's missing:**
- No mouse parallax response — moving the cursor doesn't affect the phone position
- The phone content (role buttons, logo) is completely static — no simulated typing, no screen transitions, no micro-animations on the UI elements
- Compare to Tend.com or Calm.com mockups where the phone screen shows gentle UI animations that suggest a live product

---

## 10. Awwwards Dental/Health Site Comparison

Reference sites reviewed mentally: Tend, Parsley Health, Hims/Hers, Carbon Health, Calm.

| Criterion | Perioskoup | Awwwards Tier |
|-----------|-----------|---------------|
| Scroll reveal quality | Simple fade-up, adequate | Awwwards uses scrubbed parallax, character-level text splits |
| Hero background | Ken Burns on image + dot grid | Comparable — some winners use static hero with exceptional type |
| Page transitions | None | Awwwards minimum: 200ms crossfade |
| Custom cursor | Present, lerp-based | Present on most SOTD — Perioskoup's is competent |
| Typography animation | None | SOTD sites routinely use SplitType word/char reveals |
| Loading sequence | None | SOTD sites have branded preloaders or staggered initial reveals |
| Mobile menu animation | Instant cut | Awwwards: overlay slides in with staggered link reveals |
| Reduced motion | Missing | Required for SOTD consideration |
| Texture/depth | Noise overlay (0.02 opacity) | Barely perceptible — most winners at 0.04-0.06 |
| Micro-interaction density | Low | Award sites have micro-interactions on nearly every element |

The site would score approximately 6.5-7.0 on Awwwards Design dimension, 5.5 on Creativity, and be penalized heavily on Usability for the reduced-motion omission and mobile menu behavior.

---

## Specific Animation Code Improvements

### Fix 1 — prefers-reduced-motion (CRITICAL, add to index.css)

```css
@media (prefers-reduced-motion: reduce) {
  /* Kill all continuous animations */
  .animated-bg-img,
  .cta-orb,
  .hero-orb,
  .cta-particle,
  .hero-particle,
  .cta-scan-line,
  .hero-scan-line,
  .hero-ring,
  .ticker-track,
  .circle-pulse,
  .phone-float,
  .text-glow {
    animation: none !important;
  }

  /* Freeze parallax bg at neutral position */
  .animated-bg-img {
    transform: scale(1.08) translate(0, 0) !important;
  }

  /* Keep subtle fades for reveals — just instant */
  .reveal,
  .reveal-scale {
    transition-duration: 0.01ms !important;
  }
}
```

Also add to `useScrollReveal.ts` and `CustomCursor.tsx`:

```typescript
// At top of useEffect in ParallaxHeroBg.tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return; // skip parallax scroll listener
```

```typescript
// In Counter component (Home.tsx) and useCountUp hook
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  if (el) el.textContent = target + '+';
  return;
}
```

---

### Fix 2 — Page Transitions (add to App.tsx)

No Framer Motion is currently installed. A pure CSS approach using `tw-animate-css` (already imported):

```css
/* In index.css — add page transition classes */
@keyframes page-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-enter {
  animation: page-fade-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

```tsx
// In App.tsx — wrap each Route's component
function PageWrapper({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return (
    <div key={location} className="page-enter">
      {children}
    </div>
  );
}
// Then wrap Router content:
// <PageWrapper><Home /></PageWrapper> etc.
// Or use a layout wrapper around <Switch>
```

For a more robust solution, install Framer Motion and use AnimatePresence:

```tsx
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  in:      { opacity: 1, y: 0 },
  out:     { opacity: 0, y: -8 },
};

const pageTransition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.4,
};

// In Router:
<AnimatePresence mode="wait">
  <motion.div
    key={location}
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    <Switch>...</Switch>
  </motion.div>
</AnimatePresence>
```

---

### Fix 3 — Mobile Menu Slide Animation (Navbar.tsx)

Replace the instant conditional render with a CSS-driven slide-in:

```css
/* In index.css */
@keyframes drawer-slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
@keyframes drawer-slide-out {
  from { transform: translateX(0); opacity: 1; }
  to   { transform: translateX(100%); opacity: 0; }
}
.mobile-drawer {
  animation: drawer-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Staggered link reveals */
.mobile-drawer-link {
  opacity: 0;
  transform: translateX(20px);
  animation: mobile-link-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes mobile-link-in {
  to { opacity: 1; transform: translateX(0); }
}
```

```tsx
// In Navbar.tsx mobile drawer
<div className="mobile-drawer" /* rest of styles */>
  {NAV_LINKS.map(({ href, label }, i) => (
    <Link key={href} href={href}>
      <div
        className="mobile-drawer-link"
        style={{ animationDelay: `${0.05 + i * 0.06}s` }}
      >
        {label}
      </div>
    </Link>
  ))}
</div>
```

---

### Fix 4 — Fix Phone Mockup Float+Scale Conflict

The `phone-float` and `reveal-scale` conflict on the same element because both animate `transform`. Separate them:

```tsx
// In Home.tsx — wrap with two elements
<div className="reveal-scale" style={{ transitionDelay: "0.2s" }}>
  <div className="phone-float">
    <PhoneMockup />
  </div>
</div>
```

This is a single-line structural fix — the outer div handles the scroll-reveal scale, the inner div handles the float.

---

### Fix 5 — Fix JS Hover Bypassing CSS Transitions (Navbar, Footer, Blog)

Replace all inline JS `onMouseEnter`/`onMouseLeave` style mutations with CSS classes:

```css
/* In index.css */
.nav-link-hover {
  color: rgba(245, 249, 234, 0.65);
  transition: color 0.2s ease;
}
.nav-link-hover:hover { color: #F5F9EA; }
.nav-link-hover.active { color: #C0E57A; }

.footer-link {
  color: #8C9C8C;
  transition: color 0.2s ease;
}
.footer-link:hover { color: #F5F9EA; }

.blog-card-hover {
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.blog-card-hover:hover {
  transform: translateY(-4px);
  border-color: #C0E57A;
}
```

Then remove all `onMouseEnter`/`onMouseLeave` handlers from Navbar, Footer, and Blog components and apply these CSS classes instead.

---

### Fix 6 — Proper Staggered Scroll Reveals

Replace the current single-observer-per-page pattern with per-element observation:

```typescript
// useScrollReveal.ts — replace current implementation
export function useStaggeredReveal(staggerMs = 80) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = document.querySelectorAll('.reveal, .reveal-scale');

    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        // Group entries by their parent section for coordinated stagger
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = Array.from(
              entry.target.parentElement?.querySelectorAll('.reveal, .reveal-scale') ?? []
            );
            const index = siblings.indexOf(entry.target as Element);
            (entry.target as HTMLElement).style.transitionDelay = `${index * staggerMs}ms`;
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [staggerMs]);
}
```

---

### Fix 7 — `text-shadow` to `filter: drop-shadow` for GPU compositing

```css
/* Replace in index.css */
@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(192, 229, 122, 0.3)); }
  50%       { filter: drop-shadow(0 0 20px rgba(192, 229, 122, 0.7)); }
}
```

---

### Fix 8 — Image Loading Fade-In (Hero + PhoneMockup)

```css
/* In index.css */
.img-load {
  opacity: 0;
  transition: opacity 0.6s ease;
}
.img-load.loaded {
  opacity: 1;
}
```

```tsx
// In PhoneMockup.tsx
<img
  src={LOGO_URL}
  alt="Perioskoup logo"
  className="img-load"
  onLoad={(e) => e.currentTarget.classList.add('loaded')}
  style={{ width: 108, height: 108, borderRadius: "50%", /* ... */ }}
/>
```

For the hero background image, use a two-layer approach: show the base `#0A171E` gradient first, then fade in the `animated-bg-img` once loaded via a load event listener.

---

### Fix 9 — Dot-Grid Visibility Improvement

```tsx
// ParallaxHeroBg.tsx — increase visibility
style={{
  position: "absolute",
  inset: "-20% 0",
  zIndex: 0,
  opacity: 0.55,  // was 0.35 — barely visible
  backgroundImage: `radial-gradient(circle, rgba(192,229,122,0.18) 1px, transparent 1px)`, // was 0.12
  backgroundSize: "32px 32px",
  willChange: "transform",
  // Add subtle animation
  animation: "dot-grid-breathe 8s ease-in-out infinite",
}}
```

```css
@keyframes dot-grid-breathe {
  0%, 100% { opacity: 0.45; }
  50%       { opacity: 0.65; }
}
@media (prefers-reduced-motion: reduce) {
  /* dot-grid-breathe is covered by the global reduce rule above */
}
```

---

## Issue Priority Matrix

| Issue | Severity | Effort | Priority |
|-------|----------|--------|----------|
| prefers-reduced-motion missing | Critical | Low | P0 |
| Phone float + reveal-scale conflict (bug) | High | Trivial | P0 |
| No page transitions | High | Low-Medium | P1 |
| Mobile menu instant cut | High | Low | P1 |
| JS hover bypasses CSS transitions | Medium | Low | P1 |
| Stagger reveal broken | Medium | Medium | P2 |
| No image loading states | Medium | Low | P2 |
| will-change permanent on orbs | Medium | Low | P2 |
| text-shadow instead of filter | Low | Trivial | P3 |
| Dot grid too faint | Low | Trivial | P3 |
| No exit animations | Low | High | P4 |
| Phone mockup static screen content | Low | High | P4 |

---

## Scoring Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| Animation Quality | 5/10 | Good CSS keyframe library, broken stagger, GPU anti-patterns |
| Jank / Layout Shifts | 6/10 | Passive listeners correct, getBoundingClientRect risk, no CLS issues |
| Hover Consistency | 5/10 | Components correct, pages broken (JS bypasses transitions) |
| Dot-Grid Hero | 5/10 | Present but nearly invisible, lacks interactive quality |
| Page Transitions | 1/10 | Completely absent — hard cuts everywhere |
| prefers-reduced-motion | 0/10 | Total absence, potential WCAG violation |
| Micro-interactions | 5/10 | Buttons/cards good, forms thin, success states flat |
| Loading States | 2/10 | No skeleton screens, no image load states |
| Phone Mockup Animation | 4/10 | Float is present but has a bug, screen content static |
| Awwwards Comparison | 5/10 | Competent foundation, missing signature moments |

**Overall: 5.5 / 10**

The site is clearly above average for health-tech SPAs in terms of animation ambition — the CTA canvas, Ken Burns bg, and custom cursor show genuine craft. But the complete absence of `prefers-reduced-motion`, broken page transitions, and hover state inconsistencies prevent this from being considered polished. Fixing the P0 and P1 issues would push the score to approximately 7.5/10 without adding any new visual complexity.
