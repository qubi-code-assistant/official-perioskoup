# Code Quality & Performance Re-Audit — Perioskoup Landing Page

**Date:** 2026-03-06
**Auditor:** Performance Re-Auditor (Claude Sonnet 4.6)
**Original Score:** 7.2 / 10
**Re-Audit Score: 8.3 / 10**

---

## Build Output — Current State

```
pnpm build — vite v7.1.9, 1638 modules transformed, 860ms

index.html                    20.08 kB │ gzip:   5.45 kB
assets/index.css             105.88 kB │ gzip:  18.56 kB
assets/HeroGlow               0.59 kB │ gzip:   0.35 kB
assets/ParallaxHeroBg         0.82 kB │ gzip:   0.55 kB
assets/Breadcrumb             1.13 kB │ gzip:   0.66 kB
assets/NotFound               1.57 kB │ gzip:   0.82 kB
assets/Terms                  4.47 kB │ gzip:   1.80 kB
assets/Privacy                4.52 kB │ gzip:   1.84 kB
assets/Waitlist              10.54 kB │ gzip:   3.34 kB
assets/Features              10.63 kB │ gzip:   3.56 kB
assets/Pricing               11.88 kB │ gzip:   3.74 kB
assets/Contact               12.35 kB │ gzip:   3.73 kB
assets/Blog                  13.17 kB │ gzip:   4.22 kB
assets/vendor                17.47 kB │ gzip:   6.60 kB  (react, react-dom, wouter)
assets/About                 19.67 kB │ gzip:   5.66 kB
assets/ForDentists           21.16 kB │ gzip:   6.12 kB
assets/BlogPost              66.05 kB │ gzip:  21.08 kB
assets/index                347.63 kB │ gzip: 108.07 kB  ← main chunk
✓ built in 860ms
```

**Initial load (gzip): ~138 KB**
HTML (5.5) + CSS (18.6) + vendor (6.6) + main (108.1) = 138.8 KB gzip

Zero TypeScript errors (`pnpm check` clean).

---

## Fix Verification — What Was Done

### Confirmed fixed

| Fix | Status |
|-----|--------|
| `useReveal` extracted to shared hook | DONE — `client/src/hooks/useReveal.ts` exists; all 8 pages import from it; zero inline copies remain |
| Dead file `Map.tsx` deleted | DONE — not found in filesystem |
| Dead file `HeroBackground.tsx` deleted | DONE — not found in filesystem |
| Orphan `hero-bg.jpg` deleted | DONE — only `hero-bg.webp` (13 KB) exists |
| Orphan `petrica.jpg` deleted | DONE — only `petrica.webp` (27 KB) exists |
| Route-level code splitting (React.lazy) | DONE — 11 lazy routes + Suspense boundary in App.tsx |
| Vendor chunk split | DONE — `vendor-CNPUEJO5.js` (17.5 KB) isolates react, react-dom, wouter |
| `target: "esnext"` in vite.config.ts | DONE |
| `cssMinify: true` in vite.config.ts | DONE |
| `modulePreload: { polyfill: false }` | DONE |
| `decoding="async"` removed from LCP hero | DONE |
| `hero-bg.webp` preloaded + LCP `type="image/webp"` | DONE |
| Unused deps removed (framer-motion, axios, nanoid, zod, etc.) | DONE — 8 production + 7 heavy shadcn deps removed |
| `express` moved to devDependencies | DONE |
| `add` devDep removed | DONE |
| `@types/google.maps` removed | DONE |
| Non-composited animations fixed (box-shadow → transform, top → translateY) | DONE — pulse-ring, scan-line, hero-scan all use GPU-composited properties |
| Image lazy loading + width/height on below-fold images | DONE across Home, About, Blog, BlogPost, PhoneMockup |
| Gabarito 700 weight declared (both 400 and 700 use same file, intentional) | PRESENT — both weights declared with `unicode-range` split |

---

## Current Issues — New Findings

### 1. Bundle size: main chunk still 347 KB raw / 108 KB gzip

