"use client";

import { useEffect, useRef, useState } from "react";
import { Media, Chip, Rich } from "./ui";

/**
 * Continuous scroll-scrub: unlike PinnedSteps (which swaps discrete steps),
 * this ties one photo's scale and darkness directly to scroll progress, so
 * it keeps growing and darkening smoothly the whole way through — the
 * single-image "goes bigger / gets darker" moment from the reference site.
 * A panel of items reveals one by one alongside it as progress advances.
 */
export default function ScrollZoom({ eyebrow, title, image, items = [] }) {
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const wrap = wrapRef.current;
    if (!wrap || reducedRef.current) return;

    let raf = null;
    const measure = () => {
      raf = null;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      const raw = -rect.top / total;
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const p = reducedRef.current ? 0 : progress;
  const scale = 1 + p * 0.3;
  const darken = Math.min(0.78, p * 0.85);
  const activeIdx = items.length ? Math.min(items.length - 1, Math.floor(p * items.length)) : -1;

  return (
    <section
      className="zoom-wrap"
      ref={wrapRef}
      style={{ height: `${Math.max(2, items.length) * 85 + 15}vh` }}
    >
      <div className="zoom-sticky">
        <div className="zoom-media">
          <Media
            {...image}
            className="zoom-img"
            style={{ transform: `scale(${scale})` }}
          />
          <div className="zoom-dark" style={{ opacity: darken }} />
        </div>

        <div className="zoom-panel">
          {eyebrow && <Chip>{eyebrow}</Chip>}
          {title && (
            <h2 className="h2 zoom-title">
              <Rich parts={title} />
            </h2>
          )}
          <div className="zoom-items">
            {items.map((it, i) => (
              <div key={i} className={`zoom-item ${i <= activeIdx ? "on" : ""}`}>
                <span className="zoom-item-value">{it.value}</span>
                <div>
                  <h4>{it.label}</h4>
                  <p>{it.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
