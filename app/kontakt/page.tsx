import type { Metadata } from "next";
import { committeeContacts, site, toTelHref, wardens } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default function ContactPage() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h1>Kontakt</h1>
        <div className={styles.top}>
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
          <div className={styles.mapPlaceholder}>Mapa – Rybársky dom (doplniť)</div>
        </div>

        <h2>Výbor a predaj povolení</h2>
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
                  {person.email}
                </a>
              ) : null}
            </div>
          ))}
        </div>

        <h2 className={styles.wardensTitle}>Hospodári všetkých revírov (15)</h2>
        <div className={styles.wardens}>
          {wardens.map((warden) => (
            <article key={warden.area} className={styles.warden}>
              <h3>{warden.area}</h3>
              <p>{warden.name}</p>
              {warden.phone ? (
                <p>
                  <a href={toTelHref(warden.phone)}>
                    {warden.phone.length === 9
                      ? warden.phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")
                      : warden.phone}
                  </a>
                  {warden.phoneNote ? (
                    <>
                      {" "}
                      <span className={styles.note}>{warden.phoneNote}</span>
                    </>
                  ) : null}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
