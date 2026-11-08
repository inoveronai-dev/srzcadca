import type { Metadata } from "next";
import { AddressCard } from "@/components/AddressCard";
import { MapEmbed } from "@/components/MapEmbed";
import { committeeContacts, site, toTelHref, wardens } from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kontakt",
};

export default function ContactPage() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h1>{sk("Kontakt")}</h1>
        <p className={styles.subtitle}>{sk(site.contactOrgLine)}</p>

        <div className={styles.lower}>
          <div className={styles.left}>
            <AddressCard />
            <MapEmbed fill />
          </div>

          <div className={styles.contacts}>
            <h2 className={styles.sideTitle}>{sk("Výbor a predaj povolení")}</h2>
            {committeeContacts.map((person) => (
              <div key={person.role} className={styles.row}>
                <div>
                  <p className={styles.role}>{sk(person.role)}</p>
                  <p className={styles.name}>{sk(person.name)}</p>
                </div>
                {person.phone ? (
                  <a href={toTelHref(person.phone)} className="btn btn--teal tel">
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
        </div>

        <h2 className={styles.wardensTitle}>{sk("Hospodári všetkých revírov (15)")}</h2>
        <div className={styles.wardens}>
          {wardens.map((warden) => (
            <article key={warden.area} className={styles.warden}>
              <h3>{sk(warden.area)}</h3>
              <p>{sk(warden.name)}</p>
              {warden.phone ? (
                <p>
                  <a href={toTelHref(warden.phone)} className="tel">
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
