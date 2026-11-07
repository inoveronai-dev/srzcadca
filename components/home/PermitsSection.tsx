import Link from "next/link";
import { IconCheck } from "@/components/Icons";
import {
  adultPermitPreview,
  site,
  toTelHref,
} from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./PermitsSection.module.css";

export function PermitsSection() {
  return (
    <section className={styles.section} aria-labelledby="permits-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>{sk("Pre členov")}</p>
          <h2 id="permits-title">{sk("Predaj povolení")}</h2>
          <p className={styles.place}>{sk(site.saleAddress)}</p>
          <p className={styles.dates}>
            {sk(`Termíny predaja na rok 2027: ${site.saleDatesPlaceholder}`)}
          </p>
          <p className={styles.dates}>
            <a href={site.salePosterPdf.href}>{sk(site.salePosterPdf.label)}</a>
          </p>
          <p className={styles.dates}>{sk(site.memberFeeDeadline)}</p>

          <div className={styles.checklist}>
            <h3>{sk("Čo si priniesť")}</h3>
            <ul>
              {site.saleChecklist.map((item) => (
                <li key={item}>
                  <IconCheck className={styles.check} />
                  <span>{sk(item)}</span>
                </li>
              ))}
            </ul>
            <Link href="/tlaciva" className={styles.forms}>
              {sk("Stiahnuť tlačivá →")}
            </Link>
          </div>

          <div className={styles.saleRow}>
            <div>
              <p className={styles.saleRole}>{sk("Predaj povolení")}</p>
              <p className={styles.saleName}>{sk(site.saleContact.name)}</p>
            </div>
            <a href={toTelHref(site.saleContact.phone)} className="btn btn--white">
              {site.saleContact.phone}
            </a>
          </div>
        </div>

        <aside className={styles.priceCard}>
          <h3>{sk("Cenník 2026 – dospelí")}</h3>
          <ul>
            {adultPermitPreview.map((row) => (
              <li key={row.name}>
                <span>{sk(row.name)}</span>
                <strong>{sk(row.price)}</strong>
              </li>
            ))}
          </ul>
          <Link href="/povolenia" className={styles.fullLink}>
            {sk("Celý cenník vrátane detí a mládeže →")}
          </Link>
        </aside>
      </div>
    </section>
  );
}
