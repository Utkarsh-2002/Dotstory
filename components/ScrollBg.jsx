"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { themeState } from "../lib/themeState";

// =====================================================================
//  Living background — a fixed, full-screen WebGL canvas behind the page.
//
//  Four large soft circles are pushed around by layered sine waves while
//  the whole scene drifts slowly, so light appears to move across the
//  page on its own. As you scroll, the five colours tween between
//  "light", "green" and "dark" palettes, driven by the invisible <BgMark>
//  markers dropped between sections. Purely decorative: aria-hidden, no
//  text, and all page content stays server-rendered HTML.
//
//  The canvas is rendered at half resolution on purpose — the shapes are
//  blurry by design, and it keeps the GPU cost tiny. If WebGL is
//  unavailable the same colours are applied to the body as a flat fill.
// =====================================================================

const VERTEX_SRC = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;
varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uBackground;
uniform vec3 uBase1;
uniform vec3 uBase2;
uniform vec3 uBase3;
uniform vec3 uBase4;
uniform vec4 uCircleScale;
uniform vec4 uCircleOpacity;
uniform float uHighlight;

const float DRIFT_SPEED = 1.0;
const float DISP_STRENGTH = 0.8;
const float DISP_FREQ = 1.0;
const float DISP_SPEED = 0.6;

float hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p.x + p.y) * 43758.5453123);
}

