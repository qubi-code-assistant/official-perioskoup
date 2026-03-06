# PageSpeed Fix Task

## Current Scores
- Performance: 62 | Accessibility: 96 | Best Practices: 58 | SEO: 100
- FCP: 2.8s | LCP: 9.7s | TBT: 370ms | CLS: 0 | Speed Index: 2.8s

## Target: Performance 90+, Best Practices 90+, Accessibility 100

## Issues to Fix (in priority order)

### 1. CRITICAL: Remaining CloudFront CDN image references still loading
Download ALL remaining CDN assets to `client/public/images/` and replace every CloudFront URL:
- `features-bg-v2.webp` → download from `https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/features-bg-v2-5ETotP3adykJihiSPWkmmf.webp`
- `cta-bg-v2.webp` → download from `https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/cta-bg-v2-M8rfLwmvVHFL7TkFfUUwrU.webp`
- `app_start.png` → download from `https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/app_start_92056ad9.png`
- `howitworks-rings-bg.webp` → download from `https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/howitworks-rings-bg-37ba3jS33MFasF6UgDif2G.webp`
- `og-image.png` → download from `https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/og-image-XvtYEDVZMACucdvxk9BYR8.png`
- `Logomark-dark.png` → download (for schema) from `https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/Logomark-dark_9f94fde1.png`

Replace ALL source code refs. For OG meta tags, use absolute URL `https://perioskoup.com/images/og-image.png`.
Update schema JSON-LD in `client/index.html`: logo → `https://perioskoup.com/images/logo.svg`, anca image → `https://perioskoup.com/images/anca-headshot.jpg`

After: ZERO cloudfront.net references anywhere.

### 2. Self-host Google Fonts (eliminates render-blocking + critical chain)
- Download woff2 files for Dongle 700 and Gabarito 400+700
- Add @font-face declarations in `client/src/index.css` with `font-display: swap`
- Remove Google Fonts `<link>` tags from `client/index.html`
- Remove preconnect hints for fonts.googleapis.com and fonts.gstatic.com
- Preload the woff2 files in index.html with `<link rel="preload" as="font" type="font/woff2" crossorigin>`

### 3. Remove CloudFront preconnect
Remove `<link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net">` from index.html

### 4. Image optimization
- Convert `petrica.jpg` to WebP (currently 88KB, was shown as 758KB from CDN PNG)
- Resize `efp-award.webp` to max 800px wide (currently 1.4MB)
- Add explicit `width` and `height` to all `<img>` tags
- Use `sips` for resize, `sips -s format jpeg -s formatOptions 75` for compression

### 5. infird.com third-party (640 KiB)
- Search entire codebase for "infird" — if found, evaluate and remove/defer
- If it's injected by a script, find and remove

### 6. Best Practices (58 → 90+)
- Check for deprecated APIs, console errors
- Ensure all images have correct aspect ratios set
- Review any mixed content or security issues

### 7. Accessibility (96 → 100)
- Verify aria-label on navbar logo link exists
- Check for any other accessibility issues

## Build & Verify
1. `npx vite build` — must succeed
2. `grep -rn "cloudfront" client/src/ client/index.html` — must return NOTHING
3. Commit: `perf: pagespeed optimization — local assets, self-hosted fonts, image compression`
4. Push: `git push origin HEAD:master`
