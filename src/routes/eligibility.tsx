import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import {
  BRAND,
  CONFIRMATIONS,
  POLICY_VERSION,
  clearConfirmation,
  readConfirmation,
  writeConfirmation,
  type ConfirmationRecord,
} from "@/lib/compliance";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Buyer Confirmation — BIOHACKERS" },
      { name: "description", content: "Confirm you are 21+ and understand BIOHACKERS materials are for laboratory research only, not for human consumption or veterinary use." },
      { property: "og:title", content: "Buyer Confirmation — BIOHACKERS" },
      { property: "og:description", content: "Simple age and research-use confirmation." },
      { property: "og:url", content: `${BRAND.domain}/eligibility` },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/eligibility` }],
  }),
  component: Eligibility,
});

function Eligibility() {
  const router = useRouter();
  const [existing, setExisting] = useState<ConfirmationRecord | null>(null);
  const [age21, setAge21] = useState(false);
  const [researchOnly, setResearchOnly] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setExisting(readConfirmation()); }, []);

  const ready = age21 && researchOnly;

  if (existing && !submitted) {
    return (
      <Layout>
        <section className="bg-hero border-b border-border">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
            <h1 className="text-4xl font-bold tracking-tight">Confirmation on file</h1>
            <p className="mt-3 text-muted-foreground">
              You have already acknowledged the two confirmations below. You can browse the
              catalog freely — pricing is visible without any additional verification.
            </p>
            <div className="mt-6"><ResearchUseNotice variant="callout" /></div>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-xl border border-border bg-card p-6 space-y-2 text-sm">
            <p>✓ {CONFIRMATIONS.age21}</p>
            <p>✓ {CONFIRMATIONS.researchOnly}</p>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              Recorded: {new Date(existing.timestamp).toLocaleString()} · Policy version {existing.policyVersion}
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <Link to="/catalog" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Continue to catalog
            </Link>
            <button
              onClick={() => { clearConfirmation(); setExisting(null); setAge21(false); setResearchOnly(false); }}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Reset confirmation
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Buyer confirmation</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Two quick confirmations</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Pricing and catalog information are open. Before submitting an order you only need
            to confirm the two statements below.
          </p>
          <div className="mt-6"><ResearchUseNotice variant="callout" /></div>
        </div>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!ready) return;
          writeConfirmation({
            age21, researchOnly,
            policyVersion: POLICY_VERSION,
            timestamp: new Date().toISOString(),
          });
          setSubmitted(true);
          setTimeout(() => router.navigate({ to: "/catalog" }), 900);
        }}
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-6"
      >
        <fieldset className="rounded-xl border-2 border-primary/50 bg-primary/5 p-5 space-y-4">
          <label className="flex gap-3 items-start text-sm">
            <input type="checkbox" checked={age21} onChange={(e) => setAge21(e.target.checked)} className="mt-1" />
            <span>{CONFIRMATIONS.age21}</span>
          </label>
          <label className="flex gap-3 items-start text-sm">
            <input type="checkbox" checked={researchOnly} onChange={(e) => setResearchOnly(e.target.checked)} className="mt-1" />
            <span>{CONFIRMATIONS.researchOnly}</span>
          </label>
        </fieldset>

        <button
          type="submit"
          disabled={!ready}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShieldCheck className="h-4 w-4" /> Save confirmation
        </button>

        {submitted && (
          <p className="flex items-center gap-2 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" /> Confirmation recorded. Redirecting to catalog…
          </p>
        )}
      </form>
    </Layout>
  );
}
