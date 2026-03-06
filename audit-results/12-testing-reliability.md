# Audit 12 — Testing & Reliability
**Score: 5 / 10**

Audit date: 2026-03-06
Auditor: QA Specialist Agent (Claude Sonnet 4.6)
Codebase: Perioskoup landing page — Vite 7 + React 19 + Wouter + Tailwind CSS v4

---

## Executive Summary

The codebase has a working router, a live ErrorBoundary, and a 404 page that renders for any unknown route. However there are zero automated tests of any kind. Forms have HTML5 `required` constraints but no JS-layer validation, no feedback on failed network calls, no XSS sanitisation, and no protection against overlong payloads. Several CSS features need cross-browser fallbacks. The `ErrorBoundary` is missing `componentDidCatch`, so errors are swallowed silently in production. Playwright + Vitest setup is missing entirely from `package.json`.

---

## 1. Internal Link Audit

All routes referenced in `<Link href="…">` and `<a href="…">` were mapped against the routes registered in `App.tsx`.

### Registered routes
| Path | Component |
|---|---|
| `/` | Home |
| `/features` | Features |
| `/for-dentists` | ForDentists |
| `/pricing` | Pricing |
| `/about` | About |
| `/blog` | Blog |
| `/blog/:slug` | BlogPost |
| `/contact` | Contact |
| `/waitlist` | Waitlist |
| `/privacy` | Privacy |
| `/terms` | Terms |
| `/404` | NotFound (explicit) |
| `*` (fallback) | NotFound |

### Internal links found

| Source file | href | Status |
|---|---|---|
| Navbar | `/features` | OK |
| Navbar | `/for-dentists` | OK |
| Navbar | `/about` | OK |
| Navbar | `/blog` | OK |
| Navbar | `/waitlist` | OK |
| Footer | `/features` | OK |
| Footer | `/for-dentists` | OK |
| Footer | `/pricing` | OK |
| Footer | `/waitlist` | OK |
| Footer | `/about` | OK |
| Footer | `/blog` | OK |
| Footer | `/contact` | OK |
| Footer | `/privacy` | OK |
| Footer | `/terms` | OK |
| Home | `/waitlist` | OK |
| Home | `/for-dentists` | OK |
| Home | `/features` | OK |
| Features | `/waitlist` | OK |
| Features | `/for-dentists` | OK |
| ForDentists | `/waitlist` | OK |
| ForDentists | `/features` | OK |
| ForDentists | `/contact` | OK |
| About | `/waitlist` | OK |
| About | `/contact` | OK |
| Blog | `/blog/:slug` (all 6 slugs) | OK |
| BlogPost | `/blog` | OK |
| BlogPost | `/waitlist` | OK |
| Pricing | `/waitlist` | OK |
| Waitlist (success) | `/` | OK |
| NotFound | `/` | OK |
| Breadcrumbs (all pages) | `/` | OK |

**No broken internal links detected.**

### Issues noted
- `BlogPost.tsx` renders an inline "Article not found" state (with `<Link href="/blog">`) when a slug is not in `ARTICLES`. This is correct partial handling but produces no HTTP-level 404 — the page returns 200 with "Article not found" UI. Fine for an SPA but worth noting for SEO.
- The `Home` page `WaitlistForm` (compact inline form) has `if (!email) return;` as its only validation gate — no email-format check beyond the browser's built-in `type="email"` constraint.

---

## 2. Form Validation Audit

### Forms identified
1. `Home.tsx` — `WaitlistForm` (compact + full variants)
2. `Waitlist.tsx` — full waitlist signup
3. `Contact.tsx` — contact message form
4. `Blog.tsx` — newsletter subscription (email only, no form `onSubmit` handler)

### Issue table

