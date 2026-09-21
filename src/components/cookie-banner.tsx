"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "sa-cookie-consent";

type CookieDict = {
  text: string;
  accept: string;
  decline: string;
  linkLabel: string;
};

export function CookieBanner({ lang, d }: { lang: string; d: CookieDict }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // stockage indisponible (navigation privée, etc.) — on n'affiche pas le bandeau
    }
  }, []);

  function answer(value: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={d.text}
      className="fixed inset-x-0 bottom-0 z-[150] border-t border-rule bg-paper/97 backdrop-blur-sm"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-16">
        <p className="max-w-[62ch] text-[0.88rem] text-ink-soft">
          {d.text}{" "}
          <Link href={`/${lang}/politique-confidentialite`} className="font-semibold text-blue-ink hover:text-red-ink">
            {d.linkLabel}
          </Link>
        </p>
        <div className="flex flex-none gap-3">
          <button
            type="button"
            onClick={() => answer("declined")}
            className="px-[1.1rem] py-[0.55rem] text-[0.85rem] font-semibold text-blue-ink shadow-[inset_0_0_0_1.5px_var(--color-blue-ink)] transition-[transform,background-color,color,box-shadow] duration-150 ease-[var(--ease-out)] hover:shadow-[inset_0_0_0_1.5px_var(--color-red)] active:scale-[0.97]"
          >
            {d.decline}
          </button>
          <button
            type="button"
            onClick={() => answer("accepted")}
            className="bg-blue-ink px-[1.1rem] py-[0.55rem] text-[0.85rem] font-semibold text-paper transition-[transform,background-color,color] duration-150 ease-[var(--ease-out)] hover:bg-red hover:text-white active:scale-[0.97]"
          >
            {d.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
