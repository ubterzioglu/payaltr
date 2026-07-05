"use client";

import { useActionState } from "react";
import { investInProperty, type WalletFormState } from "@/lib/wallet-actions";

const initialState: WalletFormState = { error: null };

export default function InvestForm({
  propertyId,
  pricePerShare,
  remaining,
}: {
  propertyId: string;
  pricePerShare: number;
  remaining: number;
}) {
  const [state, formAction, pending] = useActionState(investInProperty, initialState);

  if (remaining <= 0) {
    return <p className="card__text">Bu mülkteki tüm paylar satıldı.</p>;
  }

  return (
    <form action={formAction} className="invest-form">
      <input type="hidden" name="property_id" value={propertyId} />
      {state.error ? <p className="auth__error">{state.error}</p> : null}
      {state.success ? <p className="auth__success">Yatırımınız gerçekleşti!</p> : null}
      <label className="invest-form__row">
        Pay adedi
        <input
          type="number"
          name="shares"
          min={1}
          max={remaining}
          defaultValue={1}
          required
        />
      </label>
      <p className="invest-form__price">{pricePerShare.toLocaleString("tr-TR", { style: "currency", currency: "USD" })} / pay</p>
      <button type="submit" className="btn btn--gold" disabled={pending}>
        {pending ? "İşleniyor…" : "Yatırım Yap"}
      </button>
    </form>
  );
}
