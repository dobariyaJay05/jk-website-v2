type Props = {
  isDayMode: boolean;
  className?: string;
};

export function ThemeModeIcon({ isDayMode, className = "" }: Props) {
  const cn = `jk-theme-toggle__icon ${className}`.trim();

  if (isDayMode) {
    return (
      <svg className={cn} width={18} height={18} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
        />
      </svg>
    );
  }

  return (
    <svg className={cn} width={18} height={18} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
      />
    </svg>
  );
}
