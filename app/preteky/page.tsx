import type { Metadata } from "next";
import { DateBadgeList } from "@/components/DateBadgeList";
import { PageShell } from "@/components/PageShell";
import { getArticlesByCategory, groupArticlesByYear } from "@/lib/content";
import { sk } from "@/lib/sk";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Preteky",
  description:
    "Pozvánky a výsledky pretekov MO Čadca – detské, muškárske, CCM a ďalšie.",
};

export default function PretekyPage() {
  const years = groupArticlesByYear(getArticlesByCategory("preteky"));

  return (
    <PageShell title={sk("Preteky")} wide crumbs={[{ label: sk("Preteky") }]}>
      {years.map(({ year, articles }) => (
        <section key={year} className={styles.year}>
          <h2 className={styles.yearTitle}>{year}</h2>
          <DateBadgeList articles={articles} />
        </section>
      ))}
      {!years.length ? (
        <p className={styles.empty}>{sk("Zatiaľ žiadne príspevky o pretekoch.")}</p>
      ) : null}
    </PageShell>
  );
}
