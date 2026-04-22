import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useGsapHero } from "../scripts/useGsapHero";
import { SECTION_IDS } from "../scripts/constants";

export function Hero() {
  const rootRef = useGsapHero();
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });
  const transform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0) scale(1.02)`;

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px * 18);
    my.set(py * 14);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="jk-hero" ref={rootRef}>
      <div className="jk-wrap jk-hero__grid">
        <div>
          <p className="jk-eyebrow jk-hero__eyebrow">Premium digital solutions · Australia</p>
          <h1 className="jk-hero__headline">
            <span className="jk-hero__headline-a">Websites that win trust</span>
            <br />
            <span className="jk-hero__headline-b">and drive enquiries.</span>
          </h1>
          <p className="jk-hero__sub">
            JayKishan Solutions crafts elegant, high-converting web experiences for tradies, clinics, consultants, and
            growing service brands. Built to impress. Designed to convert.
          </p>
          <div className="jk-hero__actions">
            <motion.button
              type="button"
              className="jk-btn jk-btn--ghost jk-hero__cta"
              whileTap={{ scale: 0.98 }}
              onClick={() => go(SECTION_IDS.work)}
            >
              View Work
            </motion.button>
            <motion.button
              type="button"
              className="jk-btn jk-btn--primary jk-hero__cta"
              whileTap={{ scale: 0.98 }}
              onClick={() => go(SECTION_IDS.contact)}
            >
              Start a Project
            </motion.button>
          </div>
        </div>

        <div
          className="jk-hero__visual-wrap"
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <div className="jk-hero__glow" aria-hidden />
          <motion.div className="jk-hero__visual" style={{ transform }}>
            <img src="/assets/logo.png" alt="JayKishan Solutions logo" width={900} height={500} />
            <div className="jk-hero__badge">
              <div>
                <strong>Conversion-first build</strong>
                <span>Structure, speed, and clarity engineered for leads.</span>
              </div>
              <span style={{ color: "var(--jk-neon)", fontWeight: 700 }}>AU</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
