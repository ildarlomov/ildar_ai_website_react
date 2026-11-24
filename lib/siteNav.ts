// Site-wide navigation: the header menu (capped, see SiteHeader) and the sitemap that the header's
// "Sitemap" panel and the footer both print. Home sections are anchors on the home page of the
// current language; pages are separate routes.

import { DICT, type Lang } from "@/lib/content";
import { FUNNELS } from "@/lib/funnels";
import { AI_AGENT_PATH, LANG_PATH, PRIVACY_PATH } from "@/lib/site";

export type NavLink = { href: string; label: string; keys?: string };

// Extra search words for the sitemap search (both languages; matched case-insensitively).
const KEYS: Record<string, string> = {
  home: "главная home старт",
  "funnel-instagram": "instagram инстаграм telegram телеграм reels рилс бот bot оплата payment воронка funnel курс",
  "funnel-threads": "threads тредс нейрокомментинг комментарии comments лиды leads воронка funnel crm",
  cases: "memcircle мемсеркл встречи meetings запись recorder транскрипт кейс case",
  services: "услуги services боты bots crm сайт website tilda рассылки mailings приложения apps",
  projects: "проекты projects walkie talkie context whisper приложение app ios macos windows chrome",
  integrations: "интеграции integrations битрикс bitrix amocrm hubspot stripe paypal оплата платежи payments whatsapp meta ads реклама seo google яндекс",
  about: "обо мне about диплом diploma вайбкодер vibe ильдар ildar",
  contact: "контакты contact заявка request телефон phone telegram whatsapp",
  agent: "ии агент ai agent claude chatgpt codex консультация consultation настройка setup 400",
  privacy: "политика privacy cookie конфиденциальность данные data",
};

// "/" + "#id" or "/ru" + "#id": works from any page, and on the home page it just scrolls.
const homeAnchor = (lang: Lang, id: string) => `${lang === "en" ? "/" : "/ru"}#${id}`;

const L = {
  ru: {
    sitemap: "Карта сайта",
    search: "Поиск по сайту",
    nothing: "Ничего не нашлось. Напишите мне — разберёмся.",
    menuMobile: "Меню",
    close: "Закрыть",
    homeTitle: "Главная",
    pagesTitle: "Страницы",
    home: [
      ["funnel-instagram", "Автоворонка Instagram + Telegram"],
      ["funnel-threads", "Автоворонка Threads"],
      ["cases", "Кейс Memcircle"],
      ["services", "Услуги"],
      ["projects", "Проекты"],
      ["integrations", "Интеграции"],
      ["about", "Обо мне"],
      ["contact", "Контакты"],
    ],
    pages: { home: "Главная", agent: "Настройка ИИ-агента · консультация", privacy: "Политика конфиденциальности" },
    featured: {
      instagram: ["Автоворонка Instagram + Telegram", "Ключевое слово под Reels → бот → оплата"],
      threads: ["Автоворонка Threads", "ИИ находит клиентов и пишет им 24/7"],
      memcircle: ["Кейс Memcircle", "AI-рекордер встреч на всех платформах"],
      agent: ["Персональный ИИ-агент", "Настрою под ключ за 1–2 созвона · 400 €"],
    },
    moreTitle: "Страницы",
  },
  en: {
    sitemap: "Sitemap",
    search: "Search the site",
    nothing: "Nothing found. Message me and we'll figure it out.",
    menuMobile: "Menu",
    close: "Close",
    homeTitle: "Home",
    pagesTitle: "Pages",
    home: [
      ["funnel-instagram", "Instagram + Telegram auto-funnel"],
      ["funnel-threads", "Threads auto-funnel"],
      ["cases", "Memcircle case"],
      ["services", "Services"],
      ["projects", "Projects"],
      ["integrations", "Integrations"],
      ["about", "About"],
      ["contact", "Contact"],
    ],
    pages: { home: "Home", agent: "AI agent setup · consultation", privacy: "Privacy policy" },
    featured: {
      instagram: ["Instagram + Telegram auto-funnel", "Keyword under a Reel → bot → payment"],
      threads: ["Threads auto-funnel", "AI finds clients and messages them 24/7"],
      memcircle: ["Memcircle case", "An AI meeting recorder on every platform"],
      agent: ["Personal AI agent", "Done-for-you setup in 1–2 calls · €400"],
    },
    moreTitle: "Pages",
  },
} as const;

export function siteNav(lang: Lang) {
  const l = L[lang];
  const t = DICT[lang]; // menu + CTA labels come from the landing's own copy (same as the original header)
  return {
    // Header menu: 4 items + "Sitemap" (Ildar, 2026-11-24: hard cap 5, never add more).
    menu: [
      { href: homeAnchor(lang, "cases"), label: t.nav.cases },
      { href: homeAnchor(lang, "funnel-instagram"), label: FUNNELS[lang].nav }, // first funnel on the page
      { href: homeAnchor(lang, "services"), label: t.nav.services },
      { href: homeAnchor(lang, "about"), label: t.nav.about },
    ] as NavLink[],
    contact: homeAnchor(lang, "contact"),
    labels: { search: l.search, nothing: l.nothing, sitemap: l.sitemap, menuMobile: l.menuMobile, close: l.close, cta: t.cta, homeTitle: l.homeTitle, pagesTitle: l.pagesTitle, moreTitle: l.moreTitle },
    // Header "Sitemap" panel: four big tiles for the main things, then the rest as pills.
    featured: [
      { key: "instagram", href: homeAnchor(lang, "funnel-instagram"), label: l.featured.instagram[0], desc: l.featured.instagram[1], keys: KEYS["funnel-instagram"] },
      { key: "threads", href: homeAnchor(lang, "funnel-threads"), label: l.featured.threads[0], desc: l.featured.threads[1], keys: KEYS["funnel-threads"] },
      { key: "memcircle", href: homeAnchor(lang, "cases"), label: l.featured.memcircle[0], desc: l.featured.memcircle[1], keys: KEYS.cases },
      { key: "agent", href: AI_AGENT_PATH[lang], label: l.featured.agent[0], desc: l.featured.agent[1], keys: KEYS.agent },
    ] as (NavLink & { key: "instagram" | "threads" | "memcircle" | "agent"; desc: string })[],
    // Full list under the tiles: every home section and every page, by name.
    more: [
      { href: LANG_PATH[lang], label: l.pages.home, keys: KEYS.home },
      ...l.home.map(([id, label]) => ({ href: homeAnchor(lang, id), label, keys: KEYS[id] })),
      { href: AI_AGENT_PATH[lang], label: l.pages.agent, keys: KEYS.agent },
      { href: PRIVACY_PATH[lang], label: l.pages.privacy, keys: KEYS.privacy },
    ] as NavLink[],
    // Sitemap groups, printed in the header panel and the footer.
    sections: l.home.map(([id, label]) => ({ href: homeAnchor(lang, id), label })) as NavLink[],
    pages: [
      { href: LANG_PATH[lang], label: l.pages.home },
      { href: AI_AGENT_PATH[lang], label: l.pages.agent },
      { href: PRIVACY_PATH[lang], label: l.pages.privacy },
    ] as NavLink[],
  };
}
