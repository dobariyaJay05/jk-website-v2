type IconProps = { className?: string };

/** Hamburger icon for the mobile menu toggle (stroke inherits `currentColor`). */
export function NavIconMenu({ className }: IconProps) {
  return (
    <svg className={className} width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
