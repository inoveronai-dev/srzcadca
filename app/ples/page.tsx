import type { Metadata } from "next";
import { CategoryListPage } from "@/components/CategoryListPage";

export const metadata: Metadata = {
  title: "Rybársky ples",
  description: "Pozvánky a správy o rybárskom plese.",
};

export default function Page() {
  return (
    <CategoryListPage
      title="Rybársky ples"
      description="Pozvánky a správy o rybárskom plese."
      category="ples"
      crumbsLabel="Rybársky ples"
    />
  );
}
