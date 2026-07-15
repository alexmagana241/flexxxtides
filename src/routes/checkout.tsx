import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import {
  BRAND,
  CHECKOUT_CERTIFICATION,
  LIVE_CHECKOUT_ENABLED,
  POLICY_LINKS,
  UNAVAILABLE_NOTICE,
  readEligibility,
  type EligibilityRecord,
} from "@/lib/compliance";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout Review — BIOHACKERS" },
      { name: "description", content: "BIOHACKERS compliance review screen. Online purchasing is currently unavailable pending legal and payment-processor review." },
      { property: "og:url", content: `${BRAND.domain}/checkout` },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/checkout` }],
  }),
  component: Checkout,
});

function Checkout() {
  const [eligibility, setEligibility] = useState<EligibilityRecord | null>(null);
  const [finalConfirm, setFinalConfirm] = useState(false);
  useEffect(() => setEligibility(readEligibility()), []);

  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Compliance review</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Checkout</h1>
          <div className="mt-6"><ResearchUseNotice variant="callout" /></div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {!eligibility && (
          <div className="rounded-lg border-2 border-destructive/60 bg-destructive/5 p-5 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Research-eligibility verification required.</p>
              <Link to="/eligibility" className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Verify eligibility
              </Link>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold">Order review</h2>
          <p className="mt-2 text-sm text-muted-foreground">Your cart is currently empty. Add catalog items from the catalog page.</p>
          <Link to="/catalog" className="mt-4 inline-flex items-center text-sm text-primary hover:underline">Return to catalog</Link>
        </div>

        {eligibility && (
          <div className="rounded-xl border border-border bg-card p-6 space-y-2 text-sm">
            <h2 className="font-semibold">Buyer summary</h2>
            <p><strong>Organization:</strong> {eligibility.organization}</p>
            <p><strong>Contact:</strong> {eligibility.fullName} · {eligibility.email}</p>
            <p><strong>Field of research:</strong> {eligibility.field}</p>
            <p><strong>Proposed use:</strong> {eligibility.proposedUse}</p>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold">Policies</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
            {POLICY_LINKS.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="text-primary hover:underline">{p.label}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Orders may be manually reviewed, held, cancelled, or refunded when inconsistent with
            legitimate research activity or applicable policy.
          </p>
        </div>

        <div className="rounded-xl border-2 border-primary/50 bg-primary/5 p-6">
          <label className="flex gap-3 items-start text-sm">
            <input
              type="checkbox"
              checked={finalConfirm}
              onChange={(e) => setFinalConfirm(e.target.checked)}
              className="mt-1"
            />
            <span className="font-medium">{CHECKOUT_CERTIFICATION}</span>
          </label>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <ResearchUseNotice variant="callout" />
          <button
            disabled
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary/50 px-5 py-3 text-sm font-medium text-primary-foreground cursor-not-allowed"
          >
            Submit Research Order and Pay
          </button>
          {!LIVE_CHECKOUT_ENABLED && (
            <p className="mt-3 text-xs text-center font-semibold uppercase tracking-wider text-primary">
              {UNAVAILABLE_NOTICE}
            </p>
          )}
          <p className="mt-2 text-xs text-center text-muted-foreground">
            Payment processing is pending processor approval. No payment card information is
            collected on this page.
          </p>
        </div>
      </div>
    </Layout>
  );
}
