# Audit 07 — About Page & Team Trust Signals
**Date:** 2026-03-06
**Auditor:** Health-Tech Brand Trust Specialist
**Score: 5.5 / 10**

---

## Executive Summary

The About page has a solid structural foundation: the EFP Award is prominently displayed, Dr. Anca's quote appears on multiple pages, LinkedIn links are present for all three founders, and the Person schema for Dr. Anca is implemented in two places. However, the page falls materially short of what a health-tech product at this stage needs to command trust from dentists, investors, and press. The six biggest gaps are: (1) Dr. Anca's clinical credentials are stated but not substantiated, (2) the founding story is told in isolation from the broader periodontology community, (3) individual founder pages do not exist and no SEO opportunity is captured there, (4) no advisory board or clinical validators exist anywhere on the site, (5) no press/media section, and (6) Eduard and Petrica have thin schema coverage with no `sameAs` links in the structured data. These are correctable in a single sprint.

---

## Findings by Category

### 1. Founder Authority — Dr. Anca (Priority: CRITICAL)

**Score: 5 / 10**

**What works:**
- Title "Periodontist & Co-founder, CEO" is consistent across About.tsx (line 226, 268), ForDentists.tsx (line 166), and Home.tsx (line 349).
- EFP award is stated correctly: "3rd Prize, EFP Digital Innovation Award 2025, EuroPerio11, Vienna."
- The jury member names (Deschner, Herrera, Stavropoulos) appear in both About.tsx (line 159) and Home.tsx (line 184), adding gravitas.
- `creds` field in the team card (About.tsx line 268) reads "DMD, PhD in Periodontology" — this is the only place her full credentials appear in the UI.

**Issues:**

**ISSUE-01 [HIGH]** `About.tsx:268` — The credential string "DMD, PhD in Periodontology" is displayed only in a small 13px muted-colour span that renders visually equivalent to the bio text below it. It is not differentiated as a trust anchor. For a health-tech product, credentials should be typographically distinct — larger or accented in lime — so a scanning visitor cannot miss them.

**ISSUE-02 [HIGH]** `About.tsx:268` — The credential string lists "PhD in Periodontology" but the founding-brief in `CLAUDE.md` and `llms.txt` does not confirm whether a PhD was awarded or is in progress. If the PhD is not yet awarded, this is a trust liability. Verify and correct to "DMD, Specialist in Periodontology" if that is the accurate credential, which is what `llms.txt:25` states ("DMD, Specialist in Periodontology").

**ISSUE-03 [HIGH]** No mention anywhere on the About page, ForDentists page, or Home page of how many years Dr. Anca has been practising, which clinic she is based at, or any reference to her patient volume. A dentist reading the ForDentists page needs to know they are evaluating software built by a peer with real clinical depth — not just an award winner.

**ISSUE-04 [MEDIUM]** No link to Dr. Anca's clinic website or any external professional profile (Romanian dental register, EFP member directory, ResearchGate, Google Scholar). The only external link for her authority is the EFP award announcement page, which lists Perioskoup — not Anca personally. A health-tech brand needs at least one external third-party validation of the clinician's identity.

**ISSUE-05 [MEDIUM]** `About.tsx:34` (personJsonLd) — The `description` field in the Person schema says she is "co-founder and CEO" but the `jobTitle` field says "Periodontist" only (line 31). The global schema in `index.html:122` correctly uses "Periodontist & CEO". These are inconsistent. Search engines reading both schemas receive contradictory jobTitle values.

**ISSUE-06 [LOW]** Dr. Anca has authored 4 of the 6 blog posts (Blog.tsx lines 27, 62, 72, implicit in the founding-story post). None of those posts link back to a dedicated `/team/dr-anca-constantin` author page. The blog articles are a strong authority signal that is not being amplified.

---

### 2. Person Schema — Correctness & Completeness (Priority: HIGH)

**Score: 5 / 10**

**What works:**
- Dr. Anca has a full `["Person", "Physician"]` schema in both `About.tsx:23-43` and `index.html:116-148`, with `@id`, `honorificPrefix`, `medicalSpecialty`, `memberOf`, `worksFor`, `award`, `knowsAbout`, and `sameAs`.
- The `@id` is consistent: `https://perioskoup.com/#anca-constantin`.
- `worksFor` correctly uses a reference `@id` to the Organization node.

