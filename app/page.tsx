import KashiArunachalaLanding from "@/components/KashiArunachalaLanding";
import { FAQ, HOTELS, IMAGES, KASHI, LEADER, MEANING_TEXT, SITE_URL, TG_LINK } from "@/data/content";
import type { IFaqItem } from "@/types/content";

const formatFaqAnswerText = (item: IFaqItem): string => {
  const parts: string[] = [];
  if (item.a) parts.push(item.a);
  if (item.paragraphs) parts.push(...item.paragraphs);
  if (item.bullets) {
    parts.push(
      item.bullets
        .map((b) => (typeof b === "string" ? b : `${b.prefix}${b.label}`))
        .join("; ")
    );
  }
  if (item.sections) {
    for (const s of item.sections) {
      parts.push(`${s.title}: ${s.bullets.join("; ")}`);
    }
  }
  if (item.afterBullets && item.link) {
    parts.push(`${item.afterBullets} ${item.link.href}`);
  }
  return parts.join(" ");
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Школа Дхарма108 · Шива Дева-Парампара",
      url: SITE_URL,
      sameAs: [TG_LINK],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#leader`,
      name: LEADER.name,
      jobTitle: LEADER.role,
      description: LEADER.bio,
      image: `${SITE_URL}${IMAGES.leader}`,
      worksFor: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "Event",
      "@id": `${SITE_URL}/#event-arunachala`,
      name: "Духовный ретрит «Аруначала. Путь к Источнику»",
      description: MEANING_TEXT,
      startDate: "2027-01-02T14:00:00+05:30",
      endDate: "2027-01-12T12:00:00+05:30",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      inLanguage: "ru",
      image: [
        `${SITE_URL}${IMAGES.hero}`,
        `${SITE_URL}${IMAGES.temple}`,
        `${SITE_URL}${IMAGES.ashram}`,
        `${SITE_URL}${IMAGES.girivalam}`,
      ],
      location: {
        "@type": "Place",
        name: `${HOTELS[0]?.name ?? "Sterling Arunai Anantha"} · Тируваннамалай`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tiruvannamalai",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
      organizer: {
        "@id": `${SITE_URL}/#organization`,
      },
      performer: {
        "@id": `${SITE_URL}/#leader`,
      },
      offers: [
        {
          "@type": "Offer",
          name: "Двухместное размещение (Twin)",
          price: "1800",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
          validFrom: "2026-11-01",
        },
        {
          "@type": "Offer",
          name: "Одноместное размещение (Single)",
          price: "2250",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
          validFrom: "2026-11-01",
        },
      ],
      subEvent: {
        "@type": "Event",
        name: "Модуль «Каши — Древний Варанаси: за пределами времени»",
        description: KASHI.intro,
        startDate: "2027-01-13T05:45:00+05:30",
        endDate: "2027-01-16T11:00:00+05:30",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Shree Ganesha Palace · Варанаси",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Varanasi",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
          },
        },
        offers: {
          "@type": "Offer",
          name: "Дополнительный модуль в Варанаси (Каши)",
          price: "1100",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#kashi`,
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq-schema`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: formatFaqAnswerText(item),
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <KashiArunachalaLanding />
    </>
  );
}
