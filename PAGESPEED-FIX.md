# PageSpeed Performance Fix — CRITICAL

## Problem
Google PageSpeed Insights (mobile) reports NO_LCP (Largest Contentful Paint not detected).
FCP works at 2.7s. CLS is 0.001 (good). Speed Index is good. But LCP never fires.

## Root Causes (all must be fixed)

### 1. NO_LCP — The #1 blocker
The page is a Vite + React SPA. The HTML body contains a static shell inside `<div id="root">` for FCP,
but React's `createRoot()` destroys that shell and re-renders everything.

After React renders, the hero section has these problems:
- The `<h1>` has class `reveal` which starts with `opacity: 0` (CSS in client/src/index.css ~line 815).
  Elements with opacity:0 are NOT valid LCP candidates.
- The hero `<img>` tag (hero-bg.jpg, 134KB) is inside `.animated-bg-wrapper` which has `overflow: hidden`.

**Fix:**
- Remove `reveal` class from the `<h1>` and the first visible elements in the hero section (EFP badge, h1, subhead paragraph). They must render at `opacity: 1` immediately with NO animation delay.
- Alternatively, add a CSS rule: `.hero-section .reveal { opacity: 1; transform: none; }` so hero elements skip the animation.
- Ensure the hero `<img>` tag has meaningful `alt` text (not empty), `fetchPriority="high"`, and is NOT clipped by overflow:hidden. Move it outside the `.animated-bg-wrapper` if needed, or remove `overflow: hidden` from that wrapper.
- The `<img>` should use the LOCAL path `/images/hero-bg.jpg` (134KB), NOT the CloudFront URL.

### 2. Render-blocking Google Fonts
In `client/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Dongle:wght@700&family=Gabarito:wght@400;700&display=swap" rel="stylesheet" />
```
This blocks rendering. Change to:
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Dongle:wght@700&family=Gabarito:wght@400;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dongle:wght@700&family=Gabarito:wght@400;700&display=swap" /></noscript>
```

### 3. Image delivery — Est savings 1,034 KiB
- `petrica_0ca5e5b8.png` is 757KB — download it, compress to JPEG ~100KB, save to `client/public/images/petrica.jpg`, update the reference in source code.
- All below-fold `<img>` tags should have `loading="lazy"`.
- The hero image already uses `fetchPriority="high"` — keep that.

### 4. Cache headers — Est savings 1,131 KiB
Add to `vercel.json`:
```json
{
  "headers": [
    { "source": "/assets/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/images/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
  ]
}
```

### 5. Chunk splitting
In `vite.config.ts`, add manual chunk splitting to separate vendor code:
```js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'react-router-dom'],
      }
    }
  }
}
```

### 6. Unused CSS
The `.reveal` and `.reveal-scale` animations apply to ALL `.reveal` elements globally.
Consider using `will-change: auto` instead of `will-change: transform` on animated elements.

## Files to Modify
- `client/index.html` — font loading, shell HTML
- `client/src/index.css` — `.reveal` class for hero section
- `client/src/pages/Home.tsx` — hero LCP element, lazy loading below-fold images
- `vite.config.ts` — chunk splitting
- `vercel.json` — cache headers

## Validation
After ALL fixes, run: `pnpm build` and verify no errors.
Then check the built HTML in dist/public/index.html still has content inside <div id="root">.

## DO NOT
- Add new dependencies or frameworks
- Change the visual design or content
- Remove all animations — only ensure HERO section elements start visible
- Break the build