**Issues:**

**ISSUE-07 [HIGH]** `index.html:99` and `index.html:100` — Eduard and Petrica are inline `{"@type": "Person"}` objects with only `name` and `jobTitle`. They have no `@id`, no `sameAs`, no `url`, no `image`. This means search engines cannot build a knowledge graph node for either co-founder. The same pattern repeats in `Contact.tsx:69-70`. Eduard's LinkedIn is known (`https://www.linkedin.com/in/eduard-ciugulea/`), as is Petrica's (`https://www.linkedin.com/in/petrica-nancu-b16468241/`). Both appear in the About.tsx team card (line 269, 270) but are absent from structured data.

**ISSUE-08 [HIGH]** `About.tsx:31` — `jobTitle` for Dr. Anca in the About page schema is "Periodontist" only, while `index.html:122` correctly uses "Periodontist & CEO". Google will resolve the conflict unpredictably. The `About.tsx` schema should match `index.html`.

**ISSUE-09 [MEDIUM]** `About.tsx:23-43` — The About page emits a standalone `Person` schema for Dr. Anca that duplicates the one in `index.html`. While not technically wrong, the standalone version does not link to the `Organization` via `@id` reference — it uses an inline `{"@type": "Organization", "@id": "https://perioskoup.com/#organization"}` at line 36. The `@id` reference is correct, but the About page schema omits `hasOccupation` (which is present in `index.html:136-143`). The two schemas should be kept in sync.

**ISSUE-10 [MEDIUM]** No `alumniOf` property on Dr. Anca's Person schema. Naming the university where she earned her DMD would be a meaningful trust signal for dentist visitors and for schema completeness.

**ISSUE-11 [MEDIUM]** `index.html:144-147` — Dr. Anca's `sameAs` array contains only the EFP announcement URL and her LinkedIn. A ResearchGate, Google Scholar, or ORCID link would allow search engines to resolve her as a legitimate academic/clinical practitioner.

**ISSUE-12 [LOW]** Neither Eduard's nor Petrica's Person nodes appear anywhere in the About page schema. The About page only emits Dr. Anca's schema. A full `@graph` on the About page with all three founders would be stronger.

---

### 3. Individual Founder Pages (Priority: HIGH)

**Score: 0 / 10** — They do not exist.

**ISSUE-13 [HIGH]** There are no routes at `/team/dr-anca-constantin`, `/team/eduard-ciugulea`, or `/team/petrica-nancu` in `App.tsx`. There is no `team/` directory under `client/src/pages/`. For a health-tech product where the clinician founder is the primary trust signal, a dedicated page for Dr. Anca at minimum is a significant missed opportunity.

**Why this matters for SEO:** The search query "Dr Anca Constantin periodontist" or "Dr Anca Constantin Perioskoup" currently has no dedicated page to rank against. The About page competes for this query alongside the EFP announcement page. A `/team/dr-anca-constantin` page with: full bio, credentials, clinical background, publications list, the EFP award with photo, her blog articles, and a Person schema with `alumniOf`, `sameAs`, and `hasOccupation` — would own that SERP and build the E-E-A-T signals Google now requires for health content.

**Why this matters for trust:** Dentist visitors evaluating whether to join as a founding clinic will look up Dr. Anca. Right now the only landing destination is the `/about` page, which shares space with the company mission and two other founders.

**Recommendation:** Create `/team/dr-anca-constantin` as a minimum. Optionally create pages for Eduard and Petrica. The route pattern in App.tsx already supports this — add `<Route path="/team/:name" component={TeamMember} />`.

---

### 4. Trust Signals — EFP Award, Clinical Experience, Affiliations (Priority: HIGH)

**Score: 6 / 10**

**What works:**
- EFP Award is displayed prominently on About, Home, and ForDentists pages with a photo, quote, jury names, and a link to the EFP announcement. This is handled well.
- The "30+ founding clinics" number appears on ForDentists.tsx (line 96) and in the ticker on Home.tsx (line 151).
- Peer-reviewed citations (Bernabe 2020, Kessels 2003, Toniazzo 2019, Weinert 2025) are linked with DOIs. This is a strong clinical credibility signal.

**Issues:**

