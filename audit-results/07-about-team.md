# Audit 07 — About / Team Page Trust Analysis
**Auditor:** Health-Tech Brand Trust Specialist
**Date:** 2026-03-06 (re-audited against current code on branch `fix/final-launch-audit`)
**Pages reviewed:** `/about` (About.tsx), `/` (Home.tsx), App.tsx, Footer.tsx, sitemap.xml
**Score: 5.5 / 10**

---

## Executive Summary

Since the previous audit pass, LinkedIn links have been added to all three founder cards and Dr. Anca's visible card title has been corrected to "CDO". These are meaningful improvements. However, the page continues to under-deliver as a health-tech trust asset. The single most damaging issue is the CEO title error that persists inside the FAQ structured data block — a piece of copy that Google indexes and surfaces directly. Beyond that: Person schema covers only one of three founders, there are no individual team pages, the founding story stops short of its emotional conclusion, and every major external trust layer (advisory board, clinical advisors, press section, company legal identity) is absent. A clinician researching this product before sharing it with patients will not find enough to justify trust.

---

## 1. Founder Title Correctness — Current Code State

### Remaining Bug — FAQ Schema (About.tsx, line 70)
The FAQ structured data block, which Google can render directly in search results, contains:

```
"text": "Perioskoup was founded in 2025 by Dr. Anca Laura Constantin (Periodontist, CEO)..."
```

Dr. Anca's designated title is CDO (Chief Dental Officer), not CEO. This is now the only location with the CEO error, but it is also the highest-exposure location for it — structured data scraped directly by search engines. Fix required before any SEO gains are possible.

### Visible Card Title — Now Correct
`About.tsx` team card (line 276): `role: "Periodontist & Co-founder, CDO"` — correct.
This was the critical bug in the prior audit. It has been fixed.

### Dr. Anca Quote Attribution — CDO Missing
`Home.tsx` blockquote attribution (line 136):
```
— Dr. Anca Constantin, Periodontist & Co-founder
```
`Home.tsx` social proof section (line 394):
```
Periodontist & Co-founder, Perioskoup
```
Both omit "CDO" or "Chief Dental Officer". These are two of the highest-visibility touchpoints on the site. The title is not wrong, but the omission of CDO is a missed trust signal at the moment of maximum attention.

### Eduard Ciugulea — Correct
`About.tsx` line 277: "CGO & Co-Founder" — correct across all instances.

### Petrica Nancu — Correct
`About.tsx` line 278: "CTO & Head of AI" — correct. The "product designer" error mentioned in a prior audit is no longer present in the current codebase.

---

## 2. Dr. Anca's Clinical Authority — Is It Maximized?

The short answer is no. The EFP Award is well presented. Everything else is underplayed.

### What Is Working
- EFP Award section on the About page is visually strong with the ceremony photo, jury names, and a link to the official EFP announcement.
- Dr. Anca's quote appears in the homepage hero at a prominent position.
- `About.tsx` Person schema includes `"honorificPrefix": "Dr."`, `"medicalSpecialty": "Periodontology"`, `"memberOf": EFP`, and `"award"` with correct 3rd Prize designation.
- The schema `description` field (line 51) is thorough and correct.
- All three team card LinkedIn links are now live.

### What Remains Missing — Ranked by Impact

**1. Award prize tier absent from all visible on-page text.**
The structured data correctly states "3rd Prize" but every visible badge, heading, and inline mention reads "EFP Innovation Award Winner 2025" or "EFP Award Winner 2025" with no tier disclosed. The schema is transparent; the page copy is not. A clinician who clicks the EFP link will see "3rd Prize" and wonder why the site does not say so. Transparency on prize tier — "3rd Prize (from 20 submissions across 17 national societies)" — is more credible than implied top honors.

**2. Credentials visually buried.**
`creds: "DMD, PhD in Periodontology"` renders at 12px in `#8C9C8C` (muted color) immediately below the name. At normal reading contrast this is effectively invisible. DMD and PhD in Periodontology are the strongest credentials on the entire site. They should be styled as a trust badge, not a subscript.

**3. No named clinic or verifiable practice reference.**
"Her periodontal clinic in Bucharest" is mentioned in the hero paragraph but is unnamed, unlinked, and unverifiable. If the clinic name is public, naming it transforms a claim into a fact. If it must remain unnamed, at minimum "private specialist practice, Bucharest" with a statement about active clinical hours signals ongoing practice.

**4. No publications, conference presentations, or research links.**
For a periodontist founding a company on clinical credibility, zero academic citations attributed to her is a significant omission. Even one entry — "Speaker, EuroPerio11, Vienna, May 2025" — changes the profile from "dentist who built an app" to "clinician-researcher who built an app."

