"use client";

import { useActionState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { signUp, type AuthState } from "@/lib/auth-actions";

const initialState: AuthState = { error: null };

export default function Page() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <>
      <PageHero
        title="Kayıt Ol"
        subtitle="Birkaç dakikada hesabınızı oluşturun, yatırıma başlayın."
      />
      <section className="section">
        <div className="container auth">
          <form action={formAction} className="auth__form">
            {state.error ? <p className="auth__error">{state.error}</p> : null}
            <label>
              Ad Soyad
              <input type="text" name="name" required placeholder="Adınız Soyadınız" />
            </label>
            <label>
              E-posta
              <input type="email" name="email" required placeholder="ornek@eposta.com" />
            </label>
            <label>
              Şifre
              <input
                type="password"
                name="password"
                required
                minLength={8}
                placeholder="En az 8 karakter"
              />
            </label>
            <button type="submit" className="btn btn--gold" disabled={pending}>
              {pending ? "Kayıt oluşturuluyor…" : "Üye Ol"}
            </button>
            <p className="auth__alt">
              Zaten hesabınız var mı? <Link href="/giris">Giriş yapın</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
