"use client";

import { useActionState } from "react";
import { depositToWallet, type WalletFormState } from "@/lib/wallet-actions";

const initialState: WalletFormState = { error: null };

export default function DepositForm() {
  const [state, formAction, pending] = useActionState(depositToWallet, initialState);

  return (
    <form action={formAction} className="contact__form" style={{ maxWidth: 320 }}>
      {state.error ? <p className="auth__error">{state.error}</p> : null}
      {state.success ? <p className="auth__success">Bakiyeniz güncellendi.</p> : null}
      <label>
        Tutar (USD)
        <input type="number" name="amount" min="1" step="1" required placeholder="500" />
      </label>
      <button type="submit" className="btn btn--gold" disabled={pending}>
        {pending ? "Yükleniyor…" : "Bakiye Yükle (Demo)"}
      </button>
    </form>
  );
}
