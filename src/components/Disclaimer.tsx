// Legacy shim — new code should use <ResearchUseNotice /> from
// @/components/ResearchUseNotice. Kept so older imports don't break.
import { ResearchUseNotice } from "./ResearchUseNotice";

export function Disclaimer({ variant }: { variant?: "default" | "compact" }) {
  return <ResearchUseNotice variant={variant === "compact" ? "inline" : "callout"} />;
}
