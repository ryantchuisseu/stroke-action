"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/** Grossit + scintille une fois quand l'élément entre dans le viewport
 * (motif V6, cf. V6-NOTES.md). `delay` (ms) décale l'entrée pour un effet
 * de cascade sur une grille de cartes. Comme .hero-stg ailleurs sur le
 * site, part masqué et se révèle via IntersectionObserver (coupé si
 * prefers-reduced-motion, cf. globals.css). */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          window.setTimeout(() => setShown(true), delay);
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`sa-reveal ${shown ? "sa-reveal-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
