# Audit 03 -- User Journey & UX
**Date:** 2026-03-06
**Auditor:** Claude Opus 4.6 (UX Strategist)
**Scope:** perioskoup.com -- all pages, navigation, CTAs, mobile experience, information architecture
**Reference:** `audit/strategy-reference.md`

---

## Executive Summary

The site has strong visual design and good accessibility foundations (skip links, ARIA, reduced-motion support). However, **several critical mobile breakage issues, missing CTA visibility patterns, and navigation gaps between patient/dentist paths** create friction that will cost conversions. The Home page hero is excellent, but inner pages lack the trust signals and urgency that the Home page delivers. The biggest wins are fixing hard-coded grid columns that break on mobile, adding "Pricing" and "Contact" to the main nav, and ensuring every page has a visible CTA within the first viewport.

**Severity scale:** P0 = broken/blocking, P1 = high-impact conversion issue, P2 = moderate UX friction, P3 = polish/optimization

---

## 1. Patient Journey: Home -> Features -> Waitlist

### Finding 1.1 -- Journey is functional but lacks urgency escalation [P2]
The path works: Home hero CTA ("Join the Waitlist") and secondary CTA ("For Clinicians") are prominent. The Features page has a "Join the Waitlist" CTA in both the hero and the bottom section. The Waitlist page has a well-designed role selector (patient/dentist) with clear form.

**Gap:** The Features page does not reinforce the social proof that the Home page delivers (30+ clinics, 500+ waitlist, EFP award). A patient who lands directly on `/features` from search has no trust signals above the fold.

**Recommendation:**
- Add a micro social-proof bar to the Features hero (e.g., "500+ on the waitlist -- EFP Award Winner 2025") similar to the Home page's line at `client/src/pages/Home.tsx:264-266`.
- File: `client/src/pages/Features.tsx`, insert after the CTA row around line 100.

### Finding 1.2 -- No inline waitlist form on Features page [P2]
The Features page bottom CTA is a link-button to `/waitlist`. Requiring a full page navigation to sign up adds one click of friction. The Home page has an inline `<WaitlistForm />` component in its CTA section (Home.tsx:551) which converts without a page change.

**Recommendation:**
- Add a compact inline waitlist form to the Features page bottom CTA section, or at minimum an email-only capture inline.
- File: `client/src/pages/Features.tsx`, lines 137-150.

---

## 2. Dentist Journey: Home -> For Dentists -> Contact/Waitlist

### Finding 2.1 -- Journey is well-structured [OK]
The Home hero has a secondary "For Clinicians" ghost button (Home.tsx:258-260). The For Dentists page has a compelling hero with "Join as a Founding Clinic" CTA and a bottom CTA section with both "Apply as a Founding Clinic" and "Talk to the Team" (ForDentists.tsx:182-188). This is good dual-path design.

### Finding 2.2 -- For Dentists page lacks Dr. Anca's authority signal [P1]
The strategy reference requires "Dr. Anca Constantin as named expert on every clinical page." The For Dentists page has no mention of Dr. Anca, no photo, no quote, no EFP award badge. A dentist evaluating the product wants to know who the clinical mind behind it is.

**Recommendation:**
- Add a "Clinical Leadership" section with Dr. Anca's photo, credentials, and the EFP quote: "Perioskoup was born out of two big challenges..."
- Add the EFP Award badge to the hero, similar to Home.tsx:221-228.
- File: `client/src/pages/ForDentists.tsx`, insert between Stats section (line 132) and Clinical Tools section (line 134).

### Finding 2.3 -- No "Contact" link in primary navigation [P1]
The navbar links are: Features, For Dentists, About, Blog (Navbar.tsx:12-17). A dentist looking to talk to the team has no way to find the Contact page from the nav. They must scroll to the footer or happen upon the "Talk to the Team" link on the For Dentists page.

**Recommendation:**
- Add "Contact" to `NAV_LINKS` in `client/src/components/Navbar.tsx:12-17`.
- Consider making it a ghost-style link or placing it before the "Join Waitlist" CTA button.

---

## 3. Navigation: Patient vs Dentist Path Distinction

### Finding 3.1 -- No visual segmentation of audience paths [P2]
The nav has "For Dentists" as one link among four. There is no visual cue (color, icon, separator) to indicate this is a different audience path. A first-time visitor scanning the nav cannot instantly tell which links are for patients and which are for clinicians.

