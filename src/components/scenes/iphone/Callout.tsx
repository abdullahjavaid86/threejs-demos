"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import type { Line2 } from "three/examples/jsm/lines/Line2.js";
import { exploreStore, frameState } from "./store";

export const ACCENT = "#8fc3ff";

type Vec = [number, number, number];

export type CalloutProps = {
  anchor: Vec;
  end: Vec;
  label: string;
  detail?: string;
  /** Scroll-progress window in which a story callout is visible. */
  window?: [number, number];
  /** Part id for exploration callouts; visibility follows the explore amount and hover. */
  part?: string;
};

function windowVisibility(p: number, [from, to]: [number, number]) {
  const fade = 0.03;
  return (
    THREE.MathUtils.smoothstep(p, from, from + fade) *
    (1 - THREE.MathUtils.smoothstep(p, to - fade, to))
  );
}

/** A leader line from a point on the phone to a label, faded by story window or explore state. */
export function Callout({ anchor, end, label, detail, window: win, part }: CalloutProps) {
  const line = useRef<Line2>(null);
  const dot = useRef<THREE.Mesh>(null);
  const box = useRef<HTMLDivElement>(null);
  const side = end[0] >= anchor[0] ? "right" : "left";

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const { progress, explore } = frameState;
    let target = 0;
    if (win) {
      target = windowVisibility(progress, win) * (1 - explore);
    } else if (part) {
      const hovered = exploreStore.get().hovered;
      target = explore * (hovered === null ? 0.85 : hovered === part ? 1 : 0.18);
    }
    const current = line.current?.material.opacity ?? 0;
    const vis = THREE.MathUtils.damp(current, target, 8, dt);

    if (line.current) line.current.material.opacity = vis;
    if (dot.current) dot.current.scale.setScalar(Math.max(vis, 0.0001));
    if (box.current) {
      box.current.style.opacity = String(vis);
      box.current.style.transform = `translateY(${(1 - vis) * 8}px)`;
    }
  });

  return (
    <group>
      <Line
        ref={line}
        points={[anchor, end]}
        color={ACCENT}
        lineWidth={1}
        transparent
        opacity={0}
        depthTest={false}
        renderOrder={10}
      />
      <mesh ref={dot} position={anchor} renderOrder={11}>
        <sphereGeometry args={[0.014, 12, 12]} />
        <meshBasicMaterial color={ACCENT} depthTest={false} toneMapped={false} />
      </mesh>
      <Html position={end} zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
        <div
          ref={box}
          className={`w-36 sm:w-52 ${side === "left" ? "-translate-x-full text-right" : ""}`}
          style={{
            opacity: 0,
            marginTop: "-0.5rem",
            paddingInline: "0.6rem",
            transition: "none",
          }}
        >
          <p className="text-label whitespace-normal" style={{ color: ACCENT }}>
            {label}
          </p>
          {detail ? (
            <p className="mt-1 hidden text-xs leading-snug text-ivory/75 sm:block">{detail}</p>
          ) : null}
        </div>
      </Html>
    </group>
  );
}
