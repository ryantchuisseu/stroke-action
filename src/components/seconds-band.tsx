"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Btn } from "./ui";
import { BrainMark } from "./brain-mark";

type Stop = { at: number; label: string; text: string };
type SecondsDict = {
  title: string;
  neuronsLabel: string;
  stops: readonly Stop[];
  text: string;
  cta: string;
};

const MAX_NEURONS = 8_000_000;

/** « Chaque seconde compte » — le point rouge parcourt la chronologie d'un AVC.
 *  Jalons en grille (jamais de chevauchement). Rendu par défaut = état complet
 *  (lisible sans JS) ; rejoué depuis 0 quand la section devient visible. */
export function SecondsBand({ d, donateHref }: { d: SecondsDict; donateHref: string }) {
  const secRef = useRef<HTMLElement>(null);
  const [p, setP] = useState(1);
  const [neurons, setNeurons] = useState(MAX_NEURONS);
  const played = useRef(false);
  const fmt = (n: number) => Math.round(n).toLocaleString("fr-FR");
  const n = d.stops.length;

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const play = () => {
      if (played.current) return;
      played.current = true;
      setP(0);
      setNeurons(0);
      const start = performance.now();
      const dur = 4200;
      const frame = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        setP(e);
        setNeurons(e * MAX_NEURONS);
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (io.disconnect(), play())),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={secRef} className="overflow-hidden bg-ink py-[clamp(3.5rem,8vw,6.5rem)] text-paper">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <h2 className="max-w-[16ch] text-[clamp(1.9rem,4.6vw,3.4rem)] tracking-[-0.03em]">{d.title}</h2>
          <p className="text-right">
            <b className="block text-[clamp(1.8rem,4.5vw,3rem)] font-bold tabular-nums tracking-[-0.03em] text-white">
              {fmt(neurons)}
            </b>
            <span className="text-[0.78rem] uppercase tracking-[0.1em] text-[rgba(252,250,246,0.5)]">
              {d.neuronsLabel}
            </span>
          </p>
        </div>

        {/* ligne + point rouge qui la parcourt */}
        <div
          className="relative mt-[clamp(2.5rem,6vw,4rem)] h-0.5 bg-[rgba(252,250,246,0.22)]"
          style={{ "--p": p } as React.CSSProperties}
        >
          <div
            className="absolute left-0 top-0 h-full bg-[rgba(252,250,246,0.6)]"
            style={{ width: "calc(var(--p) * 100%)" }}
          />
          {d.stops.map((s, i) => (
            <span
              key={`tick-${i}`}
              className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-[rgba(252,250,246,0.35)]"
              style={{ left: `${(i / (n - 1)) * 100}%` }}
              aria-hidden="true"
            />
          ))}
          <div
            className="pointer-events-none absolute -mt-3 h-6 w-6 -translate-x-1/2"
            style={{ left: "calc(var(--p) * 100%)", top: "50%" }}
            aria-hidden="true"
          >
            <BrainMark className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* jalons — grille, aucun chevauchement */}
        <ol className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
          {d.stops.map((s, i) => {
            const reached = p >= i / (n - 1) - 0.001;
            return (
              <li key={s.label} className="transition-opacity duration-300" style={{ opacity: reached ? 1 : 0.3 }}>
                <span
                  className={`block text-[0.82rem] font-bold tracking-[0.08em] tabular-nums ${
                    i === 0 ? "text-white" : "text-red"
                  }`}
                >
                  {s.label}
                </span>
                <span className="mt-1.5 block text-[0.88rem] leading-[1.5] text-[rgba(252,250,246,0.78)]">
                  {s.text}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="mt-[clamp(3rem,7vw,4.5rem)] max-w-[46ch] text-[rgba(252,250,246,0.72)]">{d.text}</p>
        <div className="mt-8">
          <Btn href={donateHref} onDark>
            {d.cta}
          </Btn>
        </div>
      </Container>
    </section>
  );
}
