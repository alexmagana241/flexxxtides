// Original SVG research vial with an overlaid BIOHACKERS reference-standard
// label. Renders per-product so the compound name and pack size vary by
// catalog item at runtime.

export function Vial({
  packSize,
  className = "h-40",
  compound,
}: {
  packSize?: string;
  className?: string;
  compound?: string;
}) {
  const name = compound ? compound.replace(/\s*\(.*\)$/, "") : "";
  const displayName = name.length > 18 ? name.slice(0, 16) + "…" : name;
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      role="img"
      aria-label={compound ? `${compound} research vial` : "Research vial"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F1F5F9" stopOpacity="0.85" />
          <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#CBD5E1" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0B1B34" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="vCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0B1B34" />
        </linearGradient>
        <linearGradient id="vCrimp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="vShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Reflection */}
      <ellipse cx="60" cy="192" rx="34" ry="4" fill="#000" opacity="0.18" />

      {/* Cap (dark navy flip-off) */}
      <rect x="40" y="10" width="40" height="14" rx="3" fill="url(#vCap)" />
      <ellipse cx="60" cy="12" rx="20" ry="3" fill="#334155" />

      {/* Aluminum crimp */}
      <rect x="36" y="22" width="48" height="16" rx="2" fill="url(#vCrimp)" />
      <line x1="38" y1="27" x2="82" y2="27" stroke="#64748B" strokeWidth="0.6" />
      <line x1="38" y1="32" x2="82" y2="32" stroke="#64748B" strokeWidth="0.6" />
      <line x1="38" y1="36" x2="82" y2="36" stroke="#64748B" strokeWidth="0.6" />

      {/* Neck */}
      <path d="M42 38 h36 v6 h-36 z" fill="url(#vGlass)" stroke="#0B1B34" strokeWidth="0.8" />

      {/* Shoulder + body */}
      <path
        d="M40 44
           C 40 50, 32 54, 32 62
           L 32 172
           C 32 182, 40 188, 50 188
           L 70 188
           C 80 188, 88 182, 88 172
           L 88 62
           C 88 54, 80 50, 80 44
           Z"
        fill="url(#vGlass)"
        stroke="#0B1B34"
        strokeWidth="1.1"
      />

      {/* Interior meniscus / lyophilized cake */}
      <path
        d="M36 150 L84 150 L84 178 Q60 184 36 178 Z"
        fill="#F8FAFC"
        opacity="0.55"
      />
      <path d="M36 150 L84 150" stroke="#CBD5E1" strokeWidth="0.6" opacity="0.9" />

      {/* Left highlight */}
      <rect x="36" y="50" width="3" height="120" rx="1.5" fill="#FFFFFF" opacity="0.7" />
      <rect x="41" y="50" width="1.2" height="90" rx="0.6" fill="#FFFFFF" opacity="0.35" />
      {/* Right shadow */}
      <rect x="82" y="60" width="4" height="110" rx="2" fill="url(#vShadow)" />

      {/* Label */}
      <g>
        <rect x="38" y="80" width="44" height="56" rx="2" fill="#0B1B34" stroke="#1E293B" strokeWidth="0.5" />
        <text
          x="60"
          y="91"
          textAnchor="middle"
          fontFamily="'Space Grotesk','Inter',system-ui,sans-serif"
          fontWeight="800"
          fontSize="5"
          letterSpacing="0.9"
          fill="#3B82F6"
        >
          BIOHACKERS
        </text>
        <line x1="42" y1="94" x2="78" y2="94" stroke="#3B82F6" strokeWidth="0.4" opacity="0.7" />
        {displayName && (
          <text
            x="60"
            y="106"
            textAnchor="middle"
            fontFamily="'Space Grotesk','Inter',system-ui,sans-serif"
            fontWeight="700"
            fontSize="6"
            fill="#FFFFFF"
          >
            {displayName}
          </text>
        )}
        <text
          x="60"
          y="115"
          textAnchor="middle"
          fontFamily="'Space Grotesk','Inter',system-ui,sans-serif"
          fontWeight="500"
          fontSize="3.6"
          letterSpacing="0.5"
          fill="#94A3B8"
        >
          RESEARCH REFERENCE STANDARD
        </text>
        {packSize && (
          <text
            x="60"
            y="127"
            textAnchor="middle"
            fontFamily="'Space Grotesk','Inter',system-ui,sans-serif"
            fontWeight="800"
            fontSize="8"
            fill="#3B82F6"
          >
            {packSize}
          </text>
        )}
        <text
          x="60"
          y="133"
          textAnchor="middle"
          fontFamily="'Space Grotesk','Inter',system-ui,sans-serif"
          fontWeight="500"
          fontSize="2.8"
          letterSpacing="0.4"
          fill="#64748B"
        >
          FOR RESEARCH USE ONLY
        </text>
      </g>
    </svg>
  );
}
