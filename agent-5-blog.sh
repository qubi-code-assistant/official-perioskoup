#!/bin/bash
cd ~/Projects/official-perioskoup
cat << 'PROMPT' | claude --dangerously-skip-permissions
Read CLAUDE.md. Build MDX blog: 1) next-mdx-remote + gray-matter, posts in src/content/blog/*.mdx 2) /blog with category filters (Clinical, Product, Industry) + card grid + pagination 3) /blog/[slug] with author card, TOC, FAQ+Article schema, related posts, share buttons 4) 3 seed posts 800-1200 words each: 'Why AI is Changing Dental Patient Engagement' (Dr. Anca), 'How Perioskoup Helps Reduce No-Shows by 40%' (Eduard), 'The Hidden Cost of Poor Patient Habits in Periodontal Care' (Dr. Anca). SaMD-safe language, 3+ stats with sources per post 5) RSS at /feed.xml
PROMPT