**ISSUE-14 [HIGH]** No university affiliation is mentioned anywhere. Dr. Anca practises in Bucharest — is there a university hospital, research institution, or teaching clinic associated with her practice? Even a mention of which dental faculty she graduated from would be material. Romanian dental universities (UMF Carol Davila Bucharest is the most prominent) would be recognisable to European dental peers.

**ISSUE-15 [HIGH]** No clinical advisory board or clinical advisors are listed anywhere on the site, in the schema, or in `llms.txt` / `llms-full.txt`. For a health-tech product seeking to sign up dental clinics, the absence of any third-party clinical validator (even a single named advisor from a dental school or periodontal society) is a trust gap. The EFP jury members are named in the award copy but they are not advisors — they are award evaluators.

**ISSUE-16 [HIGH]** The EFP award is correctly identified as "3rd Prize" everywhere in the code (About.tsx line 37, index.html line 102, llms.txt line 17). However, the visual badge on the About page (line 149) and the Home page (line 88, 173) reads "EFP Innovation Award Winner 2025" without specifying "3rd Prize". This is technically accurate (they did win) but omits the ranking. More importantly: the About page EFP section says "EFP Innovation Award Winner 2025" in the badge chip (line 151) — which is fine — but the detailed copy (line 159) correctly says "Selected from 20 submissions across 17 national societies." Both elements should exist together, which they do. However the Home page EFP card (line 172) badge also omits the "3rd Prize" qualifier. Third place from a European federation body is still prestigious; stating it clearly avoids any perception of overstating.

**ISSUE-17 [MEDIUM]** The founding story section on About.tsx (lines 176-251) describes the problem and "Why Now" but does not mention a specific moment, case, or patient encounter that made Dr. Anca decide to build Perioskoup. The BlogPost for "Building the Bridge: The Perioskoup Story" (blog slug) presumably contains this narrative, but the About page does not reference it or link to it. The founding story on the About page is generic ("Perioskoup started with a simple observation") rather than personal.

**ISSUE-18 [MEDIUM]** No mention of any dental association memberships beyond EFP. Membership in the Societatea Romana de Parodontologie (SRP) or equivalent national body would be relevant. Similarly, no mention of conference presentations, invited talks, or any other professional activity beyond the EFP award.

---

### 5. Team Photos — Quality, Alt Text, Lazy Loading (Priority: MEDIUM)

**Score: 7 / 10**

**What works:**
- All three founder photos have `loading="lazy"` set (About.tsx lines 217, 274).
- All photos have `alt` text with full names (About.tsx lines 217, 274).
- The Dr. Anca quote section (About.tsx line 217) specifies `objectPosition: "center 25%"` which correctly frames a face shot.
- Image file sizes are reasonable: anca-headshot.jpg is 19KB, petrica.webp is 27KB, and the formats are appropriate (JPEG for photos, WebP where available).

**Issues:**

**ISSUE-19 [HIGH]** `client/public/images/anca-headshot.jpg` is 19KB at what appears to be a small resolution. It is used in a 280px-tall card on About, as an 80px circle on the quote section, and as a 44px circle on the Home testimonial. The 19KB size suggests it may already be compressed to a small dimension. No `srcset` or `sizes` attribute is used on any founder photo. If the card renders at 300px width on desktop and the image is only 300px wide, fine — but if it is smaller, it will appear blurry on retina displays.

**ISSUE-20 [MEDIUM]** `About.tsx:274` — The team card image uses `objectPosition: f.name.includes("Anca") ? "center 25%" : "top"` — this is a brittle string match. If the name string ever changes, Eduard and Petrica will lose their positioning. Use an explicit `objectPosition` field in the team data array instead.

**ISSUE-21 [MEDIUM]** `About.tsx:274` — `width={300} height={280}` are hardcoded on all three founder cards as the `width`/`height` attributes regardless of actual image dimensions. These should match the actual intrinsic dimensions of each image to prevent CLS. The browser uses these attributes to reserve layout space.

**ISSUE-22 [LOW]** `About.tsx:217` — The Dr. Anca quote image uses `width={80} height={80}` but the image is `anca-headshot.jpg` (a full portrait photo). The browser will load the full image then crop it to 80px. A dedicated thumbnail or a `srcset` pointing to a smaller version would reduce wasted bytes.

