"use client";

import { useEffect, useState } from "react";
import { Logo } from "./ui";

export default function Nav({ brand, links }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-blur" aria-hidden="true" />
      <div className="container nav-inner">
        <a href="/" aria-label={`${brand} home`} className="nav-logo">
          <Logo name={brand} size={28} textSize={24} />
        </a>
        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="/contact/" className="btn btn-primary btn-sm">
          <span>Book a call</span>
        </a>
      </div>
    </header>
  );
}
