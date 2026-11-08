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
import { sk } from "@/lib/sk";
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
  if (!article) return { title: "Novinka" };
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
        { label: sk("Novinky"), href: "/novinky" },
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
          <h2>{sk("Prílohy na stiahnutie")}</h2>
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
        <Link href="/novinky">{sk("← Späť na novinky")}</Link>
      </p>

      <nav className={styles.neighbors} aria-label="Predchádzajúca a nasledujúca novinka">
        {prev ? (
          <Link href={`/novinky/${prev.slug}`} className={styles.neighbor}>
            <span>{sk("Staršia")}</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/novinky/${next.slug}`} className={`${styles.neighbor} ${styles.next}`}>
            <span>{sk("Novšia")}</span>
            <strong>{next.title}</strong>
          </Link>
        ) : null}
      </nav>
    </PageShell>
  );
}
