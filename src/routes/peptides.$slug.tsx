import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, FileText, ShieldAlert, Lock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { getItem, items, type CatalogItem } from "@/data/peptides";
import {
  BRAND,
  LIVE_CHECKOUT_ENABLED,
  UNAVAILABLE_NOTICE,
  readEligibility,
} from "@/lib/compliance";

export const Route = createFileRoute("/peptides/$slug")({
  loader: ({ params }): { item: CatalogItem } => {
    const item = getItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.item;
    const title = p
      ? `${p.name} — ${p.catalogNumber} | BIOHACKERS Research Materials`
      : "Catalog item";
    const desc = p
      ? `${p.name} laboratory reference standard. Molecular formula ${p.molecularFormula}, MW ${p.molecularWeight}. For research use only. Not for human or veterinary use.`
      : "Research reference standard.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `${BRAND.domain}/peptides/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `${BRAND.domain}/peptides/${params.slug}` }],
    };
  },
  component: PeptidePage,
  notFoundComponent: () => (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Catalog item not found</h1>
        <Link to="/catalog" className="mt-6 inline-block text-primary hover:underline">← Back to catalog</Link>
      </div>
    </Layout>
  ),
});

function PeptidePage() {
  const { item: p } = Route.useLoaderData();
  const [verified, setVerified] = useState(false);
  useEffect(() => setVerified(!!readEligibility()), []);

  return (
    <Layout>
      <article>
        <section className="bg-hero border-b border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
            <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> Back to catalog
            </Link>
            <p className="mt-6 text-[11px] uppercase tracking-wider text-primary font-semibold">{p.catalogNumber} · {p.category}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">{p.name}</h1>
            {p.fullName && <p className="text-muted-foreground mt-1">{p.fullName}</p>}
            <div className="mt-6 max-w-3xl">
              <ResearchUseNotice variant="callout" />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <Section title="Specification">
              <dl className="grid gap-4 sm:grid-cols-2">
                <Row label="Catalog number" value={p.catalogNumber} />
                {p.casNumber && <Row label="CAS" value={p.casNumber} />}
                <Row label="Molecular formula" value={p.molecularFormula} mono />
                <Row label="Molecular weight" value={p.molecularWeight} />
                {p.sequence && <Row label="Sequence" value={p.sequence} mono />}
                <Row label="Physical form" value={p.physicalForm} />
                <Row label="Stated purity" value={p.statedPurity} />
                <Row label="Storage" value={p.storage} />
              </dl>
            </Section>

            <Section title="Scientific summary">
              <p className="text-muted-foreground leading-relaxed">{p.scientificSummary}</p>
              <p className="mt-4 text-xs text-muted-foreground italic">
                This summary is provided for background reference to laboratory researchers.
                It is not a use recommendation, dosing guidance, or a claim of any therapeutic,
                diagnostic, veterinary, cosmetic, dietary, or consumer effect.
              </p>
            </Section>

            <Section title="Analytical methods">
              <ul className="grid gap-2 sm:grid-cols-2">
                {p.analyticalMethods.map((m: string) => (
                  <li key={m} className="rounded-md border border-border bg-card p-3 text-sm">{m}</li>
                ))}
              </ul>
            </Section>

            <Section title="References">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {p.references.map((r: string) => (
                  <li key={r} className="border-l-2 border-border pl-3">{r}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground italic">
                Citations are presented neutrally for laboratory-research context.
                They are not claims about the safety, efficacy, or suitability of these
                materials for use in or on humans or animals.
              </p>
            </Section>

            <Section title="Institutional use">
              <p className="text-muted-foreground leading-relaxed">
                BIOHACKERS supplies this material exclusively to research organizations
                for laboratory, analytical, and non-clinical research. Orders are subject
                to research-eligibility verification and administrative review.
              </p>
            </Section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Pack sizes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.packSizes.map((d: string) => (
                  <span key={d} className="px-3 py-1.5 rounded-md border border-primary/40 bg-primary/10 text-primary text-sm font-semibold">
                    {d}
                  </span>
                ))}
              </div>

              <div className="mt-5 border-t border-border pt-5">
                {!verified ? (
                  <>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Lock className="h-4 w-4 text-primary" /> Pricing gated
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Complete eligibility verification to request pricing.</p>
                    <Link to="/eligibility" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                      Verify eligibility
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="rounded-md border border-primary/40 bg-primary/5 p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Research use only</p>
                      <p className="mt-1 text-xs text-muted-foreground">Not for human or veterinary use.</p>
                    </div>
                    <button
                      disabled
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary/40 px-4 py-2 text-sm font-medium text-primary-foreground cursor-not-allowed"
                      title={UNAVAILABLE_NOTICE}
                    >
                      {LIVE_CHECKOUT_ENABLED ? "Add to Cart" : "Purchasing unavailable"}
                    </button>
                    <p className="mt-2 text-[11px] text-muted-foreground text-center">{UNAVAILABLE_NOTICE}</p>
                  </>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="h-4 w-4 text-primary" /> Documentation
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <span className="text-muted-foreground">Certificate of Analysis:</span>{" "}
                  <span className="text-xs text-muted-foreground italic">Available on request per lot</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Safety Data Sheet:</span>{" "}
                  <span className="text-xs text-muted-foreground italic">Available on request</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 flex gap-3">
              <ShieldAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-destructive-foreground/90 leading-relaxed">
                <strong className="text-destructive">Restricted material.</strong> Requests
                inconsistent with legitimate laboratory research may be held, rejected,
                cancelled, or refunded.
              </p>
            </div>
          </aside>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 border-t border-border pt-8">
          <h3 className="text-sm font-semibold mb-4">Other catalog items</h3>
          <div className="flex flex-wrap gap-2">
            {items.filter((x) => x.slug !== p.slug).slice(0, 6).map((x) => (
              <Link key={x.slug} to="/peptides/$slug" params={{ slug: x.slug }}
                className="px-3 py-2 text-xs rounded-md border border-border bg-card hover:bg-muted">
                {x.catalogNumber} · {x.name}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className={`mt-1 text-sm ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}
