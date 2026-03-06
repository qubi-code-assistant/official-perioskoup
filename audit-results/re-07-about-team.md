# Re-Audit 07 — About / Team Page Trust Analysis (Post-Fix)
**Auditor:** Health-Tech Brand Trust Specialist
**Date:** 2026-03-06
**Branch:** fix/final-launch-audit
**Pages reviewed:** About.tsx, Home.tsx, index.html (global schema), client/public/llms.txt
**Previous score:** 5.5 / 10
**Re-audit score: 6.5 / 10**

---

## Summary of What Was Fixed

This re-audit verifies the fixes declared in fix-log-content.md and fix-log-seo.md against live source code. The following items have been confirmed resolved in the current codebase.

---

## 1. Founder Title Correctness — Verification

### CEO -> CDO in FAQ Schema — FIXED (P0 resolved)
`About.tsx` line 62 — FAQ "Who founded Perioskoup?" answer now reads:
```
"Dr. Anca Laura Constantin (Periodontist, CDO)"
```
The CEO title that appeared in the indexed FAQ structured data is gone. This was the highest-exposure title error in the prior audit.

### Visible Team Card — Correct (unchanged, confirmed)
`About.tsx` line 268: `role: "Periodontist & Co-founder, CDO"` — correct.

### Dr. Anca Quote Attributions in Home.tsx — FIXED (P1 resolved)
Both attributions now include the CDO title:
- Hero blockquote footer (line 111): "Dr. Anca Constantin, Periodontist & CDO, Perioskoup" — correct.
- Social proof section (line 368): "Periodontist & Chief Dental Officer, Perioskoup" — correct, and the longer form is more authoritative here.

### About.tsx Dr. Anca Quote Block — Correct
Within the About page's dedicated quote section (line 226): "Periodontist & Co-founder, CDO" — consistent.

### Eduard Ciugulea — Correct
`About.tsx` line 269: "CGO & Co-Founder" — correct throughout.

### Petrica Nancu — Correct
`About.tsx` line 270: "CTO & Head of AI" — correct throughout.

**Title accuracy: all instances now correct. Zero title errors remain in any page, schema, or structured data block.**

---

## 2. Dr. Anca's Clinical Authority — Post-Fix State

### What Is Now Working

**Credentials visually elevated.**
`About.tsx` line 280: Dr. Anca's `creds` field now renders at 13px, `#F5F9EA` (full text color), `fontWeight: 600`. This is a clear improvement over the prior 12px muted treatment. The credentials "DMD, PhD in Periodontology" are now readable, not invisible.

**Person schema: LinkedIn now in sameAs — FIXED.**
`About.tsx` lines 39-42: The `sameAs` array in the page-level Person schema now contains both the EFP press release URL and `https://www.linkedin.com/in/anca-constantin-99800633b/`. This was the most important schema gap from the prior audit.

**worksFor now has @type — FIXED.**
`About.tsx` line 36: `"worksFor": { "@type": "Organization", "@id": "https://perioskoup.com/#organization" }` — the broken graph reference is repaired. Google can now resolve the Organization node.

**Global index.html Person schema: LinkedIn in sameAs — FIXED.**
`index.html` lines 144-147: The global `@graph` Person node also has both EFP URL and LinkedIn in `sameAs`. Consistent across both schema locations.

**FAQ now has a "Who is Dr. Anca?" question as the first entry — ADDED.**
`About.tsx` lines 50-55: New FAQ question with a 2-sentence answer covering her specialty, CDO role, and EFP award prize tier. This is the highest-value AI citation target on the About page and it is now in structured data.

**llms.txt: Dr. Anca credentials enriched — FIXED.**
The llms.txt now includes DMD credential, "Specialist in Periodontology" designation, full EFP award context with jury names and submission count, LinkedIn URL, and a preferred citation string. This is the best performer across all machine-readable signals on the site.

