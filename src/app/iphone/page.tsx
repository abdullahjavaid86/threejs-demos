import type { Metadata } from "next";
import { Frame } from "@/components/ui/Frame";
import { SceneLoader } from "@/components/ui/SceneLoader";
import { ExploreToggle } from "@/components/scenes/iphone/ExploreToggle";
import { Story } from "@/components/scenes/iphone/Story";
import { getDemo } from "@/lib/demos";

const demo = getDemo("iphone");

export const metadata: Metadata = {
  title: demo.title,
  description: demo.description,
};

export default function IphonePage() {
  return (
    <>
      <SceneLoader scene="iphone" />
      <Story />
      <ExploreToggle />
      <Frame demo={demo} compact />
    </>
  );
}
