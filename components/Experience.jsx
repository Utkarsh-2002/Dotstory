import Reveal from "./Reveal";
import { Chip, Framed, Rich } from "./ui";

export default function Experience({ data }) {
  const [s1, s2, s3] = data.stats;
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="split split-head">
          <Reveal className="head-left">
            <Chip>{data.chip}</Chip>
            <h2 className="h2">
              <Rich parts={data.title} />
            </h2>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            {data.text}
          </Reveal>
        </div>

        <div className="bento">
          <Reveal className="bento-col">
            <StatCard stat={s1} tall />
          </Reveal>
          <Reveal className="bento-col" delay={120}>
            <Framed {...data.images[0]} className="bento-img" />
            <StatCard stat={s2} />
          </Reveal>
          <Reveal className="bento-col" delay={240}>
            <StatCard stat={s3} />
            <Framed {...data.images[1]} className="bento-img grow" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, tall }) {
  return (
    <div className={`card stat ${tall ? "grow" : "grow-sm"}`}>
      <div className="stat-value">{stat.value}</div>
      <div className="stat-copy">
        <h4>{stat.label}</h4>
        <p>{stat.text}</p>
      </div>
    </div>
  );
}
