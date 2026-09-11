import * as THREE from "three";

/** Piecewise smoothstep interpolation over keyframes ordered by `at` in [0, 1]. */
export type Keyframe<T> = { at: number } & T;

export function segment<T>(keys: Keyframe<T>[], offset: number) {
  const o = THREE.MathUtils.clamp(offset, 0, 1);
  let i = 0;
  while (i < keys.length - 2 && o > keys[i + 1].at) i++;
  const a = keys[i];
  const b = keys[i + 1];
  const t = THREE.MathUtils.smoothstep(o, a.at, b.at);
  return { a, b, t };
}

export function lerpNumber<T>(
  keys: Keyframe<T>[],
  offset: number,
  pick: (k: Keyframe<T>) => number,
): number {
  const { a, b, t } = segment(keys, offset);
  return THREE.MathUtils.lerp(pick(a), pick(b), t);
}

const va = new THREE.Vector3();
const vb = new THREE.Vector3();

export function lerpVector<T>(
  keys: Keyframe<T>[],
  offset: number,
  pick: (k: Keyframe<T>) => [number, number, number],
  out: THREE.Vector3,
): THREE.Vector3 {
  const { a, b, t } = segment(keys, offset);
  return out.lerpVectors(va.fromArray(pick(a)), vb.fromArray(pick(b)), t);
}
