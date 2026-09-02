/** Motif de marque : hémisphère cérébral au trait + point rouge (le foyer de l'AVC). */
export function BrainMark({
  className,
  dot = "var(--color-red)",
  stroke = "currentColor",
}: {
  className?: string;
  dot?: string;
  stroke?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M8 27C4 18 9 7 20 7c10 0 16 8 14 18-1 5-6 8-12 7-4-1-6 1-10 0-3-1-4-2-4-5Z"
        fill="none"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="20" r="3.6" fill={dot} />
    </svg>
  );
}
