import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getLegalHtml } from "@/lib/legal";

export const metadata: Metadata = { title: "İade ve İade Politikası" };

export default function Page() {
  const { title, html } = getLegalHtml("14");
  return (
    <>
      <PageHero title={title} />
      <section className="section">
        <div className="container">
          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </>
  );
}
