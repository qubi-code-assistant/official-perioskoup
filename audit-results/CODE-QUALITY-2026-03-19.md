# Code Quality & Testing Audit — Perioskoup Landing Page
**Date:** 2026-03-19  
**Auditor:** Mozi Subagent (Claude Sonnet 4.6)  
**Project:** `/Users/moziplaybook/Projects/official-perioskoup`

---

## Executive Summary

| Area | Status | Grade |
|---|---|---|
| TypeScript strictness | ✅ Zero errors | A |
| Build health | ✅ Clean, no warnings | A |
| Dead code | ⚠️ Two unused exports | B |
| Component architecture | ⚠️ One god-component | B |
| Test coverage | ⚠️ Good but gaps exist | B+ |
| Dependencies | ❌ 25 vulnerabilities | D |
| CLAUDE.md accuracy | ⚠️ Minor drift | B |

---

## 1. TypeScript Strictness

**Result: PASS — zero errors.**

```
pnpm check → tsc --noEmit → (no output, exit 0)
```

`strict: true` is enabled in `tsconfig.json`. All pages and components pass with no suppression hacks (`@ts-ignore` / `@ts-expect-error` — none found in the entire codebase).

**Notable:** `usePersistFn.ts:8` uses `...args: any[]` — acceptable for a low-level hook utility but is the only `any` in production code.

---

## 2. Dead Code

### Unused Hook Exports
- **`client/src/hooks/useScrollReveal.ts`** — exports `useScrollReveal` and `useCountUp`. **Neither is imported anywhere in the project** (grep confirms zero usages outside the file itself). These are dead exports.
  - `useScrollReveal` (line 3) — dead
  - `useCountUp` (line 32) — dead

### Unused Library
- **`client/src/lib/geo-capsules.ts`** — a full geo-blog capsule system with mock data and API configuration. **Zero imports found in any component or page.** This file is entirely dead code — appears to be a planned feature never wired up.

### Unused Context Consumer
- **`client/src/contexts/ThemeContext.tsx`** — `ThemeProvider` wraps the app in `App.tsx:115`, but **`useTheme` is never called anywhere** in the codebase. The dark theme is achieved via static CSS/Tailwind classes. The ThemeContext machinery is effectively dead weight.

### Chinese-language comments
- **`client/src/hooks/useComposition.ts:44`** — contains Chinese comments ("使用两层 setTimeout 来处理 Safari 浏览器..."). This is shadcn/ui boilerplate copy-pasted verbatim. Not harmful, but signals this file was not reviewed on adoption.

### No Commented-Out Code Blocks
No significant commented-out code blocks found. Zero `TODO`/`FIXME`/`HACK` markers in production source.

---

## 3. Component Architecture

### Overall: Reasonable, with one problem

**Good patterns:**
- Shared components (`Navbar`, `Footer`, `Logo`, `Breadcrumb`, `PhoneMockup`, etc.) are appropriately small and focused.
- Route-level code splitting via `React.lazy` in `App.tsx` — well-executed.
- `useReveal` hook extracted and reused across 8 pages — good DRY discipline.
- `ErrorBoundary`, `ScrollToTop`, `RouteAnnouncer`, `PageWrapper` in `App.tsx` — properly separated concerns.

### ⚠️ God-Component: `BlogPost.tsx` (928 lines)
The entire blog content — all 6 articles as hardcoded data objects + full JSX rendering logic — lives in one file. Issues:

1. **Article data** (lines ~30–700 est.) is embedded as a giant `ARTICLES` object alongside rendering logic. This should be extracted to `client/src/data/blog-articles.ts` or similar.
2. **Per-article JSX sections** are hardcoded inline rather than using a content renderer. Adding article #7 means touching 928+ lines of mixed data/template code.
3. No separation between data layer and view layer.

**Recommendation:** Extract `ARTICLES` constant to a dedicated data file. The component itself would then be ~150 lines.

