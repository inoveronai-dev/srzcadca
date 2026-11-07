import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "Miestny poriadok",
  description: "Miestny rybársky poriadok MO Čadca.",
};

export default function Page() {
  return (
    <MarkdownPage
      slug="miestny-rybarsky-poriadok"
      fallbackTitle="Miestny poriadok"
      crumbsLabel="Miestny poriadok"
    />
  );
}
