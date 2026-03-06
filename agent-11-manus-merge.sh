#!/bin/bash
cd ~/Projects/official-perioskoup

# Build context: manus reference + design skills
cat \
  manus-reference/client/src/pages/Home.tsx \
  manus-reference/client/src/pages/Features.tsx \
  manus-reference/client/src/pages/ForDentists.tsx \
  manus-reference/client/src/pages/About.tsx \
  manus-reference/client/src/pages/Pricing.tsx \
  manus-reference/client/src/pages/Blog.tsx \
  manus-reference/client/src/pages/Contact.tsx \
  manus-reference/client/src/pages/Waitlist.tsx \
  manus-reference/client/src/components/Navbar.tsx \
  manus-reference/client/src/components/Footer.tsx \
  manus-reference/client/src/index.css \
  ~/.openclaw/workspace/skills/superdesign/SKILL.md \
  ~/.openclaw/workspace/skills/awwwards-design/SKILL.md \
  ~/.openclaw/workspace/skills/animations/SKILL.md \
  > /tmp/manus-merge-context.md

cat >> /tmp/manus-merge-context.md << 'INSTRUCTIONS'

---

Read CLAUDE.md first.

You have been given the MANUS AI reference build (React/Vite) for Perioskoup, plus design skill guides. Your job is to UPGRADE our existing Next.js website by extracting the best elements from the Manus build.

STUDY the Manus reference carefully. Extract and adapt:

1. **Visual design patterns** — layout structures, spacing, visual hierarchy, card designs, gradient usage, any premium touches
2. **Animations & interactions** — scroll animations, hover effects, transitions, entrance animations, any micro-interactions
3. **Section layouts** — how they structured hero, features, comparison, workflow, team, pricing, blog, footer, CTA sections
4. **Typography treatment** — heading sizes, text spacing, emphasis patterns
5. **Component polish** — buttons, badges, cards, forms, navbars — take any design detail that's better than what we have
6. **Mobile patterns** — responsive breakpoints, mobile-specific layouts

DO NOT:
- Replace our content/copy — keep all existing text, blog posts, SEO metadata, routes
- Change the tech stack — we're Next.js App Router, not Vite/React Router
- Remove existing functionality (waitlist form, pricing blur, blog, etc.)
- Import Manus components directly — adapt their visual approach into our Tailwind classes

DO:
- Upgrade our existing components to match the Manus visual quality
- Port over any CSS animations, keyframes, or interaction patterns that are better
- Fix the nav/footer to match if Manus has a better version
- Improve all sub-pages (features, for-dentists, about, pricing, blog, contact, waitlist, privacy, terms) to be consistent and polished
- Make the bento feature cards look as good as whatever Manus did
- Ensure scroll animations are smooth and consistent
- Fix the hero section to be dramatic and impactful
- Fix mobile responsiveness throughout
- Ensure the pricing page keeps the blur effect with beta overlay
- Keep all images: team photos, app screenshots, award ceremony, logos
- Test: npm run build must pass with zero errors

APPROACH:
1. Read ALL current source (src/app/*, src/components/*, globals.css, tailwind config)
2. Read ALL Manus reference files (already provided above)
3. Identify what's better in Manus for each section
4. Systematically upgrade each file, section by section
5. Start with globals.css + layout (nav/footer), then homepage, then sub-pages
6. Run npm run build at the end
INSTRUCTIONS

cat /tmp/manus-merge-context.md | claude --dangerously-skip-permissions
