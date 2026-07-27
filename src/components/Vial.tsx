// Product vial rendering. Uses the supplied BIOHACKERS vial photograph and
// overlays the correct compound name + strength on the vial's lower label
// area so every product shows its own identity.

import vialAsset from "@/assets/biohackers-vial.png.asset.json";

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
  const label = [name, packSize].filter(Boolean).join(" · ");
  const long = label.length > 16;

  return (
    <div
      className={`relative aspect-square ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <img
        src={vialAsset.url}
        alt={label ? `${label} research vial` : "BIOHACKERS research vial"}
        className="h-full w-full object-contain select-none"
        draggable={false}
        loading="lazy"
      />
      {label && (
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-slate-400/70 px-[2.2cqw] py-[0.9cqw] font-medium tracking-wide text-slate-200"
          style={{
            left: "44.7%",
            top: "78%",
            fontSize: long ? "2.6cqw" : "3.4cqw",
            fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
