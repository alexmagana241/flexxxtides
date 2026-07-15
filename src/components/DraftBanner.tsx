import { AlertTriangle } from "lucide-react";

export function DraftBanner() {
  return (
    <div className="rounded-md border-2 border-dashed border-destructive bg-destructive/5 p-4 flex gap-3 text-destructive">
      <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
      <p className="text-xs font-bold uppercase tracking-wider leading-relaxed">
        DRAFT FOR ATTORNEY REVIEW — DO NOT PUBLISH OR ENABLE LIVE SALES UNTIL APPROVED.
      </p>
    </div>
  );
}
