"use client";

import { useEffect, useRef } from "react";
// A full-screen WebGL layer that draws a soft, organic light around the
// cursor — tuned to the Oevra reference: a 12-point trail of wobbling
// halos (egg-shaped lobes, two sine layers), a wide soft glow plus a thin
// ring, a slow eased follow (0.08 per 60fps frame), and a halo that swells
// ~1.4x over links and buttons. It's a real-time fragment shader, not a
// styled div. Colours follow the page theme (light / dark sections) via
// themeState. Disabled on touch devices and for prefers-reduced-motion.

import { themeState } from "../lib/themeState";

const TRAIL_LEN = 12;

const VERTEX_SRC = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uTrail[${TRAIL_LEN}];
uniform int uTrailCount;
uniform vec3 uColor;
uniform vec3 uOutlineColor;
uniform float uHaloSize;
uniform float uGlow;
uniform float uOutlineOpacity;

const float GLOW_MUL = 2.0;
const float ORGANIC_AMP = 0.4;
const float ORGANIC_FREQ = 1.0;
const float WOBBLE_SPEED = 1.2;

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;

  // Premultiplied accumulation: each layer composites OVER the last, so
  // the final colour is the true blend of halo/ring colours — mixing into
  // black (the old approach) turned the glow into a dark smudge.
  vec3 pm = vec3(0.0);
  float alpha = 0.0;

  for (int i = 0; i < ${TRAIL_LEN}; i++) {
    if (i >= uTrailCount) break;

    vec2 rel = uv - uTrail[i];
    float r = length(rel);
    float angle = atan(rel.y, rel.x);

    float falloff = 1.0 - float(i) / float(uTrailCount);
    falloff = pow(falloff, 1.8);
    float sizeScale = 0.8 + 0.5 * falloff;

    // Two layered sine waves around the edge — the "living blob" outline.
    float wobble = 0.7 * sin(angle * ORGANIC_FREQ + uTime * WOBBLE_SPEED + float(i) * 0.3);
    wobble += 0.3 * sin(angle * (ORGANIC_FREQ * 2.0) - uTime * (WOBBLE_SPEED * 1.35) + float(i) * 0.6);
    float lobes = 1.0 + ORGANIC_AMP * wobble;
    float d = r / max(lobes, 0.25);

    float size = uHaloSize * sizeScale;

    // Wide soft glow. smoothstep(edge0, edge1, x) is only defined for
    // edge0 < edge1, so every falling ramp is written as 1 - rise.
    float glow = 1.0 - smoothstep(size, size * GLOW_MUL, d);
    float glowStrength = glow * uGlow * falloff;
    pm = pm * (1.0 - glowStrength) + uColor * glowStrength;
    alpha = alpha * (1.0 - glowStrength) + glowStrength;

    // Thin ring hugging the edge: crisp head, fainter along the trail.
    float rise = smoothstep(size * 0.78, size * 0.97, d);
    float fall = 1.0 - smoothstep(size * 0.97, size * 1.16, d);
    float ring = rise * fall;
    float ringStrength = ring * uOutlineOpacity * (i == 0 ? falloff : 0.3);
    pm = pm * (1.0 - ringStrength) + uOutlineColor * ringStrength;
    alpha = alpha * (1.0 - ringStrength) + ringStrength;
  }

  gl_FragColor = vec4(pm / max(alpha, 0.0001), alpha);
}
`;

function compile(gl, type, src) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const mix3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const rgb = (r, g, b) => [r / 255, g / 255, b / 255];

// Colours per situation. "light" = over pale sections, "dark" = over the
// near-black ones; "hover" = over a link or button (Oevra turns the halo
// olive there and swells it).
const HALO_LIGHT = rgb(185, 255, 128);
const HALO_DARK = rgb(215, 227, 196);
const HALO_HOVER_LIGHT = rgb(86, 120, 59);
const HALO_HOVER_DARK = rgb(234, 255, 194);
const RING_LIGHT = rgb(95, 122, 53);
const RING_DARK = rgb(234, 255, 194);

const BASE_SIZE = 0.12;
const INTERACTIVE = "a, button, [role='button'], summary, input, textarea, [data-halo-size]";

export default function CursorHalo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia && !window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One full-screen triangle, cheaper than a quad.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const u = (n) => gl.getUniformLocation(program, n);
    const uResolution = u("uResolution");
    const uTime = u("uTime");
    const uTrail = u("uTrail");
    const uTrailCount = u("uTrailCount");
    const uColor = u("uColor");
    const uOutlineColor = u("uOutlineColor");
    const uHaloSize = u("uHaloSize");
    const uGlow = u("uGlow");
    const uOutlineOpacity = u("uOutlineOpacity");

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // Trail: point 0 eases toward the raw cursor; each later point eases
    // toward the one before it, so the whole thing flows instead of
    // snapping to each new mouse position.
    const trail = new Float32Array(TRAIL_LEN * 2);
    const target = { x: 0, y: 0 };
    let haveTarget = false;
    let active = false;
    let raf = null;
    const startTime = performance.now();
    let last = startTime;
    let hidden = document.hidden;

    // Hover state — size and colour ease toward their targets.
    let hoverTarget = 0; // 0 = normal, 1 = over a link/button
    let hoverT = 0;
    let sizeMul = 1; // current size multiplier
    let sizeMulTarget = 1;

    // Matches the shader's own `uv.x *= aspect` — the trail must live in
    // the same aspect-corrected space the fragment shader compares it to.
    const toUv = (clientX, clientY) => {
      const aspect = width / height;
      return [((clientX / width) * 2 - 1) * aspect, -((clientY / height) * 2 - 1)];
    };

    const onMove = (e) => {
      const [ux, uy] = toUv(e.clientX, e.clientY);
      target.x = ux;
      target.y = uy;
      if (!haveTarget) {
        haveTarget = true;
        for (let i = 0; i < TRAIL_LEN; i++) {
          trail[i * 2] = ux;
          trail[i * 2 + 1] = uy;
        }
      }
      const el = e.target && e.target.closest ? e.target.closest(INTERACTIVE) : null;
      if (el) {
        const attr = parseFloat(el.getAttribute("data-halo-size"));
        hoverTarget = 1;
        sizeMulTarget = Number.isFinite(attr) ? attr : 1.4;
      } else {
        hoverTarget = 0;
        sizeMulTarget = 1;
      }
      if (!active) {
        active = true;
        canvas.style.opacity = "1";
      }
      kick();
    };

    const onLeave = () => {
      active = false;
      canvas.style.opacity = "0";
    };

    const onVisibility = () => {
      hidden = document.hidden;
      if (!hidden) kick();
    };

    const kick = () => {
      if (!raf && !hidden) raf = requestAnimationFrame(frame);
    };

    const HEAD_EASE = 0.08; // Oevra: 0.08 per 60fps frame
    const CHAIN_EASE = 0.55;

    const frame = (now) => {
      raf = null;
      if (hidden) return;

      // Frame-rate independent easing (60fps = 1.0).
      const k = Math.min((now - last) / 16.667, 3);
      last = now;
      const head = Math.min(HEAD_EASE * k, 1);
      const chain = Math.min(CHAIN_EASE * k, 1);

      trail[0] += (target.x - trail[0]) * head;
      trail[1] += (target.y - trail[1]) * head;
      for (let i = 1; i < TRAIL_LEN; i++) {
        trail[i * 2] += (trail[(i - 1) * 2] - trail[i * 2]) * chain;
        trail[i * 2 + 1] += (trail[(i - 1) * 2 + 1] - trail[i * 2 + 1]) * chain;
      }

      // Swell slowly (~2s in Oevra), relax faster (~0.6s).
      const sizeEase = (sizeMulTarget > sizeMul ? 0.05 : 0.12) * k;
      sizeMul += (sizeMulTarget - sizeMul) * Math.min(sizeEase, 1);
      hoverT += (hoverTarget - hoverT) * Math.min(0.14 * k, 1);

      const dark = themeState.dark;
      const base = mix3(HALO_LIGHT, HALO_DARK, dark);
      const hov = mix3(HALO_HOVER_LIGHT, HALO_HOVER_DARK, dark);
      const color = mix3(base, hov, hoverT);
      const ring = mix3(RING_LIGHT, RING_DARK, dark);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uTime, (now - startTime) / 1000);
      gl.uniform2fv(uTrail, trail);
      gl.uniform1i(uTrailCount, TRAIL_LEN);
      gl.uniform3f(uColor, color[0], color[1], color[2]);
      gl.uniform3f(uOutlineColor, ring[0], ring[1], ring[2]);
      gl.uniform1f(uHaloSize, BASE_SIZE * sizeMul);
      gl.uniform1f(uGlow, 0.075 - 0.03 * hoverT);
      gl.uniform1f(uOutlineOpacity, 0.42);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      const settled =
        Math.abs(target.x - trail[0]) < 0.0008 &&
        Math.abs(target.y - trail[1]) < 0.0008 &&
        Math.abs(sizeMulTarget - sizeMul) < 0.004 &&
        Math.abs(hoverTarget - hoverT) < 0.004;
      if (active || !settled) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-halo-canvas" aria-hidden="true" />;
}