**5. No LinkedIn sameAs in Person schema.**
The `sameAs` array contains only the EFP press release URL. LinkedIn profile URL (`https://www.linkedin.com/in/anca-constantin-99800633b/`) should also be in `sameAs`. This is the primary mechanism by which Google associates structured data with a real, verifiable person.

**6. No statement of active clinical practice in the team bio.**
The bio (line 276) reads: "Dr. Anca founded Perioskoup after recognizing that the biggest barrier to treatment success wasn't clinical skill — it was the communication gap between chair and home." This is entirely past-tense and founding-focused. It says nothing about current practice. A single sentence — "She continues to see patients at her specialist practice in Bucharest." — grounds the authority claim in the present tense.

---

## 3. Person Schema Coverage — Detailed Assessment

### Dr. Anca Constantin (About.tsx, lines 40–59)
Schema is reasonably complete. Issues:

- `"@type": ["Person", "Physician"]` — "Physician" is technically correct but "Dentist" is the more specific Schema.org type for dental professionals. Consider `["Person", "Dentist"]` or adding `"MedicalBusiness"` affiliation.
- `sameAs` contains only the EFP press release. LinkedIn URL should be included.
- `jobTitle` reads `"Periodontist"`. Does not reflect CDO role. Should be `"Periodontist; Chief Dental Officer, Perioskoup"` or split across `jobTitle` and `hasOccupation`.
- `alumniOf` is absent — DMD and PhD institution would strengthen E-E-A-T signal.
- `url` pointing to `/about#anca-constantin` is absent. Without a canonical URL for the person entity, Google cannot anchor the graph node reliably.

### Eduard Ciugulea — No Schema
No Person JSON-LD exists for Eduard anywhere on the site.

### Petrica Nancu — No Schema
No Person JSON-LD exists for Petrica anywhere on the site.

### Organization Schema Cross-Reference
The Dr. Anca schema has `"worksFor": { "@id": "https://perioskoup.com/#organization" }`. There is no corresponding `Organization` schema block that declares this `@id` and lists members. The graph reference is broken. Google cannot resolve the node.

