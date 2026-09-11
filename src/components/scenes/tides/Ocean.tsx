"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import { oceanFragment, oceanVertex } from "./shaders";
import { palette } from "./palette";
import { amplitudeAt } from "./choreography";

function createUniforms() {
  return THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      uTime: { value: 0 },
      uAmplitude: { value: 0.3 },
      uDeep: { value: new THREE.Color(palette.deep) },
      uShallow: { value: new THREE.Color(palette.shallow) },
      uCrest: { value: new THREE.Color(palette.crest) },
      uSunDir: { value: new THREE.Vector3(...palette.sunDir).normalize() },
    },
  ]);
}

export function Ocean({ segments }: { segments: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScroll();
  const initialUniforms = useMemo(() => createUniforms(), []);
  const time = useRef(0);

  useFrame((_, delta) => {
    const mat = material.current;
    if (!mat) return;
    const dt = Math.min(delta, 0.05);
    const target = amplitudeAt(scroll.offset);
    const amp = THREE.MathUtils.damp(mat.uniforms.uAmplitude.value, target, 2.5, dt);
    mat.uniforms.uAmplitude.value = amp;
    // Rougher water moves faster.
    time.current += dt * (0.5 + amp * 0.6);
    mat.uniforms.uTime.value = time.current;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -4]}>
      <planeGeometry args={[90, 90, segments, segments]} />
      <shaderMaterial
        ref={material}
        uniforms={initialUniforms}
        vertexShader={oceanVertex}
        fragmentShader={oceanFragment}
        fog
      />
    </mesh>
  );
}
