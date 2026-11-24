import type { MetadataRoute } from "next";
import { AI_AGENT_PATH, LANG_PATH, SITE_URL } from "@/lib/site";

// Home page and the AI-agent offer page, each in two languages linked via hreflang.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE_URL}${LANG_PATH.en}`, ru: `${SITE_URL}${LANG_PATH.ru}` };
  const agent = { en: `${SITE_URL}${AI_AGENT_PATH.en}`, ru: `${SITE_URL}${AI_AGENT_PATH.ru}` };
  return [
    { url: languages.en, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: languages.ru, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
    { url: agent.en, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8, alternates: { languages: agent } },
    { url: agent.ru, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8, alternates: { languages: agent } },
  ];
}
