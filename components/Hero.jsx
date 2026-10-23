import Reveal from "./Reveal";
import { Button, Framed, Icon, Rich } from "./ui";

const PLATFORM_ICONS = ["play", "globe", "search", "tv", "bars", "target", "play", "globe", "search", "tv", "bars", "target"];

export default function Hero({ data }) {
  return (
    <section id="top" className="hero">
      <div className="container">
        <Reveal className="platforms">
          <p className="small">{data.platformsLabel}</p>
          <div className="platform-strip">
            <div className="track">
              {[...PLATFORM_ICONS, ...PLATFORM_ICONS].map((n, i) => (
                <span key={i} className="platform-icon">
                  <Icon name={n} size={22} />
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="h1" className="h1 hero-title" delay={80}>
          <Rich parts={data.title} />
        </Reveal>

        <Reveal as="p" className="lead hero-text" delay={160}>
          {data.text}
        </Reveal>

        <Reveal className="btn-row" delay={240}>
          <Button href={data.primary.href}>{data.primary.label}</Button>
          <Button href={data.secondary.href} variant="ghost">
            {data.secondary.label}
          </Button>
        </Reveal>

        <div className="hero-cards">
          {data.images.map((img, i) => (
            <Reveal key={i} delay={200 + i * 110} className="hero-card-wrap">
              <Framed {...img} className="hero-card" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
