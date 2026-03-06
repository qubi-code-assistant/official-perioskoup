# GEO Readiness Audit — Perioskoup
**Auditor:** GEO Specialist Subagent
**Date:** 2026-03-06
**Site:** https://official-perioskoup.vercel.app (canonical: https://perioskoup.com)
**Key asset:** Dr. Anca Laura Constantin — Periodontist, EFP Digital Innovation Award 2025
**EFP reference:** https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/
**Audit scope:** Source code — client/src/pages/, client/public/, client/index.html

---

## Overall GEO Score: 7.5 / 10

Perioskoup has a genuinely strong GEO foundation. The majority of critical schema is in place: FAQPage covers all major commercial pages plus every blog post, the global `@graph` in `index.html` establishes Organization, WebSite, Person, and SoftwareApplication nodes with proper `@id` cross-referencing, blog posts use a structured `answerCapsules` pattern that injects direct-answer paragraphs immediately after each H2, and robots.txt grants explicit access to all major AI crawlers. The gaps are real but correctable: the RSS feed image URL is relative (broken for feed readers), the Person schema on blog posts uses a different `worksFor` node structure than the global entity, `llms.txt` is missing the Dr. Anca credential depth that matters for AI citation, static pages have no answer capsule pattern, and the About page Person schema slightly diverges from the global one.

---

## 1. Answer Capsules After H2 Headings

**Score: 7.5 / 10**

**What exists:**

Blog posts use a dedicated `answerCapsules: Record<string, string>` field in the `ARTICLES` data object, keyed by the exact H2 heading text. The `renderBody()` function in `BlogPost.tsx` (lines 686–695) injects the capsule immediately after each matching H2 as a styled blockquote-like callout. This is the correct pattern for AI extraction. Every article has capsules for every H2 heading.

Capsule coverage per article:
- `what-is-periodontal-disease` — 9 H2 headings, 9 capsules
- `how-ai-is-changing-dental-monitoring` — 7 H2 headings, 7 capsules
- `3-minute-routine-save-teeth` — 5 H2 headings, 5 capsules
- `efp-digital-innovation-award-2025` — 5 H2 headings, 5 capsules
- `why-patients-forget-instructions` — 6 H2 headings, 6 capsules
- `building-the-bridge-perioskoup-story` — 6 H2 headings, 6 capsules

**What is missing:**

Static pages (Home, Features, ForDentists, About) have no answer capsule pattern. H2 sections on these pages contain marketing copy distributed across styled components, not a clean "direct answer + supporting detail" block that AI systems can extract as a standalone response.

Specific H2 sections that need capsules:

- **Home:** "What is an AI dental companion?" — this H2 exists but the answer is buried in two separate `<p>` elements with different opacity styles, not a single extractable block.
- **Features:** "What's inside Perioskoup" — answered by a card grid, not a prose paragraph.
- **For Dentists:** "The problem is clear." — paragraph exists but is phrased as marketing narrative, not a direct answer.
- **About:** "Why now?" — answer is split across two `<p>` elements inside a `.reveal` div.

**Verdict:** Blog posts are excellent. Static pages need prose answer blocks immediately below each major H2.

---

## 2. FAQPage Schema Coverage

**Score: 8 / 10**

| Page | FAQPage Schema | Questions | Notes |
|---|---|---|---|
| Homepage (`/`) | YES — inline `<script>` | 5 | Correct placement |
| Features (`/features`) | YES — inline `<script>` | 3 | Correct |
| For Dentists (`/for-dentists`) | YES — inline `<script>` | 6 | Correct |
| About (`/about`) | YES — inline `<script>` | 4 | Correct — added since previous audit |
| Blog Index (`/blog`) | YES — inline `<script>` | 2 | Correct — added since previous audit |
| Blog Posts | YES — per-article `<script>` | 2-3 per post | BlogPosting + BreadcrumbList + FAQPage triple |
| Pricing (`/pricing`) | YES | 3 | Also has SoftwareApplication schema |
| Contact (`/contact`) | YES — inline `<script>` | 3 | Also has Organization schema |

**Current coverage is strong.** Every content page has FAQPage schema.

