import type { Metadata } from "next";
import Link from "next/link";
import { DateBadgeList } from "@/components/DateBadgeList";
import { PageShell } from "@/components/PageShell";
import { toTelHref } from "@/content/site";
import { getArticlesByCategory, groupArticlesByYear } from "@/lib/content";
import { sk } from "@/lib/sk";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Brigády",
  description: "Plán brigád a prihlasovanie na termíny – SRZ MO Čadca.",
};

const plan = [
  {
    title: "Rakovka a chovné potoky smer Zákopčie",
    contact: "Miroslav Kovalíček",
    phone: "0903 488 749",
  },
  {
    title: "VN Milošová",
    contact: "Milan Krkoška ml.",
    phone: "0907 633 033",
  },
  {
    title: "Milošovský potok",
    contact: "Milan Krkoška ml.",
    phone: "0907 633 033",
  },
  {
    title: "Liaheň Rieka",
    contact: "Milan Krkoška ml.",
    phone: "0907 633 033",
  },
];

export default function BrigadyPage() {
  const years = groupArticlesByYear(getArticlesByCategory("brigady"));

  return (
    <PageShell title={sk("Brigády")} wide crumbs={[{ label: sk("Brigády") }]}>
      <div className={styles.intro}>
        <p>
          <strong>{sk("Neodpracovaná brigáda: 100 €")}</strong>
        </p>
        <p>
          {sk(
            "Pri poukázaní aspoň 100 € z 2 % dane sa brigáda považuje za odpracovanú.",
          )}
        </p>
      </div>

      <h2 className={styles.h2}>{sk("Plán brigád pre rok 2026")}</h2>
      <div className={styles.cards}>
        {plan.map((item) => (
          <article key={item.title} className={styles.card}>
            <h3>{sk(item.title)}</h3>
            <p>
              {sk(
                "Podrobný zoznam úloh a „Čo si priniesť“ nájdete v článku Plán brigád pre rok 2026.",
              )}
            </p>
            <a href={toTelHref(item.phone)} className="btn btn--teal tel">
              {item.contact}: {item.phone}
            </a>
          </article>
        ))}
      </div>

      <p className={styles.form}>
        <Link href="/tlaciva">{sk("Tlačivo pre záznam o vykonanej brigáde →")}</Link>
      </p>

      <h2 className={styles.h2}>{sk("Novinky – brigády")}</h2>
      {years.map(({ year, articles }) => (
        <section key={year} className={styles.year}>
          <h3 className={styles.yearTitle}>{year}</h3>
          <DateBadgeList articles={articles} />
        </section>
      ))}
      {!years.length ? (
        <p className={styles.empty}>{sk("Zatiaľ žiadne príspevky o brigádach.")}</p>
      ) : null}
    </PageShell>
  );
}
