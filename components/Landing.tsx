"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { DICT, FACTS, SERVICE_KEYS, type Lang } from "@/lib/content";
import LeadForm from "@/components/LeadForm";
import DiplomaPlate from "@/components/DiplomaPlate";

const STORAGE_KEY = "ildar-ai-lang";

// Dark panels share one tone so the hero photo melts into the page.
const DARK = "bg-[#171514] text-cream";

// Sections are stacked panels: each one overlaps the previous by the same
// amount and has rounded top corners, so the page reads as separate blocks.
const PANEL = "relative -mt-10 rounded-t-[2.5rem] md:-mt-12 md:rounded-t-[3.5rem]";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>
  );
}

export default function Landing() {
  // English is the default; a visitor's explicit choice is remembered.
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ru") setLang(saved);
    } catch {
      /* storage can be blocked — stay on the default */
    }
  }, []);

  const chooseLang = useCallback((next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = DICT[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  return (
    <div className="relative overflow-x-clip">
      {/* ───── Floating header ───── */}
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full border border-white/10 bg-[#171514]/70 pl-5 pr-2 text-cream shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:pl-6">
          <a href="#top" className="font-display text-[1.05rem] font-bold tracking-tight">
            Ildar Lomov<span className="text-accent">.</span>
          </a>

          <nav className="hidden items-center gap-1 text-sm md:flex">
            {[
              ["#services", t.nav.services],
              ["#projects", t.nav.projects],
              ["#about", t.nav.about],
              ["#contact", t.nav.contact],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-4 py-2 text-cream/70 transition hover:bg-white/10 hover:text-cream"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Shows only the language you can switch TO (RU on the English page, EN on the Russian one). */}
            <button
              type="button"
              onClick={() => chooseLang(lang === "en" ? "ru" : "en")}
              aria-label={lang === "en" ? "Переключить на русский" : "Switch to English"}
              className="rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-white/20"
            >
              {lang === "en" ? "RU" : "EN"}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 sm:inline-block"
            >
              {t.cta}
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ───── Hero: the photo is part of the section ───── */}
        <section className={`relative isolate overflow-hidden pb-10 md:pb-12 ${DARK}`}>
          {/* warm light behind the portrait */}
          <div
            className="pointer-events-none absolute -right-24 top-0 -z-10 h-[620px] w-[760px] opacity-80"
            style={{ background: "radial-gradient(closest-side, rgba(196,106,68,0.38), transparent)" }}
            aria-hidden="true"
          />

          <div className="relative mx-auto flex max-w-6xl flex-col px-5 md:h-[100svh] md:max-h-[940px] md:min-h-[680px] md:flex-row md:items-center">
            <div className="relative z-10 pb-4 pt-32 md:w-[56%] md:py-0 md:pt-16">
              <h1 className="font-display text-[2.6rem] font-bold leading-[1.04] sm:text-6xl lg:text-[4.1rem]">
                {t.hero.title} <span className="text-accent">{t.hero.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">{t.hero.text}</p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(196,106,68,0.35)] transition hover:brightness-110"
                >
                  {t.hero.primary} <Arrow />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-white/10"
                >
                  {t.hero.secondary}
                </a>
              </div>

              <ul className="mt-10 flex flex-wrap gap-2">
                {t.hero.chips.map((chip) => (
                  <li key={chip} className="rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-cream/65">
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Portrait: fades into the section on the sides; sits under the text on phones.
              The inner box starts below the floating header (top-*), leaving headroom above
              the head. Its top fade is deliberately short (5%) so it only dissolves the empty
              door above the head and never shades the head itself. */}
          <div className="relative h-[500px] [mask-image:linear-gradient(to_right,transparent_0%,#000_12%,#000_88%,transparent_100%)] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%] md:[mask-image:linear-gradient(to_right,transparent_0%,#000_32%,#000_86%,transparent_100%)]">
            <div className="absolute inset-x-0 bottom-0 top-10 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_5%)] md:top-24">
              <Image
                src="/hero.jpg"
                alt={t.hero.caption}
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover object-[50%_0%]"
              />
            </div>
          </div>

          <div className="absolute bottom-16 left-5 z-10 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-md md:bottom-20 md:left-auto md:right-[12%]">
            <p className="font-display text-sm font-bold">Ildar Lomov</p>
            <p className="mt-0.5 text-xs text-cream/65">Lisbon · AI &amp; automation</p>
          </div>
        </section>

        {/* ───── Services (light) ───── */}
        <section id="services" className={`${PANEL} bg-cream py-20 md:py-28`}>
          <div className="mx-auto max-w-6xl px-5">
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
            <h2 className="font-display max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
              {t.services.title}
            </h2>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_KEYS.map((key, i) => {
                const s = t.services.items[key];
                return (
                  <article
                    key={key}
                    className="card-shadow flex flex-col rounded-3xl border border-line bg-paper p-7 transition hover:-translate-y-1"
                  >
                    <span className="font-display text-sm font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display mt-4 text-xl font-bold">{s.title}</h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-2">{s.text}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-ink">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}

              <article className={`flex flex-col justify-between rounded-3xl p-7 ${DARK}`}>
                <div>
                  <h3 className="font-display text-xl font-bold">{t.services.moreTitle}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/70">{t.services.moreText}</p>
                </div>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
                >
                  {t.services.moreCta} <Arrow />
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ───── Projects (dark) ───── */}
        <section id="projects" className={`${PANEL} ${DARK} py-20 md:py-28`}>
          <div className="mx-auto max-w-6xl px-5">
            <Eyebrow>{t.projects.eyebrow}</Eyebrow>
            <h2 className="font-display max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
              {t.projects.title}
            </h2>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {t.projects.items.map((p, i) => {
                const meta = FACTS.projects[i];
                return (
                  <a
                    key={p.name}
                    href={meta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-bold leading-snug">{p.name}</h3>
                        <p className="mt-1 text-sm font-medium text-accent">{p.tagline}</p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition group-hover:bg-cream group-hover:text-ink">
                        <Arrow className="-rotate-45" />
                      </span>
                    </div>
                    <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-cream/65">{p.text}</p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-cream/80">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-cream/45">{meta.host}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── About (sand) ───── */}
        <section id="about" className={`${PANEL} bg-cream-2 py-20 md:py-28`}>
          <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_0.9fr]">
            <div>
              <Eyebrow>{t.about.eyebrow}</Eyebrow>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{t.about.title}</h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-2">
                {t.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <a
                href={FACTS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-accent"
              >
                LinkedIn <Arrow className="-rotate-45" />
              </a>
            </div>
            <dl className="grid grid-cols-2 gap-4 self-start">
              {t.about.facts.map((f) => (
                <div
                  key={f.label}
                  className="card-shadow rounded-3xl border border-line bg-paper p-6 [&:last-child:nth-child(odd)]:col-span-2"
                >
                  <dt className="font-display text-3xl font-bold text-accent">{f.value}</dt>
                  <dd className="mt-2 text-sm leading-snug text-ink-2">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ───── Contact (light) ───── */}
        <section id="contact" className={`${PANEL} bg-cream py-20 md:py-28`}>
          <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow>{t.contact.eyebrow}</Eyebrow>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{t.contact.title}</h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">{t.contact.text}</p>

              <dl className="mt-10 space-y-6 text-[0.95rem]">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
                    {t.contact.phoneLabel}
                  </dt>
                  <dd className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <a href={FACTS.phoneHref} className="text-lg font-semibold hover:text-accent">
                      {FACTS.phone}
                    </a>
                    <a
                      href={FACTS.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      WhatsApp →
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
                    {t.contact.emailLabel}
                  </dt>
                  <dd className="mt-1.5">
                    <a href={`mailto:${FACTS.email}`} className="text-lg font-semibold hover:text-accent">
                      {FACTS.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
                    {t.contact.addressLabel}
                  </dt>
                  <dd className="mt-1.5 leading-relaxed">
                    {FACTS.addressLines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card-shadow rounded-3xl border border-line bg-paper p-6 sm:p-9">
              <LeadForm lang={lang} />
            </div>
          </div>
        </section>
      </main>

      {/* ───── Footer (dark) ───── */}
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

          {/* "Not a vibe coder" — sits between the identity block and the address */}
          <DiplomaPlate lang={lang} />

          <address className="text-sm not-italic leading-relaxed text-cream/65">
            {FACTS.addressLines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
            <a href={FACTS.phoneHref} className="mt-1 block hover:text-cream">{FACTS.phone}</a>
          </address>
        </div>
        <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-cream/40">
          © {new Date().getFullYear()} Ildar Lomov. {t.footer.rights}
        </p>
      </footer>
    </div>
  );
}
