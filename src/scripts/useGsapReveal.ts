import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(): RefObject<HTMLElement> {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".jk-reveal").forEach((block) => {
        gsap.from(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 36,
          opacity: 0,
          duration: 0.75,
          ease: "power2.out",
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return rootRef as RefObject<HTMLElement>;
}
