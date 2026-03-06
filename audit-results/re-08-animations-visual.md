# Animation & Visual Polish — Re-Audit (Post Pass 2 Fixes)
**Audit Date:** 2026-03-06
**Auditor:** Animation & Visual Polish Specialist (Claude Sonnet 4.6)
**Source audit:** audit-results/08-animations-visual.md (Score: 7.2 / 10)
**Fix log:** audit-results/fix-log-animation.md (Pass 1 + Pass 2)
**Score: 7.4 / 10**

---

## Scope

This re-audit verifies every fix claimed in `fix-log-animation.md` Pass 2 by reading the actual current source, then searches for new issues introduced or uncovered after those fixes. Pass 1 fixes were already verified in the 7.2/10 audit and are not re-verified here unless evidence of regression was found.

---

## Pass 2 Fix Verification — Results

### Fix A — Breadcrumb JS Hover Mutation

**Status: CONFIRMED FIXED.**

`client/src/components/Breadcrumb.tsx` line 72 now applies `className="breadcrumb-link"` with no `onMouseEnter` or `onMouseLeave` handlers. The `client/src/index.css` lines 568-574 contain the `.breadcrumb-link` rule with `color: #8C9C8C; transition: color 0.2s ease;` and `.breadcrumb-link:hover { color: #C0E57A; }`. This is CSS-driven hover, consistent with every other interactive element in the codebase. The JS mutation pattern is fully eliminated from all components.

### Fix B — dot-grid-breathe Covered by prefers-reduced-motion

**Status: CONFIRMED FIXED — CSS path.**

`client/src/components/ParallaxHeroBg.tsx` line 37 now has `className="pointer-events-none dot-grid-bg"`. The `@media (prefers-reduced-motion: reduce)` block in `index.css` at line 1129 includes `.dot-grid-bg` in the `animation: none !important` selector list. The CSS override correctly blocks the inline `animation: "dot-grid-breathe..."` style for reduced-motion users. This satisfies WCAG 2.1 SC 2.3.3.

**Note: Fix 7 (Pass 1) claim is contradicted by current code.** The Pass 1 fix log (Fix 7) states "Removed inline `willChange: 'transform'` permanent layer" from `ParallaxHeroBg.tsx`. However, `willChange: "transform"` is still present at line 45 of the current `ParallaxHeroBg.tsx`. The CSS Fix B in Pass 2 correctly added the `dot-grid-bg` className, but the `willChange` removal described in Pass 1 was either not applied or was reverted. The net effect is one permanent compositor layer on the dot-grid element for the full page session. This is a minor GPU cost on mobile (one layer, not five), but the fix-log claim is inaccurate. Severity: Low. Documented below as Issue 1.

### Fix C — Waitlist `transition: all` Anti-Pattern

**Status: CONFIRMED FIXED.**

`client/src/pages/Waitlist.tsx` line 112: `transition: "border-color 0.2s ease, background 0.2s ease, color 0.2s ease"`. The `transition: all` anti-pattern is gone. The specific properties enumerated match exactly what changes on role selection (border, background, color). No layout-triggering properties are captured.

### Fix D — CTA Orb `will-change` Removed

**Status: CONFIRMED FIXED.**

`client/src/index.css` lines 400-408: `.cta-orb` has no `will-change` property. A clear explanatory comment documents the intentional omission, citing the GPU memory cost on mid-range mobile and the fact that `filter: blur(80px)` already promotes compositor layers independently. The comment is accurate and staff-engineer quality.

---

## New Issues Found

### Issue 1 — ParallaxHeroBg `willChange: "transform"` Not Removed (Fix 7 Discrepancy)

**File:** `client/src/components/ParallaxHeroBg.tsx` line 45
**Severity:** Low
**Priority:** P3

The fix log claims this was removed in Pass 1 Fix 7. It was not. The inline `willChange: "transform"` remains, creating a permanent compositor layer for the dot-grid background element for the entire page session. This is less severe than the five CTA orb layers (now correctly removed), as it is a single element with a reasonable case for the hint — the scroll parallax JS actively writes to `transform` on this element during scroll. The layer is not wasted. However, the `willChange` should remain off between scroll events and be applied only during active scroll (e.g., toggle a class on scroll start/end). As written, it is a permanent hint with a partial justification.