| Form | Field | Empty submit | Invalid email | XSS input | Long input (5000 chars) | Server error state |
|---|---|---|---|---|---|---|
| WaitlistForm (Home) | email | Blocked by `type="email" required` | Blocked by browser | **Not sanitised** — displayed in success message via React (safe due to JSX escaping) | **No `maxLength`** | **No error state — always shows success** |
| WaitlistForm (Home) | name, role | Not required — silently ignored | n/a | JSX-escaped | **No `maxLength`** | — |
| Waitlist page | first/last name | `required` blocks | n/a | JSX-escaped | **No `maxLength`** | **No error state** |
| Waitlist page | email | `required` + `type="email"` | Browser-level only | JSX-escaped | **No `maxLength`** | **No error state** |
| Waitlist page | clinic name | `required` (dentist only) | n/a | JSX-escaped | **No `maxLength`** | **No error state** |
| Contact | first/last name | `required` | n/a | JSX-escaped | **No `maxLength`** | **No error state** |
| Contact | email | `required` + `type="email"` | Browser-level | JSX-escaped | **No `maxLength`** | **No error state** |
| Contact | role select | `required` | n/a | n/a | n/a | **No error state** |
| Contact | message textarea | `required` | n/a | JSX-escaped | **No `maxLength`** | **No error state** |
| Blog newsletter | email | **No `required`, no `onSubmit`** — button does nothing | No validation | n/a | **No `maxLength`** | **No error/success state** |

### Critical defects

**DEF-001 — Blog newsletter Subscribe button is non-functional.**
The `<button className="btn-primary">Subscribe</button>` in `Blog.tsx` (line 259) has no `onClick` handler and its email `<input>` is not inside a `<form>`. Clicking Subscribe does nothing.

**DEF-002 — All forms have no network layer.**
Every `handleSubmit` calls `setSubmitted(true)` immediately with no API call. This means users see a "success" confirmation even if the backend is down or has never been implemented. When a real API is wired up, there will be no error-state UI to fall back to.

**DEF-003 — No `maxLength` on any text input.**
A 50 000-character paste into the name or message field is accepted and displayed in the success state. This is both a UX and a potential payload-size issue when an API is added.

**DEF-004 — Email format validated by browser only.**
`type="email"` is bypassed by programmatic form submission (e.g. `form.submit()` in tests or automation). A JS-level regex or Zod check is absent despite `zod` and `react-hook-form` being present in `package.json`.

**DEF-005 — XSS via `dangerouslySetInnerHTML` (low-risk, review).**
JSON-LD blocks use `dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}`. `JSON.stringify` escapes `<`, `>`, and `&` as unicode escapes only for object values — but the string is injected into a `<script>` tag which is inherently trusted. The data is hardcoded, not user-supplied, so no active XSS risk exists today. If FAQ content ever becomes user-editable, this must be sanitised before `JSON.stringify`.

---

## 3. 404 Page Analysis

**File:** `client/src/pages/NotFound.tsx`

### What it does
- Renders correctly on any unmatched route (Wouter `<Route component={NotFound} />` catch-all in `App.tsx`).
- Displays large "404" numeral, "Page not found" heading, descriptive message, and a "Back to Home" `<Link href="/">`.
- Wraps `<Navbar>` and `<Footer>` for consistent layout.
- Uses `ParallaxHeroBg` for visual continuity.

### Issues
- **No `HeroGlow` component** — `ParallaxHeroBg` is used but `HeroGlow` (which every other page imports) is imported at line 10 but then **never used** in the JSX. The import is stale.
- **No HTTP 404 status** — expected for an SPA, but Vercel's `vercel.json` rewrite should be confirmed to return 404 for the page shell (currently unknown without reading `vercel.json`).
- **`/404` route is explicitly registered** alongside the catch-all. This is harmless but redundant — navigating to `/404` shows the same component as any unknown route.

---

## 4. ErrorBoundary Analysis

**File:** `client/src/components/ErrorBoundary.tsx`

