import Image from "next/image";
import Link from "next/link";
import { getHomepageNews, type NewsCategory } from "@/content/site";
import { sk } from "@/lib/sk";
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
  const hasImage = Boolean(featured?.image);

  return (
    <section
      className={`section section--paper section--tight-bottom ${styles.section}`}
      aria-labelledby="news-title"
    >
      <div className="container">
        <div className={styles.heading}>
          <h2 id="news-title">{sk("Aktuality")}</h2>
          <Link href="/aktuality" className={styles.all}>
            {sk("Všetky aktuality →")}
          </Link>
        </div>

        <div className={styles.grid}>
          {featured ? (
            <article
              className={`${styles.featured} ${hasImage ? styles.featuredWithImage : ""}`}
            >
              <div className={styles.featuredBody}>
                <div className={styles.featuredMeta}>
                  <time dateTime={featured.dateSort}>{sk(featured.dateLabel)}</time>
                  <span className={chipClass(featured.category)}>
                    {sk(featured.category)}
                  </span>
                </div>
                <h3 className={styles.featuredTitle}>
                  <Link href={featured.href}>{sk(featured.title)}</Link>
                </h3>
                {featured.perex ? (
                  <p className={styles.perex}>{sk(featured.perex)}</p>
                ) : null}
                <Link href={featured.href} className={styles.featuredLink}>
                  {sk("Prečítať →")}
                </Link>
              </div>
              {hasImage && featured.image ? (
                <div className={styles.featuredMedia}>
                  <Image
                    src={featured.image}
                    alt={sk(featured.imageAlt || featured.title)}
                    fill
                    sizes="(max-width: 899px) 100vw, 45vw"
                    className={styles.featuredImage}
                  />
                </div>
              ) : null}
            </article>
          ) : null}

          <ul className={styles.list}>
            {list.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemMeta}>
                  <time dateTime={item.dateSort}>{sk(item.dateLabel)}</time>
                  <span className={chipClass(item.category)}>{sk(item.category)}</span>
                </div>
                <Link href={item.href} className={styles.itemTitle}>
                  {sk(item.title)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
