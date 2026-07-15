import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import {
  BRAND,
  ELIGIBILITY_AFFIRMATIONS,
  POLICY_VERSION,
  clearEligibility,
  readEligibility,
  writeEligibility,
  type EligibilityRecord,
} from "@/lib/compliance";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Research Eligibility Verification — BIOHACKERS" },
      { name: "description", content: "Verify research-organization eligibility to view BIOHACKERS pricing and submit orders for laboratory reference materials." },
      { property: "og:title", content: "Research Eligibility Verification — BIOHACKERS" },
      { property: "og:description", content: "Confirm research-organization eligibility before viewing pricing or ordering." },
      { property: "og:url", content: `${BRAND.domain}/eligibility` },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/eligibility` }],
  }),
  component: Eligibility,
});

function Eligibility() {
  const router = useRouter();
  const [existing, setExisting] = useState<EligibilityRecord | null>(null);
  const [form, setForm] = useState({
    fullName: "", organization: "", email: "", field: "",
    proposedUse: "", billingAddress: "", shippingAddress: "",
    is18: false, authorized: false,
    affirmations: ELIGIBILITY_AFFIRMATIONS.map(() => false),
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { setExisting(readEligibility()); }, []);

  const allAffirmed = form.affirmations.every(Boolean) && form.is18 && form.authorized;

  if (existing && !submitted) {
    return (
      <Layout>
        <section className="bg-hero border-b border-border">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
            <h1 className="text-4xl font-bold tracking-tight">Eligibility on file</h1>
            <div className="mt-6"><ResearchUseNotice variant="callout" /></div>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-xl border border-border bg-card p-6 space-y-2">
            <p className="text-sm"><strong>Organization:</strong> {existing.organization}</p>
            <p className="text-sm"><strong>Contact:</strong> {existing.fullName} · {existing.email}</p>
            <p className="text-sm"><strong>Recorded:</strong> {new Date(existing.timestamp).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Policy version: {existing.policyVersion}</p>
          </div>
          <div className="mt-6 flex gap-3">
            <Link to="/catalog" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Continue to catalog
            </Link>
            <button
              onClick={() => { clearEligibility(); setExisting(null); }}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Reset verification
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
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Research eligibility</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Verify research organization</h1>
          <p className="mt-3 text-muted-foreground">
            Complete this form to view pricing and submit orders for BIOHACKERS laboratory
            reference materials. All fields are required.
          </p>
          <div className="mt-6"><ResearchUseNotice variant="callout" /></div>
        </div>
      </section>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!allAffirmed) return;
          const rec: EligibilityRecord = {
            ...form,
            policyVersion: POLICY_VERSION,
            timestamp: new Date().toISOString(),
          };
          writeEligibility(rec);
          setSubmitted(true);
          setTimeout(() => router.navigate({ to: "/catalog" }), 900);
        }}
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full legal name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} required />
          <Field label="Organization / institution" value={form.organization} onChange={(v) => setForm({ ...form, organization: v })} required />
          <Field label="Business or institutional email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          <Field label="Intended field of research" value={form.field} onChange={(v) => setForm({ ...form, field: v })} required placeholder="e.g. analytical chemistry, cell biology" />
        </div>
        <TextField label="Proposed laboratory or analytical use" value={form.proposedUse} onChange={(v) => setForm({ ...form, proposedUse: v })} required placeholder="Briefly describe how these materials will be used in your laboratory." />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Billing address" value={form.billingAddress} onChange={(v) => setForm({ ...form, billingAddress: v })} required rows={3} />
          <TextField label="Shipping address (institutional)" value={form.shippingAddress} onChange={(v) => setForm({ ...form, shippingAddress: v })} required rows={3} />
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <label className="flex gap-3 items-start text-sm">
            <input type="checkbox" checked={form.is18} onChange={(e) => setForm({ ...form, is18: e.target.checked })} className="mt-1" />
            <span>I confirm I am at least 18 years of age.</span>
          </label>
          <label className="flex gap-3 items-start text-sm">
            <input type="checkbox" checked={form.authorized} onChange={(e) => setForm({ ...form, authorized: e.target.checked })} className="mt-1" />
            <span>I am authorized to purchase on behalf of a legitimate research organization.</span>
          </label>
        </div>

        <fieldset className="rounded-xl border-2 border-primary/50 bg-primary/5 p-5">
          <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-primary">Required affirmations</legend>
          <div className="space-y-3 mt-2">
            {ELIGIBILITY_AFFIRMATIONS.map((text, i) => (
              <label key={i} className="flex gap-3 items-start text-sm">
                <input
                  type="checkbox"
                  checked={form.affirmations[i]}
                  onChange={(e) => {
                    const next = [...form.affirmations];
                    next[i] = e.target.checked;
                    setForm({ ...form, affirmations: next });
                  }}
                  className="mt-1"
                />
                <span>{text}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!allAffirmed}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShieldCheck className="h-4 w-4" /> Submit eligibility verification
        </button>

        {submitted && (
          <p className="flex items-center gap-2 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" /> Eligibility recorded. Redirecting to catalog…
          </p>
        )}
      </form>
    </Layout>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function TextField({ label, value, onChange, required, rows = 4, placeholder }: {
  label: string; value: string; onChange: (v: string) => void;
  required?: boolean; rows?: number; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
