import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import {
  chipForArticle,
  formatSkDate,
  getAllArticles,
  getArticle,
  getNeighbors,
} from "@/lib/content";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Aktualita" };
  return {
    title: article.title,
    description: article.title,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const chip = chipForArticle(article);
  const { prev, next } = getNeighbors(slug);

  return (
    <PageShell
      title={article.title}
      crumbs={[
        { label: "Aktuality", href: "/aktuality" },
        { label: article.title },
      ]}
    >
      <div className={styles.meta}>
        <span className={`chip ${chip.key === "zakaz" ? "chip--zakaz" : "chip--rybari"}`}>
          {chip.label}
        </span>
        <time dateTime={article.date}>{formatSkDate(article.date)}</time>
      </div>

      {article.image ? (
        <div
          className={`${styles.heroImage} ${article.heroImage ? styles.heroPhoto : styles.heroPoster}`}
        >
          <Image
            src={article.image}
            alt={article.imageAlt || article.title}
            width={900}
            height={560}
            sizes="(max-width: 900px) 100vw, 900px"
            className={styles.image}
            priority
          />
        </div>
      ) : null}

      <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />

      {article.attachments?.length ? (
        <aside className={styles.attachments}>
          <h2>Prílohy na stiahnutie</h2>
          <ul>
            {article.attachments.map((a) => (
              <li key={a.url}>
                <a href={a.url} download>
                  <span className={styles.fileType}>{a.type || "SÚBOR"}</span>
                  <span>{a.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <p className={styles.back}>
        <Link href="/aktuality">← Späť na aktuality</Link>
      </p>

      <nav className={styles.neighbors} aria-label="Predchádzajúca a nasledujúca aktualita">
        {prev ? (
          <Link href={`/aktuality/${prev.slug}`} className={styles.neighbor}>
            <span>Staršia</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/aktuality/${next.slug}`} className={`${styles.neighbor} ${styles.next}`}>
            <span>Novšia</span>
            <strong>{next.title}</strong>
          </Link>
        ) : null}
      </nav>
    </PageShell>
  );
}
