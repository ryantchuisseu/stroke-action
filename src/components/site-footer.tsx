import Link from "next/link";
import { Container } from "./ui";
import { CONTACT } from "@/lib/nav";

type FooterDict = {
  motto: string;
  mottoSub: string;
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
    <footer className="mt-auto border-t border-[rgba(252,250,246,0.14)] bg-ink py-[clamp(3rem,7vw,5rem)] text-paper">
      <Container>
        <p className="max-w-[24ch] text-[clamp(1.2rem,2.8vw,1.8rem)] font-bold tracking-[-0.02em] text-balance">
          {footer.motto}
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
                    <Link href={p(l.href)} className="text-[0.9rem] text-[rgba(252,250,246,0.82)] hover:text-white">
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
                <a href={`mailto:${CONTACT.email}`} className="text-[0.9rem] text-[rgba(252,250,246,0.82)] hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="text-[0.9rem] text-[rgba(252,250,246,0.82)] hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="text-[0.9rem] text-[rgba(252,250,246,0.82)]">Tradex Nkoabang — Yaoundé</li>
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(2.25rem,5vw,3.5rem)] flex flex-wrap gap-x-5 gap-y-[0.4rem] border-t border-[rgba(252,250,246,0.14)] pt-[1.4rem] text-[0.78rem] text-[rgba(252,250,246,0.5)]">
          <span>{footer.rights}</span>
          <span>{footer.city}</span>
          <span>{footer.credit}</span>
          <span>{footer.social}</span>
        </div>
      </Container>
    </footer>
  );
}
