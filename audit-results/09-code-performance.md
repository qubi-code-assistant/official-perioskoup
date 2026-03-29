# Perioskoup — Frontend Performance Audit
**Date:** 2026-03-06  
**Auditor:** Claude Sonnet 4.6 (Performance Agent)  
**Build:** Vite 7.1.9 + React 19 + Tailwind CSS v4  
**Score: 6 / 10**

---

## Build Output Summary

```
index.js (main):       347.20 KB raw → 107.86 KB gzip
index.css:             105.76 KB raw →  18.55 KB gzip
vendor.js:              17.47 KB raw →   6.60 KB gzip
BlogPost.js:            66.05 KB raw →  21.08 KB gzip
ForDentists.js:         21.18 KB raw →   6.11 KB gzip
About.js:               19.63 KB raw →   5.65 KB gzip
Blog.js:                13.17 KB raw →   4.22 KB gzip
Contact.js:             12.35 KB raw →   3.73 KB gzip
Pricing.js:             11.84 KB raw →   3.72 KB gzip
Features.js:            10.66 KB raw →   3.56 KB gzip
Waitlist.js:            10.54 KB raw →   3.34 KB gzip
Privacy.js:              4.52 KB raw →   1.85 KB gzip
Terms.js:                4.47 KB raw →   1.81 KB gzip

First-load transfer (main + vendor + CSS): 133.01 KB gzip
Total all JS gzip:                         ~171.91 KB
Build time:                                864 ms
```

---

## 1. Bundle Size Breakdown

**Score: 5/10**

The main `index.js` chunk at **347 KB raw / 108 KB gzip** is the primary concern. This chunk is large because:

1. `Home.tsx` is eagerly imported (intentional, correct — it is the LCP route)
2. `App.tsx` directly imports `TooltipProvider` from `@radix-ui/react-tooltip` and `Toaster` from `sonner`, pulling both into the critical path
3. `Navbar.tsx` pulls `lucide-react` (Menu + X icons) — tree-shaken correctly to two icons only
4. `ErrorBoundary.tsx` pulls three Lucide icons (AlertTriangle, RefreshCw, RotateCcw) into the main bundle, even though the error state is never rendered under normal conditions

**The vendor chunk (17.47 KB) is anomalously small** for a bundle declared to contain `react + react-dom + wouter`. React 19 in production mode with esbuild `target: esnext` compresses efficiently, but this warrants investigation. The manual `manualChunks` config is correct in intent.

**Issues:**

- **PERF-01** `vite.config.ts:28` — `manualChunks` vendor split is underpowered. Radix UI packages, sonner, and react-helmet-async are all colocated in the main index chunk. A more granular split (e.g., `radix: ["@radix-ui/react-tooltip"]`, `ui-libs: ["sonner", "react-helmet-async"]`) would improve caching. Currently a change to any shared component invalidates the entire 347 KB chunk.

- **PERF-02** `client/src/App.tsx:1-2` — `TooltipProvider` and `Toaster` are synchronously imported in `App.tsx` even though `TooltipProvider` wraps lazy routes (it is not needed for the initial render frame) and `Toaster` only renders when toasts fire. Neither is critical-path. Both could be deferred or removed if not actively used.

---

## 2. Code Splitting

**Score: 8/10**

Route-level code splitting is implemented correctly via `React.lazy()`. All 11 routes except `Home` are lazy-loaded.

**What is correct:**
- `client/src/App.tsx:10-20` — All non-home pages use `React.lazy(() => import(...))`
- `Suspense` fallback at `App.tsx:83` is a zero-dependency plain div — correct
- Build output confirms every page gets its own named chunk (verified by chunk filenames matching page names)
- HeroGlow and ParallaxHeroBg are also split into their own micro-chunks (0.59 KB, 0.82 KB) — correctly isolated

**Issues:**

- **PERF-03** `client/src/App.tsx:7` — `Home` is eagerly imported (not lazy). This is intentionally correct for LCP, but it means all of Home's dependencies (PhoneMockup, useReveal, react-helmet-async, Navbar, Footer, Logo) flow into the main 347 KB chunk. Home is the heaviest page and this is the correct tradeoff, but it should be documented.

