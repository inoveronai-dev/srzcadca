import Link from "next/link";
import { AddressCard } from "@/components/AddressCard";
import { MapEmbed } from "@/components/MapEmbed";
import { committeeContacts, site, toTelHref } from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <section
      className={`section section--white ${styles.section}`}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className={styles.intro}>
          <h2 id="contact-title">{sk("Kontakt")}</h2>
          <p className={styles.subtitle}>{sk(site.contactOrgLine)}</p>
        </div>

        <div className={styles.lower}>
          <div className={styles.left}>
            <AddressCard />
            <MapEmbed fill />
          </div>

          <div className={styles.contacts}>
            {committeeContacts.map((person) => (
              <div key={person.role} className={styles.row}>
                <div>
                  <p className={styles.role}>{sk(person.role)}</p>
                  <p className={styles.name}>{sk(person.name)}</p>
                </div>
                {person.phone ? (
                  <a
                    href={toTelHref(person.phone)}
                    className="btn btn--teal tel"
                  >
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
      </div>
    </section>
  );
}
