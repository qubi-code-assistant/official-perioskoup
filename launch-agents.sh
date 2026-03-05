#!/bin/bash
# ============================================================
# Perioskoup Official Website — Agent Launch Script
# Run agents sequentially. Each one handles a phase.
# ============================================================

set -e
PROJECT_DIR=~/Projects/official-perioskoup
cd "$PROJECT_DIR"

echo "🏛️ Perioskoup Official Website — Agent Pipeline"
echo "================================================"
echo ""

# ─────────────────────────────────────────────────
# PHASE 1: Project Scaffolding
# Skills: react-best-practices, frontend-design
# ─────────────────────────────────────────────────
echo "📦 Phase 1: Scaffold Next.js 14 project..."
read -p "Press Enter to launch Phase 1 agent..."

npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-git

# Install dependencies
npm install gsap @gsap/react framer-motion
npm install next-mdx-remote gray-matter reading-time
npm install react-hook-form @hookform/resolvers zod
npm install next-sitemap
npm install -D @tailwindcss/typography

echo "✅ Phase 1 complete — project scaffolded"
echo ""

# ─────────────────────────────────────────────────
# PHASE 2: Design System + Layout
# Skills: frontend-design, awwwards-design, Animations
# Agent: Set up design tokens, global layout, nav, footer
# ─────────────────────────────────────────────────
echo "🎨 Phase 2: Design system + global layout..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT2'
Read CLAUDE.md first. Then:

