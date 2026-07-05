"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type WalletFormState = { error: string | null; success?: boolean };

/**
 * Demo bakiye yükleme — gerçek ödeme sağlayıcısı entegre değil.
 * Kullanıcı kendi cüzdanına belirttiği tutarı ekler (RLS: sadece kendi
 * user_id'siyle insert/update yapabilir, admin client kullanmaz).
 */
export async function depositToWallet(
  _prev: WalletFormState,
  formData: FormData,
): Promise<WalletFormState> {
  const amount = Number(formData.get("amount"));

  if (!amount || amount <= 0) {
    return { error: "Geçerli bir tutar girin." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Bu işlem için giriş yapmalısınız." };

  const admin = createAdminClient();

  const { data: wallet } = await admin
    .from("wallets")
    .select("balance")
    .eq("user_id", user.id)
    .maybeSingle();

  const currentBalance = wallet?.balance ?? 0;
  const newBalance = currentBalance + amount;

  const { error: upsertError } = await admin
    .from("wallets")
    .upsert({ user_id: user.id, balance: newBalance, updated_at: new Date().toISOString() });

  if (upsertError) return { error: "Bakiye güncellenemedi: " + upsertError.message };

  await admin.from("wallet_transactions").insert({
    user_id: user.id,
    type: "deposit",
    amount,
    description: "Bakiye yükleme (demo)",
  });

  revalidatePath("/hesabim/cuzdanim");
  return { error: null, success: true };
}

/**
 * Bir mülkten pay satın alır: cüzdan bakiyesini düşer, investments kaydı
 * oluşturur, properties.sold_shares'i artırır. Yetersiz bakiye veya
 * yetersiz mevcut pay durumunda hata döner.
 */
export async function investInProperty(
  _prev: WalletFormState,
  formData: FormData,
): Promise<WalletFormState> {
  const propertyId = String(formData.get("property_id") ?? "");
  const shares = Number(formData.get("shares"));

  if (!propertyId || !shares || shares <= 0) {
    return { error: "Geçerli bir pay adedi girin." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Bu işlem için giriş yapmalısınız." };

  const admin = createAdminClient();

  const { data: property, error: propError } = await admin
    .from("properties")
    .select("id, price_per_share, total_shares, sold_shares, status")
    .eq("id", propertyId)
    .single();

  if (propError || !property) return { error: "Mülk bulunamadı." };
  if (property.status !== "active") return { error: "Bu mülk artık yatırıma açık değil." };

  const remaining = property.total_shares - property.sold_shares;
  if (shares > remaining) {
    return { error: `Bu mülkte sadece ${remaining} pay kaldı.` };
  }

  const amount = shares * Number(property.price_per_share);

  const { data: wallet } = await admin
    .from("wallets")
    .select("balance")
    .eq("user_id", user.id)
    .maybeSingle();

  const currentBalance = wallet?.balance ?? 0;
  if (currentBalance < amount) {
    return { error: "Cüzdan bakiyeniz yetersiz. Önce bakiye yükleyin." };
  }

  const { error: walletError } = await admin
    .from("wallets")
    .upsert({
      user_id: user.id,
      balance: currentBalance - amount,
      updated_at: new Date().toISOString(),
    });
  if (walletError) return { error: "Cüzdan güncellenemedi: " + walletError.message };

  const { error: investError } = await admin.from("investments").insert({
    user_id: user.id,
    property_id: propertyId,
    shares,
    amount,
  });
  if (investError) return { error: "Yatırım kaydedilemedi: " + investError.message };

  await admin
    .from("properties")
    .update({
      sold_shares: property.sold_shares + shares,
      status: property.sold_shares + shares >= property.total_shares ? "sold_out" : "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", propertyId);

  await admin.from("wallet_transactions").insert({
    user_id: user.id,
    type: "investment",
    amount: -amount,
    description: `${shares} pay yatırım`,
  });

  revalidatePath("/hesabim/cuzdanim");
  revalidatePath("/yatirima-basla");
  return { error: null, success: true };
}