**ISSUE-23 [LOW]** `PETRICA_IMG` is `/images/petrica.webp` (About.tsx line 17, referenced at line 270) but Eduard's image is `eduard-headshot.jpg`. Eduard also has an `eduard-formal.jpg` in the images directory (30KB) that is not used anywhere in the React code. Inconsistent naming and an orphaned asset suggests the image strategy was not finalised.

---

### 6. Founding Story — Compelling & Authentic (Priority: MEDIUM)

**Score: 5 / 10**

**What works:**
- The hero headline "Born in a dental chair. Built for every patient." (About.tsx line 121-123) is strong and specific.
- Dr. Anca's quote is authentic and specific: "a shortage of time and the lack of patient engagement" — this sounds like a practitioner, not a copywriter.
- The mission stats section (About.tsx lines 194-206) uses DOI-linked citations, establishing that the problem is real.

**Issues:**

**ISSUE-24 [HIGH]** `About.tsx:126` — The founding story paragraph says "Dr. Anca Constantin saw this every day in her periodontal clinic in Bucharest — and decided to build the solution herself." This is the only story beat on the About page. There is no narrative arc: what was the tipping-point moment, when did she meet Eduard and Petrica, what did early versions look like, what happened at EuroPerio11 in Vienna? The blog post "Building the Bridge: The Perioskoup Story" (Sep 2025) presumably contains this but the About page does not link to it.

**ISSUE-25 [MEDIUM]** The "Why Now" section (About.tsx lines 233-251) lists three macro trends (AI maturity, smartphone health interface, patient expectation) but does not connect them back to the founding team's specific capabilities. Why is this team the right team to exploit this timing? The answer — a clinician who has lived the problem, an engineer who has built consumer health products, an AI specialist — is available but not stated on this page.

**ISSUE-26 [MEDIUM]** `llms-full.txt:76` — The Dr. Anca quote in the llms-full.txt team section ("I see patients every day who don't know how to maintain their oral health between visits") is different from the quote used on the About page and Home page ("Perioskoup was born out of two big challenges..."). Two different attributed quotes circulating in AI-indexed content creates inconsistency. Pick one canonical quote for the homepage/about and use the second as supplementary.

---

### 7. Social Proof — Testimonials, Clinic Count, User Count (Priority: HIGH)

**Score: 4 / 10**

**What works:**
- "30+ founding clinics on the waitlist" appears on ForDentists.tsx (line 96) and in the ticker.
- The Home page testimonial section uses Dr. Anca's quote: "The app I always wished I could prescribe to my patients" (Home.tsx line 343) — this is a strong single line.

**Issues:**

**ISSUE-27 [CRITICAL]** The only testimonial across the entire site is from Dr. Anca, who is a co-founder. This is founder self-testimony. For a health-tech product seeking clinic trust, there must be at least one testimonial from an external dentist — even from the 30-clinic waitlist. Even a single quote from "Dr. [Name], Periodontist, [City]" who is on the waitlist would dramatically change the trust dynamic. A product built for clinicians, with 30+ clinics on the waitlist, should have at least one clinic quote.

**ISSUE-28 [HIGH]** "30+ founding clinics" is stated as a number but never substantiated. No clinic names, no logos, no city/country breakdown. Even a generic "Clinics from Romania, UK, Germany, and beyond" would make this number feel real. In health tech, vague social proof reads as unverifiable.

**ISSUE-29 [HIGH]** No patient testimonials exist. The product is positioned as a patient companion app — but there is zero evidence any patient has used it and found it valuable. Even during beta, a single patient quote would matter.

**ISSUE-30 [MEDIUM]** The quote in Home.tsx (line 343) — "The app I always wished I could prescribe to my patients" — appears in a `<blockquote>` tag but is attributed to Dr. Anca, a co-founder. A visitor may reasonably question whether a founder quoting themselves as social proof is genuine endorsement or self-promotion. Without external voices alongside it, it reads as the latter.

---

### 8. Contact Accessibility (Priority: LOW-MEDIUM)

**Score: 8 / 10**

**What works:**
- A working contact page exists at `/contact` with a validated form (Contact.tsx).
- Two email addresses are published: `hello@perioskoup.com` and `clinic@perioskoup.com`.
- Contact page meta description mentions "press" enquiries (Contact.tsx line 82).
- The contact form role selector includes "Press / Media" (Contact.tsx line 181).
- Response time commitment is stated: "We reply within 24 hours" (Contact.tsx line 128).
- `noscript` fallback in `index.html:286` includes `General: hello@perioskoup.com | Clinics: clinic@perioskoup.com`.

