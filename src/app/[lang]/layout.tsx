import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SideDrawer } from "@/components/side-drawer";
import { getDictionary, isLocale, locales, type Locale } from "@/dictionaries";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "en");
  return {
    metadataBase: new URL("https://strokeaction.org"),
    title: { default: d.meta.homeTitle, template: d.meta.titleTemplate },
    description: d.meta.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang as Locale);

  return (
    <html lang={lang} className={poppins.variable}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} nav={d.nav} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} footer={d.footer} />
        <SideDrawer lang={lang} d={d.drawer} />
      </body>
    </html>
  );
}
