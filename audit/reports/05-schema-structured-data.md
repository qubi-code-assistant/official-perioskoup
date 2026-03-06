# Audit Report 05 — Schema.org Structured Data

**Auditor:** Schema.org Structured Data Specialist
**Date:** 2026-03-06
**Scope:** All JSON-LD structured data across perioskoup.com
**Reference:** `audit/strategy-reference.md`

---

## Executive Summary

The site has a solid structured data foundation with a global `@graph` in `client/index.html` covering WebSite, Organization, Person (Dr. Anca), and SoftwareApplication. FAQPage schema is present on 7 pages. BreadcrumbList is deployed on all inner pages via a reusable component. Blog posts have BlogPosting schema with conditional author enrichment.

There are **3 critical gaps**, **5 high-severity issues**, and **4 medium-severity improvements** needed to meet the strategy requirements and pass Google Rich Results validation.

---

## 1. SoftwareApplication Schema

**Location:** `client/index.html` (lines 150-169, inside `@graph`)

**Status: PRESENT but INCOMPLETE**

### What exists:
```json
{
  "@type": "SoftwareApplication",
  "@id": "https://perioskoup.com/#app",
  "name": "Perioskoup",
  "operatingSystem": "iOS, Android",
  "applicationCategory": "HealthApplication",
  "applicationSubCategory": "Dental Health",
  "description": "AI-powered dental companion app...",
  "url": "https://perioskoup.com/",
  "author": { "@id": "https://perioskoup.com/#organization" },
  "award": "EFP Digital Innovation Award 2025",
  "featureList": "AI habit coaching, periodontal habit tracking...",
  "countriesSupported": "RO, GB, EU",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/PreOrder",
    "description": "Free during beta for patients."
  }
}
```

### Findings:

| # | Issue | Severity |
|---|-------|----------|
| 1.1 | **Missing `aggregateRating`** — Strategy requires it. Without it, no star-rating rich snippet is possible. However, since the app is in beta and not yet on app stores, fabricating ratings would violate Google's guidelines. | **MEDIUM** — defer until app store launch, then add real ratings. |
| 1.2 | **Missing `screenshot` property** — Google recommends screenshots for SoftwareApplication. | LOW |
| 1.3 | **`operatingSystem` should be an array** — `"iOS, Android"` as a single string is technically valid but an array is cleaner for parsers. | LOW |
| 1.4 | **Logo URL is relative** (`/images/logo.svg`) — In the Organization node, the logo `url` is `/images/logo.svg`. JSON-LD validators and crawlers may not resolve relative URLs. Should be absolute. | **HIGH** |

### Fix for 1.4 — Make logo URL absolute:
In `client/index.html`, line 92, change:
```json
"url": "/images/logo.svg",
```
to:
```json
"url": "https://perioskoup.com/images/logo.svg",
```

---

## 2. Organization Schema

**Location:** `client/index.html` (lines 84-117, inside `@graph`) + duplicate in `client/src/pages/Contact.tsx` (lines 59-83)

**Status: PRESENT and GOOD — minor issues**

### What exists (global):
- `@type`: Organization
- `@id`: https://perioskoup.com/#organization
- `name`, `legalName`, `url`, `logo`, `foundingDate`, `foundingLocation`
- `founders` (3 founders with @id cross-reference to Dr. Anca)
- `award`: EFP Digital Innovation Award 2025
- `description`, `email`
- `sameAs`: LinkedIn, Instagram, TikTok, EFP announcement

### Findings:

| # | Issue | Severity |
|---|-------|----------|
| 2.1 | **Missing `contactPoint`** — Strategy lists `contactPoint` as a requirement. This helps Google show contact info in Knowledge Panels. | **HIGH** |
| 2.2 | **Missing Instagram and TikTok from Contact.tsx duplicate** — The Contact page's Organization schema only has LinkedIn + EFP in `sameAs`, while the global one has all four. Inconsistency. | **MEDIUM** |
| 2.3 | **Relative logo URL** — Same issue as 1.4 above. The logo `url` is relative. | **HIGH** (same fix) |
| 2.4 | **Image `@id` self-reference is good** — The `image` field correctly references `#logo`. Well done. | PASS |
| 2.5 | **`foundingDate` format** — `"2025-06"` is valid ISO 8601 partial date. Acceptable. | PASS |

