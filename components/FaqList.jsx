"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { Icon } from "./ui";

// A plain accordion list (no chip/title/split layout) — used to build the
// categorized FAQ hub, where each category gets its own instance.
export default function FaqList({ items }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={it.q} delay={i * 50} className={`acc-item ${isOpen ? "open" : ""}`}>
            <button
              className="acc-q"
              aria-expanded={isOpen}
              aria-controls={`faqlist-${it.q}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{it.q}</span>
              <span className="acc-chev">
                <Icon name="chevron" size={14} />
              </span>
            </button>
            <div id={`faqlist-${it.q}`} className="acc-a" role="region">
              <div>
                <p>{it.a}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
