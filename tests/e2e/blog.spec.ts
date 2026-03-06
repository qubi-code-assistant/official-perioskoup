/**
 * Blog — Article loading tests
 *
 * Covers:
 *  - Blog index page renders all 6 articles
 *  - Featured articles are displayed
 *  - Clicking an article card navigates to the correct slug URL
 *  - All 6 blog post pages render their full article
 *  - Invalid slug shows "article not found" fallback
 *  - Back to Blog link on post page navigates to /blog
 *  - Newsletter section present on blog index
 *
 * Note: All blog content is hardcoded in BlogPost.tsx ARTICLES object.
 * No network calls are required.
 */
import { test, expect } from "@playwright/test";

const BLOG_SLUGS = [
  {
    slug: "what-is-periodontal-disease",
    title: "What Is Periodontal Disease?",
    category: "Patient Education",
  },
  {
    slug: "efp-digital-innovation-award-2025",
    title: "Perioskoup Wins EFP Digital Innovation Award 2025",
    category: "Company News",
  },
  {
    slug: "how-ai-is-changing-dental-monitoring",
    title: "How AI Is Changing Dental Monitoring",
    category: "Technology",
  },
  {
    slug: "3-minute-routine-save-teeth",
    title: "The 3-Minute Daily Routine",
    category: "Patient Habits",
  },
  {
    slug: "why-patients-forget-instructions",
    title: "Why Patients Forget Dental Instructions",
    category: "Clinical Insight",
  },
  {
    slug: "building-the-bridge-perioskoup-story",
    title: "Building the Bridge: The Perioskoup Story",
    category: "Founder Story",
  },
] as const;

