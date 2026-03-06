# Perioskoup Website Audit Fix Agent

## SKILLS TO LOAD FIRST
Before starting, read these skill files for reference:
- ~/.openclaw/workspace/skills/schema-markup-generator/SKILL.md
- ~/.openclaw/workspace/skills/seo/SKILL.md
- ~/.openclaw/workspace/skills/responsive-design/SKILL.md
- ~/.openclaw/workspace/skills/accessibility/SKILL.md
- ~/.openclaw/workspace/skills/superdesign/SKILL.md

## CONTEXT
You are fixing the Perioskoup website based on a comprehensive 80-finding audit.
- Site: https://perioskoup.com
- Stack: Vite 7 + React 19 + Tailwind CSS v4 (SPA on Vercel)
- Full audit: audit/reports/FULL-AUDIT-BREAKDOWN.md
- Strategy: audit/strategy-reference.md

## EXCLUSIONS — DO NOT TOUCH
- **Forms/backend** — do NOT add form submission logic (Formspree, serverless, etc.)
- **Testimonials** — do NOT add fake testimonials or placeholder quotes
- **Statistics/numbers** — do NOT change existing stats or add new ones. Keep "digital health research" attribution as-is
- **ORCID / Google Scholar** — do NOT add placeholder URLs. Leave sameAs arrays as they are for Dr. Anca
- **Dr. Anca's quote** — keep "engagement" wording, do NOT change to "adherence"

## WHAT TO FIX (in order)

### Phase 1: Mobile Grid Fixes (P0)
1. `Home.tsx:318` — EFP Award grid: change inline `gridTemplateColumns: "1fr 1fr"` to responsive Tailwind `grid grid-cols-1 md:grid-cols-2`
2. `Home.tsx:375` — Bento feature grid: change `repeat(3, 1fr)` to `grid grid-cols-1 md:grid-cols-3`, fix `span 2` cards to be responsive
3. `Home.tsx:417` — How It Works grid: change `repeat(3, 1fr)` to `grid grid-cols-1 md:grid-cols-3`, remove `offsetY` on mobile
4. `Home.tsx:481` — Team grid: change `repeat(3, 1fr)` to `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
5. `Home.tsx:413` — SVG wave: add `hidden md:block`

### Phase 2: Technical SEO
6. All pages in `client/src/pages/` — Add to every Helmet:
   - `<meta property="og:image" content="https://perioskoup.com/images/og-image.jpg" />`
   - `<meta name="twitter:card" content="summary_large_image" />`
   - `<meta name="twitter:image" content="https://perioskoup.com/images/og-image.jpg" />`
   - Per-page hreflang: `<link rel="alternate" hreflang="en" href="https://perioskoup.com{current_path}" />`
7. `index.html` — Fix all relative image URLs in JSON-LD to absolute (prefix `https://perioskoup.com`):
   - Line ~92: logo url
   - Line ~127: person image
   - Any other relative URLs in JSON-LD
8. `About.tsx` — Fix relative image URLs in JSON-LD
9. `BlogPost.tsx` — Fix relative image URLs in JSON-LD
10. `NotFound.tsx` — Add Helmet with title, noindex meta
11. `public/robots.txt` — Add: GoogleOther, CCBot, Applebot-Extended, YouBot
12. `Navbar.tsx` — Add "Contact" and "Pricing" to NAV_LINKS array

### Phase 3: Schema & Structured Data
13. `index.html` Person schema for Dr. Anca:
    - Change `"@type": "Person"` to `"@type": ["Person", "Physician"]`
    - Add `"medicalSpecialty": "Periodontology"`
    - Add `"memberOf": { "@type": "Organization", "name": "European Federation of Periodontology", "url": "https://www.efp.org" }`
14. `About.tsx` Person schema — same Physician changes as above
15. `index.html` Organization schema — add contactPoint:
    ```json
    "contactPoint": [
      { "@type": "ContactPoint", "contactType": "customer support", "email": "support@perioskoup.com" }
    ]
    ```
