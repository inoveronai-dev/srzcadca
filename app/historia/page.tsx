import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "História",
};

export default function Page() {
  return <StubPage title="História" />;
}
