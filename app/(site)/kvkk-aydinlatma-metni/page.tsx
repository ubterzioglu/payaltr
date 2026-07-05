import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getLegalHtml } from "@/lib/legal";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: "PayAL'in 6698 sayılı KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.",
  alternates: { canonical: "/kvkk-aydinlatma-metni" },
  robots: { index: false, follow: true },
};

export default function Page() {
  const { title, html } = getLegalHtml("3");
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
