const items = [
  { title: "Launch-ready delivery", desc: "Clear timelines, organised handover, no guesswork." },
  { title: "Built for mobile", desc: "Flawless layouts where your clients actually browse." },
  { title: "Lead-focused UX", desc: "CTAs, trust signals, and flows that encourage action." },
  { title: "Ongoing clarity", desc: "Straightforward updates when your business evolves." },
];

export function Trust() {
  return (
    <section className="jk-section jk-section--tight jk-trust">
      <div className="jk-wrap jk-trust__grid jk-reveal">
        {items.map((item) => (
          <div key={item.title} className="jk-trust__item">
            <strong>{item.title}</strong>
            <span>{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
