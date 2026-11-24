import type { Lang } from "@/lib/content";
import { AI_AGENT } from "@/lib/aiAgent";
import { AI_AGENT_PATH, LANG_PATH } from "@/lib/site";

// Offer page: personal AI agent setup consultation. Copy lives in lib/aiAgent.ts.
// Server-rendered one-pager: dark hero with the price card, then what / how / result / FAQ.

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

  const PriceCard = () => (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 text-cream backdrop-blur">
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
  );

  return (
    // lang on the wrapper enables correct hyphenation (the root <html> is always lang="en").
    <div lang={lang} className="min-h-screen bg-cream">
      {/* ───── hero (dark) ───── */}
      <div className="relative isolate overflow-hidden rounded-b-[2.5rem] bg-[#171514] text-cream md:rounded-b-[3.5rem]">
        <div
          className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[560px] w-[720px] opacity-80"
          style={{ background: "radial-gradient(closest-side, rgba(196,106,68,0.32), transparent)" }}
          aria-hidden="true"
        />
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-8">
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

        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-center md:pb-24 md:pt-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">{t.eyebrow}</p>
            <h1 className="font-display text-[2.1rem] font-bold leading-[1.08] [overflow-wrap:anywhere] sm:text-5xl">{t.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">{t.lead}</p>
          </div>
          <PriceCard />
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 pb-20 hyphens-auto">
        {/* ───── what the agent is ───── */}
        <section className="pt-20 md:pt-28">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{t.what.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-2">{t.what.text}</p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {t.what.tasks.map((x) => (
                  <span key={x} className="rounded-full border border-line bg-paper px-4 py-2 text-[0.95rem] font-medium text-ink">
                    {x}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink-3">{t.what.note}</p>
            </div>
          </div>
        </section>

        {/* ───── how it goes ───── */}
        <section className="pt-20 md:pt-28">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{t.how.title}</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {t.how.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl border border-line bg-paper p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171514] font-display text-sm font-bold text-cream">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">{s.badge}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
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
        </section>

        {/* ───── result + price again ───── */}
        <section className="pt-20 md:pt-28">
          <div className="grid gap-8 rounded-[2.5rem] bg-[#171514] p-7 text-cream sm:p-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-12 md:p-14">
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
              <p className="mt-8 max-w-lg text-cream/60">{t.result.outro}</p>
            </div>
            <PriceCard />
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="pt-20 md:pt-28">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{t.faq.title}</h2>
          <div className="mt-8 divide-y divide-line rounded-3xl border border-line bg-paper">
            {t.faq.items.map((f) => (
              <details key={f.q} className="group px-6 py-5 sm:px-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                  {f.q}
                  <span className="text-2xl font-normal text-ink-3 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <a href={home} className="mt-14 inline-block text-sm font-semibold text-accent-ink hover:underline">
          ← {t.back}
        </a>
      </main>
    </div>
  );
}
