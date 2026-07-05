import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, summarize } from "@/lib/posts";

export const metadata: Metadata = { title: "Admin — İçerik" };

export default function Page() {
  const posts = getAllPosts();
  return (
    <div>
      <h1 className="admin__title">İçerik — Blog Yazıları</h1>
      <p className="card__text" style={{ margin: "0.5rem 0 1.5rem" }}>
        Yazılar payaltr.com WordPress yedeğinden içe aktarıldı. Düzenleme
        Faz 3&apos;te bir CMS akışıyla eklenecektir.
      </p>
      <div className="admin__table-wrap">
        <table className="admin__table">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Slug</th>
              <th>Özet</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.slug}</td>
                <td>{summarize(p, 80)}</td>
                <td>
                  <Link href={`/blog/${p.slug}`} target="_blank">
                    Görüntüle ↗
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
