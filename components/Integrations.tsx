import type { Lang } from "@/lib/content";
import { INTEGRATIONS } from "@/lib/integrations";
import { AI_AGENT_PATH } from "@/lib/site";

// "Integrations" section: groups of services as chip cards, plus a link card to the AI-agent page.
export default function Integrations({ lang }: { lang: Lang }) {
  const t = INTEGRATIONS[lang];
  return (
    <div className="mx-auto max-w-6xl px-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">{t.eyebrow}</p>
      <h2 className="font-display max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">{t.title}</h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{t.text}</p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.groups.map((g) => (
          <div key={g.title} className="rounded-3xl border border-line bg-paper p-6">
            <h3 className="font-display text-lg font-bold">{g.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span key={item} className="rounded-full bg-ink/5 px-3 py-1.5 text-sm font-medium text-ink">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* the one clickable card: opens the AI-agent page */}
        <a
          href={AI_AGENT_PATH[lang]}
          className="group flex flex-col justify-between rounded-3xl bg-[#171514] p-6 text-cream transition hover:-translate-y-1 sm:col-span-2 lg:col-span-1"
        >
          <div>
            <h3 className="font-display text-lg font-bold leading-snug">{t.agent.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/70">{t.agent.text}</p>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-bright">
            {t.agent.more}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
