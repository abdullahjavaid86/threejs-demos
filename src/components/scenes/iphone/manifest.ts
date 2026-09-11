/**
 * Mapping of the "iPhone 12 Teardown" model's named parts to the page.
 * Offsets are in phone-oriented world units: the phone stands 2.31 units tall,
 * faces +z, and its left side (volume buttons) is at -x.
 */
export const MODEL_URL = "/models/iphone-12-teardown.glb";
export const MODEL_HEIGHT_M = 0.147;
export const PHONE_HEIGHT = 2.31;

export const credit = {
  title: "iPhone 12 Teardown",
  url: "https://sketchfab.com/3d-models/iphone-12-teardown-708eaa5d195544918e5f70b69eedcdfa",
  author: "Peter_D",
  authorUrl: "https://sketchfab.com/better_peter",
  license: "CC BY 4.0",
  licenseUrl: "http://creativecommons.org/licenses/by/4.0/",
};

export type Vec = [number, number, number];

/** Where each part travels when the phone is fully scattered. Unlisted parts stay put. */
export const scatter: Record<string, Vec> = {
  front_panel: [0.55, 0.15, 1.9],
  front_panel_screw01: [0.55, 0.15, 1.9],
  front_panel_screw02: [0.55, 0.15, 1.9],
  front_panel_screw03: [0.55, 0.15, 1.9],
  front_panel_screw04: [0.55, 0.15, 1.9],
  earspeaker: [0.55, 0.15, 1.9],
  glue_sticker: [0.3, 0.08, 1.35],
  front_cam: [0.2, 0.4, 1.0],
  front_sensor: [0.2, 0.4, 1.0],
  front_cam_bracket: [0.2, 0.4, 1.0],
  motherboard: [-0.5, 0.05, 0.55],
  motherboard_cover: [-0.5, 0.15, 0.75],
  motherboard_cables_cover: [-0.5, -0.05, 0.7],
  cover_flex_cables: [-0.5, 0, 0.7],
  wifi_antenn: [-0.3, 0.35, 0.7],
  simholder: [-0.7, 0, 0.2],
  simholder_box: [-0.55, 0, 0.25],
  simholder_cable_cover: [-0.5, -0.05, 0.3],
  battery: [0.5, 0, 0.5],
  taptick: [-0.4, -0.4, 0.5],
  speaker: [0.4, -0.45, 0.5],
  speaker_cover: [0.4, -0.55, 0.45],
  charging_cable: [0, -0.35, 0.35],
  charging_port: [0, -0.45, 0.1],
  mic: [0.2, -0.45, 0.15],
  cover: [0.3, -0.55, 0.2],
  inside_power_port: [0, -0.5, 0.1],
  grid_wires: [0, -0.55, 0.12],
  Screws_special_003: [0, -0.4, 0.25],
  screw_pentalobe: [0, -0.3, 0],
  wireless_charge: [0.1, 0, -0.65],
  magnets: [0.1, 0, -0.95],
  backplate: [0, -0.1, -1.25],
  back_cover: [-0.3, -0.15, -1.9],
  back_cam_glass: [-0.3, -0.15, -1.9],
  back_cam: [0.25, 0.3, -0.85],
  back_cam_cover: [0.25, 0.3, -0.6],
  inside_cam_holder: [0.25, 0.3, -0.35],
  flashlight: [0.1, 0.35, -1.0],
  flashlight_dummy: [0.1, 0.35, -0.75],
  antenn: [0, 0.4, -0.5],
  btn_off: [0.3, 0, 0],
  btn_off_gears: [0.3, 0, 0],
  btn_volume_up: [-0.3, 0, 0],
  btn_volume_up_gears: [-0.3, 0, 0],
  btn_volume_down: [-0.3, 0, 0],
  btn_volume_down_gears: [-0.3, 0, 0],
  btn_volume_off: [-0.3, 0, 0],
};

export type ExploreLabel = { part: string; name: string; spec?: string; end: Vec };

/** Labels shown in exploration mode, anchored at each part's centre. */
export const exploreLabels: ExploreLabel[] = [
  {
    part: "front_panel",
    name: "Display assembly",
    spec: "6.1-inch Super Retina XDR OLED under Ceramic Shield",
    end: [0.8, 0.6, 0],
  },
  {
    part: "front_cam",
    name: "TrueDepth camera",
    spec: "Face ID projector, flood illuminator and 12 MP camera",
    end: [-0.7, 0.5, 0],
  },
  {
    part: "motherboard",
    name: "Logic board",
    spec: "A14 Bionic, 4 GB RAM, storage and the 5G modem",
    end: [-0.95, 0.35, 0],
  },
  { part: "battery", name: "Battery", spec: "3.83 V · 2815 mAh", end: [0.85, -0.3, 0] },
  {
    part: "taptick",
    name: "Taptic Engine",
    spec: "Linear actuator for haptics",
    end: [-0.8, -0.5, 0],
  },
  { part: "speaker", name: "Speaker", end: [0.8, -0.55, 0] },
  {
    part: "charging_cable",
    name: "Lightning flex assembly",
    spec: "Port, microphones and antenna feeds",
    end: [0.35, -0.9, 0],
  },
  {
    part: "wireless_charge",
    name: "MagSafe coil",
    spec: "Wireless charging up to 15 W",
    end: [0.9, 0.2, 0],
  },
  {
    part: "magnets",
    name: "Magnet array",
    spec: "Aligns MagSafe accessories",
    end: [0.95, -0.05, 0],
  },
  {
    part: "back_cam",
    name: "Camera module",
    spec: "Dual 12 MP: wide and ultra wide",
    end: [0.85, 0.5, 0],
  },
  { part: "flashlight", name: "True Tone flash", end: [0.6, 0.75, 0] },
  { part: "back_cover", name: "Glass back", end: [-0.8, -0.6, 0] },
  {
    part: "backplate",
    name: "Rear shield",
    spec: "Graphite and copper heat spreader",
    end: [-0.75, 0.15, 0],
  },
  { part: "antenn", name: "5G antenna", end: [-0.3, 0.65, 0] },
  { part: "wifi_antenn", name: "Wi-Fi antenna", end: [-0.85, 0.65, 0] },
  { part: "simholder", name: "SIM tray", end: [-0.95, -0.05, 0] },
];

