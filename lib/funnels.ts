// Copy for the two funnel decks (components/funnels/*). Kept apart from lib/content.ts so the
// deck copy and its mock-up strings live together. Facts come from the real systems:
// - Threads: vibe_comments extension + threads_home_lead_scan / crm_first_outreach skills,
//   outreach_sieve and vedenie crons in efficiency_scripts/droid/whisper_crm (numbers from 2026-10).
// - Instagram: modelled on the Alhimia Woman funnel (keyword DM → @alhimia_woman_bot → chain,
//   payments, course, CRM PWA) but shown generically as a done-for-you service for creators.
// Never put client personal names, chat ids or handles of real people here.

import type { Lang } from "@/lib/content";
import type { SlideText } from "@/components/SlideDeck";

export type FunnelCopy = {
  nav: string;
  prev: string;
  next: string;
  cta: string;
  threads: {
    label: string;
    slides: SlideText[]; // 8; the last one is the optional "send traffic anywhere" step
    funnel: { label: string; value: string }[]; // intro funnel layers, widest first
    stats: { value: string; label: string }[];
    feed: { author: string; text: string; verdict: string; hit: boolean }[];
    search: string;
    verdicts: { title: string; items: { text: string; verdict: string; kind: "direct" | "indirect" | "miss"; category?: string }[] };
    post: { author: string; time: string; text: string };
    reply: string;
    replyAuthor: string;
    gallery: string;
    signals: { inTitle: string; in: string[]; brain: string; outTitle: string; out: string[]; channels: string[] };
    chat: { name: string; status: string; msgs: { from: "me" | "them"; text: string }[] };
    crm: { columns: { title: string; cards: { name: string; note: string; heat: number }[] }[]; call: string; callSub: string };
    traffic: { center: string; targets: string[] };
  };
  instagram: {
    label: string;
    slides: SlideText[]; // 8: intro + 7 steps
    steps: { icon: "ig" | "tg" | "pay" | "crm"; text: string }[]; // intro step list
    handle: string; // the creator's Instagram handle in the mock-ups
    reel: { caption: string; comments: { author: string; text: string }[]; replied: string };
    dm: { name: string; msgs: { from: "me" | "them"; text: string; buttons?: string[] }[] };
    bot: { name: string; msgs: { from: "me" | "them"; text: string; buttons?: string[]; file?: string }[] };
    chain: { time: string; text: string }[];
    pay: { title: string; old: string; price: string; deadline: string; methods: string[]; currencies: string; button: string; done: string };
    course: { day: string; items: string[]; quizQ: string; quizA: string[]; protect: string };
    crm: {
      columns: string[];
      rows: { name: string; status: string; tone: string; paid: string }[];
      chatWith: string;
      chat: { from: "me" | "them"; text: string }[];
      agent: string;
      push: string;
      pushSub: string;
    };
  };
};