**Organization schema has legalName — FIXED.**
`index.html` line 81: `"legalName": "Perioskoup SRL"` — the company legal identity is now in the global schema.

**FAQPage "Where is Perioskoup based?" answer — Added.**
`About.tsx` line 76-79: "Romanian SRL incorporated in June 2025" — legal identity is now in structured data (though not in visible page copy).

### What Still Remains Missing — Ranked by Impact

**1. Award prize tier absent from all visible on-page badge text — still not fixed.**
Both the About page award badge (line 149-151) and the Home page award badge (line 191-193) still read "EFP Innovation Award Winner 2025". The structured data, FAQ answers, and llms.txt all correctly state "3rd Prize". The visible page copy does not. A clinician who reads the page, not the source, sees implied top-prize status. This is a transparency issue that the prior audit flagged as P2. It was not applied in either content or SEO fix logs.

**2. No named clinic or practice reference in visible copy.**
The About page hero (line 126) still says "her periodontal clinic in Bucharest" — unnamed, unlinked. The bio paragraph (line 268) says nothing about active current practice. The schema description (line 34) says "practising periodontist" which is the right wording, but this does not appear anywhere in on-page visible text.

**3. No publications, conference presentations, or research links.**
Zero academic citations attributed to Dr. Anca personally appear anywhere on the site. "Speaker, EuroPerio11, Vienna, May 2025" would cost nothing to add and substantially changes the authority profile.

**4. Person schema type remains ["Person", "Physician"] — not updated to "Dentist".**
Both `About.tsx` (line 25) and `index.html` (line 116) still use `["Person", "Physician"]`. Schema.org's `Dentist` type is the more specific and accurate type for a periodontist. This is a minor schema precision issue, not a trust blocker, but it was called out in the prior audit and not addressed.

**5. No @graph with Eduard and Petrica as Person nodes — not implemented.**
The prior audit's P1 recommendation to replace the single-person schema with a full `@graph` array covering all three founders was not implemented. `About.tsx` still has a single Person schema for Dr. Anca only. Eduard and Petrica have no Person JSON-LD anywhere on the site. The global `index.html` @graph lists them only as inline objects in the `founders` array, not as named graph nodes with @id, jobTitle, or sameAs.

**6. alumniOf absent — no DMD institution in schema.**
Both Person schema locations omit `alumniOf`. The institution that awarded Dr. Anca's DMD and PhD in Periodontology would materially strengthen E-E-A-T signal. This was flagged P2 in the prior audit and not addressed.

**7. jobTitle in schema is "Periodontist" only — does not reflect CDO role.**
`About.tsx` line 31 and `index.html` line 122: `"jobTitle": "Periodontist"`. The CDO role that is visible on the page is not reflected in the schema jobTitle. Should be "Periodontist; Chief Dental Officer, Perioskoup".

---

## 3. Person Schema Coverage — Post-Fix Assessment

### Dr. Anca Constantin — Substantially Improved

The `personJsonLd` block in `About.tsx` now has:
- `@id`, `name`, `honorificPrefix`, `givenName`, `familyName` — correct
- `jobTitle: "Periodontist"` — present but incomplete (CDO missing)
- `medicalSpecialty: "Periodontology"` — correct
- `@type: ["Person", "Physician"]` — should be "Dentist"
- `memberOf: EFP` — correct
- `description` — accurate, "practising periodontist" wording present
- `image` — URL set
- `worksFor` — now has `@type` and `@id`, graph reference is clean
- `award` — "3rd Prize" now in schema award string
- `knowsAbout` — populated
- `sameAs` — EFP URL + LinkedIn — now complete

Missing from both About.tsx and index.html Person schema:
- `alumniOf` — no university for DMD or PhD
- `url` — no canonical URL anchoring the person entity to a page
- `jobTitle` does not include CDO role

### Eduard Ciugulea — No Schema (unchanged)
No Person JSON-LD for Eduard exists anywhere. The index.html global @graph lists him as an inline object in the founders array, which does not create a resolvable Knowledge Graph node.

