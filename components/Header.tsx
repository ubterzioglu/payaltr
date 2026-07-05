"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand" aria-label={site.name}>
          <Image
            src={site.logo}
            alt={site.name}
            width={132}
            height={36}
            priority
          />
        </Link>

        <nav className={`site-nav ${open ? "site-nav--open" : ""}`}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav__link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link href="/giris" className="site-header__login">
            Giriş
          </Link>
          <Link href="/yatirima-basla" className="btn btn--gold">
            Yatırıma Başla
          </Link>
          <button
            className="site-header__burger"
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
