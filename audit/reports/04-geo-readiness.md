# GEO Readiness Audit Report -- Perioskoup

**Audit date:** 2026-03-06
**Auditor:** Claude Opus 4.6 (GEO Specialist)
**Scope:** Generative Engine Optimization readiness across perioskoup.com
**Reference:** `audit/strategy-reference.md`

---

## Executive Summary

Perioskoup's GEO readiness is **strong** -- meaningfully ahead of most early-stage SaaS sites. The llms.txt ecosystem, robots.txt AI crawler directives, FAQPage schema coverage, and blog answer capsule implementation are all in place and well-executed. The site has clearly been through at least one GEO-focused optimization pass.

The remaining gaps are concentrated in three areas: (1) static pages lack answer capsules after H2 headings, (2) HTTP headers for AI signals are incomplete, and (3) statistics cited on the site lack formal academic source attribution. Fixing these will move the site from "good" to "best-in-class" for AI engine citability.

**Overall GEO Score: 7.5 / 10**

---

## 1. /llms.txt -- Content Quality

**Status: PASS -- Excellent**
**Severity: None**
**File:** `client/public/llms.txt`

The llms.txt file follows the llmstxt.org standard correctly and contains:

- Clear product description ("AI-powered dental companion application")
- Award credentials (EFP Digital Innovation Award 2025, 3rd Prize)
- Complete founder/team section with roles and authority links
- Feature list describing what the app does
- Regulatory disclaimer (wellness tool, not medical device)
- Business model (patient free, clinic EUR 39-199/mo)
- Content permissions section with explicit attribution instructions
- All key page URLs including blog articles
- Contact information (general, clinic, press)
- RSS feed link

**Quality assessment:** This is one of the better llms.txt files in the dental/health tech space. It gives an AI system everything needed to accurately describe Perioskoup in a single file read.

**Minor improvement:** Add Dr. Anca's ORCID or Google Scholar link if available (strategy reference mentions this but it is not yet present).

---

## 2. /llms-full.txt -- Content Quality

**Status: PASS -- Excellent**
**Severity: None**
**File:** `client/public/llms-full.txt`

The llms-full.txt file provides complete page content for all major routes:

- Homepage (hero, features overview, how it works, team, CTA)
- Features page (all 8 features with bullet points)
- For Dentists page (stats, clinical tools, founding clinic CTA)
- About page (mission, team bios, statistics)
- Pricing page (plans, FAQ with 4 Q&As)
- Blog articles (all 6 listed with titles, authors, dates, URLs)
- Key facts section
- Regulatory notice
- Content permissions with attribution instructions
- Complete site map

**Quality assessment:** Comprehensive. A non-JS crawler or LLM reading this file would have essentially the same informational content as a human visitor. The FAQ section on the pricing page is especially valuable for AI extraction.

**Minor improvement:** The full blog article body text is not included in llms-full.txt -- only titles and URLs. For maximum citability, consider adding the article body text (or at least the answer capsule summaries) to llms-full.txt.

---

## 3. robots.txt -- AI Crawler Directives

**Status: PASS -- Excellent**
**Severity: None**
**File:** `client/public/robots.txt`

Explicitly allows all major AI crawlers:

| Crawler | Directive | Owner |
|---------|-----------|-------|
| GPTBot | Allow: / | OpenAI |
| ChatGPT-User | Allow: / | OpenAI |
| Google-Extended | Allow: / | Google (Gemini) |
| anthropic-ai | Allow: / | Anthropic |
| ClaudeBot | Allow: / | Anthropic |
| PerplexityBot | Allow: / | Perplexity |
| Cohere-AI | Allow: / | Cohere |
| Bytespider | Allow: / | ByteDance |
| meta-externalagent | Allow: / | Meta |
| Diffbot | Allow: / | Diffbot |
| omgili | Allow: / | Omgili |
| * (wildcard) | Allow: / | All others |

Also includes:
- Sitemap reference
- Llms-txt and Llms-full-txt directives (non-standard but forward-looking)
- Comment explaining SPA + plain text alternative

