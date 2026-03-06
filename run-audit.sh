#!/bin/bash
# ============================================================================
# PERIOSKOUP DEEP AUDIT — Multi-Agent Army
# Run: cd ~/Projects/official-perioskoup && claude --dangerously-skip-permissions
# Then paste the prompt at the bottom of AUDIT_AGENT.md
# ============================================================================

# This script prepares the workspace and provides context.
# The actual agents are spawned by Claude Code reading AUDIT_AGENT.md

set -e

echo "🏛️ Perioskoup Deep Audit — Preparing workspace..."

# Create output directory
mkdir -p audit-results

# Collect installed skill paths for Claude Code to read
echo "📚 Available skills for audit agents:"
SKILLS_DIR="$HOME/.openclaw/workspace/skills"

SKILL_FILES=""
for skill in seo accessibility responsive-design animations awwwards-design \
             e2e-testing-patterns frontend-performance landing-page-roast \
             schema-markup-generator wcag-21-aa-web-ui-audit mobile \
             pls-seo-audit frontend-design-3 superdesign ui-ux-design; do
  if [ -f "$SKILLS_DIR/$skill/SKILL.md" ]; then
    echo "  ✅ $skill"
    SKILL_FILES="$SKILL_FILES $SKILLS_DIR/$skill/SKILL.md"
  fi
done

echo ""
echo "📁 Project structure:"
find client/src -name "*.tsx" -o -name "*.ts" | grep -v node_modules | grep -v ui/ | sort
echo ""
echo "🌐 Live site: https://official-perioskoup.vercel.app"
echo ""
echo "✅ Ready. Now run Claude Code and paste the prompt from AUDIT_AGENT.md"
