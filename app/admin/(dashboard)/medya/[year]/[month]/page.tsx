import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { listMediaFiles } from "@/lib/media";

export const metadata: Metadata = { title: "Admin — Medya Klasörü" };

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;
  const files = listMediaFiles(year, month);

  return (
    <div>
      <Link href="/admin/medya" style={{ fontSize: "0.9rem" }}>
        ← Medya Arşivine Dön
      </Link>
      <h1 className="admin__title" style={{ marginTop: "0.75rem" }}>
        {year} / {month} — {files.length} dosya
      </h1>

      <div className="media-grid">
        {files.map((f) => {
          const src = `/wp-media/${year}/${month}/${encodeURIComponent(f)}`;
          return (
            <a
              key={f}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="media-grid__item"
              title={f}
            >
              <Image
                src={src}
                alt={f}
                width={160}
                height={160}
                className="media-grid__thumb"
                unoptimized
              />
              <span className="media-grid__name">{f}</span>
            </a>
          );
        })}
        {files.length === 0 ? (
          <p className="card__text">Bu klasörde görsel bulunamadı.</p>
        ) : null}
      </div>
    </div>
  );
}