- **PERF-04** `client/src/App.tsx:83` — The single `Suspense` boundary wraps all lazy routes. A route-level Suspense boundary per route would allow partial hydration and better error isolation, but this is a minor enhancement for the current scale.

---

## 3. Unused Dependencies

**Score: 4/10** — This is the most critical finding.

### Package.json Has 26 Radix UI Packages Installed

The `package.json` lists every standard Radix UI primitive (accordion, alert-dialog, aspect-ratio, avatar, checkbox, collapsible, context-menu, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toggle, toggle-group, tooltip).

**Zero of these components are imported by any page or non-ui component in the application.** The only Radix packages that flow into the runtime bundle are:
- `@radix-ui/react-tooltip` — used by `App.tsx` via `TooltipProvider`
- `@radix-ui/react-slot` — used by the `button.tsx` shadcn primitive (ErrorBoundary uses `cn()` from utils, not button)

The shadcn/ui component files in `client/src/components/ui/` exist as 44 files / ~4768 lines of source, but **none are imported outside their own directory** (the `ui/` folder only references itself or Radix). Tailwind v4 + Vite tree-shakes unused JS exports correctly, so these files do not bloat the runtime bundle — but they inflate install size and maintenance surface.

**Issues:**

- **DEP-01** `package.json:4-30` — 24 of 26 `@radix-ui/*` packages serve only as backing implementations for shadcn/ui components that are never consumed. These should remain installed if the component library will be used in the future, but should be documented as dormant. If the landing page is the final scope, ~23 packages can be removed.

- **DEP-02** `package.json` — `tailwindcss-animate` is listed as a dependency AND `tw-animate-css` is a devDependency. Both appear to serve the same purpose (CSS animation utilities). `tw-animate-css` is imported in `index.css:22`. `tailwindcss-animate` is referenced in the Tailwind plugin chain but with Tailwind v4 using `@import "tw-animate-css"` directly, the npm package `tailwindcss-animate` is redundant.

- **DEP-03** `client/src/components/CustomCursor.tsx` — This is a fully implemented custom cursor component (RAF-based mouse tracking, MutationObserver, hover expansion) but is **never imported or used anywhere in the application**. The cursor DOM elements (`#cursor-dot`, `#cursor-ring`) are styled in `index.css:1072-1098` but `CustomCursor` is dead code. The CSS rules for it ship in the bundle even though the component is never mounted.

- **DEP-04** `client/src/hooks/useScrollReveal.ts` — Contains `useScrollReveal()` and `useCountUp()`. Neither is imported anywhere in the application. `useReveal.ts` (a different hook) is the one actually used. `useScrollReveal.ts` is dead code.

- **DEP-05** `client/src/contexts/ThemeContext.tsx` — `ThemeProvider` is used in `App.tsx` with `defaultTheme="dark"` and `switchable` not set (defaults to `false`). The provider is live but does nothing observable: it sets `document.documentElement.classList.add("dark")` on mount but the CSS is already hardcoded to dark brand colors regardless. `useTheme()` is never called anywhere. The context adds overhead (useState, useEffect, localStorage read) for zero user-facing effect.

- **DEP-06** `client/public/images/logomark-dark.png` (36 KB) — Not referenced in any `.tsx`, `.ts`, or `index.html` file. Dead asset shipped in the public directory.

- **DEP-07** `client/public/images/eduard-formal.jpg` (30 KB) — Not referenced in any `.tsx`, `.ts`, or `index.html` file. Dead asset shipped in the public directory.

---

## 4. Image Optimization

**Score: 7/10**

**What is correct:**
- Hero image (`hero-bg.webp`) uses `fetchPriority="high"` and is `<link rel="preload">` in `index.html`
- Hero image is a real `<img>` element (not CSS background) — Lighthouse can detect it as LCP candidate
- All below-fold images use `loading="lazy"` and `decoding="async"`
- Background section images are served as WebP (features-bg-v2.webp, cta-bg-v2.webp, howitworks-rings-bg.webp, efp-award.webp)
- Width/height attributes are set on most images (CLS prevention)

