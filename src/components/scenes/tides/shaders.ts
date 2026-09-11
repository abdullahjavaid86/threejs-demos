import { noise } from "@/components/scenes/nebula/shaders";

export const oceanVertex = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vViewPos;

#include <fog_pars_vertex>

${noise}

float height(vec2 p) {
  float t = uTime;
  float h = snoise(vec3(p * 0.22, t * 0.35));
  h += snoise(vec3(p * 0.55 + 3.1, t * 0.5)) * 0.4;
  h += snoise(vec3(p * 1.3 - 7.0, t * 0.8)) * 0.14;
  // Sharpen crests slightly so the swell reads as water, not cloth.
  h = h - 0.15 * h * h;
  return h * uAmplitude;
}

void main() {
  vec3 pos = position;
  float e = height(pos.xy);
  pos.z += e;

  float eps = 0.06;
  float ex = height(pos.xy + vec2(eps, 0.0));
  float ey = height(pos.xy + vec2(0.0, eps));
  vec3 n = normalize(vec3(-(ex - e) / eps, -(ey - e) / eps, 1.0));

  vNormal = normalize(normalMatrix * n);
  vElevation = e;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vViewPos = mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;

  #include <fog_vertex>
}
`;

export const oceanFragment = /* glsl */ `
uniform float uAmplitude;
uniform vec3 uDeep;
uniform vec3 uShallow;
uniform vec3 uCrest;
uniform vec3 uSunDir;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vViewPos;

#include <fog_pars_fragment>

void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(-vViewPos);
  vec3 l = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);

  float rel = vElevation / max(uAmplitude, 0.001);
  vec3 col = mix(uDeep, uShallow, smoothstep(-1.0, 1.0, rel));

  float fresnel = pow(1.0 - max(dot(n, v), 0.0), 3.0);
  col = mix(col, uShallow * 1.15, fresnel * 0.6);

  float diffuse = max(dot(n, l), 0.0);
  col *= 0.55 + diffuse * 0.6;

  float spec = pow(max(dot(reflect(-l, n), v), 0.0), 90.0);
  col += uCrest * spec * 0.9;

  float foam = smoothstep(0.55, 0.95, rel) * smoothstep(0.2, 1.4, uAmplitude);
  col = mix(col, uCrest, foam * 0.7);

  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  // Fog last, in output space, matching three's built-in materials.
  #include <fog_fragment>
}
`;

export const skyVertex = /* glsl */ `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const skyFragment = /* glsl */ `
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSun;
uniform vec3 uSunDir;
varying vec3 vDir;
void main() {
  float y = clamp(vDir.y, -0.2, 1.0);
  vec3 col = mix(uHorizon, uZenith, smoothstep(0.0, 0.5, y));
  float s = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
  col += uSun * (pow(s, 400.0) * 1.4 + pow(s, 28.0) * 0.28);
  // No tone mapping: the horizon must encode to exactly the fog colour.
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;
