import { test, expect } from '@playwright/test'

const PAGES = ['/', '/features', '/for-dentists', '/pricing', '/about', '/blog', '/contact', '/waitlist', '/privacy', '/terms']

const VIEWPORTS = [
  { width: 375, height: 812, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1440, height: 900, name: 'desktop' },
]

for (const viewport of VIEWPORTS) {
  for (const path of PAGES) {
    test(`no horizontal overflow on ${path} @ ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto(path, { waitUntil: 'networkidle' })

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth
      })

      expect(hasOverflow).toBe(false)
    })
  }
}
