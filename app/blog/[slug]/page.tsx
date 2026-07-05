import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { getAllPosts, getPostBySlug, summarize } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Yazı bulunamadı" };
  return { title: post.title, description: summarize(post, 160) };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero title={post.title} />
      <section className="section">
        <div className="container">
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </div>
      </section>
    </>
  );
}