### Navbar.tsx (275 lines)
Large but justified — it handles desktop nav, mobile hamburger menu, scroll-aware styling, and CTA. Not quite a god-component but warrants monitoring.

### PhoneMockup.tsx (270 lines)
Contains what appears to be inline SVG/complex JSX for the phone illustration. Acceptable for an illustration component but could be split into sub-components if it grows further.

### UI Components (`client/src/components/ui/`)
All shadcn/ui primitives. 40+ components installed. Quick scan reveals several are almost certainly unused in this landing page context (e.g., `context-menu.tsx`, `menubar.tsx`, `alert-dialog.tsx`, `radio-group.tsx`, `slider.tsx`). Not a code quality issue per se, but adds to bundle consideration.

---

## 4. Test Coverage

### Test Infrastructure
- **Config:** `tests/playwright.config.ts` — 5 browser projects (Chromium, Firefox, WebKit desktop + Pixel 5, iPhone 13)
- **Separate root config:** `playwright.config.ts` at project root (appears to be duplicate/legacy — both exist)
- **Test files:** 7 spec files in `tests/e2e/`

### Coverage Map

| Page/Feature | Test File | Covered? |
|---|---|---|
| Navigation (all routes) | `navigation.spec.ts` | ✅ Full |
| Mobile hamburger menu | `mobile-menu.spec.ts` | ✅ |
| Waitlist form (happy + error) | `waitlist.spec.ts` | ✅ Good |
| Blog index + 6 posts | `blog.spec.ts` | ✅ Good |
| 404 page | `404.spec.ts` | ✅ |
| Internal links | `links.spec.ts` | ✅ |
| External links | `external-links.spec.ts` | ✅ |
| Home page content | ❌ None | Missing |
| Features page content | ❌ None | Missing |
| ForDentists page content | ❌ None | Missing |
| Pricing page (blurred beta) | ❌ None | Missing |
| About page / team section | ❌ None | Missing |
| Contact form submission | ❌ None | Missing |
| Scroll reveal animations | ❌ None | Missing |
| SEO meta tags (per-page) | ❌ None | Missing |
| Accessibility (ARIA, skip link) | ❌ None | Missing |

### Missing High-Priority Tests

1. **Contact form** — there's a `Contact.tsx` with a form (208 lines) but **zero tests** for submission, validation, or error states. This is a conversion-critical page.

2. **Home page content** — the primary landing page has no content assertions beyond navigation tests passing through it. CTA buttons, hero text, social proof section, etc. — all untested.

3. **Pricing page** — the beta blur overlay is a UX-critical feature. No test verifies it renders correctly or that the underlying prices are properly obscured.

4. **SEO meta tags** — no test verifies `<title>`, `og:image`, or canonical URLs per route. These are easy to accidentally break.

5. **Responsive layout** — mobile/tablet breakpoints tested for nav only. No layout tests for content pages on mobile.

### Config Issue: Duplicate playwright.config.ts
There are two config files:
- `/Users/moziplaybook/Projects/official-perioskoup/playwright.config.ts` (root)
- `/Users/moziplaybook/Projects/official-perioskoup/tests/playwright.config.ts` (tests dir)

The root one is likely the active one for `pnpm playwright test`. This creates confusion. The `tests/` subdirectory config should be the canonical one, or the root config should be deleted.

---

## 5. Build Health

**Result: CLEAN BUILD — no warnings.**

```
vite v7.1.9 building for production...
✓ 1642 modules transformed.
✓ built in 1.03s
```

### Bundle Analysis

| Chunk | Size (gzip) | Notes |
|---|---|---|
| `index.js` (main vendor) | 86.56 kB | Largest — includes React, wouter, react-helmet-async |
| `BlogPost.js` | 21.11 kB | High — all article content is in-bundle |
| `radix-ui.js` | 16.72 kB | Expected |
| `sonner.js` | 9.58 kB | Toast library — loaded lazily ✅ |
| `ForDentists.js` | 6.83 kB | |
| `About.js` | 5.89 kB | |

