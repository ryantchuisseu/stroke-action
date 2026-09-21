"use client";

import { useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string; href?: string };
type Labels = { prev: string; next: string; region: string; goto: string };

const INTERVAL = 5200;
const SLIDE_MS = 700;

/** Carrousel éditorial : glissé horizontal (ease-in-out), léger zoom Ken-Burns
 *  sur l'image active, lecture auto en pause au survol / focus / onglet caché,
 *  navigation flèches + puces, tout coupé sous prefers-reduced-motion. */
export function Carousel({ slides, labels }: { slides: Slide[]; labels: Labels }) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener("change", set);
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", set);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % n), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduce, paused, n]);

  const go = (i: number) => setIndex(((i % n) + n) % n);

  return (
    <div
      ref={rootRef}
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      {/* Fenêtre */}
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: reduce ? "none" : `transform ${SLIDE_MS}ms cubic-bezier(0.77,0,0.175,1)`,
          }}
        >
          {slides.map((s, i) => {
            const img = (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={s.src}
                alt={i === index ? s.alt : ""}
                loading="eager"
                className="h-full w-full object-cover"
                style={{
                  transform: !reduce && i === index ? "scale(1.06)" : "scale(1)",
                  transition: !reduce && i === index ? "transform 6s linear" : "none",
                }}
              />
            );
            return (
              <div key={s.src} className="relative h-full w-full flex-none overflow-hidden" aria-hidden={i !== index}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" className="group block h-full w-full">
                    {img}
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 px-3 py-1.5 text-[0.7rem] text-paper opacity-0 transition-[transform,opacity] duration-200 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="block truncate pr-14">{s.href.replace(/^https?:\/\//, "")}</span>
                    </span>
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>

        {/* dégradé + compteur */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/45 to-transparent" />
        <div className="absolute bottom-4 right-4 font-mono text-[0.78rem] font-semibold tabular-nums tracking-[0.1em] text-paper/90">
          {String(index + 1).padStart(2, "0")} <span className="text-paper/45">/ {String(n).padStart(2, "0")}</span>
        </div>
      </div>

      {/* commandes */}
      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label={labels.prev}
          className="flex h-9 w-9 items-center justify-center border border-rule text-ink transition-colors hover:border-ink active:scale-95"
        >
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rotate-45 border-b-2 border-l-2 border-current" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label={labels.next}
          className="flex h-9 w-9 items-center justify-center border border-rule text-ink transition-colors hover:border-ink active:scale-95"
        >
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 -rotate-45 border-b-2 border-r-2 border-current" />
        </button>

        <div className="ml-auto flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`${labels.goto} ${i + 1}`}
              aria-current={i === index}
              className={`h-[3px] transition-all duration-300 ease-[var(--ease-out)] ${
                i === index ? "w-8 bg-red" : "w-4 bg-rule hover:bg-grey"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
