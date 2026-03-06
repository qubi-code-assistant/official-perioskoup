# Code Quality & Performance Audit — Perioskoup Landing Page

**Date:** 2026-03-06  
**Auditor:** Performance Auditor (Claude Sonnet 4.6)  
**Score: 7.2 / 10**

---

## Build Output Summary

```
pnpm build — vite v7.1.9, 1637 modules transformed, 856ms

index.html          19.87 kB │ gzip:   5.41 kB
assets/index.css   105.14 kB │ gzip:  18.41 kB
assets/vendor.js    17.47 kB │ gzip:   6.60 kB   (react, react-dom, wouter)
assets/index.js    347.24 kB │ gzip: 107.88 kB   ← main chunk (HOME PAGE)
assets/BlogPost.js  65.73 kB │ gzip:  20.99 kB   ← content-heavy lazy chunk
assets/About.js     19.37 kB │ gzip:   5.81 kB
assets/ForDentists.js 20.22 kB │ gzip:  5.98 kB
... (remaining route chunks all under 13KB gzip)
```

**Initial page load (gzip total): ~138 KB**  
HTML (5.4) + CSS (18.4) + vendor (6.6) + main (107.9) = 138.3 KB gzip

---

## 1. Bundle Size Breakdown

### Finding: Main chunk at 347 KB raw / 108 KB gzip is the dominant concern

The `index.js` main chunk includes:
- React 19 + ReactDOM (~130 KB of the total, minified)
- Home page component (the only eagerly loaded page)
- All shared components: Navbar, Footer, PhoneMockup, Logo, ErrorBoundary, ThemeContext
- `react-helmet-async` (pulled in via HelmetProvider in `main.tsx`)
- Radix `@radix-ui/react-tooltip` + `sonner` (both loaded in `App.tsx` unconditionally)
- Three lucide-react icons in ErrorBoundary (Menu, X in Navbar are also eagerly loaded)

**Root causes of bloat:**
1. `HelmetProvider`, `TooltipProvider`, and `<Toaster>` are all in the root `App.tsx`, forcing those dependencies into the main chunk. TooltipProvider wraps the entire app even though only a handful of pages use tooltips (and none currently render a Tooltip component).
2. `react-helmet-async` (~15 KB minified) is in the main chunk because it's used in `main.tsx`.
3. `sonner` (~12 KB minified) is always loaded even on the Home page which never shows a toast.
4. The vendor chunk is only `react + react-dom + wouter`. All other third-party deps land in `index.js`.

**Comparison to industry benchmark:**
A 108 KB gzip first-paint JS payload is within acceptable range for a React SPA (Google recommends < 170 KB total JS on mobile). This is **not critical**, but there is ~30–40 KB of recoverable gzip savings.

### BlogPost chunk (65 KB raw / 21 KB gzip)

All blog article content is hardcoded as a `const ARTICLES: Record<string, Article>` object in `BlogPost.tsx`. This is the primary reason BlogPost is 3x larger than any other page chunk. The content should eventually be fetched from an API/CMS, but for a pre-launch landing page this is acceptable.

---

## 2. Dependency Audit

### Unused/zombie packages in `package.json`

