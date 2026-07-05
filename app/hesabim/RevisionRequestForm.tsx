"use client";

import { useActionState } from "react";
import {
  createRevisionRequest,
  type RevisionFormState,
} from "@/lib/revision-actions";

const initialState: RevisionFormState = { error: null };

export default function RevisionRequestForm() {
  const [state, formAction, pending] = useActionState(
    createRevisionRequest,
    initialState,
  );

  return (
    <form action={formAction} className="contact__form" style={{ marginTop: "1rem" }}>
      {state.error ? <p className="auth__error">{state.error}</p> : null}
      {state.success ? (
        <p className="auth__success">İsteğiniz gönderildi, teşekkürler!</p>
      ) : null}
      <label>
        Başlık
        <input type="text" name="title" required placeholder="Talebinizin kısa başlığı" />
      </label>
      <label>
        Açıklama
        <textarea
          name="description"
          rows={4}
          required
          placeholder="Talebinizi detaylandırın…"
        />
      </label>
      <button type="submit" className="btn btn--dark" disabled={pending}>
        {pending ? "Gönderiliyor…" : "İstek Gönder"}
      </button>
    </form>
  );
}
