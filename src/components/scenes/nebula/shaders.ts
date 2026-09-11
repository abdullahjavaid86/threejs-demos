export const noise = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uFrom;
uniform float uTo;
uniform float uProgress;
uniform vec3 uPointer;
uniform float uPointerStrength;
uniform float uPixelRatio;
uniform float uSize;

attribute vec3 aForm0;
attribute vec3 aForm1;
attribute vec3 aForm2;
attribute vec3 aRandom;

varying float vAlpha;
varying float vMix;

${noise}

vec3 pick(float i) {
  if (i < 0.5) return aForm0;
  if (i < 1.5) return aForm1;
  return aForm2;
}

void main() {
  vec3 from = pick(uFrom);
  vec3 to = pick(uTo);

  // Staggered, eased progress so the cloud moves as a wave rather than in lockstep.
  float p = clamp((uProgress - aRandom.x * 0.4) / 0.6, 0.0, 1.0);
  p = p * p * (3.0 - 2.0 * p);

  vec3 pos = mix(from, to, p);

  // Arc outward mid-transition to avoid the flat cross-fade look.
  vec3 dir = normalize(from + to + vec3(0.0001));
  pos += dir * sin(p * 3.14159265) * (0.5 + aRandom.y * 0.9);

  // Slow breathing displacement.
  float t = uTime * 0.18;
  vec3 drift = vec3(
    snoise(pos * 0.9 + vec3(t, 0.0, 0.0)),
    snoise(pos * 0.9 + vec3(0.0, t, 31.7)),
    snoise(pos * 0.9 + vec3(77.3, 0.0, t))
  );
  pos += drift * 0.09;

  // Pointer repulsion in object space.
  vec3 away = pos - uPointer;
  float dist = length(away);
  float push = smoothstep(1.1, 0.0, dist) * uPointerStrength;
  pos += normalize(away + vec3(0.0001)) * push * 0.7;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float depth = -mvPosition.z;
  gl_PointSize = uSize * uPixelRatio * (0.5 + aRandom.z) * (6.0 / depth);

  vAlpha = smoothstep(14.0, 3.0, depth) * (0.35 + aRandom.z * 0.65);
  vMix = clamp(length(pos) / 2.6 + aRandom.y * 0.25 + push * 0.6, 0.0, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;

varying float vAlpha;
varying float vMix;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float disc = smoothstep(0.5, 0.08, d);
  disc = pow(disc, 1.6);
  vec3 color = mix(uColorA, uColorB, vMix);
  float a = disc * vAlpha;
  gl_FragColor = vec4(color * a, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
