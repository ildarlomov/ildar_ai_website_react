import type { Lang } from "@/lib/content";
import { INTEGRATIONS, MARKS } from "@/lib/integrations";
import { BRAND_ICONS } from "@/lib/brandIcons";
import { AI_AGENT_PATH } from "@/lib/site";

// The four-colour Google "G" (simple-icons only has a one-colour version).
function GoogleG() {
  return (
    <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

// ЮKassa mark (slanted bar + ring), redrawn from the yookassa.ru favicon.
function YooKassaMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#0B6CFF" d="M0.4 5.6H7.1V18.4H3.1Z" />
      <path fill="#0B6CFF" fillRule="evenodd" d="M15.9 4.8a7.2 7.2 0 1 1 0 14.4 7.2 7.2 0 0 1 0-14.4Zm0 3.9a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Z" />
    </svg>
  );
}

// MAX messenger mark: the speech-bubble outline from max.ru/favicon.svg with its cyan→violet gradient.
function MaxMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="max-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00EAFF" />
          <stop offset="0.4" stopColor="#1591FF" />
          <stop offset="0.7" stopColor="#3C22FE" />
          <stop offset="1" stopColor="#8419FF" />
        </linearGradient>
      </defs>
      <path fill="url(#max-grad)" fillRule="evenodd" d="M50.7571 0.261719C78.2929 0.261719 99.8857 22.5974 99.8857 50.1474C99.8857 77.6974 77.6071 99.4903 51.0214 99.4903C41.5857 99.4903 37.0143 98.1617 29.65 92.9474C29.1429 92.5903 28.45 92.6831 28.0214 93.1403C22.3571 99.1831 7.85 103.426 7.18571 95.176C7.18571 80.7903 0 71.4474 0 49.876C0 21.5546 23.2214 0.261719 50.7571 0.261719ZM51.5286 24.8117C38.4643 24.126 28.2643 33.1974 26.0143 47.3831C24.15 59.1332 27.45 73.4546 30.2786 74.176C31.4786 74.4832 34.3571 72.276 36.4571 70.2974C36.85 69.926 37.45 69.8617 37.9071 70.1474C41.1786 72.1474 44.8786 73.6474 48.9571 73.8617C62.3714 74.5617 74.2571 64.0617 74.9643 50.6474C75.6643 37.2331 64.9429 25.5046 51.5286 24.8046V24.8117Z" />
    </svg>
  );
}

// One service mark: the brand glyph on a light tint of its colour, or a monogram on the brand colour.
function Mark({ name }: { name: string }) {
  const m = MARKS[name] ?? { mono: [name.slice(0, 1), "#8a8178"] as [string, string] };
  if (m.icon === "yookassa" || m.icon === "max") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: m.icon === "max" ? "#6D4AFF14" : "#0B6CFF14" }}>
        {m.icon === "max" ? <MaxMark /> : <YooKassaMark />}
      </span>
    );
  }
  if (m.icon === "google-g") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#4285F4]/[0.08]">
        <GoogleG />
      </span>
    );
  }
  const icon = m.icon ? BRAND_ICONS[m.icon] : undefined;
  if (icon) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${icon.hex}14` }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill={icon.hex} aria-hidden="true">
          <path d={icon.path} />
        </svg>
      </span>
    );
  }
  const [text, color] = m.mono ?? ["•", "#8a8178"];
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display font-bold text-white"
      style={{ background: color, fontSize: text.length > 2 ? 10 : text.length > 1 ? 12 : 14 }}
    >
      {text}
    </span>
  );
}

// "Integrations" section: groups of services as cards with logo lists, plus a link card to the AI-agent page.
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
            <ul className={`mt-5 grid gap-x-4 gap-y-3 ${g.items.length > 6 ? "grid-cols-2" : "grid-cols-1"}`}>
              {g.items.map((item) => (
                <li key={item} className="flex min-w-0 items-center gap-3 text-[0.95rem] font-medium leading-tight text-ink">
                  <Mark name={item} />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
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
