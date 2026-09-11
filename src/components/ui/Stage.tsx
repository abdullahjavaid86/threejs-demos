"use client";

import { useState, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { AnimatePresence, motion } from "motion/react";

type StageProps = Omit<CanvasProps, "children" | "onCreated"> & {
  children: ReactNode;
};

/**
 * Full-viewport canvas with a soft reveal once the WebGL context exists.
 */
export function Stage({ children, className, ...canvasProps }: StageProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className={`fixed inset-0 ${className ?? ""}`}>
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={ready ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Canvas dpr={[1, 1.75]} onCreated={() => setReady(true)} {...canvasProps}>
          {children}
        </Canvas>
      </motion.div>

      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <motion.span
              className="text-label"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              Preparing scene
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
