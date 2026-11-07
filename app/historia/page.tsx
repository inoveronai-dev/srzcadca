import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "História",
  description: "História Miestnej organizácie SRZ Čadca.",
};

export default function Page() {
  return (
    <MarkdownPage
      slug="historia"
      fallbackTitle="História"
      crumbsLabel="História"
    />
  );
}