**Issues:**

- **IMG-01** `client/public/images/anca-headshot.jpg` (19 KB) and `client/public/images/eduard-headshot.jpg` (43 KB) — Headshots are served as JPEG. Converting to WebP would reduce size by ~30-40%. These images are used across multiple pages (Home, About, ForDentists, BlogPost).

- **IMG-02** No `srcset` or `<picture>` elements anywhere in the application. For background images used at full viewport width on large screens (features-bg-v2.webp at 93 KB), serving a 640px variant to mobile browsers would save significant bandwidth. The hero LCP image at 1280px is appropriate for desktop but oversized for mobile.

- **IMG-03** `client/public/images/og-image.jpg` (116 KB) — OG image is larger than necessary. Twitter and Facebook both crop to 1200×630; the current image is not resized and may be unnecessarily large. Not an on-page performance issue but a social share load concern.

- **IMG-04** `client/public/images/logomark-dark.png` (36 KB) — A PNG logo that is unused (see DEP-06). If used in the future, it should be converted to WebP or served as SVG.

- **IMG-05** `client/src/pages/Blog.tsx:227,285` — Two author avatar `<img>` elements without `loading="lazy"`. These are small (32px, 36px) avatars but still trigger network requests on Blog page load. They should have `loading="lazy"`.

- **IMG-06** No AVIF format usage anywhere. For background hero images and the features background image (93 KB), AVIF would achieve 50%+ further size reduction versus WebP with no quality loss at equivalent file size.

---

## 5. Font Loading

**Score: 8/10**

**What is correct:**
- All fonts are self-hosted (no Google Fonts CDN round-trip)
- `font-display: swap` on all `@font-face` declarations (FOUT is acceptable, FOIT is prevented)
- Critical path fonts preloaded in `index.html`: `dongle-700-latin.woff2` and `gabarito-latin.woff2`
- Unicode-range subsetting reduces download to only required character sets
- `crossorigin` attribute correctly set on preload links

**Issues:**

- **FONT-01** `client/src/index.css:57-71` — Gabarito `font-weight: 700` `@font-face` declarations point to the **identical `src` URLs** as the `font-weight: 400` declarations (`gabarito-latin.woff2` and `gabarito-latin-ext.woff2`). This means Gabarito is registered four times in `@font-face` when it should be declared twice using `font-weight: 400 700` (a weight range). The browser will deduplicate downloads, but the duplicate declarations inflate the CSS source and add parser work. If Gabarito is a variable font, use `font-weight: 400 700` in a single declaration per unicode range.

- **FONT-02** `vercel.json` — The `Cache-Control: public, max-age=31536000, immutable` header covers `/assets/(.*)` and `/images/(.*)` but not `/fonts/(.*)`. Self-hosted fonts in the public directory are served without long-term cache headers, meaning repeat visitors re-download 70 KB of font data on each visit. Add a `/fonts/(.*)` cache header entry.

- **FONT-03** `index.html` — Only the `latin` subset woff2 files are preloaded. The `latin-ext` variants (needed for Romanian/Central European characters used in some content) are not preloaded. If any text in the LCP viewport uses latin-ext characters, this could cause a FOUT for that content.

---

## 6. Third-Party Scripts

**Score: 10/10**

No third-party scripts are loaded. No analytics (GA4, Mixpanel, Segment), no chat widgets, no tag managers, no A/B testing SDKs. The only external network requests on page load are:
- Self-hosted fonts from the same origin
- Self-hosted images from the same origin

This is excellent for Core Web Vitals. All JSON-LD structured data is inline in `index.html` — zero render-blocking.

---

## 7. CSS Efficiency

**Score: 7/10**

The CSS bundle is **105.76 KB raw / 18.55 KB gzip**. Tailwind v4 with the `@tailwindcss/vite` plugin purges unused utilities correctly based on content scanning.

