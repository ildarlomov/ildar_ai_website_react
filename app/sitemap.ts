import type { MetadataRoute } from "next";
import { LANG_PATH, SITE_URL } from "@/lib/site";

// Two language versions of the one-page site, each pointing at the other via hreflang.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE_URL}${LANG_PATH.en}`, ru: `${SITE_URL}${LANG_PATH.ru}` };
  return [
    { url: languages.en, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: languages.ru, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