### What it does well
- Uses `static getDerivedStateFromError` correctly to set `hasError: true`.
- Renders a full-screen error UI with the error stack trace.
- Provides a "Reload Page" button via `window.location.reload()`.
- Wraps the entire app in `App.tsx`.

### Defects

**DEF-006 — Missing `componentDidCatch`.**
`componentDidCatch(error, info)` is absent. This means errors are not logged anywhere — no Sentry, no console, no monitoring. In production, errors are invisible until a user reports them. Add `componentDidCatch` to integrate with an error reporting service.

**DEF-007 — Stack trace exposed in production.**
`this.state.error?.stack` is rendered verbatim in a `<pre>` block. In production builds, this should be replaced with a generic message and the stack should be sent to an error reporting service, not displayed to users.

**DEF-008 — No retry mechanism.**
The "Reload Page" button reloads the entire page. If the error is deterministic (e.g. a bad API response on first load), the user will loop. A "Try again without reloading" option that calls `this.setState({ hasError: false, error: null })` should be offered first.

**DEF-009 — No per-route boundary.**
One top-level `ErrorBoundary` wraps everything. If a single page component throws, the entire app (including Navbar) is replaced with the error screen. Per-route boundaries (wrapping each `<Route>`) would limit blast radius.

---

## 5. Cross-Browser CSS Issues

| Issue | Location | Browsers affected | Fix |
|---|---|---|---|
| `backdropFilter` without `-webkit-` prefix | `Navbar.tsx` inline styles (lines 47–48) | Safari 14 and below | Both `backdropFilter` and `WebkitBackdropFilter` are already set — this is correct. No action needed. |
| `aspect-ratio: "390 / 844"` | `PhoneMockup.tsx` | Safari 14 and below, iOS 14 | `aspect-ratio` not supported before Safari 15. Add explicit `height` fallback. |
| `clamp()` font sizes | All pages | IE 11 (EOL, negligible), partial Chrome 48– | Acceptable for target audience. No action needed. |
| `backdrop-filter` on mobile drawer | `Navbar.tsx` | Chrome for Android 75 and below | Graceful degradation: the background is still opaque. No action needed. |
| `will-change: transform` | `index.css` (`.animated-bg-img`) | IE 11, old Edge | Graceful: animation still works, just potentially without GPU acceleration. |
| `@custom-variant dark` | `index.css` (line 24) | Tailwind CSS v4 specific syntax | Only works with `@tailwindcss/vite` plugin. Will break if migrated to v3. Document this dependency. |
| `oklch()` color for `--destructive` | `index.css` (line 76) | Safari 15.3 and below, Chrome 111 and below | Add hex fallback before the `oklch()` declaration: `--destructive: #e53e3e; --destructive: oklch(0.577 0.245 27.325);` |
| `text-wrap: balance` | Not currently used but Tailwind v4 generates it in utilities | Safari 17.4 and below | If used, add `word-break: break-word` as fallback. |
| CSS Grid `repeat(auto-fill, minmax(320px, 1fr))` | `Features.tsx` | IE 11 (EOL) | Acceptable for target audience. |
| `scroll-behavior: smooth` | `index.css` (html rule) | Firefox reduces-motion users | Wrap in `@media (prefers-reduced-motion: no-preference)`. |

**Highest priority fix:** `oklch()` for destructive color — add hex fallback. The `aspect-ratio` on PhoneMockup should have an explicit height fallback for iOS 14 users.

---

## 6. Test Suite — Complete Playwright E2E Code

See files:
- `tests/e2e/navigation.spec.ts`
- `tests/e2e/waitlist.spec.ts`
- `tests/e2e/mobile-menu.spec.ts`
- `tests/e2e/blog.spec.ts`
- `tests/e2e/404.spec.ts`
- `tests/e2e/external-links.spec.ts`
- `tests/playwright.config.ts`
- `tests/unit/` (see unit test recommendations section)

---

## 7. Unit Test Recommendations