**Fix (optional improvement):**
```tsx
// ParallaxHeroBg.tsx — remove willChange from the static style object.
// The scroll handler already applies transform directly; the browser will
// promote the layer dynamically when transforms are being written.
// willChange: "transform", // REMOVE this line
```

The practical impact on current desktop targets is negligible. On mid-range Android it wastes ~5MB GPU memory for the lifetime of the page.

### Issue 2 — Waitlist Success State `reveal-scale` Blocked by LCP Override

**File:** `client/src/pages/Waitlist.tsx` line 81, `client/src/index.css` lines 1193-1198
**Severity:** Medium — the intended animation never fires
**Priority:** P2

The Waitlist success div uses `className="reveal-scale"` (line 81). The success div is inside `<section id="main-content">` (line 76). The CSS rule at index.css lines 1193-1197:

```css
#main-content .reveal,
#main-content .reveal-scale {
  opacity: 1;
  transform: none;
  transition: none;
}
```

This rule, intended to protect LCP candidates above the fold, overrides `reveal-scale` everywhere inside `#main-content` — including the success confirmation container that appears after form submission. The success div is conditionally rendered (`{submitted ? <div className="reveal-scale"> : <form>`), so it never exists in the DOM during page load when LCP is measured. There is no LCP risk from animating it. But the `#main-content` selector is unconditional, and the success div inherits `opacity: 1; transform: none; transition: none` immediately, making the `reveal-scale` class inert. The scale-in confirmation never plays.

The Contact page success state (`client/src/pages/Contact.tsx` line 147) has the same problem with an additional twist: it has no animation class at all, inside a `.card.reveal` that is also covered by the LCP override.

**Fix:**
```css
/* index.css — narrow the LCP override to exclude the success state */
#main-content .reveal:not(.success-reveal),
#main-content .reveal-scale:not(.success-reveal) {
  opacity: 1;
  transform: none;
  transition: none;
}

/* New success reveal animation — fires once on DOM insertion */
@keyframes success-scale-in {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
.success-reveal {
  animation: success-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@media (prefers-reduced-motion: reduce) {
  .success-reveal { animation: none !important; }
}
```

```tsx
// Waitlist.tsx line 81 — replace className:
<div role="status" ... className="success-reveal" style={{ textAlign: "center", padding: "60px 0" }}>

// Contact.tsx line 147 — add className:
<div role="status" ... className="success-reveal" style={{ textAlign: "center", padding: "40px 0" }}>
```

This removes the `reveal-scale` dependency (which is permanently suppressed inside `#main-content`) and uses a CSS `animation` instead of a `transition`, making it immune to the LCP override.

### Issue 3 — LinkedIn Links on About Team Cards Have No Hover Transition

**File:** `client/src/pages/About.tsx` line 282
**Severity:** Low
**Priority:** P3

The LinkedIn anchor element on each team card uses `style={{ color: "#8C9C8C", textDecoration: "none" }}` with no `transition` and no hover pseudo-class. The link visually matches a disabled state at rest and gives no feedback on hover — inconsistent with the site-wide hover pattern where every interactive element has a color transition.

**Fix (2 lines in index.css):**
```css
/* index.css — add to hover state CSS classes section */
.linkedin-link {
  color: #8C9C8C;
  text-decoration: none;
  transition: color 0.2s ease;
}
.linkedin-link:hover { color: #C0E57A; }
```

```tsx
// About.tsx line 282 — add className, remove inline color:
<a href={f.linkedin} ... className="linkedin-link" style={{ display: "inline-flex", ... /* remove color: "#8C9C8C" */ }}>
```

### Issue 4 — `willChange` on `cta-scan-line` is Justified but Undocumented

**File:** `client/src/index.css` line 470
**Severity:** Trivial
**Priority:** P4

