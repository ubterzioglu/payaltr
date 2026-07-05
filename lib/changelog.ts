export type ChangelogEntry = {
  date: string;
  items: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    date: "5 Temmuz 2026",
    items: [
      "payaltr.com WordPress yedeğinden gerçek içerik ve tasarım Next.js'e taşındı (ana sayfa, Hakkımızda, Fiyatlandırma, SSS, İletişim, Yatırıma Başla, KVKK, İade, 5 blog yazısı, 71 görsel).",
      "Kullanıcı girişi/kaydı Supabase ile eklendi, admin paneli tek-şifreli girişle korunuyor hale getirildi.",
      "Revizyon İstekleri özelliği eklendi: kullanıcılar istek+yorum gönderebiliyor, admin yanıtlayıp durum değiştirebiliyor.",
      "SEO ve GEO optimizasyonu tamamlandı: sitemap.xml, robots.txt, Organization/WebSite/Article/FAQPage JSON-LD, llms.txt.",
      "Admin panelinin genel site navigasyonundan (header/footer) tamamen izole edilmesi düzeltildi.",
      "Logo görünürlük sorunu düzeltildi (header koyu lacivert temaya çevrildi).",
      "Blog yazıları dosya tabanlı sistemden Supabase CMS'e taşındı; admin panelinden yazı ekleme/düzenleme/silme eklendi.",
      "Kullanıcı cüzdanı (bakiye, işlem geçmişi, demo bakiye yükleme) ve yatırım akışı (mülk seçimi, pay satın alma, portföy görüntüleme) eklendi.",
    ],
  },
];
