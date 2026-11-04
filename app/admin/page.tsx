import type { Metadata } from "next";
import Admin from "@/components/pages/Admin";

export const metadata: Metadata = {
  title: "Панель организатора",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminPage() {
  return <Admin />;
}
