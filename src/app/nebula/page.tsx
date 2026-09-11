import type { Metadata } from "next";
import { Frame } from "@/components/ui/Frame";
import { SceneLoader } from "@/components/ui/SceneLoader";
import { getDemo } from "@/lib/demos";

const demo = getDemo("nebula");

export const metadata: Metadata = {
  title: demo.title,
  description: demo.description,
};

export default function NebulaPage() {
  return (
    <>
      <SceneLoader scene="nebula" />
      <Frame demo={demo} />
    </>
  );
}
