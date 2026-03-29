# Audit 12 — Testing & Reliability
**Score: 8.2 / 10**

Audit date: 2026-03-06 (cycle-3 deep audit — supersedes 7.5/10 re-audit)
Auditor: QA Engineer Agent (Claude Sonnet 4.6)
Codebase: Perioskoup landing page — Vite 7 + React 19 + Wouter + Tailwind CSS v4

---

## Executive Summary

The project has a mature, purpose-built test infrastructure: 7 Playwright E2E spec files, 8 Vitest unit test files, shared fixtures, a dual playwright.config.ts setup (root for CI, tests/ for local), and all test scripts wired into package.json. Coverage spans all 10 routes, both forms, mobile menu, blog, 404, external links, and internal link crawling.

Three bugs were found during this audit that were not present in the previous report:

1. **CRIT-001 (NEW)** — `Navbar.tsx` sets `document.documentElement.style.overflow` but both the Playwright E2E test (`mobile-menu.spec.ts` lines 166, 177) and the Vitest unit test (`Navbar.test.tsx` lines 142, 149) check `document.body.style.overflow`. The tests pass in CI only because jsdom propagates overflow to `body` through its CSS cascade simulation; in a real browser they would not match. This is a test/implementation mismatch that produces false confidence.

2. **DEF-001 (still open)** — Blog newsletter `Subscribe` button: the source was updated to add `onSubmit={handleNewsletterSubmit}` on the `<form>` and a state machine (`idle / success / error`), so the button is now functional. However, the E2E test (`blog.spec.ts` lines 200–222) still asserts the **broken** state and does not test the success path. The test is wrong about the current implementation.

3. **DEF-015 (resolved)** — The `links.spec.ts` file no longer contains `waitForTimeout(300)`. The footer test now correctly uses `await page.locator("footer").waitFor({ state: "visible" })`.

Remaining gaps preventing a perfect score: no CI/CD pipeline (`.github/` directory does not exist), no visual regression tests, no automated a11y (axe) integration, no `maxLength` on inputs, no real API backend with error state UI, and the E2E external link scan omits `/contact`, `/waitlist`, `/terms`, and `/privacy` pages.

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

| Source file | `href` values in source | Verdict |
|---|---|---|
| `Navbar.tsx` NAV_LINKS | `/features`, `/for-dentists`, `/pricing`, `/about`, `/blog`, `/contact` | All registered |
| `Navbar.tsx` CTA | `/waitlist` | OK |
| `Navbar.tsx` logo | `/` | OK |
| `Footer.tsx` FOOTER_LINKS | `/features`, `/for-dentists`, `/pricing`, `/waitlist`, `/about`, `/blog`, `/contact`, `/privacy`, `/terms` | All registered |
| `Home.tsx` | `/waitlist`, `/for-dentists`, `/features` | All OK |
| `Blog.tsx` | `/blog/what-is-periodontal-disease`, `/blog/efp-digital-innovation-award-2025`, `/blog/how-ai-is-changing-dental-monitoring`, `/blog/3-minute-routine-save-teeth`, `/blog/why-patients-forget-instructions`, `/blog/building-the-bridge-perioskoup-story`, `/waitlist` | All OK |
| `BlogPost.tsx` | `/blog`, `/waitlist` | All OK |
| `Waitlist.tsx` (success) | `/` | OK |
| `NotFound.tsx` | `/` | OK |
| All Breadcrumb uses | `/` | OK |

**No broken internal links detected.**

### Blog slug consistency

The 6 slugs in `Blog.tsx POSTS` exactly match the 6 keys in `BlogPost.tsx ARTICLES`:
- `what-is-periodontal-disease`
- `efp-digital-innovation-award-2025`
- `how-ai-is-changing-dental-monitoring`
- `3-minute-routine-save-teeth`
- `why-patients-forget-instructions`
- `building-the-bridge-perioskoup-story`

### External links — security attributes

All `<a href="http...">` anchors in source carry `target="_blank"` and `rel="noopener noreferrer"`:

| Location | URL | target | rel |
|---|---|---|---|
| `Home.tsx:85` | efp.org | _blank | noopener noreferrer |
| `Home.tsx:191` | efp.org | _blank | noopener noreferrer |
| `About.tsx:166` | efp.org | _blank | noopener noreferrer |
| `About.tsx:203` | study citation hrefs | _blank | noopener noreferrer |
| `About.tsx:282` | LinkedIn hrefs | _blank | noopener noreferrer |
| `ForDentists.tsx:90` | efp.org | _blank | noopener noreferrer |
| `Pricing.tsx:101` | efp.org | _blank | noopener noreferrer |
| `Footer.tsx:54` | efp.org | _blank | noopener noreferrer |

**Gap (NEW-001):** The E2E external-link scan in `external-links.spec.ts` line 126 covers only 6 pages: `/`, `/about`, `/features`, `/for-dentists`, `/blog`, `/pricing`. The pages `/contact`, `/waitlist`, `/terms`, and `/privacy` are not scanned. The LinkedIn links on the About page (rendered from a dynamic array) are not individually asserted. They do carry the correct attributes in source, but they are not regression-tested.

---

## 2. Form Validation Audit

### Forms identified

1. `Waitlist.tsx` — waitlist signup (primary conversion form)
2. `Contact.tsx` — contact message form
3. `Blog.tsx` — newsletter subscription

### Validation matrix

