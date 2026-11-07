import type { Metadata } from "next";
import { CategoryListPage } from "@/components/CategoryListPage";

export const metadata: Metadata = {
  title: "Straty a nálezy",
  description: "Straty a nálezy na revíroch MO Čadca.",
};

export default function Page() {
  return (
    <CategoryListPage
      title="Straty a nálezy"
      description="Straty a nálezy na revíroch MO Čadca."
      category="straty"
      crumbsLabel="Straty a nálezy"
    />
  );
}