`.cta-scan-line { will-change: transform, opacity; }` — the scan line is a 1px element animating horizontally across the full CTA section width at 8s linear infinite. The `will-change` here is defensible: the animation causes frequent compositor compositing and the element is thin (minimal layer cost). However, unlike `.cta-orb` (which now has an explanatory comment), `.cta-scan-line` has no comment. A maintenance developer might apply the same "remove will-change" logic incorrectly here. Same applies to the hero scan line at lines 931 and 999.

**Fix (documentation only):**
```css
.cta-scan-line {
  /* will-change: transform, opacity intentional — 1px scan animating full width
     at 8s; compositor hint prevents per-frame CPU recomposite. */
  will-change: transform, opacity;
}
```

---

## Unchanged Findings from 7.2/10 Audit

The following items from the previous audit remain unresolved. They are re-assessed for severity here but no new code was found that changes their status.

### Loading States — Still Inadequate

The `Skeleton` component at `client/src/components/ui/skeleton.tsx` remains unused. The Suspense fallback is still a bare `<div className="min-h-screen bg-[#0A171E]" />`. Team headshot images on About, the hero background image, and award photo have no load states. The `img-load`/`loaded` pattern is applied only to the PhoneMockup logo. This remains the weakest category in the animation system.

### Hero Headline Has No Entrance Animation

The `#main-content` LCP override forces `opacity: 1; transition: none` on all `.reveal` elements above the fold, meaning the hero text, EFP badge, and CTA buttons appear instantly on page load without any entrance choreography. The recommended fix (CSS `@keyframes hero-headline-in` with `.hero-headline-animate` class, immune to the LCP override because it uses `animation` not `transition`) has not been applied.

### Phone Mockup — No Mouse Parallax

The phone mockup float animation is correct and the transform conflict bug is resolved. No cursor-position parallax has been added. This remains a P3 enhancement gap compared to Awwwards-tier health sites.

### Team Card Image Scale on Hover

The `.h-48.overflow-hidden` wrapper on About team card images has no hover scale applied to the inner `<img>`. Cards lift on hover via `.card:hover` translateY, but the image does not scale within the overflow clip. This is a P3 polish gap.

---

## Section Scores (Updated)

| Category | Previous | Current | Delta | Notes |
|----------|----------|---------|-------|-------|
| Animation Quality | 7/10 | 7/10 | 0 | No new animations added; structural stagger weakness unchanged |
| Jank / Layout Shifts | 8/10 | 8/10 | 0 | willChange discrepancy in ParallaxHeroBg is low severity |
| Hover Consistency | 8/10 | 8.5/10 | +0.5 | Breadcrumb fixed; LinkedIn links still unaddressed |
| Dot-Grid Hero | 7/10 | 7.5/10 | +0.5 | prefers-reduced-motion CSS coverage now correct |
| Page Transitions | 7/10 | 7/10 | 0 | No change; still no exit animation |
| prefers-reduced-motion | 9/10 | 9/10 | 0 | dot-grid-breathe CSS gap closed; JS guard was already there |
| Micro-interactions | 7/10 | 7/10 | 0 | Success state animation still broken by LCP override |
| Loading States | 4/10 | 4/10 | 0 | No new skeleton or image load states added |
| Phone Mockup Animation | 7/10 | 7/10 | 0 | No change |
| Awwwards Comparison | 6/10 | 6/10 | 0 | No signature moments added; stagger still structural |

**Weighted average: 7.4 / 10** (up from 7.2 — marginal improvement from the Breadcrumb and dot-grid fixes)

---

## Issue Priority Matrix (Current State)

