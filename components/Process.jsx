import Reveal from "./Reveal";
import PinnedSteps from "./PinnedSteps";
import { Chip, Rich } from "./ui";

export default function Process({ data }) {
  return (
    <section id="process" className="section process-head-section">
      <div className="container">
        <Reveal className="center head-center">
          <Chip>{data.chip}</Chip>
          <h2 className="h2">
            <Rich parts={data.title} />
          </h2>
          <p className="lead narrow">Scroll — each step stays pinned while the next one takes over.</p>
        </Reveal>
      </div>
      <PinnedSteps eyebrow={data.chip} steps={data.steps} />
    </section>
  );
}
