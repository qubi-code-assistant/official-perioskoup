# CLAUDE.md — official-perioskoup

## Project Overview
**Perioskoup Official Website** — Apple-quality presentation site for an AI dental companion app.
Dentist-focused B2B SaaS. Pre-revenue, 30-clinic waitlist, March 2026 launch.

## Tech Stack
- **Framework**: Next.js 14 (App Router, SSG/ISR for marketing pages)
- **Styling**: Tailwind CSS v4 + custom design tokens
- **Animations**: GSAP + ScrollTrigger, Motion.dev (Framer Motion)
- **Fonts**: Dongle-Bold (headings, NO fontWeight ever), Gabarito (body) via next/font
- **Deployment**: Vercel
- **CMS/Blog**: MDX or Contentlayer for blog posts (SEO-optimised)
- **Forms**: React Hook Form + server action or API route for waitlist

## Design System (LOCKED — never override)
```
Background:    #0A171E (deep navy)
Surface:       #1D3449 (card backgrounds)
Accent/CTA:    #C0E57A (lime green — all CTAs, highlights)
Text Primary:  #F5F9EA (off-white)
Text Secondary:#8C9C8C (muted green-grey)
Border:        #234966 (subtle blue)
Primary:       #3578AA (link blue)
```
- Heading sizes 30–40% larger than normal
- Apple-level whitespace: generous padding, breathing room
- Dark theme throughout — premium dental tech feel
- Quiet luxury: no flashy gradients, no cluttered layouts

## Brand Voice
- Clinical authority meets modern tech
- Dr. Anca Constantin is the named expert — every clinical claim attributed to her
- EFP Award quote MUST appear prominently: "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient adherence to treatment, which leads to poor outcomes."
- Trust signals: EFP logo, Dr. Anca's credentials, real app screenshots
- No marketing fluff in llms.txt — factual only

## Site Architecture (Pages)

### Core Pages
1. **/** — Homepage (hero with Dr. Anca quote + app screenshot, value props, social proof, waitlist CTA)
2. **/features** — Detailed feature breakdown (patient app, dentist dashboard, AI companion)
3. **/for-dentists** — B2B landing page (ROI calculator, practice benefits, case studies)
4. **/pricing** — Tiered pricing (Starter €39/mo, Growth €89/mo, Pro €199/mo) — BLURRED in beta
5. **/about** — Team page (Dr. Anca, Eduard, company story)
6. **/blog** — MDX blog with categories (Clinical, Product, Industry)
7. **/blog/[slug]** — Individual blog posts with FAQ schema, author attribution
8. **/contact** — Contact form + clinic onboarding inquiry
9. **/waitlist** — Dedicated waitlist signup page
10. **/privacy** — Privacy policy
11. **/terms** — Terms of service

### SEO/GEO Pages
12. **/llms.txt** — AI crawler factual overview (see appendix in SEO strategy)
13. **/robots.txt** — Allow all AI crawlers
14. **/sitemap.xml** — Auto-generated

### Future (post-launch)
- **/case-studies/[slug]** — Individual clinic success stories
- **/resources** — Downloadable guides, whitepapers
- **/ro** — Romanian language variant (hreflang)

## SEO Requirements (from Master Strategy)
- **Category creation**: Own "AI dental companion" in search — zero competition now
- **Schema types** (implement in order):
  1. MedicalOrganization (homepage)
  2. Physician (Dr. Anca — sameAs EFP, ORCID, Google Scholar)
  3. SoftwareApplication (features page)
  4. FAQPage (every content page)
  5. Article + MedicalWebPage (blog posts)
  6. BreadcrumbList (all pages)
- **Core Web Vitals**: Must pass all three thresholds
- **hreflang**: en-GB (primary), en (default), ro (future)
- **IndexNow**: Submit on every deploy
- **Open Graph + Twitter cards**: Every page
- **Structured data testing**: Validate with Google Rich Results Test

## GEO (Generative Engine Optimisation)
- Deploy `/llms.txt` at launch
- Allow all AI crawlers in robots.txt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- FAQ schema on every content page
- "Answer capsules" after every H2 (brief, factual summary paragraph)
- Dr. Anca's EFP quote prominent on site (AI engines cite named experts)
- Minimum 3 citable statistics per blog post with named sources

## Content Strategy
- **Pillar pages**: "AI in Dentistry", "Patient Compliance", "Periodontal Home Care"
- **Blog cadence**: 2 posts/week minimum at launch
- **Every blog post must have**: Author (Dr. Anca for clinical), FAQ schema, 3+ internal links, 3+ statistics with sources, answer capsule after each H2
- **Primary market**: Romania (English content covers UK/EU automatically)

## Homepage Structure (Apple-inspired)
1. **Hero**: Dr. Anca's quote + app screenshot floating + waitlist CTA
2. **Problem/Solution**: "A Week in Two Practices" (with/without Perioskoup comparison)
3. **Features showcase**: 3-4 key features with scroll-triggered animations
4. **Social proof**: EFP Award badge, 30-clinic waitlist counter, testimonial
5. **How it works**: 3-step flow with animated illustrations
6. **For Dentists CTA**: ROI-focused section linking to /for-dentists
7. **Blog preview**: Latest 3 posts
8. **Final CTA**: Waitlist form with "Free for early adopters"

## Animation Guidelines
- GSAP ScrollTrigger for scroll-based reveals
- Motion.dev for component-level transitions
- Respect `prefers-reduced-motion` — disable all animations
- No autoplay video on mobile (performance)
- Parallax depth on hero only — subtle, not distracting
- Page transitions: smooth fade/slide between routes

## Mobile Responsiveness
- Mobile-first design
- Hamburger nav on mobile
- Touch-friendly CTAs (min 44px tap targets)
- No horizontal scroll ever
- Images: next/image with responsive srcset
- Lazy load below-fold content

## Waitlist Form
- Fields: Name, Email, Clinic Name (optional), Country, Role (Dentist/Clinic Manager/Other)
- Store in: Vercel Postgres or external (Brevo for email marketing)
- Confirmation: Thank you page + confirmation email via Brevo
- Double opt-in for GDPR compliance

## Key Files
- `src/constants/colors.ts` — All color tokens
- `src/constants/typography.ts` — Font config
- `src/constants/spacing.ts` — Spacing scale
- `src/lib/schema.ts` — All JSON-LD schema generators
- `src/content/blog/` — MDX blog posts
- `public/app-screens/` — Real app screenshots
- `public/logo-brand.svg` — Perioskoup logo

## Commands
```bash
npm run dev        # Local development (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint
npm run start      # Start production server
```

## Environment Variables
```
NEXT_PUBLIC_SITE_URL=https://perioskoup.com
BREVO_API_KEY=           # For waitlist email
INDEXNOW_KEY=            # For search engine notification
```

## DO NOT
- Override the design system colors
- Use fontWeight on Dongle-Bold headings
- Create a Google Business Profile (no UK office — violates guidelines)
- Unblur pricing until launch
- Use `en-EU` as hreflang (not valid)
- Put marketing fluff in llms.txt
- Autoplay video on mobile
- Use lorem ipsum anywhere — all copy must be real
