import type { Lang } from "@/lib/content";
import { buildJsonLd } from "@/lib/jsonLd";

// Server component: prints the page's schema.org graph (lib/jsonLd.ts) as a JSON-LD script tag.
export default function JsonLd({ lang, page }: { lang: Lang; page: "home" | "ai-agent" }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang, page)) }} />;
}
