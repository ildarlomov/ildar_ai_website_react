import type { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { PRIVACY } from "@/lib/privacy";
import { PRIVACY_PATH } from "@/lib/site";

const t = PRIVACY.ru;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: PRIVACY_PATH.ru,
    languages: { en: PRIVACY_PATH.en, ru: PRIVACY_PATH.ru, "x-default": PRIVACY_PATH.en },
  },
  openGraph: null,
};

export default function PrivacyRu() {
  return <PrivacyPolicy lang="ru" />;
}
