import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, FlaskConical, ShieldCheck, Beaker } from "lucide-react";
import { Layout } from "@/components/Layout";
import { BrandMark } from "@/components/BrandMark";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { Vial } from "@/components/Vial";
import { items } from "@/data/peptides";
import { BRAND, formatPrice } from "@/lib/compliance";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BH — Research Materials for Laboratory Use" },
      { name: "description", content: "BH supplies peptide research materials and research materials for legitimate laboratory, analytical, and non-clinical research. Not for human or veterinary use." },
      { property: "og:title", content: "BH — Research Materials for Laboratory Use" },
      { property: "og:description", content: "Peptide research materials for laboratory research. Not for human or veterinary use." },
      { property: "og:url", content: `${BRAND.domain}/` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/` }],
  }),
  component: Home,
});

function Home() {
  const featured = items.slice(0, 4);
  return (
    <Layout>
      <section className="fall-hero relative isolate overflow-hidden border-b border-border">
        <div className="fall-hero-light" aria-hidden="true" />
        <div className="fall-hero-haze" aria-hidden="true" />
        <BrandMark
          className="fall-hero-mark"
          variant="icon"
          title=""
        />

        <div className="fall-leaves" aria-hidden="true">
          <span className="fall-leaf fall-leaf-one"><Leaf /></span>
          <span className="fall-leaf fall-leaf-two"><Leaf /></span>
          <span className="fall-leaf fall-leaf-three"><Leaf /></span>
          <span className="fall-leaf fall-leaf-four"><Leaf /></span>
          <span className="fall-leaf fall-leaf-five"><Leaf /></span>
        </div>

        <div className="fall-hero-grid relative mx-auto grid max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="fall-hero-copy min-w-0">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card/70 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <FlaskConical className="h-3 w-3 text-primary" /> Laboratory reference materials
            </span>
            <h1 className="mt-5 text-4xl font-bold text-balance sm:mt-6 sm:text-5xl lg:text-6xl">
              Peptide research materials for <span className="text-hero-accent">non-clinical research.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground text-balance leading-relaxed sm:mt-6 sm:text-lg">
              BH supplies characterized peptide reference materials for analytical,
              method-development, and in vitro research applications.
            </p>
          </div>

          <div className="fall-hero-product relative flex min-w-0 items-center justify-center" aria-label="GHK-Cu 100 MG research vial">
            <div className="fall-vial-glow" aria-hidden="true" />
            <div className="fall-vial-stage">
              <Vial packSize="100 MG" compound="GHK-Cu" className="h-full w-full" isolated />
              <div className="fall-vial-shadow" aria-hidden="true" />
            </div>
          </div>

          <div className="fall-hero-actions min-w-0">
            <div className="max-w-2xl">
              <ResearchUseNotice variant="callout" />
            </div>
            <div className="mt-5 grid gap-3 sm:mt-7 sm:flex sm:flex-wrap sm:items-center">
              <Link to="/catalog" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                Browse the Catalog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/research-library" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium transition hover:bg-muted">
                Open the Research Library
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: FileText, title: "Documented", body: "Each catalog item ships with a Certificate of Analysis and Safety Data Sheet describing purity, identity, and handling." },
            { icon: Beaker, title: "Laboratory-Only", body: "Materials are supplied as dry lyophilized powder for in vitro and analytical research — never for administration to humans or animals." },
            { icon: ShieldCheck, title: "Transparent Pricing", body: "Every pack size is listed with a clear price. Pricing is subject to change without notice." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 card-hover">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured catalog items</h2>
            <p className="text-muted-foreground mt-2">Research materials commonly requested for laboratory research.</p>
          </div>
          <Link to="/catalog" className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to="/peptides/$slug"
              params={{ slug: p.slug }}
              className="group rounded-xl border border-border bg-card p-5 card-hover flex flex-col items-center text-center"
            >
              <Vial packSize={p.packs[0]?.size} compound={p.name.replace(/\s*\(.*\)$/, "")} className="w-full max-w-[9rem]" />
              <span className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">{p.catalogNumber}</span>
              <h3 className="mt-1 text-base font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">from {formatPrice(p.packs[0].priceUSD)}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-primary">
                Specification <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function Leaf() {
  return (
    <svg viewBox="0 0 32 32" role="presentation">
      <path d="M27.3 4.1C16.4 4.8 7.8 10.7 5 22.4c5.1 2.1 10.6 1.3 14.7-2.7 4.3-4.1 6.3-9.5 7.6-15.6Z" fill="currentColor" />
      <path d="M5.8 26.9c4.7-7.8 10.6-12.6 17.9-17.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.3" />
    </svg>
  );
}