| Package | Status | Notes |
|---------|--------|-------|
| `@radix-ui/react-accordion` | Installed, not used in pages | shadcn/ui `accordion.tsx` exists but is never imported by any page |
| `@radix-ui/react-alert-dialog` | Installed, not used | Same pattern |
| `@radix-ui/react-aspect-ratio` | Installed, not used | |
| `@radix-ui/react-avatar` | Installed, not used | |
| `@radix-ui/react-checkbox` | Installed, not used | |
| `@radix-ui/react-collapsible` | Installed, not used | |
| `@radix-ui/react-context-menu` | Installed, not used | |
| `@radix-ui/react-dropdown-menu` | Installed, not used | |
| `@radix-ui/react-hover-card` | Installed, not used | |
| `@radix-ui/react-menubar` | Installed, not used | |
| `@radix-ui/react-navigation-menu` | Installed, not used | |
| `@radix-ui/react-popover` | Installed, not used | |
| `@radix-ui/react-progress` | Installed, not used | |
| `@radix-ui/react-radio-group` | Installed, not used | |
| `@radix-ui/react-scroll-area` | Installed, not used | |
| `@radix-ui/react-select` | Installed, not used | |
| `@radix-ui/react-slider` | Installed, not used | |
| `@radix-ui/react-switch` | Installed, not used | |
| `@radix-ui/react-tabs` | Installed, not used | |
| `@radix-ui/react-toggle` | Installed, not used | |
| `@radix-ui/react-toggle-group` | Installed, not used | |
| `@types/google.maps` | DevDep — referenced only in Map.tsx comments | |
| `add` | DevDep — `pnpm add` wrapper, not needed | Remove |
| `Map.tsx` component | Dead code — never imported by any page | Delete file |
| `useScrollReveal.ts` hook | Unused — pages use inline `useReveal()` | Delete or consolidate |
| `HeroBackground.tsx` | Imported nowhere (pages use ParallaxHeroBg) | Delete file |
| `ThemeContext.tsx` | Theme switching is `switchable: false` in App.tsx — toggleTheme is never callable | Simplify or remove |

**Radix dependency note:** Although Vite + Rollup tree-shakes unused exports, the Radix packages themselves have side-effect-free design and tree-shake well at the **module level** (each component is a separate import). The unused shadcn/ui wrapper `.tsx` files are compiled but their Radix imports are tree-shaken **only if the wrapper is never imported**. Checking: the shadcn/ui components that ARE imported by pages are: `sonner`, `tooltip`, `dialog`, `button`, `separator`, `input`, `textarea`, `label`, `sheet`, `toggle`, `skeleton`. That's 11 of 45 components. The remaining 34 wrapper files are never imported by pages or App.tsx, so they should be tree-shaken from the final bundle. The Radix peer packages however remain installed, adding to `node_modules` disk weight (not bundle weight).

---

## 3. Component Architecture

### Strengths

- Clear separation: `pages/` for routes, `components/` for shared UI, `components/ui/` for shadcn primitives
- Navbar, Footer, Logo, PhoneMockup are properly extracted as reusable components
- CSS-only hover states replace JS `onMouseEnter`/`onMouseLeave` mutations throughout (performance-correct pattern)
- ParallaxHeroBg, HeroGlow, Breadcrumb are extracted as composable micro-components
- ErrorBoundary correctly implemented as a class component

### Issues

**Critical DRY violation: `useReveal()` is copy-pasted into 7 files**

The same hook is defined identically in:
- `Home.tsx`
- `Features.tsx`
- `ForDentists.tsx`
- `About.tsx`
- `Blog.tsx`
- `Contact.tsx`
- `Pricing.tsx`
- `Waitlist.tsx`

An existing `useScrollReveal.ts` hook lives in `client/src/hooks/` but uses a completely different interface. The inline `useReveal()` should be extracted to `client/src/hooks/useReveal.ts` and imported.

**Fix:**
```ts
// client/src/hooks/useReveal.ts
import { useEffect } from "react";

export function useReveal(threshold = 0.12) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const els = document.querySelectorAll(".reveal, .reveal-scale");
    if (prefersReducedMotion) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
```

Then each page simply:
```ts
import { useReveal } from "@/hooks/useReveal";
// in component:
useReveal();
```

**Inline style overuse in Home.tsx and ForDentists.tsx**

Virtually every element has inline `style={{}}` props instead of design system classes or Tailwind utilities. While this works, it makes the code harder to maintain. The global CSS already defines `.card`, `.section`, `.container`, `.btn-primary`, `.body-lg`, `.display-lg`, etc. — these should be used consistently. The heavy inline style approach in Home.tsx (400+ lines, ~150 style objects) is a tech debt concern.

**EFP badge duplicated verbatim** in Home.tsx and ForDentists.tsx. Should be extracted as `<EFPBadge />`.

**Stats row duplicated** (same 87% / 80% stats appear in both Home.tsx and ForDentists.tsx with nearly identical markup).

---

## 4. Image Optimization

### Hero background

| File | Format | Size | Used in |
|------|--------|------|---------|
| `hero-bg.webp` | WebP | 13 KB | Home.tsx `<img>`, index.html preload, noscript |
| `hero-bg.jpg` | JPEG | 82 KB | Not referenced — orphan file |