16. `index.html` — Remove or comment out SearchAction (blog search doesn't exist)
17. `Pricing.tsx` — Change `"@type": "Product"` to `"@type": "SoftwareApplication"` to match global schema
18. `Breadcrumb.tsx` — Add `item` URL property to last breadcrumb item
19. `Contact.tsx` — Add FAQPage schema (3 FAQs: "How do I contact Perioskoup?", "When does Perioskoup launch?", "Is Perioskoup available in my country?")
20. `Waitlist.tsx` — Add FAQPage schema (3 FAQs: "What happens after I join the waitlist?", "Is the waitlist free?", "When will I get access?")
21. `Waitlist.tsx:34` — Change default role from "dentist" to "patient"

### Phase 4: GEO & HTTP Headers
22. `vercel.json` — Expand X-Llms-Txt header source from `"/"` to `"/(.*)"` (all routes)
23. `vercel.json` — Add `X-Robots-Tag: all` header for all routes

### Phase 5: Content & Messaging
24. ALL static pages (Home, Features, ForDentists, About, Pricing) — Add answer capsules after every H2:
    - 2-3 sentence factual summary paragraph
    - Style: `className="text-gray-400 text-lg mt-2 mb-6"` or similar muted style matching the design
    - These are for AI extraction — factual, keyword-rich, concise
25. `Footer.tsx:49-51` — Change "Your personal dental companion" to "Your AI dental companion"
26. Add "AI dental companion" phrase to visible body copy on pages where it's missing: ForDentists, About, Pricing, Features, Contact
27. `Features.tsx` hero — Change "Built for the full dental journey" to something clearer like "AI dental companion features — everything between your visits, in one app"

### Phase 6: For Dentists Page Overhaul
28. `ForDentists.tsx` — Add EFP Digital Innovation Award 2025 badge in hero section
29. `ForDentists.tsx` — Add "30+ founding clinics" social proof line
30. `ForDentists.tsx` — Add Dr. Anca's quote (same as Home page, with "engagement" wording)
31. `ForDentists.tsx` — Add Dr. Anca credentials section (photo, title, Periodontist, Co-Founder)
32. `ForDentists.tsx` — Add problem-first framing: "Patients forget 80% of care instructions within 48 hours. Perioskoup translates your clinical recommendations into daily habits they actually follow."
33. `ForDentists.tsx` — Add "How It Fits Your Workflow" section (before/during/after appointment flow)
34. `ForDentists.tsx` — Add competitive positioning block: "Not another PMS plugin. Not a remote monitoring device. Perioskoup is for the behavioural side — translating recommendations into a personalised daily programme."
35. `ForDentists.tsx` — Add urgency: "Founding clinic spots are limited. Public launch: March 2026."

### Phase 7: Positioning & Category
36. `Home.tsx` — Add "What is an AI dental companion?" section after hero or after features. Define the category: "Not a chatbot. Not a PMS. Not a fitness tracker for teeth. An AI dental companion translates clinical recommendations into personalised daily habits. Perioskoup is the first."
37. `About.tsx` — Add Dr. Anca's quote (same as Home)
38. `About.tsx` — Add "Why Now?" paragraph in mission section
39. About/Blog — Add CTA above the fold ("Join the Waitlist" pill button in hero)
40. `Pricing.tsx` — Add EFP badge + "30+ founding clinics" trust signal near pricing cards
41. `Blog.tsx` — Add "Join the Waitlist" CTA between featured posts and article list
42. `Home.tsx` How It Works — Reframe steps in patient language: "Visit your dentist → Get your plan → Build daily habits with AI support"

### Phase 8: Cleanup
43. `Features.tsx` — Fix H3 before H2 heading hierarchy issue
44. `Contact.tsx` — Add subline: "Perioskoup is the AI dental companion bridging clinic and home."
45. `CM-MED-07` — Standardise "Winner" vs "3rd Prize": use "EFP Digital Innovation Award Winner 2025" consistently in visible copy, keep "3rd Prize" only in schema if that's the accurate award level

## DESIGN RULES
- Dark tech-medical premium aesthetic — keep existing color scheme
- Lime/emerald accent (#A3E635 or similar) for highlights
- No bright whites — use gray-100/200 for text on dark backgrounds
- Match existing component patterns (check nearby components for style reference)
- Mobile-first: always test responsive breakpoints
- Accessibility: proper heading hierarchy, alt tags, ARIA where needed

## VERIFICATION
After all changes, run:
```bash
npx tsc --noEmit
npm run build
```
Fix any TypeScript or build errors before finishing.

## OUTPUT
When done, write a summary to `audit/reports/FIXES-APPLIED.md` listing every change made with file:line references.
