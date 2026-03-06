import { useEffect } from "react";

/**
 * Scroll-reveal hook — observes .reveal and .reveal-scale elements
 * and adds the "visible" class when they intersect the viewport.
 * Respects prefers-reduced-motion: immediately marks all elements
 * visible when the user has requested reduced motion.
 */
export function useReveal(threshold = 0.1) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const elements = document.querySelectorAll(".reveal, .reveal-scale");

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
