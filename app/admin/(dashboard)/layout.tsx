import { redirect } from "next/navigation";
import Link from "next/link";
import { hasAdminSession } from "@/lib/admin-auth";
import { adminSignOut } from "@/lib/auth-actions";

const links = [
  { href: "/admin", label: "Genel Bakış" },
  { href: "/admin/revizyon-istekleri", label: "Revizyon İstekleri" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar" },
  { href: "/admin/icerik", label: "İçerik" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await hasAdminSession();
  if (!authed) {
    redirect("/admin/giris");
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
          <form action={adminSignOut}>
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
