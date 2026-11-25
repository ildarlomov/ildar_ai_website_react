// Structured data (schema.org JSON-LD) for search engines and AI assistants. Invisible to visitors.
// One graph per page: the Person (Ildar), his services business, the site and the page itself, all
// linked by @id, so Google/Yandex/Bing/LLMs can tie the site to his profiles elsewhere (sameAs) and
// to both spellings of his name. Rendered by <JsonLd> (components/JsonLd.tsx) on every page.

import type { Lang } from "@/lib/content";
import { AI_AGENT_PATH, DESCRIPTION, DESCRIPTION_RU, LANG_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#service`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// His own public profiles (checked 2026-11-25). Add Habr here once there's a profile URL.
export const SAME_AS = [
  "https://www.linkedin.com/in/ildarlomov/",
  "https://www.youtube.com/@ildarai",
  "https://www.threads.net/@ildar.ai",
  "https://www.instagram.com/ildar.ai",
  "https://t.me/ilomov",
  "https://github.com/ildarlomov",
];

const NAME = { en: "Ildar Lomov", ru: "Ильдар Ломов" } as const;
const JOB = { en: "Technical entrepreneur, former Head of AI", ru: "Технический предприниматель, бывший руководитель AI" } as const;

function person(lang: Lang) {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: NAME[lang],
    alternateName: [NAME[lang === "en" ? "ru" : "en"], "Ildar Lomov", "Ильдар Ломов", "ildar.ai"].filter((n, i, a) => n !== NAME[lang] && a.indexOf(n) === i),
    givenName: lang === "ru" ? "Ильдар" : "Ildar",
    familyName: lang === "ru" ? "Ломов" : "Lomov",
    jobTitle: JOB[lang],
    url: `${SITE_URL}${LANG_PATH[lang] === "/" ? "" : LANG_PATH[lang]}`,
    image: `${SITE_URL}/hero.jpg`,
    email: "mailto:ildarlomov.f@gmail.com",
    sameAs: SAME_AS,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: lang === "ru" ? "НИУ «Высшая школа экономики»" : "HSE University",
      sameAs: "https://www.hse.ru/",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: lang === "ru" ? "Магистр, прикладная математика и информатика (2020)" : "Master's degree, Applied Mathematics and Computer Science (2020)",
    },
    knowsAbout: ["AI agents", "Claude", "ChatGPT", "Telegram bots", "WhatsApp automation", "CRM integration", "Sales funnels", "Data science"],
    knowsLanguage: ["ru", "en"],
  };
}

function service(lang: Lang) {
  return {
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: NAME[lang],
    url: SITE_URL,
    description: lang === "ru" ? DESCRIPTION_RU : DESCRIPTION,
    image: `${SITE_URL}/hero.jpg`,
    telephone: "+351912094137",
    email: "ildarlomov.f@gmail.com",
    address: { "@type": "PostalAddress", streetAddress: "Rua Martins Barata 3", postalCode: "1400-247", addressLocality: "Lisbon", addressCountry: "PT" },
    areaServed: "Worldwide",
    availableLanguage: ["English", "Russian"],
    founder: { "@id": PERSON_ID },
    sameAs: SAME_AS,
  };
}

function website() {
  return { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE_URL, name: SITE_NAME, inLanguage: ["en", "ru"], publisher: { "@id": PERSON_ID } };
}

type Page = "home" | "ai-agent";

export function buildJsonLd(lang: Lang, page: Page) {
  const path = page === "home" ? LANG_PATH[lang] : AI_AGENT_PATH[lang];
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const graph: Record<string, unknown>[] = [website(), person(lang), service(lang)];

  if (page === "home") {
    // The home page is "about" Ildar: a profile page whose main entity is the Person.
    graph.push({ "@type": "ProfilePage", "@id": `${url}#page`, url, inLanguage: lang, isPartOf: { "@id": WEBSITE_ID }, mainEntity: { "@id": PERSON_ID }, about: { "@id": PERSON_ID } });
  } else {
    graph.push({
      "@type": "Service",
      "@id": `${url}#offer`,
      name: lang === "ru" ? "Настройка персонального ИИ-агента на Claude или ChatGPT" : "Personal AI agent setup on Claude or ChatGPT",
      serviceType: lang === "ru" ? "Консультация и настройка ИИ-агента" : "AI agent consultation and setup",
      provider: { "@id": PERSON_ID },
      areaServed: "Worldwide",
      offers: { "@type": "Offer", price: "400", priceCurrency: "EUR", url },
    });
    graph.push({ "@type": "WebPage", "@id": `${url}#page`, url, inLanguage: lang, isPartOf: { "@id": WEBSITE_ID }, about: { "@id": `${url}#offer` }, author: { "@id": PERSON_ID } });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
