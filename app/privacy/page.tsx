import type { Metadata } from "next";
import Privacy from "@/components/pages/Privacy";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description:
    "Политика обработки и защиты персональных данных посетителей сайта ретрита «Аруначала. Путь к Источнику» (Школа Дхарма108).",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <Privacy />;
}
