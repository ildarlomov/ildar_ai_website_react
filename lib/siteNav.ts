// Site-wide navigation: the header menu (capped, see SiteHeader) and the sitemap that the header's
// "Sitemap" panel and the footer both print. Home sections are anchors on the home page of the
// current language; pages are separate routes.

import { DICT, type Lang } from "@/lib/content";
import { FUNNELS } from "@/lib/funnels";
import { AI_AGENT_PATH, LANG_PATH, PRIVACY_PATH } from "@/lib/site";

export type NavLink = { href: string; label: string };

// "/" + "#id" or "/ru" + "#id": works from any page, and on the home page it just scrolls.
const homeAnchor = (lang: Lang, id: string) => `${lang === "en" ? "/" : "/ru"}#${id}`;

const L = {
  ru: {
    sitemap: "Карта сайта",
    menuMobile: "Меню",
    close: "Закрыть",
    homeTitle: "Главная",
    pagesTitle: "Страницы",
    home: [
      ["funnels", "Автоворонка Threads"],
      ["funnel-instagram", "Автоворонка Instagram + Telegram"],
      ["cases", "Кейс Memcircle"],
      ["services", "Услуги"],
      ["projects", "Проекты"],
      ["integrations", "Интеграции"],
      ["about", "Обо мне"],
      ["contact", "Контакты"],
    ],
    pages: { home: "Главная", agent: "Настройка ИИ-агента · консультация", privacy: "Политика конфиденциальности" },
  },
  en: {
    sitemap: "Sitemap",
    menuMobile: "Menu",
    close: "Close",
    homeTitle: "Home",
    pagesTitle: "Pages",
    home: [
      ["funnels", "Threads auto-funnel"],
      ["funnel-instagram", "Instagram + Telegram auto-funnel"],
      ["cases", "Memcircle case"],
      ["services", "Services"],
      ["projects", "Projects"],
      ["integrations", "Integrations"],
      ["about", "About"],
      ["contact", "Contact"],
    ],
    pages: { home: "Home", agent: "AI agent setup · consultation", privacy: "Privacy policy" },
  },
} as const;

export function siteNav(lang: Lang) {
  const l = L[lang];
  const t = DICT[lang]; // menu + CTA labels come from the landing's own copy (same as the original header)
  return {
    // Header menu: 4 items + "Sitemap" (Ildar, 2026-11-24: hard cap 5, never add more).
    menu: [
      { href: homeAnchor(lang, "cases"), label: t.nav.cases },
      { href: homeAnchor(lang, "funnels"), label: FUNNELS[lang].nav },
      { href: homeAnchor(lang, "services"), label: t.nav.services },
      { href: homeAnchor(lang, "about"), label: t.nav.about },
    ] as NavLink[],
    contact: homeAnchor(lang, "contact"),
    labels: { sitemap: l.sitemap, menuMobile: l.menuMobile, close: l.close, cta: t.cta, homeTitle: l.homeTitle, pagesTitle: l.pagesTitle },
    // Sitemap groups, printed in the header panel and the footer.
    sections: l.home.map(([id, label]) => ({ href: homeAnchor(lang, id), label })) as NavLink[],
    pages: [
      { href: LANG_PATH[lang], label: l.pages.home },
      { href: AI_AGENT_PATH[lang], label: l.pages.agent },
      { href: PRIVACY_PATH[lang], label: l.pages.privacy },
    ] as NavLink[],
  };
}
