import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CookieConsent from "@/components/CookieConsent";
import { DESCRIPTION, LANG_PATH, SITE_NAME, SITE_URL, TITLE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "cyrillic"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: LANG_PATH.en, languages: { en: LANG_PATH.en, ru: LANG_PATH.ru, "x-default": LANG_PATH.en } },
  // Search Console (ildarlomov.public Google account) + Yandex Webmaster (ildar.lomov) ownership tags.
  verification: {
    google: "MZ0qcrwWwEeEKWd9gPHqo-Vm5XWM-yGtjEGylFPzPfI",
    yandex: "6aa8571de83ee5d9",
    // Bing Webmaster Tools (ildarlomov.public Google login). Keep: removing it unverifies the site.
    other: { "msvalidate.01": "2959FC41E36A888A8D0980D278ECACD2" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["ru_RU"],
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ildar Lomov — bots, AI agents and automation, Lisbon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf2e8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable} min-h-screen antialiased`}>
        {children}
        <Analytics />
        {/* Loads Yandex Metrika only after the visitor accepts cookies. */}
        <CookieConsent />
      </body>
    </html>
  );
}
