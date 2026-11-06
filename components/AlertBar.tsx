import Link from "next/link";
import { getLatestNotice } from "@/content/site";
import styles from "./AlertBar.module.css";

export function AlertBar() {
  const notice = getLatestNotice();
  if (!notice) return null;

  return (
    <div className={styles.bar} role="status">
      <div className={`container ${styles.inner}`}>
        <span className={styles.dot} aria-hidden="true" />
        <p className={styles.text}>
          Oznam {notice.dateLabel}: Informácie k predaju povolení na rok 2027 —{" "}
          <Link href={notice.href} className={styles.link}>
            Prečítať →
          </Link>
        </p>
      </div>
    </div>
  );
}