float softCircle(vec2 p, vec2 center, float radius, float softness, float phase) {
  vec2 displacement = vec2(
    sin(p.x * DISP_FREQ + uTime * DISP_SPEED + phase) * 1.0 +
    sin(p.y * DISP_FREQ * 1.3 - uTime * DISP_SPEED * 0.8 + phase * 1.3) * 0.6,
    cos(p.y * DISP_FREQ + uTime * DISP_SPEED * 1.2 + phase * 0.7) * 0.8 +
    cos(p.x * DISP_FREQ * 0.7 + uTime * DISP_SPEED * 0.6 + phase * 1.5) * 0.4
  );
  vec2 c = center + displacement * DISP_STRENGTH;
  float d = length(p - c);
  // smoothstep needs edge0 < edge1, so build the falling ramp as 1 - rise.
  return 1.0 - smoothstep(radius - softness, radius, d);
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;

  vec2 drift = vec2(sin(uTime * 0.06 * DRIFT_SPEED), cos(uTime * 0.04 * DRIFT_SPEED)) * 0.06;
  vec2 U = uv + drift;

  vec3 col = uBackground;

  float b1 = softCircle(U, vec2(-0.55 * aspect, -0.2), 1.2 * uCircleScale.x, 0.85, 0.0) * uCircleOpacity.x;
  float b2 = softCircle(U, vec2(0.15 * aspect, 0.05), 0.80 * uCircleScale.y, 0.55, 1.57) * uCircleOpacity.y;
  float b3 = softCircle(U, vec2(0.65 * aspect, 0.15), 0.90 * uCircleScale.z, 0.60, 3.14) * uCircleOpacity.z;
  float b4 = softCircle(U, vec2(-0.10 * aspect, 0.55), 0.55 * uCircleScale.w, 0.45, 4.71) * uCircleOpacity.w;

  col = mix(col, uBase1, b1);
  col = mix(col, uBase2, b2);
  col = mix(col, uBase3, b3);
  col = mix(col, uBase4, b4);

  // Two faint pools of light — fade out on dark palettes via uHighlight.
  float h1 = 1.0 - smoothstep(0.0, 0.45, length(U - vec2(0.25 * aspect, -0.10)));
  float h2 = 1.0 - smoothstep(0.0, 0.55, length(U - vec2(0.70 * aspect, 0.35)));
  col += vec3(0.10, 0.12, 0.10) * (h1 * 0.35 + h2 * 0.25) * uHighlight;

  float vignette = 1.0 - smoothstep(0.25, 1.25, length(U));
  col *= mix(0.94, 1.0, vignette);

  // Tiny dither so the wide, soft gradients never band.
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;

// ---------------------------------------------------------------------
//  Palettes: [background, circle1, circle2, circle3, circle4]
// ---------------------------------------------------------------------
const THEMES = {
  light: { dark: 0, highlight: 1, colors: ["#f2f5ea", "#e6efd9", "#eef6e6", "#ebf3e0", "#e3ebd5"] },
  green: { dark: 0, highlight: 1, colors: ["#c5d4ab", "#98b99c", "#d9e0c8", "#b3c09b", "#edf2e3"] },
  dark: { dark: 1, highlight: 0.15, colors: ["#0a0d07", "#1b2812", "#243518", "#141d0e", "#2f4420"] },
};

// BgMark colours predate the shader — map them onto the three palettes.
function themeFor(color) {
  const c = (color || "").toLowerCase();
  if (c === "#0a0d07") return "dark";
  if (c === "#eef1e4") return "green";
  return "light";
}

function hexToRgb01(hex) {
  const n = hex.replace("#", "");
  const num = parseInt(n, 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

const PALETTES = Object.fromEntries(
  Object.entries(THEMES).map(([k, t]) => [k, { ...t, rgb: t.colors.map(hexToRgb01) }]),
);

function lerp(a, b, t) {
  return a + (b - a) * t;
}

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

const easeOut = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

export default function ScrollBg() {
  const canvasRef = useRef(null);
  const stopsRef = useRef([]);
  const pathname = usePathname();

  // Re-measure the section markers whenever the route changes or the
  // layout shifts (images/fonts loading, window resize).
  useEffect(() => {
    const measure = () => {
      const nodes = Array.from(document.querySelectorAll("[data-scrollbg]"));
      stopsRef.current = nodes
        .map((el) => ({
          top: el.getBoundingClientRect().top + window.scrollY,
          theme: themeFor(el.getAttribute("data-bg")),
        }))
        .sort((a, b) => a.top - b.top);
    };
    measure();
    const timers = [setTimeout(measure, 150), setTimeout(measure, 700)];
    window.addEventListener("resize", measure);
    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(document.body);
    }
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", measure);
      if (ro) ro.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = document.documentElement;
    const reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    // Current blended palette (what's actually drawn).
    const current = { rgb: PALETTES.light.rgb.map((c) => c.slice()), highlight: 1, dark: 0 };

    const blendForScroll = () => {
      const stops = stopsRef.current;
      let a = PALETTES.light;
      let b = PALETTES.light;
      let t = 0;
      if (stops.length) {
        const y = window.scrollY;
        if (y <= stops[0].top) {
          a = b = PALETTES[stops[0].theme];
        } else if (y >= stops[stops.length - 1].top) {
          a = b = PALETTES[stops[stops.length - 1].theme];
        } else {
          for (let i = 0; i < stops.length - 1; i++) {
            if (y >= stops[i].top && y <= stops[i + 1].top) {
              a = PALETTES[stops[i].theme];
              b = PALETTES[stops[i + 1].theme];
              t = (y - stops[i].top) / Math.max(1, stops[i + 1].top - stops[i].top);
              break;
            }
          }
        }
      }
      // Ease the blend so palettes settle instead of crawling the whole way.
      const k = t * t * (3 - 2 * t);
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) current.rgb[i][j] = lerp(a.rgb[i][j], b.rgb[i][j], k);
      }
      current.highlight = lerp(a.highlight, b.highlight, k);
      current.dark = lerp(a.dark, b.dark, k);
      themeState.dark = current.dark;
      const tone = current.dark > 0.5 ? "dark" : "light";
      if (root.dataset.tone !== tone) root.dataset.tone = tone;

      const bg = current.rgb[0].map((v) => Math.round(v * 255));
      root.style.setProperty("--bg", `rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`);
    };

    const gl = canvas
      ? canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" })
      : null;

    let program = null;
    if (gl) {
      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
      if (vs && fs) {
        program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) program = null;
      }
    }

    if (!gl || !program) {
      // No WebGL: flat body colour that still follows the scroll.
      blendForScroll();
      const onScroll = () => blendForScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        root.style.removeProperty("--bg");
        delete root.dataset.tone;
      };
    }

    gl.useProgram(program);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const u = (n) => gl.getUniformLocation(program, n);
    const uResolution = u("uResolution");
    const uTime = u("uTime");
    const uBackground = u("uBackground");
    const uBase = [u("uBase1"), u("uBase2"), u("uBase3"), u("uBase4")];
    const uCircleScale = u("uCircleScale");
    const uCircleOpacity = u("uCircleOpacity");
    const uHighlight = u("uHighlight");

    const RES_SCALE = 0.5;
    const resize = () => {
      canvas.width = Math.max(2, Math.floor(window.innerWidth * RES_SCALE));
      canvas.height = Math.max(2, Math.floor(window.innerHeight * RES_SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const startedAt = performance.now();
    let raf = null;
    let hidden = document.hidden;

    const draw = (now) => {
      const elapsed = (now - startedAt) / 1000;
      blendForScroll();

      // Circles bloom in one after another on load (staggered 0.1s).
      const intro = reduced ? [1, 1, 1, 1] : [0, 1, 2, 3].map((i) => easeOut((elapsed - i * 0.1) / 1.5));
      const time = reduced ? 3.0 : elapsed;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform3fv(uBackground, current.rgb[0]);
      for (let i = 0; i < 4; i++) gl.uniform3fv(uBase[i], current.rgb[i + 1]);
      gl.uniform4f(uCircleScale, intro[0], intro[1], intro[2], intro[3]);
      gl.uniform4f(uCircleOpacity, intro[0], intro[1], intro[2], intro[3]);
      gl.uniform1f(uHighlight, current.highlight);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now) => {
      raf = null;
      if (hidden) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (raf || hidden) return;
      raf = requestAnimationFrame(reduced ? (n) => { raf = null; draw(n); } : loop);
    };

    const onVisibility = () => {
      hidden = document.hidden;
      if (!hidden) kick();
    };

    resize();
    kick();
    window.addEventListener("resize", () => { resize(); kick(); });
    window.addEventListener("scroll", kick, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("scroll", kick);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty("--bg");
      delete root.dataset.tone;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />;
}

/** Zero-height marker dropped between sections to tag a background palette. */
export function BgMark({ color }) {
  return <div data-scrollbg data-bg={color} aria-hidden="true" style={{ height: 0, margin: 0, padding: 0 }} />;
}
