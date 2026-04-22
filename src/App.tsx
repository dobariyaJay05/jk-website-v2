import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Trust } from "./components/Trust";
import { Industries } from "./components/Industries";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Process } from "./components/Process";
import { WhyUs } from "./components/WhyUs";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { useGsapReveal } from "./scripts/useGsapReveal";

/** Site-wide day (light) / dark theme via `data-jk-theme` on `<html>`. */
const STORAGE_KEY = "jk-site-day-mode";

export default function App() {
  const mainRef = useGsapReveal();
  const [isDayMode, setIsDayMode] = useState(true);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "1" || v === "0") {
        setIsDayMode(v === "1");
        return;
      }
      if (localStorage.getItem("jk-hero-visual-day") === "1") setIsDayMode(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.jkTheme = isDayMode ? "light" : "dark";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDayMode ? "#ffffff" : "#0a1f44");
  }, [isDayMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isDayMode ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [isDayMode]);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleDayMode = useCallback(() => {
    setIsDayMode((v) => !v);
  }, []);

  return (
    <div className="jk-page">
      <Navbar onLogoClick={scrollTop} isDayMode={isDayMode} onDayModeToggle={toggleDayMode} />
      <main ref={mainRef}>
        <Hero />
        <Trust />
        <Industries />
        <Services />
        <Portfolio />
        <Process />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer onLogoClick={scrollTop} />
      <WhatsAppFloat />
    </div>
  );
}