**Remaining gap:** The About FAQPage questions are well-chosen but could include one more: "What is Dr. Anca Laura Constantin's specialty and why does it matter for Perioskoup?" — this is the highest-value AI citation target and is currently only answered in prose, not in schema.

---

## 3. AI Crawlers in robots.txt

**Score: 10 / 10**

All required AI crawlers are explicitly allowed, and the file goes beyond the minimum requirement:

```
User-agent: GPTBot          → Allow: /
User-agent: ChatGPT-User    → Allow: /
User-agent: Google-Extended → Allow: /
User-agent: anthropic-ai    → Allow: /
User-agent: ClaudeBot       → Allow: /
User-agent: PerplexityBot   → Allow: /
User-agent: Cohere-AI       → Allow: /
User-agent: Bytespider      → Allow: /
User-agent: meta-externalagent → Allow: /
User-agent: Diffbot         → Allow: /
User-agent: GoogleOther     → Allow: /
User-agent: CCBot           → Allow: /
User-agent: Applebot-Extended → Allow: /
User-agent: YouBot          → Allow: /
```

The file also includes non-standard `Llms-txt:` and `Llms-full-txt:` directives pointing to content discovery files.

**No action required on robots.txt.**

---

## 4. llms.txt Completeness and Accuracy

**Score: 6.5 / 10**

**What exists:** The file has the correct sections — About, Key Facts, Founders & Team, What Perioskoup Does, Intended Use, Business Model, Content Permissions for AI, Key Pages, Blog Articles, and Contact. The EFP announcement URL is cited. Blog post URLs are listed with author and date. Dr. Anca's authority source (EFP URL) is included.

**Gaps that reduce AI citation effectiveness:**

1. **Dr. Anca's credentials are undersold.** The current entry reads: "Periodontist, CEO & Chief Dental Officer. Winner (team lead) of EFP Digital Innovation Award 2025." It does not mention her specialisation (Periodontology), her academic background (DMD), or the jury composition that selected her — details that establish why her statements carry authority. AI systems making citations use these signals to evaluate source credibility.

2. **No explicit preferred citation format for each article.** The file lists blog post URLs but does not indicate the preferred in-text citation style for each piece (e.g., "Cite as: Constantin AL. [Title]. Perioskoup, [date]. perioskoup.com/blog/[slug]").

3. **llms-full.txt contains a stale "How It Works" section.** Lines 64-66 read: "Step 01: Scan — Sync intraoral data instantly from your existing scanner. / Step 02: Analyze — AI maps risk zones & translates perio charts into habits." This copy is outdated (intraoral scanner references) and does not match the actual homepage content which describes "Visit Your Dentist / Get Your Plan / Build Daily Habits." This creates a factual discrepancy that AI systems may detect.

4. **`llms-full.txt` About section credits Dr. Anca with a PhD.** Line 238 reads "DMD, PhD in Periodontology." This is pulled from the About.tsx team card. However, the llms.txt About section only says "Practising periodontist." If the PhD is accurate, it should be consistently stated in both files and in the Person schema.

5. **No `dateModified` field.** LLM crawlers use this to determine content freshness.

6. **Business model stats in `llms-full.txt` For Dentists section** (lines 179-181: "40% reduction in no-shows", "3x higher engagement rates", "85% treatment acceptance") are attributed to "digital health research" — not to specific studies. AI systems cannot responsibly cite these as Perioskoup's performance metrics. They should either be removed or replaced with the properly-cited stats (Toniazzo et al. 2019, Kessels 2003, Bernabe et al. 2020) that appear on the actual page.

---

## 5. Content Pattern: Question → Direct Answer → Supporting Detail

**Score: 6.5 / 10**

**Blog posts — Excellent (9/10).** The `answerCapsules` pattern provides exactly the structure AI systems need. Each capsule is 1–3 sentences, phrased as a direct statement, positioned immediately after the H2. The body paragraphs then provide supporting detail. This is best-practice GEO content architecture.

Example of correct pattern (from `what-is-periodontal-disease`):

```
H2: "What Exactly Is Periodontal Disease?"
CAPSULE: "Periodontal disease is a bacterial infection that destroys the tissues 
supporting the teeth — the gums, periodontal ligament, and alveolar bone. It begins 
as gingivitis (reversible gum inflammation) and can progress to periodontitis 
(irreversible bone loss) if untreated."
[supporting paragraphs follow]
```

