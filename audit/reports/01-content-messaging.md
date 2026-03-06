# Content & Messaging Audit Report

**Auditor:** Claude Opus 4.6 (Content Strategy Agent)
**Date:** 2026-03-06
**Scope:** All page files in `client/src/pages/` audited against `audit/strategy-reference.md`
**Reference:** SEO/GEO Master Strategy

---

## Executive Summary

The Perioskoup landing site has strong foundational messaging on its Home page -- the hero conveys the "AI dental companion" concept clearly, Dr. Anca's quote is prominent, and trust signals (EFP award, 30+ clinics, 500+ waitlist) are present above the fold. Blog posts have well-implemented answer capsules for GEO.

However, there are significant gaps: the "For Dentists" page lacks ROI-focused messaging and any mention of Dr. Anca; the Features page has no trust signals at all; answer capsules are entirely absent from non-blog pages; the exact EFP quote from the strategy reference is modified; and the phrase "AI dental companion" -- the category-creation keyword -- appears on only 3 of 10 pages. These gaps weaken both search category ownership and conversion.

---

## Audit Criteria & Findings

### 1. Hero: Does it convey "AI dental companion for between-visit care" in under 5 seconds?

**Severity: LOW (mostly good, minor gap)**

The Home hero is effective:
- H1: "Between visits, we take over." (line 232-235 of Home.tsx) -- emotionally compelling
- Subhead: "Perioskoup is a free AI dental companion app -- personalised guidance, habit tracking, and a direct line to your clinic between appointments." (line 238-240) -- clear product definition
- EFP badge above the headline provides immediate credibility
- Phone mockup provides visual context

**Finding 1.1 -- MEDIUM:** The H1 itself does not contain the words "AI dental companion" or "dental" at all. A visitor scanning only the headline gets "Between visits, we take over" which is ambiguous without reading the subhead. The category-defining phrase is in the paragraph text, not the headline.

> **File:** `client/src/pages/Home.tsx:232-235`
> **Recommendation:** Consider working "dental companion" or "dental care" into the H1 itself, e.g., "Between dental visits, we take over" or "Your AI dental companion between visits." This is critical for both SEO (H1 tag weight) and instant comprehension.

### 2. Value proposition clarity per page

**Severity: HIGH (multiple pages lack clear value props)**

| Page | Value Prop Clear? | Notes |
|------|------------------|-------|
| Home | Yes | Strong hero + subhead + stats |
| Features | Partial | Hero says "Built for the full dental journey" -- generic. No mention of "AI dental companion" in visible H1 text |
| For Dentists | Partial | "Your patients, better prepared" is decent but lacks specificity on ROI |
| Pricing | Yes | Clear free-for-patients, coming-soon-for-clinics messaging |
| About | Yes | "Born in a dental chair. Built for every patient." is strong |
| Blog | Yes | "Insights on dental health, AI, and care" is clear |
| Contact | Partial | "Let's talk dental health" -- functional but no value reinforcement |
| Waitlist | Yes | "Join the founding waitlist" + clear patient/dentist split |

**Finding 2.1 -- HIGH:** Features page hero (Features.tsx:86-89) uses "Built for the full dental journey" -- this is vague and doesn't communicate what Perioskoup actually does. A visitor landing directly on /features from search has no immediate understanding of the product.

> **File:** `client/src/pages/Features.tsx:86-89`
> **Recommendation:** Change to something like "AI dental companion features -- everything between your visits, in one app." Lead with "AI dental companion" to reinforce category.

**Finding 2.2 -- MEDIUM:** Contact page (Contact.tsx:109-111) headline "Let's talk dental health" does not reinforce what Perioskoup is. Missed opportunity for a value-prop reinforcing subline.

> **File:** `client/src/pages/Contact.tsx:109-114`
> **Recommendation:** Add a brief line after the subhead reinforcing the product: "Perioskoup is the AI dental companion bridging clinic and home. Whether you want to join or learn more..."

