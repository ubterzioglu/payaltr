import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bize Ulaşın",
  description:
    "PayAL ekibiyle iletişime geçin. Sorularınız için telefon, e-posta veya hızlı iletişim formu üzerinden bize ulaşın.",
  alternates: { canonical: "/bize-ulasin" },
};

export default function Page() {
  return (
    <>
      <PageHero
        title="Bize Ulaşın"
        subtitle="Bizi hemen arayın, sizi arayalım. Size yardımcı olmak için buradayız."
      />
      <section className="section">
        <div className="container contact">
          <div className="contact__info">
            <h2 className="section__title" style={{ fontSize: "1.6rem" }}>
              Hızlı İletişim
            </h2>
            <ul className="contact__list">
              <li>
                <strong>Telefon:</strong>{" "}
                <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}>
                  {site.phone}
                </a>
              </li>
              <li>
                <strong>E-posta:</strong>{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <strong>X:</strong>{" "}
                <a
                  href="https://x.com/payaltr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @payaltr
                </a>
              </li>
            </ul>
          </div>

          <form className="contact__form">
            <label>
              Ad Soyad
              <input type="text" name="name" placeholder="Adınız Soyadınız" />
            </label>
            <label>
              E-posta
              <input type="email" name="email" placeholder="ornek@eposta.com" />
            </label>
            <label>
              Telefon
              <input type="tel" name="phone" placeholder="+90 5xx xxx xx xx" />
            </label>
            <label>
              Mesajınız
              <textarea name="message" rows={4} placeholder="Size nasıl yardımcı olabiliriz?" />
            </label>
            <button type="button" className="btn btn--gold">
              Sizi Arayalım
            </button>
            <p className="contact__note">
              Form gönderimi Faz 2&apos;de Supabase ile aktifleştirilecektir.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
