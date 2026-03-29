# GEO Readiness Audit — Perioskoup (Cycle 2)
**Auditor:** GEO Specialist Subagent (independent fresh audit)
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Site:** https://official-perioskoup.vercel.app (canonical: https://perioskoup.com)
**Key asset:** Dr. Anca Laura Constantin — Periodontist, EFP Digital Innovation Award 2025
**EFP reference:** https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/
**Scope:** Direct source code audit — client/src/pages/, client/index.html, client/public/

---

## Overall GEO Score: 8.2 / 10

**Delta from previous re-audit (8.5/10):** -0.3. The score is slightly lower because three issues flagged in the re-audit remain entirely unfixed, and this audit found a new issue (duplicate line in llms.txt and stale `Engagement Analytics` section in llms-full.txt). The site's GEO foundation is genuinely strong — the global `@graph`, blog post answer capsule pattern, robots.txt AI crawler coverage, and FAQPage schema breadth are all best-in-class. The remaining gaps are contained, correctable, and do not compromise the core citation strategy for Dr. Anca.

---

## 1. Answer Capsules After H2 Headings

**Score: 7.5 / 10 — No change from re-audit**

### Blog posts (confirmed excellent)

The `renderBody()` function in `BlogPost.tsx` (line 670) processes body text and, for every `## ` heading, checks `capsules[heading]` and injects a styled callout block (lime-left-border, semi-transparent background) immediately after the H2. All 6 articles have complete capsule coverage keyed to exact heading text. Verified by direct inspection of `answerCapsules` objects at BlogPost.tsx lines 164, 267, 389, 460, 556, 654.

Coverage summary (all confirmed):
- `what-is-periodontal-disease` — 9 H2 headings, 9 capsules
- `how-ai-is-changing-dental-monitoring` — 7 capsules
- `3-minute-routine-save-teeth` — 5 capsules
- `efp-digital-innovation-award-2025` — 5 capsules (including EFP award context)
- `why-patients-forget-instructions` — 6 capsules
- `building-the-bridge-perioskoup-story` — 6 capsules

### Static pages (still missing — deferred from previous cycles)

These H2 sections on static pages have no prose answer-capsule block:

| Page | H2 | Problem |
|---|---|---|
| Home | "What is an AI dental companion?" | Answer split across three `<p>` elements with different opacity/size styles; first sentence repeated verbatim in two `<p>` elements (Home.tsx lines 271 and 277) |
| Features | "What's inside Perioskoup" | Answered by card grid, not prose |
| For Dentists | "The problem is clear." | Marketing narrative, not direct answer format |
| About | "Close the gap between visits." | Two `<p>` elements in a div, no capsule wrapper |
| About | "Why now?" | Two `<p>` elements, no direct answer block |

**Specific Home.tsx content bug (line 271 vs 277):** The phrase "An AI dental companion translates clinical recommendations into personalised daily habits" appears in both the muted subhead paragraph (line 271) and the main paragraph (line 277). This is a verbatim repetition in adjacent elements — an AI extracting the section will get the same sentence twice.

---

## 2. FAQPage Schema Coverage

**Score: 9.5 / 10 — Maintained from re-audit**

| Page | FAQPage | Questions | Notes |
|---|---|---|---|
| Homepage (`/`) | YES | 5 | Regulatory language clean (no "real-time monitoring") |
| Features (`/features`) | YES | 3 | Clean |
| For Dentists (`/for-dentists`) | YES | 6 | Regulatory language confirmed clean |
| About (`/about`) | YES | 5 | "Who is Dr. Anca Laura Constantin?" is Q1 — correct |
| Blog Index (`/blog`) | YES (ItemList + FAQPage) | 2 | Correct |
| Blog Posts | YES — BlogPosting + BreadcrumbList + FAQPage | 2-3 per post | Full triple |
| Pricing (`/pricing`) | Not audited (page not in scope of available source) | — | Previous audits confirm FAQPage present |
| Contact (`/contact`) | YES (Organization + FAQPage) | 3 | `addressCountry: "RO"` confirmed correct |

**About page FAQPage — confirmed best-practice:** The five questions on About.tsx lines 50-89 include Dr. Anca's full credential context in Q1, EFP jury details in Q3, and correct CDO title in Q2 (confirmed "CDO" at line 62, not "CEO").

