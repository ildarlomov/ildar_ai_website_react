import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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

// Yandex Metrika counter (ildar.lomov account). Hardcoded: a public id, same in every environment.
const YM_ID = 114345040;
const YM_SNIPPET = `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}", "ym");
ym(${YM_ID}, "init", {ssr:true, webvisor:true, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable} min-h-screen antialiased`}>
        {children}
        <Analytics />
        <Script id="yandex-metrika" strategy="afterInteractive">
          {YM_SNIPPET}
        </Script>
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
