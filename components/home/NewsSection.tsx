import Link from "next/link";
import { getHomepageNews, type NewsCategory } from "@/content/site";
import styles from "./NewsSection.module.css";

function chipClass(category: NewsCategory): string {
  switch (category) {
    case "Oznam":
      return "chip chip--oznam";
    case "Zákaz lovu":
      return "chip chip--zakaz";
    case "Preteky":
      return "chip chip--preteky";
    case "Brigády":
      return "chip chip--brigady";
    default:
      return "chip chip--rybari";
  }
}

export function NewsSection() {
  const { featured, list } = getHomepageNews();

  return (
    <section className={`section ${styles.section}`} aria-labelledby="news-title">
      <div className="container">
        <div className={styles.heading}>
          <h2 id="news-title">Aktuality</h2>
          <Link href="/aktuality" className={styles.all}>
            Všetky aktuality →
          </Link>
        </div>

        <div className={styles.grid}>
          {featured ? (
            <article className={styles.featured}>
              <div className={styles.featuredMeta}>
                <time dateTime={featured.dateSort}>{featured.dateLabel}</time>
                <span className={chipClass(featured.category)}>{featured.category}</span>
              </div>
              <h3 className={styles.featuredTitle}>
                <Link href={featured.href}>{featured.title}</Link>
              </h3>
              {featured.perex ? <p className={styles.perex}>{featured.perex}</p> : null}
              <Link href={featured.href} className={styles.featuredLink}>
                Prečítať →
              </Link>
            </article>
          ) : null}

          <ul className={styles.list}>
            {list.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemMeta}>
                  <time dateTime={item.dateSort}>{item.dateLabel}</time>
                  <span className={chipClass(item.category)}>{item.category}</span>
                </div>
                <Link href={item.href} className={styles.itemTitle}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
