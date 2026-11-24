import type { Metadata } from "next";
import AiAgentPage from "@/components/AiAgentPage";
import { AI_AGENT } from "@/lib/aiAgent";
import { AI_AGENT_PATH } from "@/lib/site";

const t = AI_AGENT.ru;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: AI_AGENT_PATH.ru,
    languages: { en: AI_AGENT_PATH.en, ru: AI_AGENT_PATH.ru, "x-default": AI_AGENT_PATH.en },
  },
  openGraph: null,
};

export default function AiAgentRu() {
  return <AiAgentPage lang="ru" />;
}