### 3. Trust signals: EFP award, 30+ clinic waitlist, Dr. Anca credentials

**Severity: HIGH (trust signals missing from several key pages)**

| Page | EFP Award | 30+ Clinics | Dr. Anca Credentials |
|------|-----------|-------------|---------------------|
| Home | Yes (badge + full card section) | Yes (micro-bar, line 265) | Yes (quote + team section) |
| Features | No | No | No |
| For Dentists | No | No (only in Twitter meta) | No |
| Pricing | No | No | No |
| About | Yes (full card section) | No | Yes (team section + Person schema) |
| Blog | No (only in meta) | No | Author attribution only |
| Contact | No | No | No |
| Waitlist | Yes (social proof bar) | Yes (social proof bar) | No |
| Footer | Yes (EFP badge link) | No | No |

**Finding 3.1 -- CRITICAL:** The For Dentists page (`ForDentists.tsx`) -- the primary conversion page for dentist visitors -- has ZERO trust signals. No EFP award mention. No "30+ clinics already on the waitlist." No Dr. Anca quote or credentials. A dentist evaluating whether to join the waitlist sees only generic stats ("40% reduction in no-shows" sourced to "digital health research") with no specific social proof for Perioskoup itself.

> **File:** `client/src/pages/ForDentists.tsx` (entire file)
> **Recommendation:** Add (a) an EFP award badge in the hero, (b) "30+ founding clinics already on the waitlist" as a social proof line, (c) Dr. Anca's quote or a dentist-specific testimonial, and (d) her credentials to establish clinical authority.

**Finding 3.2 -- HIGH:** The Features page (`Features.tsx`) has no trust signals at all. No EFP mention, no waitlist numbers, no Dr. Anca.

> **File:** `client/src/pages/Features.tsx` (entire file)
> **Recommendation:** Add at minimum an EFP award micro-badge near the hero and a social proof line ("Trusted by 30+ founding clinics. EFP Innovation Award Winner 2025.") before the CTA.

**Finding 3.3 -- MEDIUM:** The Pricing page (`Pricing.tsx`) has no trust signals. When a visitor is making a purchase/signup decision, trust signals are most critical.

> **File:** `client/src/pages/Pricing.tsx` (entire file)
> **Recommendation:** Add EFP badge + "30+ founding clinics" near the pricing cards. Consider a Dr. Anca quote about why the app is free for patients.

### 4. Dr. Anca's EFP quote -- present and prominent?

**Severity: HIGH (quote is modified from the canonical version)**

The strategy reference specifies this exact quote must be on the site:

> "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of **patient adherence to treatment**, which leads to poor outcomes."

The Home page (Home.tsx:244-245) has a modified version:

> "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of **patient engagement**, which leads to poor outcomes."

**Finding 4.1 -- HIGH:** The word "adherence" was replaced with "engagement," likely to comply with the regulatory rule ("NEVER use: adherence"). This creates a conflict between the strategy reference (which explicitly requires the exact quote for citation purposes) and the regulatory rules.

> **File:** `client/src/pages/Home.tsx:244-245`
> **Recommendation:** This requires a product/legal decision. The word "adherence" is flagged as a regulatory risk, but the strategy says the exact quote is needed for GEO citation. Options: (1) Use the exact original quote since it is a direct quote from Dr. Anca and not a product claim -- direct quotes from a clinician describing real-world challenges may be acceptable. (2) Keep "engagement" but note this diverges from the canonical quote that may appear in external EFP sources, creating a citation mismatch for AI engines. Escalate to founders.

**Finding 4.2 -- MEDIUM:** The quote only appears on the Home page. For GEO citation, it should appear on at least 2-3 pages (Home, About, For Dentists) to increase the probability of AI extraction.

> **File:** `client/src/pages/About.tsx`, `client/src/pages/ForDentists.tsx`
> **Recommendation:** Add Dr. Anca's canonical EFP quote to the About page (near the EFP award card) and the For Dentists page (as a clinician-authority anchor).