**No new gaps found.**

---

## 3. AI Crawlers in robots.txt

**Score: 10 / 10 — Maintained**

All 15 AI crawler user-agents are explicitly granted `Allow: /`. Confirmed present:

```
GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot,
Cohere-AI, Bytespider, meta-externalagent, Diffbot, omgili, GoogleOther,
CCBot, Applebot-Extended, YouBot
```

Non-standard `Llms-txt:` and `Llms-full-txt:` discovery directives point to the correct absolute URLs. Sitemap is listed. No action required.

---

## 4. llms.txt Completeness and Accuracy

**Score: 8.0 / 10 — Slight regression from re-audit (9.0 → 8.0)**

### What is correct

- Dr. Anca's entry: "DMD, Specialist in Periodontology", EFP award with jury names and submission count, LinkedIn URL, preferred citation string. All confirmed.
- All 6 blog post URLs with author and date confirmed.
- EFP announcement URL cited.
- Business model (patient free, €39-199/mo clinic) confirmed.
- RSS feed URL listed.
- `clinic@perioskoup.com` for partnerships confirmed.

### Bugs found in current source

**Bug 1 — Duplicate "GDPR-compliant data storage" line (llms.txt lines 37 and 39):**

```
- GDPR-compliant data storage in EU-based servers        ← line 37
- Educational content library on periodontal conditions and treatments  ← line 38
- GDPR-compliant data storage in EU-based servers        ← line 39 (exact duplicate)
```

The GDPR line is listed twice in the "What Perioskoup Does" section. AI systems parsing this will include the duplicate in any summary they generate. This reduces credibility.

**Bug 2 — llms.txt lists "Educational content library" as a current feature (line 38):**

The live Features.tsx shows Education Library with a `badge: "Coming Soon"`. The llms.txt file lists it without qualification as a current capability. This is the same category of accuracy issue as the llms-full.txt stale content (see Section 8).

**Bug 3 — No `dateModified` or standardised last-updated field:**

The file header says `# Last updated: 2026-03-06` which is a comment, not a machine-readable field. Low priority but notable.

---

## 5. Content Pattern: Question → Direct Answer → Supporting Detail

**Score: 7.0 / 10 — No change**

### Blog posts (excellent — 9/10)

The answer capsule pattern delivers exactly the "question → direct answer → supporting detail" structure AI systems need. The capsule is always 1-3 sentences, phrased declaratively, positioned immediately after the H2. This is the correct architecture and should not be changed.

### Static pages (weak — 4/10)

Static page content is structured for visual marketing. The strongest element is the "What is an AI dental companion?" section on Home (H2 is a direct question), but the answer is structurally weak due to element splitting and repetition as noted in Section 1.

### Quotability audit — confirmed strong assets

All five quotable blocks are correctly marked up with `<blockquote>` and `<footer>` attribution:

| Quote | Source | Pages | Extractable |
|---|---|---|---|
| "Perioskoup was born out of two big challenges..." | Dr. Anca Constantin, blockquote+footer | Home, ForDentists, About | YES |
| "Perioskoup is an innovative digital tool..." | European Federation of Periodontology, blockquote+footer | Home, About | YES |
| "The app I always wished I could prescribe..." | Dr. Anca Laura Constantin, img+text | Home | YES (no blockquote tag) |
| 80% stat with Kessels 2003 DOI link | BMJ journal citation with href | Home, ForDentists, About | YES |
| 87% stat with Toniazzo et al. DOI link | JCP journal citation with href | Home, ForDentists, About | YES |

**One issue:** The third quote ("The app I always wished I could prescribe") in Home.tsx (lines 361-369) uses a `<blockquote>` tag but the attribution uses `<div>` + `<p>` elements instead of `<footer>`. This is semantically correct (the quote is inside blockquote) but the attribution pattern is inconsistent with the other quotes on the same page. Low priority.

---

## 6. Dr. Anca Person Schema — Current State

**Score: 8.5 / 10 — One issue resolved (jobTitle), one remains (About.tsx redundant Person)**

### Global entity in index.html (lines 115-148) — verified