**Recommendation:**
- Consider a subtle visual separator (a faint vertical divider or spacing gap) between patient-facing links (Features, About, Blog) and the clinician-facing link (For Dentists) in the desktop nav.
- In the mobile drawer (Navbar.tsx:148-168), add a small section header like "For Clinicians" above the "For Dentists" link.

### Finding 3.2 -- Pricing not in the primary nav [P2]
The Pricing page exists at `/pricing` and is listed in the footer under "Product", but is absent from the main nav. Both patients ("is it free?") and dentists ("how much?") have pricing as a top question. Hiding it in the footer creates unnecessary friction.

**Recommendation:**
- Add "Pricing" to `NAV_LINKS` in `client/src/components/Navbar.tsx:12-17`.
- The nav would become: Features, For Dentists, Pricing, About, Blog -- or a curated subset if there are too many.

---

## 4. Mobile Experience

### Finding 4.1 -- CRITICAL: Home page EFP Award card breaks on mobile [P0]
The EFP Award card on the Home page uses a hard-coded `gridTemplateColumns: "1fr 1fr"` (Home.tsx:318). On screens below ~768px, this forces the ceremony photo and content side-by-side, making both columns extremely narrow and the text unreadable.

**Recommendation:**
- Replace the inline `gridTemplateColumns: "1fr 1fr"` with a Tailwind responsive class: `grid grid-cols-1 md:grid-cols-2`.
- File: `client/src/pages/Home.tsx`, line 318.

### Finding 4.2 -- CRITICAL: Home page bento feature grid breaks on mobile [P0]
The features bento grid uses `gridTemplateColumns: "repeat(3, 1fr)"` (Home.tsx:375). On mobile, this creates three extremely narrow columns. The `span 2` cards will overflow or compress into illegibility.

**Recommendation:**
- Change to a responsive pattern: `grid grid-cols-1 md:grid-cols-3` and adjust the `span` values to be responsive (e.g., `gridColumn` should be `span 1` on mobile, `span 2` on desktop).
- File: `client/src/pages/Home.tsx`, line 375 and line 382.

### Finding 4.3 -- CRITICAL: Home page "How It Works" three-column grid breaks on mobile [P0]
The How It Works section uses `gridTemplateColumns: "repeat(3, 1fr)"` (Home.tsx:417) with `paddingTop: item.offsetY` for visual wave effect. On mobile, three columns are unusable and the offset creates bizarre spacing.

**Recommendation:**
- Use `grid grid-cols-1 md:grid-cols-3` and conditionally remove the `offsetY` padding on mobile (the CSS class `.step-offset` exists in index.css:1033 for this purpose but is not applied).
- File: `client/src/pages/Home.tsx`, line 417 and line 432.

### Finding 4.4 -- CRITICAL: Home page team grid breaks on mobile [P0]
The team section uses `gridTemplateColumns: "repeat(3, 1fr)"` (Home.tsx:481). On mobile, three team cards side by side are unreadable.

