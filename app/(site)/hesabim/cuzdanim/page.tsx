import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { createClient } from "@/lib/supabase/server";
import { TRANSACTION_LABELS, type WalletTransaction } from "@/lib/wallet";
import DepositForm from "./DepositForm";

export const metadata: Metadata = { title: "Cüzdanım" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: wallet } = user
    ? await supabase.from("wallets").select("*").eq("user_id", user.id).maybeSingle()
    : { data: null };

  const { data: transactions } = user
    ? await supabase
        .from("wallet_transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20)
    : { data: [] as WalletTransaction[] };

  const balance = wallet?.balance ?? 0;

  return (
    <>
      <PageHero title="Cüzdanım" subtitle="Bakiyenizi yönetin ve işlem geçmişinizi görün." />
      <section className="section">
        <div className="container" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr" }}>
          <div className="card" style={{ maxWidth: 420 }}>
            <span className="eyebrow">Mevcut Bakiye</span>
            <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--navy-800)" }}>
              {balance.toLocaleString("tr-TR", { style: "currency", currency: "USD" })}
            </div>
          </div>

          <div className="card" style={{ maxWidth: 420 }}>
            <h3 className="card__title">Bakiye Yükle</h3>
            <p className="card__text" style={{ marginBottom: "1rem" }}>
              Demo modu — gerçek ödeme sağlayıcısı entegrasyonu sonraki fazda eklenecektir.
            </p>
            <DepositForm />
          </div>

          <div>
            <h3 className="card__title">İşlem Geçmişi</h3>
            <div className="admin__table-wrap" style={{ marginTop: "1rem" }}>
              <table className="admin__table">
                <thead>
                  <tr>
                    <th>Tarih</th>
                    <th>Tür</th>
                    <th>Açıklama</th>
                    <th>Tutar</th>
                  </tr>
                </thead>
                <tbody>
                  {(transactions ?? []).map((t: WalletTransaction) => (
                    <tr key={t.id}>
                      <td>{new Date(t.created_at).toLocaleString("tr-TR")}</td>
                      <td>{TRANSACTION_LABELS[t.type]}</td>
                      <td>{t.description}</td>
                      <td style={{ color: t.amount < 0 ? "#b3261e" : "#1e6b3a", fontWeight: 700 }}>
                        {t.amount.toLocaleString("tr-TR", { style: "currency", currency: "USD" })}
                      </td>
                    </tr>
                  ))}
                  {(transactions ?? []).length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", color: "var(--muted)" }}>
                        Henüz işlem yok.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
