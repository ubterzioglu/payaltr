import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Post } from "@/lib/posts";
import PostForm from "../PostForm";

export const metadata: Metadata = { title: "Admin — Yazı Düzenle" };
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const admin = createAdminClient();
  const { data: post } = await admin
    .from("posts")
    .select("id, slug, title, excerpt, content_html, status, created_at")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <div>
      <h1 className="admin__title">Yazı Düzenle</h1>
      <div className="card" style={{ maxWidth: 640, marginTop: "1.5rem" }}>
        <PostForm post={post as Post} />
      </div>
    </div>
  );
}
