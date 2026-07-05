"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { adminSignIn, type AuthState } from "@/lib/auth-actions";

const initialState: AuthState = { error: null };

export default function AdminGirisForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const [state, formAction, pending] = useActionState(adminSignIn, initialState);

  return (
    <form action={formAction} className="admin-login__form">
      <input type="hidden" name="next" value={next} />
      {state.error ? <p className="auth__error">{state.error}</p> : null}
      <label className="admin-login__label">
        Şifre
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="••••••••••"
        />
      </label>
      <button type="submit" className="admin-login__submit" disabled={pending}>
        {pending ? "Giriş yapılıyor…" : "Giriş Yap →"}
      </button>
    </form>
  );
}
