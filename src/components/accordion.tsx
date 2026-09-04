"use client";

import { useState } from "react";

export type QA = { q: string; a: string };

export function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-rule">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-rule">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-[clamp(1rem,2.6vw,1.5rem)] text-left transition-[background-color,padding] duration-200 ease-[var(--ease-out)] hover:bg-paper-deep hover:px-3"
              >
                <span className="origin-left text-[clamp(1rem,1.9vw,1.2rem)] font-semibold tracking-[-0.01em] transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100">
                  {it.q}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-1 h-4 w-4 flex-none text-red-ink transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-125 motion-reduce:group-hover:scale-100"
                >
                  <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-current" />
                  <span
                    className="absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2 bg-current transition-transform duration-200 ease-[var(--ease-out)]"
                    style={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }}
                  />
                </span>
              </button>
            </h3>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-[clamp(1rem,2.6vw,1.5rem)] text-ink-soft">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
