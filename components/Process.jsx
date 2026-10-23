"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { Chip, Media, Rich } from "./ui";

export default function Process({ data }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = data.steps.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section id="process" className="section">
      <div className="container">
        <Reveal
          className="process"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="process-left">
            <div>
              <Chip>{data.chip}</Chip>
              <h2 className="h2">
                <Rich parts={data.title} />
              </h2>
            </div>

            <div className="step-copy">
              {data.steps.map((s, i) => (
                <div key={s.title} className={`step ${i === active ? "on" : ""}`} aria-hidden={i !== active}>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>

            <div className="step-nav" role="tablist" aria-label="Process steps">
              {data.steps.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={i === active}
                  className={`step-dot ${i <= active ? "done" : ""} ${i === active ? "on" : ""}`}
                  onClick={() => setActive(i)}
                >
                  ({String(i + 1).padStart(2, "0")})
                </button>
              ))}
            </div>
          </div>

          <div className="process-right">
            {data.steps.map((s, i) => (
              <Media
                key={s.title}
                {...s.image}
                className={`process-img ${i === active ? "on" : ""}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
