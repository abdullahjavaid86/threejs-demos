"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ACCENT, Callout } from "./Callout";
import { peekAt } from "./choreography";
import {
  MODEL_HEIGHT_M,
  MODEL_URL,
  PHONE_HEIGHT,
  exploreLabels,
  scatter,
  storyCallouts,
  type Vec,
} from "./manifest";
import { exploreStore, frameState, setExploreAmount } from "./store";

const S = PHONE_HEIGHT / MODEL_HEIGHT_M;
const accentColor = new THREE.Color(ACCENT).multiplyScalar(0.5);
const black = new THREE.Color(0, 0, 0);
const tmp = new THREE.Vector3();
const box = new THREE.Box3();
const centre = new THREE.Vector3();

/** Converts a phone-oriented world offset into the model's own axes (front is +x, left is +z). */
function toModel(v: Vec, out: THREE.Vector3) {
  return out.set(v[2] / S, v[1] / S, -v[0] / S);
}

function add(a: Vec, b: Vec): Vec {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

type PartEntry = { node: THREE.Object3D; rest: THREE.Vector3; labelled: boolean };

const labelled = new Set(exploreLabels.map((l) => l.part));

function onPointerOut() {
  if (exploreStore.get().hovered !== null) exploreStore.set({ hovered: null });
  document.body.style.cursor = "";
}

function partOf(object: THREE.Object3D, root: THREE.Object3D): string | null {
  let o: THREE.Object3D | null = object;
  while (o && o.parent !== root) o = o.parent;
  return o?.name ?? null;
}

export function Phone() {
  const { scene } = useGLTF(MODEL_URL, false, true);
  const model = useMemo(() => scene.clone(true), [scene]);

  const phone = useRef<THREE.Group>(null);
  const partsRoot = useRef<THREE.Group>(null);
  const parts = useRef<Map<string, PartEntry>>(new Map());
  const calloutGroups = useRef<Map<string, Set<THREE.Group>>>(new Map());
  const explore = useRef(0);
  const [centres, setCentres] = useState<Record<string, Vec> | null>(null);

  useEffect(() => {
    const root = partsRoot.current;
    const ph = phone.current;
    const body = model.getObjectByName("body");
    if (!root || !ph || !body) return;

    ph.rotation.set(0, 0, 0);
    ph.updateMatrixWorld(true);

    const map = new Map<string, PartEntry>();
    const found: Record<string, Vec> = {};
    for (const node of body.children.slice()) {
      root.attach(node);
      node.traverse((o) => {
        if (!(o instanceof THREE.Mesh)) return;
        const m = (o.material as THREE.MeshStandardMaterial).clone();
        if (m.name === "mat_screen" && m.map) {
          m.emissive.set("#ffffff");
          m.emissiveMap = m.map;
          m.emissiveIntensity = 0.55;
        }
        o.material = m;
      });
      box.setFromObject(node).getCenter(centre);
      ph.worldToLocal(centre);
      found[node.name] = [centre.x, centre.y, centre.z];
      map.set(node.name, { node, rest: node.position.clone(), labelled: labelled.has(node.name) });
    }
    parts.current = map;
    setCentres(found);
  }, [model]);

  const registerCallout = (part: string) => (g: THREE.Group | null) => {
    if (!g) return;
    const set = calloutGroups.current.get(part) ?? new Set<THREE.Group>();
    set.add(g);
    calloutGroups.current.set(part, set);
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!exploreStore.get().explore || !partsRoot.current) return;
    const part = partOf(e.object, partsRoot.current);
    const id = part && labelled.has(part) ? part : null;
    if (exploreStore.get().hovered !== id) exploreStore.set({ hovered: id });
    document.body.style.cursor = id ? "pointer" : "";
  };

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 0.05);
    const wantExplore = exploreStore.get().explore ? 1 : 0;
    explore.current = THREE.MathUtils.damp(explore.current, wantExplore, 2.5, dt);
    setExploreAmount(explore.current);

    const peek = peekAt(frameState.progress);
    const amount = peek + (1 - peek) * explore.current;
    const hovered = exploreStore.get().hovered;

    for (const [name, entry] of parts.current) {
      const s = scatter[name];
      if (s) {
        toModel(s, tmp).multiplyScalar(amount);
        entry.node.position.copy(entry.rest).add(tmp);
        const groups = calloutGroups.current.get(name);
        if (groups)
          for (const g of groups) g.position.set(s[0] * amount, s[1] * amount, s[2] * amount);
      }
      if (!entry.labelled) continue;
      const lit = hovered === name ? 1 : 0;
      entry.node.traverse((o) => {
        if (!(o instanceof THREE.Mesh)) return;
        const m = o.material as THREE.MeshStandardMaterial;
        const k = THREE.MathUtils.damp(m.userData.lit ?? 0, lit, 8, dt);
        m.userData.lit = k;
        if (m.name === "mat_screen") return;
        m.emissive.copy(black).lerp(accentColor, k);
      });
    }

    if (phone.current) {
      const t = clock.elapsedTime;
      const idle = Math.sin(t * 0.35) * 0.06;
      phone.current.rotation.y = idle + 1.05 * explore.current;
      phone.current.rotation.x = Math.sin(t * 0.27) * 0.02 - 0.12 * explore.current;
    }
  });

  return (
    <group ref={phone}>
      <group scale={S} rotation={[0, -Math.PI / 2, 0]} position={[0, -MODEL_HEIGHT_M * S * 0.5, 0]}>
        <primitive object={model} />
        <group
          ref={partsRoot}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerMove}
          onPointerOut={onPointerOut}
        />
      </group>

      {centres
        ? storyCallouts.map((c) => {
            const base = centres[c.part];
            if (!base) return null;
            const anchor = add(base, c.anchorOffset ?? [0, 0, 0]);
            return (
              <group key={`${c.part}:${c.label}`} ref={registerCallout(c.part)}>
                <Callout
                  anchor={anchor}
                  end={add(anchor, c.end)}
                  label={c.label}
                  detail={c.detail}
                  window={c.window}
                />
              </group>
            );
          })
        : null}

      {centres
        ? exploreLabels.map((l) => {
            const anchor = centres[l.part];
            if (!anchor) return null;
            return (
              <group key={l.part} ref={registerCallout(l.part)}>
                <Callout
                  part={l.part}
                  anchor={anchor}
                  end={add(anchor, l.end)}
                  label={l.name}
                  detail={l.spec}
                />
              </group>
            );
          })
        : null}
    </group>
  );
}

useGLTF.preload(MODEL_URL, false, true);
