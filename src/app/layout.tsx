import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://strokeaction.org"),
  title: {
    default: "Stroke Action · Action AVC — Ensemble pour vaincre l'AVC",
    template: "%s · Stroke Action AVC",
  },
  description:
    "Stroke Action est une organisation à but non lucratif qui agit pour réduire le fardeau de l'AVC par l'éducation, la recherche, la formation professionnelle et le soutien aux patients et à leurs familles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
