import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function useGsapHero(): RefObject<HTMLElement> {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let splitA: SplitText | null = null;
    let splitB: SplitText | null = null;

    const ctx = gsap.context(() => {
      (SplitText as unknown as { register: (core: typeof gsap) => void }).register(gsap);

      const lineA = el.querySelector<HTMLElement>(".jk-hero__headline-a");
      const lineB = el.querySelector<HTMLElement>(".jk-hero__headline-b");
      if (!lineA?.textContent?.trim() || !lineB?.textContent?.trim()) return;

      splitA = new SplitText(lineA, {
        type: "words",
        wordsClass: "jk-hero__word jk-hero__word--grad",
      });
      splitB = new SplitText(lineB, {
        type: "words",
        wordsClass: "jk-hero__word",
      });

      const allWords = [...splitA.words, ...splitB.words];

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".jk-hero__eyebrow", { y: 16, opacity: 0, duration: 0.6 }, 0)
        .from(
          allWords,
          {
            y: 40,
            opacity: 0,
            duration: 0.52,
            stagger: 0.045,
            ease: "power3.out",
          },
          0.08
        )
        .from(".jk-hero__sub", { y: 20, opacity: 0, duration: 0.65 }, 0.22)
        .from(".jk-hero__cta", { y: 18, opacity: 0, duration: 0.55, stagger: 0.06 }, 0.35)
        .from(".jk-hero__visual", { scale: 0.94, opacity: 0, duration: 0.9 }, 0.15)
        .from(".jk-hero__glow", { opacity: 0, duration: 1.1 }, 0);
    }, el);

    return () => {
      splitB?.revert();
      splitA?.revert();
      ctx.revert();
    };
  }, []);

  return rootRef as RefObject<HTMLElement>;
}
