#!/bin/bash
cd ~/Projects/official-perioskoup
cat << 'PROMPT' | claude --dangerously-skip-permissions
Read CLAUDE.md. Do NOT read any .webp or image files — just reference their paths. Build src/app/page.tsx — Apple scroll storytelling homepage: 1) Hero: Dr. Anca EFP quote in large Dongle typography + floating app screenshot (public/app-screens/app_image.webp) with GSAP parallax + lime CTA 'Join the Waitlist' + 'Free for early adopters' 2) Problem/Solution: 'A Week in Two Practices' without/with cards, scroll reveals, stats (15min saved, 40% fewer no-shows, 92% engagement, 3x habits) 3) 4 Features with staggered scroll animation (AI Companion, Habit Tracking, Dentist Dashboard, Smart Reminders) 4) Social Proof: EFP Award (public/award_ceremony.webp), animated 30-clinic counter, Dr. Anca credentials 5) How It Works: 3 steps animated 6) Blog Preview: 3 cards 7) Waitlist form (Name, Email, Clinic, Country, Role). All GSAP must check prefers-reduced-motion. SaMD-safe language only.
PROMPT
