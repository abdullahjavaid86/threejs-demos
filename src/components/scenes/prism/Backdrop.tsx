"use client";

import { useMemo } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uTop;
uniform vec3 uBottom;
uniform vec3 uGlow;
varying vec3 vDir;
void main() {
  float y = vDir.y * 0.5 + 0.5;
  vec3 col = mix(uBottom, uTop, smoothstep(0.1, 0.9, y));
  float glow = pow(max(dot(vDir, normalize(vec3(-0.3, 0.15, -1.0))), 0.0), 6.0);
  col += uGlow * glow * 0.55;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

export function Backdrop() {
  const uniforms = useMemo(
    () => ({
      uTop: { value: new THREE.Color("#0c0a0f") },
      uBottom: { value: new THREE.Color("#1d1216") },
      uGlow: { value: new THREE.Color("#d98a5a") },
    }),
    [],
  );

  return (
    <mesh scale={30}>
      <sphereGeometry args={[1, 48, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
