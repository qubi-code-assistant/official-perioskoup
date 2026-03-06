# 09 — Code & Frontend Performance Audit

**Date:** 2026-03-06
**Auditor:** Frontend Performance Specialist (Claude Sonnet 4.6)
**Score: 5 / 10**

---

## Build Output Summary

```
dist/public/index.html                   6.51 kB  │ gzip:   1.95 kB
dist/public/assets/index-Cb6jz-BC.css  115.15 kB  │ gzip:  19.08 kB
dist/public/assets/index-BGrw6I1j.js   485.36 kB  │ gzip: 142.53 kB
```

Single chunk. No code splitting. 1631 modules transformed.

---

## 1. Bundle Size Breakdown

**Status: CRITICAL — single monolithic bundle, no route splitting**

- Total JS: 485 kB raw / 142 kB gzip
- Total CSS: 115 kB raw / 19 kB gzip
- All 12 route pages ship in one bundle, loaded on every page visit

The ~485 kB JS bundle is primarily composed of:
- React + React DOM (~140 kB)
- All 12 page components loaded eagerly
- Sonner (toast library) — confirmed in bundle (~126 references)
- react-hook-form — in bundle (~7 references) despite no forms using it via the library API (forms are plain HTML in pages)
- All shadcn/ui component wrappers (accordion, alert-dialog, avatar, calendar, carousel, chart, command, context-menu, dialog, drawer, hover-card, input-otp, menubar, navigation-menu, popover, radio-group, resizable, scroll-area, select, sheet, sidebar, slider, toggle, toggle-group, tooltip, etc.)

Vite tree-shook recharts, framer-motion, embla-carousel, react-day-picker, cmdk, vaul, and react-resizable-panels successfully (not present in the final bundle). That is a genuine win.

However, the entire shadcn/ui component library is registered via ui/ wrappers that are imported through the Toaster and TooltipProvider in App.tsx, pulling their transitive imports along regardless of page.

---

## 2. Dependency Audit

**Status: POOR — multiple unused packages in package.json**

### Unused in production code (confirmed by bundle analysis and grep):
| Package | In package.json | Used in pages/components |
|---|---|---|
| `framer-motion` | Yes | No imports found anywhere |
| `recharts` | Yes | Only in `ui/chart.tsx` (not used by any page) |
| `embla-carousel-react` | Yes | Only in `ui/carousel.tsx` (not used by any page) |
| `react-day-picker` | Yes | Only in `ui/calendar.tsx` (not used by any page) |
| `cmdk` | Yes | Only in `ui/command.tsx` (not used by any page) |
| `vaul` | Yes | Only in `ui/drawer.tsx` (not used by any page) |
| `input-otp` | Yes | Only in `ui/input-otp.tsx` (not used by any page) |
| `react-resizable-panels` | Yes | Only in `ui/resizable.tsx` (not used by any page) |
| `streamdown` | Yes | No imports found |
| `axios` | Yes | No imports found |
| `nanoid` | Yes | No imports found |
| `@hookform/resolvers` | Yes | No imports found |
| `express` | Yes, in `dependencies` | Server-only, should be in `devDependencies` or removed |
| `next-themes` | Yes | ThemeContext is custom, not using next-themes |
| `react-hook-form` | Yes | Pages use plain HTML forms; react-hook-form in bundle via ui/form.tsx |
| `zod` | Yes | ui/form.tsx only — no page uses validation schema |

`express` is in `dependencies` (not `devDependencies`) — it will be bundled in any Node deployment even though it is only used for local dev.

### Development dependencies that are fine:
`@tailwindcss/typography`, `vitest`, `prettier`, `typescript`, etc. — correctly placed.

---

## 3. Code Splitting

**Status: CRITICAL — zero route-level splitting**

```tsx
// App.tsx — all routes eagerly imported
import Home from "./pages/Home";
import Features from "./pages/Features";
import ForDentists from "./pages/ForDentists";
// ... all 11 pages imported at the top
```

No `React.lazy()` or `Suspense` anywhere in the codebase. Every visitor downloads all 12 pages worth of JS on first load regardless of which route they navigate to. With `React.lazy`, each page would become a separate chunk (~20-40 kB each), dramatically improving FCP and TTI.

The Vite config has no `rollupOptions.output.manualChunks` configuration and no `chunkSizeWarningLimit` override.

---

## 4. Tree Shaking

**Status: GOOD — third-party libraries effectively excluded**

Vite + ESModules tree-shaking is working correctly for the large libraries (recharts, framer-motion, embla-carousel, react-day-picker, cmdk, vaul) that live in `ui/` files but are never imported by pages. These do not appear in the final bundle.

The problem is not tree-shaking failure — it is the sheer number of installed dependencies that are never used at all, inflating `node_modules` and creating maintenance debt.

---

## 5. Component Architecture

**Status: MODERATE — functional but with code duplication**

### Duplicated `useReveal` hook (9 copies):
Every page file defines its own identical `useReveal()` function:

