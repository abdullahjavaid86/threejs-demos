import type { Metadata } from "next";
import { Frame } from "@/components/ui/Frame";
import { SceneLoader } from "@/components/ui/SceneLoader";
import { Story } from "@/components/scenes/assembly/Story";
import { getDemo } from "@/lib/demos";

const demo = getDemo("assembly");

export const metadata: Metadata = {
  title: demo.title,
  description: demo.description,
};

export default function AssemblyPage() {
  return (
    <>
      <SceneLoader scene="assembly" />
      <Story />
      <Frame demo={demo} compact />
    </>
  );
}
