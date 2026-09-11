import Link from "next/link";
import { Container } from "./ui";
import { CONTACT } from "@/lib/nav";

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M15.5 8.5h-2a1 1 0 0 0-1 1V12h3l-.4 3h-2.6v7h-3v-7H7.5v-3H9.5V9a3.5 3.5 0 0 1 3.5-3.5h2.5v3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.6" cy="8" r="1.15" fill="currentColor" />
      <path d="M7.6 11v6.2M11.6 17.2V13c0-1.4.9-2.3 2.1-2.3 1.1 0 1.9.8 1.9 2.3v4.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 9.5v5l4.3-2.5-4.3-2.5Z" fill="currentColor" />
    </svg>
  );
}

type FooterDict = {
  motto: string;
  mottoSub: string;
  colHome: string;
  colAssoc: string;
  colUnderstand: string;
  colNews: string;
  colInvolved: string;
  colContact: string;
  rights: string;
  city: string;
  credit: string;
  social: string;
};

export function SiteFooter({ lang, footer }: { lang: string; footer: FooterDict }) {
  const p = (href: string) => `/${lang}${href}`;

  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: footer.colHome,
      links: [{ label: footer.colHome, href: "/" }],
    },
    {
      title: footer.colAssoc,
      links: [
        { label: lang === "fr" ? "À propos" : "About Us", href: "/a-propos" },
        { label: lang === "fr" ? "Nos actions" : "What We Do", href: "/nos-actions" },
        { label: lang === "fr" ? "Gouvernance" : "Governance", href: "/gouvernance" },
        { label: lang === "fr" ? "Documents clés" : "Key Documents", href: "/documents-cles" },
      ],
    },
    {
      title: footer.colUnderstand,
      links: [
        { label: lang === "fr" ? "Éducation AVC" : "Stroke Education", href: "/education-avc" },
        { label: lang === "fr" ? "Le saviez-vous ?" : "Did You Know?", href: "/education-avc#le-saviez-vous" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: footer.colNews,
      links: [
        { label: lang === "fr" ? "Blog / Actualités" : "Blog / News", href: "/actualites" },
        { label: lang === "fr" ? "Galerie" : "Gallery", href: "/galerie" },
      ],
    },
    {
      title: footer.colInvolved,
      links: [
        { label: lang === "fr" ? "Nous soutenir" : "Support Us", href: "/nous-soutenir" },
        { label: lang === "fr" ? "Devenir membre" : "Become a Member", href: "/nous-soutenir#devenir-membre" },
        { label: lang === "fr" ? "Bénévolat" : "Volunteer", href: "/nous-soutenir#benevolat" },
        { label: lang === "fr" ? "Contact" : "Contact Us", href: "/contact" },
        { label: lang === "fr" ? "Espace membres — bientôt" : "Members — coming soon", href: "/espace-membres" },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-[rgba(252,250,246,0.14)] bg-blue-ink py-[clamp(3rem,7vw,5rem)] text-paper">
      <Container>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-white.png" alt="Stroke Action · Action AVC" className="mb-8 h-14 w-auto" />
        <p className="max-w-[24ch] text-[clamp(1.2rem,2.8vw,1.8rem)] font-bold tracking-[-0.02em] text-balance">
          {footer.motto}
          <span className="ml-[0.15em] inline-block h-[0.22em] w-[0.22em] rounded-full bg-red align-middle" aria-hidden="true" />
          <span className="mt-[0.3rem] block text-[0.8em] font-medium text-[rgba(252,250,246,0.55)]">
            {footer.mottoSub}
          </span>
        </p>

        <div className="mt-[clamp(2.25rem,5vw,3.5rem)] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8">
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[rgba(252,250,246,0.5)]">
                {col.title}
              </h3>
              <ul className="grid gap-[0.55rem]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={p(l.href)} className="text-[0.9rem] text-[rgba(252,250,246,0.82)] transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[rgba(252,250,246,0.5)]">
              {footer.colContact}
            </h3>
            <ul className="grid gap-[0.55rem]">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-[0.9rem] text-[rgba(252,250,246,0.82)] transition-colors hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="text-[0.9rem] text-[rgba(252,250,246,0.82)] transition-colors hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-[0.9rem] text-[rgba(252,250,246,0.82)]">Tradex Nkoabang — Yaoundé</li>
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(2.25rem,5vw,3.5rem)] flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-[rgba(252,250,246,0.14)] pt-[1.4rem]">
          <div className="flex flex-wrap gap-x-5 gap-y-[0.4rem] text-[0.78rem] text-[rgba(252,250,246,0.5)]">
            <span>{footer.rights}</span>
            <span>{footer.city}</span>
            <span>{CONTACT.email}</span>
            <span>{footer.credit}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[0.72rem] text-[rgba(252,250,246,0.4)]">{footer.social}</span>
            <span className="flex items-center gap-3 text-[rgba(252,250,246,0.45)]" aria-hidden="true">
              <FacebookIcon className="h-[18px] w-[18px]" />
              <LinkedinIcon className="h-[18px] w-[18px]" />
              <YoutubeIcon className="h-[18px] w-[18px]" />
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
