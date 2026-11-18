import type { Lang } from "@/lib/content";
import { PRIVACY } from "@/lib/privacy";
import { LANG_PATH, PRIVACY_PATH } from "@/lib/site";
import CookieSettings from "@/components/CookieSettings";

// Short, plain privacy policy page (server-rendered). Copy lives in lib/privacy.ts.
export default function PrivacyPolicy({ lang }: { lang: Lang }) {
  const t = PRIVACY[lang];
  const other: Lang = lang === "en" ? "ru" : "en";

  return (
    // lang on the wrapper enables correct hyphenation (the root <html> is always lang="en").
    <div lang={lang} className="min-h-screen bg-cream hyphens-auto">

      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 pt-8">
        <a href={LANG_PATH[lang]} className="font-display text-[1.05rem] font-bold tracking-tight text-ink">
          Ildar Lomov<span className="text-accent">.</span>
        </a>
        <a
          href={PRIVACY_PATH[other]}
          hrefLang={other}
          className="rounded-full bg-ink/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-ink/10"
        >
          {other.toUpperCase()}
        </a>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-20 pt-12">
        <h1 className="font-display text-3xl font-bold leading-tight [overflow-wrap:anywhere] sm:text-5xl">{t.title}</h1>
        <p className="mt-3 text-sm text-ink-3">{t.updated}</p>
        <p className="mt-8 text-lg leading-relaxed text-ink-2">{t.intro}</p>

        {t.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="font-display text-xl font-bold">{s.h}</h2>
            {s.p?.map((para) => (
              <p key={para} className="mt-3 leading-relaxed text-ink-2">{para}</p>
            ))}
            {s.items && (
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-2 marker:text-accent">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">{t.cookies.h}</h2>
          <div className="mt-4 overflow-x-auto rounded-3xl border border-line bg-paper">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="text-ink-3">
                <tr>
                  {t.cookies.cols.map((c) => (
                    <th key={c} className="px-5 py-3 font-semibold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.cookies.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-line align-top">
                    <td className="px-5 py-3 font-mono text-xs text-ink">{row[0]}</td>
                    <td className="px-5 py-3 text-ink-2">{row[1]}</td>
                    <td className="px-5 py-3 text-ink-2">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">{t.settings.h}</h2>
          <p className="mt-3 leading-relaxed text-ink-2">{t.settings.p}</p>
          <div className="mt-4">
            <CookieSettings t={t.settings} />
          </div>
        </section>

        <a href={LANG_PATH[lang]} className="mt-12 inline-block text-sm font-semibold text-accent hover:underline">
          ← {t.back}
        </a>
      </main>
    </div>
  );
}
