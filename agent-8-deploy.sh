#!/bin/bash
cd ~/Projects/official-perioskoup
cat << 'PROMPT' | claude --dangerously-skip-permissions
Read CLAUDE.md. Final checks: 1) npm run build must pass with zero errors 2) Grep src/ for banned SaMD words (compliance, diagnose, treat, 'monitor inflammation') — must return zero 3) Take full-page screenshots at 1440px into screenshots/ dir for /, /features, /for-dentists, /pricing, /about, /blog, /contact, /waitlist 4) git add -A && git commit -m 'feat: Perioskoup official website' && git push origin main
PROMPT
