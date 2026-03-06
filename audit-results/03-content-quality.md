# Content Quality Audit — Perioskoup Landing Page
**Audit Date:** 2026-03-06  
**Auditor Agent:** 03-content-quality  
**Scope:** All pages in client/src/pages/ + shared components  
**Framework:** Landing Page Roast (clarity, audience fit, offer strength, trust, friction, objection handling)

---

## Overall Score: 6.8 / 10

Strong bones, clear brand voice, and legitimate third-party validation. The score is held back by: unsubstantiated stats displayed as marketing claims, a pricing page that lists real tiers in FAQs/JSON-LD while showing "Coming soon" on the card (contradiction), two confirmed regulatory flag terms in blog content, and a social proof layer that relies entirely on founder self-quotes.

---

## 1. Regulatory Scan — CRITICAL FLAGS

### Confirmed violations of the CLAUDE.md prohibited term list:

| Term | File | Line | Exact Text |
|---|---|---|---|
| `adherence` | `client/src/pages/BlogPost.tsx` | 516 | "The evidence on improving patient **adherence** to health instructions is clear:" |
| `adherence` | `client/src/pages/BlogPost.tsx` | 526 | "…improve medication **adherence** and health behaviour engagement." |
| `therapeutic` | `client/src/pages/BlogPost.tsx` | 235 | "AI cannot replace the **therapeutic** relationship between a patient and their clinician." |

### Additional terms that require review (not on the prohibited list but contextually risky):

| Term | File | Line | Context |
|---|---|---|---|
| `diagnose` / `diagnosis` | `client/src/pages/BlogPost.tsx` | 130, 166, 170, 209, 233, 243, 278, 434, 502, 630 | Used extensively in blog articles describing periodontal disease. Most are clinically educational and clearly attributed to a dentist author — low regulatory risk in editorial context, but high volume needs monitoring. |
| `diagnose` | `client/src/pages/Terms.tsx` | 14 | "does not provide **diagnoses**" — this is a *disclaimer* context, which is correct and appropriate. |
| `therapeutic` | `client/src/pages/Terms.tsx` | 15 | "diagnostic or **therapeutic** purposes" — disclaimer context, appropriate usage. |
| `diagnose` | `client/src/pages/Home.tsx` | 128 | JSON-LD FAQ: "It does not **diagnose** conditions" — disclaimer context, appropriate. |
| `diagnose` | `client/src/pages/ForDentists.tsx` | 54 | JSON-LD FAQ: "It does not **diagnose** conditions" — disclaimer context, appropriate. |
| `treatment` / `treat` | `client/src/pages/BlogPost.tsx` | 76, 82, 88, 94, 134, 138, 142, 156, 171, etc. | Used throughout educational blog articles — appropriate in clinical education context. Not a product marketing claim. |
| `AI-powered diagnosis explanations` | `client/src/pages/Pricing.tsx` | 31 | Listed as a Patient plan feature: "**AI-powered diagnosis explanations**" — this is a **live product feature claim** on the pricing card, not a disclaimer. The word "diagnosis" here implies the app interprets diagnoses, which conflicts with the wellness-only positioning. |
| `AI-powered diagnosis explanations` | `client/src/pages/Pricing.tsx` | 57 | Repeated in JSON-LD FAQ answer for the Patient plan. |

### Summary of actions required:

1. **`adherence` in BlogPost.tsx lines 516 and 526** — Replace with "engagement", "consistency", or "follow-through". These are within Dr. Anca's authored article and could be re-framed as patient engagement research rather than clinical adherence literature.

2. **`therapeutic` in BlogPost.tsx line 235** — Replace with "clinical relationship" or "patient-clinician relationship". The sentence is editorially sound but the word itself is on the prohibited list.

3. **`AI-powered diagnosis explanations` in Pricing.tsx lines 31 and 57** — This is the highest-priority fix. Rewrite to "AI-powered condition education" or "Plain-language explanation of your dental report". "Diagnosis explanations" implies the AI is interpreting a diagnosis, which is a regulatory liability on a product feature list.

---

## 2. Value Proposition Clarity (3-Second Test)

