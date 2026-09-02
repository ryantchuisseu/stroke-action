"use client";

import { useEffect, useRef, useState } from "react";

/** Compte de 0 à `to` quand l'élément entre dans le viewport. Rendu SSR = valeur finale. */
export function CountUp({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    setVal(0);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const dur = 950;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            setVal(Math.round((1 - Math.pow(1 - t, 3)) * to));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {val}
    </span>
  );
}
