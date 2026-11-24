// "Integrations I connect" section on the landing. Each group is a card with a list of services
// (logo + name); the last
// group (personal AI agent) is a link card to its own page (AI_AGENT_PATH).
// Some items are Russia-only services (MAX, ЮMoney, Robokassa, YandexGPT…): they appear in RU only.

import type { Lang } from "@/lib/content";

// Each item is a name plus its mark: a simple-icons glyph (key of BRAND_ICONS) or, for brands not in
// simple-icons, a short monogram on the brand colour.
export type IntegrationItem = { name: string; icon?: string; mono?: [string, string] };
export type IntegrationGroup = { title: string; items: IntegrationItem[] };

// name -> mark, shared by both languages (unknown names get a neutral monogram).
export const MARKS: Record<string, Omit<IntegrationItem, "name">> = {
  "Битрикс24": { mono: ["Б24", "#2FC6F6"] },
  Bitrix24: { mono: ["B24", "#2FC6F6"] },
  amoCRM: { mono: ["amo", "#1F7AF2"] },
  HubSpot: { icon: "hubspot" },
  "Context Whisper CRM": { mono: ["CW", "#b35d39"] },
  PayPal: { icon: "paypal" },
  Stripe: { icon: "stripe" },
  "ЮKassa": { mono: ["Ю", "#0070F0"] },
  "Робокасса": { mono: ["R", "#00A0E3"] },
  Instagram: { icon: "instagram" },
  Threads: { icon: "threads" },
  Facebook: { icon: "facebook" },
  "X (Twitter)": { icon: "x" },
  Telegram: { icon: "telegram" },
  WhatsApp: { icon: "whatsapp" },
  Messenger: { icon: "messenger" },
  MAX: { mono: ["M", "#6D4AFF"] },
  Claude: { icon: "claude" },
  ChatGPT: { mono: ["G", "#10A37F"] },
  DeepSeek: { icon: "deepseek" },
  Grok: { mono: ["Gk", "#111111"] },
  "WhatsApp Business API": { icon: "whatsapp" },
  "Meta Ads": { icon: "meta" },
  "Google Ads": { icon: "googleads" },
  "E-mail": { icon: "gmail" },
  Email: { icon: "gmail" },
  "Google Search Console": { icon: "google-g" }, // multicolour Google "G", drawn in Integrations.tsx
  "Яндекс Вебмастер": { mono: ["Я", "#FC3F1D"] },
  "Yandex Webmaster": { mono: ["Y", "#FC3F1D"] },
};

export type IntegrationsCopy = {
  eyebrow: string;
  title: string;
  text: string;
  groups: { title: string; items: string[] }[];
  agent: { title: string; text: string; more: string };
};

export const INTEGRATIONS: Record<Lang, IntegrationsCopy> = {
  ru: {
    eyebrow: "Интеграции",
    title: "С чем я работаю и что подключаю",
    text: "Связываю CRM, оплаты, соцсети, мессенджеры и ИИ в одну систему, которая работает без ручной рутины.",
    groups: [
      { title: "CRM", items: ["Битрикс24", "amoCRM", "HubSpot", "Context Whisper CRM"] },
      { title: "Платёжные системы", items: ["PayPal", "Stripe", "ЮKassa", "Робокасса"] },
      { title: "Соцсети и автоматизация", items: ["Instagram", "Threads", "Facebook", "X (Twitter)"] },
      { title: "Мессенджеры и боты", items: ["Telegram", "WhatsApp", "Messenger", "MAX"] },
      { title: "ИИ-агенты и модели", items: ["Claude", "ChatGPT", "DeepSeek", "Grok"] },
      { title: "API Meta и реклама", items: ["WhatsApp Business API", "Meta Ads", "Google Ads"] },
      { title: "Рассылки", items: ["WhatsApp", "Telegram", "MAX", "E-mail"] },
      { title: "SEO и аналитика", items: ["Google Search Console", "Яндекс Вебмастер"] },
    ],
    agent: {
      title: "Персональный ИИ-агент для предпринимателя",
      text: "Настраиваю ИИ-ассистента, который работает с вашей базой клиентов, CRM и мессенджерами и берёт рутину на себя.",
      more: "Как я настраиваю агента",
    },
  },
  en: {
    eyebrow: "Integrations",
    title: "What I work with and connect",
    text: "I tie CRMs, payments, social networks, messengers and AI into one system that runs without manual busywork.",
    groups: [
      { title: "CRM", items: ["HubSpot", "Bitrix24", "amoCRM", "Context Whisper CRM"] },
      { title: "Payments", items: ["Stripe", "PayPal"] },
      { title: "Social media automation", items: ["Instagram", "Threads", "Facebook", "X (Twitter)"] },
      { title: "Messengers & bots", items: ["WhatsApp", "Telegram", "Messenger"] },
      { title: "AI agents & models", items: ["Claude", "ChatGPT", "DeepSeek", "Grok"] },
      { title: "Meta APIs & ads", items: ["WhatsApp Business API", "Meta Ads", "Google Ads"] },
      { title: "Broadcasts", items: ["WhatsApp", "Telegram", "Email"] },
      { title: "SEO & analytics", items: ["Google Search Console", "Yandex Webmaster"] },
    ],
    agent: {
      title: "A personal AI agent for business owners",
      text: "I set up an AI assistant that works with your client base, CRM and messengers and takes the routine off your plate.",
      more: "How I set up the agent",
    },
  },
};
