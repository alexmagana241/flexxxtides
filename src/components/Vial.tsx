// Product vial rendering. Uses the BH branded vial photograph and
// prints the compound name + strength directly onto the blank area of the
// vial's own label so every product shows its own identity.

import vialWhiteImage from "@/assets/vial-blank.png";
import vialBlueImage from "@/assets/vial-blank-blue.png";
import vialBlueIsolatedImage from "@/assets/vial-blank-blue-isolated.png";

/** Only copper peptides are supplied as blue powder; everything else is white. */
const BLUE_POWDER = /^(ghk|ahk)-cu/i;

export function Vial({
  packSize,
  className = "h-40",
  compound,
  imageUrl,
  isolated = false,
}: {
  packSize?: string;
  className?: string;
  compound?: string;
  /** Optional product photograph that replaces the branded vial rendering. */
  imageUrl?: string;
  /** Uses the background-free version of the same vial artwork for staged campaign scenes. */
  isolated?: boolean;
}) {
  if (imageUrl) {
    return (
      <div className={`relative mx-auto aspect-square max-w-full ${className}`}>
        <img
          src={imageUrl}
          alt={compound ? `${compound} product photo` : "Product photo"}
          className="h-full w-full object-contain select-none"
          draggable={false}
          loading="lazy"
        />
      </div>
    );
  }

  const name = compound ? compound.replace(/\s*\(.*\)$/, "") : "";
  const strength = packSize ?? "";
  const alt = [name, strength].filter(Boolean).join(" ");
  const longName = name.length > 12;
  const hasBluePowder = BLUE_POWDER.test(name.trim());
  const vialImage = isolated && hasBluePowder ? vialBlueIsolatedImage : hasBluePowder ? vialBlueImage : vialWhiteImage;

  return (
    <div
      className={`relative mx-auto aspect-square max-w-full ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <img
        src={vialImage}
        alt={alt ? `${alt} BH research vial` : "BH research vial"}
        className="h-full w-full object-contain select-none"
        draggable={false}
        loading="lazy"
        width={1024}
        height={1024}
      />

      {(name || strength) && (
        <div
          className="absolute left-1/2 top-[67.5%] -translate-x-1/2 -translate-y-1/2 flex w-[24%] flex-col items-center justify-center leading-none text-[#1b2a6b]"
          style={{ fontFamily: "'Space Grotesk','Inter',system-ui,sans-serif" }}
        >
          {name && (
            <span
              className="w-full truncate text-center font-bold uppercase tracking-wide"
              style={{ fontSize: longName ? "3.1cqw" : "4.4cqw" }}
            >
              {name}
            </span>
          )}

          {strength && (
            <span
              className="mt-[1cqw] w-full whitespace-nowrap text-center font-semibold uppercase tracking-widest text-[#3b5bd6]"
              style={{ fontSize: "2.65cqw" }}
            >
              {strength}
            </span>
          )}

          <span
            className="mt-[2.4cqw] w-full whitespace-nowrap text-center font-bold uppercase text-[#1b2a6b]"
            style={{ fontSize: "1.35cqw" }}
          >
            FOR RESEARCH PURPOSES ONLY
          </span>
        </div>
      )}
    </div>
  );
}
