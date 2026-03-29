# Cycle 2 Audit — About / Team Page Trust Analysis
**Auditor:** Health-Tech Brand Trust Specialist
**Date:** 2026-03-06
**Cycle:** 3rd review (cycle2- prefix). Prior: 07-about-team.md (score 5.5), re-07-about-team.md (score 6.5).
**Branch:** fix/final-launch-audit
**Files examined:** About.tsx, Home.tsx, App.tsx, index.html, Footer.tsx, sitemap.xml, llms.txt, client/public/llms.txt
**Score: 6.5 / 10**

---

## Executive Summary

The score is unchanged from the re-audit at 6.5/10. No trust-material changes have been made to the About page or Home page since the re-audit was filed. Every finding documented in re-07-about-team.md remains accurate and open. The schema work, LinkedIn additions, and CDO title corrections from the first fix cycle are intact and correct. The structural gaps — no individual team pages, no founding timeline, no advisory layer, no visible company legal identity, award prize tier absent from all visible badges — are all unchanged.

This cycle-2 audit verifies the current code state line by line, re-evaluates each dimension against the original audit criteria, and updates the priority list to reflect what is genuinely pre-launch critical versus what can wait.

---

## 1. Founder Title Accuracy — Current Code State

### All Instances Verified

**About.tsx — team card data (lines 268-270):**
- Dr. Anca: `role: "Periodontist & Co-founder, CDO"` — correct.
- Eduard: `role: "CGO & Co-Founder"` — correct.
- Petrica: `role: "CTO & Head of AI"` — correct.

**About.tsx — Dr. Anca quote block (line 226):**
`"Periodontist & Co-founder, CDO"` — correct.

**About.tsx — FAQ schema (line 62):**
`"Dr. Anca Laura Constantin (Periodontist, CDO)"` — correct. The CEO error from the original audit is confirmed absent.

**Home.tsx — hero blockquote attribution (line 111):**
`"Dr. Anca Constantin, Periodontist & CDO, Perioskoup"` — correct.

**Home.tsx — social proof section (line 368):**
`"Periodontist & Chief Dental Officer, Perioskoup"` — correct. The longer form is used here, which is the highest-authority rendering.

**index.html — global Person schema (line 122):**
`"jobTitle": "Periodontist & Chief Dental Officer"` — correct.

**index.html — Organization founders array (lines 99-100):**
Eduard: `"jobTitle": "Co-founder & CGO"` — correct.
Petrica: `"jobTitle": "CTO & Head of AI"` — correct.

**index.html — noscript block (line 223):**
`"Dr. Anca Constantin, Periodontist & Co-founder"` — CDO title is absent here. This is a noscript fallback for crawlers that cannot execute JavaScript. It is not visible to human users but is indexed by some crawlers. This is the only remaining title inconsistency in the codebase, and it is low-exposure.

**Verdict: 9.5/10 accuracy. One noscript-only omission of CDO. Zero CEO errors remain.**

---

## 2. Dr. Anca's Clinical Authority — Is It Maximized?

### What Is Working (Confirmed from re-audit, still intact)

- EFP Award section on About page: ceremony photo, EFP jury names, official link. Visually strong.
- Dr. Anca's credentials ("DMD, PhD in Periodontology") now render at 13px, `#F5F9EA`, fontWeight 600 — readable, not buried.
- Person schema in About.tsx: `honorificPrefix`, `medicalSpecialty`, `memberOf` (EFP), `award` with "3rd Prize", `description` with "practising periodontist", `sameAs` with both LinkedIn and EFP URL.
- LinkedIn links present in team cards for all three founders.
- llms.txt: full credential string including "DMD, Specialist in Periodontology", preferred citation string, EFP award context with jury names, LinkedIn URL.
- Home.tsx hero blockquote at maximum prominence with CDO attribution.
- Social proof section on homepage: Dr. Anca photo + "Chief Dental Officer" title.
- FAQ structured data: new "Who is Dr. Anca Laura Constantin?" question as first FAQ entry — highest-value AI citation target.

### What Remains Missing — Ranked by Impact

**1. Award prize tier absent from all visible on-page badge text.**
The About page award badge (About.tsx line 149-151) reads: `"EFP Innovation Award Winner 2025"`. The Home page EFP card badge (Home.tsx line 192) reads: `"EFP Innovation Award Winner 2025"`. The Home page hero badge (Home.tsx line 88) reads: `"EFP Award Winner 2025"`. The stats row on the homepage (Home.tsx line 136) reads: `"EFP Innovation Award"` with `"Winner"` as the value. None of these visible surfaces disclose "3rd Prize." The structured data, llms.txt, and FAQ answers all correctly state "3rd Prize." The visible page does not. A clinician who reads the page and then clicks the EFP link will see "3rd Prize" and may question why it was not stated. Proactive disclosure of the prize tier is more credible than implied top honors — a product confident enough to say "we placed 3rd from 20 submissions across 17 countries" signals honesty over self-promotion.

