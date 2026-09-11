"use client";

import { Scroll, ScrollControls } from "@react-three/drei";
import { Stage } from "@/components/ui/Stage";
import { CameraRig } from "./CameraRig";
import { Ocean } from "./Ocean";
import { Sections } from "./Sections";
import { Sky } from "./Sky";
import { palette } from "./palette";
import { useIsSmallScreen } from "@/lib/media";

export default function TidesScene() {
  const small = useIsSmallScreen();
  return (
    <Stage
      camera={{ position: [0, 4.2, 9], fov: 50, near: 0.1, far: 120 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={[palette.horizon, 6, 34]} />
      <ScrollControls pages={4} damping={0.28}>
        <Sky />
        <Ocean segments={small ? 220 : 400} />
        <CameraRig />
        <Scroll html>
          <Sections />
        </Scroll>
      </ScrollControls>
    </Stage>
  );
}
