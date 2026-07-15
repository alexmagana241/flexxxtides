import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Mail, ShieldAlert } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { BRAND } from "@/lib/compliance";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Compliance — BIOHACKERS" },
      { name: "description", content: "Contact BIOHACKERS for research-organization inquiries or to report a compliance concern about the use of research materials." },
      { property: "og:title", content: "Contact & Compliance — BIOHACKERS" },
      { property: "og:description", content: "Research-organization contact and compliance reporting." },
      { property: "og:url", content: `${BRAND.domain}/contact` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/contact` }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Contact</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Research-organization inquiries & compliance reporting</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            BIOHACKERS responds to research-organization inquiries about catalog materials,
            documentation, and eligibility. We do not provide medical, veterinary, diagnostic,
            or treatment advice under any circumstances.
          </p>
          <div className="mt-6 max-w-3xl">
            <ResearchUseNotice variant="callout" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="lg:col-span-2 rounded-xl border border-border bg-card p-6 md:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full legal name" name="name" required />
            <Field label="Organization / institution" name="org" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Institutional email" name="email" type="email" required />
            <Field label="Inquiry type" name="type" required placeholder="Quote request, CoA/SDS, compliance report, other…" />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              required
              rows={6}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe your research-organization inquiry. Do not include requests for medical, dosing, administration, or personal-use guidance — those requests cannot be answered."
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            <Mail className="h-4 w-4" /> Submit inquiry
          </button>
          {sent && (
            <p className="flex items-center gap-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" /> Your inquiry has been received.
            </p>
          )}
        </form>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Compliance reporting</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              To report suspected misuse of BIOHACKERS materials, a website content concern,
              a labelling issue, or a suspected diverted shipment, use this form and select
              "compliance report" as the inquiry type.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">What we cannot answer</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-4">
              <li>Medical, veterinary, diagnostic, or treatment advice</li>
              <li>Personal-use questions, dosing, or administration guidance</li>
              <li>Requests to compound, formulate, or supply for consumers or patients</li>
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
