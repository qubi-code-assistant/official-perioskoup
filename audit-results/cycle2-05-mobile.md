# Mobile Responsiveness Audit — Cycle 2
**Auditor:** Mobile-Responsive Subagent (Claude Sonnet 4.6)
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Previous scores:** Cycle 1 = 7.5/10, Re-audit after fixes = 8.6/10
**Scope:** Full fresh read of every page, component, and CSS file

---

## Executive Summary

This is a full ground-up re-audit of every file. The codebase has improved significantly from the original 7.5/10 baseline. The Navbar now uses pure Tailwind breakpoints, all major grids are responsive, `100vh` is gone everywhere, the custom cursor correctly guards against touch devices, and the PhoneMockup is properly constrained. However, a cluster of recurring issues persists: (1) hardcoded `paddingTop: 140` / `paddingBottom: 80/100/120` on every secondary page hero section — not fluid; (2) three Blog.tsx and two Pricing/Contact.tsx section paddings still use fixed pixel values; (3) the BlogPost.tsx "not found" fallback has a hardcoded `fontSize: "80px"` heading and `paddingTop: "160px"` that will overflow on mobile; (4) the Features hero uses a hardcoded `paddingTop: "120px"` overriding the `.section` class; (5) the Footer grid uses `gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))"` which collapses gracefully but is an inline style; (6) the Contact form card has `padding: 40` inline — tight on mobile; (7) `display-lg` line-height of 0.93 is tight for the Blog h1 at 320px. No P0 (layout-breaking) issues remain. All remaining issues are P2/P3.

**Overall Score: 8.6 / 10**

The score is unchanged from re-audit because the same P2 issues identified then remain unfixed.

---

## 1. Navigation — Navbar.tsx

### Status: PASS

**Current implementation verified:**
- Desktop nav: `className="hidden md:flex items-center gap-0.5"` — pure Tailwind. No inline `<style>` block. PASS.
- Hamburger button: `className="flex md:hidden items-center justify-center"` with `width: "44px", height: "44px"` inline style for exact touch target sizing. PASS (44px minimum met).
- Desktop CTA: `className="btn-primary hidden md:inline-flex"`. PASS.
- Mobile drawer font: `fontSize: 'clamp(36px, 10vw, 48px)'`. At 280px: 28px → floor 36px. At 320px: 32px → floor 36px. At 375px: 37.5px. PASS.
- Body scroll lock: `document.body.style.overflow = menuOpen ? 'hidden' : ''`. PASS.
- Focus trap: Full implementation with Escape-key close, first-focusable-focus on open, Tab cycling. PASS.
- Route-change close: `useEffect(() => { setMenuOpen(false); }, [location])`. PASS.
- `aria-expanded`, `aria-controls`, `aria-label`, `role="dialog"`, `aria-modal`. PASS.

**Issue NAV-01 (P3 — Low):** The mobile drawer CTA button renders `<span className="btn-primary">` inside a `<Link>`. The `<span>` has `style={{ width: '100%', justifyContent: 'center', display: 'flex', padding: '16px 24px' }}`. `.btn-primary` is `display: inline-flex` by default. The outer `<Link>` is block-level. This works but the explicit `display: 'flex'` on the span overrides the CSS class value unnecessarily. The touch target height is `16px + 16px + 22px font = ~54px`. PASS on touch target.

No navigation issues at standard mobile viewports (375px+). At 280px the nav links (longest: "For Dentists") at `clamp(36px, 10vw, 48px)` = 36px with 24px container padding = 232px available, well within the link width. PASS.

---

## 2. Hero Section — Home Page (Home.tsx)

### Status: PASS

**Current state at each viewport:**

**320px:** Hero `minHeight: "100svh"` with `paddingTop: "clamp(80px, 12vw, 120px)"` → `12vw = 38.4px` → clamped to minimum **80px**. Sufficient clearance for 64px navbar. H1 at `fontSize: "clamp(52px, 7vw, 96px)"` → `7vw = 22.4px` → clamped to **52px** with `lineHeight: 1.0`. "Between visits, we take over." = two lines at 52px. Readable. PASS.

**EFP Badge:** `flexWrap: "wrap" as const` present, no `whiteSpace: "nowrap"`. PASS.

**CTA row:** `style={{ display: "flex", gap: 16, flexWrap: "wrap" }}`. Buttons wrap at 320px. Both buttons have `padding: "16px 32px"` → height ≈ 54px. Touch target pass. PASS.

**PhoneMockup wrapper:** `className="w-full max-w-[300px] sm:max-w-[340px] mx-auto px-2"`. PhoneMockup itself has `width: 340, maxWidth: "100%"`. The `px-2` (8px each side) provides breathing room for the ±5px side buttons. PASS.

**Stats row:** `className="reveal flex flex-wrap gap-6 lg:gap-10"`. Stats wrap correctly at 320px. Individual stat values at `fontSize: 44` Dongle — readable. Three stats side-by-side at 44px Dongle do not fit at 320px and will wrap to 1-per-row. This is acceptable layout. PASS.

