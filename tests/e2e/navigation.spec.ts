/**
 * Navigation — All route navigation tests
 *
 * Verifies every registered route renders its expected heading,
 * that the Navbar links work, and that wouter SPA routing does not
 * cause full-page reloads between transitions.
 */
import { test, expect } from "@playwright/test";

const ROUTES = [
  {
    path: "/",
    heading: "Between visits,",
    description: "Home page hero heading",
  },
  {
    path: "/features",
    heading: "Built for the full",
    description: "Features page hero heading",
  },
  {
    path: "/for-dentists",
    heading: "Your patients,",
    description: "For Dentists page hero heading",
  },
  {
    path: "/pricing",
    heading: "Simple, transparent",
    description: "Pricing page hero heading",
  },
  {
    path: "/about",
    heading: "Born in a dental chair.",
    description: "About page hero heading",
  },
  {
    path: "/blog",
    heading: "Insights on dental health,",
    description: "Blog page hero heading",
  },
  {
    path: "/contact",
    heading: "Let's talk",
    description: "Contact page hero heading",
  },
  {
    path: "/waitlist",
    heading: "founding waitlist",
    description: "Waitlist page hero heading",
  },
  {
    path: "/privacy",
    heading: "Privacy Policy",
    description: "Privacy Policy page heading",
  },
  {
    path: "/terms",
    heading: "Terms of Service",
    description: "Terms of Service page heading",
  },
] as const;

test.describe("Route navigation — direct URL access", () => {
  for (const route of ROUTES) {
    test(`${route.path} renders — ${route.description}`, async ({ page }) => {
      await page.goto(route.path);

      // Page must not be the 404 screen
      await expect(page.getByText("Page not found.")).not.toBeVisible();

      // Expected heading text is present — use .first() to handle strict mode
      // violations when screen-reader nav announcements also contain partial matches
      await expect(page.getByText(route.heading, { exact: false }).first()).toBeVisible();
    });
  }
});

test.describe("Route navigation — Navbar link clicks", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the page to settle
    await expect(page.getByText("Between visits,", { exact: false })).toBeVisible();
  });

  test("clicking Features nav link navigates to /features", async ({ page }) => {
    // Desktop viewport — nav links are visible
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.getByRole("link", { name: "Features" }).first().click();
    await expect(page).toHaveURL("/features");
    await expect(page.getByText("Built for the full", { exact: false })).toBeVisible();
  });

  test("clicking For Dentists nav link navigates to /for-dentists", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.getByRole("link", { name: "For Dentists" }).first().click();
    await expect(page).toHaveURL("/for-dentists");
    await expect(page.getByText("Your patients,", { exact: false })).toBeVisible();
  });

  test("clicking About nav link navigates to /about", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.getByRole("link", { name: "About" }).first().click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByText("Born in a dental chair.", { exact: false })).toBeVisible();
  });

  test("clicking Blog nav link navigates to /blog", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.getByRole("link", { name: "Blog" }).first().click();
    await expect(page).toHaveURL("/blog");
    await expect(page.getByText("Insights on dental health,", { exact: false })).toBeVisible();
  });

  test("clicking Join Waitlist CTA in navbar navigates to /waitlist", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.getByRole("link", { name: "Join Waitlist" }).first().click();
    await expect(page).toHaveURL("/waitlist");
    await expect(page.getByText("founding waitlist", { exact: false }).first()).toBeVisible();
  });

  test("clicking Logo navigates back to home from any page", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Born in a dental chair.", { exact: false })).toBeVisible();

    // Click the logo (first link in the nav that goes to /)
    await page.locator("nav a[href='/']").first().click();
    await expect(page).toHaveURL("/");
    await expect(page.getByText("Between visits,", { exact: false })).toBeVisible();
  });
});

test.describe("SPA routing — no full page reload between transitions", () => {
  test("navigating between pages does not trigger a full page reload", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Count load events BEFORE navigating to establish a baseline
    let reloadCount = 0;
    page.on("load", () => { reloadCount += 1; });

    await page.goto("/");
    // Wait for the initial page to settle (this counts as load #1 via goto)
    await expect(page.getByText("Between visits,", { exact: false }).first()).toBeVisible();

    // Reset count after initial navigation so we only count extra reloads
    reloadCount = 0;

    await page.getByRole("link", { name: "Features" }).first().click();
    await expect(page).toHaveURL("/features");

    await page.getByRole("link", { name: "Blog" }).first().click();
    await expect(page).toHaveURL("/blog");

    // SPA transitions should produce ZERO additional full page loads
    expect(reloadCount).toBe(0);
  });
});

test.describe("Footer links", () => {
  test("Footer Pricing link navigates to /pricing", async ({ page }) => {
    await page.goto("/");
    // Scroll to footer
    await page.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL("/pricing");
  });

  test("Footer Privacy Policy link navigates to /privacy", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL("/privacy");
  });

  test("Footer Terms of Service link navigates to /terms", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Terms of Service" }).click();
    await expect(page).toHaveURL("/terms");
  });
});

test.describe("Breadcrumb navigation", () => {
  test("Breadcrumb Home link on Features page navigates back to /", async ({ page }) => {
    await page.goto("/features");
    await page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("Breadcrumb Home link on Blog page navigates back to /", async ({ page }) => {
    await page.goto("/blog");
    await page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
  });
});
