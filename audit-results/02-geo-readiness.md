# GEO Readiness Audit — Perioskoup
**Audit Date:** 2026-03-06
**Auditor:** GEO Specialist (Claude Sonnet 4.6)
**Site:** https://official-perioskoup.vercel.app / https://perioskoup.com
**Branch:** fix/final-launch-audit

---

## Overall Score: 7.8 / 10

Strong foundation with several genuine strengths. The most critical gaps are
content that exists only inside JavaScript (invisible to non-JS crawlers),
a duplicate line in llms.txt, missing `dateModified` freshness in BlogPosting
schema, missing `speakable` schema for voice/AI extraction, and the llms-full.txt
not including the full text of blog post bodies (only titles and URLs). Also, the
`building-the-bridge` blog post description is inaccurate in the RSS feed.

---

## Category Scores

| Category | Score | Status |
|---|---|---|
| AI Crawler Access (robots.txt) | 10/10 | Excellent |
| llms.txt completeness | 7/10 | One duplicate line; missing `dateModified` info |
| llms-full.txt completeness | 6/10 | Blog body text absent; inaccurate RSS description reference |
| Answer capsules | 9/10 | All blog posts have them; non-blog pages do not |
| FAQPage schema | 8/10 | Present on all key pages; blog posts have conditional logic gap |
| noscript fallback | 8/10 | Solid; pricing/FAQ page not in noscript; lacks schema fallback |
| Dr. Anca Person schema | 8/10 | Good; missing `alumniOf`, `credential`, `url` fields |
| Citation-ready content | 8/10 | DOIs on ForDentists/About; blog body text has inline sources |
| Entity definitions | 8/10 | Organization, Person, SoftwareApplication all present |
| RSS feed | 9/10 | Well-formed; one inaccurate description (`product designer` vs `AI specialist`) |
| Content extractability (SPA) | 7/10 | noscript covers homepage only; other pages invisible to non-JS crawlers |
| Content quotability | 8/10 | Blockquotes with attribution are present throughout |

---

## Issues — Exhaustive

### CRITICAL (blocks AI citation)

---

**ISSUE GEO-01: llms-full.txt does not contain blog post body text**
- File: `client/public/llms-full.txt` lines 287–305
- Current state: Lists blog posts with title, author, and URL only — no body content
- Impact: AI crawlers using llms-full.txt cannot read the full article text without executing JavaScript. The llms.txt spec's purpose is to provide complete extractable content for non-JS crawlers.
- Fix: Add the full plain-text body of each blog article under its URL heading in llms-full.txt. Each article should appear as:
  ```
  ## Blog: What Is Periodontal Disease? (/blog/what-is-periodontal-disease)
  Author: Dr. Anca Laura Constantin — Periodontist & Co-founder, Perioskoup
  Published: 2025-11-12
  ...full body text...
  ```

---

**ISSUE GEO-02: Only the homepage is covered by noscript fallback**
- File: `client/index.html` lines 209–302
- Impact: Non-JS crawlers (including some AI crawlers) fetching `/features`, `/for-dentists`, `/about`, `/pricing`, or any blog post URL receive a blank page — no content whatsoever. The noscript in `index.html` only fires on the root HTML file and only renders homepage content. Client-side routing means subpages never deliver server-side HTML content.
- Fix (short-term): Expand llms-full.txt to include all page content verbatim (already partially done). Add a clear note in every page's `<Helmet>` that directs crawlers to llms-full.txt. Long-term: implement SSR or pre-rendering (Vite SSG or Vercel Edge functions) so each route returns crawlable HTML.

---

**ISSUE GEO-03: llms.txt line 39 — exact duplicate of line 37**
- File: `client/public/llms.txt` lines 37 and 39
- Both lines read: `- GDPR-compliant data storage in EU-based servers`
- Fix: Remove the duplicate at line 39.

---

### HIGH SEVERITY (reduces AI extraction quality)

---

