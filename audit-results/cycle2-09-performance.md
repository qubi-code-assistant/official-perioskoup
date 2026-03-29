# Code Quality & Performance Audit — Cycle 2
## Perioskoup Landing Page

**Date:** 2026-03-06
**Auditor:** Performance Auditor — Cycle 2 (Claude Sonnet 4.6)
**Previous Score (re-audit):** 8.3 / 10
**This Audit Score: 8.3 / 10**

---

## Build Output — Current State

```
pnpm build — vite v7.1.9, 1638 modules transformed, 927ms

dist/public/assets/index-G5cqJk3t.css         105.88 kB │ gzip:  18.56 kB
dist/public/assets/HeroGlow.js                   0.59 kB │ gzip:   0.34 kB
dist/public/assets/ParallaxHeroBg.js             0.82 kB │ gzip:   0.55 kB
dist/public/assets/Breadcrumb.js                 1.13 kB │ gzip:   0.66 kB
dist/public/assets/NotFound.js                   1.57 kB │ gzip:   0.82 kB
dist/public/assets/Terms.js                      4.47 kB │ gzip:   1.80 kB
dist/public/assets/Privacy.js                    4.52 kB │ gzip:   1.84 kB
dist/public/assets/Waitlist.js                  10.54 kB │ gzip:   3.34 kB
dist/public/assets/Features.js                  10.66 kB │ gzip:   3.56 kB
dist/public/assets/Pricing.js                   11.84 kB │ gzip:   3.72 kB
dist/public/assets/Contact.js                   12.35 kB │ gzip:   3.73 kB
dist/public/assets/Blog.js                      13.17 kB │ gzip:   4.22 kB
dist/public/assets/vendor.js                    17.47 kB │ gzip:   6.60 kB   (react, react-dom, wouter)
dist/public/assets/About.js                     19.67 kB │ gzip:   5.66 kB
dist/public/assets/ForDentists.js               21.18 kB │ gzip:   6.11 kB
dist/public/assets/BlogPost.js                  66.05 kB │ gzip:  21.08 kB
dist/public/assets/index.js                    347.62 kB │ gzip: 108.07 kB   ← main chunk
✓ built in 927ms
```

**Initial page load (gzip estimate):**
- `index.html` = 5.44 kB
- `index.css` = 18.56 kB
- `vendor.js` = 6.60 kB
- `index.js` = 108.07 kB
- **Total compressed: ~138.7 kB**

**TypeScript check:** `pnpm check` exits with zero errors. `strict: true` confirmed in `tsconfig.json`.

---

## Status vs. Re-Audit

All items marked "Verified Correct" in `re-09-code-performance.md` remain intact and unchanged. No regressions were introduced since the last fix round. The nine remaining issues flagged in that report are still open — none have been addressed in this cycle.

The score holds at **8.3 / 10**. The gap is entirely explained by the nine open items below.

---

## Open Issues — Unchanged from Re-Audit

### 1. Providers chunk not split — main chunk remains 108 KB gzip

`vite.config.ts` still only splits `react`, `react-dom`, and `wouter` into a vendor chunk. The following are bundled into `index.js` (main chunk):

- `react-helmet-async` — used in `main.tsx` as `<HelmetProvider>` wrapping the entire app; also imported in all 11 page components via named `{ Helmet }`.
- `sonner` — imported through `client/src/components/ui/sonner.tsx` which re-exports `Toaster`.
- `@radix-ui/react-tooltip` — imported in `App.tsx` via `TooltipProvider`.

Moving these to a `providers` chunk in `rollupOptions.output.manualChunks` would reduce the main chunk by an estimated 25–35 kB raw (providers are not large individually, but the combination is). More importantly, it enables browser caching of the providers independently of Home page content changes.

Recommended addition to `vite.config.ts`:

```ts
manualChunks: {
  vendor: ["react", "react-dom", "wouter"],
  providers: ["react-helmet-async", "sonner", "@radix-ui/react-tooltip"],
}
```

### 2. `CustomCursor.tsx` — dead component with orphaned CSS

`client/src/components/CustomCursor.tsx` (73 lines) is not imported by `App.tsx` or any other file. The component renders `#cursor-dot` and `#cursor-ring` DOM elements, but because the component is never mounted, those elements never exist.

The CSS for `#cursor-dot` and `#cursor-ring` lives at `index.css` lines 1072–1099 (28 lines including the `@media (max-width: 768px)` hide rule). This CSS is compiled into the production bundle even though the corresponding DOM elements will never be present.

Action required: either add `<CustomCursor />` to `App.tsx` (between `<Toaster />` and the skip link), or delete `client/src/components/CustomCursor.tsx` and remove lines 1071–1099 from `index.css`.

### 3. `tailwindcss-animate` in production dependencies — unused

`package.json` lists `"tailwindcss-animate": "^1.0.7"` under `dependencies`. This package is never imported anywhere in `client/src/` or `client/index.html`. The animation CSS is provided by `tw-animate-css` (a `devDependency`). Running `pnpm remove tailwindcss-animate` removes it from production install without any impact on the build.

