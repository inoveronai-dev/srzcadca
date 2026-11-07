import type { Metadata } from "next";
import { CategoryListPage } from "@/components/CategoryListPage";

export const metadata: Metadata = {
  title: "Výbor a kontrolná komisia",
  description: "Informácie výboru a kontrolnej komisie MO Čadca.",
};

export default function Page() {
  return (
    <CategoryListPage
      title="Výbor a kontrolná komisia"
      description="Informácie výboru a kontrolnej komisie MO Čadca."
      category="vybor"
      crumbsLabel="Výbor a kontrolná komisia"
    />
  );
}
