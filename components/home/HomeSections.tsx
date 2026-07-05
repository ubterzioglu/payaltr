import Link from "next/link";
import Image from "next/image";
import {
  introBoxes,
  advantages,
  legalPoints,
  stats,
  properties,
  events,
  partners,
} from "@/lib/home";

export function IntroSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid--3">
          {introBoxes.map((b) => (
            <article key={b.title} className="card feature">
              <Image
                src={b.image}
                alt=""
                width={64}
                height={64}
                className="feature__icon"
              />
              <h3 className="card__title">{b.title}</h3>
              <p className="card__text">{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdvantagesSection() {
  return (
    <section className="section section--soft">
      <div className="container">
        <span className="eyebrow">Neden PayAL?</span>
        <h2 className="section__title">PayAL ile Yatırmanın Avantajları</h2>
        <div className="grid grid--3" style={{ marginTop: "2.5rem" }}>
          {advantages.map((a) => (
            <article key={a.title} className="card">
              <Image
                src={a.image}
                alt=""
                width={56}
                height={56}
                className="feature__icon"
              />
              <h3 className="card__title">{a.title}</h3>
              <p className="card__text">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LegalStatsSection() {
  return (
    <section className="section section--navy legal">
      <div className="container">
        <span className="eyebrow">Güvence</span>
        <h2 className="section__title">Yasal, Güvenli ve Belgeli Yatırım İmkanı</h2>
        <div className="grid grid--3" style={{ marginTop: "2.5rem" }}>
          {legalPoints.map((l) => (
            <article key={l.title} className="legal__card">
              <h3 className="card__title">{l.title}</h3>
              <p className="card__text">{l.text}</p>
            </article>
          ))}
        </div>

        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stats__item">
              <div className="stats__value">{s.value}</div>
              <div className="stats__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PropertiesSection() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Fırsatlar</span>
        <h2 className="section__title">Uzmanların Seçtiği Mülkler</h2>
        <div className="grid grid--4" style={{ marginTop: "2.5rem" }}>
          {properties.map((p) => (
            <article key={p.title} className="property">
              <Image
                src={p.image}
                alt={p.title}
                width={400}
                height={300}
                className="property__img"
              />
              <div className="property__body">
                <h3 className="property__title">{p.title}</h3>
                <span className="property__badge">150 USD&apos;den başlayan pay</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsSection() {
  return (
    <section className="section section--soft">
      <div className="container">
        <span className="eyebrow">Topluluk</span>
        <h2 className="section__title">Etkinlikler</h2>
        <div className="grid grid--3" style={{ marginTop: "2.5rem" }}>
          {events.map((e) => (
            <article key={e.title} className="card">
              <h3 className="card__title">{e.title}</h3>
              <p className="card__text">{e.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section className="section partners">
      <div className="container">
        <p className="partners__label">
          Uluslararası raporlar ve güvenilir kaynaklarla
        </p>
        <div className="partners__logos">
          {partners.map((p) => (
            <Image
              key={p.name}
              src={p.image}
              alt={p.name}
              width={120}
              height={40}
              className="partners__logo"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="section cta">
      <div className="container cta__inner">
        <h2 className="cta__title">Paran kadar yatırım yap, payın kadar kazan.</h2>
        <p className="cta__lead">
          150 USD&apos;den başlayan paylarla küresel gayrimenkul portföyünüzü bugün
          oluşturmaya başlayın.
        </p>
        <Link href="/yatirima-basla" className="btn btn--gold">
          Hemen Yatırıma Başla
        </Link>
      </div>
    </section>
  );
}
