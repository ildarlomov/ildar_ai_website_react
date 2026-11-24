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
  "ЮMoney": { mono: ["Ю", "#8B3FFD"] },
  "ЮKassa": { mono: ["Ю", "#0070F0"] },
  "Робокасса": { mono: ["R", "#00A0E3"] },
  LavaTop: { mono: ["L", "#7B5CFF"] },
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
  Gemini: { icon: "googlegemini" },
  DeepSeek: { icon: "deepseek" },
  Kimi: { icon: "kimi" },
  Qwen: { icon: "qwen" },
  Grok: { mono: ["Gk", "#111111"] },
  Mistral: { icon: "mistralai" },
  Llama: { icon: "meta" },
  YandexGPT: { mono: ["Я", "#FC3F1D"] },
  GigaChat: { mono: ["G", "#21A038"] },
  "Meta Graph API": { icon: "meta" },
  "WhatsApp Business API": { icon: "whatsapp" },
  "Instagram Business API": { icon: "instagram" },
  "Meta Ads": { icon: "meta" },
  "Google Ads": { icon: "googleads" },
  "E-mail": { icon: "gmail" },
  Email: { icon: "gmail" },
  "Реактивация базы CRM": { mono: ["↻", "#b35d39"] },
  "CRM base reactivation": { mono: ["↻", "#b35d39"] },
  "Google Search Console": { icon: "googlesearchconsole" },
  "Яндекс Вебмастер": { mono: ["Я", "#FC3F1D"] },
  "Yandex Webmaster": { mono: ["Y", "#FC3F1D"] },
  "Яндекс Метрика": { mono: ["Я", "#FC3F1D"] },
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
      { title: "Платёжные системы", items: ["PayPal", "Stripe", "ЮMoney", "ЮKassa", "Робокасса", "LavaTop"] },
      { title: "Соцсети и автоматизация", items: ["Instagram", "Threads", "Facebook", "X (Twitter)"] },
      { title: "Мессенджеры и боты", items: ["Telegram", "WhatsApp", "Messenger", "MAX"] },
      { title: "ИИ-агенты и модели", items: ["Claude", "ChatGPT", "Gemini", "DeepSeek", "Kimi", "Qwen", "Grok", "Mistral", "Llama", "YandexGPT", "GigaChat"] },
      { title: "API Meta и реклама", items: ["Meta Graph API", "WhatsApp Business API", "Instagram Business API", "Meta Ads", "Google Ads"] },
      { title: "Рассылки и реактивация базы", items: ["WhatsApp", "Telegram", "MAX", "E-mail", "Реактивация базы CRM"] },
      { title: "SEO и аналитика", items: ["Google Search Console", "Яндекс Вебмастер", "Яндекс Метрика"] },
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
      { title: "Payments", items: ["Stripe", "PayPal", "LavaTop"] },
      { title: "Social media automation", items: ["Instagram", "Threads", "Facebook", "X (Twitter)"] },
      { title: "Messengers & bots", items: ["WhatsApp", "Telegram", "Messenger"] },
      { title: "AI agents & models", items: ["Claude", "ChatGPT", "Gemini", "DeepSeek", "Kimi", "Qwen", "Grok", "Mistral", "Llama"] },
      { title: "Meta APIs & ads", items: ["Meta Graph API", "WhatsApp Business API", "Instagram Business API", "Meta Ads", "Google Ads"] },
      { title: "Broadcasts & base reactivation", items: ["WhatsApp", "Telegram", "Email", "CRM base reactivation"] },
      { title: "SEO & analytics", items: ["Google Search Console", "Yandex Webmaster"] },
    ],
    agent: {
      title: "A personal AI agent for business owners",
      text: "I set up an AI assistant that works with your client base, CRM and messengers and takes the routine off your plate.",
      more: "How I set up the agent",
    },
  },
};
