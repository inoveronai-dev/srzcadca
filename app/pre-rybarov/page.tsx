import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { mainNav } from "@/content/site";

export const metadata: Metadata = {
  title: "Pre rybárov",
  description: "Informácie pre rybárov – poriadok, legislatíva, tlačivá a organizácia.",
};

export default function Page() {
  const item = mainNav.find((n) => n.label === "Pre rybárov");
  return (
    <PageShell title="Pre rybárov" crumbs={[{ label: "Pre rybárov" }]}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
        {(item?.children || []).map((c) => (
          <li key={c.href}>
            <Link href={c.href} style={{ fontWeight: 700, fontSize: 18, textDecoration: "none" }}>
              {c.label} →
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
