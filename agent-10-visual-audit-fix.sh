#!/bin/bash
cd ~/Projects/official-perioskoup

cat << 'PROMPT' | claude --dangerously-skip-permissions
Read CLAUDE.md first.

VISUAL AUDIT & FIX — the site is functional but has many design consistency issues. Study the design-reference/stitch/*/screen.png screenshots to see what the target looks like, then fix these problems:

## Issues to Fix

### 1. HERO SECTION
- The phone mockup is too dark/small and doesn't have the premium "massive scale" feel from the reference (design-reference/stitch/hero_section/screen.png)
- Phone should be MUCH larger, bleeding off the right edge of the viewport
- The phone tilt (-6deg) is fine but needs more dramatic scale — it should dominate the right side
- Badge should have a subtle backdrop blur
- The "Free for early adopters" text is lost — make it more visible

### 2. COMPARISON SECTION  
- Cards look plain — need more visual distinction between "Standard" (problem) and "Perioskoup" (solution) sides
- The center timeline/divider is barely visible
- Mobile: cards should stack clearly with visual separation between problem/solution pairs
- The red X and green checkmark icons are too small

### 3. BENTO FEATURES
- Cards feel flat — need the ambient glow and depth from the reference (design-reference/stitch/bento_features/screen.png)
- The AI Companion card chat UI is good but the card itself needs more presence
- Habit Tracking bars look like pills, not the clean bar chart from reference
- Dashboard card chart feels like an afterthought
- Smart Reminders card is too empty
- On mobile: bento grid should be clean single column, not squished

### 4. AUTHORITY/PROOF SECTION
- The "30+ Clinics" counter needs more drama — look at reference (design-reference/stitch/authority_proof/screen.png)
- Dr. Anca profile card needs the award ceremony image (award_ceremony.webp) displayed prominently
- Trust badges (GDPR, Encrypted, Privacy) need more visual weight

### 5. WORKFLOW STEPS
- The three circles (Scan/Analyze/Engage) are too uniform — reference shows varied sizing and a staggered layout
- Connecting line should be more prominent
- Step numbers should pop more

### 6. KNOWLEDGE HUB / BLOG
- Blog cards need featured images or gradient overlays — they're just text on dark cards right now
- Category badges need color coding
- Missing "reading time" visual element

### 7. FOOTER/WAITLIST CTA
- "Titanium access closing soon" section needs MORE urgency — bigger text, tighter spacing
- The waitlist form input styling needs to match the titanium design (rounded-full, lime accent)
- Duplicate hero content at the very bottom — this should NOT be there. The page is rendering the hero twice or something similar

### 8. GLOBAL ISSUES
- **DUPLICATE CONTENT AT BOTTOM**: The full-page screenshot shows the hero section repeating at the very bottom of the page. This is a critical bug — find and fix it.
- Font loading: make sure Dongle and Gabarito are actually loading and rendering. If they fall back to system fonts, it won't look right.
- Section transitions: add subtle gradient dividers between sections instead of hard cuts
- The overall dark navy background should have very subtle gradient variation between sections to create depth
- All hover states should feel premium — scale(1.02) with smooth shadow transitions

### 9. MOBILE (test at 390px wide)
- Navigation: verify hamburger menu works and drawer styling matches design system
- Hero: text should be left-aligned, phone mockup below (not beside) on mobile
- Bento: single column, each card with sensible min-height
- All font sizes need mobile-specific clamping
- Touch targets: all buttons/links min 44x44px

## Reference Files
- Look at EVERY screenshot: design-reference/stitch/*/screen.png
- Match the visual style, depth, and polish level shown there
- The target is Apple-level polish — quiet luxury, not generic SaaS

## Process
1. Read all current source files
2. Look at all reference screenshots
3. Fix every issue systematically
4. Run npm run build to verify
5. Make sure no content is duplicated or missing
PROMPT
