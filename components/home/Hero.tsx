import Image from "next/image";
import { site } from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./Hero.module.css";

const NBSP = "\u00A0";

function preventLastOrphan(text: string): string {
  const t = sk(text);
  return t.replace(/\s+(\S+)\s*$/u, `${NBSP}$1`);
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Image
          src={site.hero.image}
          alt={sk(site.hero.imageAlt)}
          fill
          priority
          quality={85}
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.gradient} aria-hidden="true" />
        <div className={styles.sideGradient} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>{sk(site.hero.eyebrow)}</p>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}>{sk("Staráme sa")}</span>
          <span className={styles.line}>
            {["o", "kysucké", "vody"].map((w, i) => (
              <span key={w}>
                {i > 0 ? NBSP : null}
                {sk(w)}
              </span>
            ))}
          </span>
        </h1>
        <p className={styles.text}>{preventLastOrphan(site.hero.text)}</p>
      </div>

      <svg
        className={styles.hills}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="var(--paper)"
          d="M0 80 C 360 20 1080 20 1440 70 L1440 120 L0 120 Z"
        />
      </svg>
    </section>
  );
}