1. Create design tokens in src/constants/colors.ts, typography.ts, spacing.ts matching the locked design system
2. Configure Tailwind with custom colors, fonts (Dongle-Bold headings, Gabarito body via next/font)
3. Create global layout (src/app/layout.tsx) with:
   - Dark theme (#0A171E background)
   - Responsive nav with logo, links (Features, For Dentists, Pricing, Blog, About), waitlist CTA button
   - Mobile hamburger menu
   - Footer with links, social, legal pages
4. Create src/lib/schema.ts with JSON-LD generators for: MedicalOrganization, Physician, SoftwareApplication, FAQPage, Article, BreadcrumbList
5. Set up metadata defaults in layout.tsx (Open Graph, Twitter cards, favicon)
6. Add /llms.txt route (app/llms.txt/route.ts) returning factual markdown
7. Add robots.txt allowing all AI crawlers
8. Configure next-sitemap

Apple-level whitespace. Premium feel. No clutter.
PROMPT2
echo ""
read -p "Press Enter when Phase 2 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 3: Homepage
# Skills: awwwards-design, Animations, motion, auto-animate
# Agent: Build the homepage with all sections
# ─────────────────────────────────────────────────
echo "🏠 Phase 3: Homepage..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT3'
Read CLAUDE.md first. Then build the homepage (src/app/page.tsx):

1. Hero section:
   - Dr. Anca's quote in elegant typography
   - App screenshot floating with subtle parallax (use placeholder image for now at public/app-screens/patient-home.png)
   - "Join the Waitlist" CTA button (#C0E57A)
   - "Free for early adopters · No credit card" subtext
   - GSAP ScrollTrigger for reveal animations

2. Problem/Solution section:
   - "A Week in Two Practices" — side-by-side comparison cards
   - Without Perioskoup vs With Perioskoup scenarios
   - Stats: 15 min saved, 40% fewer no-shows, 92% compliance, 3x adherence
   - Scroll-triggered card reveals

3. Features showcase:
   - 3-4 key features with icons/illustrations
   - Each feature animates in on scroll
   - AI Companion, Habit Tracking, Dentist Dashboard, Smart Reminders

4. Social proof:
   - EFP Digital Innovation Award 2025 badge
   - "30 clinics on the waitlist" counter
   - Dr. Anca Constantin credentials

5. How it works:
   - 3 steps: Dentist Onboards → Patient Downloads → AI Guides Daily
   - Animated step transitions

6. Blog preview:
   - Latest 3 posts grid (placeholder cards for now)

7. Final CTA:
   - Waitlist form embed
   - "Free for early adopters"

Use GSAP ScrollTrigger for scroll animations. Respect prefers-reduced-motion.
Apple-level polish. Generous whitespace. Premium dark theme.
PROMPT3
echo ""
read -p "Press Enter when Phase 3 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 4: Inner Pages
# Skills: frontend-design, react-best-practices
# Agent: Features, For Dentists, Pricing, About, Contact
# ─────────────────────────────────────────────────
echo "📄 Phase 4: Inner pages..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT4'
Read CLAUDE.md first. Then build these pages:

1. /features (src/app/features/page.tsx)
   - Detailed feature breakdown: Patient App, Dentist Dashboard, AI Companion
   - Each feature gets a section with screenshot placeholder, description, benefits
   - FAQ schema at bottom with 5-6 common questions
   - Answer capsules after each H2

2. /for-dentists (src/app/for-dentists/page.tsx)
   - B2B focused: ROI calculator concept, practice benefits
   - "How much time are you losing?" hook
   - Stats from SEO strategy (15 min/patient, 40% no-show reduction)
   - Waitlist CTA
   - FAQ schema

3. /pricing (src/app/pricing/page.tsx)
   - Three tiers: Starter €39/mo, Growth €89/mo, Pro €199/mo
   - BLURRED with "We're in Beta" overlay — do not show real prices clearly
   - "Join waitlist for early-adopter pricing" CTA
   - Feature comparison table (blurred)

4. /about (src/app/about/page.tsx)
   - Dr. Anca Constantin — Periodontist, EFP Award Winner, co-founder
   - Eduard Ciugulea — Tech, co-founder
   - Company story: born from real clinical challenges
   - Physician schema for Dr. Anca

5. /contact (src/app/contact/page.tsx)
   - Contact form (name, email, clinic, message)
   - Clinic onboarding inquiry option

6. /waitlist (src/app/waitlist/page.tsx)
   - Dedicated waitlist page with form
   - Fields: Name, Email, Clinic Name (optional), Country, Role
   - Thank you state after submission

7. /privacy and /terms — placeholder legal pages

All pages: BreadcrumbList schema, Open Graph meta, consistent design system.
PROMPT4
echo ""
read -p "Press Enter when Phase 4 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 5: Blog System
# Skills: react-best-practices
# Agent: MDX blog with SEO
# ─────────────────────────────────────────────────
echo "📝 Phase 5: Blog system..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT5'
Read CLAUDE.md first. Then set up the blog:

1. MDX blog system using next-mdx-remote + gray-matter
   - Blog posts in src/content/blog/*.mdx
   - Frontmatter: title, description, author, date, category, tags, image
   - Reading time calculation

2. /blog page (src/app/blog/page.tsx)
   - Grid of blog post cards with image, title, excerpt, date, category
   - Category filter (Clinical, Product, Industry)
   - Pagination

3. /blog/[slug] page (src/app/blog/[slug]/page.tsx)
   - Full blog post with MDX rendering
   - Author card (Dr. Anca for clinical, Eduard for product)
   - Table of contents
   - FAQ schema
   - Article schema with author
   - Related posts at bottom
   - Social share buttons

4. Create 3 seed blog posts:
   a. "Why AI is the Future of Dental Patient Compliance" (Clinical, by Dr. Anca)
   b. "How Perioskoup Reduces No-Shows by 40%" (Product, by Eduard)
   c. "The Hidden Cost of Poor Patient Adherence in Periodontal Care" (Clinical, by Dr. Anca)

   Each post: 800-1200 words, 3+ statistics with sources, FAQ section, answer capsules after H2s.

5. RSS feed at /feed.xml
PROMPT5
echo ""
read -p "Press Enter when Phase 5 agent is done..."

# ─────────────────────────────────────────────────
# PHASE 6: SEO Polish + Deploy
# Skills: vercel, frontend-design
# Agent: Final SEO, performance, deploy
# ─────────────────────────────────────────────────
echo "🚀 Phase 6: SEO polish + deploy..."
echo "Launch a coding agent with this prompt:"
echo ""
cat << 'PROMPT6'
Read CLAUDE.md first. Final polish:

1. SEO audit:
   - Verify all pages have unique title + description
   - Check all schema renders correctly (use JSON-LD script tags)
   - Verify robots.txt allows AI crawlers
   - Verify sitemap.xml generates correctly
   - Check Open Graph images for all pages

2. Performance:
   - next/image for all images with responsive srcset
   - Lazy load below-fold components
   - Font display swap
   - Check no render-blocking resources
   - Bundle analysis — keep JS under 200KB first load

3. Accessibility:
   - prefers-reduced-motion disables all GSAP/motion animations
   - All images have alt text
   - Semantic HTML throughout
   - Skip to content link
   - ARIA labels on interactive elements
   - Color contrast passes WCAG AA

4. Mobile audit:
   - Test all pages at 375px, 390px, 428px widths
   - No horizontal overflow
   - Touch targets min 44px
   - Hamburger menu works correctly

5. Commit everything and push to GitHub:
   git add -A && git commit -m "feat: Perioskoup official website — full build" && git push -u origin main
PROMPT6
echo ""
read -p "Press Enter when Phase 6 agent is done..."

echo ""
echo "🏛️ All phases complete!"
echo "Next: Connect Vercel to github.com/qubi-code-assistant/official-perioskoup"
echo "Then: Point perioskoup.com DNS to Vercel"