All major fields confirmed present and correct:

- `@type: ["Person", "Physician"]` — dual type correct
- `@id: "https://perioskoup.com/#anca-constantin"` — globally referenceable
- `"jobTitle": "Periodontist & Chief Dental Officer"` — CONFIRMED FIXED (line 122). Previous re-audit flagged "Periodontist" only; this is now correct.
- `memberOf: { "@type": "Organization", "name": "European Federation of Periodontology", "url": "https://www.efp.org" }` — present (line 124)
- `description` — full bio present (line 125)
- `image: "https://perioskoup.com/images/anca-headshot.jpg"` — absolute URL confirmed
- `sameAs: [EFP URL, LinkedIn URL]` — both confirmed (lines 145-147)
- `award` — "EFP Digital Innovation Award 2025 — 3rd Prize, European Federation of Periodontology"
- `knowsAbout` — 5 topics confirmed
- `hasOccupation` with `occupationLocation: Bucharest` — confirmed

**Still missing from global entity (unchanged from original audit):**
- `alumniOf` — no educational institution listed
- `hasCredential` — no `EducationalOccupationalCredential` for "Specialist in Periodontology"

These are not blocking issues for AI citation, but they would strengthen the Knowledge Graph entity signal.

### About.tsx Person schema — Core problem still not fixed

**About.tsx lines 23-43 still emit a full Person declaration** with 20+ properties for the same `@id` as the global entity. This is the same entity being fully declared twice: once in `index.html`'s `@graph` (authoritative) and once in `About.tsx`'s inline `<script>`. The properties are now more consistent than in the original audit, but the structural problem remains: two complete JSON-LD Person declarations with the same `@id` create entity ambiguity in Knowledge Graph construction.

**Key divergence found:**

The About.tsx Person at line 31 has `"jobTitle": "Periodontist"` (no CDO), while the global entity at index.html line 122 now correctly has `"Periodontist & Chief Dental Officer"`. This inconsistency means the fixed jobTitle in the global entity is contradicted by the About.tsx declaration.

```typescript
// About.tsx line 31 — WRONG:
"jobTitle": "Periodontist",

// index.html line 122 — CORRECT:
"jobTitle": "Periodontist & Chief Dental Officer",
```

This is a new regression introduced when the global entity was updated but About.tsx was not updated to match.

### BlogPost.tsx authorSchema — Confirmed correct

Lines 763-779: Conditional `authorSchema` pattern is intact. Dr. Anca's articles use `"@id": "https://perioskoup.com/#anca-constantin"` with EFP `sameAs`. Eduard's articles use only `worksFor` `@id` reference. `dateModified` present. `OG_IMAGE` constant is absolute URL (line 17).

---

## 7. RSS Feed for Content Discovery

**Score: 9.0 / 10 — One minor issue remains**

### Confirmed fixed from previous audit

- `<url>https://perioskoup.com/images/logomark-dark.png</url>` — absolute URL confirmed at line 13. P0 bug is resolved.
- All 6 articles listed with `<link>`, `<description>`, `<pubDate>`, `<dc:creator>`, `<category>`, `<guid isPermaLink="true">`.
- `<atom:link>` self-reference present.
- RSS feed linked in `index.html` with `<link rel="alternate" type="application/rss+xml">`.
- Feed URL listed in `llms.txt`.

### Remaining gaps

**Gap 1 — `<language>en-GB</language>` (line 7):** The site's HTML lang was corrected to `"en"`, geo region to `"RO"`, hreflang to `en`. The feed language should be consistent. This is a minor technical inconsistency.

**Gap 2 — No `<content:encoded>` full article body:** AI content aggregators see only the excerpt (80-100 words). Full-text RSS would significantly improve AI discoverability. This remains a P3 gap that has never been addressed.

---

## 8. llms-full.txt Accuracy — Still Contains Stale Feature Content

**Score: 7.5 / 10 — Two issues remain from re-audit**

### What is correct (from re-audit fixes)

- How It Works steps: "Visit Your Dentist / Get Your Plan / Build Daily Habits" — confirmed correct at lines 64-66.
- Unsourced statistics (40%, 3x, 85%) removed and replaced with cited research — confirmed.
- Dr. Anca's About section credentials confirmed present.

