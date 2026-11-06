import Image from "next/image";
import Link from "next/link";
import { footerColumns, site } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Image
            src={site.logo.src}
            alt={site.logo.alt}
            width={88}
            height={88}
            className={styles.logo}
          />
          <p className={styles.brandText}>
            Slovenský rybársky zväz, Miestna organizácia Čadca
          </p>
        </div>

        <div className={styles.columns}>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className={styles.colTitle}>{column.title}</h2>
              <ul className={styles.links}>
                {column.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label} →
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          © SRZ MO Čadca ·{" "}
          <Link href="/zasady-cookies">Zásady cookies</Link>
        </div>
      </div>
    </footer>
  );
}
