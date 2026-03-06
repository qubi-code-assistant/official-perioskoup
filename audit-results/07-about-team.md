# Audit 07 — About / Team Page Trust Analysis
**Auditor:** Health-Tech Brand Trust Specialist  
**Date:** 2026-03-06  
**Pages reviewed:** `/about`, `/` (team section), `Navbar.tsx`, `Footer.tsx`, `App.tsx`  
**Score: 5 / 10**

---

## Executive Summary

The About page has a solid visual foundation and the EFP Award section is strong. However, for a health-tech product asking clinicians to trust it with their patient relationships, the page falls short in almost every dimension that matters most: Dr. Anca's clinical authority is dramatically underplayed, founder titles contain a critical error, Person schema coverage is thin, there are no professional profile links, no advisory layer, and the founding story stops just before it becomes compelling. This is a trust page that looks like a marketing page.

---

## 1. Founder Title Correctness

### Critical Bug — Dr. Anca's Title

**In `About.tsx` (Team section, line 154):**
```
role: "Periodontist & CEO"
```
Dr. Anca's designated title is CDO (Chief Dental Officer), not CEO. The company has no CEO listed anywhere. This is factually wrong and undersells the clinical role that is the entire trust proposition of this product.

**In `Home.tsx` (Team section, line 412):**
```
role: "Co-founder & Chief Dental Officer"
```
This is correct. The title is inconsistent between pages.

**In `Home.tsx` (Hero blockquote attribution, line 177):**
```
— Dr. Anca Constantin, Periodontist & Co-founder
```
Missing "CDO" or "Chief Dental Officer" — a missed trust signal at the highest-visibility location on the site.

**In `Home.tsx` (Social Proof section, line 508):**
```
Periodontist & Co-founder, Perioskoup
```
Again CDO title is absent.

**In `Home.tsx` (Team section intro paragraph, line 406):**
```
"...founded by a periodontist, a full-stack engineer, and a product designer..."
```
Petrica Nancu is CTO & Head of AI, not a product designer. This is a direct title error in visible body copy.

### Eduard Ciugulea — Title Correct
Both pages correctly show "CGO" or "CGO & Co-Founder". No issue here.

### Petrica Nancu — Title Correct in Cards
Both `About.tsx` (line 156) and `Home.tsx` (line 414) correctly show "CTO & Head of AI". The only error is the intro paragraph on Home.

---

## 2. Dr. Anca's Clinical Authority — Is It Maximized?

### What Exists
- Her name and photo appear in multiple sections
- EFP Award is prominently featured site-wide
- She has a first-person quote on the homepage hero
- Person schema exists in `About.tsx` linking to the EFP announcement

### What Is Missing — High Impact

