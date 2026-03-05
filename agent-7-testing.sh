#!/bin/bash
cd ~/Projects/official-perioskoup
claude -p "Read CLAUDE.md. 1) WCAG 2.1 AA audit: semantic HTML, ARIA labels, color contrast, focus indicators, keyboard nav, prefers-reduced-motion disables animations 2) Create tests/visual/ with Playwright screenshot tests for every page at 375px, 768px, 1440px 3) Create tests/e2e/ testing nav links, hamburger, waitlist form, blog navigation, no horizontal overflow, axe-core accessibility 4) Add test scripts to package.json 5) Run all tests and fix failures" --dangerously-skip-permissions
