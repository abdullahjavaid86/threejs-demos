# Three Studies

Three interactive WebGL scenes, one per page, built as a client-facing showcase.

| Route     | Scene  | Idea                                                                  |
| --------- | ------ | --------------------------------------------------------------------- |
| `/nebula` | Nebula | 60k-point GPU particle field morphing between forms, pointer-reactive |
| `/prism`  | Prism  | Real-time glass transmission with dispersion, procedural studio light |
| `/tides`  | Tides  | Scroll-driven ocean surface with shader displacement and camera rig   |

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
  app/                 routes: /, /nebula, /prism, /tides
  lib/demos.ts         demo registry (titles, copy, accents, ordering)
  components/ui/       Frame (page chrome), Stage (canvas + reveal), Index, SceneLoader
  components/scenes/   one folder per scene: shaders, geometry, rig, scene entry
```

Every scene is loaded client-side only via `next/dynamic`, so pages stay static and the WebGL bundle is only fetched on the page that needs it. No external assets are requested at runtime: environments are procedural `Lightformer` rigs and all materials are custom GLSL or built-in three.js materials.