**What is correct:**
- Tailwind v4 automatic content purging via `@tailwindcss/vite`
- CSS is minified (`cssMinify: true` in `vite.config.ts:23`)
- `@layer components` used correctly for custom classes
- `@media (prefers-reduced-motion: reduce)` implemented comprehensively

**Issues:**

- **CSS-01** `client/src/index.css:601` — `.flex { min-height: 0; min-width: 0; }` inside `@layer components` overrides Tailwind's native `.flex` utility class to add `min-height: 0` and `min-width: 0` globally. This is a flexbox truncation fix but it is a blanket override that changes the default behavior of every `.flex` element globally. This can cause unexpected layout issues if Tailwind's `.flex` is used in ways that rely on default min-height behavior. This override should target a more specific selector (e.g., `.flex-truncate`) rather than the generic `.flex` class.

- **CSS-02** `client/src/index.css:543,562,563` — Three `!important` declarations in hover states (`.blog-card-hover:hover` and `.efp-badge-hover:hover`). These exist because inline styles set `border-color` and `background` on these elements. The correct fix is to move those inline styles to CSS classes so the hover state does not require `!important` overrides.

- **CSS-03** `client/src/index.css` — CSS has 17 `!important` declarations in the `prefers-reduced-motion` block. These are justified (they must override animation CSS regardless of specificity), but items CSS-02 above are not justified.

- **CSS-04** The CSS source is 1,197 lines. The custom CSS defines many patterns that duplicate Tailwind utilities: `.container`, `.section`, `.section-sm`, `.flex` — some of these conflict with or shadow Tailwind's own utilities.

- **CSS-05** `client/src/index.css:820-831` — `.nav-link` class is defined in `@layer components` but the Navbar component does not use `.nav-link` — it uses `.nav-link-item` (defined at line 505). The `.nav-link` definition is dead CSS that ships in the bundle.

---

## 8. TypeScript Strictness

**Score: 9/10**

**What is correct:**
- `"strict": true` enabled in `tsconfig.json`
- `pnpm check` (tsc --noEmit) passes with zero errors
- No `@ts-ignore` or `@ts-expect-error` suppressions
- Proper interface definitions throughout

**Issues:**

- **TS-01** `client/src/components/ui/dialog.tsx:107` — `(e as any).isComposing` cast. This is a workaround for a React synthetic event limitation where `isComposing` is not typed. Acceptable workaround but could use a typed interface extension instead.

- **TS-02** `client/src/components/ui/textarea.tsx:24` and `input.tsx:25` — Same `(e.nativeEvent as any).isComposing` pattern. Three occurrences total across shadcn ui primitives — not application code.

- **TS-03** `client/src/hooks/usePersistFn.ts:3` — `type noop = (...args: any[]) => any` — a variadic any-typed function alias. This hook is never used (see DEP-04 territory), but the type is imprecise.

---

## 9. Tree Shaking

**Score: 7/10**

**What is correct:**
- Lucide React: only named imports used (`Menu`, `X`, `AlertTriangle`, `RefreshCw`, `RotateCcw`, `ChevronDownIcon`, etc.) — Vite tree-shakes correctly, only imported icons ship
- Wouter: lightweight router (wouter is ~5 KB), correct
- No barrel file re-exports that defeat tree shaking

**Issues:**

- **TREE-01** `vite.config.ts:28` — The `vendor` manual chunk forces `react`, `react-dom`, and `wouter` into one chunk. This means that a `wouter` update forces users to re-download `react-dom` (the largest chunk). Better to split: `{ react: ["react", "react-dom"], router: ["wouter"] }`.

- **TREE-02** The shadcn/ui components import all their Radix dependencies via star imports (`import * as TooltipPrimitive from "@radix-ui/react-tooltip"`). This prevents tree shaking of individual Radix primitives within each package. Since only Tooltip is used, the entire `@radix-ui/react-tooltip` package is bundled. This is inherent to the Radix API design, not actionable, but worth documenting.

