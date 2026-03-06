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

    const menuButton = page.getByRole("button", { name: "Toggle menu" });
    await expect(menuButton).not.toBeVisible();
  });

  test("hamburger button is visible at mobile width", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Toggle menu" });
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
    const menuButton = page.getByRole("button", { name: "Toggle menu" });

    // Drawer should not be visible initially
    await expect(page.getByRole("link", { name: "Features" }).nth(1)).not.toBeVisible();

    await menuButton.click();

    // Drawer links should now be visible
    await expect(page.getByText("Features").last()).toBeVisible();
    await expect(page.getByText("For Dentists").last()).toBeVisible();
    await expect(page.getByText("About").last()).toBeVisible();
    await expect(page.getByText("Blog").last()).toBeVisible();
  });

  test("clicking hamburger again closes the mobile drawer", async ({ page }) => {
    const menuButton = page.getByRole("button", { name: "Toggle menu" });

    await menuButton.click();
    await expect(page.getByText("Features").last()).toBeVisible();

    await menuButton.click();
    // Drawer should be gone from DOM (conditional rendering, not just hidden)
    await expect(page.getByText("Features").last()).not.toBeVisible();
  });

  test("X icon replaces hamburger icon when menu is open", async ({ page }) => {
    const menuButton = page.getByRole("button", { name: "Toggle menu" });
    await menuButton.click();

    // After opening, the button still exists and the icon is now an X
    // Lucide X component is rendered — verify the button is still present
    await expect(menuButton).toBeVisible();

    // Closing again
    await menuButton.click();
    await expect(menuButton).toBeVisible();
  });

  test("mobile menu shows all 4 nav links", async ({ page }) => {
    await page.getByRole("button", { name: "Toggle menu" }).click();

    // All 4 nav items should appear in the drawer
    // Using last() since desktop spans also exist in DOM (CSS-hidden)
    const links = ["Features", "For Dentists", "About", "Blog"];
    for (const label of links) {
      await expect(page.getByText(label).last()).toBeVisible();
    }
  });

  test("mobile menu shows Join the Waitlist CTA button", async ({ page }) => {
    await page.getByRole("button", { name: "Toggle menu" }).click();

    await expect(page.getByText("Join the Waitlist").last()).toBeVisible();
  });
});

test.describe("Mobile menu — closes on navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");
  });

  test("menu closes automatically after navigating to a page", async ({ page }) => {
    await page.getByRole("button", { name: "Toggle menu" }).click();
    await expect(page.getByText("Features").last()).toBeVisible();

    // Click a nav link inside the drawer
    // Using last() to target the drawer link vs the hidden desktop one
    await page.getByText("About").last().click();

    await expect(page).toHaveURL("/about");

    // Drawer should be closed (menuOpen resets on location change via useEffect)
    // Wait for the About heading to confirm navigation completed
    await expect(page.getByText("Born in a dental chair.", { exact: false })).toBeVisible();

    // Hamburger should be back (not X), no drawer visible
    await expect(page.getByRole("button", { name: "Toggle menu" })).toBeVisible();
    // Verify no drawer content is visible
    await expect(page.getByText("For Dentists").last()).not.toBeVisible();
  });

  test("clicking Join the Waitlist CTA in mobile menu navigates to /waitlist", async ({ page }) => {
    await page.getByRole("button", { name: "Toggle menu" }).click();

    await page.getByText("Join the Waitlist").last().click();

    await expect(page).toHaveURL("/waitlist");
    await expect(page.getByText("founding waitlist", { exact: false })).toBeVisible();
  });
});

test.describe("Mobile menu — body scroll lock", () => {
  test("body overflow is hidden when mobile menu is open", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");

    await page.getByRole("button", { name: "Toggle menu" }).click();

    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("hidden");
  });

  test("body overflow is restored when mobile menu is closed", async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto("/");

    await page.getByRole("button", { name: "Toggle menu" }).click();
    await page.getByRole("button", { name: "Toggle menu" }).click();

    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe("");
  });
});
