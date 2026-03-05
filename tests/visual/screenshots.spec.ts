import { test, expect } from '@playwright/test'

const PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/features', name: 'features' },
  { path: '/for-dentists', name: 'for-dentists' },
  { path: '/pricing', name: 'pricing' },
  { path: '/about', name: 'about' },
  { path: '/blog', name: 'blog' },
  { path: '/contact', name: 'contact' },
  { path: '/waitlist', name: 'waitlist' },
  { path: '/privacy', name: 'privacy' },
  { path: '/terms', name: 'terms' },
]

const VIEWPORTS = [
  { width: 375, height: 812, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1440, height: 900, name: 'desktop' },
]

for (const viewport of VIEWPORTS) {
  for (const page of PAGES) {
    test(`${page.name} @ ${viewport.name} (${viewport.width}px)`, async ({ page: p }) => {
      await p.setViewportSize({ width: viewport.width, height: viewport.height })
      await p.goto(page.path, { waitUntil: 'networkidle' })
      // Wait for fonts and images to load
      await p.waitForTimeout(500)
      await expect(p).toHaveScreenshot(`${page.name}-${viewport.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      })
    })
  }
}
