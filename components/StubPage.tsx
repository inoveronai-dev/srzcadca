import styles from "./StubPage.module.css";

export function StubPage({ title }: { title: string }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <h1>{title}</h1>
        <p className={styles.text}>Táto stránka sa pripravuje.</p>
      </div>
    </section>
  );
}
