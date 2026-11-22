"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONSENT_KEY, PRIVACY_PATH } from "@/lib/site";

// Minimal GDPR consent: Yandex Metrika (cookies + Webvisor session recording) loads only after
// "Accept". "Decline" is one click too. Vercel Analytics is cookieless and runs regardless.
// The choice is kept in localStorage; clearing site data shows the banner again.

const STORAGE_KEY = CONSENT_KEY; // "granted" | "denied"

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
  // Link text must describe the target ("Learn more"/"Подробнее" fail Lighthouse SEO "link-text").
  en: { body: "We use cookies for analytics.", more: "Cookie policy", accept: "Accept", decline: "Decline" },
  ru: { body: "Используем cookie для аналитики.", more: "Политика cookie", accept: "Принять", decline: "Отклонить" },
};

type Consent = "granted" | "denied" | null;

// The banner waits a moment after load, then slides in (up on phones, from the right on desktop);
// on a choice it slides back out and only then unmounts. Reduced-motion users get a plain fade.
const SHOW_DELAY_MS = 1200;
const SLIDE_MS = 500;

// Styled like the floating header pill (same tint, border, blur, shadow and buttons).
// - phones: full-width, two rows (text, then buttons) with a softer radius.
// - sm+: a single h-14 pill. md+: auto width in the bottom-right corner; its right offset mirrors
//   the hero text's left edge (container `max-w-6xl px-5`: max(1.25rem, (100% - 72rem)/2 + 1.25rem)).
const BOX =
  // Denser tint on phones, where the strip sits over busy content; header-identical /70 from sm up.
  "fixed z-[60] flex border border-white/10 bg-[#171514]/90 sm:bg-[#171514]/70 text-cream shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl " +
  "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:transition-opacity " +
  "inset-x-3 bottom-3 flex-col gap-3 rounded-[1.75rem] py-3 pl-5 pr-3 " +
  "sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-full sm:py-0 sm:pr-2 sm:bottom-4 " +
  "md:inset-x-auto md:bottom-6 md:right-[max(1.25rem,calc((100%_-_72rem)/2_+_1.25rem))]";

const HIDDEN = "pointer-events-none opacity-0 translate-y-[calc(100%+2rem)] md:translate-y-0 md:translate-x-16";
const SHOWN = "opacity-100 translate-y-0 md:translate-x-0";

export default function CookieConsent() {
  const pathname = usePathname();
  const lang = pathname?.startsWith("/ru") ? "ru" : "en";
  const t = TEXT[lang];
  const privacyHref = PRIVACY_PATH[lang];
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
          <p className="text-sm text-cream/70">
            {t.body}{" "}
            <a href={privacyHref} className="font-semibold text-cream underline-offset-4 transition hover:underline">
              {t.more}
            </a>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="flex-1 rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-white/20 sm:flex-none"
            >
              {t.decline}
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="flex-1 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 sm:flex-none"
            >
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
