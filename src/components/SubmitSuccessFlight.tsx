import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export function SubmitSuccessFlight() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const path = root.querySelector<SVGPathElement>(".mp");
    if (!path) return;

    const len = path.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(".jk-submit-flight__stage", { opacity: 0 });

      gsap
        .timeline({ repeat: 0, defaults: { ease: "power2.inOut" } })
        .fromTo(
          ".jk-submit-flight .plane",
          { scale: 0.6 },
          {
            duration: 4,
            scale: 1.2,
            motionPath: {
              path: ".jk-submit-flight .mp",
              align: ".jk-submit-flight .mp",
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
          },
          0
        )
        .to(".jk-submit-flight__stage", { duration: 0.7, opacity: 1 }, 0.25)
        .to(path, { duration: 3.8, strokeDashoffset: 0, ease: "none" }, 0.28)
        .to(path, { duration: 1.9, strokeDashoffset: -len * 0.94, ease: "power2.in" }, "-=2")
        .to(".jk-submit-flight__stage", { duration: 0.7, opacity: 0 }, "-=0.9");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="jk-submit-flight" ref={rootRef} aria-hidden>
      <svg className="jk-submit-flight__stage" xmlns="http://www.w3.org/2000/svg" viewBox="-40 -180 1250 1100">
        <path
          className="mp"
          fill="none"
          stroke="url(#jk-submit-flight-grad)"
          strokeWidth="4"
          d="M-92 17.713c154.32 237.253 348.7 486.913 585.407 466.93 137.542-17.257 247.733-123.595 279.259-239.307 27.368-100.43-21.323-229.59-140.017-241.76-118.693-12.172-208.268 98.897-231.122 199.803-34.673 151.333 12.324 312.301 125.096 429.074C639.395 749.225 815.268 819.528 995 819"
        />
        <g className="plane">
          <path fill="url(#jk-submit-flight-grad)" opacity="0.3" d="m82.8 35 215.9 94.6L79 92l3.8-57Z" />
          <path fill="url(#jk-submit-flight-grad)" d="m82.8 35 52-23.5 163.9 118.1-216-94.5Z" />
          <path fill="url(#jk-submit-flight-grad)" opacity="0.3" d="m76.8 107.1 214.4 19.6L74.7 131l2.1-23.9Z" />
          <path fill="url(#jk-submit-flight-grad)" d="M298.8 130.4 1.9 103.3l54-45 242.9 72.1Z" />
        </g>
        <defs>
          <linearGradient id="jk-submit-flight-grad" x1="154" x2="160" y1="49" y2="132" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgb(255, 135, 9)" />
            <stop offset="1" stopColor="rgb(247, 189, 248)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
