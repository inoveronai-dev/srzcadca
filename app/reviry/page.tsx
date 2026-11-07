import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { WatersSection } from "@/components/home/WatersSection";
import { toTelHref } from "@/content/site";
import { waterGroups } from "@/content/waters-detail";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Revíry",
  description:
    "Kaprové, pstruhové a lipňové revíry Miestnej organizácie SRZ Čadca – čísla, popis a hospodári.",
};

export default function ReviryPage() {
  return (
    <>
      <PageShell title="Revíry" wide crumbs={[{ label: "Revíry" }]}>
        <p className={styles.intro}>
          Na každom revíri nájdete číslo revíru, platné povolenie, ryby a telefón na
          hospodára.
        </p>
      </PageShell>
      <WatersSection />
      <section className={`section ${styles.groups}`}>
        <div className="container">
          {waterGroups.map((group) => (
            <div key={group.title} className={styles.group}>
              <h2>{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div>
                      <strong>{item.name}</strong>
                      {item.number ? (
                        <span className={styles.num}> {item.number}</span>
                      ) : null}
                      {item.description ? <p>{item.description}</p> : null}
                    </div>
                    {item.wardenPhone ? (
                      <a href={toTelHref(item.wardenPhone)} className="btn btn--teal">
                        {item.wardenName}: {item.wardenPhone}
                      </a>
                    ) : item.wardenName ? (
                      <span className={styles.warden}>{item.wardenName}</span>
                    ) : null}
                    {item.href ? (
                      <Link href={item.href} className={styles.more}>
                        Detail →
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