**Concerns:**
- `index.js` at 283 kB raw / 86 kB gzip is on the larger side for a landing page. The main bundle includes all shared code. No obvious fat to trim without tree-shaking unused shadcn/ui components more aggressively.
- `BlogPost.js` at 66 kB raw is high because all 6 articles are bundled. Extracting article data would reduce this.
- `sonner` is loaded lazily — good pattern correctly applied.

**Output:** `dist/public/` — correct for Vercel SPA deployment.

---

## 6. Dependencies

**Result: 25 vulnerabilities — 13 HIGH, 12 MODERATE**

### Critical: Update pnpm itself
pnpm version `10.18.1` has **4 high-severity CVEs**:
- `GHSA-379q-355j-w6rj` — lifecycle script bypass
- `GHSA-7vhp-vf5g-r2fw` — lockfile integrity bypass
- `GHSA-2phv-j68v-wwqx` — command injection via env var substitution (**most critical**)
- `GHSA-v253-rj99-jwpq`, `GHSA-6pfh-p556-v868`, `GHSA-6x96-7vc8-cm3p`, `GHSA-xpqm-wm3m-f34h`, `GHSA-m733-5w8f-5ggw` — various path traversal

**Fix:** `corepack use pnpm@latest` or update `package.json` `packageManager` field to `pnpm@10.28.2+`

### High: Rollup path traversal
- `rollup@4.52.4` (via `vite@7.1.9`) — `GHSA-mw96-cpmx-2vgc`
- **Fix:** Update to `vite@7.1.11+` which bundles rollup 4.59+

### High: node-tar (multiple CVEs)
- `tar@7.5.1` (via `@tailwindcss/oxide`) — 7 separate CVEs
- These are **dev/build-time only** (not shipped to users) — lower runtime risk
- **Fix:** Awaiting `@tailwindcss/vite` update; monitor upstream

### High: undici (3 CVEs)
- `undici@7.22.0` (via `jsdom` → `vitest`) — WebSocket exploits
- **Dev/test only** — not in production bundle
- **Fix:** Update `vitest` to get updated `jsdom`

### Moderate: vite dev server fs.deny bypass
- `vite@7.1.9` — `GHSA-93m4-6634-74q7` (Windows-only backslash bypass)
- **Fix:** `vite@7.1.11+`

### Moderate: esbuild dev server CORS
- `esbuild@0.21.5` (via `vitest`) — dev server accepts cross-origin requests
- **Dev-only risk**

### Summary
**None of these vulnerabilities affect the production bundle** shipped to users. All affected packages are either dev tooling (pnpm, vite dev server, vitest) or build-time tools (tar). The Vercel deployment is safe.

**However:** pnpm command injection (`GHSA-2phv-j68v-wwqx`) is a CI/supply-chain risk. Update pnpm immediately.

**Action items by priority:**
1. `corepack use pnpm@latest` — fixes all pnpm CVEs
2. Update vite to 7.1.11+ — fixes rollup + vite CVEs
3. Monitor `@tailwindcss/vite` for tar fix upstream

---

## 7. CLAUDE.md Accuracy

### Accurate sections ✅
- Stack (Vite 7 + React 19 + TypeScript + Tailwind v4 + Wouter + Radix UI)
- Commands (`pnpm dev`, `pnpm build`, `pnpm check`)
- Brand colors and fonts
- Regulatory language rules
- Business context
- Deployment (Vercel, `dist/public`, perioskoup.com)

### Drift / Inaccuracies ⚠️

**1. Vite version listed as "Vite 7" — actually Vite 7.1.9**
Minor, but if someone runs `pnpm add vite` they'd get latest. Recommend pinning version in CLAUDE.md.

