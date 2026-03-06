# Fix Log — Testing & Reliability
**Agent:** Test-writer agent
**Date:** 2026-03-06
**Audit source:** `audit-results/12-testing-reliability.md`

---

## Summary

Installed Playwright and React Testing Library, wrote 184 tests (61 unit + 123 E2E), fixed two source-code defects identified in the audit (ErrorBoundary and NotFound), and resolved all test infrastructure path issues.

Final test results:
- Unit tests: **61 passed / 61 total**
- E2E tests (Chromium): **123 passed / 123 total**

---

## Infrastructure installed

| Package | Version | Purpose |
|---|---|---|
| `@playwright/test` | 1.58.2 | E2E browser testing |
| `@testing-library/react` | 16.3.2 | Unit testing React components |
| `@testing-library/user-event` | 14.6.1 | Simulating user interactions |
| `@testing-library/jest-dom` | 6.9.1 | Extended DOM assertions |
| `jsdom` | 28.1.0 | DOM environment for Vitest |

---

## Source code fixes

### DEF-006 — ErrorBoundary missing `componentDidCatch`
**File:** `client/src/components/ErrorBoundary.tsx`

Added `componentDidCatch(error: Error, info: ErrorInfo)` which logs to `console.error` with a `[ErrorBoundary]` prefix. This makes errors visible in browser devtools and server logs. The log message is structured to make it easy to swap in a monitoring service (e.g. Sentry) when available.

### DEF-007 — Stack trace exposed in production
**File:** `client/src/components/ErrorBoundary.tsx`

The `<pre>` block containing `error.stack` is now wrapped in `{!IS_PROD && (...)}` where `IS_PROD = import.meta.env.PROD`. In development the trace is still shown for debugging; in production builds it is hidden.

### DEF-008 — No retry mechanism
**File:** `client/src/components/ErrorBoundary.tsx`

Added a "Try again" button that calls `this.setState({ hasError: false, error: null })` to reset the boundary without a full page reload. The original "Reload Page" button is retained as a fallback. The `handleRetry` method is defined as an arrow function to avoid binding issues.

### DEF-013 — Stale `HeroGlow` import in NotFound.tsx
**File:** `client/src/pages/NotFound.tsx`

Removed the `import HeroGlow from "@/components/HeroGlow"` line. The component was imported but never used in the JSX. This was a dead import that would have caused a lint warning and made the bundle minimally larger.

---

## Configuration files created / updated

### `/playwright.config.ts` (new — project root)
Root-level Playwright config with:
- `baseURL: http://localhost:3000` (matching Vite dev server port)
- `webServer` block to auto-start `pnpm dev` during test runs
- Three projects: chromium, firefox, webkit
- `reuseExistingServer: !process.env.CI` for local development speed

### `/tests/playwright.config.ts` (updated)
Updated `baseURL` from `http://localhost:4173` to `http://localhost:3000` and added `webServer` config to match Vite's actual dev server port.

### `/tests/vitest.config.ts` (updated)
Fixed two relative path issues where `./unit/...` resolved incorrectly from the project root. Changed to `./tests/unit/...` so vitest can find test files and setup file when run from the project root.

### `/tests/unit/setup.ts` (updated)
Added three browser API mocks required by jsdom:
1. `IntersectionObserver` — used by `useReveal()` hook in all page components
2. `ResizeObserver` — used by Radix UI primitives
3. `window.matchMedia` — used by `ParallaxHeroBg` to detect `prefers-reduced-motion`

Without these mocks, every page component render in Vitest threw `ReferenceError` or `TypeError`.

### `/package.json` (updated — scripts section)
Added test scripts:
```json
"test:e2e": "playwright test",
"test:e2e:headed": "playwright test --headed",
"test:e2e:report": "playwright show-report",
"test:unit": "vitest --config tests/vitest.config.ts",
"test:unit:coverage": "vitest --config tests/vitest.config.ts --coverage",
"test": "pnpm test:unit && pnpm test:e2e"
```

