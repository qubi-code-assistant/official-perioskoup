import { test, expect } from '@playwright/test'

test.describe('Blog Navigation', () => {
  test('blog page loads with posts', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible()

    // Should have at least one blog post link
    const postLinks = page.locator('a[href^="/blog/"]')
    await expect(postLinks.first()).toBeVisible()
  })

  test('category filters work', async ({ page }) => {
    await page.goto('/blog')

    // Click a category filter if available
    const filters = page.locator('a[href*="category="]')
    const count = await filters.count()
    if (count > 0) {
      await filters.first().click()
      await expect(page).toHaveURL(/category=/)
    }
  })

  test('clicking a blog post navigates to post page', async ({ page }) => {
    await page.goto('/blog')

    const firstPost = page.locator('a[href^="/blog/"]').first()
    const href = await firstPost.getAttribute('href')
    await firstPost.click()

    if (href) {
      await page.waitForURL(href)
      expect(page.url()).toContain('/blog/')
    }
  })

  test('"View all posts" link on homepage navigates to blog', async ({ page }) => {
    await page.goto('/')
    const viewAll = page.getByRole('link', { name: /View all posts/i })
    await viewAll.click()
    await page.waitForURL('/blog')
    expect(page.url()).toContain('/blog')
  })
})
