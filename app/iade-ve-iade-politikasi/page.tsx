import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getLegalHtml } from "@/lib/legal";

export const metadata: Metadata = {
  title: "İade ve İade Politikası",
  description: "PayAL'de iade şartları, cayma hakkı ve iade süreci hakkında detaylı bilgi.",
  alternates: { canonical: "/iade-ve-iade-politikasi" },
  robots: { index: false, follow: true },
};

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
