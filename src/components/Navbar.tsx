import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SECTION_IDS } from "../scripts/constants";
import { ThemeModeIcon } from "./ThemeModeIcon";
import { NavIconMenu } from "./NavMenuIcons";

type Props = {
  onLogoClick: () => void;
  isDayMode: boolean;
  onDayModeToggle: () => void;
};

export function Navbar({ onLogoClick, isDayMode, onDayModeToggle }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`jk-nav ${scrolled ? "jk-nav--scrolled" : ""}`}>
      <div className="jk-wrap jk-nav__inner">
        <button type="button" className="jk-nav__logo" onClick={onLogoClick} aria-label="JayKishan Solutions home">
          <img src="/assets/logo.png" alt="JayKishan Solutions logo" width={44} height={44} />
          <span className="jk-nav__brand">JayKishan Solutions</span>
        </button>

        <nav aria-label="Primary">
          <ul className="jk-nav__links">
            <li>
              <a href={`#${SECTION_IDS.services}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.services))}>
                Services
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.work}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.work))}>
                Projects
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.process}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.process))}>
                Process
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.pricing}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.pricing))}>
                Pricing
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.faq}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.faq))}>
                FAQ
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.contact}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.contact))}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="jk-nav__end">
          <button
            type="button"
            className="jk-theme-toggle"
            aria-pressed={isDayMode}
            aria-label={
              isDayMode
                ? "Light theme is on. Switch to dark theme for the whole site."
                : "Dark theme is on. Switch to light theme for the whole site."
            }
            onClick={onDayModeToggle}
          >
            <ThemeModeIcon isDayMode={isDayMode} />
            <span className="jk-theme-toggle__label" aria-hidden="true">
              {isDayMode ? "Day mode" : "Dark mode"}
            </span>
          </button>
          <div className="jk-nav__cta-desktop">
            <motion.button
              type="button"
              className="jk-btn jk-btn--primary"
              whileTap={{ scale: 0.97 }}
              onClick={() => go(SECTION_IDS.contact)}
            >
              Start a Project
            </motion.button>
          </div>
        </div>

        <button
          type="button"
          className="jk-nav__toggle"
          aria-expanded={open}
          aria-controls="jk-nav-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <NavIconMenu />
        </button>
      </div>

      <div id="jk-nav-drawer" className={`jk-nav__drawer ${open ? "jk-nav__drawer--open" : ""}`} role="dialog">
        <div className="jk-wrap" style={{ width: "100%", margin: 0 }}>
          <ul>
            <li>
              <a href={`#${SECTION_IDS.services}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.services))}>
                Services
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.work}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.work))}>
                Projects
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.process}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.process))}>
                Process
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.pricing}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.pricing))}>
                Pricing
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.faq}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.faq))}>
                FAQ
              </a>
            </li>
            <li>
              <a href={`#${SECTION_IDS.contact}`} onClick={(e) => (e.preventDefault(), go(SECTION_IDS.contact))}>
                Contact
              </a>
            </li>
            <li>
              <button type="button" onClick={() => go(SECTION_IDS.contact)}>
                Start a Project
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
