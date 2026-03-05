#!/bin/bash
cd ~/Projects/official-perioskoup
cat << 'PROMPT' | claude --dangerously-skip-permissions
Read CLAUDE.md. Build inner pages: 1) /features — Patient App + Dentist Dashboard + AI Companion sections with SoftwareApplication+FAQPage schema 2) /for-dentists — 'How much time are you losing?' hook, ROI stats, 3 benefit cards, waitlist CTA 3) /pricing — 3 tiers (Starter €49, Professional €99 Most Popular, Enterprise Custom) BLURRED behind blur-[6px] with beta overlay 4) /about — team photos (public/team/*.webp) + bios + Physician schema for Dr. Anca + company values 5) /contact — form 6) /waitlist — signup form 7) /privacy + /terms placeholders. All pages: BreadcrumbList schema, unique OG meta, dark theme.
PROMPT
