import type { Lang } from "@/lib/content";
import { AI_AGENT } from "@/lib/aiAgent";
import { AI_AGENT_PATH, LANG_PATH } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AgentGallery from "@/components/AgentGallery";

// Offer page: personal AI agent setup consultation. Copy lives in lib/aiAgent.ts.
// Same shell as every page: SiteHeader on top, SiteFooter (with the sitemap) at the bottom.
// Layout rules (Ildar): stacked panels, each next panel overlaps the previous one with rounded top
// corners; on desktop the main panels fill the screen; at most ONE boxed level inside a panel.

const PANEL = "relative -mt-10 rounded-t-[2.5rem] md:-mt-12 md:rounded-t-[3.5rem]";
const SCREEN = "md:flex md:min-h-[100svh] md:flex-col md:justify-center";
const DARK = "bg-[#171514] text-cream";
const WRAP = "mx-auto w-full max-w-6xl px-5";

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
  const home = LANG_PATH[lang];
  const formHref = `${home}#contact`; // "/#contact" or "/ru#contact" ("/ru/" would 308-redirect)

  return (
    <div lang={lang} className="relative overflow-x-clip bg-cream">
      <SiteHeader lang={lang} switchHref={AI_AGENT_PATH} />

      <main>
        {/* ───── hero (dark, full screen): offer on the left, the one price card on the right ───── */}
        <section className={`relative isolate overflow-hidden pb-24 pt-28 md:pb-28 ${SCREEN} ${DARK}`}>
          <div
            className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[620px] w-[760px] opacity-80"
            style={{ background: "radial-gradient(closest-side, rgba(196,106,68,0.32), transparent)" }}
            aria-hidden="true"
          />
          <div className={`${WRAP} grid gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-center md:gap-14`}>
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">{t.eyebrow}</p>
              <h1 className="font-display text-[2.1rem] font-bold leading-[1.08] sm:text-5xl lg:text-[3.4rem]">{t.title}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">{t.lead}</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-8">
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

        {/* ───── what the agent can do (light, full screen): auto-advancing task gallery ───── */}
        <section className={`${PANEL} bg-cream py-20 md:py-28 ${SCREEN}`}>
          <div className={WRAP}>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{t.gallery.title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{t.gallery.lead}</p>
            <div className="mt-10">
              <AgentGallery g={t.gallery} />
            </div>
          </div>
        </section>

        {/* ───── how it goes (sand, full screen): one card holding a connected timeline ───── */}
        <section className={`${PANEL} py-20 md:py-28 ${SCREEN}`} style={{ background: "#f3e2cb" }}>
          <div className={WRAP}>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{t.how.title}</h2>

            <ol className="mt-10 grid rounded-[2rem] bg-paper p-6 shadow-[0_20px_60px_rgba(80,50,20,0.08)] sm:p-8 md:grid-cols-[2fr_1fr_1fr] md:p-10">
              {t.how.stages.map((st, i) => {
                const last = i === t.how.stages.length - 1;
                return (
                  // Phones: a vertical timeline (line on the left). Desktop: columns joined by a line through the dots.
                  <li key={st.badge} className={`relative pl-12 md:pl-0 ${last ? "" : "pb-10 md:pb-0 md:pr-8"} ${i > 0 ? "md:pl-8" : ""}`}>
                    {!last && <span aria-hidden="true" className="absolute bottom-0 left-4 top-10 w-px bg-line md:hidden" />}
                    <div className="flex items-center gap-3">
                      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#171514] font-display text-sm font-bold text-cream md:static">
                        {i + 1}
                      </span>
                      {/* the line runs after every dot, the last one included */}
                      <span aria-hidden="true" className="hidden h-px flex-1 bg-line md:block" />
                    </div>
                    <div className="md:mt-5">
                      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-display text-xl font-bold">{st.badge}</span>
                        <span className="text-sm font-semibold text-accent-ink">{st.meta}</span>
                      </p>
                      <div className={`mt-4 grid gap-6 ${st.parts.length > 1 ? "sm:grid-cols-2" : ""}`}>
                        {st.parts.map((p) => (
                          <div key={p.title}>
                            <h3 className="font-display text-lg font-bold">{p.title}</h3>
                            <p className="mt-2 leading-relaxed text-ink-2">{p.text}</p>
                            {p.points && (
                              <ul className="mt-3 space-y-1.5">
                                {p.points.map((x) => (
                                  <li key={x} className="flex gap-2.5 text-[0.95rem] text-ink">
                                    <Check className="text-accent-ink" />
                                    {x}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                      {st.note && <p className="mt-5 border-l-2 border-accent pl-3 text-[0.95rem] leading-relaxed text-ink-2">{st.note}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ───── result + price (dark, full screen): plain list and buttons ───── */}
        <section className={`${PANEL} ${DARK} py-20 md:py-28 ${SCREEN}`}>
          <div className={`${WRAP} grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-center md:gap-16`}>
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{t.result.title}</h2>
              <ul className="mt-8 space-y-4">
                {t.result.items.map((x) => (
                  <li key={x} className="flex gap-3 text-lg leading-snug text-cream/85">
                    <Check className="text-accent-bright" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-6xl font-bold tracking-tight sm:text-7xl">{t.price.amount}</span>
                <span className="text-sm font-medium text-cream/60">{t.price.label}</span>
              </div>
              <p className="mt-5 max-w-md text-cream/65">{t.result.outro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
            </div>
          </div>
        </section>

        {/* ───── popular questions (light): divider list ───── */}
        <section className={`${PANEL} bg-cream pb-28 pt-20 md:pt-28`}>
          <div className={WRAP}>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{t.faq.title}</h2>
            <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
              {t.faq.items.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="text-2xl font-normal text-ink-3 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-2">{f.a}</p>
                  {f.list && (
                    <ul className="mt-3 space-y-2">
                      {f.list.map((x) => (
                        <li key={x} className="flex gap-2.5 leading-relaxed text-ink-2">
                          <Check className="text-accent-ink" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
