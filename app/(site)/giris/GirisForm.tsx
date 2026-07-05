"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, type AuthState } from "@/lib/auth-actions";

const initialState: AuthState = { error: null };

export default function GirisForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/hesabim";
  const registered = searchParams.get("registered") === "1";
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="auth__form">
      <input type="hidden" name="next" value={next} />
      {registered ? (
        <p className="auth__success">Kaydınız alındı! Şimdi giriş yapabilirsiniz.</p>
      ) : null}
      {state.error ? <p className="auth__error">{state.error}</p> : null}
      <label>
        E-posta
        <input type="email" name="email" required placeholder="ornek@eposta.com" />
      </label>
      <label>
        Şifre
        <input type="password" name="password" required placeholder="••••••••" />
      </label>
      <button type="submit" className="btn btn--gold" disabled={pending}>
        {pending ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
      <p className="auth__alt">
        Hesabınız yok mu? <Link href="/kayit-ol">Üye olun</Link>
      </p>
    </form>
  );
}
