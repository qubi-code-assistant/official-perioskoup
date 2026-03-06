# Perioskoup Website Deep Audit — Multi-Agent Task

You are auditing the Perioskoup landing page (official-perioskoup). This is a Vite + React + Tailwind SPA deployed on Vercel.

## IMPORTANT: Read Skills Before Each Audit
Each audit agent MUST read the relevant skill file(s) listed below BEFORE starting its audit. These contain best practices, checklists, and frameworks that must be applied.

**Skill files location:** `~/.openclaw/workspace/skills/<name>/SKILL.md`

## Business Context
- **What**: AI dental companion app — bridges the gap between dental visits with personalised habit tracking, smart reminders, and AI chatbot for patients
- **Company**: Romanian SRL, incorporated June 2025, bootstrapped, pre-revenue
- **Founders**: Dr. Anca Laura Constantin (Periodontist, CDO), Eduard Ciugulea (CGO), Petrica Nancu (CTO & Head of AI)
- **Award**: EFP Digital Innovation Award 2025 — 3rd Prize at EuroPerio11, Vienna (selected from 20 submissions across 17 national societies)
- **Status**: 30-clinic waitlist, March 2026 public launch
- **Target audience**: Dentists/periodontists (B2B buyers) AND patients (B2C users)
- **Primary market**: Romania (English content covers UK/EU automatically)
- **Revenue model**: Dentists pay (Starter €39/mo, Growth €89/mo, Pro €199/mo). Patients are FREE.
- **Competitive advantage**: ZERO competitors in "AI dental companion for between-visit engagement + habit tracking". Category creation opportunity.
- **Domain**: perioskoup.com (currently on official-perioskoup.vercel.app)
- **Key differentiator**: Dr. Anca's clinical authority + EFP award = strongest trust signal in the space
- **Vision**: Own the "AI dental companion" category in search before competitors (PerioPredict, CareStack) start their SEO
- **EFP article**: https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/ (DR 60+, #1 asymmetric SEO advantage)

## Brand
- Background: #0A171E (deep navy), Surface: #1D3449, Accent: #C0E57A (lime), Text: #F5F9EA
- Fonts: Dongle (headings), Gabarito (body)
- Aesthetic: quiet luxury, old money tech, Apple-level whitespace
- Tone: confident clinical authority meets modern tech. Direct, no fluff.

## Regulatory WARNING
- NEVER use: "compliance", "diagnose", "treat", "cure", "monitor inflammation", "track bleeding", "adherence", "clinical guidance", "therapeutic"
- Perioskoup is a WELLNESS/ENGAGEMENT tool, NOT a medical device

## Live URLs
- Homepage: https://official-perioskoup.vercel.app/
- Features: https://official-perioskoup.vercel.app/features
- For Dentists: https://official-perioskoup.vercel.app/for-dentists
- About: https://official-perioskoup.vercel.app/about
- Blog: https://official-perioskoup.vercel.app/blog
- Blog articles: /blog/what-is-periodontal-disease, /blog/efp-digital-innovation-award-2025, /blog/how-ai-is-changing-dental-monitoring, /blog/3-minute-routine-save-teeth, /blog/why-patients-forget-instructions, /blog/perioskoup-founding-story
- Pricing: https://official-perioskoup.vercel.app/pricing
- Waitlist: https://official-perioskoup.vercel.app/waitlist
- Contact: https://official-perioskoup.vercel.app/contact
- Privacy: https://official-perioskoup.vercel.app/privacy
- Terms: https://official-perioskoup.vercel.app/terms
- Static files: /robots.txt, /sitemap.xml, /llms.txt, /feed.xml, /manifest.json

## SEO/GEO Master Strategy Key Points
- "AI dental companion" = zero competition in search — first mover wins for years
- Three pillars: Clinical Authority (Dr. Anca), Technical SEO Perfection, GEO Readiness
- Dr. Anca must have Person/Physician schema with sameAs to EFP article
- Every content page needs FAQPage schema for featured snippets + AI citation
- llms.txt deployed for AI crawler guidance
- Answer capsules (2-3 sentence summaries) after every H2 for GEO
- EFP article (efp.org, DR 60+) is the #1 asymmetric SEO advantage
- Target keywords: "AI dental companion", "dental patient engagement app", "periodontal habit tracking", "dental AI app", "between visit dental care"
- Blog should target long-tail: "how to brush with periodontal disease", "interdental cleaning guide", "why do gums bleed"
- IndexNow for instant indexing on publish
- robots.txt must explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended

---

## AUDIT AGENTS — Run ALL in parallel

Create `audit-results/` directory. For each audit, read the source code, check the live site, and produce a detailed markdown file with: findings, score (1-10), and specific actionable fixes with code examples.

---

### 1. SEO Technical Audit (`audit-results/01-seo-technical.md`)
**Read skills first:** `~/.openclaw/workspace/skills/seo/SKILL.md`, `~/.openclaw/workspace/skills/pls-seo-audit/SKILL.md`

- Check ALL pages for: title tags (unique per page?), meta descriptions (unique?), canonical URLs (correct per page?), OG tags (unique per page?), Twitter cards
- Verify JSON-LD structured data on every page: Organization, SoftwareApplication, WebSite, BlogPosting, BreadcrumbList, FAQPage, Person schemas
- Check robots.txt completeness (AI crawlers allowed?), sitemap.xml (all pages + blog articles listed? correct URLs?), llms.txt accuracy
- Check hreflang implementation correctness
- Verify all internal links work (no dead links)
- Check heading hierarchy on every page (H1 → H2 → H3, no skips)
- Bundle size analysis for Core Web Vitals readiness
- Check for duplicate/thin content across pages
- Verify canonical URLs point to the RIGHT page (not all to homepage)
- Check if blog articles have unique OG images or share generic one

---

### 2. GEO Readiness Audit (`audit-results/02-geo-readiness.md`)
**Read skills first:** `~/.openclaw/workspace/skills/schema-markup-generator/SKILL.md`

- Does every content page have answer capsules (2-3 sentence direct answers) after H2 headings?
- Is FAQPage schema present on: homepage, features, for-dentists, about, each blog post?
- Are AI crawlers explicitly allowed in robots.txt? (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai, ChatGPT-User)
- Is llms.txt comprehensive, accurate, and following the specification?
- Does content use "question → direct answer → supporting detail" pattern for AI extraction?
- Is Dr. Anca's authority structured for AI citation? (Person schema, credentials, sameAs links)
- Is content quotable/extractable? (clear statements, not buried in complex layouts)
- Check against Perplexity/ChatGPT citation best practices
- Is there an RSS feed for content discovery?
- Compare current schema coverage vs what Rich Results Test would accept

---

### 3. Content Quality & Messaging Audit (`audit-results/03-content-quality.md`)
**Read skills first:** `~/.openclaw/workspace/skills/landing-page-roast/SKILL.md`

- Is the value proposition clear within 3 seconds on each page?
- Does every page answer "what's in it for me?" for BOTH audiences (dentists AND patients)?
- Apply the Value Equation: (Dream Outcome × Perceived Likelihood) ÷ (Time Delay × Effort)
- REGULATORY SCAN: find every instance of "compliance", "diagnose", "treat", "cure", "adherence", "therapeutic", "clinical guidance", "monitor inflammation", "track bleeding" — list exact file + line
- Are CTAs compelling, consistent, and well-placed?
- Is the EFP award used effectively on every page?
- Blog article quality: depth, accuracy, internal linking, keyword targeting, uniqueness
- What content is MISSING? What articles/pages should exist to establish topical authority?
- Is the "between visits" positioning hammered home enough?
- Does the pricing page create urgency?

---

### 4. Conversion & UX Audit (`audit-results/04-conversion-ux.md`)
**Read skills first:** `~/.openclaw/workspace/skills/landing-page-roast/SKILL.md`, `~/.openclaw/workspace/skills/ui-ux-design/SKILL.md`

- Waitlist form: friction analysis (field count, labels, placeholder text, validation, error states)
- CTA placement audit: is there a CTA visible at every scroll depth?
- Social proof: placement, quantity, credibility (is the EFP award above the fold?)
- Trust signals: GDPR badge, encryption mention, EFP badge — are they where decisions are made?
- Navigation: is information architecture logical for both dentist and patient personas?
- Scroll depth prediction: where would users drop off on each page?
- Exit intent: what's the last thing users see before leaving?
- Form submission: does it actually work? Error handling?
- 404 page: does it exist? Is it helpful?

---

### 5. Mobile Responsiveness Audit (`audit-results/05-mobile-responsive.md`)
**Read skills first:** `~/.openclaw/workspace/skills/responsive-design/SKILL.md`, `~/.openclaw/workspace/skills/mobile/SKILL.md`

- Check EVERY page component for responsive breakpoints (sm, md, lg, xl)
- Find hardcoded pixel widths that break on mobile (look for `style={{ width: XXX }}`, `maxWidth`, `gridTemplateColumns` without responsive alternatives)
- Check font sizes: are headings too large on mobile? (Dongle display fonts especially)
- Check padding/margins: are they responsive or fixed px?
- Hero sections: do they work at 320px, 375px, 414px, 768px?
- Navigation: is there a mobile hamburger menu? Does it work?
- Images: are they responsive? Do they overflow on mobile?
- Forms: are inputs full-width on mobile? Touch target sizes (min 44x44px)?
- Cards/grids: do multi-column layouts stack properly?
- Phone mockup component: does it scale or break?
- Horizontal scroll: check for any horizontal overflow on mobile
- Touch interactions: hover states have touch equivalents?
- Check `client/src/hooks/useMobile.tsx` — is it used consistently?
- Provide SPECIFIC CSS/Tailwind fixes for every issue found

---

### 6. Competitive Positioning Audit (`audit-results/06-competitive-positioning.md`)

- How does the site position against: PerioPredict, CareStack, Dental Monitoring, Overjet, Pearl, Dentistry.AI?
- Is the category creation ("AI dental companion") clear and differentiated from "dental practice management"?
- Is the "between visits" gap positioned as the #1 problem?
- What claims are made vs what could be stronger?
- What objections aren't addressed? (cost, integration, learning curve, data privacy, "my patients won't use an app")
- Is there a clear "why now?" urgency signal?
- What would a dentist comparing options see that's different about Perioskoup?

---

### 7. About & Team Page Audit (`audit-results/07-about-team.md`)

- Does the About page build sufficient trust for a health-tech product?
- Is Dr. Anca's authority MAXIMIZED? (EFP award, periodontist, practicing clinician, publications?)
- Founder titles: are they correct? (Anca = CDO/Periodontist, Eduard = CGO, Petrica = CTO & Head of AI)
- Should there be individual /team/anca, /team/eduard, /team/petrica pages for SEO?
- Is the founding story compelling and authentic?
- Missing elements: advisory board, clinical advisors, university partnerships, press mentions?
- Does the team section have proper Person schema for each founder?
- LinkedIn links, professional profiles?

---

### 8. Animation & Visual Polish Audit (`audit-results/08-animations-visual.md`)
**Read skills first:** `~/.openclaw/workspace/skills/animations/SKILL.md`, `~/.openclaw/workspace/skills/awwwards-design/SKILL.md`

- Review ALL animations in source code: scroll reveals, hover states, transitions, parallax
- Check for: jank, layout shifts, excessive animation, animation on load vs scroll
- Is `prefers-reduced-motion` respected? (check CSS and JS)
- Dot-grid hero background: effective or distracting?
- Hover states: consistent across all interactive elements?
- Page transitions: smooth or jarring?
- Compare visual quality against Awwwards-level dental/health sites
- Micro-interactions: buttons, form inputs, cards — do they feel alive?
- Loading states: skeleton screens? Spinners? Nothing?
- Provide SPECIFIC animation improvements with code (Framer Motion / CSS)
- Does the phone mockup in the hero animate or is it static?

---

### 9. Code Quality & Performance (`audit-results/09-code-performance.md`)
**Read skills first:** `~/.openclaw/workspace/skills/frontend-performance/SKILL.md`

- Bundle size breakdown: `pnpm build` output + what's bloating it
- Dependency audit: unused packages in package.json
- Component architecture: clean? Reusable? DRY?
- Image optimization: formats (webp?), lazy loading, srcset/sizes, CDN?
- CSS analysis: Tailwind purge working? Unused styles? Specificity issues?
- TypeScript: strict mode? Any `any` types? Type coverage?
- Accessibility deep dive: ARIA labels, semantic HTML, keyboard navigation, focus management, skip links, screen reader testing
- Lighthouse score estimation based on code review
- Code splitting: are routes lazy-loaded?
- Tree shaking: are heavy libraries fully imported instead of tree-shaken?
- Font loading strategy: FOUT/FOIT prevention?

---

### 10. Accessibility Audit (`audit-results/10-accessibility.md`)
**Read skills first:** `~/.openclaw/workspace/skills/accessibility/SKILL.md`, `~/.openclaw/workspace/skills/wcag-21-aa-web-ui-audit/SKILL.md`

- WCAG 2.1 AA full compliance check across all pages
- Color contrast: #F5F9EA on #0A171E (pass?), #8C9C8C on #0A171E (pass?), #C0E57A on #0A171E (pass?)
- Keyboard navigation: can every interactive element be reached via Tab?
- Focus indicators: visible on all focusable elements?
- Skip to main content link?
- Form labels: are all form inputs properly labeled?
- Image alt text: all images have meaningful alt text?
- ARIA: proper roles, states, properties on dynamic content?
- Screen reader: would the page flow make sense read linearly?
- Touch targets: minimum 44x44px on all interactive elements?
- Zoom: does the page work at 200% zoom?
- Heading hierarchy: semantic and logical on every page?
- Live regions for dynamic content (form submission feedback)?

---

### 11. Niche Domination Strategy (`audit-results/11-niche-domination.md`)
**Read skills first:** `~/.openclaw/workspace/skills/seo/SKILL.md`

- What content/pages are needed to OWN "AI dental companion" in search?
- Content gap analysis: what topics do competitors rank for that we don't cover?
- Schema markup missing to dominate rich results?
- Link building opportunities specific to dental/health tech (dental associations, universities, health publications)
- PR/media angles that would generate backlinks (EFP award announcement, founder story)
- Social proof to add: case studies, pilot results, testimonials, data visualizations
- Partnership pages: EFP, dental schools, insurance companies
- What would make perioskoup.com THE reference site for dental AI?
- Programmatic SEO opportunities: city pages, condition pages, procedure pages
- Content cluster strategy: pillar pages + supporting articles

---

### 12. E2E Testing & Reliability (`audit-results/12-testing-reliability.md`)
**Read skills first:** `~/.openclaw/workspace/skills/e2e-testing-patterns/SKILL.md`

- Scan for broken internal links (check every `<Link>` and `<a>` in source)
- Form validation: does the waitlist form handle: empty fields, invalid email, XSS, very long input?
- 404 page: does `/nonexistent-route` show a proper page?
- Error boundary: does `ErrorBoundary.tsx` catch render errors?
- Cross-browser: any CSS features that need fallbacks?
- What Playwright E2E tests should be written? Provide test code for:
  - Navigation works on all routes
  - Waitlist form submission
  - Mobile menu toggle
  - Blog article loading
  - 404 handling
- What unit tests should exist for critical components?
- Provide a `tests/` directory structure recommendation

---

## FINAL SYNTHESIS

After ALL 12 audits are complete, create `audit-results/FINAL-AUDIT.md`:

1. **Overall Score** (1-100) with breakdown per audit
2. **TOP 15 Highest-Impact Improvements** (ranked by impact ÷ effort)
3. **QUICK WINS** (< 1 hour each) — with exact code changes
4. **MEDIUM EFFORT** (1-5 hours each) — with implementation approach
5. **STRATEGIC PLAYS** (1-5 days each) — with scope and expected outcome
6. **LONG-TERM CONTENT PLAN** — next 90 days of content
7. **MOBILE-SPECIFIC FIXES** — every responsive issue with Tailwind/CSS fix
8. **SCHEMA FIXES** — complete corrected JSON-LD for every page
9. **2-WEEK SPRINT PLAN** — day-by-day prioritized action plan
10. **"If You Only Do 3 Things"** — the absolute highest-leverage moves