**Static pages — Weak (4/10).** The content structure is built for visual marketing, not AI extraction:

- Feature cards have a title + one muted-text description sentence, not a question-answer structure.
- Stats (87%, 80%, 62%) are displayed as large-format numbers with a small label — the surrounding context is not cohesive enough for AI extraction.
- The "What is an AI dental companion?" section on the homepage is the best static-page example: the H2 is a direct question and a direct answer paragraph follows. But the answer is split across two `<p>` elements with inconsistent styling, reducing extractability.

**Quotability audit — strong assets identified:**

| Quote | Location | Attribution | AI-Quotable |
|---|---|---|---|
| "Perioskoup is an innovative digital tool that uses artificial intelligence to support both patients and clinicians in managing oral health." | Home, About (blockquote) | European Federation of Periodontology | YES — clear source |
| "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement." | Home, ForDentists, About (blockquote) | Dr. Anca Constantin, Periodontist & Co-founder | YES |
| "The app I always wished I could prescribe to my patients." | Home (blockquote) | Dr. Anca Laura Constantin, Periodontist & Co-founder | YES |
| "Patients forget 80% of care instructions within 48h" | Home, About, ForDentists (stat) | Kessels 2003, BMJ — linked | YES — source cited |
| "87% of mHealth studies show improved oral health" | Home, ForDentists (stat) | Toniazzo et al. 2019, JCP — linked | YES — source cited |

---

## 6. Dr. Anca Person Schema — Current State

**Score: 7 / 10**

**Global entity in `index.html` (lines 115-147):**

The global `@graph` node is well-structured. It includes:
- `@type: ["Person", "Physician"]` — dual typing is correct
- `@id: "https://perioskoup.com/#anca-constantin"` — globally referenceable
- `honorificPrefix: "Dr."` — present
- `medicalSpecialty: "Periodontology"` — present
- `knowsAbout: [...]` — present (5 topics)
- `hasOccupation` — present with `occupationLocation`
- `memberOf: EFP` — present via About.tsx but not in index.html global node
- `award` — present
- `sameAs: [EFP URL]` — present
- `image: "https://perioskoup.com/images/anca-headshot.jpg"` — absolute URL, correct
- `description` — present (2-sentence bio)

**Gap in index.html global node:** `memberOf` (European Federation of Periodontology) is defined on the About page Person schema but not on the index.html global entity. Since the global `@graph` is the authoritative source for Knowledge Graph construction, `memberOf` should be there.

**About.tsx Person schema (lines 40-59):**

The About page redeclares the Person entity rather than using `@id` reference only. This creates two separate JSON-LD scripts on the About page (one Person + one FAQPage). The Person declaration on About is slightly different from the global one — it includes `memberOf` and `["Person", "Physician"]` dual type, but omits `description`. This inconsistency is not catastrophic but is sloppy.

Best practice: About.tsx should only emit the FAQPage schema. The global `@graph` in `index.html` is already the Person authority. Emitting a separate Person declaration on About creates potential for conflicting entity signals.

**BlogPost.tsx author node (lines 763-778):**

The conditional `authorSchema` pattern is correctly implemented:

```typescript
const authorSchema = article.author === "Dr. Anca Laura Constantin"
  ? {
      "@type": "Person",
      "@id": "https://perioskoup.com/#anca-constantin",  // correctly links to global entity
      "name": article.author,
      "jobTitle": article.authorRole,
      "worksFor": { "@id": "https://perioskoup.com/#organization" },
      "sameAs": ["https://www.efp.org/..."]
    }
  : { ... }
```

The `@id` linkage to the global entity is correct. However, the `worksFor` in the blog post author node uses `{ "@id": "..." }` while the global index.html node uses a typed `{ "@type": "Organization", ... }` reference. These are compatible (the `@id` reference is resolved by the global graph) but not identical.

**Missing from all Person schema instances:**
- `alumniOf` — educational institution would reinforce academic authority
- `hasCredential` — a DefinedTerm or EducationalOccupationalCredential for "Specialist in Periodontology" would signal verifiable professional credentials to AI systems
- LinkedIn profile URL in `sameAs` array — Dr. Anca's LinkedIn (https://www.linkedin.com/in/anca-constantin-99800633b/) is used in the team card but not in the sameAs array

