import type { CSSProperties } from "react";

type IconProps = { className?: string; style?: CSSProperties };

/** Inline icons for email / phone lines (`color` via `style` or parent). */
export function EmailLineIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z"
      />
      <path stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function PhoneLineIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.07 22 2 13.93 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"
      />
    </svg>
  );
}