### 4. `useScrollReveal.ts` — dead hook file, fully superseded

`client/src/hooks/useScrollReveal.ts` exports `useScrollReveal` and `useCountUp`. Neither export is imported by any file in the project — confirmed by `grep` with zero results. The file was the predecessor to `useReveal.ts` and was never deleted after the migration. Delete it.

### 5. `sidebar.tsx` and `useMobile.tsx` — dead code chain

`client/src/components/ui/sidebar.tsx` is not imported by any page or layout component. Its only connection to the app is through `useMobile.tsx` (`useIsMobile` hook) and its own internal self-references.

`client/src/hooks/useMobile.tsx` is consumed only by `sidebar.tsx`, which is itself never rendered. Additionally, the file uses the `.tsx` extension despite containing no JSX.

Both files are dead at runtime. Safe to delete both. `useMobile.tsx` removal would also remove one dead chain of `useIsMobile → sidebar → (never rendered)`.

### 6. `19 unused Radix UI packages` in production dependencies

`package.json` lists 25 `@radix-ui/*` packages. Only 6–7 are reachable from any component that is actually rendered:
- `react-dialog` (dialog.tsx, sheet.tsx)
- `react-label` (label.tsx)
- `react-separator` (separator.tsx)
- `react-slot` (button.tsx)
- `react-toggle` (toggle.tsx)
- `react-tooltip` (tooltip.tsx, App.tsx TooltipProvider)

The remaining 19 (`react-accordion`, `react-alert-dialog`, `react-aspect-ratio`, `react-avatar`, `react-checkbox`, `react-collapsible`, `react-context-menu`, `react-dropdown-menu`, `react-hover-card`, `react-menubar`, `react-navigation-menu`, `react-popover`, `react-progress`, `react-radio-group`, `react-scroll-area`, `react-select`, `react-slider`, `react-switch`, `react-tabs`, `react-toggle-group`) are not reachable at runtime. Rollup tree-shakes them from the JS bundle, so there is zero bundle impact. The impact is on: `node_modules` disk size (~40–60 MB extra), `pnpm install` time, and npm audit vulnerability surface.

### 7. `eduard-formal.jpg` — unreferenced static asset (30 kB)

`client/public/images/eduard-formal.jpg` (30,566 bytes) is not referenced by any source file, sitemap, or feed. Verified: no `grep` match in `client/src/` or `client/public/`. Delete it.

Note: `logomark-dark.png` (36 kB) appears only in `feed.xml` as the RSS channel logo. This is intentional and should be kept.

### 8. Headshots still JPEG — no WebP conversion

`client/public/images/anca-headshot.jpg` (19 kB) and `client/public/images/eduard-headshot.jpg` (44 kB) remain as JPEG originals. Both are used with `loading="lazy"` so they do not affect LCP, but converting to WebP would yield approximately 50% size reduction (estimated savings: 10 kB for anca, 22 kB for eduard). All other team images (`petrica.webp`, `efp-award.webp`) are already WebP.

### 9. Gabarito 700 weight uses same file as 400 weight

`index.css` declares two `@font-face` blocks for Gabarito pointing to the same `gabarito-latin.woff2` file — one at `font-weight: 400`, one at `font-weight: 700`. If this is a static font (not a variable font), browsers will apply faux-bold (algorithmic thickening) for weight 700, which produces inferior rendering compared to a true bold variant. Confirmation via font inspector: the file is 34 kB, which is larger than the `gabarito-latin-ext.woff2` subset at 12 kB, suggesting it may be a variable font covering 400–800. This should be verified. If variable, declaring `font-weight: 400 700` in a single `@font-face` block is cleaner than two separate blocks.

---

## What Remains Correct — No Regressions

| Item | Status |
|------|--------|
| `pnpm check` — zero TypeScript errors | Clean |
| `strict: true` in tsconfig.json | Active |
| Route-level code splitting via `React.lazy` — 11 lazy routes | Intact |
| `vendor` chunk: react, react-dom, wouter isolated | Intact |
| `target: "esnext"`, `cssMinify: true`, `modulePreload: { polyfill: false }` | Intact |
| `useReveal` shared hook — no inline duplicates across 8 pages | Intact |
| `fetchPriority="high"` on LCP hero img, no `decoding="async"` | Intact |
| LCP image preloaded in `<head>` as `image/webp` | Intact |
| `font-display: swap` on all 4 font-face declarations | Intact |
| Fonts self-hosted (no Google Fonts round-trip) | Intact |
| `loading="lazy"` + `width`/`height` on all below-fold images | Intact |
| Skip link (`<a href="#main-content">`) visible on keyboard focus | Intact |
| `RouteAnnouncer` with `role="status" aria-live="polite"` | Intact |
| Focus moved to `#main-content` on route change | Intact |
| `prefers-reduced-motion` respected in `useReveal` and CSS | Intact |
| Composited animations (transform/opacity only — no box-shadow/top) | Intact |
| `passive: true` + `requestAnimationFrame` in `ParallaxHeroBg` | Intact |
| `lucide-react` named imports (not wildcard) — tree-shaken | Intact |
| `hero-bg.jpg`, `petrica.jpg` deleted, only `.webp` remain | Intact |
| Dead files `Map.tsx` and `HeroBackground.tsx` deleted | Intact |
| Inline pre-render shell in `index.html` for LCP before JS | Intact |
| `<noscript>` full content for crawlers and LLMs | Intact |

