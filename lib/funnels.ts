// Copy for the two funnel decks (components/funnels/*). Kept apart from lib/content.ts so the
// deck copy and its mock-up strings live together. Facts come from the real systems:
// - Threads: vibe_comments extension + threads_home_lead_scan / crm_first_outreach skills,
//   outreach_sieve and vedenie crons in efficiency_scripts/droid/whisper_crm (numbers from 2026-10).
// - Instagram: Alhimia Woman — ManyChat keyword DM (client side), then @alhimia_woman_bot
//   (droid/alhimia_woman: funnel.py, chain.py, program.py) and the alhimia_woman_crm PWA.
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
    slides: SlideText[]; // 7
    reel: { caption: string; comments: { author: string; text: string }[]; replied: string };
    dm: { name: string; msgs: { from: "me" | "them"; text: string; buttons?: string[] }[] };
    bot: { name: string; msgs: { from: "me" | "them"; text: string; buttons?: string[]; file?: string }[] };
    chain: { time: string; text: string }[];
    pay: { title: string; old: string; price: string; deadline: string; methods: string[]; button: string; done: string };
    course: { day: string; items: string[]; quizQ: string; quizA: string[] };
    crm: { columns: string[]; rows: { name: string; status: string; tone: string; paid: string }[]; push: string; pushSub: string; statuses: string };
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
          tag: "Кейс · Alhimia Woman",
          title: "Кодовое слово под Reels превращается в оплату",
          text:
            "Воронка для эксперта по женским практикам: подписчица пишет одно слово в комментариях, а дальше директ, Telegram-бот, прогрев, оплата, курс и CRM работают без участия команды.",
        },
        {
          tag: "Шаг 1 · Instagram",
          title: "Пишешь «Алхимия» и сразу получаешь директ",
          text:
            "Reels заканчивается призывом написать кодовое слово. ManyChat мгновенно отвечает в комментарии и присылает в директ ссылку на Telegram-бота. Комментарии заодно поднимают охваты.",
        },
        {
          tag: "Шаг 2 · Telegram-бот",
          title: "Бот встречает и через 30 секунд делает оффер",
          text:
            "Приветствие, короткая история и предложение: три урока за $15, но только 48 часов. Потом цена становится $47. Дедлайн настоящий, его считает сервер.",
        },
        {
          tag: "Шаг 3 · Дожим",
          title: "8 касаний за 72 часа, каждое в своё время",
          text:
            "Видеокружок, подарочная практика, разбор кейса клиентки, напоминания «осталось 2 часа» и «последний час», потом предложение консультации. Цепочка стартует с /start и останавливается после оплаты.",
        },
        {
          tag: "Шаг 4 · Оплата",
          title: "Оплата в один тап, в трёх валютах",
          text:
            "PayPal и LavaTop в рублях, евро и долларах. Платёж подтверждается вебхуком, доступ открывается сразу, а защита от двойного списания не даёт взять деньги дважды.",
        },
        {
          tag: "Шаг 5 · Продукт",
          title: "Курс живёт прямо в боте",
          text:
            "Трёхдневная программа: уроки по расписанию, практики, тест на 32 вопроса, трекер усталости и PDF-план на 30 дней. После оплаты бот предлагает консультацию, а через сутки и неделю просит отзыв.",
        },
        {
          tag: "Шаг 6 · CRM",
          title: "CRM со статусами и пушами на iPhone",
          text:
            "Каждая клиентка в CRM: переписка, оплаты, ответы на тесты. Шесть статусов ставятся сами, рассылки уходят с медиа, о каждой оплате команде приходит пуш и сообщение в Telegram.",
        },
      ],
      reel: {
        caption: "Хочешь вернуть себе силы? Напиши «Алхимия» в комментариях ✨",
        comments: [
          { author: "anna_m", text: "Алхимия" },
          { author: "olga.yoga", text: "Алхимия 🙏" },
          { author: "kate_life", text: "Алхимия!" },
        ],
        replied: "Отправили тебе в директ 💌",
      },
      dm: {
        name: "Alhimia Woman",
        msgs: [
          { from: "them", text: "Алхимия" },
          { from: "me", text: "Привет! Лови доступ: всё внутри Telegram-бота, там тебя ждёт первый урок 💛", buttons: ["Открыть в Telegram"] },
        ],
      },
      bot: {
        name: "Alhimia Woman · бот",
        msgs: [
          { from: "them", text: "/start" },
          { from: "me", text: "Привет! Я рада, что ты здесь. За 3 дня ты вернёшь себе энергию и опору 🌿" },
          { from: "me", text: "3 урока за $15 вместо $47.\nЦена действует 48 часов.", buttons: ["Забрать за $15", "Что внутри?"] },
        ],
      },
      chain: [
        { time: "+1 ч", text: "Видеокружок от автора" },
        { time: "+5,5 ч", text: "Подарок: практика «Возврат силы»" },
        { time: "+13 ч", text: "История клиентки: скрины и голосовые" },
        { time: "+46 ч", text: "«Осталось 2 часа»" },
        { time: "+47 ч", text: "«Последний час»" },
        { time: "+72 ч", text: "Консультация и отзывы" },
      ],
      pay: {
        title: "3 урока · программа «Алхимия»",
        old: "$47",
        price: "$15",
        deadline: "ещё 47:59:12",
        methods: ["PayPal", "₽ LavaTop", "€ LavaTop", "$ LavaTop"],
        button: "Оплатить $15",
        done: "Оплата прошла, доступ открыт",
      },
      course: {
        day: "День 1 · Возврат силы",
        items: ["Урок 1 · видео 18 мин", "Практика дыхания", "Трекер усталости · 20 вопросов"],
        quizQ: "Вопрос 7 из 32 · Как часто вы откладываете свои желания ради других?",
        quizA: ["Почти всегда", "Иногда", "Редко"],
      },
      crm: {
        columns: ["Клиентка", "Статус", "Оплата"],
        rows: [
          { name: "Анна М.", status: "В программе", tone: "#2f8a5b", paid: "$15" },
          { name: "Ольга Р.", status: "Ждёт оплату", tone: "#c98a1e", paid: "—" },
          { name: "Катя Л.", status: "Прошла", tone: "#5a6ee6", paid: "$15 + $99" },
          { name: "Ирина С.", status: "Новая", tone: "#888", paid: "—" },
        ],
        push: "Новая оплата · $15",
        pushSub: "Анна М. начала программу",
        statuses: "6 статусов ставятся автоматически",
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
          tag: "Case · Alhimia Woman",
          title: "A keyword under a Reel turns into a payment",
          text:
            "A funnel for a women's wellbeing expert: a follower comments one word, and from there DMs, a Telegram bot, warm-up, payment, the course and the CRM all run without the team.",
        },
        {
          tag: "Step 1 · Instagram",
          title: "Comment the keyword, get a DM instantly",
          text:
            "Each Reel ends with a call to comment the keyword. ManyChat replies to the comment right away and sends a DM with a link to the Telegram bot. The comments boost reach too.",
        },
        {
          tag: "Step 2 · Telegram bot",
          title: "The bot says hi and makes an offer 30 seconds later",
          text:
            "A welcome, a short story and the offer: three lessons for $15, but only for 48 hours. After that the price goes to $47. The deadline is real and tracked by the server.",
        },
        {
          tag: "Step 3 · Follow-ups",
          title: "8 touches over 72 hours, each one on schedule",
          text:
            "A video note, a free practice, a client's story, \"2 hours left\" and \"last hour\" reminders, then a consultation offer. The chain starts at /start and stops the moment someone pays.",
        },
        {
          tag: "Step 4 · Payment",
          title: "One-tap payment in three currencies",
          text:
            "PayPal and LavaTop in roubles, euros and dollars. A webhook confirms the payment, access opens instantly, and a lock makes sure no one is charged twice.",
        },
        {
          tag: "Step 5 · Product",
          title: "The course lives right inside the bot",
          text:
            "A three-day program: scheduled lessons, practices, a 32-question test, a fatigue tracker and a 30-day PDF plan. After payment the bot offers a consultation, and asks for a review a day and a week later.",
        },
        {
          tag: "Step 6 · CRM",
          title: "A CRM with statuses and push alerts on iPhone",
          text:
            "Every client in one CRM: chat, payments, test answers. Six statuses update themselves, broadcasts go out with media, and every payment pings the team by push and in Telegram.",
        },
      ],
      reel: {
        caption: "Want your energy back? Comment \"Alchemy\" below ✨",
        comments: [
          { author: "anna_m", text: "Alchemy" },
          { author: "olga.yoga", text: "Alchemy 🙏" },
          { author: "kate_life", text: "Alchemy!" },
        ],
        replied: "Sent it to your DMs 💌",
      },
      dm: {
        name: "Alhimia Woman",
        msgs: [
          { from: "them", text: "Alchemy" },
          { from: "me", text: "Hi! Here's your access: it's all inside the Telegram bot, your first lesson is waiting 💛", buttons: ["Open in Telegram"] },
        ],
      },
      bot: {
        name: "Alhimia Woman · bot",
        msgs: [
          { from: "them", text: "/start" },
          { from: "me", text: "Hi! So glad you're here. In 3 days you'll get your energy and footing back 🌿" },
          { from: "me", text: "3 lessons for $15 instead of $47.\nThis price lasts 48 hours.", buttons: ["Get it for $15", "What's inside?"] },
        ],
      },
      chain: [
        { time: "+1 h", text: "Video note from the author" },
        { time: "+5.5 h", text: "Gift: the \"Energy back\" practice" },
        { time: "+13 h", text: "A client's story: screenshots and voice notes" },
        { time: "+46 h", text: "\"2 hours left\"" },
        { time: "+47 h", text: "\"Last hour\"" },
        { time: "+72 h", text: "Consultation and reviews" },
      ],
      pay: {
        title: "3 lessons · \"Alchemy\" program",
        old: "$47",
        price: "$15",
        deadline: "47:59:12 left",
        methods: ["PayPal", "₽ LavaTop", "€ LavaTop", "$ LavaTop"],
        button: "Pay $15",
        done: "Payment received, access open",
      },
      course: {
        day: "Day 1 · Energy back",
        items: ["Lesson 1 · 18 min video", "Breathing practice", "Fatigue tracker · 20 questions"],
        quizQ: "Question 7 of 32 · How often do you put your own wishes aside for others?",
        quizA: ["Almost always", "Sometimes", "Rarely"],
      },
      crm: {
        columns: ["Client", "Status", "Paid"],
        rows: [
          { name: "Anna M.", status: "In program", tone: "#2f8a5b", paid: "$15" },
          { name: "Olga R.", status: "Awaiting payment", tone: "#c98a1e", paid: "—" },
          { name: "Kate L.", status: "Completed", tone: "#5a6ee6", paid: "$15 + $99" },
          { name: "Irina S.", status: "New", tone: "#888", paid: "—" },
        ],
        push: "New payment · $15",
        pushSub: "Anna M. started the program",
        statuses: "6 statuses set automatically",
      },
    },
  },
};
