import { motion } from "framer-motion";

const quotes = [
  {
    text: "For our Classic Cut Barber Shop project, bookings increased within weeks and clients now mention the website before they even walk in.",
    name: "Marcus T.",
    role: "Barber shop owner, NSW",
  },
  {
    text: "The Oak and Stone Carpentry project gave us a premium look that reflects our workmanship. We get better-quality enquiries now.",
    name: "Manoj",
    role: "Carpentry business owner, VIC",
  },
  {
    text: "Urban Aura feels like a real brand now. The shopping flow is smooth, and customers are staying longer and buying more.",
    name: "Elena R.",
    role: "Fashion store founder, QLD",
  },
];

export function Testimonials() {
  return (
    <section className="jk-section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="jk-wrap">
        <div className="jk-reveal">
          <p className="jk-eyebrow">Testimonials</p>
          <h2 id="testimonials-heading" className="jk-h2">
            Outcomes clients <span>feel</span> straight away.
          </h2>
          <p className="jk-lead" style={{ marginBottom: "2rem" }}>
            Reviews from projects we have built, focused on what changed after launch: trust, enquiries, and conversion
            quality.
          </p>
        </div>
        <div className="jk-testimonials">
          {quotes.map((q) => (
            <motion.figure
              key={q.name}
              className="jk-quote jk-reveal"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
            >
              <blockquote>“{q.text}”</blockquote>
              <footer>
                <strong>{q.name}</strong>
                {q.role}
              </footer>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