### Home Page
**Above-the-fold headline:** "Between visits, we take over."  
**Sub-headline:** Dr. Anca's blockquote about shortage of time and lack of patient engagement.

**Assessment:** The headline is emotionally resonant and positions the "between visits" gap well. However, it does not answer "what is this?" in 3 seconds for a first-time visitor. A patient landing here does not immediately know whether this is an app, a service, a clinic, or a subscription. The product category ("AI dental companion app") only appears in the ticker strip below the fold, in small uppercase text.

**Score: 5/10** — Evocative but not informative enough for cold traffic.

**Suggested fix:**  
Add a 12–16px Gabarito subhead immediately below the headline, before the blockquote:  
"Perioskoup is your AI dental companion app — personalised guidance, reminders, and habit tracking between your dental appointments."

### ForDentists Page
**Headline:** "Your patients, better prepared."  
**Sub-copy:** "…extend care beyond the appointment — improving engagement, reducing no-shows, and building lasting patient relationships."

**Assessment:** Clear, outcome-focused, dentist-centric. The 3-second test passes. Dentists understand the value immediately.

**Score: 8/10**

### Features Page
**Headline:** "Built for the full dental journey."  
**Assessment:** Slightly generic. Does not speak to either audience segment distinctly. The tag system (Patients / Dentists / Both) on feature cards is well-executed.

**Score: 6/10**

### Pricing Page
**Headline:** "Simple, transparent pricing."  
**Assessment:** Passes clarity test but undermines itself immediately — the clinic card shows "Coming soon" with no price, while the JSON-LD schema and FAQ copy describe specific founding partner pricing. The page promises transparency but delivers opacity on the one side dentists care about.

**Score: 4/10**

---

## 3. "What's In It For Me?" — Audience Targeting

### For Patients
**Strengths:**
- "Free" is prominently stated on pricing card and waitlist page.
- Features page clearly tags patient-facing features.
- Blog articles written by Dr. Anca speak directly to patient pain (forgetting instructions, not understanding diagnosis, disease recurrence).

**Gaps:**
- The home page hero does not split-address both audiences. A patient visiting the home page sees the same hero as a dentist. The secondary CTA ("For Clinicians") hints at dual audience but does not help patients understand their specific value pathway immediately.
- No patient testimonials. The only quote visible is from Dr. Anca — a founder self-quote used as social proof.
- No visual walkthrough of the patient app experience beyond the phone mockup showing a role selection screen.

**Patient WITFM Score: 6/10**

### For Dentists
**Strengths:**
- Dedicated /for-dentists page with stat block (40% no-shows, 3x engagement, 85% treatment acceptance).
- Feature list with bullets is concrete and practice-management-oriented.
- "Founding clinic" framing with lifetime pricing lock is a strong incentive.
- CTA differentiation: "Apply as a Founding Clinic" vs generic "Join Waitlist".

**Gaps:**
- The three headline stats (40%, 3x, 85%) are displayed without source attribution anywhere on the site. For a dentist audience (evidence-based professionals), unattributed statistics significantly reduce credibility.
- ROI framing is absent. No calculation of how much chair time is saved, what the revenue impact of 40% fewer no-shows is, or what a dentist's time is worth per appointment recovered.
- No pricing revealed. A dentist evaluating this product has no way to assess the cost-benefit equation. "Coming soon" is acceptable for patients but is a conversion killer for a B2B decision-maker.

**Dentist WITFM Score: 6/10**

---

## 4. CTA Quality, Placement, and Consistency

### Audit of all CTAs site-wide:

