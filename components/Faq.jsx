"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { Chip, Icon, Rich } from "./ui";

export default function Faq({ data }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="split split-head faq">
          <Reveal className="faq-left">
            <Chip>{data.chip}</Chip>
            <h2 className="h2">
              <Rich parts={data.title} />
            </h2>
            <p className="lead">{data.text}</p>
          </Reveal>

          <div className="acc">
            {data.items.map((it, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={it.q} delay={i * 70} className={`acc-item ${isOpen ? "open" : ""}`}>
                  <button
                    className="acc-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{it.q}</span>
                    <span className="acc-chev">
                      <Icon name="chevron" size={14} />
                    </span>
                  </button>
                  <div id={`faq-${i}`} className="acc-a" role="region">
                    <div>
                      <p>{it.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
