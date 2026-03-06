# GEO Readiness Re-Audit — Perioskoup
**Auditor:** GEO Specialist Subagent (re-audit pass)
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Source of truth:** Current source files — not log claims
**Previous audit:** audit-results/02-geo-readiness.md (score: 7.5/10)
**Fix logs verified:** fix-log-seo.md (Round 1 + Round 2), fix-log-content.md

---

## Overall Score

| Pass | Score | Delta |
|------|-------|-------|
| Original audit (02-geo-readiness.md) | 7.5 / 10 | — |
| This re-audit | **8.5 / 10** | +1.0 |

The majority of P0 and P1 issues from the original audit have been correctly implemented. The +1.0 gain is real but capped by three residual issues that were either partially fixed or not fixed at all: the About page still emits a full redundant Person declaration instead of an `@id`-only reference, `llms-full.txt` contains stale feature content (Secure Messaging and Engagement Analytics sections contradict the live page), and the `jobTitle` field in the global Person schema omits "Chief Dental Officer". No regressions were introduced.

---

## 1. Answer Capsules After H2 Headings

**Original score: 7.5 / 10 — Current score: 7.5 / 10 — No change**

**Verified fixed:**
- Blog posts retain their `answerCapsules: Record<string, string>` pattern in ARTICLES data and the `renderBody()` injection immediately after each H2. All 6 articles confirmed intact. This is correctly untouched.

**Still missing (fix-log-content.md explicitly deferred this):**
- Static pages (Home, Features, ForDentists, About) have no prose answer-capsule block below their H2 sections.
- The "What is an AI dental companion?" H2 on Home (line 268) is followed by a muted `<p>` at 16px then a higher-contrast `<p>` at 18px, then another `<p>` at 17px — three separate paragraph elements with different styling instead of one clean direct-answer block.
- The "Why now?" H2 on About (line 237) still has two `<p>` elements inside a `.reveal` div with no capsule-style wrapper.
- The "What's inside Perioskoup" H2 on Features is still answered by a card grid.

This was explicitly deferred as P3 in fix-log-content.md. It remains the weakest part of the GEO readiness profile for non-blog content. No improvement here.

---

## 2. FAQPage Schema Coverage

**Original score: 8 / 10 — Current score: 9.5 / 10 — Fixed**

**Verified fixed:**
- About page now has FAQPage with 5 questions including "Who is Dr. Anca Laura Constantin?" as the first question. This is the highest-value AI citation schema on the site and it is correctly implemented. The answer text includes her specialty, CDO role, EFP award, and EuroPerio11 context.
- "Who founded Perioskoup?" now correctly says "CDO" not "CEO" (R2-5 confirmed at About.tsx line 62).
- Full coverage across all 8 pages confirmed.

**Remaining gap (minor):**
- The ForDentists FAQPage still uses the fixed regulatory language ("stay connected" not "monitor remotely") — confirmed correct.
- No new gaps identified.

---

## 3. AI Crawlers in robots.txt

**Original score: 10 / 10 — Current score: 10 / 10 — Maintained**

**Verified:** All 15 AI crawlers confirmed present with `Allow: /`. The file includes: GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot, PerplexityBot, Cohere-AI, Bytespider, meta-externalagent, Diffbot, omgili, GoogleOther, CCBot, Applebot-Extended, YouBot. Non-standard `Llms-txt:` and `Llms-full-txt:` discovery directives are present. No action required.

---

## 4. llms.txt Completeness and Accuracy

**Original score: 6.5 / 10 — Current score: 9.0 / 10 — Substantially fixed**

**Verified fixed (R2-16):**
- Dr. Anca's entry now includes: "DMD, Specialist in Periodontology", full EFP award context with jury names and submission count, LinkedIn URL, and preferred citation string.
- All 6 blog post URLs with author and date are present.
- EFP announcement URL explicitly cited.
- Business model section (patient free, clinic €39-199/mo) present.
- RSS feed URL listed.
- Clinic partnerships email added.

**Remaining gap:**
- No `dateModified` field on the file itself. The header says `# Last updated: 2026-03-06` which is non-standard. The llmstxt.org format does not mandate this, but it would help AI crawlers assess freshness.
- The llms.txt entry for `What Perioskoup Does` still lists "Secure messaging between patients and their dental team" and "Educational content library" — both listed as current features in the file, but on the live Features.tsx page these are badged as "Beta", "Coming Soon", or "In Development". This is a minor accuracy inconsistency.

