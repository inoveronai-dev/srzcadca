import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./HatcherySection.module.css";

export function HatcherySection() {
  const { image } = site.hatchery;

  return (
    <section
      className={`section section--paper section--tight-bottom ${styles.section}`}
      aria-labelledby="hatchery-title"
    >
      <div className={`container ${styles.grid}`}>
        <figure className={styles.figure}>
          <div className={styles.media}>
            <Image
              src={image.src}
              alt={sk(image.alt)}
              width={image.width}
              height={image.height}
              sizes="(max-width: 899px) 100vw, 50vw"
              loading="lazy"
              className={styles.image}
              style={{ objectPosition: image.objectPosition ?? "center" }}
            />
          </div>
          {image.caption ? (
            <figcaption className={styles.caption}>{sk(image.caption)}</figcaption>
          ) : null}
        </figure>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>{sk(site.hatchery.eyebrow)}</p>
          <h2 id="hatchery-title">{sk(site.hatchery.title)}</h2>
          <p className={styles.text}>{sk(site.hatchery.text)}</p>
          <Link href="/liahen" className={styles.link}>
            {sk("Príbeh liahne →")}
          </Link>
        </div>
      </div>
    </section>
  );
}
