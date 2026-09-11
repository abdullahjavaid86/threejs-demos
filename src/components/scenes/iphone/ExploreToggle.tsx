"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { exploreStore, useExplore } from "./store";

const ease = [0.16, 1, 0.3, 1] as const;

/** Switches between the scroll story and the scattered exploration view. */
export function ExploreToggle() {
  const explore = useExplore();

  useEffect(() => {
    document.body.style.overflow = explore ? "hidden" : "";
    if (!explore) exploreStore.set({ hovered: null });
    return () => {
      document.body.style.overflow = "";
    };
  }, [explore]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-40 flex flex-col items-center gap-3"
      style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <AnimatePresence>
        {explore ? (
          <motion.p
            key="hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.6, ease }}
            className="text-label"
          >
            Drag to orbit · Hover a part
          </motion.p>
        ) : null}
      </AnimatePresence>
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease }}
        onClick={() => exploreStore.set({ explore: !explore })}
        className="pointer-events-auto rounded-full border border-line bg-ink/60 px-5 py-2.5 text-label text-ivory backdrop-blur-md transition-colors hover:border-ivory/40"
      >
        {explore ? "Back to the story" : "Explore inside"}
      </motion.button>
    </div>
  );
}
