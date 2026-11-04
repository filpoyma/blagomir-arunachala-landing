import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ретрит Аруначала 2–12 января 2027 | Свами Благомир",
  description:
    "Духовный ретрит в Тируваннамалае: Аруначала, садхана, Шива-таттва, ашрам Раманы. 2–12 января 2027. От $1 800, проживание и завтраки включены. Продолжение в Варанаси +$1 100.",
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