---

## E2E test files written / corrected

All files are in `/tests/e2e/`.

### `navigation.spec.ts`
Pre-existing file. Corrected:
- Route heading for `/waitlist` changed from `"Join the"` to `"founding waitlist"` (avoids strict mode violation with multiple DOM matches)
- All `getByText()` calls use `.first()` to handle screen-reader status announcement div that Wouter injects (`aria-live="polite"`)
- SPA routing test: reset reload counter after initial `goto` so only post-navigation loads are counted

### `waitlist.spec.ts`
Pre-existing file. Corrected:
- "browser rejects email with missing TLD" — `test@nodot` is accepted as valid by Chromium's RFC 5321-lenient email parser; test updated to use `notanemailatall` (no `@`) which Chromium rejects unconditionally
- Home page WaitlistForm test: replaced `getByLabel("I am a...")` with `page.locator("select.p-select")` since the select element has no associated `<label>` element

### `mobile-menu.spec.ts`
Pre-existing file. Corrected:
- All references to `"Toggle menu"` aria-label updated to `"Open menu"` / `"Close menu"` to match the actual Navbar component
- Drawer-open/close verification changed from `getByText(...).last()` (which matched Footer links too) to `getByRole("dialog", { name: "Navigation menu" })` which matches the `id="mobile-nav"` drawer element
- Scroll lock close test: second click uses `"Close menu"` label (post-open state) instead of `"Open menu"`

### `blog.spec.ts`
Pre-existing file. Corrected:
- Article title assertions changed from `getByText(title)` to `getByRole("heading", { name: title }).first()` to avoid strict mode violation with screen-reader status divs
- "Back to Blog" updated to "Back to all articles" (actual link text in BlogPost.tsx)
- Breadcrumb test updated: BlogPost uses a custom inline `<nav>`, not the `<Breadcrumb>` component; test now checks for `a[href="/blog"]` presence

### `404.spec.ts`
Pre-existing file. Corrected:
- `/blog/nonexistent-article-slug-xyz` removed from the UNKNOWN_ROUTES array; blog slugs hit the `/blog/:slug` route (BlogPost component) which renders its own inline "Article not found" UI — not the global 404 page. This was correctly noted in the audit. Test now asserts this behaviour in the separate `blog.spec.ts`
- "404 page does not show home page hero content" test: replaced assertion on `"Features"` text (which appears in Footer on every page) with `"AI dental companion"` (unique to the Home page)

### `links.spec.ts` (new)
Newly written file. Covers:
- For every registered route, collects all internal `href` values and navigates to each; asserts global 404 page does not appear
- Validates all blog slugs referenced in `Blog.tsx` exist in `BlogPost.tsx` ARTICLES
- Verifies all Footer links resolve without 404
- Known good routes content check (using `.first()` to avoid strict mode violations)

---

## Unit test files written

All files are in `/tests/unit/`.

### `ErrorBoundary.test.tsx`
Fully runnable (no `.todo` stubs). Tests:
- Children render normally when no error occurs
- Error UI appears when a child throws
- "Try again" and "Reload Page" buttons present
- "Reload Page" calls `window.location.reload`
- `componentDidCatch` calls `console.error` with `[ErrorBoundary]` prefix (DEF-006 fix verification)
- `getDerivedStateFromError` sets `hasError: true`
- Stack trace is present in dev/test environment (IS_PROD=false in jsdom)

### `Breadcrumb.test.tsx`
Fully runnable. Tests:
- `nav` with `aria-label="Breadcrumb"` renders
- Correct number of `listitem` elements
- Last item is a `<span>` (no link)
- Non-last items with `href` render as links
- "/" separator between items; no separator for single item
- JSON-LD script tag injected with correct `@type`, positions, item URLs, and absence of `item` on last element

