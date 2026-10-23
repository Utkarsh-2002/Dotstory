"use client";

import { useEffect, useRef } from "react";

/**
 * A single soft light that follows the cursor everywhere on the page —
 * not scoped to any section, not reset on scroll. Fixed to the viewport,
 * trailing the pointer with a little lag so it feels alive rather than
 * snapping frame to frame.
 */
export default function CursorGlow() {
  const elRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    // Only on devices with a real pointer — a glow "following" a finger
    // that's already covering the spot it points at doesn't read as anything.
    if (window.matchMedia && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const el = elRef.current;
    if (!el) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    let raf = null;
    let active = false;

    const render = () => {
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.3 && Math.abs(target.y - pos.y) < 0.3;
      if (!settled) {
        raf = requestAnimationFrame(render);
      } else {
        raf = null;
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!active) {
        active = true;
        el.style.opacity = "1";
      }
      kick();
    };

    const onLeaveDoc = () => {
      active = false;
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={elRef} className="cursor-glow-global" aria-hidden="true" />;
}
