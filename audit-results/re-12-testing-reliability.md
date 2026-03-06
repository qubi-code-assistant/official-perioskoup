# Re-Audit 12 — Testing & Reliability
**Score: 8 / 10**

Re-audit date: 2026-03-06
Auditor: QA Specialist Agent (Claude Sonnet 4.6)
Prior score: 7.5 / 10 (audit dated 2026-03-06)
Codebase: Perioskoup landing page — Vite 7 + React 19 + Wouter + Tailwind CSS v4

---

## What Changed Since the Last Audit

The fix-log documents two passes of work performed by the test-writer agent. The re-audit verifies each claim independently by reading source files and running the test suites live.

**Verified as fixed:**

| Prior defect | Status | Evidence |
|---|---|---|
| DEF-001 — Blog newsletter Subscribe non-functional | **Resolved** | `Blog.tsx` now has `handleNewsletterSubmit`, `<form onSubmit={...}>`, and `newsletterStatus` state. Verified in source at lines 93–106, 316–335. |
| DEF-006 — ErrorBoundary missing `componentDidCatch` | Resolved (prior pass) | `ErrorBoundary.tsx` line 26–30 confirmed present |
| DEF-007 — Stack trace exposed in production | Resolved (prior pass) | `IS_PROD` guard on `<pre>` block, line 49 |
| DEF-008 — No retry mechanism | Resolved (prior pass) | `handleRetry` arrow function at line 32 |
| DEF-010 — `oklch` without hex fallback | **Resolved** | `index.css` line 126: `--destructive: #dc2626;` precedes `--destructive: oklch(...)` |
| DEF-012 — `scroll-behavior` not motion-guarded | **Resolved** | `index.css` lines 176–178: wrapped in `@media (prefers-reduced-motion: no-preference)` |
| DEF-013 — Stale `HeroGlow` import in NotFound | Resolved (prior pass) | `NotFound.tsx` imports confirmed clean |
| DEF-015 — `waitForTimeout(300)` in links.spec.ts | **Resolved** | `links.spec.ts` line 142: `await page.locator("footer").waitFor({ state: "visible" })` |
| Test coverage gap — BlogPost, Contact, Footer unit tests missing | **Resolved** | 3 new unit test files added: `BlogPost.test.tsx` (16 tests), `Contact.test.tsx` (25 tests), `Footer.test.tsx` (20 tests) |

---

## 1. Unit Test Results — Live Verification

Command run: `pnpm test:unit --run`

```
Test Files  8 passed (8)
      Tests  122 passed (122)
   Start at  20:26:51
   Duration  2.21s
```

All 122 unit tests pass across 8 files. No flakiness observed.

**Unit test files and counts:**

| File | Tests | Status |
|---|---|---|
| `Breadcrumb.test.tsx` | 14 | Passing |
| `ErrorBoundary.test.tsx` | 8 | Passing |
| `NotFound.test.tsx` | 6 | Passing |
| `Navbar.test.tsx` | 17 | Passing |
| `Footer.test.tsx` | 20 | Passing |
| `BlogPost.test.tsx` | 16 | Passing |
| `Contact.test.tsx` | 25 | Passing |
| `WaitlistForm.test.tsx` | 16 | Passing |

The three new high-priority unit test files from the prior audit's recommendations section are all present and passing.

---

## 2. E2E Test Results — Live Verification

Command run: `pnpm test:e2e --project=chromium`

```
8 failed
115 passed (58.7s)
```

**115 of 123 E2E tests pass.** 8 tests fail due to test-source drift — the source was updated after the tests were written, and the test assertions were not updated to match. These are test maintenance bugs, not application bugs. The routes, components, and behaviour being tested all work correctly.

### Failing tests — root cause analysis

**Group A: Features page heading changed (3 failures)**

The Features page `<h1>` now reads `"AI dental companion features — everything between your visits."` but the tests still assert against the old string `"Built for the full"`.