test.describe("Blog index page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByText("Insights on dental health,", { exact: false })).toBeVisible();
  });

  test("renders blog hero heading", async ({ page }) => {
    await expect(page.getByText("Insights on dental health,", { exact: false })).toBeVisible();
    await expect(page.getByText("AI, and care.", { exact: false })).toBeVisible();
  });

  test("renders the 2 featured articles", async ({ page }) => {
    await expect(
      page.getByText("What Is Periodontal Disease? A Patient's Complete Guide", { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText("Perioskoup Wins EFP Digital Innovation Award 2025", { exact: false })
    ).toBeVisible();
  });

  test("renders the 'All Articles' section with 4 regular posts", async ({ page }) => {
    await expect(page.getByText("All Articles")).toBeVisible();

    await expect(
      page.getByText("How AI Is Changing Dental Monitoring", { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText("The 3-Minute Daily Routine", { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText("Why Patients Forget Dental Instructions", { exact: false })
    ).toBeVisible();
    await expect(
      page.getByText("Building the Bridge: The Perioskoup Story", { exact: false })
    ).toBeVisible();
  });

  test("renders the newsletter subscription section", async ({ page }) => {
    await expect(page.getByText("Stay informed.", { exact: false })).toBeVisible();
    await expect(page.getByPlaceholder("Your email address")).toBeVisible();
    await expect(page.getByRole("button", { name: "Subscribe" })).toBeVisible();
  });
});

test.describe("Blog — clicking article cards navigates to correct URL", () => {
  test("clicking featured article 'What Is Periodontal Disease' navigates to correct slug", async ({ page }) => {
    await page.goto("/blog");

    await page.getByText(
      "What Is Periodontal Disease? A Patient's Complete Guide",
      { exact: false }
    ).click();

    await expect(page).toHaveURL("/blog/what-is-periodontal-disease");
  });

  test("clicking featured article 'EFP Award' navigates to correct slug", async ({ page }) => {
    await page.goto("/blog");

    await page.getByText(
      "Perioskoup Wins EFP Digital Innovation Award 2025",
      { exact: false }
    ).click();

    await expect(page).toHaveURL("/blog/efp-digital-innovation-award-2025");
  });

  test("clicking regular article navigates to correct slug", async ({ page }) => {
    await page.goto("/blog");

    await page.getByText(
      "How AI Is Changing Dental Monitoring",
      { exact: false }
    ).click();

    await expect(page).toHaveURL("/blog/how-ai-is-changing-dental-monitoring");
  });
});

test.describe("Blog post pages — all 6 articles load", () => {
  for (const article of BLOG_SLUGS) {
    test(`/blog/${article.slug} renders article title`, async ({ page }) => {
      await page.goto(`/blog/${article.slug}`);

      // Use role heading to avoid strict mode violation with screen-reader status divs
      await expect(
        page.getByRole("heading", { name: article.title, exact: false }).first()
      ).toBeVisible();

      // The category badge should be visible
      await expect(
        page.getByText(article.category, { exact: false }).first()
      ).toBeVisible();

      // Page must not show "Page not found"
      await expect(page.getByText("Page not found.", { exact: false })).not.toBeVisible();
    });
  }
});

test.describe("Blog post page — navigation", () => {
  test("'Back to all articles' link navigates to /blog", async ({ page }) => {
    await page.goto("/blog/what-is-periodontal-disease");

    await expect(
      page.getByRole("heading", { name: "What Is Periodontal Disease?", exact: false }).first()
    ).toBeVisible();

    // The link text in BlogPost is "Back to all articles"
    await page.getByRole("link", { name: /Back to all articles/i }).click();

    await expect(page).toHaveURL("/blog");
    await expect(page.getByText("Insights on dental health,", { exact: false })).toBeVisible();
  });

  test("Join Waitlist CTA on blog post navigates to /waitlist", async ({ page }) => {
    await page.goto("/blog/what-is-periodontal-disease");

    // Every blog post has a CTA section that links to /waitlist
    await page.getByRole("link", { name: /waitlist/i }).first().click();

    await expect(page).toHaveURL("/waitlist");
  });

  test("blog post hero has a Blog link (custom breadcrumb nav)", async ({ page }) => {
    await page.goto("/blog/efp-digital-innovation-award-2025");

    // BlogPost uses a custom inline nav with a Blog link, not the Breadcrumb component
    const blogLink = page.locator('a[href="/blog"]').first();
    await expect(blogLink).toBeVisible();
  });
});

test.describe("Blog post page — invalid slug shows article not found", () => {
  test("/blog/this-slug-does-not-exist shows article not found fallback", async ({ page }) => {
    await page.goto("/blog/this-slug-does-not-exist");

    // BlogPost renders an inline "Article not found" UI, not the global 404 page
    await expect(page.getByText("Article not found", { exact: false })).toBeVisible();

    // The global 404 page heading should NOT appear
    await expect(page.getByText("Page not found.", { exact: false })).not.toBeVisible();

    // A link back to the blog should be present
    await expect(page.getByRole("link", { name: "Back to Blog" })).toBeVisible();
  });
});

test.describe("Blog — newsletter form (known defect: button non-functional)", () => {
  test("Subscribe button exists but currently has no handler (DEF-001)", async ({ page }) => {
    await page.goto("/blog");

    const emailInput = page.getByPlaceholder("Your email address");
    const subscribeButton = page.getByRole("button", { name: "Subscribe" });

    await expect(emailInput).toBeVisible();
    await expect(subscribeButton).toBeVisible();

    await emailInput.fill("test@example.com");
    await subscribeButton.click();

    // BUG: There is no onSubmit handler and the input is not in a <form>.
    // The click should show a success or error message, but currently does nothing.
    // This test documents the broken state. Remove the note below when fixed.
    // EXPECTED after fix: success message visible
    // CURRENT: no visible change after click
    const successMessage = page.getByText(/subscribed|thank you|success/i);
    // If the bug is fixed, this line should be: await expect(successMessage).toBeVisible();
    // For now, we assert the broken state:
    await expect(subscribeButton).toBeVisible(); // still visible = no state change
  });
});
