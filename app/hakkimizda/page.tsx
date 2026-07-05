import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Hakkımızda" };

const trust = [
  { value: "10+", label: "Yıllık Deneyim" },
  { value: "Şeffaf", label: "Yatırımcı Yönlendirmesi" },
  { value: "Kapsamlı", label: "Eğitim İçeriği" },
  { value: "7/24", label: "Aktif Destek Kanalı" },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="Hakkımızda"
        subtitle="PayAL ile Yatırımlar Daha Anlaşılır, Daha Kazançlı"
      />
      <section className="section">
        <div className="container prose">
          <p>
            PayAL, Dubai ve Körfez ülkelerindeki birinci sınıf gayrimenkullere
            paylaşımlı (fractional) yatırım yapmanızı sağlayan bir yatırım
            köprüsüdür. Amacımız, yüksek getirili gayrimenkul yatırımlarını
            150 USD&apos;den başlayan paylarla herkes için erişilebilir kılmaktır.
          </p>
          <p>
            Kira gelirinden satış kazancına kadar tüm süreç uzmanlar ve
            profesyonel platformlar tarafından yönetilir; siz sadece payınız
            kadar kazancın keyfini çıkarırsınız. Güveninizi şeffaf bilgi akışı,
            resmi kayıt ve yasal mülkiyet belgeleriyle sayılarla kanıtlıyoruz.
          </p>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <span className="eyebrow">Güveninizi Sayılarla Kanıtlıyoruz</span>
          <div className="grid grid--4" style={{ marginTop: "2rem" }}>
            {trust.map((t) => (
              <div key={t.label} className="card" style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "var(--accent)",
                  }}
                >
                  {t.value}
                </div>
                <div className="card__text">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