### 5. Patient-facing vs dentist-facing messaging

**Severity: MEDIUM (paths exist but differentiation is weak)**

The site has structural separation:
- Patient path: Home -> Features -> Waitlist
- Dentist path: Home -> For Dentists -> Waitlist

The Navbar (Navbar.tsx:12-17) includes "For Dentists" as a dedicated nav item. The Waitlist page (Waitlist.tsx:104-126) has a role selector (dentist/patient) with conditional fields.

**Finding 5.1 -- MEDIUM:** The Home page hero CTA section (Home.tsx:253-261) has "Join the Waitlist" (primary) and "For Clinicians" (ghost) -- good dual-path setup. However, a dentist scanning the page may not immediately identify which content is for them vs. patients.

> **File:** `client/src/pages/Home.tsx:253-261`
> **Recommendation:** Consider adding a visual signal in the hero area -- e.g., "For Patients: free between-visit companion. For Dentists: engagement dashboard + founding pricing." as a quick two-column micro-value-prop.

**Finding 5.2 -- LOW:** The Features page (Features.tsx:33-42) uses tags ("Patients", "Dentists", "Both") on feature cards, which is good. However, the page has no filter mechanism -- a dentist has to scan all 8 cards to find relevant ones.

### 6. CTAs -- compelling and obvious on every page?

**Severity: LOW (generally good, some gaps)**

| Page | Primary CTA | Compelling? | Notes |
|------|------------|-------------|-------|
| Home | "Join the Waitlist" + "For Clinicians" | Yes | Dual CTA, prominent |
| Features | "Join the Waitlist" (hero + bottom) | Yes | Two CTA placements |
| For Dentists | "Join as a Founding Clinic" | Yes | Good specificity |
| Pricing | "Join the Waitlist" / "Apply as Founding Clinic" | Yes | Per-plan CTAs |
| About | "Join the Waitlist" + "Contact Us" | Adequate | Could be stronger |
| Blog | Newsletter subscribe | Weak | No waitlist CTA |
| Contact | "Send Message" | Adequate | Functional |
| Waitlist | "Join the Waitlist" | Yes | Full form |

**Finding 6.1 -- MEDIUM:** The Blog page (Blog.tsx:296-319) has only a newsletter subscribe CTA. There is no waitlist CTA anywhere on the blog index page. Blog visitors who are learning about periodontal health are high-intent prospects with no conversion path except the nav bar.

> **File:** `client/src/pages/Blog.tsx:296-319`
> **Recommendation:** Add a "Try Perioskoup" or "Join the Waitlist" CTA section between the featured posts and the article list, or at the bottom of the page.

**Finding 6.2 -- LOW:** The About page CTA (About.tsx:241-258) uses "Want to be part of the story?" -- this is emotionally compelling but doesn't convey urgency or specificity about what the user gets.

### 7. For Dentists page: ROI, workflow, engagement stats

**Severity: CRITICAL (major content gaps on the most important B2B page)**

The For Dentists page (ForDentists.tsx) is the primary B2B conversion page but is remarkably thin:

**Finding 7.1 -- CRITICAL:** No ROI messaging whatsoever. The page never mentions revenue impact, cost savings, time savings per appointment, patient lifetime value, or any financial metrics. A dentist evaluating a SaaS tool needs to understand the business case.

> **File:** `client/src/pages/ForDentists.tsx` (entire file)
> **Recommendation:** Add a dedicated "ROI for Your Practice" section with concrete metrics: estimated time saved per patient per appointment (from pre-visit summaries), estimated reduction in revenue lost to no-shows (40% x average appointment value), estimated increase in treatment plan acceptance (85% stat already present). Frame in terms the dentist understands: "A practice with 500 patients could save X hours/month and recover Y in no-show revenue."

**Finding 7.2 -- HIGH:** The "Clinical Tools" section (ForDentists.tsx:134-167) lists features (Dashboard, Care Plans, Analytics) but never explains how they fit into the dentist's existing workflow. There's no mention of integration with practice management software, time required for setup, or how it fits into an appointment flow.

