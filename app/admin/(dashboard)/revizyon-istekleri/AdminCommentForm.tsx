"use client";

import { useActionState } from "react";
import { addAdminComment, type RevisionFormState } from "@/lib/revision-actions";

const initialState: RevisionFormState = { error: null };

export default function AdminCommentForm({ requestId }: { requestId: string }) {
  const [state, formAction, pending] = useActionState(addAdminComment, initialState);

  return (
    <form action={formAction} className="comment-form">
      <input type="hidden" name="request_id" value={requestId} />
      {state.error ? <p className="auth__error">{state.error}</p> : null}
      <textarea name="body" rows={2} required placeholder="Yanıt yaz…" />
      <button type="submit" className="btn btn--gold" disabled={pending}>
        {pending ? "Gönderiliyor…" : "Yanıtla"}
      </button>
    </form>
  );
}
