"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Minimal GDPR consent: Yandex Metrika (cookies + Webvisor session recording) loads only after
// "Accept". "Decline" is one click too. Vercel Analytics is cookieless and runs regardless.
// The choice is kept in localStorage; clearing site data shows the banner again.

const STORAGE_KEY = "cookie-consent"; // "granted" | "denied"

// Yandex Metrika counter (ildar.lomov account). Hardcoded: a public id, same in every environment.
const YM_ID = 114345040;
const YM_SNIPPET = `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}", "ym");
ym(${YM_ID}, "init", {ssr:true, webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
`;

const TEXT = {
  en: {
    title: "Cookies",
    body: "We use cookies (Yandex Metrika) to understand how visitors use the site.",
    accept: "Accept",
    decline: "Decline",
  },
  ru: {
    title: "Cookie",
    body: "Сайт использует cookie (Яндекс Метрика), чтобы понимать, как посетители пользуются сайтом.",
    accept: "Принять",
    decline: "Отклонить",
  },
};

type Consent = "granted" | "denied" | null;

// The banner waits a moment after load, then slides in (up on phones, from the right on desktop);
// on a choice it slides back out and only then unmounts. Reduced-motion users get a plain fade.
const SHOW_DELAY_MS = 1200;
const SLIDE_MS = 500;

// Layout:
// - phones: a compact strip along the bottom.
// - md+: a small portrait card (A4 ratio 1:1.414) in the bottom-right corner. Its right offset
//   mirrors the hero text's left edge (container `max-w-6xl px-5`: max(1.25rem, (100% - 72rem)/2
//   + 1.25rem)), and its width is capped so the height never exceeds half the viewport.
const BOX =
  "fixed z-[60] flex rounded-3xl border border-white/10 bg-[#171514]/95 text-cream shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl " +
  "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:transition-opacity " +
  // phones
  "inset-x-3 bottom-3 flex-col gap-3 p-4 text-sm sm:flex-row sm:items-center sm:gap-4 sm:pl-6 " +
  // desktop card
  "md:inset-x-auto md:bottom-6 md:right-[max(1.25rem,calc((100%_-_72rem)/2_+_1.25rem))] md:w-[min(15rem,calc(50vh/1.414))] md:aspect-[1/1.414] " +
  "md:flex-col md:items-stretch md:justify-between md:gap-0 md:p-5";

const HIDDEN = "pointer-events-none opacity-0 translate-y-[calc(100%+2rem)] md:translate-y-0 md:translate-x-16";
const SHOWN = "opacity-100 translate-y-0 md:translate-x-0";

function CookieGlyph() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 3a13 13 0 1 0 13 13 4 4 0 0 1-4.6-4.6A4 4 0 0 1 19.8 7 4 4 0 0 1 16 3z"
        fill="#c46a44"
        fillOpacity="0.9"
      />
      <circle cx="11" cy="14" r="1.8" fill="#171514" />
      <circle cx="17" cy="20" r="1.6" fill="#171514" />
      <circle cx="11.5" cy="21.5" r="1.2" fill="#171514" />
      <circle cx="21.5" cy="15.5" r="1.1" fill="#171514" />
    </svg>
  );
}

export default function CookieConsent() {
  const pathname = usePathname();
  const t = pathname?.startsWith("/ru") ? TEXT.ru : TEXT.en;
  // undefined = not read yet (server render / first paint), so the banner never flashes.
  const [consent, setConsent] = useState<Consent | undefined>(undefined);

  useEffect(() => {
    let saved: Consent = null;
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "granted" || v === "denied") saved = v;
    } catch {
      /* storage blocked — ask every visit */
    }
    setConsent(saved);
  }, []);

  // `shown` drives the slide-in/out transition; the banner stays mounted while it slides out.
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (consent !== null) return;
    const timer = setTimeout(() => setShown(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [consent]);

  const choose = (value: "granted" | "denied") => {
    console.log("[consent]", value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setShown(false);
    setTimeout(() => setConsent(value), SLIDE_MS);
  };

  return (
    <>
      {consent === "granted" && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {YM_SNIPPET}
        </Script>
      )}
      {consent === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookies"
          aria-hidden={!shown}
          className={`${BOX} ${shown ? SHOWN : HIDDEN}`}
        >
          <div className="flex-1 md:flex-none">
            <div className="hidden md:block">
              <CookieGlyph />
              <p className="font-display mt-4 text-lg font-bold tracking-tight">{t.title}</p>
            </div>
            <p className="leading-snug text-cream/80 md:mt-2 md:text-[13px] md:leading-relaxed md:text-cream/65">{t.body}</p>
          </div>
          <div className="flex shrink-0 gap-2 md:flex-col">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="order-2 flex-1 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-110 sm:flex-none md:order-1 md:w-full"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="order-1 flex-1 rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold text-cream transition hover:bg-white/20 sm:flex-none md:order-2 md:w-full"
            >
              {t.decline}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