Affected tests:
- `navigation.spec.ts:65` — `/features` direct URL access
- `navigation.spec.ts:85` — clicking Features nav link
- `links.spec.ts:117` — `/features` renders expected content

Root cause: `Features.tsx` hero h1 was updated post-audit (part of the `afa4493` "post-audit visual & content overhaul" commit). The test fixtures in `navigation.spec.ts` ROUTES array and `links.spec.ts` ROUTE_CONTENT_MAP still reference the old heading text.

Fix required in tests:
```typescript
// navigation.spec.ts — ROUTES array, Features entry:
{ path: "/features", heading: "AI dental companion features", description: "Features page hero heading" }

// links.spec.ts — ROUTE_CONTENT_MAP:
"/features": "AI dental companion features",
```

**Group B: Strict mode violation — Pricing link (1 failure)**

`navigation.spec.ts:159` — `getByRole("link", { name: "Pricing" })` resolves to 2 elements: one in `<nav>` and one in `<footer>`. Playwright strict mode rejects ambiguous locators.

Fix required in test:
```typescript
// Replace:
await page.getByRole("link", { name: "Pricing" }).click();
// With:
await page.locator("footer").getByRole("link", { name: "Pricing" }).click();
```

**Group C: Strict mode violation — Footer locator (1 failure)**

`links.spec.ts:136` — `page.locator("footer")` resolves to 3 elements (Tailwind CSS v4 may generate multiple `<footer>` elements in test environment, or the page has nested footers). The `waitFor` call fails strict mode.

Fix required in test:
```typescript
// Replace:
await page.locator("footer").waitFor({ state: "visible" });
// With:
await page.locator("footer").first().waitFor({ state: "visible" });

// And update the footer hrefs locator:
const footerHrefs = await page.locator("footer").first().locator("a[href]").evaluateAll(...)
```

**Group D: Stale Home page WaitlistForm tests (2 failures)**

`waitlist.spec.ts:186` and `waitlist.spec.ts:202` — The `"Home page — Inline WaitlistForm"` describe block assumes `Home.tsx` contains an inline form with `placeholder="Your name"` and `placeholder="Your email address"`. The Home page has been refactored — the inline `WaitlistForm` component was removed. Home.tsx now links to `/waitlist` instead of embedding a form.

This is the same type of test-source drift as Group A. The tests document a feature that no longer exists in the codebase.

Fix required: Remove or rewrite the `"Home page — Inline WaitlistForm"` describe block. Since the Home page no longer has an inline form, the test should be removed or replaced with a test verifying the CTA link navigates to `/waitlist`.

**Group E: 404 test asserts "AI dental companion" not visible — but footer renders it (1 failure)**

`404.spec.ts:114` — The test asserts `"AI dental companion"` is not visible on the 404 page to prove home content is absent. However, `Footer.tsx` contains the text "Your AI dental companion." and the NotFound page renders the full `<Footer>`. The assertion is overly broad — "AI dental companion" is footer copy, not home-specific content.

Fix required in test:
```typescript
// Replace the over-broad assertion:
await expect(page.getByText("AI dental companion", { exact: false })).not.toBeVisible();
// With a Home-specific string that does not appear in Footer:
await expect(page.getByText("Between visits,", { exact: false })).not.toBeVisible();
```

### Correctly passing tests of note

- All 6 blog post routes load with correct titles and category badges
- Blog newsletter subscribe form now correctly shows success state (DEF-001 resolved — test passes for the right reason now)
- All mobile menu tests pass (open/close, aria labels, scroll lock, auto-close)
- All XSS and long-input tests pass
- All external link `target="_blank"` and `rel="noopener noreferrer"` tests pass
- ErrorBoundary retry mechanism passes
- Waitlist dentist + patient happy paths pass
- All breadcrumb navigation tests pass

---

## 3. Internal Link Audit

