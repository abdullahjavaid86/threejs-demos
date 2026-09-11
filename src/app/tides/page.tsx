import type { Metadata } from "next";
import { Frame } from "@/components/ui/Frame";
import { SceneLoader } from "@/components/ui/SceneLoader";
import { getDemo } from "@/lib/demos";

const demo = getDemo("tides");

export const metadata: Metadata = {
  title: demo.title,
  description: demo.description,
};

export default function TidesPage() {
  return (
    <>
      <SceneLoader scene="tides" />
      <Frame demo={demo} />
    </>
  );
}
