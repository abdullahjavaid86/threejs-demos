// Downloads a Sketchfab model's glTF archive and unzips it.
// Reads SKETCHFAB_API_TOKEN from .env (or the environment).
// Usage: node scripts/fetch-sketchfab.mjs <model-uid> <output-dir>
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

if (existsSync(".env")) process.loadEnvFile(".env");

const [uid, outDir] = process.argv.slice(2);
const token = process.env.SKETCHFAB_API_TOKEN;
if (!uid || !outDir) {
  console.error("usage: node scripts/fetch-sketchfab.mjs <uid> <out-dir>");
  process.exit(1);
}
if (!token) {
  console.error("SKETCHFAB_API_TOKEN is not set in .env or the environment");
  process.exit(1);
}

const meta = await fetch(`https://api.sketchfab.com/v3/models/${uid}/download`, {
  headers: { Authorization: `Token ${token}` },
});
if (!meta.ok) {
  console.error(`download request failed: ${meta.status} ${await meta.text()}`);
  process.exit(1);
}
const { gltf } = await meta.json();
if (!gltf?.url) {
  console.error("no glTF archive offered for this model");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const zipPath = join(outDir, `${uid}.zip`);
const archive = await fetch(gltf.url);
writeFileSync(zipPath, Buffer.from(await archive.arrayBuffer()));
execFileSync("unzip", ["-o", "-q", zipPath, "-d", outDir]);
console.log(`unpacked to ${outDir}`);
