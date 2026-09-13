"use client";

import { useCallback, useEffect, useState } from "react";
import { BrainMark } from "./brain-mark";

type Member = {
  role: string;
  name: string;
  bio: string;
  fullBio?: string;
  email?: string;
  photo?: string;
};

/** Grille du bureau exécutif + tiroir latéral (glisse depuis la gauche,
 *  même style que SideDrawer) pour la bio complète des membres qui en ont une. */
export function BoardGrid({
  board,
  readMore,
  closeLabel,
}: {
  board: readonly Member[];
  readMore: string;
  closeLabel: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx !== null ? board[openIdx] : null;
  const open = active !== null;

  const close = useCallback(() => setOpenIdx(null), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {board.map((m, i) => (
          <article key={m.role} className="bg-paper p-6">
            {m.photo ? (
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photo}
                  alt={m.name}
                  className={`h-full w-full object-cover ${m.photo === "/dr-kamtchum.jpg" ? "object-top" : "object-center"}`}
                />
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center bg-paper-deep" aria-hidden="true">
                <BrainMark className="h-9 w-9 text-blue-ink/25" dot="color-mix(in srgb, var(--color-red) 35%, transparent)" />
              </div>
            )}
            <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-blue-ink">{m.role}</p>
            <h2 className="mt-1 text-[1.1rem] font-semibold tracking-[-0.01em]">{m.name}</h2>
            <p className="mt-2 text-[0.9rem] text-ink-soft">{m.bio}</p>
            {m.email && (
              <a href={`mailto:${m.email}`} className="mt-2 inline-block text-[0.85rem] text-blue-ink hover:text-red-ink">
                {m.email}
              </a>
            )}
            {m.fullBio && (
              <button
                type="button"
                onClick={() => setOpenIdx(i)}
                className="group mt-3 flex items-center gap-1 text-[0.85rem] font-semibold text-blue-ink transition-colors hover:text-red-ink"
              >
                {readMore}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            )}
          </article>
        ))}
      </div>

      <div className={`fixed inset-0 z-[200] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          onClick={close}
          className={`absolute inset-0 bg-ink/45 transition-opacity duration-300 motion-reduce:transition-none ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active?.name}
          className={`absolute inset-y-0 left-0 flex w-[min(92vw,430px)] flex-col bg-paper shadow-[8px_0_40px_rgba(20,19,18,0.18)] transition-transform duration-[340ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="flex items-center justify-between border-b border-rule px-6 py-4">
            <div className="flex items-center gap-2">
              <BrainMark className="h-6 w-6 text-ink" />
              <span className="text-[0.95rem] font-semibold tracking-[-0.01em]">{active?.name}</span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={closeLabel}
              className="grid h-8 w-8 flex-none place-content-center text-ink-soft transition-colors hover:text-ink"
            >
              <span aria-hidden="true" className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-7">
            {active?.photo && (
              <div className="aspect-square w-[min(50%,180px)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.photo}
                  alt={active.name}
                  className={`h-full w-full object-cover ${active.photo === "/dr-kamtchum.jpg" ? "object-top" : "object-center"}`}
                />
              </div>
            )}
            <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-blue-ink">{active?.role}</p>
            <p className="mt-4 text-[0.92rem] leading-[1.6] text-ink-soft">{active?.fullBio}</p>
            {active?.email && (
              <a href={`mailto:${active.email}`} className="mt-5 inline-block text-[0.88rem] font-semibold text-blue-ink hover:text-red-ink">
                {active.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
