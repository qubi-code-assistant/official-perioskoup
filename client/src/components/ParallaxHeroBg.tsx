import { useEffect, useRef } from "react";

const SUBTLE_BG_URL = "https://d2xsxph8kpxj0f.cloudfront.net/99161099/Petc9UtExvVA722wdGgxhu/subtle-hero-bg-k2qpDt968bxHaLHenVss7J.webp";

export default function ParallaxHeroBg() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      // Parallax: image moves at 30% of scroll speed
      bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
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
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.18,
        backgroundImage: `url(${SUBTLE_BG_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        willChange: "transform",
      }}
    />
  );
}
