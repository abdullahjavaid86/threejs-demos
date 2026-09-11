"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import { cameraAt } from "./choreography";
import { portraitFit } from "@/lib/media";

const desired = new THREE.Vector3();
const target = new THREE.Vector3();

export function CameraRig() {
  const scroll = useScroll();
  const lookAt = useRef(new THREE.Vector3(0, 0.6, -8));

  useFrame(({ camera, pointer, clock, viewport }, delta) => {
    const dt = Math.min(delta, 0.05);
    cameraAt(scroll.offset, desired, target);
    desired.sub(target).multiplyScalar(portraitFit(viewport.aspect, 0.85)).add(target);

    // Breathing sway so the rig never feels locked.
    const t = clock.elapsedTime;
    desired.x += Math.sin(t * 0.35) * 0.12 + pointer.x * 0.25;
    desired.y += Math.cos(t * 0.27) * 0.06 + pointer.y * 0.12;

    camera.position.lerp(desired, 1 - Math.exp(-dt * 3));
    lookAt.current.lerp(target, 1 - Math.exp(-dt * 3));
    camera.lookAt(lookAt.current);
  });

  return null;
}
