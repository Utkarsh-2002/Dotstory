"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { Chip, Framed, Icon, Rich } from "./ui";

export default function Results({ data }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const n = data.cases.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 6500);
    return () => clearInterval(t);
  }, [paused, n]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) setActive((a) => (dx < 0 ? (a + 1) % n : (a - 1 + n) % n));
    touchX.current = null;
  };

  return (
    <section id="results" className="section">
      <div className="container">
        <Reveal className="center head-center">
          <Chip>{data.chip}</Chip>
          <h2 className="h2">
            <Rich parts={data.title} />
          </h2>
        </Reveal>

        <Reveal
          className="cases"
          delay={120}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="cases-track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {data.cases.map((c, i) => (
              <article key={c.title} className="case" aria-hidden={i !== active}>
                <Framed {...c.image} className="case-img" />
                <div className="tags">
                  {c.tags.map((t, k) => (
                    <span key={t} className={`tag ${k === 0 ? "tag-dark" : ""}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="h3">{c.title}</h3>
                <p className="lead">{c.text}</p>
                <div className="metrics">
                  {c.metrics.map((m) => (
                    <span key={m} className="metric">
                      {m}
                    </span>
                  ))}
                </div>
                <a href={c.href || "/results/"} className="link-u" tabIndex={i === active ? 0 : -1}>
                  {data.linkLabel}
                  <Icon name="arrow" size={12} />
                </a>
              </article>
            ))}
          </div>
          <div className="dots" role="tablist" aria-label="Case studies">
            {data.cases.map((c, i) => (
              <button
                key={c.title}
                role="tab"
                aria-selected={i === active}
                aria-label={`Case study ${i + 1}`}
                className={`dot ${i === active ? "on" : ""}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
