import type { Metadata } from "next";
import { Index } from "@/components/ui/Index";

export const metadata: Metadata = {
  title: "Three Studies",
};

export default function Home() {
  return <Index />;
}
