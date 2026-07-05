// Blog yazıları — payaltr.com WordPress içeriğinden birebir çıkarıldı.
// İçerik content/posts/*.json içinde tam HTML olarak saklanır.

import fs from "node:fs";
import path from "node:path";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// Yayın sırası (en güncelden eskiye) — WordPress kayıt sırasına yakın.
const ORDER = ["15549", "379", "382", "124", "1"];

function readPost(id: string): Post | null {
  const fp = path.join(POSTS_DIR, `post_${id}.json`);
  if (!fs.existsSync(fp)) return null;
  const raw = JSON.parse(fs.readFileSync(fp, "utf-8"));
  return {
    id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    content_html: raw.content_html,
  };
}

export function getAllPosts(): Post[] {
  return ORDER.map(readPost).filter((p): p is Post => p !== null);
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
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
