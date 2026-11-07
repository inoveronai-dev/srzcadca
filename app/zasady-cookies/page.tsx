import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";

export const metadata: Metadata = {
  title: "Zásady cookies",
  description: "Zásady používania súborov cookie.",
};

export default function Page() {
  return (
    <MarkdownPage
      slug="zasady-pouzivania-suborov-cookie-eu"
      fallbackTitle="Zásady cookies"
      crumbsLabel="Zásady cookies"
    />
  );
}
