#!/bin/bash
cd ~/Projects/official-perioskoup

# Copy photos from the perioskouplandingdoctor project
cp -n ~/Projects/perioskoup-landing-vercel/public/*.webp public/ 2>/dev/null
cp -n ~/Projects/perioskoup-landing-vercel/public/*.png public/ 2>/dev/null
cp -n ~/Projects/perioskoup-landing-vercel/public/*.svg public/ 2>/dev/null

# Build full prompt file
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
  > /tmp/perioskoup-prompt.md

cat >> /tmp/perioskoup-prompt.md << 'INSTRUCTIONS'

---

Read CLAUDE.md first. Study the screenshot PNGs in design-reference/stitch/*/screen.png.

YOUR TASK: Redesign the Perioskoup website to match this Titanium Pro design.

PRESERVE: All routes, content, blog posts, SEO, pricing blur effect, waitlist integration, nav structure, images.

DESIGN: #C0E57A lime, #0A171E navy, #1D3449 surface, #F5F9EA text, #8C9C8C muted. Dongle Bold display, Gabarito body. 32px/16px radius. 160px section spacing. Solid surfaces (no glass). Deep ambient shadows. Scroll animations. WCAG AA. Mobile responsive.

Work section by section. Run npm run build when done.
INSTRUCTIONS

cat /tmp/perioskoup-prompt.md | claude --dangerously-skip-permissions
