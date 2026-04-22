import { SECTION_IDS } from "../scripts/constants";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Timelines depend on scope and feedback speed. A focused launch package can move quickly; larger builds are scheduled with clear milestones so you always know what is next.",
  },
  {
    q: "Do you work with businesses outside Australia?",
    a: "Yes, though our UX, tone, and trust patterns are especially tuned for Australian service businesses and local buyer expectations.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "Logo and brand colours (if available), service descriptions, imagery, and any must-have pages. If you are missing pieces, we guide you with a simple checklist.",
  },
  {
    q: "Will my site be mobile friendly?",
    a: "Every build is responsive by default — typography, spacing, and CTAs are designed for real phone use, not just desktop previews.",
  },
  {
    q: "How does hosting and the domain work?",
    a: "We help you get your custom domain and hosting as per listed pricing. We set everything up cleanly and hand over access so you stay in control.",
  },
  {
    q: "Can you help after launch?",
    a: "Yes. Many clients choose ongoing maintenance for updates, performance checks, and seasonal improvements. Add-ons are quoted transparently.",
  },
  {
    q: "What if I need more revisions than the package includes?",
    a: "Additional revision rounds are available as add-ons so you can extend polish without surprises.",
  },
];

export function FAQ() {
  return (
    <section className="jk-section" id={SECTION_IDS.faq} aria-labelledby="faq-heading">
      <div className="jk-wrap">
        <div className="jk-reveal" style={{ textAlign: "center", maxWidth: "640px", marginInline: "auto" }}>
          <p className="jk-eyebrow">FAQ</p>
          <h2 id="faq-heading" className="jk-h2">
            Answers to <span>common questions</span>.
          </h2>
          <p className="jk-lead" style={{ marginInline: "auto", marginBottom: "2rem" }}>
            Straight talk on timelines, deliverables, and what working together looks like.
          </p>
        </div>
        <div className="jk-faq">
          {faqs.map((item) => (
            <details key={item.q} className="jk-reveal">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