**Issue HERO-01 (P3 — Low):** The stats row uses `flex-wrap` which causes uneven wrapping (2+1 or 3 on separate rows depending on stat value width). At 375px and above, all three stats fit side-by-side. The inconsistency at 320px is cosmetic only.

Fix (optional):
```tsx
<div className="reveal grid grid-cols-3 gap-4 lg:gap-10" style={{ transitionDelay: "0.4s" }}>
```
This forces a 3-column layout at all sizes but reduces stat font effective width. Test first.

**EFP Award card (lines 181-219):**
- Photo: `className="relative min-h-[240px] md:min-h-[420px] overflow-hidden"`. PASS.
- Right panel: `className="bg-[#1D3449] p-6 md:p-12 flex flex-col gap-0"`. On mobile: 24px padding. PASS.
- Grid: `className="reveal grid grid-cols-1 md:grid-cols-2"`. Stacks on mobile. PASS.

---

## 3. Secondary Page Hero Sections — Hardcoded paddingTop/paddingBottom

### Status: FAIL (P2 — all secondary pages)

Every secondary page uses a hero section pattern with hardcoded numeric padding. These are confirmed in the current code:

| File | Line | Current Value | Issue |
|------|------|---------------|-------|
| `About.tsx` | 115 | `paddingTop: 140, paddingBottom: 80` | Fixed values |
| `ForDentists.tsx` | 74 | `paddingTop: 140, paddingBottom: 80` | Fixed values |
| `Blog.tsx` | 175 | `paddingTop: "140px", paddingBottom: "80px"` | Fixed values |
| `Waitlist.tsx` | 76 | `paddingTop: 140, paddingBottom: 120` | Fixed values |
| `Contact.tsx` | 101 | `paddingTop: 140, paddingBottom: 80` | Fixed values |
| `Pricing.tsx` | 87 | `paddingTop: 140, paddingBottom: 80` | Fixed values |
| `NotFound.tsx` | 22 | `paddingTop: 180, paddingBottom: 120` | Fixed values |
| `Privacy.tsx` | 40 | `paddingTop: 140, paddingBottom: 100` | Fixed values |
| `Terms.tsx` | 41 | `paddingTop: 140, paddingBottom: 100` | Fixed values |
| `Features.tsx` | 65 | `paddingTop: "120px"` (overrides `.section`) | Fixed value |

**Analysis:** `paddingTop: 140` is necessary to clear the 64px fixed navbar (64px + ~76px breathing room). The bottom paddings are decorative and do not need to be as large on mobile. At 320px mobile (568px screen height), `paddingBottom: 120` consumes 21% of screen height as pure whitespace below the hero. `paddingBottom: 80` consumes 14%.

**The paddingTop value:** `paddingTop: 140` at 320px is not ideal but functionally required — it must clear the 64px navbar. A clamp with a 120px floor still clears the navbar and feels proportional on ultra-narrow screens.

**Fix for all secondary page heroes:**
```tsx
// Replace hardcoded paddingTop: 140 with:
paddingTop: "clamp(120px, 14vw, 160px)"
// Replace paddingBottom: 80 with:
paddingBottom: "clamp(48px, 6vw, 80px)"
// Replace paddingBottom: 100 with:
paddingBottom: "clamp(56px, 7vw, 100px)"
// Replace paddingBottom: 120 with:
paddingBottom: "clamp(64px, 8vw, 120px)"

// For NotFound.tsx paddingTop: 180:
paddingTop: "clamp(120px, 16vw, 180px)"
```

**Fix for Features.tsx (line 65):** The `.section` class already provides `padding-top: clamp(64px, 8vw, 120px)`. The inline `paddingTop: "120px"` overrides this to a fixed value:
```tsx
// Current:
<section id="main-content" className="section" style={{ minHeight: "55vh", display: "flex", alignItems: "center", paddingTop: "120px", ... }}>

// Fix — remove paddingTop from inline style and add a pt-[120px] override only at lg+:
<section id="main-content" className="section lg:pt-[120px]" style={{ minHeight: "55vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1, overflow: "hidden" }}>
```

---

## 4. Section Interior Paddings — Blog, Pricing, Contact, BlogPost

### Status: PARTIAL FAIL (P2)

These sections still use hardcoded fixed padding values despite the previous fix pass updating Home, About, ForDentists interior sections.

**Blog.tsx:**
| Line | Value | Impact at 320px |
|------|-------|-----------------|
| 194 | `paddingBottom: "80px"` | Featured posts section — 80px bottom gap |
| 239 | `padding: "60px 0"` | Waitlist CTA section — 60px each side (less severe) |
| 257 | `paddingBottom: "120px", paddingTop: "80px"` | All articles section — 200px total vertical padding |
| 302 | `padding: "80px 0"` | Newsletter section — 160px vertical padding |

**Pricing.tsx:**
| Line | Value | Impact at 320px |
|------|-------|-----------------|
| 113 | `padding: "80px 0"` | Beta notice + plans section — 160px vertical |
| 116 | `padding: "20px 28px"` | Beta notice card — 56px horizontal padding |
| 160 | `padding: "120px 0"` | FAQ section — 240px vertical padding |