The main chunk remains unchanged from the original audit baseline. The vendor chunk split (react/react-dom/wouter → 17.5 KB gzip) correctly isolates the framework. However, the original recommendations to also split `react-helmet-async`, `sonner`, and `@radix-ui/react-tooltip` into a `providers` chunk were **not implemented**.

`vite.config.ts` currently has:
```ts
manualChunks: {
  vendor: ["react", "react-dom", "wouter"],
}
```

Splitting providers would save an estimated 25–35 KB raw from the main chunk. This is the single largest remaining actionable bundle improvement.

### 2. Radix UI packages: 25 packages installed, 7 actually needed

The original audit flagged 20+ unused Radix packages in `package.json`. The fix log addressed the heavy non-Radix dependencies (framer-motion, recharts, vaul, etc.) but **left all Radix packages intact**. Current state:

**Installed:** 25 `@radix-ui/*` packages in `dependencies`
**Actually needed by imported components:**
- `@radix-ui/react-dialog` — dialog.tsx, sheet.tsx (Sheet reuses Dialog)
- `@radix-ui/react-label` — label.tsx
- `@radix-ui/react-separator` — separator.tsx
- `@radix-ui/react-slot` — button.tsx (via CVA)
- `@radix-ui/react-toggle` — toggle.tsx
- `@radix-ui/react-tooltip` — tooltip.tsx (TooltipProvider in App.tsx)

**Installed but not needed by any imported component:**
- `@radix-ui/react-accordion`, `react-alert-dialog`, `react-aspect-ratio`, `react-avatar`, `react-checkbox`, `react-collapsible`, `react-context-menu`, `react-dropdown-menu`, `react-hover-card`, `react-menubar`, `react-navigation-menu`, `react-popover`, `react-progress`, `react-radio-group`, `react-scroll-area`, `react-select`, `react-slider`, `react-switch`, `react-tabs`, `react-toggle-group` — **19 packages unused at the page level**

These don't affect bundle output (Rollup tree-shakes them since their wrapper files are never imported by pages), but they inflate `node_modules` by ~40–60 MB, increase install time, and create unnecessary CVE surface.

### 3. `tailwindcss-animate` in production dependencies — redundant

`package.json` has `"tailwindcss-animate": "^1.0.7"` in `dependencies` (production). The CSS file imports `tw-animate-css` from `devDependencies`. `tailwindcss-animate` is **never imported anywhere** in source code — not in `index.css`, not in any TS/TSX file. It is an unused production dependency. Remove it.

### 4. `CustomCursor.tsx` — dead component

`client/src/components/CustomCursor.tsx` defines a full custom cursor with RAF animation loop. It is **never imported by any page or App.tsx**. The CSS for `#cursor-dot` and `#cursor-ring` exists in `index.css` (lines 1072–1099), but the component that renders those DOM elements is orphaned.

Either: (a) import and render `<CustomCursor />` in App.tsx to activate it, or (b) delete the file and remove the cursor CSS block from `index.css`. As-is, it adds maintenance confusion: the CSS styles are present but the cursor never appears.

### 5. `logomark-dark.png` and `eduard-formal.jpg` — unreferenced static assets

Two images in `client/public/images/` are not referenced by any source file:
- `logomark-dark.png` — 36 KB. Referenced only in `feed.xml` (RSS) at `https://perioskoup.com/images/logomark-dark.png`. If the RSS logo is intentional, it's fine to keep. If not, delete.
- `eduard-formal.jpg` — 30 KB. Not referenced by any source file, feed, or sitemap. Dead file, should be deleted.

### 6. `useMobile.tsx` — wrong file extension

`client/src/hooks/useMobile.tsx` contains no JSX — it only exports `useIsMobile()` using `React.useState` and `React.useEffect`. The `.tsx` extension is incorrect; it should be `.ts`. This is cosmetically wrong and can confuse editors and bundler inspection tools. The original audit flagged this; it remains unfixed.