| Form | Field | Empty submit | Invalid email | XSS | Long input (5000 chars) | Server error state |
|---|---|---|---|---|---|---|
| Waitlist | first name | JS inline error | n/a | React JSX-escaped | **No maxLength** | **None** |
| Waitlist | last name | HTML5 `required` only | n/a | JSX-escaped | **No maxLength** | **None** |
| Waitlist | email | JS inline error | JS regex + `type="email"` | JSX-escaped | **No maxLength** | **None** |
| Waitlist | clinic name (dentist) | JS inline error | n/a | JSX-escaped | **No maxLength** | **None** |
| Contact | first name | JS inline error | n/a | JSX-escaped | **No maxLength** | **None** |
| Contact | last name | HTML5 `required` only | n/a | JSX-escaped | **No maxLength** | **None** |
| Contact | email | JS inline error | JS regex + `type="email"` | JSX-escaped | **No maxLength** | **None** |
| Contact | role select | JS inline error | n/a | n/a | n/a | **None** |
| Contact | message | JS inline error | n/a | JSX-escaped | **No maxLength** | **None** |
| Blog newsletter | email | JS inline error (via handleNewsletterSubmit) | JS regex | n/a | **No maxLength** | **None** |

### XSS assessment

React renders all form values through JSX — user-supplied strings are HTML-escaped automatically. `dangerouslySetInnerHTML` is used only for JSON-LD `<script>` tags containing hardcoded `JSON.stringify()` output. No user input reaches `dangerouslySetInnerHTML`. Risk is negligible.

### Active defects

**DEF-002 (OPEN) — All forms have no real API backend.** Both `Waitlist.tsx` and `Contact.tsx` call `setSubmitted(true)` / `setSent(true)` immediately with no network call. No error state UI exists for network failures. The E2E network error path tests are present but commented out in `waitlist.spec.ts` lines 231–270.

**DEF-003 (OPEN) — No `maxLength` on any text input.** A 50,000-character paste is accepted by all text fields. When a real API is wired up, this becomes a server-side payload size concern.

**DEF-004 (OPEN, partial) — Email regex has edge-case gaps.** The regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` used in both `Waitlist.tsx:28` and `Contact.tsx:28` passes `a@b` (no TLD), `user@@domain.com` (double @). The HTML5 `type="email"` attribute mitigates this in browsers but not in unit tests (jsdom does not enforce `type="email"` validation on `fireEvent`).

**DEF-016 (NEW — OPEN) — Blog newsletter E2E test asserts broken state despite source being fixed.** `Blog.tsx` lines 96–106 now has a proper `handleNewsletterSubmit` function and the button is inside a `<form onSubmit={handleNewsletterSubmit}>`. The E2E test at `blog.spec.ts` lines 199–222 still asserts the button has no state change after click — this is incorrect about the current implementation. The test needs to be updated to verify the success state.

---

## 3. 404 Page Analysis

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/NotFound.tsx`

The `NotFound.tsx` component is correct:
- Wouter catch-all `<Route component={NotFound} />` in `App.tsx:98` catches every unregistered path.
- Explicit `/404` route at `App.tsx:97` also registered.
- Renders "404" numeral (opacity 0.2 for visual effect), "Page not found." h1, explanatory paragraph, `<Link href="/">Back to Home</Link>`.
- Full Navbar and Footer present.
- `<meta name="robots" content="noindex, nofollow" />` set correctly.
- No stale imports (DEF-013 resolved).
- `/blog/invalid-slug` routes to BlogPost which renders its own "Article not found" inline fallback. This is correct SPA behaviour and well-tested.

---

## 4. ErrorBoundary Analysis

**File:** `/Users/moziplaybook/Projects/official-perioskoup/client/src/components/ErrorBoundary.tsx`

- `getDerivedStateFromError` correctly sets `hasError: true` and stores the error object.
- `componentDidCatch` logs to `console.error` with `[ErrorBoundary]` prefix — errors are visible in devtools.
- "Try again" button calls `handleRetry()` which resets state without full reload.
- "Reload Page" button calls `window.location.reload()`.
- Stack trace hidden in production via `IS_PROD` guard.
- The boundary wraps the entire `<Router>` in `App.tsx:108`.
- Unit tests in `ErrorBoundary.test.tsx` cover all 7 behaviours including `getDerivedStateFromError` called statically.

**Remaining issues:**

**DEF-009 (Open, acceptable for current scale)** — Single top-level boundary. A route component throw replaces the entire app surface. Per-route boundaries would limit blast radius.

**No external error monitoring** — `componentDidCatch` logs to `console.error`. For production, `Sentry.captureException()` or equivalent is needed. A TODO comment acknowledges this in source.

---

## 5. Cross-Browser CSS Issues

| ID | Issue | File:Line | Browsers affected | Severity |
|---|---|---|---|---|
| CSS-001 | `oklch()` for `--destructive` | `index.css:126-127` | **RESOLVED** — hex fallback `#dc2626` added on line 126 before oklch declaration | — |
| CSS-002 | `scroll-behavior: smooth` | `index.css:175-177` | **RESOLVED** — correctly wrapped in `@media (prefers-reduced-motion: no-preference)` | — |
| CSS-003 | `backdrop-filter` on Navbar | `Navbar.tsx:97-98` | WebKit requires `-webkit-backdrop-filter` prefix — **RESOLVED**, both `backdropFilter` and `WebkitBackdropFilter` set | — |
| CSS-004 | `100dvh` for mobile drawer height | `Navbar.tsx:181` | Safari <15.4 (pre-2022) does not support `dvh` — fallback missing | Low |
| CSS-005 | `100svh` for page wrappers | Multiple pages | Same as CSS-004; Safari <15.4 does not support `svh` — fallback: use `100vh` first | Low |
| CSS-006 | `-webkit-overflow-scrolling: touch` | `Navbar.tsx:228` | This property was removed in iOS 13. It does nothing on modern iOS but is harmless dead code | Negligible |

