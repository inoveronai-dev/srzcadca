import type { Metadata } from "next";
import Link from "next/link";
import { IconCheck } from "@/components/Icons";
import { SaleDatesValue } from "@/components/SaleDatesValue";
import { permitPrices, site, toTelHref } from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Povolenia a cenník",
  description:
    "Predaj povolení, cenník a informácie pre členov SRZ MO Čadca.",
};

export default function PermitsPage() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <p className={`eyebrow ${styles.eyebrow}`}>Pre členov</p>
        <h1>Povolenia a cenník</h1>
        <p className={styles.lead}>{site.saleAddress}</p>
        <p className={styles.dates}>
          {sk("Termíny 2027:")}{" "}
          <SaleDatesValue linkClassName={styles.datesLink} />
        </p>
        <p className={styles.dates}>
          <a
            href={site.salePosterPdf.href}
            className={`btn btn--white ${styles.posterBtn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {sk(site.salePosterPdf.label)}
          </a>
        </p>
        <p className={styles.dates}>{site.memberFeeDeadline}</p>

        <div className={styles.grid}>
          <div className={styles.checklist}>
            <h2>Čo si priniesť</h2>
            <ul>
              {site.saleChecklist.map((item) => (
                <li key={item}>
                  <IconCheck />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/tlaciva">Stiahnuť tlačivá →</Link>
            <p>
              Otázky k predaju: {site.saleContact.name} –{" "}
              <a href={toTelHref(site.saleContact.phone)} className="tel">
                {site.saleContact.phone}
              </a>
            </p>
          </div>

          <div className={styles.tableCard}>
            <div className={styles.tableHead}>
              <h2>Cenník 2026</h2>
              <p className={styles.verify}>[Overiť ceny na rok 2027]</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Položka</th>
                  <th scope="col">Cena</th>
                </tr>
              </thead>
              <tbody>
                {permitPrices.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
