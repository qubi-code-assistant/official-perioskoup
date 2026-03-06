/**
 * Mobile Menu Toggle — E2E tests
 *
 * Verifies that the mobile hamburger menu:
 *  - Is hidden on desktop viewports
 *  - Is visible on mobile viewports
 *  - Opens and closes on button click
 *  - Closes on navigation (wouter location change)
 *  - Traps body scroll when open
 *  - Shows all expected nav links
 *  - Shows the Join Waitlist CTA button
 */
import { test, expect } from "@playwright/test";

const MOBILE_VIEWPORT = { width: 390, height: 844 };
const DESKTOP_VIEWPORT = { width: 1280, height: 800 };

test.describe("Mobile menu — visibility", () => {
  test("hamburger button is hidden at desktop width", async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).not.toBeVisible();
  });

  test("hamburger button is visible at mobile width", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible();
  });

  test("desktop nav links are hidden at mobile width", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");

    // The .hide-mobile class hides desktop nav at mobile breakpoint
    // We verify the nav links in the desktop bar are not visible
    // (they exist in DOM due to conditional rendering via CSS, not React)
    const desktopNav = page.locator(".hide-mobile").first();
    await expect(desktopNav).not.toBeVisible();
  });
});

test.describe("Mobile menu — open/close toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");
  });

  test("clicking hamburger opens the mobile drawer", async ({ page }) => {
    const menuButton = page.getByRole("button", { name: "Open menu" });

    // Drawer dialog should not be present before opening
    const drawerBefore = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(drawerBefore).not.toBeVisible();

    await menuButton.click();

    // The drawer dialog should now be visible
    const drawer = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(drawer).toBeVisible();

    // All nav links visible inside the drawer
    await expect(drawer.getByRole("link", { name: "Features" })).toBeVisible();
    await expect(drawer.getByRole("link", { name: "For Dentists" })).toBeVisible();
    await expect(drawer.getByRole("link", { name: "About" })).toBeVisible();
    await expect(drawer.getByRole("link", { name: "Blog" })).toBeVisible();
  });

  test("clicking hamburger again closes the mobile drawer", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open menu" });
    await openButton.click();

    const drawer = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(drawer).toBeVisible();

    // After opening the button label changes to "Close menu"
    const closeButton = page.getByRole("button", { name: "Close menu" });
    await closeButton.click();

    // Drawer should be gone from DOM (conditional rendering, not just hidden)
    await expect(drawer).not.toBeVisible();
  });

  test("button aria-label changes between Open and Close when toggled", async ({ page }) => {
    const openButton = page.getByRole("button", { name: "Open menu" });
    await expect(openButton).toBeVisible();

    await openButton.click();
    // Now label should be "Close menu"
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    // Back to "Open menu"
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("mobile menu shows all 4 nav links", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();

    const drawer = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(drawer).toBeVisible();

    // All 4 nav items should appear in the drawer
    const links = ["Features", "For Dentists", "About", "Blog"];
    for (const label of links) {
      await expect(drawer.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("mobile menu shows Join the Waitlist CTA button", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();

    const drawer = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(drawer.getByRole("link", { name: /Join.*Waitlist/i })).toBeVisible();
  });
});

test.describe("Mobile menu — closes on navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");
  });

  test("menu closes automatically after navigating to a page", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();

    const drawer = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(drawer).toBeVisible();

    // Click the About link inside the drawer
    await drawer.getByRole("link", { name: "About" }).click();

    await expect(page).toHaveURL("/about");

    // Drawer should be closed (menuOpen resets on location change via useEffect)
    await expect(page.getByText("Born in a dental chair.", { exact: false }).first()).toBeVisible();

    // Hamburger should show "Open menu" label again (menu is closed)
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    // Drawer dialog should not be present
    await expect(page.getByRole("dialog", { name: "Navigation menu" })).not.toBeVisible();
  });

  test("clicking Join the Waitlist CTA in mobile menu navigates to /waitlist", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();

    const drawer = page.getByRole("dialog", { name: "Navigation menu" });
    await drawer.getByRole("link", { name: /Join.*Waitlist/i }).click();

    await expect(page).toHaveURL("/waitlist");
    await expect(page.getByText("founding waitlist", { exact: false }).first()).toBeVisible();
  });
});

test.describe("Mobile menu — body scroll lock", () => {
  test("body overflow is hidden when mobile menu is open", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();

    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("hidden");
  });

  test("body overflow is restored when mobile menu is closed", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("button", { name: "Close menu" }).click();

    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("");
  });
});
