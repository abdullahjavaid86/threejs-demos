"use client";

import dynamic from "next/dynamic";
import type { Demo } from "@/lib/demos";

const scenes = {
  nebula: dynamic(() => import("@/components/scenes/nebula/NebulaScene"), { ssr: false }),
  prism: dynamic(() => import("@/components/scenes/prism/PrismScene"), { ssr: false }),
  tides: dynamic(() => import("@/components/scenes/tides/TidesScene"), { ssr: false }),
  assembly: dynamic(() => import("@/components/scenes/assembly/AssemblyScene"), { ssr: false }),
} satisfies Record<Demo["slug"], React.ComponentType>;

export function SceneLoader({ scene }: { scene: Demo["slug"] }) {
  const Scene = scenes[scene];
  return <Scene />;
}
