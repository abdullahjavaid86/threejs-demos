export type Demo = {
  slug: "nebula" | "prism" | "tides" | "assembly" | "iphone";
  index: string;
  title: string;
  tagline: string;
  description: string;
  hint: string;
  accent: string;
};

export const demos: Demo[] = [
  {
    slug: "nebula",
    index: "01",
    title: "Nebula",
    tagline: "Particle morphology",
    description:
      "Sixty thousand points held in a custom GLSL field, drifting between forms. Move to disturb the cloud, click to pull it into its next shape.",
    hint: "Move to disturb · Click to morph",
    accent: "#8b7cff",
  },
  {
    slug: "prism",
    index: "02",
    title: "Prism",
    tagline: "Refraction & light",
    description:
      "A single glass form, lit by a procedural studio. Real-time transmission with dispersion, bloom and grain. Drag to turn it in your hands.",
    hint: "Drag to orbit",
    accent: "#f2b880",
  },
  {
    slug: "tides",
    index: "03",
    title: "Tides",
    tagline: "Scroll-driven surface",
    description:
      "An ocean described by noise, choreographed to the scroll. The camera descends from a calm horizon into the swell and rises out again.",
    hint: "Scroll to descend",
    accent: "#63c9d6",
  },
  {
    slug: "assembly",
    index: "04",
    title: "Assembly",
    tagline: "Scroll-told product story",
    description:
      "A device built from procedural geometry, pinned in place while the page scrolls past. Each chapter takes it apart, moves in close, and puts it back together.",
    hint: "Scroll to explore",
    accent: "#e0c9a6",
  },
  {
    slug: "iphone",
    index: "05",
    title: "iPhone 12",
    tagline: "Real teardown model, feature story",
    description:
      "A real iPhone 12 teardown model with every part intact. Leader lines point at each feature as the page scrolls, and exploration mode scatters the shell so you can inspect the internals.",
    hint: "Scroll · Explore inside",
    accent: "#8fc3ff",
  },
];

export function getDemo(slug: Demo["slug"]): Demo {
  const demo = demos.find((d) => d.slug === slug);
  if (!demo) throw new Error(`Unknown demo: ${slug}`);
  return demo;
}

export function getNeighbours(slug: Demo["slug"]): { prev: Demo; next: Demo } {
  const i = demos.findIndex((d) => d.slug === slug);
  return {
    prev: demos[(i - 1 + demos.length) % demos.length],
    next: demos[(i + 1) % demos.length],
  };
}