export type StoryCallout = {
  part: string;
  label: string;
  detail?: string;
  anchorOffset?: Vec;
  end: Vec;
  window: [number, number];
};

const FRONT: [number, number] = [0.08, 0.24];
const BACK: [number, number] = [0.26, 0.42];
const SIDE: [number, number] = [0.43, 0.58];
const BOTTOM: [number, number] = [0.6, 0.75];
const INSIDE: [number, number] = [0.79, 0.92];

/** Leader lines that appear during the scroll story. */
export const storyCallouts: StoryCallout[] = [
  {
    part: "front_panel",
    label: "6.1-inch Super Retina XDR",
    detail: "OLED, 2532 × 1170, HDR. Ceramic Shield glass, four times tougher against drops.",
    anchorOffset: [0.15, -0.25, 0.04],
    end: [0.8, -0.3, 0],
    window: FRONT,
  },
  {
    part: "front_cam",
    label: "TrueDepth camera",
    detail: "Face ID and a 12 MP selfie camera in the notch.",
    anchorOffset: [0, 0, 0.04],
    end: [-0.8, 0.25, 0],
    window: FRONT,
  },
  {
    part: "earspeaker",
    label: "Receiver",
    anchorOffset: [0, 0.02, 0.04],
    end: [0.75, 0.3, 0],
    window: FRONT,
  },

  {
    part: "back_cam",
    label: "Dual 12 MP cameras",
    detail: "Wide and Ultra Wide, Night mode on both. 4K Dolby Vision video.",
    anchorOffset: [0, 0, -0.04],
    end: [0.75, 0.3, 0],
    window: BACK,
  },
  {
    part: "flashlight",
    label: "True Tone flash",
    anchorOffset: [0, 0, -0.04],
    end: [0.65, -0.4, 0],
    window: BACK,
  },
  {
    part: "back_cover",
    label: "Glass back with MagSafe",
    detail: "A ring of magnets aligns chargers and accessories.",
    anchorOffset: [-0.1, -0.4, -0.02],
    end: [-0.8, -0.45, 0],
    window: BACK,
  },

  {
    part: "btn_volume_off",
    label: "Ring / Silent",
    anchorOffset: [-0.02, 0, 0],
    end: [-0.8, 0.45, 0.3],
    window: SIDE,
  },
  {
    part: "btn_volume_up",
    label: "Volume",
    anchorOffset: [-0.02, -0.1, 0],
    end: [-0.8, 0.05, 0.3],
    window: SIDE,
  },
  {
    part: "simholder",
    label: "SIM tray",
    anchorOffset: [-0.03, 0, 0],
    end: [-0.8, -0.4, 0.3],
    window: SIDE,
  },
  {
    part: "btn_off",
    label: "Side button",
    detail: "Siri, Apple Pay, sleep and wake.",
    anchorOffset: [0.02, 0, 0],
    end: [0.3, 0.9, 0.3],
    window: SIDE,
  },

  {
    part: "charging_port",
    label: "Lightning connector",
    anchorOffset: [0, -0.06, 0.02],
    end: [0.55, -0.5, 0.45],
    window: BOTTOM,
  },
  {
    part: "speaker",
    label: "Speaker",
    anchorOffset: [0.1, -0.12, 0.02],
    end: [0.9, -0.3, 0.45],
    window: BOTTOM,
  },
  {
    part: "mic",
    label: "Microphone",
    anchorOffset: [-0.05, -0.1, 0.02],
    end: [-0.9, -0.3, 0.45],
    window: BOTTOM,
  },
  {
    part: "screw_pentalobe",
    label: "Pentalobe screws",
    detail: "Two, either side of the port. The first step of every teardown.",
    anchorOffset: [-0.1, -0.05, 0.02],
    end: [-0.55, -0.6, 0.4],
    window: BOTTOM,
  },

  {
    part: "motherboard",
    label: "A14 Bionic logic board",
    detail: "5-nanometre chip, 11.8 billion transistors, on a stacked two-layer board.",
    end: [-0.9, 0.45, 0.3],
    window: INSIDE,
  },
  {
    part: "battery",
    label: "2815 mAh battery",
    detail: "Up to 17 hours of video playback.",
    end: [0.9, -0.35, 0.3],
    window: INSIDE,
  },
  { part: "taptick", label: "Taptic Engine", end: [-0.85, -0.5, 0.3], window: INSIDE },
];