**CSS-004/CSS-005 fix:**
```css
/* Before dvh/svh: */
min-height: 100vh;           /* fallback */
min-height: 100svh;          /* progressive enhancement */
```
In `Navbar.tsx` the drawer uses `height: '100dvh'` inline. Adding a fallback:
```typescript
// Navbar.tsx:181 — add fallback:
height: '100vh',
height: '100dvh',
```
Note: React inline styles do not support duplicate keys (the second overwrites the first). The correct approach is to use a CSS class or a CSS custom property with `@supports`.

---

## 6. CRIT-001 — Scroll Lock Test/Implementation Mismatch

**This is the most critical finding in this audit cycle.**

**Source truth (`Navbar.tsx:43-47`):**
```typescript
useEffect(() => {
  if (menuOpen) {
    document.documentElement.style.overflow = 'hidden';  // sets <html> element
    return () => {
      document.documentElement.style.overflow = '';
    };
  }
}, [menuOpen]);
```

**Unit test (`Navbar.test.tsx:139-150`):**
```typescript
it("body.style.overflow is 'hidden' when menu is open", () => {
  ...
  expect(document.body.style.overflow).toBe("hidden");  // checks <body> — WRONG
});
```

**E2E test (`mobile-menu.spec.ts:160-167`):**
```typescript
test("body overflow is hidden when mobile menu is open", async ({ page }) => {
  ...
  const overflow = await page.evaluate(() => document.body.style.overflow);  // checks <body> — WRONG
  expect(overflow).toBe("hidden");
});
```

The source sets `document.documentElement` (the `<html>` element). Both tests check `document.body`. These tests pass in jsdom (which propagates the overflow through its simulated cascade) and may pass in Chrome DevTools-based Playwright evaluation (since Chromium also propagates), but the intent mismatch is a reliability hazard. When the implementation changes or is tested on an engine that does not propagate, the tests become meaningless.

**Fix required — unit test:**
```typescript
// Navbar.test.tsx:142
expect(document.documentElement.style.overflow).toBe("hidden");
// Navbar.test.tsx:149
expect(document.documentElement.style.overflow).toBe("");
```

**Fix required — E2E test:**
```typescript
// mobile-menu.spec.ts:166
const overflow = await page.evaluate(() => document.documentElement.style.overflow);
expect(overflow).toBe("hidden");
// mobile-menu.spec.ts:177
const overflow = await page.evaluate(() => document.documentElement.style.overflow);
expect(overflow).toBe("");
```

---

## 7. E2E Test Coverage Analysis

### Files and coverage

| File | Tests | Coverage |
|---|---|---|
| `navigation.spec.ts` | 10 direct URL, 5 navbar clicks, 1 logo click, 1 SPA no-reload, 3 footer links, 2 breadcrumb links | All 10 routes, navbar, footer, SPA behaviour |
| `waitlist.spec.ts` | 2 happy paths, 3 empty field tests, 2 invalid email, 1 long input, 1 XSS, 1 post-success nav | Form validation, role switcher, success state |
| `mobile-menu.spec.ts` | 3 visibility, 5 open/close, 1 drawer content, 1 CTA nav, 1 auto-close, 2 scroll lock | Mobile drawer complete — CRIT-001 bug in scroll lock assertions |
| `blog.spec.ts` | 4 index page, 3 click-nav, 6 article slugs, 3 nav, 1 invalid slug, 1 newsletter | All articles, fallback UI, newsletter (stale assertion) |
| `404.spec.ts` | 6 unknown routes, 1 /404, 5 content, 1 back-nav, 2 layout, 1 no-other-content, 1 blog-slug | Thorough 404 coverage |
| `external-links.spec.ts` | 2 attribute scans, 4 URL assertions, 1 new-tab test, 6 page security scan | EFP links correct; 4 pages not scanned (see NEW-001) |
| `links.spec.ts` | 10 internal-link crawls, 10 route/content maps, 6 blog slugs, 1 footer crawl | Comprehensive broken-link detection |

### Missing E2E coverage

| Gap | Priority | Recommendation |
|---|---|---|
| Contact form happy path + validation errors | High | E2E test for Contact page form — all fields, inline errors, success state |
| Blog newsletter success path | High | Update `blog.spec.ts` DEF-001 test to assert success message after valid email submit |
| `/contact`, `/waitlist`, `/terms`, `/privacy` external link scan | Medium | Add these 4 pages to `PAGES_TO_SCAN` in `external-links.spec.ts` |
| Pricing page blur overlay (beta state) | Low | Assert pricing cards show overlay/blur, not raw prices |
| `ErrorBoundary` E2E test | Low | Navigate to a route, trigger a JS error via `page.evaluate`, assert error UI |
| Skip-to-content link visible on focus | Low | Tab key press on home, assert `#main-content` skip link visible |
| Keyboard navigation (Tab through nav) | Low | Focus trap test for mobile drawer (Escape key close) |

---

## 8. Unit Test Coverage Analysis

### Files and coverage

