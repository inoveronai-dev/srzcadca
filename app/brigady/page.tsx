import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { PageShell } from "@/components/PageShell";
import { toTelHref } from "@/content/site";
import { getArticlesByCategory } from "@/lib/content";
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
  const articles = getArticlesByCategory("brigady");
  return (
    <PageShell title="Brigády" wide crumbs={[{ label: "Brigády" }]}>
      <div className={styles.intro}>
        <p>
          <strong>Neodpracovaná brigáda: 100 €</strong>
        </p>
        <p>
          Pri poukázaní aspoň 100 € z 2 % dane sa brigáda považuje za odpracovanú.
        </p>
      </div>

      <h2 className={styles.h2}>Plán brigád pre rok 2026</h2>
      <div className={styles.cards}>
        {plan.map((item) => (
          <article key={item.title} className={styles.card}>
            <h3>{item.title}</h3>
            <p>
              Podrobný zoznam úloh a „Čo si priniesť“ nájdete v článku Plán brigád
              pre rok 2026.
            </p>
            <a href={toTelHref(item.phone)} className="btn btn--teal tel">
              {item.contact}: {item.phone}
            </a>
          </article>
        ))}
      </div>

      <p className={styles.form}>
        <Link href="/tlaciva">Tlačivo pre záznam o vykonanej brigáde →</Link>
      </p>

      <h2 className={styles.h2}>Aktuality – brigády</h2>
      <div className={styles.grid}>
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </PageShell>
  );
}