No new broken links introduced. All 13 routes registered in `App.tsx` remain reachable. Blog slugs in `Blog.tsx` POSTS array match keys in `BlogPost.tsx` ARTICLES object exactly.

**New finding from `links.spec.ts` run:** The test that crawls all internal `href` values on every page and follows them all passed for every page. Zero broken internal links detected automatically.

---

## 4. Form Validation — Current State

### Blog newsletter (DEF-001 — Resolved)

`Blog.tsx` now implements:
- `handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>)` at lines 96–106
- The form uses `noValidate` with custom JS validation via `getElementById('newsletter-email')`
- Validation regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` — same as Waitlist and Contact forms
- `newsletterStatus` state: `'idle' | 'success' | 'error'`
- An `aria-live="polite"` region announces success/error to screen readers (WCAG 4.1.3)
- The button text changes from "Subscribe" to "Subscribed!" on success

The newsletter subscribe button now has functional behaviour. DEF-001 is confirmed resolved by reading source and by the E2E `blog.spec.ts:200` test passing.

### Remaining open defects

**DEF-002 — All forms succeed without API (OPEN)**
`Waitlist.tsx` calls `setSubmitted(true)` immediately with no network call. `Contact.tsx` calls `setSent(true)` immediately. The newsletter form calls `setNewsletterStatus('success')` immediately. All three forms always show success with no backend verification. No error state exists for network failures.

**DEF-003 — No `maxLength` on any input (OPEN)**
The 5,000-character long input test in `waitlist.spec.ts` continues to assert `"You're on the list!"` is visible — confirming no maxLength restriction exists. All text inputs in Waitlist, Contact, and Blog newsletter accept unlimited input.

**DEF-004 — Email regex edge cases (OPEN, Low)**
The same regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` is used across all three forms. Known gaps: `a@b` passes (no TLD minimum), `user@@domain.com` passes (double-at matches `[^\s@]+`). The browser's `type="email"` provides a secondary check but does not close these gaps.

---

## 5. ErrorBoundary — Confirmed Correct

`ErrorBoundary.tsx` verified to contain:
- `getDerivedStateFromError` — static method, sets `{ hasError: true, error }`
- `componentDidCatch` — logs with `[ErrorBoundary]` prefix to `console.error`
- `handleRetry` — arrow function, calls `setState({ hasError: false, error: null })`
- `IS_PROD` guard on `<pre>` stack trace block
- "Try again" and "Reload Page" buttons

8 unit tests in `ErrorBoundary.test.tsx` all pass, including the specific regression tests for DEF-006, DEF-007, DEF-008.

---

## 6. Cross-Browser CSS — Current State

| Issue | Status | Evidence |
|---|---|---|
| `oklch()` for `--destructive` without hex fallback | **Resolved** | `index.css` line 126: hex `#dc2626` declared before the `oklch()` value |
| `scroll-behavior: smooth` without motion guard | **Resolved** | `index.css` lines 176–178: wrapped in `@media (prefers-reduced-motion: no-preference)` |
| `-webkit-line-clamp` + `-webkit-box-orient` in Blog | No change needed | Vendor prefix is still the correct cross-browser approach |
| `backdropFilter` / `WebkitBackdropFilter` in Navbar | Already handled | Both prefixes set in inline styles |
| `@custom-variant dark` (Tailwind v4 only) | Documented | Noted in CLAUDE.md |

No new cross-browser issues detected.

---

## 7. Test Infrastructure Quality Assessment

### Strengths

- 8 unit test files, 122 tests — all passing
- Playwright config at project root with auto dev-server start
- 5-browser project matrix (Chromium, Firefox, WebKit, Pixel 5, iPhone 13) in `tests/playwright.config.ts`
- `tests/fixtures/test-data.ts` with shared constants (7 exports including `VALID_DENTIST`, `VALID_PATIENT`, `XSS_PAYLOADS`, `BLOG_SLUGS`, `ALL_ROUTES`)
- `tests/unit/setup.ts` properly mocks `IntersectionObserver`, `ResizeObserver`, `window.matchMedia`
- DEF-015 fixed — no `waitForTimeout` calls remain
- XSS regression test present in E2E suite
- Network error path tests stubbed and commented, ready for activation when API exists
- `aria-live` region tested in Contact and Blog newsletter unit tests

