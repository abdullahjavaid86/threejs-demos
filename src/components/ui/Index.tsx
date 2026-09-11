"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { demos } from "@/lib/demos";

const ease = [0.16, 1, 0.3, 1] as const;

export function Index() {
  return (
    <main className="flex min-h-dvh flex-col justify-between p-6 sm:p-8">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="flex items-start justify-between text-label"
      >
        <span className="text-ivory/80">Three Studies</span>
        <span>WebGL · 2026</span>
      </motion.header>

      <section className="my-16 sm:my-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="max-w-md text-sm leading-relaxed text-mist"
        >
          Three interactive scenes, one idea each. Built with real-time shaders, physically based
          light and scroll choreography — the kind of motion that makes a product feel alive.
        </motion.p>

        <ul className="mt-12 border-t border-line">
          {demos.map((demo, i) => (
            <motion.li
              key={demo.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease }}
              className="border-b border-line"
              style={{ ["--accent" as string]: demo.accent }}
            >
              <Link
                href={`/${demo.slug}`}
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 sm:grid-cols-[6rem_1fr_auto] sm:py-9"
              >
                <span className="text-label transition-colors duration-500 group-hover:text-(--accent)">
                  {demo.index}
                </span>
                <span className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="text-display text-5xl transition-transform duration-700 ease-(--ease-out-expo) group-hover:translate-x-3 sm:text-7xl">
                    {demo.title}
                  </span>
                  <span className="text-label">{demo.tagline}</span>
                </span>
                <span
                  aria-hidden
                  className="text-display text-3xl text-mist opacity-0 transition-all duration-700 ease-(--ease-out-expo) group-hover:translate-x-1 group-hover:opacity-100 sm:text-4xl"
                >
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="flex flex-wrap items-center justify-between gap-4 text-label"
      >
        <span>Next.js 16 · React 19 · Three.js r186 · React Three Fiber 9</span>
        <span>Best viewed on desktop with a pointer</span>
      </motion.footer>
    </main>
  );
}
