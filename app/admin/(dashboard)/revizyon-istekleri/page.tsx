import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { STATUS_LABELS, type RevisionRequest, type RevisionComment } from "@/lib/revisions";
import AdminCommentForm from "./AdminCommentForm";
import StatusSelect from "./StatusSelect";

export const metadata: Metadata = { title: "Admin — Revizyon İstekleri" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const admin = createAdminClient();

  const { data: requests, error: reqError } = await admin
    .from("revision_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: users } = await admin.auth.admin.listUsers();
  const emailByUserId = new Map((users?.users ?? []).map((u) => [u.id, u.email]));

  const ids = (requests ?? []).map((r: RevisionRequest) => r.id);
  const { data: comments } = ids.length
    ? await admin
        .from("revision_comments")
        .select("*")
        .in("request_id", ids)
        .order("created_at", { ascending: true })
    : { data: [] as RevisionComment[] };

  const commentsByRequest = (comments ?? []).reduce<Record<string, RevisionComment[]>>(
    (acc, c) => {
      (acc[c.request_id] ??= []).push(c);
      return acc;
    },
    {},
  );

  return (
    <div>
      <h1 className="admin__title">Revizyon İstekleri</h1>
      {reqError ? (
        <p className="auth__error" style={{ marginTop: "1rem" }}>
          İstekler alınamadı: {reqError.message}
        </p>
      ) : null}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.5rem" }}>
        {(requests ?? []).map((r: RevisionRequest) => (
          <article key={r.id} className="card revision-card">
            <div className="revision-card__head">
              <div>
                <h3 className="card__title">{r.title}</h3>
                <p className="revision-card__meta">
                  {emailByUserId.get(r.user_id) ?? "Bilinmeyen kullanıcı"} ·{" "}
                  {new Date(r.created_at).toLocaleString("tr-TR")}
                </p>
              </div>
              <StatusSelect requestId={r.id} status={r.status} />
            </div>
            <p className="card__text">{r.description}</p>

            {(commentsByRequest[r.id] ?? []).length > 0 ? (
              <div className="revision-thread">
                {commentsByRequest[r.id].map((c) => (
                  <div
                    key={c.id}
                    className={`revision-comment ${c.is_admin ? "revision-comment--admin" : ""}`}
                  >
                    <strong>{c.is_admin ? "PayAL Yönetim" : c.author_email}</strong>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            ) : null}

            <AdminCommentForm requestId={r.id} />
          </article>
        ))}

        {(requests ?? []).length === 0 && !reqError ? (
          <p className="card__text">Henüz revizyon isteği yok.</p>
        ) : null}
      </div>
    </div>
  );
}