**No educational credentials displayed.**  
The team card in `About.tsx` shows `creds: "DMD, PhD in Periodontology"` — but this is one of the most trust-building pieces of information on the entire site and it renders at 12px in muted color (#8C9C8C) below her name. It is visually invisible at normal reading distance.

**No clinic name or practice location with specificity.**  
"periodontal clinic in Bucharest" appears in the hero paragraph but is not linked, not named, and not verifiable. Naming the clinic (if public) or at minimum stating "private periodontal specialist practice" with a city reference transforms an unverifiable claim into a verifiable one.

**EFP Award context is incomplete.**  
The award is described as "EFP Innovation Award Winner 2025" but the prize tier (3rd Prize) is omitted. Omitting the prize tier when it was 3rd place is a minor misdirection — a sophisticated reader looking up the EFP announcement will notice. Being transparent ("3rd Prize, selected from 20 submissions across 17 national societies") is more credible than implied top honors.

**No publications, conference presentations, or research links.**  
For a periodontist co-founding a product with clinical credibility as its core trust asset, the absence of any academic or professional publication reference is a significant gap. Even one citation (e.g., "Speaker at EuroPerio11, Vienna 2025") would elevate the page considerably.

**No link to her professional profile.**  
LinkedIn, ROMDENT (Romanian Dental Association) profile, or any verifiable professional directory — none are linked. For a health-tech product asking clinicians to trust it, this is a meaningful omission.

**No statement about active clinical practice.**  
The hero text mentions "her periodontal clinic in Bucharest" but the Team section bio does not. A simple line — "Currently practicing at [Clinic Name], Bucharest, seeing patients weekly" — converts "clinician founder" from a claim into a credible fact.

---

## 3. Person Schema Coverage

### What Exists
`About.tsx` includes a single `Person` JSON-LD block for Dr. Anca (lines 33–44):

```json
{
  "@type": "Person",
  "@id": "https://perioskoup.com/#anca-constantin",
  "name": "Dr. Anca Laura Constantin",
  "jobTitle": "Periodontist",
  "worksFor": { "@id": "https://perioskoup.com/#organization" },
  "award": "EFP Digital Innovation Award 2025",
  "sameAs": [
    "https://www.efp.org/news-events/news/efp-digital-innovation-award-2025-creative-solutions-for-gum-health/"
  ]
}
```

### Issues With This Schema

**`jobTitle` is incomplete.** Should be "Periodontist & Chief Dental Officer" or include `"hasOccupation"` for the CDO role separately.

**`sameAs` points to a news article, not a profile.** The EFP link is a press release, not a profile page for Dr. Anca. It should point to her LinkedIn profile, or a verified professional directory. The press release can still appear but should not be the only `sameAs` entry.

**No `alumniOf`, `knowsAbout`, `description`, or `url` fields.** These matter for rich results and knowledge graph association.

**Eduard and Petrica have zero schema coverage.** No `Person` JSON-LD exists for either founder anywhere on the site. This is a missed SEO and E-E-A-T signal for both.

**No `Organization` schema with `member` array linking back to founders.** The `worksFor` reference points to `#organization` but there is no `Organization` schema block that declares the founders as members, creating a broken schema graph.

---

## 4. Individual /team/[name] Pages

### Current State
There are no individual founder profile pages. The router in `App.tsx` has no `/team` or `/team/:name` routes. Founder information exists only inside shared sections on `/about` and `/`.

### Why This Matters for a Health-Tech Product

For a product where clinical authority is the primary trust signal, Dr. Anca deserves a standalone page at `/team/dr-anca-constantin` (or `/team/anca-constantin`). This page would:

1. Rank for branded searches like "Dr. Anca Constantin periodontist Perioskoup"
2. Host the full Person schema including publications, credentials, and clinic affiliation
3. Provide a linkable, citable page that journalists and dental associations can reference
4. Serve as the canonical `sameAs` URL in schema markup across the site

The EFP Digital Innovation Award 2025 is a significant professional credential. There is currently no page on this site that could appear in search results for someone researching Dr. Anca's background. That is a trust gap.

---

## 5. Founding Story — Compelling and Authentic?

### What Exists
The hero text:
> "Perioskoup started with a simple observation: patients leave the dentist's office understanding very little about their condition. Dr. Anca Constantin saw this every day in her periodontal clinic in Bucharest — and decided to build the solution herself."

This is clean and direct. The hero headline "Born in a dental chair. Built for every patient." is effective.

The hero blockquote on the homepage:
> "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient engagement, which leads to poor outcomes."

This is credible and specific. It names two real clinical pain points.

### What Is Missing

**The story ends too early.** It describes the problem observation but does not describe the moment of decision, the early prototype, the validation with peers, or the EFP entry. The narrative arc stops at "she decided to build it" — the reader is left without a payoff.

**No timeline or milestones.** When was Perioskoup first conceived? When did the first patient or clinic test it? When was the EFP entry submitted? A simple timeline — even three or four points — adds credibility and specificity that generic founding stories lack.

**No "why now" framing.** The page explains the problem but not why this moment in dental care is the right moment to build this product. AI maturity, post-COVID patient engagement patterns, EU digital health regulation — any of these could anchor the story more powerfully.

**Eduard and Petrica's joining stories are absent.** The founding story presents as Dr. Anca building it alone. How did Eduard and Petrica join? What brought a Northampton-based engineer and an AI specialist into a Bucharest periodontist's project? That human story is absent and its absence makes the team feel assembled rather than organically built.

---

## 6. Missing Trust Infrastructure

### Advisory Board / Clinical Advisors
No advisory board is mentioned anywhere on the site. For a health-tech product in the dental space, even a single named clinical advisor (outside the founding team) dramatically increases credibility with both clinicians and investors. The EFP jury members (Professors Deschner, Herrera, Stavropoulos) are mentioned in the award copy but not as advisors — if any relationship exists, it should be stated.

### University or Research Partnerships
No academic affiliations are mentioned. For a product with PhD-level clinical leadership, the absence of any university partnership or research collaboration is a missed signal.

### Press Mentions
The EFP award announcement is linked but framed only as an award, not as external press coverage. A "Coverage" or "As Seen In" section — even just the EFP announcement — would give the page a press validation layer that is completely absent.

### Company Registration Details
The Romanian SRL (incorporated June 2025) is not mentioned on the About page. For B2B health-tech selling to clinics, stating legal incorporation details (company name, registration number, country) is a standard trust signal. The footer says "Built in Bucharest, Romania" but gives no company identity.

### LinkedIn Links
No LinkedIn profile links exist for any founder anywhere on the site. This is the single highest-impact missing trust element for a professional B2B audience.

---

## 7. Specific Code Issues Requiring Fixes

### Priority 1 — Title Bug (About.tsx, line 154)
```tsx
// WRONG:
role: "Periodontist & CEO"

// CORRECT:
role: "Periodontist & CDO"
```

### Priority 2 — Home.tsx Team Intro Paragraph (line 406)
```tsx
// WRONG:
"...a periodontist, a full-stack engineer, and a product designer..."

// CORRECT:
"...a periodontist, a full-stack engineer, and an AI specialist..."
```

### Priority 3 — Person Schema Expansion (About.tsx)
The existing single-founder schema should be replaced with a `@graph` array containing all three founders plus the Organization, with proper `sameAs` LinkedIn links and `member` relationships.

### Priority 4 — Award Prize Tier Disclosure
Every instance of "EFP Innovation Award Winner 2025" should read "EFP Digital Innovation Award 2025 — 3rd Prize" for full transparency.

---

## 8. What Is Working Well

- The EFP Award section on the About page is visually strong and the jury member names add weight
- The statistics block (50% adults, 48h forgetting, 60% no follow-up, 3x with digital support) provides good clinical context — though sources would strengthen it
- Dr. Anca's quote appears in the homepage hero at a prominent position
- The award photo adds real-world ceremony authenticity
- The EFP link is present, working, and correctly attributed
- Petrica's title is consistently correct across the site

---

## Score Breakdown

| Dimension | Score | Notes |
|---|---|---|
| Trust signal density | 4/10 | Award is strong; everything else is thin |
| Dr. Anca authority maximization | 3/10 | Credentials buried, no practice link, no publications |
| Founder title accuracy | 6/10 | Critical CDO/CEO error on About page; "product designer" error on Home |
| Individual team pages | 0/10 | Do not exist |
| Founding story quality | 5/10 | Opens well but story arc incomplete |
| Advisory / external validation | 1/10 | Nothing beyond the award itself |
| Person schema completeness | 3/10 | One founder only, incomplete fields, no LinkedIn sameAs |
| Professional profile links | 0/10 | No LinkedIn links anywhere on site |
| Press / coverage section | 1/10 | Award linked but not framed as media coverage |
| Company identity transparency | 2/10 | No registration details, no company legal name on About |

**Overall: 5 / 10**

---

## Recommended Priority Actions

1. Fix the "CEO" title bug in `About.tsx` to "CDO" immediately — this is factually incorrect and visible to every clinician who reads the team section.
2. Fix the "product designer" reference in `Home.tsx` team intro paragraph.
3. Add LinkedIn profile links for all three founders in the team cards.
4. Create `/team/dr-anca-constantin` as a standalone page with full credentials, a publications list or conference mention, clinic affiliation, and a complete Person schema.
5. Add Eduard and Petrica Person schema blocks to `About.tsx`.
6. Amend the founding story to include a brief timeline with milestones (conception, first clinic test, EFP submission, waitlist growth).
7. Add a "Coverage" row below the EFP award section with the press mention properly framed.
8. Add at least one named clinical advisor or academic partner.
9. Disclose the award as 3rd Prize across all instances for transparency.
10. Add company legal name and Romanian SRL registration context to the About page footer area.

