#!/bin/bash
# ============================================================================
# PERIOSKOUP DEEP AUDIT — 12 Parallel Subagents
# ============================================================================
# 
# HOW TO RUN:
#   cd ~/Projects/official-perioskoup
#   claude --dangerously-skip-permissions
#
# Then paste the prompt below.
# ============================================================================

set -e
mkdir -p audit-results

echo "🏛️ Perioskoup Deep Audit"
echo "========================"
echo ""
echo "12 specialist subagents configured in .claude/agents/"
echo ""
ls .claude/agents/*.md | while read f; do
  name=$(basename "$f" .md)
  echo "  🔹 $name"
done
echo ""
echo "Skills loaded from ~/.openclaw/workspace/skills/"
echo ""
echo "Ready. Open Claude Code and paste the prompt below."
echo ""
echo "============================================================"
cat << 'PROMPT'

PASTE THIS INTO CLAUDE CODE:
─────────────────────────────

You have 12 specialist subagents in .claude/agents/. Deploy ALL of them IN PARALLEL to audit this website. Each agent has its own skills, scope, and output file.

Instructions:
1. Create `audit-results/` directory
2. Dispatch ALL 12 subagents simultaneously:
   - seo-auditor → audit-results/01-seo-technical.md
   - geo-auditor → audit-results/02-geo-readiness.md
   - content-auditor → audit-results/03-content-quality.md
   - conversion-auditor → audit-results/04-conversion-ux.md
   - mobile-auditor → audit-results/05-mobile-responsive.md
   - competitive-auditor → audit-results/06-competitive-positioning.md
   - team-auditor → audit-results/07-about-team.md
   - animation-auditor → audit-results/08-animations-visual.md
   - performance-auditor → audit-results/09-code-performance.md
   - a11y-auditor → audit-results/10-accessibility.md
   - niche-strategist → audit-results/11-niche-domination.md
   - test-auditor → audit-results/12-testing-reliability.md

3. Each agent must:
   - Read its assigned skill files first
   - Read ALL relevant source files (not just sample)
   - Check the live site at https://official-perioskoup.vercel.app
   - Provide a score (1-10)
   - Give SPECIFIC, ACTIONABLE fixes with code examples
   - Be thorough — no generic advice

4. After ALL 12 complete, synthesize into `audit-results/FINAL-AUDIT.md`:
   - Overall score (1-100) with per-audit breakdown
   - TOP 15 highest-impact improvements (ranked by impact ÷ effort)
   - QUICK WINS (< 1 hour, with exact code)
   - MEDIUM EFFORT (1-5 hours, with approach)
   - STRATEGIC PLAYS (1-5 days, with scope)
   - MOBILE-SPECIFIC FIXES (every responsive issue + Tailwind fix)
   - COMPLETE SCHEMA FIXES (corrected JSON-LD per page)
   - 2-WEEK SPRINT PLAN (day by day)
   - "If You Only Do 3 Things" — highest leverage moves

Go. Deploy all 12 agents now.

PROMPT
echo "============================================================"
