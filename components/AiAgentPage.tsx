import type { Lang } from "@/lib/content";
import { AI_AGENT } from "@/lib/aiAgent";
import { AI_AGENT_PATH, LANG_PATH } from "@/lib/site";

// Offer page: personal AI agent setup consultation. Copy lives in lib/aiAgent.ts.
// Layout follows the home page: stacked panels, each next panel overlaps the previous one with
// rounded top corners (later siblings paint on top). At most ONE level of nesting inside a panel
// (a card); anything deeper is a pill / button / plain list, never another boxed block.

const PANEL = "relative -mt-10 rounded-t-[2.5rem] md:-mt-12 md:rounded-t-[3.5rem]";
const DARK = "bg-[#171514] text-cream";
const WRAP = "mx-auto max-w-6xl px-5";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`mt-0.5 shrink-0 ${className}`}>
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.15" />
      <path d="M6 10.2l2.6 2.6L14 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AiAgentPage({ lang }: { lang: Lang }) {
  const t = AI_AGENT[lang];
  const other: Lang = lang === "en" ? "ru" : "en";
  const home = LANG_PATH[lang];
  const formHref = `${home === "/" ? "" : home}/#contact`;

  // Primary + secondary CTA, used in the hero and in the closing panel (no card around them).
  const Ctas = () => (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <a
        href={t.price.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-deep px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(196,106,68,0.35)] transition hover:brightness-110"
      >
        {t.price.cta} <Arrow />
      </a>
      <a
        href={formHref}
        className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-white/10"
      >
        {t.price.ctaAlt}
      </a>
    </div>
  );

  return (
    // lang on the wrapper enables correct hyphenation (the root <html> is always lang="en").
    <div lang={lang} className="relative overflow-x-clip bg-cream">
      {/* ───── hero (dark): text on the left, the single price card on the right ───── */}
      <section className={`relative isolate overflow-hidden pb-20 md:pb-28 ${DARK}`}>
        <div
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[560px] w-[720px] opacity-80"
          style={{ background: "radial-gradient(closest-side, rgba(196,106,68,0.32), transparent)" }}
          aria-hidden="true"
        />
        <header className={`${WRAP} flex items-center justify-between pt-8`}>
          <a href={home} className="font-display text-[1.05rem] font-bold tracking-tight">
            Ildar Lomov<span className="text-accent">.</span>
          </a>
          <a
            href={AI_AGENT_PATH[other]}
            hrefLang={other}
            className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:bg-white/20"
          >
            {other.toUpperCase()}
          </a>
        </header>

        <div className={`${WRAP} grid gap-10 pt-14 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-center md:pt-20`}>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">{t.eyebrow}</p>
            <h1 className="font-display text-[2.1rem] font-bold leading-[1.08] [overflow-wrap:anywhere] sm:text-5xl">{t.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">{t.lead}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-bold tracking-tight">{t.price.amount}</span>
              <span className="text-sm font-medium text-cream/60">{t.price.label}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {t.price.includes.map((x) => (
                <li key={x} className="flex gap-3 text-[0.95rem] leading-snug text-cream/85">
                  <Check className="text-accent-bright" />
                  {x}
                </li>
              ))}
            </ul>
            <a
              href={t.price.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex items-center justify-center gap-2 rounded-full bg-accent-deep px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(196,106,68,0.35)] transition hover:brightness-110"
            >
              {t.price.cta} <Arrow />
            </a>
            <a href={formHref} className="mt-3 block text-center text-xs font-medium text-cream/60 underline-offset-4 hover:text-cream hover:underline">
              {t.price.ctaAlt}
            </a>
          </div>
        </div>
      </section>

      <main>
        {/* ───── what the agent is (light): text + task pills, no cards ───── */}
        <section className={`${PANEL} bg-cream py-20 md:py-28`}>
          <div className={`${WRAP} grid gap-10 md:grid-cols-2 md:gap-16`}>
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{t.what.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-2">{t.what.text}</p>
            </div>
            <div className="md:pt-2">
              <div className="flex flex-wrap gap-2">
                {t.what.tasks.map((x) => (
                  <span key={x} className="rounded-full bg-ink/[0.06] px-4 py-2 text-[0.95rem] font-medium text-ink">
                    {x}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink-3">{t.what.note}</p>
            </div>
          </div>
        </section>

        {/* ───── how it goes (sand): one level of cards ───── */}
        <section className={`${PANEL} py-20 md:py-28`} style={{ background: "#f3e2cb" }}>
          <div className={WRAP}>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{t.how.title}</h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-2">
              {t.how.steps.map((s, i) => (
                <li key={s.title} className="rounded-3xl bg-paper p-5 shadow-[0_10px_30px_rgba(80,50,20,0.06)] sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
                    {String(i + 1).padStart(2, "0")} · {s.badge}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-2">{s.text}</p>
                  {s.points && (
                    <ul className="mt-4 space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-[0.95rem] text-ink">
                          <Check className="text-accent-ink" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───── result + price (dark): plain list and buttons, no inner card ───── */}
        <section className={`${PANEL} ${DARK} py-20 md:py-28`}>
          <div className={`${WRAP} grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-16`}>
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{t.result.title}</h2>
              <ul className="mt-7 space-y-3.5">
                {t.result.items.map((x) => (
                  <li key={x} className="flex gap-3 text-lg leading-snug text-cream/85">
                    <Check className="text-accent-bright" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pt-1">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-6xl font-bold tracking-tight">{t.price.amount}</span>
                <span className="text-sm font-medium text-cream/60">{t.price.label}</span>
              </div>
              <p className="mt-5 max-w-md text-cream/65">{t.result.outro}</p>
              <div className="mt-8">
                <Ctas />
              </div>
            </div>
          </div>
        </section>

        {/* ───── FAQ (light): divider list, no box around it ───── */}
        <section className={`${PANEL} bg-cream pb-20 pt-20 md:pt-28`}>
          <div className={WRAP}>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{t.faq.title}</h2>
            <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
              {t.faq.items.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="text-2xl font-normal text-ink-3 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
            <a href={home} className="mt-12 inline-block text-sm font-semibold text-accent-ink hover:underline">
              ← {t.back}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
