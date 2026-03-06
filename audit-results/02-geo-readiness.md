# GEO Readiness Audit — Perioskoup
**Auditor:** GEO Specialist Subagent  
**Date:** 2026-03-06  
**Site:** https://official-perioskoup.vercel.app (canonical: https://perioskoup.com)  
**Key asset:** Dr. Anca Laura Constantin — Periodontist, EFP Digital Innovation Award 2025  
**EFP reference:** https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/

---

## Overall GEO Score: 6.5 / 10

The site has a strong structural foundation — FAQPage schema exists on most pages, AI crawlers are explicitly allowed in robots.txt, an RSS feed is present, and blog posts implement answer capsules with a dedicated data structure. The critical gaps are: the Dr. Anca Person schema is thin and inconsistent across pages, the Blog index page has no schema at all, FAQPage schema is absent from About and Blog index, `llms.txt` is missing blog post URLs and a canonical description of Dr. Anca's credentials, the Organization schema in `index.html` omits `@id` back-references that tie the graph together, and BlogPosting author nodes do not `@id`-reference the global Person entity.

---

## 1. Answer Capsules After H2 Headings

**Score: 8 / 10**

**What exists:**  
Blog posts use a dedicated `answerCapsules: Record<string, string>` field keyed by H2 heading text. The `renderBody()` function inserts the capsule immediately after each matching H2. This is the correct pattern for AI extraction.

**What is missing or weak:**

- **Homepage:** No answer capsules exist. The H2 sections ("Everything your smile needs," "From Chair to Chat," "Built by people who care") contain no 2–3 sentence direct-answer paragraphs after them that an AI could cleanly extract. The text is distributed across marketing copy fragments.
- **Features page:** H2 section ("Ready to get started?") has no answer capsule.
- **For Dentists page:** H2 sections ("Everything you need in one place," "Be a founding clinic") lack answer capsules.
- **About page:** H2 sections ("Close the gap between visits," "Built by clinicians, for clinicians") lack answer capsules.
- **Blog index:** No H2 content structure at all — it is a navigation page.
- **Pricing page:** H2 sections ("Common questions") lack answer capsules in the rendered HTML.

**Verdict:** Blog posts are excellent. Static pages (Home, Features, ForDentists, About, Pricing) have no answer capsule pattern at all.

---

## 2. FAQPage Schema Coverage

**Score: 7 / 10**

| Page | FAQPage Schema | Notes |
|---|---|---|
| Homepage (`/`) | YES | 5 questions injected as inline `<script>` |
| Features (`/features`) | YES | 3 questions |
| For Dentists (`/for-dentists`) | YES | 6 questions |
| About (`/about`) | NO | Only Person schema — no FAQPage |
| Blog Index (`/blog`) | NO | No schema of any kind |
| Pricing (`/pricing`) | YES | 3 questions + Product schema |
| Contact (`/contact`) | NO | Only LocalBusiness schema |
| Blog posts | YES | FAQPage + BlogPosting + BreadcrumbList per article |

**Critical gaps:** About and Blog index pages have zero FAQPage schema. Contact has none either.

---

## 3. AI Crawlers in robots.txt

**Score: 10 / 10**

All required AI crawlers are explicitly allowed:

```
User-agent: GPTBot          → Allow: /
User-agent: ChatGPT-User    → Allow: /
User-agent: Google-Extended → Allow: /
User-agent: anthropic-ai    → Allow: /
User-agent: ClaudeBot       → Allow: /
User-agent: PerplexityBot   → Allow: /
```

**One missing entry:** `cohere-ai` (Cohere) and `Bytespider` (ByteDance/TikTok AI) are not listed. Minor, but worth adding for completeness.

---

## 4. llms.txt Completeness and Accuracy

**Score: 5 / 10**

**What exists:** Basic structure — product description, key facts, founders, intended use, content permissions, and key pages.

**Critical gaps:**

