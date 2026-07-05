import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Giriş" };

export default function Page() {
  return (
    <>
      <PageHero title="Giriş" subtitle="Yatırımcı hesabınıza giriş yapın." />
      <section className="section">
        <div className="container auth">
          <form className="auth__form">
            <label>
              E-posta
              <input type="email" name="email" placeholder="ornek@eposta.com" />
            </label>
            <label>
              Şifre
              <input type="password" name="password" placeholder="••••••••" />
            </label>
            <button type="button" className="btn btn--gold">
              Giriş Yap
            </button>
            <p className="auth__alt">
              Hesabınız yok mu? <Link href="/kayit-ol">Üye olun</Link>
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