**Missing crawlers to consider (low severity):**
- `CCBot` (Common Crawl, used by many AI training datasets)
- `YouBot` (You.com)
- `Applebot-Extended` (Apple Intelligence)

---

## 4. FAQPage Schema -- Coverage by Page

**Status: PASS -- Good coverage**
**Severity: LOW for missing pages**

| Page | FAQPage Schema? | Question Count | Notes |
|------|----------------|----------------|-------|
| Home (`/`) | YES | 5 | What is Perioskoup, Who for, Medical device, Cost, Data safety |
| Features (`/features`) | YES | 3 | Patient features, Dentist features, GDPR |
| For Dentists (`/for-dentists`) | YES | 6 | Practice help, Medical device, Data security, Platforms, Getting started, Cost |
| About (`/about`) | YES | 4 | Who founded, What award, Where based, Mission |
| Pricing (`/pricing`) | YES | 3 | Cost, Free trial, Patient plan |
| Blog index (`/blog`) | YES | 2 | Topics covered, Who writes |
| Blog posts (`/blog/*`) | YES | 2-3 per article | Specific to article topic |
| Contact (`/contact`) | NO | -- | No FAQ schema |
| Waitlist (`/waitlist`) | NO | -- | noindex page, acceptable |
| Privacy (`/privacy`) | NO | -- | noindex page, acceptable |
| Terms (`/terms`) | NO | -- | noindex page, acceptable |

**Finding:** FAQPage schema is present on all 7 indexable content pages except Contact. This is strong coverage.

**Recommendation [LOW]:** Add 2-3 FAQs to the Contact page (e.g., "How quickly do you respond?", "Can I request a demo?", "Do you support clinics outside Romania?"). This is a low-priority item since Contact is not a primary content page.

**Critical SPA caveat:** All FAQPage schema is injected via React (runtime JavaScript). Search engine crawlers that render JS (Google, Bing) will see it, but crawlers that do not render JS will not. The noscript fallback in `index.html` includes a FAQ section with `<dl>` markup, which partially mitigates this for the homepage. Other pages have no noscript fallback.

