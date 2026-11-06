import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Image
          src={site.hero.image}
          alt={site.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.gradient} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>{site.hero.eyebrow}</p>
        <h1 id="hero-title">{site.hero.title}</h1>
        <p className={styles.text}>{site.hero.text}</p>
        <div className={styles.actions}>
          <Link href="/povolenia" className="btn btn--white">
            Povolenia a cenník
          </Link>
          <Link href="/reviry" className={`btn btn--outline-white ${styles.secondary}`}>
            Naše revíry
          </Link>
        </div>
      </div>

      <svg
        className={styles.hills}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="var(--deep-3)"
          d="M0 72c120-28 240-52 360-44s240 40 360 44 240-20 360-36 240-20 360-8v92H0Z"
        />
        <path
          fill="var(--deep-2)"
          d="M0 86c140-24 260-40 400-28s260 36 400 28 260-36 400-40 160 0 240 8v66H0Z"
        />
        <path
          fill="var(--teal-logo)"
          fillOpacity="0.35"
          d="M0 98c160-18 280-28 420-18s260 28 400 20 260-28 400-24 140 8 220 12v32H0Z"
        />
        <path fill="var(--deep)" d="M0 108c180-10 320-18 480-10s300 20 480 14 300-16 480-8v16H0Z" />
      </svg>
    </section>
  );
}