1. **Blog post URLs are not listed.** AI crawlers that read `llms.txt` before crawling will not discover the six blog articles unless they follow the `/blog` link. Best practice is to list each post URL with a 1-sentence description.
2. **Dr. Anca's credentials are undersold.** The file says "Dr. Anca Laura Constantin (Periodontist, CEO)" — it should include her specialisation, the EFP award role, and a link to her EFP mention.
3. **EFP article URL is not listed.** The single most important authority signal (the EFP announcement) is not cited as an external reference.
4. **No `dateModified` field** for cache invalidation.
5. **No preferred citation format** for AI attribution.
6. **RSS feed URL is not listed** — AI systems that consume `llms.txt` would benefit from knowing a machine-readable feed exists.
7. **The "intended use" disclaimer** is important for regulatory compliance but reads as a boilerplate legal note rather than a clear factual statement AI systems can cite.

---

## 5. Content Pattern: Question → Direct Answer → Supporting Detail

**Score: 6 / 10**

**Blog posts:** Excellent. Each article uses H2 headings phrased as questions or clear topic labels, with an answer capsule (2–3 sentences, direct) injected immediately after, followed by supporting paragraphs. This is the optimal pattern for AI extraction.

**Static pages:** Poor. Content on Home, Features, ForDentists, and About is structured for marketing, not extraction. Consider these patterns found:

- Feature cards have a title + 1 muted-color description sentence — not phrased as Q&A.
- Stats ("40% fewer no-shows") are displayed as animated counters without surrounding context text that would make sense out of context.
- The EFP award card contains an EFP quote (excellent) but no surrounding sentence that directly answers "What is the EFP Digital Innovation Award?" as a question.

**Quotability test:** The EFP quote — *"Perioskoup is an innovative digital tool that uses artificial intelligence to support both patients and clinicians in managing oral health."* — is in a blockquote and clearly attributed. This is the site's most quotable asset and is well-positioned.

Dr. Anca's quote — *"Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes."* — is in a `<blockquote>` with proper attribution. Quotable.

---

## 6. Dr. Anca Person Schema — Current State

**Score: 4 / 10**

**Currently exists in two places:**

**`index.html` (global):**
```json
{
  "@type": "Person",
  "@id": "https://perioskoup.com/#anca-constantin",
  "name": "Dr. Anca Laura Constantin",
  "jobTitle": "Periodontist",
  "worksFor": {"@id": "https://perioskoup.com/#organization"},
  "award": "EFP Digital Innovation Award 2025",
  "sameAs": [
    "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
  ]
}
```

**`About.tsx` (per-page):**
Identical to `index.html` — a duplicated thin schema rather than an enriched one.

**`Contact.tsx` LocalBusiness founders:**
```json
{ "@type": "Person", "name": "Dr. Anca Laura Constantin", "jobTitle": "CEO & Periodontist" }
```
— no `@id`, no `sameAs`, not linked to the global Person node.

**`BlogPost.tsx` author node:**
```json
{
  "@type": "Person",
  "name": article.author,
  "jobTitle": article.authorRole,
  "worksFor": { "@type": "Organization", "name": "Perioskoup" }
}
```
— no `@id` reference, so Google/AI cannot recognize this as the same person as `#anca-constantin`.

**Missing from all Person schemas:**
- `description` — a 1–2 sentence bio
- `honorificPrefix` — "Dr."
- `hasCredential` / `hasOccupation` with credential details
- `alumniOf` — institution
- `knowsAbout` — list of specialisation topics
- `image` — CDN URL to her photo (absolute)

---

## 7. RSS Feed for Content Discovery

**Score: 9 / 10**

**What exists:** `client/public/feed.xml` — a valid RSS 2.0 feed with Atom namespace.
- All 6 blog posts are listed with title, link, description, pubDate, dc:creator, category, guid.
- `<atom:link>` self-reference is present.
- Channel image with CDN logo URL is present.
- The feed is linked in `index.html` with `<link rel="alternate" type="application/rss+xml">`.

