#!/bin/bash
cd ~/Projects/official-perioskoup
cat << 'PROMPT' | claude --dangerously-skip-permissions
Read CLAUDE.md. SEO+Performance audit: 1) Verify unique title+description per page 2) Validate all JSON-LD schema 3) OG+Twitter cards on every page 4) Canonical URLs + hreflang en-GB 5) Verify robots.txt, sitemap.xml, /llms.txt 6) next/image everywhere with priority on hero 7) Lazy load below-fold 8) Font display swap 9) Dynamic import GSAP ScrollTrigger 10) First load JS < 200KB target. Fix any issues found.
PROMPT