### Stale content still present

**Issue 1 — `Engagement Analytics` section (lines 191-196):**

```
3. Engagement Analytics
   Track which patients are following their care plans and which need a nudge. Identify patterns across your practice and intervene before problems escalate.
   - Individual engagement scores
   - Practice-wide trend analysis
   - At-risk patient flagging
   - Monthly engagement reports
```

The live `ForDentists.tsx` has renamed this to "Engagement Insights" and describes it as "coming in Q2 2026" with bullets including "Engagement visibility (in development)" and "Practice-wide insights (coming Q2 2026)". The `llms-full.txt` version presents it as a current, fully-featured tool with "at-risk patient flagging" and "monthly engagement reports" — neither of which appears on the live page.

AI systems reading `llms-full.txt` as the primary content source (which they will, since this is a JavaScript SPA) will describe Perioskoup as having a fully operational engagement analytics system with at-risk patient flagging. This contradicts the live site.

**Issue 2 — `About` section credits "PhD in Periodontology" (line 230):**

```
Dr. Anca Laura Constantin — Periodontist & Co-founder, CDO
DMD, PhD in Periodontology
```

The `llms.txt` file correctly says "DMD, Specialist in Periodontology". The About.tsx team card (line 268) also says "DMD, PhD in Periodontology". If Dr. Anca holds a PhD, the inconsistency is in `llms.txt`, not `llms-full.txt`. If she does not, then both `llms-full.txt` and About.tsx are incorrect. This credential claim needs to be verified and made consistent across all three locations.

**Issue 3 — `llms-full.txt` About section "3x better outcomes" stat (line 224):**

```
- 3x better outcomes with digital support
```

This statistic appears in the About section of `llms-full.txt` but is not sourced to a journal citation. The corresponding section on the live About.tsx page (lines 194-207) shows only three stats with DOI links (Bernabe 62%, Kessels 80%, Toniazzo 87%). The unsourced "3x" stat should either be removed or replaced with the cited Toniazzo (87%) figure.

---

## 9. Schema Issues Summary — Current State

| Page | Schema Present | Status | Remaining Issues |
|---|---|---|---|
| `index.html` | Organization, WebSite, Person (full), SoftwareApplication | GOOD | Person missing `alumniOf`, `hasCredential` (minor) |
| Home | FAQPage (5 questions) | GOOD | No answer capsules on H2 sections; repeated sentence in "What is an AI dental companion?" section |
| Features | FAQPage (3 questions) | GOOD | — |
| For Dentists | FAQPage (6 questions) | GOOD | — |
| About | Person (full — REDUNDANT with global, jobTitle inconsistent), FAQPage (5 questions) | PARTIALLY CORRECT | Full Person declaration contradicts global entity jobTitle; should be thin `@id` reference |
| Blog Index | ItemList (6 posts), FAQPage (2 questions) | GOOD | — |
| Blog Posts | BlogPosting + BreadcrumbList + FAQPage | GOOD | — |
| Contact | Organization + FAQPage (3 questions) | GOOD | addressCountry: "RO" confirmed |

---

## 10. Issues — Prioritised Action List

