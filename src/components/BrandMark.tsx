// BIOHACKERS Research — original SVG wordmark & icon.
// A minimal laboratory-vial silhouette paired with the "BIOHACKERS" wordmark
// and a "RESEARCH MATERIALS" underline. Rendered as inline SVG so it stays
// crisp at any size and never stretches.

export function BrandMark({
  className = "h-10 w-auto",
  variant = "full",
  title = "BIOHACKERS Research",
}: {
  className?: string;
  variant?: "full" | "icon";
  title?: string;
}) {
  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 64 64"
        className={className}
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        <VialIcon />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 260 64"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
    >
      <g transform="translate(0,0)">
        <VialIcon />
      </g>
      <g transform="translate(76,0)">
        <text
          x="0"
          y="34"
          fontFamily="'Space Grotesk','Inter',system-ui,sans-serif"
          fontWeight="700"
          fontSize="24"
          letterSpacing="3"
          fill="currentColor"
        >
          BIOHACKERS
        </text>
        <line x1="0" y1="42" x2="176" y2="42" stroke="#3B82F6" strokeWidth="1.25" />
        <text
          x="0"
          y="56"
          fontFamily="'Space Grotesk','Inter',system-ui,sans-serif"
          fontWeight="500"
          fontSize="9"
          letterSpacing="4.5"
          fill="#64748B"
        >
          RESEARCH MATERIALS
        </text>
      </g>
    </svg>
  );
}

function VialIcon() {
  return (
    <g>
      <defs>
        <linearGradient id="bmGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#94A3B8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B1B34" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="bmCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0B1B34" />
        </linearGradient>
        <linearGradient id="bmCrimp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>
      {/* Cap */}
      <rect x="22" y="6" width="20" height="6" rx="1.5" fill="url(#bmCap)" />
      {/* Aluminum crimp */}
      <rect x="20" y="11" width="24" height="7" rx="1" fill="url(#bmCrimp)" />
      <line x1="22" y1="13" x2="42" y2="13" stroke="#94A3B8" strokeWidth="0.4" />
      <line x1="22" y1="16" x2="42" y2="16" stroke="#94A3B8" strokeWidth="0.4" />
      {/* Neck */}
      <path d="M25 18 h14 v3 h-14 z" fill="url(#bmGlass)" stroke="#0B1B34" strokeWidth="0.6" />
      {/* Body */}
      <path
        d="M22 22 h20 a2 2 0 0 1 2 2 v28 a4 4 0 0 1 -4 4 h-16 a4 4 0 0 1 -4 -4 v-28 a2 2 0 0 1 2 -2 z"
        fill="url(#bmGlass)"
        stroke="#0B1B34"
        strokeWidth="0.9"
      />
      {/* Highlight */}
      <rect x="25" y="24" width="2" height="26" rx="1" fill="#FFFFFF" opacity="0.55" />
      {/* Label */}
      <rect x="24" y="34" width="16" height="14" rx="1" fill="#0B1B34" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="'Space Grotesk','Inter',system-ui,sans-serif"
        fontWeight="800"
        fontSize="5.2"
        letterSpacing="0.4"
        fill="#FFFFFF"
      >
        BH
      </text>
      <line x1="26" y1="44" x2="38" y2="44" stroke="#3B82F6" strokeWidth="0.6" />
    </g>
  );
}
