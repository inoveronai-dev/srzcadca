import Link from "next/link";
import { quickTiles } from "@/content/site";
import {
  IconNews,
  IconPermits,
  IconTrophy,
  IconWork,
} from "@/components/Icons";
import { sk } from "@/lib/sk";
import styles from "./QuickTiles.module.css";

const icons = {
  news: IconNews,
  work: IconWork,
  trophy: IconTrophy,
  permits: IconPermits,
};

export function QuickTiles() {
  return (
    <section className={styles.section} aria-label="Rýchle odkazy">
      <div className={`container ${styles.grid}`}>
        {quickTiles.map((tile) => {
          const Icon = icons[tile.icon];
          return (
            <Link key={tile.href} href={tile.href} className={styles.card}>
              <span className={styles.icon}>
                <Icon />
              </span>
              <p className={styles.title}>{sk(tile.title)}</p>
              <p className={styles.text}>{sk(tile.text)}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
