"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { explodeAt, focusChipAt, focusFrameAt, glowAt, story } from "./choreography";

const W = 2.4;
const D = 1.6;
const LIFT = 0.42;

type Part = "back" | "battery" | "board" | "frame" | "display" | "glass";

/** Resting height and explosion order for each layer. */
const layers: Record<Part, { y: number; order: number }> = {
  back: { y: -0.16, order: 0 },
  battery: { y: -0.085, order: 1 },
  board: { y: 0.0, order: 2 },
  frame: { y: -0.03, order: 3 },
  display: { y: 0.1, order: 4 },
  glass: { y: 0.15, order: 5 },
};

const aluminium = { color: "#d9d5cd", metalness: 0.95, roughness: 0.32 };

export function Device() {
  const group = useRef<THREE.Group>(null);
  const parts = useRef<Record<Part, THREE.Group | null>>({
    back: null,
    battery: null,
    board: null,
    frame: null,
    display: null,
    glass: null,
  });
  const chip = useRef<THREE.MeshStandardMaterial>(null);
  const base = useRef(new Map<THREE.MeshStandardMaterial, { color: THREE.Color; env: number }>());

  /** Remember each material's resting colour and reflection strength so focus can darken it. */
  const register = (m: THREE.MeshStandardMaterial | null) => {
    if (m && !base.current.has(m)) {
      base.current.set(m, { color: m.color.clone(), env: m.envMapIntensity });
    }
  };

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = story.progress;
    const explode = explodeAt(p);
    const focusFrame = focusFrameAt(p);
    const focusChip = focusChipAt(p);
    const dim = Math.max(focusFrame, focusChip);

    for (const [name, g] of Object.entries(parts.current) as [Part, THREE.Group | null][]) {
      if (!g) continue;
      const layer = layers[name];
      g.position.y = layer.y + layer.order * LIFT * explode;

      const focused =
        (name === "frame" && focusFrame > 0.5) || (name === "board" && focusChip > 0.5);
      const targetOpacity = focused ? 1 : 1 - dim * 0.88;
      g.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          const m = o.material as THREE.Material;
          m.opacity = THREE.MathUtils.damp(m.opacity, targetOpacity, 6, dt);
        }
      });
    }

    if (chip.current) {
      chip.current.emissiveIntensity = THREE.MathUtils.damp(
        chip.current.emissiveIntensity,
        glowAt(p),
        4,
        dt,
      );
    }

    if (group.current) {
      const t = clock.elapsedTime;
      group.current.rotation.y = p * Math.PI * 1.25 + Math.sin(t * 0.25) * 0.05;
      group.current.rotation.z = Math.sin(t * 0.2) * 0.012;
    }
  });

  return (
    <group ref={group}>
      <group ref={(g) => void (parts.current.back = g)}>
        <RoundedBox args={[W, 0.06, D]} radius={0.06} smoothness={6}>
          <meshStandardMaterial {...aluminium} ref={register} />
        </RoundedBox>
      </group>

      <group ref={(g) => void (parts.current.battery = g)}>
        {[-0.56, 0.56].map((x) => (
          <RoundedBox
            key={x}
            args={[1.0, 0.09, 1.18]}
            radius={0.03}
            smoothness={4}
            position={[x, 0, 0]}
          >
            <meshStandardMaterial color="#2d2d33" metalness={0.3} roughness={0.55} ref={register} />
          </RoundedBox>
        ))}
      </group>

      <group ref={(g) => void (parts.current.board = g)}>
        <RoundedBox args={[2.1, 0.03, 1.3]} radius={0.02} smoothness={3}>
          <meshStandardMaterial color="#0e2a24" metalness={0.15} roughness={0.7} ref={register} />
        </RoundedBox>
        <RoundedBox args={[0.38, 0.08, 0.38]} radius={0.015} smoothness={3} position={[0, 0.05, 0]}>
          <meshStandardMaterial
            ref={(m) => {
              chip.current = m;
              register(m);
            }}
            color="#111114"
            metalness={0.7}
            roughness={0.25}
            emissive="#f2b880"
            emissiveIntensity={0.25}
          />
        </RoundedBox>
        {[
          [-0.55, 0.3, 0.2, 0.3],
          [0.6, -0.25, 0.28, 0.16],
          [0.55, 0.32, 0.12, 0.12],
          [-0.35, -0.38, 0.5, 0.1],
        ].map(([x, z, w, d]) => (
          <mesh key={`${x}:${z}`} position={[x, 0.03, z]}>
            <boxGeometry args={[w, 0.03, d]} />
            <meshStandardMaterial color="#3b3b42" metalness={0.6} roughness={0.4} ref={register} />
          </mesh>
        ))}
      </group>

      <group ref={(g) => void (parts.current.frame = g)}>
        {[
          {
            args: [W + 0.05, 0.26, 0.07] as [number, number, number],
            pos: [0, 0, D / 2 + 0.01] as [number, number, number],
          },
          {
            args: [W + 0.05, 0.26, 0.07] as [number, number, number],
            pos: [0, 0, -D / 2 - 0.01] as [number, number, number],
          },
          {
            args: [0.07, 0.26, D + 0.09] as [number, number, number],
            pos: [W / 2 + 0.01, 0, 0] as [number, number, number],
          },
          {
            args: [0.07, 0.26, D + 0.09] as [number, number, number],
            pos: [-W / 2 - 0.01, 0, 0] as [number, number, number],
          },
        ].map((bar) => (
          <RoundedBox
            key={bar.pos.join()}
            args={bar.args}
            radius={0.03}
            smoothness={4}
            position={bar.pos}
          >
            <meshStandardMaterial {...aluminium} ref={register} />
          </RoundedBox>
        ))}
      </group>

      <group ref={(g) => void (parts.current.display = g)}>
        <RoundedBox args={[W - 0.1, 0.03, D - 0.1]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#08080a" metalness={0.4} roughness={0.18} ref={register} />
        </RoundedBox>
      </group>

      <group ref={(g) => void (parts.current.glass = g)}>
        <RoundedBox args={[W, 0.05, D]} radius={0.06} smoothness={6}>
          <meshPhysicalMaterial
            color="#f4f1ea"
            transmission={1}
            thickness={0.06}
            roughness={0.04}
            ior={1.5}
            metalness={0}
            envMapIntensity={0.3}
            ref={register}
          />
        </RoundedBox>
      </group>
    </group>
  );
}