**2. No named clinic or verifiable practice reference in visible copy.**
About.tsx hero paragraph (line 126): "her periodontal clinic in Bucharest" — unnamed, unlinked. The bio paragraph says nothing about active current practice. The schema description says "practising periodontist" but this phrase appears nowhere in visible HTML. The single most important trust signal for a clinician evaluating a dental product is evidence that the founding clinician is actively practicing. One sentence would close this gap.

**3. No publications, conference presentations, or research links attributed to Dr. Anca personally.**
llms.txt lists her as author of three blog posts. That is not the same as academic publication. "Speaker, EuroPerio11, Vienna, May 2025" would cost nothing to add to the bio and substantially changes the authority profile from "dentist who built an app" to "clinician-researcher who presented at the world's largest periodontal congress."

**4. Person schema @type is ["Person", "Physician"] — should be ["Person", "Dentist"].**
Both About.tsx (line 25) and index.html (line 116) use this type pair. Schema.org's `Dentist` type is the semantically correct type for a dental professional. `Physician` applies to medical doctors. This has been flagged in both prior audits and is not yet addressed. It is a minor precision issue, not a trust blocker, but it leaves imprecise data in a crawlable position.

**5. Person schema jobTitle in About.tsx does not include CDO role.**
About.tsx line 31: `"jobTitle": "Periodontist"`. The index.html global schema (line 122) correctly uses `"Periodontist & Chief Dental Officer"`. The About.tsx page-level schema lags behind. Google may weight the page-level schema more heavily for the About page URL. The two schemas should be consistent.

**6. alumniOf absent from all Person schema locations.**
No institution is named for the DMD or PhD in Periodontology. The university that awarded these degrees would materially strengthen E-E-A-T signal and give Google a verifiable entity to associate with Dr. Anca's academic credentials. This requires knowing the institution name, which may be intentionally withheld.

**7. Eduard and Petrica have no standalone Person schema nodes.**
The index.html global @graph lists them as inline objects in the `founders` array (lines 99-100) without `@id`, `sameAs`, or `image`. They are not resolvable Knowledge Graph nodes. The re-audit recommended adding them as proper Person nodes. This has not been implemented. For Eduard (CGO, Northampton) and Petrica (CTO & Head of AI), schema completeness matters less than for Dr. Anca from a health-trust perspective, but it matters for brand credibility and Google's ability to attribute the team.

---

## 3. Person Schema — Detailed State

### About.tsx — Page-Level Person Schema (lines 23-43)

```
@type: ["Person", "Physician"]   — should be ["Person", "Dentist"]
@id: correct
name: correct
honorificPrefix: correct
givenName/familyName: correct
jobTitle: "Periodontist"         — missing CDO role (index.html has the correct version)
medicalSpecialty: correct
memberOf: EFP — correct
description: correct — "practising periodontist" wording present
image: correct
worksFor: @type + @id — correct (graph reference repaired in prior fix)
award: "EFP Digital Innovation Award 2025, 3rd Prize..." — correct, includes tier
knowsAbout: populated — correct
sameAs: [EFP URL, LinkedIn URL] — correct, both present
```

Missing from About.tsx page-level schema:
- `alumniOf` — no university
- `url` — no canonical person-entity URL (e.g., `https://perioskoup.com/about#anca-constantin`)
- `hasOccupation` — present in index.html global schema but not in About.tsx page-level schema

### index.html — Global @graph Person Node (lines 115-148)

```
@type: ["Person", "Physician"]   — should be ["Person", "Dentist"]
@id: correct
jobTitle: "Periodontist & Chief Dental Officer" — correct (better than About.tsx)
medicalSpecialty: correct
memberOf: EFP — correct
description: correct
image: correct
worksFor: correct
award: correct with tier
knowsAbout: correct
hasOccupation with occupationLocation: present — good
sameAs: [EFP URL, LinkedIn URL] — correct
```

Missing from global schema:
- `alumniOf`
- `url` canonical for person entity
- Eduard and Petrica as `@id`-bearing Person nodes

