// Product vial rendering. Uses the BIOHACKERS branded vial photograph and
// prints the compound name + strength directly inside the blank band on the
// vial's own label so every product shows its own identity.

import vialImage from "@/assets/vial-blank.png";

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
  const strength = packSize ?? "";
  const alt = [name, strength].filter(Boolean).join(" ");
  const longName = name.length > 12;

  return (
    <div
      className={`relative aspect-square ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <img
        src={vialImage}
        alt={alt ? `${alt} BIOHACKERS research vial` : "BIOHACKERS research vial"}
        className="h-full w-full object-contain select-none"
        draggable={false}
        loading="lazy"
        width={1024}
        height={1024}
      />

      {/* Printed label band on the vial itself */}
      {(name || strength) && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center leading-none text-white"
          style={{
            left: "50%",
            top: "75%",
            width: "31%",
            height: "10%",
            fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif",
            textShadow: "0 0.2cqw 0.4cqw rgba(0,0,0,0.85)",
          }}
        >
          {name && (
            <span
              className="w-full truncate text-center font-semibold uppercase tracking-wide"
              style={{ fontSize: longName ? "2.5cqw" : "3.2cqw" }}
            >
              {name}
            </span>
          )}
          {strength && (
            <span
              className="mt-[0.6cqw] w-full truncate text-center font-medium tracking-widest text-sky-300"
              style={{ fontSize: "2.4cqw" }}
            >
              {strength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