---

## 7. RSS Feed for Content Discovery

**Score: 7.5 / 10**

**What exists:**
- `client/public/feed.xml` — valid RSS 2.0 with Atom and Dublin Core namespaces
- 6 articles listed, all with correct `<link>`, `<description>` (excerpt), `<pubDate>`, `<dc:creator>`, `<category>`, `<guid isPermaLink="true">`
- `<atom:link>` self-reference present
- Linked in `index.html` with `<link rel="alternate" type="application/rss+xml" href="https://perioskoup.com/feed.xml">`
- Feed URL listed in `llms.txt`

**Bug: RSS channel image URL is relative (line 13):**

```xml
<image>
  <url>/images/logomark-dark.png</url>
```

This must be an absolute URL. Feed readers and AI content aggregators will not be able to resolve this. Fix:

```xml
<image>
  <url>https://perioskoup.com/images/logomark-dark.png</url>
  <title>Perioskoup Blog</title>
  <link>https://perioskoup.com/blog</link>
</image>
```

**Minor gaps:**
- No `<content:encoded>` element with full article body. AI content readers see only the excerpt. Full-text RSS significantly improves AI discoverability.
- `<managingEditor>` uses team email, not individual author. Fine for a small team.

---

## 8. Schema Issues Summary — Full Audit

| Page | Schema Present | Gaps |
|---|---|---|
| `index.html` | Organization, WebSite, Person (Dr. Anca), SoftwareApplication | Person missing `memberOf`, LinkedIn in `sameAs`; stale `noscript` How It Works copy |
| Home | FAQPage (5 questions) | No answer capsules on static H2 sections |
| Features | FAQPage (3 questions) | — |
| For Dentists | FAQPage (6 questions) | — |
| About | Person (redundant — conflicts with global), FAQPage (4 questions) | Should replace Person declaration with `@id`-only reference; Person missing `description`, `memberOf` inconsistently placed |
| Blog Index | ItemList (6 posts), FAQPage (2 questions) | — |
| Blog Posts | BlogPosting + BreadcrumbList + FAQPage per article | `worksFor` node structure differs between global entity and BlogPosting author; `memberOf` not on blog author node |
| Pricing | FAQPage (3 questions), SoftwareApplication | — |
| Contact | Organization (with founder `@id` links), FAQPage (3 questions) | `addressCountry: "EU"` is not a valid ISO 3166-1 alpha-2 code (should be `"RO"`) |

---

## 9. Corrected JSON-LD — Page by Page

### A. index.html — Global @graph (add memberOf to Person node)

