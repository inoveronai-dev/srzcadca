import Link from "next/link";
import { DateBadgeList } from "@/components/DateBadgeList";
import { IconTrophy, IconWork } from "@/components/Icons";
import { getArticlesByCategory } from "@/lib/content";
import { sk } from "@/lib/sk";
import styles from "./EventsSection.module.css";

export function EventsSection() {
  const brigady = getArticlesByCategory("brigady").slice(0, 4);
  const preteky = getArticlesByCategory("preteky").slice(0, 4);

  return (
    <section
      className={`section section--paper section--continue ${styles.section}`}
      aria-label={sk("Brigády a preteky")}
    >
      <div className="container">
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.heading}>
              <span className={styles.icon} aria-hidden="true">
                <IconWork />
              </span>
              <h2 className={styles.title}>{sk("Brigády")}</h2>
            </div>
            <Link href="/brigady" className={styles.all}>
              {sk("Všetky brigády →")}
            </Link>
            <div className={styles.list}>
              <DateBadgeList articles={brigady} />
            </div>
            <p className={styles.note}>
              {sk("Neodpracovaná brigáda: 100 €. Plán brigád a kontakty nájdete na stránke")}{" "}
              <Link href="/brigady">{sk("Brigády")}</Link>
              {sk(".")}
            </p>
          </article>

          <article className={styles.card}>
            <div className={styles.heading}>
              <span className={styles.icon} aria-hidden="true">
                <IconTrophy />
              </span>
              <h2 className={styles.title}>{sk("Preteky")}</h2>
            </div>
            <Link href="/preteky" className={styles.all}>
              {sk("Všetky preteky →")}
            </Link>
            <div className={styles.list}>
              <DateBadgeList articles={preteky} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
