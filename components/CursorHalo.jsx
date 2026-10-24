"use client";

import { useEffect, useRef } from "react";

// A full-screen WebGL layer that draws a soft organic light trailing the
// cursor — a chain of blended, wobbling halos that fade out along the
// trail, redrawn every frame. A CSS radial-gradient can't do this: it's a
// real-time fragment shader, not a styled div. Disabled on touch devices
// and for prefers-reduced-motion.

const TRAIL_LEN = 9;

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

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;

  vec3 col = vec3(0.0);
  float alpha = 0.0;

  for (int i = 0; i < ${TRAIL_LEN}; i++) {
    if (i >= uTrailCount) break;

    vec2 rel = uv - uTrail[i];
    float r = length(rel);
    float angle = atan(rel.y, rel.x);

    float falloff = 1.0 - float(i) / float(uTrailCount);
    falloff = pow(falloff, 1.7);

    // A scalloped, flower-like ring rather than a soft round blob — more
    // lobes, stronger distortion, so the shape itself reads as deliberate
    // rather than a blurred smear.
    float wobble = 0.55 * sin(angle * 5.0 + uTime * 1.2 + float(i) * 0.4);
    wobble += 0.3 * sin(angle * 8.0 - uTime * 1.7 + float(i) * 0.65);
    float lobes = 1.0 + 0.22 * wobble;
    float d = r / max(lobes, 0.3);

    float size = uHaloSize * (0.75 + 0.45 * falloff);
    // Mostly hollow: a faint inner wash plus a crisp, bright ring, instead
    // of a filled disc — reads as a small halo, not a blurry patch.
    // smoothstep(edge0, edge1, x) is only defined for edge0 < edge1 — an
    // inverted-edge call (used here in an earlier draft to get a falling
    // ramp) is undefined by spec, and at least one real GLSL implementation
    // resolves it to a flat 0 instead of the "flipped ramp" most GPUs
    // happen to return. Build each falling ramp explicitly as 1 - rise.
    float wash = 1.0 - smoothstep(0.0, size * 0.8, d);
    float washStrength = wash * 0.1 * falloff;
    col = mix(col, uColor, washStrength);
    alpha = max(alpha, washStrength);

    float outlineOuter = size * 1.08;
    float outlineInner = size * 0.72;
    float outlineRise = smoothstep(size * 0.42, outlineInner, d);
    float outlineFall = 1.0 - smoothstep(outlineInner, outlineOuter, d);
    float outline = outlineRise * outlineFall;
    float outlineStrength = outline * 0.55 * falloff;
    col = mix(col, uOutlineColor, outlineStrength);
    col += uOutlineColor * outlineStrength * 0.4;
    alpha = max(alpha, outlineStrength);
  }

  gl_FragColor = vec4(col, alpha);
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

function hexToVec3(hex) {
  const n = hex.replace("#", "");
  const v = n.length === 3 ? n.split("").map((c) => c + c).join("") : n;
  const num = parseInt(v, 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

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

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uTrail = gl.getUniformLocation(program, "uTrail");
    const uTrailCount = gl.getUniformLocation(program, "uTrailCount");
    const uColor = gl.getUniformLocation(program, "uColor");
    const uOutlineColor = gl.getUniformLocation(program, "uOutlineColor");
    const uHaloSize = gl.getUniformLocation(program, "uHaloSize");

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const color = hexToVec3("#5f7a35");
    const outlineColor = hexToVec3("#eaffc2");

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
    // toward the one before it — a chain, so the whole thing flows rather
    // than snapping to each new mouse position.
    const trail = new Float32Array(TRAIL_LEN * 2);
    const target = { x: 0, y: 0 };
    let haveTarget = false;
    let active = false;
    let raf = null;
    let startTime = performance.now();
    let hidden = document.hidden;

    // Matches the shader's own `uv.x *= aspect` — the trail must live in
    // the same aspect-corrected space the fragment shader compares it
    // against, or the two coordinate systems drift apart off-center.
    const toUv = (clientX, clientY) => {
      const aspect = width / height;
      const ux = ((clientX / width) * 2 - 1) * aspect;
      const uy = -((clientY / height) * 2 - 1);
      return [ux, uy];
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

    const HEAD_EASE = 0.24;
    const CHAIN_EASE = 0.5;

    const frame = (now) => {
      raf = null;
      if (hidden) return;

      trail[0] += (target.x - trail[0]) * HEAD_EASE;
      trail[1] += (target.y - trail[1]) * HEAD_EASE;
      for (let i = 1; i < TRAIL_LEN; i++) {
        trail[i * 2] += (trail[(i - 1) * 2] - trail[i * 2]) * CHAIN_EASE;
        trail[i * 2 + 1] += (trail[(i - 1) * 2 + 1] - trail[i * 2 + 1]) * CHAIN_EASE;
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uTime, (now - startTime) / 1000);
      gl.uniform2fv(uTrail, trail);
      gl.uniform1i(uTrailCount, TRAIL_LEN);
      gl.uniform3f(uColor, color[0], color[1], color[2]);
      gl.uniform3f(uOutlineColor, outlineColor[0], outlineColor[1], outlineColor[2]);
      gl.uniform1f(uHaloSize, 0.14);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      const settled =
        Math.abs(target.x - trail[0]) < 0.0008 && Math.abs(target.y - trail[1]) < 0.0008;
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
