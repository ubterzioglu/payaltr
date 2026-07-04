import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://payaltr.com"),
  title: "payaltr — Payments, reinvented.",
  description:
    "payaltr is building a faster, safer way to move money. Secure by design, effortless by default. Launching soon.",
  keywords: ["payaltr", "payments", "fintech", "money transfer", "coming soon"],
  openGraph: {
    title: "payaltr — Payments, reinvented.",
    description:
      "A faster, safer way to move money. Secure by design, effortless by default. Launching soon.",
    url: "https://payaltr.com",
    siteName: "payaltr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "payaltr — Payments, reinvented.",
    description: "A faster, safer way to move money. Launching soon.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
