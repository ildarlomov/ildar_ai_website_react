// Single source of truth for site-wide SEO constants.

// Primary domain on Vercel: ildarlomov.com 308-redirects to www, so www is canonical.
export const SITE_URL = "https://www.ildarlomov.com";
export const SITE_NAME = "Ildar Lomov";

export const TITLE = "Ildar Lomov: Bots, AI agents & automation for business";
export const DESCRIPTION =
  "Messenger bots (WhatsApp, Telegram), AI agents, CRM setup (Bitrix24, amoCRM), mailings, Tilda websites and custom apps.";

export const TITLE_RU = "Ильдар Ломов: боты, ИИ-агенты и автоматизация для бизнеса";
export const DESCRIPTION_RU =
  "Боты для WhatsApp и Telegram, ИИ-агенты, настройка CRM (Битрикс24, amoCRM), рассылки, сайты на Tilda и приложения под ключ. Лиссабон, Португалия.";

// English lives at "/", Russian at "/ru". Both are declared to search engines via hreflang.
export const LANG_PATH = { en: "/", ru: "/ru" } as const;

export const PRIVACY_PATH = { en: "/privacy", ru: "/ru/privacy" } as const;

// localStorage key holding the cookie-banner choice ("granted" | "denied").
export const CONSENT_KEY = "cookie-consent";

// Explicit language choice from the header switcher; middleware.ts respects it over geo-detection.
export const LANG_COOKIE = "lang";

// Personal AI agent page (linked from the Integrations section).
export const AI_AGENT_PATH = { en: "/ai-agent", ru: "/ru/ai-agent" } as const;
