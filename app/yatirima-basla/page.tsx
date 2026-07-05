import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Yatırıma Başla" };

const steps = [
  { n: "1", title: "Üye Olun", text: "Birkaç dakikada hesabınızı oluşturun ve kimliğinizi doğrulayın." },
  { n: "2", title: "Mülk Seçin", text: "Uzmanların seçtiği mülkler arasından bütçenize uygun payı belirleyin." },
  { n: "3", title: "Pay Alın", text: "150 USD'den başlayan tutarlarla mülkün bir parçasına sahip olun." },
  { n: "4", title: "Kazanın", text: "Hisseniz kadar kira geliri cüzdanınıza yatsın, değer artışından faydalanın." },
];

export default function Page() {
  return (
    <>
      <PageHero
        title="Yatırıma Başla"
        subtitle="Adım adım rehber: Paran kadar yatırım yap, payın kadar kazan."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid--4">
            {steps.map((s) => (
              <article key={s.n} className="card step">
                <div className="step__n">{s.n}</div>
                <h3 className="card__title">{s.title}</h3>
                <p className="card__text">{s.text}</p>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/kayit-ol" className="btn btn--gold">
              Hemen Üye Ol
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
