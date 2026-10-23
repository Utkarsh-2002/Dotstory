import Reveal from "./Reveal";
import { Button, Media, Rich } from "./ui";

function Card({ t }) {
  return (
    <figure className="card quote">
      <blockquote>
        <span className="qmark" aria-hidden="true">“</span>
        {t.quote}
      </blockquote>
      <figcaption>
        <span className="who">
          <strong>{t.name}</strong>
          <span>{t.role}</span>
        </span>
        <span className="quote-logo">{t.logo}</span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ data }) {
  const left = data.items.filter((_, i) => i % 2 === 0);
  const right = data.items.filter((_, i) => i % 2 === 1);

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <Reveal className="center head-center testi-head">
          <div className="avatars">
            {data.avatars.map((a, i) => (
              <Media key={i} {...a} className="avatar" />
            ))}
          </div>
          <p className="small">{data.small}</p>
          <h2 className="h2">
            <Rich parts={data.title} />
          </h2>
          <div className="btn-row">
            <Button href={data.primary.href} variant="ghost">
              {data.primary.label}
            </Button>
            <a href={data.secondary.href} className="link-u">
              {data.secondary.label}
            </a>
          </div>
        </Reveal>

        <Reveal className="testi-wall" delay={120}>
          <div className="testi-col up">
            <div className="testi-track">
              {[...left, ...left].map((t, i) => (
                <Card key={i} t={t} />
              ))}
            </div>
          </div>
          <div className="testi-col down">
            <div className="testi-track">
              {[...right, ...right].map((t, i) => (
                <Card key={i} t={t} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
