# Audit 12 — Testing & Reliability
**Score: 7.5 / 10**

Audit date: 2026-03-06 (re-audit — supersedes original 5/10 report)
Auditor: QA Specialist Agent (Claude Sonnet 4.6)
Codebase: Perioskoup landing page — Vite 7 + React 19 + Wouter + Tailwind CSS v4

---

## Executive Summary

Significant testing infrastructure has been built since the original audit. The project now has a full Playwright E2E suite covering all routes, form validation, mobile menu, blog, 404, and external links, plus a Vitest unit suite covering the five most critical components. Playwright config supports five browser projects (Chromium, Firefox, WebKit, Pixel 5, iPhone 13). All internal links resolve correctly. The `ErrorBoundary` now has both `getDerivedStateFromError` and `componentDidCatch`. All forms use JavaScript-layer validation with inline error messages.

Remaining gaps that prevent a higher score: the blog newsletter `Subscribe` button is still non-functional (DEF-001 not resolved), no API backend exists so all forms succeed without a real network call (DEF-002 not resolved), no `maxLength` on any input (DEF-003), one CSS fallback is missing (`oklch` without hex cascade), and the `links.spec.ts` test contains one `waitForTimeout(300)` call that violates the no-fixed-timeout rule.

---

## 1. Internal Link Audit

### Registered routes (`App.tsx`)

| Path | Component | Status |
|---|---|---|
| `/` | Home | OK |
| `/features` | Features | OK |
| `/for-dentists` | ForDentists | OK |
| `/pricing` | Pricing | OK |
| `/about` | About | OK |
| `/blog` | Blog | OK |
| `/blog/:slug` | BlogPost | OK |
| `/contact` | Contact | OK |
| `/waitlist` | Waitlist | OK |
| `/privacy` | Privacy | OK |
| `/terms` | Terms | OK |
| `/404` | NotFound (explicit) | OK — redundant but harmless |
| `*` (catch-all) | NotFound | OK |

### All internal `<Link>` hrefs scanned

Every `href` value found in `Navbar.tsx`, `Footer.tsx`, `Breadcrumb.tsx`, and all page components maps to a registered route in `App.tsx`.

| Source | href values | Verdict |
|---|---|---|
| Navbar | `/`, `/features`, `/for-dentists`, `/pricing`, `/about`, `/blog`, `/contact`, `/waitlist` | All OK |
| Footer | `/features`, `/for-dentists`, `/pricing`, `/waitlist`, `/about`, `/blog`, `/contact`, `/privacy`, `/terms` | All OK |
| Home | `/waitlist`, `/for-dentists`, `/features` | All OK |
| Features | `/waitlist`, `/for-dentists` | All OK |
| ForDentists | `/waitlist`, `/features`, `/contact` | All OK |
| About | `/waitlist`, `/contact` | All OK |
| Blog | `/blog/:slug` (6 slugs), `/waitlist` | All OK |
| BlogPost | `/blog`, `/waitlist` | All OK |
| Pricing | `/waitlist` | All OK |
| Waitlist (success) | `/` | OK |
| NotFound | `/` | OK |
| Breadcrumbs | `/` | OK |

**No broken internal links detected.**

### Blog slug consistency check

The six slugs listed in `Blog.tsx` `POSTS` array exactly match the six keys in `BlogPost.tsx` `ARTICLES` object:

```
what-is-periodontal-disease
efp-digital-innovation-award-2025
how-ai-is-changing-dental-monitoring
3-minute-routine-save-teeth
why-patients-forget-instructions
building-the-bridge-perioskoup-story
```

### External links

All external anchors (`href` starting with `http`) carry `target="_blank"` and `rel="noopener noreferrer"`. This is verified for:
- EFP Award URL in `Home.tsx`, `About.tsx`, `ForDentists.tsx`, `Pricing.tsx`, `Footer.tsx`
- Academic citations in `Home.tsx` and `ForDentists.tsx` (Weinert 2025, Toniazzo 2019, Kessels 2003)

