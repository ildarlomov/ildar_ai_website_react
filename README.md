# ildar_ai_landing

Personal landing for **ildar.ai** — Next.js 15 (App Router) + Tailwind v4, no database, no auth.
English by default, Russian via the EN/RU switch (choice is remembered in `localStorage`).

## Where things are

- `lib/content.ts` — **all copy in both languages**, plus contact/legal facts (phone, NIF, address, project links)
- `components/Landing.tsx` — the page (header, hero, services, projects, about, contact, footer)
- `components/LeadForm.tsx` — the request form
- `app/api/lead/route.ts` — receives the form and sends it to Ildar's Telegram chat
- `public/ildar.jpg` (hero portrait crop), `public/og.jpg` (social preview)

## Request form → Telegram

The form posts to `/api/lead`, which calls the Telegram Bot API server-side.

- Env var (the only one): `LEADS_TLG_BOT_TOKEN` — any bot token. The owner chat must have pressed **Start** on that bot once, otherwise Telegram refuses to deliver.
- The destination chat id is hardcoded in the route (a fixed fact, not a secret).
- Spam protection: hidden honeypot field + 5 requests / 10 min per IP (in-memory, per server instance).

## Run

```bash
npm install
LEADS_TLG_BOT_TOKEN=123:abc npm run dev   # or put it in .env.local
npm run lint    # tsc --noEmit
npm run build
```

Deploy: Vercel, set `LEADS_TLG_BOT_TOKEN` in the project env, attach the `ildar.ai` domain.
