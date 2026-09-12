import type * as THREE from "three";
import { lerpNumber, lerpVector, type Keyframe } from "@/lib/keyframes";

type Key = Keyframe<{
  position: [number, number, number];
  target: [number, number, number];
  peek: number;
}>;

/** Camera path around the phone along page scroll progress. `peek` partially opens the shell. */
export const keys: Key[] = [
  { at: 0, position: [2.2, 0.6, 4.8], target: [0, 0, 0], peek: 0 },
  { at: 0.15, position: [0.3, 0.2, 4.8], target: [0, 0.1, 0], peek: 0 },
  { at: 0.33, position: [-1.5, 0.8, -4.1], target: [0, 0.3, 0], peek: 0 },
  { at: 0.5, position: [-3.6, 1.5, 2.7], target: [0, 0.35, 0], peek: 0 },
  { at: 0.67, position: [0.9, -3.0, 3.6], target: [0, -0.5, 0], peek: 0 },
  { at: 0.85, position: [3.6, 0.7, 2.4], target: [0.2, 0, 0], peek: 0.35 },
  { at: 1, position: [0, 0.3, 4.4], target: [0, 0, 0], peek: 0 },
];

export const explorePosition: [number, number, number] = [4.8, 1.9, 6.6];
export const exploreTarget: [number, number, number] = [0, 0.2, 0];

export function cameraAt(p: number, outPos: THREE.Vector3, outTarget: THREE.Vector3) {
  lerpVector(keys, p, (k) => k.position, outPos);
  lerpVector(keys, p, (k) => k.target, outTarget);
}

export const peekAt = (p: number) => lerpNumber(keys, p, (k) => k.peek);