---

## 2. Form Validation Audit

### Forms identified

1. `Waitlist.tsx` — waitlist signup (primary conversion form)
2. `Contact.tsx` — contact message form
3. `Blog.tsx` — newsletter subscription (email input + Subscribe button)

### Validation matrix

| Form | Field | Empty submit | Invalid email | XSS payload | Long input (5000 chars) | Server error state |
|---|---|---|---|---|---|---|
| Waitlist | first name | JS + `required` — inline error shown | n/a | React JSX-escaped, safe | **No `maxLength`** — accepts unlimited chars | **No error state** — always succeeds |
| Waitlist | last name | `required` HTML5 | n/a | JSX-escaped | **No `maxLength`** | — |
| Waitlist | email | JS + `required` — inline error shown | JS regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` + `type="email"` | JSX-escaped | **No `maxLength`** | **No error state** |
| Waitlist | clinic name (dentist) | JS + `required` — inline error shown | n/a | JSX-escaped | **No `maxLength`** | **No error state** |
| Contact | first name | JS + `required` | n/a | JSX-escaped | **No `maxLength`** | **No error state** |
| Contact | email | JS + `required` | JS regex identical to Waitlist | JSX-escaped | **No `maxLength`** | **No error state** |
| Contact | role select | JS + `required` | n/a | n/a | n/a | **No error state** |
| Contact | message textarea | JS + `required` | n/a | JSX-escaped | **No `maxLength`** | **No error state** |
| Blog newsletter | email | **No validation at all** | **No validation** | n/a | **No `maxLength`** | **No state at all** |

### XSS assessment

React renders all form values through JSX — user-supplied strings are HTML-escaped automatically. A `<script>window.__xss=1</script>` payload submitted as a name value will appear in the DOM as literal text, not as executable HTML. This is confirmed by the XSS test in `waitlist.spec.ts` line 180.

The `dangerouslySetInnerHTML` usage across all pages is exclusively for JSON-LD `<script>` tags where the data is hardcoded constants passed through `JSON.stringify`. No user input reaches `dangerouslySetInnerHTML`. Risk is negligible for the current codebase.

### Active defects

**DEF-001 — Blog newsletter Subscribe button is non-functional. (OPEN)**
`Blog.tsx` line 338: `<button className="btn-primary" aria-label="Subscribe to newsletter">Subscribe</button>` has no `onClick` and is not inside a `<form>`. Clicking it does nothing. The email input at line 330 has no `name`, `id` for a form, or any submission mechanism. This is documented by the test `blog.spec.ts` "DEF-001" describe block which asserts the broken state.

**DEF-002 — All forms have no real API backend. (OPEN)**
Both `Waitlist.tsx` and `Contact.tsx` call `setSubmitted(true)` / `setSent(true)` immediately with no network call. A user who fills in a form and clicks Submit will always see the success confirmation, regardless of whether the data reached any backend. No error state UI exists for network failures.

**DEF-003 — No `maxLength` on any text input. (OPEN)**
A 50,000-character paste is accepted and displayed in the success UI. When a real API is wired up, this becomes a server-side payload size vulnerability.

**DEF-004 — Email validation bypassed by programmatic submission. (OPEN)**
The JS regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` runs on form submit via the custom `validate()` function. However the fields also have `type="email"` and `required` as HTML attributes. The current dual approach (HTML5 + JS custom regex) is reasonable but the JS regex itself has gaps: `a@b` passes the regex (no TLD length requirement), `user@domain.` passes (trailing dot), `user@@domain.com` passes (double `@` matches `[^\s@]+`). A Zod schema would be more precise.

---

