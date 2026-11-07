"use client";

import { useState } from "react";
import { DICT, SERVICE_KEYS, type Lang } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

const fieldClass =
  "w-full rounded-2xl border border-line bg-cream/50 px-4 py-3 text-[0.95rem] outline-none transition placeholder:text-ink-3/70 focus:border-accent focus:bg-paper focus:ring-4 focus:ring-accent/15";

export default function LeadForm({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""), // honeypot, must stay empty
      lang,
    };

    if (!payload.name || !payload.contact) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("success");
    } catch (err) {
      console.error("[LeadForm] submit failed", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display mt-5 text-2xl font-bold">{f.success}</p>
        <p className="mt-2 text-ink-2">{f.successSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="lead-name" className="mb-2 block text-sm font-semibold">{f.name}</label>
        <input id="lead-name" name="name" type="text" autoComplete="name" maxLength={120} placeholder={f.namePh} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="lead-contact" className="mb-2 block text-sm font-semibold">{f.contact}</label>
        <input id="lead-contact" name="contact" type="text" maxLength={200} placeholder={f.contactPh} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="lead-service" className="mb-2 block text-sm font-semibold">{f.service}</label>
        <select id="lead-service" name="service" defaultValue="" className={fieldClass}>
          <option value="">{f.servicePh}</option>
          {SERVICE_KEYS.map((key) => (
            <option key={key} value={key}>
              {t.services.items[key].title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lead-message" className="mb-2 block text-sm font-semibold">{f.message}</label>
        <textarea id="lead-message" name="message" rows={4} maxLength={3000} placeholder={f.messagePh} className={`${fieldClass} resize-y`} />
      </div>

      {/* Honeypot: hidden from people, bots tend to fill it in. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-ink px-6 py-4 text-sm font-semibold text-cream shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? f.sending : f.submit}
      </button>

      {(status === "error" || status === "invalid") && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {status === "invalid" ? f.invalid : f.error}
        </p>
      )}
    </form>
  );
}