**Contact.tsx:**
| Line | Value | Impact at 320px |
|------|-------|-----------------|
| 121 | `padding: "80px 0"` | Form section — 160px vertical |
| 145 | `padding: 40` | Form card — 80px horizontal padding consumed |

**BlogPost.tsx:**
| Line | Value | Impact at 320px |
|------|-------|-----------------|
| 910 | `padding: "80px 0"` | CTA section — 160px vertical |

**Fixes:**
```tsx
// Blog.tsx line 194:
style={{ paddingBottom: "clamp(48px, 6vw, 80px)" }}

// Blog.tsx line 239:
style={{ padding: "clamp(40px, 5vw, 60px) 0", background: "#050C10" }}

// Blog.tsx line 257:
style={{ paddingBottom: "clamp(64px, 8vw, 120px)", borderTop: "1px solid #234966", paddingTop: "clamp(48px, 6vw, 80px)" }}

// Blog.tsx line 302:
style={{ background: "#050C10", padding: "clamp(48px, 6vw, 80px) 0", borderTop: "1px solid #234966" }}

// Pricing.tsx line 113:
style={{ background: "#050C10", padding: "clamp(48px, 6vw, 80px) 0" }}

// Pricing.tsx line 116 (beta notice card):
style={{ ..., padding: "16px 20px" }}
// Or: className="... p-4 sm:p-[28px]"

// Pricing.tsx line 160:
style={{ padding: "clamp(64px, 8vw, 120px) 0" }}

// Contact.tsx line 121:
style={{ background: "#050C10", padding: "clamp(48px, 6vw, 80px) 0" }}

// Contact.tsx line 145 (form card):
style={{ padding: "24px" }}  // or use className="card p-6 sm:p-10 reveal"

// BlogPost.tsx line 910:
style={{ background: "#050C10", padding: "clamp(48px, 6vw, 80px) 0", borderTop: "1px solid #234966" }}
```

---

## 5. BlogPost.tsx — "Not Found" Fallback

### Status: FAIL (P2)

**Issue BLOGPOST-01 (P2):** The article-not-found fallback at line 754:
```tsx
<div style={{ paddingTop: "160px", paddingBottom: "120px", textAlign: "center" }}>
  <h1 style={{ fontFamily: "Dongle, sans-serif", fontSize: "80px", color: "#F5F9EA" }}>
    Article not found
  </h1>
```

The `fontSize: "80px"` is hardcoded. At 320px, "Article not found" at 80px Dongle is approximately 420px wide — wider than the available 272px content area. The text will not overflow (Dongle renders narrowly) but wraps to 3 lines.

The `paddingTop: "160px"` and `paddingBottom: "120px"` are not fluid.

**Fix:**
```tsx
<div style={{ paddingTop: "clamp(120px, 14vw, 160px)", paddingBottom: "clamp(64px, 8vw, 120px)", textAlign: "center" }}>
  <h1 style={{ fontFamily: "Dongle, sans-serif", fontSize: "clamp(48px, 8vw, 80px)", color: "#F5F9EA" }}>
    Article not found
  </h1>
```

---

## 6. Typography — Dongle Display Fonts

### Status: MOSTLY PASS — one remaining P3 concern

**Current CSS classes verified:**
```css
.display-xl  { font-size: clamp(52px, 11vw, 160px); line-height: 0.9; }
.display-lg  { font-size: clamp(44px, 8vw, 110px);  line-height: 0.93; }
.display-md  { font-size: clamp(36px, 5.5vw, 80px); line-height: 1.05; }
.display-sm  { font-size: clamp(32px, 4vw, 56px);   line-height: 1.05; }
.body-lg     { font-size: clamp(16px, 4vw, 18px);   line-height: 1.65; }
.body-md     { font-size: clamp(14px, 3.5vw, 16px); line-height: 1.6; }
```

All display classes use fluid `clamp()` values. The previous fixes correctly reduced:
- `.display-md` floor from 44px to 36px — PASS.
- `.body-lg` / `.body-md` made fluid — PASS.

**Issue TYPO-01 (P3 — Low):** `.display-lg` has `line-height: 0.93`. The Blog page h1 uses `<h1 className="display-lg reveal">` at line 183 with NO inline `lineHeight` override. At 320px, `display-lg` resolves to 44px with line-height 0.93. "Insights on dental health, AI, and care." wraps to 3 lines. The 0.93 line-height means descenders/ascenders overlap slightly at 44px. Cosmetically tight but not illegible.

The Features page h1 (line 71) does have `style={{ lineHeight: 1.05 }}` — correctly overriding the class. Blog page does not have this override.

**Fix:**
```css
/* In index.css — adjust display-lg globally: */
.display-lg { line-height: 1.0; }  /* was 0.93 */
```
Or apply `style={{ lineHeight: 1.0 }}` to Blog page h1 only.

**Issue TYPO-02 (P3 — Low):** Multiple headings use inline `clamp()` fontSizes instead of design system classes:
- `Home.tsx:231` — `fontSize: "clamp(48px, 5vw, 72px)"` — bypass of `.display-md`
- `Home.tsx:267` — `fontSize: "clamp(40px, 4.5vw, 64px)"` — bypass
- `Home.tsx:288` — `fontSize: "clamp(52px, 6vw, 80px)"` — bypass
- `ForDentists.tsx:80` — `fontSize: "clamp(56px, 7vw, 88px)"` — bypass
- Multiple other pages