## 3. 404 Page Analysis

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/NotFound.tsx`

### What works

- Wouter catch-all `<Route component={NotFound} />` in `App.tsx` line 94 catches every unregistered path.
- The `/404` explicit route is also registered (line 93) — redundant but harmless.
- Renders "404" numeral, "Page not found." h1, explanatory paragraph, and `<Link href="/">Back to Home</Link>`.
- Full `<Navbar>` and `<Footer>` present — consistent layout.
- `<meta name="robots" content="noindex, nofollow" />` — correct for a 404 page.
- `ParallaxHeroBg` gives visual continuity with the rest of the site.

### `/blog/:slug` behaviour

The `/blog/:slug` route is registered before the catch-all. When a user navigates to `/blog/nonexistent-slug`, `BlogPost.tsx` renders an inline "Article not found" fallback (not the global NotFound page). This is correct SPA behaviour — the route matches, but the slug lookup returns undefined. This is well-documented in `blog.spec.ts` and `404.spec.ts`.

### Remaining issue

**DEF-013 — Stale import status.** The original audit flagged a stale `HeroGlow` import in `NotFound.tsx`. Reading the current file confirms `HeroGlow` is not imported. This defect has been resolved.

---

## 4. ErrorBoundary Analysis

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/components/ErrorBoundary.tsx`

### Current implementation

```typescript
static getDerivedStateFromError(error: Error): State {
  return { hasError: true, error };
}

componentDidCatch(error: Error, info: ErrorInfo) {
  console.error("[ErrorBoundary] Uncaught render error:", error, info.componentStack);
}

private handleRetry = () => {
  this.setState({ hasError: false, error: null });
};
```

### What works

- `getDerivedStateFromError` correctly sets `hasError: true` and stores the error.
- `componentDidCatch` logs to `console.error` with the `[ErrorBoundary]` prefix — errors are now visible in browser devtools and server logs.
- "Try again" button calls `handleRetry()` which resets state — DEF-008 from original audit is resolved.
- "Reload Page" button calls `window.location.reload()`.
- Stack trace is hidden in production (`IS_PROD` guard on the `<pre>` block) — DEF-007 from original audit is resolved.
- The boundary wraps the entire `<Router>` in `App.tsx`.

### Remaining issues

**DEF-009 — Single top-level boundary. (OPEN — acceptable for current scale)**
One `ErrorBoundary` wraps everything. If a route component throws, the entire app surface (including Navbar) is replaced by the error screen. Per-route boundaries would limit blast radius. At current scale (12 pages, no complex async data flows) this is acceptable.

**No external error monitoring.** `componentDidCatch` logs to `console.error`. For production, this should be `Sentry.captureException(error, { extra: { componentStack: info.componentStack } })` or equivalent. A `TODO` comment exists acknowledging this.

---

## 5. Cross-Browser CSS Issues

| Issue | File & Location | Browsers affected | Severity | Fix |
|---|---|---|---|---|
| `oklch(0.577 0.245 27.325)` for `--destructive` | `index.css` line 126 | Safari ≤15.3, Chrome ≤111 (released Aug 2023) | Medium | Add hex cascade above: `--destructive: #e95959; --destructive: oklch(0.577 0.245 27.325);` |
| `scroll-behavior: smooth` not guarded | `index.css` line 174 | Respects `prefers-reduced-motion`? No — the JS hooks guard motion but this CSS rule does not | Low | Wrap in `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }` |
| `-webkit-line-clamp` + `-webkit-box-orient` | `Blog.tsx` line 297 | Current usage — these are prefixed for a reason. No standard equivalent yet | Low | No change required; the vendor prefix is still the correct approach for this truncation pattern |
| `backdropFilter` / `WebkitBackdropFilter` | `Navbar.tsx` inline styles | Safari requires the `-webkit-` prefix — BOTH are already set in source | None | Already handled correctly |
| `@custom-variant dark` syntax | `index.css` line 74 | Tailwind CSS v4 plugin only — will break if downgraded to v3 | Low | Document the v4 requirement in `CLAUDE.md` (already noted there) |
| `will-change: auto` on `.animated-bg-img` | `index.css` line 362 | IE11 (EOL, <0.5% global share) | Negligible | No action needed |
| CSS Grid `auto-fit minmax` | `Footer.tsx`, `Blog.tsx`, `Features.tsx` | IE11 (EOL) | Negligible | No action needed |

