import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import styles from "./HatcherySection.module.css";

export function HatcherySection() {
  const { image } = site.hatchery;

  return (
    <section className={`section ${styles.section}`} aria-labelledby="hatchery-title">
      <div className={`container ${styles.grid}`}>
        <figure className={styles.figure}>
          <div className={styles.media}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 899px) 100vw, 50vw"
              loading="lazy"
              className={styles.image}
              style={{ objectPosition: image.objectPosition ?? "center" }}
            />
          </div>
          {image.caption ? (
            <figcaption className={styles.caption}>{image.caption}</figcaption>
          ) : null}
        </figure>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>{site.hatchery.eyebrow}</p>
          <h2 id="hatchery-title">{site.hatchery.title}</h2>
          <p className={styles.text}>{site.hatchery.text}</p>
          <Link href="/liahen" className={styles.link}>
            Príbeh liahne →
          </Link>
        </div>
      </div>
    </section>
  );
}
