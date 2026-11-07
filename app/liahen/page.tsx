import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "Liaheň Rieka Čadca",
  description: "Liaheň Rieka Čadca – história, obnova a chov pstruha.",
};

export default function Page() {
  return (
    <MarkdownPage
      slug="liahen-rieka-2"
      fallbackTitle="Liaheň Rieka Čadca"
      crumbsLabel="Liaheň Rieka Čadca"
    />
  );
}
