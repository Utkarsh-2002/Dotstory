// Fixed, page-wide atmosphere layer: a soft light-source glow (like the
// drifting orb on the reference site) plus a fine film-grain texture over
// everything. Both are pure CSS/no JS, sit above every section (including
// the dark pinned photos) via mix-blend-mode, and never intercept clicks.
export default function AmbientField() {
  return (
    <div className="ambient-field" aria-hidden="true">
      <div className="ambient-glow" />
      <div className="ambient-vignette" />
      <div className="ambient-grain" />
    </div>
  );
}
