import Link from "next/link";
import { IconCheck } from "@/components/Icons";
import {
  adultPermitPreview,
  site,
  toTelHref,
} from "@/content/site";
import styles from "./PermitsSection.module.css";

export function PermitsSection() {
  return (
    <section className={styles.section} aria-labelledby="permits-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>Pre členov</p>
          <h2 id="permits-title">Predaj povolení</h2>
          <p className={styles.place}>{site.saleAddress}</p>
          <p className={styles.dates}>
            Termíny predaja na rok 2027: {site.saleDatesPlaceholder}
          </p>

          <div className={styles.checklist}>
            <h3>Čo si priniesť</h3>
            <ul>
              {site.saleChecklist.map((item) => (
                <li key={item}>
                  <IconCheck className={styles.check} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/tlaciva" className={styles.forms}>
              Stiahnuť tlačivá →
            </Link>
          </div>

          <p className={styles.questions}>
            Otázky k predaju: {site.saleContact.name} –{" "}
            <a href={toTelHref(site.saleContact.phone)}>{site.saleContact.phone}</a>
          </p>
        </div>

        <aside className={styles.priceCard}>
          <h3>Cenník 2026 – dospelí</h3>
          <ul>
            {adultPermitPreview.map((row) => (
              <li key={row.name}>
                <span>{row.name}</span>
                <strong>{row.price}</strong>
              </li>
            ))}
          </ul>
          <Link href="/povolenia" className={styles.fullLink}>
            Celý cenník vrátane detí a mládeže →
          </Link>
        </aside>
      </div>
    </section>
  );
}
