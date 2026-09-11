"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { cameraAt, explorePosition, exploreTarget } from "./choreography";
import { portraitFit } from "@/lib/media";
import { exploreStore, frameState } from "./store";

const desired = new THREE.Vector3();
const target = new THREE.Vector3();
const explorePos = new THREE.Vector3(...explorePosition);
const exploreTargetVec = new THREE.Vector3(...exploreTarget);

function pageProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0;
}

/** Drives the camera from scroll in story mode and hands over to orbit controls once explore settles. */
export function Rig() {
  const lookAt = useRef(new THREE.Vector3());
  const [orbit, setOrbit] = useState(false);

  useFrame(({ camera, pointer, clock, viewport }, delta) => {
    const fit = portraitFit(viewport.aspect, 1.05);
    const dt = Math.min(delta, 0.05);
    const explore = exploreStore.get().explore;
    if (!explore) {
      frameState.progress = THREE.MathUtils.damp(frameState.progress, pageProgress(), 5, dt);
    }

    if (explore) {
      desired.copy(explorePos).sub(exploreTargetVec).multiplyScalar(fit).add(exploreTargetVec);
      target.copy(exploreTargetVec);
    } else {
      cameraAt(frameState.progress, desired, target);
      const t = clock.elapsedTime;
      desired.x += Math.sin(t * 0.3) * 0.04 + pointer.x * 0.15;
      desired.y += Math.cos(t * 0.23) * 0.03 + pointer.y * 0.08;
      desired.sub(target).multiplyScalar(fit).add(target);
    }

    const settled = explore && camera.position.distanceTo(desired) < 0.08;
    if (settled !== orbit) setOrbit(settled);
    if (orbit) return;

    camera.position.lerp(desired, 1 - Math.exp(-dt * 3.5));
    lookAt.current.lerp(target, 1 - Math.exp(-dt * 3.5));
    camera.lookAt(lookAt.current);
  });

  return (
    <OrbitControls
      enabled={orbit}
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      minDistance={3.5}
      maxDistance={14}
      minPolarAngle={Math.PI * 0.2}
      maxPolarAngle={Math.PI * 0.8}
      target={exploreTarget}
    />
  );
}