> **File:** `client/src/pages/ForDentists.tsx:134-167`
> **Recommendation:** Add a "How It Fits Your Workflow" section showing a typical appointment flow: (1) Before appointment: review patient's Perioskoup engagement summary, (2) During appointment: update care plan in 30 seconds, (3) After appointment: patient receives automated guidance. This makes the product tangible.

**Finding 7.3 -- HIGH:** The stats section (ForDentists.tsx:112-132) shows "40% reduction in no-shows," "3x higher engagement rates," and "85% treatment acceptance" -- all sourced to "digital health research" with no specificity. This is weak for a B2B audience that is naturally skeptical.

> **File:** `client/src/pages/ForDentists.tsx:116-128`
> **Recommendation:** Either (a) cite specific research (e.g., "Journal of Clinical Periodontology, 2024") or (b) add a disclaimer like "Based on published digital health research; Perioskoup-specific outcomes tracked during beta" or (c) replace with Perioskoup's own beta metrics if available.

**Finding 7.4 -- HIGH:** No patient engagement/retention stats specific to Perioskoup. The page doesn't mention the "48h forgetting curve" statistic (which IS on the About page) or position Perioskoup as the solution to this specific problem.

> **File:** `client/src/pages/ForDentists.tsx` (entire file)
> **Recommendation:** Add the problem-solution framing: "Patients forget 80% of care instructions within 48 hours. Perioskoup translates your clinical recommendations into daily habits they actually follow." This is the core pain point for dentists.

### 8. Answer capsules after H2 headings (GEO readiness)

**Severity: CRITICAL (absent from all non-blog pages)**

The strategy requires: "Answer capsules after every H2 (short summary paragraph for AI extraction)."

**Finding 8.1 -- CRITICAL:** Answer capsules are implemented ONLY in blog posts (BlogPost.tsx:704-706 renders capsules from the `answerCapsules` record after each H2). All 6 blog articles have comprehensive answer capsules.

However, NONE of the following pages have answer capsules after their H2 headings:
- Home.tsx -- H2s at lines 366, 403, 473, 535 (no capsules)
- Features.tsx -- H2 at line 140 (no capsule)
- ForDentists.tsx -- H2s at lines 139, 175 (no capsules)
- Pricing.tsx -- H2 at line 167 (no capsule)
- About.tsx -- H2s at lines 177, 212, 243 (no capsules)

> **Files:** All page files in `client/src/pages/` except `BlogPost.tsx`
> **Recommendation:** Add a short (2-3 sentence) summary paragraph immediately after every H2 on every content page. These should be plain-language summaries optimized for AI extraction. Example for Home.tsx "Everything your smile needs. In one place." H2: add "Perioskoup combines AI-powered guidance, daily habit tracking, a clinician dashboard, and secure patient-clinic messaging into a single dental companion app. It is designed for both patients managing oral health at home and dentists extending care beyond the appointment."

### 9. Copy persuasiveness -- what's missing?

**Severity: HIGH (several persuasion gaps)**

**Finding 9.1 -- HIGH:** No urgency or scarcity messaging on any page. The waitlist has "30+ founding clinics" and "500+ on the waitlist" but never says "limited spots," "founding pricing ends at launch," or gives a timeline pressure. The March 2026 launch date (mentioned only in meta descriptions) is never visible on-page.

> **Recommendation:** Add visible urgency: "Founding clinic spots are limited. Public launch: March 2026." on the For Dentists and Waitlist pages.

**Finding 9.2 -- HIGH:** No patient testimonials or use cases anywhere on the site. All quotes are from the founders or EFP. While the product is in beta, even hypothetical user scenarios ("Meet Sarah, a periodontal patient...") or beta tester quotes would add persuasion.

> **Recommendation:** If beta testers exist, collect 2-3 short testimonials. If not, add 1-2 patient scenario stories that illustrate the problem/solution in concrete terms.

