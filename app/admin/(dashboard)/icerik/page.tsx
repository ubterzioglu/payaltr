import type { Metadata } from "next";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Post } from "@/lib/posts";
import PostForm from "./PostForm";
import DeletePostButton from "./DeletePostButton";

export const metadata: Metadata = { title: "Admin — İçerik" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const admin = createAdminClient();
  const { data: posts, error } = await admin
    .from("posts")
    .select("id, slug, title, excerpt, content_html, status, created_at")
    .order("created_at", { ascending: false });

  const list = (posts ?? []) as Post[];

  return (
    <div>
      <h1 className="admin__title">İçerik — Blog Yazıları</h1>
      <p className="card__text" style={{ margin: "0.5rem 0 1.5rem" }}>
        Yazılar Supabase &quot;posts&quot; tablosunda tutulur. Yayınla
        durumundaki yazılar /blog altında görünür.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div className="card" style={{ maxWidth: 640 }}>
          <h3 className="card__title">Yeni Yazı</h3>
          <PostForm />
        </div>

        {error ? (
          <p className="auth__error">Yazılar alınamadı: {error.message}</p>
        ) : (
          <div className="admin__table-wrap">
            <table className="admin__table">
              <thead>
                <tr>
                  <th>Başlık</th>
                  <th>Slug</th>
                  <th>Durum</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.slug}</td>
                    <td>
                      <span
                        className={`revision-status revision-status--${p.status === "published" ? "done" : "open"}`}
                      >
                        {p.status === "published" ? "Yayında" : "Taslak"}
                      </span>
                    </td>
                    <td style={{ display: "flex", gap: "0.6rem" }}>
                      <Link href={`/admin/icerik/${p.id}`}>Düzenle</Link>
                      <DeletePostButton id={p.id} title={p.title} />
                    </td>
                  </tr>
                ))}
                {list.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", color: "var(--muted)" }}>
                      Henüz yazı yok.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