### Petrica Nancu — No Schema (unchanged)
Same situation as Eduard.

### Organization Schema — Fixed and Functional
`index.html` global Organization node now has:
- `legalName: "Perioskoup SRL"` — added
- `foundingDate: "2025-06"` — correct
- `foundingLocation` with Bucharest, RO — correct
- `award: "EFP Digital Innovation Award 2025 — 3rd Prize"` — correct, includes tier
- `email` — present
- `@id` that resolves correctly
- `founders` array references `@id` for Anca and inline objects for Eduard/Petrica

The `worksFor` reference from the Person schema now correctly points to this Organization @id.

---

## 4. Individual /team/[name] Pages — Unchanged

No individual founder profile pages exist. `App.tsx` has no `/team` or `/team/:name` routes. No team URLs appear in `sitemap.xml`. This was P3 in the prior audit and was not addressed. It remains the single largest structural gap for branded search capture and long-form credential presentation.

The absence of a `/team/dr-anca-constantin` page continues to mean:
- No page on this domain can rank for "Dr. Anca Constantin periodontist" searches
- No canonical `url` in Person schema to anchor the Knowledge Graph node
- No linkable asset for press, dental associations, or academic citations

---

## 5. Founding Story — Post-Fix Assessment

The founding story copy is unchanged from the prior audit. The hero paragraph, "Why Now" section, and team bios are identical. The story still ends at the observation ("decided to build the solution herself") with no second act, no timeline, and no team formation narrative.

The one addition is the FAQ structured data, which includes "Where is Perioskoup based?" — this adds legal entity and location context, but it is in schema only, not in visible prose.