### Fix for 2.1 — Add contactPoint to global Organization:
Add after `"email": "hello@perioskoup.com"` in `client/index.html`:
```json
"contactPoint": [
  {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "hello@perioskoup.com",
    "availableLanguage": ["English", "Romanian"],
    "areaServed": ["RO", "GB", "EU"]
  },
  {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "clinic@perioskoup.com",
    "availableLanguage": ["English", "Romanian"],
    "description": "For dental clinic partnership enquiries"
  }
],
```

### Fix for 2.2 — Align Contact.tsx sameAs:
In `client/src/pages/Contact.tsx`, line 79-82, update `sameAs` to match global:
```json
"sameAs": [
  "https://www.linkedin.com/company/perioskoup",
  "https://www.instagram.com/perioskoup",
  "https://www.tiktok.com/@perioskoup",
  "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
]
```

---

## 3. FAQPage Schema

**Status: PRESENT on 7 pages + blog posts**

### Coverage map:

| Page | FAQPage | # Questions | Valid |
|------|---------|-------------|-------|
| `/` (Home) | YES | 5 | YES |
| `/features` | YES | 3 | YES |
| `/for-dentists` | YES | 6 | YES |
| `/pricing` | YES | 3 | YES |
| `/about` | YES | 4 | YES |
| `/blog` | YES | 2 | YES |
| `/blog/:slug` | YES (conditional) | Varies per article | YES |
| `/contact` | **NO** | — | — |
| `/waitlist` | **NO** | — | — |
| `/privacy` | **NO** | — | — |
| `/terms` | **NO** | — | — |

### Findings:

| # | Issue | Severity |
|---|-------|----------|
| 3.1 | **Missing FAQPage on `/contact`** — Strategy says "FAQPage schema on every content page." Contact is a content page. | **MEDIUM** |
| 3.2 | **Missing FAQPage on `/waitlist`** — Waitlist is a key conversion page. FAQ helps both rich results and GEO. | **MEDIUM** |
| 3.3 | **All existing FAQPage schemas are structurally valid** — Correct `@type: Question`, `acceptedAnswer` with `@type: Answer`. | PASS |
| 3.4 | **Unique questions per page** — No duplication detected across pages except the "Is Perioskoup a medical device?" question which appears on both Home and ForDentists, which is acceptable since they are distinct pages. | PASS |

