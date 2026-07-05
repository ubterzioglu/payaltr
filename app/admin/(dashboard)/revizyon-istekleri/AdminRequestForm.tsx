"use client";

import { useActionState } from "react";
import {
  createAdminRevisionRequest,
  type RevisionFormState,
} from "@/lib/revision-actions";

const initialState: RevisionFormState = { error: null };

export default function AdminRequestForm() {
  const [state, formAction, pending] = useActionState(
    createAdminRevisionRequest,
    initialState,
  );

  return (
    <form action={formAction} className="contact__form" style={{ maxWidth: 480 }}>
      {state.error ? <p className="auth__error">{state.error}</p> : null}
      {state.success ? <p className="auth__success">İstek oluşturuldu.</p> : null}
      <label>
        Başlık
        <input type="text" name="title" required placeholder="İsteğin kısa başlığı" />
      </label>
      <label>
        Açıklama
        <textarea name="description" rows={3} required placeholder="Detaylandırın…" />
      </label>
      <button type="submit" className="btn btn--gold" disabled={pending}>
        {pending ? "Oluşturuluyor…" : "Yeni İstek Ekle"}
      </button>
    </form>
  );
}
