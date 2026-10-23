"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A true pinned / scroll-driven sequence: the section is N viewports tall,
 * its inner frame is `position: sticky`, and which step is showing is
 * driven directly by scroll position inside that tall wrapper — the
 * background photo stays locked in place while the headline, copy and
 * (01)/(02)/(03) marker change underneath your cursor as you scroll.
 * This is the mechanism, not a fade-up — scrolling IS the interaction.
 */
export default function PinnedSteps({ eyebrow, steps }) {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = scrolled / total;
      const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
      setActive((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [steps.length]);

  const goTo = (i) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const targetTop = window.scrollY + rect.top + (total * (i + 0.5)) / steps.length;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  return (
    <section className="pin-wrap" ref={wrapRef} style={{ height: `${steps.length * 100}vh` }}>
      <div className="pin-sticky">
        <div className="pin-bg" aria-hidden="true">
          {steps.map((s, i) => (
            <div key={i} className={`pin-bg-img media tone-${(i + 4) % 8} ${i === active ? "on" : ""}`}>
              {s.image?.src && <img src={s.image.src} alt="" />}
            </div>
          ))}
          <div className="pin-overlay" />
        </div>

        <div className="container pin-inner">
          {eyebrow && <p className="chip pin-eyebrow">{eyebrow}</p>}
          <div className="pin-content">
            {steps.map((s, i) => (
              <div key={s.title} className={`pin-step ${i === active ? "on" : ""}`} aria-hidden={i !== active}>
                <span className="pin-num">({String(i + 1).padStart(2, "0")})</span>
                <h3 className="h2 pin-title">{s.title}</h3>
                {s.text && <p className="lead pin-text">{s.text}</p>}
                {s.bullets && (
                  <ul className="pin-bullets">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pin-nav" role="tablist" aria-label="Steps">
          {steps.map((s, i) => (
            <button
              key={s.title}
              role="tab"
              aria-selected={i === active}
              aria-label={`Step ${i + 1}`}
              className={`pin-dot ${i === active ? "on" : ""}`}
              onClick={() => goTo(i)}
            >
              ({String(i + 1).padStart(2, "0")})
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