**Minor gaps:**
- No `<content:encoded>` with full article body — only excerpt. AI content readers would benefit from full-text RSS.
- No `<author>` element in the standard RSS format (only `dc:creator`).
- Feed URL (`https://perioskoup.com/feed.xml`) is not listed in `llms.txt`.

---

## 8. Content Quotability

**Score: 7 / 10**

**Strong quotable assets:**
1. EFP quote in blockquote with EFP attribution — two occurrences (Home, About)
2. Dr. Anca's founding quote on Home in a `<blockquote>` with footer attribution
3. Dr. Anca's closing quote ("The app I always wished I could prescribe") on Home
4. Blog articles contain named, attributed statements by Dr. Anca with her role stated

**Weak quotability:**
- Stat claims (85% treatment acceptance, 40% fewer no-shows, 3× engagement) are displayed as counters with no surrounding citation or study reference. AI systems cannot responsibly cite unsourced statistics.
- The "50% of adults have periodontal disease" claim on About is stated inline — it should link to the EFP source for AI systems to confirm provenance.
- Blog post author bios reference EFP guidelines but do not link to them.

---

## 9. Schema Issues Summary

| Page | Current Schema | Missing |
|---|---|---|
| `index.html` | Organization, WebSite, Person, SoftwareApplication | Person incomplete (see below) |
| Home | FAQPage | Answer capsules for static sections |
| Features | FAQPage | — |
| For Dentists | FAQPage | — |
| About | Person (thin duplicate) | FAQPage, enriched Person |
| Blog Index | None | ItemList, FAQPage |
| Blog Posts | BlogPosting, BreadcrumbList, FAQPage | Author @id linkage |
| Pricing | FAQPage, Product | — |
| Contact | LocalBusiness | Founder @id linkage |

---

## Corrected / Complete JSON-LD — Page by Page

