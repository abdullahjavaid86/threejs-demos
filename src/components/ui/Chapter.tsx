"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type ChapterProps = {
  numeral: string;
  title: ReactNode;
  body: ReactNode;
  side: "left" | "right";
  accent: string;
};

/** A tall section whose text pins mid-viewport and fades with its own scroll progress. */
export function Chapter({ numeral, title, body, side, accent }: ChapterProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.62, 0.8], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.4, 0.62, 0.8], [48, 0, 0, -48]);

  return (
    <section
      ref={ref}
      className={`flex min-h-[140vh] px-6 sm:px-16 ${side === "left" ? "justify-start" : "justify-end"}`}
    >
      <motion.div style={{ opacity, y }} className="sticky top-[38vh] h-fit max-w-xs sm:max-w-md">
        <p className="text-label" style={{ color: accent }}>
          {numeral}
        </p>
        <h2 className="mt-3 text-display text-4xl sm:text-6xl">{title}</h2>
        <div className="mt-5 text-sm leading-relaxed text-ivory/70 sm:text-base">{body}</div>
      </motion.div>
    </section>
  );
}
