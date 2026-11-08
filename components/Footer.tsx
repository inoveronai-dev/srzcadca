import Image from "next/image";
import Link from "next/link";
import { footerColumns, site, toTelHref } from "@/content/site";
import { sk } from "@/lib/sk";
import styles from "./Footer.module.css";

function FooterLinksColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h2 className={styles.colTitle}>{sk(title)}</h2>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {sk(link.label)} →
              </a>
            ) : (
              <Link href={link.href}>{sk(link.label)}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const supportIndex = footerColumns.findIndex((c) => c.title === "Podporte nás");
  const beforeSupport =
    supportIndex === -1 ? footerColumns : footerColumns.slice(0, supportIndex);
  const support = supportIndex === -1 ? null : footerColumns[supportIndex];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Image
            src="/images/logo/odznak-1945.png"
            alt={sk(
              "Odznak Slovenský rybársky zväz, Miestna organizácia Čadca, 1945",
            )}
            width={400}
            height={400}
            className={styles.badge}
          />
          <p className={styles.brandText}>
            <span className={styles.brandLine}>{sk("Slovenský rybársky zväz")}</span>
            <span className={styles.brandLine}>
              {sk("Miestna organizácia Čadca")}
            </span>
          </p>
        </div>

        {beforeSupport.map((column) => (
          <FooterLinksColumn
            key={column.title}
            title={column.title}
            links={column.links}
          />
        ))}

        <div>
          <h2 className={styles.colTitle}>{sk("Kontakt")}</h2>
          <div className={styles.contactBlock}>
            {site.footerContactAddressLines.map((line) => (
              <p key={line}>{sk(line)}</p>
            ))}
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className={styles.saleLabel}>{sk("Predaj povolení:")}</p>
            <p>
              <a
                href={toTelHref(site.saleContact.phone)}
                className="tel"
              >
                {site.saleContact.phone}
              </a>
            </p>
          </div>
        </div>

        {support ? (
          <FooterLinksColumn title={support.title} links={support.links} />
        ) : null}
      </div>

      <div className={styles.bottom}>
        <div className="container">
          © SRZ MO Čadca ·{" "}
          <Link href="/zasady-cookies">{sk("Zásady cookies")}</Link>
        </div>
      </div>
    </footer>
  );
}