### Critical components to unit test

| Component | What to test | Framework |
|---|---|---|
| `WaitlistForm` (Home) | Empty email submit blocked; valid email → success state; `compact` prop hides name/role fields | Vitest + React Testing Library |
| `Waitlist` page form | Role toggle switches required fields; dentist fields appear/disappear; submit shows success state | Vitest + RTL |
| `Contact` form | All required fields enforced; success state on submit | Vitest + RTL |
| `ErrorBoundary` | Renders error UI when child throws; Reload button calls `window.location.reload` | Vitest + RTL |
| `Breadcrumb` | Renders correct number of items; last item has no link; JSON-LD output structure | Vitest + RTL |
| `Navbar` | Active link highlighted; mobile menu toggle opens/closes drawer; menu closes on route change | Vitest + RTL |
| `BlogPost` | Renders article for valid slug; renders "not found" UI for invalid slug | Vitest + RTL |
| `NotFound` | Renders 404 numeral and back-to-home link | Vitest + RTL |

---

## 8. Findings Summary

| ID | Severity | Category | Description |
|---|---|---|---|
| DEF-001 | High | Form | Blog newsletter Subscribe button has no handler — completely non-functional |
| DEF-002 | High | Form | All forms succeed immediately with no real API call and no error state |
| DEF-003 | Medium | Form | No `maxLength` on any text input |
| DEF-004 | Medium | Form | Email validated by browser only, no JS-layer check |
| DEF-005 | Low | Security | `dangerouslySetInnerHTML` in JSON-LD scripts (data is hardcoded, low risk) |
| DEF-006 | High | ErrorBoundary | Missing `componentDidCatch` — errors not logged anywhere |
| DEF-007 | Medium | ErrorBoundary | Stack trace exposed to users in production |
| DEF-008 | Medium | ErrorBoundary | No state-reset retry, only full page reload |
| DEF-009 | Medium | ErrorBoundary | Single top-level boundary, no per-route isolation |
| DEF-010 | Low | CSS | `oklch()` color used without hex fallback |
| DEF-011 | Low | CSS | `aspect-ratio` in PhoneMockup without height fallback for iOS 14 |
| DEF-012 | Low | CSS | `scroll-behavior: smooth` not wrapped in `prefers-reduced-motion` |
| DEF-013 | Info | NotFound | Stale `HeroGlow` import that is never used |
| DEF-014 | Info | Testing | Zero automated tests in codebase — Playwright and Vitest not installed |

---

## 9. Score Breakdown

| Dimension | Score | Rationale |
|---|---|---|
| Internal links | 10/10 | All routes resolve correctly, no broken hrefs |
| 404 handling | 7/10 | Catch-all route works; stale import; no HTTP-level 404 |
| ErrorBoundary | 4/10 | Catches errors but swallows them silently; exposes stack; no per-route isolation |
| Form validation | 4/10 | Browser-level only; no API error state; newsletter button broken |
| Cross-browser CSS | 7/10 | Most issues minor; `oklch` and `aspect-ratio` need fallbacks |
| Test coverage | 0/10 | No tests of any kind exist |
| **Overall** | **5/10** | Solid structure, broken newsletter form, critical ErrorBoundary gaps, zero test coverage |


---

## 10. Tests Directory Structure

