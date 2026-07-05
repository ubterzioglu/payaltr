// Orijinal WordPress sitesindeki 52 sayfadan Next.js'e henüz taşınmayanlar.
// Kaynak: database.sql (wp_posts) üzerinden çıkarılan tam sayfa envanteri.

export type MissingPage = {
  originalSlug: string;
  title: string;
  reason: string;
};

export const missingPages: MissingPage[] = [
  { originalSlug: "danismanlar", title: "Danışmanlar", reason: "İçerik sayfası — henüz portlanmadı" },
  { originalSlug: "team", title: "Team", reason: "Ekip tanıtım sayfası — henüz portlanmadı" },
  { originalSlug: "partners", title: "Partners", reason: "İş ortakları sayfası — anasayfada özet var, ayrı sayfa yok" },
  { originalSlug: "stake-basarilari", title: "Stake Başarıları", reason: "İçerik sayfası — henüz portlanmadı" },
  { originalSlug: "yatirim-grafikleri", title: "Yatırım Grafikleri", reason: "İçerik sayfası — henüz portlanmadı" },
  { originalSlug: "adim-adim-rehber", title: "Adım Adım Rehber", reason: "Yatırıma Başla ile içerik olarak örtüşüyor, ayrı sayfa yapılmadı" },
  { originalSlug: "exit-stratejileri", title: "Exit Stratejileri", reason: "İçerik sayfası — henüz portlanmadı" },
  { originalSlug: "exit-secenekleri", title: "Exit Seçenekleri", reason: "İçerik sayfası — henüz portlanmadı" },
  { originalSlug: "roi-yatirim-getirisi", title: "ROI (Yatırım Getirisi)", reason: "İçerik sayfası — henüz portlanmadı" },
  { originalSlug: "cloud-computing", title: "Cloud Computing", reason: "Site konusuyla ilgisiz eski/test içeriği" },
  { originalSlug: "estate-planning", title: "Estate Planning", reason: "Site konusuyla ilgisiz eski/test içeriği" },
  { originalSlug: "stock-market-analysis", title: "Stock Market Analysis", reason: "Site konusuyla ilgisiz eski/test içeriği" },
  { originalSlug: "etkinlik-takvimi", title: "Etkinlik Takvimi", reason: "Etkinlik takvimi — henüz portlanmadı" },
  { originalSlug: "yonlendirme", title: "Yönlendirme", reason: "Amacı belirsiz yönlendirme sayfası" },
  { originalSlug: "onepage", title: "Onepage", reason: "Kullanılmayan alternatif tema şablonu" },
  {
    originalSlug: "shop / sepetim / checkout / cart-2 / shop-2",
    title: "E-ticaret (WooCommerce)",
    reason: "Tam mağaza/sepet/ödeme akışı Faz 3'e dahil değildi — henüz portlanmadı",
  },
  {
    originalSlug: "user / profil / user-3 / user-4 / user-5 / uyeler",
    title: "Kullanıcı profil sayfaları",
    reason: "WordPress üyelik eklentisi sayfaları — Supabase auth ile /hesabim yeterli görülüp bunlar portlanmadı",
  },
  { originalSlug: "sifre-sifirlama", title: "Şifre Sıfırlama", reason: "Supabase auth kendi şifre sıfırlama akışını sunar, özel sayfa yapılmadı" },
  { originalSlug: "cikis-yapmak / hesabim2", title: "Çıkış Yapmak / Hesabım2", reason: "Eski temanın tekrarlanan/yedek sayfaları" },
  { originalSlug: "dunya-capinda-seckin-gayrimenk...", title: "Dünya Çapında Seçkin Gayrimenkullere Kolayca Yatırım", reason: "Ana sayfa içeriğiyle örtüşen alt sayfa — ayrı portlanmadı" },
  { originalSlug: "gayrimenkulun-bir-parcasina-15...", title: "Gayrimenkulün Bir Parçasına 150 USD'den Sahip Olun", reason: "Ana sayfa içeriğiyle örtüşen alt sayfa — ayrı portlanmadı" },
  { originalSlug: "hicbir-caba-harcamadan-duzenli...", title: "Hiçbir Çaba Harcamadan Düzenli Pasif Gelir", reason: "Ana sayfa içeriğiyle örtüşen alt sayfa — ayrı portlanmadı" },
  { originalSlug: "sample-page", title: "Sample Page", reason: "WordPress varsayılan örnek sayfası" },
];
