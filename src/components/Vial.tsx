// Standardized branded vial illustration. All catalog items render the same
// vial style so packaging is visually consistent. The label carries the
// BIOHACKERS DNA-B brand mark and the pack size passed in.

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
    <svg viewBox="0 0 140 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vial-glass" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f1f5f9" />
          <stop offset="0.25" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#e2e8f0" />
          <stop offset="0.9" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="vial-cap" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#12233f" />
          <stop offset="1" stopColor="#0B1B34" />
        </linearGradient>
        <linearGradient id="vial-crimp" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e5e7eb" />
          <stop offset="0.5" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
      </defs>

      {/* Cap */}
      <rect x="46" y="6" width="48" height="26" rx="3" fill="url(#vial-cap)" />
      <rect x="46" y="10" width="48" height="2" fill="#ffffff" opacity="0.08" />
      {/* Aluminum crimp */}
      <rect x="42" y="30" width="56" height="12" rx="2" fill="url(#vial-crimp)" stroke="#94a3b8" strokeWidth="0.5" />
      {/* Neck */}
      <rect x="52" y="42" width="36" height="8" fill="#e2e8f0" />
      <rect x="52" y="42" width="36" height="2" fill="#94a3b8" />
      {/* Body */}
      <rect
        x="32"
        y="50"
        width="76"
        height="162"
        rx="6"
        fill="url(#vial-glass)"
        stroke="#94a3b8"
        strokeWidth="0.75"
      />
      {/* Lyophilized powder at bottom */}
      <path d="M34 210 L106 210 L106 156 Q70 148 34 156 Z" fill="#ffffff" opacity="0.95" />
      {/* Highlight streak */}
      <rect x="38" y="54" width="4" height="152" rx="2" fill="#ffffff" opacity="0.55" />
      <rect x="100" y="54" width="2" height="152" rx="1" fill="#ffffff" opacity="0.35" />

      {/* Label (navy) */}
      <rect x="30" y="78" width="80" height="78" fill="#0B1B34" />
      <rect x="30" y="78" width="80" height="2" fill="#3B82F6" opacity="0.7" />
      <rect x="30" y="154" width="80" height="2" fill="#3B82F6" opacity="0.7" />

      {/* Embedded BrandMark (DNA-B) on the label */}
      <g transform="translate(56,84) scale(0.44)">
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
        x="70"
        y="124"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="8"
        fontFamily="'Space Grotesk','Inter',sans-serif"
        letterSpacing="2.4"
        fontWeight="700"
      >
        BIOHACKERS
      </text>
      {compound && (
        <text
          x="70"
          y="135"
          textAnchor="middle"
          fill="#cbd5e1"
          fontSize="6"
          fontFamily="'Inter',sans-serif"
          letterSpacing="0.6"
        >
          {compound.length > 22 ? compound.slice(0, 20) + "…" : compound}
        </text>
      )}
      {packSize && (
        <text
          x="70"
          y="148"
          textAnchor="middle"
          fill="#3B82F6"
          fontSize="10"
          fontFamily="'Space Grotesk','Inter',sans-serif"
          fontWeight="700"
          letterSpacing="1"
        >
          {packSize}
        </text>
      )}

      {/* Fine-print row */}
      <text
        x="70"
        y="204"
        textAnchor="middle"
        fill="#64748b"
        fontSize="4"
        fontFamily="'Inter',sans-serif"
        letterSpacing="0.4"
      >
        FOR RESEARCH USE ONLY · NOT FOR HUMAN OR VETERINARY USE
      </text>
    </svg>
  );
}
