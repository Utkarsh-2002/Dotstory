import Reveal from "./Reveal";
import { Chip, Framed, Icon, Rich } from "./ui";

export default function Services({ data }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="split split-center">
          <Reveal>
            <Framed {...data.image} className="services-img" />
          </Reveal>
          <div className="services-copy">
            <Reveal>
              <Chip>{data.chip}</Chip>
              <h2 className="h2">
                <Rich parts={data.title} />
              </h2>
            </Reveal>
            <Reveal as="p" className="lead" delay={100}>
              {data.text}
            </Reveal>
            <ul className="checklist">
              {data.list.map((item, i) => (
                <Reveal as="li" key={item} delay={180 + i * 80}>
                  <span className="check">
                    <Icon name="check" size={14} />
                  </span>
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
