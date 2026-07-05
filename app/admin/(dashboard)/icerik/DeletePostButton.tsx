"use client";

import { useTransition } from "react";
import { deletePost } from "@/lib/post-actions";

export default function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="admin-login__submit"
      disabled={pending}
      style={{ padding: "0.3rem 0.7rem", fontSize: "0.8rem" }}
      onClick={() => {
        if (confirm(`"${title}" yazısını silmek istediğinize emin misiniz?`)) {
          startTransition(() => {
            deletePost(id);
          });
        }
      }}
    >
      {pending ? "Siliniyor…" : "Sil"}
    </button>
  );
}
