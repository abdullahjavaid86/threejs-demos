import type * as THREE from "three";
import { lerpNumber, lerpVector, type Keyframe } from "@/lib/keyframes";

type Key = Keyframe<{
  position: [number, number, number];
  target: [number, number, number];
  amplitude: number;
}>;

/** Camera and sea state keyframes along the normalised scroll offset. */
export const keys: Key[] = [
  { at: 0, position: [0, 4.2, 9], target: [0, 0.6, -8], amplitude: 0.3 },
  { at: 0.34, position: [0.8, 1.7, 5], target: [0, 0.3, -6], amplitude: 0.85 },
  { at: 0.67, position: [-1.4, 0.95, 2.2], target: [0.8, 0.8, -4], amplitude: 1.55 },
  { at: 1, position: [0, 7.5, 3], target: [0, -1, -5], amplitude: 0.2 },
];

export function amplitudeAt(offset: number) {
  return lerpNumber(keys, offset, (k) => k.amplitude);
}

export function cameraAt(offset: number, outPos: THREE.Vector3, outTarget: THREE.Vector3) {
  lerpVector(keys, offset, (k) => k.position, outPos);
  lerpVector(keys, offset, (k) => k.target, outTarget);
}