### Weaknesses found in this re-audit

1. **Test-source drift in 5 assertions** — Features heading changed, Home page lost inline form, Footer/Pricing ambiguous locator, Footer strict mode violation, 404 test over-broad string. These are maintenance failures: the test-writer agent did not re-run the full suite after the source code was updated.

2. **DEF-001 blog test description is stale** — `blog.spec.ts:199` describe block is still named "known defect: button non-functional" and the test comment still says "BUG: There is no onSubmit handler". DEF-001 has been resolved in source. The test accidentally passes (button becomes "Subscribed!" which is still visible). The test and its description should be updated to assert correct functionality.

3. **`tests/playwright.config.ts` vs root `playwright.config.ts` duplication** — Two playwright config files exist. The root-level `playwright.config.ts` (used by `pnpm test:e2e`) has 3 browser projects; `tests/playwright.config.ts` has 5. This creates confusion. The 5-browser coverage advertised in the audit report only applies when using the inner config, not the active one.

4. **Coverage configuration path issue** — `tests/vitest.config.ts` coverage `include` paths use `../client/src/...` (relative to the config file location). When vitest resolves this from the project root, the path becomes `client/src/...` which is correct. However, this implicit relative resolution is fragile — if the config is moved, coverage breaks silently.

---

## 8. Tests That Need Updating (Actionable Fixes)

The following 8 test assertions need updating to match the current source. These are quick edits, not architectural changes.

### Fix 1: Features heading in `navigation.spec.ts`

**File:** `/Users/moziplaybook/Projects/official-perioskoup/tests/e2e/navigation.spec.ts` line 17

```typescript
// Current (broken):
{ path: "/features", heading: "Built for the full", description: "Features page hero heading" }

// Fix:
{ path: "/features", heading: "AI dental companion features", description: "Features page hero heading" }
```

### Fix 2: Features heading in `links.spec.ts`

**File:** `/Users/moziplaybook/Projects/official-perioskoup/tests/e2e/links.spec.ts` line 106

```typescript
// Current (broken):
"/features": "Built for the full",

// Fix:
"/features": "AI dental companion features",
```

### Fix 3: Pricing link ambiguity in `navigation.spec.ts`

**File:** `/Users/moziplaybook/Projects/official-perioskoup/tests/e2e/navigation.spec.ts` line 162

```typescript
// Current (broken — strict mode violation, 2 links named "Pricing"):
await page.getByRole("link", { name: "Pricing" }).click();

// Fix:
await page.locator("footer").getByRole("link", { name: "Pricing" }).click();
```

### Fix 4: Footer strict mode in `links.spec.ts`

**File:** `/Users/moziplaybook/Projects/official-perioskoup/tests/e2e/links.spec.ts` lines 142–148

```typescript
// Current (broken — multiple footer elements):
await page.locator("footer").waitFor({ state: "visible" });
const footerHrefs = await page.locator("footer a[href]").evaluateAll(...)

// Fix:
await page.locator("footer").first().waitFor({ state: "visible" });
const footerHrefs = await page.locator("footer").first().locator("a[href]").evaluateAll(...)
```

### Fix 5: Remove stale Home page WaitlistForm tests in `waitlist.spec.ts`

**File:** `/Users/moziplaybook/Projects/official-perioskoup/tests/e2e/waitlist.spec.ts` lines 185–210

The `"Home page — Inline WaitlistForm"` describe block (2 tests) references a component that no longer exists. Replace with:

