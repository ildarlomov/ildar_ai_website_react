import type { Metadata } from "next";
import AiAgentPage from "@/components/AiAgentPage";
import { AI_AGENT_PAGE } from "@/lib/integrations";
import { AI_AGENT_PATH } from "@/lib/site";

const t = AI_AGENT_PAGE.ru;

export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  alternates: {
    canonical: AI_AGENT_PATH.ru,
    languages: { en: AI_AGENT_PATH.en, ru: AI_AGENT_PATH.ru, "x-default": AI_AGENT_PATH.en },
  },
  // Stub page until the full write-up lands: keep it out of search results (and out of sitemap.ts).
  robots: { index: false, follow: true },
  openGraph: null,
};

export default function AiAgentRu() {
  return <AiAgentPage lang="ru" />;
}