Additionally, `useIsMobile` is only consumed by `sidebar.tsx`, which is itself never imported by any page or non-ui component. This means `useIsMobile` is effectively dead at runtime (the sidebar component is never rendered). Both `useMobile.tsx` and `sidebar.tsx` are dead code paths in the current production app.

### 7. `useScrollReveal.ts` and `usePersistFn.ts` — orphan hooks

`client/src/hooks/useScrollReveal.ts` — A different IntersectionObserver hook with a ref-based interface. Not imported by any page (all pages now use `useReveal.ts`). It remains as dead code.

`client/src/hooks/usePersistFn.ts` — Imported only by `useComposition.ts`, which is imported only by `ui/input.tsx` and `ui/textarea.tsx`. Those components ARE used (they're in the active shadcn/ui set). So `usePersistFn` → `useComposition` → `input`/`textarea` is a live chain. Not dead, but worth noting: `usePersistFn` uses `...args: any[]` in its type signature, which contributes to type imprecision.

`useScrollReveal.ts` should be deleted as it is now fully superseded by `useReveal.ts`.

### 8. Gabarito 700 weight still uses same file as weight 400

As flagged in the original audit: both `font-weight: 400` and `font-weight: 700` declarations for Gabarito point to `gabarito-latin.woff2`. If Gabarito is a variable font (variable axis covering 400–700), this is correct behavior. If it is a static font, the browser will use faux-bold (algorithmic weight) for 700. The `gabarito-latin.woff2` at 34 KB being larger than the `gabarito-latin-ext.woff2` at 12 KB confirms the latin subset is not optimally subsetted. This issue was not addressed in the fix log.

### 9. `anca-headshot.jpg` and `eduard-headshot.jpg` still JPEG

Both team headshot images remain as JPEG originals. The fix log noted WebP conversion as a medium-priority item, but it was not completed:
- `anca-headshot.jpg` — 19 KB → estimated 8–10 KB as WebP
- `eduard-headshot.jpg` — 44 KB → estimated 18–22 KB as WebP

These are used with `loading="lazy"` so they don't affect LCP, but a 50%+ size reduction on user-visible images is worth pursuing.

---

## Verified Correct — Preserved from Original Audit

All items noted as "Done Well" in the original remain intact:
- `font-display: swap` on all web fonts
- `fetchPriority="high"` on hero LCP image (confirmed; `decoding="async"` correctly removed)
- LCP image preloaded in `<head>` with `type="image/webp"`
- Width/height on all images (CLS prevention) — confirmed across all pages
- `loading="lazy"` on all below-fold images — confirmed added in fix round
- Route-level code splitting via `React.lazy` — 11 lazy routes confirmed
- TypeScript `strict: true`, zero errors — confirmed
- Skip link + RouteAnnouncer + ARIA attributes — intact
- `prefers-reduced-motion` media query block — intact
- `passive: true` on scroll listeners — confirmed in ParallaxHeroBg
- `requestAnimationFrame` in ParallaxHeroBg
- Non-composited animations — fixed (transform/opacity replacing box-shadow/top)
- `modulePreload: { polyfill: false }` — confirmed in vite.config.ts
- `target: "esnext"` — confirmed
- Self-hosted fonts (no Google Fonts network dependency) — confirmed
- `useReveal` respects `prefers-reduced-motion` — confirmed in shared hook

---

## Remaining Priority Fixes

### High priority

1. **Split providers chunk** — add `react-helmet-async`, `sonner`, `@radix-ui/react-tooltip` to a `providers` manual chunk in `vite.config.ts`. Estimated main chunk reduction: 25–35 KB raw.

2. **Delete `CustomCursor.tsx` or activate it** — dead component creates confusion. If the custom cursor is desired, add `<CustomCursor />` to App.tsx. If not, delete the file and remove the `#cursor-dot` / `#cursor-ring` CSS block from `index.css`.

3. **Remove `tailwindcss-animate` from production dependencies** — not imported anywhere; `tw-animate-css` (devDep) is the actual CSS import. Run `pnpm remove tailwindcss-animate`.

4. **Delete `client/public/images/eduard-formal.jpg`** (30 KB orphan, zero references).

### Medium priority

5. **Remove 19 unused Radix packages** from `package.json` dependencies. While they don't bloat the bundle, they add to install time and vulnerability surface. Only these 7 are needed: `react-dialog`, `react-label`, `react-separator`, `react-slot`, `react-toggle`, `react-tooltip` (+ `react-dialog` handles sheet via re-export).

6. **Delete `useScrollReveal.ts`** — fully superseded by `useReveal.ts`, not imported anywhere.

7. **Delete `sidebar.tsx`** — not imported by any page. Its only consumers are itself and `useMobile.tsx`. Removes one more dead Radix dependency chain.

8. **Convert `useMobile.tsx` to `.ts`** — no JSX present.

9. **Convert `anca-headshot.jpg` and `eduard-headshot.jpg` to WebP** — estimated 50% size reduction each.

### Low priority

10. **Subset `gabarito-latin.woff2`** — at 34 KB it is oversized for a woff2 latin subset. Run through `pyftsubset` to extract only used characters (expected output: 12–16 KB).

11. **Verify Gabarito 700 weight** — confirm whether the single file is a variable font covering both 400 and 700 axes. If static, a separate bold woff2 is needed for true 700 rendering.

12. **Add route prefetch on hover** — still not implemented. When a user hovers a nav link, prefetch the corresponding lazy chunk. Eliminates the Suspense blank flash on navigation.

---

## Score Breakdown

| Category | Previous | Current | Notes |
|----------|----------|---------|-------|
| Bundle size | 6/10 | 7/10 | Vendor chunk split done, code splitting done; providers chunk still missing; main chunk unchanged at 108 KB gzip |
| Dependency hygiene | 5/10 | 6/10 | 8 heavy deps removed; 19 unused Radix packages remain; `tailwindcss-animate` prod dep unused |
| Component architecture | 6/10 | 8/10 | `useReveal` DRY violation fixed across 8 files; dead Map.tsx and HeroBackground.tsx deleted; CustomCursor.tsx now orphaned |
| Image optimization | 8/10 | 8/10 | hero-bg.jpg and petrica.jpg deleted; headshots still JPEG; `logomark-dark.png` and `eduard-formal.jpg` unresolved |
| CSS | 7/10 | 7/10 | Non-composited animations fixed; custom cursor CSS for orphaned component still present; Gabarito weight unresolved |
| TypeScript | 9/10 | 9/10 | Zero errors; 3 `any` casts in ui/ scaffolding remain (acceptable); `useMobile.tsx` extension mismatch |
| Code splitting | 8/10 | 9/10 | All routes lazy; vendor chunk extracted; providers chunk recommended but not applied |
| Tree shaking | 8/10 | 8/10 | Icons named-imported; shadcn wrappers tree-shaken; providers still in main chunk |
| Font loading | 7/10 | 7/10 | Self-hosted, font-display:swap, preloaded — no change; Gabarito 700 concern persists |
| Accessibility | 9/10 | 9/10 | All original a11y patterns intact; no regressions; no improvements added |

**Overall Score: 8.3 / 10**

---

## Summary

The fix round delivered significant improvements: the critical `useReveal` DRY violation is resolved, dead files (Map.tsx, HeroBackground.tsx, hero-bg.jpg, petrica.jpg) are gone, code splitting is properly implemented across all routes, a vendor chunk is correctly extracted, non-composited animations were fixed, and 15 unused dependencies were removed from the manifest. TypeScript remains clean at zero errors.

The remaining gap to a 9+ score is primarily dependency hygiene (19 unused Radix packages, one unused production dep) and the CustomCursor dead-code situation. The main chunk size is structurally bounded by the Home page component itself and won't improve meaningfully without splitting the providers chunk or breaking Home into sub-components. Those are medium-effort wins still on the table.

This is a well-optimised pre-launch landing page. The architecture is sound, the a11y foundations are excellent, and the build process is clean.
