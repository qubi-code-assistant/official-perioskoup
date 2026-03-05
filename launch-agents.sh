#!/bin/bash
# ============================================================
# Perioskoup Official Website — Agent Launch Script
# 8-phase pipeline. Each agent handles one phase.
# Skills referenced per phase for agent context.
# ============================================================

set -e
PROJECT_DIR=~/Projects/official-perioskoup
cd "$PROJECT_DIR"

echo "🏛️ Perioskoup Official Website — Agent Pipeline"
echo "================================================"
echo ""

# ─────────────────────────────────────────────────
# PHASE 1: Project Scaffolding (automatic)
# ─────────────────────────────────────────────────
echo "📦 Phase 1: Scaffold Next.js 14 project..."
read -p "Press Enter to launch Phase 1..."

npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git

npm install gsap @gsap/react framer-motion
npm install next-mdx-remote gray-matter reading-time
npm install react-hook-form @hookform/resolvers zod
npm install next-sitemap
npm install sharp
npm install -D @tailwindcss/typography playwright @playwright/test

npx playwright install chromium

echo "✅ Phase 1 complete — project scaffolded"
echo ""

# ─────────────────────────────────────────────────
# PHASE 2: Design System + Layout
# Skills: frontend-design, awwwards-design, tailwind-v4-shadcn, nextjs-expert
# ─────────────────────────────────────────────────
echo "🎨 Phase 2: Design system + global layout..."
echo "Launch a coding agent in ~/Projects/official-perioskoup with this prompt:"
echo ""
cat << 'PROMPT2'
Read CLAUDE.md first. Skills to use: frontend-design, awwwards-design, tailwind-v4-shadcn, nextjs-expert.

