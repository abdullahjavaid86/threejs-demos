"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { skyFragment, skyVertex } from "./shaders";
import { palette } from "./palette";

export function Sky() {
  const uniforms = useMemo(
    () => ({
      uZenith: { value: new THREE.Color(palette.zenith) },
      uHorizon: { value: new THREE.Color(palette.horizon) },
      uSun: { value: new THREE.Color(palette.sun) },
      uSunDir: { value: new THREE.Vector3(...palette.sunDir).normalize() },
    }),
    [],
  );

  return (
    <mesh scale={60}>
      <sphereGeometry args={[1, 48, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={skyVertex}
        fragmentShader={skyFragment}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
