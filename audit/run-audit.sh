#!/bin/bash
# Perioskoup Website Multi-Agent Audit
# Spins 6 Claude Code agents in parallel, each focused on a different audit dimension
# Then a 7th agent synthesizes all reports into a final executive summary

set -euo pipefail
cd "$(dirname "$0")/.."
AUDIT_DIR="$(pwd)/audit"
REPORTS_DIR="$AUDIT_DIR/reports"
mkdir -p "$REPORTS_DIR"

STRATEGY="$AUDIT_DIR/strategy-reference.md"
SITE_URL="https://perioskoup.com"

echo "🏛️ Perioskoup Multi-Agent Website Audit"
echo "========================================="
echo "Strategy: $STRATEGY"
echo "Site: $SITE_URL"
echo "Reports: $REPORTS_DIR"
echo ""

# Agent 1: Content & Messaging Audit
echo "🚀 Agent 1: Content & Messaging..."
claude -p --dangerously-skip-permissions "You are a content strategist auditing perioskoup.com against its SEO/GEO strategy.

READ the strategy reference at: audit/strategy-reference.md

Then READ every page file in client/src/pages/ (Home.tsx, Features.tsx, ForDentists.tsx, Pricing.tsx, About.tsx, Blog.tsx, Contact.tsx, Waitlist.tsx).

Audit for:
1. Does the hero convey 'AI dental companion for between-visit care' in under 5 seconds?
2. Is the value proposition clear on each page?
3. Are trust signals present (EFP award, 30+ clinic waitlist, Dr. Anca credentials)?
4. Is Dr. Anca's EFP quote present and prominent?
5. Is there clear patient-facing vs dentist-facing messaging?
6. Are CTAs compelling and obvious on every page?
7. Does the 'For Dentists' page focus on ROI, workflow, adherence stats?
8. Are answer capsules (short summary paragraphs) present after H2 headings for GEO?
9. Is the copy persuasive? What's missing?
10. Category ownership: does the site reinforce 'AI dental companion' as a category?

Write your full audit report to: audit/reports/01-content-messaging.md
Format: findings with severity (CRITICAL/HIGH/MEDIUM/LOW), specific file:line references, and actionable recommendations." &

# Agent 2: Technical SEO Audit
echo "🚀 Agent 2: Technical SEO..."
claude -p --dangerously-skip-permissions "You are a technical SEO expert auditing perioskoup.com.

READ audit/strategy-reference.md for requirements.

Then audit the codebase:
1. Check server/index.ts and vite.config.ts for SSR/pre-rendering setup
2. Check all pages in client/src/pages/ for react-helmet-async usage — verify every page has: title, meta description, canonical URL, Open Graph tags (og:title, og:description, og:image, og:url), Twitter Card tags
3. Check for structured data: SoftwareApplication schema, Organization schema, FAQPage schema, Physician schema for Dr. Anca
4. Check public/robots.txt — are GPTBot, ClaudeBot, PerplexityBot, GoogleOther allowed?
5. Check for /sitemap.xml generation
6. Check for hreflang tags
7. Check for IndexNow integration
8. Check canonical URLs on every page
9. Check for proper heading hierarchy (H1 → H2 → H3) on each page
10. Check image alt tags across all components

Write your full audit report to: audit/reports/02-technical-seo.md
Format: findings with severity (CRITICAL/HIGH/MEDIUM/LOW), specific file:line references, and actionable recommendations." &

# Agent 3: User Journey & UX Audit
echo "🚀 Agent 3: User Journey & UX..."
claude -p --dangerously-skip-permissions "You are a UX strategist auditing perioskoup.com's user journeys.

READ audit/strategy-reference.md for requirements.

Then READ: client/src/App.tsx (routing), client/src/components/Navbar.tsx, client/src/components/Footer.tsx, and ALL pages in client/src/pages/.

Audit for:
1. Patient journey: Home → Features → Waitlist — is this path clear and frictionless?
2. Dentist journey: Home → For Dentists → Contact/Waitlist — is this path clear?
3. Navigation: can users easily distinguish patient vs dentist paths?
4. Mobile experience: check useMobile hook usage, responsive patterns
5. CTA placement: is there a CTA above the fold on every page? Is the waitlist signup obvious?
6. Trust signals above the fold: EFP award, clinic count, Dr. Anca
7. Information architecture: does the page order make sense?
8. Friction points: where might a user drop off?
9. Footer: does it provide clear next steps?
10. 404 page: is it helpful?

Write your full audit report to: audit/reports/03-user-journey-ux.md
Format: findings with severity, specific recommendations with file references." &

# Agent 4: GEO Readiness Audit
echo "🚀 Agent 4: GEO Readiness..."
claude -p --dangerously-skip-permissions "You are a Generative Engine Optimization (GEO) specialist auditing perioskoup.com.

READ audit/strategy-reference.md for requirements.

