import type { Metadata } from "next";
import Offer from "@/components/pages/Offer";

export const metadata: Metadata = {
  title: "Публичная оферта и условия участия",
  description:
    "Договор публичной оферты на организацию участия в духовном ретрите «Аруначала. Путь к Источнику» (2–12 января 2027) и программе «Каши» в Варанаси (13–16 января 2027).",
  alternates: {
    canonical: "/oferta",
  },
};

export default function OfferPage() {
  return <Offer />;
}