**ISSUE GEO-04: Dr. Anca Person schema missing `credential`, `alumniOf`, and `url` fields**
- Files: `client/index.html` lines 115–148; `client/src/pages/About.tsx` lines 23–43
- Current state: The Person schema has `award`, `knowsAbout`, `medicalSpecialty`, and `sameAs`. Missing fields that AI knowledge-graph systems use for entity disambiguation:
  - `hasCredential` / `credential` — links to the DMD and Periodontology specialisation credential entities
  - `alumniOf` — the university/institution where she graduated
  - `url` — a direct canonical URL for the person entity (not the organization)
  - `nationality` — Romanian
  - `worksFor` should have `url` filled in on the About page (it has `@id` but no `url`)
- Fix: See corrected JSON-LD in the Schema Code section below.

---

**ISSUE GEO-05: `BlogPosting` schema missing `dateModified` and `wordCount`**
- File: `client/src/pages/BlogPost.tsx` lines 781–795
- Current state: `"dateModified": article.date` — sets dateModified identical to datePublished, meaning every re-build makes articles appear stale/unupdated.
- Fix: Add a `dateModified` field to each article object in the ARTICLES map and pass it independently. Also add `wordCount` (approximate) and `inLanguage: "en-GB"` for entity enrichment.

---

**ISSUE GEO-06: `BlogPosting` author schema is missing `sameAs` for Eduard Ciugulea**
- File: `client/src/pages/BlogPost.tsx` lines 763–779
- Current state: The `else` branch for non-Anca authors has no `sameAs` array. Eduard Ciugulea's LinkedIn URL is in llms.txt but not in schema.
- Fix: Add `"sameAs": ["https://www.linkedin.com/in/eduard-ciugulea/"]` to the Eduard author schema branch.

---

**ISSUE GEO-07: `Speakable` schema entirely absent across all pages**
- All pages
- Speakable schema (`https://schema.org/SpeakableSpecification`) marks the 2–3 most answer-ready sentences on a page for voice search and AI extraction. Google uses it for Featured Snippets. No page has it.
- Fix: Add speakable schema to the `<script type="application/ld+json">` on each page, pointing at the answer capsule elements (could use CSS selector or XPath reference to the answer-capsule divs).

---

**ISSUE GEO-08: `Pricing` page FAQPage schema omits the actual pricing figures**
- File: `client/src/pages/Pricing.tsx` lines 41–49
- Current state: The FAQPage answers say "free for patients during beta" and "clinic pricing announced closer to launch" — but the llms-full.txt and CLAUDE.md both state the clinic price is EUR 39–199/month launching March 2026. The schema avoids committing to this figure, which is accurate (pricing is blurred in UI per CLAUDE.md), but the discrepancy between llms-full.txt (which states the figure) and the schema (which does not) creates inconsistency for AI systems.
- Fix: Either update llms-full.txt to remove the price figure (for consistency) or add it to the FAQ schema answer. If keeping the blurred UI, the llms-full.txt is more authoritative for AI and should be consistent. Recommend keeping the figure in llms-full.txt (it is public domain) and adding it to one FAQ schema answer.

---

**ISSUE GEO-09: Blog index page FAQPage schema has only 2 questions — too sparse**
- File: `client/src/pages/Blog.tsx` lines 145–171
- Current state: 2 questions about blog topics and authorship. Missing obvious AI-answerable questions like: "Does Perioskoup have a blog?", "What has Dr. Anca Constantin written about?", "Where can I read about periodontal disease in plain language?"
- Fix: Add at least 3 more questions. See schema additions in the Schema Code section below.

---

**ISSUE GEO-10: RSS feed description for `building-the-bridge-perioskoup-story` is factually inaccurate**
- File: `client/public/feed.xml` line 71
- Current state: `"How a periodontist, a developer, and a product designer decided to build the dental companion they always wished existed."`
- Issue: The third founder is Petrica Nancu, CTO & Head of AI — not a product designer. BlogPost.tsx line 602 correctly states "an AI specialist with experience in health and wellness applications."
- Fix: Change to: `"How a periodontist, a full-stack engineer, and an AI specialist decided to build the dental companion they always wished existed."`

---

