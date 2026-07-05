import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "SSS & Destek" };

const faqs = [
  {
    q: "PayAL nedir?",
    a: "PayAL, Dubai ve Körfez ülkelerindeki birinci sınıf gayrimenkullere paylaşımlı (fractional) yatırım yapmanızı sağlayan bir yatırım köprüsüdür. 150 USD'den başlayan paylarla gayrimenkulün bir parçasına sahip olabilirsiniz.",
  },
  {
    q: "En az ne kadar yatırım yapabilirim?",
    a: "Yatırımınıza sadece 150 USD'den başlayan tutarlarla başlayabilir, portföyünüzü dilediğiniz gibi çeşitlendirebilirsiniz.",
  },
  {
    q: "Kira gelirimi nasıl alırım?",
    a: "Hisseniz kadar kira geliriniz düzenli olarak cüzdanınıza yatar. Mülkleri Stake yönetir; siz sadece pasif gelirinizin keyfini çıkarırsınız.",
  },
  {
    q: "Yatırımım yasal olarak güvende mi?",
    a: "Tüm mülk yatırımları ilgili yasal merciler nezdinde kaydedilir. Yatırımcılar, resmi kurumlar tarafından düzenlenen Tapu ve Pay Senedi belgeleriyle hak sahibi olur.",
  },
  {
    q: "Yatırımdan nasıl çıkarım?",
    a: "Belirli dönemlerde ellerinizdeki payları satabilir veya mülkün tamamı satıldığında çıkış yapabilirsiniz. Esnek çıkış seçenekleri sunulur.",
  },
  {
    q: "Vergi ödeyecek miyim?",
    a: "BAE ve Körfez ülkelerindeki yatırımlarınız için Gelir Vergisi alınmaz. Kendi ülkenizdeki yükümlülükleriniz için mali müşavirinize danışmanızı öneririz.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="SSS & Destek"
        subtitle="Herhangi bir sorunuz var mı? Size yardımcı olmak için buradayız."
      />
      <section className="section">
        <div className="container faq">
          {faqs.map((f) => (
            <details key={f.q} className="faq__item">
              <summary className="faq__q">{f.q}</summary>
              <p className="faq__a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
