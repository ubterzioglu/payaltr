import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/auth-actions";
import { STATUS_LABELS, type RevisionRequest, type RevisionComment } from "@/lib/revisions";
import type { Investment, Property } from "@/lib/investments";
import RevisionRequestForm from "./RevisionRequestForm";
import UserCommentForm from "./UserCommentForm";

export const metadata: Metadata = { title: "Hesabım" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let requests: RevisionRequest[] = [];
  let commentsByRequest: Record<string, RevisionComment[]> = {};

  if (user) {
    const { data: reqData } = await supabase
      .from("revision_requests")
      .select("*")
      .order("created_at", { ascending: false });
    requests = reqData ?? [];

    if (requests.length > 0) {
      const { data: commentData } = await supabase
        .from("revision_comments")
        .select("*")
        .in(
          "request_id",
          requests.map((r) => r.id),
        )
        .order("created_at", { ascending: true });
      commentsByRequest = (commentData ?? []).reduce<Record<string, RevisionComment[]>>(
        (acc, c) => {
          (acc[c.request_id] ??= []).push(c);
          return acc;
        },
        {},
      );
    }
  }

  const { data: wallet } = user
    ? await supabase.from("wallets").select("balance").eq("user_id", user.id).maybeSingle()
    : { data: null };

  const { data: investments } = user
    ? await supabase
        .from("investments")
        .select("*, properties(title, image_url)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
    : { data: [] as (Investment & { properties: Pick<Property, "title" | "image_url"> })[] };

  return (
    <>
      <PageHero title="Hesabım" subtitle={user?.email ?? ""} />
      <section className="section">
        <div className="container">
          <div className="card" style={{ maxWidth: 480 }}>
            <h3 className="card__title">
              {(user?.user_metadata?.full_name as string) ?? "Yatırımcı"}
            </h3>
            <p className="card__text">{user?.email}</p>
            <p className="card__text" style={{ marginTop: "1rem" }}>
              Cüzdan bakiyeniz:{" "}
              <strong>
                {(wallet?.balance ?? 0).toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "USD",
                })}
              </strong>
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <Link href="/hesabim/cuzdanim" className="btn btn--gold">
                Cüzdanım
              </Link>
              <Link href="/yatirima-basla" className="btn btn--dark">
                Yatırıma Başla
              </Link>
            </div>
            <form action={signOut} style={{ marginTop: "1.5rem" }}>
              <button type="submit" className="btn btn--dark">
                Çıkış Yap
              </button>
            </form>
          </div>

          {(investments ?? []).length > 0 ? (
            <div style={{ marginTop: "2.5rem" }}>
              <h3 className="card__title">Portföyüm</h3>
              <div className="grid grid--3" style={{ marginTop: "1rem" }}>
                {(investments ?? []).map((inv) => (
                  <article key={inv.id} className="card">
                    <h4 className="card__title" style={{ fontSize: "1rem" }}>
                      {inv.properties?.title ?? "Mülk"}
                    </h4>
                    <p className="card__text">{inv.shares} pay</p>
                    <p className="card__text">
                      {inv.amount.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <span className="eyebrow">Destek</span>
          <h2 className="section__title">Revizyon İsteği Gönder</h2>
          <p className="section__lead">
            Sitede görmek istediğiniz bir değişiklik mi var? Talebinizi
            gönderin, ekibimiz altına yanıt yazsın.
          </p>
          <RevisionRequestForm />

          {requests.length > 0 ? (
            <div style={{ marginTop: "2.5rem" }}>
              <h3 className="card__title">İsteklerim</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                {requests.map((r) => (
                  <article key={r.id} className="card revision-card">
                    <div className="revision-card__head">
                      <h4 className="card__title">{r.title}</h4>
                      <span className={`revision-status revision-status--${r.status}`}>
                        {STATUS_LABELS[r.status]}
                      </span>
                    </div>
                    <p className="card__text">{r.description}</p>

                    {(commentsByRequest[r.id] ?? []).length > 0 ? (
                      <div className="revision-thread">
                        {commentsByRequest[r.id].map((c) => (
                          <div
                            key={c.id}
                            className={`revision-comment ${c.is_admin ? "revision-comment--admin" : ""}`}
                          >
                            <strong>{c.is_admin ? "PayAL Yönetim" : "Siz"}</strong>
                            <p>{c.body}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <UserCommentForm requestId={r.id} />
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
