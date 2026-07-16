import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, FlaskConical, ShieldCheck, Beaker } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { Vial } from "@/components/Vial";
import { items } from "@/data/peptides";
import { BRAND, formatPrice } from "@/lib/compliance";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BIOHACKERS — Research Materials for Laboratory Use" },
      { name: "description", content: "BIOHACKERS supplies peptide reference standards and research materials for legitimate laboratory, analytical, and non-clinical research. Not for human or veterinary use." },
      { property: "og:title", content: "BIOHACKERS — Research Materials for Laboratory Use" },
      { property: "og:description", content: "Peptide reference standards for laboratory research. Not for human or veterinary use." },
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
      <section className="relative bg-hero border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card/70 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <FlaskConical className="h-3 w-3 text-primary" /> Laboratory reference materials
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Peptide reference standards for <span className="text-primary">non-clinical research.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-balance leading-relaxed">
              BIOHACKERS supplies characterized peptide reference materials for analytical,
              method-development, and in vitro research applications.
            </p>
            <div className="mt-6 max-w-2xl">
              <ResearchUseNotice variant="callout" />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/catalog" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
                Browse the Catalog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/research-library" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-muted transition">
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
            { icon: ShieldCheck, title: "Transparent Pricing", body: "Every pack size is listed with a price set approximately 3% below reference-standard market rates." },
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
            <p className="text-muted-foreground mt-2">Reference standards commonly requested for laboratory research.</p>
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
              <Vial packSize={p.packs[0]?.size} compound={p.name.replace(/\s*\(.*\)$/, "")} className="h-36 w-auto" />
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
