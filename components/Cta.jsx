import Reveal from "./Reveal";
import { Button, Icon, Media, Rich } from "./ui";

export default function Cta({ data }) {
  return (
    <section id="contact" className="section cta">
      <div className="container">
        <Reveal className="center head-center">
          <h2 className="h2 cta-title">
            <Rich parts={data.title} />
          </h2>
          <p className="lead narrow">{data.text}</p>
          <div className="btn-row">
            <Button href={data.primary.href}>{data.primary.label}</Button>
            <Button href={data.secondary.href} variant="ghost">
              {data.secondary.label}
            </Button>
          </div>
        </Reveal>

        <Reveal className="reel" delay={120}>
          <div className="reel-track">
            {[...data.reel, ...data.reel].map((r, i) => (
              <div key={i} className="frame reel-card">
                <Media tone={r.tone} src={r.src} className="reel-media">
                  <span className="reel-metric">
                    <Icon name={r.icon} size={14} />
                    {r.value}
                  </span>
                </Media>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
