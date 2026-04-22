import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SECTION_IDS } from "../scripts/constants";

type Project = {
  title: string;
  tag: string;
  blurb: string;
  gradient: string;
  media: string;
  href: string;
};

const projects: Project[] = [
  {
    title: "Classic Cut Barber Shop",
    tag: "Barber Studio · Local Bookings",
    blurb: "Premium dark-theme website with service highlights, gallery previews, and enquiry-first layout.",
    media: "url('/assets/classic-cut-barber-shop.png')",
    gradient: "linear-gradient(135deg, #0c1f3f 0%, #1e3a8a 40%, #00d4ff 100%)",
    href: "https://barberclassiccuts.netlify.app/",
  },
  {
    title: "Oak and Stone Carpentry",
    tag: "Woodwork · Custom Builds",
    blurb: "Craft-led carpentry showcase with premium finishes, bespoke project highlights, and enquiry-ready contact flow.",
    media: "url('/assets/oak&stone_web.png')",
    gradient: "linear-gradient(145deg, #041226 10%, #2d8cff 55%, #0a1f44 100%)",
    href: "https://carpentryoakandstone.netlify.app/",
  },
  {
    title: "Urban Aura",
    tag: "Clothing · E-commerce",
    blurb: "Fashion-focused brand site and e-commerce platform designed for seamless browsing and higher conversions.",
    media: "url('/assets/Urban_aura_web.png')",
    gradient: "linear-gradient(160deg, #0a1f44 0%, #1e3a8a 50%, #00d4ff 90%)",
    href: "https://ecommerceurbanaura.netlify.app/",
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [virtualIndex, setVirtualIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const skipNextTweenRef = useRef(false);
  const total = projects.length;
  const renderedProjects = useMemo(() => [projects[total - 1], ...projects, projects[0]], [total]);

  const moveTo = useCallback((index: number, immediate = false) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const cards = gsap.utils.toArray<HTMLElement>(".jk-project", track);
    if (!cards.length) return;
    const card = cards[0];
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || "16");
    const step = card.offsetWidth + gap;
    const viewportCenterOffset = (viewport.clientWidth - card.offsetWidth) / 2;
    const x = -(index * step) + viewportCenterOffset;
    if (immediate) {
      gsap.set(track, { x });
      return;
    }
    setIsAnimating(true);
    gsap.to(track, {
      x,
      duration: 0.75,
      ease: "power3.inOut",
      onComplete: () => {
        if (index === 0) {
          moveTo(total, true);
          skipNextTweenRef.current = true;
          setVirtualIndex(total);
        } else if (index === total + 1) {
          moveTo(1, true);
          skipNextTweenRef.current = true;
          setVirtualIndex(1);
        }
        setIsAnimating(false);
      },
    });
  }, [total]);

  useLayoutEffect(() => {
    if (skipNextTweenRef.current) {
      skipNextTweenRef.current = false;
      moveTo(virtualIndex, true);
      return;
    }
    moveTo(virtualIndex);
  }, [virtualIndex, moveTo]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const activeCard = track.querySelector<HTMLElement>('.jk-project[data-active="true"]');
    if (!activeCard) return;
    const textEls = activeCard.querySelectorAll<HTMLElement>(".jk-project__tag, h3, p");
    if (!textEls.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textEls,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          clearProps: "transform",
        }
      );
    }, activeCard);

    return () => ctx.revert();
  }, [virtualIndex]);

  useLayoutEffect(() => {
    moveTo(virtualIndex, true);
  }, [moveTo]);

  useLayoutEffect(() => {
    const onResize = () => moveTo(virtualIndex, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [virtualIndex, moveTo]);

  const goNext = () => {
    if (isAnimating) return;
    setVirtualIndex((v) => v + 1);
  };

  const goPrev = () => {
    if (isAnimating) return;
    setVirtualIndex((v) => v - 1);
  };

  return (
    <section className="jk-section" id={SECTION_IDS.work} aria-labelledby="work-heading" ref={sectionRef}>
      <div className="jk-wrap">
        <div className="jk-reveal">
          <p className="jk-eyebrow">Selected projects</p>
          <h2 id="work-heading" className="jk-h2">
            Projects crafted for <span>clarity and conversion</span>.
          </h2>
          <p className="jk-lead" style={{ marginBottom: "2rem" }}>
            Representative engagements styled to reflect the calibre we bring to every build — precise, modern, and
            obsessively considered.
          </p>
        </div>
        <div className="jk-portfolio__carousel" ref={viewportRef}>
          <button className="jk-portfolio__nav jk-portfolio__nav--prev" onClick={goPrev} aria-label="Previous project">
            <span className="jk-portfolio__nav-icon" aria-hidden />
          </button>
          <div className="jk-portfolio__track" ref={trackRef}>
            {renderedProjects.map((p, i) => (
            <motion.article
              key={`${p.title}-${i}`}
              className="jk-project"
              data-active={i === virtualIndex ? "true" : "false"}
              initial={false}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              <div className="jk-project__media">
                <div className="jk-project__media-layer" style={{ backgroundImage: p.media || p.gradient }} />
              </div>
              <a
                className="jk-project__link"
                href={p.href}
                aria-label={`Open ${p.title} project`}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noreferrer noopener" : undefined}
                onClick={(e) => e.stopPropagation()}
              >
                <img src="/assets/project-link-icon.png" alt="" aria-hidden="true" />
              </a>
              <div className="jk-project__body">
                <span className="jk-project__tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                {p.href.startsWith("http") ? (
                  <a
                    className="jk-project__visit"
                    href={p.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit live site
                  </a>
                ) : null}
              </div>
            </motion.article>
            ))}
          </div>
          <button className="jk-portfolio__nav jk-portfolio__nav--next" onClick={goNext} aria-label="Next project">
            <span className="jk-portfolio__nav-icon" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
