#!/bin/bash
# ============================================================
# Perioskoup Official Website — Phase 1: Auto Scaffold
# Then prints agent prompts for phases 2-8
# ============================================================

set -e
PROJECT_DIR=~/Projects/official-perioskoup
cd "$PROJECT_DIR"

echo "🏛️ Perioskoup Official Website — Phase 1: Scaffolding"
echo "======================================================"
echo ""

# Phase 1: Auto scaffold
echo "📦 Installing Next.js 14..."
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git --yes 2>&1 || true

echo ""
echo "📦 Installing dependencies..."
npm install gsap @gsap/react framer-motion 2>&1 | tail -3
npm install next-mdx-remote gray-matter reading-time 2>&1 | tail -3
npm install react-hook-form @hookform/resolvers zod 2>&1 | tail -3
npm install next-sitemap sharp 2>&1 | tail -3
npm install -D @tailwindcss/typography playwright @playwright/test @axe-core/playwright 2>&1 | tail -3

echo ""
echo "📦 Installing Playwright browsers..."
npx playwright install chromium 2>&1 | tail -3

echo ""
echo "📦 Copying assets from existing landing page..."
mkdir -p public/app-screens
cp ~/Projects/perioskoup-landing-vercel/public/logo-brand.svg public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/logo-white.svg public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/app_image.webp public/app-screens/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/app_image-mobile.webp public/app-screens/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/award_ceremony.webp public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/award_ceremony-mobile.webp public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/favicon.ico public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/apple-touch-icon.png public/ 2>/dev/null || true

echo ""
echo "✅ Phase 1 complete!"
echo ""
echo "======================================================"
echo "Now launch agents for phases 2-8."
echo "Each phase = one coding agent in ~/Projects/official-perioskoup"
echo "======================================================"
echo ""
echo "PHASE 2 — Design System + Layout"
echo "Skills: frontend-design, awwwards-design, tailwind-v4-shadcn, nextjs-expert"
echo "Prompt: Read CLAUDE.md. Set up design tokens, Tailwind config with exact color scales, Dongle-Bold + Gabarito fonts, global layout with dark theme nav/footer, mobile hamburger, JSON-LD schema generators, /llms.txt route, robots.txt, next-sitemap config. Apple-level whitespace. Reference apple.com/iphone."
echo ""
echo "PHASE 3 — Homepage"
echo "Skills: awwwards-design, Animations, motion, auto-animate, frontend-design"
echo "Prompt: Read CLAUDE.md. Build homepage with 7 sections: hero (Dr. Anca quote + app screenshot + parallax + waitlist CTA), problem/solution comparison, 4 features with scroll reveals, social proof (EFP award + 30-clinic counter), 3-step how-it-works, blog preview, final waitlist CTA. GSAP ScrollTrigger. Respect prefers-reduced-motion."
echo ""
echo "PHASE 4 — Inner Pages"
echo "Skills: frontend-design, nextjs-expert, schema-markup-generator, react-best-practices"
echo "Prompt: Read CLAUDE.md. Build /features, /for-dentists, /pricing (blurred tiers), /about (team photos + bios), /contact, /waitlist, /privacy, /terms. All with BreadcrumbList schema, unique OG meta."
echo ""
echo "PHASE 5 — Blog System"
echo "Skills: nextjs-expert, seo, react-best-practices"
echo "Prompt: Read CLAUDE.md. MDX blog with next-mdx-remote, /blog grid with category filters, /blog/[slug] with FAQ+Article schema, 3 seed posts (SaMD-safe language), RSS feed at /feed.xml."
echo ""
echo "PHASE 6 — SEO + Performance"
echo "Skills: seo, frontend-performance, schema-markup-generator, nextjs-expert"
echo "Prompt: Read CLAUDE.md. SEO audit all pages, verify schema, OG images, sitemap, canonical URLs, hreflang. Performance: next/image everywhere, lazy load, font swap, dynamic imports, JS<200KB, CWV targets."
echo ""
echo "PHASE 7 — Accessibility + Testing"
echo "Skills: accessibility, wcag-21-aa-web-ui-audit, e2e-testing-patterns, screenshot"
echo "Prompt: Read CLAUDE.md. WCAG 2.1 AA audit, Playwright visual regression (3 breakpoints x 8 pages), E2E tests (nav, forms, blog, responsive, axe-core). Fix all failures."
echo ""
echo "PHASE 8 — Final Review + Deploy"
echo "Skills: vercel, screenshot"
echo "Prompt: Read CLAUDE.md. npm run build (zero errors), npm run test (all pass), SaMD grep (zero hits), screenshots of every page at 1440px to screenshots/, push to GitHub, print Vercel deploy instructions."