**Primary fix needed:** The `oklch` color cascade missing a hex fallback. Safari 15.3 is still used by approximately 3% of global iOS users (devices that cannot update past iOS 15).

---

## 6. Playwright E2E Test Suite

The complete test suite lives in `/Users/moziplaybook/Projects/official-perioskoup/tests/e2e/`. Below is the full code for each file.

### `tests/playwright.config.ts`

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "../playwright-report", open: "never" }],
    ["list"],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox-desktop", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit-desktop", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
});
```

### `tests/e2e/navigation.spec.ts`

Covers: direct URL access for all 10 routes, navbar link clicks, logo click, SPA no-reload between transitions, footer links, breadcrumb navigation.

Key patterns used:
- `page.getByText(heading, { exact: false }).first()` to avoid strict mode violations from screen-reader announcer divs
- `page.getByRole("link", { name })` for accessible selectors
- Full page reload detection via `page.on("load")` listener with reset after initial load

### `tests/e2e/waitlist.spec.ts`

Covers: dentist happy path, patient happy path, role switcher, empty field prevention, missing email prevention, invalid email format, long input (5000-char regression detection), XSS payload rendering safety, post-submit "Back to Home" navigation.

Notable: the long input test documents that the form currently accepts unlimited input and asserts the success state is shown — this is an intentional regression canary. When `maxLength` is added, the assertion will need updating.

The XSS test verifies `window.__xss` is `undefined` after submission, confirming the payload was not executed:

```typescript
const xssExecuted = await page.evaluate(() => (window as any).__xss);
expect(xssExecuted).toBeUndefined();
```

The API error path tests are present but commented out, ready to activate when a real backend is wired up.

### `tests/e2e/mobile-menu.spec.ts`

Covers: hamburger hidden at desktop width, visible at mobile width, desktop nav links hidden on mobile, open/close toggle, aria-label change, all 6 nav links visible in drawer, Join Waitlist CTA, auto-close on navigation, body scroll lock (`overflow: hidden`) set and restored.

### `tests/e2e/blog.spec.ts`

Covers: blog hero heading, 2 featured articles, 4 regular articles, newsletter section, click-to-slug navigation for 3 articles, all 6 post pages load their title and category, "Back to all articles" link, Join Waitlist CTA on post page, breadcrumb Blog link, invalid slug shows inline "Article not found" (not global 404), newsletter button defect documented (DEF-001).

### `tests/e2e/404.spec.ts`

Covers: 6 unknown routes all show "Page not found.", explicit `/404` route, content verification (numeral, heading, paragraph, Back to Home), Back to Home navigation, Navbar and Footer presence, no broken images, does not show home page hero content, `/blog/invalid-slug` shows BlogPost's own "Article not found" (not global 404).

### `tests/e2e/external-links.spec.ts`

Covers: all external links on Home and About have `target="_blank"` and `rel="noopener noreferrer"`, EFP badge URL correct on Home and Footer, EFP announcement link URL correct on Home and About, EFP link opens in new tab (not current tab), scan of 6 pages for missing `rel` attributes.

### `tests/e2e/links.spec.ts`

Covers: automated crawl of all internal `href` values on every page, asserting none render the global 404; known route/content mapping; blog slug coverage; footer link resolution.

**One quality issue:** `links.spec.ts` line 144 contains `await page.waitForTimeout(300)` in the Footer links test. This is a fixed timeout and violates the no-fixed-wait principle. It should be replaced with:

```typescript
// Replace:
await page.waitForTimeout(300);

