#!/bin/bash
cd ~/Projects/official-perioskoup
cat << 'PROMPT' | claude --dangerously-skip-permissions
Read CLAUDE.md first. Set up: 1) src/constants/colors.ts, typography.ts, spacing.ts with exact design tokens 2) Tailwind config with full lime+navy @theme scales 3) Dongle-Bold + Gabarito via next/font (NEVER fontWeight on Dongle) 4) Global layout src/app/layout.tsx: dark #0A171E bg, responsive nav with logo + Features/For Dentists/Pricing/Blog/About links + lime Join Waitlist CTA, mobile hamburger, footer with social links, skip-to-content 5) src/lib/schema.ts: JSON-LD generators for MedicalOrganization, Physician, SoftwareApplication, FAQPage, Article, BreadcrumbList 6) /llms.txt API route with factual markdown 7) robots.txt allowing all AI crawlers 8) next-sitemap config 9) OG+Twitter metadata defaults. Apple-level whitespace everywhere.
PROMPT
