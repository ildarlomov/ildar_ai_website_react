"use client";

// Bottom-right "message me" popup: springs in a few seconds after the page opens, with a soft chime
// (only when the browser allows audio, i.e. after the visitor's first click/tap/key). Remembers dismissal.

import { useCallback, useEffect, useRef, useState } from "react";
import { DICT, type Lang } from "@/lib/content";

const SHOW_AFTER_MS = 8000;
const SNOOZE_MS = 3 * 24 * 60 * 60 * 1000; // stay quiet for 3 days after the visitor closes it
const STORAGE_KEY = "ildar-ai-popup-closed";

// EN → Portuguese number (WhatsApp only, Telegram is hidden on EN); RU → Kazakhstan number.
const WHATSAPP = { en: "https://wa.me/351912094137", ru: "https://wa.me/77058275089" };
// Opens a Telegram chat by phone number (the same KZ number as WhatsApp).
const TELEGRAM_RU = "https://t.me/+77058275089";

function WhatsAppLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 20.5 5 16A8.5 8.5 0 1 1 8 19z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" fill="#fff" />
    </svg>
  );
}

function TelegramLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.5 4.2 3.6 10.8c-1 .4-1 1 0 1.3l4.3 1.4 1.7 5.2c.2.6.5.7 1 .3l2.4-2 4.5 3.3c.8.5 1.4.2 1.6-.8L22 5.6c.3-1.2-.4-1.7-1.5-1.4z" fill="#fff" />
    </svg>
  );
}

// Two short, quiet notes. Fails silently if audio is unavailable or still blocked.
function chime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state !== "running") {
      void ctx.close();
      return;
    }
    const now = ctx.currentTime;
    [880, 1318.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t0 = now + i * 0.13;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.05, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.45);
    });
    setTimeout(() => void ctx.close(), 1200);
  } catch {
    /* sound is a nicety, never an error */
  }
}

export default function ContactPopup({ lang }: { lang: Lang }) {
  const t = DICT[lang].popup;
  const [open, setOpen] = useState(false);
  const interacted = useRef(false);

  // Browsers only allow sound after a user gesture: remember if we've had one.
  useEffect(() => {
    const mark = () => {
      interacted.current = true;
    };
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, mark, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, mark));
  }, []);

  useEffect(() => {
    try {
      const closedAt = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (closedAt && Date.now() - closedAt < SNOOZE_MS) return;
    } catch {
      /* storage blocked: just show it */
    }
    const timer = setTimeout(() => {
      setOpen(true);
      if (interacted.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) chime();
    }, SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }, []);

  if (!open) return null;

  const channels = [
    { key: "whatsapp", label: "WhatsApp", href: WHATSAPP[lang], bg: "#25D366", shadow: "rgba(37,211,102,0.45)", logo: <WhatsAppLogo /> },
    ...(lang === "ru"
      ? [{ key: "telegram", label: "Telegram", href: TELEGRAM_RU, bg: "#229ED9", shadow: "rgba(34,158,217,0.45)", logo: <TelegramLogo /> }]
      : []),
  ];

  return (
    <aside
      aria-label={t.title}
      className="cp-card fixed bottom-4 right-4 z-[60] w-[calc(100vw-2rem)] max-w-[330px] rounded-3xl p-5 text-ink sm:bottom-6 sm:right-6"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(18px) saturate(180%)",
        WebkitBackdropFilter: "blur(18px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 24px 60px rgba(60,35,15,0.28), 0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <button
        type="button"
        onClick={close}
        aria-label={t.close}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-ink-3 transition hover:bg-black/5 hover:text-ink"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="m2 2 8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <p className="font-display pr-6 text-lg font-bold leading-snug">{t.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-2">{t.text}</p>

      <div className="mt-4 flex flex-col gap-2.5">
        {channels.map((c, i) => (
          <a
            key={c.key}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cp-btn group flex items-center gap-3 rounded-2xl py-2 pl-2 pr-4 text-white transition hover:brightness-110 active:scale-[0.98]"
            style={{ background: c.bg, boxShadow: `0 10px 24px ${c.shadow}`, animationDelay: `${0.5 + i * 0.12}s` }}
          >
            <span className="cp-logo relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20" style={{ animationDelay: `${1.2 + i * 0.4}s` }}>
              <span className="cp-ring absolute inset-0 rounded-full" style={{ border: "2px solid rgba(255,255,255,0.7)", animationDelay: `${i * 0.6}s` }} />
              {c.logo}
            </span>
            <span className="text-[0.95rem] font-semibold">{c.label}</span>
            <svg className="ml-auto transition group-hover:translate-x-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ))}
      </div>
    </aside>
  );
}
