# Three Studies

Three interactive WebGL scenes, one per page, built as a client-facing showcase.

| Route       | Scene     | Idea                                                                                                                                        |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `/nebula`   | Nebula    | 60k-point GPU particle field morphing between forms, pointer-reactive                                                                       |
| `/prism`    | Prism     | Real-time glass transmission with dispersion, procedural studio light                                                                       |
| `/tides`    | Tides     | Scroll-driven ocean surface with shader displacement and camera rig                                                                         |
| `/assembly` | Assembly  | Apple-style product story: a procedural device pinned in a fixed canvas explodes, refocuses and reassembles as the page scrolls             |
| `/iphone`   | iPhone 12 | Feature story with leader-line callouts on a real teardown model, plus an exploration mode that scatters the shell and labels the internals |

## Stack

- Next.js 16 (App Router, React Compiler, Turbopack)
- React 19, Three.js r186
- React Three Fiber 9, Drei 10, React Postprocessing 3
- Motion 13 for interface transitions
- Tailwind CSS 4
- oxlint + oxfmt + `tsc --noEmit` as quality gates

## Scripts

```sh
yarn dev        # start the dev server
yarn build      # production build
yarn start      # serve the production build
yarn lint       # oxlint
yarn format     # oxfmt (writes)
yarn typecheck  # tsc --noEmit
yarn check      # lint + typecheck + format check
```

## Layout

```
src/
  app/                 routes: /, /nebula, /prism, /tides, /assembly, /iphone
  lib/keyframes.ts     piecewise smoothstep interpolation shared by the scroll-driven scenes
  lib/demos.ts         demo registry (titles, copy, accents, ordering)
  components/ui/       Frame (page chrome), Stage (canvas + reveal), Index, SceneLoader
  components/scenes/   one folder per scene: shaders, geometry, rig, scene entry
```

Every scene is loaded client-side only via `next/dynamic`, so pages stay static and the WebGL bundle is only fetched on the page that needs it. Environments are procedural `Lightformer` rigs and materials are custom GLSL or built-in three.js materials. The only asset is the iPhone model below.

## Model credit

`/iphone` uses "iPhone 12 Teardown" by Peter_D, licensed CC BY 4.0. Source: https://sketchfab.com/3d-models/iphone-12-teardown-708eaa5d195544918e5f70b69eedcdfa

The raw download lives in `public/models/src/` (git-ignored). `public/models/iphone-12-teardown.glb` is the web build: simplified to half the vertices, WebP textures at 1024 px, meshopt compression, node hierarchy preserved.

```sh
node scripts/fetch-sketchfab.mjs <uid> public/models/src        # needs SKETCHFAB_API_TOKEN in .env
node scripts/inspect-model.mjs public/models/src/scene.gltf     # node tree with sizes and centres
npx gltf-transform optimize public/models/src/scene.gltf public/models/iphone-12-teardown.glb \
  --flatten false --join false --instance false --palette false \
  --simplify true --simplify-ratio 0.5 --simplify-error 0.0005 \
  --texture-compress webp --texture-size 1024 --compress meshopt
```
