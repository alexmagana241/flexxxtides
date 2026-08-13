// BH brand mark — the official hexagonal BH logo.

import logo from "@/assets/biohackers-logo-mark.png.asset.json";

export function BrandMark({
  className = "h-10 w-auto",
  variant = "full",
  title = "BH Research Materials",
}: {
  className?: string;
  variant?: "full" | "icon";
  title?: string;
}) {
  void variant;
  return (
    <img
      src={logo.url}
      alt={title}
      className={`${className} object-contain select-none`}
      draggable={false}
    />
  );
}
