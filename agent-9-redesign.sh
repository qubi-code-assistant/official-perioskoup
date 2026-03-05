#!/bin/bash
cd ~/Projects/official-perioskoup

# Copy photos from the perioskouplandingdoctor project
cp -n ~/Projects/perioskoup-landing-vercel/public/*.webp public/ 2>/dev/null
cp -n ~/Projects/perioskoup-landing-vercel/public/*.png public/ 2>/dev/null
cp -n ~/Projects/perioskoup-landing-vercel/public/*.svg public/ 2>/dev/null

# Build design context from skills + reference
cat \
  ~/.openclaw/workspace/skills/superdesign/SKILL.md \
  ~/.openclaw/workspace/skills/awwwards-design/SKILL.md \
  ~/.openclaw/workspace/skills/animations/SKILL.md \
  ~/.openclaw/workspace/skills/accessibility/SKILL.md \
  design-reference/titanium_pro_prd.html \
  design-reference/stitch/hero_section/code.html \
  design-reference/stitch/comparison_section/code.html \
  design-reference/stitch/bento_features/code.html \
  design-reference/stitch/authority_proof/code.html \
  design-reference/stitch/workflow_section/code.html \
  design-reference/stitch/knowledge_hub/code.html \
  design-reference/stitch/footer_waitlist/code.html \
  > /tmp/perioskoup-design-context.md

cat /tmp/perioskoup-design-context.md - << 'PROMPT' | claude --dangerously-skip-permissions
Read CLAUDE.md first.

You have been given:
1. Four design skill guides (frontend-design, awwwards-design, animations, accessibility)
2. A full PRD (titanium_pro_prd.html) with exact design system, color palette, typography, and section specs
3. Seven section HTML references (hero, comparison, bento features, authority proof, workflow, knowledge hub, footer/waitlist)

Also study the screenshot PNGs in design-reference/stitch/*/screen.png — open each one to understand the exact visual layout.

YOUR TASK: Redesign the existing Perioskoup website to match this new Titanium Pro design direction.

CRITICAL — PRESERVE THESE EXACTLY:
- ALL existing pages and routes: /, /about, /blog/*, /contact, /features, /for-dentists, /pricing, /privacy, /terms, /waitlist
- ALL existing content, copy, blog posts, SEO metadata, JSON-LD schemas, sitemap, robots.txt, llms.txt, feed.xml
- The PRICING PAGE blur effect — pricing cards stay blurred with the beta overlay. Match the new design tokens but keep the blur-[6px] + beta badge + 'Join founding clinics' CTA
- ALL existing images in public/ — team photos (team/*.webp), app screens (app-screens/*.webp), award_ceremony.webp, logos
- Navigation structure: Features, For Dentists, Pricing, Blog, About + lime Join Waitlist CTA
- The waitlist form functionality and Supabase/API integration
- Footer structure with social links
- Mobile hamburger menu

DESIGN DIRECTION:
- Use the exact design tokens from the PRD: #C0E57A lime, #0A171E navy, #1D3449 surface, #F5F9EA text, #8C9C8C muted
- Typography: Dongle Bold for display headings, Gabarito for body/UI (NEVER set fontWeight on Dongle — it only has Bold)
- Apple Maximalist: massive scale, immersive cropping, bento grids, quiet luxury, old money tech
- Glassmorphism is OUT — solid opaque #1D3449 surfaces only
- Corner radius: 32px large containers, 16px inner elements
- Deep diffused ambient shadows, no hard drop shadows
- Section spacing: 160px between sections
- Scroll-triggered reveal animations, smooth transitions, hover states with scale/glow
- WCAG 2.1 AA compliant: contrast ratios, focus management, keyboard nav

PHOTOS: Images from the perioskouplandingdoctor project are in public/. Use app_image.webp, app_image-mobile.webp, award_ceremony.webp, and any other available assets. For the hero section, use the app screen images at massive scale as shown in the reference.

APPROACH:
1. First read the full current codebase (src/app, src/components, tailwind config, globals.css)
2. Update Tailwind config and globals.css with new design tokens
3. Update layout.tsx (fonts, nav, footer) to match new design system
4. Redesign homepage sections to match references: hero, comparison, bento features, authority/proof, workflow, knowledge hub, footer CTA
5. Update all sub-pages (about, features, for-dentists, pricing, blog, contact, etc.) to use new design system consistently
6. Ensure all animations and interactions match the reference
7. Test build passes: npm run build
PROMPT