### Fix for 3.1 — Add FAQPage to Contact.tsx:
Add after the `organizationJsonLd` const:
```tsx
const contactFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I contact Perioskoup?", "acceptedAnswer": { "@type": "Answer", "text": "You can reach the Perioskoup team at hello@perioskoup.com for general enquiries and clinic@perioskoup.com for dental practice partnerships. We typically respond within 24 hours." } },
    { "@type": "Question", "name": "Where is Perioskoup located?", "acceptedAnswer": { "@type": "Answer", "text": "Perioskoup is based in Bucharest, Romania. We serve dental clinics and patients across Europe." } },
  ]
};
```
Then render it:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqJsonLd) }} />
```

### Fix for 3.2 — Add FAQPage to Waitlist.tsx:
```tsx
const waitlistFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What happens after I join the Perioskoup waitlist?", "acceptedAnswer": { "@type": "Answer", "text": "After joining the waitlist, you will receive a confirmation email. When your spot opens, we will contact you with early access to the app, founding member pricing, and a direct line to the team." } },
    { "@type": "Question", "name": "Is Perioskoup free for patients?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Perioskoup is free for patients during the beta period and beyond. Dental clinics subscribe to enable the platform for their patients." } },
  ]
};
```

---

## 4. Physician / Person Schema for Dr. Anca

**Location:** `client/index.html` (lines 118-148, inside `@graph`) + duplicate in `client/src/pages/About.tsx` (lines 40-57)

**Status: PRESENT but CRITICAL GAPS per strategy requirements**

### What exists (global `@graph`):
- `@type`: Person (NOT Physician)
- `@id`: https://perioskoup.com/#anca-constantin
- `name`, `honorificPrefix`, `givenName`, `familyName`, `jobTitle`
- `description` (detailed, good)
- `image` (relative URL)
- `worksFor` cross-ref to Organization
- `award`: EFP Digital Innovation Award 2025
- `knowsAbout`: array of topics
- `hasOccupation`: Occupation with City
- `sameAs`: only EFP announcement URL

### Findings:

| # | Issue | Severity |
|---|-------|----------|
| 4.1 | **`@type` is `Person`, not `Physician`** — Strategy explicitly requires "Physician schema (Schema.org) on relevant pages." `Physician` is a valid Schema.org type that extends `LocalBusiness` and signals medical authority to Google. However, `Physician` in Schema.org is actually for a physician's practice/office, not a person. The correct approach is `@type: ["Person", "MedicalBusiness"]` or keeping `Person` with `hasOccupation` (which is already done). Alternatively, use `medicalSpecialty` on the Person. **Current implementation is acceptable** but needs `medicalSpecialty` added. | **HIGH** |
| 4.2 | **Missing `medicalSpecialty`** — Strategy requires this. Should be `"Periodontics"` or reference `https://schema.org/Periodontics` (not a real schema.org value, but `Dentistry` is). | **HIGH** |
| 4.3 | **Missing ORCID in `sameAs`** — Strategy explicitly requires "ORCID + Google Scholar profile links" and "sameAs for ORCID/Scholar." | **CRITICAL** |
| 4.4 | **Missing Google Scholar in `sameAs`** — Same as above. | **CRITICAL** |
| 4.5 | **Missing EFP `affiliation`** — Strategy requires "affiliation with EFP." Currently EFP is only in `sameAs`, not as a formal `affiliation` or `memberOf`. | **HIGH** |
| 4.6 | **Image URL is relative** — `"/images/anca-headshot.jpg"` should be absolute. | **HIGH** |
| 4.7 | **About.tsx duplicate is less complete than global** — Missing `hasOccupation`, `honorificPrefix`. Redundant but not harmful. | LOW |
| 4.8 | **BlogPost.tsx author schema for Dr. Anca** — Only includes `name`, `jobTitle`, `worksFor`, and `sameAs`. Missing `@id` cross-reference to the global Person node. Wait — `@id` IS present (line 785). Good. | PASS |

### Fix for 4.1 + 4.2 — Add medicalSpecialty:
In `client/index.html`, Person node (after `"jobTitle": "Periodontist"`), add:
```json
"medicalSpecialty": "Dentistry",
```

### Fix for 4.3 + 4.4 — Add ORCID and Scholar to sameAs:
In `client/index.html`, Person node, update `sameAs`:
```json
"sameAs": [
  "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/",
  "https://orcid.org/XXXX-XXXX-XXXX-XXXX",
  "https://scholar.google.com/citations?user=XXXXXXXXX"
]
```
**ACTION REQUIRED:** The actual ORCID and Google Scholar URLs for Dr. Anca Laura Constantin must be obtained from the team. These cannot be fabricated.

Also update the same `sameAs` in `client/src/pages/About.tsx` (line 54-56) and ensure `client/src/pages/BlogPost.tsx` (line 789-791) author schema includes the same.

### Fix for 4.5 — Add EFP affiliation:
In `client/index.html`, Person node, add:
```json
"memberOf": {
  "@type": "Organization",
  "name": "European Federation of Periodontology",
  "url": "https://www.efp.org"
},
```

### Fix for 4.6 — Absolute image URL:
Change `"image": "/images/anca-headshot.jpg"` to:
```json
"image": "https://perioskoup.com/images/anca-headshot.jpg",
```

---

## 5. BreadcrumbList Schema

**Location:** `client/src/components/Breadcrumb.tsx` (reusable component)
+ `client/src/pages/BlogPost.tsx` (inline, lines 816-824)

**Status: PRESENT on all inner pages. WELL IMPLEMENTED.**

### Coverage:
All inner pages use the `<Breadcrumb>` component:
- `/about`, `/features`, `/for-dentists`, `/pricing`, `/blog`, `/contact`, `/waitlist`, `/privacy`, `/terms`
- Blog posts use their own inline 3-level breadcrumb (Home > Blog > Article Title)

### Findings:

