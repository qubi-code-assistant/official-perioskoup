# CLAUDE.md — official-perioskoup

Apple-quality website for Perioskoup, an AI dental companion. Dentist-focused B2B SaaS.
Pre-revenue, 30-clinic waitlist, March 2026 launch. Primary market: Romania (English content covers UK/EU).

## Stack
Next.js 14 App Router · Tailwind CSS v4 · GSAP + ScrollTrigger · Motion.dev · MDX blog · Vercel

## Commands
```
npm run dev          # localhost:3000
npm run build        # production
npm run test         # e2e + visual regression
npm run test:e2e     # playwright e2e
npm run test:visual  # playwright visual regression
```

## Design System — LOCKED
```
Background:  #0A171E    Surface:    #1D3449    Accent/CTA: #C0E57A
Text:        #F5F9EA    Secondary:  #8C9C8C    Border:     #234966
Primary:     #3578AA
```

### Full Tailwind @theme scales
```css
--color-lime-50:#f5f9ea --color-lime-100:#f3fcde --color-lime-200:#eeffcc
--color-lime-300:#e0ffab --color-lime-400:#c0e57a --color-lime-500:#8ad33d
--color-lime-600:#6faa29 --color-lime-700:#5a8c20 --color-lime-800:#466d18 --color-lime-900:#345210

--color-navy-50:#e8eef4 --color-navy-100:#c5d4e3 --color-navy-200:#9db5ce
--color-navy-300:#7596b8 --color-navy-400:#5580a6 --color-navy-500:#3578aa
--color-navy-600:#2f5f84 --color-navy-700:#234966 --color-navy-800:#1d3449
--color-navy-900:#12222d --color-navy-950:#0a171e
```

### Motion tokens
```css
--duration-fast:200ms --duration-medium:400ms --duration-slow:600ms
--ease-out:cubic-bezier(0.16,1,0.3,1) --ease-spring:cubic-bezier(0.34,1.56,0.64,1)
--stagger-fast:50ms --stagger-medium:100ms
```

### Fonts
- Headings: `Dongle-Bold` via next/font — **NEVER use fontWeight on Dongle**
- Body: `Gabarito` via next/font — display: swap
- Heading sizes 30-40% larger than normal

## Pages
| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero + Dr. Anca quote + comparison + features + social proof + waitlist CTA |
| `/features` | Patient App, Dentist Dashboard, AI Companion detail |
| `/for-dentists` | B2B landing — ROI stats, benefits, waitlist |
| `/pricing` | 3 tiers BLURRED behind "We're in Beta" overlay |
| `/about` | Team + story + values + EFP award |
| `/blog` | MDX blog grid with category filters |
| `/blog/[slug]` | Individual post with FAQ schema + author |
| `/contact` | Contact form |
| `/waitlist` | Dedicated signup form |
| `/privacy` `/terms` | Legal pages |
| `/llms.txt` | Factual AI crawler overview — NO marketing fluff |
| `/feed.xml` | RSS feed |

## Pricing (BLURRED — replicate exactly behind blur-[6px])
1. **Starter** €49/mo — 50 patients, Basic AI guidance, Email support
2. **Professional** €99/mo (Most Popular) — 200 patients, Advanced AI insights, Priority support, Custom branding
3. **Enterprise** Custom — Unlimited patients, API access, multi-location
Overlay: "We're in Beta" + "Join our founding clinics for lifetime early-adopter pricing" + CTA

## Team (photos in public/team/)
- **Dr. Anca Laura Constantin** — Periodontist & CEO · `team-anca.webp` · linkedin.com/in/anca-constantin-99800633b/
- **Eduard Ciugulea** — CGO & Technical Co-Founder · `team-eduard.webp` · linkedin.com/in/eduard-ciugulea/
- **Petrica Nancu** — CTO & Head of AI · `team-petrica.webp` · linkedin.com/in/petrica-nancu-b16468241/

## Brand Quote (MUST appear on homepage hero)
> "Perioskoup was born out of two big challenges that we face in practice: a shortage of time and the lack of patient adherence to treatment, which leads to poor outcomes."
> — Dr. Anca Constantin, Co-Founder & Periodontist | EFP Digital Innovation Award Winner 2025

## Values
Clinician-First · Privacy-First (GDPR from day one) · Outcome-Focused

## Social
LinkedIn: /company/perioskoup · Instagram: /perioskoup · X: /perioskoup

## SEO
- Schema (in order): MedicalOrganization, Physician, SoftwareApplication, FAQPage, Article, BreadcrumbList
- hreflang: en-GB primary, en default
- robots.txt: allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- /llms.txt: factual markdown for AI crawlers
- Every page: unique title + description, OG + Twitter cards, canonical URL
- Every blog post: 3+ stats with sources, FAQ schema, answer capsules after H2s, 3+ internal links
- Core Web Vitals: LCP<2.5s, FID<100ms, CLS<0.1

## Target Keywords
| Keyword | KD |
|---------|-----|
| AI dental companion app | 5 |
| between-visit patient engagement dentistry | 2 |
| dental habit tracking app | 10 |
| dental patient engagement software | 10 |
| periodontal maintenance at home | 30 |
| periodontal patient engagement tools | 8 |

## SaMD Compliance — CRITICAL
Perioskoup is wellness/engagement, NOT a medical device. Use SAFE language only.

✅ SAFE: habit tracking, engagement, educational content, reminders, routine tracking, connection
✕ BANNED: diagnose, detect, treat, cure, manage [disease], monitor inflammation, track bleeding, compliance, adherence, clinical guidance, therapeutic

| ✕ Never say | ✓ Say instead |
|-------------|---------------|
| dental patient compliance software | dental patient engagement platform |
| track gum health | build healthy gum habits |
| manage your gum disease | support your daily oral care routine |
| monitor inflammation | stay consistent with your routine |
| adherence dashboard | visibility into engagement patterns |
| extending your care | extending your connection with patients |

## Homepage Structure (Apple scroll storytelling)
1. Hero — Dr. Anca quote + floating app screenshot + parallax + waitlist CTA
2. Problem/Solution — "A Week in Two Practices" with/without comparison cards
3. Features — 4 features with scroll-triggered reveals
4. Social Proof — EFP Award + 30-clinic counter + credentials
5. How It Works — 3 animated steps
6. Blog Preview — 3 latest posts
7. Final CTA — Waitlist form

## DO NOT
- Override design system colors
- Use fontWeight on Dongle
- Show pricing clearly (keep blurred)
- Use `en-EU` as hreflang
- Put marketing fluff in llms.txt
- Autoplay video on mobile
- Use lorem ipsum — all copy must be real
- Use "compliance", "diagnose", "treat" in user-facing copy