**Finding 9.3 -- MEDIUM:** The Home page "How It Works" section (Home.tsx:398-466) uses "Scan, Analyze, Engage" -- these are product-centric terms. A patient doesn't think in terms of "scanning intraoral data." The copy should be reframed from the user's perspective.

> **File:** `client/src/pages/Home.tsx:418-431`
> **Recommendation:** Reframe as patient-friendly steps: e.g., "Visit your dentist -> Get your personalized plan -> Build daily habits with AI support."

**Finding 9.4 -- MEDIUM:** The EFP award is described as "3rd Prize" in structured data (About.tsx:52) and "Winner" in visible copy. This inconsistency could erode trust if a visitor checks the EFP source. Be consistent.

> **File:** `client/src/pages/About.tsx:52` vs visible "EFP Innovation Award Winner 2025" badges
> **Recommendation:** Standardize to "EFP Digital Innovation Award 2025 -- 3rd Prize" or "EFP Digital Innovation Award Winner 2025" consistently across schema and visible copy. "Winner" is technically accurate (they won a prize) but may feel misleading if someone expects 1st place.

**Finding 9.5 -- LOW:** ORCID and Google Scholar profile links for Dr. Anca are missing, as required by the strategy reference (line 19).

> **File:** `client/src/pages/About.tsx:40-57` (Person schema)
> **Recommendation:** Add ORCID and Google Scholar links to the Person structured data `sameAs` array, and as visible links on the About page team card for Dr. Anca.

### 10. Category ownership: "AI dental companion" reinforcement

**Severity: HIGH (phrase appears on too few pages)**

The strategy identifies "AI dental companion" as the zero-competition category term that Perioskoup must own in search.

**Finding 10.1 -- HIGH:** The exact phrase "AI dental companion" appears on only 3 of 10 auditable pages:

| Page | "AI dental companion" present? | Location |
|------|-------------------------------|----------|
| Home | Yes | Meta title, OG title, Twitter title, subhead (line 239) |
| Features | Yes | Meta title, meta description, Twitter description |
| For Dentists | No | Not in any visible text or meta |
| Pricing | No | Not in any visible text or meta |
| About | No | Not in any visible text or meta |
| Blog | No | Not in any visible text or meta |
| Contact | No | Not in any visible text or meta |
| Waitlist | Yes | Meta description, OG description, Twitter description |
| Privacy | No | N/A (legal page) |
| Terms | No | N/A (legal page) |

> **Recommendation:** Add "AI dental companion" to the visible body copy and/or meta descriptions of at least: For Dentists, About, Pricing, and Blog. Target: the phrase should appear on every content page at least once in visible text and once in meta. This is non-negotiable for category creation.

**Finding 10.2 -- MEDIUM:** The Footer (Footer.tsx:49-51) describes Perioskoup as "Your personal dental companion. Bridging the gap between clinic and home." This omits "AI" -- a missed sitewide reinforcement opportunity since the footer appears on every page.

> **File:** `client/src/components/Footer.tsx:49-51`
> **Recommendation:** Change to "Your AI dental companion. Bridging the gap between clinic and home." This puts the category phrase on every page via the footer.

**Finding 10.3 -- MEDIUM:** The Navbar (Navbar.tsx) has no tagline or descriptor. Consider adding a small tagline next to the logo ("AI Dental Companion") for constant category reinforcement, especially on mobile where page-specific copy may be below the fold.

---

## Summary of Findings by Severity

### CRITICAL (3)

| # | Finding | Page | Impact |
|---|---------|------|--------|
| 3.1 | For Dentists page has ZERO trust signals | ForDentists.tsx | B2B conversion killer |
| 7.1 | For Dentists page has no ROI messaging | ForDentists.tsx | Dentists have no business case |
| 8.1 | Answer capsules absent from all non-blog pages | All pages except BlogPost.tsx | GEO readiness severely limited |

### HIGH (10)

