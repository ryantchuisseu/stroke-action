"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = { label: string; href: string; desc?: string; soon?: boolean };
type NavDict = {
  home: string;
  donate: string;
  openMenu: string;
  groups: readonly { label: string; items: readonly NavItem[] }[];
};

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[9px] w-[9px] border-b-[1.6px] border-r-[1.6px] border-current transition-transform duration-[180ms] ease-[var(--ease-out)]"
      style={{ transform: open ? "rotate(-135deg) translateY(-1px)" : "rotate(45deg) translateY(-1px)" }}
    />
  );
}

export function SiteHeader({ lang, nav }: { lang: string; nav: NavDict }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const p = (href: string) => `/${lang}${href}`;
  const other = lang === "fr" ? "en" : "fr";
  const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, "");
  const switchHref = `/${other}${rest || ""}`;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-[100] border-b border-rule bg-[color-mix(in_srgb,var(--color-paper)_97%,transparent)] backdrop-blur-[10px]">
      <div className="mx-auto flex h-[66px] max-w-[1240px] items-center gap-4 px-5 sm:px-8 lg:gap-6 lg:px-16">
        {/* Lockup */}
        <Link href={`/${lang}`} className="mr-auto flex flex-none items-center" aria-label="Stroke Action · Action AVC">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Stroke Action · Action AVC" className="h-[46px] w-auto" />
        </Link>

        {/* Nav desktop */}
        <nav ref={navRef} aria-label={nav.home} className="hidden items-center gap-[0.2rem] lg:flex">
          {nav.groups.map((group) => {
            const open = openGroup === group.label;
            return (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenGroup(open ? null : group.label);
                  }}
                  className={`inline-flex items-center gap-[0.4rem] whitespace-nowrap rounded-[2px] px-[0.65rem] py-[0.55rem] text-[0.9rem] font-medium transition-colors duration-150 ${
                    open ? "bg-paper-deep text-blue-ink" : "text-ink-soft hover:text-blue-ink"
                  }`}
                >
                  {group.label} <Chevron open={open} />
                </button>
                {open && (
                  <div
                    role="menu"
                    className="absolute left-0 top-[calc(100%+10px)] z-[90] grid min-w-[292px] gap-px border border-rule bg-paper p-2"
                  >
                    {group.items.map((it) => (
                      <Link
                        key={it.href}
                        href={p(it.href)}
                        role="menuitem"
                        onClick={() => setOpenGroup(null)}
                        className="group block rounded-[2px] border-l-2 border-transparent px-[0.8rem] py-[0.7rem] transition-colors hover:border-blue hover:bg-paper-deep"
                      >
                        <span className="block text-[0.92rem] font-semibold tracking-[-0.01em] transition-colors group-hover:text-blue-ink">{it.label}</span>
                        <span className="mt-px block text-[0.8rem] text-grey">
                          {it.soon ? (
                            <span className="font-semibold uppercase tracking-[0.04em] text-blue-ink">
                              {lang === "fr" ? "Bientôt" : "Coming soon"}
                            </span>
                          ) : (
                            it.desc
                          )}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sélecteur de langue */}
        <Link
          href={switchHref}
          className="hidden flex-none rounded-[2px] px-2 py-1 text-[0.8rem] font-semibold tracking-[0.06em] text-ink-soft transition-colors hover:text-ink lg:inline-block"
          aria-label={other === "en" ? "Switch to English" : "Passer en français"}
        >
          {other.toUpperCase()}
        </Link>

        {/* CTA don */}
        <Link
          href={p("/nous-soutenir#don")}
          className="hidden flex-none items-center gap-2 bg-ink px-[1.05rem] py-[0.62rem] text-[0.88rem] font-semibold text-paper transition-colors duration-150 hover:bg-red hover:text-white lg:inline-flex"
        >
          {nav.donate}
        </Link>

        {/* Burger */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label={nav.openMenu}
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto p-2 lg:hidden"
        >
          <span className="mx-0 my-1 block h-[2px] w-[22px] bg-ink transition-transform" style={{ transform: mobileOpen ? "translateY(6px) rotate(45deg)" : "" }} />
          <span className="mx-0 my-1 block h-[2px] w-[22px] bg-ink transition-opacity" style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span className="mx-0 my-1 block h-[2px] w-[22px] bg-ink transition-transform" style={{ transform: mobileOpen ? "translateY(-6px) rotate(-45deg)" : "" }} />
        </button>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[66px] z-[95] overflow-y-auto bg-paper px-5 pb-8 pt-5 sm:px-8 lg:hidden">
          {nav.groups.map((group) => {
            const open = mobileGroup === group.label;
            return (
              <div key={group.label} className="border-b border-rule">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setMobileGroup(open ? null : group.label)}
                  className="flex w-full items-center justify-between px-1 py-[1.1rem] text-[1.05rem] font-semibold tracking-[-0.01em]"
                >
                  {group.label} <Chevron open={open} />
                </button>
                {open && (
                  <div className="grid gap-1 px-1 pb-4">
                    {group.items.map((it) => (
                      <Link
                        key={it.href}
                        href={p(it.href)}
                        onClick={() => setMobileOpen(false)}
                        className="py-[0.6rem] text-[0.98rem] text-ink-soft hover:text-ink"
                      >
                        {it.label}
                        {it.soon && (lang === "fr" ? " — bientôt" : " — coming soon")}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="mt-6 flex items-center gap-3">
            <Link
              href={p("/nous-soutenir#don")}
              onClick={() => setMobileOpen(false)}
              className="flex flex-1 justify-center bg-ink px-[1.1rem] py-[0.75rem] text-[0.9rem] font-semibold text-paper"
            >
              {nav.donate}
            </Link>
            <Link
              href={switchHref}
              onClick={() => setMobileOpen(false)}
              className="flex-none border border-rule px-4 py-[0.75rem] text-[0.85rem] font-semibold tracking-[0.06em] text-ink-soft"
            >
              {other.toUpperCase()}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
