"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export type PostFormState = { error: string | null; success?: boolean };

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createPost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const contentHtml = String(formData.get("content_html") ?? "").trim();
  const status = String(formData.get("status") ?? "draft");

  if (!title || !contentHtml) {
    return { error: "Başlık ve içerik zorunludur." };
  }

  const slug = slugify(title);
  const admin = createAdminClient();
  const { error } = await admin.from("posts").insert({
    slug,
    title,
    excerpt,
    content_html: contentHtml,
    status,
  });

  if (error) return { error: "Yazı oluşturulamadı: " + error.message };

  revalidatePath("/admin/icerik");
  revalidatePath("/blog");
  return { error: null, success: true };
}

export async function updatePost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const contentHtml = String(formData.get("content_html") ?? "").trim();
  const status = String(formData.get("status") ?? "draft");

  if (!id || !title || !contentHtml) {
    return { error: "Başlık ve içerik zorunludur." };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("posts")
    .update({
      title,
      excerpt,
      content_html: contentHtml,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: "Yazı güncellenemedi: " + error.message };

  revalidatePath("/admin/icerik");
  revalidatePath("/blog");
  return { error: null, success: true };
}

export async function deletePost(id: string): Promise<void> {
  const admin = createAdminClient();
  await admin.from("posts").delete().eq("id", id);
  revalidatePath("/admin/icerik");
  revalidatePath("/blog");
}
