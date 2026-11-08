import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { PageShell } from "@/components/PageShell";
import { CATEGORY_LABELS, getAllArticles } from "@/lib/content";
import { sk } from "@/lib/sk";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Novinky",
  description:
    "Novinky, oznamy a správy Miestnej organizácie SRZ Čadca – povolenia, revíry, brigády a preteky.",
};

const FILTERS = [
  { key: "all", label: "Všetky" },
  ...Object.entries(CATEGORY_LABELS)
    .filter(([k]) => k !== "zakaz")
    .map(([key, label]) => ({ key, label })),
];

const PER_PAGE = 12;

export default async function NovinkyPage({
  searchParams,
}: {
  searchParams: Promise<{ kategoria?: string; strana?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.kategoria || "all";
  const page = Math.max(1, Number(sp.strana || 1) || 1);
  const all = getAllArticles();
  const filtered =
    category === "all" ? all : all.filter((a) => a.categories.includes(category));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const slice = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <PageShell title={sk("Novinky")} wide crumbs={[{ label: sk("Novinky") }]}>
      <div className={styles.filters} role="group" aria-label="Filter kategórií">
        {FILTERS.map((f) => {
          const href =
            f.key === "all"
              ? "/novinky"
              : `/novinky?kategoria=${encodeURIComponent(f.key)}`;
          const active = category === f.key;
          return (
            <Link
              key={f.key}
              href={href}
              className={`btn btn--ghost-pill ${active ? "is-active" : ""}`}
              aria-pressed={active}
            >
              {sk(f.label)}
            </Link>
          );
        })}
      </div>

      <div className={styles.grid}>
        {slice.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {totalPages > 1 ? (
        <nav className={styles.pager} aria-label="Stránkovanie">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
            const params = new URLSearchParams();
            if (category !== "all") params.set("kategoria", category);
            if (n > 1) params.set("strana", String(n));
            const q = params.toString();
            return (
              <Link
                key={n}
                href={q ? `/novinky?${q}` : "/novinky"}
                className={`${styles.pageBtn} ${n === current ? styles.current : ""}`}
                aria-current={n === current ? "page" : undefined}
              >
                {n}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </PageShell>
  );
}