Not layout-breaking — inline clamp values are fluid. Code quality issue only.

---

## 7. Grid Layouts

### Status: PASS — all major grids responsive

**Current state:**

| Grid | Implementation | Mobile Behaviour |
|------|----------------|-----------------|
| Home hero | `grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]` | Stacks — PASS |
| Home features bento | `grid grid-cols-1 md:grid-cols-3` | Stacks — PASS |
| Home How It Works | `grid grid-cols-1 md:grid-cols-3` | Stacks — PASS |
| Home EFP card | `grid grid-cols-1 md:grid-cols-2` | Stacks — PASS |
| About team | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` | Stacks — PASS |
| About mission | `grid grid-cols-1 lg:grid-cols-2` | Stacks — PASS |
| Features grid | `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3` | Stacks — PASS |
| ForDentists stats | `grid grid-cols-1 sm:grid-cols-3` | Stacks — PASS |
| ForDentists workflow | `grid grid-cols-1 md:grid-cols-3` | Stacks — PASS |
| ForDentists clinical tools | `flex flex-col sm:flex-row gap-4 sm:gap-7 p-5 sm:p-9` | Icon stacks above text — PASS |
| Blog featured posts | `grid grid-cols-1 md:grid-cols-2` | Stacks — PASS |
| Blog article rows | `flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6` | Stacks — PASS |
| Pricing plans | `grid grid-cols-1 sm:grid-cols-2` | Stacks — PASS |
| Waitlist role selector | `grid grid-cols-1 sm:grid-cols-2 gap-3` | Stacks — PASS |
| Waitlist name fields | `grid grid-cols-1 sm:grid-cols-2 gap-3` | Stacks — PASS |
| Contact layout | `grid grid-cols-1 lg:grid-cols-2` | Stacks — PASS |
| Contact name fields | `grid grid-cols-1 sm:grid-cols-2 gap-3` | Stacks — PASS |
| Footer | `gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))"` | Auto-collapse — see below |

**Issue GRID-01 (P3 — Low):** Footer uses `style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px' }}` inline. At 320px viewport (272px content): `minmax(160px, 1fr)` → one column (160px > 272px/2 = 136px). This actually works correctly — the footer collapses to a single column below ~340px and into 2 columns at ~380px. The `auto-fit` with `minmax(160px, 1fr)` produces:
- 320px: 1 column (272px < 320px for 2×160px)
- 375px: 2 columns (327px > 2×160px = 320px)
- 768px: 4 columns

This is acceptable behaviour. Not a hard breakpoint but functionally correct. A Tailwind equivalent would be `grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4` — but since Tailwind doesn't have `xs` by default, the auto-fit approach is pragmatic here.

---

## 8. PhoneMockup Component

### Status: PASS

- `width: 340, maxWidth: "100%"` — component respects container. PASS.
- Outer container: `className="w-full max-w-[300px] sm:max-w-[340px] mx-auto px-2"`. 300px on mobile, 340px on sm+, 8px breathing room for ±5px side buttons. PASS.
- Animation: `.phone-float` floats independently from `.reveal-scale` (separate div nesting). No transform conflict. PASS.
- `aspectRatio: "390 / 844"` on screen area — fluid scaling. PASS.

---

## 9. Form Inputs and Touch Targets

### Status: PASS

**`.p-input` class:**
```css
.p-input {
  width: 100%;
  padding: 14px 18px;
  font-size: 15px;
}
```
Height ≈ 14+14+15×1.4 = 49px. Exceeds 44px minimum. PASS.

**`.btn-primary` class:**
```css
.btn-primary {
  padding: 14px 28px;
  font-size: 15px;
}
```
Height ≈ 50px. PASS.

**Hamburger button:** `width: "44px", height: "44px"` — exactly 44px. PASS.

**Waitlist role buttons:** `padding: 20` → 40px internal height + font ≈ 60px total. PASS.

**Issue FORM-01 (P3 — Low):** Contact.tsx form card has `padding: 40` (line 145) inline. At 320px, 80px of horizontal padding (40px each side) leaves only 192px for form content. `.p-input` is `width: 100%` so it fills that 192px — fine for text input. But the card padding is not responsive.

Fix:
```tsx
// Replace style={{ padding: 40 }} with:
className="card reveal p-6 sm:p-10"
// Remove the inline padding from style prop entirely
```

---

## 10. Images — Responsive Behaviour

### Status: PASS

All `<img>` elements verified:
- Hero LCP image: `style={{ width: "100%", height: "100%", objectFit: "cover" }}`. PASS.
- EFP award photo (Home): inside `.min-h-[240px] md:min-h-[420px] overflow-hidden` container. PASS.
- EFP award photo (About): inside `.relative.min-h-[240px].md:min-h-[360px].overflow-hidden`. PASS.
- Team headshots: `style={{ width: "100%", height: "100%", objectFit: "cover" }}` inside `className="h-48 sm:h-56 lg:h-[280px] overflow-hidden relative"`. PASS.
- Author avatars: fixed 44×44 or 32×32 with explicit `width`/`height` HTML attributes. Decorative size — correct. PASS.
- Blog author images: fixed 32×32 and 36×36. Decorative size — correct. PASS.