**Issues:**

**ISSUE-31 [MEDIUM]** There is no dedicated press@perioskoup.com address. Press enquiries route to `hello@perioskoup.com` which is the same as general enquiries. For a startup that has won an EFP award and is seeking press coverage, a distinct press address (or at minimum a press kit page) signals media readiness.

**ISSUE-32 [LOW]** No physical address is shown on the Contact page — only "Based in Europe" (Contact.tsx line 128). The Organization schema in Contact.tsx (line 62-65) includes `addressCountry: "RO"` but no street address. For clinics in regulated markets evaluating a health-tech vendor, the absence of any physical address is a minor but real trust signal gap.

---

### 9. Press / Media Section (Priority: HIGH)

**Score: 0 / 10** — Does not exist.

**ISSUE-33 [HIGH]** There is no press page, no press kit, no media section, and no press mentions displayed anywhere on the site. The EFP award announcement is linked from multiple places, but it is not framed as press coverage — it is framed as an award citation. If any Romanian or European dental press has covered Perioskoup since the EuroPerio11 award (May 2025 per the blog), that coverage should be displayed on the site. Even the EFP announcement itself could be displayed as "As seen in EFP News" on the About page.

**ISSUE-34 [HIGH]** No downloadable press kit (logo files, founder headshots in high resolution, brand colours, boilerplate text) exists. A startup that has won a European federation award and is seeking clinic partnerships and investment should have a `/press` page with these assets. The `llms.txt:79` lists "Press / media: hello@perioskoup.com" — this is insufficient for a media-curious visitor.

**ISSUE-35 [MEDIUM]** The blog post "Perioskoup Wins EFP Digital Innovation Award 2025" (blog slug: efp-digital-innovation-award-2025) could function as a press release that is indexed and shareable, but it is not surfaced on the About page or in any "In the News" section. It is buried in the blog list.

---

### 10. Advisory Board / Clinical Advisors (Priority: HIGH)

**Score: 0 / 10** — Does not exist.

**ISSUE-36 [CRITICAL]** There is no advisory board, clinical advisor panel, or any named external validator mentioned anywhere on the site, in the schema, or in `llms.txt` / `llms-full.txt`. For a health-tech product: (a) seeking clinic subscriptions, (b) handling patient health data, (c) operating in a regulated dental health context, and (d) competing for clinician trust — the absence of any external clinical credibility is a significant risk. A single named periodontology professor or a dental association endorsement would change the trust calculus materially.

**ISSUE-37 [CRITICAL]** No university partnership is mentioned. Even an informal affiliation with UMF Carol Davila (where Dr. Anca presumably trained) — such as a research collaboration, a pilot study, or a guest lecture — would be worth naming on the About page and in schema (`affiliation` or `memberOf`).

**ISSUE-38 [HIGH]** The EFP jury members (Professors Deschner, Herrera, and Stavropoulos) are named in the award copy on both About and Home pages. This is good contextual use of these names. However, they are not asked to endorse or advise. If any of them have expressed interest, even a brief quoted endorsement from one would be transformative for trust.

---

## Title/Role Consistency Audit

All three founders use correct titles throughout the codebase:

| Source | Dr. Anca | Eduard | Petrica |
|---|---|---|---|
| About.tsx team card (line 268-270) | "Periodontist & Co-founder, CEO" | "CGO & Co-Founder" | "CTO & Head of AI" |
| About.tsx quote section (line 226) | "Periodontist & Co-founder, CEO" | — | — |
| ForDentists.tsx (line 166) | "Periodontist & Co-founder, CEO" | — | — |
| Home.tsx (line 349) | "Periodontist & CEO" | — | — |
| index.html schema (line 122) | "Periodontist & CEO" | "Co-founder & CGO" | "CTO & Head of AI" |
| llms.txt (lines 25, 29, 30) | "CEO" | "CGO" | "CTO & Head of AI" |

No title errors found. Eduard is correctly "CGO" not "CTO" everywhere. Petrica is correctly "CTO & Head of AI" not "CPO" everywhere.

Minor inconsistency: Home.tsx (line 349) uses "Periodontist & CEO" while About.tsx (line 226) uses "Periodontist & Co-founder, CEO". This is not a trust issue but should be standardised.

---

