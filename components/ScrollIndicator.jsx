// Fixed vertical "SCROLL" cue on the left margin — a quiet, decorative
// page-position hint echoing the reference site's rhythm. Hidden on mobile.
export default function ScrollIndicator() {
  return (
    <div className="scroll-indicator" aria-hidden="true">
      <span>Scroll</span>
    </div>
  );
}
