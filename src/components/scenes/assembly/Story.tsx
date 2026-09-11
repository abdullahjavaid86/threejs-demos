"use client";

import { motion } from "motion/react";
import { Chapter } from "@/components/ui/Chapter";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "6", label: "layers, each its own geometry" },
  { value: "0", label: "external assets requested" },
  { value: "1", label: "canvas, pinned behind the page" },
];

export function Story() {
  return (
    <div className="pointer-events-none relative z-10">
      <section className="flex h-dvh flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="text-label"
          style={{ color: "#e0c9a6" }}
        >
          04 · Scroll-told product story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.65, ease }}
          className="mt-4 text-display text-6xl sm:text-9xl"
        >
          Assembled.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.85, ease }}
          className="mt-6 max-w-md text-base leading-relaxed text-ivory/70"
        >
          A device you take apart by scrolling. Every part is procedural geometry, lit by the same
          studio, choreographed to the page.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="absolute bottom-8 text-label"
        >
          Scroll
        </motion.p>
      </section>

      <Chapter
        numeral="I"
        side="left"
        accent="#e0c9a6"
        title={
          <>
            Six layers.
            <br />
            <em>One gesture.</em>
          </>
        }
        body="Scroll and the device opens up. Each layer lifts by its order in the stack, driven by a single damped progress value read straight from the page."
      />
      <Chapter
        numeral="II"
        side="right"
        accent="#e0c9a6"
        title={
          <>
            Machined from
            <br />
            <em>a single block.</em>
          </>
        }
        body="The camera slides in on the frame while everything else fades back. Focus is a material property here, not a cut."
      />
      <Chapter
        numeral="III"
        side="left"
        accent="#e0c9a6"
        title={
          <>
            The <em>core.</em>
          </>
        }
        body="Closer still. The chip warms as the story reaches it, its glow picked up by bloom so the light reads as light, not paint."
      />
      <Chapter
        numeral="IV"
        side="right"
        accent="#e0c9a6"
        title={
          <>
            Back <em>together.</em>
          </>
        }
        body="The stack closes and the camera pulls out. Every transition is the same interpolation running backwards, so nothing needs a second animation."
      />

      <section className="flex min-h-dvh flex-col justify-center px-6 py-24 sm:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease }}
          className="text-display text-4xl sm:text-7xl"
        >
          Built to be <em>felt.</em>
        </motion.h2>
        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}
              className="bg-ink/80 p-8 backdrop-blur-sm sm:p-10"
            >
              <p className="text-display text-6xl sm:text-7xl">{s.value}</p>
              <p className="mt-3 text-sm text-mist">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