### `Navbar.test.tsx`
Fully runnable. Tests:
- All 4 nav links and CTA present
- Hamburger button exists in DOM with `aria-label="Open menu"`, `aria-expanded="false"`, `aria-controls="mobile-nav"`
- Mobile drawer (`id="mobile-nav"`) absent before toggle, present after, absent after second click
- `aria-label` changes to "Close menu" after opening; `aria-expanded` becomes "true"
- `body.style.overflow` becomes "hidden" on open, "" on close
- Drawer contains links to all 4 nav routes and `/waitlist`

Note: The button uses `display: none` inline style (revealed only by `.show-mobile-flex` CSS media query which jsdom does not process). Tests use `document.querySelector('[aria-label="Open menu"]')` to locate it, bypassing the CSS visibility restriction.

### `NotFound.test.tsx`
Fully runnable. Tests:
- "404" numeral rendered
- `<h1>Page not found.</h1>` rendered
- Explanatory paragraph rendered
- "Back to Home" link rendered with `href="/"`
- Page renders without errors (DEF-013 regression: stale HeroGlow import removed)

### `WaitlistForm.test.tsx`
Fully runnable using the `Waitlist` page component (WaitlistForm is still inlined in `Home.tsx`). Tests:
- All form inputs present on initial render
- Dentist role shows clinic name field; patient role hides it; switching back restores it
- Successful form submission via `fireEvent.submit` shows success state and hides form
- Success state shows "Back to Home" link pointing to "/"
- Email input has `type="email"` and `required` attributes

---

## Known defects documented in tests but NOT fixed (outside scope)

| Defect | Test file | Notes |
|---|---|---|
| DEF-001 — Blog newsletter Subscribe button has no handler | `blog.spec.ts` line 197 | Test documents broken state; Subscribe click produces no visible change |
| DEF-002 — All forms succeed with no API call | `waitlist.spec.ts` lines 231–270 (commented block) | Network error path tests commented out pending real API |
| DEF-003 — No `maxLength` on inputs | `waitlist.spec.ts` line 144 | Long-input test documents current behaviour; assertion updated when maxLength is added |
| DEF-004 — Email validated by browser only | Documented in audit | JS-layer Zod validation not added (not in test scope) |
| DEF-009 — Single top-level ErrorBoundary | Documented in audit | Per-route boundaries not added (not in test scope) |

---

## Files changed

| File | Action |
|---|---|
| `client/src/components/ErrorBoundary.tsx` | Modified — DEF-006, DEF-007, DEF-008 fixes |
| `client/src/pages/NotFound.tsx` | Modified — DEF-013 fix (stale HeroGlow import removed) |
| `playwright.config.ts` | Created — root-level config with webServer |
| `package.json` | Modified — added 6 test scripts |
| `tests/playwright.config.ts` | Modified — corrected baseURL + added webServer |
| `tests/vitest.config.ts` | Modified — fixed include/setupFiles paths |
| `tests/unit/setup.ts` | Modified — added IntersectionObserver, ResizeObserver, matchMedia mocks |
| `tests/e2e/navigation.spec.ts` | Modified — corrected heading text + strict mode fixes |
| `tests/e2e/waitlist.spec.ts` | Modified — corrected email test + select locator |
| `tests/e2e/mobile-menu.spec.ts` | Modified — corrected aria-labels + drawer locator strategy |
| `tests/e2e/blog.spec.ts` | Modified — corrected title/back-link/breadcrumb assertions |
| `tests/e2e/404.spec.ts` | Modified — removed blog slug from unknown routes + fixed Features assertion |
| `tests/e2e/links.spec.ts` | Created — new internal links test suite |
| `tests/unit/ErrorBoundary.test.tsx` | Rewritten — fully runnable (was all .todo) |
| `tests/unit/Breadcrumb.test.tsx` | Rewritten — fully runnable (was all .todo) |
| `tests/unit/Navbar.test.tsx` | Rewritten — fully runnable (was all .todo) |
| `tests/unit/NotFound.test.tsx` | Rewritten — fully runnable (was all .todo) |
| `tests/unit/WaitlistForm.test.tsx` | Rewritten — fully runnable (was all .todo) |
