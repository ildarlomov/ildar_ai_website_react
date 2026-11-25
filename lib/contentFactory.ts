// Copy for the "video content factory" deck (components/funnels/ContentFactory.tsx).
// Presented as Ildar's own service (white-label: no partner names or links anywhere on the site).
// Facts: production process, per-avatar output and growth benchmarks, and two live accounts with
// public dashboards (numbers as of Nov 2026). Frames in public/content-factory/ are real reels.

import type { Lang } from "@/lib/content";
import type { SlideText } from "@/components/SlideDeck";

export type FactoryAccount = { handle: string; niche: string; followers: string; views: string; er: string; img: string; dashboard: string; instagram: string };

export type FactoryCopy = {
  nav: string; // sitemap label
  label: string;
  prev: string;
  next: string;
  cta: string;
  slides: SlideText[]; // 7
  facts: { value: string; label: string }[]; // intro
  hooks: { title: string; text: string; views: string }[]; // trendwatching mock
  hooksTitle: string;
  avatarTags: string[];
  production: { tags: string[] };
  publish: { device: string; geo: string; daily: string };
  growth: { period: string; stage: string; reach: string; mult?: string }[];
  growthNote: string;
  accounts: FactoryAccount[];
  stat: { followers: string; views: string; er: string };
  links: { dashboard: string; instagram: string };
};

const ACCOUNTS = {
  honeycove: {
    handle: "@ai.honeycove",
    followers: "211.7K",
    views: "60.8M",
    er: "4.14%",
    img: "/content-factory/tw-05.webp",
    dashboard: "https://trendwatch-app.fly.dev/share/client/367f806f-7842-4a49-920b-14ca457fa0e3",
    instagram: "https://www.instagram.com/ai.honeycove/",
  },
  andrew: {
    handle: "@ai.with.andrew",
    followers: "144.8K",
    views: "30.5M",
    er: "4.29%",
    img: "/content-factory/acc-ai_with_andrew.webp",
    dashboard: "https://trendwatch-app.fly.dev/share/client/1043493e-6c5a-4575-874f-1826d04adcad",
    instagram: "https://www.instagram.com/ai.with.andrew/",
  },
};

