import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { sk } from "@/lib/sk";
import { hidePlaceholders, isPlaceholderText } from "@/lib/placeholders";
import styles from "./ClubRacesSection.module.css";

export function ClubRacesSection() {
  const { collage, poster, clubText, clubMeetingPlaceholder, clubApplicationPdf } =
    site.clubAndRaces;
  const meeting =
    hidePlaceholders() && isPlaceholderText(clubMeetingPlaceholder)
      ? null
      : clubMeetingPlaceholder;

  return (
    <section
      className={`section section--paper section--continue ${styles.section}`}
      aria-labelledby="club-title"
    >
      <div className="container">
        <h2 id="club-title" className="visually-hidden">
          {sk("Rybársky krúžok")}
        </h2>

        <figure className={styles.collage}>
          <Image
            src={collage.src}
            alt={sk(collage.alt)}
            width={collage.width}
            height={collage.height}
            sizes="(max-width: 1240px) 100vw, 1240px"
            loading="lazy"
            className={styles.collageImage}
          />
          <figcaption className={styles.caption}>{sk(collage.caption)}</figcaption>
        </figure>

        <article className={styles.club}>
          <div className={styles.clubMain}>
            <div className={styles.clubTop}>
              <h3>{sk("Rybársky krúžok")}</h3>
              <p>{sk(clubText)}</p>
              {meeting ? <p>{sk(meeting)}</p> : null}
            </div>
            <div className={styles.clubActions}>
              <a
                href={clubApplicationPdf.href}
                className={`btn btn--white-outline ${styles.clubPdf}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {sk(clubApplicationPdf.label)}
              </a>
              <Link href="/kruzok" className={styles.clubMore}>
                {sk("Viac o krúžku →")}
              </Link>
            </div>
          </div>
          <Link href={poster.href} className={styles.posterLink}>
            <Image
              src={poster.src}
              alt={sk(poster.alt)}
              width={poster.width}
              height={poster.height}
              sizes="(max-width: 699px) min(100vw, 320px), 200px"
              loading="lazy"
              className={styles.poster}
            />
          </Link>
        </article>
      </div>
    </section>
  );
}