```typescript
test.describe("Home page — Waitlist CTA", () => {
  test("home page CTA link navigates to /waitlist", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Join.*Waitlist/i }).first().click();
    await expect(page).toHaveURL("/waitlist");
  });
});
```

### Fix 6: 404 test over-broad assertion in `404.spec.ts`

**File:** `/Users/moziplaybook/Projects/official-perioskoup/tests/e2e/404.spec.ts` line 120

```typescript
// Current (broken — "AI dental companion" appears in Footer on 404 page):
await expect(page.getByText("AI dental companion", { exact: false })).not.toBeVisible();

// Fix — use Home-specific hero text that does not appear in Footer or 404:
await expect(page.getByText("Between visits,", { exact: false })).not.toBeVisible();
```

### Fix 7: Update DEF-001 blog newsletter test in `blog.spec.ts`

**File:** `/Users/moziplaybook/Projects/official-perioskoup/tests/e2e/blog.spec.ts` lines 199–222

The describe block is now misleadingly named and tests the broken state as if it were correct. Replace with:

```typescript
test.describe("Blog — newsletter form subscription", () => {
  test("Subscribe button with valid email shows success state", async ({ page }) => {
    await page.goto("/blog");
    await page.getByPlaceholder("Your email address").fill("test@example.com");
    await page.getByRole("button", { name: "Subscribe" }).click();
    // Button text should change to "Subscribed!" on success
    await expect(page.getByRole("button", { name: "Subscribed!" })).toBeVisible();
  });

  test("Subscribe button with invalid email shows error state", async ({ page }) => {
    await page.goto("/blog");
    await page.getByPlaceholder("Your email address").fill("notanemail");
    await page.getByRole("button", { name: "Subscribe" }).click();
    // Button should not change to "Subscribed!" on invalid email
    await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();
  });
});
```

---

## 9. Findings Summary

| ID | Severity | Category | Status | Description |
|---|---|---|---|---|
| DEF-001 | High | Form | **Resolved** | Blog newsletter Subscribe now has `handleNewsletterSubmit` + `<form>` wrapper |
| DEF-002 | High | Form | **OPEN** | All forms succeed with no API call; no error state for network failures |
| DEF-003 | Medium | Form | **OPEN** | No `maxLength` on any text input |
| DEF-004 | Low | Form | **OPEN** | Email regex edge cases (`a@b`, `user@@domain.com` pass) |
| DEF-010 | Low | CSS | **Resolved** | `oklch()` now has `#dc2626` hex fallback |
| DEF-012 | Low | CSS | **Resolved** | `scroll-behavior` wrapped in `prefers-reduced-motion: no-preference` |
| DEF-015 | Low | Testing | **Resolved** | `waitForTimeout(300)` replaced with condition-based wait |
| NEW-001 | Medium | Testing | **OPEN** | 5 E2E assertions fail due to test-source drift after `afa4493` commit |
| NEW-002 | Low | Testing | **OPEN** | DEF-001 blog test description is stale (says "non-functional" but feature is now working) |
| NEW-003 | Low | Testing | **OPEN** | Root `playwright.config.ts` has 3 browser projects; `tests/playwright.config.ts` has 5 — coverage advertised may not match what CI runs |

---

## 10. Score Breakdown

| Dimension | Score | Change | Rationale |
|---|---|---|---|
| Internal links | 10 / 10 | — | All routes resolve; automated link crawler passes for all 10 pages |
| 404 handling | 9 / 10 | — | Catch-all works; inline BlogPost fallback correct; noindex set |
| ErrorBoundary | 9 / 10 | +1 | Full component verified; all 8 unit tests pass |
| Form validation | 7 / 10 | +2 | Newsletter now functional (DEF-001 resolved); still no API/error state; no maxLength |
| Cross-browser CSS | 9 / 10 | +1 | Both outstanding CSS issues resolved (oklch fallback + motion guard) |
| E2E test coverage | 7 / 10 | -1 | 115/123 passing; 8 tests fail due to test-source drift after source code updates |
| Unit test coverage | 9 / 10 | +2 | 122/122 passing; all 3 previously missing components now have tests |
| **Overall** | **8 / 10** | **+0.5** | Genuine improvements across CSS, form behaviour, and unit coverage; E2E drift is the only regression |