// With:
await page.locator("footer").waitFor({ state: "visible" });
```

---

## 7. Unit Test Suite

The complete unit suite lives in `/Users/moziplaybook/Projects/official-perioskoup/tests/unit/`.

### `tests/vitest.config.ts`

Configured with jsdom environment, globals, setupFiles pointing to `tests/unit/setup.ts`. Resolves `@` alias to `client/src`. Coverage thresholds: 60% lines/functions/statements, 50% branches.

### `tests/unit/setup.ts`

Provides mocks for:
- `IntersectionObserver` — required by all page components using `useReveal()`
- `ResizeObserver` — required by Radix UI primitives
- `window.matchMedia` — required by `ParallaxHeroBg` and `useReveal()` prefers-reduced-motion check

Without these mocks, every page render in jsdom throws. This is the critical setup that makes unit tests work.

### `tests/unit/WaitlistForm.test.tsx`

Tests the `Waitlist` page component directly (the form is embedded, not extracted). Covers: initial render of all fields, role switcher (dentist/patient toggle), successful submission shows success state, form fields disappear after submission, "Back to Home" link present with correct `href`, email `type="email"` and `required` attributes verified.

### `tests/unit/ErrorBoundary.test.tsx`

Tests: renders children normally, renders error UI when child throws, "Try again" button present, "Reload Page" button present and calls `window.location.reload`, `componentDidCatch` logs with `[ErrorBoundary]` prefix, `getDerivedStateFromError` static method sets correct state, stack trace `<pre>` rendered in non-production environment.

### `tests/unit/Navbar.test.tsx`

Tests: all 4 nav links render, Join Waitlist CTA renders, hamburger button exists in DOM with `aria-label="Open menu"` and `aria-expanded="false"`, `aria-controls="mobile-nav"`, drawer not in DOM before toggle, toggle opens drawer, toggle twice closes drawer, aria-label changes to "Close menu", aria-expanded becomes "true", body scroll lock set and restored, drawer contains all nav hrefs including `/waitlist`.

**Note on jsdom limitation:** The hamburger button has `display: none` inline and is revealed only via `.show-mobile-flex` CSS class through a media query. jsdom does not execute media queries, so `getByRole` with visibility checks fails. The tests correctly use `document.querySelector('button[aria-label="Open menu"]')` as a workaround.

### `tests/unit/NotFound.test.tsx`

Tests: "404" numeral, "Page not found." heading, explanatory paragraph, "Back to Home" link with `href="/"`, page renders without errors (DEF-013 regression guard).

### `tests/unit/Breadcrumb.test.tsx`

Tests: nav with `aria-label="Breadcrumb"`, correct number of list items, last item is a `<span>` (no link), non-last items are links, separator "/" characters, single item without separator, all labels rendered, JSON-LD script tag injected, `@type: BreadcrumbList`, 1-indexed positions, non-last items have `item` URL, last item has no `item` property.

---

## 8. Unit Test Recommendations — Additional Coverage Needed

The following components have no unit tests yet:

| Component | Priority | What to test |
|---|---|---|
| `BlogPost.tsx` | High | Valid slug renders article title; invalid slug shows "Article not found" UI with Back to Blog link; article count matches ARTICLES object |
| `Contact.tsx` form | High | All required fields enforced (firstName, email, role, message); success state on valid submit; inline error messages appear |
| `Footer.tsx` | Medium | All expected link hrefs present; EFP badge link has `target="_blank"` and `rel="noopener noreferrer"` |
| `ParallaxHeroBg.tsx` | Low | Renders without error; respects `prefers-reduced-motion` (mock matchMedia returns true) |
| `PhoneMockup.tsx` | Low | Renders without error; clock updates every 30s (mock setInterval) |

---

## 9. Tests Directory Structure

```
tests/
├── playwright.config.ts              # Playwright: 5 browser projects, dev server auto-start
├── vitest.config.ts                  # Vitest: jsdom, globals, @/alias, 60% coverage thresholds
├── e2e/
│   ├── navigation.spec.ts            # All 10 routes, navbar clicks, SPA no-reload, footer, breadcrumbs
│   ├── waitlist.spec.ts              # Dentist + patient happy paths, empty fields, email, XSS, long input
│   ├── mobile-menu.spec.ts           # Hamburger visibility, open/close, scroll lock, auto-close on nav
│   ├── blog.spec.ts                  # Index page, 6 article slugs, invalid slug, newsletter defect DEF-001
│   ├── 404.spec.ts                   # Unknown routes, /404 explicit, content, layout, blog-slug distinction
│   └── external-links.spec.ts        # target=_blank, rel=noopener, correct URLs, new-tab behavior
├── unit/
│   ├── setup.ts                      # IntersectionObserver, ResizeObserver, matchMedia mocks
│   ├── WaitlistForm.test.tsx          # Form render, role toggle, submission, attribute verification
│   ├── ErrorBoundary.test.tsx         # Error catching, retry, reload, logging, stack trace visibility
│   ├── Breadcrumb.test.tsx            # Visible nav + JSON-LD structured data
│   ├── Navbar.test.tsx                # Nav links, mobile toggle, scroll lock (jsdom-aware selectors)
│   └── NotFound.test.tsx              # 404 content, back link, DEF-013 regression
└── fixtures/
    └── test-data.ts                   # Shared: VALID_DENTIST, VALID_PATIENT, INVALID_EMAILS, XSS_PAYLOADS,
                                       # LONG_INPUTS, BLOG_SLUGS, ALL_ROUTES, UNKNOWN_ROUTES
