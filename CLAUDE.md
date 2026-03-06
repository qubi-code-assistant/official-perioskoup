# Perioskoup Landing Page

## Project
Perioskoup — AI dental companion landing page. Vite + React + Tailwind CSS SPA.

## Stack
- **Framework:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (via @tailwindcss/vite plugin)
- **Routing:** Wouter (client-side SPA)
- **UI Components:** Radix UI primitives + shadcn/ui
- **Package Manager:** pnpm

## Structure
- `client/` — frontend source (Vite root)
  - `client/src/pages/` — route pages (Home, Features, ForDentists, Blog, BlogPost, etc.)
  - `client/src/components/` — shared components (Navbar, Footer, Logo, PhoneMockup, etc.)
  - `client/src/components/ui/` — shadcn/ui primitives
  - `client/public/` — static assets (robots.txt, sitemap.xml, llms.txt, feed.xml, manifest.json)
- `server/` — Express server (dev only, not used on Vercel)
- `shared/` — shared constants

## Commands
- `pnpm dev` — start dev server
- `pnpm build` — production build to dist/public
- `pnpm check` — TypeScript check

## Brand
- Background: #0A171E (deep navy)
- Surface: #1D3449 (slate blue)
- Accent/CTA: #C0E57A (lime green)
- Text: #F5F9EA (off-white)
- Fonts: Dongle (headings), Gabarito (body)

## Deployment
- Vercel SPA deployment
- Output: dist/public
- All routes rewrite to index.html (client-side routing)
- Domain: perioskoup.com

## Rules
- Never use "compliance", "diagnose", "treat", "cure" — Perioskoup is a wellness tool, not a medical device
- Pricing section stays blurred with beta overlay
- Dr. Anca's EFP Award quote must always be prominent
- foundingDate = 2025 (Romanian SRL incorporated June 2025)