### Organization Node — index.html (lines 77-113)
- `legalName: "Perioskoup SRL"` — present
- `foundingDate: "2025-06"` — correct
- `foundingLocation: Bucharest, RO` — correct
- `award` with "3rd Prize" — correct
- `email`, `contactPoint` — present
- `sameAs`: LinkedIn, Instagram, TikTok, EFP URL — present
- `founders` array: Anca as `@id` reference (correct), Eduard and Petrica as inline objects (weaker but present)

The Organization schema is the best-constructed block on the entire site. No action needed on this node other than eventually promoting Eduard and Petrica to `@id`-bearing nodes.

---

## 4. Individual /team/[name] Pages

### Current State

No individual founder profile pages exist. Confirmed in App.tsx — no `/team` or `/team/:name` route. No team URLs in sitemap.xml. Unchanged from all prior audits.

### Why This Remains the Largest Structural Gap

The absence of `/team/dr-anca-constantin` means:

1. No page on this domain can rank for "Dr. Anca Constantin periodontist" or "Dr. Anca Constantin Perioskoup" — queries that will exist after the EFP award generates any press coverage.
2. No canonical `url` can be set in the Person schema — Google cannot anchor the Knowledge Graph node to a stable, crawlable page.
3. No asset exists that journalists, dental associations, or academic partners can link to as a primary source for Dr. Anca's credentials.
4. The EFP award blog post (`/blog/efp-digital-innovation-award-2025`) is in the sitemap but the About page itself has no dedicated person URL to link to from that post.

This is P3 in terms of implementation complexity (requires a new route, new component, new sitemap entry) but P1 in terms of long-term authority capture. The EFP award is a search demand surface. Without a dedicated page, the domain cannot capture that demand.

---

## 5. Founding Story — Compelling and Authentic?

### Content Unchanged

The founding story copy in About.tsx is identical to the prior two audits. No new sections, no timeline, no team formation narrative have been added.

### Existing Strengths

- Hero headline "Born in a dental chair. Built for every patient." is effective and emotionally specific.
- Opening paragraph names a real person in a real place observing a real clinical problem.
- Hero blockquote names two concrete clinical pain points with specificity.
- The "Why Now" section connects three macro trends to the product.

### Persistent Gaps

**The narrative arc stops at the observation.**
"Dr. Anca Constantin saw this every day in her periodontal clinic in Bucharest — and decided to build the solution herself." This is the last sentence of the hero paragraph. The reader never learns how that decision became a company. There is no second act.

**No timeline or dated milestones.**
The About page has no chronological anchors. A four-point timeline — 2024 (problem observed clinically), early 2025 (prototype with founding clinics), May 2025 (EFP Award, Vienna), June 2025 (Romanian SRL incorporated) — would cost nothing to add and substantially changes the founding story from pitch-deck narrative to verifiable history.

**No team formation story.**
How did Eduard (Northampton, UK, full-stack engineer) and Petrica (AI specialist) join a Bucharest periodontist's project? That story is an authenticity signal. Its absence makes the team feel assembled rather than built around a shared mission.

**"Why Now" section is generic.**
The section names AI capability, smartphones as health interface, and patient expectations — none of which are specific to periodontal care or to this team. The section reads as industry boilerplate that could have been written by any health-tech founder. A version that connects these macro trends to specific periodontal research or clinical experience would be far more persuasive.

---

## 6. Missing Trust Infrastructure

### Advisory Board / Clinical Advisors — Absent
No advisory board or named clinical advisor appears anywhere on the site. The EFP jury professors (Deschner, Herrera, Stavropoulos) are named in the award copy but only as "jury members," not as advisors. For a health-tech product, a single named clinical advisor outside the founding team dramatically increases credibility with purchasing clinics and with investors. This is the single highest-leverage trust addition available to the team that does not require building anything.

### University / Research Partnerships — Absent
No academic affiliations mentioned anywhere. A product with PhD-level clinical leadership, an EFP award, and three blog posts authored by the founding clinician has a natural path to a university partnership or research collaboration statement. None exists.

### Press / Coverage Section — Absent
The EFP award is linked on the About page and homepage but framed solely as an award, not as external media coverage. The EFP announcement page is a trusted third-party publication about Perioskoup. Presenting it in an "As featured in" or "Coverage" row — alongside any future press mentions — would create an external validation layer that is entirely absent from the current site.

### Company Legal Identity — Schema Only, Not Visible
`"legalName": "Perioskoup SRL"` exists in the index.html Organization schema (line 81). The FAQ structured data includes "Perioskoup is a Romanian SRL incorporated in June 2025" (About.tsx line 78). The llms.txt includes "Romanian SRL incorporated June 2025." The noscript block footer (index.html line 287) reads "Perioskoup SRL · Bucharest, Romania · Founded June 2025."