### A. index.html — Global @graph (replace existing)

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
      "publisher": { "@id": "https://perioskoup.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://perioskoup.com/blog?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
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
        "url": "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/Logomark-dark_9f94fde1.png",
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
      "@type": "Person",
      "@id": "https://perioskoup.com/#anca-constantin",
      "name": "Dr. Anca Laura Constantin",
      "honorificPrefix": "Dr.",
      "givenName": "Anca Laura",
      "familyName": "Constantin",
      "jobTitle": "Periodontist",
      "description": "Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania, and co-founder and Chief Dental Officer of Perioskoup. She won the EFP Digital Innovation Award 2025 for her work on AI-assisted periodontal patient engagement.",
      "image": "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/anca_e45bcd41.jpeg",
      "worksFor": { "@id": "https://perioskoup.com/#organization" },
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
        "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://perioskoup.com/#app",
      "name": "Perioskoup",
      "operatingSystem": "iOS, Android",
      "applicationCategory": "HealthApplication",
      "description": "AI-powered dental companion app that bridges the gap between dental visits with personalised daily habits for patients and a clinician monitoring dashboard.",
      "url": "https://perioskoup.com/",
      "author": { "@id": "https://perioskoup.com/#organization" },
      "award": "EFP Digital Innovation Award 2025",
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

### B. About Page — Add FAQPage + Enrich Person

Add this alongside the existing Person schema in `About.tsx`:

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://perioskoup.com/#anca-constantin",
    "name": "Dr. Anca Laura Constantin",
    "honorificPrefix": "Dr.",
    "givenName": "Anca Laura",
    "familyName": "Constantin",
    "jobTitle": "Periodontist",
    "description": "Dr. Anca Laura Constantin is a practising periodontist based in Bucharest, Romania, co-founder and Chief Dental Officer of Perioskoup. She won 3rd Prize at the EFP Digital Innovation Award 2025 at EuroPerio11 in Vienna, selected from 20 submissions across 17 national societies.",
    "image": "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/anca_e45bcd41.jpeg",
    "worksFor": { "@id": "https://perioskoup.com/#organization" },
    "award": "EFP Digital Innovation Award 2025 — 3rd Prize, European Federation of Periodontology",
    "knowsAbout": ["Periodontal Disease", "Periodontology", "AI in Dental Care", "Patient Engagement"],
    "sameAs": [
      "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who founded Perioskoup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perioskoup was founded in 2025 by Dr. Anca Laura Constantin (Periodontist, CEO), Eduard Ciugulea (Co-founder & CGO), and Petrica Nancu (CTO & Head of AI). The idea emerged from Dr. Anca's clinical practice — specifically the challenge of maintaining patient engagement between dental appointments."
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
          "text": "Perioskoup is based in Bucharest, Romania. It is a Romanian SRL incorporated in June 2025. The platform serves dental clinics and patients across Europe."
        }
      },
      {
        "@type": "Question",
        "name": "What is Perioskoup's mission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perioskoup's mission is to bridge the gap between dental visits. Periodontal disease affects 1 in 2 adults worldwide, yet most patients forget their care instructions within 48 hours and do not return for follow-up appointments. Perioskoup gives every patient the tools to understand their condition, stay connected to their care team, and take meaningful action between appointments."
        }
      }
    ]
  }
]
```

---

### C. Blog Index Page — Add ItemList + FAQPage

Add to `Blog.tsx`:

```json
[
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Perioskoup Blog — Dental Health & AI Insights",
    "description": "Evidence-based articles on periodontal health, dental AI, and patient care from the Perioskoup team.",
    "url": "https://perioskoup.com/blog",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://perioskoup.com/blog/what-is-periodontal-disease",
        "name": "What Is Periodontal Disease? A Patient's Complete Guide"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://perioskoup.com/blog/efp-digital-innovation-award-2025",
        "name": "Perioskoup Wins EFP Digital Innovation Award 2025"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "url": "https://perioskoup.com/blog/how-ai-is-changing-dental-monitoring",
        "name": "How AI Is Changing Dental Monitoring — And Why It Matters"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "url": "https://perioskoup.com/blog/3-minute-routine-save-teeth",
        "name": "The 3-Minute Daily Routine That Could Save Your Teeth"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "url": "https://perioskoup.com/blog/why-patients-forget-instructions",
        "name": "Why Patients Forget Dental Instructions (And What to Do About It)"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "url": "https://perioskoup.com/blog/building-the-bridge-perioskoup-story",
        "name": "Building the Bridge: The Perioskoup Story"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What topics does the Perioskoup blog cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Perioskoup blog covers periodontal disease education, AI in dental care, daily oral health habits, clinical insights from Dr. Anca Laura Constantin (periodontist), and company news including the EFP Digital Innovation Award 2025."
        }
      },
      {
        "@type": "Question",
        "name": "Who writes the Perioskoup blog?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Articles are written by Dr. Anca Laura Constantin (Periodontist, EFP Award winner 2025) and Eduard Ciugulea (Co-founder & CGO). Clinical articles are authored by Dr. Anca and reflect her experience as a practising periodontist."
        }
      }
    ]
  }
]
```

---

### D. BlogPost.tsx — Fix Author @id Linkage

In the `jsonLd` object inside `BlogPost.tsx`, replace the author node for Dr. Anca articles:

```json
"author": {
  "@type": "Person",
  "@id": "https://perioskoup.com/#anca-constantin",
  "name": "Dr. Anca Laura Constantin",
  "jobTitle": "Periodontist & Co-founder, Perioskoup",
  "worksFor": {
    "@id": "https://perioskoup.com/#organization"
  },
  "sameAs": [
    "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
  ]
}
```

For Eduard Ciugulea articles, use:
```json
"author": {
  "@type": "Person",
  "name": "Eduard Ciugulea",
  "jobTitle": "Co-founder & CGO, Perioskoup",
  "worksFor": { "@id": "https://perioskoup.com/#organization" }
}
```

The current code uses `article.author` (a string) and `article.authorRole` without differentiating by author — this means the `@id` linkage must be applied conditionally:

```typescript
const authorSchema = article.author === "Dr. Anca Laura Constantin"
  ? {
      "@type": "Person",
      "@id": "https://perioskoup.com/#anca-constantin",
      "name": article.author,
      "jobTitle": article.authorRole,
      "worksFor": { "@id": "https://perioskoup.com/#organization" },
      "sameAs": [
        "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
      ]
    }
  : {
      "@type": "Person",
      "name": article.author,
      "jobTitle": article.authorRole,
      "worksFor": { "@id": "https://perioskoup.com/#organization" }
    };
