"use client";

import { useActionState } from "react";
import { createPost, updatePost, type PostFormState } from "@/lib/post-actions";
import type { Post } from "@/lib/posts";

const initialState: PostFormState = { error: null };

export default function PostForm({ post }: { post?: Post }) {
  const action = post ? updatePost : createPost;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="contact__form">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      {state.error ? <p className="auth__error">{state.error}</p> : null}
      {state.success ? <p className="auth__success">Kaydedildi.</p> : null}
      <label>
        Başlık
        <input type="text" name="title" required defaultValue={post?.title} />
      </label>
      <label>
        Özet
        <textarea name="excerpt" rows={2} defaultValue={post?.excerpt} />
      </label>
      <label>
        İçerik (HTML)
        <textarea
          name="content_html"
          rows={10}
          required
          defaultValue={post?.content_html}
          style={{ fontFamily: "monospace", fontSize: "0.85rem" }}
        />
      </label>
      <label>
        Durum
        <select name="status" defaultValue={post?.status ?? "draft"} style={{ padding: "0.6rem" }}>
          <option value="draft">Taslak</option>
          <option value="published">Yayınla</option>
        </select>
      </label>
      <button type="submit" className="btn btn--gold" disabled={pending}>
        {pending ? "Kaydediliyor…" : post ? "Güncelle" : "Yazıyı Oluştur"}
      </button>
    </form>
  );
}
