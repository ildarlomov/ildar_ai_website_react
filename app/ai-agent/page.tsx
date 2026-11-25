import type { Metadata } from "next";
import AiAgentPage from "@/components/AiAgentPage";
import JsonLd from "@/components/JsonLd";
import { AI_AGENT } from "@/lib/aiAgent";
import { AI_AGENT_PATH } from "@/lib/site";

const t = AI_AGENT.en;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: AI_AGENT_PATH.en,
    languages: { en: AI_AGENT_PATH.en, ru: AI_AGENT_PATH.ru, "x-default": AI_AGENT_PATH.en },
  },
  openGraph: null,
};

export default function AiAgentEn() {
  return (
    <>
      <JsonLd lang="en" page="ai-agent" />
      <AiAgentPage lang="en" />
    </>
  );
}
