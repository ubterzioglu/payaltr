import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/auth-actions";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const links = [
  { href: "/admin", label: "Genel Bakış" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar" },
  { href: "/admin/icerik", label: "İçerik" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email?.toLowerCase();
  if (!user || !email || !ADMIN_EMAILS.includes(email)) {
    redirect("/giris?next=/admin");
  }

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">PayAL Admin</div>
        <nav className="admin__nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="admin__navlink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="admin__user">
          <span>{user.email}</span>
          <form action={signOut}>
            <button type="submit" className="admin__logout">
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>
      <main className="admin__content">{children}</main>
    </div>
  );
}
