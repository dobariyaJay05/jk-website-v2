const points = [
  {
    title: "Premium craft, practical outcomes",
    body: "Design decisions are tied to credibility and conversion — not trends for their own sake.",
  },
  {
    title: "Built for Australian service businesses",
    body: "Language, structure, and trust patterns tuned for local buyers who compare fast.",
  },
  {
    title: "Performance you can feel",
    body: "Lean assets, sharp typography, and layouts that stay fast on real devices.",
  },
  {
    title: "Direct collaboration",
    body: "You work with the person shaping your site — clear updates, honest timelines.",
  },
];

export function WhyUs() {
  return (
    <section className="jk-section" id="why" aria-labelledby="why-heading">
      <div className="jk-wrap">
        <div className="jk-reveal">
          <p className="jk-eyebrow">Why JayKishan</p>
          <h2 id="why-heading" className="jk-h2">
            Trust isn’t a section — it’s <span>the whole experience</span>.
          </h2>
          <p className="jk-lead" style={{ marginBottom: "2rem" }}>
            We design digital presences that feel established on first glance, then earn the enquiry with clarity.
          </p>
        </div>
        <div className="jk-why__grid">
          {points.map((p) => (
            <article key={p.title} className="jk-card jk-reveal">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
