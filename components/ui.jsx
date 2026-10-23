import { Icon } from "./icons";

/* ---------- brand mark ---------- */
export function Logo({ name, size = 30, textSize }) {
  return (
    <span className="logo" style={{ "--logo": `${size}px`, "--logo-text": `${textSize || Math.round(size * 0.8)}px` }}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9.5" fill="#5f7a35" />
        <rect x="8" y="7" width="8.5" height="18" rx="4.25" fill="#ffffff" />
        <circle cx="21.5" cy="20.2" r="4.3" fill="#ffffff" />
        <rect x="18.2" y="7" width="6.6" height="8" rx="3.3" fill="#ffffff" opacity=".55" />
      </svg>
      <span className="logo-text">{name}</span>
    </span>
  );
}

/* ---------- headline with italic serif accent ---------- */
export function Rich({ parts }) {
  return parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <em key={i} className="accent">
        {p.i}
      </em>
    )
  );
}

export function Chip({ children }) {
  return <span className="chip">{children}</span>;
}

export function Button({ href = "#", variant = "primary", children, ...rest }) {
  return (
    <a href={href} className={`btn btn-${variant}`} {...rest}>
      <span>{children}</span>
    </a>
  );
}

/* ---------- image (or coloured placeholder) ---------- */
export function Media({ src, alt = "", tone = 0, className = "", children, style }) {
  return (
    <div className={`media tone-${tone % 8} ${className}`} style={style}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : <span className="media-ph" aria-hidden="true" />}
      {children}
    </div>
  );
}

/* image with the soft outer ring used across the site */
export function Framed({ className = "", ...props }) {
  return (
    <div className={`frame ${className}`}>
      <Media {...props} />
    </div>
  );
}

export { Icon };
