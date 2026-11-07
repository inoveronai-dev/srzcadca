import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { PageShell } from "@/components/PageShell";
import { getArticlesByCategory } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Preteky",
  description: "Pozvánky a výsledky pretekov MO Čadca – detské, muškárske, CCM a ďalšie.",
};

export default function PretekyPage() {
  const articles = getArticlesByCategory("preteky");
  const byYear = new Map<string, typeof articles>();
  for (const a of articles) {
    const year = a.date ? String(new Date(a.date).getFullYear()) : "Bez dátumu";
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(a);
  }
  const years = [...byYear.keys()].sort((a, b) => b.localeCompare(a));

  return (
    <PageShell title="Preteky" wide crumbs={[{ label: "Preteky" }]}>
      {years.map((year) => (
        <section key={year} className={styles.year}>
          <h2>{year}</h2>
          <div className={styles.grid}>
            {byYear.get(year)!.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ))}
      {!articles.length ? (
        <p style={{ color: "var(--muted)", fontWeight: 600 }}>
          Zatiaľ žiadne príspevky o pretekoch.
        </p>
      ) : null}
    </PageShell>
  );
}
