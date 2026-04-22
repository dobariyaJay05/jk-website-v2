import { motion } from "framer-motion";
import { SECTION_IDS, whatsappHref } from "../scripts/constants";
import { EmailLineIcon, PhoneLineIcon } from "./ContactLineIcons";

type Props = {
  onLogoClick: () => void;
};

export function Footer({ onLogoClick }: Props) {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="jk-footer">
      <div className="jk-wrap jk-footer__grid">
        <div className="jk-footer__brand">
          <button type="button" className="jk-footer__logo" onClick={onLogoClick} aria-label="Back to top">
            <img src="/assets/logo.png" alt="" width={48} height={48} />
            <span>
              <strong style={{ fontFamily: "var(--jk-font-head)", display: "block" }}>JayKishan Solutions</strong>
              <span style={{ fontSize: "0.88rem", color: "var(--jk-muted)" }}>Built to Impress. Designed to Convert.</span>
            </span>
          </button>
          <motion.button
            type="button"
            className="jk-btn jk-btn--primary"
            whileTap={{ scale: 0.98 }}
            onClick={() => go(SECTION_IDS.contact)}
          >
            Start a Project
          </motion.button>
        </div>
        <div>
          <p className="jk-eyebrow" style={{ marginBottom: "0.75rem" }}>
            Explore
          </p>
          <nav className="jk-footer__links" aria-label="Footer">
            <a href={`#${SECTION_IDS.work}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.work))}>
              Work
            </a>
            <a href={`#${SECTION_IDS.services}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.services))}>
              Services
            </a>
            <a href={`#${SECTION_IDS.pricing}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.pricing))}>
              Pricing
            </a>
            <a href={`#${SECTION_IDS.faq}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.faq))}>
              FAQ
            </a>
            <a href={`#${SECTION_IDS.contact}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.contact))}>
              Contact
            </a>
          </nav>
        </div>
        <div>
          <p className="jk-eyebrow" style={{ marginBottom: "0.75rem" }}>
            Contact
          </p>
          <p
            style={{
              margin: "0 0 0.5rem",
              fontSize: "0.92rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.5rem",
            }}
          >
            <EmailLineIcon style={{ flexShrink: 0, marginTop: "0.12rem", color: "var(--jk-accent)" }} />
            <a href="mailto:jay@jaykishansolutions.com.au" style={{ color: "var(--jk-accent)", wordBreak: "break-all" }}>
              jay@jaykishansolutions.com.au
            </a>
          </p>
          <p
            style={{
              margin: "0 0 0.5rem",
              fontSize: "0.92rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <PhoneLineIcon style={{ flexShrink: 0, color: "var(--jk-neon)" }} />
            <a href="tel:+61412292330" style={{ color: "var(--jk-fg)" }}>
              0412 292 330
            </a>
          </p>
          <p style={{ margin: "0 0 0.75rem", fontSize: "0.92rem" }}>
            <a href={whatsappHref()} target="_blank" rel="noreferrer" style={{ color: "var(--jk-neon)", fontWeight: 600 }}>
              WhatsApp
            </a>
          </p>
          <p style={{ margin: 0, color: "var(--jk-muted)", fontSize: "0.88rem", maxWidth: "28ch" }}>
            Premium websites for service businesses Australia-wide.
          </p>
        </div>
      </div>
      <div className="jk-wrap jk-footer__bottom">
        <span>© {new Date().getFullYear()} JayKishan Solutions. All rights reserved.</span>
        <span>Crafted for clarity, speed, and conversion.</span>
      </div>
    </footer>
  );
}
