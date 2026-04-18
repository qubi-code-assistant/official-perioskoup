import { useEffect, useRef, type RefObject } from "react";
import { capture } from "@/lib/analytics";

/**
 * Fires a PostHog event once when the referenced element enters the viewport.
 * Uses IntersectionObserver — no scroll listeners.
 */
export function useTrackVisibility(
  ref: RefObject<HTMLElement | null>,
  eventName: string,
  properties: Record<string, unknown>,
  threshold = 0.3
): void {
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          capture(eventName, properties);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, eventName, threshold]);
}
