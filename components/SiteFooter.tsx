"use client";

import type { Lang } from "@/lib/content";
import { DICT, FACTS } from "@/lib/content";
import { siteNav } from "@/lib/siteNav";
import { PRIVACY_PATH } from "@/lib/site";

// One footer for every page: the original landing footer (identity + address; the diploma moved
// to the About section on 2026-11-24),
// copyright + privacy link) with the sitemap (home sections and pages) added above the copyright.
// It is a stacked panel: overlaps the section above it.

// PANEL and DARK copied verbatim from components/Landing.tsx (the original footer's classes).
const PANEL = "relative -mt-10 rounded-t-[2.5rem] md:-mt-12 md:rounded-t-[3.5rem]";
const DARK = "bg-[#171514] text-cream [--color-accent-ink:var(--color-accent-bright)]";

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const nav = siteNav(lang);
  const col = "text-xs font-semibold uppercase tracking-[0.16em] text-accent-bright";
  const link = "text-sm text-cream/65 transition hover:text-cream";

  return (
    <footer className={`${PANEL} ${DARK} py-12`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-bold">
            Ildar Lomov<span className="text-accent">.</span>
          </p>
          <p className="mt-3 text-sm text-cream/65">{t.footer.role}</p>
          <p className="mt-1 text-sm text-cream/65">
            {t.footer.nifLabel}: <span className="font-semibold text-cream">{FACTS.nif}</span>
          </p>
        </div>

        <address className="text-sm not-italic leading-relaxed text-cream/65">
          {FACTS.addressLines.map((l) => (
            <span key={l} className="block">{l}</span>
          ))}
          <a href={FACTS.phoneHref} className="mt-1 block hover:text-cream">{FACTS.phone}</a>
        </address>
      </div>

      {/* sitemap */}
      <nav aria-label={nav.labels.sitemap} className="mx-auto mt-10 grid max-w-6xl gap-8 border-t border-white/10 px-5 pt-8 sm:grid-cols-[2fr_1fr]">
        <div>
          <p className={col}>{nav.labels.homeTitle}</p>
          <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {nav.sections.map((s) => (
              <li key={s.href}><a href={s.href} className={link}>{s.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className={col}>{nav.labels.pagesTitle}</p>
          <ul className="mt-3 grid gap-y-2">
            {nav.pages.map((p) => (
              <li key={p.href}><a href={p.href} className={link}>{p.label}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-cream/60">
        © {new Date().getFullYear()} Ildar Lomov. {t.footer.rights}{" "}
        <a href={PRIVACY_PATH[lang]} className="underline underline-offset-2 hover:text-cream">
          {t.footer.privacy}
        </a>
      </p>
    </footer>
  );
}
