"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/content";
import { LANG_COOKIE } from "@/lib/site";
import { siteNav } from "@/lib/siteNav";

// One floating header for every page of the site: logo, menu (4 items + "Sitemap", hard cap 5),
// language switch and the contact CTA. "Sitemap" opens a panel with every home section and page;
// on phones the same panel sits behind a "Menu" button.
// `switchHref` = the same page in each language (home, /ai-agent, /privacy…).

export default function SiteHeader({ lang, switchHref }: { lang: Lang; switchHref: Record<Lang, string> }) {
  const nav = siteNav(lang);
  const switchTo: Lang = lang === "en" ? "ru" : "en";
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  // The switcher remembers an explicit choice so the geo auto-redirect (middleware.ts) never overrides it.
  const rememberChoice = useCallback(() => {
    console.log("[lang] switch", { from: lang, to: switchTo });
    document.cookie = `${LANG_COOKIE}=${switchTo}; path=/; max-age=31536000; samesite=lax`;
  }, [lang, switchTo]);

  // Close the sitemap panel on Escape or a click outside the header.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header ref={panel} className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#171514]/70 pl-5 pr-2 text-cream shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:pl-6">
        <a href={nav.pages[0].href} className="font-display text-[1.05rem] font-bold tracking-tight">
          Ildar Lomov<span className="text-accent">.</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 text-sm md:flex">
          {nav.menu.map((m) => (
            <a key={m.href} href={m.href} className="rounded-full px-4 py-2 text-cream/70 transition hover:bg-white/10 hover:text-cream">
              {m.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sitemap-panel"
            className={`rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-cream ${open ? "bg-white/10 text-cream" : "text-cream/70"}`}
          >
            {nav.labels.sitemap}
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={switchHref[switchTo]}
            hrefLang={switchTo}
            onClick={rememberChoice}
            aria-label={lang === "en" ? "Переключить на русский" : "Switch to English"}
            className="rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-white/20"
          >
            {switchTo.toUpperCase()}
          </a>
          <a
            href={nav.contact}
            className="hidden rounded-full bg-accent-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 sm:inline-block"
          >
            {nav.labels.cta}
          </a>
          {/* phones: the menu lives in the sitemap panel */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sitemap-panel"
            aria-label={open ? nav.labels.close : nav.labels.menuMobile}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* sitemap panel */}
      <div
        id="sitemap-panel"
        hidden={!open}
        className="mx-auto mt-2 max-w-5xl rounded-[1.75rem] border border-white/10 bg-[#171514]/95 p-6 text-cream shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-8"
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright">{nav.labels.homeTitle}</p>
            <ul className="mt-3 grid gap-1">
              {nav.sections.map((s) => (
                <li key={s.href}>
                  <a href={s.href} onClick={close} className="block rounded-xl px-3 py-2 text-[0.95rem] text-cream/80 transition hover:bg-white/10 hover:text-cream">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright">{nav.labels.pagesTitle}</p>
            <ul className="mt-3 grid gap-1">
              {nav.pages.map((p) => (
                <li key={p.href}>
                  <a href={p.href} onClick={close} className="block rounded-xl px-3 py-2 text-[0.95rem] text-cream/80 transition hover:bg-white/10 hover:text-cream">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={nav.contact}
              onClick={close}
              className="mt-6 inline-flex rounded-full bg-accent-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 sm:hidden"
            >
              {nav.labels.cta}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