**Recommendation:**
- Replace with `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5` (matching the About page's pattern at About.tsx:217).
- File: `client/src/pages/Home.tsx`, line 481.

### Finding 4.5 -- The `useIsMobile` hook is NOT used in any page or core component [P2]
The `useIsMobile` hook exists at `client/src/hooks/useMobile.tsx` but is only imported by `client/src/components/ui/sidebar.tsx` (a shadcn/ui component not used on any page). All actual responsive behavior relies on CSS media queries and Tailwind breakpoint classes.

This is fine architecturally (CSS-first responsive is correct), but the hard-coded inline `gridTemplateColumns` values throughout Home.tsx bypass Tailwind and have no responsive fallback. The Findings 4.1-4.4 above are a direct consequence.

### Finding 4.6 -- Mobile drawer has no "Contact" or "Pricing" links [P2]
The mobile drawer renders the same `NAV_LINKS` array as the desktop nav (Navbar.tsx:149). Since Contact and Pricing are missing from this array, mobile users have no way to reach these pages except through the footer.

**Recommendation:**
- When Contact and Pricing are added to `NAV_LINKS` (per Findings 3.2 and 2.3), they will automatically appear in the mobile drawer.

### Finding 4.7 -- SVG wave in "How It Works" section invisible on mobile [P3]
The decorative SVG path connecting the three circles (Home.tsx:413-414) has a fixed `viewBox="0 0 900 200"` with coordinates designed for desktop width. On mobile where the grid stacks vertically, this path becomes invisible or misaligned.

**Recommendation:**
- Hide the SVG on mobile with a `className="hidden md:block"`.
- File: `client/src/pages/Home.tsx`, line 413.

---

## 5. CTA Placement

### Finding 5.1 -- Not every page has a CTA above the fold [P1]

| Page | CTA Above Fold? | Notes |
|------|:---:|-------|
| Home (`/`) | YES | "Join the Waitlist" + "For Clinicians" in hero |
| Features (`/features`) | YES | "Join the Waitlist" + "For Dentists" in hero |
| For Dentists (`/for-dentists`) | YES | "Join as a Founding Clinic" + "See All Features" |
| Pricing (`/pricing`) | NO | Hero has no CTA -- just headline and description. CTAs are in the plan cards below the fold |
| About (`/about`) | NO | Hero has headline and paragraph, no CTA. CTA is at the bottom of the page |
| Blog (`/blog`) | NO | Hero has headline and paragraph, no CTA |
| Blog Post (`/blog/:slug`) | NO | Hero has article metadata, no CTA |
| Contact (`/contact`) | NO | Hero has headline only; form is below fold in a separate section |
| Waitlist (`/waitlist`) | YES | Form is the primary content |
| 404 | YES | "Back to Home" button |

**Recommendation:**
- Add a compact CTA (e.g., "Join the Waitlist" pill button) to the hero sections of About, Blog, Blog Post, and Pricing pages.
- About: Insert after the hero paragraph at `client/src/pages/About.tsx:128-129`.
- Blog: Insert after the hero paragraph at `client/src/pages/Blog.tsx:193-195`.
- Pricing: Insert a CTA row in the hero after the body text at `client/src/pages/Pricing.tsx:110-111`.

### Finding 5.2 -- Waitlist signup is the primary conversion action but has no sticky/floating CTA [P2]
Users who scroll deep into long pages (Home, Features, For Dentists) may lose sight of the waitlist CTA. There is no sticky header CTA or floating action button on mobile.

**Recommendation:**
- The desktop navbar already has "Join Waitlist" in the header (Navbar.tsx:92-96), which is good. However, this button has `className="btn-primary hide-mobile"` -- it is hidden on mobile.
- On mobile, the only CTA access is via the hamburger menu. Consider adding a small sticky "Join Waitlist" pill at the bottom of the screen on mobile, or making the navbar CTA visible on mobile.
- File: `client/src/components/Navbar.tsx`, line 93.

---

## 6. Trust Signals Above the Fold

### Finding 6.1 -- Home page trust signals are excellent [OK]
The Home hero includes:
- EFP Award badge (line 221-228)
- Dr. Anca quote with credentials (line 243-250)
- Social proof micro-bar: "30+ founding clinics -- 500+ on the waitlist -- Free for patients" (line 264-266)
- Stats: 85% Treatment Acceptance, 40% Fewer No-Shows, EFP Winner (line 269-281)

### Finding 6.2 -- Inner pages lack trust signals above the fold [P1]
Features, For Dentists, Pricing, and About pages have no trust signals in their hero sections. A visitor arriving from search, an ad, or a shared link to any of these pages will not see the EFP award, clinic count, or Dr. Anca until they navigate to the Home page.

**Recommendation:**
- Add a compact trust bar (e.g., "EFP Award Winner 2025 -- 30+ Founding Clinics -- Free for Patients") below the hero headline on Features, For Dentists, and Pricing pages.
- The For Dentists page is especially critical: dentists evaluating the product need immediate social proof.
- File locations: Features.tsx hero (~line 91), ForDentists.tsx hero (~line 97), Pricing.tsx hero (~line 109).

---

## 7. Information Architecture

### Finding 7.1 -- Page order and hierarchy is sound [OK]
The route structure follows a logical hierarchy:
- `/` -- Home (overview, value prop, all audiences)
- `/features` -- Detailed feature breakdown
- `/for-dentists` -- Dentist-specific pitch
- `/pricing` -- Plans and cost
- `/about` -- Team and story
- `/blog` -- Content marketing
- `/contact` -- Direct communication
- `/waitlist` -- Conversion endpoint

### Finding 7.2 -- Home page section order is well-designed [OK]
Hero -> Ticker -> EFP Award -> Features Preview -> How It Works -> Team -> Waitlist CTA -> Social Proof Quote -> Footer. This follows a classic conversion funnel: hook -> credibility -> features -> process -> people -> convert -> reassure.

### Finding 7.3 -- Blog has no category filtering or search [P3]
The Blog page (Blog.tsx) shows 6 articles in two groups (featured + regular). As content grows, there is no way to filter by category (Patient Education, Technology, Clinical Insight, etc.) or search.

**Recommendation:**
- Add a simple category filter row above the articles grid.
- File: `client/src/pages/Blog.tsx`, insert around line 200.

---

## 8. Friction Points / Drop-off Risks

### Finding 8.1 -- Forms do not submit to a backend [P0]
Both the Waitlist form (Waitlist.tsx:52-58) and Contact form (Contact.tsx:50-56) perform client-side validation and then simply call `setSubmitted(true)`. No data is sent to any backend, API, or third-party service (Mailchimp, Formspree, etc.). Users who "sign up" are shown a success message but their data is lost.

**This is the highest-priority finding in this audit.** Every conversion the site generates is currently discarded.

**Recommendation:**
- Integrate with a backend submission endpoint. Options: Vercel serverless function, Formspree, Mailchimp, or a simple email relay.
- Apply to all three form instances: `WaitlistForm` in Home.tsx (line 102-114), the Waitlist page form (Waitlist.tsx:129), and the Contact form (Contact.tsx:154).

### Finding 8.2 -- Blog newsletter form does not submit [P1]
The Blog page newsletter form (Blog.tsx:306-317) has a Subscribe button but no `onSubmit` handler, no form tag wrapping it, and no state management. Clicking Subscribe does nothing.

**Recommendation:**
- Wrap the newsletter input and button in a `<form>` with an `onSubmit` handler.
- File: `client/src/pages/Blog.tsx`, lines 306-317.

### Finding 8.3 -- Waitlist page defaults to "dentist" role [P2]
The Waitlist page initializes `role` as `"dentist"` (Waitlist.tsx:34). This means a patient arriving at the waitlist page sees the Dentist/Clinic card pre-selected and extra fields (Clinic name, City/Country) that don't apply to them. This creates confusion and potential abandonment.

**Recommendation:**
- Default to no pre-selection, or default to "patient" since the patient path (Home -> Features -> Waitlist) is the more common organic journey and patients far outnumber dentists.
- File: `client/src/pages/Waitlist.tsx`, line 34. Change `useState<"patient" | "dentist">("dentist")` to `useState<"patient" | "dentist">("patient")`.

### Finding 8.4 -- Home page inline waitlist form has no role context [P3]
The Home page CTA section includes a `WaitlistForm` (Home.tsx:551) that collects name, email, and a role dropdown ("I am a..."). However, the dropdown options include "Other" which provides no value for segmentation.

**Recommendation:**
- Consider removing "Other" or replacing it with "Dental Hygienist" to capture a meaningful segment.

### Finding 8.5 -- No loading state on form submissions [P2]
All forms transition instantly from "submit" to "success" state. When a backend is integrated, there will need to be a loading/submitting state to prevent double-clicks and communicate progress.

**Recommendation:**
- Add `isSubmitting` state and disable the submit button while processing.
- Apply to: Home.tsx WaitlistForm, Waitlist.tsx form, Contact.tsx form.

---

## 9. Footer

### Finding 9.1 -- Footer provides good navigation structure [OK]
Three columns (Product, Company, Legal) with clear links to all important pages. The EFP Award badge is present. Brand tagline is clear.

### Finding 9.2 -- Footer lacks a CTA or email capture [P2]
The footer has links but no direct action. A simple "Join the Waitlist" email input in the footer would capture visitors who scroll all the way down without converting.

**Recommendation:**
- Add a compact email-only waitlist form or a prominent CTA button in the footer brand column.
- File: `client/src/components/Footer.tsx`, around line 43-77.

### Finding 9.3 -- No social media links in footer [P3]
The footer shows the LinkedIn URL in the Contact page's Organization schema (Contact.tsx:80) but there are no visible social media links in the footer. For a pre-launch product building community, social links are important.

**Recommendation:**
- Add social icons (LinkedIn, Twitter/X at minimum) to the footer brand column.
- File: `client/src/components/Footer.tsx`, below the EFP badge around line 77.

---

## 10. 404 Page

### Finding 10.1 -- 404 page is functional but minimal [P3]
The NotFound page (NotFound.tsx) shows a large "404", a "Page not found" heading, an explanation, and a "Back to Home" button. This is acceptable.

**Gaps:**
- No search functionality or suggested pages.
- No Helmet meta tags (missing `<title>` and `<meta name="robots" content="noindex">`).
- Only one CTA ("Back to Home"). Could also offer "Browse Features" or "Join the Waitlist" as alternatives.

**Recommendation:**
- Add `<Helmet>` with title "Page Not Found | Perioskoup" and `<meta name="robots" content="noindex" />`.
- Add a secondary link: "or browse our Features" below the Back to Home button.
- File: `client/src/pages/NotFound.tsx`.

---

## Priority Summary

| # | Finding | Severity | Impact |
|---|---------|----------|--------|
| 8.1 | Forms do not submit to backend -- all conversions lost | **P0** | All leads lost |
| 4.1 | EFP Award card grid breaks on mobile | **P0** | Unreadable on mobile |
| 4.2 | Bento feature grid breaks on mobile | **P0** | Unreadable on mobile |
| 4.3 | How It Works grid breaks on mobile | **P0** | Unreadable on mobile |
| 4.4 | Team grid breaks on mobile | **P0** | Unreadable on mobile |
| 2.2 | For Dentists page lacks Dr. Anca / EFP authority | **P1** | Dentist conversion |
| 2.3 | No "Contact" in primary navigation | **P1** | Dentist journey friction |
| 5.1 | About, Blog, Pricing lack above-fold CTA | **P1** | Conversion on inner pages |
| 6.2 | Inner pages lack trust signals above fold | **P1** | Direct-landing conversion |
| 8.2 | Blog newsletter form non-functional | **P1** | Newsletter capture lost |
| 1.1 | Features page lacks social proof | **P2** | Patient trust on direct landing |
| 1.2 | No inline waitlist form on Features | **P2** | Extra click friction |
| 3.1 | No visual segmentation of patient/dentist paths | **P2** | Navigation clarity |
| 3.2 | Pricing not in primary nav | **P2** | Discoverability |
| 4.6 | Mobile drawer missing Contact, Pricing | **P2** | Mobile navigation |
| 5.2 | No mobile CTA (hidden on small screens) | **P2** | Mobile conversion |
| 8.3 | Waitlist defaults to "dentist" role | **P2** | Patient confusion |
| 8.5 | No loading state on form submissions | **P2** | UX polish for backend |
| 9.2 | Footer lacks CTA or email capture | **P2** | Bottom-of-page conversion |
| 4.7 | SVG wave invisible on mobile | **P3** | Visual polish |
| 7.3 | Blog has no category filtering | **P3** | Content discoverability |
| 8.4 | Home waitlist "Other" role option | **P3** | Segmentation quality |
| 9.3 | No social media links in footer | **P3** | Community building |
| 10.1 | 404 page lacks meta, suggestions | **P3** | Edge case polish |

---

## Files Referenced

| File | Key Lines |
|------|-----------|
| `client/src/App.tsx` | Routing, ScrollToTop, RouteAnnouncer |
| `client/src/components/Navbar.tsx` | Lines 12-17 (NAV_LINKS), 80-88 (desktop), 92-96 (CTA hidden on mobile), 148-168 (mobile drawer) |
| `client/src/components/Footer.tsx` | Lines 9-25 (FOOTER_LINKS), 39-77 (brand column) |
| `client/src/pages/Home.tsx` | Lines 95-168 (WaitlistForm), 221-228 (EFP badge), 264-266 (social proof), 318 (award grid), 375 (bento grid), 417 (how it works grid), 481 (team grid) |
| `client/src/pages/Features.tsx` | Lines 80-102 (hero), 137-150 (bottom CTA) |
| `client/src/pages/ForDentists.tsx` | Lines 87-110 (hero), 112-132 (stats), 169-191 (CTA) |
| `client/src/pages/Waitlist.tsx` | Line 34 (default role), 52-58 (submit handler), 94-168 (form) |
| `client/src/pages/About.tsx` | Lines 117-131 (hero -- no CTA) |
| `client/src/pages/Blog.tsx` | Lines 180-197 (hero -- no CTA), 306-317 (newsletter form) |
| `client/src/pages/Pricing.tsx` | Lines 98-113 (hero -- no CTA) |
| `client/src/pages/Contact.tsx` | Lines 50-56 (submit handler), 102-117 (hero) |
| `client/src/pages/NotFound.tsx` | Full file (no Helmet, minimal recovery) |
| `client/src/hooks/useMobile.tsx` | Full file (unused in pages) |
| `client/src/index.css` | Lines 1032-1034 (.step-offset), 1070-1072 (cursor hidden on mobile) |
