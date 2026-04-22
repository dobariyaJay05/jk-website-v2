import { motion } from "framer-motion";
import { Briefcase, Building2, HardHat, HeartPulse, Rocket, Wrench } from "lucide-react";

const industries = [
  {
    title: "Tradies & contractors",
    body: "Quote-ready pages, galleries, and local trust cues that convert calls.",
    icon: HardHat,
  },
  { title: "Clinics & health", body: "Calm, credible layouts with clear services and easy contact paths.", icon: HeartPulse },
  { title: "Consultants", body: "Authority-led storytelling with structured proof and strong CTAs.", icon: Briefcase },
  { title: "Startups", body: "Premium first impressions that scale as your offer sharpens.", icon: Rocket },
  { title: "Local services", body: "Fast-loading, SEO-friendly foundations built for Australian search.", icon: Wrench },
  { title: "Professional firms", body: "Restrained luxury UI that signals quality without noise.", icon: Building2 },
];

export function Industries() {
  return (
    <section className="jk-section" id="industries" aria-labelledby="industries-heading">
      <div className="jk-wrap">
        <div className="jk-reveal">
          <p className="jk-eyebrow">Who we serve</p>
          <h2 id="industries-heading" className="jk-h2">
            Built for <span>Australian</span> businesses that live or die on trust.
          </h2>
          <p className="jk-lead" style={{ marginBottom: "2rem" }}>
            Whether you are on-site daily or behind a desk, your website should feel as professional as your work.
          </p>
        </div>
        <div className="jk-industries__grid">
          {industries.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="jk-card jk-reveal"
                initial={false}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <div className="jk-service-head">
                  <h3>{item.title}</h3>
                  <span className="jk-service-icon-wrap">
                    <Icon className="jk-service-icon" />
                  </span>
                </div>
                <p>{item.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
