import Reveal from "./Reveal";
import { Chip, Icon, Rich } from "./ui";

export default function Benefits({ data }) {
  return (
    <section id="benefits" className="section">
      <div className="container">
        <Reveal className="center head-center">
          <Chip>{data.chip}</Chip>
          <h2 className="h2">
            <Rich parts={data.title} />
          </h2>
          <p className="lead narrow">{data.text}</p>
        </Reveal>

        <div className="benefit-grid">
          {data.items.map((b, i) => (
            <Reveal key={b.title} delay={i * 110} className="card benefit">
              <span className="benefit-icon">
                <Icon name={b.icon} size={22} />
              </span>
              <h4>{b.title}</h4>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
