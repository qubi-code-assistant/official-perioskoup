/* =============================================================
   PERIOSKOUP -- CUSTOM CURSOR
   Lime dot + trailing ring with hover expansion
   ============================================================= */
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterHoverable = () => ring.classList.add('hovering');
    const onLeaveHoverable = () => ring.classList.remove('hovering');

    const animate = () => {
      // Dot follows instantly
      dot.style.left = `${pos.current.x}px`;
      dot.style.top = `${pos.current.y}px`;

      // Ring lags behind
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove);

    // Add hover listeners to interactive elements
    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .perio-card-hover').forEach((el) => {
        el.addEventListener('mouseenter', onEnterHoverable);
        el.addEventListener('mouseleave', onLeaveHoverable);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
