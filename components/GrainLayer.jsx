// A constantly-jittering grain texture over the whole page — this, not a
// shifting background color, is what actually makes the reference site
// feel like it's "always moving": the grain animates every ~0.1s whether
// or not you're scrolling. Static markup, no JS needed.
export default function GrainLayer() {
  return <div className="grain-layer" aria-hidden="true" />;
}
