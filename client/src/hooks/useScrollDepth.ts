import { useEffect, useRef } from "react";
import { capture } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Tracks scroll depth milestones (25/50/75/100%) via IntersectionObserver
 * on sentinel elements. Each milestone fires exactly once per page visit.
 *
 * Attach the returned ref to the page's outermost scrollable container.
 */
export function useScrollDepth(page: string) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reached = useRef(new Set<number>());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sentinels: HTMLDivElement[] = [];
    const observers: IntersectionObserver[] = [];

    for (const depth of MILESTONES) {
      const sentinel = document.createElement("div");
      sentinel.style.position = "absolute";
      sentinel.style.left = "0";
      sentinel.style.width = "1px";
      sentinel.style.height = "1px";
      sentinel.style.pointerEvents = "none";
      sentinel.style.top = `${depth}%`;
      sentinel.setAttribute("aria-hidden", "true");
      container.style.position = "relative";
      container.appendChild(sentinel);
      sentinels.push(sentinel);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !reached.current.has(depth)) {
            reached.current.add(depth);
            capture("scroll_depth_reached", { depth, page });
            observer.disconnect();
          }
        },
        { threshold: 0 }
      );

      observer.observe(sentinel);
      observers.push(observer);
    }

    return () => {
      observers.forEach(o => o.disconnect());
      sentinels.forEach(s => s.remove());
    };
  }, [page]);

  return containerRef;
}
