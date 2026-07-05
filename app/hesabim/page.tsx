import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/auth-actions";

export const metadata: Metadata = { title: "Hesabım" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <PageHero title="Hesabım" subtitle={user?.email ?? ""} />
      <section className="section">
        <div className="container">
          <div className="card" style={{ maxWidth: 480 }}>
            <h3 className="card__title">
              {(user?.user_metadata?.full_name as string) ?? "Yatırımcı"}
            </h3>
            <p className="card__text">{user?.email}</p>
            <p className="card__text" style={{ marginTop: "1rem" }}>
              Cüzdan, portföy ve yatırım akışları Faz 3&apos;te eklenecektir.
            </p>
            <form action={signOut} style={{ marginTop: "1.5rem" }}>
              <button type="submit" className="btn btn--dark">
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
