"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Stage } from "@/components/ui/Stage";
import { Device } from "./Device";
import { Rig } from "./Rig";
import { useIsSmallScreen } from "@/lib/media";

export default function AssemblyScene() {
  const small = useIsSmallScreen();
  return (
    <Stage
      camera={{ position: [3.4, 2.3, 3.6], fov: 30, near: 0.1, far: 60 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      className="bg-[radial-gradient(ellipse_at_50%_40%,#1a1815_0%,#0b0b0c_65%)]"
    >
      <Device />
      <Rig />

      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#fff4e6" />
      <ContactShadows
        position={[0, -0.22, 0]}
        opacity={0.55}
        scale={8}
        blur={2.4}
        far={3}
        color="#000000"
      />

      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={1.6}
            color="#fff5ea"
            position={[0, 6, -5]}
            scale={[8, 4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2}
            color="#e0c9a6"
            position={[-7, 1, 3]}
            scale={[3, 6, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.2}
            color="#9fb6d6"
            position={[7, -1, 2]}
            scale={[3, 8, 1]}
          />
          <Lightformer
            form="circle"
            intensity={2}
            color="#ffffff"
            position={[0, -7, 0]}
            scale={5}
          />
        </group>
      </Environment>

      <EffectComposer multisampling={small ? 0 : 4}>
        <Bloom intensity={0.5} luminanceThreshold={0.9} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.7} />
      </EffectComposer>
    </Stage>
  );
}
