import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { PageShell } from "@/components/PageShell";
import { site } from "@/content/site";
import { getArticlesByCategory, getPage } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Rybársky krúžok",
  description:
    "Rybársky krúžok pre deti od 6 do 14 rokov pri Miestnej organizácii SRZ Čadca.",
};

export default function KruzokPage() {
  const articles = getArticlesByCategory("kruzok");
  const page = getPage("rybarsky-kruzok");
  const collage = site.clubAndRaces.collage;

  return (
    <PageShell title="Rybársky krúžok" wide crumbs={[{ label: "Rybársky krúžok" }]}>
      <p className={styles.lead}>
        Krúžok je pre deti od 6 do 14 rokov.
      </p>
      <p>
        <a
          href="https://www.srzrada.sk/wp-content/uploads/srzrada/rada_srz/tlaciva/tlaciva-prihlaska-do-kruzku-deti.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prihláška do krúžku detí (PDF na srzrada.sk) →
        </a>
      </p>
      <p className={styles.placeholder}>
        [doplniť: kedy a kde sa stretáva, kontakt na vedúceho]
      </p>

      <figure className={styles.collage}>
        <Image
          src={collage.src}
          alt={collage.alt}
          width={collage.width}
          height={collage.height}
          sizes="(max-width: 1240px) 100vw, 1240px"
          className={styles.collageImage}
        />
        <figcaption>{collage.caption}</figcaption>
      </figure>

      {page ? (
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
      ) : null}

      <p>
        <Link href="/tlaciva">Tlačivá →</Link>
      </p>

      <h2 className={styles.h2}>Aktuality krúžku</h2>
      <div className={styles.grid}>
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </PageShell>
  );
}
