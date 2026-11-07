import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "Tlačivá",
  description: "Tlačivá pre členov MO Čadca.",
};

export default function Page() {
  return (
    <MarkdownPage
      slug="tlaciva"
      fallbackTitle="Tlačivá"
      crumbsLabel="Tlačivá"
    />
  );
}