---

## 5. Content Pattern: Question → Direct Answer → Supporting Detail

**Original score: 6.5 / 10 — Current score: 7.0 / 10 — Minor improvement**

**Verified improved:**
- Home FAQPage JSON-LD answers are now correctly phrased (no "real-time engagement data", no "clinical support tool", no "monitor and support remotely"). All three regulatory fixes confirmed in Home.tsx.
- ForDentists FAQPage answers confirmed clean.
- The "What is Perioskoup?" FAQ answer now correctly says "giving clinicians patient engagement visibility between visits" (confirmed Home.tsx line 40).

**Still weak:**
- Static page prose remains structured for visual marketing. No structural improvement to the "question → direct answer → supporting detail" pattern on landing sections. The "What is an AI dental companion?" section on Home has a repeated sentence structure — "An AI dental companion translates clinical recommendations..." appears twice in adjacent `<p>` elements (lines 271 and 277).

**Strong assets confirmed:**
- All five EFP/Dr. Anca quotable blockquotes are correctly marked up with `<blockquote>` + `<footer>` attribution on Home, About, and ForDentists. These are the highest-value AI citation assets on the site.
- All three cited statistics (Kessels 2003, Toniazzo et al. 2019, Bernabe et al. 2020) have live `<a>` links to DOI URLs confirmed on About.tsx and are correctly cited.

---

## 6. Dr. Anca Person Schema

**Original score: 7 / 10 — Current score: 8.0 / 10 — Improved but one issue persists**

### Global entity in index.html — Verified

All P1 fixes confirmed in current source:

- `memberOf: { "@type": "Organization", "name": "European Federation of Periodontology", "url": "https://www.efp.org" }` — present at line 124.
- LinkedIn URL added to `sameAs` array — confirmed at line 146.
- `description` field added with full bio — confirmed at line 125.
- `honorificPrefix`, `givenName`, `familyName` — confirmed.
- `medicalSpecialty: "Periodontology"` — confirmed.
- `knowsAbout` array (5 topics) — confirmed.
- `hasOccupation` with `occupationLocation` — confirmed.
- `award` field with full string — confirmed.
- `image` absolute URL — confirmed.

**Remaining gap in global entity:**
- `jobTitle` is `"Periodontist"` only (line 122). The description text and About.tsx correctly say "Chief Dental Officer" but the jobTitle schema field does not include the CDO role. For Knowledge Graph entity disambiguation, the jobTitle should read `"Periodontist & Chief Dental Officer"`. AI systems use jobTitle for entity identity matching.

### About.tsx Person schema — Partially improved, core problem remains

**Fixed:** `worksFor` now uses `{ "@type": "Organization", "@id": "https://perioskoup.com/#organization" }` (confirmed line 36). LinkedIn added to sameAs (confirmed lines 40-42). `memberOf` added (confirmed line 33).

**Still not fixed:** The original audit recommended replacing the full Person declaration on About.tsx with a thin `@id`-only reference, since the global `@graph` in `index.html` is the authoritative node. The About page still emits a complete Person entity (23 lines of properties, line 23-43) creating a second declaration of the same `@id`. While the properties are now more consistent with the global node, emitting two full declarations of the same `@id` creates entity ambiguity in Knowledge Graph processing. The fix-log-seo.md log claims this was addressed (R2-13) but the actual code shows a full Person object, not a thin reference.

**Recommended fix (unchanged from original audit):**

```typescript
// About.tsx — replace full personJsonLd with thin reference:
const ancaRef = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://perioskoup.com/#anca-constantin"
  // No other properties — index.html @graph is authoritative
};
```

### BlogPost.tsx authorSchema — Verified correct

The conditional `authorSchema` pattern is confirmed intact (lines 763-779). Dr. Anca's articles use `"@id": "https://perioskoup.com/#anca-constantin"` with EFP `sameAs`. Eduard's articles use `worksFor` `@id` reference only. `dateModified` is present (line 791). `OG_IMAGE` constant is absolute URL (line 17). All R2-1 fixes confirmed.

---

## 7. RSS Feed

**Original score: 7.5 / 10 — Current score: 9.0 / 10 — Fixed**

