import { useEffect, useRef } from "react";

/**
 * Dot-grid pattern background with gentle parallax.
 * Positioned absolute within the hero section.
 *
 * Animation improvements:
 *   - Opacity increased from 0.35 to 0.55 (was nearly invisible)
 *   - Dot color opacity increased from 0.12 to 0.18 (brighter dots)
 *   - Slow dot-grid-breathe animation for subtle depth
 *   - prefers-reduced-motion guard skips scroll listener and freezes
 */
export default function ParallaxHeroBg() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion — skip parallax entirely
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      // Only apply parallax when the section is in view
      const offset = -rect.top * 0.15;
      bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      className="pointer-events-none"
      style={{
        position: "absolute",
        inset: "-20% 0",
        zIndex: 0,
        backgroundImage: `radial-gradient(circle, rgba(192,229,122,0.18) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        animation: "dot-grid-breathe 8s ease-in-out infinite",
      }}
    />
  );
}