| Priority | Issue | File | Line(s) | Impact |
|---|---|---|---|---|
| P0 | About.tsx Person `jobTitle: "Periodontist"` contradicts global entity `jobTitle: "Periodontist & Chief Dental Officer"` — new regression | `client/src/pages/About.tsx` | 31 | AI entity matching uses jobTitle; two conflicting declarations of the same entity |
| P0 | llms-full.txt `Engagement Analytics` section presents removed/renamed feature as fully operational, including "at-risk patient flagging" and "monthly engagement reports" | `client/public/llms-full.txt` | 191-196 | AI systems will describe Perioskoup inaccurately |
| P1 | About.tsx still emits a full 20+ property Person declaration instead of a thin `@id`-only reference — entity declared twice | `client/src/pages/About.tsx` | 23-43 | Knowledge Graph entity ambiguity |
| P1 | llms.txt "What Perioskoup Does" has duplicate GDPR line (lines 37 and 39) | `client/public/llms.txt` | 37, 39 | Duplicate content reduces credibility of summary |
| P1 | llms.txt lists "Educational content library" as current capability without "Coming Soon" qualifier | `client/public/llms.txt` | 38 | Inaccurate capability claim |
| P2 | llms-full.txt About section "3x better outcomes" stat is unsourced | `client/public/llms-full.txt` | 224 | AI cannot verify; responsible AI will not cite unsourced health claim |
| P2 | llms-full.txt credentials say "PhD in Periodontology"; llms.txt says "Specialist in Periodontology" — inconsistent credential claim | `client/public/llms-full.txt` | 230 | AI systems may cite conflicting credential information |
| P2 | RSS feed `<language>en-GB</language>` inconsistent with corrected site locale | `client/public/feed.xml` | 7 | Minor inconsistency |
| P3 | Home.tsx "What is an AI dental companion?" section has repeated sentence across two adjacent `<p>` elements | `client/src/pages/Home.tsx` | 271, 277 | AI extraction gets duplicate content |
| P3 | No answer capsules on static page H2 sections (deferred from all previous cycles) | Home, Features, ForDentists, About | — | Poor AI extractability for non-blog content |
| P3 | RSS missing `<content:encoded>` full article body | `client/public/feed.xml` | — | AI content readers see only excerpts |
| P3 | Person schema missing `alumniOf` and `hasCredential` fields | `client/index.html` | ~115-148 | Missed opportunity for academic authority signals |

---

## 11. Corrected JSON-LD and Copy — What to Fix

### Fix A — About.tsx: Replace Full Person with Thin Reference and Fix jobTitle

**File:** `client/src/pages/About.tsx`

Replace lines 23-43 (`personJsonLd` object) with a thin reference that defers to the global entity:

```typescript
// REPLACE the full personJsonLd object with:
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://perioskoup.com/#anca-constantin"
  // No other properties — index.html @graph is the authoritative declaration
};
```

This prevents the About page from emitting a conflicting declaration and eliminates the `jobTitle: "Periodontist"` contradiction.

### Fix B — llms-full.txt: Replace Stale Engagement Analytics Section

**File:** `client/public/llms-full.txt`  
**Replace lines 191-196:**

```markdown
3. Engagement Insights (coming Q2 2026)
   See which patients are engaging with their care plans.
   - Patient programme overview
   - Appointment preparation briefs
   - Engagement visibility (in development)
   - Practice-wide insights (coming Q2 2026)
```

### Fix C — llms.txt: Remove Duplicate GDPR Line and Qualify Education Library

**File:** `client/public/llms.txt`  
**Replace the "What Perioskoup Does" section (lines 34-39):**

```markdown
## What Perioskoup Does

- Personalised AI-driven oral hygiene routines for patients based on clinician recommendations
- Daily habit tracking with reminders and progress visualisation
- Clinician dashboard for patient engagement visibility between appointments
- GDPR-compliant data storage in EU-based servers
- Educational content library on periodontal conditions (coming soon)
```

Changes: remove duplicate GDPR line, add "coming soon" qualifier to Education Library.

### Fix D — llms-full.txt: Remove Unsourced "3x better outcomes" Stat

**File:** `client/public/llms-full.txt`  
**Line 224 — replace:**

```markdown
# REMOVE:
- 3x better outcomes with digital support

# REPLACE WITH (already cited on live site):
- 87% of mHealth studies show improved oral health outcomes (Toniazzo et al. 2019, JCP)
```

### Fix E — llms-full.txt and About.tsx: Resolve PhD Credential Inconsistency

**Verify first:** Does Dr. Anca hold a PhD in Periodontology?

- If YES: Update llms.txt line 25 to add "PhD" — currently says "DMD, Specialist in Periodontology" without PhD
- If NO: Update About.tsx line 268 and llms-full.txt line 230 to remove "PhD in Periodontology"

The correct authoritative answer is needed before making this change. The current state has a factual discrepancy that AI systems will flag.

### Fix F — feed.xml: Fix Language Code

**File:** `client/public/feed.xml`  
**Line 7 — replace:**

```xml
<language>en</language>
```

### Fix G — index.html Person Schema: Add hasCredential (Optional Enhancement)

**File:** `client/index.html`  
Add after the `hasOccupation` block (after line 142):