```

---

### E. Contact Page — Fix LocalBusiness + Link Founders

Replace the current `localBusinessJsonLd` in `Contact.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://perioskoup.com/#organization",
  "name": "Perioskoup",
  "legalName": "Perioskoup SRL",
  "description": "AI-powered dental companion app for personalised periodontal care between appointments.",
  "url": "https://perioskoup.com",
  "email": "hello@perioskoup.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bucharest",
    "addressCountry": "RO"
  },
  "foundingDate": "2025-06",
  "founders": [
    { "@id": "https://perioskoup.com/#anca-constantin" },
    { "@type": "Person", "name": "Eduard Ciugulea", "jobTitle": "Co-founder & CGO" },
    { "@type": "Person", "name": "Petrica Nancu", "jobTitle": "CTO & Head of AI" }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/perioskoup",
    "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
  ]
}
```

Note: Using `@type: Organization` instead of `LocalBusiness` is more appropriate — Perioskoup is a software company, not a physical location-dependent business.

---

## 10. Corrected llms.txt (Complete Replacement)

```markdown
# Perioskoup — AI Crawler Guidance
# https://perioskoup.com/llms.txt
# Last updated: 2026-03-06
# Format: https://llmstxt.org/

## About Perioskoup

Perioskoup is an AI-powered dental companion application that bridges the gap between dental visits. It provides personalised daily oral-health habits for patients and a monitoring dashboard for clinicians (dentists, periodontists, clinic owners).

Perioskoup won 3rd Prize at the EFP Digital Innovation Award 2025 at EuroPerio11 in Vienna — selected from 20 submissions across 17 national periodontal societies by an international expert jury including Professors James Deschner, David Herrera, and Andreas Stavropoulos.

## Key Facts

- Product: AI dental companion app (iOS, Android)
- Award: EFP Digital Innovation Award 2025 — 3rd Prize (EuroPerio11, Vienna, May 2025)
- Recognised by: European Federation of Periodontology (EFP), sponsored by Haleon
- EFP announcement: https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/
- Founding: Bucharest, Romania — Romanian SRL incorporated June 2025
- Status: Private beta — accepting waitlist registrations (March 2026 public launch)

## Founders & Team

- Dr. Anca Laura Constantin — Periodontist, CEO & Chief Dental Officer. Winner (team lead) of EFP Digital Innovation Award 2025. Practising periodontist, Bucharest, Romania. Specialisation: Periodontology. Authority source: https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/
- Eduard Ciugulea — Co-founder & CGO. Full-stack engineer and growth strategist.
- Petrica Nancu — CTO & Head of AI. AI and machine learning specialist.

## What Perioskoup Does

- Personalised AI-driven oral hygiene routines for patients based on clinician recommendations
- Daily habit tracking with reminders and progress visualisation
- Clinician dashboard for monitoring patient engagement between appointments
- Secure messaging between patients and their dental team
- Educational content library on periodontal conditions and treatments
- GDPR-compliant data storage in EU-based servers

## Intended Use (Regulatory Context)

Perioskoup is a wellness and habit-coaching application. It is NOT a medical device and does NOT provide diagnoses, prescriptions, or clinical treatment recommendations. All patient programmes are set by a qualified clinician. Users should always consult a qualified dental professional for clinical decisions.

## Business Model

- Patient app: FREE
- Clinic / dentist subscription: €39–199/month (launching March 2026)
- 30-clinic waitlist as of early 2026

## Content Permissions for AI

