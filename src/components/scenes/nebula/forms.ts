export const DESKTOP_COUNT = 60_000;
export const MOBILE_COUNT = 28_000;

type Forms = {
  form0: Float32Array;
  form1: Float32Array;
  form2: Float32Array;
  random: Float32Array;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sphere (fibonacci), torus and three-arm galaxy targets plus per-point seeds. */
export function buildForms(COUNT: number): Forms {
  const rand = mulberry32(1337);
  const form0 = new Float32Array(COUNT * 3);
  const form1 = new Float32Array(COUNT * 3);
  const form2 = new Float32Array(COUNT * 3);
  const random = new Float32Array(COUNT * 3);

  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < COUNT; i++) {
    const o = i * 3;

    // Sphere: a soft shell with a sparser interior so it reads as volume, not a surface.
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const interior = rand() < 0.35;
    const shell = interior ? Math.cbrt(rand()) * 1.6 : 1.7 + (rand() - 0.5) * 0.25;
    form0[o] = Math.cos(theta) * r * shell;
    form0[o + 1] = y * shell;
    form0[o + 2] = Math.sin(theta) * r * shell;

    // Torus with a thicker tube on the far side for asymmetry.
    const u = rand() * Math.PI * 2;
    const v = rand() * Math.PI * 2;
    const tube = 0.42 + Math.pow(rand(), 2) * 0.22;
    const ring = 1.35;
    form1[o] = (ring + tube * Math.cos(v)) * Math.cos(u);
    form1[o + 1] = tube * Math.sin(v) * 0.9;
    form1[o + 2] = (ring + tube * Math.cos(v)) * Math.sin(u);

    // Galaxy: three arms, tighter near the core.
    const arm = i % 3;
    const radius = Math.pow(rand(), 0.65) * 2.6;
    const spin = radius * 1.9;
    const spread = (1 - radius / 2.6) * 0.35 + 0.05;
    const angle = (arm / 3) * Math.PI * 2 + spin + (rand() - 0.5) * spread * 2;
    const scatter = (rand() - 0.5) * spread;
    form2[o] = Math.cos(angle) * radius + scatter;
    form2[o + 1] = (rand() - 0.5) * (0.25 - radius * 0.06) + (rand() - 0.5) * 0.05;
    form2[o + 2] = Math.sin(angle) * radius + scatter;

    random[o] = rand();
    random[o + 1] = rand();
    random[o + 2] = rand();
  }

  return { form0, form1, form2, random };
}