**ISSUE GEO-11: `SoftwareApplication` schema on homepage missing `aggregateRating` placeholder and `applicationSubCategory` is not a valid schema.org value**
- File: `client/index.html` lines 149–169
- `"applicationSubCategory": "Dental Health"` — this is a free-text field and is fine, but `aggregateRating` is absent. AI systems use ratings to assess authority. Even a placeholder with `ratingCount: 1` and a self-reported rating from a founder can legitimise the entity.
- Fix: Add `"aggregateRating"` once real reviews exist. For now, leave a TODO comment in the schema JSON.

---

### MEDIUM SEVERITY (reduces ranking and citation likelihood)

---

**ISSUE GEO-12: Answer capsules are absent on non-blog pages**
- Files: `client/src/pages/Home.tsx`, `Features.tsx`, `ForDentists.tsx`, `About.tsx`, `Pricing.tsx`
- Current state: Answer capsules (2–3 sentence direct answers after H2 headings) exist only in blog posts via the `renderBody()` function with the `answerCapsules` map. The page-level H2 sections (e.g., "What is an AI dental companion?" on Home, "The problem is clear." on ForDentists) have no extractable summary sentence immediately following the heading.
- Impact: AI systems parsing these pages cannot extract a direct answer to the implied question posed by each H2. The content is present but buried in subsequent paragraphs.
- Fix: For each key H2 on page-level components, add a visible 1–2 sentence answer capsule immediately after the heading, styled the same as blog answer capsules (left-border lime, subtle background). This is especially needed for:
  - Home.tsx: "What is an AI dental companion?" (line 248) — the answer is spread across 3 paragraphs instead of a single extract
  - ForDentists.tsx: "The problem is clear." (line 115) — the problem statement should be a direct 2-sentence answer, not buried in a paragraph
  - About.tsx: "Why now?" (line 236) — three-paragraph answer; needs a 2-sentence capsule

---

**ISSUE GEO-13: `llms.txt` states Dr. Anca is "CEO" in one place and "CDO" in another (cross-reference with CLAUDE.md)**
- File: `client/public/llms.txt` line 25 vs CLAUDE.md line
- llms.txt line 25 says "CEO of Perioskoup"
- CLAUDE.md states she is "CDO/Periodontist"
- index.html schema (line 122) says "Periodontist & CEO"
- About.tsx (line 268) says "Periodontist & Co-founder, CEO"
- Fix: Standardise on "CDO (Chief Dental Officer) & Co-founder" if that is the accurate title per the business. Update llms.txt, index.html schema, About.tsx, and ForDentists.tsx to be consistent. Currently CLAUDE.md is the canonical source and every public-facing file disagrees with it.

---

**ISSUE GEO-14: `llms-full.txt` missing content for `/contact` and `/waitlist` pages**
- File: `client/public/llms-full.txt` lines 329–342
- The sitemap in llms-full.txt lists `https://perioskoup.com/contact` and `https://perioskoup.com/waitlist` but there is no content section for these URLs. AI crawlers following the sitemap will find no content.
- Fix: Add a short content block for each page.

---