| Page | Primary CTA | Secondary CTA | Quality |
|---|---|---|---|
| Home hero | "Join the Waitlist" → /waitlist | "For Clinicians" → /for-dentists | Good split. Arrow icon on primary is correct. |
| Home CTA section | "Join the Waitlist" (form) | — | Good. Form is contextually placed. |
| Home features section | "See all features →" | — | Text link. Weak for conversion. Should be btn-ghost minimum. |
| ForDentists hero | "Join as a Founding Clinic" | "See All Features" | Excellent. "Founding Clinic" framing creates exclusivity. |
| ForDentists CTA | "Apply as a Founding Clinic" | "Talk to the Team" | Strong. Two paths for different intent levels. |
| Features hero | "Join the Waitlist →" | "For Dentists" | Consistent. Arrow on primary. |
| Features bottom | "Get Early Access →" | — | Slightly inconsistent label vs. "Join the Waitlist" elsewhere. |
| Pricing (Patient card) | "Join Waitlist" | — | Missing arrow icon. Inconsistent with primary CTA style. |
| Pricing (Clinic card) | "Join Founding Waitlist" | — | Missing arrow icon. Label is slightly different from "Apply as a Founding Clinic" on ForDentists page. |
| Blog newsletter | "Subscribe" | — | Weak label. Replace with "Send me articles" or "Keep me posted". |
| Waitlist page | "Join the Waitlist" | — | Good. Role selector before the form is strong UX. |
| About CTA | "Join the Waitlist" | "Contact Us" | Appropriate for the page type. |
| Navbar | "Join Waitlist" | — | Correct placement. Slightly shorter label than body CTAs. |

**Issues:**
- CTA label inconsistency: "Join the Waitlist", "Join Waitlist", "Get Early Access", "Join Founding Waitlist", "Apply as a Founding Clinic" — five different formulations of the same conversion action.
- Missing arrow icons on pricing card buttons where all other primary CTAs have them.
- No pricing page CTA specifically positioned for the dentist audience (a dentist landing on pricing sees a "Coming soon" card with no specialist call to action beyond a waitlist form that was also shown to patients).

**CTA Score: 6/10**

---

## 5. EFP Award Usage Effectiveness

The EFP Digital Innovation Award 2025 (3rd Prize, EuroPerio11 Vienna) is the site's strongest third-party validation asset. Assessment by placement:

| Location | Usage | Effectiveness |
|---|---|---|
| Home hero badge (lime pill) | "EFP Award Winner 2025 · Digital Innovation" with external link | Excellent. Linked, immediately visible, first thing above headline. |
| Home ticker strip | "EFP Innovation Award Winner 2025" | Good ambient reinforcement. |
| Home stats row | "EFP Innovation Award · Winner" | Correct. Integrates naturally with quantitative stats. |
| Home EFP card section | Full card with photo, EFP jury quote, jury names, sponsor logos | Very strong. Most detailed treatment. Jury names (Deschner, Herrera, Stavropoulos) add institutional weight. |
| Footer | "EFP Award 2025" linked pill | Good persistence across all pages. |
| About page EFP section | Same card format as home, with photo | Good, but duplicative. |
| Blog post slug | Dedicated article: "Perioskoup Wins EFP Digital Innovation Award 2025" | Strong for SEO and brand narrative. |
| Waitlist page social proof | "Winner · EFP Award 2025" as a stat | Good. |

**Gaps:**
- The award is described only as "3rd Prize" in the blog article. On every other page, it is stated only as "Award Winner 2025" without the "3rd Prize" qualifier. This is fine marketing practice (3rd Prize is still an award), but the inconsistency between the blog and landing pages should be deliberate and consistent.
- The EFP jury quote ("innovative digital tool that uses artificial intelligence to support both patients and clinicians in managing oral health") is used verbatim in two separate locations (home and about). Consider using a different pull-quote or editorial paraphrase on one of them to avoid word-for-word duplication.
- No video asset from the EuroPerio11 ceremony is referenced. If one exists, a 30-second ceremony clip would dramatically strengthen the trust layer.

**EFP Usage Score: 8/10**

---

## 6. Blog Content Quality

### Articles audited:

**"What Is Periodontal Disease? A Patient's Complete Guide"** (Dr. Anca, 8 min)  
- Depth: Excellent. Covers gingivitis vs. periodontitis staging, diagnostic process, treatment options, home care. Clinical detail appropriate for patient education without being inaccessible.  
- Accuracy: High. Written by a practising periodontist. Treatment descriptions are standard of care.  
- Internal linking: Weak. No internal links from the article body to Features, ForDentists, or Waitlist pages at natural anchor points (e.g., "apps like Perioskoup" could link to Features). The only Perioskoup reference is one sentence near the end.  
- Keyword targeting: Strong — "periodontal disease", "what is periodontitis", "gum disease patient guide" are well-targeted.  
- Regulatory note: Article discusses "treatment" and "diagnosis" extensively but appropriately in clinical education context. The "adherence" usage flagged above is within this article.