1. Create design tokens in src/constants/colors.ts, typography.ts, spacing.ts matching the locked design system
2. Configure Tailwind with custom colors, fonts (Dongle-Bold headings via next/font — NEVER use fontWeight on Dongle, Gabarito body)
3. Create global layout (src/app/layout.tsx) with:
   - Dark theme (#0A171E background)
   - Responsive nav: logo, links (Features, For Dentists, Pricing, Blog, About), lime CTA button "Join Waitlist"
   - Mobile hamburger menu with smooth animation
   - Footer with links, social icons, legal pages
   - Skip-to-content link for accessibility
4. Create src/lib/schema.ts with JSON-LD generators for: MedicalOrganization, Physician, SoftwareApplication, FAQPage, Article, BreadcrumbList
5. Set up metadata defaults in layout.tsx (Open Graph, Twitter cards, favicon)
6. Add /llms.txt route (app/llms.txt/route.ts) — factual markdown, NO marketing fluff
7. Add robots.txt allowing all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
8. Configure next-sitemap in next-sitemap.config.js

Reference: apple.com/iphone and apple.com/apple-intelligence for whitespace and typography scale.
Apple-level whitespace. Premium feel. No clutter. Dark luxury.
PROMPT2
echo ""
read -p "Press Enter when Phase 2 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 3: Homepage
# Skills: awwwards-design, Animations, motion, auto-animate, frontend-design
# ─────────────────────────────────────────────────
echo "🏠 Phase 3: Homepage..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT3'
Read CLAUDE.md first. Skills to use: awwwards-design, Animations, motion, auto-animate, frontend-design.

Build the homepage (src/app/page.tsx) — Apple-quality, scroll-driven storytelling:

1. HERO — Full viewport
   - Dr. Anca's EFP quote in elegant large typography (Dongle-Bold, NO fontWeight)
   - App screenshot floating with subtle GSAP parallax (placeholder at public/app-screens/patient-home.png)
   - "Join the Waitlist" CTA button (#C0E57A lime)
   - "Free for early adopters · No credit card" subtext
   - Subtle gradient overlay, not busy

2. PROBLEM/SOLUTION — "A Week in Two Practices"
   - Side-by-side comparison: Without vs With Perioskoup
   - 4 scenario cards that reveal on scroll (GSAP ScrollTrigger)
   - Stats: 15 min saved, 40% fewer no-shows, 92% engagement rate, 3x better habits
   - Use "engagement" not "compliance" (SaMD rules — see CLAUDE.md)

3. FEATURES — 3-4 key features
   - AI Companion, Habit Tracking, Dentist Dashboard, Smart Reminders
   - Each animates in on scroll with staggered reveal
   - Icon + heading + description + subtle screenshot

4. SOCIAL PROOF
   - EFP Digital Innovation Award 2025 badge
   - "30 clinics on the waitlist" animated counter
   - Dr. Anca Constantin credentials card

5. HOW IT WORKS — 3 steps
   - Dentist Onboards → Patient Downloads → AI Supports Daily
   - Connected by animated line/path on scroll

6. BLOG PREVIEW — Latest 3 posts grid (placeholder cards)

7. FINAL CTA — Waitlist form
   - Name, Email, Clinic (optional), Country, Role dropdown
   - "Free for early adopters" · trust badges

All GSAP animations must respect prefers-reduced-motion (disable completely).
Reference: apple.com/iphone scroll storytelling. Generous whitespace between every section.
PROMPT3
echo ""
read -p "Press Enter when Phase 3 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 4: Inner Pages
# Skills: frontend-design, nextjs-expert, schema-markup-generator, react-best-practices
# ─────────────────────────────────────────────────
echo "📄 Phase 4: Inner pages..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT4'
Read CLAUDE.md first. Skills: frontend-design, nextjs-expert, schema-markup-generator, react-best-practices.

Build these pages (same dark theme, Apple whitespace):

1. /features — Patient App, Dentist Dashboard, AI Companion detailed sections
   - Each with screenshot placeholder, description, bullet benefits
   - FAQPage schema (5-6 questions), answer capsules after each H2
   - SoftwareApplication schema

2. /for-dentists — B2B landing page
   - "How much time are you losing?" hook
   - ROI stats (15 min/patient saved, 40% no-show reduction)
   - 3 benefit cards with scroll animation
   - Waitlist CTA, FAQ schema

3. /pricing — Three tiers: Starter €39, Growth €89, Pro €199
   - BLURRED with "We're in Beta" glass overlay
   - "Join waitlist for early-adopter pricing" CTA
   - Feature comparison table (also blurred)

4. /about — Team page
   - Dr. Anca Constantin: Periodontist, EFP Award Winner, co-founder (Physician schema)
   - Eduard Ciugulea: Tech lead, co-founder
   - Company story section

5. /contact — Form (name, email, clinic, message) + clinic onboarding inquiry

6. /waitlist — Dedicated signup (Name, Email, Clinic, Country, Role)

7. /privacy + /terms — Placeholder legal pages with proper layout

All pages: BreadcrumbList schema, unique Open Graph meta, consistent nav/footer.
PROMPT4
echo ""
read -p "Press Enter when Phase 4 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 5: Blog System
# Skills: nextjs-expert, seo, react-best-practices
# ─────────────────────────────────────────────────
echo "📝 Phase 5: Blog system..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT5'
Read CLAUDE.md first. Skills: nextjs-expert, seo, react-best-practices.

1. MDX blog system (next-mdx-remote + gray-matter)
   - Posts in src/content/blog/*.mdx
   - Frontmatter: title, description, author, date, category, tags, image, faq[]
   - Reading time calc, table of contents generation

2. /blog — Grid of cards (image, title, excerpt, date, category badge)
   - Category filter tabs (Clinical, Product, Industry)
   - Pagination (6 per page)

3. /blog/[slug] — Full MDX post
   - Author card (Dr. Anca for Clinical, Eduard for Product)
   - Auto-generated table of contents
   - FAQ schema from frontmatter
   - Article + MedicalWebPage schema
   - Related posts, social share buttons
   - Answer capsule component (brief factual summary after H2s)

4. Create 3 seed posts (800-1200 words each):
   a. "Why AI is Changing Dental Patient Engagement" (Clinical, Dr. Anca)
   b. "How Perioskoup Helps Reduce No-Shows by 40%" (Product, Eduard)
   c. "The Hidden Cost of Poor Patient Habits in Periodontal Care" (Clinical, Dr. Anca)
   IMPORTANT: Use SAFE language only — see SaMD section in CLAUDE.md. Never "compliance", use "engagement".

5. RSS feed at /feed.xml (app/feed.xml/route.ts)

Each post: 3+ statistics with named sources, FAQ section, 3+ internal links, answer capsules.
PROMPT5
echo ""
read -p "Press Enter when Phase 5 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 6: SEO + Performance Polish
# Skills: seo, frontend-performance, schema-markup-generator, nextjs-expert
# ─────────────────────────────────────────────────
echo "🔍 Phase 6: SEO + Performance polish..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT6'
Read CLAUDE.md first. Skills: seo, frontend-performance, schema-markup-generator, nextjs-expert.

SEO Audit:
1. Every page has unique <title> and <meta description>
2. All JSON-LD schema validates (test with console output)
3. Open Graph + Twitter cards on every page (og:image for each)
4. robots.txt allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
5. sitemap.xml generates correctly via next-sitemap
6. /llms.txt returns factual markdown
7. Canonical URLs on every page
8. hreflang tags: en-GB primary, en default

Performance:
1. All images use next/image with responsive srcset + priority on hero
2. Lazy load all below-fold components and images
3. Font display: swap on both Dongle-Bold and Gabarito
4. No render-blocking resources
5. GSAP — tree-shake unused plugins, load ScrollTrigger dynamically
6. Bundle analysis: first load JS < 200KB
7. Use next/dynamic for heavy components

Core Web Vitals targets:
- LCP < 2.5s, FID < 100ms, CLS < 0.1

Commit: git add -A && git commit -m "perf: SEO audit + performance optimization"
PROMPT6
echo ""
read -p "Press Enter when Phase 6 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 7: Accessibility + Visual Testing
# Skills: accessibility, wcag-21-aa-web-ui-audit, e2e-testing-patterns, screenshot
# ─────────────────────────────────────────────────
echo "♿ Phase 7: Accessibility + Visual Testing..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT7'
Read CLAUDE.md first. Skills: accessibility, wcag-21-aa-web-ui-audit, e2e-testing-patterns, screenshot.

ACCESSIBILITY AUDIT (WCAG 2.1 AA):
1. All images have meaningful alt text
2. Semantic HTML throughout (header, main, nav, section, article, footer)
3. Skip-to-content link works
4. ARIA labels on all interactive elements (hamburger menu, form inputs, buttons)
5. Color contrast passes AA on all text (#F5F9EA on #0A171E, #C0E57A on #0A171E)
6. Focus indicators visible on all interactive elements
7. Keyboard navigation works for entire site (tab order logical)
8. prefers-reduced-motion disables ALL GSAP and Motion animations
9. Form error states are accessible (aria-invalid, aria-describedby)
10. No autoplaying media

VISUAL TESTING — Create Playwright visual regression tests:
1. Create tests/visual/ directory
2. Screenshot tests for every page at 3 breakpoints:
   - Mobile (375px), Tablet (768px), Desktop (1440px)
3. Test pages: /, /features, /for-dentists, /pricing, /about, /blog, /contact, /waitlist
4. Test states:
   - Default page load
   - Nav hamburger open (mobile)
   - Waitlist form: empty, filled, submitted
   - Pricing cards hover state
   - Scroll animations triggered (scroll to 50%, 100%)
5. Create test script in package.json: "test:visual": "playwright test tests/visual/"

E2E FUNCTIONAL TESTS (Playwright):
1. Create tests/e2e/ directory
2. Test navigation: all nav links work, mobile hamburger opens/closes
3. Test waitlist form: submit with valid data, validation errors on empty
4. Test blog: navigate to /blog, click a post, verify content loads
5. Test responsive: no horizontal overflow at 375px on any page
6. Test accessibility: run axe-core on every page
7. Install @axe-core/playwright: npm install -D @axe-core/playwright
8. Create test script: "test:e2e": "playwright test tests/e2e/"
9. Create "test": "npm run test:e2e && npm run test:visual" combined script

Run all tests and fix any failures before committing.
Commit: git add -A && git commit -m "test: accessibility audit + visual regression + e2e tests"
PROMPT7
echo ""
read -p "Press Enter when Phase 7 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 8: Final Review + Deploy
# Skills: vercel, screenshot
# ─────────────────────────────────────────────────
echo "🚀 Phase 8: Final review + deploy..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT8'
Read CLAUDE.md first. Skills: vercel, screenshot.

FINAL REVIEW:
1. Run: npm run build — must complete with zero errors
2. Run: npm run test — all visual + e2e tests must pass
3. Run: npx next-sitemap — verify sitemap.xml and robots.txt generate
4. Check every page loads in dev mode — no console errors
5. Verify no lorem ipsum or placeholder text remains (except screenshots)
6. Verify SaMD compliance: grep for "compliance", "diagnose", "treat", "monitor inflammation" — must return zero results in user-facing code
7. Verify all internal links work (no 404s)

SCREENSHOTS FOR REVIEW:
Take full-page screenshots of every page at desktop (1440px):
- Save to screenshots/ directory
- /, /features, /for-dentists, /pricing, /about, /blog, /contact, /waitlist

DEPLOY:
1. Push to GitHub:
   git add -A && git commit -m "feat: Perioskoup official website — production ready" && git push origin main
2. Print instructions for Eduard to connect Vercel:
   - Import repo github.com/qubi-code-assistant/official-perioskoup in Vercel
   - Framework: Next.js (auto-detected)
   - Add env vars: NEXT_PUBLIC_SITE_URL=https://perioskoup.com
   - Deploy

Done! Eduard reviews screenshots, then connects Vercel.
PROMPT8
echo ""
read -p "Press Enter when Phase 8 agent is done..."

echo ""
echo "🏛️ All 8 phases complete!"
echo ""
echo "Next steps:"
echo "1. Review screenshots/ folder for visual quality"
echo "2. Connect Vercel to github.com/qubi-code-assistant/official-perioskoup"
echo "3. Add custom domain: perioskoup.com"
echo "4. Set env vars in Vercel dashboard"
echo "5. Submit sitemap to Google Search Console"
echo "6. Submit to Bing Webmaster Tools"