**ISSUE GEO-15: No `Article` or `MedicalWebPage` schema on blog posts — only `BlogPosting`**
- File: `client/src/pages/BlogPost.tsx` line 783
- Clinical articles (what-is-periodontal-disease, 3-minute-routine) authored by a licensed Periodontist would benefit from `MedicalWebPage` schema (`https://schema.org/MedicalWebPage`) in addition to `BlogPosting`. This signals medical authority to AI systems.
- `MedicalWebPage` allows `medicalAudience`, `lastReviewed`, and `reviewedBy` (linking back to Dr. Anca's Person entity).

---

**ISSUE GEO-16: `memberOf` in Dr. Anca's Person schema refers to EFP but she has not been cited as a member — she is an award winner**
- File: `client/index.html` line 124; `client/src/pages/About.tsx` line 33
- `"memberOf": { "@type": "Organization", "name": "European Federation of Periodontology" }` — unless she is actually a member of EFP (national society), this is inaccurate. The correct relationship is `"award"` (already present) referencing EFP's recognition, not `memberOf`.
- Fix: Remove `memberOf` if she is not formally a member, or change to the national Romanian periodontal society if she is a member of that.

---

**ISSUE GEO-17: `og:type` is `website` on all pages — blog articles should be `article`**
- Files: `client/src/pages/Features.tsx` line 53, `ForDentists.tsx` line 61, `About.tsx` line 101, `Pricing.tsx` line 73, `Blog.tsx` line 117
- BlogPost.tsx correctly sets `og:type` to `article` (line 829). Non-blog pages correctly use `website`. But `Features`, `ForDentists`, etc. are also `website` which is correct — no action needed there.
- The Blog index page (Blog.tsx line 117) sets `og:type: "website"` which is correct for a listing page.
- No action needed. This was a false positive.

---

**ISSUE GEO-18: No `sitelinks_searchbox` or `SearchAction` schema**
- File: `client/index.html`
- Missing `SearchAction` in the WebSite schema. AI systems and search engines use this to understand whether site content is searchable.
- Fix: Add `"potentialAction"` to the WebSite schema node. See Schema Code section below.

---

**ISSUE GEO-19: `feed.xml` missing `<enclosure>` and `<content:encoded>` elements**
- File: `client/public/feed.xml`
- Current state: Items have `<title>`, `<link>`, `<description>` (excerpt only), `<pubDate>`, `<dc:creator>`, `<category>`, and `<guid>`. Missing:
  - `<content:encoded>` — full article body for feed readers and AI content aggregators
  - No `xmlns:content` namespace declared
- Fix: Add `xmlns:content="http://purl.org/rss/1.0/modules/content/"` to the `<rss>` element and add `<content:encoded><![CDATA[...full article body...]]></content:encoded>` to each item.

---

**ISSUE GEO-20: `Breadcrumb` schema is absent on Homepage and Blog index**
- File: `client/src/pages/Home.tsx` and `Blog.tsx`
- BlogPost.tsx correctly includes BreadcrumbList schema (lines 797–805). Features, About, ForDentists, and Pricing all have the `<Breadcrumb>` component. But the Blog index page and Homepage do not have BreadcrumbList schema.
- Fix: Add BreadcrumbList schema to Blog.tsx. Homepage does not need one (it is the root).

---

### LOW SEVERITY (polish / future-proofing)

---

**ISSUE GEO-21: `llms.txt` "Key Pages" section lists `/pricing` and `/waitlist` but llms-full.txt does not list `/waitlist` in its sitemap section**
- File: `client/public/llms-full.txt` line 337 (sitemap) vs `client/public/llms.txt` line 63
- llms.txt line 63 lists `/waitlist` as a key page. llms-full.txt's "Site Map" section (line 329) does include `/waitlist`. Minor consistency — no action required, already consistent.

---

**ISSUE GEO-22: `ai-content-source` meta tag is non-standard**
- File: `client/index.html` line 55
- `<meta name="ai-content-source" content="...">` — this is not a recognised standard. The `<link rel="alternate" type="text/plain">` tag (line 53) is the correct signal.
- Fix: Keep the link tag; remove or do not rely on the non-standard meta name.

---

**ISSUE GEO-23: `Llms-txt` and `Llms-full-txt` are not valid HTTP header names**
- File: `client/public/robots.txt` lines 54–55
- Custom directives in robots.txt are not crawled as HTTP headers. These lines are informational comments to human readers but are not parsed by robots.txt processors. The canonical signal remains the `<link rel="author">` tag in HTML.
- Fix: Add the link as a comment acknowledging it is informational only. No technical change needed.

---

## What Is Working Well

- All major AI crawlers are explicitly allowed in `robots.txt` with a comprehensive list (GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot, Cohere-AI, Bytespider, meta-externalagent, Diffbot, CCBot, Applebot-Extended, YouBot)
- Global JSON-LD `@graph` in index.html with correct WebSite, Organization, Person, SoftwareApplication entities is structurally sound
- Dr. Anca `sameAs` array correctly links to the EFP article and LinkedIn
- Answer capsules in every blog post are rendered as visually distinct, structurally isolated elements immediately after every H2 heading — textbook GEO
- FAQPage schema on every page (Home, Features, ForDentists, About, Pricing, Blog, and each BlogPost)
- `BlogPosting` schema with correct author linking via `@id` back to the global Person entity
- EFP quote (`"Perioskoup is an innovative digital tool..."`) is in the noscript, llms-full.txt, llms.txt, and multiple page components — highly citable
- RSS feed is well-formed with dc:creator, categories, and guids
- llms.txt correctly includes the EFP article URL as an authority source
- The `EFP award: 3rd Prize` claim is consistent across all files (llms.txt, llms-full.txt, index.html schema, noscript, BlogPost)
- Content permissions section in llms.txt is clear and attribution instructions are well-phrased

---

## Corrected / Complete JSON-LD — Full Code

### 1. Corrected Dr. Anca Person Schema (replace in `client/index.html` and `client/src/pages/About.tsx`)

```json
{
  "@type": ["Person", "Physician"],
  "@id": "https://perioskoup.com/#anca-constantin",
  "name": "Dr. Anca Laura Constantin",
  "honorificPrefix": "Dr.",
  "givenName": "Anca Laura",
  "familyName": "Constantin",
  "url": "https://perioskoup.com/about#anca-constantin",
  "jobTitle": "Chief Dental Officer & Co-founder",
  "medicalSpecialty": "Periodontology",
  "description": "Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania, and co-founder and Chief Dental Officer (CDO) of Perioskoup. She won 3rd Prize at the EFP Digital Innovation Award 2025 at EuroPerio11 in Vienna, selected from 20 submissions across 17 national periodontal societies.",
  "nationality": {
    "@type": "Country",
    "name": "Romania"
  },
  "image": "https://perioskoup.com/images/anca-headshot.jpg",
  "worksFor": {
    "@type": "Organization",
    "@id": "https://perioskoup.com/#organization",
    "name": "Perioskoup",
    "url": "https://perioskoup.com/"
  },
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Periodontist",
    "occupationLocation": {
      "@type": "City",
      "name": "Bucharest"
    }
  },
  "award": "EFP Digital Innovation Award 2025, 3rd Prize, European Federation of Periodontology, EuroPerio11, Vienna",
  "knowsAbout": [
    "Periodontal Disease",
    "Periodontology",
    "AI in Dental Care",
    "Patient Engagement",
    "Oral Health Technology",
    "Habit Formation in Healthcare"
  ],
  "sameAs": [
    "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/",
    "https://www.linkedin.com/in/anca-constantin-99800633b/"
  ]
}
```

Note: Remove `"memberOf": { ... EFP ... }` unless she is formally a registered EFP member (not just an award winner). Replace with the above.

---

### 2. Corrected WebSite Schema with SearchAction (replace in `client/index.html`)

```json
{
  "@type": "WebSite",
  "@id": "https://perioskoup.com/#website",
  "url": "https://perioskoup.com/",
  "name": "Perioskoup",
  "description": "AI-powered dental companion app bridging the gap between dental visits.",
  "publisher": { "@id": "https://perioskoup.com/#organization" },
  "inLanguage": "en",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://perioskoup.com/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

### 3. BlogPosting Schema with `dateModified`, `wordCount`, `inLanguage` (replace in `client/src/pages/BlogPost.tsx` starting at line 781)

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": article.title,
  "description": article.metaDescription,
  "author": authorSchema,
  "publisher": {
    "@id": "https://perioskoup.com/#organization"
  },
  "datePublished": `${article.date}T00:00:00Z`,
  "dateModified": `${article.dateModified || article.date}T00:00:00Z`,
  "url": `https://perioskoup.com/blog/${article.slug}`,
  "image": OG_IMAGE,
  "inLanguage": "en-GB",
  "wordCount": article.wordCount || undefined,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://perioskoup.com/blog/${article.slug}`
  },
  "isPartOf": {
    "@id": "https://perioskoup.com/#website"
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "Periodontal Disease",
    "url": "https://www.efp.org/patients/gum-disease/"
  }
};
```

Add `dateModified` and `wordCount` fields to the Article interface and ARTICLES map.

---

### 4. `MedicalWebPage` schema addition for clinical blog posts (add to `client/src/pages/BlogPost.tsx`)

For articles authored by Dr. Anca (clinical posts: `what-is-periodontal-disease`, `3-minute-routine-save-teeth`, `why-patients-forget-instructions`), add alongside the BlogPosting schema:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "What Is Periodontal Disease? A Patient's Complete Guide",
  "url": "https://perioskoup.com/blog/what-is-periodontal-disease",
  "description": "A complete patient guide to periodontal disease, written by a practising periodontist.",
  "lastReviewed": "2025-11-12",
  "reviewedBy": {
    "@id": "https://perioskoup.com/#anca-constantin"
  },
  "medicalAudience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient"
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "Periodontal Disease"
  },
  "publisher": {
    "@id": "https://perioskoup.com/#organization"
  }
}
```