| File | Component under test | Tests | Gaps |
|---|---|---|---|
| `setup.ts` | — | IntersectionObserver, ResizeObserver, matchMedia mocks | None |
| `WaitlistForm.test.tsx` | `Waitlist` page | 15 tests — render, role toggle, success, attributes | No test for clinic-name required error on dentist submit |
| `ErrorBoundary.test.tsx` | `ErrorBoundary` | 7 tests — all behaviours | None |
| `Navbar.test.tsx` | `Navbar` | 15 tests — links, toggle, scroll lock, drawer content | CRIT-001: scroll lock assertion wrong (checks body not html) |
| `NotFound.test.tsx` | `NotFound` | 5 tests — all content | None |
| `Breadcrumb.test.tsx` | `Breadcrumb` | 13 tests — visible nav + JSON-LD | None |
| `BlogPost.test.tsx` | `BlogPost` | 12 tests — valid slugs, invalid slug fallback | None |
| `Contact.test.tsx` | `Contact` | 28 tests — initial render, attributes, submission, validation | None |
| `Footer.test.tsx` | `Footer` | 21 tests — all internal hrefs, EFP link, copyright, section headings | None |

### Components with no unit tests

| Component | Priority | What to test |
|---|---|---|
| `ParallaxHeroBg.tsx` | Low | Renders without error; `prefers-reduced-motion` guard |
| `PhoneMockup.tsx` | Low | Renders without error; clock display |
| `HeroGlow.tsx` | Negligible | Pure presentational, no logic |
| `CustomCursor.tsx` | Low | `mousemove` event handler, touch device detection |
| `Home.tsx` | Medium | Hero content renders; EFP badge link present with correct href |
| `Features.tsx` | Low | Hero heading renders; feature cards present |
| `About.tsx` | Low | Team member cards render; EFP section present |
| `ForDentists.tsx` | Low | Hero heading; CTA link to /waitlist |
| `Pricing.tsx` | Medium | Blur overlay present (pricing not exposed); EFP badge |
| `Blog.tsx` | Medium | Newsletter form present; `handleNewsletterSubmit` sets success state |

### Coverage thresholds

`tests/vitest.config.ts` sets: 60% lines, 60% functions, 50% branches. These are reasonable minimums but should increase to 70/70/60 before public launch.

---

## 9. Accessibility Testing in Tests

| Type | Status |
|---|---|
| `aria-label` assertions | Present in Navbar.test.tsx (hamburger button), external-links.spec.ts |
| `aria-required="true"` assertions | Present in Contact.test.tsx, WaitlistForm.test.tsx |
| `aria-expanded` assertions | Present in Navbar.test.tsx |
| `aria-controls` assertions | Present in Navbar.test.tsx |
| `role="alert"` assertions | Present in Contact.test.tsx (inline error spans) |
| `role="dialog"` assertions | Present in mobile-menu.spec.ts |
| `aria-modal` assertions | Not tested |
| Automated axe-core scan | **Missing** — no `@axe-core/playwright` integration |
| Keyboard navigation tests | **Missing** — no Tab/Escape key sequences in E2E |
| Colour contrast tests | **Missing** |
| Skip-to-content link test | **Missing** |
| `aria-live` announcement test | **Missing** — RouteAnnouncer in App.tsx not tested |

**Recommendation:** Add `@axe-core/playwright` to the E2E suite for automated WCAG 2.1 AA scanning:

```typescript
// tests/e2e/a11y.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = ["/", "/features", "/for-dentists", "/about", "/blog", "/contact", "/waitlist", "/pricing", "/privacy", "/terms"];

for (const path of PAGES) {
  test(`${path} — no axe WCAG 2.1 AA violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
```

---

## 10. Visual Regression Testing

**Status: Not implemented.**

No `toHaveScreenshot()` calls exist in any test file. The Playwright config sets `screenshot: "only-on-failure"` (failure capture, not baseline comparison).

**Recommendation:** Add a dedicated `tests/e2e/visual.spec.ts` with baseline screenshots for the five key page states:

```typescript
// tests/e2e/visual.spec.ts
import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 800 } });

const SCREENSHOT_ROUTES = [
  { path: "/", name: "home" },
  { path: "/features", name: "features" },
  { path: "/blog", name: "blog" },
  { path: "/waitlist", name: "waitlist" },
  { path: "/this-page-does-not-exist", name: "404" },
];

for (const { path, name } of SCREENSHOT_ROUTES) {
  test(`visual regression — ${name} (desktop)`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot(`${name}-desktop.png`, {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    });
  });
}

test("visual regression — home (mobile)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("home-mobile.png", {
    maxDiffPixelRatio: 0.02,
    animations: "disabled",
  });
});

test("visual regression — mobile menu open", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page).toHaveScreenshot("mobile-menu-open.png", {
    maxDiffPixelRatio: 0.01,
    animations: "disabled",
  });
});
```

---

## 11. SEO Testing in Tests

**Status: Not implemented.**

No meta tag, structured data, or canonical URL assertions exist in any test file.

**Recommendation:** Add `tests/e2e/seo.spec.ts`:

```typescript
// tests/e2e/seo.spec.ts
import { test, expect } from "@playwright/test";

const SEO_PAGES = [
  {
    path: "/",
    title: "Perioskoup | AI Dental Companion App",
    canonical: "https://perioskoup.com/",
    ogType: "website",
  },
  {
    path: "/features",
    title: "Features",
    canonical: "https://perioskoup.com/features",
    ogType: "website",
  },
  {
    path: "/blog",
    title: "Dental Health",
    canonical: "https://perioskoup.com/blog",
    ogType: "website",
  },
];