**Verified fixed (R2-2):**
- `<url>https://perioskoup.com/images/logomark-dark.png</url>` — confirmed absolute URL at feed.xml line 13. The critical P0 bug is fixed.

**Remaining minor gaps (unchanged from original):**
- `<language>en-GB</language>` on line 7 — should be `en` to match the site's corrected `lang="en"` and the removal of en-GB hreflang. Low priority.
- No `<content:encoded>` with full article body. AI content readers see only the excerpt. This remains a P3 gap.

---

## 8. noscript / llms-full.txt Accuracy

**Original score: not separately scored — now assessed**

**Verified fixed:**
- noscript How It Works steps updated to "Visit Your Dentist / Get Your Plan / Build Daily Habits" (index.html lines 252-254). Confirmed.
- noscript regulatory language fixed ("stay connected" not "monitor and support remotely") (index.html line 274). Confirmed.
- llms-full.txt How It Works steps: updated to current workflow (lines 64-66). Confirmed — no "Scan/Analyze/Engage" found.
- llms-full.txt unsourced stats: replaced with cited research (Kessels, Toniazzo, Bernabe). Confirmed — no "40% reduction in no-shows" found.

**New gap identified — llms-full.txt Feature content is stale:**

The content-fixer agent removed the Secure Messaging card from `Features.tsx` and demoted Engagement Analytics to "Engagement Insights (coming Q2 2026)" on `ForDentists.tsx`. These changes were NOT propagated to `llms-full.txt`. The file still contains:

- Line 131: "4. Secure Messaging (For Both)" — this feature was entirely removed from Features.tsx
- Line 128: "Streak rewards" and "Weekly engagement reports" — removed from Features.tsx
- Lines 198-203: "3. Engagement Analytics... At-risk patient flagging" — demoted on ForDentists.tsx but still presented as current in llms-full.txt

AI systems reading `llms-full.txt` (the primary non-JS content source) will describe Perioskoup as having a working Secure Messaging feature and At-risk patient flagging — both of which are either removed or explicitly not-launched. This is the most significant remaining accuracy issue on the site.

---

## 9. Schema Issues Summary — Current State

| Page | Schema Present | Status | Remaining Gaps |
|---|---|---|---|
| `index.html` | Organization, WebSite, Person (Dr. Anca), SoftwareApplication | IMPROVED | Person `jobTitle` missing CDO role |
| Home | FAQPage (5 questions) | FIXED | No answer capsules on H2 sections (deferred P3) |
| Features | FAQPage (3 questions) | UNCHANGED | No change from original audit |
| For Dentists | FAQPage (6 questions) | FIXED | Regulatory language cleaned |
| About | Person (full — still redundant), FAQPage (5 questions) | PARTIALLY FIXED | Should use thin `@id` reference; full Person declaration still present |
| Blog Index | ItemList (6 posts), FAQPage (2 questions) | FIXED | — |
| Blog Posts | BlogPosting + BreadcrumbList + FAQPage | FIXED | — |
| Pricing | FAQPage (3 questions), SoftwareApplication | FIXED | — |
| Contact | Organization + FAQPage (3 questions) | FIXED | `addressCountry: "RO"` confirmed correct |

---

## 10. Fix Verification Table — Issue by Issue