In TypeScript, implement as a conditional — only emit this schema block when `article.author === "Dr. Anca Laura Constantin"`.

---

### 5. Blog Index FAQPage — expanded (replace in `client/src/pages/Blog.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What topics does the Perioskoup blog cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Perioskoup blog covers periodontal disease education for patients, AI in dental care, daily oral health habits and routines, clinical insights from Dr. Anca Laura Constantin (Periodontist, EFP Digital Innovation Award 2025 winner), and company news including Perioskoup's founding story."
      }
    },
    {
      "@type": "Question",
      "name": "Who writes the Perioskoup blog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Articles are written by Dr. Anca Laura Constantin (Periodontist, EFP Digital Innovation Award 2025 winner) and Eduard Ciugulea (Co-founder & CGO). Clinical articles — including guides on periodontal disease, daily oral hygiene routines, and patient instruction retention — are authored by Dr. Anca and reflect her experience as a practising periodontist in Bucharest, Romania."
      }
    },
    {
      "@type": "Question",
      "name": "Does Perioskoup have evidence-based dental health content?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Perioskoup publishes evidence-based articles on periodontal health, citing peer-reviewed research including studies from the Journal of Clinical Periodontology, British Medical Journal, and the European Federation of Periodontology. Articles authored by Dr. Anca Laura Constantin reflect current EFP clinical guidelines."
      }
    },
    {
      "@type": "Question",
      "name": "What has Dr. Anca Constantin written about periodontal disease?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dr. Anca Laura Constantin has written a complete patient guide to periodontal disease (covering stages, causes, systemic connections, and treatment options), a clinically-backed 3-minute daily oral hygiene routine, an article on why patients forget dental care instructions, and the founding story of Perioskoup. All articles are available at perioskoup.com/blog."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Perioskoup blog free to read?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All Perioskoup blog content is free to access at perioskoup.com/blog. Articles are written by a practising periodontist and do not require registration."
      }
    }
  ]
}
```

---

### 6. Eduard Ciugulea author schema fix (modify `client/src/pages/BlogPost.tsx` lines 774–779)

```typescript
const eduardSchema = {
  "@type": "Person",
  "name": article.author,
  "jobTitle": article.authorRole,
  "worksFor": { "@id": "https://perioskoup.com/#organization" },
  "sameAs": ["https://www.linkedin.com/in/eduard-ciugulea/"]
};
```

---

### 7. Speakable schema (add to key pages — example for ForDentists)

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://perioskoup.com/for-dentists",
  "name": "Dental Patient Engagement App for Clinicians | Perioskoup",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".speakable-answer", "h1", ".body-lg"]
  }
}
```