| # | Issue | Severity |
|---|-------|----------|
| 5.1 | **Last item missing `item` URL** — In the Breadcrumb component (line 28), the last breadcrumb item has no `href`, so it outputs `ListItem` without an `item` property. Google's docs say the current page (last item) should still have the `item` URL. | **MEDIUM** |
| 5.2 | **Home page has no BreadcrumbList** — Not needed (it is the root), but noted for completeness. | PASS (correct) |
| 5.3 | **BlogPost.tsx breadcrumb is well-structured** — 3-level hierarchy is correct. | PASS |

### Fix for 5.1 — Add URL to last breadcrumb item:
In `client/src/components/Breadcrumb.tsx`, line 28, change:
```tsx
...(item.href ? { item: `https://perioskoup.com${item.href}` } : {}),
```
to:
```tsx
item: item.href ? `https://perioskoup.com${item.href}` : (typeof window !== 'undefined' ? window.location.href : undefined),
```

A cleaner approach: Pass the current page URL as a prop, or always include `item` for the last element using the canonical URL. Better fix:

In each page's `<Breadcrumb>` usage, add `href` to the last item too:
```tsx
// Instead of:
<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
// Use:
<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
```

---

## 6. WebSite Schema with SearchAction

**Location:** `client/index.html` (lines 67-82, inside `@graph`)

**Status: PRESENT and CORRECT**

### What exists:
```json
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
}
```

### Findings:

| # | Issue | Severity |
|---|-------|----------|
| 6.1 | **SearchAction target URL may not work** — The URL `https://perioskoup.com/blog?q={search_term_string}` implies a search endpoint on the blog. Does the blog page actually handle `?q=` query params? If not, this is a non-functional SearchAction, which could lead to Google ignoring or penalizing it. | **HIGH** |
| 6.2 | **Structure is correct** — `EntryPoint` with `urlTemplate` and `query-input` follows Google's spec. | PASS |
| 6.3 | **Publisher cross-reference is correct** — `@id` link to Organization works. | PASS |

### Fix for 6.1:
Either:
1. **Implement search on the blog page** — Add filtering logic to `Blog.tsx` that reads `?q=` and filters displayed posts. OR
2. **Remove the SearchAction** until search is implemented. A non-functional SearchAction is worse than no SearchAction.

---

## 7. JSON-LD Syntax & Validity

### Validation check:

