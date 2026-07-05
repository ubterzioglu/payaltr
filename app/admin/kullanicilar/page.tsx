import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Admin — Kullanıcılar" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.listUsers();

  return (
    <div>
      <h1 className="admin__title">Kullanıcılar</h1>
      {error ? (
        <p className="auth__error" style={{ marginTop: "1rem" }}>
          Kullanıcı listesi alınamadı: {error.message}
        </p>
      ) : (
        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>
                <th>E-posta</th>
                <th>Ad Soyad</th>
                <th>Kayıt Tarihi</th>
                <th>Son Giriş</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u) => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{(u.user_metadata?.full_name as string) ?? "—"}</td>
                  <td>{new Date(u.created_at).toLocaleDateString("tr-TR")}</td>
                  <td>
                    {u.last_sign_in_at
                      ? new Date(u.last_sign_in_at).toLocaleDateString("tr-TR")
                      : "—"}
                  </td>
                </tr>
              ))}
              {data.users.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "var(--muted)" }}>
                    Henüz kayıtlı kullanıcı yok.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
