import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/features', name: 'Features' },
  { path: '/for-dentists', name: 'For Dentists' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/about', name: 'About' },
  { path: '/blog', name: 'Blog' },
  { path: '/contact', name: 'Contact' },
  { path: '/waitlist', name: 'Waitlist' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/terms', name: 'Terms' },
]

for (const { path, name } of PAGES) {
  test(`${name} page passes axe-core accessibility checks`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path, { waitUntil: 'networkidle' })
    // Wait for any GSAP animations to fully complete
    await page.waitForTimeout(2500)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })
}
