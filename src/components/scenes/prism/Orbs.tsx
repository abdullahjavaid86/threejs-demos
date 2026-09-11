"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const orbs = [
  { radius: 2.6, speed: 0.32, phase: 0, size: 0.22, tilt: 0.35 },
  { radius: 3.1, speed: -0.21, phase: 2.1, size: 0.14, tilt: -0.5 },
  { radius: 2.2, speed: 0.45, phase: 4.2, size: 0.1, tilt: 0.9 },
];

export function Orbs() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const o = orbs[i];
      const a = t * o.speed + o.phase;
      child.position.set(
        Math.cos(a) * o.radius,
        Math.sin(a * 1.3) * 0.6 * Math.sin(o.tilt),
        Math.sin(a) * o.radius * Math.cos(o.tilt),
      );
    });
  });

  return (
    <group ref={group}>
      {orbs.map((o) => (
        <mesh key={o.phase}>
          <sphereGeometry args={[o.size, 48, 48]} />
          <meshStandardMaterial
            color="#f5efe6"
            metalness={1}
            roughness={0.12}
            envMapIntensity={1.6}
          />
        </mesh>
      ))}
    </group>
  );
}
