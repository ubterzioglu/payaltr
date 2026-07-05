import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

const legal = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
  { label: "İade ve İade Politikası", href: "/iade-ve-iade-politikasi" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brandcol">
          <Image
            src={site.logo}
            alt={site.name}
            width={140}
            height={38}
          />
          <p className="site-footer__desc">{site.description}</p>
          <p className="site-footer__tag">“{site.tagline}”</p>
        </div>

        <div>
          <h4 className="site-footer__head">Menü</h4>
          <ul className="site-footer__list">
            {nav.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="site-footer__head">Yasal</h4>
          <ul className="site-footer__list">
            {legal.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="site-footer__head">İletişim</h4>
          <ul className="site-footer__list">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li>
              <a href="https://x.com/payaltr" target="_blank" rel="noopener noreferrer">
                X (Twitter)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          © 2026 {site.name}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