Add `class="speakable-answer"` to the primary answer paragraph that immediately follows each major H2.

---

### 8. RSS Feed corrections (replace in `client/public/feed.xml`)

**Line 71 — fix the `building-the-bridge` description:**
```xml
<description>How a periodontist, a full-stack engineer, and an AI specialist decided to build the dental companion they always wished existed.</description>
```

**Add `xmlns:content` namespace and `content:encoded` to the rss element and each item:**
```xml
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
```

Each item should then include (example for first post):
```xml
<content:encoded><![CDATA[
Periodontal disease affects more than half of adults over 30, yet most people have never heard the word 'periodontist'. Dr. Anca Laura Constantin, a practising periodontist and EFP Digital Innovation Award 2025 winner, explains what periodontal disease is, how it progresses through four stages from gingivitis to advanced periodontitis, and what patients can do at home to prevent and manage it.

Key facts: 50% of adults have some form of gum disease. Early-stage gingivitis is fully reversible. Advanced periodontitis causes irreversible bone loss. Risk factors include smoking (3-6x increased risk), diabetes (bidirectional relationship), and genetics.

The 3-step home care routine: brush twice daily using the modified Bass technique, clean interdentally every day, attend professional maintenance every 3-6 months.

Read the full article: https://perioskoup.com/blog/what-is-periodontal-disease
]]></content:encoded>
```