| Issue | Priority | Status | Evidence |
|---|---|---|---|
| RSS feed image relative URL | P0 | FIXED | feed.xml line 13: absolute URL confirmed |
| llms-full.txt stale How It Works (Scan/Analyze) | P0 | FIXED | No match for "Scan" / "Analyze / Engage" in llms-full.txt |
| llms-full.txt unsourced stats (40%, 3x, 85%) | P1 | FIXED | No match for "40% reduction" or "3x higher" |
| Person schema missing LinkedIn sameAs | P1 | FIXED | index.html line 146: LinkedIn URL confirmed |
| Person schema missing memberOf (EFP) | P1 | FIXED | index.html line 124: memberOf confirmed |
| About.tsx redundant full Person declaration | P1 | NOT FIXED | About.tsx lines 23-43: full Person object still emitted |
| Contact.tsx addressCountry "EU" | P2 | FIXED | Contact.tsx line 64: "RO" confirmed |
| Dr. Anca LinkedIn missing from llms.txt | P2 | FIXED | llms.txt line 27: LinkedIn URL confirmed |
| llms-full.txt "PhD" vs llms.txt "Periodontist" inconsistency | P2 | FIXED | llms.txt now says "DMD, Specialist in Periodontology" |
| About FAQ missing "Who is Dr. Anca?" | P3 | FIXED | About.tsx lines 50-55: question confirmed as first FAQ entry |
| BlogPost.tsx author @id linkage | P0 (GEO) | FIXED | BlogPost.tsx lines 763-779: conditional authorSchema confirmed |
| llms.txt Dr. Anca credential depth | P0 (GEO) | FIXED | llms.txt lines 25-28: full credential entry confirmed |
| About FAQ CEO→CDO | P0 (R2-5) | FIXED | About.tsx line 62: "CDO" confirmed |
| BlogPost.tsx OG image absolute URL | P0 (R2-1) | FIXED | BlogPost.tsx line 17: OG_IMAGE constant is absolute URL |
| noscript How It Works stale copy | P0 (R2-4) | FIXED | index.html lines 252-254: correct steps confirmed |
| noscript regulatory language | P0 (R2-4) | FIXED | index.html line 274: "stay connected" confirmed |
| Person schema jobTitle missing CDO | NEW | NOT FIXED | index.html line 122: "Periodontist" only — CDO missing |
| llms-full.txt Secure Messaging (removed feature) | NEW | NOT FIXED | llms-full.txt line 131: Secure Messaging section still present |
| llms-full.txt Engagement Analytics / at-risk flagging | NEW | NOT FIXED | llms-full.txt lines 198-203: stale content |
| RSS feed language en-GB | P3 (minor) | NOT FIXED | feed.xml line 7: en-GB |

---

## 11. New Issues Not in Original Audit

### N1 — llms-full.txt feature content diverges from live site (HIGH)

Three content-fixer changes were not propagated to `llms-full.txt`:

1. The Secure Messaging card was removed from Features.tsx but llms-full.txt lines 131-137 still describe it as a current feature.
2. "Streak rewards" and "Weekly engagement reports" were removed from Features.tsx but remain in llms-full.txt line 128-129.
3. "Engagement Analytics" with "At-risk patient flagging" was renamed and demoted to "coming Q2 2026" on ForDentists.tsx but llms-full.txt lines 198-203 still present it as a current feature.

AI systems reading llms-full.txt as the primary content source (which they will do, since this is a JS SPA) will describe Perioskoup inaccurately. This is the most important remaining issue.

**Fix — replace llms-full.txt Feature List section (lines 110-165):**

```markdown
### Feature List

1. AI Clinical Companion (For Patients) — Beta
   Patients get instant, evidence-based answers about their periodontal health in plain language.
   - Personalised oral health guidance
   - Evidence-based answers
   - Understands clinical reports
   - Launching with the app

2. Smart Reminders (For Patients)
   Personalised, adaptive nudges that fit into daily routines. Brushing, flossing, medication — tracked and encouraged.
   - Adaptive reminder timing
   - Habit-based nudge frequency
   - Appointment reminders
   - Opt-in communication

3. Progress Tracking (For Patients)
   Visual timelines and habit logs that show the oral health journey over time.
   - Daily habit logging
   - Visual progress dashboards
   - Routine consistency tools

4. Dentist Dashboard (For Dentists)
   A dedicated portal for clinicians to send care plans and track patient engagement.
   - Patient engagement overview
   - Appointment preparation briefs
   - Multi-patient practice view
   - Exportable summaries

5. Education Library (For Patients) — Coming Soon
   Curated, clinician-approved content about periodontal conditions and home care.

6. Appointment Prep (For Both) — In Development
   Patients arrive better prepared; dentists save time on history-taking.

7. GDPR-Compliant & Secure (For Both)
   End-to-end encrypted, EU-hosted, privacy-first. Patient data never leaves European servers.
   - End-to-end encryption
   - GDPR Article 9 compliant
   - EU-hosted servers
   - Right to erasure built-in
```

**Fix — replace llms-full.txt For Dentists Clinical Tools section (lines 182-204):**

```markdown
### Clinical Tools

1. Practice Dashboard
   A unified view of all your patients — their engagement, last activity, upcoming appointments.
   - Patient engagement heatmaps
   - Appointment preparation briefs
   - Multi-patient practice overview
   - Exportable clinical summaries

2. Personalised Care Plans
   Send custom care plans directly to patients after each appointment.
   - Condition-specific templates
   - Illustrated home care guides
   - Medication reminders
   - Post-procedure instructions

3. Engagement Insights (coming Q2 2026)
   Track which patients are engaging with their care plans.
   - Patient programme overview
   - Appointment preparation briefs
   - Engagement visibility (in development)
   - Practice-wide insights (coming Q2 2026)
```

