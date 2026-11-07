import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "cyrillic"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin", "cyrillic"] });

const SITE_URL = "https://ildar.ai";
const TITLE = "Ildar Lomov — Bots, AI agents & automation for business";
const DESCRIPTION =
  "Messenger bots (WhatsApp, Telegram), AI agents, CRM setup (Bitrix24, amoCRM), mailings, Tilda websites and custom apps. Based in Lisbon, Portugal.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ildar Lomov",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Ildar Lomov" }],
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
      </body>
    </html>
  );
}