**"Perioskoup Wins EFP Digital Innovation Award 2025"** (Eduard, 4 min)  
- Depth: Adequate for a press/news piece. Could be deeper — no quotes from jury members, no specific details about the competition submission.  
- Internal linking: Missing. Should link to the ForDentists and Features pages.  
- Keyword targeting: Good for brand SERP. "EFP Digital Innovation Award 2025" and "EuroPerio11" are appropriate targets.

**"How AI Is Changing Dental Monitoring — And What It Matters"** (Eduard, 7 min)  
- Depth: Strong. Covers diagnostic AI, predictive risk modelling, patient engagement AI, and limitations clearly.  
- The explicit section "What Perioskoup Does (and Does Not Do)" is excellent regulatory positioning — proactively disavows diagnosis, positions as engagement/guidance.  
- Internal linking: Appears to have limited cross-linking to other blog posts or feature pages.  
- The "therapeutic relationship" flagged term appears in this article (line 235).

**"The 3-Minute Daily Routine That Could Save Your Teeth"** (Dr. Anca, 5 min)  
- This appears to be a patient habit article. Strong concept for organic search ("daily dental routine", "3 minute dental care").  
- Should contain an in-article CTA connecting the Perioskoup habit tracking feature directly to the routine described.

**"Why Patients Forget Dental Instructions"** (Dr. Anca, 6 min)  
- Strong clinical insight article. The forgetting curve research angle is credible and differentiating.  
- Contains the two "adherence" occurrences flagged above (lines 516, 526).  
- No citations or references to the studies mentioned ("research shows patients forget 40–80% of medical information"). For a clinician audience, this weakens the argument.

**"Building the Bridge: The Perioskoup Story"** (Dr. Anca, 7 min)  
- Excellent founder narrative. Personal clinical story is compelling.  
- Should be cross-linked from the About page and vice versa.

**Overall blog assessment:** High editorial quality for a pre-launch startup. Dr. Anca's authored articles are genuinely credible — a real periodontist writing substantively about her specialty is rare and valuable. The main structural weakness is the absence of internal linking between articles and product pages.

**Blog Score: 7/10**

---

## 7. Missing Content Gaps

### High-priority pages that should exist:

1. **"How It Works" dedicated page** — The home page has a 3-step section (Scan / Analyze / Engage) but it reads as a simplified product flow aimed at dentists. There is no page that walks a patient through their actual daily experience with the app. A patient onboarding flow explainer would reduce signup friction.

2. **Research / Evidence page** — The three stats used throughout the site (40% fewer no-shows, 3x engagement, 85% treatment acceptance) have no source. A dedicated page or footnotes linking these to published studies (or clearly labelling them as projections/industry benchmarks) is essential for dentist credibility. Without this, the site reads as marketing-speak to a clinical audience.

3. **Patient testimonials / clinic testimonials page** — Currently zero external social proof. The waitlist page claims "500+ on the waitlist" and "30+ founding clinics" but shows no names, stories, or quotes. Even anonymized testimonials ("Dr. R., Periodontist, London: ...") would significantly strengthen trust.

4. **Comparison / vs. alternatives page** — "AI dental companion" is the product category. A page explaining why this is different from generic health apps or just emailing PDF care plans would address a dentist's natural objection.

5. **GDPR / Security detail page** — Privacy policy exists but is a generic legal document. A dedicated "How We Protect Your Data" page written in plain English for patients and a more technical version for dentists (covering EU MDR, GDPR Art. 9, encryption standards) would reduce sign-up hesitation.

6. **Press / Media kit page** — The EFP award is a credibility asset that should drive press coverage. A press page with the award announcement, founder bios, logo downloads, and a press contact email would capture inbound journalist interest that is currently landing on a contact form.

### Missing blog articles that should exist (high-value keyword opportunities):

- "What is a periodontist?" — enormous patient search volume, currently zero content
- "Gum disease and heart disease — what's the link?" — high health anxiety traffic, good for clinician credibility
- "How often should you see a dentist?" — top-of-funnel patient query
- "What is scaling and root planing?" — procedure-specific patient education
- "How to improve patient retention in your dental practice" — B2B dentist content, feeds the For Dentists funnel
- "Best dental apps 2026" — category comparison content, captures in-market searches