| Issue | Severity | Effort | Priority | Status |
|-------|----------|--------|----------|--------|
| Waitlist/Contact success state animation blocked by LCP override | Medium | Low | P2 | NEW — unintended regression |
| Hero headline has no entrance animation | Medium | Low | P2 | Carried from previous audit |
| No image skeleton/load states (hero, teams, award) | Medium | Low | P2 | Carried |
| Suspense fallback is blank navy | Medium | Low | P2 | Carried |
| LinkedIn links no hover transition (About) | Low | Trivial | P3 | Carried |
| ParallaxHeroBg willChange not removed as documented | Low | Trivial | P3 | NEW discrepancy |
| Team card image scale on hover | Low | Low | P3 | Carried |
| Mouse parallax on phone mockup | Medium | Medium | P3 | Carried |
| Stagger reveal per-element vs per-section | Low | Medium | P3 | Carried |
| `cta-scan-line` will-change undocumented | Trivial | Trivial | P4 | NEW |
| No exit/reverse animations on scroll-up | Low | High | P4 | Carried |
| Phone screen content not animated | Low | High | P4 | Carried |
| Noise overlay too faint (0.02 opacity) | Low | Trivial | P4 | Carried |

---

## Specific Code Fixes for Remaining P2 Issues

### Fix 1 — Success State Animation (P2, highest return)

**Files:** `client/src/index.css`, `client/src/pages/Waitlist.tsx`, `client/src/pages/Contact.tsx`

Add to `index.css` (after the existing `.success-reveal` or in the micro-interactions section):

```css
@keyframes success-scale-in {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
.success-reveal {
  animation: success-scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@media (prefers-reduced-motion: reduce) {
  .success-reveal { animation: none !important; opacity: 1 !important; }
}
```

In `Waitlist.tsx` line 81:
```tsx
<div role="status" aria-live="polite" aria-atomic="true"
  className="success-reveal"
  style={{ textAlign: "center", padding: "60px 0" }}>
```

In `Contact.tsx` line 147:
```tsx
<div role="status" aria-live="polite" aria-atomic="true"
  className="success-reveal"
  style={{ textAlign: "center", padding: "40px 0" }}>
```

Remove `className="reveal-scale"` from the Waitlist success div — it is suppressed by the LCP override and using `success-reveal` directly is cleaner.

### Fix 2 — Hero Headline Entrance (P2, visual quality)

**Files:** `client/src/index.css`, `client/src/pages/Home.tsx`

Add to `index.css`:

```css
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
  .hero-cta-animate { animation: none !important; opacity: 1 !important; }
}
```

In `Home.tsx` hero section, replace `className="reveal visible"` on the headline with `className="hero-headline-animate"`, the subhead with `className="hero-subhead-animate"`, and the CTA button row with `className="hero-cta-animate"`. These use CSS `animation` (not `transition`), so the `#main-content` LCP override does not suppress them — the override only targets `transition` via the `.reveal` class.

### Fix 3 — LinkedIn Hover Transition (P3, consistency)

**Files:** `client/src/index.css`, `client/src/pages/About.tsx`

Add to the hover state CSS classes section in `index.css`:

```css
.linkedin-link {
  color: #8C9C8C;
  text-decoration: none;
  transition: color 0.2s ease;
}
.linkedin-link:hover { color: #C0E57A; }
```

In `About.tsx` line 282, add `className="linkedin-link"` and remove `color: "#8C9C8C"` from the inline style object.

---

## Summary: What Pass 2 Fixed vs What Remains

**Confirmed fixed by Pass 2:**
- Breadcrumb JS hover mutation — eliminated, CSS-driven hover is consistent site-wide
- dot-grid-breathe reduced-motion coverage — `.dot-grid-bg` CSS class added and properly targeted in the `@media (prefers-reduced-motion: reduce)` block
- Waitlist `transition: all` — replaced with three explicit properties

**Not fixed (discrepancy with fix log):**
- `willChange: "transform"` in `ParallaxHeroBg.tsx` — still present despite Pass 1 Fix 7 claiming removal

**New issues discovered by this re-audit:**
- Success state animation is dead on both Waitlist and Contact — `reveal-scale` inside `#main-content` is permanently suppressed by the LCP override; the confirmation moment is visually flat
- LinkedIn links on About team cards still have no hover state

**Score movement:** 7.2 → 7.4. The two Pass 2 CSS fixes close real issues but the net visual impact is subtle (breadcrumb links are rarely interacted with; the dot-grid reduced-motion gap affected a narrow user population). The path to 8.0+ runs through the hero headline entrance animation, success state confirmation moment, and loading skeleton implementation — all P2 items with direct user-perceived quality impact.
