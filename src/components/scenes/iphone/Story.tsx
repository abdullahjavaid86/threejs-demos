"use client";

import { motion } from "motion/react";
import { Chapter } from "@/components/ui/Chapter";
import { credit } from "./manifest";
import { exploreStore, useExplore } from "./store";

const ease = [0.16, 1, 0.3, 1] as const;
const ACCENT = "#8fc3ff";

const stats = [
  { value: "A14", label: "Bionic, the first 5-nanometre phone chip" },
  { value: "5G", label: "with Smart Data Mode" },
  { value: "2815 mAh", label: "battery behind a MagSafe coil" },
];

export function Story() {
  const explore = useExplore();

  return (
    <motion.div
      animate={{ opacity: explore ? 0 : 1 }}
      transition={{ duration: 0.8, ease }}
      className="pointer-events-none relative z-10"
      aria-hidden={explore}
    >
      <section className="flex h-dvh flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="text-label"
          style={{ color: ACCENT }}
        >
          05 · Real teardown model · 2020
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.65, ease }}
          className="mt-4 text-display text-6xl sm:text-9xl"
        >
          iPhone 12
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.85, ease }}
          className="mt-6 max-w-md text-base leading-relaxed text-ivory/70"
        >
          A real disassembly model, every part in place. Scroll to walk around it, then open it up
          to see what is inside.
        </motion.p>
      </section>

      <Chapter
        numeral="I"
        side="right"
        accent={ACCENT}
        title={
          <>
            Everything on
            <br />
            <em>one surface.</em>
          </>
        }
        body="A 6.1-inch Super Retina XDR display under Ceramic Shield, with the TrueDepth camera and receiver in the notch."
      />
      <Chapter
        numeral="II"
        side="left"
        accent={ACCENT}
        title={
          <>
            Turn it <em>over.</em>
          </>
        }
        body="Two 12 MP cameras with Night mode on both, a True Tone flash, and a glass back hiding a ring of MagSafe magnets."
      />
      <Chapter
        numeral="III"
        side="right"
        accent={ACCENT}
        title={
          <>
            Controls you
            <br />
            <em>can feel.</em>
          </>
        }
        body="A flat aluminium band with the ring switch, volume and SIM tray on the left and the side button on the right."
      />
      <Chapter
        numeral="IV"
        side="left"
        accent={ACCENT}
        title={
          <>
            The <em>underside.</em>
          </>
        }
        body="The Lightning connector between the speaker and the microphone, held shut by two pentalobe screws."
      />
      <Chapter
        numeral="V"
        side="left"
        accent={ACCENT}
        title={
          <>
            What made it
            <br />
            <em>fast.</em>
          </>
        }
        body={
          <>
            <p>
              The A14 Bionic on a stacked logic board, a 2815 mAh battery, and the Taptic Engine.
              Every part here is from the teardown model, not a stand-in.
            </p>
            <button
              type="button"
              onClick={() => exploreStore.set({ explore: true })}
              className="link-underline pointer-events-auto mt-6 text-label text-ivory"
            >
              Explore inside →
            </button>
          </>
        }
      />

      <section className="flex min-h-dvh flex-col justify-center px-6 py-24 sm:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease }}
          className="text-display text-4xl sm:text-7xl"
        >
          Taken <em>apart.</em>
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
              <p className="text-display text-5xl sm:text-6xl">{s.value}</p>
              <p className="mt-3 text-sm text-mist">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="pointer-events-auto mt-8 text-xs leading-relaxed text-mist">
          Model: “
          <a
            href={credit.url}
            className="link-underline text-ivory/80"
            target="_blank"
            rel="noreferrer"
          >
            {credit.title}
          </a>
          ” by{" "}
          <a
            href={credit.authorUrl}
            className="link-underline text-ivory/80"
            target="_blank"
            rel="noreferrer"
          >
            {credit.author}
          </a>
          , licensed under{" "}
          <a
            href={credit.licenseUrl}
            className="link-underline text-ivory/80"
            target="_blank"
            rel="noreferrer"
          >
            {credit.license}
          </a>
          . Decimated and compressed for the web.
        </p>
      </section>
    </motion.div>
  );
}