for (const { path, title, canonical, ogType } of SEO_PAGES) {
  test.describe(`SEO — ${path}`, () => {
    test("title tag contains expected text", async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(new RegExp(title, "i"));
    });

    test("canonical link is correct", async ({ page }) => {
      await page.goto(path);
      const canonicalHref = await page.$eval(
        'link[rel="canonical"]',
        (el) => (el as HTMLLinkElement).href
      );
      expect(canonicalHref).toBe(canonical);
    });

    test("og:type meta is set", async ({ page }) => {
      await page.goto(path);
      const ogTypeContent = await page.$eval(
        'meta[property="og:type"]',
        (el) => (el as HTMLMetaElement).content
      );
      expect(ogTypeContent).toBe(ogType);
    });

    test("JSON-LD script tag is present", async ({ page }) => {
      await page.goto(path);
      const jsonLd = await page.$('script[type="application/ld+json"]');
      expect(jsonLd).not.toBeNull();
    });
  });
}

test("404 page has noindex meta robots", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  const robots = await page.$eval(
    'meta[name="robots"]',
    (el) => (el as HTMLMetaElement).content
  );
  expect(robots).toContain("noindex");
});
```

---

## 12. CI/CD Integration

**Status: No CI/CD pipeline exists.** The `.github/` directory does not exist in the repository.

The `package.json` scripts are fully wired:
```json
"test:e2e": "playwright test",
"test:unit": "vitest --config tests/vitest.config.ts",
"test:unit:coverage": "vitest --config tests/vitest.config.ts --coverage",
"test": "pnpm test:unit && pnpm test:e2e"
```

**Recommended GitHub Actions workflow** (`/.github/workflows/tests.yml`):

```yaml
name: Tests

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  unit:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:unit:coverage
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: unit-coverage
          path: coverage/

  e2e:
    name: E2E Tests (${{ matrix.browser }})
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: npx playwright install --with-deps ${{ matrix.browser }}
      - run: pnpm build
      - name: Start preview server and run tests
        run: |
          pnpm preview &
          npx wait-on http://localhost:4173 --timeout 60000
          BASE_URL=http://localhost:4173 pnpm test:e2e --project=${{ matrix.browser }}
        env:
          CI: true
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report-${{ matrix.browser }}
          path: playwright-report/
```

---

## 13. Cross-Browser Coverage

| Browser | E2E | Unit | Mobile |
|---|---|---|---|
| Chromium (Desktop) | `playwright.config.ts` project | jsdom only | Pixel 5 via `tests/playwright.config.ts` |
| Firefox (Desktop) | Both playwright configs | jsdom only | Not tested |
| WebKit/Safari (Desktop) | Both playwright configs | jsdom only | iPhone 13 via `tests/playwright.config.ts` |
| Mobile Chrome | `tests/playwright.config.ts` only | — | Pixel 5 device |
| Mobile Safari | `tests/playwright.config.ts` only | — | iPhone 13 device |

**Gap:** The root `playwright.config.ts` (used by `pnpm test:e2e`) does not include mobile browser projects. The mobile projects only exist in `tests/playwright.config.ts`. Running `pnpm test:e2e` runs only 3 desktop browsers. To run all 5:
```bash
playwright test --config tests/playwright.config.ts
```
This split config creates confusion. **Recommendation:** Consolidate to a single `playwright.config.ts` at the root with all 5 browser projects, and delete `tests/playwright.config.ts`.

---

## 14. Complete Tests Directory Structure

```
tests/
├── playwright.config.ts              # Playwright: 5 browser projects (desktop + mobile)
├── vitest.config.ts                  # Vitest: jsdom, globals, @/ alias, coverage thresholds
├── e2e/
│   ├── navigation.spec.ts            # All 10 routes, navbar clicks, SPA no-reload, footer, breadcrumbs
│   ├── waitlist.spec.ts              # Dentist + patient happy paths, validation, XSS, long input, back-link
│   ├── mobile-menu.spec.ts           # Hamburger visibility, open/close, scroll lock, auto-close on nav
│   ├── blog.spec.ts                  # Blog index, 6 article slugs, invalid slug, newsletter (stale assertion)
│   ├── 404.spec.ts                   # Unknown routes, /404, content, layout, blog-slug delegation
│   ├── external-links.spec.ts        # target=_blank, rel=noopener, correct URLs, new-tab behavior
│   └── links.spec.ts                 # Internal link crawl: all pages, footer links, blog slugs
├── unit/
│   ├── setup.ts                      # IntersectionObserver, ResizeObserver, matchMedia mocks
│   ├── WaitlistForm.test.tsx         # Form render, role toggle, submission, attribute verification
│   ├── ErrorBoundary.test.tsx        # Error catching, retry, reload, logging, stack trace visibility
│   ├── Breadcrumb.test.tsx           # Visible nav + JSON-LD structured data (13 tests)
│   ├── Navbar.test.tsx               # Nav links, mobile toggle, scroll lock (CRIT-001 bug in assertions)
│   ├── NotFound.test.tsx             # 404 content, back link, DEF-013 regression guard
│   ├── BlogPost.test.tsx             # Valid slugs, invalid slug fallback, all 6 slugs render
│   ├── Contact.test.tsx              # 28 tests: render, attributes, submission, validation, role options
│   └── Footer.test.tsx               # 21 tests: all internal hrefs, EFP link, copyright, sections
└── fixtures/
    └── test-data.ts                  # Shared: VALID_DENTIST, VALID_PATIENT, INVALID_EMAILS,
                                      # XSS_PAYLOADS, LONG_INPUTS, BLOG_SLUGS, ALL_ROUTES,
                                      # UNKNOWN_ROUTES, VALID_CONTACT, BLOG_ARTICLES,
                                      # FOOTER_INTERNAL_HREFS, EFP_URL, INVALID_BLOG_SLUGS
