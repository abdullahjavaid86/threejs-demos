"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Stage } from "@/components/ui/Stage";
import { Phone } from "./Phone";
import { Rig } from "./Rig";
import { useIsSmallScreen } from "@/lib/media";

export default function IphoneScene() {
  const small = useIsSmallScreen();
  return (
    <Stage
      camera={{ position: [1.7, 0.5, 3.6], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      className="bg-[radial-gradient(ellipse_at_50%_45%,#141a24_0%,#09090b_65%)]"
    >
      <Phone />
      <Rig />

      <directionalLight position={[3, 5, 4]} intensity={1.1} color="#f4f7ff" />
      <ContactShadows
        position={[0, -1.32, 0]}
        opacity={0.5}
        scale={6}
        blur={2.2}
        far={2.5}
        color="#000000"
      />

      <Environment resolution={256} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={1.8}
            color="#ffffff"
            position={[0, 6, -5]}
            scale={[8, 4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#dbe7ff"
            position={[-7, 1, 3]}
            scale={[3, 7, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            color="#ffe9d6"
            position={[7, -1, 2]}
            scale={[3, 8, 1]}
          />
          <Lightformer
            form="circle"
            intensity={1.5}
            color="#ffffff"
            position={[0, -7, 0]}
            scale={5}
          />
        </group>
      </Environment>

      <EffectComposer multisampling={small ? 0 : 4}>
        <Bloom intensity={0.3} luminanceThreshold={0.92} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.65} />
      </EffectComposer>
    </Stage>
  );
}
