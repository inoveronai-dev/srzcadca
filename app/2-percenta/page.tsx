import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { getPage } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "2 % dane",
  description:
    "Poukážte 2 % dane v prospech SRZ MO Čadca – benefity za 100 €, 300 € a 400 €.",
};

const benefits = [
  {
    amount: "100 €",
    text: "brigáda sa považuje za odpracovanú",
  },
  {
    amount: "300 €",
    text: "miestne kaprové povolenie",
  },
  {
    amount: "400 €",
    text: "miestne + zväzové kaprové povolenie",
  },
];

export default function TwoPercentPage() {
  const page = getPage("2-dani");
  return (
    <PageShell title="2 % dane" crumbs={[{ label: "2 % dane" }]}>
      <div className={styles.cards}>
        {benefits.map((b) => (
          <article key={b.amount} className={styles.card}>
            <h2>{b.amount}</h2>
            <p>{b.text}</p>
          </article>
        ))}
      </div>
      {page ? (
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
      ) : (
        <p>Text stránky sa doplní po importe z WordPressu (/2-dani/).</p>
      )}
    </PageShell>
  );
}