| # | Issue | Severity |
|---|-------|----------|
| 7.1 | **All JSON-LD blocks use valid `JSON.stringify()` output** — Since React generates the JSON through `JSON.stringify()`, there are no hand-written syntax errors. | PASS |
| 7.2 | **Correct `@context` on all blocks** — Every schema block has `"@context": "https://schema.org"`. | PASS |
| 7.3 | **Multiple `@context` declarations** — The global `@graph` has one `@context`, but each page-level schema also declares its own `@context`. This is valid JSON-LD but results in redundancy. Not a problem. | PASS |
| 7.4 | **`dangerouslySetInnerHTML` rendering in React** — All page-level schemas are rendered via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }} />`. This is the correct React pattern. | PASS |
| 7.5 | **Script tags outside `<Helmet>` in About.tsx, Contact.tsx, Home.tsx** — The JSON-LD `<script>` tags are rendered as direct children of the page component, not inside `<Helmet>`. In a React SPA with `react-helmet-async`, these scripts render in the `<body>`, not `<head>`. This is **valid** — Google processes JSON-LD in `<body>` equally. However, for consistency with the global schema (in `<head>`), moving them into `<Helmet>` would be cleaner. | LOW |
| 7.6 | **Pricing.tsx uses `Product` type instead of `SoftwareApplication`** — The `/pricing` page has a `Product` schema. This creates ambiguity with the global `SoftwareApplication`. Google prefers one canonical product type. | **MEDIUM** |

---

## 8. Missing Schemas (Strategy Requirements Gap Analysis)

| Required by Strategy | Status | Location | Gap |
|---------------------|--------|----------|-----|
| SoftwareApplication | PRESENT | index.html @graph | Missing `aggregateRating` (deferred) |
| FAQPage | PRESENT (7/11 pages) | Per-page TSX | Missing on Contact, Waitlist |
| Organization | PRESENT | index.html @graph + Contact.tsx | Missing `contactPoint` |
| Physician/Person (Dr. Anca) | PRESENT as Person | index.html @graph + About.tsx | Missing `medicalSpecialty`, ORCID, Scholar, EFP affiliation |
| BreadcrumbList | PRESENT (all inner pages) | Breadcrumb.tsx + BlogPost.tsx | Minor: last item missing `item` URL |
| WebSite + SearchAction | PRESENT | index.html @graph | SearchAction may be non-functional |
| BlogPosting | PRESENT | BlogPost.tsx | Complete and well-structured |
| ItemList (Blog) | PRESENT | Blog.tsx | Good |

### Additional schemas NOT in strategy but recommended:

| Schema | Why | Priority |
|--------|-----|----------|
| `HowTo` on Features page | The "How It Works" section (Scan > Analyze > Engage) is a natural HowTo. Rich snippet potential. | MEDIUM |
| `Event` for March 2026 launch | If a launch event is planned, `Event` schema would signal it. | LOW |
| `VideoObject` | If/when video content is added to the site. | DEFERRED |

---

## Severity Summary

| Severity | Count | Key Items |
|----------|-------|-----------|
| **CRITICAL** | 2 | Missing ORCID `sameAs` (4.3), Missing Google Scholar `sameAs` (4.4) |
| **HIGH** | 5 | Relative logo URL (1.4/2.3), Missing `contactPoint` (2.1), Missing `medicalSpecialty` (4.2), Missing EFP `memberOf` (4.5), Non-functional SearchAction (6.1) |
| **MEDIUM** | 4 | FAQPage on Contact (3.1), FAQPage on Waitlist (3.2), Breadcrumb last item URL (5.1), Product vs SoftwareApplication conflict (7.6) |
| **LOW** | 4 | Missing screenshots (1.2), operatingSystem format (1.3), About.tsx Person less complete (4.7), JSON-LD in body not head (7.5) |
| **PASS** | 10 | All structurally valid, good cross-referencing |

---

## Priority Action Plan

### Immediate (before next deployment):
1. **Make all image/logo URLs absolute** in `client/index.html` Person and Organization nodes (4.6, 1.4, 2.3)
2. **Add `contactPoint` to Organization** in `client/index.html` (2.1)
3. **Add `medicalSpecialty` to Person** in `client/index.html` (4.2)
4. **Add `memberOf` EFP to Person** in `client/index.html` (4.5)
5. **Align Contact.tsx `sameAs`** with global Organization (2.2)

### Requires team input:
6. **Obtain Dr. Anca's ORCID iD** and add to `sameAs` in all Person schemas (4.3)
7. **Obtain Dr. Anca's Google Scholar profile URL** and add to `sameAs` (4.4)

### Next sprint:
8. **Add FAQPage to Contact.tsx and Waitlist.tsx** (3.1, 3.2)
9. **Fix Breadcrumb last item** to include `item` URL (5.1)
10. **Either implement blog search or remove SearchAction** (6.1)
11. **Resolve Product vs SoftwareApplication on Pricing page** — consider using `SoftwareApplication` with offers instead of `Product` (7.6)

---

## Files Audited

| File | Schemas Found |
|------|---------------|
| `client/index.html` | WebSite, Organization, Person, SoftwareApplication (global @graph) |
| `client/src/pages/Home.tsx` | FAQPage |
| `client/src/pages/Features.tsx` | FAQPage |
| `client/src/pages/ForDentists.tsx` | FAQPage |
| `client/src/pages/Pricing.tsx` | FAQPage, Product |
| `client/src/pages/About.tsx` | Person, FAQPage |
| `client/src/pages/Blog.tsx` | ItemList, FAQPage |
| `client/src/pages/BlogPost.tsx` | BlogPosting, BreadcrumbList, FAQPage (conditional) |
| `client/src/pages/Contact.tsx` | Organization |
| `client/src/components/Breadcrumb.tsx` | BreadcrumbList |
| `client/src/pages/Waitlist.tsx` | (none) |
| `client/src/pages/Privacy.tsx` | (none) |
| `client/src/pages/Terms.tsx` | (none) |
| `client/src/pages/NotFound.tsx` | (none) |