export const FACTORY: Record<Lang, FactoryCopy> = {
  ru: {
    nav: "Контент-завод видеоконтента",
    label: "Контент-завод · видео",
    prev: "Предыдущий слайд",
    next: "Следующий слайд",
    cta: "Хочу контент-завод",
    slides: [
      {
        tag: "Контент-завод видеоконтента",
        title: "ИИ-инфлюенсер для вашего бренда: 60 роликов в месяц без съёмок",
        text:
          "Гиперреалистичный ведущий ведёт Instagram, TikTok и YouTube вашего бренда: растит органическую аудиторию и продаёт через нативные интеграции. Персонаж, аккаунты и аудитория остаются вашими.",
      },
      {
        tag: "Шаг 1 · Трендвотчинг",
        title: "Каждую неделю разбираем 100+ топовых аккаунтов вашей ниши",
        text: "Смотрим, какие хуки, форматы и темы залетают прямо сейчас. Лучшие сразу идут в контент-план вашего аватара.",
      },
      {
        tag: "Шаг 2 · ИИ-аватар",
        title: "Гиперреалистичный ведущий под вашу нишу или цифровой двойник основателя",
        text: "Любой пол, возраст, язык и внешность. Зрители и алгоритмы воспринимают его как живого автора, а права на образ принадлежат вам.",
      },
      {
        tag: "Шаг 3 · Производство",
        title: "60 роликов в месяц на одного аватара",
        text: "Сценарии по трендам, формат «говорящая голова + вставки» и ручной покадровый монтаж. По качеству ролики не уступают топовым авторам в нише.",
      },
      {
        tag: "Шаг 4 · Публикация",
        title: "Каждый день с реальных айфонов в нужной стране",
        text: "Один телефон и своя eSIM на каждый аккаунт, около 180 публикаций в месяц в Instagram, TikTok и YouTube. Без ферм и эмуляторов, по правилам площадок.",
      },
      {
        tag: "Шаг 5 · Рост и продажи",
        title: "Охват растёт по нарастающей, а интеграции приводят клиентов",
        text: "Со второго месяца в ролики встраиваются обзоры, рекомендации и продакт-плейсмент со ссылками с отслеживанием. Отчёт каждую неделю и живой дашборд.",
      },
      {
        tag: "Живые аккаунты",
        title: "Реальные аккаунты, живые цифры",
        text: "Два ИИ-инфлюенсера с нашего контент-завода. Откройте дашборд, чтобы посмотреть статистику по каждому ролику.",
      },
    ],
    facts: [
      { value: "60", label: "роликов в месяц на аватара" },
      { value: "3", label: "площадки: Instagram, TikTok, YouTube" },
      { value: "0", label: "съёмок с вашей стороны" },
    ],
    hooksTitle: "Что залетает в нише на этой неделе",
    hooks: [
      { title: "«3 ИИ-инструмента, которые заменят ассистента»", text: "список · 30 сек", views: "2.1M" },
      { title: "«Я проверил это за вас»", text: "обзор · говорящая голова", views: "1.4M" },
      { title: "«Никто не говорит об этой функции»", text: "хук-секрет · 20 сек", views: "980K" },
      { title: "«Как я сэкономил 10 часов в неделю»", text: "история · до/после", views: "760K" },
    ],
    avatarTags: ["Любой язык", "Любая внешность", "Права ваши"],
    production: { tags: ["Сценарии по трендам", "Говорящая голова + вставки", "Ручной монтаж"] },
    publish: { device: "iPhone · своя eSIM", geo: "Гео: США", daily: "Каждый день" },
    growth: [
      { period: "Месяцы 1–3", stage: "Разгон", reach: "2–7 млн охвата" },
      { period: "Месяцы 4–6", stage: "Ускорение", reach: "3–11 млн охвата", mult: "×1.5" },
      { period: "Месяцы 7–12", stage: "Масштаб", reach: "6–21 млн охвата", mult: "×3" },
    ],
    growthNote: "Средние ориентиры на одного аватара, не гарантия.",
    accounts: [
      { ...ACCOUNTS.honeycove, niche: "ИИ-инструменты" },
      { ...ACCOUNTS.andrew, niche: "ИИ-новости" },
    ],
    stat: { followers: "подписчиков", views: "просмотров", er: "вовлечённость" },
    links: { dashboard: "Живой дашборд", instagram: "Instagram" },
  },
  en: {
    nav: "Video content factory",
    label: "Content factory · video",
    prev: "Previous slide",
    next: "Next slide",
    cta: "I want a content factory",
    slides: [
      {
        tag: "Video content factory",
        title: "An AI influencer for your brand: 60 videos a month, no filming",
        text:
          "A hyper-realistic host runs your brand's Instagram, TikTok and YouTube: grows an organic audience and sells through native integrations. The character, the accounts and the audience stay yours.",
      },
      {
        tag: "Step 1 · Trendwatching",
        title: "Every week we break down 100+ top accounts in your niche",
        text: "We look at which hooks, formats and topics are taking off right now. The best ones go straight into your avatar's content plan.",
      },
      {
        tag: "Step 2 · AI avatar",
        title: "A hyper-realistic host for your niche, or a digital twin of the founder",
        text: "Any gender, age, language and look. Viewers and algorithms treat it as a real creator, and you own the rights to the character.",
      },
      {
        tag: "Step 3 · Production",
        title: "60 videos a month per avatar",
        text: "Trend-driven scripts, a talking-head-plus-b-roll format and manual, frame-by-frame editing. Quality on par with the top creators in the niche.",
      },
      {
        tag: "Step 4 · Publishing",
        title: "Every day, from real iPhones in the right country",
        text: "One phone and its own eSIM per account, about 180 posts a month across Instagram, TikTok and YouTube. No farms, no emulators, within platform rules.",
      },
      {
        tag: "Step 5 · Growth & sales",
        title: "Reach compounds, and integrations bring in clients",
        text: "From month two, videos carry reviews, recommendations and product placement with tracked links. A weekly report and a live dashboard.",
      },
      {
        tag: "Live accounts",
        title: "Real accounts, live numbers",
        text: "Two AI influencers from our content factory. Open a dashboard to see the stats for every video.",
      },
    ],
    facts: [
      { value: "60", label: "videos a month per avatar" },
      { value: "3", label: "platforms: Instagram, TikTok, YouTube" },
      { value: "0", label: "shoots on your side" },
    ],
    hooksTitle: "What's taking off in the niche this week",
    hooks: [
      { title: "\"3 AI tools that replace an assistant\"", text: "listicle · 30 sec", views: "2.1M" },
      { title: "\"I tested this so you don't have to\"", text: "review · talking head", views: "1.4M" },
      { title: "\"Nobody talks about this feature\"", text: "secret hook · 20 sec", views: "980K" },
      { title: "\"How I saved 10 hours a week\"", text: "story · before/after", views: "760K" },
    ],
    avatarTags: ["Any language", "Any look", "Rights are yours"],
    production: { tags: ["Trend-driven scripts", "Talking head + b-roll", "Manual editing"] },
    publish: { device: "iPhone · own eSIM", geo: "GEO: US", daily: "Every day" },
    growth: [
      { period: "Months 1–3", stage: "Ramp-up", reach: "2–7M reach" },
      { period: "Months 4–6", stage: "Momentum", reach: "3–11M reach", mult: "×1.5" },
      { period: "Months 7–12", stage: "Scale", reach: "6–21M reach", mult: "×3" },
    ],
    growthNote: "Average benchmarks per avatar, not a guarantee.",
    accounts: [
      { ...ACCOUNTS.honeycove, niche: "AI tools" },
      { ...ACCOUNTS.andrew, niche: "AI news" },
    ],
    stat: { followers: "followers", views: "views", er: "engagement" },
    links: { dashboard: "Live dashboard", instagram: "Instagram" },
  },
};
