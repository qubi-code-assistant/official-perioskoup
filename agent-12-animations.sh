#!/bin/bash
cd ~/Projects/official-perioskoup

cat \
  ~/.openclaw/workspace/skills/animations/SKILL.md \
  ~/.openclaw/workspace/skills/awwwards-design/SKILL.md \
  > /tmp/anim-context.md

cat >> /tmp/anim-context.md << 'INSTRUCTIONS'

---

Read CLAUDE.md first.

THE PROBLEM: Animations on the Perioskoup website are completely broken. Elements have `data-gsap` attributes with `opacity: 0` in CSS, but GSAP is not reliably revealing them. The result is either:
- Content invisible forever (GSAP never fires)
- Content just "pops in" with a delay — no actual scroll animation visible
- No scroll-triggered reveals, no staggering, no parallax — just broken

YOUR TASK: Completely rebuild the animation system from scratch. Make it bulletproof and impressive.

## Step 1: Remove the broken system
- Delete `src/components/ScrollReveal.tsx`
- Delete `src/app/HomeAnimations.tsx`
- Remove ALL `data-gsap`, `data-gsap-stagger`, `data-gsap="hero-text"`, `data-gsap="hero-phone"`, `data-gsap="fade-up"`, `data-gsap="stagger-item"`, `data-gsap="step-line"`, `data-clinic-counter`, `data-hero-section`, `data-steps-section` attributes from ALL files
- Remove the `[data-gsap] { opacity: 0 }` CSS rule from globals.css
- Remove the gsap-fallback animation from globals.css
- Remove ScrollReveal and HomeAnimations from layout.tsx and page.tsx imports

## Step 2: Build a new animation system using CSS + Intersection Observer
DO NOT use GSAP. Use a lightweight approach:

### CSS-based animations (in globals.css):
```css
/* Scroll reveal base */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.reveal-stagger > .reveal-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-stagger.visible > .reveal-item {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger delays via CSS custom property */
.reveal-stagger.visible > .reveal-item:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger.visible > .reveal-item:nth-child(2) { transition-delay: 100ms; }
.reveal-stagger.visible > .reveal-item:nth-child(3) { transition-delay: 200ms; }
.reveal-stagger.visible > .reveal-item:nth-child(4) { transition-delay: 300ms; }
.reveal-stagger.visible > .reveal-item:nth-child(5) { transition-delay: 400ms; }
.reveal-stagger.visible > .reveal-item:nth-child(6) { transition-delay: 500ms; }
.reveal-stagger.visible > .reveal-item:nth-child(7) { transition-delay: 600ms; }
.reveal-stagger.visible > .reveal-item:nth-child(8) { transition-delay: 700ms; }

/* Scale up variant */
.reveal-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-scale.visible {
  opacity: 1;
  transform: scale(1);
}

/* Slide from left */
.reveal-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-left.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Slide from right */
.reveal-right {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-right.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Hero entrance — no scroll needed, animate on load */
.hero-enter {
  opacity: 0;
  transform: translateY(30px);
  animation: heroEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.hero-enter-delay-1 { animation-delay: 0.1s; }
.hero-enter-delay-2 { animation-delay: 0.2s; }
.hero-enter-delay-3 { animation-delay: 0.3s; }
.hero-enter-delay-4 { animation-delay: 0.5s; }

@keyframes heroEnter {
  to { opacity: 1; transform: translateY(0); }
}

/* Counter animation */
@keyframes countUp {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

/* Floating/breathing animation for decorative elements */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Reduced motion: disable all animations */
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-scale, .reveal-left, .reveal-right,
  .reveal-stagger > .reveal-item, .hero-enter {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }
}
```

### Intersection Observer component (src/components/ScrollReveal.tsx):
Create a simple 'use client' component that:
1. Uses useEffect + IntersectionObserver
2. Observes all `.reveal`, `.reveal-scale`, `.reveal-left`, `.reveal-right`, `.reveal-stagger` elements
3. Adds `.visible` class when element enters viewport (threshold: 0.1)
4. Once visible, unobserves (one-time animation)
5. Wrap children in a single div, no extra nesting

## Step 3: Apply animations to ALL pages

### Homepage (page.tsx):
- Hero badge, headline, quote, CTA: `hero-enter` with staggered delays
- Hero phone mockup: `hero-enter hero-enter-delay-4` (comes in last, slightly from right)
- Comparison section header: `reveal`
- Comparison cards container: `reveal-stagger`, each card: `reveal-item`
- Bento section header: `reveal`
- Bento cards container: `reveal-stagger`, each card: `reveal-item`
- Authority/proof section: `reveal`
- 30+ counter: `reveal-scale`
- Workflow section header: `reveal`
- Steps: `reveal-stagger` with `reveal-item` on each step
- Blog section: `reveal` header, `reveal-stagger` for cards
- Final CTA: `reveal`

### Sub-pages (features, for-dentists, about, pricing, blog, contact, waitlist, etc.):
- Page hero/header: `hero-enter` variants
- Content sections: `reveal`
- Card grids: `reveal-stagger` + `reveal-item`
- Stats/numbers: `reveal-scale`

## Step 4: Add premium hover effects and micro-interactions

### Buttons:
- All CTA buttons: `transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(192,229,122,0.3)]`
- Ghost/outline buttons: `hover:bg-navy-800/50 hover:border-lime-400`

### Cards (titanium-card class):
- Already has hover transform — make sure it works: `hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]`
- Add subtle border glow on hover: `hover:border-lime-400/20`

### Links:
- Underline animation on hover (slide in from left)
- Arrow icons: `group-hover:translate-x-1 transition-transform`

### Navigation:
- Smooth backdrop-blur on scroll (already should work)
- Active link indicator

## Step 5: Add subtle page-level polish
- Smooth scroll behavior (already in CSS)
- Section dividers: subtle gradient lines between sections
- Ambient background variations: slightly different bg shades per section for depth
- Floating particles or subtle grain overlay (optional, only if it looks good)

## IMPORTANT:
- Remove gsap from package.json dependencies
- Run `npm uninstall gsap`
- Run `npm run build` — must pass with ZERO errors
- Every page must have animations
- No content should be invisible — if JS fails, content must still show (CSS handles the reduced-motion case)
INSTRUCTIONS

cat /tmp/anim-context.md | claude --dangerously-skip-permissions
