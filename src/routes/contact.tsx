import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Mail, MessageCircle, ShieldAlert } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { BRAND } from "@/lib/compliance";
import { FAQ_ENTRIES } from "@/lib/support-kb";
import { submitInquiry } from "@/lib/support.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Compliance — BIOHACKERS" },
      { name: "description", content: "Contact BIOHACKERS for research-organization inquiries, order questions, or to report a compliance concern about the use of research materials." },
      { property: "og:title", content: "Contact & Compliance — BIOHACKERS" },
      { property: "og:description", content: "Research-organization contact, customer support and compliance reporting." },
      { property: "og:url", content: `${BRAND.domain}/contact` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/contact` }],
  }),
  component: Contact,
});

function Contact() {
  const send = useServerFn(submitInquiry);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await send({
        data: {
          name: name.trim(),
          email: email.trim(),
          organization: org.trim(),
          inquiryType: type.trim() || "general",
          message: message.trim(),
          source: "contact_form",
        },
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your inquiry. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Contact</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Customer support & compliance reporting</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            BIOHACKERS responds to order questions and research-organization inquiries about catalog
            materials, documentation, and eligibility. We do not provide medical, veterinary,
            diagnostic, or treatment advice under any circumstances.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-primary">
            <MessageCircle className="h-4 w-4" />
            For a fast answer, open the support chat in the bottom-right corner.
          </p>
          <div className="mt-6 max-w-3xl">
            <ResearchUseNotice variant="callout" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 grid gap-8 lg:grid-cols-3">
        <form onSubmit={onSubmit} className="lg:col-span-2 rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" name="name" required value={name} onChange={setName} />
            <Field label="Organization / institution (optional)" name="org" value={org} onChange={setOrg} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email" name="email" type="email" required value={email} onChange={setEmail} />
            <Field
              label="Inquiry type"
              name="type"
              required
              value={type}
              onChange={setType}
              placeholder="Order status, shipping, refund, CoA/SDS, compliance report…"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea
              id="message"
              required
              rows={6}
              maxLength={4000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe your question. Do not include requests for medical, dosing, administration, or personal-use guidance — those requests cannot be answered."
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            <Mail className="h-4 w-4" /> {busy ? "Sending…" : "Submit inquiry"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {sent && (
            <p className="flex items-center gap-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" /> Your inquiry was received and sent to our team. We reply by email.
            </p>
          )}
        </form>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Answered instantly</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-4">
              {FAQ_ENTRIES.slice(0, 6).map((f) => (
                <li key={f.q}>{f.q}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Ask these in the support chat for an immediate answer. Anything else is forwarded to our team.
            </p>
          </div>
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

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        maxLength={255}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
