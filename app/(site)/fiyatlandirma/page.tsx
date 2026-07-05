import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Fiyatlandırma",
  description:
    "150 USD'den başlayan Basic, Standard ve Premium yatırım seviyeleriyle bütçenize uygun payla PayAL'de gayrimenkul yatırımına başlayın.",
  alternates: { canonical: "/fiyatlandirma" },
};

const plans = [
  {
    name: "Basic",
    price: "150 USD",
    period: "başlangıç payı",
    features: [
      "Tek mülke paylaşımlı giriş",
      "Aylık kira geliri",
      "Temel yatırımcı paneli",
      "Standart destek",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "1.000 USD",
    period: "önerilen",
    features: [
      "Çoklu mülk portföyü",
      "Aylık kira + değer artışı",
      "Detaylı performans raporları",
      "Öncelikli destek",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "10.000 USD",
    period: "kurumsal",
    features: [
      "Seçkin mülklere öncelikli erişim",
      "Esnek çıkış stratejileri",
      "Özel yatırım danışmanı",
      "7/24 ayrıcalıklı destek",
    ],
    popular: false,
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="Fiyatlandırma"
        subtitle="Bütçenize uygun payla başlayın, payınız kadar kazanın."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {plans.map((p) => (
              <article
                key={p.name}
                className={`card plan ${p.popular ? "plan--popular" : ""}`}
              >
                {p.popular ? <span className="plan__tag">Popüler</span> : null}
                <h3 className="plan__name">{p.name}</h3>
                <div className="plan__price">{p.price}</div>
                <div className="plan__period">{p.period}</div>
                <ul className="plan__features">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link href="/yatirima-basla" className="btn btn--dark">
                  Yatırıma Başla
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
