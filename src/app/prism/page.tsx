import type { Metadata } from "next";
import { Frame } from "@/components/ui/Frame";
import { SceneLoader } from "@/components/ui/SceneLoader";
import { getDemo } from "@/lib/demos";

const demo = getDemo("prism");

export const metadata: Metadata = {
  title: demo.title,
  description: demo.description,
};

export default function PrismPage() {
  return (
    <>
      <SceneLoader scene="prism" />
      <Frame demo={demo} />
    </>
  );
}
