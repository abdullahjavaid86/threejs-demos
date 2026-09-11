"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function Glass({ quality }: { quality: "high" | "low" }) {
  const knot = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!knot.current) return;
    knot.current.rotation.x += delta * 0.08;
    knot.current.rotation.z -= delta * 0.05;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.9} floatingRange={[-0.15, 0.15]}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1, 0.32, 320, 56, 2, 3]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.35}
          samples={quality === "high" ? 10 : 5}
          resolution={quality === "high" ? 1024 : 512}
          transmission={1}
          thickness={1.4}
          roughness={0.06}
          ior={1.45}
          chromaticAberration={0.08}
          anisotropicBlur={0.25}
          distortion={0.35}
          distortionScale={0.45}
          temporalDistortion={0.08}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationDistance={1.6}
          attenuationColor="#ffd9c2"
          color="#fff6ef"
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}