No image overflow issues found. All images have `objectFit: "cover"` to prevent distortion.

---

## 11. Horizontal Scroll / Overflow

### Status: PASS

- `body { overflow-x: hidden }` is explicitly removed (noted in comment at line 194 of index.css). PASS.
- `.animated-bg-wrapper { overflow: hidden }` clips the 120% width animated background images. PASS.
- `.cta-bg-canvas { overflow: hidden }` clips the 700px CTA orbs. PASS.
- `.ticker-wrap { overflow: hidden }` clips the infinite ticker. PASS.
- All grids are now single-column on mobile via Tailwind responsive classes. PASS.

**Architectural note (OVERFLOW-01):** The `cta-bg-canvas { overflow: hidden }` dependency is load-bearing. If that class is ever removed or overridden, the 700px orbs would produce horizontal overflow. This is documented but not immediately fixable.

---

## 12. Viewport Height

### Status: PASS

Verified via grep — zero instances of `minHeight: "100vh"` remain anywhere in the codebase. All page root divs use `minHeight: "100svh"`:
- Home.tsx: `minHeight: "100svh"` — PASS
- Features.tsx: `minHeight: "100svh"` — PASS
- ForDentists.tsx: `minHeight: "100svh"` — PASS
- About.tsx: `minHeight: "100svh"` — PASS
- Blog.tsx: `minHeight: "100svh"` — PASS
- BlogPost.tsx (not found): `minHeight: "100svh"` — PASS
- Waitlist.tsx: `minHeight: "100svh"` — PASS
- Pricing.tsx: `minHeight: "100svh"` — PASS
- Contact.tsx: `minHeight: "100svh"` — PASS
- NotFound.tsx: `minHeight: "100svh"` — PASS
- Privacy.tsx: `minHeight: "100svh"` — PASS
- Terms.tsx: `minHeight: "100svh"` — PASS

The hero section in Home.tsx additionally has `minHeight: "100svh"` directly (not just the wrapper div). PASS.

---

## 13. `useMobile.tsx` Hook — Usage

### Status: DEFERRED (P3 — acceptable)

`useIsMobile()` is defined in `/client/src/hooks/useMobile.tsx` and imported only in `sidebar.tsx` — a shadcn/ui component not used in any Perioskoup page. All responsive behaviour in Perioskoup pages is now handled via Tailwind CSS breakpoints (`md:`, `sm:`, `lg:`).

The hook is dead code in context of Perioskoup's page-level components. It should either be deleted or documented as infrastructure for future use. No functional issue.

---

## 14. CSS Media Queries vs. Tailwind Breakpoints

### Status: PASS

Three raw CSS media queries remain in `index.css` — all intentional and correct:
1. `@media (max-width: 767px) { .step-offset { padding-top: 0 !important; } }` — suppresses the How It Works decorative vertical offset on mobile. The `767px` value (not 768px) intentionally targets `< md` breakpoint. PASS.
2. `@media (max-width: 768px) { #cursor-dot, #cursor-ring { display: none; } }` — hides custom cursor on mobile. PASS.
3. `@media (min-width: 1024px) { .container { padding-left: 2.5rem; padding-right: 2.5rem; } }` — container padding breakpoint. PASS.

The Navbar no longer has any raw CSS media queries — pure Tailwind. PASS.

`@media (prefers-reduced-motion: reduce)` block is comprehensive — covers all animations. PASS.

---

## 15. Touch Interactions

### Status: PASS

**CustomCursor.tsx:**
- `pointer: coarse` media query guard prevents RAF loop on touch devices. PASS.
- CSS `@media (max-width: 768px) { #cursor-dot, #cursor-ring { display: none; } }` — belt-and-suspenders CSS hide. PASS.

**Hover states:** All CSS hover classes (`.card:hover`, `.btn-primary:hover`, `.blog-card-hover:hover`, `.footer-link:hover`) are CSS-only and do not trigger on touch. Interactive elements are within `<Link>` or `<a>` tags which activate on touch. PASS.

**`prefers-reduced-motion`:** Comprehensive coverage of all animations including card:hover transforms, btn-primary:hover transforms, and blog-row-hover padding-left. PASS.

---

## 16. Viewport Simulation — Hero Sections at Standard Breakpoints

### 320px (iPhone SE 1st gen, narrow Android)

- **Navbar:** Hamburger at 44×44px. Desktop nav hidden. PASS.
- **Home hero h1:** "Between visits, we take over." at 52px, 2 lines, lineHeight 1.0. Comfortable. PASS.
- **Home hero CTA buttons:** `flexWrap: "wrap"`, both wrap to own line. 54px touch target. PASS.
- **Secondary page heroes:** `paddingTop: 140` at 320px — functional (clears 64px navbar). `paddingBottom: 80` is disproportionate at 320px (14% of a 568px screen) but not layout-breaking. P2.
- **Features bento:** `grid-cols-1`. Single card per row. PASS.
- **How It Works:** `grid-cols-1`. `.step-offset` suppressed via media query. PASS.
- **ForDentists clinical cards:** `flex-col` on mobile, icon above text. PASS.
- **Waitlist role buttons:** `grid-cols-1`, full-width, ~60px touch target. PASS.
- **Blog h1:** `display-lg` at 44px, `lineHeight: 0.93`. "Insights on dental health,\nAI, and care." wraps to 3 lines. Tight but readable. P3.
- **Footer:** Collapses to 1 column at 272px. Readable. PASS.

