import Image from "next/image";
import Link from "next/link";
import {
  chipForArticle,
  formatSkDate,
  type Article,
} from "@/lib/content";
import styles from "./ArticleCard.module.css";

export function ArticleCard({ article }: { article: Article }) {
  const chip = chipForArticle(article);
  return (
    <article className={styles.card}>
      <Link href={`/aktuality/${article.slug}`} className={styles.media}>
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt || article.title}
            width={640}
            height={400}
            sizes="(max-width: 700px) 100vw, 33vw"
            className={styles.image}
          />
        ) : (
          <div className={`${styles.fallback} ${styles[`cat-${chip.key}`] || ""}`}>
            {chip.label}
          </div>
        )}
      </Link>
      <div className={styles.body}>
        <div className={styles.meta}>
          <time dateTime={article.date}>{formatSkDate(article.date)}</time>
          <span className={`chip ${chipClass(chip.key)}`}>{chip.label}</span>
        </div>
        <h2 className={styles.title}>
          <Link href={`/aktuality/${article.slug}`}>{article.title}</Link>
        </h2>
      </div>
    </article>
  );
}

function chipClass(key: string): string {
  switch (key) {
    case "zakaz":
      return "chip--zakaz";
    case "preteky":
      return "chip--preteky";
    case "brigady":
      return "chip--brigady";
    case "povolenia":
      return "chip--oznam";
    default:
      return "chip--rybari";
  }
}