```json
"hasCredential": {
  "@type": "EducationalOccupationalCredential",
  "credentialCategory": "Professional License",
  "name": "Specialist in Periodontology",
  "recognizedBy": {
    "@type": "Organization",
    "name": "Romanian College of Dentists"
  }
},
"alumniOf": {
  "@type": "CollegeOrUniversity",
  "name": "University of Medicine and Pharmacy Carol Davila",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bucharest",
    "addressCountry": "RO"
  }
}
```

Note: Only add `alumniOf` if the institution is accurate. Do not fabricate.

---

## 12. Strengths Confirmed Intact

1. **robots.txt AI crawler coverage** — 15 bots explicitly allowed. Best-in-class. No blocking.
2. **Blog post answerCapsules pattern** — all 6 articles confirmed with full capsule coverage. Correct architecture. Do not change.
3. **BlogPosting + BreadcrumbList + FAQPage triple** — confirmed on every blog post. `@id` linkage to global Person entity via conditional `authorSchema` is correct.
4. **Global `@graph` in index.html** — WebSite, Organization, Person, SoftwareApplication in one interconnected graph. `jobTitle` now includes CDO. All `@id` cross-references correct.
5. **About FAQPage with "Who is Dr. Anca Laura Constantin?" as Q1** — highest-value AI citation schema on the site, correctly implemented with full credential context.
6. **EFP blockquote markup** — both EFP quotes (site attribution and Dr. Anca founding quote) use `<blockquote>` + `<footer>` pattern. Most AI-quotable assets on the site.
7. **Cited statistics with live DOI links** — Kessels 2003, Toniazzo 2019, Bernabe 2020 all confirmed with `<a href="https://doi.org/...">` on multiple pages.
8. **RSS feed image absolute URL** — P0 fix from previous cycle confirmed at feed.xml line 13.
9. **Contact page Organization schema** — `addressCountry: "RO"` (previously "EU"), confirmed. All `@id` references correct.
10. **llms.txt Dr. Anca entry** — credential depth, EFP award context, jury names, preferred citation format all confirmed present.

---

## 13. Schema Validation Checklist

Run after implementing fixes:

- [ ] `https://validator.schema.org/` on `https://perioskoup.com/` — expect WebSite, Organization, Person (jobTitle: "Periodontist & Chief Dental Officer"), SoftwareApplication, FAQPage
- [ ] `https://validator.schema.org/` on `https://perioskoup.com/about` — expect FAQPage (5 questions) + thin Person reference (no properties other than @id)
- [ ] `https://validator.schema.org/` on `https://perioskoup.com/blog/what-is-periodontal-disease` — expect BlogPosting + BreadcrumbList + FAQPage
- [ ] `https://validator.w3.org/feed/` on `https://perioskoup.com/feed.xml` — language should be "en"
- [ ] Manual check: `https://perioskoup.com/llms-full.txt` — "Engagement Analytics" should not appear; "At-risk patient flagging" should not appear as current
- [ ] Manual check: `https://perioskoup.com/llms.txt` — GDPR line should appear once; Education Library should include "coming soon"

---

## 14. GEO Score Breakdown

| Category | Score | Notes |
|---|---|---|
| Answer capsules — blog posts | 10/10 | Complete coverage, correct injection pattern |
| Answer capsules — static pages | 2/10 | None; deferred for 3 audit cycles |
| FAQPage schema coverage | 9.5/10 | All pages covered; About Q1 is Dr. Anca |
| AI crawler access (robots.txt) | 10/10 | 15 bots, best-in-class |
| llms.txt accuracy | 7/10 | Duplicate line, unqualified "coming soon" feature |
| llms-full.txt accuracy | 7/10 | Stale Engagement Analytics, unsourced stat |
| Content quotability | 8/10 | Strong blockquote markup; one duplicate sentence |
| Dr. Anca Person schema (global) | 9/10 | jobTitle fixed; lacks hasCredential/alumniOf |
| Dr. Anca Person schema (About) | 4/10 | Full redundant declaration with jobTitle inconsistency |
| RSS feed | 8.5/10 | Image URL fixed; language still en-GB; no content:encoded |
| **Overall** | **8.2/10** | |