### 375px (iPhone 6–14 standard)

- All sections clean. Section paddings at clamp values — comfortable. PASS.
- Blog featured posts: `grid-cols-1` (md: breakpoint not yet fired). PASS.
- Pricing plans: `grid-cols-1` (sm: 640px breakpoint not fired). Stacked. PASS.
- Contact form: lg: breakpoint not fired, grid stacks. Form full-width. PASS.
- Footer: 2 columns at 375px (2×160px = 320px < 327px available). PASS.

### 414px (iPhone XR/Plus)

- Features page: `grid-cols-1`. PASS.
- About team: `grid-cols-1`. PASS.
- Stats grid (ForDentists): sm: not yet fired (640px). `grid-cols-1`. PASS.

### 768px (iPad portrait — md: breakpoint triggers)

- **Navbar:** `md:hidden` hamburger disappears. `md:flex` desktop nav appears. At exactly 768px, both fire simultaneously (Tailwind md: is `min-width: 768px`). Desktop nav shows. PASS.
- **Home hero:** `lg:grid-cols-[1.1fr_0.9fr]` — lg is 1024px, so still single column at 768px. Phone below text. Correct.
- **EFP award card:** `md:grid-cols-2` fires. Two columns. PASS.
- **Features bento:** `md:col-span-2` fires. Correct bento layout. PASS.
- **ForDentists workflow:** `md:grid-cols-3` fires. Three columns. PASS.
- **Blog featured:** `md:grid-cols-2` fires. Two cards side by side. PASS.
- **Pricing plans:** `sm:grid-cols-2` fired (640px < 768px). Two columns. PASS.

---

## 17. Container Padding Adequacy

### Status: PASS

```css
.container {
  padding-left: 1.5rem;  /* 24px mobile */
  padding-right: 1.5rem; /* 24px mobile */
}
@media (min-width: 1024px) {
  .container { padding-left: 2.5rem; padding-right: 2.5rem; }
}
```

Available content width by viewport:
- 320px: 272px — adequate for single-column layouts
- 375px: 327px — comfortable
- 414px: 366px — comfortable
- 768px: 720px — comfortable (lg breakpoint not yet triggered)
- 1024px: 944px (with 2.5rem padding) — correct

---

## 18. Specific Component Issues Not Previously Documented

### Issue NEW-01 (P2) — About.tsx: Quote section `minWidth: 280` on flex child

`About.tsx` line 218 (Dr. Anca quote section):
```tsx
<div style={{ flex: 1, minWidth: 280 }}>
```
This flex child has `minWidth: 280`. At 320px content width (272px), with the avatar image (`width: 80, flexShrink: 0`) and `gap: 24`, the text div would need `272 - 80 - 24 = 168px`. But `minWidth: 280` would force a minimum 280px width, pushing the total flex layout to `80 + 24 + 280 = 384px` — wider than the 272px container.

However, the parent has `flexWrap: "wrap"`. When the text div cannot fit on the same line as the avatar, it wraps to the next row. With `flexWrap: "wrap"`, the avatar takes one row, and the text div takes the full width of the next row. This is acceptable — the avatar and quote display vertically on mobile. The `minWidth: 280` is honored because the wrapper row has 272px and the div wraps to it taking the full 272px. MARGINAL PASS — technically works due to wrapping.

### Issue NEW-02 (P2) — ForDentists.tsx: Quote section `minWidth: 280`

Same pattern at `ForDentists.tsx` line 158:
```tsx
<div style={{ flex: 1, minWidth: 280 }}>
```
Same wrapping behaviour. MARGINAL PASS.

### Issue NEW-03 (P3) — Home.tsx: "How It Works" wave circle decorators

The How It Works section (Home.tsx lines 321-327) has absolutely positioned background gradient circles:
```tsx
style={{
  width: 280, height: 280, borderRadius: "50%",
  background: "radial-gradient(circle, ...)",
  position: "absolute", top: "50%", left: "50%",
  transform: "translate(-50%, -50%)",
}}
```
These are purely decorative and positioned relative to a `position: "relative"` parent. The 280px diameter is within the 160px circle's visual bounds — positioned centered on the circle via transform. No overflow. PASS.

### Issue NEW-04 (P3) — Home.tsx: "How It Works" wave SVG

```tsx
<svg viewBox="0 0 900 200" fill="none" className="hidden md:block" style={{ position: "absolute", top: 40, left: 0, width: "100%", height: 200 }}>
```
The `className="hidden md:block"` correctly hides the wave SVG on mobile. The connecting wave between step circles is decoration-only and correctly suppressed on mobile. PASS.

---

## Summary of All Issues by Priority

### P0 — Critical (layout breaks)
None.

