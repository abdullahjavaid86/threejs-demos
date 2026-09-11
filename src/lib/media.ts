"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** Reactive media query; false during server rendering. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => subscribe(query, cb),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useIsSmallScreen = () => useMediaQuery("(max-width: 640px)");

/**
 * Multiplier that pushes a camera back on narrow viewports so the subject still fits.
 * `k` is the aspect ratio below which framing starts to widen.
 */
export function portraitFit(aspect: number, k: number) {
  return Math.max(1, k / aspect);
}
