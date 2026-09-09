import { fr } from "./fr";
import { en } from "./en";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (v: string | undefined): v is Locale =>
  !!v && (locales as readonly string[]).includes(v);

const dicts = { fr, en } as const;

export type Dict = typeof fr;

export function getDictionary(locale: Locale): Dict {
  return (dicts[locale] ?? dicts[defaultLocale]) as Dict;
}
