#!/bin/bash
set -e
cd ~/Projects/official-perioskoup

echo "🏛️ Phase 1: Scaffolding..."
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git --yes 2>&1 | tail -5

echo "📦 Dependencies..."
npm install gsap @gsap/react framer-motion next-mdx-remote gray-matter reading-time react-hook-form @hookform/resolvers zod next-sitemap sharp 2>&1 | tail -3
npm install -D @tailwindcss/typography playwright @playwright/test @axe-core/playwright 2>&1 | tail -3
npx playwright install chromium 2>&1 | tail -3

echo "📦 Copying assets..."
mkdir -p public/app-screens
cp ~/Projects/perioskoup-landing-vercel/public/logo-brand.svg public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/logo-white.svg public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/app_image.webp public/app-screens/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/app_image-mobile.webp public/app-screens/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/award_ceremony.webp public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/award_ceremony-mobile.webp public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/favicon.ico public/ 2>/dev/null || true
cp ~/Projects/perioskoup-landing-vercel/public/apple-touch-icon.png public/ 2>/dev/null || true

echo "✅ Phase 1 done. Launching agents..."

# Phase 2-5: Design + Homepage + Pages + Blog
claude -p "Read CLAUDE.md first. Then do ALL of the following in one go:

PHASE 2 — DESIGN SYSTEM:
1. Create src/constants/colors.ts, typography.ts, spacing.ts with the exact design tokens from CLAUDE.md
2. Configure Tailwind with the full lime+navy @theme scales, Dongle-Bold + Gabarito via next/font (NEVER fontWeight on Dongle)
3. Build global layout (src/app/layout.tsx): dark theme #0A171E, responsive nav (Features, For Dentists, Pricing, Blog, About + lime Join Waitlist CTA), mobile hamburger, footer with social links, skip-to-content
4. Create src/lib/schema.ts: JSON-LD generators for MedicalOrganization, Physician, SoftwareApplication, FAQPage, Article, BreadcrumbList
5. Add /llms.txt route (factual markdown, no fluff), robots.txt (allow all AI crawlers), next-sitemap config
6. Set metadata defaults: OG + Twitter cards, favicons

PHASE 3 — HOMEPAGE (src/app/page.tsx):
Apple-quality scroll storytelling. 7 sections:
1. Hero: Dr. Anca quote (from CLAUDE.md) + app screenshot with GSAP parallax + waitlist CTA (#C0E57A) + 'Free for early adopters'
2. Problem/Solution: 'A Week in Two Practices' — without/with comparison cards, scroll reveals. Stats: 15min saved, 40% fewer no-shows, 92% engagement, 3x better habits
3. Features: 4 features (AI Companion, Habit Tracking, Dentist Dashboard, Smart Reminders) with staggered scroll animation
4. Social Proof: EFP Award badge (award_ceremony.webp), 30-clinic counter, Dr. Anca credentials
5. How It Works: 3 animated steps (Onboard → Download → AI Supports)
6. Blog Preview: 3 placeholder cards
7. Final CTA: waitlist form (Name, Email, Clinic, Country, Role)
All animations respect prefers-reduced-motion.

PHASE 4 — INNER PAGES:
Build /features (SoftwareApplication + FAQPage schema), /for-dentists (ROI stats + waitlist), /pricing (3 blurred tiers from CLAUDE.md behind blur-[6px] overlay), /about (team photos from public/team/ + bios + Physician schema for Dr. Anca), /contact (form), /waitlist (dedicated signup), /privacy + /terms (placeholder legal). All pages: BreadcrumbList schema, unique OG meta.

PHASE 5 — BLOG:
MDX blog: next-mdx-remote + gray-matter. Posts in src/content/blog/*.mdx. /blog page with category filters (Clinical, Product, Industry) + pagination. /blog/[slug] with author card, TOC, FAQ+Article schema, related posts. Create 3 seed posts (800-1200 words, SaMD-safe language per CLAUDE.md, 3+ stats with sources, FAQ section). RSS at /feed.xml.

Use SaMD-safe language throughout — NEVER use compliance/diagnose/treat/monitor. Check CLAUDE.md for the full banned words table.
Generous Apple-level whitespace on every page. Dark luxury theme." --allowedTools "Edit,Write,Bash,Read" --dangerouslySkipPermissions

# Phase 6-8: SEO + Testing + Deploy
claude -p "Read CLAUDE.md. Then do ALL of the following:

PHASE 6 — SEO + PERFORMANCE:
Audit every page: unique title+description, all JSON-LD validates, OG+Twitter cards, canonical URLs, hreflang en-GB. Verify robots.txt, sitemap.xml, /llms.txt. Performance: next/image everywhere with priority on hero, lazy load below-fold, font display swap, dynamic import GSAP ScrollTrigger, bundle JS<200KB. CWV targets: LCP<2.5s, FID<100ms, CLS<0.1.

PHASE 7 — ACCESSIBILITY + TESTING:
WCAG 2.1 AA: semantic HTML, skip-to-content, ARIA labels, color contrast AA, focus indicators, keyboard nav, prefers-reduced-motion disables all animations, accessible form errors.
Create Playwright tests:
- tests/visual/: screenshot every page at 375px, 768px, 1440px
- tests/e2e/: nav links, mobile hamburger, waitlist form submit+validation, blog navigation, no horizontal overflow at 375px, axe-core on every page
- package.json scripts: test:visual, test:e2e, test (combined)
Run tests and fix failures.

PHASE 8 — FINAL:
npm run build must pass. Grep src/ for banned SaMD words (compliance, diagnose, treat, monitor inflammation) — must return zero. Take full-page screenshots of every page at 1440px into screenshots/ dir. git add -A && git commit -m 'feat: Perioskoup official website' && git push origin main." --allowedTools "Edit,Write,Bash,Read" --dangerouslySkipPermissions

echo ""
echo "🏛️ Done! Next: import github.com/qubi-code-assistant/official-perioskoup in Vercel"