### Recommended Schema Structure (About.tsx)
Replace the current single-person block with a `@graph` array:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://perioskoup.com/#organization",
      "name": "Perioskoup",
      "url": "https://perioskoup.com",
      "foundingDate": "2025-06",
      "foundingLocation": { "@type": "Place", "addressCountry": "RO", "addressLocality": "Bucharest" },
      "member": [
        { "@id": "https://perioskoup.com/#anca-constantin" },
        { "@id": "https://perioskoup.com/#eduard-ciugulea" },
        { "@id": "https://perioskoup.com/#petrica-nancu" }
      ],
      "award": "EFP Digital Innovation Award 2025, 3rd Prize"
    },
    {
      "@type": ["Person", "Dentist"],
      "@id": "https://perioskoup.com/#anca-constantin",
      "name": "Dr. Anca Laura Constantin",
      "honorificPrefix": "Dr.",
      "jobTitle": "Periodontist; Chief Dental Officer",
      "medicalSpecialty": "Periodontology",
      "worksFor": { "@id": "https://perioskoup.com/#organization" },
      "url": "https://perioskoup.com/about",
      "image": "https://perioskoup.com/images/anca-headshot.jpg",
      "award": "EFP Digital Innovation Award 2025, 3rd Prize",
      "sameAs": [
        "https://www.linkedin.com/in/anca-constantin-99800633b/",
        "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://perioskoup.com/#eduard-ciugulea",
      "name": "Eduard Ciugulea",
      "jobTitle": "Chief Growth Officer",
      "worksFor": { "@id": "https://perioskoup.com/#organization" },
      "url": "https://perioskoup.com/about",
      "image": "https://perioskoup.com/images/eduard-headshot.jpg",
      "sameAs": ["https://www.linkedin.com/in/eduard-ciugulea/"]
    },
    {
      "@type": "Person",
      "@id": "https://perioskoup.com/#petrica-nancu",
      "name": "Petrica Nancu",
      "jobTitle": "Chief Technology Officer",
      "worksFor": { "@id": "https://perioskoup.com/#organization" },
      "url": "https://perioskoup.com/about",
      "image": "https://perioskoup.com/images/petrica.webp",
      "sameAs": ["https://www.linkedin.com/in/petrica-nancu-b16468241/"]
    }
  ]
}
```

---

## 4. Individual /team/[name] Pages

### Current State
No individual founder profile pages exist. `App.tsx` has no `/team` or `/team/:name` routes. No team URLs appear in `sitemap.xml`.

### Why This Matters

For a health-tech product where clinical authority is the primary trust signal, the absence of a standalone page for Dr. Anca Constantin is a material SEO and trust gap.

A page at `/team/dr-anca-constantin` would:

1. Rank for branded searches ("Dr. Anca Constantin periodontist", "Dr. Anca Constantin Perioskoup") — currently no page on this domain can rank for these.
2. Host a complete Person schema with full credentials, clinic affiliation, publications, and EFP award context.
3. Serve as the canonical `url` in the Person schema, giving Google a stable anchor for the knowledge graph node.
4. Provide a linkable page that journalists, dental associations, and clinicians can cite.
5. Create an internal link target that all other pages can point to, distributing authority.

**Recommendation:** Create `/team/dr-anca-constantin` as a minimum. Eduard and Petrica pages are secondary. The Anca page alone is high-value because the EFP Award creates a real search demand surface.

---

## 5. Founding Story — Compelling and Authentic?

### Strengths
The hero headline "Born in a dental chair. Built for every patient." is effective and specific to a health context. The opening paragraph attributes the problem observation to a real person in a real place (Bucharest). The hero blockquote names two concrete clinical pain points: time shortage and lack of patient engagement.

### What Is Missing

**The story ends at the observation, not the decision.**
After "she decided to build the solution herself" — nothing. The reader never learns how the decision became a company, how the team formed, or what happened between "dental chair observation" and "EFP Award in Vienna." The narrative arc has no second act.

**No timeline or milestones.**
When was the company conceived? When did the first clinic test it? When was the EFP Award entry submitted? Three or four dated milestones — even approximate — add the specificity that distinguishes a real founding story from a pitch deck paragraph.

**No team formation story.**
The page presents three founders as a fait accompli. How did Eduard (Northampton, UK, full-stack engineer) and Petrica (AI specialist) join a Bucharest periodontist's project? That story — specifically why two engineers chose to work on dental care — is an authenticity signal that is completely absent. Its absence makes the team feel assembled rather than built.

**The "Why Now" section (About.tsx, lines 241–258) is generic.**
It names three macro trends (AI capability, smartphone health interface, patient expectations for continuous support) without connecting them to anything specific about periodontal care or this team's unique position. The section reads as industry boilerplate.

---

## 6. Missing Trust Infrastructure

### Advisory Board / Clinical Advisors
No advisory board is mentioned anywhere on the site. For a health-tech product, even a single named clinical advisor outside the founding team dramatically increases credibility with clinicians, patients, and investors. The EFP jury members (Professors Deschner, Herrera, Stavropoulos) are named in the award copy as "jury members" — if any ongoing advisory relationship exists, it should be stated explicitly.

### University / Research Partnerships
No academic affiliations are mentioned. A product with PhD-level clinical leadership and an EFP award should have a natural path to university partnership. Even a "research collaboration with [institution] — in discussion" statement signals ambition in the right direction.

### Press / Coverage Section
The EFP award is linked but framed only as an award, not as media coverage. A "Coverage" or "As featured in" row — even consisting solely of the EFP announcement — gives the page an external validation layer that currently does not exist. The EFP is a trusted institution in European dental care; its mention of Perioskoup is press coverage, not just an award.

### Company Legal Identity
The Romanian SRL (incorporated June 2025) is not mentioned on the About page. The footer says "Made in Europe" but gives no company name, registration country, or incorporation detail. For B2B health-tech selling to clinics, stating the legal entity — even just "Perioskoup SRL, incorporated in Romania, June 2025" — is a standard enterprise trust signal.

### Waitlist Social Proof
"30-clinic waitlist" is mentioned in the homepage micro-bar (`30+ founding clinics`) but does not appear on the About page. The About page is where this number would carry the most trust weight, placed immediately before the CTA.

---

## 7. Specific Code Issues by Priority

### P0 — FAQ Schema Title Error (About.tsx, line 70)
```tsx
// CURRENT — wrong:
"Perioskoup was founded in 2025 by Dr. Anca Laura Constantin (Periodontist, CEO)..."

// CORRECT:
"Perioskoup was founded in 2025 by Dr. Anca Laura Constantin (Periodontist, CDO)..."
```
This is indexed by Google as structured data and can appear directly in search results. Fix immediately.

### P1 — Person Schema: Replace Single Block with @graph Array
See Section 3 above. Add Eduard and Petrica as Person nodes. Add Organization node. Add LinkedIn to Anca's sameAs. Fix broken `worksFor` graph reference.

### P1 — Add CDO to Dr. Anca's Quote Attributions (Home.tsx)
```tsx
// Line 136 — current:
— Dr. Anca Constantin, Periodontist & Co-founder

