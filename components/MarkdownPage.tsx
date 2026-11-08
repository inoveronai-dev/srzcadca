import { PageShell } from "@/components/PageShell";
import { getPage } from "@/lib/content";
import styles from "@/app/novinky/[slug]/page.module.css";

export function MarkdownPage({
  slug,
  fallbackTitle,
  crumbsLabel,
  wide = false,
}: {
  slug: string;
  fallbackTitle: string;
  crumbsLabel: string;
  wide?: boolean;
}) {
  const page = getPage(slug);
  const title = page?.title || fallbackTitle;
  return (
    <PageShell title={title} wide={wide} crumbs={[{ label: crumbsLabel }]}>
      {page ? (
        <>
          <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
          {page.attachments?.length ? (
            <aside className={styles.attachments}>
              <h2>Prílohy na stiahnutie</h2>
              <ul>
                {page.attachments.map((a) => (
                  <li key={a.url}>
                    <a href={a.url}>
                      <span className={styles.fileType}>{a.type || "SÚBOR"}</span>
                      <span>{a.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </>
      ) : (
        <p>
          Obsah stránky sa ešte importuje. Spustite{" "}
          <code>node scripts/import-wp.mjs</code>.
        </p>
      )}
    </PageShell>
  );
}
