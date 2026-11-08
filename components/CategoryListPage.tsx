import { ArticleCard } from "@/components/ArticleCard";
import { PageShell } from "@/components/PageShell";
import { getArticlesByCategory } from "@/lib/content";
import styles from "@/app/novinky/page.module.css";

export function CategoryListPage({
  title,
  description,
  category,
  crumbsLabel,
}: {
  title: string;
  description: string;
  category: string;
  crumbsLabel: string;
}) {
  const articles = getArticlesByCategory(category);
  return (
    <PageShell title={title} wide crumbs={[{ label: crumbsLabel }]}>
      <p className={styles.leadHidden} style={{ marginTop: "-0.5rem", marginBottom: "1.25rem", color: "var(--muted)" }}>
        {description}
      </p>
      <div className={styles.grid}>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      {!articles.length ? (
        <p style={{ color: "var(--muted)", fontWeight: 600 }}>Zatiaľ žiadne príspevky.</p>
      ) : null}
    </PageShell>
  );
}
