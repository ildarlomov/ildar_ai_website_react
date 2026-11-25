import type { Metadata } from "next";
import Landing from "@/components/Landing";
import JsonLd from "@/components/JsonLd";
import { DESCRIPTION_RU, LANG_PATH, SITE_NAME, SITE_URL, TITLE_RU } from "@/lib/site";

// Russian version of the landing. Same component, own URL, so search engines index it.
// Child metadata replaces these objects wholesale, so they are spelled out in full.
export const metadata: Metadata = {
  title: TITLE_RU,
  description: DESCRIPTION_RU,
  alternates: {
    canonical: LANG_PATH.ru,
    languages: { en: LANG_PATH.en, ru: LANG_PATH.ru, "x-default": LANG_PATH.en },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${LANG_PATH.ru}`,
    siteName: SITE_NAME,
    title: TITLE_RU,
    description: DESCRIPTION_RU,
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Ильдар Ломов — боты, ИИ-агенты и автоматизация, Лиссабон" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_RU,
    description: DESCRIPTION_RU,
    images: ["/og.jpg"],
  },
};

export default function RuHome() {
  return (
    <>
      <JsonLd lang="ru" page="home" />
      <Landing lang="ru" />
    </>
  );
}
