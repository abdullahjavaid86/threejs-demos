"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cameraAt, story } from "./choreography";
import { portraitFit } from "@/lib/media";

const desired = new THREE.Vector3();
const target = new THREE.Vector3();

function pageProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0;
}

export function Rig() {
  const lookAt = useRef(new THREE.Vector3());

  useFrame(({ camera, pointer, clock, viewport }, delta) => {
    const dt = Math.min(delta, 0.05);
    story.progress = THREE.MathUtils.damp(story.progress, pageProgress(), 5, dt);

    cameraAt(story.progress, desired, target);
    desired.sub(target).multiplyScalar(portraitFit(viewport.aspect, 1.0)).add(target);
    const t = clock.elapsedTime;
    desired.x += Math.sin(t * 0.3) * 0.05 + pointer.x * 0.18;
    desired.y += Math.cos(t * 0.23) * 0.03 + pointer.y * 0.1;

    camera.position.lerp(desired, 1 - Math.exp(-dt * 4));
    lookAt.current.lerp(target, 1 - Math.exp(-dt * 4));
    camera.lookAt(lookAt.current);
  });

  return null;
}
