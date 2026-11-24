// Offer page: "Personal AI agent setup" consultation (/ai-agent, /ru/ai-agent).
// Facts from Ildar (2026-11-24): 400 € for 1–2 calls + unlimited chat support; first call 1.5–3 h
// (usually ~2): theory, then remote setup on the client's computer; Claude (Claude Code) or
// ChatGPT (Codex); the agent runs on the computer, is controlled from the phone and by voice,
// can drive the browser. The AI subscription is the client's own.

import type { Lang } from "@/lib/content";

export type AiAgentCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  price: { amount: string; label: string; includes: string[]; cta: string; ctaHref: string; ctaAlt: string };
  what: { title: string; text: string; tasks: string[]; note: string };
  how: { title: string; steps: { badge: string; title: string; text: string; points?: string[] }[] };
  result: { title: string; items: string[]; outro: string };
  faq: { title: string; items: { q: string; a: string }[] };
  back: string;
};

export const AI_AGENT: Record<Lang, AiAgentCopy> = {
  ru: {
    metaTitle: "Настройка персонального ИИ-агента на Claude или ChatGPT — консультация, 400 €",
    metaDescription:
      "Настрою универсального ИИ-агента на Claude или ChatGPT прямо на вашем компьютере: теория, настройка под ключ, управление с телефона и голосом, безлимитная поддержка в чате. 400 €.",
    eyebrow: "Консультация · Claude или ChatGPT",
    title: "Настрою вам персонального ИИ-агента, который работает на вас 24/7",
    lead:
      "Универсальный агент на Claude (Claude Code) или ChatGPT (Codex) живёт на вашем компьютере, управляет браузером, слушается вас с телефона и голосом и берёт на себя почти любые задачи — личные и рабочие.",
    price: {
      amount: "400 €",
      label: "под ключ",
      includes: ["1–2 созвона, первый 1,5–3 часа", "Теория: как устроены ИИ-агенты", "Настройка на вашем компьютере при вас", "Агент в вашем телефоне", "Безлимитная поддержка в чате"],
      cta: "Записаться в Telegram",
      ctaHref: "https://t.me/ilomov",
      ctaAlt: "Оставить заявку на сайте",
    },
    what: {
      title: "Ваш личный сотрудник, который не спит",
      text:
        "ИИ-агент — это универсальный сотрудник. Он готов выполнять задачи в любое время, без выходных и отпусков: нужна только подписка на Claude или ChatGPT. Всё, на что раньше вы бы нанимали фрилансера или ассистента, теперь можно поручить агенту.",
      tasks: [
        "Искать клиентов",
        "Сделать сайт",
        "Настроить рекламу",
        "Составить медиаплан и контент-план",
        "Разобрать ваш блог и предложить, как его улучшить",
        "Следить за работой команды",
        "Отвечать в Slack и Telegram",
        "Записать вас к врачу",
      ],
      note: "Это примеры. Предел — ваша фантазия.",
    },
    how: {
      title: "Как проходит консультация",
      steps: [
        {
          badge: "Созвон 1 · часть 1",
          title: "Теория",
          text: "Объясняю, что такое ИИ-агент общего назначения и как он работает: всё, что нужно, чтобы понимать его возможности и ограничения.",
        },
        {
          badge: "Созвон 1 · часть 2",
          title: "Практика: настраиваю агента у вас",
          text:
            "Подключаюсь к вашему компьютеру через программу удалённого доступа и настраиваю всё под ключ прямо при вас, по ходу объясняя каждый шаг.",
          points: ["Агент на Claude или ChatGPT на вашем компьютере", "Управление браузером", "Управление с телефона и голосом"],
        },
        {
          badge: "По ходу",
          title: "Разбираем ваши идеи",
          text:
            "Пока мы настраиваем, у вас появится куча идей, где применить агента в бизнесе и жизни. Обсуждаем их сразу: можно ли так сделать? В 99% случаев ответ — можно.",
        },
        {
          badge: "Созвон 2 и чат",
          title: "Доводим и поддерживаю",
          text: "Если нужно, второй созвон, чтобы закрепить и разобрать ваши задачи. Дальше безлимитная поддержка в чате.",
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
      title: "Вопросы",
      items: [
        { q: "Какого агента вы настраиваете?", a: "Claude (Claude Code) или ChatGPT (Codex) — выбираем под ваши задачи и подписку." },
        { q: "Что нужно от меня?", a: "Компьютер, на котором будет жить агент, телефон и подписка на Claude или ChatGPT. Подписку вы оформляете и оплачиваете сами." },
        { q: "Сколько длится?", a: "Первый созвон 1,5–3 часа, обычно около двух. Если нужно, второй созвон. Поддержка в чате без ограничений." },
        { q: "Мне нужно разбираться в программировании?", a: "Нет. Всё настраиваю я, а вы по ходу понимаете, как это работает и как этим пользоваться." },
      ],
    },
    back: "На главную",
  },
  en: {
    metaTitle: "Personal AI agent setup on Claude or ChatGPT — consultation, €400",
    metaDescription:
      "I set up a general-purpose AI agent on Claude or ChatGPT right on your computer: theory, done-for-you setup, control from your phone and by voice, unlimited chat support. €400.",
    eyebrow: "Consultation · Claude or ChatGPT",
    title: "I'll set up a personal AI agent that works for you 24/7",
    lead:
      "A general-purpose agent on Claude (Claude Code) or ChatGPT (Codex) lives on your computer, drives the browser, takes orders from your phone and by voice, and handles almost any task, personal or business.",
    price: {
      amount: "€400",
      label: "done for you",
      includes: ["1–2 calls, the first one 1.5–3 hours", "Theory: how AI agents work", "Setup on your computer, with you", "The agent on your phone", "Unlimited chat support"],
      cta: "Book on WhatsApp",
      ctaHref: "https://wa.me/351912094137",
      ctaAlt: "Leave a request on the site",
    },
    what: {
      title: "A personal employee who never sleeps",
      text:
        "An AI agent is a general-purpose employee. It's ready to work any time, no weekends or holidays: all it needs is a Claude or ChatGPT subscription. Whatever you'd have hired a freelancer or an assistant for, you can now hand to the agent.",
      tasks: [
        "Find clients",
        "Build a website",
        "Set up ads",
        "Draft a media plan and content plan",
        "Review your blog and suggest how to improve it",
        "Keep an eye on your team's work",
        "Reply in Slack and Telegram",
        "Book you a doctor's appointment",
      ],
      note: "These are examples. The limit is your imagination.",
    },
    how: {
      title: "How the consultation works",
      steps: [
        {
          badge: "Call 1 · part 1",
          title: "Theory",
          text: "I explain what a general-purpose AI agent is and how it works: everything you need to understand what it can and can't do.",
        },
        {
          badge: "Call 1 · part 2",
          title: "Practice: I set up the agent on your machine",
          text: "I connect to your computer with a remote-access app and set everything up while you watch, explaining each step as I go.",
          points: ["An agent on Claude or ChatGPT on your computer", "Browser control", "Control from your phone and by voice"],
        },
        {
          badge: "Along the way",
          title: "We go through your ideas",
          text:
            "While we set things up, you'll come up with plenty of ideas for using the agent in your business and life. We discuss them on the spot: can it do this? In 99% of cases the answer is yes.",
        },
        {
          badge: "Call 2 & chat",
          title: "Polish and support",
          text: "If needed, a second call to lock things in and work through your tasks. After that, unlimited chat support.",
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
      title: "Questions",
      items: [
        { q: "Which agent do you set up?", a: "Claude (Claude Code) or ChatGPT (Codex), whichever fits your tasks and subscription." },
        { q: "What do I need?", a: "A computer for the agent to live on, a phone, and a Claude or ChatGPT subscription. You sign up for and pay for the subscription yourself." },
        { q: "How long does it take?", a: "The first call is 1.5–3 hours, usually about two. A second call if needed. Chat support with no limits." },
        { q: "Do I need to know how to code?", a: "No. I set everything up, and along the way you learn how it works and how to use it." },
      ],
    },
    back: "Back to home",
  },
};