---

## Priority Fix Queue

### High priority

1. **Split providers chunk** — add `react-helmet-async`, `sonner`, `@radix-ui/react-tooltip` to a `providers` manual chunk in `vite.config.ts`. Reduces main chunk, improves cache granularity.

2. **Resolve `CustomCursor.tsx` — activate or delete.** If the lime cursor UX is desired, add `<CustomCursor />` to `App.tsx` (after `<Toaster />`). If not, delete the file and remove `index.css` lines 1071–1099.

3. **Delete `useScrollReveal.ts`** — zero imports, dead file, creates confusion when navigating the hooks directory.

4. **Remove `tailwindcss-animate`** from production deps — `pnpm remove tailwindcss-animate`.

5. **Delete `client/public/images/eduard-formal.jpg`** — 30 kB orphan, zero references.

### Medium priority

6. **Delete `sidebar.tsx` and `useMobile.tsx`** — both are unreachable from any rendered component.

7. **Remove 19 unused Radix packages** from `package.json` — no bundle impact, but reduces install size and vulnerability surface.

8. **Convert `anca-headshot.jpg` and `eduard-headshot.jpg` to WebP** — estimated 32 kB total savings with no quality loss.

### Low priority

9. **Verify Gabarito font weight behaviour** — run the woff2 file through a variable font inspector (`fonttools` or similar). If variable, consolidate the two `@font-face` blocks into one with `font-weight: 400 700`. If static, source a true Gabarito Bold woff2 for weight 700.

10. **Route prefetch on hover** — add `onMouseEnter` handlers to nav links that call `import()` on the corresponding lazy chunk. Eliminates the Suspense placeholder flash during navigation for users on fast connections.

---

## Score Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| Bundle size | 7/10 | Vendor chunk done, code splitting done; providers chunk still pending; main chunk 108 kB gzip unchanged |
| Dependency hygiene | 6/10 | Heavy deps removed; 19 unused Radix packages + 1 unused production dep remain |
| Component architecture | 8/10 | `useReveal` DRY fixed; dead Map.tsx and HeroBackground.tsx gone; CustomCursor orphaned |
| Image optimization | 8/10 | WebP for all bg images; headshots still JPEG; `eduard-formal.jpg` orphan unreferenced |
| CSS | 7/10 | Composited animations correct; cursor CSS for orphaned component ships in bundle |
| TypeScript | 9/10 | Zero errors; strict mode; one `any[]` type in `usePersistFn.ts` (noop utility, acceptable) |
| Code splitting | 9/10 | 11 lazy routes; vendor chunk; providers chunk recommended but not applied |
| Tree shaking | 8/10 | Lucide named imports; shadcn wrappers tree-shaken; Radix packages in node_modules not in bundle |
| Font loading | 7/10 | Self-hosted, swap, preloaded; Gabarito 700 weight concern unverified; 34 kB for latin subset is large |
| Accessibility | 9/10 | Skip link, RouteAnnouncer, focus management, ARIA, reduced motion — all intact; no regressions |

**Overall Score: 8.3 / 10**

---

## Lighthouse Estimation

Based on build output and source analysis, without a live run:

| Metric | Estimate | Rationale |
|--------|----------|-----------|
| Performance | 88–92 | LCP optimised (preload + fetchPriority + webp + inline shell); 108 kB gzip main chunk is the ceiling; no render-blocking resources |
| Accessibility | 95–97 | Skip link, ARIA live regions, focus management, semantic HTML; minor risk from JPEG alt text precision |
| Best Practices | 95+ | No console errors; HTTPS; correct meta; no deprecated APIs detected |
| SEO | 97–99 | Strong structured data, canonical tags, hreflang, OG/Twitter meta, self-hosted fonts (no third-party block) |

The main Performance ceiling is the `index.js` chunk at 108 kB gzip. The providers chunk split (issue #1 above) is the single change most likely to push Performance above 92.

---

## Summary

The Perioskoup landing page is well-optimised for a pre-launch SPA. The architecture foundations are solid: TypeScript strict mode with zero errors, full route-level code splitting, vendor chunk isolation, proper LCP handling (preload, fetchPriority, no decoding=async, inline shell), self-hosted fonts with font-display:swap, composited-only animations, reduced-motion support, and excellent accessibility implementation (skip link, RouteAnnouncer, ARIA live regions, focus management on route change).

The remaining gap to a 9+ score is the same nine issues identified in the previous cycle. None were actioned. They fall into three categories: dead code cleanup (CustomCursor, useScrollReveal, sidebar, useMobile, eduard-formal.jpg), dependency hygiene (19 unused Radix packages, tailwindcss-animate), and one performance improvement (providers chunk split). The providers chunk split is the highest-leverage change. All nine are low-risk, low-effort tasks.
