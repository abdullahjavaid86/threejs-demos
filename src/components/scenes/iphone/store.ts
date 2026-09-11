import { useSyncExternalStore } from "react";

type State = {
  explore: boolean;
  hovered: string | null;
};

let state: State = { explore: false, hovered: null };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

/** Tiny external store shared by the DOM chrome and the R3F scene. */
export const exploreStore = {
  get: () => state,
  set(patch: Partial<State>) {
    state = { ...state, ...patch };
    emit();
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

export function useExplore() {
  return useSyncExternalStore(
    exploreStore.subscribe,
    () => state.explore,
    () => false,
  );
}

/** Per-frame values written by the rig and phone, read by callouts. */
export const frameState = {
  progress: 0,
  explore: 0,
};

export function setExploreAmount(v: number) {
  frameState.explore = v;
}
