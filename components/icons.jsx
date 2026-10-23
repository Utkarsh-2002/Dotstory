const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export function Icon({ name, size = 20 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true };
  switch (name) {
    /* ---- benefits ---- */
    case "database":
      return (
        <svg {...p} {...S}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </svg>
      );
    case "chart":
      return (
        <svg {...p} {...S}>
          <path d="M3 3v18h18" />
          <path d="m7 15 4-4 3 3 5-6" />
        </svg>
      );
    case "support":
      return (
        <svg {...p} {...S}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="m5.6 5.6 3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" />
        </svg>
      );
    /* ---- generic ---- */
    case "check":
      return (
        <svg {...p} {...S} strokeWidth={2.4}>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...p} {...S} strokeWidth={2.4}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...p} {...S} strokeWidth={2}>
          <path d="M7 7h10v10" />
        </svg>
      );
    /* ---- platform glyphs (generic) ---- */
    case "play":
      return (
        <svg {...p} {...S}>
          <rect x="2.5" y="5" width="19" height="14" rx="4" />
          <path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" />
        </svg>
      );
    case "globe":
      return (
        <svg {...p} {...S}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
      );
    case "search":
      return (
        <svg {...p} {...S}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      );
    case "tv":
      return (
        <svg {...p} {...S}>
          <rect x="3" y="5" width="18" height="12" rx="2.5" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "bars":
      return (
        <svg {...p} {...S}>
          <path d="M6 20V11M12 20V4M18 20v-6" />
        </svg>
      );
    case "target":
      return (
        <svg {...p} {...S}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    /* ---- reel metrics ---- */
    case "share":
      return (
        <svg {...p} fill="currentColor">
          <path d="M14 4.5v4.2C8.6 9 5 12.1 4 17.5c2.2-3 5.4-4.2 10-4.2v4.2L21 11z" />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...p} fill="currentColor">
          <path d="M6.5 3.5h11a1 1 0 0 1 1 1V21l-6.5-4.2L5.5 21V4.5a1 1 0 0 1 1-1z" />
        </svg>
      );
    case "eye":
      return (
        <svg {...p} fill="currentColor">
          <path d="M12 5C6.5 5 2.5 9.2 1.5 12c1 2.8 5 7 10.5 7s9.5-4.2 10.5-7C21.5 9.2 17.5 5 12 5zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      );
    case "heart":
      return (
        <svg {...p} fill="currentColor">
          <path d="M12 21s-8.5-5.2-8.5-11.2A4.8 4.8 0 0 1 12 7.4a4.8 4.8 0 0 1 8.5 2.4C20.5 15.8 12 21 12 21z" />
        </svg>
      );
    /* ---- social ---- */
    case "x":
      return (
        <svg {...p} fill="currentColor">
          <path d="M18.9 2H22l-7.3 8.3L23 22h-6.7l-5.2-6.8L5 22H2l7.8-8.9L1.5 2h6.9l4.7 6.2zM17.8 20h1.8L7.1 3.9H5.2z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...p} fill="currentColor">
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm.7 6.3V18h2.7V9.3zm1.35-3.9a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM10.3 9.3V18H13v-4.4c0-1.2.5-1.9 1.4-1.9 1 0 1.3.7 1.3 1.9V18h2.7v-4.9c0-2.2-1.2-3.9-3.2-3.9-1.1 0-1.9.5-2.3 1.2V9.3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...p} {...S} strokeWidth={2.2}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...p} fill="currentColor">
          <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2C1.5 10 1.5 12 1.5 12s0 2 .5 3.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-3.8.5-3.8s0-2-.5-3.8zM10 15V9l5.2 3z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...p} fill="currentColor">
          <path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2z" />
        </svg>
      );
    default:
      return null;
  }
}
