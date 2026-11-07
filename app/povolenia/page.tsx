import type { Metadata } from "next";
import Link from "next/link";
import { IconCheck } from "@/components/Icons";
import { permitPrices, site, toTelHref } from "@/content/site";
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
          Termíny predaja na rok 2027: {site.saleDatesPlaceholder}
        </p>
        <p className={styles.dates}>
          <a href={site.salePosterPdf.href}>{site.salePosterPdf.label}</a>
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
              <a href={toTelHref(site.saleContact.phone)}>{site.saleContact.phone}</a>
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
