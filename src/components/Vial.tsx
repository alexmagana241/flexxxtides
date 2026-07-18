// Photoreal-ish branded vial illustration rendered in SVG. Uses layered
// gradients, specular highlights, meniscus shading and a realistic aluminum
// crimp + flip-off cap to approximate a real pharmaceutical research vial.

export function Vial({
  packSize,
  className = "h-40 w-auto",
  compound,
}: {
  packSize?: string;
  className?: string;
  compound?: string;
}) {
  return (
    <svg viewBox="0 0 160 260" className={className} aria-hidden="true">
      <defs>
        {/* Glass body: cool, slightly greenish tint with edge darkening */}
        <linearGradient id="v-glass" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8fa3ad" />
          <stop offset="0.08" stopColor="#c9d6db" />
          <stop offset="0.22" stopColor="#f2f6f7" />
          <stop offset="0.5" stopColor="#dfe7ea" />
          <stop offset="0.78" stopColor="#f2f6f7" />
          <stop offset="0.92" stopColor="#a8b8bf" />
          <stop offset="1" stopColor="#6a7a82" />
        </linearGradient>
        {/* Inner powder fill */}
        <linearGradient id="v-powder" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#f2f4f7" />
          <stop offset="1" stopColor="#c9cfd6" />
        </linearGradient>
        {/* Red flip-off cap */}
        <linearGradient id="v-cap" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#6b0f10" />
          <stop offset="0.15" stopColor="#c8232a" />
          <stop offset="0.5" stopColor="#ef3b3f" />
          <stop offset="0.85" stopColor="#c8232a" />
          <stop offset="1" stopColor="#5a0d0e" />
        </linearGradient>
        {/* Aluminum crimp */}
        <linearGradient id="v-crimp" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#6b747a" />
          <stop offset="0.2" stopColor="#c9d1d6" />
          <stop offset="0.5" stopColor="#f4f6f7" />
          <stop offset="0.8" stopColor="#b8c1c6" />
          <stop offset="1" stopColor="#5f676c" />
        </linearGradient>
        {/* Label paper */}
        <linearGradient id="v-label" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0d1f3b" />
          <stop offset="1" stopColor="#081428" />
        </linearGradient>
        {/* Shadow under vial */}
        <radialGradient id="v-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.35" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="80" cy="248" rx="52" ry="6" fill="url(#v-shadow)" />

      {/* --- CAP (red flip-off) --- */}
      {/* Top dome */}
      <ellipse cx="80" cy="14" rx="26" ry="5" fill="#8a1214" />
      <rect x="54" y="14" width="52" height="22" fill="url(#v-cap)" />
      {/* Cap highlight */}
      <rect x="60" y="16" width="4" height="18" fill="#ffffff" opacity="0.35" />
      <rect x="96" y="16" width="2" height="18" fill="#ffffff" opacity="0.2" />
      {/* Cap bottom edge shadow */}
      <ellipse cx="80" cy="36" rx="26" ry="3.5" fill="#4a0a0b" />

      {/* --- CRIMP (aluminum) --- */}
      <rect x="50" y="34" width="60" height="14" fill="url(#v-crimp)" />
      {/* Crimp ridges */}
      <g stroke="#5f676c" strokeWidth="0.4" opacity="0.55">
        <line x1="54" y1="36" x2="54" y2="46" />
        <line x1="60" y1="36" x2="60" y2="46" />
        <line x1="66" y1="36" x2="66" y2="46" />
        <line x1="72" y1="36" x2="72" y2="46" />
        <line x1="78" y1="36" x2="78" y2="46" />
        <line x1="84" y1="36" x2="84" y2="46" />
        <line x1="90" y1="36" x2="90" y2="46" />
        <line x1="96" y1="36" x2="96" y2="46" />
        <line x1="102" y1="36" x2="102" y2="46" />
        <line x1="106" y1="36" x2="106" y2="46" />
      </g>
      <ellipse cx="80" cy="48" rx="30" ry="3" fill="#3f464a" opacity="0.6" />
      <ellipse cx="80" cy="47" rx="30" ry="2.5" fill="#e7ecef" opacity="0.7" />

      {/* --- NECK --- */}
      <path d="M60 48 Q60 56 52 62 L108 62 Q100 56 100 48 Z" fill="url(#v-glass)" />
      <path d="M60 48 Q60 56 52 62" stroke="#6a7a82" strokeWidth="0.6" fill="none" opacity="0.6" />
      <path d="M100 48 Q100 56 108 62" stroke="#6a7a82" strokeWidth="0.6" fill="none" opacity="0.6" />

      {/* Rubber stopper visible through neck */}
      <rect x="58" y="42" width="44" height="6" fill="#1a1a1a" opacity="0.35" />

      {/* --- BODY --- */}
      <rect
        x="30"
        y="62"
        width="100"
        height="176"
        rx="6"
        fill="url(#v-glass)"
        stroke="#5c6a72"
        strokeWidth="0.6"
      />
      {/* Curved shoulder highlight */}
      <path d="M30 68 Q80 60 130 68" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Powder inside (lyophilized cake) */}
      <clipPath id="body-clip">
        <rect x="31" y="63" width="98" height="174" rx="5" />
      </clipPath>
      <g clipPath="url(#body-clip)">
        {/* Powder fill occupies bottom ~40% */}
        <path
          d="M31 238 L129 238 L129 168 Q80 156 31 168 Z"
          fill="url(#v-powder)"
        />
        {/* Meniscus / cracked cake texture */}
        <path
          d="M31 168 Q80 156 129 168 Q80 172 31 168 Z"
          fill="#ffffff"
          opacity="0.85"
        />
        <path
          d="M42 176 Q60 172 78 180 M88 178 Q104 174 120 182 M46 196 Q68 200 96 194"
          stroke="#c9cfd6"
          strokeWidth="0.5"
          fill="none"
          opacity="0.7"
        />
      </g>

      {/* Left specular highlight */}
      <rect x="36" y="70" width="5" height="160" rx="2.5" fill="#ffffff" opacity="0.7" />
      <rect x="43" y="90" width="2" height="120" rx="1" fill="#ffffff" opacity="0.35" />
      {/* Right dim highlight */}
      <rect x="118" y="70" width="2" height="160" rx="1" fill="#ffffff" opacity="0.4" />
      {/* Edge darkening */}
      <rect x="30" y="62" width="4" height="176" fill="#000" opacity="0.18" />
      <rect x="126" y="62" width="4" height="176" fill="#000" opacity="0.22" />

      {/* --- LABEL --- */}
      <rect x="28" y="96" width="104" height="92" fill="url(#v-label)" />
      <rect x="28" y="96" width="104" height="2" fill="#3B82F6" opacity="0.8" />
      <rect x="28" y="186" width="104" height="2" fill="#3B82F6" opacity="0.8" />
      {/* Subtle label sheen following glass curvature */}
      <rect x="28" y="96" width="10" height="92" fill="#ffffff" opacity="0.08" />
      <rect x="122" y="96" width="10" height="92" fill="#000" opacity="0.2" />

      {/* Embedded BrandMark (DNA-B) */}
      <g transform="translate(64,102) scale(0.5)">
        <rect width="64" height="64" rx="14" fill="#0B1B34" />
        <g stroke="#3B82F6" strokeWidth="1.25" strokeLinecap="round" fill="none" opacity="0.6">
          <path d="M12 18 Q32 30 52 18" />
          <path d="M12 46 Q32 34 52 46" />
          <line x1="17" y1="21.5" x2="17" y2="42.5" />
          <line x1="24" y1="19.5" x2="24" y2="44.5" />
          <line x1="32" y1="18.8" x2="32" y2="45.2" />
          <line x1="40" y1="19.5" x2="40" y2="44.5" />
          <line x1="47" y1="21.5" x2="47" y2="42.5" />
        </g>
        <g fill="#ffffff">
          <rect x="26" y="6" width="3" height="10" />
          <rect x="34" y="6" width="3" height="10" />
          <rect x="26" y="48" width="3" height="10" />
          <rect x="34" y="48" width="3" height="10" />
        </g>
        <path
          d="M20 14h13.5a8.5 8.5 0 0 1 6.2 14.4A9 9 0 0 1 35 50H20V14zm6.5 6.5v9h7a4.5 4.5 0 0 0 0-9h-7zm0 15v9h8a4.5 4.5 0 0 0 0-9h-8z"
          fill="#ffffff"
        />
        <circle cx="49" cy="32" r="1.8" fill="#3B82F6" />
      </g>

      <text
        x="80"
        y="150"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="9"
        fontFamily="'Space Grotesk','Inter',sans-serif"
        letterSpacing="2.6"
        fontWeight="700"
      >
        BIOHACKERS
      </text>
      {compound && (
        <text
          x="80"
          y="162"
          textAnchor="middle"
          fill="#cbd5e1"
          fontSize="6.5"
          fontFamily="'Inter',sans-serif"
          letterSpacing="0.6"
        >
          {compound.length > 24 ? compound.slice(0, 22) + "…" : compound}
        </text>
      )}
      {packSize && (
        <text
          x="80"
          y="178"
          textAnchor="middle"
          fill="#60a5fa"
          fontSize="11"
          fontFamily="'Space Grotesk','Inter',sans-serif"
          fontWeight="700"
          letterSpacing="1.2"
        >
          {packSize}
        </text>
      )}

      <text
        x="80"
        y="230"
        textAnchor="middle"
        fill="#64748b"
        fontSize="4"
        fontFamily="'Inter',sans-serif"
        letterSpacing="0.4"
      >
        FOR RESEARCH USE ONLY · NOT FOR HUMAN USE
      </text>

      {/* Base rim */}
      <ellipse cx="80" cy="238" rx="50" ry="3" fill="#000" opacity="0.15" />
    </svg>
  );
}