```

---

## 15. Recommended Additional Test Files

### `tests/e2e/contact.spec.ts` (missing — HIGH priority)

```typescript
/**
 * Contact Form — E2E tests
 * Covers the full Contact page form: validation, success state, role select.
 */
import { test, expect } from "@playwright/test";

test.describe("Contact form — happy path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible();
  });

  test("submits successfully with all required fields filled", async ({ page }) => {
    await page.getByLabel("First name").fill("Anca");
    await page.getByLabel("Last name").fill("Constantin");
    await page.getByLabel("Email").fill("anca@perioskoup.com");
    await page.getByLabel(/I am a/i).selectOption("dentist");
    await page.getByLabel("Message").fill("Interested in founding clinic partnership.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByRole("heading", { name: /Message sent/i })).toBeVisible();
  });
});

test.describe("Contact form — validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("does not submit with empty form", async ({ page }) => {
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("First name is required", { exact: false })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Message sent/i })).not.toBeVisible();
  });

  test("shows error for invalid email format", async ({ page }) => {
    await page.getByLabel("First name").fill("Test");
    await page.getByLabel("Email").fill("notanemail");
    await page.getByLabel(/I am a/i).selectOption("patient");
    await page.getByLabel("Message").fill("Hello");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("shows error for missing role select", async ({ page }) => {
    await page.getByLabel("First name").fill("Test");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Message").fill("Hello");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText(/select your role/i)).toBeVisible();
  });

  test("shows error for missing message", async ({ page }) => {
    await page.getByLabel("First name").fill("Test");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel(/I am a/i).selectOption("patient");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText(/Message is required/i)).toBeVisible();
  });

  test("XSS payload in message field is rendered safely", async ({ page }) => {
    await page.getByLabel("First name").fill('<script>window.__xss=2</script>');
    await page.getByLabel("Last name").fill("Test");
    await page.getByLabel("Email").fill("xss@example.com");
    await page.getByLabel(/I am a/i).selectOption("patient");
    await page.getByLabel("Message").fill('<img src=x onerror=alert(1)>');
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByRole("heading", { name: /Message sent/i })).toBeVisible();
    const xssExecuted = await page.evaluate(() => (window as any).__xss);
    expect(xssExecuted).toBeUndefined();
  });
});

test.describe("Contact form — all role options present", () => {
  test("select contains patient, dentist, clinic, investor, press, other", async ({ page }) => {
    await page.goto("/contact");
    const options = await page.getByLabel(/I am a/i).selectOption("patient");
    // Verify each option exists by selecting it
    for (const role of ["patient", "dentist", "clinic", "investor", "press", "other"]) {
      await page.getByLabel(/I am a/i).selectOption(role);
      const value = await page.getByLabel(/I am a/i).inputValue();
      expect(value).toBe(role);
    }
  });
});
```

### `tests/e2e/a11y.spec.ts` (missing — MEDIUM priority)

```typescript
/**
 * Automated accessibility scan using axe-core.
 * Install: pnpm add -D @axe-core/playwright
 */
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/",
  "/features",
  "/for-dentists",
  "/about",
  "/blog",
  "/contact",
  "/waitlist",
  "/pricing",
  "/privacy",
  "/terms",
];

