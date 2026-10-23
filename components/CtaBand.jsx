import Reveal from "./Reveal";
import { Button, Rich } from "./ui";

// A simple centered CTA strip for inner pages (no image reel — that stays
// on the Home page's full Cta component).
export default function CtaBand({ title, text, primary, secondary }) {
  const parts = typeof title === "string" ? [title] : title;
  return (
    <section className="section cta-band">
      <div className="container">
        <Reveal className="center head-center">
          <h2 className="h2">
            <Rich parts={parts} />
          </h2>
          {text && <p className="lead narrow">{text}</p>}
          <div className="btn-row">
            {primary && <Button href={primary.href}>{primary.label}</Button>}
            {secondary && (
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
