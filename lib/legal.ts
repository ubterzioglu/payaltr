import fs from "node:fs";
import path from "node:path";

export function getLegalHtml(postId: string): { title: string; html: string } {
  const fp = path.join(process.cwd(), "content", "posts", `post_${postId}.json`);
  const raw = JSON.parse(fs.readFileSync(fp, "utf-8"));
  return { title: raw.title, html: raw.content_html };
}
