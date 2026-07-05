import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://payaltr.com"),
  title: "payaltr — Yenileniyoruz",
  description:
    "Sizin için daha iyi bir deneyim üzerinde çalışıyoruz. Çok yakında buradayız.",
  keywords: ["payaltr", "yenileniyoruz", "çok yakında", "coming soon"],
  openGraph: {
    title: "payaltr — Yenileniyoruz",
    description:
      "Sizin için daha iyi bir deneyim üzerinde çalışıyoruz. Çok yakında buradayız.",
    url: "https://payaltr.com",
    siteName: "payaltr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "payaltr — Yenileniyoruz",
    description: "Çok yakında buradayız.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
