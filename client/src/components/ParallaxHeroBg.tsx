import { useEffect, useRef } from "react";

/**
 * Dot-grid pattern background with gentle parallax.
 * Uses requestAnimationFrame to avoid forced reflows.
 */
export default function ParallaxHeroBg() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (bgRef.current) {
          // Use scrollY instead of getBoundingClientRect to avoid forced reflow
          const offset = -window.scrollY * 0.15;
          bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
        ticking = false;
      });
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
        willChange: "transform",
      }}
    />
  );
}
