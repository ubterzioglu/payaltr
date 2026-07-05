import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Admin — Genel Bakış" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.listUsers();
  const userCount = error ? null : data.users.length;
  const postCount = getAllPosts().length;

  const stats = [
    { label: "Kayıtlı Kullanıcı", value: userCount ?? "—" },
    { label: "Blog Yazısı", value: postCount },
    { label: "Yayındaki Sayfa", value: 19 },
  ];

  return (
    <div>
      <h1 className="admin__title">Genel Bakış</h1>
      <div className="grid grid--3" style={{ marginTop: "1.5rem" }}>
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="admin__stat">{s.value}</div>
            <div className="card__text">{s.label}</div>
          </div>
        ))}
      </div>
      {error ? (
        <p className="auth__error" style={{ marginTop: "1.5rem" }}>
          Kullanıcı listesi alınamadı: {error.message}
        </p>
      ) : null}
    </div>
  );
}
