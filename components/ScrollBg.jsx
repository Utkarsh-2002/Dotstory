"use client";

import { useEffect, useRef } from "react";

function hexToRgb(hex) {
  const n = hex.replace("#", "");
  const v = n.length === 3 ? n.split("").map((c) => c + c).join("") : n;
  const num = parseInt(v, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Drives the page's background colour from scroll position, the way the
 * whole scroll — not just one section — shifts tone on the reference site.
 * Reads every [data-scrollbg] marker placed between sections, finds which
 * pair of markers bracket the viewport's vertical centre, and lerps the
 * body colour between their `data-bg` values every frame.
 */
export default function ScrollBg() {
  const stopsRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = document.documentElement;
    let raf = null;

    const measure = () => {
      const nodes = Array.from(document.querySelectorAll("[data-scrollbg]"));
      stopsRef.current = nodes
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const color = el.getAttribute("data-bg");
          if (!color) return null;
          return { top: rect.top + window.scrollY, color: hexToRgb(color) };
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top);
    };

    // Flat colour per section, with a short crossfade band right where one
    // section's marker gives way to the next — not a drift spread across
    // the whole (sometimes very tall) gap between markers.
    const BAND = 260;

    const apply = () => {
      raf = null;
      const stops = stopsRef.current;
      if (!stops.length) return;
      const centerY = window.scrollY + window.innerHeight * 0.5;

      let idx = 0;
      for (let i = 0; i < stops.length; i++) {
        if (stops[i].top <= centerY) idx = i;
        else break;
      }

      let color = stops[idx].color;
      if (idx > 0) {
        const distAfterBoundary = centerY - stops[idx].top;
        if (distAfterBoundary < BAND) {
          const t = Math.max(0, Math.min(1, distAfterBoundary / BAND));
          color = [
            lerp(stops[idx - 1].color[0], stops[idx].color[0], t),
            lerp(stops[idx - 1].color[1], stops[idx].color[1], t),
            lerp(stops[idx - 1].color[2], stops[idx].color[2], t),
          ];
        }
      }

      const r = Math.round(color[0]);
      const g = Math.round(color[1]);
      const bl = Math.round(color[2]);
      root.style.setProperty("--bg", `rgb(${r}, ${g}, ${bl})`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };

    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 400); // after fonts/images settle layout

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty("--bg");
    };
  }, []);

  return null;
}

/** Zero-height marker dropped between sections to tag a background colour. */
export function BgMark({ color }) {
  return <div data-scrollbg data-bg={color} aria-hidden="true" style={{ height: 0, margin: 0, padding: 0 }} />;
}