### P1 — High (significantly degraded on mobile)
None.

### P2 — Medium (suboptimal, not broken)

| ID | File | Line(s) | Issue | Fix |
|----|------|---------|-------|-----|
| HERO-PAD-01 | About.tsx | 115 | `paddingTop: 140, paddingBottom: 80` — not fluid | `paddingTop: "clamp(120px, 14vw, 160px)", paddingBottom: "clamp(48px, 6vw, 80px)"` |
| HERO-PAD-02 | ForDentists.tsx | 74 | `paddingTop: 140, paddingBottom: 80` | Same as above |
| HERO-PAD-03 | Blog.tsx | 175 | `paddingTop: "140px", paddingBottom: "80px"` | Same as above |
| HERO-PAD-04 | Waitlist.tsx | 76 | `paddingTop: 140, paddingBottom: 120` | `clamp(120px, 14vw, 160px)` / `clamp(64px, 8vw, 120px)` |
| HERO-PAD-05 | Contact.tsx | 101 | `paddingTop: 140, paddingBottom: 80` | Same as HERO-PAD-01 |
| HERO-PAD-06 | Pricing.tsx | 87 | `paddingTop: 140, paddingBottom: 80` | Same as HERO-PAD-01 |
| HERO-PAD-07 | NotFound.tsx | 22 | `paddingTop: 180, paddingBottom: 120` | `clamp(120px, 16vw, 180px)` / `clamp(64px, 8vw, 120px)` |
| HERO-PAD-08 | Privacy.tsx | 40 | `paddingTop: 140, paddingBottom: 100` | `clamp(120px, 14vw, 160px)` / `clamp(56px, 7vw, 100px)` |
| HERO-PAD-09 | Terms.tsx | 41 | `paddingTop: 140, paddingBottom: 100` | Same as HERO-PAD-08 |
| FEAT-PAD-01 | Features.tsx | 65 | `paddingTop: "120px"` overrides `.section` class | Remove inline paddingTop; add `lg:pt-[120px]` |
| SEC-PAD-01 | Blog.tsx | 194 | `paddingBottom: "80px"` | `clamp(48px, 6vw, 80px)` |
| SEC-PAD-02 | Blog.tsx | 239 | `padding: "60px 0"` | `clamp(40px, 5vw, 60px) 0` |
| SEC-PAD-03 | Blog.tsx | 257 | `paddingBottom: "120px", paddingTop: "80px"` | `clamp()` equivalents |
| SEC-PAD-04 | Blog.tsx | 302 | `padding: "80px 0"` | `clamp(48px, 6vw, 80px) 0` |
| SEC-PAD-05 | Pricing.tsx | 113 | `padding: "80px 0"` | `clamp(48px, 6vw, 80px) 0` |
| SEC-PAD-06 | Pricing.tsx | 160 | `padding: "120px 0"` | `clamp(64px, 8vw, 120px) 0` |
| SEC-PAD-07 | Contact.tsx | 121 | `padding: "80px 0"` | `clamp(48px, 6vw, 80px) 0` |
| SEC-PAD-08 | BlogPost.tsx | 910 | `padding: "80px 0"` | `clamp(48px, 6vw, 80px) 0` |
| BLOGPOST-01 | BlogPost.tsx | 754 | `fontSize: "80px"` + `paddingTop: "160px"` on 404 fallback | `clamp(48px, 8vw, 80px)` + `clamp(120px, 14vw, 160px)` |
| CARD-PAD-01 | Pricing.tsx | 116 | Beta notice `padding: "20px 28px"` — 56px horizontal on 320px | `padding: "16px 20px"` or `p-4 sm:p-[28px]` |
| CARD-PAD-02 | Contact.tsx | 145 | Form card `padding: 40` — 80px horizontal on 320px | `className="card reveal p-6 sm:p-10"` |

### P3 — Low / Polish

| ID | File | Issue | Fix |
|----|------|-------|-----|
| TYPO-01 | index.css, Blog.tsx | `display-lg` at `line-height: 0.93` — Blog h1 slightly tight at 320px | Change `.display-lg { line-height: 1.0; }` globally |
| TYPO-02 | Multiple pages | Inline `clamp()` fontSizes bypassing design system classes | Code quality — not mobile-breaking |
| GRID-01 | Footer.tsx | `gridTemplateColumns: auto-fit minmax(160px, 1fr)` inline style | Works correctly; Tailwind equivalent optional |
| HERO-01 | Home.tsx | Stats row uses `flex-wrap` producing uneven wrapping at 320px | Use `grid grid-cols-3` |
| NAV-01 | Navbar.tsx | Mobile drawer CTA span has `display: 'flex'` override on btn-primary | Minor style override — no functional issue |
| HOOK-01 | useMobile.tsx | `useIsMobile()` hook unused in all page components | Remove or document |

---

## Confirmed Passing Items

