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

    // Continuous — the colour drifts the whole way between one marker and
    // the next, so it's always visibly moving as you scroll (never holds
    // flat for a long stretch and then snaps).
    const apply = () => {
      raf = null;
      const stops = stopsRef.current;
      if (!stops.length) return;
      // Anchored on the viewport's top edge, not its centre: centre-anchoring
      // made the colour start drifting toward the next (sometimes much
      // darker) zone before the page had even been scrolled, which read as
      // a muddy tint sitting over the hero at rest. Top-anchoring means the
      // blend only progresses as far as the user has actually scrolled.
      const centerY = window.scrollY;

      let a = stops[0];
      let b = stops[stops.length - 1];
      let t = 0;
      if (centerY <= stops[0].top) {
        a = b = stops[0];
      } else if (centerY >= stops[stops.length - 1].top) {
        a = b = stops[stops.length - 1];
      } else {
        for (let i = 0; i < stops.length - 1; i++) {
          if (centerY >= stops[i].top && centerY <= stops[i + 1].top) {
            a = stops[i];
            b = stops[i + 1];
            t = (centerY - a.top) / Math.max(1, b.top - a.top);
            break;
          }
        }
      }

      const r = Math.round(lerp(a.color[0], b.color[0], t));
      const g = Math.round(lerp(a.color[1], b.color[1], t));
      const bl = Math.round(lerp(a.color[2], b.color[2], t));
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
