"use client";

import { useState } from "react";
import { Icon, Logo } from "./ui";

export default function Footer({ brand, data }) {
  const [sent, setSent] = useState(false);

  // NOTE: no backend yet. Connect this form to Mailchimp / Resend / etc. later.
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-card">
          <div className="footer-top">
            <Logo name={brand} size={38} textSize={32} />
            <p className="lead">{data.newsletter}</p>
            <form className="news" onSubmit={onSubmit}>
              <input type="email" required placeholder="Email address" aria-label="Email address" />
              <button type="submit" className="btn btn-primary btn-sm">
                <span>{sent ? "Thanks!" : "Subscribe"}</span>
              </button>
            </form>
            <p className="tiny">{data.note}</p>
          </div>

          <div className="footer-cols">
            <div>
              <h5>Sitemap</h5>
              <ul>
                {data.sitemap.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Company</h5>
              <ul>
                {data.company.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Follow us</h5>
              <ul>
                {data.social.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="social">
                      <Icon name={l.icon} size={18} />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="legal">
          <span>© {new Date().getFullYear()} {brand}. All rights reserved.</span>
          <div>
            {data.legal.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
