import type { Metadata } from "next";
import { Suspense } from "react";
import AdminGirisForm from "./AdminGirisForm";

export const metadata: Metadata = { title: "Yönetim Paneli Girişi" };

export default function Page() {
  return (
    <div className="admin-login">
      <div className="admin-login__brand">
        <div className="admin-login__brandmark">
          <span className="admin-login__logo-box">P</span>
          <span>PayAL</span>
        </div>

        <div className="admin-login__eyebrow">Yönetim Konsolu</div>
        <h1 className="admin-login__headline">
          Büyümenin arkasındaki <span>yapıyı</span> yönetin.
        </h1>
        <p className="admin-login__sub">
          İçerik, kullanıcılar ve revizyon istekleri — hepsi tek panelde.
        </p>

        <div className="admin-login__cities">
          DUBAİ — İSTANBUL — RİYAD
        </div>
      </div>

      <div className="admin-login__panel">
        <div className="admin-login__panel-inner">
          <div className="admin-login__eyebrow">Giriş</div>
          <h2 className="admin-login__title">Yönetim Paneli</h2>
          <p className="admin-login__hint">Devam etmek için şifrenizi girin.</p>

          <Suspense fallback={null}>
            <AdminGirisForm />
          </Suspense>

          <p className="admin-login__footnote">
            Bu alan yalnızca yetkili yöneticiler içindir.
          </p>
        </div>
      </div>
    </div>
  );
}
