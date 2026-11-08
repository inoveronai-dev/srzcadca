import { site } from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./AddressCard.module.css";

export function AddressCard() {
  return (
    <div className={styles.card}>
      <p className={`eyebrow ${styles.eyebrow}`}>{sk("Rybársky dom")}</p>
      <p className={styles.address}>{sk(site.contactCardAddress)}</p>
      <div className={styles.actions}>
        <a
          href={site.mapsSearchUrl}
          className="btn btn--white"
          target="_blank"
          rel="noopener noreferrer"
        >
          {sk("Navigovať")}
        </a>
        <a
          href={`mailto:${site.email}`}
          className={`btn btn--outline-white ${styles.mailBtn}`}
        >
          {sk("Napísať e-mail")}
        </a>
      </div>
    </div>
  );
}