**Good:** hero-bg.webp is correctly chosen, preloaded in `<head>`, has `fetchPriority="high"`, `width`/`height` attributes set (prevents CLS), and uses the `.webp` format. The noscript shell also uses `.webp`.

**Issue:** `hero-bg.jpg` (82 KB) is an orphan file sitting in `public/images/`. It is never referenced but still served. Delete it.

### Profile images

| File | Format | Size | Issue |
|------|--------|------|-------|
| `anca-headshot.jpg` | JPEG | 19 KB | No WebP version; could convert |
| `eduard-headshot.jpg` | JPEG | 43 KB | No WebP version |
| `petrica.jpg` | JPEG | 86 KB | Has WebP equivalent (27KB) — .jpg never used |
| `logomark-dark.png` | PNG | 36 KB | Only used as fallback in noscript? Check usage |

All non-hero images correctly use `loading="lazy"` and `decoding="async"`. Width/height attributes are set. No `srcset` or `sizes` are used — since these are portrait photos displayed at fixed small sizes (44×44 or 80×80), this is acceptable. For the award photo (800×446 display), a `srcset` would help on mobile.

**Recommendations:**
1. Delete `hero-bg.jpg` and `petrica.jpg` (orphan files, WebP versions exist and are used).
2. Convert `anca-headshot.jpg` and `eduard-headshot.jpg` to `.webp` (potential 60–70% size reduction).
3. Add `srcset` to the EFP award image for responsive image delivery.

### og-image

`og-image.jpg` is 49 KB — reasonable for social sharing.

---

## 5. CSS Analysis

### Tailwind v4 purge

Tailwind v4 via `@tailwindcss/vite` performs content scanning automatically by analyzing all files in the Vite module graph. This is equivalent to `purge: true` in v3. The production CSS at **105 KB raw / 18.4 KB gzip** includes:

- Tailwind base/utilities used across the project
- The full custom design system (1,169 lines of hand-written CSS in `index.css`)
- `tw-animate-css` animations (imported in `index.css`)

The 105 KB raw CSS is on the higher side for a landing page. The custom CSS alone (index.css) accounts for a significant portion. The CSS is correctly minified (`cssMinify: true` in vite.config.ts).

**Specific issues:**
- `tw-animate-css` (`devDependencies`) is imported into the production CSS via `@import "tw-animate-css"` in `index.css`. This is likely a bootstrap animation library that adds to CSS weight even if only a subset of its animations are used.
- The `@layer components` block in `index.css` (lines 573–1035) redefines `container`, `flex`, typescale, buttons, cards, navbar, inputs, and reveals. This is clean and intentional — it's the design system. Not a bug, just weight.
- No unused styles issue: Tailwind v4 correctly tree-shakes only used utility classes. Custom classes in `@layer components` are always included regardless of usage (e.g., `.card-dark` might be defined but used rarely).

---

## 6. TypeScript Analysis

### Strict mode

**Good.** `tsconfig.json` has `"strict": true`. This enables `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, etc.

### `any` type usage

Three intentional `any` casts in shadcn/ui component wrappers:
- `client/src/components/ui/input.tsx:25`: `(e.nativeEvent as any).isComposing`
- `client/src/components/ui/textarea.tsx:24`: `(e.nativeEvent as any).isComposing`
- `client/src/components/ui/dialog.tsx:107`: `(e as any).isComposing`

These are in scaffolded shadcn/ui files, working around a DOM event typing gap. They are acceptable but should be replaced with a proper type cast:
```ts
// Instead of: (e.nativeEvent as any).isComposing
// Use: (e.nativeEvent as InputEvent).isComposing
```

### Type check result

`pnpm check` (tsc --noEmit) passes with **zero errors**. Clean bill of health.

### Type coverage gaps

- `Map.tsx` uses `usePersistFn` hook from `@/hooks/usePersistFn` which does not appear to exist in the hooks directory (only `useMobile.tsx`, `useScrollReveal.ts`, and `useComposition.ts` were found). If Map.tsx is dead code, this doesn't matter, but it should be deleted to avoid future confusion.
- `client/src/hooks/useMobile.tsx` has `.tsx` extension but contains no JSX. Should be `.ts`.

---

## 7. Code Splitting

### What's working

All 11 route pages except Home are lazy-loaded via `React.lazy()`:
```tsx
const Features = React.lazy(() => import("./pages/Features"));
// ...all other routes lazy
```

The Suspense boundary wraps the entire router with a background-color fallback (not a skeleton, but acceptable for this SPA pattern).

Home is **correctly** kept eager (not lazy) — it is the first route and should be in the main bundle for instant paint.

### What's missing

**No prefetching on hover.** When a user hovers over a nav link (e.g., "Features"), the Features chunk could begin loading before click. This would eliminate the brief white flash on navigation. Implementation:

```tsx
// In Navbar.tsx, add onMouseEnter prefetch
const ROUTE_PREFETCH_MAP: Record<string, () => Promise<unknown>> = {
  '/features': () => import('./pages/Features'),
  '/for-dentists': () => import('./pages/ForDentists'),
  // etc.
};

