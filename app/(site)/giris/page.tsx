import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import GirisForm from "./GirisForm";

export const metadata: Metadata = { title: "Giriş" };

export default function Page() {
  return (
    <>
      <PageHero title="Giriş" subtitle="Yatırımcı hesabınıza giriş yapın." />
      <section className="section">
        <div className="container auth">
          <Suspense fallback={<p className="card__text">Yükleniyor…</p>}>
            <GirisForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