1. Hamburger navigation — 44px touch target, focus trap, Escape key, body scroll lock, route-change close. PASS.
2. `100vh` completely eliminated — all pages use `100svh`. PASS.
3. All major responsive grids — 16+ grids use Tailwind responsive classes. PASS.
4. PhoneMockup — `max-w-[300px]` on mobile, `px-2` breathing room. PASS.
5. `.p-input` touch target — ≈49px height. PASS.
6. `.btn-primary` touch target — ≈50px height. PASS.
7. Container system — 1.5rem mobile padding. PASS.
8. ForDentists clinical cards — `flex-col` on mobile. PASS.
9. Waitlist role selector — `grid-cols-1` on mobile. PASS.
10. Blog featured posts — `grid-cols-1` on mobile. PASS.
11. Custom cursor — RAF guard on `pointer: coarse`. PASS.
12. `prefers-reduced-motion` — comprehensive coverage. PASS.
13. Horizontal overflow — all sources fixed, `overflow-x` not on body. PASS.
14. Ticker — `overflow: hidden` wrapper. PASS.
15. Images — all fluid with `objectFit: cover`, responsive containers. PASS.
16. EFP Award photo — `min-h-[240px] md:min-h-[420px]` responsive. PASS.
17. Navbar — pure Tailwind breakpoints, no inline style block. PASS.

---

## Score Breakdown

| Category | Cycle 1 | Re-audit | Cycle 2 | Change | Notes |
|----------|---------|----------|---------|--------|-------|
| Mobile hamburger nav | 8.5 | 9.5 | 9.5 | = | Fully fixed, no regressions |
| Hero sections (320–768px) | 7.0 | 8.5 | 8.0 | -0.5 | Secondary hero paddings still hardcoded; count is higher than re-audit documented |
| Grids — responsive stacking | 8.0 | 9.5 | 9.5 | = | No regressions; all 16+ grids responsive |
| Font sizes — Dongle display | 7.0 | 8.5 | 8.5 | = | display-md fixed; display-lg 0.93 lineHeight remains P3 on Blog |
| Padding / spacing | 5.0 | 7.5 | 7.0 | -0.5 | Still 9 hero sections + 8 interior sections with fixed values |
| Container / touch targets | 9.0 | 9.0 | 9.0 | = | No change; all passing |
| Viewport height (svh) | 7.0 | 9.5 | 10.0 | +0.5 | Confirmed zero `100vh` instances |
| PhoneMockup scaling | 7.5 | 8.5 | 8.5 | = | px-2 breathing room confirmed |
| Horizontal scroll | 9.0 | 9.0 | 9.5 | +0.5 | No issues found in deep read |
| Touch interactions | 9.0 | 9.5 | 9.5 | = | RAF guard confirmed working |
| CSS media queries vs Tailwind | 7.0 | 9.5 | 9.5 | = | Navbar fully Tailwind |
| useMobile hook | 5.0 | 5.0 | 5.0 | = | Still unused; deferred |

**Cycle 2 Overall Score: 8.6 / 10**

---

## Quick Wins — Highest ROI Remaining Fixes

These 5 actions resolve all P2 issues and would push the score to approximately 9.2/10:

**1. Secondary page hero `paddingBottom` (9 files, ~30 min):**
Global search-replace `paddingBottom: 80` with `paddingBottom: "clamp(48px, 6vw, 80px)"`, `paddingBottom: 100` with `clamp(56px, 7vw, 100px)`, `paddingBottom: 120` with `clamp(64px, 8vw, 120px)`. Do NOT change `paddingTop: 140` — it needs to clear the navbar, though changing to `clamp(120px, 14vw, 160px)` also works.

**2. Interior fixed paddings — Blog, Pricing, Contact, BlogPost (4 files, ~20 min):**
```
Blog.tsx:194   paddingBottom: "80px" → "clamp(48px, 6vw, 80px)"
Blog.tsx:257   paddingBottom: "120px" → "clamp(64px, 8vw, 120px)", paddingTop: "80px" → "clamp(48px, 6vw, 80px)"
Blog.tsx:302   padding: "80px 0" → "clamp(48px, 6vw, 80px) 0"
Pricing.tsx:113 padding: "80px 0" → "clamp(48px, 6vw, 80px) 0"
Pricing.tsx:160 padding: "120px 0" → "clamp(64px, 8vw, 120px) 0"
Contact.tsx:121 padding: "80px 0" → "clamp(48px, 6vw, 80px) 0"
BlogPost.tsx:910 padding: "80px 0" → "clamp(48px, 6vw, 80px) 0"
```

**3. BlogPost.tsx 404 fallback (2 min):**
```tsx
<div style={{ paddingTop: "clamp(120px, 14vw, 160px)", paddingBottom: "clamp(64px, 8vw, 120px)" }}>
  <h1 style={{ fontSize: "clamp(48px, 8vw, 80px)" }}>Article not found</h1>
```

**4. Pricing beta notice card + Contact form card padding (5 min):**
```tsx
// Pricing.tsx line 116:
style={{ ..., padding: "16px 20px" }}

// Contact.tsx line 145:
className="card reveal p-6 sm:p-10"
// remove padding: 40 from style prop
```

**5. Features.tsx hero paddingTop (2 min):**
```tsx
// Remove paddingTop: "120px" from inline style
<section id="main-content" className="section lg:pt-[120px]" style={{ minHeight: "55vh", ... }}>
```

**Estimated total time for all P2 fixes: 1 hour.**