// On Link hover:
onMouseEnter={() => ROUTE_PREFETCH_MAP[href]?.()}
```

**BlogPost is the largest lazy chunk (65 KB raw).** This is because all article content is hardcoded. No code-splitting issue per se, just content weight.

---

## 8. Tree Shaking

### lucide-react

All lucide-react imports use named imports:
```ts
import { Menu, X } from 'lucide-react';
import { AlertTriangle, RefreshCw, RotateCcw } from "lucide-react";
```

lucide-react v0.453 ships ES modules with per-icon files and a barrel `index.js`. Vite correctly tree-shakes named imports from barrel exports via Rollup. Only the imported icons should be in the final bundle. **This is correct.**

However, lucide-react is installed at v0.453.0 in dependencies. The `node_modules` contains **two** lucide-react versions (0.453.0 and 0.542.0) totalling ~69 MB on disk. The newer version 0.542 is likely a transitive dependency pull. This doesn't affect bundle output but pollutes `node_modules`.

### Radix UI

All Radix imports in shadcn wrappers use the `* as` namespace pattern:
```ts
import * as AccordionPrimitive from "@radix-ui/react-accordion";
```

This is the shadcn/ui conventional pattern. Since Radix packages export ES modules, Rollup can tree-shake unused exports from these namespace imports. Vite correctly eliminates unused shadcn/ui wrapper files that are never imported by pages.

### class-variance-authority / tailwind-merge / clsx

Small utilities, fully tree-shaken. No issues.

---

## 9. Font Loading Strategy

### What's working

All fonts are self-hosted (no Google Fonts network dependency):
```
/fonts/dongle-700-latin.woff2       13 KB
/fonts/dongle-700-latin-ext.woff2   11 KB
/fonts/gabarito-latin.woff2         34 KB
/fonts/gabarito-latin-ext.woff2     12 KB
```

`@font-face` declarations use `font-display: swap` — eliminates FOIT (invisible text). Text renders immediately in system font, then swaps when web font loads (FOUT). This is the correct production choice.

Critical fonts are preloaded in `<head>`:
```html
<link rel="preload" href="/fonts/dongle-700-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/gabarito-latin.woff2" as="font" type="font/woff2" crossorigin />
```

**Good:** Only the two primary subset files are preloaded (latin range). Latin-ext is loaded on demand.

### Issues

1. **Gabarito latin.woff2 is 34 KB** — unusually large for a woff2 web font. The `gabarito-latin-ext.woff2` at 12 KB is smaller than the latin subset, which suggests the latin file may not be subset-optimized. A properly subsetting tool (e.g., `fonttools`) typically produces 8–18 KB for a latin woff2. Consider re-subsetting with only the characters actually used in the site.

2. **Both Gabarito weights (400 and 700) point to the same file:**
```css
/* weight: 400 */
src: url('/fonts/gabarito-latin.woff2') format('woff2');
/* weight: 700 */
src: url('/fonts/gabarito-latin.woff2') format('woff2');
```
This means the browser loads only one Gabarito file for both weights. If the font is a variable font covering both axes, this is intentional. If it's a static font, only one weight is rendering (likely 400). This should be verified — if Gabarito needs true 700 weight, a separate 700 woff2 is needed.

---

## 10. Accessibility

### Strengths (excellent)

- **Skip link** implemented and focused: `.skip-link` appears on keyboard focus, targets `#main-content` (WCAG 2.4.1)
- **RouteAnnouncer** in App.tsx broadcasts route changes to `aria-live="polite"` region and moves focus to `#main-content` (WCAG 2.4.3, 4.1.3)
- **Reduced motion**: comprehensive `@media (prefers-reduced-motion: reduce)` block kills all animations and transitions (WCAG 2.3.3)
- **Focus ring**: `*:focus-visible { outline: 2px solid #C0E57A }` globally applied
- **Mobile menu**: `aria-expanded`, `aria-controls`, `aria-label`, Escape key handler
- **Form inputs** in Waitlist: `aria-required`, `aria-invalid`, `aria-describedby` for error messages, `role="alert"` on error spans
- **ARIA landmarks**: `role="dialog"` on mobile drawer, `role="status"` on Suspense-equivalent regions
- **Semantic HTML**: `<nav>`, `<footer>`, `<section>`, `<main>` (via `id="main-content"` on first section), `<blockquote>`, `<figure>` used correctly
- All decorative elements use `aria-hidden="true"`

