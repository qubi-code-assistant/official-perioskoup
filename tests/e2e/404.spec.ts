/**
 * 404 Handling — tests for the NotFound page
 *
 * Covers:
 *  - Unknown routes render the 404 page
 *  - The /404 explicit route renders the 404 page
 *  - 404 page shows correct content (numeral, heading, back link)
 *  - Back to Home link works correctly
 *  - 404 page does not render a broken layout
 *  - Deep unknown paths are caught
 *  - Navbar and Footer are present on the 404 page
 */
import { test, expect } from "@playwright/test";

const UNKNOWN_ROUTES = [
  "/this-page-does-not-exist",
  "/foo/bar/baz",
  "/about/team/member",
  "/blog/nonexistent-article-slug-xyz",
  "/pricing/enterprise",
  "/admin",
  "/dashboard",
];

test.describe("404 page — unknown routes", () => {
  for (const route of UNKNOWN_ROUTES) {
    test(`${route} renders the 404 page`, async ({ page }) => {
      await page.goto(route);

      // Main 404 indicators
      await expect(page.getByText("404", { exact: false })).toBeVisible();
      await expect(page.getByText("Page not found.", { exact: false })).toBeVisible();

      // Blog slug special case: BlogPost has its own "Article not found" state
      // Other unknown routes hit the Wouter catch-all and show the global 404
    });
  }
});

test.describe("404 page — explicit /404 route", () => {
  test("/404 renders the NotFound page", async ({ page }) => {
    await page.goto("/404");

    await expect(page.getByText("404", { exact: false })).toBeVisible();
    await expect(page.getByText("Page not found.", { exact: false })).toBeVisible();
  });
});

test.describe("404 page — content verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByText("Page not found.", { exact: false })).toBeVisible();
  });

  test("renders the large '404' numeral", async ({ page }) => {
    await expect(page.getByText("404")).toBeVisible();
  });

  test("renders the 'Page not found.' heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Page not found." })
    ).toBeVisible();
  });

  test("renders the explanatory paragraph", async ({ page }) => {
    await expect(
      page.getByText("Sorry, the page you're looking for doesn't exist.", { exact: false })
    ).toBeVisible();
  });

  test("renders the 'Back to Home' CTA button", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Back to Home" })
    ).toBeVisible();
  });

  test("Back to Home link navigates to /", async ({ page }) => {
    await page.getByRole("link", { name: "Back to Home" }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByText("Between visits,", { exact: false })).toBeVisible();
  });
});

test.describe("404 page — layout integrity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/nonexistent-route-xyz");
    await expect(page.getByText("Page not found.", { exact: false })).toBeVisible();
  });

  test("Navbar is present on the 404 page", async ({ page }) => {
    // The nav element is rendered by Navbar component
    await expect(page.locator("nav")).toBeVisible();
  });

  test("Footer is present on the 404 page", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });

  test("404 page has no broken images or missing content blocks", async ({ page }) => {
    // Check for any images that failed to load
    const brokenImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("img"));
      return images.filter((img) => !img.complete || img.naturalWidth === 0).length;
    });
    // Allow 0 broken images
    expect(brokenImages).toBe(0);
  });
});

test.describe("404 page — does not show content from other pages", () => {
  test("404 page does not show home page hero content", async ({ page }) => {
    await page.goto("/nonexistent-xyz");

    await expect(page.getByText("Between visits,", { exact: false })).not.toBeVisible();
    await expect(page.getByText("Features", { exact: false }).first()).not.toBeVisible();
  });
});

test.describe("404 — blog slug passes through to BlogPost (not global 404)", () => {
  test("/blog/invalid-slug shows BlogPost's article-not-found UI, not global 404", async ({ page }) => {
    await page.goto("/blog/xyz-invalid-blog-slug");

    // BlogPost renders its own "Article not found" state before wouter catches it
    // because /blog/:slug is a registered route
    await expect(page.getByText("Article not found", { exact: false })).toBeVisible();

    // The global 404 heading is different
    await expect(
      page.getByText("Sorry, the page you're looking for doesn't exist.", { exact: false })
    ).not.toBeVisible();
  });
});