Gaps that remain:
- No milestone timeline (2024 problem observed / early 2025 prototype / May 2025 EFP Award / June 2025 SRL / 2026 launch)
- No team formation story (how Eduard in Northampton and Petrica joined a Bucharest periodontist's project)
- "Why Now" section remains generic macro-trend boilerplate without periodontal specificity

---

## 6. Missing Trust Infrastructure — Post-Fix Assessment

### Advisory Board / Clinical Advisors — Still Absent
No advisory board mentioned anywhere on the site. The EFP jury professors (Deschner, Herrera, Stavropoulos) are named in the award copy but solely as jury members, with no advisory relationship implied. No change from prior audit.

### University / Research Partnerships — Still Absent
No academic affiliations anywhere on the site.

### Press / Coverage Section — Still Absent
The EFP award is linked but not framed as third-party media coverage. No "As featured in" or "Coverage" section exists.

### Company Legal Identity — Partially Fixed
The legal entity "Perioskoup SRL" now appears in:
- Organization schema `legalName` (index.html)
- FAQ structured data "Where is Perioskoup based?" answer (About.tsx)
- llms.txt "Founding" section

It still does not appear in any visible on-page text (About page body copy, footer, or anywhere a human reader would see it). The footer still reads only "Made in Europe".

### Waitlist Social Proof — Still Absent from About Page
"30+ founding clinics" appears in the homepage micro-bar but not on the About page. The CTA section (lines 294-315) mentions "founding clinics" in text but gives no number.

---

## 7. What the Fixes Actually Delivered

The fix agents addressed the most technically damaging items (the indexed FAQ schema CEO error, broken schema graph reference, missing LinkedIn in sameAs) and the highest-visibility copy items (both CDO attributions on Home.tsx). They also enriched the llms.txt substantially, which is important for AI citation quality.

Quantified improvements:
- CEO->CDO in indexed structured data: fixed (P0, highest risk)
- LinkedIn in sameAs (About.tsx + index.html): fixed (P1, Knowledge Graph confidence)
- worksFor @type added (About.tsx): fixed (P1, graph resolution)
- CDO in hero blockquote attribution (Home.tsx): fixed (P1, homepage trust)
- CDO in social proof attribution (Home.tsx): fixed (P1, homepage trust)
- Dr. Anca credentials visual prominence (About.tsx): fixed (P2, credential visibility)
- "Who is Dr. Anca?" FAQ question added to About page schema: new (P1, AI citation)
- Organization legalName added (index.html): fixed (P2, legal transparency in schema)
- llms.txt Dr. Anca credentials enriched: fixed (P1, AI crawler authority signals)

Items from the prior audit's "Before Launch" list that were NOT implemented:
- "3rd Prize" in visible award badge text — not applied
- Founding timeline section — not added
- "30+ founding clinics" on About page — not added
- Active practice statement in bio — not added
- Company legal identity in visible text — not added
- Press/coverage framing of EFP award — not added

---

## 8. Score Breakdown

| Dimension | Prior Score | Current Score | Notes |
|---|---|---|---|
| Trust signal density for health-tech | 4.5/10 | 5/10 | Legal entity in schema; award context richer; visible page still thin |
| Dr. Anca authority maximization | 4/10 | 5.5/10 | Schema improved significantly; credentials more visible; still no practice name, no publications |
| Founder title accuracy | 7/10 | 9.5/10 | All instances corrected — cards, FAQ schema, both Home.tsx attributions |
| Individual team pages | 0/10 | 0/10 | No /team routes created |
| Founding story quality | 5/10 | 5/10 | Copy unchanged |
| Advisory / external validation layer | 1/10 | 1/10 | Unchanged |
| Person schema completeness | 4/10 | 6/10 | Dr. Anca schema materially improved; Eduard/Petrica still schema-less |
| Professional profile links (visible) | 5/10 | 5.5/10 | LinkedIn links in cards; llms.txt enriched with all three LinkedIn URLs |
| Press / coverage section | 1/10 | 1/10 | Unchanged |
| Company identity transparency | 1/10 | 2.5/10 | legalName in schema and FAQ; still absent from visible page copy |

**Overall: 6.5 / 10** (up from 5.5)

The 1-point improvement reflects genuine, non-trivial fixes to the highest-risk structured data errors and the most visible trust copy. The ceiling remains constrained by unchanged structural gaps: no team pages, no advisory layer, no press section, no founding timeline, and no visible company legal identity.

---

## 9. Remaining Priority Actions

### Still Required Before Launch

1. **Add "3rd Prize" to the visible About page award badge** (About.tsx line 149).
   Change "EFP Innovation Award Winner 2025" to "EFP Digital Innovation Award — 3rd Prize, 2025". The schema is honest; the visible badge should match.

2. **Add legalName to visible page copy** — even one line in the About CTA section footer or the site footer: "Perioskoup SRL, Bucharest, Romania, incorporated June 2025."

3. **Add active practice statement to Dr. Anca's bio** (About.tsx line 268):
   Append "She continues to see patients at her specialist practice in Bucharest." to the existing bio copy.

4. **Fix Person schema jobTitle** (About.tsx line 31 and index.html line 122):
   Change `"Periodontist"` to `"Periodontist; Chief Dental Officer, Perioskoup"`.

5. **Fix Person schema @type** (About.tsx line 25 and index.html line 116):
   Change `["Person", "Physician"]` to `["Person", "Dentist"]` for schema.org precision.

6. **Add Eduard and Petrica as Person nodes** — at minimum in index.html @graph with @id, name, jobTitle, and sameAs LinkedIn. This does not require a new page, just 20 lines of JSON-LD.

### Strategic (Post-Launch)

7. Create `/team/dr-anca-constantin` standalone page — full credentials, publications, Person schema with `url` canonical, and internal link target for all other pages.

8. Add founding timeline section to About page between "Why Now" and "The Team".

9. Add "As featured in" / "Coverage" row with EFP announcement framed as external press.

10. Add named clinical advisor, even a single person, to the team section.

11. Add `alumniOf` to Person schema with the institution that awarded Dr. Anca's DMD and PhD.
