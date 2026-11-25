"use client";

import Image from "next/image";
import { useEffect } from "react";
import { DICT, FACTS, SERVICE_KEYS, type Lang, type SocialKey } from "@/lib/content";
import { LANG_PATH } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import CaseSlides from "@/components/CaseSlides";
import ThreadsFunnel from "@/components/funnels/ThreadsFunnel";
import InstagramFunnel from "@/components/funnels/InstagramFunnel";
import ContentFactory from "@/components/funnels/ContentFactory";
import ContactPopup from "@/components/ContactPopup";
import DiplomaPlate from "@/components/DiplomaPlate";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Integrations from "@/components/Integrations";

// Dark panels share one tone so the hero photo melts into the page.
// Dark panels swap the small-text accent to the brighter variant (see accent roles in globals.css).
const DARK = "bg-[#171514] text-cream [--color-accent-ink:var(--color-accent-bright)]";

// Sections are stacked panels: each one overlaps the previous by the same
// amount and has rounded top corners, so the page reads as separate blocks.
// "wallet" (globals.css): card edge — shadow cast on the card above, a glossy rim, a glow that follows
// the cursor along the edge, and a slide-in as the card scrolls into view. Dark cards add "wallet-dark".
const PANEL = "wallet relative -mt-10 rounded-t-[2.5rem] md:-mt-12 md:rounded-t-[3.5rem]";

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
  // Each language has its own URL ("/" and "/ru"); middleware.ts sends first-time Russian-speaking
  // visitors to /ru. The header (SiteHeader) holds the language switch.
  const t = DICT[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  // Wallet edges: when the cursor is just below a card's top edge, a glow follows it along the edge.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>("main .wallet").forEach((el) => {
          const r = el.getBoundingClientRect();
          const dy = e.clientY - r.top;
          const near = dy > -8 && dy < 140;
          el.style.setProperty("--shine", near ? String(1 - Math.max(0, dy) / 160) : "0");
          if (near) el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative overflow-x-clip">
      <SiteHeader lang={lang} switchHref={LANG_PATH} />

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

        {/* ───── Funnels: social-media auto-funnels. Order is for colour contrast:
             dark hero → cool content factory → rosy Instagram → dark Threads → sand Memcircle case ───── */}
        <section id="content-factory" className={`${PANEL} overflow-hidden`} style={{ background: "#eaecf6" }}>
          <ContentFactory lang={lang} />
        </section>
        <section id="funnel-instagram" className={`${PANEL} overflow-hidden`} style={{ background: "#f8e7e3" }}>
          <InstagramFunnel lang={lang} />
        </section>
        <section id="funnel-threads" className={`${PANEL} wallet-dark overflow-hidden`} style={{ background: "#171514" }}>
          <ThreadsFunnel lang={lang} />
        </section>

        {/* ───── Cases (sand): one-project slide deck ───── */}
        <section id="cases" className={`${PANEL} overflow-hidden`} style={{ background: "#f6e3cf" }}>
          <CaseSlides t={t.cases} />
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
        <section id="projects" className={`${PANEL} wallet-dark ${DARK} py-20 md:py-28`}>
          <div className="mx-auto max-w-6xl px-5">
            <Eyebrow>{t.projects.eyebrow}</Eyebrow>
            <h2 className="font-display max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
              {t.projects.title}
            </h2>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {t.projects.items.map((p, i) => {
                const meta = FACTS.projects[i];
                const body = (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-bold leading-snug">{p.name}</h3>
                        <p className="mt-1 text-sm font-medium text-accent-ink">{p.tagline}</p>
                      </div>
                      {meta.url && (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition group-hover:bg-cream group-hover:text-ink">
                          <Arrow className="-rotate-45" />
                        </span>
                      )}
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
                      {meta.host && <span className="text-xs font-semibold text-cream/60">{meta.host}</span>}
                    </div>
                  </>
                );
                const box = "group flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7";
                // Cards without a public link (e.g. Context Whisper CRM) render as plain blocks.
                return meta.url ? (
                  <a
                    key={p.name}
                    href={meta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${box} transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]`}
                  >
                    {body}
                  </a>
                ) : (
                  <div key={p.name} className={box}>
                    {body}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── Integrations (light): no menu link on purpose (menu is capped) ───── */}
        <section id="integrations" className={`${PANEL} bg-cream py-20 md:py-28`}>
          <Integrations lang={lang} />
        </section>

        {/* ───── About (dark: contrasts with the light Integrations and Contact around it) ───── */}
        <section id="about" className={`${PANEL} wallet-dark ${DARK} py-20 md:py-28`}>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1fr_0.85fr] md:gap-16">
            <div>
              <Eyebrow>{t.about.eyebrow}</Eyebrow>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{t.about.title}</h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-cream/70">
                {t.about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-8 border-l-2 border-accent pl-5">
                <p className="font-display text-xl font-bold text-cream">
                  {t.about.vibe.title} <span aria-hidden="true">🙂</span>
                </p>
                <p className="mt-2 text-lg leading-relaxed text-cream/70">{t.about.vibe.text}</p>
              </div>
              {/* social channels: same pills as the hero, minus WhatsApp (that one is for contact) */}
              <p className="mt-8 text-lg leading-relaxed text-cream/70">{t.about.social}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {FACTS.socials.filter((s) => s.key !== "whatsapp" && !s.hideIn?.includes(lang)).map((s) => (
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
            <DiplomaPlate lang={lang} variant="large" />
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
      <SiteFooter lang={lang} />
      <ContactPopup lang={lang} />
    </div>
  );
}
