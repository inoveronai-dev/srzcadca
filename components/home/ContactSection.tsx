import Link from "next/link";
import { committeeContacts, site, toTelHref } from "@/content/site";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="contact-title">Kontakt</h2>
          <address className={styles.address}>
            {site.addressLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <div className={styles.mapPlaceholder} role="img" aria-label="Mapa – Rybársky dom">
            Mapa – Rybársky dom (doplniť)
          </div>
        </div>

        <div className={styles.contacts}>
          {committeeContacts.map((person) => (
            <div key={person.role} className={styles.row}>
              <div>
                <p className={styles.role}>{person.role}</p>
                <p className={styles.name}>{person.name}</p>
              </div>
              {person.phone ? (
                <a href={toTelHref(person.phone)} className="btn btn--teal">
                  {person.phone}
                </a>
              ) : person.email ? (
                <a href={`mailto:${person.email}`} className="btn btn--teal">
                  Napísať e-mail
                </a>
              ) : null}
            </div>
          ))}
          <Link href="/kontakt" className={styles.wardensLink}>
            Hospodári všetkých revírov (15) →
          </Link>
        </div>
      </div>
    </section>
  );
}
