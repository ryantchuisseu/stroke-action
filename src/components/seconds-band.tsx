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
 *  Rendu par défaut = état complet (lisible sans JS). Rejoué depuis 0 à l'arrivée. */
export function SecondsBand({ d, donateHref }: { d: SecondsDict; donateHref: string }) {
  const secRef = useRef<HTMLElement>(null);
  const [p, setP] = useState(1);
  const [neurons, setNeurons] = useState(MAX_NEURONS);
  const played = useRef(false);
  const fmt = (n: number) => Math.round(n).toLocaleString("fr-FR");

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
          <h2 className="max-w-[14ch] text-[clamp(1.9rem,4.6vw,3.4rem)] tracking-[-0.03em]">{d.title}</h2>
          <p className="text-right">
            <b className="block text-[clamp(1.8rem,4.5vw,3rem)] font-bold tabular-nums tracking-[-0.03em] text-white">
              {fmt(neurons)}
            </b>
            <span className="text-[0.78rem] uppercase tracking-[0.1em] text-[rgba(252,250,246,0.5)]">
              {d.neuronsLabel}
            </span>
          </p>
        </div>

        <div className="mt-[clamp(2.5rem,6vw,4rem)]" style={{ "--p": p } as React.CSSProperties}>
          <div className="relative h-0.5 bg-[rgba(252,250,246,0.22)]">
            <div
              className="absolute left-0 top-0 h-full bg-[rgba(252,250,246,0.6)]"
              style={{ width: "calc(var(--p) * 100%)" }}
            />
            <div
              className="pointer-events-none absolute -mt-3 -ml-3 h-6 w-6"
              style={{ left: "calc(var(--p) * 100%)", top: "50%" }}
              aria-hidden="true"
            >
              <BrainMark className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="relative mt-6 hidden h-px sm:block">
            {d.stops.map((s) => (
              <div
                key={s.label}
                className="absolute top-0 w-[min(20ch,42vw)] -translate-x-3 transition-opacity duration-300"
                style={{ left: `${s.at * 100}%`, opacity: p >= s.at - 0.001 ? 1 : 0.28 }}
              >
                <span className="absolute -top-6 left-3 h-4 w-px bg-[rgba(252,250,246,0.4)]" />
                <span
                  className={`text-[0.8rem] font-bold tracking-[0.08em] tabular-nums ${
                    s.at === 0 ? "text-white" : "text-red"
                  }`}
                >
                  {s.label}
                </span>
                <span className="mt-[0.35rem] block text-[0.86rem] leading-[1.45] text-[rgba(252,250,246,0.78)]">
                  {s.text}
                </span>
              </div>
            ))}
          </div>

          <ul className="mt-6 grid gap-4 sm:hidden">
            {d.stops.map((s) => (
              <li key={s.label} className="border-l border-[rgba(252,250,246,0.3)] pl-4">
                <span className={`text-[0.8rem] font-bold tracking-[0.08em] ${s.at === 0 ? "text-white" : "text-red"}`}>
                  {s.label}
                </span>
                <span className="mt-1 block text-[0.9rem] text-[rgba(252,250,246,0.78)]">{s.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-[clamp(3rem,8vw,5rem)] max-w-[44ch] text-[rgba(252,250,246,0.72)]">{d.text}</p>
        <div className="mt-8">
          <Btn href={donateHref} onDark>
            {d.cta}
          </Btn>
        </div>
      </Container>
    </section>
  );
}
