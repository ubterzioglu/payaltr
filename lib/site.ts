// PayAL site geneli sabitler ve navigasyon.
// Kaynak: payaltr.com WordPress yedeğinden (database.sql) birebir çıkarıldı.

export const site = {
  name: "PayAL",
  tagline: "Payın Kadar Kazan",
  description:
    "PayAL ile Dubai ve Körfez'deki birinci sınıf gayrimenkullere 150 USD'den başlayan paylarla yatırım yapın. Paran kadar yatırım yap, payın kadar kazan.",
  url: "https://payaltr.com",
  email: "info@payaltr.com",
  phone: "(123) 222-8888",
  address: "Yapı Kredi Plaza C Blok K:8 No:23, 4. Levent, İstanbul, Türkiye",
  logo: "/images/PayAl-Logo.png",
} as const;

export const nav: { label: string; href: string }[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Fiyatlandırma", href: "/fiyatlandirma" },
  { label: "SSS & Destek", href: "/sss-destek" },
  { label: "Blog", href: "/blog" },
  { label: "Bize Ulaşın", href: "/bize-ulasin" },
];