---

## 8. "Between Visits" Positioning Strength

The "between visits" positioning is the site's single most distinctive strategic asset. Assessment:

**Where it works well:**
- Home hero headline: "Between visits, we take over." — This is the strongest copy on the site. It is ownable, specific, and creates immediate category differentiation.
- Footer tagline: "Bridging the gap between clinic and home." — Reinforces the positioning consistently.
- Blog article "Building the Bridge" — editorial extension of the positioning narrative.
- About page mission section: "Close the gap between visits." — Direct and memorable.
- Ticker: "Bridging the Gap Between Visits" — ambient reinforcement.

**Where it is underdeveloped:**
- The Features page headline ("Built for the full dental journey") does not reference the between-visits positioning at all. An opportunity is missed to anchor every product feature to the "between-visits" problem it solves.
- The ForDentists page hero ("Your patients, better prepared") is dentist-centric but does not use the "between visits" frame. "What happens to your patients between appointments?" would be a stronger opening.
- No feature is explicitly labelled "Between Visits" as a product category. The patient app value proposition could be strengthened by naming the core use case: "Everything patients need between appointments."

**Between-Visits Positioning Score: 7/10**

---

## 9. Pricing Page Urgency

The pricing page has a structural credibility problem: it is in a state of internal contradiction.

**What the page shows:**
- Patient card: "Free / during beta" with a clear feature list and "Join Waitlist" CTA.
- Clinic card: "Coming soon" with a feature list and "Join Founding Waitlist" CTA.
- FAQ: "Limited spots available" for founding partners.

**What the site says elsewhere:**
- CLAUDE.md business context: Starter €39/mo, Growth €89/mo, Pro €199/mo.
- These tiers are referenced in the CLAUDE.md but do not appear anywhere on the pricing page.
- The JSON-LD Product schema on the pricing page uses `"availability": "PreOrder"` which is accurate, but the Offer schema for the Clinic plan has no price field at all, which is a missed structured data opportunity.

**Urgency mechanisms:**
- "Founding partner" framing is present but weak. The FAQ says "limited spots available" but gives no number, no deadline, and no scarcity indicator.
- No countdown timer, no "X spots remaining", no explicit founding pricing differential.
- The beta notice bar ("We're currently in private beta") is informational, not urgent.

**What is missing:**
- The actual pricing tiers (Starter/Growth/Pro) are kept hidden from the pricing page. This may be intentional strategy, but without at least showing the pricing range or saying "Founding pricing vs. standard pricing from €39–199/mo", there is no incentive gradient for a dentist to act now vs. wait.
- No comparison between founding clinic pricing and eventual standard pricing to quantify the scarcity value.

**Pricing Urgency Score: 4/10**

---

## 10. Top 5 Conversion Blockers (Ranked by Impact)

### Blocker 1 — Unsubstantiated statistics (High impact, damages dentist credibility)
The stats "40% fewer no-shows", "3x higher engagement rates", and "85% treatment acceptance" appear on Home, ForDentists, and Waitlist pages with zero source attribution. For a dentist audience trained to demand evidence, these read as marketing invention. Either source them to published studies, label them as "industry benchmarks" or "projected outcomes based on digital health research", or remove them and replace with the EFP award validation which is real and verifiable.

### Blocker 2 — Pricing opacity for dentists (High impact, blocks B2B decision-making)
A dentist visiting the pricing page cannot assess value. "Coming soon" is appropriate for a stealth pre-launch but creates zero urgency. Show the pricing tiers with a "founding clinic discount" badge, even if the beta price is €0 or "by application". Dentists need to understand the eventual cost structure to decide whether to invest time in evaluating the product.

### Blocker 3 — Zero external social proof (High impact, damages trust for both audiences)
Every testimonial on the site is from a founder. The waitlist claims 500+ signups and 30+ founding clinics — even one attributed quote from a real dentist (with name and clinic) would transform the trust layer. "We reached out to 30 founding clinics and couldn't get a single testimonial" is the implicit message a skeptical visitor reads.

