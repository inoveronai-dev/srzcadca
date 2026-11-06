import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import styles from "./ClubRacesSection.module.css";

export function ClubRacesSection() {
  const { collage, poster, clubPlaceholder, races } = site.clubAndRaces;

  return (
    <section className={`section ${styles.section}`} aria-labelledby="club-races-title">
      <div className="container">
        <h2 id="club-races-title" className="visually-hidden">
          Krúžok a preteky
        </h2>

        <figure className={styles.collage}>
          <Image
            src={collage.src}
            alt={collage.alt}
            width={collage.width}
            height={collage.height}
            sizes="(max-width: 1240px) 100vw, 1240px"
            loading="lazy"
            className={styles.collageImage}
          />
          <figcaption className={styles.caption}>{collage.caption}</figcaption>
        </figure>

        <div className={styles.grid}>
          <article className={styles.club}>
            <h3>Rybársky krúžok</h3>
            <p>{clubPlaceholder}</p>
            <Link href="/kruzok">Viac o krúžku →</Link>
          </article>
          <article className={styles.races}>
            <div className={styles.racesContent}>
              <h3>Preteky</h3>
              <ul>
                {races.map((race) => (
                  <li key={race}>{race}</li>
                ))}
              </ul>
              <Link href="/preteky">Pozvánky a výsledky →</Link>
            </div>
            <Link href={poster.href} className={styles.posterLink}>
              <Image
                src={poster.src}
                alt={poster.alt}
                width={poster.width}
                height={poster.height}
                sizes="(max-width: 699px) min(100vw, 320px), 220px"
                loading="lazy"
                className={styles.poster}
              />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
