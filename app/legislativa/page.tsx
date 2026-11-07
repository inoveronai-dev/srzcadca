import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "Legislatíva",
  description: "Rybárske poriadky, smernice, zákony a stanovy.",
};

export default function Page() {
  return (
    <MarkdownPage
      slug="legislativa"
      fallbackTitle="Legislatíva"
      crumbsLabel="Legislatíva"
    />
  );
}
