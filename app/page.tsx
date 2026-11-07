import Landing from "@/components/Landing";
import { DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["en", "ru"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DESCRIPTION,
      image: `${SITE_URL}/hero.jpg`,
      telephone: "+351912094137",
      email: "ildarlomov.f@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Martins Barata 3",
        postalCode: "1400-247",
        addressLocality: "Lisbon",
        addressCountry: "PT",
      },
      areaServed: "Worldwide",
      availableLanguage: ["English", "Russian"],
      founder: { "@type": "Person", name: SITE_NAME, jobTitle: "Founder & CTO" },
      sameAs: ["https://www.linkedin.com/in/ildarlomov/", "https://memcircle.com", "https://walkietalkie.pro"],
      knowsAbout: [
        "Chatbots",
        "AI agents",
        "CRM integration",
        "Bitrix24",
        "amoCRM",
        "Tilda",
        "WhatsApp automation",
        "Telegram bots",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Landing />
    </>
  );
}
