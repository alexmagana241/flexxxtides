import { ShieldAlert } from "lucide-react";

export function Disclaimer({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <p className="text-xs text-muted-foreground border-t border-border pt-4">
        For educational and research-information purposes only. Not for human consumption, diagnosis,
        treatment, or prevention of any condition.
      </p>
    );
  }
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-4 flex gap-3">
      <ShieldAlert className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <div className="text-sm text-muted-foreground">
        <strong className="text-foreground">Educational use only.</strong> All content on Flex Peptide
        Research is provided strictly for educational and research-information purposes. Nothing on this
        site is intended as medical advice, a prescription claim, or a recommendation for human use.
      </div>
    </div>
  );
}