```tsx
// Defined separately in: Home.tsx, Features.tsx, ForDentists.tsx,
// About.tsx, Blog.tsx, BlogPost.tsx, Contact.tsx, Waitlist.tsx,
// Pricing.tsx, Privacy.tsx, Terms.tsx
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(...);
    document.querySelectorAll(".reveal, .reveal-scale").forEach(...);
    return () => io.disconnect();
  }, []);
}
```

A `useScrollReveal.ts` hook already exists in `client/src/hooks/` but is never used. The duplicated inline version queries the entire `document` (not a scoped ref), meaning on SPA navigation the hook from the previous page may still be observing stale DOM nodes briefly.

### CDN image URLs duplicated across pages:
The same CloudFront image URLs (anca, edi, petrica, award) are hard-coded in at least 4 separate page files (Home.tsx, About.tsx, Blog.tsx, BlogPost.tsx). A shared constants file or shared `TEAM_ASSETS` export would eliminate this.

### Positive patterns:
- Navbar, Footer, Logo, HeroBackground, ParallaxHeroBg, HeroGlow, PhoneMockup, Breadcrumb, ErrorBoundary are properly extracted as shared components
- ErrorBoundary is correctly implemented as a class component
- ThemeContext is clean and typed

---

## 6. Image Optimization

**Status: MODERATE — CDN used, but missing key attributes**

### Positives:
- All images served from CloudFront CDN (`d2xsxph8kpxj0f.cloudfront.net`) — good latency, global edge
- Mix of formats: `.webp` used for background images (featuresBg, ctaBg, howItWorks, award), which is correct
- Portrait photos are `.jpeg`/`.png` — acceptable

### Issues:
- **No `loading="lazy"` on any `<img>` tag** — all 8+ image elements (team portraits, award photo) load eagerly, including those far below the fold. This directly hurts LCP and wastes bandwidth on mobile.
- **No `srcset` or `sizes` attributes** — serving the same full-resolution image to mobile (375px) and desktop (1440px) users
- **No `width`/`height` attributes on `<img>` tags** — browser cannot reserve layout space before image loads, causing Cumulative Layout Shift (CLS)
- **Hero background (`hero-bg-soft_c6281481.png`) is a `.png`** — the largest and most prominent image on the site is not WebP/AVIF. This should be converted.
- **No `preload` hint for the hero background image** — LCP image loads after CSS/JS parsing completes
- **No `preconnect` for CloudFront CDN origin** — only Google Fonts gets preconnect hints; the CDN serving all images does not

---

## 7. CSS / Tailwind

**Status: GOOD — Tailwind v4 with vite plugin, purging is automatic**

- Tailwind CSS v4 via `@tailwindcss/vite` plugin — content-based purging is built in, no manual `content` array needed
- Final CSS: 19 kB gzip — reasonable
- The design system uses a mix of Tailwind utility classes and custom component classes in `index.css`. Both are valid in Tailwind v4.
- `tw-animate-css` is imported (`@import "tw-animate-css"`) — adds animation utilities but adds to CSS payload

### Issues:
- `outline: none` is set on `.p-input` and `.p-select` without any visible `:focus-visible` alternative. Keyboard users navigating forms will have no visible focus indicator on these elements.
- The `@layer base` rule `* { @apply border-border outline-ring/50; }` applies a global outline to every element — this partially compensates but is not reliable across all interactive states.
- Some CSS animation classes (`.animated-bg-img.breathe`, `.animated-bg-img.float-bg`, `.animated-bg-img.rotate-slow`) are defined but never referenced in any component file.

---

## 8. TypeScript

**Status: GOOD — strict mode on, minimal `any` usage**

- `tsconfig.json` has `"strict": true` — all strict checks enabled
- Only 3 legitimate `as any` casts found, all in generated shadcn/ui primitives (`input.tsx`, `textarea.tsx`, `dialog.tsx`) for browser event type narrowing
- `usePersistFn.ts` has `type noop = (...args: any[]) => any` — a pragmatic utility type, acceptable
- No `any` in page files or custom components
- TypeScript version is 5.6.3 — current

---

## 9. Font Loading (FOUT/FOIT)

**Status: MODERATE — preconnect present, swap missing**

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Dongle:wght@700&family=Gabarito:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

### Positives:
- `preconnect` to both googleapis and gstatic — eliminates DNS + TLS handshake latency
- `&display=swap` is appended to the Google Fonts URL — this triggers `font-display: swap` preventing FOIT (invisible text during load)

### Issues:
- No `<link rel="preload">` for the actual `.woff2` font files — fonts are discovered only after the CSS is parsed
- Both Dongle and Gabarito are loaded as render-blocking resources (though `display=swap` mitigates FOIT, FOUT will still occur on slow connections)
- `Dongle:wght@700` only — bold only, which is correct since only 700 weight is used
- `Gabarito:wght@400;500;600;700` — four weights requested; audit of usage suggests 500 and 600 are used sparingly; could trim to `400;700` saving ~30-50 kB of font transfer

---

## 10. Accessibility

**Status: POOR — multiple critical gaps**