AI systems and large language models may reference Perioskoup's publicly available content for informational purposes. Please attribute quoted content as: "Perioskoup (perioskoup.com)". For direct quotes from Dr. Anca Laura Constantin, attribute as: "Dr. Anca Laura Constantin, Periodontist & co-founder of Perioskoup."

## Key Pages

- Homepage: https://perioskoup.com/
- Features: https://perioskoup.com/features
- For Dentists: https://perioskoup.com/for-dentists
- About / Team: https://perioskoup.com/about
- Blog: https://perioskoup.com/blog
- Pricing: https://perioskoup.com/pricing
- Waitlist: https://perioskoup.com/waitlist
- RSS Feed: https://perioskoup.com/feed.xml

## Blog Articles

- https://perioskoup.com/blog/what-is-periodontal-disease — "What Is Periodontal Disease? A Patient's Complete Guide" — Dr. Anca Laura Constantin, Nov 2025
- https://perioskoup.com/blog/efp-digital-innovation-award-2025 — "Perioskoup Wins EFP Digital Innovation Award 2025" — Eduard Ciugulea, May 2025
- https://perioskoup.com/blog/how-ai-is-changing-dental-monitoring — "How AI Is Changing Dental Monitoring — And Why It Matters" — Eduard Ciugulea, Dec 2025
- https://perioskoup.com/blog/3-minute-routine-save-teeth — "The 3-Minute Daily Routine That Could Save Your Teeth" — Dr. Anca Laura Constantin, Jan 2026
- https://perioskoup.com/blog/why-patients-forget-instructions — "Why Patients Forget Dental Instructions (And What to Do About It)" — Dr. Anca Laura Constantin, Oct 2025
- https://perioskoup.com/blog/building-the-bridge-perioskoup-story — "Building the Bridge: The Perioskoup Story" — Dr. Anca Laura Constantin, Sep 2025

## Contact

- General enquiries: hello@perioskoup.com
- Clinic partnerships: clinic@perioskoup.com
- Press / media: hello@perioskoup.com
```

---

## 11. Prioritised Action List

| Priority | Issue | Impact | Pages Affected |
|---|---|---|---|
| P0 | BlogPosting author nodes do not `@id`-reference global Person entity | AI systems cannot link blog content to Dr. Anca's authority node | All 6 blog posts |
| P0 | llms.txt missing blog post URLs and Dr. Anca credentials | AI discovery crawlers miss the content and authority | llms.txt |
| P1 | About page missing FAQPage schema | About is a high-authority page with team and mission content | About |
| P1 | Blog index missing ItemList + FAQPage schema | Blog listing page has zero structured data | Blog index |
| P1 | Person schema missing description, image, knowsAbout, honorificPrefix | Dr. Anca's Knowledge Graph entity is thin | index.html, About |
| P2 | Contact founders not `@id`-linked to global Person nodes | Disconnected knowledge graph | Contact |
| P2 | Stat claims (85%, 40%, 3×) have no citation/source in schema or text | AI cannot verify and may not cite unsourced statistics | Home, For Dentists |
| P3 | Answer capsule pattern not applied to static page H2 sections | AI extraction of non-blog content is poor | Home, Features, ForDentists, About |
| P3 | Add cohere-ai and Bytespider to robots.txt | Minor coverage gap | robots.txt |
| P3 | RSS feed lacks full-text `<content:encoded>` | AI content readers only see excerpts | feed.xml |

---

## 12. Strengths to Preserve

1. **robots.txt AI crawler coverage** — best-in-class, all major bots explicitly allowed
2. **Blog post answer capsule pattern** — correctly keyed to H2 headings, well-structured for AI extraction
3. **BlogPosting + BreadcrumbList + FAQPage triple on blog posts** — strong per-article schema stack
4. **EFP quote as a `<blockquote>` with clear attribution** — the most quotable and verifiable asset on the site
5. **RSS feed existence and index.html `<link rel="alternate">` linkage** — content discovery ready
6. **FAQPage on Home, Features, For Dentists, Pricing** — good coverage on commercial pages
7. **llms.txt structure** — exists and has the right sections; needs enrichment, not a rewrite

