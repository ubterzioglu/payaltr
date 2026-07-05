import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <span className="eyebrow hero__eyebrow">Pasif Gelirin En Kolay Yolu</span>
        <h1 className="hero__title">
          PayAL ile Yatırımlar Daha Anlaşılır, Daha Kazançlı
        </h1>
        <p className="hero__lead">
          Kira gelirinden satış kazancına kadar tüm sürecin nasıl işlediğini
          PayAL ve uzmanlar rehberliğiyle öğrenin, siz sadece getirinin keyfini
          çıkarın.
        </p>
        <p className="hero__slogan">
          Paran kadar yatırım yap, payın kadar kazan.
        </p>
        <div className="hero__actions">
          <Link href="/yatirima-basla" className="btn btn--gold">
            Yatırıma Başla
          </Link>
          <Link href="/hakkimizda" className="btn btn--ghost">
            Nasıl Çalışır?
          </Link>
        </div>
      </div>
    </section>
  );
}
