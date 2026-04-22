import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DraftingCompass, Rocket, SearchCheck, Sparkles, Workflow } from "lucide-react";
import { SECTION_IDS } from "../scripts/constants";

const steps = [
  {
    n: "01",
    title: "Free Demo Preview",
    text: "We create a sample homepage so you can see the quality and direction before committing.",
    icon: Sparkles,
  },
  {
    n: "02",
    title: "Discovery & Strategy",
    text: "We understand your business, audience, and goals to build a strong foundation.",
    icon: SearchCheck,
  },
  {
    n: "03",
    title: "Architecture & UX",
    text: "We map structure, content flow, and conversion paths for clarity and performance.",
    icon: Workflow,
  },
  {
    n: "04",
    title: "Refine & Build",
    text: "We design and develop your website with premium UI, animations, and optimization.",
    icon: DraftingCompass,
  },
  {
    n: "05",
    title: "Launch & Scale",
    text: "We launch your website, refine performance, and prepare you for growth.",
    icon: Rocket,
  },
];

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".jk-process-section__intro", {
        y: 26,
        opacity: 0,
        duration: 0.72,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 78%" },
      });

      gsap.from(".jk-step", {
        y: 32,
        opacity: 0,
        scale: 0.985,
        duration: 0.62,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 64%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="jk-section jk-process-section" id={SECTION_IDS.process} aria-labelledby="process-heading" ref={rootRef}>
      <div className="jk-wrap">
        <div className="jk-process-section__intro">
          <p className="jk-eyebrow">Process</p>
          <h2 id="process-heading" className="jk-h2">
            A calm, <span>professional</span> workflow from day one.
          </h2>
          <p className="jk-lead" style={{ marginBottom: "2rem" }}>
            No chaos. No templates. Just a clear process designed to deliver real results for your business.
          </p>
        </div>
        <div className="jk-process">
          {steps.map((s) => (
            <motion.article
              key={s.title}
              className="jk-step"
              initial={false}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              <div className="jk-step__top">
                <span className="jk-step__num">{s.n}</span>
                <span className="jk-step__icon-wrap">
                  <s.icon className="jk-step__icon" />
                </span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return <ProcessSection />;
}
