import { ShieldAlert } from "lucide-react";
import { RESEARCH_USE_NOTICE } from "@/lib/compliance";

type Variant = "banner" | "inline" | "callout" | "chip";

export function ResearchUseNotice({ variant = "callout" }: { variant?: Variant }) {
  if (variant === "banner") {
    return (
      <div
        role="note"
        aria-label="Research use only notice"
        className="w-full bg-primary text-primary-foreground text-[11px] sm:text-xs font-semibold tracking-wide"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 text-center leading-snug">
          {RESEARCH_USE_NOTICE}
        </div>
      </div>
    );
  }
  if (variant === "inline") {
    return (
      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary leading-snug">
        {RESEARCH_USE_NOTICE}
      </p>
    );
  }
  if (variant === "chip") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
        <ShieldAlert className="h-3 w-3" /> Research use only
      </span>
    );
  }
  return (
    <div
      role="note"
      className="rounded-lg border-2 border-primary/50 bg-primary/5 p-4 flex gap-3"
    >
      <ShieldAlert className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <p className="text-xs font-semibold uppercase tracking-wider text-primary leading-relaxed">
        {RESEARCH_USE_NOTICE}
      </p>
    </div>
  );
}
