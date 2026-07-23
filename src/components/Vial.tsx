// Photograph-based research vial with an overlaid BIOHACKERS reference-
// standard label. The base image is the uploaded clear pharmaceutical vial;
// the label is rendered in CSS/HTML so pack size and compound name can vary
// per catalog item at runtime.
import vialAsset from "@/assets/vial.png.asset.json";

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
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ aspectRatio: "1 / 1.6" }}
      aria-label={compound ? `${compound} research vial` : "Research vial"}
    >
      <img
        src={vialAsset.url}
        alt=""
        className="h-full w-full object-contain select-none pointer-events-none"
        draggable={false}
      />
      {/* Label wraps the mid-lower body of the vial */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[3px] border border-primary/40 bg-[#0B1B34] text-white shadow-sm overflow-hidden"
        style={{
          top: "44%",
          width: "68%",
          padding: "6% 6% 5%",
          fontFamily: "'Space Grotesk','Inter',sans-serif",
        }}
      >
        <div
          className="text-primary font-bold uppercase text-center leading-none"
          style={{ fontSize: "clamp(6px, 1.6cqw, 10px)", letterSpacing: "0.14em" }}
        >
          BIOHACKERS
        </div>
        <div className="mt-1 h-px bg-primary/60" />
        {name && (
          <div
            className="mt-1 text-center font-semibold leading-tight"
            style={{ fontSize: "clamp(6px, 1.6cqw, 10px)" }}
          >
            {name.length > 22 ? name.slice(0, 20) + "…" : name}
          </div>
        )}
        <div
          className="mt-0.5 text-center text-[9px] uppercase tracking-[0.08em] text-white/70"
          style={{ fontSize: "clamp(5px, 1.2cqw, 8px)" }}
        >
          Research Reference Standard
        </div>
        {packSize && (
          <div
            className="mt-1 text-center font-bold text-primary leading-none"
            style={{ fontSize: "clamp(8px, 2.2cqw, 13px)", letterSpacing: "0.06em" }}
          >
            {packSize}
          </div>
        )}
        <div
          className="mt-1 text-center uppercase tracking-[0.08em] text-white/50"
          style={{ fontSize: "clamp(4px, 1cqw, 7px)" }}
        >
          For research use only · Not for human use
        </div>
      </div>
    </div>
  );
}
