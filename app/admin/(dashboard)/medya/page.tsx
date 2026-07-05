import type { Metadata } from "next";
import Link from "next/link";
import { listMediaMonths } from "@/lib/media";

export const metadata: Metadata = { title: "Admin — Medya Arşivi" };

const MONTH_NAMES: Record<string, string> = {
  "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan",
  "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos",
  "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık",
};

export default function Page() {
  const months = listMediaMonths();
  const total = months.reduce((sum, m) => sum + m.fileCount, 0);

  return (
    <div>
      <h1 className="admin__title">Medya Arşivi</h1>
      <p className="card__text" style={{ margin: "0.5rem 0 1.5rem" }}>
        payaltr.com WordPress yedeğinden çıkarılan tüm görseller ({total} dosya).
        Sitede aktif kullanılan görsellerin bir kısmı zaten canlı sayfalarda
        yer alıyor; burası tam arşivdir.
      </p>

      <div className="grid grid--4">
        {months.map((m) => (
          <Link
            key={`${m.year}-${m.month}`}
            href={`/admin/medya/${m.year}/${m.month}`}
            className="card media-folder"
          >
            <div className="media-folder__icon">🗂️</div>
            <h3 className="card__title" style={{ fontSize: "1.05rem" }}>
              {MONTH_NAMES[m.month] ?? m.month} {m.year}
            </h3>
            <p className="card__text">{m.fileCount} dosya</p>
          </Link>
        ))}
        {months.length === 0 ? (
          <p className="card__text">Medya arşivi bulunamadı.</p>
        ) : null}
      </div>
    </div>
  );
}