### Issues

1. **Hero's `.reveal` class starts at `opacity: 0`** — this would hide `h1` from LCP calculation. Mitigated by the override at the bottom of `index.css`:
```css
#main-content .reveal, #main-content .reveal-scale {
  opacity: 1; transform: none; transition: none;
}
```
This is a fragile coupling. If the `#main-content` ID moves or the `.reveal` class is applied higher up, the override breaks.

2. **Features page icon tiles use emoji** (`💡`, `🔔`, `📊`) inside interactive card-like divs without `aria-label`. Screen readers announce these as "light bulb", "bell", etc. which is acceptable, but the emoji are inside styled `div`s that may confuse AT. Adding `aria-hidden="true"` to the emoji span and adding a `title` to the card would be cleaner.

3. **Ticker strip** (`aria-hidden="true"` on the outer div) — correct, animated tickers should be hidden from AT.

4. **Waitlist role selector buttons** use `aria-pressed` — correct for toggle buttons. 

5. **Color contrast**: The brand muted color `#8C9C8C` on `#0A171E` background gives a contrast ratio of approximately 5.2:1 (passes AA for body text at 16px). The `#8C9C8C` on `#050C10` background is ~4.8:1 — passes AA but not AAA.

---

## 11. Lighthouse Score Estimation

Based on code review (no live Lighthouse run):

| Metric | Estimate | Reasoning |
|--------|----------|-----------|
| **Performance** | 82–88 | LCP image preloaded + WebP + fetchPriority="high". Main JS 108 KB gzip. Font display:swap. Render-blocking: none detected. Ken-Burns CSS animation on LCP image is a risk. |
| **Accessibility** | 90–95 | Skip link, ARIA landmarks, reduced motion, focus management. Small deductions for emoji icons without aria-hidden and potential contrast gaps. |
| **Best Practices** | 90–95 | No console errors expected in prod. HTTPS. No mixed content. |
| **SEO** | 95–100 | Meta tags, canonical, OG, hreflang, structured data (JSON-LD), robots.txt, sitemap, noscript fallback. |

**Estimated overall Lighthouse score: 88–92 (desktop)**

**Mobile estimate: 78–84** — The main JS chunk at 107 KB gzip will score worse on mobile Lighthouse's simulated slow 4G + slower CPU profiles (TTI impact). The Ken-Burns animation on the hero LCP image may slightly degrade LCP score on mobile.

---

## Prioritised Fixes

### High priority (quick wins, high impact)

1. **Extract `useReveal` hook** — removes 7 copies of the same code, makes a shared hook testable. 30 minutes of work.

2. **Delete dead files:**
   - `client/public/images/hero-bg.jpg` (82 KB saved in deploy)
   - `client/public/images/petrica.jpg` (86 KB saved — WebP version already used)
   - `client/src/components/Map.tsx` (dead code, broken `usePersistFn` import)
   - `client/src/components/HeroBackground.tsx` (never imported)

