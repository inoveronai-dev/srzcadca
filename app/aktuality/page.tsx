import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Aktuality",
};

export default function Page() {
  return <StubPage title="Aktuality" />;
}
