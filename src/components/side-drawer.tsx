"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BrainMark } from "./brain-mark";

type Mode = "donate" | "membership" | "volunteer" | null;

type DrawerForm = {
  title: string;
  text: string;
  steps: readonly string[];
  downloadFr: string;
  downloadEn: string;
  reviewNote: string;
};

type DrawerDict = {
  close: string;
  donate: { title: string; soon: string; text: string; contact: string };
  membership: DrawerForm;
  volunteer: DrawerForm;
};

/** Tiroir latéral (glisse depuis la gauche, courbe iOS). Ouvert par tout
 *  lien/bouton se terminant par #don, #devenir-membre, ou portant
 *  data-drawer. « Faire un don » = maquette floutée (bientôt). « Adhésion » =
 *  démarche + téléchargement du formulaire. */
export function SideDrawer({ lang, d }: { lang: string; d: DrawerDict }) {
  const [mode, setMode] = useState<Mode>(null);
  const open = mode !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const p = (href: string) => `/${lang}${href}`;

  const close = useCallback(() => {
    setMode(null);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.("a,button") as HTMLElement | null;
      if (!el) return;
      const dd = el.dataset.drawer;
      const href = el.getAttribute("href") ?? "";
      let m: Mode = null;
      if (dd === "donate" || href.endsWith("#don")) m = "donate";
      else if (dd === "volunteer" || href.endsWith("#benevolat")) m = "volunteer";
      else if (dd === "membership" || href.endsWith("#devenir-membre")) m = "membership";
      if (!m) return;
      e.preventDefault();
      e.stopPropagation();
      lastFocus.current = el;
      setMode(m);
    }
    // capture phase : passe avant le handler de <Link>
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      const id = window.setTimeout(() => {
        panelRef.current?.querySelector<HTMLElement>("button,a,[tabindex]")?.focus();
      }, 60);
      return () => window.clearTimeout(id);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fermer si on change de page
  useEffect(() => {
    setMode(null);
  }, [pathname]);

  const m = mode ?? "donate";
  const form = m === "volunteer" ? d.volunteer : d.membership;
  const title = m === "donate" ? d.donate.title : form.title;

  return (
    <div className={`fixed inset-0 z-[200] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/45 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute inset-y-0 left-0 flex w-[min(92vw,430px)] flex-col bg-paper shadow-[8px_0_40px_rgba(20,19,18,0.18)] transition-transform duration-[340ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-rule px-6 py-4">
          <div className="flex items-center gap-2">
            <BrainMark className="h-6 w-6 text-ink" />
            <span className="text-[0.95rem] font-semibold tracking-[-0.01em]">{title}</span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={d.close}
            className="grid h-8 w-8 place-content-center text-ink-soft transition-colors hover:text-ink"
          >
            <span aria-hidden="true" className="relative block h-4 w-4">
              <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-7">
          {m === "donate" ? (
            <>
              <div className="relative">
                <div className="pointer-events-none select-none blur-[6px] opacity-55" aria-hidden="true">
                  <div className="grid grid-cols-3 gap-2">
                    {["2 000", "5 000", "10 000"].map((a) => (
                      <div key={a} className="border border-rule py-3 text-center text-[0.9rem] font-semibold">
                        {a}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 h-11 border border-rule" />
                  <div className="mt-2 h-11 border border-rule" />
                  <div className="mt-4 h-11 bg-blue-ink" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="rounded-none bg-paper px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-red-ink shadow-[0_0_0_1px_var(--color-rule)]">
                    {d.donate.soon}
                  </span>
                </div>
              </div>
              <p className="mt-7 text-[0.92rem] leading-[1.6] text-ink-soft">{d.donate.text}</p>
              <Link
                href={p("/contact")}
                onClick={close}
                className="mt-6 inline-flex items-center bg-blue-ink px-[1.1rem] py-[0.65rem] text-[0.88rem] font-semibold text-paper transition-colors hover:bg-red hover:text-white"
              >
                {d.donate.contact}
              </Link>
            </>
          ) : (
            <>
              <p className="text-[0.92rem] leading-[1.6] text-ink-soft">{form.text}</p>
              <ol className="mt-5 space-y-4">
                {form.steps.map((s, i) => (
                  <li key={i} className="grid grid-cols-[1.6rem_1fr] gap-3 text-[0.9rem] leading-[1.5]">
                    <span className="font-bold tabular-nums text-blue-ink">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 grid gap-2">
                {[
                  { href: "/documents/formulaire-adhesion-benevolat-FR.docx", label: form.downloadFr },
                  { href: "/documents/membership-volunteer-form-EN.docx", label: form.downloadEn },
                ].map((f) => (
                  <a
                    key={f.href}
                    href={f.href}
                    className="group flex items-center gap-3 border border-rule px-4 py-3 text-[0.88rem] font-semibold transition-colors hover:border-ink hover:bg-paper-deep"
                  >
                    <svg viewBox="0 0 24 28" className="h-6 w-6 flex-none text-ink transition-colors group-hover:text-red-ink" aria-hidden="true">
                      <path d="M3 1h11l7 7v18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M14 1v7h7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                    <span className="flex-1">{f.label}</span>
                    <span aria-hidden="true" className="text-blue-ink transition-transform group-hover:translate-y-0.5">↓</span>
                  </a>
                ))}
              </div>
              <p className="mt-5 text-[0.78rem] leading-[1.5] text-grey">{form.reviewNote}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