---

## llms.txt Fix — Remove Duplicate Line

Current lines 37–39 in `client/public/llms.txt`:
```
- Personalised AI-driven oral hygiene routines for patients based on clinician recommendations
- Daily habit tracking with reminders and progress visualisation
- Clinician dashboard for monitoring patient engagement between appointments
- GDPR-compliant data storage in EU-based servers
- Educational content library on periodontal conditions and treatments
- GDPR-compliant data storage in EU-based servers    <-- DELETE THIS LINE
```

---

## llms.txt Title Standardisation Fix

Standardise Dr. Anca's title across all files. The authoritative title per CLAUDE.md is "CDO/Periodontist". Public-facing files should use:
- llms.txt line 25: Change "CEO of Perioskoup" to "Chief Dental Officer (CDO) & Co-founder of Perioskoup"
- llms.txt line 28: Change "Periodontist & co-founder of Perioskoup, EFP Digital Innovation Award 2025" (preferred citation) — acceptable as-is
- client/index.html line 122: Change `"jobTitle": "Periodontist & CEO"` to `"jobTitle": "Chief Dental Officer (CDO) & Co-founder"`
- client/src/pages/About.tsx line 31: Change `"jobTitle": "Periodontist"` — keep as-is (that's fine for the Person schema, jobTitle can be the occupation)
- ForDentists.tsx line 166: `"Periodontist & Co-founder, CEO"` — change to "Chief Dental Officer & Co-founder"

---

## Priority Action Order

1. Fix llms.txt duplicate at line 39 (2-minute fix)
2. Add full blog body text to llms-full.txt (1-2 hours)
3. Fix RSS feed inaccuracy — `building-the-bridge` description (2-minute fix)
4. Standardise Dr. Anca's title to CDO across all files (30 minutes)
5. Add `dateModified` field to each Article object in BlogPost.tsx (30 minutes)
6. Add Eduard Ciugulea `sameAs` to BlogPosting author schema (5 minutes)
7. Remove `memberOf: EFP` from Person schema if membership is unverified (5 minutes)
8. Add `url`, `nationality` fields to Person schema (10 minutes)
9. Expand Blog index FAQPage to 5 questions (20 minutes)
10. Add `MedicalWebPage` schema to clinical blog posts (30 minutes)
11. Add answer capsule divs to ForDentists, Home, and About page H2 sections (1 hour)
12. Add `content:encoded` to RSS feed items (1 hour)
13. Add `speakable` schema to ForDentists and About pages (30 minutes)
14. Add `SearchAction` to WebSite schema in index.html (10 minutes)
15. Long-term: Pre-rendering or SSG for all routes so every URL delivers crawlable HTML

---

## Reference: File Locations

- `client/public/llms.txt` — AI crawler summary file
- `client/public/llms-full.txt` — full content for AI crawlers
- `client/public/robots.txt` — crawler permissions
- `client/public/feed.xml` — RSS feed
- `client/index.html` — global JSON-LD schema, noscript fallback
- `client/src/pages/Home.tsx` — homepage FAQPage schema, EFP content
- `client/src/pages/Features.tsx` — features FAQPage schema
- `client/src/pages/ForDentists.tsx` — dentists FAQPage schema, citations
- `client/src/pages/About.tsx` — Person schema, FAQPage schema
- `client/src/pages/Pricing.tsx` — pricing FAQPage + SoftwareApplication schema
- `client/src/pages/Blog.tsx` — blog ItemList + FAQPage schema
- `client/src/pages/BlogPost.tsx` — BlogPosting + FAQPage + BreadcrumbList per article, answerCapsules rendering logic at line 686