```
tests/
├── playwright.config.ts          # Playwright configuration (5 browser projects)
├── vitest.config.ts              # Vitest configuration for unit tests
├── e2e/
│   ├── navigation.spec.ts        # All route navigation (direct + Navbar + Footer + Breadcrumb)
│   ├── waitlist.spec.ts          # Waitlist form (happy path, empty fields, invalid email, XSS, long input)
│   ├── mobile-menu.spec.ts       # Mobile hamburger menu toggle, body scroll lock
│   ├── blog.spec.ts              # Blog index, article loading, invalid slug, newsletter
│   ├── 404.spec.ts               # 404 page (unknown routes, layout, back-to-home)
│   └── external-links.spec.ts    # target=_blank, rel=noopener noreferrer, correct URLs
├── unit/
│   ├── setup.ts                  # @testing-library/jest-dom setup
│   ├── WaitlistForm.test.tsx     # WaitlistForm validation and success state
│   ├── ErrorBoundary.test.tsx    # Error catching, reload button, DEF-006/007/008 documentation
│   ├── Breadcrumb.test.tsx       # Items, links, JSON-LD structure
│   ├── Navbar.test.tsx           # Nav links, mobile toggle, scroll lock
│   └── NotFound.test.tsx         # 404 content, back-to-home link
└── fixtures/
    └── test-data.ts              # Shared test data: valid users, invalid emails, XSS payloads, routes
```

---

## 11. Installation Guide

### Playwright (E2E)

```bash
# Install Playwright and browser binaries
pnpm add -D @playwright/test
npx playwright install --with-deps

# Run E2E tests against preview build
pnpm build && pnpm preview &
BASE_URL=http://localhost:4173 npx playwright test --config tests/playwright.config.ts

# Run in headed mode (debug)
npx playwright test --config tests/playwright.config.ts --headed

# Show HTML report
npx playwright show-report playwright-report
```

### Vitest (Unit)

```bash
# Install testing dependencies
pnpm add -D @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom

# Run unit tests
npx vitest --config tests/vitest.config.ts

# Run with coverage
npx vitest --config tests/vitest.config.ts --coverage
```

### Recommended package.json scripts

```json
{
  "scripts": {
    "test:e2e": "playwright test --config tests/playwright.config.ts",
    "test:e2e:headed": "playwright test --config tests/playwright.config.ts --headed",
    "test:unit": "vitest --config tests/vitest.config.ts",
    "test:unit:coverage": "vitest --config tests/vitest.config.ts --coverage",
    "test": "pnpm test:unit && pnpm test:e2e"
  }
}
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
        with: { node-version: '20' }
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm test:unit

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm install -g pnpm
      - run: pnpm install
      - run: npx playwright install --with-deps
      - run: pnpm build
      - run: pnpm preview &
      - run: npx wait-on http://localhost:4173
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 12. Priority Fix List

Ordered by business impact:

1. **[HIGH] DEF-001** — Wire up or remove the Blog newsletter Subscribe button. Either add a form submit handler with a real API call or remove the dead UI.
2. **[HIGH] DEF-002** — Add a real API integration to all forms and implement error states for network failures.
3. **[HIGH] DEF-006** — Add `componentDidCatch` to ErrorBoundary to log errors to a monitoring service (e.g., Sentry).
4. **[MEDIUM] DEF-007** — Hide raw stack trace from users in production; send it to monitoring only.
5. **[MEDIUM] DEF-003** — Add `maxLength` to all text inputs (name: 100, email: 254, message: 2000, clinic: 200).
6. **[MEDIUM] DEF-004** — Add JS-layer email validation using `zod` (already in `package.json`), since `react-hook-form` and `zod` are both available.
7. **[MEDIUM] DEF-008** — Add a state-reset retry option in ErrorBoundary before the full page reload.
8. **[MEDIUM] DEF-009** — Add per-route ErrorBoundary instances to limit the blast radius of render errors.
9. **[LOW] DEF-010** — Add hex fallback before `oklch()` in `--destructive` CSS variable.
10. **[LOW] DEF-011** — Add explicit `height` fallback on PhoneMockup `aspect-ratio` for iOS 14.
11. **[LOW] DEF-012** — Wrap `scroll-behavior: smooth` in `@media (prefers-reduced-motion: no-preference)`.
12. **[INFO] DEF-013** — Remove stale `HeroGlow` import from `NotFound.tsx`.
13. **[INFO] DEF-014** — Install Playwright and Vitest, implement this test suite.

