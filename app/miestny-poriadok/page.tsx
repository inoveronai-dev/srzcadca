import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Miestny poriadok",
};

export default function Page() {
  return <StubPage title="Miestny poriadok" />;
}
