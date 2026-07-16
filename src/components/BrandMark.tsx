// BIOHACKERS brand mark — a Bitcoin-style "B" with DNA double-helix motif.
// Always renders on its own navy backdrop so it stays visible on any surface
// (including white-on-white contexts). Use `tone="mono"` for single-color
// stamps (e.g. small vial-cap prints) where currentColor is preferred.

export function BrandMark({
  className = "h-9 w-9",
  tone = "brand",
  title,
}: {
  className?: string;
  tone?: "brand" | "mono";
  title?: string;
}) {
  const bg = tone === "mono" ? "currentColor" : "#0B1B34";
  const fg = tone === "mono" ? "var(--color-background)" : "#FFFFFF";
  const accent = tone === "mono" ? "var(--color-background)" : "#3B82F6";
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* Solid backdrop guarantees contrast on any background */}
      <rect width="64" height="64" rx="14" fill={bg} />

      {/* DNA double-helix motif behind the B */}
      <g stroke={accent} strokeWidth="1.25" strokeLinecap="round" fill="none" opacity="0.55">
        <path d="M12 18 Q32 30 52 18" />
        <path d="M12 46 Q32 34 52 46" />
        <line x1="17" y1="21.5" x2="17" y2="42.5" />
        <line x1="24" y1="19.5" x2="24" y2="44.5" />
        <line x1="32" y1="18.8" x2="32" y2="45.2" />
        <line x1="40" y1="19.5" x2="40" y2="44.5" />
        <line x1="47" y1="21.5" x2="47" y2="42.5" />
      </g>

      {/* Bitcoin-style outward ticks */}
      <g fill={fg}>
        <rect x="26" y="6" width="3" height="10" rx="0.5" />
        <rect x="34" y="6" width="3" height="10" rx="0.5" />
        <rect x="26" y="48" width="3" height="10" rx="0.5" />
        <rect x="34" y="48" width="3" height="10" rx="0.5" />
      </g>

      {/* B letterform */}
      <path
        d="M20 14h13.5a8.5 8.5 0 0 1 6.2 14.4A9 9 0 0 1 35 50H20V14zm6.5 6.5v9h7a4.5 4.5 0 0 0 0-9h-7zm0 15v9h8a4.5 4.5 0 0 0 0-9h-8z"
        fill={fg}
      />

      {/* DNA nucleotide dot accent */}
      <circle cx="49" cy="32" r="1.8" fill={accent} />
    </svg>
  );
}
