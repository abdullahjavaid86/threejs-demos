"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { buildForms } from "./forms";
import { fragmentShader, vertexShader } from "./shaders";

const palettes = [
  { a: new THREE.Color("#3d2fb8"), b: new THREE.Color("#c7b7ff") },
  { a: new THREE.Color("#0f6f7c"), b: new THREE.Color("#a5f0ff") },
  { a: new THREE.Color("#7a2c6a"), b: new THREE.Color("#ffb3c1") },
];

const FORM_COUNT = 3;
const HOLD = 6.5;
const TRANSITION = 2.6;
const TILT = 0.72;

const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const hit = new THREE.Vector3();

type Uniforms = {
  uTime: THREE.IUniform<number>;
  uFrom: THREE.IUniform<number>;
  uTo: THREE.IUniform<number>;
  uProgress: THREE.IUniform<number>;
  uPointer: THREE.IUniform<THREE.Vector3>;
  uPointerStrength: THREE.IUniform<number>;
  uPixelRatio: THREE.IUniform<number>;
  uSize: THREE.IUniform<number>;
  uColorA: THREE.IUniform<THREE.Color>;
  uColorB: THREE.IUniform<THREE.Color>;
};

function createUniforms(): Uniforms {
  return {
    uTime: { value: 0 },
    uFrom: { value: 0 },
    uTo: { value: 1 },
    uProgress: { value: 0 },
    uPointer: { value: new THREE.Vector3(99, 99, 99) },
    uPointerStrength: { value: 0 },
    uPixelRatio: { value: 1 },
    uSize: { value: 3.2 },
    uColorA: { value: palettes[0].a.clone() },
    uColorB: { value: palettes[0].b.clone() },
  };
}

export function Particles() {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const forms = useMemo(() => buildForms(), []);
  const initialUniforms = useMemo(() => createUniforms(), []);

  const state = useRef({
    from: 0,
    to: 1,
    progress: 0,
    holdTimer: 0,
    transitioning: false,
    smoothedPointer: new THREE.Vector3(99, 99, 99),
  });

  const gl = useThree((s) => s.gl);
  const raycaster = useThree((s) => s.raycaster);

  useEffect(() => {
    const advance = () => {
      const s = state.current;
      if (s.transitioning) return;
      s.transitioning = true;
      s.progress = 0;
      s.holdTimer = 0;
    };
    const el = gl.domElement;
    el.addEventListener("click", advance);
    return () => el.removeEventListener("click", advance);
  }, [gl]);

  useFrame(({ pointer, camera, clock }, delta) => {
    const mesh = points.current;
    const mat = material.current;
    if (!mesh || !mat) return;

    const u = mat.uniforms as Uniforms;
    const s = state.current;
    const dt = Math.min(delta, 0.05);
    u.uTime.value = clock.elapsedTime;
    u.uPixelRatio.value = gl.getPixelRatio();

    // Morph scheduling: hold, then transition to the next form.
    if (s.transitioning) {
      s.progress = Math.min(1, s.progress + dt / TRANSITION);
      if (s.progress >= 1) {
        s.transitioning = false;
        s.from = s.to;
        s.to = (s.to + 1) % FORM_COUNT;
        s.progress = 0;
      }
    } else {
      s.holdTimer += dt;
      if (s.holdTimer > HOLD) {
        s.transitioning = true;
        s.progress = 0;
        s.holdTimer = 0;
      }
    }
    u.uFrom.value = s.from;
    u.uTo.value = s.to;
    u.uProgress.value = s.progress;

    // Palette follows the dominant form.
    const dominant = s.transitioning && s.progress > 0.5 ? s.to : s.from;
    u.uColorA.value.lerp(palettes[dominant].a, dt * 1.4);
    u.uColorB.value.lerp(palettes[dominant].b, dt * 1.4);

    // Pointer projected onto the z=0 plane, expressed in the cloud's local space.
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(plane, hit)) {
      mesh.worldToLocal(hit);
      s.smoothedPointer.lerp(hit, 1 - Math.exp(-dt * 10));
    }
    u.uPointer.value.copy(s.smoothedPointer);
    const active = pointer.x !== 0 || pointer.y !== 0;
    u.uPointerStrength.value = THREE.MathUtils.damp(
      u.uPointerStrength.value,
      active ? 1 : 0,
      4,
      dt,
    );

    mesh.rotation.y += dt * 0.06;
    // Tilted so the flat forms are seen from above rather than edge-on.
    mesh.rotation.x = TILT + Math.sin(clock.elapsedTime * 0.11) * 0.08;

    // Gentle parallax.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.6, 2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.4, 2, dt);
    camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[forms.form0, 3]} />
        <bufferAttribute attach="attributes-aForm0" args={[forms.form0, 3]} />
        <bufferAttribute attach="attributes-aForm1" args={[forms.form1, 3]} />
        <bufferAttribute attach="attributes-aForm2" args={[forms.form2, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[forms.random, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={initialUniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
