import type { Metadata } from "next";
import { PermitsSection } from "@/components/home/PermitsSection";
import { permitPrices } from "@/content/site";
import { sk } from "@/lib/sk";
import { hidePlaceholders, isPlaceholderText } from "@/lib/placeholders";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Povolenia a cenník",
  description:
    "Predaj povolení, cenník a informácie pre členov SRZ MO Čadca.",
};

export default function PermitsPage() {
  const hideVerify =
    hidePlaceholders() && isPlaceholderText("[Overiť ceny na rok 2027]");

  return (
    <>
      <PermitsSection showFullPriceLink={false} />

      <section className={`section ${styles.section}`} id="cennik">
        <div className="container">
          <div className={styles.tableCard}>
            <div className={styles.tableHead}>
              <h2>{sk("Cenník 2026")}</h2>
              {!hideVerify ? (
                <p className={styles.verify}>[Overiť ceny na rok 2027]</p>
              ) : null}
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">{sk("Položka")}</th>
                  <th scope="col">{sk("Cena")}</th>
                </tr>
              </thead>
              <tbody>
                {permitPrices.map((row) => (
                  <tr key={row.name}>
                    <td>{sk(row.name)}</td>
                    <td>{sk(row.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
