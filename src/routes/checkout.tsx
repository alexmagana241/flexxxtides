import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import {
  BRAND,
  CHECKOUT_CERTIFICATION,
  CONFIRMATIONS,
  POLICY_LINKS,
} from "@/lib/compliance";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — BIOHACKERS" },
      { name: "description", content: "Complete your BIOHACKERS research materials order." },
      { property: "og:url", content: `${BRAND.domain}/checkout` },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/checkout` }],
  }),
  component: Checkout,
});

function Checkout() {
  const [age21, setAge21] = useState(false);
  const [researchOnly, setResearchOnly] = useState(false);
  const [finalConfirm, setFinalConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ready = age21 && researchOnly && finalConfirm;

  if (submitted) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-3xl font-bold">Order received</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you. A confirmation with payment and shipping details will be sent to your email.
          </p>
          <Link to="/catalog" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Continue browsing
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Order review</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Checkout</h1>
          <div className="mt-6"><ResearchUseNotice variant="callout" /></div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="rounded-xl border-2 border-primary/50 bg-primary/5 p-6 space-y-3">
          <h2 className="font-semibold">Buyer confirmation</h2>
          <label className="flex gap-3 items-start text-sm">
            <input type="checkbox" checked={age21} onChange={(e) => setAge21(e.target.checked)} className="mt-1" />
            <span>{CONFIRMATIONS.age21}</span>
          </label>
          <label className="flex gap-3 items-start text-sm">
            <input type="checkbox" checked={researchOnly} onChange={(e) => setResearchOnly(e.target.checked)} className="mt-1" />
            <span>{CONFIRMATIONS.researchOnly}</span>
          </label>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold">Policies</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
            {POLICY_LINKS.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="text-primary hover:underline">{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
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
            disabled={!ready}
            onClick={() => setSubmitted(true)}
            className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium text-primary-foreground transition ${ready ? "bg-primary hover:opacity-90" : "bg-primary/40 cursor-not-allowed"}`}
          >
            Submit Research Order
          </button>
        </div>
      </div>
    </Layout>
  );
}