**2. Structure section is incomplete**
CLAUDE.md lists `client/src/components/` and `client/src/pages/` but omits:
- `client/src/hooks/` — 5 hooks including dead ones
- `client/src/lib/` — analytics + dead geo-capsules
- `client/src/contexts/` — ThemeContext
- `client/src/types/` — geo-capsule type definitions
- `tests/` — E2E test directory

**3. No mention of test infrastructure**
The testing section says only to reference `e2e-testing-patterns/SKILL.md`. CLAUDE.md should document:
- `tests/playwright.config.ts` as the primary config
- Dual-config issue (root + tests/)
- Which command runs tests (`pnpm playwright test`)

**4. `.claude/agents/` count**
CLAUDE.md says "12 specialist audit subagents" — actual count is 20 agent files in `.claude/agents/` (10 auditor + 10 fixer = 20). The "12" is outdated.

**5. `server/` description outdated**
"Express server (dev only, not used on Vercel)" — the Express server exists but there's no meaningful server logic for this SPA. Should clarify it's scaffolding only.

**6. No mention of dead code warnings**
`geo-capsules.ts`, unused ThemeContext consumer, dead hooks — CLAUDE.md gives no guidance on these planned-but-unimplemented features. Future agents will waste time auditing them.

---

## Recommended CLAUDE.md Updates

```markdown
## Structure (updated)
- `client/src/pages/` — route pages
- `client/src/components/` — shared components
- `client/src/components/ui/` — shadcn/ui primitives (many installed but unused in this SPA)
- `client/src/hooks/` — useReveal, useMobile, usePageMeta, useComposition, useScrollReveal (NOTE: useScrollReveal + useCountUp are unused)
- `client/src/lib/` — analytics.ts (PostHog), geo-capsules.ts (UNIMPLEMENTED — planned feature)
- `client/src/contexts/` — ThemeContext (provider used, consumer never called)
- `client/src/types/` — TypeScript type definitions
- `client/public/` — static assets
- `tests/e2e/` — Playwright E2E specs (7 files)
- `tests/playwright.config.ts` — canonical Playwright config

## Commands (add)
- `pnpm playwright test` — run E2E tests
- `pnpm playwright test --ui` — Playwright UI mode

## Known Dead Code (planned features)
- `client/src/lib/geo-capsules.ts` — geo-targeted blog system, not yet wired
- `client/src/hooks/useScrollReveal.ts` — alternative reveal hook, superseded by useReveal
- `client/src/contexts/ThemeContext.tsx` — dark mode context, dark is hardcoded via CSS

## Agent Count
- `.claude/agents/` — 20 specialist agents (10 auditor + 10 fixer pairs)
```

---

## Priority Fix List

| Priority | Issue | File | Effort |
|---|---|---|---|
| 🔴 P1 | Update pnpm (command injection CVE) | `package.json` | 5 min |
| 🔴 P1 | Update vite to 7.1.11+ | `package.json` | 10 min |
| 🟡 P2 | Extract `ARTICLES` data from BlogPost.tsx | `BlogPost.tsx` | 1 hr |
| 🟡 P2 | Delete or implement geo-capsules.ts | `lib/geo-capsules.ts` | 30 min |
| 🟡 P2 | Delete or use useScrollReveal/useCountUp | `hooks/useScrollReveal.ts` | 15 min |
| 🟡 P2 | Add Contact form E2E tests | new spec file | 1 hr |
| 🟡 P2 | Add Home page content tests | new spec file | 1 hr |
| 🟢 P3 | Remove ThemeContext or wire useTheme | `contexts/ThemeContext.tsx` | 30 min |
| 🟢 P3 | Resolve dual playwright.config.ts | root + tests/ | 5 min |
| 🟢 P3 | Update CLAUDE.md structure section | `CLAUDE.md` | 20 min |
| 🟢 P3 | Add SEO meta tag tests | new spec file | 45 min |
| 🟢 P3 | Remove Chinese comments from useComposition | `hooks/useComposition.ts:44` | 2 min |
