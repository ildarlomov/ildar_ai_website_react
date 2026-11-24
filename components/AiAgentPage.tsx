import type { Lang } from "@/lib/content";
import { AI_AGENT_PAGE } from "@/lib/integrations";
import { AI_AGENT_PATH, LANG_PATH } from "@/lib/site";

// "How I set up a personal AI agent" page. Stub for now: the full write-up comes later.
export default function AiAgentPage({ lang }: { lang: Lang }) {
  const t = AI_AGENT_PAGE[lang];
  const other: Lang = lang === "en" ? "ru" : "en";
  const home = LANG_PATH[lang];

  return (
    // lang on the wrapper enables correct hyphenation (the root <html> is always lang="en").
    <div lang={lang} className="min-h-screen bg-cream hyphens-auto">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 pt-8">
        <a href={home} className="font-display text-[1.05rem] font-bold tracking-tight text-ink">
          Ildar Lomov<span className="text-accent">.</span>
        </a>
        <a
          href={AI_AGENT_PATH[other]}
          hrefLang={other}
          className="rounded-full bg-ink/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/10"
        >
          {other.toUpperCase()}
        </a>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-20 pt-12">
        <h1 className="font-display text-3xl font-bold leading-tight [overflow-wrap:anywhere] sm:text-5xl">{t.title}</h1>
        <p className="mt-8 text-lg leading-relaxed text-ink-2">{t.intro}</p>
        <p className="mt-4 leading-relaxed text-ink-3">{t.soon}</p>

        <a
          href={`${home === "/" ? "" : home}/#contact`}
          className="mt-10 inline-flex items-center rounded-full bg-accent-deep px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {t.cta}
        </a>

        <div>
          <a href={home} className="mt-12 inline-block text-sm font-semibold text-accent-ink hover:underline">
            ← {t.back}
          </a>
        </div>
      </main>
    </div>
  );
}
