import type { Metadata, Viewport } from "next";
import { IMAGES, LEADER, SITE_URL } from "@/data/content";
import "./globals.css";

const SITE_TITLE = "Ретрит Аруначала 2–12 января 2027 | Свами Благомир";
const SITE_DESCRIPTION =
  "Духовный ретрит в Тируваннамалае: Аруначала, садхана, Шива-таттва, ашрам Раманы Махарши и гиривалам. 2–12 января 2027. От $1 800, проживание и завтраки включены. Продолжение в Варанаси (Каши) +$1 100.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Ретрит Аруначала 2027",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ретрит Аруначала",
    "Тируваннамалай ретрит 2027",
    "Свами Благомир",
    "Школа Дхарма108",
    "Шива Дева-Парампара",
    "паломничество в Индию 2027",
    "ашрам Раманы Махарши",
    "гиривалам",
    "ретрит в Варанаси",
    "Каши ретрит",
    "садхана",
    "атма-вичара",
  ],
  authors: [{ name: LEADER.name }],
  creator: "Школа Дхарма108",
  publisher: "Школа Дхарма108",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Школа Дхарма108 · Ретрит Аруначала",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: IMAGES.hero,
        width: 1920,
        height: 1280,
        alt: "Священная гора Аруначала на рассвете — ретрит 2–12 января 2027",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [IMAGES.hero],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#10272C",
};

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700&display=swap";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS_URL} />
        <link rel="stylesheet" href="/kashi-arunachala.css" />
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