### Blocker 4 — Home hero value proposition is too abstract for cold traffic (Medium impact)
"Between visits, we take over." is excellent for returning visitors and people who already know the context. For a patient who finds the site from a Google search for "gum health app" or "dental care reminder app", the headline does not answer the fundamental question: what is this, and why do I need it? A 16px subhead explaining the product category would fix this immediately.

### Blocker 5 — Regulatory term exposure in product feature list (High regulatory risk, medium conversion impact)
"AI-powered diagnosis explanations" on the Pricing page's Patient plan feature list is the highest-risk phrase on the site. It implies the AI interprets diagnoses. This must be rewritten regardless of conversion impact — the regulatory exposure outweighs any benefit from the current phrasing.

---

## 11. Quick Wins (Under 30 Minutes Each)

1. Replace "AI-powered diagnosis explanations" in Pricing.tsx line 31 and FAQ line 57 with "Plain-language oral health education" or "AI-powered condition education".

2. Replace "adherence" in BlogPost.tsx lines 516 and 526 with "engagement" and "habit consistency" respectively.

3. Replace "therapeutic" in BlogPost.tsx line 235 with "clinical relationship".

4. Add source footnotes to the three headline stats on ForDentists and Home pages, even if just "Source: Digital health engagement research, EFP 2024" as a generic citation.

5. Standardise all primary CTAs to one label: "Join the Waitlist" (with arrow). Remove variants "Get Early Access" and "Join Founding Waitlist" from feature/pricing pages — consolidate to the single primary action.

6. Add a sentence to the Home hero: "Perioskoup is a free AI dental companion app — habit tracking, personalised guidance, and a direct line to your clinic between appointments."

7. Add article-to-product internal links in the two most-read blog articles. In "What Is Periodontal Disease", add a contextual link to the Features page at the paragraph about home care maintenance.

---

## 12. Structural Rewrites Recommended

### Home Hero Subhead (add after headline, before blockquote)
**Current:** No explanatory subhead — goes straight from headline to Dr. Anca's blockquote.  
**Recommended:** "Perioskoup is a free AI dental companion app. It keeps patients engaged between appointments and gives dentists real-time visibility into how their patients are doing at home."

### Pricing Page — Clinic card
**Current:** Name: "Clinic" | Price: "Coming soon" | CTA: "Join Founding Waitlist"  
**Recommended:** Name: "For Dental Practices" | Price: "Founding pricing — apply now" | Sub-copy: "Launching at €39–199/mo. Founding clinics get locked-in pricing." | CTA: "Apply as a Founding Clinic"

### ForDentists Hero Subhead
**Current:** "Perioskoup gives your clinic a powerful tool to extend care beyond the appointment — improving engagement, reducing no-shows, and building lasting patient relationships."  
**Recommended:** "What happens to your patients between appointments? Perioskoup gives you visibility, and gives them the guidance they need — without any extra work from your team."

---

## 13. CTA Variants for Testing

**Variant A (current):** "Join the Waitlist"  
**Variant B (urgency):** "Claim Founding Clinic Access"  
**Variant C (benefit-led):** "Start Free — No Credit Card"  

Test Variant C on patient-facing CTAs, Variant B on dentist-facing CTAs.

---

## Score Summary

| Dimension | Score |
|---|---|
| Value proposition clarity | 5.5/10 |
| Audience targeting (patients) | 6/10 |
| Audience targeting (dentists) | 6/10 |
| CTA quality and consistency | 6/10 |
| EFP award usage | 8/10 |
| Blog content quality | 7/10 |
| Missing content gaps | 5/10 (gap count is high) |
| Between-visits positioning | 7/10 |
| Pricing page urgency | 4/10 |
| Regulatory safety | 7/10 (3 violations found) |
| **Overall** | **6.8/10** |

---

## Files Referenced

- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Home.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/ForDentists.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Features.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Pricing.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Blog.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/BlogPost.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/About.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Waitlist.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Contact.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/pages/Terms.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/components/Navbar.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/components/Footer.tsx`
- `/Users/moziplaybook/Projects/official-perioskoup/client/src/components/PhoneMockup.tsx`
