# Perioskoup Landing Page

## Project
Perioskoup — AI dental companion landing page. Vite + React + Tailwind CSS SPA.

## Stack
- **Framework:** Vite 7 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Routing:** Wouter (client-side SPA)
- **UI Components:** Radix UI primitives + shadcn/ui
- **Package Manager:** pnpm

## Structure
- `client/` — frontend source (Vite root)
  - `client/src/pages/` — route pages (Home, Features, ForDentists, Blog, BlogPost, etc.)
  - `client/src/components/` — shared components (Navbar, Footer, Logo, PhoneMockup, etc.)
  - `client/src/components/ui/` — shadcn/ui primitives
  - `client/public/` — static assets (robots.txt, sitemap.xml, llms.txt, feed.xml)
- `server/` — Express server (dev only, not used on Vercel)
- `shared/` — shared constants
- `.claude/agents/` — 12 specialist audit subagents

## Commands
- `pnpm dev` — start dev server
- `pnpm build` — production build to dist/public
- `pnpm check` — TypeScript check

## Brand
- Background: #0A171E (deep navy)
- Surface: #1D3449 (slate blue)
- Accent/CTA: #C0E57A (lime green)
- Text: #F5F9EA (off-white)
- Muted: #8C9C8C
- Fonts: Dongle (headings), Gabarito (body)

## Deployment
- Vercel SPA deployment
- Output: dist/public
- All routes rewrite to index.html (client-side routing)
- Live: https://official-perioskoup.vercel.app
- Domain: perioskoup.com

## Regulatory Rules
- NEVER use: "compliance", "diagnose", "treat", "cure", "adherence", "therapeutic", "clinical guidance"
- Perioskoup is a WELLNESS/ENGAGEMENT tool, NOT a medical device
- Pricing section stays blurred with beta overlay

## Business Context
- AI dental companion app — bridges gap between dental visits
- Romanian SRL, incorporated June 2025, bootstrapped, pre-revenue
- 30-clinic waitlist, public launch
- EFP Digital Innovation Award 2025 — 3rd Prize (EuroPerio11, Vienna)
- Founders: Dr. Anca Constantin (CEO & Co-founder, Periodontist), Eduard Ciugulea (Co-founder & CGO), Petrica Nancu (CTO & Head of AI)
- Revenue: Dentists pay (€39-199/mo), Patients FREE
- "AI dental companion" = zero search competition = category creation opportunity

## Available Skills (in ~/.openclaw/workspace/skills/)
These skills contain best practices and frameworks that audit agents should read:
- `seo/SKILL.md` — SEO site audit + content writing + competitor analysis
- `pls-seo-audit/SKILL.md` — Detailed SEO audit checklist
- `schema-markup-generator/SKILL.md` — JSON-LD schema markup generation
- `landing-page-roast/SKILL.md` — Landing page conversion audit
- `ui-ux-design/SKILL.md` — UI/UX design guidelines
- `responsive-design/SKILL.md` — Mobile responsive design
- `mobile/SKILL.md` — Mobile best practices
- `animations/SKILL.md` — Web animation best practices
- `awwwards-design/SKILL.md` — Award-winning design patterns
- `accessibility/SKILL.md` — WCAG accessibility
- `wcag-21-aa-web-ui-audit/SKILL.md` — WCAG 2.1 AA audit framework
- `frontend-performance/SKILL.md` — Frontend performance optimization
- `e2e-testing-patterns/SKILL.md` — E2E testing with Playwright

<!-- ooo:START -->
<!-- ooo:VERSION:0.14.0 -->
# Ouroboros — Specification-First AI Development

> Before telling AI what to build, define what should be built.
> As Socrates asked 2,500 years ago — "What do you truly know?"
> Ouroboros turns that question into an evolutionary AI workflow engine.

Most AI coding fails at the input, not the output. Ouroboros fixes this by
**exposing hidden assumptions before any code is written**.

1. **Socratic Clarity** — Question until ambiguity ≤ 0.2
2. **Ontological Precision** — Solve the root problem, not symptoms
3. **Evolutionary Loops** — Each evaluation cycle feeds back into better specs

```
Interview → Seed → Execute → Evaluate
    ↑                           ↓
    └─── Evolutionary Loop ─────┘
```

## ooo Commands

Each command loads its agent/MCP on-demand. Details in each skill file.

| Command | Loads |
|---------|-------|
| `ooo` | — |
| `ooo interview` | `ouroboros:socratic-interviewer` |
| `ooo seed` | `ouroboros:seed-architect` |
| `ooo run` | MCP required |
| `ooo evolve` | MCP: `evolve_step` |
| `ooo evaluate` | `ouroboros:evaluator` |
| `ooo unstuck` | `ouroboros:{persona}` |
| `ooo status` | MCP: `session_status` |
| `ooo setup` | — |
| `ooo help` | — |

## Agents

Loaded on-demand — not preloaded.

**Core**: socratic-interviewer, ontologist, seed-architect, evaluator,
wonder, reflect, advocate, contrarian, judge
**Support**: hacker, simplifier, researcher, architect
<!-- ooo:END -->
