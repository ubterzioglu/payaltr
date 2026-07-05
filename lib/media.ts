import fs from "node:fs";
import path from "node:path";

const MEDIA_ROOT = path.join(process.cwd(), "public", "wp-media");

export type MediaMonth = { year: string; month: string; fileCount: number };

function isImage(filename: string): boolean {
  return /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(filename);
}

export function listMediaMonths(): MediaMonth[] {
  if (!fs.existsSync(MEDIA_ROOT)) return [];
  const months: MediaMonth[] = [];

  for (const year of fs.readdirSync(MEDIA_ROOT)) {
    const yearPath = path.join(MEDIA_ROOT, year);
    if (!fs.statSync(yearPath).isDirectory()) continue;

    for (const month of fs.readdirSync(yearPath)) {
      const monthPath = path.join(yearPath, month);
      if (!fs.statSync(monthPath).isDirectory()) continue;

      const fileCount = fs.readdirSync(monthPath).filter((f) =>
        fs.statSync(path.join(monthPath, f)).isFile(),
      ).length;

      months.push({ year, month, fileCount });
    }
  }

  return months.sort((a, b) => (a.year + a.month < b.year + b.month ? 1 : -1));
}

export function listMediaFiles(year: string, month: string): string[] {
  const safeYear = /^\d{4}$/.test(year) ? year : "";
  const safeMonth = /^\d{2}$/.test(month) ? month : "";
  if (!safeYear || !safeMonth) return [];

  const dirPath = path.join(MEDIA_ROOT, safeYear, safeMonth);
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter((f) => fs.statSync(path.join(dirPath, f)).isFile() && isImage(f))
    .sort();
}

export function totalMediaCount(): number {
  return listMediaMonths().reduce((sum, m) => sum + m.fileCount, 0);
}