The only change needed is adding `memberOf` and LinkedIn to the Person node, and removing the redundant `contactPoint` from Organization (it duplicates the `email` field):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://perioskoup.com/#website",
      "url": "https://perioskoup.com/",
      "name": "Perioskoup",
      "description": "AI-powered dental companion app bridging the gap between dental visits.",
      "publisher": { "@id": "https://perioskoup.com/#organization" }
    },
    {
      "@type": "Organization",
      "@id": "https://perioskoup.com/#organization",
      "name": "Perioskoup",
      "legalName": "Perioskoup SRL",
      "url": "https://perioskoup.com/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://perioskoup.com/#logo",
        "url": "https://perioskoup.com/images/logo.svg",
        "width": 1080,
        "height": 1080
      },
      "image": { "@id": "https://perioskoup.com/#logo" },
      "foundingDate": "2025-06",
      "foundingLocation": {
        "@type": "Place",
        "addressLocality": "Bucharest",
        "addressCountry": "RO"
      },
      "founders": [
        { "@id": "https://perioskoup.com/#anca-constantin" },
        { "@type": "Person", "name": "Eduard Ciugulea", "jobTitle": "Co-founder & CGO" },
        { "@type": "Person", "name": "Petrica Nancu", "jobTitle": "CTO & Head of AI" }
      ],
      "award": "EFP Digital Innovation Award 2025 — 3rd Prize",
      "description": "Perioskoup is an AI-powered dental companion app that bridges the gap between dental visits with personalised oral health habits for patients and a monitoring dashboard for clinicians.",
      "email": "hello@perioskoup.com",
      "sameAs": [
        "https://www.linkedin.com/company/perioskoup",
        "https://www.instagram.com/perioskoup",
        "https://www.tiktok.com/@perioskoup",
        "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
      ]
    },
    {
      "@type": ["Person", "Physician"],
      "@id": "https://perioskoup.com/#anca-constantin",
      "name": "Dr. Anca Laura Constantin",
      "honorificPrefix": "Dr.",
      "givenName": "Anca Laura",
      "familyName": "Constantin",
      "jobTitle": "Periodontist & Chief Dental Officer",
      "medicalSpecialty": "Periodontology",
      "description": "Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania, and co-founder and Chief Dental Officer of Perioskoup. She won the EFP Digital Innovation Award 2025 for her work on AI-assisted periodontal patient engagement.",
      "image": "https://perioskoup.com/images/anca-headshot.jpg",
      "worksFor": { "@id": "https://perioskoup.com/#organization" },
      "memberOf": {
        "@type": "Organization",
        "name": "European Federation of Periodontology",
        "url": "https://www.efp.org"
      },
      "award": "EFP Digital Innovation Award 2025 — 3rd Prize, European Federation of Periodontology",
      "knowsAbout": [
        "Periodontal Disease",
        "Periodontology",
        "AI in Dental Care",
        "Patient Engagement",
        "Oral Health Technology"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Periodontist",
        "occupationLocation": {
          "@type": "City",
          "name": "Bucharest"
        }
      },
      "sameAs": [
        "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/",
        "https://www.linkedin.com/in/anca-constantin-99800633b/"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://perioskoup.com/#app",
      "name": "Perioskoup",
      "operatingSystem": "iOS, Android",
      "applicationCategory": "HealthApplication",
      "applicationSubCategory": "Dental Health",
      "description": "AI-powered dental companion app that bridges the gap between dental visits with personalised daily habits for patients and a clinician monitoring dashboard.",
      "url": "https://perioskoup.com/",
      "author": { "@id": "https://perioskoup.com/#organization" },
      "award": "EFP Digital Innovation Award 2025",
      "featureList": "AI habit coaching, periodontal habit tracking, dental patient engagement, clinician dashboard, GDPR-compliant messaging",
      "countriesSupported": "RO, GB, EU",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/PreOrder",
        "description": "Free during beta for patients."
      }
    }
  ]
}
```

---

### B. About.tsx — Remove Redundant Person, Enrich FAQPage

Replace the existing `personJsonLd` and `aboutFaqJsonLd` pair. Remove the full Person declaration and emit only a thin `@id`-reference Person alongside the FAQPage:

```typescript
// In About.tsx — replace personJsonLd with this:
const ancaRef = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://perioskoup.com/#anca-constantin"
  // No properties — the global @graph in index.html is authoritative
};

// aboutFaqJsonLd — add one more high-value question:
const aboutFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Dr. Anca Laura Constantin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania, specialising in Periodontology. She is the co-founder and Chief Dental Officer of Perioskoup and won 3rd Prize at the EFP Digital Innovation Award 2025 at EuroPerio11 in Vienna, selected from 20 submissions across 17 national periodontal societies."
      }
    },
    {
      "@type": "Question",
      "name": "Who founded Perioskoup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perioskoup was founded in 2025 by Dr. Anca Laura Constantin (Periodontist, CDO), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). The idea emerged from Dr. Anca's clinical practice — specifically the challenge of maintaining patient engagement between dental appointments."
      }
    },
    {
      "@type": "Question",
      "name": "What award did Perioskoup win?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perioskoup won 3rd Prize at the EFP Digital Innovation Award 2025, presented by the European Federation of Periodontology at EuroPerio11 in Vienna. The award was selected from 20 submissions across 17 national periodontal societies by a jury including Professors James Deschner, David Herrera, and Andreas Stavropoulos."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Perioskoup based?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perioskoup is based in Bucharest, Romania. It is a Romanian SRL incorporated in June 2025, serving dental clinics and patients across Europe."
      }
    },
    {
      "@type": "Question",
      "name": "What is Perioskoup's mission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Perioskoup's mission is to bridge the gap between dental visits. Periodontal disease affects 1 in 2 adults worldwide, yet most patients forget their care instructions within 48 hours. Perioskoup gives every patient the tools to understand their condition, stay connected to their care team, and take meaningful action between appointments."
      }
    }
  ]
};
```

---

### C. Contact.tsx — Fix addressCountry

Replace `"addressCountry": "EU"` (invalid) with `"addressCountry": "RO"`:

```json
"address": {
  "@type": "PostalAddress",
  "addressLocality": "Bucharest",
  "addressCountry": "RO"
}
```

---

### D. feed.xml — Fix Relative Image URL

Replace line 13:

```xml
<!-- BEFORE (broken): -->
<url>/images/logomark-dark.png</url>