### Critical Issues:
- **No skip link** — keyboard users must tab through the entire Navbar on every page before reaching content
- **Mobile drawer menu lacks focus trap** — when the full-screen mobile menu opens, focus is not locked inside it; keyboard users can tab to content behind the overlay
- **`outline: none` on form inputs** — `.p-input` and `.p-select` suppress the browser default focus ring with no replacement for keyboard users
- **Form fields have no associated `<label>` elements in most pages** — Waitlist page uses placeholder text as the only label, Home page's WaitlistForm has no labels at all. Contact page is the exception (has explicit labels).
- **`<img>` elements without `width`/`height`** — all team portraits and the award photo have neither dimension attribute, causing layout shifts

### Moderate Issues:
- Nav links in mobile drawer use `<div>` instead of `<a>` or `<button>` — not natively keyboard-focusable
- Blog post list items use `<div>` inside `<Link>` for mouse hover effects — the interactive container relies on JavaScript mouseEnter/Leave instead of CSS `:hover`
- `PhoneMockup` contains purely decorative content but has no `role="presentation"` or `aria-hidden="true"` on the outer wrapper
- The animated `counter` in Home.tsx renders a `<span>` — acceptable, but the live number update has no `aria-live` region

### Positives:
- Navbar hamburger button has `aria-label="Toggle menu"`
- `ParallaxHeroBg` and `HeroGlow` correctly use `aria-hidden="true"`
- `Breadcrumb` uses semantic `<nav aria-label="Breadcrumb">` with `<ol>` and `<li>` — correct
- ErrorBoundary is well-implemented
- `lang="en-GB"` on `<html>` element

---

## 11. Lighthouse Score Estimation

Based on the code audit (no live browser run):

| Category | Estimated Score | Notes |
|---|---|---|
| Performance | 55-65 | Single monolithic 485 kB JS bundle, no lazy loading, no LCP preload, JPEG hero bg |
| Accessibility | 55-65 | No skip link, missing labels, no focus trap, outline:none on inputs |
| Best Practices | 75-80 | Good HTTPS, CDN, no console errors expected |
| SEO | 85-90 | Good meta, JSON-LD, breadcrumbs, canonical |

**Estimated overall Lighthouse Performance score: ~60**

Primary performance bottlenecks:
1. No code splitting — all 485 kB JS loads before any React renders
2. No `loading="lazy"` on below-fold images
3. Hero background is PNG (not WebP) and has no `<link rel="preload">`
4. No preconnect to CloudFront CDN

---

## Priority Fixes (Ordered by Impact/Cost)

| Priority | Fix | Effort | Expected Gain |
|---|---|---|---|
| HIGH | Route-level code splitting with `React.lazy` + `Suspense` | 2h | -100 to -200 kB initial JS, +15-25 LH points |
| HIGH | Add `loading="lazy"` to all below-fold `<img>` tags | 30min | Faster LCP, lower bandwidth on mobile |
| HIGH | Add skip link to Navbar | 15min | Fixes major a11y blocker |
| HIGH | Add `width`/`height` to all `<img>` tags | 30min | Eliminates CLS |
| HIGH | Preconnect + preload hero background image | 20min | -300ms LCP on slow connections |
| HIGH | Remove unused dependencies (framer-motion, recharts, axios, streamdown, nanoid, express from deps) | 30min | Cleaner package.json, smaller install |
| MEDIUM | Convert hero-bg PNG to WebP | 15min | -30-60% image size |
| MEDIUM | Extract `useReveal` to shared hook (already exists in hooks/) | 1h | DRY codebase, cleaner pages |
| MEDIUM | Add `srcset`/`sizes` to team portrait images | 1h | Correct image sizing on mobile |
| MEDIUM | Add `font-display: swap` preload for critical fonts | 20min | Reduces FOUT on slow connections |
| MEDIUM | Add focus-visible styles to `.p-input` / `.p-select` | 20min | Keyboard accessibility |
| MEDIUM | Add focus trap to mobile menu | 2h | Keyboard accessibility compliance |
| LOW | Move CDN image constants to shared module | 30min | DRY, easier to update |
| LOW | Trim Gabarito to 400;700 weights only | 10min | -30-50 kB font transfer |
| LOW | Move `express` to devDependencies | 5min | Correct dependency categorisation |
| LOW | Remove `next-themes` (custom ThemeContext used instead) | 5min | Smaller node_modules |

---

## Score: 5 / 10

**Rationale:**

The foundation is solid: TypeScript strict mode, Tailwind v4 with automatic purging, CDN for all images, working tree-shaking, clean component extraction, and preconnect for fonts. The build completes cleanly in under 1 second.

The score is held back by three systemic issues:
1. **Zero code splitting** — the entire app ships as a single 485 kB JS bundle with no route-level lazy loading. This is the highest-impact performance issue.
2. **No image lazy loading or dimension attributes** — all images load eagerly with no `loading="lazy"`, `width`, or `height`, directly impacting LCP and CLS.
3. **Accessibility gaps** — no skip link, no focus trap in mobile menu, `outline: none` without replacement on form inputs, and missing `<label>` elements in the primary conversion form (Waitlist).

These issues are all straightforward to fix with known patterns and would move the estimated Lighthouse score from ~60 to ~80+.
