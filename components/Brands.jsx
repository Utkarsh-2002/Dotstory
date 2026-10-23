import Reveal from "./Reveal";

export default function Brands({ data }) {
  return (
    <section className="brands" aria-label="Brands">
      <div className="container">
        <div className="brand-grid">
          {data.items.map((b, i) => (
            <Reveal key={b.name} delay={i * 90} className={`brand-slot ${i % 2 ? "low" : ""}`}>
              <div className={`brand-tile brand-${b.style}`}>
                <span>{b.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="small brand-label" delay={200}>
          {data.label}
        </Reveal>
      </div>
    </section>
  );
}
