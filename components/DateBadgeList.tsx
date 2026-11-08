import Link from "next/link";
import {
  articleHref,
  getArticleDateParts,
  type Article,
} from "@/lib/content";
import { sk } from "@/lib/sk";
import styles from "./DateBadgeList.module.css";

export function DateBadgeList({ articles }: { articles: Article[] }) {
  if (!articles.length) {
    return (
      <p className={styles.empty}>{sk("Zatiaľ žiadne príspevky.")}</p>
    );
  }

  return (
    <ul className={styles.list}>
      {articles.map((article) => {
        const parts = getArticleDateParts(article.date);
        return (
          <li key={article.slug}>
            <Link href={articleHref(article.slug)} className={styles.row}>
              <span className={styles.badge} aria-hidden={!parts}>
                {parts ? (
                  <>
                    <span className={styles.day}>{parts.day}</span>
                    <span className={styles.month}>{sk(parts.monthAbbr)}</span>
                  </>
                ) : (
                  <span className={styles.month}>—</span>
                )}
              </span>
              <span className={styles.body}>
                <span className={styles.title}>{article.title}</span>
                {parts ? (
                  <time className={styles.date} dateTime={article.date}>
                    {parts.full}
                  </time>
                ) : null}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