## Schema Coverage Summary

| Entity | @type | @id | sameAs | LinkedIn | jobTitle | worksFor |
|---|---|---|---|---|---|---|
| Dr. Anca (index.html) | Person, Physician | YES | YES | YES | YES | YES (ref) |
| Dr. Anca (About.tsx) | Person, Physician | YES | YES | YES | INCONSISTENT | YES (ref) |
| Eduard (index.html) | Person | NO | NO | NO | YES | NO |
| Petrica (index.html) | Person | NO | NO | NO | YES | NO |
| Eduard (About.tsx) | Not in schema | — | — | — | — | — |
| Petrica (About.tsx) | Not in schema | — | — | — | — | — |

---

## Prioritised Fix List

### Sprint 1 — Critical (This Week)

1. **ISSUE-02** — Verify and correct Dr. Anca's credential string. `About.tsx:268` and `llms.txt:25` disagree ("PhD in Periodontology" vs "Specialist in Periodontology"). Confirm which is accurate and standardise across all files.

2. **ISSUE-07** — Add full Person schema nodes for Eduard and Petrica in `index.html` with `@id`, `sameAs` (LinkedIn), `jobTitle`, `worksFor`, and `image`. Reference these `@id` values in the `founders` array of the Organization schema.

3. **ISSUE-27** — Source at least one external dentist testimonial from the 30-clinic waitlist. Display it on the About page and ForDentists page. Even a first name + city is sufficient at this stage ("Dr. M., Bucharest").

4. **ISSUE-13** — Create `/team/dr-anca-constantin` page with full bio, credentials, publications section, EFP award, blog article list, and a complete Person schema. Add route to App.tsx.

### Sprint 2 — High Impact (Next Two Weeks)

5. **ISSUE-36** — Identify and name at least one clinical advisor. Add an "Advisory" or "Supported By" section to the About page.

6. **ISSUE-33** — Create a `/press` page with: EFP award announcement (as "featured in"), downloadable logo files, founder headshots, company boilerplate, and press contact email.

7. **ISSUE-24** — Expand the founding story on About.tsx to include a specific patient encounter, the moment Eduard joined, and what happened at EuroPerio11. Link to the "Building the Bridge" blog post.

8. **ISSUE-08** — Standardise Dr. Anca's `jobTitle` in `About.tsx:31` to match `index.html:122` ("Periodontist & CEO").

9. **ISSUE-03** — Add years of clinical experience and clinic location to Dr. Anca's bio in About.tsx.

10. **ISSUE-10** — Add `alumniOf` to Dr. Anca's Person schema with the university where she earned her DMD.

### Sprint 3 — Medium Impact

11. **ISSUE-01** — Make the credential string ("DMD, Specialist in Periodontology") typographically distinct on the team card.

12. **ISSUE-19** — Add `srcset` and `sizes` to all founder photos for retina display support.

13. **ISSUE-26** — Standardise Dr. Anca's attributed quote. Choose one canonical quote for homepage/about.

14. **ISSUE-20** — Replace the brittle `f.name.includes("Anca")` objectPosition check with an explicit field in the team data array.

15. **ISSUE-28** — Add geographic context to the "30+ founding clinics" claim.

---

## Score Breakdown

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Founder authority (Dr. Anca credentials, experience) | 20% | 5 | 1.00 |
| Person schema correctness & completeness | 15% | 5 | 0.75 |
| Individual founder pages | 10% | 0 | 0.00 |
| Trust signals (award, affiliations, advisors) | 20% | 4 | 0.80 |
| Team photos quality & accessibility | 10% | 7 | 0.70 |
| Founding story authenticity | 10% | 5 | 0.50 |
| Social proof (testimonials, clinic count) | 10% | 3 | 0.30 |
| Contact accessibility | 5% | 8 | 0.40 |
| Press / media section | 5% | 0 | 0.00 |
| Advisory board / clinical validators | 5% | 0 | 0.00 |
| **TOTAL** | **100%** | — | **5.45 ≈ 5.5** |

---

## File References

All issues reference these source files:

- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/About.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/ForDentists.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/index.html`
- `/Users/moziplaybook/Projects/official-perioskoup/client/public/llms.txt`
- `/Users/moziplaybook/Projects/official-perioskoup/client/public/llms-full.txt`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/App.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Blog.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Contact.tsx`
