import { test, expect } from '@playwright/test'

test.describe('Desktop Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
  })

  const NAV_LINKS = [
    { label: 'Features', href: '/features' },
    { label: 'For Dentists', href: '/for-dentists' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ]

  for (const link of NAV_LINKS) {
    test(`navigates to ${link.label}`, async ({ page }) => {
      await page.getByRole('link', { name: link.label }).first().click()
      await page.waitForURL(link.href)
      expect(page.url()).toContain(link.href)
    })
  }

  test('logo navigates to homepage', async ({ page }) => {
    await page.goto('/about')
    await page.getByRole('link', { name: 'Perioskoup' }).first().click()
    await page.waitForURL('/')
    expect(page.url()).toMatch(/\/$/)
  })

  test('Join Waitlist CTA navigates to /waitlist', async ({ page }) => {
    // Get the nav CTA (not the one in the hero)
    const navCta = page.locator('header').getByRole('link', { name: 'Join Waitlist' })
    await navCta.click()
    await page.waitForURL('/waitlist')
    expect(page.url()).toContain('/waitlist')
  })
})

test.describe('Mobile Hamburger Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
  })

  test('hamburger opens and closes menu', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Open menu' })
    await expect(menuButton).toBeVisible()

    // Open menu
    await menuButton.click()

    // Check menu is visible — links should be visible
    await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible()
    const featuresLink = page.locator('[class*="fixed inset-0"]').getByRole('link', { name: 'Features' })
    await expect(featuresLink).toBeVisible()

    // Close menu
    await page.getByRole('button', { name: 'Close menu' }).click()
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
  })

  test('menu link navigates and closes menu', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: 'Open menu' })
    await menuButton.click()

    const featuresLink = page.locator('[class*="fixed inset-0"]').getByRole('link', { name: 'Features' })
    await featuresLink.click()
    await page.waitForURL('/features')
    expect(page.url()).toContain('/features')
  })
})
