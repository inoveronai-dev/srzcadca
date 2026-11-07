import Link from "next/link";
import styles from "./PageShell.module.css";

export type Crumb = { label: string; href?: string };

export function PageShell({
  title,
  eyebrow,
  crumbs,
  wide = false,
  children,
}: {
  title: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${wide ? styles.wide : styles.narrow}`}>
        {crumbs?.length ? (
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Domov</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        {eyebrow ? <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p> : null}
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
