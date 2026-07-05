import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/hakkimizda", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fiyatlandirma", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sss-destek", priority: 0.6, changeFrequency: "monthly" },
  { path: "/bize-ulasin", priority: 0.6, changeFrequency: "yearly" },
  { path: "/yatirima-basla", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/kvkk-aydinlatma-metni", priority: 0.3, changeFrequency: "yearly" },
  { path: "/iade-ve-iade-politikasi", priority: 0.3, changeFrequency: "yearly" },
  { path: "/giris", priority: 0.4, changeFrequency: "yearly" },
  { path: "/kayit-ol", priority: 0.5, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const posts = await getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
