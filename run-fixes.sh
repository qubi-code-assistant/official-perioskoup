#!/bin/bash
# ============================================================================
# PERIOSKOUP FIX ARMY — 7 Implementation Agents + Re-Audit
# ============================================================================
#
# PREREQUISITES:
#   - audit-results/ must exist with all 12 audit files + FINAL-AUDIT.md
#   - You should be on a feature branch (e.g. fix/audit-v1)
#
# HOW TO RUN:
#   cd ~/Projects/official-perioskoup
#   claude --dangerously-skip-permissions
#   Then paste the prompt below.
#
# ============================================================================

set -e

echo "🏛️ Perioskoup Fix Army"
echo "======================"
echo ""

# Verify audit results exist
if [ ! -f "audit-results/FINAL-AUDIT.md" ]; then
  echo "❌ audit-results/FINAL-AUDIT.md not found!"
  echo "   Run the audit first (run-audit.sh)"
  exit 1
fi

echo "✅ Audit results found:"
ls audit-results/*.md | while read f; do echo "   $(basename $f)"; done
echo ""

echo "📋 Implementation agents:"
for agent in seo-fixer mobile-fixer content-fixer a11y-fixer animation-fixer performance-fixer test-writer; do
  if [ -f ".claude/agents/${agent}.md" ]; then
    echo "  🔧 $agent"
  fi
done
echo "  🔍 re-auditor (runs after all fixes)"
echo ""

# Check branch
BRANCH=$(git branch --show-current)
echo "🌿 Current branch: $BRANCH"
if [ "$BRANCH" = "master" ]; then
  echo "⚠️  You're on master! Create a branch first:"
  echo "   git checkout -b fix/audit-v1"
  exit 1
fi
echo ""
echo "============================================================"
cat << 'PROMPT'

PASTE THIS INTO CLAUDE CODE:
─────────────────────────────

You have 7 implementation subagents and 1 re-audit agent in .claude/agents/. Execute this in TWO PHASES:

## PHASE 1: IMPLEMENT FIXES (parallel)

Read `audit-results/FINAL-AUDIT.md` first to understand priorities. Then dispatch ALL 7 fixer agents IN PARALLEL:

1. **seo-fixer** — reads 01-seo-technical.md + 02-geo-readiness.md → fixes canonicals, schemas, sitemap, robots, FAQPage, Person schema, heading hierarchy, answer capsules
2. **mobile-fixer** — reads 05-mobile-responsive.md → fixes all responsive breakpoints, font sizes, grids, touch targets, overflow
3. **content-fixer** — reads 03-content-quality.md + 04-conversion-ux.md + 07-about-team.md → fixes regulatory language, titles, CTAs, trust signals
4. **a11y-fixer** — reads 10-accessibility.md → fixes ARIA, contrast, focus, skip links, alt text, reduced-motion
5. **animation-fixer** — reads 08-animations-visual.md → improves hover states, transitions, micro-interactions (CSS only, no new deps)
6. **performance-fixer** — reads 09-code-performance.md → adds code splitting, lazy loading, removes unused deps, optimizes fonts
7. **test-writer** — reads 12-testing-reliability.md → writes Playwright E2E tests + fixes broken links

Each agent writes a fix log to `audit-results/fix-log-{area}.md`.

**IMPORTANT CONFLICT RULES:**
- seo-fixer owns: JSON-LD schemas, meta tags, sitemap.xml, robots.txt, llms.txt, blog post content (answer capsules only)
- content-fixer owns: visible text copy, team titles, CTA text, regulatory language
- mobile-fixer owns: CSS/style responsive changes, grid layouts, font sizes
- a11y-fixer owns: ARIA attributes, focus styles, skip links, alt text
- animation-fixer owns: hover states, transitions, keyframes
- performance-fixer owns: React.lazy, imports, package.json, font loading
- test-writer owns: tests/ directory, playwright config
- If two agents need to edit the same file, they edit DIFFERENT parts (e.g., seo-fixer adds schema, content-fixer changes text)

## PHASE 2: RE-AUDIT (after Phase 1 completes)

After ALL 7 agents finish:
1. Run `pnpm build` to verify no errors
2. Dispatch **re-auditor** to compare before/after scores
3. Git commit all changes: `git add -A && git commit -m "fix: implement audit recommendations (12-area deep audit)"`

The re-auditor produces `audit-results/RE-AUDIT.md` with:
- Before/after score table
- Overall improvement delta  
- Remaining issues
- "Ready for production?" verdict

Go. Start Phase 1 now — deploy all 7 fixers in parallel.

PROMPT
echo "============================================================"
