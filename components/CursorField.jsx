"use client";

import { useRef } from "react";

// Wraps content in a soft radial-gradient light that follows the cursor —
// the "light moving with the cursor near the headline" effect.
export default function CursorField({ className = "", children }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`cursor-field ${className}`}
      onMouseMove={onMove}
      onMouseEnter={(e) => e.currentTarget.classList.add("live")}
      onMouseLeave={(e) => e.currentTarget.classList.remove("live")}
    >
      <span className="cursor-glow" aria-hidden="true" />
      {children}
    </div>
  );
}
