import { redirect } from "next/navigation";

export default async function AktualityRedirect({
  searchParams,
}: {
  searchParams: Promise<{ kategoria?: string; strana?: string }>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams();
  if (sp.kategoria) params.set("kategoria", sp.kategoria);
  if (sp.strana) params.set("strana", sp.strana);
  const q = params.toString();
  redirect(q ? `/novinky?${q}` : "/novinky");
}
