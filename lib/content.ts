// All site copy lives here, in two languages. English is the default.

export type Lang = "en" | "ru";

export type SocialKey = "threads" | "telegram" | "whatsapp" | "instagram" | "youtube" | "linkedin";

// `url` may differ per language; `hideIn` removes the badge on those language versions.
export type Social = {
  key: SocialKey;
  label: string;
  url: string | Record<Lang, string>;
  followers: string;
  hideIn?: Lang[];
};

// Facts that are the same in both languages.
export const FACTS = {
  name: "Ildar Lomov",
  phone: "+351 912 094 137",
  phoneHref: "tel:+351912094137",
  whatsappHref: "https://wa.me/351912094137",
  email: "ildarlomov.f@gmail.com",
  linkedin: "https://www.linkedin.com/in/ildarlomov/",
  // Hero social badges. Empty followers = no count shown.
  socials: [
    { key: "threads", label: "Threads", url: "https://www.threads.net/@ildar.ai", followers: "1 650" },
    { key: "telegram", label: "Telegram", url: "https://t.me/+GFsl8836IWQzZWIy", followers: "415", hideIn: ["en"] },
    // EN → Portuguese number, RU → Kazakhstan number.
    {
      key: "whatsapp",
      label: "WhatsApp",
      url: { en: "https://wa.me/351912094137", ru: "https://wa.me/77058275089" },
      followers: "",
    },
    { key: "instagram", label: "Instagram", url: "https://www.instagram.com/ildar.ai", followers: "" },
    { key: "youtube", label: "YouTube", url: "https://www.youtube.com/@ildarai", followers: "" },
    { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/ildarlomov/", followers: "" },
  ] as Social[],
  nif: "316456124",
  addressLines: ["Rua Martins Barata 3", "1400-247 Lisbon, Portugal"],
  // Same order as `projects.items` in both languages below.
  projects: [
    { url: "https://walkietalkie.pro", host: "walkietalkie.pro" },
    { url: "https://memcircle.com", host: "memcircle.com" },
    { url: "https://memcircle.com/desktop", host: "memcircle.com/desktop" },
    { url: "https://memcircle.com/desktop", host: "memcircle.com/desktop" },
    {
      url: "https://chromewebstore.google.com/detail/memcircle/kinngkocjegmnpakmicaiflbilgikdbp",
      host: "Chrome Web Store",
    },
    { url: "https://memcircle.com/mobile", host: "memcircle.com/mobile" },
  ],
};

export type ServiceKey =
  | "bots"
  | "tilda"
  | "crm-integration"
  | "ai-agents"
  | "mailings"
  | "custom-crm"
  | "apps";

export const SERVICE_KEYS: ServiceKey[] = [
  "bots",
  "tilda",
  "crm-integration",
  "ai-agents",
  "mailings",
  "custom-crm",
  "apps",
];

type Service = { title: string; text: string; tags: string[] };

export type Dict = {
  htmlLang: string;
  nav: { cases: string; services: string; projects: string; about: string; contact: string };
  cta: string;
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    text: string;
    primary: string;
    secondary: string;
    caption: string;
  };
  cases: {
    eyebrow: string;
    title: string;
    hint: string;
    prev: string;
    next: string;
    open: string;
    demoNote: string;
    slides: { kicker: string; title: string; text: string }[];
    demo: {
      rec: string;
      noBot: string;
      platforms: string[];
      transcript: { who: string; text: string }[];
      summaryLabel: string;
      summary: string;
      keyLabel: string;
      keyPoints: string[];
      actionLabel: string;
      actions: string[];
      askLabel: string;
      question: string;
      answer: string;
    };
  };
  services: {
    eyebrow: string;
    title: string;
    items: Record<ServiceKey, Service>;
    moreTitle: string;
    moreText: string;
    moreCta: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    open: string;
    items: { name: string; tagline: string; text: string; tags: string[] }[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facts: { value: string; label: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    form: {
      name: string;
      namePh: string;
      contact: string;
      contactPh: string;
      service: string;
      servicePh: string;
      message: string;
      messagePh: string;
      submit: string;
      sending: string;
      success: string;
      successSub: string;
      error: string;
      invalid: string;
    };
  };
  plate: {
    title: string;
    text: string;
    hint: string;
    alt: string;
    close: string;
  };
  footer: {
    role: string;
    nifLabel: string;
    rights: string;
  };
};

export const DICT: Record<Lang, Dict> = {
  en: {
    htmlLang: "en",
    nav: { cases: "Cases", services: "Services", projects: "Projects", about: "About", contact: "Contact" },
    cta: "Get in touch",
    hero: {
      badge: "Based in Lisbon · Working worldwide",
      title: "I build bots, AI agents and automation",
      titleAccent: "that make businesses run on their own.",
      text:
        "Messenger bots, CRM setups, mailings and custom apps. I'm Ildar — a technical entrepreneur with 7+ years in data science and AI, and the person who actually builds what you hire me for.",
      primary: "Leave a request",
      secondary: "See services",
      caption: "Ildar Lomov, Lisbon",
    },
    cases: {
      eyebrow: "Case study",
      title: "Memcircle: meetings your AI can actually use",
      hint: "Swipe or use the arrows",
      prev: "Previous slide",
      next: "Next slide",
      open: "Open memcircle.com",
      demoNote: "Illustrative example",
      slides: [
        {
          kicker: "Memcircle",
          title: "Every meeting, recorded and ready for AI",
          text:
            "An AI meeting recorder I designed and built end to end — one product on web, desktop, mobile and the browser.",
        },
        {
          kicker: "01 · Record",
          title: "No bot joins your call",
          text:
            "It captures the call locally on your Mac, Windows PC or in Chrome. Zoom, Meet, Teams or anything else — nobody sees a recorder in the room.",
        },
        {
          kicker: "02 · Transcribe",
          title: "Speech to clean text",
          text:
            "A full, searchable transcript of the whole conversation, ready right after the call ends. Quotable, shareable, yours.",
        },
        {
          kicker: "03 · Structure",
          title: "Summary, decisions, action items",
          text:
            "One screen per meeting: a short recap, the key points and who has to do what — instead of an hour of recording to rewatch.",
        },
        {
          kicker: "04 · Use with AI",
          title: "Your meetings become AI context",
          text:
            "Hand transcripts, recaps and tasks to the AI tools you already use, so they know what was actually said — and ask questions across your meetings.",
        },
      ],
      demo: {
        rec: "Recording",
        noBot: "No bot in the meeting",
        platforms: ["macOS", "Windows", "Chrome", "iOS"],
        transcript: [
          { who: "Anna", text: "Let's lock the launch for the 12th." },
          { who: "Mark", text: "The pricing page is ready, we're only waiting on legal." },
          { who: "Anna", text: "Great — I'll send the contract today." },
        ],
        summaryLabel: "Summary",
        summary: "Launch set for the 12th. Pricing page is ready; the contract goes out today.",
        keyLabel: "Key points",
        keyPoints: ["Launch date: the 12th", "Pricing page is ready", "Legal review pending"],
        actionLabel: "Action items",
        actions: ["Anna — send the contract", "Mark — get legal sign-off"],
        askLabel: "Ask AI",
        question: "What did we decide about the launch?",
        answer: "Launch is set for the 12th. Pricing is ready; Anna sends the contract today and Mark chases legal.",
      },
    },
    services: {
      eyebrow: "Services",
      title: "What I can build for you",
      items: {
        bots: {
          title: "Messenger bots",
          text:
            "Bots that answer, qualify, book and sell — inside the apps your customers already use every day.",
          tags: ["WhatsApp", "Telegram"],
        },
        tilda: {
          title: "Websites on Tilda",
          text:
            "Fast, clean landing pages and multi-page sites with forms wired straight into your CRM and messengers.",
          tags: ["Tilda", "Landing pages", "Forms"],
        },
        "crm-integration": {
          title: "CRM setup & integration",
          text:
            "Pipelines, automations and integrations in the CRM you already have, so no lead gets lost between tools.",
          tags: ["Bitrix24", "amoCRM"],
        },
        "ai-agents": {
          title: "AI agents for business",
          text:
            "Agents that handle correspondence, outreach and routine assistant work — trained on your process, not on a generic script.",
          tags: ["LLM agents", "Outreach", "Assistants"],
        },
        mailings: {
          title: "Mailings & outreach",
          text:
            "Structured WhatsApp and Telegram mailings: segmented, personalised and tracked, built to feel like a conversation.",
          tags: ["WhatsApp", "Telegram"],
        },
        "custom-crm": {
          title: "Custom CRM",
          text:
            "When off-the-shelf doesn't fit: a CRM shaped around how your team really sells, with bots and AI built in.",
          tags: ["Leads", "Pipelines", "Analytics"],
        },
        apps: {
          title: "App development",
          text:
            "Web apps, Telegram mini-apps and mobile apps — from the first idea to a product in production.",
          tags: ["Web", "Mini-apps", "Mobile"],
        },
      },
      moreTitle: "Something else in mind?",
      moreText: "If it can be automated or built, let's talk. Describe the task and I'll tell you honestly how I'd approach it.",
      moreCta: "Describe your task",
    },
    projects: {
      eyebrow: "Projects",
      title: "Things I've built",
      open: "Open site",
      items: [
        {
          name: "Walkie Talkie",
          tagline: "English in dialogue with an AI teacher",
          text:
            "A product for learning English by talking with an AI teacher, instead of memorising lists and drilling exercises.",
          tags: ["AI", "Education", "Product"],
        },
        {
          name: "Memcircle",
          tagline: "An AI meeting recorder that works everywhere",
          text:
            "Records calls without a bot joining, then turns them into a transcript, recap and action items. One product on every platform: web, desktop, mobile and the browser.",
          tags: ["AI", "SaaS", "Product"],
        },
        {
          name: "Memcircle for Mac",
          tagline: "Native macOS app",
          text:
            "A native desktop app that records any call on your Mac — Zoom, Meet, Teams or anything else — with no bot in the meeting. Signed and notarized.",
          tags: ["macOS 14+", "Native app"],
        },
        {
          name: "Memcircle for Windows",
          tagline: "Windows desktop app",
          text:
            "The same bot-free meeting recorder for Windows: captures the call locally and delivers the transcript, summary and action items afterwards.",
          tags: ["Windows 10+", "C# · .NET · WPF"],
        },
        {
          name: "Memcircle Chrome extension",
          tagline: "Record calls right from the browser",
          text:
            "Record web calls straight from the browser toolbar — no bot joins the meeting. Free in the Chrome Web Store.",
          tags: ["Chrome", "Free"],
        },
        {
          name: "Memcircle for iOS",
          tagline: "Your meetings on iPhone",
          text:
            "The mobile companion: your transcripts, summaries and action items from every meeting, always in your pocket.",
          tags: ["iOS", "Mobile app"],
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "Hi, I'm Ildar",
      paragraphs: [
        "I'm a technical entrepreneur based in Lisbon. For seven years I worked in data science, and I finished as Head of AI at Emerging Travel Group, a $1B+ travel-tech company, where I built and led the AI team.",
        "Today I build my own products and take on client projects. I write the code, set up the infrastructure and connect the pieces myself, so you talk to one person from the first call to the launch.",
        "My stack is Python (FastAPI, Django), React and Node.js, Docker, and LLMs wherever they genuinely help.",
      ],
      facts: [
        { value: "7+", label: "years in data science & AI" },
        { value: "$1B+", label: "travel-tech company, AI team lead" },
        { value: "MSc", label: "Data Science, HSE" },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your project",
      text:
        "Leave a request and I'll get back to you personally, usually within a day. Or just message me directly.",
      phoneLabel: "Phone / WhatsApp",
      emailLabel: "Email",
      addressLabel: "Address",
      form: {
        name: "Your name",
        namePh: "Jane Smith",
        contact: "How can I reach you?",
        contactPh: "WhatsApp or email",
        service: "What do you need?",
        servicePh: "Choose a service (optional)",
        message: "Tell me about the task",
        messagePh: "A few words about your business and what you'd like to automate…",
        submit: "Send request",
        sending: "Sending…",
        success: "Request sent. Thank you!",
        successSub: "I'll get back to you soon.",
        error: "Something went wrong. Please message me on WhatsApp instead.",
        invalid: "Please add your name and a way to reach you.",
      },
    },
    plate: {
      title: "Not a vibe coder",
      text:
        "I have a Master's degree in Applied Mathematics and Computer Science, HSE, 2020.",
      hint: "Click the diploma to enlarge",
      alt: "Master's diploma, HSE, 2020",
      close: "Close",
    },
    footer: {
      role: "Independent professional (Trabalhador Independente)",
      nifLabel: "NIF",
      rights: "All rights reserved.",
    },
  },

  ru: {
    htmlLang: "ru",
    nav: { cases: "Кейсы", services: "Услуги", projects: "Проекты", about: "Обо мне", contact: "Контакты" },
    cta: "Связаться",
    hero: {
      badge: "Живу в Лиссабоне · Работаю с клиентами по всему миру",
      title: "Делаю ботов, ИИ-агентов и автоматизацию,",
      titleAccent: "чтобы бизнес работал сам.",
      text:
        "Боты для мессенджеров, настройка CRM, рассылки и приложения под ключ. Я Ильдар — технический предприниматель, 7+ лет в data science и AI, и всё, что вы заказываете, я собираю сам.",
      primary: "Оставить заявку",
      secondary: "Смотреть услуги",
      caption: "Ильдар Ломов, Лиссабон",
    },
    cases: {
      eyebrow: "Кейс",
      title: "Memcircle: встречи, с которыми может работать ИИ",
      hint: "Листайте или жмите стрелки",
      prev: "Предыдущий слайд",
      next: "Следующий слайд",
      open: "Открыть memcircle.com",
      demoNote: "Пример для иллюстрации",
      slides: [
        {
          kicker: "Memcircle",
          title: "Каждая встреча записана и готова для ИИ",
          text:
            "ИИ-рекордер встреч, который я придумал и собрал целиком: один продукт для веба, десктопа, мобильных и браузера.",
        },
        {
          kicker: "01 · Запись",
          title: "В звонок не заходит бот",
          text:
            "Запись идёт локально на вашем Mac, Windows-компьютере или в Chrome. Zoom, Meet, Teams или что угодно — никто не увидит «рекордер» в комнате.",
        },
        {
          kicker: "02 · Расшифровка",
          title: "Из речи — чистый текст",
          text:
            "Полная расшифровка разговора с поиском — готова сразу после звонка. Можно цитировать, пересылать, она ваша.",
        },
        {
          kicker: "03 · Структура",
          title: "Резюме, решения, задачи",
          text:
            "Один экран на встречу: короткое резюме, ключевые тезисы и кто что делает — вместо часа записи, которую надо пересматривать.",
        },
        {
          kicker: "04 · Вместе с ИИ",
          title: "Ваши встречи становятся контекстом для ИИ",
          text:
            "Передавайте расшифровки, резюме и задачи ИИ-инструментам, которыми уже пользуетесь, чтобы они знали, что на самом деле говорилось, и задавайте вопросы по всем встречам.",
        },
      ],
      demo: {
        rec: "Запись",
        noBot: "Бота на встрече нет",
        platforms: ["macOS", "Windows", "Chrome", "iOS"],
        transcript: [
          { who: "Анна", text: "Давайте зафиксируем запуск на 12-е." },
          { who: "Марк", text: "Страница с ценами готова, ждём только юристов." },
          { who: "Анна", text: "Отлично, договор отправлю сегодня." },
        ],
        summaryLabel: "Резюме",
        summary: "Запуск назначен на 12-е. Страница с ценами готова, договор уходит сегодня.",
        keyLabel: "Ключевое",
        keyPoints: ["Дата запуска: 12-е", "Страница с ценами готова", "Ждём ревью юристов"],
        actionLabel: "Задачи",
        actions: ["Анна — отправить договор", "Марк — получить ок от юристов"],
        askLabel: "Спросить ИИ",
        question: "Что мы решили по запуску?",
        answer: "Запуск назначен на 12-е. Цены готовы; Анна отправляет договор сегодня, Марк торопит юристов.",
      },
    },
    services: {
      eyebrow: "Услуги",
      title: "Что я могу сделать для вас",
      items: {
        bots: {
          title: "Боты для мессенджеров",
          text:
            "Боты, которые отвечают, квалифицируют, записывают и продают — в тех приложениях, где ваши клиенты и так сидят каждый день.",
          tags: ["WhatsApp", "Telegram"],
        },
        tilda: {
          title: "Сайты на Tilda",
          text:
            "Быстрые аккуратные лендинги и многостраничные сайты, а формы сразу попадают в CRM и мессенджеры.",
          tags: ["Tilda", "Лендинги", "Формы"],
        },
        "crm-integration": {
          title: "Настройка и интеграция CRM",
          text:
            "Воронки, автоматизации и интеграции в той CRM, что у вас уже есть, чтобы ни один лид не терялся между сервисами.",
          tags: ["Битрикс24", "amoCRM"],
        },
        "ai-agents": {
          title: "ИИ-агенты для бизнеса",
          text:
            "Агенты, которые ведут переписку, делают аутрич и берут на себя рутину ассистента — обученные на вашем процессе, а не на шаблоне.",
          tags: ["LLM-агенты", "Аутрич", "Ассистенты"],
        },
        mailings: {
          title: "Рассылки и аутрич",
          text:
            "Системные рассылки в WhatsApp и Telegram: сегментация, персонализация, аналитика — и ощущение живого диалога.",
          tags: ["WhatsApp", "Telegram"],
        },
        "custom-crm": {
          title: "CRM под ключ",
          text:
            "Когда готовые решения не подходят: CRM под то, как ваша команда реально продаёт, со встроенными ботами и ИИ.",
          tags: ["Лиды", "Воронки", "Аналитика"],
        },
        apps: {
          title: "Разработка приложений",
          text:
            "Веб-приложения, мини-аппы для Telegram и мобильные приложения — от идеи до продукта в продакшене.",
          tags: ["Web", "Мини-аппы", "Mobile"],
        },
      },
      moreTitle: "Нужно что-то другое?",
      moreText: "Если это можно автоматизировать или разработать — давайте обсудим. Опишите задачу, и я честно скажу, как бы за неё взялся.",
      moreCta: "Описать задачу",
    },
    projects: {
      eyebrow: "Проекты",
      title: "Что я уже сделал",
      open: "Открыть сайт",
      items: [
        {
          name: "Walkie Talkie",
          tagline: "Английский в диалоге с AI-учителем",
          text:
            "Продукт для изучения английского через живой разговор с AI-учителем — вместо зубрёжки списков слов и бесконечных упражнений.",
          tags: ["AI", "Образование", "Продукт"],
        },
        {
          name: "Memcircle",
          tagline: "AI-рекордер встреч, который работает везде",
          text:
            "Записывает созвоны без бота в звонке и превращает их в транскрипт, резюме и список задач. Один продукт на всех платформах: веб, десктоп, мобильное приложение и браузер.",
          tags: ["AI", "SaaS", "Продукт"],
        },
        {
          name: "Memcircle для Mac",
          tagline: "Нативное приложение для macOS",
          text:
            "Нативное десктопное приложение, которое записывает любой звонок на Mac — Zoom, Meet, Teams или что угодно — без бота во встрече. Подписано и нотаризовано.",
          tags: ["macOS 14+", "Нативное приложение"],
        },
        {
          name: "Memcircle для Windows",
          tagline: "Десктопное приложение для Windows",
          text:
            "Тот же рекордер встреч без бота, но для Windows: записывает звонок локально, а потом присылает транскрипт, резюме и список задач.",
          tags: ["Windows 10+", "C# · .NET · WPF"],
        },
        {
          name: "Memcircle — расширение для Chrome",
          tagline: "Запись звонков прямо из браузера",
          text:
            "Записывайте веб-звонки прямо с панели браузера — без бота во встрече. Бесплатно в Chrome Web Store.",
          tags: ["Chrome", "Бесплатно"],
        },
        {
          name: "Memcircle для iOS",
          tagline: "Ваши встречи на iPhone",
          text:
            "Мобильный спутник: транскрипты, резюме и задачи со всех ваших встреч — всегда под рукой.",
          tags: ["iOS", "Мобильное приложение"],
        },
      ],
    },
    about: {
      eyebrow: "Обо мне",
      title: "Привет, я Ильдар",
      paragraphs: [
        "Я технический предприниматель, живу в Лиссабоне. Семь лет занимался data science, а последние годы был Head of AI в Emerging Travel Group — travel-tech компании с оборотом $1B+, где построил и возглавил AI-команду.",
        "Сейчас делаю собственные продукты и беру клиентские проекты. Код, инфраструктуру и интеграции собираю сам — вы общаетесь с одним человеком от первого звонка до запуска.",
        "Мой стек: Python (FastAPI, Django), React и Node.js, Docker и LLM — везде, где они действительно полезны.",
      ],
      facts: [
        { value: "7+", label: "лет в data science и AI" },
        { value: "$1B+", label: "travel-tech компания, лид AI-команды" },
        { value: "MSc", label: "Data Science, НИУ ВШЭ" },
      ],
    },
    contact: {
      eyebrow: "Контакты",
      title: "Давайте обсудим ваш проект",
      text:
        "Оставьте заявку — отвечу лично, обычно в течение дня. Или просто напишите мне напрямую.",
      phoneLabel: "Телефон / WhatsApp",
      emailLabel: "Email",
      addressLabel: "Адрес",
      form: {
        name: "Ваше имя",
        namePh: "Иван Петров",
        contact: "Как с вами связаться?",
        contactPh: "Telegram, WhatsApp или email",
        service: "Что вам нужно?",
        servicePh: "Выберите услугу (необязательно)",
        message: "Расскажите о задаче",
        messagePh: "Пара слов о вашем бизнесе и о том, что хотите автоматизировать…",
        submit: "Отправить заявку",
        sending: "Отправляю…",
        success: "Заявка отправлена. Спасибо!",
        successSub: "Скоро с вами свяжусь.",
        error: "Что-то пошло не так. Напишите мне, пожалуйста, в WhatsApp.",
        invalid: "Укажите, пожалуйста, имя и способ связи.",
      },
    },
    plate: {
      title: "Не вайбкодер",
      text:
        "Я этому реально учился. Диплом магистра по направлению «Прикладная математика и информатика», НИУ ВШЭ, 2020.",
      hint: "Нажмите на диплом, чтобы увеличить",
      alt: "Диплом магистра, НИУ ВШЭ, 2020",
      close: "Закрыть",
    },
    footer: {
      role: "Самозанятый специалист (Trabalhador Independente)",
      nifLabel: "NIF",
      rights: "Все права защищены.",
    },
  },
};
