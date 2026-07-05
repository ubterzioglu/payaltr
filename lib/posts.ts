// Blog yazıları — Supabase "posts" tablosundan okunur (Faz 3 CMS).

import { createAdminClient } from "@/lib/supabase/admin";

export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  status: PostStatus;
  created_at: string;
};

export async function getAllPosts(): Promise<Post[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("posts")
    .select("id, slug, title, excerpt, content_html, status, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

/** Yazının ilk paragrafından kısa bir özet üretir. */
export function summarize(post: Post, max = 180): string {
  if (post.excerpt && post.excerpt.trim()) return post.excerpt.trim().slice(0, max);
  const plain = post.content_html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain.slice(0, max) + (plain.length > max ? "…" : "");
}