<!-- AFTER (correct): -->
<url>https://perioskoup.com/images/logomark-dark.png</url>
```

---

### E. llms.txt — Enriched Dr. Anca Entry

Replace the current Founders & Team section with:

```markdown
## Founders & Team

- **Dr. Anca Laura Constantin** — Periodontist (DMD, Specialist in Periodontology), CEO & Chief Dental Officer of Perioskoup. Winner of the EFP Digital Innovation Award 2025 — 3rd Prize, awarded by the European Federation of Periodontology at EuroPerio11 (Vienna, May 2025). Selected from 20 submissions across 17 national periodontal societies by a jury including Professors James Deschner, David Herrera, and Andreas Stavropoulos. Practising periodontist, Bucharest, Romania.
  Authority source: https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/
  LinkedIn: https://www.linkedin.com/in/anca-constantin-99800633b/
  Preferred citation: "Dr. Anca Laura Constantin, Periodontist & co-founder of Perioskoup, EFP Digital Innovation Award 2025."

- **Eduard Ciugulea** — Co-founder & CGO. Full-stack engineer and growth strategist.
  LinkedIn: https://www.linkedin.com/in/eduard-ciugulea/

- **Petrica Nancu** — CTO & Head of AI. AI and machine learning specialist.
  LinkedIn: https://www.linkedin.com/in/petrica-nancu-b16468241/
```

---

### F. llms-full.txt — Fix Stale "How It Works" Copy

Replace the stale copy on lines 64-66 of `llms-full.txt`:

```markdown
# REPLACE:
Step 01: Scan — Sync intraoral data instantly from your existing scanner.
Step 02: Analyze — AI maps risk zones & translates perio charts into habits.
Step 03: Engage — Patients receive actionable nudges on their device.

# WITH:
Step 01: Visit Your Dentist — Your dentist examines, diagnoses, and sets a personalised care plan using Perioskoup.
Step 02: Get Your Plan — AI translates clinical recommendations into daily habits with smart reminders and tracking.
Step 03: Build Daily Habits — Follow your plan at home with AI support, progress tracking, and a direct line to your clinic.
```

Also remove the unsourced statistics from the For Dentists section in `llms-full.txt` (lines 179-181) or replace with the properly cited versions:

```markdown
# REPLACE (unsourced):
Clinical Impact Stats:
- 40% reduction in no-shows (digital health research)
- 3x higher engagement rates (digital health research)
- 85% treatment acceptance (digital health research)

