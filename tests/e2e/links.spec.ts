/**
 * Internal Links — no broken hrefs across all pages
 *
 * For every page in the app, this suite collects all anchor tags whose href
 * starts with "/" (internal SPA links), navigates to each one, and asserts
 * that the resulting page does NOT render the global 404 screen.
 *
 * This guards against:
 *  - Typos in href values (e.g., "/featuress")
 *  - Routes that were removed from App.tsx but still referenced in JSX
 *  - Blog slugs that exist in Blog.tsx POSTS but not in BlogPost.tsx ARTICLES
 *
 * External links (http/https) are covered by external-links.spec.ts.
 *
 * Note: /blog/:slug routes with a valid slug in Blog.tsx but missing ARTICLES
 * entry in BlogPost.tsx show an inline "Article not found" UI (not the global
 * 404 page). The check below explicitly handles this case.
 */
import { test, expect } from "@playwright/test";

const ALL_PAGES = [
  "/",
  "/features",
  "/for-dentists",
  "/pricing",
  "/about",
  "/blog",
  "/contact",
  "/waitlist",
  "/privacy",
  "/terms",
];

// Known blog slugs defined in Blog.tsx POSTS array
const BLOG_SLUGS = [
  "what-is-periodontal-disease",
  "efp-digital-innovation-award-2025",
  "how-ai-is-changing-dental-monitoring",
  "3-minute-routine-save-teeth",
  "why-patients-forget-instructions",
  "building-the-bridge-perioskoup-story",
];

test.describe("Internal links — no broken routes on any page", () => {
  for (const pagePath of ALL_PAGES) {
    test(`${pagePath} — all internal links resolve without 404`, async ({ page }) => {
      await page.goto(pagePath);

      // Collect all internal href values from anchor tags on this page
      const internalHrefs = await page.$$eval("a[href]", (anchors) =>
        anchors
          .map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? "")
          .filter(
            (href) =>
              href.startsWith("/") &&
              !href.startsWith("//") && // protocol-relative = external
              href !== "#" &&
              !href.startsWith("#")
          )
          // Deduplicate
          .filter((href, index, arr) => arr.indexOf(href) === index)
      );

      // Every internal link should resolve to a non-404 page
      for (const href of internalHrefs) {
        await page.goto(href);

        // Global 404 indicator — heading rendered by NotFound.tsx
        const notFoundHeading = page.getByText("Page not found.", { exact: false });
        const isNotFound = await notFoundHeading.isVisible().catch(() => false);

        if (isNotFound) {
          // This is a real broken link — fail with a clear message
          throw new Error(
            `Broken internal link on "${pagePath}": href="${href}" renders the 404 page`
          );
        }

        // For /blog/:slug routes, also assert no inline "Article not found"
        if (href.startsWith("/blog/")) {
          const slug = href.replace("/blog/", "");
          if (!BLOG_SLUGS.includes(slug)) {
            // The route is served by BlogPost but the slug is not in ARTICLES
            const articleNotFound = page
              .getByText("Article not found", { exact: false })
              .isVisible()
              .catch(() => false);
            expect(
              await articleNotFound,
              `Blog slug "${slug}" linked from "${pagePath}" is not in BlogPost ARTICLES`
            ).toBe(false);
          }
        }

        // Navigate back so subsequent hrefs are collected from a clean state
        await page.goto(pagePath);
      }
    });
  }
});

test.describe("Internal links — known good routes all return content", () => {
  const ROUTE_CONTENT_MAP: Record<string, string> = {
    "/": "Between visits,",
    "/features": "Built for the full",
    "/for-dentists": "Your patients,",
    "/pricing": "Simple, transparent",
    "/about": "Born in a dental chair.",
    "/blog": "Insights on dental health,",
    "/contact": "Let's talk",
    "/waitlist": "founding waitlist",
    "/privacy": "Privacy Policy",
    "/terms": "Terms of Service",
  };

  for (const [route, expectedText] of Object.entries(ROUTE_CONTENT_MAP)) {
    test(`${route} renders expected content`, async ({ page }) => {
      await page.goto(route);
      // Use .first() to avoid strict mode violations when screen-reader status
      // divs also contain the expected text substring
      await expect(page.getByText(expectedText, { exact: false }).first()).toBeVisible();
      await expect(page.getByText("Page not found.", { exact: false })).not.toBeVisible();
    });
  }

  for (const slug of BLOG_SLUGS) {
    test(`/blog/${slug} renders article content`, async ({ page }) => {
      await page.goto(`/blog/${slug}`);
      await expect(page.getByText("Page not found.", { exact: false })).not.toBeVisible();
      await expect(page.getByText("Article not found", { exact: false })).not.toBeVisible();
    });
  }
});

test.describe("Internal links — Footer links all resolve", () => {
  test("Footer renders all expected internal links without 404", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer to ensure it is rendered
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    const footerHrefs = await page.locator("footer a[href]").evaluateAll((anchors) =>
      anchors
        .map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? "")
        .filter((href) => href.startsWith("/"))
        .filter((href, i, arr) => arr.indexOf(href) === i)
    );

    for (const href of footerHrefs) {
      await page.goto(href);
      await expect(
        page.getByText("Page not found.", { exact: false }),
        `Footer link "${href}" renders 404`
      ).not.toBeVisible();
    }
  });
});
