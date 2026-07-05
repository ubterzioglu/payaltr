"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { RevisionStatus } from "@/lib/revisions";

export type RevisionFormState = { error: string | null; success?: boolean };

export async function createRevisionRequest(
  _prev: RevisionFormState,
  formData: FormData,
): Promise<RevisionFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !description) {
    return { error: "Başlık ve açıklama zorunludur." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Bu işlem için giriş yapmalısınız." };
  }

  const { error } = await supabase
    .from("revision_requests")
    .insert({ user_id: user.id, title, description });

  if (error) {
    return { error: "İstek gönderilemedi: " + error.message };
  }

  revalidatePath("/hesabim");
  return { error: null, success: true };
}

export async function addUserComment(
  _prev: RevisionFormState,
  formData: FormData,
): Promise<RevisionFormState> {
  const requestId = String(formData.get("request_id") ?? "");
  const body = String(formData.get("body") ?? "").trim();

  if (!body) return { error: "Yorum boş olamaz." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return { error: "Bu işlem için giriş yapmalısınız." };

  const { error } = await supabase.from("revision_comments").insert({
    request_id: requestId,
    author_email: user.email,
    is_admin: false,
    body,
  });

  if (error) return { error: "Yorum eklenemedi: " + error.message };

  revalidatePath("/hesabim");
  return { error: null, success: true };
}

/** Admin tarafı — service-role client kullanır, RLS'i bypass eder. */
export async function addAdminComment(
  _prev: RevisionFormState,
  formData: FormData,
): Promise<RevisionFormState> {
  const requestId = String(formData.get("request_id") ?? "");
  const body = String(formData.get("body") ?? "").trim();

  if (!body) return { error: "Yorum boş olamaz." };

  const admin = createAdminClient();
  const { error } = await admin.from("revision_comments").insert({
    request_id: requestId,
    author_email: "PayAL Yönetim",
    is_admin: true,
    body,
  });

  if (error) return { error: "Yorum eklenemedi: " + error.message };

  revalidatePath("/admin/revizyon-istekleri");
  return { error: null, success: true };
}

export async function updateRevisionStatus(
  requestId: string,
  status: RevisionStatus,
): Promise<void> {
  const admin = createAdminClient();
  await admin
    .from("revision_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", requestId);

  revalidatePath("/admin/revizyon-istekleri");
}
