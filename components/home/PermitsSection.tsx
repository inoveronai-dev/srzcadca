import Link from "next/link";
import { IconCheck } from "@/components/Icons";
import {
  adultPermitPreview,
  site,
  toTelHref,
} from "@/content/site";
import { sk } from "@/lib/sk";
import { hidePlaceholders, isPlaceholderText } from "@/lib/placeholders";
import styles from "./PermitsSection.module.css";

export function PermitsSection() {
  const hideDates =
    hidePlaceholders() && isPlaceholderText(site.saleDatesPlaceholder);

  return (
    <section className={`section--deep ${styles.section}`} aria-labelledby="permits-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <p className={`eyebrow ${styles.eyebrow}`}>{sk("Pre členov")}</p>
          <h2 id="permits-title">{sk("Predaj povolení")}</h2>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <IconCheck className={styles.factIcon} />
              <div>
                <dt>{sk("Kde")}</dt>
                <dd>{sk(site.saleAddress.replace(/\.$/, ""))}</dd>
              </div>
            </div>
            {!hideDates ? (
              <div className={styles.fact}>
                <IconCheck className={styles.factIcon} />
                <div>
                  <dt>{sk("Termíny 2027")}</dt>
                  <dd>{sk(site.saleDatesPlaceholder)}</dd>
                </div>
              </div>
            ) : null}
            <div className={styles.fact}>
              <IconCheck className={styles.factIcon} />
              <div>
                <dt>{sk("Členský príspevok")}</dt>
                <dd>{sk(site.memberFeeValue)}</dd>
              </div>
            </div>
          </dl>

          <a
            href={site.salePosterPdf.href}
            className={`btn btn--white ${styles.posterBtn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {sk(site.salePosterPdf.label)}
          </a>

          <div className={styles.saleRow}>
            <div>
              <p className={styles.saleRole}>{sk("Predaj povolení")}</p>
              <p className={styles.saleName}>{sk(site.saleContact.name)}</p>
            </div>
            <a
              href={toTelHref(site.saleContact.phone)}
              className={`btn btn--white tel`}
            >
              {site.saleContact.phone}
            </a>
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
            <Link href="/povolenia" className={styles.fullLink}>
              {sk("Celý cenník vrátane detí a mládeže →")}
            </Link>
          </aside>

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
        </div>
      </div>
    </section>
  );
}
