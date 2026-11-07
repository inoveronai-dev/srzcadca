import type { Metadata } from "next";
import { CategoryListPage } from "@/components/CategoryListPage";

export const metadata: Metadata = {
  title: "Zarybňovanie revírov",
  description: "Informácie o zarybňovaní revírov MO Čadca.",
};

export default function Page() {
  return (
    <CategoryListPage
      title="Zarybňovanie revírov"
      description="Informácie o zarybňovaní revírov MO Čadca."
      category="zarybnovanie"
      crumbsLabel="Zarybňovanie"
    />
  );
}
