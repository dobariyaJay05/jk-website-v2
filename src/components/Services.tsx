import { motion } from "framer-motion";
import { ArrowUpRight, Code2, LayoutTemplate, Megaphone, RefreshCcw, ShieldCheck } from "lucide-react";
import { SECTION_IDS } from "../scripts/constants";

const services = [
  {
    n: "01",
    title: "Website Design",
    text: "Strategic layouts, premium UI decisions, and brand-first visuals that make your business look instantly credible.",
    icon: LayoutTemplate,
  },
  {
    n: "02",
    title: "Development",
    text: "Fast, scalable frontends and clean implementation built for reliability, responsiveness, and future growth.",
    icon: Code2,
  },
  {
    n: "03",
    title: "Conversion Layouts",
    text: "Section flow, content hierarchy, and CTA placement designed to turn attention into genuine enquiries.",
    icon: Megaphone,
  },
  {
    n: "04",
    title: "Lead Systems",
    text: "Forms, WhatsApp journeys, and follow-up friendly structures that help you capture more opportunities.",
    icon: ArrowUpRight,
  },
  {
    n: "05",
    title: "Redesign",
    text: "Modernise outdated websites without losing your brand equity, trust signals, or SEO momentum.",
    icon: RefreshCcw,
  },
  {
    n: "06",
    title: "Maintenance",
    text: "Support plans that keep your website secure, current, polished, and performing at its best.",
    icon: ShieldCheck,
  },
];

export function Services() {
  return (
    <section className="jk-section" id={SECTION_IDS.services} aria-labelledby="services-heading">
      <div className="jk-wrap">
        <div className="jk-reveal">
          <p className="jk-eyebrow">Services</p>
          <h2 id="services-heading" className="jk-h2">
            Everything you need to <span>look premium</span> and grow online.
          </h2>
          <p className="jk-lead" style={{ marginBottom: "2.2rem" }}>
            JayKishan Solutions helps businesses go digital with premium websites, conversion-focused design, and scalable digital systems that create a stronger online presence without unnecessary complexity.
          </p>
        </div>
        <div className="jk-services__grid">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                className="jk-card jk-reveal"
                whileHover={{ y: -4, scale: 1.008 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className="jk-service-head">
                  <span className="jk-service-num">{s.n}</span>
                  <span className="jk-service-icon-wrap">
                    <Icon className="jk-service-icon" />
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
