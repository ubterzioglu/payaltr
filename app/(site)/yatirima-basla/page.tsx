import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { createClient } from "@/lib/supabase/server";
import { availableShares, fundingPercent, type Property } from "@/lib/investments";
import InvestForm from "./InvestForm";

export const metadata: Metadata = {
  title: "Yatırıma Başla",
  description:
    "Üye olun, mülk seçin, pay alın, kazanın. PayAL ile gayrimenkul yatırımına başlamanın adım adım rehberi.",
  alternates: { canonical: "/yatirima-basla" },
};

const steps = [
  { n: "1", title: "Üye Olun", text: "Birkaç dakikada hesabınızı oluşturun ve kimliğinizi doğrulayın." },
  { n: "2", title: "Mülk Seçin", text: "Uzmanların seçtiği mülkler arasından bütçenize uygun payı belirleyin." },
  { n: "3", title: "Pay Alın", text: "150 USD'den başlayan tutarlarla mülkün bir parçasına sahip olun." },
  { n: "4", title: "Kazanın", text: "Hisseniz kadar kira geliri cüzdanınıza yatsın, değer artışından faydalanın." },
];

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .neq("status", "archived")
    .order("created_at", { ascending: true });

  const list = (properties ?? []) as Property[];

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
          {!user ? (
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/kayit-ol" className="btn btn--gold">
                Hemen Üye Ol
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <span className="eyebrow">Mülkler</span>
          <h2 className="section__title">Yatırım Yapabileceğiniz Mülkler</h2>

          <div className="grid grid--3" style={{ marginTop: "2rem" }}>
            {list.map((p) => {
              const remaining = availableShares(p);
              const percent = fundingPercent(p);
              return (
                <article key={p.id} className="property invest-property">
                  <Image
                    src={p.image_url}
                    alt={p.title}
                    width={400}
                    height={260}
                    className="property__img"
                  />
                  <div className="property__body">
                    <h3 className="property__title">{p.title}</h3>
                    <p className="card__text">{p.location}</p>
                    <div className="invest-property__meta">
                      <span>%{p.annual_yield_percent} yıllık getiri</span>
                      <span>{remaining} pay kaldı</span>
                    </div>
                    <div className="funding-bar">
                      <div className="funding-bar__fill" style={{ width: `${percent}%` }} />
                    </div>
                    {user ? (
                      <InvestForm
                        propertyId={p.id}
                        pricePerShare={Number(p.price_per_share)}
                        remaining={remaining}
                      />
                    ) : (
                      <Link href="/giris" className="btn btn--dark" style={{ marginTop: "1rem" }}>
                        Yatırım için giriş yapın
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
            {list.length === 0 ? (
              <p className="card__text">Şu anda yatırıma açık mülk bulunmuyor.</p>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