**Recommendation [MEDIUM]:** For maximum AI engine coverage, consider adding the most important FAQ schema (Home page's 5 questions) to `index.html` as a static `<script type="application/ld+json">` block alongside the existing @graph schema. This ensures it survives even without JS execution.

---

## 5. Answer Capsules -- AI-Extractable Summaries After H2s

**Status: PARTIAL -- Blog posts excellent, static pages missing**
**Severity: MEDIUM**

### Blog Posts (all 6) -- EXCELLENT

Every blog article has a comprehensive `answerCapsules` map keyed by H2 heading text. The `renderBody()` function in `BlogPost.tsx` (line 688) renders each capsule as a visually distinct `<div>` with a lime-green left border immediately after the corresponding `<h2>`. This is the gold standard for AI extraction.

| Article | H2 Count | Capsules | Coverage |
|---------|----------|----------|----------|
| what-is-periodontal-disease | 9 | 9 | 100% |
| how-ai-is-changing-dental-monitoring | 7 | 7 | 100% |
| 3-minute-routine-save-teeth | 5 | 5 | 100% |
| efp-digital-innovation-award-2025 | 5 | 5 | 100% |
| why-patients-forget-instructions | 6 | 6 | 100% |
| building-the-bridge-perioskoup-story | 5 | 5 | 100% |

### Static Pages -- MISSING

No static page (Home, Features, For Dentists, About, Pricing) has answer capsule paragraphs after H2 headings. The content after each H2 is typically a short tagline or directly jumps into feature cards/stats.

**Specific gaps:**

- **Home.tsx:** H2s ("Everything your smile needs. In one place.", "From Chair to Chat.", "Built by people who care about your health.", "Be first when we launch.") have no summary paragraph suitable for AI extraction. The subtext under each is a short tagline, not a complete answer.
- **Features.tsx:** The page header has a descriptive paragraph, but the H2 "Ready to get started?" CTA section has no answer capsule.
- **ForDentists.tsx:** H2s ("Everything you need in one place.", "Be a founding clinic.") lack summary capsules.
- **About.tsx:** H2s ("Close the gap between visits.", "Built by clinicians, for clinicians.", "Want to be part of the story?") lack summary paragraphs.
- **Pricing.tsx:** H2 "Common questions" has FAQ content but no summary capsule.

**Recommendation [MEDIUM]:** Add a 1-2 sentence summary paragraph immediately after each H2 on static pages. These should be factual, self-contained statements that an AI can extract as a standalone answer. Example for the Home features section:

```
<h2>Everything your smile needs. In one place.</h2>
<p class="answer-capsule">Perioskoup is an AI dental companion app that combines personalised habit coaching, daily reminders, progress tracking, secure clinician messaging, and a GDPR-compliant education library -- giving patients and dentists everything they need between appointments.</p>
```

---

## 6. Dr. Anca's Quote and Credentials -- Prominence for Citation

**Status: PASS -- Well placed**
**Severity: None**

### Quote Placement

The strategy-required quote ("Perioskoup was born out of two big challenges...") appears in:

1. **Home.tsx hero section** (line 243-249) -- `<blockquote>` with proper `<footer>` attribution, prominently positioned above the fold. This is the #1 position for citation extraction.
2. **llms.txt** (line 25) -- Quoted in the hero content section.
3. **llms-full.txt** (line 25-26) -- Full quote with attribution.
4. **noscript fallback in index.html** (line 221-224) -- Available to non-JS crawlers.

### Credentials Placement

Dr. Anca's credentials appear in:

- **Home.tsx** team section: "Periodontist, Bucharest, Romania" + photo + quote
- **Home.tsx** social proof section: Photo, full name, "Periodontist & Co-founder, Perioskoup"
- **About.tsx** team section: "DMD, PhD in Periodontology" + bio
- **About.tsx** Person schema: Complete structured data with knowsAbout, award, hasOccupation
- **index.html** @graph: Person entity with @id, description, award, knowsAbout, sameAs
- **llms.txt**: Full credentials, EFP authority link
- **BlogPost.tsx**: Author role shown on every article she wrote (4 of 6 articles)

### EFP Award Badge

The EFP award is prominently displayed:
- Hero badge (Home, above the fold)
- Dedicated EFP Award section (Home)
- About page recognition section
- Ticker bar items
- Social proof across multiple pages

**Assessment:** Dr. Anca's authority signals are comprehensive and well-distributed. An AI system querying "who is behind Perioskoup" or "EFP digital innovation award 2025" would find ample citable content.

**Minor improvement:** The About.tsx Person schema (line 40-57) uses `"@type": "Person"` rather than `"@type": "Physician"`. While the strategy reference mentions Physician schema, using Person with detailed occupation data is acceptable and avoids potential schema validation issues. However, adding `"@type": ["Person", "Physician"]` with `"medicalSpecialty": "Periodontology"` would strengthen the medical authority signal.

---

## 7. Statistics -- Source Attribution

**Status: PARTIAL -- Statistics present, sources vague**
**Severity: MEDIUM**

### Statistics Found

| Statistic | Page(s) | Source Cited |
|-----------|---------|-------------|
| 85% treatment acceptance | Home, For Dentists | "digital health research" |
| 40% fewer no-shows | Home, For Dentists | "digital health research" |
| 3x higher engagement | For Dentists | "digital health research" |
| 50% of adults have periodontal disease | About, Blog | "EFP" (in blog text) |
| 48h until patients forget care instructions | About | None |
| 60% don't return for follow-up | About | None |
| 3x better outcomes with digital support | About | "digital health research" |
| 80% of info forgotten within 24h | Blog post | "Journal of the American Dental Association" |
| 30+ founding clinics | Home, Waitlist | Internal claim |
| 500+ on the waitlist | Home, Waitlist | Internal claim |

### Problem

The attribution "digital health research" is too vague for AI systems to verify or cite. When an AI engine like Perplexity, ChatGPT, or Google Gemini encounters a statistic, it evaluates the source. Unsourced or vaguely sourced statistics are less likely to be cited, or may be cited with a caveat.

**Recommendation [MEDIUM]:**

1. Replace "digital health research" with specific journal references where possible. For the 40% no-show reduction, 85% treatment acceptance, and 3x engagement claims, cite specific studies or meta-analyses.
2. At minimum, add a visible micro-citation like "(Source: meta-analysis of 12 digital health studies, 2023)" or "(Source: WHO Oral Health Report 2022)".
3. For the blog posts, the in-text citations (JADA, BDJ) are excellent. Apply this same standard to the static pages.
4. Consider adding a `<cite>` HTML element around source references -- this semantic markup helps AI parsers identify authoritative claims.

---

## 8. HTTP Headers -- AI Signals

**Status: PARTIAL -- Some headers present, gaps remain**
**Severity: MEDIUM**

### What exists (vercel.json)

```json
{ "source": "/", "headers": [{ "key": "X-Llms-Txt", "value": "https://perioskoup.com/llms.txt" }] },
{ "source": "/llms.txt", "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }] },
{ "source": "/llms-full.txt", "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }] }
```

### What is missing

**X-Llms-Txt header only on `/`**: The `X-Llms-Txt` header is set only for the homepage route. Since Vercel rewrites all routes to `index.html`, the header should be applied to all routes so any page an AI crawler visits includes the llms.txt pointer.

**No X-Robots-Tag header**: The `server/index.ts` Express server does not set any `X-Robots-Tag` header. While the HTML `<meta name="robots">` tag handles this for rendered pages, a server-level `X-Robots-Tag: all` header would reinforce the signal for crawlers that read HTTP headers before rendering.

**Recommendation [MEDIUM]:**

1. Expand the `X-Llms-Txt` header to apply to all routes:
   ```json
   { "source": "/(.*)", "headers": [{ "key": "X-Llms-Txt", "value": "https://perioskoup.com/llms.txt" }] }
   ```
   (Note: verify this does not conflict with the SPA rewrite rule in vercel.json.)

2. Add an `X-Robots-Tag` header for AI-friendliness:
   ```json
   { "source": "/(.*)", "headers": [{ "key": "X-Robots-Tag", "value": "all" }] }
   ```

3. Consider adding a `Link` header pointing to llms-full.txt:
   ```json
   { "key": "Link", "value": "<https://perioskoup.com/llms-full.txt>; rel=\"alternate\"; type=\"text/plain\"" }
   ```

---

## 9. Entity Markup -- SoftwareApplication Definition

**Status: PASS -- Present and well-structured**
**Severity: None**

The `client/index.html` file contains a comprehensive `@graph` JSON-LD block (lines 62-172) with four interconnected entities:

### WebSite
- @id: `https://perioskoup.com/#website`
- SearchAction with URL template (sitelinks search box)
- Publisher reference to Organization

### Organization
- @id: `https://perioskoup.com/#organization`
- legalName: "Perioskoup SRL"
- foundingDate, foundingLocation (Bucharest, RO)
- founders array with @id cross-references
- award: "EFP Digital Innovation Award 2025 -- 3rd Prize"
- sameAs: LinkedIn, Instagram, TikTok, EFP announcement
- email: hello@perioskoup.com

### Person (Dr. Anca)
- @id: `https://perioskoup.com/#anca-constantin`
- honorificPrefix, givenName, familyName
- description, image, award
- knowsAbout array (5 topics)
- hasOccupation with location
- sameAs: EFP announcement URL

### SoftwareApplication
- @id: `https://perioskoup.com/#app`
- operatingSystem: "iOS, Android"
- applicationCategory: "HealthApplication"
- applicationSubCategory: "Dental Health"
- featureList (string, comma-separated)
- countriesSupported: "RO, GB, EU"
- offers: EUR 0, PreOrder availability
- author reference to Organization

**Assessment:** This is a well-structured entity graph. The @id cross-referencing between entities (Organization <-> Person <-> SoftwareApplication) is correctly implemented, allowing search engines to build a knowledge graph of Perioskoup.

**Minor improvements:**
1. The `featureList` field is a comma-separated string. Schema.org prefers an array of `DefinedTerm` or `Text` items. This is a minor schema quality issue, not a blocker.
2. Add `screenshot` property with a URL to an app screenshot image -- Google uses this for SoftwareApplication rich results.
3. Consider adding `aggregateRating` once reviews/ratings are available.

---

## 10. Featured Snippet Structure -- Definition Lists, Numbered Steps, Tables

**Status: PARTIAL -- Blog posts strong, static pages need work**
**Severity: LOW**

### What is well-structured for featured snippets

**Blog posts:** The blog articles contain excellent featured snippet candidates:
- **Numbered lists** (e.g., "The 3-Minute Routine" with Step 1/2/3, "What You Can Do at Home" with 5 numbered steps)
- **Staged progressions** (e.g., "The Stages of Gum Disease" with Stage 1-4)
- **Bold key terms** with explanations ("Gingivitis", "Periodontitis", "Scaling and root planing")
- **Blockquotes** from authoritative sources (EFP)

**Home page:** The "How It Works" section uses numbered steps (01 Scan, 02 Analyze, 03 Engage) -- ideal for "how does Perioskoup work" featured snippets.

**noscript fallback:** The `index.html` noscript block includes `<dl>` (definition list) markup for the FAQ and `<ol>` (ordered list) for How It Works -- both strong semantic structures for non-JS crawlers.

### What is missing

**Static pages lack definition-style content:**
- Features page lists features as cards, not as a semantic `<dl>` definition list. An AI querying "what features does Perioskoup offer" would benefit from a `<dl>` or `<table>` structure.
- For Dentists page stats (40%, 3x, 85%) are rendered as visual cards, not as a structured `<table>` element.
- About page statistics ("50% of adults", "48h", "60%", "3x") are also rendered as visual cards without semantic table markup.
- Pricing page plans are rendered as cards, not as a comparison `<table>`.

**Recommendation [LOW]:**

1. Consider adding a `<table>` element (hidden visually if needed, or as a visible comparison) on the Pricing page for plan comparison -- this is a prime featured snippet target for "Perioskoup pricing" queries.
2. On the For Dentists page, the stats could be wrapped in a `<table>` with headers "Metric" and "Impact" for better AI extraction.
3. These are low priority because the blog posts already provide strong structured content, and the static page cards are still parseable by modern AI engines.

---

## Summary Table

| # | Check Item | Status | Severity | Score |
|---|-----------|--------|----------|-------|
| 1 | /llms.txt exists and quality | PASS | None | 9/10 |
| 2 | /llms-full.txt exists and quality | PASS | None | 8.5/10 |
| 3 | robots.txt AI crawlers | PASS | None | 9.5/10 |
| 4 | FAQPage schema on content pages | PASS | LOW | 8.5/10 |
| 5 | Answer capsules after H2s | PARTIAL | MEDIUM | 6/10 |
| 6 | Dr. Anca quote + credentials | PASS | None | 9/10 |
| 7 | Statistics with sources | PARTIAL | MEDIUM | 5/10 |
| 8 | HTTP headers for AI | PARTIAL | MEDIUM | 5.5/10 |
| 9 | SoftwareApplication entity | PASS | None | 9/10 |
| 10 | Featured snippet structure | PARTIAL | LOW | 6.5/10 |

---

## Priority Fix List

### HIGH PRIORITY (Do this week)

**H1 -- Expand X-Llms-Txt header to all routes**
File: `vercel.json`
Change the `X-Llms-Txt` header source from `"/"` to `"/(.*)"` so every page response includes the llms.txt pointer. Verify it does not conflict with the existing rewrite rule.

**H2 -- Add static FAQPage schema to index.html**
File: `client/index.html`
Add the Home page's 5 FAQ questions as a second `<script type="application/ld+json">` block in the `<head>`. This ensures the most important FAQs are available in the initial HTML response without requiring JavaScript execution.

### MEDIUM PRIORITY (Do within 2 weeks)

**M1 -- Add answer capsule paragraphs to static pages**
Files: `Home.tsx`, `Features.tsx`, `ForDentists.tsx`, `About.tsx`, `Pricing.tsx`
After each H2 heading, add a 1-2 sentence factual summary paragraph. This is the single highest-impact GEO improvement available. Style it consistently with the blog capsule pattern (lime-green left border, slightly different background).

**M2 -- Replace vague "digital health research" stat sources**
Files: `Home.tsx`, `ForDentists.tsx`, `About.tsx`
Replace "digital health research" with specific citations. If exact journal sources are not available, use a more specific attribution like "meta-analysis of digital patient engagement studies (2020-2024)" or similar. Add `<cite>` elements around source references.

**M3 -- Add X-Robots-Tag header**
File: `vercel.json`
Add `{ "source": "/(.*)", "headers": [{ "key": "X-Robots-Tag", "value": "all" }] }` to reinforce AI-friendliness at the HTTP level.

**M4 -- Add blog article summaries to llms-full.txt**
File: `client/public/llms-full.txt`
For each of the 6 blog articles, add at least the answer capsule summaries (not necessarily the full body text). This ensures AI systems that read llms-full.txt get the blog's key insights.

### LOW PRIORITY (Nice to have)

**L1 -- Add Physician schema type for Dr. Anca**
File: `client/index.html`
Change `"@type": "Person"` to `"@type": ["Person", "Physician"]` and add `"medicalSpecialty": "Periodontology"` to the Person entity. This strengthens the medical authority signal.

**L2 -- Add missing AI crawler entries to robots.txt**
File: `client/public/robots.txt`
Add explicit `Allow: /` directives for `CCBot`, `YouBot`, and `Applebot-Extended`.

**L3 -- Add screenshot to SoftwareApplication schema**
File: `client/index.html`
Add `"screenshot": "/images/og-image.jpg"` (or a dedicated app screenshot) to the SoftwareApplication entity.

**L4 -- Add ORCID/Google Scholar links for Dr. Anca**
Files: `client/index.html`, `client/public/llms.txt`, `About.tsx`
If Dr. Anca has ORCID or Google Scholar profiles, add them to the Person entity `sameAs` array and to llms.txt. This is a strong E-E-A-T signal.

**L5 -- Add FAQPage schema to Contact page**
File: `Contact.tsx`
Add 2-3 FAQs: "How quickly does Perioskoup respond to enquiries?", "Can I request a product demo?", "Do you work with clinics outside Romania?"

**L6 -- Add semantic table/dl markup for pricing comparison**
File: `Pricing.tsx`
Add a hidden or visible `<table>` element comparing Patient vs Clinic plan features. This is a featured snippet target.

---

## What is Working Exceptionally Well

1. **llms.txt ecosystem** -- The combination of llms.txt, llms-full.txt, robots.txt directives, HTML `<link>` tags, and noscript fallback is one of the most complete implementations available. This is significantly ahead of the market.

2. **Blog answer capsules** -- Every H2 in every blog article has a dedicated answer capsule rendered immediately after the heading. The data structure (`answerCapsules: Record<string, string>`) and rendering logic are clean and maintainable. This is best-practice GEO.

3. **Entity graph in index.html** -- The @graph with cross-referenced WebSite, Organization, Person, and SoftwareApplication entities gives AI systems a complete picture of Perioskoup in a single static HTML parse. The @id linking between entities is correctly implemented.

4. **noscript fallback** -- The comprehensive noscript block in index.html provides full homepage content (hero, features, how it works, team, FAQ as `<dl>`, contact) to non-JS crawlers. This is a critical SPA mitigation that most sites miss entirely.

5. **Dr. Anca's authority presence** -- Multiple quotes, credentials, and structured data across the site create a strong, consistent authority signal. The EFP award is prominently placed and properly sourced with the official EFP URL.

---

*Report generated by GEO Specialist audit agent. All findings based on source code analysis of the perioskoup.com codebase as of 2026-03-06.*
