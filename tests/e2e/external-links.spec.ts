/**
 * External Links — target, rel, and href verification
 *
 * Covers:
 *  - All external links have target="_blank"
 *  - All target="_blank" links have rel="noopener noreferrer"
 *  - EFP Award links point to the correct URL
 *  - No external links open in the same tab
 *
 * External links found in the codebase:
 *  1. Home hero EFP badge → efp.org
 *  2. Home EFP Award card "Read announcement" → efp.org
 *  3. Footer EFP Award badge → efp.org
 *  4. About EFP Award card "Read announcement" → efp.org
 *
 * Internal note: no social media links exist in the current codebase.
 */
import { test, expect } from "@playwright/test";

const EFP_URL =
  "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/";

test.describe("External links — target and rel attributes", () => {
  test("all external links on Home page have target=_blank and rel=noopener noreferrer", async ({ page }) => {
    await page.goto("/");

    const externalLinks = await page.$$eval("a[href^='http']", (links) =>
      links.map((link) => ({
        href: (link as HTMLAnchorElement).href,
        target: (link as HTMLAnchorElement).target,
        rel: (link as HTMLAnchorElement).rel,
        text: (link as HTMLElement).innerText.trim().substring(0, 50),
      }))
    );

    for (const link of externalLinks) {
      expect(link.target).toBe("_blank");
      expect(link.rel).toContain("noopener");
      expect(link.rel).toContain("noreferrer");
    }
  });

  test("all external links on About page have target=_blank and rel=noopener noreferrer", async ({ page }) => {
    await page.goto("/about");

    const externalLinks = await page.$$eval("a[href^='http']", (links) =>
      links.map((link) => ({
        href: (link as HTMLAnchorElement).href,
        target: (link as HTMLAnchorElement).target,
        rel: (link as HTMLAnchorElement).rel,
      }))
    );

    for (const link of externalLinks) {
      expect(link.target).toBe("_blank");
      expect(link.rel).toContain("noopener");
      expect(link.rel).toContain("noreferrer");
    }
  });
});

test.describe("External links — correct URLs", () => {
  test("Home page EFP hero badge points to correct EFP URL", async ({ page }) => {
    await page.goto("/");

    const efpBadgeLink = page.locator(`a[href="${EFP_URL}"]`).first();
    await expect(efpBadgeLink).toBeVisible();
    await expect(efpBadgeLink).toHaveAttribute("target", "_blank");
  });

  test("Home page EFP Award card announcement link points to correct EFP URL", async ({ page }) => {
    await page.goto("/");

    const announcementLink = page.getByRole("link", {
      name: /Read the EFP announcement/i,
    });
    await expect(announcementLink).toBeVisible();
    await expect(announcementLink).toHaveAttribute("href", EFP_URL);
    await expect(announcementLink).toHaveAttribute("target", "_blank");
  });

  test("About page EFP announcement link points to correct EFP URL", async ({ page }) => {
    await page.goto("/about");

    const announcementLink = page.getByRole("link", {
      name: /Read the EFP announcement/i,
    });
    await expect(announcementLink).toBeVisible();
    await expect(announcementLink).toHaveAttribute("href", EFP_URL);
    await expect(announcementLink).toHaveAttribute("target", "_blank");
  });

  test("Footer EFP Award badge points to correct EFP URL", async ({ page }) => {
    await page.goto("/");

    const footerEfpLink = page.locator("footer").getByRole("link", {
      name: /EFP Award 2025/i,
    });
    await expect(footerEfpLink).toBeVisible();
    await expect(footerEfpLink).toHaveAttribute("href", EFP_URL);
    await expect(footerEfpLink).toHaveAttribute("target", "_blank");
    await expect(footerEfpLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});

test.describe("External links — do not navigate in same tab", () => {
  test("EFP link on Home page opens in a new tab, not current tab", async ({ page, context }) => {
    await page.goto("/");

    // Listen for new page/tab opening
    const newPagePromise = context.waitForEvent("page");

    await page.getByRole("link", { name: /Read the EFP announcement/i }).click();

    const newPage = await newPagePromise;
    await expect(newPage).toBeDefined();

    // Current page should still be on /
    await expect(page).toHaveURL("/");

    await newPage.close();
  });
});

test.describe("External links — scan all pages for missing security attributes", () => {
  const PAGES_TO_SCAN = ["/", "/about", "/features", "/for-dentists", "/blog", "/pricing"];

  for (const pagePath of PAGES_TO_SCAN) {
    test(`${pagePath} — no external links missing rel="noopener noreferrer"`, async ({ page }) => {
      await page.goto(pagePath);

      const violations = await page.$$eval("a[href^='http'][target='_blank']", (links) =>
        links
          .filter((link) => {
            const rel = (link as HTMLAnchorElement).rel;
            return !rel.includes("noopener") || !rel.includes("noreferrer");
          })
          .map((link) => ({
            href: (link as HTMLAnchorElement).href,
            rel: (link as HTMLAnchorElement).rel,
            text: (link as HTMLElement).innerText.trim().substring(0, 60),
          }))
      );

      expect(violations).toEqual([]);
    });
  }
});
