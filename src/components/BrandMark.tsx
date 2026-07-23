// BIOHACKERS brand mark — uses the uploaded hexagonal "BH" + "BIOHACKERS
// RESEARCH" logotype. The `variant` prop switches between the full
// logo (icon + wordmark) and an icon-only crop for tight spaces such as
// small favicons and vial-label stamps.
import logoAsset from "@/assets/biohackers-logo.png.asset.json";

export function BrandMark({
  className = "h-9 w-auto",
  variant = "full",
  title = "BIOHACKERS Research",
}: {
  className?: string;
  variant?: "full" | "icon";
  title?: string;
}) {
  if (variant === "icon") {
    // Crop the left hex mark out of the wide logo using object-position.
    return (
      <span
        className={`inline-block overflow-hidden ${className}`}
        style={{ aspectRatio: "1 / 1" }}
        role="img"
        aria-label={title}
      >
        <img
          src={logoAsset.url}
          alt=""
          className="h-full w-auto max-w-none"
          style={{ objectFit: "cover", objectPosition: "left center", transform: "scale(2.9)", transformOrigin: "left center" }}
        />
      </span>
    );
  }
  return (
    <img
      src={logoAsset.url}
      alt={title}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