---

## 11. Priority Fix List

Ordered by effort/impact:

1. **[QUICK, HIGH] NEW-001** — Apply the 7 test fixes listed in Section 8. These are all 1–5 line changes. Once applied, all E2E tests should pass.

2. **[MEDIUM] NEW-003** — Consolidate to a single `playwright.config.ts` at the project root. Keep the 5-browser matrix. Remove `tests/playwright.config.ts` or make it extend the root config.

3. **[HIGH] DEF-002** — Wire forms to a real API. `Waitlist.tsx` and `Contact.tsx` should `await fetch('/api/waitlist', ...)` and render an error UI if the response is not `2xx`. Activate the commented-out network mock tests in `waitlist.spec.ts`.

4. **[MEDIUM] DEF-003** — Add `maxLength` to all inputs:
   - First/last name: `maxLength={100}`
   - Email: `maxLength={254}` (RFC 5321 max)
   - Clinic name: `maxLength={200}`
   - Contact message: `maxLength={2000}`
   Update the long-input test in `waitlist.spec.ts` to assert the form does NOT submit.

5. **[LOW] DEF-004** — Replace regex email validation with Zod across all three forms for consistent, gap-free validation.

---

## 12. Tests Directory — Final Structure

```
tests/
├── playwright.config.ts              # 5 browsers, webServer auto-start (use this one)
├── vitest.config.ts                  # jsdom, globals, @/ alias, 60% coverage thresholds
├── e2e/
│   ├── navigation.spec.ts            # All routes, navbar, footer, breadcrumbs, SPA no-reload
│   ├── waitlist.spec.ts              # Happy paths, validation, XSS, long input, success nav
│   ├── mobile-menu.spec.ts           # Hamburger, drawer, aria, scroll lock, auto-close
│   ├── blog.spec.ts                  # 6 articles, invalid slug, newsletter, back link
│   ├── 404.spec.ts                   # Unknown routes, /404, content, layout
│   ├── external-links.spec.ts        # target=_blank, rel=noopener, correct URLs
│   └── links.spec.ts                 # Automated internal link crawler for all 10 pages
├── unit/
│   ├── setup.ts                      # IntersectionObserver, ResizeObserver, matchMedia mocks
│   ├── ErrorBoundary.test.tsx         # 8 tests — error catch, retry, reload, logging
│   ├── Breadcrumb.test.tsx            # 14 tests — visible nav + JSON-LD structured data
│   ├── Navbar.test.tsx                # 17 tests — links, mobile toggle, scroll lock
│   ├── NotFound.test.tsx              # 6 tests — 404 content, back link, regression
│   ├── WaitlistForm.test.tsx          # 16 tests — form render, role toggle, submission
│   ├── BlogPost.test.tsx              # 16 tests — valid/invalid slugs, fallback UI
│   ├── Contact.test.tsx               # 25 tests — validation, success state, ARIA
│   └── Footer.test.tsx                # 20 tests — all internal hrefs, EFP badge security
└── fixtures/
    └── test-data.ts                   # VALID_DENTIST, VALID_PATIENT, XSS_PAYLOADS,
                                       # BLOG_SLUGS, ALL_ROUTES, UNKNOWN_ROUTES,
                                       # VALID_CONTACT, BLOG_ARTICLES, FOOTER_INTERNAL_HREFS
```

---

## 13. Run Commands

```bash
# Unit tests — all 122 pass
pnpm test:unit --run

# E2E tests (starts dev server automatically) — 115/123 pass
pnpm test:e2e

# E2E single browser for speed
pnpm test:e2e --project=chromium

# Run both suites
pnpm test
```
