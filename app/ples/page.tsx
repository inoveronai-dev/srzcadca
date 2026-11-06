import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Rybársky ples",
};

export default function Page() {
  return <StubPage title="Rybársky ples" />;
}
