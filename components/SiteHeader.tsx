"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/content";
import { LANG_COOKIE } from "@/lib/site";
import { siteNav } from "@/lib/siteNav";
import { InstagramLogo, TelegramLogo, ThreadsLogo } from "@/components/funnels/mocks";
import { MemcircleGlyph } from "@/components/memcircle/MemcircleGlyph";

// Sitemap tiles wear their section's colours (rosy Instagram, dark Threads, sand Memcircle, accent agent).
const TILE = {
  instagram: { bg: "#f8e7e3", fg: "#1a1a1a", ring: "", icon: <><InstagramLogo size={22} /><TelegramLogo size={22} /></> },
  threads: { bg: "#000000", fg: "#f6efe6", ring: "rgba(255,255,255,0.16)", icon: <ThreadsLogo size={22} color="#f6efe6" /> },
  memcircle: { bg: "#f6e3cf", fg: "#1a1a1a", ring: "", icon: <MemcircleGlyph size={24} color="#1a1a1a" /> },
  agent: {
    bg: "#b35d39",
    fg: "#ffffff",
    ring: "",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
      </svg>
    ),
  },
} as const;

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
    <>
    {/* Backdrop while the sitemap is open: blurs and slightly dims the page so the focus is on the
        panel. Always mounted so it can fade; click-through is off when closed. A click on it closes
        the panel (the outside-click listener above). */}
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-40 bg-[#171514]/25 transition-[opacity,backdrop-filter] duration-300 ${open ? "opacity-100 backdrop-blur-md" : "pointer-events-none opacity-0 backdrop-blur-none"}`}
    />
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

      {/* sitemap panel: four tiles in each section's own colours, then the rest as pills */}
      <div
        id="sitemap-panel"
        hidden={!open}
        className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-5xl overflow-y-auto rounded-[1.75rem] border border-white/10 bg-[#171514]/95 p-4 text-cream shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-6"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {nav.featured.map((f) => {
            const tone = TILE[f.key];
            return (
              <a
                key={f.key}
                href={f.href}
                onClick={close}
                // phones: compact rows (icon left); sm+: tall tiles
                className="group flex items-center gap-3 rounded-2xl p-3.5 transition hover:-translate-y-0.5 sm:min-h-[9.5rem] sm:flex-col sm:items-start sm:justify-between sm:p-4"
                style={{ background: tone.bg, color: tone.fg, boxShadow: tone.ring ? `inset 0 0 0 1px ${tone.ring}` : undefined }}
              >
                <span className="flex shrink-0 items-center gap-1.5">{tone.icon}</span>
                <span>
                  <span className="block font-display text-[1.05rem] font-bold leading-snug">{f.label}</span>
                  <span className="mt-1 block text-[0.8rem] leading-snug" style={{ opacity: 0.75 }}>{f.desc}</span>
                </span>
              </a>
            );
          })}
        </div>

        <p className="mt-5 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-cream/60">{nav.labels.moreTitle}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {nav.more.map((m) => (
            <a key={m.href} href={m.href} onClick={close} className="rounded-full bg-white/10 px-4 py-2 text-sm text-cream/85 transition hover:bg-white/20 hover:text-cream">
              {m.label}
            </a>
          ))}
          <a
            href={nav.contact}
            onClick={close}
            className="rounded-full bg-accent-deep px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 sm:hidden"
          >
            {nav.labels.cta}
          </a>
        </div>
      </div>
    </header>
    </>
  );
}
