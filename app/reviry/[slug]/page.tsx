import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { waters, toTelHref } from "@/content/site";
import { waterSlugs } from "@/content/waters-detail";
import { getPortfolio } from "@/lib/content";
import styles from "./page.module.css";

export function generateStaticParams() {
  return waterSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const water = waters.find((w) => w.href?.endsWith(slug));
  const portfolio = getPortfolio(slug);
  const title = water?.name || portfolio?.title || "Revír";
  return {
    title,
    description: water?.description || `Revír ${title} – SRZ MO Čadca`,
  };
}

export default async function WaterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!waterSlugs.includes(slug as (typeof waterSlugs)[number])) notFound();
  const water = waters.find((w) => w.href?.endsWith(`/${slug}`));
  const portfolio = getPortfolio(slug);
  const title = water?.name || portfolio?.title || slug;

  return (
    <PageShell
      title={title}
      wide
      crumbs={[
        { label: "Revíry", href: "/reviry" },
        { label: title },
      ]}
    >
      {water?.photo ? (
        <div className={styles.hero}>
          <Image
            src={water.photo.src}
            alt={water.photo.alt}
            width={water.photo.width}
            height={water.photo.height}
            sizes="(max-width: 1100px) 100vw, 1100px"
            className={styles.heroImage}
            priority
          />
        </div>
      ) : null}

      <div className={styles.facts}>
        {water ? (
          <>
            <p>
              <span className={styles.label}>
                {water.numberLabel === "useky" ? "Počet úsekov" : "Revír č."}
              </span>
              <span className={styles.mono}>{water.number}</span>
            </p>
            <p>
              <span className={styles.label}>Typ</span>
              <span className="chip chip--rybari">{water.type}</span>
            </p>
            <p>
              <span className={styles.label}>Hospodár</span>
              {water.wardenPhone ? (
                <a href={toTelHref(water.wardenPhone)}>
                  {water.wardenName}, {water.wardenPhone}
                </a>
              ) : (
                <span>{water.wardenName}</span>
              )}
            </p>
            <p className={styles.desc}>{water.description}</p>
          </>
        ) : null}
      </div>

      {slug === "vn-milosova" ? (
        <aside className={styles.note} role="note">
          <strong>Vjazd vozidlom:</strong> platné pravidlá k vjazdu k VN Milošová nájdete
          v aktualite „Vjazd vozidlom k VN Milošová“.
        </aside>
      ) : null}

      {portfolio ? (
        <div className="prose" dangerouslySetInnerHTML={{ __html: portfolio.html }} />
      ) : (
        <p className={styles.pending}>
          Podrobný text revíru sa doplní po dokončení importu z WordPressu.
        </p>
      )}
    </PageShell>
  );
}