| # | Finding | Page | Impact |
|---|---------|------|--------|
| 2.1 | Features hero value prop is vague | Features.tsx:86-89 | Direct-traffic comprehension gap |
| 3.2 | Features page has no trust signals | Features.tsx | Missed credibility opportunity |
| 4.1 | Dr. Anca's canonical EFP quote is modified | Home.tsx:244-245 | GEO citation mismatch risk |
| 4.2 | EFP quote appears on only 1 page | Home.tsx only | Low extraction probability |
| 7.2 | No workflow integration explanation | ForDentists.tsx:134-167 | Dentists can't envision adoption |
| 7.3 | Stats sourced to generic "digital health research" | ForDentists.tsx:116-128 | Weak B2B credibility |
| 7.4 | No problem-solution framing on For Dentists | ForDentists.tsx | Misses core pain point |
| 9.1 | No urgency/scarcity messaging anywhere | All pages | Weak conversion pressure |
| 9.2 | No patient testimonials or use cases | All pages | Lack of social proof diversity |
| 10.1 | "AI dental companion" on only 3/10 pages | Multiple | Category ownership gap |

### MEDIUM (8)

| # | Finding | Page | Impact |
|---|---------|------|--------|
| 1.1 | H1 doesn't contain "dental" | Home.tsx:232-235 | SEO H1 tag weight |
| 2.2 | Contact page has no value reinforcement | Contact.tsx:109-114 | Missed messaging opportunity |
| 3.3 | Pricing page has no trust signals | Pricing.tsx | Decision-point credibility gap |
| 5.1 | No visual patient/dentist path separator in hero | Home.tsx:253-261 | Audience self-selection friction |
| 6.1 | Blog has no waitlist CTA | Blog.tsx:296-319 | High-intent visitors lost |
| 9.3 | "How It Works" uses product-centric language | Home.tsx:418-431 | Patient comprehension gap |
| 9.4 | "Winner" vs "3rd Prize" inconsistency | About.tsx:52 vs badges | Trust erosion risk |
| 10.2 | Footer omits "AI" from tagline | Footer.tsx:49-51 | Sitewide category miss |

### LOW (4)

| # | Finding | Page | Impact |
|---|---------|------|--------|
| 5.2 | Features page has no filter for audience | Features.tsx | Minor UX friction |
| 6.2 | About CTA is emotionally vague | About.tsx:241-258 | Weak conversion specificity |
| 9.5 | ORCID / Google Scholar links missing | About.tsx:40-57 | Clinical authority schema gap |
| 10.3 | Navbar has no tagline for category reinforcement | Navbar.tsx | Mobile category visibility |

---

## Priority Action Plan

### Immediate (this sprint)

1. **For Dentists page overhaul** -- Add trust signals (EFP badge, 30+ clinics, Dr. Anca quote), ROI section, workflow integration explanation, and problem-solution framing with the 48h forgetting curve statistic
2. **Answer capsules on all content pages** -- Add 2-3 sentence summary paragraphs after every H2 on Home, Features, For Dentists, Pricing, About
3. **"AI dental companion" on every content page** -- Add the phrase to visible body copy on For Dentists, About, Pricing, Blog, Contact

### Next sprint

4. **Footer tagline fix** -- Change to "Your AI dental companion" (1-word change, sitewide impact)
5. **Features page trust signals** -- Add EFP badge + social proof line
6. **Blog waitlist CTA** -- Add a conversion CTA section to the blog index page
7. **Dr. Anca quote propagation** -- Add the canonical quote to About and For Dentists pages
8. **Urgency messaging** -- Add "March 2026 launch" and "limited founding spots" to For Dentists and Waitlist

### Backlog

9. Resolve "adherence" vs "engagement" quote discrepancy (founder decision needed)
10. Add patient testimonials or scenario stories
11. Add ORCID/Google Scholar links for Dr. Anca
12. Reframe "How It Works" section in patient-friendly language
13. Standardize "Winner" vs "3rd Prize" copy

---

*End of audit report. All file paths are relative to project root `/Users/moziplaybook/Projects/official-perioskoup/`.*
