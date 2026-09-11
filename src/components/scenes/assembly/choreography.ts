import type * as THREE from "three";
import { lerpNumber, lerpVector, type Keyframe } from "@/lib/keyframes";

type Key = Keyframe<{
  position: [number, number, number];
  target: [number, number, number];
  explode: number;
  focusFrame: number;
  focusChip: number;
  glow: number;
}>;

/** Camera, explosion and focus keyframes along page scroll progress. */
export const keys: Key[] = [
  {
    at: 0,
    position: [3.4, 2.3, 3.6],
    target: [0, 0, 0],
    explode: 0,
    focusFrame: 0,
    focusChip: 0,
    glow: 0.25,
  },
  {
    at: 0.2,
    position: [4.0, 3.2, 4.2],
    target: [0, 1.0, 0],
    explode: 1,
    focusFrame: 0,
    focusChip: 0,
    glow: 0.25,
  },
  {
    at: 0.4,
    position: [2.4, 1.9, 2.6],
    target: [0, 1.2, 0],
    explode: 1,
    focusFrame: 1,
    focusChip: 0,
    glow: 0.25,
  },
  // Approach below the lifted frame ring, then settle inside it just above the board.
  {
    at: 0.5,
    position: [1.9, 1.0, 1.6],
    target: [0, 0.9, 0],
    explode: 1,
    focusFrame: 0,
    focusChip: 1,
    glow: 1.6,
  },
  {
    at: 0.6,
    position: [1.1, 1.04, 0.9],
    target: [0, 0.9, 0],
    explode: 1,
    focusFrame: 0,
    focusChip: 1,
    glow: 1.1,
  },
  {
    at: 0.8,
    position: [3.2, 1.7, 3.4],
    target: [0, 0, 0],
    explode: 0,
    focusFrame: 0,
    focusChip: 0,
    glow: 0.4,
  },
  {
    at: 1,
    position: [0.02, 6.4, 0.03],
    target: [0, 0, 0],
    explode: 0,
    focusFrame: 0,
    focusChip: 0,
    glow: 0.25,
  },
];

export function cameraAt(p: number, outPos: THREE.Vector3, outTarget: THREE.Vector3) {
  lerpVector(keys, p, (k) => k.position, outPos);
  lerpVector(keys, p, (k) => k.target, outTarget);
}

export const explodeAt = (p: number) => lerpNumber(keys, p, (k) => k.explode);
export const focusFrameAt = (p: number) => lerpNumber(keys, p, (k) => k.focusFrame);
export const focusChipAt = (p: number) => lerpNumber(keys, p, (k) => k.focusChip);
export const glowAt = (p: number) => lerpNumber(keys, p, (k) => k.glow);

/** Damped page scroll progress, written by the rig and read by the device. */
export const story = { progress: 0 };
