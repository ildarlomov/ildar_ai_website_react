"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { DICT, FACTS, SERVICE_KEYS, type Lang, type SocialKey } from "@/lib/content";
import { LANG_COOKIE, LANG_PATH, PRIVACY_PATH } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import DiplomaPlate from "@/components/DiplomaPlate";
import CaseSlides from "@/components/CaseSlides";
import ThreadsFunnel from "@/components/funnels/ThreadsFunnel";
import InstagramFunnel from "@/components/funnels/InstagramFunnel";
import { FUNNELS } from "@/lib/funnels";
import ContactPopup from "@/components/ContactPopup";

// Dark panels share one tone so the hero photo melts into the page.
// Dark panels swap the small-text accent to the brighter variant (see accent roles in globals.css).
const DARK = "bg-[#171514] text-cream [--color-accent-ink:var(--color-accent-bright)]";

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

function SocialIcon({ name }: { name: SocialKey }) {
  const common = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "telegram":
      return (
        <svg {...common}>
          <path d="M21 4 3 11l6 2.5L11.5 20l3-4.5L19 19z" />
          <path d="m9 13.5 12-9.5" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3.5 20.5 5 16A8.5 8.5 0 1 1 8 19z" />
          <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
          <path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10.5V16M8 7.8v.1M12 16v-5.5M12 13c0-1.7 1-2.6 2.3-2.6S16.5 11.3 16.5 13V16" />
        </svg>
      );
    case "threads":
      return (
        <svg {...common}>
          <path d="M16.5 8.500C15.8 6.3 14.2 5 12 5c-3 0-5 2.4-5 7s2 7 5 7c2.6 0 4.5-1.5 4.5-3.8 0-2.3-2-3.4-4.3-3.4-1.5 0-2.7.7-2.7 1.9 0 1 .9 1.7 2 1.7 1.9 0 2.9-1.5 2.9-4.3" />
        </svg>
      );
  }
}

// Brand colours for the hero social badges: the line glyph sits in a filled brand-coloured disc.
const SOCIAL_BRAND: Record<SocialKey, { bg: string; fg: string }> = {
  threads: { bg: "#ffffff", fg: "#000000" },
  telegram: { bg: "#229ED9", fg: "#ffffff" },
  whatsapp: { bg: "#25D366", fg: "#ffffff" },
  instagram: {
    bg: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    fg: "#ffffff",
  },
  youtube: { bg: "#FF0000", fg: "#ffffff" },
  linkedin: { bg: "#0A66C2", fg: "#ffffff" },
};

function SocialBadgeIcon({ name }: { name: SocialKey }) {
  const brand = SOCIAL_BRAND[name];
  return (
    <span
      className="-ml-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full [&_svg]:h-3.5 [&_svg]:w-3.5"
      style={{ background: brand.bg, color: brand.fg }}
      aria-hidden="true"
    >
      <SocialIcon name={name} />
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">{children}</p>
  );
}

export default function Landing({ lang }: { lang: Lang }) {
  // Each language has its own URL ("/" and "/ru"); middleware.ts sends first-time
  // Russian-speaking visitors to /ru. The switcher remembers an explicit choice in a
  // cookie so the auto-redirect never overrides it.
  const switchTo: Lang = lang === "en" ? "ru" : "en";
  const rememberChoice = useCallback(() => {
    console.log("[lang] switch", { from: lang, to: switchTo });
    document.cookie = `${LANG_COOKIE}=${switchTo}; path=/; max-age=31536000; samesite=lax`;
  }, [lang, switchTo]);

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

          <nav aria-label="Main" className="hidden items-center gap-1 text-sm md:flex">
            {[
              ["#cases", t.nav.cases],
              ["#funnels", FUNNELS[lang].nav],
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
            <a
              href={LANG_PATH[switchTo]}
              hrefLang={switchTo}
              onClick={rememberChoice}
              aria-label={lang === "en" ? "Переключить на русский" : "Switch to English"}
              className="rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-white/20"
            >
              {lang === "en" ? "RU" : "EN"}
            </a>
            <a
              href="#contact"
              className="hidden rounded-full bg-accent-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 sm:inline-block"
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

          <div className="relative mx-auto flex max-w-6xl flex-col px-5 md:min-h-[min(100svh,940px)] md:flex-row md:items-center">
            <div className="relative z-10 pb-4 pt-32 md:w-[56%] md:py-0 md:pb-20 md:pt-28">
              <h1 className="font-display text-[2.2rem] font-bold leading-[1.06] sm:text-5xl lg:text-[3.5rem]">
                {t.hero.title} <span className="text-accent">{t.hero.titleAccent}</span>
              </h1>
              {t.hero.text.map((para, i) => (
                <p
                  key={i}
                  className={`max-w-xl leading-relaxed ${i === 0 ? "mt-6 text-lg text-cream/70" : "mt-4 text-base text-cream/60"}`}
                >
                  {para}
                </p>
              ))}

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(196,106,68,0.35)] transition hover:brightness-110"
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
                {FACTS.socials.filter((s) => !s.hideIn?.includes(lang)).map((s) => (
                  <li key={s.key}>
                    <a
                      href={typeof s.url === "string" ? s.url : s.url[lang]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-medium text-cream/65 transition hover:border-white/30 hover:bg-white/10 hover:text-cream"
                    >
                      <SocialBadgeIcon name={s.key} />
                      {s.label}
                      {s.followers && <span className="text-cream/60">{s.followers}</span>}
                    </a>
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

        </section>

        {/* ───── Cases (sand): one-project slide deck ───── */}
        <section id="cases" className={`${PANEL} overflow-hidden pb-10 md:pb-12`} style={{ background: "#f6e3cf" }}>
          <CaseSlides t={t.cases} />
        </section>

        {/* ───── Funnels: social-media auto-funnels (Threads dark, then Instagram rosy) ───── */}
        <section id="funnels" className={`${PANEL} overflow-hidden pb-10 md:pb-12`} style={{ background: "#171514" }}>
          <ThreadsFunnel lang={lang} />
        </section>
        <section id="funnel-instagram" className={`${PANEL} overflow-hidden pb-10 md:pb-12`} style={{ background: "#f8e7e3" }}>
          <InstagramFunnel lang={lang} />
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
                    <span className="font-display text-sm font-bold text-accent-ink">
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
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink transition hover:gap-3"
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
                        <p className="mt-1 text-sm font-medium text-accent-ink">{p.tagline}</p>
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
                      <span className="text-xs font-semibold text-cream/60">{meta.host}</span>
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
                      className="text-sm font-semibold text-accent-ink underline-offset-4 hover:underline"
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
        <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-cream/60">
          © {new Date().getFullYear()} Ildar Lomov. {t.footer.rights}{" "}
          <a href={PRIVACY_PATH[lang]} className="underline underline-offset-2 hover:text-cream">
            {t.footer.privacy}
          </a>
        </p>
      </footer>
      <ContactPopup lang={lang} />
    </div>
  );
}
