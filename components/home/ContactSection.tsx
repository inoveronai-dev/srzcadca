import Link from "next/link";
import { committeeContacts, site, toTelHref } from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section
      className={`section section--white ${styles.section}`}
      aria-labelledby="contact-title"
    >
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="contact-title">{sk("Kontakt")}</h2>
          <address className={styles.address}>
            {site.addressLines.map((line) => (
              <span key={line}>
                {sk(line)}
                <br />
              </span>
            ))}
          </address>
          <div className={styles.addressCard}>
            <p className={`eyebrow ${styles.cardEyebrow}`}>{sk("Rybársky dom")}</p>
            <p className={styles.cardAddress}>{sk(site.contactCardAddress)}</p>
            <div className={styles.cardActions}>
              <a
                href={site.mapsSearchUrl}
                className="btn btn--white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {sk("Navigovať")}
              </a>
              <a
                href={`mailto:${site.email}`}
                className={`btn btn--outline-white ${styles.mailBtn}`}
              >
                {sk("Napísať e-mail")}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.contacts}>
          {committeeContacts.map((person) => (
            <div key={person.role} className={styles.row}>
              <div>
                <p className={styles.role}>{sk(person.role)}</p>
                <p className={styles.name}>{sk(person.name)}</p>
              </div>
              {person.phone ? (
                <a href={toTelHref(person.phone)} className="btn btn--teal">
                  {person.phone}
                </a>
              ) : person.email ? (
                <a href={`mailto:${person.email}`} className="btn btn--teal">
                  {sk("Napísať e-mail")}
                </a>
              ) : null}
            </div>
          ))}
          <Link href="/kontakt" className={styles.wardensLink}>
            {sk("Hospodári všetkých revírov (15) →")}
          </Link>
        </div>
      </div>
    </section>
  );
}
