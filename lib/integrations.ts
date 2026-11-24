// "Integrations I connect" section on the landing. Each group is a card with chips; the last
// group (personal AI agent) is a link card to its own page (AI_AGENT_PATH).
// Some chips are Russia-only services (MAX, ЮMoney, Robokassa, YandexGPT…): they appear in RU only.

import type { Lang } from "@/lib/content";

export type IntegrationGroup = { title: string; items: string[] };

export type IntegrationsCopy = {
  eyebrow: string;
  title: string;
  text: string;
  groups: IntegrationGroup[];
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
