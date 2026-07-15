import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { Layout } from "@/components/Layout";
import { DraftBanner } from "@/components/DraftBanner";
import {
  BRAND,
  LIVE_CHECKOUT_ENABLED,
  POLICY_VERSION,
} from "@/lib/compliance";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Compliance Dashboard — BIOHACKERS" },
      { name: "description", content: "Internal compliance dashboard placeholder." },
      { property: "og:url", content: `${BRAND.domain}/admin` },
      { name: "robots", content: "noindex,nofollow" },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/admin` }],
  }),
  component: Admin,
});

function Admin() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Internal only</p>
        <h1 className="text-4xl font-bold tracking-tight">Compliance dashboard</h1>

        <DraftBanner />

        <div className="rounded-xl border-2 border-destructive/60 bg-destructive/5 p-5 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive-foreground/90 leading-relaxed">
            <strong>Software cannot guarantee FDA, state, federal, payment-processor,
            advertising, tax, privacy, or other legal compliance.</strong> Website content,
            eligibility gates, disclaimers, and disabled-checkout controls are administrative
            tools only. Final review by qualified FDA/regulatory attorney and by the selected
            payment processor is required before publication or activation of live sales.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card label="Live checkout" value={LIVE_CHECKOUT_ENABLED ? "ENABLED" : "DISABLED"} tone={LIVE_CHECKOUT_ENABLED ? "warn" : "ok"} />
          <Card label="Policy version" value={POLICY_VERSION} tone="neutral" />
          <Card label="Payment processor" value="Not connected" tone="ok" />
          <Card label="Eligibility store" value="Client-side (localStorage) — non-production" tone="warn" />
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Pre-launch checklist</h2>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
            <li>All policy pages reviewed and approved by qualified FDA/regulatory attorney.</li>
            <li>Payment-processor application submitted with accurate business description and product catalog.</li>
            <li>Payment-processor written approval received for the exact product catalog.</li>
            <li>Server-side eligibility enforcement replaces client-side localStorage store.</li>
            <li>Audit-log persistence configured (content changes, product activation, disclaimer changes, policy versions, checkout affirmations, payment configuration changes).</li>
            <li>Automated compliance tests wired into deploy (missing disclaimer, prohibited terms, missing affirmations, restricted-product activation).</li>
            <li>Live checkout flag flipped only after all of the above are documented.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-3">Order review queue</h2>
          <p className="text-sm text-muted-foreground">No live orders. This queue is a placeholder until server-side order storage is provisioned.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-3">Compliance audit log</h2>
          <p className="text-sm text-muted-foreground">Audit log persistence is not yet configured. Content and policy changes must be tracked manually until a backend log is provisioned.</p>
        </div>
      </div>
    </Layout>
  );
}

function Card({ label, value, tone }: { label: string; value: string; tone: "ok" | "warn" | "neutral" }) {
  const cls =
    tone === "warn"
      ? "border-destructive/60 bg-destructive/5"
      : tone === "ok"
      ? "border-primary/40 bg-primary/5"
      : "border-border bg-card";
  return (
    <div className={`rounded-xl border p-5 ${cls}`}>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
