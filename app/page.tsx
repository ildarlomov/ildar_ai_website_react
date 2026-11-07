import Landing from "@/components/Landing";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ildar Lomov",
  url: "https://ildar.ai",
  image: "https://ildar.ai/hero.jpg",
  telephone: "+351912094137",
  email: "ildarlomov.f@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Martins Barata 3",
    postalCode: "1400-247",
    addressLocality: "Lisbon",
    addressCountry: "PT",
  },
  sameAs: ["https://www.linkedin.com/in/ildarlomov/", "https://memcircle.com", "https://walkietalkie.pro"],
  knowsAbout: ["Chatbots", "AI agents", "CRM integration", "Bitrix24", "amoCRM", "Tilda", "WhatsApp automation", "Telegram bots"],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Landing />
    </>
  );
}
