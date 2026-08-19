import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ResearchUseNotice } from "@/components/ResearchUseNotice";
import { Vial } from "@/components/Vial";
import { items, categories } from "@/data/peptides";
import { BRAND, formatPrice } from "@/lib/compliance";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — BH Research Materials" },
      { name: "description", content: "Searchable catalog of BH peptide reference standards for laboratory, analytical, and non-clinical research. Pricing per pack size. Not for human or veterinary use." },
      { property: "og:title", content: "Catalog — BH Research Materials" },
      { property: "og:description", content: "Peptide reference standards for laboratory research, priced per pack size." },
      { property: "og:url", content: `${BRAND.domain}/catalog` },
    ],
    links: [{ rel: "canonical", href: `${BRAND.domain}/catalog` }],
  }),
  component: Catalog,
});

function Catalog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const s = q.trim().toLowerCase();
      const matchQ =
        s === "" ||
        p.name.toLowerCase().includes(s) ||
        p.catalogNumber.toLowerCase().includes(s) ||
        (p.casNumber?.toLowerCase().includes(s) ?? false) ||
        p.molecularFormula.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s);
      const matchC = cat === "All" || p.category === cat;
      return matchQ && matchC;
    });
  }, [q, cat]);

  return (
    <Layout>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Research materials</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Catalog</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Characterized peptide reference standards supplied for laboratory research.
            Every pack ships as a lot-controlled lyophilized powder.
          </p>
          <div className="mt-5 max-w-3xl">
            <ResearchUseNotice variant="callout" />
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by catalog #, name, CAS, formula, or category…"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-2 rounded-md text-xs border transition ${
                    cat === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No catalog items match your search.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to="/peptides/$slug"
                params={{ slug: p.slug }}
                className="group min-w-0 rounded-xl border border-border bg-card p-4 sm:p-5 card-hover flex flex-col"
              >
                <div className="flex gap-4">
                  <div className="shrink-0 w-24 sm:w-28 grid place-items-center rounded-lg bg-gradient-to-b from-muted/60 to-background border border-border">
                    <Vial packSize={p.packs[0]?.size} compound={p.name.replace(/\s*\(.*\)$/, "")} imageUrl={p.imageUrl} className="w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.catalogNumber}</p>
                    <h2 className="mt-1 text-lg font-semibold group-hover:text-primary transition truncate">{p.name}</h2>
                    {p.fullName && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{p.fullName}</p>}
                    <span className="mt-2 inline-block text-[10px] uppercase tracking-wider text-muted-foreground">{p.category}</span>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="min-w-0">
                    <dt className="text-muted-foreground">Formula</dt>
                    <dd className="font-mono truncate">{p.molecularFormula}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-muted-foreground">MW</dt>
                    <dd className="truncate">{p.molecularWeight}</dd>
                  </div>
                </dl>

                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Pack sizes & pricing</p>
                  <ul className="divide-y divide-border rounded-md border border-border">
                    {p.packs.map((pk: { size: string; priceUSD: number }) => (
                      <li key={pk.size} className="flex items-center justify-between px-3 py-2 text-sm">
                        <span className="font-medium">{pk.size}</span>
                        <span className="tabular-nums font-semibold text-primary">{formatPrice(pk.priceUSD)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <ResearchUseNotice variant="chip" />
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                  View specification <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
