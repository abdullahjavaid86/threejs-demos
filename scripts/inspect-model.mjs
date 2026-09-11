// Prints the node tree of a glTF/GLB with mesh sizes, so parts can be mapped to callouts.
// Usage: node scripts/inspect-model.mjs <file.glb>
import { NodeIO, getBounds } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import draco3d from "draco3dgltf";
import { MeshoptDecoder } from "meshoptimizer";

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/inspect-model.mjs <file.glb>");
  process.exit(1);
}

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  "draco3d.decoder": await draco3d.createDecoderModule(),
  "meshopt.decoder": MeshoptDecoder,
});
const doc = await io.read(file);
const root = doc.getRoot();

function fmt(v) {
  return v.map((n) => n.toFixed(3)).join(", ");
}

function walk(node, depth) {
  const mesh = node.getMesh();
  const tris = mesh
    ? mesh
        .listPrimitives()
        .reduce(
          (n, p) => n + (p.getIndices()?.getCount() ?? p.getAttribute("POSITION").getCount()) / 3,
          0,
        )
    : 0;
  const b = getBounds(node);
  const centre = b.min.map((m, i) => (m + b.max[i]) / 2);
  const size = b.max.map((m, i) => m - b.min[i]);
  console.log(
    `${"  ".repeat(depth)}${node.getName() || "(unnamed)"}` +
      (mesh ? `  [${Math.round(tris)} tris]` : "") +
      `  centre(${fmt(centre)}) size(${fmt(size)})`,
  );
  for (const child of node.listChildren()) walk(child, depth + 1);
}

for (const scene of root.listScenes()) {
  console.log(`scene: ${scene.getName() || "(unnamed)"}`);
  for (const node of scene.listChildren()) walk(node, 1);
}
console.log(
  `materials: ${root
    .listMaterials()
    .map((m) => m.getName())
    .join(", ")}`,
);
console.log(`textures: ${root.listTextures().length}`);
