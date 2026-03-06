import { useEffect, useRef } from "react";

/**
 * Subtle dot-grid pattern background with gentle parallax.
 * Positioned absolute within the hero section — does NOT follow scroll globally.
 */
export default function ParallaxHeroBg() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        opacity: 0.35,
        backgroundImage: `radial-gradient(circle, rgba(192,229,122,0.12) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        willChange: "transform",
      }}
    />
  );
}