3. **Add route prefetch on hover** — eliminates the Suspense flash on navigation for users with fast connections.

4. **Fix Gabarito 700 weight** — verify if the 700 weight is truly a variable font or if a dedicated bold woff2 is needed.

### Medium priority (moderate effort, meaningful gain)

5. **Vendor chunk expansion** — move react-helmet-async, @radix-ui/react-tooltip, and sonner into the vendor chunk or a separate `providers` chunk. This would reduce the main index.js by ~25–35 KB raw:
```ts
// vite.config.ts
manualChunks: {
  vendor: ["react", "react-dom", "wouter"],
  providers: ["react-helmet-async", "sonner", "@radix-ui/react-tooltip"],
},
```

6. **Convert anca-headshot.jpg and eduard-headshot.jpg to WebP** — ~60% file size reduction.

7. **Remove unused Radix dependencies** from `package.json` (the 20+ Radix packages whose shadcn wrappers are never imported). This reduces install time and `node_modules` weight, not bundle weight (already tree-shaken).

### Low priority (larger effort)

8. **Extract inline styles to design system classes** — the heavy `style={{}}` usage in Home.tsx and ForDentists.tsx makes the code harder to maintain. This is a refactor, not a bug.

9. **Subset Gabarito font** — `gabarito-latin.woff2` at 34 KB is large. Run through `pyftsubset` to extract only the character set used on the site (expected output: 12–16 KB).

10. **Move blog content to a data file or API** — `BlogPost.tsx` at 65 KB raw is bloated by hardcoded article content. Consider splitting articles into individual JSON/MD files loaded dynamically.

---

## What's Done Well (Preserve)

- `font-display: swap` on all web fonts — correct
- `fetchPriority="high"` on hero LCP image — correct
- LCP image preloaded in `<head>` — correct
- Width/height on all images (CLS prevention) — correct
- All non-hero images have `loading="lazy" decoding="async"` — correct
- Route-level code splitting via `React.lazy` — correct pattern
- `passive: true` on scroll listeners — correct
- `requestAnimationFrame` in ParallaxHeroBg (avoids forced reflows) — correct
- TypeScript `strict: true` with zero type errors — excellent
- Custom `useReveal` respects `prefers-reduced-motion` — correct
- Comprehensive `@media (prefers-reduced-motion: reduce)` in CSS — excellent
- Skip link, RouteAnnouncer, ARIA attributes throughout — excellent a11y foundation
- `modulePreload: { polyfill: false }` (removes unnecessary polyfill for modern browsers) — correct
- `target: "esnext"` in Vite build config — correct for Vercel deployment
- `will-change: auto` on the LCP image (correctly removing the hint after it was incorrectly added) — correct

---

## Score Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| Bundle size | 6/10 | 108 KB gzip main chunk is acceptable but has 30–40 KB recoverable savings |
| Dependency hygiene | 5/10 | 20+ unused Radix packages, dead files, duplicate lucide versions |
| Component architecture | 6/10 | Clear structure, but critical `useReveal` DRY violation, heavy inline styles |
| Image optimization | 8/10 | WebP hero, lazy loading, correct attributes; 2 orphan JPGs to delete |
| CSS | 7/10 | Correct purging, good custom system; Gabarito weight and tw-animate-css weight |
| TypeScript | 9/10 | Strict mode, zero errors, 3 minor `any` casts in shadcn scaffolding |
| Code splitting | 8/10 | All routes lazy except Home (correct); no prefetch on hover |
| Tree shaking | 8/10 | Named icon imports, shadcn tree-shaken; providers not split out |
| Font loading | 7/10 | Self-hosted, font-display:swap, preloaded; Gabarito 700 weight concern |
| Accessibility | 9/10 | Excellent: skip link, announcer, reduced motion, ARIA; minor emoji issue |

**Overall Score: 7.2 / 10**

The codebase is in solid shape for a pre-launch landing page. TypeScript hygiene is excellent, code splitting is correctly implemented, and accessibility foundations are among the best seen in this class of project. The main issues are a DRY violation in the reveal hook, dead files bloating the deploy, and an oversized main bundle that could be trimmed by splitting providers into a separate chunk.
