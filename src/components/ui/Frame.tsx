"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { getNeighbours, type Demo } from "@/lib/demos";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay, ease },
  }),
};

export function Frame({ demo, compact = false }: { demo: Demo; compact?: boolean }) {
  const { prev, next } = getNeighbours(demo.slug);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-6 sm:p-8"
      style={{ ["--accent" as string]: demo.accent }}
    >
      <header className="flex items-start justify-between">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.2}>
          <Link
            href="/"
            className="link-underline pointer-events-auto text-label text-ivory/80 transition-colors hover:text-ivory"
          >
            Three Studies
          </Link>
        </motion.div>

        <motion.nav
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.35}
          className="pointer-events-auto flex items-center gap-5 text-label"
        >
          <Link
            href={`/${prev.slug}`}
            className="link-underline transition-colors hover:text-ivory"
            aria-label={`Previous: ${prev.title}`}
          >
            ← {prev.index}
          </Link>
          <span className="text-ivory">{demo.index}</span>
          <Link
            href={`/${next.slug}`}
            className="link-underline transition-colors hover:text-ivory"
            aria-label={`Next: ${next.title}`}
          >
            {next.index} →
          </Link>
        </motion.nav>
      </header>

      {compact ? null : (
      <footer className="flex items-end justify-between gap-8">
        <div className="max-w-md">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.5}
            className="text-label"
            style={{ color: "var(--accent)" }}
          >
            {demo.index} · {demo.tagline}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.6}
            className="mt-3 text-display text-6xl sm:text-7xl"
          >
            {demo.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.75}
            className="mt-4 hidden max-w-sm text-sm leading-relaxed text-mist sm:block"
          >
            {demo.description}
          </motion.p>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.9}
          className="shrink-0 text-label text-right"
        >
          {demo.hint}
        </motion.p>
      </footer>
      )}
    </div>
  );
}