However, the visible site footer (Footer.tsx line 122) reads only "Made in Europe." No visible on-page text anywhere on the About page or any other rendered page names the legal entity. For B2B health-tech selling clinic subscriptions at €39-199/month, the absence of a legal company name from visible copy is a trust signal clinics will notice — particularly purchasing managers and compliance officers who vet software vendors.

### Waitlist Social Proof — Missing from About Page
"30+ founding clinics" appears in the homepage micro-bar (Home.tsx line 128) and in llms.txt. It does not appear on the About page. The About CTA section mentions "founding clinics" in text (line 300) but gives no number. This is the strongest social proof signal available and it belongs on the page most focused on establishing trust.

---

## 7. Specific Code Issues by Priority

### P1 — Add "3rd Prize" to visible award badges
All four visible award badge instances on the site currently omit the prize tier. Minimum change: update About.tsx line 149 and Home.tsx line 192. The structured data is honest; the visible page should match.

```tsx
// About.tsx line 149 — current:
EFP Innovation Award Winner 2025

// Correct:
EFP Digital Innovation Award — 3rd Prize, 2025
```

### P1 — Add company legal identity to visible Footer.tsx
Footer.tsx line 122 currently reads "Made in Europe." Change to:

```tsx
// Current:
Made in Europe

// Correct:
Perioskoup SRL · Bucharest, Romania
```

This is a one-line change. It makes the legal entity visible to every clinician who reaches the bottom of any page.

### P1 — Add "30+ founding clinics" to About page CTA section
About.tsx CTA section (around line 299) mentions "founding clinics" without a number. Adding "30+ founding clinics and growing" to this section closes the loop between the homepage micro-bar and the About page.

### P1 — Fix Person schema @type in About.tsx
About.tsx line 25: change `["Person", "Physician"]` to `["Person", "Dentist"]`. The same change is needed at index.html line 116 for consistency.

### P1 — Align jobTitle in About.tsx Person schema with index.html
About.tsx line 31: `"jobTitle": "Periodontist"` should match index.html line 122: `"Periodontist & Chief Dental Officer"`. These are two schema blocks for the same person. Google may see them as conflicting signals.

### P2 — Add active practice statement to Dr. Anca's bio
About.tsx team card bio (line 268) is entirely past-tense and founding-focused. Append one sentence:
"She continues to see patients at her specialist practice in Bucharest."

### P2 — Add Eduard and Petrica as proper Person schema nodes
index.html lines 99-100 define them as inline objects. Promote to named nodes with `@id`, `sameAs` (LinkedIn), `image`, and `jobTitle`. This does not require a new page — only additions to the existing `@graph` array.

### P2 — Fix noscript Dr. Anca attribution
index.html line 223: noscript blockquote footer reads "Dr. Anca Constantin, Periodontist & Co-founder." Should include CDO: "Dr. Anca Constantin, Periodontist, CDO & Co-founder."

### P3 — Add founding timeline section to About page
Between the "Why Now" section and the Team section, add a four-point timeline:
- 2024: Problem identified in clinical practice (Bucharest)
- Early 2025: Prototype built with founding clinics
- May 2025: EFP Digital Innovation Award, 3rd Prize, EuroPerio11, Vienna
- June 2025: Perioskoup SRL incorporated, Romania
- March 2026: Public launch

### P3 — Create /team/dr-anca-constantin route and page
Add route to App.tsx, new TeamAnca.tsx page component, sitemap.xml entry. The page should include: full credential block (DMD, PhD, Specialist in Periodontology), EFP award narrative with jury context, clinical practice statement, LinkedIn link, complete Person schema with canonical `url`, and optional: publications or conference presentations. This is the single highest-value SEO and authority page the team could create.

---

## 8. What Is Working Well

- All founder titles are correct in every rendered location. Zero CEO/wrong-title errors remain in human-visible or Google-indexed content.
- Dr. Anca's credentials ("DMD, PhD in Periodontology") are now visible at readable contrast. Previous audit's concern about 12px muted text is resolved.
- Person schema for Dr. Anca is substantially complete: `@id`, `honorificPrefix`, `medicalSpecialty`, `memberOf` (EFP), `award` with prize tier, `description` as practising clinician, `sameAs` with LinkedIn, `worksFor` with correct graph reference.
- Organization schema is the best-built block on the site: `legalName`, `foundingDate`, `foundingLocation`, `award` with tier, `email`, `contactPoint`, `sameAs` array.
- LinkedIn links are present and working in all three team cards on the About page.
- The EFP award section on the About page is visually strong and links to the official EFP announcement.
- The "Who is Dr. Anca Laura Constantin?" FAQ question is now the first FAQ entry in About page structured data — the highest-value AI citation target on the site.
- llms.txt is the strongest machine-readable authority signal on the site: full credential string, preferred citation format, LinkedIn URLs for all three founders, EFP context with jury names and submission count.
- Clinical statistics block (62%, 80%, 87%) with DOI-linked academic sources is excellent evidence-based content and sets the site apart from typical health-tech landing pages.
- Founding story headline "Born in a dental chair. Built for every patient." is effective and emotionally resonant.

