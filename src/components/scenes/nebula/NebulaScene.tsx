"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Stage } from "@/components/ui/Stage";
import { useIsSmallScreen } from "@/lib/media";
import { DESKTOP_COUNT, MOBILE_COUNT } from "./forms";
import { Particles } from "./Particles";

export default function NebulaScene() {
  const small = useIsSmallScreen();
  return (
    <Stage
      camera={{ position: [0, 0, 6.5], fov: 45, near: 0.1, far: 50 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      className="bg-[radial-gradient(ellipse_at_center,#131126_0%,#09090b_70%)]"
    >
      <Particles count={small ? MOBILE_COUNT : DESKTOP_COUNT} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.55} luminanceThreshold={0.35} luminanceSmoothing={0.6} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Stage>
  );
}
