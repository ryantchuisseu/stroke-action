import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES, ROUTES, languagesFor } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${route}`,
      lastModified,
      changeFrequency: (route === "" || route === "/actualites" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: route === "" ? 1 : 0.7,
      alternates: { languages: languagesFor(route) },
    })),
  );
}
