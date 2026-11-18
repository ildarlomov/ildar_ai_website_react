// Privacy policy copy (EN/RU), rendered by components/PrivacyPolicy.tsx at /privacy and /ru/privacy.
// Keep it in sync with what the site actually does: app/api/lead/route.ts (form → Telegram),
// components/CookieConsent.tsx (Metrika only after consent), middleware.ts (lang cookie).
import type { Lang } from "@/lib/content";

export type PrivacySection = { h: string; p?: string[]; items?: string[] };

export type PrivacyCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  updated: string;
  back: string;
  intro: string;
  sections: PrivacySection[];
  cookies: { h: string; cols: [string, string, string]; rows: [string, string, string][] };
  settings: { h: string; p: string; button: string; current: string; granted: string; denied: string; none: string };
};

const CONTROLLER_EN = "Ildar Lomov, independent professional (NIF 316456124), Rua Martins Barata 3, 1400-247 Lisbon, Portugal. Email: ildarlomov.f@gmail.com.";
const CONTROLLER_RU = "Ильдар Ломов, самозанятый специалист (NIF 316456124), Rua Martins Barata 3, 1400-247 Лиссабон, Португалия. Email: ildarlomov.f@gmail.com.";

export const PRIVACY: Record<Lang, PrivacyCopy> = {
  en: {
    metaTitle: "Privacy policy — Ildar Lomov",
    metaDescription: "What data ildarlomov.com collects, which analytics it uses and how to change your cookie choice.",
    title: "Privacy policy",
    updated: "Last updated: 18 November 2026",
    back: "Back to the site",
    intro: "This page explains what personal data this website collects, why, and what you can do about it.",
    sections: [
      { h: "Who is responsible", p: [CONTROLLER_EN] },
      {
        h: "Request form",
        p: [
          "When you send a request, the form transmits your name, how to reach you, the service you picked, your message and the site language. They are delivered as a message to my Telegram chat and used only to reply to you and discuss the work.",
          "Legal basis: your consent and steps taken at your request before a contract (GDPR art. 6(1)(a) and (b)). I keep the conversation for as long as we are in touch about the work; you can ask me to delete it at any time.",
        ],
      },
      {
        h: "Analytics",
        items: [
          "Vercel Web Analytics — counts page views in aggregate. It sets no cookies and does not identify you. Always on.",
          "Yandex Metrika — visit statistics, click map and session replay (Webvisor). Sets cookies and loads only if you click “Accept” in the cookie banner. Provided by Yandex LLC; data may be processed outside the EU.",
        ],
      },
      {
        h: "Hosting",
        p: [
          "The site runs on Vercel Inc. Like any web server, it briefly processes technical data (IP address, browser, requested page) to deliver the site and protect it from abuse. To stop spam, the form limits how often one IP address can send requests; the address is not stored.",
        ],
      },
      {
        h: "Your rights",
        p: [
          "You can ask for access to, correction or deletion of your data, and withdraw your consent at any time — write to ildarlomov.f@gmail.com. You also have the right to complain to the Portuguese data protection authority (CNPD, cnpd.pt).",
        ],
      },
    ],
    cookies: {
      h: "Cookies and local storage",
      cols: ["Name", "What it is for", "How long"],
      rows: [
        ["cookie-consent (local storage)", "Remembers your choice in the cookie banner", "Until you clear site data"],
        ["lang", "Remembers the language you picked with the EN/RU switch", "1 year"],
        ["_ym_* (e.g. _ym_uid, _ym_d)", "Yandex Metrika visit statistics — only after “Accept”", "Up to 1 year"],
      ],
    },
    settings: {
      h: "Change your cookie choice",
      p: "Your choice is stored only in this browser. Reset it to see the cookie banner again.",
      button: "Reset cookie choice",
      current: "Current choice:",
      granted: "accepted",
      denied: "declined",
      none: "not made yet",
    },
  },
  ru: {
    metaTitle: "Политика конфиденциальности — Ильдар Ломов",
    metaDescription: "Какие данные собирает ildarlomov.com, какая аналитика используется и как изменить выбор по cookie.",
    title: "Политика конфиденциальности",
    updated: "Обновлено: 18 ноября 2026",
    back: "Вернуться на сайт",
    intro: "Здесь написано, какие персональные данные собирает этот сайт, зачем и что вы можете с этим сделать.",
    sections: [
      { h: "Кто обрабатывает данные", p: [CONTROLLER_RU] },
      {
        h: "Форма заявки",
        p: [
          "Когда вы отправляете заявку, форма передаёт ваше имя, способ связи, выбранную услугу, сообщение и язык сайта. Они приходят сообщением в мой Telegram и используются только для того, чтобы ответить вам и обсудить работу.",
          "Основание: ваше согласие и действия по вашему запросу до заключения договора (ст. 6(1)(a) и (b) GDPR). Переписку я храню, пока мы на связи по работе; вы можете в любой момент попросить её удалить.",
        ],
      },
      {
        h: "Аналитика",
        items: [
          "Vercel Web Analytics — считает просмотры страниц в обобщённом виде. Не ставит cookie и не определяет, кто вы. Работает всегда.",
          "Яндекс Метрика — статистика посещений, карта кликов и запись сессий (Вебвизор). Ставит cookie и включается, только если вы нажали «Принять» в баннере. Сервис ООО «Яндекс»; данные могут обрабатываться за пределами ЕС.",
        ],
      },
      {
        h: "Хостинг",
        p: [
          "Сайт размещён на Vercel Inc. Как любой веб-сервер, он кратковременно обрабатывает технические данные (IP-адрес, браузер, запрошенную страницу), чтобы показать сайт и защитить его от злоупотреблений. Для защиты от спама форма ограничивает частоту заявок с одного IP-адреса; сам адрес не сохраняется.",
        ],
      },
      {
        h: "Ваши права",
        p: [
          "Вы можете запросить доступ к своим данным, их исправление или удаление, а также в любой момент отозвать согласие — напишите на ildarlomov.f@gmail.com. Вы также вправе подать жалобу в португальский орган по защите данных (CNPD, cnpd.pt).",
        ],
      },
    ],
    cookies: {
      h: "Cookie и локальное хранилище",
      cols: ["Название", "Для чего", "Срок"],
      rows: [
        ["cookie-consent (локальное хранилище)", "Запоминает ваш выбор в баннере cookie", "Пока вы не очистите данные сайта"],
        ["lang", "Запоминает язык, выбранный переключателем EN/RU", "1 год"],
        ["_ym_* (например, _ym_uid, _ym_d)", "Статистика Яндекс Метрики — только после «Принять»", "До 1 года"],
      ],
    },
    settings: {
      h: "Изменить выбор по cookie",
      p: "Ваш выбор хранится только в этом браузере. Сбросьте его, чтобы баннер cookie появился снова.",
      button: "Сбросить выбор cookie",
      current: "Сейчас:",
      granted: "принято",
      denied: "отклонено",
      none: "выбор не сделан",
    },
  },
};
