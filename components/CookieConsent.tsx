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
    body: "We use cookies (Yandex Metrika) to understand how visitors use the site.",
    accept: "Accept",
    decline: "Decline",
  },
  ru: {
    body: "Сайт использует cookie (Яндекс Метрика), чтобы понимать, как посетители пользуются сайтом.",
    accept: "Принять",
    decline: "Отклонить",
  },
};

type Consent = "granted" | "denied" | null;

// The banner waits a moment after load, then slides up from the bottom; on a choice it slides
// back down and only then unmounts. Reduced-motion users get a plain fade (see motion-reduce:).
const SHOW_DELAY_MS = 1200;
const SLIDE_MS = 500;

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
          className={`fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-xl flex-col gap-3 rounded-3xl border border-white/10 bg-[#171514]/95 p-4 text-sm text-cream shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0 motion-reduce:transition-opacity sm:bottom-4 sm:flex-row sm:items-center sm:gap-4 sm:pl-6 ${
            shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0"
          }`}
        >
          <p className="flex-1 leading-snug text-cream/80">{t.body}</p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold text-cream transition hover:bg-white/20 sm:flex-none"
            >
              {t.decline}
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="flex-1 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-110 sm:flex-none"
            >
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
