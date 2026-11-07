import type { Metadata } from "next";
import { CategoryListPage } from "@/components/CategoryListPage";

export const metadata: Metadata = {
  title: "Členská schôdza",
  description: "Zápisy a informácie z členských schôdzí MO Čadca.",
};

export default function Page() {
  return (
    <CategoryListPage
      title="Členská schôdza"
      description="Zápisy a informácie z členských schôdzí MO Čadca."
      category="schodza"
      crumbsLabel="Členská schôdza"
    />
  );
}