# WITH (cited):
Research on the problem Perioskoup addresses:
- 80% of care instructions forgotten within 48h (Kessels 2003, BMJ — https://doi.org/10.1136/bmj.326.7395.920)
- 87% of mHealth studies show improved oral health outcomes (Toniazzo et al. 2019, JCP — https://doi.org/10.1111/jcpe.13064)
- 62% of adults have periodontitis worldwide (Bernabe et al. 2020, JCP — https://doi.org/10.1111/jcpe.13217)
```

---

## 10. Prioritised Action List

| Priority | Issue | Impact | File |
|---|---|---|---|
| P0 | RSS feed image URL is relative — breaks in all feed readers and AI content aggregators | Content discovery failure | `client/public/feed.xml` line 13 |
| P0 | `llms-full.txt` contains stale "Scan/Analyze/Engage" How It Works copy that contradicts live site | AI systems may cite inaccurate information about Perioskoup | `client/public/llms-full.txt` lines 64-66 |
| P1 | `llms-full.txt` For Dentists stats are unsourced (40%, 3x, 85%) — no corresponding journal citation | AI cannot verify; responsible AI systems will not cite unsourced health statistics | `client/public/llms-full.txt` lines 179-181 |
| P1 | Person schema missing LinkedIn in `sameAs` — Dr. Anca's LinkedIn is used in team cards but not in the schema entity | Reduces Knowledge Graph entity confidence for AI systems | `client/index.html` |
| P1 | Person schema missing `memberOf` (EFP) in global `index.html` entity — present in About.tsx but not the authoritative global node | Key authority signal not in canonical location | `client/index.html` |
| P1 | About.tsx emits redundant Person schema instead of thin `@id`-reference — creates two potentially conflicting Person declarations for the same entity | Knowledge Graph entity ambiguity | `client/src/pages/About.tsx` |
| P2 | Contact.tsx `addressCountry: "EU"` is invalid ISO 3166-1 — schema validators will flag this | Validation error in Rich Results Test | `client/src/pages/Contact.tsx` |
| P2 | Dr. Anca's LinkedIn missing from `sameAs` in llms.txt Founders section | Incomplete authority footprint | `client/public/llms.txt` |
| P2 | `llms-full.txt` About section credits "DMD, PhD" while llms.txt says only "Periodontist" — credentials inconsistently stated | AI systems may cite conflicting credential claims | Both llms files |
| P3 | No answer capsules on static page H2 sections (Home, Features, ForDentists, About) | Poor AI extractability for non-blog content | All static pages |
| P3 | RSS missing `<content:encoded>` with full article bodies | AI content readers see only excerpts | `client/public/feed.xml` |
| P3 | FAQPage on About missing "Who is Dr. Anca?" as an explicit question | Highest-value AI citation target not schema-enabled | `client/src/pages/About.tsx` |

---

## 11. Strengths to Preserve

1. **robots.txt AI crawler coverage** — best-in-class; all 14 major bots explicitly granted access with no blocking.
2. **Blog post answer capsule pattern** — `answerCapsules` keyed to exact H2 text, injected by `renderBody()` immediately after the heading. This is the correct pattern. Do not change it.
3. **BlogPosting + BreadcrumbList + FAQPage triple on every blog post** — strong per-article schema stack. Each article has 2-3 FAQPage questions derived from the article content.
4. **Global `@graph` in index.html** — WebSite, Organization, Person, and SoftwareApplication in a single interconnected graph with proper `@id` cross-referencing. This is the right architecture.
5. **EFP quote in `<blockquote>` elements** — the most quotable, verifiable asset on the site. It appears on Home and About with clear attribution. Preserve both instances.
6. **Dr. Anca's founding quote in `<blockquote>` with `<footer>` attribution** — correctly marked up for quote extraction.
7. **FAQPage coverage across all commercial pages** — Home, Features, ForDentists, About, Blog, Pricing, Contact all have FAQPage schema.
8. **Conditional `authorSchema` in BlogPost.tsx** — correctly differentiates Dr. Anca (with `@id` link to global Person) from Eduard Ciugulea. The linkage pattern is correct.
9. **RSS feed in index.html `<link rel="alternate">`** — content discovery signal is properly declared.
10. **`llms-full.txt` existence with `noscript` fallback in index.html** — AI crawlers that cannot execute JavaScript can access full content through multiple channels.

---

## 12. Schema Validation Checklist

Run these URLs through https://validator.schema.org/ after implementing fixes:

- [ ] `https://perioskoup.com/` — expect WebSite, Organization, Person, SoftwareApplication, FAQPage (5 entities)
- [ ] `https://perioskoup.com/about` — expect FAQPage (5 questions) + thin Person reference
- [ ] `https://perioskoup.com/blog` — expect ItemList (6 items) + FAQPage (2 questions)
- [ ] `https://perioskoup.com/blog/what-is-periodontal-disease` — expect BlogPosting + BreadcrumbList + FAQPage
- [ ] `https://perioskoup.com/contact` — expect Organization + FAQPage; `addressCountry: "RO"` (not "EU")
- [ ] `https://perioskoup.com/feed.xml` — expect valid RSS; image `<url>` is absolute