---

## 9. Score Breakdown

| Dimension | Cycle 1 | Re-audit | Cycle 2 | Notes |
|---|---|---|---|---|
| Trust signal density for health-tech | 4.5 | 5.0 | 5.0 | Unchanged. Award strong; advisory absent; legal identity not visible; no press section. |
| Dr. Anca authority maximization | 4.0 | 5.5 | 5.5 | Unchanged. Schema strong; visible page still lacks practice name, prize tier, publications. |
| Founder title accuracy | 7.0 | 9.5 | 9.5 | Unchanged. One noscript omission only. All rendered locations correct. |
| Individual team pages | 0.0 | 0.0 | 0.0 | No /team routes. Unchanged. |
| Founding story quality | 5.0 | 5.0 | 5.0 | Copy unchanged. No timeline, no team formation story added. |
| Advisory / external validation layer | 1.0 | 1.0 | 1.0 | No advisors, no partnerships, no press section. Unchanged. |
| Person schema completeness | 4.0 | 6.0 | 6.0 | Anca's schema substantially improved. Eduard/Petrica remain schema-less. @type precision gap remains. |
| Professional profile links (visible) | 5.0 | 5.5 | 5.5 | LinkedIn in all cards. llms.txt enriched. No change. |
| Press / coverage section | 1.0 | 1.0 | 1.0 | Award linked but not framed as external coverage. Unchanged. |
| Company identity transparency | 1.0 | 2.5 | 2.5 | legalName in schema and FAQ; absent from visible Footer and About page body. Unchanged. |

**Overall: 6.5 / 10**

The score is flat because no changes have been made between the re-audit and this cycle-2 audit. The fixes that were implemented in the first fix cycle (CEO->CDO, LinkedIn in sameAs, worksFor graph repair, credential visual prominence, CDO attributions on homepage) are intact and correctly implemented. The ceiling remains at 6.5 because the structural gaps — no team pages, no advisory layer, no visible company legal identity, no press section, no founding timeline — are all unchanged.

---

## 10. Pre-Launch Priority Actions

These are the actions that should ship before the March 2026 public launch. They are ordered by effort-to-impact ratio.

**Highest impact, lowest effort (< 30 min each):**

1. Add "3rd Prize" to the visible EFP award badge text on About.tsx (line 149) and Home.tsx (line 192). Structured data is honest; visible copy should match.

2. Change Footer.tsx line 122 from "Made in Europe" to "Perioskoup SRL · Bucharest, Romania." One line. Legal transparency on every page.

3. Add "30+ founding clinics" to the About page CTA section. The number exists on the homepage. It belongs here too.

4. Fix Person schema `@type` from `["Person", "Physician"]` to `["Person", "Dentist"]` in both About.tsx (line 25) and index.html (line 116).

5. Align `jobTitle` in About.tsx Person schema (line 31) to match index.html: change `"Periodontist"` to `"Periodontist; Chief Dental Officer, Perioskoup"`.

6. Fix noscript Dr. Anca attribution in index.html (line 223) to include CDO title.

**Medium impact, medium effort (1-3 hours):**

7. Add active practice statement to Dr. Anca's bio in About.tsx (line 268). One sentence appended to existing bio.

8. Add Eduard and Petrica as proper `@id`-bearing Person nodes to the index.html global @graph with LinkedIn in `sameAs`.

9. Add founding timeline section to About.tsx between "Why Now" and "The Team." Four milestones, styled consistently with existing section design.

**Strategic (post-launch, high long-term value):**

10. Create `/team/dr-anca-constantin` route in App.tsx with a dedicated TeamAnca.tsx page. Full credentials, publications, complete Person schema with canonical `url`, and internal link from the About page team card. This is the highest-value SEO and authority action available to the team post-launch.

11. Add a named clinical advisor — even a single person — to the team section or a dedicated advisory block. This is the single change with the highest trust impact that does not require technical work.

12. Add an "As featured in" or "Coverage" row with the EFP announcement URL framed as third-party press, not just an award.

