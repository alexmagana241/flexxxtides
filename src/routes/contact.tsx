import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Flex Peptide Research" },
      { name: "description", content: "Reach the Flex Peptide Research educational support team with questions about the library or research-information content." },
      { property: "og:title", content: "Contact — Flex Peptide Research" },
      { property: "og:description", content: "Educational support contact for Flex Peptide Research." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            We respond to educational questions about the library. We do not provide medical, clinical,
            or product advice.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 lg:grid-cols-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="lg:col-span-2 rounded-xl border border-border bg-card p-6 md:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Subject" name="subject" required />
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              required
              rows={6}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="What educational question can we help with?"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow"
          >
            <Mail className="h-4 w-4" /> Send message
          </button>
          {sent && (
            <p className="flex items-center gap-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" /> Thank you — your educational question has been received.
            </p>
          )}
        </form>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">Educational support</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our team can clarify how a peptide is described in the published literature, help interpret
              reconstitution math, or point you to the right learning article.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">FAQ shortcuts</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/faq" className="text-primary hover:underline">What are peptides?</Link></li>
              <li><Link to="/reconstitution" className="text-primary hover:underline">How do I reconstitute?</Link></li>
              <li><Link to="/faq" className="text-primary hover:underline">Storage recommendations</Link></li>
              <li><Link to="/learning" className="text-primary hover:underline">Peptide science basics</Link></li>
            </ul>
          </div>
          <Disclaimer variant="compact" />
        </aside>
      </div>
    </Layout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