- **TREE-03** `client/src/App.tsx:1-2` — `Toaster` from `sonner` is imported synchronously in `App.tsx`. The `sonner` package is 184 KB on disk. Even though tree-shaken, its critical-path presence prevents it from being split into a deferred chunk.

---

## 10. Dead Code / Unused Exports

**Score: 5/10**

| Item | File | Size | Verdict |
|------|------|------|---------|
| `CustomCursor` component | `client/src/components/CustomCursor.tsx` | ~2 KB | Never imported anywhere |
| `useScrollReveal` hook | `client/src/hooks/useScrollReveal.ts` | ~1 KB | Never imported anywhere |
| `useCountUp` hook | `client/src/hooks/useScrollReveal.ts` | ~1 KB | Never imported anywhere |
| `useTheme` hook | `client/src/contexts/ThemeContext.tsx` | — | Exported but never called |
| `.nav-link` CSS class | `client/src/index.css:820-831` | — | Defined but Navbar uses `.nav-link-item` |
| `cursor-dot`/`cursor-ring` CSS | `client/src/index.css:1072-1098` | — | DOM elements never mounted |
| `logomark-dark.png` | `client/public/images/logomark-dark.png` | 36 KB | No references in source |
| `eduard-formal.jpg` | `client/public/images/eduard-formal.jpg` | 30 KB | No references in source |
| Full shadcn/ui library | `client/src/components/ui/` (44 files) | ~4768 lines | Zero page-level imports |

The dead CSS (`#cursor-dot`, `#cursor-ring`) ships in the CSS bundle. The dead JS components (`CustomCursor`, `useScrollReveal`) are tree-shaken by Vite and do not appear in the output — only their source files accumulate maintenance debt.

---

## 11. Accessibility (Quick Audit)

**Score: 9/10**

**Excellent implementations found:**
- Skip link: `client/index.html` and `App.tsx:113` — `.skip-link` implemented with correct `focus:top:0` reveal
- Route announcer: `App.tsx:49-76` — `aria-live="polite"` region announces navigation to screen readers (WCAG 4.1.3)
- Focus management on route change: `App.tsx:61-63` — `#main-content` receives programmatic focus
- Mobile drawer focus trap: `Navbar.tsx:51-84` — Escape key, Tab cycle, initial focus all implemented
- `aria-current="page"` on active nav links: `Navbar.tsx:125`
- `aria-label` on hamburger: `Navbar.tsx:153`
- Form labels via sr-only: `Waitlist.tsx` — all inputs have associated labels
- `prefers-reduced-motion` comprehensive: `index.css:1105-1177` — all animations disabled

**Issues:**

- **A11Y-01** `client/src/pages/Home.tsx:133` — The phone mockup container has `aria-hidden="true"` which is correct (decorative). But the `PhoneMockup` component itself contains text content ("Patient", "Dentist", "Your Personal Dental Companion") that aria-hidden removes from the accessibility tree entirely. Ensure this content is truly decorative and not informational.

- **A11Y-02** `client/src/pages/Home.tsx:147` — The ticker strip has `aria-hidden="true"` — correct, as it contains marketing repetition. Verified.

- **A11Y-03** Heading hierarchy: Multiple pages use `<h3>` for feature card titles directly after an `<h2>` section title. This is correct. Not flagged.

---

## 12. Lighthouse Score Estimation

Based on static analysis (no live Lighthouse run):

| Metric | Estimated | Reasoning |
|--------|-----------|-----------|
| Performance | 78-85 | 108 KB gzip JS on first load; LCP image preloaded as WebP; CSS 18.5 KB gzip; no render-blocking third-party scripts; static pre-render shell in HTML |
| Accessibility | 92-96 | Skip link, ARIA landmarks, focus management, reduced-motion — a few minor gaps |
| Best Practices | 88-92 | No console errors; HTTPS; no deprecated APIs; manifest.json present but icons array only has SVG (maskable PNG recommended) |
| SEO | 90-95 | Canonical tags, structured data, hreflang, meta descriptions per page; minor crawlability concern (SPA requiring JS) mitigated by noscript fallback |