### N2 — Person schema jobTitle omits CDO role (MEDIUM)

`index.html` global Person node at line 122 has `"jobTitle": "Periodontist"`. The description field correctly says "Chief Dental Officer" and all prose on the site says "CDO". The jobTitle field is the primary field AI systems use for entity identification in Knowledge Graph construction. It should read `"Periodontist & Chief Dental Officer"`.

**Fix — index.html line 122:**

```json
"jobTitle": "Periodontist & Chief Dental Officer",
```

### N3 — RSS feed language still en-GB (LOW)

`feed.xml` line 7: `<language>en-GB</language>`. The site's `lang` attribute was corrected to `en`, geo region to `RO`, and hreflang to `en`. The feed language should match.

**Fix — feed.xml line 7:**

```xml
<language>en</language>
```

---

## 12. Strengths Confirmed Intact

1. **robots.txt AI crawler allowlist** — 15 bots explicitly allowed. Best-in-class. Untouched.
2. **Blog post answerCapsules pattern** — fully intact across all 6 articles. Correctly untouched.
3. **BlogPosting + BreadcrumbList + FAQPage triple** — confirmed on every blog post with correct `@id` author linkage.
4. **Global `@graph` in index.html** — WebSite, Organization, Person, SoftwareApplication with proper cross-referenced `@id` nodes. Significantly improved.
5. **EFP blockquote markup** — `<blockquote>` + `<footer>` attribution pattern confirmed on Home and About. These are the most AI-quotable assets on the site.
6. **Five FAQ questions on About page** — including "Who is Dr. Anca Laura Constantin?" as the first — this is now schema-optimised for the highest-value AI citation target.
7. **llms.txt Dr. Anca entry** — credential depth now matches EFP audit recommendations. Preferred citation format included.
8. **Contact page Organization schema** — correctly references `@id` to global entity, `addressCountry: "RO"`, `legalName: "Perioskoup SRL"`. All P2 fixes confirmed.

---

## 13. Prioritised Remaining Action List

| Priority | Issue | File | Impact |
|---|---|---|---|
| P0 | llms-full.txt features section contains removed/deferred features (Secure Messaging, Streak rewards, At-risk flagging) | `client/public/llms-full.txt` lines 110-203 | AI systems describing Perioskoup based on this file will be inaccurate |
| P1 | About.tsx still emits full Person declaration instead of thin `@id` reference — two declarations of the same `@id` entity | `client/src/pages/About.tsx` lines 23-43 | Entity ambiguity in Knowledge Graph construction |
| P1 | Person schema `jobTitle` missing CDO role in global index.html entity | `client/index.html` line 122 | AI entity identification uses jobTitle; "Chief Dental Officer" is the differentiating credential |
| P2 | RSS feed `<language>` still en-GB | `client/public/feed.xml` line 7 | Minor inconsistency with corrected site locale |
| P3 | Static page H2 sections have no answer capsule (no change from original audit) | Home, Features, ForDentists, About | Poor AI extractability for non-blog content |
| P3 | RSS missing `<content:encoded>` full article body | `client/public/feed.xml` | AI content readers see only excerpts |
| P3 | llms.txt "What Perioskoup Does" section still lists Secure Messaging and Education Library as current features | `client/public/llms.txt` lines 37-38 | Minor inconsistency with live Features.tsx state |

---

## 14. Schema Validation Checklist

Run after implementing remaining fixes:

- [ ] `https://validator.schema.org/` on `https://perioskoup.com/` — Person jobTitle should show "Periodontist & Chief Dental Officer"
- [ ] `https://validator.schema.org/` on `https://perioskoup.com/about` — should emit only one Person entity (thin `@id` reference + FAQPage)
- [ ] `https://validator.schema.org/` on `https://perioskoup.com/contact` — Organization addressCountry: "RO" — already passing
- [ ] `https://validator.w3.org/feed/` on `https://perioskoup.com/feed.xml` — language should be "en"
- [ ] `https://perioskoup.com/llms-full.txt` — "Secure Messaging" should not appear as a current feature
