import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Kayıt Ol" };

export default function Page() {
  return (
    <>
      <PageHero
        title="Kayıt Ol"
        subtitle="Birkaç dakikada hesabınızı oluşturun, yatırıma başlayın."
      />
      <section className="section">
        <div className="container auth">
          <form className="auth__form">
            <label>
              Ad Soyad
              <input type="text" name="name" placeholder="Adınız Soyadınız" />
            </label>
            <label>
              E-posta
              <input type="email" name="email" placeholder="ornek@eposta.com" />
            </label>
            <label>
              Şifre
              <input type="password" name="password" placeholder="••••••••" />
            </label>
            <button type="button" className="btn btn--gold">
              Üye Ol
            </button>
            <p className="auth__alt">
              Zaten hesabınız var mı? <Link href="/giris">Giriş yapın</Link>
            </p>
            <p className="contact__note">
              Kimlik doğrulama Faz 2&apos;de Supabase ile aktifleştirilecektir.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