**Estimated composite Lighthouse score: ~87/100**

**Key Lighthouse drag factors:**
1. Main JS chunk at 347 KB raw triggers a "Reduce JavaScript payload" warning
2. Missing AVIF/WebP `<picture>` with srcset on team photos (served as JPEG)
3. No explicit font cache headers on `/fonts/` (impacts repeat visit score)
4. BlogPost at 66 KB is driven by inline article content, not optimizable without a CMS/API

---

## Priority Fixes (Ranked by Impact)

### P0 — High Impact, Low Effort

1. **Add `/fonts/(.*)` cache header to `vercel.json`** — 30 seconds to fix, saves 70 KB re-download on repeat visits (FONT-02)
2. **Remove dead assets** — Delete `logomark-dark.png` (36 KB) and `eduard-formal.jpg` (30 KB) from `client/public/images/` (DEP-06, DEP-07)
3. **Add `loading="lazy"` to Blog author avatars** — `client/src/pages/Blog.tsx:227,285` (IMG-05)

### P1 — High Impact, Medium Effort

4. **Convert headshot JPEGs to WebP** — `anca-headshot.jpg` (19 KB) and `eduard-headshot.jpg` (43 KB) → estimated 30-40% size reduction (IMG-01)
5. **Fix duplicate Gabarito `@font-face` declarations** — Collapse 4 declarations into 2 using `font-weight: 400 700` range syntax (FONT-01)
6. **Remove `CustomCursor.tsx` and its CSS** — Delete dead component and its `#cursor-dot`/`#cursor-ring` CSS rules from `index.css:1072-1098` (DEP-03)
7. **Remove `useScrollReveal.ts`** — Dead hook file containing `useScrollReveal` and `useCountUp` (DEP-04)

### P2 — Medium Impact, Medium Effort

8. **Simplify `ThemeContext`** — The dark theme is hardcoded; if switching is not planned, remove the context entirely and the `localStorage` read on startup (DEP-05)
9. **Fix `.flex` CSS override** — Rename `.flex` in `@layer components` to a more specific selector to avoid shadowing Tailwind's utility (CSS-01)
10. **Improve vendor chunk splitting** — Separate `react`/`react-dom` from `wouter` in `manualChunks` for better cache invalidation (TREE-01)
11. **Add srcset to team photos** — Serve mobile-sized variants for the 80px avatar use case (IMG-02)

### P3 — Lower Impact, Higher Effort

12. **Extract blog article content to JSON/API** — BlogPost.tsx at 66 KB gzip is dominated by inline article strings. Extracting to a `data/` directory and dynamic `import()` would allow per-article code splitting (PERF bloat in BlogPost chunk)
13. **Audit and remove unused Radix packages** — If the landing page scope is final, remove 23 of 26 `@radix-ui/*` packages from `package.json` (DEP-01)
14. **Add AVIF format** — Wrap background images in `<picture>` with AVIF source for ~50% additional compression (IMG-06)

---

## Score Rationale: 6/10

**What brings the score up:** Excellent code splitting with React.lazy, zero third-party scripts, self-hosted fonts with `font-display: swap`, proper LCP image handling with fetchPriority, TypeScript strict mode passing cleanly, comprehensive accessibility implementation, correct Tailwind v4 purging, and a solid 133 KB gzip first-load transfer.

**What brings the score down:** The main bundle at 347 KB raw is above ideal for a landing page (150-200 KB target). A large portion of installed packages (`shadcn/ui` components, 23+ Radix packages) are dormant. Two dead public assets (66 KB combined) ship to production. The `useScrollReveal` hook file and `CustomCursor` component are dead code. The `ThemeContext` runs on every page load for zero effect. The font caching gap means repeat visitors re-download 70 KB of fonts. The `.flex` CSS override is a latent bug risk. The absence of `srcset` and AVIF means mobile users receive desktop-sized images.