// Correct:
— Dr. Anca Constantin, Periodontist & CDO, Perioskoup

// Line 394 — current:
Periodontist & Co-founder, Perioskoup

// Correct:
Periodontist & Chief Dental Officer, Perioskoup
```

### P2 — Disclose Award Prize Tier in Visible Copy
Every visible badge reads "EFP Innovation Award Winner 2025". The schema correctly states "3rd Prize" but on-page text does not. Change the About page award badge (line 158) to:
```
EFP Digital Innovation Award — 3rd Prize, 2025
```

### P2 — Elevate Credentials Visually
`creds: "DMD, PhD in Periodontology"` renders at 12px muted. Add a credential badge treatment matching the EFP award badge style. At minimum increase font size to 13px and use `#C0E57A` or `#F5F9EA` instead of `#8C9C8C`.

### P3 — Create `/team/dr-anca-constantin` Route
Add the route to `App.tsx`, a new `TeamAnca.tsx` page, and a sitemap entry. Full Person schema, complete credentials, clinic affiliation, and link to the EFP award announcement.

### P3 — Add Founding Story Timeline Section
Between the "Why Now" section and the Team section, add a 4-point timeline: 2024 (problem identified in clinical practice), early 2025 (prototype with founding clinics), May 2025 (EFP Award, Vienna), June 2025 (Romanian SRL incorporated), 2026 (public launch).

---

## 8. What Is Working Well

- EFP Award section is visually strong. Ceremony photo, jury names, and official EFP link all present.
- Schema for Dr. Anca is the best on the site — `memberOf`, `award`, `medicalSpecialty`, `honorificPrefix`, and `description` are all populated correctly.
- LinkedIn links exist for all three founders in team cards.
- Founding story headline is effective ("Born in a dental chair. Built for every patient.").
- Clinical statistics block (62%, 80%, 87%) with cited academic sources is strong evidence-based content.
- Dr. Anca's quote on the homepage hero is prominent and specific.
- The award is linked to the actual EFP announcement — not a self-hosted press release.
- Petrica's title is correct throughout the codebase.

---

## Score Breakdown

| Dimension | Score | Notes |
|---|---|---|
| Trust signal density for health-tech | 4.5/10 | Award strong; everything else thin. No advisory, no legal identity, no press section. |
| Dr. Anca authority maximization | 4/10 | Schema is good; visible page underplays credentials, no practice name, no publications |
| Founder title accuracy | 7/10 | Cards correct; FAQ schema has CEO error; hero attributions omit CDO |
| Individual team pages | 0/10 | No /team routes exist anywhere |
| Founding story quality | 5/10 | Opens well but has no second act, no timeline, no team formation story |
| Advisory / external validation layer | 1/10 | Nothing beyond the award itself |
| Person schema completeness | 4/10 | One founder only, missing LinkedIn sameAs, broken Organization graph reference |
| Professional profile links (visible) | 5/10 | LinkedIn links present in cards but styled as muted 12px footnote text |
| Press / coverage section | 1/10 | Award linked but not framed as third-party coverage |
| Company identity transparency | 1/10 | No SRL registration, no company legal name, footer says only "Made in Europe" |

**Overall: 5.5 / 10**

---

## Recommended Priority Actions

**This week (trust-critical):**
1. Fix the "CEO" title in the FAQ structured data block (`About.tsx` line 70). This is indexed by Google.
2. Replace the single-person schema with a full `@graph` array including Organization, all three founders, and LinkedIn in Anca's `sameAs`.
3. Add "CDO" / "Chief Dental Officer" to Dr. Anca's two quote attributions on `Home.tsx`.

**Before launch (high-value):**
4. Add "3rd Prize" to the visible About page award badge — structured data is honest, visible copy should match.
5. Increase credential font size and contrast for "DMD, PhD in Periodontology" to match the visual weight of the role title.
6. Add "30+ founding clinics" social proof to the About page CTA section.
7. Add a 4-point founding timeline section between "Why Now" and "The Team".
8. Add a "Coverage" or "As featured in" row with the EFP announcement framed as external press.
9. Add company legal identity to About page: "Perioskoup SRL, incorporated Romania, June 2025".
10. Add active practice statement to Dr. Anca's bio: "Currently seeing patients at her specialist practice in Bucharest."

**Strategic (post-launch):**
11. Create `/team/dr-anca-constantin` standalone page with full credentials, publications, and complete Person schema.
12. Add named clinical advisor(s) to the team section or a dedicated advisory section.
13. Pursue one university or research partnership announcement, even informal, to establish academic credibility layer.
