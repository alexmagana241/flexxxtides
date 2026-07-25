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

        <div className="grid gap-4 sm:grid-cols-2">
          <Card label="Live checkout" value={LIVE_CHECKOUT_ENABLED ? "ENABLED" : "DISABLED"} tone="ok" />
          <Card label="Policy version" value={POLICY_VERSION} tone="neutral" />
          <Card label="Payment processor" value="Connected" tone="ok" />
          <Card label="Confirmation store" value="Client-side (localStorage)" tone="neutral" />
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Operations checklist</h2>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
            <li>Catalog pack sizes and pricing kept current.</li>
            <li>Certificate of Analysis available on request per lot.</li>
            <li>Shipping and refund policies reviewed periodically.</li>
            <li>Research-use disclaimers present on every catalog and checkout screen.</li>
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
