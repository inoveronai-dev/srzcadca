import styles from "./MapEmbed.module.css";

const EMBED_SRC =
  "https://www.google.com/maps?q=Horn%C3%A1+1108%2F35%2C+022+01+%C4%8Cadca&z=16&output=embed";

export function MapEmbed({ fill = false }: { fill?: boolean }) {
  return (
    <div className={`${styles.wrap} ${fill ? styles.fill : ""}`}>
      <iframe
        title="Mapa – Rybársky dom, Horná 1108/35, Čadca"
        src={EMBED_SRC}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className={styles.frame}
      />
    </div>
  );
}
