import Reveal from "./Reveal";
import { Button, Chip, Rich } from "./ui";
import Breadcrumbs from "./Breadcrumbs";

// title: either a string, or a Rich `parts` array ([{i:"word"}] for italic accent)
export default function PageHero({ breadcrumbs, kicker, title, text, primary, secondary }) {
  const parts = typeof title === "string" ? [title] : title;
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        <Reveal className="center">
          {kicker && <Chip>{kicker}</Chip>}
          <h1 className="h1 page-hero-title">
            <Rich parts={parts} />
          </h1>
          {text && <p className="lead page-hero-text">{text}</p>}
          {(primary || secondary) && (
            <div className="btn-row">
              {primary && <Button href={primary.href}>{primary.label}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="ghost">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
