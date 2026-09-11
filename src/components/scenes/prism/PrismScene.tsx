"use client";

import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Stage } from "@/components/ui/Stage";
import { Backdrop } from "./Backdrop";
import { Glass } from "./Glass";
import { Orbs } from "./Orbs";

export default function PrismScene() {
  return (
    <Stage
      camera={{ position: [0, 0.4, 7.5], fov: 32, near: 0.1, far: 80 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Backdrop />
      <Glass />
      <Orbs />

      <Environment resolution={512} frames={1}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={6}
            color="#fff3e6"
            position={[0, 6, -6]}
            scale={[10, 6, 1]}
          />
          <Lightformer
            form="ring"
            intensity={2.5}
            color="#ffb98a"
            position={[-8, 2, 4]}
            scale={4}
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            color="#8fb8ff"
            position={[8, -2, 2]}
            scale={[3, 8, 1]}
          />
          <Lightformer
            form="circle"
            intensity={3}
            color="#ffffff"
            position={[0, -8, 0]}
            scale={6}
          />
        </group>
      </Environment>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.04}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />

      <EffectComposer multisampling={4}>
        <Bloom intensity={0.45} luminanceThreshold={0.85} luminanceSmoothing={0.4} mipmapBlur />
        <Noise opacity={0.05} blendFunction={BlendFunction.SOFT_LIGHT} />
        <Vignette eskil={false} offset={0.25} darkness={0.75} />
      </EffectComposer>
    </Stage>
  );
}