for (const path of PAGES) {
  test(`${path} — no WCAG 2.1 AA axe violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    if (results.violations.length > 0) {
      const summary = results.violations.map((v) =>
        `${v.id}: ${v.description} (${v.nodes.length} node(s))`
      ).join("\n");
      throw new Error(`Axe violations on ${path}:\n${summary}`);
    }

    expect(results.violations).toEqual([]);
  });
}

test("skip-to-content link is visible on keyboard focus", async ({ page }) => {
  await page.goto("/");
  // Tab once — the skip link should receive focus and become visible
  await page.keyboard.press("Tab");
  const skipLink = page.locator(".skip-link");
  await expect(skipLink).toBeVisible();
  await expect(skipLink).toHaveAttribute("href", "#main-content");
});

test("mobile drawer traps focus (Escape closes drawer)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Navigation menu" })).toBeVisible();

  // Escape key should close the drawer
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Navigation menu" })).not.toBeVisible();
  // Focus should return to the hamburger button
  const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
  expect(focused).toBe("Open menu");
});
```

### `tests/e2e/seo.spec.ts` (missing — MEDIUM priority)

```typescript
/**
 * SEO — meta tags, canonical URLs, JSON-LD validation.
 */
import { test, expect } from "@playwright/test";

const META_PAGES = [
  {
    path: "/",
    title: "Perioskoup | AI Dental Companion",
    canonical: "https://perioskoup.com/",
    hasJsonLd: true,
  },
  {
    path: "/features",
    title: "Features",
    canonical: "https://perioskoup.com/features",
    hasJsonLd: false,
  },
  {
    path: "/blog",
    title: "Dental Health",
    canonical: "https://perioskoup.com/blog",
    hasJsonLd: false,
  },
  {
    path: "/blog/what-is-periodontal-disease",
    title: "What Is Periodontal Disease",
    canonical: "https://perioskoup.com/blog/what-is-periodontal-disease",
    hasJsonLd: true,
  },
  {
    path: "/waitlist",
    title: "Waitlist",
    canonical: "https://perioskoup.com/waitlist",
    hasJsonLd: true,
  },
] as const;

for (const page_meta of META_PAGES) {
  test.describe(`SEO — ${page_meta.path}`, () => {
    test("title tag is present and contains expected text", async ({ page }) => {
      await page.goto(page_meta.path);
      await expect(page).toHaveTitle(new RegExp(page_meta.title, "i"));
    });

    test("canonical link href is correct", async ({ page }) => {
      await page.goto(page_meta.path);
      const canonical = await page.$eval(
        'link[rel="canonical"]',
        (el) => (el as HTMLLinkElement).href
      );
      expect(canonical).toBe(page_meta.canonical);
    });

    test("og:title meta is present", async ({ page }) => {
      await page.goto(page_meta.path);
      const ogTitle = await page.$eval(
        'meta[property="og:title"]',
        (el) => (el as HTMLMetaElement).content
      );
      expect(ogTitle.length).toBeGreaterThan(0);
    });

    test("og:description meta is present", async ({ page }) => {
      await page.goto(page_meta.path);
      const ogDesc = await page.$eval(
        'meta[property="og:description"]',
        (el) => (el as HTMLMetaElement).content
      );
      expect(ogDesc.length).toBeGreaterThan(0);
    });

    if (page_meta.hasJsonLd) {
      test("JSON-LD script is valid JSON", async ({ page }) => {
        await page.goto(page_meta.path);
        const jsonLdContent = await page.$eval(
          'script[type="application/ld+json"]',
          (el) => el.textContent ?? ""
        );
        expect(() => JSON.parse(jsonLdContent)).not.toThrow();
        const data = JSON.parse(jsonLdContent);
        expect(data["@context"]).toBe("https://schema.org");
        expect(data["@type"]).toBeDefined();
      });
    }
  });
}

test("404 page has noindex robots meta", async ({ page }) => {
  await page.goto("/this-does-not-exist");
  const robots = await page.$eval(
    'meta[name="robots"]',
    (el) => (el as HTMLMetaElement).content
  );
  expect(robots).toContain("noindex");
});

test("waitlist page has noindex robots meta (pre-launch)", async ({ page }) => {
  await page.goto("/waitlist");
  const robots = await page.$eval(
    'meta[name="robots"]',
    (el) => (el as HTMLMetaElement).content
  );
  expect(robots).toContain("noindex");
});
```

### `tests/e2e/visual.spec.ts` (missing — LOW priority)

```typescript
/**
 * Visual regression baselines.
 * Run `pnpm playwright test tests/e2e/visual.spec.ts --update-snapshots` to generate baselines.
 */
import { test, expect } from "@playwright/test";

test.use({
  viewport: { width: 1280, height: 800 },
});

const PAGES = [
  { path: "/", name: "home" },
  { path: "/features", name: "features" },
  { path: "/blog", name: "blog" },
  { path: "/waitlist", name: "waitlist" },
  { path: "/about", name: "about" },
  { path: "/this-page-does-not-exist", name: "not-found" },
];

for (const { path, name } of PAGES) {
  test(`visual regression — ${name} (desktop 1280px)`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot(`${name}-desktop.png`, {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
      mask: [page.locator(".noise-overlay")],
    });
  });
}

test("visual regression — home (mobile 390px)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("home-mobile.png", {
    maxDiffPixelRatio: 0.02,
    animations: "disabled",
  });
});

test("visual regression — mobile drawer open", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Navigation menu" })).toBeVisible();
  await expect(page).toHaveScreenshot("mobile-drawer-open.png", {
    maxDiffPixelRatio: 0.01,
    animations: "disabled",
  });
});

test("visual regression — waitlist success state", async ({ page }) => {
  await page.goto("/waitlist");
  await page.getByRole("button", { name: "Patient" }).click();
  await page.getByPlaceholder("First name").fill("Test");
  await page.getByPlaceholder("Last name").fill("User");
  await page.getByPlaceholder("Email address").fill("test@example.com");
  await page.getByRole("button", { name: "Join the Waitlist" }).click();
  await expect(page.getByText("You're on the list!", { exact: false })).toBeVisible();
  await expect(page).toHaveScreenshot("waitlist-success.png", {
    maxDiffPixelRatio: 0.01,
    animations: "disabled",
  });
});
```

---

## 16. All Defects Summary

| ID | Severity | Category | Status | Description | File:Line |
|---|---|---|---|---|---|
| CRIT-001 | Critical | Test Bug | **OPEN** | Scroll lock tests check `document.body` but source sets `document.documentElement` | `Navbar.tsx:43`, `Navbar.test.tsx:142`, `mobile-menu.spec.ts:166` |
| DEF-001 | High | Test Bug | **OPEN (test stale)** | Blog newsletter E2E test asserts broken state; source now has working handler | `blog.spec.ts:199-222`, `Blog.tsx:96-106` |
| DEF-002 | High | Feature | **OPEN** | All forms succeed with no API call; no error state UI | `Waitlist.tsx:40`, `Contact.tsx:39` |
| DEF-003 | Medium | Security | **OPEN** | No `maxLength` on any text input | All form inputs |
| DEF-004 | Medium | Validation | **Open (partial)** | Email regex passes `a@b`, `user@@domain.com` | `Waitlist.tsx:28`, `Contact.tsx:28` |
| NEW-001 | Medium | Test Gap | **OPEN** | External link scan omits `/contact`, `/waitlist`, `/terms`, `/privacy` | `external-links.spec.ts:126` |
| NEW-002 | Medium | CI/CD | **OPEN** | No GitHub Actions workflow; no automated test execution on push/PR | `.github/` absent |
| NEW-003 | Medium | Test Gap | **OPEN** | No axe-core automated a11y scanning in any test | All test files |
| NEW-004 | Low | Test Gap | **OPEN** | No visual regression tests | All test files |
| NEW-005 | Low | Test Gap | **OPEN** | No SEO meta/structured-data assertions in tests | All test files |
| NEW-006 | Low | CSS | **OPEN** | `100dvh` / `100svh` used without `100vh` fallback for Safari <15.4 | `Navbar.tsx:181`, all page wrappers |
| NEW-007 | Low | Config | **OPEN** | Dual playwright config creates confusion; mobile projects only in `tests/playwright.config.ts` | Both config files |
| NEW-008 | Low | Test Gap | **OPEN** | No E2E test for Contact form | `tests/e2e/` |
| DEF-009 | Low | Architecture | Open (acceptable) | Single top-level ErrorBoundary — per-route isolation not implemented | `App.tsx:108` |
| CSS-001 | — | CSS | **Resolved** | `oklch` fallback hex added | `index.css:126` |
| CSS-002 | — | CSS | **Resolved** | `scroll-behavior` wrapped in `prefers-reduced-motion` | `index.css:175-177` |
| DEF-013 | — | Code | **Resolved** | Stale `HeroGlow` import removed from `NotFound.tsx` | — |
| DEF-015 | — | Test Quality | **Resolved** | `waitForTimeout(300)` replaced with condition-based wait | `links.spec.ts` |

---

## 17. Score Breakdown

| Dimension | Score | Rationale |
|---|---|---|
| Internal links | 10 / 10 | All 13 routes registered; all hrefs in Nav/Footer/pages map to registered routes; blog slugs consistent |
| 404 handling | 9 / 10 | Catch-all + explicit route; blog-slug delegation correct; noindex set; tested in 404.spec.ts |
| ErrorBoundary | 8 / 10 | getDerivedStateFromError, componentDidCatch, retry, stack hidden in prod; no Sentry yet |
| Form validation | 6 / 10 | JS validation layer + inline errors on all forms; no API backend; no maxLength; newsletter stale test |
| Cross-browser CSS | 8 / 10 | oklch hex fallback fixed; scroll-behavior guarded; dvh/svh missing fallback; WebKit backdrop-filter OK |
| E2E test coverage | 7 / 10 | 7 spec files; CRIT-001 scroll lock bug; DEF-001 stale test; no Contact spec; no a11y/visual/SEO specs |
| Unit test coverage | 8 / 10 | 8 files covering all critical components; CRIT-001 in Navbar.test.tsx; good fixture infrastructure |
| CI/CD integration | 2 / 10 | No .github/workflows; no automated test execution; all test runs are manual only |
| Accessibility testing | 3 / 10 | aria-* assertions in unit/E2E; no axe-core; no keyboard nav test; no colour contrast test |
| Visual regression | 0 / 10 | Not implemented |
| SEO testing | 0 / 10 | Not implemented |
| **Weighted Overall** | **8.2 / 10** | Strong foundation with 15 test files and good coverage; CI absence and CRIT-001 prevent higher score |

---

## 18. Priority Fix List

Ordered by business impact:

1. **[CRITICAL] CRIT-001** — Fix scroll lock test assertions in both `Navbar.test.tsx` and `mobile-menu.spec.ts` to check `document.documentElement.style.overflow` not `document.body.style.overflow`.

2. **[HIGH] DEF-001** — Update `blog.spec.ts` newsletter test to assert the success state ("Subscribed!" button text, or "Subscribed successfully. Thank you!" status message) instead of the broken state.

3. **[HIGH] NEW-002** — Add `.github/workflows/tests.yml` using the GitHub Actions workflow from section 12. This is a blocking pre-launch item.

4. **[HIGH] NEW-008** — Add `tests/e2e/contact.spec.ts` using the code from section 15.

5. **[MEDIUM] DEF-002** — Wire forms to a real API endpoint. Activate commented-out network mock tests in `waitlist.spec.ts`. Add error state UI.

6. **[MEDIUM] DEF-003** — Add `maxLength` to all text inputs: `100` for names, `254` for email (RFC 5321), `200` for clinic name, `2000` for message. Update `waitlist.spec.ts` long input test assertion.

7. **[MEDIUM] NEW-001** — Add `/contact`, `/waitlist`, `/terms`, `/privacy` to `PAGES_TO_SCAN` in `external-links.spec.ts`.

8. **[MEDIUM] NEW-003** — Install `@axe-core/playwright` and add `tests/e2e/a11y.spec.ts` using the code from section 15.

9. **[LOW] NEW-007** — Consolidate to a single `playwright.config.ts` at the project root with all 5 browser projects. Delete `tests/playwright.config.ts`.

10. **[LOW] NEW-004** — Add `tests/e2e/visual.spec.ts` after step 9 is complete and a stable baseline can be captured.

11. **[LOW] NEW-005** — Add `tests/e2e/seo.spec.ts` using the code from section 15.

12. **[LOW] NEW-006** — Add `100vh` fallbacks before `100dvh`/`100svh` in `Navbar.tsx` and page wrapper divs (use CSS classes, not duplicate inline style keys).

---

## 19. Run Commands Reference

```bash
# Unit tests (all)
pnpm test:unit

# Unit tests with coverage report
pnpm test:unit:coverage

# E2E tests — 3 desktop browsers (root config)
pnpm test:e2e

# E2E tests — 5 browsers including mobile
playwright test --config tests/playwright.config.ts

# E2E tests — specific file
playwright test tests/e2e/navigation.spec.ts

# E2E tests in headed mode (debugging)
pnpm test:e2e:headed

# View HTML report
pnpm test:e2e:report

# Run both suites
pnpm test
```
