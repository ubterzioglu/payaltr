"use client";

import { useActionState } from "react";
import { addUserComment, type RevisionFormState } from "@/lib/revision-actions";

const initialState: RevisionFormState = { error: null };

export default function UserCommentForm({ requestId }: { requestId: string }) {
  const [state, formAction, pending] = useActionState(addUserComment, initialState);

  return (
    <form action={formAction} className="comment-form">
      <input type="hidden" name="request_id" value={requestId} />
      {state.error ? <p className="auth__error">{state.error}</p> : null}
      <textarea name="body" rows={2} required placeholder="Yorum ekle…" />
      <button type="submit" className="btn btn--dark" disabled={pending}>
        {pending ? "Gönderiliyor…" : "Yorum Ekle"}
      </button>
    </form>
  );
}
