// Offer page: "Personal AI agent setup" consultation (/ai-agent, /ru/ai-agent).
// Facts from Ildar (2026-11-24): 400 € for 1–2 calls + unlimited chat support; first call 1.5–3 h
// (usually ~2): theory, then remote setup on the client's computer; Claude (Claude Code) or
// ChatGPT (Codex); the agent runs on the computer, is controlled from the phone and by voice,
// can drive the browser. The AI subscription is the client's own. Client prepares: Windows/macOS
// computer, Remote Desktop app, Google Chrome logged into the accounts the agent should use.

import type { Lang } from "@/lib/content";

type Stage = {
  badge: string; // "Call 1"
  meta: string; // "1.5–3 hours"
  parts: { title: string; text: string; points?: string[] }[];
  note?: string;
};

export type AiAgentCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  tasksLabel: string;
  tasks: string[];
  price: { amount: string; label: string; includes: string[]; cta: string; ctaHref: string; ctaAlt: string };
  how: { title: string; stages: Stage[] };
  result: { title: string; items: string[]; outro: string };
  faq: { title: string; items: { q: string; a: string; list?: string[] }[] };
};

export const AI_AGENT: Record<Lang, AiAgentCopy> = {
  ru: {
    metaTitle: "Настройка персонального ИИ-агента на Claude или ChatGPT — консультация, 400 €",
    metaDescription:
      "Настрою универсального ИИ-агента на Claude или ChatGPT прямо на вашем компьютере: теория, настройка под ключ, управление с телефона и голосом, безлимитная поддержка в чате. 400 €.",
    eyebrow: "Консультация · Claude или ChatGPT",
    title: "Настрою вам персонального ИИ-агента, который работает на вас 24/7",
    lead:
      "Универсальный сотрудник на Claude (Claude Code) или ChatGPT (Codex): живёт на вашем компьютере, управляет браузером, слушается вас с телефона и голосом. Всё, на что раньше вы бы нанимали фрилансера или ассистента, теперь можно поручить агенту.",
    tasksLabel: "Например, агент может",
    tasks: [
      "Искать клиентов",
      "Сделать сайт",
      "Настроить рекламу",
      "Составить контент-план",
      "Прокачать ваш блог",
      "Следить за работой команды",
      "Отвечать в Slack и Telegram",
      "Записать вас к врачу",
    ],
    price: {
      amount: "400 €",
      label: "под ключ",
      includes: ["1–2 созвона, первый 1,5–3 часа", "Теория: как устроены ИИ-агенты", "Настройка на вашем компьютере при вас", "Агент в вашем телефоне", "Безлимитная поддержка в чате"],
      cta: "Записаться в Telegram",
      ctaHref: "https://t.me/ilomov",
      ctaAlt: "Оставить заявку на сайте",
    },
    how: {
      title: "Как проходит консультация",
      stages: [
        {
          badge: "Созвон 1",
          meta: "1,5–3 часа",
          parts: [
            {
              title: "Теория",
              text: "Объясняю, что такое ИИ-агент общего назначения и как он работает: всё, чтобы понимать его возможности и ограничения.",
            },
            {
              title: "Практика",
              text: "Подключаюсь к вашему компьютеру через Remote Desktop и настраиваю всё под ключ при вас, объясняя каждый шаг.",
              points: ["Агент на Claude или ChatGPT", "Управление браузером", "Управление с телефона и голосом"],
            },
          ],
          note: "По ходу разбираем ваши идеи, где применить агента. В 99% случаев ответ — можно.",
        },
        {
          badge: "Созвон 2",
          meta: "если нужен",
          parts: [{ title: "Закрепляем", text: "Доводим настройку и разбираем ваши задачи на живых примерах." }],
        },
        {
          badge: "Чат",
          meta: "без ограничений",
          parts: [{ title: "Поддержка", text: "Отвечаю на вопросы в чате, пока вы осваиваете агента в работе." }],
        },
      ],
    },
    result: {
      title: "Что у вас будет в итоге",
      items: [
        "Работающий ИИ-агент на вашем компьютере",
        "Управление им с телефона, текстом и голосом",
        "Понимание, что агент умеет и где его пределы",
        "Список задач, которые можно отдать агенту уже сейчас",
        "Безлимитная поддержка в чате",
      ],
      outro: "Скорее всего, на большинство задач вы больше не захотите нанимать фрилансера или сотрудника.",
    },
    faq: {
      title: "Популярные вопросы",
      items: [
        { q: "Какого агента вы настраиваете?", a: "Claude (Claude Code) или ChatGPT (Codex) — выбираем под ваши задачи и подписку." },
        {
          q: "Что нужно от меня?",
          a: "Подготовьте к созвону:",
          list: [
            "Компьютер или ноутбук на Windows или macOS",
            "Установленное приложение Remote Desktop для удалённого доступа",
            "Google Chrome",
            "Вход в Chrome во все аккаунты, с которыми должен работать агент: CRM-системы, Instagram, Facebook, WhatsApp Web, Telegram Web",
            "Подписку на Claude или ChatGPT (оформляете и оплачиваете сами)",
            "Телефон, с которого будете управлять агентом",
          ],
        },
        { q: "Сколько длится?", a: "Первый созвон 1,5–3 часа, обычно около двух. Если нужно, второй созвон. Поддержка в чате без ограничений." },
        { q: "Мне нужно разбираться в программировании?", a: "Нет. Всё настраиваю я, а вы по ходу понимаете, как это работает и как этим пользоваться." },
      ],
    },
  },
  en: {
    metaTitle: "Personal AI agent setup on Claude or ChatGPT — consultation, €400",
    metaDescription:
      "I set up a general-purpose AI agent on Claude or ChatGPT right on your computer: theory, done-for-you setup, control from your phone and by voice, unlimited chat support. €400.",
    eyebrow: "Consultation · Claude or ChatGPT",
    title: "I'll set up a personal AI agent that works for you 24/7",
    lead:
      "A general-purpose employee on Claude (Claude Code) or ChatGPT (Codex): it lives on your computer, drives the browser and takes orders from your phone and by voice. Whatever you'd have hired a freelancer or an assistant for, you can now hand to the agent.",
    tasksLabel: "For example, the agent can",
    tasks: [
      "Find clients",
      "Build a website",
      "Set up ads",
      "Draft a content plan",
      "Grow your blog",
      "Keep an eye on your team",
      "Reply in Slack and Telegram",
      "Book a doctor's appointment",
    ],
    price: {
      amount: "€400",
      label: "done for you",
      includes: ["1–2 calls, the first one 1.5–3 hours", "Theory: how AI agents work", "Setup on your computer, with you", "The agent on your phone", "Unlimited chat support"],
      cta: "Book on WhatsApp",
      ctaHref: "https://wa.me/351912094137",
      ctaAlt: "Leave a request on the site",
    },
    how: {
      title: "How the consultation works",
      stages: [
        {
          badge: "Call 1",
          meta: "1.5–3 hours",
          parts: [
            {
              title: "Theory",
              text: "I explain what a general-purpose AI agent is and how it works: everything you need to understand what it can and can't do.",
            },
            {
              title: "Practice",
              text: "I connect to your computer via Remote Desktop and set everything up while you watch, explaining each step.",
              points: ["An agent on Claude or ChatGPT", "Browser control", "Control from your phone and by voice"],
            },
          ],
          note: "Along the way we go through your ideas for using the agent. In 99% of cases the answer is yes.",
        },
        {
          badge: "Call 2",
          meta: "if needed",
          parts: [{ title: "Lock it in", text: "We polish the setup and work through your tasks on real examples." }],
        },
        {
          badge: "Chat",
          meta: "no limits",
          parts: [{ title: "Support", text: "I answer your questions in chat while you put the agent to work." }],
        },
      ],
    },
    result: {
      title: "What you end up with",
      items: [
        "A working AI agent on your computer",
        "Control from your phone, by text and by voice",
        "A clear picture of what the agent can do and where its limits are",
        "A list of tasks you can hand to the agent right away",
        "Unlimited chat support",
      ],
      outro: "Chances are you won't want to hire a freelancer or an employee for most tasks anymore.",
    },
    faq: {
      title: "Popular questions",
      items: [
        { q: "Which agent do you set up?", a: "Claude (Claude Code) or ChatGPT (Codex), whichever fits your tasks and subscription." },
        {
          q: "What do I need?",
          a: "Have these ready for the call:",
          list: [
            "A computer or laptop on Windows or macOS",
            "The Remote Desktop app installed for remote access",
            "Google Chrome",
            "Chrome signed in to every account the agent should work with: CRMs, Instagram, Facebook, WhatsApp Web, Telegram Web",
            "A Claude or ChatGPT subscription (you sign up and pay for it yourself)",
            "A phone to control the agent from",
          ],
        },
        { q: "How long does it take?", a: "The first call is 1.5–3 hours, usually about two. A second call if needed. Chat support with no limits." },
        { q: "Do I need to know how to code?", a: "No. I set everything up, and along the way you learn how it works and how to use it." },
      ],
    },
  },
};
