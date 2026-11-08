import Link from "next/link";
import { site } from "@/content/site";
import { sk } from "@/lib/sk";

/** Shared Termíny 2027 value: concrete dates, or notice with link to /novinky. */
export function SaleDatesValue({
  className,
  linkClassName,
}: {
  className?: string;
  linkClassName?: string;
}) {
  const dates = site.saleDates?.trim();
  if (dates) {
    return <span className={className}>{sk(dates)}</span>;
  }

  return (
    <span className={className}>
      {sk("Termíny predaja zverejníme")}{" "}
      <Link href="/novinky" className={linkClassName}>
        {sk("v novinkách")}
      </Link>
      .
    </span>
  );
}