export const FUNNELS: Record<Lang, FunnelCopy> = {
  ru: {
    nav: "Воронки",
    prev: "Предыдущий слайд",
    next: "Следующий слайд",
    cta: "Хочу такую воронку",
    threads: {
      label: "Автоворонка · Threads",
      slides: [
        {
          tag: "Нейрокомментинг · клиенты для вашего бизнеса",
          title: "Система, которая приводит клиентов из Threads 24/7",
          text:
            "ИИ находит людей, которым прямо сейчас нужна ваша услуга, пишет им живой комментарий, переводит диалог в Telegram и ведёт переписку. Вам остаётся созвониться и закрыть сделку.",
        },
        {
          tag: "Шаг 1 · ИИ-поиск",
          title: "ИИ-агент сканирует Threads каждые 15 минут",
          text:
            "Агент круглосуточно ищет свежие посты, где люди просят совета, ищут исполнителя или жалуются на задачу, которую решает ваш бизнес. Каждый новый пост сразу уходит на разбор.",
        },
        {
          tag: "Шаг 2 · Отбор",
          title: "Агент читает пост и решает, есть ли там клиент",
          text:
            "Агент отличает прямой запрос («ищу разработчика бота») от косвенного («устала отвечать клиентам вручную») и от шума. Подходящий автор сразу попадает в CRM с категорией.",
        },
        {
          tag: "Шаг 3 · Комментарий",
          title: "Живой комментарий под постом, без ссылок и спама",
          text:
            "ИИ пишет коротко и по делу, под конкретную боль автора. К комментарию можно прикрепить изображения или целую галерею с примерами работ. Выглядит как нормальный разговор, а не реклама.",
        },
        {
          tag: "Шаг 4 · Сигналы интереса",
          title: "Система ловит сигналы интереса и решает, что делать дальше",
          text:
            "Агент следит за реакцией потенциальных клиентов и сам выбирает следующий шаг: написать в личку, оставить комментарий, ответить на комментарий или написать в другом канале.",
        },
        {
          tag: "Шаг 5 · Telegram",
          title: "Диалог переезжает в Telegram и продолжается вашим голосом",
          text:
            "В личке агент уточняет задачу и один раз зовёт в Telegram. Там он ведёт клиента от вашего имени: задаёт вопросы, объясняет, как вы работаете, договаривается о созвоне.",
        },
        {
          tag: "Шаг 6 · CRM и дожим",
          title: "Каждый лид в CRM, а агент оповещает вас, когда лид квалифицирован",
          text:
            "Тем, кто замолчал, система мягко напоминает о себе по утрам. Как только лид готов к разговору, вам приходит оповещение. Вам остаётся созвониться и закрыть сделку.",
        },
        {
          tag: "Шаг 7 · Опционально",
          title: "Так же можно вести трафик куда угодно",
          text:
            "Вместо созвона агент может вести людей на ваш сайт, в Instagram, в Telegram-канал, на форму записи, конкретную услугу или анкету.",
        },
      ],
      funnel: [
        { label: "ИИ-поиск постов", value: "24/7" },
        { label: "Отбор целевых", value: "" },
        { label: "Касания", value: "500–10 000 / мес" },
        { label: "Входящие", value: "2–5%" },
        { label: "Созвоны и сделки", value: "" },
      ],
      stats: [
        { value: "500–10 000", label: "касаний в месяц, в зависимости от ниши" },
        { value: "2–5%", label: "конверсия во входящие" },
        { value: "0", label: "ручных сообщений до созвона" },
      ],
      search: "ищу разработчика",
      feed: [
        { author: "marina.design", text: "Кто делал Telegram-бота для записи клиентов? Ищу исполнителя 🙏", verdict: "Запрос", hit: true },
        { author: "coffee_daily", text: "Утренний капучино и дождь за окном ☕️", verdict: "", hit: false },
        { author: "alex.smm", text: "Устал вручную отвечать на одни и те же вопросы в директе", verdict: "Боль", hit: true },
        { author: "run.with.kate", text: "10 км до завтрака, кто со мной?", verdict: "", hit: false },
      ],
      verdicts: {
        title: "Разбор поста",
        items: [
          { text: "Ищу разработчика бота для онлайн-школы, бюджет есть", verdict: "Прямой запрос", kind: "direct", category: "Боты" },
          { text: "Менеджеры не успевают отвечать на заявки после рекламы", verdict: "Косвенный", kind: "indirect", category: "Автоматизация" },
          { text: "Делюсь своим утренним ритуалом", verdict: "Мимо", kind: "miss" },
        ],
      },
      post: {
        author: "marina.design",
        time: "12 мин",
        text: "Кто делал Telegram-бота для записи клиентов? Хочу, чтобы бот сам предлагал время и напоминал. Ищу исполнителя 🙏",
      },
      replyAuthor: "your.brand",
      reply:
        "Делали такое для студии: бот показывает свободные окна, сам напоминает за день и за час, переносы тоже через него. Вот как это выглядит 👇",
      gallery: "Галерея · 3 фото",
      signals: {
        inTitle: "Сигналы интереса",
        in: ["Ответ на комментарий", "Лайк", "Подписка в ответ", "Переход в профиль"],
        brain: "Агент решает",
        outTitle: "Следующий шаг",
        out: ["Личное сообщение", "Комментарий", "Ответ на комментарий", "Сообщение в другом канале"],
        channels: ["Threads", "Telegram", "WhatsApp", "Instagram"],
      },
      chat: {
        name: "От вашего имени",
        status: "онлайн",
        msgs: [
          { from: "them", text: "Привет! Это по боту для записи из Threads" },
          { from: "me", text: "Привет, Марина! Расскажите, где сейчас принимаете записи: в директе, по телефону или через сайт?" },
          { from: "them", text: "В директе, и половина теряется" },
          { from: "me", text: "Понял. Бот заберёт запись на себя и будет напоминать клиентам. Давайте созвонимся на 15 минут? Завтра в 12 или в 16?" },
        ],
      },
      crm: {
        columns: [
          { title: "Новые", cards: [{ name: "alex.smm", note: "Косвенный · автоматизация", heat: 2 }, { name: "studio.nail", note: "Прямой · боты", heat: 3 }] },
          { title: "Диалог", cards: [{ name: "marina.design", note: "Ответила · хочет созвон", heat: 5 }, { name: "olga.school", note: "Напоминание в 09:00", heat: 4 }] },
          { title: "Сделка", cards: [{ name: "fitness.lab", note: "Созвон завтра", heat: 5 }] },
        ],
        call: "Лид квалифицирован",
        callSub: "marina.design готова к созвону",
      },
      traffic: {
        center: "Threads",
        targets: ["Ваш сайт", "Instagram", "Telegram-канал", "Форма записи", "Услуга", "Анкета"],
      },
    },
    instagram: {
      label: "Автоворонка · Instagram",
      slides: [
        {
          tag: "Автоворонка Instagram + Telegram-бот под ключ",
          title: "Из Instagram в Telegram-канал и в бота, который продаёт сам",
          text:
            "Строю автоворонки для Instagram-блогеров и экспертов: подписчики переходят из Reels в ваш Telegram-канал, а бот прогревает их и продаёт мини-продукты без ручной переписки.",
        },
        {
          tag: "Шаг 1 · Instagram",
          title: "Подписчик пишет ключевое слово под Reels",
          text:
            "В конце видео вы просите написать кодовое слово в комментариях. Каждый такой комментарий запускает воронку и заодно поднимает охваты ролика.",
        },
        {
          tag: "Шаг 2 · Директ",
          title: "Агент отвечает по скрипту и переводит в Telegram-бота",
          text:
            "Агент сразу отвечает на комментарий и пишет в директ по заданному сценарию, а потом даёт ссылку на Telegram-бота. Ни одна заявка не теряется, даже если видео залетело ночью.",
        },
        {
          tag: "Шаг 3 · Telegram-канал",
          title: "Бот предлагает подписаться на канал и дарит подарок",
          text:
            "Первым делом бот зовёт в ваш Telegram-канал, проверяет подписку и выдаёт подарок: гайд, урок или практику. Канал растёт вместе с воронкой.",
        },
        {
          tag: "Шаг 4 · Прогрев",
          title: "8 касаний за 72 часа: видео, истории, оффер с дедлайном",
          text:
            "Бот ведёт человека по видео-воронке: кружки, подарочная практика, истории клиентов, предложение по сниженной цене и напоминания перед дедлайном. После оплаты цепочка останавливается сама.",
        },
        {
          tag: "Шаг 5 · Оплата",
          title: "Оплата в один клик, в любой валюте",
          text:
            "Подключаем нужные способы оплаты: Apple Pay, Google Pay, карты, PayPal и локальные платёжные сервисы. Платёж подтверждается автоматически, доступ открывается сразу.",
        },
        {
          tag: "Шаг 6 · Мини-продукт",
          title: "Мини-продукт живёт прямо в боте, с защитой от копирования",
          text:
            "Уроки по расписанию, практики, тесты и PDF-материалы приходят в боте. Пересылать и сохранять контент нельзя, так что продукт не утечёт в сеть.",
        },
        {
          tag: "Шаг 7 · CRM",
          title: "Каждый клиент в CRM, а к базе можно подключить вашего агента",
          text:
            "Все, кто прошёл воронку, попадают в CRM: переписка, оплаты, статусы. Писать клиентам можно прямо оттуда, делать рассылки по базе или подключить ИИ-агента, который будет вести её за вас.",
        },
      ],
      steps: [
        { icon: "ig", text: "Ключевое слово под Reels" },
        { icon: "ig", text: "Агент отвечает в директ по скрипту" },
        { icon: "tg", text: "Переход в Telegram-бота" },
        { icon: "tg", text: "Подписка на канал и подарок" },
        { icon: "tg", text: "Прогрев: 8 касаний за 72 часа" },
        { icon: "pay", text: "Оплата в один клик" },
        { icon: "tg", text: "Мини-продукт в боте" },
        { icon: "crm", text: "CRM и работа с базой" },
      ],
      handle: "your.blog",
      reel: {
        caption: "Хочешь мой гайд? Напиши «ГАЙД» в комментариях 👇",
        comments: [
          { author: "anna_m", text: "ГАЙД" },
          { author: "olga.yoga", text: "ГАЙД 🙏" },
          { author: "kate_life", text: "Гайд!" },
        ],
        replied: "Отправила тебе в директ 💌",
      },
      dm: {
        name: "Ваш блог",
        msgs: [
          { from: "them", text: "ГАЙД" },
          { from: "me", text: "Привет! Рада, что откликнулось 💛 Подскажи, что тебе сейчас важнее: энергия или отношения?" },
          { from: "them", text: "Энергия" },
          { from: "me", text: "Тогда держи: гайд и бонусный урок ждут тебя в Telegram-боте 👇", buttons: ["Открыть в Telegram"] },
        ],
      },
      bot: {
        name: "Ваш блог · бот",
        msgs: [
          { from: "them", text: "/start" },
          { from: "me", text: "Привет! Подпишись на мой канал, и я пришлю подарок 🎁", buttons: ["Подписаться на канал", "Я подписалась ✓"] },
          { from: "me", text: "Подписка есть, спасибо! Держи подарок 👇", file: "Гайд «Возврат силы».pdf" },
        ],
      },
      chain: [
        { time: "+1 ч", text: "Видеокружок от автора" },
        { time: "+5 ч", text: "Подарочная практика" },
        { time: "+13 ч", text: "История клиентки: скрины и голосовые" },
        { time: "+24 ч", text: "Оффер: мини-курс за $15 вместо $47" },
        { time: "+46 ч", text: "«Осталось 2 часа»" },
        { time: "+72 ч", text: "Консультация и отзывы" },
      ],
      pay: {
        title: "Мини-курс · 3 урока",
        old: "$47",
        price: "$15",
        deadline: "ещё 47:59:12",
        methods: ["Apple Pay", "Google Pay", "Карта", "PayPal"],
        currencies: "₽ · € · $ · ₸ · и другие валюты",
        button: "Оплатить $15",
        done: "Оплата прошла, доступ открыт",
      },
      course: {
        day: "День 1 · Возврат силы",
        items: ["Урок 1 · видео 18 мин", "Практика дыхания", "Трекер усталости · 20 вопросов"],
        quizQ: "Вопрос 7 из 32 · Как часто вы откладываете свои желания ради других?",
        quizA: ["Почти всегда", "Иногда", "Редко"],
        protect: "Пересылка и сохранение запрещены",
      },
      crm: {
        columns: ["Клиент", "Статус", "Оплата"],
        rows: [
          { name: "Анна М.", status: "В программе", tone: "#2f8a5b", paid: "$15" },
          { name: "Ольга Р.", status: "Ждёт оплату", tone: "#c98a1e", paid: "—" },
          { name: "Катя Л.", status: "Прошла", tone: "#5a6ee6", paid: "$15 + $99" },
          { name: "Ирина С.", status: "Новая", tone: "#888", paid: "—" },
        ],
        chatWith: "Катя Л.",
        chat: [
          { from: "them", text: "Спасибо, урок огонь! А консультация будет?" },
          { from: "me", text: "Да! Записала вас на четверг 🙌" },
        ],
        agent: "ИИ-агент ведёт базу",
        push: "Новая оплата · $15",
        pushSub: "Анна М. начала программу",
      },
    },
  },
  en: {
    nav: "Funnels",
    prev: "Previous slide",
    next: "Next slide",
    cta: "I want this funnel",
    threads: {
      label: "Auto-funnel · Threads",
      slides: [
        {
          tag: "AI commenting · clients for your business",
          title: "A system that brings you clients from Threads 24/7",
          text:
            "AI finds people who need your service right now, leaves them a genuine comment, moves the conversation to Telegram and keeps it going. All you do is take the call and close the deal.",
        },
        {
          tag: "Step 1 · AI search",
          title: "An AI agent scans Threads every 15 minutes",
          text:
            "Around the clock, the agent looks for fresh posts where people ask for advice, look for a contractor or complain about a problem your business solves. Every new post goes straight in for review.",
        },
        {
          tag: "Step 2 · Selection",
          title: "The agent reads each post and decides if there's a client in it",
          text:
            "The agent tells a direct request (\"looking for a bot developer\") from an indirect one (\"tired of answering clients by hand\") and from noise. A good match lands in the CRM with a category.",
        },
        {
          tag: "Step 3 · Comment",
          title: "A real comment under the post, no links, no spam",
          text:
            "AI writes a short reply aimed at the author's actual problem. You can attach images or a whole gallery of your work. It reads like a normal conversation, not an ad.",
        },
        {
          tag: "Step 4 · Signals of interest",
          title: "The system picks up signals of interest and decides what to do next",
          text:
            "The agent watches how potential clients react and picks the next step itself: a DM, a comment, a reply to a comment, or a message on another channel.",
        },
        {
          tag: "Step 5 · Telegram",
          title: "The chat moves to Telegram and carries on in your voice",
          text:
            "In DMs the agent clarifies the task and invites the person to Telegram once. There it talks to the client on your behalf: asks questions, explains how you work and books a call.",
        },
        {
          tag: "Step 6 · CRM & follow-ups",
          title: "Every lead in the CRM, and the agent alerts you once a lead is qualified",
          text:
            "Leads who went quiet get a gentle nudge in the morning. As soon as a lead is ready to talk, you get an alert. All you do is take the call and close the deal.",
        },
        {
          tag: "Step 7 · Optional",
          title: "Send the traffic anywhere you like",
          text:
            "Instead of a call, the agent can send people to your website, Instagram, Telegram channel, booking form, a specific service or a questionnaire.",
        },
      ],
      funnel: [
        { label: "AI post search", value: "24/7" },
        { label: "Target posts", value: "" },
        { label: "Touches", value: "500–10,000 / mo" },
        { label: "Inbound", value: "2–5%" },
        { label: "Calls & deals", value: "" },
      ],
      stats: [
        { value: "500–10,000", label: "touches a month, depending on the niche" },
        { value: "2–5%", label: "conversion to inbound" },
        { value: "0", label: "manual messages before the call" },
      ],
      search: "looking for a developer",
      feed: [
        { author: "marina.design", text: "Has anyone built a Telegram booking bot? Looking for someone 🙏", verdict: "Request", hit: true },
        { author: "coffee_daily", text: "Morning cappuccino and rain outside ☕️", verdict: "", hit: false },
        { author: "alex.smm", text: "So tired of answering the same DM questions by hand", verdict: "Pain", hit: true },
        { author: "run.with.kate", text: "10k before breakfast, who's in?", verdict: "", hit: false },
      ],
      verdicts: {
        title: "Post review",
        items: [
          { text: "Looking for a bot developer for my online school, budget ready", verdict: "Direct request", kind: "direct", category: "Bots" },
          { text: "Our managers can't keep up with leads after ads go live", verdict: "Indirect", kind: "indirect", category: "Automation" },
          { text: "Sharing my morning routine", verdict: "Miss", kind: "miss" },
        ],
      },
      post: {
        author: "marina.design",
        time: "12m",
        text: "Has anyone built a Telegram booking bot? I want it to offer times and send reminders on its own. Looking for someone 🙏",
      },
      replyAuthor: "your.brand",
      reply:
        "We built exactly that for a studio: the bot shows free slots, reminds clients a day and an hour before, and handles reschedules too. Here's how it looks 👇",
      gallery: "Gallery · 3 photos",
      signals: {
        inTitle: "Signals of interest",
        in: ["Reply to a comment", "Like", "Follow-back", "Profile visit"],
        brain: "Agent decides",
        outTitle: "Next step",
        out: ["Direct message", "Comment", "Reply to a comment", "Message on another channel"],
        channels: ["Threads", "Telegram", "WhatsApp", "Instagram"],
      },
      chat: {
        name: "On your behalf",
        status: "online",
        msgs: [
          { from: "them", text: "Hi! It's about the booking bot from Threads" },
          { from: "me", text: "Hi Marina! Where do you take bookings now: DMs, phone or a website?" },
          { from: "them", text: "DMs, and half of them get lost" },
          { from: "me", text: "Got it. A bot will take bookings off your hands and remind clients. Quick 15-minute call? Tomorrow at 12 or 4pm?" },
        ],
      },
      crm: {
        columns: [
          { title: "New", cards: [{ name: "alex.smm", note: "Indirect · automation", heat: 2 }, { name: "studio.nail", note: "Direct · bots", heat: 3 }] },
          { title: "Talking", cards: [{ name: "marina.design", note: "Replied · wants a call", heat: 5 }, { name: "olga.school", note: "Nudge at 9:00", heat: 4 }] },
          { title: "Deal", cards: [{ name: "fitness.lab", note: "Call tomorrow", heat: 5 }] },
        ],
        call: "Lead qualified",
        callSub: "marina.design is ready for a call",
      },
      traffic: {
        center: "Threads",
        targets: ["Your website", "Instagram", "Telegram channel", "Booking form", "A service", "Questionnaire"],
      },
    },
    instagram: {
      label: "Auto-funnel · Instagram",
      slides: [
        {
          tag: "Instagram auto-funnel + Telegram bot, done for you",
          title: "From Instagram to your Telegram channel and a bot that sells on its own",
          text:
            "I build auto-funnels for Instagram creators and experts: followers move from Reels to your Telegram channel, and a bot warms them up and sells your mini-products with no manual messaging.",
        },
        {
          tag: "Step 1 · Instagram",
          title: "A follower comments a keyword under a Reel",
          text:
            "At the end of the video you ask people to comment a keyword. Every such comment starts the funnel and boosts the Reel's reach along the way.",
        },
        {
          tag: "Step 2 · DMs",
          title: "The agent replies by script and moves the chat to a Telegram bot",
          text:
            "The agent replies to the comment right away, follows your script in DMs, then hands over a link to the Telegram bot. No lead gets lost, even if the Reel takes off at night.",
        },
        {
          tag: "Step 3 · Telegram channel",
          title: "The bot invites people to your channel and gives a gift",
          text:
            "First, the bot invites people to your Telegram channel, checks they've joined and hands out a gift: a guide, a lesson or a practice. Your channel grows with the funnel.",
        },
        {
          tag: "Step 4 · Warm-up",
          title: "8 touches over 72 hours: videos, stories, a deadline offer",
          text:
            "The bot walks people through a video funnel: video notes, a free practice, client stories, a discounted offer and reminders before the deadline. Once someone pays, the chain stops on its own.",
        },
        {
          tag: "Step 5 · Payment",
          title: "One-click payment in any currency",
          text:
            "We connect the payment methods you need: Apple Pay, Google Pay, cards, PayPal and local providers. Payments are confirmed automatically and access opens instantly.",
        },
        {
          tag: "Step 6 · Mini-product",
          title: "The mini-product lives inside the bot, protected from copying",
          text:
            "Scheduled lessons, practices, tests and PDFs arrive in the bot. Content can't be forwarded or saved, so your product doesn't leak online.",
        },
        {
          tag: "Step 7 · CRM",
          title: "Every client in a CRM, with your own agent on top of the base",
          text:
            "Everyone who goes through the funnel lands in a CRM: chats, payments, statuses. Message clients right from there, send broadcasts to your base, or plug in an AI agent to run it for you.",
        },
      ],
      steps: [
        { icon: "ig", text: "Keyword under a Reel" },
        { icon: "ig", text: "Agent replies in DMs by script" },
        { icon: "tg", text: "Move to the Telegram bot" },
        { icon: "tg", text: "Channel subscription and a gift" },
        { icon: "tg", text: "Warm-up: 8 touches over 72 hours" },
        { icon: "pay", text: "One-click payment" },
        { icon: "tg", text: "Mini-product in the bot" },
        { icon: "crm", text: "CRM and your client base" },
      ],
      handle: "your.blog",
      reel: {
        caption: "Want my guide? Comment \"GUIDE\" below 👇",
        comments: [
          { author: "anna_m", text: "GUIDE" },
          { author: "olga.yoga", text: "GUIDE 🙏" },
          { author: "kate_life", text: "Guide!" },
        ],
        replied: "Sent it to your DMs 💌",
      },
      dm: {
        name: "Your blog",
        msgs: [
          { from: "them", text: "GUIDE" },
          { from: "me", text: "Hi! So glad it resonated 💛 Quick question: what matters more to you right now, energy or relationships?" },
          { from: "them", text: "Energy" },
          { from: "me", text: "Then here you go: the guide and a bonus lesson are waiting in the Telegram bot 👇", buttons: ["Open in Telegram"] },
        ],
      },
      bot: {
        name: "Your blog · bot",
        msgs: [
          { from: "them", text: "/start" },
          { from: "me", text: "Hi! Join my channel and I'll send you a gift 🎁", buttons: ["Join the channel", "I've joined ✓"] },
          { from: "me", text: "You're in, thank you! Here's your gift 👇", file: "Energy Back guide.pdf" },
        ],
      },
      chain: [
        { time: "+1 h", text: "Video note from the author" },
        { time: "+5 h", text: "A free practice" },
        { time: "+13 h", text: "A client's story: screenshots and voice notes" },
        { time: "+24 h", text: "Offer: mini-course for $15 instead of $47" },
        { time: "+46 h", text: "\"2 hours left\"" },
        { time: "+72 h", text: "Consultation and reviews" },
      ],
      pay: {
        title: "Mini-course · 3 lessons",
        old: "$47",
        price: "$15",
        deadline: "47:59:12 left",
        methods: ["Apple Pay", "Google Pay", "Card", "PayPal"],
        currencies: "$ · € · £ · ₽ · and other currencies",
        button: "Pay $15",
        done: "Payment received, access open",
      },
      course: {
        day: "Day 1 · Energy back",
        items: ["Lesson 1 · 18 min video", "Breathing practice", "Fatigue tracker · 20 questions"],
        quizQ: "Question 7 of 32 · How often do you put your own wishes aside for others?",
        quizA: ["Almost always", "Sometimes", "Rarely"],
        protect: "Forwarding and saving are disabled",
      },
      crm: {
        columns: ["Client", "Status", "Paid"],
        rows: [
          { name: "Anna M.", status: "In program", tone: "#2f8a5b", paid: "$15" },
          { name: "Olga R.", status: "Awaiting payment", tone: "#c98a1e", paid: "—" },
          { name: "Kate L.", status: "Completed", tone: "#5a6ee6", paid: "$15 + $99" },
          { name: "Irina S.", status: "New", tone: "#888", paid: "—" },
        ],
        chatWith: "Kate L.",
        chat: [
          { from: "them", text: "Thank you, the lesson was amazing! Is there a consultation?" },
          { from: "me", text: "Yes! You're booked for Thursday 🙌" },
        ],
        agent: "AI agent runs the base",
        push: "New payment · $15",
        pushSub: "Anna M. started the program",
      },
    },
  },
};
