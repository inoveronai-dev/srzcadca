import Link from "next/link";
import { IconCheck } from "@/components/Icons";
import { SaleDatesValue } from "@/components/SaleDatesValue";
import {
  adultPermitPreview,
  site,
  toTelHref,
} from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./PermitsSection.module.css";

type Props = {
  /** On /povolenia the full price list is below — hide the teaser link. */
  showFullPriceLink?: boolean;
};

export function PermitsSection({ showFullPriceLink = true }: Props) {
  return (
    <section className={`section--deep ${styles.section}`} aria-labelledby="permits-title">
      <div className="container">
        <header className={styles.header}>
          <p className={`eyebrow ${styles.eyebrow}`}>{sk("Pre členov")}</p>
          <h2 id="permits-title">{sk("Predaj povolení")}</h2>
        </header>

        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={`${styles.panel} ${styles.panelFacts}`}>
              <dl className={styles.facts}>
                <div className={styles.factRow}>
                  <dt>{sk("Kde")}</dt>
                  <dd>
                    {sk(
                      "Rybársky dom, Horná 1108/35, Čadca – 1. poschodie, zasadačka",
                    )}
                  </dd>
                </div>
                <div className={styles.factRow}>
                  <dt>{sk("Termíny 2027")}</dt>
                  <dd>
                    <SaleDatesValue linkClassName={styles.datesLink} />
                    <a
                      href={site.salePosterPdf.href}
                      className={styles.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {sk("Informácie Rady SRZ k predaju (PDF) →")}
                    </a>
                  </dd>
                </div>
                <div className={styles.factRow}>
                  <dt>{sk("Členský príspevok")}</dt>
                  <dd>{sk(site.memberFeeValue)}</dd>
                </div>
              </dl>
            </div>

            <div className={`${styles.panel} ${styles.panelChecklist} ${styles.grow}`}>
              <h3 className={styles.panelTitle}>{sk("Čo si priniesť")}</h3>
              <ul className={styles.checklist}>
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
          </div>

          <div className={styles.right}>
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
              {showFullPriceLink ? (
                <Link href="/povolenia" className={`fullLink ${styles.fullLink}`}>
                  {sk("Celý cenník vrátane detí a mládeže →")}
                </Link>
              ) : null}
            </aside>

            <div className={`${styles.saleRow} ${styles.grow}`}>
              <div>
                <p className={styles.saleRole}>{sk("Predaj povolení")}</p>
                <p className={styles.saleName}>{sk(site.saleContact.name)}</p>
              </div>
              <a
                href={toTelHref(site.saleContact.phone)}
                className={`btn btn--white tel ${styles.phoneBtn}`}
              >
                {site.saleContact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
