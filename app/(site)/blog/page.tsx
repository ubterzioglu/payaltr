import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getAllPosts, summarize } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Gayrimenkul yatırımı, paylaşımlı mülkiyet, pasif gelir ve piyasa analizleri üzerine PayAL blog yazıları.",
  alternates: { canonical: "/blog" },
};

export default async function Page() {
  const posts = await getAllPosts();
  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Gayrimenkul yatırımı, pasif gelir ve piyasa analizleri üzerine güncel içerikler."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {posts.map((p) => (
              <article key={p.id} className="card">
                <h2 className="card__title">
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </h2>
                <p className="card__text">{summarize(p)}</p>
                <Link
                  href={`/blog/${p.slug}`}
                  className="card__more"
                  style={{ marginTop: "1rem", display: "inline-block", fontWeight: 700, color: "var(--accent)" }}
                >
                  Devamını oku →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