```

---

## 10. Findings Summary

| ID | Severity | Category | Status | Description |
|---|---|---|---|---|
| DEF-001 | High | Form | **OPEN** | Blog newsletter Subscribe button has no handler — non-functional |
| DEF-002 | High | Form | **OPEN** | All forms succeed immediately with no API call; no error state |
| DEF-003 | Medium | Form | **OPEN** | No `maxLength` on any text input (accepts unlimited chars) |
| DEF-004 | Medium | Form | Partial | JS regex has edge-case gaps (`a@b`, `user@@domain.com` pass); `type="email"` mitigates |
| DEF-005 | Low | Security | Closed | `dangerouslySetInnerHTML` in JSON-LD only — all data is hardcoded, no user input reaches it |
| DEF-006 | High | ErrorBoundary | **Resolved** | `componentDidCatch` now present, logs with `[ErrorBoundary]` prefix |
| DEF-007 | Medium | ErrorBoundary | **Resolved** | Stack trace hidden behind `IS_PROD` guard |
| DEF-008 | Medium | ErrorBoundary | **Resolved** | "Try again" button calls `handleRetry()` which resets state without full reload |
| DEF-009 | Medium | ErrorBoundary | Open (acceptable) | Single top-level boundary; per-route isolation not implemented |
| DEF-010 | Low | CSS | **OPEN** | `oklch()` for `--destructive` has no hex fallback |
| DEF-011 | Low | CSS | Closed | PhoneMockup uses `width: 340px` fixed width, no `aspect-ratio` — original concern does not apply |
| DEF-012 | Low | CSS | **OPEN** | `scroll-behavior: smooth` not wrapped in `prefers-reduced-motion: no-preference` |
| DEF-013 | Info | NotFound | **Resolved** | Stale `HeroGlow` import removed from `NotFound.tsx` |
| DEF-014 | High | Testing | **Resolved** | Full Playwright E2E + Vitest unit suite implemented |
| DEF-015 | Low | Testing | **OPEN** | `links.spec.ts` line 144 uses `waitForTimeout(300)` — replace with condition-based wait |

---

## 11. Score Breakdown

| Dimension | Score | Rationale |
|---|---|---|
| Internal links | 10 / 10 | All routes resolve; all blog slugs consistent between Blog.tsx and BlogPost.tsx |
| 404 handling | 9 / 10 | Catch-all works; `/blog/:slug` correctly delegates to BlogPost inline fallback; noindex set |
| ErrorBoundary | 8 / 10 | componentDidCatch added, retry mechanism added, stack hidden in prod; no external monitoring yet |
| Form validation | 5 / 10 | JS validation layer added; newsletter button still broken; no API error state; no maxLength |
| Cross-browser CSS | 8 / 10 | Most handled; oklch fallback missing; scroll-behavior not motion-guarded |
| E2E test coverage | 8 / 10 | 6 spec files covering all critical paths; one fixed-timeout violation in links.spec.ts |
| Unit test coverage | 7 / 10 | 5 of ~8 critical components covered; BlogPost, Contact, Footer not yet tested |
| **Overall** | **7.5 / 10** | Substantial improvement from 5/10; remaining gaps are known and actionable |

---

## 12. Priority Fix List

Ordered by business impact:

1. **[HIGH] DEF-001** — Wrap the blog newsletter `<input>` + `<button>` in a `<form onSubmit={handleNewsletter}>` with a real API call or a client-side success state. The current dead UI undermines trust.

2. **[HIGH] DEF-002** — Wire all forms to a real API endpoint. The `handleSubmit` functions should `await fetch('/api/waitlist', ...)` and set an error state if the response is not OK. Activate the commented-out network mock tests in `waitlist.spec.ts` when this is done.

3. **[MEDIUM] DEF-003** — Add `maxLength` to all text inputs:
   - First/last name: `maxLength={100}`
   - Email: `maxLength={254}` (RFC 5321 maximum)
   - Clinic name: `maxLength={200}`
   - Message (Contact): `maxLength={2000}`
   Update `waitlist.spec.ts` long input test to assert the form does NOT submit after adding maxLength.

4. **[LOW] DEF-010** — Add hex fallback for `oklch()` in `index.css`:
   ```css
   /* Before the oklch declaration: */
   --destructive: #e95959;
   --destructive: oklch(0.577 0.245 27.325);
   ```

5. **[LOW] DEF-012** — Guard `scroll-behavior` in `index.css`:
   ```css
   @media (prefers-reduced-motion: no-preference) {
     html { scroll-behavior: smooth; }
   }
   ```

6. **[LOW] DEF-015** — Replace `waitForTimeout(300)` in `links.spec.ts` line 144:
   ```typescript
   // Replace:
   await page.waitForTimeout(300);
   // With:
   await page.locator("footer").waitFor({ state: "visible" });
   ```

7. **[MEDIUM] DEF-004** — Tighten email regex or replace with Zod validation:
   ```typescript
   import { z } from "zod";
   const emailSchema = z.string().email();
   // In validate():
   const emailResult = emailSchema.safeParse(email);
   if (!emailResult.success) errs["email"] = "Please enter a valid email address.";
   ```

8. **[MEDIUM]** — Add unit tests for `BlogPost.tsx` and `Contact.tsx` form (see section 8).

9. **[MEDIUM]** — Add Sentry (or equivalent) to `componentDidCatch` before public launch. The `console.error` fallback is adequate for development but invisible in production monitoring.

---

## 13. Installation and CI Guide

### Run tests locally

```bash
# Unit tests
pnpm test:unit

# Unit tests with coverage report
pnpm test:unit:coverage

# E2E tests (starts dev server automatically)
pnpm test:e2e

# E2E tests in headed mode for debugging
pnpm test:e2e:headed

# View HTML report after E2E run
pnpm test:e2e:report

# Run both suites
pnpm test
```

### GitHub Actions CI

```yaml
name: Tests
on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm test:unit

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm install -g pnpm
      - run: pnpm install
      - run: npx playwright install --with-deps
      - run: pnpm build
      - run: pnpm preview &
      - run: npx wait-on http://localhost:4173
      - env:
          BASE_URL: http://localhost:4173
        run: pnpm test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```