Then check:
1. Does /llms.txt exist? (check public/ directory) — content quality?
2. Does /llms-full.txt exist? Content quality?
3. robots.txt: are AI crawlers explicitly allowed?
4. FAQPage schema: is it on content pages? Check all pages in client/src/pages/
5. Answer capsules: after every H2, is there a short summary paragraph that AI can extract?
6. Dr. Anca's quote and credentials — prominently placed for citation?
7. Are statistics cited with sources (for AI to reference)?
8. HTTP headers: check server/index.ts for X-Robots-Tag or similar
9. Entity markup: is Perioskoup clearly defined as a SoftwareApplication?
10. Is content structured for featured snippets (definition lists, numbered steps, tables)?

Write your full audit report to: audit/reports/04-geo-readiness.md
Format: findings with severity, specific recommendations." &

# Agent 5: Schema & Structured Data Deep Audit
echo "🚀 Agent 5: Schema & Structured Data..."
claude -p --dangerously-skip-permissions "You are a Schema.org structured data expert auditing perioskoup.com.

READ audit/strategy-reference.md for requirements.

Search the entire codebase for any JSON-LD, schema, or structured data:
grep -r 'application/ld+json' client/src/ server/
grep -r 'schema.org' client/src/ server/
grep -r 'itemtype' client/src/ server/

Then audit:
1. SoftwareApplication schema: present? Complete? (name, description, applicationCategory, operatingSystem, offers, aggregateRating)
2. Organization schema: present? (name, url, logo, sameAs, contactPoint)
3. FAQPage schema: on which pages? Is it valid?
4. Physician schema for Dr. Anca: present? (name, medicalSpecialty, affiliation with EFP, award, sameAs for ORCID/Scholar)
5. BreadcrumbList schema: present on inner pages?
6. WebSite schema with SearchAction?
7. Are all schemas valid JSON-LD? Any syntax issues?
8. Missing schemas that the strategy requires?

Write your full audit report to: audit/reports/05-schema-structured-data.md
Format: findings with severity, exact code needed for missing schemas." &

# Agent 6: Competitive Positioning & Story Audit
echo "🚀 Agent 6: Competitive Positioning & Story..."
claude -p --dangerously-skip-permissions "You are a brand strategist auditing perioskoup.com's competitive positioning and storytelling.

READ audit/strategy-reference.md for requirements.

Then READ all page content in client/src/pages/ and client/src/components/.

Audit for:
1. Does the site clearly differentiate from competitors (PerioPredict, CareStack)?
2. Is 'AI dental companion' established as a new category (not just another dental software)?
3. Is the founding story compelling? Dr. Anca's journey from clinical frustration to innovation?
4. Does the site answer 'why now?' — the timing of AI + dental gap
5. Social proof strength: 30+ clinics, EFP award — is it leveraged enough?
6. Emotional resonance: does the site make patients feel cared for between visits?
7. Dentist persuasion: does it make dentists feel this solves their #1 pain (patient adherence)?
8. Is the 'between-visit care gap' problem articulated before the solution?
9. Brand voice consistency across pages
10. What's the strongest thing on the site? What's the weakest?

Write your full audit report to: audit/reports/06-positioning-story.md
Format: findings with severity, specific copy recommendations." &

echo ""
echo "⏳ 6 agents running in parallel. Waiting for all to complete..."
wait
echo ""
echo "✅ All 6 agents complete. Synthesizing final report..."
echo ""

# Agent 7: Synthesis — reads all 6 reports and creates executive summary
claude -p --dangerously-skip-permissions "You are a senior consultant synthesizing 6 audit reports for Perioskoup.com into one executive summary.

READ all reports:
- audit/reports/01-content-messaging.md
- audit/reports/02-technical-seo.md
- audit/reports/03-user-journey-ux.md
- audit/reports/04-geo-readiness.md
- audit/reports/05-schema-structured-data.md
- audit/reports/06-positioning-story.md

Create an executive summary at: audit/reports/00-EXECUTIVE-SUMMARY.md

Structure:
1. **Overall Score** (A-F grade for each dimension)
2. **Top 10 Critical Fixes** — the most impactful changes, ordered by priority
3. **Quick Wins** — things that can be fixed in under 1 hour each
4. **Content Gaps** — what's missing from the site vs the strategy
5. **Schema Checklist** — what exists vs what's needed (table format)
6. **User Journey Gaps** — where users might drop off
7. **GEO Readiness Score** — how ready is the site for AI search engines
8. **Competitive Moat Status** — how strong is the category ownership
9. **Recommended Sprint Plan** — 1-week action plan, prioritized

Be specific. Reference exact files and line numbers from the sub-reports. This is for the founder — make it actionable."

echo ""
echo "🏛️ AUDIT COMPLETE"
echo "================="
echo "Executive Summary: audit/reports/00-EXECUTIVE-SUMMARY.md"
echo "All reports in: audit/reports/"
ls -la "$REPORTS_DIR"
